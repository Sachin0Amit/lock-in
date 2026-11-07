import type { Chapter } from '../../../types'

/**
 * Elementary Algebra — Chapter 1: Letters and Structure
 *
 * LESSONS WRITTEN: 1.1 From Arithmetic to Algebra: What a Letter Does
 *                  (run 67 — quiz keys 2/1/3/0/2, 14 exercises, two
 *                  figures, verified E2E-green)
 *                  1.2 Expressions, Terms and Like Terms (run 67 — quiz
 *                  keys 2/1/0/3/1, 14 exercises, two figures, verified
 *                  E2E-green)
 * REMAINING (run 68): 1.3 Evaluating Expressions: Substitution and
 *                  Formulas; 1.4 Translating: Words into Symbols
 *
 * References for this unit: the Drive copy `Elementary-Algebra_text.pdf`
 * is H. S. Hall & S. R. Knight, *Elementary Algebra for Schools*
 * (Macmillan, first edition 1885; this 1942 reprint) — the run-66 header
 * had attributed it to Harold Jacobs; corrected 2026-11-07 in
 * SOURCE_LOG.md. Its chapter arc (I. Definitions, Substitutions → II.
 * Negative Quantities, Addition of Like Terms → III. Simple Brackets →
 * …) informed the sequencing of lessons 1.1–1.2; no content reproduced.
 * The Cengage MATHS M2/01 module (the style reference of runs 14/16) was
 * re-pulled for the run-67 style re-grounding (2 pages: definition voice,
 * Sol. chains) and deleted. Banked keys reused: ncert-math6-ch11 (the
 * matchstick/variable doorstep FM opened), cengage-jee-style. New
 * web-checked keys (run 67): hall-knight-elementary-algebra,
 * viete-1591-isagoge, descartes-1637-geometrie, alkhwarizmi-c825-aljabr.
 *
 * Every number of lessons 1.1–1.2 was pre-verified by
 * scripts/verify-book3-ch01.ts (sections A–G, 98 checks ALL GREEN before
 * any prose; the first pass caught two of the author's own typos — a
 * 7·12 for 4·12 in the collect-speed exhibit and a (2a+3)×4 = 32 for the
 * true 52 — both corrected before writing). Sections H (authored 1.1)
 * and I (authored 1.2) import the chapter file directly and check quiz
 * keys, exercise shape, figure geometry, citation keys, word counts and
 * the single-backslash discipline — 194 checks ALL GREEN at ship time.
 * Exposition original.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (1.1): the four hats of x — the role census as a diagram.  */
/* One letter box at the centre (250,165)-(470,265); four station      */
/* boxes 205×88 at (24,12), (490,12), (24,326), (490,326); dashed      */
/* connectors; footer y = 418. Geometry pinned in verify-book3-ch01.ts */
/* section G, audited in section H.                                    */
/* ------------------------------------------------------------------ */

function fourHatsSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 448" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One letter x at the centre wearing four hats: the placeholder with x set to 7, the generalizer stating x plus y equals y plus x for every pair, the position letter Tn equals 5n minus 1 from Foundation Mathematics 11.2, and the unknown in 3x plus 1 equals 31 to be solved in chapter 5">'
  )
  parts.push('<rect x="0" y="0" width="720" height="448" fill="transparent"/>')
  // connectors first (under the boxes)
  parts.push('<line x1="270" y1="170" x2="210" y2="100" stroke="#9a6b2f" stroke-width="1.3" stroke-dasharray="4 3"/>')
  parts.push('<line x1="450" y1="170" x2="510" y2="100" stroke="#9a6b2f" stroke-width="1.3" stroke-dasharray="4 3"/>')
  parts.push('<line x1="270" y1="262" x2="210" y2="330" stroke="#9a6b2f" stroke-width="1.3" stroke-dasharray="4 3"/>')
  parts.push('<line x1="450" y1="262" x2="510" y2="330" stroke="#9a6b2f" stroke-width="1.3" stroke-dasharray="4 3"/>')
  // the centre letter box
  parts.push('<rect x="250" y="165" width="220" height="100" rx="8" fill="none" stroke="#3f6212" stroke-width="2"/>')
  parts.push('<text x="360" y="222" font-size="40" fill="#365314" text-anchor="middle" font-weight="700" font-style="italic">x</text>')
  parts.push('<text x="360" y="250" font-size="12" fill="#6b7a72" text-anchor="middle">one letter — four jobs</text>')
  // the four stations
  const stations: [number, number, string, string, string][] = [
    [24, 12, 'The placeholder', 'let x = 7 — a chosen value', 'then 3x folds to 21'],
    [490, 12, 'The generalizer', 'x + y = y + x, every pair', 'the law wears letters (ANS 7.2)'],
    [24, 326, 'The position letter', 'Tn = 5n − 1 (FM 11.2)', 'n = where the pattern stands'],
    [490, 326, 'The unknown', '3x + 1 = 31 (FM 11.3)', 'the secret — solved in ch. 5'],
  ]
  for (const [x, y, title, l1, l2] of stations) {
    parts.push(`<rect x="${x}" y="${y}" width="205" height="88" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>`)
    parts.push(`<text x="${x + 12}" y="${y + 26}" font-size="13.5" fill="#365314" font-weight="700">${title}</text>`)
    parts.push(`<text x="${x + 12}" y="${y + 50}" font-size="11.5" fill="#4d7c0f">${l1}</text>`)
    parts.push(`<text x="${x + 12}" y="${y + 70}" font-size="11.5" fill="#6b7a72">${l2}</text>`)
  }
  // footer (y = 436 clears the station boxes, which end at y = 414)
  parts.push(
    '<text x="360" y="436" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="600">read the sentence, spot the hat — every letter sentence announces its role</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (1.1): one law, many cases — the distributive law in       */
/* letters fanning out to five verified instances. Law band            */
/* (110,16)-(610,58); five instance cards 124×74 at y = 128            */
/* (x = 20, 159, 298, 437, 576); footers y = 292 / 320; sweep note     */
/* y = 352. Geometry pinned in section G, audited in section H.        */
/* ------------------------------------------------------------------ */

function lawFanSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The distributive law a times the sum b plus c equals ab plus ac at the top, fanning down to five instance cards: 2 times 4 gives 14 both ways, 5 times 7 gives 35, minus 3 times 8 gives minus 24, 12 times 2 gives 24, and 100 times 10 gives 1000">'
  )
  parts.push('<rect x="0" y="0" width="720" height="380" fill="transparent"/>')
  // the law band
  parts.push('<rect x="110" y="16" width="500" height="42" rx="8" fill="none" stroke="#3f6212" stroke-width="1.8"/>')
  parts.push(
    '<text x="360" y="43" font-size="15" fill="#365314" text-anchor="middle" font-weight="700">a(b + c) = ab + ac — the distributive law, in letters</text>'
  )
  // the fan lines
  const cardX = [20, 159, 298, 437, 576]
  for (const x of cardX) {
    parts.push(`<line x1="360" y1="58" x2="${x + 62}" y2="128" stroke="#9a6b2f" stroke-width="1.2"/>`)
  }
  // the five instance cards
  const cards: [string, string, string][] = [
    ['2·(3 + 4)', '2·3 + 2·4', '= 14 both ways'],
    ['5·(10 − 3)', '5·10 − 5·3', '= 35 both ways'],
    ['(−3)·(2 + 6)', '−6 − 18', '= −24 both ways'],
    ['12·(1 + 1)', '12 + 12', '= 24 both ways'],
    ['100·(7 + 3)', '700 + 300', '= 1000 both ways'],
  ]
  for (let i = 0; i < cardX.length; i++) {
    const x = cardX[i]
    const [l1, l2, l3] = cards[i]
    parts.push(`<rect x="${x}" y="128" width="124" height="74" rx="6" fill="none" stroke="#3f6212" stroke-width="1.2"/>`)
    parts.push(`<text x="${x + 62}" y="${128 + 24}" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="600">${l1}</text>`)
    parts.push(`<text x="${x + 62}" y="${128 + 46}" font-size="11.5" fill="#4d7c0f" text-anchor="middle">${l2}</text>`)
    parts.push(`<text x="${x + 62}" y="${128 + 64}" font-size="11" fill="#6b7a72" text-anchor="middle">${l3}</text>`)
  }
  // footers
  parts.push(
    '<text x="360" y="292" font-size="11.5" fill="#6b7a72" text-anchor="middle">five cases, five agreements — and the script sweep ran all 6,859 triples of [−9..9]³ without one dissent</text>'
  )
  parts.push(
    '<text x="360" y="320" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="600">the letter sentence covers every case at once — the instances only make it visible</text>'
  )
  parts.push(
    '<text x="360" y="352" font-size="11" fill="#6b7a72" text-anchor="middle">swept by script (verify-book3-ch01.ts, section C): a ∈ [−9..9], b, c ∈ [−9..9]</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 3 (1.2): the expression tree of 3x + 2x − 4. Nodes are       */
/* rounded rects 96×44: root minus at (312,24); plus at (120,128) and  */
/* the leaf 4 at (504,128); times nodes at (24,232) and (216,232);     */
/* leaves 3/x/2/x at y = 336 (x = 8, 116, 262, 370); footer y = 412.   */
/* Geometry pinned in section G, audited in section I.                 */
/* ------------------------------------------------------------------ */

function treeSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The expression tree of 3x plus 2x minus 4: a minus root over a plus node and the leaf 4, the plus over two times nodes, and the leaves 3, x, 2, x — folding bottom-up gives 21 at x equals 5">'
  )
  parts.push('<rect x="0" y="0" width="720" height="430" fill="transparent"/>')
  // connectors (under the nodes)
  parts.push('<line x1="340" y1="68" x2="190" y2="128" stroke="#9a6b2f" stroke-width="1.3"/>')
  parts.push('<line x1="384" y1="68" x2="552" y2="128" stroke="#9a6b2f" stroke-width="1.3"/>')
  parts.push('<line x1="148" y1="172" x2="86" y2="232" stroke="#9a6b2f" stroke-width="1.3"/>')
  parts.push('<line x1="190" y1="172" x2="278" y2="232" stroke="#9a6b2f" stroke-width="1.3"/>')
  parts.push('<line x1="52" y1="276" x2="56" y2="336" stroke="#9a6b2f" stroke-width="1.3"/>')
  parts.push('<line x1="92" y1="276" x2="164" y2="336" stroke="#9a6b2f" stroke-width="1.3"/>')
  parts.push('<line x1="246" y1="276" x2="310" y2="336" stroke="#9a6b2f" stroke-width="1.3"/>')
  parts.push('<line x1="288" y1="276" x2="418" y2="336" stroke="#9a6b2f" stroke-width="1.3"/>')
  // nodes: [x, y, label, isLeaf]
  const nodes: [number, number, string, boolean][] = [
    [312, 24, '−', false],
    [120, 128, '+', false],
    [504, 128, '4', true],
    [24, 232, '×', false],
    [216, 232, '×', false],
    [8, 336, '3', true],
    [116, 336, 'x', true],
    [262, 336, '2', true],
    [370, 336, 'x', true],
  ]
  for (const [x, y, label, isLeaf] of nodes) {
    parts.push(`<rect x="${x}" y="${y}" width="96" height="44" rx="8" fill="none" stroke="${isLeaf ? '#9a6b2f' : '#3f6212'}" stroke-width="${isLeaf ? 1.4 : 1.8}"/>`)
    parts.push(
      `<text x="${x + 48}" y="${y + 30}" font-size="${isLeaf ? 17 : 19}" fill="${isLeaf ? '#7c5a2e' : '#365314'}" text-anchor="middle" font-weight="700"${label === 'x' ? ' font-style="italic"' : ''}>${label}</text>`
    )
  }
  // footer
  parts.push(
    '<text x="360" y="412" font-size="12" fill="#365314" text-anchor="middle" font-weight="600">fold bottom-up: 3·x and 2·x build the twins, the plus joins them, the minus takes 4 — one tree, one value</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 4 (1.2): the like-terms sieve — the four terms of            */
/* 5a + 3b − 2a + b sorted into the a-family and the b-family. Hopper  */
/* (250,16,220,48); term chips 80×36 at y = 120 (x = 110, 230, 420,    */
/* 540); buckets 240×120 at (60,224) and (420,224); footer y = 380.    */
/* Geometry pinned in section G, audited in section I.                 */
/* ------------------------------------------------------------------ */

function sieveSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The like-terms sieve: the terms 5a, minus 2a, 3b and b falling from a hopper into the a-family bucket giving 3a and the b-family bucket giving 4b — unlike families stay separate">'
  )
  parts.push('<rect x="0" y="0" width="720" height="400" fill="transparent"/>')
  // hopper
  parts.push('<rect x="250" y="16" width="220" height="48" rx="8" fill="none" stroke="#3f6212" stroke-width="1.8"/>')
  parts.push('<text x="360" y="45" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="600">the terms of 5a + 3b − 2a + b</text>')
  // chip-to-bucket rails (under the chips)
  parts.push('<line x1="150" y1="156" x2="180" y2="224" stroke="#9a6b2f" stroke-width="1.2"/>')
  parts.push('<line x1="270" y1="156" x2="230" y2="224" stroke="#9a6b2f" stroke-width="1.2"/>')
  parts.push('<line x1="460" y1="156" x2="520" y2="224" stroke="#9a6b2f" stroke-width="1.2"/>')
  parts.push('<line x1="580" y1="156" x2="560" y2="224" stroke="#9a6b2f" stroke-width="1.2"/>')
  // term chips
  const chips: [number, string][] = [
    [110, '5a'],
    [230, '−2a'],
    [420, '3b'],
    [540, 'b'],
  ]
  for (const [x, label] of chips) {
    parts.push(`<rect x="${x}" y="120" width="80" height="36" rx="6" fill="none" stroke="#3f6212" stroke-width="1.4"/>`)
    parts.push(`<text x="${x + 40}" y="${120 + 24}" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">${label}</text>`)
  }
  // the two family buckets
  const buckets: [number, string, string][] = [
    [60, 'the a-family', '5a − 2a = 3a'],
    [420, 'the b-family', '3b + b = 4b'],
  ]
  for (const [x, title, line] of buckets) {
    parts.push(`<rect x="${x}" y="224" width="240" height="120" rx="8" fill="none" stroke="#3f6212" stroke-width="1.8"/>`)
    parts.push(`<text x="${x + 120}" y="${224 + 38}" font-size="13.5" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${x + 120}" y="${224 + 72}" font-size="14" fill="#4d7c0f" text-anchor="middle" font-weight="600">${line}</text>`)
    parts.push(`<text x="${x + 120}" y="${224 + 96}" font-size="11.5" fill="#6b7a72" text-anchor="middle">the common letter part collects</text>`)
  }
  // footer
  parts.push(
    '<text x="360" y="380" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="600">sort by the letter part, collect each family, keep unlike families separate — the simplify contract</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* the chapter                                                         */
/* ------------------------------------------------------------------ */

export const chapter01: Chapter = {
  number: 1,
  slug: 'letters-and-structure',
  title: 'Letters and Structure',
  summary:
    'The grammar of algebra, built from the FM doorstep: a letter stops abbreviating one number and starts carrying structure — what an expression is (terms, coefficients, factors), why "like terms" may be collected (the distributive law working backwards, proved), how substitution evaluates, and how words become symbols in the exam word-problem grammar. Order of operations is re-derived as the expression tree, not recited.',
  status: 'in-progress',
  plannedLessons: [
    'Evaluating Expressions: Substitution and Formulas',
    'Translating: Words into Symbols',
  ],
  lessons: [
    {
      id: 'al-from-arithmetic-to-algebra',
      number: '1.1',
      title: 'From Arithmetic to Algebra: What a Letter Does',
      concepts: [
        'Generalized arithmetic',
        'The four roles of a letter',
        'The generalizer: laws for every number',
        'Substitution: the evaluation contract',
        '3a means 3 × a',
        'Expression vs equation: name vs sentence',
        'The sweep discipline',
        'Viète and Descartes: the letter revolution',
      ],
      objectives: [
        'say exactly what changes when arithmetic becomes algebra: sentences stop asking "how much?" and start claiming "for every" — and letters are the machinery that makes the claim',
        'classify any letter you meet into one of the four census roles — placeholder, generalizer, position letter, unknown — and name where each was first met (FM 11.2, FM 11.3, ANS 7.2) and where it grows next',
        'state the three big laws in letter form and cash each on verified instances, knowing that the letter sentence covers every case while instances only sample it',
        'evaluate expressions by substitution under the evaluation contract: replace every letter, honour the structure — and price the three classic traps (3a is 3 × a; a² is not 2a; −a flips the sign)',
        'separate an expression (a name) from an equation (a sentence) by spotting the equals sign, and map the three jobs: simplify (rename), evaluate (fold), solve (settle)',
        'recount who put letters into algebra — al-Khwārizmī\'s word algebra, Viète\'s 1591 system, Descartes\' 1637 x, y, z — and why the change was worth a revolution',
      ],
      prerequisites: ['fm-patterns-to-formulas', 'fm-letter-for-the-unknown', 'ans-the-field-laws-division-joins-the-family'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math6-ch11', 'alkhwarizmi-c825-aljabr', 'viete-1591-isagoge', 'descartes-1637-geometrie', 'cengage-jee-style'],
      blocks: [
        {
          kind: 'para',
          text:
            'Arithmetic is a machine with one appetite: it turns numbers into numbers. Ask it $7 + 9$ and it answers 16; ask it $3 \\times 4 + 5$ and it answers 17; every question has the same shape and every answer is a single number. But watch what you actually did when you computed $7 + 9 + 3$ quickly. You did not grind left to right — you **reordered**: $7 + 3 + 9$ lands on 19 with almost no work, because the 7 and the 3 make 10 and 10 is friendly. That little trick is not arithmetic. It is a *law* being used silently — the claim that **any two numbers may swap places in an addition** — and no single computation states it. Arithmetic uses laws the way we use grammar: constantly, correctly, and almost never consciously.',
        },
        {
          kind: 'para',
          text:
            'Algebra is what happens when those silent laws are finally **written down** — and the writing takes letters. Foundation Mathematics opened this doorstep carefully: lesson 11.2 fitted formulas to patterns and let the letter $n$ hold a position, and lesson 11.3 named the unknown, built the balance machine, and solved its first $3x + 1 = 31$. This book takes the handle FM left warm and opens the door the rest of the way: the letter stops being a visitor who plays one role at a time and becomes a permanent citizen of mathematics, carrying **structure** — laws, formulas, and whole families of numbers at once. Arithmetic and Number Systems proved the ground those letters stand on (the field laws of ANS 7.2); this chapter makes the letters move in.',
        },
        { kind: 'heading', text: 'The Role Census: One Letter, Four Jobs' },
        {
          kind: 'para',
          text:
            'The first skill of algebra is not manipulation — it is **reading**. Every letter you will ever meet is doing one of four jobs, and the sentence it sits in always announces which. Confuse the jobs and the whole sentence goes dark; spot the job and half the work is done before any computation starts.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The role census of a letter',
          text:
            'A letter in a mathematical sentence is said to be acting in exactly one of four roles. It is a **placeholder** if it holds a specific value someone has chosen ("let $a = 7$"); it is a **generalizer** if the sentence claims something for EVERY number at once ("$a + b = b + a$"); it is a **position letter** if it indexes where something stands in a pattern ("$T_n = 5n - 1$"); and it is an **unknown** if the sentence hides a value to be found ("$3x + 1 = 31$"). Thus the same squiggle carries four possible meanings, and the surrounding sentence — never the squiggle itself — says which.',
        },
        {
          kind: 'table',
          caption: 'The four roles: what the letter holds, where you met it, where it grows',
          head: ['Role', 'The letter holds', 'Example sentence', 'First met in', 'Grows into'],
          rows: [
            ['Placeholder', 'one chosen value', 'let $a = 7$; then $3a = 21$', 'FM 11.2 (formulas)', 'AL 1.3 — substitution mastery'],
            ['Generalizer', 'every number at once', '$a + b = b + a$', 'ANS 7.2 (field laws)', 'every law of this book'],
            ['Position letter', 'a place in a pattern', '$T_n = 3n + 1$', 'FM 11.2 (matchsticks)', 'AL ch. 11 — the function idea'],
            ['Unknown', 'a hidden value', '$3x + 1 = 31$', 'FM 11.3 (balance machine)', 'AL ch. 5–9 — equations'],
          ],
        },
        {
          kind: 'figure',
          caption: 'The four hats of $x$: same letter, four announced jobs. The sentence around the letter, not the letter itself, picks the hat.',
          svg: fourHatsSvg(),
        },
        {
          kind: 'para',
          text:
            'The census is a reading instrument, and examination sentences operate it openly. "**If** $a = 2$ **and** $b = 3$, find $2a + b$" announces the placeholder hat before asking anything. "For all real numbers $a$, $b$, $c$ …" announces the generalizer. "Find the term holding 99" points at the position hat. "Solve for $x$" is the unknown\'s cue. Even a single line can mix hats — a formula such as $C = 50 + 12k$ (the taxi of lesson 1.3) uses $C$ and $k$ as placeholders standing for whatever trip you take, and the *same line* becomes an unknown-carrier the moment you ask which $k$ makes $C = 194$. One symbol, one sentence, two hats — and the question decides.',
        },
        { kind: 'heading', text: 'Algebra Is Generalized Arithmetic' },
        {
          kind: 'para',
          text:
            'With the census in hand, the book\'s title can be read literally: elementary algebra is **arithmetic with the silent laws finally spoken**. Every trick you ever used in arithmetic — reordering a sum, regrouping it, splitting a product — was an instance of a law, and each law has a letter form that says the trick **once, for every case**.',
        },
        {
          kind: 'table',
          caption: 'The dictionary: arithmetic instances and the algebra sentences they obey',
          head: ['Arithmetic instance', 'The algebra sentence it obeys'],
          rows: [
            ['$7 + 9 = 9 + 7$', 'commutativity: $a + b = b + a$'],
            ['$4 \\times 6 = 6 \\times 4$', 'commutativity of multiplication: $ab = ba$'],
            ['$(13 + 27) + 60 = 13 + (27 + 60) = 100$', 'associativity: $(a + b) + c = a + (b + c)$'],
            ['$3 \\times (4 + 5) = 3 \\times 4 + 3 \\times 5$', 'distributivity: $a(b + c) = ab + ac$'],
            ['$7 - (4 - 3) \\neq (7 - 4) - 3$', 'subtraction is NOT associative — laws have limits'],
          ],
        },
        {
          kind: 'para',
          text:
            'Read the dictionary\'s last row twice, because it teaches as much as the other four together: $7 - (4 - 3) = 6$ while $(7 - 4) - 3 = 0$. Subtraction is NOT associative — regrouping it changes the verdict, and no letter sentence will ever license the regroup. This is worth internalizing early: algebra\'s laws are not politeness, they are **permissions**, and every manipulation you will ever perform must be paid for with a law that permits it. Addition, multiplication and their mix (via distributivity) carry generous permissions; subtraction and division carry almost none — which is why the equation chapters of this book will move everything to the addition side of a sentence before touching it.',
        },
        {
          kind: 'para',
          text:
            'Why write the law instead of listing instances? Because the instances are infinite and the law is one line. The sentence $(a + b) + c = a + (b + c)$ makes a **claim over a domain** — every triple of numbers, all at once — and that claim is the whole reason letters earn their keep. A million computations can only *suggest* the law; the letter sentence *states* it; and, as ANS 7.2 showed when the field laws were built for the rationals, a proof *settles* it for every case the domain contains.',
        },
        {
          kind: 'derivation',
          title: 'One law, every case — what the letter sentence buys',
          statement:
            'The claim $(a + b) + c = a + (b + c)$, read as a generalizer over the integers, compared with its arithmetic verification on the exhibit triple $(13, 27, 60)$.',
          steps: [
            {
              label: 'The arithmetic way',
              formula: '(13 + 27) + 60 = 40 + 60 = 100, \\qquad 13 + (27 + 60) = 13 + 87 = 100',
              explanation:
                'Two groupings, two computations, one answer. The exhibit convinces — for this triple. Nothing in it stops the next triple from misbehaving.',
            },
            {
              label: 'What a list cannot do',
              formula: '\\underbrace{(1+2)+3 = 1+(2+3), \\ \\ldots}_{\\text{infinitely many triples}}',
              explanation:
                'The integers offer infinitely many triples. Any list of checks — ten, a thousand, a million — samples the domain and leaves the rest untouched. Sampling is evidence, never a guarantee.',
            },
            {
              label: 'What the letter sentence does',
              formula: '(a + b) + c = a + (b + c) \\quad \\text{for every } a, b, c',
              explanation:
                'The sentence carries no particular numbers, so it binds all of them at once. Reading it is not reading a result but reading a **rule for every result** — the generalizer hat doing its job.',
            },
            {
              label: 'Who settles the claim',
              formula: '\\text{ANS 7.2: associativity proved from the construction of } \\mathbb{Z} \\text{ and } \\mathbb{Q}',
              explanation:
                'This book does not re-prove the field laws — ANS 7.2 settled them when the number systems were built. What this chapter adds is the ability to READ those proofs\' conclusions as sentences with letters.',
            },
          ],
          result:
            'Letters state claims over whole domains; instances and sweeps sample those domains; proofs settle them. The three layers — statement, sample, proof — are the working division of labour of this entire book.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The sweep discipline',
          text:
            'This book runs on an honesty habit: before any generalized claim enters the prose, a script sweeps a finite window of it and checks every case. For the distributive law, the sweep behind this chapter tested all $a \\in [-9..9]$, $b, c \\in [-9..9]$ — $6{,}859$ triples, every one agreeing. Do not mistake the sweep for a proof: $6{,}859$ is still a sample. But a sweep that disagrees even once kills a claim instantly — most of the errors this book has ever caught were caught by sweeps, not by proofs. State with letters, sample with scripts, settle with proofs.',
        },
        {
          kind: 'para',
          text:
            'The three big laws deserve their letter forms stated once, cleanly — they are ANS 7.2\'s field laws, now read as sentences:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '**Commutativity.** $a + b = b + a$ and $ab = ba$ — order never changes a sum or a product. Instance (verified): $7 + 9 = 9 + 7 = 16$; $4 \\times 6 = 6 \\times 4 = 24$. The reorder trick of $7 + 9 + 3$ lives here.',
            '**Associativity.** $(a + b) + c = a + (b + c)$ and $(ab)c = a(bc)$ — grouping never changes a sum or a product. Instance (verified): $(13 + 27) + 60 = 13 + (27 + 60) = 100$. Subtraction, note, is NOT associative: $7 - (4 - 3) = 6$ but $(7 - 4) - 3 = 0$.',
            '**Distributivity.** $a(b + c) = ab + ac$ — multiplication distributes over addition, the law that runs the whole of lesson 1.2. Instance (verified): $3 \\times (4 + 5) = 27 = 12 + 15$.',
          ],
        },
        { kind: 'heading', text: 'Substitution: the Evaluation Contract' },
        {
          kind: 'para',
          text:
            'The generalizer hat states laws; the placeholder hat runs machines. Giving a letter a value and folding the sentence down to a number is the everyday workhorse of algebra — the contract the whole of lesson 1.3 will formalize, stated here in its plain form.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Evaluating an expression',
          text:
            'Evaluating an expression at given letter values is said to be the act of replacing every letter by its assigned value and carrying out the operations in the structure\'s order, producing one number. Thus, if $a = 4$, then $3a$ evaluates as $3 \\times 4 = 12$ and $a^3$ evaluates as $4 \\times 4 \\times 4 = 64$ — same letter, same value, two different structures, two different numbers.',
        },
        {
          kind: 'para',
          text:
            'The $3a$-versus-$a^3$ contrast is worth slowing down for, because it is the single most common reading error of first-course algebra (the old school texts drilled it on page one, and examiners have chased it ever since). In $3a$, the 3 is a **coefficient** — a multiplier parked OUTSIDE the letter; the expression is two factors deep. In $a^3$, the little 3 is an **exponent** — a repeat-counter for the letter itself; the expression is three identical factors stacked. The two notations look like neighbours and behave like strangers:',
        },
        {
          kind: 'example',
          title: 'If a = 4, distinguish 3a and a³',
          steps: [
            'Take $3a$: the 3 multiplies the letter, so $3a = 3 \\times 4$.',
            'Hence $3a = 12$.',
            'Take $a^3$: the exponent repeats the letter, so $a^3 = 4 \\times 4 \\times 4$.',
            'Now, $4 \\times 4 = 16$, then $16 \\times 4 = 64$.',
            'Hence $a^3 = 64$ — and the pair (12, 64) shows how far apart the neighbours stand.',
          ],
        },
        {
          kind: 'example',
          title: 'Evaluate 2a + 3b − c at a = 7, b = 2, c = 1',
          steps: [
            'Substitute every letter: $2 \\times 7 + 3 \\times 2 - 1$.',
            'Multiplications first: $14 + 6 - 1$.',
            'Fold left to right: $20 - 1$.',
            'Hence the value is 19.',
          ],
        },
        {
          kind: 'example',
          title: 'Evaluate a² − 2a at a = 5',
          steps: [
            'Take the two terms one at a time, each with its own structure.',
            'The square: $a^2 = 5 \\times 5 = 25$.',
            'The double: $2a = 2 \\times 5 = 10$.',
            'Combine: $25 - 10 = 15$.',
            'Hence the value is 15 — and had you misread $a^2$ as $2a$, both terms would collapse to 10 and 10, landing on 0: the trap is worth a full 15 of difference here.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Three classic substitution traps',
          text:
            '**(1) $3a$ never means $3 + a$.** The sweep for this chapter checked $a$ from 0 to 50: $3a = 3 + a$ holds for **no integer at all** ($2a = 3$ has no integer solution). **(2) $a^2$ is not $2a$.** They meet only at $a = 0$ and $a = 2$ — swept over $[-20..20]$, exactly two crossings; everywhere else the square and the double part ways. **(3) $-a$ is not necessarily negative.** The minus in front of a letter is an operation waiting for its value: at $a = -5$, $-a = 5$; at $a = 6$, $-a = -6$. A letter carrying a value you do not know yet has no sign you can assume — the FM 7.3 sign rules decide, not the symbol.',
        },
        { kind: 'heading', text: 'Expressions vs Equations: Name and Sentence' },
        {
          kind: 'para',
          text:
            'One last piece of grammar separates the two great sentence-types of algebra, and FM 11.3 already handed us the key. An **expression** — $3x + 2x$, $5(x + 1)$, $7 - a$ — is a *name*: a phrase built from numbers and letters that names a number once the letters get values. An **equation** — $3x + 2x = 5x$ — is a *sentence*: an assertion, with an equals sign, that two names designate the same number. The equals sign is the whole difference; no expression ever contains one.',
        },
        {
          kind: 'para',
          text:
            'Language makes the same split and always has. "The tallest tower in town" is a *name* — it points at a building once the town is fixed, but asserts nothing. "The tallest tower in town is the clock tower" is a *sentence* — it can be true or false, and checking it is a different act from uttering it. Expressions are the names of mathematics; equations are its true-or-false sentences; and the equals sign is the grammatical fence between them.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The exam trap: simplify vs solve',
          text:
            '"Simplify $3x + 2x$" asks for a **rename** — a shorter name for the same number ($5x$; the collecting machinery is lesson 1.2\'s business). "Solve $3x + 2x = 15$" asks **which $x$ makes the sentence true** — a settlement, and that is the balance machine of AL ch. 5, not this chapter\'s. Spotting the equals sign is spotting which job you were hired for. Half of all lost marks in beginner algebra come from solving when the question said simplify, or simplifying when the sentence demanded a solution.',
        },
        {
          kind: 'para',
          text:
            'So the grammar assigns three jobs, and this chapter schedules them: **simplify** — rename an expression by the laws (lesson 1.2 collects like terms; the distributive law is the engine); **evaluate** — fold an expression to a number at given values (lesson 1.3, with formulas as the payoff); **solve** — settle an assertion (AL ch. 5 onward, the balance machine grown up). Three jobs, three lessons-and-chapters, one grammar.',
        },
        { kind: 'heading', text: 'Why Letters Pay: Three Dividends' },
        {
          kind: 'para',
          text:
            '**Dividend one: generality.** One letter sentence covers every case at once. The distributive law in letters binds all $6{,}859$ triples of the swept window — and, by ANS 7.2\'s proofs, all triples anywhere. The five instances below are not evidence for the law; they are *windows* into it, and the fan shows how one sentence lights them all:',
        },
        {
          kind: 'figure',
          caption: 'One law, many cases: $a(b + c) = ab + ac$ fanning out to five verified instances, negatives included. The letter sentence covers the cases; the instances make it visible.',
          svg: lawFanSvg(),
        },
        {
          kind: 'para',
          text:
            '**Dividend two: reusable recipes.** A formula is a letter sentence you can fold at any input. FM 11.2\'s dress for the pattern 4, 9, 14, … reads $T_n = 5n - 1$, and one substitution answers questions arithmetic would grind through: $T_{50} = 5 \\times 50 - 1 = 249$ — no fifty steps. Lesson 1.3 turns formula evaluation into a full toolkit (the taxi fare $C = 50 + 12k$ among its exhibits).',
        },
        {
          kind: 'para',
          text:
            '**Dividend three: statable problems.** Some questions cannot even be ASKED without letters. "What number doubles to 15?" is a sentence about a hidden value — write it as $2x = 15$ and it joins the world of solvable equations; leave it in words and it stays a riddle. The unknown hat is what turned guessing into method (FM 11.3 did the guessing-in; AL ch. 5 begins the method proper), and every chapter of this book from 5 to 9 lives on that hat.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Who put letters into algebra?',
          text:
            'For most of its life algebra spoke in words. Al-Khwārizmī, working in Baghdad around 820–830 CE, wrote the book that NAMED the subject (*al-jabr*, the completion-and-balancing treatise) — and solved every equation in full prose, not one symbol anywhere. François Viète, in his *In artem analyticem isagoge* of 1591, first made letters a **system**: consonants for known quantities, vowels for unknowns — algebra could finally state general laws, though Viète was not the first to letter an unknown. René Descartes\' *La Géométrie* (1637) fixed our habit: late-alphabet letters $x, y, z$ for unknowns, early ones for knowns. Three steps — say it in words, letter the system, standardize the letters — took roughly eight centuries, and this lesson\'s role census is the everyday harvest of that revolution.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text:
            'The role census and the evaluation contract are the entry fee for every algebra mark board and competitive examinations charge. Formula-evaluation one-liners ("if $a = 2$, $b = -3$, find $a^2 + 2ab$") are direct substitution checks with the traps laid for you — the $3a$-vs-$3+a$ and $a^2$-vs-$2a$ confusions are the two most common wrong options in SSC CGL and bank PO prelims. "Identify the coefficient" and "which are like terms" (lesson 1.2) open the algebra sections of CAT and IPMAT quant. The letter proofs of the exercises here (three consecutive integers, $n(n+1)$ even, odd + even odd) are the exact templates NDA and SSC Tier-2 reuse as "prove that" items. And the generalizer hat — stating a law once — is the habit that makes the identities of AL ch. 3 and 4 feel like vocabulary instead of trivia.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Algebra',
              def: 'The mathematics of sentences written with letters — arithmetic with its silent laws spoken aloud, its patterns dressed in formulas, and its hidden values named so they can be found. From the title of al-Khwārizmī\'s ninth-century treatise.',
            },
            {
              term: 'Generalized arithmetic',
              def: 'The view of elementary algebra this book opens with: every arithmetic trick is an instance of a law, and algebra writes each law once with letters instead of once per case with numbers.',
            },
            {
              term: 'Placeholder',
              def: 'A letter holding one chosen value, announced by the sentence ("let $a = 7$"). Formulas run on placeholders; substitution is their engine.',
            },
            {
              term: 'Generalizer',
              def: 'A letter carrying EVERY number of a domain at once, as in $a + b = b + a$. A generalizer sentence is a claim over a domain — the letter form of a law.',
            },
            {
              term: 'Position letter',
              def: 'A letter indexing where something stands in a pattern, as in FM 11.2\'s $T_n = 3n + 1$. The bridge to functions (AL ch. 11).',
            },
            {
              term: 'Unknown',
              def: 'A letter holding a hidden value the sentence hides, as in FM 11.3\'s $3x + 1 = 31$. Equations are the unknown\'s habitat; AL ch. 5–9 solve them.',
            },
            {
              term: 'Evaluate (substitution)',
              def: 'To replace every letter of an expression by its assigned value and fold the operations in structural order, producing one number. The evaluation contract: replace everything, honour the structure.',
            },
            {
              term: 'Sweep',
              def: 'This book\'s honesty habit: a script checks a generalized claim over a finite window of cases before the claim enters the prose. A sweep samples (and instantly kills disagreeing claims); a proof settles.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The letter $a$ stands for 4. What does $3a$ name?',
              options: ['$3 + 4 = 7$', '34', '$3 \\times 4 = 12$', '$4 \\times 4 \\times 4 = 64$'],
              answer: 2,
              explain:
                'In $3a$ the 3 is a coefficient parked outside the letter, so the name is $3 \\times 4 = 12$. Option 1 misreads the juxtaposition as addition ($3 + a = 7$) — a reading the sweep shows never agrees with the true product on any integer. Option 2 concatenates the digits — "34" is the numeral thirty-four, not a product at all. Option 4 evaluates $a^3$, the exponent neighbour: $64$, a different structure entirely.',
            },
            {
              q: 'Which one is an equation — a sentence — rather than an expression?',
              options: ['$3x + 2x$', '$3x + 2x = 5x$', '$5(x + 1)$', '$7 - a$'],
              answer: 1,
              explain:
                'Only option 2 carries an equals sign, so only it asserts that two names designate the same number — a sentence with a truth value. Options 1, 3 and 4 are names: phrases that become numbers once their letters get values, but assertions of nothing.',
            },
            {
              q: 'In the sentence $a + b = b + a$, the letters wear which hat?',
              options: [
                'the unknown hat — we are meant to solve for $a$',
                'the placeholder hat — $a$ and $b$ are two fixed values',
                'the position hat — $a$ and $b$ index places in a pattern',
                'the generalizer hat — the law speaks for every pair at once',
              ],
              answer: 3,
              explain:
                'Nothing is hidden (no "solve"), nothing is announced as fixed (no "let"), and nothing is indexed by position. The sentence claims something for EVERY pair — the generalizer hat, the role census\'s whole reason for existing. Reading "solve for $a$" here is the classic category error: $a + b = b + a$ is true for all values, so there is nothing to find.',
            },
            {
              q: 'If $a = -5$, what is $-a$?',
              options: ['5', '25', '$-5$', 'not defined for negative $a$'],
              answer: 0,
              explain:
                'The minus in front of a letter is an operation awaiting its value: $-a = -(\\!-5\\!) = 5$ — the FM 7.3 sign rules decide. Option 3 keeps the letter\'s sign, as if $-a$ were glued negative — but $-a$\'s sign belongs to the VALUE of $a$, not to the symbol. Option 2 squares instead of flipping ($(-5)^2 = 25$) — a different operation. Option 4 invents a restriction that does not exist: negation is defined for every number.',
            },
            {
              q: 'Evaluate $2a + 3b - c$ at $a = 7$, $b = 2$, $c = 1$.',
              options: ['21', '15', '19', '14'],
              answer: 2,
              explain:
                'Substitute, multiply first, fold: $14 + 6 - 1 = 19$. Option 1 slips the sign of $c$ ($14 + 6 + 1 = 21$). Option 3 answers with $a = 5$ instead of 7. Option 4 misreads $2a$ as $2 + a$ ($2 + 7 + 6 - 1 = 14$) — trap (1) of the substitution cautions, priced in marks.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'EXERCISE 1.A',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Evaluate $5a$ when $a = 3$.',
                  solution: ['Take the contract: $5a$ means $5 \\times a$.', 'Substitute: $5 \\times 3$.', 'Hence 15.'],
                  answer: '15',
                },
                {
                  q: 'Evaluate $2x + 7$ when $x = 6$.',
                  solution: ['Substitute: $2 \\times 6 + 7$.', 'Multiply before adding: $12 + 7$.', 'Hence 19.'],
                  answer: '19',
                },
                {
                  q: 'Evaluate $10 - b$ when $b = 4$.',
                  solution: ['Substitute: $10 - 4$.', 'Hence 6.'],
                  answer: '6',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Evaluate $3a - 2b$ when $a = 5$, $b = 2$.',
                  solution: ['Substitute: $3 \\times 5 - 2 \\times 2$.', 'Multiply first: $15 - 4$.', 'Hence 11.'],
                  answer: '11',
                },
                {
                  q: 'If $x = -3$, find $x^2$ and $-x$.',
                  solution: [
                    'Square: $x^2 = (-3) \\times (-3) = 9$ — the FM 7.3 sign rules at work.',
                    'Flip: $-x = -(-3) = 3$.',
                    'Hence $x^2 = 9$ and $-x = 3$ — two different operations, two different verdicts.',
                  ],
                  answer: 'x² = 9; −x = 3',
                },
                {
                  q: 'Evaluate $4p + 3q - r$ when $p = 2$, $q = 5$, $r = 6$.',
                  solution: ['Substitute: $4 \\times 2 + 3 \\times 5 - 6$.', 'Multiply: $8 + 15 - 6$.', 'Fold: $23 - 6$.', 'Hence 17.'],
                  answer: '17',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Find every integer $a$ with $a^2 = 3a$.',
                  solution: [
                    'Check $a = 0$: $0^2 = 0$ and $3 \\times 0 = 0$ — a solution.',
                    'Check $a = 3$: $9 = 9$ — a solution.',
                    'Sweep the neighbours: $a = 1$ gives $1 \\neq 3$; $a = 2$ gives $4 \\neq 6$; $a = 4$ gives $16 \\neq 12$; beyond 4 the square outgrows the triple permanently.',
                    'Hence $a = 0$ and $a = 3$ — exactly two crossings (a sweep over $[-20..20]$ finds no third).',
                  ],
                  answer: 'a = 0 or a = 3',
                },
                {
                  q: 'Compute $(13 + 27) + 60$ and $13 + (27 + 60)$. What exactly does the shared answer show?',
                  solution: [
                    'Left grouping: $40 + 60 = 100$.',
                    'Right grouping: $13 + 87 = 100$.',
                    'Both land on 100 — and the law $(a + b) + c = a + (b + c)$ says every triple does the same.',
                    'Hence the regrouping is licensed by a law, not by luck: the shared answer is one exhibit of associativity, not the claim itself.',
                  ],
                  answer: 'Both groupings give 100 — one exhibit of associativity',
                },
                {
                  q: 'The pattern 4, 9, 14, … wears the dress $T_n = 5n - 1$ (FM 11.2). Find $T_{50}$, and the position holding 99.',
                  solution: [
                    'Fold the dress at $n = 50$: $T_{50} = 5 \\times 50 - 1 = 250 - 1$.',
                    'Hence $T_{50} = 249$.',
                    'Read backwards for 99: $5n - 1 = 99$ means $5n = 100$.',
                    'So $n = 20$.',
                    'Hence $T_{50} = 249$, and 99 sits at position 20.',
                  ],
                  answer: 'T₅₀ = 249; 99 sits at n = 20',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A taxi charges ₹50 to start plus ₹12 per kilometre. Write the cost $C$ as an expression in the kilometres $k$, then find $C(8)$ and the $k$ for which $C = 194$.',
                  solution: [
                    'Name the structure: $C = 50 + 12k$.',
                    'At $k = 8$: $C = 50 + 12 \\times 8 = 50 + 96$.',
                    'Hence $C(8) = 146$.',
                    'Read backwards: $50 + 12k = 194$ means $12k = 144$.',
                    'So $k = 12$.',
                    'Hence $C = 50 + 12k$, $C(8) = 146$, and the fare reaches 194 at $k = 12$ km.',
                  ],
                  answer: 'C = 50 + 12k; C(8) = 146; 194 at k = 12',
                },
                {
                  q: 'A rectangle has sides $(2x + 3)$ and $(x + 1)$. Write its perimeter as an expression in $x$ and evaluate it at $x = 4$.',
                  solution: [
                    'Perimeter counts all four sides: $P = (2x + 3) + (x + 1) + (2x + 3) + (x + 1)$.',
                    'Collect, as a preview of 1.2: the $x$-terms make $6x$, the constants make 8.',
                    'Hence $P = 6x + 8$.',
                    'At $x = 4$: $P = 24 + 8 = 32$.',
                    'Hence $P = 6x + 8$ and $P(4) = 32$.',
                  ],
                  answer: 'P = 6x + 8; P(4) = 32',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove by letters: the sum of three consecutive integers is always a multiple of 3.',
                  solution: [
                    'Name the first integer $n$; the next two are $n + 1$ and $n + 2$.',
                    'Add: $n + (n + 1) + (n + 2) = 3n + 3$.',
                    'Factor the 3 — the distributive law read backwards: $3n + 3 = 3(n + 1)$.',
                    'Hence the sum is $3(n + 1)$, a multiple of 3 for every $n$ — one letter sentence where a million examples could only suggest.',
                  ],
                  answer: 'n + (n+1) + (n+2) = 3(n + 1), always a multiple of 3',
                },
                {
                  q: 'Prove that $n(n + 1)$ is even for every natural number $n$.',
                  solution: [
                    'Case (i): $n$ even — write $n = 2m$; then $n(n + 1) = 2m(n + 1)$, a multiple of 2.',
                    'Case (ii): $n$ odd — then $n + 1$ is even, and the factor 2 rides inside $(n + 1)$.',
                    'The two cases exhaust every natural number, and each leaves a visible factor 2.',
                    'Hence $n(n + 1)$ is even for every natural $n$ — the letter proof that turns a census into a theorem.',
                  ],
                  answer: 'n(n+1) is even for every natural n (two cases, each carrying a factor 2)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Write odd and even numbers with letters (odd $= 2m + 1$, even $= 2n$) and prove that odd + even is always odd.',
                  solution: [
                    'Take odd $= 2m + 1$ and even $= 2n$ with $m$, $n$ natural.',
                    'Add: $(2m + 1) + 2n = 2m + 2n + 1 = 2(m + n) + 1$.',
                    'The result is one more than a multiple of 2 — odd by the letter definition itself.',
                    'Check the instance $m = 4$, $n = 3$: $9 + 6 = 15$, odd as promised.',
                    'Hence odd + even is always odd: $2(m + n) + 1$.',
                  ],
                  answer: 'odd + even = 2(m + n) + 1, always odd',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The three big laws (letter form)',
          latex: 'a + b = b + a, \\quad ab = ba, \\quad (a + b) + c = a + (b + c), \\quad a(b + c) = ab + ac',
          note: 'ANS 7.2\'s field laws read as sentences — order never matters (commutativity), grouping never matters (associativity), and multiplication distributes over addition. The generalizer hats of every chapter to come.',
        },
        {
          kind: 'formula',
          name: 'The evaluation contract',
          latex: '3a = 3 \\times a, \\qquad a^2 = a \\times a, \\qquad -a = -(a)',
          note: 'replace every letter, honour the structure: the coefficient multiplies, the exponent repeats, the leading minus waits for its value — the three traps priced at $a = 4$: $3a = 12$ (not 7), $a^2 = 16$ while $a^3 = 64$, and $-a = -4$',
        },
      ],
    },
    {
      id: 'al-expressions-terms-like-terms',
      number: '1.2',
      title: 'Expressions, Terms and Like Terms',
      concepts: [
        'Terms, factors, coefficients',
        'The sign belongs to the term',
        'The expression tree',
        'Order of operations re-derived',
        'Like terms and the letter part',
        'Collection = distributive law backwards',
        'The merge-everything trap',
        'Simplify: rename by the laws',
      ],
      objectives: [
        'take an expression apart by anatomy: name its terms, each term\'s factors and coefficient, and read the sign as part of the term — then name the family (monomial, binomial, trinomial)',
        'draw the expression tree of a flat string and re-derive the order-of-operations conventions from it: brackets are the explicit override, multiplication assembles before addition, left-to-right settles the ties',
        'decide like-or-unlike from the letter part alone, with the commutativity rescue for reordered products (3xy and 5yx are like; 3x and 3x² never are)',
        'PROVE the collection law ax + bx = (a + b)x from the distributive law — first by the copies argument, then in full generality — and state honestly why unlike terms refuse to merge (the law needs a common factor)',
        'simplify expressions by collecting like families and verify value-preservation by substitution: the name changes, the number never',
        'price the merge-everything trap numerically: 3x + 5y is 21 at the witness (2, 3) while 8xy would claim 48 — collecting unlike terms is not shorthand, it is error',
      ],
      prerequisites: ['al-from-arithmetic-to-algebra', 'fm-order-of-operations'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math6-ch11', 'openstax-elementary-algebra', 'cengage-jee-style'],
      blocks: [
        {
          kind: 'para',
          text:
            'Lesson 1.1 handed the letter its census — placeholder, generalizer, position, unknown — and the evaluation contract that folds letters into numbers. This lesson goes one level deeper, into the expressions themselves: what they are MADE of, how they are BUILT, and the one move that tidies almost every expression you will ever meet. The pay-off is practical and immediate — "simplify" questions are the entry fee of every algebra section from Class 6 worksheets to CAT quant — but the machinery underneath is the distributive law doing something new: working **backwards**.',
        },
        {
          kind: 'para',
          text:
            'One idea organizes everything: an expression is not a string of symbols to be read left to right — it is a **structure**, assembled by operations in a definite order, and every honest question about it ("what does it equal?", "can it be shorter?", "which parts are alike?") is really a question about the assembly. Learn to see the assembly and the flat string stops being mysterious.',
        },
        { kind: 'heading', text: 'The Anatomy of an Expression: Terms and Factors' },
        {
          kind: 'para',
          text:
            'Start by taking an expression apart the way a watchmaker takes apart a watch — pieces first, then how the pieces sit together. The pieces have exact names:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Term, factor, coefficient',
          text:
            'A **term** is said to be one part of an expression — the chunks separated by $+$ and $-$ signs. A **factor** is said to be one of the quantities multiplied together inside a term. A **coefficient** is said to be the numerical factor of a term — the number parked in front of the letter part. Thus, in $7a - 3b + 2$, the terms are $7a$, $-3b$ and $2$; the factors of $-3b$ are $-3$ and $b$; and the coefficient of $-3b$ is $-3$ — minus INCLUDED, because the sign belongs to the term.',
        },
        {
          kind: 'para',
          text:
            'The sign rule deserves its own sentence, because half of all first-term errors live here: **the sign before a term is part of the term**. In $7a - 3b + 2$, the middle term is $-3b$, not $3b$ awaiting a decision — the expression says "seven copies of $a$, TAKE AWAY three copies of $b$, then add 2". Reading $-3b$ as its own term is what lets coefficients carry signs (and, a few chapters from now, what lets brackets be removed lawfully).',
        },
        {
          kind: 'table',
          caption: 'Reading expressions part by part',
          head: ['Expression', 'Terms', 'Coefficients', 'Letter part(s)', 'Family name'],
          rows: [
            ['$7a - 3b + 2$', 'three: $7a$, $-3b$, $2$', '$7$; $-3$; (none — plain 2)', '$a$; $b$', 'trinomial'],
            ['$5(x + 1)$', 'one (the bracket rides as one factor)', '$5$', '$x$ (inside the bracket)', 'monomial'],
            ['$4a^2b$', 'one', '$4$', '$a$, $a$, $b$', 'monomial'],
            ['$x$', 'one', '$1$ — invisible by convention', '$x$', 'monomial'],
          ],
        },
        {
          kind: 'example',
          title: 'Name the terms and coefficients of 7a − 3b + 2',
          steps: [
            'Scan for the separators: $+$ and $-$ split the expression into chunks.',
            'The chunks: $7a$, then $-3b$ (minus glued), then $2$.',
            'Hence three terms: $7a$, $-3b$, $2$.',
            'Coefficients: $7$ leads $a$; $-3$ leads $b$; the plain $2$ carries no letter and no coefficient.',
            'Hence the coefficients are $7$ and $-3$ — and the $2$ is a constant term.',
          ],
        },
        {
          kind: 'para',
          text:
            'The family names come from the old school texts and survive in every syllabus: count the terms.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'one term — a **monomial**: $5a$, $4a^2b$, $x$;',
            'two terms — a **binomial**: $3x + 1$, $7a - 3b$;',
            'three terms — a **trinomial**: $x^2 + 2x + 1$, $7a - 3b + 2$;',
            'more terms — the old texts say **multinomial**, and modern usage often just says "polynomial" once the letter powers are whole numbers (the family AL ch. 3 names properly).',
          ],
        },
        { kind: 'heading', text: 'The Expression Tree' },
        {
          kind: 'para',
          text:
            'Now the assembly. Take $3x + 2x - 4$. The flat string hides a definite build order: first the two products $3x$ and $2x$ assemble, then the $+$ joins them, then the $-$ takes away 4. Draw the assembly and you get the **expression tree** — the expression\'s skeleton, with operations as joints and numbers-and-letters as leaves:',
        },
        {
          kind: 'figure',
          caption: 'The expression tree of $3x + 2x - 4$: products assemble first (the two $\\times$ joints), the $+$ joins the twins, the $-$ finishes. Folding the tree bottom-up evaluates it — at $x = 5$ the fold lands on 21.',
          svg: treeSvg(),
        },
        {
          kind: 'para',
          text:
            'The tree is not decoration — it is the REASON the order-of-operations rules exist. FM 2.8 recited the conventions (brackets first, then multiplication and division, then addition and subtraction, left to right for ties); the tree shows what the recitation was protecting. A flat string like $2 + 3 \\times 4$ could name two different trees — $(2 + 3) \\times 4 = 20$ and $2 + (3 \\times 4) = 14$ — and a name that names two things names nothing. The conventions are the agreement that makes ONE tree: **brackets are the explicit override** (they rebuild the tree by force); **multiplication assembles before addition** (terms are built before they are summed); **left-to-right settles the ties** among equal-strength operations. FM 2.8\'s rules are not arbitrary etiquette — they are the treaty that lets a one-dimensional string carry an unambiguous three-dimensional structure.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Two ties the left-to-right rule settles',
          text:
            'Division and subtraction do not care about order — but flat strings with either MUST pick one, and the treaty picks left. $6 \\div 2 \\times 3$ folds left: $(6 \\div 2) \\times 3 = 9$ — the right-to-left re-bracketing $6 \\div (2 \\times 3) = 1$ is a different tree, not a simplification. Likewise $12 - 4 - 3 = (12 - 4) - 3 = 5$, not $12 - (4 - 3) = 11$. The verifier swept the general case: $(a - b) - c \\neq a - (b - c)$ for EVERY $a, b, c \\in [1..10]$ — a thousand triples, a thousand disagreements. Left is law.',
        },
        {
          kind: 'example',
          title: 'Evaluate 2a + 3 × 4 at a = 5 — then re-tree it as (2a + 3) × 4',
          steps: [
            'The flat string $2a + 3 \\times 4$ builds $2a$ and $3 \\times 4$ first, then adds.',
            'Substitute and fold: $2 \\times 5 = 10$; $3 \\times 4 = 12$; $10 + 12 = 22$.',
            'Hence the value is 22.',
            'Now the re-tree: $(2a + 3) \\times 4$ builds the sum INSIDE the bracket first.',
            'Fold: $2 \\times 5 + 3 = 13$; then $13 \\times 4 = 52$.',
            'Hence 52 — same letters, same values, different trees, different numbers: the tree is the meaning.',
          ],
        },
        {
          kind: 'para',
          text:
            'Drawing trees is a habit worth building now, because every structure of this book — the polynomial of ch. 3, the equation of ch. 5, the function of ch. 11 — is a tree wearing thicker clothes. The method: start from the LAST operation you would perform (the root), split the expression at that operation, and recurse. For $2a + 3 \\times 4$ the last operation is the $+$, so the root is $+$ and the two children are $2a$ (itself a $\\times$ of $2$ and $a$) and $3 \\times 4$; for $(2a + 3) \\times 4$ the brackets make the $\\times$ last, so the root is $\\times$ and its children are the whole sum and the 4. Same symbols, different last operations, different trees — and the bracket\'s entire job is to change which operation finishes last.',
        },
        { kind: 'heading', text: 'Like Terms' },
        {
          kind: 'para',
          text:
            'With anatomy and assembly in hand, the spotlight question of the lesson can be asked precisely. Some pairs of terms are interchangeable — three copies of $x$ and five copies of $x$ are just eight copies of $x$. Others are strangers. The exact boundary:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Like terms',
          text:
            'Two terms are said to be **like terms** if their LETTER PARTS are exactly the same letters, each repeated the same number of times — coefficients may differ, letters may not. Thus $3x$ and $5x$ are like (both carry exactly one $x$); $3x$ and $3x^2$ are NOT (one $x$ versus two); and $3xy$ and $5yx$ ARE like — the letter products commute ($xy = yx$, verified over the grid in the verifier), so the letter parts agree once reordered.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$3x$ and $5x$ — like: the letter part is $x$ in both;',
            '$3x$ and $3x^2$ — unlike: one $x$ versus $x$ multiplied by itself again;',
            '$3xy$ and $5yx$ — like: $xy = yx$, so the letter parts are the same multiset;',
            '$3x$ and $5y$ — unlike: different letters, no shared letter part beyond the invisible 1;',
            '$-2a^2b$ and $6a^2b$ — like: both carry exactly $a$, $a$, $b$;',
            '$4ab$ and $4a$ — unlike: the first carries a $b$ the second does not.',
          ],
        },
        {
          kind: 'table',
          caption: 'The like-or-not census, with the reason attached',
          head: ['Pair', 'Verdict', 'Why'],
          rows: [
            ['$3x$, $5x$', 'like', 'same letter part $x$ — only the copy-counts differ'],
            ['$3x$, $3x^2$', 'unlike', '$x$ vs $x^2$: the second repeats the letter twice'],
            ['$3xy$, $5yx$', 'like', 'commutativity reorders $yx$ to $xy$ (verified)'],
            ['$3x$, $5y$', 'unlike', 'different letters — nothing common to factor out'],
            ['$-2a^2b$, $6a^2b$', 'like', 'both carry $a$, $a$, $b$ — signs are free'],
            ['$4ab$, $4a$', 'unlike', 'one carries a $b$ the other lacks'],
          ],
        },
        {
          kind: 'para',
          text:
            'Reading the census is a skill with a method. For any pair of terms, ignore the coefficients entirely and ask one question: **do the two letter parts, written as multiplications, agree letter for letter?** If yes — like terms, collectible by the law of the next section. If no — unlike, and no manipulation in this book will lawfully merge them. Notice what the method does NOT ask: it does not ask whether the coefficients match (they need not — $5x$ and $3x$ are like), and it does not ask whether the letters look similar ($3x$ and $3y$ look almost identical and share nothing). One question, one glance, one verdict.',
        },
        { kind: 'heading', text: 'Why Like Terms May Be Collected: the Proof' },
        {
          kind: 'para',
          text:
            'Everyone "knows" $3x + 5x = 8x$. This book does not ask you to know it — it asks you to see WHY, because the why is one law you already own, running in reverse.',
        },
        {
          kind: 'derivation',
          title: 'The collection law',
          statement: 'For any numbers $a$ and $b$ and any letter value $x$: $ax + bx = (a + b)x$ — like terms may always be collected, and the collection is the distributive law read backwards.',
          steps: [
            {
              label: 'The copies reading',
              formula: '3x = x + x + x, \\qquad 5x = x + x + x + x + x',
              explanation:
                'A coefficient is a copy-count: $3x$ is three copies of $x$, $5x$ is five. This reading is exact (the verifier swept it: $a \\cdot x$ equals $x$ added $a$ times for every natural $a$ and every $x \\in [-12..12]$).',
            },
            {
              label: 'Pool the copies',
              formula: '3x + 5x = \\underbrace{x + \\cdots + x}_{3} + \\underbrace{x + \\cdots + x}_{5} = \\underbrace{x + \\cdots + x}_{8} = 8x',
              explanation:
                'Adding copies of the SAME thing just counts copies: three and five make eight. Nothing here used anything but counting — and counting is exactly what the letter part guarantees.',
            },
            {
              label: 'The law behind the pooling',
              formula: 'ax + bx = a \\cdot x + b \\cdot x = (a + b) \\cdot x',
              explanation:
                'The pooling step IS the distributive law $a \\cdot x + b \\cdot x = (a + b)x$ — read from right to left. For whole-number coefficients the copies argument shows it; for ANY coefficients (negatives, fractions) the distributive law of ANS 7.2 carries it: the verifier swept $a, b \\in [-9..9]$, $x \\in [-12..12]$ — 9,025 checks, zero dissent.',
            },
            {
              label: 'The honest boundary',
              formula: '3x + 5y \\neq (3 + 5)\\,\\text{anything}',
              explanation:
                'The law needs a COMMON factor in the letter parts. $3x$ and $5y$ share no letter, so no pooling is licensed — and the census shows the alleged merges failing: $x + x^2 = 2x^2$ holds only at $x = 0, 1$ (swept over $[-12..12]$), never as a law.',
            },
          ],
          result:
            'Collecting like terms = the distributive law working backwards, licensed exactly when the letter parts agree. $ax + bx = (a + b)x$ always; unlike terms never.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The merge-everything trap',
          text:
            'The classic error is collecting UNLIKE terms into one: $3x + 5y \\to 8xy$. Price it at the witness $(x, y) = (2, 3)$: the true value is $3 \\times 2 + 5 \\times 3 = 21$, while $8xy$ claims $48$ and $8(x + y)$ claims $40$ — nothing agrees with anything (the verifier swept the whole window $[-6..6]^2$ and pinned every accidental tie). The merge is not sloppy shorthand; it is a different (wrong) structure. The letter parts decide — and $x$ and $y$ are not the same letter part.',
        },
        { kind: 'heading', text: 'Simplifying by Collecting' },
        {
          kind: 'para',
          text:
            'The pieces are all on the table; here is the contract they power. To **simplify** an expression is to rename it — by the laws — into the shortest name that carries the same value: collect each family of like terms, keep unlike families as they are, never change the number the expression names.',
        },
        {
          kind: 'example',
          title: 'Simplify 5a + 3b − 2a + b',
          steps: [
            'Sort the terms into families (the sieve): $5a$ and $-2a$ are the $a$-family; $3b$ and $b$ are the $b$-family.',
            'Collect the $a$-family by the collection law: $5a - 2a = (5 - 2)a = 3a$.',
            'Collect the $b$-family: $3b + b = (3 + 1)b = 4b$ — the invisible coefficient 1 now visible.',
            'Hence $5a + 3b - 2a + b = 3a + 4b$.',
            'Check by substitution at $(a, b) = (2, 1)$: direct $10 + 3 - 4 + 1 = 10$; collected $6 + 4 = 10$ — the name changed, the number did not.',
          ],
        },
        {
          kind: 'example',
          title: 'Simplify 7x² − 2x + 3x − x²',
          steps: [
            'Families first: $7x^2$ and $-x^2$ carry $x^2$; $-2x$ and $3x$ carry $x$.',
            'Collect the squares: $(7 - 1)x^2 = 6x^2$.',
            'Collect the singles: $(-2 + 3)x = 1x = x$.',
            'Hence $7x^2 - 2x + 3x - x^2 = 6x^2 + x$.',
            'Check at $x = 3$: direct $63 - 6 + 9 - 9 = 57$; collected $54 + 3 = 57$ — value preserved.',
          ],
        },
        {
          kind: 'example',
          title: 'The triangle with sides (3x + 2), (2x − 1) and (x + 5): simplify its perimeter',
          steps: [
            'The perimeter adds the three sides: $P = (3x + 2) + (2x - 1) + (x + 5)$.',
            'Sort into families: the $x$-terms $3x + 2x + x = 6x$; the constants $2 - 1 + 5 = 6$.',
            'Hence $P = 6x + 6$.',
            'Evaluate at $x = 3$: $P = 18 + 6 = 24$.',
            'Hence $P = 6x + 6$, and $P(3) = 24$ — one name for every triangle in the family.',
          ],
        },
        {
          kind: 'para',
          text:
            'Collecting is also a speed instrument. To evaluate $4a + 5 - 3a + 2$ at $a = 12$, the long way grinds $48 + 5 - 36 + 2 = 19$; the short way collects first — $4a - 3a + 7 = a + 7$ — and then folds $12 + 7 = 19$. Same verdict, a fraction of the work, and the collected form $a + 7$ answers for EVERY $a$ at a glance. In examination data-interpretation blocks, collect-then-substitute is routinely the difference between a thirty-second answer and a three-minute one.',
        },
        {
          kind: 'figure',
          caption: 'The like-terms sieve: the four terms of $5a + 3b - 2a + b$ sorted into the $a$-family and the $b$-family. Each family collects by the collection law; unlike families stay separate.',
          svg: sieveSvg(),
        },
        {
          kind: 'para',
          text:
            'A note on what the sieve does NOT say. It does not say the two buckets are strangers to each other forever — the collection law works family by family, and the families simply do not merge with EACH OTHER. It also does not say every expression sorts so neatly: an expression whose terms all differ ($3x + 5y + 7z$) collects to nothing shorter than itself, and that is a perfectly good answer. The contract promises the SHORTEST lawful name — sometimes the shortest lawful name is the name you were given.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Renaming, never changing',
          text:
            'The whole lesson compresses into one sentence: simplification is RENAMING — the name changes, the value never. The verifier ran the census for this lesson: $5a + 3b - 2a + b$ and $3a + 4b$ agree at every $(a, b)$ in $[-9..9]^2$; $7x^2 - 2x + 3x - x^2$ and $6x^2 + x$ agree at every $x \\in [-12..12]$. That agreement is not luck — it is the field laws guaranteeing that every legal rename preserves value. When a simplification answer is in doubt, substitute one convenient value into BOTH names; if they disagree, a collection error is hiding. (One honest caveat: a matching value at one witness does not PROVE the rename — it only fails to refute. The proofs live in the laws; the witnesses are tripwires.)',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text:
            '"Simplify" items are the permanent openers of algebra sections: SSC CGL and bank PO prelims ask them straight ($9y - 4y + y$-class, with distractors built from the merge-everything trap); CAT and IPMAT embed collection inside larger simplifications where one wrong family costs the whole item; school boards pair "identify the like terms" with "collect and evaluate". The two-step discipline of this lesson — sort into families, collect each — is also the machine behind AL ch. 3\'s polynomial arithmetic and ch. 4\'s factorization (factoring is collection\'s mirror), and the perimeter/classic-geometry wrappers here are exactly how NDA and SSC Tier-2 dress the same skill.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Term',
              def: 'One part of an expression — a chunk separated by $+$ or $-$, carrying its sign with it ($-3b$ is one term, sign included).',
            },
            {
              term: 'Factor',
              def: 'One of the quantities multiplied together inside a term: $-3b$ has factors $-3$ and $b$; $4a^2b$ has factors $4$, $a$, $a$, $b$.',
            },
            {
              term: 'Coefficient',
              def: 'The numerical factor of a term — the number in front of the letter part. Invisible when it is 1 ($x$ means $1x$); includes the sign (the coefficient of $-3b$ is $-3$).',
            },
            {
              term: 'Expression tree',
              def: 'The assembly diagram of an expression: operations as joints, numbers and letters as leaves, built bottom-up in the order the conventions dictate. The tree is what the order-of-operations rules protect.',
            },
            {
              term: 'Like terms',
              def: 'Terms whose letter parts are exactly the same letters repeated the same number of times — $3x$ and $5x$; $3xy$ and $5yx$ (commutativity reorders). Coefficients are free; letters are not.',
            },
            {
              term: 'Unlike terms',
              def: 'Terms with different letter parts ($3x$ and $5y$; $3x$ and $3x^2$). They refuse collection: no common factor licenses the distributive run backwards.',
            },
            {
              term: 'The collection law',
              def: '$ax + bx = (a + b)x$ — the distributive law read backwards, PROVED by the copies argument and swept over the grids. The engine of every simplification.',
            },
            {
              term: 'Simplify',
              def: 'To rename an expression by the laws into the shortest name carrying the same value: sort into like families, collect each, keep unlike families separate. Renaming, never changing.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which pair consists of like terms?',
              options: ['$3x$ and $3x^2$', '$3x$ and $5y$', '$3xy$ and $5yx$', '$3x^2$ and $2y^2$'],
              answer: 2,
              explain:
                '$3xy$ and $5yx$ carry the same letters — and $yx = xy$ (commutativity, swept), so the letter parts agree once reordered. Option 1 fails because $x$ and $x^2$ repeat the letter a different number of times; option 2 pairs different letters; option 3 pairs $x^2$ with $y^2$ — different letters AND different repeats.',
            },
            {
              q: 'The coefficient of $-3x$ is…?',
              options: ['3', '$-3$', 'x', '$-3x$'],
              answer: 1,
              explain:
                'The sign belongs to the term, so the numerical factor is $-3$. Option 1 drops the sign — the reading that breaks bracket removal in AL ch. 3. Option 3 names the letter part, not the numerical factor. Option 4 names the whole term — a category error: the coefficient is the number INSIDE the term, not the term itself.',
            },
            {
              q: '$6 \\div 2 \\times 3 = ?$',
              options: ['9', '1', '36', '3'],
              answer: 0,
              explain:
                'Division and multiplication are equal-strength, so the left-to-right tie rule settles it: $(6 \\div 2) \\times 3 = 9$. Option 2 re-brackets right-to-left ($6 \\div (2 \\times 3) = 1$) — a different tree, not a simplification. Option 3 multiplies everything ($6 \\times 2 \\times 3 = 36$); option 4 stops after $6 \\div 2 = 3$, forgetting the $\\times 3$ still waiting.',
            },
            {
              q: '$5a + 3b - 2a + b$ simplifies to…?',
              options: ['6ab', '8a + 3b', '3a + 2b', '3a + 4b'],
              answer: 3,
              explain:
                'Sort into families: $(5 - 2)a = 3a$ and $(3 + 1)b = 4b$ — the collection law, twice. Option 1 merges everything ($6ab$ reads 12 at the witness $(2,1)$ where the true value is 10). Option 2 misreads $3b$ as $3a$. Option 3 drops the final $b$ to the wrong family ($2b$ instead of $4b$).',
            },
            {
              q: '$3x + 5y$ cannot be collected into one term because…?',
              options: [
                'letters and numbers never mix',
                'the distributive law needs a common factor, and the letter parts $x$ and $y$ differ',
                'coefficients must match before terms combine',
                'it can — it becomes $8xy$',
              ],
              answer: 1,
              explain:
                'The collection law $ax + bx = (a+b)x$ runs on a SHARED letter part; $3x$ and $5y$ have none, so the backwards-distributive move has no purchase. Option 3 sounds close but is wrong — coefficients need NOT match ($5x$ and $3x$ collect happily); the LETTERS must. Option 4 is the trap priced at $(2,3)$: $21 \\neq 48$. Option 1 invents a rule that does not exist — numbers and letters mix constantly ($3x$ itself).',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'EXERCISE 1.B',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Name the terms of $7a - 3b + 2$, and the coefficient of the second term.',
                  solution: [
                    'Scan the separators: the chunks are $7a$, $-3b$, $2$.',
                    'The sign travels with its term, so the second term is $-3b$.',
                    'Hence three terms, and the coefficient of $-3b$ is $-3$.',
                  ],
                  answer: 'terms 7a, −3b, 2; coefficient −3',
                },
                {
                  q: 'Which of $4x$, $4x^2$, $-x$, $7x$ are like terms with $x$?',
                  solution: [
                    'Compare letter parts: $4x$ carries one $x$; $-x$ carries one $x$ (coefficient $-1$); $7x$ carries one $x$.',
                    '$4x^2$ carries the letter twice — a different repeat.',
                    'Hence $4x$, $-x$, $7x$ are like with $x$; $4x^2$ is not.',
                  ],
                  answer: '4x, −x, 7x (not 4x²)',
                },
                {
                  q: 'Is $5 \\times 3$ the same as "53"? Evaluate both and explain.',
                  solution: [
                    'Evaluate the product: $5 \\times 3 = 15$.',
                    'Read the numeral: "53" is the PLACE-VALUE name fifty-three.',
                    'Hence $15 \\neq 53$ — juxtaposition in arithmetic notation means multiply, never digit-concatenation.',
                  ],
                  answer: '5 × 3 = 15; "53" = fifty-three — 15 ≠ 53',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Simplify $9y - 4y + y$.',
                  solution: [
                    'All three terms carry $y$ — one family.',
                    'Coefficients: $9 - 4 + 1 = 6$ (the $y$ hides a 1).',
                    'Hence $9y - 4y + y = 6y$.',
                    'Check at $y = 4$: $36 - 16 + 4 = 24$ and $6 \\times 4 = 24$ — value preserved.',
                  ],
                  answer: '6y',
                },
                {
                  q: 'Simplify $8m + 3n - 5m + n$.',
                  solution: [
                    'Families: $8m$ and $-5m$ carry $m$; $3n$ and $n$ carry $n$.',
                    'Collect: $(8 - 5)m = 3m$; $(3 + 1)n = 4n$.',
                    'Hence $8m + 3n - 5m + n = 3m + 4n$.',
                    'Check at $(2, 1)$: direct $16 + 3 - 10 + 1 = 10$; collected $6 + 4 = 10$.',
                  ],
                  answer: '3m + 4n',
                },
                {
                  q: 'Simplify $6x^2 - 2x + 5x - x^2$.',
                  solution: [
                    'Families: $6x^2$ and $-x^2$ carry $x^2$; $-2x$ and $5x$ carry $x$.',
                    'Collect: $(6 - 1)x^2 = 5x^2$; $(-2 + 5)x = 3x$.',
                    'Hence $6x^2 - 2x + 5x - x^2 = 5x^2 + 3x$.',
                    'Check at $x = 3$: direct $54 - 6 + 15 - 9 = 54$; collected $45 + 9 = 54$.',
                  ],
                  answer: '5x² + 3x',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Evaluate $2a + 3 \\times 4$ at $a = 5$, then evaluate $(2a + 3) \\times 4$. Why do the answers differ?',
                  solution: [
                    'First tree: $2a$ and $3 \\times 4$ build first, then add: $10 + 12 = 22$.',
                    'Second tree: the bracket forces $2a + 3$ first: $13 \\times 4 = 52$.',
                    'Hence 22 and 52.',
                    'The answers differ because the TREES differ — brackets are the explicit override, and a different assembly names a different number.',
                  ],
                  answer: '22 and 52 — different trees',
                },
                {
                  q: 'Evaluate $6 \\div 2 \\times 3$ and $12 - 4 - 3$, and name the rule that decides both.',
                  solution: [
                    'Equal-strength operations fold left: $6 \\div 2 = 3$, then $3 \\times 3 = 9$.',
                    'Hence $6 \\div 2 \\times 3 = 9$ — the right-to-left reading $1$ is a different tree, not an answer.',
                    '$12 - 4 = 8$, then $8 - 3 = 5$.',
                    'Hence $12 - 4 - 3 = 5$ — and $12 - (4 - 3) = 11$ shows what the rule prevents.',
                    'The deciding rule: left-to-right settles ties among equal-strength operations.',
                  ],
                  answer: '9 and 5 — the left-to-right tie rule',
                },
                {
                  q: 'Classify each pair: ($3xy$, $5yx$), ($3x^2$, $5x$), ($-2ab$, $7ba$), ($4p$, $4q$).',
                  solution: [
                    '$3xy$ and $5yx$: commute $yx$ to $xy$ — like.',
                    '$3x^2$ and $5x$: one repeats the letter twice — unlike.',
                    '$-2ab$ and $7ba$: commute — like (signs are free).',
                    '$4p$ and $4q$: different letters — unlike.',
                    'Hence like, unlike, like, unlike — the letter part decides every case.',
                  ],
                  answer: 'like / unlike / like / unlike',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A triangle has sides $(3x + 2)$, $(2x - 1)$ and $(x + 5)$. Simplify its perimeter and evaluate it at $x = 3$.',
                  solution: [
                    'Perimeter adds the sides: $P = (3x + 2) + (2x - 1) + (x + 5)$.',
                    'Collect the $x$-family: $(3 + 2 + 1)x = 6x$.',
                    'Collect the constants: $2 - 1 + 5 = 6$.',
                    'Hence $P = 6x + 6$.',
                    'At $x = 3$: $P = 18 + 6 = 24$.',
                    'Hence $P = 6x + 6$ and $P(3) = 24$.',
                  ],
                  answer: 'P = 6x + 6; P(3) = 24',
                },
                {
                  q: 'Simplify $7a - 4b - 3a + b$, then evaluate both the original and the simplified form at $a = 6$, $b = 3$.',
                  solution: [
                    'Families: $7a$ and $-3a$; $-4b$ and $b$.',
                    'Collect: $(7 - 3)a = 4a$; $(-4 + 1)b = -3b$.',
                    'Hence $7a - 4b - 3a + b = 4a - 3b$.',
                    'Evaluate the original: $42 - 12 - 18 + 3 = 15$.',
                    'Evaluate the rename: $24 - 9 = 15$.',
                    'Hence both names give 15 — renaming verified at the witness.',
                  ],
                  answer: '4a − 3b; both give 15 at (6, 3)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Explain, using the distributive law, why $5x + 3y$ cannot be collected — and price the error at the witness $(x, y) = (2, 3)$.',
                  solution: [
                    'The collection law $ax + bx = (a + b)x$ is the distributive law read backwards, and it needs BOTH terms to carry the same letter part.',
                    '$5x$ carries $x$; $3y$ carries $y$ — no shared letter, so no backwards-distributive move exists.',
                    'The alleged merge $8xy$ at $(2, 3)$: true value $10 + 9 = 19$; the merge claims $8 \\times 6 = 48$.',
                    'Even $8(x + y) = 40$ disagrees — nothing matches 19.',
                    'Hence the collection is not merely ugly, it is numerically false: the law refuses, and the numbers confirm.',
                  ],
                  answer: 'no common factor → no collection; witness: 19 vs 48 (vs 40)',
                },
                {
                  q: 'Write the collection-law derivation for $5x + 3x = 8x$ in the two readings (copies, then distributive), and verify over $x \\in [-12..12]$.',
                  solution: [
                    'Copies reading: $5x$ is five copies of $x$, $3x$ is three — pooling gives eight copies, $8x$.',
                    'Distributive reading: $5x + 3x = (5 + 3)x = 8x$ — the law carries pooling beyond whole-number coefficients.',
                    'The verifier swept $5x + 3x = 8x$ over every $x \\in [-12..12]$: zero dissent.',
                    'Hence the two readings agree, and the law is the general engine the copies argument only previews.',
                  ],
                  answer: '5x + 3x = 8x — copies pool, the law generalizes; swept clean',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'For which values of $b$ does $ax + by$ equal $(a + b)x$ for EVERY $x$ and $y$? Prove your verdict.',
                  solution: [
                    'Compare the two names: $ax + by$ versus $ax + bx$.',
                    'Equality for every pair forces $by = bx$ for every $y$ — the $y$-part must contribute nothing independent of $y$.',
                    'If $b = 0$: both sides reduce to $ax$, equal for every $x$, $y$ (the verifier swept $b = 0$ clean over the grid).',
                    'If $b \\neq 0$: take any $y \\neq x$ (say the witness $a = 3$, $b = 2$, $(x, y) = (2, 3)$: $6 + 6 = 12$ vs $5 \\times 2 = 10$) — the names disagree.',
                    'Hence the verdict: $b = 0$, exactly — the $y$-part must be ABSENT, not absorbed; no collection can hide a second letter.',
                  ],
                  answer: 'b = 0, exactly (the y-part must vanish)',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The collection law',
          latex: 'ax + bx = (a + b)x',
          note: 'the distributive law read backwards — licensed exactly when the letter parts agree ($xy = yx$ reorders belong to the same family); unlike terms never collect ($3x + 5y \\neq 8xy$ — witness: 21 vs 48)',
        },
        {
          kind: 'formula',
          name: 'The simplify contract',
          latex: '5a + 3b - 2a + b \\;=\\; (5 - 2)a + (3 + 1)b \\;=\\; 3a + 4b',
          note: 'sort into like families, collect each, keep unlike families separate — the name changes, the value never (verified by substitution; one witness match fails to refute, never proves)',
        },
      ],
    },
  ],
}
