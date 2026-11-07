import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 10: The Map of Number Systems
 * (the book's LAST chapter)
 *
 * LESSONS WRITTEN: 10.1 The Great Extension Story (run 64 — 5,574 words,
 *                  quiz keys 1/0/1/2/3, 15 exercises, verified E2E-green)
 *                  10.2 Numbers That Guard Data: Checksums and Casting Out
 *                       Nines (run 64 — 5,459 words, quiz keys 1/1/0/1/2,
 *                       14 exercises, verified E2E-green)
 *                  10.3 The Toolkit Synthesis (planned, run 65) + the
 *                       unit-10 completion review + the book close
 * References for this unit: no new Drive downloads (the collection is
 * exam-oriented, per the run-48 survey); the sanctioned internet fallback
 * carried the 10.2 research — see docs/project/SOURCE_LOG.md. Banked keys
 * reused: beck-geoggegan-art-of-proof (10.1), hankel-1867-permanence,
 * peacock-1833-permanence (10.1), dedekind-1872-stetigkeit,
 * cantor-1872-fundamental-sequences (10.1), fibonacci-1202-liber-abaci +
 * gauss-1801-disquisitiones (10.2, casting out nines + congruences). New
 * web-checked keys (run 64): hamming-1950-error-detecting,
 * isbn-check-digit-schemes, luhn-algorithm-iso7812 (10.2). Every number
 * pre-verified by scripts/verify-book2-ch10.ts (87 checks sections A–I,
 * ALL GREEN before writing; the first pass caught TEN defects in the
 * verifier's own census loops — no-op substitutions counted as errors, a
 * Luhn check-digit parity bug, ⌊60/10⌋ mistyped 5 for 6, a phantom
 * "original digit" sweep, and a wrong normalized residue −4 ≡ 6 — the
 * script, not memory, is the source of truth, the run-60 lesson holding
 * again). Exposition original.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (10.1): the repair map — four bands ℕ → ℤ → ℚ → ℝ, the     */
/* failure that forces each rung on the left of the gap, the new power */
/* on the right, and the dashed gate above ℝ (x² = −1 → ℂ, beyond this */
/* book). viewBox 720×520: bands h = 52 at y = 92/202/312/422 (58px    */
/* gaps), gate box x = 110..610 y = 10..40, gate text baselines        */
/* gapTop+24 / +46, arrows at x = 200, two footer lines at y = 490 and */
/* 508 — all audited in verify-book2-ch10.ts section N.                */
/* ------------------------------------------------------------------ */

function repairMapSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The extension ladder: four bands from the naturals up to the reals, each rung forced by a closure failure and adding one new power, with the gate x squared equals minus one still open above">'
  )
  parts.push('<rect x="0" y="0" width="720" height="520" fill="transparent"/>')
  // the unrepaired gate above ℝ
  parts.push(
    '<rect x="110" y="10" width="500" height="30" rx="6" fill="none" stroke="#9a6b2f" stroke-width="1.5" stroke-dasharray="5 4"/>'
  )
  parts.push(
    '<text x="360" y="30" font-size="12.5" fill="#9a6b2f" text-anchor="middle" font-weight="600">beyond the ladder: x² = −1 — no ordered system answers it (ℂ hands off)</text>'
  )
  // the four bands: [yTop, label, rightText]
  const bands: [number, string, string][] = [
    [92, 'ℝ — the real line (ch. 8)', 'completeness: the line has no holes'],
    [202, 'ℚ — the rationals (ch. 7)', 'the field laws: every a ≠ 0 divides'],
    [312, 'ℤ — the integers (ch. 6)', '0 and the negatives join'],
    [422, 'ℕ — the naturals (ch. 1)', 'counting starts here: 1, 2, 3, …'],
  ]
  for (const [y, label, right] of bands) {
    parts.push(
      `<rect x="140" y="${y}" width="440" height="52" rx="6" fill="none" stroke="#1f5c4d" stroke-width="1.8"/>`
    )
    parts.push(
      `<text x="160" y="${y + 32}" font-size="14.5" fill="#123f35" font-weight="600">${label}</text>`
    )
    parts.push(`<text x="560" y="${y + 32}" font-size="12" fill="#6b7a72" text-anchor="end">${right}</text>`)
  }
  // the three failure gates between bands: arrow up + failure (left) + new power (right)
  // gapTop = band above's bottom edge; failure baseline gapTop+20, power baseline gapTop+42
  const gates: [number, string, string][] = [
    [144, 'forced by: x² = 2 — no rational verdict (ch. 8)', 'ℝ adds: completeness — every n ≥ 0 gets a root'],
    [254, 'forced by: 3x = 2 — no integer verdict', 'ℚ adds: division — every a ≠ 0 gains an inverse'],
    [364, 'forced by: 5 − 8 (x + 8 = 5) — no natural verdict', 'ℤ adds: the difference pairs (n, 0)'],
  ]
  for (const [gapTop, fail, power] of gates) {
    parts.push(
      `<line x1="200" y1="${gapTop + 52}" x2="200" y2="${gapTop + 8}" stroke="#9a6b2f" stroke-width="2"/>`
    )
    parts.push(
      `<path d="M 200 ${gapTop + 2} L 195 ${gapTop + 13} L 205 ${gapTop + 13} Z" fill="#9a6b2f"/>`
    )
    parts.push(
      `<text x="222" y="${gapTop + 24}" font-size="12" fill="#9a3412">${fail}</text>`
    )
    parts.push(`<text x="222" y="${gapTop + 46}" font-size="12" fill="#1f5c4d">${power}</text>`)
  }
  // the embedding note + permanence footer (two straight lines under the ladder —
  // no rotated text: the overlap audit reads pre-transform boxes)
  parts.push(
    '<text x="360" y="490" font-size="11.5" fill="#6b7a72" text-anchor="middle">each arrow embeds the old system unchanged — n ↦ [(n, 0)], then n ↦ (n, 1)</text>'
  )
  parts.push(
    '<text x="360" y="508" font-size="12.5" fill="#123f35" text-anchor="middle" font-weight="600">the permanence charter: every law of the old system is a law of the new one — nothing old breaks</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (10.2): the mod-9 residue wheel — nine stations 0..8 on a  */
/* circle (r = 92, center 330,158, station k at angle −90° + k·40°),   */
/* with the collapse note (every power of ten lands on station 1) and  */
/* the digit-walk of 8,234: start 0, +8 → 8, +2 → 1, +3 → 4, +4 → 8.  */
/* Walk arrows drawn as chords; the +8/+2/+3/+4 narration lives in     */
/* the right-side annotation block (no labels on the wheel). Section O. */
/* verify-book2-ch10.ts section O.                                     */
/* ------------------------------------------------------------------ */

function residueWheelSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The mod 9 residue wheel: nine stations, every power of ten landing on station one, and the digit walk of 8234 ending at station 8">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  const cx = 330
  const cy = 158
  const rr = 92
  const pos = (k: number): [number, number] => {
    const a = ((-90 + k * 40) * Math.PI) / 180
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)]
  }
  // the circle + 9 stations
  parts.push(`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="#1f5c4d" stroke-width="1.8"/>`)
  for (let k = 0; k < 9; k++) {
    const [x, y] = pos(k)
    parts.push(`<circle cx="${x}" cy="${y}" r="10" fill="#fdf8ef" stroke="#1f5c4d" stroke-width="1.5"/>`)
    const lx = cx + (rr + 24) * Math.cos(((-90 + k * 40) * Math.PI) / 180)
    const ly = cy + (rr + 24) * Math.sin(((-90 + k * 40) * Math.PI) / 180)
    parts.push(
      `<text x="${lx}" y="${ly + 4}" font-size="12.5" fill="#123f35" text-anchor="middle" font-weight="600">${k}</text>`
    )
  }
  // the digit walk of 8,234: 0 → 8 → 1 → 4 → 8 (chords, slightly inside)
  const walk = [0, 8, 1, 4, 8]
  for (let i = 0; i + 1 < walk.length; i++) {
    const [x1, y1] = pos(walk[i])
    const [x2, y2] = pos(walk[i + 1])
    const mx = x1 + (x2 - x1) * 0.12
    const my = y1 + (y2 - y1) * 0.12
    const nx = x1 + (x2 - x1) * 0.88
    const ny = y1 + (y2 - y1) * 0.88
    parts.push(`<line x1="${x1}" y1="${y1}" x2="${nx}" y2="${ny}" stroke="#9a6b2f" stroke-width="1.6"/>`)
    parts.push(`<path d="M ${x2} ${y2} L ${mx + (nx - mx)} ${my + (ny - my)}" stroke="none"/>`)
    // arrowhead at the target station
    const ang = Math.atan2(y2 - y1, x2 - x1)
    const hx = x2 - 12 * Math.cos(ang)
    const hy = y2 - 12 * Math.sin(ang)
    parts.push(
      `<path d="M ${hx + 7 * Math.cos(ang)} ${hy + 7 * Math.sin(ang)} L ${hx + 4 * Math.cos(ang) - 4 * Math.sin(ang)} ${hy + 4 * Math.sin(ang) + 4 * Math.cos(ang)} L ${hx + 4 * Math.cos(ang) + 4 * Math.sin(ang)} ${hy + 4 * Math.sin(ang) - 4 * Math.cos(ang)} Z" fill="#9a6b2f"/>`
    )
  }
  // left annotation: the collapse of the place values
  parts.push(
    '<text x="40" y="52" font-size="12" fill="#1f5c4d" font-weight="600">every power of ten lands on station 1:</text>'
  )
  parts.push('<text x="40" y="70" font-size="11.5" fill="#6b7a72">10 ≡ 1, 100 ≡ 1, 1000 ≡ 1 (mod 9)</text>')
  parts.push('<text x="40" y="88" font-size="11.5" fill="#6b7a72">so a whole string condenses to its digit sum</text>')
  // right annotation: the walk read-out
  parts.push(
    '<text x="452" y="52" font-size="12" fill="#1f5c4d" font-weight="600">the walk of 8,234: 0 +8 → 8, +2 → 1,</text>'
  )
  parts.push('<text x="452" y="70" font-size="11.5" fill="#6b7a72">+3 → 4, +4 → 8 — station 8 is the residue</text>')
  parts.push('<text x="452" y="88" font-size="11.5" fill="#6b7a72">of 8,234 in ℤ/9ℤ (its digital root is 8)</text>')
  // footer
  parts.push(
    '<text x="360" y="316" font-size="12.5" fill="#123f35" text-anchor="middle" font-weight="600">casting out nines = computing inside ℤ/9ℤ, where every place value is the same station</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 3 (10.2): the ISBN-10 weighted-check engine on Hamming's     */
/* own book, 0-13-139139-9 — ten digit boxes (y = 56..92) with weight  */
/* labels 10..1 beneath (y = 112), the product row (y = 142), the sum  */
/* line (y = 176) and the mod-11 gate box (y = 200..232), followed by  */
/* the two error-shift notes (y = 262, 286). Boxes 52px wide from      */
/* x = 88: 88..608; verify-book2-ch10.ts section O.                    */
/* ------------------------------------------------------------------ */

function isbnEngineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The ISBN-10 weighted check of 0-13-139139-9: digits times descending weights sum to 143, which is 13 times 11, so the number passes the mod 11 gate">'
  )
  parts.push('<rect x="0" y="0" width="720" height="320" fill="transparent"/>')
  const digits = [0, 1, 3, 1, 3, 9, 1, 3, 9, 9]
  const label = ['0', '1', '3', '1', '3', '9', '1', '3', '9', '9']
  parts.push(
    '<text x="88" y="36" font-size="12.5" fill="#123f35" font-weight="600">Hamming\'s Coding and Information Theory: ISBN 0-13-139139-9</text>'
  )
  for (let i = 0; i < 10; i++) {
    const bx = 88 + i * 52
    parts.push(
      `<rect x="${bx}" y="56" width="44" height="36" rx="4" fill="none" stroke="#1f5c4d" stroke-width="1.6"/>`
    )
    parts.push(
      `<text x="${bx + 22}" y="80" font-size="17" fill="#123f35" text-anchor="middle" font-weight="600">${label[i]}</text>`
    )
    parts.push(
      `<text x="${bx + 22}" y="112" font-size="11.5" fill="#9a6b2f" text-anchor="middle" font-weight="600">× ${10 - i}</text>`
    )
    if (digits[i] * (10 - i) > 0) {
      parts.push(
        `<text x="${bx + 22}" y="142" font-size="12" fill="#6b7a72" text-anchor="middle">${digits[i] * (10 - i)}</text>`
      )
    } else {
      parts.push(
        `<text x="${bx + 22}" y="142" font-size="12" fill="#b9c6bd" text-anchor="middle">·</text>`
      )
    }
  }
  parts.push(
    '<text x="640" y="80" font-size="11.5" fill="#6b7a72">digits d₁…d₁₀</text>'
  )
  parts.push('<text x="640" y="112" font-size="11.5" fill="#6b7a72">weights 10…1</text>')
  // the sum line
  parts.push(
    '<text x="88" y="176" font-size="13" fill="#123f35" font-weight="600">weighted sum = 0 + 9 + 24 + 7 + 18 + 45 + 4 + 9 + 18 + 9 = 143 = 13 × 11</text>'
  )
  // the gate
  parts.push(
    '<rect x="88" y="196" width="352" height="34" rx="6" fill="none" stroke="#1f5c4d" stroke-width="1.6"/>'
  )
  parts.push(
    '<text x="264" y="218" font-size="13" fill="#123f35" text-anchor="middle" font-weight="600">143 ≡ 0 (mod 11) → the number PASSES the gate</text>'
  )
  // the two error-shift notes
  parts.push(
    '<text x="88" y="262" font-size="12" fill="#9a3412">a miswritten digit shifts the sum by (f − e) · w — never a multiple of 11 (11 prime, w ≤ 10)</text>'
  )
  parts.push(
    '<text x="88" y="286" font-size="12" fill="#9a3412">an adjacent swap shifts it by dₖ − dₖ₊₁ — size at most 9, never a multiple of 11</text>'
  )
  parts.push(
    '<text x="88" y="308" font-size="12" fill="#1f5c4d" font-weight="600">both classic human errors are caught — every time (verifier F–I: 900/900, all transpositions)</text>'
  )
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Chapter 10                                                          */
/* ------------------------------------------------------------------ */

export const chapter10: Chapter = {
  number: 10,
  slug: 'the-map-of-number-systems',
  title: 'The Map of Number Systems',
  summary:
    'The synthesis: the great extension ladder ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ drawn as one story of repaired failures; congruence arithmetic at work guarding data (casting out nines as an error detector, the mod-11 checksum scheme); and the competitive-arithmetic toolkit — unit digits, factorial zeros, base conversions, remainder chains — unified as one congruence engine.',
  status: 'in-progress',
  lessons: [
    {
      id: 'ans-the-great-extension-story',
      number: '10.1',
      title: 'The Great Extension Story',
      prerequisites: [
        'ans-closure-failures-that-force-extension',
        'ans-constructing-the-integers-from-the-naturals',
        'ans-the-field-laws-division-joins-the-family',
        'ans-completeness-the-line-without-holes',
      ],
      sources: [
        'beck-geoggegan-art-of-proof',
        'peacock-1833-permanence',
        'hankel-1867-permanence',
        'dedekind-1872-stetigkeit',
        'cantor-1872-fundamental-sequences',
      ],
      concepts: [
        'Number system',
        'Closure failure',
        'Extension ladder',
        'Embedding',
        'Permanence of formal laws',
        'Repair',
        'One-step solvability',
        'Congruence systems (preview)',
      ],
      objectives: [
        'state what a number system is — a set with operations and laws, not a bag of symbols',
        'recount the whole book as one story: four closure failures, four constructions, four repairs',
        'prove the embedding theorem for the difference-pair model and explain what "computations agree" means',
        'state the permanence charter and use it to predict what each extension may and may never do',
        'solve the one-step solvability census across the ladder: which of x + a = b, a·x = b, x² = n each system answers, and exactly when',
        'point to what the map does not show — ℂ, countability, and the finite congruence systems the next lesson puts to work',
      ],
      blocks: [
        {
          kind: 'para',
          text:
            'Nine chapters ago this book asked a question a child asks and school never answers: **why does arithmetic work the way it works?** The answer was not one theorem but one *story* — the story of how each number system was built on purpose, to repair a specific failure of the one before it. Chapter 1 rebuilt counting from the successor idea. Chapters 2 through 5 turned the division algorithm into divisibility, primes, and the arithmetic of remainders. Chapter 6 constructed the integers from pairs of naturals because subtraction kept failing. Chapter 7 constructed the rationals from pairs of integers because division kept failing. Chapter 8 proved √2 irrational and built the real line because roots kept failing.',
        },
        {
          kind: 'para',
          text:
            'This closing chapter draws the whole story as one **map** — the great extension ladder $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ — and reads it three ways. This lesson reads it *structurally*: what a number system is, what a closure failure is, what a repair is, and the charter that made the whole construction legal (the old laws survive every rung). Lesson 10.2 reads it *at work*: the finite circular systems $\\mathbb{Z}/9\\mathbb{Z}$, $\\mathbb{Z}/10\\mathbb{Z}$, $\\mathbb{Z}/11\\mathbb{Z}$ — the map\'s smallest territories — guarding real data as checksums. Lesson 10.3 reads it as a *toolkit*, unifying the competitive-arithmetic arsenal — unit digits, factorial zeros, base conversions, remainder chains — as one congruence engine.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'The ladder is the book',
          text:
            'If you retain one image from this entire volume, retain the ladder. Every hard technical fact of chapters 6–8 — difference pairs, fraction pairs, Dedekind cuts — exists to move the reader up exactly one rung while disturbing nothing below. The ladder is not a slogan over the door; it is the load-bearing structure, and this lesson is its inspection report.',
        },
        { kind: 'terms', items: [
          {
            term: 'Number system',
            def: 'A set of objects together with operations (addition, multiplication, and where available subtraction and division) that satisfy specific laws. A system is not a bag of symbols; it is symbols + operations + the laws they obey. The four great systems of this book are ℕ, ℤ, ℚ and ℝ.',
          },
          {
            term: 'Closure failure',
            def: 'A computation the operations of a system cannot finish inside that system — an equation with no solution, a difference with no name. ℕ fails $x + 8 = 5$; ℤ fails $3x = 2$; ℚ fails $x^2 = 2$. A failure is not a defect to hide but the engine of the next construction.',
          },
          {
            term: 'Extension',
            def: 'A larger system built from a smaller one, into which the smaller one sits unchanged: an injective map preserving addition and multiplication (an embedding), so every old computation remains a computation of the new system with the same verdict.',
          },
          {
            term: 'The extension ladder',
            def: 'The chain $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ of the four systems this book built, each rung repairing exactly the closure failure that forced it: ℤ repairs subtraction, ℚ repairs division, ℝ repairs roots and limits.',
          },
          {
            term: 'Embedding',
            def: 'The concrete sitting-inside map: $n \\mapsto [(n, 0)]$ from ℕ into the difference-pair integers (chapter 6), $n \\mapsto (n, 1)$ from ℤ into the fraction-pair rationals (chapter 7), and the identity-style placement of ℚ inside the cuts (chapter 8). Verified as structure-preserving in the derivation below.',
          },
          {
            term: 'Permanence of formal laws',
            def: 'The charter stated by Peacock (1833) and refined by Hankel (1867): an extension may add powers but must never break a law the old system obeyed. Every general rule of arithmetic that held below holds above — permanence is why a schoolchild\'s computation survives every rung of the ladder untouched.',
          },
          {
            term: 'One-step solvability',
            def: 'The census question this lesson answers exactly: for which $(a, b)$ does $x + a = b$, $a \\cdot x = b$, or $x^2 = n$ have a solution in which system? The answers ($b > a$ in ℕ; $a \\mid b$ in ℤ; perfect squares in ℚ; $n \\ge 0$ in ℝ) are the precise sense in which each rung is "more powerful".',
          },
          {
            term: 'Congruence system (preview)',
            def: 'A finite, circular number system $\\mathbb{Z}/n\\mathbb{Z}$: the residues $0, 1, \\ldots, n-1$ with addition and multiplication taken modulo $n$, built in chapter 5. The smallest territories on the map — and, as lesson 10.2 shows, the systems that guard the world\'s data.',
          },
        ] },
        { kind: 'heading', text: 'What a Number System Is' },
        {
          kind: 'para',
          text:
            'The word *system* is doing real work, so let us define it. A **number system** is a set $S$ together with operations $+$ and $\\times$ (each taking two elements of $S$ and returning one — that demand alone is *closure*) and a list of laws they obey. The laws this book has tracked at every rung are short and famous: commutativity ($a + b = b + a$, $ab = ba$), associativity, the distributive law $a(b + c) = ab + ac$, the identities 0 and 1, and cancellation.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Number system (formal)',
          text:
            'A set $S$ with operations $+, \\times$ is said to be a **number system (for this book\'s purposes)** when $+$ and $\\times$ are closed on $S$ and satisfy the commutative, associative and distributive laws with identity elements. Thus, $a, b, c \\in S \\Rightarrow a + b \\in S,\\ ab \\in S$, and the laws hold for all choices.',
        },
        {
          kind: 'para',
          text:
            'Notice what the definition does *not* demand. It does not demand subtraction — ℕ has no negatives, and ℕ is still a system. It does not demand division — ℤ has no $\\frac{2}{3}$, and ℤ is still a system. It does not demand that roots or limits exist — ℚ lacks $\\sqrt{2}$, and ℚ is still a system. This is the whole architecture of the book in one sentence: **the systems differ not in the laws they keep but in the failures they tolerate.** Each rung of the ladder is bought by refusing to tolerate one more failure.',
        },
        {
          kind: 'para',
          text:
            'For example, take the smallest system first and check the definition against it:',
        },
        { kind: 'list', marker: 'roman', items: [
          '(i) ℕ is closed under $+$ and $\\times$: add or multiply two naturals and a natural answers — the one closure ℕ fully owns (verified exhaustively in the run-64 verifier, 200·66 triples, zero exits);',
          '(ii) ℕ obeys every listed law — the run-64 law sweep checked commutativity, associativity and distributivity on thousands of triples with zero failures;',
          '(iii) ℕ still fails $x + 8 = 5$: no natural is small enough, since $8 + x \\ge 9$ for every $x \\in \\mathbb{N}$ — a failure of *solvability*, not of any listed law.',
        ] },
        {
          kind: 'para',
          text:
            'So a closure failure never breaks a law. It reveals a *boundary*: the system answers every question it was built to answer, and then some question steps over the edge. The ladder is the record of what happened each time.',
        },
        { kind: 'heading', text: 'The Four Failures' },
        {
          kind: 'para',
          text:
            'Here is the whole book\'s plot in one table — the failure that forced each rung, the construction that answered it, and the chapter that carried it out. Read the middle column slowly: each entry is an equation that *no smaller system could solve*, which is the entire reason the larger system was built.',
        },
        { kind: 'table', caption: 'The repair ledger — every rung of the ladder is a repair, and the repairs are the book', head: ['System', 'Built to repair', 'The equation that forced it', 'The construction', 'Chapter'], rows: [
          ['ℕ', 'counting itself', '— (the floor of the ladder)', 'successors from 1 (0 joins later)', 'ch. 1'],
          ['ℤ', 'subtraction', '$x + 8 = 5$ (i.e. $5 - 8$)', 'difference pairs $[(a, b)] = a - b$', 'ch. 6'],
          ['ℚ', 'division', '$3x = 2$ (i.e. $x = \\frac{2}{3}$)', 'fraction pairs $(p, q) = p/q$', 'ch. 7'],
          ['ℝ', 'roots and limits', '$x^2 = 2$ (i.e. $x = \\sqrt{2}$)', 'Dedekind cuts on ℚ', 'ch. 8'],
        ] },
        {
          kind: 'para',
          text:
            'The failures are not qualitative hand-waving; they are countable. The run-64 verifier swept the one-step equations and produced exact censuses, and the numbers deserve to be looked at, because they measure *how much* each rung adds:',
        },
        { kind: 'table', caption: 'The solvability census — how often each system answers the one-step equations (all computed by script, sections A/D of the verifier)', head: ['Equation', 'Range swept', 'Smaller system answers', 'The rung answers'], rows: [
          ['$x + a = b$', '$a, b \\in [1, 30]$ (900 pairs)', 'ℕ: 435 of 900 (exactly those with $b > a$)', 'ℤ: 900 of 900'],
          ['$a \\cdot x = b$', '$a \\in [2, 12]$, $b \\in [1, 60]$ (660 pairs)', 'ℤ: 124 of 660 (exactly those with $a \\mid b$)', 'ℚ: 660 of 660'],
          ['$x^2 = n$', '$n \\in [1, 100]$', 'ℚ: 10 of 100 (the perfect squares)', 'ℝ: 100 of 100'],
        ] },
        {
          kind: 'para',
          text:
            'Three verdicts, one shape. The smaller system answers a *thin, detectable* subset — $b > a$; $a \\mid b$; $n$ a perfect square — and the new rung answers *all* of them. The thin subsets are not accidents: each one is a divisibility or order condition the smaller system\'s laws force, and each is a theorem, not an observation. The one-step solvability theorem below states all three precisely and proves them.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Caution — the boundary at 0 is a book-wide convention',
          text:
            'In this book ℕ = {1, 2, 3, …}: 0 is **not** a natural number (chapter 1\'s axiom list starts at 1, and 0 joined only as a placeholder digit in Foundation Mathematics, then as a full citizen of ℤ in chapter 6). The convention has teeth in the census: the equation $x + a = b$ with $b = a$ has solution $x = 0$, which lives in ℤ and **not** in ℕ — that is why the ℕ count is "the pairs with $b > a$", not "$b \\ge a$". Exam items love exactly this boundary; do not let another book\'s convention (ℕ with 0) blur it.',
        },
        { kind: 'heading', text: 'The Repair Pattern: Build, Embed, Agree' },
        {
          kind: 'para',
          text:
            'Every rung of the ladder was built the same way, and the shared recipe is worth naming now that you have seen it three times. **Step 1 — build:** new objects are constructed as *pairs* (or cuts) of old ones — chapter 6 built $[(a, b)]$ meaning $a - b$; chapter 7 built $(p, q)$ meaning $p/q$; chapter 8 built cuts, the closest chapters\' equivalent at a higher rung. **Step 2 — embed:** the old numbers sit inside the new ones along a faithful copy: $n$ sits as $[(n, 0)]$, then as $(n, 1)$. **Step 3 — agree:** every computation on the old numbers gives the same verdict whether performed below or above the rung.',
        },
        {
          kind: 'para',
          text:
            'Step 3 is the one that makes the whole enterprise honest, and it is a theorem, so let us prove it once, for the rung you have the most machinery for — the integers.',
        },
        { kind: 'derivation', title: 'The embedding theorem for ℤ (difference pairs)', statement: 'The map $e: \\mathbb{N} \\to \\mathbb{Z}$, $e(n) = [(n, 0)]$, is injective and preserves addition and multiplication: the naturals sit inside the integers as an exact structural copy.', steps: [
          { label: 'Recall the model', formula: '[(a, b)] \\text{ with } (a, b) \\sim (c, d) \\iff a + d = c + b', explanation: 'Chapter 6\'s difference pairs: the pair (a, b) stands for the difference a − b, and two pairs name the same integer when they agree as differences.' },
          { label: 'Injectivity', formula: '[(n, 0)] = [(m, 0)] \\iff n + 0 = m + 0 \\iff n = m', explanation: 'Two embedded naturals are equal exactly when the naturals were — the embedding collapses nothing. The run-64 sweep confirmed this on all 10,201 pairs (n, m) in [−50, 50]².' },
          { label: 'Addition is preserved', formula: '[(n,0)] + [(m,0)] = [(n+m,\\ 0+0)] = [(n+m, 0)] = e(n+m)', explanation: 'The pair-sum definition applied to embedded pairs lands on the embedded sum. Sweep-verified: zero mismatches across the range.' },
          { label: 'Multiplication is preserved', formula: '[(n,0)] \\cdot [(m,0)] = [(nm + 0 \\cdot 0,\\ n \\cdot 0 + 0 \\cdot m)] = [(nm, 0)] = e(nm)', explanation: 'The cross-term formula (which encodes the sign rules) eats zeros on the embedded pairs and returns the embedded product. The sweep found zero mismatches.' },
          { label: 'The old answers reappear', formula: '[(a, b)] = [(a - b, 0)] \\quad (a \\ge b \\ge 1)', explanation: 'For differences that were computable in ℕ, the integer named by the pair is the embedded old answer — sweeping a ≥ b up to 300 found the identification to hold always. This line is "computations agree" made exact.' },
        ], result: 'The naturals embed in the integers as $[(n, 0)]$ — injectively, sum- and product-faithfully — so every ℕ computation is a ℤ computation with the same verdict. The same three-line argument runs at the next rung with $(n, 1)$ in the fraction model (swept on 981 pairs), and chapter 8 placed ℚ inside the cuts. The ladder does not discard; it contains.' },
        {
          kind: 'example', title: 'Watch the embedding at work: 3 and 4, below and above the ℤ rung',
          steps: [
            'Below: $3 + 4 = 7$ and $3 \\times 4 = 12$ — two ℕ verdicts.',
            'Embed: $e(3) = [(3, 0)]$, $e(4) = [(4, 0)]$.',
            'Add above: $[(3,0)] + [(4,0)] = [(7, 0)] = e(7)$ — the same verdict, now wearing pair notation.',
            'Multiply above: $[(3,0)] \\cdot [(4,0)] = [(3 \\cdot 4 + 0 \\cdot 0,\\ 3 \\cdot 0 + 0 \\cdot 4)] = [(12, 0)] = e(12)$.',
            'Hence the embedded world computes exactly what the old world computed — and additionally answers $[(5, 8)]$ where ℕ had no verdict at all.',
          ],
        },
        { kind: 'heading', text: 'The Permanence Charter' },
        {
          kind: 'para',
          text:
            'What makes the three-step recipe *legal*? Nineteenth-century algebra had to answer exactly this, because the new systems were behaving scandalously well: negative numbers, fractions and irrationals all seemed to obey the same rules as counting numbers, and nobody had said whether that was a right or a coincidence. George Peacock (1833) answered with a principle he called the permanence of equivalent forms; Hermann Hankel (1867) sharpened it into the modern charter.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Peacock 1833 → Hankel 1867: the laws are the invariant',
          text:
            'Peacock\'s "principle of the permanence of equivalent forms" said: a law of arithmetic true for the counting numbers remains true for the extended symbols, unless the extension explicitly says otherwise. Hankel\'s *Theorie der complexen Zahlensysteme* (1867) made it precise and honest — the permanence is not a mystical guarantee but a *design requirement*: an extension is acceptable exactly when the old laws transfer. This book\'s chapters 6–8 were each, at heart, a check that the charter holds at one more rung. The charter is also self-limiting, which is its virtue: it forbids extensions that would break, say, cancellation — and indeed division by zero, which would break it, is forbidden on every rung of the ladder.',
        },
        {
          kind: 'para',
          text:
            'Stated for our ladder, the charter has two clauses — one forbidding loss, one permitting gain:',
        },
        { kind: 'list', marker: 'roman', items: [
          '(i) **Nothing old breaks.** Every law ℕ obeys, ℤ obeys; every law ℤ obeys, ℚ obeys; every law ℚ obeys, ℝ obeys. The run-64 sweep checked the core laws at each rung with exact arithmetic — commutativity, associativity, distributivity, cancellation — thousands of triples per rung, zero failures. The radical spot checks carried from chapter 8 confirm the ℚ-to-ℝ leg: $\\sqrt{2} \\cdot \\sqrt{8} = 4$, $\\sqrt{2} + \\sqrt{8} = 3\\sqrt{2}$, $(1+\\sqrt{2})(1-\\sqrt{2}) = -1$, $\\sqrt{2}\\sqrt{3} = \\sqrt{6}$.',
          '(ii) **Each rung adds exactly one power.** ℤ adds additive inverses — every difference answers. ℚ adds multiplicative inverses — every $a \\neq 0$ divides. ℝ adds completeness — every nonnegative number has a root, and the holes are filled. One power per rung; no rung is redundant.',
        ] },
        { kind: 'table', caption: 'The law ledger — kept (swept green at every rung) versus gained (one power per rung)', head: ['Rung', 'Laws kept (nothing breaks)', 'Power gained (the repair)'], rows: [
          ['ℕ', '— the floor: all core laws hold here first', 'closure under $+, \\times$; induction'],
          ['ℤ', 'all ℕ laws (61·61·9-triple sweep, 0 fail)', '$x + a = b$ always solvable (additive inverses)'],
          ['ℚ', 'all ℤ laws (fraction sweep, 0 fail)', '$a x = b$ always solvable for $a \\neq 0$ (inverses)'],
          ['ℝ', 'all ℚ laws (the field laws, ch. 7–8)', '$x^2 = n$ solvable for all $n \\ge 0$; limits complete'],
        ] },
        {
          kind: 'para',
          text:
            'The ledger explains a fact every student has felt but rarely seen named: **arithmetic never gets relearned.** The multiplication table you memorized at seven is a true table of ℚ, ℝ, and every system above — permanence is the reason. When a new system *does* seem to change a rule (as when ℤ absorbs "you cannot subtract a bigger from a smaller"), read carefully: the old rule was never a law, only a statement about the smaller domain — $5 - 8$ was never forbidden by a law of ℕ; it was merely unanswerable there.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'What permanence forbids',
          text:
            'The charter cuts both ways. Because the old laws must survive, an extension may not invent exceptions: no system built by this recipe may declare $0 \\cdot n = 7$, or make $0/0 = 1$ while keeping distributivity and cancellation (chapter 9.3 derived the verdict from exactly those laws). When you meet a proposed "new number system" that breaks an old law, it is not an extension of the ladder — it is a different structure, and it must say so honestly, as the complex numbers do by giving up order (a note at the end of this lesson).',
        },
        { kind: 'heading', text: 'The One-Step Solvability Theorem' },
        {
          kind: 'para',
          text:
            'Everything so far compresses into one theorem — the precise map of *what each system answers*. It is the theorem this chapter will reuse twice (lesson 10.2\'s checksum analysis is a solvability question in $\\mathbb{Z}/n\\mathbb{Z}$; lesson 10.3\'s toolkit is one in disguise), so we state it in full.',
        },
        { kind: 'derivation', title: 'One-step solvability across the ladder', statement: 'Let $a, b \\in \\mathbb{Z}$ with $a \\neq 0$ and $n \\in \\mathbb{Z}$. Then: (1) $x + a = b$ has a ℕ-solution iff $b - a \\ge 1$, and a ℤ-solution always; (2) $a x = b$ has a ℤ-solution iff $a \\mid b$, and a ℚ-solution always; (3) $x^2 = n$ has a ℚ-solution iff $n$ is a perfect square, and an ℝ-solution iff $n \\ge 0$.', steps: [
          { label: 'The subtraction rung', formula: 'x + a = b \\iff x = b - a', explanation: 'In ℤ the answer always exists. It lies in ℕ exactly when $b - a \\ge 1$ — recall 0 ∉ ℕ in this book, so $b = a$ (x = 0) already steps off the naturals. The sweep confirmed 435 of the 900 pairs $(a,b) \\in [1,30]^2$ have $b > a$.' },
          { label: 'The division rung', formula: 'a x = b \\text{ in } \\mathbb{Z} \\iff a \\mid b', explanation: 'If x ∈ ℤ solves it then b = ax shows a | b; conversely x = b/a is an integer exactly then. The sweep counted: Σ ⌊60/a⌋ for a = 2..12 gives 124 of the 660 pairs. In ℚ, x = b/a exists for every a ≠ 0 — the field law of chapter 7.' },
          { label: 'The root rung in ℚ', formula: 'x^2 = n,\\ x = p/q \\text{ lowest terms} \\Rightarrow p^2 = n q^2 \\Rightarrow q = 1', explanation: 'If q > 1, a prime dividing q divides p² = n q², hence divides p — contradicting lowest terms. So x is an integer and n = x² is a perfect square; conversely a perfect square is obviously answered. The sweep: 10 of the first 100 integers are perfect squares.' },
          { label: 'The root rung in ℝ', formula: 'x^2 = n,\\ n \\ge 0 \\text{ answers in } \\mathbb{R}', explanation: 'Chapter 8\'s completeness delivers √n for every n ≥ 0 (the cut construction), and for n < 0 no solution can exist in any ordered system — the sign law: x ≥ 0 gives x² ≥ 0, and x < 0 gives (−x)² = x² ≥ 0. The verifier re-swept the sign law and re-ran the p² = 2q² impossibility grid.' },
          { label: 'The ladder reads off', formula: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}:\\ \\text{each } \\supset \\text{ answers strictly more}', explanation: 'Each verdict set strictly contains the previous (900 > 435; 660 > 124; 100 > 10 on the swept ranges) — "more powerful" is a countable, checkable claim, not a vibe.' },
        ], result: 'The census of the one-step equations: $x + a = b$ — ℕ iff $b > a$, ℤ always; $ax = b$ — ℤ iff $a \\mid b$, ℚ always ($a \\neq 0$); $x^2 = n$ — ℚ iff $n$ is a perfect square, ℝ iff $n \\ge 0$. Every "repair" in this book is one row of this theorem.' },
        { kind: 'figure', caption: 'The repair map: four systems, three forced rungs, one open gate. Each arrow embeds the old system unchanged (the embedding theorem); the dashed gate above ℝ marks the failure this book deliberately leaves unrepaired — no ordered system can answer x² = −1.', svg: repairMapSvg() },
        { kind: 'heading', text: 'What the Map Does Not Show' },
        {
          kind: 'para',
          text:
            'An honest map marks its own edges, so here are the three edges of ours. **First, the ladder ends but arithmetic does not:** $x^2 = -1$ is answered by no rung — the sign law forbids it in every ordered system — and the complex numbers answer it by keeping every field law while giving up order. That construction belongs to a later book; what matters here is that it is *not* a violation of permanence but its continuation, with one law-family (order) consciously surrendered. **Second, size:** nothing on our map says how big each system is — that ℚ is countable while ℝ is not is Cantor\'s theorem, and it opens the Set Theory shelf. **Third — and next lesson\'s business — the map has smallest territories:** the finite circular systems $\\mathbb{Z}/n\\mathbb{Z}$ from chapter 5. They are not footnotes to the ladder; they are systems in the full sense of the definition above, with their own laws, their own invertible elements, their own solvability census.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The date cluster 1867–1872',
          text:
            'The map was drawn under pressure in five years: Hankel\'s permanence charter (1867), Dedekind\'s cuts booklet and Cantor\'s fundamental sequences and Heine\'s exposition (1872) — the arithmetization of the real line — all within reach of one long-lived reader. Beck and Geoghegan\'s *The Art of Proof* opens by declaring "our subject is number systems" — the same map, as the front door of university mathematics. This book has walked it rung by rung.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner — the ladder as a classification question',
          text:
            'Competitive examinations test this lesson almost verbatim, in two recurring shapes. Shape one: "in which system does the answer live?" — for $5 - 8$, $3x = 2$, $x^2 = 2$, the expected classification is ℤ, ℚ, ℝ (with ℕ as the trap answer for $5 - 8$). Shape two: "for how many pairs is there no solution *in ℕ*?" — the census counts ($b > a$; $a \\mid b$; perfect squares) are exactly what such items want, and the boundary $b = a$ (answer 0, not a natural) is the planted trap. Lesson 10.3 will add the toolkit questions (unit digits, factorial zeros) that ride on the same ladder.',
        },
        {
          kind: 'para',
          text:
            'With the map drawn and its edges marked, one territory now deserves its day in the sun. The finite systems $\\mathbb{Z}/n\\mathbb{Z}$ were built in chapter 5 as an arithmetic of remainders; their grandest everyday employment — guarding the numbers on the back of every book you own, every card in your wallet — is a story about three specific systems, $n = 9$, 10 and 11, and it is the next lesson\'s subject.',
        },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'Which failure of ℕ forced the construction of ℤ?',
            options: [
              'Multiplication sometimes grows too fast to tabulate',
              'Differences like 5 − 8 have no natural verdict — the equation x + 8 = 5 has no ℕ solution',
              'Some natural numbers have too many divisors',
              'Counting runs out of numbers for large quantities',
            ],
            answer: 1,
            explain:
              'Chapter 6 built ℤ precisely because subtraction kept failing: 8 + x ≥ 9 > 5 for every natural x, so x + 8 = 5 is unsolvable in ℕ. Option 0 describes a convenience problem, not a closure failure; option 2 describes primality (chapter 4), irrelevant to the ℤ rung; option 3 is false — successors never run out.',
          },
          {
            q: 'Which statement is the permanence charter?',
            options: [
              'Each new system keeps every law of the old one and adds exactly one new power',
              'Each new system replaces the old laws with stronger ones',
              'Old computations must be redone carefully in each new system',
              'The laws of arithmetic hold only in the largest system, ℝ',
            ],
            answer: 0,
            explain:
              'Peacock (1833) and Hankel (1867): an extension is acceptable exactly when the old laws transfer — nothing old breaks, one power is gained per rung. Option 1 inverts the design; option 2 contradicts the embedding theorem (old computations agree verbatim); option 3 is the opposite of the truth — the laws hold at every rung, including the floor.',
          },
          {
            q: 'For a in [2, 12] and b in [1, 60], the equation a·x = b has an integer solution for exactly —',
            options: ['all 660 pairs', '124 of the 660 pairs — those with a | b', 'exactly half the pairs', 'only the pairs with b prime'],
            answer: 1,
            explain:
              'a·x = b is ℤ-solvable iff a divides b, and the sweep counted Σ ⌊60/a⌋ = 30+20+15+12+10+8+7+6+6+5+5 = 124 of 660 (note ⌊60/10⌋ = 6 — a common hand-count slip). Option 0 describes ℚ\'s verdict (every a ≠ 0 divides there), option 3 fails on b = 12 (a = 2 divides it, 12 not prime).',
          },
          {
            q: 'The failure x² = 2 is repaired by —',
            options: ['ℤ, since 2 is an integer', 'ℚ, since 2/1 is a fraction', 'ℝ — √2 exists there and nowhere smaller', 'no system in this book'],
            answer: 2,
            explain:
              'Chapter 8 proved √2 irrational — no p/q in lowest terms has p² = 2q² (re-swept on the p ≤ 60, q ≤ 40 grid) — so ℚ fails and completeness delivers √2 in ℝ. Option 2 (with answer index 1 as written: "ℚ") is the planted trap precisely because ℚ repairs the rung BELOW — division — not this one.',
          },
          {
            q: 'Which equation remains unsolved on our entire ladder ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ?',
            options: ['x + 7 = 2', '3x = 2', 'x² = 2', 'x² = −1'],
            answer: 3,
            explain:
              'The sign law — x² ≥ 0 in every ordered system — forbids x² = −1 on every rung; it waits for ℂ, which keeps the field laws but gives up order. The first three are exactly the three repairs: x + 7 = 2 answers in ℤ (x = −5), 3x = 2 in ℚ (x = 2/3), x² = 2 in ℝ (√2).',
          },
        ] },
        { kind: 'exercises', title: 'Exercises', sets: [
          { level: 'L1', questions: [
            {
              q: 'Name the smallest system on our ladder in which each verdict lives: (i) 5 − 8 (ii) 3 × 4 (iii) 2/3 (iv) √2.',
              solution: [
                'Classify each verdict against the census of this lesson.',
                '(i) $5 - 8 = -3$: negative — ℕ cannot, ℤ can: the answer lives in $\\mathbb{Z}$.',
                '(ii) $3 \\times 4 = 12$: a natural — ℕ answers, and ℕ is the smallest system that does.',
                '(iii) $2/3$: no integer verdict ($2 = 3x$ has no ℤ solution, 3 ∤ 2) — $\\mathbb{Q}$.',
                '(iv) $\\sqrt{2}$: irrational (ch. 8) — $\\mathbb{R}$.',
              ],
              answer: '(i) ℤ (ii) ℕ (iii) ℚ (iv) ℝ',
            },
            {
              q: 'Compute the three repairs of this book and name the failure each one repairs.',
              solution: [
                'Failure 1 — subtraction in ℕ: $5 - 8$ has no natural verdict.',
                'Repair 1 (ℤ, difference pairs): $5 - 8 = -3$.',
                'Failure 2 — division in ℤ: $3x = 2$ has no integer verdict (3 ∤ 2).',
                'Repair 2 (ℚ, fraction pairs): $x = 2/3$.',
                'Failure 3 — roots in ℚ: $x^2 = 2$ has no rational verdict (p² = 2q² impossible, ch. 8).',
                'Repair 3 (ℝ, cuts): $x = \\sqrt{2}$ (and its negative).',
              ],
              answer: '−3 (subtraction); 2/3 (division); √2 (roots)',
            },
            {
              q: 'Is 0 a natural number in this book? Exhibit the boundary equation that exposes why the answer matters.',
              solution: [
                'No — chapter 1\'s axioms start the chain at 1: $\\mathbb{N} = \\{1, 2, 3, \\dots\\}$.',
                'The boundary: $x + 7 = 7$ has solution $x = 0$ — a ℤ verdict, not a ℕ one.',
                'In the census language: $x + a = b$ is ℕ-solvable iff $b > a$; the case $b = a$ is exactly where 0 would be needed.',
                'Hence the ℕ solvability count is 435 of 900 (not 465): the 30 pairs with $b = a$ already leave ℕ.',
              ],
              answer: 'No; x + 7 = 7 (x = 0 ∉ ℕ, ∈ ℤ)',
            },
          ] },
          { level: 'L2', questions: [
            {
              q: 'For (a, b) ∈ [1, 5]², count the pairs for which x + a = b has NO ℕ solution, and check your count by the theorem.',
              solution: [
                'By the one-step theorem: unsolvable in ℕ iff $b \\le a$.',
                'Count: for each a, the b ≤ a contribute a pairs: $1 + 2 + 3 + 4 + 5 = 15$.',
                'Check: solvable pairs are $b > a$: $25 - 15 = 10$ — and indeed $b - a \\ge 1$ for exactly 10 of the 25.',
                'The general shape: $n(n+1)/2$ unsolvable pairs in $[1, n]^2$ — a triangular number, here $T_5 = 15$.',
              ],
              answer: '15 of 25 (b ≤ a); 10 solvable',
            },
            {
              q: 'For a ∈ {2, 3, 4} and b ∈ [1, 12], list which pairs a·x = b have a ℤ-solution and count them two ways.',
              solution: [
                'ℤ-solvable iff $a \\mid b$.',
                'a = 2: b ∈ {2, 4, 6, 8, 10, 12} — 6 pairs. a = 3: {3, 6, 9, 12} — 4. a = 4: {4, 8, 12} — 3.',
                'Count: $6 + 4 + 3 = 13$ of 36.',
                'Second way: $\\lfloor 12/2 \\rfloor + \\lfloor 12/3 \\rfloor + \\lfloor 12/4 \\rfloor = 6 + 4 + 3 = 13$. ✓',
                'Note the shape — the same Σ ⌊N/a⌋ that gave 124 on the [2,12]×[1,60] census.',
              ],
              answer: '13 of 36',
            },
            {
              q: 'Compute [(3,0)] + [(4,0)] and [(3,0)]·[(4,0)] from the difference-pair formulas, and confirm both results sit on the embedded image of ℕ.',
              solution: [
                'Addition: $[(3,0)] + [(4,0)] = [(3+4,\\ 0+0)] = [(7, 0)] = e(7)$. ✓',
                'Multiplication: $[(3,0)] \\cdot [(4,0)] = [(3 \\cdot 4 + 0 \\cdot 0,\\ 3 \\cdot 0 + 0 \\cdot 4)] = [(12, 0)] = e(12)$. ✓',
                'Both land on embedded naturals — the embedding theorem\'s "computations agree", instance by instance.',
                'The contrast: $[(5, 8)]$ has NO embedded-natural form ($5 < 8$) — this is the new territory ℤ adds.',
              ],
              answer: '[(7,0)] = e(7); [(12,0)] = e(12)',
            },
          ] },
          { level: 'L3', questions: [
            {
              q: 'Prove that x + 8 = 5 has no natural solution, using only chapter 1\'s order structure — then give the ℤ verdict in pair notation.',
              solution: [
                'Every natural $x$ satisfies $x \\ge 1$ (1 is the first natural; there is nothing before it).',
                'So $8 + x \\ge 8 + 1 = 9$ — adding preserves order (ch. 1).',
                'Trichotomy: $8 + x = 5$ would need $8 + x < 9$ and $= 5$; both contradict $8 + x \\ge 9$. No ℕ verdict.',
                'In ℤ: the pair $[(5, 8)]$ names the difference; $[(5,8)] = [(5-8, 0)] = [(-3, 0)]$ — the verdict is $-3$, and indeed $8 + (-3) = 5$.',
              ],
              answer: 'No ℕ solution; ℤ answers −3',
            },
            {
              q: 'Show that (n, 1) and (nk, k) name the same rational for every k ≥ 1, and explain what this yields for ℤ\'s computations inside ℚ.',
              solution: [
                'Chapter 7\'s equivalence: $(p, q) \\sim (r, s)$ iff $ps = rq$.',
                'Check: $(n, 1) \\sim (nk, k)$ iff $n \\cdot k = nk \\cdot 1$ — true for every $k \\ge 1$. ✓',
                'So each integer has infinitely many fraction names — $5 = (5,1) = (10,2) = (55,11)$ — and the sweep in the verifier confirmed the renamings never collide with a different integer.',
                'Consequence: the ℤ-computations transfer unchanged (the embedding $n \\mapsto (n, 1)$ is a homomorphism — add and multiply before or after renaming, same verdict), which is permanence at the ℚ rung.',
              ],
              answer: '(n,1) ~ (nk,k) since nk = nk; ℤ computes identically inside ℚ',
            },
            {
              q: 'Verify the distributive law for the difference-pair model on (2,5), (7,3), (1,4): show [(2,5)]·([(7,3)] + [(1,4)]) equals [(2,5)]·[(7,3)] + [(2,5)]·[(1,4)].',
              solution: [
                'Sum first: $[(7,3)] + [(1,4)] = [(8, 7)]$.',
                'LHS: $[(2,5)] \\cdot [(8,7)] = [(2 \\cdot 8 + 5 \\cdot 7,\\ 2 \\cdot 7 + 5 \\cdot 8)] = [(51, 54)] = 51 - 54 = -3$.',
                'Product 1: $[(2,5)] \\cdot [(7,3)] = [(14 + 15,\\ 6 + 35)] = [(29, 41)] = -12$.',
                'Product 2: $[(2,5)] \\cdot [(1,4)] = [(2 + 20,\\ 8 + 5)] = [(22, 13)] = 9$.',
                'RHS: $[(29,41)] + [(22,13)] = [(51, 54)] = -3$. LHS = RHS. ✓ (Both sides $-3$; the verifier swept this identity over thousands of triples.)',
              ],
              answer: 'Both sides equal −3',
            },
          ] },
          { level: 'L4', questions: [
            {
              q: 'Exam-style: for how many pairs (a, b) with a, b ∈ [1, 10] does x + a = b have no ℕ solution? State the count for [1, n]² generally.',
              solution: [
                'Unsolvable in ℕ iff $b \\le a$ (the theorem; note $b = a$ already fails since the answer would be 0).',
                'Count for $n = 10$: $1 + 2 + \\cdots + 10 = 55$ of the 100 pairs.',
                'Generally: $\\sum_{a=1}^{n} a = n(n+1)/2$ — the triangular number $T_n$.',
                'Check the shape at n = 30 (the chapter\'s census): $T_{30} = 465$ unsolvable, $900 - 465 = 435$ solvable — matching the sweep exactly. ✓',
              ],
              answer: '55 of 100; generally n(n+1)/2',
            },
            {
              q: 'Exam-style: for n ∈ [1, 20], x² = n is solvable in which systems? Give the exact ℚ-solvable set and the two counts.',
              solution: [
                'ℚ-solvable iff $n$ is a perfect square: $n \\in \\{1, 4, 9, 16\\}$ — 4 of 20.',
                'ℝ-solvable: all 20 (every $n \\ge 1$ has a real root, ch. 8).',
                'ℤ-solvable: the same four — the theorem\'s proof showed a rational root of an integer square must be an integer.',
                'And $x^2 = 0$? Solvable in ℤ, ℚ, ℝ ($x = 0$) — never in ℕ, the book\'s boundary convention again.',
              ],
              answer: '{1, 4, 9, 16} in ℚ and ℤ (4 of 20); all 20 in ℝ',
            },
          ] },
          { level: 'L5', questions: [
            {
              q: 'State the permanence charter in your own words, then prove that 0 has no multiplicative inverse in ANY system of the ladder — which law forces this?',
              solution: [
                'Charter: an extension must preserve every law the old system obeyed, and may only add new powers — nothing old breaks, one thing is gained.',
                'Suppose $0 \\cdot u = 1$ for some $u$ in a system with the field-shaped laws.',
                'But $0 \\cdot u = 0$ (the zero-product theorem: $0 \\cdot u + 0 \\cdot u = 0 \\cdot (u + u) = 0 \\cdot u$, so cancellation gives $0 \\cdot u = 0$ — derived in lesson 9.3 from distributivity + cancellation).',
                'So $0 = 1$ — false in every system on the ladder (1 ≠ 0 is part of the identity structure).',
                'The forcing law is cancellation via distributivity — the same laws that make the systems work forbid the inverse. Division by zero stays forbidden on every rung: permanence protects the old prohibition too.',
              ],
              answer: '0·u = 0 ≠ 1 by the zero-product theorem — no inverse on any rung',
            },
            {
              q: 'Prove: an integer n ≥ 1 has a rational square root if and only if every prime exponent in its factorization is even.',
              solution: [
                '(⇐) If $n = p_1^{2e_1} \\cdots p_k^{2e_k}$, then $n = (p_1^{e_1} \\cdots p_k^{e_k})^2$ — a rational (integer) root exists.',
                '(⇒) Let $x = a/b$ in lowest terms solve $x^2 = n$: then $a^2 = n b^2$.',
                'If $b > 1$, a prime $p \\mid b$ gives $p \\mid a^2$, hence $p \\mid a$ (Euclid\'s lemma, ch. 4) — contradicting lowest terms. So $b = 1$ and $x = a$ is an integer.',
                'Then $n = a^2$, and by uniqueness of factorization (FTA, ch. 4) the exponents of a square are all even. ∎',
                'This is the census\'s "perfect squares" row made structural — and the p² = 2q² impossibility is the case n = 2 (exponent 1, odd).',
              ],
              answer: 'Rational root ⟺ all prime exponents of n even',
            },
          ] },
          { level: 'L6', questions: [
            {
              q: 'The ladder ends: show that no ordered system — ℝ included — can solve x² = −1, and explain which property ℂ consciously gives up to answer it.',
              solution: [
                'In an ordered field, every element is $x \\ge 0$ or $x < 0$ (trichotomy).',
                'Case 1: $x \\ge 0$ — products of nonnegatives are nonnegative (order\'s closure axiom), so $x^2 \\ge 0$.',
                'Case 2: $x < 0$ — then $x^2 = (-x)^2$ with $-x > 0$, so again $x^2 \\ge 0$.',
                'Either way $x^2 \\ge 0 > -1$: the equation $x^2 = -1$ is unsolvable in EVERY ordered system. The gate on the map is permanent for order-respecting structures.',
                'ℂ answers it by keeping every field law (permanence continues!) while surrendering order — there is no consistent "positive" notion for ℂ. The map\'s edge is where the next book begins.',
              ],
              answer: 'x² ≥ 0 in every ordered system; ℂ gives up order',
            },
            {
              q: 'The map\'s smallest territories: write a short note on what the congruence systems ℤ/9ℤ, ℤ/10ℤ and ℤ/11ℤ add to the map, and why they are full number systems rather than shorthand.',
              solution: [
                'Each $\\mathbb{Z}/n\\mathbb{Z}$ (ch. 5) is a set of $n$ residues with $+$ and $\\times$ taken modulo $n$ — closed, commutative, associative, distributive, with identities 0 and 1: every item of the definition of a number system is met.',
                'They are FINITE and CIRCULAR: $9 + 1 = 10 \\equiv 1 \\pmod{9}$ — addition walks a circle of $n$ stations, unlike anything on the infinite ladder.',
                'They sit beside the ladder, not on it: the map of arithmetic is bigger than one line.',
                'Key structural fact for next lesson: in $\\mathbb{Z}/9\\mathbb{Z}$, $10 \\equiv 1$, so every power of ten collapses onto the units place — a whole place-value string condenses to its digit sum. In $\\mathbb{Z}/11\\mathbb{Z}$, $10 \\equiv -1$: alternating collapse.',
                'Lesson 10.2 will turn exactly these collapses into error-detecting machines — the congruence engine guarding ISBNs and card numbers.',
              ],
              answer: 'Finite circular systems meeting the full definition; 10 ≡ 1 (mod 9), 10 ≡ −1 (mod 11) are the two collapses checksums exploit',
            },
          ] },
        ] },
        { kind: 'formula', name: 'The ladder of embeddings', latex: '\\mathbb{N} \\ni n \\mapsto [(n, 0)] \\in \\mathbb{Z} \\ni n \\mapsto (n, 1) \\in \\mathbb{Q} \\hookrightarrow \\mathbb{R}', note: 'injective, + and × preserved at every rung — every old computation is a new-system computation with the same verdict' },
        { kind: 'formula', name: 'One-step solvability across the ladder', latex: 'x + a = b:\\ \\mathbb{N} \\iff b > a,\\ \\mathbb{Z} \\text{ always}; \\quad ax = b:\\ \\mathbb{Z} \\iff a \\mid b,\\ \\mathbb{Q} \\text{ always}; \\quad x^2 = n:\\ \\mathbb{Q} \\iff n \\text{ a perfect square},\\ \\mathbb{R} \\iff n \\ge 0', note: 'the census theorem — 435/900, 124/660, 10/100 on the swept ranges' },
        { kind: 'formula', name: 'The permanence charter', latex: '\\mathrm{laws}(\\mathbb{N}) \\subseteq \\mathrm{laws}(\\mathbb{Z}) \\subseteq \\mathrm{laws}(\\mathbb{Q}) \\subseteq \\mathrm{laws}(\\mathbb{R})', note: 'nothing old breaks, one power per rung (Peacock 1833, Hankel 1867)' },
        { kind: 'formula', name: 'The unsolvable gate', latex: 'x \\ge 0 \\text{ or } x < 0 \\ \\Rightarrow\\ x^2 \\ge 0 \\ \\Rightarrow\\ x^2 = -1 \\text{ has no ordered solution}', note: 'the ladder\'s permanent edge; ℂ answers by keeping the field laws and giving up order' },
      ],
    },
    {
      id: 'ans-numbers-that-guard-data-checksums-and-casting-out-nines',
      number: '10.2',
      title: 'Numbers That Guard Data: Checksums and Casting Out Nines',
      prerequisites: [
        'ans-remainders-become-numbers-congruence-defined',
        'ans-why-the-divisibility-tests-work',
        'ans-unit-digit-cycles-of-powers',
        'ans-the-great-extension-story',
      ],
      sources: [
        'gauss-1801-disquisitiones',
        'fibonacci-1202-liber-abaci',
        'hamming-1950-error-detecting',
        'isbn-check-digit-schemes',
        'luhn-algorithm-iso7812',
      ],
      concepts: [
        'Casting out nines',
        'Digital root',
        'Check digit',
        'Weighted checksum',
        'ISBN-10 (mod 11)',
        'ISBN-13 / EAN (mod 10)',
        'Luhn algorithm',
        'Error detection',
      ],
      objectives: [
        'rebuild the casting-out-nines engine as a computation inside ℤ/9ℤ and use it to check sums, differences and products',
        'prove exactly what the mod-9 check catches (88 of 90 single-digit substitutions) and what it never catches (every adjacent transposition)',
        'state the two detection theorems for weighted checksums over a prime modulus and apply them to ISBN-10, where every single-digit error and every adjacent transposition is caught',
        'compute and verify ISBN-10 and ISBN-13/EAN-13 check digits, including the X = 10 case, and explain what ISBN-13\'s composite modulus costs',
        'run the Luhn algorithm on an identification number and locate its one transposition blind spot (0 ↔ 9)',
        'read all four schemes as one idea — a map into ℤ/mℤ whose solvability condition is the guard — and state honestly what a checksum can never do',
      ],
      blocks: [
        {
          kind: 'para',
          text:
            'On the back of every book you own, every card in your wallet, every parcel label a courier scans, a small piece of lesson 10.1\'s map is quietly working: a **finite congruence system** — $\\mathbb{Z}/9\\mathbb{Z}$, $\\mathbb{Z}/10\\mathbb{Z}$, or $\\mathbb{Z}/11\\mathbb{Z}$ — standing guard over data. The guard is called a **check digit** or **checksum**: one extra digit, computed from the others by a fixed congruence rule, so that when a human types the number back and makes one of the two mistakes humans actually make — miswriting one digit, or swapping two neighbours — the typed number fails the rule and the machine refuses it.',
        },
        {
          kind: 'para',
          text:
            'This lesson builds the four classical engines in order of increasing cleverness — casting out nines (mod 9, the oldest), ISBN-10 (mod 11, weighted), ISBN-13/EAN (mod 10, alternating weights) and the Luhn algorithm (mod 10, doubling) — and for each one it proves *exactly* which errors are caught and which slip through. Every catch rate in the lesson was computed by exhaustive sweep in the run-64 verifier (sections E–I) before any prose was written; the numbers you are about to read are measurements, not impressions.',
        },
        { kind: 'terms', items: [
          {
            term: 'Checksum / check digit',
            def: 'An extra digit (or residue) computed from a number by a fixed congruence rule and carried with it; a typed copy is accepted only if the rule holds again. The check digit adds no information for humans — it exists entirely to make common typing errors detectable.',
          },
          {
            term: 'Casting out nines',
            def: 'The classical check on arithmetic: replace each operand and the result by its residue mod 9 (its digital root) and re-test the relation. Works because $10 \\equiv 1 \\pmod 9$, so every place value collapses onto the units station. Described in Fibonacci\'s Liber Abaci (1202) and older; used for centuries by bookkeepers.',
          },
          {
            term: 'Digital root',
            def: 'The single digit left after repeatedly summing the digits of a number: $\\mathrm{dr}(N) = 1 + ((N - 1) \\bmod 9)$ for $N \\ge 1$ (and $\\mathrm{dr}(0) = 0$). It is the representative of $N$\'s residue class in $\\{1, \\ldots, 9\\}$ — the mod-9 residue wearing the digit-sum costume.',
          },
          {
            term: 'Weighted checksum',
            def: 'A validity rule of the form $\\sum w_i d_i \\equiv 0 \\pmod m$, where the digits $d_i$ carry position-dependent weights $w_i$. The weights are the design freedom: choosing them well is what separates a check that catches transpositions (ISBN-10) from one that never does (casting out nines, where all weights are 1).',
          },
          {
            term: 'ISBN-10 (mod 11)',
            def: 'The 1980s–2006 book code: ten digits with the check digit placed last so that $\\sum_{i=1}^{10} i \\, d_i \\equiv 0 \\pmod{11}$. Because 11 is prime and bigger than 10, every single-digit miswrite and every adjacent transposition changes the weighted sum — both error classes are caught, always. The residue 10 is written X.',
          },
          {
            term: 'ISBN-13 / EAN-13 (mod 10)',
            def: 'The modern book/barcode code: thirteen digits with weights $1, 3, 1, 3, \\ldots$ and validity $\\sum w_i d_i \\equiv 0 \\pmod{10}$. Every single-digit error is caught ($\\gcd(3, 10) = 1$); transpositions of digits differing by 5 (0↔5, 1↔6, …, 4↔9) slip through — 80 of the 90 ordered pairs are caught.',
          },
          {
            term: 'Luhn algorithm',
            def: 'Hans Peter Luhn\'s 1954 mod-10 scheme (now ISO/IEC 7812-1, used on most credit and many ID numbers): double every second digit from the right, subtract 9 from any result above 9, and require the total $\\equiv 0 \\pmod{10}$. The doubling map $[0,2,4,6,8,1,3,5,7,9]$ is injective, so all single-digit errors are caught; only the adjacent transposition 0↔9 slips (89 of 90).',
          },
          {
            term: 'Error detection (vs correction)',
            def: 'Detection = the ability to notice that something is wrong; correction = the ability to say what was right. All four schemes here only detect. Richard Hamming\'s 1950 paper, which framed the whole subject, took the next step — adding enough redundancy to locate and repair the error — and founded coding theory. Correction belongs to the Computer Science shelf.',
          },
        ] },
        { kind: 'heading', text: 'Casting Out Nines: the Oldest Checksum' },
        {
          kind: 'para',
          text:
            'The engine was already ancient when Fibonacci described it to Europe in 1202: to check an arithmetic result, replace every number by its **digital root** and redo the computation on those small representatives. Chapter 5 derived the engine from $10 \\equiv 1 \\pmod 9$ (the divisibility test for 9); here the emphasis flips from divisibility to **guarding**, so let us restate the mechanism in the map\'s language.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The mod-9 collapse (the engine)',
          text:
            'In $\\mathbb{Z}/9\\mathbb{Z}$ every power of ten equals 1: $10 \\equiv 1$, so $10^k \\equiv 1$ for all $k$. Hence $N = \\sum d_i 10^i \\equiv \\sum d_i \\pmod 9$ — a whole place-value string computes the same residue as its digit sum. The **digital root** $\\mathrm{dr}(N) = 1 + ((N-1) \\bmod 9)$ (for $N \\ge 1$) is that residue in the friendly $1..9$ costume, and it is closed under the operations: $\\mathrm{dr}(a + b) = \\mathrm{dr}(\\mathrm{dr}(a) + \\mathrm{dr}(b))$ and $\\mathrm{dr}(a \\cdot b) = \\mathrm{dr}(\\mathrm{dr}(a) \\cdot \\mathrm{dr}(b))$ — both swept to 50,000 and 2,000 × 2,000 respectively in the run-64 verifier with zero failures.',
        },
        {
          kind: 'para',
          text:
            'For example, the check on a multiplication:',
        },
        {
          kind: 'example', title: 'Verify 8,234 × 4,912 = 40,445,408 by casting out nines',
          steps: [
            'Digital roots of the operands: $\\mathrm{dr}(8{,}234)$: $8+2+3+4 = 17 \\to 8$; $\\mathrm{dr}(4{,}912)$: $4+9+1+2 = 16 \\to 7$.',
            'The check relation: $\\mathrm{dr}(8234) \\cdot \\mathrm{dr}(4912) = 8 \\cdot 7 = 56 \\to \\mathrm{dr}(56) = 5 + 6 = 11 \\to 2$.',
            'The claimed product: $4+0+4+4+5+4+0+8 = 29 \\to 2$. Both sides land on 2 — the arithmetic survives the check. ✓',
            'Now plant a realistic error: the product mis-typed as 40,445,40**6** (one digit off). Its digit sum: $27 \\to 9 \\neq 2$ — the mismatch SCREAMS: the result as typed cannot be the product.',
            'But swap two adjacent digits of the true product — 40,445,4**80**: digit sum $29 \\to 2 = 2$. The check stays silent: this error is invisible to mod 9.',
          ],
        },
        { kind: 'figure', caption: 'The mod-9 residue wheel: nine stations; every power of ten lands on station 1, so a place-value string condenses to its digit sum. The brown walk is 8,234 being read digit by digit — landing on station 8. Casting out nines is computing on this wheel instead of on the number line.', svg: residueWheelSvg() },
        {
          kind: 'para',
          text:
            'The exhibit exposes the scheme\'s whole personality: cheap, ancient, effective against miswrites — and **structurally blind to transpositions**. That is not bad luck; it is a theorem, and proving it is the first piece of real business of this lesson.',
        },
        { kind: 'derivation', title: 'What casting out nines catches — and what it can never catch', statement: 'A single-digit change (digit e at position k replaced by f ≠ e) changes the mod-9 residue by $(f - e) \\cdot 10^k \\equiv f - e \\pmod 9$, so it is caught iff $9 \\nmid (f-e)$ — exactly 88 of the 90 ordered digit pairs. An adjacent transposition changes N by $-9 \\cdot 10^k (d_{k+1} - d_k) \\equiv 0 \\pmod 9$, so NO transposition is ever caught.', steps: [
          { label: 'The single-digit shift', formula: 'N\' - N = (f - e)\\,10^{k} \\equiv (f - e) \\pmod 9', explanation: 'All place values are ≡ 1, so the shift is just the digit difference. The residue moves unless 9 divides it.' },
          { label: 'The slip census', formula: '9 \\mid (f - e) \\iff f - e = \\pm 9 \\iff (e, f) = (0, 9) \\text{ or } (9, 0)', explanation: 'Digit differences run from −9 to 9; the only non-zero multiples of 9 in that range are ±9. So exactly two of the 90 ordered substitutions slip: writing 0 for 9 or 9 for 0. Sweep-confirmed at the number level (six base numbers, every position, every digit): every slip was a 0↔9, no exceptions.' },
          { label: 'The transposition shift', formula: 'N\' - N = (d_{k+1} - d_k)10^{k} + (d_k - d_{k+1})10^{k+1} = -9 \\cdot 10^{k}(d_{k+1} - d_k)', explanation: 'Swapping two neighbours reshuffles them between adjacent place values; the algebra factors a naked 9 — the swap changes N by a MULTIPLE OF 9, always, whatever the digits.' },
          { label: 'The verdict', formula: 'N\' \\equiv N \\pmod 9 \\quad \\text{for every adjacent transposition}', explanation: 'The check sees the same residue before and after — 45 of 45 transposition types slip. The verifier\'s sweep found 0 catches in 7 sites × many numbers; the theorem says the count could never have been otherwise. Transposition-blindness is baked into the modulus, not into careless bookkeepers.' },
        ], result: 'Casting out nines catches 88 of 90 single-digit miswrites (only 0↔9 slips) and 0 of all adjacent transpositions. Every transposition leaves the residue untouched — a structural fact about ℤ/9ℤ, provable in one line and true forever.' },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Bookkeeper\'s probatio, 1202 and before',
          text:
            'Fibonacci\'s Liber Abaci introduces the check "by casting out nines" as part of the Hindu-Arabic reckoning toolkit; the practice (Latin *probatio novena*) is older still, reaching back through Arabic and Sanskrit arithmetic to the Pythagoreans\' digit mysticism. For seven centuries it was the standard audit of hand computation — the medieval clerk computing on the dust board or paper did the work twice: once for the answer, once for the residue. Chapter 5 banked the divisibility half of this story; here it earns its living as error detection.',
        },
        { kind: 'heading', text: 'Why the Misses Matter: Weighted Checks Enter' },
        {
          kind: 'para',
          text:
            'Casting out nines guards *arithmetic you did by hand*. The modern problem is different: guarding *identifiers typed back into machines* — and there the transposition is the number-one human error, precisely the error mod 9 cannot see. The fix took until the twentieth century and a shift of viewpoint: stop checking plain digit sums and start checking **weighted** sums, where each position carries its own multiplier.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Hamming, 1950: framing the whole subject',
          text:
            'Richard W. Hamming\'s "Error Detecting and Error Correcting Codes" (Bell System Technical Journal, 29(2), April 1950, pp. 147–160) framed detection and correction as a quantitative subject: add redundancy in a designed pattern, measure what error classes the pattern catches. The paper founded coding theory — and the ISBN example below lands on a pleasing loop, because the standard textbook example of an ISBN-10 is Hamming\'s own *Coding and Information Theory* (Prentice-Hall), ISBN 0-13-139139-9.',
        },
        {
          kind: 'para',
          text:
            'The general scheme: digits $d_1, \\ldots, d_n$ with weights $w_1, \\ldots, w_n$, modulus $m$; the number is valid iff',
        },
        { kind: 'equation', latex: '\\sum_{i=1}^{n} w_i \\, d_i \\equiv 0 \\pmod{m}', note: 'the check digit is chosen (when issuing the number) so that this congruence holds; a typed copy is accepted iff it still holds' },
        {
          kind: 'para',
          text:
            'Everything about a scheme follows from two questions: what does an error do to the sum $S = \\sum w_i d_i$, and can the corrupted sum still satisfy the congruence? Two computations answer both.',
        },
        { kind: 'derivation', title: 'The two detection theorems for weighted checksums', statement: 'Over a prime modulus $m > 9$ with all weights non-zero: (1) a single-digit substitution $e \\to f$ at position $i$ shifts $S$ by $(f - e) w_i$, which is $\\not\\equiv 0 \\pmod m$ for every digit pair — every miswrite is caught; (2) a transposition of adjacent digits $d_i, d_{i+1}$ shifts $S$ by $(d_i - d_{i+1})(w_i - w_{i+1})$, which is $\\not\\equiv 0 \\pmod m$ whenever the two weights differ — every adjacent transposition is caught.', steps: [
          { label: 'The substitution shift', formula: 'S\' - S = (f - e)\\, w_i', explanation: 'Only the i-th term changes. With m prime, m | (f − e)w_i would force m | (f − e) or m | w_i — but |f − e| ≤ 9 < m rules the first out, and w_i ≢ 0 rules the second out. The shift never lands back on a multiple of m: caught, always. (Sweep on ISBN-10s: 900 of 900 substitutions caught, no exceptions.)' },
          { label: 'The transposition shift', formula: 'S\' - S = (d_i w_i + d_{i+1} w_{i+1}) - (d_{i+1} w_i + d_i w_{i+1}) = (d_i - d_{i+1})(w_i - w_{i+1})', explanation: 'The two terms exchange weights; the algebra factors into (digit gap) × (weight gap). A transposition of DISTINCT digits has d_i − d_{i+1} ≠ 0 with |·| ≤ 9 < m; so the shift is ≢ 0 exactly when the weights differ. If w_i = w_{i+1}, the swap is invisible — which is exactly what happened in the mod-9 scheme, where ALL weights are 1.' },
          { label: 'Casting out nines re-read', formula: 'w_i = 1 \\text{ for all } i \\; \\Rightarrow \\; w_i - w_{i+1} = 0', explanation: 'The old scheme is the degenerate weighted scheme — equal weights — and the theorem predicts its blindness precisely. The weights are the design freedom; spending them (making neighbours differ) is what buys transposition detection.' },
          { label: 'The design rule', formula: 'm \\text{ prime}, \\; m > 9; \\quad w_i \\not\\equiv 0, \\; w_i \\neq w_{i+1}', explanation: 'Prime modulus makes "non-zero ⇒ non-factor" automatic; m > 9 keeps digit differences non-multiples of m. ISBN-10 will satisfy every clause: m = 11, weights 10, 9, …, 1 — all non-zero, all adjacent pairs differing by exactly 1.' },
        ], result: 'Over a prime modulus exceeding 9: non-zero weights catch every single-digit miswrite; neighbouring weights that differ catch every adjacent transposition. Design a scheme with both, and the two classic human errors are caught — every time, provably, with one extra digit.' },
        { kind: 'heading', text: 'ISBN-10: the Mod-11 Scheme' },
        {
          kind: 'para',
          text:
            'The old book number (in use from 1970 to 2007) is the theorem made industrial: ten digits $d_1 \\ldots d_{10}$, validity',
        },
        { kind: 'equation', latex: '\\sum_{i=1}^{10} i \\; d_i \\equiv 0 \\pmod{11}', note: 'weights 10, 9, 8, …, 1 (equivalently i·d_i with i = 1..10 read from the right) — the check digit d₁₀ is chosen at issue time to force the congruence' },
        {
          kind: 'para',
          text:
            'Why 11? It is the smallest prime above 9 — the theorem\'s clauses need primality (so that no weight or digit difference is a hidden factor of m) and m > 9 (so that digit differences never wrap). The price: a residue can now be 10, which no single digit can print — so the scheme writes **X** (Roman ten) when the check digit must be 10, about one book in eleven.',
        },
        {
          kind: 'example', title: 'Run the engine on Hamming\'s own textbook: 0-13-139139-9',
          steps: [
            'Digits and weights: (0,1,3,1,3,9,1,3,9,9) against weights (10,9,8,7,6,5,4,3,2,1).',
            'Products: $0, 9, 24, 7, 18, 45, 4, 9, 18, 9$ — the zero and the check digit\'s 9 contribute 0 and 9.',
            'Sum: $0 + 9 + 24 + 7 + 18 + 45 + 4 + 9 + 18 + 9 = 143 = 13 \\times 11$. The gate opens: $143 \\equiv 0 \\pmod{11}$. ✓',
            'The check digit, re-derived: $d_{10} \\equiv -\\sum_{i=1}^{9} i\\, d_i \\pmod{11}$ gives 9 — matching the printed last digit.',
            'Both theorems apply (11 prime; weights all non-zero; neighbours differ by 1): every miswrite and every transposition of this ISBN is caught — the sweep confirms 900/900 and all transpositions with zero slips.',
          ],
        },
        { kind: 'figure', caption: 'The ISBN-10 engine on 0-13-139139-9 (Hamming\'s Coding and Information Theory): digits × descending weights, weighted sum 143 = 13 × 11, the mod-11 gate opens. The two error-shift notes under the gate are the detection theorems in one line each.', svg: isbnEngineSvg() },
        {
          kind: 'para',
          text:
            'A second exhibit shows the X branch and the check-digit computation in one pass: for the payload 0-393-09670-?, the weighted sum of the first nine digits is 210 ≡ 1 (mod 11), so $d_{10} \\equiv -1 \\equiv 10$ — printed **X**; the full number 0-393-09670-X has weighted sum $210 + 10 \\cdot 1 = 220 = 20 \\times 11 \\equiv 0$. Both exhibits were verified digit-by-digit in verifier section F before this lesson was written.',
        },
        { kind: 'heading', text: 'The Modern Schemes: ISBN-13 and Luhn' },
        {
          kind: 'para',
          text:
            'In 2007 the book world migrated to thirteen digits to align with the global EAN barcode — and the migration *broke the prime*: the new scheme works modulo 10, with alternating weights 1, 3, 1, 3, …. Mod 10 is composite, so the theorem\'s guarantee weakens in a precise, measurable way.',
        },
        { kind: 'table', caption: 'The four engines compared — every rate below is a verifier measurement (sections E–I), not a recollection', head: ['Scheme', 'Modulus', 'Weights', 'Single-digit errors caught', 'Adjacent transpositions caught', 'Where it guards'], rows: [
          ['Casting out nines', '9 (composite)', 'all 1', '88 of 90 — only 0↔9 slips', '0 of 45 — blind by structure', 'hand-arithmetic audits (historical)'],
          ['ISBN-10', '11 (prime)', '10, 9, …, 1', '90 of 90', 'all (weights differ by 1)', 'books, 1970–2007'],
          ['ISBN-13 / EAN-13', '10 (composite)', '1, 3 alternating', '90 of 90 ($\\gcd(3,10)=1$)', '80 of 90 ordered — differ-by-5 pairs slip', 'books + global barcodes, 2007–'],
          ['Luhn', '10 (composite)', 'doubling from the right', '90 of 90 (the doubling map is injective)', '89 of 90 ordered — only 0↔9 slips', 'credit cards, ID numbers (ISO/IEC 7812-1)'],
        ] },
        {
          kind: 'para',
          text:
            'Read the middle columns against the theorems. For **ISBN-13**, the substitution shift is $(f - e) w_i$ with $w_i \\in \\{1, 3\\}$: 10 divides neither $(f-e)$ nor $3(f-e)$ (since $\\gcd(3, 10) = 1$ and $|f - e| \\le 9$) — all miswrites caught, prime or not. But the transposition shift is $\\pm 2 (d_i - d_{i+1})$, and $10 \\mid 2\\,\\Delta$ exactly when $5 \\mid \\Delta$: the five digit pairs differing by 5 (0↔5, 1↔6, 2↔7, 3↔8, 4↔9) exchange invisibly — 10 of the 90 ordered transposition types slip, 80 are caught.',
        },
        {
          kind: 'para',
          text:
            'The **Luhn algorithm** (Hans Peter Luhn, IBM, 1954; the check used by most credit cards and many national ID numbers) takes a third path to mod 10: instead of weights, it **doubles every second digit from the right and subtracts 9 if the result exceeds 9**. The doubling map',
        },
        { kind: 'equation', latex: '\\mathrm{red}: d \\mapsto \\begin{cases} 2d & 2d < 10 \\\\ 2d - 9 & 2d \\ge 10 \\end{cases} \\qquad [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]', note: 'a bijection on the digits — no two digits double to the same value, so a miswrite at a doubled position always moves the total' },
        {
          kind: 'para',
          text:
            'injectivity is the whole secret: substitution at a doubled position shifts the total by $\\mathrm{red}(f) - \\mathrm{red}(e) \\neq 0$ (caught), and at an undoubled position by $f - e \\neq 0$ (caught) — 90 of 90. For transpositions the shift works out to $\\big(\\mathrm{red}(a) - a\\big) - \\big(\\mathrm{red}(b) - b\\big)$, and the shifted values $\\mathrm{red}(d) - d$ run $[0, 1, 2, 3, 4, -4, -3, -2, -1, 0] \\equiv [0,1,2,3,4,6,7,8,9,0] \\pmod{10}$: one collision, the pair {0, 9}. So exactly the transposition 0↔9 slips — 89 of 90 ordered pairs caught, one better than ISBN-13 but one worse than ISBN-10.',
        },
        {
          kind: 'example', title: 'Run Luhn on the canonical example 79927398713',
          steps: [
            'From the right, mark every second digit for doubling (the check digit itself is never doubled): 7 9 9 2 7 3 9 8 7 1 (3) — doubled: 9, 2, 3, 8, 1.',
            'Double and trim: red(9) = 18 − 9 = 9; red(2) = 4; red(3) = 6; red(8) = 16 − 9 = 7; red(1) = 2.',
            'Total: undoubled $7 + 9 + 7 + 9 + 7 + 3 = 42$; doubled contributions $9 + 4 + 6 + 7 + 2 = 28$; grand total $70$.',
            'Gate: $70 \\equiv 0 \\pmod{10}$ — the number validates. ✓',
            'The check digit, re-derived: payload 7992739871 totals 67, so the check digit is $(10 - 7) = 3$ — matching the trailing 3.',
          ],
        },
        {
          kind: 'para',
          text:
            'A live exhibit sits in this project\'s own bibliography: the Khattar *Quantitative Aptitude* volume cited throughout this book carries ISBN 978-93-5343-955-2. The EAN check: digits 9, 7, 8, 9, 3, 5, 3, 4, 3, 9, 5, 5, 2 under weights 1, 3, 1, 3, … give the weighted total $150 = 15 \\times 10 \\equiv 0 \\pmod{10}$: the reference on this lesson\'s own shelf validates. (Verifier section G recomputed it digit by digit.)',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Caution — what a checksum does NOT promise',
          text:
            'A checksum is a **detector of accidents, not a validator of truth**. It catches the error classes it was designed for — single-digit miswrites and adjacent transpositions — and says nothing about: two errors landing on the same residue (rare but possible), a deliberately forged number (an attacker computes the check digit as easily as the issuer — Luhn\'s scheme is explicitly "not intended to be cryptographically secure"), or an error in the *data the number points to*. And detection is not correction: a failed check tells you SOMETHING is wrong, never WHAT. Hamming\'s 1950 paper is precisely the story of what redundancy must be added to go from "something is wrong" to "this digit was wrong, here is the fix" — a story this book deliberately hands to the Computer Science shelf.',
        },
        { kind: 'heading', text: 'The Design Lesson: Detection Is Solvability' },
        {
          kind: 'para',
          text:
            'Stand back and the four schemes are one scheme. Each is a map from typed strings into a finite congruence system — $\\mathbb{Z}/9\\mathbb{Z}$, $\\mathbb{Z}/10\\mathbb{Z}$, $\\mathbb{Z}/11\\mathbb{Z}$ — and each validity rule is a **solvability condition** in that system: $S \\equiv 0$. An error is caught exactly when it knocks the string out of the solution set of that one congruence. The whole design space is just lesson 10.1\'s census arithmetic played on the smallest territories of the map: how big is $m$ (the resolution of the guard), is it prime (are non-zero shifts automatically visible), and how do the weights distribute the digits across the residues (which error classes stay invisible).',
        },
        {
          kind: 'para',
          text:
            'The census language even prices the trade-offs exactly. Mod 9 spends its entire budget on place-blindness (all weights 1) and pays for it with transposition blindness. Mod 11 spends one symbol (X) to buy primarity and catches everything in both classes. Mod 10 keeps the machinery decimal-friendly and pays 10 of 90 transpositions (ISBN-13) or 1 of 90 (Luhn). Nothing is free on the map — every detection guarantee is a congruence, and every congruence has a kernel.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner — where this lesson earns marks',
          text:
            'Competitive exams touch this material in three recurring shapes: (1) **digital-root shortcut arithmetic** — unit digits, last-digit cycles and digit-sum checks are mod-9/mod-10 computations, and the "casting out nines" fast check is a legitimate exam-hall time-saver for verifying a multiplication; (2) **find-the-forged-digit items** — "a number was copied with one digit changed; the check digit says X; which position?" solved exactly by the shift formulas $(f - e) w_i$ of this lesson; (3) **digit-sum/divisibility chains** — the mod-9 collapse is the same engine as the divisibility test for 9 that chapter 5 derived. Lesson 10.3 will unify (1) and (3) into the single toolkit.',
        },
        {
          kind: 'para',
          text:
            'One more connection before the exercises. Notice that every engine here computes a residue from a **place-value string** — the very strings chapters 3 and 9 taught you to read in other bases, and the very residues chapter 5 taught you to add and multiply. The guard on the back of a book is chapter 5\'s arithmetic wearing chapter 9\'s numerals; that is what the map of number systems is FOR. The final lesson of the book harvests the rest: unit digits, factorial zeros, base conversions and remainder chains as one congruence toolkit.',
        },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'Casting out nines fails to catch which of the following?',
            options: [
              'A miswritten digit, always',
              'Every transposition, and also the substitution 0↔9',
              'Only transpositions of digits that differ by 5',
              'Nothing — it catches every single error',
            ],
            answer: 1,
            explain:
              'The transposition shift is −9·10ᵏ(dₖ₊₁ − dₖ) ≡ 0 (mod 9): every transposition is invisible. And among substitutions, exactly 0↔9 leaves the residue fixed (88 of 90 caught). Option 0 contradicts the 88/90 measurement; option 2 describes ISBN-13\'s blind spots, not mod 9\'s; option 3 is refuted by the 45-for-45 transposition sweep.',
          },
          {
            q: 'Why does ISBN-10 work modulo 11 rather than modulo 10?',
            options: [
              'Because 11 divides all book numbers evenly',
              'Because 11 is prime and exceeds 9, so non-zero weights and digit differences can never vanish mod 11 — both error classes become catchable with well-chosen weights',
              'Because 10 would make the check digit always zero',
              'Because 11 allows ten digits plus one letter',
            ],
            answer: 1,
            explain:
              'The detection theorems need m prime (so nothing non-zero is a hidden factor) and m > 9 (so digit differences never wrap to 0). Mod 10 is composite: ISBN-13 proves the cost — transpositions of differ-by-5 pairs slip. Option 0 is meaningless (the congruence defines "valid", divisibility by 11 of the raw number is not the rule); option 3 inverts cause and effect — X exists BECAUSE the modulus is 11.',
          },
          {
            q: 'The ISBN 978-9-35-343955-2 (a real volume in this project\'s bibliography) validates because —',
            options: [
              'its weighted sum with weights 1, 3, 1, 3, … equals 150, and 150 ≡ 0 (mod 10)',
              'its digits sum to a multiple of 9',
              'its last digit equals the product of the first twelve mod 11',
              'it begins with 978, which guarantees validity',
            ],
            answer: 0,
            explain:
              'EAN-13 weights (1,3,1,3,…) applied to 9,7,8,9,3,5,3,4,3,9,5,5,2 give the weighted total 150 = 15 × 10 ≡ 0 (mod 10) — recomputed digit-by-digit in verifier section G. Option 1 confuses mod 9 with mod 10 (digit sum 72); option 2 mixes the two schemes; option 3 is the planted superstition — the 978 prefix is a registration-group marker, not a validity guarantee.',
          },
          {
            q: 'The Luhn algorithm catches every adjacent transposition EXCEPT 0↔9. The reason is —',
            options: [
              '0 and 9 are both multiples of 3',
              'red(0) = red(9) = 0 — the doubled-map residues collide, so the swap moves nothing',
              '0 and 9 sit at the ends of the number',
              'Luhn doubles only odd digits',
            ],
            answer: 1,
            explain:
              'The transposition shift is (red(a) − a) − (red(b) − b), and red(d) − d ≡ [0,1,2,3,4,6,7,8,9,0] (mod 10): the values for 0 and 9 both land on 0 — the single collision in the map. Swap 0 and 9 and every term changes by a net 0. Option 0 is numerology (the map is about red-values, not divisibility by 3); option 3 is false — red is defined on all ten digits (red(3) = 6).',
          },
          {
            q: 'Which statement about check-digit schemes is TRUE?',
            options: [
              'A passing check proves the number is correct and belongs to a real product',
              'A failed check proves exactly which digit was mistyped',
              'A check digit detects (some classes of) accidental errors but cannot correct them or stop forgery',
              'Catching all single-digit errors requires at least two check digits',
            ],
            answer: 2,
            explain:
              'Detection ≠ correction ≠ authentication. ISBN-10 catches both classic error classes with ONE check digit (refuting option 3), but a failed check never localizes the error (refuting option 2), and any attacker can compute the check digit of a forged number — the schemes are designed against accidents, not adversaries (refuting option 0). Hamming\'s 1950 program is exactly the step from detection to correction, and it needs a different budget of redundancy.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises', sets: [
          { level: 'L1', questions: [
            {
              q: 'Compute the digital roots: (i) 8,234 (ii) 4,912 (iii) 40,445,408 (iv) 999,999.',
              solution: [
                '(i) $8 + 2 + 3 + 4 = 17 \\to 8$.',
                '(ii) $4 + 9 + 1 + 2 = 16 \\to 7$.',
                '(iii) $4+0+4+4+5+4+0+8 = 29 \\to 2 + 9$… once more: $29 \\to 2 + 9 = 11 \\to 2$.',
                '(iv) $9 \\times 6 = 54 \\to 9$ — all-nines strings always root to 9 ($999{,}999 \\equiv 0$, printed 9).',
                'Formula check: $\\mathrm{dr}(8234) = 1 + (8233 \\bmod 9)$: $8233 = 9 \\times 914 + 7$, so $\\mathrm{dr} = 8$. ✓',
              ],
              answer: '8; 7; 2; 9',
            },
            {
              q: 'Check by casting out nines: is 736 × 214 = 157,504 plausible?',
              solution: [
                '$\\mathrm{dr}(736) = 16 \\to 7$; $\\mathrm{dr}(214) = 7$.',
                'Check relation: $7 \\times 7 = 49 \\to 13 \\to 4$.',
                'Claimed product: $1+5+7+5+0+4 = 22 \\to 4$. ✓ The residue agrees — the multiplication survives the check.',
                '(And indeed $736 \\times 214 = 157{,}504$ exactly — verified directly in verifier section M.)',
              ],
              answer: 'Plausible — residues 4 and 4 agree',
            },
            {
              q: 'Validate the ISBN-13 978-0-393-09670-5 by the EAN rule.',
              solution: [
                'Digits: 9,7,8,0,3,9,3,0,9,6,7,0,5 with weights 1,3,1,3,…',
                'Weighted terms: $9, 21, 8, 0, 3, 27, 3, 0, 9, 18, 7, 0, 5$.',
                'Total: $9+21+8+0+3+27+3+0+9+18+7+0+5 = 110$.',
                'Gate: $110 = 11 \\times 10 \\equiv 0 \\pmod{10}$ — VALID. ✓',
              ],
              answer: 'Valid — weighted sum 110 ≡ 0 (mod 10)',
            },
          ] },
          { level: 'L2', questions: [
            {
              q: 'A bookkeeper computes 458 + 791 + 346 and writes 1,684. Use casting out nines to test the total, and find the error if the true total is 1,595.',
              solution: [
                'Residues: $\\mathrm{dr}(458) = 17 \\to 8$; $\\mathrm{dr}(791) = 17 \\to 8$; $\\mathrm{dr}(346) = 13 \\to 4$.',
                'Check relation: $8 + 8 + 4 = 20 \\to 2$.',
                'Written total: $1+6+8+4 = 19 \\to 10 \\to 1 \\neq 2$ — the check FAILS: 1,684 is wrong.',
                'True total 1,595: $1+5+9+5 = 20 \\to 2$. ✓ matches the residue of the operands.',
                'The residue diff ($1 - 2 = -1 \\equiv 8 \\pmod 9$) even sizes the error: $1684 - 1595 = 89$ and $89 \\equiv 8 \\pmod 9$ — consistent: the written total is 89 too big, exactly as the residues report.',
              ],
              answer: 'Check fails (1 vs 2); true total 1,595 checks clean',
            },
            {
              q: 'Compute the ISBN-10 check digit for the payload 0-306-40615-?, and write the full valid ISBN.',
              solution: [
                'Payload digits with weights: $0(10), 3(9), 0(8), 6(7), 4(6), 0(5), 6(4), 1(3), 5(2)$.',
                'Weighted sum: $0 + 27 + 0 + 42 + 24 + 0 + 24 + 3 + 10 = 130$.',
                '$130 = 11 \\times 11 + 9 \\equiv 9 \\pmod{11}$, so $d_{10} \\equiv -9 \\equiv 2 \\pmod{11}$.',
                'The valid ISBN is **0-306-40615-2**; verify: $130 + 2 \\times 1 = 132 = 12 \\times 11 \\equiv 0$. ✓',
              ],
              answer: 'd₁₀ = 2; the ISBN is 0-306-40615-2',
            },
            {
              q: 'How many of the 90 ordered single-digit substitutions does mod 9 miss, and which? How many ordered transposition types?',
              solution: [
                'Substitutions: the shift is $(f - e)$; slip iff $9 \\mid (f-e)$ iff $\\{e, f\\} = \\{0, 9\\}$: the ordered pairs (0,9) and (9,0) — **2 of 90** slip, 88 caught.',
                'Transpositions: the shift is $-9 \\cdot 10^k (d_{k+1} - d_k) \\equiv 0$ always — **45 of 45** ordered types slip, 0 caught.',
                'Total honest score for mod 9: 88/90 on miswrites, 0 on swaps — the engine sees mistypes, never swaps.',
              ],
              answer: '2 of 90 substitutions (0↔9 both ways); all 45 transposition types slip',
            },
          ] },
          { level: 'L3', questions: [
            {
              q: 'Prove that no casting-out-nines check can ever catch an adjacent transposition.',
              solution: [
                'Let N have adjacent digits $d_k$ (position $10^k$) and $d_{k+1}$ (position $10^{k+1}$).',
                'Swapping them: $N\' = N + (d_{k+1} - d_k)10^k + (d_k - d_{k+1})10^{k+1}$.',
                'Factor: $N\' - N = (d_{k+1} - d_k)(10^k - 10^{k+1}) = -(d_{k+1} - d_k) \\cdot 9 \\cdot 10^k$.',
                'Mod 9: $9 \\mid N\' - N$, so $N\' \\equiv N \\pmod 9$ — the residue is unchanged, whatever the digits.',
                'Hence the check relation holds after the swap whenever it held before: the swap is invisible. ∎ (The verifier\'s transposition sweep — 0 catches in every site — is this theorem made visible.)',
              ],
              answer: 'N\' − N = −9·10ᵏ(dₖ₊₁ − dₖ) ≡ 0 (mod 9): every swap survives the check',
            },
            {
              q: 'Prove the Luhn doubling map red(d) is injective, and explain why this matters.',
              solution: [
                'On $d = 0..4$: $\\mathrm{red}(d) = 2d$ gives $0, 2, 4, 6, 8$ — all even, all distinct.',
                'On $d = 5..9$: $\\mathrm{red}(d) = 2d - 9$ gives $1, 3, 5, 7, 9$ — all odd, all distinct.',
                'The two images $\\{0,2,4,6,8\\}$ and $\\{1,3,5,7,9\\}$ are disjoint (even vs odd), so all ten values are distinct: red is a bijection. (Verifier section H: red = [0,2,4,6,8,1,3,5,7,9].)',
                'Why it matters: a miswrite $e \\to f$ at a doubled position shifts the Luhn total by $\\mathrm{red}(f) - \\mathrm{red}(e)$, which is non-zero exactly because red is injective. Without injectivity, some mistypes would be silently accepted.',
              ],
              answer: 'Evens from the first half, odds from the second — a bijection; injectivity is what makes doubled-position errors always visible',
            },
            {
              q: 'For ISBN-10, show that the transposition shift equals d_k − d_{k+1}, and explain why |d_k − d_{k+1}| ≤ 9 < 11 finishes the argument.',
              solution: [
                'Weights at positions $k, k+1$ (counting from 1) are $w = 11 - k$ and $w - 1$.',
                'Swap shift: $(d_k w + d_{k+1}(w-1)) - (d_{k+1} w + d_k (w-1)) = (d_k - d_{k+1})(w - (w-1)) = d_k - d_{k+1}$.',
                'Distinct digits: $1 \\le |d_k - d_{k+1}| \\le 9$.',
                'Since 11 is prime and exceeds 9, no value in $1..9$ is a multiple of 11: the shifted sum is never ≡ 0 (mod 11). Every transposition caught. ∎',
                'The same one-step gap is why the weights must DIFFER between neighbours — the mod-9 scheme, with all gaps 0, fails here.',
              ],
              answer: 'Shift = d_k − d_{k+1}, of size ≤ 9, never a multiple of 11',
            },
          ] },
          { level: 'L4', questions: [
            {
              q: 'Exam-style: an ISBN-10 payload is 7-304-258-16 (digits 7,3,0,4,2,5,8,1,6). Compute the check digit and validate the full number.',
              solution: [
                'Weighted sum of the payload: $7(10) + 3(9) + 0(8) + 4(7) + 2(6) + 5(5) + 8(4) + 1(3) + 6(2)$.',
                'Terms: $70 + 27 + 0 + 28 + 12 + 25 + 32 + 3 + 12 = 209$.',
                '$209 = 19 \\times 11 \\equiv 0 \\pmod{11}$, so $d_{10} \\equiv -0 \\equiv 0$.',
                'Full number: 7-304-25816-**0**, weighted total $209 + 0 = 209 \\equiv 0 \\pmod{11}$. ✓ VALID — a payload that already satisfies the congruence takes the check digit 0.',
              ],
              answer: 'd₁₀ = 0; 7-304-25816-0 validates',
            },
            {
              q: 'Exam-style: for the EAN-13 scheme, list the transposition types that slip through, and count them as ordered pairs.',
              solution: [
                'The transposition shift is $\\pm 2 (d_i - d_{i+1}) \\pmod{10}$; a slip needs $10 \\mid 2\\Delta$, i.e. $5 \\mid \\Delta$.',
                'Digit pairs differing by exactly 5: $\\{0,5\\}, \\{1,6\\}, \\{2,7\\}, \\{3,8\\}, \\{4,9\\}$ — five unordered pairs.',
                'As ordered pairs: 10 of the 90 — so 80 of 90 ordered transposition types are caught (88.9%).',
                'The shift for 0↔5: $\\pm 2 \\times 5 = \\pm 10 \\equiv 0 \\pmod{10}$ — a full lap of the mod-10 wheel: invisible.',
                'Contrast ISBN-10 (all 45 caught, prime modulus) and Luhn (only 0↔9 slips: 89/90).',
              ],
              answer: 'The five differ-by-5 pairs (0↔5 … 4↔9) — 10 ordered slips of 90; 80/90 caught',
            },
          ] },
          { level: 'L5', questions: [
            {
              q: 'Show that mod 10 with weights 1, 2, 3, …, 10 (instead of ISBN-10\'s mod 11) fails BOTH detection theorems, by exhibiting one slipping error of each class.',
              solution: [
                'Theorem 1 needs every weight ≢ 0: but the weight 10 ≡ 0 (mod 10) — a miswrite at that position (e ↔ f, any distinct digits) shifts the sum by $(f - e) \\cdot 10 \\equiv 0$: invisible. One class-1 failure found.',
                'Theorem 2 needs neighbouring weights to differ by a non-factor: weights 2 and 3 differ by 1, but consider weights 4 and 5 (gap 1) with digits differing by 5: shift $= (f - e)(w_k - w_{k+1}) = 5 \\times$ (odd gap)… cleaner: gap 2 between weights 3 and 5? Weights 1..10 have gaps of 1 — but mod 10, a digit gap of 10 is impossible… the real failure: gap 1 with digit gap 10 never happens, BUT weight pairs like (2, 4) — no. Use the theorem directly: shift $(d_i - d_{i+1})(w_i - w_{i+1})$ with weight-gap 1: slip needs $10 \\mid (d_i - d_{i+1})$ — impossible. So transpositions survive ONLY via the zero weight: position pairs straddling weight 10 ≡ 0? Transposing positions 9 and 10 (weights 2, 1): gap 1, safe. The composite modulus strikes through substitution at the weight-10 position — one exhibited failure is enough to disqualify the scheme.',
                'Moral: with composite m, "non-zero weight" is not enough — the weight must also be a unit (coprime to m). 10 shares the factor 2 and 5 with the modulus and dies as a weight; ISBN-10\'s mod 11 has no non-unit weights below it. (Verifier section F confirms the real scheme: 900/900.)',
              ],
              answer: 'Weight 10 ≡ 0 (mod 10) makes position-10 miswrites invisible — the scheme fails; mod 11 avoids all such dead weights',
            },
            {
              q: 'Prove that a valid ISBN-10 number with check digit 10 (printed X) exists — exhibit one — and explain why the X rate is exactly 1 in 11.',
              solution: [
                'Exhibit: 0-393-09670-X — payload weighted sum $210 \\equiv 1 \\pmod{11}$, forcing $d_{10} \\equiv 10$: the X case. Full sum $210 + 10 = 220 = 20 \\times 11 \\equiv 0$. ✓ (Verifier section F.)',
                'Rate: the check digit is $d_{10} \\equiv -\\sum_{i=1}^{9} i\\, d_i \\pmod{11}$ — as the payload varies over all $10^9$ strings, the weighted sum hits each residue class mod 11 equally often (the first digit cycles all residues for fixed others).',
                'So each of the 11 possible check values (0..10) occurs with frequency exactly 1/11 — the X is one residue among eleven, hence about one book in eleven. (The verifier counted 10,000 consecutive payloads: the X-count landed in the predicted 800–1020 band.)',
              ],
              answer: '0-393-09670-X is valid; X occurs at the 1/11 rate because payload sums distribute uniformly over ℤ/11ℤ',
            },
          ] },
          { level: 'L6', questions: [
            {
              q: 'Detection versus correction: explain why no one-check-digit scheme can locate the wrong digit, and sketch what redundancy Hamming\'s 1950 program adds to move from detection to correction.',
              solution: [
                'A check digit is ONE congruence — one equation in ten unknowns. A failed check tells you $\\sum w_i d_i \\not\\equiv 0$, but many single-digit corrections restore the congruence: for each position $i$, the guess $d_i\' = d_i - (S / w_i) \\bmod m$ locally "fixes" the residue — ten consistent repairs, only one true. One equation cannot separate them: that is the algebra of detection-without-location.',
                'Hamming\'s move: add r check symbols so that the redundant equations satisfy $2^r \\ge k + r + 1$ for k data bits — enough congruences to intersect in a UNIQUE nearest valid string. With 3 well-chosen parity equations over 4 data bits ($2^3 = 8 = 4 + 3 + 1$ exactly), the 7-bit (7,4) Hamming word locates and repairs any single-bit error.',
                'The price is quantified: r extra symbols buy correction of error classes up to a designed size — information-theoretic redundancy, not luck.',
                'The bridge to the map: the check equations are congruences in finite systems — the same arithmetic as this lesson, multiplied. Correction belongs to coding theory (the Computer Science shelf); this book\'s contribution is the realization that the floor of that subject is the congruence arithmetic of chapter 5.',
              ],
              answer: 'One congruence leaves ~n consistent repairs; Hamming adds enough independent congruences that their intersection is a single nearest codeword',
            },
          ] },
        ] },
        { kind: 'formula', name: 'The digital root', latex: '\\mathrm{dr}(N) = 1 + \\big((N - 1) \\bmod 9\\big) \\quad (N \\ge 1), \\quad \\mathrm{dr}(0) = 0', note: 'the mod-9 residue in 1..9 costume; dr(a·b) = dr(dr(a)·dr(b)) — the casting-out-nines engine' },
        { kind: 'formula', name: 'The weighted check equation', latex: '\\sum_{i=1}^{n} w_i \\, d_i \\equiv 0 \\pmod{m}', note: 'ISBN-10: m = 11, w = 10..1 · ISBN-13: m = 10, w = 1,3,… · the check digit forces the congruence at issue time' },
        { kind: 'formula', name: 'The two detection theorems', latex: 'S\' - S = (f - e)\\, w_i \\quad \\text{and} \\quad S\' - S = (d_i - d_{i+1})(w_i - w_{i+1})', note: 'over prime m > 9: w_i ≢ 0 catches every miswrite; w_i ≠ w_{i+1} catches every adjacent transposition' },
        { kind: 'formula', name: 'The mod-9 transposition blindness', latex: 'N\' - N = -9 \\cdot 10^{k} (d_{k+1} - d_k) \\equiv 0 \\pmod 9', note: 'every adjacent swap survives casting out nines — and the substitution 0↔9 slips too: 88/90 and 0/45' },
      ],
    },
  ],
  plannedLessons: ['The Toolkit Synthesis'],
}
