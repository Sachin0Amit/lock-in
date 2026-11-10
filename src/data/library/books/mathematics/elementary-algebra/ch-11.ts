import type { Chapter, Lesson } from '../../../types'

/**
 * Elementary Algebra — Chapter 11: The Toolbox and the Doorstep
 *
 * LESSONS WRITTEN: 11.1 Word Problems: the Toolkit at Work (run 87 —
 *                  quiz keys 2/3/1/0/2, 14 exercises, two figures — the
 *                  pipeline map + the motion timeline, the READ→NAME→
 *                  RELATE→SOLVE→CHECK pipeline priced end-to-end across
 *                  the canon's five families: mixture (the value balance
 *                  and the alligation cross derived), motion (the 360-km
 *                  train as a fractional equation grown into a quadratic),
 *                  work-rate (8.3's template paid in full, the 5-days-
 *                  longer hunt), age (the bookkeeping pairs) and money
 *                  (the split investment and the mark-up-then-discount
 *                  read), with 7.2's inequality fences closing where the
 *                  problem asks a bound).
 *                  11.2 Competition Algebra: Identities and Substitutions
 *                  (run 87 — quiz keys 1/2/0/3/1, 14 exercises, two
 *                  figures — the (a+b)² area proof + the difference-of-
 *                  squares strip, the identity bank certified by symbolic
 *                  expansion and designed substitution, the speed reads
 *                  (difference of squares, binomial squares, the cube
 *                  twins 101³+99³ and 103³−97³), the symmetric reads
 *                  (9.4's Viète craft at speed: the x + 1/x ladder and
 *                  the x+y/xy families, the three-variable staple
 *                  x³+y³+z³−3xyz), the clever substitution collapsing a
 *                  quartic to a quadratic with four real roots, and the
 *                  Brahmagupta–Fibonacci two-squares identity).
 *                  11.3 'The Function Idea: the Doorstep' + the unit-11
 *                  review + the BOOK CLOSE ride run 88 — never in run 87.
 *
 * VERIFY-FIRST (2026-11-10, run 87): every number in 11.1 and 11.2 was
 * recomputed by scripts/verify-book3-ch11.ts BEFORE any prose existed —
 * 235 pre-write checks green at the gate (sections A–C: the pipeline
 * engines across the five families, the identity-bank engines with the
 * polynomial-expansion certificates and the surd arithmetic, the four
 * figure plans pinned rect-exact). Pre-writing catches: the sum-zero
 * triple {1, 2, −3} prices x³+y³+z³−3xyz = 0 (the cubes EQUAL 3xyz, both
 * −18 — the difference is zero, the staple's whole content); quadRoots
 * returns its doors largest-first, so the door checks read the pair
 * unordered; the polynomial engine must STRIP zero coefficients after
 * cancellation or the expansion certificates mis-count their terms.
 *
 * References for this unit: the banked keys carry the run (zero downloads,
 * web-check only per the runs-71–86 pattern) — `hall-knight-elementary-
 * algebra` (the classical text's problem chapters and identity drills),
 * `ncert-math8-ch2-linear-equations` (the school canon's word-problem
 * ground for 11.1), `euclid-elements-ii4` (Book II's geometric algebra —
 * 11.2's area reads), `khattar-qa-4e` (the competition corner both lessons
 * examine towards), `cengage-jee-style` (the presentation contract).
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (11.1): the pipeline map — five stations, the 360-km train */
/* threading them. Header (30,18,660,40); station chips (33,72,110,54), */
/* (169,72,110,54), (305,72,110,54), (441,72,110,54), (577,72,110,54);  */
/* worked panels (33,150,110,64) … (577,150,110,64); the two-filters    */
/* note band (30,232,660,56); caption band (30,306,660,30). Geometry    */
/* pinned in verify-book3-ch11.ts plan111Fig1.                          */
/* ------------------------------------------------------------------ */

function pipelineMapSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The word-problem pipeline: five stations READ, NAME, RELATE, SOLVE and CHECK connected by arrows, with the 360-kilometre train problem threading each station, and the two filters of the CHECK station printed below">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the word-problem pipeline — five stations, every problem, every time</text>')
  // ---- the five station chips ----
  const stations: Array<[number, string, string]> = [
    [33, 'READ', 'the story, slowly'],
    [169, 'NAME', 'the unknown, x'],
    [305, 'RELATE', 'sentence → equation'],
    [441, 'SOLVE', 'the lawful moves'],
    [577, 'CHECK', 'the story, again'],
  ]
  for (const [x, name, job] of stations) {
    parts.push(`<rect x="${x}" y="72" width="110" height="54" rx="6" fill="#fef3c7" stroke="#16a34a" stroke-width="1.2"/>`)
    parts.push(`<text x="${x + 55}" y="96" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">${name}</text>`)
    parts.push(`<text x="${x + 55}" y="114" font-size="10.5" fill="#65a30d" text-anchor="middle">${job}</text>`)
  }
  // ---- the arrows between stations ----
  for (const x0 of [145, 281, 417, 553]) {
    parts.push(`<line x1="${x0}" y1="99" x2="${x0 + 18}" y2="99" stroke="#d97706" stroke-width="1.6"/>`)
    parts.push(`<polygon points="${x0 + 24},99 ${x0 + 16},95 ${x0 + 16},103" fill="#d97706"/>`)
  }
  // ---- the worked row: the 360-km train threading the stations ----
  parts.push('<text x="360" y="143" font-size="11" fill="#0f766e" text-anchor="middle" font-weight="700">the 360-km train problem threading the stations</text>')
  const worked: Array<[number, string, string]> = [
    [33, '360 km; +5 km/h;', '−1 hour'],
    [169, 'v = the speed', 'in km/h'],
    [305, '360/v − 360/(v+5)', '= 1'],
    [441, 'v² + 5v − 1800 = 0', 'v = 40 km/h'],
    [577, '9 h − 8 h = 1 h', 'the answer lives'],
  ]
  for (const [x, line1, line2] of worked) {
    parts.push(`<rect x="${x}" y="150" width="110" height="64" rx="6" fill="#ffedd5" stroke="#d97706" stroke-width="1"/>`)
    parts.push(`<text x="${x + 55}" y="176" font-size="10" fill="#166534" text-anchor="middle">${line1}</text>`)
    parts.push(`<text x="${x + 55}" y="196" font-size="10" fill="#166534" text-anchor="middle">${line2}</text>`)
  }
  // ---- the two-filters note band ----
  parts.push('<rect x="30" y="232" width="660" height="56" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="360" y="252" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">the CHECK station runs TWO filters — 8.3’s discipline, kept</text>')
  parts.push('<text x="360" y="270" font-size="10.5" fill="#166534" text-anchor="middle">the BILL — where the equation is undefined (v ≠ 0, −5 for the train); and</text>')
  parts.push('<text x="360" y="286" font-size="10.5" fill="#166534" text-anchor="middle">the HABITAT — where the story breaks (v = −45: no train moves at it).</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="306" width="660" height="30" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="360" y="325" font-size="11" fill="#0f766e" text-anchor="middle">the stations never change — only the family of the relation does; CHECK is where marks are saved</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (11.1): the motion timeline — the same 360 km, one hour    */
/* apart. Header (30,18,660,40); the 9-hour bar (70,92,533.33,34) +    */
/* its orange ninth hour (603.33,92,66.67,34); the 8-hour bar          */
/* (70,182,533.33,34) + the dashed ghost hour (603.33,182,66.67,34);   */
/* the same-distance note band (30,240,660,56); caption band           */
/* (30,306,660,30). 66.67 px per hour. Geometry pinned in              */
/* verify-book3-ch11.ts plan111Fig2.                                   */
/* ------------------------------------------------------------------ */

function motionTimelineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two timeline bars: the 360-kilometre trip takes 9 hours at 40 kilometres per hour and 8 hours at 45; the orange ninth hour of the slow bar is the hour saved, mirrored by a dashed ghost beyond the fast bar">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the 360-km trip — the same distance, one hour apart</text>')
  // ---- the slow bar (9 hours) ----
  parts.push('<rect x="70" y="92" width="533.33" height="34" rx="4" fill="#fef3c7" stroke="#16a34a" stroke-width="1.2"/>')
  parts.push('<rect x="603.33" y="92" width="66.67" height="34" rx="4" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="72" y="84" font-size="12" fill="#166534" font-weight="700">at 40 km/h — 9 hours</text>')
  // ---- the fast bar (8 hours) ----
  parts.push('<rect x="70" y="182" width="533.33" height="34" rx="4" fill="#fef3c7" stroke="#16a34a" stroke-width="1.2"/>')
  parts.push('<rect x="603.33" y="182" width="66.67" height="34" rx="4" fill="none" stroke="#ea580c" stroke-width="1.2" stroke-dasharray="4,3"/>')
  parts.push('<text x="72" y="174" font-size="12" fill="#166534" font-weight="700">at 45 km/h — 8 hours</text>')
  // ---- hour ticks (66.67 px per hour) ----
  for (let k = 1; k <= 8; k++) {
    const tx = 70 + 66.67 * k
    parts.push(`<line x1="${tx}" y1="94" x2="${tx}" y2="124" stroke="#5eead4" stroke-width="1"/>`)
    parts.push(`<line x1="${tx}" y1="184" x2="${tx}" y2="214" stroke="#5eead4" stroke-width="1"/>`)
  }
  // ---- the alignment connector and the saved-hour labels ----
  parts.push('<line x1="603.33" y1="126" x2="603.33" y2="182" stroke="#0d9488" stroke-width="1.2" stroke-dasharray="3,3"/>')
  parts.push('<text x="636.67" y="113" font-size="10.5" fill="#ea580c" text-anchor="middle" font-weight="700">9th hour</text>')
  parts.push('<text x="636.67" y="203" font-size="10.5" fill="#ea580c" text-anchor="middle" font-weight="700">1 h saved</text>')
  // ---- hour scale labels under the slow bar ----
  const marks: Array<[number, string]> = [[70, '0 h'], [270, '3 h'], [470, '6 h'], [670, '9 h']]
  for (const [x, label] of marks) {
    parts.push(`<text x="${x}" y="138" font-size="10" fill="#d97706" text-anchor="middle">${label}</text>`)
  }
  // ---- the same-distance note band ----
  parts.push('<rect x="30" y="240" width="660" height="56" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="360" y="260" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">both bars carry the SAME 360 kilometres</text>')
  parts.push('<text x="360" y="278" font-size="10.5" fill="#166534" text-anchor="middle">the faster bar is shorter because the hours are fewer — not the kilometres;</text>')
  parts.push('<text x="360" y="292" font-size="10.5" fill="#166534" text-anchor="middle">the orange ninth hour is the hour you never spend: 360/40 − 360/45 = 9 − 8 = 1.</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="306" width="660" height="30" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="360" y="325" font-size="11" fill="#0f766e" text-anchor="middle">the saving reads off the picture — the equation’s left-hand side, drawn as a bar</text>')
  parts.push('</svg>')
  return parts.join('')
}

const lesson111: Lesson = {
  id: 'al-word-problems-the-toolkit-at-work',
  number: '11.1',
  title: 'Word Problems: the Toolkit at Work',
  concepts: [
    'the five-station pipeline',
    'the value balance of mixtures',
    'the alligation cross',
    'motion as a fractional equation',
    'the work-rate template',
    'the two filters: bill and habitat',
    'the inequality fence for bounds',
  ],
  objectives: [
    'run any word problem through the five stations — READ, NAME, RELATE, SOLVE, CHECK — without skipping a station',
    'build the value balance for mixture problems and derive the alligation cross x : q = (p₂ − m) : (m − p₁) from it',
    'turn motion stories into equations d = vt, clearing denominators into quadratics when the times are compared',
    'deploy 8.3’s work-rate template 1/a + 1/b = 1/t — including the subtracting drain and the 5-days-longer hunt',
    'keep age and money problems as clean bookkeeping: one unknown, one conservation law, one check',
    'answer bound questions with 7.2’s inequality fences — and report “no score exists” honestly when the fence and the habitat refuse to meet',
  ],
  prerequisites: ['al-solving-linear-equations', 'al-substitution-and-elimination', 'al-solving-linear-inequalities', 'al-fractional-equations-and-extraneous-roots', 'al-quadratics-and-factoring-solutions'],
  sources: ['hall-knight-elementary-algebra', 'ncert-math8-ch2-linear-equations', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Ten chapters built a toolkit: expressions simplified by the laws, equations settled by balance, systems by elimination, inequalities fenced, fractions carried with their bills, quadratics solved four ways and drawn as parabolas. Now the toolkit goes to work. A WORD PROBLEM is a story with numbers hidden in it, and the story is the oldest algebra there is: the scribe Ahmes copied his “heap” problems into the Rhind papyrus around 1550 BCE, and every one of them is a word problem — a quantity unknown, relations given, an answer demanded. What makes word problems hard is not the mathematics, which is always mathematics you already own; it is the TRANSLATION. This lesson makes the translation procedural.' },
    { kind: 'para', text: 'The procedure has five stations — READ, NAME, RELATE, SOLVE, CHECK — and the verifier priced every number in this lesson through them before a word of prose existed: the rice blend at ₹55, the 360-km train that gains an hour, the two pipes that pay 8.3’s debt, the father twice as old, the ₹5,000 split, the fifth-test fence. Each designed problem below is solved by the SAME pipeline; only the family of the relation changes. Learn the stations once, and the families become recognitions rather than puzzles.' },
    { kind: 'heading', text: 'The Pipeline: Read, Name, Relate, Solve, Check' },
    { kind: 'para', text: 'READ means the story, slowly — twice, with the question isolated and every number LABELED by what it measures (kilometres, hours, rupees per kilogram, years). NAME means choosing exactly one unknown and giving it a letter, chosen because the question asks for it directly if possible; everything else in the story becomes an expression in that letter. RELATE means finding the one sentence of the story that ties the quantities together — the conservation law, the invariant, the thing that cannot change — and writing it as an equation. SOLVE means the lawful moves this book has banked: 5.2’s balance for the linear cases, 6.2’s elimination when two unknowns intertwine, 8.3’s clearing when the rates run under a bar, and 9.1’s factoring craft when the clearing grows a quadratic. CHECK means substituting the answer back into the ORIGINAL story equation — not the derived one — and then running 8.3’s two filters: the BILL (where the equation is undefined) and the HABITAT (where the story breaks: negative speeds, negative days, twelve-year-old mothers).' },
    { kind: 'algorithm', title: 'The word-problem pipeline', lines: [
      { code: 'READ the story twice; isolate the question; label every number.', note: 'what does each number MEASURE — km, hours, ₹/kg, years?' },
      { code: 'NAME one unknown x (or v, t …); express the rest through it.', note: 'the question’s own quantity, if possible' },
      { code: 'RELATE: find the invariant sentence and write it as an equation.', note: 'value conserved, distance fixed, rates adding, ages ticking' },
      { code: 'SOLVE by the lawful moves of chapters 5–9.', note: 'balance, eliminate, clear, factor, formula — never guess' },
      { code: 'CHECK in the original story; run the bill and the habitat.', note: 'the two filters of 8.3; refuse what the story refuses' },
    ], note: 'five stations, no shortcuts — CHECK is where examination marks live' },
    { kind: 'example', title: 'Three consecutive integers sum to 87. Find them', steps: [
      'READ: “consecutive integers” step by 1; the sum is 87.',
      'NAME: let the first be $n$ — then the story hands us $n + 1$ and $n + 2$ for free.',
      'RELATE: the sum sentence — $n + (n + 1) + (n + 2) = 87$.',
      'SOLVE: collect, $3n + 3 = 87$, so $3n = 84$ and $n = 28$.',
      'CHECK: $28 + 29 + 30 = 87$ — the story equation itself, satisfied. Hence the integers are 28, 29 and 30.',
    ], },
    { kind: 'figure', caption: 'The pipeline map: five stations with their one-line jobs, the 360-km train problem threading all five, and the two filters of the CHECK station printed beneath. The stations never change from problem to problem — only the relation’s family does.', svg: pipelineMapSvg() },
    { kind: 'heading', text: 'The Families of the Canon' },
    { kind: 'para', text: 'Examinations draw their word problems from five families, each with a characteristic RELATE. The table prices one designed problem per family — every number in it certified by the verifier — and the sections that follow work each family honestly. Read the table twice: once down the columns (each family’s shape), once across the rows (the pipeline applied five times).' },
    { kind: 'table', caption: 'The five families, each priced on a designed problem (all numbers verified in verify-book3-ch11.ts section A)', head: ['Family', 'The named unknown', 'The relation (RELATE)', 'The equation', 'The answer'], rows: [
      ['mixture', '$x$ kg at ₹40 + 30 kg at ₹70', 'value in = value out', '$40x + 70 \\cdot 30 = 55(x + 30)$', '$x = 30$ kg'],
      ['motion', '$v$ km/h on a 360-km run', 'time = distance ÷ speed', '$\\frac{360}{v} - \\frac{360}{v+5} = 1$', '$v = 40$ km/h'],
      ['work-rate', '$x$ days for B alone (A: $x + 5$)', 'rates add', '$\\frac{1}{x} + \\frac{1}{x+5} = \\frac{1}{6}$', '$x = 10$ days'],
      ['age', '$s$ years for the son now', 'ages tick together', '$3s + 12 = 2(s + 12)$', '$s = 12$, father 36'],
      ['money', '₹$x$ at 5%, the rest at 8%', 'interest sums to ₹310', '$5x + 8(5000 - x) = 31000$', '$x = 3000$ at 5%'],
    ] },
    { kind: 'heading', text: 'Mixture and the Value Balance' },
    { kind: 'para', text: 'A mixture problem conserves VALUE. Blend $x$ kilograms at ₹$p_1$ per kilogram with $q$ kilograms at ₹$p_2$, and the blend sells at ₹$m$: the money the parts are worth equals the money the blend is worth, because no rupee appears or vanishes in the mixing. That conservation is the RELATE station, and it writes itself:' },
    { kind: 'equation', latex: 'p_1 x + p_2 q = m(x + q)', note: 'the value balance: parts in = blend out; the blend’s price multiplies the TOTAL weight $x + q$, never the known part alone' },
    { kind: 'example', title: 'How many kg of ₹40 rice must be mixed with 30 kg of ₹70 rice to obtain a blend worth ₹55 per kg?', steps: [
      'READ: two prices, one blend price, one known quantity (30 kg at ₹70); the question asks for the cheap rice’s weight.',
      'NAME: $x$ = kg of ₹40 rice. The blend then weighs $x + 30$ kg.',
      'RELATE: the value balance — $40x + 70 \\cdot 30 = 55(x + 30)$.',
      'SOLVE: expand, $40x + 2100 = 55x + 1650$; collect, $450 = 15x$, so $x = 30$.',
      'CHECK: $40 \\cdot 30 + 2100 = 3300$ and $55 \\cdot 60 = 3300$ — both sides agree, and the habitat is kind (30 kg is a weight). Hence 30 kg of the ₹40 rice.',
    ], },
    { kind: 'derivation', title: 'The Alligation Cross, Derived from the Value Balance', statement: 'For the value balance $p_1x + p_2q = m(x + q)$ with $p_1 < m < p_2$, the amounts are inversely proportional to their prices’ distances from the blend price: $x : q = (p_2 - m) : (m - p_1)$.', steps: [
      { label: 'Expand both sides', formula: 'p_1 x + p_2 q = mx + mq', explanation: 'the blend’s price $m$ multiplies the total weight $x + q$ — that total is where the classic slip lives.' },
      { label: 'Collect the x-terms left', formula: 'p_1 x - mx = mq - p_2 q', explanation: 'balance moves from chapter 5, applied to letters carrying prices instead of plain numbers.' },
      { label: 'Factor both sides', formula: 'x(p_1 - m) = q(m - p_2)', explanation: 'each side is one factor times one letter — the shape the whole derivation aims at.' },
      { label: 'Flip the signs and read the ratio', formula: 'x \\cdot (m - p_1) = q \\cdot (p_2 - m) \\;\\Longrightarrow\\; \\frac{x}{q} = \\frac{p_2 - m}{m - p_1}', explanation: 'multiplying both sides by $-1$ once; the amounts sit OVER their own price-distances — each amount pairs with the OTHER price’s distance.' },
    ], result: 'Thus $x : q = (p_2 - m) : (m - p_1)$ — the alligation cross. On the rice design: $(70 - 55) : (55 - 40) = 15 : 15 = 1 : 1$, so $x = 30$ with $q = 30$, exactly as the balance solved it.' },
    { kind: 'para', text: 'The cross deserves a second worked read, because examinations love its speed. The acid problem — how many litres of 25% acid must be added to 12 litres of 75% to blend a 45% solution — prices by the cross in one line: $(75 - 45) : (45 - 25) = 30 : 20 = 3 : 2$, and since the 75% side carries 12 litres, the 25% side carries $\\frac{3}{2} \\cdot 12 = 18$ litres. The verifier priced the balance itself: $\\frac{1}{4} \\cdot 18 + \\frac{3}{4} \\cdot 12 = \\frac{27}{2}$ litres of acid, and $\\frac{9}{20} \\cdot 30 = \\frac{27}{2}$ — the acid carried is the acid blended. And the DILUTION cousin runs the same invariant backwards: pour water into 20 litres of 30% acid until it reads 20%, and the acid carried cannot change — $\\frac{3}{10} \\cdot 20 = \\frac{2}{10}(20 + w)$ gives $6 = 4 + \\frac{w}{5}$, so $\\frac{w}{5} = 2$ and $w = 10$ litres. Water is just the $p = 0$ member of the family.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the blend price multiplies the TOTAL weight', text: 'The classic mixture slip is writing $40x + 2100 = 55x$ — pricing the blend at 55 on the cheap rice’s weight alone, silently valuing the ₹70 rice at nothing. The blend is a NEW object weighing $x + 30$ kg: its value is $55(x + 30)$, and the known rice’s value rides inside at its OWN price. The same discipline guards the dilution cousin: water costs nothing but still has WEIGHT, which is exactly why it dilutes. If your equation makes the mixture lighter or richer than its parts, the RELATE station — not the algebra — is where the error lives.' },
    { kind: 'heading', text: 'Motion and Work-Rate: Rates under the Bar' },
    { kind: 'para', text: 'Motion problems conserve DISTANCE, and their relation is the rate identity $d = vt$ from 10.2’s rate engine. The designed train shows the family at full strength, because comparing two TIMES puts the speeds under a bar — and 8.3’s clearing craft turns the fractional equation into one of chapter 9’s quadratics. Notice in the solution chain how the pipeline and the algebra of three earlier chapters interlock: NAME prices the speed, RELATE prices the time difference, SOLVE clears and factors, CHECK runs both filters.' },
    { kind: 'example', title: 'A train covers 360 km at a constant speed. Had the speed been 5 km/h more, the trip would have taken 1 hour less. Find the speed.', steps: [
      'READ: the distance is FIXED at 360 km; two speeds ($v$ and $v + 5$), two times, and the times differ by exactly 1 hour.',
      'NAME: $v$ = the speed in km/h; then the times are $\\frac{360}{v}$ and $\\frac{360}{v+5}$ hours.',
      'RELATE: the slow time minus the fast time is one hour — $\\frac{360}{v} - \\frac{360}{v+5} = 1$.',
      'SOLVE: clear the denominators (bill: $v \\neq 0, -5$) — $360(v + 5) - 360v = v(v + 5)$, so $1800 = v^2 + 5v$ and $v^2 + 5v - 1800 = 0$.',
      'Factor: $(v + 45)(v - 40) = 0$ — the doors are $v = 40$ and $v = -45$.',
      'CHECK: the bill refuses neither door; the HABITAT refuses $v = -45$ (no train moves at it). At $v = 40$: $\\frac{360}{40} - \\frac{360}{45} = 9 - 8 = 1$ — the original story equation, satisfied. Hence the speed is 40 km/h.',
    ], },
    { kind: 'figure', caption: 'The motion timeline: the same 360 km drawn as two bars — 9 hours at 40 km/h and 8 at 45. The orange ninth hour of the slow bar is the saved hour, and the dashed ghost beyond the fast bar is the hour it never needs. The equation’s left-hand side is the picture: 9 − 8 = 1.', svg: motionTimelineSvg() },
    { kind: 'para', text: 'The work-rate family is 8.3’s debt, paid in full. A task done solo in $a$ days runs at rate $\\frac{1}{a}$ tasks per day; two workers together run at the SUM of their rates; and the template $\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{t}$ — cleared to $t = \\frac{ab}{a+b}$, the product over the sum — prices the joint time. The designed pair prices it exactly: A in 10 days and B in 15 days together run at $\\frac{1}{10} + \\frac{1}{15} = \\frac{5}{30} = \\frac{1}{6}$, so six days — the template’s $\\frac{150}{25}$, and 6 sits honestly between each solo time and their minimum, exactly as 8.3 promised. The harder hunt hides the second time behind a comparison: A takes 5 days LONGER than B, and together they need 6 days. Name B’s time $x$, so A’s is $x + 5$; relate rates — $\\frac{1}{x} + \\frac{1}{x+5} = \\frac{1}{6}$; clear (bill: $x \\neq 0, -5$) to $6(x + 5) + 6x = x(x + 5)$, which collects to $x^2 - 7x - 30 = 0$; factor $(x - 10)(x + 3) = 0$; the doors are $x = 10$ and $x = -3$; the habitat refuses the negative door (a task cannot take negative days), and the CHECK station re-prices the survivor: $\\frac{1}{10} + \\frac{1}{15} = \\frac{1}{6}$. B alone takes 10 days, A alone 15.' },
    { kind: 'para', text: 'Two refinements complete the family. A DRAIN subtracts: a tap filling in 12 hours with a drain emptying in 18 runs at $\\frac{1}{12} - \\frac{1}{18} = \\frac{1}{36}$ — net 36 hours to fill, the sign doing the physics. And three pipes at once merely extend the sum: filling taps of 6 and 8 hours with a 12-hour drain run at $\\frac{1}{6} - \\frac{1}{12} + \\frac{1}{8} = \\frac{5}{24}$, filling the cistern in $\\frac{24}{5}$ hours — 4.8 hours, which the habitat converts to 4 hours 48 minutes, the fractional hour being 60 minutes as surely as any other.' },
    { kind: 'callout', tone: 'insight', title: 'Insight — every family conserves something', text: 'Stand back and the five families collapse into one idea: each RELATE is a CONSERVATION law. Mixtures conserve value (rupees in = rupees out); motion conserves distance (the same 360 km under both speeds); work-rate conserves the task (rates add because the job is shared, not stretched); age conserves the GAP (father minus son is constant — it is the ratios that drift); money conserves principal and counts interest. When a strange word problem appears on an examination, do not ask “which type is this?” — ask “what cannot change here?”. Name the invariant, and the equation writes itself; the pipeline is just the discipline of asking in the right order.' },
    { kind: 'heading', text: 'Age and Money: the Bookkeeping Families' },
    { kind: 'para', text: 'Age problems tick. Every person in the story ages one year per year — the GAP between any two ages never changes, and that constancy is the RELATE. The designed pair: a father is three times as old as his son, and in 12 years he will be only twice as old. NAME the son’s present age $s$ (father $3s$); RELATE through the future — $3s + 12 = 2(s + 12)$; SOLVE — $3s + 12 = 2s + 24$, so $s = 12$; CHECK — now $36 = 3 \\cdot 12$, and in 12 years $48 = 2 \\cdot 24$, both reads true. The son is 12, the father 36. The mother-and-son variant runs identically ($4s + 16 = 2(s + 16)$ gives $s = 8$, mother 32), and the past tense works too: five years AGO subtracts from both sides — the gap survives subtraction as surely as addition.' },
    { kind: 'para', text: 'Money problems sum. The designed split: ₹5,000 invested, part at 5% simple interest and the rest at 8%, earning ₹310 a year in total. NAME the 5% part ₹$x$ (the 8% part is $5000 - x$ — the principal is conserved); RELATE through the interest — one year’s earning is $\\frac{5}{100}x + \\frac{8}{100}(5000 - x) = 310$; clear the hundred (or read it in “percent-thousand” units: $5x + 8(5000 - x) = 31000$) and SOLVE — $40000 - 3x = 31000$, so $x = 3000$; CHECK — $\\frac{5}{100} \\cdot 3000 = 150$ and $\\frac{8}{100} \\cdot 2000 = 160$, and $150 + 160 = 310$ exactly. ₹3,000 rides at 5%, ₹2,000 at 8%. The shopkeeper’s speed read belongs to the same bookkeeping: mark an item 25% above cost (₹100 → ₹125) and discount 10% at the till, and the selling price is $125 \\cdot \\frac{9}{10} = 112.5$ — a profit of $\\frac{1}{8} = 12.5\\%$, NOT the 15% the two percentages whisper. Percentage changes chain multiplicatively, and the verifier priced every step.' },
    { kind: 'heading', text: 'Where the Problem Asks for a Bound' },
    { kind: 'para', text: 'Some problems do not ask FOR a number; they ask how FAR a number may go — and there 7.2’s fences do the work. The designed case: four tests have averaged 68 (total 272 marks), and the fifth test must lift the running average to at least 70. NAME the fifth score $s$; RELATE — $\\frac{272 + s}{5} \\geq 70$; SOLVE by 7.2’s lawful moves (multiply by the positive 5): $272 + s \\geq 350$, so $s \\geq 78$. The verifier priced the boundary both ways: at $s = 78$ the average is exactly $\\frac{350}{5} = 70$, and at $s = 77$ it is $\\frac{349}{5} = 69.8$, one mark short. But the habitat adds a second fence the algebra never saw: scores cap at 100, so the legal band is $78 \\leq s \\leq 100$ — and the answer to “what is the LEAST score that works” is the fence’s edge, 78.' },
    { kind: 'para', text: 'The honest refusal is the same machinery pointed at an impossible design. If the four-test average had been 62 (total 248), the fence would demand $s \\geq 350 - 248 = 102$ — beyond the 100 cap, beyond any score the habitat allows. The correct answer is not “102”; it is “no fifth-test score exists that reaches an average of 70”. On an examination, that refusal is worth full marks when it is justified by the two fences meeting and failing to overlap — and worth nothing when it is silently hidden. Chapter 5 taught you that equations can answer “none”; 7.2 taught you that inequalities answer “never below this”; word problems simply hand both answers a story to live in.' },
    { kind: 'terms', items: [
      { term: 'word problem', def: 'a story with numbers hidden in it: quantities unknown, relations stated in prose, an answer demanded. The oldest algebra — Ahmes’s “heap” problems of the Rhind papyrus (c. 1550 BCE) are word problems.' },
      { term: 'the pipeline', def: 'the five stations READ → NAME → RELATE → SOLVE → CHECK. READ labels the story, NAME gives the unknown its letter, RELATE writes the invariant as an equation, SOLVE uses the lawful moves, CHECK re-prices the answer in the original story under both filters.' },
      { term: 'value balance', def: 'the mixture conservation law $p_1x + p_2q = m(x + q)$: the value of the parts equals the value of the blend, whose price multiplies the TOTAL weight.' },
      { term: 'alligation cross', def: 'the ratio form of the value balance: $x : q = (p_2 - m) : (m - p_1)$ — the amounts are inversely proportional to their prices’ distances from the blend price. Derived, not memorized.' },
      { term: 'work-rate template', def: '8.3’s $\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{t}$, cleared to $t = \\frac{ab}{a+b}$: rates add because the task is shared, and the joint time lies between each solo time and their minimum. A drain SUBTRACTS its rate.' },
      { term: 'the two filters', def: 'the BILL refuses points where the equation is undefined (read off the denominators before clearing); the HABITAT refuses points where the story breaks — negative speeds, negative days, impossible ages, scores over the cap. A root must pass both.' },
    ] },
    { kind: 'list', marker: 'roman', items: [
      'Run every word problem through the five stations — READ, NAME, RELATE, SOLVE, CHECK — and let the story, not the algebra, choose the unknown.',
      'Each family conserves one thing: value (mixtures), distance (motion), the task (work-rates), the age gap (age problems), the principal (money).',
      'The value balance $p_1x + p_2q = m(x + q)$ carries the blend price on the total weight, and rearranges to the alligation cross $x : q = (p_2 - m) : (m - p_1)$.',
      'Compared times put speeds under a bar; clearing the bill yields a quadratic whose negative door the habitat refuses ($v = 40$, not $-45$).',
      'The work-rate template $\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{t}$ adds rates, subtracts drains, and prices the 5-days-longer hunt as $x^2 - 7x - 30 = 0$.',
      'Bound questions are 7.2’s fences on story quantities: $\\frac{272 + s}{5} \\geq 70$ gives $s \\geq 78$, the cap 100 closes the band, and “no score exists” is a full answer when the fences refuse to meet.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the oldest algebra is a word problem', text: 'The Rhind Mathematical Papyrus, copied by the scribe Ahmes around 1550 BCE from a work a century or two older still, devotes its problems 24–34 to what Egyptologists call the “aha” problems — aha being the Egyptian word for “heap” or “quantity”, the unknown itself. Problem 24 asks, in effect: a heap and a seventh of a heap make 19; what is the heap? That is a word problem with a fraction relation, solved by a method that guesses an answer and scales — a proud ancestor of NAME and CHECK. Babylonian tablets from centuries earlier pose work-rate and age problems in the same spirit. The point for a modern student: the STORY came first, for millennia, and the symbolism of chapters 1–10 is the compression of it. Word problems are not an application of algebra bolted on at the end; they are the thing algebra was invented for. Web-checked against the standard histories; no content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The five families ARE the algebra portion of nearly every quantitative paper. The school canon (NCERT class 8’s linear-equations chapter) examines age, consecutive-integer and simple motion items in two or three marks each. The competitive bank (Khattar QA’s arithmetic-algebra scope; SSC and bank preliminaries; JEE-Main foundation) drills harder: (1) alligation at speed — the 3 : 2 cross read off without an equation; (2) the train-up-a-hill and pipes-and-cistern staples, where the answer is the SURVIVOR of a quadratic after the habitat filter — mark schemes explicitly reward stating why the other door dies; (3) the split-investment and mark-up-then-discount items, where the 12.5%-not-15% read separates the careful from the fast; (4) the “least score for an average” fence with its cap. Time discipline: the pipeline is not slower than intuition — it is faster, because it never has to be redone.' },
    { kind: 'formula', name: 'The value balance (mixtures)', latex: 'p_1 x + p_2 q = m(x + q) \\;\\Longleftrightarrow\\; x : q = (p_2 - m) : (m - p_1)', note: 'parts in = blend out; the blend price rides the TOTAL weight; the cross form is the alligation speed read' },
    { kind: 'formula', name: 'The motion relation', latex: 'd = v t \\quad\\text{with the honest clause}\\quad v \\neq 0,\\; v + 5 \\neq 0', note: 'distance conserved across the story’s speeds; compared times clear into a quadratic — 360/v − 360/(v+5) = 1 → v² + 5v − 1800 = 0' },
    { kind: 'formula', name: 'The work-rate template', latex: '\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{t} \\;\\Longleftrightarrow\\; t = \\frac{ab}{a + b}', note: 'rates add; a drain subtracts; the joint time lies between each solo time and their minimum — 8.3’s template, now with the 5-days-longer hunt in tow' },
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'In the rice blend of the table, the ₹40 rice needed is', options: ['20 kg', '25 kg', '30 kg', '35 kg'], answer: 2, explain: 'The value balance: $40x + 70 \\cdot 30 = 55(x + 30)$ gives $450 = 15x$, so $x = 30$ — CHECK: $40 \\cdot 30 + 2100 = 3300 = 55 \\cdot 60$. The alligation cross agrees: $(70 - 55) : (55 - 40) = 1 : 1$, so the amounts match. 20 and 25 mis-balance the value; 35 overshoots the 1 : 1 cross.' },
      { q: 'The 360-km train’s speed is', options: ['36 km/h', '45 km/h', '50 km/h', '40 km/h'], answer: 3, explain: '$\\frac{360}{v} - \\frac{360}{v+5} = 1$ clears to $v^2 + 5v - 1800 = 0$, which factors $(v + 45)(v - 40) = 0$: the doors are 40 and $-45$, and the habitat refuses the negative one. CHECK: $9 - 8 = 1$ exactly. 45 is the FASTER speed of the story ($v + 5$), not $v$; 36 and 50 satisfy no relation in the problem.' },
      { q: 'A alone does a job in 10 days, B alone in 15. Working together they need', options: ['5 days', '6 days', '12.5 days', '25 days'], answer: 1, explain: 'Rates add: $\\frac{1}{10} + \\frac{1}{15} = \\frac{5}{30} = \\frac{1}{6}$, so $t = 6$ — the template’s $\\frac{ab}{a+b} = \\frac{150}{25}$. 12.5 is the average of the two times, the classic trap: TIMES do not average, RATES add. 25 is the sum; 5 would require both faster than A alone, which the story forbids.' },
      { q: 'A father is three times as old as his son; in 12 years he will be twice as old. The son is now', options: ['12 years old', '10 years old', '14 years old', '24 years old'], answer: 0, explain: '$3s + 12 = 2(s + 12)$ gives $s = 12$, father 36 — CHECK both reads: $36 = 3 \\cdot 12$ now and $48 = 2 \\cdot 24$ in 12 years. 10 mis-solves $3s = 2(s + 12)$ (missing the father’s own ageing); 14 breaks the present triple; 24 is the father’s age in 12 years, answering the wrong question.' },
      { q: 'Four tests have averaged 68. The LEAST fifth-test score that lifts the average to at least 70 is', options: ['70', '80', '78', '102'], answer: 2, explain: 'The fence: $\\frac{272 + s}{5} \\geq 70$ gives $s \\geq 350 - 272 = 78$ — and at exactly 78 the average IS 70 ($\\frac{350}{5}$). 70 misreads the average as the score; 80 works but is not the least; 102 is the honest refusal from the impossible 62-average variant — a real answer to a DIFFERENT problem, worth knowing, wrong here.' },
    ] },
    { kind: 'exercises', title: 'Exercises 11.1', sets: [
      { level: 'L1', questions: [
        { q: 'Three consecutive integers sum to 87 (the lesson’s warm-up). Run the five stations and verify.', solution: [
          'READ: consecutive integers step by 1; the sum is 87.',
          'NAME: $n$ the first; RELATE: $n + (n+1) + (n+2) = 87$.',
          'SOLVE: $3n + 3 = 87$, so $n = 28$.',
          'Hence 28, 29, 30 — CHECK: $28 + 29 + 30 = 87$.',
        ], },
        { q: 'Three consecutive ODD integers sum to 81. Find them.', solution: [
          'Odd integers step by 2: NAME the first $n$, so the story gives $n + 2$ and $n + 4$.',
          'RELATE: $n + (n + 2) + (n + 4) = 81$, so $3n + 6 = 81$.',
          'SOLVE: $3n = 75$, so $n = 25$ — odd, as the habitat demands.',
          'Hence 25, 27, 29 — CHECK: $25 + 27 + 29 = 81$.',
        ], answer: '25, 27, 29.' },
        { q: 'A tap fills a tank in 12 hours; a second tap fills it in 36. How long together?', solution: [
          'RELATE: rates add — $\\frac{1}{12} + \\frac{1}{36} = \\frac{3}{36} + \\frac{1}{36} = \\frac{4}{36} = \\frac{1}{9}$.',
          'SOLVE: the joint rate is one tank per 9 hours.',
          'Hence 9 hours — and $t = \\frac{ab}{a+b} = \\frac{432}{48} = 9$, the template agreeing with the addition.',
        ], answer: '9 hours.' },
      ] },
      { level: 'L2', questions: [
        { q: 'How many litres of 25% acid must be added to 12 litres of 75% to blend a 45% solution? Solve by the balance, then confirm by the alligation cross.', solution: [
          'NAME: $x$ litres of 25%; the blend weighs $x + 12$.',
          'RELATE: acid in = acid blended — $\\frac{1}{4}x + \\frac{3}{4} \\cdot 12 = \\frac{9}{20}(x + 12)$.',
          'SOLVE: multiply by 20 — $5x + 180 = 9x + 108$, so $72 = 4x$ and $x = 18$.',
          'CHECK: $\\frac{18}{4} + 9 = \\frac{27}{2}$ and $\\frac{9}{20} \\cdot 30 = \\frac{27}{2}$ — the acid carried is the acid blended.',
          'Cross: $(75 - 45) : (45 - 25) = 30 : 20 = 3 : 2$, and $\\frac{18}{12} = \\frac{3}{2}$ — the amounts sit over the OTHER price’s distance.',
        ], answer: '18 litres.' },
        { q: 'How much water must be added to 20 litres of 30% acid to dilute it to 20%?', solution: [
          'NAME: $w$ litres of water (price 0 — the family’s free member).',
          'RELATE: the acid carried is invariant — $\\frac{3}{10} \\cdot 20 = \\frac{2}{10}(20 + w)$.',
          'SOLVE: $6 = 4 + \\frac{w}{5}$, so $\\frac{w}{5} = 2$ and $w = 10$.',
          'CHECK: 6 litres of acid in 30 litres of mix reads exactly $\\frac{6}{30} = 20\\%$.',
        ], answer: '10 litres of water.' },
        { q: 'A student’s first four tests averaged 68. What least fifth score lifts the average to at least 70, and what is the full legal band?', solution: [
          'NAME: $s$ the fifth score; the four-test total is $68 \\cdot 4 = 272$.',
          'RELATE: $\\frac{272 + s}{5} \\geq 70$ — the fence of 7.2 on a story quantity.',
          'SOLVE: multiply by 5 (positive, lawful): $272 + s \\geq 350$, so $s \\geq 78$.',
          'The habitat caps scores at 100: the legal band is $78 \\leq s \\leq 100$; CHECK the edge — at 78 the average is exactly $\\frac{350}{5} = 70$.',
        ], answer: 'Least 78; the band [78, 100].' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve the 360-km train problem from the stations up: the equation, the doors, the two filters, the check.', solution: [
          'RELATE: $\\frac{360}{v} - \\frac{360}{v+5} = 1$; bill $v \\neq 0, -5$.',
          'Clear: $360(v+5) - 360v = v(v+5)$, so $v^2 + 5v - 1800 = 0$.',
          'Factor: $(v + 45)(v - 40) = 0$ — doors $v = 40$ and $v = -45$; $\\Delta = 7225 = 85^2$.',
          'Filters: the bill refuses neither; the habitat refuses $v = -45$ — speeds are positive.',
          'Hence $v = 40$ km/h — CHECK: $\\frac{360}{40} - \\frac{360}{45} = 9 - 8 = 1$.',
        ], },
        { q: 'A and B together do a job in 6 days; A alone takes 5 days longer than B. Find each solo time.', solution: [
          'NAME: B takes $x$ days, so A takes $x + 5$; bill $x \\neq 0, -5$.',
          'RELATE: $\\frac{1}{x} + \\frac{1}{x+5} = \\frac{1}{6}$.',
          'Clear: $6(x + 5) + 6x = x(x + 5)$, so $x^2 - 7x - 30 = 0$.',
          'Factor: $(x - 10)(x + 3) = 0$ — doors 10 and $-3$; the habitat refuses the negative door.',
          'Hence B takes 10 days and A 15 — CHECK: $\\frac{1}{10} + \\frac{1}{15} = \\frac{1}{6}$.',
        ], answer: 'B: 10 days; A: 15 days.' },
        { q: 'The ages of A and B sum to 40; five years ago A was twice as old as B was then. Find their present ages.', solution: [
          'NAME: A is $a$, B is $b$ — with the conservation $a + b = 40$.',
          'RELATE the past: $a - 5 = 2(b - 5)$.',
          'SOLVE: $a = 2b - 5$, so $(2b - 5) + b = 40$, giving $3b = 45$ and $b = 15$.',
          'Hence B is 15 and A is 25 — CHECK: $25 + 15 = 40$ and $20 = 2 \\cdot 10$.',
        ], answer: 'A: 25; B: 15.' },
      ] },
      { level: 'L4', questions: [
        { q: '₹5,000 is split between 5% and 8% simple interest, earning ₹310 a year. Find the split, and check in rupees.', solution: [
          'NAME: ₹$x$ at 5%, so $5000 - x$ at 8% — the principal is conserved.',
          'RELATE: $\\frac{5}{100}x + \\frac{8}{100}(5000 - x) = 310$.',
          'Clear the hundred: $5x + 8(5000 - x) = 31000$, so $40000 - 3x = 31000$.',
          'SOLVE: $3x = 9000$, so $x = 3000$.',
          'Hence ₹3,000 at 5% and ₹2,000 at 8% — CHECK in rupees: $150 + 160 = 310$.',
        ], answer: '₹3,000 at 5%; ₹2,000 at 8%.' },
        { q: 'A boat covers 15 km downstream and 15 km back upstream in 4 hours total, on a stream running 2 km/h. Find the boat’s still-water speed.', solution: [
          'NAME: $b$ the still-water speed; the downstream speed is $b + 2$, upstream $b - 2$ (bill: $b \\neq 2, -2$).',
          'RELATE: $\\frac{15}{b+2} + \\frac{15}{b-2} = 4$.',
          'Clear: $15(b - 2) + 15(b + 2) = 4(b^2 - 4)$, so $30b = 4b^2 - 16$, i.e. $2b^2 - 15b - 8 = 0$.',
          'The doors: $\\Delta = 225 + 64 = 289 = 17^2$, so $b = \\frac{15 \\pm 17}{4}$ — doors 8 and $-\\frac{1}{2}$.',
          'The habitat refuses $-\\frac{1}{2}$ — hence $b = 8$ km/h. CHECK: $\\frac{15}{10} + \\frac{15}{6} = \\frac{3}{2} + \\frac{5}{2} = 4$ hours exactly.',
        ], answer: '8 km/h.' },
        { q: 'A 2-hour walk covers 9 km: 5 km/h on the flat, 3 km/h uphill. How long is each stretch? (6.2’s elimination at work.)', solution: [
          'NAME: $f$ hours on the flat, $u$ hours uphill.',
          'RELATE: $f + u = 2$ (time) and $5f + 3u = 9$ (distance — the conserved quantity).',
          'Eliminate: from the first, $u = 2 - f$; substitute — $5f + 3(2 - f) = 9$, so $2f = 3$.',
          'Hence $f = \\frac{3}{2}$ hours and $u = \\frac{1}{2}$ — CHECK: $\\frac{3}{2} + \\frac{1}{2} = 2$ and $\\frac{15}{2} + \\frac{3}{2} = 9$.',
        ], answer: '1.5 h flat, 0.5 h uphill.' },
      ] },
      { level: 'L5', questions: [
        { q: 'A cistern has two filling taps (6 h and 8 h solo) and a drain (12 h solo to empty a full cistern). All three open together: how long to fill the empty cistern?', solution: [
          'RELATE: rates add with SIGNS — $\\frac{1}{6} + \\frac{1}{8} - \\frac{1}{12}$.',
          'Price the sum: $\\frac{4}{24} + \\frac{3}{24} - \\frac{2}{24} = \\frac{5}{24}$ of the cistern per hour.',
          'SOLVE: $t = \\frac{24}{5} = 4.8$ hours.',
          'The habitat converts the fraction: $4.8$ h = 4 h and $\\frac{4}{5} \\cdot 60 = 48$ minutes — CHECK: $\\frac{5}{24} \\cdot \\frac{24}{5} = 1$ full cistern.',
        ], answer: '24/5 hours — 4 h 48 min.' },
      ] },
      { level: 'L6', questions: [
        { q: 'Derive the alligation cross from the value balance $p_1x + p_2q = m(x + q)$ ($p_1 < m < p_2$), and verify it on BOTH designed mixtures of the lesson (the rice and the acid).', solution: [
          'Expand: $p_1x + p_2q = mx + mq$.',
          'Collect: $x(p_1 - m) = q(m - p_2)$; multiply by $-1$: $x(m - p_1) = q(p_2 - m)$.',
          'Divide by the positive $(m - p_1)(p_2 - m)$: $\\frac{x}{q} = \\frac{p_2 - m}{m - p_1}$ — each amount over the OTHER price’s distance.',
          'Rice: $\\frac{x}{30} = \\frac{70 - 55}{55 - 40} = 1$, so $x = 30$ — the balance solution reproduced.',
          'Acid: $\\frac{x}{12} = \\frac{75 - 45}{45 - 25} = \\frac{3}{2}$, so $x = 18$ — again the balance solution. Hence the cross is the balance, rearranged for speed.',
        ], answer: '$x : q = (p_2 - m) : (m - p_1)$; verified 1 : 1 and 3 : 2 on the two designs.' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* Figure 1 (11.2): the (a+b)² area proof — the big square cut into    */
/* a², two ab rectangles and b². Header (30,18,660,40); outer square   */
/* (150,66,260,260); a² (150,66,160,160); ab₁ (310,66,100,160);       */
/* ab₂ (150,226,160,100); b² (310,226,100,100); identity band          */
/* (30,332,660,30); caption band (30,372,660,22). a = 160 px,          */
/* b = 100 px. Geometry pinned in verify-book3-ch11.ts plan112Fig1.    */
/* ------------------------------------------------------------------ */

function squareSumSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The square of a sum as areas: a big square of side a plus b, cut into an a-squared square, two congruent a-by-b rectangles and a b-squared square">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the square of a sum — cut once each way, and the identity falls out</text>')
  // ---- the outer square ----
  parts.push('<rect x="150" y="66" width="260" height="260" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  // ---- the four regions ----
  parts.push('<rect x="150" y="66" width="160" height="160" fill="#fef3c7" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="230" y="150" font-size="20" fill="#166534" text-anchor="middle" font-weight="700">a²</text>')
  parts.push('<rect x="310" y="66" width="100" height="160" fill="#ffedd5" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="360" y="150" font-size="16" fill="#d97706" text-anchor="middle" font-weight="700">ab</text>')
  parts.push('<rect x="150" y="226" width="160" height="100" fill="#ffedd5" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="230" y="280" font-size="16" fill="#d97706" text-anchor="middle" font-weight="700">ab</text>')
  parts.push('<rect x="310" y="226" width="100" height="100" fill="none" stroke="#0d9488" stroke-width="1.2" stroke-dasharray="4,3"/>')
  parts.push('<text x="360" y="280" font-size="16" fill="#0f766e" text-anchor="middle" font-weight="700">b²</text>')
  // ---- the side labels ----
  parts.push('<text x="140" y="150" font-size="13" fill="#166534" text-anchor="end" font-style="italic">a</text>')
  parts.push('<text x="140" y="280" font-size="13" fill="#166534" text-anchor="end" font-style="italic">b</text>')
  parts.push('<text x="230" y="84" font-size="13" fill="#166534" text-anchor="middle" font-style="italic">a</text>')
  parts.push('<text x="360" y="84" font-size="13" fill="#166534" text-anchor="middle" font-style="italic">b</text>')
  parts.push('<text x="418" y="196" font-size="12" fill="#65a30d" font-style="italic">a + b</text>')
  // ---- the identity band ----
  parts.push('<rect x="30" y="332" width="660" height="30" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="360" y="352" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">(a + b)² = a² + <tspan fill="#d97706">2ab</tspan> + b² — the area count, term by term</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="372" width="660" height="22" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="360" y="387" font-size="10.5" fill="#0f766e" text-anchor="middle">two squares and two TWIN rectangles — the middle term is literally the two amber panels</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (11.2): the difference-of-squares strip — the L of a² − b² */
/* rearranged into (a+b)(a−b). Header (30,18,660,40); outer a×a        */
/* (60,70,210,210); bottom band (60,130,210,150); top-left block       */
/* (60,70,150,60); removed corner (210,70,60,60); strip outer          */
/* (400,140,270,150); strip pieces (400,140,210,150) and               */
/* (610,140,60,150); identity band (30,292,660,28); caption band       */
/* (30,328,660,26). a = 210 px, b = 60 px. Geometry pinned in          */
/* verify-book3-ch11.ts plan112Fig2.                                   */
/* ------------------------------------------------------------------ */

function diffSquaresStripSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The difference of squares as areas: an a-by-a square with a b-by-b corner struck out, and its two pieces rearranged into an a-plus-b by a-minus-b strip">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the difference of squares — cut the corner, rearrange the L</text>')
  // ---- the L: outer square, bottom band, top-left block ----
  parts.push('<rect x="60" y="70" width="210" height="210" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="130" width="210" height="150" fill="#fef3c7" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="165" y="210" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">a(a − b)</text>')
  parts.push('<rect x="60" y="70" width="150" height="60" fill="#ffedd5" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="135" y="105" font-size="12" fill="#d97706" text-anchor="middle" font-weight="700">(a − b)b</text>')
  // ---- the removed corner ----
  parts.push('<rect x="210" y="70" width="60" height="60" fill="none" stroke="#dc2626" stroke-width="1.4" stroke-dasharray="4,3"/>')
  parts.push('<line x1="210" y1="70" x2="270" y2="130" stroke="#dc2626" stroke-width="0.8"/>')
  parts.push('<line x1="270" y1="70" x2="210" y2="130" stroke="#dc2626" stroke-width="0.8"/>')
  parts.push('<text x="240" y="148" font-size="11" fill="#dc2626" text-anchor="middle" font-weight="700">b² struck out</text>')
  // ---- the L's side labels ----
  parts.push('<text x="52" y="180" font-size="13" fill="#166534" text-anchor="end" font-style="italic">a</text>')
  parts.push('<text x="165" y="88" font-size="13" fill="#166534" text-anchor="middle" font-style="italic">a</text>')
  parts.push('<text x="278" y="210" font-size="11" fill="#65a30d" font-style="italic">a − b</text>')
  parts.push('<text x="240" y="88" font-size="11" fill="#dc2626" text-anchor="middle" font-style="italic">b</text>')
  // ---- the rearrangement arrows ----
  parts.push('<line x1="285" y1="100" x2="388" y2="150" stroke="#0d9488" stroke-width="1.2" stroke-dasharray="3,3"/>')
  parts.push('<polygon points="395,153 385,150 390,143" fill="#0d9488"/>')
  parts.push('<line x1="285" y1="255" x2="388" y2="235" stroke="#0d9488" stroke-width="1.2" stroke-dasharray="3,3"/>')
  parts.push('<polygon points="395,233 385,231 387,240" fill="#0d9488"/>')
  // ---- the strip ----
  parts.push('<rect x="400" y="140" width="270" height="150" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="400" y="140" width="210" height="150" fill="#fef3c7" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="505" y="220" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">a(a − b)</text>')
  parts.push('<rect x="610" y="140" width="60" height="150" fill="#ffedd5" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="640" y="220" font-size="12" fill="#d97706" text-anchor="middle" font-weight="700">b(a − b)</text>')
  // ---- the strip's side labels ----
  parts.push('<text x="535" y="132" font-size="12" fill="#65a30d" text-anchor="middle" font-style="italic">a + b</text>')
  parts.push('<text x="678" y="218" font-size="11" fill="#65a30d" font-style="italic">a − b</text>')
  // ---- the identity band ----
  parts.push('<rect x="30" y="292" width="660" height="28" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="360" y="311" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">a² <tspan fill="#dc2626">− b²</tspan> = (a + b)(a − b) — the L and the strip carry equal areas</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="328" width="660" height="26" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="360" y="345" font-size="10.5" fill="#0f766e" text-anchor="middle">the small block ROTATES to the strip’s end — the orange piece is one shape wearing two orientations</text>')
  parts.push('</svg>')
  return parts.join('')
}

const lesson112: Lesson = {
  id: 'al-competition-algebra-identities-and-substitutions',
  number: '11.2',
  title: 'Competition Algebra: Identities and Substitutions',
  concepts: [
    'the identity bank',
    'certification by expansion',
    'the geometric read of the identities',
    'speed reads',
    'the symmetric reads',
    'the clever substitution',
    'the two-squares identity',
  ],
  objectives: [
    'state the identity bank — the squares, the difference of squares, the cubes and their factorizations, the three-variable forms — and certify each by expansion on designed substitutions',
    'read the two area proofs: (a + b)² as a cut square and a² − b² as a rearranged L, Euclid’s geometric algebra made modern',
    'compute competition arithmetic at speed: 101 × 99, 205² − 195², 998 × 1002, and the cube twins 101³ + 99³ and 103³ − 97³',
    'run the symmetric reads of 9.4 at speed: the x + 1/x power ladder and the x + y, xy families, through x³ + y³ and the two-step ladder',
    'collapse a repeating expression by the clever substitution, solving a quartic as a quadratic in disguise — including its surd doors',
    'deploy the Brahmagupta–Fibonacci two-squares identity and explain why 65 is a sum of two squares in two different ways',
  ],
  prerequisites: ['al-special-products-the-identities-proved', 'al-identities-as-factorizations', 'al-quadratics-and-factoring-solutions', 'al-roots-and-coefficients-viete-relations'],
  sources: ['hall-knight-elementary-algebra', 'euclid-elements-ii4', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Competition algebra is a different game from course algebra. The theory is finished — chapters 3 and 4 built it — and the examination pays for SPEED WITH STRUCTURE: reading $101 \\times 99$ as a difference of squares before the pencil moves, collapsing a quartic by naming its repeating heart, converting “$x + y = 7$, $xy = 6$” into $x^3 + y^3$ without ever finding $x$ or $y$. Every technique of this lesson is one of chapter 3’s identities or chapter 9’s symmetric reads, picked up by a faster handle.' },
    { kind: 'para', text: 'The discipline stays exactly as strict as the book has kept it. The verifier certified all fourteen identities of this lesson BEFORE the prose existed — by symbolic polynomial expansion, coefficient against coefficient, and again numerically on designed substitutions including negatives and fractions — and priced every speed read with BigInt arithmetic, both sides computed independently. In competition algebra the identities are not mnemonic patterns; they are theorems you own twice over, which is precisely what makes them safe to use at speed.' },
    { kind: 'heading', text: 'The Identity Bank' },
    { kind: 'para', text: 'An IDENTITY is an equality that holds for EVERY value of its letters — as 3.3 defined them and proved by expansion. That universality is the whole source of their speed: you may substitute into them without asking permission, in either direction, and they remain laws. The bank below is the competition arsenal; the middle column names the certificate (each row was expanded symbolically and priced numerically by the verifier before this table was typed), and the right column is the row’s typical speed use.' },
    { kind: 'table', caption: 'The identity bank — certified by expansion, priced on designed substitutions (verify-book3-ch11.ts section B)', head: ['Identity', 'Certificate', 'A speed use'], rows: [
      ['$(a \\pm b)^2 = a^2 \\pm 2ab + b^2$', 'expansion + substitution', '$102^2 = 10404$, $98^2 = 9604$'],
      ['$(a+b)(a-b) = a^2 - b^2$', 'expansion + substitution', '$101 \\times 99 = 9999$'],
      ['$(a \\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3$', 'expansion + substitution', '$205^2 = 200^2 + 2\\cdot200\\cdot5 + 25$'],
      ['$a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)$', 'expansion + substitution', 'factoring $8x^3 - 27$'],
      ['$(a+b+c)^2 = a^2+b^2+c^2+2ab+2bc+2ca$', 'expansion + substitution', 'squares of three-term sums'],
      ['$x^3+y^3+z^3-3xyz = (x+y+z)(x^2+y^2+z^2-xy-yz-zx)$', 'expansion + substitution', 'the sum-zero staple'],
      ['$(a^2+b^2)(c^2+d^2) = (ac+bd)^2 + (ad-bc)^2$', 'expansion + substitution', 'two squares from two squares'],
    ] },
    { kind: 'para', text: 'One distinction deserves its own box of light, because examinations test it directly: an EQUATION is a claim about SOME values — $x^2 - 3x + 2 = 0$ asks which $x$ work, and the answer is a pair of doors — while an IDENTITY is a fact about EVERY value: substitute $a = 3$, $b = 2$, or $a = \\frac{1}{2}$, $b = -\\frac{7}{4}$, or anything at all, and the two sides stay equal. That is why the verifier certifies each row by EXPANSION (coefficient against coefficient, so the equality is structural, not lucky) and then again on designed substitutions including negatives and fractions — two independent certificates for one row. It is also why an identity may be read RIGHT-TO-LEFT as a factorization: $a^2 - b^2$ factors because $(a+b)(a-b)$ multiplies back to it for every $a$ and $b$, which is 4.3’s whole engine arriving in one line.' },
    { kind: 'para', text: 'One distinction deserves its own box of light, because examinations test it directly: an EQUATION is a claim about SOME values — $x^2 - 3x + 2 = 0$ asks which $x$ work, and the answer is a pair of doors — while an IDENTITY is a fact about EVERY value: substitute $a = 3$, $b = 2$, or $a = \\frac{1}{2}$, $b = -\\frac{7}{4}$, or anything at all, and the two sides stay equal. That is why the verifier certifies each row by EXPANSION (coefficient against coefficient, so the equality is structural, not lucky) and then again on designed substitutions including negatives and fractions — two independent certificates for one row. It is also why an identity may be read RIGHT-TO-LEFT as a factorization: $a^2 - b^2$ factors because $(a+b)(a-b)$ multiplies back to it for every $a$ and $b$, which is 4.3’s whole engine arriving in one line.' },
    { kind: 'derivation', title: 'The Cube of a Sum, Derived from the Square', statement: 'From the bank’s $(a+b)^2 = a^2 + 2ab + b^2$, multiply once more by $(a+b)$ and collect: $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.', steps: [
      { label: 'Start from the certified square', formula: '(a+b)^3 = (a+b)^2 \\cdot (a+b) = (a^2 + 2ab + b^2)(a+b)', explanation: 'the cube is the square times the base — one multiplication, no new principle.' },
      { label: 'Distribute term by term', formula: 'a^3 + 2a^2b + ab^2 + a^2b + 2ab^2 + b^3', explanation: 'each of the three terms of the square meets each of the two of the base: six products, all monomials.' },
      { label: 'Collect the twins', formula: 'a^3 + (2a^2b + a^2b) + (ab^2 + 2ab^2) + b^3', explanation: 'the six products collapse into four: two pairs were twins all along.' },
      { label: 'Read the coefficients', formula: '1,\\;3,\\;3,\\;1', explanation: 'the staircase of the binomial cube — 9.2’s completion saw these numbers arrive one column at a time.' },
    ], result: 'Thus $(a+b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$ — certified independently by the verifier’s coefficient-exact expansion, and again on the designed pairs $(3, 2)$, $(5, -2)$, $(\\frac{1}{2}, \\frac{1}{3})$ and $(-7, 4)$.' },
    { kind: 'equation', latex: '(a+b)^2 = a^2 + 2ab + b^2 \\qquad (a+b)(a-b) = a^2 - b^2', note: 'the bank’s two most-used rows — the middle term and the disappearing cross-terms, both certified for every $a$ and $b$' },
    { kind: 'heading', text: 'The Geometric Read' },
    { kind: 'para', text: 'The two most-used rows have pictures, and the pictures are two thousand three hundred years old. Euclid’s Book II — the chapter geometers call his “geometric algebra” — states the identities as facts about AREAS: cut a square of side $a + b$ once vertically and once horizontally and it falls into $a^2$, two congruent $ab$ rectangles, and $b^2$; that is Proposition II.4, which is $(a+b)^2$ before symbols existed. The verifier pinned the figure’s geometry before drawing it: the side splits as $160 + 100$ pixels, and the area count is the identity, term by term.' },
    { kind: 'figure', caption: 'The square of a sum as areas: the big square of side a + b cut into the a² square, two twin ab rectangles, and the b² corner. The identity is the area count — the middle term 2ab is literally the two amber panels.', svg: squareSumSvg() },
    { kind: 'para', text: 'The difference of squares rearranges. Strike the $b \\times b$ corner from the $a \\times a$ square and an L remains, of area $a^2 - b^2$. Cut the L horizontally below the corner: the bottom band is $a \\times (a - b)$ and the small block on top is $(a - b) \\times b$. Rotate that block a quarter turn and weld it to the band’s end: the two pieces form a strip $a + b$ long and $a - b$ tall — area $(a+b)(a-b)$, the same area in new clothes. The figure is drawn to scale with $a = 210$ and $b = 60$ pixels, so you may check the areas literally: $210^2 - 60^2 = 40500$ pixels, and $270 \\times 150 = 40500$.' },
    { kind: 'figure', caption: 'The difference of squares: the L of a² − b² (the b² corner struck out) cut into two pieces and rearranged — the small block rotating to the strip’s end — into the (a + b) by (a − b) strip. Same area, new shape: a² − b² = (a + b)(a − b).', svg: diffSquaresStripSvg() },
    { kind: 'callout', tone: 'historical', title: 'Historical note — geometric algebra, and the symbols that came late', text: 'Euclid’s Elements (c. 300 BCE) proves Book II, Proposition 4 as this lesson’s first figure: the square on a divided line, stated in areas, no letters at all — Greek mathematics spoke in lengths and rectangles because its letters were words, not symbols. The difference of squares sits nearby in Book II’s earlier propositions, likewise as areas. Symbolic algebra as you are using it — letters for arbitrary quantities, an equals sign, exponents — is the sixteenth and seventeenth centuries’ work, with Viète’s systematic notation (1591) and Descartes’ lowercase convention as landmarks on the road you walked backward in one paragraph. The competition habit of this lesson is thus a compressed history: think in Euclid’s pictures, write in Viète’s symbols, decide in seconds. Web-checked against the standard histories; no content reproduced.' },
    { kind: 'heading', text: 'Speed Reads' },
    { kind: 'para', text: 'The speed reads all run one pattern: WRITE THE NUMBERS AS A SUM OR DIFFERENCE OF EASY ONES, then let the identity do the arithmetic. The difference of squares first, because it is the fastest: $101 \\times 99 = (100 + 1)(100 - 1) = 10000 - 1 = 9999$; $97 \\times 103 = 100^2 - 9 = 9991$; and the six-digit cousin $998 \\times 1002 = 1000000 - 4 = 999996$. Paired squares read the same identity sideways: $105^2 - 95^2 = (105 - 95)(105 + 95) = 10 \\cdot 200 = 2000$, and $205^2 - 195^2 = 10 \\cdot 400 = 4000$ — the examiner’s favourite shape, solved in one breath without squaring anything.' },
    { kind: 'para', text: 'The binomial squares carry their middle term like a handle: $102^2 = (100 + 2)^2 = 10000 + 400 + 4 = 10404$ and $98^2 = (100 - 2)^2 = 10000 - 400 + 4 = 9604$ — note the middle term’s sign flipping while the two squares stay positive. Bigger anchors work identically: $205^2 = 40000 + 2000 + 25 = 42025$ and $195^2 = 40000 - 2000 + 25 = 38025$. Anchor choice is the craft: pick the ROUND number the operands hug ($100$, $1000$, $200$), read off the deviation $h$, and the identity prices the square as anchor-squared, plus-or-minus twice anchor-times-$h$, plus $h$-squared — the third term being small enough to compute instantly. And the cube twins are the symmetric trick of the identity bank: pairing $m + h$ with $m - h$ kills the odd powers of $h$, leaving' },
    { kind: 'equation', latex: '(m+h)^3 + (m-h)^3 = 2m(m^2 + 3h^2) \\qquad (m+h)^3 - (m-h)^3 = 2h(3m^2 + h^2)', note: 'the even twin and the odd twin — verified by expansion and priced at (m, h) = (100, 1) and (100, 3)' },
    { kind: 'example', title: 'Evaluate 101³ + 99³ and 103³ − 97³ without cubing anything the long way', steps: [
      'Pair the bases around the anchor: $101 = 100 + 1$ and $99 = 100 - 1$, so $m = 100$, $h = 1$.',
      'The even twin: $101^3 + 99^3 = 2m(m^2 + 3h^2) = 2 \\cdot 100 \\cdot (10000 + 3) = 200 \\cdot 10003$.',
      'So, $200 \\cdot 10003 = 2000600$ — and the verifier priced both cubes directly: $1030301 + 970299 = 2000600$, agreeing exactly.',
      'The odd twin for the second: $103 = 100 + 3$, $97 = 100 - 3$, so $103^3 - 97^3 = 2h(3m^2 + h^2) = 6 \\cdot (30000 + 9) = 6 \\cdot 30009$.',
      'Hence $6 \\cdot 30009 = 180054$ — again the direct cubes agree: $1092727 - 912673 = 180054$.',
    ], },
    { kind: 'callout', tone: 'warn', title: 'Caution — the middle term is the whole trap', text: 'The false pattern $(a + b)^2 = a^2 + b^2$ is the most-marked error in elementary algebra, and it dies at a single substitution: at $a = b = 1$ it claims $4 = 2$. The identity’s certification is exactly the defence — an identity holds for EVERY value, so one counterexample kills a false pattern forever, while the expansion certificate (six products collecting into four terms) upholds the true one. The same discipline guards the cube: $(a + b)^3$ has BOTH cross-terms, $3a^2b$ and $3ab^2$, and they are not the same term. Speed without the certificate is guessing; the certificate is what makes the speed honest.' },
    { kind: 'heading', text: 'The Symmetric Reads' },
    { kind: 'para', text: 'Chapter 9.4 taught that the sum and product of roots read off a quadratic’s coefficients — Viète’s relations — and built the symmetric quartet from them. The competition use runs the same machinery FORWARD: given the symmetric data, price the symmetric expressions without ever solving for the individuals. The $x + y$ family is the direct one: with $x + y = 7$ and $xy = 6$ (the designed pair is $6$ and $1$, though you never need them):' },
    { kind: 'equation', latex: 'x^2 + y^2 = (x+y)^2 - 2xy, \\quad x^3 + y^3 = (x+y)^3 - 3xy(x+y), \\quad (x-y)^2 = (x+y)^2 - 4xy', note: 'the symmetric quartet of 9.4, priced here without solving: $37 = 49 - 12$, $217 = 343 - 126$, $25 = 49 - 24$' },
    { kind: 'example', title: 'Given x + y = 7 and xy = 6, find x² + y², x³ + y³ and |x − y| without solving for x and y', steps: [
      'Square the sum: $(x + y)^2 = 49$ expands to $x^2 + 2xy + y^2 = 49$.',
      'So, $x^2 + y^2 = 49 - 2 \\cdot 6 = 37$ — the pair term subtracted twice.',
      'Cube the sum: $(x + y)^3 = 343$ expands to $x^3 + y^3 + 3xy(x + y) = 343$.',
      'Now, $3xy(x+y) = 3 \\cdot 6 \\cdot 7 = 126$, so $x^3 + y^3 = 343 - 126 = 217$.',
      'The bridge prices the gap: $(x - y)^2 = 49 - 24 = 25$, so $|x - y| = 5$ — and the verifier confirms every value on the individuals $x = 6$, $y = 1$: $36 + 1 = 37$, $216 + 1 = 217$, $6 - 1 = 5$.',
    ], },
    { kind: 'para', text: 'The bridge identity $(x+y)^2 - (x-y)^2 = 4xy$ — certified in the bank by expansion — ties the family together and prices the gap: from $49$ and $24$ you read $|x - y| = 5$, which is 9.4’s $(\\alpha - \\beta)^2 = \\frac{\\Delta}{a^2}$ wearing casual clothes. The second designed pair runs the same quartet: $x + y = 12$, $xy = 27$ (the pair is $9$ and $3$) gives $x^2 + y^2 = 144 - 54 = 90$ and $x^3 + y^3 = 1728 - 972 = 756$; the verifier priced every value both from the identities and from the individuals, and the two computations agree exactly.' },
    { kind: 'para', text: 'The $x + \\frac{1}{x}$ family is the same idea self-contained — the data IS the symmetry. Write $s_1 = x + \\frac{1}{x}$ and the power ladder climbs by squaring and cubing: $x^2 + \\frac{1}{x^2} = s_1^2 - 2$, then $x^3 + \\frac{1}{x^3} = s_1^3 - 3s_1$ (this is the cube of a sum with $a = x$, $b = \\frac{1}{x}$, whose product $ab = 1$ kills the cross-terms), and the ladder continues by $s_{m+n} = s_m s_n - s_{m-n}$. For $x + \\frac{1}{x} = 5$ the verifier certified the whole run with exact surd arithmetic on $x = \\frac{5 + \\sqrt{21}}{2}$ — the honest individual behind the symmetric data — and the ladder agrees at every rung.' },
    { kind: 'example', title: 'If x + 1/x = 5, find x² + 1/x², x³ + 1/x³ and x⁵ + 1/x⁵', steps: [
      'Square the data: $\\left(x + \\frac{1}{x}\\right)^2 = x^2 + 2 + \\frac{1}{x^2} = 25$, so $x^2 + \\frac{1}{x^2} = 25 - 2 = 23$.',
      'Cube the data: $\\left(x + \\frac{1}{x}\\right)^3 = x^3 + 3x + \\frac{3}{x} + \\frac{1}{x^3} = 125$.',
      'Now, $3x + \\frac{3}{x} = 3s_1 = 15$, so $x^3 + \\frac{1}{x^3} = 125 - 15 = 110$.',
      'The two-step ladder for the fifth power: $s_5 = s_2 s_3 - s_1 = 23 \\cdot 110 - 5$.',
      'Hence $x^5 + \\frac{1}{x^5} = 2530 - 5 = 2525$ — surd-certified by the verifier at $x = \\frac{5+\\sqrt{21}}{2}$.',
    ], },
    { kind: 'para', text: 'Three variables extend the family, and the crown of the extension is the staple the examiner loves: expanding $(x + y + z)(x^2 + y^2 + z^2 - xy - yz - zx)$ collapses — the verifier watched it collapse, term by term — to $x^3 + y^3 + z^3 - 3xyz$. Read it as a verdict machine: whenever $x + y + z = 0$, the left factor is zero, so $x^3 + y^3 + z^3 = 3xyz$ — one line, no expanding at the point of use. The designed triple $\\{1, 2, -3\\}$ prices it: the cubes sum to $1 + 8 - 27 = -18$ and $3xyz = 3 \\cdot (-6) = -18$, equal exactly. And the square triple $\\{2, 3, 5\\}$ prices the supporting cast: sum $10$, pairwise $31$, so $x^2 + y^2 + z^2 = 100 - 62 = 38$ and $x^3 + y^3 + z^3 - 3xyz = 10 \\cdot (38 - 31) = 70$, the direct cubes agreeing at $8 + 27 + 125 - 90$.' },
    { kind: 'para', text: 'The sum-zero condition hides a second, quieter identity, and deriving it shows how conditional reads work. If $x + y + z = 0$, then $z = -(x + y)$; substituting into $x^2 + y^2 + z^2$ and expanding gives $x^2 + y^2 + (x + y)^2 = 2x^2 + 2y^2 + 2xy = -2(xy + yz + zx)$ — so under the condition, the sum of squares is MINUS TWICE the pairwise sum. The designed triple prices it: for $\\{1, 2, -3\\}$, the squares sum to $14$ and the pairwise sum is $2 - 6 - 3 = -7$, and indeed $14 = -2 \\cdot (-7)$; the verifier ran a second triple $\\{2, -5, 3\\}$ — squares $38$, pairwise $-19$ — and $38 = -2 \\cdot (-19)$ again. The moral is the competition habit itself: under a CONDITION, substitute it everywhere and let the algebra collapse; the collapse, not the memorization, is the answer.' },
    { kind: 'heading', text: 'The Clever Substitution' },
    { kind: 'para', text: 'The last technique is a habit more than a theorem: WHEN AN EXPRESSION REPEATS, NAME IT. The warm-up repeats $2x + 1$: the equation $(2x+1)^2 - 5(2x+1) + 6 = 0$ is a quadratic wearing a linear costume, and naming $t = 2x + 1$ strips it — $t^2 - 5t + 6 = 0$, doors $t = 2$ and $t = 3$, so $x = \\frac{1}{2}$ or $x = 1$, both re-priced in the original by the verifier. Nothing was solved that chapter 9 did not already own; the substitution merely aimed the quadratic machinery at the right target.' },
    { kind: 'para', text: 'The full example repeats a QUADRATIC, and the collapse lands four real roots — a quartic done with chapter 9’s toolkit alone. Watch the shape of the move: the expression $x^2 - 3x + 3$ appears twice, once squared and once bare, exactly as $2x + 1$ did.' },
    { kind: 'example', title: 'Solve (x² − 3x + 3)² − 3(x² − 3x + 3) + 2 = 0', steps: [
      'NAME the repeating expression: $t = x^2 - 3x + 3$. The equation reads $t^2 - 3t + 2 = 0$.',
      'SOLVE the collapsed quadratic: $(t - 1)(t - 2) = 0$, doors $t = 1$ and $t = 2$.',
      'The $t = 1$ arm: $x^2 - 3x + 3 = 1$, i.e. $x^2 - 3x + 2 = 0$ — doors $x = 1$ and $x = 2$.',
      'The $t = 2$ arm: $x^2 - 3x + 3 = 2$, i.e. $x^2 - 3x + 1 = 0$ — $\\Delta = 5$, not a rational square, so 9.3’s formula opens the surd doors $x = \\frac{3 \\pm \\sqrt{5}}{2}$.',
      'CHECK the surd doors in the original, as the verifier did with exact surd arithmetic: at $x = \\frac{3+\\sqrt{5}}{2}$ the expression $x^2 - 3x + 3$ reads exactly $2$, and $2^2 - 3 \\cdot 2 + 2 = 0$.',
      'Hence four real roots: $1$, $2$, $\\frac{3 + \\sqrt{5}}{2}$ and $\\frac{3 - \\sqrt{5}}{2}$ — a quartic, retired by a naming.',
    ], },
    { kind: 'callout', tone: 'insight', title: 'Insight — the substitution is a change of camera', text: 'The quartic never changed when you wrote $t = x^2 - 3x + 3$; only the LENS did. Through the $x$-lens it is degree four, untouchable by chapter 9; through the $t$-lens it is $t^2 - 3t + 2 = 0$, a friend. Every clever substitution you will ever meet is this: find the expression the equation keeps repeating, aim the camera at IT, solve the smaller picture, then translate back through the definition — and check in the original, because the surd doors especially deserve their own verification. 9.2’s completing the square was already this habit (the camera aimed at $x + \\frac{b}{2a}$); competition algebra merely makes the habit explicit and fast.' },
    { kind: 'para', text: 'One more staple closes the lesson, and it is the oldest one: the product of two sums of two squares is again a sum of two squares — the Brahmagupta–Fibonacci identity, $(a^2+b^2)(c^2+d^2) = (ac+bd)^2 + (ad-bc)^2$, certified in the bank by expansion and priced on three designed pairs. Its competition use is the factorization trick: $5 = 1^2 + 2^2$ and $13 = 2^2 + 3^2$, so $65 = 5 \\cdot 13$ must be a sum of two squares — and the identity hands you BOTH reads at once: matching the factors straight gives $65 = 7^2 + 4^2$, while flipping one factor’s sign (the pair $(2, -3)$ for $13$) gives $65 = 1^2 + 8^2$. One number, two representations, and the identity explains why both must exist — the kind of one-line answer that wins marks and arguments alike.' },
    { kind: 'terms', items: [
      { term: 'identity', def: 'an equality true for EVERY value of its letters — certified by expansion (and by designed substitution), which is precisely what licenses using it at speed in either direction.' },
      { term: 'the identity bank', def: 'the seven certified rows of this lesson: the binomial squares, the difference of squares, the binomial cubes and their sum/difference-of-cubes factorizations, $(a+b+c)^2$, the three-variable cubic staple, and the two-squares identity.' },
      { term: 'speed read', def: 'competition arithmetic by identity: write the operands as a sum or difference of easy anchors ($101 \\times 99$ around 100, $205^2$ around 200) and let the identity do the work.' },
      { term: 'symmetric read', def: 'pricing a symmetric expression ($x^2 + y^2$, $x^3 + 1/x^3$, …) from symmetric data ($x + y$ and $xy$, or $x + 1/x$) without ever finding the individuals — 9.4’s craft at speed.' },
      { term: 'the clever substitution', def: 'naming a repeating expression ($t = x^2 - 3x + 3$) so the equation collapses to one of lower degree in $t$; solve, translate back through the definition, check in the original.' },
      { term: 'the two-squares identity', def: 'the Brahmagupta–Fibonacci row $(a^2+b^2)(c^2+d^2) = (ac+bd)^2 + (ad-bc)^2$: the product of two sums of two squares is itself a sum of two squares — twice over, by the two matchings.' },
    ] },
    { kind: 'list', marker: 'roman', items: [
      'An identity holds for every value of its letters; certification is by expansion and substitution, and one counterexample kills a false pattern — $(a+b)^2 \\neq a^2 + b^2$ dies at $a = b = 1$.',
      'The geometric read: $(a+b)^2$ is a cut square (Euclid II.4), and $a^2 - b^2$ is an L rearranged into the $(a+b) \\times (a-b)$ strip — the identities are area counts.',
      'Speed reads pair around anchors: $101 \\times 99 = 9999$, $105^2 - 95^2 = 2000$, and the cube twins $(m \\pm h)^3$ collapse to $2m(m^2 + 3h^2)$ and $2h(3m^2 + h^2)$.',
      'The symmetric reads need no individuals: $x^2 + y^2 = S^2 - 2P$, $x^3 + y^3 = S^3 - 3PS$, and the $x + \\frac{1}{x}$ ladder climbs by $s_{m+n} = s_m s_n - s_{m-n}$.',
      'The sum-zero staple: $x + y + z = 0$ forces $x^3 + y^3 + z^3 = 3xyz$ — one factor of the certified expansion vanishes, and the verdict is free.',
      'When an expression repeats, name it: $t = x^2 - 3x + 3$ retires a quartic to a quadratic with four real roots — then check every door, surds included, in the original.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The competitive bank examines this lesson constantly and in fixed shapes (Khattar QA’s algebra scope; SSC and bank mains; JEE-Main foundations): (1) the value hunt — “evaluate $102 \\times 98$” or “$1.02^2 + 0.98^2$”-class items — one identity recognition, no multiplication; (2) the symmetric chain — given $x + \\frac{1}{x}$, demand $x^3 + \\frac{1}{x^3}$ or a two-step ladder value, exactly the designed ladder of this lesson; (3) the conditional identity — “if $a + b + c = 0$, show $a^3 + b^3 + c^3 = 3abc$”, a full-marks one-liner from the certified factorization; (4) the hidden quadratic — a quartic or reciprocal equation whose repeating expression collapses under $t$, with the surd doors kept honest; (5) the factorization race — $a^3 \\pm b^3$ shapes and the two-squares product. The school canon prices the same rows more gently in NCERT class 8’s factorization chapter and class 9’s polynomials chapter. The unifying instruction: the certificate is the speed — know WHY the row holds, and the exam never surprises you.' },
    { kind: 'formula', name: 'The bank’s core rows', latex: '(a \\pm b)^2 = a^2 \\pm 2ab + b^2 \\qquad (a+b)(a-b) = a^2 - b^2 \\qquad (a \\pm b)^3 = a^3 \\pm 3a^2b + 3ab^2 \\pm b^3', note: 'the squares, the difference, and the cubes — certified by expansion; the middle term and the twin cross-terms are the traps' },
    { kind: 'formula', name: 'The cubes as factorizations', latex: 'a^3 + b^3 = (a+b)(a^2 - ab + b^2) \\qquad a^3 - b^3 = (a-b)(a^2 + ab + b^2)', note: '4.3’s identities read backward — the competition factorization race' },
    { kind: 'formula', name: 'The symmetric ladder', latex: 's_{m+n} = s_m s_n - s_{m-n} \\;\\text{on}\\; s_k = x^k + \\tfrac{1}{x^k}; \\qquad x^3 + y^3 = (x+y)^3 - 3xy(x+y)', note: 'climb from $x + \\frac{1}{x} = 5$: 23, 110, 2525; price the pair family without solving — 217 from 7 and 6' },
    { kind: 'formula', name: 'The three-variable staple', latex: 'x^3 + y^3 + z^3 - 3xyz = (x+y+z)(x^2+y^2+z^2-xy-yz-zx)', note: 'the sum-zero verdict $x^3+y^3+z^3 = 3xyz$ falls out when the first factor dies — {1, 2, −3} prices it at −18' },
    { kind: 'formula', name: 'The two-squares identity', latex: '(a^2+b^2)(c^2+d^2) = (ac+bd)^2 + (ad-bc)^2', note: 'Brahmagupta–Fibonacci: products of two-square sums stay two-square sums — 65 = 7² + 4² = 1² + 8², both matchings' },
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'By identity, $101 \\times 99$ equals', options: ['$9900$', '$9999$', '$10001$', '$9899$'], answer: 1, explain: 'Write the operands around the anchor: $(100 + 1)(100 - 1) = 100^2 - 1^2 = 9999$. $9900$ subtracts the full 100; $10001$ adds instead of subtracting; $9899$ subtracts 101 — three ways of doing the arithmetic the identity exists to skip.' },
      { q: '$105^2 - 95^2$ equals', options: ['$100$', '$10$', '$2000$', '$200$'], answer: 2, explain: 'The paired difference reads straight off the factorization: $(105 - 95)(105 + 95) = 10 \\cdot 200 = 2000$ — no squaring at all. $200$ is only the second factor; $100$ is the gap squared misread; $10$ is the gap alone.' },
      { q: 'If $x + \\frac{1}{x} = 5$, then $x^2 + \\frac{1}{x^2}$ equals', options: ['$23$', '$27$', '$25$', '$10$'], answer: 0, explain: 'Square the data and subtract the middle: $25 - 2 = 23$ — the verifier certified it again by exact surd arithmetic at $x = \\frac{5+\\sqrt{21}}{2}$. $25$ forgets the $-2$; $27$ adds it; $10$ halves nothing that is halvable.' },
      { q: 'The substitution $t = x^2 - 3x + 3$ turns $(x^2-3x+3)^2 - 3(x^2-3x+3) + 2 = 0$ into', options: ['$t^4 - 3t^2 + 2 = 0$', '$x^2 - 3x + 2 = 0$', '$2t - 3 = 0$', '$t^2 - 3t + 2 = 0$'], answer: 3, explain: 'Name the repeating expression and substitute VERBATIM: every appearance of $x^2 - 3x + 3$ becomes $t$, leaving $t^2 - 3t + 2 = 0$ — doors $t = 1, 2$, hence four real $x$-roots. $t^4$ mis-reads the square as a fourth power; $x^2 - 3x + 2 = 0$ is one ARM of the aftermath, not the collapse; $2t - 3$ is not this equation at all.' },
      { q: 'The twin read prices $101^3 + 99^3$ as', options: ['$2{,}000{,}000$', '$2{,}000{,}600$', '$1{,}999{,}998$', '$2{,}060{,}000$'], answer: 1, explain: 'The even twin: $(m+h)^3 + (m-h)^3 = 2m(m^2 + 3h^2)$ with $m = 100$, $h = 1$ gives $2 \\cdot 100 \\cdot 10003 = 2000600$ — and the direct cubes agree: $1030301 + 970299$. $2{,}000{,}000$ forgets the $3h^2$ correction entirely; $1{,}999{,}998$ subtracts it; $2{,}060{,}000$ mis-multiplies it.' },
    ] },
    { kind: 'exercises', title: 'Exercises 11.2', sets: [
      { level: 'L1', questions: [
        { q: 'Expand $(x + 3)^2$, and verify the identity at $x = 2$.', solution: [
          'The bank row: $(x + 3)^2 = x^2 + 2 \\cdot x \\cdot 3 + 3^2 = x^2 + 6x + 9$.',
          'Verify at $x = 2$: the left reads $5^2 = 25$.',
          'So, the right reads $4 + 12 + 9 = 25$ — the certificate holds on this substitution.',
        ], answer: '$x^2 + 6x + 9$; both sides 25.' },
        { q: 'Evaluate $97 \\times 103$ by identity.', solution: [
          'Anchor at 100: $97 \\times 103 = (100 - 3)(100 + 3) = 100^2 - 3^2$.',
          'Hence $10000 - 9 = 9991$ — one subtraction, no multiplication.',
        ], answer: '9991.' },
        { q: 'Factor $8x^3 - 27$ completely.', solution: [
          'Recognize the cubes: $8x^3 = (2x)^3$ and $27 = 3^3$.',
          'The difference-of-cubes row: $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$ with $a = 2x$, $b = 3$.',
          'Hence $8x^3 - 27 = (2x - 3)(4x^2 + 6x + 9)$ — and the quadratic factor has $\\Delta = 36 - 144 < 0$, so the factoring is complete over the reals.',
        ], answer: '$(2x - 3)(4x^2 + 6x + 9)$.' },
      ] },
      { level: 'L2', questions: [
        { q: 'Evaluate $1002^2 - 998^2$ by identity.', solution: [
          'Pair around 1000: the difference of squares factorizes first — $(1002 - 998)(1002 + 998)$.',
          'So, $4 \\cdot 2000 = 8000$ — the squares themselves never computed.',
        ], answer: '8000.' },
        { q: 'If $x + \\frac{1}{x} = 7$, find $x^2 + \\frac{1}{x^2}$ and $x^3 + \\frac{1}{x^3}$.', solution: [
          'Square the data: $x^2 + 2 + \\frac{1}{x^2} = 49$, so $x^2 + \\frac{1}{x^2} = 49 - 2 = 47$.',
          'Cube the data: $x^3 + 3\\left(x + \\frac{1}{x}\\right) + \\frac{1}{x^3} = 343$.',
          'So, $x^3 + \\frac{1}{x^3} = 343 - 21 = 322$.',
        ], answer: '47 and 322.' },
        { q: 'Expand $(2x - 3y)^2$, and verify at $(x, y) = (3, 1)$.', solution: [
          'The bank row with the minus: $(2x - 3y)^2 = 4x^2 - 12xy + 9y^2$.',
          'Verify at $(3, 1)$: the left reads $(6 - 3)^2 = 9$.',
          'So, the right reads $36 - 36 + 9 = 9$ — the middle term does its cancelling exactly.',
        ], answer: '$4x^2 - 12xy + 9y^2$; both sides 9.' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $(x^2 - 5x + 5)^2 - (x^2 - 5x + 5) - 2 = 0$ by substitution (the lesson’s sibling).', solution: [
          'NAME: $t = x^2 - 5x + 5$ — the equation reads $t^2 - t - 2 = 0$.',
          'SOLVE: $(t - 2)(t + 1) = 0$ — doors $t = 2$ and $t = -1$.',
          'The $t = -1$ arm: $x^2 - 5x + 5 = -1$, i.e. $x^2 - 5x + 6 = 0$ — doors $x = 2$ and $x = 3$.',
          'The $t = 2$ arm: $x^2 - 5x + 3 = 0$ — $\\Delta = 13$, so $x = \\frac{5 \\pm \\sqrt{13}}{2}$.',
          'Hence four real roots; CHECK one of each arm: at $x = 2$ the repeating expression reads $-1$ and $(-1)^2 - (-1) - 2 = 0$; the surd doors were certified by the verifier’s exact surd arithmetic.',
        ], answer: '$x = 2, 3, (5 \\pm \\sqrt{13})/2$.' },
        { q: 'Given $x + y = 12$ and $xy = 27$, find $x^2 + y^2$, $x^3 + y^3$ and $|x - y|$, without solving for $x$ and $y$.', solution: [
          'The symmetric quartet: $x^2 + y^2 = (x+y)^2 - 2xy = 144 - 54 = 90$.',
          'The cube row: $x^3 + y^3 = (x+y)^3 - 3xy(x+y) = 1728 - 972 = 756$.',
          'The bridge: $(x - y)^2 = (x+y)^2 - 4xy = 144 - 108 = 36$, so $|x - y| = 6$.',
          'So, the individuals are $9$ and $3$ — agreeing with every value above, as the verifier priced.',
        ], answer: '90, 756 and 6.' },
        { q: 'Evaluate $101^3 + 99^3$ by the twin read, and confirm with the direct cubes.', solution: [
          'The even twin: $(m+h)^3 + (m-h)^3 = 2m(m^2 + 3h^2)$ with $m = 100$, $h = 1$.',
          'So, $2 \\cdot 100 \\cdot (10000 + 3) = 200 \\cdot 10003 = 2000600$.',
          'Confirm: the direct cubes read $1030301 + 970299 = 2000600$ — the twin read is exact, and it cost two multiplications instead of two cubings.',
        ], answer: '2,000,600.' },
      ] },
      { level: 'L4', questions: [
        { q: 'If $x + \\frac{1}{x} = 4$, find $x^3 + \\frac{1}{x^3}$ and $x^4 + \\frac{1}{x^4}$.', solution: [
          'Square the data: $x^2 + \\frac{1}{x^2} = 16 - 2 = 14$.',
          'Cube the data: $x^3 + \\frac{1}{x^3} = 64 - 3 \\cdot 4 = 52$.',
          'Square the second rung: $x^4 + \\frac{1}{x^4} = 14^2 - 2 = 194$.',
          'Hence 52 and 194 — two ladder moves, no solving, no surds needed.',
        ], answer: '52 and 194.' },
        { q: 'For $\\{x, y, z\\} = \\{2, 3, 5\\}$: verify $x^2+y^2+z^2 = 38$ two ways, and price $x^3 + y^3 + z^3 - 3xyz$ by the staple.', solution: [
          'Directly: $4 + 9 + 25 = 38$.',
          'The symmetric way: $(x+y+z)^2 - 2(xy+yz+zx) = 100 - 2 \\cdot 31 = 38$ — the two computations agree.',
          'The staple: $x^3 + y^3 + z^3 - 3xyz = (x+y+z)(x^2+y^2+z^2 - xy - yz - zx) = 10 \\cdot (38 - 31)$.',
          'Hence $10 \\cdot 7 = 70$ — and directly: $8 + 27 + 125 - 90 = 70$.',
        ], answer: '38 verified both ways; the staple prices 70.' },
        { q: 'Show that $x + y + z = 0$ forces $x^3 + y^3 + z^3 = 3xyz$, and verify on $\\{1, 2, -3\\}$.', solution: [
          'The certified staple: $x^3 + y^3 + z^3 - 3xyz = (x+y+z)(x^2+y^2+z^2 - xy - yz - zx)$.',
          'If $x + y + z = 0$, the FIRST factor is zero, so the whole right side is zero.',
          'Hence $x^3 + y^3 + z^3 = 3xyz$ — a one-line verdict, no expansion at the point of use.',
          'Verify on $\\{1, 2, -3\\}$: the cubes read $1 + 8 - 27 = -18$, and $3xyz = 3 \\cdot (1 \\cdot 2 \\cdot (-3)) = -18$ — equal exactly.',
        ], answer: 'Proved from the staple; verified: both sides −18.' },
      ] },
      { level: 'L5', questions: [
        { q: 'If $x + \\frac{1}{x} = 3$, find $x^5 + \\frac{1}{x^5}$ by the two-step ladder.', solution: [
          'Climb: $x^2 + \\frac{1}{x^2} = 9 - 2 = 7$, then $x^3 + \\frac{1}{x^3} = 27 - 9 = 18$.',
          'The two-step ladder: $s_5 = s_2 \\cdot s_3 - s_1 = 7 \\cdot 18 - 3$.',
          'Hence $x^5 + \\frac{1}{x^5} = 126 - 3 = 123$ — certified by the verifier with exact surd arithmetic at $x = \\frac{3+\\sqrt{5}}{2}$.',
        ], answer: '123.' },
      ] },
      { level: 'L6', questions: [
        { q: 'State the Brahmagupta–Fibonacci two-squares identity, certify it by expansion, and use it to explain why $65 = 5 \\cdot 13$ is a sum of two squares in TWO different ways.', solution: [
          'State: $(a^2+b^2)(c^2+d^2) = (ac+bd)^2 + (ad-bc)^2$.',
          'Certify: expand the right — $a^2c^2 + 2abcd + b^2d^2 + a^2d^2 - 2abcd + b^2c^2$ — the $2abcd$ twins cancel, leaving $a^2c^2 + a^2d^2 + b^2c^2 + b^2d^2$, which is exactly the expanded left. (The verifier certified it symbolically, coefficient by coefficient.)',
          'The factors: $5 = 1^2 + 2^2$ and $13 = 2^2 + 3^2$, so $65 = (1^2+2^2)(2^2+3^2)$ must be a two-square sum.',
          'Straight matching ($a, b, c, d = 1, 2, 2, 3$): $ac + bd = 2 + 6 = 8$ and $ad - bc = 3 - 4 = -1$, giving $65 = 8^2 + 1^2$.',
          'Flipped matching (use $c, d = 2, -3$ for $13 = 2^2 + (-3)^2$): $ac + bd = 2 - 6 = -4$ and $ad - bc = -3 - 4 = -7$, giving $65 = 4^2 + 7^2$.',
          'Hence $65 = 1^2 + 8^2 = 4^2 + 7^2$ — two matchings of the same factors, two representations, both priced by the verifier.',
        ], answer: 'The identity as stated; $65 = 1^2 + 8^2 = 4^2 + 7^2$.' },
      ] },
    ] },
  ],
}

export const chapter11: Chapter = {
  number: 11,
  slug: 'the-toolbox-and-the-doorstep',
  title: 'The Toolbox and the Doorstep',
  summary:
    'The whole course at work and the door out: word problems solved end-to-end through the five-station pipeline across the canon’s families (mixture, motion, work-rate, age, money, and the inequality fences where problems ask bounds), and competition algebra — the identity bank certified by expansion, the geometric reads, the speed reads, the symmetric ladders, and the clever substitution — as the techniques Khattar and Hall & Knight bank. The function idea (11.3) closes the book at the doorstep to Advanced Algebra and Calculus.',
  status: 'in-progress',
  lessons: [lesson111, lesson112],
  plannedLessons: ['The Function Idea: the Doorstep'],
}
