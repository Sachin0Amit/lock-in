import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — Chapter 4: Inequalities: the Classical Engine
 *
 * THE PARALLEL-SWARM RUN (owner chat directive 2026-11-18: "launch multiple
 * agents for authoring lessons"): the whole unit authored in ONE pass by six
 * parallel authoring agents + one review agent, with the orchestrator doing
 * research (the m2-06 Drive download, the five vision transcription bands),
 * the master plan (docs/research/AA_CH04_MASTER_PLAN.md), this assembly and
 * the gates. The one-unit-at-a-time cadence is honored exactly — ONE chapter
 * opened and closed whole; no second chapter was touched. Every engine
 * section of scripts/verify-book4-ch04.ts (A–N) grew green inside its agent
 * BEFORE that lesson's prose was declared done; section Z is the assembler's
 * census of the shipped file.
 *
 * LESSONS WRITTEN: 4.1 "The Arithmetic-Geometric Mean Inequality" (agent 2-a —
 *                 A≥G≥H each proved from a square that cannot be negative,
 *                 the equality discipline, the doubling ladder with the
 *                 general-n certificate honestly deferred to ch. 7, GM-HM,
 *                 the fixed-sum/fixed-product discipline; engines A/B
 *                 137+58 green pre-prose, the engines caught 3 real drafting
 *                 errors; quiz keys [0, 2, 1, 0, 1]; 15 exercises L1–L6
 *                 2/2/3/3/3/2; 2 figures (the mean neighbourhood + the
 *                 fixed-sum/fixed-product machine); the m2-06 "Weighted
 *                 Means" example-family fold served by two Illustrations +
 *                 the m4-01 "Real Number System and Inequalities"
 *                 review-page fold named in prose) · 4.2 "The Weighted AM-GM
 *                 and Its Consequences" (agent 2-b — weights by replication,
 *                 the power-mean ladder M_r with M_0 read honestly as the
 *                 limit, the normalization craft; engines C/D 139+37; quiz
 *                 keys [0, 3, 0, 1, 2]; 4 derivations; 2 figures (the
 *                 replication list + the ladder); 15 exercises) · 4.3
 *                 "Cauchy-Schwarz and Engel's Form" (agent 2-c — the
 *                 AL 9.3 discriminant discipline one storey higher, the
 *                 equality discipline, Engel/Titu as the fraction-sum speed
 *                 tool, Nesbitt's chain; engines E/F 121+30; quiz keys
 *                 [1, 0, 3, 2, 0]; 2 figures (the never-negative quadratic +
 *                 the Engel machine); 15 exercises) · 4.4 "The Rearrangement
 *                 and Chebyshev Inequalities" (agent 2-d — the exchange
 *                 argument, the pairing census brute-forced, Chebyshev via
 *                 the cyclic table; engines G/H 299+39; quiz keys
 *                 [2, 0, 1, 1, 0]; 2 figures (the swap certificate + the
 *                 pairing bars); 15 exercises) · 4.5 "Jensen's Inequality and
 *                 Convexity" (agent 2-e — convexity without calculus, the
 *                 x² certificate, the doubling ladder, the concave flip with
 *                 the sine-cap witness, the QM–AM reunion, the AM-GM-from-
 *                 Jensen door named for ch. 9; engines I/J 190+32; quiz keys
 *                 [1, 2, 1, 2, 1]; 2 figures (the chord-above-curve plate +
 *                 the sine-cap centroid); 15 exercises) · 4.6 "Absolute Value
 *                 at Depth: the Triangle Inequality" (agent 2-f — the |f|<g /
 *                 |f|>g verdict discipline, the triangle inequality proved by
 *                 squaring, the reverse form, the detour tax, the Cauchy
 *                 bridge; engines K/L 128+50; quiz keys [0, 2, 3, 3, 1]; 2
 *                 figures (the same/opposite-direction plate + the detour
 *                 tax); 15 exercises) · 4.R "Unit 4 Completion Review" (agent
 *                 2-g — the six engines in one room on the 3.R precedent:
 *                 the engine map, the two master tables, the witnesses
 *                 re-audited, the consolidated laws, the traps, the
 *                 15-question mixed bench; engines M/N 141+60; quiz keys
 *                 [2, 0, 1, 3, 1]; the m4-01 fold carried — named, derived
 *                 and exercised by the L3 order-ground bench item).
 */


/** 4.1 — authored 2026-11-18 by the parallel swarm (owner chat directive:
 *  "launch multiple agents for authoring lessons"); engine sections A/B
 *  grown green in v4-1.ts before this prose was declared done (A = 137
 *  checks recomputing every mean, certificate, exhibit and answer below on
 *  exact integer grids — the engines caught three real drafting slips: the
 *  n-roster harmonic mean of (1,4,4,16) written 64/21 instead of the honest
 *  64/25, a stray brace closing the ladder Illustration's steps array, and
 *  the roster decimal 256/85 written ≈ 3.06 instead of ≈ 3.01 — all fixed
 *  and pinned); quiz keys [0, 2, 1, 0, 1]; 15 exercises L1–L6 =
 *  2/2/3/3/3/2 with the Cengage exam typology at L4–L6 (Single Correct /
 *  Multiple Correct / Linked Comprehension / Numerical Value, all labelled
 *  exam-style); 2 original SVG figures (the mean neighbourhood number
 *  line; the fixed-sum product curve) on the vivid palette only; 9
 *  Illustrations incl. the two weighted-means fold examples (the m2-06
 *  example-family fold) and the m4-01 review-page fold named in prose; 4
 *  derivations; 5 formula cards; 8 equations \tag 1–8; 7,477 honest words
 *  by countLessonWords (pinned by engine check B47). */
 const lesson41: Lesson = {
  id: 'aa-the-arithmetic-geometric-mean-inequality',
  number: '4.1',
  title: 'The Arithmetic-Geometric Mean Inequality',
  concepts: [
    'arithmetic, geometric and harmonic means',
    'the AM-GM order A ≥ G ≥ H',
    'the square certificate and the equality discipline',
    'the doubling ladder to powers of two',
    'the fixed-sum and fixed-product discipline',
    'the mean neighbourhood and the QM named forward',
    'weighted means teaser',
  ],
  objectives: [
    'Define the three simple means of two positive numbers, compute each on demand, and sit all three inside the mean neighbourhood between the pair\u2019s endpoints.',
    'Prove $A \\geq G \\geq H$ from squares that cannot be negative — the $(\\sqrt{a} - \\sqrt{b})^2/2$ certificate and the reciprocal route — and state the equality case as a certificate, never as a slogan.',
    'Run the doubling ladder from two numbers to every power of two, tracking the equality discipline storey by storey, and name the general-$n$ certificate honestly as chapter 7\u2019s induction promise.',
    'Price fixed-sum maxima and fixed-product minima with no vertex form at all — the fencing discipline AA 2.1 priced by completing the square, here priced by order alone.',
    'Hunt minima of the $x + c/x$ family and prove small pairing inequalities at exam speed, always testing whether the equality case survives the constraints.',
    'Read a weighted mean (weights summing to one) and witness the weighted chain $A_w \\geq G_w \\geq H_w$ — the teaser whose full engine is lesson 4.2.',
  ],
  prerequisites: ['al-solving-linear-inequalities', 'al-compound-inequalities-and-applications', 'aa-vertex-form-at-work-maxima-and-minima'],
  sources: ['cengage-m2-06', 'cengage-jee-style', 'ncert-math11-ch5-linear-inequalities', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Advanced Algebra 2.1, "Vertex Form at Work: Maxima and Minima", priced its maxima one way: complete the square, read the vertex, done — a method that works precisely because the object was a parabola. Elementary Algebra 7.2 and 7.3 settled order on the line — how to solve a linear inequality, how to intersect and union compound ones — but the objects there were linear. Between those two banked disciplines sits a class of questions neither can touch: the least value of $x + \\dfrac{36}{x}$ (no vertex exists to complete), the greatest product of two numbers whose sum is fixed at 10, the greatest area a fixed fence can enclose. These are symmetric questions, and their answers all have one shape: split equally. This chapter builds the classical engine that prices every one of them without a single square being completed, and the engine\u2019s first gear is this lesson.' },
    { kind: 'para', text: 'The gear is a family of averages. Given two positive numbers $a$ and $b$, mathematics keeps three classical averages of them — the arithmetic mean $A = \\dfrac{a+b}{2}$ (split the sum), the geometric mean $G = \\sqrt{ab}$ (root the product) and the harmonic mean $H = \\dfrac{2ab}{a+b}$ (average the reciprocals, then reciprocate back) — and the whole lesson is one discipline: prove, from squares that cannot be negative, that these three numbers always line up as $A \\geq G \\geq H$, with equality exactly when the two numbers coincide. Every verdict below rides the real number system\u2019s order — the trichotomy and sign discipline of the ordered field that the survey\u2019s Real Number System and Inequalities line names — which is why positivity, not cleverness, is the load-bearing hypothesis of the entire engine. The route: define the three means and watch them on a number line; prove the order twice over; make the equality case a certificate rather than a slogan; climb from two numbers to every power of two by the doubling ladder; cash the discipline where examinations price it — fixed sums and fixed products; and open the door on weighted means, the engine lesson 4.2 builds in full.' },

    { kind: 'heading', text: 'The Three Means of a Pair' },
    { kind: 'para', text: 'Why should one pair carry three averages? Because "average" is a verb before it is a number, and the verb can act on different currencies. If the pair\u2019s currency is addition — two bank balances pooled, two queues merged — fairness splits the sum: that is the arithmetic mean. If the currency is multiplication — two successive growth factors compounding — fairness roots the product: two growth factors of 2 and 8 do not average to 5, because compounding them gives $2 \\times 8 = 16 = 4^2$; the honest average factor is the geometric mean 4. If the currency is a rate — speed over equal distances, where the fair split must be taken on time, not distance — the average of 12 and 36 kilometres per hour over equal distances is 18, not 24: the arithmetic mean of the speeds prices the wrong share. Three currencies, three means, one pair.' },
    { kind: 'callout', tone: 'definition', title: 'The three simple means', text: 'The SIMPLE MEANS of two positive numbers $a$ and $b$ are said to be the ARITHMETIC mean $A = \\dfrac{a+b}{2}$, the GEOMETRIC mean $G = \\sqrt{ab}$ and the HARMONIC mean $H = \\dfrac{2ab}{a+b}$ — the sum-split, the product-root and the reciprocal-average readings of one pair. Thus, for the pair $(2, 8)$: $A = 5$, $G = 4$ and $H = \\tfrac{16}{5} = 3.2$ — three honest averages of the same two numbers, each answering a different question.' },
    { kind: 'equation', latex: 'A = \\dfrac{a+b}{2}, \\qquad G = \\sqrt{ab}, \\qquad H = \\dfrac{2ab}{a+b} \\tag{1}', note: 'the three simple means of a positive pair — the sum-split, the product-root, the reciprocal-average.' },
    { kind: 'para', text: 'For example, on a small roster:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the pair $(2, 8)$: $A = 5$, $G = 4$, $H = \\tfrac{16}{5} = 3.2$;',
      '(ii) the pair $(3, 12)$: $A = \\dfrac{15}{2}$, $G = 6$, $H = \\dfrac{24}{5} = 4.8$;',
      '(iii) the pair $(1, 9)$: $A = 5$, $G = 3$, $H = \\dfrac{9}{5} = 1.8$;',
      '(iv) the pair $(5, 5)$: $A = G = H = 5$ — the coincident case, planted now and priced all lesson long.',
    ] },
    { kind: 'figure', caption: 'The mean neighbourhood of the pair (2, 8): the number line carries the pair (orange) and its three means (green) — H = 3.2, G = 4, A = 5 — each strictly between the pair\u2019s endpoints, ordered H ≤ G ≤ A. The brackets price the gaps G − H = 0.8 and A − G = 1, and the bottom line exhibits the certificate: A − G = (√8 − √2)²/2 = 1 — the gap is half a square. At the equal pair (5, 5) all three means would collapse onto one point.', svg: meanNeighbourhoodSvg() },
    { kind: 'table', caption: 'The mean neighbourhood of the pair (2, 8), every value recomputed by the engines before this prose was written. The root-mean-square QM is named forward for lesson 4.2\u2019s power-mean ladder — the neighbourhood\u2019s fourth and highest member, included so the census is complete.', head: ['Member', 'Formula', 'At the pair (2, 8)', 'Read'], rows: [
      ['harmonic mean $H$', '$H = \\dfrac{2ab}{a+b}$', '$\\dfrac{16}{5} = 3.2$', 'the reciprocal average — the floor of the neighbourhood'],
      ['geometric mean $G$', '$G = \\sqrt{ab}$', '$4$', 'the product root — the compounding-fair average'],
      ['arithmetic mean $A$', '$A = \\dfrac{a+b}{2}$', '$5$', 'the sum split — the pooling-fair average'],
      ['root-mean-square $Q$ (forward)', '$Q = \\sqrt{\\dfrac{a^2+b^2}{2}}$', '$\\sqrt{34} \\approx 5.83$', 'the mean of energies — 4.2\u2019s power-mean ladder at $r = 2$'],
    ] },
    { kind: 'para', text: 'Two facts about the neighbourhood, both swept by the engines before a word of this prose was fixed. First, every member sits BETWEEN the pair\u2019s endpoints: for positive $a \\leq b$ one always has $a \\leq H \\leq G \\leq A \\leq Q \\leq b$ — an average never invents a value the pair does not already span. Second, the order is strict whenever the two numbers differ, and collapses to equality only at the coincident pair — which is the entire subject of the next two sections, proved rather than asserted. The $Q$ row is a forward declaration: the power-mean ladder $M_r$, monotone in $r$ — with $M_2 = Q$ here, $M_1 = A$, $M_0$ read honestly as the limit case $G$, and $M_{-1} = H$ — is lesson 4.2\u2019s ground, named now so the neighbourhood knows its full membership.' },
    { kind: 'callout', tone: 'warn', title: 'Positivity is load-bearing', text: 'The means live on positive numbers, and the hypothesis is not decoration. For the pair $(-4, 9)$ the arithmetic mean is a comfortable $2.5$, but the geometric mean $\\sqrt{-36}$ is not a real number at all — the product of a negative and a positive has no real square root, and the harmonic mean is in no better state. Every proof below runs on squares of square roots, $\\sqrt{a}$ and $\\sqrt{b}$, which exist as reals exactly because $a$ and $b$ are positive. Dropping the positivity hypothesis quietly is the first classic fraud; inverting the chain and writing $G \\geq A$ is the second — witness $(1, 9)$: $G = 3 \\leq 5 = A$. The chain points DOWN from $A$, always.' },
    { kind: 'example', title: 'For the pair (12, 48), compute the three means, verify the order, and exhibit the certificate A − G = (√a − √b)²/2 as an exact number', steps: [
      'The means: $A = \\dfrac{12 + 48}{2} = 30$, $G = \\sqrt{576} = 24$ and $H = \\dfrac{2 \\cdot 12 \\cdot 48}{60} = \\dfrac{1152}{60} = \\dfrac{96}{5} = 19.2$.',
      'The order: $30 \\geq 24 \\geq 19.2$ — arithmetic on top, geometric in the middle, harmonic at the floor, each gap strict because $12 \\neq 48$.',
      'The certificate: $A - G = 30 - 24 = 6$, while $(\\sqrt{48} - \\sqrt{12})^2 = 48 + 12 - 2\\sqrt{576} = 60 - 48 = 12$, and half of it is exactly $6$.',
      'Hence, $A - G = \\dfrac{(\\sqrt{48} - \\sqrt{12})^2}{2} = 6$ — the arithmetic–geometric gap is half a perfect square, which is the proof of the order itself, next section.',
    ] },

    { kind: 'heading', text: 'The Order, Proved from a Square That Cannot Be Negative' },
    { kind: 'para', text: 'The claim $A \\geq G \\geq H$ is not folklore to be memorised; it is two computations, each of which manufactures a perfect square and then reads the square\u2019s sign. The first computation prices $A - G$; the second prices $G - H$ by the cleanest trick in the subject — applying the first result to the pair of reciprocals.' },
    { kind: 'derivation', title: 'A ≥ G: the square certificate', statement: 'For positive $a$ and $b$: the arithmetic mean is at least the geometric mean, with equality exactly when the two numbers coincide.', steps: [
      { label: 'Set up the difference', formula: 'A - G = \\dfrac{a+b}{2} - \\sqrt{ab}', explanation: 'Both means on one line — the claim $A \\geq G$ is exactly the claim that this difference is never negative, so the difference itself is the object to compute.' },
      { label: 'Clear the halves', formula: '2(A - G) = a + b - 2\\sqrt{ab}', explanation: 'Multiply by 2, an order-preserving move; the target is now the middle expression, and no division sign survives to cause trouble.' },
      { label: 'Recognise the square', formula: 'a + b - 2\\sqrt{ab} = (\\sqrt{a} - \\sqrt{b})^2', explanation: 'The two-square expansion $(\\sqrt{a} - \\sqrt{b})^2 = a + b - 2\\sqrt{ab}$ — the mixed term $2\\sqrt{ab}$ is exactly what the difference carries; positivity is what makes both square roots honest reals here.' },
      { label: 'Read the sign', formula: '(\\sqrt{a} - \\sqrt{b})^2 \\geq 0, \\quad = 0 \\iff a = b', explanation: 'A real square is never negative, and it vanishes exactly when its base does; $\\sqrt{a} = \\sqrt{b}$ forces $a = b$ on positives, so the certificate dies only at the coincident pair.' },
    ], result: '$A - G = \\dfrac{(\\sqrt{a} - \\sqrt{b})^2}{2} \\geq 0,$ $\\qquad$ $A = G \\iff a = b$' },
    { kind: 'equation', latex: 'A - G = \\dfrac{(\\sqrt{a} - \\sqrt{b})^2}{2} \\geq 0 \\tag{2}', note: 'the arithmetic–geometric gap is half a square — the entire two-number theory in one line.' },
    { kind: 'example', title: 'Prove that for positive x and y: (x + y)(1/x + 1/y) ≥ 4, and state the equality case', steps: [
      'Expand the product: $(x + y)\\left(\\dfrac{1}{x} + \\dfrac{1}{y}\\right) = 1 + \\dfrac{x}{y} + \\dfrac{y}{x} + 1 = 2 + \\dfrac{x}{y} + \\dfrac{y}{x}$.',
      'Now, apply $A \\geq G$ to the pair $\\left(\\dfrac{x}{y}, \\dfrac{y}{x}\\right)$ — a positive pair whose product is 1: $\\dfrac{x}{y} + \\dfrac{y}{x} \\geq 2\\sqrt{\\dfrac{x}{y} \\cdot \\dfrac{y}{x}} = 2$.',
      'So the original expression is at least $2 + 2 = 4$, with equality exactly when $\\dfrac{x}{y} = \\dfrac{y}{x}$, that is $x = y$ — the certificate dying at the coincident pair.',
      'Check the gap on a witness: at $(x, y) = (3, 4)$ the expression is $2 + \\dfrac{3}{4} + \\dfrac{4}{3} = 2 + \\dfrac{25}{12} = \\dfrac{49}{12} \\approx 4.08$ — above 4, strict as promised.',
      'Hence, $(x + y)\\left(\\dfrac{1}{x} + \\dfrac{1}{y}\\right) \\geq 4$ for all positive $x, y$, equality iff $x = y$ — a sum times a reciprocal-sum can never dip below 4.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The mean chain, with its equality case', text: 'For positive $a$ and $b$: $A \\geq G \\geq H$, and all three means coincide exactly when $a = b$. The two gaps are $A - G = \\dfrac{(\\sqrt{a} - \\sqrt{b})^2}{2}$ and $G - H = \\dfrac{\\sqrt{ab}}{a+b}(\\sqrt{a} - \\sqrt{b})^2$ — the SAME square appearing twice, scaled differently. Equality throughout is certified by $(\\sqrt{a} - \\sqrt{b})^2 = 0$, nothing less.' },
    { kind: 'equation', latex: 'A \\geq G \\geq H, \\qquad \\text{equality throughout} \\iff a = b \\tag{3}', note: 'the chain proved below at both links; the equality case is a certificate, not a slogan.' },
    { kind: 'derivation', title: 'G ≥ H: the reciprocal route', statement: 'For positive $a$ and $b$: the geometric mean is at least the harmonic mean — proved by feeding the pair\u2019s reciprocals to the arithmetic–geometric result just proved.', steps: [
      { label: 'Reciprocate the pair', formula: '\\dfrac{1}{a}, \\ \\dfrac{1}{b}', explanation: 'The reciprocals of positives are positive, so the whole two-number theory applies to them — this single observation is the trick.' },
      { label: 'Their arithmetic mean', formula: 'A\\!\\left(\\dfrac{1}{a}, \\dfrac{1}{b}\\right) = \\dfrac{1/a + 1/b}{2} = \\dfrac{a + b}{2ab} = \\dfrac{1}{H(a, b)}', explanation: 'The sum of the reciprocals, halved, is exactly one over the harmonic mean — the harmonic mean of a pair IS the reciprocal of the arithmetic mean of the reciprocals.' },
      { label: 'Their geometric mean', formula: 'G\\!\\left(\\dfrac{1}{a}, \\dfrac{1}{b}\\right) = \\sqrt{\\dfrac{1}{ab}} = \\dfrac{1}{G(a, b)}', explanation: 'Likewise the geometric mean of the reciprocals is one over the geometric mean — the mirror symmetry of the two readings.' },
      { label: 'Apply A ≥ G to the reciprocal pair', formula: '\\dfrac{1}{H(a,b)} \\geq \\dfrac{1}{G(a,b)}', explanation: 'The result of the previous derivation, applied to the fresh positive pair $\\left(\\dfrac{1}{a}, \\dfrac{1}{b}\\right)$ — mathematics reuses its own engine.' },
      { label: 'Flip the order', formula: 'H(a, b) \\leq G(a, b)', explanation: 'For positive numbers, $x \\geq y > 0$ forces $\\dfrac{1}{x} \\leq \\dfrac{1}{y}$ (multiply $\\dfrac{1}{x} \\geq \\dfrac{1}{y}$ by the positive $xy$ to recover $y \\geq x$). Equality rides through: the reciprocal pair coincides exactly when the original does.' },
    ], result: '$G \\geq H \\quad \\text{with equality} \\iff a = b$ — the harmonic mean is the reciprocal arithmetic mean' },
    { kind: 'equation', latex: 'H(a,b) = \\dfrac{1}{A\\left(\\tfrac{1}{a}, \\tfrac{1}{b}\\right)}, \\qquad G(a,b) = \\dfrac{1}{G\\left(\\tfrac{1}{a}, \\tfrac{1}{b}\\right)} \\tag{4}', note: 'the mirror identities: every harmonic question is an arithmetic question on the reciprocals.' },
    { kind: 'formula', name: 'The mean chain', latex: 'A = \\dfrac{a+b}{2}, \\quad G = \\sqrt{ab}, \\quad H = \\dfrac{2ab}{a+b}; \\qquad A \\geq G \\geq H \\ (a, b > 0)', note: 'equality throughout iff a = b; the chain is the lesson — every later engine calls one of its three links.' },
    { kind: 'callout', tone: 'insight', title: 'Every order in this lesson is a square in disguise', text: 'Look back at the two gaps: $A - G = \\dfrac{(\sqrt{a} - \sqrt{b})^2}{2}$ and $G - H = \\dfrac{\sqrt{ab}}{a+b}(\sqrt{a} - \sqrt{b})^2$. The SAME square $(\sqrt{a} - \sqrt{b})^2$ prices both links, scaled by $1/2$ and by $\\dfrac{\sqrt{ab}}{a+b}$ respectively — the order of the means is one square wearing two coats. This is the honest answer to "why is it true": no cleverness, no picture even, just a quantity that cannot be negative. When chapter 7\u2019s induction generalises the statement, it is this square that keeps being the engine at every floor.' },
    { kind: 'example', title: 'Price the gaps: for the pairs (2, 8), (4, 16) and (8, 32), compute A − G and G − H, and show what stays fixed and what scales', steps: [
      'The means of $(2, 8)$: $A = 5$, $G = 4$, $H = 3.2$; so $A - G = 1$ and $G - H = 0.8$.',
      'The means of $(4, 16)$: $A = 10$, $G = 8$, $H = 6.4$; so $A - G = 2$ and $G - H = 1.6$ — each gap has doubled.',
      'The means of $(8, 32)$: $A = 20$, $G = 16$, $H = 12.8$; so $A - G = 4$ and $G - H = 3.2$ — doubled again.',
      'Now, the ratios stay fixed across all three pairs: $A/G = 5/4$ and $G/H = 5/4$ throughout — scaling a pair by $\\lambda$ scales all three means by $\\lambda$ (so the gaps scale linearly) while leaving every ratio untouched.',
      'Hence, the equal ratio $1.25$ is the signature of the $1{:}4$ shape, and the coincident pair $(5, 5)$ is the only place the gaps vanish: there $A = G = H = 5$ exactly.',
    ] },

    { kind: 'heading', text: 'The Equality Discipline' },
    { kind: 'para', text: 'The most-priced fraud in this subject is not the direction of the inequality — it is the unearned equality. A solver writes $x + \\dfrac{c}{x} \\geq 2\\sqrt{c}$, glances at the constraint, and reports $2\\sqrt{c}$ as the minimum without asking whether the constraint lets the two terms ever BE equal. The discipline this book enforces: an equality claim must exhibit its certificate — here, $(\\sqrt{a} - \\sqrt{b})^2 = 0$ — and if the constraint makes the certificate unreachable, the honest minimum sits strictly above the bound. A late Illustration of this lesson prices exactly that trap; the next one prices the clean case.' },
    { kind: 'formula', name: 'The equality certificate', latex: 'A - G = \\dfrac{(\\sqrt{a} - \\sqrt{b})^2}{2}, \\qquad A = G \\iff \\sqrt{a} = \\sqrt{b} \\iff a = b', note: 'every claimed equality case must show the square dying; a bound whose equality case is blocked by a constraint is still true — it is just unattainable, and the honest minimum is higher.' },
    { kind: 'example', title: 'Find the least value of x + 36/x for x > 0, the x where it is attained, and cross-check by a second certificate', steps: [
      'The pair $\\left(x, \\dfrac{36}{x}\\right)$ is positive for $x > 0$, and its product is exactly 36 — a fixed product hunting its minimum sum.',
      'Now, $A \\geq G$ on this pair: $\\dfrac{x + 36/x}{2} \\geq \\sqrt{x \\cdot \\dfrac{36}{x}} = 6$, so $x + \\dfrac{36}{x} \\geq 12$.',
      'Check the certificate: equality needs $x = \\dfrac{36}{x}$, that is $x^2 = 36$, so $x = 6$ (the positive root) — an honest, attainable seat inside the constraint $x > 0$.',
      'Cross-check by a second square: $x + \\dfrac{36}{x} - 12 = \\dfrac{x^2 - 12x + 36}{x} = \\dfrac{(x - 6)^2}{x} \\geq 0$ — the same minimum, proved by a literal perfect square over a positive denominator.',
      'Hence, the least value is $12$, attained exactly at $x = 6$ — and no vertex form could even have started here: the curve $x + 36/x$ is no parabola, which is precisely why AA 2.1\u2019s engine is silent and this one speaks.',
    ] },
    { kind: 'equation', latex: 'x + \\dfrac{c}{x} \\geq 2\\sqrt{c} \\qquad (x > 0,\\ c > 0) \\tag{5}', note: 'the reciprocal-pair minimum: equality exactly at $x = \\sqrt{c}$ — the single most-priced exam shape of the whole chapter.' },
    { kind: 'formula', name: 'The reciprocal-pair minimum', latex: 'x + \\dfrac{c}{x} \\geq 2\\sqrt{c} \\quad (x > 0)', note: 'product fixed at c, sum floored at 2√c; equality at x = √c. The general weighted splits (a sum of unequal shares) are lesson 4.2\u2019s engine.' },
    { kind: 'callout', tone: 'warn', title: 'Equality without a certificate is a fraud', text: 'The bound is true even when its equality case is out of reach — but then it is UNATTAINABLE, and reporting it as the minimum is wrong. The test is one question: does the constraint admit the equal split? For $x + 36/x$ on $x > 0$ the answer was yes ($x = 6$ lives inside the constraint). Later in this lesson, a constraint $xy = 4$ will block a naive bound of 4 — the certificate would force $x = 1/x$ AND $y = 1/y$, that is $x = y = 1$, which collides head-on with $xy = 4$ — and the honest minimum will be $25/4$, strictly above. Same engine, different verdict: always run the equality test.' },

    { kind: 'heading', text: 'Beyond Two: the Doubling Ladder' },
    { kind: 'para', text: 'The two-number theory is proved, but examinations ask about three, four, eight numbers. The honest route upward is not a leap of faith — it is a ladder with one rung: if the statement holds for $n$ numbers, it holds for $2n$, because the mean of a doubled list is the mean of the two half-means. Starting from the proved $n = 2$ case and doubling, the statement is certified for $n = 4, 8, 16, \\ldots$ — every power of two. The general-$n$ certificate (including three, five, six, seven) is deferred to chapter 7\u2019s "Mathematical Induction: the Domino Principle", exactly as chapter 5\u2019s "Sigma Notation and the Classical Power Sums" defers the induction certificate of the power-sum formulas: a promise named here and never cashed early.' },
    { kind: 'callout', tone: 'definition', title: 'Simple means of n positive numbers', text: 'For $n$ positive quantities $a_1, a_2, \\ldots, a_n$, the ARITHMETIC, GEOMETRIC and HARMONIC means are said to be $A_n = \\dfrac{a_1 + a_2 + \\cdots + a_n}{n}$, $G_n = \\sqrt[n]{a_1 a_2 \\cdots a_n}$ and $H_n = \\dfrac{n}{\\dfrac{1}{a_1} + \\dfrac{1}{a_2} + \\cdots + \\dfrac{1}{a_n}}$ — the same three currencies, averaged over the whole list. Thus, for the list $(1, 4, 4, 16)$: $A_4 = \\dfrac{25}{4} = 6.25$, $G_4 = \\sqrt[4]{256} = 4$ and $H_4 = \\dfrac{4}{\\frac{25}{16}} = \\dfrac{64}{25} = 2.56$ — the same order, now over four seats.' },
    { kind: 'para', text: 'For example, on a four-seat roster (a ratio-4 climb of its own):' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the list $(1, 4, 16, 64)$: $A_4 = \\dfrac{85}{4} = 21.25$, $G_4 = \\sqrt[4]{4096} = 8$ and $H_4 = \\dfrac{256}{85} \\approx 3.01$ — the order riding a geometric ladder;',
      '(ii) the all-equal list $(3, 3, 3, 3)$: $A_4 = G_4 = H_4 = 3$ — the coincident case, now over four seats;',
      '(iii) the list $(1, 16, 16, 81)$: $A_4 = 28.5$ against $G_4 = \\sqrt[4]{20736} = 12$ — the Illustration below climbs exactly this list storey by storey.',
    ] },
    { kind: 'equation', latex: '\\dfrac{a_1 + a_2 + \\cdots + a_n}{n} \\geq \\sqrt[n]{a_1 a_2 \\cdots a_n} \\tag{6}', note: 'the AM-GM statement for $n$ positive numbers — this lesson certifies it at every power of two; chapter 7\u2019s induction certifies it for every $n$.' },
    { kind: 'callout', tone: 'theorem', title: 'AM-GM at the powers of two — and the honest deferral', text: 'The AM-GM inequality holds for $n = 2$ (proved above from the square certificate) and, by the doubling ladder proved below, for $n = 4, 8, 16, \\ldots$ — every power of two — with equality exactly when all $n$ numbers coincide. For EVERY $n$ the statement is true, but its certificate is the forward–backward induction that chapter 7 builds; this lesson claims only what it proves. The GM-HM link at $n$ numbers follows free of charge: apply the AM-GM statement to the reciprocals $\\dfrac{1}{a_i}$ and flip — exactly the two-number trick, scaled.' },
    { kind: 'derivation', title: 'The doubling ladder: from n to 2n', statement: 'If the AM-GM inequality holds for $n$ positive numbers, then it holds for $2n$ — so, from the proved $n = 2$ case, it holds for every power of two.', steps: [
      { label: 'Split the list in half', formula: 'A_{2n} = \\dfrac{A(\\text{first } n) + A(\\text{last } n)}{2}', explanation: 'The mean of the whole list is the mean of the two half-means: $\\dfrac{\\frac{\\Sigma_1}{n} + \\frac{\\Sigma_2}{n}}{2} = \\dfrac{\\Sigma_1 + \\Sigma_2}{2n}$ — a one-line bookkeeping identity, exact for every list.' },
      { label: 'Apply the n-case to each half', formula: 'A(\\text{first } n) \\geq G(\\text{first } n), \\quad A(\\text{last } n) \\geq G(\\text{last } n)', explanation: 'The induction hypothesis, applied to each half separately — the halves are positive lists of length $n$, so the hypothesis covers them.' },
      { label: 'Apply the 2-case to the two half-means', formula: '\\dfrac{A_1 + A_2}{2} \\geq \\sqrt{A_1 A_2} \\geq \\sqrt{G_1 G_2}', explanation: 'First the two-number case on the two arithmetic means (their mean is at least the root of their product), then a push down: positive numbers ordered $A_i \\geq G_i$ keep their root order, so $\\sqrt{A_1 A_2} \\geq \\sqrt{G_1 G_2}$.' },
      { label: 'Recognise the target', formula: '\\sqrt{G_1 G_2} = \\sqrt[2n]{(a_1 \\cdots a_n)(a_{n+1} \\cdots a_{2n})} = G_{2n}', explanation: 'The product of the two half-products is the full product, and the square root of an $n$-th root is the $2n$-th root — the ladder lands exactly on the geometric mean of the doubled list.' },
      { label: 'The equality discipline propagates', formula: '\\text{equality} \\iff a_1 = a_2 = \\cdots = a_{2n}', explanation: 'Equality needs BOTH storeys tight: each half must be internally equal (the $n$-case certificate) AND the two half-means must coincide (the 2-case certificate) — together they force all $2n$ numbers equal, so the discipline climbs the ladder with the statement.' },
    ], result: '$A_{2n} \\geq G_{2n} \\quad \\text{for } n = 2, 4, 8, 16, \\ldots$ — $\\text{every power of two, equality iff all coincide}$' },
    { kind: 'example', title: 'Climb the ladder on the four numbers 1, 16, 16, 81: compute A₄ and G₄ by both storeys and directly', steps: [
      'Directly: $A_4 = \\dfrac{1 + 16 + 16 + 81}{4} = \\dfrac{114}{4} = 28.5$, and $G_4 = \\sqrt[4]{1 \\cdot 16 \\cdot 16 \\cdot 81} = \\sqrt[4]{20736} = 12$ — the engines check $12^4 = 20736$ exactly.',
      'Storey one, first half $(1, 16)$: $A = \\dfrac{17}{2} = 8.5$ and $G = \\sqrt{16} = 4$; second half $(16, 81)$: $A = \\dfrac{97}{2} = 48.5$ and $G = \\sqrt{1296} = 36$.',
      'Now, storey two: the mean of the half-arithmetic-means is $\\dfrac{8.5 + 48.5}{2} = 28.5$ — the honest $A_4$, recovered by the ladder\u2019s bookkeeping identity.',
      'And the ladder\u2019s geometric step: $\\sqrt{4 \\cdot 36} = \\sqrt{144} = 12$ — the honest $G_4$, recovered through the two-number means of the halves.',
      'Hence, $A_4 = 28.5 \\geq G_4 = 12$ with gap $16.5$, and the doubling ladder reproduced both means exactly — the four-number statement is the two-number one, run twice and once.',
    ] },

    { kind: 'heading', text: 'The Fixed Sum and the Fixed Product' },
    { kind: 'para', text: 'Here is where the engine pays rent. A farmer has 36 metres of fence for a rectangular plot: how much land can be enclosed? AA 2.1 could price a parabola\u2019s peak by vertex form; this question hides a parabola (area against one side), but the mean engine prices the peak with no curve drawn at all — one line of order. The principle is one statement with two readings: split a fixed sum equally and the product is maximal; pair a fixed product equally and the sum is minimal. Fencing questions, packing questions, "greatest value of $xy$ given $x + y$" questions — all one discipline.' },
    { kind: 'derivation', title: 'The fixed-sum maximum and its dual', statement: 'For positive numbers with $a + b = s$ fixed, the product $ab$ is maximal at the equal split, $ab \\leq \\dfrac{s^2}{4}$; dually, for $ab = p$ fixed, the sum is minimal at the equal pair, $a + b \\geq 2\\sqrt{p}$.', steps: [
      { label: 'Name the constraint', formula: 'a + b = s \\ (s > 0 \\text{ fixed}), \\quad a, b > 0', explanation: 'The constraint is one linear equation — the pair is free to slide along it, and the question is where the product peaks along that slide.' },
      { label: 'Invoke the two-number chain', formula: '\\dfrac{s}{2} = \\dfrac{a + b}{2} \\geq \\sqrt{ab}', explanation: 'The arithmetic mean of the constrained pair is pinned at $s/2$ — it cannot move — while the geometric mean never exceeds it: the whole engine, one line.' },
      { label: 'Square the order', formula: 'ab \\leq \\dfrac{s^2}{4}', explanation: 'Both sides are positive, and squaring preserves order there; equality exactly at the certificate $a = b = s/2$ — the equal split, attainable and interior.' },
      { label: 'The dual reading', formula: 'ab = p \\ \\Rightarrow\\ a + b \\geq 2\\sqrt{p}', explanation: 'The same line read the other way: the geometric mean is pinned at $\\sqrt{p}$, and the arithmetic mean cannot fall below it — so the sum is floored at $2\\sqrt{p}$, with equality at the equal pair $\\sqrt{p}, \\sqrt{p}$. The sum is NOT bounded above: as one member shrinks toward 0 the other must grow without limit.' },
    ], result: '$a + b = s \\Rightarrow ab \\leq \\dfrac{s^2}{4};$ $\\qquad$ $ab = p \\Rightarrow a + b \\geq 2\\sqrt{p}$' },
    { kind: 'equation', latex: 'a + b = s \\Rightarrow ab \\leq \\dfrac{s^2}{4}; \\qquad ab = p \\Rightarrow a + b \\geq 2\\sqrt{p} \\tag{7}', note: 'the fixed-sum maximum and the fixed-product minimum — one line of AM-GM read both ways.' },
    { kind: 'example', title: 'Among all rectangles of perimeter 36, find the greatest area, the shape that attains it, and the census of the near misses', steps: [
      'Let the sides be $x$ and $y$ with $x + y = 18$ — the half-perimeter is the fixed sum, and the area $xy$ is its product.',
      'Now, the fixed-sum discipline: $xy \\leq \\left(\\dfrac{x + y}{2}\\right)^2 = 9^2 = 81$, with equality exactly at $x = y = 9$ — a square, attained by an honest interior shape.',
      'The census of near misses: $2 \\times 16$ encloses 32, $4 \\times 14$ encloses 56, $6 \\times 12$ encloses 72, $8 \\times 10$ encloses 80, and the equal split $9 \\times 9$ encloses 81 — each step toward balance buys area.',
      'Hence, the greatest area is $81$ square metres at the $9 \\times 9$ square — and in general a perimeter-$P$ rectangle never exceeds $\\left(\\dfrac{P}{4}\\right)^2$: four equal shares, one fence, priced with no completing of the square.',
    ] },
    { kind: 'figure', caption: 'The fixed-sum discipline as a curve: the product x(10 − x) of the two halves of a fixed sum 10, plotted for 0 < x < 10. The census dots (green) are the splits x = 1, 2, …, 9 — 9, 16, 21, 24, 25, 24, 21, 16, 9 — symmetric partners sharing one product, peaking at the equal split 5 + 5 → 25 (orange). AM-GM prices the peak without drawing any parabola: x(10 − x) ≤ ((x + (10 − x))/2)² = 25; AA 2.1 would have completed the square on the same curve — the mean engine never needs the curve at all.', svg: fixedSumProductSvg() },
    { kind: 'table', caption: 'The fixed-sum census behind the figure: the nine integer splits of the sum 10 and their products — every value recomputed by the engines before this prose was written. The table is symmetric about the equal split, and the product peaks exactly there.', head: ['One side $x$', 'Other side $10 - x$', 'Product $x(10 - x)$'], rows: [
      ['1', '9', '9'],
      ['2', '8', '16'],
      ['3', '7', '21'],
      ['4', '6', '24'],
      ['5', '5', '25'],
      ['6', '4', '24'],
      ['7', '3', '21'],
      ['8', '2', '16'],
      ['9', '1', '9'],
    ] },
    { kind: 'formula', name: 'The fixed-sum and fixed-product pair', latex: 'a + b = s \\Rightarrow ab \\leq \\dfrac{s^2}{4}; \\qquad ab = p \\Rightarrow a + b \\geq 2\\sqrt{p}', note: 'the calculus-free maximum/minimum engine: equal split for the max product, equal pair for the min sum — the vertex-form discipline of AA 2.1 priced by order alone.' },
    { kind: 'example', title: 'Exam-style: for positive x, y with xy = 4, find the least value of (x + 1/x)(y + 1/y) — and expose the naive bound as unattainable', steps: [
      'A naive bound first: each factor is at least 2 (equation 5 with $c = 1$), so the product is at least $4$ — true, but is it attainable?',
      'Check the certificate: equality would need $x = \\dfrac{1}{x}$ AND $y = \\dfrac{1}{y}$, that is $x = y = 1$ — which violates the constraint $xy = 4$. The naive bound is unattainable; the honest minimum lies strictly above it.',
      'Now, expand honestly under the constraint: $(x + \\tfrac{1}{x})(y + \\tfrac{1}{y}) = xy + \\dfrac{1}{xy} + \\dfrac{x}{y} + \\dfrac{y}{x} = 4 + \\dfrac{1}{4} + \\dfrac{x}{y} + \\dfrac{y}{x}$.',
      'So, by AM-GM on the pair $\\left(\\dfrac{x}{y}, \\dfrac{y}{x}\\right)$: $\\dfrac{x}{y} + \\dfrac{y}{x} \\geq 2$, giving the bound $\\dfrac{17}{4} + 2 = \\dfrac{25}{4}$.',
      'Check the certificate again, now for the honest bound: equality needs $\\dfrac{x}{y} = \\dfrac{y}{x}$, that is $x = y$, which with $xy = 4$ forces $x = y = 2$ — an attainable seat, inside the constraint.',
      'Hence, the least value is $\\dfrac{25}{4} = 6.25$, attained at $x = y = 2$ — the naive bound 4 was true but dead, exactly the fraud the equality discipline exists to catch.',
    ] },

    { kind: 'heading', text: 'Weighted Means: the Teaser' },
    { kind: 'para', text: 'Everything so far treated the two numbers as equals — every mean split the pair fifty-fifty. But averages in the wild carry WEIGHTS: a final grade counting theory at two-thirds and lab at one-third; a speed averaged over hours that are not equal fractions of the trip. For weights $w_1, w_2 > 0$ summing to one, the weighted means of values $a_1, a_2$ are $A_w = w_1 a_1 + w_2 a_2$, $G_w = a_1^{w_1} a_2^{w_2}$ and $H_w = \\dfrac{1}{\\dfrac{w_1}{a_1} + \\dfrac{w_2}{a_2}}$ — and the chain survives: $A_w \\geq G_w \\geq H_w$, equality again iff the values coincide. This lesson owes two worked examples of the weighted type (the full engine — weights as repeated entries, rational weights by scaling, the power-mean ladder — is lesson 4.2\u2019s whole business); here are the two teasers, both recomputed by the engines.' },
    { kind: 'equation', latex: 'A_w = w_1 a_1 + w_2 a_2, \\quad G_w = a_1^{w_1} a_2^{w_2}, \\quad H_w = \\dfrac{1}{\\dfrac{w_1}{a_1} + \\dfrac{w_2}{a_2}} \\qquad (w_1 + w_2 = 1) \\tag{8}', note: 'weights summing to one; the weighted chain $A_w \\geq G_w \\geq H_w$ is witnessed here and proved in lesson 4.2.' },
    { kind: 'example', title: 'A weighted mean of two test scores: compute the three weighted means of 64 (weight 2/3) and 8 (weight 1/3), and verify the order', steps: [
      'The weights sum to one: $\\dfrac{2}{3} + \\dfrac{1}{3} = 1$ — the setup is honest, and the two scores are positive.',
      'The weighted arithmetic mean: $A_w = \\dfrac{2}{3} \\cdot 64 + \\dfrac{1}{3} \\cdot 8 = \\dfrac{128 + 8}{3} = \\dfrac{136}{3} \\approx 45.33$ — the course grade the registrar would record.',
      'The weighted geometric mean: $G_w = 64^{2/3} \\cdot 8^{1/3} = (64^2 \\cdot 8)^{1/3} = (4096 \\cdot 8)^{1/3} = 32768^{1/3} = 32$ — the engines check $32^3 = 32768$ exactly.',
      'The weighted harmonic mean: $H_w = \\dfrac{1}{\\dfrac{2/3}{64} + \\dfrac{1/3}{8}} = \\dfrac{1}{\\dfrac{1}{96} + \\dfrac{1}{24}} = \\dfrac{1}{\\dfrac{5}{96}} = \\dfrac{96}{5} = 19.2$.',
      'Hence, $\\dfrac{136}{3} \\geq 32 \\geq \\dfrac{96}{5}$ — the weighted chain $A_w \\geq G_w \\geq H_w$ witnessed exactly, with equality nowhere because the scores 64 and 8 differ; the full weighted engine is lesson 4.2\u2019s to prove.',
    ] },
    { kind: 'example', title: 'A weighted average of speeds: show the average speed of the 12-and-36 ride is the harmonic mean, and that it equals the time-weighted arithmetic mean', steps: [
      'Setup: a cyclist covers the SAME distance uphill at 12 km/h and downhill at 36 km/h — equal distances, unequal times, the classic rate currency.',
      'The average speed over the whole ride: the total distance is $2d$ over the total time $\\dfrac{d}{12} + \\dfrac{d}{36} = \\dfrac{3d + d}{36} = \\dfrac{4d}{36}$, so the average is $\\dfrac{2d}{4d/36} = 18$ km/h — which is exactly $H(12, 36) = \\dfrac{2 \\cdot 12 \\cdot 36}{48} = 18$.',
      'Now, the time weights: the uphill leg runs $\\dfrac{d/12}{d/12 + d/36} = \\dfrac{3}{4}$ of the total time, the downhill leg $\\dfrac{1}{4}$ — weights $\\left(\\dfrac{3}{4}, \\dfrac{1}{4}\\right)$ summing to one, carried BY TIME, not by distance.',
      'The time-weighted arithmetic mean of the speeds: $\\dfrac{3}{4} \\cdot 12 + \\dfrac{1}{4} \\cdot 36 = 9 + 9 = 18$ — the same number, and the identity is no accident: over equal distances the harmonic mean IS the time-weighted arithmetic mean.',
      'Hence, 18 km/h — the harmonic mean prices the equal-DISTANCE question, and it does so by being an arithmetic mean of the speeds with honest time weights: the "disguise" is the whole reason harmonic means answer rate questions.',
    ] },
    { kind: 'formula', name: 'Weighted means (the teaser card)', latex: 'A_w = w_1 a_1 + w_2 a_2, \\quad G_w = a_1^{w_1} a_2^{w_2}, \\quad H_w = \\dfrac{1}{\\dfrac{w_1}{a_1} + \\dfrac{w_2}{a_2}} \\quad (w_1 + w_2 = 1)', note: 'the doorway to lesson 4.2\u2019s weighted AM-GM engine; this lesson\u2019s two teasers witness the chain, 4.2 proves it for whole-number, rational and (honestly noted) real weights.' },
    { kind: 'callout', tone: 'insight', title: 'The harmonic mean is a weighted mean in disguise', text: 'The second teaser\u2019s punchline generalises: over equal distances, the harmonic mean of two speeds is exactly the arithmetic mean weighted by the time each speed actually runs — weight $\\dfrac{v_2}{v_1 + v_2}$ on the slower leg. A "special" mean collapses into an ordinary one the moment the weights are read honestly. Lesson 4.2 builds this into the full weighted engine; the rate questions of every competitive paper are its steady customers.' },

    { kind: 'heading', text: 'Where the Engine Sits' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'JEE Main 2026\u2019s unit list carries no separate inequalities unit — mean-inequality items ride the ALGEBRA bank, exactly as the syllabus audit recorded: the least-value single-correct items on $x + c/x$ shapes, the fixed-sum fencing and packing items, the "greatest value under a constraint" family, and the multiple-correct chain checks are all algebra-bank residents, and Khattar-style aptitude papers price the same discipline numerically. NCERT class 11 chapter 5 "Linear Inequalities" carries the school-level order ground (the prerequisites\u2019 own turf); the mean engine is the competitive step above it, and the undergraduate meets it again as the first inequality of real analysis. Every item in this lesson is exam-style — our own designs, labelled honestly, never lifted from any paper.' },
    { kind: 'callout', tone: 'historical', title: 'Cauchy 1821: the ladder has a name', text: 'The ladder this lesson climbed — prove two, double to four, double again — looks obvious in hindsight; it is a named piece of history. Augustin-Louis Cauchy proved the AM-GM inequality for every $n$ in his 1821 Cours d\u2019analyse, the Paris textbook that made rigour routine, by exactly this induction: forward by doubling, then backward by trimming one entry at a time until every count is reached. Chapter 7 of this book rebuilds the full forward–backward certificate as its own lesson; this lesson honestly owns only the forward half — but it is the half Cauchy would recognise at a glance.' },
    { kind: 'para', text: 'What waits ahead, in order. Lesson 4.2, "The Weighted AM-GM and Its Consequences", builds the full weighted engine the two teasers opened — weights as repeated entries, the normalisation trick that turns a product constraint into a fixed sum, and the power-mean ladder whose $r = 2$ rung was forward-named in the neighbourhood table. Lesson 4.3 brings Cauchy–Schwarz with Engel\u2019s form; lessons 4.4 and 4.5 add rearrangement and Jensen; lesson 4.6 turns absolute value into a bound machine. Farther out, chapter 5 "Sequences and Series" plants means BETWEEN numbers (the arithmetic and geometric inserts of progressions), and chapter 7 "Mathematical Induction: the Domino Principle" cashes the general-$n$ certificate this lesson deferred — the same dominoes that certify the power sums. The certificate $(\\sqrt{a} - \\sqrt{b})^2 = 0$ rides with you through all of it.' },

    { kind: 'terms', items: [
      { term: 'Arithmetic mean of a pair', def: 'the sum-split average $A = (a+b)/2$ of two positive numbers — the pooling-fair reading; the top of the mean neighbourhood.' },
      { term: 'Geometric mean of a pair', def: 'the product-root average $G = \\sqrt{ab}$ — the compounding-fair reading; it sits between the harmonic and arithmetic means and equals both only at the coincident pair.' },
      { term: 'Harmonic mean of a pair', def: 'the reciprocal average $H = 2ab/(a+b)$: the reciprocal of the arithmetic mean of the reciprocals — the rate-fair reading, and the floor of the neighbourhood.' },
      { term: 'AM-GM inequality (two numbers)', def: '$A \\geq G$ for positives, with the gap certified by $A - G = (\sqrt{a} - \sqrt{b})^2/2 \\geq 0$ — a square that cannot be negative; equality exactly when the numbers coincide.' },
      { term: 'Equality certificate', def: 'the discipline that a claimed equality case must exhibit $(\sqrt{a} - \sqrt{b})^2 = 0$ (or its n-number analogue) — and that a bound whose equality case is blocked by a constraint is unattainable, its honest minimum strictly higher.' },
      { term: 'Doubling ladder', def: 'the propagation "AM-GM at $n$ numbers implies AM-GM at $2n$" — from the proved two-number case it certifies every power of two; the general-$n$ certificate is chapter 7\u2019s induction promise.' },
      { term: 'Mean neighbourhood', def: 'the ordered family of averages of one positive pair — $H \\leq G \\leq A \\leq Q$ (the root-mean-square forward-named for 4.2) — every member between the pair\u2019s endpoints, all collapsing to one point at the coincident pair.' },
      { term: 'Fixed-sum maximum (the equal-split principle)', def: 'given $a + b = s$, the product $ab \\leq s^2/4$ with equality at the equal split — the fencing discipline, priced by AM-GM with no vertex form.' },
      { term: 'Weighted mean', def: 'an average carrying weights $w_1, w_2 > 0$ that sum to one: $A_w = w_1 a_1 + w_2 a_2$, $G_w = a_1^{w_1} a_2^{w_2}$, $H_w$ the reciprocal form — the chain $A_w \\geq G_w \\geq H_w$ survives; the full engine is lesson 4.2.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: the arithmetic-geometric mean inequality', items: [
      { q: 'For the pair $(4, 16)$, the three means are:', options: ['$A = 10$, $G = 8$, $H = 6.4$', '$A = 10$, $G = 8$, $H = 8$', '$A = 20$, $G = 8$, $H = 6.4$', '$A = 10$, $G = 4$, $H = 6.4$'], answer: 0, explain: 'Squares and sums first: $A = \\frac{4+16}{2} = 10$, $G = \\sqrt{64} = 8$, $H = \\frac{2 \\cdot 64}{20} = 6.4$ (option A). Option B is the "G = H" fraud — on distinct positives the gap is $G - H = \\frac{\\sqrt{ab}}{a+b}(\sqrt{a}-\sqrt{b})^2 > 0$, here $8 - 6.4 = 1.6$. Option C\u2019s $A = 20$ is the raw SUM $4 + 16$ reported as a mean — the halving was skipped. Option D\u2019s $G = 4$ reports the smaller entry itself as the geometric mean; a mean of distinct positives must sit strictly between them.' },
      { q: 'The equality $A = G = H$ holds for a positive pair $(a, b)$ exactly when:', options: ['$ab = 1$', '$a + b$ is a perfect square', '$a = b$', 'nothing more than positivity — every positive pair has $A = G = H$'], answer: 2, explain: 'The certificate decides: $A - G = \\frac{(\sqrt{a} - \sqrt{b})^2}{2}$ vanishes only when $\sqrt{a} = \sqrt{b}$, that is $a = b$ (option C). Option A fails on the witness $(4, \tfrac{1}{4})$: $ab = 1$ yet $A = \\tfrac{17}{8} = 2.125 > 1 = G$ — strict. Option B fails on $(2, 7)$: the sum 9 is a perfect square yet $A = 4.5 > \sqrt{14} \\approx 3.74$. Option D fails on $(1, 9)$: $A = 5 > 3 = G$ — positivity is load-bearing but nowhere near sufficient.' },
      { q: 'The least value of $x + \\dfrac{25}{x}$ for $x > 0$ is:', options: ['$25$', '$10$', '$5$', '$50$'], answer: 1, explain: 'AM-GM on the reciprocal pair: $x + \\frac{25}{x} \\geq 2\\sqrt{25} = 10$, attained at $x = 5$ — an honest interior seat (option B). Option A reports the constant 25 itself, the split $0 + 25$ gone wrong; option C is $\\sqrt{25}$ — the GEOMETRIC mean of the pair, i.e. half the sum at best; option D doubles the constant ($2 \\times 25$), pricing a pair that never assembles.' },
      { q: 'Among all rectangles of perimeter 40, the greatest area is:', options: ['$100$', '$400$', '$96$', '$84$'], answer: 0, explain: 'The sides $x$ and $20 - x$ carry the fixed sum 20, so the area is $x(20 - x) \\leq \\left(\\frac{20}{2}\\right)^2 = 100$, attained at the equal split $10 \\times 10$ (option A). Option B\u2019s 400 is $20^2$ — the half-perimeter squared, forgetting that the semiperimeter splits AGAIN (it prices the $20 \\times 20$ square, whose perimeter is 80). Options C and D are honest members of the family that lose to the square: $12 \\times 8$ gives 96 and $14 \\times 6$ gives 84, both perimeter 40, both strictly below.' },
      { q: 'With weights $\\dfrac{3}{4}$ on 64 and $\\dfrac{1}{4}$ on 16, the weighted geometric mean $G_w$ is:', options: ['$32$', '$32\\sqrt{2}$', '$52$', '$\\dfrac{256}{7}$'], answer: 1, explain: 'The weighted geometric mean is $G_w = 64^{3/4} \\cdot 16^{1/4} = 2^{4.5} \\cdot 2 = 2^{5.5} = 32\\sqrt{2} \\approx 45.25$ (option B). Option A\u2019s 32 is the UNWEIGHTED $\\sqrt{64 \\cdot 16}$ — it ignores the weights entirely. Option C\u2019s 52 is the weighted ARITHMETIC mean $\\frac{3}{4} \\cdot 64 + \\frac{1}{4} \\cdot 16$ — the chain\u2019s ceiling, not the middle. Option D\u2019s $\\frac{256}{7} \\approx 36.6$ is the weighted HARMONIC mean — the chain\u2019s floor; the weighted order reads $\\frac{256}{7} \\leq 32\sqrt{2} \\leq 52$, strict since $64 \\neq 16$.' },
    ] },

    { kind: 'exercises', title: 'Exercises 4.1', sets: [
      { level: 'L1', questions: [
        { q: 'For the pair $(6, 24)$: compute $A$, $G$ and $H$, verify the order $A \\geq G \\geq H$, and show the certificate $A - G = \\dfrac{(\sqrt{a} - \sqrt{b})^2}{2}$ as an exact number.', solution: [
          'The means: $A = \\dfrac{6 + 24}{2} = 15$, $G = \\sqrt{144} = 12$ and $H = \\dfrac{2 \\cdot 144}{30} = \\dfrac{288}{30} = \\dfrac{48}{5} = 9.6$.',
          'The order: $15 \\geq 12 \\geq 9.6$ — strict at both links, since $6 \\neq 24$.',
          'The certificate: $A - G = 3$, while $(\\sqrt{24} - \\sqrt{6})^2 = 24 + 6 - 2\\sqrt{144} = 30 - 24 = 6$ — and half of it is exactly $3$.',
          'Hence, $A - G = \\dfrac{(\\sqrt{24} - \\sqrt{6})^2}{2} = 3$ — the gap is half a perfect square, the order\u2019s whole engine.',
        ], answer: '$A = 15$, $G = 12$, $H = 9.6$; the order holds strictly and $A - G = 3$ certified' },
        { q: 'Compute the three means of the pair $(5, 20)$ and state which is largest and which smallest, pricing both gaps.', solution: [
          'The means: $A = \\dfrac{5 + 20}{2} = \\dfrac{25}{2} = 12.5$, $G = \\sqrt{100} = 10$ and $H = \\dfrac{2 \\cdot 100}{25} = 8$.',
          'The order: $12.5 \\geq 10 \\geq 8$ — the arithmetic mean tops the neighbourhood, the harmonic mean floors it.',
          'The gaps: $A - G = 2.5$ and $G - H = 2$ — both strict, both certified by the same square $(\sqrt{20} - \sqrt{5})^2 = 20 + 5 - 2 \\cdot 10 = 5$.',
        ], answer: '$A = 12.5$ largest, $H = 8$ smallest; gaps $2.5$ and $2$' },
      ] },
      { level: 'L2', questions: [
        { q: 'The arithmetic mean of two positive numbers is 13 and their geometric mean is 5. Recover the two numbers, and cross-check both given means.', solution: [
          'Convert the means to symmetric data: $A = 13$ says the sum is $a + b = 26$, and $G = 5$ says the product is $ab = 25$.',
          'Now, the two numbers are the roots of $t^2 - 26t + 25 = 0$, which factors as $(t - 1)(t - 25) = 0$ — the pair $\{1, 25\}$.',
          'Check both means honestly: $\\dfrac{1 + 25}{2} = 13 = A$ and $\\sqrt{1 \\cdot 25} = 5 = G$ — and the third mean comes free: $H = \\dfrac{2 \\cdot 25}{26} = \\dfrac{25}{13} \\approx 1.92$, below both, as it must be.',
          'Hence, the numbers are 1 and 25 — Vi\u00e8te\u2019s staircase (AA 2.3 \u201cSymmetric Reads and Common Roots\u201d) cashed by the mean engine.',
        ], answer: 'the numbers are $1$ and $25$' },
        { q: 'Prove that for positive $x$ and $y$: $(1 + x)(1 + y) \\geq (1 + \\sqrt{xy})^2$, and witness the gap at $x = 4, y = 9$.', solution: [
          'Expand the left side: $(1 + x)(1 + y) = 1 + x + y + xy$.',
          'Now, AM-GM on the middle pair: $x + y \\geq 2\\sqrt{xy}$, so $1 + x + y + xy \\geq 1 + 2\\sqrt{xy} + xy = (1 + \\sqrt{xy})^2$.',
          'So the inequality holds, with equality exactly when $x = y$ (the certificate $x + y = 2\sqrt{xy}$ dying).',
          'Witness the gap at $(4, 9)$: the left side is $5 \\cdot 10 = 50$, the right side is $(1 + 6)^2 = 49$ — a gap of exactly 1, strict because $4 \\neq 9$.',
          'Hence, $(1 + x)(1 + y) \\geq (1 + \\sqrt{xy})^2$ — the two-number lemma the last exercise of this set climbs twice.',
        ], answer: 'proved; at $(4, 9)$: $50 \\geq 49$, gap 1' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find all positive solutions of the system $x + \\dfrac{9}{x} = 6$ and $2y + \\dfrac{50}{y} = 20$.', solution: [
          'The first equation\u2019s engine: $x + \\dfrac{9}{x} \\geq 2\\sqrt{9} = 6$ for every $x > 0$ — the equation demands the MINIMUM, so equality must hold: $x = \\dfrac{9}{x}$, that is $x = 3$.',
          'The second equation\u2019s engine: $2y + \\dfrac{50}{y} \\geq 2\\sqrt{100} = 20$ — again the minimum is demanded, so $2y = \\dfrac{50}{y}$, that is $y^2 = 25$ and $y = 5$.',
          'Check both seats: $3 + \\dfrac{9}{3} = 6$ and $2 \\cdot 5 + \\dfrac{50}{5} = 10 + 10 = 20$ — both equations hold exactly.',
          'Hence, the unique positive solution is $(x, y) = (3, 5)$ — a system whose each line sits precisely at its own AM-GM floor.',
        ], answer: '$x = 3$, $y = 5$' },
        { q: 'Positive numbers $a, b$ have $ab = 144$. Find the least possible value of $a + b$ and the pair attaining it; then say, with a reason, whether a greatest value of $a + b$ exists.', solution: [
          'The fixed-product discipline: $a + b \\geq 2\sqrt{ab} = 2 \\sqrt{144} = 24$, with equality exactly at the equal pair $a = b = 12$.',
          'Check attainment: $12 \\cdot 12 = 144$ — the certificate is honest, so 24 is the minimum.',
          'Witness the climb away from it: the pairs $(2, 72)$, $(8, 18)$ and $(144, 1)$ on the same constraint have sums $74$, $26$ and $145$ — every departure from balance is paid in sum.',
          'Now, the greatest value: none exists — as $a \\to 0^+$ the partner $b = \\dfrac{144}{a} \\to \\infty$, so the sum grows without bound; the floor is real, the ceiling is not.',
          'Hence, the least sum is 24 at $(12, 12)$, and no greatest sum exists on the constraint.',
        ], answer: 'least $a + b = 24$ at $(12, 12)$; no greatest value — the sum is unbounded above' },
        { q: 'Climb the doubling ladder on the four numbers $1, 4, 4, 16$: compute $A_4$ and $G_4$ directly, then recover both by the ladder\u2019s two storeys.', solution: [
          'Directly: $A_4 = \\dfrac{1 + 4 + 4 + 16}{4} = \\dfrac{25}{4} = 6.25$ and $G_4 = \\sqrt[4]{256} = 4$ — the engines check $4^4 = 256$ exactly.',
          'Storey one, the halves $(1, 4)$ and $(4, 16)$: their means are $\\dfrac{5}{2}, 2$ and $10, 8$ respectively — arithmetic and geometric, both pairs.',
          'Now, storey two: the mean of the half-arithmetic-means is $\\dfrac{2.5 + 10}{2} = 6.25 = A_4$, and the root of the half-geometric-means is $\\sqrt{2 \\cdot 8} = 4 = G_4$.',
          'Hence, $A_4 = 6.25 \\geq G_4 = 4$ with gap 2.25, and the ladder reproduced both means exactly — four numbers are two two-number questions, asked twice and once.',
        ], answer: '$A_4 = 6.25$, $G_4 = 4$; both recovered by the ladder: $\\frac{2.5 + 10}{2} = 6.25$ and $\\sqrt{2 \\cdot 8} = 4$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (Single Correct). The minimum value of $3^x + 3^{1 - x}$ over all real $x$ is: (A) $2\sqrt{3}$  (B) $3$  (C) $2$  (D) $6$. Find the answer with full reasoning.', solution: [
          'Name the pair: the two terms $3^x$ and $3^{1 - x}$ are positive, and their product is $3^x \\cdot 3^{1 - x} = 3$ — a fixed product hunting its minimum sum.',
          'Now, AM-GM: $3^x + 3^{1 - x} \\geq 2\sqrt{3^x \\cdot 3^{1-x}} = 2\sqrt{3}$.',
          'Check the certificate: equality needs $3^x = 3^{1 - x}$, that is $2x = 1$, so $x = \\dfrac{1}{2}$ — an honest real seat, so the bound is attained and IS the minimum.',
          'So the answer is (A) $2\sqrt{3} \\approx 3.46$; (B)\u2019s 3 is the PRODUCT of the pair reported as a sum, (C)\u2019s 2 is the reciprocal-pair minimum ($c = 1$) pasted onto the wrong constant, and (D)\u2019s 6 doubles the product — every distractor is a mispriced piece of the same data.',
        ], answer: '(A) $2\sqrt{3}$, attained at $x = \\dfrac{1}{2}$' },
        { q: 'Exam-style (Multiple Correct). For positive $a, b$, which of the following hold? (A) $\sqrt{ab} \\leq \\dfrac{a+b}{2}$  (B) $\\dfrac{a+b}{2} \\leq \\sqrt{ab}$  (C) $\\dfrac{2ab}{a+b} \\leq \\sqrt{ab}$  (D) $a + b \\geq 2\sqrt{ab}$. Identify every true statement.', solution: [
          '(A) is the two-number AM-GM itself — TRUE, certified by $\\dfrac{a+b}{2} - \\sqrt{ab} = \\dfrac{(\sqrt{a} - \sqrt{b})^2}{2} \\geq 0$.',
          '(B) is the chain inverted — FALSE, and one witness kills it: at $(a, b) = (1, 9)$, $\\dfrac{a+b}{2} = 5 > 3 = \sqrt{ab}$.',
          '(C) is the GM-HM link $G \\geq H$ — TRUE: $H = \\dfrac{1}{A(1/a, 1/b)} \\leq \\dfrac{1}{G(1/a, 1/b)} = G$.',
          '(D) is the fixed-product floor (equation 7\u2019s dual) — TRUE: $a + b \\geq 2\sqrt{ab}$ with equality iff $a = b$.',
          'Hence, (A), (C) and (D) hold; only the inverted (B) fails — the chain points DOWN from the arithmetic mean, always.',
        ], answer: '(A), (C) and (D) are true; (B) is the inverted chain and fails (witness $(1, 9)$: $5 > 3$)' },
        { q: 'Exam-style (Linked Comprehension). A rectangle has perimeter $P$ and area $K$, with positive sides. (i) Prove $K \\leq \\dfrac{P^2}{16}$. (ii) For $P = 24$, find the greatest possible $K$ and the rectangle attaining it. (iii) Show that if $K = 36$ then $P \\geq 24$ — the dual discipline.', solution: [
          '(i) Let the sides be $x$ and $\\dfrac{P}{2} - x$ — a fixed sum $\\dfrac{P}{2}$. The fixed-sum discipline gives $K = x\\left(\\dfrac{P}{2} - x\\right) \\leq \\left(\\dfrac{x + (P/2 - x)}{2}\\right)^2 = \\left(\\dfrac{P}{4}\\right)^2 = \\dfrac{P^2}{16}$, equality iff $x = \\dfrac{P}{4}$.',
          '(ii) For $P = 24$: $K \\leq \\dfrac{576}{16} = 36$, attained at $x = 6$ — the $6 \\times 6$ square; every non-square member (say $4 \\times 8$, area 32) loses strictly.',
          '(iii) The dual: fix $K = 36$ with sides $x, \\dfrac{36}{x}$; then $P = 2\\left(x + \\dfrac{36}{x}\\right) \\geq 2 \\cdot 2\sqrt{36} = 24$, equality exactly at $x = 6$.',
          'Hence, the rectangle engine is one line read three ways — the bound, its attainment, and the dual floor — all certified by the same square.',
        ], answer: '(i) $K \\leq P^2/16$ proved; (ii) greatest $K = 36$ at the $6 \\times 6$ square; (iii) $K = 36 \\Rightarrow P \\geq 24$, equality at the square' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove $G \\geq H$ for two positive numbers by BOTH routes — the reciprocal route (arithmetic mean of the reciprocals) and the direct certificate $G - H = \\dfrac{\\sqrt{ab}}{a+b}(\\sqrt{a} - \\sqrt{b})^2$ — and check both routes agree numerically at the pair $(12, 48)$.', solution: [
          'Route one (reciprocals): $A\\left(\\dfrac{1}{a}, \\dfrac{1}{b}\\right) = \\dfrac{a + b}{2ab} = \\dfrac{1}{H}$ while $G\\left(\\dfrac{1}{a}, \\dfrac{1}{b}\\right) = \\dfrac{1}{\\sqrt{ab}} = \\dfrac{1}{G}$; applying $A \\geq G$ to the reciprocal pair gives $\\dfrac{1}{H} \\geq \\dfrac{1}{G}$, and flipping (positives) gives $H \\leq G$.',
          'Route two (direct): $G - H = \sqrt{ab} - \\dfrac{2ab}{a+b} = \\dfrac{\sqrt{ab}(a + b) - 2ab}{a+b} = \\dfrac{\sqrt{ab}(a + b - 2\sqrt{ab})}{a+b} = \\dfrac{\sqrt{ab}}{a+b}(\sqrt{a} - \sqrt{b})^2 \\geq 0$.',
          'Now, both routes at $(12, 48)$: route one reads $\\dfrac{1}{H} = \\dfrac{5}{96} \\approx 0.0521$ and $\\dfrac{1}{G} = \\dfrac{1}{24} \\approx 0.0417$ — the reciprocal order flips to $H = 19.2 \\leq G = 24$.',
          'Route two at the same pair: $\\dfrac{\sqrt{576}}{60}(\\sqrt{48} - \sqrt{12})^2 = \\dfrac{24}{60} \\cdot 12 = 4.8$, and indeed $G - H = 24 - 19.2 = 4.8$.',
          'Hence, both routes give $G \\geq H$ with the same gap 4.8 at the witness — one order, two honest proofs.',
        ], answer: 'both routes prove $G \geq H$; at $(12, 48)$ each prices the gap $4.8$ exactly' },
        { q: 'For four positive numbers $a_1, a_2, a_3, a_4$ with $S = a_1 + a_2 + a_3 + a_4$, prove $\\dfrac{S}{S - a_1} + \\dfrac{S}{S - a_2} + \\dfrac{S}{S - a_3} + \\dfrac{S}{S - a_4} \\geq \\dfrac{16}{3}$, with the equality case; witness the bound at $(1, 1, 1, 3)$.', solution: [
          'Name the four terms $x_i = \\dfrac{S}{S - a_i}$ — positive, since $S > a_i$ for positive lists.',
          'Now, their reciprocal sum: $\\dfrac{S - a_i}{S} = 1 - \\dfrac{a_i}{S}$, so $\\sum \\dfrac{1}{x_i} = \\dfrac{(S - a_1) + \\cdots + (S - a_4)}{S} = \\dfrac{4S - S}{S} = 3$ — a fixed reciprocal sum.',
          'Apply AM ≥ HM at $n = 4$ — a proved power of two, so this lesson\u2019s ladder certifies it: $\\dfrac{x_1 + x_2 + x_3 + x_4}{4} \\geq \\dfrac{4}{\\frac{1}{x_1} + \\cdots + \\frac{1}{x_4}} = \\dfrac{4}{3}$.',
          'So $x_1 + x_2 + x_3 + x_4 \\geq \\dfrac{16}{3}$, equality iff all $x_i$ coincide — which forces $a_1 = a_2 = a_3 = a_4$.',
          'Witness at $(1, 1, 1, 3)$: $S = 6$, the terms are $\\dfrac{6}{5}, \\dfrac{6}{5}, \\dfrac{6}{5}, \\dfrac{6}{3}$ and their sum is $\\dfrac{18}{5} + 2 = \\dfrac{28}{5} = 5.6 \\geq \\dfrac{16}{3} \\approx 5.33$ — the bound holds, strict because the list is unbalanced.',
          'Hence, the sum is at least $\\dfrac{16}{3}$, attained only at the all-equal list — the $n = 4$ shape of the classical "sum of complementary fractions" family.',
        ], answer: 'proved; $\\geq 16/3$ with equality iff all four numbers are equal; witness $(1,1,1,3)$ gives $28/5 = 5.6$' },
        { q: 'Exam-style (Numerical Value). A positive number $t$ satisfies $t + \\dfrac{1}{t} = \\dfrac{37}{6}$. Find the larger of the two possible values of $t$ (report the integer).', solution: [
          'Clear the fraction: $6t^2 + 6 = 37t$, that is $6t^2 - 37t + 6 = 0$.',
          'Now, the discriminant: $37^2 - 4 \\cdot 6 \\cdot 6 = 1369 - 144 = 1225 = 35^2$ — a perfect square, so the roots are rational.',
          'So $t = \\dfrac{37 \\pm 35}{12}$: the two roots are $\\dfrac{72}{12} = 6$ and $\\dfrac{2}{12} = \\dfrac{1}{6}$ — reciprocal partners, as the symmetric equation demands.',
          'Check: $6 + \\dfrac{1}{6} = \\dfrac{37}{6}$ exactly, and the product of the roots is $6 \\cdot \\dfrac{1}{6} = 1$ — the certificate of the reciprocal pair.',
          'Hence, the larger value is 6 (and the minimum of $t + 1/t$ itself is 2 at $t = 1$ — the pair here sits far from that floor).',
        ], answer: '6' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the AM-GM inequality for $n = 4$ directly from the two-number case by the doubling ladder, tracking the equality discipline through both storeys; then witness the tight case at $(3, 3, 3, 3)$ and a strict case at $(1, 4, 4, 16)$.', solution: [
          'Split and bookkeep: for $a_1, a_2, a_3, a_4 > 0$, write $A_4 = \\dfrac{A(a_1, a_2) + A(a_3, a_4)}{2}$ — the mean of the whole is the mean of the two half-means.',
          'Now, storey one: the two-number case gives $A(a_1, a_2) \\geq G(a_1, a_2)$ and $A(a_3, a_4) \\geq G(a_3, a_4)$.',
          'Storey two: the two-number case again, on the two half-means, gives $\\dfrac{A(a_1,a_2) + A(a_3,a_4)}{2} \\geq \sqrt{A(a_1,a_2) A(a_3,a_4)} \\geq \sqrt{G(a_1,a_2) G(a_3,a_4)} = \\sqrt[4]{a_1 a_2 a_3 a_4} = G_4$.',
          'The equality discipline through the storeys: equality needs $a_1 = a_2$, $a_3 = a_4$ AND $A(a_1,a_2) = A(a_3,a_4)$ with the geometric push tight — together, $a_1 = a_2 = a_3 = a_4$.',
          'Witness the tight case $(3,3,3,3)$: every two-number mean on every half is 3, so $A_4 = G_4 = 3$ — the certificate dies at every storey.',
          'Witness a strict case $(1,4,4,16)$: the first half alone is strict ($A(1,4) = 2.5 > 2 = G(1,4)$), so $A_4 = 6.25 > 4 = G_4$ — one loose storey loosens the whole ladder.',
          'Hence, AM-GM at four numbers is the two-number case run twice and once — with the equality discipline climbing with the statement.',
        ], answer: 'proved; equality iff all four coincide — tight at $(3,3,3,3)$ ($3 = 3$), strict at $(1,4,4,16)$ ($6.25 > 4$)' },
        { q: 'For positive $a, b, c, d$ with $abcd = 16$, prove $(1 + a)(1 + b)(1 + c)(1 + d) \\geq 81$, and state the equality case.', solution: [
          'The lemma (the L2 exercise above): for positive $x, y$, $(1 + x)(1 + y) \\geq (1 + \sqrt{xy})^2$, equality iff $x = y$.',
          'Apply it to the pair $(a, b)$ and to the pair $(c, d)$: $(1+a)(1+b) \\geq (1 + \sqrt{ab})^2$ and $(1+c)(1+d) \\geq (1 + \sqrt{cd})^2$.',
          'Now, multiply and apply the lemma a SECOND time, to the pair $\sqrt{ab}, \sqrt{cd}$: the product is at least $\\left[(1 + \sqrt{ab})(1 + \sqrt{cd})\\right]^2 \\geq \\left[(1 + \sqrt[4]{abcd})^2\\right]^2 = (1 + \sqrt[4]{abcd})^4$.',
          'Substitute the constraint: $\\sqrt[4]{abcd} = \sqrt[4]{16} = 2$, so the product is at least $(1 + 2)^4 = 81$.',
          'The equality case: the lemma\u2019s certificate must die at all three applications — $a = b$, $c = d$, $\sqrt{ab} = \sqrt{cd}$ — which with $abcd = 16$ forces $a = b = c = d = 2$; there the product is $3^4 = 81$ exactly.',
          'Witness a strict neighbour: at $(1, 1, 2, 8)$ the constraint $abcd = 16$ still holds but the product is $2 \\cdot 2 \\cdot 3 \\cdot 9 = 108 > 81$ — the bound floors everyone, the equality seats only the balanced.',
          'Hence, $(1+a)(1+b)(1+c)(1+d) \\geq 81$ on $abcd = 16$, equality exactly at the all-2 quadruple — a four-variable inequality built entirely from the two-number lemma, climbed twice.',
        ], answer: 'proved; equality iff $a = b = c = d = 2$' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* figures for lesson 4.1 — the mean neighbourhood on the number line  */
/* and the fixed-sum product curve                                     */
/* ------------------------------------------------------------------ */

function meanNeighbourhoodSvg(): string {
  // number line 0..10 at y = 170; unit 63 px from x = 60; the pair (2, 8)
  // as orange dots, the means H = 3.2, G = 4, A = 5 as green dots with
  // stems; gap brackets G − H = 0.8 and A − G = 1 below; the certificate
  // A − G = (√8 − √2)²/2 = 1 in the footer
  const px = (v: number): number => 60 + 63 * v
  const H = px(3.2)
  const G = px(4)
  const Am = px(5)
  const ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .map((t) => `<line x1="${px(t)}" y1="170" x2="${px(t)}" y2="178" stroke="#d97706" stroke-width="1.4"/><text x="${px(t)}" y="191" font-size="10" text-anchor="middle" fill="#0f766e">${t}</text>`)
    .join('')
  return `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The mean neighbourhood of the pair 2 and 8 on a number line from 0 to 10. The pair sits as two orange dots at 2 and 8. The three means sit as green dots between them: the harmonic mean at 3.2, the geometric mean at 4 and the arithmetic mean at 5, each with a labelled stem. Brackets below the line price the gaps: G minus H equals 0.8 and A minus G equals 1. A footer line states the certificate: A minus G equals the square of root 8 minus root 2, all over 2, which equals 1 — the gap is half a square. At the equal pair 5 and 5 the three means would collapse onto one point.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the mean neighbourhood of the pair (2, 8)</text>
  <line x1="60" y1="170" x2="690" y2="170" stroke="#0d9488" stroke-width="2.2"/>
  ${ticks}
  <circle cx="${px(2)}" cy="170" r="7" fill="#ea580c"/>
  <text x="${px(2)}" y="142" font-size="12" font-weight="700" text-anchor="middle" fill="#ea580c">a = 2</text>
  <circle cx="${px(8)}" cy="170" r="7" fill="#ea580c"/>
  <text x="${px(8)}" y="142" font-size="12" font-weight="700" text-anchor="middle" fill="#ea580c">b = 8</text>
  <line x1="${H}" y1="163" x2="${H}" y2="128" stroke="#65a30d" stroke-width="1.2"/>
  <circle cx="${H}" cy="170" r="6" fill="#16a34a"/>
  <text x="${H}" y="120" font-size="12" font-weight="700" text-anchor="middle" fill="#166534">H = 3.2</text>
  <line x1="${G}" y1="163" x2="${G}" y2="102" stroke="#65a30d" stroke-width="1.2"/>
  <circle cx="${G}" cy="170" r="6" fill="#16a34a"/>
  <text x="${G}" y="94" font-size="12" font-weight="700" text-anchor="middle" fill="#166534">G = 4</text>
  <line x1="${Am}" y1="163" x2="${Am}" y2="128" stroke="#65a30d" stroke-width="1.2"/>
  <circle cx="${Am}" cy="170" r="6" fill="#16a34a"/>
  <text x="${Am}" y="120" font-size="12" font-weight="700" text-anchor="middle" fill="#166534">A = 5</text>
  <line x1="${H}" y1="214" x2="${G}" y2="214" stroke="#d97706" stroke-width="1.4"/>
  <line x1="${H}" y1="209" x2="${H}" y2="219" stroke="#d97706" stroke-width="1.4"/>
  <line x1="${G}" y1="209" x2="${G}" y2="219" stroke="#d97706" stroke-width="1.4"/>
  <text x="${(H + G) / 2}" y="232" font-size="9.5" font-weight="700" text-anchor="middle" fill="#166534">G−H = 0.8</text>
  <line x1="${G}" y1="214" x2="${Am}" y2="214" stroke="#d97706" stroke-width="1.4"/>
  <line x1="${Am}" y1="209" x2="${Am}" y2="219" stroke="#d97706" stroke-width="1.4"/>
  <text x="${(G + Am) / 2}" y="232" font-size="9.5" font-weight="700" text-anchor="middle" fill="#166534">A−G = 1</text>
  <text x="360" y="262" font-size="10.5" text-anchor="middle" fill="#0f766e">A − G = (√8 − √2)²/2 = 1 and G − H = 0.8 — both gaps are squares in disguise</text>
  <text x="360" y="280" font-size="10.5" text-anchor="middle" fill="#0f766e">at the equal pair (5, 5) the three means collapse onto the single point 5</text>
</svg>`
}

function fixedSumProductSvg(): string {
  // the product curve x(10 − x): x-axis 0..10 (px 70..700, unit 63), the
  // product scaled 10.4 px per unit with the x-axis at y = 300; census dots
  // for x = 1..9; the vertex (5, 25) with dashed guides; the symmetric-
  // partner pair (2, 16) and (8, 16) joined by a dashed line
  const px = (v: number): number => 70 + 63 * v
  const py = (p: number): number => 300 - 10.4 * p
  const grid = [5, 10, 15, 20, 25]
    .map((p) => `<line x1="70" y1="${py(p)}" x2="700" y2="${py(p)}" stroke="#5eead4" stroke-width="1.2" stroke-dasharray="3 4"/><text x="62" y="${py(p) + 4}" font-size="9.5" text-anchor="end" fill="#0f766e">${p}</text>`)
    .join('')
  const census = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map((v) => `<circle cx="${px(v)}" cy="${py(v * (10 - v))}" r="4.5" fill="#16a34a"/>`)
    .join('')
  const ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .map((t) => `<line x1="${px(t)}" y1="300" x2="${px(t)}" y2="306" stroke="#d97706" stroke-width="1.4"/><text x="${px(t)}" y="320" font-size="10" text-anchor="middle" fill="#0f766e">${t}</text>`)
    .join('')
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The fixed-sum discipline as a curve. The product of the two halves of a fixed sum 10, that is x times the quantity 10 minus x, plotted for x between 0 and 10 as a green parabola-shaped arc. Nine green census dots mark the integer splits 1 through 9 with products 9, 16, 21, 24, 25, 24, 21, 16 and 9 — symmetric partners sharing one product, joined for the pair 2 and 8 by a dashed amber line. The vertex of the arc is the equal split 5 plus 5, whose product 25 is the maximum, marked by an orange dot with dashed guides at product 25 and split 5. A note reads: AM-GM prices x times 10 minus x as at most 25, with the peak riding the equal split.">
  <text x="360" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the fixed-sum discipline: the product x(10 − x) on the split 10</text>
  ${grid}
  <line x1="40" y1="300" x2="706" y2="300" stroke="#0d9488" stroke-width="2"/>
  <line x1="70" y1="312" x2="70" y2="40" stroke="#0d9488" stroke-width="2"/>
  ${ticks}
  <text x="385" y="336" font-size="10" text-anchor="middle" fill="#0f766e">one side of the 10-split</text>
  <text x="84" y="58" font-size="10.5" fill="#0f766e">AM–GM: x(10 − x) ≤ 25</text>
  <text x="84" y="74" font-size="10" fill="#0f766e">the peak rides the equal split</text>
  <path d="M70,300 Q385,-220 700,300" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  ${census}
  <line x1="${px(2)}" y1="${py(16)}" x2="${px(8)}" y2="${py(16)}" stroke="#d97706" stroke-width="1.2" stroke-dasharray="3 4"/>
  <text x="${px(2)}" y="121" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">2</text>
  <text x="${px(8)}" y="121" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">8</text>
  <text x="385" y="152" font-size="9.5" text-anchor="middle" fill="#d97706">symmetric partners: 2 + 8 and 8 + 2 share the product 16</text>
  <line x1="70" y1="${py(25)}" x2="${px(5)}" y2="${py(25)}" stroke="#d97706" stroke-width="1.4" stroke-dasharray="6 4"/>
  <line x1="${px(5)}" y1="${py(25)}" x2="${px(5)}" y2="120" stroke="#d97706" stroke-width="1.4" stroke-dasharray="6 4"/>
  <circle cx="${px(5)}" cy="${py(25)}" r="6" fill="#ea580c"/>
  <text x="397" y="86" font-size="11" font-weight="700" fill="#166534">the equal split</text>
  <text x="397" y="100" font-size="11" font-weight="700" fill="#166534">5 + 5 → product 25</text>
</svg>`
}



/** 4.2 — 2–4 line run record: authored 2026-11-18 by the parallel swarm
 *  (owner chat directive); engine sections C/D green before prose declared
 *  (bun scripts/aa-ch04-work/run-42.ts: C 139/139, D 37/37, words 7,102);
 *  quiz keys [0, 3, 0, 1, 2]; 15 exercises L1–L6 2/2/3/3/3/2; 2 figures
 *  (the replication list, the power-mean ladder); 10 Illustrations;
 *  4 derivations; 4 formula cards; 6 tagged equations; 2 tables; 9 terms. */
 const lesson42: Lesson = {
  id: 'aa-the-weighted-am-gm-and-its-consequences',
  number: '4.2',
  title: 'The Weighted AM-GM and Its Consequences',
  concepts: [
    'weighted AM-GM by replication',
    'rational weights by scaling',
    'real weights as the chapter 9 doorstep',
    'the power-mean ladder, monotone in its order',
    'the geometric rung read honestly as the limit',
    'normalization discipline',
    'exponent-priced splits',
    'three-variable symmetric bounds',
  ],
  objectives: [
    'Prove the weighted AM-GM for whole-number weights by replication — nothing assumed beyond 4.1\u2019s plain law — and extend it to rational weights by scaling.',
    'State the real-weight law honestly as the chapter 9 doorstep: the logarithm will make the whole engine one line, a NAMED promise never cashed here.',
    'Compute the four named power means — quadratic, arithmetic, geometric (as the honest limit) and harmonic — prove the owned rungs (the variance square, the reciprocal route), and read the ladder law as one monotone statement.',
    'Run the normalization discipline: maximise asymmetric monomials x^a y^b under priced linear constraints at exam speed, equality seats included.',
    'Use the three-variable symmetric bounds and the exponent-priced split rule, and certify every answer with the equality discipline.',
  ],
  prerequisites: ['aa-the-arithmetic-geometric-mean-inequality', 'al-solving-linear-inequalities'],
  sources: ['cengage-m2-06', 'cengage-jee-style', 'ncert-math11-ch5-linear-inequalities'],
  blocks: [
    { kind: 'para', text: 'Lesson 4.1 — "The Arithmetic-Geometric Mean Inequality" — ended with the means keeping order over a democracy: every positive number in the list counted exactly once, the fixed-sum discipline delivered the equal split, and the two weighted-means teaser examples hinted that something more general was waiting. This is the lesson that pays that promise. The moment a product is asymmetric — $x^2y^3$ rather than $x \\cdot y$, a monomial whose exponents disagree — the equal split stops being the answer, and 4.1\u2019s plain engine needs to be told HOW MUCH each variable matters. That "how much" is a weight, and the weighted AM-GM is the general engine: a weight of three on $x$ simply means $x$ sits in the list three times.' },
    { kind: 'para', text: 'Nothing new is assumed — that is this lesson\u2019s first theorem and its proudest one. The route: replication first (whole-number weights as repeated entries, the honest proof); scaling second (rational weights, by clearing denominators); then the honest doorstep for real weights, where the one-line proof is named and deliberately not cashed. With the engine built, the power-mean ladder $M_r$ unifies the $H \\leq G \\leq A \\leq Q$ chain of 4.1 into ONE monotone law, and the consequences engine takes over: the normalization craft that prices exam maxima, the three-variable symmetric bounds, and the exponent-priced splits that turn a whole family of constrained-maximum questions into one reflex. These are the same maxima AA 2.1\u2019s vertex craft used to deliver for quadratics — now reached without any vertex at all.' },

    { kind: 'heading', text: 'Weights as Repetitions: the Honest Engine' },
    { kind: 'para', text: 'Start with the failure that forces the machinery. On the constraint $x + y = 5$, the plain law of 4.1 gives the symmetric products their equal split: $xy$ tops out at $\\left(\\frac{5}{2}\\right)^2 = 6.25$ and $x^2y^2$ at $\\left(\\frac{5}{2}\\right)^4$, both at $x = y = 2.5$. But $x^3y$ is not symmetric — it WANTS $x$ bigger than $y$. Its true maximum on the same line is $\\left(\\frac{5}{4}\\right)^4 \\cdot 3^3 = \\frac{16875}{256} \\approx 65.9$ at the $3 : 1$ split $\\left(\\frac{15}{4}, \\frac{5}{4}\\right)$, while the equal split delivers only $\\frac{625}{16} \\approx 39.1$. The exponent is trying to say something — "count me more times" — and the honest way to listen is to build a list in which it literally does.' },
    { kind: 'callout', tone: 'definition', title: 'The weighted arithmetic and geometric means', text: 'For positive entries $x_1, \\ldots, x_n$ and positive weights $w_1, \\ldots, w_n$, the WEIGHTED ARITHMETIC MEAN and the WEIGHTED GEOMETRIC MEAN are $A_w = \\dfrac{w_1x_1 + w_2x_2 + \\cdots + w_nx_n}{w_1 + w_2 + \\cdots + w_n}$ and $G_w = \\left(x_1^{w_1} x_2^{w_2} \\cdots x_n^{w_n}\\right)^{\\dfrac{1}{w_1 + w_2 + \\cdots + w_n}}$. Thus, for the weights $(2, 3)$ on the pair $(x, y)$: $A_w = \\dfrac{2x + 3y}{5}$ and $G_w = \\left(x^2y^3\\right)^{1/5}$ — and for equal weights every weighted mean collapses to 4.1\u2019s plain mean of the same list.' },
    { kind: 'para', text: 'For example, on a small roster (every value below recomputed by the engines before this prose was written):' },
    { kind: 'list', marker: 'roman', items: [
      '(i) weights $(1, 3)$ on $(8, 2)$: $A_w = \\dfrac{8 + 6}{4} = 3.5$ and $G_w = \\left(8 \\cdot 8\\right)^{1/4} = 2\\sqrt{2} \\approx 2.83$ — the law holds, strict;',
      '(ii) weights $(2, 3)$ on $(5, 5)$: $A_w = \\dfrac{10 + 15}{5} = 5$ and $G_w = \\left(5^2 \\cdot 5^3\\right)^{1/5} = 5$ — equal entries level every weighting;',
      '(iii) weights $(3, 1)$ on $(1, 81)$: $A_w = \\dfrac{3 + 81}{4} = 21$ and $G_w = \\left(1 \\cdot 81\\right)^{1/4} = 3$ — a wide gap, priced by the heavy weight on the small entry;',
      '(iv) weights $(1, 1)$ on $(6, 24)$: $A_w = 15$ and $G_w = \\sqrt{144} = 12$ — 4.1\u2019s plain pair, seated inside the weighted family as its equal-weight row.',
    ] },
    { kind: 'figure', caption: 'Weights are repetitions. Left: the weights (3, 2) on (4, 9) are the plain list [4, 4, 4, 9, 9] — its arithmetic mean (12+18)/5 = 6 and its geometric mean (4³·9²)^(1/5) ≈ 5.53 are 4.1\u2019s own means of a longer list. Right: the same facts read as weighted means — the weighted A bar against the weighted G bar, the law visible as bar lengths. The weighted AM-GM is not a new theorem; it is the plain theorem, read on the replicated list.', svg: weightReplicationSvg() },
    { kind: 'derivation', title: 'The weighted AM-GM for whole-number weights, by replication', statement: 'For positive $x$ and $y$ and positive whole numbers $m$ and $n$: $\\dfrac{mx + ny}{m + n} \\geq \\left(x^m y^n\\right)^{\\dfrac{1}{m+n}}$, with equality exactly when $x = y$. For a tuple of entries with whole weights: $\\dfrac{\\sum w_ix_i}{\\sum w_i} \\geq \\left(\\prod x_i^{w_i}\\right)^{1/\\sum w_i}$, equality exactly when all entries are equal.', steps: [
      { label: 'Replicate', formula: '\\underbrace{x,\\ x,\\ \\ldots,\\ x}_{m \\text{ times}},\\ \\underbrace{y,\\ y,\\ \\ldots,\\ y}_{n \\text{ times}}', explanation: 'Build the plain list of $m + n$ entries: $x$ written $m$ times and $y$ written $n$ times. Nothing new is being defined — a weight of $m$ on $x$ IS $x$ sitting in the list $m$ times. The figure above is this sentence.' },
      { label: 'Apply 4.1\u2019s plain law', formula: '\\frac{\\underbrace{x + \\cdots + x}_{m} + \\underbrace{y + \\cdots + y}_{n}}{m+n} \\geq \\left(x^{m} y^{n}\\right)^{\\frac{1}{m+n}}', explanation: '4.1\u2019s arithmetic–geometric mean inequality holds for a list of any length — its doubling proof covers every power of two, and the honest general-length certificate rides chapter 7\u2019s induction exactly as 4.1 recorded. The plain law applied to the LONGER list is the entire proof; no new assumption enters.' },
      { label: 'Read the left side', formula: '\\frac{mx + ny}{m+n} = A_w', explanation: 'The sum of the replicated list is $mx + ny$: the weighted arithmetic mean is the plain arithmetic mean of the repeated list. This is why $A_w$ was defined with the weights in its numerator — they are counts.' },
      { label: 'Read the right side', formula: '\\left(x^m y^n\\right)^{\\frac{1}{m+n}} = G_w', explanation: 'The product of the replicated list is $x^m y^n$: the weighted geometric mean is the plain geometric mean of the repeated list. Equality in the plain law needs every one of the $m + n$ entries equal — that is, $x = y$.' },
    ], result: '$\\frac{mx + ny}{m+n} \\geq \\left(x^my^n\\right)^{\\frac{1}{m+n}} \\quad \\text{with equality} \\iff x = y$' },
    { kind: 'callout', tone: 'theorem', title: 'The weighted AM-GM, whole-number weights', text: 'For positive entries $x_1, \\ldots, x_n$ and whole-number weights $w_i \\geq 1$: $\\dfrac{\\sum w_ix_i}{\\sum w_i} \\geq \\left(\\prod x_i^{w_i}\\right)^{1/\\sum w_i}$. Equality holds exactly when all the replicated entries coincide — that is, when the distinct entries of the original tuple are equal. The proof is replication: the weighted means are 4.1\u2019s plain means of the repeated list, so the whole law is 4.1\u2019s law.' },
    { kind: 'formula', name: 'The weighted AM-GM', latex: '\\frac{w_1x_1 + w_2x_2 + \\cdots + w_nx_n}{w_1 + w_2 + \\cdots + w_n} \\;\\geq\\; \\left(x_1^{w_1}x_2^{w_2}\\cdots x_n^{w_n}\\right)^{\\frac{1}{w_1+w_2+\\cdots+w_n}}', note: 'whole-number weights = repeated entries (replication); rational weights by scaling; equality exactly at the all-equal tuple. The weights price the exponents — reach for it whenever a product is asymmetric.' },
    { kind: 'equation', latex: '\\frac{w_1x_1 + w_2x_2 + \\cdots + w_nx_n}{w_1 + w_2 + \\cdots + w_n} \\geq \\left(x_1^{w_1} x_2^{w_2} \\cdots x_n^{w_n}\\right)^{\\frac{1}{w_1 + w_2 + \\cdots + w_n}} \\tag{1}', note: 'the weighted AM-GM for positive weights on positive entries — 4.1\u2019s plain law read on the replicated list; equality exactly when every entry is equal.' },
    { kind: 'para', text: 'Rational weights arrive by scaling. Multiplying EVERY weight by the same positive constant leaves both sides of the law untouched — the fraction $\\frac{\\sum w_ix_i}{\\sum w_i}$ rescales numerator and denominator together, and the exponent $\\frac{1}{\\sum w_i}$ rescales with the total. So weights like $\\left(\\frac{1}{2}, \\frac{1}{3}, \\frac{1}{6}\\right)$, whose sum is conveniently 1, are the whole-number weights $(3, 2, 1)$ in lighter clothing:' },
    { kind: 'equation', latex: '\\frac{\\frac{1}{2}a + \\frac{1}{3}b + \\frac{1}{6}c}{1} = \\frac{3a + 2b + c}{6} \\tag{2}', note: 'the scaling law: clear denominators and run the whole-number engine — both means are invariant under a common positive rescaling of all weights.' },
    { kind: 'example', title: 'Compute the weighted means for the weights (1/3, 2/3) on the pair (8, 2), and verify the law', steps: [
      'Scale first: multiply both weights by 3 — the weights become the whole numbers $(1, 2)$, and the scaling law of equation (2) guarantees both means are untouched. Whole numbers carry the work.',
      'The weighted arithmetic mean: $A_w = \\dfrac{1 \\cdot 8 + 2 \\cdot 2}{3} = 4$.',
      'The weighted geometric mean: $G_w = \\left(8^1 \\cdot 2^2\\right)^{1/3} = 32^{1/3} = 2\\sqrt[3]{4} \\approx 3.175$.',
      'Verify without decimals — cube both sides: $4^3 = 64$ against $\\left(2\\sqrt[3]{4}\\right)^3 = 8 \\cdot 4 = 32$, and $64 \\geq 32$ settles the law, strict because $8 \\neq 2$.',
      'Hence, $A_w = 4 \\geq G_w = 2\\sqrt[3]{4} \\approx 3.175$ — the rational-weight engine run entirely on its whole-number core.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The real-weight doorstep, honestly labelled', text: 'Replication needs the weight to be a whole number of copies, and scaling reaches only the rationals. For irrational weights — $w_1 = \\sqrt{2}$ against $w_2 = 1$, say — the law is still TRUE, and the engines of this lesson witness it numerically to four decimals; but the honest PROOF lies one door ahead: a limit of rational weights (both sides are continuous in the weights) closes the gap, and the cleanest engine of all is the LOGARITHM — when chapter 9 arrives, the entire weighted law becomes a single line of its concavity machinery. That promise is NAMED here and deliberately not cashed: this book proves what its current tools can own, and labels what waits.' },
    { kind: 'callout', tone: 'warn', title: 'The unweighted mean where the weighted is due', text: 'On $x + y = 5$, the equal split $(2.5, 2.5)$ maximises $xy$ and $x^2y^2$ — every SYMMETRIC product. It does NOT maximise $x^3y$: the equal split delivers $\\frac{625}{16} \\approx 39.1$ while the $3 : 1$ split $\\left(\\frac{15}{4}, \\frac{5}{4}\\right)$ delivers $\\frac{16875}{256} \\approx 65.9$, the true maximum. The chapter review names this as the module\u2019s classic trap: reach for the plain mean on an asymmetric product and you optimise the wrong seat. Price the exponents first; split second.' },

    { kind: 'heading', text: 'The Power-Mean Ladder' },
    { kind: 'para', text: 'Lesson 4.1 built its chain piecewise: $A \\geq G$ from the square that cannot be negative, $G \\geq H$ by reciprocals, $Q \\geq A$ by the variance square — three separate arguments for three separate inequalities. The reference module\u2019s "Means of mth Power" section suggests the deeper read: all four means are seats of ONE family, indexed by a single real number $r$, and the whole chain is ONE law — monotonicity in $r$. The family is the power-mean ladder, and this lesson builds it on the ground 4.1 laid.' },
    { kind: 'callout', tone: 'definition', title: 'The power mean of order r', text: 'For positive entries $x_1, \\ldots, x_n$ and a real order $r \\neq 0$, the POWER MEAN OF ORDER $r$ is $M_r(x_1, \\ldots, x_n) = \\left(\\dfrac{x_1^{\\,r} + x_2^{\\,r} + \\cdots + x_n^{\\,r}}{n}\\right)^{\\dfrac{1}{r}}$. Thus, $M_1 = A$ (the arithmetic mean), $M_2 = Q$ (the quadratic mean — the root mean square), $M_{-1} = H$ (the harmonic mean, $\\dfrac{n}{\\sum 1/x_i}$), and $M_0$ is read HONESTLY as the limit $r \\to 0$ — a rung the formula cannot write directly, because a zeroth power makes every entry 1 and the $\\frac{1}{0}$ root is meaningless.' },
    { kind: 'equation', latex: 'M_r(x_1, \\ldots, x_n) = \\left(\\frac{x_1^{\\,r} + x_2^{\\,r} + \\cdots + x_n^{\\,r}}{n}\\right)^{\\frac{1}{r}} \\qquad (r \\neq 0) \\tag{3}', note: 'the power mean of order r; the named seats are r = 2 (Q), r = 1 (A), r = 0 (G, read as the limit), r = −1 (H).' },
    { kind: 'para', text: 'For example, the tuple $(1, 2, 6)$ climbs the ladder rung by rung (every value recomputed by the engines):' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the harmonic rung $M_{-1} = \\dfrac{3}{1 + \\frac{1}{2} + \\frac{1}{6}} = \\dfrac{9}{5} = 1.8$;',
      '(ii) the geometric rung $M_0$, read as the limit: $\\sqrt[3]{1 \\cdot 2 \\cdot 6} = \\sqrt[3]{12} \\approx 2.289$;',
      '(iii) a fractional rung between them: $M_{1/2} = \\left(\\dfrac{1 + \\sqrt{2} + \\sqrt{6}}{3}\\right)^2 \\approx 2.628$ — the family does not stop at the named seats;',
      '(iv) the arithmetic rung $M_1 = \\dfrac{1 + 2 + 6}{3} = 3$;',
      '(v) the quadratic rung $M_2 = \\sqrt{\\dfrac{1 + 4 + 36}{3}} = \\sqrt{\\dfrac{41}{3}} \\approx 3.697$ — and the ladder reads $1.8 < 2.289 < 2.628 < 3 < 3.697$, strict at every rung because the entries differ.',
    ] },
    { kind: 'figure', caption: 'The power-mean ladder of the tuple (1, 2, 6): the rungs sit at M(−1) = 9/5 = 1.8, M(0) = 12^(1/3) ≈ 2.289 (the honest limit rung), the fractional r = ½ rung ≈ 2.628 (dashed), M(1) = 3, M(2) = √(41/3) ≈ 3.697. Climb the order r and the mean climbs — one family, one monotone law; the rungs meet only at an all-equal tuple, where every rung reads the same value.', svg: powerLadderSvg() },
    { kind: 'derivation', title: 'AM ≤ QM: the variance square', statement: 'For every real tuple $x_1, \\ldots, x_n$ — no positivity needed — the quadratic mean never falls below the arithmetic mean: $M_2 \\geq M_1$, with equality exactly when all the entries are equal.', steps: [
      { label: 'Square the gap', formula: '\\frac{\\sum (x_i - A)^2}{n} \\geq 0', explanation: 'A sum of real squares divided by $n$ cannot be negative — the one fact a square cannot hide, and the same discipline that proved $A \\geq G$ for two numbers in 4.1.' },
      { label: 'Expand the sum', formula: '\\frac{\\sum x_i^2}{n} - 2A\\,\\frac{\\sum x_i}{n} + A^2 = \\frac{\\sum x_i^2}{n} - A^2', explanation: 'The cross term collapses because the entries sum to $nA$: the mean of the squared deviations is the mean of the squares minus the square of the mean — the variance identity, exact for every tuple.' },
      { label: 'Take the honest root', formula: '\\sqrt{\\frac{\\sum x_i^2}{n}} \\geq |A| \\geq A', explanation: 'From $\\frac{\\sum x_i^2}{n} \\geq A^2$ with both sides non-negative, the square root preserves order: $M_2 \\geq |A|$, and $|A| \\geq A$ always. Note what survived: no positivity of the entries was ever used — $M_2 \\geq M_1$ lives on all of $\\mathbb{R}^n$.' },
      { label: 'The equality case', formula: '\\sum (x_i - A)^2 = 0 \\iff x_1 = x_2 = \\cdots = x_n', explanation: 'A sum of squares vanishes exactly when every term does: every entry sits AT the mean. That is the equality certificate, and it is the same certificate 4.1\u2019s $(\\sqrt{a} - \\sqrt{b})^2 = 0$ carried.' },
    ], result: '$M_2 \\geq M_1 \\text{ on every real tuple},$ $\\qquad$ $\\text{equality} \\iff x_1 = \\cdots = x_n$' },
    { kind: 'derivation', title: 'The reciprocal route: H ≤ G ≤ A', statement: 'For positive entries: the harmonic rung sits below the geometric rung (read as the limit), which sits below the arithmetic rung — $M_{-1} \\leq M_0 \\leq M_1$, equality exactly at the all-equal tuple.', steps: [
      { label: 'GM ≤ AM is 4.1\u2019s own law', formula: '\\left(\\prod x_i\\right)^{1/n} \\leq \\frac{\\sum x_i}{n}', explanation: 'The upper half of the chain is cited, never re-proved: 4.1 established it with the doubling ladder, and its full certificate rides chapter 7\u2019s induction — this lesson merely sits on that banked ground.' },
      { label: 'Run the same law on the reciprocals', formula: '\\frac{\\sum 1/x_i}{n} \\geq \\left(\\prod \\frac{1}{x_i}\\right)^{1/n} = \\frac{1}{G}', explanation: 'The reciprocals are positive too, so 4.1\u2019s law applies to THEM unchanged; the geometric mean of the reciprocals is the reciprocal of the geometric mean — an algebraic identity, not a new inequality.' },
      { label: 'Turn the page upside down', formula: 'H = \\frac{n}{\\sum 1/x_i} \\leq G', explanation: 'The harmonic mean is exactly the reciprocal of the arithmetic mean of the reciprocals; reciprocation reverses order on positives, so the inequality just proved flips direction into $H \\leq G$. The equality certificate cascades from 4.1\u2019s: all entries equal.' },
    ], result: '$M_{-1} \\leq M_0 \\leq M_1 \\quad (x_i > 0),$ $\\qquad$ $\\text{equality} \\iff x_1 = \\cdots = x_n$' },
    { kind: 'equation', latex: 'M_{-1} \\;\\leq\\; M_0 \\;\\leq\\; M_1 \\;\\leq\\; M_2 \\qquad \\text{that is} \\qquad H \\leq G \\leq A \\leq Q \\tag{4}', note: 'the ladder read at the four named rungs — 4.1\u2019s piecewise chain re-derived as ONE law\u2019s four seats; every inequality is strict unless the tuple is constant.' },
    { kind: 'callout', tone: 'theorem', title: 'The ladder law, with its honest proof map', text: 'For positive entries and real orders $r < s$: $M_r \\leq M_s$, with equality exactly at the all-equal tuple. PROVED in this lesson for the owned seats: $M_{-1} \\leq M_0 \\leq M_1$ by the reciprocal route above, $M_1 \\leq M_2$ by the variance square (on every real tuple), and the $M_0$ rung read honestly as the limit. The FULL statement — every real pair $r < s$ — is a NAMED promise on this book\u2019s own later ground: lesson 4.5\u2019s Jensen engine owns the chord proof for the power family, and chapter 9\u2019s logarithm turns the whole ladder into one line. Nothing here is used before it is proved.' },
    { kind: 'para', text: 'The $M_0$ rung deserves its honest paragraph, because it is the one seat the formula cannot write. As $r \\to 0$ the expression $\\left(\\frac{\\sum x_i^{r}}{n}\\right)^{1/r}$ does not break — it closes onto the geometric mean $\\left(\\prod x_i\\right)^{1/n}$, and that limit is a genuinely computational fact, not a convention. What this lesson\u2019s TOOLS can do is witness it: the engines swept $r = 10^{-1}, 10^{-2}, 10^{-3}, 10^{-4}$ on the tuples $(1, 2, 6)$, $(2, 8)$ and $(1, 4, 16)$ and watched $M_r$ close onto $G$ at every step (on $(2, 8)$ the gap at $r = 10^{-3}$ is already below one part in a thousand). What the proof needs is the limit machinery itself — and the natural engine, the logarithm, is chapter 9\u2019s. So the book states it honestly: $M_0 = G$ is read as the limit case, witnessed numerically now, proved the moment the logarithm arrives. A named promise, never cashed early.' },
    { kind: 'formula', name: 'The power-mean ladder', latex: 'r < s \\;\\Longrightarrow\\; M_r \\leq M_s, \\qquad M_{-1} \\leq M_0 \\leq M_1 \\leq M_2 \\;\\equiv\\; H \\leq G \\leq A \\leq Q', note: 'the power-mean family is monotone in its order — one law behind 4.1\u2019s whole chain; equality exactly at the all-equal tuple; the geometric rung G is the honest limit case as r → 0.' },
    { kind: 'example', title: 'Order the four rungs for the triple (1, 4, 16) and certify the equality row', steps: [
      'The rungs in order: $M_{-1} = \\dfrac{3}{1 + \\frac{1}{4} + \\frac{1}{16}} = \\dfrac{3}{\\frac{21}{16}} = \\dfrac{16}{7} \\approx 2.286$.',
      'Next the geometric rung: $M_0 = \\sqrt[3]{1 \\cdot 4 \\cdot 16} = \\sqrt[3]{64} = 4$ — a clean seat on this tuple.',
      'Then $M_1 = \\dfrac{1 + 4 + 16}{3} = 7$ and $M_2 = \\sqrt{\\dfrac{1 + 16 + 256}{3}} = \\sqrt{91} \\approx 9.54$.',
      'Hence, $\\dfrac{16}{7} < 4 < 7 < \\sqrt{91}$, strict at every rung; on the constant triple $(5, 5, 5)$ every rung reads 5 — the equality row the census table records.',
    ] },
    { kind: 'table', caption: 'The rung census — every cell recomputed by the engines before this prose was written (the geometric rung read honestly as the limit; the last row is the equality discipline).', head: ['Tuple', 'M₋₁ (harmonic)', 'M₀ = G (limit)', 'M₁ (arithmetic)', 'M₂ (quadratic)'], rows: [
      ['$(1, 2, 6)$', '$\\dfrac{9}{5} = 1.8$', '$\\sqrt[3]{12} \\approx 2.289$', '$3$', '$\\sqrt{\\dfrac{41}{3}} \\approx 3.697$'],
      ['$(1, 4, 16)$', '$\\dfrac{16}{7} \\approx 2.286$', '$4$', '$7$', '$\\sqrt{91} \\approx 9.539$'],
      ['$(1, 1, 4)$', '$\\dfrac{4}{3} \\approx 1.333$', '$\\sqrt[3]{4} \\approx 1.587$', '$2$', '$\\sqrt{6} \\approx 2.449$'],
      ['$(5, 5, 5)$', '$5$', '$5$', '$5$', '$5$'],
    ] },
    { kind: 'para', text: 'One census is worth a second reading. Every row climbs left to right — that is the ladder law witnessed. Every row is strict except the last — that is the equality discipline: the rungs meet ONLY at the all-equal tuple. And the rung SPREAD widens as the tuple spreads: $(5, 5, 5)$ collapses the ladder, while $(1, 4, 16)$ — the most dispersed tuple in the table — spreads its rungs from $2.286$ to $9.539$. The ladder measures dispersion exactly as a variance does, which is no accident: the $M_2^2$ to $M_1^2$ gap IS the variance, as the derivation proved.' },
    { kind: 'example', title: 'If a⁴ + b⁴ = 32 with a, b > 0, prove that a + b ≤ 4 (the mth-power read)', steps: [
      'This is a ladder question wearing a constraint\u2019s clothes: the constraint fixes $M_4 = \\left(\\dfrac{a^4 + b^4}{2}\\right)^{1/4} = 16^{1/4} = 2$, and the question asks about $M_1 = \\dfrac{a+b}{2}$.',
      'The ladder law between the owned rungs: $M_1 \\leq M_4$ — the arithmetic mean never beats the fourth-power mean on positive entries.',
      'So $\\dfrac{a+b}{2} \\leq 2$, that is $a + b \\leq 4$; the seat must level the ladder: $a = b = 2$, and it checks — $2^4 + 2^4 = 32$ with $a + b = 4$.',
      'Hence, $a + b \\leq 4$, sharp at $a = b = 2$ — the reference module calls this the A.M.-of-$m$th-power read; this book calls it one rung of the ladder.',
    ] },
    { kind: 'example', title: 'Find the least value of 4a² + 9b² subject to 2a + 3b = 12 (a, b > 0) (exam-style)', steps: [
      'Price the pair: the constraint is the plain sum of the blocks $2a$ and $3b$; the expression is the sum of their squares — a $M_2$-versus-$M_1$ question on the pair $(2a, 3b)$.',
      'The variance-square rung: $\\sqrt{\\dfrac{4a^2 + 9b^2}{2}} \\geq \\dfrac{2a + 3b}{2} = 6$ — the quadratic mean of the blocks against their arithmetic mean, both fixed by the constraint.',
      'Square and read: $4a^2 + 9b^2 \\geq 2 \\cdot 36 = 72$, with equality exactly when the blocks level: $2a = 3b = 6$.',
      'The seat: $a = 3,\\ b = 2$ — check the constraint $6 + 6 = 12$ and the value $36 + 36 = 72$.',
      'Hence, the least value is $72$, attained at $(a, b) = (3, 2)$ — one rung of the ladder, priced and cashed.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The geometric rung is a limit, and the negative rungs need positivity', text: 'Two boundary facts the ladder demands. First: $M_0$ is NOT a formula — writing $\\left(\\frac{\\sum x_i^0}{n}\\right)^{1/0}$ is meaningless (zeroth powers are all 1, and there is no zeroth root); $M_0 = G$ is a LIMIT statement, proved the day the logarithm arrives. Second: the rungs below $M_0$ genuinely need positive entries — on $(-4, -1)$ a formal $G = \\sqrt{4} = 2$ exists while $A = -2.5$, and $G \\leq A$ is FALSE there; only the $M_1$ and $M_2$ rungs live on all real tuples. The ladder theorem is stated on positives for a reason: respect the domain or the rungs snap.' },
    { kind: 'callout', tone: 'insight', title: 'One family, one law', text: 'Every mean comparison this book has asked since 4.1 is now a single question: which two rungs? The fixed-sum maximum is $M_0$ meeting $M_1$; the reciprocal bounds are $M_{-1}$ under $M_0$; the least-of-squares items are $M_2$ over $M_1$; the $a^4 + b^4$ constraints are the $M_4$ rung holding $M_1$ down. The examiner\u2019s phrase "which is greater" is the ladder\u2019s phrase "which rung is higher" — and the answer is always the same law, monotone in $r$, strict unless the tuple is constant.' },

    { kind: 'heading', text: 'The Consequences Engine: Normalization' },
    { kind: 'para', text: 'Now the craft that the whole engine serves. The exam question that 4.1\u2019s plain law could only half-answer is: maximise $x^ay^b$ when a PRICED linear constraint $\\alpha x + \\beta y = c$ is in force — the $x^2y^3$-on-$5x + 3y = 15$ shape. The move is to choose the replicated list so that the CONSTRAINT ITSELF becomes the plain sum: write $\\alpha x + \\beta y = a\\left(\\frac{\\alpha x}{a}\\right) + b\\left(\\frac{\\beta y}{b}\\right)$ — the block $\\frac{\\alpha x}{a}$ taken $a$ times, the block $\\frac{\\beta y}{b}$ taken $b$ times. Then one application of the weighted AM-GM prices the whole product. This move is called NORMALIZATION, and its lemma is the exam bank\u2019s most-cashed result of the chapter.' },
    { kind: 'derivation', title: 'The normalization lemma', statement: 'For $x, y > 0$, whole exponents $a, b \\geq 1$ and a priced constraint $\\alpha x + \\beta y = c$ ($\\alpha, \\beta, c > 0$): $x^ay^b \\leq \\left(\\dfrac{c}{a+b}\\right)^{a+b}\\left(\\dfrac{a}{\\alpha}\\right)^a\\left(\\dfrac{b}{\\beta}\\right)^b$, with equality exactly at the seat $\\dfrac{\\alpha x}{a} = \\dfrac{\\beta y}{b} = \\dfrac{c}{a+b}$, that is $x = \\dfrac{ac}{\\alpha(a+b)},\\ y = \\dfrac{bc}{\\beta(a+b)}$.', steps: [
      { label: 'Split the constraint by the exponents', formula: '\\alpha x + \\beta y = a\\left(\\frac{\\alpha x}{a}\\right) + b\\left(\\frac{\\beta y}{b}\\right) = c', explanation: 'Replication\u2019s own move: the weights are the EXPONENTS, and the entries are the priced blocks $\\frac{\\alpha x}{a}$ and $\\frac{\\beta y}{b}$ — chosen precisely so that the weighted sum is the constraint itself.' },
      { label: 'Run the weighted AM-GM on the blocks', formula: '\\frac{c}{a+b} \\geq \\left[\\left(\\frac{\\alpha x}{a}\\right)^a \\left(\\frac{\\beta y}{b}\\right)^b\\right]^{\\frac{1}{a+b}}', explanation: 'The weighted arithmetic mean of the blocks is $\\frac{c}{a+b}$; the weighted geometric mean is the priced product. This is equation (1) with the constraint already installed — no extra step.' },
      { label: 'Clear the pricing', formula: '\\left(\\frac{\\alpha x}{a}\\right)^a \\left(\\frac{\\beta y}{b}\\right)^b \\leq \\left(\\frac{c}{a+b}\\right)^{a+b}', explanation: 'Raise to the $(a+b)$-th power — order-preserving on positives — to bound the priced product. Note the engines swept this: no off-seat probe ever beats the bound.' },
      { label: 'Solve for the monomial', formula: 'x^ay^b \\leq \\left(\\frac{c}{a+b}\\right)^{a+b}\\left(\\frac{a}{\\alpha}\\right)^a\\left(\\frac{b}{\\beta}\\right)^b', explanation: 'Multiply through by $\\left(\\frac{a}{\\alpha}\\right)^a\\left(\\frac{b}{\\beta}\\right)^b$ to strip the pricing. Equality needs the blocks level — $\\frac{\\alpha x}{a} = \\frac{\\beta y}{b} = \\frac{c}{a+b}$ — which pins the maximizing seat exactly.' },
    ], result: '$x^ay^b \\leq \\left(\\frac{c}{a+b}\\right)^{a+b}\\left(\\frac{a}{\\alpha}\\right)^a\\left(\\frac{b}{\\beta}\\right)^b,$ $\\qquad$ $\\text{equality} \\iff \\frac{\\alpha x}{a} = \\frac{\\beta y}{b} = \\frac{c}{a+b}$' },
    { kind: 'equation', latex: 'x^ay^b \\leq \\left(\\frac{c}{a+b}\\right)^{a+b}\\left(\\frac{a}{\\alpha}\\right)^a\\left(\\frac{b}{\\beta}\\right)^b \\tag{5}', note: 'the normalization bound for the asymmetric monomial $x^ay^b$ under the priced constraint $\\alpha x + \\beta y = c$; the maximizing seat is $x = \\frac{ac}{\\alpha(a+b)}$, $y = \\frac{bc}{\\beta(a+b)}$.' },
    { kind: 'formula', name: 'The normalization craft', latex: 'x^ay^b \\leq \\left(\\frac{c}{a+b}\\right)^{a+b}\\left(\\frac{a}{\\alpha}\\right)^a\\left(\\frac{b}{\\beta}\\right)^b \\quad \\text{on} \\quad \\alpha x + \\beta y = c', note: 'price the blocks $\\alpha x / a$ and $\\beta y / b$ so the constraint IS the weighted sum; equality seat $\\alpha x/a = \\beta y/b = c/(a+b)$. The exam engine for $x^2y^3$-type maxima.' },
    { kind: 'example', title: 'Find the greatest value of x²y³ on the line 5x + 3y = 15 (x, y > 0), with the equality seat', steps: [
      'Price by the exponents: $5x + 3y = 2\\left(\\dfrac{5x}{2}\\right) + 3\\left(\\dfrac{3y}{3}\\right) = 2\\left(\\dfrac{5x}{2}\\right) + 3y = 15$ — the block $\\dfrac{5x}{2}$ twice, the block $y$ thrice.',
      'Weighted AM-GM on the blocks: $\\dfrac{15}{5} = 3 \\geq \\left[\\left(\\dfrac{5x}{2}\\right)^2 y^3\\right]^{1/5}$, so the priced product is at most $3^5 = 243$.',
      'Clear the pricing: $\\left(\\dfrac{25}{4}\\right)x^2 y^3 \\leq 243$, so $x^2y^3 \\leq \\dfrac{972}{25} = 38.88$.',
      'The seat: $\\dfrac{5x}{2} = y = 3$ gives $\\left(\\dfrac{6}{5}, 3\\right)$ — the constraint checks ($6 + 9 = 15$) and the value $\\left(\\dfrac{36}{25}\\right) \\cdot 27 = \\dfrac{972}{25}$ lands exactly on the bound.',
      'Hence, the greatest value is $\\dfrac{972}{25} = 38.88$, attained at $\\left(\\dfrac{6}{5},\\ 3\\right)$ — and the engines swept the whole line and never beat it.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Price BOTH factors: the coefficient-blind fraud', text: 'The block is $\\dfrac{\\alpha x}{a}$ — divided by the exponent AND by the coefficient. Price only one factor and the bound you prove is true but hopeless: on Illustration 5\u2019s own data, forgetting the coefficients entirely yields the bound $x^2y^3 \\leq \\left(\\frac{15}{5}\\right)^5 \\cdot 2^2 \\cdot 3^3 = 26{,}244$ — true, but a factor of exactly 675 looser than the sharp $\\frac{972}{25}$. A true-but-unsharp bound scores nothing on a "find the greatest value" item: the engines priced every distractor of this shape in the quiz below for exactly this reason.' },
    { kind: 'example', title: 'Find the maximum value of (5 − x)³(x + 3)⁵ for −3 < x < 5 (exam-style)', steps: [
      'Both factors are positive on the interval, and they SUM to a constant: with $p = 5 - x$ and $q = x + 3$, the constraint is $p + q = 8$ — the un-priced line.',
      'Weight the blocks: $3\\left(\\dfrac{p}{3}\\right) + 5\\left(\\dfrac{q}{5}\\right) = p + q = 8$, so $\\dfrac{8}{8} = 1 \\geq \\left[\\left(\\dfrac{p}{3}\\right)^3\\left(\\dfrac{q}{5}\\right)^5\\right]^{1/8}$.',
      'Hence $\\left(\\dfrac{p}{3}\\right)^3\\left(\\dfrac{q}{5}\\right)^5 \\leq 1$, and clearing the pricing gives $p^3q^5 \\leq 3^3 \\cdot 5^5 = 84{,}375$.',
      'The seat: $\\dfrac{p}{3} = \\dfrac{q}{5} = 1$ gives $p = 3,\\ q = 5$, that is $x = 2$ — inside the interval, and $(5-2)^3(2+3)^5 = 27 \\cdot 3125 = 84{,}375$ lands on the bound.',
      'Hence, the maximum is $84{,}375$ at $x = 2$ — the $(7-x)^4(2+x)^5$ family\u2019s craft on our own numbers.',
    ] },
    { kind: 'para', text: 'A family the weighted engine eats that even AA 2.1\u2019s vertex craft could not touch: the probability-flavoured products $x^a(1-x)^b$. A quadratic $x(1-x)$ has a vertex and AA 2.1 read its maximum from it; a cubic like $x^2(1-x)^3$ has no vertex machinery at all — but it is a monomial under the hidden constraint $x + (1 - x) = 1$, and normalization takes it apart in one line. The craft: price the two blocks by the exponents, exactly as on a priced line, with $c = 1$.' },
    { kind: 'example', title: 'Maximise x²(1 − x)³ on the interval (0, 1)', steps: [
      'The hidden constraint: $x + (1 - x) = 1$, priced as $2\\left(\\dfrac{x}{2}\\right) + 3\\left(\\dfrac{1-x}{3}\\right) = 1$.',
      'Weighted AM-GM on the blocks: $\\left(\\dfrac{x}{2}\\right)^2\\left(\\dfrac{1-x}{3}\\right)^3 \\leq \\left(\\dfrac{1}{5}\\right)^5 = \\dfrac{1}{3125}$.',
      'Clear the pricing: $x^2(1-x)^3 \\leq \\dfrac{2^2 \\cdot 3^3}{5^5} = \\dfrac{108}{3125} \\approx 0.0346$.',
      'The seat: $\\dfrac{x}{2} = \\dfrac{1-x}{3} = \\dfrac{1}{5}$ gives $x = \\dfrac{2}{5}$ — and $\\left(\\dfrac{2}{5}\\right)^2\\left(\\dfrac{3}{5}\\right)^3 = \\dfrac{108}{3125}$ checks exactly.',
      'Hence, the maximum is $\\dfrac{108}{3125}$ at $x = \\dfrac{2}{5}$ — the vertex-free cubic, priced and finished in four moves.',
    ] },

    { kind: 'heading', text: 'Three Variables and Symmetric Bounds' },
    { kind: 'para', text: 'The same engine drives the three-variable bounds that 4.1 stated for the equal-weight case. The symmetric pair: if $a + b + c = S$ then $abc \\leq \\left(\\frac{S}{3}\\right)^3$ (the plain law, weights $(1, 1, 1)$); if $abc = P$ then $a + b + c \\geq 3P^{1/3}$ (the $GM \\leq AM$ law read the other way). The ASYMMETRIC upgrades are where the weighted engine earns its keep — monomials like $a^2bc$ or $a^3b^2c$ under the same sum constraint, where the exponents disagree and the plain law is simply the wrong tool.' },
    { kind: 'callout', tone: 'theorem', title: 'The three-variable symmetric bounds, with their equality cases', text: 'For positive $a, b, c$: with the sum fixed $a + b + c = S$, the product satisfies $abc \\leq \\left(\\dfrac{S}{3}\\right)^3$, equality exactly at $a = b = c = \\dfrac{S}{3}$; with the product fixed $abc = P$, the sum satisfies $a + b + c \\geq 3\\,P^{1/3}$, equality exactly at $a = b = c = P^{1/3}$. The asymmetric upgrades ride the weighted law: for whole exponents summing to $W$ on the constraint $a + b + c = S$, the monomial $a^pb^qc^r \\leq \\left(\\dfrac{S}{W}\\right)^W p^pq^qr^r$, equality exactly at $a : b : c = p : q : r$.' },
    { kind: 'example', title: 'Maximise a²bc subject to a + b + c = 12 (a, b, c > 0)', steps: [
      'Price by the exponents: $2\\left(\\dfrac{a}{2}\\right) + 1 \\cdot b + 1 \\cdot c = 12$ — the block $\\dfrac{a}{2}$ twice, $b$ and $c$ once each; total weight $4$.',
      'Weighted AM-GM: $\\left(\\dfrac{a}{2}\\right)^2 bc \\leq \\left(\\dfrac{12}{4}\\right)^4 = 3^4 = 81$.',
      'Clear the pricing: $a^2bc \\leq 4 \\cdot 81 = 324$.',
      'The seat: $\\dfrac{a}{2} = b = c = 3$, that is $(a, b, c) = (6, 3, 3)$ — sum $12$ checks, and $36 \\cdot 3 \\cdot 3 = 324$ lands on the bound; the engines swept the simplex and never beat it.',
      'Hence, the maximum is $324$ at $(6, 3, 3)$ — note the seat is NOT the equal split: the exponent 2 pushes $a$ to double share.',
    ] },
    { kind: 'example', title: 'Prove the two-sided self-weighted bound for x, y > 0 and witness it at (2, 8)', steps: [
      'Left flank: run the weighted AM-GM with the weights $(x, y)$ on the entries $(x, y)$ themselves — the weighted arithmetic mean is $\\dfrac{x^2 + y^2}{x+y}$, the weighted geometric mean is $\\left(x^xy^y\\right)^{1/(x+y)}$; raise to the power $x + y$.',
      'Right flank: the same weights on the reciprocals $\\left(\\dfrac{1}{x}, \\dfrac{1}{y}\\right)$ — the weighted arithmetic mean is $\\dfrac{2}{x+y}$, and the law gives $\\dfrac{2}{x+y} \\geq \\left(x^{-x}y^{-y}\\right)^{1/(x+y)}$.',
      'Reciprocate the right flank (order flips on positives): $\\left(x^xy^y\\right)^{1/(x+y)} \\geq \\dfrac{x+y}{2}$; raise — the bound $x^xy^y \\geq \\left(\\dfrac{x+y}{2}\\right)^{x+y}$.',
      'Witness at $(2, 8)$: the left base $\\dfrac{4 + 64}{10} = 6.8$ with $6.8^{10} \\approx 2.115 \\times 10^8$; the middle $2^2 \\cdot 8^8 = 2^{26} = 67{,}108{,}864$; the right $\\left(\\dfrac{10}{2}\\right)^{10} = 5^{10} = 9{,}765{,}625$ — the sandwich $2.115 \\times 10^8 \\geq 67{,}108{,}864 \\geq 9{,}765{,}625$ holds.',
      'Hence, $\\left[\\dfrac{x^2+y^2}{x+y}\\right]^{x+y} \\geq x^xy^y \\geq \\left[\\dfrac{x+y}{2}\\right]^{x+y}$ — each number carries itself as its own weight.',
    ] },
    { kind: 'equation', latex: '\\left[\\frac{x^2 + y^2}{x+y}\\right]^{x+y} \\;\\geq\\; x^{x}\\,y^{y} \\;\\geq\\; \\left[\\frac{x+y}{2}\\right]^{x+y} \\tag{6}', note: 'the self-weighted bound — the weights are the entries themselves, so the law is being applied with REAL weights; the whole-number proof covers rational seats, the real-weight doorstep covers the rest, and the engines witness it numerically.' },
    { kind: 'para', text: 'One honesty note before the table, because equation (6) quietly crosses a boundary: the weights $x, y$ here are arbitrary positive REALS, not whole numbers. The self-weighted bound therefore rides the real-weight statement of this lesson — proved outright for rational $x, y$ (scaling), witnessed numerically by the engines for irrational seats, and honestly labelled as resting on the chapter 9 doorstep for the general proof. The book does not pretend otherwise; that is the honesty discipline the ladder\u2019s $M_0$ rung already established.' },

    { kind: 'heading', text: 'Exam Speed: the Exponent-Priced Split' },
    { kind: 'para', text: 'The un-priced constraint $x + y = n$ deserves its own reflex, because it is the shape the exam bank actually prints. Split the sum so that $x : y = a : b$ — the exponent prices the split — and the maximum of $x^ay^b$ is $\\left(\\dfrac{n}{a+b}\\right)^{a+b}a^ab^b$, attained exactly there. The reason is the normalization lemma with $\\alpha = \\beta = 1$: the blocks are $\\frac{x}{a}$ and $\\frac{y}{b}$, the weighted mean is $\\dfrac{n}{a+b}$, and the seat condition $\\dfrac{x}{a} = \\dfrac{y}{b} = \\dfrac{n}{a+b}$ IS the ratio split. Equal exponents give the equal split — 4.1\u2019s answer — so the plain law is visible inside the rule as its $a = b$ row.' },
    { kind: 'example', title: 'Split x + y = 12 so that x³y is maximum, and give the maximum (exam-style)', steps: [
      'Price the split: the exponents $(3, 1)$ say $x : y = 3 : 1$ — so the seat is $x = 9,\\ y = 3$ before any computation.',
      'Confirm by the engine: $3\\left(\\dfrac{x}{3}\\right) + 1 \\cdot y = 12$ gives $\\left(\\dfrac{x}{3}\\right)^3 y \\leq \\left(\\dfrac{12}{4}\\right)^4 = 81$.',
      'Clear: $x^3y \\leq 3^3 \\cdot 81 = 2187$.',
      'Check the seat: $9^3 \\cdot 3 = 729 \\cdot 3 = 2187$ — exact; the grid sweep of the engines confirms no split beats it.',
      'Hence, the split is $(9, 3)$ and the maximum is $2187$ — the exponent-priced split, read off then verified.',
    ] },
    { kind: 'table', caption: 'The exponent-priced splits — every seat and value recomputed by the engines (the last two rows carry the probability-flavoured and three-variable shapes).', head: ['Constraint', 'Monomial', 'Equality seat', 'Maximum'], rows: [
      ['$x + y = 12$', '$x^3y$', '$(9,\\ 3)$ — split $3 : 1$', '$2187$'],
      ['$5x + 3y = 15$', '$x^2y^3$', '$\\left(\\dfrac{6}{5},\\ 3\\right)$', '$\\dfrac{972}{25} = 38.88$'],
      ['$x + (1 - x) = 1$', '$x^2(1-x)^3$', '$\\left(\\dfrac{2}{5},\\ \\dfrac{3}{5}\\right)$ — split $2 : 3$', '$\\dfrac{108}{3125} \\approx 0.0346$'],
      ['$a + b + c = 12$', '$a^2bc$', '$(6,\\ 3,\\ 3)$ — split $2 : 1 : 1$', '$324$'],
      ['$a + b + c = 6$', '$a^3b^2c$', '$(3,\\ 2,\\ 1)$ — split $3 : 2 : 1$', '$108$'],
    ] },
    { kind: 'callout', tone: 'insight', title: 'The split is priced by the exponent', text: 'The table\u2019s reading, once and for all: on an un-priced sum, the maximising split of $x^ay^b$ is exactly $a : b$ — the share ratios ARE the exponents. Symmetric products take the equal split (4.1\u2019s world); asymmetric products take the priced one (this lesson\u2019s). And the three-variable row $(3, 2, 1)$ shows the rule scales: $a^3b^2c$ on a sum of 6 splits as $3 : 2 : 1$ into $(3, 2, 1)$ — the exponents, seated verbatim.' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'The JEE Main 2026 mathematics unit list carries no separate inequalities unit — the honest audit note this book records — so mean-inequality items ride the algebra bank and the aptitude side (Khattar QA): the staples are exactly this lesson\u2019s machinery, the least value of $4a^2 + 9b^2$-sums under a linear constraint (the $M_2$ rung with pricing), the maximum of an asymmetric monomial on a priced line (the normalization craft), the rung comparisons, and the split-and-maximise family. NCERT class 11 ch. 5 carries the linear-inequality order ground that is this lesson\u2019s prerequisite; the weighted and power means are competitive depth beyond the school canon. Every item in this lesson is exam-style — our own designs, labelled honestly, never lifted from any paper.' },
    { kind: 'para', text: 'What waits above, in order. Lesson 4.3 proves Cauchy-Schwarz by the AL 9.3 discriminant discipline one storey higher and derives Engel\u2019s form — the fraction-sum engine that bounds $\\sum \\frac{a}{b}$ sums far more sharply than the means can; when a denominator carries variables, that is the tool, not this one. Lesson 4.4 builds the rearrangement and Chebyshev inequalities on ordered sequences. Lesson 4.5 proves Jensen\u2019s inequality from chords — and there the ladder\u2019s full monotone statement and the AM-GM itself both fall out of one convexity engine, the reunion this lesson has twice promised. Chapter 5 inserts means BETWEEN numbers (the AM-GM insertion problems of the progressions ground); chapter 7\u2019s induction finally certifies the general-length plain law that replication leaned on; and chapter 9\u2019s logarithm converts the weighted engine into one line — the three named promises of this lesson, all banked as promises, none cashed early.' },

    { kind: 'terms', items: [
      { term: 'Weighted arithmetic mean', def: 'the replication-priced average $A_w = \\frac{\\sum w_ix_i}{\\sum w_i}$ of positive entries under positive weights — the plain arithmetic mean of the repeated list.' },
      { term: 'Weighted geometric mean', def: 'the replication-priced root $G_w = \\left(\\prod x_i^{w_i}\\right)^{1/\\sum w_i}$ — the plain geometric mean of the repeated list; $A_w \\geq G_w$ with equality exactly at the all-equal tuple.' },
      { term: 'Replication proof', def: 'the honest engine for whole-number weights: a weight of $m$ on $x$ means $x$ appears $m$ times in the plain AM-GM list — the weighted law is 4.1\u2019s plain law read on a longer list, nothing new assumed.' },
      { term: 'Power mean of order r', def: 'the rung $M_r = \\left(\\frac{\\sum x_i^{r}}{n}\\right)^{1/r}$ for $r \\neq 0$: $M_1 = A$, $M_2 = Q$, $M_{-1} = H$, and $M_0$ read honestly as the limit $r \\to 0$, which is $G$.' },
      { term: 'Ladder law', def: 'the monotonicity of the power means: $r < s \\Rightarrow M_r \\leq M_s$ on positive tuples, equality exactly at the all-equal tuple — the chain $H \\leq G \\leq A \\leq Q$ as ONE law.' },
      { term: 'Quadratic mean', def: 'the $M_2$ rung (the root mean square) $\\sqrt{\\frac{\\sum x_i^2}{n}}$ — the one named rung that lives on ALL real tuples, negatives included.' },
      { term: 'Normalization', def: 'the exam craft of pricing the blocks $\\alpha x / a$ so a linear constraint becomes the plain sum of the replicated list — turning an asymmetric-monomial maximum into one application of the weighted law.' },
      { term: 'Exponent-priced split', def: 'the rule that the maximising split of a fixed sum for $x^ay^b$ allocates $x : y = a : b$ — the exponents are the shares; equal exponents give the equal split.' },
      { term: 'Self-weighted bound', def: 'the two-sided family $\\left[\\frac{\\sum x^2}{\\sum x}\\right]^{\\sum x} \\geq \\prod x^x \\geq \\left[\\frac{\\sum x}{n}\\right]^{\\sum x}$, in which each number carries itself as its own weight.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: weights and rungs', items: [
      { q: 'With weights $(3, 1)$ on the pair $(16, 2)$, the weighted geometric mean $G_w$ equals:', options: ['$2^{13/4}$', '$2^{7/2}$', '$\\dfrac{25}{2}$', '$4\\sqrt{2}$'], answer: 0, explain: 'Replicate: the list $[16, 16, 16, 2]$ has product $16^3 \\cdot 2 = 2^{13}$, so $G_w = 2^{13/4} \\approx 9.51$ (option A). Option B is the weights-$(3, 2)$ slip — it prices $y$ with weight 2; option C reports the weighted ARITHMETIC mean $A_w = \\frac{48 + 2}{4} = 12.5$ seated in the geometric spot; option D is 4.1\u2019s plain unweighted $\\sqrt{16 \\cdot 2} = \\sqrt{32}$ — the unweighted mean used where the weighted is due.' },
      { q: 'For the tuple $(1, 4, 16)$, which rung of the power-mean ladder reads the SMALLEST value?', options: ['$M_2 = \\sqrt{91}$', '$M_1 = 7$', '$M_0 = 4$', '$M_{-1} = \\dfrac{16}{7}$'], answer: 3, explain: 'The ladder law is monotone in the order $r$: $M_{-1} \\leq M_0 \\leq M_1 \\leq M_2$ on positive tuples, so the harmonic rung bottoms the ladder — $\\frac{16}{7} \\approx 2.29$ (option D). Option A is the TOP rung, the classic reversal fraud — the quadratic mean is the largest, never the smallest; option B is the arithmetic middle rung; option C is the geometric rung, which sits between $M_{-1}$ and $M_1$ (as the honest limit) and is not the minimum here.' },
      { q: 'The greatest value of $x^2y^3$ on the line $5x + 3y = 15$ ($x, y > 0$) is:', options: ['$\\dfrac{972}{25}$', '$26{,}244$', '$243$', '$3$'], answer: 0, explain: 'Normalize: price the blocks $\\frac{5x}{2}$ (twice) and $y$ (thrice) — their weighted mean is $\\frac{15}{5} = 3$, so $\\left(\\frac{5x}{2}\\right)^2y^3 \\leq 243$, giving $x^2y^3 \\leq \\frac{4}{25} \\cdot 243 = \\frac{972}{25} = 38.88$ at the seat $\\left(\\frac{6}{5}, 3\\right)$ (option A). Option B is the coefficient-blind bound $\\left(\\frac{15}{5}\\right)^5 \\cdot 2^2 \\cdot 3^3$ — it forgets to divide the entries by $\\alpha, \\beta$ and is true but unsharp by a factor of 675; option C bounds the PRICED product $\\left(\\frac{5x}{2}\\right)^2y^3 \\leq 3^5$ and forgets to strip the pricing; option D reports the common block VALUE $\\frac{5x}{2} = y = 3$ at the seat — the equality price, not the maximum.' },
      { q: 'If $a^4 + b^4 = 32$ with $a, b > 0$, then $a + b$ can never exceed:', options: ['$2^{9/4}$', '$4$', '$\\sqrt{32}$', '$32$'], answer: 1, explain: 'The rung $M_1 \\leq M_4$: $\\frac{a+b}{2} \\leq \\left(\\frac{a^4+b^4}{2}\\right)^{1/4} = 16^{1/4} = 2$, so $a + b \\leq 4$, attained at $a = b = 2$ (option B). Option A doubles the fourth root of the whole SUM — $2 \\cdot 32^{1/4} = 2^{9/4}$ — forgetting that the mean halves before the root; option C is $\\sqrt{32}$, the quadratic mean of the pair $(a^4, b^4)$ — the second-power rung applied one layer of the ladder too low; option D reports the constraint itself, which bounds $a^4 + b^4$, not $a + b$.' },
      { q: 'Which statement about $a^ab^b$ is the honest one, for positive reals $a, b$?', options: ['$a^ab^b \\leq \\left(\\dfrac{a+b}{2}\\right)^{a+b}$', '$a^ab^b = \\left(\\dfrac{a+b}{2}\\right)^{a+b}$ always', '$a^ab^b \\geq \\left(\\dfrac{a+b}{2}\\right)^{a+b}$ for ALL positive reals', 'the bound holds only when $a, b$ are whole numbers'], answer: 2, explain: 'The self-weighted read: weights $(a, b)$ on the reciprocals $\\left(\\frac{1}{a}, \\frac{1}{b}\\right)$ give the right flank of the two-sided bound — $a^ab^b \\geq \\left(\\frac{a+b}{2}\\right)^{a+b}$ for every pair of positive reals (option C; witnessed at $(2, 8)$: $2^2 \\cdot 8^8 = 67{,}108{,}864 \\geq 5^{10} = 9{,}765{,}625$). Option A reverses the inequality; option B claims equality always — but equality needs $a = b$ exactly; option D is the honesty trap: the LAW holds for all positive weights — the replication PROOF covers whole weights, scaling covers rationals, and the chapter 9 limit doorstep covers the reals — so "whole numbers only" reports a property of one proof, not of the theorem.' },
    ] },

    { kind: 'exercises', title: 'Exercises 4.2', sets: [
      { level: 'L1', questions: [
        { q: 'For the weights $(3, 1)$ on the pair $(3, 27)$, compute the weighted arithmetic mean $A_w$ and the weighted geometric mean $G_w$, and verify the law.', solution: [
          'Replicate first: the weighted means are the plain means of the list $[3, 3, 3, 27]$ — four entries, sum $36$, product $27 \\cdot 27 = 729$.',
          'So $A_w = \\dfrac{36}{4} = 9$ and $G_w = 729^{1/4} = 3^{6/4} = 3\\sqrt{3} \\approx 5.196$.',
          'Verify without decimals — fourth powers: $9^4 = 6561$ against $\\left(3\\sqrt{3}\\right)^4 = 81 \\cdot 9 = 729$; the law holds, strict since $3 \\neq 27$.',
        ], answer: '$A_w = 9$, $G_w = 3\\sqrt{3} \\approx 5.196$' },
        { q: 'Compute $M_{-1}$, $M_0$, $M_1$ and $M_2$ for the triple $(1, 1, 4)$, and order them on the ladder.', solution: [
          'The bottom rung: $M_{-1} = \\dfrac{3}{1 + 1 + \\frac{1}{4}} = \\dfrac{3}{\\frac{9}{4}} = \\dfrac{4}{3}$.',
          'The limit rung: $M_0 = \\sqrt[3]{1 \\cdot 1 \\cdot 4} = \\sqrt[3]{4} \\approx 1.587$, read honestly as the limit case.',
          'The named rungs: $M_1 = \\dfrac{1 + 1 + 4}{3} = 2$ and $M_2 = \\sqrt{\\dfrac{1 + 1 + 16}{3}} = \\sqrt{6} \\approx 2.449$.',
          'Hence the ladder reads $\\dfrac{4}{3} < \\sqrt[3]{4} < 2 < \\sqrt{6}$ — strict at every rung, because the entries differ.',
        ], answer: '$M_{-1} = \\dfrac{4}{3}$, $M_0 = \\sqrt[3]{4}$, $M_1 = 2$, $M_2 = \\sqrt{6}$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Compute $A_w$ and $G_w$ for the weights $\\left(\\dfrac{1}{2}, \\dfrac{1}{3}, \\dfrac{1}{6}\\right)$ on the triple $(16, 4, 108)$, after scaling to whole numbers.', solution: [
          'Scale by the common denominator $6$: the weights become $(3, 2, 1)$, and the scaling law (equation (2)) leaves both means untouched.',
          'Weighted arithmetic mean: $A_w = \\dfrac{3 \\cdot 16 + 2 \\cdot 4 + 108}{6} = \\dfrac{48 + 8 + 108}{6} = \\dfrac{164}{6} = \\dfrac{82}{3} \\approx 27.33$.',
          'Weighted geometric mean: $G_w = \\left(16^3 \\cdot 4^2 \\cdot 108\\right)^{1/6} = \\left(2^{18} \\cdot 3^3\\right)^{1/6} = 8\\sqrt{3} \\approx 13.86$.',
          'Verify by squares: $\\left(\\dfrac{82}{3}\\right)^2 = \\dfrac{6724}{9} \\approx 747$ against $\\left(8\\sqrt{3}\\right)^2 = 192$ — the law holds with room to spare, strict since the entries differ.',
        ], answer: '$A_w = \\dfrac{82}{3} \\approx 27.33$; $G_w = 8\\sqrt{3} \\approx 13.86$' },
        { q: 'Show that equal weights reduce the weighted means to 4.1\u2019s plain means, and witness the reduction at the pair $(3, 12)$ with weights $(2, 2)$.', solution: [
          'With weights $(2, 2)$ the replicated list is $[3, 3, 12, 12]$ — every entry repeated the same number of times.',
          'The plain means of that list: $A = \\dfrac{30}{4} = 7.5$ and $G = \\left(3^2 \\cdot 12^2\\right)^{1/4} = \\sqrt{3 \\cdot 12} = 6$ — exactly 4.1\u2019s $A$ and $G$ for the pair $(3, 12)$.',
          'The identity behind it: $\\left(x^2y^2\\right)^{1/4} = \\left(xy\\right)^{1/2}$ — an even root of a square product is the plain geometric mean, so equal weights are no weights at all.',
          'Hence 4.1\u2019s entire engine is the equal-weight row of this lesson\u2019s family — the weighted law contains the plain law, and the engines verify the reduction on every pair swept.',
        ], answer: 'weights $(2, 2)$ give $A_w = 7.5 = A$ and $G_w = 6 = G$ — the plain pair' },
      ] },
      { level: 'L3', questions: [
        { q: 'If $a^4 + b^4 = 162$ with $a, b > 0$, prove that $a + b \\leq 6$, and name the equality seat.', solution: [
          'The rung route: $M_1 \\leq M_4$ on the pair $(a, b)$ gives $\\dfrac{a+b}{2} \\leq \\left(\\dfrac{a^4 + b^4}{2}\\right)^{1/4}$.',
          'The right side: $\\left(\\dfrac{162}{2}\\right)^{1/4} = 81^{1/4} = 3$.',
          'So $a + b \\leq 6$ — and the seat must level the ladder: $a = b = 3$, which checks: $81 + 81 = 162$ with $a + b = 6$.',
          'Hence the bound is sharp — no positive pair on the constraint reaches past $6$.',
        ], answer: '$a + b \\leq 6$, equality at $a = b = 3$' },
        { q: 'Find the greatest value of $x^2y^3$ under the constraint $5x + 2y = 10$ ($x, y > 0$), with the equality seat.', solution: [
          'Price the blocks by the exponents: $5x + 2y = 2\\left(\\dfrac{5x}{2}\\right) + 3\\left(\\dfrac{2y}{3}\\right) = 10$.',
          'Weighted AM-GM: $\\dfrac{10}{5} = 2 \\geq \\left[\\left(\\dfrac{5x}{2}\\right)^2\\left(\\dfrac{2y}{3}\\right)^3\\right]^{1/5}$, so the priced product is at most $2^5 = 32$.',
          'Clear the pricing: $\\dfrac{25}{4} \\cdot \\dfrac{8}{27} \\cdot x^2y^3 \\leq 32$, so $x^2y^3 \\leq 32 \\cdot \\dfrac{4}{25} \\cdot \\dfrac{27}{8} = \\dfrac{432}{25} = 17.28$.',
          'The seat: $\\dfrac{5x}{2} = \\dfrac{2y}{3} = 2$ gives $x = \\dfrac{4}{5},\\ y = 3$ — the constraint checks ($4 + 6 = 10$) and $\\left(\\dfrac{4}{5}\\right)^2 \\cdot 27 = 17.28$ lands exactly.',
        ], answer: 'maximum $\\dfrac{432}{25} = 17.28$ at $\\left(\\dfrac{4}{5},\\ 3\\right)$' },
        { q: 'With $a + b + c = 6$ ($a, b, c > 0$), find the maximum of $abc$ and of $a^2bc$, with both equality seats.', solution: [
          'The symmetric bound: $abc \\leq \\left(\\dfrac{6}{3}\\right)^3 = 8$ at $a = b = c = 2$ — the plain law\u2019s equal-weight row.',
          'The asymmetric bound: price $a$ with weight 2 — $2\\left(\\dfrac{a}{2}\\right) + b + c = 6$, so $\\left(\\dfrac{a}{2}\\right)^2bc \\leq \\left(\\dfrac{6}{4}\\right)^4 = \\dfrac{81}{16}$.',
          'Clear: $a^2bc \\leq 4 \\cdot \\dfrac{81}{16} = \\dfrac{81}{4} = 20.25$, with seat $\\dfrac{a}{2} = b = c = \\dfrac{3}{2}$, that is $\\left(3, \\dfrac{3}{2}, \\dfrac{3}{2}\\right)$.',
          'Checks: $9 \\cdot \\dfrac{3}{2} \\cdot \\dfrac{3}{2} = 20.25$ and $3 + 1.5 + 1.5 = 6$ — both bounds sharp, and the engines swept the simplex to confirm.',
        ], answer: '$abc \\leq 8$ at $(2, 2, 2)$; $a^2bc \\leq \\dfrac{81}{4}$ at $\\left(3, \\dfrac{3}{2}, \\dfrac{3}{2}\\right)$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Single Correct (exam-style): if $a^2 + b^2 = 40$ with $a, b > 0$, the greatest value of $ab$ is: (A) $20$ (B) $400$ (C) $40$ (D) $12$', solution: [
          'The move hides in plain sight: AM-GM on the pair $(a^2, b^2)$ — not on $(a, b)$ — gives $\\dfrac{a^2 + b^2}{2} \\geq \\sqrt{a^2b^2} = ab$.',
          'So $ab \\leq \\dfrac{40}{2} = 20$, with equality at $a^2 = b^2 = 20$, that is $a = b = 2\\sqrt{5}$.',
          'The distractors priced: (B) $400$ is the maximum of $a^2b^2$ — the squared product reported before its root is taken; (C) $40$ reports the constraint itself as the bound; (D) $12$ is an honest value at the true seat $(2, 6)$ of the constraint — a value, not the maximum.',
          'Hence option (A).',
        ], answer: '(A) $20$' },
        { q: 'Multiple Correct (exam-style): for $x, y > 0$ with $x + y = 2$, which of the following hold for ALL such pairs? (I) $xy \\leq 1$; (II) $x^2 + y^2 \\geq 2$; (III) $x^3y \\leq \\dfrac{27}{16}$; (IV) $\\dfrac{1}{x} + \\dfrac{1}{y} \\geq 4$', solution: [
          '(I) is 4.1\u2019s plain law: $xy \\leq \\left(\\dfrac{x+y}{2}\\right)^2 = 1$ — holds, equality at $x = y = 1$.',
          '(II) is this lesson\u2019s variance-square rung: $x^2 + y^2 \\geq \\dfrac{(x+y)^2}{2} = 2$ — holds, the same equality seat.',
          '(III) is the normalization craft with weights $(3, 1)$: $3\\left(\\dfrac{x}{3}\\right) + y = 2$ gives $\\dfrac{x^3y}{27} \\leq \\left(\\dfrac{2}{4}\\right)^4 = \\dfrac{1}{16}$, so $x^3y \\leq \\dfrac{27}{16}$ — holds, seat $\\left(\\dfrac{3}{2}, \\dfrac{1}{2}\\right)$.',
          '(IV) fails: at $x = y = 1$ the sum reads $2$, not $4$ — the sharp truth is $\\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{x+y}{xy} \\geq \\dfrac{2}{1} = 2$.',
          'Hence (I), (II) and (III) hold; (IV) is the unpriced-exponent fraud.',
        ], answer: '(I), (II), (III) hold; (IV) fails' },
        { q: 'Linked comprehension (exam-style): a budget of 12 is split as $x + y = 12$ with $x, y > 0$. (i) Find the maximum of $x^2y$ and its split. (ii) Find the maximum of $x^2y^2$ and its split. (iii) Find the maximum of $x^3y$ and its split — then state the rule the three splits obey.', solution: [
          '(i) weights $(2, 1)$: $2\\left(\\dfrac{x}{2}\\right) + y = 12$ gives $\\left(\\dfrac{x}{2}\\right)^2y \\leq \\left(\\dfrac{12}{3}\\right)^3 = 64$, so $x^2y \\leq 4 \\cdot 64 = 256$ at $\\dfrac{x}{2} = y = 4$ — the split $(8, 4)$.',
          '(ii) equal weights: $x^2y^2 \\leq \\left(\\dfrac{12}{2}\\right)^4 = 1296$ at $x = y = 6$ — the plain equal split, 4.1\u2019s own answer.',
          '(iii) weights $(3, 1)$: $\\left(\\dfrac{x}{3}\\right)^3y \\leq \\left(\\dfrac{12}{4}\\right)^4 = 81$, so $x^3y \\leq 27 \\cdot 81 = 2187$ at $\\dfrac{x}{3} = y = 3$ — the split $(9, 3)$.',
          'The rule: the split is priced by the exponent — $x$ takes the share proportional to its own exponent ($2 : 1$ gives $8 : 4$, $3 : 1$ gives $9 : 3$), and equal exponents give the equal split.',
        ], answer: '(i) $256$ at $(8, 4)$; (ii) $1296$ at $(6, 6)$; (iii) $2187$ at $(9, 3)$ — the exponent prices the split' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove the three-term two-sided bound: for $x, y, z > 0$, $\\left[\\dfrac{x^2 + y^2 + z^2}{x+y+z}\\right]^{x+y+z} \\geq x^xy^yz^z \\geq \\left[\\dfrac{x+y+z}{3}\\right]^{x+y+z}$; witness it at $(1, 2, 5)$.', solution: [
          'Left flank: weights $(x, y, z)$ on the entries $(x, y, z)$ — the weighted AM-GM reads $\\dfrac{x^2 + y^2 + z^2}{x+y+z} \\geq \\left(x^xy^yz^z\\right)^{1/(x+y+z)}$; raise to the power $x + y + z$.',
          'Right flank: the same weights on the reciprocals $\\left(\\dfrac{1}{x}, \\dfrac{1}{y}, \\dfrac{1}{z}\\right)$: the weighted arithmetic mean is $\\dfrac{3}{x+y+z}$ and the weighted geometric mean is $\\left(x^xy^yz^z\\right)^{-1/(x+y+z)}$.',
          'So $\\dfrac{3}{x+y+z} \\geq \\left(x^xy^yz^z\\right)^{-\\frac{1}{x+y+z}}$; reciprocate (order flips on positives) and raise: $x^xy^yz^z \\geq \\left(\\dfrac{x+y+z}{3}\\right)^{x+y+z}$.',
          'Witness at $(1, 2, 5)$: left base $\\dfrac{1 + 4 + 25}{8} = 3.75$ with $3.75^8 \\approx 39{,}109$; middle $1 \\cdot 4 \\cdot 3125 = 12{,}500$; right base $\\dfrac{8}{3}$ with $\\left(\\dfrac{8}{3}\\right)^8 \\approx 2{,}557$ — the sandwich holds.',
        ], answer: 'the two-sided bound proved; at $(1, 2, 5)$: $39{,}109 \\geq 12{,}500 \\geq 2{,}557$' },
        { q: 'Prove that $1^1 \\cdot 2^2 \\cdot 3^3 \\cdot 4^4 < 3^{10}$, using the weights $(1, 2, 3, 4)$ on the entries $(1, 2, 3, 4)$; then say what chapter 5 must bank before the general-$n$ version follows.', solution: [
          'The self-priced roster: the weighted arithmetic mean with weights $(1, 2, 3, 4)$ on $(1, 2, 3, 4)$ is $\\dfrac{1 \\cdot 1 + 2 \\cdot 2 + 3 \\cdot 3 + 4 \\cdot 4}{1 + 2 + 3 + 4} = \\dfrac{30}{10} = 3$.',
          'The weighted geometric mean is $\\left(1^1 2^2 3^3 4^4\\right)^{1/10}$, so the law reads $3 \\geq \\left(1^12^23^34^4\\right)^{1/10}$.',
          'Raise to the tenth: $1^12^23^34^4 \\leq 3^{10} = 59{,}049$; the left side is $1 \\cdot 4 \\cdot 27 \\cdot 256 = 27{,}648 < 59{,}049$ — strict, because the entries differ.',
          'The general-$n$ version — the bound $\\left(\\dfrac{2n+1}{3}\\right)^{\\frac{n(n+1)}{2}}$ for $1^12^2\\cdots n^n$ — needs the closed forms of $\\sum i$ and $\\sum i^2$ as the weighted mean, which chapter 5\u2019s special sums will bank: a NAMED promise, not cashed here.',
        ], answer: '$1^12^23^34^4 = 27{,}648 < 3^{10} = 59{,}049$; the general $n$ rides chapter 5\u2019s power sums' },
        { q: 'The weighted law is stated for all real weights $w > 0$. (i) Compute $A_w$ and $G_w$ for the weights $\\left(\\sqrt{2}, 1\\right)$ on the pair $(4, 9)$, to four decimals. (ii) Say honestly why the replication proof cannot reach these weights, and which engine eventually will.', solution: [
          '(i) The weighted arithmetic mean: $A_w = \\dfrac{4\\sqrt{2} + 9}{\\sqrt{2} + 1}$; rationalise by multiplying through by $\\sqrt{2} - 1$ and it collapses to $5\\sqrt{2} - 1 \\approx 6.0711$.',
          '(i) The weighted geometric mean: $G_w = \\left(4^{\\sqrt{2}} \\cdot 9\\right)^{1/(1+\\sqrt{2})}$ — numerically $4^{\\sqrt{2}} \\approx 7.103$, so $G_w \\approx 63.93^{0.4142} \\approx 5.5946$.',
          'The law witnessed: $6.0711 \\geq 5.5946$ — a genuinely irrational-weight instance, checked by the engines to four decimals.',
          '(ii) Replication needs the weight to be a WHOLE number of copies — $\\sqrt{2}$ copies of 4 is not a list anyone can write — and scaling reaches only rationals. The engines that close the gap: a limit of rational weights (both sides are continuous in the weights), or, in one line, the logarithm when chapter 9\u2019s concavity engine arrives — a NAMED promise, deliberately not cashed in this book yet.',
        ], answer: '$A_w = 5\\sqrt{2} - 1 \\approx 6.0711 \\geq G_w \\approx 5.5946$; the proof door is chapter 9\u2019s logarithm' },
      ] },
      { level: 'L6', questions: [
        { q: 'The rung $M_2 \\geq M_1$ was proved for every REAL tuple; the rungs $M_0$ and $M_{-1}$ genuinely need positivity. Exhibit both facts: (i) tuples with negative entries where $M_2 \\geq M_1$ still holds; (ii) a negative tuple with positive product where $G \\leq A$ FAILS.', solution: [
          '(i) The pair $(-1, 1)$: $A = 0$ while $M_2 = \\sqrt{\\dfrac{1 + 1}{2}} = 1 \\geq 0$ — the variance square never consulted the signs.',
          'Again with $(-3, 4)$: $A = 0.5$, $M_2 = \\sqrt{12.5} \\approx 3.54$ — the rung holds on any real pair, and the engines swept $-6 \\leq a, b \\leq 6$ without one violation.',
          '(ii) The pair $(-4, -1)$: the product is $4$, so a formal geometric mean $G = 2$ exists — but $A = -2.5$, and $2 \\leq -2.5$ is FALSE: the geometric rung breaks off positives even when the product is positive.',
          'The honest boundary: the $M_2$ and $M_1$ rungs live on all of $\\mathbb{R}^n$; every rung that roots a PRODUCT — $M_0$, $M_{-1}$, and every fractional or odd order — is stated on positive tuples only. That is the positivity discipline of the ladder theorem.',
        ], answer: '(i) $(-1, 1)$ and $(-3, 4)$: QM ≥ AM holds; (ii) $(-4, -1)$: $G = 2 > A = -2.5$ — the G rung needs positivity' },
        { q: 'Numerical value (exam-style): for $a, b, c > 0$ with $a + b + c = 6$, the maximum of $a^3b^2c$ is ____ (give the exact value and the seat).', solution: [
          'Price by the exponents: $3\\left(\\dfrac{a}{3}\\right) + 2\\left(\\dfrac{b}{2}\\right) + 1 \\cdot c = 6$ — the blocks $\\dfrac{a}{3}$ (weight 3), $\\dfrac{b}{2}$ (weight 2), $c$ (weight 1); total weight 6.',
          'Weighted AM-GM: $\\left(\\dfrac{a}{3}\\right)^3\\left(\\dfrac{b}{2}\\right)^2c \\leq \\left(\\dfrac{6}{6}\\right)^6 = 1$.',
          'Clear the pricing: $a^3b^2c \\leq 3^3 \\cdot 2^2 \\cdot 1 = 108$.',
          'The seat: $\\dfrac{a}{3} = \\dfrac{b}{2} = c = 1$ gives $(a, b, c) = (3, 2, 1)$ — the constraint $3 + 2 + 1 = 6$ checks and $27 \\cdot 4 \\cdot 1 = 108$ lands on the bound; the engines swept the simplex and never beat it.',
        ], answer: '$108$ (at $a, b, c = 3, 2, 1$)' },
      ] },
    ] },
  ],
}

/* figures for lesson 4.2 — the replication list and the power ladder */

function weightReplicationSvg(): string {
  // left: the replicated list [4,4,4,9,9] with the weight braces;
  // right: the same facts read as weighted means (two bars)
  const boxes = [4, 4, 4, 9, 9].map((v, i) => {
    const x = 34 + i * 62
    return `<rect x="${x}" y="86" width="52" height="44" rx="7" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/><text x="${x + 26}" y="114" font-size="16" font-weight="700" text-anchor="middle" fill="#166534">${v}</text>`
  }).join('')
  const brace = (x1: number, x2: number, y: number, label: string, ly: number): string =>
    `<path d="M${x1},${y - 14} q6,10 14,10 h${x2 - x1 - 28} q8,0 14,-10" fill="none" stroke="#16a34a" stroke-width="1.6"/><text x="${(x1 + x2) / 2}" y="${ly}" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">${label}</text>`
  const bar = (y: number, len: number, color: string, label: string, val: string): string =>
    `<rect x="428" y="${y}" width="${len}" height="24" rx="4" fill="${color}"/><text x="440" y="${y + 17}" font-size="12" font-weight="700" fill="#ffffff">${label}</text><text x="${428 + len + 10}" y="${y + 17}" font-size="12" font-weight="700" fill="#166534">${val}</text>`
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels about weights as repetitions. Left panel: the weights three and two on the pair four and nine drawn as the plain five-entry list four, four, four, nine, nine — a green brace under the three fours labelled weight 3 on x, x repeated 3 times, and under the two nines labelled weight 2 on y, y repeated 2 times; below, the plain arithmetic mean of the list is 6 and the plain geometric mean is the fifth root of four cubed times nine squared, about 5.53. Right panel: the same facts read as weighted means — the amber bar A weighted equals 6 against the orange bar G weighted about 5.53, with the verdict the weighted law is the plain law on the longer list.">
  <text x="180" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the replication engine — weights (3, 2) on (4, 9)</text>
  <text x="560" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the same engine, read as weights</text>
  <line x1="360" y1="44" x2="360" y2="316" stroke="#fcd34d" stroke-width="1.4"/>
  ${boxes}
  ${brace(34, 148, 148, 'weight 3 on x — x repeated 3 times', 178)}
  ${brace(220, 334, 148, 'weight 2 on y — y repeated 2 times', 178)}
  <text x="184" y="216" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">the plain A of [4, 4, 4, 9, 9] = (12 + 18)/5 = 6</text>
  <text x="184" y="238" font-size="11.5" font-weight="700" text-anchor="middle" fill="#65a30d">the plain G = (4³ · 9²)^(1/5) ≈ 5.53</text>
  <text x="184" y="272" font-size="10.5" text-anchor="middle" fill="#0d9488">the list has 3 + 2 = 5 entries — 4.1\u2019s plain law runs on it</text>
  <text x="184" y="290" font-size="10.5" text-anchor="middle" fill="#0d9488">and THAT is the whole proof of the weighted law</text>
  ${bar(116, 228, '#d97706', 'A', '= (3·4 + 2·9)/5 = 6')}
  ${bar(160, 210, '#ea580c', 'G', '= (4³ · 9²)^(1/5) ≈ 5.53')}
  <line x1="428" y1="208" x2="428" y2="96" stroke="#0d9488" stroke-width="2"/>
  <text x="560" y="228" font-size="10.5" text-anchor="middle" fill="#0f766e">the weighted law A ≥ G, visible as bar lengths</text>
  <text x="560" y="252" font-size="10.5" text-anchor="middle" fill="#0f766e">equality exactly when 4 = 9 — never here</text>
  <text x="560" y="300" font-size="11" font-weight="700" text-anchor="middle" fill="#0d9488">the weighted AM-GM is the plain law,</text>
  <text x="560" y="318" font-size="11" font-weight="700" text-anchor="middle" fill="#0d9488">read on the replicated list</text>
</svg>`
}

function powerLadderSvg(): string {
  // the ladder of (1, 2, 6): rails x = 250 and x = 470, baseline y = 310,
  // 55 px per unit of value; rungs at M(-1) = 1.8, M(0) ≈ 2.289,
  // M(1/2) ≈ 2.628 (dashed), M(1) = 3, M(2) ≈ 3.697
  const U = 55
  const y0 = 310
  const rung = (v: number, color: string, dash: string, w: number): string => {
    const y = y0 - U * v
    return `<line x1="250" y1="${y.toFixed(1)}" x2="470" y2="${y.toFixed(1)}" stroke="${color}" stroke-width="${w}"${dash} />`
  }
  const left = (v: number, label: string): string => {
    const y = y0 - U * v
    return `<text x="240" y="${(y + 4).toFixed(1)}" font-size="12" font-weight="700" text-anchor="end" fill="#166534">${label}</text>`
  }
  const right = (v: number, val: string): string => {
    const y = y0 - U * v
    return `<text x="480" y="${(y + 4).toFixed(1)}" font-size="11.5" font-weight="700" fill="#0f766e">${val}</text>`
  }
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The power-mean ladder of the tuple one, two, six. Two green rails; a teal baseline at zero; five rungs bottom to top: the harmonic rung r equals minus one reading nine fifths, one point eight; the geometric rung r equals zero reading twelve to the one third, about two point two eight nine, marked as the honest limit case; a dashed fractional rung r equals one half at about two point six two eight; the arithmetic rung r equals one reading exactly three; the quadratic rung r equals two reading the square root of forty one thirds, about three point six nine seven. The annotation says climb the order and the mean climbs; the rungs meet only at an all-equal tuple.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the power-mean ladder of (1, 2, 6) — the mean climbs as the order climbs</text>
  <line x1="250" y1="60" x2="250" y2="314" stroke="#16a34a" stroke-width="3"/>
  <line x1="470" y1="60" x2="470" y2="314" stroke="#16a34a" stroke-width="3"/>
  <line x1="240" y1="310" x2="480" y2="310" stroke="#0d9488" stroke-width="2"/>
  <text x="360" y="330" font-size="10.5" text-anchor="middle" fill="#0f766e">the order r runs up the rails; 55 px = one unit of mean</text>
  ${rung(1.8, '#d97706', '', 2.4)}
  ${rung(2.289, '#d97706', '', 2.4)}
  ${rung(2.628, '#65a30d', ' stroke-dasharray="8 5"', 1.8)}
  ${rung(3, '#d97706', '', 2.4)}
  ${rung(3.697, '#d97706', '', 2.4)}
  ${left(1.8, 'r = −1 · M = H')}
  ${left(2.289, 'r = 0 · M = G')}
  ${left(2.628, 'r = ½')}
  ${left(3, 'r = 1 · M = A')}
  ${left(3.697, 'r = 2 · M = Q')}
  ${right(1.8, '9/5 = 1.8')}
  ${right(2.289, '12^(1/3) ≈ 2.289')}
  ${right(2.628, '≈ 2.628')}
  ${right(3, '3')}
  ${right(3.697, '√(41/3) ≈ 3.697')}
  <text x="560" y="96" font-size="10.5" font-weight="700" text-anchor="middle" fill="#ea580c">r = 0 is the honest LIMIT rung</text>
  <text x="560" y="112" font-size="10.5" font-weight="700" text-anchor="middle" fill="#ea580c">(r → 0; chapter 9 computes it)</text>
  <line x1="500" y1="${(y0 - U * 2.289).toFixed(1)}" x2="640" y2="${(y0 - U * 2.289).toFixed(1)}" stroke="#5eead4" stroke-width="1.2" stroke-dasharray="4 4"/>
  <text x="560" y="150" font-size="10.5" text-anchor="middle" fill="#0d9488">the fractional rung r = ½ (dashed)</text>
  <text x="560" y="168" font-size="10.5" text-anchor="middle" fill="#0d9488">sits between G and A — the family</text>
  <text x="560" y="186" font-size="10.5" text-anchor="middle" fill="#0d9488">does not stop at the named seats</text>
  <text x="560" y="286" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">all rungs meet only at the</text>
  <text x="560" y="302" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">all-equal tuple (c, c, c, …)</text>
</svg>`
}



/**
 * 4.3 — authored 2026-11-18 by the parallel swarm (owner chat directive:
 * "launch multiple agents for authoring lessons"); lesson 4.3 of Advanced
 * Algebra ch. 4 "Inequalities: the Classical Engine". Engine sections E/F
 * (scripts/aa-ch04-work/v4-3.ts) were grown green BEFORE the prose was
 * declared done — E sweeps Cauchy-Schwarz over integer grids (equality iff
 * proportional/zero list), recomputes the discriminant engine
 * symbolically, sweeps Engel's form and Nesbitt exactly, and re-verifies
 * every Illustration and exercise answer (≥ 120 checks); F pins the
 * structural contract: quiz exactly 5 items, keys [1, 0, 3, 2, 0];
 * 15 exercises L1–L6 = 2/2/3/3/3/2 with steps-array solutions; 2 figures
 * (vivid palette); 3 derivations; 4 formula cards; 8 Illustrations; 8
 * terms; word count ≥ 4,500. NO module ground: the m2-06 module carries
 * no Cauchy-Schwarz section (the master plan records this honestly) — the
 * canon statements are web-verified (Wikipedia: Cauchy–Schwarz inequality,
 * Nesbitt's inequality — see the run report for URLs + proposed keys) and
 * only banked whitelist keys are cited in `sources`.
 */
 const lesson43: Lesson = {
  id: 'aa-cauchy-schwarz-and-engels-form',
  number: '4.3',
  title: 'Cauchy-Schwarz and Engel\u2019s Form',
  concepts: [
    'Cauchy-Schwarz inequality',
    'dot product of two lists',
    'proportional sequences',
    'equality case discipline',
    'Engel form (Titu\u2019s lemma)',
    'Nesbitt\u2019s inequality',
    'the never-negative quadratic',
    'the all-ones read (QM-AM rung)',
  ],
  objectives: [
    'State and prove the Cauchy-Schwarz inequality for two real lists by the discriminant engine — the never-negative quadratic in t — and read its unsquared form as a ceiling on the dot product.',
    'Decide the equality case exactly: proportional lists (the zero list counted as 0 times anything), witnessed on integer pairs and read off the double root of the engine.',
    'Derive Engel\u2019s form from Cauchy-Schwarz by the square-root split and run it at exam speed on fraction sums with positive bottoms — Titu\u2019s lemma.',
    'Prove Nesbitt\u2019s inequality by the Engel chain and recognise the (a+b+c)² family as the 4.1 square certificate and the 4.2 ladder rung reread through the new engine.',
    'Run min-hunts through both engines (AM-GM and Engel) on one witness and reconcile the two routes with the perfect-square certificate.',
    'Name the triangle-inequality connection forward: (Σ|xᵢ|)² ≤ n·Σxᵢ² as the promise lesson 4.6 "Absolute Value at Depth" cashes.',
  ],
  prerequisites: ['aa-the-weighted-am-gm-and-its-consequences', 'aa-the-arithmetic-geometric-mean-inequality', 'al-the-quadratic-formula-and-the-discriminant'],
  sources: ['cengage-jee-style', 'jee-main-2026-syllabus'],
  blocks: [
    { kind: 'para', text: 'Lesson 4.1 "The Arithmetic-Geometric Mean Inequality" priced the symmetric objects of a single list — the arithmetic and geometric means of the same numbers — and proved the chapter\u2019s first engine: under a fixed sum, the product peaks at the equal split. Lesson 4.2 "The Weighted AM-GM and Its Consequences" weighted that engine and stacked it into the power-mean ladder $M_2 \\geq M_1 \\geq M_0 \\geq M_{-1}$, so that even the quadratic mean of a list became one rung of a machine. Both engines, for all their reach, face inwards: they compare one list with itself. The next symmetric object faces outwards — TWO lists at once, multiplied entry by entry and summed. The question this lesson answers is the question every engine chapter must eventually face: given the two lists, how big can that sum get?' },
    { kind: 'para', text: 'The answer is the chapter\u2019s second engine, and this book proves it with the discipline it trusts most. AL 9.3 taught that a quadratic which never goes negative carries a non-positive discriminant; lesson 3.2 "Conjugate and Modulus" ran that same verdict on the Argand plane to prove the two-variable sharp form behind the triangle inequality — and that two-variable step, examined closely, WAS Cauchy-Schwarz on lists of length two. Here the machine runs on $n$ lists at once: the third appearance of one discipline, one storey higher each time. From the engine fall the equality discipline (proportional lists), the all-ones read that rereads 4.2\u2019s ladder rung, and — after one substitution — Engel\u2019s form, the fraction-sum speed tool the JEE training banks nickname Titu\u2019s lemma. The route: the dot product first, the bound and its proof second, Engel third, then the witnesses — Nesbitt\u2019s inequality, the $(a+b+c)^2$ family, and the min-hunts where the engines reunite.' },

    { kind: 'heading', text: 'The Dot Product of Two Lists' },
    { kind: 'para', text: 'Fix two lists of real numbers of the SAME length, $a = (a_1, a_2, \\ldots, a_n)$ and $b = (b_1, b_2, \\ldots, b_n)$. Multiply them entry by entry and sum. The result is one number — the exact analogue of the product $ab$ of two single numbers, the object the whole of chapter 4 has been pricing, now with two lists in play.' },
    { kind: 'callout', tone: 'definition', title: 'The dot product of two lists', text: 'The DOT PRODUCT of the two real lists $a = (a_1, \\ldots, a_n)$ and $b = (b_1, \\ldots, b_n)$ of the same length $n$ is the number $\\sum_{i=1}^{n} a_i b_i = a_1b_1 + a_2b_2 + \\cdots + a_nb_n$. Thus, for $a = (1,2,3)$ and $b = (4,5,6)$ the dot product is $4 + 10 + 18 = 32$; for $a = (1,2)$ and $b = (2,4)$ it is $2 + 8 = 10$.' },
    { kind: 'para', text: 'For example, on a small roster:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $a = (1,2,3)$ against $b = (4,5,6)$: dot product $4 + 10 + 18 = 32$;',
      '(ii) $a = (1,2)$ against $b = (2,4)$: dot product $2 + 8 = 10$ — and the second list is twice the first, entry by entry;',
      '(iii) $a = (2,-1,2)$ against $b = (1,3,4)$: dot product $2 - 3 + 8 = 7$ — two positive products fighting one negative;',
      '(iv) $a = (1,2)$ against $b = (-2,-4)$: dot product $-2 - 8 = -10$ — the mirrored list, and the dot product turns negative.',
    ] },
    { kind: 'para', text: 'Each list carries a SIZE — the sum of squares $\\sum a_i^2$ for the first, $\\sum b_i^2$ for the second (the quantity whose square root lesson 3.2 named the modulus of a pair). The question of the chapter: how large can the dot product be in terms of those two sizes? Try the roster by hand. For (i), $32$ against $\\sqrt{14}\\cdot\\sqrt{77} = \\sqrt{1078} \\approx 32.83$ — the dot product comes in just under a ceiling built from the two sizes. For (ii), $10$ against $\\sqrt{5}\\cdot\\sqrt{20} = \\sqrt{100} = 10$ EXACTLY — the ceiling is attained, and the second list is twice the first. The conjecture — swept on every pair of small integer lists by this chapter\u2019s engines before a line of this prose was written, and proved below — is that the dot product never beats the product of the list-sizes, and that it ties exactly when one list is a constant multiple of the other.' },
    { kind: 'callout', tone: 'definition', title: 'Proportional sequences', text: 'Two lists $a = (a_1, \\ldots, a_n)$ and $b = (b_1, \\ldots, b_n)$ of the same length are PROPORTIONAL when one is a constant multiple of the other: $b_i = \\lambda a_i$ for every $i$ and some fixed real $\\lambda$. Thus, $(1,2)$ and $(2,4)$ are proportional with $\\lambda = 2$; $(1,2)$ and $(-2,-4)$ with $\\lambda = -2$; and the zero list $(0,0,\\ldots,0)$ is proportional to ANY list, being $0$ times it. So, proportionality is the statement that the ratios $a_i/b_i$ are constant wherever they are defined — with the honest extension that a zero list counts.' },
    { kind: 'example', title: 'For a = (1,2,3), b = (4,5,6) and then a = (1,2), b = (2,4), compute the dot product, the two list-sizes and both sides of the conjectured bound; say which pair ties and why', steps: [
      'The first pair: dot product $4 + 10 + 18 = 32$; list-sizes $\\sum a^2 = 1 + 4 + 9 = 14$ and $\\sum b^2 = 16 + 25 + 36 = 77$, so the ceiling is $\\sqrt{14}\\sqrt{77} = \\sqrt{1078} \\approx 32.83$.',
      'The conjecture reads $32^2 = 1024 \\leq 14 \\cdot 77 = 1078$ — it holds with a genuine gap of $54$; and the ratios $\\frac{1}{4}, \\frac{2}{5}, \\frac{3}{6}$ are not constant, so the lists are not proportional.',
      'The second pair: dot product $2 + 8 = 10$; list-sizes $\\sqrt{5}$ and $\\sqrt{20}$; the conjecture reads $10^2 = 100 = 5 \\cdot 20 = 100$ — a TIE.',
      'The tie is explained by proportionality: $b = (2,4) = 2 \\cdot (1,2)$ — every entry doubled, the ratios $\\frac{1}{2} = \\frac{2}{4}$ constant. Hence the conjecture survives its first roster — strict on the unproportional pair, tight on the proportional one — and the theorem below proves the tie happens exactly then.',
    ] },

    { kind: 'heading', text: 'The Cauchy-Schwarz Inequality' },
    { kind: 'callout', tone: 'theorem', title: 'The Cauchy-Schwarz inequality, with its equality case', text: 'For all real lists $a = (a_1, \\ldots, a_n)$ and $b = (b_1, \\ldots, b_n)$ of the same length: $\\left(\\sum_{i=1}^{n} a_i b_i\\right)^2 \\leq \\left(\\sum_{i=1}^{n} a_i^2\\right)\\left(\\sum_{i=1}^{n} b_i^2\\right)$ — with equality EXACTLY when the two lists are proportional, $b_i = \\lambda a_i$ for every $i$ (the zero list counting, being $0$ times anything). Taking the non-negative square root of both sides reads it unsquared: $\\left|\\sum a_i b_i\\right| \\leq \\sqrt{\\sum a_i^2}\\,\\sqrt{\\sum b_i^2}$ — the dot product never beats the product of the two list-sizes, tying in both signs of $\\lambda$.' },
    { kind: 'equation', latex: '\\left(\\sum_{i=1}^{n} a_i b_i\\right)^2 \\leq \\left(\\sum_{i=1}^{n} a_i^2\\right)\\left(\\sum_{i=1}^{n} b_i^2\\right) \\tag{1}', note: 'the squared form — the one the proof delivers; the unsquared read follows because both sides are non-negative.' },
    { kind: 'equation', latex: '\\left|\\sum_{i=1}^{n} a_i b_i\\right| \\leq \\sqrt{\\sum_{i=1}^{n} a_i^2}\\;\\sqrt{\\sum_{i=1}^{n} b_i^2} \\tag{2}', note: 'the unsquared read — the ceiling the roster met: 32 against √1078 ≈ 32.83, and 10 = 10 exactly at the proportional pair.' },
    { kind: 'para', text: 'What the bound really measures is ALIGNMENT. Divide the dot product by the two list-sizes and the quotient $\\frac{\\sum a_ib_i}{\\sqrt{\\sum a_i^2}\\sqrt{\\sum b_i^2}}$ is a number that Cauchy-Schwarz pins inside the band $[-1, 1]$: the value $1$ means the lists are positive multiples of each other (perfectly aligned), $-1$ means negative multiples (perfectly opposed), and every other pair lands strictly inside. On the roster: the pair $(1,2,3)$, $(4,5,6)$ scores $\\frac{32}{\\sqrt{1078}} \\approx 0.97$ — nearly aligned, which is why its gap was only $54$ — while $(1,2)$, $(-2,-4)$ scores $\\frac{-10}{\\sqrt{5}\\sqrt{20}} = -1$ exactly: perfectly opposed, a tie of the squared version. The theorem, in one sentence: no two lists can be more aligned than perfectly proportional, or less aligned than perfectly opposed.' },
    { kind: 'table', caption: 'Cauchy-Schwarz witnessed and swept — every value recomputed by the engines before this prose was written (the verdict column reads the ratios: constant means proportional, the equality certificate).', head: ['The two lists', 'Dot product', '(Dot)²', '(Size a)·(Size b)', 'The verdict'], rows: [
      ['$a = (1,2,3)$, $b = (4,5,6)$', '$32$', '$1024$', '$1078$', 'strict — ratios $\\frac{1}{4}, \\frac{2}{5}, \\frac{3}{6}$ differ'],
      ['$a = (1,2)$, $b = (2,4)$', '$10$', '$100$', '$100$', 'equality — $b = 2a$'],
      ['$a = (1,2)$, $b = (-2,-4)$', '$-10$', '$100$', '$100$', 'equality — $b = -2a$ (the squared read)'],
      ['$a = (2,-1,2)$, $b = (1,3,4)$', '$7$', '$49$', '$234$', 'strict — ratios $2, -\\frac{1}{3}, \\frac{1}{2}$ differ'],
      ['$a = (1,2,3)$, $b = (2,4,6)$', '$28$', '$784$', '$784$', 'equality — $b = 2a$'],
      ['$a = (0,0)$, $b = (3,4)$', '$0$', '$0$', '$0$', 'equality — the zero list ($0 \\cdot b$)'],
    ] },
    { kind: 'formula', name: 'The Cauchy-Schwarz inequality', latex: '\\left(\\sum a_i b_i\\right)^2 \\leq \\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right), \\quad \\text{equality} \\iff b_i = \\lambda a_i\\ (\\forall i)', note: 'equivalently the unsquared read |Σaᵢbᵢ| ≤ √(Σaᵢ²)·√(Σbᵢ²) — the dot product never beats the product of the list-sizes; ties exactly at proportional lists (zero list counted).' },

    { kind: 'heading', text: 'The Proof: a Quadratic That Cannot Go Negative' },
    { kind: 'para', text: 'The proof is the book\u2019s oldest discipline brought up one more storey. AL 9.3 graded the discriminant: a quadratic that never dips below the axis has $D \\leq 0$. Lesson 3.2 cashed that verdict on the plane — the never-negative $|t z_1 - z_2|^2$ delivered the two-variable sharp form, and with it the triangle inequality. Here is the general engine, run on $n$ entries at once.' },
    { kind: 'derivation', title: 'Cauchy-Schwarz, proved by the discriminant engine', statement: 'For all real lists $a, b$ of equal length: $(\\sum a_ib_i)^2 \\leq (\\sum a_i^2)(\\sum b_i^2)$, with equality exactly for proportional lists.', steps: [
      { label: 'Build the never-negative quadratic', formula: 'f(t) = \\sum_{i=1}^{n} (a_i t + b_i)^2', explanation: 'For any real $t$ this is a sum of squares — every term is the square of a real number — so $f(t) \\geq 0$ for EVERY real $t$. This one construction is the whole engine; the rest is bookkeeping.' },
      { label: 'Expand and collect', formula: 'f(t) = \\Big(\\sum a_i^2\\Big)t^2 + 2\\Big(\\sum a_ib_i\\Big)t + \\sum b_i^2', explanation: 'Each square $(a_it + b_i)^2 = a_i^2t^2 + 2a_ib_it + b_i^2$; collecting the three columns in $t$ gives a quadratic whose coefficients are exactly the three symmetric sums of the two lists — the dot product sits in the middle seat.' },
      { label: 'The trivial storey', formula: '\\sum a_i^2 = 0 \\Rightarrow \\text{every } a_i = 0', explanation: 'If the $t^2$ coefficient vanishes, every $a_i$ is zero: the dot product is $0$ and the right side is $0 \\cdot \\sum b_i^2 = 0$ — the inequality reads $0 \\leq 0$ with equality, and the zero list is honestly proportional ($0$ times $b$). So assume $\\sum a_i^2 > 0$: $f$ is a genuine upward-opening quadratic.' },
      { label: 'AL 9.3\u2019s verdict', formula: 'D = \\Big(2\\sum a_ib_i\\Big)^2 - 4\\Big(\\sum a_i^2\\Big)\\Big(\\sum b_i^2\\Big) \\leq 0', explanation: 'A quadratic that is $\\geq 0$ for every real $t$ can never cross the axis — at most it touches — so its discriminant is at most zero. Dividing by $4$ is exactly the Cauchy-Schwarz inequality. The discipline\u2019s third appearance: AL 9.3 graded it, lesson 3.2 ran it on two entries, this lesson runs it on $n$.' },
      { label: 'The equality discipline', formula: 'D = 0 \\iff a_it_0 + b_i = 0 \\text{ for every } i, \\quad t_0 = -\\frac{\\sum a_ib_i}{\\sum a_i^2}', explanation: '$D = 0$ means $f$ touches the axis at its double root $t_0$; a sum of squares equals zero only when EVERY square does, so $a_it_0 + b_i = 0$ for every $i$ — the second list is the constant $(-t_0)$ times the first. Proportional lists conversely give $f(t) = \\sum a_i^2 \\cdot (t + \\lambda)^2$, which touches at $t = -\\lambda$: $D = 0$, a tie. The tie and the touch are the same event.' },
    ], result: '$\\left(\\sum a_ib_i\\right)^2 \\leq \\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right),$ $\\qquad$ $\\text{equality} \\iff b_i = \\lambda a_i\\ (\\forall i)$' },
    { kind: 'figure', caption: 'The discriminant engine at work. Left (strict case): for a = (1,2,3), b = (4,5,6) the never-negative quadratic f(t) = 14t² + 64t + 77 floats above the t-axis — discriminant −216 < 0, minimum 27/7 at t = −16/7, and the Cauchy-Schwarz gap 54 is the parabola\u2019s height above the axis scaled by the list-size. Right (equality case): for a = (1,2,3), b = (2,4,6) the quadratic f(t) = 14(t + 2)² touches the axis at t₀ = −2 — the proportionality point, since b = 2a makes every term aᵢt + bᵢ vanish together at t = −2. Strict floats; proportional touches.', svg: csDiscriminantSvg() },
    { kind: 'para', text: 'The engine leaves a fingerprint worth naming: the GAP between the two sides is itself a sum of squares. Collecting the difference of the two products into pairwise cross-differences gives Lagrange\u2019s identity — the Cauchy-Schwarz gap made visible, term by term:' },
    { kind: 'equation', latex: '\\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right) - \\left(\\sum a_ib_i\\right)^2 = \\sum_{i<j} \\left(a_ib_j - a_jb_i\\right)^2 \\tag{3}', note: 'Lagrange\u2019s identity — the gap as a sum of squares; every cross-difference must vanish for a tie, which is proportionality restated. Exercise 15 proves it for lists of length three and verifies it on (1,2,3)·(4,5,6), where the gap 54 = 9 + 36 + 9.' },
    { kind: 'callout', tone: 'insight', title: 'One discipline, three storeys', text: 'AL 9.3 first priced the verdict: a never-negative quadratic has $D \\leq 0$. Lesson 3.2 ran it on $|tz_1 - z_2|^2$ — two entries — and bought the triangle inequality on the Argand plane. This lesson runs it on $\\sum(a_it + b_i)^2$ — $n$ entries — and buys the dot-product bound that the whole of analysis calls its first law. The reader who owns the discriminant verdict owns all three proofs; the engine never changed, only the storey.' },

    { kind: 'heading', text: 'The All-Ones Read: the Ladder Rung Reread' },
    { kind: 'para', text: 'Specialise the second list to all ones, $b = (1, 1, \\ldots, 1)$. The dot product becomes the plain SUM of the first list, and the bound rereads as the inequality between a sum and the count of its terms:' },
    { kind: 'equation', latex: '\\left(\\sum_{i=1}^{n} a_i\\right)^2 \\leq n \\sum_{i=1}^{n} a_i^2 \\tag{4}', note: 'the all-ones consequence — Cauchy-Schwarz against (1,1,…,1); equality exactly when all entries are equal.' },
    { kind: 'para', text: 'For example,' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $a = (1,2,3)$: $36 \\leq 3 \\cdot 14 = 42$, strict;',
      '(ii) $a = (5,5,5)$: $225 = 3 \\cdot 75 = 225$, a tie;',
      '(iii) $a = (1,0,0)$: $1 \\leq 3$, strict — a single non-zero entry pays the full tax.',
    ] },
    { kind: 'para', text: 'This is exactly the $M_2 \\geq M_1$ rung of the ladder lesson 4.2 built — the quadratic mean dominating the arithmetic mean — now proved a second way, as Cauchy-Schwarz against the ones. The two chapters meet: the ladder chapter\u2019s inequality is the dot-product chapter\u2019s specialisation. And the gap has a reading every statistician knows: expanding $\\sum (a_i - \\bar{a})^2 = \\sum a_i^2 - \\frac{(\\sum a_i)^2}{n} \\geq 0$ shows that the gap $n\\sum a_i^2 - (\\sum a_i)^2$ is exactly $n$ times the squared SPREAD of the list about its own mean — the all-ones read is the statement that a list\u2019s entries cannot all sit on one side of their mean. On witness (i): the gap $42 - 36 = 6$ is three times the squared spread $2$ of $(1,2,3)$ about its mean $\\bar{a} = 2$.' },
    { kind: 'example', title: 'Bound (a+b+c)² against 3(a²+b²+c²) for the triples (1,2,3), (5,5,5) and (1,0,0), and state exactly when the tie holds', steps: [
      'This is the all-ones read at $n = 3$: Cauchy-Schwarz on the triple against the list $(1,1,1)$.',
      'The roster: $(1,2,3)$ gives $36 \\leq 3 \\cdot 14 = 42$, strict; $(5,5,5)$ gives $225 = 3 \\cdot 75 = 225$, a tie; $(1,0,0)$ gives $1 \\leq 3$, strict — the lone entry pays the full tax.',
      'The equality discipline: a tie needs the first list proportional to $(1,1,1)$ — all three entries EQUAL.',
      'Hence $(a+b+c)^2 \\leq 3(a^2+b^2+c^2)$ with equality exactly at $a = b = c$ — the QM-AM rung of 4.2\u2019s ladder, witnessed and tight at the equal triple.',
    ] },
    { kind: 'formula', name: 'The all-ones read', latex: '\\left(\\sum a_i\\right)^2 \\leq n \\sum a_i^2', note: 'Cauchy-Schwarz against the list of ones — for three entries (a+b+c)² ≤ 3(a²+b²+c²), equality iff all entries are equal; the gap is n times the squared spread about the mean (variance is non-negative).' },

    { kind: 'heading', text: 'Engel\u2019s Form: the Fraction-Sum Speed Tool' },
    { kind: 'para', text: 'The engine above prices dot products. Examinations price FRACTION SUMS — expressions like $\\frac{1}{x} + \\frac{1}{y}$ under a fixed $x + y$, or Nesbitt\u2019s $\\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b}$. One substitution turns the dot-product engine into the fraction-sum engine: write every numerator as a SQUARE, and let the bottoms play the second list.' },
    { kind: 'derivation', title: 'Engel\u2019s form, derived from Cauchy-Schwarz', statement: 'For real numbers $a_1, \\ldots, a_n$ and POSITIVE $b_1, \\ldots, b_n$: $\\sum \\frac{a_i^2}{b_i} \\geq \\frac{(\\sum a_i)^2}{\\sum b_i}$.', steps: [
      { label: 'Square-root split', formula: '\\frac{a_i^2}{b_i} = \\left(\\frac{a_i}{\\sqrt{b_i}}\\right)^2', explanation: '$b_i > 0$ makes the square root REAL, so each fraction is honestly the square of the real number $a_i/\\sqrt{b_i}$. This is the whole trick: manufacture the two lists that Cauchy-Schwarz prices.' },
      { label: 'Name the two lists', formula: 'u_i = \\frac{a_i}{\\sqrt{b_i}}, \\qquad v_i = \\sqrt{b_i}', explanation: 'Their dot product is $\\sum u_iv_i = \\sum a_i$ (the roots cancel, entry by entry); the two list-sizes are $\\sum u_i^2 = \\sum \\frac{a_i^2}{b_i}$ and $\\sum v_i^2 = \\sum b_i$, the second strictly positive.' },
      { label: 'Feed the engine', formula: '\\left(\\sum a_i\\right)^2 \\leq \\left(\\sum \\frac{a_i^2}{b_i}\\right)\\left(\\sum b_i\\right)', explanation: 'Cauchy-Schwarz on $u$ and $v$ — the same theorem, one storey down. Equality needs $u, v$ proportional: $\\frac{a_i}{\\sqrt{b_i}} = \\mu\\sqrt{b_i}$, that is $a_i = \\mu b_i$ for every $i$ — the constant-ratio discipline again.' },
      { label: 'Divide by the positive bottom-sum', formula: '\\sum \\frac{a_i^2}{b_i} \\geq \\frac{\\left(\\sum a_i\\right)^2}{\\sum b_i}', explanation: '$\\sum b_i > 0$ because every bottom is positive, so the division keeps the direction of the inequality — the form is live, and the floor it prints is sharp exactly at the constant ratio.' },
    ], result: '$\\sum_{i=1}^{n} \\frac{a_i^2}{b_i} \\geq \\frac{(a_1 + \\cdots + a_n)^2}{b_1 + \\cdots + b_n} \\quad (b_i > 0),$ $\\qquad$ $\\text{equality} \\iff \\frac{a_i}{b_i} \\text{ constant}$' },
    { kind: 'callout', tone: 'theorem', title: 'Engel\u2019s form (Titu\u2019s lemma)', text: 'For real $a_1, \\ldots, a_n$ and POSITIVE $b_1, \\ldots, b_n$: $\\sum \\frac{a_i^2}{b_i} \\geq \\frac{(\\sum a_i)^2}{\\sum b_i}$, with equality exactly when the ratios $\\frac{a_i}{b_i}$ are all equal. This is the standard speed tool for fraction sums — the JEE training banks nickname it TITU\u2019S LEMMA; the wider literature also carries it as ENGEL\u2019S FORM, Bergstr\u00f6m\u2019s inequality and Sedrakyan\u2019s inequality. One lemma, a crowded passport — the statement is what matters.' },
    { kind: 'equation', latex: '\\sum_{i=1}^{n} \\frac{a_i^2}{b_i} \\geq \\frac{\\left(\\sum_{i=1}^{n} a_i\\right)^2}{\\sum_{i=1}^{n} b_i} \\quad (b_i > 0) \\tag{5}', note: 'the fraction-sum floor: square the tops, sum the tops and the bottoms separately, divide — equality iff the ratio aᵢ/bᵢ is constant.' },
    { kind: 'formula', name: 'Engel\u2019s form (Titu\u2019s lemma)', latex: '\\sum \\frac{a_i^2}{b_i} \\geq \\frac{(\\sum a_i)^2}{\\sum b_i} \\quad (b_i > 0)', note: 'the fraction-sum speed tool: square-root split the tops, feed Cauchy-Schwarz, divide by the bottom-sum; equality iff aᵢ/bᵢ is constant; the bottoms must be POSITIVE — the derivation squares √bᵢ.' },
    { kind: 'callout', tone: 'warn', title: 'The bottoms must be positive', text: 'Engel\u2019s bottoms $b_i$ must be POSITIVE — the derivation squares $\\sqrt{b_i}$, which is real only then. Apply the form to a sum with a negative bottom and it collapses: for $a = (0,3)$ over $b = (2,-1)$ the form would claim $\\frac{0}{2} + \\frac{9}{-1} \\geq \\frac{(0+3)^2}{2-1}$, i.e. $-9 \\geq 9$ — false, and honestly so: the bottom-sum happened to stay positive while one bottom went negative. Check every bottom BEFORE the machine starts.' },
    { kind: 'example', title: 'Run the machine on 4/1 + 9/2, then on 4/1 + 16/2; say when the floor is attained', steps: [
      'Split and square: $\\frac{4}{1} + \\frac{9}{2} = \\frac{2^2}{1} + \\frac{3^2}{2}$ — the tops read as squares, the bottoms are positive, the machine is live.',
      'Sum and divide: the floor is $\\frac{(2+3)^2}{1+2} = \\frac{25}{3} \\approx 8.33$; the actual value is $4 + 4.5 = 8.5$ — the floor holds, strict because $\\frac{2}{1} \\neq \\frac{3}{2}$.',
      'The second run: $\\frac{4}{1} + \\frac{16}{2} = \\frac{2^2}{1} + \\frac{4^2}{2} \\geq \\frac{(2+4)^2}{1+2} = \\frac{36}{3} = 12$; the actual value is $4 + 8 = 12$ — a TIE.',
      'The tie is the equality discipline: $\\frac{2}{1} = \\frac{4}{2} = 2$ — a constant ratio, so Engel is tight. Hence the machine prints $\\frac{25}{3}$ strictly on the first sum and $12$ exactly on the second — Figure 2 runs the same sums through its four stages.',
    ] },
    { kind: 'figure', caption: 'The Engel machine — the fraction-sum floor in four moves. The witness 4/1 + 9/2 runs left to right: SPLIT the sum into terms with positive bottoms; SQUARE the tops (2² and 3²); SUM the tops (2 + 3 = 5) and the bottoms (1 + 2 = 3) separately; DIVIDE — the floor (2+3)²/(1+2) = 25/3. The verdict strip checks it: 17/2 = 8.5 ≥ 25/3, strict because 2/1 ≠ 3/2 — the floor is attained exactly at the constant ratio.', svg: engelMachineSvg() },
    { kind: 'para', text: 'Why a SPEED tool: the form replaces a whole minimisation campaign with one line. Facing $\\frac{1}{x} + \\frac{1}{y}$ under a fixed $x + y$, the reader who reaches for Engel writes $\\frac{1^2}{x} + \\frac{1^2}{y} \\geq \\frac{(1+1)^2}{x+y}$ and reads the floor straight off the constraint — no expansion, no derivative, no case analysis. The price of the speed is the discipline: the bottoms must be positive, and the equality condition must be checked before any "least value" is claimed. The witnesses below drill both.' },

    { kind: 'heading', text: 'The Witnesses: Nesbitt and the Family' },
    { kind: 'para', text: 'Three witnesses close the lesson: Nesbitt\u2019s inequality — the fraction sum every training bank drills; the $(a+b+c)^2$ family — the symmetric three-variable bounds, which are 4.1\u2019s square certificate and 4.2\u2019s ladder rung reread through the new engine; and the min-hunts — where AM-GM and Engel meet on one witness, the engine map in miniature.' },
    { kind: 'derivation', title: 'Nesbitt\u2019s inequality, by the Engel chain', statement: 'For positive $a, b, c$: $\\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b} \\geq \\frac{3}{2}$, equality exactly at $a = b = c$.', steps: [
      { label: 'Square the tops', formula: '\\frac{a}{b+c} = \\frac{a^2}{ab+ac}', explanation: 'Multiply top and bottom by $a$ (legal: $a > 0$): the fraction now wears a SQUARE on top — Engel\u2019s currency. Cyclically, $\\frac{b}{c+a} = \\frac{b^2}{bc+ba}$ and $\\frac{c}{a+b} = \\frac{c^2}{ca+cb}$, all bottoms positive.' },
      { label: 'Engel', formula: '\\sum \\frac{a^2}{ab+ac} \\geq \\frac{(a+b+c)^2}{2(ab+bc+ca)}', explanation: 'The three bottoms sum to $(ab+ac) + (bc+ba) + (ca+cb) = 2(ab+bc+ca)$ — positive throughout, so the machine is live and prints the floor $\\frac{(a+b+c)^2}{2(ab+bc+ca)}$.' },
      { label: 'The family closes it', formula: '(a+b+c)^2 \\geq 3(ab+bc+ca)', explanation: 'This is 4.1\u2019s square certificate — $(a+b+c)^2 - 3(ab+bc+ca) = \\frac{1}{2}\\left[(a-b)^2 + (b-c)^2 + (c-a)^2\\right] \\geq 0$. So the Engel floor is at least $\\frac{3(ab+bc+ca)}{2(ab+bc+ca)} = \\frac{3}{2}$: the engines reunite, the new engine\u2019s floor cashed by the old engine\u2019s certificate.' },
      { label: 'The equality discipline', formula: 'a = b = c', explanation: 'Both rungs must be tight together: Engel ties exactly when $\\frac{a}{ab+ac} = \\frac{b}{bc+ba} = \\frac{c}{ca+cb}$, that is $\\frac{1}{b+c} = \\frac{1}{c+a} = \\frac{1}{a+b}$ — which forces $a = b = c$; and the certificate ties at the same seat. Witness: at $(1,1,1)$ the sum is $3 \\cdot \\frac{1}{2} = \\frac{3}{2}$, exactly.' },
    ], result: '$\\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b} \\geq \\frac{3}{2} \\quad (a, b, c > 0),$ $\\qquad$ $\\text{equality} \\iff a = b = c$' },
    { kind: 'equation', latex: '\\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b} \\geq \\frac{3}{2} \\quad (a, b, c > 0) \\tag{6}', note: 'Nesbitt\u2019s inequality — the Engel chain\u2019s standard destination; the engines swept every positive integer triple with small entries before this prose was written: never below 3/2, tie only at a = b = c.' },
    { kind: 'formula', name: 'Nesbitt\u2019s inequality', latex: '\\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b} \\geq \\frac{3}{2} \\quad (a,b,c > 0)', note: 'by the Engel chain with the (a+b+c)² ≥ 3(ab+bc+ca) family closing it; equality exactly at a = b = c — and there is NO upper bound: skewing one variable sends a term to infinity.' },
    { kind: 'example', title: 'Compute a/(b+c) + b/(c+a) + c/(a+b) at (a,b,c) = (1,2,3), (2,3,4) and (1,1,1), and compare each with 3/2', steps: [
      'At $(1,2,3)$: $\\frac{1}{5} + \\frac{2}{4} + \\frac{3}{3} = \\frac{1}{5} + \\frac{1}{2} + 1 = \\frac{17}{10} = 1.7$ — comfortably above $\\frac{3}{2} = 1.5$.',
      'At $(2,3,4)$: $\\frac{2}{7} + \\frac{3}{6} + \\frac{4}{5} = \\frac{20 + 35 + 56}{70} = \\frac{111}{70} \\approx 1.586$ — closer, still above.',
      'At $(1,1,1)$: $\\frac{1}{2} + \\frac{1}{2} + \\frac{1}{2} = \\frac{3}{2}$ — the tie, exactly at the equal triple.',
      'Hence the three witnesses bracket the bound — strict, nearly tight, tight — and the chain above proves no positive triple goes below $\\frac{3}{2}$; the entries $2,3,4$ are closer to equal than $1,2,3$, which is why their gap $\\frac{3}{35}$ is the smaller.',
    ] },
    { kind: 'para', text: 'The closing rung of the chain deserves its own exhibit — the sandwich the two engines build around $(a+b+c)^2$:' },
    { kind: 'equation', latex: '3(ab+bc+ca) \\leq (a+b+c)^2 \\leq 3(a^2+b^2+c^2) \\tag{7}', note: 'both rungs proved: the lower by the 4.1 square certificate — equivalently by Cauchy-Schwarz on the rotated lists (a,b,c) against (b,c,a) — the upper by the all-ones read; both tie exactly at a = b = c.' },
    { kind: 'example', title: 'Verify the sandwich 3(ab+bc+ca) ≤ (a+b+c)² ≤ 3(a²+b²+c²) at (1,2,3), and prove the lower rung two ways', steps: [
      'The roster at $(1,2,3)$: $ab+bc+ca = 2 + 6 + 3 = 11$, $(a+b+c)^2 = 36$, $a^2+b^2+c^2 = 14$.',
      'The sandwich reads $3 \\cdot 11 = 33 \\leq 36 \\leq 3 \\cdot 14 = 42$ — both rungs strict, since $1, 2, 3$ are not all equal.',
      'The lower rung, route one (4.1\u2019s certificate): $(a+b+c)^2 - 3(ab+bc+ca) = \\frac{1}{2}\\left[(a-b)^2 + (b-c)^2 + (c-a)^2\\right] = \\frac{1}{2}\\left[1 + 1 + 4\\right] = 3$ — the gap $36 - 33 = 3$ is a sum of squares.',
      'The lower rung, route two (this lesson\u2019s engine): Cauchy-Schwarz on the rotated lists $(a,b,c)$ and $(b,c,a)$ — their dot product IS $ab + bc + ca$, and both list-sizes are $a^2+b^2+c^2$, so $ab+bc+ca \\leq 14$; then $(a+b+c)^2 = (a^2+b^2+c^2) + 2(ab+bc+ca) \\geq 3(ab+bc+ca)$.',
      'Hence the sandwich holds at the witness — and both routes to the lower rung are honest: the old certificate and the new engine agree, tying exactly at $a = b = c$.',
    ] },

    { kind: 'heading', text: 'Min-Hunts at Exam Speed' },
    { kind: 'para', text: 'The min-hunt is where the engine map becomes a decision the reader makes in seconds. AM-GM prices two-term products; Engel prices fraction sums; many witnesses can be reached by either route — and the discipline is to pick the faster and KNOW why both arrive at the same floor.' },
    { kind: 'example', title: 'Find the least value of x + 4/x for x > 0 — once by AM-GM, once by Engel — and reconcile the two routes', steps: [
      'AM-GM first (4.1\u2019s engine): $x + \\frac{4}{x} \\geq 2\\sqrt{x \\cdot \\frac{4}{x}} = 4$, with equality when the two terms are equal, $x = \\frac{4}{x}$, that is $x = 2$.',
      'Engel second: $x + \\frac{4}{x} = \\frac{x^2}{x} + \\frac{2^2}{x} \\geq \\frac{(x+2)^2}{x+x} = \\frac{(x+2)^2}{2x}$ — the tops squared, the bottoms summed and divided.',
      'Now the perfect square closes it: $(x+2)^2 - 8x = x^2 - 4x + 4 = (x-2)^2 \\geq 0$, so $\\frac{(x+2)^2}{2x} \\geq \\frac{8x}{2x} = 4$ — and both rungs of the Engel route are tight exactly at $x = 2$ (there $\\frac{x}{x} = 1$ agrees with $\\frac{2}{x} = 1$).',
      'Hence the least value is $4$, attained at $x = 2$ — and the direct certificate confirms it from first principles: $x + \\frac{4}{x} - 4 = \\frac{(x-2)^2}{x} \\geq 0$. Three certificates, one floor: the engine map in miniature.',
    ] },
    { kind: 'example', title: 'Exam-shaped: for x, y > 0 with x + y = 6, find the least value of 2/x + 8/y and the seat where it is attained', steps: [
      'Square-root split the tops: $\\frac{2}{x} = \\frac{(\\sqrt{2})^2}{x}$ and $\\frac{8}{y} = \\frac{(2\\sqrt{2})^2}{y}$ — the bottoms are positive, Engel is live.',
      'The floor: $\\frac{2}{x} + \\frac{8}{y} \\geq \\frac{(\\sqrt{2} + 2\\sqrt{2})^2}{x+y} = \\frac{(3\\sqrt{2})^2}{6} = \\frac{18}{6} = 3$ — the constraint itself becomes the bottom-sum.',
      'The tie needs the constant ratio $\\frac{\\sqrt{2}}{x} = \\frac{2\\sqrt{2}}{y}$, that is $y = 2x$; with $x + y = 6$ the seat is $(2, 4)$.',
      'Check the seat: $\\frac{2}{2} + \\frac{8}{4} = 1 + 2 = 3$ — the floor is attained exactly there. Hence the least value is $3$ at $(x, y) = (2, 4)$, read off in one line — the exam-speed shape the banks drill.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The engine map in miniature', text: 'One witness, three certificates: $x + \\frac{4}{x} \\geq 4$ by AM-GM (the 4.1 engine), by Engel followed by the perfect square (the 4.3 engine plus 4.1\u2019s certificate), and directly by $\\frac{(x-2)^2}{x} \\geq 0$ (the certificate itself). Reaching the same floor by two engines is not redundancy — it is the check the examination room cannot run: two independent engines printing the same minimum certify the minimum. The map so far: symmetric two-term products go to AM-GM; fraction sums with positive bottoms go to Engel; the rest of the chapter adds the sorted-list engine (4.4), the curved-graph engine (4.5) and the distance engine (4.6).' },
    { kind: 'table', caption: 'The engine map at the end of lesson 4.3 — which tool for which shape. The last three rows are named promises (the lessons that follow), not engines taught here.', head: ['The shape you face', 'The engine', 'The statement', 'Tight when', 'Lives in'], rows: [
      ['a symmetric product under a fixed sum', 'AM-GM', '$ab \\leq \\left(\\frac{a+b}{2}\\right)^2$', 'the numbers equal', 'lesson 4.1'],
      ['a weighted product; a ladder of means', 'weighted AM-GM + the power ladder', '$M_2 \\geq M_1 \\geq M_0 \\geq M_{-1}$', 'all entries equal', 'lesson 4.2'],
      ['a dot product of two lists', 'Cauchy-Schwarz', '$(\\sum ab)^2 \\leq (\\sum a^2)(\\sum b^2)$', 'proportional lists', 'this lesson'],
      ['a fraction sum, positive bottoms', 'Engel (Titu)', '$\\sum \\frac{a^2}{b} \\geq \\frac{(\\sum a)^2}{\\sum b}$', 'constant ratio $\\frac{a}{b}$', 'this lesson'],
      ['a symmetric three-variable bound', 'the square certificate reread', '$3(ab+bc+ca) \\leq (a+b+c)^2 \\leq 3(a^2+b^2+c^2)$', '$a = b = c$', '4.1 reread here'],
      ['two sorted lists', 'rearrangement + Chebyshev', 'the sorted dot product is the maximum', 'equal or matched order', 'lesson 4.4 (promised)'],
      ['a curved graph between two seats', 'Jensen', 'the chord floats above the curve', 'the seats coincide', 'lesson 4.5 (promised)'],
      ['absolute values, a sum of distances', 'the triangle inequality', '$|x+y| \\leq |x| + |y|$', 'same direction', 'lesson 4.6 (promised)'],
    ] },

    { kind: 'heading', text: 'The Promise Forward: Absolute Values' },
    { kind: 'para', text: 'One more specialisation of the all-ones read is too important to bury: take a list $x = (x_1, \\ldots, x_n)$ of ARBITRARY reals and run the read on the list of absolute values $(|x_1|, \\ldots, |x_n|)$ against the ones — the absolute values square away, and what survives is a bound on the sum of absolute values:' },
    { kind: 'equation', latex: '\\left(\\sum_{i=1}^{n} |x_i|\\right)^2 \\leq n \\sum_{i=1}^{n} x_i^2 \\tag{8}', note: 'the promise lesson 4.6 "Absolute Value at Depth: the Triangle Inequality" cashes — there it joins the |·| verdict discipline and becomes the bound machine behind |x₁| + ⋯ + |xₙ| ≤ √n · √(Σxᵢ²) and the triangle family.' },
    { kind: 'example', title: 'Prove (|x| + |y| + |z|)² ≤ 3(x² + y² + z²) for all real x, y, z; state the equality condition and witness the bound at (3,−4,0) and (1,−1,1)', steps: [
      'Run the all-ones read on the list $(|x|, |y|, |z|)$: its dot product with $(1,1,1)$ is $|x| + |y| + |z|$, and its size is $|x|^2 + |y|^2 + |z|^2 = x^2 + y^2 + z^2$ — the absolute values square away.',
      'So $(|x|+|y|+|z|)^2 \\leq 3(x^2+y^2+z^2)$ for every real triple; the equality discipline needs the first list proportional to the ones — $|x| = |y| = |z|$, equal absolute values with the signs free to fight.',
      'Witness $(3,-4,0)$: $(3+4+0)^2 = 49 \\leq 3 \\cdot (9+16+0) = 75$ — strict, the absolute values $3, 4, 0$ differ.',
      'Witness $(1,-1,1)$: $(1+1+1)^2 = 9 = 3 \\cdot 3 = 9$ — a tie, the signs fighting while the sizes agree. Hence the bound holds with the tie exactly at equal absolute values — the promise 4.6 cashes into the full triangle-inequality engine.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'The honest audit first: the JEE Main 2026 mathematics syllabus carries NO separate inequalities unit — mean-inequality and dot-product items ride the algebra and sequences-and-series banks (the unit that names AM/GM insertion), so every item in this lesson is labelled EXAM-STYLE: our own designs, never lifted from any paper. What the banks actually test from this lesson: the fraction-sum minimum (Engel/Titu at full speed — the Numerical-Value shape below), Nesbitt-type three-variable bounds, the $(a+b+c)^2$ family under substitutions, and the maximum of a dot product under fixed list-sizes (the unsquared read $|\\sum a_ib_i| \\leq \\sqrt{\\sum a^2}\\sqrt{\\sum b^2}$). Aptitude papers price the same engines on bare numbers. For the undergraduate, this inequality is the first law of every analysis course — usually met again as the inner-product bound, one storey above the reals.' },
    { kind: 'callout', tone: 'historical', title: 'Cauchy 1821, and the names the lemma carries', text: 'The inequality for SUMS was published by Augustin-Louis Cauchy in his 1821 Cours d\u2019analyse (the first part, Analyse alg\u00e9brique) — which is why the sum form carries his name alone in school texts. The integral version came later from Viktor Bunyakovsky (1859), and Hermann Schwarz (1888) gave the proof shape modern analysis uses — so the full name in many books is the CAUCHY\u2013BUNYAKOVSKY\u2013SCHWARZ inequality. The fraction form derived above also travels under several names: ENGEL\u2019S FORM, TITU\u2019S LEMMA (the training banks\u2019 name), Bergstr\u00f6m\u2019s inequality, Sedrakyan\u2019s inequality — one lemma, a crowded passport. Every attribution above was web-checked against the standard encyclopaedia articles on 2026-11-18 before it was written; nothing here rests on memory.' },
    { kind: 'para', text: 'The chapter\u2019s second engine is banked. Lesson 4.4 "The Rearrangement and Chebyshev Inequalities" turns the lists ORDERED — the sorted dot product is the maximum over all pairings, and Chebyshev\u2019s sum inequality follows from the exchange argument; lesson 4.5 "Jensen\u2019s Inequality and Convexity" bends the graph between two seats; lesson 4.6 "Absolute Value at Depth: the Triangle Inequality" cashes the absolute-value promise planted above. Every one of them will lean on the discipline this lesson made precise: an inequality without its equality case is half a theorem.' },

    { kind: 'terms', items: [
      { term: 'Cauchy-Schwarz inequality', def: '$(\\sum a_ib_i)^2 \\leq (\\sum a_i^2)(\\sum b_i^2)$: the dot product of two lists never beats the product of the list-sizes; ties exactly at proportional lists — the full name in many books is Cauchy\u2013Bunyakovsky\u2013Schwarz.' },
      { term: 'dot product of two lists', def: 'the number $\\sum a_ib_i$: two lists of equal length multiplied entry by entry and summed — the two-list generalisation of a product.' },
      { term: 'proportional sequences', def: 'two lists with $b_i = \\lambda a_i$ for every $i$ — one a constant multiple of the other (the zero list counts, being $0$ times anything): the Cauchy-Schwarz equality case.' },
      { term: 'equality case', def: 'the exact conditions under which an inequality TIES — for Cauchy-Schwarz, proportionality; for Engel, the constant ratio; an inequality without its equality case is half a theorem.' },
      { term: 'Engel\u2019s form (Titu\u2019s lemma)', def: '$\\sum a_i^2/b_i \\geq (\\sum a_i)^2/\\sum b_i$ for POSITIVE bottoms — the fraction-sum speed tool derived from Cauchy-Schwarz by the square-root split; ties iff $a_i/b_i$ is constant.' },
      { term: 'the never-negative quadratic', def: '$f(t) = \\sum(a_it + b_i)^2 \\geq 0$ for every real $t$ — the sum-of-squares quadratic whose non-positive discriminant IS the Cauchy-Schwarz proof (AL 9.3\u2019s discipline, third appearance).' },
      { term: 'Nesbitt\u2019s inequality', def: '$\\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b} \\geq \\frac{3}{2}$ for positives — the Engel chain\u2019s standard destination, closed by the $(a+b+c)^2 \\geq 3(ab+bc+ca)$ family; ties exactly at $a = b = c$.' },
      { term: 'the all-ones read', def: '$(\\sum a_i)^2 \\leq n\\sum a_i^2$ — Cauchy-Schwarz against the list of ones; the QM-AM rung of 4.2\u2019s ladder reread, the gap being $n$ times the squared spread about the mean.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: Cauchy-Schwarz and Engel\u2019s form', items: [
      { q: 'With $\\sum a_i^2 = 9$ and $\\sum b_i^2 = 36$ (lists of equal length), the largest value the dot product $\\sum a_ib_i$ can take is:', options: ['$324$ — the ceiling of the squared version', '$18$ — the product of the two list-sizes', '$45$ — the sum of the two sizes', '$3\\sqrt{3}$ — the root of the difference of the sizes'], answer: 1, explain: 'The unsquared read: $\\left|\\sum a_ib_i\\right| \\leq \\sqrt{9} \\cdot \\sqrt{36} = 3 \\cdot 6 = 18$ (option B) — attained whenever the lists are proportional, e.g. $a = (1,2,2)$ against $b = (2,4,4)$, where the dot product is $2 + 8 + 8 = 18$ exactly. Option A reports the SQUARE of the ceiling — that is the ceiling for $(\\sum a_ib_i)^2$, not for the dot product itself; option C adds the two sizes ($9 + 36$), which no law licenses — the bound is a product of roots, never a sum; option D roots the difference of the sizes ($\\sqrt{36 - 9} = 3\\sqrt{3}$), a sign fraud the Pythagoras habit manufactures.' },
      { q: 'Equality $(\\sum a_ib_i)^2 = (\\sum a_i^2)(\\sum b_i^2)$ holds exactly when:', options: ['the ratios $a_i/b_i$ are all equal — one list is a constant multiple of the other', 'the two lists have equal sums, $\\sum a_i = \\sum b_i$', 'every entry of both lists is positive', 'the two lists are of the same length $n$'], answer: 0, explain: 'The discriminant engine ties exactly when the never-negative quadratic TOUCHES the axis — every square $a_it_0 + b_i$ vanishes at one shared $t_0$, which says $b_i = \\lambda a_i$ for every $i$ (option A; the zero list counts as the $\\lambda = 0$ case). Option B is neither necessary nor sufficient: $(1,2)$ against $(2,4)$ ties with sums $3 \\neq 6$, while $(1,2,3)$ against $(4,5,6)$ has unequal sums AND is strictly below; option C fails on the witness $(1,2)$ against $(-2,-4)$, which ties with negative entries ($(-10)^2 = 5 \\cdot 20 = 100$); option D is true of every pair the theorem prices — it cannot be the special condition.' },
      { q: 'For $x, y > 0$ with $x + y = 8$, the least value of $\\frac{1}{x} + \\frac{1}{y}$ is:', options: ['$\\frac{1}{8}$ — one fraction over the whole sum', '$\\frac{1}{4}$ — half of that', '$2$ — the number of fractions', '$\\frac{1}{2}$ — by Engel, attained at $x = y = 4$'], answer: 3, explain: 'Engel: $\\frac{1}{x} + \\frac{1}{y} = \\frac{1^2}{x} + \\frac{1^2}{y} \\geq \\frac{(1+1)^2}{x+y} = \\frac{4}{8} = \\frac{1}{2}$ (option D), tight at $x = y = 4$ where the ratios $\\frac{1}{x} = \\frac{1}{y}$ agree and the value is $\\frac{1}{4} + \\frac{1}{4} = \\frac{1}{2}$. Option A prices ONE fraction with the whole sum as its bottom — the machine needs each square over its OWN bottom before the bottom-sum divides; option B is the slip of dividing $(1+1)^2$ by $2(x+y) = 16$ instead of $x + y = 8$; option C counts the terms — the number of fractions is not their floor, and the value $2$ is merely one seat of the function, never the least.' },
      { q: 'For positive $a, b, c$, the sum $\\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b}$ is always at least:', options: ['$1$', '$2$', '$\\frac{3}{2}$ — Nesbitt\u2019s bound, attained at $a = b = c$', '$3$ — the number of terms'], answer: 2, explain: 'The Engel chain: $\\sum \\frac{a}{b+c} = \\sum \\frac{a^2}{ab+ac} \\geq \\frac{(a+b+c)^2}{2(ab+bc+ca)} \\geq \\frac{3}{2}$, the last rung being the family $(a+b+c)^2 \\geq 3(ab+bc+ca)$ — option C, attained exactly at $a = b = c$, where the sum is $3 \\cdot \\frac{1}{2}$. Option A\u2019s floor of $1$ is true but weak — the entries cannot all be small at once, since each denominator excludes its own numerator and balance forces the sum up; option B\u2019s $2$ is FALSE as a bound — the equal triple gives $\\frac{3}{2} < 2$; option D\u2019s $3$ likewise exceeds the attained $\\frac{3}{2}$ — counting terms is not pricing them. And there is no ceiling at all: letting one variable grow sends a term to infinity.' },
      { q: 'The least value of $x + \\frac{4}{x}$ for $x > 0$ is:', options: ['$4$ — by AM-GM or by Engel, attained at $x = 2$', '$2$ — the geometric mean of $1$ and $4$', '$8$ — the sum of the two constants $4 + 4$', '$5$ — the value at $x = 1$'], answer: 0, explain: 'AM-GM: $x + \\frac{4}{x} \\geq 2\\sqrt{x \\cdot \\frac{4}{x}} = 4$, equality at $x = \\frac{4}{x}$, i.e. $x = 2$ (option A); Engel agrees: $\\frac{x^2}{x} + \\frac{2^2}{x} \\geq \\frac{(x+2)^2}{2x} \\geq 4$, both rungs tight at $x = 2$, and the direct certificate $\\frac{(x-2)^2}{x} \\geq 0$ confirms it. Option B reports the geometric mean $\\sqrt{1 \\cdot 4} = 2$, forgetting the factor $2$ that AM-GM carries; option C adds the constants $4 + 4$ — the inputs of the two engines do not add; option D evaluates the expression at ONE seat $x = 1$ — a value of the function, not its minimum (the minimum over all $x > 0$ is the smaller number $4$).' },
    ] },

    { kind: 'exercises', title: 'Exercises 4.3', sets: [
      { level: 'L1', questions: [
        { q: 'For the lists $a = (2, -1, 2)$ and $b = (1, 3, 4)$: compute the dot product, the two list-sizes, verify the Cauchy-Schwarz inequality exactly, and decide whether this pair could ever tie.', solution: [
          'The dot product: $2 \\cdot 1 + (-1) \\cdot 3 + 2 \\cdot 4 = 2 - 3 + 8 = 7$.',
          'The list-sizes: $\\sum a^2 = 4 + 1 + 4 = 9$ and $\\sum b^2 = 1 + 9 + 16 = 26$, so the ceiling is $\\sqrt{9}\\sqrt{26} = 3\\sqrt{26} \\approx 15.3$.',
          'The inequality reads $7^2 = 49 \\leq 9 \\cdot 26 = 234$ — a wide strict gap.',
          'The tie question: a tie needs $b_i = \\lambda a_i$ for every $i$, but the ratios $\\frac{1}{2}, \\frac{3}{-1}, \\frac{4}{2}$ are three different numbers ($0.5, -3, 2$) — so this pair can never tie.',
        ], answer: 'dot product $7$; sizes $9$ and $26$; $49 \\leq 234$, strict — not proportional, so no tie' },
        { q: 'For the split $\\frac{1}{1} + \\frac{4}{1} + \\frac{9}{4}$: verify the Engel floor exactly, and construct a replacement first list that TIES the floor on the same bottoms.', solution: [
          'Read the tops as squares: $\\frac{1^2}{1} + \\frac{2^2}{1} + \\frac{3^2}{4}$ — the list $a = (1,2,3)$ over the bottoms $b = (1,1,4)$, all positive, so the machine is live.',
          'The floor: $\\frac{(1+2+3)^2}{1+1+4} = \\frac{36}{6} = 6$; the actual value is $1 + 4 + \\frac{9}{4} = \\frac{29}{4} = 7.25$ — the floor holds, strict by $\\frac{5}{4}$.',
          'The ratios $\\frac{1}{1}, \\frac{2}{1}, \\frac{3}{4}$ are not constant — that is exactly why the gap exists; a tie needs $a_i = \\mu b_i$, that is $a = (\\mu, \\mu, 4\\mu)$.',
          'Take $\\mu = 1$: the list $a = (1,1,4)$ gives $\\frac{1}{1} + \\frac{1}{1} + \\frac{16}{4} = 6 = \\frac{(1+1+4)^2}{6}$ — a tie, as designed.',
        ], answer: 'floor $6 \\leq \\frac{29}{4}$, strict; the tie list is any $(\\mu, \\mu, 4\\mu)$ — e.g. $(1,1,4)$ gives $6 = 6$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Verify $(a+b+c)^2 \\leq 3(a^2+b^2+c^2)$ on the triples $(1,2,3)$, $(5,5,5)$ and $(1,0,0)$, and state the exact equality condition with its reason.', solution: [
          'This is the all-ones read at $n = 3$: Cauchy-Schwarz on the triple against the list $(1,1,1)$.',
          'The roster: $(1,2,3)$ gives $36 \\leq 3 \\cdot 14 = 42$, strict; $(5,5,5)$ gives $225 = 3 \\cdot 75 = 225$, a tie; $(1,0,0)$ gives $1 \\leq 3$, strict — the lone entry pays the full tax.',
          'The reason: equality needs the first list proportional to $(1,1,1)$, that is all three entries EQUAL — the equal triple ties, every other triple is strict.',
        ], answer: '$36 \\leq 42$ strict, $225 = 225$ tie, $1 \\leq 3$ strict; equality iff $a = b = c$' },
        { q: 'For $x, y > 0$ with $x + y = 8$, find the least value of $\\frac{1}{x} + \\frac{1}{y}$ and the seat where it is attained.', solution: [
          'Square the tops: $\\frac{1}{x} + \\frac{1}{y} = \\frac{1^2}{x} + \\frac{1^2}{y}$ — the bottoms are positive, Engel is live.',
          'The floor: $\\geq \\frac{(1+1)^2}{x+y} = \\frac{4}{8} = \\frac{1}{2}$ — the constraint itself is the bottom-sum.',
          'The tie needs the constant ratio $\\frac{1}{x} = \\frac{1}{y}$, that is $x = y$; with $x + y = 8$ the seat is $(4,4)$, where the value is $\\frac{1}{4} + \\frac{1}{4} = \\frac{1}{2}$ exactly.',
        ], answer: 'least value $\\frac{1}{2}$, attained at $x = y = 4$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Compute $\\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b}$ at $(a,b,c) = (2,3,4)$ exactly, compare with $\\frac{3}{2}$, and explain why the gap is smaller here than at $(1,2,3)$.', solution: [
          'The value: $\\frac{2}{7} + \\frac{3}{6} + \\frac{4}{5} = \\frac{2}{7} + \\frac{1}{2} + \\frac{4}{5} = \\frac{20 + 35 + 56}{70} = \\frac{111}{70} \\approx 1.586$.',
          'Against the bound: $\\frac{111}{70} - \\frac{3}{2} = \\frac{111 - 105}{70} = \\frac{6}{70} = \\frac{3}{35} \\approx 0.086$ — above by less than a tenth.',
          'At $(1,2,3)$ the value was $\\frac{17}{10}$, above by $\\frac{1}{5} = 0.2$: the entries $2,3,4$ are closer to equal than $1,2,3$, and Nesbitt\u2019s tie happens exactly AT the equal triple — the closer to equal, the tighter the bound grips.',
        ], answer: '$\\frac{111}{70} \\geq \\frac{3}{2}$ with gap $\\frac{3}{35}$ — tighter than the $\\frac{1}{5}$ gap at $(1,2,3)$ because $(2,3,4)$ is closer to the equal triple' },
        { q: 'Prove $(a+b+c)^2 \\geq 3(ab+bc+ca)$ by the 4.1 square certificate, then prove it again by Cauchy-Schwarz on the rotated lists; verify both routes at $(1,2,3)$.', solution: [
          'Route one: $(a+b+c)^2 - 3(ab+bc+ca) = a^2+b^2+c^2 - ab-bc-ca = \\frac{1}{2}\\left[(a-b)^2+(b-c)^2+(c-a)^2\\right] \\geq 0$ — a sum of squares, the 4.1 discipline.',
          'Route two: run Cauchy-Schwarz on the lists $(a,b,c)$ and $(b,c,a)$ — their dot product IS $ab + bc + ca$, and both list-sizes are $a^2+b^2+c^2$, so $ab+bc+ca \\leq a^2+b^2+c^2$.',
          'Now assemble: $(a+b+c)^2 = (a^2+b^2+c^2) + 2(ab+bc+ca) \\geq (ab+bc+ca) + 2(ab+bc+ca) = 3(ab+bc+ca)$ — the rotated-lists route lands on the same rung.',
          'Witness at $(1,2,3)$: $36 \\geq 3 \\cdot 11 = 33$, and the certificate\u2019s gap $\\frac{1}{2}\\left[1 + 1 + 4\\right] = 3 = 36 - 33$ — both routes report the same gap, tying exactly at $a = b = c$.',
        ], answer: 'proved both ways; at $(1,2,3)$: $33 \\leq 36$, gap $3$' },
        { q: 'Find the least value of $x + \\frac{9}{x}$ for $x > 0$ by AM-GM, then again by Engel with the perfect-square certificate; reconcile the two routes.', solution: [
          'AM-GM: $x + \\frac{9}{x} \\geq 2\\sqrt{x \\cdot \\frac{9}{x}} = 6$, equality at $x = \\frac{9}{x}$, that is $x = 3$.',
          'Engel: $x + \\frac{9}{x} = \\frac{x^2}{x} + \\frac{3^2}{x} \\geq \\frac{(x+3)^2}{2x}$; then $(x+3)^2 - 12x = x^2 - 6x + 9 = (x-3)^2 \\geq 0$ gives $\\frac{(x+3)^2}{2x} \\geq \\frac{12x}{2x} = 6$.',
          'Both rungs of the Engel route are tight at $x = 3$ (the ratios $\\frac{x}{x} = 1$ and $\\frac{3}{x} = 1$ agree exactly there), so Engel also reports the least value $6$ at $x = 3$.',
          'Check the seat and the certificate: $3 + \\frac{9}{3} = 6$, and $x + \\frac{9}{x} - 6 = \\frac{(x-3)^2}{x} \\geq 0$ from first principles — two engines, one answer.',
        ], answer: 'least value $6$ at $x = 3$ — both engines agree' },
      ] },
      { level: 'L4', questions: [
        { q: 'exam-style · Single Correct: the smallest constant $k$ for which $(a+b+c)^2 \\leq k(a^2+b^2+c^2)$ holds for ALL real $a, b, c$ is: (A) $1$ (B) $2$ (C) $3$ (D) $9$.', solution: [
          'The all-ones read gives $(a+b+c)^2 \\leq 3(a^2+b^2+c^2)$ for every real triple — so $k = 3$ works: option C.',
          'Sharpness: at $a = b = c = 1$ the claim reads $9 \\leq 3k$ — so any working $k$ must satisfy $k \\geq 3$; no smaller constant survives the equal triple.',
          'The distractors: option A fails at $(1,1,1)$ ($9 > 3$); option B fails there too ($9 > 6$); option D ($9$) works but is not smallest — the tie at the equal triple both demands $3$ and forbids more.',
        ], answer: '$k = 3$ (option C) — attained at $a = b = c$, sharp in both directions' },
        { q: 'exam-style · Numerical Value: for $x, y > 0$ with $x + y = 6$, the least value of $\\frac{2}{x} + \\frac{8}{y}$ is:', solution: [
          'Square-root split the tops: $\\frac{2}{x} = \\frac{(\\sqrt{2})^2}{x}$ and $\\frac{8}{y} = \\frac{(2\\sqrt{2})^2}{y}$ — positive bottoms, Engel live.',
          'The floor: $\\frac{2}{x} + \\frac{8}{y} \\geq \\frac{(\\sqrt{2} + 2\\sqrt{2})^2}{x+y} = \\frac{(3\\sqrt{2})^2}{6} = \\frac{18}{6} = 3$.',
          'The tie: $\\frac{\\sqrt{2}}{x} = \\frac{2\\sqrt{2}}{y}$ means $y = 2x$; with $x + y = 6$ the seat is $(2,4)$ — check: $\\frac{2}{2} + \\frac{8}{4} = 1 + 2 = 3$, the floor attained.',
        ], answer: '$3$ (attained at $x = 2, y = 4$)' },
        { q: 'exam-style · Single Correct: given $a_1^2 + a_2^2 = 4$ and $b_1^2 + b_2^2 = 9$, the largest value of $a_1b_1 + a_2b_2$ is: (A) $5$ (B) $6$ (C) $36$ (D) $13$.', solution: [
          'The unsquared read: $|a_1b_1 + a_2b_2| \\leq \\sqrt{4}\\cdot\\sqrt{9} = 2 \\cdot 3 = 6$ — the ceiling is $6$: option B.',
          'It is attained: $a = (2,0)$ against $b = (3,0)$ gives $6$; so does the proportional pair $a = \\left(\\frac{6}{5}, \\frac{8}{5}\\right)$ against $b = \\left(\\frac{9}{5}, \\frac{12}{5}\\right)$ — the sizes check ($\\frac{36+64}{25} = 4$, $\\frac{81+144}{25} = 9$) and the dot product is $\\frac{54+96}{25} = 6$.',
          'The distractors: option A adds the roots ($2 + 3$) — the bound is a product of roots, not a sum; option C reports the SQUARE $36$ — the ceiling for the squared version, not for the dot product; option D adds the raw sizes ($4 + 9$) — the same adding habit one floor down.',
        ], answer: '$6$ (option B) — the product of the two list-sizes, attained by proportional pairs' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove $\\frac{a^2}{a+b} + \\frac{b^2}{b+c} + \\frac{c^2}{c+a} \\geq \\frac{a+b+c}{2}$ for positive $a, b, c$, and verify it at $(1,2,3)$.', solution: [
          'The bottoms $a+b$, $b+c$, $c+a$ are positive — Engel is live.',
          'The machine: $\\frac{a^2}{a+b} + \\frac{b^2}{b+c} + \\frac{c^2}{c+a} \\geq \\frac{(a+b+c)^2}{(a+b)+(b+c)+(c+a)} = \\frac{(a+b+c)^2}{2(a+b+c)} = \\frac{a+b+c}{2}$ — the bottom-sum is twice the top-sum\u2019s base, and the sum cancels.',
          'Witness at $(1,2,3)$: the left side is $\\frac{1}{3} + \\frac{4}{5} + \\frac{9}{4} = \\frac{20 + 48 + 135}{60} = \\frac{203}{60} \\approx 3.38$ against the floor $\\frac{6}{2} = 3$ — strict, since the ratios $\\frac{1}{3}, \\frac{2}{5}, \\frac{3}{4}$ are not constant.',
          'The tie is at $a = b = c$: there every ratio is $\\frac{1}{2}$ and both sides read $\\frac{3a}{2}$.',
        ], answer: 'proved by Engel with bottom-sum $2(a+b+c)$; at $(1,2,3)$: $\\frac{203}{60} \\geq 3$, strict (ties only at $a = b = c$)' },
        { q: 'exam-style · Multiple Correct: exactly which of the following pairs TIE the Cauchy-Schwarz bound? (i) $a = (1,2)$, $b = (2,4)$; (ii) $a = (1,2)$, $b = (-2,-4)$; (iii) $a = (1,2)$, $b = (2,3)$; (iv) $a = (0,0)$, $b = (3,4)$.', solution: [
          'The tie condition is proportionality: $b = \\lambda a$ for some constant $\\lambda$ (the zero list counting).',
          '(i): $b = 2a$ — proportional: $10^2 = 100 = 5 \\cdot 20$. Ties.',
          '(ii): $b = -2a$ — proportional with a negative constant: $(-10)^2 = 100 = 5 \\cdot 20$. Ties — the squared version\u2019s tie includes both signs (the unsquared read ties with $|{-10}| = \\sqrt{5}\\sqrt{20} = 10$).',
          '(iii): not proportional ($\\frac{1}{2} \\neq \\frac{2}{3}$): $8^2 = 64 < 5 \\cdot 13 = 65$ — strict by exactly $1$, the narrowest possible miss. Does not tie.',
          '(iv): the zero list is $0$ times anything: $0 = 0 \\cdot 25$. Ties. Hence (i), (ii) and (iv) tie; (iii) alone is strict.',
        ], answer: '(i), (ii) and (iv) tie; (iii) is strict ($64 < 65$)' },
        { q: 'Prove $(|x| + |y| + |z|)^2 \\leq 3(x^2 + y^2 + z^2)$ for all real $x, y, z$, state the equality condition, and witness the bound at $(3,-4,0)$ and $(1,-1,1)$.', solution: [
          'Apply the all-ones read to the list of ABSOLUTE VALUES $(|x|, |y|, |z|)$ — its entries are non-negative, and Cauchy-Schwarz prices any real list.',
          'The read gives $(|x|+|y|+|z|)^2 \\leq 3(|x|^2+|y|^2+|z|^2) = 3(x^2+y^2+z^2)$ — the absolute values square away. This is the promise lesson 4.6 cashes into the triangle-inequality family.',
          'Equality needs $|x| = |y| = |z|$ — equal absolute values, the signs free to fight.',
          'Witness $(3,-4,0)$: $(3+4+0)^2 = 49 \\leq 3 \\cdot 25 = 75$, strict (the sizes $3, 4, 0$ differ). Witness $(1,-1,1)$: $(1+1+1)^2 = 9 = 3 \\cdot 3 = 9$ — a tie, signs fighting, sizes equal.',
        ], answer: 'proved from the all-ones read; equality iff $|x| = |y| = |z|$; $49 \\leq 75$ strict, $9 = 9$ tie' },
      ] },
      { level: 'L6', questions: [
        { q: 'exam-style · Linked Comprehension: consider the quadratic $f(t) = (t+1)^2 + (2t+2)^2 + (3t+3)^2$. (A) Write $f(t)$ in the form $c(t+d)^2$ and read the discriminant. (B) Find where $f$ touches the $t$-axis, and say what that seat reveals about the two lists behind $f$. (C) State what the Cauchy-Schwarz engine concludes for those lists, and verify the tie numerically.', solution: [
          '(A) Collect: $(t+1)^2 + (2t+2)^2 + (3t+3)^2 = (1 + 4 + 9)(t+1)^2 = 14(t+1)^2$ — so $f(t) = 14t^2 + 28t + 14$ with discriminant $28^2 - 4 \\cdot 14 \\cdot 14 = 784 - 784 = 0$.',
          '(B) $f$ touches at $t_0 = -1$, the double root. Behind $f$ sit the lists $a = (1,2,3)$ (the $t$-coefficients) and $b = (1,2,3)$ (the constants): touching at $t_0 = -1$ says $a_it_0 + b_i = 0$ for every $i$, i.e. $b_i = -t_0 a_i = a_i$ — the lists are proportional with $\\lambda = 1$.',
          '(C) The engine concludes the TIE: $\\left(\\sum a_ib_i\\right)^2 = \\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right)$. Numerically $\\sum a_ib_i = 1 + 4 + 9 = 14$, $\\sum a_i^2 = 14$, $\\sum b_i^2 = 14$ — and $14^2 = 196 = 14 \\cdot 14$: the never-negative quadratic touches, the discriminant vanishes, and Cauchy-Schwarz ties — three languages, one fact.',
        ], answer: '(A) $f(t) = 14(t+1)^2$, $D = 0$; (B) touches at $t_0 = -1$ — the lists proportional, $\\lambda = 1$; (C) $196 = 196$, the tie verified' },
        { q: 'Prove Lagrange\u2019s identity $\\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right) - \\left(\\sum a_ib_i\\right)^2 = \\sum_{i<j} (a_ib_j - a_jb_i)^2$ for lists of length three, verify it at $a = (1,2,3)$, $b = (4,5,6)$, and read off both the Cauchy-Schwarz inequality and its equality case.', solution: [
          'Expand the two products: $\\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right) = \\sum_{i,j} a_i^2b_j^2$ — all nine pairings of a square from the first list against a square from the second; and $\\left(\\sum a_ib_i\\right)^2 = \\sum_i a_i^2b_i^2 + 2\\sum_{i<j} a_ib_ia_jb_j$.',
          'Subtract: the three DIAGONAL terms $a_i^2b_i^2$ cancel, leaving for each pair $i < j$ the cross block $a_i^2b_j^2 + a_j^2b_i^2 - 2a_ib_ja_jb_i$.',
          'Each cross block is a perfect square: $a_i^2b_j^2 + a_j^2b_i^2 - 2a_ib_ja_jb_i = (a_ib_j - a_jb_i)^2$. So the difference of the two sides is a SUM OF SQUARES — never negative: that IS Cauchy-Schwarz, proved by expansion instead of the discriminant.',
          'Verify at $(1,2,3)$, $(4,5,6)$: the left side is $14 \\cdot 77 - 32^2 = 1078 - 1024 = 54$; the right side is $(1 \\cdot 5 - 2 \\cdot 4)^2 + (1 \\cdot 6 - 3 \\cdot 4)^2 + (2 \\cdot 6 - 3 \\cdot 5)^2 = (-3)^2 + (-6)^2 + (-3)^2 = 9 + 36 + 9 = 54$ — the identity cashes exactly.',
          'The equality read: the gap is zero exactly when every cross difference $a_ib_j - a_jb_i$ vanishes — that is, when the ratios $\\frac{a_i}{b_i}$ agree across every pair (barring zero entries, honestly: one list a constant multiple of the other). Hence Cauchy-Schwarz ties exactly for proportional lists — the discriminant engine\u2019s verdict, reached by expansion.',
        ], answer: 'the identity holds by the cross-block expansion; witness $54 = 9 + 36 + 9$; Cauchy-Schwarz and its proportional-list tie fall out of the sum-of-squares read' },
      ] },
    ] },
  ],
}

/* figures for lesson 4.3 — the discriminant engine's two parabolas;     */
/* the Engel machine                                                      */

function csDiscriminantSvg(): string {
  // left: the strict case a = (1,2,3), b = (4,5,6) — f(t) = 14t²+64t+77
  // floats above the t-axis (D = −216, min 27/7 at t = −16/7); right: the
  // proportional case a = (1,2,3), b = (2,4,6) — f(t) = 14(t+2)² touches
  // at t₀ = −2 (D = 0). Both parabolas drawn over t ∈ [−4.5, 0.5] at
  // 64 px per unit horizontally, 2 px per unit vertically from the axis
  // y = 300; the quadratic Beziers are EXACT for the parabolas (their
  // midpoints (180,290) and (540,300) are f(−2) = 5 and f(−2) = 0).
  const AX = 300
  const tick = (base: number): string => {
    let out = ''
    for (const t of [-4, -3, -2, -1, 0]) {
      const x = base + (t + 4.5) * 64
      out += `<line x1="${x}" y1="${AX}" x2="${x}" y2="${AX + 6}" stroke="#0d9488" stroke-width="1.4"/>`
      out += `<text x="${x}" y="${AX + 18}" font-size="10" text-anchor="middle" fill="#0f766e">${t}</text>`
    }
    return out
  }
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The discriminant engine proving Cauchy-Schwarz, drawn as two parabolas in t. Left panel, the strict case: for the lists a equals one two three and b equals four five six, the never-negative quadratic f of t equals fourteen t squared plus sixty-four t plus seventy-seven floats above the t-axis, discriminant minus two hundred sixteen, minimum twenty-seven sevenths at t equals minus sixteen sevenths. Right panel, the equality case: for a equals one two three and b equals two four six, the quadratic f of t equals fourteen times the square of t plus two touches the axis at t zero equals minus two — the proportionality point. Strict floats, proportional touches.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the discriminant engine — f(t) = Σ(aᵢt + bᵢ)² ≥ 0 for every real t</text>
  <line x1="360" y1="40" x2="360" y2="316" stroke="#fcd34d" stroke-width="1.4"/>
  <text x="180" y="52" font-size="12.5" font-weight="700" text-anchor="middle" fill="#166534">strict — a = (1,2,3), b = (4,5,6)</text>
  <text x="180" y="70" font-size="11.5" text-anchor="middle" fill="#65a30d">f(t) = 14t² + 64t + 77</text>
  <line x1="20" y1="${AX}" x2="340" y2="${AX}" stroke="#0d9488" stroke-width="2.2"/>
  ${tick(20)}
  <path d="M20,155 Q180,465 340,75" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <circle cx="162" cy="292" r="5.5" fill="#ea580c"/>
  <text x="162" y="282" font-size="10" font-weight="700" text-anchor="middle" fill="#166534">vertex (−16/7, 27/7)</text>
  <text x="180" y="336" font-size="10.5" font-weight="700" text-anchor="middle" fill="#dc2626">D = −216 &lt; 0 — floats: strict, gap 54</text>
  <text x="540" y="52" font-size="12.5" font-weight="700" text-anchor="middle" fill="#166534">equality — a = (1,2,3), b = (2,4,6)</text>
  <text x="540" y="70" font-size="11.5" text-anchor="middle" fill="#65a30d">f(t) = 14(t + 2)²</text>
  <line x1="380" y1="${AX}" x2="700" y2="${AX}" stroke="#0d9488" stroke-width="2.2"/>
  ${tick(380)}
  <path d="M380,125 Q540,475 700,125" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <circle cx="540" cy="${AX}" r="6" fill="#ea580c"/>
  <text x="540" y="262" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">touches at t₀ = −2</text>
  <text x="540" y="278" font-size="10.5" font-weight="700" text-anchor="middle" fill="#d97706">b = 2a — proportional</text>
  <text x="540" y="336" font-size="10.5" font-weight="700" text-anchor="middle" fill="#16a34a">D = 0 — it touches at t₀ = −λ: the tie</text>
</svg>`
}

function engelMachineSvg(): string {
  // the fraction-sum machine as four stages with the witness 4/1 + 9/2
  // running through: split → square → sum → divide → the floor 25/3,
  // checked against the true value 17/2
  const box = (x: number, stage: string, line1: string, line2: string, val: string): string => {
    return `<rect x="${x}" y="56" width="156" height="92" rx="8" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>
  <text x="${x + 78}" y="76" font-size="11" font-weight="700" text-anchor="middle" fill="#ea580c">${stage}</text>
  <text x="${x + 78}" y="97" font-size="9.5" text-anchor="middle" fill="#0f766e">${line1}</text>
  <text x="${x + 78}" y="111" font-size="9.5" text-anchor="middle" fill="#0f766e">${line2}</text>
  <text x="${x + 78}" y="136" font-size="11.5" font-weight="700" text-anchor="middle" fill="#65a30d">${val}</text>`
  }
  const arrow = (x1: number): string =>
    `<line x1="${x1}" y1="102" x2="${x1 + 14}" y2="102" stroke="#ea580c" stroke-width="2.4"/><polygon points="${x1 + 14},97 ${x1 + 24},102 ${x1 + 14},107" fill="#ea580c"/>`
  return `<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Engel machine — the fraction-sum floor in four stages. Stage one, split the sum into terms with positive bottoms: four over one plus nine over two. Stage two, read every top as a square: two squared over one plus three squared over two. Stage three, sum the tops to five and the bottoms to three. Stage four, divide: the floor is the square of five over three, twenty-five thirds. The verdict strip checks it: the true value seventeen halves is at least twenty-five thirds, strict because the ratio two over one differs from three over two.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the Engel machine — split → square → sum → divide</text>
  ${box(20, '1 · SPLIT', 'the sum into terms,', 'each with a positive bottom', '4/1 + 9/2')}
  ${arrow(176)}
  ${box(196, '2 · SQUARE', 'read every top', 'as a square', '2²/1 + 3²/2')}
  ${arrow(352)}
  ${box(372, '3 · SUM', 'the tops: 2 + 3 = 5', 'the bottoms: 1 + 2 = 3', '5 and 3')}
  ${arrow(528)}
  ${box(548, '4 · DIVIDE', 'the squared top-sum', 'over the bottom-sum', '(2+3)²/(1+2) = 25/3')}
  <rect x="20" y="168" width="684" height="50" rx="8" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>
  <text x="360" y="188" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">check: 4/1 + 9/2 = 17/2 = 8.5 ≥ 25/3 ≈ 8.33 — the machine\u2019s floor</text>
  <text x="360" y="207" font-size="10.5" text-anchor="middle" fill="#0f766e">tight exactly when 2/1 = 3/2 — here 2 ≠ 1.5, so the floor is strict</text>
  <text x="360" y="240" font-size="12" font-weight="700" text-anchor="middle" fill="#166534">Engel\u2019s form · Titu\u2019s lemma:  Σ aᵢ²/bᵢ ≥ (Σaᵢ)²/Σbᵢ  for positive bottoms bᵢ</text>
  <text x="360" y="262" font-size="10.5" text-anchor="middle" fill="#0f766e">equality iff aᵢ/bᵢ is constant — the fraction-sum speed tool of the training banks</text>
  <text x="360" y="284" font-size="10.5" text-anchor="middle" fill="#65a30d">names it also carries: Bergström\u2019s inequality · Sedrakyan\u2019s inequality</text>
</svg>`
}



/** 4.4 — authored 2026-11-18 by the parallel swarm (owner chat directive);
 *  engine sections G/H grown and run green (bun scripts/aa-ch04-work/run-44.ts,
 *  G 299/299, H 39/39) before the prose was declared done — every census,
 *  witness, illustration and exercise answer below is recomputed there (G:
 *  the rearrangement law brute-forced over all permutations, n = 2, 3, 4,
 *  signs and repeats included; Chebyshev swept on exact integer arithmetic).
 *  Quiz keys [2, 0, 1, 1, 0]; 15 exercises L1–L6 = 2/2/3/3/3/2; 2 figures
 *  (swap certificate + pairing bars); 4 derivations; 5 formula cards; 10
 *  Illustrations; 10 terms; 9 tagged equations; word count 8,611
 *  (engine-measured by countLessonWords). */
 const lesson44: Lesson = {
  id: 'aa-the-rearrangement-and-chebyshev-inequalities',
  number: '4.4',
  title: 'The Rearrangement and Chebyshev Inequalities',
  concepts: [
    'rearrangement inequality',
    'exchange argument',
    'inversion',
    'similarly sorted sequences',
    'oppositely sorted sequences',
    'Chebyshev\u2019s sum inequality',
    'equality discipline',
    'the order engine at exam speed',
  ],
  objectives: [
    'State and prove the rearrangement inequality by the exchange argument: uncrossing an inversion never decreases the pairing sum, so the sorted pairing is the ceiling and the reversed the floor — with the equality discipline honest about repeated entries.',
    'Run the pairing census on small lists and read the sequence-order questions at exam speed: the maximum of $\\sum k\\,a_k$ over arrangements, the band between reversed and sorted, no calculus anywhere.',
    'Derive Chebyshev\u2019s sum inequality from rearrangement via the cyclic table, and apply both sorted forms — similarly and oppositely sorted — with the constant-list equality discipline.',
    'Price the mixed witnesses by several engines — the $\\geq 9$ reciprocal family by AM-GM and by Chebyshev — and audit honestly which engine applies to which pairing.',
    'Separate the order engine from Cauchy-Schwarz (lesson 4.3): magnitudes bound the dot product, rearrangement locates the maximum over orderings — two different questions, both answered.',
  ],
  prerequisites: ['aa-cauchy-schwarz-and-engels-form', 'aa-the-weighted-am-gm-and-its-consequences'],
  sources: [
    'cengage-jee-style',
    'ncert-math11-ch5-linear-inequalities',
    'jee-main-2026-syllabus',
    'wikipedia-rearrangement-inequality',
    'wikipedia-chebyshev-sum-inequality',
    'wikipedia-pafnuty-chebyshev',
  ],
  blocks: [
    { kind: 'para', text: 'Lesson 4.1 priced sums of given numbers: the arithmetic mean never drops below the geometric, equality at the equal split. Lesson 4.2 put weights on those means; lesson 4.3 priced dot products of given lists — Cauchy-Schwarz caps $\\sum a_ib_i$ by the two magnitudes, and Engel\u2019s form turned the cap into a fraction-sum floor. In every one of those engines the lists arrived FIXED: the numbers given, the bound the answer. This lesson prices something none of them could see — the CHOICE of pairing itself. Two lists stand on the table, say $a = (1, 2, 3)$ and $b = (10, 20, 30)$, and the work pairs each $a$-entry with exactly one $b$-entry. Six pairings are possible, and they are not equal: the sorted pairing pays $140$, the reversed pays $100$, and the difference — $40$, on lists this small — is a number no mean engine and no magnitude engine ever quoted. Order itself is an engine, and this lesson builds it.' },
    { kind: 'para', text: 'The build has two storeys. The ground floor is the REARRANGEMENT INEQUALITY, proved by the cleanest one-certifier argument in the book: if a pairing contains a crossed pair — an inversion — uncrossing it changes the sum by a single product of order gaps, never negative; bubble every inversion away and no arrangement can beat the sorted pairing, none can fall below the reversed. The upper storey is CHEBYSHEV\u2019S SUM INEQUALITY — for two similarly sorted lists, the average of the products beats the product of the averages — and it is not a new engine at all: it falls out of rearrangement by summing one cyclic table. Between the storeys sit the mixed witnesses: the $(a+b+c)(1/a+1/b+1/c) \\geq 9$ family priced by BOTH engines at once, the sequence-order reads $\\sum k\\,a_k$ at exam speed, and the honest separation of this engine from Cauchy-Schwarz — magnitudes against orderings, two different questions. The chapter\u2019s order engine, assembled.' },

    { kind: 'heading', text: 'The Pairing Question' },
    { kind: 'para', text: 'Fix the vocabulary once. A PAIRING of the two lists assigns to every seat $i = 1, \\dots, n$ one $a$-entry $a_i$ and one $b$-entry — each $b$-entry used exactly once. Choosing a pairing is choosing an arrangement of the $b$-list against the fixed $a$-list: a permutation $\\sigma$, and the payout is the pairing sum.' },
    { kind: 'equation', latex: 'S(\\sigma) \\;=\\; \\sum_{i=1}^{n} a_i\\,b_{\\sigma(i)} \\tag{1}', note: 'the pairing sum — one arrangement $\\sigma$ of the $b$-entries against the fixed $a$-list; the question of this section is its maximum and its minimum over all $n!$ arrangements.' },
    { kind: 'para', text: 'Nothing in $S(\\sigma)$ knows anything about means or magnitudes: it is pure pairing. And the question "which $\\sigma$ maximises it?" is a question about ORDER — which is why the whole engine runs on the next definition.' },
    { kind: 'callout', tone: 'definition', title: 'Similarly and oppositely sorted sequences', text: 'Two finite real sequences $a_1, a_2, \\dots, a_n$ and $b_1, b_2, \\dots, b_n$ are said to be SIMILARLY SORTED if they rise and fall together — $a_1 \\leq a_2 \\leq \\dots \\leq a_n$ and $b_1 \\leq b_2 \\leq \\dots \\leq b_n$ (or both non-increasing). They are OPPOSITELY SORTED if one is non-decreasing while the other is non-increasing. Thus, $(1, 2, 3)$ with $(10, 20, 30)$ are similarly sorted, $(1, 2, 3)$ with $(30, 20, 10)$ oppositely sorted — and a constant list is both at once, the honest edge seat where every pairing pays the same.' },
    { kind: 'para', text: 'For example, on small rosters:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $(1, 2, 3)$ with $(10, 20, 30)$ — similarly sorted, both ascending;',
      '(ii) $(1, 2, 3)$ with $(30, 20, 10)$ — oppositely sorted, one up and one down;',
      '(iii) $(-3, -1, 2)$ with $(-5, 0, 7)$ — similarly sorted as well: the engine runs on ORDER, not on positivity (no sign assumption anywhere);',
      '(iv) $(5, 5, 5)$ with any sorted list — the constant edge seat, simultaneously similarly and oppositely sorted, where every certificate in this lesson collapses to equality.',
    ] },
    { kind: 'para', text: 'Now run the full census on the smallest honest roster: $a = (1, 2, 3)$ against every arrangement of $b = (10, 20, 30)$. There are six pairings, six sums, one table — and the engine\u2019s whole story is already in it.' },
    { kind: 'table', caption: 'The six pairing sums of $a = (1, 2, 3)$ with $b = (10, 20, 30)$ — every value recomputed by the engine before this prose was written. The sorted arrangement tops the table at $140$, the reversed bottoms it at $100$, and the middle seats tie: twice $130$, twice $110$. Ties live mid-table; for distinct entries the ceiling and the floor are each attained exactly once.', head: ['The $b$-arrangement', 'The pairing sum', 'The verdict'], rows: [
      ['$(10, 20, 30)$ — the sorted', '$1\\cdot10 + 2\\cdot20 + 3\\cdot30 = 140$', 'the ceiling — order kept'],
      ['$(10, 30, 20)$', '$1\\cdot10 + 2\\cdot30 + 3\\cdot20 = 130$', 'a middle seat'],
      ['$(20, 10, 30)$', '$1\\cdot20 + 2\\cdot10 + 3\\cdot30 = 130$', 'a middle seat'],
      ['$(20, 30, 10)$', '$1\\cdot20 + 2\\cdot30 + 3\\cdot10 = 110$', 'a middle seat'],
      ['$(30, 10, 20)$', '$1\\cdot30 + 2\\cdot10 + 3\\cdot20 = 110$', 'a middle seat'],
      ['$(30, 20, 10)$ — the reversed', '$1\\cdot30 + 2\\cdot20 + 3\\cdot10 = 100$', 'the floor — order reversed'],
    ] },
    { kind: 'example', title: 'For the lists a = (1, 2, 3) and b = (10, 20, 30), compute all six pairing sums and identify the maximum and the minimum pairings', steps: [
      'A pairing is an arrangement of $(10, 20, 30)$ against the fixed $(1, 2, 3)$ — six in all.',
      'The sorted arrangement $(10, 20, 30)$ pays $1\\cdot10 + 2\\cdot20 + 3\\cdot30 = 10 + 40 + 90 = 140$.',
      'Two near-miss seats: $(10, 30, 20)$ pays $10 + 60 + 60 = 130$, and $(20, 10, 30)$ pays $20 + 20 + 90 = 130$ — both middle seats.',
      'Two lower seats: $(20, 30, 10)$ pays $20 + 60 + 30 = 110$, and $(30, 10, 20)$ pays $30 + 20 + 60 = 110$.',
      'The reversed $(30, 20, 10)$ pays $30 + 40 + 30 = 100$.',
      'Hence the six sums read $140, 130, 130, 110, 110, 100$: the sorted pairing tops the table at $140$ (alone), the reversed bottoms it at $100$ (alone) — the choice of pairing is worth $40$ on these lists.',
    ] },
    { kind: 'para', text: 'Read the table twice. First read: the extremes are ORDER statements — keep the order and you sit on the ceiling, reverse it and you sit on the floor. Second read: the middle seats are honest — a single crossing already costs (both $130$-seats carry exactly one crossing), and full reversal costs $40$. Nothing here needed the sizes $10, 20, 30$ to be large, positive, or nice: the same law holds for the negative roster $a = (-3, -1, 2)$ against $b = (-5, 0, 7)$ — the engine\u2019s sweep says the sorted pairing pays $29$ and the reversed $-31$, the whole range of six sums. What the law needs is the pairing\u2019s ORDER, and that is a property no mean engine ever prices.' },
    { kind: 'callout', tone: 'warn', title: 'The engine prices ORDER, not positivity', text: 'Unlike the AM-GM family of lessons 4.1 and 4.2, the rearrangement inequality assumes nothing about the signs of the entries — the census above runs on positives, but $(-3, -1, 2)$ against $(-5, 0, 7)$ obeys the same law (sorted $29$, reversed $-31$), and the engine sweeps confirm it. What the engine DOES need is the order discipline: sort both lists first, then pair. The classic fraud is "biggest with biggest is obvious, so any roughly-sorted pairing is roughly maximal" — the table above drops $10$ for a single crossing and $40$ for the reversal; near-sorted is not near-maximal for free.' },
    { kind: 'para', text: 'So the pairing question sharpens into a theorem. Why exactly does the sorted pairing win — what is the mechanism, not just the census? The answer is one swap, priced by one product.' },
    { kind: 'figure', caption: 'The exchange certificate: the crossed pairing (left) pays $2\\cdot10 + 5\\cdot6 = 50$; the uncrossed (right) pays $2\\cdot6 + 5\\cdot10 = 62$. The difference is exactly $(5-2)(10-6) = 12$ — the product of the two order gaps, never negative when the lists agree in order. Uncrossing an inversion never loses: that one product is the whole proof engine.', svg: swapDiagramSvg() },

    { kind: 'heading', text: 'The Rearrangement Inequality, Proved by Exchange' },
    { kind: 'para', text: 'The picture is the proof. Take any pairing that contains a CROSS: two seats $i < j$ with $a_i \\leq a_j$, where the $b$-values paired at those seats run the wrong way — the seat with the smaller $a$ holds the larger $b$. That is an INVERSION. Uncross just those two assignments and the sum changes by one product:' },
    { kind: 'example', title: 'The lists a = (2, 7) and b = (9, 4): price the crossed pairing against the uncrossed one, and verify the swap certificate', steps: [
      'The crossed pairing — an inversion, the smaller $a$ holding the larger $b$: $2\\cdot9 + 7\\cdot4 = 18 + 28 = 46$.',
      'The uncrossed pairing: $2\\cdot4 + 7\\cdot9 = 8 + 63 = 71$.',
      'The certificate: the gap is $(7-2)(9-4) = 5\\cdot5 = 25$ — and $71 - 46 = 25$ exactly, the product of the two order gaps.',
      'Hence uncrossing never loses: $(a_j - a_i)(b_j - b_i) \\geq 0$ whenever both lists agree in order — the entire engine in one product, already proved for $n = 2$.',
    ] },
    { kind: 'para', text: 'The two-pair computation is worth pinning symbolically before the theorem rides it: for seats $i < j$ with $a_i \\leq a_j$ and $b$-values $b_i, b_j$ assigned in order, the sorted two-pair payout minus the swapped two-pair payout is exactly $(a_j - a_i)(b_j - b_i)$ — non-negative precisely because both factors share their sign. The theorem is this certificate, applied until no inversions remain.' },
    { kind: 'callout', tone: 'theorem', title: 'The rearrangement inequality, with its equality discipline', text: 'Let $a_1 \\leq a_2 \\leq \\dots \\leq a_n$ and $b_1 \\leq b_2 \\leq \\dots \\leq b_n$ be real lists, and let $\\sigma$ be any arrangement of the $b$-entries against the fixed $a$-list. Then $\\sum_{i=1}^{n} a_ib_{n+1-i} \\leq \\sum_{i=1}^{n} a_ib_{\\sigma(i)} \\leq \\sum_{i=1}^{n} a_ib_i$: the order-keeping (sorted) pairing is the MAXIMUM of all pairing sums, the order-reversing (reversed) pairing the MINIMUM. Equality in the ceiling holds exactly for order-keeping arrangements — the identity alone when the $b$-entries are pairwise distinct; equality in the floor exactly for order-reversing ones. Nothing is assumed about the signs of the entries.' },
    { kind: 'derivation', title: 'The rearrangement inequality by the exchange argument', statement: 'For ascending real lists $(a_i)$ and $(b_i)$, every pairing sum sits between the reversed pairing sum and the sorted pairing sum — proved by uncrossing inversions, one certificate at a time.', steps: [
      { label: 'The two-pair identity', formula: 'a_ib_i + a_jb_j - a_ib_j - a_jb_i = (a_j - a_i)(b_j - b_i)', explanation: 'Expand both sides: each is $a_jb_j + a_ib_i - a_jb_i - a_ib_j$. For seats $i < j$ with $a_i \\leq a_j$ and in-order $b$-values $b_i \\leq b_j$ the product is $\\geq 0$ — the sorted two-pair payout beats (or ties) the crossed one. This is the certificate the figure pinned at $(2, 7)\\times(9, 4)$: $71 - 46 = 25$.' },
      { label: 'Uncrossing an inversion never loses', formula: '\\Delta S = (a_j - a_i)\\,(b_i - b_j) \\geq 0 \\quad (b_i > b_j \\text{ paired against } a_i \\leq a_j)', explanation: 'An INVERSION is a pair of seats $i < j$ whose $b$-assignments run backwards: $b_i > b_j$ while $a_i \\leq a_j$. Swapping the two assignments changes the sum by exactly $(a_j - a_i)(b_i - b_j)$ — the same identity with the $b$-values traded — and both factors are non-negative, so the swap never decreases the sum.' },
      { label: 'The bubble terminates', formula: '\\text{inversion count} \\downarrow 0 \\text{ by one per swap}', explanation: 'Repairing an adjacent inversion (seats $i$ and $i+1$) drops the arrangement\u2019s inversion count by exactly one, and the count is a finite number between $0$ and $\\frac{n(n-1)}{2}$. After finitely many non-losing swaps no inversion remains — which means the $b$-values sit in non-decreasing order: the sorted pairing. Since the sum never decreased along the way, every pairing sum sits at or below the sorted sum.' },
      { label: 'The floor, by the same engine on the negated list', formula: '\\max_{\\sigma} \\sum a_i(-b_{\\sigma(i)}) = -\\sum a_ib_{n+1-i}', explanation: 'Apply the ceiling just proved to the ascending lists $(a_i)$ and $(-b)$: its sorted pairing pairs $a_i$ with $-b_{n+1-i}$ (the reversed pairing of $b$), so $\\sum a_i(-b_{\\sigma(i)}) \\leq -\\sum a_ib_{n+1-i}$ for every $\\sigma$. Multiplying by $-1$ flips the order: $\\sum a_ib_{\\sigma(i)} \\geq \\sum a_ib_{n+1-i}$ — the reversed pairing is the floor.' },
      { label: 'The equality discipline', formula: '\\text{ceiling: order-keeping;} \\quad \\text{floor: order-reversing}', explanation: 'If both lists have pairwise distinct entries, any arrangement that is not order-keeping contains an inversion whose repair gain is STRICTLY positive — so only the identity ties the ceiling (and only the reversal ties the floor). With repeated entries, swaps among equal $b$-values cost nothing: the honest statement is that the ceiling is tied exactly by order-keeping arrangements — those whose $b$-values already sit non-decreasing — and the floor by order-reversing ones. The middle-seat ties of the census table ($130$ twice, $110$ twice) are exactly this: tied pairings that neither keep nor reverse the order.' },
    ], result: '$\\sum_{i=1}^{n} a_ib_{n+1-i} \\ \\leq\\ \\sum_{i=1}^{n} a_ib_{\\sigma(i)} \\ \\leq\\ \\sum_{i=1}^{n} a_ib_i$ $\\qquad$ $\\text{(equality: order-reversing / order-keeping pairings)}$' },
    { kind: 'equation', latex: '\\sum_{i=1}^{n} a_ib_{n+1-i} \\;\\leq\\; \\sum_{i=1}^{n} a_ib_{\\sigma(i)} \\;\\leq\\; \\sum_{i=1}^{n} a_ib_i \\tag{2}', note: 'the rearrangement inequality — the reversed pairing floors every pairing sum, the sorted pairing ceilings it; sign of entries irrelevant, order everything.' },
    { kind: 'formula', name: 'The rearrangement inequality', latex: '\\sum_{i=1}^{n} a_ib_{n+1-i} \\leq \\sum_{i=1}^{n} a_ib_{\\sigma(i)} \\leq \\sum_{i=1}^{n} a_ib_i', note: 'for two similarly sorted lists: the sorted pairing is the maximum over all arrangements, the reversed the minimum; equality at the ceiling exactly for order-keeping arrangements (identity alone when the b-entries are distinct), at the floor for order-reversing ones. No sign assumptions.' },
    { kind: 'callout', tone: 'insight', title: 'The greedy reading', text: 'Why "biggest with biggest" wins: put $n$ runners in a relay and $n$ prizes by finishing place — the total take is maximised when the best runner collects the biggest prize, second-best the second, and so on. Any other allocation contains a crossed pair, and uncrossing it can only gain — the exchange argument is the greedy algorithm made a theorem. This is also why the engine needs no calculus and no sizes: it compares PAIRINGS, and the comparison is one product of order gaps.' },
    { kind: 'example', title: 'The exchange at work: the lists a = (1, 4, 6) carry the arrangement b = (8, 3, 5). Exhibit an inversion, price the swap, and bubble the arrangement to the top, decomposing the total gain into swap certificates', steps: [
      'The current sum: $1\\cdot8 + 4\\cdot3 + 6\\cdot5 = 8 + 12 + 30 = 50$ — a middle seat (the floor of these lists is the reversed pairing $1\\cdot8 + 4\\cdot5 + 6\\cdot3 = 8 + 20 + 18 = 46$).',
      'The inversion: seats 1 and 2 hold $b$-values $8 > 3$ against $a$-values $1 \\leq 4$ — the swap gain is $(4-1)(8-3) = 15$, landing at $(3, 8, 5)$ with sum $65$.',
      'The next inversion: seats 2 and 3 now hold $8 > 5$ against $4 \\leq 6$ — gain $(6-4)(8-5) = 6$, landing at the sorted $(3, 5, 8)$ with sum $3 + 20 + 48 = 71$, the ceiling.',
      'Hence $15 + 6 = 21 = 71 - 50$: two swap certificates account for the whole gap from this middle seat to the ceiling — every unit of the gap is an uncrossing.',
    ] },

    { kind: 'heading', text: 'Chebyshev\u2019s Sum Inequality' },
    { kind: 'para', text: 'The rearrangement inequality prices single pairings. Chebyshev\u2019s sum inequality — the upper storey — prices the AVERAGE of a pairing against a pairing-free quantity, and it is not a new engine: it is rearrangement summed over a cyclic table. The statement first, honestly labelled with its name and its equality case.' },
    { kind: 'callout', tone: 'theorem', title: 'Chebyshev\u2019s sum inequality, with its equality discipline', text: 'For similarly sorted real lists $a_1 \\leq \\dots \\leq a_n$ and $b_1 \\leq \\dots \\leq b_n$: $\\frac{1}{n}\\sum_{i=1}^{n} a_ib_i \\geq \\bar a\\,\\bar b$, where $\\bar a$ and $\\bar b$ are the two averages — the average of the products beats the product of the averages. For OPPOSITELY sorted lists the verdict reverses: $\\frac{1}{n}\\sum a_ib_i \\leq \\bar a\\,\\bar b$. Equality holds in either direction exactly when at least one of the two lists is constant (all entries equal).' },
    { kind: 'derivation', title: 'Chebyshev from rearrangement, via the cyclic table', statement: 'For similarly sorted lists, $\\frac{1}{n}\\sum a_ib_i \\geq \\bar a\\,\\bar b$ — derived from the rearrangement ceiling by summing the $n$ cyclic shifts of the $b$-list; the oppositely sorted verdict follows from the floor by the same sum.', steps: [
      { label: 'The cyclic table', formula: '\\sum_{k=0}^{n-1} \\Big(\\sum_{i=1}^{n} a_i b^{(k)}_i\\Big) = \\Big(\\sum a\\Big)\\Big(\\sum b\\Big)', explanation: 'Let $b^{(k)}$ be the $k$-th cyclic shift of the $b$-list (every entry moved round $k$ seats). Summing the $n$ shifted pairing sums feeds every $a_i$ against every $b_j$ exactly once — the whole multiplication table of the two lists, rebuilt from its $n$ diagonal pairings.' },
      { label: 'Every row is a pairing', formula: '\\sum_{i=1}^{n} a_i b^{(k)}_i \\leq \\sum_{i=1}^{n} a_i b_i', explanation: 'Each cyclic shift is an arrangement of the $b$-entries, so the rearrangement ceiling caps every row of the table at the sorted pairing sum — $n$ rows, one cap.' },
      { label: 'Sum and divide', formula: '\\Big(\\sum a\\Big)\\Big(\\sum b\\Big) \\leq n\\sum a_ib_i', explanation: 'Cap all $n$ rows by the same number and add: the table total $(\\sum a)(\\sum b)$ is at most $n$ times the sorted sum. Dividing by $n^2$ reads the averages — the average product beats the product of averages.' },
      { label: 'The oppositely sorted reversal', formula: '\\Big(\\sum a\\Big)\\Big(\\sum b\\Big) \\geq n\\sum a_ib_i \\quad (b \\text{ descending})', explanation: 'With $b$ descending, the same-position pairing is the rearrangement FLOOR; every shifted row sits at or above it, so the table total is at least $n$ times the floor sum — which is the reversed verdict $\\frac{1}{n}\\sum a_ib_i \\leq \\bar a\\,\\bar b$ after division.' },
      { label: 'The n = 3 witness, in raw form', formula: '360 = 140 + 110 + 110 \\leq 3\\cdot140', explanation: 'For $a = (1, 2, 3)$ and $b = (10, 20, 30)$: the three cyclic shifts pay $140$, $110$, $110$, total $360 = (\\sum a)(\\sum b) = 6\\cdot60$ — and $360 \\leq 420 = 3\\cdot140$ is Chebyshev\u2019s $\\frac{140}{3} \\geq 40$ before division. The derivation is complete: one cap, one sum.' },
    ], result: '$\\frac{1}{n}\\sum_{i=1}^{n} a_ib_i \\ \\geq\\ \\bar a\\,\\bar b \\quad (\\text{similarly sorted});$ $\\qquad$ $\\frac{1}{n}\\sum a_ib_i \\ \\leq\\ \\bar a\\,\\bar b \\quad (\\text{oppositely sorted})$' },
    { kind: 'equation', latex: '\\Big(\\sum a\\Big)\\Big(\\sum b\\Big) \\;\\leq\\; n\\sum_{i=1}^{n} a_ib_i \\tag{3}', note: 'the raw form of Chebyshev before division — the cyclic-table total under the rearrangement cap; divide by $n^2$ to read averages.' },
    { kind: 'para', text: 'There is a second, equally honest route to the same statement — the CENTERED IDENTITY — and it buys the equality discipline outright. It re-centres both lists at their averages and counts pairwise order agreements.' },
    { kind: 'equation', latex: '\\overline{ab} - \\bar a\\,\\bar b \\;=\\; \\frac{1}{n^2}\\sum_{i<j}(a_i - a_j)(b_i - b_j) \\tag{4}', note: 'the centered identity: the average product minus the product of averages equals the average pairwise order-agreement certificate — non-negative term by term for similarly sorted lists (each pair of differences shares its sign), non-positive for oppositely sorted ones.' },
    { kind: 'derivation', title: 'The centered identity and the equality discipline', statement: 'For any two lists, $\\overline{ab} - \\bar a\\bar b = \\frac{1}{n^2}\\sum_{i<j}(a_i - a_j)(b_i - b_j)$; for similarly sorted lists every term is $\\geq 0$, which is Chebyshev again — and equality forces at least one list to be constant.', steps: [
      { label: 'Expand the pairwise sum', formula: '\\sum_{i<j}(a_i - a_j)(b_i - b_j) = \\sum_{i<j}\\big(a_ib_i + a_jb_j\\big) - \\sum_{i<j}\\big(a_ib_j + a_jb_i\\Big)', explanation: 'Each product $a_ib_i$ appears in exactly $n - 1$ of the pairs, so the first piece is $(n-1)\\sum a_ib_i$; the second piece runs over all ordered mixed products, which is $(\\sum a)(\\sum b) - \\sum a_ib_i$.' },
      { label: 'Collect', formula: '(n-1)\\sum a_ib_i - \\Big[(\\sum a)(\\sum b) - \\sum a_ib_i\\Big] = n\\sum a_ib_i - (\\sum a)(\\sum b)', explanation: 'Divide by $n^2$ and the right side is exactly $\\overline{ab} - \\bar a\\bar b$ — the identity is proved, and it is an identity for ANY two lists, sorted or not.' },
      { label: 'The certificates sign', formula: '(a_i - a_j)(b_i - b_j) \\geq 0 \\quad (\\text{similarly sorted})', explanation: 'For similarly sorted lists the two differences share their sign at every pair, so every certificate is non-negative — the sum is non-negative, which IS Chebyshev\u2019s similarly sorted verdict, this time term by term. For oppositely sorted lists every certificate is $\\leq 0$ — the reversed verdict, again term by term.' },
      { label: 'The equality discipline', formula: '\\text{equality} \\iff \\text{every certificate vanishes} \\iff \\text{some list is constant}', explanation: 'Equality needs every pairwise product zero: at each pair $i < j$, $a_i = a_j$ or $b_i = b_j$. Suppose $a$ is non-constant, say $a_i \\neq a_j$: then $b_i = b_j$. For any third seat $k$, the pair $(i, k)$ forces $b_k = b_i$ if $a_k \\neq a_i$, and otherwise the pair $(k, j)$ does (since $a_k = a_i \\neq a_j$) — so every $b_k$ equals $b_i$ and $b$ is constant. Symmetrically, a non-constant $b$ forces a constant $a$; and a constant list indeed ties: $\\overline{ab} = c\\,\\bar b = \\bar a\\,\\bar b$.' },
    ], result: '$\\overline{ab} - \\bar a\\,\\bar b = \\frac{1}{n^2}\\sum_{i<j}(a_i-a_j)(b_i-b_j) \\ \\geq 0 \\quad (\\text{similarly sorted}),$ $\\qquad$ $\\text{equality} \\iff \\text{one list constant}$' },
    { kind: 'callout', tone: 'insight', title: 'The covariance reading', text: 'The quantity $\\overline{ab} - \\bar a\\,\\bar b$ — the average product minus the product of averages — is what a statistics course will later call the COVARIANCE of the two lists. Chebyshev says: similarly sorted lists co-vary non-negatively, oppositely sorted ones non-positively; the pairwise-certificate sum is the ledger of that co-movement, seat by seat. The book files the name forward without cashing it — but every engine check of this identity is a covariance computation in disguise.' },
    { kind: 'example', title: 'Chebyshev read twice: for a = (1, 2, 3), compute the average of the products against the product of the averages for b = (10, 20, 30), then for b = (30, 20, 10)', steps: [
      'Similarly sorted: $\\frac{1}{3}(1\\cdot10 + 2\\cdot20 + 3\\cdot30) = \\frac{140}{3} \\approx 46.7$ against $\\bar a\\,\\bar b = 2\\cdot20 = 40$ — the average product wins: $\\frac{140}{3} \\geq 40$.',
      'Oppositely sorted: $\\frac{1}{3}(1\\cdot30 + 2\\cdot20 + 3\\cdot10) = \\frac{100}{3} \\approx 33.3$ against the same $40$ — now the product of averages wins: $\\frac{100}{3} \\leq 40$.',
      'The slacks read $\\frac{140}{3} - 40 = \\frac{20}{3}$ and $40 - \\frac{100}{3} = \\frac{20}{3}$ — equal slacks, two sides of one coin: the descending list is the mirror of the ascending one, and the centered identity certifies both with the same certificate sum.',
      'Hence order alone swings the average product across the fixed product of averages — the engine\u2019s whole reach in one pair of numbers: $\\frac{20}{3}$ of swing each way.',
    ] },
    { kind: 'example', title: 'Witness the equality discipline of Chebyshev: compute both sides for a = (5, 5, 5) against b = (1, 2, 3), and for the progressions a = (1, 2, 3) against b = (1, 2, 3)', steps: [
      'Constant list: $\\frac{1}{3}(5 + 10 + 15) = 10$ and $\\bar a\\,\\bar b = 5\\cdot2 = 10$ — EQUAL, the honest equality seat: a constant list makes every certificate $(a_i - a_j)$ vanish.',
      'Both progressions: $\\frac{1}{3}(1 + 4 + 9) = \\frac{14}{3}$ against $2\\cdot2 = 4$ — strictly above: arithmetic progressions do NOT tie Chebyshev, a classic exam fraud.',
      'The certificates behind the strict case: $(1-2)(1-2) = 1$, $(1-3)(1-3) = 4$, $(2-3)(2-3) = 1$ — all positive, so the centered sum $\\frac{1}{9}(1 + 4 + 1) = \\frac{2}{3}$ is the exact slack.',
      'Hence $\\frac{14}{3} - 4 = \\frac{2}{3}$ matches the certificate ledger exactly — the identity is not just a proof, it is an audit of the gap.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The direction follows the sort, not the habit', text: 'Similarly sorted: the average product wins. Oppositely sorted: the product of averages wins. The exam fraud is quoting one verdict for the other — check the direction of BOTH lists before touching the formula. The second fraud is subtler: Chebyshev needs both lists SORTED — two lists in arbitrary order entitle you to nothing until you sort them (the pairing engine then applies to the sorted versions). And the third: equality is about a CONSTANT list, not about arithmetic progressions, not about shared smallest entries — the progression pair $(1, 2, 3)$ with $(1, 2, 3)$ pays strictly, as the Illustration just witnessed.' },
    { kind: 'formula', name: 'Chebyshev\u2019s sum inequality (similarly sorted)', latex: '\\frac{1}{n}\\sum_{i=1}^{n} a_ib_i \\ \\geq\\ \\bar a\\,\\bar b', note: 'for lists sorted the same way — the average of the products beats the product of the averages; equality exactly when one list is constant. Derived from rearrangement by the cyclic-table sum.' },
    { kind: 'formula', name: 'Chebyshev\u2019s sum inequality (oppositely sorted)', latex: '\\frac{1}{n}\\sum_{i=1}^{n} a_ib_i \\ \\leq\\ \\bar a\\,\\bar b', note: 'for one list ascending and the other descending — the verdict reverses; equality again exactly when one list is constant.' },
    { kind: 'para', text: 'From the above discussion, it follows that the order engine has now two working faces:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the rearrangement inequality — a bound on ONE pairing against all others: the sorted is the ceiling, the reversed the floor, the exchange certificate the proof;',
      '(ii) Chebyshev\u2019s sum inequality — a bound on the average product against the product of averages, won from (i) by the cyclic table, with its own constant-list equality discipline;',
      '(iii) the centered identity — the audit ledger behind both: $\\overline{ab} - \\bar a\\bar b$ is the average pairwise order agreement;',
      '(iv) the direction rule — similarly sorted reads $\\geq$, oppositely sorted reads $\\leq$, and the direction is checked on the SORTS, never assumed from habit.',
    ] },
    { kind: 'para', text: 'Now the mixed witnesses — the place this chapter\u2019s engines meet on one inequality, and the place an honest author must check exactly which engine applies to which claim. The witness is the oldest of them all: the reciprocal-sum family $(a+b+c)\\left(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}\\right) \\geq 9$ for positive entries.' },
    { kind: 'equation', latex: '(a+b+c)\\left(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}\\right) \\;\\geq\\; 9 \\qquad (a, b, c > 0) \\tag{5}', note: 'the reciprocal-sum witness — positive entries, equality exactly at $a = b = c$; priced below by two engines at once, with a third named in one line.' },
    { kind: 'equation', latex: 'x + \\frac{1}{x} \\;\\geq\\; 2 \\qquad (x > 0) \\tag{6}', note: 'the two-number AM-GM of lesson 4.1, the $x + 1/x$ family — equality iff $x = 1$; the pairwise engine of the expansion route.' },
    { kind: 'derivation', title: 'The ≥ 9 witness by both engines', statement: 'For positive $a, b, c$: $(a+b+c)\\left(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}\\right) \\geq 9$, equality exactly at $a = b = c$ — proved twice: by Chebyshev\u2019s oppositely sorted form (which applies DIRECTLY here) and by the AM-GM expansion; Engel\u2019s form prices the same floor in one line.', steps: [
      { label: 'The Chebyshev route — oppositely sorted, applied directly', formula: '\\frac{1}{3}\\sum a_i\\cdot\\frac{1}{a_i} = 1 \\;\\leq\\; \\bar a\\,\\overline{(1/a)}', explanation: 'For positive entries the lists $(a, b, c)$ and $(\\frac{1}{a}, \\frac{1}{b}, \\frac{1}{c})$ are OPPOSITELY sorted — ascend against descend. The oppositely sorted Chebyshev therefore applies directly to the natural pairing: the average product, which is exactly $\\frac{1}{3}(1 + 1 + 1) = 1$ because each natural pair $a \\cdot \\frac{1}{a} = 1$, sits at or below the product of averages. Multiply by $9$: $(a+b+c)(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}) \\geq 9$.' },
      { label: 'The AM-GM route — the x + 1/x family', formula: '(a+b+c)\\Big(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}\\Big) = 3 + \\Big(\\frac{a}{b}+\\frac{b}{a}\\Big) + \\Big(\\frac{b}{c}+\\frac{c}{b}\\Big) + \\Big(\\frac{a}{c}+\\frac{c}{a}\\Big)', explanation: 'Expand the product: the three diagonal terms pay $3$; every off-diagonal term pairs with its reciprocal, and each pair is an $x + \\frac{1}{x} \\geq 2$ witness of lesson 4.1 (equality iff the ratio is $1$). Three pairs pay at least $6$, so the whole is at least $9$.' },
      { label: 'The equality discipline', formula: 'a = b = c', explanation: 'Both engines tie together: the AM-GM route needs every ratio equal to $1$; the Chebyshev route needs its certificate sum zero, which forces one list constant — here, $a = b = c$. Distinct positive entries pay STRICTLY above $9$.' },
      { label: 'The third engine, named', formula: '(a+b+c)\\Big(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}\\Big) \\;\\geq\\; (\\sqrt{a\\tfrac{1}{a}} + \\sqrt{b\\tfrac{1}{b}} + \\sqrt{c\\tfrac{1}{c}})^2 = 9', explanation: 'Cauchy-Schwarz in Engel\u2019s dress (lesson 4.3): $(\\sum x)(\\sum y) \\geq (\\sum \\sqrt{xy})^2$ with the reciprocals as the $y$-list — each $\\sqrt{a \\cdot 1/a} = 1$, so the floor $9$ again, in one line. Three engines, one floor.' },
    ], result: '$(a+b+c)\\left(\\tfrac{1}{a}+\\tfrac{1}{b}+\\tfrac{1}{c}\\right) \\;\\geq\\; 9,$ $\\qquad$ $\\text{equality exactly at } a = b = c$' },
    { kind: 'example', title: 'The mixed witness at (a, b, c) = (2, 3, 6): compute the value exactly, then price it by BOTH engines and report what each actually guarantees', steps: [
      'The exact value: $\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} = 1$, so $(2 + 3 + 6)\\cdot1 = 11$.',
      'The Chebyshev engine (oppositely sorted, applied directly): the average product is $\\frac{1}{3}(1 + 1 + 1) = 1$ and the product of averages is $\\frac{11}{3}\\cdot\\frac{1}{3} = \\frac{11}{9}$ — so $1 \\leq \\frac{11}{9}$ certifies $(2+3+6)(\\frac{1}{2}+\\frac{1}{3}+\\frac{1}{6}) \\geq 9$, with slack $\\frac{2}{9}$ in the certificate.',
      'The AM-GM engine: the expansion reads $3 + (\\frac{2}{3} + \\frac{3}{2}) + (\\frac{1}{2} + 2) + (\\frac{1}{3} + 3) = 3 + \\frac{13}{6} + \\frac{5}{2} + \\frac{10}{3} = 3 + 8 = 11$ — every pair an $x + \\frac{1}{x}$ witness (all strict here), so the chain certifies $\\geq 9$ AND returns the exact value $11$.',
      'Hence both engines guarantee the same floor $9$ (equality only at $a = b = c$); the exact value $11$ is computed, not bounded — and at this witness Chebyshev\u2019s certificate reads $1 \\leq \\frac{11}{9}$, honest slack $\\frac{2}{9}$.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The honest engine audit', text: 'A natural suspicion: does Chebyshev really apply to $(a+b+c)(1/a+1/b+1/c) \\geq 9$, or is the oppositely-sorted pairing the wrong shape? The audit, run by the engine before this prose: the lists $(a, b, c)$ and $(1/a, 1/b, 1/c)$ ARE oppositely sorted, so the oppositely-sorted verdict is exactly the right tool — its certificate is $1 = \\overline{a \\cdot 1/a} \\leq \\bar a\\,\\overline{(1/a)}$, which IS the $\\geq 9$ statement after clearing denominators. So the master plan\u2019s claim "by both engines" is sound as written. What Chebyshev does NOT do: price the exact value ($11$ at the witness) — bounds and values are different products, honestly separated.' },
    { kind: 'formula', name: 'The reciprocal-sum witness', latex: '(a+b+c)\\left(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}\\right) \\;\\geq\\; 9', note: 'positive entries, equality exactly at $a = b = c$; priced by Chebyshev (oppositely sorted, direct), by the AM-GM $x + 1/x$ family, and by Engel\u2019s one-liner $(\\sum x)(\\sum y) \\geq (\\sum\\sqrt{xy})^2$ — three engines, one floor.' },

    { kind: 'heading', text: 'The Order Engine at Exam Speed' },
    { kind: 'para', text: 'The rest of the lesson is the engine at work under time pressure: the sequence-order reads (maximise $\\sum k\\,a_k$ — a derivative-free optimisation), the band reads (self-pairings of one list), the cyclic floor (a ratio-sum taster), and the one comparison every reader of lesson 4.3 owes themselves: Cauchy-Schwarz against rearrangement. The two engines look related — both bound dot products — and they are, in two different ways: Cauchy bounds the dot product of GIVEN lists by their magnitudes; rearrangement locates the MAXIMUM over the orderings of one list. Two different questions.' },
    { kind: 'equation', latex: '\\Big|\\sum_{i=1}^{n} a_ib_i\\Big| \\;\\leq\\; \\sqrt{\\sum a_i^2}\\,\\sqrt{\\sum b_i^2} \\tag{7}', note: 'the Cauchy-Schwarz ceiling of lesson 4.3 — a magnitude bound on a dot product; equality exactly when the lists are proportional ($a_i/b_i$ constant).' },
    { kind: 'example', title: 'Cauchy and rearrangement, honestly separated: for a = (1, 2, 3), find the maximum pairing sum against b = (10, 20, 30), then against b = (10, 20, 25), and compare each with the Cauchy-Schwarz ceiling', steps: [
      'Against $(10, 20, 30)$: the sorted pairing pays $140$, and the Cauchy ceiling is $\\sqrt{1+4+9}\\cdot\\sqrt{100+400+900} = \\sqrt{14}\\cdot\\sqrt{1400} = \\sqrt{19600} = 140$ — EQUAL, because the lists are proportional ($b = 10a$): the sorted pairing saturates Cauchy at the same moment, on the equality discipline $a_i/b_i$ constant.',
      'Against $(10, 20, 25)$: the sorted pairing pays $1\\cdot10 + 2\\cdot20 + 3\\cdot25 = 125$; the Cauchy ceiling is $\\sqrt{14}\\cdot\\sqrt{1125} = \\sqrt{15750} = 15\\sqrt{70} \\approx 125.5$.',
      'The comparison: $125 < 15\\sqrt{70}$ (indeed $125^2 = 15625 < 15750$) — the pairing maximum now sits strictly below the magnitude ceiling, the lists being far from proportional.',
      'Hence two engines, two questions: Cauchy answers "how large can the dot product of THESE lists be?" (by magnitudes), rearrangement answers "which arrangement of THIS pair of lists wins?" (by order) — and only for proportional lists do the two answers coincide, at $140$.',
    ] },
    { kind: 'example', title: 'Numerical value (exam-style): for the lists a = (1, 3, 5, 7) and b = (2, 4, 6, 8), report the maximum and minimum pairing sums, and the Cauchy-Schwarz ceiling for the pair', steps: [
      'Both lists ascend, so the sorted pairing is the maximum: $1\\cdot2 + 3\\cdot4 + 5\\cdot6 + 7\\cdot8 = 2 + 12 + 30 + 56 = 100$.',
      'The reversed pairing is the minimum: $1\\cdot8 + 3\\cdot6 + 5\\cdot4 + 7\\cdot2 = 8 + 18 + 20 + 14 = 60$.',
      'The Cauchy ceiling: $\\sqrt{1+9+25+49}\\cdot\\sqrt{4+16+36+64} = \\sqrt{84}\\cdot\\sqrt{120} = \\sqrt{10080} = 12\\sqrt{70} \\approx 100.4$.',
      'Hence the pairing lives in the band $[60, 100]$ while the magnitude ceiling floats at $12\\sqrt{70}$ — the maximum $100$ sits strictly below it ($100^2 = 10000 < 10080$), the lists being nowhere near proportional.',
    ] },
    { kind: 'para', text: 'The band just read is the general phenomenon of a list paired with itself: for $x \\leq y \\leq z$, the six pairing sums of $(x, y, z)$ with itself arrange themselves into a two-sided bound whose middle seat is the famous cyclic sum.' },
    { kind: 'equation', latex: 'y^2 + 2xz \\;\\leq\\; xy + yz + zx \\;\\leq\\; x^2 + y^2 + z^2 \\qquad (x \\leq y \\leq z) \\tag{8}', note: 'the self-pairing band — the reversed pairing floors the cyclic sum, the identity (sum of squares) ceilings it; both gaps carry closed forms, pinned below.' },
    { kind: 'example', title: 'The self-pairing band at (x, y, z) = (1, 2, 4): read the six pairing sums of the list with itself and verify the two-sided bound with its two gap identities', steps: [
      'The six pairings of $(1, 2, 4)$ with itself pay $21$, $17$, $20$, $14$, $14$, $12$ — the identity $1 + 4 + 16 = 21$; the two transposition seats $1 + 16 = 17$ and $4 + 16 = 20$; the two 3-cycles $2 + 8 + 4 = 14$ each; the reversed $4 + 8 = 12$.',
      'The cyclic pairing $xy + yz + zx = 14$ sits inside the band: $12 \\leq 14 \\leq 21$, the floor being the reversed pairing $y^2 + 2xz = 4 + 8 = 12$.',
      'The ceiling gap identity: $21 - 14 = 7 = \\frac{1}{2}[(1-2)^2 + (2-4)^2 + (4-1)^2] = \\frac{1}{2}(1 + 4 + 9)$ — the same signature as 4.3\u2019s $(x+y+z)^2 \\leq 3(x^2+y^2+z^2)$ family.',
      'The floor gap identity: $14 - 12 = 2 = (x-y)(y-z) = (1-2)(2-4)$ — a product of two non-positives, non-negative precisely because of the order.',
      'Hence $x^2+y^2+z^2 \\geq xy+yz+zx \\geq y^2+2xz$ — the classical three-variable bound and its floor, both delivered by the order engine.',
    ] },
    { kind: 'para', text: 'And the sequence-order reads — the exam shape this lesson exists for. When the weights $k = 1, 2, \\dots, n$ pair with an arrangement of a list, the maximum is the sorted pairing and the minimum the reversed: an optimisation with no derivative, no vertex form, no boundary check — only the exchange certificate. AA 2.1\u2019s calculus-free maxima, generalised from parabolas to pairings.' },
    { kind: 'example', title: 'The sequence-order read: the weights k = 1, 2, 3, 4 are to be paired with the entries of the list (3, 1, 4, 2). Find the maximum and minimum of the weighted sum, and interpret the maximum when the entries are 1, 2, 3, 4 themselves', steps: [
      'The weights $(1, 2, 3, 4)$ ascend; the entries sorted ascend too — so the sorted pairing is the maximum: $1\\cdot1 + 2\\cdot2 + 3\\cdot3 + 4\\cdot4 = 1 + 4 + 9 + 16 = 30$.',
      'The given arrangement pays $1\\cdot3 + 2\\cdot1 + 3\\cdot4 + 4\\cdot2 = 3 + 2 + 12 + 8 = 25$ — a middle seat.',
      'The reversed arrangement pays $1\\cdot4 + 2\\cdot3 + 3\\cdot2 + 4\\cdot1 = 4 + 6 + 6 + 4 = 20$ — the floor.',
      'Hence the arrangement of the entries alone is worth $10$ here ($30 - 20$); and when the entries ARE $\\{1, 2, 3, 4\\}$, the maximum equals $\\sum k^2 = 30$ — the sorted pairing pairs each weight with itself, the derivative-free optimisation returning the sum of squares.',
    ] },
    { kind: 'para', text: 'One more engine read before the exercises: the CYCLIC FLOOR. For positive sorted $a \\leq b \\leq c$, the reciprocals descend — oppositely sorted — so the natural pairing $a\\cdot\\frac{1}{a} + b\\cdot\\frac{1}{b} + c\\cdot\\frac{1}{c} = 3$ is the FLOOR of all pairings. Every other arrangement of the reciprocals pays $\\geq 3$, and two of those arrangements are the cyclic sums $\\frac{a}{b} + \\frac{b}{c} + \\frac{c}{a}$ and its mirror — the ratio reads that examiners love.' },
    { kind: 'equation', latex: '\\frac{a}{b} + \\frac{b}{c} + \\frac{c}{a} \\;\\geq\\; 3 \\qquad (0 < a \\leq b \\leq c) \\tag{9}', note: 'the cyclic floor — a pairing of the ascending list against a cyclic arrangement of the descending reciprocals, so never below the natural-pairing floor $3$; equality exactly at $a = b = c$. The mirror $\\frac{b}{a} + \\frac{c}{b} + \\frac{a}{c} \\geq 3$ is the other cyclic arrangement, same floor.' },
    { kind: 'formula', name: 'The cyclic floor', latex: '\\frac{a}{b} + \\frac{b}{c} + \\frac{c}{a} \\;\\geq\\; 3 \\qquad (0 < a \\leq b \\leq c)', note: 'the cyclic ratio sum is a pairing of the ascending list against a cyclic arrangement of the descending reciprocals — never below the natural floor $3$; the mirror $\\frac{b}{a}+\\frac{c}{b}+\\frac{a}{c}$ likewise. Equality exactly at $a = b = c$.' },
    { kind: 'table', caption: 'The order engine\u2019s exam map — every row recomputed by the engine before this prose was written (the witnesses are the lesson\u2019s own rosters).', head: ['The engine', 'What it says', 'A verified witness', 'The equality discipline'], rows: [
      ['rearrangement ceiling', 'the sorted pairing maximises $\\sum a_ib_{\\sigma(i)}$', '$(1,2,3)\\times(10,20,30) \\to 140$', 'order-keeping pairings; identity alone when $b$ distinct'],
      ['rearrangement floor', 'the reversed pairing minimises it', 'the same lists $\\to 100$', 'order-reversing pairings; reversal alone when $b$ distinct'],
      ['Chebyshev, similarly sorted', '$\\frac{1}{n}\\sum a_ib_i \\geq \\bar a\\,\\bar b$', '$\\frac{140}{3} \\geq 40$ on the same lists', 'one list constant'],
      ['Chebyshev, oppositely sorted', '$\\frac{1}{n}\\sum a_ib_i \\leq \\bar a\\,\\bar b$', '$\\frac{100}{3} \\leq 40$ on the mirrored lists', 'one list constant'],
      ['the reciprocal-sum witness', '$(a+b+c)(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}) \\geq 9$', '$(2,3,6) \\to 11 \\geq 9$', '$a = b = c$'],
      ['the sequence-order read', '$\\max \\sum k\\,a_k$ over arrangements $= \\sum k\\,a_k^{\\uparrow}$', '$\\{1,2,3,4\\} \\to 30 = \\sum k^2$', 'the sorted arrangement'],
      ['the cyclic floor', '$\\frac{a}{b}+\\frac{b}{c}+\\frac{c}{a} \\geq 3$', '$(2,3,12) \\to \\frac{83}{12} \\geq 3$', '$a = b = c$'],
    ] },
    { kind: 'figure', caption: 'The same two lists $a = (1, 2, 3)$ and $b = (10, 20, 30)$ under three pairings: the sorted arrangement pays $140$ (the table ceiling), a scattered middle seat $130$, the reversed $100$ (the floor). The choice of pairing alone is worth $40$ on these lists — the number no engine before this lesson could price.', svg: pairingBarsSvg() },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'The JEE Main 2026 unit list carries no separate inequalities unit — the audit of lesson 4.1 recorded it honestly — so the order items ride the ALGEBRA bank: the max/min-of-a-pairing single-corrects, the $\\geq 9$ family in multiple-correct dress, the $\\sum k\\,a_k$ and band reads as numerical values, and Chebyshev-direction checks (which verdict, which direction) as the classic trap items. Khattar\u2019s aptitude side prices the same shapes as speed work. The items in this lesson are exam-style — our own designs, labelled honestly, never lifted from any paper; the typology below exercises Single Correct, Multiple Correct, Linked Comprehension and Numerical Value exactly as the exam presents them.' },
    { kind: 'callout', tone: 'historical', title: 'Chebyshev: two inequalities, one name', text: 'Pafnuty Lvovich Chebyshev (16 May 1821 - 8 December 1894, the dates web-verified by this run\u2019s research) was a Russian mathematician often called the founding father of Russian mathematics, with fundamental work in probability, statistics, mechanics and number theory. TWO different inequalities carry his name, and readers meet both: the probability inequality behind the weak law of large numbers (a statistics-course fixture) and THIS one — the sum inequality for sorted sequences, named in his honour. The classical family this chapter builds — AM-GM, Cauchy-Schwarz, rearrangement, Chebyshev — was gathered and organised in the 1934 Cambridge treatise Inequalities by Hardy, Littlewood and P\u00f3lya; the date of the sum inequality\u2019s first publication is not pinned in the sources this run checked, and the lesson claims none.' },
    { kind: 'para', text: 'The chapter\u2019s engine room now holds four machines: the mean engines of 4.1 and 4.2 (fixed lists, fixed weights), the magnitude engine of 4.3 (Cauchy-Schwarz and Engel), and this lesson\u2019s order engine (the pairing itself). What waits: lesson 4.5 adds the SHAPE engine — convexity and Jensen\u2019s inequality, the curved cousin that pays the AM-GM family its deepest proof; lesson 4.6 takes the absolute value FM priced as distance and builds the triangle-inequality bound machine; the 4.R review walks all six engines in one room and hands you the map of which to reach for when. Every one of them assumes the discipline this lesson taught: state the equality case, check the direction, price the witness.' },

    { kind: 'terms', items: [
      { term: 'Rearrangement inequality', def: 'for two similarly sorted real lists, every pairing sum sits between the reversed pairing sum and the sorted pairing sum — order-keeping is the ceiling, order-reversing the floor; no sign assumptions.' },
      { term: 'Exchange argument', def: 'the proof engine of rearrangement: uncrossing an inversion (two seats whose $b$-assignments run backwards against the $a$-order) changes the sum by $(a_j - a_i)(b_i - b_j) \\geq 0$ — never a loss — and the bubble terminates at the sorted pairing.' },
      { term: 'Inversion', def: 'a pair of seats $i < j$ in a pairing with $a_i \\leq a_j$ but $b_i > b_j$ — the $b$-values run backwards against the $a$-order; each inversion repaired drops the inversion count by one at non-negative cost.' },
      { term: 'Similarly sorted sequences', def: 'two sequences that rise and fall together — both non-decreasing (or both non-increasing); the seat where Chebyshev reads $\\geq$ and rearrangement reads ceiling.' },
      { term: 'Oppositely sorted sequences', def: 'one sequence non-decreasing while the other is non-increasing; Chebyshev reverses to $\\leq$, and the natural (same-position) pairing is the rearrangement floor.' },
      { term: 'Chebyshev\u2019s sum inequality', def: 'for similarly sorted lists, $\\frac{1}{n}\\sum a_ib_i \\geq \\bar a\\,\\bar b$ — the average of the products beats the product of the averages; reversed for oppositely sorted lists; equality exactly when one list is constant.' },
      { term: 'Pairing sum', def: 'the payout $S(\\sigma) = \\sum a_ib_{\\sigma(i)}$ of one arrangement $\\sigma$ of the $b$-entries against the fixed $a$-list — the object the whole lesson prices.' },
      { term: 'Cyclic-shift pairing', def: 'the $n$ arrangements of a list obtained by moving every entry round $k$ seats ($k = 0, \\dots, n-1$); summing their pairing sums rebuilds $(\\sum a)(\\sum b)$ — the table behind the Chebyshev derivation.' },
      { term: 'Centered identity', def: '$\\overline{ab} - \\bar a\\,\\bar b = \\frac{1}{n^2}\\sum_{i<j}(a_i - a_j)(b_i - b_j)$ — the average product minus the product of averages as the ledger of pairwise order agreements; the covariance reading.' },
      { term: 'Equality discipline', def: 'the stated exact conditions under which an inequality ties: rearrangement ties at order-keeping (ceiling) and order-reversing (floor) pairings; Chebyshev ties exactly when one list is constant; the $\\geq 9$ witness ties at $a = b = c$.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: the order engine', items: [
      { q: 'Two lists are given: $a = (1, 2, 3)$ and $b = (10, 20, 30)$. Over all six ways of pairing the entries of $b$ against $a$, the largest attainable pairing sum $\\sum a_ib_{\\sigma(i)}$ is:', options: ['$100$', '$130$', '$140$', '$110$'], answer: 2, explain: 'The sorted pairing wins: $1\\cdot10 + 2\\cdot20 + 3\\cdot30 = 140$ — the ceiling of the whole table (option C). Option A prices the REVERSED pairing $1\\cdot30 + 2\\cdot20 + 3\\cdot10 = 100$ — the floor, the classic max-min swap; option B is the near-miss middle seat $1\\cdot10 + 2\\cdot30 + 3\\cdot20 = 130$, itself attained by two pairings; option D is the other middle seat $110$, also attained twice — neither middle seat is the ceiling.' },
      { q: 'With $a = (1, 2, 3)$ and $b = (10, 20, 30)$ (both ascending), Chebyshev\u2019s sum inequality reads:', options: ['$\\frac{140}{3} \\geq 40$ — the average of the products beats the product of the averages', '$\\frac{140}{3} \\leq 40$ — the product of the averages wins', '$\\frac{140}{3} = 40$ — the two agree for sorted lists', 'Chebyshev applies only when one list is constant'], answer: 0, explain: 'Chebyshev (similarly sorted) reads $\\frac{1}{3}(10 + 40 + 90) \\geq \\left(\\frac{6}{3}\\right)\\left(\\frac{60}{3}\\right)$, i.e. $\\frac{140}{3} \\geq 40$ — option A, and $46.7 > 40$ is strict (option C\u2019s equality needs a constant list). Option B states the OPPOSITELY sorted verdict — the direction fraud the Caution priced; option D invents a restriction the theorem never states — any similarly sorted pair qualifies, the constant list being only the equality seat.' },
      { q: 'For positive and DISTINCT $a, b, c$, the value of $(a+b+c)\\left(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}\\right)$ is:', options: ['exactly $9$', 'strictly greater than $9$', 'below $9$ when $a$ is very small', 'exactly $9$ whenever $a < b < c$'], answer: 1, explain: 'Both engines price the floor at $9$ with equality only at $a = b = c$: the AM-GM route needs every ratio $1$, the Chebyshev route needs its certificate sum zero, which forces the constant list. Distinct entries make every certificate strict — the value is strictly above $9$ (option B). Option A forgets the equality discipline; option C prices the "$a \\to 0$ panic" — the reciprocal sum blows UP, not down; option D claims order alone fixes equality — equality is about $a = b = c$, never about their order.' },
      { q: 'For two similarly sorted lists, Chebyshev\u2019s sum inequality holds with EQUALITY exactly when:', options: ['both lists are arithmetic progressions with the same common difference', 'at least one of the two lists is constant (all entries equal)', 'the two lists share their smallest entry', 'never — the inequality is strict for $n \\geq 2$'], answer: 1, explain: 'By the centered identity every pairwise certificate $(a_i - a_j)(b_i - b_j)$ must vanish, and a non-constant pair of lists always leaves one certificate positive (a non-constant $a$ forces a constant $b$, and symmetrically) — option B, with the honest witness $a = (5,5,5)$ tying against any sorted $b$. Option A is the classic fraud: the progressions $(1,2,3)$ with $(1,2,3)$ pay strictly, $\\frac{14}{3} > 4$; option C\u2019s shared entry settles nothing; option D forgets the honest constant-list equality seat.' },
      { q: 'The list $(a_1, a_2, a_3, a_4)$ ranges over all arrangements of $(1, 2, 3, 4)$. The maximum of $\\sum_{k=1}^{4} k\\,a_k$ is:', options: ['$30$ — it equals $\\sum k^2$', '$20$', '$25$', '$10$'], answer: 0, explain: 'The weights $k = 1, 2, 3, 4$ ascend, so the sorted arrangement wins: $1 + 4 + 9 + 16 = 30 = \\sum k^2$ — the sorted pairing pairs each weight with itself (option A). Option B prices the reversed arrangement $4 + 6 + 6 + 4 = 20$ — the floor; option C prices one real middle seat, the arrangement $(3,1,4,2)$ paying $3 + 2 + 12 + 8 = 25$ — a genuine value of a genuine arrangement, but a middle one; option D prices the weights alone ($\\sum k = 10$), the entries ignored.' },
    ] },

    { kind: 'exercises', title: 'Exercises 4.4', sets: [
      { level: 'L1', questions: [
        { q: 'For the lists $a = (1, 2, 3)$ and $b = (4, 5, 6)$, compute the sorted pairing sum, the reversed pairing sum, and the pairing sum for the arrangement $(4, 6, 5)$ of $b$; verify that the middle one sits between the two.', solution: [
          'Sorted: $1\\cdot4 + 2\\cdot5 + 3\\cdot6 = 4 + 10 + 18 = 32$.',
          'Reversed: $1\\cdot6 + 2\\cdot5 + 3\\cdot4 = 6 + 10 + 12 = 28$.',
          'The third arrangement: $1\\cdot4 + 2\\cdot6 + 3\\cdot5 = 4 + 12 + 15 = 31$.',
          'Hence $28 \\leq 31 \\leq 32$ — the scattered seat obeys the chain, exactly as the rearrangement inequality demands.',
        ], answer: 'sorted $32$, reversed $28$, scattered $31$; the chain $28 \\leq 31 \\leq 32$ holds' },
        { q: 'True or false, with a reason and one numeric witness: "when two lists are oppositely sorted, their natural (same-position) pairing is the MINIMUM over all pairings."', solution: [
          'True: oppositely sorted means one list ascends while the other descends, so the same-position pairing matches the smallest $a$ with the largest $b$ — exactly the reversed pairing of the sorted arrangement, which the rearrangement inequality pins as the floor.',
          'Witness: $a = (1, 2, 3)$ ascending against $b = (30, 20, 10)$ descending: the same-position sum is $30 + 40 + 30 = 100$.',
          'The six pairing sums of these lists run from this $100$ up to $140$ (the sorted pairing $1\\cdot10 + 2\\cdot20 + 3\\cdot30$) — the natural pairing is the minimum, the floor certificate of the order engine.',
        ], answer: 'true — the same-position pairing of oppositely sorted lists is the reversed pairing, the floor; witness: $100$ is the least of the six sums, $140$ the greatest' },
      ] },
      { level: 'L2', questions: [
        { q: 'List all six pairing sums for $a = (1, 3, 5)$ and $b = (2, 4, 6)$; identify the maximum and minimum pairings, and say how many arrangements attain each.', solution: [
          'The sorted arrangement $(2, 4, 6)$: $2 + 12 + 30 = 44$.',
          'The reversed $(6, 4, 2)$: $6 + 12 + 10 = 28$.',
          'The other four: $(2, 6, 4)$ pays $2 + 18 + 20 = 40$; $(4, 2, 6)$ pays $4 + 6 + 30 = 40$; $(4, 6, 2)$ pays $4 + 18 + 10 = 32$; $(6, 2, 4)$ pays $6 + 6 + 20 = 32$.',
          'Hence the maximum $44$ is attained by the sorted arrangement alone and the minimum $28$ by the reversed alone — while the middle seats tie twice each: the distinct-entry uniqueness discipline, mid-table ties and all.',
        ], answer: 'the sums read $44, 40, 40, 32, 32, 28$ — maximum $44$ (sorted, unique), minimum $28$ (reversed, unique)' },
        { q: 'For $a = (1, 2, 3, 4)$ and $b = (1, 3, 5, 7)$, both ascending: compute $\\frac{1}{4}\\sum a_ib_i$ and $\\bar a\\,\\bar b$, and check Chebyshev\u2019s verdict; then reverse $b$ and check the oppositely sorted verdict.', solution: [
          'The products: $1\\cdot1 + 2\\cdot3 + 3\\cdot5 + 4\\cdot7 = 1 + 6 + 15 + 28 = 50$, so $\\frac{1}{4}\\sum a_ib_i = 12.5$.',
          'The averages: $\\bar a = \\frac{10}{4} = 2.5$ and $\\bar b = \\frac{16}{4} = 4$, so $\\bar a\\,\\bar b = 10$.',
          'Chebyshev, similarly sorted: $12.5 \\geq 10$ — holds, strict (neither list is constant).',
          'Reversing $b$ to $(7, 5, 3, 1)$: the products pay $7 + 10 + 9 + 4 = 30$, so $\\frac{1}{4}\\sum a_ib_i = 7.5 \\leq 10$ — the oppositely sorted verdict, strict again.',
        ], answer: '$12.5 \\geq 10$ (similarly sorted, strict); $7.5 \\leq 10$ (oppositely sorted, strict)' },
      ] },
      { level: 'L3', questions: [
        { q: 'Prove that $xy + yz + zx \\leq x^2 + y^2 + z^2$ for ANY real $x, y, z$ — no order and no sign assumption — by the order engine, and give the equality case with a witness.', solution: [
          'Relabel so that $x \\leq y \\leq z$: the two sums are symmetric, so relabelling changes neither — and the order engine may now run.',
          'The cyclic pairing $xy + yz + zx$ is one of the six pairings of the sorted list with itself; the identity pairing $x^2 + y^2 + z^2$ is the ceiling — so the inequality is the rearrangement ceiling outright, with no sign assumption anywhere (the engine runs on any reals).',
          'Equality: the ceiling is tied only by order-keeping pairings, and the cyclic pairing keeps order only when $x = y = z$ (for distinct entries it is a strict middle seat).',
          'Witness at $(1, 2, 4)$: $2 + 8 + 4 = 14 \\leq 21$, with the gap $7 = \\frac{1}{2}(1 + 4 + 9)$ — the same signature as 4.3\u2019s $(x+y+z)^2 \\leq 3(x^2+y^2+z^2)$ family in disguise.',
        ], answer: '$xy+yz+zx \\leq x^2+y^2+z^2$ for all reals — the rearrangement ceiling; equality exactly at $x=y=z$; witness $14 \\leq 21$ at $(1,2,4)$' },
        { q: 'At $(a, b, c) = (1, 2, 6)$, compute $(a+b+c)\\left(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}\\right)$ exactly, price it by the AM-GM chain (the $x + 1/x$ family of lesson 4.1), then say which of the two Chebyshev forms applies to the lists $(a, b, c)$ and $(\\frac{1}{a}, \\frac{1}{b}, \\frac{1}{c})$ — and why.', solution: [
          'The exact value: $1 + \\frac{1}{2} + \\frac{1}{6} = \\frac{5}{3}$, so $9 \\cdot \\frac{5}{3} = 15$.',
          'The AM-GM chain: the expansion is $3 + (\\frac{1}{2} + 2) + (\\frac{1}{3} + 3) + (\\frac{1}{6} + 6) = 3 + \\frac{5}{2} + \\frac{10}{3} + \\frac{37}{6} = 15$ — every bracket an $x + \\frac{1}{x}$ witness (all strict), so the chain certifies $\\geq 9$ and the arithmetic returns the exact $15$.',
          'Which Chebyshev form: the lists $(1, 2, 6)$ and $(1, \\frac{1}{2}, \\frac{1}{6})$ are OPPOSITELY sorted (ascend against descend), so the oppositely sorted form is the one that applies — never the similarly sorted form.',
          'Its certificate: $\\frac{1}{3}\\sum a_i \\cdot \\frac{1}{a_i} = 1 \\leq \\bar a\\,\\overline{(1/a)} = 3\\cdot\\frac{5}{9} = \\frac{5}{3}$ — exactly the statement $(a+b+c)(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}) \\geq 9$, with slack $\\frac{2}{3}$ at this witness.',
        ], answer: 'the value is $15$; the oppositely sorted Chebyshev applies (the lists run opposite ways), its certificate $1 \\leq \\frac{5}{3}$ pricing the floor $9$' },
        { q: 'The lists are fixed as $a = (2, 5, 9)$ with $b$ arranged $(10, 6, 3)$. Exhibit an inversion in the pairing, price the swap, and bubble the arrangement to the maximum in three swaps — decomposing the total gain into swap certificates.', solution: [
          'The current sum: $2\\cdot10 + 5\\cdot6 + 9\\cdot3 = 20 + 30 + 27 = 77$ — the pairing is oppositely sorted ($b$ descends while $a$ ascends), so this is the floor seat.',
          'First inversion: seats 1 and 2 hold $b$-values $10 > 6$ against $a$-values $2 \\leq 5$ — the swap gain is $(5-2)(10-6) = 12$, landing at $(6, 10, 3)$ with sum $89$.',
          'Second inversion: seats 2 and 3 hold $10 > 3$ against $5 \\leq 9$ — gain $(9-5)(10-3) = 28$, landing at $(6, 3, 10)$ with sum $117$.',
          'Third inversion: seats 1 and 2 hold $6 > 3$ against $2 \\leq 5$ — gain $(5-2)(6-3) = 9$, landing at the sorted $(3, 6, 10)$ with sum $126$, the ceiling.',
          'Hence $12 + 28 + 9 = 49 = 126 - 77$: the three swap certificates decompose the whole floor-to-ceiling gap exactly.',
        ], answer: 'the maximum is $126$; the gains $12, 28, 9$ decompose the total gap $126 - 77 = 49$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Linked comprehension (exam-style). The lists $a = (1, 2, 3, 4)$ and $b = (10, 20, 30, 40)$ are given. (i) State the maximum of $\\sum a_ib_{\\sigma(i)}$ over all pairings, with the arrangement attaining it. (ii) Compare that maximum with the Cauchy-Schwarz ceiling $\\sqrt{\\sum a_i^2}\\sqrt{\\sum b_i^2}$ and explain the coincidence. (iii) State the minimum pairing sum and the value of the gap, maximum minus minimum.', solution: [
          '(i) The sorted pairing: $1\\cdot10 + 2\\cdot20 + 3\\cdot30 + 4\\cdot40 = 10 + 40 + 90 + 160 = 300$ — the ceiling of all $24$ arrangements.',
          '(ii) The Cauchy ceiling: $\\sqrt{30}\\cdot\\sqrt{3000} = \\sqrt{90000} = 300$ — EQUAL to the pairing maximum, because the lists are proportional ($b_i = 10a_i$): the sorted pairing saturates Cauchy at the same moment, on the equality discipline $a_i/b_i$ constant that lesson 4.3 proved.',
          '(iii) The reversed pairing: $1\\cdot40 + 2\\cdot30 + 3\\cdot20 + 4\\cdot10 = 40 + 60 + 60 + 40 = 200$ — the floor; the gap is $300 - 200 = 100$.',
          'Hence the pairing lives in the band $[200, 300]$, its maximum saturating the Cauchy ceiling exactly — two engines, one number, on proportional lists.',
        ], answer: '(i) $300$ at the sorted arrangement; (ii) the Cauchy ceiling is also $300$ — proportionality $b = 10a$; (iii) minimum $200$, gap $100$' },
        { q: 'Single correct (exam-style). The list $(a_1, a_2, a_3, a_4)$ ranges over all arrangements of $(1, 3, 5, 7)$. The maximum of $\\sum_{k=1}^{4} k\\,a_k$ is: (A) $50$ (B) $30$ (C) $40$ (D) $44$. Justify the key and price every distractor.', solution: [
          'The weights $k = 1, 2, 3, 4$ ascend, so the identity pairing with the entries ascending wins: $1\\cdot1 + 2\\cdot3 + 3\\cdot5 + 4\\cdot7 = 1 + 6 + 15 + 28 = 50$ — option A.',
          'Option B prices the reversed arrangement $1\\cdot7 + 2\\cdot5 + 3\\cdot3 + 4\\cdot1 = 7 + 10 + 9 + 4 = 30$ — the floor, not the ceiling.',
          'Option C prices a genuine middle seat — the arrangement $(3, 7, 1, 5)$ pays $3 + 14 + 3 + 20 = 40$ — and it is also the average over all $24$ arrangements, the L5 identity $\\frac{(\\sum k)(\\sum a)}{n} = \\frac{10 \\cdot 16}{4} = 40$: a doubly honest number, still not the maximum.',
          'Option D prices another middle seat, the arrangement $(3, 5, 1, 7)$ paying $3 + 10 + 3 + 28 = 44$ — near the top, but the exchange certificate still prices the remaining inversions.',
          'Hence the key is A — the sorted pairing, $50$, the ceiling.',
        ], answer: '(A) $50$ — the sorted arrangement; B is the floor $30$, C the middle/average seat $40$, D the near-top middle seat $44$' },
        { q: 'Multiple correct (exam-style). For positive distinct $a \\leq b \\leq c$, which of the following hold? (i) $(a+b+c)\\left(\\frac{1}{a}+\\frac{1}{b}+\\frac{1}{c}\\right) > 9$; (ii) $\\frac{1}{3}\\sum a_ib_i \\geq \\bar a\\,\\bar b$ when the $b$-list is also ascending; (iii) $xy + yz + zx \\leq x^2 + y^2 + z^2$ for any reals $x, y, z$; (iv) the reversed pairing beats the sorted pairing when both lists ascend.', solution: [
          '(i) Holds — both engines price the floor $9$ with equality only at $a = b = c$; distinct entries make every certificate strict, so the value is strictly above $9$.',
          '(ii) Holds — that is Chebyshev\u2019s similarly sorted verdict verbatim, both lists ascending.',
          '(iii) Holds — the cyclic pairing is a pairing of the list with itself, so it sits under the identity pairing $x^2 + y^2 + z^2$ by the rearrangement ceiling, with no sign or order assumption needed (relabel to sorted first; the sums are symmetric).',
          '(iv) Fails — when both lists ascend the reversed pairing is the FLOOR, the exact opposite of "beats"; this is the swapped-verdict fraud, the direction trap the Caution priced.',
          'Hence (i), (ii) and (iii) hold; (iv) fails.',
        ], answer: '(i), (ii) and (iii) hold; (iv) fails — the reversed pairing is the floor when both lists ascend' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove Chebyshev\u2019s similarly sorted inequality from the rearrangement inequality via the cyclic pairings: show that the $n$ cyclic shifts of the $b$-list are arrangements, that their pairing sums total $(\\sum a)(\\sum b)$, and that the cap on each row closes the proof. Verify the whole derivation numerically on $a = (1, 2, 3)$, $b = (10, 20, 30)$.', solution: [
          'Fix the two ascending lists. For each shift $k = 0, 1, \\dots, n-1$ the shifted list $b^{(k)}$ is an arrangement of the $b$-entries — so by the rearrangement ceiling, $\\sum a_ib^{(k)}_i \\leq \\sum a_ib_i$.',
          'Sum over all $k$: as $k$ runs, each $a_i$ meets every $b_j$ exactly once, so the total is $\\sum_i a_i \\sum_j b_j = (\\sum a)(\\sum b)$.',
          'So $(\\sum a)(\\sum b) \\leq n\\sum a_ib_i$; divide by $n^2$ to read $\\frac{1}{n}\\sum a_ib_i \\geq \\bar a\\,\\bar b$ — Chebyshev, similarly sorted, proved.',
          'The oppositely sorted reversal rides the same table with the floor: every shifted row sits at or above the same-position pairing, so $(\\sum a)(\\sum b) \\geq n\\sum a_ib_i$ after the reversal.',
          'Numeric verification: the three shifts of $(10, 20, 30)$ pay $140$, $110$, $110$; total $360 = (\\sum a)(\\sum b) = 6\\cdot60$; and $360 \\leq 420 = 3\\cdot140$ is the raw verdict $\\frac{140}{3} \\geq 40$.',
        ], answer: 'proved — the cyclic table totals $(\\sum a)(\\sum b)$ under the per-row cap; witness: shifts $140 + 110 + 110 = 360 \\leq 3\\cdot140$' },
        { q: 'Prove the pairing-average identity: summed over ALL $n!$ arrangements, the pairing sums total $(n-1)!(\\sum a)(\\sum b)$, so the average pairing value is $\\frac{(\\sum a)(\\sum b)}{n}$. Then verify on $a = (1, 3, 5)$, $b = (2, 4, 6)$ ($n = 3$) and on $a = (1, 3, 5, 7)$, $b = (2, 4, 6, 8)$ ($n = 4$) by full enumeration, and read what Chebyshev says about the sorted pairing against this average.', solution: [
          'Each entry $b_j$ visits each seat $i$ under exactly $(n-1)!$ of the $n!$ arrangements — so across the full table, $a_i$ meets every $b_j$ exactly $(n-1)!$ times, and the grand total is $(n-1)!\\sum_i\\sum_j a_ib_j = (n-1)!(\\sum a)(\\sum b)$.',
          'Divide by $n!$: the average pairing value is $\\frac{(\\sum a)(\\sum b)}{n} = n\\,\\bar a\\,\\bar b$.',
          'Chebyshev\u2019s similarly sorted verdict now reads: the sorted pairing sits at or above the TABLE AVERAGE — order beats a random pairing, quantified; the reversed sits at or below it.',
          '$n = 3$: the six sums $44, 40, 40, 32, 32, 28$ total $216$, average $36 = \\frac{9\\cdot12}{3}$ — inside the band $[28, 44]$, below the ceiling $44$, above the floor $28$.',
          '$n = 4$: the $24$ sums total $(4-1)!\\cdot16\\cdot20 = 1920$, average $80 = \\frac{16\\cdot20}{4}$ — inside the band $[60, 100]$ (the floor $60$, the ceiling $100$, both engine-verified by enumeration).',
        ], answer: 'the total is $(n-1)!(\\sum a)(\\sum b)$ and the average $\\frac{(\\sum a)(\\sum b)}{n}$; witnesses: $36 \\in [28, 44]$ and $80 \\in [60, 100]$ — the sorted pairing beats the table average' },
        { q: 'Prove the centered identity $n\\sum a_ib_i - (\\sum a)(\\sum b) = \\sum_{i<j}(a_i - a_j)(b_i - b_j)$ by expansion, re-derive Chebyshev from it for similarly sorted lists, and deduce the full equality discipline: equality exactly when at least one list is constant.', solution: [
          'Expand the right side: $\\sum_{i<j}(a_ib_i + a_jb_j) - \\sum_{i<j}(a_ib_j + a_jb_i)$. Each product $a_ib_i$ appears in exactly $n-1$ pairs, so the first piece is $(n-1)\\sum a_ib_i$; the second piece is the sum over all ordered mixed products, $\\sum_{i \\neq j} a_ib_j = (\\sum a)(\\sum b) - \\sum a_ib_i$.',
          'Collect: $(n-1)\\sum a_ib_i - [(\\sum a)(\\sum b) - \\sum a_ib_i] = n\\sum a_ib_i - (\\sum a)(\\sum b)$ — the identity, valid for ANY two lists.',
          'For similarly sorted lists every term $(a_i - a_j)(b_i - b_j) \\geq 0$ (the differences share sign), so the left side is non-negative: $n\\sum a_ib_i \\geq (\\sum a)(\\sum b)$ — Chebyshev, re-derived term by term.',
          'Equality needs every pairwise certificate zero: at each pair $i < j$, $a_i = a_j$ or $b_i = b_j$. If $a$ is non-constant, pick $a_i \\neq a_j$; then $b_i = b_j$, and any third seat $k$ forces $b_k = b_i$ (pair $(i, k)$ if $a_k \\neq a_i$, else pair $(k, j)$, since $a_k = a_i \\neq a_j$) — so $b$ is constant. Symmetrically a non-constant $b$ forces a constant $a$.',
          'Both cases close honestly: equality exactly when at least one list is constant — and a constant list indeed ties ($\\overline{ab} = c\\,\\bar b = \\bar a\\,\\bar b$).',
        ], answer: 'the identity holds by expansion; Chebyshev follows termwise for similarly sorted lists; equality $\\iff$ every certificate vanishes $\\iff$ at least one list is constant' },
      ] },
      { level: 'L6', questions: [
        { q: 'The sharp census of the middle pairing: for $x \\leq y \\leq z$, show the six pairing sums of the list $(x, y, z)$ with itself are exactly $x^2+y^2+z^2$, $x^2+2yz$, $2xy+z^2$, $xy+yz+zx$ (twice), and $y^2+2xz$; identify the ceiling and the floor with certificates, and prove the two gap identities for the cyclic seat.', solution: [
          'Enumerate the six arrangements of $(x, y, z)$ against the fixed sorted list: the identity pays $x^2+y^2+z^2$; $(y, x, z)$ pays $2xy + z^2$; $(x, z, y)$ pays $x^2 + 2yz$; the two 3-cycles pay $xy + yz + zx$ each; the reversal pays $y^2 + 2xz$.',
          'The ceiling is the identity: $(x^2+y^2+z^2) - (x^2+2yz) = (y-z)^2 \\geq 0$ and $(x^2+y^2+z^2) - (2xy+z^2) = (x-y)^2 \\geq 0$, with the cyclic gap below.',
          'The floor is $y^2 + 2xz$ — the certificates: $x^2+2yz - (y^2+2xz) = (y-x)(2z-x-y) \\geq 0$ (both factors non-negative on $x \\leq y \\leq z$ since $2z \\geq x+y$), and $2xy+z^2 - (y^2+2xz) = (z-y)(z+y-2x) \\geq 0$ (both non-negative: $z \\geq y$ and $z + y \\geq x + y \\geq 2x$).',
          'The cyclic gap identities: $x^2+y^2+z^2 - (xy+yz+zx) = \\frac{1}{2}[(x-y)^2 + (y-z)^2 + (z-x)^2] \\geq 0$ — the 4.3 signature; and $xy+yz+zx - (y^2+2xz) = (x-y)(y-z) \\geq 0$ — expand to check: $(x-y)(y-z) = xy - xz - y^2 + yz$, exactly the gap.',
          'Witness at $(1, 3, 5)$: the six sums read $35, 31, 31, 23, 23, 19$ — ceiling $35$, floor $19$, the cyclic gap $35 - 23 = 12 = \\frac{1}{2}(4+4+16)$ and the floor gap $23 - 19 = 4 = (1-3)(3-5)$.',
        ], answer: 'ceiling $x^2+y^2+z^2$, floor $y^2+2xz$; the cyclic gaps $\\frac{1}{2}[(x-y)^2+(y-z)^2+(z-x)^2]$ and $(x-y)(y-z) \\geq 0$; at $(1,3,5)$: sums $35, 31, 31, 23, 23, 19$ with gaps $12$ and $4$' },
        { q: 'The cyclic floor: for positive $a \\leq b \\leq c$, prove $\\frac{a}{b} + \\frac{b}{c} + \\frac{c}{a} \\geq 3$ and its mirror $\\frac{b}{a} + \\frac{c}{b} + \\frac{a}{c} \\geq 3$ by the order engine, and compute both values at $(a, b, c) = (2, 3, 12)$.', solution: [
          'The reciprocals $(\\frac{1}{a}, \\frac{1}{b}, \\frac{1}{c})$ descend while $(a, b, c)$ ascends — oppositely sorted — so the natural pairing $a\\cdot\\frac{1}{a} + b\\cdot\\frac{1}{b} + c\\cdot\\frac{1}{c} = 3$ is the FLOOR of all six pairings.',
          'The cyclic sum $\\frac{a}{b} + \\frac{b}{c} + \\frac{c}{a}$ pairs $a$ with $\\frac{1}{b}$, $b$ with $\\frac{1}{c}$, $c$ with $\\frac{1}{a}$ — a cyclic arrangement of the reciprocals, hence one of the six pairings, so $\\geq 3$.',
          'The mirror $\\frac{b}{a} + \\frac{c}{b} + \\frac{a}{c}$ pairs the ascending list against the OTHER cyclic arrangement of the reciprocals — also a pairing, also $\\geq 3$; equality in either exactly when $a = b = c$ (the natural pairing is the unique floor for distinct entries).',
          'At $(2, 3, 12)$: $\\frac{2}{3} + \\frac{3}{12} + \\frac{12}{2} = \\frac{2}{3} + \\frac{1}{4} + 6 = \\frac{8 + 3 + 72}{12} = \\frac{83}{12} \\approx 6.92 \\geq 3$; the mirror $\\frac{3}{2} + \\frac{12}{3} + \\frac{2}{12} = \\frac{3}{2} + 4 + \\frac{1}{6} = \\frac{17}{3} \\approx 5.67 \\geq 3$.',
          'Hence both cyclic reads sit safely above the floor — the ratio sums examiners price, delivered by the same floor certificate.',
        ], answer: 'both cyclic sums are pairings above the oppositely-sorted floor $3$ (equality only at $a=b=c$); at $(2,3,12)$: $\\frac{83}{12}$ and $\\frac{17}{3}$' },
      ] },
    ] },
  ],
}

/* figures for lesson 4.4 — the swap certificate and the pairing bars; vivid  */
/* palette only (structure #16a34a, ink #166534, lime #65a30d, teal #0d9488, */
/* amber #d97706, orange #ea580c, red #dc2626, fills #fef3c7/#ffedd5)         */

function swapDiagramSvg(): string {
  // left: the crossed pairing (an inversion) — a_i = 2 at the lower seat,
  // a_j = 5 above, b-values 10 (upper) and 6 (lower): lines cross; right:
  // the uncrossed pairing — parallel lines, the gain annotated
  const node = (x: number, y: number, label: string, fill: string, lx: number, ly: number): string =>
    `<circle cx="${x}" cy="${y}" r="8" fill="${fill}" stroke="#16a34a" stroke-width="2"/>` +
    `<text x="${lx}" y="${ly}" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">${label}</text>`
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels about the exchange certificate. Left panel, the crossed pairing, an inversion: the a-list entries 2 and 5 sit at the lower and upper seats of the left column, the b-values 10 and 6 at the upper and lower seats of the right column, and the pairing lines cross in the middle — the smaller a holds the larger b — paying the crossed sum 2 times 10 plus 5 times 6 equals 50. Right panel, the uncrossed pairing: the same four values paired in order with parallel lines, paying 2 times 6 plus 5 times 10 equals 62. The certificate between them: the gain is the product of the two order gaps, 5 minus 2 times 10 minus 6 equals 12, exactly the difference 62 minus 50.">
  <text x="180" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">the crossed pairing — an inversion</text>
  <text x="180" y="46" font-size="10.5" text-anchor="middle" fill="#0f766e">the smaller a holds the larger b</text>
  <text x="540" y="26" font-size="13" font-weight="700" text-anchor="middle" fill="#166534">the uncrossed — the exchange</text>
  <text x="540" y="46" font-size="10.5" text-anchor="middle" fill="#0f766e">both lists agree in order</text>
  <line x1="355" y1="40" x2="355" y2="300" stroke="#fcd34d" stroke-width="1.4"/>
  <line x1="30" y1="180" x2="330" y2="180" stroke="#5eead4" stroke-width="1.2" stroke-dasharray="4 5"/>
  <line x1="410" y1="180" x2="710" y2="180" stroke="#5eead4" stroke-width="1.2" stroke-dasharray="4 5"/>
  <line x1="80" y1="250" x2="280" y2="110" stroke="#dc2626" stroke-width="2.6"/>
  <line x1="80" y1="110" x2="280" y2="250" stroke="#dc2626" stroke-width="2.6"/>
  <circle cx="180" cy="180" r="6" fill="#fef3c7" stroke="#dc2626" stroke-width="2"/>
  ${node(80, 250, '2', '#fef3c7', 52, 255)}
  ${node(80, 110, '5', '#fef3c7', 52, 115)}
  ${node(280, 110, '10', '#ffedd5', 308, 115)}
  ${node(280, 250, '6', '#ffedd5', 308, 255)}
  <text x="80" y="290" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0d9488">the a-list (ascending)</text>
  <text x="280" y="290" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0d9488">the b-values</text>
  <line x1="440" y1="250" x2="640" y2="250" stroke="#16a34a" stroke-width="2.6"/>
  <line x1="440" y1="110" x2="640" y2="110" stroke="#16a34a" stroke-width="2.6"/>
  ${node(440, 250, '2', '#fef3c7', 412, 255)}
  ${node(440, 110, '5', '#fef3c7', 412, 115)}
  ${node(640, 110, '10', '#ffedd5', 668, 115)}
  ${node(640, 250, '6', '#ffedd5', 668, 255)}
  <text x="540" y="290" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0d9488">uncrossing: the parallel pairing</text>
  <text x="180" y="322" font-size="12.5" font-weight="700" text-anchor="middle" fill="#dc2626">crossed sum: 2·10 + 5·6 = 50</text>
  <text x="540" y="312" font-size="12.5" font-weight="700" text-anchor="middle" fill="#16a34a">uncrossed sum: 2·6 + 5·10 = 62</text>
  <text x="540" y="330" font-size="12.5" font-weight="700" text-anchor="middle" fill="#ea580c">the certificate: (5−2)(10−6) = 12 = 62 − 50</text>
</svg>`
}

function pairingBarsSvg(): string {
  // the same two lists a = (1,2,3), b = (10,20,30) under three pairings:
  // sorted 140 (tallest), scattered 130, reversed 100 — bar heights at
  // 1.6 px per point on a baseline at y = 292
  const bar = (x: number, y: number, h: number, fill: string, value: string, vy: number, label: string, ly: number, verdict: string, vy2: number): string =>
    `<rect x="${x}" y="${y}" width="130" height="${h}" fill="${fill}"/>` +
    `<text x="${x + 65}" y="${vy}" font-size="17" font-weight="700" text-anchor="middle" fill="#ffffff">${value}</text>` +
    `<text x="${x + 65}" y="${ly}" font-size="11" font-weight="700" text-anchor="middle" fill="#166534">${label}</text>` +
    `<text x="${x + 65}" y="${vy2}" font-size="10.5" text-anchor="middle" fill="#0f766e">${verdict}</text>`
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The pairing bar chart for the lists 1, 2, 3 and 10, 20, 30 under three pairings. Three bars rise from one baseline: the sorted pairing 1 times 10 plus 2 times 20 plus 3 times 30 pays 140 and is the tallest bar, labelled the maximum; a scattered middle pairing 1 times 10 plus 2 times 30 plus 3 times 20 pays 130, labelled a middle seat; the reversed pairing 1 times 30 plus 2 times 20 plus 3 times 10 pays 100 and is the shortest bar, labelled the minimum. The caption line reads: the choice of pairing alone is worth 40, the number no earlier engine priced.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the same two lists, three pairings</text>
  ${bar(80, 68, 224, '#16a34a', '140', 96, 'sorted: 1·10 + 2·20 + 3·30', 58, 'the maximum', 312)}
  ${bar(290, 84, 208, '#d97706', '130', 112, 'scattered: 1·10 + 2·30 + 3·20', 74, 'a middle seat', 312)}
  ${bar(500, 132, 160, '#ea580c', '100', 160, 'reversed: 1·30 + 2·20 + 3·10', 122, 'the minimum', 312)}
  <line x1="40" y1="292" x2="690" y2="292" stroke="#0d9488" stroke-width="2.4"/>
  <text x="360" y="335" font-size="11.5" font-weight="700" text-anchor="middle" fill="#ea580c">the choice of pairing alone is worth 40 — the number no earlier engine priced</text>
</svg>`
}



/** 4.5 — run record: authored 2026-11-18 by the parallel swarm (owner chat
 *  directive); engine sections I/J green before prose declared (bun run
 *  scripts/aa-ch04-work/run-45.ts — I 190/190, J 32/32); quiz keys
 *  [1, 2, 1, 2, 1]; 15 exercises L1–L6 = 2/2/3/3/3/2; 2 figures (the
 *  chord-above-curve census, the sine-cap centroid witness); 4
 *  derivations; 6 formula cards; 10 Illustrations; 10 terms; 2 tables; 7
 *  tagged equations; word count 8,006 by countLessonWords. */

/* ------------------------------------------------------------------ */
/* figure helpers — original SVG, vivid palette only (BOOK_FORMAT.md)  */
/* ------------------------------------------------------------------ */

function chordAboveCurveSvg(): string {
  // the convexity discipline on y = x²: the parabola, the long chord
  // (0,0)→(4,16) and the short chord (1,1)→(3,9); both midpoints sit
  // BELOW their chords — the drops are (x−y)²/4 = 4 and 1.
  const px = (x: number): number => 60 + 125 * x
  const py = (y: number): number => 270 - 14 * y
  const pts: string[] = []
  for (let k = 0; k <= 43; k++) {
    const x = k * 0.1
    pts.push(`${px(x).toFixed(1)},${py(x * x).toFixed(1)}`)
  }
  const A = [px(0), py(0)] // (0, 0)
  const B = [px(4), py(16)] // (4, 16)
  const M = [px(2), py(8)] // the long chord's midpoint
  const C = [px(2), py(4)] // the curve at x = 2
  const P = [px(1), py(1)] // (1, 1)
  const Q = [px(3), py(9)] // (3, 9)
  const N = [px(2), py(5)] // the short chord's midpoint
  return `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The convexity discipline on the parabola y equals x squared. Two chords of the same convex curve: the long chord from the point zero zero to the point four sixteen, and the short chord from one one to three nine. At the shared abscissa two, the long chord rides eight units up while the curve reads four — a drop of four — and even the short chord keeps its midpoint at height five, a full unit above the curve at four. Every chord of a convex graph lies on or above the graph between its seats.">
  <text x="320" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">convexity through chords — every chord rides above the cup</text>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.5">
    <path d="M40 ${py(0)}H620 M${px(0)} 292V20"/>
  </g>
  <path d="M40 ${py(0)}H620" stroke="#0d9488" stroke-width="2"/>
  <path d="M${px(0)} 292V20" stroke="#0d9488" stroke-width="2"/>
  <text x="622" y="${py(0) + 4}" font-size="11" font-weight="700" fill="#0f766e">x</text>
  <text x="${px(0) - 8}" y="24" font-size="11" font-weight="700" fill="#0f766e" text-anchor="end">y</text>
  <g stroke="#d97706" stroke-width="1.3">
    <path d="M${px(1)} ${py(0) + 2}V${py(0) + 8} M${px(2)} ${py(0) + 2}V${py(0) + 8} M${px(3)} ${py(0) + 2}V${py(0) + 8} M${px(4)} ${py(0) + 2}V${py(0) + 8}"/>
  </g>
  <g fill="#d97706" font-size="10" text-anchor="middle">
    <text x="${px(1)}" y="${py(0) + 22}">1</text>
    <text x="${px(2)}" y="${py(0) + 22}">2</text>
    <text x="${px(3)}" y="${py(0) + 22}">3</text>
    <text x="${px(4)}" y="${py(0) + 22}">4</text>
  </g>
  <g stroke="#d97706" stroke-width="1.3">
    <path d="M${px(0) - 2} ${py(4)}H${px(0) - 8} M${px(0) - 2} ${py(8)}H${px(0) - 8} M${px(0) - 2} ${py(12)}H${px(0) - 8} M${px(0) - 2} ${py(16)}H${px(0) - 8}"/>
  </g>
  <g fill="#d97706" font-size="10" text-anchor="end">
    <text x="${px(0) - 12}" y="${py(4) + 4}">4</text>
    <text x="${px(0) - 12}" y="${py(8) + 4}">8</text>
    <text x="${px(0) - 12}" y="${py(12) + 4}">12</text>
    <text x="${px(0) - 12}" y="${py(16) + 4}">16</text>
  </g>
  <polyline points="${pts.join(' ')}" fill="none" stroke="#166534" stroke-width="2.4"/>
  <line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="#d97706" stroke-width="2.4"/>
  <line x1="${P[0]}" y1="${P[1]}" x2="${Q[0]}" y2="${Q[1]}" stroke="#ea580c" stroke-width="2.4"/>
  <line x1="${M[0]}" y1="${M[1]}" x2="${C[0]}" y2="${C[1]}" stroke="#0d9488" stroke-width="1.4" stroke-dasharray="4 5" opacity="0.85"/>
  <line x1="${N[0]}" y1="${N[1]}" x2="${C[0] + 14}" y2="${C[1]}" stroke="#0d9488" stroke-width="1.2" stroke-dasharray="3 4" opacity="0.7"/>
  <circle cx="${A[0]}" cy="${A[1]}" r="4.5" fill="#16a34a"/>
  <circle cx="${B[0]}" cy="${B[1]}" r="4.5" fill="#16a34a"/>
  <circle cx="${M[0]}" cy="${M[1]}" r="4.5" fill="#d97706"/>
  <circle cx="${C[0]}" cy="${C[1]}" r="4.5" fill="#16a34a"/>
  <circle cx="${P[0]}" cy="${P[1]}" r="4.5" fill="#16a34a"/>
  <circle cx="${Q[0]}" cy="${Q[1]}" r="4.5" fill="#16a34a"/>
  <circle cx="${N[0]}" cy="${N[1]}" r="4.5" fill="#ea580c"/>
  <text x="568" y="40" font-size="11.5" font-weight="700" fill="#166534">y = x²</text>
  <text x="404" y="108" font-size="11.5" font-weight="700" fill="#d97706">the chord (0, 0) → (4, 16)</text>
  <text x="348" y="176" font-size="11.5" font-weight="700" fill="#ea580c">the second chord (1, 1) → (3, 9)</text>
  <text x="${M[0] + 12}" y="${M[1] - 6}" font-size="11" font-weight="700" fill="#d97706">M (2, 8)</text>
  <text x="${N[0] - 12}" y="${N[1] - 6}" font-size="11" font-weight="700" fill="#ea580c" text-anchor="end">N (2, 5)</text>
  <text x="${C[0] + 12}" y="${C[1] + 16}" font-size="11" font-weight="700" fill="#166534">C (2, 4)</text>
  <text x="${C[0] + 12}" y="${C[1] - 10}" font-size="10" font-weight="700" fill="#0f766e">drop = 4</text>
  <text x="320" y="292" font-size="10.5" text-anchor="middle" fill="#0d9488">both midpoints sit below their chords — the drops are (x−y)²/4 = 4 and 1</text>
</svg>`
}

function sineCapCentroidSvg(): string {
  // the concave witness on the sine cap: P(35°), Q(65°), R(80°) on the arc,
  // their centroid G below the arc, the vertical through G meeting the
  // curve at D and the axis at E — the curve rides above the centroid.
  const px = (deg: number): number => 60 + 3 * deg
  const py = (y: number): number => 255 - 185 * y
  const pts: string[] = []
  for (let d = 0; d <= 180; d += 3) {
    pts.push(`${px(d).toFixed(1)},${py(Math.sin((d * Math.PI) / 180)).toFixed(1)}`)
  }
  const P = [px(35), py(Math.sin((35 * Math.PI) / 180))]
  const Q = [px(65), py(Math.sin((65 * Math.PI) / 180))]
  const R = [px(80), py(Math.sin((80 * Math.PI) / 180))]
  const centroidY = (Math.sin((35 * Math.PI) / 180) + Math.sin((65 * Math.PI) / 180) + Math.sin((80 * Math.PI) / 180)) / 3
  const G = [px(60), py(centroidY)]
  const D = [px(60), py(Math.sin((60 * Math.PI) / 180))]
  const E = [px(60), py(0)]
  return `<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The concave witness on the sine cap. The curve y equals sin x on the interval from zero to pi is a cap. Three seats P, Q, R sit on the arc at thirty-five, sixty-five and eighty degrees; their chords form a triangle riding below the arc. The centroid G of the three seats — the point whose height is the average of the three sine values — falls below the arc: the vertical through it meets the curve above at D and the axis below at E, and the height DE exceeds the height GE. The curve at the average abscissa rides above the average of the three values.">
  <text x="320" y="20" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the concave direction — the cap rides above its chords and above the centroid</text>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.5">
    <path d="M40 ${py(0)}H620 M${px(0)} 278V32"/>
  </g>
  <path d="M40 ${py(0)}H620" stroke="#0d9488" stroke-width="2"/>
  <path d="M${px(0)} 278V32" stroke="#0d9488" stroke-width="2"/>
  <text x="622" y="${py(0) + 4}" font-size="11" font-weight="700" fill="#0f766e">x</text>
  <text x="${px(0) - 8}" y="36" font-size="11" font-weight="700" fill="#0f766e" text-anchor="end">y</text>
  <g stroke="#d97706" stroke-width="1.3">
    <path d="M${px(90)} ${py(0) + 2}V${py(0) + 8} M${px(180)} ${py(0) + 2}V${py(0) + 8} M${px(0) - 2} ${py(0.5)}H${px(0) - 8} M${px(0) - 2} ${py(1)}H${px(0) - 8}"/>
  </g>
  <g fill="#d97706" font-size="10.5" text-anchor="middle">
    <text x="${px(0)}" y="${py(0) + 22}">0</text>
    <text x="${px(90)}" y="${py(0) + 22}">π/2</text>
    <text x="${px(180)}" y="${py(0) + 22}">π</text>
  </g>
  <g fill="#d97706" font-size="10" text-anchor="end">
    <text x="${px(0) - 12}" y="${py(0.5) + 4}">0.5</text>
    <text x="${px(0) - 12}" y="${py(1) + 4}">1</text>
  </g>
  <polyline points="${pts.join(' ')}" fill="none" stroke="#166534" stroke-width="2.4"/>
  <g stroke="#d97706" stroke-width="2" fill="none">
    <path d="M${P[0]} ${P[1]}L${Q[0]} ${Q[1]}L${R[0]} ${R[1]}Z"/>
  </g>
  <line x1="${E[0]}" y1="${E[1]}" x2="${D[0]}" y2="${D[1] - 14}" stroke="#0d9488" stroke-width="1.4" stroke-dasharray="4 5" opacity="0.9"/>
  <circle cx="${P[0]}" cy="${P[1]}" r="4.5" fill="#16a34a"/>
  <circle cx="${Q[0]}" cy="${Q[1]}" r="4.5" fill="#16a34a"/>
  <circle cx="${R[0]}" cy="${R[1]}" r="4.5" fill="#16a34a"/>
  <circle cx="${D[0]}" cy="${D[1]}" r="4.5" fill="#16a34a"/>
  <circle cx="${G[0]}" cy="${G[1]}" r="4.5" fill="#ea580c"/>
  <circle cx="${E[0]}" cy="${E[1]}" r="3.2" fill="#d97706"/>
  <text x="345" y="62" font-size="11.5" font-weight="700" fill="#166534">y = sin x</text>
  <text x="${P[0] - 12}" y="${P[1] + 4}" font-size="11" font-weight="700" fill="#16a34a" text-anchor="end">P (35°)</text>
  <text x="${Q[0] - 12}" y="${Q[1] - 4}" font-size="11" font-weight="700" fill="#166534" text-anchor="end">Q (65°)</text>
  <text x="${R[0] + 12}" y="${R[1] - 2}" font-size="11" font-weight="700" fill="#166534">R (80°)</text>
  <text x="${D[0] + 12}" y="${D[1] - 4}" font-size="11" font-weight="700" fill="#166534">D — the curve at 60°</text>
  <text x="${G[0] + 12}" y="${G[1] + 4}" font-size="11" font-weight="700" fill="#ea580c">G — the centroid (0.822)</text>
  <text x="${E[0] + 12}" y="${E[1] - 8}" font-size="11" font-weight="700" fill="#d97706">E</text>
  <text x="320" y="292" font-size="10.5" text-anchor="middle" fill="#0d9488">DE = 0.866 exceeds GE = 0.822 — the curve at the average abscissa tops the average of the values</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 4.5                                                          */
/* ------------------------------------------------------------------ */

 const lesson45: Lesson = {
  id: 'aa-jensens-inequality-and-convexity',
  number: '4.5',
  title: 'Jensen\u2019s Inequality and Convexity',
  concepts: [
    'convex function',
    'chord above the graph',
    'midpoint convexity',
    'Jensen\u2019s inequality',
    'the concave direction',
    'the doubling ladder',
    'the equality discipline',
    'the sine-cap witness',
  ],
  objectives: [
    'Define convexity honestly — every chord on or above the graph — and certify $x^2$ by completing the square.',
    'State and use Jensen\u2019s inequality in its two-point weighted form and its equal-weight $n$-point form, with the doubling ladder\u2019s honest scope.',
    'Flip the inequality for concave functions and price the sine-cap witness $\\sin A + \\sin B + \\sin C \\leq 3\\sqrt{3}/2$.',
    'Recognize Jensen on $x^2$ as the QM–AM rung of the power-mean ladder and convexity of $|x|$ as the triangle inequality\u2019s seed.',
    'Apply the equality discipline: which Jensen bounds are attained, where, and what spread costs what gap.',
  ],
  prerequisites: ['aa-the-weighted-am-gm-and-its-consequences', 'aa-the-arithmetic-geometric-mean-inequality'],
  sources: [
    'cengage-m2-06',
    'cengage-jee-style',
    'openstax-college-algebra',
    'jee-main-2026-syllabus',
    'jensen-1906-convex-functions',
    'wiki-convex-function',
  ],
  blocks: [
    { kind: 'para', text: 'Four engines are now installed in the tower. Lesson 4.1 priced the two-number means — the arithmetic, the geometric, the harmonic — each order a square that cannot be negative; lesson 4.2 weighted them and mounted the power-mean ladder $M_r$; lesson 4.3 priced dot products with Cauchy–Schwarz and its Engel form; lesson 4.4 priced sorted sums with the rearrangement and Chebyshev engines. Every one of those engines priced NUMBERS — lists of them, weights on them, order among them. This lesson prices something none of them could even name: the SHAPE of the function itself. A graph can be a cup (the parabola $y = x^2$, the V of $|x|$) or a cap (the sine arch on $(0, \\pi)$, the root curve $\\sqrt{x}$) — and shape, it turns out, is a machine for bounding averages without computing them: a convex function never lets its value at an average outrun the average of its values.' },
    { kind: 'para', text: 'The route, in the tower\u2019s order: the honest geometric definition first — convexity through chords, the line-segment test a ruler could run; then the algebraic certificate for the model citizen $x^2$, one completed square, the same discipline that has paid every $A \\geq G$ since lesson 4.1; then Jensen\u2019s inequality, which is that definition cashed as a theorem and read aloud; the doubling ladder that grows two seats into every power of two on 4.1\u2019s precedent; the concave direction — the flip — carrying the sine-cap witness $\\sin A + \\sin B + \\sin C \\leq 3\\sqrt{3}/2$, priced at our own triangle and swept by the engines; and finally the family reunion: Jensen on $x^2$ IS the QM–AM rung of 4.2\u2019s ladder, the convexity of $|x|$ is the seed of 4.6\u2019s triangle engine, and the AM–GM-from-Jensen door is named — pointed at chapter 9\u2019s logarithm, never opened here. Two debts are recorded honestly on the way, because this book\u2019s discipline is to name what it defers.' },

    { kind: 'heading', text: 'Convexity Through Chords' },
    { kind: 'para', text: 'Hold a ruler against the parabola $y = x^2$ anywhere: join two points of the curve by a straight segment — a CHORD — and the segment floats above the curve between its two ends. Do the same on the sine arch between $0$ and $\\pi$ and the ruler sinks below the arc. The parabola is a cup; the arch is a cap; and the whole of this lesson flows from taking that ruler test seriously as a DEFINITION, not an accident of drawing.' },
    { kind: 'callout', tone: 'definition', title: 'Convex function (the chord definition)', text: 'A real function $f$ is said to be CONVEX on an interval $I$ when, for all seats $x, y \\in I$ and every weight $\\lambda \\in [0, 1]$, $f\\bigl(\\lambda x + (1-\\lambda)y\\bigr) \\leq \\lambda f(x) + (1-\\lambda) f(y).$ GEOMETRICALLY: every chord — the line segment joining $(x, f(x))$ to $(y, f(y))$ — lies ON or ABOVE the graph between the two seats. Thus, $f$ is convex on $I$ exactly when its graph never rises above any of its chords; the weighted seat $\\lambda x + (1-\\lambda)y$ runs through the whole segment as $\\lambda$ runs from $1$ to $0$, and the inequality says the graph at that seat never beats the chord at it.' },
    { kind: 'equation', latex: 'f\\bigl(\\lambda x + (1-\\lambda) y\\bigr) \\;\\leq\\; \\lambda f(x) + (1-\\lambda) f(y) \\qquad (\\lambda \\in [0,1],\\ x, y \\in I) \\tag{1}', note: 'the chord-above-graph definition in symbols — the right side is the chord\u2019s height at the weighted seat, the left side the graph\u2019s.' },
    { kind: 'callout', tone: 'definition', title: 'Midpoint convexity — the λ = 1/2 case', text: 'A function $f$ is MIDPOINT CONVEX on $I$ when the definition holds at the single weight $\\lambda = \\tfrac12$: for all $x, y \\in I$, $f\\!\\left(\\frac{x+y}{2}\\right) \\leq \\frac{f(x) + f(y)}{2}.$ GEOMETRICALLY: the graph at the MIDPOINT of any two seats never rises above the chord\u2019s midpoint. Every convex function is midpoint convex (one special case of the definition); whether the converse holds is a question this lesson answers honestly below.' },
    { kind: 'equation', latex: 'f\\!\\left(\\frac{x+y}{2}\\right) \\;\\leq\\; \\frac{f(x) + f(y)}{2} \\tag{2}', note: 'midpoint convexity — the single weight λ = 1/2; the chord\u2019s midpoint height against the graph at the seat halfway between.' },
    { kind: 'para', text: 'For example, on a small roster:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $f(x) = x^2$ is convex on all of $\\mathbb{R}$ — the cup of the whole chapter, certificate below: one completed square;',
      '(ii) $f(x) = |x|$ is convex on all of $\\mathbb{R}$ — every chord of the V rides above the V (the certificate is the triangle discipline itself);',
      '(iii) $f(x) = \\sqrt{x}$ is CONCAVE on $(0, \\infty)$ — the root family\u2019s cap (its certificate, this lesson shows, is 4.1\u2019s AM–GM itself);',
      '(iv) $y = \\sin x$ is concave on $(0, \\pi)$ — the arch, this lesson\u2019s witness family;',
      '(v) every straight line $f(x) = mx + c$ is both convex and concave — its chords ARE the graph, the honest middle where every bound is tight.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Midpoint alone is not the whole definition — a named debt', text: 'The two statements are NOT equivalent without help. A midpoint-convex function that is CONTINUOUS is convex — and even measurability suffices — but the bridge from $\\lambda = \\tfrac12$ to every $\\lambda$ is a limiting argument that belongs to analysis, beyond this book\u2019s current tools (the doorstep is chapter 9\u2019s). The debt is recorded, not hidden: every convexity certificate in THIS book is therefore made at every $\\lambda \\in [0,1]$, never only at $\\lambda = \\tfrac12$ — the two notions are kept distinct, and nothing convex is claimed from midpoint evidence alone.' },
    { kind: 'figure', caption: 'The convexity discipline on $y = x^2$: two chords of one cup. The long chord from $(0, 0)$ to $(4, 16)$ reads $8$ at $x = 2$ while the curve reads $4$ — the drop is $\\tfrac{(4-0)^2}{4} = 4$ — and even the short chord from $(1, 1)$ to $(3, 9)$ keeps its midpoint $N = (2, 5)$ a full unit above the curve\u2019s $C = (2, 4)$, the drop $\\tfrac{(3-1)^2}{4} = 1$. Every chord, every seat between: above or on.', svg: chordAboveCurveSvg() },
    { kind: 'derivation', title: 'The algebraic certificate for x²', statement: 'For every weight $\\lambda \\in [0, 1]$ and all reals $x, y$: $\\bigl(\\lambda x + (1-\\lambda)y\\bigr)^2 \\leq \\lambda x^2 + (1-\\lambda) y^2$ — and the gap between the two sides is EXACTLY $\\lambda(1-\\lambda)(x - y)^2$.', steps: [
      { label: 'Expand the square', formula: '\\bigl(\\lambda x + (1-\\lambda)y\\bigr)^2 = \\lambda^2 x^2 + 2\\lambda(1-\\lambda)xy + (1-\\lambda)^2 y^2', explanation: 'A straight binomial square — the weighted seat, squared. Nothing but the distributive law and $\\lambda + (1-\\lambda) = 1$ behind it.' },
      { label: 'Subtract it from the chord height', formula: '\\lambda x^2 + (1-\\lambda) y^2 - \\bigl(\\lambda x + (1-\\lambda)y\\bigr)^2', explanation: 'The $x^2$ coefficient is $\\lambda - \\lambda^2 = \\lambda(1-\\lambda)$; the $y^2$ coefficient is $(1-\\lambda) - (1-\\lambda)^2 = \\lambda(1-\\lambda)$; the cross term is $-2\\lambda(1-\\lambda)xy$ — every coefficient carries the same factor.' },
      { label: 'Factor — completing the square', formula: '\\lambda(1-\\lambda)\\bigl(x^2 - 2xy + y^2\\bigr) = \\lambda(1-\\lambda)(x-y)^2', explanation: 'One common factor $\\lambda(1-\\lambda)$ times the perfect square $(x - y)^2$ — the completing-the-square discipline that proved every $A_2 \\geq G_2$ since lesson 4.1, now paying for curvature.' },
      { label: 'Read the two factors', formula: '\\lambda(1-\\lambda) \\geq 0, \\qquad (x-y)^2 \\geq 0', explanation: 'On $[0,1]$ the weight factor $\\lambda(1-\\lambda)$ is never negative, and a square never is: the gap is $\\geq 0$ for every weight and every pair — the certificate. At $\\lambda = \\tfrac12$ the gap is $\\tfrac{(x-y)^2}{4}$, zero exactly when $x = y$: the cup is STRICT between distinct seats.' },
    ], result: '$\\lambda x^2 + (1-\\lambda) y^2 - \\bigl(\\lambda x + (1-\\lambda)y\\bigr)^2 = \\lambda(1-\\lambda)(x-y)^2 \\;\\geq\\; 0$ — the square $x^2$ is convex on $\\mathbb{R}$, strictly between distinct seats' },
    { kind: 'equation', latex: '\\lambda x^2 + (1-\\lambda)y^2 - \\bigl(\\lambda x + (1-\\lambda)y\\bigr)^2 = \\lambda(1-\\lambda)(x-y)^2 \\tag{3}', note: 'the gap identity — the weighted variance of two seats; at λ = 1/2 it reads (x−y)²/4, the certificate every rung below will cash.' },
    { kind: 'formula', name: 'The convexity definition inequality', latex: 'f\\bigl(\\lambda x + (1-\\lambda) y\\bigr) \\leq \\lambda f(x) + (1-\\lambda) f(y), \\qquad f\\!\\left(\\tfrac{x+y}{2}\\right) \\leq \\tfrac{f(x)+f(y)}{2}', note: 'chord on or above the graph, every λ ∈ [0,1]; the λ = 1/2 line is midpoint convexity — necessary, not sufficient alone (the continuity debt).' },
    { kind: 'formula', name: 'The x² certificate (the gap identity)', latex: '\\lambda x^2 + (1-\\lambda)y^2 - \\bigl(\\lambda x + (1-\\lambda)y\\bigr)^2 = \\lambda(1-\\lambda)(x-y)^2 \\geq 0', note: 'one completed square certifies the cup; at λ = 1/2 the gap is (x−y)²/4 — the spread priced exactly, zero iff the seats coincide.' },
    { kind: 'table', caption: 'The chord census on $y = x^2$ — every row recomputed by the engines before this prose was written: the gap is $\\lambda(1-\\lambda)(x-y)^2$, positive for distinct seats at any interior weight, and weight-symmetric (rows three and four price the SAME gap at mirror weights $\\tfrac14$ and $\\tfrac34$).', head: ['Seats', 'Weight λ', 'The weighted seat', 'Curve value', 'Chord value', 'Gap'], rows: [
      ['$0$ and $4$', '$\\tfrac12$', '$2$', '$4$', '$8$', '$4$'],
      ['$1$ and $3$', '$\\tfrac12$', '$2$', '$4$', '$5$', '$1$'],
      ['$1$ and $5$', '$\\tfrac14$', '$4$', '$16$', '$19$', '$3$'],
      ['$1$ and $5$', '$\\tfrac34$', '$2$', '$4$', '$7$', '$3$'],
      ['$2$ and $6$', '$\\tfrac12$', '$4$', '$16$', '$20$', '$4$'],
    ] },
    { kind: 'example', title: 'Read the chord census off the parabola: price the two chords of the figure at the shared abscissa x = 2, and verify each drop against the certificate', steps: [
      'The long chord joins $(0, 0)$ to $(4, 16)$: its height at $x = 2$ is the average $\\tfrac{0 + 16}{2} = 8$, while the curve reads $2^2 = 4$ — the chord rides $4$ units above.',
      'The certificate prices the drop exactly: $\\tfrac{(4-0)^2}{4} = 4$ — the weighted variance of the two seats, zero only where the seats coincide.',
      'The short chord joins $(1, 1)$ to $(3, 9)$: its midpoint height is $\\tfrac{1 + 9}{2} = 5$ against the curve\u2019s $4$ — a drop of $1 = \\tfrac{(3-1)^2}{4}$.',
      'Hence, both chords, one shared abscissa, one law: the graph at $x = 2$ sits below every chord through it, by exactly the spread factor $\\tfrac{(x-y)^2}{4}$ — the figure\u2019s two drops of $4$ and $1$ are the census\u2019s first two rows.',
    ] },
    { kind: 'example', title: 'Price the two-point bound at a quarter weight: for f(x) = x², x = 1, y = 5, λ = 1/4, compute the weighted seat, the curve\u2019s value there, the chord value, and the gap', steps: [
      'The weighted seat: $\\tfrac14 \\cdot 1 + \\tfrac34 \\cdot 5 = \\tfrac14 + \\tfrac{15}{4} = 4$, so the curve reads $f(4) = 16$.',
      'The chord height: $\\tfrac14 f(1) + \\tfrac34 f(5) = \\tfrac14 \\cdot 1 + \\tfrac34 \\cdot 25 = \\tfrac14 + \\tfrac{75}{4} = 19$ — the guaranteed bound.',
      'The gap by the identity: $\\lambda(1-\\lambda)(x-y)^2 = \\tfrac14 \\cdot \\tfrac34 \\cdot 16 = 3$ — and indeed $19 - 16 = 3$, the certificate and the arithmetic agree.',
      'Hence, $f(4) = 16 \\leq 19$: the cup never lets its value at the weighted seat outrun the weighted average of the values — here by exactly $3$.',
    ] },

    { kind: 'heading', text: 'Jensen\u2019s Inequality: the Definition Cashed as a Theorem' },
    { kind: 'para', text: 'The last Illustration ran the definition at one weight on one pair. Now say it aloud as a theorem — the same inequality, promoted from a property of cups to a bound on averages — and the promotion is pure rereading: for a convex $f$, the function\u2019s value at a weighted average never exceeds the weighted average of the function\u2019s values. Jensen\u2019s inequality is the chord definition with its collar turned around.' },
    { kind: 'callout', tone: 'theorem', title: 'Jensen\u2019s inequality — two points, weighted', text: 'Let $f$ be convex on an interval $I$. For all $x, y \\in I$ and every weight $\\lambda \\in [0, 1]$: $f\\bigl(\\lambda x + (1-\\lambda)y\\bigr) \\leq \\lambda f(x) + (1-\\lambda) f(y).$ EQUALITY DISCIPLINE: equality is free when $x = y$ or when $\\lambda \\in \\{0, 1\\}$ (a chord\u2019s ends are its own seats); for the strictly convex families — $x^2$ among them, by the gap identity — equality holds ONLY there: any distinct pair at an interior weight pays a strictly positive gap. Weights read as shares: $\\lambda x + (1-\\lambda)y$ is the portfolio that holds share $\\lambda$ of seat $x$ and share $1-\\lambda$ of seat $y$; the inequality prices the portfolio BEFORE it is formed.' },
    { kind: 'callout', tone: 'insight', title: 'What the theorem buys is the reading', text: 'The statement is the definition — that is the point. What changes is the direction of use: the definition is a property you CHECK on a function you know; Jensen is a bound you CASH on an average you were about to compute. Every "greatest or least value under a fixed sum" item in the examination bank is this read at speed: the fixed sum names the average, the convex family names the side of the inequality that wins, and the equality discipline names the seat where the bound is attained.' },
    { kind: 'example', title: '(exam-style) For positive a, b with a + b = 10, find the least value of a² + b²', steps: [
      'The fixed sum names the average: $\\tfrac{a+b}{2} = 5$ — the two-seat portfolio held in equal shares.',
      'Jensen on the cup $f(t) = t^2$ at equal weights: $\\bigl(\\tfrac{a+b}{2}\\bigr)^2 \\leq \\tfrac{a^2 + b^2}{2}$ — the value at the average never exceeds the average of the values.',
      'Substituting the named average: $25 \\leq \\tfrac{a^2+b^2}{2}$, so $a^2 + b^2 \\geq 50$.',
      'The equality discipline: the gap identity prices the miss exactly — $a^2 + b^2 = 2\\bigl(\\tfrac{a+b}{2}\\bigr)^2 + \\tfrac{(a-b)^2}{2} = 50 + \\tfrac{(a-b)^2}{2}$, zero surcharge only at $a = b = 5$.',
      'Hence, the least value is $50$, attained exactly at the equal split $a = b = 5$ — the fixed-sum discipline of lesson 4.1 reread through curvature.',
    ] },
    { kind: 'example', title: 'The equality discipline, priced: when does a chord of y = x² fail to be strict?', steps: [
      'Equal seats: at $x = y = 2$ the chord joins the curve to itself — every weight returns the same seat, and the gap $\\lambda(1-\\lambda)(x-y)^2$ is $0$.',
      'Endpoint weights: at $\\lambda = 0$ the weighted seat IS $y$ — the chord\u2019s end — so the bound reads $f(y) \\leq f(y)$, tight for trivial reasons.',
      'The linear family: $f(t) = 3t + 1$ is both convex and concave; its chords ARE its graph. Witness at $(2, 6)$: $f\\bigl(\\tfrac{2+6}{2}\\bigr) = f(4) = 13$ and $\\tfrac{f(2)+f(6)}{2} = \\tfrac{7+19}{2} = 13$ — equality at every weight.',
      'Hence, for the strict cup $x^2$ the chord is strict exactly between distinct seats at interior weights; straight lines are the honest middle where no gap can form.',
    ] },
    { kind: 'para', text: 'The reunion this rereading unlocks is the one the chapter has been building toward. Take Jensen on $x^2$ at equal weights over a roster: $\\bigl(\\tfrac{x_1 + \\cdots + x_n}{n}\\bigr)^2 \\leq \\tfrac{x_1^2 + \\cdots + x_n^2}{n}$ — the square of the mean never exceeds the mean of the squares. Square-root both sides (both non-negative): the arithmetic mean never exceeds the quadratic mean — $M_1 \\leq M_2$, the second rung of the power-mean ladder lesson 4.2 mounted. The ladder\u2019s rung and the curvature certificate are the SAME mathematics at two addresses: $4.2$ priced it as a fact about means, this lesson prices it as a fact about shape.' },
    { kind: 'equation', latex: '\\left(\\frac{x_1 + \\cdots + x_n}{n}\\right)^{\\!2} \\leq \\frac{x_1^2 + \\cdots + x_n^2}{n} \\qquad \\Longleftrightarrow \\qquad M_1 \\leq M_2 \\tag{4}', note: 'Jensen on x² at equal weights IS the QM–AM rung of 4.2\u2019s power-mean ladder — the engine family reunited.' },
    { kind: 'example', title: 'Cash the reunion on the roster {3, 7}: verify the QM–AM rung by the gap identity and price the quadratic mean', steps: [
      'The roster\u2019s arithmetic mean: $\\tfrac{3 + 7}{2} = 5$; the mean of the squares: $\\tfrac{9 + 49}{2} = 29$.',
      'The rung: $5^2 = 25 \\leq 29$, so $M_1 = 5 \\leq M_2 = \\sqrt{29} \\approx 5.385$ — the quadratic mean tops the arithmetic one.',
      'The certificate prices the gap exactly: $29 - 25 = 4 = \\tfrac{(3-7)^2}{4}$ — the two-seat variance, the same square that paid for $A_2 \\geq G_2$ in 4.1.',
      'Hence, $5 \\leq \\sqrt{29}$ with the miss exactly $\\tfrac{(3-7)^2}{4} = 4$ in squared units — the ladder\u2019s rung and the chord\u2019s drop are one certificate.',
    ] },
    { kind: 'formula', name: 'Jensen\u2019s inequality — two points, weighted', latex: 'f\\bigl(\\lambda x + (1-\\lambda) y\\bigr) \\leq \\lambda f(x) + (1-\\lambda) f(y) \\quad (\\lambda \\in [0,1])', note: 'the definition cashed as a theorem: the value at a weighted average never exceeds the weighted average of the values; equality for strict cups only at equal seats or endpoint weights.' },

    { kind: 'heading', text: 'The Doubling Ladder: Two Seats to Every Power of Two' },
    { kind: 'para', text: 'One chord bounds one pair. A roster has more than two seats — and the honest way from two seats to many is the ladder lesson 4.1 built for the means: PAIR the seats, bound each pair, then bound the pair of pair-averages, and so on. Each rung doubles the seat count, and every rung is nothing but the two-seat case wearing a longer roster.' },
    { kind: 'derivation', title: 'The doubling ladder', statement: 'For a convex $f$ on an interval $I$: the two-seat certificate at equal weights grows to four seats, then to every power of two — $f\\bigl(\\tfrac{x_1+\\cdots+x_{2^k}}{2^k}\\bigr) \\leq \\tfrac{f(x_1)+\\cdots+f(x_{2^k})}{2^k}$ for every $k$.', steps: [
      { label: 'Two seats', formula: 'f\\!\\left(\\frac{x_1+x_2}{2}\\right) \\leq \\frac{f(x_1)+f(x_2)}{2}', explanation: 'The $\\lambda = \\tfrac12$ case of the definition — rung one. All averages here are EQUAL-weight portfolios: each seat held at share $\\tfrac12$, then $\\tfrac14$, and so on.' },
      { label: 'Pair, then pair again', formula: 'f\\!\\left(\\tfrac{x_1+x_2+x_3+x_4}{4}\\right) \\leq \\tfrac{f(x_1)+f(x_2)+f(x_3)+f(x_4)}{4}', explanation: 'The four-seat average is the two-seat average OF the pair-averages $\\tfrac{x_1+x_2}{2}$ and $\\tfrac{x_3+x_4}{2}$; apply the two-seat case to those, then once more to the values — the bound cascades: $f(\\text{avg}) \\leq \\tfrac{f(\\text{pair avg}_1)+f(\\text{pair avg}_2)}{2} \\leq \\tfrac{\\text{avg of the four } f}{1}$ in two moves. Every intermediate seat stays in $I$, because an interval contains all averages of its own seats.' },
      { label: 'k rounds', formula: 'f\\!\\left(\\tfrac{x_1+\\cdots+x_{2^k}}{2^k}\\right) \\leq \\tfrac{f(x_1)+\\cdots+f(x_{2^k})}{2^k}', explanation: 'Every round of pairing halves the seat count: $2 \\to 4 \\to 8 \\to \\cdots \\to 2^k$ after $k$ rounds, each round nothing but the two-seat case. The certificate for a FIXED $k$ is a finite derivation — write the $k$ rounds down; the statement for EVERY $k$ at once is an induction, and the formal induction certificate belongs to chapter 7: the same door that holds 4.1\u2019s general-$n$ AM–GM. Named here as the standing debt, not cashed.' },
      { label: 'The honest scope for arbitrary n', formula: 'f\\!\\left(\\tfrac{x_1+\\cdots+x_n}{n}\\right) \\leq \\tfrac{f(x_1)+\\cdots+f(x_n)}{n}', explanation: 'The theorem below states the equal-weight bound for EVERY $n$ — and the scope note in the theorem is part of the statement, not a footnote: the powers of two are certified on the ladder above; a FIXED smaller $n$ is reached by the padding discipline (seat copies of the average up to the next power of two — the next insight); the every-$n$-at-once certificate rides chapter 7\u2019s induction. This book states the theorem honestly with its debt named.' },
    ], result: '$f\\bigl(\\tfrac{x_1+\\cdots+x_{2^k}}{2^k}\\bigr) \\leq \\tfrac{f(x_1)+\\cdots+f(x_{2^k})}{2^k} \\quad \\text{(the ladder\u2019s certified reach: } n = 2, 4, 8, \\ldots\\text{)}$' },
    { kind: 'callout', tone: 'theorem', title: 'Jensen\u2019s inequality — n points, equal weights, with the honest scope note', text: 'Let $f$ be convex on an interval $I$ and $x_1, \\ldots, x_n \\in I$. Then $f\\!\\left(\\frac{x_1 + \\cdots + x_n}{n}\\right) \\leq \\frac{f(x_1) + \\cdots + f(x_n)}{n}.$ PROOF SCOPE (part of the statement): the doubling ladder certifies this book\u2019s copy for $n = 2, 4, 8, \\ldots$ — every power of two; a fixed smaller $n$ is cashed by the padding discipline (below); the every-$n$ certificate is chapter 7\u2019s induction, the same debt 4.1\u2019s doubling ladder recorded. If $f$ is CONCAVE on $I$, the inequality REVERSES: $f(\\text{average}) \\geq \\text{average of the } f \\text{ values}$. EQUALITY: at $x_1 = \\cdots = x_n$ for any $f$; for strict families only there (and for affine families — the straight lines — everywhere).' },
    { kind: 'equation', latex: 'f\\!\\left(\\frac{x_1 + \\cdots + x_n}{n}\\right) \\leq \\frac{f(x_1) + \\cdots + f(x_n)}{n} \\tag{5}', note: 'the equal-weight statement for n seats — certified on the doubling ladder\u2019s reach, every-n deferred to chapter 7\u2019s induction, honestly.' },
    { kind: 'callout', tone: 'insight', title: 'The padding discipline — too few seats for the ladder\u2019s reach', text: 'Three seats, four-seat rung: pad. Seat COPIES OF THE AVERAGE alongside the roster — $n$ original seats plus enough copies of their average $\\mu$ to reach the next power of two — and the padded roster\u2019s average is STILL $\\mu$ (adding copies of the mean moves nothing). The power-of-two rung on the padded roster rearranges into the bound for the ORIGINAL seats: the copies\u2019 $f(\\mu)$ terms pack to the left and cancel down to $n\\,f(\\mu) \\leq f(x_1) + \\cdots + f(x_n)$. This is how this lesson cashes its three-seat sine witness from the four-seat rung — no deferred certificate touched — and it is the shape of the every-$n$ bridge chapter 7 will certify in full.' },
    { kind: 'example', title: 'The four-seat rung on a spread roster: for {2, 4, 6, 8} verify avg(x²) − (avg x)² and read the roster as a fixed-sum hunt', steps: [
      'The roster\u2019s average: $\\tfrac{2+4+6+8}{4} = 5$; the average of the squares: $\\tfrac{4+16+36+64}{4} = 30$.',
      'The rung: $5^2 = 25 \\leq 30$, the gap $30 - 25 = 5$ — and the deviations $-3, -1, 1, 3$ price it: $\\tfrac{9+1+1+9}{4} = 5$, the roster\u2019s variance.',
      'The fixed-sum read: the roster\u2019s sum is $20$, and the equal split $\\{5,5,5,5\\}$ carries $4 \\cdot 25 = 100$ against the roster\u2019s $120$ — the spread of $\\pm 3$ around the middle costs exactly $20$ extra units of square.',
      'Hence, $25 \\leq 30$ with the gap the variance $5$ — and every four-seat roster summing to $20$ pays at least $100$ in squares, equality only at the equal split.',
    ] },
    { kind: 'formula', name: 'Jensen\u2019s inequality — n points, equal weights', latex: 'f\\!\\left(\\frac{x_1 + \\cdots + x_n}{n}\\right) \\leq \\frac{f(x_1) + \\cdots + f(x_n)}{n} \\quad (\\text{concave } f: \\ \\geq)', note: 'the doubling ladder certifies n = 2, 4, 8, …; padding cashes a fixed smaller n from the next rung; every-n rides chapter 7. Concave families flip the sign.' },

    { kind: 'heading', text: 'The Concave Direction: the Cap Family' },
    { kind: 'para', text: 'Turn the cup over and every chord sinks below the graph: that is the whole of the concave direction. The inequality flips — the function at an average is at LEAST the average of the values — and the flip is not a new theorem but the same one read on $-f$. What makes the direction worth its own section is the witness it carries: the sine arch on $(0, \\pi)$ is a cap, and its cap-ness prices one of the most-quoted bounds in the trigonometric examination bank without a single derivative.' },
    { kind: 'callout', tone: 'definition', title: 'Concave function — the cap definition', text: 'A real function $f$ is CONCAVE on an interval $I$ when every chord lies ON or BELOW the graph between its seats: for all $x, y \\in I$ and $\\lambda \\in [0,1]$, $f\\bigl(\\lambda x + (1-\\lambda)y\\bigr) \\;\\geq\\; \\lambda f(x) + (1-\\lambda) f(y).$ Thus, $f$ is concave on $I$ exactly when $-f$ is convex on $I$ — the cup becomes a cap, and Jensen\u2019s every statement reverses its sign.' },
    { kind: 'equation', latex: 'f\\bigl(\\lambda x + (1-\\lambda) y\\bigr) \\;\\geq\\; \\lambda f(x) + (1-\\lambda) f(y) \\qquad \\text{and} \\qquad f\\!\\left(\\frac{x_1+\\cdots+x_n}{n}\\right) \\geq \\frac{f(x_1)+\\cdots+f(x_n)}{n} \\tag{6}', note: 'the concave flip: chord below graph, value at an average at least the average of the values — the sign every cup statement carried, reversed for caps.' },
    { kind: 'callout', tone: 'warn', title: 'Two frauds the cap family prices', text: 'FRAUD ONE: convex does not mean increasing. The cup $x^2$ is convex on ALL of $\\mathbb{R}$ yet FALLS on $(-\\infty, 0)$; the cap $\\sin x$ rises then falls on $(0, \\pi)$ while staying concave throughout. Curvature is a statement about CHORDS, not about slope — a monotone function can be either family, and so can a non-monotone one. FRAUD TWO: the direction flip forgotten. A cap satisfies the REVERSED Jensen inequality; running the cup\u2019s $\\leq$ on the sine arch (for instance) manufactures a "bound" in the wrong direction — the engines sweep every witness both ways precisely so this lesson never prices that fraud.' },
    { kind: 'derivation', title: 'The sine-cap witness: sin A + sin B + sin C ≤ 3√3/2', statement: 'For $A, B, C \\in (0, \\pi)$ with $A + B + C = \\pi$ (the angles of a triangle): $\\sin A + \\sin B + \\sin C \\leq 3\\sqrt{3}/2$, with equality exactly at the equilateral seat $A = B = C = \\pi/3$ — the whole chain without one derivative taken.', steps: [
      { label: 'The trigonometric identity', formula: '\\sin u + \\sin v = 2\\sin\\!\\left(\\tfrac{u+v}{2}\\right)\\cos\\!\\left(\\tfrac{u-v}{2}\\right)', explanation: 'The sum-to-product identity of the addition-formula family — the trigonometric identities the examination bank actually tests. Cited here as ground the tower already stands on; not re-derived in this book (that family belongs to the trigonometry course).' },
      { label: 'The window discipline', formula: '\\sin u + \\sin v \\leq 2\\sin\\!\\left(\\tfrac{u+v}{2}\\right)', explanation: 'For $u, v \\in (0, \\pi)$: the average $\\tfrac{u+v}{2}$ stays in $(0, \\pi)$, so $\\sin\\bigl(\\tfrac{u+v}{2}\\bigr) > 0$; and $\\bigl|\\tfrac{u-v}{2}\\bigr| < \\tfrac{\\pi}{2}$, so $0 < \\cos\\bigl(\\tfrac{u-v}{2}\\bigr) \\leq 1$ — equality in the cosine factor only at $u = v$. Multiply the positive sine by a cosine at most $1$: the pair bound — MIDPOINT CONCAVITY of the sine arch, certified algebraically.' },
      { label: 'Two rounds of pairing — the four-seat rung, concave direction', formula: '\\sin s_1 + \\sin s_2 + \\sin s_3 + \\sin s_4 \\;\\leq\\; 4\\sin\\!\\left(\\tfrac{s_1+s_2+s_3+s_4}{4}\\right)', explanation: 'The doubling ladder\u2019s four-seat rung run on the cap: pair the four seats, bound each pair by the identity, then bound the pair of pair-averages once more — the inequality signs all face the same way (concave), so the cascade lands as $\\leq 4\\sin(\\text{average})$. All seats and all averages stay inside $(0, \\pi)$ because intervals contain their averages.' },
      { label: 'The padding move', formula: '3\\sin\\!\\left(\\tfrac{\\pi}{3}\\right) \\;\\geq\\; \\sin A + \\sin B + \\sin C', explanation: 'Too few seats for the four-seat rung? Pad: seat the triangle\u2019s average $\\tfrac{A+B+C}{3} = \\tfrac{\\pi}{3}$ as the FOURTH seat. The padded roster\u2019s average is still $\\tfrac{\\pi}{3}$ (copies of the mean move nothing), so the rung reads $\\sin\\tfrac{\\pi}{3} \\geq \\tfrac{\\sin A + \\sin B + \\sin C + \\sin(\\pi/3)}{4}$; multiply by $4$ and the copy\u2019s term crosses over: $3\\sin\\tfrac{\\pi}{3} \\geq \\sin A + \\sin B + \\sin C$.' },
      { label: 'The value and the equality discipline', formula: '3\\sin\\!\\left(\\tfrac{\\pi}{3}\\right) = \\tfrac{3\\sqrt{3}}{2}; \\quad \\text{equality} \\iff A = B = C = \\tfrac{\\pi}{3}', explanation: 'Three seats on the unit arch, each at most $1$, top out at the equilateral read $3 \\cdot \\tfrac{\\sqrt{3}}{2} \\approx 2.598$. Equality forces every round of the chain tight: the cosine factors demand $A = B$ and $C = \\tfrac{\\pi}{3}$, and the second round demands the pair-averages coincide — together, the equilateral $A = B = C = 60^\\circ$. Every other triangle pays a strictly positive tax.' },
    ], result: '$\\sin A + \\sin B + \\sin C \\;\\leq\\; \\tfrac{3\\sqrt{3}}{2}$ $\\qquad$ $(A + B + C = \\pi,\\ \\text{equality iff } A = B = C = 60^\\circ)$' },
    { kind: 'equation', latex: '\\sin A + \\sin B + \\sin C \\;\\leq\\; 3\\sin\\!\\left(\\frac{A+B+C}{3}\\right) = \\frac{3\\sqrt{3}}{2} \\qquad (A+B+C = \\pi) \\tag{7}', note: 'the sine-cap bound over triangles — the concave flip at three seats, cashed from the four-seat rung by padding; equality exactly equilateral.' },
    { kind: 'figure', caption: 'The concave witness made ours: $P(35^\\circ, \\sin 35^\\circ)$, $Q(65^\\circ, \\sin 65^\\circ)$ and $R(80^\\circ, \\sin 80^\\circ)$ sit on the sine cap, their chords drawn as the triangle $PQR$ — every edge below the arc. The centroid $G$, at abscissa the average $60^\\circ$ and height the average of the three sine values $0.822$, falls BELOW the arc: the vertical through it meets the curve at $D$ (height $0.866$) and the axis at $E$, and $DE = 0.866 > GE = 0.822$ — the curve at the average abscissa tops the average of the values. Numbers: $\\sin 35^\\circ + \\sin 65^\\circ + \\sin 80^\\circ = 2.465 < 2.598 = 3\\sin 60^\\circ$, the spread\u2019s tax $0.133$.', svg: sineCapCentroidSvg() },
    { kind: 'example', title: 'Price the pair bound on the arch: verify sin 40° + sin 80° ≤ 2 sin 60° and explain the gap', steps: [
      'The identity: $\\sin 40^\\circ + \\sin 80^\\circ = 2\\sin 60^\\circ \\cos 20^\\circ$ — the sum-to-product certificate at the pair $(40^\\circ, 80^\\circ)$.',
      'The window: both seats in $(0, 180^\\circ)$, so $\\cos 20^\\circ \\leq 1$ with $\\sin 60^\\circ > 0$ — the pair bound follows at once.',
      'The numbers: $\\sin 40^\\circ + \\sin 80^\\circ = 0.6428 + 0.9848 = 1.6276$ against $2\\sin 60^\\circ = 1.7321$ — the gap $0.1045$.',
      'The gap explained: $2\\sin 60^\\circ\\bigl(1 - \\cos 20^\\circ\\bigr) = 1.7321 \\times 0.0603 = 0.1045$ — the whole miss is the cosine factor\u2019s shortfall from $1$, zero only at equal seats.',
      'Hence, $1.6276 \\leq 1.7321$ — the arch\u2019s midpoint concavity priced on one honest pair, strict because the seats differ.',
    ] },
    { kind: 'example', title: 'The witness at our own triangle: price sin 35° + sin 65° + sin 80° against the cap bound and read the centroid', steps: [
      'The triangle\u2019s angles sum to $180^\\circ$; the seats sit on the arch at $35^\\circ, 65^\\circ, 80^\\circ$ with values $0.5736, 0.9063, 0.9848$.',
      'The sum: $\\sin 35^\\circ + \\sin 65^\\circ + \\sin 80^\\circ = 2.4647$; the bound: $3\\sin 60^\\circ = \\tfrac{3\\sqrt{3}}{2} = 2.5981$ — the inequality holds with the tax $0.1334$.',
      'The centroid read: the average height is $\\tfrac{2.4647}{3} = 0.8216$, and the curve at the average abscissa $60^\\circ$ reads $\\sin 60^\\circ = 0.8660$ — the arch rides $0.0445$ above the centroid, exactly the figure\u2019s $DE > GE$.',
      'The padding behind it: the fourth seat $60^\\circ$ IS the roster\u2019s average, so the four-seat rung cashed this three-seat bound — no deferred certificate touched.',
      'Hence, $2.4647 \\leq 2.5981$, strict — the equilateral alone pays no tax, and this spread pays $0.1334$.',
    ] },
    { kind: 'formula', name: 'The sine-cap bound', latex: '\\sin A + \\sin B + \\sin C \\leq 3\\sin\\!\\left(\\frac{A+B+C}{3}\\right) = \\frac{3\\sqrt{3}}{2} \\quad (A+B+C = \\pi)', note: 'concavity of the sine arch on (0, π): the pair certificate sin u + sin v ≤ 2 sin((u+v)/2) (sum-to-product + cos ≤ 1), the four-seat rung, the padding move; equality iff equilateral.' },
    { kind: 'derivation', title: 'The root family\u2019s cap: AM–GM seen early', statement: 'The square-root family is midpoint-concave on $(0, \\infty)$: $\\sqrt{\\tfrac{u+v}{2}} \\geq \\tfrac{\\sqrt{u} + \\sqrt{v}}{2}$ — and the certificate IS lesson 4.1\u2019s arithmetic–geometric mean for two numbers.', steps: [
      { label: 'Square honestly', formula: '\\frac{u+v}{2} \\;\\text{vs}\\; \\frac{\\bigl(\\sqrt{u}+\\sqrt{v}\\bigr)^2}{4} = \\frac{u + v + 2\\sqrt{uv}}{4}', explanation: 'Both sides of the claimed inequality are POSITIVE, and on positives squaring preserves order — so the claim is exactly the comparison of the squares. Lesson 2\u2019s discipline (AA 2.R\u2019s squaring verdict) licenses the move; no sign is hidden.' },
      { label: 'Clear the denominators', formula: '2(u + v) \\geq u + v + 2\\sqrt{uv} \\;\\Longleftrightarrow\\; u + v \\geq 2\\sqrt{uv}', explanation: 'Multiply by $4$ and cancel: the concavity claim for the root family collapses to the two-number AM–GM — the oldest engine of the chapter, standing exactly where the curvature claim needed it.' },
      { label: '4.1\u2019s certificate pays', formula: 'u + v - 2\\sqrt{uv} = \\bigl(\\sqrt{u} - \\sqrt{v}\\bigr)^2 \\geq 0', explanation: 'The completing-the-square certificate of lesson 4.1 — $A_2 - G_2 = \\tfrac{(\\sqrt{u}-\\sqrt{v})^2}{2}$. Every step was reversible on positives, so the chain proves the CONCAVE direction for the root family; equality iff $u = v$.' },
    ], result: '$\\sqrt{\\frac{u+v}{2}} \\;\\geq\\; \\frac{\\sqrt{u}+\\sqrt{v}}{2}$ — equality iff $u = v$ — the two-number AM–GM is the concavity of $\\sqrt{x}$' },
    { kind: 'example', title: 'Price the root family\u2019s cap at (4, 9): compare the root of the average with the average of the roots', steps: [
      'The seats: $\\sqrt{4} = 2$ and $\\sqrt{9} = 3$, so the average of the roots is $\\tfrac{2+3}{2} = 2.5$.',
      'The root of the average: $\\sqrt{\\tfrac{4+9}{2}} = \\sqrt{6.5} \\approx 2.5495$ — the cap\u2019s value at the middle seat.',
      'The comparison: $2.5495 \\geq 2.5$, strict — the gap $0.0495$; the concave direction holds, the graph riding above the chord.',
      'The certificate behind it: $4 + 9 \\geq 2\\sqrt{36}$, i.e. $13 \\geq 12$ — the AM–GM certificate $\\bigl(\\sqrt{4} - \\sqrt{9}\\bigr)^2 = 1 \\geq 0$ in the $u+v$ scale.',
      'Hence, $\\sqrt{6.5} \\approx 2.5495 \\geq 2.5$ — 4.1\u2019s mean inequality reread as the root family\u2019s curvature, with equality only at equal seats.',
    ] },

    { kind: 'heading', text: 'The Engine Family Reunited' },
    { kind: 'para', text: 'Stand the chapter\u2019s engines in one room and a family resemblance shows: several of them were convexity statements all along, each at a different address. Jensen on $x^2$ at equal weights IS the QM–AM rung $M_1 \\leq M_2$ of 4.2\u2019s power-mean ladder — equation (4) is equation (5) at $f(t) = t^2$. The two-number AM–GM of 4.1 IS the root family\u2019s cap, as the last derivation certified. And the next lesson\u2019s engine is already visible here as a convexity statement: the absolute value.' },
    { kind: 'para', text: 'The V of $|x|$ is convex on all of $\\mathbb{R}$: for any seats and any weight, $\\bigl|\\lambda x + (1-\\lambda)y\\bigr| \\leq \\lambda|x| + (1-\\lambda)|y|$. The certificate is the two-sign discipline on the inputs $u = \\lambda x$ and $v = (1-\\lambda)y$ (both weights non-negative): $|u + v|^2 = u^2 + v^2 + 2uv \\leq u^2 + v^2 + 2|uv| = (|u|+|v|)^2$, and both sides non-negative keep the order after the root — with equality exactly when $uv \\geq 0$, the same-sign case. At the midpoint weight this reads $\\bigl|\\tfrac{x+y}{2}\\bigr| \\leq \\tfrac{|x|+|y|}{2}$, that is, $|x+y| \\leq |x| + |y|$ — the TRIANGLE INEQUALITY: the engine lesson 4.6 inherits, named here as a promise. Curvature was hiding under the chapter\u2019s oldest distance bound all along.' },
    { kind: 'example', title: 'Price the V at a mixed pair: for x = −3, y = 5, λ = 1/2 compute the value and the bound, then exhibit an equality case', steps: [
      'The weighted seat: $\\tfrac{-3+5}{2} = 1$, so the value is $|1| = 1$.',
      'The chord height: $\\tfrac{|-3|+|5|}{2} = \\tfrac{3+5}{2} = 4$ — the bound, strict by the gap $3$.',
      'Why strict: the seats sit on opposite arms of the V ($-3 < 0 < 5$), so the certificate\u2019s equality condition $xy \\geq 0$ fails — the chord floats above the vertex\u2019s neighbourhood.',
      'The equality case: at $x = 3, y = 5$ (same arm) the read is $\\bigl|\\tfrac{3+5}{2}\\bigr| = 4 = \\tfrac{3+5}{2}$ — tight, both seats on one arm of the V.',
      'Hence, $1 \\leq 4$ strict at the mixed pair, $4 = 4$ tight at the same-sign pair — the two-sign discipline of the certificate, priced both ways.',
    ] },
    { kind: 'formula', name: 'Convexity of |x| — the triangle seed', latex: '\\bigl|\\lambda x + (1-\\lambda)y\\bigr| \\leq \\lambda|x| + (1-\\lambda)|y|; \\qquad \\bigl|\\tfrac{x+y}{2}\\bigr| \\leq \\tfrac{|x|+|y|}{2} \\iff |x+y| \\leq |x|+|y|', note: 'the V is a cup: two-sign certificate via |u+v|² ≤ (|u|+|v|)², equality iff same signs — the λ = 1/2 line is the triangle inequality 4.6 inherits.' },
    { kind: 'table', caption: 'The engine family in one room — every row a convexity statement at a different address, every bound recomputed by the engines before this prose was written (the last row is the one door this book deliberately leaves shut until chapter 9\u2019s logarithm arrives).', head: ['The classical engine', 'Its convexity reread', 'The witnessed bound'], rows: [
      ['AM–GM, two numbers (4.1)', 'midpoint concavity of $\\sqrt{x}$ on $(0, \\infty)$', '$\\sqrt{6.5} \\approx 2.550 \\geq 2.500$ at $(4, 9)$'],
      ['QM–AM — 4.2\u2019s ladder rung $M_2 \\geq M_1$', 'Jensen on $x^2$, equal weights', '$25 \\leq 29$ at $\\{3, 7\\}$'],
      ['the fixed-sum discipline (4.1, 4.2)', 'the two-point chord at interior $\\lambda$', '$50 + \\tfrac{(a-b)^2}{2}$ at $a+b = 10$: least $50$'],
      ['the triangle inequality (4.6\u2019s promise)', 'convexity of $|x|$', '$1 \\leq 4$ at $(-3, 5, \\lambda = \\tfrac12)$'],
      ['the sine-cap bound', 'Jensen on $\\sin$, the concave flip on $(0, \\pi)$', '$2.465 \\leq 2.598$ at $35^\\circ, 65^\\circ, 80^\\circ$'],
      ['AM–GM, $n$ numbers', 'Jensen on the concave logarithm', 'chapter 9\u2019s promise — named, not cashed'],
    ] },
    { kind: 'para', text: 'One door stays shut, deliberately. When the exponential and logarithmic family is defined in chapter 9 — as inverse machines, the way this tower builds every function family — the logarithm arrives with its own concavity certificate, and the $n$-number AM–GM falls out of Jensen in one line: the average of the logarithms is at most the logarithm of the average, and the family\u2019s monotonicity does the rest. This chapter uses NO logarithm and needs none — the two-number preview above (the root family\u2019s cap) is the honest taste of the door, and the full door is chapter 9\u2019s named promise, recorded here so the reader knows what the curvature engine is FOR: the classical means are one family, and convexity is the head of it.' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations — the honest audit', text: 'The JEE (Main) 2026 unit list carries NO separate inequalities or Jensen unit — the syllabus audit\u2019s honest record. The machinery of this lesson rides the banks the examination does test: mean-inequality items ride the algebra unit\u2019s greatest/least-value bank, and the sine-cap witness rides the trigonometric-identity unit (the sum-to-product family) that the examination tests directly. The exam-style items in this lesson are our own designs — labelled honestly, never lifted from any paper. The staples this engine prices: fixed-sum hunts on square families (least of $a^2+b^2$, of four squares under a fixed sum), the sine-cap bound over triangles with its equilateral equality seat, and the direction discipline (which side of a convex/concave bound a proposed value sits on, and by exactly how much — the gap identity prices the miss).' },
    { kind: 'callout', tone: 'historical', title: 'Jensen 1906: the engineer\u2019s inequality', text: 'Johan Ludvig William Valdemar Jensen (1859–1925) was a Danish mathematician and engineer who never held an academic position: he spent his career at the Copenhagen Telephone Company (from 1881 to 1924, head of the technical department from 1890) and did his mathematics in his spare time. He proved the inequality in 1906, published in Acta Mathematica under the title "Sur les fonctions convexes et les in\u00e9galit\u00e9s entre les valeurs moyennes" — "on convex functions and inequalities between mean values" — for convex functions with no differentiability assumed at all. Otto H\u00f6lder had proved the same inequality in 1889 for twice-differentiable functions; Jensen\u2019s contribution was to strip the calculus out. The name stuck to the general statement — a bound on averages proved by a man who spent his days measuring telephone networks, at a company that never asked him for a theorem.' },
    { kind: 'para', text: 'The tower now carries its fifth engine: curvature itself, priced without one derivative. What waits above, in order: lesson 4.6, "Absolute Value at Depth: the Triangle Inequality", takes the absolute value the foundation book priced as distance and builds the bound machine — the $|f| < g$ verdicts, the detour tax, the reverse triangle — with this lesson\u2019s convexity of $|x|$ as the seed it inherits and the complex triangle inequality of lesson 3.2 as the same law on the plane; the chapter\u2019s completion review walks all six engines into one room with the master table of the classical family. Two debts were named on the way up — the continuity bridge for midpoint convexity, and the every-$n$ induction certificates — both owed to chapters this book will reach, and both recorded so the reader knows exactly what is owed and to whom. Every number this lesson priced — every chord, every gap, every tax — was swept by the engines before a sentence of the prose was written; the curvature engine is installed, and the next one installs the same way.' },

    { kind: 'terms', items: [
      { term: 'Convex function', def: 'a function whose every chord lies on or above its graph on the interval: $f(\\lambda x + (1-\\lambda)y) \\leq \\lambda f(x) + (1-\\lambda)f(y)$ for every $\\lambda \\in [0,1]$ — the cup family ($x^2$, $|x|$).' },
      { term: 'Chord', def: 'the line segment joining two seats $(x, f(x))$ and $(y, f(y))$ of a graph; convexity is exactly the statement that every chord rides on or above the graph between its seats.' },
      { term: 'Midpoint convexity', def: 'the $\\lambda = \\tfrac12$ special case: $f\\bigl(\\tfrac{x+y}{2}\\bigr) \\leq \\tfrac{f(x)+f(y)}{2}$ — necessary for convexity, but equivalent to it only under a continuity bridge this book records as a named debt.' },
      { term: 'Concave function', def: 'a function whose every chord lies on or below its graph — $f(\\lambda x + (1-\\lambda)y) \\geq \\lambda f(x) + (1-\\lambda)f(y)$ — the cap family ($\\sin x$ on $(0, \\pi)$, $\\sqrt{x}$); equivalently, $-f$ is convex.' },
      { term: 'Jensen\u2019s inequality', def: 'the convexity definition cashed as a theorem: for convex $f$, the value at a weighted average never exceeds the weighted average of the values — $f(\\lambda x+(1-\\lambda)y) \\leq \\lambda f(x)+(1-\\lambda)f(y)$ and, equal weights, $f(\\text{average}) \\leq \\text{average of the } f$; concave families reverse both signs.' },
      { term: 'Equality discipline', def: 'the exact conditions under which an inequality is attained — for strict families only at equal seats (or endpoint weights), so a Jensen bound is tight exactly where the spread vanishes: the equilateral for the sine cap, the equal split for fixed-sum square hunts.' },
      { term: 'Doubling ladder', def: 'the pairing discipline that grows the two-seat Jensen certificate to four, eight, every power of two — the same ladder lesson 4.1 built for the two-number means; the every-$n$ certificate rides chapter 7\u2019s induction.' },
      { term: 'Padding discipline', def: 'the move that reaches the ladder\u2019s next power of two by seating copies of the average: the padded roster\u2019s average is unchanged, and the rung rearranges into the bound for the original seats — how a three-seat witness is cashed from the four-seat rung.' },
      { term: 'Centroid', def: 'the average of a triangle\u2019s three vertices — for three seats on a curve, the point whose abscissa is the average abscissa and whose height is the average of the three function values; the concave witness reads: the curve rides above the centroid.' },
      { term: 'The curvature engine', def: 'the chapter\u2019s fifth engine: shape itself as a bound machine — convexity and concavity certificates that price averages, spreads and fixed-sum hunts without computing them and without one derivative taken.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: Jensen\u2019s inequality and convexity', items: [
      { q: 'For the convex function $f(x) = x^2$ at $x = 1$, $y = 5$, $\\lambda = \\tfrac14$: the chord value $\\lambda f(x) + (1-\\lambda) f(y)$ — the bound convexity guarantees — is:', options: ['$16$', '$19$', '$7$', '$25$'], answer: 1, explain: 'The chord height: $\\tfrac14 \\cdot 1 + \\tfrac34 \\cdot 25 = \\tfrac14 + \\tfrac{75}{4} = 19$ (option B) — the guaranteed bound, against which the curve\u2019s own value $f(4) = 16$ sits strictly below. Option A prices the LEFT side — the function at the weighted seat, the value being bounded, not the bound; option C attaches the weights to the wrong partners ($\\tfrac34 \\cdot 1 + \\tfrac14 \\cdot 25 = 7$), the classic weight-swap fraud; option D reports the endpoint value $f(5)$ alone — a chord equals an endpoint only at the degenerate weights $\\lambda = 0$ or $1$.' },
      { q: 'If $f$ is CONCAVE on an interval, the two-point Jensen inequality:', options: ['stays the same — the chord still rides above the graph', 'becomes an equality for every pair of seats', 'reverses — the graph rides above the chord', 'fails unless $f$ is linear'], answer: 2, explain: 'A cap\u2019s chords sink BELOW the graph, so every sign flips: $f(\\lambda x + (1-\\lambda)y) \\geq \\lambda f(x)+(1-\\lambda)f(y)$ (option C). Witness on $-x^2$ at $(1, 5)$, $\\lambda = \\tfrac12$: the graph reads $-9$, the chord $-13$ — the graph ABOVE the chord, and the forward direction would need $-9 \\leq -13$, false. Option A is the cup\u2019s law run on a cap — the direction fraud; option B prices the affine (straight-line) case, where both directions coincide, as if it were the whole truth; option D over-restricts — concave families obey the reversed inequality strictly, with no linearity required.' },
      { q: 'The least number that is at least $\\sin A + \\sin B + \\sin C$ for EVERY triangle $ABC$ is:', options: ['$3$', '$\\dfrac{3\\sqrt{3}}{2}$', '$2$', '$\\sqrt{3}$'], answer: 1, explain: 'The sine-cap witness caps the sum at $3\\sin\\bigl(\\tfrac{A+B+C}{3}\\bigr) = 3\\sin 60^\\circ = \\tfrac{3\\sqrt{3}}{2} \\approx 2.598$ (option B) — and the equilateral ATTAINS it, so nothing smaller can bound every triangle: it is the least such number. Option A ($3$, each sine at most $1$) is an honest but LOOSE cap — the angles sum to $\\pi$, so the three sines cannot all reach $1$ together; option C falls at the equilateral itself ($2.598 > 2$); option D ($\\sqrt{3} \\approx 1.732$) falls even at the right triangle $30^\\circ$–$60^\\circ$–$90^\\circ$, whose sum is $2.366$.' },
      { q: 'For real $x, y$, the difference $\\dfrac{x^2+y^2}{2} - \\left(\\dfrac{x+y}{2}\\right)^2$ equals:', options: ['$\\dfrac{(x-y)^2}{2}$', '$\\dfrac{(x+y)^2}{4}$', '$\\dfrac{(x-y)^2}{4}$', '$\\dfrac{x^2-y^2}{4}$'], answer: 2, explain: 'Completing the square: the difference is $\\tfrac14\\bigl(x^2 - 2xy + y^2\\bigr) = \\tfrac{(x-y)^2}{4}$ (option C) — witness $x = 3, y = 7$: $\\tfrac{9+49}{2} - 25 = 4 = \\tfrac{16}{4}$. Option A doubles the gap (the two-seat variance, not the four-seat); option B prices the SQUARE of the average — the left side\u2019s term, not the difference; option D prices the difference of squares, which is not even always positive — no variance certificate could live there.' },
      { q: 'At $x = -3$, $y = 5$, $\\lambda = \\tfrac12$, the pair (value, bound) $\\left(\\bigl|\\lambda x + (1-\\lambda)y\\bigr|,\\ \\lambda|x| + (1-\\lambda)|y|\\right)$ is:', options: ['$4$ and $1$', '$1$ and $4$', '$1$ and $1$', '$4$ and $4$'], answer: 1, explain: 'The weighted seat is $\\tfrac{-3+5}{2} = 1$, so the value is $1$; the chord height is $\\tfrac{|-3|+|5|}{2} = 4$ — the pair $(1, 4)$, option B, strict because the seats sit on OPPOSITE arms of the V. Option A swaps value and bound — the direction fraud; option C claims equality, which the two-sign certificate reserves for same-sign seats (at $x = 3, y = 5$ the pair IS $(4, 4)$); option D reads the chord\u2019s height as the value — mistaking the bound for the bounded.' },
    ] },

    { kind: 'exercises', title: 'Exercises 4.5', sets: [
      { level: 'L1', questions: [
        { q: 'For $f(x) = x^2$, price the convexity inequality at $x = 2$, $y = 6$, $\\lambda = \\tfrac12$: compute both sides and the gap, and name the certificate.', solution: [
          'The weighted seat at the midpoint weight: $\\tfrac{2+6}{2} = 4$, so the curve reads $f(4) = 16$.',
          'The chord height: $\\tfrac{f(2)+f(6)}{2} = \\tfrac{4+36}{2} = 20$ — the guaranteed bound.',
          'The gap: $20 - 16 = 4$, and the certificate prices it exactly: $\\tfrac{(x-y)^2}{4} = \\tfrac{(2-6)^2}{4} = 4$ — the two-seat variance.',
        ], answer: '$16 \\leq 20$, the gap $4 = \\tfrac{(2-6)^2}{4}$ (the gap identity at $\\lambda = \\tfrac12$)' },
        { q: 'For the roster $\\{3, 7\\}$: compute $\\left(\\tfrac{3+7}{2}\\right)^2$ and $\\tfrac{3^2+7^2}{2}$, verify the rung between them, and name which rung of which ladder it is.', solution: [
          'The average seat: $\\tfrac{3+7}{2} = 5$, so the left side is $5^2 = 25$.',
          'The average of the squares: $\\tfrac{9+49}{2} = 29$ — and $25 \\leq 29$, the rung holds.',
          'The gap: $29 - 25 = 4 = \\tfrac{(3-7)^2}{4}$, the same two-seat variance certificate.',
          'This is Jensen on $x^2$ at equal weights — the QM–AM rung $M_1 \\leq M_2$ of the power-mean ladder lesson 4.2 mounted: $5 \\leq \\sqrt{29}$.',
        ], answer: '$25 \\leq 29$ (gap $4$) — the QM–AM rung of 4.2\u2019s ladder, i.e. Jensen on $x^2$' },
      ] },
      { level: 'L2', questions: [
        { q: 'For the four-seat roster $\\{1, 3, 5, 7\\}$: verify $\\left(\\tfrac{1+3+5+7}{4}\\right)^2 \\leq \\tfrac{1^2+3^2+5^2+7^2}{4}$ and price the gap by the roster\u2019s deviations.', solution: [
          'The roster\u2019s average: $\\tfrac{1+3+5+7}{4} = 4$, so the left side is $16$.',
          'The average of the squares: $\\tfrac{1+9+25+49}{4} = \\tfrac{84}{4} = 21$ — and $16 \\leq 21$, the four-seat rung holds.',
          'The deviations from the average: $-3, -1, 1, 3$ — their squares $9, 1, 1, 9$ sum to $20$, and $\\tfrac{20}{4} = 5$.',
          'And indeed $21 - 16 = 5$: the gap IS the roster\u2019s variance, the spread priced exactly — a four-seat certificate the doubling ladder reaches.',
        ], answer: '$16 \\leq 21$, the gap $5 = \\tfrac{9+1+1+9}{4}$ — the roster\u2019s variance' },
        { q: 'Verify $\\sin 20^\\circ + \\sin 100^\\circ \\leq 2\\sin 60^\\circ$ by the sum-to-product certificate, giving both sides to three decimals and the gap.', solution: [
          'The certificate: $\\sin 20^\\circ + \\sin 100^\\circ = 2\\sin\\bigl(\\tfrac{20^\\circ+100^\\circ}{2}\\bigr)\\cos\\bigl(\\tfrac{100^\\circ-20^\\circ}{2}\\bigr) = 2\\sin 60^\\circ \\cos 40^\\circ$.',
          'The window: both seats lie in $(0, 180^\\circ)$, so $\\sin 60^\\circ > 0$ and $\\cos 40^\\circ \\leq 1$ — the pair bound follows, strict because the seats differ.',
          'The numbers: $\\sin 20^\\circ + \\sin 100^\\circ = 0.342 + 0.985 = 1.327$ against $2\\sin 60^\\circ = 1.732$.',
          'The gap: $1.732 - 1.327 = 0.405$, which the certificate prices as $2\\sin 60^\\circ\\bigl(1 - \\cos 40^\\circ\\bigr) = 1.732 \\times 0.234 = 0.405$.',
        ], answer: '$1.327 \\leq 1.732$, the gap $\\approx 0.405$ (the cosine factor\u2019s shortfall from $1$)' },
      ] },
      { level: 'L3', questions: [
        { q: 'Price $\\bigl|\\lambda x + (1-\\lambda)y\\bigr| \\leq \\lambda|x| + (1-\\lambda)|y|$ at $x = -4$, $y = 6$, $\\lambda = \\tfrac12$, and state exactly when equality holds for the V.', solution: [
          'The weighted seat: $\\tfrac{-4+6}{2} = 1$, so the value is $|1| = 1$.',
          'The chord height: $\\tfrac{|-4|+|6|}{2} = \\tfrac{4+6}{2} = 5$ — and $1 \\leq 5$, strict by the gap $4$.',
          'Why strict: the seats sit on opposite arms of the V ($-4 < 0 < 6$), so the product $xy < 0$ — the certificate\u2019s equality condition $uv \\geq 0$ fails at these inputs.',
          'Equality for the V holds exactly when the seats share an arm ($xy \\geq 0$, a zero seat included), or the weight degenerates to an end ($\\lambda \\in \\{0,1\\}$).',
        ], answer: '$1 \\leq 5$ strict; equality iff $xy \\geq 0$ (or $\\lambda \\in \\{0, 1\\}$) — the two-sign discipline' },
        { q: 'For real $a, b$ with $a - b = 6$: find the least value of $a^2 + b^2$, and say where it is attained.', solution: [
          'Name the average seat: $\\mu = \\tfrac{a+b}{2}$; since $a - b = 6$, the seats are $\\mu + 3$ and $\\mu - 3$ — the spread is fixed, the average is free.',
          'The decomposition (the two-seat identity read backwards): $a^2 + b^2 = 2\\mu^2 + \\tfrac{(a-b)^2}{2} = 2\\mu^2 + 18$.',
          'So $a^2 + b^2 \\geq 18$, with equality exactly at $\\mu = 0$ — that is, at $a = 3, b = -3$.',
          'Check the seat: $3^2 + (-3)^2 = 18$; and any other average pays strictly more (at $\\mu = 1$: $a = 4, b = -2$, sum of squares $20$).',
        ], answer: 'the least value is $18$, attained at $a = 3, b = -3$ (the average seat $\\mu = 0$)' },
        { q: 'Price $\\sin 45^\\circ + \\sin 45^\\circ + \\sin 90^\\circ$ against the sine-cap bound and give the exact gap.', solution: [
          'The seats sum to $180^\\circ$, so the cap bound applies: $\\sin 45^\\circ + \\sin 45^\\circ + \\sin 90^\\circ \\leq 3\\sin 60^\\circ$.',
          'The left side: $\\tfrac{\\sqrt{2}}{2} + \\tfrac{\\sqrt{2}}{2} + 1 = \\sqrt{2} + 1 \\approx 2.414$.',
          'The bound: $3\\sin 60^\\circ = \\tfrac{3\\sqrt{3}}{2} \\approx 2.598$ — and $2.414 \\leq 2.598$, strict (the seats are not equilateral).',
          'The exact gap: $\\tfrac{3\\sqrt{3}}{2} - \\sqrt{2} - 1 \\approx 0.184$ — the isosceles right triangle\u2019s tax for spreading around the $60^\\circ$ middle.',
        ], answer: '$\\sqrt{2} + 1 \\approx 2.414 \\leq \\tfrac{3\\sqrt{3}}{2}$; the exact gap $\\tfrac{3\\sqrt{3}}{2} - \\sqrt{2} - 1 \\approx 0.184$' },
      ] },
      { level: 'L4', questions: [
        { q: '(exam-style, Single Correct) The greatest value of $\\sin A + \\sin B + \\sin C$ over all triangles $ABC$ is: (A) $2$ (B) $\\tfrac{9}{4}$ (C) $\\tfrac{3\\sqrt{3}}{2}$ (D) $3$', solution: [
          'The seats: $A, B, C \\in (0, \\pi)$ with $A + B + C = \\pi$ — the sine-cap witness\u2019s exact window.',
          'The witness: $\\sin A + \\sin B + \\sin C \\leq 3\\sin\\bigl(\\tfrac{A+B+C}{3}\\bigr) = 3\\sin 60^\\circ = \\tfrac{3\\sqrt{3}}{2} \\approx 2.598$ — option (C).',
          'The bound is ATTAINED at the equilateral $A = B = C = 60^\\circ$, so it is the greatest VALUE, not merely a cap: $3 \\cdot \\tfrac{\\sqrt{3}}{2}$ exactly.',
          'Why the rivals fail: (A) $2$ falls at the equilateral ($2.598 > 2$); (B) $\\tfrac{9}{4} = 2.25$ falls there too; (D) $3$ is an honest cap (each sine $\\leq 1$) but is never attained — the angles sum to $\\pi$, so the three sines cannot peak together.',
        ], answer: '(C) $\\dfrac{3\\sqrt{3}}{2}$, attained exactly at the equilateral triangle' },
        { q: '(exam-style, Single Correct) For real $x, y$ with $x + y = 4$, the least value of $x^2 + y^2$ is: (A) $2$ (B) $4$ (C) $8$ (D) $16$', solution: [
          'The fixed sum names the average: $\\tfrac{x+y}{2} = 2$ — the seat where the equal-split hunt always lands.',
          'Jensen on the cup at equal weights: $\\bigl(\\tfrac{x+y}{2}\\bigr)^2 \\leq \\tfrac{x^2+y^2}{2}$, so $x^2 + y^2 \\geq 2 \\cdot 2^2 = 8$.',
          'The decomposition prices the miss: $x^2 + y^2 = 8 + \\tfrac{(x-y)^2}{2}$, zero surcharge exactly at $x = y = 2$ — so $8$ is attained, and it is the least value.',
          'Why the rivals fail: (A) $2$ prices $\\tfrac{(x+y)^2}{8}$ — a phantom half of the certificate; (B) $4$ is the average\u2019s square $2^2$ — the LEFT side of the rung, not the sum; (D) $16$ is the endpoint seat $(4, 0)$: $16 + 0$, one spread extreme, not the least.',
        ], answer: '(C) $8$, attained at $x = y = 2$ — the equal split' },
        { q: '(exam-style, Numerical Value) For the roster $\\{2, 2, 10, 10\\}$, report the gap $\\tfrac{2^2+2^2+10^2+10^2}{4} - \\left(\\tfrac{2+2+10+10}{4}\\right)^2$ (an integer).', solution: [
          'The roster\u2019s average: $\\tfrac{2+2+10+10}{4} = 6$, so the right side is $36$.',
          'The average of the squares: $\\tfrac{4+4+100+100}{4} = \\tfrac{208}{4} = 52$.',
          'The gap: $52 - 36 = 16$ — and the deviations price it: $-4, -4, 4, 4$, whose squares $16, 16, 16, 16$ average to $16$.',
          'Check by the identity: the gap is the roster\u2019s variance $\\tfrac{1}{4}\\sum(x_i - \\mu)^2 = 16$ — exact.',
        ], answer: '$16$' },
      ] },
      { level: 'L5', questions: [
        { q: 'The cosine window bound: (a) prove $\\cos u + \\cos v \\leq 2\\cos\\bigl(\\tfrac{u+v}{2}\\bigr)$ for $u, v \\in \\bigl(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\bigr)$; (b) deduce $\\cos u + \\cos v + \\cos w \\leq 3$ whenever $u + v + w = 0$ with all three seats in the window; (c) price part (b) at $u = 30^\\circ, v = -10^\\circ, w = -20^\\circ$.', solution: [
          'Part (a), the certificate: $\\cos u + \\cos v = 2\\cos\\bigl(\\tfrac{u+v}{2}\\bigr)\\cos\\bigl(\\tfrac{u-v}{2}\\bigr)$ by the sum-to-product identity.',
          'The window: $\\bigl|\\tfrac{u-v}{2}\\bigr| < \\tfrac{\\pi}{2}$ gives $\\cos\\bigl(\\tfrac{u-v}{2}\\bigr) \\leq 1$, and $\\tfrac{u+v}{2} \\in \\bigl(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\bigr)$ gives $\\cos\\bigl(\\tfrac{u+v}{2}\\bigr) > 0$ — multiplying by a positive factor at most $1$ keeps the bound: $\\cos u + \\cos v \\leq 2\\cos\\bigl(\\tfrac{u+v}{2}\\bigr)$, strict for distinct seats.',
          'Part (b), the padding: with $u+v+w = 0$, seat the roster\u2019s average $0$ as the FOURTH seat — the padded roster $\\{u, v, w, 0\\}$ still averages to $0$.',
          'The four-seat rung (concave direction — part (a) is the pair certificate): $\\cos 0 \\geq \\tfrac{\\cos u + \\cos v + \\cos w + \\cos 0}{4}$, so $1 \\geq \\tfrac{\\text{sum} + 1}{4}$ and the sum $\\leq 3$.',
          'Part (c), the price: $\\cos 30^\\circ + \\cos(-10^\\circ) + \\cos(-20^\\circ) = 0.866 + 0.985 + 0.940 = 2.791 \\leq 3$, the gap $0.209$ — and equality would force $u = v = w = 0$, the only seat where nothing is spread.',
        ], answer: '(a) the pair certificate above; (b) $\\cos u + \\cos v + \\cos w \\leq 3$ (padding to four seats, equality only at $u = v = w = 0$); (c) $2.791 \\leq 3$' },
        { q: '(exam-style, Linked Comprehension — two linked parts) Paragraph: the convexity certificate for $x^2$ is the gap identity $\\lambda x^2 + (1-\\lambda)y^2 - \\bigl(\\lambda x + (1-\\lambda)y\\bigr)^2 = \\lambda(1-\\lambda)(x-y)^2$. (a) Prove the identity by expansion. (b) Price the bound at $x = 1, y = 5$ for BOTH weights $\\lambda = \\tfrac14$ and $\\lambda = \\tfrac34$, and note what the two gaps share.', solution: [
          'Part (a), the expansion: $\\bigl(\\lambda x + (1-\\lambda)y\\bigr)^2 = \\lambda^2 x^2 + 2\\lambda(1-\\lambda)xy + (1-\\lambda)^2 y^2$ — a binomial square, nothing else.',
          'Subtract: the $x^2$ coefficient becomes $\\lambda - \\lambda^2 = \\lambda(1-\\lambda)$, the $y^2$ coefficient $(1-\\lambda) - (1-\\lambda)^2 = \\lambda(1-\\lambda)$, the cross term $-2\\lambda(1-\\lambda)xy$ — one common factor throughout.',
          'Factor: $\\lambda(1-\\lambda)(x^2 - 2xy + y^2) = \\lambda(1-\\lambda)(x-y)^2 \\geq 0$ — the completed square, and the certificate is proved.',
          'Part (b), the first weight: at $\\lambda = \\tfrac14$ the seat is $\\tfrac14 + \\tfrac{15}{4} = 4$, the curve reads $16$, the chord $\\tfrac14 + \\tfrac{75}{4} = 19$ — the gap $3$.',
          'The second weight: at $\\lambda = \\tfrac34$ the seat is $2$, the curve reads $4$, the chord $\\tfrac34 + \\tfrac{25}{4} = 7$ — the gap $3$ again: $\\lambda(1-\\lambda)$ is $\\tfrac{3}{16}$ at both mirror weights, so the gap is WEIGHT-SYMMETRIC — the tax depends on the spread, not on which seat holds the larger share.',
        ], answer: '(a) the identity above; (b) $16 \\leq 19$ and $4 \\leq 7$ — both gaps $3$ (weight-symmetric, the spread $(1-5)^2 = 16$ times $\\tfrac{3}{16}$)' },
        { q: '(exam-style, Multiple Correct) For a triangle $ABC$, which of the following statements are ALWAYS true? (i) $\\sin A + \\sin B + \\sin C \\leq \\tfrac{3\\sqrt{3}}{2}$; (ii) equality in (i) forces the equilateral triangle; (iii) $\\sin A + \\sin B + \\sin C \\leq 3$; (iv) $\\sin A + \\sin B + \\sin C \\geq 2$.', solution: [
          'Statement (i): TRUE — the sine-cap witness of the lesson, cashed from the four-seat rung by padding: $\\sin A + \\sin B + \\sin C \\leq 3\\sin\\bigl(\\tfrac{A+B+C}{3}\\bigr) = \\tfrac{3\\sqrt{3}}{2}$.',
          'Statement (ii): TRUE — the equality discipline: every round of the chain must be tight, and the cosine factors demand equal seats at every pairing, forcing $A = B = C = 60^\\circ$; any other triangle pays a strictly positive tax (the $35^\\circ$–$65^\\circ$–$80^\\circ$ witness paid $0.133$).',
          'Statement (iii): TRUE — each sine is at most $1$, so the sum is at most $3$; an honest but loose cap, never attained (the angles sum to $\\pi$).',
          'Statement (iv): FALSE — a flat triangle prices it down: $A = B = 10^\\circ, C = 160^\\circ$ gives $\\sin 10^\\circ + \\sin 10^\\circ + \\sin 160^\\circ = 0.174 + 0.174 + 0.342 = 0.689 < 2$.',
          'Hence, (i), (ii) and (iii) are always true; (iv) fails on the flat family.',
        ], answer: '(i), (ii) and (iii) are always true; (iv) is false (the flat triangle $10^\\circ$–$10^\\circ$–$160^\\circ$ reads $0.689$)' },
      ] },
      { level: 'L6', questions: [
        { q: 'Run the doubling ladder at eight seats: prove $\\sin x_1 + \\cdots + \\sin x_8 \\leq 8\\sin\\bigl(\\tfrac{x_1+\\cdots+x_8}{8}\\bigr)$ for any eight seats in $(0, \\pi)$ by three rounds of midpoint pairing, and price it on the roster $\\{20^\\circ, 30^\\circ, 40^\\circ, 50^\\circ, 60^\\circ, 70^\\circ, 80^\\circ, 90^\\circ\\}$.', solution: [
          'Round one, four pairs: $\\sin x_1 + \\sin x_2 \\leq 2\\sin\\bigl(\\tfrac{x_1+x_2}{2}\\bigr)$ for each pair — the sum-to-product certificate, valid because every seat and every pair-average stays in $(0, \\pi)$.',
          'Round two, two pairs: apply the pair certificate to the four pair-averages themselves — the running bound becomes $4\\sin\\bigl(\\tfrac{x_1+x_2+x_3+x_4}{4}\\bigr) + 4\\sin\\bigl(\\tfrac{x_5+\\cdots+x_8}{4}\\bigr)$ arranged as two pair-terms.',
          'Round three, one pair: pair the two four-seat averages once more — the bound lands at $8\\sin\\bigl(\\tfrac{x_1+\\cdots+x_8}{8}\\bigr)$, every round nothing but the pair certificate (the ladder\u2019s third rung, concave direction).',
          'The roster\u2019s price: the eight sines sum to $0.342 + 0.500 + 0.643 + 0.766 + 0.866 + 0.940 + 0.985 + 1.000 = 6.041$.',
          'The bound: the roster\u2019s average abscissa is $55^\\circ$, and $8\\sin 55^\\circ = 8 \\times 0.819 = 6.553 \\geq 6.041$ — the gap $0.512$, the spread\u2019s tax.',
        ], answer: 'the three-round ladder above; the roster: $6.041 \\leq 6.553$ (the gap $\\approx 0.512$)' },
        { q: 'The variance identity at four seats: prove $\\tfrac{x_1^2+x_2^2+x_3^2+x_4^2}{4} - \\left(\\tfrac{x_1+x_2+x_3+x_4}{4}\\right)^2 = \\tfrac{1}{4}\\sum_{i=1}^{4}(x_i - \\mu)^2$ (with $\\mu$ the roster\u2019s average), price it on $\\{1, 3, 5, 7\\}$, and name the ladder rung it certifies and the certificate this book defers to chapter 7.', solution: [
          'Name the average: $\\mu = \\tfrac{x_1+x_2+x_3+x_4}{4}$; expand the deviations: $\\sum(x_i - \\mu)^2 = \\sum x_i^2 - 2\\mu\\sum x_i + 4\\mu^2$.',
          'Since $\\sum x_i = 4\\mu$: the middle term is $-8\\mu^2$ and the last $+4\\mu^2$, so $\\sum(x_i - \\mu)^2 = \\sum x_i^2 - 4\\mu^2$.',
          'Divide by $4$: $\\tfrac{1}{4}\\sum(x_i-\\mu)^2 = \\tfrac{\\sum x_i^2}{4} - \\mu^2$ — the variance identity, proved for four seats by expansion alone.',
          'The roster: $\\mu = 4$, the deviations $-3, -1, 1, 3$, their squares $9, 1, 1, 9$ — the gap $\\tfrac{20}{4} = 5$, and indeed $21 - 16 = 5$.',
          'The reading: the identity certifies the four-seat Jensen rung for $x^2$ — $M_2^2 - M_1^2$ is the variance, so $M_2 \\geq M_1$, the QM–AM rung of 4.2\u2019s ladder at four seats; the EVERY-$n$ certificate (and the full ladder\u2019s monotonicity beyond the doubling reach) rides chapter 7\u2019s induction — the standing debt this book names rather than cashes.',
        ], answer: 'the identity as proved; the roster\u2019s gap $5$; the rung $M_1 \\leq M_2$ of 4.2\u2019s ladder at four seats, with every-$n$ deferred to chapter 7\u2019s induction' },
      ] },
    ] },
  ],
}



/** 4.6 — run record: authored 2026-11-18 by the parallel swarm (owner chat
 *  directive “launch multiple agents for authoring lessons”; Task 4-f).
 *  Engine sections K/L grown green WITH the prose (bun run
 *  scripts/aa-ch04-work/run-46.ts): K sweeps the triangle inequality over
 *  integer pairs with the equality case witnessed exactly, pins the
 *  squaring proof’s algebra on grids, sweeps the reverse form and the
 *  detour tax over triples, the Cauchy–Schwarz bridge over integer lists,
 *  recomputes every verdict Illustration over its full solution interval
 *  by sampling, and recomputes every quiz key and exercise answer. Quiz
 *  keys [0, 2, 3, 3, 1]; 15 exercises L1–L6 = 2/2/3/3/3/2 with
 *  steps-array solutions; 2 figures (the same-direction/opposite-direction
 *  plate, the detour-tax plate — vivid palette only); 5 derivations,
 *  5 formula cards, 9 Illustrations, 2 tables, 9 terms; honest word count
 *  ≥ 4,500 by countLessonWords. Ground: FM 7.4 (distance), AL 7.1–7.3
 *  (order + the compound engine), 4.1/4.2 (the means ladder), 4.3
 *  (Cauchy–Schwarz), 3.2 (the complex triangle inequality) — cited, never
 *  re-taught; NO m2-06 module section covers absolute value (recorded
 *  honestly in AA_CH04_MASTER_PLAN.md §1) — the canon statements
 *  web-checked this run (OpenStax College Algebra 2e §2.7 for the verdict
 *  discipline; Euclid Elements I.20 for the historical callout). */
 const lesson46: Lesson = {
  id: 'aa-absolute-value-at-depth-the-triangle-inequality',
  number: '4.6',
  title: 'Absolute Value at Depth: the Triangle Inequality',
  concepts: [
    'absolute-value inequality verdicts',
    'the |f| < g and |f| > g case-split',
    'triangle inequality',
    'equality case ab ≥ 0',
    'reverse triangle inequality',
    'detour tax',
    'the Cauchy–Schwarz bridge',
    'bound machines at exam speed',
  ],
  objectives: [
    'Convert any |f| < g or |f| > g claim into its honest verdict — the between-form intersection or the two-ray union — riding AL 7.3’s compound engine, with the weak variants and the degenerate seats g ≤ 0 (never, everything, everything-except-zero) pinned exactly.',
    'Prove the triangle inequality |a + b| ≤ |a| + |b| by squaring, with the non-negativity note that makes the squaring lawful, and read the equality case ab ≥ 0 as “same direction on the line”.',
    'Derive and use the reverse form ||a| − |b|| ≤ |a − b| (the forward law applied twice) and the detour tax |x − a| + |x − b| ≥ |a − b|, whose equality case is exactly the segment between a and b.',
    'Cash the connection lesson 4.3 named forward: Cauchy–Schwarz on the magnitude list against the all-ones list pays the bridge (Σ|xᵢ|)² ≤ n·Σxᵢ², with equality exactly on equal-magnitude lists.',
    'Run the bound machines at examination speed: band reads on fixed sizes, minimum hunts on sums of arms, |f| ≥ |h| squaring items, and the approximation reads the reverse law serves.',
    'Place the real-line law inside its family: the generalized n-term statement, the complex triangle inequality of lesson 3.2 (the same law on the Argand plane), and Euclid’s Proposition I.20 as the geometry the name rides from.',
  ],
  prerequisites: [
    'fm-absolute-value-as-distance',
    'al-compound-inequalities-and-applications',
    'aa-the-arithmetic-geometric-mean-inequality',
  ],
  sources: [
    'openstax-college-algebra',
    'ncert-math11-ch5-linear-inequalities',
    'cengage-jee-style',
    'khattar-qa-4e',
    'jee-main-2026-syllabus',
  ],
  blocks: [
    { kind: 'para', text: 'Foundation Mathematics 7.4 priced $|x|$ as a distance — the count of steps from the chosen zero, direction discarded — and gave the bars their two-line rule. Elementary Algebra then taught the line to obey order: 7.1 the addition and scaling laws with their flips, 7.3 the compound engine that settles “between” claims as intersections and “or” claims as unions. This chapter has priced everything else in sight: lesson 4.1 the arithmetic mean against the geometric, 4.2 the weighted engine and the power-mean ladder, 4.3 the dot product, 4.4 the sorted pairing, 4.5 the curved shape. One quantity has waited through all five engines, quietly present whenever a bound wore bars: the distance itself. The chapter closes by pricing it — and the law that prices it is the one inequality every later book of mathematics reaches for first: a detour cannot beat the direct route.' },
    { kind: 'para', text: 'The route, in the chapter’s manner. First the VERDICT DISCIPLINE: every claim $|f| < g$ or $|f| > g$ converts into an honest compound or union — Elementary Algebra 7.3’s engine, cited and never re-taught — with the degenerate seats $g \\leq 0$ pinned exactly: the trichotomy of never, everything and everything-except-zero, swept by this lesson’s engines before a sentence of prose was written. Then the namesake: the triangle inequality $|a + b| \\leq |a| + |b|$, PROVED by squaring, with the honesty note that makes the squaring lawful — squaring an inequality is not generally an order-preserving move, and the proof lives entirely in the region where it is. Then the reverse form $\\big||a| - |b|\\big| \\leq |a - b|$ and the DETOUR TAX $|x - a| + |x - b| \\geq |a - b|$ — FM 7.4’s distance engine reread as a bound machine. Then the promise lesson 4.3 named forward is cashed: Cauchy–Schwarz on the magnitude list against the all-ones list pays the bridge $\\left(\\Sigma|x_i|\\right)^2 \\leq n\\,\\Sigma x_i^2$. And lesson 3.2’s complex triangle inequality stands cross-referenced at the close: the same law, one dimension up, on the Argand plane.' },

    { kind: 'heading', text: 'The Verdict Discipline: |f| < g and |f| > g' },
    { kind: 'para', text: 'The ground, recalled — cited, not re-taught. FM 7.4: $|x|$ is the distance of $x$ from $0$, never negative, computed by the two-line rule ($x$ itself on the right of zero, $-x$ on the left). AL 7.1: order on the line obeys the addition law and the scaling laws, and a strike by a negative flips the sign. AL 7.3: “between” claims are intersections — the AND of two conditions keeps only the seats both keep — and “or” claims are unions. An absolute-value inequality is a distance claim wearing bars; converting it into order claims that AL’s engine already owns is the whole craft, and the conversion deserves the status of a theorem rather than a reflex, because it fails honestly at the degenerate seats — which is where examinations set their traps.' },
    { kind: 'callout', tone: 'definition', title: 'Absolute-value inequality, and its verdict', text: 'An ABSOLUTE-VALUE INEQUALITY is a claim comparing the size of a real expression $f$ against a bound $g$: $|f| < g$, $|f| > g$, or the weak variants $|f| \\leq g$ and $|f| \\geq g$. For $g > 0$, its VERDICT is the pair of order claims that says the same thing without bars: $-g < f < g$ for the “less than” case, and $f < -g$ or $f > g$ for the “greater than” case. Thus, $|2x - 1| < 7$ is an absolute-value inequality whose verdict is the between-form $-7 < 2x - 1 < 7$, and $|x - 5| > 3$ has the union verdict $x < 2$ or $x > 8$.' },
    { kind: 'para', text: 'For example, on the discipline’s opening roster:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $|2x - 1| < 7$: $g = 7 > 0$, so the verdict is the between-form $-7 < 2x - 1 < 7$ — an intersection;',
      '(ii) $|x - 5| > 3$: $g = 3 > 0$, so the verdict is the union $x - 5 < -3$ or $x - 5 > 3$, that is $x < 2$ or $x > 8$;',
      '(iii) $|x - 5| \\leq 7$ and $|x - 5| \\geq 7$: the weak variants ride the same route with the boundary seats $x = -2$ and $x = 12$ included;',
      '(iv) $|x| \\geq 0$: not a verdict claim at all — the definition’s own demand, true for every $x$ without a conversion.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The verdict pair (g > 0)', text: 'For a real expression $f$ and a POSITIVE bound $g > 0$: (i) $|f| < g$ holds exactly where $-g < f < g$ holds — a BETWEEN claim, the intersection of $f > -g$ with $f < g$; (ii) $|f| > g$ holds exactly where $f < -g$ or $f > g$ — an OUTSIDE claim, the union of two rays. The weak variants carry the boundary: $|f| \\leq g \\iff -g \\leq f \\leq g$ and $|f| \\geq g \\iff f \\leq -g$ or $f \\geq g$. Every claim is equivalent to its verdict — the same solution set, no more and no fewer seats.' },
    { kind: 'derivation', title: 'The verdict pair, derived from the two-line rule', statement: 'For a real expression $f$ and $g > 0$: $|f| < g \\iff -g < f < g$, and $|f| > g \\iff f < -g$ or $f > g$.', steps: [
      { label: 'Case f ≥ 0', formula: '|f| = f \\implies |f| < g \\iff f < g', explanation: 'The two-line rule of FM 7.4: on the right of zero the bars pass the number through untouched. In this case $f \\geq 0 > -g$ as well, so the case contributes exactly the right arm of the between-form.' },
      { label: 'Case f < 0', formula: '|f| = -f \\implies |f| < g \\iff f > -g', explanation: 'On the left of zero the bars return the opposite. Here $f < 0 < g$, so the case contributes exactly the left arm — and neither arm is ever lost.' },
      { label: 'Assemble the intersection', formula: '|f| < g \\iff -g < f < g', explanation: 'The two cases tile the line between them, each landing inside exactly one arm: $|f| < g$ holds exactly where BOTH $f > -g$ and $f < g$ hold — the AND discipline of AL 7.3, reached through the piecewise rule instead of a picture.' },
      { label: 'The outside claim, the same way', formula: '|f| > g \\iff f < -g \\ \\text{or}\\ f > g', explanation: 'Case $f \\geq 0$: $|f| = f > g$. Case $f < 0$: $-f > g$, that is $f < -g$. The cases contribute the two rays of the union — the OR discipline of AL 7.3.' },
    ], result: '$|f| < g \\iff -g < f < g \\quad \\text{(intersection)},$ $\\qquad$ $|f| > g \\iff f < -g \\ \\text{or}\\ f > g \\quad \\text{(union)}$' },
    { kind: 'equation', latex: '\\text{for } g > 0: \\qquad |f| < g \\;\\iff\\; -g < f < g \\tag{1}', note: 'the between verdict — an intersection: the distance reading says $f$ sits within $g$ steps of $0$, which is the band $(-g, g)$ and nothing else.' },
    { kind: 'equation', latex: '\\text{for } g > 0: \\qquad |f| > g \\;\\iff\\; f < -g \\ \\text{or}\\ f > g \\tag{2}', note: 'the outside verdict — a union: $f$ sits strictly beyond the closed band $[-g, g]$, which is the two rays outside it.' },
    { kind: 'formula', name: 'The verdict pair (g > 0)', latex: '|f| < g \\iff -g < f < g \\ \\text{ (between: intersection)}, \\quad |f| > g \\iff f < -g \\text{ or } f > g \\ \\text{ (outside: union)}', note: 'AL 7.3’s engine wearing bars: “less than” converts to AND, “greater than” to OR; the weak variants include the boundary seats; the g ≤ 0 seats are degenerate — priced in the table below.' },
    { kind: 'para', text: 'One caution before the craft, because it is the caution AL 7.1 priced for order and this lesson prices for bars: the discipline DEMANDS $g > 0$. The theorem’s proof used $g > 0$ twice — to seat $0 < g$ above the left case and to give the between-form a non-empty meaning. When $g \\leq 0$ the verdict pair must not be run on reflex; the degenerate seats answer honestly by size alone, and they answer differently for the two directions of the inequality.' },
    { kind: 'callout', tone: 'warn', title: 'The degenerate seats g ≤ 0 — run nothing, read sizes', text: 'A distance is never negative — $|f| \\geq 0$ always — so against a bound $g \\leq 0$: (i) $|f| < g$ is NEVER true: $|f| \\geq 0 \\geq g$ leaves no room to sit strictly below; (ii) $|f| > g$ with $g < 0$ is true EVERYWHERE: $|f| \\geq 0 > g$ at every seat; (iii) $|f| > g$ with $g = 0$ is true everywhere EXCEPT where $f = 0$: $|f| > 0$ exactly off the zeros of $f$. The classic fraud runs the $g > 0$ union discipline on a negative bound — $|x - 5| > -3$ has no rays, no boundary and no work: every real $x$ solves it.' },
    { kind: 'table', caption: 'The degenerate verdicts ($g \\leq 0$), priced by size alone — every cell recomputed by sweeping the lesson’s engines over the grids before this prose was written.', head: ['The claim', 'g > 0 (the discipline)', 'g = 0', 'g < 0'], rows: [
      ['$|f| < g$', 'the between-form $-g < f < g$', 'never — $|f| \\geq 0$', 'never — $|f| \\geq 0$'],
      ['$|f| > g$', 'the union $f < -g$ or $f > g$', 'all $x$ with $f \\neq 0$', 'all $x$ — $|f| \\geq 0 > g$'],
      ['$|f| \\leq g$', 'the closed between-form $-g \\leq f \\leq g$', 'exactly the seats with $f = 0$', 'never'],
      ['$|f| \\geq g$', 'the closed union $f \\leq -g$ or $f \\geq g$', 'all $x$', 'all $x$'],
    ] },
    { kind: 'example', title: 'Solve |2x − 1| < 7, state the verdict type, and read the band as a distance claim', steps: [
      'The verdict discipline: $g = 7 > 0$ and the direction is “less than”, so the claim is the between-form $-7 < 2x - 1 < 7$ — an intersection.',
      'Add $1$ across the compound (the addition law, safe on both members): $-6 < 2x < 8$.',
      'Halve — a strike by the positive $2$, no flip: $-3 < x < 4$.',
      'Check the boundary, AL 7.1’s three-point discipline: at $x = -3$, $|2(-3) - 1| = 7$, not strictly less — the ends stay out; at $x = 0$ (inside), $|-1| = 1 < 7$; at $x = 5$ (outside), $|9| = 9$ — out.',
      'As distance: $|2x - 1| = 2\\left|x - \\tfrac12\\right|$, so the claim reads “$x$ within $\\tfrac72$ of $\\tfrac12$” — the same band, centred.',
      'Hence the solution set is the open interval $(-3,\\ 4)$.',
    ] },
    { kind: 'example', title: 'Solve |x − 5| > −3; then solve |x − 4| > 0; then attempt |x² + 1| < 1', steps: [
      'First claim: the bound is $g = -3 < 0$ and the direction is “greater than” — the degenerate seat. Since $|x - 5| \\geq 0 > -3$ at every seat, every real $x$ solves it.',
      'So the verdict is ALL REALS — no rays, no boundary, no work; running the union discipline here would manufacture the fraud $x < 2$ or $x > 8$ out of a bound that never demanded it.',
      'Second claim: $g = 0$ — $|x - 4| > 0$ fails exactly where the inside dies, at $x = 4$, and holds everywhere else: the verdict is all reals except $4$.',
      'Third claim: $g = 1 > 0$, so the discipline is lawful — $-1 < x^2 + 1 < 1$ — and it dies honestly: the right arm demands $x^2 < 0$, impossible.',
      'Hence: all reals; all reals except $4$; and the empty set — the three degenerate verdicts the table prices, two of them without ever running a conversion.',
    ] },
    { kind: 'example', title: 'Solve |x² − 4x| < 5 — a quadratic inside the bars', steps: [
      'The discipline: $g = 5 > 0$, direction “less than” — the between-form $-5 < x^2 - 4x < 5$, an intersection of two quadratic claims.',
      'Right arm: $x^2 - 4x - 5 < 0$, that is $(x - 5)(x + 1) < 0$ — true between the doors: $-1 < x < 5$ (the sign-diagram discipline of AA 2.2, cited not re-taught).',
      'Left arm: $x^2 - 4x + 5 > 0$ — discriminant $16 - 20 = -4 < 0$ with the parabola opening upward, so it is positive everywhere and this arm never bites (the always-sign law of AA 2.1).',
      'Intersect: the left arm is the whole line, so the verdict is the right arm alone — $-1 < x < 5$.',
      'Check: $x = 0$ gives $|0| = 0 < 5$; $x = 3$ (inside) gives $|9 - 12| = 3 < 5$; $x = 6$ (outside) gives $|36 - 24| = 12$, out; the boundary seats $x = -1$ and $x = 5$ each give $|5| = 5$, not strictly less.',
      'Hence the solution set is $(-1,\\ 5)$ — the quadratic hunt converts to a band hunt, and the discriminant pruned one arm to nothing.',
    ] },
    { kind: 'example', title: 'Solve |(3x + 2)/(x − 2)| ≤ 4 — a rational inside the bars', steps: [
      'The discipline: $g = 4 > 0$, weak direction — the closed between-form $-4 \\leq \\dfrac{3x + 2}{x - 2} \\leq 4$ with $x \\neq 2$, an intersection of two rational claims.',
      'Right arm: $\\dfrac{3x + 2}{x - 2} \\leq 4 \\iff \\dfrac{-x + 10}{x - 2} \\leq 0 \\iff \\dfrac{x - 10}{x - 2} \\geq 0$ (one flip for the sign) — true on $x < 2$ or $x \\geq 10$ (zero at $10$, pole at $2$).',
      'Left arm: $\\dfrac{3x + 2}{x - 2} \\geq -4 \\iff \\dfrac{7x - 6}{x - 2} \\geq 0$ — true on $x \\leq \\tfrac67$ or $x > 2$.',
      'Intersect, ray by ray: $(x < 2 \\text{ or } x \\geq 10) \\cap (x \\leq \\tfrac67 \\text{ or } x > 2) = x \\leq \\tfrac67$ or $x \\geq 10$ — the two surviving pieces; the pieces $x < 2 \\cap x > 2$ and $x \\geq 10 \\cap x \\leq \\tfrac67$ die empty.',
      'Check the seats: $x = \\tfrac67$ gives $\\left|\\dfrac{32/7}{-8/7}\\right| = 4 \\leq 4$ — included; $x = 10$ gives $\\left|\\dfrac{32}{8}\\right| = 4$ — included; $x = 3$ (the excluded middle) gives $|11| = 11$, honestly out.',
      'Hence the solution set is $\\left(-\\infty,\\ \\tfrac67\\right] \\cup \\left[10,\\ \\infty\\right)$ — the union verdict with both boundary seats kept.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The verdict hunt’s discipline', text: 'Three moves, always: FIRST check the bound — $g > 0$ runs the conversion, $g \\leq 0$ answers from the table; SECOND split into the two arms and solve each on the sign diagram (AL 7.3’s engine doing what it already knows how to do); THIRD intersect or union honestly, then check a boundary seat, an inside seat and an outside seat against the ORIGINAL bars. The three-point check is AL 7.1’s, and it catches the one fraud this family of problems prices: a boundary seat lost or gained by reading strictness off the converted claim instead of the original.' },

    { kind: 'heading', text: 'The Triangle Inequality, Proved by Squaring' },
    { kind: 'para', text: 'The chapter’s namesake. Walk from $0$ to $a + b$: either go directly, or detour — first to $a$, then cover the translated second leg from $a$ to $a + b$. The direct route is the gap $|a + b|$; the detour costs $|a| + |b|$. Geometry insists the detour cannot be shorter, and on the line the insistence has a two-line algebraic proof whose one delicate move — squaring — is lawful for exactly one reason, banked below.' },
    { kind: 'callout', tone: 'theorem', title: 'The triangle inequality, with its equality case', text: 'For all real $a, b$: $|a + b| \\leq |a| + |b|$. EQUALITY holds exactly when $ab \\geq 0$ — $a$ and $b$ on the same side of zero (either direction, zeros included); read as direction: the two legs point the SAME WAY, so the arms tile the route with no retrace. Opposite signs, $ab < 0$, pay a STRICT tax — some of the walked distance is taken back.' },
    { kind: 'derivation', title: 'The squaring proof', statement: 'For all real $a, b$: $|a + b| \\leq |a| + |b|$, with equality exactly when $ab \\geq 0$.', steps: [
      { label: 'Both sides are non-negative', formula: '|a + b| \\geq 0, \\qquad |a| + |b| \\geq 0', explanation: 'The demand that makes the coming squaring lawful: an absolute value is a distance (FM 7.4) and a sum of distances never dips below zero. Both sides of the intended comparison live in the safe region before any move is made.' },
      { label: 'Square the left side', formula: '|a + b|^2 = (a + b)^2 = a^2 + 2ab + b^2', explanation: 'The bars vanish under the square — $|t|^2 = t^2$ identically, FM 7.4’s mirror property — and the binomial expands honestly.' },
      { label: 'Bound the cross term', formula: '2ab \\leq 2\\,|ab| = 2\\,|a|\\,|b|', explanation: 'Every real number sits at or below its own absolute value, with equality exactly when it is non-negative. So $a^2 + 2ab + b^2 \\leq a^2 + 2|a||b| + b^2$ — one order step, always true, nothing assumed.' },
      { label: 'Assemble the squared bound', formula: '|a + b|^2 \\leq a^2 + 2|a||b| + b^2 = \\left(|a| + |b|\\right)^2', explanation: 'The right side recognises as a perfect square — $\\left(|a|+|b|\\right)^2$ — so the whole claim has become a comparison of two squares.' },
      { label: 'Take the honest root', formula: '|a + b| \\leq |a| + |b|', explanation: 'Both sides are non-negative, and on non-negative numbers the square is strictly order-preserving — $0 \\leq x \\leq y \\iff x^2 \\leq y^2$ — so the root may be taken in both directions. Equality survives the whole chain only where the single order step was tight: $2ab = 2|a||b|$, exactly $ab \\geq 0$.' },
    ], result: '$|a + b| \\leq |a| + |b|,$ $\\qquad$ $\\text{equality} \\iff ab \\geq 0$' },
    { kind: 'callout', tone: 'insight', title: 'Why the squaring was lawful', text: 'Squaring an inequality is NOT generally an equivalence move — AL 7.1 priced this: $-5 \\leq 1$, yet $25 > 1$; a negative member flips the order under the square. The move IS order-preserving when BOTH members are known non-negative, because $x \\mapsto x^2$ climbs strictly on $[0, \\infty)$. Every squaring in this chapter lives in that region: the triangle inequality squares two absolute values, and the $|f| \\geq |h|$ discipline of the next Illustration squares two bars. The habit to carry: square through bars freely, square through bare letters never — unless non-negativity has first been banked.' },
    { kind: 'formula', name: 'The triangle inequality (real form)', latex: '|a + b| \\leq |a| + |b|, \\qquad \\text{equality} \\iff ab \\geq 0', note: 'the detour never beats the direct route; same side of zero means the arms tile — the plane form is lesson 3.2’s |z₁ + z₂| ≤ |z₁| + |z₂|, same law one dimension up.' },
    { kind: 'example', title: 'Solve |3x − 2| ≥ |x + 4| — two bars against each other', steps: [
      'Both sides are absolute values — non-negative everywhere — so squaring is an ORDER-SAFE move here (the licence banked in the Insight, run in reverse).',
      'Square: $(3x - 2)^2 \\geq (x + 4)^2$, that is $9x^2 - 12x + 4 \\geq x^2 + 8x + 16$.',
      'Gather: $8x^2 - 20x - 12 \\geq 0$, that is $4(2x + 1)(x - 3) \\geq 0$.',
      'Sign diagram: true on $x \\leq -\\tfrac12$ or $x \\geq 3$ (AA 2.2’s engine — the squaring bought a product, and products answer on the diagram).',
      'Check: $x = 0$ (excluded middle) gives $|-2| = 2$ against $|4| = 4$ — honestly out; $x = -1$ gives $|-5| = 5 \\geq |3| = 3$ — in.',
      'And the boundary seat $x = -\\tfrac12$: $\\left|-\\tfrac72\\right| = \\tfrac72$ against $\\left|\\tfrac72\\right| = \\tfrac72$ — equal, kept by the weak direction.',
      'Hence the solution set is $\\left(-\\infty,\\ -\\tfrac12\\right] \\cup \\left[3,\\ \\infty\\right)$.',
    ] },
    { kind: 'para', text: 'The equality case deserves its own reading, because on the LINE it is a complete description of $|a + b|$, not a footnote to it. If $ab \\geq 0$ the two legs point the same way and $|a + b| = |a| + |b|$ — the arms tile the route. If $ab \\leq 0$ the legs oppose and the arms RETRACE: $|a + b| = \\big||a| - |b|\\big|$, the longer arm minus the shorter. Together: on the line $|a + b|$ takes one of exactly TWO values, and which one is decided by the sign of $ab$ alone. This is the honest reason the “band” of the next section has only its two ends reachable on the line — the interior belongs to the plane, where lesson 3.2 let the direction angle vary continuously.' },
    { kind: 'equation', latex: '|a + b| = \\begin{cases} |a| + |b|, & ab \\geq 0 \\quad \\text{(same side — the arms tile)}, \\\\[4pt] \\big||a| - |b|\\big|, & ab \\leq 0 \\quad \\text{(opposite sides — the arms retrace)}. \\end{cases} \\tag{3}', note: 'the line’s complete two-value law: same side of zero tiles the route, opposite sides retrace it — the seat $ab = 0$ (one leg zero) belongs to both readings and both agree there.' },
    { kind: 'figure', caption: 'The triangle inequality’s two cases on one plate. Top: same direction — $a = 3$ and $b = 2$ both right of $0$; the arms $|a| = 3$ and $|b| = 2$ tile the direct gap $|a + b| = 5$ exactly, and the verdict is equality ($ab = 6 \\geq 0$). Bottom: opposite directions — $a = 3$ rightward, $b = -2$ leftward; the $|b|$ arm (lime, walked backward from $a$) retraces part of the $|a|$ arm, and the direct gap collapses to $|a + b| = |3 + (-2)| = 1$ against the arms’ $3 + 2 = 5$ — the strict tax $ab < 0$ collects. Equality is exactly “the same direction on the line”.', svg: sameDirectionPlateSvg() },
    { kind: 'example', title: 'Price the tax four times: |5 + (−12)| against |5| + |−12|, then both equality directions, then the retrace read', steps: [
      'Opposite signs: $|5 + (-12)| = |-7| = 7$ against $|5| + |-12| = 17$ — strict, $ab = -60 < 0$, tax $10$.',
      'Same direction, rightward: $|5 + 12| = 17 = 5 + 12$ — equality.',
      'Same direction, leftward: $|(-3) + (-4)| = |-7| = 7 = 3 + 4$ — equality again: $ab = 12 \\geq 0$ reads “same side of zero”, NOT “both positive”; the leftward seats count.',
      'The retrace read of the first line: opposite signs make the arms cancel partially — $|5 + (-12)| = \\big||5| - |{-12}|\\big| = |5 - 12| = 7$ — the two-value law (3) predicting the value exactly.',
      'Hence strict on opposite signs and tight on same side — the equality case is precisely the proof’s single order step $2ab \\leq 2|a||b|$ holding tight.',
    ] },

    { kind: 'heading', text: 'The Reverse Triangle Inequality' },
    { kind: 'para', text: 'The forward law bounds a SUM above; the reverse law bounds a DIFFERENCE OF SIZES below. It says two distances from $0$ can differ by at most the distance between the points that carried them: $\\big||a| - |b|\\big| \\leq |a - b|$. The proof is the forward law fed a difference — applied twice, once in each order — which is why the engines call it “the two engines”.' },
    { kind: 'callout', tone: 'theorem', title: 'The reverse triangle inequality', text: 'For all real $a, b$: $\\big||a| - |b|\\big| \\leq |a - b|$. For real numbers the equality case is $ab \\geq 0$ — the same-side seats again: when $a$ and $b$ sit on one side of zero, their difference $a - b$ has size exactly $\\big||a| - |b|\\big|$; when they oppose, $|a - b| = |a| + |b|$ instead — the complementary law, obtained from the forward inequality by writing $a - b = a + (-b)$.' },
    { kind: 'derivation', title: 'The reverse form: the forward law, applied twice', statement: 'For all real $a, b$: $\\big||a| - |b|\\big| \\leq |a - b|$.', steps: [
      { label: 'First application', formula: 'a = (a - b) + b \\implies |a| \\leq |a - b| + |b|', explanation: 'The forward triangle inequality applies to ANY two numbers — feed it the pair $(a - b,\\ b)$. Subtract $|b|$: $|a| - |b| \\leq |a - b|$.' },
      { label: 'Second application, roles swapped', formula: 'b = (b - a) + a \\implies |b| - |a| \\leq |a - b|', explanation: 'The same feed with the pair $(b - a,\\ a)$; the mirror property $|b - a| = |a - b|$ keeps the right side identical.' },
      { label: 'Assemble the absolute difference', formula: '\\big||a| - |b|\\big| \\leq |a - b|', explanation: 'Exactly one of $|a| - |b|$ and $|b| - |a|$ is non-negative, and whichever it is, one of the two lines above bounds it by $|a - b|$. Two sizes never differ by more than the gap between their points.' },
    ], result: '$\\big||a| - |b|\\big| \\leq |a - b|$' },
    { kind: 'formula', name: 'The reverse triangle inequality', latex: '\\big||a| - |b|\\big| \\leq |a - b| \\leq |a| + |b|', note: 'the gap between two points is at least the difference of their sizes and at most the sum — together the two laws pin |a − b| to the band [||a| − |b||, |a| + |b|].', },
    { kind: 'para', text: 'Read together, the two laws are the BAND ENGINE: for any $a, b$, the gap $|a - b|$ — and likewise $|a + b|$, by writing $a + b = a - (-b)$ — is pinned between the floor $\\big||a| - |b|\\big|$ and the ceiling $|a| + |b|$. Given only the SIZES of $a$ and $b$, every value in the band is possible on the plane, where the direction between them can vary continuously (lesson 3.2’s Argand seats). On the LINE, only the two ends are honest — the two-value law (3) — because a real pair of fixed sizes has nothing to vary but a sign.' },
    { kind: 'example', title: 'With |a| = 4 and |b| = 9: the least and greatest values of |a + b| — and which values in between are honest on the line', steps: [
      'The band: ceiling $|a| + |b| = 13$ (the forward law), floor $\\big||a| - |b|\\big| = |4 - 9| = 5$ (the reverse law) — so $5 \\leq |a + b| \\leq 13$ always.',
      'On the line, fixed sizes leave only the signs: the four pairs $(4, 9), (4, -9), (-4, 9), (-4, -9)$.',
      'Their sums: $13, -5, 5, -13$ — so $|a + b|$ takes exactly the two band ENDS: $5$ (opposite signs) and $13$ (same signs).',
      'An interior value such as $8$ would need $ab$ strictly between $+36$ and $-36$ — the plane supplies such directions (lesson 3.2’s continuous angle); a sign pair gives only the extremes.',
      'Hence least $5$, greatest $13$, both attained — and no interior value: the band is the plane’s property; the line owns its two ends.',
    ] },

    { kind: 'heading', text: 'The Detour Tax: |x − a| + |x − b| ≥ |a − b|' },
    { kind: 'para', text: 'FM 7.4’s engine priced $|x - a|$ as the distance between $x$ and $a$ — two points, one subtraction. Now read it as a ROUTE: to travel from $a$ to $b$ passing through $x$ costs $|x - a| + |x - b|$, the two arms; the direct route costs $|a - b|$. The triangle inequality on the pair of arms is the whole theorem — and its equality case, “$x$ between $a$ and $b$”, is the number-line picture every minimum hunt in this family rides.' },
    { kind: 'callout', tone: 'theorem', title: 'The detour tax', text: 'For all real $a, b, x$: $|x - a| + |x - b| \\geq |a - b|$. EQUALITY holds exactly when $x$ lies between $a$ and $b$ — the closed segment $[\\min(a, b),\\ \\max(a, b)]$, endpoints included: there the two arms tile the direct gap. Every seat outside the segment pays the tax strictly, and pays it twice over: the overshoot beyond the nearer endpoint is counted on both arms.' },
    { kind: 'derivation', title: 'The detour tax, with its equality case', statement: 'For all real $a, b, x$: $|x - a| + |x - b| \\geq |a - b|$, with equality exactly for $x$ between $a$ and $b$.', steps: [
      { label: 'Split the journey at x', formula: '(x - a) + (b - x) = b - a', explanation: 'A trip from $a$ to $b$ through $x$ costs the two arms $|x - a| + |b - x|$ (note $|x - b| = |b - x|$: the arms read the same either way round). The identity telescopes — the interior letter $x$ cancels.' },
      { label: 'Apply the forward law to the arms', formula: '|x - a| + |b - x| \\geq \\big|(x - a) + (b - x)\\big| = |b - a|', explanation: 'The triangle inequality on the pair of arms: the detour through $x$ cannot beat the direct route from $a$ to $b$.' },
      { label: 'The equality case', formula: '(x - a)(b - x) \\geq 0', explanation: 'Equality in the forward law needs the two legs to point the same way: $x - a$ and $b - x$ both non-negative — walk rightward through, $a \\leq x \\leq b$ — or both non-positive — walk leftward through, $b \\leq x \\leq a$. Either reading is the same verdict: $x$ BETWEEN $a$ and $b$, endpoints included, where the arms tile the gap with no retrace.' },
    ], result: '$|x - a| + |x - b| \\geq |a - b|,$ $\\qquad$ $\\text{equality} \\iff x \\in [\\min(a, b),\\ \\max(a, b)]$' },
    { kind: 'formula', name: 'The detour tax', latex: '|x - a| + |x - b| \\,\\geq\\, |a - b|, \\qquad \\text{equality} \\iff a \\leq x \\leq b \\text{ (or } b \\leq x \\leq a\\text{)}', note: 'FM 7.4’s distance engine reread as a bound: the minimum of a two-arm sum is the gap itself, attained on the whole segment between the centres — the number-line picture for every “minimum of |x − a| + |x − b|” item.' },
    { kind: 'figure', caption: 'The detour tax with a = 1 and b = 7 (direct gap $|a - b| = 6$). Top: $x = 4$ between them — the arms $|x - a| = 3$ and $|x - b| = 3$ tile the direct gap exactly, and the cost $3 + 3 = 6$ equals $|a - b|$: equality. Bottom: $x = 9$ outside the segment — the arm $|x - a| = 8$ runs the whole way and more, the arm $|x - b| = 2$ counts the overshoot again, and the cost $8 + 2 = 10$ exceeds the direct $6$: the strict tax, priced on the overshoot (shaded) twice. Between a and b the route is free to choose its waypoint; outside, every step beyond the segment is counted on both arms.', svg: detourTaxSvg() },
    { kind: 'example', title: 'Find the minimum of |x − 2| + |x + 3| and every x that attains it', steps: [
      'Read the centres: $|x - 2| + |x + 3| = |x - 2| + |x - (-3)|$ — a two-arm sum with centres $2$ and $-3$.',
      'The detour tax: $|x - 2| + |x - (-3)| \\geq |2 - (-3)| = 5$.',
      'Equality iff $x$ between $-3$ and $2$: every seat of the segment $[-3, 2]$ pays exactly $5$ — the whole segment minimises, not one point.',
      'Outside the segment the tax is strict: $x = 4$ pays $|2| + |7| = 9$; $x = -5$ pays $|-7| + |-2| = 9$.',
      'Hence the minimum is $5$, attained exactly on $[-3, 2]$ — the number-line read no calculus book gives faster.',
    ] },

    { kind: 'heading', text: 'The Cauchy–Schwarz Bridge' },
    { kind: 'para', text: 'Lesson 4.3 proved Cauchy–Schwarz by the discriminant discipline and named a connection forward: the triangle-inequality family and the dot-product family are one engine seen twice. This is the cashing. Feed Cauchy–Schwarz the magnitude list $(|x_1|, \\dots, |x_n|)$ against the all-ones list $(1, \\dots, 1)$, and out falls a bound every examination bank prices: the squared sum of magnitudes against $n$ times the sum of squares.' },
    { kind: 'callout', tone: 'theorem', title: 'The bridge, with its equality case', text: 'For all real $x_1, \\dots, x_n$: $\\left(\\sum_{i=1}^{n} |x_i|\\right)^2 \\leq n \\sum_{i=1}^{n} x_i^2$. EQUALITY holds exactly when all the magnitudes are equal — $|x_1| = |x_2| = \\cdots = |x_n|$ — the list sits at one size. (The bars are honest: the claim is about magnitudes, and signs never help the left side.)' },
    { kind: 'derivation', title: 'The bridge, by Cauchy–Schwarz on the magnitudes against the ones', statement: 'For all real $x_1, \\dots, x_n$: $\\left(\\Sigma|x_i|\\right)^2 \\leq n\\,\\Sigma x_i^2$, with equality exactly on equal-magnitude lists.', steps: [
      { label: 'The pairing', formula: '\\left(\\sum |x_i| \\cdot 1\\right)^2 \\leq \\left(\\sum |x_i|^2\\right)\\left(\\sum 1^2\\right)', explanation: 'Cauchy–Schwarz (lesson 4.3, proved there by the never-negative quadratic): $\\left(\\Sigma p_i q_i\\right)^2 \\leq \\left(\\Sigma p_i^2\\right)\\left(\\Sigma q_i^2\\right)$ for any two real lists. Feed it $p_i = |x_i|$ against $q_i = 1$ at every seat.' },
      { label: 'The left side', formula: '\\sum |x_i| \\cdot 1 = \\sum |x_i|', explanation: 'The ones contribute nothing to the dot product — the left side is exactly the squared sum of the magnitudes.' },
      { label: 'The right side', formula: '\\sum |x_i|^2 = \\sum x_i^2, \\qquad \\sum 1^2 = n', explanation: 'The bars vanish under the square — $|t|^2 = t^2$, the property that carried the squaring proof — and the ones list has exactly $n$ seats.' },
      { label: 'The equality case', formula: '|x_i| = \\lambda \\cdot 1 \\quad \\text{for all } i', explanation: '4.3’s discipline: equality in Cauchy–Schwarz exactly when the two lists are proportional. Against the all-ones list, proportionality forces every magnitude to the same value — the list sits at one size.' },
    ], result: '$\\left(\\sum_{i=1}^{n} |x_i|\\right)^2 \\leq n \\sum_{i=1}^{n} x_i^2,$ $\\qquad$ $\\text{equality} \\iff |x_1| = \\cdots = |x_n|$' },
    { kind: 'formula', name: 'The Cauchy–Schwarz bridge', latex: '\\left(\\sum_{i=1}^{n} |x_i|\\right)^2 \\leq n \\sum_{i=1}^{n} x_i^2', note: '4.3’s named-forward connection cashed: the QM–AM rung of 4.2’s ladder on the magnitude list — (mean of magnitudes)² ≤ mean of squares; equality exactly when the list sits at one size.' },
    { kind: 'para', text: 'One reread is owed to the means chapter. Divide the bridge by $n^2$: $\\left(\\dfrac{\\Sigma|x_i|}{n}\\right)^2 \\leq \\dfrac{\\Sigma x_i^2}{n}$ — the square of the arithmetic mean of the magnitudes against the mean of their squares. That is precisely the $M_1 \\leq M_2$ rung of 4.2’s power-mean ladder, run on the magnitude data — the bridge is the means chapter and the bounds chapter shaking hands over the same list, and 4.1’s two-number AM–GM is the $n = 2$ shadow of the same handshake. (4.5’s $|x|$-Jensen witness is the convexity route to the same rung; the book deliberately keeps the three proofs distinct — square, discriminant, chord.)' },
    { kind: 'example', title: 'Price the bridge on (1, 2, −4) and on (3, −3, 3)', steps: [
      'List $(1, 2, -4)$: $\\Sigma|x_i| = 1 + 2 + 4 = 7$, so the left side is $7^2 = 49$.',
      'The right side: $n\\,\\Sigma x_i^2 = 3\\,(1 + 4 + 16) = 63$ — and $49 < 63$, strict.',
      'Strict because the magnitudes $1, 2, 4$ are not all equal — the equality discipline reads the list’s sizes directly.',
      'List $(3, -3, 3)$: $\\Sigma|x_i| = 9$, left side $81$; right side $3\\,(9 + 9 + 9) = 81$ — EQUALITY.',
      'Hence the bridge is tight exactly on equal-magnitude lists, witnessed at both speeds — the Cauchy–Schwarz equality case of 4.3, priced on a number line instead of a dot product.',
    ] },

    { kind: 'heading', text: 'The Bound Machines at Examination Speed' },
    { kind: 'para', text: 'The chapter’s engines now close as a family of bound machines, and the census is short enough to carry. (i) The VERDICT machines: $|f| < g$ and $|f| > g$ convert through the pair (1)–(2) into compounds and unions that AL 7.3 settles. (ii) The SIZE machines: $|a + b| \\leq |a| + |b|$ with its same-direction equality, the reverse $\\big||a| - |b|\\big| \\leq |a - b|$, and the band they jointly pin. (iii) The ROUTE machine: the detour tax flooring two-arm sums at the gap between the centres — the minimum-hunt workhorse, whose Exercises below include the three-arm version the machines generalise to. (iv) The LIST machine: the bridge, cashing 4.3 on magnitude lists. (v) The MIXED witnesses: the family $|x| + |y| \\geq |x + y|$ — the triangle inequality verbatim, dressed as a constraint claim; and the generalized $n$-term law $|a_1 + \\cdots + a_n| \\leq |a_1| + \\cdots + |a_n|$, proved by induction in the Exercise set on the 4.1 ladder precedent. Every machine was swept on integer grids by this lesson’s engines before any prose claimed it.' },
    { kind: 'table', caption: 'The bound machines of lesson 4.6, in one census — every statement proved above, every witness recomputed by the engines before this prose was written (the same table the chapter review will re-audit).', head: ['The machine', 'The statement', 'The equality case', 'Reach for it when'], rows: [
      ['the verdict pair', '$|f| < g \\iff -g < f < g$; $\\ |f| > g \\iff f < -g$ or $f > g$', 'boundary seats (weak variants)', 'bars against a POSITIVE bound, either direction'],
      ['the triangle inequality', '$|a + b| \\leq |a| + |b|$', '$ab \\geq 0$ — same side of zero', 'a sum must be bounded above by sizes'],
      ['the reverse form', '$\\big||a| - |b|\\big| \\leq |a - b|$', '$ab \\geq 0$ (reals) — same side', 'a difference of sizes must be floored'],
      ['the detour tax', '$|x - a| + |x - b| \\geq |a - b|$', '$x$ between $a$ and $b$', 'a sum of arms must be minimised'],
      ['the bridge', '$\\left(\\Sigma|x_i|\\right)^2 \\leq n\\,\\Sigma x_i^2$', 'all $|x_i|$ equal', 'a list’s magnitude sum must be bounded'],
    ] },
    { kind: 'callout', tone: 'historical', title: 'Euclid, Elements Book I, Proposition 20', text: 'The law this lesson proved in five lines of algebra is one of the oldest theorems in the canon: Euclid’s Elements, Book I, Proposition 20 — “in any triangle the sum of any two sides is greater than the remaining one.” The name “triangle inequality” rides from that geometry to the number line: place $0$, $a$ and $a + b$ as three points and the “triangle” they would form degenerates onto the line — when $a$ and $b$ point the same way it degenerates completely and the inequality is an equality; when they oppose, a genuine third side appears and the inequality is strict. The same Proposition I.20 is why the complex-plane law of lesson 3.2 carries the same name: there the triangle is honest. (Web-verified this run against the standard online edition of the Elements and the standard encyclopaedia article; the derivation there — Euclid proves it by extending a side and comparing angles — is a different proof from this lesson’s squaring route.)' },
    { kind: 'para', text: 'One cross-reference the chapter owes by name. Lesson 3.2, “The Conjugate and the Modulus”, proved $|z_1 + z_2| \\leq |z_1| + |z_2|$ on the Argand plane by the discriminant discipline one storey up, with the equality case “$z_2 = \\lambda z_1$ for real $\\lambda \\geq 0$” — same direction on the PLANE. The real-line law of this lesson is that theorem restricted to the real axis ($b = d = 0$ in $z = a + bi$): the real equality case $ab \\geq 0$ is the shadow of the complex one, and the band’s interior — unreachable on the line, routine on the plane — is exactly the direction freedom the plane adds. The chapter’s habit of one engine seen at two storeys is here literal: same law, same name, one dimension apart.' },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'The honest audit first, as the chapter records: the JEE Main 2026 unit list carries NO separate inequalities unit — absolute-value items ride the algebra bank (unit 2 names modulus and the triangle inequality inside the complex-numbers unit; the $|f| < g$ and $|f| > g$ verdicts ride the equations-and-inequality families of the algebra bank), so every item below is labelled exam-style honestly. On the registers themselves: the verdict hunts (linear, quadratic, rational in the bars) are the single-correct and numerical-value staples of every school-level and aptitude bank — NCERT class 11 chapter 5 carries the linear-inequality and compound-inequality ground this lesson’s verdicts ride, and the Khattar QA aptitude batteries price the $|f| < g$ / $|f| > g$ speed items directly. The bound machines price as: band items (least/greatest of $|a + b|$ on given sizes — the reverse law’s floor is the priced distractor), minimum-of-arms items (the detour tax, including the three-arm median read), $|f| \\geq |g|$ squaring items (the licence is the tested point), and bridge items on lists. The items in this lesson are exam-style — our own designs, labelled honestly, never lifted from any paper.' },

    { kind: 'terms', items: [
      { term: 'Absolute-value inequality', def: 'a claim comparing the size of a real expression $f$ against a bound $g$: $|f| < g$, $|f| > g$ or the weak variants — a distance claim wearing bars.' },
      { term: 'Verdict discipline', def: 'the conversion theorem for $g > 0$: $|f| < g \\iff -g < f < g$ (an intersection, the between-form) and $|f| > g \\iff f < -g$ or $f > g$ (a union, the outside claim) — AL 7.3’s compound engine wearing bars.' },
      { term: 'Degenerate seats', def: 'the $g \\leq 0$ cases priced by size alone: $|f| < g$ never; $|f| > g$ all reals when $g < 0$, and all reals except the zeros of $f$ when $g = 0$.' },
      { term: 'Triangle inequality', def: '$|a + b| \\leq |a| + |b|$: the direct route is never longer than the detour; equality exactly when $ab \\geq 0$ — the two legs point the same way on the line.' },
      { term: 'Equality case (ab ≥ 0)', def: 'the same-direction condition: both numbers on one side of zero (either side, zeros included) — the arms tile the route; opposite signs force a strict tax.' },
      { term: 'Reverse triangle inequality', def: '$\\big||a| - |b|\\big| \\leq |a - b|$: two sizes differ by at most the gap between their points — the forward law applied twice; with the forward law it pins $|a \\pm b|$ to the band $[\\big||a| - |b|\\big|,\\ |a| + |b|]$.' },
      { term: 'Detour tax', def: '$|x - a| + |x - b| \\geq |a - b|$, FM 7.4’s distance engine reread as a bound: the minimum of a two-arm sum is the gap itself, attained exactly on the segment between the centres.' },
      { term: 'Band engine', def: 'the reverse law’s floor and the forward law’s ceiling together: $\\big||a| - |b|\\big| \\leq |a \\pm b| \\leq |a| + |b|$ — a band whose interior is reachable on the plane, while the line attains only its two ends.' },
      { term: 'Cauchy–Schwarz bridge', def: '$\\left(\\Sigma|x_i|\\right)^2 \\leq n\\,\\Sigma x_i^2$: Cauchy–Schwarz on the magnitude list against the all-ones list — the QM–AM rung on magnitude data, equality exactly when the list sits at one size.' },
    ] },

    { kind: 'quiz', title: 'Check yourself: absolute value and the triangle inequality', items: [
      { q: 'The solution set of $|2x - 1| < 7$ is:', options: ['$(-3,\\ 4)$', '$[-3,\\ 4]$', '$(-4,\\ 4)$', '$(-\\infty,\\ -3) \\cup (4,\\ \\infty)$'], answer: 0, explain: 'The verdict is the between-form $-7 < 2x - 1 < 7$; add $1$ and halve: $-3 < x < 4$ — option A. Option B wrongly seats the boundary: the claim is strict, and at $x = -3$ or $4$ the left side reads $7$, not less than $7$. Option C centres the band at $0$ — the reflex that forgets the band is centred at $\\tfrac12$, not the origin. Option D reads “less than” as “greater than” — the union verdict belongs to the other direction of the discipline.' },
      { q: 'The solution set of $|x - 5| > -3$ is:', options: ['the empty set', '$x < 2$ or $x > 8$', 'all real numbers', 'all real numbers except $x = 5$'], answer: 2, explain: 'The bound is NEGATIVE and the direction is “greater than”: $|x - 5| \\geq 0 > -3$ at every seat, so every real $x$ solves it — option C. Option A prices the “impossible” reflex — that is the $|f| < g$ verdict at $g \\leq 0$, not this direction. Option B runs the $g > 0$ union discipline on a bound that never demanded it — the classic fraud this lesson’s Caution prices. Option D quotes the $g = 0$ seat ($|x - 5| > 0$ excludes $5$) — the right shape at the wrong bound.' },
      { q: 'The minimum value of $|x - 2| + |x + 5|$ is:', options: ['$0$', '$3.5$', '$\\sqrt{29}$', '$7$'], answer: 3, explain: 'The detour tax floors the two-arm sum at the gap $|2 - (-5)| = 7$, attained for every $x$ between $-5$ and $2$ — option D. Option A prices “the arms can cancel” — arms with DIFFERENT centres never vanish together, so the sum never reaches $0$. Option B prices the half-gap reflex — as if the minimum sat at the midpoint at half price; the tax says the whole segment between the centres pays the full gap. Option C prices the perpendicular fraud — Pythagoras on legs $2$ and $5$ — but the arms are collinear on one line, never at right angles.' },
      { q: 'With $|a| = 5$ and $|b| = 12$, the greatest possible value of $|a + b|$ is:', options: ['$5$', '$7$', '$12$', '$17$'], answer: 3, explain: 'The forward law’s ceiling: $|a + b| \\leq |a| + |b| = 17$, attained when $a$ and $b$ point the same way — option D. Option A sits BELOW the reverse-law floor $\\big||a| - |b|\\big| = 7$ — no such value exists. Option B is the LEAST possible value — the reverse law’s floor, attained at opposite directions; the floor/ceiling pair is exactly the distractor pair. Option C prices $|b|$ alone, as if $a$ contributed nothing — the ceiling reads BOTH sizes.' },
      { q: 'In the triangle inequality $|a + b| \\leq |a| + |b|$, equality holds exactly when:', options: ['$ab > 0$', '$ab \\geq 0$', '$a = b$', 'both $a$ and $b$ are positive'], answer: 1, explain: 'The proof’s one order step is $2ab \\leq 2|a||b|$, tight exactly when $ab \\geq 0$: same side of zero, zeros included — option B. Option A drops the zero seats: with $a = 0$, $|0 + b| = |b| = 0 + |b|$ is equality, though $ab = 0$. Option C is sufficient but not necessary: $a = 2, b = 3$ are unequal yet $|5| = 5 = 2 + 3$. Option D drops the leftward seats: $a = b = -3$ gives $|-6| = 6 = 3 + 3$ — equality without positivity.' },
    ] },

    { kind: 'exercises', title: 'Exercises 4.6', sets: [
      { level: 'L1', questions: [
        { q: 'Solve $|x + 3| \\leq 7$ and state the verdict type.', solution: [
          'The discipline: $g = 7 > 0$, weak direction — the closed between-form $-7 \\leq x + 3 \\leq 7$.',
          'Subtract $3$ across: $-10 \\leq x \\leq 4$.',
          'Check the boundary: $x = -10$ gives $|-7| = 7 \\leq 7$ — kept; $x = 4$ gives $|7| = 7$ — kept; $x = 0$ (inside) gives $3 \\leq 7$.',
        ], answer: 'the closed interval $[-10,\\ 4]$ — a between-form (intersection) verdict' },
        { q: 'Solve $|2x - 6| > 8$.', solution: [
          'The discipline: $g = 8 > 0$, direction “greater than” — the union $2x - 6 > 8$ or $2x - 6 < -8$.',
          'First ray: $2x - 6 > 8 \\iff 2x > 14 \\iff x > 7$; second ray: $2x - 6 < -8 \\iff 2x < -2 \\iff x < -1$.',
          'Check the boundary: $x = 7$ gives $|8| = 8$, not strictly greater — both ends stay out; $x = 0$ (excluded middle) gives $|-6| = 6$, honestly out; $x = 9$ gives $|12| = 12$, in.',
        ], answer: '$(-\\infty,\\ -1) \\cup (7,\\ \\infty)$ — the union verdict, boundary seats excluded' },
      ] },
      { level: 'L2', questions: [
        { q: 'Solve $|x^2 - 9| \\leq 4$.', solution: [
          'The discipline: $g = 4 > 0$, weak direction — the closed between-form $-4 \\leq x^2 - 9 \\leq 4$.',
          'Add $9$ across: $5 \\leq x^2 \\leq 13$.',
          'Right arm: $x^2 \\leq 13 \\iff |x| \\leq \\sqrt{13}$; left arm: $x^2 \\geq 5 \\iff |x| \\geq \\sqrt{5}$.',
          'Assemble on the size line: $\\sqrt{5} \\leq |x| \\leq \\sqrt{13}$ — two closed intervals, symmetric about $0$.',
          'Check: $x = \\sqrt{5}$ gives $|5 - 9| = 4 \\leq 4$ — kept; $x = 0$ (excluded middle) gives $|-9| = 9$, out; $x = \\sqrt{13}$ gives $4$ — kept.',
        ], answer: '$[-\\sqrt{13},\\ -\\sqrt{5}] \\cup [\\sqrt{5},\\ \\sqrt{13}]$' },
        { q: 'Solve $|3x - 2| \\geq |x + 4|$ (the two-bar squaring discipline).', solution: [
          'Both sides are absolute values — non-negative — so squaring is order-safe: the licence of this lesson’s Insight.',
          'Square: $(3x - 2)^2 \\geq (x + 4)^2$, that is $9x^2 - 12x + 4 \\geq x^2 + 8x + 16$.',
          'Gather: $8x^2 - 20x - 12 \\geq 0$, that is $4(2x + 1)(x - 3) \\geq 0$.',
          'Sign diagram: true on $x \\leq -\\tfrac12$ or $x \\geq 3$.',
          'Check: $x = 0$ (excluded middle) gives $2$ against $4$ — out; boundary $x = -\\tfrac12$ gives $\\tfrac72$ against $\\tfrac72$ — equal, kept by the weak direction; $x = 4$ gives $10 \\geq 8$ — in.',
        ], answer: '$\\left(-\\infty,\\ -\\tfrac12\\right] \\cup \\left[3,\\ \\infty\\right)$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $\\left|\\dfrac{2x - 1}{x + 2}\\right| < 3$ (with $x \\neq -2$).', solution: [
          'The discipline: $g = 3 > 0$ — the between-form $-3 < \\dfrac{2x - 1}{x + 2} < 3$.',
          'Right arm: $\\dfrac{2x - 1}{x + 2} < 3 \\iff \\dfrac{2x - 1 - 3x - 6}{x + 2} < 0 \\iff \\dfrac{-x - 7}{x + 2} < 0 \\iff \\dfrac{x + 7}{x + 2} > 0$ — true on $x < -7$ or $x > -2$.',
          'Left arm: $\\dfrac{2x - 1}{x + 2} > -3 \\iff \\dfrac{5x + 5}{x + 2} > 0$ — true on $x < -2$ or $x > -1$.',
          'Intersect: $(x < -7 \\text{ or } x > -2) \\cap (x < -2 \\text{ or } x > -1) = x < -7$ or $x > -1$.',
          'Check: $x = -8$ gives $\\left|\\dfrac{-17}{-6}\\right| = \\tfrac{17}{6} < 3$ — in; $x = -3$ (excluded middle) gives $\\left|\\dfrac{-7}{-1}\\right| = 7$ — out; boundary $x = -7$ gives exactly $3$, not strictly less — excluded; $x = -1$ gives exactly $3$ — excluded.',
        ], answer: '$(-\\infty,\\ -7) \\cup (-1,\\ \\infty)$' },
        { q: 'With $|p| = 3$ and $|q| = 8$: find the least and greatest values of $|p + q|$, and say exactly which seats attain them.', solution: [
          'The band: ceiling $|p| + |q| = 11$ (the forward law), floor $\\big||p| - |q|\\big| = 5$ (the reverse law) — so $5 \\leq |p + q| \\leq 11$ always.',
          'On the line, fixed sizes leave the four sign pairs $(3, 8), (3, -8), (-3, 8), (-3, -8)$.',
          'Their sums: $11, -5, 5, -11$ — so $|p + q|$ takes exactly the two ends: $5$ and $11$.',
          'Attainment: $5$ at opposite signs ($p = 3, q = -8$ or $p = -3, q = 8$); $11$ at same signs.',
          'Hence least $5$, greatest $11$ — the interior of the band is the plane’s property (lesson 3.2’s continuous directions), not the line’s.',
        ], answer: 'least $5$ (opposite signs), greatest $11$ (same signs) — the two ends of the band $[5, 11]$, both attained' },
        { q: 'Find the minimum of $|x - 3| + |x + 1|$ and every $x$ that attains it.', solution: [
          'The centres: $3$ and $-1$ — a two-arm sum, so the detour tax applies.',
          'The floor: $|x - 3| + |x - (-1)| \\geq |3 - (-1)| = 4$.',
          'Equality iff $x$ between $-1$ and $3$: every seat of $[-1, 3]$ pays exactly $4$.',
          'Outside: $x = 5$ pays $|2| + |6| = 8$; $x = -3$ pays $|-6| + |-2| = 8$ — strict, as the tax demands.',
        ], answer: 'minimum $4$, attained exactly on $[-1,\\ 3]$' },
      ] },
      { level: 'L4', questions: [
        { q: 'SINGLE CORRECT (exam-style). Among the intervals (A) $[-1, 3]$, (B) $(-1, 3)$, (C) $[-3, 1]$, (D) $(-\\infty, -1) \\cup (3, \\infty)$, the solution set of $|x^2 - 2x| \\leq 3$ is —', solution: [
          'The discipline: $g = 3 > 0$, weak direction — $-3 \\leq x^2 - 2x \\leq 3$.',
          'Right arm: $x^2 - 2x - 3 \\leq 0$, that is $(x - 3)(x + 1) \\leq 0$ — true on $-1 \\leq x \\leq 3$.',
          'Left arm: $x^2 - 2x + 3 \\geq 0$ — discriminant $4 - 12 = -8 < 0$ with upward opening: positive everywhere, so this arm never bites (AA 2.1’s always-sign law).',
          'So the solution is the right arm alone: $[-1, 3]$ — option (A).',
          'The distractors: (B) drops the boundary — the weak $\\leq$ keeps both ends ($x = -1$ and $x = 3$ each give $|3| = 3 \\leq 3$); (C) is the mirror-sign fraud (the roots are $-1$ and $3$, not $-3$ and $1$); (D) is the union verdict — the wrong direction of the discipline.',
        ], answer: '(A) $[-1,\\ 3]$' },
        { q: 'MULTIPLE CORRECT (exam-style). With $|a| = 4$ and $|b| = 9$ (real $a, b$), which of the following hold? (A) $|a + b| \\geq 5$ always; (B) $|a + b| \\leq 13$ always; (C) $|a - b| \\geq 5$ always; (D) $|a + b|$ can equal $8$.', solution: [
          'The band: $\\big||a| - |b|\\big| = 5 \\leq |a \\pm b| \\leq |a| + |b| = 13$ — the reverse law floors, the forward law ceilings, for BOTH the sum and the difference.',
          '(A) TRUE: the reverse law $|a + b| \\geq 5$ — the floor is the difference of the sizes.',
          '(B) TRUE: the forward law $|a + b| \\leq 13$ — the ceiling is the sum of the sizes.',
          '(C) TRUE: $|a - b|$ rides the same band (write $a - b = a + (-b)$ with $|-b| = 9$), so it too is floored at $5$.',
          '(D) FALSE on the line: the sign pairs give $13, -5, 5, -13$ — so $|a + b|$ takes ONLY the ends $5$ and $13$; the interior value $8$ needs a direction between “same” and “opposite”, which the plane supplies and the line cannot.',
        ], answer: '(A), (B), (C) hold; (D) fails — the line attains only the band’s two ends' },
        { q: 'NUMERICAL VALUE (exam-style). The minimum value of $|x - 5| + |x - 2| + |x + 1|$ is — (integer answer)', solution: [
          'Pair the outer arms by the detour tax: $|x - 5| + |x - (-1)| \\geq |5 - (-1)| = 6$, equality exactly on $[-1, 5]$.',
          'The middle arm never hurts: $|x - 2| \\geq 0$ always — so the total is at least $6 + 0 = 6$.',
          'Attainment needs both: $x \\in [-1, 5]$ (outer pair tight) AND $|x - 2| = 0$ — so $x = 2$, which lies on the segment.',
          'Check: $x = 2$ gives $3 + 0 + 3 = 6$; nearby $x = 3$ gives $2 + 1 + 4 = 7$; $x = 0$ gives $5 + 2 + 1 = 8$ — the seat $2$ is the unique minimiser.',
          'Hence the minimum is $6$ — the outer gap plus the middle arm’s vanishing seat.',
        ], answer: '$6$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Prove the detour tax $|x - a| + |x - b| \\geq |a - b|$ with its FULL equality case: show the inequality always holds, and show that equality forces $x$ onto the closed segment between $a$ and $b$ (no seat outside ever attains it).', solution: [
          'The inequality: write the journey through $x$ — $(x - a) + (b - x) = b - a$ telescopes — and apply the triangle inequality to the arms: $|x - a| + |b - x| \\geq |b - a|$, with $|x - b| = |b - x|$.',
          'Equality in the forward law needs the legs same-direction: $(x - a)(b - x) \\geq 0$ — either $a \\leq x \\leq b$ or $b \\leq x \\leq a$; either way $x$ is on the closed segment.',
          'Now the converse direction — no outside seat attains the floor. Suppose WLOG $a \\leq b$ and take $x < a$: then the arms are $a - x$ and $b - x$, so the cost is $(a - x) + (b - x) = (b - a) + 2(a - x) > b - a$ since $a - x > 0$.',
          'Likewise $x > b$ costs $(x - a) + (x - b) = (b - a) + 2(x - b) > b - a$.',
          'So the floor is attained exactly on the segment — the two arms tile there and only there; witness $(a, b, x) = (1, 7, 4)$: $3 + 3 = 6 = |1 - 7|$, against $x = 9$: $8 + 2 = 10 > 6$.',
        ], answer: 'the tax always holds; equality exactly for $x \\in [\\min(a, b),\\ \\max(a, b)]$ — proved in both directions' },
        { q: 'Prove the bridge $\\left(\\Sigma|x_i|\\right)^2 \\leq n\\,\\Sigma x_i^2$ by Cauchy–Schwarz, pin the equality case, and price it on $(1, 2, -4)$ and on $(3, -3, 3)$.', solution: [
          'The engine: Cauchy–Schwarz (lesson 4.3) on $p_i = |x_i|$ against $q_i = 1$: $\\left(\\Sigma |x_i| \\cdot 1\\right)^2 \\leq \\left(\\Sigma |x_i|^2\\right)\\left(\\Sigma 1^2\\right)$.',
          'The left side is $\\left(\\Sigma|x_i|\\right)^2$; the right side is $\\left(\\Sigma x_i^2\\right) \\cdot n$ — the bars vanish under the square ($|t|^2 = t^2$).',
          'The equality case: 4.3’s discipline — the lists proportional; against the all-ones list this forces $|x_i| = \\lambda$ for every $i$ — all magnitudes equal.',
          'Witness $(1, 2, -4)$: $\\Sigma|x_i| = 7$ gives $49$ against $3(1 + 4 + 16) = 63$ — strict, magnitudes unequal.',
          'Witness $(3, -3, 3)$: $\\Sigma|x_i| = 9$ gives $81$ against $3 \\cdot 27 = 81$ — equality, the list sits at one size.',
        ], answer: 'the bridge holds with equality exactly on equal-magnitude lists; $(1, 2, -4)$: $49 < 63$; $(3, -3, 3)$: $81 = 81$' },
        { q: 'Solve $|x - 1| + |x - 2| \\geq 4$ — a two-arm inequality with a WEAK direction.', solution: [
          'The floor: the detour tax gives $|x - 1| + |x - 2| \\geq |2 - 1| = 1$ — so on the segment $[1, 2]$ the cost is exactly $1$ and the claim $\\geq 4$ fails there.',
          'Split by cases. Case $x < 1$: the arms are $1 - x$ and $2 - x$, so the cost is $3 - 2x \\geq 4 \\iff -2x \\geq 1 \\iff x \\leq -\\tfrac12$ (a negative strike flips the sign — AL 7.1’s law) — and $-\\tfrac12 < 1$, so this piece survives inside its case.',
          'Case $1 \\leq x \\leq 2$: the cost is $1$ — never $\\geq 4$; this segment contributes nothing.',
          'Case $x > 2$: the arms are $x - 1$ and $x - 2$, so the cost is $2x - 3 \\geq 4 \\iff x \\geq \\tfrac72$ — and $\\tfrac72 > 2$, consistent.',
          'Check the seats: $x = -\\tfrac12$ gives $\\tfrac32 + \\tfrac52 = 4$ — kept by the weak direction; $x = 2$ (the dead segment’s end) gives $1 + 0 = 1$ — honestly out; $x = 4$ gives $3 + 2 = 5$ — in.',
        ], answer: '$\\left(-\\infty,\\ -\\tfrac12\\right] \\cup \\left[\\tfrac72,\\ \\infty\\right)$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the generalized triangle inequality $|a_1 + a_2 + \\cdots + a_n| \\leq |a_1| + |a_2| + \\cdots + |a_n|$ by induction, and pin the equality case (all non-zero terms on one side of zero). Witness on the lists $(2, 3, 4)$ and $(2, -3, 4)$.', solution: [
          'Base $n = 1$: $|a_1| \\leq |a_1|$ — equality, trivially.',
          'Inductive step: write the $n$-term sum as a two-term sum — $a_1 + \\cdots + a_n = (a_1 + \\cdots + a_{n-1}) + a_n$ — and apply the two-term law: $|\\Sigma_{i \\leq n} a_i| \\leq |\\Sigma_{i \\leq n-1} a_i| + |a_n| \\leq \\left(\\Sigma_{i \\leq n-1} |a_i|\\right) + |a_n|$ — the first inequality is the lesson’s law, the second the induction hypothesis.',
          'The equality case: equality in the step needs BOTH the partial sum and $a_n$ same-direction AND equality in the hypothesis — descending, this forces every non-zero term onto one side of zero; conversely, one-sided terms have all $a_i a_j \\geq 0$, and each two-term step is tight.',
          'Witness $(2, 3, 4)$: $|9| = 9 = 2 + 3 + 4$ — equality, one-sided terms.',
          'Witness $(2, -3, 4)$: $|3| = 3 < 2 + 3 + 4 = 9$ — strict, the signs mix.',
        ], answer: 'the generalized law holds for every $n$; equality iff all non-zero terms share one sign — $(2, 3, 4)$: $9 = 9$; $(2, -3, 4)$: $3 < 9$' },
        { q: 'Given $|x - 3| < 0.5$ and $|y - 3| < 0.2$: bound $|x - y|$ above, bound $|x + y - 6|$ above, and locate $|x|$ in an interval — the approximation reads the reverse law serves.', solution: [
          'Bound $|x - y|$: write $x - y = (x - 3) - (y - 3)$ and apply the triangle inequality: $|x - y| \\leq |x - 3| + |y - 3| < 0.5 + 0.2 = 0.7$.',
          'Bound $|x + y - 6|$: write $x + y - 6 = (x - 3) + (y - 3)$ — the same move: $|x + y - 6| \\leq |x - 3| + |y - 3| < 0.7$.',
          'Locate $|x|$: the reverse law gives $\\big||x| - |3|\\big| \\leq |x - 3| < 0.5$, so $2.5 < |x| < 3.5$.',
          'The honesty note: the two error windows never enter separately — every bound is the SUM of the windows, because the triangle inequality prices the worst alignment; the reverse law prices the best.',
          'Witness: $x = 3.4, y = 3.1$ (inside the windows) give $|x - y| = 0.3 < 0.7$, $|x + y - 6| = 0.5 < 0.7$, $|x| = 3.4 \\in (2.5, 3.5)$ — the bounds hold with room.',
        ], answer: '$|x - y| < 0.7$, $|x + y - 6| < 0.7$, and $|x| \\in (2.5,\\ 3.5)$' },
      ] },
    ] },
  ],
}

/* figures for lesson 4.6 — both plates in the vivid figure palette only  */

function sameDirectionPlateSvg(): string {
  // one plate, two number lines: same direction (a = 3, b = 2, a + b = 5 —
  // the arms tile the direct gap, equality); opposite directions
  // (a = 3, b = −2, a + b = 1 — the |b| arm retraces part of |a|, the
  // strict tax). Scale: x ∈ [−3, 6] → px 240 + 60x.
  const X = (x: number): number => 240 + 60 * x
  const axis = (y: number): string =>
    `<line x1="48" y1="${y}" x2="612" y2="${y}" stroke="#0d9488" stroke-width="2.2"/>` +
    `<polygon points="624,${y} 612,${y - 6} 612,${y + 6}" fill="#0d9488"/>` +
    `<polygon points="36,${y} 48,${y - 6} 48,${y + 6}" fill="#0d9488"/>`
  const ticks = (y: number): string =>
    [-2, -1, 0, 1, 2, 3, 4, 5, 6]
      .map(
        (t) =>
          `<line x1="${X(t)}" y1="${y}" x2="${X(t)}" y2="${y + 6}" stroke="#0d9488" stroke-width="1.3"/>` +
          `<text x="${X(t)}" y="${y + 20}" font-size="10" text-anchor="middle" fill="#0f766e">${t}</text>`
      )
      .join('')
  const dot = (x: number, y: number, r: number, fill: string): string =>
    `<circle cx="${X(x)}" cy="${y}" r="${r}" fill="${fill}"/>`
  // panel A — same direction
  const panelA =
    `<text x="330" y="30" font-size="12.5" font-weight="700" text-anchor="middle" fill="#166534">same direction (ab ≥ 0): the arms tile the direct gap — equality</text>` +
    axis(100) +
    ticks(100) +
    `<line x1="${X(0)}" y1="80" x2="${X(5)}" y2="80" stroke="#ea580c" stroke-width="5" stroke-linecap="round"/>` +
    `<line x1="${X(0)}" y1="74" x2="${X(0)}" y2="86" stroke="#ea580c" stroke-width="1.5"/>` +
    `<line x1="${X(5)}" y1="74" x2="${X(5)}" y2="86" stroke="#ea580c" stroke-width="1.5"/>` +
    `<text x="${X(2.5)}" y="68" font-size="11" font-weight="700" text-anchor="middle" fill="#ea580c">the direct gap |a + b| = 5</text>` +
    `<line x1="${X(0)}" y1="112" x2="${X(3)}" y2="112" stroke="#d97706" stroke-width="4.5" stroke-linecap="round"/>` +
    `<text x="${X(1.5)}" y="127" font-size="10.5" font-weight="700" text-anchor="middle" fill="#d97706">|a| = 3</text>` +
    `<line x1="${X(3)}" y1="112" x2="${X(5)}" y2="112" stroke="#65a30d" stroke-width="4.5" stroke-linecap="round"/>` +
    `<text x="${X(4)}" y="127" font-size="10.5" font-weight="700" text-anchor="middle" fill="#65a30d">|b| = 2</text>` +
    dot(2, 100, 6, '#ea580c') +
    dot(3, 100, 6, '#ea580c') +
    dot(5, 100, 6, '#ea580c') +
    dot(0, 100, 4.5, '#16a34a') +
    `<text x="${X(2)}" y="95" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">b</text>` +
    `<text x="${X(3)}" y="95" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">a</text>` +
    `<text x="${X(5)}" y="95" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">a + b</text>` +
    `<text x="330" y="152" font-size="11.5" font-weight="700" text-anchor="middle" fill="#16a34a">|3 + 2| = 5 = 3 + 2 — EQUALITY: ab = 6 ≥ 0, no retrace</text>`
  // panel B — opposite directions, the arms retrace
  const panelB =
    `<text x="330" y="192" font-size="12.5" font-weight="700" text-anchor="middle" fill="#166534">opposite directions (ab &lt; 0): the arms retrace — the tax</text>` +
    `<rect x="${X(1)}" y="256" width="${60 * 2}" height="40" fill="#fef3c7"/>` +
    axis(250) +
    ticks(250) +
    `<text x="${X(2)}" y="231" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">a + b</text>` +
    `<text x="${X(3)}" y="231" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">a</text>` +
    `<text x="${X(-2)}" y="231" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">b</text>` +
    `<line x1="${X(3)}" y1="264" x2="${X(1)}" y2="264" stroke="#65a30d" stroke-width="4.5" stroke-linecap="round"/>` +
    `<polygon points="${X(1) - 7},264 ${X(1) + 5},258 ${X(1) + 5},270" fill="#65a30d"/>` +
    `<text x="${X(2)}" y="279" font-size="10.5" font-weight="700" text-anchor="middle" fill="#65a30d">|b| = 2, walked backward</text>` +
    `<line x1="${X(0)}" y1="292" x2="${X(3)}" y2="292" stroke="#d97706" stroke-width="4.5" stroke-linecap="round"/>` +
    `<text x="${X(1.5)}" y="307" font-size="10.5" font-weight="700" text-anchor="middle" fill="#d97706">|a| = 3</text>` +
    `<line x1="${X(0)}" y1="250" x2="${X(1)}" y2="250" stroke="#ea580c" stroke-width="5" stroke-linecap="round"/>` +
    `<text x="${X(0.5)}" y="240" font-size="11" font-weight="700" text-anchor="middle" fill="#ea580c">|a + b| = 1</text>` +
    dot(-2, 250, 6, '#ea580c') +
    dot(1, 250, 6, '#ea580c') +
    dot(3, 250, 6, '#ea580c') +
    dot(0, 250, 4.5, '#16a34a') +
    `<text x="330" y="332" font-size="11.5" font-weight="700" text-anchor="middle" fill="#dc2626">|3 + (−2)| = 1 &lt; 3 + 2 = 5 — STRICT: the tax (ab = −6 &lt; 0) collects 4</text>`
  return `<svg viewBox="0 0 720 352" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The triangle inequality on the number line, two cases on one plate. Top number line, same direction: a equals 3 and b equals 2, both right of zero; the amber arm of length 3 from zero to a and the lime arm of length 2 from a to a plus b tile the direct orange gap of length 5 from zero to a plus b, and the verdict is equality since ab equals six is non-negative. Bottom number line, opposite directions: a equals 3 rightward and b equals minus 2 leftward; the lime arm of length 2 is walked backward from a, retracing part of the amber arm of length 3 shown below the line, while the direct orange gap collapses to length 1; the verdict is strict, the tax, since ab is negative.">
  ${panelA}
  ${panelB}
  <text x="330" y="348" font-size="10.5" text-anchor="middle" fill="#0f766e">the triangle inequality on the line: |a + b| ≤ |a| + |b| — equality exactly when a and b point the same way</text>
</svg>`
}

function detourTaxSvg(): string {
  // the detour tax with a = 1 and b = 7 (direct gap 6): top, x = 4 between
  // — the arms tile the gap (equality); bottom, x = 9 outside — the
  // overshoot beyond b is priced on both arms (the strict tax).
  // Scale: x ∈ [−1, 10] → px 70 + 55x.
  const X = (x: number): number => 70 + 55 * x
  const axis = (y: number): string =>
    `<line x1="58" y1="${y}" x2="632" y2="${y}" stroke="#0d9488" stroke-width="2.2"/>` +
    `<polygon points="644,${y} 632,${y - 6} 632,${y + 6}" fill="#0d9488"/>` +
    `<polygon points="46,${y} 58,${y - 6} 58,${y + 6}" fill="#0d9488"/>`
  const ticks = (y: number): string =>
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      .map(
        (t) =>
          `<line x1="${X(t)}" y1="${y}" x2="${X(t)}" y2="${y + 6}" stroke="#0d9488" stroke-width="1.3"/>` +
          `<text x="${X(t)}" y="${y + 20}" font-size="9.5" text-anchor="middle" fill="#0f766e">${t}</text>`
      )
      .join('')
  const dot = (x: number, y: number, r: number, fill: string): string =>
    `<circle cx="${X(x)}" cy="${y}" r="${r}" fill="${fill}"/>`
  // panel A — x between a and b: the arms tile the gap
  const panelA =
    `<text x="345" y="30" font-size="12.5" font-weight="700" text-anchor="middle" fill="#166534">x between a and b (a = 1, b = 7, x = 4): the two arms tile the gap — equality</text>` +
    axis(100) +
    ticks(100) +
    `<line x1="${X(1)}" y1="80" x2="${X(7)}" y2="80" stroke="#ea580c" stroke-width="5" stroke-linecap="round"/>` +
    `<line x1="${X(1)}" y1="74" x2="${X(1)}" y2="86" stroke="#ea580c" stroke-width="1.5"/>` +
    `<line x1="${X(7)}" y1="74" x2="${X(7)}" y2="86" stroke="#ea580c" stroke-width="1.5"/>` +
    `<text x="${X(4)}" y="68" font-size="11" font-weight="700" text-anchor="middle" fill="#ea580c">the direct gap |a − b| = 6</text>` +
    `<line x1="${X(1)}" y1="112" x2="${X(4)}" y2="112" stroke="#d97706" stroke-width="4.5" stroke-linecap="round"/>` +
    `<text x="${X(2.5)}" y="127" font-size="10.5" font-weight="700" text-anchor="middle" fill="#d97706">|x − a| = 3</text>` +
    `<line x1="${X(4)}" y1="112" x2="${X(7)}" y2="112" stroke="#65a30d" stroke-width="4.5" stroke-linecap="round"/>` +
    `<text x="${X(5.5)}" y="127" font-size="10.5" font-weight="700" text-anchor="middle" fill="#65a30d">|x − b| = 3</text>` +
    dot(1, 100, 6, '#ea580c') +
    dot(4, 100, 6, '#ea580c') +
    dot(7, 100, 6, '#ea580c') +
    dot(0, 100, 4.5, '#16a34a') +
    `<text x="${X(1)}" y="95" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">a</text>` +
    `<text x="${X(4)}" y="95" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">x</text>` +
    `<text x="${X(7)}" y="95" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">b</text>` +
    `<text x="345" y="152" font-size="11.5" font-weight="700" text-anchor="middle" fill="#16a34a">3 + 3 = 6 — EQUALITY: every x on [a, b] pays exactly the direct gap</text>`
  // panel B — x outside the segment: the overshoot priced twice
  const panelB =
    `<text x="345" y="192" font-size="12.5" font-weight="700" text-anchor="middle" fill="#166534">x outside [a, b] (x = 9): the arms overshoot — the tax</text>` +
    `<rect x="${X(7)}" y="256" width="${55 * 2}" height="44" fill="#fef3c7"/>` +
    axis(250) +
    ticks(250) +
    `<text x="${X(8)}" y="253" font-size="9.5" font-weight="700" text-anchor="middle" fill="#d97706">the overshoot</text>` +
    `<text x="${X(1)}" y="231" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">a</text>` +
    `<text x="${X(7)}" y="231" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">b</text>` +
    `<text x="${X(9)}" y="231" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">x</text>` +
    `<line x1="${X(1)}" y1="264" x2="${X(9)}" y2="264" stroke="#d97706" stroke-width="4.5" stroke-linecap="round"/>` +
    `<text x="${X(5)}" y="279" font-size="10.5" font-weight="700" text-anchor="middle" fill="#d97706">|x − a| = 8</text>` +
    `<line x1="${X(7)}" y1="292" x2="${X(9)}" y2="292" stroke="#65a30d" stroke-width="4.5" stroke-linecap="round"/>` +
    `<polygon points="${X(9) + 7},292 ${X(9) - 5},286 ${X(9) - 5},298" fill="#65a30d"/>` +
    `<text x="${X(8)}" y="307" font-size="10.5" font-weight="700" text-anchor="middle" fill="#65a30d">|x − b| = 2</text>` +
    `<line x1="${X(1)}" y1="250" x2="${X(7)}" y2="250" stroke="#ea580c" stroke-width="5" stroke-linecap="round"/>` +
    `<text x="${X(4)}" y="240" font-size="11" font-weight="700" text-anchor="middle" fill="#ea580c">the direct gap |a − b| = 6</text>` +
    dot(1, 250, 6, '#ea580c') +
    dot(7, 250, 6, '#ea580c') +
    dot(9, 250, 6, '#ea580c') +
    dot(0, 250, 4.5, '#16a34a') +
    `<text x="345" y="332" font-size="11.5" font-weight="700" text-anchor="middle" fill="#dc2626">8 + 2 = 10 &gt; 6 — the outside seat pays the gap plus the overshoot twice</text>`
  return `<svg viewBox="0 0 720 352" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The detour tax on the number line with a equal to one and b equal to seven. Top number line, x equal to four between them: the amber arm from a to x of length three and the lime arm from x to b of length three tile the direct orange gap of length six from a to b, and the cost equals the gap — equality. Bottom number line, x equal to nine outside the segment: the amber arm from a to x of length eight runs past b, the lime arm of length two counts the overshoot beyond b again, and the cost of ten exceeds the direct gap of six — the strict tax, with the overshoot region shaded.">
  ${panelA}
  ${panelB}
  <text x="345" y="348" font-size="10.5" text-anchor="middle" fill="#0f766e">the detour tax |x − a| + |x − b| ≥ |a − b| — equality exactly on the segment between a and b</text>
</svg>`
}



/** 4.R — authored 2026-11-18 by the parallel swarm’s review agent (owner chat
 *  directive: “launch multiple agents for authoring lessons”); engine sections
 *  M/N green in v4R.ts before this prose was declared done (bun
 *  scripts/aa-ch04-work/run-4R.ts: M 141/141 — every number on the page
 *  recomputed AND cross-checked against the six imported sibling lessons
 *  (titles, ids, the six real quiz keys, exercise censuses, prereq spine);
 *  N 60/60 — the structural pins). The engines caught real drafting slips
 *  before the prose was declared done: the M₀ rung computed through the
 *  r = 0 formula (NaN — the honest limit rung must be read as the geometric
 *  mean), the root-family bench sweep run on a + b = 100 instead of the
 *  priced a + b = 10, two ties pinned with exact float === where √5·√20 and
 *  3/(1/5+1/5+1/5) each land one ulp off, the 1-decimal witnesses
 *  39.1 / 65.9 priced at a 0.01 tolerance where the honest rounding needs
 *  0.05, the missing Numerical-Value typology item (the L5 three-arm
 *  minimum re-labelled as it), FM 7.4 named only in the terms block rather
 *  than in prose, and the reunion-ladder figure’s fourth bar carrying the
 *  third bar’s value — all fixed and pinned. The sibling-source census also
 *  surfaced the honest contract: 4.4/4.5 carry the proposed canon keys the
 *  orchestrator banks at close, so the engine whitelists whitelist ∪
 *  proposed-to-be-banked. Quiz keys [2, 0, 1, 3, 1];
 *  15 exercises L1–L6 = 2/2/3/3/3/2 — the MIXED BENCH, several engines
 *  priced per exhibit, the Cengage typology at L4–L6 all labelled
 *  exam-style; 2 original SVG figures (the engine-map decision diagram; the
 *  reunion ladder of the tuple (1, 2, 3)) on the vivid palette only; 8
 *  Illustrations (six re-audited witnesses — one per engine — plus “one
 *  machine, six readings” and “one constraint, four engines”); 3
 *  one-line-recall derivations (the refusal discipline: nothing re-derived
 *  that a lesson proved once — each step a pointer); 8 formula cards (the
 *  consolidated laws); 6 tagged equations; the two master tables; 9 terms;
 *  the m4-01 review-page fold served (Real Number System and Inequalities
 *  named in prose + the order-law bench exercise L3); 10,135 honest words
 *  by countLessonWords (pinned by engine check N48, floor 4,000). */

/* ------------------------------------------------------------------ */
/* figure helpers — original SVG, vivid palette only (BOOK_FORMAT.md)  */
/* ------------------------------------------------------------------ */

function engineMapSvg(): string {
  // the decision diagram: the exhibit you face → six engines → the order
  // ground underneath (the Real Number System and Inequalities line).
  const box = (x: number, y: number, w: number, h: number, title: string, l1: string, l2: string, l3: string): string => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="#fef3c7" stroke="#16a34a" stroke-width="1.8"/>
  <text x="${x + w / 2}" y="${y + 20}" font-size="12.5" font-weight="700" text-anchor="middle" fill="#166534">${title}</text>
  <text x="${x + w / 2}" y="${y + 38}" font-size="10" text-anchor="middle" fill="#65a30d">${l1}</text>
  <text x="${x + w / 2}" y="${y + 53}" font-size="10" text-anchor="middle" fill="#65a30d">${l2}</text>
  <text x="${x + w / 2}" y="${y + 68}" font-size="10" text-anchor="middle" fill="#0f766e">${l3}</text>`
  return `<svg viewBox="0 0 900 560" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The engine map decision diagram. One question at the top — the exhibit you face — routes by its shape to one of six engine boxes: AM-GM for a fixed sum with a symmetric product, the weighted AM-GM for an asymmetric product, Cauchy-Schwarz and Engel for dot products and fraction sums, rearrangement and Chebyshev for sorted lists and pairing choice, Jensen for curved shape, and the triangle family for distance bounds. Under all six boxes runs the ground bar — the ordered real-number system, the Real Number System and Inequalities line — whose trichotomy and sign laws every engine stands on.">
  <text x="450" y="24" font-size="13.5" font-weight="700" text-anchor="middle" fill="currentColor">the engine map — the shape you face routes to its engine</text>
  <rect x="330" y="40" width="240" height="52" rx="9" fill="#ffedd5" stroke="#16a34a" stroke-width="2"/>
  <text x="450" y="62" font-size="12.5" font-weight="700" text-anchor="middle" fill="#166534">the exhibit you face</text>
  <text x="450" y="80" font-size="10" text-anchor="middle" fill="#0f766e">name the shape first, reach second</text>
  ${box(40, 150, 265, 86, 'AM-GM (4.1)', 'fixed sum, symmetric product', 'fixed product, minimum sum', 'the square certificate ties at a = b')}
  ${box(40, 262, 265, 86, 'the weighted AM-GM (4.2)', 'asymmetric product', 'the exponent-priced split a : b', 'the ladder H ≤ G ≤ A ≤ Q')}
  ${box(40, 374, 265, 86, 'Jensen (4.5)', 'curved shape → the chord', 'cups read ≤, caps read ≥', 'the sine cap: 3√3 / 2')}
  ${box(595, 150, 265, 86, 'Cauchy-Schwarz + Engel (4.3)', 'dot product → the list-sizes', 'fraction sum → the floor', 'ties at proportional lists')}
  ${box(595, 262, 265, 86, 'rearrangement + Chebyshev (4.4)', 'sorted lists, a pairing to choose', 'the sorted pairing is the max', 'the direction follows the sort')}
  ${box(595, 374, 265, 86, 'the triangle family (4.6)', 'distance bound → the band', 'the verdicts |f| &lt; g, |f| &gt; g', 'the detour tax: |x−a| + |x−b|')}
  <g stroke="#d97706" stroke-width="1.6" fill="none">
    <path d="M400 92 C 340 118, 260 128, 172 150"/>
    <path d="M450 92 C 450 120, 172 118, 172 262"/>
    <path d="M500 92 C 560 118, 660 128, 728 150"/>
    <path d="M500 92 C 560 150, 700 190, 728 262"/>
    <path d="M450 92 C 450 190, 300 260, 172 374"/>
    <path d="M500 92 C 560 220, 680 300, 728 374"/>
  </g>
  <g fill="#d97706" font-size="9.5">
    <polygon points="172,150 165,140 179,140"/>
    <polygon points="172,262 165,252 179,252"/>
    <polygon points="728,150 721,140 735,140"/>
    <polygon points="728,262 721,252 735,252"/>
    <polygon points="172,374 165,364 179,364"/>
    <polygon points="728,374 721,364 735,364"/>
  </g>
  <g stroke="#0d9488" stroke-width="1.3" stroke-dasharray="5 5" fill="none">
    <path d="M172 460 V 480"/>
    <path d="M728 460 V 480"/>
  </g>
  <rect x="40" y="480" width="820" height="62" rx="9" fill="#ffedd5" stroke="#0d9488" stroke-width="1.8"/>
  <text x="450" y="503" font-size="12" font-weight="700" text-anchor="middle" fill="#0f766e">the ordered real-number system — the ground: the Real Number System and Inequalities line</text>
  <text x="450" y="522" font-size="10" text-anchor="middle" fill="#0f766e">trichotomy · the sign discipline · a strike by a negative flips · a real square is never negative</text>
  <text x="450" y="538" font-size="9.5" text-anchor="middle" fill="#65a30d">every engine box above stands on this ground — no certificate in the room is read without it</text>
</svg>`
}

function reunionLadderSvg(): string {
  // the power-mean ladder of the tuple (1, 2, 3): four rungs, three engines
  // meeting on them, M0 marked as the honest limit rung.
  const bars: { label: string; sub: string; val: string; inner: string; h: number; fill: string }[] = [
    { label: 'H = 18/11', sub: '≈ 1.64', val: 'r = −1', inner: '≈ 1.64', h: 87, fill: '#16a34a' },
    { label: 'G = 6^(1/3)', sub: '≈ 1.82 · the limit rung', val: 'r = 0', inner: '≈ 1.82', h: 123, fill: '#d97706' },
    { label: 'A = 2', sub: 'the equal split', val: 'r = 1', inner: '2', h: 160, fill: '#16a34a' },
    { label: 'Q = (14/3)^(1/2)', sub: '≈ 2.16', val: 'r = 2', inner: '≈ 2.16', h: 192, fill: '#16a34a' },
  ]
  const xs = [95, 245, 395, 545]
  let inner = ''
  for (let i = 0; i < 4; i++) {
    const b = bars[i]
    const x = xs[i]
    const top = 280 - b.h
    inner += `
  <rect x="${x}" y="${top}" width="92" height="${b.h}" rx="4" fill="${b.fill}" opacity="0.92"/>
  <text x="${x + 46}" y="${top - 26}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#166534">${b.label}</text>
  <text x="${x + 46}" y="${top - 11}" font-size="9.5" text-anchor="middle" fill="#0f766e">${b.sub}</text>
  <text x="${x + 46}" y="${top + 18}" font-size="10.5" font-weight="700" text-anchor="middle" fill="#ffffff">${b.inner}</text>
  <text x="${x + 46}" y="298" font-size="10.5" font-weight="700" text-anchor="middle" fill="#166534">${b.val}</text>`
  }
  return `<svg viewBox="0 0 700 372" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The reunion ladder: the power-mean ladder of the tuple one, two, three at four rungs — the harmonic mean eighteen elevenths about one point six four, the geometric mean the cube root of six about one point eight two marked as the honest limit rung, the arithmetic mean two, and the quadratic mean the square root of fourteen thirds about two point one six. Climb the order r and the mean climbs — one monotone law; three different engines prove its rungs, and all four rungs meet only at an all-equal tuple.">
  <text x="350" y="24" font-size="13.5" font-weight="700" text-anchor="middle" fill="currentColor">the reunion ladder — the tuple (1, 2, 3) at four rungs</text>
  ${inner}
  <path d="M141 186 C 260 130, 420 110, 591 76" stroke="#ea580c" stroke-width="2" fill="none" stroke-dasharray="7 6"/>
  <polygon points="591,76 578,72 583,85" fill="#ea580c"/>
  <text x="366" y="108" font-size="10.5" font-weight="700" fill="#ea580c" text-anchor="middle">climb the order r and the mean climbs — one monotone law</text>
  <path d="M60 280 H 660" stroke="#0d9488" stroke-width="2"/>
  <text x="660" y="296" font-size="10" font-weight="700" text-anchor="end" fill="#0f766e">the order r</text>
  <text x="350" y="322" font-size="9.5" text-anchor="middle" fill="#0f766e">M(−1) ≤ M(0) by reciprocals (4.1) · M(0) ≤ M(1) is AM-GM itself · M(1) ≤ M(2) by the variance square (4.2), the all-ones Cauchy read (4.3), and Jensen on x² (4.5)</text>
  <text x="350" y="340" font-size="9.5" text-anchor="middle" fill="#0f766e">the r = 0 rung is read honestly as the limit — the logarithm of chapter 9 certifies it in one line</text>
  <text x="350" y="358" font-size="9.5" text-anchor="middle" fill="#65a30d">at the all-equal tuple every rung reads the same value — the rungs meet only there</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 4.R — Unit 4 Completion Review                               */
/* ------------------------------------------------------------------ */

 const lessonReview4: Lesson = {
  id: 'aa-classical-inequalities-unit-4-review',
  number: '4.R',
  title: 'Unit 4 Completion Review',
  concepts: [
    'the arc of the chapter: six engines, one room — the square, the weight, the list, the pairing, the chord and the bar',
    'the engine map: fixed sum → AM-GM; asymmetric product → the weighted split; fraction sum → Engel; sorted lists → rearrangement and Chebyshev; curved shape → Jensen; distance bound → the triangle family',
    'the two master tables: the classical family census (statement, equality case, when to reach) and the decision table that routes a shape to its engine',
    'the one discipline behind every proof: manufacture a non-negative quantity, then read its sign',
    'the equality discipline as the chapter’s priced habit — every floor and ceiling states the seat where it dies',
    'the mixed bench: examination items that price several engines in one exhibit — the way the hall actually prices a chapter',
    'the order ground: the Real Number System and Inequalities line under all six engines (the m4-01 fold)',
  ],
  objectives: [
    'hold the whole chapter in one hand — the wiring of its six engines, the promises made early and cashed late, and where each master table row lives',
    'name which engine a question wants from its shape alone — fixed sum, asymmetric product, fraction sum, dot product, sorted lists, curved shape, distance — and run it at examination speed',
    'recall the consolidated laws and the two master tables without re-deriving them, equality cases included',
    'solve mixed items that price several engines in one machine, and diagnose every miss back to its home lesson',
    'state the chapter’s honest boundaries: what rides the algebra bank in the 2026 examinations, what was deferred to chapters 5, 7 and 9, and what the order ground of the real number system carries',
  ],
  prerequisites: [
    'aa-the-arithmetic-geometric-mean-inequality',
    'aa-the-weighted-am-gm-and-its-consequences',
    'aa-cauchy-schwarz-and-engels-form',
    'aa-the-rearrangement-and-chebyshev-inequalities',
    'aa-jensens-inequality-and-convexity',
    'aa-absolute-value-at-depth-the-triangle-inequality',
  ],
  sources: ['cengage-m2-06', 'cengage-jee-style', 'ncert-math11-ch5-linear-inequalities', 'jee-main-2026-syllabus', 'khattar-qa-4e'],
  blocks: [
    { kind: 'para', text: 'Elementary Algebra settled order on the line — how a linear inequality is solved, how compounds intersect and union, what a strike by a negative does to a direction — and Advanced Algebra 2.1 priced its parabolas’ peaks by completing the square. Between those two banked disciplines sat a class of questions neither could touch: the least value of $x + \\dfrac{36}{x}$, the greatest product under a fixed sum, the maximum of an asymmetric monomial on a priced line, the floor of a fraction sum, the best pairing of two lists, the ceiling on a sum of sines, the shortest a route can be charged. This chapter built the engine that prices every one of them without one derivative taken and without one square completed: six engines, one room. The room is now walked.' },
    { kind: 'para', text: 'A review in this book does two things and refuses a third. It RE-MAPS the chapter — the arc from the two-number means to the distance bounds, the promises made early and cashed late (the Cauchy-Schwarz bridge lesson 4.3 named forward and 4.6 cashed; the convexity of $|x|$ 4.5 named and 4.6 inherited; the triangle inequality of 3.2 cross-referenced as the same law on the plane), the two master tables that reunite the classical family with the engine map that routes a shape to its engine. And it runs a MIXED census: the witnesses below deliberately price several engines in one exhibit, and the fifteen-question bench prices several storeys per item, because that is exactly how an examination prices a chapter — one machine arrives, and every reading the chapter owns is asked of it in turn. What the review refuses: re-proving what the lessons already proved. Every derivation below is one line of recall with a pointer to its lesson; nothing is re-derived that 4.1 through 4.6 established once. The engines re-ran every number on this page — the means, the certificates, the pairing censuses, the chord drops, the sine taxes, the bands — before a word of it was written.' },
    { kind: 'para', text: 'The map first, then the tables, then the witnesses, then the laws, then the traps, then the mixed bench. Read the wiring diagram once before the exercises and once after: the second reading should look shorter.' },

    { kind: 'heading', text: 'The Arc: Six Engines, One Room' },
    { kind: 'para', text: 'Storey one (4.1, “The Arithmetic-Geometric Mean Inequality”) built the gear the whole engine turns on: the three simple means of a positive pair, the order $A \\geq G \\geq H$ proved twice over from squares that cannot be negative, the equality case carried as a certificate $(\\sqrt{a} - \\sqrt{b})^2 = 0$ rather than a slogan, the doubling ladder to every power of two, and the fixed-sum / fixed-product discipline — maxima and minima priced by order alone, the vertex craft of AA 2.1 generalised past the parabola. Storey two (4.2, “The Weighted AM-GM and Its Consequences”) weighted the gear: a weight is a repetition, so the weighted law is 4.1’s plain law read on a replicated list — nothing new assumed — then rational weights by scaling, the real-weight doorstep honestly named for chapter 9’s logarithm, the power-mean ladder $M_r$ unifying $H \\leq G \\leq A \\leq Q$ as one monotone law, and the consequences engine: normalization and the exponent-priced splits. Storey three (4.3, “Cauchy-Schwarz and Engel’s Form”) turned the engine outward, onto two lists at once: the dot product capped by the product of the list-sizes, PROVED by the AL 9.3 discriminant discipline one storey higher ($\\sum (a_it + b_i)^2 \\geq 0$ for every real $t$), the equality case read off the double root — proportional lists — the all-ones read that rereads the ladder’s $M_2 \\geq M_1$ rung, and Engel’s form, the fraction-sum speed tool the training banks nickname Titu’s lemma.' },
    { kind: 'para', text: 'Storey four (4.4, “The Rearrangement and Chebyshev Inequalities”) priced the one thing no earlier engine could see — the CHOICE of pairing: the sorted dot product is the ceiling over all arrangements, the reversed the floor, proved by the exchange argument (uncrossing an inversion never loses, one swap certificate at a time), and Chebyshev’s sum inequality fell out of it by the cyclic table: the average of the products beats the product of the averages for similarly sorted lists. Storey five (4.5, “Jensen’s Inequality and Convexity”) priced SHAPE: convexity through chords, the algebraic certificate for the cup $x^2$ (one completed square — the same discipline that paid every $A \\geq G$ since 4.1), Jensen’s inequality as the definition cashed as a theorem, the concave flip carrying the sine-cap witness $\\sin A + \\sin B + \\sin C \\leq \\tfrac{3\\sqrt{3}}{2}$, and the reunion: Jensen on $x^2$ IS the QM–AM rung of 4.2’s ladder. Storey six (4.6, “Absolute Value at Depth: the Triangle Inequality”) priced DISTANCE: FM 7.4’s distance read reread as a bound machine — the $|f| < g$ and $|f| > g$ verdicts on AL 7.3’s compound engine with the degenerate seats pinned, the triangle inequality proved by squaring (lawful exactly because both sides are non-negative), the reverse form and the detour tax, the Cauchy-Schwarz bridge cashed on magnitude lists, and the complex law of 3.2 cross-referenced as the same engine one dimension up.' },
    { kind: 'para', text: 'And under all six storeys, one ground: the ordered real-number system — the survey’s “Real Number System and Inequalities” line, the m4-01 fold this review carries. Trichotomy (every real quantity is positive, negative or zero, exactly one) is what lets a certificate be read as a verdict; the sign discipline (a strike by a negative flips an order; a real square is never negative) is what makes every proof in the room work; the non-negativity licence (squaring preserves order exactly on non-negative members) is what made 4.6’s proof lawful and what the traps below price when it is skipped. The chapter never re-taught that ground — AL 7.1 through 7.3 own it — but no engine in the room runs without it. This review names the ground once, prices it in the traps, and gives it an exercise of its own in the bench.' },
    { kind: 'para', text: 'For example, the whole map in one roster — each row a shape, an engine, and a verdict this review’s engines re-ran before the prose was fixed:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) a fixed sum with a symmetric product → AM-GM (4.1): the perimeter-36 fence tops out at area $81$, the $9 \\times 9$ square;',
      '(ii) an asymmetric product → the weighted split (4.2): $x^3y$ on $x + y = 5$ tops out at $\\tfrac{16875}{256} \\approx 65.9$ at the $3 : 1$ seat;',
      '(iii) a fraction sum → Engel (4.3): $\\tfrac{2}{x} + \\tfrac{8}{y} \\geq 3$ on $x + y = 6$, attained at $(2, 4)$;',
      '(iv) a dot product of two lists → Cauchy-Schwarz (4.3): $32 \\leq \\sqrt{1078}$ on $(1,2,3)$ against $(4,5,6)$, a tie at proportionality;',
      '(v) sorted lists, a pairing to choose → rearrangement (4.4): $140$ the ceiling against $100$ the floor — the choice is worth $40$;',
      '(vi) a curved graph between seats → Jensen (4.5): the sine cap $2.465 \\leq 2.598$ on the $35^\\circ$–$65^\\circ$–$80^\\circ$ triangle;',
      '(vii) a distance bound → the triangle family (4.6): the band $[5, 13]$ for $|a+b|$ at $|a| = 4$, $|b| = 9$, and the detour tax $|x-2| + |x+3| \\geq 5$ on $[-3, 2]$.'
    ] },
    { kind: 'figure', caption: 'The engine map as a decision diagram: the exhibit you face routes by its shape to one of six engine boxes — AM-GM for a fixed sum with a symmetric product, the weighted AM-GM for an asymmetric product, Cauchy-Schwarz and Engel for dot products and fraction sums, rearrangement and Chebyshev for sorted lists and a pairing to choose, Jensen for a curved shape, the triangle family for a distance bound. Under all six boxes runs the ground bar: the ordered real-number system — the Real Number System and Inequalities line — whose trichotomy and sign laws every certificate in the room is read through. Name the shape first; reach for the engine second.', svg: engineMapSvg() },
    { kind: 'callout', tone: 'definition', title: 'The six engines of the classical room', text: 'The chapter’s architecture, stated once as a definition. An ENGINE of this chapter is one machine that prices a family of bounds: (i) the MEAN engine — $A \\geq G \\geq H$ with its square certificate, the fixed-sum and fixed-product discipline; (ii) the WEIGHTED engine — weights as repetitions, the power-mean ladder, normalization; (iii) the LIST engine — Cauchy-Schwarz’s ceiling on dot products, Engel’s floor on fraction sums; (iv) the ORDER engine — rearrangement’s pairing ceiling and floor, Chebyshev’s average-product verdict; (v) the SHAPE engine — Jensen’s convex bound and its concave flip; (vi) the DISTANCE engine — the $|f|$ verdict pair, the triangle and reverse laws, the detour tax and the bridge. Thus, every question the chapter answers is two questions in disguise: which shape is this, and which engine owns that shape.' },
    { kind: 'derivation', title: 'The mean family runs on one square', statement: 'Every mean comparison of the chapter descends from the two-number square certificate of lesson 4.1 — recalled here in one line each, with its pointer.', steps: [
      { label: 'The two-number certificate', formula: 'A - G = \\dfrac{(\\sqrt{a} - \\sqrt{b})^2}{2} \\geq 0', explanation: 'Lesson 4.1 proved it; here it is one line of recall. The arithmetic–geometric gap is half a perfect square, and $G \\geq H$ followed by feeding the reciprocals to the same engine — the whole two-number theory in one square.' },
      { label: 'The doubling ladder', formula: 'A_{2n} \\geq G_{2n} \\;\\text{from}\\; A_n \\geq G_n \\;\\text{and}\\; A_2 \\geq G_2', explanation: '4.1’s propagation — the mean of a doubled list is the mean of the two half-means — certifying every power of two; the general-$n$ certificate is chapter 7’s induction promise, named there and never cashed early.' },
      { label: 'The weighted law', formula: '\\dfrac{mx + ny}{m+n} \\geq \\left(x^my^n\\right)^{\\frac{1}{m+n}}', explanation: '4.2’s replication route: a weight of $m$ on $x$ IS $x$ sitting $m$ times in the plain list, so the weighted AM-GM assumes nothing beyond 4.1 — rational weights by scaling, real weights the chapter 9 doorstep, honestly labelled.' },
      { label: 'The ladder law', formula: 'r < s \\;\\Longrightarrow\\; M_r \\leq M_s, \\qquad M_{-1} \\leq M_0 \\leq M_1 \\leq M_2', explanation: '4.2 mounted the power-mean family — the owned rungs proved (the reciprocal route, the variance square), $M_0 = G$ read honestly as the limit case, the full statement named forward to 4.5’s Jensen engine and chapter 9’s logarithm.' },
    ], result: 'One square, one ladder: the mean family of 4.1 and 4.2 is a single engine at six settings — H ≤ G ≤ A ≤ Q, equality exactly at the all-equal tuple.' },
    { kind: 'derivation', title: 'The order ground under all six engines', statement: 'Every engine in the chapter reads its verdicts off laws of the ordered real-number system — the Real Number System and Inequalities ground — recalled here in one line each, with the lesson that cashed it.', steps: [
      { label: 'The trichotomy read', formula: 'x > 0, \\; x = 0, \\;\\text{or}\\; x < 0 \\quad \\text{— exactly one}', explanation: 'The certificate $(\\sqrt{a}-\\sqrt{b})^2 \\geq 0$ becomes a verdict only because every real quantity owns a sign: the ground the whole mean family stands on, and the reason positivity is load-bearing rather than decoration.' },
      { label: 'The strike-by-a-negative law', formula: 'x < y \\;\\text{and}\\; c < 0 \\;\\Longrightarrow\\; cx > cy', explanation: 'AL 7.1’s law, cited and never re-taught — the flip the traps below price when an inequality is scaled by a quantity of unverified sign; the bench gives it an exercise of its own.' },
      { label: 'The square law', formula: 't^2 \\geq 0 \\quad \\text{for every real } t', explanation: 'The load-bearing fact behind 4.1’s certificate, 4.2’s variance square, 4.3’s never-negative quadratic, 4.4’s swap product and 4.5’s gap identity — one law, five coats.' },
      { label: 'The squaring licence', formula: '0 \\leq x \\leq y \\iff x^2 \\leq y^2', explanation: '4.6’s honesty note: squaring an inequality is order-preserving exactly on non-negative members — the triangle inequality’s proof and every $|f| \\geq |g|$ discipline live inside this licence, and $-5 \\leq 1$ with $25 > 1$ shows the outside.' },
    ], result: 'Six engines, one ground: the ordered real-number system carries every certificate the chapter issued — trichotomy, sign laws, the licence under the bars.' },
    { kind: 'equation', latex: 'H \\;\\leq\\; G \\;\\leq\\; A \\;\\leq\\; Q, \\qquad r < s \\;\\Longrightarrow\\; M_r \\leq M_s \\tag{1}', note: 'the ladder read at the four named rungs — 4.1’s piecewise chain re-derived as ONE law’s four seats by 4.2; strict at every rung unless the tuple is constant.' },

    { kind: 'heading', text: 'The Master Tables Reunited' },
    { kind: 'para', text: 'Strip the chapter of its prose and two tables remain — the two the examinations actually price. The first is the master census of the classical family: one row per engine, the statement in one line, the equality case, and when to reach for it. The second is the engine map proper — the decision table that routes the shape you face to the engine that owns it, each row carrying a witness re-run from the lesson that banked it. Both were engine-swept again before this page was written: every row below is a verdict the verifier re-ran against the six lessons’ own exhibits, not a memory transcribed.' },
    { kind: 'table', caption: 'The classical family in one census — one row per engine: the statement, the equality case, and when to reach for it. Every row cross-checked against its home lesson by the review’s engines before this prose was written.', head: ['Engine (lesson)', 'The statement, one line', 'Equality case', 'When to reach for it'], rows: [
      ['the mean chain (4.1)', '$A \\geq G \\geq H$; $A - G = \\tfrac{(\\sqrt{a}-\\sqrt{b})^2}{2}$', '$a = b$ — the certificate dies', 'symmetric products; which mean is bigger'],
      ['fixed sum / fixed product (4.1)', '$a+b = s \\Rightarrow ab \\leq \\tfrac{s^2}{4}$; $ab = p \\Rightarrow a+b \\geq 2\\sqrt{p}$', 'the equal split / equal pair', 'fencing, packing, $x + \\tfrac{c}{x}$ minima'],
      ['the weighted AM-GM (4.2)', '$\\tfrac{\\sum w_ix_i}{\\sum w_i} \\geq \\left(\\prod x_i^{w_i}\\right)^{1/\\sum w_i}$', 'all entries equal', 'asymmetric monomials on priced lines'],
      ['the power-mean ladder (4.2)', '$r < s \\Rightarrow M_r \\leq M_s$: $H \\leq G \\leq A \\leq Q$', 'the all-equal tuple', '$a^4 + b^4$-type and which-rung items'],
      ['Cauchy-Schwarz (4.3)', '$\\left(\\sum a_ib_i\\right)^2 \\leq \\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right)$', 'proportional lists', 'dot products; the all-ones read $(\\sum a)^2 \\leq n\\sum a^2$'],
      ['Engel, Titu’s lemma (4.3)', '$\\sum \\tfrac{a_i^2}{b_i} \\geq \\tfrac{(\\sum a_i)^2}{\\sum b_i}$ ($b_i > 0$)', 'the constant ratio $\\tfrac{a_i}{b_i}$', 'fraction sums; Nesbitt $\\geq \\tfrac32$'],
      ['rearrangement + Chebyshev (4.4)', 'the sorted pairing is the max, the reversed the min; $\\tfrac1n\\sum a_ib_i \\geq \\bar a\\,\\bar b$ (similarly sorted)', 'order-keeping pairings / one list constant', 'pairing choice; $\\max \\sum k\\,a_k$; co-movement'],
      ['Jensen (4.5)', '$f(\\text{average}) \\leq \\text{average of } f$ for convex $f$; reversed for concave', 'all seats equal (strict families)', 'curved shape; $\\sin A + \\sin B + \\sin C \\leq \\tfrac{3\\sqrt3}{2}$'],
      ['the triangle family (4.6)', '$|a+b| \\leq |a|+|b|$; $\\big||a|-|b|\\big| \\leq |a-b|$; $|x-a|+|x-b| \\geq |a-b|$', '$ab \\geq 0$ / $x$ between the centres', 'distance bounds, bands, minimum hunts, $|f|$ verdicts'],
    ] },
    { kind: 'table', caption: 'The engine map — the shape you face decides the engine you reach for, every witness re-run by the review’s engines from the lesson that banked it. The last row is the fold this review carries: the order ground itself.', head: ['The shape you face', 'The engine that owns it', 'A verified witness', 'The tight seat'], rows: [
      ['a fixed sum, a symmetric product', 'AM-GM, the equal split (4.1)', 'perimeter $36$ → greatest area $81$ at $9 \\times 9$; near misses $32$, $56$, $72$, $80$', '$x = y$'],
      ['an asymmetric product, exponents disagreeing', 'the weighted law + normalization (4.2)', '$x^3y$ on $x+y=5$: equal split $\\tfrac{625}{16} \\approx 39.1$ against the true max $\\tfrac{16875}{256} \\approx 65.9$', '$x : y = a : b$ — the exponents are the shares'],
      ['a fraction sum with positive bottoms', 'Engel (4.3)', '$\\tfrac{2}{x} + \\tfrac{8}{y} \\geq 3$ on $x+y=6$, attained at $(2, 4)$; Nesbitt $\\geq \\tfrac32$', 'the constant ratio $\\tfrac{a_i}{b_i}$'],
      ['a dot product of two lists', 'Cauchy-Schwarz (4.3)', '$32 \\leq \\sqrt{1078}$ on $(1,2,3) \\cdot (4,5,6)$, gap $54$; the tie $10 = 10$ on $(1,2) \\cdot (2,4)$', 'proportional lists'],
      ['two sorted lists, a pairing to choose', 'rearrangement + Chebyshev (4.4)', '$140$ the ceiling against $100$ the floor on $(1,2,3) \\times (10,20,30)$ — the choice is worth $40$', 'order-keeping pairings'],
      ['a curved graph between seats', 'Jensen, convex or concave (4.5)', '$\\sin 35^\\circ + \\sin 65^\\circ + \\sin 80^\\circ = 2.465 \\leq 2.598 = \\tfrac{3\\sqrt3}{2}$', 'the equal seats (the equilateral)'],
      ['a distance, a route, a bound in bars', 'the triangle family (4.6)', '$|x-2| + |x+3| \\geq 5$ on $[-3, 2]$; the band $[5, 13]$ for $|a+b|$ at $|a| = 4$, $|b| = 9$', 'same direction / between the centres'],
      ['an inequality to scale or square', 'the order ground — the Real Number System and Inequalities fold', 'a strike by a negative flips: $x < 3$ scaled by $(x-5)$ admits the seat $x = 4$ — the bench prices it', 'settled-sign or non-negative members only'],
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The one discipline behind the tables', text: 'Every row of both tables is the same move in a different dress: MANUFACTURE A QUANTITY THAT CANNOT BE NEGATIVE, THEN READ ITS SIGN. The mean chain’s square $(\\sqrt{a}-\\sqrt{b})^2$; the variance square behind the ladder’s $M_1 \\leq M_2$; the never-negative quadratic $\\sum(a_it+b_i)^2$ whose non-positive discriminant IS Cauchy-Schwarz; the swap certificate $(a_j-a_i)(b_i-b_j) \\geq 0$ behind rearrangement; the gap identity $\\lambda(1-\\lambda)(x-y)^2$ behind every chord; the squared bound $|a+b|^2 \\leq (|a|+|b|)^2$ behind the triangle family. Proved once in its lesson, recalled in one line here — the refusal discipline working for you as a map.' },
    { kind: 'derivation', title: 'Every engine manufactures a non-negative quantity', statement: 'The chapter’s six proofs are one move — manufacture a non-negative quantity and read its sign — recalled here one line at a time, each with its pointer.', steps: [
      { label: '4.1 — the square certificate', formula: '(\\sqrt{a} - \\sqrt{b})^2 \\geq 0', explanation: 'One line of recall: lesson 4.1 proved $A \\geq G$ by manufacturing half a perfect square, and the GM–HM link rode the same square through the reciprocals.' },
      { label: '4.2 — the variance square', formula: '\\dfrac{\\sum (x_i - A)^2}{n} \\geq 0 \\;\\Longrightarrow\\; M_2 \\geq M_1', explanation: 'One line of recall: the mean of the squared deviations cannot be negative, and the variance identity turns it into the ladder’s upper rung — on every real tuple, positives never assumed.' },
      { label: '4.3 — the never-negative quadratic', formula: 'f(t) = \\sum (a_it + b_i)^2 \\geq 0 \\;\\Longrightarrow\\; D \\leq 0', explanation: 'One line of recall: AL 9.3’s discriminant verdict, third appearance — the non-positive discriminant divides by $4$ into Cauchy-Schwarz, and the tie is the touch at the double root.' },
      { label: '4.4 — the swap certificate', formula: '(a_j - a_i)(b_i - b_j) \\geq 0 \\quad \\text{at an inversion}', explanation: 'One line of recall: uncrossing an inversion changes the pairing sum by a product of order gaps that both factors sign together — never a loss, and the bubble terminates at the sorted pairing.' },
      { label: '4.5 — the gap identity', formula: '\\lambda(1-\\lambda)(x-y)^2 \\geq 0', explanation: 'One line of recall: the chord’s height over the cup $x^2$ exceeds the curve’s by a weight factor times a perfect square — curvature priced by the same completing-the-square discipline as 4.1.' },
      { label: '4.6 — the lawful square', formula: '|a+b|^2 \\leq a^2 + 2|a||b| + b^2 = (|a|+|b|)^2', explanation: 'One line of recall: the triangle inequality squares two non-negative quantities — the licence — and the single order step $2ab \\leq 2|a||b|$ carries the whole equality discipline $ab \\geq 0$.' },
    ], result: 'One move, six coats: manufacture a non-negative quantity and read its sign — the chapter’s every proof in one sentence.' },
    { kind: 'para', text: 'The two tables are one reading in different dress. The census table answers WHAT questions — what is the statement, what is the equality case, what does the engine say. The engine map answers WHICH questions — which engine does this shape belong to. And the honesty notes travel with both: the mean family lives on positives (the rungs below $M_0$ genuinely need them); Engel’s bottoms must be positive before the machine starts; rearrangement needs the lists sorted, Chebyshev needs their directions checked; Jensen’s direction follows the curvature; the verdict pair demands $g > 0$ and reads sizes at the degenerate seats; and every equality case is a seat, not a slogan — the certificate must be able to die before a bound may be reported as attained.' },
    { kind: 'callout', tone: 'insight', title: 'Which table answers which question', text: 'The working rule the chapter earned, stated once for the room: under examination pressure read the MAP first — identify the shape (fixed sum? asymmetric product? fraction sum? dot product? sorted lists? curved? distance?), then pull the census row for the statement and the equality case, then run. The map is the diagnosis instrument too: a missed item names its engine by the shape it wore, which is why the bench below is graded by MIXED shapes, not by lesson — the hall does not label its items by lesson either.' },

    { kind: 'heading', text: 'The Witnesses, Re-Audited' },
    { kind: 'para', text: 'Six exhibits carried the chapter’s weight — one anchored in each storey — and a review earns its keep by re-auditing them TOGETHER: each is re-run below in the review’s own words, every number re-computed by the engines before a word of this prose was fixed, and each now prices more than the storey that introduced it — the mean witness carries the ladder, the weighted witness exposes the classic trap, the dot-product witness carries Lagrange’s gap, the pairing witness carries Chebyshev, the shape witness carries the reunion, the distance witness carries the bridge. Two mixed exhibits close the section: one machine taken through all six engines, and one constraint priced by four engines in a single sweep.' },
    { kind: 'example', title: 'The mean witness re-audited: the pair (2, 8) and the perimeter-36 fence, through the plain engine', steps: [
      'The neighbourhood of $(2, 8)$: $H = \\tfrac{16}{5} = 3.2$, $G = 4$, $A = 5$, and — the rung 4.1 named forward and 4.2 mounted — $Q = \\sqrt{\\tfrac{4+64}{2}} = \\sqrt{34} \\approx 5.83$: the order $3.2 \\leq 4 \\leq 5 \\leq 5.83$, strict at every link because $2 \\neq 8$.',
      'The certificate, one line of recall with a pointer to 4.1: $A - G = \\tfrac{(\\sqrt{8}-\\sqrt{2})^2}{2} = \\tfrac{10-8}{2} = 1$ — the gap is half a perfect square, which is the proof of the order itself.',
      'The fixed-sum discipline on the same currency: a perimeter-36 rectangle carries $x + y = 18$, so $xy \\leq 9^2 = 81$ at the $9 \\times 9$ square — and the census of near misses still teaches: $2 \\times 16 = 32$, $4 \\times 14 = 56$, $6 \\times 12 = 72$, $8 \\times 10 = 80$, every step toward balance buying area.',
      'The reciprocal-pair floor: $x + \\tfrac{36}{x} \\geq 2\\sqrt{36} = 12$, attained at $x = 6$ — an honest seat inside the constraint, cross-checked by the direct certificate $x + \\tfrac{36}{x} - 12 = \\tfrac{(x-6)^2}{x} \\geq 0$.',
      'Hence the plain engine’s three faces on one plate: the neighbourhood order, the square certificate, and the fixed-sum / fixed-product discipline — maxima and minima with no vertex form in sight.',
    ] },
    { kind: 'example', title: 'The weighted witness re-audited: x³y on x + y = 5, and the ladder tuple (1, 2, 6)', steps: [
      'The classic trap priced: $x^3y$ is NOT symmetric, so the equal split does not maximise it. The exponent-priced split is $3 : 1$ — the seat $\\left(\\tfrac{15}{4}, \\tfrac{5}{4}\\right)$, where $x^3y = \\left(\\tfrac{15}{4}\\right)^3 \\cdot \\tfrac{5}{4} = \\tfrac{16875}{256} \\approx 65.9$ against the equal split’s $\\left(\\tfrac{5}{2}\\right)^4 = \\tfrac{625}{16} \\approx 39.1$: the unweighted mean used where the weighted is due loses about forty percent of the product.',
      'The normalization route, one line of recall with a pointer to 4.2: price the blocks $\\tfrac{x}{3}$ taken three times and $y$ taken once — $\\tfrac{x^3y}{27} \\leq \\left(\\tfrac{5}{4}\\right)^4$ — the same verdict, the same seat, the constraint itself turned into the weighted sum.',
      'The same engine at priced-line speed: $x^2y^3$ on $5x + 3y = 15$ tops out at $\\tfrac{972}{25} = 38.88$ at $\\left(\\tfrac{6}{5}, 3\\right)$ — the block $\\tfrac{5x}{2}$ twice, $y$ thrice, their common value $3$.',
      'The ladder on the tuple $(1, 2, 6)$: $M_{-1} = \\tfrac{9}{5} = 1.8$, $M_0 = \\sqrt[3]{12} \\approx 2.289$ (the honest limit rung), $M_1 = 3$, $M_2 = \\sqrt{\\tfrac{41}{3}} \\approx 3.697$ — one monotone law behind the four named means, strict at every rung because the entries differ.',
      'Hence the weighted engine’s two faces: the exponents are the shares (the split $x : y = a : b$), and the ladder reads every “which mean is bigger” question as one law, not four.',
    ] },
    { kind: 'example', title: 'The dot-product witness re-audited: (1, 2, 3) against (4, 5, 6), and the fraction sums', steps: [
      'The bound: dot product $4 + 10 + 18 = 32$; the list-sizes $\\sum a^2 = 14$ and $\\sum b^2 = 77$; the ceiling $\\sqrt{14}\\sqrt{77} = \\sqrt{1078} \\approx 32.83$ — and $32^2 = 1024 \\leq 1078$, a genuine gap of $54$.',
      'Lagrange’s identity prices the gap as a sum of squares: $(1\\cdot5 - 2\\cdot4)^2 + (1\\cdot6 - 3\\cdot4)^2 + (2\\cdot6 - 3\\cdot5)^2 = 9 + 36 + 9 = 54$ — the gap is the cross-differences, dying exactly at proportionality.',
      'The engine behind it, one line of recall with a pointer to 4.3: $f(t) = 14t^2 + 64t + 77 \\geq 0$ for every real $t$ — a sum of squares — so its discriminant $64^2 - 4 \\cdot 14 \\cdot 77 = -216 \\leq 0$, and dividing by $4$ IS the inequality; the tie is the touch, at the double root $t_0 = -\\tfrac{16}{7}$.',
      'The all-ones read on the same list: $(1+2+3)^2 = 36 \\leq 3 \\cdot 14 = 42$ — the $M_2 \\geq M_1$ rung of 4.2’s ladder reread as Cauchy-Schwarz against $(1,1,1)$, the gap $6$ being three times the squared spread of $(1,2,3)$ about its mean $2$.',
      'The fraction-sum face: Engel floors $\\tfrac{2}{x} + \\tfrac{8}{y} \\geq \\tfrac{(\\sqrt{2} + 2\\sqrt{2})^2}{x+y} = 3$ on $x + y = 6$ at the seat $(2, 4)$; and Nesbitt at $(1,2,3)$ reads $\\tfrac{1}{5} + \\tfrac{2}{4} + \\tfrac{3}{3} = \\tfrac{17}{10} \\geq \\tfrac{3}{2}$ — the Engel chain closed by the $(a+b+c)^2 \\geq 3(ab+bc+ca)$ family, whose own gap at this triple is $\\tfrac{1}{2}(1 + 1 + 4) = 3$.',
      'Hence one engine, three readings: a ceiling on a dot product, a rung of a ladder, a floor under a fraction sum — with the tie always at proportionality.',
    ] },
    { kind: 'example', title: 'The pairing witness re-audited: (1, 2, 3) against (10, 20, 30), the whole census', steps: [
      'The six pairing sums, re-run: the sorted $(10, 20, 30)$ pays $140$; the two near-miss seats $(10, 30, 20)$ and $(20, 10, 30)$ pay $130$ each; $(20, 30, 10)$ and $(30, 10, 20)$ pay $110$ each; the reversed $(30, 20, 10)$ pays $100$ — the choice of pairing alone is worth $40$ on these lists.',
      'The certificate, one line of recall with a pointer to 4.4: each uncrossing gains $(a_j - a_i)(b_i - b_j) \\geq 0$ — the two-pair identity $a_ib_i + a_jb_j - a_ib_j - a_jb_i = (a_j - a_i)(b_j - b_i)$ read at an inversion — and the bubble terminates at the sorted pairing after finitely many non-losing swaps.',
      'Chebyshev on the same lists: similarly sorted reads $\\tfrac{140}{3} \\approx 46.7 \\geq \\bar a\\,\\bar b = 2 \\cdot 20 = 40$; the mirrored lists $(30, 20, 10)$ read $\\tfrac{100}{3} \\approx 33.3 \\leq 40$ — equal slacks $\\tfrac{20}{3}$ each way, the direction following the sort, never the habit.',
      'The mixed witness: $(2 + 3 + 6)\\left(\\tfrac{1}{2} + \\tfrac{1}{3} + \\tfrac{1}{6}\\right) = 11 \\geq 9$, priced by both engines at once — the oppositely sorted Chebyshev applied directly (the average product $1$ against $\\tfrac{11}{9}$), and the AM–GM $x + \\tfrac{1}{x}$ family on the expansion $3 + 8 = 11$.',
      'The sequence-order read: the weights $k = 1, 2, 3, 4$ against the entries $\\{1, 2, 3, 4\\}$ maximise at the sorted pairing $\\sum k^2 = 30$ and floor at the reversed $20$ — a derivative-free optimisation worth $10$ on four entries.',
    ] },
    { kind: 'example', title: 'The shape witness re-audited: the parabola’s chords, the reunion rung, and the sine cap', steps: [
      'The cup: the chord of $y = x^2$ from $(0, 0)$ to $(4, 16)$ rides at height $8$ over the abscissa $2$ where the curve reads $4$ — the drop $\\tfrac{(4-0)^2}{4} = 4$; the short chord from $(1, 1)$ to $(3, 9)$ keeps its midpoint at $5$ against the curve’s $4$ — the drop $\\tfrac{(3-1)^2}{4} = 1$. The certificate, one line of recall with a pointer to 4.5: $\\lambda x^2 + (1-\\lambda)y^2 - (\\lambda x + (1-\\lambda)y)^2 = \\lambda(1-\\lambda)(x-y)^2 \\geq 0$.',
      'The reunion on the roster $\\{3, 7\\}$: Jensen on $x^2$ at equal weights reads $\\left(\\tfrac{3+7}{2}\\right)^2 = 25 \\leq \\tfrac{9+49}{2} = 29$ — the $M_1 \\leq M_2$ rung of 4.2’s ladder, the gap $4 = \\tfrac{(3-7)^2}{4}$ being the same square again.',
      'The concave flip: the triangle $35^\\circ$, $65^\\circ$, $80^\\circ$ pays $\\sin 35^\\circ + \\sin 65^\\circ + \\sin 80^\\circ = 2.465 \\leq 2.598 = 3\\sin 60^\\circ = \\tfrac{3\\sqrt{3}}{2}$ — the spread’s tax $0.133$, the equality seat the equilateral alone.',
      'The centroid read of the same witness: the average height $\\tfrac{2.465}{3} = 0.822$ against the curve at the average abscissa $\\sin 60^\\circ = 0.866$ — the arch rides $0.044$ above the centroid, exactly the plate 4.5 drew.',
      'Hence the shape engine’s census: cups reward balance from below ($a^2 + b^2 \\geq 50$ at $a = b = 5$ on $a + b = 10$), caps reward it from above — and the equality discipline is always the vanishing spread.',
    ] },
    { kind: 'example', title: 'The distance witness re-audited: the verdict discipline, the detour tax, the band, and the bridge', steps: [
      'The verdict discipline at its degenerate seat: $|x - 5| > -3$ reads ALL REALS — a distance is never negative, so the claim holds everywhere; running the $g > 0$ union machine on a negative bound manufactures rays nobody demanded.',
      'The detour tax: $|x - 2| + |x + 3| \\geq |2 - (-3)| = 5$, attained exactly on the whole segment $[-3, 2]$ — the two arms tile the direct gap there and only there; outside, $x = 4$ pays $9$ and $x = -5$ pays $9$.',
      'The band engine: with $|a| = 4$ and $|b| = 9$, every value of $|a+b|$ is pinned between $\\big||a| - |b|\\big| = 5$ and $|a| + |b| = 13$ — and on the LINE only the two ends are honest: the four sign pairs give sums $13, -5, 5, -13$, so $|a+b|$ takes exactly the values $5$ and $13$; the band’s interior belongs to the plane, where lesson 3.2 let the direction vary continuously.',
      'The bridge, one line of recall with a pointer to 4.6 cashing 4.3’s named promise: Cauchy-Schwarz on the magnitude list against the ones — $\\left(\\sum|x_i|\\right)^2 \\leq n\\sum x_i^2$: on $(1, 2, -4)$ it reads $49 \\leq 63$ (strict, the magnitudes $1, 2, 4$ unequal), on $(3, -3, 3)$ it reads $81 = 81$ (the tie — the list sits at one size).',
      'Hence the distance engine’s faces — verdicts, routes, bands, bridges — every one descending from $|a+b| \\leq |a| + |b|$, equality exactly the same direction $ab \\geq 0$, proved by a squaring that was lawful because both sides were non-negative.',
    ] },
    { kind: 'figure', caption: 'The reunion ladder: the power-mean ladder of the tuple (1, 2, 3) at its four named rungs — the harmonic mean 18/11 ≈ 1.64, the geometric mean ∛6 ≈ 1.82 (drawn amber: the honest limit rung the logarithm of chapter 9 will certify in one line), the arithmetic mean 2, the quadratic mean √(14/3) ≈ 2.16. Climb the order r and the mean climbs — one monotone law; the rungs are proved by reciprocals (4.1), by the variance square (4.2), by the all-ones Cauchy read (4.3) and by Jensen on x² (4.5) — three engines meeting on one ladder, and the rungs meet only at an all-equal tuple.', svg: reunionLadderSvg() },
    { kind: 'example', title: 'One machine, six readings: take the triple (1, 2, 3) through the whole chapter', steps: [
      'The mean family (4.1 and 4.2): $A = 2$, $G = \\sqrt[3]{6} \\approx 1.817$, $H = \\tfrac{18}{11} \\approx 1.636$ — the order strict; the ladder tops at $M_2 = \\sqrt{\\tfrac{14}{3}} \\approx 2.16$; and the fixed-product read: $1 \\cdot 2 \\cdot 3 = 6 \\Rightarrow 1 + 2 + 3 \\geq 3\\sqrt[3]{6} \\approx 5.45$ — true and strict, the honest floor sitting below the actual sum $6$.',
      'The dot-product engine (4.3): against the ones, $(1+2+3)^2 = 36 \\leq 3 \\cdot 14 = 42$; Engel on the self-list TIES exactly — $\\tfrac{1^2}{1} + \\tfrac{2^2}{2} + \\tfrac{3^2}{3} = 6 = \\tfrac{(1+2+3)^2}{1+2+3}$, the constant ratio $1$; and Nesbitt reads $\\tfrac{17}{10} \\geq \\tfrac{3}{2}$.',
      'The order engine (4.4): the list paired with itself pays the identity $1 + 4 + 9 = 14$ — the ceiling, both lists ascending; the reversed pays $1\\cdot3 + 2\\cdot2 + 3\\cdot1 = 10$ — the floor; the cyclic $xy + yz + zx = 2 + 6 + 3 = 11$ sits mid-band: $10 \\leq 11 \\leq 14$, the ceiling gap $\\tfrac{1}{2}(1 + 1 + 4) = 3$ and the floor gap $(1-2)(2-3) = 1$ certifying both rungs.',
      'The shape engine (4.5): Jensen on the cup reads $f(2) = 4 \\leq \\tfrac{14}{3} \\approx 4.67$, the gap $\\tfrac{2}{3}$ being the roster’s variance $\\tfrac{(1-2)^2+(2-2)^2+(3-2)^2}{3}$; the root cap reads $\\sqrt{2} \\approx 1.414 \\geq \\tfrac{1 + \\sqrt{2} + \\sqrt{3}}{3} \\approx 1.382$ — 4.1’s AM–GM standing exactly where the curvature claim needed it.',
      'The distance engine (4.6): all three entries positive, so $|1| + |2| + |3| = 6 = |1 + 2 + 3|$ — the triangle inequality at its equality seat, the arms tiling; the bridge reads $36 \\leq 42$ (strict, the magnitudes unequal); and the detour $|x - 1| + |x - 3| \\geq 2$ floors the two-arm hunt at the gap between the outer entries, attained on $[1, 3]$.',
      'Hence ONE machine, six readings — means $2$, $\\sqrt[3]{6}$, $\\tfrac{18}{11}$; ladder top $\\sqrt{14/3}$; Cauchy gap $6$; Nesbitt $\\tfrac{17}{10}$; pairing band $10 \\leq 11 \\leq 14$; Jensen gap $\\tfrac{2}{3}$; the triangle tie $6 = 6$: the chapter’s whole engine room, run on three numbers.',
    ] },
    { kind: 'example', title: 'Exam-style: one constraint, four engines — for x, y > 0 with x + y = 10, price xy from above and x² + y², 1/x + 1/y, (x² + y²)(1/x² + 1/y²) from below', steps: [
      'The symmetric product (4.1): $xy \\leq \\left(\\tfrac{x+y}{2}\\right)^2 = 25$, attained at $x = y = 5$ — the fixed-sum discipline in one line.',
      'The square sum (4.2, 4.3 and 4.5 — three routes, one floor): $x^2 + y^2 \\geq \\tfrac{(x+y)^2}{2} = 50$ — the all-ones read of Cauchy-Schwarz, the $M_1 \\leq M_2$ rung of the ladder, Jensen on the cup: the same mathematics at three addresses, attained at the same equal split.',
      'The fraction sum (4.3): $\\tfrac{1}{x} + \\tfrac{1}{y} \\geq \\tfrac{(1+1)^2}{x+y} = \\tfrac{2}{5}$ by Engel — the bottoms $x, y > 0$ checked before the machine started, the tie at $x = y = 5$.',
      'The product of the two sums (4.3 in its squared dress): $\\left(x^2+y^2\\right)\\left(\\tfrac{1}{x^2}+\\tfrac{1}{y^2}\\right) \\geq \\left(x \\cdot \\tfrac{1}{x} + y \\cdot \\tfrac{1}{y}\\right)^2 = 4$ by Cauchy-Schwarz on the lists $(x, y)$ and $\\left(\\tfrac{1}{x}, \\tfrac{1}{y}\\right)$ — and at $x = y = 5$ it reads $50 \\cdot \\tfrac{2}{25} = 4$: the tie, the lists proportional exactly at $x = y$.',
      'Hence four engines, four floors and ceilings, one constraint — and every equality seat is the SAME seat $x = y = 5$: the symmetric constraint forces the balanced split across the whole engine family, which is the chapter’s deepest habit.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'How the witnesses interlock', text: 'The eight exhibits are not eight problems — they are the chapter wearing eight costumes. The mean witness’s fixed sum is the shape witness’s cup; the dot-product witness’s all-ones read is the ladder’s rung; the pairing witness’s ceiling is the identity pairing the dot-product engine prices; the distance witness’s bridge is Cauchy-Schwarz one dimension down; the one-machine exhibit is all six at once on $\\{1, 2, 3\\}$; the one-constraint exhibit is four engines agreeing on one seat. The hall’s mixed items run exactly this game: hand you one machine and bill you for several storeys at once — and the diagnosis runs the same direction, a miss on a mixed item naming its home lesson by its shape.' },

    { kind: 'heading', text: 'The Laws Worth Recalling' },
    { kind: 'para', text: 'The chapter deposited its formula shelf lesson by lesson — the mean chain and its certificates in 4.1, the weighted law and the ladder in 4.2, Cauchy-Schwarz, Engel and Nesbitt in 4.3, the two faces of the order engine in 4.4, the convexity definitions and the sine cap in 4.5, the verdict pair and the distance family in 4.6 — and the reader’s formula-sheet page aggregates them automatically. Eight of them are load-bearing: the consolidated laws the next chapters will actually reach for, each re-verified by the review’s engines before this page was written. The laws in display, the cards, then the vocabulary:' },
    { kind: 'equation', latex: '\\left(\\sum_{i=1}^{n} a_i b_i\\right)^2 \\leq \\left(\\sum_{i=1}^{n} a_i^2\\right)\\left(\\sum_{i=1}^{n} b_i^2\\right), \\qquad \\left(\\sum_{i=1}^{n} a_i\\right)^2 \\leq n\\sum_{i=1}^{n} a_i^2 \\tag{2}', note: 'Cauchy-Schwarz and its all-ones read — the ceiling on dot products and the QM–AM rung reread; ties at proportional lists / all entries equal.' },
    { kind: 'equation', latex: '\\sum_{i=1}^{n} \\frac{a_i^2}{b_i} \\;\\geq\\; \\frac{\\left(\\sum_{i=1}^{n} a_i\\right)^2}{\\sum_{i=1}^{n} b_i} \\quad (b_i > 0); \\qquad \\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b} \\geq \\frac{3}{2} \\tag{3}', note: 'Engel’s form (Titu’s lemma) and Nesbitt — the fraction-sum floor and its standard destination; ties at the constant ratio / the equal triple.' },
    { kind: 'equation', latex: '\\sum_{i=1}^{n} a_ib_{n+1-i} \\;\\leq\\; \\sum_{i=1}^{n} a_ib_{\\sigma(i)} \\;\\leq\\; \\sum_{i=1}^{n} a_ib_i; \\qquad \\frac{1}{n}\\sum_{i=1}^{n} a_ib_i \\;\\geq\\; \\bar a\\,\\bar b \\;\\; (\\text{similarly sorted}) \\tag{4}', note: 'the rearrangement band and Chebyshev’s sum inequality — the order engine’s two faces; no sign assumptions, the direction following the sorts.' },
    { kind: 'equation', latex: 'f\\bigl(\\lambda x + (1-\\lambda)y\\bigr) \\leq \\lambda f(x) + (1-\\lambda) f(y) \\quad (\\text{convex}); \\qquad \\sin A + \\sin B + \\sin C \\leq \\frac{3\\sqrt{3}}{2} \\;\\; (A+B+C = \\pi) \\tag{5}', note: 'Jensen in its two-point weighted form and the sine cap — the shape engine; concave families reverse the sign, equality at the equal seats (the equilateral).' },
    { kind: 'equation', latex: '\\bigl||a| - |b|\\bigr| \\;\\leq\\; |a \\pm b| \\;\\leq\\; |a| + |b|; \\qquad |x-a| + |x-b| \\;\\geq\\; |a-b| \\tag{6}', note: 'the band engine and the detour tax — the reverse law floors, the forward law ceilings, the two-arm sum minimised exactly between the centres.' },
    { kind: 'formula', name: 'The mean chain and its certificate', latex: 'A = \\dfrac{a+b}{2}, \\quad G = \\sqrt{ab}, \\quad H = \\dfrac{2ab}{a+b}; \\qquad A - G = \\dfrac{(\\sqrt{a}-\\sqrt{b})^2}{2}', note: 'the two-number chain $A \\geq G \\geq H$ with the gap certified by half a perfect square — every later engine calls one of its links; equality exactly at the coincident pair (4.1).' },
    { kind: 'formula', name: 'The fixed-sum and fixed-product pair', latex: 'a + b = s \\Rightarrow ab \\leq \\dfrac{s^2}{4}; \\qquad ab = p \\Rightarrow a + b \\geq 2\\sqrt{p}; \\qquad x + \\dfrac{c}{x} \\geq 2\\sqrt{c}', note: 'the calculus-free maximum/minimum engine — the equal split for the max product, the equal pair for the min sum, the reciprocal-pair floor at $x = \\sqrt{c}$ (4.1).' },
    { kind: 'formula', name: 'The weighted AM-GM and the exponent-priced split', latex: '\\dfrac{\\sum w_ix_i}{\\sum w_i} \\geq \\left(\\prod x_i^{w_i}\\right)^{1/\\sum w_i}; \\qquad x + y = n \\Rightarrow x^ay^b \\leq \\left(\\dfrac{n}{a+b}\\right)^{a+b} a^ab^b', note: 'weights are repetitions (4.2’s replication proof); on an un-priced sum the maximising split allocates $x : y = a : b$ — the exponents are the shares.' },
    { kind: 'formula', name: 'The power-mean ladder', latex: 'r < s \\;\\Longrightarrow\\; M_r \\leq M_s; \\qquad M_{-1} \\leq M_0 \\leq M_1 \\leq M_2 \\;\\equiv\\; H \\leq G \\leq A \\leq Q', note: 'one monotone law behind the whole mean chain (4.2); $M_0 = G$ read honestly as the limit case — the logarithm of chapter 9 certifies it in one line; equality exactly at the all-equal tuple.' },
    { kind: 'formula', name: 'Cauchy-Schwarz, Engel and the all-ones read', latex: '\\left(\\sum a_ib_i\\right)^2 \\leq \\left(\\sum a_i^2\\right)\\left(\\sum b_i^2\\right); \\qquad \\sum \\dfrac{a_i^2}{b_i} \\geq \\dfrac{(\\sum a_i)^2}{\\sum b_i} \\;\\; (b_i > 0)', note: 'the dot-product ceiling (ties at proportional lists) and the fraction-sum floor (ties at the constant ratio) — 4.3’s engine; the all-ones read $(\\sum a)^2 \\leq n\\sum a^2$ is the QM–AM rung reread.' },
    { kind: 'formula', name: 'The rearrangement band and Chebyshev', latex: '\\sum a_ib_{n+1-i} \\leq \\sum a_ib_{\\sigma(i)} \\leq \\sum a_ib_i; \\qquad \\dfrac{1}{n}\\sum a_ib_i \\geq \\bar a\\,\\bar b \\;\\text{(similarly sorted)}, \\;\\leq \\;\\text{(oppositely)}', note: 'the sorted pairing is the maximum over all arrangements, the reversed the minimum (4.4); the average product beats the product of averages for similarly sorted lists — equality when one list is constant.' },
    { kind: 'formula', name: 'Jensen and the sine cap', latex: 'f(\\lambda x + (1-\\lambda)y) \\leq \\lambda f(x) + (1-\\lambda)f(y) \\;\\text{(convex)}; \\qquad \\sin A + \\sin B + \\sin C \\leq \\dfrac{3\\sqrt{3}}{2}', note: 'the chord-above-graph definition cashed as a theorem (4.5); concave families flip the sign — the sine arch caps triangle sine sums at the equilateral’s $3\\sqrt{3}/2$.' },
    { kind: 'formula', name: 'The triangle family and the bridge', latex: '|a+b| \\leq |a|+|b|, \\quad \\bigl||a|-|b|\\bigr| \\leq |a-b|, \\quad |x-a|+|x-b| \\geq |a-b|; \\qquad \\left(\\sum|x_i|\\right)^2 \\leq n\\sum x_i^2', note: 'the forward law (equality $ab \\geq 0$), the reverse, the detour tax (equality between the centres), and the Cauchy-Schwarz bridge on magnitude lists (equality when the list sits at one size) — 4.6’s census.' },
    { kind: 'terms', items: [
      { term: 'The engine map', def: 'the decision table that routes the shape of an exhibit to the engine that owns it — fixed sum to AM-GM, asymmetric product to the weighted split, fraction sum to Engel, dot product to Cauchy-Schwarz, sorted lists to rearrangement, curved shape to Jensen, distance to the triangle family.' },
      { term: 'The mixed census', def: 'the review’s discipline of pricing several engines in one exhibit — the way an examination actually prices a chapter: one machine arrives, and every reading the chapter owns is asked of it in turn.' },
      { term: 'Equality discipline', def: 'the stated exact seat at which a bound dies — the coincident pair, the all-equal tuple, the proportional lists, the constant ratio, the one-size list, the equilateral, the same-direction arms; an inequality without its equality case is half a theorem.' },
      { term: 'The mean neighbourhood', def: 'the ordered family of averages of one positive pair — $H \\leq G \\leq A \\leq Q$ — every member between the pair’s endpoints, all collapsing to one point at the coincident pair; the ladder’s four named rung readings.' },
      { term: 'The power-mean ladder', def: 'the family $M_r$ monotone in its order $r$ — one law behind every which-mean question, $M_0 = G$ read honestly as the limit case the chapter 9 logarithm will certify.' },
      { term: 'Engel’s form (Titu’s lemma)', def: 'the fraction-sum floor $\\sum a_i^2/b_i \\geq (\\sum a_i)^2/\\sum b_i$ for positive bottoms — Cauchy-Schwarz by the square-root split; ties exactly at the constant ratio $a_i/b_i$.' },
      { term: 'The exchange certificate', def: 'the rearrangement engine’s proof move: uncrossing an inversion gains $(a_j - a_i)(b_i - b_j) \\geq 0$, a product of order gaps sharing a sign — never a loss, and the bubble terminates at the sorted pairing.' },
      { term: 'The detour tax', def: '$|x-a| + |x-b| \\geq |a-b|$ with equality exactly on the closed segment between the centres — FM 7.4’s distance engine reread as a minimum-hunting bound machine.' },
      { term: 'The verdict pair', def: 'for $g > 0$: $|f| < g \\iff -g < f < g$ (an intersection) and $|f| > g \\iff f < -g$ or $f > g$ (a union); at $g \\leq 0$ run nothing and read sizes — the degenerate seats are priced by the trichotomy of the real-number system alone.' },
    ] },

    { kind: 'heading', text: 'The Traps the Hall Sets' },
    { kind: 'para', text: 'The chapter’s own caution shelf, compressed to the seven traps the examination hall actually sets — each is one lesson’s discipline pointed at one wrong instinct, and each is cross-checkable against the lesson’s own caution box:' },
    { kind: 'list', items: [
      'The unearned equality (4.1): a bound is true even when its equality seat is out of reach — on $xy = 4$ the naive floor $4$ for $\\left(x + \\tfrac{1}{x}\\right)\\left(y + \\tfrac{1}{y}\\right)$ is blocked (the certificate would force $x = y = 1$, colliding with $xy = 4$) and the honest minimum is $\\tfrac{25}{4}$ at $x = y = 2$. Report a bound as a minimum only after its certificate can die.',
      'Positivity quietly dropped (4.1 and 4.2): the means live on positive numbers — $\\sqrt{-36}$ is not a real number at all; the rungs below $M_0$ need positives (on $(-4, -1)$ a formal $G = 2$ would sit above $A = -2.5$); Engel’s bottoms must be positive or the machine collapses ($-9 \\geq 9$ on the $b = (2, -1)$ fraud).',
      'The unweighted mean where the weighted is due (4.2): on $x + y = 5$ the equal split maximises $xy$ — but NOT $x^3y$: $\\tfrac{625}{16} \\approx 39.1$ against the true $\\tfrac{16875}{256} \\approx 65.9$. Price the exponents first; split second.',
      'Multiplying by an unverified sign (the order ground): a strike by a negative flips the order — $x < 3$ multiplied through by $(x - 5)$ admits the seat $x = 4$; scale an inequality only by a quantity whose sign is settled, or case-split by its sign. The bench gives this trap an exercise of its own.',
      'Squaring without the non-negativity check (4.6, on AL 7.1’s law): $-5 \\leq 1$ yet $25 > 1$ — squaring preserves order exactly on non-negative members; through bars it is lawful ($|t|^2 = t^2$, both sides non-negative), through bare letters never until non-negativity is banked.',
      'The direction follows the sort and the curvature, not the habit (4.4 and 4.5): similarly sorted reads $\\geq$, oppositely sorted $\\leq$ — check BOTH lists’ directions before touching Chebyshev, and remember a cap satisfies the REVERSED Jensen (running the cup’s $\\leq$ on the sine arch manufactures a wrong-direction bound). The constant-list and equal-seats conditions are the honest ties; arithmetic progressions are NOT equality seats ($\\tfrac{14}{3} > 4$ on $(1,2,3)$ against itself).',
      'The degenerate bound (4.6): $|f| < g$ with $g \\leq 0$ is NEVER true, and $|f| > g$ with $g < 0$ is true EVERYWHERE — run nothing, read sizes; the classic fraud runs the union discipline on a negative bound and manufactures rays nobody demanded ($|x-5| > -3$: all reals).',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The one warning that carries forward', text: 'An inequality without its equality case is half a theorem — and the chapter’s engines are now load-bearing for the rest of this book. Chapter 5 leans on them for the means inserted between progression terms; chapter 7’s induction certifies the general-$n$ statements this chapter honestly deferred (the AM-GM for every $n$, the every-$n$ Jensen); chapter 9’s logarithm collapses the weighted law and the $M_0$ rung into one line. Carry the equality discipline into all three: it is the one habit every later chapter prices, and the one the hall never stops testing.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the honest coverage audit', text: 'The audit, stated once for the whole chapter: the JEE Main 2026 mathematics unit list carries NO separate inequalities unit — the syllabus’s own register — so every mean-inequality, dot-product and absolute-value item rides the algebra bank (the greatest/least-value family, the $x + \\tfrac{c}{x}$ staples, the $|f| < g$ verdicts), and the aptitude side rides the Khattar QA batteries, which price the same engines numerically at speed. The registers the six lessons drilled, re-priced by this bench: the 4.1 staples (reciprocal-pair minima, fixed-sum fencing and packing), the 4.2 normalization maxima and rung comparisons, the 4.3 fraction-sum floors and dot-product ceilings (the Numerical-Value shape), the 4.4 pairing single-corrects and direction checks, the 4.5 sine-cap items riding the trigonometric-identity unit, the 4.6 verdict hunts, band reads and minimum-of-arms items. NCERT class 11 chapter 5 carries the linear-inequality order ground (the prerequisites’ own turf, and this review’s fold); the classical engine is the competitive step above it, and the undergraduate meets it again as the first law of real analysis. The items in this review are exam-style — our own constructions on those registers, honestly labelled; no past-paper text is reproduced, and every number above was generated and verified by this book’s own engines.' },
    { kind: 'callout', tone: 'historical', title: 'The family gathered', text: 'The classical family this chapter built was gathered and organised once, in one book: Hardy, Littlewood and Pólya’s Inequalities (Cambridge, 1934) — the treatise that made the subject a subject, arranged much the way this room is: means, Cauchy-Schwarz, rearrangement, convexity. Cauchy had proved the AM-GM for every $n$ in his 1821 Cours d’analyse, by the forward–backward induction whose forward half lesson 4.1 owns; Jensen proved the convexity bound in 1906 with the calculus stripped out, as a telephone-company engineer working mathematics in spare hours; and the triangle inequality’s name rides back twenty-three centuries to Euclid’s Elements, Book I, Proposition 20 — “in any triangle the sum of any two sides is greater than the remaining one.” The chapter walked in six lessons and one review what the canon gathered over two millennia; every attribution above was web-checked by the sibling lessons’ research runs before it was written.' },

    { kind: 'heading', text: 'The Chapter Closes' },
    { kind: 'para', text: 'And so the chapter closes. Elementary Algebra handed this book an ordered line; the book returned an engine room: six machines that price maxima, pairings, shapes and distances without calculus — the square, the weight, the list, the pairing, the chord and the bar, every one proved, every equality case priced. What began as “the least value of $x + \\tfrac{36}{x}$ has no vertex to complete” ends as a decision made in seconds: fixed sum, symmetric product — AM-GM; asymmetric — the weighted split; fraction sum — Engel; two lists — Cauchy-Schwarz; pairing choice — rearrangement; curved — Jensen; distance — the triangle family; and under all of them the order ground of the real number system, without which no certificate in the room can be read. The honest map of what was named but deferred: chapter 5 “Sequences and Series” plants means BETWEEN numbers — the arithmetic and geometric inserts of the progressions — and leans on this engine for them; chapter 7 “Mathematical Induction: the Domino Principle” cashes the general-$n$ certificates (the AM-GM for every $n$, the every-$n$ Jensen, the ladder’s full statement), the same dominoes that certify the power sums; and chapter 9’s logarithm turns the weighted law and the $M_0$ rung into one line of concavity. All named, none cashed early.' },
    { kind: 'para', text: 'Use the review honestly and it will diagnose you. Attempt the mixed bench WITHOUT looking back at the lessons; every miss names its home lesson by its shape — an unearned equality sends you to 4.1, a mispriced split or a dropped positivity to 4.2, a missed proportionality or a negative bottom to 4.3, a missed sort or a wrong direction to 4.4, a wrong-side curvature claim to 4.5, a degenerate bound or an unlawful square to 4.6, and an order-law slip to the ground the whole room stands on. The five quiz questions price five engines — one mean question, one weighted split, one ceiling, one cap, one band; the order engine takes two bench items of its own. Score them honestly, revisit exactly what the misses name, and the room is yours.' },

    { kind: 'quiz', title: 'Check yourself — the chapter in five questions', items: [
      { q: 'For the pair $(3, 12)$, the three simple means are:', options: ['$A = 15$, $G = 6$, $H = 4.8$', '$A = 7.5$, $G = 6$, $H = 6$', '$A = 7.5$, $G = 6$, $H = 4.8$', '$A = 7.5$, $G = 4.8$, $H = 6$'], answer: 2, explain: 'Sum-split, product-root, reciprocal-average: $A = \\tfrac{3+12}{2} = 7.5$, $G = \\sqrt{36} = 6$ and $H = \\tfrac{2 \\cdot 36}{15} = 4.8$ (option C). Option A reports the raw SUM $3 + 12$ as the arithmetic mean — the halving was skipped, the oldest slip in the storey. Option B is the “$G = H$” fraud: on distinct positives the gap is $G - H = \\tfrac{\\sqrt{ab}}{a+b}(\\sqrt{a}-\\sqrt{b})^2 > 0$, here $6 - 4.8 = 1.2$ — the geometric mean never ties the harmonic unless the pair coincides. Option D inverts the chain — the geometric mean sits ABOVE the harmonic on positives, never below (witness $(1, 9)$: $G = 3 > 1.8 = H$), the second classic fraud of 4.1’s caution shelf.' },
      { q: 'On the constraint $x + y = 12$ ($x, y > 0$), the greatest value of $x^3y$ is:', options: ['$2187$, at the split $(9, 3)$', '$1296$, at the equal split $(6, 6)$', '$1728$ — the cube of the whole sum', '$36$ — the symmetric maximum'], answer: 0, explain: 'The exponent prices the split: $x : y = 3 : 1$, so the seat is $(9, 3)$ and $x^3y = 729 \\cdot 3 = 2187$ — confirmed by the weighted engine, $3\\left(\\tfrac{x}{3}\\right) + y = 12$ bounding $\\left(\\tfrac{x}{3}\\right)^3y \\leq 3^4 = 81$, cleared as $x^3y \\leq 27 \\cdot 81 = 2187$ (option A). Option B is the classic trap — the unweighted mean used where the weighted is due: the equal split delivers only $216 \\cdot 6 = 1296$, the trap 4.2’s caution box prices at a loss of about forty percent. Option C cubes the whole constraint as if the split never mattered — the exponent is trying to say “count me more times.” Option D pastes the SYMMETRIC product’s maximum $xy \\leq 36$ onto the asymmetric monomial — the wrong engine for the shape.' },
      { q: 'With $\\sum a_i^2 = 16$ and $\\sum b_i^2 = 25$ (equal-length real lists), the largest value the dot product $\\sum a_ib_i$ can take is:', options: ['$400$ — the ceiling of the squared version', '$20$ — the product of the two list-sizes', '$41$ — the sum of the two sizes', '$3$ — the root of the difference of the sizes'], answer: 1, explain: 'The unsquared Cauchy-Schwarz read: $\\left|\\sum a_ib_i\\right| \\leq \\sqrt{16}\\,\\sqrt{25} = 4 \\cdot 5 = 20$ (option B), attained exactly when the lists are proportional — e.g. $a = (2, 2, 2, 2)$ against $b = (2.5, 2.5, 2.5, 2.5)$, whose dot product is $20$ on the nose. Option A squares the ceiling — it prices $(\\sum a_ib_i)^2$, not the dot product; the squared theorem and the unsquared read are different deliverables. Option C adds the two sizes, which no law licenses — the bound is a product of roots, never a sum; option D roots the DIFFERENCE $\\sqrt{25 - 16} = 3$ — the Pythagoras habit manufacturing a number out of the wrong combination of the data.' },
      { q: 'For a triangle $ABC$, the greatest value of $\\sin A + \\sin B + \\sin C$ is:', options: ['$3$ — each sine is at most $1$', '$2$', '$\\sqrt{3}$', '$\\dfrac{3\\sqrt{3}}{2}$, attained at the equilateral'], answer: 3, explain: 'The sine cap: $\\sin A + \\sin B + \\sin C \\leq 3\\sin\\left(\\tfrac{A+B+C}{3}\\right) = 3\\sin 60^\\circ = \\tfrac{3\\sqrt{3}}{2} \\approx 2.598$ (option D) — and the equilateral ATTAINS it, so nothing smaller can bound every triangle. Option A is honest but loose: the angles sum to $\\pi$, so the three sines cannot all reach $1$ together — the constraint prices the cap below $3$. Option C ($\\approx 1.732$) already falls at the right triangle $30^\\circ$–$60^\\circ$–$90^\\circ$, whose sum is $\\approx 2.366$; option B falls at the equilateral itself ($2.598 > 2$) — counting terms is not pricing them.' },
      { q: 'With $|a| = 2$ and $|b| = 7$ (real $a, b$), the least and greatest values of $|a + b|$ are:', options: ['$0$ and $9$', '$5$ and $9$', '$5$ and $7$', '$2$ and $9$'], answer: 1, explain: 'The band engine: $\\bigl||a| - |b|\\bigr| = 5 \\leq |a+b| \\leq |a| + |b| = 9$, and on the LINE both ends are attained — the four sign pairs $(\\pm 2, \\pm 7)$ give sums $9, -5, 5, -9$, so $|a+b|$ takes exactly the values $5$ (opposite signs, the arms retracing) and $9$ (same signs, the arms tiling) (option B). Option A claims the arms can cancel to $0$ — they never can with DIFFERENT sizes; cancellation needs equal moduli. Option C prices $|b|$ alone as the ceiling, forgetting $a$’s contribution — the forward law reads BOTH sizes. Option D prices $|a|$ alone as the floor — the reverse law’s floor is the DIFFERENCE of the sizes, never the smaller size; the interior of the band belongs to the plane, where lesson 3.2 let the direction vary continuously.' },
    ] },

    { kind: 'exercises', title: 'Exercises 4.R — the mixed bench', sets: [
      { level: 'L1', questions: [
        { q: 'For the pair $(5, 45)$: compute the three simple means, verify the order, and exhibit the certificate $A - G = \\tfrac{(\\sqrt{a}-\\sqrt{b})^2}{2}$ as an exact number.', solution: [
          'The means: $A = \\tfrac{5+45}{2} = 25$, $G = \\sqrt{225} = 15$ and $H = \\tfrac{2 \\cdot 225}{50} = 9$.',
          'The order: $25 \\geq 15 \\geq 9$, strict at both links because $5 \\neq 45$.',
          'The certificate: $(\\sqrt{45} - \\sqrt{5})^2 = 45 + 5 - 2\\sqrt{225} = 50 - 30 = 20$, and half of it is $10$.',
          'Hence $A - G = 25 - 15 = 10 = \\tfrac{(\\sqrt{45}-\\sqrt{5})^2}{2}$ — the arithmetic–geometric gap is half a perfect square, the whole two-number engine in one number (4.1’s certificate, re-run).',
        ], answer: '$A = 25$, $G = 15$, $H = 9$; the order holds strictly and $A - G = 10$ certified' },
        { q: 'Among all rectangles of perimeter $24$: find the greatest area, the shape that attains it, and the census of the near misses $4 \\times 8$ and $5 \\times 7$.', solution: [
          'Name the constraint: the sides $x$ and $12 - x$ carry the fixed sum $12$ (the half-perimeter), and the area is their product.',
          'The fixed-sum discipline: $x(12 - x) \\leq \\left(\\tfrac{x + (12 - x)}{2}\\right)^2 = 6^2 = 36$, equality exactly at $x = 6$ — the square.',
          'The census: $4 \\times 8$ encloses $32$ and $5 \\times 7$ encloses $35$ — each step toward balance buys area, and the equal split $6 \\times 6$ encloses $36$.',
          'Hence the greatest area is $36$ at the $6 \\times 6$ square — the fencing discipline of 4.1 priced with no vertex form: a perimeter-$P$ rectangle never exceeds $\\left(\\tfrac{P}{4}\\right)^2$.',
        ], answer: 'greatest area $36$ at the $6 \\times 6$ square; the near misses enclose $32$ and $35$' },
      ] },
      { level: 'L2', questions: [
        { q: 'For $x, y > 0$ with $x + y = 10$: find the least value of $\\tfrac{9}{x} + \\tfrac{16}{y}$ and the seat where it is attained.', solution: [
          'Square-root split the tops: $\\tfrac{9}{x} = \\tfrac{3^2}{x}$ and $\\tfrac{16}{y} = \\tfrac{4^2}{y}$ — the bottoms are positive, so Engel’s machine is live.',
          'The floor: $\\tfrac{9}{x} + \\tfrac{16}{y} \\geq \\tfrac{(3 + 4)^2}{x + y} = \\tfrac{49}{10} = 4.9$ — the constraint itself becomes the bottom-sum.',
          'The tie needs the constant ratio $\\tfrac{3}{x} = \\tfrac{4}{y}$, that is $y = \\tfrac{4x}{3}$; with $x + y = 10$ the seat is $\\left(\\tfrac{30}{7}, \\tfrac{40}{7}\\right)$.',
          'Check the seat: $\\tfrac{9}{30/7} + \\tfrac{16}{40/7} = 2.1 + 2.8 = 4.9$ — the floor is attained exactly there, the ratios $\\tfrac{3}{30/7} = \\tfrac{4}{40/7} = \\tfrac{7}{10}$ agreeing.',
          'Hence the least value is $\\tfrac{49}{10}$ at $\\left(\\tfrac{30}{7}, \\tfrac{40}{7}\\right)$ — one line of Engel where a minimisation campaign would have gone.',
        ], answer: '$\\tfrac{49}{10} = 4.9$ at $\\left(\\tfrac{30}{7}, \\tfrac{40}{7}\\right)$' },
        { q: 'For the similarly sorted lists $a = (1, 3, 5)$ and $b = (2, 6, 10)$: compute the average of the products and the product of the averages, state the direction of the verdict, and price the slack by the centered identity.', solution: [
          'The average of the products: $\\tfrac{1}{3}(1 \\cdot 2 + 3 \\cdot 6 + 5 \\cdot 10) = \\tfrac{2 + 18 + 50}{3} = \\tfrac{70}{3} \\approx 23.33$.',
          'The product of the averages: $\\bar a\\,\\bar b = 3 \\cdot 6 = 18$.',
          'The direction: both lists ascend — similarly sorted — so Chebyshev reads $\\geq$: $\\tfrac{70}{3} \\geq 18$, strict because NEITHER list is constant (a constant list is the equality seat).',
          'The slack by the centered identity: $\\tfrac{70}{3} - 18 = \\tfrac{16}{3}$, and the certificate ledger reads $\\tfrac{1}{9}\\left[(1-3)(2-6) + (1-5)(2-10) + (3-5)(6-10)\\right] = \\tfrac{8 + 32 + 8}{9} = \\tfrac{48}{9} = \\tfrac{16}{3}$ — the pairwise order-agreements audit the gap exactly.',
          'Hence $\\tfrac{70}{3} \\geq 18$ with the slack $\\tfrac{16}{3}$ certified seat by seat — the covariance reading 4.4 filed forward.',
        ], answer: '$\\tfrac{70}{3} \\geq 18$, similarly sorted; slack $\\tfrac{16}{3}$ certified by the ledger $\\tfrac{1}{9}(8 + 32 + 8)$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $x(x - 5) < 3(x - 5)$ over the reals; then exhibit one seat of your solution set that violates $x < 3$, and name the order law of the real number system that the naive multiplication by $(x - 5)$ broke. (This is the review-page fold’s exercise — the Real Number System and Inequalities ground carrying the chapter’s engine.)', solution: [
          'Move everything to one side — the honest first move, because multiplying an inequality by a quantity of unknown sign is not a legal step: $x(x - 5) - 3(x - 5) < 0$.',
          'Factor: $(x - 5)(x - 3) < 0$ — a product claim, and products answer on the sign diagram: the factors differ in sign exactly between their roots.',
          'The verdict: $3 < x < 5$ — the open interval $(3, 5)$.',
          'The seat that breaks the naive route: $x = 4$ lies in $(3, 5)$ yet violates $x < 3$ — and it checks honestly: $4(4 - 5) = -4 < 3(4 - 5) = -3$, so the product claim holds while the scaled claim’s “therefore” fails.',
          'Hence the solution set is $(3, 5)$; the seat $x = 4$ exposes the fraud; and the broken law is the strike-by-a-negative flip — multiplying an inequality by a NEGATIVE quantity reverses its direction, and $(x - 5)$ is negative throughout $(3, 5)$. Scale only by settled-sign quantities, or case-split: the order discipline of the real number system that every engine in the chapter stands on.',
        ], answer: 'the open interval $(3, 5)$; the seat $x = 4$ violates $x < 3$; the broken law is the strike-by-a-negative flip (the real-number-system order ground)' },
        { q: 'For $x, y > 0$ with $x + y = 6$, find the least value of each of $x^2 + y^2$, $\\tfrac{1}{x} + \\tfrac{1}{y}$ and $\\tfrac{2}{x} + \\tfrac{18}{y}$, and the greatest value of $xy$ — naming the engine behind each verdict.', solution: [
          'The symmetric product (AM-GM, 4.1): $xy \\leq \\left(\\tfrac{6}{2}\\right)^2 = 9$, attained at $x = y = 3$.',
          'The square sum (the all-ones read of Cauchy-Schwarz, the $M_1 \\leq M_2$ rung of 4.2’s ladder, Jensen on the cup — one mathematics at three addresses): $x^2 + y^2 \\geq \\tfrac{(x+y)^2}{2} = 18$, again at $x = y = 3$.',
          'The plain fraction sum (Engel, 4.3): $\\tfrac{1}{x} + \\tfrac{1}{y} \\geq \\tfrac{(1+1)^2}{x+y} = \\tfrac{4}{6} = \\tfrac{2}{3}$, the tie at $x = y = 3$ (the ratios $\\tfrac{1}{x}$ and $\\tfrac{1}{y}$ agreeing).',
          'The weighted fraction sum (Engel again): $\\tfrac{2}{x} + \\tfrac{18}{y} \\geq \\tfrac{(\\sqrt{2} + \\sqrt{18})^2}{x + y} = \\tfrac{(4\\sqrt{2})^2}{6} = \\tfrac{32}{6} = \\tfrac{16}{3}$, the tie at $\\tfrac{\\sqrt{2}}{x} = \\tfrac{\\sqrt{18}}{y}$, that is $y = 3x$: with $x + y = 6$ the seat is $\\left(\\tfrac{3}{2}, \\tfrac{9}{2}\\right)$ — and it checks: $\\tfrac{4}{3} + 4 = \\tfrac{16}{3}$.',
          'Hence four verdicts, three engines, one constraint — the first three sharing the equal-split seat $x = y = 3$ and the fourth pricing its constants ($2 : 18 = 1 : 9$, the seat $y = 3x$): the map reading of the whole chapter on one line.',
        ], answer: 'greatest $xy = 9$; leasts $18$, $\\tfrac{2}{3}$ and $\\tfrac{16}{3}$ — engines AM-GM, the QM–AM rung, Engel twice; the last attained at $\\left(\\tfrac{3}{2}, \\tfrac{9}{2}\\right)$' },
        { q: 'The weights $1, 2, 3, 4$ are to be paired with the entries of the list $(5, 1, 4, 2)$. Find the given pairing’s sum, the maximum and the minimum over all arrangements, and decompose the gap from the given seat to the ceiling into swap certificates.', solution: [
          'The given pairing: $1 \\cdot 5 + 2 \\cdot 1 + 3 \\cdot 4 + 4 \\cdot 2 = 5 + 2 + 12 + 8 = 27$ — a middle seat.',
          'The ceiling: the entries sorted ascend as $(1, 2, 4, 5)$ against the ascending weights — the sorted pairing pays $1 \\cdot 1 + 2 \\cdot 2 + 3 \\cdot 4 + 4 \\cdot 5 = 1 + 4 + 12 + 20 = 37$; the floor is the reversed $1 \\cdot 5 + 2 \\cdot 4 + 3 \\cdot 2 + 4 \\cdot 1 = 5 + 8 + 6 + 4 = 23$.',
          'First inversion: seats 1–2 hold entries $5 > 1$ against weights $1 \\leq 2$ — the swap gains $(2 - 1)(5 - 1) = 4$, landing at $(1, 5, 4, 2)$ with sum $31$.',
          'Next: seats 2–3 hold $5 > 4$ — gain $(3 - 2)(5 - 4) = 1$, landing at $(1, 4, 5, 2)$ with sum $32$; then seats 3–4 hold $5 > 2$ — gain $(4 - 3)(5 - 2) = 3$, landing at $(1, 4, 2, 5)$ with sum $35$.',
          'Last inversion: seats 2–3 hold $4 > 2$ — gain $(3 - 2)(4 - 2) = 2$, landing at the sorted $(1, 2, 4, 5)$ with sum $37$ — and the ledger checks: $4 + 1 + 3 + 2 = 10 = 37 - 27$, every unit of the gap an uncrossing.',
        ], answer: 'given $27$; maximum $37$ (sorted), minimum $23$ (reversed); the gap $10$ decomposed as swaps $4 + 1 + 3 + 2$' },
      ] },
      { level: 'L4', questions: [
        { q: 'Exam-style (Single Correct). The least value of $2^x + 2^{4 - x}$ over all real $x$ is: (A) $8$ (B) $16$ (C) $4$ (D) $2\\sqrt{2}$. Find the answer with full reasoning and the equality seat.', solution: [
          'Name the pair: the two terms $2^x$ and $2^{4-x}$ are positive, and their product is $2^x \\cdot 2^{4-x} = 2^4 = 16$ — a fixed product hunting its minimum sum (the 4.1 exam family, fresh constants).',
          'AM-GM: $2^x + 2^{4-x} \\geq 2\\sqrt{16} = 8$.',
          'Check the certificate: equality needs $2^x = 2^{4-x}$, that is $2x = 4$, so $x = 2$ — an honest real seat inside the constraint, so the bound is attained and IS the minimum.',
          'So the answer is (A) $8$; (B)’s $16$ is the PRODUCT of the pair reported as a sum; (C)’s $4$ is $2\\sqrt{4}$ — the reciprocal-pair constant pasted onto the wrong pair; (D)’s $2\\sqrt{2}$ halves the honest $2\\sqrt{16}$ — every distractor a mispriced piece of the same data.',
        ], answer: '(A) $8$, attained at $x = 2$' },
        { q: 'Exam-style (Multiple Correct). For positive $a, b, c$, which of the following hold? (A) $(a+b+c)\\left(\\tfrac{1}{a}+\\tfrac{1}{b}+\\tfrac{1}{c}\\right) \\geq 9$; (B) $\\tfrac{a}{b+c} + \\tfrac{b}{c+a} + \\tfrac{c}{a+b} \\geq \\tfrac{3}{2}$; (C) $(a+b+c)^2 \\geq 3(ab+bc+ca)$; (D) $\\tfrac{a}{b+c} + \\tfrac{b}{c+a} + \\tfrac{c}{a+b} \\leq 2$. Identify every true statement.', solution: [
          '(A) TRUE — three engines, one floor: the oppositely sorted Chebyshev applied directly (the average product $1$ against the product of averages), the AM–GM expansion $3 + \\left(x + \\tfrac{1}{x}\\right)\\text{-pairs} \\geq 3 + 6 = 9$, and Engel’s one-liner $(\\sum x)(\\sum \\tfrac{1}{x}) \\geq (\\sum \\sqrt{x \\cdot 1/x})^2 = 9$ — all tying exactly at $a = b = c$.',
          '(B) TRUE — Nesbitt: the Engel chain $\\sum \\tfrac{a^2}{ab+ac} \\geq \\tfrac{(a+b+c)^2}{2(ab+bc+ca)} \\geq \\tfrac{3}{2}$, the last rung closed by (C) itself; tie at $a = b = c$.',
          '(C) TRUE — the 4.1-family square certificate: $(a+b+c)^2 - 3(ab+bc+ca) = \\tfrac{1}{2}\\left[(a-b)^2 + (b-c)^2 + (c-a)^2\\right] \\geq 0$; also Cauchy-Schwarz on the rotated lists, 4.3’s second route.',
          '(D) FALSE — there is NO ceiling: at $(a, b, c) = (10, 1, 1)$ the sum reads $\\tfrac{10}{2} + \\tfrac{1}{11} + \\tfrac{1}{11} = 5 + \\tfrac{2}{11} \\approx 5.18 > 2$, and skewing one variable sends a term to infinity — bounds and values are different products, honestly separated.',
          'Hence (A), (B) and (C) hold; only the invented ceiling (D) fails — a floor with a tie and no ceiling at all.',
        ], answer: '(A), (B) and (C) are true; (D) fails — no upper bound exists (witness $(10, 1, 1)$: $\\approx 5.18$)' },
        { q: 'Exam-style (Linked Comprehension). A triangle has angles $A = 40^\\circ$, $B = 60^\\circ$, $C = 80^\\circ$. (i) State the engine that bounds $\\sin A + \\sin B + \\sin C$ and the bound it prints. (ii) Compute the sum and the spread’s tax. (iii) Name the equality seat — the triangle that pays no tax — and say why no smaller number bounds every triangle.', solution: [
          '(i) The engine is Jensen’s concave flip on the sine arch $(0, \\pi)$ — lesson 4.5’s sine-cap witness: $\\sin A + \\sin B + \\sin C \\leq 3\\sin\\left(\\tfrac{A+B+C}{3}\\right) = 3\\sin 60^\\circ = \\tfrac{3\\sqrt{3}}{2}$.',
          '(ii) The sum: $\\sin 40^\\circ + \\sin 60^\\circ + \\sin 80^\\circ \\approx 0.643 + 0.866 + 0.985 = 2.494$; the bound $\\tfrac{3\\sqrt{3}}{2} \\approx 2.598$ — the tax $\\approx 0.104$, the spread’s price.',
          '(iii) The equality seat is the equilateral $A = B = C = 60^\\circ$, where the sum reads $3\\sin 60^\\circ = \\tfrac{3\\sqrt{3}}{2}$ exactly — and no SMALLER number bounds every triangle because the equilateral attains this one: a bound below $\\tfrac{3\\sqrt{3}}{2}$ would already fail on the equilateral itself.',
          'Hence the comprehension’s chain — the engine (concavity), the number ($2.494 \\leq 2.598$), the seat (equilateral) — is the three questions an examination asks of one bound, and the pairwise certificate prices part of the tax as $2\\sin 60^\\circ(1 - \\cos 20^\\circ)$ on the $40^\\circ$–$80^\\circ$ pair.',
        ], answer: '(i) the sine cap, bound $\\tfrac{3\\sqrt{3}}{2}$; (ii) $\\approx 2.494$, tax $\\approx 0.104$; (iii) the equilateral — attained, so the bound is sharp' },
      ] },
      { level: 'L5', questions: [
        { q: 'Exam-style (Numerical Value). The minimum value of $|x - 1| + |x - 4| + |x - 6|$ is — (integer answer). Price it by pairing the outer arms, and name the seat that attains it.', solution: [
          'Pair the outer arms by the detour tax: $|x - 1| + |x - 6| \\geq |1 - 6| = 5$, equality exactly on the whole segment $[1, 6]$.',
          'The middle arm never hurts: $|x - 4| \\geq 0$ always — so the total is at least $5 + 0 = 5$.',
          'Attainment needs BOTH tight: $x \\in [1, 6]$ AND $|x - 4| = 0$ — so $x = 4$, which lies on the segment: the unique minimiser.',
          'Check the seat: $x = 4$ gives $3 + 0 + 2 = 5$; the neighbours $x = 3$ give $2 + 1 + 3 = 6$ and $x = 5$ give $4 + 1 + 1 = 6$; far out, $x = 0$ pays $1 + 4 + 6 = 11$.',
          'Hence the minimum is $5$, attained only at $x = 4$ — the outer gap plus the middle arm’s vanishing seat: the general three-arm discipline, the middle centre winning when it lies between the outer pair.',
        ], answer: 'minimum $5$, attained only at $x = 4$' },
        { q: 'For $x \\leq y \\leq z$, prove the self-pairing band $y^2 + 2xz \\leq xy + yz + zx \\leq x^2 + y^2 + z^2$ by the rearrangement inequality, and verify both rungs with their gap identities at $(x, y, z) = (2, 3, 6)$.', solution: [
          'The band is rearrangement applied to the list $(x, y, z)$ paired with arrangements of ITSELF: the identity pairing pays $x^2 + y^2 + z^2$ — the ceiling, both lists ascending; the reversed pays $xz + y^2 + zx = y^2 + 2xz$ — the floor; the cyclic pairing $xy + yz + zx$ is a middle arrangement, so it sits between (4.4’s engine, one line of recall).',
          'The ceiling gap identity: $x^2 + y^2 + z^2 - (xy + yz + zx) = \\tfrac{1}{2}\\left[(x-y)^2 + (y-z)^2 + (z-x)^2\\right] \\geq 0$ — a sum of squares, the 4.1-family certificate.',
          'The floor gap identity: $(xy + yz + zx) - (y^2 + 2xz) = (x - y)(y - z) \\geq 0$ for $x \\leq y \\leq z$ — a product of two non-positives, non-negative precisely because of the order.',
          'The witness at $(2, 3, 6)$: the floor $9 + 24 = 33$, the cyclic $6 + 18 + 12 = 36$, the ceiling $4 + 9 + 36 = 49$ — the band $33 \\leq 36 \\leq 49$ holds.',
          'And both gaps certify: $49 - 36 = 13 = \\tfrac{1}{2}(1 + 9 + 16)$ and $36 - 33 = 3 = (2 - 3)(3 - 6)$ — hence the band is tight exactly where the spread vanishes, $x = y = z$, both rungs dying together.',
        ], answer: 'proved by rearrangement; at $(2, 3, 6)$: $33 \\leq 36 \\leq 49$ with gaps $13 = \\tfrac{1}{2}(1 + 9 + 16)$ and $3 = (2-3)(3-6)$' },
        { q: 'For positive $a, b$ with $a + b = 10$: find the greatest value of $\\sqrt{a} + \\sqrt{b}$ and the seat attaining it; then say, with a reason, whether a least value exists.', solution: [
          'The engine: $f(t) = \\sqrt{t}$ is concave on $(0, \\infty)$ — 4.5’s cap family, whose two-number certificate IS the AM–GM — so Jensen’s flip reads $f\\left(\\tfrac{a+b}{2}\\right) \\geq \\tfrac{f(a) + f(b)}{2}$.',
          'Substituting the constraint: $\\sqrt{5} \\geq \\tfrac{\\sqrt{a} + \\sqrt{b}}{2}$, so $\\sqrt{a} + \\sqrt{b} \\leq 2\\sqrt{5} \\approx 4.47$ — attained exactly at the equal split $a = b = 5$.',
          'The AM–GM behind it, one line of recall with a pointer to 4.5: both sides of the claim are positive, so squaring (the licence) collapses it to $a + b \\geq 2\\sqrt{ab}$ — the oldest engine of the chapter standing exactly where the curvature claim needed it.',
          'Witness the fall from balance: at $(1, 9)$ the sum reads $1 + 3 = 4 < 4.47$; at $(0.01, 9.99)$ it reads $0.1 + 3.16 \\approx 3.26$ — balance is the cap family’s reward.',
          'The least value: NONE exists — as $a \\to 0^+$ the sum falls toward $\\sqrt{10} \\approx 3.16$ without ever reaching it (the boundary seat $a = 0$ is excluded by positivity). Hence the honest verdict: greatest $2\\sqrt{5}$, attained; infimum $\\sqrt{10}$, unattained — a ceiling with a seat, a floor without one.',
        ], answer: 'greatest $2\\sqrt{5} \\approx 4.47$ at $a = b = 5$; no least value — the infimum $\\sqrt{10} \\approx 3.16$ is approached, never attained' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove that for positive $a, b, c$: $(a+b)(b+c)(c+a) \\geq 8abc$, by TWO routes — three AM–GM strikes, and the identity $(a+b)(b+c)(c+a) = (a+b+c)(ab+bc+ca) - abc$ with the three-variable symmetric bounds lesson 4.2 banked — and witness the gap at $(a, b, c) = (1, 2, 3)$.', solution: [
          'Route one, three strikes: $a + b \\geq 2\\sqrt{ab}$, $b + c \\geq 2\\sqrt{bc}$, $c + a \\geq 2\\sqrt{ca}$ — every factor positive, so multiplying the three orders preserves the direction: the product is at least $8\\sqrt{ab \\cdot bc \\cdot ca} = 8abc$.',
          'Equality: all three strikes tie at once, which forces $a = b = c$ — the balanced seat again.',
          'Route two, the identity: $(a+b)(b+c)(c+a) = (a+b+c)(ab+bc+ca) - abc$ — verified by expansion and by the engine on integer triples; at $(1, 2, 3)$: $3 \\cdot 5 \\cdot 4 = 60$ and $6 \\cdot 11 - 6 = 60$.',
          'The symmetric bounds 4.2 banked close it: $a+b+c \\geq 3(abc)^{1/3}$ and $ab + bc + ca \\geq 3(abc)^{2/3}$, so the product of the two sums is at least $9abc$, and subtracting the $abc$ leaves $\\geq 8abc$ — the same floor, and the same equality seat $a = b = c$ (the general-$n$ certificate behind these bounds is the chapter 7 induction the closing names).',
          'Witness the gap at $(1, 2, 3)$: the product $60$ against $8abc = 48$ — a gap of $12$, strict because the triple is unbalanced; and the identity check $60 = 6 \\cdot 11 - 6$ certifies the algebra.',
        ], answer: 'proved by both routes; at $(1, 2, 3)$: $60 \\geq 48$, gap $12$; equality iff $a = b = c$' },
        { q: 'Prove that for positive $a, b, c$: $a^3 + b^3 + c^3 \\geq 3abc$ — by the factorisation identity and the square certificate — state the equality case, witness at $(1, 2, 3)$, and name the certificate this proof shares with the self-pairing band above.', solution: [
          'The factorisation identity: $a^3 + b^3 + c^3 - 3abc = (a + b + c)\\left(a^2 + b^2 + c^2 - ab - bc - ca\\right)$ — verified by expansion and swept by the engine on integer triples; at $(1, 2, 3)$: $36 - 18 = 18$ and $6 \\cdot (14 - 11) = 18$.',
          'The first factor is positive — positives sum to a positive.',
          'The second factor is the 4.1-family certificate: $a^2 + b^2 + c^2 - ab - bc - ca = \\tfrac{1}{2}\\left[(a-b)^2 + (b-c)^2 + (c-a)^2\\right] \\geq 0$ — a sum of squares that dies exactly at $a = b = c$.',
          'So the product of a positive factor and a non-negative factor is non-negative: $a^3 + b^3 + c^3 \\geq 3abc$, equality exactly $a = b = c$.',
          'Witness at $(1, 2, 3)$: $1 + 8 + 27 = 36 \\geq 18 = 3 \\cdot 6$, the gap $18 = 6 \\cdot 3$ — the two factors priced separately. The shared certificate: the vanishing square-sum $\\tfrac{1}{2}\\left[(a-b)^2 + (b-c)^2 + (c-a)^2\\right]$ is exactly the ceiling gap of the self-pairing band above — one certificate, two classical bounds.',
        ], answer: 'proved; equality iff $a = b = c$; at $(1, 2, 3)$: $36 \\geq 18$ with gap $18 = 6 \\cdot 3$; the shared certificate is the square-sum $\\tfrac{1}{2}[(a-b)^2 + (b-c)^2 + (c-a)^2]$' },
      ] },
    ] },
  ],
}


export const chapter04: Chapter = {
  number: 4,
  slug: 'classical-inequalities',
  title: 'Inequalities: the Classical Engine',
  summary:
    'AL chapter 7 settled order on the line for linear expressions; this chapter builds the classical machinery that competitive exams actually test — maxima and minima without calculus. The arithmetic–geometric mean inequality is proved for two numbers from the square that is never negative, stated honestly beyond, and worked under constraints (the fixed-sum, fixed-product discipline). Cauchy–Schwarz arrives with its Engel (Titu) form, the speed tool for fraction sums. And the absolute value FM priced as distance becomes a bound machine: |f| < g and |f| > g verdicts, the triangle inequality proved, and the |x| + |y| ≥ |x + y| reads that finish the engine. Every result is derived before it is used — the AM–GM equality condition is a theorem about when two numbers coincide, not a memorized footnote.',
  status: 'complete',
  lessons: [lesson41, lesson42, lesson43, lesson44, lesson45, lesson46, lessonReview4],
  plannedLessons: [],
}
