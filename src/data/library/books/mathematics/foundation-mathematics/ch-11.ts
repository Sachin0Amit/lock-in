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
 *
 * LESSON 11.2 From Patterns to Formulas (run 47, 2026-11-05) — through the
 * jump law's doorway: every pattern dressed as a formula in the position
 * letter n. The formula defined is-said-to-be; the four formulas already
 * owned (2n, 2n − 1, n², the jump law itself); the an+b dress DERIVED as
 * tag 1 (Tn = dn + (T1 − d) — the jump as the coefficient, the first
 * term's spent jump as the constant; re-certified over the 180 × 60
 * sweep) with the working dresses 5n − 1, 5n + 2 and −4n + 24 (the
 * subtract-4 list walking into the integers: T6 = 0, T7 = −4) and the
 * check-the-first-term Caution (the 5n + 7 trap that fits three terms and
 * betrays the first); figure 2 the general matchstick row (the seed's 4
 * sticks + 3 per later square — the fitted 3n + 1 and the counted
 * structure agreeing; 10 heavy + 3 dashed = 13 = 3 × 4 + 1); backwards
 * readings as arithmetic undos (99 at position 20; 100 sticks → 33
 * squares — no equation vocabulary, 11.3's territory); the staircase
 * formula DERIVED as tag 2 (1 + 2 + ⋯ + n = n(n+1)/2 by the pairing
 * argument — two staircases interlocking into the n × (n+1) rectangle;
 * swept n = 1..100); figure 1 the interlock drawn at n = 4 (light rows
 * 4,3,2,1 + dark rows 0,1,2,3,4, every column 5 cells; 2S = 20, S = 10);
 * the handshake corollary N(N−1)/2 (the 11.1 promise kept: 8 guests →
 * 28 = T7; 30 → 435, 40 → 780); six Illustrations; the exam corner; the
 * historical callout (the Gauss schoolboy story told with hedges — first
 * printed in Sartorius von Waltershausen's 1856 memorial biography,
 * details vary across tellings; the pairing argument itself the point);
 * 3 formula cards, 8 terms, 5-quiz (keys 0/1/1/0/0, verified live at the
 * gates), 12 exercises L1–L6 (L6: the dress proved and swept; the pairing
 * proof certified at n = 4 and n = 100). Scope guard held: no sigma
 * notation, no quadratic-sequence theory, no equation solving, no
 * function notation. Every number pre-verified by scripts/verify-unit-11.ts
 * (sections P–Z; 145 checks ALL PASS) BEFORE writing.
 *
 * References: NEW keys ncert-math7-gp-ch4 (Ganita Prakash class-7 ch. 4
 * "Expressions using Letter-Numbers", gegp104 — letter-numbers, matchstick
 * formulas, substitution; web-checked 2026-11-05) and ncert-math6-ch11
 * (class-6 ch. 11 "Algebra" — matchstick patterns and the rule with
 * letters, Ex. 11.1; web-checked 2026-11-05); carried
 * ncert-ganita-prakash6-ch1 + khattar-qa-4e. No content reproduced.
 *
 * LESSON 11.3 A Letter for the Unknown (run 47, 2026-11-05) — the book's
 * final lesson, standing exactly on the doorstep its chapter is named
 * for: the letter takes its second job, holding an unknown's place. The
 * riddle that opens ("think of a number: ×3, +1, land on 31 — what was
 * the number?"); the equation defined is-said-to-be (a sentence saying
 * two expressions name the same number; the variable the letter holding
 * the unknown's place; solving = finding every value that makes the
 * sentence true; the check by substitution); the balance law DERIVED as
 * tag 1 (equal numbers stay equal under the same +, −, ×, ÷ — from the
 * meaning of equality, division by zero refused) with figure 1 the
 * balance scale's three states (3x + 1 = 31: the pans reading 3x + 1 /
 * 31, then 3x / 30, then x / 10); the undo machine DERIVED as tag 2
 * (ax + b = c → x = (c − b)/a — undo the LAST operation first; the
 * 1,920-case sweep a = 2..9, b = 1..12, x = 1..20) with figure 2 the
 * machine and its dashed undo path; the collecting dress (x + (x + 11)
 * = 47 → 2x + 11 = 47 → x = 18; the father-son x + 4x = 50 → 10 and
 * 40); equations from words (the ribbon 18 and 29 with both conditions
 * checked; Meera's ages 2b + 3 = 17 → 7; the rectangle 6 by 12; the
 * tournament formula re-read as an equation; the matchstick sentence
 * 3n + 1 = 31); six Illustrations; the exam corner; the historical
 * callout (the Rhind papyrus's aha "heap" problems c. 1550 BCE — the
 * quantity-plus-its-quarter-makes-15 instance solved by the scribe's
 * take-4 scaling, answer 12; al-Khwarizmi's Al-Jabr, Baghdad c. 820 —
 * al-jabr = restoring, the word algebra; Algoritmi → algorithm); 3
 * formula cards, 8 terms, 5-quiz (keys 0/1/1/0/0, verified live at the
 * gates), 12 exercises L1–L6 (L6: the balance law proved from the
 * meaning of equality + the undo machine proved and sweep-certified,
 * with the wrong-order machine refused). The closing paragraph opens
 * the door the book was named for: Elementary Algebra takes over the
 * climb. Scope guard held: one- and two-step equations only, no
 * x-on-both-sides machinery, no transposition vocabulary, no systems or
 * inequalities. Every number pre-verified by scripts/verify-unit-11.ts
 * (sections AA–AL; 187 checks ALL PASS) BEFORE writing.
 *
 * References: NEW key ncert-math7-ch4 (class-7 ch. 4 "Simple Equations"
 * — the balance-method charter, Ex. 4.2's same-operation-on-both-sides
 * discipline; web-checked 2026-11-05); carried ncert-math6-ch11,
 * ncert-math7-gp-ch4, khattar-qa-4e. History web-checked (sanctioned
 * fallback): the Rhind Mathematical Papyrus (problems 24–34 the aha
 * problems; the take-4 solution of the quarter problem — answer 12);
 * al-Khwarizmi's Al-Jabr (Baghdad c. 820; al-jabr → algebra, Algoritmi
 * → algorithm). No content reproduced.
 */
export const chapter11: Chapter = {
  number: 11,
  slug: 'patterns-and-algebra-preview',
  title: 'Patterns and the Doorstep of Algebra',
  summary:
    'Number patterns, sequences built by rules, matchstick and tile patterns expressed as formulas, and the first use of a letter for an unknown — the exact point where Elementary Algebra takes over the climb.',
  status: 'complete',
  plannedLessons: [],
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
    {
      id: 'fm-patterns-to-formulas',
      number: '11.2',
      title: 'From Patterns to Formulas',
      concepts: [
        'From patterns to formulas',
        'The position letter n',
        'The an + b dress: Tn = dn + (T1 − d)',
        'Check the first term',
        'The matchstick formula 3n + 1',
        'The staircase pairing: n(n + 1)/2',
        'The handshake formula N(N − 1)/2',
        'Reading formulas backwards',
      ],
      objectives: [
        'Write and use position-to-term formulas: dress any add-$d$ pattern as $T_n = dn + (T_1 - d)$, reading the difference and the first term straight off the dress',
        'Derive the staircase formula $1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$ by the pairing argument and cash it on the triangular numbers ($T_{100} = 5050$)',
        'Derive the handshake formula $\\frac{N(N-1)}{2}$ as the staircase formula\u2019s corollary and compute meeting and tournament counts (30 friends → 435; 40 players → 780)',
        'See a formula structurally: the matchstick row\u2019s $3n + 1$ as the seed\u2019s 4 sticks plus 3 for every square after — the fitted dress and the counted structure agreeing',
        'Read formulas backwards by arithmetic undoing — which position holds 99? — while keeping equation solving itself for lesson 11.3',
      ],
      prerequisites: ['fm-patterns-and-rules'],
      sources: ['ncert-math7-gp-ch4', 'ncert-math6-ch11', 'ncert-ganita-prakash6-ch1', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'The last lesson ended at a doorway. It derived the jump law — $T_n = T_1 + (n-1)d$ — and noticed that the doorway it opens onto leads to a new country: rules that read the POSITION straight to the value, skipping the walk. This lesson walks through. Every pattern of the kind this book has studied — the add-patterns, the matchstick counts, the triangular numbers, the handshakes — turns out to wear a **formula**: a compact sentence in the position letter $n$ that produces any term you ask for, first or thousandth, by pure arithmetic. Two derivations carry the lesson — the tidy dress that every add-pattern secretly wears, and the celebrated staircase pairing that hands the triangular numbers their formula — and both end in the same place: arithmetic instead of walking, formulas instead of lists.',
        },
        {
          kind: 'para',
          text: 'Three lists do the lesson\u2019s work, all old friends from 11.1: **4, 9, 14, 19, …** (add 5), the matchstick counts **4, 7, 10, 13, …** (add 3), and the triangular numbers **1, 3, 6, 10, 15, …**. Keep them in view. Every formula below is discovered on one of them, checked against its opening terms, and then trusted for the far ones it was built to reach.',
        },
        { kind: 'heading', text: 'The position letter and the formula' },
        {
          kind: 'para',
          text: 'A formula is a rule worn in symbols. The position is named by a letter — $n$, the **position letter** — and an expression computes the term that lives at that position. The letter is not a mystery and not a single hidden number; it is a placeholder that takes the values $1, 2, 3, \\ldots$ in turn, one value per position. Feed it a position and the expression answers with the term. Four formulas are already yours — this lesson\u2019s business is to notice them as formulas, and then to make new ones at will.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Formula (position-to-term rule)',
          text: 'A **formula** is said to be a rule that produces the term at any position directly from the position: $T_n$ equals an expression built from the position letter $n$. Feeding $n = 1$ must return the first term, $n = 2$ the second, and so on — a formula is certified by its opening terms and trusted for the far ones it was built to reach.',
        },
        {
          kind: 'para',
          text: 'For example, four formulas this book already owns:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'the evens: $T_n = 2n$ — the term is twice the position;',
            'the odds: $T_n = 2n - 1$ — one less than the matching even;',
            'the squares: $T_n = n^2$ — the position squared (11.1\u2019s fourth list, whose rule read the position directly);',
            'the jump law itself: $T_n = T_1 + (n-1)d$ — every add-pattern\u2019s formula, awaiting a tidy dress.',
          ],
        },
        {
          kind: 'para',
          text: 'So the idea of a formula is already in hand. What is new is the *reading*: the jump law already is a formula — the lesson\u2019s first derivation tidies it into the dress every add-pattern wears, in which the pattern\u2019s own numbers sit in plain sight.',
        },
        { kind: 'heading', text: 'The an + b dress of every add-pattern' },
        {
          kind: 'para',
          text: 'Take any add-$d$ pattern with first term $T_1$ and expand the jump law. One multiplication and one gathering later, the formula takes a shape worth memorising — not for its own sake, but because the new shape can be READ, and reading it re-derives it every time.',
        },
        {
          kind: 'derivation',
          title: 'The dress: Tn = dn + (T1 − d) for an add-d pattern',
          statement:
            'Every sequence that adds the same $d$ at every step wears a formula of the shape $dn + c$. Derive the dress from the jump law, and read $d$ and $c$ straight off the pattern.',
          steps: [
            {
              label: 'Expand the jump law',
              formula: 'T_n = T_1 + (n-1)\\,d = dn + (T_1 - d)',
              explanation:
                'Multiply out: $(n-1)d = dn - d$, then gather the $n$-terms and the constants. The shape appears: the coefficient of $n$ is the difference; the constant left over is the first term minus one difference.',
            },
            {
              label: 'Read the shape',
              formula: 'T_n = dn + (T_1 - d)',
              explanation:
                'The number glued to $n$ is $d$ — the jump itself. The constant is $T_1 - d$: the first term with its opening jump already spent. No fitting, no guessing — the pattern\u2019s two numbers walk straight into the formula.',
            },
            {
              label: 'Dress the working lists',
              formula: '4, 9, 14, \\ldots :\\; T_n = 5n - 1 \\qquad 7, 12, 17, \\ldots :\\; T_n = 5n + 2 \\qquad 20, 16, 12, \\ldots :\\; T_n = -4n + 24',
              explanation:
                'Each dress checked against its opening terms — $5 \\times 1 - 1 = 4$, $5 \\times 2 - 1 = 9$, $5 \\times 3 - 1 = 14$ — and against 10,800 sweep comparisons in the chapter\u2019s verify script (180 add-patterns, 60 terms each, iteration versus dress).',
            },
          ],
          result: 'Every add-$d$ pattern wears $T_n = dn + (T_1 - d)$: the jump as the coefficient, the first term\u2019s spent jump as the constant.'
        },
        {
          kind: 'equation',
          latex: 'T_n = dn + (T_1 - d)',
          note: '**The add-pattern dress (tag 1).** The working list 4, 9, 14, …: $T_n = 5n - 1$, so the 100th term is $5 \\times 100 - 1 = 499$ — one multiplication, no walking. The 20th is $99$, as 11.1 found by jumps; the dress agrees.',
        },
        {
          kind: 'para',
          text: 'The dress reads a pattern in one glance and reaches far terms in one move. It also keeps walking after the visible terms run out. The subtract-4 list 20, 16, 12, … wears $T_n = -4n + 24$: position 5 holds $4$, position 6 holds $0$, position 7 holds $-4$. Chapter 7\u2019s integers return — the formula does not stop at the page\u2019s edge, and it does not need permission to go negative. Its 50th term is $-4 \\times 50 + 24 = -176$, computed as cheaply as its third.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Check the first term',
          text: 'A dress that fits three terms can still betray the first. The list 12, 17, 22, 27, … tempts the dress $5n + 7$: it hits 12, 17, 22 — and fails the list it came from, because that list\u2019s first term is 7 and $5 \\times 1 + 7 = 12$. The honest list 7, 12, 17, 22 wears $5n + 2$. The discipline: substitute $n = 1$ FIRST, then $n = 2$, $n = 3$ — before trusting any dress on the far terms it was built for.',
        },
        {
          kind: 'table',
          caption:
            'The lesson\u2019s add-patterns in their dresses. The coefficient is always the difference; the constant is always the first term minus the difference. Each dress is checked at positions 1, 2 and 3 before it is trusted.',
          head: ['the pattern', 'difference $d$', 'first term', 'the dress', 'checked at $n = 1, 2, 3$'],
          rows: [
            ['4, 9, 14, …', '5', '4', '$5n - 1$', '4, 9, 14 ✓'],
            ['7, 12, 17, …', '5', '7', '$5n + 2$', '7, 12, 17 ✓'],
            ['20, 16, 12, …', '−4', '20', '$-4n + 24$', '20, 16, 12 ✓'],
            ['4, 7, 10, …', '3', '4', '$3n + 1$', '4, 7, 10 ✓'],
          ],
        },
        {
          kind: 'para',
          text: 'The matchstick counts deserve their own sentence, because here the formula can be SEEN, not merely fitted. In a row of $n$ squares, the first square stands alone and needs all 4 of its sticks; every square after it borrows its left edge from its neighbour and buys exactly 3 fresh sticks — top, bottom, right. So $n$ squares cost $4 + 3(n-1)$ sticks, which simplifies to $3n + 1$. The fitted dress and the counted structure agree — and when they agree, the formula is not a summary of the pattern but a description of it.',
        },
        {
          kind: 'figure',
          caption:
            'The general matchstick row, drawn for 4 squares. The seed\u2019s four sticks and every square\u2019s three bought sticks (top, bottom, right) are HEAVY; the edges a later square BORROWS from its neighbour are dashed — 10 heavy strokes plus 3 dashed seams = 13 sticks, exactly $3 \\times 4 + 1$. The bracket collects the three later squares: $(n - 1)$ squares at 3 sticks each, after the seed\u2019s 4 — so $n$ squares need $4 + 3(n - 1) = 3n + 1$ sticks, the formula the row itself counts out.',
          svg: `<svg viewBox="0 0 780 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A general row of squares for the matchstick formula: the first square's four sticks plus three bought sticks per later square, totalling 3n + 1 sticks for n squares">
  <text x="390" y="24" font-size="13" fill="currentColor" text-anchor="middle">the general row — the seed\u2019s four sticks, then three bought sticks per square</text>
  ${(() => {
    const sq = 56, y0 = 84, y1 = 140, x0 = 120;
    let out = '';
    // verticals: seed left heavy; seams 176/232/288 dashed (borrowed); final right heavy.
    const seams = [176, 232, 288];
    out += `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" stroke="currentColor" stroke-width="3"/>`;
    for (const s of seams) out += `<line x1="${s}" y1="${y0}" x2="${s}" y2="${y1}" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 3"/>`;
    out += `<line x1="344" y1="${y0}" x2="344" y2="${y1}" stroke="currentColor" stroke-width="3"/>`;
    // horizontals: one heavy segment per square (each square buys its own top and bottom).
    [y0, y1].forEach((y) => {
      for (let i = 0; i < 4; i++) {
        const a = x0 + sq * i, b = x0 + sq * (i + 1);
        out += `<line x1="${a}" y1="${y}" x2="${b}" y2="${y}" stroke="currentColor" stroke-width="3"/>`;
      }
    });
    out += `<text x="148" y="62" font-size="12" fill="currentColor" text-anchor="middle">the seed: 4 sticks</text>`;
    out += `<text x="204" y="118" font-size="12.5" fill="currentColor" text-anchor="middle">+3</text>`;
    out += `<text x="260" y="118" font-size="12.5" fill="currentColor" text-anchor="middle">+3</text>`;
    out += `<text x="316" y="118" font-size="12.5" fill="currentColor" text-anchor="middle">+3</text>`;
    out += `<path d="M 176 176 L 176 168 L 344 168 L 344 176" fill="none" stroke="currentColor" stroke-width="1.2"/>`;
    out += `<text x="260" y="190" font-size="12" fill="currentColor" text-anchor="middle">(n − 1) squares — 3 sticks each</text>`;
    out += `<text x="385" y="116" font-size="16" fill="currentColor" text-anchor="middle">···</text>`;
    out += `<text x="560" y="120" font-size="13.5" fill="currentColor" text-anchor="middle">sticks = 4 + 3(n − 1)</text>`;
    out += `<text x="560" y="158" font-size="13.5" fill="currentColor" text-anchor="middle">= 3n + 1 for n squares</text>`;
    out += `<text x="390" y="252" font-size="12" fill="currentColor" text-anchor="middle">the 20th figure needs 3 × 20 + 1 = 61 sticks — and 100 sticks build (100 − 1)/3 = 33 squares</text>`;
    return out;
  })()}
</svg>`,
        },
        {
          kind: 'para',
          text: 'The formula runs both ways. Forwards: the 20th figure needs $3 \\times 20 + 1 = 61$ sticks. Backwards: 100 sticks build $(100 - 1)/3 = 33$ squares — undo the arithmetic in reverse order, first the "+ 1", then the "× 3". This backwards reading is arithmetic undressing — "what times 3 gives 99?" — the same habit as 11.1\u2019s backwards walks. It is not yet equation solving; the letter $n$ here remains a POSITION letter, and the formal machinery for unknowns is 11.3\u2019s entire territory.',
        },
        { kind: 'heading', text: 'The staircase formula: the triangular numbers' },
        {
          kind: 'para',
          text: 'The triangular numbers resisted the difference test in 11.1 — their differences walk 2, 3, 4, 5 — so no add-dress fits them. They yield to a different idea, the most celebrated pairing in school mathematics: write the sum twice, once forwards and once backwards, and let the two copies complete each other.',
        },
        {
          kind: 'figure',
          caption:
            'The staircase interlock, drawn for $n = 4$. The staircase $S = 1 + 2 + 3 + 4$ is the LIGHT cells — rows of 4, 3, 2, 1. A flipped copy is the DARK cells — rows of 0, 1, 2, 3, 4. Together the two copies fill a 4 × 5 rectangle of 20 cells: every row completes to 4, every column to 5. So $2S = 4 \\times 5$ and $S = (4 \\times 5)/2 = 10$; in general $S = \\frac{n(n+1)}{2}$.',
          svg: `<svg viewBox="0 0 780 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two copies of the staircase 1 plus 2 plus 3 plus 4, one flipped, interlocking into a 4 by 5 rectangle of 20 cells — so the staircase has 10 cells, and in general n(n+1)/2">
  <text x="390" y="24" font-size="13" fill="currentColor" text-anchor="middle">the pairing — two staircases, one flipped, interlock into a rectangle</text>
  ${(() => {
    const cell = 48, gx = 150, gy = 66;
    let out = '';
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 4; c++) {
        const inA = c <= 3 - r;
        const inB = c >= 4 - r;
        const op = inA ? 0.16 : inB ? 0.34 : 0;
        out += `<rect x="${gx + cell * c}" y="${gy + cell * r}" width="${cell}" height="${cell}" fill="currentColor" fill-opacity="${op}" stroke="currentColor" stroke-width="1.1"/>`;
      }
    }
    out += `<rect x="${gx}" y="${gy}" width="${cell * 4}" height="${cell * 5}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    out += `<text x="545" y="120" font-size="13.5" fill="currentColor" text-anchor="middle">S = 1 + 2 + 3 + 4 = 10</text>`;
    out += `<text x="545" y="170" font-size="13.5" fill="currentColor" text-anchor="middle">2S = 4 × 5 = 20</text>`;
    out += `<text x="545" y="220" font-size="13.5" fill="currentColor" text-anchor="middle">S = (4 × 5) / 2 = 10</text>`;
    out += `<text x="545" y="270" font-size="13.5" fill="currentColor" text-anchor="middle">S = n(n + 1)/2 in general</text>`;
    out += `<text x="246" y="328" font-size="12" fill="currentColor" text-anchor="middle" opacity="0.75">every column holds 5 cells — light 4 + dark 1, light 3 + dark 2, …</text>`;
    return out;
  })()}
</svg>`,
        },
        {
          kind: 'derivation',
          title: 'The staircase formula: 1 + 2 + ⋯ + n = n(n + 1)/2',
          statement:
            'Show that the sum of the first $n$ counting numbers is $\\frac{n(n+1)}{2}$ — the triangular numbers\u2019 formula — by the pairing argument.',
          steps: [
            {
              label: 'Write S twice, forwards and backwards',
              formula: 'S = 1 + 2 + 3 + \\cdots + n \\qquad S = n + (n-1) + \\cdots + 1',
              explanation:
                'The same total, counted in opposite orders — the second line is the first read from the far end. Nothing has been assumed except that addition does not care which end it starts from.',
            },
            {
              label: 'Add the two lines column by column',
              formula: '2S = (1 + n) + (2 + (n-1)) + \\cdots + (n + 1) = n \\text{ copies of } (n + 1)',
              explanation:
                'Each column pairs one term from each copy, and every pair sums to the same $n + 1$ — the picture\u2019s light and dark cells completing each column of the rectangle. There are exactly $n$ columns.',
            },
            {
              label: 'Halve the rectangle',
              formula: '2S = n(n + 1) \\qquad \\Rightarrow \\qquad S = \\frac{n(n+1)}{2}',
              explanation:
                'The doubled staircase is an $n \\times (n+1)$ rectangle of cells; one staircase is half of it. The sweep certifies: $n = 1..100$, the identity never missed — $T_{10} = 55$, $T_{15} = 120$, $T_{100} = 5050$.',
            },
          ],
          result: 'The staircase formula: $1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$ — two copies of a staircase make a rectangle.'
        },
        {
          kind: 'equation',
          latex: '1 + 2 + 3 + \\cdots + n = \\frac{n(n+1)}{2}',
          note: '**The staircase formula (tag 2).** The 100th triangular number is $\\frac{100 \\times 101}{2} = 5050$ — the sum of a hundred numbers, halved into one multiplication. The pairing is the whole proof.',
        },
        {
          kind: 'para',
          text: 'The 11.1 promise is now kept. Guests arriving one at a time force $1$, then $2$, then $3$ new handshakes — so a party of $N$ friends ends with $1 + 2 + \\cdots + (N-1) = T_{N-1} = \\frac{N(N-1)}{2}$ handshakes. Eight guests: $\\frac{8 \\times 7}{2} = 28$ — exactly $T_7$, the triangular number the party was promised to reach. A committee of 30: $\\frac{30 \\times 29}{2} = 435$. Forty players in a tournament, each pair meeting once: $\\frac{40 \\times 39}{2} = 780$ games. The handshake count is the staircase formula wearing a party dress, one position down.',
        },
        { kind: 'heading', text: 'Working with formulas' },
        {
          kind: 'example',
          title: 'Find the formula of 4, 9, 14, 19, … and its 100th term.',
          steps: [
            'Now, the difference test: $9 - 4 = 5$, $14 - 9 = 5$ — constant, so the dress applies with $d = 5$.',
            'So the constant is $T_1 - d = 4 - 5 = -1$, and the dress reads $T_n = 5n - 1$.',
            'And the checks: $5 \\times 1 - 1 = 4$ ✓, $5 \\times 2 - 1 = 9$ ✓ — the first term FIRST, then the second.',
            'Hence $T_n = 5n - 1$; the 100th term is $5 \\times 100 - 1 = 499$.',
          ],
        },
        {
          kind: 'example',
          title: 'How many sticks build 20 squares in a row — and how many squares can 100 sticks build?',
          steps: [
            'Now, the structure: the seed\u2019s 4 sticks plus 3 per later square — $n$ squares need $3n + 1$ sticks.',
            'So 20 squares need $3 \\times 20 + 1 = 61$ sticks.',
            'And backwards: $3n + 1 = 100$ undoes to $3n = 99$ — what times 3 gives 99? — so $n = 33$, and $33 \\times 3 + 1 = 100$ ✓.',
            'Hence 61 sticks for 20 squares; 100 sticks build 33 squares — the formula walked forwards and backwards.',
          ],
        },
        {
          kind: 'example',
          title: 'Find the 100th triangular number without adding a hundred numbers.',
          steps: [
            'Now, the staircase formula: $1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$.',
            'So $T_{100} = \\frac{100 \\times 101}{2}$ — one hundred columns, each pairing to 101.',
            'And the halving: $\\frac{10100}{2} = 5050$.',
            'Hence 5050 — the sum of a hundred numbers in one multiplication and one division.',
          ],
        },
        {
          kind: 'example',
          title: 'A committee of 30 meets, and every member shakes hands with every other exactly once. How many handshakes?',
          steps: [
            'Now, the arrivals: the second member forces 1 handshake, the third adds 2, the thirtieth adds 29 — the total is $1 + 2 + \\cdots + 29$.',
            'So the handshake formula applies: $\\frac{N(N-1)}{2}$ with $N = 30$.',
            'And the arithmetic: $\\frac{30 \\times 29}{2} = \\frac{870}{2} = 435$.',
            'Hence 435 handshakes — the staircase formula one position down, the party dress kept on.',
          ],
        },
        {
          kind: 'example',
          title: 'Find the formula of 7, 12, 17, 22, … and its 50th term.',
          steps: [
            'Now, the difference test: $12 - 7 = 5$, $17 - 12 = 5$ — the dress applies with $d = 5$.',
            'So the constant is $T_1 - d = 7 - 5 = 2$, and the dress reads $T_n = 5n + 2$ — the first-term check refuses the tempting $5n + 7$ at once ($7 \\neq 12$).',
            'And the checks: $5 \\times 1 + 2 = 7$ ✓, $5 \\times 2 + 2 = 12$ ✓.',
            'Hence $T_n = 5n + 2$; the 50th term is $5 \\times 50 + 2 = 252$.',
          ],
        },
        {
          kind: 'example',
          title: 'Which position of 4, 9, 14, … holds 99 — and what is 21 + 22 + ⋯ + 40?',
          steps: [
            'Now, the backwards reading: the list wears $T_n = 5n - 1$, and 99 = $5n - 1$ undoes to $5n = 100$ — what times 5 gives 100? — so $n = 20$; the check: $5 \\times 20 - 1 = 99$ ✓.',
            'So position 20 holds the 99.',
            'And the sum: $21 + 22 + \\cdots + 40$ is $T_{40} - T_{20} = \\frac{40 \\times 41}{2} - \\frac{20 \\times 21}{2} = 820 - 210 = 610$ — two staircases, the smaller subtracted from the larger.',
            'Hence position 20, and the sum 610 — formulas read in both directions.',
          ],
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
            'a formula produces the term at any position directly from the position letter $n$ — certified at the opening terms, trusted at the far ones;',
            'every add-$d$ pattern wears the dress $T_n = dn + (T_1 - d)$ — the jump as the coefficient, the first term\u2019s spent jump as the constant;',
            'check the first term FIRST — a dress that fits three terms can still betray the list\u2019s opening;',
            'the matchstick row\u2019s $3n + 1$ is seen, not fitted: the seed\u2019s 4 sticks plus 3 per later square — and it runs backwards ($(100-1)/3 = 33$ squares) by arithmetic undoing;',
            'the staircase formula $1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$ — two staircases interlock into an $n \\times (n+1)$ rectangle;',
            'the handshake formula $\\frac{N(N-1)}{2}$ — the staircase formula one position down; 30 friends, 435 handshakes; and formulas keep walking past the visible terms (the subtract-4 list\u2019s $T_7 = -4$).',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: '"Find the n-th term" is a standing SSC CGL/CHSL and RRB NTPC request: hand over an add-$d$ list, ask for the formula or a far term — the dress answers both ($T_n = dn + (T_1 - d)$; the 50th term is substitution, not struggle). Banking prelims bury the same dress in missing-number grids, and the handshake/staircase formula covers the pairing items — committees, round-robins, "each pair meets once". The off-by-one between $T_n = \\frac{n(n+1)}{2}$ and $\\frac{N(N-1)}{2}$ is the examiner\u2019s favourite trap: guests versus handshakes, position versus count. CTET and state TETs ask the pedagogy — matchstick patterns before symbols, formulas as generalised patterns, why the structure (seed + buys) beats the fit. Series with mixed rules, sigma notation and quadratic theory are later books\u2019 territory. Shapes cited, none reproduced.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The schoolboy and the sum — a story told with care',
          text: 'The most famous anecdote in school mathematics hands a young Carl Gauss (1777–1855) a teacher\u2019s busywork — add the numbers from 1 to 100 — and watches him answer **5050** at once, having paired the list with itself: $1 + 100$, $2 + 99$, …, fifty pairs of 101. Tell it with the book\u2019s usual hedges: the story was first printed in Sartorius von Waltershausen\u2019s 1856 memorial biography, decades after the classroom, and its details vary between tellings — the task, the teacher, even the numbers. What no telling disputes is the ARGUMENT, and the argument is this lesson\u2019s derivation: write the sum twice, once in each direction, and let the columns complete each other. The idea is older than its story — the Greek arithmeticians already knew the triangular numbers pack into rectangles — and it needs no genius to use, only the willingness to write a sum twice. Fifty pairs of 101: the rectangle wins again.',
        },
        {
          kind: 'formula',
          name: 'The add-pattern dress',
          latex: 'T_n = dn + (T_1 - d)',
          note: 'Every add-$d$ pattern as a formula: the jump as the coefficient of $n$, the first term minus one jump as the constant. 4, 9, 14, … wears $5n - 1$; the 100th term is 499.',
        },
        {
          kind: 'formula',
          name: 'The staircase formula',
          latex: '1 + 2 + 3 + \\cdots + n = \\frac{n(n+1)}{2}',
          note: 'Two copies of the staircase interlock into an $n \\times (n+1)$ rectangle. The 100th triangular number: $\\frac{100 \\times 101}{2} = 5050$.',
        },
        {
          kind: 'formula',
          name: 'The handshake formula',
          latex: '\\text{handshakes among } N \\text{ friends} = \\frac{N(N-1)}{2}',
          note: 'The staircase formula one position down — each arrival adds one fewer handshake than the last. Thirty friends: 435; forty players, one game per pair: 780.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Formula',
              def: 'A rule that produces the term at any position directly from the position: $T_n$ as an expression in the position letter $n$ — certified at the opening terms, trusted at the far ones.',
            },
            {
              term: 'Position letter',
              def: 'The letter $n$ naming which term is wanted; a placeholder taking the values $1, 2, 3, \\ldots$, not a single hidden number.',
            },
            {
              term: 'General term',
              def: 'The term at position $n$, written $T_n$ — the formula\u2019s output, ready to be evaluated at any position asked for.',
            },
            {
              term: 'Add-pattern dress',
              def: 'The shape $T_n = dn + (T_1 - d)$ worn by every add-$d$ pattern: the common difference as the coefficient, the first term minus one jump as the constant.',
            },
            {
              term: 'Pairing argument',
              def: 'The staircase derivation: write a sum forwards and backwards, add the columns (each sums to $n + 1$), halve the $n \\times (n+1)$ rectangle — $S = \\frac{n(n+1)}{2}$.',
            },
            {
              term: 'Handshake formula',
              def: 'The count when each of $N$ people meets each other once: $\\frac{N(N-1)}{2}$ — the staircase formula one position down, since the arrivals add $1, 2, \\ldots, N-1$.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The formula of 4, 9, 14, 19, … is',
              options: ['$5n - 1$', '$5n + 4$', '$4n + 5$', '$n + 5$'],
              answer: 0,
              explain:
                'The dress: $d = 5$, constant $T_1 - d = -1$, so $T_n = 5n - 1$ — and it hits 4, 9, 14, 19 at $n = 1..4$ (Option 1). $5n + 4$ fails the first term (9), $4n + 5$ the second (13), $n + 5$ at once (6).',
            },
            {
              q: 'The 100th triangular number is',
              options: ['5000', '5050', '5500', '10000'],
              answer: 1,
              explain:
                'The staircase formula: $\\frac{100 \\times 101}{2} = 5050$ (Option 2). Option 1 is the reflex $\\frac{100 \\times 100}{2}$; Option 3 and Option 4 have no rule — the pairing fixes the factors as $n$ and $n + 1$.',
            },
            {
              q: 'The 20th figure of the matchstick pattern needs',
              options: ['60 sticks', '61 sticks', '63 sticks', '41 sticks'],
              answer: 1,
              explain:
                'The formula $3n + 1$: $3 \\times 20 + 1 = 61$ (Option 2). Option 1 is the reflex $3 \\times 20$ — it forgets the seed\u2019s extra stick, the "+ 1" the first square pays alone.',
            },
            {
              q: 'The formula of 7, 12, 17, 22, … is',
              options: ['$5n + 2$', '$5n + 7$', '$7n - 5$', '$n + 5$'],
              answer: 0,
              explain:
                'The dress with $d = 5$, constant $7 - 5 = 2$: $T_n = 5n + 2$ — 7, 12, 17, 22 at $n = 1..4$ (Option 1). Option 2 fits 12, 17, 22 and BETRAYS the first term ($5 \\times 1 + 7 = 12 \\neq 7$) — check the first term first.',
            },
            {
              q: 'Ten friends each shake hands with everyone else exactly once. The number of handshakes is',
              options: ['45', '55', '90', '100'],
              answer: 0,
              explain:
                'The handshake formula: $\\frac{10 \\times 9}{2} = 45$ (Option 1). Option 2 is $T_{10}$ — the off-by-one (the 10th arrival adds only 9); Option 3 forgot the halving; Option 4 is the square reflex.',
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
                  q: 'Write the formula of the evens 2, 4, 6, 8, … and find the 34th even.',
                  solution: [
                    'Now, the difference test: $4 - 2 = 2$ — constant, so the dress applies with $d = 2$.',
                    'So the constant is $T_1 - d = 2 - 2 = 0$, and the dress reads $T_n = 2n$ — the term is twice the position, as 11.1 found by jumps.',
                    'And the 34th even: $2 \\times 34 = 68$.',
                    'Hence $T_n = 2n$; the 34th even is 68.',
                  ],
                  answer: 'Tn = 2n; the 34th even is 68',
                },
                {
                  q: 'Write the formula of the odds 1, 3, 5, 7, … and find the 35th odd.',
                  solution: [
                    'Now, the dress: $d = 2$ and the constant is $T_1 - d = 1 - 2 = -1$, so $T_n = 2n - 1$.',
                    'So the checks: $2 \\times 1 - 1 = 1$ ✓, $2 \\times 2 - 1 = 3$ ✓.',
                    'And the 35th odd: $2 \\times 35 - 1 = 69$.',
                    'Hence $T_n = 2n - 1$; the 35th odd is 69.',
                  ],
                  answer: 'Tn = 2n − 1; the 35th odd is 69',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Find the formula of 5, 8, 11, 14, … and its 20th term.',
                  solution: [
                    'Now, the difference test: $8 - 5 = 3$ — constant, so $d = 3$.',
                    'So the constant is $T_1 - d = 5 - 3 = 2$, and the dress reads $T_n = 3n + 2$.',
                    'And the checks: $3 \\times 1 + 2 = 5$ ✓, $3 \\times 2 + 2 = 8$ ✓ — then the 20th term: $3 \\times 20 + 2 = 62$.',
                    'Hence $T_n = 3n + 2$; the 20th term is 62.',
                  ],
                  answer: 'Tn = 3n + 2; T20 = 62',
                },
                {
                  q: 'Find the formula of 7, 12, 17, 22, … and its 50th term.',
                  solution: [
                    'Now, the difference test: $12 - 7 = 5$ — constant, so $d = 5$.',
                    'So the constant is $7 - 5 = 2$: the dress is $T_n = 5n + 2$ (the tempting $5n + 7$ fails the first term — $12 \\neq 7$).',
                    'And the checks: $5 \\times 1 + 2 = 7$ ✓, $5 \\times 2 + 2 = 12$ ✓ — then $5 \\times 50 + 2 = 252$.',
                    'Hence $T_n = 5n + 2$; the 50th term is 252.',
                  ],
                  answer: 'Tn = 5n + 2; T50 = 252',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'In the matchstick pattern: how many sticks build 20 squares in a row, and how many squares do 100 sticks build?',
                  solution: [
                    'Now, the structure: the seed\u2019s 4 sticks plus 3 per later square — $n$ squares need $3n + 1$ sticks.',
                    'So 20 squares need $3 \\times 20 + 1 = 61$ sticks.',
                    'And backwards: $3n + 1 = 100$ undoes to $3n = 99$, so $n = 33$ — and $33 \\times 3 + 1 = 100$ ✓.',
                    'Hence 61 sticks for 20 squares; 33 squares from 100 sticks.',
                  ],
                  answer: '61 sticks; 33 squares',
                },
                {
                  q: 'Use the staircase formula to find the 10th and 15th triangular numbers.',
                  solution: [
                    'Now, the formula: $T_n = \\frac{n(n+1)}{2}$.',
                    'So $T_{10} = \\frac{10 \\times 11}{2} = 55$ — ten columns of 11, halved.',
                    'And $T_{15} = \\frac{15 \\times 16}{2} = 120$.',
                    'Hence 55 and 120 — the 11.1 list (1, 3, 6, 10, 15, 21) caught by one multiplication.',
                  ],
                  answer: 'T10 = 55; T15 = 120',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Every member of a 30-person committee shakes hands with every other exactly once; a second committee has 40 members doing the same. How many handshakes does each meeting force?',
                  solution: [
                    'Now, the arrivals force $1 + 2 + \\cdots + 29$ and $1 + 2 + \\cdots + 39$ handshakes — the handshake formula applies.',
                    'So the 30-member meeting: $\\frac{30 \\times 29}{2} = 435$.',
                    'And the 40-member meeting: $\\frac{40 \\times 39}{2} = 780$.',
                    'Hence 435 and 780 handshakes.',
                  ],
                  answer: '435; 780',
                },
                {
                  q: 'The list 20, 16, 12, … subtracts 4 at every step. Find its formula, the term at position 6, and its 50th term.',
                  solution: [
                    'Now, the dress with a negative jump: $d = -4$ and the constant is $T_1 - d = 20 + 4 = 24$, so $T_n = -4n + 24$.',
                    'So the checks: $-4 \\times 1 + 24 = 20$ ✓, $-4 \\times 2 + 24 = 16$ ✓.',
                    'And position 6: $-4 \\times 6 + 24 = 0$; the 50th term: $-4 \\times 50 + 24 = -176$.',
                    'Hence $T_n = -4n + 24$; $T_6 = 0$, $T_{50} = -176$ — the formula keeps walking into chapter 7\u2019s integers, honestly.',
                  ],
                  answer: 'Tn = −4n + 24; T6 = 0; T50 = −176',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Find 1 + 2 + ⋯ + 200, and the shop-window sum 21 + 22 + ⋯ + 40.',
                  solution: [
                    'Now, the staircase formula: $1 + 2 + \\cdots + 200 = \\frac{200 \\times 201}{2} = 20100$.',
                    'So the shop window: $21 + \\cdots + 40$ is the big staircase minus the first 20 steps — $T_{40} - T_{20}$.',
                    'And the arithmetic: $\\frac{40 \\times 41}{2} - \\frac{20 \\times 21}{2} = 820 - 210 = 610$.',
                    'Hence 20100 and 610 — two staircases, the smaller subtracted from the larger.',
                  ],
                  answer: '20100; 610',
                },
                {
                  q: 'Read the formulas backwards: which position of 4, 9, 14, … holds 99 — and how many squares do 100 sticks build?',
                  solution: [
                    'Now, the first list wears $T_n = 5n - 1$; 99 = $5n - 1$ undoes to $5n = 100$ — what times 5 gives 100? — so $n = 20$.',
                    'So the check: $5 \\times 20 - 1 = 99$ ✓ — position 20 holds the 99.',
                    'And the sticks: $3n + 1 = 100$ undoes to $3n = 99$, so $n = 33$ squares ($33 \\times 3 + 1 = 100$ ✓).',
                    'Hence position 20; 33 squares — arithmetic undressing, the equation machine of 11.3 waiting one lesson away.',
                  ],
                  answer: 'Position 20; 33 squares',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove that every add-$d$ pattern with first term $T_1$ wears $T_n = dn + (T_1 - d)$, and cash the dress on 4, 9, 14, … and 20, 16, 12, …',
                  solution: [
                    'Now, expand the jump law: $T_n = T_1 + (n-1)d = T_1 + dn - d = dn + (T_1 - d)$ — one multiplication, one gathering.',
                    'So the shape is forced: the coefficient of $n$ is the difference $d$; the constant is the first term with its opening jump already spent.',
                    'And the cash: 4, 9, 14, … wears $5n - 1$ ($d = 5$, constant $4 - 5 = -1$); 20, 16, 12, … wears $-4n + 24$ ($d = -4$, constant $20 + 4$).',
                    'Hence the dress — certified here by 180 add-patterns × 60 terms swept in the chapter\u2019s script, iteration and dress agreeing at every term.',
                  ],
                  answer: 'Tn = dn + (T1 − d); 5n − 1 and −4n + 24 for the two working lists',
                },
                {
                  q: 'Prove the staircase formula $1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$ by the pairing argument, certify it at $n = 4$ and $n = 100$, and derive the handshake formula as the corollary.',
                  solution: [
                    'Now, write $S$ twice: $S = 1 + 2 + \\cdots + n$ and $S = n + (n-1) + \\cdots + 1$.',
                    'So adding column by column: $2S = (1+n) + (2+(n-1)) + \\cdots + (n+1) = n$ copies of $(n+1) = n(n+1)$ — each column completes to $n + 1$, as the interlocked staircases complete each column of the rectangle.',
                    'And halving: $S = \\frac{n(n+1)}{2}$ — certified at $n = 4$ ($\\frac{4 \\times 5}{2} = 10$, the drawn rectangle) and $n = 100$ (5050), and swept $n = 1..100$.',
                    'Hence the staircase formula; and the handshakes among $N$ friends are $1 + 2 + \\cdots + (N-1) = \\frac{(N-1)N}{2}$ — the corollary the 11.1 party was promised ($N = 40$: 780 games).',
                  ],
                  answer: 'S = n(n + 1)/2; T4 = 10, T100 = 5050; handshakes N(N − 1)/2 = 780 for 40',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-letter-for-the-unknown',
      number: '11.3',
      title: 'A Letter for the Unknown',
      concepts: [
        'The first equation',
        'Variable: the letter for an unknown',
        'The balance law',
        'The undo machine: ax + b = c',
        'Undo the last operation first',
        'Equations from words',
        'The check by substitution',
        'The door to algebra',
      ],
      objectives: [
        'Say exactly what an equation is — a sentence asserting that two expressions name the same number — and what solving means: finding every value of the variable that makes the sentence true, proven by substituting back',
        'Derive the balance law from the meaning of equality (the same change to both sides keeps them equal, division by zero refused) and use its four moves: add, subtract, multiply, share',
        'Solve one- and two-step equations of the shape $ax + b = c$ by the undo machine — undo the LAST operation first — and verify every solution ($3x + 1 = 31$ gives $x = 10$)',
        'Turn word problems into equations and back: the ribbon split ($x + (x + 11) = 47$), the ages ($2b + 3 = 17$), the rectangle (6 by 12), the father-and-son collecting ($x + 4x = 50$)',
        'Close the book on the doorstep it was named for: the letter now holds an unknown — Elementary Algebra takes over the climb from exactly here',
      ],
      prerequisites: ['fm-patterns-to-formulas', 'fm-patterns-and-rules'],
      sources: ['ncert-math7-ch4', 'ncert-math6-ch11', 'ncert-math7-gp-ch4', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'One riddle opens the book\u2019s final lesson, and it is older than its alphabet: **I think of a number; I multiply it by 3; I add 1; I land on 31. What was my number?** Guessing backwards works for small riddles — try 9 (too small: 28), try 11 (too big: 34) — but guessing is not a habit to hand the future. This lesson gives the habit a machine: name the unknown with a letter, write the sentence the riddle made, and let a balance do the rest. It is the last lesson of this book, and it stands exactly where its chapter\u2019s title says — on the doorstep of algebra, with one hand on the handle.',
        },
        {
          kind: 'para',
          text: 'The riddle\u2019s sentence writes itself. Call the unknown $x$ — the letter 11.2 already trusted with positions now holds a place for a number we do not know YET. "Multiply it by 3, then add 1, and the result is 31" becomes $3x + 1 = 31$: three copies of the hidden number, plus one more, naming the same number as thirty-one.',
        },
        { kind: 'heading', text: 'The equation: a sentence with a letter' },
        {
          kind: 'para',
          text: 'The new sentence deserves its new name, and the name comes with an exact definition in the house style:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Equation, variable, solution',
          text: 'An **equation** is said to be a sentence asserting that two expressions name the SAME number — written with an equals sign, as $3x + 1 = 31$. The letter holding the unknown\u2019s place is said to be the **variable** (or the **unknown**). A **solution** is said to be a value of the variable that makes the sentence true; **solving** the equation means finding every solution. And the check is part of the definition\u2019s discipline: a solution is proven by substituting it back into the sentence.',
        },
        {
          kind: 'para',
          text: 'Read $3x + 1 = 31$ aloud as a sentence, not a command: "three-$x$-plus-one is the same number as thirty-one." The two sides have names of their own — the **left side** and the **right side** — and the equals sign is the promise that they are two names for one number. The variable $x$ is whatever value makes that promise true; there may be one such value (here there is), many, or none, and the solving habits of this lesson find out which.',
        },
        {
          kind: 'para',
          text: 'What solving looks like is the next section\u2019s business. The one-line preview: guessing is replaced by a small set of LEGAL MOVES — moves that cannot spoil a true sentence — and the moves come from one law about what equality can bear.',
        },
        { kind: 'heading', text: 'The balance law' },
        {
          kind: 'para',
          text: 'Picture the equation as a balance scale. The left side sits in one pan, the right side in the other, and the equals sign is the beam\u2019s levelness: the two pans hold the same number. Now the whole craft of algebra rests on one observation about balances — anything done equally to both pans keeps the beam level.',
        },
        {
          kind: 'derivation',
          title: 'The balance law',
          statement:
            'If two numbers are equal, they remain equal when the same amount is added to both, subtracted from both, multiplied into both, or divided into both — the divisor never zero.',
          steps: [
            {
              label: 'What equality means',
              formula: 'a = b',
              explanation:
                'The two names name ONE number. Whatever that number can bear — an addition, a subtraction, a doubling, a sharing — its two names can bear, because there is only the one thing being acted on.',
            },
            {
              label: 'The same change to both',
              formula: 'a = b \\;\\Rightarrow\\; a + t = b + t, \\quad a - t = b - t, \\quad a \\times t = b \\times t, \\quad a \\div t = b \\div t \\;(t \\neq 0)',
              explanation:
                'Apply the same operation to the same number twice and the results are equal — the sentence\u2019s truth never depended on which name you watched. Division by zero is refused outright: no number can be shared into zero pans.',
            },
            {
              label: 'Why this solves equations',
              formula: '3x + 1 = 31 \\;\\Rightarrow\\; 3x + 1 - 1 = 31 - 1 \\;\\Rightarrow\\; 3x = 30',
              explanation:
                'The unknown $x$ is not special — it is a number too. The balance moves apply to its sentence, steering both sides toward $x$ standing alone. The steering order is the next derivation\u2019s machine.',
            },
          ],
          result: 'The balance law: equal quantities stay equal under the same operation — the licence for every legal move in algebra.'
        },
        {
          kind: 'equation',
          latex: 'a = b \\;\\Rightarrow\\; a + t = b + t, \\;\\; a - t = b - t, \\;\\; a \\times t = b \\times t, \\;\\; a \\div t = b \\div t \\;(t \\neq 0)',
          note: '**The balance law (tag 1).** Four legal moves, one refusal (÷ 0). Everything the rest of this lesson — and the whole of algebra after it — does to equations is one of these four moves.',
        },
        {
          kind: 'figure',
          caption:
            'The balance walk on the riddle\u2019s sentence. State 1: the left pan holds three $x$-boxes and a 1-chip; the right pan holds the 31-block — the sentence $3x + 1 = 31$. Move one: take 1 from BOTH pans — three $x$-boxes against the 30-block: $3x = 30$. Move two: share BOTH pans into 3 equal heaps — one $x$-box against the 10-block: $x = 10$. The beam never dipped; every move was legal; the check ($3 \\times 10 + 1 = 31$ ✓) closes the case.',
          svg: `<svg viewBox="0 0 780 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A balance scale drawn three times: 3x plus 1 balancing 31; after taking 1 from both pans, 3x balancing 30; after sharing both pans into three, x balancing 10">
  <text x="390" y="24" font-size="13" fill="currentColor" text-anchor="middle">the balance — equal pans, legal moves, the unknown found</text>
  ${(() => {
    const cxs = [130, 390, 650];
    let out = '';
    cxs.forEach((cx, i) => {
      out += `<line x1="${cx - 90}" y1="100" x2="${cx + 90}" y2="100" stroke="currentColor" stroke-width="2"/>`;
      out += `<rect x="${cx - 3}" y="100" width="6" height="150" fill="currentColor"/>`;
      out += `<line x1="${cx - 40}" y1="250" x2="${cx + 40}" y2="250" stroke="currentColor" stroke-width="2"/>`;
      out += `<line x1="${cx - 55}" y1="100" x2="${cx - 55}" y2="144" stroke="currentColor" stroke-width="1"/>`;
      out += `<line x1="${cx + 55}" y1="100" x2="${cx + 55}" y2="144" stroke="currentColor" stroke-width="1"/>`;
      out += `<rect x="${cx - 55}" y="144" width="110" height="12" fill="currentColor" fill-opacity="0.25"/>`;
      out += `<rect x="${cx - 55}" y="144" width="110" height="12" fill="none" stroke="currentColor" stroke-width="1"/>`;
      // left loads: three 18×18 x-boxes with the +1 chip in the row's
      // tail (P1); the weight block alone on the right half.
      if (i < 2) {
        for (let k = 0; k < 3; k++) {
          out += `<rect x="${cx - 54 + k * 22}" y="126" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
          out += `<text x="${cx - 45 + k * 22}" y="139" font-size="9.5" fill="currentColor" text-anchor="middle">x</text>`;
        }
        if (i === 0) {
          out += `<rect x="${cx + 13}" y="130" width="14" height="14" fill="currentColor" fill-opacity="0.3"/>`;
          out += `<text x="${cx + 20}" y="140.5" font-size="9" fill="currentColor" text-anchor="middle">1</text>`;
        }
      } else {
        out += `<rect x="${cx - 40}" y="126" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
        out += `<text x="${cx - 31}" y="139" font-size="9.5" fill="currentColor" text-anchor="middle">x</text>`;
      }
      // right loads: one labelled weight block per state.
      const w = ['31', '30', '10'][i];
      out += `<rect x="${cx + 28}" y="124" width="26" height="20" fill="currentColor" fill-opacity="0.14" stroke="currentColor" stroke-width="1.2"/>`;
      out += `<text x="${cx + 41}" y="138" font-size="10" fill="currentColor" text-anchor="middle">${w}</text>`;
    });
    out += `<text x="130" y="276" font-size="12.5" fill="currentColor" text-anchor="middle">3x + 1 = 31</text>`;
    out += `<text x="390" y="276" font-size="12.5" fill="currentColor" text-anchor="middle">3x = 30</text>`;
    out += `<text x="650" y="276" font-size="12.5" fill="currentColor" text-anchor="middle">x = 10</text>`;
    out += `<text x="130" y="300" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">the sentence, balanced</text>`;
    out += `<text x="390" y="300" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">take 1 from both pans</text>`;
    out += `<text x="650" y="300" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">share both pans into 3</text>`;
    return out;
  })()}
</svg>`,
        },
        {
          kind: 'para',
          text: 'The walk, in words. The riddle\u2019s sentence $3x + 1 = 31$ puts $3x + 1$ in the left pan and $31$ in the right. Taking 1 from both pans is the balance law\u2019s subtraction: $3x = 30$, and the beam holds. Sharing both pans into 3 equal heaps is its division: $x = 10$, and the beam holds again. The hidden number is **10** — and the check proves it rather than trusts it: $3 \\times 10 + 1 = 31$ ✓. Two moves, both legal, one substitution — no guessing anywhere.',
        },
        { kind: 'heading', text: 'The undo machine' },
        {
          kind: 'para',
          text: 'The riddle built its hidden number in a fixed order: $x$, then $\\times 3$, then $+ 1$. To recover it, undo the operations in the OPPOSITE order — the last operation leaves first. It is the socks-and-shoes discipline of chapter 2\u2019s order of operations, worn backwards: shoes off before socks. Undo the "$+ 1$" first, the "$\\times 3$" second — never the other way round.',
        },
        {
          kind: 'derivation',
          title: 'The undo machine: ax + b = c solves to x = (c − b)/a',
          statement:
            'Solve the two-step equation $ax + b = c$ (with $a \\neq 0$) by the balance law, undoing the operations in reverse order — and certify the machine.',
          steps: [
            {
              label: 'Undo the last operation first',
              formula: 'ax + b - b = c - b \\;\\Rightarrow\\; ax = c - b',
              explanation:
                'The "$+ b$" was applied last, so it leaves first — the balance law\u2019s subtraction, performed on both sides. Undoing the multiplication first would scramble the sentence: $ax$ and $b$ are not the same kind of load.',
            },
            {
              label: 'Then undo the first',
              formula: 'ax \\div a = (c - b) \\div a \\;\\Rightarrow\\; x = \\frac{c - b}{a}',
              explanation:
                'The "$\\times a$" leaves by sharing both sides into $a$ equal heaps. The riddle: $3x + 1 = 31$ gives $3x = 30$, then $x = 30/3 = 10$ — the machine runs the balance walk in one line.',
            },
            {
              label: 'The sweep certificate',
              formula: 'x = (c - b)/a \\quad \\text{for } a = 2..9,\\; b = 1..12,\\; x = 1..20',
              explanation:
                '1,920 hidden numbers were run through the machine forward and back: build $c = ax + b$, recover $(c - b)/a$ — every hidden number came home (the chapter\u2019s verify script, section AB). The check habit stays yours regardless: substitute back, every time.',
            },
          ],
          result: 'The undo machine: $x = (c - b)/a$ — last operation out first, and the substitution proves it.'
        },
        {
          kind: 'equation',
          latex: 'ax + b = c \\qquad \\Rightarrow \\qquad x = \\frac{c - b}{a}',
          note: '**The undo machine (tag 2).** The riddle\u2019s sentence $3x + 1 = 31$: $x = (31 - 1)/3 = 10$. Two legal moves in the forced order — and the same machine handles every one- and two-step equation this book will ever meet.',
        },
        {
          kind: 'figure',
          caption:
            'The machine and its undo path. Forward: a number $x$ enters, the "$\\times 3$" gate and the "$+ 1$" gate act in order, and 31 leaves — the sentence $3x + 1 = 31$. Undo (dashed): the LAST gate leaves first — take 1, the output becomes 30; then share into 3, and the recovered input is $x = 10$. The check runs the machine forward on 10: $3 \\times 10 + 1 = 31$ ✓.',
          svg: `<svg viewBox="0 0 780 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A function machine: a number x passes through times-3 then plus-1 and becomes 31; dashed undo arrows subtract 1 to get 30, then divide by 3 to recover x equals 10">
  <text x="390" y="24" font-size="13" fill="currentColor" text-anchor="middle">the machine — forward builds the sentence, dashed undo walks it back</text>
  ${(() => {
    let out = '';
    out += `<text x="100" y="80" font-size="12.5" fill="currentColor" text-anchor="middle">a number x</text>`;
    out += `<line x1="130" y1="80" x2="182" y2="80" stroke="currentColor" stroke-width="1.4"/>`;
    out += `<path d="M 182 76 L 190 80 L 182 84 Z" fill="currentColor"/>`;
    out += `<rect x="190" y="50" width="100" height="50" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
    out += `<text x="240" y="84" font-size="13.5" fill="currentColor" text-anchor="middle">× 3</text>`;
    out += `<line x1="300" y1="80" x2="342" y2="80" stroke="currentColor" stroke-width="1.4"/>`;
    out += `<path d="M 342 76 L 350 80 L 342 84 Z" fill="currentColor"/>`;
    out += `<rect x="350" y="50" width="100" height="50" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
    out += `<text x="400" y="84" font-size="13.5" fill="currentColor" text-anchor="middle">+ 1</text>`;
    out += `<line x1="460" y1="80" x2="552" y2="80" stroke="currentColor" stroke-width="1.4"/>`;
    out += `<path d="M 552 76 L 560 80 L 552 84 Z" fill="currentColor"/>`;
    out += `<text x="600" y="85" font-size="14" fill="currentColor" text-anchor="middle">31</text>`;
    out += `<line x1="590" y1="165" x2="474" y2="165" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5 4"/>`;
    out += `<path d="M 474 161 L 466 165 L 474 169 Z" fill="currentColor"/>`;
    out += `<text x="525" y="188" font-size="11.5" fill="currentColor" text-anchor="middle">subtract 1 → 30</text>`;
    out += `<line x1="340" y1="165" x2="214" y2="165" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5 4"/>`;
    out += `<path d="M 214 161 L 206 165 L 214 169 Z" fill="currentColor"/>`;
    out += `<text x="270" y="188" font-size="11.5" fill="currentColor" text-anchor="middle">share into 3 → 10</text>`;
    out += `<text x="100" y="170" font-size="12.5" fill="currentColor" text-anchor="middle">x = 10</text>`;
    return out;
  })()}
</svg>`,
        },
        {
          kind: 'para',
          text: 'One refinement earns its keep now: **collecting**. Sentences often carry several copies of the letter, and the copies combine before any balance move — $x + (x + 11) = 47$ has two $x$-names on the left, and two copies of a number make twice the number: $2x + 11 = 47$. The father-son sentence does it too: father is four times the son, together they make 50 — $x + 4x = 50$, five copies of $x$, so $5x = 50$ and $x = 10$. Collecting is the balance\u2019s helper: count the copies first, then balance. The undo machine then finishes the job ($2x = 36$ shares into 2; $5x = 50$ shares into 5).',
        },
        { kind: 'heading', text: 'Equations from words' },
        {
          kind: 'para',
          text: 'The riddle came with its equation half-built. Real problems arrive in words, and the translation has one firm rule: **name the unknown first**. "A ribbon 47 cm long is cut into two pieces, one 11 cm longer than the other" — call the short piece $x$; the long piece is then $x + 11$; the sentence the words made is $x + (x + 11) = 47$. Collect: $2x + 11 = 47$. Undo: $2x = 36$, so $x = 18$. The pieces are 18 cm and 29 cm.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Check both conditions',
          text: 'A word problem\u2019s solution must satisfy EVERYTHING the words said — not just one condition. The ribbon\u2019s pieces 18 and 29: the sum is $18 + 29 = 47$ ✓ and the difference is $29 - 18 = 11$ ✓. If either condition fails, the equation — not the arithmetic — was misread. The check by substitution is not a courtesy; it is the proof.',
        },
        {
          kind: 'para',
          text: 'The same two habits — name the unknown, write the sentence — translate the whole family. Meera is 17 and three years older than twice her brother\u2019s age: $2b + 3 = 17$, so $2b = 14$ and $b = 7$ — and twice 7 plus 3 is 17 ✓. The rectangle whose length is twice its width and whose perimeter is 36: the sides are $x$, $2x$, $x$, $2x$ — collect to $6x = 36$, share into 6, and the rectangle is 6 by 12 (perimeter $6 + 12 + 6 + 12 = 36$ ✓). Even 11.2\u2019s formulas turn out to have been equations in disguise: the handshake formula $\\frac{N(N-1)}{2} = 780$ read backwards asks which party forces 780 handshakes — and the undo machine answers ($N(N-1) = 1560$, and $N = 40$ fits). Every formula, read backwards, is an equation.',
        },
        { kind: 'heading', text: 'Working with equations' },
        {
          kind: 'example',
          title: 'Solve 3x + 1 = 31 — the riddle that opened the lesson.',
          steps: [
            'Now, name the unknown: $x$ is the hidden number; the sentence is already written.',
            'So undo the LAST operation first: take 1 from both sides — $3x = 30$.',
            'And undo the first: share both sides into 3 — $x = 10$.',
            'Hence $x = 10$, proven by substitution: $3 \\times 10 + 1 = 31$ ✓.',
          ],
        },
        {
          kind: 'example',
          title: 'Solve x + 7 = 12 and x/4 = 7.',
          steps: [
            'Now, the first: subtract 7 from both sides — $x = 5$; the check: $5 + 7 = 12$ ✓.',
            'So the second: the "$\\div 4$" leaves by multiplying both sides by 4 — $x = 28$; the check: $28/4 = 7$ ✓.',
            'And the machine\u2019s rule holds in both: one operation, one balance move.',
            'Hence $x = 5$ and $x = 28$ — each proven by substitution.',
          ],
        },
        {
          kind: 'example',
          title: 'Solve 4(x + 3) = 20.',
          steps: [
            'Now, the order: the "$+ 3$" acted on $x$ FIRST, then the "$\\times 4$" acted on the lot — so the "$\\times 4$" leaves FIRST.',
            'So share both sides into 4: $x + 3 = 5$.',
            'And undo the "$+ 3$": $x = 2$ — the check: $4 \\times (2 + 3) = 20$ ✓.',
            'Hence $x = 2$ — last out first, even when the last operation wraps a bracket.',
          ],
        },
        {
          kind: 'example',
          title: 'A ribbon 47 cm long is cut into two pieces, one 11 cm longer than the other. Find the pieces.',
          steps: [
            'Now, name the unknown: the short piece is $x$; the long piece is $x + 11$.',
            'So the sentence: $x + (x + 11) = 47$ — collect the copies: $2x + 11 = 47$.',
            'And the machine: $2x = 36$, so $x = 18$ — the pieces are 18 cm and 29 cm.',
            'Hence 18 cm and 29 cm, with BOTH conditions checked: $18 + 29 = 47$ ✓ and $29 - 18 = 11$ ✓.',
          ],
        },
        {
          kind: 'example',
          title: 'Meera is 17. She is 3 years older than twice her brother\u2019s age. How old is her brother?',
          steps: [
            'Now, name the unknown: the brother\u2019s age is $b$; "three more than twice" is $2b + 3$.',
            'So the sentence: $2b + 3 = 17$.',
            'And the machine: subtract 3 — $2b = 14$; share into 2 — $b = 7$.',
            'Hence the brother is 7, proven: $2 \\times 7 + 3 = 17$ ✓.',
          ],
        },
        {
          kind: 'example',
          title: 'A rectangle\u2019s length is twice its width and its perimeter is 36. Find the sides.',
          steps: [
            'Now, name the unknown: the width is $x$; the length is $2x$.',
            'So the sentence: $x + 2x + x + 2x = 36$ — collect the four copies: $6x = 36$.',
            'And the machine: share both sides into 6 — $x = 6$; the sides are 6 and 12.',
            'Hence 6 by 12, with both conditions checked: the perimeter $6 + 12 + 6 + 12 = 36$ ✓ and the length $12 = 2 \\times 6$ ✓.',
          ],
        },
        { kind: 'heading', text: 'The harvest' },
        {
          kind: 'para',
          text: 'The lesson\u2019s tools — and the book\u2019s — in the lesson\u2019s own order:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'an equation is a sentence saying two expressions name the same number; the variable holds the unknown\u2019s place; a solution is proven by substituting back;',
            'the balance law: equal numbers stay equal under the same $+$, $-$, $\\times$, $\\div$ (never $\\div 0$) — the licence for every legal move;',
            'the undo machine: $ax + b = c$ solves to $x = (c - b)/a$ — the LAST operation leaves first; 1,920 sweep cases and every check agree;',
            'collecting: count the copies of the letter first ($x + 4x = 5x$), then balance;',
            'equations from words: name the unknown first, write the sentence the words made, and check EVERY condition (the ribbon\u2019s 18 and 29 pass both);',
            'and every formula of 11.2, read backwards, is an equation — the two lessons are one subject seen from its two sides.',
          ],
        },
        {
          kind: 'para',
          text: 'This is the book\u2019s last paragraph, and it ends on the doorstep it was named for. Eleven chapters climbed from counting to patterns; this one put a letter where a number was missing and taught the balance that finds it. The machinery built here — variables, equations, legal moves, the check habit — is exactly where Elementary Algebra, the next book on the shelf, picks up the climb: the same letters, doing more ambitious work. The door is open. The habit travels: state the rule, check the terms, and never ask "what comes next" without a reason.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'Simple equations are the load-bearing wall of every quantitative paper: SSC CGL/CHSL and RRB NTPC set them straight ("if $3x + 1 = 31$, find $x$") and wear them inside age problems, ribbon-and-cut narrations, perimeter constraints and number-riddles — every one of them a translation exercise: name the unknown, write the sentence, undo, check both conditions. Banking prelims run the same shapes in the quantitative section\u2019s opening row, where the marks live. CTET and state TETs ask the pedagogy: the balance model before the moves, why "do the same to both sides" beats answer-hunting, and how matchstick patterns mature into letter-sentences (this chapter\u2019s exact arc). Systems of equations, inequalities and transposition formalism are later books\u2019 territory. Shapes cited, none reproduced.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The heap and the restoration — from aha to al-jabr',
          text: 'The first unknowns were heaps. The Egyptian Rhind Mathematical Papyrus (c. 1550 BCE, copied by the scribe Ahmose) catalogs *aha* problems — "aha" means a heap, a quantity — and its problems 24–34 are linear equations in exactly this lesson\u2019s dress: one asks for a quantity whose quarter, added to it, makes 15. The scribe\u2019s method is the balance law wearing period dress: take 4 of the unknown so the quarter joins cleanly — $5x = 60$ — then share into 5, and the heap is 12 ($12 + 3 = 15$ ✓). The subject\u2019s NAME arrived a millennium later in Baghdad, where al-Khwarizmi\u2019s *Al-Jabr* (c. 820 CE) systematised the art; *al-jabr* — the restoring, the reunion of broken parts — became the word **algebra**, and the Latinized *Algoritmi* of his name became **algorithm**. Every balance move in this lesson has an unbroken four-thousand-year pedigree: the pans were level when the papyrus was young, and they are level here.',
        },
        {
          kind: 'formula',
          name: 'The balance law',
          latex: 'a = b \\;\\Rightarrow\\; a + t = b + t, \\;\\; a - t = b - t, \\;\\; a \\times t = b \\times t, \\;\\; a \\div t = b \\div t \\;(t \\neq 0)',
          note: 'Equal quantities stay equal under the same operation — the licence for every legal move; division by zero is refused.',
        },
        {
          kind: 'formula',
          name: 'The undo machine',
          latex: 'ax + b = c \\qquad \\Rightarrow \\qquad x = \\frac{c - b}{a}',
          note: 'Undo the LAST operation first: subtract $b$ from both sides, then share into $a$. The riddle: $3x + 1 = 31$ gives $x = (31 - 1)/3 = 10$.',
        },
        {
          kind: 'formula',
          name: 'The two-piece split',
          latex: 'x + (x + k) = m \\qquad \\Rightarrow \\qquad x = \\frac{m - k}{2}, \\;\\; x + k = \\frac{m + k}{2}',
          note: 'Total $m$, one piece $k$ more than the other: short $(m - k)/2$, long $(m + k)/2$ — the ribbon\u2019s 47 and 11 give 18 and 29.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Equation',
              def: 'A sentence asserting that two expressions name the same number, written with an equals sign — $3x + 1 = 31$ — true for exactly the values that make the two names agree.',
            },
            {
              term: 'Variable (unknown)',
              def: 'The letter holding the unknown\u2019s place in an equation — a number we do not know yet, named so it can be reasoned about.',
            },
            {
              term: 'Solution',
              def: 'A value of the variable that makes the equation true; solving means finding every solution, and each one is proven by substituting it back.',
            },
            {
              term: 'Balance law',
              def: 'Equal quantities stay equal under the same $+$, $-$, $\\times$ or $\\div$ applied to both sides (division by zero refused) — the licence for every legal move.',
            },
            {
              term: 'Undo machine',
              def: 'The two-step solve: $ax + b = c$ gives $x = (c - b)/a$ — the last operation leaves first, then the first; certified by a 1,920-case sweep.',
            },
            {
              term: 'Collecting',
              def: 'Combining copies of the letter before balancing: $x + 4x = 5x$, $x + (x + 11) = 2x + 11$ — count the copies, then balance.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The solution of $x + 7 = 12$ is',
              options: ['5', '7', '12', '19'],
              answer: 0,
              explain:
                'Subtract 7 from both sides: $x = 5$, and $5 + 7 = 12$ ✓ (Option 1). Options 2 and 3 are the sentence\u2019s own numbers; Option 4 ADDED the 7 instead of undoing it.',
            },
            {
              q: 'The solution of $3x + 1 = 31$ is',
              options: ['9', '10', '11', '30'],
              answer: 1,
              explain:
                'The undo machine: $3x = 30$, so $x = 10$; the check $3 \\times 10 + 1 = 31$ ✓ (Option 2). Option 1 gives 28, Option 3 gives 34, Option 4 is the subtract-reflex wearing the answer\u2019s clothes.',
            },
            {
              q: 'The FIRST move on $3x + 1 = 31$ should be',
              options: [
                'divide both sides by 3',
                'subtract 1 from both sides',
                'add 1 to both sides',
                'multiply both sides by 3',
              ],
              answer: 1,
              explain:
                'Undo the LAST operation first: the "$+ 1$" was applied last, so it leaves first (Option 2). Dividing first would scramble $3x + 1$ — the $b$ is not part of the product; adding or multiplying moves the wrong way.',
            },
            {
              q: 'The solution of $5x = 45$ is',
              options: ['9', '8', '40', '50'],
              answer: 0,
              explain:
                'Share both sides into 5: $x = 45/5 = 9$; the check $5 \\times 9 = 45$ ✓ (Option 1). Option 2 gives 40; Options 3 and 4 are the add-subtract reflexes — the machine shares, it does not shift.',
            },
            {
              q: 'A ribbon 47 cm long is cut into two pieces, one 11 cm longer than the other. The SHORT piece measures',
              options: ['18 cm', '29 cm', '36 cm', '24 cm'],
              answer: 0,
              explain:
                'The split: short $(47 - 11)/2 = 18$ (Option 1), long 29 — sum 47 ✓, difference 11 ✓. Option 2 is the LONG piece; Option 3 is $47 - 11$ unhalved; Option 4 is the even-split reflex ignoring the 11.',
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
                  q: 'Solve $x + 7 = 12$, and prove the solution.',
                  solution: [
                    'Now, the balance law\u2019s subtraction: take 7 from BOTH sides — $x = 12 - 7 = 5$.',
                    'So the proof by substitution: $5 + 7 = 12$ ✓ — the sentence is true with $x = 5$.',
                    'And the reading: the equation said "a number plus 7 is 12"; the number was 5 all along.',
                    'Hence $x = 5$, proven.',
                  ],
                  answer: 'x = 5',
                },
                {
                  q: 'Solve $x/4 = 7$, and prove the solution.',
                  solution: [
                    'Now, the "$\\div 4$" leaves by the balance law\u2019s multiplication: multiply BOTH sides by 4 — $x = 28$.',
                    'So the proof: $28/4 = 7$ ✓.',
                    'And the reading: a quarter of the number is 7, so the number is four quarters — four sevens.',
                    'Hence $x = 28$, proven.',
                  ],
                  answer: 'x = 28',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Solve $5x = 45$; then solve $2b + 3 = 17$ (Meera is 17, three more than twice her brother\u2019s age).',
                  solution: [
                    'Now, the first: share both sides into 5 — $x = 9$ (check: $5 \\times 9 = 45$ ✓).',
                    'So the second: undo the LAST operation first — subtract 3: $2b = 14$; then share into 2: $b = 7$.',
                    'And the check: $2 \\times 7 + 3 = 17$ ✓ — Meera\u2019s brother is 7.',
                    'Hence $x = 9$ and $b = 7$, each proven by substitution.',
                  ],
                  answer: 'x = 9; b = 7',
                },
                {
                  q: 'The matchstick sentence of 11.1 and 11.2: $3n + 1 = 31$. What does $n$ mean here, and what is its value?',
                  solution: [
                    'Now, the reading: $n$ counts the squares in the row, and $3n + 1$ is their stick count — the sentence asks which row uses exactly 31 sticks.',
                    'So the machine: subtract 1 — $3n = 30$; share into 3 — $n = 10$.',
                    'And the check: $3 \\times 10 + 1 = 31$ ✓ — the very figure 11.1 counted square by square.',
                    'Hence $n = 10$: the same arithmetic 11.2 read backwards, now wearing the equation\u2019s name.',
                  ],
                  answer: 'n counts the squares; n = 10',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Solve $4(x + 3) = 20$.',
                  solution: [
                    'Now, the order: the "$+ 3$" acted first, the "$\\times 4$" last — so the "$\\times 4$" leaves FIRST.',
                    'So share both sides into 4: $x + 3 = 5$.',
                    'And undo the "$+ 3$": $x = 2$ — the check: $4 \\times (2 + 3) = 20$ ✓.',
                    'Hence $x = 2$, proven.',
                  ],
                  answer: 'x = 2',
                },
                {
                  q: 'A ribbon 47 cm long is cut into two pieces, one 11 cm longer than the other. Find both pieces and check both conditions.',
                  solution: [
                    'Now, name the unknown: short piece $x$, long piece $x + 11$ — the sentence: $x + (x + 11) = 47$.',
                    'So collect: $2x + 11 = 47$; undo: $2x = 36$, then $x = 18$.',
                    'And both conditions: $18 + 29 = 47$ ✓ (the whole ribbon) and $29 - 18 = 11$ ✓ (the promise about the longer piece).',
                    'Hence the pieces are 18 cm and 29 cm — both conditions checked, the proof complete.',
                  ],
                  answer: '18 cm and 29 cm',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A rectangle\u2019s length is twice its width and its perimeter is 36. Find the sides.',
                  solution: [
                    'Now, name the unknown: width $x$, length $2x$ — the perimeter sentence: $x + 2x + x + 2x = 36$.',
                    'So collect the four copies: $6x = 36$; share into 6: $x = 6$.',
                    'And both conditions: the perimeter $6 + 12 + 6 + 12 = 36$ ✓ and the length $12 = 2 \\times 6$ ✓.',
                    'Hence the rectangle is 6 by 12, proven twice.',
                  ],
                  answer: 'width 6, length 12',
                },
                {
                  q: 'Two ropes together span 30 m, and one is 6 m longer than the other. Find the lengths — then state the general split for a total of $m$ and a difference of $k$.',
                  solution: [
                    'Now, name the unknown: short rope $x$, long rope $x + 6$ — the sentence: $x + (x + 6) = 30$.',
                    'So collect and undo: $2x + 6 = 30$, then $2x = 24$, then $x = 12$ — the ropes are 12 m and 18 m (sum 30 ✓, difference 6 ✓).',
                    'And the general dress: $x + (x + k) = m$ collects to $2x + k = m$, so $x = (m - k)/2$ and $x + k = (m + k)/2$.',
                    'Hence 12 m and 18 m — and the split formula holds for every total and difference (swept in the chapter\u2019s script).',
                  ],
                  answer: '12 m and 18 m; x = (m − k)/2',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'A father is four times as old as his son, and together their ages make 50. Find both ages.',
                  solution: [
                    'Now, name the unknown: the son\u2019s age is $x$; the father\u2019s is $4x$.',
                    'So the sentence: $x + 4x = 50$ — collect the five copies: $5x = 50$.',
                    'And the machine: share into 5 — $x = 10$; the ages are 10 and 40.',
                    'Hence son 10, father 40, with both conditions checked: $10 + 40 = 50$ ✓ and $40 = 4 \\times 10$ ✓.',
                  ],
                  answer: 'son 10, father 40',
                },
                {
                  q: 'Translate and solve: "I think of a number, double it, add 9, and I get 35."',
                  solution: [
                    'Now, name the unknown: the number is $x$ — doubling gives $2x$, adding 9 gives $2x + 9$.',
                    'So the sentence: $2x + 9 = 35$.',
                    'And the machine: subtract 9 — $2x = 26$; share into 2 — $x = 13$; the check: $2 \\times 13 + 9 = 35$ ✓.',
                    'Hence the number is 13, proven by substitution.',
                  ],
                  answer: '13',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the balance law from the meaning of equality, and justify every move of the walk $3x + 1 = 31 \\to x = 10$.',
                  solution: [
                    'Now, the meaning: $a = b$ says the two names name ONE number — so the same operation applied through either name gives the same result: $a + t = b + t$, $a - t = b - t$, $a \\times t = b \\times t$, $a \\div t = b \\div t$ (sharing into zero pans is refused — $\\div 0$ has no meaning to preserve).',
                    'So the walk: $3x + 1 = 31$; subtract 1 from both sides (the law\u2019s subtraction) — $3x = 30$; share both sides into 3 (the law\u2019s division, 3 ≠ 0) — $x = 10$.',
                    'And the proof closes by substitution: $3 \\times 10 + 1 = 31$ ✓ — every move legal, the solution proven.',
                    'Hence the balance law from equality\u2019s meaning alone — no axiom system invoked, just the one idea that equal names bear equal deeds.',
                  ],
                  answer: 'The four invariances + the ÷0 refusal; the walk lands on x = 10',
                },
                {
                  q: 'Prove the undo machine $x = (c - b)/a$ for $ax + b = c$, certify it with the sweep, and show why the wrong order fails on the riddle\u2019s sentence.',
                  solution: [
                    'Now, the proof: from $ax + b = c$, the balance law\u2019s subtraction gives $ax = c - b$; its division (a ≠ 0) gives $x = (c - b)/a$ — two legal moves, the last operation out first.',
                    'So the sweep certificate: for $a = 2..9$, $b = 1..12$ and hidden $x = 1..20$, build $c = ax + b$ and recover $(c - b)/a$ — 1,920 cases, every hidden number home (verify script, section AB).',
                    'And the wrong order exposed: dividing $3x + 1 = 31$ by 3 first gives $x + 1/3 = 31/3$ — a TRUE sentence, but not about $x$ alone; the $+ 1$ never got its legal exit, and the machine jams.',
                    'Hence the undo machine — proved, swept, and the order forced: last out first, then the check proves it.',
                  ],
                  answer: 'x = (c − b)/a; 1,920 cases; the wrong order scrambles the sentence',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
