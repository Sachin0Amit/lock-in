import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 11: Patterns and the Doorstep of
 * Algebra
 *
 * LESSON 11.1 Patterns and Rules (run 46, 2026-11-05 — the chapter opens
 * on the book's final floor) — from data's crowds to the regularities
 * hiding inside numbers themselves. The pattern as the mind's oldest
 * mathematical instinct (the counting chant is already a pattern); the
 * sequence defined is-said-to-be (numbers in a fixed order, each a term,
 * named T1, T2, ... through KaTeX $T_n$); the rule of a pattern as a
 * stated recipe, not an atmosphere; term-to-term rules and the two
 * tests (constant differences certify an add-rule, constant quotients a
 * multiply-rule — instances 4, 9, 14, 19 and 3, 6, 12, 24, 48); the
 * jump law DERIVED as tag 1 (Tn = T1 + (n−1)d — term n is n−1 jumps of
 * d from term 1; swept over 180 add-d patterns x 60 terms) and cashed
 * on the evens (2n), the odds (2n − 1) and the matchstick counts
 * (3n + 1: figure 1 the 1/2/3-square panels with 4/7/10 sticks — a
 * three-stroke grammar (heavy = counted, dashed = borrowed, light =
 * old frame) redesigned twice to VLM 8/9 with the three-heavy reading
 * certified; figure 2 the gnomon wrap 1 → 1+3 → 1+3+5 into the 3×3,
 * VLM 9/9; audits 0/0 both); the famous
 * families (counting, evens, odds, squares 1, 4, 9, 16, 25); the
 * triangular numbers 1, 3, 6, 10, 15, 21 (differences 2, 3, 4, 5, 6 —
 * the handshakes as guests arrive, the same pattern at a party); the
 * Virahanka numbers 1, 1, 2, 3, 5, 8, 13 (each term the sum of the two
 * before — a third kind of rule); the gnomon law DERIVED as tag 2
 * (1 + 3 + ... + (2n−1) = n² — the kth odd number is the L of
 * k² − (k−1)² = 2k − 1 cells that wraps the (k−1)-square into the
 * k-square; figure 2 the wrap 1 → 1+3 → 1+3+5 into the 3×3; the
 * identity swept k = 1..30 and the odd-sums swept n = 1..20, induction
 * honestly deferred); the trap of the unspoken rule (the circle game's
 * 1, 2, 4, 8, 16, 31 — the max-regions formula C(n,2) + C(n,4) + 1,
 * the doubling reflex dying at the sixth term); six Illustrations
 * (next-three; the Virahanka run; the missing middle 17 + the term
 * before 2; the backwards subtract-7 list; the matchstick round trip
 * 16 sticks / 10 squares; the mixed exam rule ×2+1 → 95, 191); the exam
 * corner; the historical callout (Pingala's Chandahśāstra c. 3rd–2nd c.
 * BCE and the mātrāmeru; Virahanka c. 700 CE; Gopala c. 1135 and
 * Hemachandra c. 1150 — fifty years before Fibonacci's Liber Abaci
 * 1202; told with hedges); 3 formula cards; 8 terms, 5-quiz (keys
 * 1/0/2/3/2, verified live at the gates), 12 exercises L1–L6 (L6: the
 * jump law proved and cashed on the 20th even/odd; the gnomon law
 * certified through the L-algebra at n = 7). Scope guard held: no
 * position-to-term formulas beyond the jump law (11.2), no sigma
 * notation or series sums, no induction machinery, no letters for
 * unknowns (11.3). Authored in the Cengage voice + solution chain;
 * every number pre-verified by scripts/verify-unit-11.ts (74 checks
 * A–O ALL PASS) BEFORE writing.
 *
 * References: NCERT Ganita Prakash class-6 ch. 1 "Patterns in
 * Mathematics" (fegp101, 2024 — number sequences, what-comes-next
 * discipline, triangular and square numbers, the Virahāṅka numbers;
 * web-checked 2026-11-05) + the carried Khattar, Quantitative
 * Aptitude (4e) for exam-corner series shapes. History web-checked:
 * Pingala (Wikipedia; c. 3rd–2nd century BCE, the Chandahśāstra and
 * the mātrāmeru), the Virahanka–Gopala–Hemachandra chain (c. 700,
 * c. 1135, c. 1150) against Fibonacci's Liber Abaci (1202). No content
 * reproduced; exposition original. See docs/project/SOURCE_LOG.md.
 */
export const chapter11: Chapter = {
  number: 11,
  slug: 'patterns-and-algebra-preview',
  title: 'Patterns and the Doorstep of Algebra',
  summary:
    'Number patterns, sequences built by rules, matchstick and tile patterns expressed as formulas, and the first use of a letter for an unknown — the exact point where Elementary Algebra takes over the climb.',
  status: 'in-progress',
  plannedLessons: [
    'From Patterns to Formulas',
    'A Letter for the Unknown',
  ],
  lessons: [
    {
      id: 'fm-patterns-and-rules',
      number: '11.1',
      title: 'Patterns and Rules',
      concepts: [
        'Patterns — the oldest mathematics',
        'The sequence: numbers with an order',
        'Term-to-term rules and the two tests',
        'The jump law — term n is n−1 jumps away',
        'The famous families: evens, odds, squares',
        'The triangular numbers and the handshakes',
        'The Virahanka numbers',
        'The gnomon law: the odds build the squares',
      ],
      objectives: [
        'Say exactly what a sequence is — numbers in a fixed order, each one a term, named $T_1, T_2, \\ldots$ — and state the rule that generates a pattern in words before trusting any continuation',
        'Apply the two term-to-term tests: constant differences certify an add-rule, constant quotients certify a multiply-rule — and explain why a test certifies only what the rule states',
        'Prove and use the jump law $T_n = T_1 + (n-1)d$ — reach any term without walking the whole list — and cash it on the evens ($2n$), the odds ($2n-1$) and the matchstick counts ($3n+1$)',
        'Build the famous families as patterns: the triangular numbers 1, 3, 6, 10 (differences 2, 3, 4 — the handshakes at a party), the squares, and the Virahanka numbers 1, 1, 2, 3, 5, 8 (each term the sum of the two before it)',
        'Derive and use the gnomon law $1 + 3 + \\cdots + (2n-1) = n^2$ through the L-wrap picture, and explain why an unspoken rule — the circle game\u2019s 1, 2, 4, 8, 16, 31 — is not a rule at all',
      ],
      prerequisites: [],
      sources: ['ncert-ganita-prakash6-ch1', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Ten chapters have built single structures: a number\u2019s place value, an operation\u2019s machinery, a shape\u2019s area, a crowd\u2019s average. This final chapter of the book steps back and notices what made all of it possible — **patterns**. The counting chant "one, two, three…" with which every human childhood begins is already a pattern: a rule ("add one") wearing numbers. Mathematics did not begin with symbols; it began with the itch to know **what comes next** — and the discipline to demand a *reason* for the answer. This lesson names the objects (sequences, terms, rules), derives the first law that lets us leap ahead without walking the whole list, tours the famous families every mathematician keeps in a pocket, and closes with the trap that keeps the whole subject honest: a rule nobody stated is not a rule at all.',
        },
        {
          kind: 'para',
          text: 'The working list for the first half of the lesson: **4, 9, 14, 19, 24, …**. Say aloud what you see: each number is five more than the one before. That one sentence — a rule in words — is the entire content of this lesson\u2019s first law. The rest is making such sentences computable.',
        },
        { kind: 'heading', text: 'The sequence: numbers with an order' },
        {
          kind: 'para',
          text: 'A list of numbers is not yet a pattern. The marks of 10.4 — 35, 45, 52, 58, 60, 60, 68, 75, 87 — form a list, but no rule carries one mark to the next. A pattern is a list with an **order that does work**: the position of each number matters, and a recipe generates the list from itself.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Sequence',
          text: 'A **sequence** is said to be an ordered list of numbers, each called a **term**: the first term, the second term, and so on — written $T_1, T_2, T_3, \\ldots$, with $T_n$ naming the term at position $n$. A sequence whose terms are generated by a fixed recipe is said to follow a **rule**, and the rule is part of the sequence\u2019s definition — not a guess from its opening terms.',
        },
        {
          kind: 'para',
          text: 'For example, four sequences and their rules:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'the counting numbers 1, 2, 3, 4, … — rule: each term is one more than the one before;',
            'the list 4, 9, 14, 19, 24, … — rule: each term is five more than the one before;',
            'the list 3, 6, 12, 24, 48, … — rule: each term is twice the one before;',
            'the squares 1, 4, 9, 16, 25, … — rule: the term at position $n$ is $n^2$ (a rule that reads the POSITION, not the previous term — 11.2\u2019s doorway, glanced at here).',
          ],
        },
        {
          kind: 'para',
          text: 'Notice the fourth item: its rule never mentions the previous term — it jumps straight from the position $n$ to the value. Rules come in these two grand dresses: **term-to-term** ("next = now + 5"), which walks the list one step at a time, and **position-to-term** ("the term at position $n$ is …"), which leaps. This lesson lives mostly in the first dress and derives the one law that translates it into the second — the jump law, two sections down. The full translation business is lesson 11.2.',
        },
        { kind: 'heading', text: 'The term-to-term rule and the two tests' },
        {
          kind: 'para',
          text: 'A **term-to-term rule** says how to build each term from its predecessor. Two families cover most of the patterns a school ever meets, and each carries a cheap certificate — a test you can run on the list itself:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'the **difference test**: subtract each term from the next. If the differences are all equal — the list climbs (or falls) by the same amount every step — the rule is "add $d$", and $d$ is called the **common difference**. The list 4, 9, 14, 19: differences 5, 5, 5 — an add-5 pattern;',
            'the **quotient test**: divide each term by the one before. If the quotients are all equal — each term is the same multiple of its predecessor — the rule is "multiply by $r$", and $r$ is the **common ratio**. The list 3, 6, 12, 24: quotients 2, 2, 2 — a double-it pattern.',
          ],
        },
        {
          kind: 'table',
          caption:
            'The two tests, run on the lesson\u2019s two working lists. The test\u2019s verdict names the rule\u2019s family and its constant — and the constant, once certified, is the engine of the jump law.',
          head: ['the list', 'differences', 'quotients', 'the certified rule'],
          rows: [
            ['4, 9, 14, 19, 24, …', '5, 5, 5, 5', 'varied', 'add 5 (common difference 5)'],
            ['3, 6, 12, 24, 48, …', '3, 6, 12, 24', '2, 2, 2, 2', 'multiply by 2 (common ratio 2)'],
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The tests certify, they do not divine',
          text: 'A passed test tells you the rule is *consistent with* the list so far — it does not read the writer\u2019s mind. The circle game later in this lesson produces a list that passes four steps of the doubling test and then refuses. The honest order is: state the rule, then check the terms — never the reverse.',
        },
        { kind: 'heading', text: 'The jump law: reaching term n without walking there' },
        {
          kind: 'para',
          text: 'An add-$d$ pattern makes you walk to reach a far term: term 2 is one jump from term 1, term 3 two jumps, term 10 nine jumps. Count the jumps and the walk collapses into a multiplication — the single most useful sentence in this chapter.',
        },
        {
          kind: 'derivation',
          title: 'The jump law: Tn = T1 + (n − 1)d for an add-d pattern',
          statement:
            'A sequence follows the term-to-term rule "add $d$", with first term $T_1$. Show that the term at position $n$ is $T_n = T_1 + (n-1)d$ — so the 10th term of 4, 9, 14, … is found without writing the nine terms between.',
          steps: [
            {
              label: 'Each jump deposits exactly one d',
              formula: 'T_2 = T_1 + d, \\quad T_3 = T_2 + d = T_1 + 2d, \\quad T_4 = T_1 + 3d',
              explanation:
                'Walking the list, every step adds one more copy of $d$ to the opening term — the copies pile up one per jump.',
            },
            {
              label: 'Count the jumps from term 1 to term n',
              formula: '\\text{positions } 1 \\to n \\text{ span } n - 1 \\text{ jumps}',
              explanation:
                'Term 2 is one jump away, term 3 two, term 10 nine — the count of jumps is always one less than the position (the first term sits at zero jumps from itself).',
            },
            {
              label: 'Assemble the law',
              formula: 'T_n = T_1 + (n-1)\\,d',
              explanation:
                'The 10th term of the add-5 list: $4 + 9 \\times 5 = 49$ — nine jumps of five, no walking. The verify script iterated 180 add-$d$ patterns out to 60 terms and the law never missed.',
            },
          ],
          result: 'The jump law: $T_n = T_1 + (n-1)d$ — a term-to-term rule worn as a position-to-term formula. It is the doorway through which 11.2 enters.'
        },
        {
          kind: 'equation',
          latex: 'T_n = T_1 + (n-1)\\,d',
          note: '**The jump law (tag 1).** Term $n$ is $n-1$ jumps of size $d$ from term 1. The 10th matchstick count below: $4 + 9 \\times 3 = 31$ — drawn by arithmetic, not by glue.',
        },
        {
          kind: 'para',
          text: 'The jump law cashes instantly on the two families everyone owns. The **evens** start at 2 and add 2: $T_n = 2 + (n-1) \\times 2 = 2n$ — the term at position $n$ is literally twice the position. The **odds** start at 1 and add 2: $T_n = 1 + (n-1) \\times 2 = 2n - 1$ — one less than the matching even. Keep the odds\u2019 formula in view: the gnomon law at the end of this lesson is secretly a theorem about $2n - 1$.',
        },
        {
          kind: 'figure',
          caption:
            'The matchstick pattern: 1, 2 and 3 squares in a row need 4, 7 and 10 sticks. The drawing speaks three stroke weights: the first square\u2019s four sticks are HEAVY (the seed\u2019s whole count); the edges a new square BORROWS from the row are dashed (one per new square — that is the economy); and the three sticks each new square BUYS — top, bottom, right — are the heavy ones with "+3" inside. The counts 4, 7, 10, … form an add-3 pattern with first term 4 — so the 10th figure needs $4 + 9 \\times 3 = 31$ sticks by the jump law, and 31 sticks build $(31-1)/3 = 10$ squares backwards.',
          svg: `<svg viewBox="0 0 780 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Matchstick diagrams of one, two and three squares in a row, needing 4, 7 and 10 sticks, with the newest square's three fresh sticks drawn heavy and labelled +3">
  <text x="390" y="24" font-size="13" fill="currentColor" text-anchor="middle">the matchstick pattern — every new square borrows one edge and buys three</text>
  ${(() => {
    const sq = 60, y0 = 90, y1 = 150;
    const panels: Array<[number, number]> = [[120, 1], [270, 2], [450, 3]];
    let out = '';
    panels.forEach(([x0, n]) => {
      const newStart = x0 + sq * (n - 1);
      // vertical edges: the seed square (n = 1) is all-heavy; later panels
      // draw the SHARED (borrowed) edges dashed and the newest square's
      // RIGHT edge heavy.
      for (let j = 0; j <= n; j++) {
        if (n === 1) {
          out += `<line x1="${x0 + sq * j}" y1="${y0}" x2="${x0 + sq * j}" y2="${y1}" stroke="currentColor" stroke-width="3"/>`;
        } else if (j === n) {
          out += `<line x1="${x0 + sq * j}" y1="${y0}" x2="${x0 + sq * j}" y2="${y1}" stroke="currentColor" stroke-width="3"/>`;
        } else {
          out += `<line x1="${x0 + sq * j}" y1="${y0}" x2="${x0 + sq * j}" y2="${y1}" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>`;
        }
      }
      // horizontal edges: dashed across the shared spans, heavy across
      // the newest square's own top and bottom (whole span for the seed).
      [y0, y1].forEach((y) => {
        if (n === 1) {
          out += `<line x1="${x0}" y1="${y}" x2="${x0 + sq}" y2="${y}" stroke="currentColor" stroke-width="3"/>`;
        } else {
          out += `<line x1="${x0}" y1="${y}" x2="${newStart}" y2="${y}" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>`;
          out += `<line x1="${newStart}" y1="${y}" x2="${x0 + sq * n}" y2="${y}" stroke="currentColor" stroke-width="3"/>`;
        }
      });
    });
    out += `<text x="360" y="124" font-size="12.5" fill="currentColor" text-anchor="middle">+3</text>`;
    out += `<text x="600" y="124" font-size="12.5" fill="currentColor" text-anchor="middle">+3</text>`;
    out += `<text x="150" y="195" font-size="12" fill="currentColor" text-anchor="middle">1 square — 4 sticks</text>`;
    out += `<text x="330" y="195" font-size="12" fill="currentColor" text-anchor="middle">2 squares — 7 sticks</text>`;
    out += `<text x="540" y="195" font-size="12" fill="currentColor" text-anchor="middle">3 squares — 10 sticks</text>`;
    out += `<text x="390" y="240" font-size="12" fill="currentColor" text-anchor="middle">the counts 4, 7, 10, … — add 3 each time (the differences are the bought edges at work)</text>`;
    out += `<text x="390" y="268" font-size="12" fill="currentColor" text-anchor="middle">the 10th figure needs 4 + 9 × 3 = 31 sticks — and 31 sticks build (31 − 1)/3 = 10 squares backwards</text>`;
    return out;
  })()}
</svg>`,
        },
        { kind: 'heading', text: 'The famous families' },
        {
          kind: 'para',
          text: 'Some sequences are so useful they have names, and three of them are already old friends. The **counting numbers** 1, 2, 3, 4, … (add 1 — the chant itself); the **evens** $2, 4, 6, 8, \\ldots$ whose $n$-th term the jump law reads as $2n$; and the **odds** $1, 3, 5, 7, \\ldots$ whose $n$-th term is $2n - 1$. The fourth family is new: the **triangular numbers** $1, 3, 6, 10, 15, 21, \\ldots$ — built not by adding a constant but by adding the *counting numbers themselves*: $1$, then $1+2 = 3$, then $3+3 = 6$, then $6+4 = 10$. The differences walk 2, 3, 4, 5, 6 — the test for add-$d$ fails, honestly, and a grander rule takes over.',
        },
        {
          kind: 'para',
          text: 'Why "triangular"? Stack the count: one dot, then a row of two under it, then a row of three — each triangular number of dots packs into a triangle. And the family has a second life at every party: guests arrive one at a time and each newcomer shakes hands with everyone already there. The counts climb 1, 3, 6, 10, 15, 21 — the second guest\u2019s arrival forces 1 handshake, the third\u2019s two more (total 3), the fourth\u2019s three more (total 6) — the *same* pattern wearing a party dress. The formula that turns the position straight into the handshake count waits for 11.2\u2019s tools; the pattern is already yours.',
        },
        {
          kind: 'para',
          text: 'The fifth family breaks the add-and-multiply mould entirely: the **Virahanka numbers** $1, 1, 2, 3, 5, 8, 13, \\ldots$ — each term is the **sum of the two terms before it** ($2 = 1 + 1$, $3 = 1 + 2$, $5 = 2 + 3$, $8 = 3 + 5$). Neither the difference test nor the quotient test certifies it; the rule is its own kind, and a glorious old one — the historical callout at the end of this lesson traces it to Sanskrit prosody centuries before Europe named it. The moral for now: a rule is whatever the pattern\u2019s maker says it is — stated, checkable, and not necessarily one of the two standard tests.',
        },
        { kind: 'heading', text: 'The gnomon law: the odds build the squares' },
        {
          kind: 'para',
          text: 'Now watch two famous families collide. Add the odd numbers in order and watch the partial sums: $1$; $1 + 3 = 4$; $1 + 3 + 5 = 9$; $1 + 3 + 5 + 7 = 16$. The sums are $1, 4, 9, 16$ — **the squares**, in order. Every partial sum of the odds lands exactly on a square. This is not a coincidence to memorise; it is a theorem with a picture, and the picture is one of the oldest in mathematics.',
        },
        {
          kind: 'figure',
          caption:
            'The gnomon wrap. The 1×1 square; the odd number 3 arrives as the L of three cells that wraps it into the 2×2 square; the odd number 5 arrives as the L of five cells that wraps that into the 3×3 square. Each new odd number is exactly the "gnomon" — the carpenter\u2019s L — that grows one square into the next: k + k − 1 = 2k − 1 cells, a new row and a new column sharing one corner.',
          svg: `<svg viewBox="0 0 780 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The gnomon wrap: a 1x1 square, then the L of 3 cells wrapping it into a 2x2 square, then the L of 5 cells wrapping that into a 3x3 square — 1 = 1 squared, 1+3 = 2 squared, 1+3+5 = 3 squared">
  <text x="390" y="24" font-size="13" fill="currentColor" text-anchor="middle">the gnomon law — each odd number is the L that wraps one square into the next</text>
  ${(() => {
    const c = 56;
    let out = '';
    // S1: one cell at (150, 100).
    out += `<rect x="150" y="100" width="${c}" height="${c}" fill="none" stroke="currentColor" stroke-width="1.3"/>`;
    // S2: 2x2 at (300, 72); added L cells (0,1), (1,0), (1,1) tinted.
    const l2: Array<[number, number]> = [[0, 1], [1, 0], [1, 1]];
    for (let r = 0; r < 2; r++) {
      for (let cc = 0; cc < 2; cc++) {
        const tinted = l2.some(([lr, lc]) => lr === r && lc === cc);
        out += `<rect x="${300 + c * cc}" y="${72 + c * r}" width="${c}" height="${c}" fill="currentColor" fill-opacity="${tinted ? 0.18 : 0}" stroke="currentColor" stroke-width="1.2"/>`;
      }
    }
    // S3: 3x3 at (520, 44); added L cells (0,2), (1,2), (2,0), (2,1), (2,2) tinted.
    const l3: Array<[number, number]> = [[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]];
    for (let r = 0; r < 3; r++) {
      for (let cc = 0; cc < 3; cc++) {
        const tinted = l3.some(([lr, lc]) => lr === r && lc === cc);
        out += `<rect x="${520 + c * cc}" y="${44 + c * r}" width="${c}" height="${c}" fill="currentColor" fill-opacity="${tinted ? 0.18 : 0}" stroke="currentColor" stroke-width="1.2"/>`;
      }
    }
    out += `<text x="178" y="246" font-size="12.5" fill="currentColor" text-anchor="middle">1 = 1²</text>`;
    out += `<text x="356" y="246" font-size="12.5" fill="currentColor" text-anchor="middle">1 + 3 = 2²</text>`;
    out += `<text x="604" y="246" font-size="12.5" fill="currentColor" text-anchor="middle">1 + 3 + 5 = 3²</text>`;
    out += `<text x="390" y="290" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">each tinted L carries the new odd number — 3 cells, then 5; the next wrap would carry 7</text>`;
    return out;
  })()}
</svg>`,
        },
        {
          kind: 'para',
          text: 'Read the picture cell by cell. Growing the $(k-1) \\times (k-1)$ square into the $k \\times k$ square adds one new **row** of $k$ cells and one new **column** of $k$ cells — but the corner cell belongs to both, so it must not be counted twice: $k + k - 1 = 2k - 1$ new cells. And $2k - 1$ is precisely the $k$-th odd number (the jump law\u2019s formula, met two sections ago). So the wrap from $3 \\times 3$ to $4 \\times 4$ consumes exactly the odd number 7, the wrap from $4 \\times 4$ to $5 \\times 5$ consumes 9, and so on forever — the odds arrive in their natural order and each one finds exactly one L waiting for it.',
        },
        {
          kind: 'derivation',
          title: 'The gnomon law: 1 + 3 + 5 + … + (2n − 1) = n²',
          statement:
            'Show that the sum of the first $n$ odd numbers is exactly $n^2$ — the squares are the running totals of the odds — using the L-wrap identity $k^2 - (k-1)^2 = 2k - 1$.',
          steps: [
            {
              label: 'The L identity: the kth odd number is a square\u2019s growth',
              formula: 'k^2 - (k-1)^2 = 2k - 1',
              explanation:
                'The algebra of the picture: $k^2 = k \\times k$ and $(k-1)^2 = (k-1) \\times (k-1)$; the difference is the new row plus the new column minus the shared corner — $k + k - 1$. The identity holds for every $k$ (swept $k = 1..30$ in the verify script).',
            },
            {
              label: 'Unwrap the k-square into its Ls',
              formula: 'k^2 = 1 + 3 + 5 + \\cdots + (2k-1)',
              explanation:
                'Build the $k \\times k$ square by successive wraps: start from $1 = 1^2$, add the L of 3 to reach $2^2$, the L of 5 to reach $3^2$, and so on — the added Ls are exactly the odd numbers in order.',
            },
            {
              label: 'The running totals land on the squares',
              formula: '1 + 3 + \\cdots + (2n-1) = n^2',
              explanation:
                'Every partial sum is the square of the number of odds added — $1 + 3 + 5 + 7 + 9 = 25 = 5^2$, the first ten odds sum to $100 = 10^2$ (swept $n = 1..20$). The full engine that makes "forever" rigorous is induction — a later book\u2019s gift; the picture and the identity carry the honest weight here.',
            },
          ],
          result: 'The gnomon law: $1 + 3 + 5 + \\cdots + (2n-1) = n^2$ — the squares are the odds\u2019 running totals, one L at a time.'
        },
        {
          kind: 'equation',
          latex: '1 + 3 + 5 + \\cdots + (2n-1) = n^2',
          note: '**The gnomon law (tag 2).** The $k$-th odd number $2k-1$ is the L that grows the $(k-1)$-square into the $k$-square; stacking the Ls stacks the odd numbers into the squares. The sum of the first ten odds: $10^2 = 100$ — no adding required.',
        },
        { kind: 'heading', text: 'Working with patterns' },
        {
          kind: 'example',
          title: 'Write the next three terms of 4, 9, 14, 19, …, with the rule.',
          steps: [
            'Now, run the difference test: $9 - 4 = 5$, $14 - 9 = 5$, $19 - 14 = 5$ — constant, so the rule is "add 5".',
            'So the next three terms: $19 + 5 = 24$, $24 + 5 = 29$, $29 + 5 = 34$.',
            'And the jump law names a far one without walking: the 10th term is $4 + 9 \\times 5 = 49$.',
            'Hence 24, 29, 34 — and the rule, stated, is the answer\u2019s receipt.',
          ],
        },
        {
          kind: 'example',
          title: 'Write the next three terms of the Virahanka list 1, 1, 2, 3, 5, 8, ….',
          steps: [
            'Now, the rule: each term is the sum of the two before it — $2 = 1 + 1$, $3 = 1 + 2$, $5 = 2 + 3$, $8 = 3 + 5$.',
            'So the next term is $5 + 8 = 13$.',
            'And the two after: $8 + 13 = 21$, then $13 + 21 = 34$.',
            'Hence 13, 21, 34 — the sum rule carried forward one window at a time.',
          ],
        },
        {
          kind: 'example',
          title: 'Fill the gap and the front: 7, 12, __, 22, 27, … — and what term comes before 7?',
          steps: [
            'Now, the neighbours fix the step: $12 - 7 = 5$ and $27 - 22 = 5$ — the list walks in 5s.',
            'So the gap is two steps of 5 from 7: $7 + 2 \\times 5 = 17$ — and indeed $17 + 5 = 22$ ✓.',
            'And the front: the term before 7 satisfies "add 5 gives 7", so it is $7 - 5 = 2$.',
            'Hence 17 in the gap, 2 before the 7 — patterns run backwards as honestly as forwards.',
          ],
        },
        {
          kind: 'example',
          title: 'A pattern follows the rule "subtract 7". Its known tail is 47, 40, 33, 26, 19. Write the three terms before 47.',
          steps: [
            'Now, reading backwards inverts the rule: if next = now − 7, then previous = now + 7.',
            'So the term before 47 is $47 + 7 = 54$.',
            'And continuing backwards: $54 + 7 = 61$, then $61 + 7 = 68$.',
            'Hence 68, 61, 54, 47, 40, 33, 26, 19 — one subtract-7 pattern, read from either end.',
          ],
        },
        {
          kind: 'example',
          title: 'In the matchstick pattern of figure 1: how many sticks build 5 squares in a row — and how many squares can 31 sticks build?',
          steps: [
            'Now, the counts run 4, 7, 10, … — an add-3 pattern with first term 4 (each new square buys three fresh sticks: top, bottom, right).',
            'So 5 squares need $4 + 4 \\times 3 = 16$ sticks — the jump law with $n = 5$.',
            'And backwards: $n$ squares need $3n + 1$ sticks, so 31 sticks build $(31 - 1)/3 = 10$ squares.',
            'Hence 16 sticks, 10 squares — the pattern works in both directions, arithmetic instead of glue.',
          ],
        },
        {
          kind: 'example',
          title: 'An exam series reads 2, 5, 11, 23, 47. Find the rule and the next two terms.',
          steps: [
            'Now, the difference test fails (differences 3, 6, 12, 24 — not constant) and the quotient test fails (quotients 2.5, 2.2, …) — but the differences themselves DOUBLE.',
            'So try the mixed rule "multiply by 2, then add 1": $2 \\times 2 + 1 = 5$, $5 \\times 2 + 1 = 11$, $11 \\times 2 + 1 = 23$, $23 \\times 2 + 1 = 47$ — every link obeys.',
            'And the next two: $47 \\times 2 + 1 = 95$, then $95 \\times 2 + 1 = 191$.',
            'Hence 95, 191 — exam series often mix the two operations; name the rule before continuing it.',
          ],
        },
        { kind: 'heading', text: 'The trap of the unspoken rule' },
        {
          kind: 'para',
          text: 'Every "what comes next?" question silently assumes that the rule is the *simplest* one consistent with the terms shown — and the world\u2019s most famous list shows why that assumption needs the honesty this book demands everywhere else. Play the circle game: mark $n$ points on a circle\u2019s rim and join every pair with a straight chord; count the largest number of regions the circle\u2019s interior is cut into. One point: 1 region. Two: 2. Three: 4. Four: 8. Five: 16. The doubling test passes four steps in a row — and then the sixth count arrives as **31**, not 32. The verify script computes it from the count of crossing chords: $1, 2, 4, 8, 16, 31, 57$ — the reflex dies at the sixth term and never revives.',
        },
        {
          kind: 'para',
          text: 'The moral is not "patterns are unreliable" — it is the reverse. A rule stated is a promise you can check; a rule divined from four terms is a guess wearing a promise\u2019s clothes. Exam series live inside the convention (the simplest rule wins), and this lesson\u2019s tests certify consistency — but the mathematician\u2019s habit, and this book\u2019s voice, is to say the rule out loud first. The circle game\u2019s 31 is the monument to what happens when nobody does.',
        },
        { kind: 'heading', text: 'The harvest' },
        {
          kind: 'para',
          text: 'The lesson\u2019s tools, in the lesson\u2019s own order:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'a sequence is numbers with an order that does work — terms $T_1, T_2, \\ldots$ generated by a stated rule;',
            'the two tests: constant differences certify an add-$d$ rule; constant quotients a multiply-by-$r$ rule — certificates of consistency, not mind-reading;',
            'the jump law $T_n = T_1 + (n-1)d$: term $n$ is $n-1$ jumps from term 1 — the walk collapsed into a multiplication;',
            'the evens are $2n$ and the odds are $2n - 1$ — the jump law\u2019s first formulas, and 11.2\u2019s doorway;',
            'the triangular numbers 1, 3, 6, 10, 15, 21 grow by the counting numbers themselves — the handshakes at every party;',
            'the Virahanka numbers 1, 1, 2, 3, 5, 8, 13 grow by the sum of the two neighbours — a third kind of rule;',
            'the gnomon law: $1 + 3 + \\cdots + (2n-1) = n^2$ — each odd number is the L that wraps one square into the next; and the unspoken-rule trap: the circle game\u2019s 1, 2, 4, 8, 16, 31.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: '"What comes next?" is the bread of every reasoning paper: SSC CGL/CHSL and RRB NTPC hand over series built on add-$d$, multiply-by-$r$ and the mixed multiply-then-add rule (Illustration 6\u2019s shape), and ask for the next term or the odd one out; banking prelims run missing-number grids that are these same patterns in a table\u2019s dress. The jump law is the averaging family\u2019s cousin — "the 20th term" items collapse to $T_1 + 19d$. CTET and state TETs ask the pedagogy: patterns before symbols, why NCERT\u2019s class-6 opens with sequences, and how matchstick patterns bridge to formulas (11.2\u2019s exact business). Series with alternating rules, second-order patterns beyond the triangular observation, and sigma notation are later books\u2019 territory. Shapes cited, none reproduced.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The syllables that counted themselves — Virahanka and Fibonacci',
          text: 'The list $1, 1, 2, 3, 5, 8, 13$ carries Europe\u2019s nickname — the **Fibonacci numbers**, after Leonardo of Pisa, whose *Liber Abaci* (1202) spread them through the West with his rabbit-breeding puzzle. But the sequence was old when that book was young. Sanskrit prosodists cataloguing the metres of classical poetry — patterns of long and short syllables — needed to count the ways a line of $n$ beats can be built, and the count follows exactly this rule: **Pingala\u2019s** *Chandahśāstra* (dated roughly to the 3rd–2nd century BCE, told with the usual hedges for ancient texts) planted the machinery, **Virahanka** (c. 700 CE) gave the clearest early description of the add-the-two-neighbours counting, and **Gopala** (c. 1135) and **Hemachandra** (c. 1150) wrote the sequence out explicitly — about fifty years before Fibonacci\u2019s book. The lesson\u2019s name for the family honours that priority; the numbers themselves, as the circle game warns, belong to no one — they were simply always next.',
        },
        {
          kind: 'formula',
          name: 'The jump law',
          latex: 'T_n = T_1 + (n-1)\\,d',
          note: 'Term $n$ of an add-$d$ pattern is $n-1$ jumps of $d$ from the first term. The 10th matchstick count: $4 + 9 \\times 3 = 31$.',
        },
        {
          kind: 'formula',
          name: 'The n-th even and the n-th odd',
          latex: 'T_n = 2n \\qquad \\text{and} \\qquad T_n = 2n - 1',
          note: 'The jump law\u2019s first cash: the evens start at 2 and add 2; the odds start at 1 and add 2 — one less than the matching even.',
        },
        {
          kind: 'formula',
          name: 'The gnomon law',
          latex: '1 + 3 + 5 + \\cdots + (2n-1) = n^2',
          note: 'The squares are the running totals of the odds: each odd $2k-1$ is the L of $k + k - 1$ cells that wraps the $(k-1)$-square into the $k$-square.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Pattern',
              def: 'A list of numbers whose order does work: a stated recipe generates the terms, so "what comes next" has a checkable answer.',
            },
            {
              term: 'Sequence',
              def: 'An ordered list of numbers, each called a term — written $T_1, T_2, T_3, \\ldots$, with $T_n$ the term at position $n$.',
            },
            {
              term: 'Term-to-term rule',
              def: 'A recipe that builds each term from its predecessor: "add 5", "multiply by 2", "add the two neighbours".',
            },
            {
              term: 'Common difference',
              def: 'The constant $d$ certified by the difference test — the same amount added at every step of an add-pattern.',
            },
            {
              term: 'Common ratio',
              def: 'The constant $r$ certified by the quotient test — the same multiple applied at every step of a multiply-pattern.',
            },
            {
              term: 'Triangular numbers',
              def: 'The counts 1, 3, 6, 10, 15, 21, … built by adding the counting numbers in turn — the handshake counts at a party, and the dots that pack into triangles.',
            },
            {
              term: 'Virahanka numbers',
              def: 'The sequence 1, 1, 2, 3, 5, 8, 13, … whose every term is the sum of the two before it — named here for the Sanskrit prosodist; Europe calls them Fibonacci\u2019s.',
            },
            {
              term: 'Gnomon',
              def: 'The L-shaped piece — a new row and a new column sharing one corner, $2k - 1$ cells — that grows a square into the next; the reason the odds sum to squares.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The next term of 4, 9, 14, 19, … is',
              options: ['23', '24', '25', '29'],
              answer: 1,
              explain:
                'The differences are constant at 5, so the rule is "add 5" and $19 + 5 = 24$ (Option 2). Option 1 and Option 3 are near-misses with no rule; Option 4 is two steps ahead ($19 + 10$).',
            },
            {
              q: 'The rule that generates 3, 6, 12, 24, 48, … is',
              options: [
                'multiply each term by 2',
                'add 3 to each term',
                'multiply each term by 3',
                'add 6 to each term',
              ],
              answer: 0,
              explain:
                'The quotient test certifies it: $6/3 = 12/6 = 24/12 = 2$ — each term is twice the one before (Option 1). Adding 3 or 6 dies at the second step; multiplying by 3 would give 9, not 6.',
            },
            {
              q: 'The 10th term of the matchstick counts 4, 7, 10, … is',
              options: ['30', '34', '31', '40'],
              answer: 2,
              explain:
                'The jump law: $T_{10} = 4 + 9 \\times 3 = 31$ (Option 3). Option 1 added ten 3s to a zero start; Option 2 miscounted the jumps as ten; Option 4 doubled instead of jumping.',
            },
            {
              q: 'The next two terms of the Virahanka list 1, 1, 2, 3, 5, 8, 13, … are',
              options: ['20 and 32', '21 and 33', '20 and 34', '21 and 34'],
              answer: 3,
              explain:
                'Each term is the sum of the two before it: $8 + 13 = 21$ and $13 + 21 = 34$ (Option 4). Options 1 and 2 drop one of the two summands; Option 3 pairs the right 34 with a wrong 20.',
            },
            {
              q: 'The sum 1 + 3 + 5 + 7 + 9 equals',
              options: ['24', '26', '25', '27'],
              answer: 2,
              explain:
                'The gnomon law: the first five odds sum to $5^2 = 25$ (Option 3) — the L of 9 wraps the 4-square into the 5-square. Option 1 is one short, Option 2 one over, Option 4 is the NEXT odd\u2019s arrival (11) added on.',
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
                  q: 'Write the next three terms of 4, 9, 14, 19, …, stating the rule.',
                  solution: [
                    'Now, the difference test: $9 - 4 = 5$, $14 - 9 = 5$, $19 - 14 = 5$ — constant, so the rule is "add 5".',
                    'So the next three terms are $19 + 5 = 24$, $24 + 5 = 29$, $29 + 5 = 34$.',
                    'And the jump law reaches ahead on demand: $T_{10} = 4 + 9 \\times 5 = 49$.',
                    'Hence 24, 29, 34 — with the stated rule as the receipt.',
                  ],
                  answer: '24, 29, 34 (rule: add 5)',
                },
                {
                  q: 'Write the next three terms of 1, 1, 2, 3, 5, 8, ….',
                  solution: [
                    'Now, the rule: each term is the sum of the two before it — $2 = 1 + 1$, $3 = 1 + 2$, $5 = 2 + 3$, $8 = 3 + 5$.',
                    'So the next three: $5 + 8 = 13$, then $8 + 13 = 21$, then $13 + 21 = 34$.',
                    'And the window slides: each new term needs only the two it follows.',
                    'Hence 13, 21, 34.',
                  ],
                  answer: '13, 21, 34',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'In the matchstick pattern (1 square = 4 sticks, each new square adds 3): how many sticks build 5 squares in a row, and how many squares do 31 sticks build?',
                  solution: [
                    'Now, the counts form an add-3 pattern with first term 4 — so 5 squares need $4 + 4 \\times 3 = 16$ sticks.',
                    'So $n$ squares need $3n + 1$ sticks in general (the jump law worn backwards).',
                    'And 31 sticks: $3n + 1 = 31$ gives $n = (31 - 1)/3 = 10$.',
                    'Hence 16 sticks for 5 squares, and 10 squares from 31 sticks — the pattern works both ways.',
                  ],
                  answer: '16 sticks; 10 squares',
                },
                {
                  q: 'Fill the gap and the front of 7, 12, __, 22, 27, … — what number sits in the gap, and what comes before 7?',
                  solution: [
                    'Now, the neighbours fix the step: $12 - 7 = 5$ and $27 - 22 = 5$ — the list walks in 5s.',
                    'So the gap holds $7 + 2 \\times 5 = 17$ (and $17 + 5 = 22$ ✓).',
                    'And the front: the term before 7 obeys "add 5 gives 7", so it is $7 - 5 = 2$.',
                    'Hence 17 in the gap; 2 before the 7.',
                  ],
                  answer: '17 in the gap; 2 before the 7',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'A pattern follows the rule "subtract 7" and its known tail is 47, 40, 33, 26, 19. Write the three terms immediately before 47.',
                  solution: [
                    'Now, reading backwards inverts the rule: previous = current + 7.',
                    'So before 47 sits $47 + 7 = 54$.',
                    'And continuing: $54 + 7 = 61$, then $61 + 7 = 68$.',
                    'Hence 68, 61, 54, 47, 40, 33, 26, 19 — one rule, read from either end.',
                  ],
                  answer: '68, 61, 54',
                },
                {
                  q: 'The list 1, 2, 4, 8 is continued by two different stated rules: (i) "double each term"; (ii) the circle game (join every pair of $n$ rim-points, count the regions). Give the fifth and sixth terms under each rule, and state the moral.',
                  solution: [
                    'Now, rule (i): $8 \\times 2 = 16$, then $16 \\times 2 = 32$ — the doubling continues without end.',
                    'So rule (ii): the region counts are $1, 2, 4, 8, 16, 31$ — the fifth term agrees at 16, and the sixth REFUSES: 31, not 32 (the verify script\u2019s chord-count arithmetic).',
                    'And the moral: four agreeing terms certify nothing — a rule must be stated before a continuation is believed.',
                    'Hence 16, 32 by doubling; 16, 31 by the circle game — the world\u2019s most famous broken reflex.',
                  ],
                  answer: 'Doubling: 16, 32; the circle game: 16, 31 — stated rules only',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Use the jump law to find the 20th and 50th terms of 4, 9, 14, 19, … — without writing the terms between.',
                  solution: [
                    'Now, the pattern is add-5 with first term 4 — the jump law applies: $T_n = 4 + (n-1) \\times 5$.',
                    'So $T_{20} = 4 + 19 \\times 5 = 4 + 95 = 99$.',
                    'And $T_{50} = 4 + 49 \\times 5 = 4 + 245 = 249$ — 49 jumps computed, not walked.',
                    'Hence 99 and 249 — the jump law\u2019s whole point.',
                  ],
                  answer: 'T20 = 99; T50 = 249',
                },
                {
                  q: 'Guests arrive one at a time at a party and each newcomer shakes hands with everyone already present. The handshake counts run 1, 3, 6, 10, …. Name the pattern, explain the growth, and give the next two counts.',
                  solution: [
                    'Now, the growth: the second guest forces 1 handshake, the third adds 2 (total 3), the fourth adds 3 (total 6) — each arrival adds the next counting number.',
                    'So the counts 1, 3, 6, 10, … are the TRIANGULAR numbers (differences 2, 3, 4, 5, 6).',
                    'And the next two: $10 + 5 = 15$, then $15 + 6 = 21$.',
                    'Hence 15 and 21 — the same pattern as the dot-triangles, wearing a party dress.',
                  ],
                  answer: 'The triangular numbers; next two 15 and 21',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'An exam series reads 2, 5, 11, 23, 47. Find the rule and the next two terms.',
                  solution: [
                    'Now, both standard tests fail: differences 3, 6, 12, 24 are not constant; quotients are not equal either — but the differences DOUBLE.',
                    'So test the mixed rule "multiply by 2, then add 1": $2 \\times 2 + 1 = 5$, $5 \\times 2 + 1 = 11$, $11 \\times 2 + 1 = 23$, $23 \\times 2 + 1 = 47$ — every link obeys.',
                    'And the next two: $47 \\times 2 + 1 = 95$, then $95 \\times 2 + 1 = 191$.',
                    'Hence 95, 191 — name the rule before continuing it.',
                  ],
                  answer: 'Rule: ×2 + 1; next two 95, 191',
                },
                {
                  q: 'Use the gnomon law to write down 1 + 3 + 5 + 7 + 9 + 11, and the sum of the first ten odd numbers — without adding term by term.',
                  solution: [
                    'Now, the gnomon law: the first $n$ odds sum to $n^2$.',
                    'So six odds: $1 + 3 + 5 + 7 + 9 + 11 = 6^2 = 36$.',
                    'And ten odds: $1 + 3 + \\cdots + 19 = 10^2 = 100$.',
                    'Hence 36 and 100 — the squares caught the sums; the L-wrap picture says why.',
                  ],
                  answer: '36 (= 6²); 100 (= 10²)',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the jump law: if a sequence follows "add $d$" with first term $T_1$, then $T_n = T_1 + (n-1)d$. Cash it on the evens and the odds.',
                  solution: [
                    'Now, walk the list: $T_2 = T_1 + d$, $T_3 = T_2 + d = T_1 + 2d$, $T_4 = T_1 + 3d$ — each jump deposits exactly one $d$ on the opening term.',
                    'So from position 1 to position $n$ there are exactly $n - 1$ jumps (term 1 sits at zero jumps from itself), and the deposits total $(n-1)d$.',
                    'And the cash: the evens ($T_1 = 2$, $d = 2$) give $T_n = 2 + (n-1) \\times 2 = 2n$; the odds ($T_1 = 1$, $d = 2$) give $T_n = 1 + (n-1) \\times 2 = 2n - 1$.',
                    'Hence $T_n = T_1 + (n-1)d$ — verified by 180-pattern sweeps in the chapter\u2019s script — and the two oldest formulas in the book are its instant corollaries.',
                  ],
                  answer: 'Tn = T1 + (n−1)d; the n-th even is 2n, the n-th odd is 2n − 1',
                },
                {
                  q: 'Prove the gnomon law $1 + 3 + \\cdots + (2n-1) = n^2$ through the L identity $k^2 - (k-1)^2 = 2k - 1$, and certify it at $n = 7$.',
                  solution: [
                    'Now, the L identity: growing the $(k-1) \\times (k-1)$ square into the $k \\times k$ square adds a row of $k$ and a column of $k$ sharing one corner — $k + k - 1 = 2k - 1$ new cells; algebraically $k^2 - (k-1)^2 = 2k - 1$ (swept $k = 1..30$).',
                    'So unwrapping any square into its successive Ls rebuilds it as the sum of the odds: $k^2 = 1 + 3 + 5 + \\cdots + (2k - 1)$ — each odd number finds exactly one L waiting.',
                    'And the certificate at $n = 7$: $1 + 3 + 5 + 7 + 9 + 11 + 13 = 49 = 7^2$ ✓ (the sweep confirms every $n$ up to 20).',
                    'Hence the gnomon law — the squares are the odds\u2019 running totals; full induction is a later book\u2019s engine, and the picture plus the identity carry the honest weight here.',
                  ],
                  answer: '1 + 3 + ⋯ + (2n − 1) = n²; at n = 7: 49 = 7² ✓',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
