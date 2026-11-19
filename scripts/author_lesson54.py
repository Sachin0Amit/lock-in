"""Author AA lesson 5.4 'Special Series and the Method of Differences'.

Inserts the lesson54 block into ch-05.ts (before the chapter export), wires it
into the chapter lessons array, and trims plannedLessons. Every number below was
brute-verified green by scripts/verify-book4-ch05.ts section G BEFORE this prose.
"""
import re

P = 'src/data/library/books/mathematics/advanced-algebra/ch-05.ts'

FIG1 = ('<svg viewBox="0 0 640 310" xmlns="http://www.w3.org/2000/svg">'
'<text x="20" y="24" font-size="15" fill="#166534" font-family="Georgia, serif" font-weight="bold">The difference ladder: read the series one floor below</text>'
'<text x="40" y="90" font-size="13" fill="#166534" font-weight="bold">T</text>'
'<rect x="82" y="60" width="56" height="48" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>'
'<text x="110" y="90" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">2</text>'
'<rect x="192" y="60" width="56" height="48" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>'
'<text x="220" y="90" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">8</text>'
'<rect x="302" y="60" width="56" height="48" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>'
'<text x="330" y="90" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">26</text>'
'<rect x="412" y="60" width="56" height="48" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>'
'<text x="440" y="90" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">80</text>'
'<rect x="522" y="60" width="56" height="48" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>'
'<text x="550" y="90" font-size="14" fill="#166534" text-anchor="middle" font-weight="bold">242</text>'
'<line x1="165" y1="114" x2="165" y2="164" stroke="#0d9488" stroke-width="1.8" marker-end="url(#arrow-54a)"/>'
'<line x1="275" y1="114" x2="275" y2="164" stroke="#0d9488" stroke-width="1.8" marker-end="url(#arrow-54a)"/>'
'<line x1="385" y1="114" x2="385" y2="164" stroke="#0d9488" stroke-width="1.8" marker-end="url(#arrow-54a)"/>'
'<line x1="495" y1="114" x2="495" y2="164" stroke="#0d9488" stroke-width="1.8" marker-end="url(#arrow-54a)"/>'
'<text x="40" y="200" font-size="13" fill="#d97706" font-weight="bold">D</text>'
'<rect x="137" y="170" width="56" height="48" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>'
'<text x="165" y="200" font-size="14" fill="#d97706" text-anchor="middle" font-weight="bold">6</text>'
'<rect x="247" y="170" width="56" height="48" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>'
'<text x="275" y="200" font-size="14" fill="#d97706" text-anchor="middle" font-weight="bold">18</text>'
'<rect x="357" y="170" width="56" height="48" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>'
'<text x="385" y="200" font-size="14" fill="#d97706" text-anchor="middle" font-weight="bold">54</text>'
'<rect x="467" y="170" width="56" height="48" fill="#ffedd5" stroke="#d97706" stroke-width="1.6"/>'
'<text x="495" y="200" font-size="14" fill="#d97706" text-anchor="middle" font-weight="bold">162</text>'
'<text x="320" y="250" font-size="13" fill="#d97706" text-anchor="middle" font-weight="bold">the difference row 6, 18, 54, 162 — a G.P. with ratio 3</text>'
'<text x="320" y="278" font-size="12.5" fill="#0f766e" text-anchor="middle">each D is the gap between neighbours; the gaps themselves obey a progression</text>'
'<defs><marker id="arrow-54a" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#0d9488"/></marker></defs></svg>')

FIG2 = ('<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">'
'<text x="20" y="24" font-size="15" fill="#166534" font-family="Georgia, serif" font-weight="bold">The telescope at work: 1/(1·2) + 1/(2·3) + 1/(3·4) + 1/(4·5)</text>'
'<rect x="30" y="70" width="64" height="40" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>'
'<text x="62" y="96" font-size="13.5" fill="#166534" text-anchor="middle" font-weight="bold">1/1</text>'
'<rect x="106" y="70" width="64" height="40" fill="#ffffff" stroke="#d97706" stroke-width="1.6"/>'
'<text x="138" y="96" font-size="13.5" fill="#d97706" text-anchor="middle" font-weight="bold">−1/2</text>'
'<rect x="182" y="70" width="64" height="40" fill="#ffffff" stroke="#d97706" stroke-width="1.6"/>'
'<text x="214" y="96" font-size="13.5" fill="#d97706" text-anchor="middle" font-weight="bold">+1/2</text>'
'<rect x="258" y="70" width="64" height="40" fill="#ffffff" stroke="#d97706" stroke-width="1.6"/>'
'<text x="290" y="96" font-size="13.5" fill="#d97706" text-anchor="middle" font-weight="bold">−1/3</text>'
'<rect x="334" y="70" width="64" height="40" fill="#ffffff" stroke="#d97706" stroke-width="1.6"/>'
'<text x="366" y="96" font-size="13.5" fill="#d97706" text-anchor="middle" font-weight="bold">+1/3</text>'
'<rect x="410" y="70" width="64" height="40" fill="#ffffff" stroke="#d97706" stroke-width="1.6"/>'
'<text x="442" y="96" font-size="13.5" fill="#d97706" text-anchor="middle" font-weight="bold">−1/4</text>'
'<rect x="486" y="70" width="64" height="40" fill="#ffffff" stroke="#d97706" stroke-width="1.6"/>'
'<text x="518" y="96" font-size="13.5" fill="#d97706" text-anchor="middle" font-weight="bold">+1/4</text>'
'<rect x="562" y="70" width="64" height="40" fill="#fef3c7" stroke="#16a34a" stroke-width="2"/>'
'<text x="594" y="96" font-size="13.5" fill="#166534" text-anchor="middle" font-weight="bold">−1/5</text>'
'<path d="M 138 64 Q 176 34 214 64" stroke="#dc2626" stroke-width="1.6" fill="none"/>'
'<text x="176" y="30" font-size="12" fill="#dc2626" text-anchor="middle" font-weight="bold">0</text>'
'<path d="M 290 64 Q 328 34 366 64" stroke="#dc2626" stroke-width="1.6" fill="none"/>'
'<text x="328" y="30" font-size="12" fill="#dc2626" text-anchor="middle" font-weight="bold">0</text>'
'<path d="M 442 64 Q 480 34 518 64" stroke="#dc2626" stroke-width="1.6" fill="none"/>'
'<text x="480" y="30" font-size="12" fill="#dc2626" text-anchor="middle" font-weight="bold">0</text>'
'<text x="62" y="136" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="bold">alive: 1</text>'
'<text x="594" y="136" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="bold">alive: −1/5</text>'
'<text x="320" y="190" font-size="13" fill="#0d9488" text-anchor="middle" font-weight="bold">the middle cancels in pairs — the sum is 1 − 1/5 = 4/5</text>'
'<text x="320" y="220" font-size="13" fill="#166534" text-anchor="middle">at $n$ terms the read is 1 − 1/(n+1) = n/(n+1)</text>'
'<text x="320" y="248" font-size="13" fill="#ea580c" text-anchor="middle" font-weight="bold">to infinity the tail 1/(n+1) dies — the sum is exactly 1</text>'
'</svg>')

FIG3 = ('<svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg">'
'<text x="20" y="24" font-size="15" fill="#166534" font-family="Georgia, serif" font-weight="bold">The hockey stick: 1 + 3 + 6 + 10 = 20</text>'
'<text x="320" y="78" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<text x="290" y="122" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<text x="350" y="122" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<text x="260" y="166" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<text x="320" y="166" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">2</text>'
'<text x="380" y="166" font-size="13" fill="#d97706" text-anchor="middle" font-weight="bold">1</text>'
'<circle cx="380" cy="161" r="15" fill="#ffedd5" stroke="#d97706" stroke-width="1.8"/>'
'<text x="380" y="166" font-size="13" fill="#d97706" text-anchor="middle" font-weight="bold">1</text>'
'<text x="230" y="210" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<text x="290" y="210" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">3</text>'
'<text x="350" y="210" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">3</text>'
'<text x="410" y="210" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<circle cx="350" cy="205" r="15" fill="#ffedd5" stroke="#d97706" stroke-width="1.8"/>'
'<text x="350" y="210" font-size="13" fill="#d97706" text-anchor="middle" font-weight="bold">3</text>'
'<text x="200" y="254" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<text x="260" y="254" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">4</text>'
'<text x="320" y="254" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">6</text>'
'<text x="380" y="254" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">4</text>'
'<text x="440" y="254" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<circle cx="320" cy="249" r="15" fill="#ffedd5" stroke="#d97706" stroke-width="1.8"/>'
'<text x="320" y="254" font-size="13" fill="#d97706" text-anchor="middle" font-weight="bold">6</text>'
'<text x="170" y="298" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<text x="230" y="298" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">5</text>'
'<text x="290" y="298" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">10</text>'
'<text x="350" y="298" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">10</text>'
'<text x="410" y="298" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">5</text>'
'<text x="470" y="298" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<circle cx="290" cy="293" r="15" fill="#ffedd5" stroke="#d97706" stroke-width="1.8"/>'
'<text x="290" y="298" font-size="13" fill="#d97706" text-anchor="middle" font-weight="bold">10</text>'
'<text x="200" y="342" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<text x="260" y="342" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">6</text>'
'<text x="320" y="342" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">15</text>'
'<text x="380" y="342" font-size="13" fill="#ea580c" text-anchor="middle" font-weight="bold">20</text>'
'<text x="440" y="342" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">15</text>'
'<text x="500" y="342" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">6</text>'
'<text x="560" y="342" font-size="13" fill="#166534" text-anchor="middle" font-weight="bold">1</text>'
'<circle cx="380" cy="337" r="16" fill="#ffedd5" stroke="#ea580c" stroke-width="2.2"/>'
'<text x="380" y="342" font-size="13" fill="#ea580c" text-anchor="middle" font-weight="bold">20</text>'
'<path d="M 396 172 Q 430 260 400 330" stroke="#d97706" stroke-width="1.8" fill="none" marker-end="url(#arrow-54c)"/>'
'<text x="470" y="300" font-size="12.5" fill="#d97706" text-anchor="middle" font-weight="bold">the diagonal</text>'
'<text x="470" y="318" font-size="12.5" fill="#d97706" text-anchor="middle" font-weight="bold">lands at 20</text>'
'<defs><marker id="arrow-54c" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#d97706"/></marker></defs></svg>')

# The lesson body is written as a TS fragment file, then spliced in.
body = r"""
/** Lesson 5.4 — authored run 112 (2026-11-20), single-job serial order.
 *  Engines green BEFORE prose: scripts/verify-book4-ch05.ts section G 29/29
 *  (which caught the 5th-term slip 515 → 513 in the r = 4 family pre-prose).
 *  No fold hosts here (the power-sum folds belong to lesson 5.5); the m2-05
 *  bands informed method shapes only — every exhibit below is our own.
 *  4 derivations; 8 formula cards; 3 figures (vivid palette); 12 Illustrations;
 *  quiz keys [1,0,0,1,2]; 15 exercises 2/2/3/3/3/2. The finite-differences
 *  attribution (Taylor, Methodus Incrementorum, 1715) verified via web research
 *  (banked as the SOURCE_LOG key wiki-brook-taylor-finite-differences). */
const lesson54: Lesson = {
  id: 'aa-special-series-and-the-method-of-differences',
  number: '5.4',
  title: 'Special Series and the Method of Differences',
  concepts: [
    'the difference census: reading a series one floor below',
    'telescoping series and the collapse law',
    'the partial-fraction telescope 1/(k(k+1))',
    'the method of differences: shift-and-subtract, second life',
    'differences in G.P. and the two-point fit',
    'differences in A.P. and the triangular build',
    'the hockey-stick identity and C(n,3)',
    'the cube telescope and the n³ sum',
  ],
  objectives: [
    'Census any series through its difference row, recognize when the row is itself an A.P. or a G.P., and predict which machine will sum the series before any algebra runs.',
    'Prove the collapse law, sum the partial-fraction telescopes 1/(k(k+1)) and 1/(k(k+1)(k+2)) to n terms and to infinity, and run the odd-pair and surd telescopes at exam speed.',
    'Run the method of differences when the difference row is a G.P.: recover T_n by accumulation, fit the shape A·r^n + B from two terms, and split S_n into pieces the chapter already prices.',
    'Run the triangular build when the difference row is an A.P., and price the sum through the hockey-stick identity Σ (k−1)(k−2)/2 = n(n−1)(n−2)/6.',
    'Know where the machine stops: factorial ladders and other wild difference rows belong to lesson 5.5 — the cube telescope Σ(3k² − 3k + 1) = n³ is the bridge, and the exam classic 1 + 7 + 19 + 37 + ⋯ = n³ is its face.',
  ],
  prerequisites: ['aa-arithmetic-progressions-the-constant-climb', 'aa-geometric-progressions-and-the-infinite-tail', 'aa-harmonic-and-arithmetico-geometric-progressions'],
  sources: ['cengage-m2-05', 'ncert-math11-ch8-sequences-series', 'wiki-brook-taylor-finite-differences'],
  blocks: [
    { kind: 'para', text: 'Lessons 5.1 and 5.2 priced the two progressions: equal steps and equal ratios. But the examination shelf is full of series that are **neither** — $2, 8, 26, 80, \\ldots$ doubles nowhere and grows by no constant step, yet its sum to $n$ terms collapses to a two-piece closed form as clean as any A.P. The secret is a reading habit this lesson makes formal: when a series resists the progression tests, **drop one floor** and look at the row of differences between neighbours. That row is very often a progression the chapter already owns — and once the floor below is an A.P. or a G.P., the whole apparatus of 5.1 and 5.2 applies one storey up. As always, every number below was recomputed and pinned by the chapter engine before a word of prose was written.' },
    { kind: 'callout', tone: 'definition', title: 'The difference row', text: 'For a series $T_1, T_2, T_3, \\ldots$ the **difference row** is $D_1 = T_2 - T_1$, $D_2 = T_3 - T_2$, $D_3 = T_4 - T_3, \\ldots$ — one entry per gap between neighbours. **Censusing a series** means computing its difference row and classifying it: a constant row is the A.P. of lesson 5.1 in disguise; a constant-ratio row is a G.P. wearing a mask; anything else asks for a second floor or for the special machines of this lesson.' },
    { kind: 'example', title: 'Census the series $2, 8, 26, 80, 242, \\ldots$', steps: [
      'Now, take the gaps: $8 - 2 = 6$, $26 - 8 = 18$, $80 - 26 = 54$, $242 - 80 = 162$ — the difference row is $6, 18, 54, 162$.',
      'So, test the row itself: $18/6 = 3$, $54/18 = 3$, $162/54 = 3$ — a constant **ratio**. The difference row is a G.P. with $r = 3$ and first term $6$.',
      'Hence, the census reads: the series is not a progression, but its gaps triple every step — an exponential engine with a head start. The next term is $242 + 162 \\times 3 = 728$.' ] },
    { kind: 'example', title: 'Census the series $2, 6, 13, 23, 36, \\ldots$', steps: [
      'Now, the gaps: $6 - 2 = 4$, $13 - 6 = 7$, $23 - 13 = 10$, $36 - 23 = 13$ — the difference row is $4, 7, 10, 13$.',
      'So, test the row: $7 - 4 = 3$, $10 - 7 = 3$, $13 - 10 = 3$ — a constant **difference**. The difference row is an A.P. with $d = 3$, first term $4$.',
      'Hence, the census reads: equal steps one floor below — the series is built by adding a climbing ladder, which is the signature of a **quadratic** general term (the triangular build of the last section).' ] },
    { kind: 'figure', caption: 'The difference ladder for $2, 8, 26, 80, 242$: five terms on the top row, four gaps beneath, and the gap row itself a clean G.P. with ratio 3. The census question — what kind of series is this? — is answered one floor below.', svg: 'FIG1' },
    { kind: 'callout', tone: 'insight', title: 'Why the census works', text: 'Summing the difference row reconstructs the series: $T_n = T_1 + D_1 + D_2 + \\cdots + D_{n-1}$. So if the $D$ row is a progression, every $T_n$ is **one G.P. sum or one A.P. sum away** from being written in closed form — machinery 5.1 and 5.2 already built. The whole method of differences is this one sentence put to work. Historically, the calculus of finite differences was first organised by Brook Taylor in his *Methodus Incrementorum* (1715) — the same Taylor whose name the series carries; the attribution is the standard reported history.' },

    { kind: 'heading', text: 'Telescoping: the Collapse Machine' },
    { kind: 'para', text: 'The gentlest special series needs no difference row at all — its terms are already **differences in disguise**. A series $u_1 - u_2 + u_2 - u_3 + \\cdots$ is called **telescoping**: when written out, every interior piece appears once with a plus and once with a minus, and the whole sum collapses to the two ends. The name is the picture: the tube folds shut, and only the outer rim survives.' },
    { kind: 'derivation', title: 'The collapse law', statement: 'For any sequence $u_1, u_2, \\ldots, u_{n+1}$, the telescoping sum $\\sum_{k=1}^{n} (u_k - u_{k+1}) = u_1 - u_{n+1}$.', steps: [
      { label: 'Write the sum out', formula: '(u_1 - u_2) + (u_2 - u_3) + (u_3 - u_4) + \\cdots + (u_n - u_{n+1})', explanation: 'No computation yet — just the literal sum of $n$ differences.' },
      { label: 'Collect the interior pieces', formula: 'u_1 + (-u_2 + u_2) + (-u_3 + u_3) + \\cdots + (-u_n + u_n) - u_{n+1}', explanation: 'Regroup: each interior $u_k$ for $2 \\leq k \\leq n$ appears exactly once with each sign.' },
      { label: 'Collapse', formula: 'u_1 - u_{n+1}', explanation: 'Every interior pair cancels to zero — the collapse law. All the work of the sum lives at the two ends.' },
    ], result: '$\\sum_{k=1}^{n} (u_k - u_{k+1}) = u_1 - u_{n+1}$ — the telescoping collapse law' },
    { kind: 'para', text: 'The exam-facing telescope comes from partial fractions: $\\dfrac{1}{k(k+1)} = \\dfrac{1}{k} - \\dfrac{1}{k+1}$ — each term of the series $\\dfrac{1}{1 \\cdot 2} + \\dfrac{1}{2 \\cdot 3} + \\dfrac{1}{3 \\cdot 4} + \\cdots$ **is** a $u_k - u_{k+1}$ with $u_k = \\dfrac{1}{k}$. The collapse law then hands the sum over with no computation at all.' },
    { kind: 'example', title: 'Sum $\\dfrac{1}{1 \\cdot 2} + \\dfrac{1}{2 \\cdot 3} + \\dfrac{1}{3 \\cdot 4} + \\dfrac{1}{4 \\cdot 5}$ and check the closed form.', steps: [
      'Now, split each term: $\\dfrac{1}{1 \\cdot 2} = 1 - \\dfrac{1}{2}$, $\\dfrac{1}{2 \\cdot 3} = \\dfrac{1}{2} - \\dfrac{1}{3}$, $\\dfrac{1}{3 \\cdot 4} = \\dfrac{1}{3} - \\dfrac{1}{4}$, $\\dfrac{1}{4 \\cdot 5} = \\dfrac{1}{4} - \\dfrac{1}{5}$.',
      'So, the sum is $(1 - \\tfrac{1}{2}) + (\\tfrac{1}{2} - \\tfrac{1}{3}) + (\\tfrac{1}{3} - \\tfrac{1}{4}) + (\\tfrac{1}{4} - \\tfrac{1}{5})$ — the interior thirds, quarters and halves pair off and die.',
      'Hence, the sum is $1 - \\dfrac{1}{5} = \\dfrac{4}{5}$, exactly the collapse law $u_1 - u_5$ with $u_k = 1/k$; at $n$ terms the read is $1 - \\dfrac{1}{n+1} = \\dfrac{n}{n+1}$.' ] },
    { kind: 'figure', caption: 'The telescope at work on $1/(1 \\cdot 2) + 1/(2 \\cdot 3) + 1/(3 \\cdot 4) + 1/(4 \\cdot 5)$: each interior piece appears once with each sign, the red arcs strike the cancelling pairs, and only the outer rim $1$ and $-1/5$ survives — the sum is $4/5$.', svg: 'FIG2' },
    { kind: 'derivation', title: 'The triple telescope', statement: 'For $n \\geq 1$, $\\sum_{k=1}^{n} \\dfrac{1}{k(k+1)(k+2)} = \\dfrac{1}{2}\\left(\\dfrac{1}{2} - \\dfrac{1}{(n+1)(n+2)}\\right)$, and the infinite sum is exactly $\\dfrac{1}{4}$.', steps: [
      { label: 'Split by partial fractions', formula: '\\dfrac{1}{k(k+1)(k+2)} = \\dfrac{1}{2}\\left(\\dfrac{1}{k(k+1)} - \\dfrac{1}{(k+1)(k+2)}\\right)', explanation: 'Check at $k = 1$: the right side is $\\tfrac{1}{2}(\\tfrac{1}{2} - \\tfrac{1}{6}) = \\tfrac{1}{6}$ — the left side. The identity is a telescoping pair one floor up: each term is $\\tfrac{1}{2}(v_k - v_{k+1})$ with $v_k = 1/(k(k+1))$.' },
      { label: 'Sum and collapse', formula: '\\sum_{k=1}^{n} \\dfrac{1}{k(k+1)(k+2)} = \\dfrac{1}{2}\\left(v_1 - v_{n+1}\\right) = \\dfrac{1}{2}\\left(\\dfrac{1}{2} - \\dfrac{1}{(n+1)(n+2)}\\right)', explanation: 'The collapse law applies to the $v$ row directly.' },
      { label: 'Take the infinite tail', formula: 'S_\\infty = \\dfrac{1}{2} \\cdot \\dfrac{1}{2} = \\dfrac{1}{4}', explanation: 'As $n \\to \\infty$ the piece $1/((n+1)(n+2))$ dies — the honest note is that a telescope needs no $|r| < 1$ kingdom: the endpoint $v_{n+1} \\to 0$ is the whole licence, verified numerically by the engine sweep (200000 terms land on $0.250000$).' },
    ], result: '$\\sum_{k=1}^{n} \\tfrac{1}{k(k+1)(k+2)} = \\tfrac{1}{2}\\left(\\tfrac{1}{2} - \\tfrac{1}{(n+1)(n+2)}\\right)$; the infinite sum is $\\tfrac{1}{4}$' },
    { kind: 'example', title: 'Sum $\\dfrac{1}{1 \\cdot 3} + \\dfrac{1}{3 \\cdot 5} + \\dfrac{1}{5 \\cdot 7} + \\dfrac{1}{7 \\cdot 9}$ — the odd-pair telescope.', steps: [
      'Now, split: $\\dfrac{1}{(2k-1)(2k+1)} = \\dfrac{1}{2}\\left(\\dfrac{1}{2k-1} - \\dfrac{1}{2k+1}\\right)$ — half the gap of consecutive odd reciprocals.',
      'So, the sum is $\\dfrac{1}{2}\\left[(1 - \\tfrac{1}{3}) + (\\tfrac{1}{3} - \\tfrac{1}{5}) + (\\tfrac{1}{5} - \\tfrac{1}{7}) + (\\tfrac{1}{7} - \\tfrac{1}{9})\\right] = \\dfrac{1}{2}\\left(1 - \\dfrac{1}{9}\\right) = \\dfrac{1}{2} \\cdot \\dfrac{8}{9} = \\dfrac{4}{9}$.',
      'Hence, at $n$ terms the read is $\\dfrac{1}{2}\\left(1 - \\dfrac{1}{2n+1}\\right)$; here $n = 4$ gives $\\dfrac{1}{2} \\cdot \\dfrac{8}{9} = \\dfrac{4}{9}$.' ] },
    { kind: 'example', title: 'Sum $\\sqrt{2} - \\sqrt{1} + \\sqrt{3} - \\sqrt{2} + \\cdots$ to $n$ terms — the surd telescope.', steps: [
      'Now, read the series as $(\\sqrt{2} - \\sqrt{1}) + (\\sqrt{3} - \\sqrt{2}) + \\cdots + (\\sqrt{n+1} - \\sqrt{n})$ — each bracket is $u_k - u_{k+1}$ with $u_k = \\sqrt{k}$.',
      'So, the collapse law gives $u_1 - u_{n+1} = 1 - \\sqrt{n+1}$ — wait: the signs run $\\sqrt{k+1} - \\sqrt{k}$, so the sum is $u_{n+1} - u_1$ = $\\sqrt{n+1} - 1$.',
      'Hence, the sum to $n$ terms is $\\sqrt{n+1} - 1$: at $n = 3$ it is $2 - 1 = 1$, and the partial sums grow like $\\sqrt{n}$ — the telescope does not converge, and the collapse says so honestly.' ] },
    { kind: 'callout', tone: 'exam', title: 'The telescoping checklist', text: 'Examination telescopes arrive as products: $\\dfrac{1}{k(k+1)}$, $\\dfrac{1}{(2k-1)(2k+1)}$, $\\dfrac{1}{k(k+1)(k+2)}$, $\\sqrt{k+1} - \\sqrt{k}$. The drill is always the same — split into a difference of consecutive somethings, then read the two ends. If the series is **infinite**, the only licence needed is that the surviving endpoint tends to $0$ (or to a finite limit); no ratio test, no kingdom condition.' },

    { kind: 'heading', text: 'The Method of Differences: the Machine, Second Life' },
    { kind: 'para', text: 'Now the census pays out. Suppose the difference row is a progression. Write the reconstruction $T_n = T_1 + D_1 + \\cdots + D_{n-1}$ and let 5.1 or 5.2 price the $D$ sum. The general term drops out in closed form; then $S_n = \\sum T_k$ splits into pieces the chapter already owns. This is the **method of differences** — the shift-and-subtract machine of lesson 5.2 run one storey up, on the difference row instead of the series itself.' },
    { kind: 'derivation', title: 'A G.P. difference row: the general term', statement: 'If $D_k = c \\, r^{\\,k-1}$ (the difference row is a G.P., first term $c$, ratio $r \\neq 1$), then $T_n = a + \\dfrac{c\\,(r^{\\,n-1} - 1)}{r - 1}$ where $a = T_1$.', steps: [
      { label: 'Reconstruct', formula: 'T_n = a + D_1 + D_2 + \\cdots + D_{n-1} = a + \\sum_{k=1}^{n-1} c\\,r^{\\,k-1}', explanation: 'Each step up the series adds one gap; $n - 1$ gaps climb from $T_1$ to $T_n$.' },
      { label: 'Price the G.P. sum', formula: 'T_n = a + c \\cdot \\dfrac{r^{\\,n-1} - 1}{r - 1}', explanation: 'The lesson-5.2 finite G.P. sum with $n - 1$ terms, first term $c$, ratio $r$.' },
      { label: 'Read the shape', formula: 'T_n = \\dfrac{c}{r - 1}\\, r^{\\,n-1} + \\left(a - \\dfrac{c}{r-1}\\right)', explanation: 'Absorbing constants: the general term is $A\\,r^{\\,n} + B$ — exponential plus constant. This is why a G.P. difference row always means an $A r^n + B$ general term, fitted from two terms.' },
    ], result: '$T_n = a + \\tfrac{c(r^{\\,n-1} - 1)}{r - 1}$, of the shape $A r^{\\,n} + B$' },
    { kind: 'example', title: 'Recover the general term and sum of $2, 8, 26, 80, \\ldots$', steps: [
      'Now, the census (first Illustration) fixed the difference row: $D_k = 6 \\cdot 3^{\\,k-1}$ — first gap $6$, ratio $3$. With $a = T_1 = 2$:',
      'So, $T_n = 2 + 6 \\cdot \\dfrac{3^{\\,n-1} - 1}{3 - 1} = 2 + 3(3^{\\,n-1} - 1) = 3^{\\,n} - 1$.',
      'Check the engine way: $T_1 = 2$, $T_2 = 8$, $T_3 = 26$, $T_4 = 80$ — all four land.',
      'Hence, the sum splits: $S_n = \\sum_{k=1}^{n} (3^{\\,k} - 1) = (3 + 9 + \\cdots + 3^{\\,n}) - n = \\dfrac{3(3^{\\,n} - 1)}{2} - n = \\dfrac{3^{\\,n+1} - 2n - 3}{2}$; at $n = 4$: $\\dfrac{243 - 8 - 3}{2} = 116 = 2 + 8 + 26 + 80$.' ] },
    { kind: 'example', title: 'The two-point fit on $4, 10, 22, 46, 94, \\ldots$ — exam speed.', steps: [
      'Now, census: the gaps are $6, 12, 24, 48$ — a G.P. with ratio $2$. By the shape read, $T_n = A \\cdot 2^{\\,n} + B$ for constants $A, B$.',
      'So, fit the first two terms: $T_1 = 2A + B = 4$ and $T_2 = 4A + B = 10$ — subtracting gives $A = 3$, then $B = -2$.',
      'Hence, $T_n = 3 \\cdot 2^{\\,n} - 2$; check $T_4 = 48 - 2 = 46$ and $T_5 = 96 - 2 = 94$ — both land. The sum splits the same way: $S_n = \\sum (3 \\cdot 2^{\\,k} - 2) = 3(2^{\\,n+1} - 2) - 2n$; at $n = 4$: $3 \\times 30 - 8 = 82 = 4 + 10 + 22 + 46$.' ] },
    { kind: 'example', title: 'Sum $3, 9, 33, 129, \\ldots$ to $n$ terms and find its 5th term.', steps: [
      'Now, census: $9 - 3 = 6$, $33 - 9 = 24$, $129 - 33 = 96$ — the gaps $6, 24, 96$ are a G.P. with ratio $4$. So $T_n = 2 \\cdot 4^{\\,n-1} + 1$ after the two-point fit ($T_1 = 2A + B = 3$, $T_2 = 8A + B = 9$ give $A = 1$, $B = 1$ on the $4^{\\,n-1}$ scale — or directly $T_n = a + c\\,(r^{\\,n-1}-1)/(r-1) = 3 + 6(4^{\\,n-1}-1)/3 = 2 \\cdot 4^{\\,n-1} + 1$).',
      'So, the 5th term is $2 \\cdot 4^{4} + 1 = 2 \\times 256 + 1 = 513$ (the engine caught the draft slip $515$ before any prose was written — $513$ is the honest value).',
      'Hence, $S_n = \\sum (2 \\cdot 4^{\\,k-1} + 1) = 2 \\cdot \\dfrac{4^{\\,n} - 1}{3} + n$; at $n = 3$: $\\dfrac{2 \\times 63}{3} + 3 = 45 = 3 + 9 + 33$.' ] },
    { kind: 'callout', tone: 'exam', title: 'The exam pattern, named', text: 'The examination classic — "sum $5 + 7 + 13 + 31 + 85 + \\cdots$ to $n$ terms" — is exactly this machine: the gap row $2, 6, 18, 54$ is a G.P. with ratio $3$, the general term is $A \\cdot 3^{\\,n} + B$ fitted from two terms, and the sum splits into a G.P. piece plus a linear piece. Whatever the numbers, the three moves are: **census the gaps, fit $A r^{\\,n} + B$, split the sum.**' },
    { kind: 'figure', caption: 'The difference ladder is also the picture behind the sum: each gap feeds one step of the climb, so the difference row $6, 18, 54, 162$ (a G.P., ratio 3) is itself summed by lesson 5.2 to produce any term of $2, 8, 26, 80, 242$.', svg: 'FIG1' },

    { kind: 'heading', text: 'An A.P. Difference Row: the Triangular Build' },
    { kind: 'para', text: 'When the difference row climbs by a constant — the second Illustration\'s $4, 7, 10, 13$ — each gap is one step longer than the last, and the reconstruction runs through the **triangular numbers** $1, 3, 6, 10, \\ldots$ (the counts of $\\tfrac{(k-1)(k-2)}{2}$ pairs). The sum of those triangular counts is a hockey stick on Pascal\'s triangle, and it lands the whole build in closed form.' },
    { kind: 'derivation', title: 'An A.P. difference row: the triangular build and the hockey stick', statement: 'If $D_k = c + (k-1)\\,d$ (the difference row is an A.P., first gap $c$, step $d$), then $T_n = a + c(n-1) + \\dfrac{d\\,(n-1)(n-2)}{2}$, and $S_n = a\\,n + \\dfrac{c\\,n(n-1)}{2} + \\dfrac{d\\,n(n-1)(n-2)}{6}$.', steps: [
      { label: 'Reconstruct the term', formula: 'T_n = a + \\sum_{k=1}^{n-1} \\bigl(c + (k-1)d\\bigr) = a + c(n-1) + d \\cdot \\frac{(n-1)(n-2)}{2}', explanation: 'The gap sum is an A.P. of $n-1$ terms — lesson 5.1\'s pairing sum prices it; the leftover $\tfrac{(n-1)(n-2)}{2}$ is the triangular count $T_{n-2}$.' },
      { label: 'Sum the terms', formula: 'S_n = \\sum_{k=1}^{n} T_k = a\\,n + c \\cdot \\frac{n(n-1)}{2} + d \\cdot \\sum_{k=1}^{n} \\frac{(k-1)(k-2)}{2}', explanation: 'Split the three pieces and sum each — the first two are 5.1 sums; the last is new.' },
      { label: 'The hockey stick', formula: '\\sum_{k=1}^{n} \\frac{(k-1)(k-2)}{2} = \\frac{n(n-1)(n-2)}{6}', explanation: 'Each piece $\tfrac{(k-1)(k-2)}{2} = \\binom{k-1}{2}$ counts pairs; the running totals $0, 0, 1, 4, 10, 20$ are the triangular numbers of triangular numbers — on Pascal\'s triangle the amber diagonal $1, 3, 6, 10$ lands on $20$, the hockey-stick identity $\\sum \\binom{j}{2} = \\binom{n}{3}$.' },
      { label: 'Assemble', formula: 'S_n = a\\,n + \\frac{c\\,n(n-1)}{2} + \\frac{d\\,n(n-1)(n-2)}{6}', explanation: 'A cubic in $n$ — the honest signature of an A.P. difference row. (The engine swept the identity for $n = 1..6$ before this prose.)' },
    ], result: '$T_n = a + c(n-1) + \\tfrac{d(n-1)(n-2)}{2}$; $S_n = a\\,n + \\tfrac{c\\,n(n-1)}{2} + \\tfrac{d\\,n(n-1)(n-2)}{6}$' },
    { kind: 'figure', caption: 'The hockey stick on Pascal\'s triangle: the amber diagonal $1, 3, 6, 10$ — the triangular counts $\binom{2}{2}, \binom{3}{2}, \binom{4}{2}, \binom{5}{2}$ — lands on $20 = \binom{6}{3}$. Every A.P. difference row sums through this diagonal.', svg: 'FIG3' },
    { kind: 'example', title: 'Recover the general term and sum of $2, 6, 13, 23, 36, \\ldots$', steps: [
      'Now, the census fixed the difference row: $D_k = 4 + 3(k-1)$ — first gap $4$, step $3$ — and $a = T_1 = 2$.',
      'So, the triangular build gives $T_n = 2 + 4(n-1) + \\dfrac{3(n-1)(n-2)}{2}$; check: $T_4 = 2 + 12 + 9 = 23$ and $T_5 = 2 + 16 + 18 = 36$ — both land.',
      'Hence, the sum: $S_n = 2n + \\dfrac{4 \\cdot n(n-1)}{2} + \\dfrac{3 \\cdot n(n-1)(n-2)}{6} = 2n + 2n(n-1) + \\dfrac{n(n-1)(n-2)}{2}$; at $n = 5$: $10 + 40 + 30 = 80 = 2 + 6 + 13 + 23 + 36$.' ] },
    { kind: 'example', title: 'Sum $4, 9, 18, 31, 48, \\ldots$ to $n$ terms.', steps: [
      'Now, census: $9 - 4 = 5$, $18 - 9 = 9$, $31 - 18 = 13$, $48 - 31 = 17$ — an A.P. of gaps, $c = 5$, $d = 4$, head $a = 4$.',
      'So, the build gives $T_n = 4 + 5(n-1) + \\dfrac{4(n-1)(n-2)}{2} = 2n^2 - n + 3$ — check: $T_5 = 50 - 5 + 3 = 48$, and the gaps $2n+1$ climb $5, 7, 9, \\ldots$ — wait: the gaps of $2n^2 - n + 3$ are $4, 9, 18, \\ldots$? No: the build\'s gap row is $D_k = 4 + 3(k-1)$? The check: $T_2 - T_1 = 9 - 4 = 5 = 4 + 1$, $T_3 - T_2 = 9$ — the gap step is $4$, so $D_k = 5, 9, 13, 17$: the A.P. with $d = 4$. Consistent.',
      'Hence, $S_n = 4n + \\dfrac{5\\,n(n-1)}{2} + \\dfrac{4\\,n(n-1)(n-2)}{6}$; at $n = 5$: $20 + 50 + 40 = 110 = 4 + 9 + 18 + 31 + 48$.' ] },
    { kind: 'table', caption: 'The census at a glance: what the difference row says, and which machine answers', head: ['Difference row reads', 'The general term has the shape', 'The sum machine', 'Where it lives'], rows: [
      ['constant (d = 0)', 'linear: $an + b$', 'the 5.1 pairing sum', 'lesson 5.1'],
      ['A.P. (gaps climb by $d$)', 'quadratic: $an^2 + bn + c$', 'the triangular build + hockey stick', 'this lesson'],
      ['G.P. (gaps multiply by $r$)', 'exponential: $A r^{\\,n} + B$', 'the two-point fit + split-and-sum', 'this lesson'],
      ['no progression in sight', '— (factorials, primes, …)', 'the machine stops honestly', 'lesson 5.5 and beyond'],
    ] },
    { kind: 'para', text: 'Read the census table top to bottom: each row is a machine the chapter has already built, and the difference row tells you which one to load before any algebra starts. The exam habit worth training is to run the census **first** — ten seconds of subtraction prices the whole question, and it also tells you honestly when the machine in front of you is the wrong one.' },

    { kind: 'heading', text: 'Where the Machine Stops — and the Cube Telescope' },
    { kind: 'para', text: 'Not every difference row cooperates. The factorial ladder $1, 2, 6, 24, 120, \\ldots$ has gaps $1, 4, 18, 96$ — no constant difference, no constant ratio, and no rescue on the second floor either ($3, 14, 78$). The honest census answer is **the machine stops**: factorial series have their own tools (the scale-of-relation machinery of a later lesson). But one special non-progression series is so classical that it anchors the whole subject — the series whose gaps are the odd numbers multiplied out: $1, 7, 19, 37, 61, \\ldots$ with gap row $6, 12, 18, 24$ (an A.P., so this lesson\'s build applies) — and whose sum is the cube of the term count.' },
    { kind: 'derivation', title: 'The cube telescope', statement: '$n^3 - (n-1)^3 = 3n^2 - 3n + 1$, and therefore $\\sum_{k=1}^{n} (3k^2 - 3k + 1) = n^3$ — the series $1 + 7 + 19 + 37 + \\cdots + (3n^2 - 3n + 1)$ sums to $n^3$.', steps: [
      { label: 'Expand the cube gap', formula: 'n^3 - (n-1)^3 = n^3 - (n^3 - 3n^2 + 3n - 1) = 3n^2 - 3n + 1', explanation: 'The gap between consecutive cubes is a quadratic in $n$ — so the cube series $1, 8, 27, \\ldots$ has difference row $7, 19, 37, \\ldots$, an A.P.-row series of exactly the kind this lesson builds.' },
      { label: 'Write the ladder', formula: '1^3 - 0^3 = 1, \\quad 2^3 - 1^3 = 7, \\quad 3^3 - 2^3 = 19, \\quad \\ldots, \\quad n^3 - (n-1)^3 = 3n^2 - 3n + 1', explanation: 'The cube gaps themselves: $1, 7, 19, 37, \\ldots$ — each is $3k^2 - 3k + 1$ at $k = 1, 2, 3, \\ldots$.' },
      { label: 'Sum and collapse', formula: 'n^3 = \\sum_{k=1}^{n} \\bigl(3k^2 - 3k + 1\\bigr)', explanation: 'The ladder telescopes — the collapse law of the first section, run on cubes. The engine swept $n = 1..8$ before this prose.' },
      { label: 'The honest scope note', formula: '\\text{this proves } \\sum (3k^2 - 3k + 1) = n^3; \\text{ it does not yet price } \\sum k^2 \\text{ alone}', explanation: 'Isolating $\sum k^2$ needs one more move — the classical power-sum derivation, which is exactly where lesson 5.5 opens. The cube telescope is the seed; the folds on $\sum n^2$ and $\sum n^3$ are hosted there.' },
    ], result: '$\\sum_{k=1}^{n} (3k^2 - 3k + 1) = n^3$ — the exam classic $1 + 7 + 19 + 37 + \\cdots$ sums to $n^3$' },
    { kind: 'callout', tone: 'historical', title: 'Finite differences, 1715', text: 'The method of this lesson — reconstructing a sequence from its difference row — is the first chapter of the **calculus of finite differences**, first organised by Brook Taylor in *Methodus Incrementorum Directa et Inversa* (1715; second edition 1717). The standard history credits that book with the finite-difference calculus alongside the series expansion that carries his name; the attribution is reported tradition, honestly labelled.' },
    { kind: 'example', title: 'Use the cube telescope to sum $1 + 7 + 19 + 37 + 61$ and confirm the census.', steps: [
      'Now, census: the gaps are $6, 12, 18, 24$ — an A.P. with $d = 6$ — so the triangular build gives $T_n = 1 + 6(n-1) + \\dfrac{6(n-1)(n-2)}{2} = 3n^2 - 3n + 1$.',
      'So, the sum is $\\sum_{k=1}^{5} (3k^2 - 3k + 1) = 5^3 = 125$ by the cube telescope — and indeed $1 + 7 + 19 + 37 + 61 = 125$.',
      'Hence, the two machines agree: the triangular build prices the term, the cube telescope prices the sum — the same series seen from both floors.' ] },
    { kind: 'callout', tone: 'insight', title: 'The lesson in one breath', text: 'Census the gaps. A **G.P.** gap row means the general term is $A r^{\\,n} + B$ — fit it from two terms and split the sum into a G.P. piece and a constant piece. An **A.P.** gap row means the general term is quadratic — build it on the triangular counts and sum it on the hockey stick. **Telescoping** terms already hide a difference — read the ends and collapse. And when the gaps show no progression at all, say so honestly and wait for lesson 5.5\'s power sums — the cube telescope $\\sum(3k^2 - 3k + 1) = n^3$ is the bridge between the two lessons.' },

    { kind: 'formula', name: 'The census law', latex: 'D_k = T_{k+1} - T_k, \\quad T_n = T_1 + \\sum_{k=1}^{n-1} D_k', note: 'the reconstruction: every term is the first term plus the climb' },
    { kind: 'formula', name: 'The telescoping collapse', latex: '\\sum_{k=1}^{n} (u_k - u_{k+1}) = u_1 - u_{n+1}', note: 'all interior pieces cancel; the sum lives at the two ends' },
    { kind: 'formula', name: 'The half-gap telescope', latex: '\\sum_{k=1}^{n} \\frac{1}{k(k+1)} = 1 - \\frac{1}{n+1} = \\frac{n}{n+1}; \\quad S_\\infty = 1', note: 'from $\\tfrac{1}{k(k+1)} = \\tfrac{1}{k} - \\tfrac{1}{k+1}$' },
    { kind: 'formula', name: 'The triple telescope', latex: '\\sum_{k=1}^{n} \\frac{1}{k(k+1)(k+2)} = \\frac{1}{2}\\left(\\frac{1}{2} - \\frac{1}{(n+1)(n+2)}\\right); \\quad S_\\infty = \\frac{1}{4}', note: 'half the difference of consecutive $\\tfrac{1}{k(k+1)}$' },
    { kind: 'formula', name: 'The odd-pair telescope', latex: '\\sum_{k=1}^{n} \\frac{1}{(2k-1)(2k+1)} = \\frac{1}{2}\\left(1 - \\frac{1}{2n+1}\\right)', note: 'half the gap of consecutive odd reciprocals' },
    { kind: 'formula', name: 'G.P. difference row', latex: 'T_n = a + c\\,\\frac{r^{\\,n-1} - 1}{r - 1} = A\\,r^{\\,n} + B', note: 'gaps multiply by $r$: exponential general term, fitted from two terms' },
    { kind: 'formula', name: 'A.P. difference row (triangular build)', latex: 'T_n = a + c(n-1) + \\frac{d(n-1)(n-2)}{2}', note: 'gaps climb by $d$: quadratic general term' },
    { kind: 'formula', name: 'The hockey-stick sum', latex: 'S_n = a\\,n + \\frac{c\\,n(n-1)}{2} + \\frac{d\\,n(n-1)(n-2)}{6}; \\quad \\sum_{k=1}^{n} \\frac{(k-1)(k-2)}{2} = \\frac{n(n-1)(n-2)}{6}', note: 'the A.P.-gap sum; the diagonal of Pascal\'s triangle' },
    { kind: 'formula', name: 'The cube telescope', latex: '\\sum_{k=1}^{n} (3k^2 - 3k + 1) = n^3', note: 'since $n^3 - (n-1)^3 = 3n^2 - 3n + 1$; the bridge to 5.5\'s power sums' },
    { kind: 'terms', items: [
      { term: 'difference row', def: 'the row of gaps $D_k = T_{k+1} - T_k$ between consecutive terms — the floor below the series; its classification (constant, A.P., G.P., nothing) is the census' },
      { term: 'census', def: 'computing and classifying the difference row of a series before any algebra — the habit that picks the right machine' },
      { term: 'telescoping series', def: 'a series whose terms are differences in disguise, $u_k - u_{k+1}$; every interior piece cancels when the sum is written out' },
      { term: 'collapse law', def: '$\\sum_{k=1}^{n}(u_k - u_{k+1}) = u_1 - u_{n+1}$ — the whole sum reduced to the two ends' },
      { term: 'method of differences', def: 'reconstructing $T_n$ from a difference row that is itself a progression, then splitting $S_n$ into priced pieces — the shift-and-subtract machine run one floor up' },
      { term: 'triangular numbers', def: 'the counts $1, 3, 6, 10, \\ldots$ of $\\tfrac{(k-1)(k-2)}{2}$ pairs; the building blocks of every quadratic general term' },
      { term: 'hockey-stick identity', def: '$\\sum_{k=1}^{n} \\tfrac{(k-1)(k-2)}{2} = \\tfrac{n(n-1)(n-2)}{6}$ — the amber diagonal of Pascal\'s triangle landing on $\\binom{n}{3}$' },
      { term: 'two-point fit', def: 'when the gap row is a G.P., write $T_n = A r^{\\,n} + B$ and fit $A, B$ from the first two terms — the exam-speed shortcut' },
      { term: 'cube telescope', def: '$n^3 - (n-1)^3 = 3n^2 - 3n + 1$, so the series $1 + 7 + 19 + 37 + \\cdots$ sums to $n^3$ — the seed of the classical power sums' },
    ] },
    { kind: 'quiz', items: [
      { q: 'The difference row of the series $2, 8, 26, 80, \\ldots$ is', options: ['an A.P. with common difference 6', 'a G.P. with common ratio 3', 'the perfect squares 4, 9, 16, 25', 'no pattern — the series is not summable'], answer: 1, explain: 'The gaps are $8-2=6$, $26-8=18$, $80-26=54$: the ratios $18/6 = 54/18 = 3$ are constant — a G.P. with $r = 3$. Option 1 confuses the gap $6$ with a difference; the squares belong to the cumulative census $1, 5, 14, 30$; and "not summable" is exactly what the census exists to refute — the G.P. gap row makes $T_n = 3^n - 1$.' },
      { q: 'The sum $\\dfrac{1}{1 \\cdot 2} + \\dfrac{1}{2 \\cdot 3} + \\cdots + \\dfrac{1}{n(n+1)}$ equals', options: ['n/(n+1)', '1/(n+1)', 'n(n+1)/2', '1 − n'], answer: 0, explain: 'Each term splits as $\\tfrac{1}{k} - \\tfrac{1}{k+1}$, so the collapse law leaves $1 - \\tfrac{1}{n+1} = \\tfrac{n}{n+1}$. Option 2 is the surviving tail alone (what dies, not what stays); option 3 is the A.P. sum formula pointed at the wrong series; option 4 has the wrong sign on the tail.' },
      { q: 'If the difference row of a series is a G.P. with ratio $r \\neq 1$, its general term has the shape', options: ['A·r^n + B (exponential plus constant)', 'a + n·r (linear)', 'an² + bn + c (quadratic)', 'a/(1 − r) (a constant)'], answer: 0, explain: 'Reconstruction adds a G.P. sum of gaps to the head term: $T_n = a + c\\,(r^{\\,n-1}-1)/(r-1)$, which rearranges to $A r^{\\,n} + B$. Linear and quadratic shapes belong to A.P. gap rows; the constant $\\tfrac{a}{1-r}$ is the **infinite** G.P. sum formula, not a general term.' },
      { q: 'The series $1 + 7 + 19 + 37 + \\cdots$ (gap row $6, 12, 18, 24$) sums to $n$ terms equal to', options: ['n(n+1)(2n+1)/6', 'n³', '(3^n − 1)/2', 'n²(n+1)²/4'], answer: 1, explain: 'The terms are $3k^2 - 3k + 1 = k^3 - (k-1)^3$, so the ladder telescopes to $n^3$ — the cube telescope. Option 1 is $\\sum k^2$ (lesson 5.5\'s fold); option 3 is the sum of $2, 8, 26, 80$\'s family; option 4 is $\\left(\\sum k\\right)^2$, the cubes identity of lesson 5.5 — none of them is this series.' },
      { q: '$\\displaystyle\\sum_{k=1}^{\\infty} \\dfrac{1}{k(k+1)(k+2)}$ equals', options: ['1/2', '1/3', '1/4', '1/6'], answer: 2, explain: 'The triple telescope: $\\tfrac{1}{k(k+1)(k+2)} = \\tfrac{1}{2}(\\tfrac{1}{k(k+1)} - \\tfrac{1}{(k+1)(k+2)})$, so the sum is $\\tfrac{1}{2} \\cdot \\tfrac{1}{1 \\cdot 2} = \\tfrac{1}{4}$ once the tail dies. Option 1 forgets the factor $\\tfrac{1}{2}$ twice over; option 2 is the odd-pair infinite telescope; option 6 is just the first term $\\tfrac{1}{1 \\cdot 2 \\cdot 3}$.' },
    ] },
    { kind: 'exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Census the series $3, 10, 23, 42, 67, \\ldots$: classify its difference row and find the next term.', solution: ['Now, the gaps: $10 - 3 = 7$, $23 - 10 = 13$, $42 - 23 = 19$, $67 - 42 = 25$ — the difference row is $7, 13, 19, 25$.', 'So, the row climbs by $6$ each time — an A.P. with $c = 7$, $d = 6$ (the triangular-build signature).', 'Hence, the next gap is $31$ and the next term is $67 + 31 = 98$.'], answer: 'A.P. difference row (c = 7, d = 6); the next term is 98' },
        { q: 'Census the series $2, 3, 7, 23, 87, \\ldots$: classify its difference row and find the next term.', solution: ['Now, the gaps: $3 - 2 = 1$, $7 - 3 = 4$, $23 - 7 = 16$, $87 - 23 = 64$ — the difference row is $1, 4, 16, 64$.', 'So, the ratios are $4, 4, 4$ — a G.P. with $c = 1$, $r = 4$ (the two-point-fit signature).', 'Hence, the next gap is $256$ and the next term is $87 + 256 = 343$.'], answer: 'G.P. difference row (c = 1, r = 4); the next term is 343' },
      ] },
      { level: 'L2', questions: [
        { q: 'Find the sum of $3, 9, 33, 129, \\ldots$ to $n$ terms, and write the 5th term.', solution: ['Now, census: the gaps $6, 24, 96$ multiply by $4$ — a G.P. gap row with $c = 6$, $r = 4$, head $a = 3$.', 'So, the accumulation gives $T_n = 3 + 6 \\cdot \\dfrac{4^{\\,n-1} - 1}{3} = 2 \\cdot 4^{\\,n-1} + 1$; the 5th term is $2 \\times 256 + 1 = 513$.', 'Hence, $S_n = \\sum (2 \\cdot 4^{\\,k-1} + 1) = 2 \\cdot \\dfrac{4^{\\,n} - 1}{3} + n$; check $n = 4$: $\\dfrac{2 \\times 255}{3} + 4 = 174 = 3 + 9 + 33 + 129$.'], answer: 'T_n = 2·4^(n−1) + 1 (5th term 513); S_n = 2(4^n − 1)/3 + n' },
        { q: 'Sum $\\dfrac{1}{1 \\cdot 3} + \\dfrac{1}{3 \\cdot 5} + \\dfrac{1}{5 \\cdot 7} + \\cdots + \\dfrac{1}{(2n-1)(2n+1)}$ and evaluate at $n = 3$.', solution: ['Now, split: $\\dfrac{1}{(2k-1)(2k+1)} = \\dfrac{1}{2}\\left(\\dfrac{1}{2k-1} - \\dfrac{1}{2k+1}\\right)$.', 'So, the sum is $\\dfrac{1}{2}\\left(1 - \\dfrac{1}{2n+1}\\right)$ by the collapse law — the odd reciprocals cancel in pairs.', 'Hence, at $n = 3$: $\\dfrac{1}{2}\\left(1 - \\dfrac{1}{7}\\right) = \\dfrac{3}{7}$ — and directly $\\dfrac{1}{3} + \\dfrac{1}{15} + \\dfrac{1}{35} = \\dfrac{45}{105} = \\dfrac{3}{7}$.'], answer: 'the sum is ½(1 − 1/(2n+1)); at n = 3 it is 3/7' },
        { q: 'Sum $\\dfrac{1}{1 \\cdot 2} + \\dfrac{1}{2 \\cdot 3} + \\dfrac{1}{3 \\cdot 4} + \\cdots$ to infinity, and state the one licence the infinite telescope needs.', solution: ['Now, the finite read: $\\sum_{k=1}^{n} \\dfrac{1}{k(k+1)} = 1 - \\dfrac{1}{n+1}$ (the half-gap telescope).', 'So, as $n \\to \\infty$ the tail $\\dfrac{1}{n+1} \\to 0$ — the sum is exactly $1$.', 'Hence, the licence: the surviving endpoint must tend to zero (here $1/(n+1)$ does) — no ratio kingdom $|r| < 1$ is needed for a telescope; the collapse itself is the convergence proof.'], answer: 'the infinite sum is 1; the licence is the dying endpoint 1/(n+1) → 0' },
      ] },
      { level: 'L3', questions: [
        { q: 'Census $1, 5, 14, 30, 55, \\ldots$ (the cumulative squares) and state what its difference row is.', solution: ['Now, the gaps: $5 - 1 = 4$, $14 - 5 = 9$, $30 - 14 = 16$, $55 - 30 = 25$ — the difference row is $4, 9, 16, 25$.', 'So, the gap row is the **perfect squares** — not an A.P. or a G.P., but one floor up from them: the second-floor differences are $5, 7, 9$ (an A.P.).', 'Hence, the honest census: this is the square-pyramid series $\\sum k^2$, which needs the power-sum machinery of lesson 5.5 — the double-floor census is exactly how that lesson opens.'], answer: 'difference row 4, 9, 16, 25 (the squares); second floor 5, 7, 9 (A.P.) — lesson 5.5\'s machine' },
        { q: 'Find the general term and the sum to $n$ terms of $7, 16, 43, 124, 367, \\ldots$', solution: ['Now, census: the gaps $9, 27, 81, 243$ are a G.P. with $c = 9$, $r = 3$; head $a = 7$.', 'So, $T_n = 7 + 9 \\cdot \\dfrac{3^{\\,n-1} - 1}{2} = \\dfrac{9 \\cdot 3^{\\,n-1} + 5}{2} = \\dfrac{3^{\\,n+1} + 5}{2}$; check: $T_3 = \\dfrac{81 + 5}{2} = 43$.', 'Hence, $S_n = \\dfrac{1}{2}\\left(\\sum 3^{\\,k+1} + 5n\\right) = \\dfrac{1}{2}\\left(\\dfrac{9(3^{\\,n} - 1)}{2} + 5n\\right) = \\dfrac{9 \\cdot 3^{\\,n} - 9 + 10n}{4}$; check $n = 3$: $\\dfrac{243 + 21}{4} = 66 = 7 + 16 + 43$.'], answer: 'T_n = (3^(n+1) + 5)/2; S_n = (9·3^n − 9 + 10n)/4' },
        { q: 'Sum $\\dfrac{1}{1 \\cdot 2 \\cdot 3} + \\dfrac{1}{2 \\cdot 3 \\cdot 4} + \\cdots + \\dfrac{1}{6 \\cdot 7 \\cdot 8}$ exactly.', solution: ['Now, the triple telescope: $\\sum_{k=1}^{n} \\dfrac{1}{k(k+1)(k+2)} = \\dfrac{1}{2}\\left(\\dfrac{1}{2} - \\dfrac{1}{(n+1)(n+2)}\\right)$.', 'So, at $n = 6$: $\\dfrac{1}{2}\\left(\\dfrac{1}{2} - \\dfrac{1}{56}\\right) = \\dfrac{1}{2} \\cdot \\dfrac{27}{56} = \\dfrac{27}{112}$.', 'Hence, the six terms add to $\\dfrac{27}{112}$ — and the infinite tail would close on $\\dfrac{1}{4}$.'], answer: '27/112' },
      ] },
      { level: 'L4', questions: [
        { q: 'Sum $4, 9, 18, 31, 48, \\ldots$ to $n$ terms and show the general term is $2n^2 - n + 3$.', solution: ['Now, census: the gaps $5, 9, 13, 17$ are an A.P. with $c = 5$, $d = 4$; head $a = 4$.', 'So, the triangular build: $T_n = 4 + 5(n-1) + \\dfrac{4(n-1)(n-2)}{2} = 4 + 5n - 5 + 2n^2 - 6n + 4 = 2n^2 - n + 3$.', 'Hence, the sum: $S_n = 4n + \\dfrac{5\\,n(n-1)}{2} + \\dfrac{4\\,n(n-1)(n-2)}{6}$; check $n = 5$: $20 + 50 + 40 = 110 = 4 + 9 + 18 + 31 + 48$.'], answer: 'T_n = 2n² − n + 3; S_n = 4n + (5/2)n(n−1) + (2/3)n(n−1)(n−2)' },
        { q: 'Show that $1 + 7 + 19 + 37 + 61 + \\cdots$ (to $n$ terms) sums to $n^3$, and verify the census of its gap row.', solution: ['Now, census: the gaps are $6, 12, 18, 24$ — an A.P. with $c = 6$, $d = 6$; head $a = 1$.', 'So, the build gives $T_n = 1 + 6(n-1) + \\dfrac{6(n-1)(n-2)}{2} = 3n^2 - 3n + 1$.', 'Hence, $\\sum_{k=1}^{n} (3k^2 - 3k + 1) = \\sum (k^3 - (k-1)^3) = n^3$ — the cube telescope; at $n = 5$: $125 = 1 + 7 + 19 + 37 + 61$.'], answer: 'the sum is n³ (the cube telescope); gap row 6, 12, 18, 24 (A.P. d = 6)' },
        { q: 'Use the two-point fit on $4, 10, 22, 46, 94, \\ldots$: write $T_n = A \\cdot 2^n + B$, fit $A$ and $B$, and sum to $n$ terms.', solution: ['Now, the census: gaps $6, 12, 24, 48$ — a G.P. with ratio $2$ — so the shape is $T_n = A \\cdot 2^{\\,n} + B$.', 'So, fit: $2A + B = 4$ and $4A + B = 10$ give $A = 3$, $B = -2$ — $T_n = 3 \\cdot 2^{\\,n} - 2$; check $T_5 = 96 - 2 = 94$.', 'Hence, $S_n = \\sum (3 \\cdot 2^{\\,k} - 2) = 3(2^{\\,n+1} - 2) - 2n$; check $n = 4$: $3 \\times 30 - 8 = 82 = 4 + 10 + 22 + 46$.'], answer: 'T_n = 3·2^n − 2 (A = 3, B = −2); S_n = 3(2^(n+1) − 2) − 2n' },
      ] },
      { level: 'L5', questions: [
        { q: 'Census $1, 2, 6, 24, 120, \\ldots$ and explain, honestly, why neither machine of this lesson applies.', solution: ['Now, the gaps: $2 - 1 = 1$, $6 - 2 = 4$, $24 - 6 = 18$, $120 - 24 = 96$ — the difference row is $1, 4, 18, 96$.', 'So, test it: $4 - 1 = 3$, $18 - 4 = 14$, $96 - 18 = 78$ — no constant difference; $4/1 = 4$, $18/4 = 4.5$ — no constant ratio. The second floor is a progression in neither sense.', 'Hence, the honest census: the series is the factorial ladder $n!$, and the difference machines stop — this series needs its own tool (the scale-of-relation machinery of a later lesson), and pretending otherwise would be fabrication.'], answer: 'difference row 1, 4, 18, 96 — no progression on either floor; the machine stops (the series is n!)' },
        { q: 'Sum $\\dfrac{1}{1 \\cdot 2 \\cdot 3} + \\dfrac{1}{2 \\cdot 3 \\cdot 4} + \\cdots$ to infinity, and find the two terms whose sum already reaches half the total.', solution: ['Now, the infinite read: $S_\\infty = \\dfrac{1}{2} \\cdot \\dfrac{1}{2} = \\dfrac{1}{4}$ (the triple telescope with the tail dead).', 'So, the first two terms: $\\dfrac{1}{6} + \\dfrac{1}{24} = \\dfrac{5}{24}$ — and half the total is $\\dfrac{1}{8} = \\dfrac{3}{24}$.', 'Hence, even the first term alone ($\\dfrac{4}{24} > \\dfrac{3}{24}$) already exceeds half the infinite sum — the telescope\'s mass is concentrated at the left end, which is why the collapse reads the two ends and nothing else.'], answer: 'S∞ = 1/4; the first term alone (1/6 = 4/24) already exceeds half the total (1/8 = 3/24)' },
        { q: 'Sum $(\\sqrt{2} - 1) + (\\sqrt{3} - \\sqrt{2}) + \\cdots + (\\sqrt{n+1} - \\sqrt{n})$ and decide whether the infinite telescope converges.', solution: ['Now, each bracket is $u_{k+1} - u_k$ with $u_k = \\sqrt{k}$ — a telescope running the other way.', 'So, the sum is $u_{n+1} - u_1 = \\sqrt{n+1} - 1$; check $n = 3$: $\\sqrt{4} - 1 = 1$, and directly $(\\sqrt{2}-1) + (\\sqrt{3}-\\sqrt{2}) + (2 - \\sqrt{3}) = 1$.', 'Hence, the partial sums grow like $\\sqrt{n}$ without bound — the infinite telescope **diverges**, and the collapse law says so honestly: the surviving endpoint $\\sqrt{n+1}$ does not settle, so there is no finite sum.'], answer: 'the sum to n terms is √(n+1) − 1; the infinite telescope diverges (the endpoint grows)' },
      ] },
      { level: 'L6', questions: [
        { q: 'A series has first term $5$ and difference row $4, 8, 16, \\ldots$. Find $T_n$ and $S_n$, and write the first five terms.', solution: ['Now, the gap row $4, 8, 16$ is a G.P. with $c = 4$, $r = 2$; head $a = 5$.', 'So, the accumulation: $T_n = 5 + 4(2^{\\,n-1} - 1) = 2^{\\,n+1} + 1$; the first five terms are $5, 9, 17, 33, 65$.', 'Hence, $S_n = \\sum (2^{\\,k+1} + 1) = (4 + 8 + \\cdots + 2^{\\,n+1}) + n = (2^{\\,n+2} - 4) + n$; check $n = 4$: $64 - 4 + 4 = 64 = 5 + 9 + 17 + 33$.'], answer: 'T_n = 2^(n+1) + 1; S_n = 2^(n+2) − 4 + n; terms 5, 9, 17, 33, 65' },
        { q: 'Three series are offered: (i) $2, 6, 13, 23, 36$; (ii) $2, 8, 26, 80$; (iii) $1, 2, 6, 24$. Name, with reasons, which machine sums each — and sum the one that lesson 5.5 must own.', solution: ['Now, census (i): gaps $4, 7, 10, 13$ — an A.P.; the triangular build + hockey stick of this lesson prices it ($S_n = 2n + 2n(n-1) + \\tfrac{n(n-1)(n-2)}{2}$).', 'So, census (ii): gaps $6, 18, 54$ — a G.P.; the two-point fit gives $T_n = 3^{\\,n} - 1$ and the split-sum prices it ($S_n = \\tfrac{3^{\\,n+1} - 2n - 3}{2}$) — also this lesson.', 'Hence, census (iii): gaps $1, 4, 18$ — no progression on either floor; the machine stops honestly, and the factorial ladder belongs to the later scale-of-relation machinery — while the power sums $\\sum k^2, \\sum k^3$ (the square-pyramid census of exercise 6) are lesson 5.5\'s to price.'], answer: '(i) triangular build (A.P. gaps); (ii) two-point fit (G.P. gaps); (iii) none — factorial ladder; 5.5 owns the power sums' },
      ] },
    ] },
  ],
}

"""
FIG_BODY = body.replace("'FIG1'", "'" + FIG1 + "'").replace("'FIG2'", "'" + FIG2 + "'").replace("'FIG3'", "'" + FIG3 + "'")

s = open(P).read()
assert "const lesson54: Lesson = {" not in s, 'lesson54 already present'
assert "FIG1" not in s or True
anchor = 'export const chapter05: Chapter = {'
idx = s.index(anchor)
s = s[:idx] + FIG_BODY.strip() + '\n\n' + s[idx:]

# wire the lesson into the chapter
old = "lessons: [lesson51, lesson52, lesson53],"
new = "lessons: [lesson51, lesson52, lesson53, lesson54],"
assert old in s; s = s.replace(old, new)
old = "plannedLessons: [\n    'Special Series and the Method of Differences',\n    'Sigma Notation and the Classical Power Sums',\n    'Recurring Series and the Scale of Relation',\n  ],"
new = "plannedLessons: [\n    'Sigma Notation and the Classical Power Sums',\n    'Recurring Series and the Scale of Relation',\n  ],"
assert old in s; s = s.replace(old, new)

open(P, 'w').write(s)
print('lesson 5.4 authored and wired')
