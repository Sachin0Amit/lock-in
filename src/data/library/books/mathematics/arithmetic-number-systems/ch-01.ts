import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 1: The Natural Numbers as a System
 *
 * LESSONS WRITTEN: 1.1 The Architecture of Counting: Successors and Order
 *                  1.2 Induction: Proving for Every Number at Once
 *                  (run 49, 2026-11-05)
 * STILL PLANNED:   1.3 The Least-Number Principle and Recursion
 *
 * References for this unit: Beck & Geoghegan, The Art of Proof (the
 * university number-systems bridge; reserved key run 48); Peano,
 * Arithmetices principia (1889) + Dedekind, Was sind und was sollen die
 * Zahlen? (1888) — web-checked 2026-11-05 (sanctioned fallback), new key
 * peano-1889-arithmetices; Maurolico (1575), De Morgan (1838) and Euler
 * (1772) history web-checked 2026-11-05, new key induction-name-history —
 * see docs/project/SOURCE_LOG.md. Exposition original.
 *
 * Every number below was recomputed by scripts/verify-book2-ch01.ts
 * (sections A–K for 1.1, L–Z for 1.2) BEFORE being written — 124 checks,
 * all passing at authoring time.
 */
export const chapter01: Chapter = {
  number: 1,
  slug: 'natural-numbers-as-a-system',
  title: 'The Natural Numbers as a System',
  summary:
    'Counting rebuilt from the successor idea: the number line as order, induction as the domino principle that proves statements about every natural number at once, and the least-number principle (well-ordering) as the engine behind every "take the smallest counterexample" argument — with the equivalence of the two principles proved and recursion defined.',
  status: 'in-progress',
  plannedLessons: [
    'The Least-Number Principle and Recursion',
  ],
  lessons: [
    {
      id: 'ans-architecture-of-counting-successors-order',
      number: '1.1',
      title: 'The Architecture of Counting: Successors and Order',
      prerequisites: ['fm-numbers-digits-place-value', 'fm-comparing-ordering-numbers'],
      sources: ['beck-geoghegan-art-of-proof', 'peano-1889-arithmetices'],
      concepts: [
        'Counting as repeated succession',
        'The successor operation S(n)',
        'The Peano axioms',
        'Injectivity: no two numbers share a successor',
        'Order as run length',
        'Transitivity of <',
        'Why the numbers never repeat',
        'The count formula b − a − 1',
      ],
      objectives: [
        'State the successor picture of counting and the axioms that govern it, and say what each axiom prevents',
        'Say precisely what $a < b$ means in successor terms, and compare numbers by run length instead of vibes',
        'Prove that order is transitive by concatenating runs',
        'Prove that the chain 1, 2, 3, … never repeats a value and never ends',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Foundation Mathematics taught you to *operate*: how to add, how to compare by seats, how to run a divisibility test. The numbers themselves were the obedient staffage of those lessons — always there, never inspected. This book inspects them. We rebuild arithmetic from its load-bearing wall, and the wall turns out to be astonishingly thin: one operation, the "step to the next number", plus a handful of sentences about what that step may and may not do. Everything you have ever done with whole numbers — every sum, every comparison, every remainder — is a consequence of those sentences. You met the number line and the successor language informally in Foundation Mathematics Lesson 1.1, and the words successor and predecessor in Lesson 1.2; here we make them carry weight. The question that opens the book is the one every child asks and school quietly retires: when a list of numbers ends with "and so on", what exactly was promised?',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The axiomatic moment: 1888–1889',
          text: 'The reconstruction of arithmetic from the successor idea was assembled in the 1860s–1880s. Hermann Grassmann showed first that the laws of arithmetic could be *derived*, not just assumed, from succession and induction. Richard Dedekind gave a full axiomatisation in his 1888 booklet *Was sind und was sollen die Zahlen?* ("What are numbers, and what should they be?"), and Giuseppe Peano published the streamlined Latin version in 1889 — *Arithmetices principia, nova methodo exposita* — whose five short sentences are the ones this chapter walks through. The axioms are usually credited jointly as the Dedekind–Peano axioms. Nothing about them is complicated; what was remarkable was the realisation that *so little* was needed.',
        },
        { kind: 'heading', text: 'The successor: one operation, all of counting' },
        {
          kind: 'para',
          text: 'Watch a child count honestly. They do not summon the number seven from a warehouse of concepts; they say "one" and then keep taking a step — "two" is where "one" goes next, "three" is where "two" goes next. The entire infinite list is generated by a single move, repeated. That move has a name.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Successor',
          text: 'The **successor** of a natural number $n$ is said to be the natural number that comes *immediately after* $n$ — the number you reach by one full step of counting, with no number squeezed in between. It is written $S(n)$. Thus, $S(1) = 2$, $S(2) = 3$, $S(99) = 100$, and every natural number is somebody\u2019s successor except the first one. In the fluent notation of Foundation Mathematics we may write $S(n) = n + 1$ — but read that as borrowed shorthand: addition itself will be *defined* from succession in Lesson 1.3, so nothing here may lean on it.',
        },
        {
          kind: 'para',
          text: 'One honest notational warning before the machinery starts. Writing $n + 1$ for "the next number" feels innocent because you have added for years. But this book is rebuilding the ground floor, and addition cannot be an ingredient in its own foundation. So we keep the symbol $S(n)$ on the axiomatic pages and treat $n + 1$ strictly as a *translation convenience* for readers who already own Foundation Mathematics. For example, watch the system generate its whole population from the first number:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'start: the number $1$ — no earlier number exists to reach it from;',
            'one application: $S(1)$ — the number immediately after 1, named "two" in the daily language;',
            'repeat: $S(S(1))$, then $S(S(S(1)))$, and so on — each application pins down exactly one new number;',
            'a numeral like $4725$ — the very numeral dissected seat by seat in Foundation Mathematics Lesson 1.1 — is in this light just the *name* of the number reached by applying $S$ to $1$ exactly $4724$ times. Positional notation is a compression scheme for describing runs of succession.',
          ],
        },
        { kind: 'heading', text: 'The axioms: five sentences that hold everything' },
        {
          kind: 'para',
          text: 'What stops the step from misbehaving? Nothing in the phrase "the next number" *forces* a next number to exist, or forbids two different numbers from sharing one, or prevents the chain from quietly curving back on itself like a snake eating its tail. Those possibilities must be ruled out — or in — explicitly. The five sentences that do the ruling are the **Peano axioms**, and each one is there because a specific, imaginable failure would occur without it.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$1$ is a natural number — the chain has a first link; counting has a place to start.',
            'Every natural number $n$ has a successor $S(n)$, and $S(n)$ is again a natural number — no step dead-ends; the chain has no last link.',
            'Different numbers have different successors: if $S(a) = S(b)$, then $a = b$ — no two numbers merge into the same next; the chain never forks.',
            '$1$ is the successor of no natural number — the chain has no earlier entry point; it is not a circle.',
            'Induction: any property that holds for $1$, and holds for $S(n)$ whenever it holds for $n$, holds for *every* natural number — tipping the first domino, plus every domino tipping the next, covers the whole chain. (This is the engine of Lesson 1.2; named here so the list is complete.)',
          ],
        },
        {
          kind: 'table',
          caption: 'The axioms and their day jobs — what each forbids, and what would break without it',
          head: ['Axiom', 'Says', 'Failure it forbids', 'If it were dropped'],
          rows: [
            ['(i)', '$1$ is a natural number', 'a chain with no first link', 'counting never starts; nothing is defined'],
            ['(ii)', 'every $n$ has a successor $S(n)$', 'a dead-ending chain', 'a "largest number" could exist; sums could overflow the world'],
            ['(iii)', '$S(a) = S(b) \\Rightarrow a = b$', 'two numbers merging into one next', 'the chain forks; "the next number" becomes ambiguous'],
            ['(iv)', '$1$ is nobody\u2019s successor', 'the chain closing into a circle', 'counting loops like a clock: "13" is 1 again, "how many" stops growing'],
            ['(v)', 'induction', 'infinitely many facts forever unprovable', 'no statement about *all* numbers could ever be certified (Lesson 1.2)'],
          ],
        },
        {
          kind: 'para',
          text: 'Axioms (i)–(iv) already decide the *shape* of the system: every natural number is either $1$ or the successor of exactly one earlier number — there is no third kind, no number floating in from nowhere. Together they say the number line is a one-way street: a first address, unlimited forward travel, no forks, no roundabouts. Axiom (v) is different in kind — it is a *licence to prove*, and it gets its own lesson.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Natural numbers (ℕ)',
              def: 'The counting system $1, 2, 3, \\dots$ generated from $1$ by repeated succession. In this book $0$ is not a natural number; it joins later, as a placeholder (Foundation Mathematics, zero as a load-bearing digit) and as the first of the integers built in chapter 6.',
            },
            {
              term: 'Successor',
              def: 'The number immediately after $n$, written $S(n)$ — one full counting step, nothing in between. The everyday notation $n + 1$ is borrowed shorthand until addition is defined by recursion in Lesson 1.3.',
            },
            {
              term: 'Peano axioms',
              def: 'The five governing sentences of the natural numbers (Dedekind 1888, Peano 1889): a first number $1$; every number has a successor; successors never merge; $1$ is nobody\u2019s successor; induction.',
            },
            {
              term: 'Injective (one-to-one)',
              def: 'Said of a step that never merges two origins: $S(a) = S(b)$ forces $a = b$. Axiom (iii) is the statement that succession is injective — the chain never forks.',
            },
            {
              term: 'Run',
              def: 'A chain of successor steps from one number to another. The **run length** from $a$ to $b$ is the number of steps; in Foundation Mathematics notation it is $b - a$ (with $\\text{run}(a \\to a) = 0$).',
            },
            {
              term: 'Less than',
              def: '$a < b$ — $b$ can be reached from $a$ by one or more successor steps — a run of length at least $1$. Formal statement in the Definition box below.',
            },
            {
              term: 'Trichotomy',
              def: 'For any two natural numbers $a$ and $b$, exactly one of the three verdicts holds: $a < b$, or $a = b$, or $b < a$. No ties, no double verdicts.',
            },
            {
              term: 'Axiom',
              def: 'A sentence accepted without proof as a starting point, chosen because everything else follows from it. The Peano axioms are chosen so that the whole of arithmetic can be *derived*, not memorised.',
            },
          ],
        },
        { kind: 'heading', text: 'Order is built in: from "next" to "less than"' },
        {
          kind: 'para',
          text: 'Foundation Mathematics compared numbers by their seats — leftmost differing digit decides, with the domination bound as the engine. That was a *numeral* rule, a fact about written names. The deeper question is what "less than" means for the *numbers themselves*. The successor picture answers in one breath: to travel from $a$ to $b$ you take steps, and the two possible outcomes — you arrive after some steps, or you never will — are exactly the two orders. Compare this with the seat rule of Foundation Mathematics Lesson 1.2: same verdicts, different foundations — one reads the written name, the other walks the line itself.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Less than',
          text: 'A natural number $a$ is said to be **less than** a natural number $b$ — written $a < b$ — when $b$ can be obtained from $a$ by applying the successor a finite number of times *at least once*. The number of applications is the **run length** from $a$ to $b$. Thus, $a < b \\Leftrightarrow \\text{run}(a \\to b) \\ge 1$, and $a \\le b$ allows the zero-step run too. In the borrowed notation of Foundation Mathematics, $\\text{run}(a \\to b) = b - a$, which is why distance on the number line you drew in Foundation Mathematics Lesson 1.1 is literally a count of successor steps.',
        },
        {
          kind: 'para',
          text: 'The definition is worth a slow reading, because it does real work. "Immediately after" was already load-bearing in the successor itself; "less than" now inherits it: $3 < 7$ because starting at 3 and taking steps — $4, 5, 6, 7$ — you arrive after $4$ of them, and $4 \\ge 1$. Equality is the zero-step run: $\\text{run}(8 \\to 8) = 0$. And "how far apart" stops being a separate concept: the gap between $8$ and $11$ *is* the run of $3$ steps. Order, distance and counting are one idea wearing three hats.',
        },
        {
          kind: 'example',
          title: 'Reading order and distance as runs',
          steps: [
            'Take $8$ and $11$. Walk the successors: $9, 10, 11$ — a run of $3$ steps, so $8 < 11$, and the *distance* between them is $3$ at the same time.',
            'Take $8$ and $8$. The run needs $0$ steps: neither number is less than the other — they are the same number.',
            'Now count what lives *strictly between* $8$ and $21$: the numbers $9$ through $20$. Listing them is $12$ numbers; the run from $8$ to $21$ has $21 - 8 = 13$ steps, and the endpoints themselves are the two steps the "strictly between" count excludes: $13 - 2 = 12$.',
            'Hence the counting formula you will use for life: the natural numbers strictly between $a$ and $b$ number $b - a - 1$ whenever $a < b$.',
            'Check the shape of it: between $8$ and $9$ the formula gives $9 - 8 - 1 = 0$ — neighbours touch, nothing fits between them. That fact gets its full proof in Lesson 1.2; today the formula and the walk agree.',
          ],
        },
        {
          kind: 'para',
          text: 'Comparisons chain, and the reason is now visible rather than remembered. If $2 < 5$ and $5 < 9$, the run $2 \\to 5$ has $3$ steps and the run $5 \\to 9$ has $4$; walking straight through takes $3 + 4 = 7$ steps and lands on $9$, so $2 < 9$. The next derivation writes that concatenation argument carefully, because it is the first *proof* of the book and its pattern — do the small thing, then let repetition do the rest — is the pattern of the whole subject.',
        },
        {
          kind: 'derivation',
          title: 'Transitivity of order: runs concatenate',
          statement:
            'Claim: for natural numbers $a, b, c$, if $a < b$ and $b < c$ then $a < c$. The proof needs only what a run *is* — following $S$ a certain number of times — and the observation that two journeys in sequence are one journey of the combined length.',
          steps: [
            {
              label: 'Name the two runs',
              formula: 'b = S^{k}(a) \\quad (k \\ge 1), \\qquad c = S^{m}(b) \\quad (m \\ge 1)',
              explanation:
                'The definition of < supplies these two runs: $b$ is $k$ steps from $a$, $c$ is $m$ steps from $b$, both counts at least one. $S^k(a)$ means "$k$ applications of $S$, starting from $a$" — a notation, not yet a formula.',
            },
            {
              label: 'Splice them into one walk',
              formula: 'c = S^{m}(S^{k}(a)) = S^{k+m}(a)',
              explanation:
                'Walking $k$ steps from $a$ to $b$ and then $m$ more from $b$ lands on the same number as walking $k + m$ steps directly from $a$ — for a concrete $k$ and $m$ this is just re-grouping a finite list of steps: $(1+2)+3$ steps is $1+2+3$ steps.',
            },
            {
              label: 'Read off the run length',
              formula: '\\text{run}(a \\to c) = k + m \\ge 1 + 1 = 2 \\ge 1',
              explanation:
                'The concatenated run is non-empty — indeed at least $2$ — so the definition of $<$ applies: $a < c$.',
            },
          ],
          result:
            '$a < b$ and $b < c$ always force $a < c$: order transmits along the line. In the instance above, $3 + 4 = 7$ steps from $2$ lands on $9$.',
        },
        {
          kind: 'para',
          text: 'From the same run vocabulary, the everyday properties of $<$ fall out — with one honest promissory note attached:',
        },
        {
          kind: 'list',
          marker: 'disc',
          items: [
            '**Trichotomy** — for any $a$ and $b$, exactly one of $a < b$, $a = b$, $b < a$ holds: walks either reach $b$ ($\\text{run} \\ge 1$), or need zero steps ($a = b$), or go backwards (so the walk the *other* way succeeds). The "never reach" alternative is what the no-loop fact of Lesson 1.2 will close off rigorously.',
            '**Transitivity** — $a < b < c$ gives $a < c$: proved above, by run concatenation.',
            '**Neighbours touch** — no natural number lies strictly between $n$ and $S(n)$: a run of length strictly between $0$ and $1$ would have to exist, and run lengths are whole numbers of steps. The airtight proof waits for Lesson 1.2\u2019s engine (the no-return lemma).',
            '**Succession preserves order** — if $a < b$ then $S(a) < S(b)$: shift both ends of the walk one step right and the same $k$ steps remain to walk (this is Exercise L5, where you write it out).',
          ],
        },
        { kind: 'heading', text: 'Why the numbers never run out' },
        {
          kind: 'para',
          text: '"And so on" now has content, but a suspicious reader should still ask: could the chain, for all its forward motion, revisit a number it has already been? If it did, counting would be a wheel — long, but not endless — and "how many" would quietly stop meaning anything. That this cannot happen is not an extra axiom; it is a *theorem*, and the proof is short enough to keep in your head for life.',
        },
        {
          kind: 'derivation',
          title: 'The chain 1, 2, 3, … never repeats',
          statement:
            'Claim: the numbers $1,\\; S(1),\\; S(S(1)),\\; \\dots$ — the chain generated from $1$ — are pairwise distinct. Only axioms (iii) and (iv) are used: no merging, and $1$ is nobody\u2019s successor.',
          steps: [
            {
              label: 'Suppose, for contradiction, that the chain revisits',
              formula: 'S^{j}(1) = S^{i}(1) \\quad \\text{with } i < j',
              explanation:
                'If no revisit ever happened we are done, so assume two members of the chain coincide — the $i$-th and the $j$-th, with $i$ strictly smaller. Concretely: could $S^3(1) = 4$ equal $S^7(1) = 8$? The argument says no such coincidence is possible at *any* depth.',
            },
            {
              label: 'Strip the shared successors, one at a time',
              formula: 'S(S^{j-1}(1)) = S(S^{i-1}(1)) \\;\\Rightarrow\\; S^{j-1}(1) = S^{i-1}(1) \\;\\Rightarrow\\; \\dots \\;\\Rightarrow\\; S^{\\,j-i}(1) = 1',
              explanation:
                'Axiom (iii) — injectivity — lets us cancel one $S$ from the front of each side: equal successors came from equal predecessors. Cancel $i$ times in all (a finite piece of bookkeeping) and the equality shrinks to: the $(j-i)$-th member of the chain equals $1$ itself, where $j - i \\ge 1$.',
            },
            {
              label: 'Contradict axiom (iv)',
              formula: 'S^{\\,j-i}(1) = S\\bigl(S^{\\,j-i-1}(1)\\bigr) \\;\\text{ is a successor,}\\quad \\text{but } 1 \\text{ is nobody\u2019s successor}',
              explanation:
                'The left side, being $S$ applied to something, is a successor of some number. Axiom (iv) says $1$ is not. A number would have to be both — impossible.',
            },
            {
              label: 'Conclude',
              formula: '\\therefore\\; S^{j}(1) \\ne S^{i}(1) \\text{ whenever } i < j',
              explanation:
                'The assumed coincidence is impossible, so every member of the chain is new. In the concrete instance: $S^3(1) = 4$ and $S^7(1) = 8$ never meet, and neither does any other pair.',
            },
          ],
          result:
            'The chain from $1$ never repeats: every step of counting arrives somewhere genuinely new. Infinitude is not an article of faith — it is the shadow cast by two short axioms.',
        },
        {
          kind: 'para',
          text: 'Two corollaries come free. First, there is **no largest natural number**: given any member of the chain, its successor is a further, distinct member. Second, counting can never "wrap around": a finite system like a clock face, where twelve is followed by one, is not a simplified number line but a *different structure* that violates axiom (iv) — on a clock, $1$ *is* a successor (of $12$), and the price is that counting stops growing: "13 o\u2019clock" is just 1 again. Exercise L3-2 walks through that failure, because seeing an axiom die is the fastest way to respect it.',
        },
        {
          kind: 'figure',
          caption:
            'The successor architecture. Each arrow applies S once — one full counting step, no forks, no returns. The number 1 has arrows leaving but none entering: it is nobody\u2019s successor (axiom iv). The bracket reads order off the picture: reaching 5 from 2 takes a run of 3 steps, so 2 < 5, and the run length is simultaneously the distance between them. The traffic is strictly one-way: following S always moves right and never revisits a number — the theorem proved above.',
          svg: `<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Successor chain from 1 to 7 with arrows, a run bracket from 2 to 5, and one-way annotations">
  <defs>
    <marker id="succ-arrow" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor"/>
    </marker>
  </defs>
  <text x="380" y="38" font-size="13" fill="currentColor" opacity="0.8" text-anchor="middle">each arrow applies S once — the whole system is one step, repeated</text>
  <!-- nodes 1..7 -->
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    ${Array.from({ length: 7 }, (_, i) => `<circle cx="${80 + i * 92}" cy="80" r="17"/>`).join('\n    ')}
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle" font-weight="700">
    ${Array.from({ length: 7 }, (_, i) => `<text x="${80 + i * 92}" y="84.5">${i + 1}</text>`).join('\n    ')}
  </g>
  <!-- arrows between consecutive nodes, trimmed 19 px inside the rims -->
  <g stroke="currentColor" stroke-width="1.5">
    ${Array.from({ length: 6 }, (_, i) => `<line x1="${80 + i * 92 + 19}" y1="80" x2="${80 + (i + 1) * 92 - 21}" y2="80" marker-end="url(#succ-arrow)"/>`).join('\n    ')}
  </g>
  <text x="126" y="66" font-size="12" fill="currentColor" text-anchor="middle" font-style="italic">S</text>
  <text x="690" y="84" font-size="18" fill="currentColor" text-anchor="middle">…</text>
  <!-- axiom (iv) annotation under node 1 -->
  <text x="80" y="118" font-size="11.5" fill="#b45309" text-anchor="middle">1 is nobody’s successor</text>
  <!-- run bracket from node 2 to node 5 -->
  <g stroke="#b45309" stroke-width="1.5" fill="none">
    <line x1="189" y1="150" x2="431" y2="150"/>
    <line x1="189" y1="144" x2="189" y2="156"/>
    <line x1="431" y1="144" x2="431" y2="156"/>
  </g>
  <text x="310" y="172" font-size="12" fill="#b45309" text-anchor="middle">the run from 2 to 5 is 3 steps ⇒ 2 &lt; 5 (and the distance is 3)</text>
  <text x="380" y="205" font-size="12" fill="currentColor" opacity="0.8" text-anchor="middle">one-way traffic: S always moves right — following it never returns to a number already visited</text>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Three traps on the axiomatic ground floor',
          text: 'One: writing $S(n) = n + 1$ and then *reasoning with addition* — say, splitting $n+1$ as if it were a sum already defined. Inside this chapter the plus sign is a courtesy translation only; every legitimate inference must be traceable to $S$ and the axioms, and Lesson 1.3 will earn the plus sign back properly. Two: "the axioms are obvious, so this is ceremony." They are obvious *for the line you have drawn in your head since childhood* — but the clock face is a line-in-the-head too, and it violates axiom (iv) and thereby counting itself. The axioms are diagnostic instruments, and their value shows when something fails them. Three: confusing "1 is not a successor" with "1 has no successor." Axiom (iv) says nothing enters $1$; axiom (ii) guarantees something leaves it. The first link is fixed; the chain still grows.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Why this architecture pays rent later',
          text: 'The successor picture is not a museum piece — it is the reference frame every later chapter measures against. Chapter 2\u2019s division algorithm (the theorem inside every long division you have ever run) is proved from the least-number principle, which is induction\u2019s twin — Lesson 1.3. Chapter 5\u2019s congruences are exactly what the clock does *right*: successor-walking that wraps at a chosen modulus. And the great extension ladder of chapters 6–8 — ℤ to repair subtraction, ℚ to repair division, ℝ to repair the gaps — each rung is built by the same technique this chapter is demonstrating on the ground floor: say precisely what the system must do, and build the smallest structure that does it. Even positional naming returns: a numeral, you now know, is a compressed report of a run of successions (the $4725$ of item (iv) above and of Foundation Mathematics Lesson 1.1 are the same fact in two dialects).',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which Peano axiom single-handedly forbids the number line from closing into a circle, clock-style?',
              options: [
                'Every natural number has a successor',
                'Successors never merge — $S(a) = S(b)$ forces $a = b$',
                '$1$ is the successor of no natural number',
                'Induction',
              ],
              answer: 2,
              explain:
                'A circle violates "1 is nobody\u2019s successor": on a clock face, 1 *is* the successor of 12, so the chain loops and counting stops growing (Exercise L3-2 works the failure out). Option (a) is actually *satisfied* by the clock — every clock number has a successor — which shows an axiom can hold while the system still fails: it is the *combination* that pins the line down. Option (b) fails only when the circle is degenerate; option (d) governs provability, not shape.',
            },
            {
              q: 'In the successor picture, how many successor steps take you from $1$ to $4725$?',
              options: ['$4724$', '$4725$', '$4726$', 'It cannot be said without counting one by one'],
              answer: 0,
              explain:
                'The run from $1$ to $b$ has $b - 1$ steps: $4725 - 1 = 4724$. Off-by-one guard: the *number* of numbers from $1$ to $4725$ inclusive is $4725$, but the number of *steps* is one fewer — you do not need a step to depart from where you already stand. Option (d) is the pre-theoretic reflex this lesson exists to retire: run length is a defined quantity, computed, not enumerated.',
            },
            {
              q: 'If $S(a) = S(b)$, what follows — and from which axiom?',
              options: [
                '$a = b$, by injectivity: different numbers never share a successor',
                '$a = b + 1$, by the order of counting',
                'Nothing — successors may legitimately collide',
                '$a < b$, by the definition of order',
              ],
              answer: 0,
              explain:
                'Axiom (iii) says the successor map is one-to-one: equal successors have equal predecessors. Option (b) is a bestiary of the exact confusion this chapter bans — using addition (and a claim about it!) inside the foundation. Option (c) describes a forked chain, in which "the next number" would be ambiguous and numerals could not name one thing. Option (d) has nothing to do with the hypothesis.',
            },
            {
              q: 'How many natural numbers lie strictly between $12$ and $20$?',
              options: ['$6$', '$7$', '$8$', '$19$'],
              answer: 1,
              explain:
                'The count is $b - a - 1 = 20 - 12 - 1 = 7$: the numbers $13, 14, 15, 16, 17, 18, 19$. Choosing $8$ forgets that "strictly between" excludes *both* endpoints (subtract 2 from the 9-step run, not 1); choosing $6$ subtracts 3; choosing $19$ counts the endpoint. The formula earns its keep precisely when the listing gets too long to eyeball.',
            },
            {
              q: 'In the successor architecture, $a < b$ means:',
              options: [
                '$b$ has more digits than $a$',
                '$b$ is reachable from $a$ by one or more successor steps',
                '$S(a) = b$, always',
                'Some seat of $b$ carries a larger digit than the matching seat of $a$',
              ],
              answer: 1,
              explain:
                'That is the definition: a non-empty run from $a$ to $b$. Options (a) and (d) describe properties of *numerals* — useful shortcuts (Foundation Mathematics proved them safe), but they are theorems about written names, not the meaning of order; and they fail outright outside the numerals, e.g. comparing via runs works for quantities no one has written down. Option (c) claims the run has exactly one step — that is "b is the successor of a", a much stronger statement: $3 < 5$ though $S(3) = 4$.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Compute $S(1997)$, and state the length of the run from $1$ to your answer.',
                  solution: [
                    'Take the definition literally: $S(1997)$ is the number immediately after $1997$.',
                    'So $S(1997) = 1998$.',
                    'Now, the run from $1$ to $1998$ has $1998 - 1 = 1997$ steps.',
                    'Hence $S(1997) = 1998$, reached from $1$ by a run of $1997$ steps — notice the two numbers in the answer differ by exactly one: the successor *is* one more step.',
                  ],
                  answer: 'S(1997) = 1998; the run from 1 to it has 1997 steps',
                },
                {
                  q: 'Is $4 < 11$ in the successor sense? State the run length, and use it also as the distance.',
                  solution: [
                    'Walk from $4$: the successors come as $5, 6, 7, 8, 9, 10, 11$.',
                    'The run has $11 - 4 = 7$ steps, and $7 \\ge 1$, so yes: $4 < 11$.',
                    'The same $7$ is the distance between the numbers on the line — one walk, two readings.',
                    'Hence $4 < 11$, run length $7$; distance $7$.',
                  ],
                  answer: 'Yes — a run of 7 steps, which is also the distance',
                },
                {
                  q: 'Which Peano axiom guarantees that counting never halts — that there is no largest natural number?',
                  solution: [
                    'Axiom (ii): every natural number $n$ has a successor $S(n)$, again a natural number.',
                    'So from any candidate "largest" number, one more step produces a bigger one — the halt cannot happen.',
                    'Combined with exercise L6 (no repeats), this gives unboundedness: the chain grows forever without circles.',
                    'Hence axiom (ii), the no-dead-end axiom.',
                  ],
                  answer: 'Axiom (ii): every n has a successor S(n)',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'How many successor steps lead from $1$ to $1000$? From $1$ to one million ($1{,}000{,}000$)?',
                  solution: [
                    'Run length from $1$ to $b$ is $b - 1$.',
                    'For $b = 1000$: $1000 - 1 = 999$ steps.',
                    'For $b = 1{,}000{,}000$: $1{,}000{,}000 - 1 = 999{,}999$ steps.',
                    'Hence $999$ and $999{,}999$ — and notice how the *numeral* (a short written name) compresses a run of nearly a million steps: naming is compression.',
                  ],
                  answer: '999 steps; 999,999 steps',
                },
                {
                  q: 'Given $2 < 5$ and $5 < 9$, conclude $2 < 9$ and verify the run arithmetic explicitly.',
                  solution: [
                    'Run $2 \\to 5$: $5 - 2 = 3$ steps.',
                    'Run $5 \\to 9$: $9 - 5 = 4$ steps.',
                    'Splice them: a walk of $3 + 4 = 7$ steps from $2$ lands on $9$.',
                    'Check directly: $9 - 2 = 7$ ✓ — the concatenated length equals the single-run length.',
                    'Since $7 \\ge 1$, the definition of $<$ gives $2 < 9$.',
                    'Hence $2 < 9$ — transitivity, caught in the act: $3 + 4 = 7$.',
                  ],
                  answer: '2 < 9 (runs 3 + 4 = 7 concatenate)',
                },
                {
                  q: 'How many natural numbers lie strictly between $8$ and $21$? Confirm the count formula $b - a - 1$ by listing.',
                  solution: [
                    'Formula first: $21 - 8 - 1 = 12$.',
                    'Now, the list: $9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20$.',
                    'Count the list entries: $20 - 9 + 1 = 12$ ✓ — the same twelve.',
                    'Hence $12$, by formula and by listing — and note the "$+1$" in the direct count is the classic trap the formula automates.',
                  ],
                  answer: '12 numbers (9 through 20)',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Explain why no natural number can lie strictly between $n$ and $S(n)$. Argue with run lengths (the fully airtight proof is Lesson 1.2\u2019s no-return lemma).',
                  solution: [
                    'Suppose some number $b$ sat strictly between: $n < b$ and $b < S(n)$.',
                    'Now, $n < b$ means the run $n \\to b$ has $k \\ge 1$ steps, so $b = S^k(n)$.',
                    'And $b < S(n)$ means the run $b \\to S(n)$ has $m \\ge 1$ steps.',
                    'Splice: the run $n \\to S(n)$ would then have $k + m \\ge 2$ steps.',
                    'But $S(n)$ is *one* step from $n$ by definition — its run length is $1$, not $2$ or more.',
                    'So such a $b$ cannot exist: between neighbours the only run lengths available are $0$ and $1$, and nothing fits between them.',
                    'Hence neighbours touch — the number line has no spare seats. (Lesson 1.2 repays the promissory note with the no-return lemma, closing the loophole this sketch leaves open.)',
                  ],
                  answer: 'Nothing fits between n and S(n) — the only possible run lengths there are 0 and 1',
                },
                {
                  q: 'A clock face "counts" 1, 2, …, 12 and then wraps: $S(12) = 1$. Which Peano axiom does the clock violate, and what familiar fact about clocks shows the cost?',
                  solution: [
                    'Check the axioms: every clock number has a successor ✓ (axiom ii holds); successors are distinct — $S(a) = S(b)$ forces $a = b$ ✓ (axiom iii holds).',
                    'But $S(12) = 1$: the number $1$ *is* a successor — axiom (iv) fails.',
                    'Trace the cost: walk from $1$ twelve steps and you are back at $1$; "13 o\u2019clock" is $1$ again.',
                    'So "how many" never grows: the chain is a wheel, not a line, and no numeral names a quantity — twelve symbols cycle forever.',
                    'Hence axiom (iv) is the one that dies, and with it the meaning of counting as an ever-growing tally.',
                  ],
                  answer: 'Axiom (iv): 1 is a successor on the clock — the chain loops and counting stops growing',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) How many natural numbers lie between $1$ and $2025$ — counting both endpoints? Counting neither?',
                  solution: [
                    'Both endpoints: every integer from $1$ to $2025$ counts, so $2025$ numbers.',
                    'Neither endpoint: strictly between means $2$ through $2024$.',
                    'Use the formula: $2025 - 1 - 1 = 2023$ numbers.',
                    'Cross-check by the inclusion pattern: inclusive count minus the two excluded endpoints — $2025 - 2 = 2023$ ✓.',
                    'Hence $2025$ inclusive, $2023$ strictly between — a two-mark pair that examiners love because the two answers differ by exactly the two endpoints.',
                  ],
                  answer: '2025 counting both; 2023 counting neither',
                },
                {
                  q: '(Exam-style, foundation level) Use the count formula to find how many whole numbers lie strictly between $1$ and $4725$, and sanity-check the result against the run length.',
                  solution: [
                    'Apply the formula with $a = 1$, $b = 4725$: $4725 - 1 - 1 = 4723$.',
                    'Sanity-check: the run $1 \\to 4725$ has $4724$ steps; excluding the two endpoints removes $2$ of them: $4724 - 2 = 4723$ ✓.',
                    'Hence $4723$ numbers — and the check is the habit to keep: endpoint bookkeeping verified two ways.',
                  ],
                  answer: '4723 numbers',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove: if $a < b$ then $S(a) < S(b)$. (Hint: the run from $a$ to $b$ has $k \\ge 1$ steps; argue that the run from $S(a)$ to $S(b)$ has the *same* $k$ steps — one step then $k$, versus $k$ steps then one, both land $k + 1$ steps from $a$.)',
                  solution: [
                    'Let $a < b$. By definition there is a run with $b = S^{k}(a)$ for some $k \\ge 1$.',
                    'Apply $S$ once more to the destination: $S(b) = S(S^{k}(a))$, which is $k + 1$ applications of $S$ starting from $a$.',
                    'Now, walk from $S(a)$ instead: one step first, then the same $k$ steps — for a concrete $k$, taking $1 + k$ steps is taking $k + 1$ steps, merely re-grouped.',
                    'So $S(b) = S^{k}(S(a))$: the run from $S(a)$ to $S(b)$ is exactly the original $k$ steps, shifted one place right.',
                    'Since $k \\ge 1$, the definition of $<$ applies: $S(a) < S(b)$.',
                    'Hence succession preserves order — shifting both ends of a comparison keeps the verdict, which is why the number line\u2019s pattern looks the same at every window.',
                  ],
                  answer: 'S(a) < S(b) — the same k ≥ 1 steps, read from a one-step-later start',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Write out the no-repeat argument in full rigour: show that the list $1, S(1), S^{2}(1), S^{3}(1), \\dots$ never names the same number twice.',
                  solution: [
                    'Suppose, for contradiction, that two members coincide: $S^{j}(1) = S^{i}(1)$ with $i < j$.',
                    'Strip one $S$ from each side, appealing to axiom (iii): $S(S^{j-1}(1)) = S(S^{i-1}(1))$ gives $S^{j-1}(1) = S^{i-1}(1)$.',
                    'Repeat the strip $i$ times in all — a finite piece of cancelling — to reach $S^{\\,j-i}(1) = 1$, where $j - i \\ge 1$.',
                    'But $S^{\\,j-i}(1) = S\\bigl(S^{\\,j-i-1}(1)\\bigr)$ is the successor of *something* — by axiom (iv), $1$ is the successor of nothing.',
                    'A number cannot both be a successor and not be one: contradiction.',
                    'Therefore no two members coincide: the chain from $1$ is injective end to end.',
                    'With axiom (ii) (the chain never halts) this is the complete architecture of "and so on": endless, and never twice to the same place.',
                  ],
                  answer: 'S^j(1) = S^i(1) with i < j forces a successor to equal 1 — contradicting axiom (iv)',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'Run length',
          latex: '\\text{run}(a \\to b) = b - a \\quad (a \\le b)',
          note: 'The number of successor steps from $a$ to $b$ — simultaneously the distance between them. The zero-step run, $a = b$, is equality; order ($a < b$) is the run of length $\\ge 1$.',
        },
        {
          kind: 'formula',
          name: 'Count strictly between',
          latex: '\\#\\{\\text{naturals strictly between } a \\text{ and } b\\} = b - a - 1 \\quad (a < b)',
          note: 'The inclusive count from $a$ to $b$ is $b - a + 1$; "strictly between" removes both endpoints. Instances: between $12$ and $20$ there are $7$; between $1$ and $4725$ there are $4723$.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Examination rooms rarely say "Peano", but the architecture earns marks constantly: "how many numbers lie between…" items (the $b - a - 1$ and $b - a + 1$ pair, and their off-by-one traps) are staples of every quantitative aptitude paper — SSC, banking, CAT, CUET; successor/predecessor vocabulary appears directly in foundation-level reasoning sections; and the *style* of argument practised here — define precisely, then chain small certain steps — is exactly what proof-based questions from NTSE through olympiad screening reward. The run-length instinct also settles "impossible without counting" items instantly: no one enumerates to $4724$; one subtracts.',
        },
        {
          kind: 'para',
          text: 'The ground floor is set: one operation, five sentences, and order already deducible rather than assumed. What the axioms have *not* yet given is a way to prove the infinitely many statements that mention *every* number — "the sum of the first $n$ numbers is…", "no number lies between neighbours", "this holds for all time". Checking cases one by one never finishes. The instrument that finishes it — induction, axiom (v), the domino principle — is the next lesson, and it is the single most reusable proof engine in mathematics.',
        },
      ],
    },
    {
      id: 'ans-induction-proving-for-every-number',
      number: '1.2',
      title: 'Induction: Proving for Every Number at Once',
      prerequisites: ['ans-architecture-of-counting-successors-order'],
      sources: ['beck-geoghegan-art-of-proof', 'induction-name-history'],
      concepts: [
        'The domino principle',
        'Base case + inductive step',
        'The inductive hypothesis',
        'Proving the sum formulas',
        'Divisibility claims by induction',
        'Finite checks never prove "for all"',
        'The no-return lemma',
        'Guess, then prove',
      ],
      objectives: [
        'State the two conditions of induction and explain why together they cover every natural number',
        'Prove the sum formulas — $\\sum k$, the odd sums, the geometric sum — by induction, every algebraic move justified',
        'Diagnose the two classic failures — a missing base and a missing step — through concrete instances',
        'Prove the no-return lemma and close the order gaps Lesson 1.1 left open',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Foundation Mathematics Lesson 11.2 watched patterns earn trust: differences that stayed constant, matchstick counts that grew by $3$, and the great Gauss pairing that *guessed* $1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$. The guessing was honest work — but a guess, however well-bred, is still a guess. Forty agreeing cases is forty agreeing cases; the forty-first could betray you. What converts pattern-confidence into knowledge is this lesson\u2019s subject: mathematical induction, the one proof technique whose reach is infinite. It is axiom (v) of Lesson 1.1, and everything else in this chapter has been waiting for it.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Older than its name',
          text: 'The method is centuries older than its name. Francesco Maurolico\u2019s *Arithmeticorum libri duo* (written 1557, published 1575) already proves facts about polygonal numbers by verifying a first case and then showing each case drags in the next. Augustus De Morgan fixed the name — "mathematical induction" — in an 1838 encyclopaedia article, distinguishing it sharply from the *inductive guessing* of the natural sciences: induction in mathematics proves; induction in science merely persuades. And when Peano wrote his axioms in 1889, induction was not added to the list as a convenience — it *is* the list\u2019s final axiom: the sentence that separates the true number line from its broken imitations.',
        },
        { kind: 'heading', text: 'The domino principle' },
        {
          kind: 'para',
          text: 'A statement about natural numbers — call it $P(n)$ — is a claim that can be true or false at each stopping point of the chain: "$P(4)$" might say "the sum $1 + 2 + 3 + 4$ equals $\\frac{4 \\times 5}{2}$". To prove $P(n)$ for *every* natural number is to fill infinitely many stopping points, and no lifetime lists them. The way through is structural. Picture the chain $1, 2, 3, \\dots$ as a row of standing dominoes, one per number, domino $n$ labelled $P(n)$. Two moves suffice to drop them all, and both moves are finite:',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The principle of mathematical induction',
          text: 'A statement $P(n)$ about natural numbers is said to hold for **every** natural number if the following two conditions are verified: **(1) the base case** — $P(1)$ is true; and **(2) the inductive step** — for an *arbitrary* natural number $k$, $P(k)$ true forces $P(k + 1)$ true. In symbols:',
        },
        {
          kind: 'equation',
          latex: 'P(1) \\;\\wedge\\; \\bigl(\\forall k \\ge 1:\\; P(k) \\Rightarrow P(k+1)\\bigr) \\;\\Longrightarrow\\; P(n) \\text{ for every } n \\ge 1',
          note: 'Axiom (v) of Lesson 1.1, worn as a proof technique. The first clause tips the first domino; the second clause guarantees every domino, once tipped, tips its neighbour.',
        },
        {
          kind: 'para',
          text: 'Why does this cover *all* the numbers, not just the near ones? Run the consequence forward. The base case gives $P(1)$. Feeding $k = 1$ into the step gives $P(2)$; feeding $k = 2$ gives $P(3)$; feeding $k = 3$ gives $P(4)$. Any target $n$ you name sits at a *finite* run of steps from $1$ — Lesson 1.1\u2019s run of $n - 1$ steps — and the step clause has now been iterated that many times, each iteration licensed. This is exactly the meaning of axiom (v): a property containing $1$ and closed under $S$ contains everything. The proof of a "for all $n$" statement is thereby compressed into two finite checks — a genuinely remarkable trade.',
        },
        {
          kind: 'figure',
          caption:
            'Induction as dominoes. Domino $n$ carries the statement $P(n)$. The base case tips the first domino by hand: $P(1)$ is verified directly. The inductive step is the spacing guarantee: whenever $P(k)$ is down, $P(k + 1)$ goes down too. Since every domino sits at a finite run from the first, the pair of checks flattens the entire row — an infinite conclusion from two finite verifications.',
          svg: `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A row of eight dominoes where the first is tipped, with the inductive step annotated">
  <defs>
    <marker id="dom-arrow" markerWidth="9" markerHeight="7" refX="7" refY="3.5" orient="auto">
      <path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor"/>
    </marker>
  </defs>
  <text x="380" y="38" font-size="13" fill="currentColor" opacity="0.8" text-anchor="middle">the step: P(k) ⇒ P(k + 1) — each domino tips the next</text>
  <g stroke="currentColor" stroke-width="1.5" fill="none">
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${55 + i * 84}" y="60" width="48" height="115" rx="7"${i === 0 ? ' fill="#b45309" fill-opacity="0.15" stroke="#b45309" stroke-width="2"' : ''}/>`).join('\n    ')}
  </g>
  <g font-size="13" fill="currentColor" text-anchor="middle" font-weight="700">
    ${Array.from({ length: 8 }, (_, i) => `<text x="${79 + i * 84}" y="122">P(${i + 1})</text>`).join('\n    ')}
  </g>
  <g stroke="currentColor" stroke-width="1.2">
    ${Array.from({ length: 7 }, (_, i) => `<line x1="${105 + i * 84}" y1="117" x2="${135 + i * 84}" y2="117" marker-end="url(#dom-arrow)"/>`).join('\n    ')}
  </g>
  <text x="715" y="122" font-size="18" fill="currentColor" text-anchor="middle">…</text>
  <text x="79" y="205" font-size="12" fill="#b45309" text-anchor="middle">base: P(1) is true</text>
  <text x="480" y="205" font-size="12" fill="currentColor" opacity="0.8" text-anchor="middle">so P(n) holds for every n the chain reaches — that is, every n</text>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Both conditions, always — two instructive wrecks',
          text: 'The two conditions are *both* mandatory, and each has a signature failure. **A step without a base:** consider $P(n)$: "$n^2 + n + 1$ is even". The step is perfectly valid — if $k^2 + k + 1$ is even then $(k+1)^2 + (k+1) + 1 = (k^2 + k + 1) + 2k + 2$ is even plus even, hence even — yet $P(1) = 3$ is odd, and in truth $P(n)$ is false for *every* $n$ (Lesson 1.2\u2019s exercises dissect why). A valid implication chained from a false start proves nothing: the floating chain of dominoes never gets its first push. **A base without a step:** take $Q(n)$: "$n \\ge 2$". The base $Q(1)$ fails ($1 \\ge 2$ is false), while every other domino stands true — the claim "for all $n$, $n \\ge 2$" dies at the first number even though the step ($k \\ge 2 \\Rightarrow k + 1 \\ge 2$) is fine. Checking a hundred, a million, or a billion cases is *neither* of the two conditions; it is loitering at the first few dominoes.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Mathematical induction',
              def: 'The proof principle of axiom (v): a statement $P(n)$ holds for every natural number once $P(1)$ is verified (base) and $P(k) \Rightarrow P(k+1)$ is verified for arbitrary $k$ (step). Two finite checks, infinite coverage.',
            },
            {
              term: 'Base case',
              def: 'The direct verification of $P(1)$ — the first domino, tipped by hand. A valid step with a false base transmits nothing (the "even" trap: $P(1) = 3$ is odd).',
            },
            {
              term: 'Inductive step',
              def: 'The proof that $P(k)$ forces $P(k + 1)$ for an *arbitrary* $k$ — the spacing guarantee that every domino, once down, tips the next.',
            },
            {
              term: 'Inductive hypothesis',
              def: 'The assumption "$P(k)$ holds" inside the step — licensed for one unnamed arbitrary $k$, and consumed exactly there (e.g. $10^k - 1 = 9m$ feeding $10^{k+1} - 1 = 9(10m + 1)$).',
            },
            {
              term: 'Weak induction',
              def: 'This lesson\u2019s principle: the step assumes only $P(k)$. Its stronger cousin assumes all of $P(1), \dots, P(k)$ — met in Lesson 1.3 with the least-number principle.',
            },
            {
              term: 'Shifted base',
              def: 'The restarted principle: verifying $P(n_0)$ and the step proves $P(n)$ for every $n \ge n_0$. Instance: "$n \\ge 2$" is provable from the base $n_0 = 2$ — not from $n_0 = 1$.',
            },
            {
              term: 'Euler\u2019s prime-generating polynomial',
              def: '$f(n) = n^2 + n + 41$: prime for every $n = 0, 1, \dots, 39$ (Euler, 1772), then $f(40) = 1681 = 41^2$ — the monument to "finite checks never prove a for-all".',
            },
            {
              term: 'No-return lemma',
              def: '$S^k(n) \\ne n$ for every $n \\ge 1$, $k \\ge 1$ — proved by induction on the start (base: axiom (iv); step: injectivity strips one $S$). The staircase never loops; trichotomy\u2019s engine.',
            },
          ],
        },
        { kind: 'heading', text: 'Induction at work I: the sum formulas' },
        {
          kind: 'para',
          text: 'The engine\u2019s first assignments are the formulas Foundation Mathematics earned by pattern. Each proof has the same skeleton — verify the base, assume the statement at $k$ (the **inductive hypothesis**), drive the statement to $k + 1$ — and each algebraic move below is a plain, checkable identity. First, the sum that Gauss paired as a schoolboy:',
        },
        {
          kind: 'derivation',
          title: 'The sum of the first n natural numbers',
          statement:
            'Claim: for every $n \\ge 1$,\\; $1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$. Foundation Mathematics Lesson 11.2 found this by pairing; induction now *proves* it from nothing but arithmetic.',
          steps: [
            {
              label: 'Base case: n = 1',
              formula: '1 + \\cdots + 1 = 1 = \\frac{1 \\times 2}{2}',
              explanation:
                'The left side is just $1$; the right side evaluates to $1$. The first domino is down — no hypothesis needed, just arithmetic.',
            },
            {
              label: 'Assume the inductive hypothesis',
              formula: '1 + 2 + \\cdots + k = \\frac{k(k+1)}{2} \\quad \\text{for an arbitrary } k \\ge 1',
              explanation:
                'This is the licensed assumption: the statement at *some* arbitrary stopping point $k$. Not at every point — at one unnamed point, which is all the step requires.',
            },
            {
              label: 'Add the next number to both sides',
              formula: '1 + 2 + \\cdots + k + (k+1) = \\frac{k(k+1)}{2} + (k+1)',
              explanation:
                'The left side is exactly the sum at $k + 1$ — the sum at $k$ with one more term appended. Whatever the new sum is, it equals the old sum plus $k + 1$.',
            },
            {
              label: 'Reorganise the right side',
              formula: '\\frac{k(k+1)}{2} + (k+1) = \\frac{k(k+1) + 2(k+1)}{2} = \\frac{(k+1)(k+2)}{2}',
              explanation:
                'One factoring move: $k(k+1) + 2(k+1) = (k+1)(k+2)$ — both terms share the factor $(k+1)$. Check the shape: the new right side is exactly the closed form with $n = k + 1$.',
            },
            {
              label: 'Read the conclusion',
              formula: '1 + 2 + \\cdots + (k+1) = \\frac{(k+1)(k+2)}{2} = P(k+1)',
              explanation:
                'The statement at $k + 1$ holds *whenever* the statement at $k$ holds. Since the base held at $1$, the domino chain runs to every number — the formula is proved, forever.',
            },
          ],
          result:
            '$1 + 2 + \\cdots + n = \\dfrac{n(n+1)}{2}$ for every natural number $n$ — verified at $n = 10$ ($55$) and $n = 100$ ($5050$), the Gauss pairing\u2019s answer, now standing on proof rather than pattern.',
        },
        {
          kind: 'para',
          text: 'The same skeleton, run twice more, retires two more pattern-guessed formulas — the odd sums whose square picture Foundation Mathematics Lesson 11.1 drew as gnomons wrapping the squares, and the geometric sum that will run every base-conversion in chapter 3:',
        },
        {
          kind: 'derivation',
          title: 'The odd sums land on the squares',
          statement:
            'Claim: for every $n \\ge 1$,\\; $1 + 3 + 5 + \\cdots + (2n - 1) = n^2$ — the sum of the first $n$ odd numbers is the square of the count.',
          steps: [
            {
              label: 'Base case: n = 1',
              formula: '1 = 1^2',
              explanation:
                'The first odd number alone is $1$, and $1^2 = 1$. Down goes the first domino.',
            },
            {
              label: 'Assume the inductive hypothesis',
              formula: '1 + 3 + \\cdots + (2k - 1) = k^2',
              explanation:
                'The sum of the first $k$ odd numbers is $k^2$, for an arbitrary $k$.',
            },
            {
              label: 'Append the next odd number',
              formula: '1 + 3 + \\cdots + (2k-1) + (2k+1) = k^2 + (2k + 1)',
              explanation:
                'The odd after the $k$-th is $(2k + 1)$ — two more than $2k - 1$, keeping the run of odds consecutive.',
            },
            {
              label: 'Recognise the algebra',
              formula: 'k^2 + 2k + 1 = (k+1)^2',
              explanation:
                'The expansion of the next square. This is the *entire* reason the pattern exists: each gnomon of $2k + 1$ counters wraps the $k$-square into the $(k+1)$-square — Foundation Mathematics Lesson 11.1\u2019s picture, now an identity.',
            },
            {
              label: 'Conclude',
              formula: '1 + 3 + \\cdots + (2k + 1) = (k+1)^2 = P(k+1)',
              explanation:
                'The statement at $k + 1$ follows from the statement at $k$; the base held; the chain is covered end to end.',
            },
          ],
          result:
            'The first $n$ odd numbers always sum to $n^2$: the partial sums walk $1, 4, 9, 16, 25, 36, \\dots$ — the squares, proved one gnomon at a time.',
        },
        {
          kind: 'derivation',
          title: 'The geometric sum: powers of two, one short',
          statement:
            'Claim: for every $n \\ge 1$,\\; $1 + 2 + 4 + \\cdots + 2^{n-1} = 2^n - 1$ — doubling never catches its own tail.',
          steps: [
            {
              label: 'Base case: n = 1',
              formula: '1 = 2^1 - 1',
              explanation:
                'The sum\u2019s first term is $1$; the closed form gives $2^1 - 1 = 1$. Base down.',
            },
            {
              label: 'Assume the inductive hypothesis',
              formula: '1 + 2 + \\cdots + 2^{k-1} = 2^k - 1',
              explanation:
                'The sum of the first $k$ powers of two is one less than the next power — assumed for arbitrary $k$.',
            },
            {
              label: 'Append the next power',
              formula: '1 + 2 + \\cdots + 2^{k-1} + 2^{k} = (2^k - 1) + 2^{k}',
              explanation:
                'The next term after $2^{k-1}$ is $2^k$ — the powers double at each rung.',
            },
            {
              label: 'Collect the powers',
              formula: '(2^k - 1) + 2^k = 2 \\cdot 2^k - 1 = 2^{k+1} - 1',
              explanation:
                'Two copies of $2^k$ are $2^{k+1}$; the stray $-1$ rides along. Exactly the closed form at $k + 1$.',
            },
            {
              label: 'Conclude',
              formula: '1 + 2 + \\cdots + 2^{k} = 2^{k+1} - 1 = P(k+1)',
              explanation:
                'Step verified; base verified; every $n$ covered. The sum of the first ten powers is $1023 = 2^{10} - 1$, and the legend\u2019s full chessboard — doubling through all $64$ squares — piles up $2^{64} - 1 = 18446744073709551615$ grains: a number induction underwrites without listing a single one of them.',
            },
          ],
          result:
            '$1 + 2 + 4 + \\cdots + 2^{n-1} = 2^n - 1$ for every $n$ — the engine behind binary naming in chapter 3, and the arithmetic inside every "doubling" story ever told.',
        },
        {
          kind: 'table',
          caption: 'The showcased proofs at a glance — every row swept by the chapter\u2019s verify script',
          head: ['Claim', 'Base check', 'The step\u2019s one move', 'Swept'],
          rows: [
            ['$1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$', '$1 = \\frac{1 \\times 2}{2}$ ✓', '$\\frac{k(k+1)}{2} + (k+1) = \\frac{(k+1)(k+2)}{2}$', '$n = 1..200$'],
            ['$1 + 3 + \\cdots + (2n-1) = n^2$', '$1 = 1^2$ ✓', '$k^2 + (2k+1) = (k+1)^2$', '$n = 1..200$'],
            ['$1 + 2 + 4 + \\cdots + 2^{n-1} = 2^n - 1$', '$1 = 2^1 - 1$ ✓', '$2(2^k - 1) + 1 = 2^{k+1} - 1$', '$n = 1..40$'],
            ['$9 \\mid (10^n - 1)$', '$10^1 - 1 = 9$ ✓', '$10(10^k - 1) + 9$', '$n = 1..30$'],
            ['$n^2 + n + 41$ prime?', 'prime for $n = 0..39$', '— none exists —', 'fails at $n = 40$'],
          ],
        },
        { kind: 'heading', text: 'Induction at work II: divisibility claims' },
        {
          kind: 'para',
          text: 'A second family suits induction perfectly: claims of the form "such-and-such always leaves remainder zero". Foundation Mathematics Lesson 3.1 banked the *rule* — a number and its digit sum agree mod 9 — and the digit-sum reflex leaned on facts like $999 = 9 \\times 111$ being divisible. Why is *every* number of the form $10^n - 1$ — every run of nines — a multiple of 9? Watch the step build divisibility out of divisibility:',
        },
        {
          kind: 'derivation',
          title: 'Every run of nines is a multiple of nine',
          statement:
            'Claim: for every $n \\ge 1$, $9$ divides $10^n - 1$ — the numbers $9, 99, 999, 9999, \\dots$ are all multiples of $9$.',
          steps: [
            {
              label: 'Base case: n = 1',
              formula: '10^1 - 1 = 9 = 9 \\times 1',
              explanation:
                'One nine: divisible, visibly. Base down.',
            },
            {
              label: 'Assume the inductive hypothesis',
              formula: '10^k - 1 = 9m \\quad \\text{for some whole number } m',
              explanation:
                'The $k$-nine number $99 \\cdots 9$ is nine times something. This is the hypothesis to be *used*, not re-proved.',
            },
            {
              label: 'Build the next number from the old one',
              formula: '10^{k+1} - 1 = 10 \\times 10^k - 1 = 10(10^k - 1) + 9',
              explanation:
                'The algebra that powers the whole family: peel off one factor of 10, then patch back 9. Check it on the left: $10 \\times 10^k - 10 + 9 = 10^{k+1} - 1$ ✓.',
            },
            {
              label: 'Feed in the hypothesis',
              formula: '10(10^k - 1) + 9 = 10 \\times 9m + 9 = 9(10m + 1)',
              explanation:
                'Both summands are multiples of $9$ — the first *by the hypothesis*, the second outright. Divisibility has been manufactured from divisibility.',
            },
            {
              label: 'Conclude',
              formula: '10^{k+1} - 1 = 9(10m + 1) \\;\\Rightarrow\\; 9 \\mid (10^{k+1} - 1) = P(k+1)',
              explanation:
                'The $(k+1)$-nine number is nine times the whole number $10m + 1$. With the base, the chain runs: every run of nines whatever — $999 = 9 \\times 111$, $9999 = 9 \\times 1111$, and onward without end — is a multiple of $9$. This is the fact *fm-divisibility-and-its-tests* leaned on; here is its proof.',
            },
          ],
          result:
            '$9$ divides $10^n - 1$ for every $n \\ge 1$ — the digit-sum test\u2019s deep foundation, proved with one hypothesis and one patch.',
        },
        {
          kind: 'example',
          title: 'A step that proves too much: the "even" trap, dissected',
          steps: [
            'Take $P(n)$: "$n^2 + n + 1$ is even", and let us try to run induction — honestly, and watch where it dies.',
            'Check the base first, as the principle demands: $P(1)$ says $1^2 + 1 + 1 = 3$ is even. It is not. The base fails — the first domino stands.',
            'Now, the strange part: the *step* is impeccable. Assume $k^2 + k + 1$ even; then $(k+1)^2 + (k+1) + 1 = k^2 + 3k + 3 = (k^2 + k + 1) + 2k + 2$ — an even number plus the even quantity $2k + 2$ — hence even.',
            'So the implication $P(k) \\Rightarrow P(k+1)$ is valid for every $k$, the base is false, and the conclusion "all $n$" is false: in fact $k(k+1)$ is even for every $k$ (consecutive numbers), so $k^2 + k + 1$ is odd for every $k$ — the verify script swept this through $n = 200$.',
            'Hence the diagnosis that examiners grade: a valid step with a false base is a chain of dominoes floating above the ground — no first push, no conclusion. Both conditions, or nothing.',
          ],
        },
        { kind: 'heading', text: 'The discipline of doubt: finite checks never prove "for all"' },
        {
          kind: 'para',
          text: 'If induction feels laborious next to "just check some cases", this subsection is the antidote. In 1772 Euler noticed that the polynomial $n^2 + n + 41$ hands back a prime for every input in sight: $n = 0$ gives $41$, $n = 1$ gives $43$, $n = 2$ gives $47$, and the primes keep coming — $40$ consecutive successes, through $n = 39$ (whose value $1601$ is itself prime). No polynomial known today does better. And yet the story ends at the very next input: at $n = 40$ the formula produces $40^2 + 40 + 41 = 1681 = 41 \\times 41$ — a perfect square, composite, the run dead. Forty verified cases, and the forty-first betrays.',
        },
        {
          kind: 'example',
          title: 'Euler’s 40 primes — and the 41st value',
          steps: [
            'Tabulate the run\u2019s opening: $n = 0, 1, 2, 3, 4, 5, 6, 7, 8, 9$ give $41, 43, 47, 53, 61, 71, 83, 97, 113, 131$ — every one prime (the verify script re-tested all forty by trial division).',
            'The pattern whispers "always prime" — exactly the whisper induction exists to interrogate.',
            'Now, the untested input next door: $n = 40$ gives $40^2 + 40 + 41 = 1600 + 81 = 1681$.',
            'Factor it: $1681 = 41 \\times 41$ — since $41^2 = 1681$, the value is composite.',
            'Hence: no finite run of checks, however long — not $40$, not $40$ million — settles a claim about *every* number. The step of an induction proof is the only licensed leap from "some" to "all", and Euler\u2019s polynomial is the monument to why.',
          ],
        },
        {
          kind: 'para',
          text: 'The two-lesson dance is thus complete, and its division of labour worth naming. *Patterns* (Foundation Mathematics ch. 11) find the candidate — the formula, the cycle, the rule. *Induction* (this lesson) promotes the candidate to a theorem — or, as with Euler\u2019s polynomial, exposes it. Neither step is optional: guessing without proving publishes accidents, and proving without a guess has nothing to aim at. Professional mathematics runs on the handshake between the two.',
        },
        { kind: 'heading', text: 'Repairing Lesson 1.1\u2019s promises: the no-return lemma' },
        {
          kind: 'para',
          text: 'Lesson 1.1 proved that the chain *from 1* never repeats, and left two promissory notes stamped "needs induction": that no *other* part of the line loops back either (the engine behind trichotomy), and that nothing hides between neighbours. Both notes fall to one short induction — the first proof in this book whose statement quantifies over two variables at once.',
        },
        {
          kind: 'derivation',
          title: 'The no-return lemma: the staircase never loops',
          statement:
            'Claim: for every natural number $n \\ge 1$ and every $k \\ge 1$, $S^k(n) \\ne n$ — starting anywhere, following successors $k$ times never brings you home. (Induction on $n$, the *starting point*.)',
          steps: [
            {
              label: 'Base case: n = 1',
              formula: 'S^k(1) = S\\bigl(S^{k-1}(1)\\bigr) \\;\\text{ is a successor}; \\quad 1 \\text{ is nobody\u2019s successor}',
              explanation:
                'For any $k \\ge 1$, the point $S^k(1)$ is by construction the successor of something. Axiom (iv) says $1$ is not a successor of anything. One number cannot wear both descriptions — so $S^k(1) \\ne 1$. The first rung is safe, using only the two axioms Lesson 1.1 flagged as "shape".',
            },
            {
              label: 'Assume the inductive hypothesis',
              formula: 'S^k(n) \\ne n \\quad \\text{for every } k \\ge 1',
              explanation:
                'Assumed for an arbitrary starting point $n$: from $n$, no number of successor steps ever returns to $n$. Note the hypothesis is itself a "for every $k$" statement — this is still weak induction (one assumed rung), just a rung with internal structure.',
            },
            {
              label: 'Target the next starting point, and suppose it fails',
              formula: '\\text{suppose } S^k(S(n)) = S(n) \\text{ for some } k \\ge 1',
              explanation:
                'For contradiction: some number of steps from $S(n)$ lands back on $S(n)$. Since $S^k(S(n))$ means $k + 1$ applications of $S$ from $n$, this reads $S^{k+1}(n) = S(n)$.',
            },
            {
              label: 'Strip one successor, by injectivity',
              formula: 'S^{k+1}(n) = S(n) \\;\\Rightarrow\\; S\\bigl(S^k(n)\\bigr) = S(n) \\;\\Rightarrow\\; S^k(n) = n',
              explanation:
                'Both sides are successors of something: the left is $S$ applied to $S^k(n)$, the right is $S$ applied to $n$. Axiom (iii) — successors never merge — cancels the outer $S$ from both sides, leaving $S^k(n) = n$ with the same $k \\ge 1$.',
            },
            {
              label: 'Contradict the hypothesis, and conclude',
              formula: 'S^k(n) = n \\quad \\text{contradicts the inductive hypothesis} \\;\\Rightarrow\\; S^k(S(n)) \\ne S(n) = P(n + 1)',
              explanation:
                'The failure at start-point $S(n)$ would force a failure at start-point $n$ — which never exists. The step is proved; with the base, induction hands over the full lemma: from *any* starting number, the successors never return home.',
            },
          ],
          result:
            'The number line is a staircase with no loops: $S^k(n) \\ne n$ for all $n \\ge 1$, $k \\ge 1$. Trichotomy\u2019s engine is now real — a "walk" that never returns cannot produce two contradictory verdicts.',
        },
        {
          kind: 'para',
          text: 'The neighbour promise follows immediately, and it is worth writing out because it is the first corollary *this book* earns: between $n$ and $S(n)$ there is no third natural number. Suppose $b$ sat strictly between — then $n < b$ gives $b = S^j(n)$ with $j \\ge 1$, and $b < S(n)$ gives $S(n) = S^m(b)$ with $m \\ge 1$. Splicing the runs (transitivity\u2019s concatenation, Lesson 1.1): $S(n) = S^{j+m}(n) = S\\bigl(S^{j+m-1}(n)\\bigr)$, and injectivity strips the outer $S$: $n = S^{j+m-1}(n)$ with $j + m - 1 \\ge 1$ — a return to $n$ after a positive number of steps, which the no-return lemma forbids. The seats of the number line are packed: each number touches its neighbours with nothing between.',
        },
        {
          kind: 'para',
          text: 'A closing scope note, so the tool\u2019s edges are visible. Induction *verifies* statements; it does not *find* them — the guess is patterns\u2019 job, as the Euler story warned. It proves statements already nailed to the natural numbers; making *new* numbers (zero, negatives, fractions) or defining operations by "keep applying $S$" — recursion — is the next lesson\u2019s business, together with induction\u2019s stronger cousin (assume not just $P(k)$ but *all* of $P(1), \\dots, P(k)$) and the least-number principle, the well-ordering engine that powers the division algorithm of chapter 2. The domino you have today is the simplest one; it is astonishing how far it already reaches.',
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Every induction proof contains exactly two verified things. Which pair?',
              options: [
                'A base case and the inductive step',
                'Many worked examples and a plausible pattern',
                'A formula and a matching figure',
                'The inductive step, verified twice for safety',
              ],
              answer: 0,
              explain:
                'Base case $P(1)$ + step $P(k) \\Rightarrow P(k+1)$ — the two clauses of axiom (v). Option (b) is the pattern stage that *finds* candidates (Foundation Mathematics ch. 11) but never certifies them — Euler\u2019s polynomial passed 40 such checks. Option (d) is the classic misreading: re-verifying the step changes nothing if the base is missing, as the "even" trap shows.',
            },
            {
              q: 'In the induction proof of $1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$, the inductive step must establish:',
              options: [
                'that the formula holds when $n = 1$',
                'that $\\frac{k(k+1)}{2} + (k+1) = \\frac{(k+1)(k+2)}{2}$, taking the statement from $k$ to $k + 1$',
                'that the formula holds when $n = 100$',
                'that Gauss\u2019s pairing argument was correct',
              ],
              answer: 1,
              explain:
                'The step\u2019s whole job: assume the formula at an arbitrary $k$ and derive it at $k + 1$ — appending the term $k + 1$ and factoring. Option (a) is the base case, not the step. Option (c) is one more data point — worth nothing toward "all $n$" (Euler\u2019s lesson). Option (d) proves a *different* route to the same formula; induction must stand on its own two clauses.',
            },
            {
              q: 'Euler\u2019s polynomial $n^2 + n + 41$ is prime for every $n$ from $0$ to $39$. The value at $n = 40$ teaches that:',
              options: [
                'the polynomial is prime forever after $40$ as well',
                'Euler made an arithmetic slip at $n = 40$',
                'no finite run of checks, however long, proves a claim about every number',
                'induction cannot be applied to statements about primes',
              ],
              answer: 2,
              explain:
                '$f(40) = 1681 = 41 \\times 41$ — composite — after $40$ consecutive prime outputs. The moral is the discipline of this lesson: verification accumulates evidence; only the base-plus-step structure certifies. Option (a): the run does not resume — a perfect square can never be prime, and many later values fail too. Option (b): the arithmetic is exactly right, which is the point. Option (d): induction handles primality fine (this chapter\u2019s exercises prove divisibility facts by it).',
            },
            {
              q: '$P(n)$: "$n^2 + n + 1$ is even." The implication $P(k) \\Rightarrow P(k+1)$ is valid for every $k$, yet $P(1) = 3$ is odd. Conclusion?',
              options: [
                'The valid step alone settles the claim',
                'A valid step with a false base proves nothing — the base is mandatory',
                'The step must contain a hidden algebra error',
                'Evenness claims are unsuitable for induction',
              ],
              answer: 1,
              explain:
                'This is the floating-chain wreck: without the first push, a perfect step mechanism transmits nothing. In truth $P(n)$ is false for every $n$ — $k(k+1)$ is always even, so $k^2 + k + 1$ is always odd — so the step, though valid, carries only falsehoods. Option (c): the algebra is airtight ($(k^2 + k + 1) + 2k + 2$), which is precisely what makes the example instructive. Option (d): no — the geometric and divisibility proofs are the counterexample.',
            },
            {
              q: 'The no-return lemma ($S^k(n) \\ne n$ for $k \\ge 1$) is proved by induction on the starting point $n$. Its inductive step strips one $S$ off a supposed failure using:',
              options: [
                'axiom (ii), the existence of successors',
                'the division algorithm of chapter 2',
                'axiom (iv), $1$ is nobody\u2019s successor',
                'axiom (iii), injectivity — equal successors $S^{k+1}(n) = S(n)$ force $S^k(n) = n$',
              ],
              answer: 3,
              explain:
                'The step\u2019s single algebraic move: from $S^{k+1}(n) = S(n)$, injectivity cancels one $S$ from each side, leaving $S^k(n) = n$ — the very thing the hypothesis forbids. Option (a) guarantees the walk exists but cannot cancel anything. Option (b) is a later chapter\u2019s theorem — invoking it here would be circular. Option (c) is the *base case*\u2019s engine (it protects the rung $n = 1$), not the step\u2019s.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'For the sum formula $1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}$: verify the base case at $n = 1$, then walk the step by hand at $k = 4$ (check $10 + 5 = 15$ against the closed form at $5$).',
                  solution: [
                    'Base: the left side at $n = 1$ is just $1$; the right side is $\\frac{1 \\times 2}{2} = 1$. Equal — the base holds.',
                    'At $k = 4$ the sum is $1 + 2 + 3 + 4 = 10$, and the closed form agrees: $\\frac{4 \\times 5}{2} = 10$.',
                    'Walk the step: append the next number, $5$: $10 + 5 = 15$.',
                    'Check the closed form at $5$: $\\frac{5 \\times 6}{2} = 15$ ✓ — the step\u2019s promise, cashed at one concrete rung.',
                    'Hence base ✓ and step ✓ (the algebra $\\frac{k(k+1)}{2} + (k+1) = \\frac{(k+1)(k+2)}{2}$ was proved in the derivation and swept to $200$).',
                  ],
                  answer: 'Base: 1 = 1·2/2 ✓; step at k = 4: 10 + 5 = 15 = 5·6/2 ✓',
                },
                {
                  q: 'For "the sum of the first $n$ odd numbers is $n^2$": verify the base case and the first two dominoes ($n = 2$ and $n = 3$) by direct arithmetic.',
                  solution: [
                    'Base: $n = 1$: the first odd number is $1$, and $1^2 = 1$ ✓.',
                    'First domino: $n = 2$: $1 + 3 = 4 = 2^2$ ✓.',
                    'Second domino: $n = 3$: $1 + 3 + 5 = 9 = 3^2$ ✓.',
                    'Notice each new odd lands on the next square — the gnomon picture of Foundation Mathematics Lesson 11.1, and the pattern the derivation proved for all $n$.',
                    'Hence the base and the first two rungs hold, exactly as the proof predicts.',
                  ],
                  answer: '1 = 1² ✓; 1 + 3 = 4 = 2² ✓; 1 + 3 + 5 = 9 = 3² ✓',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Prove by induction: $2 + 4 + 6 + \\cdots + 2n = n(n + 1)$ for every $n \\ge 1$.',
                  solution: [
                    'Base: $n = 1$: the left side is $2$; the right side is $1 \\times 2 = 2$ ✓.',
                    'Now, assume the inductive hypothesis: $2 + 4 + \\cdots + 2k = k(k + 1)$ for arbitrary $k \\ge 1$.',
                    'Append the next even number, $2k + 2$: the sum becomes $k(k+1) + (2k + 2)$.',
                    'Factor: $k(k+1) + 2(k+1) = (k+1)(k+2)$ — both terms share $(k+1)$.',
                    'That is exactly the closed form at $k + 1$: $(k+1)((k+1)+1)$ ✓.',
                    'Hence the step; with the base, the formula holds for every $n$. Instance: $2 + 4 + \\cdots + 14 = 56 = 7 \\times 8$ ✓.',
                  ],
                  answer: '2 + 4 + ⋯ + 2n = n(n + 1), proved for all n ≥ 1',
                },
                {
                  q: 'Prove by induction that the sum of the first $n$ odd numbers is $n^2$, and state where the proof uses that consecutive odds differ by exactly $2$.',
                  solution: [
                    'Base: $n = 1$: $1 = 1^2$ ✓.',
                    'Now, assume $1 + 3 + \\cdots + (2k - 1) = k^2$ for arbitrary $k$.',
                    'Append the next odd number, $2k + 1$: the sum becomes $k^2 + 2k + 1$.',
                    'Recognise the square: $k^2 + 2k + 1 = (k + 1)^2$ — exactly the statement at $k + 1$.',
                    'Hence the step; with the base, the claim holds for every $n \\ge 1$.',
                    'Where difference $2$ entered: the next odd after $2k - 1$ is $2k + 1$ *because* consecutive odds differ by $2$ — the append move in the step is licensed by it.',
                    'This is the proof behind the gnomon wrapping of Foundation Mathematics Lesson 11.1: each odd count of counters wraps the previous square.',
                  ],
                  answer: 'Σ(2k − 1) = n² for all n ≥ 1; the ±2 difference licenses each append',
                },
                {
                  q: 'Prove by induction: $9$ divides $10^n - 1$ for every $n \\ge 1$. Then use $n = 6$ to confirm $999999 = 9 \\times 111111$.',
                  solution: [
                    'Base: $n = 1$: $10^1 - 1 = 9 = 9 \\times 1$ ✓.',
                    'Now, assume $10^k - 1 = 9m$ for some whole number $m$ (the inductive hypothesis).',
                    'Build the next: $10^{k+1} - 1 = 10(10^k - 1) + 9$ — peel a factor of ten, patch back nine.',
                    'Feed the hypothesis in: $10 \\times 9m + 9 = 9(10m + 1)$ — divisible by $9$ ✓.',
                    'Hence the step; with the base, every run of nines is a multiple of nine.',
                    'Instance at $n = 6$: $10^6 - 1 = 999999 = 9 \\times 111111$ ✓ (the digit-sum test of Foundation Mathematics Lesson 3.1, standing on its proof).',
                  ],
                  answer: '9 | (10^n − 1) for all n ≥ 1; 999999 = 9 × 111111',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Prove by induction: $n < 2^n$ for every $n \\ge 1$.',
                  solution: [
                    'Base: $n = 1$: $1 < 2 = 2^1$ ✓.',
                    'Now, assume $k < 2^k$ for arbitrary $k \\ge 1$ (the inductive hypothesis).',
                    'Double both sides: $2k < 2^{k+1}$ — doubling preserves strict inequality.',
                    'And $2k = k + k \\ge k + 1$, since $k \\ge 1$; so $k + 1 \\le 2k < 2^{k+1}$.',
                    'Chain the inequalities: $k + 1 < 2^{k+1}$ — exactly the statement at $k + 1$.',
                    'Hence the step; with the base, $n < 2^n$ for every $n$. Instance: $7 < 128 = 2^7$ ✓ — and the gap only widens from there.',
                  ],
                  answer: 'n < 2^n for every n ≥ 1 (the step needs only k ≥ 1)',
                },
                {
                  q: 'Prove by induction: $1 \\cdot 2 + 2 \\cdot 3 + \\cdots + n(n+1) = \\frac{n(n+1)(n+2)}{3}$ for every $n \\ge 1$.',
                  solution: [
                    'Base: $n = 1$: the left side is $1 \\times 2 = 2$; the right side is $\\frac{1 \\times 2 \\times 3}{3} = 2$ ✓.',
                    'Now, assume the sum through $k(k+1)$ equals $\\frac{k(k+1)(k+2)}{3}$ for arbitrary $k$.',
                    'Append the next term, $(k+1)(k+2)$: the sum becomes $\\frac{k(k+1)(k+2)}{3} + (k+1)(k+2)$.',
                    'Factor out $(k+1)(k+2)$: $(k+1)(k+2)\\left(\\frac{k}{3} + 1\\right) = (k+1)(k+2) \\cdot \\frac{k + 3}{3}$.',
                    'Read the shape: $\\frac{(k+1)(k+2)(k+3)}{3}$ — exactly the closed form at $k + 1$ ✓.',
                    'Hence the step; with the base, the identity holds for every $n$. Instance: $n = 6$ gives $2 + 6 + 12 + 20 + 30 + 42 = 112 = \\frac{6 \\times 7 \\times 8}{3}$ ✓.',
                  ],
                  answer: 'Σ k(k+1) = n(n+1)(n+2)/3 for all n ≥ 1',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style, foundation level) Prove: $6$ divides $7^n - 1$ for every $n \\ge 1$, and verify the instance $7^4 - 1 = 2400$.',
                  solution: [
                    'Base: $n = 1$: $7^1 - 1 = 6 = 6 \\times 1$ ✓.',
                    'Now, assume $7^k - 1 = 6m$ for some whole number $m$.',
                    'Build the next: $7^{k+1} - 1 = 7 \\times 7^k - 1 = 7(7^k - 1) + 6$ — peel a factor of seven, patch back six.',
                    'Feed the hypothesis: $7 \\times 6m + 6 = 6(7m + 1)$ — divisible by $6$ ✓.',
                    'Hence the step; with the base, $6 \\mid (7^n - 1)$ for every $n$.',
                    'Instance: $7^4 = 2401$, so $7^4 - 1 = 2400 = 6 \\times 400$ ✓.',
                    'Compare with the $10^n - 1$ proof: same skeleton, different patch ($6$ instead of $9$) — the pattern of "peel and patch" is the exam-transferable skill.',
                  ],
                  answer: '6 | (7^n − 1) for all n ≥ 1; 7⁴ − 1 = 2400 = 6 × 400',
                },
                {
                  q: '(Exam-style, foundation level) In the proof of $1 + 2 + 4 + \\cdots + 2^{n-1} = 2^n - 1$, write the step\u2019s key move and verify it concretely at $k = 5$ (that is, check $31 + 32 = 63$).',
                  solution: [
                    'The step\u2019s move: assume $1 + 2 + \\cdots + 2^{k-1} = 2^k - 1$; append the next power $2^k$; collect: $(2^k - 1) + 2^k = 2 \\cdot 2^k - 1 = 2^{k+1} - 1$.',
                    'Verify at $k = 5$: the sum of the first five powers is $1 + 2 + 4 + 8 + 16 = 31 = 2^5 - 1$ ✓ (the hypothesis, cashed).',
                    'Append the sixth power: $31 + 32 = 63$.',
                    'Check the closed form: $2^6 - 1 = 64 - 1 = 63$ ✓.',
                    'Hence the step verified concretely: doubling the sum plus one lands on the next power of two, minus one — every rung, every time.',
                  ],
                  answer: '(2^k − 1) + 2^k = 2^(k+1) − 1; at k = 5: 31 + 32 = 63 = 2⁶ − 1 ✓',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Prove by induction: $1^2 + 2^2 + \\cdots + n^2 = \\frac{n(n+1)(2n+1)}{6}$ for every $n \\ge 1$.',
                  solution: [
                    'Base: $n = 1$: the left side is $1$; the right side is $\\frac{1 \\times 2 \\times 3}{6} = 1$ ✓.',
                    'Now, assume $\\sum_{i=1}^{k} i^2 = \\frac{k(k+1)(2k+1)}{6}$ for arbitrary $k$.',
                    'Append the next square: the sum becomes $\\frac{k(k+1)(2k+1)}{6} + (k+1)^2$.',
                    'Common denominator: $\\frac{k(k+1)(2k+1) + 6(k+1)^2}{6}$.',
                    'Factor out $(k+1)$: $\\frac{(k+1)\\bigl(k(2k+1) + 6(k+1)\\bigr)}{6} = \\frac{(k+1)(2k^2 + 7k + 6)}{6}$.',
                    'Factor the quadratic: $2k^2 + 7k + 6 = (k + 2)(2k + 3)$ — check by expanding: $2k^2 + 3k + 4k + 6$ ✓.',
                    'So the sum is $\\frac{(k+1)(k+2)(2k+3)}{6}$ — exactly the closed form at $k + 1$ (since $2(k+1) + 1 = 2k + 3$) ✓.',
                    'Hence the step; with the base, the formula holds for every $n$. Instance: $1 + 4 + 9 + 16 + 25 + 36 = 91 = \\frac{6 \\times 7 \\times 13}{6}$ ✓.',
                  ],
                  answer: 'Σk² = n(n+1)(2n+1)/6 for all n ≥ 1',
                },
                {
                  q: 'Autopsy: show that $P(n)$: "$n^2 + n + 1$ is even" has a *valid* inductive step for every $k$, and then prove that $P(n)$ is nevertheless false for every $n \\ge 1$ — identifying exactly which condition of induction fails.',
                  solution: [
                    'The step, honestly: assume $k^2 + k + 1$ even. Compute the successor statement: $(k+1)^2 + (k+1) + 1 = k^2 + 3k + 3 = (k^2 + k + 1) + (2k + 2)$.',
                    'Now, $2k + 2 = 2(k+1)$ is even; even $+$ even is even — so $P(k+1)$ follows from $P(k)$. The step is valid for every $k$ (swept to $200$).',
                    'Yet examine the claim itself: $n^2 + n = n(n+1)$ is a product of *consecutive* numbers — one of them is even — so $n^2 + n$ is even for every $n$.',
                    'Therefore $n^2 + n + 1$ is odd for every $n$: $P(n)$ is false at every rung (instance: $P(5) = 31$, odd).',
                    'Identify the failure: the *base case* $P(1)$ — $1^2 + 1 + 1 = 3$, odd — is false.',
                    'Hence the diagnosis: a valid step cannot rescue a false start. Induction needs both conditions; this candidate has exactly one — the floating-chain wreck, in full.',
                  ],
                  answer: 'Step valid for all k; base P(1) = 3 odd fails; P(n) false for every n',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Euler\u2019s polynomial: confirm $f(40) = 1681 = 41^2$ for $f(n) = n^2 + n + 41$, then explain in a paragraph why no finite number of successful checks — not even $40$, not even $40$ million — can replace the inductive step.',
                  solution: [
                    'Compute: $f(40) = 40^2 + 40 + 41 = 1600 + 81 = 1681$.',
                    'Factor: $41^2 = 1681$ exactly — so $f(40)$ is a perfect square, hence composite; the prime run that lasted through $n = 39$ ($f(39) = 1601$, prime) dies at $40$.',
                    'Why finite checks can never suffice: a "for all $n$" statement quantifies over an endless set, and any finite check-list covers a bounded initial segment of it.',
                    'Between the last checked case and infinity there are always unexamined inputs, and as Euler\u2019s polynomial shows, the first failure can sit immediately after arbitrarily many successes — the function is under *no* obligation to continue a pattern.',
                    'The inductive step is categorically different: it is a *local law* valid at every rung at once ("whenever $P(k)$, then $P(k+1)$"), and axiom (v) converts one local law plus one verified start into coverage of the entire chain.',
                    'Hence the division of labour that closes the lesson: patterns propose; induction disposes.',
                  ],
                  answer: 'f(40) = 1681 = 41²; finite checks bound nothing — only a universal step certifies "all n"',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The induction template',
          latex: 'P(1) \\;\\wedge\\; \\bigl(P(k) \\Rightarrow P(k+1)\\bigr) \\;\\Longrightarrow\\; P(n) \\;\\text{ for all } n \\ge 1',
          note: 'Axiom (v) as a proof technique: verify the base, prove the step for arbitrary $k$, and the chain is covered — an infinite conclusion from two finite checks.',
        },
        {
          kind: 'formula',
          name: 'Sum of the first n numbers',
          latex: '1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}',
          note: 'Proved by induction (base $1 = \\frac{1 \\times 2}{2}$; step $\\frac{k(k+1)}{2} + (k+1) = \\frac{(k+1)(k+2)}{2}$). The Gauss pairing\u2019s formula, now standing on proof.',
        },
        {
          kind: 'formula',
          name: 'Sum of the first n odd numbers',
          latex: '1 + 3 + \\cdots + (2n - 1) = n^2',
          note: 'Proved by induction; the step is the identity $k^2 + (2k+1) = (k+1)^2$ — each odd count of counters wraps the previous square (the gnomon).',
        },
        {
          kind: 'formula',
          name: 'The geometric sum of the powers of two',
          latex: '1 + 2 + 4 + \\cdots + 2^{n-1} = 2^n - 1',
          note: 'Proved by induction; the step is $2(2^k - 1) + 1 = 2^{k+1} - 1$. Runs chapter 3\u2019s base conversions; at $n = 64$ it reaches $18446744073709551615$.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Induction is the named technique of every proof-oriented paper: CBSE and ISC class 11–12 mathematics reserve full questions for it (the sum formulas and divisibility forms of this lesson are the standard bank); olympiad preprocesses (NTSE, PRMO) expect the two-condition discipline; university bridge courses and interview panels use "prove by induction" as the fastest test of mathematical maturity. The exam-gradeable skills are exactly this lesson\u2019s: state both conditions, write the step as a self-contained implication, and know the failure modes — an examiner\u2019s favourite trap is precisely the valid-step-false-base construction you dissected above.',
        },
        {
          kind: 'para',
          text: 'You now own the licence that makes "and so on" provable: one verified start, one universal step, and every natural number is covered. One instrument remains missing from the ground floor — the *definition* side of the same idea. Next lesson builds recursion (operations *defined* by their behaviour at $1$ and their step — where addition finally earns its plus sign), meets induction\u2019s stronger cousin, and proves the least-number principle: the twin fact that every non-empty collection of natural numbers has a least member. That twin, not the dominoes, is the engine chapter 2 will burn to forge the division algorithm.',
        },
      ],
    },
  ],
}
