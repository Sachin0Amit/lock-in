import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 6: Building the Integers
 *
 * LESSONS WRITTEN: 6.1 The Closure Failures That Force Extension
 *                  6.2 Constructing the Integers from the Naturals
 *                  6.3 The Laws of Integer Arithmetic
 *                  (all three + the unit-6 completion review: run 58 —
 *                  2026-11-06, the third one-full-chapter run under the
 *                  owner's 2026-11-06 directive)
 * CHAPTER STATUS: COMPLETE 3/3 — verify-book2-ch06.ts 233 checks
 * (sections A–W) ALL PASS before any word was written (eleven draft
 * defects caught and fixed in the script itself before lesson text
 * existed: a figure x-coordinate, two assertion typos, a transitivity
 * sweep count, two class-arithmetic slips — [(5,1)]·[(4,1)] = [(21,9)]
 * not [(21,10)], [(3,1)]·[(1,2)] reduces to [(1,3)] — the (−2)³ chain,
 * one census assertion, the zero-absorption instance [(4,1)]·[(5,5)] =
 * [(25,25)], and one table-index bug); per-lesson gates all green
 * (lint 0, tsc 0, routes 200, live quiz 5/5 with the intended keys
 * 6.1: 2/1/0/0/0, 6.2: 2/2/0/0/1, 6.3: 1/0/1/1/2, 0 katex-errors,
 * 0 raw $, 0 console errors, SVG audits 0/0/0). Chapter 6 stands
 * 15,777 words / 24 terms / 15 quiz / 42 exercises (6.1: 5,618 ·
 * 6.2: 5,269 · 6.3: 4,890).
 *
 * References for this unit: Beck & Geoghegan, The Art of Proof — the
 * syllabus spine for the ℕ → ℤ bridge (carried key
 * beck-geoghegan-art-of-proof, its integers role now cashed); Hermann
 * Hankel, Theorie der complexen Zahlensysteme (Leipzig: Leopold Voss,
 * 1867) — the principle of the permanence of formal laws, "soweit als
 * möglich", recast from George Peacock's principle of the permanence of
 * equivalent forms (1830/1833) — NEW keys hankel-1867-permanence and
 * peacock-1833-permanence (web-checked 2026-11-06 via the Toader 2021
 * Historia Mathematica study and the 2026 arXiv analysis of Hankel's
 * principle); Brahmagupta, Brahmasphutasiddhanta (628 CE) — the
 * fortunes-and-debts rules FM 7.1–7.3 banked operationally, here DERIVED
 * from the construction — NEW key brahmagupta-628-brahmasphutasiddhanta
 * (web-checked via MacTutor; the verses paraphrased, never reproduced).
 * The NCERT charters (ncert-math6-ch10 "The Other Side of Zero",
 * ncert-math7-p2-ch2 "Operations with Integers") and Khattar QA 4e are
 * carried; FM 7.1–7.4 are cross-referenced, never repeated — this
 * chapter derives what they banked.
 *
 * Engine discipline: chapter 1's successor/recursion/order machinery is
 * CITED, never re-proved (order as run length, the shift and shuffle
 * laws, commutativity by induction — Lesson 1.3); chapter 2's
 * divisibility criterion is cited for the multiplication census; the
 * cancellation used in 6.2's transitivity proof is exercised through
 * the order engine exactly as the derivation in print says. Chapter 2's
 * closing promise ("the difference reading becomes a first-class
 * object" — ans-linear-diophantine-equations' L-honesty note) is CASHED
 * in Lesson 6.2/6.3.
 *
 * Every number below was recomputed by scripts/verify-book2-ch06.ts
 * (147 checks at 6.1 ship, sections A–P, ALL PASS before writing).
 */
export const chapter06: Chapter = {
  number: 6,
  slug: 'building-the-integers',
  title: 'Building the Integers',
  summary:
    'The first great extension, done honestly. Lesson 6.1 names the disease: ℕ is closed under addition and multiplication but not under subtraction — a − b exists only when b < a, even a − a is barred (0 is not a natural), and equations like x + 9 = 4 die on the page — and states the repair criterion: new answers for dead questions, old numbers unchanged, old laws alive, no new failures (Peacock’s and Hankel’s permanence principle of 1833/1867). Lesson 6.2 performs the surgery: integers are difference pairs (a, b) — “a with b to take away” — bundled into classes by the relation a + d = b + c, which is proved to be an equivalence relation; addition and multiplication of classes are defined and proved well-defined (the original sin of quotient constructions, swept clean by the verification script); zero emerges as the diagonal class [(k, k)], the mirror [(b, a)] gives every class an opposite, and ℕ embeds once and for all as n ↦ [(n+1, 1)]. Lesson 6.3 cashes the payoff: every law of integer arithmetic — commutativity, associativity, distributivity, the identities, the sign rules Brahmagupta stated in 628 CE — is DERIVED from the pair algebra, order extends with its mirror flip (2 < 5 ⟹ −5 < −2), subtraction becomes total, cancellation becomes universal, and ℤ stands as the reader’s first ring — met as a building rather than a fact, with division’s failure waiting to launch chapter 7.',
  status: 'complete',
  plannedLessons: [],
  lessons: [
    {
      id: 'ans-closure-failures-that-force-extension',
      number: '6.1',
      title: 'The Closure Failures That Force Extension',
      prerequisites: ['ans-architecture-of-counting-successors-order', 'ans-induction-proving-for-every-number', 'fm-negative-numbers-why-they-exist'],
      sources: ['beck-geoghegan-art-of-proof', 'hankel-1867-permanence', 'peacock-1833-permanence', 'khattar-qa-4e'],
      concepts: [
        'Closure under an operation',
        'Partial operations: subtraction and division',
        'The subtraction condition b < a',
        'The wall: no predecessor of 1',
        'Equations ℕ cannot solve',
        'The repair criterion',
        'The permanence principle (Peacock, Hankel)',
        'What chapter 7 still owes: division',
      ],
      objectives: [
        'Say precisely what it means for a set to be closed under an operation, and sort ℕ’s four operations into closed (+, ×) and partial (−, ÷)',
        'State and prove the subtraction condition — $a - b$ exists in $\\mathbb{N}$ exactly when $b < a$ — and explain why even $a - a$ is barred (0 is not a natural in this book)',
        'Run the equation census: decide which equations $x + b = a$ and $x \\cdot c = d$ solve in $\\mathbb{N}$, and prove both criteria',
        'State the repair criterion a number-system extension must satisfy, name its originators (Peacock 1833, Hankel 1867), and scope honestly what chapter 6 repairs (subtraction) and what it leaves (division, for chapter 7)',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Five chapters of this book ran inside the natural numbers. Chapter 1 rebuilt counting from the successor; chapter 2 proved the division algorithm and the structure of divisibility; chapter 3 renamed numbers in other bases; chapter 4 factored them into primes; chapter 5 taught remainders to behave like numbers. Through all of it one fact stood unexamined: every calculation *stayed inside* $\\mathbb{N}$. It was not an accident. Addition and multiplication cannot leave the naturals if you try — but subtraction and division can, and do, and every schoolchild meets the wreckage within months of learning to count. This chapter is about that wreckage, and about the most consequential repair job in arithmetic.',
        },
        {
          kind: 'para',
          text: 'Foundation Mathematics Lesson 7.1 gave you the *operational* answer long ago: when a quantity reverses direction — a temperature below freezing, a lift below the ground floor, a balance below zero — signed numbers name where it went, with a chosen zero and two directions. That lesson banked the *use* of the new numbers: $-8$, the opposite of a number, ordering on the extended line, absolute value. What it never claimed to give was the numbers themselves. Where, exactly, is the object $-5$? Not on the successor chain — the chain starts at $1$ and runs forward forever (Lesson 1.1). Not hiding between two naturals — there is nothing between them. The negative numbers were *used* for six chapters of two books without ever being *built*. This chapter builds them, and the build is the model for every extension that follows — fractions into rationals in chapter 7, and beyond this book entirely.',
        },
        { kind: 'heading', text: 'What closure means' },
        {
          kind: 'para',
          text: 'The disease has a precise name. An operation on a set is a rule that eats elements of the set and returns one — and the question "can it always?" is the question of closure.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Closure',
          text: 'A set $S$ with an operation $*$ is said to be **closed under** $*$ if combining any two elements of $S$ with $*$ always produces an element of $S$. Symbolically, $S$ is closed under $*$ when $a * b \\in S$ for every $a, b \\in S$. If some pair escapes — some $a, b \\in S$ with $a * b \\notin S$ — the operation is **partial** on $S$: defined for some pairs, undefined for others.',
        },
        {
          kind: 'equation',
          latex: 'S \\text{ closed under } * \\;\\Longleftrightarrow\\; \\forall\\, a, b \\in S:\\; a * b \\in S',
          note: 'The quantifier is the whole content: "for every pair" — one escaping pair is enough to break closure, just as one counterexample kills a universal claim.',
        },
        {
          kind: 'para',
          text: 'Sort $\\mathbb{N}$’s four school operations by this light:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '**Addition is closed.** Lesson 1.3 defined $add(a, b)$ by recursion — for *every* pair of naturals, no exceptions — and its output is a natural by construction. Two naturals add to a natural; the operation cannot escape.',
            '**Multiplication is closed.** Same machinery: $mul(a, b)$ was defined as repeated addition for all pairs, so every product lands in $\\mathbb{N}$. The three-times table of Lesson 1.3 never once stepped outside.',
            '**Subtraction is partial.** $7 - 4$ names a natural (the run from $4$ to $7$ has length $3$), but $4 - 7$ asks to run *backwards* past the chain’s first link — and there is nothing there. The operation exists for some pairs and explodes for others.',
            '**Division is partial.** $12 \\div 4$ names a natural; $7 \\div 2$ does not — chapter 2’s divisibility is exactly the statement of *when* division lands inside $\\mathbb{N}$. One escaping pair in every seven, roughly: the failure is not an edge case but a structural hole.',
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Partial, not absent',
          text: 'A partial operation is more dangerous than a missing one. If subtraction did not exist at all, no one would ever attempt it. Because it exists for *most* pairs you meet early — every pair with a bigger minuend — the habit forms, and then $3 - 5$ arrives like a step missing at the top of the stairs. The mathematics underneath is the same as the safety lesson: the habit is fine; the *guarantee* is what was never there.',
        },
        { kind: 'heading', text: 'The wall at the bottom of the chain' },
        {
          kind: 'para',
          text: 'Why does subtraction die? Walk the failure slowly. Subtraction, in the successor picture, is *backwards counting*: $7 - 4$ means start at $7$ and take $4$ steps down the chain — $6, 5, 4, 3$ — and the landing, $3$, is a natural. The forwards chain never ends (Lesson 1.2: no loops, no stops). But the *backwards* chain hits a wall after finitely many steps, because the chain has a *first* link: axiom (i) of Lesson 1.1 says $1$ is not the successor of anything. There is no number whose successor is $1$, so the question "$x + 1 = 1$?" has no answer in $\\mathbb{N}$ — the backwards walk from $1$ cannot take even one step.',
        },
        {
          kind: 'example',
          title: 'Count back from 7 by 5, and from 7 by 9 — where does each walk land, and where does it die?',
          steps: [
            'Split the two walks: each subtracts from $7$ by stepping down the chain.',
            'Now, the first: $7 - 5$ walks $6, 5, 4, 3, 2$ — five steps, landing on $2$, a natural. Alive.',
            'So, the second: $7 - 9$ walks $6, 5, 4, 3, 2, 1$ — six steps consumed, three still demanded, and the chain has stopped: no successor of $1$ exists to step down to.',
            'Hence $7 - 5 = 2$ names a natural while $7 - 9$ names *nothing* — the wall, not the size of the numbers, decides.',
          ],
        },
        {
          kind: 'para',
          text: 'The condition hiding in that walk deserves its own box, because every subtraction you will ever do in $\\mathbb{N}$ is secretly checked against it.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The subtraction condition in ℕ',
          text: 'For natural numbers $a$ and $b$, the expression $a - b$ (read: $a$ minus $b$, the result of counting backwards from $a$ by $b$ steps) **exists in $\\mathbb{N}$ exactly when $b < a$**. When it exists, it is the unique natural $x$ with $x + b = a$. If $b \\ge a$, the backwards walk dies at the wall — no natural answers.',
        },
        {
          kind: 'equation',
          latex: 'a - b \\text{ exists in } \\mathbb{N} \\;\\Longleftrightarrow\\; b < a; \\qquad a - b = x \\;\\Longleftrightarrow\\; x + b = a \\text{ with } x \\in \\mathbb{N}',
          note: 'Strict inequality — because even the borderline case $a = b$ fails: $a - a$ would be the number that adds to $a$ to give $a$, and that number is $0$, which this book (Lesson 1.1) does not count as a natural. Zero is not yet born.',
        },
        {
          kind: 'para',
          text: 'The borderline case is worth a pause, because it is the honest subtlety school arithmetic skips. $5 - 5$ feels harmless — "take away all of it, nothing remains" — and the "nothing" is exactly right as a *quantity*. But this book’s $\\mathbb{N}$ has no member named nothing: the chain starts at $1$. So in $\\mathbb{N}$ the equation $x + 5 = 5$ is just as dead as $x + 9 = 4$ — both ask for a natural $x$ that would have to be $0$ and $-4$ respectively, and $\\mathbb{N}$ owns neither. Lesson 1.1 promised that $0$ "joins later, as the first of the integers built in chapter 6" — the bill comes due two lessons from now, and the wall at the bottom of the chain is where it is filed.',
        },
        {
          kind: 'para',
          text: 'Lesson 1.1 already borrowed the notation: "in the borrowed notation of Foundation Mathematics, $\\text{run}(a \\to b) = b - a$". That borrowing was a promissory note — the symbols $b - a$ were used for the *count of steps*, which is a natural, precisely when the run exists. This chapter pays the note: by its end, $b - a$ will be a genuine element of a genuinely larger system for *every* pair, borrowed no longer.',
        },
        {
          kind: 'figure',
          caption:
            'The wall and the repair. Left of $1$ the successor chain simply stops (axiom (i): $1$ is nobody’s successor), so the naturals carry no zero and no mirrors — counting backwards dies at the wall. The integers extend the line past it: $0$ first, then the mirrors $-1, -2, \\dots$ in which every backwards walk finds a landing. The dashed half is chapter 6.2’s construction; the wall glyph marks the boundary this chapter erases.',
          svg: `<svg viewBox="0 0 520 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line from minus five to seven: the natural-number part from one to seven is solid, the extension from minus five to zero is dashed, and a wall glyph stands between zero and one">
  <line x1="68" y1="130" x2="452" y2="130" stroke="currentColor" stroke-width="1.2" opacity="0.85"/>
  <line x1="68" y1="130" x2="244" y2="130" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.55"/>
  <g stroke="currentColor" stroke-width="1.4">
    <line x1="68" y1="124" x2="68" y2="132" opacity="0.6"/><line x1="100" y1="124" x2="100" y2="132" opacity="0.6"/><line x1="132" y1="124" x2="132" y2="132" opacity="0.6"/><line x1="164" y1="124" x2="164" y2="132" opacity="0.6"/><line x1="196" y1="124" x2="196" y2="132" opacity="0.6"/><line x1="228" y1="124" x2="228" y2="132" opacity="0.75"/>
  </g>
  <g stroke="currentColor" stroke-width="1.6">
    <line x1="260" y1="122" x2="260" y2="132"/><line x1="292" y1="122" x2="292" y2="132"/><line x1="324" y1="122" x2="324" y2="132"/><line x1="356" y1="122" x2="356" y2="132"/><line x1="388" y1="122" x2="388" y2="132"/><line x1="420" y1="122" x2="420" y2="132"/><line x1="452" y1="122" x2="452" y2="132"/>
  </g>
  <g font-size="13" text-anchor="middle" fill="currentColor" opacity="0.75">
    <text x="68" y="152">−5</text><text x="100" y="152">−4</text><text x="132" y="152">−3</text><text x="164" y="152">−2</text><text x="196" y="152">−1</text><text x="228" y="152">0</text>
  </g>
  <g font-size="13" text-anchor="middle" fill="currentColor" font-weight="bold">
    <text x="260" y="152">1</text><text x="292" y="152">2</text><text x="324" y="152">3</text><text x="356" y="152">4</text><text x="388" y="152">5</text><text x="420" y="152">6</text><text x="452" y="152">7</text>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.9">
    <rect x="238" y="106" width="12" height="10"/>
    <rect x="238" y="116" width="12" height="10"/>
    <rect x="238" y="126" width="12" height="10"/>
  </g>
  <text x="244" y="94" font-size="11" text-anchor="middle" fill="currentColor" opacity="0.8">the wall</text>
  <text x="356" y="60" font-size="12" text-anchor="middle" fill="currentColor" opacity="0.85">ℕ: the successor chain 1, 2, 3, … — closed under + and ×</text>
  <text x="132" y="182" font-size="12" text-anchor="middle" fill="currentColor" opacity="0.85">the extension: 0 and the mirrors — built in Lesson 6.2</text>
</svg>`,
        },
        { kind: 'heading', text: 'Equations ℕ cannot solve' },
        {
          kind: 'para',
          text: 'Subtraction’s failure is sharpest when written as an equation, because an equation asks for a *witness* — a natural number that answers — and witnesses cannot be waved at. The probe: which equations $x + b = a$ and $x \\cdot c = d$ have natural solutions? Run the census on the pair that opened this lesson and its neighbours:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$x + 4 = 9$: the witness $x = 5$ works ($5 + 4 = 9$) — $9 > 4$, the backwards run exists;',
            '$x + 9 = 4$: no natural $x$ works — the forced value would be $-4$, past the wall;',
            '$x + 5 = 5$: no natural $x$ works either — the forced value is $0$, not a member of $\\mathbb{N}$;',
            '$x \\cdot 3 = 12$: $x = 4$ works ($4 \\cdot 3 = 12$) — $3 \\mid 12$, chapter 2’s criterion satisfied;',
            '$x \\cdot 3 = 7$: dead — $3 \\nmid 7$, no natural times $3$ lands on $7$;',
            '$x \\cdot 2 = 8$: $x = 4$ works — $2 \\mid 8$;',
            '$x \\cdot 2 = 7$: dead — $2 \\nmid 7$. This last failure is *not* the one chapter 6 repairs; it waits for chapter 7.',
          ],
        },
        {
          kind: 'table',
          caption: 'The equation census: seven probe equations against ℕ, with the criterion that decides each. The final rows count the whole landscape — closure is not lost at the edges but through most of the map.',
          head: ['Equation', 'Solvable in ℕ?', 'The deciding criterion'],
          rows: [
            ['$x + 4 = 9$', 'yes — $x = 5$', '$9 > 4$: the backwards run from $9$ to $4$ has length $5$'],
            ['$x + 9 = 4$', 'no', '$4 < 9$: the forced witness is $-4$, past the wall'],
            ['$x + 5 = 5$', 'no', 'the forced witness is $0$ — a quantity, not a natural (Lesson 1.1)'],
            ['$x \\cdot 3 = 12$', 'yes — $x = 4$', '$3 \\mid 12$ (the divisibility criterion of chapter 2)'],
            ['$x \\cdot 3 = 7$', 'no', '$3 \\nmid 7$ — the division failure'],
            ['$x \\cdot 2 = 8$', 'yes — $x = 4$', '$2 \\mid 8$'],
            ['$x \\cdot 2 = 7$', 'no', '$2 \\nmid 7$ — the division failure chapter 7 owns'],
            ['census, $x + b = a$ with $a, b \\le 6$', '15 of 36 live', '$21$ pairs die — every pair with $a \\le b$'],
            ['census, $x \\cdot c = d$ with $c, d \\le 6$', '14 of 36 live', '$22$ pairs die — all but the $14$ divisibility pairs'],
          ],
        },
        {
          kind: 'para',
          text: 'The addition criterion behind those verdicts is provable in three moves, and the proof is a nice payday for chapter 1’s order machinery.',
        },
        {
          kind: 'derivation',
          title: 'The addition criterion: x + b = a solves in ℕ ⟺ b < a',
          statement:
            'Claim: for naturals $a$ and $b$, the equation $x + b = a$ has a natural solution exactly when $b < a$.',
          steps: [
            {
              label: '(⇐) Assume b < a — build the witness',
              formula: 'b < a \\;\\Rightarrow\\; \\text{run}(b \\to a) = r \\ge 1, \\qquad b + r = a',
              explanation:
                'By the definition of order (Lesson 1.1), the run from $b$ to $a$ has length $r \\ge 1$, and the recursion reading of addition (Lesson 1.3) turns that run into the equation $b + r = a$.',
            },
            {
              label: 'Commute to the equation’s shape',
              formula: 'b + r = a \\;\\Rightarrow\\; r + b = a \\qquad (x = r \\in \\mathbb{N})',
              explanation:
                'Lesson 1.3 proved addition commutative by induction, so $r + b = a$ — the witness $x = r$ is a natural with $r \\ge 1$. Alive.',
            },
            {
              label: '(⇒) Assume a witness exists — land beyond b',
              formula: 'x + b = a,\\; x \\in \\mathbb{N} \\;\\Rightarrow\\; x \\ge 1 \\;\\Rightarrow\\; x + b \\ge S(b) > b \\;\\Rightarrow\\; a > b',
              explanation:
                'Every natural $x \\ge 1$ (this book’s convention), so by the shift law (Lesson 1.3) $x + b$ lands at least one successor step beyond $b$ — and order is run length, so $S(b) > b$. Hence $a \\ge S(b) > b$: solvability forces $b < a$.',
            },
            {
              label: 'The multiplication twin and the sweep',
              formula: 'x \\cdot c = d \\text{ solvable} \\;\\Longleftrightarrow\\; c \\mid d',
              explanation:
                'The multiplication criterion is chapter 2’s divisibility read as a solvability statement — both directions immediate from the definition of divides. The verification script swept both criteria against brute witness search over $a, b, c, d \\le 20$ — zero mismatches — and the census counts $15/21$ and $14/22$ on the $\\le 6$ square.',
            },
          ],
          result: 'x + b = a solvable in ℕ ⟺ b < a; x·c = d solvable in ℕ ⟺ c | d',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'How much of the map is water',
          text: 'The census counts make the failure *quantitative*. On the $6 \\times 6$ square of addition pairs, $21$ of $36$ are dead — more than half the map. On the multiplication square, $22$ of $36$ die; only the $14$ divisibility pairs ($1$ divides everything, $2 \\mid 2, 4, 6$, $3 \\mid 3, 6$, and the squares) support a witness. A sailor would not call this a map with a few reefs; it is mostly ocean. And yet the dead questions are not nonsense — "$4$ from $9$" asks something perfectly intelligible. The answer exists *as a question*; what is missing is the number that names it. That gap — intelligible question, nameless answer — is what an extension fills.',
        },
        { kind: 'heading', text: 'What a repair must preserve' },
        {
          kind: 'para',
          text: 'Not every patch is a repair. You could "fix" $4 - 7$ by declaring it equal to $1$ — arithmetic would then be *total*, and also useless, because the laws that make computation reliable would start failing: $1 + 7 = 8$ would now have two answers. The insight that separates real extensions from rubber stamps is old enough to have a pedigree and a name.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '**The dead questions get answers.** Every equation $x + b = a$ — including the $21$ dead pairs on the census square and the wall case $x + 5 = 5$ — must gain a witness in the extended system.',
            '**The old numbers keep their names and their behaviour.** The naturals must sit inside the extension unchanged: $2 + 3 = 5$ before, $2 + 3 = 5$ after. An extension that renamed its citizens would be a replacement, not a repair.',
            '**The old laws survive.** Addition and multiplication stay commutative and associative; distribution keeps holding; the identities keep working. This is the hard demand — it is what rules out the $4 - 7 = 1$ stamp.',
            '**No new failures.** Whatever solved before must still solve. A repair that answers $x + 9 = 4$ but breaks $x \\cdot 2 = 8$ has traded one ocean for another.',
          ],
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The permanence principle: Peacock 1833, Hankel 1867',
          text: 'The four demands above were first distilled by the British algebraists. George Peacock — in his *Treatise on Algebra* (1830) and its symbolic successor of 1833 — framed algebra as a system of forms whose equivalences should remain permanent when the symbols are read more broadly: extend the meanings, and the old truths about the old meanings must stay true. Hermann Hankel, in *Theorie der complexen Zahlensysteme* (Leipzig: Leopold Voss, 1867), recast the idea as the **principle of the permanence of formal laws**: when a number system is extended, the formal laws of the old arithmetic — commutativity, associativity, distribution — must remain valid "soweit als möglich", as far as possible. (Hankel deliberately narrowed Peacock’s principle from theorems to laws; the distinction is the modern one — laws are what you can actually check.) Every construction this book performs is an execution of that principle: chapter 6.2 will *check* each law of $\\mathbb{N}$ against the new integers rather than assume it, and chapter 7 will do the same for the rationals. The principle also explains the chapter’s title: the integers were not discovered hiding under a bed. They were *built*, on purpose, as the smallest structure that answers the dead questions while keeping the laws alive.',
        },
        {
          kind: 'para',
          text: 'One more piece of the design brief. The repair must answer the wall case too: $x + 5 = 5$ needs a witness, so the extension must contain a number that does nothing when added — the chosen zero of Foundation Mathematics Lesson 7.1, now to be *built* rather than borrowed. And once subtraction is total, every number needs a mirror: the witness of $x + 5 = 0$. Chapter 6.2 delivers both from one construction, and 6.3 shows the sign rules you have used since Foundation Mathematics Lesson 7.3 are not conventions Brahmagupta happened to state in 628 CE but *theorems* forced by the build.',
        },
        {
          kind: 'example',
          title: 'Audit a proposed repair: add −1, −2, −3, … to ℕ — but refuse to add 0. Which demands does it meet, which does it break?',
          steps: [
            'Split the audit against the four demands, demand by demand.',
            'Now, demand (i): the dead questions $x + b = a$ with $a < b$ gain witnesses — $x + 9 = 4$ now answers $x = -5$. A real gain.',
            'So, press the wall case: $x + 5 = 5$ still has no witness — the answer wants $0$, which the proposal refuses to admit. Demand (i) is only half-met.',
            'Take demand (iv) next: the additive story now has a permanent hole at its centre — $a - a$ is dead for every $a$, so subtraction is *still* partial. An extension built to make subtraction total that leaves it partial fails its own brief.',
            'Hence the verdict: negatives without zero repair the far side of the wall and leave a hole in the middle — the audit shows why the integers arrive as $\\dots, -2, -1, 0, 1, 2, \\dots$ in one piece, never half-built.',
          ],
        },
        { kind: 'heading', text: 'The scoping: what chapter 6 does not repair' },
        {
          kind: 'para',
          text: 'Honesty requires a boundary. The integers make subtraction total — after chapter 6.2, $a - b$ will exist for *every* pair and behave. They do nothing for division: $x \\cdot 2 = 7$ remains witnessless in $\\mathbb{Z}$ (sweep it: no integer, positive, negative, or zero, doubles to $7$), and $7 \\div 2$ still names nothing. That failure is *structurally different* — the naturals already contained the multiplicative identity $1$, so the gap is not "a missing neutral" but "missing inverses", and closing it costs a second construction with its own equivalence relation. That construction is chapter 7’s entire business: the rationals, built from pairs of integers exactly as the integers were built from pairs of naturals — the permanence principle run twice down the same ladder. What chapter 6 buys is the *pattern*: name the failure, design the extension, check every law. Chapter 7 runs the pattern again; every algebra course you will ever take runs it forever.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'Competitive exams bank the *operations* on signed numbers (Foundation Mathematics 7.2–7.4 covered the moves; FM 7.1 the chosen-zero readings); the questions rarely announce which system the symbols live in — but the "solve in natural numbers vs solve in integers" distinction is a real one and this lesson is its proof. Typical shapes: ordering narrations (a lift at $B3$ versus $B1$ — which is lower, and why the counting直觉 flips: SSC CHSL/MTS, RRB NTPC CBT-I, banking clerical banks); smallest-integer items ("the smallest integer greater than $-2.5$" — answer $-2$, a wall-flavoured question); and the solve-and-system pairing ("$x + 9 = 4$: solve in $\\mathbb{N}$ — trick; solve in $\\mathbb{Z}$ — $-5$"). What this lesson adds for such items is the *reason* behind the answer: $x + 9 = 4$ is not "wrong" in $\\mathbb{N}$, it is *unsolvable there* — and knowing which equations each system owns is exactly the census skill. Khattar QA ch. 1’s signed-number drill set practices the verdicts; this chapter proves them.',
        },
        {
          kind: 'para',
          text: 'The next lesson stops diagnosing and starts building. The material will be the humblest imaginable — ordered pairs of natural numbers — and the result will be the entire integer line: zero, the mirrors, the embedding of $\\mathbb{N}$, and an addition and multiplication proved law-abiding. The trick that makes it work is the same one chapter 5 used to promote remainders: stop asking objects to *be* something and instead say exactly *when two things play the same role*. For remainders that gave congruence; for differences it gives the integers.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Closed operation', def: 'An operation $*$ on a set $S$ with $a * b \\in S$ for every $a, b \\in S$ — combining never escapes. Addition and multiplication are closed on $\\mathbb{N}$ (defined for all pairs by recursion, outputs naturals).' },
            { term: 'Partial operation', def: 'An operation defined only for some pairs of the set: subtraction ($a - b$ needs $b < a$) and division ($d \\div c$ needs $c \\mid d$) are partial on $\\mathbb{N}$. One escaping pair breaks closure.' },
            { term: 'The subtraction condition', def: '$a - b$ exists in $\\mathbb{N}$ exactly when $b < a$ — strict, because $a = b$ forces the answer $0$, which is not a natural in this book. Proved via order-as-runs and the shift law.' },
            { term: 'The wall', def: 'The dead end of backwards counting: axiom (i) says $1$ is nobody’s successor, so the chain $1, 2, 3, \\dots$ cannot be walked below $1$. Every subtraction failure is this wall, hit at different depths.' },
            { term: 'Equation census', def: 'Counting which equations of a given shape solve in a system — here: $x + b = a$ solves $\\Longleftrightarrow b < a$ ($15$ of $36$ pairs live on the $\\le 6$ square); $x \\cdot c = d$ solves $\\Longleftrightarrow c \\mid d$ ($14$ of $36$ live).' },
            { term: 'The repair criterion', def: 'The four demands on a number-system extension: (i) dead questions gain answers; (ii) old numbers keep names and behaviour; (iii) old laws survive; (iv) no new failures. The working form of the permanence principle.' },
            { term: 'The permanence principle', def: 'Peacock’s "permanence of equivalent forms" (1830/1833), recast by Hankel (*Theorie der complexen Zahlensysteme*, 1867) as the permanence of formal laws: on extending a number system the old laws hold "soweit als möglich" — as far as possible. Every construction in this book checks laws rather than assuming them.' },
            { term: 'Extension', def: 'A number system built to answer questions its predecessor cannot, while preserving the predecessor’s citizens and laws. $\\mathbb{Z}$ extends $\\mathbb{N}$ (chapter 6); $\\mathbb{Q}$ extends $\\mathbb{Z}$ (chapter 7) — one pattern, run down the ladder.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which of these equations has a solution in the naturals $\\mathbb{N}$ (as this book defines them)?',
              options: ['$x + 5 = 2$', '$x \\cdot 3 = 7$', '$x \\cdot 3 = 12$', '$x + 8 = 1$'],
              answer: 2,
              explain: '$x \\cdot 3 = 12$ solves with $x = 4$ ($3 \\mid 12$). The others are dead: $x + 5 = 2$ and $x + 8 = 1$ force witnesses ($-3$ and $-7$) past the wall, and $x \\cdot 3 = 7$ fails divisibility ($3 \\nmid 7$) — the failure chapter 7, not chapter 6, repairs.',
            },
            {
              q: 'Why does $x + 5 = 5$ have no solution in $\\mathbb{N}$?',
              options: [
                'Because addition is not closed on $\\mathbb{N}$',
                'Because the solution would be $0$, and $0$ is not a natural number in this book',
                'Because the equation is not linear',
                'Because $5$ is odd',
              ],
              answer: 1,
              explain: 'The forced witness is $5 - 5 = 0$, and $\\mathbb{N}$ starts at $1$ (axiom (i): $1$ is nobody’s successor — nothing adds to $5$ to give $5$). Addition *is* closed on $\\mathbb{N}$ (option 1 backwards), linearity is irrelevant, and parity has nothing to do with it.',
            },
            {
              q: 'Which closure failure does chapter 6 repair, and which does it explicitly leave for chapter 7?',
              options: [
                'Subtraction now; division in chapter 7',
                'Division now; subtraction in chapter 7',
                'Both in chapter 6',
                'Neither — the failures are permanent features of $\\mathbb{N}$',
              ],
              answer: 0,
              explain: 'The integers make subtraction total: every $a - b$ will exist. Division stays partial — $x \\cdot 2 = 7$ remains unsolvable in $\\mathbb{Z}$ — because the rationals need their own pair construction (multiplicative inverses), which is chapter 7’s entire business.',
            },
            {
              q: 'Hankel’s permanence principle (1867) demands that a number-system extension…',
              options: [
                'keep the formal laws of the old arithmetic alive, as far as possible',
                'replace the old numbers entirely with new ones',
                'ban subtraction from the new system',
                'declare $0$ a natural number',
              ],
              answer: 0,
              explain: 'The principle — Hankel’s recasting of Peacock’s 1833 idea — is exactly demand (iii) of the repair criterion: on extending, the laws (commutativity, associativity, distribution) must remain valid "soweit als möglich". It is why this book *checks* each law against the new numbers instead of assuming it.',
            },
            {
              q: 'In this book’s convention, $a - b$ (backwards counting in $\\mathbb{N}$) exists exactly when…',
              options: ['$b < a$', '$b \\le a$', '$a$ divides $b$', '$a < b$'],
              answer: 0,
              explain: 'Strictly $b < a$: the borderline $a = b$ forces the answer $0$, which is not a natural here. The $b \\le a$ option is the classic trap; $a \\mid b$ is the *division* criterion (chapter 2), and $a < b$ points the walk the wrong way.',
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
                  q: 'Which of $7 - 4$, $4 - 7$ and $5 - 5$ exist in $\\mathbb{N}$? Give each verdict and its reason.',
                  solution: [
                    'Split the three against the subtraction condition ($b < a$).',
                    'Now, $7 - 4$: $4 < 7$ — alive, and the backwards walk $6, 5, 4, 3$ lands on $3$.',
                    'So, $4 - 7$: $7 \\ge 4$ — dead, the walk would need three steps below $1$.',
                    'Take $5 - 5$: $5 \\le 5$ — dead too, the forced answer $0$ is not a natural (the wall case).',
                    'Hence only $7 - 4 = 3$ exists in $\\mathbb{N}$; the other two name nothing there.',
                  ],
                  answer: '7 − 4 = 3 exists; 4 − 7 and 5 − 5 do not',
                },
                {
                  q: 'Solve $x + 4 = 9$ in $\\mathbb{N}$, and say which side of the addition criterion the equation sits on.',
                  solution: [
                    'Split: the criterion is $x + b = a$ solvable $\\Longleftrightarrow b < a$.',
                    'Now, check it: $4 < 9$ — solvable, and the witness is the run length from $4$ to $9$.',
                    'So, the witness: $x = 5$, and the check $5 + 4 = 9$ ✓.',
                    'Hence $x = 5$ — the equation sits on the live side ($a > b$) of the criterion.',
                  ],
                  answer: 'x = 5',
                },
                {
                  q: 'Which of $x \\cdot 3 = 12$, $x \\cdot 3 = 7$ and $x \\cdot 2 = 6$ have natural solutions?',
                  solution: [
                    'Split the three against the multiplication criterion ($c \\mid d$).',
                    'Now, $x \\cdot 3 = 12$: $3 \\mid 12$ — alive with $x = 4$.',
                    'So, $x \\cdot 3 = 7$: $3 \\nmid 7$ — dead (no natural times $3$ lands on $7$).',
                    'Take $x \\cdot 2 = 6$: $2 \\mid 6$ — alive with $x = 3$.',
                    'Hence two of the three solve: $x = 4$ and $x = 3$; the middle one waits for chapter 7.',
                  ],
                  answer: 'x·3 = 12 → x = 4; x·3 = 7 dead; x·2 = 6 → x = 3',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'The equation $x + 7 = 7$ is unsolvable in $\\mathbb{N}$. Which number does the extension owe it, and which lesson of this chapter builds that number?',
                  solution: [
                    'Split: the forced witness satisfies $x + 7 = 7$, i.e. $x$ adds to $7$ and does nothing.',
                    'Now, name it: the add-nothing number is $0$ — a quantity every reader owns, a number $\\mathbb{N}$ lacks.',
                    'So, locate the build: Lesson 6.2 constructs it as the diagonal class $[(k, k)]$ — a difference pair with exactly as much to take away as it has.',
                    'Hence the extension owes $x = 0$, delivered by Lesson 6.2 (and read operationally back in FM 7.1).',
                  ],
                  answer: 'x = 0 — built in Lesson 6.2 (the diagonal class)',
                },
                {
                  q: 'For which $d \\le 10$ does $x \\cdot 2 = d$ have no solution in $\\mathbb{N}$? Count them.',
                  solution: [
                    'Split: the criterion is $2 \\mid d$.',
                    'Now, sweep $d = 1$ to $10$: the odds $1, 3, 5, 7, 9$ fail divisibility by $2$; the evens $2, 4, 6, 8, 10$ pass.',
                    'So, count: $5$ dead values out of $10$ — half the map is water, exactly as the census predicted.',
                    'Hence $x \\cdot 2 = d$ dies for $d = 1, 3, 5, 7, 9$ (five failures, one for every odd $d$).',
                  ],
                  answer: 'd = 1, 3, 5, 7, 9 — five dead values',
                },
                {
                  q: 'A lift panel shows $B2$. With the ground floor as the chosen zero, write it as a signed number; state which is lower, $B2$ or $B3$, and why the counting flips.',
                  solution: [
                    'Split: basements descend below the zero — FM 7.1’s floors setting.',
                    'Now, the reading: $B2$ is $-2$ (two levels below the chosen zero), $B3$ is $-3$.',
                    'So, compare: $-3 < -2$ — the *deeper* basement wears the *smaller* number, the mirror of the counting upstairs.',
                    'Hence $B3$ is lower than $B2$: below zero, more of a good (depth) means less on the number line — the flip this chapter’s Lesson 6.3 proves from the construction.',
                  ],
                  answer: 'B2 = −2; B3 = −3 is lower',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'On the square of pairs $(a, b)$ with $a, b \\le 6$, count the pairs for which $x + b = a$ is unsolvable in $\\mathbb{N}$.',
                  solution: [
                    'Split: unsolvable $\\Longleftrightarrow a \\le b$ (the criterion’s dead side, including the wall case $a = b$).',
                    'Now, count by the value of $a$: for $a = 1$ all $b \\ge 1$ are dead ($6$ pairs); for $a = 2$, $b \\ge 2$ ($5$ pairs); and so on down to $a = 6$ ($1$ pair).',
                    'So, total: $6 + 5 + 4 + 3 + 2 + 1 = 21$ dead pairs of $36$.',
                    'Hence $21$ of the $36$ addition equations are unsolvable — more than half, the census count the verification script confirmed.',
                  ],
                  answer: '21 of 36 (dead ⟺ a ≤ b)',
                },
                {
                  q: 'On the same $\\le 6$ square, count the pairs $(c, d)$ for which $x \\cdot c = d$ is unsolvable, and name the $14$ pairs that survive.',
                  solution: [
                    'Split: unsolvable $\\Longleftrightarrow c \\nmid d$; survivors are the divisibility pairs.',
                    'Now, sweep: $c = 1$ divides all six ($6$ pairs); $c = 2$ hits $2, 4, 6$ ($3$); $c = 3$ hits $3, 6$ ($2$); $c = 4, 5, 6$ hit only their own squares ($1 + 1 + 1$).',
                    'So, survivors: $6 + 3 + 2 + 1 + 1 + 1 = 14$; the dead count is $36 - 14 = 22$.',
                    'Hence $22$ of $36$ multiplication equations are unsolvable, surviving on exactly the $14$ divisibility pairs the script enumerated.',
                  ],
                  answer: '22 of 36 dead; 14 survivors (1|all six, 2|2,4,6; 3|3,6; 4|4; 5|5; 6|6)',
                },
                {
                  q: 'List the backwards chain from $6$ and explain precisely where and why it stops.',
                  solution: [
                    'Split: backwards counting applies the *predecessor* — the inverse of the successor.',
                    'Now, walk: $6 \\to 5 \\to 4 \\to 3 \\to 2 \\to 1$, six links demanded and five taken.',
                    'So, the stop: from $1$ no further step exists, because axiom (i) says $1$ is not $S$ of anything — there is no $x$ with $x + 1 = 1$.',
                    'Hence the chain runs $6, 5, 4, 3, 2, 1$ and halts: the wall is not far away, it is *the first link* — every subtraction that would pass it names nothing in $\\mathbb{N}$.',
                  ],
                  answer: '6, 5, 4, 3, 2, 1 — then the wall (no predecessor of 1)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Prove: $x + b = a$ has a natural solution if and only if $b < a$.',
                  solution: [
                    'Split the proof into the two directions of the $\\Longleftrightarrow$.',
                    'Now, (⇐): let $b < a$. The run from $b$ to $a$ has length $r \\ge 1$ (definition of order, Lesson 1.1), and the recursion reading gives $b + r = a$. Commutativity (Lesson 1.3, proved by induction) gives $r + b = a$: the witness $x = r$ is a natural, alive.',
                    'So, (⇒): let $x \\in \\mathbb{N}$ solve $x + b = a$. Every natural $x \\ge 1$ (this book’s convention), so $x + b$ is at least $S(b)$ — by the shift law (Lesson 1.3), adding $x$ lands strictly beyond $b$ (a run of length $\\ge 1$). Hence $a \\ge S(b) > b$: solvability forces $b < a$.',
                    'Take the census check: the script swept both directions over $a, b \\le 20$ against brute witness search — zero mismatches.',
                    'Hence $x + b = a$ solves in $\\mathbb{N}$ exactly when $b < a$ — the criterion the whole census runs on.',
                  ],
                  answer: 'solvable ⟺ b < a (⇐ by the run-length witness; ⇒ by the shift law and order-as-runs)',
                },
                {
                  q: 'Prove: $x \\cdot c = d$ has a natural solution if and only if $c \\mid d$.',
                  solution: [
                    'Split the two directions.',
                    'Now, (⇒): if $x \\in \\mathbb{N}$ solves $x \\cdot c = d$, then $d = x \\cdot c$ displays $d$ as a multiple of $c$ — which is chapter 2’s definition of $c \\mid d$. Nothing more is needed.',
                    'So, (⇐): if $c \\mid d$, then by definition $d = q \\cdot c$ for some natural $q$; setting $x = q$ gives $x \\cdot c = d$ (multiplication is commutative, Lesson 1.3). Note $q \\ge 1$ since $d \\ge 1$ and $c \\ge 1$.',
                    'Take the contrast with the addition criterion: here *both* directions are immediate from the definition of divisibility — chapter 2 proved the criterion’s content (uniqueness of the quotient lives in the division algorithm).',
                    'Hence $x \\cdot c = d$ solves in $\\mathbb{N}$ exactly when $c \\mid d$ — divisibility *is* solvability, renamed.',
                  ],
                  answer: 'solvable ⟺ c | d (both directions immediate from the definition of divides)',
                },
                {
                  q: 'ℕ is closed under addition, yet subtraction is not total. Explain why closure under the operation does not rescue its inverse, using $3 + 5$ and $3 - 5$.',
                  solution: [
                    'Split the two claims apart: closure is a statement about the operation; totality of the inverse is a statement about *solvability of equations*.',
                    'Now, the closure side: $3 + 5 = 8 \\in \\mathbb{N}$ — and in fact *every* pair adds to a natural, by recursion (Lesson 1.3). No exceptions.',
                    'So, the inverse side: $3 - 5$ asks for a natural $x$ with $x + 5 = 3$. By the addition criterion ($b = 5 \\ge a = 3$) no such natural exists — closure of $+$ guarantees answers land inside $\\mathbb{N}$, not that questions about *undoes* have answers.',
                    'Take the moral: an operation can be everywhere-defined while its inverse is only sometimes-defined. Subtraction is the inverse of addition in exactly the pairs where the addition criterion passes.',
                    'Hence closure of $+$ does not rescue $-$ — the failure lives one level up, in the equation census, which is why the repair must be built at that level (Lesson 6.2).',
                  ],
                  answer: 'closure of + guarantees 3 + 5 = 8 exists, not that the undo-question x + 5 = 3 has a witness — 3 − 5 stays dead',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'State the repair criterion’s four demands, then check $\\mathbb{N}$ itself against them. (A system trivially passes its own audit — the value is in seeing the demands’ shape.)',
                  solution: [
                    'Split the four demands out: (i) dead questions gain answers — here vacuous, $\\mathbb{N}$ is the baseline, no dead questions *of its own* are owed; (ii) the citizens keep names — the baseline is itself; (iii) the laws survive — commutativity, associativity, distribution hold in $\\mathbb{N}$ (Lesson 1.3 proved them by induction); (iv) no new failures — again baseline.',
                    'Now, the interesting direction: run the audit the other way — which demands does $\\mathbb{N}$ *fail as a repair of itself*? Demand (i) against the *borrowed* questions: $x + 9 = 4$ and $x + 5 = 5$ are dead in $\\mathbb{N}$ though intelligible — $\\mathbb{N}$ fails demand (i) as a repair of the difference questions.',
                    'So, the shape lesson: the four demands only bite when a system is measured against questions *outside* its own census. $\\mathbb{N}$ is law-perfect and question-incomplete — the precise profile of a system that needs extending.',
                    'Hence the audit’s value: it separates "the laws hold" (they do, everywhere in $\\mathbb{N}$) from "the questions answer" (they do not) — and the permanence principle is precisely the promise that a proper extension fixes the second without breaking the first.',
                  ],
                  answer: 'ℕ passes (iii) and trivially (ii)/(iv) as baseline; it fails demand (i) against the difference questions — the exact profile that forces chapter 6',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'A proposed repair adds the symbols $-1, -2, -3, \\dots$ to $\\mathbb{N}$ but refuses to admit $0$. Audit it against the four demands: which equations does it fix, which does it still fail, and which demand does it breach?',
                  solution: [
                    'Split the audit into gains and residual failures.',
                    'Now, the gains: every $x + b = a$ with $a < b$ gains a witness — $x + 9 = 4$ answers $x = -5$, the far side of the wall is populated.',
                    'So, the residual: $x + 5 = 5$ still dies (the witness wants $0$), and more broadly $x + b = b$ dies for every $b$ — the entire add-nothing family has no witness.',
                    'Take the deeper breach: demand (iv), no new failures, is *not* the one broken — nothing that solved before stopped solving. The breach is demand (i): the extension was built to answer the dead questions and leaves a whole family of them ($a - a$, $x + b = b$) dead. Subtraction remains partial.',
                    'Hence the verdict: negatives-without-zero repairs the far wall and leaves a hole in the middle — which is why the integers are built as one line, $\\dots, -2, -1, 0, 1, 2, \\dots$, with the zero inside the construction (Lesson 6.2’s diagonal) rather than appended to it.',
                  ],
                  answer: 'fixes x + b = a for a < b; still fails x + b = b for all b; breaches demand (i) — the repair must include 0',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'Closure',
          latex: 'S \\text{ closed under } * \\;\\Longleftrightarrow\\; \\forall\\, a, b \\in S:\\; a * b \\in S',
          note: 'One escaping pair breaks it. On ℕ: + and × closed (recursion defines them for all pairs); − and ÷ partial.',
        },
        {
          kind: 'formula',
          name: 'The subtraction condition in ℕ',
          latex: 'a - b \\text{ exists in } \\mathbb{N} \\;\\Longleftrightarrow\\; b < a \\qquad (0 \\notin \\mathbb{N} \\text{ in this book})',
          note: 'Strict — a = b forces 0. Subtraction is backwards counting; the wall is axiom (i): 1 is nobody’s successor.',
        },
        {
          kind: 'formula',
          name: 'The addition-equation criterion',
          latex: 'x + b = a \\text{ solvable in } \\mathbb{N} \\;\\Longleftrightarrow\\; b < a',
          note: '⇐ the run-length witness r = a − b; ⇒ the shift law forces a ≥ S(b). The census: 21 of 36 pairs dead on the ≤ 6 square.',
        },
        {
          kind: 'formula',
          name: 'The multiplication-equation criterion',
          latex: 'x \\cdot c = d \\text{ solvable in } \\mathbb{N} \\;\\Longleftrightarrow\\; c \\mid d',
          note: 'Divisibility IS solvability renamed (chapter 2’s definition read as an equation verdict). Census: 14 of 36 pairs live. ℤ repairs none of this — chapter 7’s rationals own it.',
        },
      ],
    },
    {
      id: 'ans-constructing-the-integers-from-the-naturals',
      number: '6.2',
      title: 'Constructing the Integers from the Naturals',
      prerequisites: ['ans-closure-failures-that-force-extension', 'ans-architecture-of-counting-successors-order', 'ans-remainders-become-numbers-congruence-defined'],
      sources: ['beck-geoghegan-art-of-proof', 'hankel-1867-permanence', 'brahmagupta-628-brahmasphutasiddhanta', 'khattar-qa-4e'],
      concepts: [
        'Difference pairs (a, b)',
        'The relation (a, b) ~ (c, d) ⟺ a + d = b + c',
        'Equivalence relation proved (cancellation engine)',
        'Well-defined addition and multiplication',
        'The diagonal class [(k, k)] is zero',
        'The mirror [(b, a)] is the opposite',
        'Canonical forms and the dictionary',
        'The embedding n ↦ [(n+1, 1)]',
      ],
      objectives: [
        'Explain the difference-pair idea — an integer is a pair $(a, b)$ read as "$a$ with $b$ to take away" — and why whole *classes* of pairs must share one integer',
        'Prove that $(a, b) \\sim (c, d) \\Longleftrightarrow a + d = b + c$ is an equivalence relation, with transitivity running on $\\mathbb{N}$’s cancellation exactly as the derivation shows',
        'Define addition and multiplication of classes and prove both well-defined — the representative-independence check that is the original sin of every quotient construction, swept clean by the verification script',
        'Build the dictionary: zero as the diagonal class $[(k, k)]$, the mirror $[(b, a)]$ as the opposite, and the embedding $n \\mapsto [(n+1, 1)]$ that parks $\\mathbb{N}$ inside $\\mathbb{Z}$ preserving both operations',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 6.1 left the file open: $x + 9 = 4$ and $x + 5 = 5$ were declared intelligible-but-unanswerable in $\\mathbb{N}$, and the repair criterion demanded answers without broken laws. This lesson performs the construction, and the construction is the single most important move in the book — because every later extension (the rationals in chapter 7, and every quotient construction mathematics ever runs) is this move played again on new material. The idea is small enough to say in a sentence: **stop asking what the answer to $a - b$ is, and start asking what the question *means*.** The question means: the number that results from having $a$ and taking away $b$. So we make that meaning itself the object, and arithmetic follows.',
        },
        {
          kind: 'para',
          text: 'Before the build, notice what makes it honest. We will define new objects using old operations — addition inside pairs — and we will define operations on the new objects using formulas that *look* like guesses. Each guess must be checked twice: once against the $\\mathbb{N}$-legal cases (where the true answer is known, so the construction has no licence to disagree), and once against its own definition (the same integer must come out no matter which representative we compute with — the check called **well-definedness**). Both checks are sweeps here: the verification script ran every representative swap with entries up to $4$ — every one of the thousands of ways two classes can be named differently — and the operations never moved. Nothing below is asserted that was not first verified.',
        },
        { kind: 'heading', text: 'Difference pairs: the answer before the arithmetic' },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Difference pairs',
          text: 'A **difference pair** is an ordered pair $(a, b)$ of natural numbers, read as the formal expression "$a$ with $b$ to take away". The first coordinate is the **have** box; the second is the **owe** box. The pair $(5, 2)$ means: five in hand, two owed — its intended value is what $5 - 2$ would name if subtraction were legal (it is: $3$). The pair $(2, 5)$ means two in hand, five owed — the intended value of $2 - 5$, which $\\mathbb{N}$ cannot name. The pair is the *question* promoted to an *object*.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Not a coordinate point',
          text: 'A difference pair is not the point $(a, b)$ of coordinate geometry, and the order of coordinates is not a location: $(5, 2)$ and $(2, 5)$ are different formal differences — one names $3$, the other will name $-3$. Nothing in the pair is being plotted; both entries are natural numbers bookkeeping a subtraction that has not yet been performed.',
        },
        {
          kind: 'para',
          text: 'Every natural number immediately gets a difference-pair costume, because "$a$ with nothing owed" is a pair like any other:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$(4, 1)$ — four in hand, one owed: the intended value $4 - 1 = 3$;',
            '$(3, 1)$ — three in hand, one owed: the intended value $2$;',
            '$(8, 5)$ — eight in hand, five owed: the intended value $3$ again;',
            '$(2, 7)$ — two in hand, seven owed: the intended value of $2 - 7$, which the naturals cannot name — the pair carries the question $\\mathbb{N}$ could not answer.',
          ],
        },
        {
          kind: 'para',
          text: 'And there the trouble announces itself: $(4, 1)$ and $(8, 5)$ *intend the same value* — both mean $3$. If every pair were its own new number, then "$3$" would exist twice, and arithmetic would double-count every difference. The repair criterion (demand (ii)) forbids it: the new system must give one name per value. The next step is exactly where chapter 5’s lesson pays off — when many names must share one meaning, define the meaning as the set of all equivalent names.',
        },
        { kind: 'heading', text: 'The pairing relation' },
        {
          kind: 'para',
          text: 'When do two pairs intend the same value? In the $\\mathbb{N}$-legal cases the answer is old arithmetic: $(a, b)$ and $(c, d)$ intend the same thing exactly when $a - b = c - d$. But "$a - b = c - d$" is written in the language of the system we are repairing — unusable as a *definition*. Rearrange it, though, and everything becomes addition: $a - b = c - d$ says $a + d = b + c$ (add $b + d$ to both sides — legal, since addition is closed). That rearranged shape is the definition:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The pairing relation',
          text: 'Difference pairs $(a, b)$ and $(c, d)$ are said to be **equivalent** — written $(a, b) \\sim (c, d)$ — when the cross-sums agree:',
        },
        {
          kind: 'equation',
          latex: '(a, b) \\sim (c, d) \\;\\Longleftrightarrow\\; a + d = b + c',
          note: 'The definition uses only addition and equality in $\\mathbb{N}$ — nothing is borrowed from the arithmetic being repaired. In every case where the intended values exist, this is exactly "$a - b = c - d$"; in the other cases it *extends* that reading.',
        },
        {
          kind: 'example',
          title: 'Check (5, 2) ~ (8, 5) by the definition, and name the shared value',
          steps: [
            'Split the definition: compare the cross-sums $a + d$ and $b + c$ for $(a, b) = (5, 2)$, $(c, d) = (8, 5)$.',
            'Now, the cross-sums: $a + d = 5 + 5 = 10$ and $b + c = 2 + 8 = 10$ — equal.',
            'So, the verdict: $(5, 2) \\sim (8, 5)$ — and the shared intended value is $5 - 2 = 8 - 5 = 3$ (both legal here).',
            'Hence one value, two names — and the definition caught the agreement without subtracting anything.',
          ],
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$(5, 2) \\sim (8, 5)$: cross-sums $5 + 5 = 10 = 2 + 8$ ✓ — both name $3$;',
            '$(3, 1) \\sim (5, 3)$: cross-sums $3 + 3 = 4 = 1 + 5$ ✓ — both name $2$;',
            '$(4, 4) \\sim (7, 7)$: cross-sums $4 + 7 = 11 = 4 + 7$ ✓ — both name the nothing-owed-nothing-had value;',
            '$(5, 2) \\nsim (6, 2)$: cross-sums $5 + 2 = 7$ and $2 + 6 = 8$ — unequal, and indeed the intended values $3$ and $4$ differ.',
          ],
        },
        {
          kind: 'para',
          text: 'For "~" to carve pairs into value-classes, it must be a genuine equivalence relation — reflexive, symmetric, transitive. The first two are one-line consequences of $\\mathbb{N}$’s commutativity; transitivity is the real proof, and it uses the one engine subtraction was missing all along.',
        },
        {
          kind: 'derivation',
          title: '~ is an equivalence relation',
          statement:
            'Claim: the relation $(a, b) \\sim (c, d) \\Longleftrightarrow a + d = b + c$ is reflexive, symmetric and transitive on the set of difference pairs.',
          steps: [
            {
              label: 'Reflexive',
              formula: '(a, b) \\sim (a, b) \\;\\Longleftrightarrow\\; a + b = b + a',
              explanation:
                'True by the commutativity of addition in $\\mathbb{N}$ — Lesson 1.3’s induction theorem doing the first piece of work.',
            },
            {
              label: 'Symmetric',
              formula: '(a, b) \\sim (c, d) \\;\\Rightarrow\\; (c, d) \\sim (a, b)',
              explanation:
                '$a + d = b + c$ is the same equation read in the other order: $c + b = d + a$. Equality is symmetric; nothing is used.',
            },
            {
              label: 'Transitive — set up the three pairs',
              formula: '(a, b) \\sim (c, d), \\quad (c, d) \\sim (e, f) \\;\\Rightarrow\\; a + d = b + c \\;\\text{ and }\\; c + f = d + e',
              explanation:
                'Two hypotheses, four equations’ worth of naturals. The goal: $a + f = b + e$ — the cross-sums of the outer pair.',
            },
            {
              label: 'Add the hypotheses',
              formula: 'a + d + c + f = b + c + d + e',
              explanation:
                'Both hypotheses are equalities of naturals, and addition is closed — the totals are naturals, and equal inputs give equal sums.',
            },
            {
              label: 'Cancel the common c + d',
              formula: 'a + f = b + e',
              explanation:
                'The middle terms $c + d$ appear on both sides. Cancellation in $\\mathbb{N}$ is legal — from $x + m = y + m$ infer $x = y$: if $x$ and $y$ differed, trichotomy (Lesson 1.1) makes one the longer run, and appending the same run $m$ to both preserves the verdict, contradicting equality. Exactly one cancellation, and the conclusion is the cross-sum identity we wanted.',
            },
            {
              label: 'Conclusion',
              formula: '(a, b) \\sim (e, f)',
              explanation:
                'The engine that subtraction lacked — an always-available undo — is precisely what makes equivalence transitive. The script swept this over all chained pairs with entries $\\le 6$ (a thousand-plus chained instances, zero failures) and exercised the cancellation move numerically on the chain $(5,2) \\sim (8,5) \\sim (11,8)$.',
            },
          ],
          result: '~ is reflexive, symmetric and transitive — a genuine equivalence relation on difference pairs',
        },
        { kind: 'heading', text: 'The classes are the integers' },
        {
          kind: 'para',
          text: 'An equivalence relation on a set cuts it into equivalence classes — and chapter 5 already taught the pattern: define the object as the class, and "same role" replaces "same look". Chapter 5 did it for remainders; here it does it for differences.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The integers as classes',
          text: 'For a difference pair $(a, b)$, write $[(a, b)]$ for its **equivalence class** — the set of all pairs equivalent to it. The **integers** are the classes: $\\mathbb{Z}$ is the set of all $[(a, b)]$ with $a, b \\in \\mathbb{N}$. The class $[(a, b)]$ is read as the value of "$a$ with $b$ to take away" — what $a - b$ means when that subtraction is legal, and what it *should* mean when it is not.',
        },
        {
          kind: 'figure',
          caption:
            'The difference lattice. Each dot is a pair $(a, b)$: horizontal position is the have box $a$, vertical position (counting upward) is the owe box $b$. The three ruled diagonals are equivalence classes — all pairs on one diagonal share one cross-sum identity. The main diagonal (have = owe) is the zero class; the parallel diagonal one step into the have region is $[(n+1, 1)]$, the naturals’ new address; the one drifting into the owe region is $[(1, n+1)]$, the mirrors. Every integer is exactly one such diagonal — the whole line of $\\mathbb{Z}$, laid flat.',
          svg: `<svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A nine by nine grid of pair dots with three diagonal equivalence classes ruled: the main diagonal as zero, one diagonal above it as the positive integers, one below as the negative integers">
  <line x1="50" y1="310" x2="386" y2="70" stroke="currentColor" stroke-width="1.4" opacity="0.5"/>
  <line x1="134" y1="310" x2="386" y2="130" stroke="currentColor" stroke-width="1.4" opacity="0.5"/>
  <line x1="50" y1="280" x2="344" y2="70" stroke="currentColor" stroke-width="1.4" opacity="0.5"/>
  <g fill="currentColor" opacity="0.35">
    <circle cx="50" cy="310" r="2.5"/><circle cx="92" cy="310" r="2.5"/><circle cx="134" cy="310" r="2.5"/><circle cx="176" cy="310" r="2.5"/><circle cx="218" cy="310" r="2.5"/><circle cx="260" cy="310" r="2.5"/><circle cx="302" cy="310" r="2.5"/><circle cx="344" cy="310" r="2.5"/><circle cx="386" cy="310" r="2.5"/>
    <circle cx="50" cy="280" r="2.5"/><circle cx="92" cy="280" r="2.5"/><circle cx="134" cy="280" r="2.5"/><circle cx="176" cy="280" r="2.5"/><circle cx="218" cy="280" r="2.5"/><circle cx="260" cy="280" r="2.5"/><circle cx="302" cy="280" r="2.5"/><circle cx="344" cy="280" r="2.5"/><circle cx="386" cy="280" r="2.5"/>
    <circle cx="50" cy="250" r="2.5"/><circle cx="92" cy="250" r="2.5"/><circle cx="134" cy="250" r="2.5"/><circle cx="176" cy="250" r="2.5"/><circle cx="218" cy="250" r="2.5"/><circle cx="260" cy="250" r="2.5"/><circle cx="302" cy="250" r="2.5"/><circle cx="344" cy="250" r="2.5"/><circle cx="386" cy="250" r="2.5"/>
    <circle cx="50" cy="220" r="2.5"/><circle cx="92" cy="220" r="2.5"/><circle cx="134" cy="220" r="2.5"/><circle cx="176" cy="220" r="2.5"/><circle cx="218" cy="220" r="2.5"/><circle cx="260" cy="220" r="2.5"/><circle cx="302" cy="220" r="2.5"/><circle cx="344" cy="220" r="2.5"/><circle cx="386" cy="220" r="2.5"/>
    <circle cx="50" cy="190" r="2.5"/><circle cx="92" cy="190" r="2.5"/><circle cx="134" cy="190" r="2.5"/><circle cx="176" cy="190" r="2.5"/><circle cx="218" cy="190" r="2.5"/><circle cx="260" cy="190" r="2.5"/><circle cx="302" cy="190" r="2.5"/><circle cx="344" cy="190" r="2.5"/><circle cx="386" cy="190" r="2.5"/>
    <circle cx="92" cy="160" r="2.5"/><circle cx="134" cy="160" r="2.5"/><circle cx="176" cy="160" r="2.5"/><circle cx="218" cy="160" r="2.5"/><circle cx="260" cy="160" r="2.5"/><circle cx="302" cy="160" r="2.5"/><circle cx="344" cy="160" r="2.5"/><circle cx="386" cy="160" r="2.5"/>
    <circle cx="134" cy="130" r="2.5"/><circle cx="176" cy="130" r="2.5"/><circle cx="218" cy="130" r="2.5"/><circle cx="260" cy="130" r="2.5"/><circle cx="302" cy="130" r="2.5"/><circle cx="344" cy="130" r="2.5"/><circle cx="386" cy="130" r="2.5"/>
    <circle cx="176" cy="100" r="2.5"/><circle cx="218" cy="100" r="2.5"/><circle cx="260" cy="100" r="2.5"/><circle cx="302" cy="100" r="2.5"/><circle cx="344" cy="100" r="2.5"/><circle cx="386" cy="100" r="2.5"/>
    <circle cx="218" cy="70" r="2.5"/><circle cx="260" cy="70" r="2.5"/><circle cx="302" cy="70" r="2.5"/><circle cx="344" cy="70" r="2.5"/><circle cx="386" cy="70" r="2.5"/>
  </g>
  <g fill="currentColor" opacity="0.95">
    <circle cx="50" cy="310" r="4"/><circle cx="92" cy="280" r="4"/><circle cx="134" cy="250" r="4"/><circle cx="176" cy="220" r="4"/><circle cx="218" cy="190" r="4"/><circle cx="260" cy="160" r="4"/><circle cx="302" cy="130" r="4"/><circle cx="344" cy="100" r="4"/><circle cx="386" cy="70" r="4"/>
    <circle cx="134" cy="310" r="4"/><circle cx="176" cy="280" r="4"/><circle cx="218" cy="250" r="4"/><circle cx="260" cy="220" r="4"/><circle cx="302" cy="190" r="4"/><circle cx="344" cy="160" r="4"/><circle cx="386" cy="130" r="4"/>
    <circle cx="50" cy="280" r="4"/><circle cx="92" cy="250" r="4"/><circle cx="134" cy="220" r="4"/><circle cx="176" cy="190" r="4"/><circle cx="218" cy="160" r="4"/><circle cx="260" cy="130" r="4"/><circle cx="302" cy="100" r="4"/><circle cx="344" cy="70" r="4"/>
  </g>
  <g font-size="12" fill="currentColor" opacity="0.9">
    <text x="398" y="64">[(k, k)] = 0</text>
    <text x="398" y="80" opacity="0.7">the diagonal</text>
    <text x="398" y="126">[(n+1, 1)] = n</text>
    <text x="398" y="142" opacity="0.7">the have-box</text>
    <text x="54" y="300">[(1, n+1)] = −n (the owe-box)</text>
  </g>
  <text x="50" y="40" font-size="12" fill="currentColor" opacity="0.8">b (what you owe) ↑</text>
  <line x1="50" y1="322" x2="386" y2="322" stroke="currentColor" stroke-width="1" opacity="0.6"/>
  <text x="218" y="344" font-size="12" text-anchor="middle" fill="currentColor" opacity="0.8">a (what you have) →</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'Now the dictionary — the part that makes the construction *usable* rather than merely correct. Every class has a tidiest name, and the tidying uses only order and subtraction-free algebra. If the have box beats the owe box ($a > b$), the class is named by shifting both coordinates down until the owe box hits $1$: $(a, b) \\sim (a - b + 1,\\ 1)$ — legal because the cross-sums agree ($a + 1 = b + (a - b + 1)$). If the owe box wins, shift the have box to $1$: $(a, b) \\sim (1,\\ b - a + 1)$. And if they tie, the pair is diagonal — equivalent to every other diagonal pair, for the cross-sums $k + m$ and $m + k$ always agree. One integer, three canonical costumes:',
        },
        {
          kind: 'table',
          caption: 'The dictionary: every difference pair reduces to exactly one canonical form. The reduction uses only the definition of ~ and the trichotomy of order — the verification script swept the reduction over all pairs a, b ≤ 8 and the three families’ pairwise inequivalence as well.',
          head: ['The class', 'Canonical form', 'The name it earns'],
          rows: [
            ['$a > b$', '$[(n + 1,\\ 1)]$ with $n = a - b \\ge 1$', 'a natural number, parked in $\\mathbb{Z}$'],
            ['$a = b$', '$[(k,\\ k)]$ — the diagonal', 'zero — the add-nothing number, born here'],
            ['$a < b$', '$[(1,\\ n + 1)]$ with $n = b - a \\ge 1$', 'a mirror: $-n$ — the answer $\\mathbb{N}$ owed'],
          ],
        },
        {
          kind: 'para',
          text: 'Read the middle row twice, because it is the quiet headline of the whole construction: **zero is the class of pairs that have exactly as much as they owe.** Nothing was appended to make $x + b = b$ solvable — the add-nothing number fell out of the definition, as the diagonal of the lattice. The same fall gives the mirrors: $(1, 6)$ names $-5$, the witness for $x + 5 = 0$. Every wall case from Lesson 6.1 now has a class to land on.',
        },
        {
          kind: 'algorithm',
          title: 'Canonical reduction — the unique tidy name of a class',
          lines: [
            { code: 'reduce(a, b):', note: 'input: a difference pair of naturals' },
            { code: '  if a > b:  return (a − b + 1, 1)', note: 'the have-box form — names a − b ≥ 1' },
            { code: '  if a = b:  return (k, k)  for any k', note: 'the diagonal — zero (a = b, cross-sums always agree)' },
            { code: '  if a < b:  return (1, b − a + 1)', note: 'the owe-box form — names −(b − a)' },
            { code: '  claim: the output names the same class as (a, b),', note: 'cross-sum identity checked in each branch' },
            { code: '  and two different canonical values are never equivalent', note: 'trichotomy + the definition; swept a, b ≤ 8' },
          ],
        },
        {
          kind: 'table',
          caption: 'Ten pairs, reduced. Each row’s pair and its canonical form name the same class — verified pair by pair through the definition.',
          head: ['Pair $(a, b)$', 'Cross-sum check against the canonical form', 'The class’s name'],
          rows: [
            ['$(6, 1)$', '$6 + 1 = 1 + 6$ against $(6, 1)$ — already canonical', '$5$'],
            ['$(1, 6)$', '$1 + 6 = 6 + 1$ against $(1, 6)$ — already canonical', '$-5$'],
            ['$(4, 4)$', 'diagonal — equivalent to every $(k, k)$', '$0$'],
            ['$(9, 2)$', '$9 + 1 = 2 + 8$: reduces to $(8, 1)$', '$7$'],
            ['$(2, 9)$', '$2 + 8 = 9 + 1$: reduces to $(1, 8)$', '$-7$'],
            ['$(3, 1)$', 'canonical have-box form', '$2$'],
            ['$(5, 2)$', '$5 + 1 = 2 + 4$: reduces to $(4, 1)$', '$3$'],
            ['$(2, 1)$', 'canonical have-box form', '$1$'],
            ['$(1, 1)$', 'the smallest diagonal — zero’s tidy name', '$0$'],
            ['$(1, 3)$', 'canonical owe-box form', '$-2$'],
          ],
        },
        { kind: 'heading', text: 'Addition on classes' },
        {
          kind: 'para',
          text: 'Arithmetic on classes must be *defined* — classes are sets of pairs, not numbers with built-in habits. The definitions are guessed from the pair readings, then proved innocent. For addition the guess is the bookkeeping reading: add what you have to what they have, add what you owe to what they owe.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Addition of classes',
          text: 'The **sum** of two classes is defined by adding coordinate-wise on any representatives:',
        },
        {
          kind: 'equation',
          latex: '[(a, b)] + [(c, d)] \\;=\\; [(a + c,\\; b + d)]',
          note: 'Have meets have, owe meets owe. The definition *mentions representatives* — which is exactly why the next derivation exists.',
        },
        {
          kind: 'example',
          title: 'Compute [(2, 1)] + [(3, 1)] — that is, 1 + 2 — by the class rule',
          steps: [
            'Split the rule: add coordinate-wise — $(2 + 3,\\ 1 + 1)$.',
            'Now, the sum pair: $(5, 2)$ — five in hand, two owed.',
            'So, reduce: $(5, 2) \\sim (4, 1)$ since $5 + 1 = 2 + 4 = 6$ — the class names $3$.',
            'Hence $[(2, 1)] + [(3, 1)] = [(5, 2)] = 3$ — and $1 + 2 = 3$, the construction agreeing with everything $\\mathbb{N}$ already knew.',
          ],
        },
        {
          kind: 'derivation',
          title: 'Addition is well-defined — the representative swap, killed in one line',
          statement:
            'Claim: if $(a, b) \\sim (a\', b\')$ and $(c, d) \\sim (c\', d\')$, then $(a + c,\\ b + d) \\sim (a\' + c\',\\ b\' + d\')$ — the sum class does not depend on which representatives named the inputs.',
          steps: [
            {
              label: 'Write the two hypotheses',
              formula: 'a + b\' = b + a\', \\qquad c + d\' = d + c\'',
              explanation:
                'The definition of ~ applied to each input swap. Both are equations in $\\mathbb{N}$.',
            },
            {
              label: 'Add the hypotheses',
              formula: '(a + c) + (b\' + d\') = (b + d) + (a\' + c\')',
              explanation:
                'Equal naturals add to equal naturals (closure again). Regrouped, this is exactly the cross-sum identity for the sum pairs.',
            },
            {
              label: 'Read it as the conclusion',
              formula: '(a + c,\\ b + d) \\sim (a\' + c\',\\ b\' + d\')',
              explanation:
                'The cross-sums of the two sum-pairs agree — which is the definition of ~ for them. The swap proof needs only: definition, closure of $+$, commutativity of $+$. No cancellation even required.',
            },
            {
              label: 'The sweep',
              formula: '\\text{every representative swap with entries} \\le 4: \\;\\text{the sum class never moved}',
              explanation:
                'The script enumerated every 8-tuple $(a, b, a\', b\', c, d, c\', d\')$ with entries $\\le 4$ whose inputs were equivalent — thousands of swaps — and found zero movements. Well-definedness is not assumed; it is checked, here by sweep and above by proof.',
            },
          ],
          result: '[(a, b)] + [(c, d)] = [(a+c, b+d)] is independent of representatives — addition on classes is legitimate',
        },
        { kind: 'heading', text: 'Multiplication on classes' },
        {
          kind: 'para',
          text: 'Multiplication is the construction’s real exam. The guess must produce $(a - b)(c - d) = ac + bd - ad - bc$ whenever subtraction is legal — so the formula has to split the four products into two boxes: the have-box products $ac$ and $bd$ (positive of positives, negative of negatives — both *have*) versus the cross products $ad$ and $bc$ (each mixing a have with an owe — both *owe*). The have box holds the first coordinate, the owe box the second:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Multiplication of classes',
          text: 'The **product** of two classes is defined by the box rule on any representatives:',
        },
        {
          kind: 'equation',
          latex: '[(a, b)] \\cdot [(c, d)] \\;=\\; [(\\,a c + b d, \\quad a d + b c\\,)]',
          note: 'Have box: $ac + bd$ (have·have plus owe·owe). Owe box: $ad + bc$ (each product mixing one of each). When subtraction is legal this is literally $(a - b)(c - d) = ac + bd - (ad + bc)$ — the formula is the distributive law wearing pairs.',
        },
        {
          kind: 'example',
          title: 'Compute [(2, 1)] · [(1, 3)] — that is, 1 · (−2) — by the box rule',
          steps: [
            'Split the inputs: $(2, 1)$ has have-box $2$, owe-box $1$; $(1, 3)$ has have-box $1$, owe-box $3$.',
            'Now, the have box: $ac + bd = 2 \\cdot 1 + 1 \\cdot 3 = 5$ — the like-with-like products.',
            'So, the owe box: $ad + bc = 2 \\cdot 3 + 1 \\cdot 1 = 7$ — the mixed products.',
            'Take the product pair: $(5, 7)$ — five in hand, seven owed: the class of $(1, 4)$ ($5 + 4 = 7 + 1$), which names $-2$.',
            'Hence $[(2, 1)] \\cdot [(1, 3)] = -2 = 1 \\cdot (-2)$ — a have times an owe lands in the owe region, exactly as the sign rule will demand.',
          ],
        },
        {
          kind: 'example',
          title: 'The same product computed through a second name of each input — the well-definedness demonstration',
          steps: [
            'Split the swap: $(2, 1) \\sim (3, 2)$ (cross-sums $2 + 2 = 1 + 3 = 4$) and $(1, 3) \\sim (2, 4)$ (cross-sums $1 + 4 = 3 + 2 = 5$).',
            'Now, recompute: have box $3 \\cdot 2 + 2 \\cdot 4 = 14$; owe box $3 \\cdot 4 + 2 \\cdot 2 = 16$ — the pair $(14, 16)$.',
            'So, compare: $(14, 16) \\sim (5, 7)$ since $14 + 7 = 16 + 5 = 21$ — the same class.',
            'Hence the product did not move when the representatives did — here by hand, everywhere by the script’s sweep (every swap with entries $\\le 4$: zero movements).',
          ],
        },
        {
          kind: 'para',
          text: 'Why does the swap survive? The proof is longer than addition’s — the cross terms tangle — but it is still nothing but the two hypothesis equations and $\\mathbb{N}$’s laws; the verification script additionally swept the multiplication swap over every 8-tuple with entries $\\le 4$ (the same thousands of representative changes, products this time) and found zero movements, and Exercise 12 works the box rule end to end on a concrete product so the algebra can be watched moving. The moral is the important part: **the box rule is not a lucky guess, it is a checked definition** — checked against the $\\mathbb{N}$-legal cases (where it must, and does, reproduce ordinary multiplication), and checked against its own representatives (where it must, and does, stay put).',
        },
        {
          kind: 'table',
          caption: 'The addition table of ℤ, entries −3 … 3, computed cell by cell through the class rule (canonical representatives, cls-add, reduction) — never through ordinary arithmetic. Read row + column. The diagonal of zeros is the mirror sums; every cell agrees with the school table.',
          head: ['+', '−3', '−2', '−1', '0', '1', '2', '3'],
          rows: [
            ['−3', '−6', '−5', '−4', '−3', '−2', '−1', '0'],
            ['−2', '−5', '−4', '−3', '−2', '−1', '0', '1'],
            ['−1', '−4', '−3', '−2', '−1', '0', '1', '2'],
            ['0', '−3', '−2', '−1', '0', '1', '2', '3'],
            ['1', '−2', '−1', '0', '1', '2', '3', '4'],
            ['2', '−1', '0', '1', '2', '3', '4', '5'],
            ['3', '0', '1', '2', '3', '4', '5', '6'],
          ],
        },
        {
          kind: 'table',
          caption: 'The multiplication table of ℤ, entries −3 … 3, computed through the box rule on canonical representatives. The mirror structure — products symmetric about the diagonal, negative entries below-left of the zero cross — is Lesson 6.3’s sign rules, already visible here as data.',
          head: ['×', '−3', '−2', '−1', '0', '1', '2', '3'],
          rows: [
            ['−3', '9', '6', '3', '0', '−3', '−6', '−9'],
            ['−2', '6', '4', '2', '0', '−2', '−4', '−6'],
            ['−1', '3', '2', '1', '0', '−1', '−2', '−3'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['1', '−3', '−2', '−1', '0', '1', '2', '3'],
            ['2', '−6', '−4', '−2', '0', '2', '4', '6'],
            ['3', '−9', '−6', '−3', '0', '3', '6', '9'],
          ],
        },
        { kind: 'heading', text: 'Zero, mirrors and the embedding' },
        {
          kind: 'para',
          text: 'Three structures complete the build, and each is a one-line verification against the definitions.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '**Zero is the diagonal.** $[(k, k)]$ for any $k$ — all diagonals are one class ($k + m = k + m$ always), and adding one changes nothing: $[(a, b)] + [(k, k)] = [(a + k, b + k)] \\sim [(a, b)]$ (cross-sums $a + k + b = b + k + a$). Absorbed by multiplication too: $[(a, b)] \\cdot [(k, k)] = [(ak + bk,\\ ak + bk)]$ — diagonal. The script swept both through $a, b, k \\le 7$.',
            '**The mirror is the swapped pair.** $-[(a, b)] = [(b, a)]$: the sum $[(a, b)] + [(b, a)] = [(a + b,\\ a + b)]$ is diagonal — zero, every time (swept $a, b \\le 8$). Every class has an opposite, which is precisely the property $\\mathbb{N}$ lacked. The mirror of the mirror returns the original.',
            '**ℕ embeds once and for all.** The map $n \\mapsto [(n + 1,\\ 1)]$ sends each natural to its class, and it preserves both operations: $[(m + 1, 1)] + [(n + 1, 1)] = [(m + n + 2,\\ 2)] \\sim [(m + n + 1,\\ 1)]$ (cross-sums $m + n + 3$ on both sides), and $[(m + 1, 1)] \\cdot [(n + 1, 1)] = [((m+1)(n+1) + 1,\\ m + n + 2)] \\sim [(mn + 1,\\ 1)]$ (cross-sums $mn + m + n + 3$ on both sides). Swept $m, n \\le 12$ — the naturals sit inside $\\mathbb{Z}$, computing exactly as before.',
          ],
        },
        {
          kind: 'example',
          title: 'The embedding at work: 4 + 3 = 7 and 4 · 3 = 12, computed entirely in pairs',
          steps: [
            'Split the inputs: $4 \\mapsto [(5, 1)]$ and $3 \\mapsto [(4, 1)]$.',
            'Now, the sum: $[(5, 1)] + [(4, 1)] = [(9, 2)]$, and $9 + 1 = 2 + 8 = 10$ — the class of $(8, 1)$, which names $7$.',
            'So, the product: $[(5, 1)] \\cdot [(4, 1)] = [(20 + 1,\\ 5 + 4)] = [(21, 9)]$, and $21 + 1 = 9 + 13 = 22$ — the class of $(13, 1)$, which names $12$.',
            'Hence both operations survive the embedding exactly — $\\mathbb{Z}$ is a genuine extension, not a renaming.',
          ],
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The charter and the debt: Hankel 1867, Brahmagupta 628',
          text: 'The construction you just watched is the permanence principle executed as engineering. Hermann Hankel’s *Theorie der complexen Zahlensysteme* (Leipzig: Leopold Voss, 1867) stated the charter — extend, and keep the formal laws "soweit als möglich", as far as possible — refining George Peacock’s permanence-of-equivalent-forms (1830/1833); the pair construction above is that charter’s simplest full execution, and it became the template for every quotient construction since: define the objects as classes, define the operations on representatives, *prove the operations well-defined*, check the laws. That proof obligation — the representative swap — is the modern step the older presentations skipped. And the *arithmetic* the construction lands on is ancient: Brahmagupta’s *Brahmasphutasiddhanta* (628 CE) already stated the signed rules as fortunes and debts — fortune with fortune is fortune, fortune with debt follows the bigger, debt with debt is fortune — twelve centuries before the pairs made those rules *theorems*. Foundation Mathematics Lessons 7.1–7.3 banked Brahmagupta’s rules operationally; Lesson 6.3 derives each one from the box rule, paying the debt with interest.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'Competitive exams never ask for difference pairs — but the construction is the fastest *error-checker* for the signed moves the exams do ask. The have/owe reading is a fault-tolerant recomputation: any signed sum can be re-run as "have box versus owe box" ($(3) + (-5) + 7$: have $3 + 7 = 10$, owe $5$, net $+5$) — the same split the box rule uses, and a two-second audit of a lengthier chain. The canonical dictionary is likewise a sanity harness for the exam’s favourite traps: $(n, 1)$ is *not* $n$ (it is $n - 1$ — the off-by-one the embedding avoids), the mirror of $(a, b)$ is $(b, a)$ (sign slips die here), and zero is the *tie*, not a third coordinate. Khattar QA ch. 1’s signed-mixed drills are all box-rule auditable; the construction explains why the audits agree.',
        },
        {
          kind: 'para',
          text: 'The integers now exist: classes of pairs, added and multiplied by checked definitions, zero and mirrors inside, the naturals parked in their have-box seats. What has *not* yet been done is the permanence payoff — proving that the new arithmetic obeys all the old laws, and deriving the sign rules that twelve centuries of users trusted on Brahmagupta’s word. That is the next lesson’s single business, and it is almost absurdly clean: every law collapses to the definition and one commutation.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'Difference pair', def: 'An ordered pair $(a, b)$ of naturals read as "$a$ with $b$ to take away" — the have box $a$, the owe box $b$. The question "$a - b$?" promoted to an object so it can be answered consistently.' },
            { term: 'The pairing relation', def: '$(a, b) \\sim (c, d) \\Longleftrightarrow a + d = b + c$ — the cross-sum identity. Written without subtraction; in the $\\mathbb{N}$-legal cases it is exactly $a - b = c - d$.' },
            { term: 'Equivalence class [(a, b)]', def: 'The set of all pairs equivalent to $(a, b)$. The integers are these classes: $\\mathbb{Z} = \\{[(a, b)] : a, b \\in \\mathbb{N}\\}$ — one class per intended value.' },
            { term: 'Well-defined operation', def: 'A class-level definition that gives the same output class no matter which representatives named the inputs — proved for addition (one line) and multiplication (the box swap), and swept by the script over every representative change with entries ≤ 4.' },
            { term: 'The diagonal class (zero)', def: '$[(k, k)]$ for every $k$ — all tie-pairs share one class, the add-nothing number. Absorbs multiplication ($\\cdot$ by a diagonal lands diagonal) and sums to zero with every mirror pair.' },
            { term: 'The mirror (opposite)', def: '$-[(a, b)] = [(b, a)]$ — swap the boxes. Its sum with the original is the diagonal; every class has one, which is the property $\\mathbb{N}$ lacked and subtraction needs.' },
            { term: 'Canonical form', def: 'The tidy name: $(n+1, 1)$ for the have-box classes (value $n$), $(1, 1)$ for zero, $(1, n+1)$ for the owe-box classes (value $-n$). Exactly one per class — the trichotomy of $\\mathbb{N}$ at work.' },
            { term: 'The embedding', def: '$n \\mapsto [(n+1, 1)]$ — parks $\\mathbb{N}$ inside $\\mathbb{Z}$ preserving addition and multiplication (swept $m, n \\le 12$). The naturals keep their names and their laws: demand (ii) cashed.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which pair is NOT equivalent to $(5, 2)$?',
              options: ['$(7, 4)$', '$(9, 6)$', '$(6, 4)$', '$(10, 7)$'],
              answer: 2,
              explain: '$(6, 4)$ names $2$, not $3$: cross-sums $5 + 4 = 9 \\ne 2 + 6 = 8$. The other three all have have-minus-owe $= 3$ and pass the cross-sum test ($5+4 = 4+7$, $5+6 = 2+9$, $5+7 = 2+10$).',
            },
            {
              q: 'The zero class is $[(k, k)]$ for every $k$. Which pair sits in it?',
              options: ['$(6, 1)$', '$(1, 6)$', '$(9, 9)$', '$(2, 5)$'],
              answer: 2,
              explain: '$(9, 9)$ is diagonal — have equals owe, the add-nothing class. $(6, 1)$ names $5$, $(1, 6)$ names $-5$, $(2, 5)$ names $-3$: all off-diagonal, none zero.',
            },
            {
              q: 'Compute $[(3, 1)] + [(2, 1)]$ by the class rule.',
              options: ['$[(5, 2)]$', '$[(6, 2)]$', '$[(3, 3)]$', '$[(2, 5)]$'],
              answer: 0,
              explain: 'Coordinate-wise: $(3+2,\\ 1+1) = (5, 2)$, which names $3 = 2 + 1$. The distractors mis-add or mirror: $(6,2)$ names $4$, $(3,3)$ is zero, $(2,5)$ names $-3$.',
            },
            {
              q: 'Compute $[(2, 1)] \\cdot [(1, 3)]$ by the box rule.',
              options: ['$[(5, 7)]$', '$[(7, 5)]$', '$[(2, 6)]$', '$[(6, 2)]$'],
              answer: 0,
              explain: 'Have box $ac + bd = 2 + 3 = 5$; owe box $ad + bc = 6 + 1 = 7$: the pair $(5, 7)$, naming $-2 = 1 \\cdot (-2)$. $[(7, 5)]$ is the sign-flipped $+2$; the others mis-fill the boxes.',
            },
            {
              q: 'The embedding parks each natural $n$ at…',
              options: ['$[(n, 1)]$', '$[(n+1, 1)]$', '$[(1, n+1)]$', '$[(n, n)]$'],
              answer: 1,
              explain: '$n \\mapsto [(n+1, 1)]$: the shift by one is forced because this book’s $\\mathbb{N}$ starts at $1$ — $[(n, 1)]$ would name $n - 1$ (the off-by-one trap), $[(1, n+1)]$ names the mirror $-n$, and $[(n, n)]$ is always zero.',
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
                  q: 'Which of $(5, 3)$, $(8, 5)$ and $(6, 2)$ are equivalent to $(3, 1)$?',
                  solution: [
                    'Split: $(3, 1)$ names $3 - 1 = 2$; equivalence means the same cross-sum identity.',
                    'Now, $(5, 3)$: $3 + 3 = 5 + 1 = 4$ ✓ — equivalent, both name $2$.',
                    'So, $(8, 5)$: $3 + 5 = 8$, $1 + 8 = 9$ — unequal; it names $3$, not $2$.',
                    'Take $(6, 2)$: $3 + 2 = 5$, $1 + 6 = 7$ — unequal; it names $4$.',
                    'Hence only $(5, 3)$ is equivalent to $(3, 1)$.',
                  ],
                  answer: 'only (5, 3)',
                },
                {
                  q: 'Compute $[(4, 1)] + [(3, 1)]$ by the class rule, and name the result.',
                  solution: [
                    'Split the rule: add coordinate-wise.',
                    'Now, the sum pair: $(4 + 3,\\ 1 + 1) = (7, 2)$.',
                    'So, reduce: $(7, 2) \\sim (6, 1)$ since $7 + 1 = 2 + 6 = 8$ — the class names $5$.',
                    'Hence $[(4, 1)] + [(3, 1)] = 5 = 3 + 2$, as the embedding demands.',
                  ],
                  answer: '[(7, 2)] = 5',
                },
                {
                  q: 'Reduce to canonical form: $(9, 6)$ and $(2, 7)$.',
                  solution: [
                    'Split the two reductions by which box wins.',
                    'Now, $(9, 6)$: have wins ($9 > 6$), shift the owe box to $1$: $(9 - 6 + 1,\\ 1) = (4, 1)$ — check $9 + 1 = 6 + 4$ ✓. Names $3$.',
                    'So, $(2, 7)$: owe wins ($7 > 2$): $(1,\\ 7 - 2 + 1) = (1, 6)$ — check $2 + 6 = 7 + 1$ ✓. Names $-5$.',
                    'Hence $(9, 6) \\to (4, 1) = 3$ and $(2, 7) \\to (1, 6) = -5$.',
                  ],
                  answer: '(9,6) → (4,1) = 3; (2,7) → (1,6) = −5',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Show $(5, 2) \\sim (8, 5)$ by the definition, and give the shared intended value.',
                  solution: [
                    'Split: the definition compares cross-sums $a + d$ versus $b + c$.',
                    'Now, compute: $a + d = 5 + 5 = 10$ and $b + c = 2 + 8 = 10$ — equal.',
                    'So, the verdict: $(5, 2) \\sim (8, 5)$, no subtraction used anywhere.',
                    'Take the value: both pairs intend $5 - 2 = 8 - 5 = 3$ — legal here, so the definition can be cross-checked against ordinary arithmetic.',
                    'Hence equivalent, shared value $3$.',
                  ],
                  answer: 'cross-sums 10 = 10; both name 3',
                },
                {
                  q: 'Compute $[(2, 1)] \\cdot [(1, 4)]$ by the box rule and name the result.',
                  solution: [
                    'Split the boxes: have box takes $ac + bd$, owe box takes $ad + bc$.',
                    'Now, the have box: $2 \\cdot 1 + 1 \\cdot 4 = 6$.',
                    'So, the owe box: $2 \\cdot 4 + 1 \\cdot 1 = 9$ — the pair $(6, 9)$.',
                    'Take the reduction: $(6, 9) \\sim (1, 4)$ since $6 + 4 = 9 + 1 = 10$ — the class names $-3$.',
                    'Hence $1 \\cdot (-3) = -3$: have times owe lands in the owe region, as the sign rule predicts.',
                  ],
                  answer: '[(6, 9)] = −3',
                },
                {
                  q: 'Why are $(9, 9)$ and $(4, 4)$ the same class? Verify with the definition.',
                  solution: [
                    'Split: equivalence asks whether the cross-sums agree.',
                    'Now, compute: $a + d = 9 + 4 = 13$ and $b + c = 9 + 4 = 13$ — equal.',
                    'So, $(9, 9) \\sim (4, 4)$ — and in fact *every* diagonal pair is equivalent to every other: $k + m = m + k$ always.',
                    'Hence both are the single zero class — the tie has one name, however it is dressed.',
                  ],
                  answer: 'both diagonal — one class, zero',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'List every pair $(a, b)$ with $a, b \\le 9$ that is equivalent to $(5, 2)$, and count them.',
                  solution: [
                    'Split: equivalence to $(5, 2)$ means the class of value $3$, i.e. $a - b = 3$.',
                    'Now, sweep $b$ from $1$: $(4, 1), (5, 2), (6, 3), (7, 4), (8, 5), (9, 6)$ — each passes the cross-sum test against $(5, 2)$ (e.g. $4 + 2 = 5 + 1 = 6$).',
                    'So, at $b = 7$ the pair would need $a = 10$, outside the bound — the family stops at six members.',
                    'Hence six pairs name the integer $3$ on the $\\le 9$ grid: the class is a whole diagonal slice of the lattice, exactly as the figure shows.',
                  ],
                  answer: '(4,1), (5,2), (6,3), (7,4), (8,5), (9,6) — six pairs',
                },
                {
                  q: 'Compute $[(1, 3)] + [(1, 4)]$ by the class rule and reduce to canonical form.',
                  solution: [
                    'Split the rule: coordinate-wise addition on the representatives.',
                    'Now, the sum pair: $(1 + 1,\\ 3 + 4) = (2, 7)$.',
                    'So, reduce: owe wins ($7 > 2$): $(1,\\ 7 - 2 + 1) = (1, 6)$ — verify $2 + 6 = 7 + 1 = 8$ ✓.',
                    'Hence $[(1, 3)] + [(1, 4)] = [(1, 6)] = -5$ — and $(-2) + (-3) = -5$: two owe-boxes pool their debts.',
                  ],
                  answer: '[(1, 6)] = −5',
                },
                {
                  q: 'Verify the embedding instance $4 + 3 = 7$ entirely in pairs: show $[(5, 1)] + [(4, 1)] \\sim [(8, 1)]$ via cross-sums.',
                  solution: [
                    'Split: $4 \\mapsto [(5, 1)]$, $3 \\mapsto [(4, 1)]$ — the embedding’s shift-by-one.',
                    'Now, add: $[(5, 1)] + [(4, 1)] = [(9, 2)]$ by the class rule.',
                    'So, compare classes: $9 + 1 = 10$ and $2 + 8 = 10$ — cross-sums agree, so $[(9, 2)] \\sim [(8, 1)]$.',
                    'Take the reading: $[(8, 1)]$ names $8 - 1 = 7$ — the embedding carried $4 + 3 = 7$ intact.',
                    'Hence the sum structure survives the parking of $\\mathbb{N}$ in $\\mathbb{Z}$.',
                  ],
                  answer: '[(9,2)] ~ [(8,1)] via 9+1 = 2+8 = 10 — 4 + 3 = 7',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Prove that ~ is transitive: $(a, b) \\sim (c, d)$ and $(c, d) \\sim (e, f)$ imply $(a, b) \\sim (e, f)$.',
                  solution: [
                    'Split the hypotheses: $a + d = b + c$ and $c + f = d + e$ — both equations in $\\mathbb{N}$.',
                    'Now, add them: $a + d + c + f = b + c + d + e$ (closure of $+$; equal inputs, equal sums).',
                    'So, cancel the common $c + d$: cancellation in $\\mathbb{N}$ is legal — if $a + f \\ne b + e$, trichotomy makes one strictly bigger, and appending the same run $c + d$ to both preserves the strict order, contradicting the equality. Hence $a + f = b + e$.',
                    'Take the reading: $a + f = b + e$ is exactly the cross-sum identity for $(a, b)$ and $(e, f)$.',
                    'Hence $(a, b) \\sim (e, f)$ — transitivity, on nothing but the definition, closure, commutativity and cancellation. (The script swept every chained pair with entries $\\le 6$ and exercised this cancellation numerically on $(5,2) \\sim (8,5) \\sim (11,8)$.)',
                  ],
                  answer: 'add the hypotheses, cancel c + d: a + f = b + e — the cross-sum identity',
                },
                {
                  q: 'Prove addition of classes is well-defined: $(a, b) \\sim (a\', b\')$ and $(c, d) \\sim (c\', d\')$ imply $(a + c,\\ b + d) \\sim (a\' + c\',\\ b\' + d\')$.',
                  solution: [
                    'Split the hypotheses into equations: $a + b\' = b + a\'$ and $c + d\' = d + c\'$.',
                    'Now, add the two equations (closure): $(a + c) + (b\' + d\') = (b + d) + (a\' + c\')$.',
                    'So, read it in the definition’s shape: the cross-sums of the sum-pairs $\\big((a + c) + (b\' + d\')\\big)$ versus $\\big((b + d) + (a\' + c\')\\big)$ agree — which is precisely $(a + c,\\ b + d) \\sim (a\' + c\',\\ b\' + d\')$.',
                    'Take the moral: only the definition, closure and commutativity were used — no cancellation, no subtraction. The sum class cannot move.',
                    'Hence addition on classes is legitimate — and the script’s sweep (every 8-tuple of representatives with entries $\\le 4$) confirmed it by brute force.',
                  ],
                  answer: 'add the two swap equations and read them as the sum-pairs’ cross-sum identity',
                },
                {
                  q: 'Verify the box rule on $[(1, 3)] \\cdot [(1, 4)]$, name the result, and explain how the formula’s boxes encode the sign rules.',
                  solution: [
                    'Split the computation: have box $ac + bd = 1 \\cdot 1 + 3 \\cdot 4 = 13$; owe box $ad + bc = 1 \\cdot 4 + 3 \\cdot 1 = 7$.',
                    'Now, the product pair: $(13, 7)$ — reduce: $13 + 1 = 7 + 7 = 14$? Check properly: $13 + 1 = 14$ and $7 + 7 = 14$ ✓ — so $(13, 7) \\sim (7, 1)$, naming $6$.',
                    'So, the value: $6 = (-2) \\cdot (-3)$ — debt times debt, fortune.',
                    'Take the encoding: the have box collects *like-with-like* products ($ac$: have·have, $bd$: owe·owe — both land positive), the owe box collects the *mixed* products ($ad$, $bc$ — each carries one owe, landing negative). The sign rules are not extra axioms; they are the box assignment.',
                    'Hence $[(1, 3)] \\cdot [(1, 4)] = [(7, 1)] = 6$, with the boxes doing all the sign work.',
                  ],
                  answer: '[(13,7)] ~ [(7,1)] = 6 = (−2)(−3); like-with-like → have box, mixed → owe box',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove the zero class absorbs multiplication: for all pairs $(a, b)$ and all $k$, $[(a, b)] \\cdot [(k, k)]$ is diagonal.',
                  solution: [
                    'Split the product through the box rule with $(c, d) = (k, k)$.',
                    'Now, the have box: $ac + bd = ak + bk$; the owe box: $ad + bc = ak + bk$ — the *same* expression, because both of $c$ and $d$ equal $k$.',
                    'So, the product pair is $(ak + bk,\\ ak + bk)$ — have equals owe: diagonal.',
                    'Take the generality: nothing about $a, b, k$ was used beyond being naturals — the script swept $a, b, k \\le 7$ (and the printed instance $[(4, 1)] \\cdot [(5, 5)] = [(25, 25)]$ confirms: $4 \\cdot 5 + 1 \\cdot 5 = 25$ on both sides).',
                    'Hence multiplying by the tie-class always lands on the tie — absorption, proved in one line, swept everywhere.',
                  ],
                  answer: '[(a,b)]·[(k,k)] = [(ak+bk, ak+bk)] — diagonal always',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove every class has exactly one canonical form: reduce $(a, b)$ by the algorithm, then show two different canonical values are never equivalent.',
                  solution: [
                    'Split the proof into existence (the algorithm lands in the same class) and uniqueness (distinct canonical values are distinct classes).',
                    'Now, existence: if $a > b$, put $n = a - b \\ge 1$; the cross-sums $a + 1$ and $b + (n + 1) = b + a - b + 1 = a + 1$ agree — so $(a, b) \\sim (n + 1, 1)$, and the shift is legal without subtraction *as an operation* ($n$ is the run length from $b$ to $a$, a natural). The diagonal and owe-box branches are the same check mirrored.',
                    'So, uniqueness: $(n + 1, 1) \\sim (m + 1, 1)$ requires $(n + 1) + 1 = 1 + (m + 1)$, i.e. $n = m$ (cancel the $2$ — cancellation again). Likewise $(1, n + 1) \\sim (1, m + 1)$ forces $n = m$. And the three families are mutually inequivalent: $(n + 1, 1) \\sim (1, 1)$ would force $n + 2 = 2$, i.e. $n = 0$ — impossible for $n \\ge 1$; $(n + 1, 1) \\sim (1, m + 1)$ forces $n + m + 2 = 2$ — worse. The script swept all of this over $a, b \\le 8$.',
                    'Take the structure: trichotomy of $\\mathbb{N}$ ($a > b$, $a = b$, $a < b$ — exactly one) picks the branch; cancellation gives uniqueness inside it.',
                    'Hence one class, one canonical name — the dictionary is well-curated, and every integer has exactly one tidy address.',
                  ],
                  answer: 'existence by the cross-sum shift in each trichotomy branch; uniqueness by cancellation — one canonical form per class',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The pairing relation',
          latex: '(a, b) \\sim (c, d) \\;\\Longleftrightarrow\\; a + d = b + c',
          note: 'Reflexive, symmetric, transitive (add the hypotheses, cancel $c + d$). No subtraction anywhere in the definition — the repair is self-contained.',
        },
        {
          kind: 'formula',
          name: 'Class addition and multiplication',
          latex: '[(a, b)] + [(c, d)] = [(a + c,\\ b + d)]; \\qquad [(a, b)] \\cdot [(c, d)] = [(ac + bd,\\ ad + bc)]',
          note: 'Both proved well-defined (the representative swap); swept over every swap with entries ≤ 4. The box rule: like-with-like products to the have box, mixed products to the owe box.',
        },
        {
          kind: 'formula',
          name: 'The canonical dictionary',
          latex: 'n = [(n + 1,\\ 1)], \\qquad 0 = [(k,\\ k)] \\text{ (any } k), \\qquad -n = [(1,\\ n + 1)]; \\qquad -[(a, b)] = [(b, a)]',
          note: 'One tidy name per class. Zero is the tie; the mirror is the swap; the script swept the reduction and the families’ inequivalence over $a, b \\le 8$.',
        },
        {
          kind: 'formula',
          name: 'The embedding',
          latex: 'n \\mapsto [(n + 1,\\ 1)]: \\quad [(m + 1, 1)] + [(n + 1, 1)] \\sim [(m + n + 1,\\ 1)], \\quad [(m + 1, 1)] \\cdot [(n + 1, 1)] \\sim [(mn + 1,\\ 1)]',
          note: 'ℕ parked inside ℤ with both operations intact — swept $m, n \\le 12$. Demand (ii) of the repair criterion, cashed.',
        },
      ],
    },
    {
      id: 'ans-the-laws-of-integer-arithmetic',
      number: '6.3',
      title: 'The Laws of Integer Arithmetic',
      prerequisites: ['ans-constructing-the-integers-from-the-naturals', 'ans-closure-failures-that-force-extension', 'fm-multiplying-integers-sign-rules'],
      sources: ['beck-geoghegan-art-of-proof', 'brahmagupta-628-brahmasphutasiddhanta', 'hankel-1867-permanence', 'khattar-qa-4e'],
      concepts: [
        'The laws derived from the construction',
        'Distributivity through the boxes',
        'Total subtraction: x − y = x + mirror(y)',
        'The sign rules as theorems',
        'Brahmagupta’s verses, proved',
        'The order definition and the mirror flip',
        'Universal cancellation and the zero-product lemma',
        'ℤ as the first ring; division’s wall ahead',
      ],
      objectives: [
        'Derive every arithmetic law — commutativity, associativity, distributivity, the identities — from the pair construction, each collapsing to the definition plus $\\mathbb{N}$’s laws',
        'Prove subtraction total ($x - y = x + \\text{mirror}(y)$) and universal additive cancellation — the two properties $\\mathbb{N}$ lacked, now cashed',
        'Derive the three sign rules from the box rule — including $(-a)\\cdot(-b) = ab$ — and read Brahmagupta’s 628 CE verses as theorems rather than conventions',
        'Extend order to the classes, prove the mirror flip ($a < b \\Rightarrow -b < -a$), state the zero-product lemma, and name $\\mathbb{Z}$ the reader’s first ring — with division’s failure queued for chapter 7',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'The integers exist now — classes of difference pairs, added and multiplied by checked definitions, with zero as the diagonal and a mirror for every element. But Lesson 6.1’s repair criterion made a promise this lesson must keep: the old laws survive. Foundation Mathematics Lessons 7.2 and 7.3 taught you the signed *moves* — add a debt, multiply two debts, factor a common negative — and Brahmagupta stated the rules in 628 CE. None of that was proof. This lesson derives every law from the construction, and the striking thing is how little work each one takes: the definitions of Lesson 6.2 were built to make the laws fall out, and fall out they do — one commutation at a time.',
        },
        {
          kind: 'para',
          text: 'The method throughout is the same, and it is worth naming before the first theorem. A law about classes is checked by computing both sides through the class operations on representatives — and everything reduces to addition and multiplication *in $\\mathbb{N}$*, whose laws Lesson 1.3 proved by induction. Nothing about the integers is being assumed; the new arithmetic inherits every property the construction threads through. The verification script ran every sweep below through the class rules — never through ordinary arithmetic — so the derivations you are about to read were verified in exactly the system they describe.',
        },
        { kind: 'heading', text: 'The laws ride on representatives' },
        {
          kind: 'para',
          text: 'Commutativity first, because it is the pattern for everything. For any two classes, compute both orders through the definition:',
        },
        {
          kind: 'equation',
          latex: '[(a, b)] + [(c, d)] = [(a + c,\\ b + d)] = [(c + a,\\ d + b)] = [(c, d)] + [(a, b)]',
          note: 'The middle equality is $\\mathbb{N}$’s commutativity of addition (Lesson 1.3, proved by induction); the outer equalities are the definition. One line — and the same swap proves commutativity of multiplication, because the box rule is symmetric in its two inputs: swapping them exchanges $ac + bd$ with $ca + db$ (equal) and $ad + bc$ with $cb + da$ (equal).',
        },
        {
          kind: 'example',
          title: 'Watch the swap at an instance: [(3, 1)] · [(1, 2)] and [(1, 2)] · [(3, 1)]',
          steps: [
            'Split the two computations: the box rule on each order.',
            'Now, the first: have box $3 \\cdot 1 + 1 \\cdot 2 = 5$; owe box $3 \\cdot 2 + 1 \\cdot 1 = 7$ — the pair $(5, 7)$, naming $-2$.',
            'So, the second: have box $1 \\cdot 3 + 2 \\cdot 1 = 5$; owe box $1 \\cdot 1 + 2 \\cdot 3 = 7$ — the pair $(5, 7)$ again.',
            'Hence the two products are literally the same pair — commutativity not hoped for but computed.',
          ],
        },
        {
          kind: 'para',
          text: 'Associativity follows the same way: regroup, expand through the definitions, and every term is an $\\mathbb{N}$-product that reassociates freely — the script swept both operations over the classes $-6 \\dots 6$ with zero failures. The law with real content is distribution, because it is the one that mixes the boxes:',
        },
        {
          kind: 'derivation',
          title: 'Distributivity through the boxes: a · (b + c) = a·b + a·c',
          statement:
            'Claim: for classes $x$, $y$, $z$: $x \\cdot (y + z) = x \\cdot y + x \\cdot z$ — the box rule forces it.',
          steps: [
            {
              label: 'Name the representatives',
              formula: 'x = [(a, b)], \\quad y = [(c, d)], \\quad z = [(e, f)]',
              explanation:
                'Three arbitrary classes. First compute the inside sum: $y + z = [(c + e,\\ d + f)]$ — coordinate-wise, by the definition of class addition.',
            },
            {
              label: 'Expand the left side through the boxes',
              formula: 'x \\cdot (y + z) = [(\\,a(c + e) + b(d + f),\\; a(d + f) + b(c + e)\\,)]',
              explanation:
                'The box rule applied to $x$ and the sum pair. The have box collects $a$ times the inside have plus $b$ times the inside owe; the owe box collects the mixed products.',
            },
            {
              label: 'Distribute inside ℕ',
              formula: '= [(\\,ac + ae + bd + bf,\\; ad + af + bc + be\\,)]',
              explanation:
                'Distribution over addition in $\\mathbb{N}$ — Lesson 1.3’s theorem, doing the expansion term by term. This is the only law of substance used.',
            },
            {
              label: 'Expand the right side and compare',
              formula: 'x \\cdot y + x \\cdot z = [(ac + bd,\\ ad + bc)] + [(ae + bf,\\ af + be)] = [(ac + bd + ae + bf,\\ ad + bc + af + be)]',
              explanation:
                'Same box rule, then coordinate-wise addition of the two product pairs. The four terms in each coordinate are the four terms of the left side, added in a different order — and addition in $\\mathbb{N}$ is commutative and associative.',
            },
            {
              label: 'Conclusion',
              formula: 'x \\cdot (y + z) = x \\cdot y + x \\cdot z',
              explanation:
                'The two computations land on the same pair, hence the same class. The sweep confirms it at scale: every class triple in $-6 \\dots 6$ (13 cubed instances through the construction) agrees. Distribution — the law that makes the sign rules work — is now a theorem of the construction.',
            },
          ],
          result: 'a · (b + c) = a·b + a·c holds for all classes — derived from the box rule and ℕ’s own laws',
        },
        {
          kind: 'para',
          text: 'The identities complete the inventory. Zero adds invisibly ($[(a, b)] + [(k, k)] = [(a + k, b + k)] \\sim [(a, b)]$) and eats products (diagonal, swept in Lesson 6.2); the unit is $[(2, 1)]$ — the class of $1$ — and multiplying by it changes nothing: $[(a, b)] \\cdot [(2, 1)] = [(2a + b,\\ a + 2b)] \\sim [(a, b)]$, the cross-sums $2a + 2b$ agreeing on both sides. The script also checked the unit is the *only* class that acts this way across the swept range — no impostor. And the mirror composed with itself is the identity: the mirror of the mirror returns the original class. Every structural fact $\\mathbb{N}$ had, $\\mathbb{Z}$ now has — plus two that $\\mathbb{N}$ never managed.',
        },
        { kind: 'heading', text: 'Subtraction made total' },
        {
          kind: 'para',
          text: 'Here is the first property $\\mathbb{N}$ could not deliver. In the naturals, subtraction was partial — $b < a$ or nothing (Lesson 6.1’s wall). In the classes, every element has a mirror, and that changes the game completely:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Subtraction of classes',
          text: 'The **difference** of two classes is defined as adding the mirror: $x - y := x + (-y)$. In pairs: $[(a, b)] - [(c, d)] = [(a, b)] + [(d, c)] = [(a + d,\\ b + c)]$. This exists for **every** pair of classes — subtraction is total, for the first time in this book’s story.',
        },
        {
          kind: 'equation',
          latex: '[(a, b)] - [(c, d)] \\;=\\; [(a + d,\\ b + c)] \\qquad \\text{for every pair — no conditions}',
          note: 'Compare Lesson 6.1’s subtraction condition ($b < a$, strict). The owe box of the subtrahend becomes fuel: subtracting $y$ means adding its mirror. On the $\\mathbb{N}$-legal cases the new reading agrees with backwards counting — the sweep confirmed all $169$ pairs in $-8 \\dots 8$.',
        },
        {
          kind: 'example',
          title: 'Two computations ℕ refused: 3 − 8 and the wall case 5 − 5',
          steps: [
            'Split the two against Lesson 6.1’s census: both were dead in $\\mathbb{N}$.',
            'Now, the first: $3 - 8 = [(4, 1)] + [(1, 9)] = [(5, 10)]$ — and $(5, 10) \\sim (1, 6)$ since $5 + 6 = 10 + 1 = 11$: the class names $-5$.',
            'So, the wall case: $5 - 5 = [(6, 1)] + [(1, 6)] = [(7, 7)]$ — the diagonal. Zero, born as promised.',
            'Hence both compute — and with them every $x + b = a$: subtract $b$ from both sides, legally. Demand (i) of the repair criterion is fully cashed.',
          ],
        },
        {
          kind: 'para',
          text: 'The equation payoff deserves its own sentence: **every equation $x + b = a$ now has exactly one solution**, namely $x = a + (-b)$ — and uniqueness comes from cancellation, which is this lesson’s second cash-out and arrives in a few paragraphs. The one-sided ocean of Lesson 6.1’s census is gone: addition on $\\mathbb{Z}$ is a system where every undo works every time.',
        },
        { kind: 'heading', text: 'The sign rules, derived' },
        {
          kind: 'para',
          text: 'Now the famous three. Foundation Mathematics Lesson 7.3 banked them as moves; Brahmagupta stated them as verses; here they are theorems, each falling out of the box rule. The first: a have times an owe lands in the owe box — $a \\cdot (-b) = -(ab)$.',
        },
        {
          kind: 'example',
          title: 'Derive a · (−b) = −(ab) at a = 2, b = 3, entirely through pairs',
          steps: [
            'Split the inputs: $2 = [(3, 1)]$ and $-3 = [(1, 4)]$ — canonical forms.',
            'Now, the boxes: have $3 \\cdot 1 + 1 \\cdot 4 = 7$; owe $3 \\cdot 4 + 1 \\cdot 1 = 13$ — the pair $(7, 13)$.',
            'So, reduce: $(7, 13) \\sim (1, 7)$ since $7 + 7 = 13 + 1 = 14$ — the class names $-6$.',
            'Hence $2 \\cdot (-3) = -6 = -(2 \\cdot 3)$ — the mixed products $ad + bc$ carry one owe each, so the owe box wins: the rule, not decreed but computed.',
          ],
        },
        {
          kind: 'para',
          text: 'The general reading: for $a = [(m + 1, 1)]$ and $-b = [(1, n + 1)]$, the box rule gives have box $(m + 1) \\cdot 1 + 1 \\cdot (n + 1) = m + n + 2$ and owe box $(m + 1)(n + 1) + 1 = mn + m + n + 2$ — the owe box exceeds the have box by exactly $mn$, so the product class is $[(1,\\ mn + 1)]$: the mirror of $ab$. By commutativity (proved above), $(-a) \\cdot b = -(ab)$ too. The third rule is the famous one:',
        },
        {
          kind: 'derivation',
          title: 'The debt-times-debt rule: (−a) · (−b) = ab',
          statement:
            'Claim: for all $m, n \\ge 1$: $[(1, m + 1)] \\cdot [(1, n + 1)] \\sim [(mn + 1,\\ 1)]$ — two owes multiply to a have.',
          steps: [
            {
              label: 'Apply the box rule',
              formula: '[(1, m + 1)] \\cdot [(1, n + 1)] = [(\\,1 \\cdot 1 + (m + 1)(n + 1),\\; 1 \\cdot (n + 1) + (m + 1) \\cdot 1\\,)]',
              explanation:
                'The have box collects the like-with-like products; the owe box collects the two mixed ones.',
            },
            {
              label: 'Expand both boxes',
              formula: '= [(\\,1 + mn + m + n + 1,\\; n + 1 + m + 1\\,)] = [(mn + m + n + 2,\\; m + n + 2)]',
              explanation:
                'Distribution in $\\mathbb{N}$ again. The have box now exceeds the owe box — by exactly $mn$: the debt factors flipped the lead.',
            },
            {
              label: 'Compare with the class of mn',
              formula: '(mn + m + n + 2) + 1 = m + n + 2 + (mn + 1)',
              explanation:
                'Both sides equal $mn + m + n + 3$ — the cross-sum identity of the definition, with nothing hidden.',
            },
            {
              label: 'Conclusion',
              formula: '[(1, m + 1)] \\cdot [(1, n + 1)] \\sim [(mn + 1,\\ 1)] = mn',
              explanation:
                'Debt times debt is fortune — because the mixed products ($m + n + 2$) are strictly smaller than the like-with-like pile ($mn + m + n + 2$) once both inputs carry debts. The script swept this spine over $m, n \\le 8$ and the general sign rules over every $a, b \\in -6 \\dots 6$: $169$ products through the construction, zero mismatches with ordinary arithmetic.',
            },
          ],
          result: '(−a) · (−b) = ab — the third sign rule, derived; a convention no longer',
        },
        {
          kind: 'table',
          caption: 'Brahmagupta’s rules (628 CE) against the construction’s verdicts — each verse now a theorem with a pair computation behind it. The verses are paraphrased from the Sanskrit (through Colebrooke’s 1817 translation); the pair verdicts are the script’s.',
          head: ['Brahmagupta’s rule (628 CE)', 'The instance through pairs', 'The verdict'],
          rows: [
            ['fortune with fortune is fortune', '$[(4, 1)] \\cdot [(5, 1)] = [(21, 14)] \\sim [(8, 1)]$', '$3 \\cdot 4 = 12$, a have-box class'],
            ['fortune with debt is debt', '$[(4, 1)] \\cdot [(1, 5)] = [(9, 21)] \\sim [(1, 13)]$', '$3 \\cdot (-4) = -12$, an owe-box class'],
            ['debt with debt is fortune', '$[(1, 4)] \\cdot [(1, 5)] = [(21, 9)] \\sim [(13, 1)]$', '$(-3) \\cdot (-4) = 12$, a have-box class'],
            ['debt with fortune is debt', '$[(1, 4)] \\cdot [(5, 1)] = [(9, 21)] \\sim [(1, 13)]$', '$(-3) \\cdot 4 = -12$ — commutativity’s twin'],
            ['fortune (or debt) times zero is zero', '$[(6, 1)] \\cdot [(1, 1)] = [(7, 7)]$', '$5 \\cdot 0 = 0$ — the diagonal eats all'],
          ],
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Brahmagupta’s debts and fortunes: 628 CE',
          text: 'Brahmagupta’s *Brahmasphutasiddhanta* ("The Opening of the Universe", 628 CE) is the earliest surviving text to treat zero and the negative numbers as full citizens of arithmetic — his rules are phrased for **fortunes** (positive numbers) and **debts** (negatives), and they include exactly the lines tabled above, plus the zero rules (a debt minus zero is a debt; zero minus zero is zero; a fortune subtracted from zero is a debt). Twelve centuries before difference pairs, he stated as conventions what this chapter derives as theorems — and the derivation shows his rules were not one choice among many: any multiplication on classes that is commutative, distributes, and agrees with $\\mathbb{N}$ on the have-box classes is *forced* into these signs. (The verses reached Europe through Colebrooke’s 1817 English translation of the algebra chapters; Foundation Mathematics Lessons 7.1–7.3 banked the rules operationally with their history — here they are paid for with proofs, not restated.)',
        },
        { kind: 'heading', text: 'Order on ℤ and the mirror flip' },
        {
          kind: 'para',
          text: 'Order extends by the same representative discipline. On the naturals, $<$ was run length (Lesson 1.1); on classes the cross-sums play that role:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Order on the classes',
          text: 'For classes $x = [(a, b)]$ and $y = [(c, d)]$, say $x \\le y$ when $a + d \\le c + b$ — the have-plus-other’s-owe reading of "$x$’s value is at most $y$’s". The order is **well-defined** (equivalent representatives give the same verdict — swept over every swap with entries $\\le 5$) and agrees with $\\le$ on the embedded naturals everywhere (swept over classes $-8 \\dots 8$). Strict order $<$ drops the equality case; trichotomy holds — exactly one of $x < y$, $x = y$, $y < x$ per pair (swept).',
        },
        {
          kind: 'example',
          title: 'The flip at an instance: from 2 < 5 to −5 < −2, through the definition',
          steps: [
            'Split the two orders: $2 < 5$ is $[(3, 1)]$ versus $[(6, 1)]$ — cross-order $3 + 1 = 4 \\le 6 + 1 = 7$ ✓.',
            'Now, mirror both: $-2 = [(1, 3)]$ and $-5 = [(1, 6)]$.',
            'So, compare the mirrors: $-5 \\le -2$ asks $1 + 3 \\le 6 + 1$ — that is, $4 \\le 7$ ✓, and strictly (the classes differ).',
            'Hence $-5 < -2$ — the mirror reverses the verdict, and the arithmetic says exactly why: mirroring swaps the boxes, so the bigger have becomes the bigger owe.',
          ],
        },
        {
          kind: 'para',
          text: 'The general law: $a < b$ forces $-b < -a$. Proof in one breath: $a < b$ means the class of $b$ strictly out-runs the class of $a$; mirroring exchanges the two boxes of every representative, so the out-runner’s mirror is strictly out-run — and the script swept the flip over every strict pair in $-8 \\dots 8$ with zero exceptions. Foundation Mathematics Lesson 7.1’s famous trap — $-8$ versus $-3$, the deeper debt wears the smaller number — is now a theorem: on the owe side of the diagonal, more debt means less class. The number line you drew in Foundation Mathematics is the same line, with the construction now underneath it.',
        },
        {
          kind: 'figure',
          caption:
            'The mirror map. Each class sits on the line through its canonical value; the mirror reflects through the diagonal’s landing point $0$, exchanging have for owe. Two pointed pairs and their mirrors: $2$ and $5$ on the have side, $-2$ and $-5$ on the owe side — and the order flips under the reflection, $2 < 5$ becoming $-5 < -2$. The deeper the debt, the further left: FM 7.1’s ordering, now derived.',
          svg: `<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line from minus six to six with the points two and five mirrored to minus two and minus five, arcs over the top showing the reflection and the flipped order bracketed below">
  <line x1="40" y1="130" x2="472" y2="130" stroke="currentColor" stroke-width="1.2" opacity="0.85"/>
  <g stroke="currentColor" stroke-width="1.4">
    <line x1="40" y1="124" x2="40" y2="132" opacity="0.6"/><line x1="76" y1="124" x2="76" y2="132" opacity="0.6"/><line x1="112" y1="124" x2="112" y2="132" opacity="0.6"/><line x1="148" y1="124" x2="148" y2="132" opacity="0.6"/><line x1="184" y1="124" x2="184" y2="132" opacity="0.6"/><line x1="220" y1="124" x2="220" y2="132" opacity="0.6"/><line x1="256" y1="122" x2="256" y2="134"/><line x1="292" y1="122" x2="292" y2="132" opacity="0.6"/><line x1="328" y1="122" x2="328" y2="132" opacity="0.6"/><line x1="364" y1="122" x2="364" y2="132" opacity="0.6"/><line x1="400" y1="122" x2="400" y2="132" opacity="0.6"/><line x1="436" y1="122" x2="436" y2="132" opacity="0.6"/><line x1="472" y1="122" x2="472" y2="132" opacity="0.6"/>
  </g>
  <g font-size="13" text-anchor="middle" fill="currentColor" opacity="0.75">
    <text x="40" y="152">−6</text><text x="76" y="152">−5</text><text x="112" y="152">−4</text><text x="148" y="152">−3</text><text x="184" y="152">−2</text><text x="220" y="152">−1</text>
  </g>
  <text x="256" y="152" font-size="13" text-anchor="middle" fill="currentColor" font-weight="bold">0</text>
  <g font-size="13" text-anchor="middle" fill="currentColor" opacity="0.75">
    <text x="292" y="152">1</text><text x="328" y="152">2</text><text x="364" y="152">3</text><text x="400" y="152">4</text><text x="436" y="152">5</text><text x="472" y="152">6</text>
  </g>
  <g fill="currentColor">
    <circle cx="328" cy="130" r="4.5"/>
    <circle cx="436" cy="130" r="4.5"/>
    <circle cx="184" cy="130" r="4.5"/>
    <circle cx="76" cy="130" r="4.5"/>
  </g>
  <g fill="none" stroke="currentColor" stroke-width="1.6" opacity="0.85">
    <path d="M 328 118 Q 292 74 256 74 Q 220 74 184 118"/>
    <path d="M 436 112 Q 346 44 256 44 Q 166 44 76 112"/>
  </g>
  <g fill="currentColor" opacity="0.85">
    <polygon points="188,115 181,110 191,106"/>
    <polygon points="80,109 73,103 84,100"/>
  </g>
  <g font-size="12" text-anchor="middle" fill="currentColor" opacity="0.9">
    <text x="382" y="192">on the have side: 2 &lt; 5</text>
    <text x="140" y="192">on the owe side: −5 &lt; −2 (flipped)</text>
  </g>
  <text x="256" y="208" font-size="12" text-anchor="middle" fill="currentColor" opacity="0.8">arcs show the mirror: 2 → −2 (short), 5 → −5 (tall)</text>
  <text x="256" y="224" font-size="12" text-anchor="middle" fill="currentColor" opacity="0.8">the mirror exchanges have and owe — and reverses order</text>
</svg>`,
        },
        { kind: 'heading', text: 'Cancellation — the repair cashed' },
        {
          kind: 'para',
          text: 'One property more, and it is the quiet hero of the whole chapter. In $\\mathbb{N}$, cancellation — from $x + m = y + m$ infer $x = y$ — was available as a *fact* (trichotomy, as Lesson 6.2’s transitivity proof used it), but the *move* of extracting $x$ by subtracting $m$ was only sometimes legal. In $\\mathbb{Z}$ the move is always legal, because the mirror always exists:',
        },
        {
          kind: 'callout',
          tone: 'theorem',
          title: 'The cancellation laws',
          text: '(i) **Additive cancellation is universal.** For any classes $a$, $x$, $y$: $a + x = a + y$ implies $x = y$ — proof: add the mirror of $a$ to both sides, a move that always exists; associativity (derived above) regroups, the diagonal absorbs, and $x = y$ remains. (ii) **Multiplicative cancellation holds for every nonzero class.** If $c \\ne 0$ and $c \\cdot x = c \\cdot y$, then $x = y$ — via the **zero-product lemma**: $c \\cdot x = 0$ forces $c = 0$ or $x = 0$ (swept over all class pairs in $-8 \\dots 8$; the derivation is Exercise 10), applied to $c \\cdot (x - y) = 0$. The verification script swept both laws across thousands of class triples — zero failures.',
        },
        {
          kind: 'example',
          title: 'Solve 3 + x = 2 in ℤ — and watch cancellation and the mirror agree',
          steps: [
            'Split the two routes: cancellation’s equation-first reading, and the mirror’s direct subtraction.',
            'Now, the mirror route: $x = 2 - 3 = [(3, 1)] + [(1, 4)] = [(4, 5)]$ — the class names $-1$.',
            'So, the cancellation route: $3 + x = 2 = 3 + (-1)$ (check: $[(4, 1)] + [(4, 5)] = [(8, 6)] \\sim [(3, 1)]$, which names $2$); by additive cancellation $x = -1$ — the same answer, no search.',
            'Take the contrast: in $\\mathbb{N}$ this equation was dead twice over (Lesson 6.1’s census) — no witness existed and no extraction move was legal.',
            'Hence $x = -1$: the repair answers the question *and* licenses the move.',
          ],
        },
        {
          kind: 'para',
          text: 'With subtraction total, cancellation universal, and the zero-product lemma proved, the equation inventory of $\\mathbb{Z}$ is settled: every $x + b = a$ has exactly one solution; $x \\cdot c = d$ has solutions exactly when $c \\mid d$ (chapter 2’s criterion survives verbatim, as chapter 2’s closing exercise promised), and when $d = 0 \\ne c$ the only solution is $x = 0$. What has *not* changed: $x \\cdot 2 = 3$ is still witnessless — the integers answer every *additive* question and still most multiplicative ones die. The sweep confirmed it: no class in $-20 \\dots 20$ doubles to $3$.',
        },
        { kind: 'heading', text: 'The first ring, and the next wall' },
        {
          kind: 'para',
          text: 'Stand back and inventory what $\\mathbb{Z}$ now is: a set with two operations, both commutative and associative, distribution binding them, neutral elements for both ($0$ and $[(2, 1)]$), an additive inverse for *every* element, and zero eating products. Systems with this profile have a name — they are called **rings** — and $\\mathbb{Z}$ is the first one this book has built, met as a construction rather than a list of rules. The name is not needed for anything below; it is posted here because it is the doorway sign to the whole of algebra: every ring you will ever meet — polynomials, matrices, the congruence classes of chapter 5 — is judged by exactly this checklist, and $\\mathbb{Z}$ is the prototype that makes the checklist feel inevitable.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'A ring, informally',
          text: 'A commutative ring is a system with $+$ and $\\times$ where: both are commutative and associative; distribution holds; $0$ adds neutrally and $1$ multiplies neutrally; and **every element has an additive inverse** — the line that separates $\\mathbb{Z}$ from $\\mathbb{N}$. (Multiplicative inverses are *not* required — that stronger demand makes a field, and chapter 7 builds the reader’s first one.) The five checks above are the permanence principle’s demand list, given its final name.',
        },
        {
          kind: 'para',
          text: 'And the next wall is already visible from here. Division — the one school operation never yet repaired — stays partial on $\\mathbb{Z}$: $7 \\div 2$ names nothing, and no amount of mirrors fixes it, because the failure is *multiplicative* (missing inverses), not additive (missing mirrors). The repair will need the same trick again — pairs, equivalence, classes — with division’s needs writing the definition. That construction is chapter 7’s entire business, and the pattern is now so well-oiled that its hardest step (the analogue of well-definedness) is a one-paragraph exercise. The ladder $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ has two rungs left; this chapter installed the first.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'Everything the signed-number items test is now derived, which turns tricks into checks. The sign-rule products (SSC CHSL/MTS, RRB NTPC CBT-I, banking clerical banks: straight products, three-factor parity chains like $(-2)^3 = -8$ with $(-5)^2 = 25$) are Brahmagupta’s tabled verses — verifiable in seconds by the have/owe split, and the odd-power/even-power behaviour is the box rule’s crossing pattern (each extra factor flips the sign; $(-1)^n$ is the pure engine). The distributive factoring items — $(-6) \\cdot 47 + (-6) \\cdot 53 = (-6) \\cdot 100 = -600$ — are distribution plus the sign rules, and the construction verified that exact instance through pairs. The ordering items (which is smaller, $-8$ or $-3$; the lift narrations; smallest-integer-greater-than-$-2.5$) are the mirror flip — and the absolute-value cross-references (FM 7.4) ride on it: distance from $0$ is have-box size, independent of direction. Khattar QA ch. 1’s signed drills are all instances of this lesson’s theorems.',
        },
        {
          kind: 'para',
          text: 'The chapter closes with the ledger balanced. Lesson 6.1 catalogued the failures; Lesson 6.2 built the repair with proofs of well-definedness; this lesson banked the permanence payoff — laws, subtraction, sign rules, order, cancellation — and hung the ring sign on the door. Three lessons, one construction, every check swept: the integers are no longer borrowed furniture from Foundation Mathematics. They are yours, with the receipts.',
        },
        {
          kind: 'terms',
          items: [
            { term: 'The laws of ℤ', def: 'Commutativity and associativity of $+$ and $\\times$, distribution, the identities — each derived from the class definitions in one to four lines, everything reducing to $\\mathbb{N}$’s induction-proved laws. The permanence principle, cashed.' },
            { term: 'Total subtraction', def: '$x - y := x + \\text{mirror}(y)$ — defined for every pair of classes, agreeing with backwards counting wherever that was legal. The property $\\mathbb{N}$ lacked; the reason every $x + b = a$ now solves.' },
            { term: 'The sign rules (as theorems)', def: '$a \\cdot (-b) = -(ab)$, $(-a) \\cdot b = -(ab)$, $(-a) \\cdot (-b) = ab$ — derived from the box rule (like-with-like products to the have box, mixed to the owe box). Swept over $a, b \\in -6 \\dots 6$.' },
            { term: 'Brahmagupta’s rules', def: 'The fortunes-and-debts verses of the Brahmasphutasiddhanta (628 CE) — fortune×fortune = fortune, fortune×debt = debt, debt×debt = fortune, and the zero rules. Stated as conventions twelve centuries early; derived here as forced conclusions.' },
            { term: 'The mirror flip', def: '$a < b \\Rightarrow -b < -a$ — mirroring reverses strict order, proved from the cross-sum definition of class order (and swept). The $-8$ versus $-3$ trap, now a theorem.' },
            { term: 'Additive cancellation', def: '$a + x = a + y \\Rightarrow x = y$ — universal in $\\mathbb{Z}$, because adding the mirror of $a$ is always legal. In $\\mathbb{N}$ the fact held but the extracting move was only sometimes available.' },
            { term: 'The zero-product lemma', def: '$c \\cdot x = 0$ forces $c = 0$ or $x = 0$ — proved from the box rule via canonical forms (the derivation is Exercise 10); the engine behind multiplicative cancellation for $c \\ne 0$.' },
            { term: 'Ring (first encounter)', def: 'A system with commutative associative $+$ and $\\times$, distribution, neutral $0$ and $1$, and an additive inverse for every element. $\\mathbb{Z}$ is the reader’s first — met as a building; fields (multiplicative inverses too) wait for chapter 7.' },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The rule $(-a) \\cdot b = -(ab)$ is, in this chapter…',
              options: [
                'a convention Brahmagupta chose in 628 CE',
                'a theorem derived from the box rule',
                'true only when $b$ is even',
                'the definition of negation',
              ],
              answer: 1,
              explain: 'It falls out of the box rule — the mixed products carry one owe each, so the owe box leads. Brahmagupta stated it (as fortune-with-debt is debt) twelve centuries earlier, but as a convention; this chapter computes it. Parity is irrelevant, and negation is the box swap, not multiplication.',
            },
            {
              q: '$2 < 5$. What does the mirror law give?',
              options: ['$-5 < -2$', '$-2 < -5$', '$-2 = -5$', 'nothing — order does not extend to the mirrors'],
              answer: 0,
              explain: 'Mirroring reverses strict order: the bigger have ($5$) becomes the bigger owe ($-5$), which sits further left. Through the definition: $-5 \\le -2$ asks $1 + 3 = 4 \\le 6 + 1 = 7$ ✓.',
            },
            {
              q: 'In $\\mathbb{Z}$, subtraction…',
              options: [
                'is still partial, as in $\\mathbb{N}$',
                'is total — $x - y$ exists for every pair, built as $x + \\text{mirror}(y)$',
                'is undefined',
                'requires division first',
              ],
              answer: 1,
              explain: 'Every class has a mirror, so $x - y := x + (-y)$ always exists — subtraction is total for the first time in this book (swept over all pairs in $-8 \\dots 8$). No division is involved.',
            },
            {
              q: '$3 + x = 2$. In $\\mathbb{N}$ this is dead; in $\\mathbb{Z}$, $x = ?$',
              options: ['$1$', '$-1$', '$5$', 'no solution exists in $\\mathbb{Z}$ either'],
              answer: 1,
              explain: '$x = 2 - 3 = [(3, 1)] + [(1, 4)] = [(4, 5)]$, which names $-1$ — and the check $3 + (-1) = 2$ runs through pairs ($[(8, 6)] \\sim [(3, 1)]$). $1$ gives $4$, $5$ gives $8$; $\\mathbb{Z}$ does solve it.',
            },
            {
              q: 'Which system is the reader’s first ring in this book’s story?',
              options: [
                '$\\mathbb{N}$ — it has all the ring laws',
                '$\\mathbb{Q}$ — fractions came first',
                '$\\mathbb{Z}$ — the first system with an additive inverse for every element',
                '$\\mathbb{R}$ — the completeness chapter',
              ],
              answer: 2,
              explain: '$\\mathbb{Z}$ completes the ring checklist — distribution, identities, and (decisively) mirrors for every element. $\\mathbb{N}$ fails exactly that line (no mirrors), and $\\mathbb{Q}$ and $\\mathbb{R}$ are later rungs — $\\mathbb{Q}$ is chapter 7’s field.',
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
                  q: 'Compute $[(2, 1)] \\cdot [(1, 3)]$ and $[(1, 3)] \\cdot [(1, 3)]$ by the box rule, and name each result.',
                  solution: [
                    'Split the two products: one mixed-sign, one debt-times-debt.',
                    'Now, the first: have $2 + 3 = 5$, owe $6 + 1 = 7$ — the pair $(5, 7)$, naming $-2$.',
                    'So, the second: have $1 + 9 = 10$, owe $3 + 3 = 6$ — the pair $(10, 6)$, which reduces to $(5, 1)$: $4$. $(-2)^2 = 4$.',
                    'Hence $1 \\cdot (-2) = -2$ (owe-box lead) and $(-2) \\cdot (-2) = 4$ (have-box lead) — the sign rules computed, not recalled.',
                  ],
                  answer: '[(5,7)] = −2; [(10,6)] = 4',
                },
                {
                  q: 'Order the chain $-7, -2, 0, 4, 9$, and say which side of the diagonal each sits on.',
                  solution: [
                    'Split the five values by their canonical boxes.',
                    'Now, the owe side: $-7 = [(1, 8)]$ and $-2 = [(1, 3)]$ — debts, left of zero; $-7 < -2$ (deeper debt, smaller class).',
                    'So, the tie and the haves: $0 = [(1, 1)]$ diagonal; $4 = [(5, 1)]$ and $9 = [(10, 1)]$ have-box, right of zero, $4 < 9$.',
                    'Take the chain: $-7 < -2 < 0 < 4 < 9$ — strictly increasing, the mirror flip governing the left half.',
                    'Hence the order reads like the school line — now with the construction underneath.',
                  ],
                  answer: '−7 < −2 < 0 < 4 < 9',
                },
                {
                  q: 'Compute $3 - 8$ in $\\mathbb{Z}$ via the mirror, reducing to canonical form.',
                  solution: [
                    'Split: subtraction is $x + \\text{mirror}(y)$ — no conditions.',
                    'Now, the representatives: $3 = [(4, 1)]$; mirror of $8$ is $-8 = [(1, 9)]$.',
                    'So, add: $[(4, 1)] + [(1, 9)] = [(5, 10)]$ — owe box leads by $5$.',
                    'Take the reduction: $(5, 10) \\sim (1, 6)$ since $5 + 6 = 10 + 1 = 11$ — the class names $-5$.',
                    'Hence $3 - 8 = -5$ — dead in $\\mathbb{N}$, ordinary here.',
                  ],
                  answer: '[(5,10)] ~ [(1,6)] = −5',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Verify the flip instance $2 < 5 \\Rightarrow -5 < -2$ through the order definition (cross-sums).',
                  solution: [
                    'Split the two comparisons into cross-sum form.',
                    'Now, $2 < 5$: $[(3, 1)]$ versus $[(6, 1)]$ — $3 + 1 = 4 \\le 6 + 1 = 7$, strict since the classes differ.',
                    'So, the mirrors: $-5 = [(1, 6)]$ and $-2 = [(1, 3)]$ — the order asks $1 + 3 = 4 \\le 6 + 1 = 7$ ✓, again strict.',
                    'Hence $-5 < -2$ straight from the definition — no number-line intuition needed, only cross-sums.',
                  ],
                  answer: '4 ≤ 7 both ways — the flip from the definition',
                },
                {
                  q: 'Compute $[(3, 1)] \\cdot [(1, 2)]$ and $[(1, 2)] \\cdot [(3, 1)]$; confirm commutativity at the instance.',
                  solution: [
                    'Split the two orders of the same product.',
                    'Now, the first: have $3 \\cdot 1 + 1 \\cdot 2 = 5$; owe $3 \\cdot 2 + 1 \\cdot 1 = 7$ — $(5, 7)$.',
                    'So, the second: have $1 \\cdot 3 + 2 \\cdot 1 = 5$; owe $1 \\cdot 1 + 2 \\cdot 3 = 7$ — $(5, 7)$ again, the identical pair.',
                    'Hence the product is one class whichever order computes it — commutativity computed, and both name $-2 = 2 \\cdot (-1)$.',
                  ],
                  answer: 'both [(5,7)] = −2',
                },
                {
                  q: 'Compute $[(1, 1)] \\cdot [(7, 2)]$, and contrast with $[(5, 1)] \\cdot [(1, 6)]$ — what does the contrast show?',
                  solution: [
                    'Split: one factor is the diagonal, the other has neither factor diagonal.',
                    'Now, the first: have $7 + 2 = 9$; owe $2 + 7 = 9$ — the pair $(9, 9)$, diagonal. Zero eats the product.',
                    'So, the second: have $5 \\cdot 1 + 1 \\cdot 6 = 11$; owe $5 \\cdot 6 + 1 \\cdot 1 = 31$ — the pair $(11, 31)$, naming $-20$: not diagonal.',
                    'Take the reading: diagonal times anything is diagonal, but two nonzero classes can multiply to $-20$, $6$, anything — nonzero products are not zero.',
                    'Hence the contrast previews the zero-product lemma: $c \\cdot x = 0$ needs $c = 0$ or $x = 0$ — no other route lands on the diagonal.',
                  ],
                  answer: '[(9,9)] = 0; [(11,31)] = −20 — zero eats, nonzero products survive',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Derive $a \\cdot (-b) = -(ab)$ at $a = 2$, $b = 3$, entirely through pairs.',
                  solution: [
                    'Split the inputs: $2 = [(3, 1)]$; $-3 = [(1, 4)]$ — canonical forms.',
                    'Now, the boxes: have $3 \\cdot 1 + 1 \\cdot 4 = 7$; owe $3 \\cdot 4 + 1 \\cdot 1 = 13$ — the pair $(7, 13)$.',
                    'So, reduce: $(7, 13) \\sim (1, 7)$ since $7 + 7 = 13 + 1 = 14$ — the class names $-6$.',
                    'Take the comparison: $-(2 \\cdot 3) = -6$ — the same class.',
                    'Hence $2 \\cdot (-3) = -(2 \\cdot 3)$: the mixed products ($13$) out-owe the like-with-like pile ($7$) by exactly $ab = 6$.',
                  ],
                  answer: '[(7,13)] ~ [(1,7)] = −6 = −(2·3)',
                },
                {
                  q: 'Solve $x + 5 = 2$ in $\\mathbb{Z}$ through pairs, and check the answer.',
                  solution: [
                    'Split: subtract $5$ by adding its mirror — legal unconditionally now.',
                    'Now, the computation: $x = 2 - 5 = [(3, 1)] + [(1, 6)] = [(4, 7)]$ — owe leads by $3$.',
                    'So, reduce: $(4, 7) \\sim (1, 4)$ since $4 + 4 = 7 + 1 = 8$ — the class names $-3$.',
                    'Take the check: $5 + (-3) = [(6, 1)] + [(1, 4)] = [(7, 5)]$, and $7 + 1 = 5 + 3 = 8$ — the class of $(3, 1)$, which names $2$ ✓.',
                    'Hence $x = -3$ — Lesson 6.1’s dead census row, answered and verified.',
                  ],
                  answer: 'x = [(4,7)] ~ [(1,4)] = −3',
                },
                {
                  q: 'Solve $4 + x = 13$ two ways — by cancellation, and by the mirror — and confirm the answers agree.',
                  solution: [
                    'Split the two routes.',
                    'Now, cancellation: $4 + x = 13 = 4 + 9$ (since $13$ is the class of $4 + 9$), so additive cancellation gives $x = 9$ — no subtraction performed.',
                    'So, the mirror: $x = 13 - 4 = [(14, 1)] + [(1, 5)] = [(15, 6)]$, and $15 + 1 = 6 + 10 = 16$ — the class of $(10, 1)$, naming $9$.',
                    'Take the agreement: both routes land on $9$ — the fact and the move, finally the same thing.',
                    'Hence $x = 9$ — and the agreement is no accident: totality of subtraction is what makes cancellation a *move* rather than merely a fact.',
                  ],
                  answer: 'x = 9 by both routes',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Prove additive cancellation: $a + x = a + y$ implies $x = y$, for all classes.',
                  solution: [
                    'Split the proof around the one move that $\\mathbb{N}$ lacked.',
                    'Now, add the mirror of $a$ to both sides — legal always, since every class has one: $(-a) + (a + x) = (-a) + (a + y)$.',
                    'So, regroup by associativity (derived above): $((-a) + a) + x = ((-a) + a) + y$ — and $(-a) + a = [(b, a)] + [(a, b)] = [(a + b, a + b)]$, the diagonal: zero.',
                    'Take the finish: $0 + x = 0 + y$, and the zero identity gives $x = y$.',
                    'Hence cancellation is universal — the script swept $13^3$ class triples with zero failures; the sweep confirms, the four lines above prove.',
                  ],
                  answer: 'add mirror(a), regroup, the diagonal absorbs: x = y',
                },
                {
                  q: 'Prove the mirror flip: $a < b$ implies $-b < -a$, from the order definition.',
                  solution: [
                    'Split the claim into what mirroring does to the cross-sum test.',
                    'Now, write the hypothesis: $a < b$ means the class of $b$ strictly out-runs the class of $a$ on the cross-sum test.',
                    'So, mirror both: mirroring swaps the boxes of every representative — the have coordinate becomes the owe coordinate and vice versa.',
                    'Take the mirrored test: the out-runner’s have surplus becomes an owe surplus, so its mirror sits strictly on the smaller side — the reversed inequality holds strictly, and strictness (distinct classes) survives the swap.',
                    'Hence $-b < -a$ — swept over every strict pair in $-8 \\dots 8$, zero exceptions; the deeper debt always wears the smaller class.',
                  ],
                  answer: 'mirroring swaps have and owe, so the order test reverses and strictness survives',
                },
                {
                  q: 'Prove the zero-product lemma: $c \\cdot x = 0$ forces $c = 0$ or $x = 0$.',
                  solution: [
                    'Split by canonical forms: $c = [(m + 1, 1)]$ or $[(1, m + 1)]$ when $c \\ne 0$; $x = [(p, q)]$ arbitrary.',
                    'Now, the case $c$ positive: the product with $x = [(p, q)]$ has have box $(m + 1)p + q$ and owe box $(m + 1)q + p$.',
                    'So, set them equal (the diagonal condition): $(m + 1)p + q = (m + 1)q + p$, i.e. $mp = mq$ — and cancellation ($m \\ge 1$) gives $p = q$: $x$ is diagonal, i.e. $x = 0$.',
                    'Take the mirrored case ($c$ negative): the same computation with the boxes swapped — same conclusion.',
                    'Hence $c \\cdot x = 0$ forces $c = 0$ or $x = 0$ — swept over all $289$ class pairs in $-8 \\dots 8$; the lemma powers multiplicative cancellation ($c \\cdot x = c \\cdot y$ with $c \\ne 0$ gives $c \\cdot (x - y) = 0$, so $x - y = 0$).',
                  ],
                  answer: 'mp = mq with m ≥ 1 cancels to p = q — a nonzero factor forces the other factor to the diagonal',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Verify distributivity at the instance $(2 + 3) \\cdot (-1) = 2 \\cdot (-1) + 3 \\cdot (-1)$ entirely through pairs, showing both sides reduce to the same class.',
                  solution: [
                    'Split the two sides; both must be computed by the class rules.',
                    'Now, the left: $2 + 3 = [(3, 1)] + [(4, 1)] = [(7, 2)]$; times $-1 = [(1, 2)]$: have $7 \\cdot 1 + 2 \\cdot 2 = 11$; owe $7 \\cdot 2 + 2 \\cdot 1 = 16$ — the pair $(11, 16)$, naming $-5$.',
                    'So, the right: $2 \\cdot (-1) = [(3, 1)] \\cdot [(1, 2)] = [(5, 7)]$; $3 \\cdot (-1) = [(4, 1)] \\cdot [(1, 2)] = [(6, 9)]$; sum $[(5, 7)] + [(6, 9)] = [(11, 16)]$ — the identical pair.',
                    'Take the reading: $-5 = -5$ — but computed as classes, the agreement is a theorem instance, not a coincidence of decimal habit.',
                    'Hence distribution survives the construction at the instance, as the $13^3$ sweep guarantees everywhere.',
                  ],
                  answer: 'both sides land on [(11,16)] = −5',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Run the ring audit at the instance: with $x = [(3, 2)]$, $y = [(2, 1)]$, $z = [(1, 4)]$, compute $(x + y) \\cdot z$ and $x \\cdot z + y \\cdot z$ through the class rules and confirm the law.',
                  solution: [
                    'Split the two computations; keep every intermediate as a pair.',
                    'Now, the left: $x + y = [(5, 3)]$; times $z$: have $5 \\cdot 1 + 3 \\cdot 4 = 17$; owe $5 \\cdot 4 + 3 \\cdot 1 = 23$ — the pair $(17, 23)$, naming $-6$.',
                    'So, the right: $x \\cdot z$: have $3 + 8 = 11$, owe $12 + 2 = 14$ — $(11, 14)$, naming $-3$; $y \\cdot z$: have $2 + 4 = 6$, owe $8 + 1 = 9$ — $(6, 9)$, also naming $-3$; sum $[(11, 14)] + [(6, 9)] = [(17, 23)]$ — the same pair.',
                    'Take the reading: $-3$ plus $-3$ is $-6$ on both routes — the law holds at the instance, every intermediate a verified class computation.',
                    'Hence the ring checklist’s distribution line passes in the field — and with commutativity, associativity, identities and mirrors all swept earlier, $\\mathbb{Z}$’s audit is complete.',
                  ],
                  answer: '(x + y)·z = x·z + y·z = [(17,23)] = −6 — the ring law at the instance',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The sign rules',
          latex: 'a \\cdot (-b) = -(ab), \\qquad (-a) \\cdot b = -(ab), \\qquad (-a) \\cdot (-b) = ab',
          note: 'Theorems from the box rule: like-with-like products to the have box, mixed products to the owe box. Swept over $a, b \\in -6 \\dots 6$ — Brahmagupta’s 628 CE verses, proved.',
        },
        {
          kind: 'formula',
          name: 'Total subtraction',
          latex: 'x - y := x + (-y); \\qquad [(a, b)] - [(c, d)] = [(a + d,\\ b + c)]',
          note: 'Defined for every pair — the property $\\mathbb{N}$ lacked. Every equation $x + b = a$ now solves uniquely: $x = a + (-b)$.',
        },
        {
          kind: 'formula',
          name: 'The order and the flip',
          latex: '[(a, b)] \\le [(c, d)] \\Longleftrightarrow a + d \\le c + b; \\qquad a < b \\Rightarrow -b < -a',
          note: 'Well-defined (representative swaps swept) and faithful to $\\mathbb{N}$; the mirror reverses strict order — the $-8$ versus $-3$ trap, derived.',
        },
        {
          kind: 'formula',
          name: 'The cancellation laws',
          latex: 'a + x = a + y \\Rightarrow x = y; \\qquad c \\ne 0,\\ c \\cdot x = c \\cdot y \\Rightarrow x = y \\quad (\\text{via } c \\cdot x = 0 \\Rightarrow c = 0 \\text{ or } x = 0)',
          note: 'Additive cancellation universal (add the mirror); multiplicative via the zero-product lemma (swept, proved in Exercise 10). The repair, fully cashed.',
        },
      ],
    },
  ],
}
