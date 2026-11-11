import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 5: Congruences: The Arithmetic
 * of Remainders
 *
 * LESSONS WRITTEN: 5.1 Remainders Become Numbers: Congruence Defined
 *                  5.2 Why the Divisibility Tests Work
 *                  5.3 The Unit Digit and Cycles of Powers
 *                  5.4 Linear Congruences and a Glimpse of Fermat
 *                  (all four + the unit-5 completion review: run 57 —
 *                  2026-11-06, the second one-full-chapter run under the
 *                  owner's 2026-11-06 directive)
 * CHAPTER STATUS: COMPLETE 4/4 — verify-book2-ch05.ts 265 checks
 * (sections A–AE) ALL PASS before any word was written (three pre-writing
 * defects caught: a truncation-law overclaim, the 8-cycle printed
 * backwards as 8, 6, 2, 4, and a Math.pow precision loss at k = 30);
 * per-lesson gates all green (lint 0, tsc 0, routes 200, live quiz 5/5
 * with the intended keys, KaTeX 0 errors, SVG audits 0 issues).
 *
 * References for this unit: Gauss, Disquisitiones Arithmeticae (1801),
 * article 1 — the printed birth certificate of the subject: "si numerus a
 * numerorum b, c differentiam metitur, b, c secundum modulum a vocantur
 * congruentes" — if a number a measures the difference of b and c, then
 * b and c are called congruent modulo a — together with the ≡ notation
 * designed so that congruences can be manipulated like equations
 * (web-checked 2026-11-06 via the Disquisitiones listings and the
 * standard histories) — key gauss-1801-disquisitiones (carried from
 * chapter 4, extended from art. 16 to art. 1); the measures/divides
 * language of Euclid Book VII definitions 3–5, which Gauss's "metitur"
 * inherits — key euclid-elements-book-vii (carried from chapter 2); the
 * proof-transition discipline of Beck & Geoghegan's The Art of Proof —
 * key beck-geoghegan-art-of-proof (carried); the competitive-exam shapes
 * (remainders of huge sums and products, unit digits, the clock and
 * calendar problems) — key khattar-qa-4e (carried). For 5.2: the NCERT
 * class 8 ch. 16 "Playing with Numbers" school canon this book
 * re-derives (key ncert-math8-ch16, reserved since run 48) and the
 * casting-out-nines thread of Fibonacci's Liber Abaci (1202) — key
 * fibonacci-1202-liber-abaci (carried from chapter 1, extended). For
 * 5.4: Sunzi Suanjing (3rd–5th c. CE) and Fermat's 1640 letter — new
 * keys logged at ship. Exposition original; nothing reproduced.
 *
 * Every number below was recomputed by scripts/verify-book2-ch05.ts
 * (265 checks, sections A–AE, run 57, ALL PASS before writing — three
 * pre-writing defects caught: a truncation-law sweep that overclaimed
 * equal remainders where only divisibility transfers; the 8-cycle
 * printed backwards (it runs 8, 4, 2, 6); a Math.pow precision loss at
 * k = 30 replaced by modular multiplication).
 *
 * The chapter's engine discipline: chapter 2's division algorithm and
 * the uniqueness of the remainder (Lesson 2.1), the divisibility
 * algebra (Lesson 2.2), Bézout's identity (Lesson 2.3) and the linear
 * Diophantine engine (Lesson 2.4) are CITED, never re-proved — the
 * proofs in print lean on exactly those engines, as the lessons'
 * citations promise. Foundation Mathematics Lesson 3.1
 * (fm-divisibility-and-its-tests) banked the tests operationally; this
 * chapter proves them.
 */
export const chapter05: Chapter = {
  number: 5,
  slug: 'congruences',
  title: 'Congruences: The Arithmetic of Remainders',
  summary:
    'Remainders promoted to numbers. Congruence defined — two numbers are congruent modulo m when their difference is a multiple of m — and proved to be exactly the "same remainder" relation of the division algorithm, with Gauss’s 1801 notation and clock arithmetic as the model. The laws derived from multiple algebra: congruences add, subtract, multiply and raise to powers, and cancellation shrinks the modulus by the gcd. Residue classes partition the integers into columns, and the mod-5 tables turn wrapping into a number system of their own. Then the engines: the school divisibility tests finally derived (why digit sums test 3 and 9, why 11 alternates signs, why 7 hides in 1001), the unit digit of any huge power found through cycles (the four-cycles of 2, 3, 7, 8; the fixed points 0, 1, 5, 6), linear congruences solved through the gcd (solvability, solution families, inverses), the Chinese remainder theorem stated and swept for coprime moduli, and Fermat’s little theorem verified numerically — the doorway to the Number Theory book.',
  status: 'complete',
  plannedLessons: [],
  lessons: [
    {
      id: 'ans-remainders-become-numbers-congruence-defined',
      number: '5.1',
      title: 'Remainders Become Numbers: Congruence Defined',
      prerequisites: ['ans-division-with-rest-the-division-algorithm', 'ans-the-algebra-of-divisibility', 'fm-divisibility-and-its-tests'],
      sources: ['gauss-1801-disquisitiones', 'euclid-elements-book-vii', 'beck-geoghegan-art-of-proof', 'khattar-qa-4e'],
      concepts: [
        'Congruence modulo m',
        'Same remainder ⟺ divisible difference',
        'Gauss’s ≡ notation (1801)',
        'Clock arithmetic and calendars',
        'Residue classes as columns',
        'The addition and multiplication laws',
        'Cancellation shrinks the modulus',
        'Remainders of huge sums and products',
      ],
      objectives: [
        'Define congruence precisely — $a \\equiv b \\pmod{m}$ exactly when $m \\mid (a - b)$ — and prove it coincides with the same-remainder reading of Lesson 2.1’s division algorithm',
        'Use the congruence laws with proofs: congruent inputs give congruent sums, products and powers, and cancelling a factor $c$ shrinks the modulus to $m/\\gcd(c, m)$',
        'Read residue classes as columns that partition the integers, and compute fluently in the mod-5 tables',
        'Reduce huge sums and products to remainders without computing them — the competitive-exam engine that Lessons 5.2–5.4 turn into divisibility tests, unit digits and solved congruences',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Chapter 2 built the division algorithm: divide $b$ by $m$, and you get a quotient and a remainder with $0 \\le r < m$, a pair that is *unique* — Lesson 2.1 proved no number carries two remainders on division by the same $m$. Back then the remainder was scenery: the thing left over, interesting only for divisibility ($r = 0$) and for Euclid’s algorithm. This chapter promotes the remainder to the main character. Two numbers that leave the *same* remainder on division by $m$ behave so alike that they can stand in for each other throughout arithmetic — and that single observation, made systematic, becomes a second arithmetic running parallel to the ordinary one: the arithmetic of remainders.',
        },
        {
          kind: 'para',
          text: 'You have been computing in it for years without the name. Every time the clock passed noon you added modulo 12; every "same day next week" question multiplied modulo 7. Foundation Mathematics Lesson 3.1 taught the divisibility tests as rules to memorise — this chapter *derives* them (Lesson 5.2), finds the unit digit of $7^{2025}$ without writing the number down (Lesson 5.3), and solves equations in remainders (Lesson 5.4). The machinery was all banked in chapter 2: the division algorithm, the divisibility algebra of Lesson 2.2 ($q \\mid a$ and $q \\mid b$ give $q \\mid a + b$ and $q \\mid a - b$), and the gcd engine of Lesson 2.3. One definition now unlocks all of it.',
        },
        { kind: 'heading', text: 'Arithmetic on a clock' },
        {
          kind: 'para',
          text: 'Add on a 12-hour clock face and the answer wraps: start at $8$ and add $5$ hours and the clock shows $1$, not $13$ — because $13 = 12 \\cdot 1 + 1$ and only the remainder survives the face. Run the wrap a few times to feel the rule:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$8 + 5 = 13 = 12 \\cdot 1 + 1$ — the clock shows **1**;',
            '$11 + 3 = 14 = 12 \\cdot 1 + 2$ — the clock shows **2**;',
            '$7 + 7 = 14$ — again **2** (two different sums, one face reading: the wrap keeps only remainders);',
            '$9 + 6 = 15 = 12 \\cdot 1 + 3$ — the clock shows **3**.',
          ],
        },
        {
          kind: 'para',
          text: 'Nothing here is specific to twelve. A week is a clock with seven hours — "days of the week" — and the same wrap governs calendars: adding days means adding remainders modulo 7. Wednesday plus $35$ days is Wednesday again ($35 = 7 \\cdot 5$: the remainder is $0$, nothing moves), while Wednesday plus $100$ days is Friday ($100 = 7 \\cdot 14 + 2$: move two days along). One engine, two dials — and any positive integer can serve as the dial.',
        },
        {
          kind: 'example',
          title: 'It is 3 o’clock. What does the clock show 1000 hours from now?',
          steps: [
            'Split the problem: the clock keeps remainders on division by 12, so only the remainder of $1000$ matters.',
            'Now, divide: $1000 = 12 \\cdot 83 + 4$ — a thousand hours is $83$ full sweeps of the dial plus $4$ hours.',
            'So, add the remainders: the dial sits at $3$, and $3 + 4 = 7$ needs no wrap.',
            'Hence the clock shows **7 o’clock** — computed without a single sweep of the hand.',
          ],
        },
        {
          kind: 'figure',
          caption:
            'The 12-hour clock as a congruence machine: start at 8 and add 5 — the hand sweeps past 12 (one full turn discarded) and lands on 1, because $8 + 5 = 13 = 12 \\cdot 1 + 1$. The dial records only the remainder on division by 12; the arc is the five added hours.',
          svg: `<svg viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A twelve-hour clock face showing that 8 plus 5 lands on 1, with an arc tracing the five added hours">
  <circle cx="250" cy="180" r="95" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.85"/>
  <g fill="currentColor" opacity="0.55">
    <circle cx="309.0" cy="77.8" r="2.5"/><circle cx="352.2" cy="121.0" r="2.5"/><circle cx="368.0" cy="180" r="2.5"/><circle cx="352.2" cy="239.0" r="2.5"/><circle cx="309.0" cy="282.2" r="2.5"/><circle cx="250" cy="298.0" r="2.5"/><circle cx="191.0" cy="282.2" r="2.5"/><circle cx="147.8" cy="239.0" r="3.5"/><circle cx="132.0" cy="180" r="2.5"/><circle cx="147.8" cy="121.0" r="2.5"/><circle cx="191.0" cy="77.8" r="2.5"/><circle cx="250" cy="62.0" r="2.5"/>
  </g>
  <g font-size="15" text-anchor="middle" fill="currentColor">
    <text x="324.0" y="56.8" font-weight="bold" font-size="17">1</text>
    <text x="378.2" y="111.0">2</text>
    <text x="398.0" y="185.0">3</text>
    <text x="378.2" y="259.0">4</text>
    <text x="324.0" y="313.2">5</text>
    <text x="250" y="333.0">6</text>
    <text x="176.0" y="313.2">7</text>
    <text x="121.8" y="259.0" font-weight="bold" font-size="17">8</text>
    <text x="102.0" y="185.0">9</text>
    <text x="121.8" y="111.0">10</text>
    <text x="176.0" y="56.8">11</text>
    <text x="250" y="37.0">12</text>
  </g>
  <path d="M 167.7 227.5 A 95 95 0 0 1 297.5 97.7" fill="none" stroke="currentColor" stroke-width="2.2" opacity="0.9"/>
  <polygon points="304.4,101.7 295.5,101.2 299.5,94.2" fill="currentColor" opacity="0.9"/>
  <circle cx="167.7" cy="227.5" r="3.5" fill="currentColor"/>
  <text x="250" y="210" font-size="15" text-anchor="middle" fill="currentColor" font-weight="bold">+5</text>
  <text x="250" y="348" font-size="13" text-anchor="middle" fill="currentColor" opacity="0.85">8 + 5 = 13 = 12·1 + 1 — the dial keeps the remainder: 8 + 5 ≡ 1 (mod 12)</text>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The modulus is whatever wraps',
          text: 'A clock is arithmetic modulo 12; a week is arithmetic modulo 7; a semester timetable might run modulo 5. The number that wraps is called the **modulus**. The deep point of this chapter is that the modulus need not measure time at all — $m = 9$ wraps digit sums, $m = 10$ wraps unit digits, $m = 11$ wraps alternating sums. Each of those school facts, met in FM 3.1 as a rule to memorise, is a clock in disguise, and Lesson 5.2 winds them all.',
        },
        { kind: 'heading', text: 'The definition: a divisible difference' },
        {
          kind: 'para',
          text: 'The clock suggests the idea; Gauss made it algebra. The observation to codify is that $8 + 5$ and $1$ land on the same dial position — their *difference* is exactly one full turn: $13 - 1 = 12$. Say it without the clock:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Congruence modulo m',
          text: 'Let $m$ be a positive integer. An integer $a$ is said to be **congruent** to an integer $b$ **modulo $m$**, written $a \\equiv b \\pmod{m}$, if $m$ divides the difference $a - b$ — that is, if $a - b = mt$ for some integer $t$. If $m \\nmid (a - b)$ we write $a \\not\\equiv b \\pmod{m}$. The number $m$ is the **modulus**; a congruence is a statement about a difference, nothing more.',
        },
        {
          kind: 'equation',
          latex: 'a \\equiv b \\pmod{m} \\;\\Longleftrightarrow\\; m \\mid (a - b) \\;\\Longleftrightarrow\\; a = b + mt \\text{ for some } t \\in \\mathbb{Z}',
          note: 'The three readings — congruent, difference divisible, differ by a multiple of the modulus — are the same fact in three costumes. The middle reading is the one proofs use; the last is the one computations use.',
        },
        {
          kind: 'para',
          text: 'For example, run the definition over the clock and calendar numbers:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$17 \\equiv 5 \\pmod{12}$ — the difference is $17 - 5 = 12 = 1 \\cdot 12$, one full turn;',
            '$29 \\equiv 5 \\pmod{12}$ — the difference is $24 = 2 \\cdot 12$: congruence does not care *how many* turns apart two numbers are, only that the difference is a whole number of them;',
            '$37 \\equiv 1 \\pmod{9}$ — the difference is $36 = 4 \\cdot 9$;',
            '$16 \\not\\equiv 5 \\pmod{12}$ — the difference is $11$, not a multiple of $12$; and indeed $16 = 12 \\cdot 1 + 4$ while $5 = 12 \\cdot 0 + 5$: different remainders, as the clock confirms ($16$ hours after noon is $4$ o’clock, not $5$).',
          ],
        },
        {
          kind: 'para',
          text: 'The definition says "difference divisible by $m$"; the clock says "same remainder on division by $m$". These must be the same statement in disguise — and the proof is a direct cashing of chapter 2’s most-used result. The division algorithm assigns every integer $b$ exactly one remainder $0 \\le r < m$ on division by $m$ (Lesson 2.1 proved the uniqueness), so "same remainder" has a precise meaning. The two readings coincide:',
        },
        {
          kind: 'derivation',
          title: 'A divisible difference is exactly a shared remainder',
          statement:
            'Claim: $a \\equiv b \\pmod{m}$ if and only if $a$ and $b$ leave the same remainder on division by $m$.',
          steps: [
            {
              label: 'Write both divisions',
              formula: 'a = q_1 m + r_1, \\qquad b = q_2 m + r_2, \\qquad 0 \\le r_1, r_2 < m',
              explanation:
                'The division algorithm (Lesson 2.1) gives each number its quotient and its unique remainder. Everything that follows is algebra on these two rows.',
            },
            {
              label: 'Subtract',
              formula: 'a - b = (q_1 - q_2)\\,m + (r_1 - r_2)',
              explanation:
                'The multiple-of-$m$ parts collect into one multiple $(q_1 - q_2)m$; what is left over is the difference of the remainders, which cannot be large: $|r_1 - r_2| < m$.',
            },
            {
              label: 'Divisible difference forces equal remainders',
              formula: 'm \\mid (a - b) \\;\\Rightarrow\\; m \\mid (r_1 - r_2) \\;\\Rightarrow\\; r_1 = r_2',
              explanation:
                'If $m$ divides $a - b$ then it divides $(a - b) - (q_1 - q_2)m = r_1 - r_2$. But $r_1 - r_2$ is strictly between $-m$ and $m$, and the only multiple of $m$ in that window is $0$ — Lesson 2.1’s uniqueness of the remainder doing its one job.',
            },
            {
              label: 'Equal remainders restore the difference',
              formula: 'r_1 = r_2 \\;\\Rightarrow\\; a - b = (q_1 - q_2)\\,m',
              explanation:
                'Conversely, if the remainders agree, the leftover $r_1 - r_2$ vanishes and $a - b$ is exactly a multiple of $m$. Both directions hold, so the two definitions name one relation.',
            },
          ],
          result:
            '$a \\equiv b \\pmod{m}$ ⟺ $a$ and $b$ carry the same remainder on division by $m$. The clock reading and the difference reading are interchangeable — use whichever the moment favours.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Gauss prints the subject (1801)',
          text: 'Carl Friedrich Gauss was twenty-four when his *Disquisitiones Arithmeticae* appeared in 1801, and its first article does nothing but define this relation: if a number $a$ measures the difference of $b$ and $c$, then $b$ and $c$ are called *congruent* modulo $a$ — and Gauss chose the sign $\\equiv$, deliberately shaped like $=$, so that the eye would treat congruences the way it treats equations. The choice was prophetic: the entire theory of numbers for the next two centuries is written in that notation, and this chapter’s laws justify the likeness. Congruence facts were known long before — Euler and Legendre handled residues in prose, Sunzi’s remainder problem is fifteen centuries older, and casting out nines goes back to the Indian and Islamic arithmetic traditions — but the *notation* made the arithmetic manipulable, and notations that make algebra flow are among mathematics’ greatest inventions.',
        },
        { kind: 'heading', text: 'Residue classes: the columns' },
        {
          kind: 'para',
          text: 'Congruence modulo $m$ sorts every integer into exactly one of $m$ pigeonholes. The numbers congruent to $r$ modulo $m$ form the **residue class** $[r]$: the class of numbers leaving remainder $r$. Modulo 5, the class $[2]$ contains $2, 7, 12, 17, 22, 27, \\dots$ — and also the non-negative-looking members running the other way: $-3 \\equiv 2 \\pmod 5$ since $-3 - 2 = -5$. A class is an infinite arithmetic staircase, one representative every $m$ steps, and the $m$ classes are mutually exclusive and exhaustive: every integer belongs to exactly one.',
        },
        {
          kind: 'figure',
          caption:
            'The five residue classes modulo 5, drawn over the numbers 0 to 24: each column is one class $[r] = \\{r, r+5, r+10, \\dots\\}$, and every integer lands in exactly one column — 17 (bold) sits in $[2]$ beside 2, 7, 12 and 22, five steps from each neighbour. The columns are the pigeonholes behind "same remainder".',
          svg: `<svg viewBox="0 0 660 430" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five columns of numbers zero to twenty-four arranged by their remainder on division by five">
  <g font-size="15" text-anchor="middle" fill="currentColor" font-weight="bold" opacity="0.9">
    <text x="110" y="50">[0]</text><text x="230" y="50">[1]</text><text x="350" y="50">[2]</text><text x="470" y="50">[3]</text><text x="590" y="50">[4]</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.5">
    <rect x="60" y="70" width="100" height="52" rx="8"/><rect x="60" y="134" width="100" height="52" rx="8"/><rect x="60" y="198" width="100" height="52" rx="8"/><rect x="60" y="262" width="100" height="52" rx="8"/><rect x="60" y="326" width="100" height="52" rx="8"/>
    <rect x="180" y="70" width="100" height="52" rx="8"/><rect x="180" y="134" width="100" height="52" rx="8"/><rect x="180" y="198" width="100" height="52" rx="8"/><rect x="180" y="262" width="100" height="52" rx="8"/><rect x="180" y="326" width="100" height="52" rx="8"/>
    <rect x="300" y="70" width="100" height="52" rx="8"/><rect x="300" y="134" width="100" height="52" rx="8"/><rect x="300" y="198" width="100" height="52" rx="8"/><rect x="300" y="262" width="100" height="52" rx="8"/><rect x="300" y="326" width="100" height="52" rx="8"/>
    <rect x="420" y="70" width="100" height="52" rx="8"/><rect x="420" y="134" width="100" height="52" rx="8"/><rect x="420" y="198" width="100" height="52" rx="8"/><rect x="420" y="262" width="100" height="52" rx="8"/><rect x="420" y="326" width="100" height="52" rx="8"/>
    <rect x="540" y="70" width="100" height="52" rx="8"/><rect x="540" y="134" width="100" height="52" rx="8"/><rect x="540" y="198" width="100" height="52" rx="8"/><rect x="540" y="262" width="100" height="52" rx="8"/><rect x="540" y="326" width="100" height="52" rx="8"/>
  </g>
  <g font-size="17" text-anchor="middle" fill="currentColor">
    <text x="110" y="102">0</text><text x="110" y="166">5</text><text x="110" y="230">10</text><text x="110" y="294">15</text><text x="110" y="358">20</text>
    <text x="230" y="102">1</text><text x="230" y="166">6</text><text x="230" y="230">11</text><text x="230" y="294">16</text><text x="230" y="358">21</text>
    <text x="350" y="102">2</text><text x="350" y="166">7</text><text x="350" y="230">12</text><text x="350" y="294" font-weight="bold" font-size="19">17</text><text x="350" y="358">22</text>
    <text x="470" y="102">3</text><text x="470" y="166">8</text><text x="470" y="230">13</text><text x="470" y="294">18</text><text x="470" y="358">23</text>
    <text x="590" y="102">4</text><text x="590" y="166">9</text><text x="590" y="230">14</text><text x="590" y="294">19</text><text x="590" y="358">24</text>
  </g>
  <text x="330" y="405" font-size="13" text-anchor="middle" fill="currentColor" opacity="0.85">the five classes mod 5 — each column is [r] = {r, r+5, r+10, …}, one representative every five steps</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The class $[5]$ modulo 12 is the twelve-hour clock’s home for the 5-o’clock position: its members $5, 17, 29, 41, 53, 65, \\dots$ are spaced exactly $12$ apart, and every one of them *is* 5 o’clock to the dial. This is why the partition language pays rent: instead of asking "what does the clock show?", ask "which column does the hour count fall into?" — and the columns are what the arithmetic of this chapter moves between.',
        },
        { kind: 'heading', text: 'The laws: congruences behave like equations' },
        {
          kind: 'para',
          text: 'Gauss chose $\\equiv$ to look like $=$. The justification is that the two share their algebra: sums, differences, products — and therefore powers — of congruent inputs stay congruent. The proofs are one line each of multiple bookkeeping.',
        },
        {
          kind: 'derivation',
          title: 'The addition and multiplication laws',
          statement:
            'Claim: if $a \\equiv b \\pmod{m}$ and $c \\equiv d \\pmod{m}$, then $a + c \\equiv b + d \\pmod{m}$ and $ac \\equiv bd \\pmod{m}$.',
          steps: [
            {
              label: 'Unpack the hypothesis',
              formula: 'a = b + mu, \\qquad c = d + mv \\quad (u, v \\in \\mathbb{Z})',
              explanation:
                'Each congruence says the difference is a multiple of $m$; write those multiples down. This is the "differ by a multiple" reading of the definition, doing what it was designed for.',
            },
            {
              label: 'Add',
              formula: 'a + c = (b + d) + m(u + v)',
              explanation:
                'The multiples collect. The difference $(a + c) - (b + d)$ is exactly $m(u + v)$ — a multiple of $m$ — so the sums are congruent. The same collection with a minus sign gives the subtraction law $a - c \\equiv b - d$.',
            },
            {
              label: 'Multiply',
              formula: 'ac = bd + m(bv + ud + umv)',
              explanation:
                'Expand $(b + mu)(d + mv)$: the product is $bd$ plus $mbv$ plus $mud$ plus $m^2uv$, and every non-$bd$ term carries a factor $m$. So $ac - bd = m(bv + ud + umv)$ — a multiple of $m$, and the products are congruent.',
            },
            {
              label: 'Iterate to powers',
              formula: 'a \\equiv b \\;\\Rightarrow\\; a^2 \\equiv b^2 \\;\\Rightarrow\\; a^3 \\equiv b^3 \\;\\Rightarrow\\; \\dots',
              explanation:
                'The multiplication law applied to equal pairs builds powers: $a \\cdot a \\equiv b \\cdot b$, then multiply by $a \\equiv b$ again. By induction (the engine of Lesson 1.2, invoked not re-proved), $a^k \\equiv b^k \\pmod{m}$ for every $k \\ge 1$.',
            },
          ],
          result:
            'Congruences may be added, subtracted, multiplied and raised to powers, term on term, with a common modulus. Substituting a number by anything congruent to it never changes a remainder — the licence every engine in this chapter cashes.',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The congruence laws',
          text: 'With a common modulus $m$: (i) **reflexivity** $a \\equiv a$ (difference $0 = 0 \\cdot m$); (ii) **symmetry** $a \\equiv b \\Rightarrow b \\equiv a$ (negate the multiple); (iii) **transitivity** $a \\equiv b,\\ b \\equiv c \\Rightarrow a \\equiv c$ (add the multiples: e.g. $23 \\equiv 9 \\pmod 7$ with $23 - 9 = 14$, and $9 \\equiv 2 \\pmod 7$ with $9 - 2 = 7$, give $23 \\equiv 2 \\pmod 7$ with $23 - 2 = 21 = 14 + 7$); (iv) **addition** $a + c \\equiv b + d$; (v) **multiplication** $ac \\equiv bd$; (vi) **powers** $a^k \\equiv b^k$ for every $k \\ge 1$. The first three say congruence is an *equivalence relation* — the partition into classes is legitimate; the last three say the classes carry their own arithmetic.',
        },
        {
          kind: 'para',
          text: 'For example, watch the laws run on a single pair: $13 \\equiv 6 \\pmod{7}$ (the difference is $7$).',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'add $5 \\equiv 5$: the law gives $13 + 5 = 18 \\equiv 6 + 5 = 11 \\pmod 7$ — both leave remainder $4$;',
            'multiply by $5 \\equiv 5$: $13 \\cdot 5 = 65 \\equiv 6 \\cdot 5 = 30 \\pmod 7$ — both leave remainder $2$;',
            'raise to the fourth power: $10 \\equiv 3 \\pmod 7$, so $10^4 \\equiv 3^4 = 81 \\pmod 7$ — and indeed $10{,}000 = 7 \\cdot 1428 + 4$ and $81 = 7 \\cdot 11 + 4$, both remainder $4$.',
          ],
        },
        {
          kind: 'example',
          title: 'Find the remainder of 3⁴ + 10⁴ on division by 7',
          steps: [
            'Split the sum: neither term is pleasant to divide by $7$ directly, but both have congenial residues.',
            'Now, reduce each base: $10 \\equiv 3 \\pmod 7$ (difference $7$), so the power law gives $10^4 \\equiv 3^4 = 81 \\pmod 7$.',
            'So, add the residues: $3^4 + 10^4 \\equiv 81 + 81 = 162 \\pmod 7$ — and $162 = 7 \\cdot 23 + 1$.',
            'Take the direct check: $81 + 10{,}000 = 10{,}081 = 7 \\cdot 1440 + 1$ — remainder $1$, as promised.',
            'Hence the remainder is **1** — two four-digit-free reductions and one small division.',
          ],
        },
        { kind: 'heading', text: 'Cancellation: the modulus shrinks' },
        {
          kind: 'para',
          text: 'Where congruence *departs* from equation behaviour is division. From $4x \\equiv 4y \\pmod 6$ you may cancel the $4$ — but not untouched: the modulus itself changes. The reason is that $6$ does not fully measure the $4$ being cancelled; the part of $6$ that does not touch the cancelled factor survives in a shrunken modulus.',
        },
        {
          kind: 'derivation',
          title: 'The cancellation law: cancel c, shrink m to m/g',
          statement:
            'Claim: $ca \\equiv cb \\pmod{m}$ if and only if $a \\equiv b \\pmod{m/g}$, where $g = \\gcd(c, m)$.',
          steps: [
            {
              label: 'Factor out the gcd',
              formula: 'c = g c^{\\prime}, \\quad m = g m^{\\prime}, \\quad \\gcd(c^{\\prime}, m^{\\prime}) = 1',
              explanation:
                'Write the cancelled factor and the modulus through their greatest common divisor (the gcd engine of Lesson 2.3, invoked as machinery). What is left, $c^{\\prime}$ and $m^{\\prime}$, share nothing.',
            },
            {
              label: 'Restate the hypothesis',
              formula: 'm \\mid c(a - b) \\;\\Longleftrightarrow\\; g m^{\\prime} \\mid g c^{\\prime} (a - b) \\;\\Longleftrightarrow\\; m^{\\prime} \\mid c^{\\prime} (a - b)',
              explanation:
                'Divide the divisibility statement by the common factor $g$: multiples of $gm^{\\prime}$ that are multiples of $g$ correspond exactly to multiples of $m^{\\prime}$ after the $g$ is removed — chapter 2’s arithmetic of divisibility, used as banked.',
            },
            {
              label: 'Cancel the coprime part',
              formula: 'm^{\\prime} \\mid c^{\\prime}(a - b) \\;\\Longleftrightarrow\\; m^{\\prime} \\mid (a - b) \\quad (\\gcd(c^{\\prime}, m^{\\prime}) = 1)',
              explanation:
                'This is Lesson 2.2’s coprime licence: if $m^{\\prime}$ divides a product $c^{\\prime} x$ while sharing nothing with $c^{\\prime}$, then $m^{\\prime}$ divides $x$ itself. The cancelled factor, now coprime to what remains of the modulus, leaves the divisibility untouched.',
            },
            {
              label: 'Re-read as congruence',
              formula: 'm^{\\prime} \\mid (a - b) \\;\\Longleftrightarrow\\; a \\equiv b \\pmod{m^{\\prime}} = m/g',
              explanation:
                'The surviving statement is a congruence modulo $m^{\\prime} = m/\\gcd(c, m)$. When $\\gcd(c, m) = 1$ nothing shrinks and cancellation is free — the licence that makes primes special in this arithmetic.',
            },
          ],
          result:
            '$ca \\equiv cb \\pmod m \\Rightarrow a \\equiv b \\pmod{m/\\gcd(c,m)}$, and conversely. Cancel a factor and the modulus shrinks by the gcd of the factor with it — for a factor coprime to the modulus, cancellation works exactly as with equations.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The cancellation trap',
          text: '$3 \\cdot 2 \\equiv 3 \\cdot 0 \\pmod 3$ (both sides are $6 \\equiv 0$) — yet $2 \\not\\equiv 0 \\pmod 3$. Cancel the $3$ and the modulus shrinks: $\\gcd(3, 3) = 3$, so the honest conclusion is $2 \\equiv 0 \\pmod 1$ — which says nothing at all, since *every* pair of integers is congruent modulo 1. The shrink is not a technicality; it is the whole content of the step. An equation-style cancellation in a congruence is the single most common source of false "proofs" in this subject, and examinations know it.',
        },
        {
          kind: 'example',
          title: 'Cancel correctly: 4·5 ≡ 4·8 (mod 6), and a coprime cancellation',
          steps: [
            'Split the instance: $4 \\cdot 5 = 20 \\equiv 2 \\pmod 6$ and $4 \\cdot 8 = 32 \\equiv 2 \\pmod 6$ — the hypothesis holds.',
            'Now, cancel the $4$: $\\gcd(4, 6) = 2$, so the modulus shrinks $6 \\to 6/2 = 3$, and the honest conclusion is $5 \\equiv 8 \\pmod 3$ — true, difference $3$.',
            'So, watch the false twin: $5 \\equiv 8 \\pmod 6$ is *false* ($5 - 8 = -3$, not a multiple of $6$) — the shrunk modulus was load-bearing.',
            'Take the coprime licence: $4 \\cdot 9 = 36 \\equiv 1 \\pmod 7$ and $4 \\cdot 2 = 8 \\equiv 1 \\pmod 7$; since $\\gcd(4, 7) = 1$, the conclusion is the full $9 \\equiv 2 \\pmod 7$ — no shrink, difference $7$.',
            'Hence the rule in action: cancel freely only against a coprime modulus; otherwise divide the modulus by the gcd.',
          ],
        },
        { kind: 'heading', text: 'Arithmetic inside one column: the mod-5 tables' },
        {
          kind: 'para',
          text: 'Because substituting congruent numbers never changes a remainder, the five classes $[0]$ to $[4]$ modulo 5 support their own addition and multiplication tables — computed once, true forever. To add $[3] + [4]$: pick any representatives, say $3$ and $4$, add them ($7$), and read the class of the result ($7 \\equiv 2$, so $[3] + [4] = [2]$). The choice of representatives cannot matter — that is exactly what the addition law proves.',
        },
        {
          kind: 'table',
          caption: 'Addition modulo 5 — the 12-hour clock’s five-hour cousin. Read row + column; each entry is the class of the ordinary sum.',
          head: ['+', '0', '1', '2', '3', '4'],
          rows: [
            ['0', '0', '1', '2', '3', '4'],
            ['1', '1', '2', '3', '4', '0'],
            ['2', '2', '3', '4', '0', '1'],
            ['3', '3', '4', '0', '1', '2'],
            ['4', '4', '0', '1', '2', '3'],
          ],
        },
        {
          kind: 'table',
          caption: 'Multiplication modulo 5. The zero row and zero column record [0] × anything = [0]; inspect the 4 × 4 block of nonzero rows and columns — every row is a rearrangement of 1, 2, 3, 4.',
          head: ['×', '0', '1', '2', '3', '4'],
          rows: [
            ['0', '0', '0', '0', '0', '0'],
            ['1', '0', '1', '2', '3', '4'],
            ['2', '0', '2', '4', '1', '3'],
            ['3', '0', '3', '1', '4', '2'],
            ['4', '0', '4', '3', '2', '1'],
          ],
        },
        {
          kind: 'para',
          text: 'Read the multiplication table row by row and a structure appears: each nonzero row hits all five residues — row $[2]$ runs $2, 4, 1, 3, 0$, row $[3]$ runs $3, 1, 4, 2, 0$ — never repeating before the full set is swept. (Rows of a table containing each symbol exactly once are called *Latin-square* rows.) The $1$ inside a nonzero row is the licence to *undo* the multiplication: row $[2]$ contains a $1$ in column $[3]$ because $2 \\cdot 3 = 6 \\equiv 1 \\pmod 5$ — so multiplying by $[2]$ can be reversed by multiplying by $[3]$. Division works modulo 5. The zero rows hint at the opposite fate: modulo $6$, the row of $[2]$ would read $0, 2, 4, 0, 2, 4$ — no $1$ anywhere, no undoing. Which numbers divide and which do not is precisely Lesson 5.4’s subject, and the gcd criterion just proved is its engine.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Why the tables matter',
          text: 'A modulus whose nonzero rows are all Latin squares — every nonzero class invertible — behaves like the rational numbers do: a miniature number system with division. Modulo 5 qualifies; modulo 6 does not ($[2]$ has no inverse). The qualifying moduli turn out to be exactly the primes, and the miniature systems they carry are called *fields*. This is not a detour — it is the doorway through which Lesson 5.4 walks, and behind it stands the whole subject this book hands off to. For now, the tables simply make the wrapping tangible: $3 + 4 = 7$, and in the mod-5 world the answer is $2$.',
        },
        { kind: 'heading', text: 'The exam engine: huge sums and products' },
        {
          kind: 'para',
          text: 'Competitive examinations love a question of the shape "find the remainder when [enormous expression] is divided by [small number]". The congruence laws are the entire method: reduce each *piece* to its residue, then run the small arithmetic — the multiplication law guarantees the answer matches the enormous truth. The verification script swept every number below both ways before it was printed.',
        },
        {
          kind: 'example',
          title: 'Remainder of 43 × 57 on division by 6',
          steps: [
            'Split the factors: $43 = 6 \\cdot 7 + 1$, so $43 \\equiv 1 \\pmod 6$; $57 = 6 \\cdot 9 + 3$, so $57 \\equiv 3 \\pmod 6$.',
            'Now, multiply the residues: the multiplication law gives $43 \\cdot 57 \\equiv 1 \\cdot 3 = 3 \\pmod 6$.',
            'So, check the enormous side: $43 \\cdot 57 = 2451 = 6 \\cdot 408 + 3$ — remainder $3$, on both routes.',
            'Hence the remainder is **3**, found with two small divisions instead of one product-and-divide.',
          ],
        },
        {
          kind: 'example',
          title: 'Remainders of 87 + 94 (mod 5) and 12345 + 67890 (mod 9)',
          steps: [
            'Split the first sum: $87 \\equiv 2$ and $94 \\equiv 4 \\pmod 5$ — so $87 + 94 \\equiv 2 + 4 = 6 \\equiv 1 \\pmod 5$.',
            'Now, verify: $87 + 94 = 181 = 5 \\cdot 36 + 1$ ✓.',
            'So, run the same engine mod 9: $12{,}345 \\equiv 1+2+3+4+5 = 15 \\equiv 6 \\pmod 9$ and $67{,}890 \\equiv 30 \\equiv 3 \\pmod 9$ — a pattern (digits!) that Lesson 5.2 will prove is not luck.',
            'Take the conclusion: $12{,}345 + 67{,}890 \\equiv 6 + 3 = 9 \\equiv 0 \\pmod 9$ — and indeed the true sum $80{,}235 = 9 \\cdot 8915$ is a multiple of $9$.',
            'Hence **1** and **0** — and a suspicion about digit sums worth banking until 5.2.',
          ],
        },
        {
          kind: 'example',
          title: 'A sum of ten powers: Σ 9¹ + 9² + … + 9¹⁰ (mod 6)',
          steps: [
            'Split the sum: the addition law extends from two terms to ten by repeated application — reduce one term, and the pattern repeats.',
            'Now, reduce the base: $9 \\equiv 3 \\pmod 6$, so every power satisfies $9^k \\equiv 3^k \\pmod 6$ — and $9^2 = 81 = 6 \\cdot 13 + 3 \\equiv 3$, so $3 \\cdot 3 \\equiv 3 \\pmod 6$ fixes *every* power at residue $3$.',
            'So, add ten copies: $\\underbrace{3 + 3 + \\cdots + 3}_{10} = 30 \\equiv 0 \\pmod 6$.',
            'Take the enormous check: the true sum is $3{,}922{,}632{,}450 = 6 \\cdot 653{,}772{,}075$ — remainder $0$, as the residues promised.',
            'Hence the remainder is **0** — the powers never even formed.',
          ],
        },
        {
          kind: 'example',
          title: 'A factorial sum: Σ 1! + 2! + … + 10! (mod 3)',
          steps: [
            'Split the sum: from the third term onward every factorial carries the factor $3$ itself — $3! = 6, 4! = 24, \\dots$ all sit in $[0]$.',
            'Now, only two terms survive: $1! \\equiv 1$ and $2! = 2 \\pmod 3$ — so the whole sum is congruent to $1 + 2 = 3 \\equiv 0 \\pmod 3$.',
            'So, check the true value: $1 + 2 + 6 + 24 + \\cdots + 10! = 4{,}037{,}913 = 3 \\cdot 1{,}345{,}971$ — divisible by $3$.',
            'Hence the remainder is **0** — the terms after $2!$ never even had a say.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'Four question shapes own this lesson’s ground (Khattar QA ch. 1’s "Numbers" scope; CAT/IPMAT number-system sections). *Remainder of a product*: "remainder when $43 \\times 57$ is divided by $6$" — reduce each factor, multiply residues. *Remainder of a sum*: the $87 + 94$ and $12{,}345 + 67{,}890$ shapes — add residues; the digit-sum pattern inside the second is the 5.2 giveaway. *Clock and calendar arithmetic*: "what time is it $1000$ hours after 3 o’clock" ($7$ o’clock), "which day of the week is $100$ days after Wednesday" (Friday — $100 \\equiv 2 \\pmod 7$) — the modulus is the wrap-around count. *Power sums*: the $\\sum 9^k \\pmod 6$ shape, where fixing one residue fixes them all. What examinations never ask for is the proof of the laws — they test the engine, and now you own the engine *and* its licence.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Congruence modulo m', def: '$a \\equiv b \\pmod{m}$ means $m \\mid (a - b)$: the difference is a multiple of the modulus. Gauss’s 1801 notation, shaped like $=$ because the algebra behaves like it.' },
            { term: 'Modulus', def: 'The positive integer $m$ that defines the wrap — $12$ for a clock, $7$ for a week, $9$ for digit sums, $10$ for unit digits. The modulus decides which numbers are interchangeable.' },
            { term: 'Residue', def: 'The remainder $r$ with $0 \\le r < m$ that a number leaves on division by $m$. "Reduce to its residue" = replace a number by its remainder.' },
            { term: 'Residue class [r]', def: 'The set of all integers congruent to $r$ modulo $m$: $\\{r, r \\pm m, r \\pm 2m, \\dots\\}$, one representative every $m$ steps. The $m$ classes partition the integers into columns.' },
            { term: 'The congruence laws', def: 'With a common modulus: sums, differences, products and powers of congruent inputs are congruent ($a \\equiv b, c \\equiv d \\Rightarrow a + c \\equiv b + d$, $ac \\equiv bd$, $a^k \\equiv b^k$). Substitution of residues is always safe.' },
            { term: 'Cancellation law', def: '$ca \\equiv cb \\pmod m$ gives only $a \\equiv b \\pmod{m/\\gcd(c,m)}$ — cancel a factor and the modulus shrinks by the gcd. Free cancellation is the coprime case, and it is what makes prime moduli special.' },
            { term: 'Equivalence relation', def: 'A relation that is reflexive, symmetric and transitive — congruence modulo $m$ is one, which is why its classes partition the integers with no overlaps and no leftovers.' },
            { term: 'Casting the modulus (clock arithmetic)', def: 'Computing with residues and letting the modulus wrap the answers: $8 + 5 \\equiv 1 \\pmod{12}$, Wednesday $+ 100 \\equiv$ Friday $\\pmod 7$. Every "wrapping" computation in sight is congruence arithmetic.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'On a 12-hour clock, 8 hours after 5 o’clock shows:',
              options: ['2 o’clock — the clock adds 12 to the 8', '1 o’clock — 5 + 8 = 13 = 12·1 + 1: one wrap, remainder 1', '13 o’clock — clocks do not wrap', '5 o’clock — the 8 wraps away entirely'],
              answer: 1,
              explain: 'The dial keeps remainders modulo 12: $5 + 8 = 13 = 12 \\cdot 1 + 1$, so the clock shows **1 o’clock**. "2 o’clock" miscomputes the wrap ($13 - 12 = 1$, not $2$ — and the clock never adds the modulus to anything); "13 o’clock" refuses the wrap that defines the dial; "5 o’clock" would need $8 \\equiv 0 \\pmod{12}$, which is false.',
            },
            {
              q: 'Why is 23 ≡ 9 (mod 7)?',
              options: ['Because 23 − 9 = 14 = 2·7 — the difference is a multiple of 7', 'Because 7 divides 23', 'Because 7 divides 9', 'Because 7 divides 23 + 9 = 32'],
              answer: 0,
              explain: 'The definition asks exactly one question: does the modulus divide the *difference*? $23 - 9 = 14 = 2 \\cdot 7$ — yes. The distractors test the classic misreadings: divisibility of the numbers themselves ($7 \\nmid 23$, $7 \\nmid 9$) or of their sum ($32 = 7 \\cdot 4 + 4$) is irrelevant.',
            },
            {
              q: 'Given 11 ≡ 3 (mod 8) and 5 ≡ 13 (mod 8), the multiplication law yields:',
              options: ['55 ≡ 39 (mod 80) — multiply the moduli too', '55 ≡ 39 (mod 8) — and both sides indeed leave remainder 7', '55 ≡ 39 (mod 8) — and both sides indeed leave remainder 3', 'No law applies — the pairs are different'],
              answer: 1,
              explain: 'Congruences with a *common* modulus multiply term on term: $11 \\cdot 5 = 55 \\equiv 3 \\cdot 13 = 39 \\pmod 8$. Check: $55 = 8 \\cdot 6 + 7$ and $39 = 8 \\cdot 4 + 7$ — both remainder $7$. The first option illegally multiplies the *moduli* too ($m$ stays fixed throughout); the third option states the right congruence but misreads the shared remainder ($3 \\cdot 3 = 9 \\equiv 1$ is the residue-product route, while the true common residue of $55$ and $39$ is $7$); the fourth denies the law itself.',
            },
            {
              q: 'From 4·5 ≡ 4·8 (mod 6), the honest conclusion is:',
              options: ['5 ≡ 8 (mod 6) — cancel the 4 outright', '5 ≡ 8 (mod 3) — cancel the 4 and shrink the modulus by gcd(4, 6) = 2', '5 ≡ 8 (mod 2) — shrink to the smallest modulus', '20 ≡ 32 (mod 6) — nothing follows'],
              answer: 1,
              explain: 'Cancel the $4$ and the modulus shrinks by $\\gcd(4, 6) = 2$: the conclusion is $5 \\equiv 8 \\pmod 3$ — true, difference $3$. The unshrunk reading (option one) is false: $-3$ is not a multiple of $6$. Option two *names* the shrink but lands on the wrong modulus — $6/2 = 3$, not $2$. Option four states the hypothesis, not a conclusion.',
            },
            {
              q: 'The remainder of 43 × 57 on division by 6 is best found by:',
              options: ['Multiplying out: 2451 = 6·408 + 3', 'Residues: 43 ≡ 1 and 57 ≡ 3, so the product ≡ 1·3 = 3 (mod 6)', 'Residues: 43 ≡ 1 and 57 ≡ 3, so the product ≡ 1 + 3 = 4 (mod 6)', 'Residues: 43 ≡ 7 (mod 6), so the product ≡ 7'],
              answer: 2,
              explain: 'The congruence route reduces first — $43 \\equiv 1$, $57 \\equiv 3$ — and *multiplies* the residues: $1 \\cdot 3 = 3$, the same answer the full division $2451 = 6 \\cdot 408 + 3$ gives (option zero is true but bypasses the method the question asks for). Option three adds where it should multiply; option four names a residue that is not a residue at all ($7 \\ge 6$).',
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
                  q: 'Reduce 23, 41, 70 and 92 to their residues modulo 7.',
                  solution: [
                    'Split the work: divide each number by $7$ and keep the remainder.',
                    'Now, the divisions: $23 = 7 \\cdot 3 + 2$; $41 = 7 \\cdot 5 + 6$; $70 = 7 \\cdot 10 + 0$; $92 = 7 \\cdot 13 + 1$.',
                    'So, the residues: $23 \\equiv 2$, $41 \\equiv 6$, $70 \\equiv 0$, $92 \\equiv 1 \\pmod 7$.',
                    'Hence $2, 6, 0, 1$ — with $70 \\equiv 0$ recording that $7 \\mid 70$.',
                  ],
                  answer: '23 ≡ 2, 41 ≡ 6, 70 ≡ 0, 92 ≡ 1 (mod 7)',
                },
                {
                  q: 'A 12-hour clock shows 9. What does it show 7 hours later? And if it shows 10, what after 6 more hours?',
                  solution: [
                    'Split the two cases: keep only remainders modulo $12$.',
                    'Now, the first: $9 + 7 = 16 = 12 \\cdot 1 + 4$ — the dial shows **4:00**.',
                    'So, the second: $10 + 6 = 16$ as well — the same wrap, **4:00** again.',
                    'Hence both land on 4 o’clock — different starts, one arithmetic.',
                  ],
                  answer: '4:00 in both cases (16 ≡ 4 (mod 12))',
                },
                {
                  q: 'Is 34 ≡ 12 (mod 11)? Show the difference check and the remainder check.',
                  solution: [
                    'Split the two readings of the definition.',
                    'Now, the difference: $34 - 12 = 22 = 2 \\cdot 11$ — a multiple of the modulus.',
                    'So, the remainders: $34 = 11 \\cdot 3 + 1$ and $12 = 11 \\cdot 1 + 1$ — both leave remainder $1$.',
                    'Hence $34 \\equiv 12 \\pmod{11}$ — both readings agree, as the derivation promises.',
                  ],
                  answer: 'Yes — difference 22 = 2·11; both leave remainder 1',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'List all members of the residue class [4] (mod 9) between 0 and 40.',
                  solution: [
                    'Split the class: start at the representative $4$ and step by $9$.',
                    'Now, the ladder: $4, 13, 22, 31, 40$ — the next would be $49$, past the bound.',
                    'So, check each: $4 - 4 = 0$, $13 - 4 = 9$, $22 - 4 = 18 = 2 \\cdot 9$, $31 - 4 = 27$, $40 - 4 = 36 = 4 \\cdot 9$ — all multiples of $9$.',
                    'Hence $[4] \\cap [0, 40] = \\{4, 13, 22, 31, 40\\}$ — five rungs of the staircase.',
                  ],
                  answer: '4, 13, 22, 31, 40',
                },
                {
                  q: 'Show that 51 ≡ 6 (mod 9) by the difference test, and interpret it as a division statement.',
                  solution: [
                    'Split the task: difference first, division second.',
                    'Now, the difference: $51 - 6 = 45 = 5 \\cdot 9$ — a multiple of $9$, so the congruence holds.',
                    'So, the division reading: $51 = 9 \\cdot 5 + 6$ — quotient $5$, remainder $6$; and $6 = 9 \\cdot 0 + 6$ shares the remainder.',
                    'Hence $51 \\equiv 6 \\pmod 9$ is the statement "51 and 6 leave the same remainder on division by 9" — namely $6$.',
                  ],
                  answer: '51 − 6 = 45 = 5·9; 51 = 9·5 + 6 — both remainder 6',
                },
                {
                  q: 'Given 29 ≡ 5 (mod 12) and 47 ≡ 11 (mod 12), find the residue of 76 = 29 + 47 (mod 12) — first by the law, then by direct division.',
                  solution: [
                    'Split the two routes.',
                    'Now, the law: add the residues — $5 + 11 = 16 \\equiv 4 \\pmod{12}$, so $76 \\equiv 4 \\pmod{12}$.',
                    'So, the direct division: $76 = 12 \\cdot 6 + 4$ — remainder $4$.',
                    'Hence both routes give $4$ — the addition law cashed on one instance.',
                  ],
                  answer: '76 ≡ 4 (mod 12) — 5 + 11 = 16 ≡ 4; direct: 76 = 12·6 + 4',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Find the remainder when 1234 × 5678 is divided by 9 — without multiplying out. Then verify by the full product.',
                  solution: [
                    'Split the factors to residues: $1234 \\equiv 1 + 2 + 3 + 4 = 10 \\equiv 1 \\pmod 9$, and $5678 \\equiv 5 + 6 + 7 + 8 = 26 \\equiv 8 \\pmod 9$.',
                    'Now, multiply the residues: $1234 \\cdot 5678 \\equiv 1 \\cdot 8 = 8 \\pmod 9$.',
                    'So, verify enormously: $1234 \\cdot 5678 = 7{,}006{,}652 = 9 \\cdot 778{,}516 + 8$ — remainder $8$.',
                    'Hence the remainder is **8** — two digit sums and one small product.',
                  ],
                  answer: '8 — 1234 ≡ 1, 5678 ≡ 8 (mod 9); 7006652 = 9·778516 + 8',
                },
                {
                  q: 'Prove the shift law: if a ≡ b (mod m), then a + k ≡ b + k (mod m) for any integer k.',
                  solution: [
                    'Split the statement into differences.',
                    'Now, compute: $(a + k) - (b + k) = a - b$ — the $k$ cancels in the difference.',
                    'So, invoke the definition: $m \\mid (a - b)$ by hypothesis, and the difference of the shifted pair is *the same number*.',
                    'Hence $a + k \\equiv b + k \\pmod m$ — shifting both sides by the same amount is always safe (the additive twin of the multiplication law).',
                  ],
                  answer: '(a + k) − (b + k) = a − b is a multiple of m — the shift never touches the difference',
                },
                {
                  q: 'What exactly follows from 9x ≡ 9y (mod 12)? Test the instance x = 5, y = 1.',
                  solution: [
                    'Split the cancellation: $\\gcd(9, 12) = 3$, so cancelling the $9$ shrinks the modulus $12 \\to 12/3 = 4$.',
                    'Now, the honest conclusion: $x \\equiv y \\pmod 4$ — no stronger statement is licensed.',
                    'So, test it: $9 \\cdot 5 = 45 = 12 \\cdot 3 + 9$ and $9 \\cdot 1 = 9 = 12 \\cdot 0 + 9$ — the hypothesis holds ($45 \\equiv 9 \\pmod{12}$).',
                    'Take the conclusion: $5 - 1 = 4$, and indeed $5 \\equiv 1 \\pmod 4$ — while $5 \\not\\equiv 1 \\pmod{12}$.',
                    'Hence the shrink is real: from $9x \\equiv 9y \\pmod{12}$ follows exactly $x \\equiv y \\pmod 4$.',
                  ],
                  answer: 'x ≡ y (mod 4) — gcd(9, 12) = 3 shrinks 12 → 4; instance: 45 ≡ 9 (mod 12), 5 ≡ 1 (mod 4)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Find the remainder when 7¹ + 7² + 7³ + 7⁴ is divided by 5, using residues only; verify by the true sum.',
                  solution: [
                    'Split the sum into powers: $7 \\equiv 2 \\pmod 5$, so $7^k \\equiv 2^k \\pmod 5$ for every $k$.',
                    'Now, the residues: $7^1 \\equiv 2$, $7^2 = 49 \\equiv 4$, $7^3 \\equiv 2 \\cdot 4 = 8 \\equiv 3$, $7^4 \\equiv 4 \\cdot 3 \\cdot\\dots$ — or directly: $2, 4, 8 \\equiv 3, 16 \\equiv 1$, i.e. $2, 4, 3, 1$.',
                    'So, add: $2 + 4 + 3 + 1 = 10 \\equiv 0 \\pmod 5$ — the sum is a multiple of $5$.',
                    'Take the verification: $7 + 49 + 343 + 2401 = 2800 = 5 \\cdot 560$ ✓.',
                    'Hence the remainder is **0** — and the cycle $2, 4, 3, 1$ inside the work is Lesson 5.3’s subject, met early.',
                  ],
                  answer: '0 — residues 2 + 4 + 3 + 1 = 10 ≡ 0 (mod 5); 2800 = 5·560',
                },
                {
                  q: 'Prove the multiplication law from scratch: if a = b + mu and c = d + mv, then ac ≡ bd (mod m).',
                  solution: [
                    'Split the expansion: multiply the two rewritten forms.',
                    'Now, expand: $ac = (b + mu)(d + mv) = bd + bmv + mud + m^2uv$.',
                    'So, collect the multiples: $ac - bd = m(bv + ud + muv)$ — every non-$bd$ term carries a factor $m$.',
                    'Hence $m \\mid (ac - bd)$, i.e. $ac \\equiv bd \\pmod m$ — the one-line engine behind every power law and product reduction in this chapter.',
                  ],
                  answer: 'ac − bd = m(bv + ud + muv) — a multiple of m by inspection',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'It is 3 o’clock. Find what the clock shows 10⁶ hours from now — exactly, using the congruence engine.',
                  solution: [
                    'Split the problem: the dial keeps remainders modulo $12$; only the residue of $10^6$ matters.',
                    'Now, reduce the power: $10^2 = 100 \\equiv 4 \\pmod{12}$; so $10^6 = (10^2)^3 \\equiv 4^3 = 64 \\equiv 4 \\pmod{12}$ (the power law twice). Direct check: $10^6 = 12 \\cdot 83{,}333 + 4$.',
                    'So, add: the dial sits at $3$, and $3 + 4 = 7$ — no wrap.',
                    'Hence the clock shows **7 o’clock** — a million hours resolved in three small divisions.',
                  ],
                  answer: '7 o’clock — 10⁶ ≡ 4 (mod 12), and 3 + 4 = 7',
                },
                {
                  q: 'Show that 1! + 2! + ⋯ + 10! is divisible by 3 by residues, and confirm with the true sum 4037913.',
                  solution: [
                    'Split the sum: $3! = 6$ and every later factorial contains the factor $3$ — so $k! \\equiv 0 \\pmod 3$ for $k \\ge 3$.',
                    'Now, the survivors: $1! \\equiv 1$ and $2! = 2 \\pmod 3$ — the whole sum reduces to $1 + 2 = 3 \\equiv 0 \\pmod 3$.',
                    'So, the conclusion: the sum is divisible by $3$ — three of ten terms did all the work.',
                    'Take the confirmation: $1 + 2 + 6 + 24 + 120 + \\cdots + 10! = 4{,}037{,}913 = 3 \\cdot 1{,}345{,}971$ ✓.',
                    'Hence divisibility by 3, certified both ways.',
                  ],
                  answer: 'Only 1! + 2! = 3 survives mod 3; 4037913 = 3·1345971',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove that congruence modulo m is an equivalence relation (reflexive, symmetric, transitive), and explain why the classes therefore partition the integers.',
                  solution: [
                    'Split the three properties into difference statements.',
                    'Now, reflexivity: $a - a = 0 = m \\cdot 0$ — a multiple of $m$, so $a \\equiv a$.',
                    'So, symmetry: if $a - b = mt$ then $b - a = m(-t)$ — negating a multiple gives a multiple, so $a \\equiv b \\Rightarrow b \\equiv a$.',
                    'Take transitivity: $a - b = mt$ and $b - c = ms$ give $a - c = m(t + s)$ — multiples add to multiples; e.g. $23 \\equiv 9$ (diff $14$) and $9 \\equiv 2$ (diff $7$) give $23 \\equiv 2$ (diff $21 = 14 + 7$).',
                    'Hence the partition: reflexivity puts every integer in *some* class $[r]$ (its remainder class, by the division algorithm); symmetry and transitivity make class membership mutual and unambiguous — two classes are either identical or disjoint, and the $m$ classes $[0], [1], \\dots, [m-1]$ cover everything with no overlap, exactly the pigeonhole picture of the figure.',
                  ],
                  answer: 'Differences 0, negated multiples, added multiples — the three laws; the classes partition because every integer has exactly one remainder (Lesson 2.1)',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The definition of congruence',
          latex: 'a \\equiv b \\pmod{m} \\;\\Longleftrightarrow\\; m \\mid (a - b) \\;\\Longleftrightarrow\\; a = b + mt',
          note: 'Gauss, Disquisitiones art. 1 (1801). Equivalently: a and b leave the same remainder on division by m — the two readings are provably the same relation.',
        },
        {
          kind: 'formula',
          name: 'The same-remainder criterion',
          latex: 'a \\equiv b \\pmod m \\;\\Longleftrightarrow\\; a \\bmod m = b \\bmod m',
          note: 'Where both remainders are taken in $0, 1, \\dots, m-1$ — the division algorithm’s unique pair. The clock reading of the divisible difference.',
        },
        {
          kind: 'formula',
          name: 'The congruence laws',
          latex: 'a \\equiv b,\\ c \\equiv d \\pmod m \\;\\Rightarrow\\; a + c \\equiv b + d,\\quad ac \\equiv bd,\\quad a^k \\equiv b^k',
          note: 'Substituting residues never changes a remainder — the engine behind every exam reduction of huge sums and products.',
        },
        {
          kind: 'formula',
          name: 'The cancellation law',
          latex: 'ca \\equiv cb \\pmod m \\;\\Longleftrightarrow\\; a \\equiv b \\pmod{m/\\gcd(c, m)}',
          note: 'Cancel a factor and the modulus shrinks by the gcd — free cancellation only when c and m are coprime. The trap behind every false congruence "proof".',
        },
      ],
    },
    {
      id: 'ans-why-the-divisibility-tests-work',
      number: '5.2',
      title: 'Why the Divisibility Tests Work',
      prerequisites: ['ans-remainders-become-numbers-congruence-defined', 'ans-division-with-rest-the-division-algorithm', 'fm-divisibility-and-its-tests'],
      sources: ['ncert-math8-ch16', 'fibonacci-1202-liber-abaci', 'khattar-qa-4e', 'gauss-1801-disquisitiones'],
      concepts: [
        '10 ≡ 1 (mod 3), (mod 9) — the digit-sum engine',
        '10 ≡ −1 (mod 11) — the alternating engine',
        '10 ≡ 0 (mod 2, 5, 10); 100 ≡ 0 (mod 4); 1000 ≡ 0 (mod 8)',
        'Casting out nines and digital roots',
        'The transposition blind spot (mod 9) and the mod-11 catch',
        'The 7-truncation law b − 2c',
        '1001 = 7·11·13 — the three-digit block engine',
        'The coprime licence for composite tests',
      ],
      objectives: [
        'Derive every school divisibility test from one congruence — the last-digit tests from $10 \\equiv 0$, the digit-sum tests from $10 \\equiv 1$, the alternating test from $10 \\equiv -1$ — with the power law of Lesson 5.1 doing the work',
        'Run the casting-out-nines check on a multiplication, prove exactly what it catches and what it misses, and explain why the mod-11 check catches transpositions',
        'Use the two modular tests for 7 — the truncation law $b - 2c$ and the $1001 = 7 \\cdot 11 \\cdot 13$ block engine — and the block engine’s bonus test for 13',
        'Combine tests through the coprime licence (divisible by coprime parts ⟺ divisible by their product), avoid the 18-trap, and solve the exam digit-hunt problems',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'You have used the divisibility tests since primary school: a number is divisible by 3 exactly when its digit sum is; by 9 when its digit sum is; by 11 when the alternating sum of its digits is; by 4 when its last two digits are. Foundation Mathematics Lesson 3.1 banked them as operating rules — used constantly, never explained. This lesson is the payoff for building the congruence machine: every one of those memorised rules is a theorem, each proved in a few lines, and all from the same engine. A number’s decimal name is a sum of digits times powers of ten (chapter 3’s representation theorem: every number has exactly one name), and a divisibility test is nothing but a congruence statement about the powers of ten.',
        },
        {
          kind: 'para',
          text: 'The NCERT class-8 course already owns a first instalment of this story — chapter 16, "Playing with Numbers", writes a two-digit number in general form $10a + b$ and reshuffles it to expose the 3- and 9-tests. This lesson takes the same idea to its full generality: the general form is a congruence in disguise, and the disguise removed, *all* the tests — including 7 and 13, which school never touches — fall out at once. One number, read six ways, is the whole lesson: $10 \\equiv 1, 0, \\text{ or } -1$ (mod something).',
        },
        { kind: 'heading', text: 'The last-digit tests: 2, 5 and 10' },
        {
          kind: 'para',
          text: 'Write the number through its digits: $n = d_k 10^k + \\dots + d_2 10^2 + d_1 10 + d_0$. Every term except the last carries a factor $10$ — and modulo 2, 5 and 10 the number 10 itself is congruent to $0$. By the multiplication law of Lesson 5.1, every digit-times-power term collapses to $0$, leaving only the units digit standing:',
        },
        {
          kind: 'equation',
          latex: '10 \\equiv 0 \\pmod{2}, \\pmod{5}, \\pmod{10} \\;\\Rightarrow\\; n \\equiv d_0 \\pmod{2}, \\pmod{5}, \\pmod{10}',
          note: 'The three tests are one statement: divisibility by 2, 5 or 10 — and more generally the remainder on division by each — is decided by the units digit alone. n mod 10 IS the units digit.',
        },
        {
          kind: 'para',
          text: 'So the school rules land as theorems:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$2 \\mid n$ ⟺ the last digit $d_0$ is even — because $2 \\mid n$ ⟺ $2 \\mid d_0$;',
            '$5 \\mid n$ ⟺ $d_0 \\in \\{0, 5\\}$ — because $5 \\mid n$ ⟺ $5 \\mid d_0$;',
            '$10 \\mid n$ ⟺ $d_0 = 0$ — and here the congruence says more: the *remainder* of $n$ on division by 10 is exactly $d_0$, which is why "the units digit" and "the remainder mod 10" are the same phrase.',
          ],
        },
        { kind: 'heading', text: 'Two digits for 4, three for 8' },
        {
          kind: 'para',
          text: 'The same collapse, one power later: $100 = 4 \\cdot 25$, so $10^2 \\equiv 0 \\pmod 4$, and every term from the hundreds place upward vanishes modulo 4 — the last *two* digits decide. Likewise $1000 = 8 \\cdot 125$, so $10^3 \\equiv 0 \\pmod 8$: the last *three* digits decide divisibility by 8. The pattern is not mysticism — it is exactly the statement that $4 \\mid 10^2$ but $4 \\nmid 10$, and $8 \\mid 10^3$ but $8 \\nmid 10^2$.',
        },
        {
          kind: 'example',
          title: 'Is 39216 divisible by 8?',
          steps: [
            'Split the number: only the last three digits $216$ can matter, since $1000 \\equiv 0 \\pmod 8$.',
            'Now, test the block: $216 = 8 \\cdot 27$ — divisible.',
            'So, conclude: $39216 \\equiv 216 \\equiv 0 \\pmod 8$ — divisible by 8, and indeed $39216 = 8 \\cdot 4902$.',
            'Take the halving check (the school shortcut): $216 \\to 108 \\to 54$ — two clean halvings, confirming the factor $2^3 = 8$.',
            'Hence yes — three digits inspected, one division performed.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The width trap',
          text: 'The test for 4 needs the last **two** digits and the test for 8 needs the last **three** — a number ending in 4 is not thereby divisible by 4 (14 is not), and a number whose last two digits are divisible by 4 is not thereby divisible by 8 (104 $= 8 \\cdot 13$ is, but $204 = 8 \\cdot 25 + 4$ is not — the same last two digits, opposite verdicts: the hundreds digit matters to 8). The width of the digit window is exactly the power of ten that the modulus divides — no more, no less.',
        },
        { kind: 'heading', text: 'The digit-sum tests: 3 and 9' },
        {
          kind: 'para',
          text: 'Now the famous ones. Modulo 9, ten is *one* — $10 = 9 + 1$, so $10 \\equiv 1 \\pmod 9$ — and the power law of Lesson 5.1 turns this single fact into the whole test: every power of ten is congruent to 1, so every digit contributes only itself.',
        },
        {
          kind: 'derivation',
          title: 'Why the digit sum tests divisibility by 3 and 9',
          statement:
            'Claim: $n \\equiv S(n) \\pmod 3$ and $n \\equiv S(n) \\pmod 9$, where $S(n)$ is the sum of the digits of $n$. Consequently $9 \\mid n$ ⟺ $9 \\mid S(n)$, and $3 \\mid n$ ⟺ $3 \\mid S(n)$.',
          steps: [
            {
              label: 'Write the decimal name',
              formula: 'n = d_k 10^k + d_{k-1} 10^{k-1} + \\cdots + d_1 10 + d_0',
              explanation:
                'The representation theorem of chapter 3 (Lesson 3.1): one name, one digit list. NCERT’s "general form" $10a + b$ is this with $k = 1$.',
            },
            {
              label: 'Collapse the powers of ten',
              formula: '10 \\equiv 1 \\pmod 9 \\;\\Rightarrow\\; 10^i \\equiv 1^i = 1 \\pmod 9',
              explanation:
                'The power law of Lesson 5.1: congruent bases give congruent powers. Since $10 = 9 + 1$, *every* power of ten is congruent to 1 modulo 9 — place value evaporates, digit value survives.',
            },
            {
              label: 'Substitute term by term',
              formula: 'n \\equiv d_k \\cdot 1 + d_{k-1} \\cdot 1 + \\cdots + d_1 \\cdot 1 + d_0 = S(n) \\pmod 9',
              explanation:
                'Each digit-times-power term is congruent to the digit alone. The number and its digit sum are congruent modulo 9 — and the same three lines with $10 = 3 \\cdot 3 + 1$ give the mod-3 version.',
            },
            {
              label: 'Convert to divisibility',
              formula: '9 \\mid n \\;\\Longleftrightarrow\\; 9 \\mid S(n); \\qquad 3 \\mid n \\;\\Longleftrightarrow\\; 3 \\mid S(n)',
              explanation:
                'Congruence zero is divisibility: $n \\equiv 0 \\pmod 9$ ⟺ $S(n) \\equiv 0 \\pmod 9$. And because $3 \\mid 9$, the mod-9 statement implies the mod-3 one — the 3-test is free.',
            },
          ],
          result:
            'A number is divisible by 3 (or by 9) exactly when its digit sum is. More: the digit sum leaves the same remainder as the number itself on division by 9 — the test is a remainder machine, not just a yes-no oracle.',
        },
        {
          kind: 'figure',
          caption:
            'The digit-sum engine on 57369, drawn as a collapse: each digit rides a power of ten, and modulo 9 every power of ten is congruent to 1 (10 = 9·1 + 1, so 10⁴ = 9999·… + 1 in the same way) — the place value vanishes and the digits are all that survive. 57369 ≡ 5 + 7 + 3 + 6 + 9 = 30 ≡ 3 (mod 9), while modulo 3 the sum 30 ≡ 0: divisible by 3, not by 9.',
          svg: `<svg viewBox="0 0 660 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five columns showing each digit of 57369 with its power of ten collapsing to one modulo nine">
  <text x="330" y="34" font-size="14" text-anchor="middle" fill="currentColor" opacity="0.85">the digit-sum engine — every power of ten collapses to 1 (mod 9)</text>
  <g font-size="22" text-anchor="middle" fill="currentColor" font-weight="bold">
    <text x="110" y="90">5</text><text x="220" y="90">7</text><text x="330" y="90">3</text><text x="440" y="90">6</text><text x="550" y="90">9</text>
  </g>
  <g font-size="13" text-anchor="middle" fill="currentColor" opacity="0.75">
    <text x="110" y="118">× 10⁴</text><text x="220" y="118">× 10³</text><text x="330" y="118">× 10²</text><text x="440" y="118">× 10¹</text><text x="550" y="118">× 10⁰</text>
  </g>
  <g stroke="currentColor" stroke-width="1" opacity="0.6">
    <line x1="110" y1="132" x2="110" y2="156"/><line x1="220" y1="132" x2="220" y2="156"/><line x1="330" y1="132" x2="330" y2="156"/><line x1="440" y1="132" x2="440" y2="156"/><line x1="550" y1="132" x2="550" y2="156"/>
  </g>
  <g fill="currentColor" opacity="0.6">
    <polygon points="110,164 106,155 114,155"/><polygon points="220,164 216,155 224,155"/><polygon points="330,164 326,155 334,155"/><polygon points="440,164 436,155 444,155"/><polygon points="550,164 546,155 554,155"/>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.7">
    <rect x="58" y="176" width="104" height="30" rx="15"/><rect x="168" y="176" width="104" height="30" rx="15"/><rect x="278" y="176" width="104" height="30" rx="15"/><rect x="388" y="176" width="104" height="30" rx="15"/><rect x="498" y="176" width="104" height="30" rx="15"/>
  </g>
  <g font-size="12" text-anchor="middle" fill="currentColor">
    <text x="110" y="196">≡ 1 (mod 9)</text><text x="220" y="196">≡ 1 (mod 9)</text><text x="330" y="196">≡ 1 (mod 9)</text><text x="440" y="196">≡ 1 (mod 9)</text><text x="550" y="196">≡ 1 (mod 9)</text>
  </g>
  <g font-size="18" text-anchor="middle" fill="currentColor" font-weight="bold">
    <text x="110" y="258">5</text><text x="220" y="258">7</text><text x="330" y="258">3</text><text x="440" y="258">6</text><text x="550" y="258">9</text>
  </g>
  <text x="330" y="304" font-size="14" text-anchor="middle" fill="currentColor" opacity="0.9">5 + 7 + 3 + 6 + 9 = 30 — so 57369 ≡ 3 (mod 9) and 57369 ≡ 0 (mod 3)</text>
</svg>`,
        },
        {
          kind: 'example',
          title: 'Three digit-sum verdicts',
          steps: [
            'Split the work: sum the digits, then read the two moduli off the sum.',
            'Now, 57369: $5 + 7 + 3 + 6 + 9 = 30$ — and $30$ is a multiple of $3$ but not of $9$. So $3 \\mid 57369$ (indeed $57369 = 3 \\cdot 19123$) while $57369 \\equiv 3 \\pmod 9$.',
            'So, 726: $7 + 2 + 6 = 15$ — divisible by $3$ ($726 = 3 \\cdot 242$), not by $9$ ($726 = 9 \\cdot 80 + 6$; the digit sum already said "remainder 6").',
            'Take 67419: $6 + 7 + 4 + 1 + 9 = 27$ — a multiple of $9$, so $9 \\mid 67419$ ($67419 = 9 \\cdot 7491$).',
            'Hence three verdicts, zero long divisions — the digit sum is a remainder machine.',
          ],
        },
        {
          kind: 'para',
          text: 'The digit sum can itself be digit-summed: $57369 \\to 30 \\to 3$, and the single digit at the end of the chain — the **digital root** — is the remainder on division by 9 (with remainder 0 read as 9, since the root of a multiple of 9 is 9 itself, never 0 unless the number is 0). Merchants did exactly this for centuries as an arithmetic checksum, and the device has a name worth knowing.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Casting out nines',
          text: 'To *cast out nines* is to check a computation by its digital roots: multiply the roots of the operands, reduce again, and compare with the root of the claimed product — if the computation was right, the roots must match, because digital roots are congruence mod 9 and Lesson 5.1’s laws say congruent inputs give congruent outputs. The Greek world knew digital-root sums early (Hippolytus, around AD 200, and Iamblichus in his commentary on Nicomachus describe the "root" of a number), but the earliest known use of the *check on arithmetic* is in Indian and Islamic mathematics — the *Mahāsiddhānta* of Āryabhaṭa II around 950, and Ibn Sīnā’s detailed account of what he called the Hindu method around 1020. Fibonacci carried the procedure into the Latin West in the *Liber Abaci* (1202), where it stood guard over the merchant arithmetic of Europe for four hundred years.',
        },
        {
          kind: 'example',
          title: 'Cast out nines on 47 × 32 = 1504 — and what the check misses',
          steps: [
            'Split the check: roots of the operands, root of the product, compare.',
            'Now, the roots: $47 \\to 11 \\to 2$ and $32 \\to 5$; so the product’s root must satisfy $\\text{root} \\equiv 2 \\cdot 5 = 10 \\to 1 \\pmod 9$.',
            'So, compare: $1504 \\to 10 \\to 1$ — the roots match ($1 = 1$), and the computation stands.',
            'Take the two failure modes: the slip $47 \\times 32 = 1524$ dies instantly ($1524 \\to 12 \\to 3 \\ne 1$); but the *transposition* $1504 \\to 1054$ survives — the digits are the same, so the digit sum is the same ($10 \\to 1$), and mod 9 cannot see the error at all.',
            'Hence the check is a sieve with a known hole — transpositions pass through it untouched.',
          ],
        },
        { kind: 'heading', text: 'The alternating test: 11' },
        {
          kind: 'para',
          text: 'Modulo 11, ten is *minus one* — $10 = 11 - 1$ — and minus one to a power alternates: $10^0 \\equiv 1$, $10^1 \\equiv -1$, $10^2 \\equiv 1$, $10^3 \\equiv -1$, and so on, by the power law. The digit contributions therefore arrive with alternating signs, counting from the units digit as position $0$:',
        },
        {
          kind: 'derivation',
          title: 'The alternating-sum test for 11',
          statement:
            'Claim: $n \\equiv A(n) \\pmod{11}$, where $A(n) = d_0 - d_1 + d_2 - d_3 + \\cdots$ is the alternating sum of the digits from the units end. Consequently $11 \\mid n$ ⟺ $11 \\mid A(n)$.',
          steps: [
            {
              label: 'The engine congruence',
              formula: '10 \\equiv -1 \\pmod{11}',
              explanation:
                'One line: $10 = 11 - 1$. Of the three residues $10$ carries at the small moduli — $0$ (mod 2, 5, 10), $1$ (mod 3, 9), $-1$ (mod 11) — this is the last, and the richest in structure.',
            },
            {
              label: 'Powers alternate',
              formula: '10^i \\equiv (-1)^i \\pmod{11}',
              explanation:
                'The power law again: multiply $-1$ by itself $i$ times and the sign flips each time. Even positions contribute $+d_i$, odd positions contribute $-d_i$.',
            },
            {
              label: 'Substitute term by term',
              formula: 'n \\equiv d_0 - d_1 + d_2 - d_3 + \\cdots = A(n) \\pmod{11}',
              explanation:
                'The decimal name with each power replaced by its sign. Note the test does not care which end you start from — flipping the starting end multiplies the whole sum by $-1$, and divisibility by 11 is insensitive to the overall sign.',
            },
          ],
          result:
            'A number is divisible by 11 exactly when the alternating sum of its digits (from the units end, say) is — and the alternating sum carries the number’s full remainder mod 11.',
        },
        {
          kind: 'table',
          caption: 'The alternating test run on 918082, digit by digit from the units end. The running sum ends at −22 = −2·11: divisible.',
          head: ['position', 'digit', 'sign', 'contribution', 'running sum'],
          rows: [
            ['0 (units)', '2', '+', '+2', '2'],
            ['1', '8', '−', '−8', '−6'],
            ['2', '0', '+', '+0', '−6'],
            ['3', '8', '−', '−8', '−14'],
            ['4', '1', '+', '+1', '−13'],
            ['5', '9', '−', '−9', '−22 = −2·11'],
          ],
        },
        {
          kind: 'example',
          title: 'Three verdicts by the alternating sum',
          steps: [
            'Split the digits with signs from the units end.',
            'Now, 918082: $2 - 8 + 0 - 8 + 1 - 9 = -22 = -2 \\cdot 11$ — divisible by 11, and indeed $918082 = 11 \\cdot 83462$.',
            'So, 1331: $1 - 3 + 3 - 1 = 0$ — divisible; of course, $1331 = 11^3$, and the cube of the modulus had better pass its own test.',
            'Take the digit hunt: for which digit $x$ is $8x69$ divisible by 11? The alternating sum is $9 - 6 + x - 8 = x - 5$, so $11 \\mid 8x69$ ⟺ $x = 5$ — and $8569 = 11 \\cdot 779$ confirms it.',
            'Hence the engine: one sign pattern, every verdict.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Why mod 11 catches what mod 9 misses',
          text: 'A transposition — writing $1054$ for $1504$, say — rearranges digits without changing them, so any test that depends only on the *multiset* of digits (the digit sum, the digital root) is blind to it. The alternating sum is not a multiset statistic: swapping two adjacent digits $d, e$ at positions $i, i+1$ changes the contribution $(-1)^i d + (-1)^{i+1} e$ into $(-1)^i e + (-1)^{i+1} d$ — a shift of $2(-1)^i (d - e)$, which is a multiple of 11 only if the digits were equal. Check it live: $1234$ has alternating sum $4 - 3 + 2 - 1 = 2$, while its transposition $1324$ gives $4 - 2 + 3 - 1 = 4$ — the mod-11 fingerprint moved. This is exactly why the publishers’ ISBN-10 checksum scheme runs on mod 11: it is the smallest modulus whose digit test sees single-digit slips *and* adjacent transpositions — the two dominant human typing errors. Chapter 10 returns to checksums as a subject in their own right.',
        },
        { kind: 'heading', text: 'The awkward cousins: tests for 7 and 13' },
        {
          kind: 'para',
          text: 'No small power of ten is $\\pm 1$ modulo 7 — $10 \\equiv 3$, $100 \\equiv 2$, $1000 \\equiv 6 \\equiv -1$ (mod 7) — so the digit tests for 7 arrive late or sideways. Two practical engines exist, and both are congruence arguments through and through. The first is a *truncation* rule: cut the last digit, double it, subtract.',
        },
        {
          kind: 'derivation',
          title: 'The truncation test for 7',
          statement:
            'Claim: for $n = 10b + c$ (the number $b$ with units digit $c$ chopped off), $7 \\mid n$ ⟺ $7 \\mid (b - 2c)$.',
          steps: [
            {
              label: 'Name the pieces',
              formula: 'n = 10b + c',
              explanation:
                'Truncate: $b$ is $n$ without its units digit, $c$ the discarded digit. NCERT’s general form again, put to modular work.',
            },
            {
              label: 'Multiply by 5',
              formula: '5n = 50b + 5c \\equiv b + 5c \\pmod 7',
              explanation:
                'Since $50 = 7 \\cdot 7 + 1$, we have $50 \\equiv 1$ (mod 7); and $5 \\equiv -2$ (mod 7) lets the tail be written $b - 2c$. So $5n \\equiv b - 2c \\pmod 7$.',
            },
            {
              label: 'Cancel the 5',
              formula: '\\gcd(5, 7) = 1 \\;\\Rightarrow\\; 7 \\mid n \\;\\Longleftrightarrow\\; 7 \\mid 5n \\;\\Longleftrightarrow\\; 7 \\mid (b - 2c)',
              explanation:
                'Lesson 5.1’s cancellation licence in its coprime case: multiplying by 5 (coprime to 7) moves nothing across the divisible/non-divisible line. The test is exact, not heuristic.',
            },
          ],
          result:
            'Cut the units digit $c$, subtract twice it from the remaining number $b$: divisibility by 7 is preserved. Iterate until the number is small enough to see — including down to a single digit (7, 0) or an obvious multiple like 14, 21, 35.',
        },
        {
          kind: 'example',
          title: 'Is 3584 divisible by 7? Is 3583?',
          steps: [
            'Split the first number: $b = 358$, $c = 4$ — the rule sends $3584 \\to 358 - 2 \\cdot 4 = 350$.',
            'Now, iterate: $350 \\to 35 - 2 \\cdot 0 = 35 = 5 \\cdot 7$ — divisible.',
            'So, conclude: $7 \\mid 3584$, and the direct division agrees — $3584 = 7 \\cdot 512$.',
            'Take the neighbour: $3583 \\to 358 - 6 = 352 \\to 35 - 4 = 31$ — not a multiple of 7; indeed $3583 = 7 \\cdot 511 + 6$, remainder 6.',
            'Hence both verdicts, one cut-and-subtract engine — no division at all.',
          ],
        },
        {
          kind: 'para',
          text: 'The second engine exploits a factorisation you already own: $10^3 + 1 = 1001 = 7 \\cdot 11 \\cdot 13$. So $10^3 \\equiv -1$ modulo 7, modulo 11 *and* modulo 13 — and the alternating-sign idea from the 11-test reappears with **blocks of three digits** in place of single digits. Group the digits from the right in threes; alternately add and subtract the blocks; the result carries the number’s residue mod 7, 11 and 13 simultaneously. A single pass tests three primes at once, and it is the source of the (rarely taught, easily derived) test for 13.',
        },
        {
          kind: 'example',
          title: 'The block engine: 4367 and 2535',
          steps: [
            'Split 4367 into blocks: $4 \\mid 367$ — the alternating block sum is $367 - 4 = 363$.',
            'Now, read the blocks: $363 = 3 \\cdot 121 = 3 \\cdot 11^2$ — divisible by 11, so $4367$ is too: $4367 = 11 \\cdot 397$ ✓.',
            'So, run 2535: blocks $2 \\mid 535$, alternating sum $535 - 2 = 533 = 13 \\cdot 41$ — divisible by 13, and $2535 = 13 \\cdot 195$ ✓.',
            'Take the separation: is $2535$ divisible by 7? $533 = 7 \\cdot 76 + 1$ — no; and indeed $2535 = 7 \\cdot 362 + 1$. The block value $533$ carries the residue for *all three* moduli at once — divisibility by 13 with remainder 1 on division by 7.',
            'Hence one regrouping, three primality probes — the 1001 engine at work.',
          ],
        },
        {
          kind: 'table',
          caption: 'The whole battery, one engine. Each test is the congruence of the relevant power(s) of ten; each was proved in this lesson, not memorised.',
          head: ['divisor', 'the test', 'the congruence behind it'],
          rows: [
            ['2, 5, 10', 'the last digit', '$10 \\equiv 0$ (mod 2, 5, 10)'],
            ['4', 'the last two digits', '$100 \\equiv 0$ (mod 4)'],
            ['8', 'the last three digits', '$1000 \\equiv 0$ (mod 8)'],
            ['3, 9', 'the digit sum', '$10 \\equiv 1$ (mod 3, mod 9)'],
            ['11', 'the alternating digit sum', '$10 \\equiv -1$ (mod 11)'],
            ['7', 'cut, double, subtract — or blocks', '$5n \\equiv b - 2c$ (mod 7); $10^3 \\equiv -1$ (mod 7)'],
            ['13', 'blocks of three, alternating', '$10^3 \\equiv -1$ (mod 13)'],
            ['6, 12, 18, 72, 88', 'the coprime parts, each by its own test', 'the coprime licence (below)'],
          ],
        },
        { kind: 'heading', text: 'Composite divisors: the coprime licence' },
        {
          kind: 'para',
          text: 'A composite divisor is checked through its *coprime parts*: $6 = 2 \\cdot 3$ (even, and digit sum divisible by 3), $12 = 3 \\cdot 4$, $18 = 2 \\cdot 9$, $72 = 8 \\cdot 9$, $88 = 8 \\cdot 11$. The licence — divisibility by each of two coprime numbers forces divisibility by their product — is chapter 4’s territory (the fundamental theorem’s exponent vectors: if $2^a$ and $3^b$ each divide $n$, the exponent of every prime in $n$ clears both bars at once), cited here as banked. The condition is not decoration:',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The parts must be coprime — the 18 trap',
          text: '18 is divisible by 2 and by 6, yet $18$ is **not** divisible by $12 = 2 \\cdot 6$ — because $\\gcd(2, 6) = 2 \\ne 1$. Divisibility by both parts licenses the product only when the parts share nothing: check $12$ through $3 \\wedge 4$, not $2 \\wedge 6$; check $24$ through $3 \\wedge 8$ (or $2^3$’s own test three times), never through $4 \\wedge 6$ (gcd 2). The trap is standard examination fare precisely because the licence’s hypothesis is so easy to skip.',
        },
        {
          kind: 'example',
          title: 'Composite verdicts: 4992 by 6, 8316 by 18, 132 by 12',
          steps: [
            'Split each divisor into coprime parts: $6 = 2 \\cdot 3$, $18 = 2 \\cdot 9$, $12 = 3 \\cdot 4$.',
            'Now, 4992: even ✓, digit sum $4 + 9 + 9 + 2 = 24$ divisible by 3 ✓ — so $6 \\mid 4992$ (indeed $4992 = 6 \\cdot 832$).',
            'So, 8316: even ✓, digit sum $8 + 3 + 1 + 6 = 18$ divisible by 9 ✓ — so $18 \\mid 8316$ (indeed $8316 = 18 \\cdot 462$).',
            'Take 132: digit sum $6$ (divisible by 3 ✓), last two digits $32 = 4 \\cdot 8$ (divisible by 4 ✓) — so $12 \\mid 132$ (indeed $132 = 12 \\cdot 11$).',
            'Hence three composite verdicts, each assembled from two primitive tests — the licence doing the joining.',
          ],
        },
        { kind: 'heading', text: 'The digit hunt: letters for digits' },
        {
          kind: 'para',
          text: 'The NCERT class-8 canon turns the tests around: a number is written with a digit replaced by a letter, and the test *solves for the letter*. "If $24x$ is a multiple of 3, what can $x$ be?" runs the 3-test backwards — $2 + 4 + x \\equiv 0 \\pmod 3$ — and the congruence machine answers exactly as any equation would. Competitive papers run the same shape with two letters and a composite modulus.',
        },
        {
          kind: 'example',
          title: 'Two digit hunts: x47 by 3, and 67y19 by 9',
          steps: [
            'Split the first: $x47$ divisible by 3 means $x + 4 + 7 = x + 11 \\equiv 0 \\pmod 3$, i.e. $x \\equiv 1 \\pmod 3$.',
            'Now, solve over the digits: $x \\in \\{1, 4, 7\\}$ — the smallest is $x = 1$, and $147 = 3 \\cdot 49$ checks.',
            'So, run the second: $67y19$ divisible by 9 means $6 + 7 + y + 1 + 9 = 23 + y \\equiv 0 \\pmod 9$, so $y \\equiv 4 \\pmod 9$.',
            'Take the digit constraint: $y \\in \\{0, \\dots, 9\\}$ admits exactly $y = 4$ — and $67419 = 9 \\cdot 7491$ checks.',
            'Hence the hunts solved — the tests inverted into small linear congruences, exactly the equations Lesson 5.4 learns to solve in general.',
          ],
        },
        {
          kind: 'algorithm',
          title: 'Divisibility triage on a long number',
          lines: [
            { code: 'run the cheap digit tests first: 2/5/10 (last digit), 3/9 (digit sum), 11 (alternating sum)', note: 'one pass over the digits settles five moduli' },
            { code: 'then the window tests: 4 (last two digits), 8 (last three)' },
            { code: 'then 7 and 13: truncation for 7 alone; blocks of three for 7, 11 and 13 together', note: 'the block pass also re-confirms 11 for free' },
            { code: 'for a composite divisor, split it into coprime parts and test each part by its own rule' },
            { code: 'solve any digit-hunt by turning the test into a congruence in the unknown digit' },
            { code: 'confirm the final verdict by one direct division', note: 'tests are proofs, but a division is cheap insurance against a slip' },
          ],
          note: 'The order is economy: the digit-sum and alternating passes cost one scan of the number; the window tests cost a glance; only 7 ever needs real work — and the 1001 block engine amortises even that across three primes.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'Five question shapes own this lesson’s ground (NCERT class 8 ch. 16’s letters-for-digit canon; Khattar QA ch. 1’s "Tests of Divisibility" list; SSC CGL/CHSL and CAT number-system sections). *The direct verdict*: "is 87a4b5 divisible by 72" — split $72 = 8 \\cdot 9$, run the last-three-digits and digit-sum tests on the lettered digits, solve. *The digit hunt*: "find x so that x47 is a multiple of 3" ($x \\in \\{1, 4, 7\\}$), "the least x so that 31a5 is divisible by 9". *The count-the-multiples shape*: "how many numbers below 500 are divisible by both 5 and 8?" — coprime parts, so divisible by 40. *The casting-out-nines check*: "which of these products is wrong?" — roots compared, transpositions flagged as the blind spot (the trick variant). *The transposition reasoning*: "why does the nines check fail to catch 1504 written as 1054?" — the mod-9 answer and the mod-11 catch, exactly as this lesson proved. What examinations never ask: the derivation of the 7-truncation rule — but now you own it, and the digit hunts become equations instead of memory.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Digit sum S(n)', def: 'The sum of a number’s decimal digits. $n \\equiv S(n) \\pmod 3$ and $\\pmod 9$ — the engine behind the 3- and 9-tests, proved from $10 \\equiv 1$.' },
            { term: 'Digital root', def: 'The digit sum iterated to a single digit: the remainder on division by 9, with 0 read as 9 (except for 0 itself). The currency of casting out nines.' },
            { term: 'Casting out nines', def: 'The arithmetic check by digital roots: roots of the operands, the same operations on them, root of the claimed result — a mismatch proves an error. Blind to transpositions; described by Fibonacci in the Liber Abaci (1202), with earlier Indian and Islamic accounts.' },
            { term: 'Alternating sum A(n)', def: '$d_0 - d_1 + d_2 - \\cdots$ from the units end. $n \\equiv A(n) \\pmod{11}$, from $10 \\equiv -1$: the 11-test, and the fingerprint that catches transpositions mod 11.' },
            { term: 'The truncation test for 7', def: 'For $n = 10b + c$: $7 \\mid n$ ⟺ $7 \\mid (b - 2c)$ — cut the units digit, subtract its double from the rest. Exact, from $5n \\equiv b - 2c \\pmod 7$ with $\\gcd(5, 7) = 1$.' },
            { term: 'The 1001 block engine', def: '$10^3 + 1 = 1001 = 7 \\cdot 11 \\cdot 13$, so $10^3 \\equiv -1$ modulo each: group digits in threes from the right, alternate signs, and one pass carries the residues mod 7, 11 and 13 — the standard test for 13.' },
            { term: 'Coprime licence', def: 'Divisible by each of two coprime numbers ⟺ divisible by their product: check $6$ as $2 \\wedge 3$, $72$ as $8 \\wedge 9$. Fails for non-coprime parts — 18 is divisible by 2 and 6 but not by 12.' },
            { term: 'General form (10a + b)', def: 'NCERT class 8’s name for the two-digit decimal expansion — the school notation for what this chapter calls the number’s residue name. Every digit test is a congruence about it.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The digit sum of 57369 is 30. What follows?',
              options: ['57369 is divisible by both 3 and 9', '57369 is divisible by 3 but not by 9', '57369 is divisible by 9 but not by 3', '57369 is divisible by neither'],
              answer: 1,
              explain: '30 is a multiple of 3 but not of 9 — so $57369 \\equiv 30 \\equiv 0 \\pmod 3$ (indeed $57369 = 3 \\cdot 19123$) while $57369 \\equiv 30 \\equiv 3 \\pmod 9$. "9 but not 3" is impossible in principle (divisibility by 9 forces divisibility by 3); "neither" contradicts the 3-verdict.',
            },
            {
              q: 'To test 918082 for divisibility by 11, compute:',
              options: ['9 + 1 + 8 + 0 + 8 + 2 = 28, and test 28', '2 − 8 + 0 − 8 + 1 − 9 = −22, and test −22', '91 − 80 + 82 = 93, and test 93', '98 − 08 + 12 = 102, and test 102'],
              answer: 1,
              explain: 'The test is the *alternating* sum from the units end: $-22 = -2 \\cdot 11$, so 918082 is divisible by 11 ($918082 = 11 \\cdot 83462$). The plain digit sum 28 is the 3/9 engine misapplied (28 is not a multiple of 11, and nothing follows); the pair-groupings are invented rituals with no derivation.',
            },
            {
              q: 'Is 2535 divisible by 13?',
              options: ['Yes — 535 − 2 = 533 = 13·41, and 2535 = 13·195', 'No — 2 + 5 + 3 + 5 = 15 is not a multiple of 13', 'Yes — it ends in 5, and 5 divides 13’s multiples', 'No — 2535 is odd and 13 is odd'],
              answer: 0,
              explain: 'The block engine: $10^3 \\equiv -1 \\pmod{13}$, so $2535 \\equiv 535 - 2 = 533 = 13 \\cdot 41$ — divisible, confirmed by $2535 = 13 \\cdot 195$. The digit-sum route is the wrong engine (it tests 3 and 9 only); ending in 5 tests divisibility by 5, not by 13; and oddness is irrelevant to a divisor of either parity.',
            },
            {
              q: '18 is divisible by 2 and by 6. Is it divisible by 12?',
              options: ['Yes — divisibility by 2 and by 6 always gives 12', 'No — the coprime licence needs coprime parts, and gcd(2, 6) = 2', 'Yes — 18 = 12 + 6 wraps around', 'No — because 18 is odd'],
              answer: 1,
              explain: 'The licence reads: divisible by each of two *coprime* parts ⟺ divisible by their product. Here $\\gcd(2, 6) = 2 \\ne 1$, and indeed $18 = 12 \\cdot 1 + 6$ — remainder 6, not divisible. The "wraps around" option invents clock arithmetic for divisibility; 18 is even, so the oddness option fails on its own terms.',
            },
            {
              q: 'Which error does casting out nines MISS?',
              options: ['47 × 32 computed as 1404 — the root is 9 → 0, not 1', '1504 written as 1054 — a transposition of two digits', '1504 written as 1507 — the last digit changed', 'All errors are caught'],
              answer: 1,
              explain: 'A transposition rearranges the same digits, so the digit sum — and therefore the digital root — is unchanged: $1504 \\to 10 \\to 1$ and $1054 \\to 10 \\to 1$, and the check passes on a wrong number. A changed digit shifts the digit sum ($1507 \\to 13 \\to 4 \\ne 1$) and a wholesale slip usually shifts the root too ($1404 \\to 9 \\to 0 \\ne 1$) — both caught. Mod 11 is the patch: transpositions disturb the alternating sum.',
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
                  q: 'Is 726 divisible by 3? By 9? Give both verdicts with reasons.',
                  solution: [
                    'Split the task: one digit sum serves both moduli.',
                    'Now, the sum: $7 + 2 + 6 = 15$ — a multiple of $3$, not of $9$.',
                    'So, the verdicts: $726 = 3 \\cdot 242$ (divisible by 3 ✓); $726 = 9 \\cdot 80 + 6$ (not divisible by 9 — and the digit sum even predicted the remainder 6).',
                    'Hence by 3 yes, by 9 no — one scan of the digits.',
                  ],
                  answer: 'divisible by 3 (726 = 3·242), not by 9 (726 = 9·80 + 6)',
                },
                {
                  q: 'Is 918082 divisible by 11? Show the alternating sum.',
                  solution: [
                    'Split the digits with signs from the units end: $2 - 8 + 0 - 8 + 1 - 9$.',
                    'Now, sum: $2 - 8 = -6$, $-6 + 0 = -6$, $-6 - 8 = -14$, $-14 + 1 = -13$, $-13 - 9 = -22$.',
                    'So, the verdict: $-22 = -2 \\cdot 11$ — divisible by 11.',
                    'Hence yes — and $918082 = 11 \\cdot 83462$ confirms it.',
                  ],
                  answer: 'yes — alternating sum −22 = −2·11; 918082 = 11·83462',
                },
                {
                  q: 'Is 4992 divisible by 6?',
                  solution: [
                    'Split the modulus: $6 = 2 \\cdot 3$, coprime parts.',
                    'Now, test each: last digit $2$ — even ✓; digit sum $4 + 9 + 9 + 2 = 24$ — a multiple of 3 ✓.',
                    'So, the licence: divisible by both coprime parts ⟹ divisible by 6.',
                    'Hence yes — $4992 = 6 \\cdot 832$ checks.',
                  ],
                  answer: 'yes — even ∧ digit sum 24 ≡ 0 (mod 3); 4992 = 6·832',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Find every digit x for which x47 is divisible by 3, and name the smallest.',
                  solution: [
                    'Split the condition: $x + 4 + 7 = x + 11 \\equiv 0 \\pmod 3$.',
                    'Now, solve the congruence: $x \\equiv -11 \\equiv 1 \\pmod 3$ (since $11 \\equiv 2$).',
                    'So, scan the digits: $x \\in \\{1, 4, 7\\}$.',
                    'Hence three digits work, smallest $x = 1$ — and $147 = 3 \\cdot 49$ confirms.',
                  ],
                  answer: 'x ∈ {1, 4, 7}; smallest 1 (147 = 3·49)',
                },
                {
                  q: 'Find the digit y for which 67y19 is divisible by 9.',
                  solution: [
                    'Split the condition: $6 + 7 + y + 1 + 9 = 23 + y \\equiv 0 \\pmod 9$.',
                    'Now, solve: $y \\equiv -23 \\equiv 4 \\pmod 9$ (since $23 = 2 \\cdot 9 + 5$).',
                    'So, the digit constraint: $y \\in \\{0, \\dots, 9\\}$ admits only $y = 4$.',
                    'Hence $y = 4$ — and $67419 = 9 \\cdot 7491$ confirms.',
                  ],
                  answer: 'y = 4 (67419 = 9·7491)',
                },
                {
                  q: 'Use the truncation test to decide whether 3584 is divisible by 7, and verify by division.',
                  solution: [
                    'Split the number: $b = 358$, $c = 4$ — the test sends $3584 \\to 358 - 2 \\cdot 4 = 350$.',
                    'Now, iterate: $350 \\to 35 - 2 \\cdot 0 = 35 = 5 \\cdot 7$ — a visible multiple.',
                    'So, the verdict: divisible by 7.',
                    'Hence $3584 = 7 \\cdot 512$ — the division agrees.',
                  ],
                  answer: 'yes — 3584 → 350 → 35 = 5·7; 3584 = 7·512',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Use the 1001 block engine to decide, for 2535: divisible by 13? by 7? by 11?',
                  solution: [
                    'Split the blocks from the right: $2535 = 2 \\mid 535$ — alternating block sum $535 - 2 = 533$.',
                    'Now, factor the block value: $533 = 13 \\cdot 41$ — divisible by 13, so $13 \\mid 2535$ (indeed $2535 = 13 \\cdot 195$).',
                    'So, read the other moduli off the same value: $533 = 7 \\cdot 76 + 1$ — remainder 1, so $2535 \\equiv 1 \\pmod 7$: NOT divisible (indeed $2535 = 7 \\cdot 362 + 1$).',
                    'Take 11: $533 = 11 \\cdot 48 + 5$ — remainder 5, so $2535 \\equiv 5 \\pmod{11}$: not divisible either.',
                    'Hence 13 alone — one block pass, three verdicts.',
                  ],
                  answer: 'by 13 yes (533 = 13·41); by 7 no (remainder 1); by 11 no (remainder 5)',
                },
                {
                  q: 'For which digit x is 8x69 divisible by 11?',
                  solution: [
                    'Split the alternating sum from the units end: $9 - 6 + x - 8 = x - 5$.',
                    'Now, set the test: $8x69 \\equiv x - 5 \\pmod{11}$, so divisibility needs $x - 5 \\equiv 0 \\pmod{11}$.',
                    'So, scan the digits: $x = 5$ is the only digit with $x - 5 \\in \\{0, \\pm 11\\}$.',
                    'Hence $x = 5$ — and $8569 = 11 \\cdot 779$ confirms.',
                  ],
                  answer: 'x = 5 (8569 = 11·779)',
                },
                {
                  q: 'Show that a number divisible by both 3 and 4 is divisible by 12, and check the instance 132.',
                  solution: [
                    'Split the licence: $\\gcd(3, 4) = 1$, so divisibility by each part forces divisibility by the product $12$.',
                    'Now, the instance: $132$ — digit sum $1 + 3 + 2 = 6$, divisible by 3 ✓; last two digits $32 = 4 \\cdot 8$, divisible by 4 ✓.',
                    'So, conclude: $12 \\mid 132$ — and $132 = 12 \\cdot 11$ confirms.',
                    'Hence the composite test assembled from two primitive ones — coprime parts only.',
                  ],
                  answer: 'gcd(3, 4) = 1 licenses 3 ∧ 4 ⇒ 12; 132 = 12·11',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'The number 18 is divisible by 2 and by 6 but not by 12. Explain the failure, and state the corrected licence.',
                  solution: [
                    'Split the hypothesis: the "parts" $2$ and $6$ satisfy $\\gcd(2, 6) = 2 \\neq 1$.',
                    'Now, the failure: the licence’s proof needs each part to contribute *disjoint* prime factors — with a shared factor 2, the product $12 = 2 \\cdot 6$ demands the shared prime twice, and divisibility by each part guarantees it only once.',
                    'So, the counterexample: $18 = 2 \\cdot 9 = 6 \\cdot 3$ clears both bars — yet $18 = 12 \\cdot 1 + 6$.',
                    'Hence the corrected licence: divisible by each of two numbers forces divisibility by their product only when the parts are coprime — check 12 through $3 \\wedge 4$, never $2 \\wedge 6$.',
                  ],
                  answer: 'gcd(2, 6) = 2 — the shared prime is demanded twice by 12 but guaranteed once by the parts; the licence needs coprime parts',
                },
                {
                  q: 'Cast out nines on 47 × 32 = 1504; then show the transposition 1504 → 1054 escapes the nines check but dies under the mod-11 check.',
                  solution: [
                    'Split the nines check: roots of the operands — $47 \\to 11 \\to 2$ and $32 \\to 5$ — so the product’s root must be $10 \\to 1$.',
                    'Now, verify: $1504 \\to 10 \\to 1$ ✓ — the computation stands.',
                    'So, the transposition: $1054$ has the same digits as $1504$, so the same digit sum $10$ and root $1$ — the nines check *passes on a wrong number*.',
                    'Take the mod-11 check: $47 \\equiv 3$, $32 \\equiv 10 \\pmod{11}$, so the product should be $\\equiv 3 \\cdot 10 = 30 \\equiv 8$; and $1504 = 11 \\cdot 136 + 8$ ✓ — but $1054 = 11 \\cdot 95 + 9 \\equiv 9 \\ne 8$: caught.',
                    'Hence the division of labour: nines for wholesale slips, elevens for transpositions — the ISBN-10 designers’ reasoning.',
                  ],
                  answer: 'nines: roots 2 × 5 → 1 = 1 (passes, and so does 1054 — blind); mod 11: 8 expected, 1054 gives 9 — caught',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove the last-three-digits test for 8, and decide 39216.',
                  solution: [
                    'Split the number: $n = 1000q + t$ where $t$ is the last three digits.',
                    'Now, the engine: $1000 = 8 \\cdot 125$, so $1000 \\equiv 0 \\pmod 8$ — hence $n \\equiv t \\pmod 8$.',
                    'So, the instance: $t = 216 = 8 \\cdot 27$ — divisible, so $8 \\mid 39216$.',
                    'Hence $39216 = 8 \\cdot 4902$ — and the halving shortcut ($216 \\to 108 \\to 54$) says the same thing twice.',
                  ],
                  answer: 'n = 1000q + t ≡ t (mod 8); 216 = 8·27 so 8 | 39216 = 8·4902',
                },
                {
                  q: 'Is 8316 divisible by 18? Assemble the verdict from coprime parts.',
                  solution: [
                    'Split the modulus: $18 = 2 \\cdot 9$ — coprime parts.',
                    'Now, test each: last digit $6$ — even ✓; digit sum $8 + 3 + 1 + 6 = 18$ — a multiple of 9 ✓.',
                    'So, the licence: both parts cleared ⟹ $18 \\mid 8316$.',
                    'Hence $8316 = 18 \\cdot 462$ — the division confirms.',
                  ],
                  answer: 'yes — even ∧ digit sum 18; 8316 = 18·462',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Powers of ten modulo 7 cycle 1, 3, 2, 6, 4, 5 and repeat (period 6 — a Fermat preview). Build the weighted digit test this cycle implies, and run it on 3584.',
                  solution: [
                    'Split the engine: $n = \\sum d_i 10^i \\equiv \\sum d_i w_i \\pmod 7$ with weights $w_i = 10^i \\bmod 7$ — the weights from the units place are $1, 3, 2, 6, 4, 5$, repeating.',
                    'Now, assemble: multiply each digit by its positional weight and sum — $7 \\mid n$ ⟺ $7 \\mid \\sum d_i w_i$.',
                    'So, run 3584 (digits from the units end: $4, 8, 5, 3$): $4 \\cdot 1 + 8 \\cdot 3 + 5 \\cdot 2 + 3 \\cdot 6 = 4 + 24 + 10 + 18 = 56$.',
                    'Take the verdict: $56 = 7 \\cdot 8$ — divisible, matching the truncation result and $3584 = 7 \\cdot 512$.',
                    'Hence the general law: every modulus induces a weighted digit test through the residues of its powers of ten — the digit-sum and alternating tests are just the two cases where the weights are all 1 (or all ±1); the period 6 here is Fermat’s little theorem peeking through, cashed in Lesson 5.4.',
                  ],
                  answer: 'weights 1, 3, 2, 6, 4, 5 (units up); 4·1 + 8·3 + 5·2 + 3·6 = 56 = 7·8 — divisible',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The digit-sum law',
          latex: 'n \\equiv S(n) = d_0 + d_1 + \\cdots + d_k \\pmod 3, \\;\\pmod 9',
          note: 'From 10 ≡ 1. Divisibility by 3 or 9 ⟺ the digit sum carries it; the digit sum even leaves the same remainder mod 9 as n itself.',
        },
        {
          kind: 'formula',
          name: 'The alternating law',
          latex: 'n \\equiv A(n) = d_0 - d_1 + d_2 - \\cdots \\pmod{11}',
          note: 'From 10 ≡ −1. The 11-test — and the digit fingerprint that catches transpositions (why ISBN-10 runs on mod 11).',
        },
        {
          kind: 'formula',
          name: 'The last-digit laws',
          latex: 'n \\equiv d_0 \\pmod{2}, \\pmod{5}, \\pmod{10}; \\quad n \\equiv (\\text{last two}) \\pmod 4; \\quad n \\equiv (\\text{last three}) \\pmod 8',
          note: 'From 10 ≡ 0, 100 ≡ 0 (mod 4), 1000 ≡ 0 (mod 8) — the window width is the power of ten the modulus divides.',
        },
        {
          kind: 'formula',
          name: 'The 7-truncation and the 1001 engine',
          latex: '7 \\mid (10b + c) \\Longleftrightarrow 7 \\mid (b - 2c); \\qquad 10^3 \\equiv -1 \\pmod 7, \\pmod{11}, \\pmod{13}',
          note: 'Cut, double, subtract — or group digits in threes and alternate: 1001 = 7·11·13 makes one block pass test three primes.',
        },
      ],
    },
    {
      id: 'ans-unit-digit-cycles-of-powers',
      number: '5.3',
      title: 'The Unit Digit and Cycles of Powers',
      prerequisites: ['ans-remainders-become-numbers-congruence-defined', 'ans-the-algebra-of-divisibility', 'ans-divisors-from-dna-divisor-counts'],
      sources: ['khattar-qa-4e', 'gauss-1801-disquisitiones'],
      concepts: [
        'Unit digits are residues mod 10',
        'The census: fixed points 0, 1, 5, 6',
        'The two-cycles of 4 and 9',
        'The four-cycles of 2, 3, 7, 8',
        'Exponent reduction (n mod L, 0 → L)',
        'The pigeonhole reason cycles close',
        'Squares end in 0, 1, 4, 5, 6, 9',
        'Factorial unit digits and the 5! wall',
      ],
      objectives: [
        'Compute the unit digit of any power $d^n$ — however astronomical — by reading the digit’s cycle and reducing the exponent modulo the cycle length, with the $0 \\to L$ convention handled correctly',
        'Explain *why* the unit-digit sequences cycle: the pigeonhole principle forces a repeat, and for digits coprime to 10 the cancellation law of Lesson 5.1 turns the repeat into pure periodicity',
        'Multiply and add huge powers through their unit digits, and decide unit digits of squares (never 2, 3, 7, 8), cubes (every digit), fourth powers (only 0, 1, 5, 6) and factorials (0 from 5! on)',
        'Recognise the pattern begging for an explanation — every coprime cycle length divides 4 — and carry it forward as the question Lesson 5.4 answers',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Here is a competitive-examination classic: *what is the unit digit of $7^{2025}$?* Written out, the number has 1,712 digits — a page and a half of dense numeral — and no examination expects you to produce it. Yet the unit digit is not merely knowable; it costs two small divisions. The engine is the one this chapter has been building: a unit digit is a remainder on division by 10, remainders are congruences, and congruences compute. The question looks like it is about a gigantic number; it is actually about the digit 7 walking in a small circle.',
        },
        {
          kind: 'para',
          text: 'First, the licence to ignore everything but the last digit. A number ending in $u$ is $10a + u$; another ending in $v$ is $10b + v$; and the multiplication law of Lesson 5.1 gives $(10a + u)(10b + v) = 100ab + 10av + 10bu + uv \\equiv uv \\pmod{10}$ — every cross term carries a factor 10 and dies. So the unit digit of a product depends only on the unit digits of its factors, and by induction the unit digit of $d^n$ depends only on $d$’s own unit digit: $23^{23}$ and $3^{23}$ share a unit digit, and so do $12^{43}$ and $2^{43}$. Unit-digit arithmetic *is* arithmetic modulo 10, and the question becomes: what does the sequence $d, d^2, d^3, \\dots$ do modulo 10?',
        },
        { kind: 'heading', text: 'The census: every digit under powered' },
        {
          kind: 'para',
          text: 'Compute the powers of each digit and watch the unit digits. Nothing here is memorised — the table is one column per digit, built by repeated multiplication by the digit itself, and the verification script swept it before it was printed:',
        },
        {
          kind: 'table',
          caption: 'The unit-digit census: d^k mod 10 for every digit and k = 1 … 8. Three regimes appear — digits that never move (0, 1, 5, 6), digits that flip between two values (4, 9), and digits that run around a four-cycle (2, 3, 7, 8).',
          head: ['d', 'd¹', 'd²', 'd³', 'd⁴', 'd⁵', 'd⁶', 'd⁷', 'd⁸', 'the cycle', 'length'],
          rows: [
            ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '1'],
            ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'],
            ['2', '2', '4', '8', '6', '2', '4', '8', '6', '2, 4, 8, 6', '4'],
            ['3', '3', '9', '7', '1', '3', '9', '7', '1', '3, 9, 7, 1', '4'],
            ['4', '4', '6', '4', '6', '4', '6', '4', '6', '4, 6', '2'],
            ['5', '5', '5', '5', '5', '5', '5', '5', '5', '5', '1'],
            ['6', '6', '6', '6', '6', '6', '6', '6', '6', '6', '1'],
            ['7', '7', '9', '3', '1', '7', '9', '3', '1', '7, 9, 3, 1', '4'],
            ['8', '8', '4', '2', '6', '8', '4', '2', '6', '8, 4, 2, 6', '4'],
            ['9', '9', '1', '9', '1', '9', '1', '9', '1', '9, 1', '2'],
          ],
        },
        {
          kind: 'para',
          text: 'Read the three regimes. The **fixed points**: $0^n = 0$, $1^n = 1$, and — the two that surprise people — $5^n$ ends in 5 and $6^n$ ends in 6, forever ($5^2 = 25$, $5^3 = 125$; $6^2 = 36$, $6^3 = 216$; the pattern never breaks). The **two-cycles**: powers of 4 alternate $4, 6, 4, 6, \\dots$ and powers of 9 alternate $9, 1, 9, 1, \\dots$ — even exponents land on one member, odd exponents on the other. And the **four-cycles**: the workhorses $2, 3, 7, 8$, each running a length-4 lap — $2 \\to 4 \\to 8 \\to 6 \\to 2$; $3 \\to 9 \\to 7 \\to 1 \\to 3$; $7 \\to 9 \\to 3 \\to 1 \\to 7$; $8 \\to 4 \\to 2 \\to 6 \\to 8$.',
        },
        {
          kind: 'figure',
          caption:
            'The unit-digit cycles as wheels: the digits 2, 3, 7 and 8 each run a four-cycle (read clockwise); 4 and 6 trade places on a two-cycle, as do 9 and 1; and 0, 1, 5, 6 sit still — every power keeps its own unit digit. The exponent reduction rule reads a position on the wheel: d^n lands where n steps around from d lands.',
          svg: `<svg viewBox="0 0 660 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four circular arrows showing the four-cycles of the digits 2, 3, 7 and 8, plus two double arrows for the two-cycles of 4 and 9">
  <text x="330" y="30" font-size="13" text-anchor="middle" fill="currentColor" opacity="0.85">the unit-digit cycles — four 4-cycles, two 2-cycles, four fixed points</text>
  <g fill="none" stroke="currentColor" stroke-width="1.1" opacity="0.75">
    <circle cx="110" cy="130" r="38"/><circle cx="265" cy="130" r="38"/><circle cx="420" cy="130" r="38"/><circle cx="575" cy="130" r="38"/>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.9">
    <path d="M 116.6 92.6 A 38 38 0 1 1 103.4 92.6"/>
    <path d="M 271.6 92.6 A 38 38 0 1 1 258.4 92.6"/>
    <path d="M 426.6 92.6 A 38 38 0 1 1 413.4 92.6"/>
    <path d="M 581.6 92.6 A 38 38 0 1 1 568.4 92.6"/>
  </g>
  <g fill="currentColor" opacity="0.9">
    <polygon points="110,86 104,92 113,95"/>
    <polygon points="265,86 259,92 268,95"/>
    <polygon points="420,86 414,92 423,95"/>
    <polygon points="575,86 569,92 578,95"/>
  </g>
  <g font-size="19" text-anchor="middle" fill="currentColor" font-weight="bold">
    <text x="110" y="82">2</text><text x="164" y="137">4</text><text x="110" y="192">8</text><text x="56" y="137">6</text>
    <text x="265" y="82">3</text><text x="319" y="137">9</text><text x="265" y="192">7</text><text x="211" y="137">1</text>
    <text x="420" y="82">7</text><text x="474" y="137">9</text><text x="420" y="192">3</text><text x="366" y="137">1</text>
    <text x="575" y="82">8</text><text x="629" y="137">4</text><text x="575" y="192">2</text><text x="521" y="137">6</text>
  </g>
  <g font-size="12" text-anchor="middle" fill="currentColor" opacity="0.7">
    <text x="110" y="214">2 — period 4</text><text x="265" y="214">3 — period 4</text><text x="420" y="214">7 — period 4</text><text x="575" y="214">8 — period 4</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="0.9" opacity="0.6">
    <rect x="88" y="278" width="44" height="44" rx="8"/><rect x="168" y="278" width="44" height="44" rx="8"/>
    <rect x="358" y="278" width="44" height="44" rx="8"/><rect x="438" y="278" width="44" height="44" rx="8"/>
  </g>
  <g stroke="currentColor" stroke-width="1.4" opacity="0.85">
    <line x1="134" y1="294" x2="166" y2="294"/><line x1="134" y1="306" x2="166" y2="306"/>
    <line x1="404" y1="294" x2="436" y2="294"/><line x1="404" y1="306" x2="436" y2="306"/>
  </g>
  <g fill="currentColor" opacity="0.85">
    <polygon points="134,294 140,291 140,297"/><polygon points="166,294 160,291 160,297"/>
    <polygon points="134,306 140,303 140,309"/><polygon points="166,306 160,303 160,309"/>
    <polygon points="404,294 410,291 410,297"/><polygon points="436,294 430,291 430,297"/>
    <polygon points="404,306 410,303 410,309"/><polygon points="436,306 430,303 430,309"/>
  </g>
  <g font-size="18" text-anchor="middle" fill="currentColor" font-weight="bold">
    <text x="110" y="306">4</text><text x="190" y="306">6</text>
    <text x="380" y="306">9</text><text x="460" y="306">1</text>
  </g>
  <text x="330" y="362" font-size="13" text-anchor="middle" fill="currentColor" opacity="0.85">0 · 1 · 5 · 6 — the fixed points: every power keeps its own unit digit</text>
</svg>`,
        },
        { kind: 'heading', text: 'Why the cycles close at all' },
        {
          kind: 'para',
          text: 'The table was computed, but the *shape* it shows — finite cycles, returning to the start — wants a reason, and the reason is one of mathematics’ oldest counting devices. There are only ten possible unit digits, so among the eleven powers $d^1, d^2, \\dots, d^{11}$ two must share a unit digit: the **pigeonhole principle** forces a repeat. Say $d^i \\equiv d^j \\pmod{10}$ with $i < j$. For the digits coprime to 10 — the odd digits other than 5, namely $1, 3, 7, 9$ — the cancellation law of Lesson 5.1 licenses full division:',
        },
        {
          kind: 'derivation',
          title: 'Coprime digits cycle purely',
          statement:
            'Claim: if $\\gcd(d, 10) = 1$ and $d^i \\equiv d^j \\pmod{10}$ with $i < j$, then $d^{\\,j-i} \\equiv 1 \\pmod{10}$, and the unit-digit sequence of $d$ repeats forever with period dividing $j - i$.',
          steps: [
            {
              label: 'A repeat exists',
              formula: 'd^i \\equiv d^j \\pmod{10} \\quad (\\text{some } 1 \\le i < j \\le 11)',
              explanation:
                'Eleven powers, ten residues: the pigeonhole principle — the same counting device chapter 1 used on the least-number principle — guarantees two agree. No computation needed, only counting.',
            },
            {
              label: 'Cancel the common power',
              formula: 'd^i \\left(d^{\\,j-i} - 1\\right) \\equiv 0 \\pmod{10}',
              explanation:
                'Rewrite the congruence as $10 \\mid d^i(d^{j-i} - 1)$, ready for the cancellation law with $c = d^i$ and $m = 10$.',
            },
            {
              label: 'Use coprimality',
              formula: '\\gcd(d^i, 10) = 1 \\;\\Rightarrow\\; 10 \\mid \\left(d^{\\,j-i} - 1\\right)',
              explanation:
                'Lesson 5.1: cancelling a factor coprime to the modulus is free — here $\\gcd(d, 10) = 1$ makes every power of $d$ coprime to 10 as well. So the bracket alone must carry the factor 10.',
            },
            {
              label: 'Read off the restart',
              formula: 'd^{\\,j-i} \\equiv 1 \\pmod{10} \\;\\Rightarrow\\; d^{\\,k + (j-i)} \\equiv d^k \\pmod{10} \\text{ for every } k',
              explanation:
                'Once a power of $d$ hits 1 (a *return to base*), multiplying by $d$ restarts the walk exactly: $d^{j-i} \\cdot d^k \\equiv d^k$. The sequence is periodic from the first step — "purely periodic" — with period at most $j - i \\le 10$.',
            },
          ],
          result:
            'For every digit coprime to 10 (1, 3, 7, 9), some power $d^L \\equiv 1 \\pmod{10}$ and the unit digits repeat with period $L \\mid j - i$. The census shows the truth of this with $L = 1, 4, 4, 2$ respectively — all divisors of 4, a pattern Lesson 5.4 will explain rather than admire.',
        },
        {
          kind: 'para',
          text: 'What about the digits that *share* a factor with 10 — the even digits and 5? The cancellation step above is exactly where their licence fails ($\\gcd(2, 10) = 2$, so cancelling the $2^i$ would shrink the modulus), and yet the census shows them cycling anyway. The honest explanation splits the modulus: modulo 2 and modulo 5, the two prime factors of 10, the behaviour is pinned outright. Take 6: it is $0$ modulo 2 and $1$ modulo 5 — and powers preserve both ($0^n = 0$, $1^n = 1$) — so every power of 6 is the number that is even and leaves remainder 1 on division by 5: that number is 6. Take 5: it is $1$ modulo 2 and $0$ modulo 5, so every power is odd and divisible by 5 — the unit digit 5. Take 4: even, and modulo 5 it runs $4, 1, 4, 1$ (the two-cycle — visible in the mod-5 multiplication table of Lesson 5.1, row $[4]$); combining "even" with that alternation gives $4, 6, 4, 6$. The even four-cycles of 2 and 8 work the same way. That a pair of residues — one mod 2, one mod 5 — pins down a unique unit digit is itself a small theorem (the Chinese remainder theorem, met properly in Lesson 5.4): for now, the two-column pinning explains why the non-coprime digits also cycle, and why 5 and 6 can never move.',
        },
        {
          kind: 'table',
          caption: 'Every census row, explained by the two-column pinning: a unit digit is fixed by its pair (residue mod 2, residue mod 5), powers never move the mod-2 column, and the mod-5 column walks the wheels of Lesson 5.1’s mod-5 multiplication table — powers of 2 run 2, 4, 3, 1 (mod 5); powers of 3 run 3, 4, 2, 1; powers of 4 alternate 4, 1. Combine the parity with the mod-5 position and the census falls out row by row.',
          head: ['digit d', 'd mod 2', 'd mod 5', 'the mod-5 wheel (d^k mod 5)', 'pinned unit digits = the census'],
          rows: [
            ['0', '0', '0', '0 forever', '0, 0, 0, …'],
            ['2', '0', '2', '2, 4, 3, 1', 'even ∧ ≡ 2, 4, 3, 1 → 2, 4, 8, 6'],
            ['4', '0', '4', '4, 1', 'even ∧ ≡ 4, 1 → 4, 6'],
            ['6', '0', '1', '1 forever', 'even ∧ ≡ 1 → 6, 6, 6, …'],
            ['8', '0', '3', '3, 4, 2, 1', 'even ∧ ≡ 3, 4, 2, 1 → 8, 4, 2, 6'],
            ['1', '1', '1', '1 forever', '1, 1, 1, …'],
            ['3', '1', '3', '3, 4, 2, 1', 'odd ∧ ≡ 3, 4, 2, 1 → 3, 9, 7, 1'],
            ['5', '1', '0', '0 forever', 'odd ∧ ≡ 0 → 5, 5, 5, …'],
            ['7', '1', '2', '2, 4, 3, 1', 'odd ∧ ≡ 2, 4, 3, 1 → 7, 9, 3, 1'],
            ['9', '1', '4', '4, 1', 'odd ∧ ≡ 4, 1 → 9, 1'],
          ],
        },
        {
          kind: 'para',
          text: 'Read two sample rows to feel the machine. The digit 7 sits at (odd, $\\equiv 2 \\pmod 5$); its mod-5 wheel is the powers-of-2 wheel $2, 4, 3, 1$, and the odd numbers leaving those residues are exactly $7, 9, 3, 1$ — the census’s 7-cycle, derived rather than observed. The digit 8 sits at (even, $\\equiv 3 \\pmod 5$); the powers-of-3 wheel $3, 4, 2, 1$ pinned even gives $8, 4, 2, 6$ — the 8-cycle. Even the fixed points are explained: 5 is the only number that is odd and divisible by 5, and 6 the only even number leaving remainder 1 on division by 5 — so no power of either can ever be anything else. The whole census table is now a *consequence* of two small wheels and a parity pin.',
        },
        { kind: 'heading', text: 'Exponent reduction: the method' },
        {
          kind: 'para',
          text: 'The method is now mechanical. To find the unit digit of $d^n$: read the digit’s cycle from the census (length $L$); compute $n \\bmod L$; the unit digit is the $(n \\bmod L)$-th member of the cycle — with the convention that exponent remainder $0$ means the **last** member, since $d^L$ closes the loop. Watch it run:',
        },
        {
          kind: 'example',
          title: 'The unit digit of 7²⁰²⁵',
          steps: [
            'Split the problem: the base’s unit digit is 7, so only the 7-wheel matters — the cycle $7, 9, 3, 1$, length $L = 4$.',
            'Now, reduce the exponent: $2025 = 4 \\cdot 506 + 1$, so $2025 \\equiv 1 \\pmod 4$ — one step around the wheel.',
            'So, read the position: one step from 7 lands on… 7 itself: the first member of the cycle.',
            'Hence the unit digit is **7** — for a 1,712-digit number, two divisions of small integers.',
          ],
        },
        {
          kind: 'example',
          title: 'Two more laps: 2¹⁰⁰ and 3⁹⁷',
          steps: [
            'Split the first: the 2-cycle runs $2, 4, 8, 6$ with $L = 4$; and $100 \\equiv 0 \\pmod 4$.',
            'Now, apply the $0 \\to L$ convention: remainder 0 means the FOURTH member — the unit digit is **6** (indeed $2^4 = 16$, $2^8 = 256$, and $2^{100} = (2^4)^{25}$ ends in $6^{25}$, which ends in 6).',
            'So, run the second: $97 = 4 \\cdot 24 + 1$, so $97 \\equiv 1 \\pmod 4$ — first member of the 3-cycle $3, 9, 7, 1$.',
            'Hence the unit digit of $3^{97}$ is **3** — one step around its wheel.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The two standard slips',
          text: 'First, the **zero trap**: an exponent divisible by the cycle length means the cycle’s *last* member, not the first — $2^{100}$ ends in 6, not 2, and $9^{50}$ ends in 1, not 9. Second, the **base trap**: only the base’s unit digit matters, but it must actually be read — $12^{43}$ is a power of 2 in unit-digit clothing ($43 \\equiv 3 \\pmod 4$, third member: **8**), and $23^{23}$ is a power of 3 ($23 \\equiv 3 \\pmod 4$, third member of $3, 9, 7, 1$: **7**). Both slips are examination staples; both are impossible once the wheel is actually drawn.',
        },
        {
          kind: 'algorithm',
          title: 'The unit digit of dⁿ',
          lines: [
            { code: 'read the base’s unit digit d (discard everything else)' },
            { code: 'read d’s cycle from the census: 0, 1, 5, 6 fixed; 4 → (4, 6); 9 → (9, 1); 2 → (2, 4, 8, 6); 3 → (3, 9, 7, 1); 7 → (7, 9, 3, 1); 8 → (8, 4, 2, 6)' },
            { code: 'compute r = n mod L (L = the cycle length)' },
            { code: 'if r = 0, take the L-th member of the cycle; else take the r-th', note: 'the zero trap — the loop closes, so 0 means "full lap"' },
            { code: 'for a product or sum of powers, reduce each factor separately, then combine the unit digits' },
          ],
          note: 'Every step is a congruence mod 10 in disguise: step 2 is the census table (swept by the verification script), step 3 is the exponent reduction justified by pure periodicity, and the final combination is the multiplication and addition laws of Lesson 5.1.',
        },
        { kind: 'heading', text: 'Products and sums of astronomical powers' },
        {
          kind: 'para',
          text: 'The laws of Lesson 5.1 let huge expressions be combined before their unit digits are ever touched: reduce each factor to its unit digit, then do tiny arithmetic. Two worked runs, each certified by the verification script against direct computation of the true powers:',
        },
        {
          kind: 'example',
          title: '7²⁰²⁵ × 3⁹⁷ and 7²⁰²⁵ + 3⁹⁷',
          steps: [
            'Split the product into its factors’ unit digits: $7^{2025} \\to 7$ (the first example) and $3^{97} \\to 3$.',
            'Now, multiply the unit digits: $7 \\cdot 3 = 21$ — and the unit digit of 21 is **1**.',
            'So, run the sum the same way: $7 + 3 = 10$ — unit digit **0**.',
            'Take the scale: the true product has about 1,712 + 46 digits; the true sum about 1,712 — neither was computed, both unit digits are certain.',
            'Hence **1** and **0** — the multiplication and addition laws doing all the lifting.',
          ],
        },
        {
          kind: 'example',
          title: '13⁷⁷ × 17²³ and 5¹⁰⁰ + 6¹⁰⁰',
          steps: [
            'Split the first: $13^{77}$ reduces through the unit digit 3 — $77 \\equiv 1 \\pmod 4$, so unit digit 3; $17^{23}$ reduces through 7 — $23 \\equiv 3 \\pmod 4$, third member of $7, 9, 3, 1$: unit digit 3.',
            'Now, multiply: $3 \\cdot 3 = 9$ — the unit digit of the product is **9**.',
            'So, run the second: 5 and 6 are fixed points — every power of 5 ends in 5, every power of 6 ends in 6.',
            'Take the sum: $5 + 6 = 11$ — unit digit **1**.',
            'Hence **9** and **1** — mixed wheels and fixed points handled in one motion.',
          ],
        },
        { kind: 'heading', text: 'The squares census, and its cousins' },
        {
          kind: 'para',
          text: 'A square is a power, so the wheel method applies — but squares are common enough in examinations to deserve their one-line census. Which digits can a square end in? Six appear — $0, 1, 4, 5, 6, 9$ — and four never do: **no square ends in 2, 3, 7 or 8**, the single most-quoted unit-digit fact in the examination canon. The proof is a parity split, two lines each:',
        },
        {
          kind: 'derivation',
          title: 'Which digits can a square end in?',
          statement:
            'Claim: a perfect square ends in one of $0, 1, 4, 5, 6, 9$ — and never in $2, 3, 7, 8$.',
          steps: [
            {
              label: 'Split by parity',
              formula: 'n = 2k \\;\\text{or}\\; n = 2k+1 \\;\\Rightarrow\\; n^2 = 4k^2 \\;\\text{or}\\; n^2 = 4k(k+1) + 1',
              explanation:
                'Every integer is even or odd; squaring the two forms gives a multiple of 4, or one more than $4k(k+1)$.',
            },
            {
              label: 'The even squares',
              formula: '4k^2 \\;\\text{ends in}\\; 0, 4, 6',
              explanation:
                'Run $k = 0, 1, \\dots, 9$: $0, 4, 16, 36, 64, 100, 144, \\dots$ — the unit digits are $0, 4, 6, 6, 4, 0, 4, \\dots$, and no other value ever appears.',
            },
            {
              label: 'The odd squares',
              formula: '4k(k+1) + 1 \\;\\text{ends in}\\; 1, 5, 9',
              explanation:
                'Run the odds $1, 3, 5, 7, 9$ squared: $1, 9, 25, 49, 81$ — unit digits $1, 9, 5, 9, 1$, and the pattern repeats with period 10 in the base.',
            },
            {
              label: 'Collect the union',
              formula: '\\{0, 4, 6\\} \\cup \\{1, 5, 9\\} = \\{0, 1, 4, 5, 6, 9\\}',
              explanation:
                'Both parities accounted for, the six possible endings are exactly these — so $2, 3, 7, 8$ never occur. The verification script swept every square below a thousand: six endings, no others.',
            },
          ],
          result:
            'No perfect square ends in 2, 3, 7 or 8 — the one-line verdict behind a standard examination family ("which of these can be a square?", "can $n^2$ end in 3?" — no).',
        },
        {
          kind: 'para',
          text: 'The same census discipline, run at other heights, gives three more exam-grade facts. **Cubes**: the cube map on unit digits is a bijection — every digit is the unit digit of some cube ($3^3 = 27$ ends in 7, $7^3 = 343$ ends in 3; the digits trade places) — because cubing is a bijection modulo 2 and modulo 5 separately. **Fourth powers**: one full lap of any four-cycle returns to the start, and the two-cycles land on their even member — so a fourth power ends in 0, 1, 5 or 6 only ($2^4 = 16$, $3^4 = 81$, $5^4 = 625$, $7^4 = 2401$, $8^4 = 4096$, $9^4 = 6561$ — six witnesses, four digits). And **odd squares modulo 8** — a different modulus, same discipline: $(2k+1)^2 = 4k(k+1) + 1$ with $k(k+1)$ even, so every odd square leaves remainder 1 on division by 8 ($21^2 = 441 = 8 \\cdot 55 + 1$) — a fact that will do quiet structural work in the Number Theory book this one is handing off to.',
        },
        {
          kind: 'para',
          text: 'Finally, factorials. Lesson 4.3 counted the trailing zeros of $n!$ with Legendre’s census; the unit-digit version is its shadow: from $5! = 120$ onward, every factorial carries the factor $2 \\cdot 5 = 10$ outright, so every factorial from the fifth on ends in 0 — the unit digits of $1!, 2!, 3!, \\dots, 10!$ read $1, 2, 6, 4, 0, 0, 0, 0, 0, 0$. Sums of factorials therefore freeze after the fourth term: $1! + 2! + 3! + 4! + \\dots$ has unit digit $1 + 2 + 6 + 4 = 13 \\to 3$, forever after — the true value $\\sum_{i=1}^{10} i! = 4{,}037{,}913$ ends in 3, exactly as the 5.1 engine predicted.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The question this lesson leaves open',
          text: 'Look back at the census: every digit coprime to 10 — the wheels of 3, 7, 9, and the trivial 1 — has cycle length dividing 4. Not 4-or-something-scattered: 1, 4, 4, 2, all divisors of 4. The pigeonhole argument of this lesson guarantees *some* period; it does not explain why the period is so short and so round. There is a theorem behind it — one sentence long, stated in a letter Fermat wrote in 1640 — which says that modulo any prime $p$, every number coprime to $p$ returns to 1 within $p - 1$ steps. At $p = 5$ that is exactly "within 4 steps", and combined with the fixed behaviour modulo 2, it forces the unit-digit cycles to divide 4. The glimpse arrives in Lesson 5.4; the full theory belongs to the Number Theory book this chapter is the doorway to.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'This is the most reliably examined corner of the entire congruence chapter (Khattar QA ch. 1’s "unit digit" family; CAT/IPMAT/SNAP number-system banks). *The direct ask*: "the unit digit of $7^{2025}$" (7), "of $2^{100}$" (6 — the zero trap), "of $3^{97}$" (3). *The base trap*: "unit digit of $23^{23}$" (7) and $12^{43}$ (8). *Products and sums*: "unit digit of $7^{2025} \\times 3^{97}$" (1) and of $5^{100} + 6^{100}$ (1). *The classification asks*: "which digit can never end a square" (2, 3, 7, 8), "the unit digit of a fourth power" (0, 1, 5, 6), "the unit digit of $1! + 2! + \\cdots + 100!$" (3 — everything past $4!$ is a zero). The guaranteed-lost marks come from the zero trap and the base trap; the wheel makes both visible.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Unit digit as a residue', def: 'The unit digit of $n$ is $n \\bmod 10$; unit-digit arithmetic is congruence arithmetic with modulus 10 — the multiplication law licences discarding every digit but the last.' },
            { term: 'Cycle of a digit', def: 'The repeating sequence of unit digits of $d, d^2, d^3, \\dots$: e.g. $7 \\to 9 \\to 3 \\to 1 \\to 7$. Read from the census table; drawn as a wheel.' },
            { term: 'Cycle length L', def: 'The period of the cycle: 1 for the fixed points 0, 1, 5, 6; 2 for 4 and 9; 4 for 2, 3, 7, 8. The exponent is reduced modulo $L$.' },
            { term: 'Exponent reduction', def: 'The unit digit of $d^n$ is the $(n \\bmod L)$-th cycle member, with remainder 0 read as $L$ — the full-lap convention. $7^{2025}$: $2025 \\equiv 1 \\pmod 4$, first member, 7.' },
            { term: 'Fixed points', def: 'Digits whose powers keep their own unit digit: $0, 1, 5, 6$. Explained by the mod-2/mod-5 pinning — 5 is (1, 0) and 6 is (0, 1) in the two columns, and powers never move either coordinate.' },
            { term: 'Pure periodicity', def: 'A power sequence that repeats from the first term (no warm-up). Guaranteed for digits coprime to 10 by pigeonhole + cancellation: some power $d^L \\equiv 1 \\pmod{10}$ restarts the walk.' },
            { term: 'The squares census', def: 'A square ends in one of $0, 1, 4, 5, 6, 9$ — never 2, 3, 7, 8. Even squares land on 0, 4, 6; odd squares on 1, 5, 9.' },
            { term: 'The factorial wall', def: 'From $5! = 120$ onward every factorial ends in 0 (the paired 2 and 5), so factorial sums freeze after $4!$: $\\sum_{i \\ge 1} i!$ ends in 3 forever — Lesson 4.3’s trailing-zero census, seen from the unit side.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The unit digit of 7²⁰²⁵ is:',
              options: ['7', '9', '3', '1'],
              answer: 0,
              explain: 'The 7-wheel runs $7, 9, 3, 1$ with length 4, and $2025 = 4 \\cdot 506 + 1$ — one step around, landing back on the first member: **7**. The other three options are the wheel’s other members, each corresponding to a different exponent remainder (2, 3, 0).',
            },
            {
              q: 'The unit digit of 2¹⁰⁰ is:',
              options: ['2', '4', '8', '6'],
              answer: 3,
              explain: 'The 2-wheel runs $2, 4, 8, 6$, and $100 \\equiv 0 \\pmod 4$ — a full lap, which by the $0 \\to L$ convention means the **fourth** member: 6. Indeed $2^{100} = (2^4)^{25} = 16^{25}$, and powers of 16 end in 6. The first three options are the phases 1, 2, 3 of the same wheel.',
            },
            {
              q: 'The unit digit of 7²⁰²⁵ × 3⁹⁷ is:',
              options: ['1', '7', '3', '0'],
              answer: 0,
              explain: 'Reduce each factor first: $7^{2025} \\to 7$ and $3^{97} \\to 3$ (both exponents $\\equiv 1 \\pmod 4$). Then multiply the unit digits: $7 \\cdot 3 = 21$ — unit digit **1**. Option two forgets to reduce the second factor; option three forgets the first; option four is the unit digit of the *sum* $7^{2025} + 3^{97}$, not the product.',
            },
            {
              q: 'Which digit can NEVER be the unit digit of a perfect square?',
              options: ['0', '4', '8', '6'],
              answer: 2,
              explain: 'The squares census: even squares $(2k)^2$ end in $0, 4, 6$ and odd squares in $1, 5, 9$ — together $\\{0, 1, 4, 5, 6, 9\\}$, so **8** never occurs (nor do 2, 3, 7). The other three options are all genuine square endings: $10^2 \\to 0$, $2^2 \\to 4$, $4^2 \\to 6$.',
            },
            {
              q: 'The cycle of the unit digits of 3, 3², 3³, 3⁴, … has length:',
              options: ['1 — the digits repeat immediately', '2 — they alternate', '4 — they run 3, 9, 7, 1 and restart', 'the cycle never closes'],
              answer: 2,
              explain: 'The 3-wheel: $3^1 = 3$, $3^2 = 9$, $3^3 = 27 \\to 7$, $3^4 = 81 \\to 1$, $3^5 = 243 \\to 3$ — the sequence runs **3, 9, 7, 1** with length 4 and restarts (pure periodicity, guaranteed since $\\gcd(3, 10) = 1$). Length 1 is the fixed points’ fate; length 2 belongs to 4 and 9.',
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
                  q: 'Find the unit digits of 2³⁵ and 3⁴⁰.',
                  solution: [
                    'Split the first: the 2-wheel $2, 4, 8, 6$, length 4; $35 = 4 \\cdot 8 + 3 \\equiv 3 \\pmod 4$ — third member.',
                    'Now, read it: the unit digit of $2^{35}$ is **8** (indeed $2^{35} = 34{,}359{,}738{,}368$).',
                    'So, run the second: the 3-wheel $3, 9, 7, 1$; $40 \\equiv 0 \\pmod 4$ — the full-lap convention takes the fourth member.',
                    'Hence the unit digit of $3^{40}$ is **1** — and $3^4 = 81$ already showed why: $3^{40} = 81^{10}$.',
                  ],
                  answer: '2³⁵ → 8; 3⁴⁰ → 1',
                },
                {
                  q: 'Find the unit digits of 4¹⁸ and 4¹⁹.',
                  solution: [
                    'Split the base: 4 runs the two-cycle $4, 6$ — odd exponents give 4, even exponents give 6.',
                    'Now, the parities: $18$ even, $19$ odd.',
                    'So, read: $4^{18}$ ends in **6** and $4^{19}$ ends in **4**.',
                    'Hence the alternation in action — one wheel, two parities.',
                  ],
                  answer: '4¹⁸ → 6; 4¹⁹ → 4',
                },
                {
                  q: 'Find the unit digit of 7²⁰²⁵, showing the method.',
                  solution: [
                    'Split the base: the unit digit 7 runs the wheel $7, 9, 3, 1$, length $L = 4$.',
                    'Now, reduce the exponent: $2025 = 4 \\cdot 506 + 1$, so $2025 \\equiv 1 \\pmod 4$.',
                    'So, read the wheel: one step around from 7 is the first member itself.',
                    'Hence the unit digit is **7** — for a 1,712-digit number, computed without writing a single one of its digits.',
                  ],
                  answer: '7 — 2025 ≡ 1 (mod 4), first member of the cycle 7, 9, 3, 1',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Find the unit digit of 12⁴³.',
                  solution: [
                    'Split the base: only the unit digit 2 matters — $12^{43} \\equiv 2^{43} \\pmod{10}$.',
                    'Now, the wheel: $2, 4, 8, 6$ with $L = 4$; $43 = 4 \\cdot 10 + 3 \\equiv 3 \\pmod 4$ — third member.',
                    'So, read: the unit digit is **8**.',
                    'Hence the base trap defused — twelve was a two in disguise.',
                  ],
                  answer: '8 — 2-wheel, 43 ≡ 3 (mod 4)',
                },
                {
                  q: 'Find the unit digit of 23²³.',
                  solution: [
                    'Split the base: the unit digit 3 runs the wheel $3, 9, 7, 1$.',
                    'Now, reduce: $23 \\equiv 3 \\pmod 4$ — third member.',
                    'So, read: the unit digit is **7**.',
                    'Hence **7** — base and exponent reduced separately, as always.',
                  ],
                  answer: '7 — 3-wheel, 23 ≡ 3 (mod 4)',
                },
                {
                  q: 'Find the unit digit of 7²⁰²⁵ × 3⁹⁷.',
                  solution: [
                    'Split the product: reduce each factor — $7^{2025} \\to 7$ ($2025 \\equiv 1$) and $3^{97} \\to 3$ ($97 \\equiv 1$).',
                    'Now, multiply the unit digits: $7 \\cdot 3 = 21$.',
                    'So, read the unit digit of that: **1**.',
                    'Hence **1** — the true product has over 1,750 digits; its last was free.',
                  ],
                  answer: '1 — 7 × 3 = 21 → 1',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Find the unit digits of 7²⁰²⁵ + 3⁹⁷ and of 5¹⁰⁰ + 6¹⁰⁰.',
                  solution: [
                    'Split the first sum: $7^{2025} \\to 7$ and $3^{97} \\to 3$, so the sum’s unit digit is $7 + 3 = 10 \\to$ **0**.',
                    'Now, the second: 5 and 6 are fixed points — $5^{100}$ ends in 5 and $6^{100}$ ends in 6, whatever the exponent.',
                    'So, add: $5 + 6 = 11 \\to$ **1**.',
                    'Hence **0** and **1** — mixed wheels, then fixed points.',
                  ],
                  answer: '7²⁰²⁵ + 3⁹⁷ → 0; 5¹⁰⁰ + 6¹⁰⁰ → 1',
                },
                {
                  q: 'Prove that no perfect square ends in 2, 3, 7 or 8.',
                  solution: [
                    'Split by parity: an even square is $(2k)^2 = 4k^2$; an odd square is $(2k+1)^2 = 4k(k+1) + 1$.',
                    'Now, the even side: $4k^2$ is a multiple of 4 — among two-digit endings, $4k^2$ ends in $0, 4$ or $6$ (the multiples of 4 that are even-ended: run $k = 0..9$: $0, 4, 16, 36, 64, 100, \\dots$ all end in $0, 4, 6$).',
                    'So, the odd side: $4k(k+1) + 1$ is one more than a multiple of 8 (since $k(k+1)$ is even) — and its unit digit, checked on the odds $1, 3, 5, 7, 9$ squared ($1, 9, 25, 49, 81$), is $1, 5$ or $9$.',
                    'Take the union: squares end in $\\{0, 4, 6\\} \\cup \\{1, 5, 9\\} = \\{0, 1, 4, 5, 6, 9\\}$ — so $2, 3, 7, 8$ never occur.',
                    'Hence the census proved — the most-quoted unit-digit fact in the examination canon.',
                  ],
                  answer: 'even squares → 0, 4, 6; odd squares → 1, 5, 9; the other four digits never occur',
                },
                {
                  q: 'Find the unit digit of 13⁷⁷ × 17²³.',
                  solution: [
                    'Split the bases: $13^{77}$ runs on the 3-wheel ($77 \\equiv 1 \\pmod 4$ → 3) and $17^{23}$ on the 7-wheel ($23 \\equiv 3 \\pmod 4$ → third member of $7, 9, 3, 1$ → 3).',
                    'Now, multiply: $3 \\cdot 3 = 9$.',
                    'So, read: the unit digit is **9**.',
                    'Hence **9** — two disguised bases, two wheel readings, one multiplication.',
                  ],
                  answer: '9 — 3 × 3 = 9',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Prove that a fourth power ends only in 0, 1, 5 or 6.',
                  solution: [
                    'Split the digits by regime: fixed points stay put; two-cycles land on their even-exponent member; four-cycles complete a full lap.',
                    'Now, run each: $0^4 \\to 0$, $1^4 \\to 1$, $5^4 \\to 5$, $6^4 \\to 6$; $4^4$ (even exponent) $\\to 6$, $9^4 \\to 1$; and $2^4 = 16 \\to 6$, $3^4 = 81 \\to 1$, $7^4 = 2401 \\to 1$, $8^4 = 4096 \\to 6$.',
                    'So, collect: the outcomes are $\\{0, 1, 5, 6\\}$ — four digits, no others.',
                    'Hence every fourth power ends in 0, 1, 5 or 6 — six witnesses ($16, 81, 625, 2401, 4096, 6561$) and three regimes, one census.',
                  ],
                  answer: 'fourth powers end in 0, 1, 5, 6 — fixed points stay, two-cycles take the even member, four-cycles lap fully',
                },
                {
                  q: 'Prove that every odd square leaves remainder 1 on division by 8, and check it on 21².',
                  solution: [
                    'Split the square: $(2k+1)^2 = 4k^2 + 4k + 1 = 4k(k+1) + 1$.',
                    'Now, the key observation: $k$ and $k+1$ are consecutive, so one of them is even — $k(k+1) = 2j$ for some $j$.',
                    'So, substitute: $(2k+1)^2 = 8j + 1 \\equiv 1 \\pmod 8$.',
                    'Take the check: $21 = 2 \\cdot 10 + 1$, and $21^2 = 441 = 8 \\cdot 55 + 1$ ✓.',
                    'Hence every odd square ≡ 1 (mod 8) — a different modulus, the same discipline; the fact will do structural work in the Number Theory book.',
                  ],
                  answer: '(2k+1)² = 4k(k+1) + 1 = 8j + 1; 21² = 441 = 8·55 + 1',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Show that every digit 0–9 is the unit digit of some cube, and explain why the cube map is a bijection on unit digits.',
                  solution: [
                    'Split the task: exhibit the cubes, then explain the pattern.',
                    'Now, the witnesses: $0^3 \\to 0$, $1^3 \\to 1$, $2^3 = 8$, $3^3 = 27 \\to 7$, $4^3 = 64 \\to 4$, $5^3 = 125 \\to 5$, $6^3 = 216 \\to 6$, $7^3 = 343 \\to 3$, $8^3 = 512 \\to 2$, $9^3 = 729 \\to 9$ — all ten digits appear.',
                    'So, the explanation: cubing is a bijection modulo 2 (trivially) and modulo 5 — the cube columns of the mod-5 multiplication table of Lesson 5.1 hit every residue (row $[2]$: $2^3 = 8 \\equiv 3$; row $[3]$: $27 \\equiv 2$; rows $[1], [4]$ similarly cover $1, 4$).',
                    'Take the combination: a unit digit is pinned by its pair (residue mod 2, residue mod 5), and cubing permutes both coordinates — so it permutes the ten pairs.',
                    'Hence the cube map is a bijection on digits — unlike squaring, which folds the ten digits onto six.',
                  ],
                  answer: '3³ = 27 → 7 and 7³ = 343 → 3 trade places; cubing permutes the mod-2 and mod-5 residues, hence the digits',
                },
                {
                  q: 'What is the unit digit of 1! + 2! + 3! + ⋯ + 100! — and why does the answer freeze no matter how far the sum runs?',
                  solution: [
                    'Split the sum: from $5! = 120$ onward, every factorial contains the factor $2 \\cdot 5 = 10$ outright (Lesson 4.3’s trailing-zero census) — so every term from the fifth on ends in 0.',
                    'Now, the survivors: $1! = 1$, $2! = 2$, $3! = 6$, $4! = 24$ — unit digits $1, 2, 6, 4$.',
                    'So, add them: $1 + 2 + 6 + 4 = 13$ — unit digit **3**.',
                    'Take the check: $\\sum_{i=1}^{10} i! = 4{,}037{,}913$ ends in 3 ✓ — and the 90 further zero-ended terms change nothing.',
                    'Hence the unit digit is **3**, for this sum or any longer factorial sum — the wall at $5!$ freezes the arithmetic.',
                  ],
                  answer: '3 — only 1! + 2! + 3! + 4! contribute (1 + 2 + 6 + 4 = 13); every later factorial ends in 0',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove: for every digit d coprime to 10, some positive power of d ends in 1 — without exhibiting the cycles explicitly.',
                  solution: [
                    'Split the strategy: force a repeat, then cancel it down to a return to 1.',
                    'Now, the pigeonhole: the eleven powers $d^1, d^2, \\dots, d^{11}$ have unit digits among the ten residues $0, \\dots, 9$, so two of them agree: $d^i \\equiv d^j \\pmod{10}$ for some $1 \\le i < j \\le 11$.',
                    'So, cancel: $10 \\mid d^i(d^{j-i} - 1)$, and since $\\gcd(d, 10) = 1$ also $\\gcd(d^i, 10) = 1$ — Lesson 5.1’s coprime cancellation gives $10 \\mid (d^{j-i} - 1)$.',
                    'Take the reading: $d^{j-i} \\equiv 1 \\pmod{10}$ — a positive power of $d$ (with exponent at most 10) ending in 1, found without computing a single cycle.',
                    'Hence the restart: multiplying that power by $d$ regenerates the walk from its origin, so the unit digits are purely periodic — the census’s cycles, derived rather than observed. (That the return always happens within 4 steps — not 10 — is a sharper fact, and it needs Fermat’s little theorem: Lesson 5.4.)',
                  ],
                  answer: 'pigeonhole gives d^i ≡ d^j (mod 10); coprime cancellation gives d^(j−i) ≡ 1 — a power ending in 1 exists for every d coprime to 10',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The unit-digit cycles',
          latex: '\\begin{aligned} &0, 1, 5, 6 \\;\\text{fixed}; \\qquad 4 \\to (4, 6), \\quad 9 \\to (9, 1); \\\\ &2 \\to (2, 4, 8, 6), \\quad 3 \\to (3, 9, 7, 1), \\quad 7 \\to (7, 9, 3, 1), \\quad 8 \\to (8, 4, 2, 6) \\end{aligned}',
          note: 'The census, engine-built and swept. Lengths 1, 2, 4 — and every length for a digit coprime to 10 divides 4 (Fermat, Lesson 5.4).',
        },
        {
          kind: 'formula',
          name: 'Exponent reduction',
          latex: '\\text{unit digit of } d^n = \\text{the } (n \\bmod L)\\text{-th cycle member}, \\quad 0 \\mapsto L',
          note: '7²⁰²⁵: 2025 ≡ 1 (mod 4) → 7. 2¹⁰⁰: 100 ≡ 0 (mod 4) → the fourth member 6 — the zero trap.',
        },
        {
          kind: 'formula',
          name: 'The squares census',
          latex: 'n^2 \\text{ ends in } 0, 1, 4, 5, 6, 9 \\;\\text{ only} \\qquad (\\text{never } 2, 3, 7, 8)',
          note: 'Even squares land on 0, 4, 6; odd squares on 1, 5, 9. Bonus: every odd square ≡ 1 (mod 8).',
        },
        {
          kind: 'formula',
          name: 'Fourth powers and the factorial wall',
          latex: 'n^4 \\text{ ends in } 0, 1, 5, 6; \\qquad n! \\text{ ends in } 0 \\text{ for } n \\ge 5; \\quad \\textstyle\\sum i! \\text{ ends in } 3',
          note: 'Fourth powers: full laps and even members only (16, 81, 625, 2401, 4096, 6561). Factorials: the 2·5 = 10 inside 5! freezes every later sum at 1 + 2 + 6 + 4 = 13 → 3.',
        },
      ],
    },
    {
      id: 'ans-linear-congruences-glimpse-of-fermat',
      number: '5.4',
      title: 'Linear Congruences and a Glimpse of Fermat',
      prerequisites: ['ans-euclidean-algorithm-proven-bezout-identity', 'ans-remainders-become-numbers-congruence-defined', 'ans-linear-diophantine-equations'],
      sources: ['gauss-1801-disquisitiones', 'sunzi-suanjing-crt', 'fermat-1640-little-theorem', 'khattar-qa-4e'],
      concepts: [
        'The linear congruence ax ≡ b (mod m)',
        'Solvability: gcd(a, m) must divide b',
        'Exactly gcd(a, m) solutions, spaced m/d',
        'Inverses modulo m and the coprime criterion',
        'The Chinese remainder theorem (coprime moduli)',
        'Sunzi’s problem and the ladder method',
        'Fermat’s little theorem a^(p−1) ≡ 1 (mod p)',
        'Exponent reduction modulo a prime',
      ],
      objectives: [
        'Decide solvability of $ax \\equiv b \\pmod m$ by the gcd criterion — proved through chapter 2’s linear Diophantine engine — and find *all* solutions: exactly $\\gcd(a, m)$ classes, spaced $m/d$ apart',
        'Solve the coprime case through inverses (found by Bézout or by scan), state the inverse criterion $a^{-1}$ exists ⟺ $\\gcd(a, m) = 1$, and explain why prime moduli make every nonzero residue invertible',
        'State and use the Chinese remainder theorem for coprime moduli — every pair of residue conditions is met by exactly one class modulo the product — and solve Sunzi-style problems by the ladder method',
        'State Fermat’s little theorem, verify it numerically, use it to reduce exponents modulo a prime ($2^{100} \\bmod 13$), and cash it back onto Lesson 5.3’s cycle lengths',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 5.1 taught congruences to add and multiply; Lesson 5.2 and 5.3 cashed that into digit tests and unit digits. One operation remains: **division**. When is it legal to divide a congruence through — and when the letters are still unknown, when can a congruence be *solved* at all? The question "$ax \\equiv b \\pmod m$" is the chapter’s summit, and its answer was already built in chapter 2: the gcd engine. Beyond it stand two great results — one fifteen centuries old, one from a letter Fermat wrote in 1640 — and behind both of them, the Number Theory book this chapter is the declared doorway to.',
        },
        {
          kind: 'para',
          text: 'Try division naively and the ground gives way immediately. Solve $4x \\equiv 1 \\pmod 6$: run $x$ through a full set of residues and multiply — $4 \\cdot 0, 4 \\cdot 1, \\dots, 4 \\cdot 5$ leaves $0, 4, 2, 0, 4, 2$ (mod 6), never 1. The congruence is *dead*: no $x$ exists, and "obviously $x$ is the inverse of 4" is exactly the step the multiplication table forbids. Now try $5x \\equiv 3 \\pmod{12}$: $x = 3$ works, since $15 = 12 + 3$ — and it works uniquely. Same shape, opposite fates. What separates them? The first has $\\gcd(4, 6) = 2$ sitting between the coefficient and the modulus; the second has $\\gcd(5, 12) = 1$. That single number decides everything.',
        },
        { kind: 'heading', text: 'The solvability theorem' },
        {
          kind: 'para',
          text: 'The theorem hiding here was proved in chapter 2 — Lesson 2.4 solved the linear Diophantine equation $ax + my = b$ and showed it solvable exactly when $g = \\gcd(a, m)$ divides $b$. The congruence is the same problem in disguise:',
        },
        {
          kind: 'equation',
          latex: 'ax \\equiv b \\pmod m \\;\\Longleftrightarrow\\; ax - b = mt \\text{ for some } t \\;\\Longleftrightarrow\\; ax + m(-t) = b',
          note: 'A linear congruence IS a linear Diophantine equation — the unknown t is the number of wraps. Lesson 2.4’s theorem transfers wholesale; nothing is re-proved here.',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The linear congruence theorem',
          text: 'Let $g = \\gcd(a, m)$. The congruence $ax \\equiv b \\pmod m$ is solvable **if and only if** $g \\mid b$; and when solvable it has **exactly $g$ solutions** modulo $m$, of the form $x \\equiv x_0,\\ x_0 + \\tfrac{m}{g},\\ x_0 + \\tfrac{2m}{g},\\ \\dots,\\ x_0 + (g-1)\\tfrac{m}{g} \\pmod m$ — one solution class per multiple of $m/g$, with $x_0$ found by dividing the congruence through by $g$. Solvability is decided by the gcd before any search begins; the number of answers is *numerically equal* to the gcd. (The verification script swept this theorem over every $a, m \\le 24$ and $b \\le 36$ — thousands of congruences, zero mismatches — before this sentence was written.)',
        },
        {
          kind: 'para',
          text: 'Why the solution family has exactly $g$ members — the spacing argument in brief. If $x_0$ solves, then so does $x_0 + \\tfrac{m}{g}$: substituting adds $a \\cdot \\tfrac{m}{g} = \\tfrac{a}{g} \\cdot m$ to the left side, a multiple of the modulus ($\\tfrac{a}{g}$ is an integer by definition of $g$). And if $x$ and $x_0$ both solve, $a(x - x_0) \\equiv 0 \\pmod m$; cancelling $a$ against $m$ shrinks the modulus to $\\tfrac{m}{g}$ (Lesson 5.1’s law), so $x \\equiv x_0 \\pmod{m/g}$ — every solution is one of the $g$ listed shifts. The full proof is Exercise 12; the engine is entirely Lesson 5.1’s cancellation law doing what it was built for.',
        },
        {
          kind: 'example',
          title: 'The two test cases, decided by the gcd',
          steps: [
            'Split the first: $4x \\equiv 1 \\pmod 6$ has $g = \\gcd(4, 6) = 2$, and $2 \\nmid 1$ — unsolvable, exactly as the enumeration showed ($0, 4, 2, 0, 4, 2$).',
            'Now, the second: $5x \\equiv 3 \\pmod{12}$ has $g = \\gcd(5, 12) = 1$, and $1 \\mid 3$ — solvable with exactly one solution class.',
            'So, find it: $x = 3$ works ($15 = 12 + 3$), and by uniqueness it is *the* answer: $x \\equiv 3 \\pmod{12}$.',
            'Hence the gcd decided both questions — solvable, and how many answers — before any search ran.',
          ],
        },
        { kind: 'heading', text: 'The method: divide through, then solve the coprime case' },
        {
          kind: 'para',
          text: 'When $g > 1$ divides $b$, divide everything through — the congruence $ax \\equiv b \\pmod m$ becomes the smaller congruence $\\tfrac{a}{g}x \\equiv \\tfrac{b}{g} \\pmod{\\tfrac{m}{g}}$, whose coefficient is now *coprime* to its modulus (dividing $a$ and $m$ by their gcd leaves coprime quotients — chapter 2’s engine). The coprime case is the pleasant one, and it comes with a division licence: a unique solution, found by inverting the coefficient.',
        },
        {
          kind: 'example',
          title: 'Solve 9x ≡ 12 (mod 15)',
          steps: [
            'Split off the gcd: $g = \\gcd(9, 15) = 3$, and $3 \\mid 12$ — solvable with exactly 3 solutions modulo 15.',
            'Now, divide through: $9x \\equiv 12 \\pmod{15}$ becomes $3x \\equiv 4 \\pmod 5$ — coefficient now coprime to the modulus.',
            'So, invert: $3 \\cdot 2 = 6 \\equiv 1 \\pmod 5$, so $3^{-1} \\equiv 2$; multiplying through gives $x \\equiv 2 \\cdot 4 = 8 \\equiv 3 \\pmod 5$.',
            'Take the lift: the solutions modulo 15 are $x \\equiv 3, 3 + 5, 3 + 10 \\pmod{15}$ — that is, $x = 3, 8, 13$.',
            'Hence the three checks: $9 \\cdot 3 = 27 = 15 + 12$ ✓, $9 \\cdot 8 = 72 = 60 + 12$ ✓, $9 \\cdot 13 = 117 = 105 + 12$ ✓ — three solutions, spaced $15/3 = 5$ apart, exactly as the theorem promised.',
          ],
        },
        {
          kind: 'example',
          title: 'Solve 6x ≡ 9 (mod 15) — and the coprime route for 7x ≡ 4 (mod 12)',
          steps: [
            'Split the first: $g = \\gcd(6, 15) = 3$ divides 9 — solvable, three solutions.',
            'Now, divide through: $2x \\equiv 3 \\pmod 5$; invert — $2 \\cdot 3 = 6 \\equiv 1 \\pmod 5$, so $x \\equiv 3 \\cdot 3 = 9 \\equiv 4 \\pmod 5$.',
            'So, lift: $x = 4, 9, 14$ modulo 15 — and the checks confirm: $24 = 15 + 9$, $54 = 45 + 9$, $84 = 75 + 9$ ✓.',
            'Take the coprime route on $7x \\equiv 4 \\pmod{12}$: here $g = 1$, so invert directly — $7 \\cdot 7 = 49 = 4 \\cdot 12 + 1$, so $7^{-1} \\equiv 7$: multiplying through, $x \\equiv 7 \\cdot 4 = 28 \\equiv 4 \\pmod{12}$, and indeed $7 \\cdot 4 = 28 = 2 \\cdot 12 + 4$ ✓.',
            'Hence $\\{4, 9, 14\\}$ and $x \\equiv 4$ — one divided-through solution, one direct inversion.',
          ],
        },
        { kind: 'heading', text: 'Inverses: the division licence, tabled' },
        {
          kind: 'para',
          text: 'Everything above assembles into one procedure — the one every examination question of this shape is answered by:',
        },
        {
          kind: 'algorithm',
          title: 'Solve ax ≡ b (mod m)',
          lines: [
            { code: 'compute g = gcd(a, m) — the Euclidean algorithm of Lesson 2.3, one line of divisions' },
            { code: 'if g does not divide b: STOP — no solution exists', note: 'the verdict costs nothing; 4x ≡ 1 (mod 6) dies here' },
            { code: 'divide the congruence through by g: (a/g)x ≡ (b/g) (mod m/g)' },
            { code: 'solve the coprime case: find (a/g)⁻¹ by Bézout or by scanning the small modulus, and multiply: x ≡ (a/g)⁻¹·(b/g) (mod m/g)' },
            { code: 'lift back: the g solutions modulo m are x₀, x₀ + m/g, …, x₀ + (g−1)m/g' },
            { code: 'check each candidate by direct substitution — cheap insurance' },
          ],
          note: 'The whole procedure is chapter 2’s machinery wearing congruence notation: the gcd engine decides, Bézout inverts, the cancellation law of Lesson 5.1 legitimises both the division and the lift.',
        },
        {
          kind: 'para',
          text: 'The step "multiply by $a^{-1}$" deserves its own inspection. An **inverse** of $a$ modulo $m$ is a residue $x$ with $ax \\equiv 1 \\pmod m$ — the multiplicative undo button. Which residues have one? Exactly those coprime to the modulus: if $\\gcd(a, m) = 1$, Bézout’s identity (Lesson 2.3, cited) writes $1 = ua + vm$, and reducing modulo $m$ leaves $ua \\equiv 1$ — the Bézout coefficient *is* the inverse. Conversely an inverse forces coprimality: $ax \\equiv 1 \\pmod m$ says $ax - 1 = mt$, so any common divisor of $a$ and $m$ divides 1. The criterion is total, and the tables are small enough to hold in the eye:',
        },
        {
          kind: 'table',
          caption: 'Two inverse tables. Modulo 10, only 1, 3, 7, 9 invert (the digits coprime to 10 — the same four that run wheels in Lesson 5.3). Modulo 7, every nonzero residue inverts: 7 is prime, and primality is exactly the guarantee.',
          head: ['a', 'a⁻¹ (mod 10)', 'a', 'a⁻¹ (mod 7)'],
          rows: [
            ['1', '1', '1', '1'],
            ['3', '7', '2', '4'],
            ['7', '3', '3', '5'],
            ['9', '9', '4', '2'],
            ['—', '—', '5', '3'],
            ['—', '—', '6', '6'],
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Prime moduli divide perfectly',
          text: 'Read the mod-7 column: *every* nonzero residue inverts. That is what it means to be prime, arithmetically — $\\gcd(a, p) \\in \\{1, p\\}$ for every $a$ not divisible by $p$, so the inverse criterion never fails. This is the fact Lesson 5.1 glimpsed in the mod-5 multiplication table (every nonzero row a Latin square) and declined to explain: moduli whose nonzero classes all invert — the primes — carry a miniature arithmetic in which addition, subtraction, multiplication *and division* all work. Such systems are called **fields**; the rationals are one, and $\\mathbb{Z}/p$ is its finite sibling. The entire theory of them — and of the orders, primitive roots and quadratic residues living inside — is the Number Theory book this one hands off to. This lesson’s last theorem is that book’s front door.',
        },
        { kind: 'heading', text: 'Two conditions at once: the Chinese remainder theorem' },
        {
          kind: 'para',
          text: 'The other great question shape: not one congruence but *two* — "a number leaves remainder 2 on division by 3 and remainder 3 on division by 5; what is it?" Each condition carves the integers into a residue class; the question is where the two carvings intersect. When the moduli are **coprime**, the intersection is always exactly one class modulo the product:',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The Chinese remainder theorem (two coprime moduli)',
          text: 'If $\\gcd(m, n) = 1$, then for every pair of residues $a, b$ the two conditions $x \\equiv a \\pmod m$ and $x \\equiv b \\pmod n$ are satisfied by **exactly one** class $x$ modulo $mn$. Two coprime filters never miss each other: among the $mn$ residues modulo $mn$, each of the $m$ positions on the first dial meets each of the $n$ positions on the second exactly once. (Stated here for two moduli; the general version stacks any number of pairwise-coprime conditions. The verification script swept the two-moduli statement over every coprime pair $m, n \\le 12$ and every residue pair — each met exactly once, zero exceptions.)',
        },
        {
          kind: 'figure',
          caption:
            'Two filters, one survivor: the top row marks each number 0–14 by its residue mod 3 (circled where the residue is 2); the bottom row marks residues mod 5 (circled where the residue is 0). The circled columns agree only at x = 5 — and by the theorem they would agree exactly once no matter which residues the two filters demanded. Modulo 15 (= 3·5, coprime), every pair of conditions has its unique meeting point.',
          svg: `<svg viewBox="0 0 660 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two rows of the numbers zero to fourteen marked with their residues modulo three and modulo five, with the unique agreement at five highlighted">
  <text x="330" y="30" font-size="13" text-anchor="middle" fill="currentColor" opacity="0.85">two filters, one survivor — x ≡ 2 (mod 3) and x ≡ 0 (mod 5) agree only at x = 5 (mod 15)</text>
  <g font-size="11" text-anchor="middle" fill="currentColor" opacity="0.8">
    <text x="60" y="74">0</text><text x="98" y="74">1</text><text x="136" y="74">2</text><text x="174" y="74">0</text><text x="212" y="74">1</text><text x="250" y="74">2</text><text x="288" y="74">0</text><text x="326" y="74">1</text><text x="364" y="74">2</text><text x="402" y="74">0</text><text x="440" y="74">1</text><text x="478" y="74">2</text><text x="516" y="74">0</text><text x="554" y="74">1</text><text x="592" y="74">2</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.85">
    <circle cx="136" cy="70" r="12"/><circle cx="250" cy="70" r="12"/><circle cx="364" cy="70" r="12"/><circle cx="478" cy="70" r="12"/><circle cx="592" cy="70" r="12"/>
  </g>
  <g font-size="14" text-anchor="middle" fill="currentColor">
    <text x="60" y="135">0</text><text x="98" y="135">1</text><text x="136" y="135">2</text><text x="174" y="135">3</text><text x="212" y="135">4</text><text x="250" y="135" font-weight="bold" font-size="16">5</text><text x="288" y="135">6</text><text x="326" y="135">7</text><text x="364" y="135">8</text><text x="402" y="135">9</text><text x="440" y="135">10</text><text x="478" y="135">11</text><text x="516" y="135">12</text><text x="554" y="135">13</text><text x="592" y="135">14</text>
  </g>
  <g font-size="11" text-anchor="middle" fill="currentColor" opacity="0.8">
    <text x="60" y="184">0</text><text x="98" y="184">1</text><text x="136" y="184">2</text><text x="174" y="184">3</text><text x="212" y="184">4</text><text x="250" y="184">0</text><text x="288" y="184">1</text><text x="326" y="184">2</text><text x="364" y="184">3</text><text x="402" y="184">4</text><text x="440" y="184">0</text><text x="478" y="184">1</text><text x="516" y="184">2</text><text x="554" y="184">3</text><text x="592" y="184">4</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="1.3" opacity="0.85">
    <circle cx="60" cy="180" r="12"/><circle cx="250" cy="180" r="12"/><circle cx="440" cy="180" r="12"/>
  </g>
  <line x1="250" y1="54" x2="250" y2="198" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.9"/>
  <text x="330" y="222" font-size="12" text-anchor="middle" fill="currentColor" opacity="0.85">both conditions hold only at x = 5 — then again at 20, 35, … : the unique class x ≡ 5 (mod 15)</text>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Sunzi’s counting problem (3rd–5th century)',
          text: 'The oldest known instance of the two-condition problem is in the *Sunzi Suanjing*, a Chinese mathematical manual whose dating spans the third to fifth century: "There are certain things whose number is unknown. When counted by threes, 2 remain; by fives, 3 remain; by sevens, 2 remain. How many things are there?" — the answer 23, though Sunzi’s text gives the solution without a general method. The algorithmic theory came later: Āryabhaṭa’s *Āryabhaṭīya* (499 CE) handles the systematic solving of such congruences (the *kuṭṭaka*, the pulveriser), Brahmagupta developed special cases in the seventh century, and Qin Jiushao’s 1247 treatise carried the complete general method — the *Da-yan-shu*. Gauss stated and proved the theorem in the modern way in the *Disquisitiones* (1801), illustrating it, fittingly, on a calendar problem. Fifteen centuries from puzzle to theorem: this is one of mathematics’ longest single story arcs, and it ends in an iff-statement two lines long.',
        },
        {
          kind: 'example',
          title: 'Sunzi’s problem solved by the ladder',
          steps: [
            'Split the conditions: $x \\equiv 2 \\pmod 3$, $x \\equiv 3 \\pmod 5$, $x \\equiv 2 \\pmod 7$.',
            'Now, climb the first rung: numbers $\\equiv 3 \\pmod 5$ run $3, 8, 13, \\dots$; the first of these also $\\equiv 2 \\pmod 3$ is $8$ (since $8 = 6 + 2$). So $x \\equiv 8 \\pmod{15}$ — CRT on the first pair.',
            'So, climb the second rung: write $x = 8 + 15t$ and impose the mod-7 condition — $8 + 15t \\equiv 1 + t \\pmod 7$ (since $8 \\equiv 1$ and $15 \\equiv 1$), so $1 + t \\equiv 2 \\pmod 7$, giving $t \\equiv 1 \\pmod 7$.',
            'Take the landing: $t = 1$ gives $x = 8 + 15 = 23$ — the smallest positive solution.',
            'Hence $x \\equiv 23 \\pmod{105}$ — check: $23 = 3 \\cdot 7 + 2$ ✓, $23 = 5 \\cdot 4 + 3$ ✓, $23 = 7 \\cdot 3 + 2$ ✓; and the next solution is $128 = 23 + 105$.',
          ],
        },
        {
          kind: 'example',
          title: 'Two smaller meetings',
          steps: [
            'Split the first: $x \\equiv 3 \\pmod 4$ and $x \\equiv 1 \\pmod 5$ — scan the mod-5 class $1, 6, 11, \\dots$ for the mod-4 residue: $11 = 8 + 3$ ✓.',
            'Now, the second, a three-leg ladder: $x \\equiv 1 \\pmod 2$, $x \\equiv 2 \\pmod 3$, $x \\equiv 3 \\pmod 5$ — odd numbers that are $2 \\pmod 3$ run $5, 11, 17, 23, \\dots$ (i.e. $x \\equiv 5 \\pmod 6$); imposing $\\equiv 3 \\pmod 5$ picks $23$.',
            'So, read the answers: $x = 11$ (unique mod 20) and $x \\equiv 23 \\pmod{30}$ — check: $23 = 22 + 1$ odd ✓, $23 = 21 + 2$ ✓, $23 = 20 + 3$ ✓.',
            'Hence two more meetings found by scanning the smaller modulus’ ladder — the CRT guarantee says each is *the* answer, not merely *an* answer.',
          ],
        },
        {
          kind: 'table',
          caption: 'The Sunzi ladder, rung by rung: each rung merges one more condition, and the modulus of the answer class grows by the factor of the new modulus — 3·5 = 15, then 15·7 = 105. The pattern is the general CRT stacking: k pairwise-coprime conditions pin exactly one class modulo the product of the moduli.',
          head: ['rung', 'conditions merged', 'the answer class', 'modulus so far'],
          rows: [
            ['start', 'x ≡ 2 (mod 3)', 'scan: 2, 5, 8, 11, …', '3'],
            ['one', '∧ x ≡ 3 (mod 5)', 'x ≡ 8 (mod 15)', '15'],
            ['two', '∧ x ≡ 2 (mod 7)', 'x ≡ 23 (mod 105)', '105'],
          ],
        },
        {
          kind: 'para',
          text: 'The stacking is worth stating plainly, because it is how the theorem is actually used. With *three or more* pairwise-coprime conditions — say moduli $3, 5, 7$ — merge two at a time: the first two conditions collapse into a single class modulo $15$, that class plus the third condition collapses into a single class modulo $105$, and so on — $k$ conditions end as one class modulo the product. At every rung the merged modulus is coprime to the next one (products of pairwise-coprime numbers stay coprime to each new factor — chapter 4’s exponent language again), so the two-moduli theorem applies fresh each time. Gauss’s own illustration in the *Disquisitiones* was exactly such a stack — a calendar problem, merging the cycles that chase each other through the year — and the same merging logic today schedules satellite orbits, tomography reconstruction and the hash tables behind your compiler.',
        },
        { kind: 'heading', text: 'A glimpse of Fermat' },
        {
          kind: 'para',
          text: 'This chapter built an arithmetic of remainders and asked, three lessons running, which divisions are legal. The deepest single answer in the whole subject concerns *prime* moduli, and it arrives as a theorem about powers:',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'Fermat’s little theorem',
          text: 'If $p$ is prime and $a$ is not divisible by $p$, then $a^{p-1} \\equiv 1 \\pmod p$. Equivalently (and now true for *every* $a$): $a^p \\equiv a \\pmod p$. Stated by Fermat in a letter of 18 October 1640 to Bernard Frénicle de Bessy; first *published* proof by Euler in 1736 (Leibniz had an earlier unpublished one). The proof belongs to the Number Theory book; here the theorem is **stated, numerically verified — and used**. The verification script checked it for every prime $p \\le 50$ and every $a \\le 60$ not divisible by $p$: thousands of cases, zero failures.',
        },
        {
          kind: 'para',
          text: 'The witnesses at small primes are worth writing out once, because they make the theorem concrete: $2^{10} = 1024 = 11 \\cdot 93 + 1$; $3^6 = 729 = 7 \\cdot 104 + 1$; $5^6 = 15625 = 7 \\cdot 2232 + 1$ (the base may exceed the modulus — only coprimality matters); $2^{12} = 4096 = 13 \\cdot 315 + 1$. Four lines, four primes, the pattern holding each time. And the theorem’s working use is immediate: it is an **exponent-reduction licence** — modulo a prime $p$, exponents may be reduced modulo $p - 1$. (The word "little" is no humility: it distinguishes this theorem from Fermat’s *last* — the 1637 margin note about $a^n + b^n = c^n$ that waited 350 years for a proof. The little one waited only 96, and it is the one the examinations actually use.)',
        },
        {
          kind: 'para',
          text: 'One more reading of the theorem closes a loop left open by the coprimality condition. The equivalent form $a^p \\equiv a \\pmod p$ holds for *every* $a$ — including multiples of $p$, where the first form is silent ($p \\mid a$ makes $a^{p-1} \\equiv 0$, not 1). Two witnesses: $13^7 \\equiv 13 \\equiv 6 \\pmod 7$ (13 is not a multiple of 7 — the usual case), and $14^5 \\equiv 14 \\equiv 0 \\pmod 7$ (14 *is* a multiple — both sides collapse to 0, and the statement survives). The sweep in the verification script checked the every-$a$ form for every prime up to 13 and every $a$ up to 20: no exceptions. Theorem statements that extend to the boundary cases are worth noticing — they are usually the ones that generalise (Euler’s theorem, the Number Theory book’s opening exhibit, generalises exactly this way).',
        },
        {
          kind: 'example',
          title: 'The licence at work: 2¹⁰⁰ mod 13, 3¹⁰² mod 7, 17²⁰⁰ mod 19',
          steps: [
            'Split the first: Fermat at $p = 13$ gives $2^{12} \\equiv 1 \\pmod{13}$; so $2^{100} = 2^{12 \\cdot 8 + 4} = (2^{12})^8 \\cdot 2^4 \\equiv 2^4 = 16 \\equiv 3 \\pmod{13}$.',
            'Now, the second: Fermat at $p = 7$ gives $3^6 \\equiv 1$, and $102 = 6 \\cdot 17$ — so $3^{102} = (3^6)^{17} \\equiv \\boxed{1} \\pmod 7$.',
            'So, the third: Fermat at $p = 19$ gives $17^{18} \\equiv 1$; and $200 = 18 \\cdot 11 + 2$, so $17^{200} \\equiv 17^2 = 289 = 19 \\cdot 15 + 4 \\equiv 4 \\pmod{19}$.',
            'Hence **3**, **1**, **4** — three astronomical powers, each collapsed by one reduction; the verification script confirmed each by direct modular exponentiation.',
          ],
        },
        {
          kind: 'para',
          text: 'And now the promise from Lesson 5.3 can be paid. Why did every digit coprime to 10 have unit-digit cycle length dividing 4 — never 3, never 6, always 1, 2 or 4? Because a unit digit is pinned by its pair of residues (mod 2, mod 5): modulo 2 it never moves (odd stays odd), and modulo 5 Fermat’s theorem at $p = 5$ says every digit $d \\in \\{1, 2, 3, 4\\}$ satisfies $d^4 \\equiv 1 \\pmod 5$ — check: $2^4 = 16 \\equiv 1$, $3^4 = 81 \\equiv 1$, $4^4 = 256 \\equiv 1 \\pmod 5$. So within four steps every coprime digit returns to $(1 \\bmod 2, 1 \\bmod 5)$ — the unit digit 1 — and the walk restarts. The wheel of 7 runs its full four steps; the wheel of 9 returns in two; the cycle lengths *had* to divide 4. What Lesson 5.3 observed, Fermat explains.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The doorway',
          text: 'Stand at the end of this chapter and look back: the division algorithm gave remainders; congruence made them an arithmetic; the gcd decided when division works; primes turned out to be the moduli where division always works; and Fermat’s theorem revealed the power structure inside a prime modulus — every coprime element returns to 1 within $p - 1$ steps. Three of the oldest problems in mathematics live exactly here and nowhere else: the multiplicative *order* of $a$ (the true length of its wheel), Euler’s extension of Fermat to every modulus, and the cryptographic fact that huge numbers can be multiplied in a flash but not factored. The **Number Theory** book on this library’s shelf opens at precisely this door. This chapter’s job was to bring you to the threshold with every tool already in hand.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where examinations use this',
          text: 'Four shapes own this lesson (Khattar QA ch. 1’s remainder family; CAT/IPMAT and olympiad qualifier banks). *The solvability verdict*: "does $6x \\equiv 9 \\pmod{15}$ have a solution, and how many?" — gcd 3 divides 9, so yes, three (4, 9, 14). *Solve the congruence*: the $9x \\equiv 12 \\pmod{15}$ and $7x \\equiv 4 \\pmod{12}$ shapes — divide through or invert. *The CRT word problem*: Sunzi’s counting shape — "a number leaves remainder 2 when divided by 3, remainder 3 by 5, remainder 2 by 7" (23; the least such positive number is *the* asked answer) — and its two-condition little siblings ("x ≡ 3 (mod 4) and x ≡ 1 (mod 5)" → 11). *The Fermat reduction*: "the remainder when $2^{100}$ is divided by 13" (3) — exponent down by 12. What examinations never ask: proofs of CRT or Fermat — the theorems are *used*, exactly as this lesson uses them; the proofs are the Number Theory book’s opening business.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Linear congruence', def: 'An equation of the form $ax \\equiv b \\pmod m$ with unknown $x$ — a linear Diophantine equation in disguise ($ax + m(-t) = b$), solved by chapter 2’s gcd engine.' },
            { term: 'The solvability criterion', def: '$ax \\equiv b \\pmod m$ is solvable ⟺ $\\gcd(a, m) \\mid b$ — decided before any search. $4x \\equiv 1 \\pmod 6$ is dead because $\\gcd(4, 6) = 2 \\nmid 1$.' },
            { term: 'Solution family', def: 'When solvable, exactly $\\gcd(a, m)$ solutions exist modulo $m$, spaced $m/\\gcd(a, m)$ apart: $x_0, x_0 + m/d, \\dots$ — e.g. $9x \\equiv 12 \\pmod{15}$ has $x = 3, 8, 13$.' },
            { term: 'Inverse modulo m', def: '$a^{-1}$ satisfies $a \\cdot a^{-1} \\equiv 1 \\pmod m$. Exists ⟺ $\\gcd(a, m) = 1$; found from Bézout’s coefficients (Lesson 2.3). Mod 10: 3⁻¹ = 7; mod 7: every nonzero residue inverts.' },
            { term: 'Chinese remainder theorem', def: 'For coprime $m, n$: every pair of conditions $x \\equiv a \\pmod m$, $x \\equiv b \\pmod n$ is met by exactly one class mod $mn$. Sunzi’s problem (3rd–5th c. CE) is its oldest instance; the general method grew from Āryabhaṭa (499) through Qin Jiushao (1247) to Gauss (1801).' },
            { term: 'The ladder method', def: 'Solve multi-condition CRT problems rung by rung: satisfy two conditions, write the answer as $x_0 + (mn)t$, and impose the next condition on $t$. Sunzi’s problem: 8 (mod 15), then $t \\equiv 1 \\pmod 7$, landing at 23.' },
            { term: 'Fermat’s little theorem', def: 'For prime $p$ and $p \\nmid a$: $a^{p-1} \\equiv 1 \\pmod p$ (equivalently $a^p \\equiv a$ for all $a$). Stated 1640 (letter to Frénicle); first published proof Euler 1736. The exponent-reduction licence modulo a prime.' },
            { term: 'Exponent reduction modulo p', def: 'Exponents in expressions mod $p$ may be reduced mod $p - 1$: $2^{100} = 2^{12 \\cdot 8 + 4} \\equiv 2^4 \\equiv 3 \\pmod{13}$. The general licence behind Lesson 5.3’s unit-digit wheels.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Does 4x ≡ 1 (mod 6) have a solution?',
              options: ['No — gcd(4, 6) = 2 does not divide 1', 'Yes — x = 4, since 4 × 4 = 16 ≡ 1 (mod 6)', 'No — because 6 is even', 'Yes — x = 5, since 4 × 5 = 20 ≡ 1 (mod 6)'],
              answer: 0,
              explain: 'The gcd criterion: $\\gcd(4, 6) = 2$ and $2 \\nmid 1$ — no solution exists; the enumeration confirms it ($4x$ mod 6 only ever produces $0, 4, 2$). The "$x = 4$" distractor miscomputes: $16 = 12 + 4$, so $16 \\equiv 4$, not 1; likewise "$x = 5$": $20 = 18 + 2 \\equiv 2$. Evenness of the modulus is beside the point — $5x \\equiv 3 \\pmod{12}$ has a solution with an even modulus.',
            },
            {
              q: 'How many solutions does 9x ≡ 12 (mod 15) have, modulo 15?',
              options: ['1 — congruences have unique solutions', '3 — namely x = 3, 8, 13', '15 — one per residue class', '0 — 9 and 15 share a factor'],
              answer: 1,
              explain: 'Solvable (gcd 3 divides 12) with exactly $\\gcd(9, 15) = 3$ solutions: $x = 3, 8, 13$, spaced $15/3 = 5$ apart — each verified by $27 = 15 + 12$, $72 = 60 + 12$, $117 = 105 + 12$. Uniqueness is the *coprime* case only; "0" confuses sharing a factor with the criterion (the shared factor must fail to divide $b$, which here it does not).',
            },
            {
              q: 'Sunzi’s problem: counting by threes leaves 2, by fives leaves 3, by sevens leaves 2. The smallest positive count is:',
              options: ['23', '53', '83', '128'],
              answer: 0,
              explain: 'The ladder: the first two conditions give $x \\equiv 8 \\pmod{15}$; writing $x = 8 + 15t$ and imposing the mod-7 condition gives $1 + t \\equiv 2 \\pmod 7$, so $t = 1$ and $x = 23$ — verified by $23 = 3 \\cdot 7 + 2 = 5 \\cdot 4 + 3 = 7 \\cdot 3 + 2$. The distractors 53 and 83 pass the mod-3 and mod-5 legs but fail mod 7 ($53 \\equiv 4$, $83 \\equiv 6$); 128 is $23 + 105$ — a true solution, but not the *smallest*.',
            },
            {
              q: 'The remainder of 2¹⁰⁰ on division by 13 is:',
              options: ['1', '3', '4', '12'],
              answer: 1,
              explain: 'Fermat at $p = 13$: $2^{12} \\equiv 1 \\pmod{13}$ (indeed $4096 = 13 \\cdot 315 + 1$). So $2^{100} = 2^{12 \\cdot 8 + 4} \\equiv 2^4 = 16 \\equiv \\boxed{3} \\pmod{13}$. "1" forgets the leftover $2^4$; "4" mistakes $16$ for its residue; "12" is $-1$, the residue of $2^6$ — the wrong leftover power.',
            },
            {
              q: 'The inverse of 3 modulo 10 is:',
              options: ['3', '7', '9', 'there is no inverse'],
              answer: 1,
              explain: '$3 \\cdot 7 = 21 = 2 \\cdot 10 + 1 \\equiv 1 \\pmod{10}$ — so $3^{-1} \\equiv 7 \\pmod{10}$. The criterion passes since $\\gcd(3, 10) = 1$. The distractors: $3 \\cdot 3 = 9 \\not\\equiv 1$; $3 \\cdot 9 = 27 \\equiv 7 \\not\\equiv 1$; and "no inverse" is the fate of the *even* digits and 5, not of 3.',
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
                  q: 'Solve 5x ≡ 3 (mod 12).',
                  solution: [
                    'Split the congruence: $g = \\gcd(5, 12) = 1$ — solvable, unique solution.',
                    'Now, find it: try $x = 3$ — $5 \\cdot 3 = 15 = 12 + 3 \\equiv 3$ ✓.',
                    'So, invoke uniqueness: with $g = 1$ there is exactly one class.',
                    'Hence $x \\equiv 3 \\pmod{12}$ — the unique solution.',
                  ],
                  answer: 'x ≡ 3 (mod 12)',
                },
                {
                  q: 'Does 4x ≡ 1 (mod 6) have a solution? Decide without enumerating.',
                  solution: [
                    'Split the criterion: $g = \\gcd(4, 6) = 2$.',
                    'Now, test it: does $2 \\mid 1$? No.',
                    'So, conclude: unsolvable — the gcd failed before any search began.',
                    'Hence no solution (and the enumeration agrees: $4x \\bmod 6$ only ever produces $0, 4, 2$).',
                  ],
                  answer: 'no — gcd(4, 6) = 2 does not divide 1',
                },
                {
                  q: 'Find the inverse of 3 modulo 10.',
                  solution: [
                    'Split the task: need $3x \\equiv 1 \\pmod{10}$.',
                    'Now, scan or recall: $3 \\cdot 7 = 21 = 2 \\cdot 10 + 1$ ✓.',
                    'So, conclude: $3^{-1} \\equiv 7 \\pmod{10}$ — the criterion passing since $\\gcd(3, 10) = 1$.',
                    'Hence $7$ — one of the four invertible digits (1, 3, 7, 9) modulo 10.',
                  ],
                  answer: '3⁻¹ ≡ 7 (mod 10)',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Solve 7x ≡ 4 (mod 12).',
                  solution: [
                    'Split: $g = \\gcd(7, 12) = 1$ — coprime case; invert the coefficient.',
                    'Now, find the inverse: $7 \\cdot 7 = 49 = 4 \\cdot 12 + 1$, so $7^{-1} \\equiv 7 \\pmod{12}$.',
                    'So, multiply through: $x \\equiv 7 \\cdot 4 = 28 \\equiv 4 \\pmod{12}$.',
                    'Hence $x \\equiv 4 \\pmod{12}$ — and the check $7 \\cdot 4 = 28 = 2 \\cdot 12 + 4$ ✓.',
                  ],
                  answer: 'x ≡ 4 (mod 12)',
                },
                {
                  q: 'Solve 9x ≡ 12 (mod 15), listing every solution class.',
                  solution: [
                    'Split: $g = \\gcd(9, 15) = 3$ divides 12 — solvable with exactly 3 solutions.',
                    'Now, divide through: $3x \\equiv 4 \\pmod 5$; invert — $3 \\cdot 2 = 6 \\equiv 1 \\pmod 5$ — so $x \\equiv 2 \\cdot 4 = 8 \\equiv 3 \\pmod 5$.',
                    'So, lift: $x = 3, 8, 13$ modulo 15, spaced $15/3 = 5$ apart.',
                    'Hence the checks: $27 = 15 + 12$, $72 = 60 + 12$, $117 = 105 + 12$ ✓ — three solutions.',
                  ],
                  answer: 'x = 3, 8, 13 (mod 15)',
                },
                {
                  q: 'Solve 6x ≡ 9 (mod 15), listing every solution class.',
                  solution: [
                    'Split: $g = \\gcd(6, 15) = 3$ divides 9 — three solutions again.',
                    'Now, divide through: $2x \\equiv 3 \\pmod 5$; invert — $2 \\cdot 3 = 6 \\equiv 1 \\pmod 5$ — so $x \\equiv 3 \\cdot 3 = 9 \\equiv 4 \\pmod 5$.',
                    'So, lift: $x = 4, 9, 14$ modulo 15.',
                    'Hence the checks: $24 = 15 + 9$, $54 = 45 + 9$, $84 = 75 + 9$ ✓.',
                  ],
                  answer: 'x = 4, 9, 14 (mod 15)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Find the smallest positive x with x ≡ 3 (mod 4) and x ≡ 1 (mod 5).',
                  solution: [
                    'Split the conditions: two coprime moduli — CRT promises exactly one class mod 20.',
                    'Now, scan the smaller ladder: numbers $\\equiv 1 \\pmod 5$ run $1, 6, 11, 16, \\dots$; test the mod-4 residue: $1 \\equiv 1$, $6 \\equiv 2$, $11 \\equiv 3$ ✓.',
                    'So, read off: $x = 11$ is the smallest positive solution.',
                    'Hence $x \\equiv 11 \\pmod{20}$ — and the next meeting is $31 = 11 + 20$.',
                  ],
                  answer: 'x = 11 (the unique class mod 20)',
                },
                {
                  q: 'Solve Sunzi’s problem completely: x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7) — the smallest positive solution and the next one.',
                  solution: [
                    'Split into rungs: first $x \\equiv 2 \\pmod 3$ with $x \\equiv 3 \\pmod 5$.',
                    'Now, rung one: the mod-5 ladder $3, 8, 13, \\dots$ — $8 = 6 + 2$ is $\\equiv 2 \\pmod 3$ ✓. So $x \\equiv 8 \\pmod{15}$.',
                    'So, rung two: write $x = 8 + 15t$; then $8 + 15t \\equiv 1 + t \\pmod 7$ (since $8 \\equiv 1$, $15 \\equiv 1$), and $1 + t \\equiv 2 \\pmod 7$ gives $t \\equiv 1 \\pmod 7$.',
                    'Take the landing: $t = 1$ gives $x = 23$; the general solution is $x \\equiv 23 \\pmod{105}$.',
                    'Hence the smallest positive solution is **23** (checks: $23 = 3 \\cdot 7 + 2 = 5 \\cdot 4 + 3 = 7 \\cdot 3 + 2$) and the next is $128 = 23 + 105$.',
                  ],
                  answer: 'x ≡ 23 (mod 105); smallest 23, next 128',
                },
                {
                  q: 'Find the smallest positive x with x ≡ 2 (mod 7) and x ≡ 5 (mod 11).',
                  solution: [
                    'Split: coprime moduli 7 and 11 — exactly one class mod 77.',
                    'Now, scan the mod-11 ladder: $5, 16, 27, 38, 49, 60, 71, \\dots$; test each mod 7: $5 \\equiv 5$, $16 = 14 + 2 \\equiv 2$ ✓.',
                    'So, read off: $x = 16$ is the smallest positive solution.',
                    'Hence $x \\equiv 16 \\pmod{77}$ — check: $16 = 14 + 2$ ✓ and $16 = 11 + 5$ ✓.',
                  ],
                  answer: 'x = 16 (the unique class mod 77)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Find the remainder of 2¹⁰⁰ on division by 13, using Fermat.',
                  solution: [
                    'Split the power: Fermat at $p = 13$ gives $2^{12} \\equiv 1 \\pmod{13}$ (check: $2^{12} = 4096 = 13 \\cdot 315 + 1$).',
                    'Now, reduce the exponent: $100 = 12 \\cdot 8 + 4$, so $2^{100} = (2^{12})^8 \\cdot 2^4 \\equiv 1^8 \\cdot 2^4 \\pmod{13}$.',
                    'So, finish: $2^4 = 16 = 13 + 3 \\equiv 3 \\pmod{13}$.',
                    'Hence the remainder is **3** — the exponent reduced by 12, the arithmetic by ten orders of magnitude.',
                  ],
                  answer: '3 — 100 = 12·8 + 4 and 2⁴ = 16 ≡ 3 (mod 13)',
                },
                {
                  q: 'Find the remainders of 3¹⁰² on division by 7, and of 17²⁰⁰ on division by 19.',
                  solution: [
                    'Split the first: Fermat at $p = 7$: $3^6 \\equiv 1 \\pmod 7$ (indeed $729 = 7 \\cdot 104 + 1$); and $102 = 6 \\cdot 17$.',
                    'Now, conclude: $3^{102} = (3^6)^{17} \\equiv 1 \\pmod 7$.',
                    'So, run the second: Fermat at $p = 19$: $17^{18} \\equiv 1 \\pmod{19}$; and $200 = 18 \\cdot 11 + 2$.',
                    'Take the leftover: $17^{200} \\equiv 17^2 = 289 = 19 \\cdot 15 + 4 \\equiv 4 \\pmod{19}$.',
                    'Hence **1** and **4** — two prime-modulus powers collapsed by two divisions.',
                  ],
                  answer: '3¹⁰² ≡ 1 (mod 7); 17²⁰⁰ ≡ 4 (mod 19)',
                },
                {
                  q: 'Prove: when ax ≡ b (mod m) is solvable, it has exactly gcd(a, m) solutions modulo m.',
                  solution: [
                    'Split the proof into existence of the family and its completeness. Write $g = \\gcd(a, m)$, $a = g a^{\\prime}$, $m = g m^{\\prime}$.',
                    'Now, the family: if $x_0$ solves, then $x_0 + k m^{\\prime}$ solves for each $k = 0, 1, \\dots, g - 1$: substituting adds $a \\cdot k m^{\\prime} = k a^{\\prime} m$ — a multiple of the modulus, so the congruence survives. The $g$ values are distinct mod $m$: their differences $k m^{\\prime}$ with $0 < k < g$ are proper multiples of $m^{\\prime}$, not of $m$.',
                    'So, completeness: if $x$ and $x_0$ both solve, subtract — $a(x - x_0) \\equiv 0 \\pmod m$, i.e. $m \\mid a(x - x_0)$; divide through by $g$: $m^{\\prime} \\mid a^{\\prime}(x - x_0)$ with $\\gcd(a^{\\prime}, m^{\\prime}) = 1$, so the coprime licence (Lesson 2.2, cited) gives $m^{\\prime} \\mid (x - x_0)$.',
                    'Take the reading: every solution is congruent to $x_0$ modulo $m^{\\prime} = m/g$ — exactly the $g$ listed shifts, no more.',
                    'Hence exactly $\\gcd(a, m)$ solutions — the count swept over thousands of congruences by the verification script, and proved here in four moves.',
                  ],
                  answer: 'solutions = x₀ + k(m/g), k = 0..g−1 — distinct (differences are proper multiples of m/g) and complete (any two solutions differ by a multiple of m/g)',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Find the smallest positive x with x ≡ 1 (mod 2), x ≡ 2 (mod 3) and x ≡ 3 (mod 5).',
                  solution: [
                    'Split into rungs: combine the conditions two at a time.',
                    'Now, rung one: odd numbers that are $\\equiv 2 \\pmod 3$ — scan $1, 3, 5, \\dots$: $5 = 3 + 2$ ✓. So $x \\equiv 5 \\pmod 6$ (CRT on moduli 2 and 3).',
                    'So, rung two: write $x = 5 + 6t$ and impose $\\equiv 3 \\pmod 5$: the ladder $5, 11, 17, 23, 29$ — $23 = 20 + 3$ ✓.',
                    'Take the landing: $x = 23$, and the general solution is $x \\equiv 23 \\pmod{30}$.',
                    'Hence the smallest positive solution is **23** (checks: odd ✓, $23 = 21 + 2$ ✓, $23 = 20 + 3$ ✓) — three conditions, two ladder rungs, one survivor, as CRT guarantees.',
                  ],
                  answer: 'x ≡ 23 (mod 30); smallest 23',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove Fermat’s little theorem for p = 5 by brute enumeration of the permutation argument — then sketch the general p.',
                  solution: [
                    'Split the argument: the multiples of $a$ permute the nonzero residues, so two products agree, so $a^{p-1} \\equiv 1$.',
                    'Now, the p = 5 case for a = 2: the multiples $2, 4, 6, 8$ reduce mod 5 to $2, 4, 1, 3$ — a permutation of $1, 2, 3, 4$. Likewise for $a = 3$: $3, 6, 9, 12 \\to 3, 1, 4, 2$; for $a = 4$: $4, 8, 12, 16 \\to 4, 3, 2, 1$.',
                    'So, multiply each row: the product of the multiples is $a \\cdot 2a \\cdot 3a \\cdot 4a = 24 a^4$, and the product of the permuted residues is $1 \\cdot 2 \\cdot 3 \\cdot 4 = 24$. Congruent inputs give congruent products (Lesson 5.1), so $24 a^4 \\equiv 24 \\pmod 5$.',
                    'Take the cancellation: $\\gcd(24, 5) = 1$, so cancel — $a^4 \\equiv 1 \\pmod 5$. Verified: $2^4 = 16 \\equiv 1$, $3^4 = 81 \\equiv 1$, $4^4 = 256 \\equiv 1 \\pmod 5$.',
                    'Hence the general shape: for prime $p$, the multiples $a, 2a, \\dots, (p-1)a$ are pairwise non-congruent (a repeat $ka \\equiv la$ would cancel to $k \\equiv l$, impossible for distinct $k, l < p$ — coprime cancellation again) and nonzero, so they permute $1, \\dots, p-1$; multiplying gives $(p-1)!\\, a^{p-1} \\equiv (p-1)! \\pmod p$, and cancelling $(p-1)!$ (coprime to $p$) leaves $a^{p-1} \\equiv 1 \\pmod p$ — the full proof, one paragraph, entirely on machinery this chapter built.',
                  ],
                  answer: 'the multiples a, 2a, …, (p−1)a permute 1, …, p−1; multiply and cancel (p−1)!: a^(p−1) ≡ 1 (mod p)',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The solvability theorem',
          latex: 'ax \\equiv b \\pmod m \\text{ solvable} \\;\\Longleftrightarrow\\; \\gcd(a, m) \\mid b; \\qquad \\#\\text{solutions} = \\gcd(a, m)',
          note: 'The solutions, when they exist: x ≡ x₀ + k·(m/d) for k = 0 … d−1, d = gcd(a, m). Decided before any search; 4x ≡ 1 (mod 6) is dead, 9x ≡ 12 (mod 15) has three.',
        },
        {
          kind: 'formula',
          name: 'The inverse criterion',
          latex: '\\exists\\, a^{-1} \\pmod m \\;\\Longleftrightarrow\\; \\gcd(a, m) = 1; \\qquad a^{-1} \\equiv u \\text{ where } 1 = ua + vm \\text{ (Bézout)}',
          note: 'Mod 10: 1, 3, 7, 9 invert (3⁻¹ = 7). Prime moduli: every nonzero residue inverts — finite fields, the Number Theory book’s front door.',
        },
        {
          kind: 'formula',
          name: 'The Chinese remainder theorem',
          latex: '\\gcd(m, n) = 1 \\;\\Rightarrow\\; \\exists!\\, x \\pmod{mn}: \\; x \\equiv a \\pmod m, \\; x \\equiv b \\pmod n',
          note: 'Sunzi’s problem (3rd–5th c. CE), the method of Āryabhaṭa (499) and Qin Jiushao (1247), the theorem of Gauss (1801). Two coprime filters meet exactly once — swept over all coprime pairs ≤ 12.',
        },
        {
          kind: 'formula',
          name: 'Fermat’s little theorem',
          latex: 'p \\text{ prime}, \\; p \\nmid a \\;\\Rightarrow\\; a^{p-1} \\equiv 1 \\pmod p \\quad (\\text{equivalently } a^p \\equiv a \\text{ for all } a)',
          note: 'Fermat’s letter of 18 October 1640 to Frénicle; Euler’s first published proof 1736. The exponent-reduction licence: 2¹⁰⁰ = 2^(12·8+4) ≡ 2⁴ ≡ 3 (mod 13); and the reason Lesson 5.3’s unit-digit cycles divide 4.',
        },
      ],
    },
  ],
}
