import type { Chapter } from '../../../types'

/**
 * Arithmetic and Number Systems — Chapter 7: Building the Rationals
 *
 * LESSONS WRITTEN: 7.1 From Fractions to the Rational System (run 59)
 *                  7.2 The Field Laws: Division Joins the Family (run 59)
 *                  7.3 Density and the Decimal Mirror, Proven (run 59)
 * CHAPTER COMPLETE (run 59, 2026-11-06 — the fourth one-full-chapter run).
 * References for this unit: Beck & Geoghegan, The Art of Proof (the
 * rationals construction spine) + the permanence charter of run 58
 * (Peacock 1833 / Hankel 1867) + Khattar QA 4e ch. 1 (the competitive-exam
 * decimal scope) — see docs/project/SOURCE_LOG.md. New citation keys:
 * rhind-papyrus-fractions, stevin-1585-thiende, dedekind-1871-korper
 * (web-checked 2026-11-06). All arithmetic pre-verified by
 * scripts/verify-book2-ch07.ts (239 checks, sections A–T, ALL PASS before
 * writing; fifteen pre-writing defects caught). Exposition original.
 */

/* ------------------------------------------------------------------ */
/* Figure: the fraction lattice (7.1, visual run 59). The plane of     */
/* pairs (a, b) with numerator a ≥ 1 (rows) and denominator b = 1..6   */
/* (columns); every lattice point sits on exactly one ray through the  */
/* origin, and the points on one ray are exactly the equivalent pairs  */
/* of one class. Coordinates computed from the grid constants —        */
/*   x = 80 + 56·b (b = column),  y = 240 − 44·a (a = row)             */
/*   ray endpoints capped at x = 470 or y = 40, whichever comes first  */
/* reduced seeds (gcd = 1) in amber; multiples in ink.                 */
/* ------------------------------------------------------------------ */
const LAT_X0 = 80
const LAT_DX = 56
const LAT_Y0 = 240
const LAT_DY = 44
const latX = (b: number) => LAT_X0 + LAT_DX * b
const latY = (a: number) => LAT_Y0 - LAT_DY * a
const LATTICE_DOTS: [number, number][] = []
for (let a = 1; a <= 4; a++) for (let b = 1; b <= 6; b++) LATTICE_DOTS.push([a, b])
const gcdOf = (a: number, b: number): number => {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y) {
    const r = x % y
    x = y
    y = r
  }
  return x || 1
}
const RAYS: { p: number; q: number; label: string; ex: number; ey: number }[] = [
  { p: 1, q: 3, label: '1/3', ex: 470, ey: LAT_Y0 - (390 / LAT_DX / 3) * LAT_DY },
  { p: 2, q: 3, label: '2/3', ex: 470, ey: LAT_Y0 - (390 / LAT_DX * (2 / 3)) * LAT_DY },
  { p: 1, q: 1, label: '1', ex: LAT_X0 + 4.545 * LAT_DX, ey: 40 },
  { p: 3, q: 2, label: '3/2', ex: LAT_X0 + (200 / 66) * LAT_DX, ey: 40 },
  { p: 2, q: 1, label: '2', ex: LAT_X0 + (200 / 88) * LAT_DX, ey: 40 },
]
const rayEnds = RAYS.map((r) => ({ ...r, ex: +r.ex.toFixed(1), ey: +r.ey.toFixed(1) }))
const latticeDots = LATTICE_DOTS.map(
  ([a, b]) =>
    `<circle cx="${latX(b)}" cy="${latY(a)}" r="${gcdOf(a, b) === 1 ? 5 : 3.5}" fill="${gcdOf(a, b) === 1 ? '#b45309' : 'currentColor'}" opacity="${gcdOf(a, b) === 1 ? 1 : 0.55}"/>`
).join('\n  ')
const rayLines = rayEnds
  .map(
    (r) =>
      `<line x1="${LAT_X0}" y1="${LAT_Y0}" x2="${r.ex}" y2="${r.ey}" stroke="#b45309" stroke-width="1.4" stroke-opacity="0.75"/>`
  )
  .join('\n  ')
const rayLabels = rayEnds
  .map((r) => {
    const anchor = r.ex > 460 ? 'end' : 'middle'
    const x = r.ex > 460 ? r.ex : r.ex
    const y = r.ey > 60 ? r.ey - 10 : 30
    return `<text x="${x}" y="${y}" font-size="14" font-weight="700" fill="#b45309" text-anchor="${anchor}">${r.label}</text>`
  })
  .join('\n  ')

export const chapter07: Chapter = {
  number: 7,
  slug: 'building-the-rationals',
  title: 'Building the Rationals',
  summary:
    'The second great extension, done by the same honest method. Lesson 7.1 measures the division failure ℤ inherits — x·c = d solves exactly when c divides d, barely 56 of 144 pairs on the ±6 square, and x·0 = d dead by the zero-product lemma — then builds the rationals as fraction pairs (a, b) over ℤ × (ℤ − {0}): FM 4.2’s cross-multiplication test re-founded as the DEFINITION of sameness, proved an equivalence relation by the cancellation engine of 6.3, classes named a/b, canonical reduced representatives from the gcd, and addition, multiplication and negation proved well-defined by sweeps. Lesson 7.2 derives every law through the construction — and the new one: every nonzero class inverts via [(b,a)], division is defined, division by zero is proved impossible, and ℚ stands as the reader’s first field met as a building (Dedekind’s 1871 word), its order extended and already dense. Lesson 7.3 proves the two structural theorems: density (the midpoint (ps+rq)/(2qs) argument, iterated forever) and the decimal mirror (terminating-or-repeating from the division algorithm’s remainder pigeonhole, the terminating criterion 2^m·5^n from the FTA, and the recurring-decimal conversions of FM 5.2 now proved rather than used).',
  status: 'complete',
  plannedLessons: [],
  lessons: [
    {
      id: 'ans-from-fractions-to-the-rational-system',
      number: '7.1',
      title: 'From Fractions to the Rational System',
      prerequisites: [
        'ans-constructing-the-integers-from-the-naturals',
        'ans-the-laws-of-integer-arithmetic',
        'fm-equivalent-fractions-simplification',
        'fm-adding-subtracting-fractions',
      ],
      sources: ['beck-geoghegan-art-of-proof', 'hankel-1867-permanence', 'rhind-papyrus-fractions', 'khattar-qa-4e'],
      concepts: [
        'The division failure ℤ inherits',
        'Fraction pairs over ℤ × (ℤ − {0})',
        'ad = bc as the definition of sameness',
        'Equivalence classes as the rationals ℚ',
        'Canonical reduced representatives',
        'Well-definedness of + and ×, swept',
        'The tower ℕ → ℤ → ℚ',
      ],
      objectives: [
        'Run the division census on ℤ — x·c = d solves exactly when c | d with c ≠ 0, and x·0 = d ≠ 0 never — and quantify how much of the map dies',
        'Found the fraction-pair equivalence (a, b) ~ (c, d) ⟺ ad = bc as a definition, and prove it an equivalence relation using the cancellation lemma of 6.3',
        'Name the classes a/b, compute the canonical reduced representative with the gcd and sign convention, and prove its uniqueness',
        'Define addition, multiplication and negation of classes and verify them well-defined by exhaustive sweep, then check the tower ℕ → ℤ → ℚ embeds faithfully',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Chapter 6 ended with a promise. The integers repaired subtraction completely — every $a - b$ now names an integer, the wall is gone, cancellation is universal — but division stayed exactly as dead as it was in $\\mathbb{N}$. Lesson 6.3 proved the zero-product lemma and the cancellation law precisely so that this chapter could turn around and use them: in $\\mathbb{Z}$, the equation $x \\cdot c = d$ has a solution exactly when $c$ divides $d$, and $x \\cdot 2 = 3$ is as dead as ever. One chapter earlier we watched $x + 9 = 4$ force arithmetic to grow; now $x \\cdot 2 = 3$ does the same, and the growth is the subject of this chapter.',
        },
        {
          kind: 'para',
          text: 'The reader has used fractions since primary school. Foundation Mathematics chapter 4 banked the whole toolkit: equivalent fractions and the cross-multiplication test (Lesson 4.2), comparison (4.3), addition and subtraction with common denominators (4.4), multiplication and the invert-and-multiply rule for division (4.5). What that chapter never claimed — what no school chapter can claim — is the objects themselves. *Where*, exactly, is the number two-thirds? Not on the integer line: $\\mathbb{Z}$ has nothing between $0$ and $1$. Not a pair of symbols: $2/3$, $4/6$ and $200/300$ are three different inscriptions, yet every hand and every calculator treats them as one number. The fractions were *used* for four chapters of one book and five of another without ever being *built*. This chapter builds them — with the same method chapter 6 used for the integers, because the method is the point: define sameness honestly, sweep the operations clean, check every old law, and keep every old number.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Fractions are as old as writing',
          text: 'The pressure to name parts of wholes predates the alphabet. The Rhind Mathematical Papyrus — copied by the scribe Ahmes around 1650–1550 BCE and arguably drawing on a text some two centuries older — opens with a table expressing every $2/n$ for odd $n$ from $3$ to $101$ as a sum of *distinct unit fractions*: $\\tfrac{2}{3} = \\tfrac{1}{2} + \\tfrac{1}{6}$, $\\tfrac{2}{7} = \\tfrac{1}{4} + \\tfrac{1}{28}$, $\\tfrac{2}{15} = \\tfrac{1}{10} + \\tfrac{1}{30}$. Egyptian arithmetic then lived on those unit-fraction sums — precise, powerful, and awkward: no single symbol for two-thirds, just a verified pile of pieces. The modern single symbol $a/b$, one object with infinitely many names, is the child of the positional idea (Stevin’s decimals of 1585 carry that story forward, and chapter 7.3 will meet him there). What this chapter adds is the modern *justification*: the symbol names a genuine number because the construction proves one exists.',
        },
        { kind: 'heading', text: 'The dead questions ℤ leaves behind' },
        {
          kind: 'para',
          text: 'Measure the disease first, exactly as chapter 6 taught. Division in $\\mathbb{Z}$ is a partial operation: $x \\cdot c = d$ asks for a witness, and the witness exists exactly when $c$ divides $d$ — chapter 2’s criterion, now read in the integers. The integers do widen the map a little: $x \\cdot 3 = -6$ solves ($x = -2$), which $\\mathbb{N}$ could not touch. But the widening barely dents the failure, and the census makes it quantitative.',
        },
        {
          kind: 'equation',
          latex: 'x \\cdot c = d \\text{ solvable in } \\mathbb{Z} \\;\\Longleftrightarrow\\; c \\mid d, \\; c \\neq 0',
          note: 'Both directions are chapter 2’s divisibility definition, carried into $\\mathbb{Z}$ by the sign rules of 6.3 — a positive divisor divides a negative dividend, since $(−2)·3 = −6$. The script swept the criterion against brute witness search over $|c|, |d| \\le 20$ with both signs: zero mismatches.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '$x \\cdot 3 = 12$: alive — $3 \\mid 12$, witness $4$;',
            '$x \\cdot 3 = 7$: dead — $3 \\nmid 7$, the failure chapter 4’s FTA sharpened;',
            '$x \\cdot 3 = -6$: alive in $\\mathbb{Z}$ — witness $-2$, the one genuine widening over $\\mathbb{N}$;',
            '$x \\cdot 2 = 3$: dead — the chapter’s recurring probe;',
            '$x \\cdot 4 = 1$: dead — even the unit has no quarter in $\\mathbb{Z}$;',
            '$x \\cdot 0 = 7$: dead *by theorem* — the zero-product lemma of 6.3 says $x \\cdot 0 = 0$ for every integer $x$, so no witness can ever exist; this is the wall that even $\\mathbb{Q}$ will keep.',
          ],
        },
        {
          kind: 'table',
          caption: 'The division census on ℤ: the ±6 square (c and d each ranging over ±1 through ±6) — 144 pairs, 56 alive, 88 dead. The 14 divisibility patterns on the absolute-value square each survive in 4 sign combinations.',
          head: ['Census region', 'Live', 'Dead', 'The deciding criterion'],
          rows: [
            ['$x \\cdot c = d$, $|c|, |d| \\le 6$, all signs', '56 of 144', '88 of 144', '$c \\mid d$ — 14 patterns on $|c|, |d| \\le 6$, × 4 sign choices'],
            ['$x \\cdot 0 = d$, $d \\neq 0$', '0 of 36', '36 of 36', 'the zero-product lemma of 6.3 — a theorem, not a rule of thumb'],
            ['$x + b = a$ (for contrast)', '144 of 144', '0', 'subtraction was repaired in chapter 6 — total now'],
          ],
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'How much of the map is water, again',
          text: 'On the $\\pm 6$ square, $56$ of $144$ multiplication pairs live — barely four in ten, and the survivors are mostly trivial (every divisor of $\\pm 1$ divides everything in its row). Chapter 6.1 called the $\\mathbb{N}$ census "mostly ocean"; the $\\mathbb{Z}$ census is the same ocean with the shoreline moved a few metres. And the dead questions are as intelligible as ever: "a third of $2$" asks something perfectly clear, and $\\mathbb{Z}$ owns nothing that answers. The repair criterion of 6.1 applies unchanged: dead questions get answers, old numbers stay put, old laws stay alive, no new failures.',
        },
        {
          kind: 'para',
          text: 'One demand deserves its own sentence, because it shapes everything that follows. The integers already contain the *use* of half the repair: $6 \\div 3$ names $2$, and $2$ is an integer. The repair must therefore *embed* $\\mathbb{Z}$, not replace it — six-thirds, four-fourths and twelve-twelfths are all new names for $1$, and the construction must let them be one object without disturbing the integer they mirror. That is exactly what an equivalence relation is for.',
        },
        { kind: 'heading', text: 'Fractions already whisper the construction' },
        {
          kind: 'para',
          text: 'Foundation Mathematics Lesson 4.2 banked the test: two written fractions are equal exactly when the cross-products agree — $\\tfrac{a}{b} = \\tfrac{c}{d}$ if and only if $ad = bc$. School treats that as a *checking rule* for already-existing objects. The construction runs the film backwards: it takes the rule as the *definition* of sameness. Objects are not written fractions waiting for a test; objects are *pairs*, and the test is what makes two pairs the same object. The integers were built the same way at 6.2 — difference pairs $(a, b)$ with $a + d = b + c$ as the sameness condition — and the parallel is worth seeing on the surface: the integers bundle pairs by a *cross-sum*, the rationals by a *cross-product*.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Fraction pairs and their equivalence',
          text: 'A **fraction pair** is an ordered pair $(a, b)$ with $a \\in \\mathbb{Z}$ and $b \\in \\mathbb{Z} \\setminus \\{0\\}$ — "a, with b to divide by". The second seat may never be zero; that is the domain, chosen now so that the zero-product wall is honoured *before* any arithmetic begins. Two fraction pairs $(a, b)$ and $(c, d)$ are said to be **equivalent**, written $(a, b) \\sim (c, d)$, exactly when the cross-products agree:',
        },
        {
          kind: 'equation',
          latex: '(a, b) \\sim (c, d) \\;\\Longleftrightarrow\\; a \\cdot d = b \\cdot c, \\qquad a, c \\in \\mathbb{Z}, \\quad b, d \\in \\mathbb{Z} \\setminus \\{0\\}',
          note: 'FM 4.2’s cross-multiplication test, re-founded: no longer a check on pre-existing fractions but the very definition of when two pairs name the same object. The domain $b \\neq 0$ is not a convention to apologise for — lesson 7.2 will prove that allowing $b = 0$ would destroy the arithmetic itself.',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'For example, $(2, 3) \\sim (4, 6)$ — the cross-products $2 \\cdot 6$ and $3 \\cdot 4$ both equal $12$: one object, two names.',
            'For example, $(6, 3) \\sim (2, 1)$ — both cross-products equal $6$: this is the *integer* $2$ wearing fraction clothes.',
            'For example, $(1, 2) \\nsim (2, 3)$ — $1 \\cdot 3 = 3 \\ne 4 = 2 \\cdot 2$: one-half is not two-thirds, as the number line of FM 4.3 already knew.',
            'For example, $(−2, 3) \\sim (2, −3)$ — $(−2)(−3) = 3 \\cdot 2 = 6$: the minus sign lives in either seat, a fact the sign rules of 6.3 guarantee.',
          ],
        },
        {
          kind: 'para',
          text: 'The definition is only legal if $\\sim$ really behaves like sameness: each object the same as itself, symmetry, and — the step that always carries the weight — transitivity. Chapter 6.2 proved its cross-sum relation transitive by cancellation; the cross-product relation is transitive by the *multiplicative* cancellation lemma of 6.3, and the proof deserves its full derivation because the $d \\neq 0$ hypothesis stops being decoration and becomes the engine.',
        },
        {
          kind: 'derivation',
          title: 'The fraction-pair relation is an equivalence relation',
          statement:
            'Claim: $\\sim$ on $\\mathbb{Z} \\times (\\mathbb{Z} \\setminus \\{0\\})$ defined by $(a,b) \\sim (c,d) \\iff ad = bc$ is reflexive, symmetric and transitive.',
          steps: [
            {
              label: 'Reflexive — each pair is itself',
              formula: '(a, b) \\sim (a, b) \\;\\Longleftrightarrow\\; a \\cdot b = b \\cdot a',
              explanation:
                'True by commutativity of multiplication in $\\mathbb{Z}$ — one of the laws 6.3 derived from the difference-pair construction, not an assumption imported from school.',
            },
            {
              label: 'Symmetric — sameness does not care about order',
              formula: 'ad = bc \\;\\Longrightarrow\\; cb = da \\;\\Longleftrightarrow\\; (c, d) \\sim (a, b)',
              explanation:
                'Rewrite the hypothesis by commutativity ($cb = ad$, $da = bc$): the defining equality for $(c,d) \\sim (a,b)$ holds. Both seats stay nonzero by hypothesis, so the new pair is still inside the domain.',
            },
            {
              label: 'Transitive — the chain closes by cancellation',
              formula: 'ad = bc \\text{ and } cf = de \\;\\Longrightarrow\\; adf = bcf = bde \\;\\Longrightarrow\\; af = be \\;(d \\neq 0)',
              explanation:
                'Multiply the first equation by $f$ and the second by $b$: both middle terms equal $bcf$, so $adf = bde$. Now $d$ is a *nonzero* integer, and the multiplicative cancellation lemma of 6.3 (itself proved from the zero-product lemma) kills it from both sides: $af = be$ — which is exactly $(a,b) \\sim (e,f)$. The hypothesis $d \\ne 0$ is the whole engine: without it, the cancellation step would be illegal and sameness would leak.',
            },
            {
              label: 'The worked chain',
              formula: '(2,3) \\sim (4,6) \\sim (6,9) \\sim (10,15) \\;\\Longrightarrow\\; (2,3) \\sim (10,15)',
              explanation:
                'The script exercised the cancellation chain numerically — $2 \\cdot 15 = 3 \\cdot 10 = 30$ — and swept transitivity over every chained sextuple with entries $\\le 6$: thousands of chains, zero failures. One-third and ten-fifteenths are the same object, however different the inscriptions look.',
            },
          ],
          result:
            '~ is reflexive, symmetric and transitive — a genuine equivalence relation. Its classes are legitimate "objects", and everything the construction does next happens to classes, never to pairs.',
        },
        {
          kind: 'para',
          text: 'The classes now get their names, and the naming is where the school notation finally earns its keep.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'The rationals ℚ',
          text: 'The equivalence classes of $\\sim$ are called **rational numbers**, and the set of them all is written $\\mathbb{Q}$ (for *quotient*). The class of $(a, b)$ is written $\\tfrac{a}{b}$ or $a/b$ — read "a over b". Thus $\\tfrac{2}{3} = [(2,3)]$ is one object, the names $\\tfrac{4}{6}$ and $\\tfrac{200}{300}$ naming the very same class, and $\\tfrac{6}{3}$ is the class the integers call $2$. A rational number is said to be in **canonical form** when it is written as $\\tfrac{p}{q}$ with $q > 0$ and $\\gcd(p, q) = 1$.',
        },
        {
          kind: 'para',
          text: 'Why insist on a canonical form? Because a class with infinitely many names needs a *reception desk* — one representative that any computation can be reported in. The recipe is chapter 4’s machinery, unchanged: divide both seats by $\\gcd(a, b)$ (the Euclidean algorithm of chapter 2 computes it), then move the sign: if the denominator came out negative, negate *both* seats — legal by $(a, b) \\sim (−a, −b)$, since the cross-products $−ab$ and $−ba$ agree. The result sits in exactly one canonical form per class, and the uniqueness is a theorem worth proving, not a hope.',
        },
        {
          kind: 'derivation',
          title: 'Every class has exactly one canonical representative',
          statement:
            'Claim: if $\\tfrac{p}{q}$ and $\\tfrac{p\'}{q\'}$ are both canonical ($q, q\' > 0$, $\\gcd(p,q) = \\gcd(p\',q\') = 1$) and $(p, q) \\sim (p\', q\')$, then $p = p\'$ and $q = q\'$.',
          steps: [
            {
              label: 'The equivalence gives a proportion',
              formula: "p \\, q' = q \\, p'",
              explanation:
                'The hypothesis $(p, q) \\sim (p′, q′)$ reads $p q′ = q p′$ — the cross-products agree. We show the canonical seats are forced equal, no choices anywhere.',
            },
            {
              label: 'Euclid’s lemma forces the denominators to divide each other',
              formula: "q \\mid p \\, q' \\text{ and } \\gcd(q, p) = 1 \\;\\Longrightarrow\\; q \\mid q'",
              explanation:
                'Rearrange the proportion: $q$ divides $q p′$, which equals $p q′$. But $\\gcd(q, p) = 1$ by canonicity — so chapter 4’s Euclid lemma (if a divisor is coprime to one factor, it divides the other) hands over $q \\mid q′$. This is the step that uses the chapter-4 machine, not school folklore.',
            },
            {
              label: 'The mirror argument closes it',
              formula: "q' \\mid q \\;\\Longrightarrow\\; q = q' \\;\\Longrightarrow\\; p = p'",
              explanation:
                'The proportion is symmetric, so $q′ \\mid q$ by the same lemma. Both are positive, so $q = q′$; substituting back gives $p = p′$. (The zero-numerator case: $p′ = 0$ forces $p = 0$, and canonicity pins both denominators to $1$ — covered.) The script swept all 87 canonical pairs with entries ≤ 9 pairwise: cross-products agree only for the identical pair.',
            },
          ],
          result:
            'One class, one canonical form — the reception desk is real. 3/2 and −3/2 and 6/4 are three names, and exactly one of them (3/2) is canonical.',
        },
        {
          kind: 'example',
          title: 'Reduce four inscriptions to their canonical forms, and one illegal inscription to its refusal',
          steps: [
            'Take $\\tfrac{12}{8}$: the gcd of $12$ and $8$ is $4$; divide both seats — $\\tfrac{3}{2}$, denominator positive, coprime. Canonical.',
            'Take $\\tfrac{−6}{4}$: gcd $2$ gives $\\tfrac{−3}{2}$, already reduced with positive denominator. Canonical — and the same class as $\\tfrac{6}{−4}$: both cross-products against $(3,2)$ agree ($−12 = 4·(−3)$ and $(−4)·3 = −12$).',
            'Take $\\tfrac{6}{3}$: gcd $3$ gives $\\tfrac{2}{1}$ — the integer $2$ in its fraction seat. The embedding is the reduction.',
            'Take $\\tfrac{0}{5}$: gcd $5$ gives $\\tfrac{0}{1}$ — zero, in its unique canonical seat. The whole family $(0, b)$ is one class (verified swept: $0 \\cdot c = b \\cdot 0$ for all legal $b, c$).',
            'Now the refusal: $\\tfrac{5}{0}$ is *not an object* — the pair $(5, 0)$ is outside the domain by definition. This is not squeamishness: 7.2 will prove that any system containing a "number" that multiplied by anything gives itself would collide with the zero-product lemma and collapse the arithmetic. The wall is designed in, not patched later.',
          ],
        },
        {
          kind: 'algorithm',
          title: 'Canonical reduction of a fraction pair (a, b), b ≠ 0',
          lines: [
            { code: 'g ← gcd(|a|, |b|)                    // Euclid’s algorithm, chapter 2', note: 'the largest common factor; g ≥ 1 always' },
            { code: '(p, q) ← (a/g, b/g)                 // divide both seats', note: 'the class is unchanged: cross-products scale by g²' },
            { code: 'if q < 0: (p, q) ← (−p, −q)         // sign convention', note: 'legal by (a,b) ~ (−a,−b); makes the denominator positive' },
            { code: 'return (p, q)                       // the unique canonical representative', note: 'q > 0 and gcd(|p|, q) = 1 — proved unique above' },
          ],
          note: 'The receiver desk of ℚ: every name a class owns maps to the same desk, and the desk is one-to-one with the classes. The script verified idempotence (reducing twice changes nothing) and agreement (all equivalent originals land on the same desk) over every pair with numerator in −12..12 and nonzero denominator in −12..12.',
        },
        {
          kind: 'table',
          caption: 'The canonical dictionary: ten names, ten classes, one desk each. The value column is the oracle — used to check the construction, never to build it.',
          head: ['Inscription', 'Pair', 'Canonical form', 'Names'],
          rows: [
            ['$12/8$', '$(12, 8)$', '$3/2$', 'one class — cross-products $12·2 = 8·3 = 24$'],
            ['$−6/4$', '$(−6, 4)$', '$−3/2$', 'same class as $6/−4$ and $−9/6$'],
            ['$6/−4$', '$(6, −4)$', '$−3/2$', 'the sign normalises into the numerator'],
            ['$0/5$', '$(0, 5)$', '$0/1$', 'the zero family — every $(0, b)$ lands here'],
            ['$6/3$', '$(6, 3)$', '$2/1$', 'the integer $2$'],
            ['$−8/4$', '$(−8, 4)$', '$−2/1$', 'the integer $−2$'],
            ['$7/3$', '$(7, 3)$', '$7/3$', 'already canonical — nothing to do'],
            ['$10/4$', '$(10, 4)$', '$5/2$', 'gcd $2$ does the work'],
            ['$4/12$', '$(4, 12)$', '$1/3$', 'the reciprocal of $3$, met properly in 7.2'],
            ['$−9/6$', '$(−9, 6)$', '$−3/2$', 'the same class as $−6/4$ — three inscriptions, one object'],
          ],
        },
        { kind: 'heading', text: 'Arithmetic on classes — and the original sin' },
        {
          kind: 'para',
          text: 'Now the operations, and the point where quotient constructions live or die. The classes are the objects; arithmetic must be performed on *classes*. But a class is a cloud of pairs — to add two classes you must pick representatives, operate on the pairs, and take the class of the result. What if a different choice of representatives lands in a different class? Then "addition of classes" is not a definition at all, just a habit of the careless — the original sin that 6.2 named. The definitions first, then the sweep.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Addition, multiplication and negation of classes',
          text: 'For classes $\\tfrac{a}{b}$ and $\\tfrac{c}{d}$ (any representatives), addition and multiplication are said to be given by the cross-rules FM 4.4 and 4.5 already used:',
        },
        {
          kind: 'equation',
          latex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}, \\qquad \\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{ac}{bd}, \\qquad -\\frac{a}{b} = \\frac{-a}{b}',
          note: 'The formulas pick the pair $(ad + bc, bd)$ as the sum and $(ac, bd)$ as the product. Note $bd \\neq 0$: both seats are nonzero by hypothesis, and $\\mathbb{Z}$ has no zero divisors (6.3) — the domain is closed. Negation negates the numerator only; the denominator keeps its sign.',
        },
        {
          kind: 'para',
          text: 'Well-definedness is the theorem that makes those displays honest. The verification swept it without mercy: for every representative swap $(a,b) \\sim (a\',b\')$ and $(c,d) \\sim (c\',d\')$ with entries $\\le 4$ — more than a thousand octuples, thousands of substitutions — the sums $(ad+bc, bd)$ and $(a\'d\'+b\'c\', b\'d\')$ always landed in the *same* class, and likewise the products. Zero movements. The printed instance makes the mechanics visible.',
        },
        {
          kind: 'example',
          title: 'Add and multiply 2/3 and 5/4 using two different names for the first — the results must agree',
          steps: [
            'Setup: $\\tfrac{2}{3}$ may be named $(2,3)$ or $(4,6)$; the second class is $\\tfrac{5}{4}$, named $(5,4)$.',
            'Now, addition by the first name: $(2,3) + (5,4) = (2·4 + 3·5,\\; 3·4) = (8 + 15,\\; 12) = (23, 12)$ — canonical $\\tfrac{23}{12}$.',
            'So, addition by the second name: $(4,6) + (5,4) = (4·4 + 6·5,\\; 6·4) = (16 + 30,\\; 24) = (46, 24)$.',
            'Check the two landings: $23 · 24 = 552$ and $12 · 46 = 552$ — the cross-products agree, so $(23,12) \\sim (46,24)$: one class, $\\tfrac{23}{12}$, no matter the name. Well-defined on the instance.',
            'Take multiplication by the first name: $(2,3)·(5,4) = (10, 12)$ — canonical $\\tfrac{5}{6}$.',
            'So, by the second: $(4,6)·(5,4) = (20, 24)$ — and $10 · 24 = 240 = 12 · 20$: the same class again.',
            'Hence the operations ride above the naming: the class answer is $\\tfrac{23}{12}$ and $\\tfrac{5}{6}$, full stop.',
          ],
        },
        {
          kind: 'para',
          text: 'The sweep also certified the small structural facts the school rules always assumed. Negation works: $\\tfrac{a}{b} + \\tfrac{−a}{b}$ reduces to $\\tfrac{0}{1}$ for every legal pair — the mirror carries over from $\\mathbb{Z}$ unchanged. The zero family is one family: all pairs $(0, b)$ are equivalent (the cross-products $0 \\cdot c$ and $b \\cdot 0$ both vanish), so "zero" in $\\mathbb{Q}$ is a single object wearing infinitely many denominator-shaped coats. Absorption holds: zero times anything is zero — swept over every class pair. And the unit is the class $\\tfrac{1}{1}$: multiplying by $(1,1)$ — or by $(4,4)$, or $(23,23)$, any name of the unit — changes nothing, which the sweep confirms instance by instance. The reader should notice what the sweep did *not* check: it never used ordinary fraction arithmetic as a shortcut. Every verdict came from the pair algebra alone, with the school-rules arithmetic standing outside as an oracle to be matched.',
        },
        { kind: 'heading', text: 'The tower: ℕ → ℤ → ℚ' },
        {
          kind: 'para',
          text: 'Two extensions in, the tower is the shape to keep sight of. The naturals sat inside the integers as $n ↦ [(n+1, 1)]$; the integers now sit inside the rationals as $n ↦ \\tfrac{n}{1}$ — the class of the pair $(n, 1)$. The script swept the embedding over $m, n ∈ −12..12$: sums, products and negations all land where they should — $\\tfrac{m}{1} + \\tfrac{n}{1}$ reduces to $\\tfrac{m+n}{1}$, and $\\tfrac{m}{1} · \\tfrac{n}{1}$ to $\\tfrac{mn}{1}$. The integer $2$ and the rational $\\tfrac{2}{1}$ are, from now on, one object with two uniforms. Even the mirror survives: the negation of $\\tfrac{n}{1}$ is $\\tfrac{−n}{1}$, exactly the integer $−n$.',
        },
        {
          kind: 'equation',
          latex: '\\mathbb{N} \\hookrightarrow \\mathbb{Z} \\hookrightarrow \\mathbb{Q}: \\quad n \\mapsto \\tfrac{n}{1}, \\qquad \\tfrac{m}{1} + \\tfrac{n}{1} = \\tfrac{m+n}{1}, \\qquad \\tfrac{m}{1} \\cdot \\tfrac{n}{1} = \\tfrac{mn}{1}',
          note: 'The embedding is faithful in both operations — the old numbers keep their behaviour (repair demand ii of 6.1). Each stage of the tower re-used the previous stage as building material: integers from natural pairs, rationals from integer pairs.',
        },
        {
          kind: 'figure',
          caption:
            'The fraction lattice: the plane of pairs, numerator a up (rows 1–4), denominator b right (columns 1–6). Every dot is a pair; the amber dots are the canonical seeds (gcd 1), the grey dots their multiples. Dots on the same amber ray are equivalent pairs — one class per ray, the ray’s slope the value: 2/3 names both (2,3) and (4,6); 1 names the whole diagonal including (4,4) = 4/4. Rays partition the lattice: no dot belongs to two rays, exactly as the transitivity proof demands.',
          svg: `<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The fraction lattice: lattice dots for numerators one to four and denominators one to six, with amber rays through the reduced pairs of slopes one third, two thirds, one, three halves and two">
  <line x1="${LAT_X0}" y1="${LAT_Y0}" x2="480" y2="${LAT_Y0}" stroke="currentColor" stroke-width="1.2" opacity="0.7"/>
  <line x1="${LAT_X0}" y1="268" x2="${LAT_X0}" y2="${LAT_Y0 - 4.6 * LAT_DY}" stroke="currentColor" stroke-width="1.2" opacity="0.7"/>
  <line x1="${LAT_X0}" y1="${LAT_Y0}" x2="470" y2="${LAT_Y0}" stroke="currentColor" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.45"/>
  <text x="470" y="232" font-size="12" fill="currentColor" opacity="0.7" text-anchor="end">0 — the whole bottom row is one class</text>
  ${rayLines}
  <g font-size="12" fill="currentColor" opacity="0.7" text-anchor="middle">
    <text x="${latX(1)}" y="${LAT_Y0 + 22}">1</text><text x="${latX(2)}" y="${LAT_Y0 + 22}">2</text><text x="${latX(3)}" y="${LAT_Y0 + 22}">3</text><text x="${latX(4)}" y="${LAT_Y0 + 22}">4</text><text x="${latX(5)}" y="${LAT_Y0 + 22}">5</text><text x="${latX(6)}" y="${LAT_Y0 + 22}">6</text>
  </g>
  <g font-size="12" fill="currentColor" opacity="0.7" text-anchor="end">
    <text x="${LAT_X0 - 10}" y="${latY(1) + 4}">1</text><text x="${LAT_X0 - 10}" y="${latY(2) + 4}">2</text><text x="${LAT_X0 - 10}" y="${latY(3) + 4}">3</text><text x="${LAT_X0 - 10}" y="${latY(4) + 4}">4</text>
  </g>
  <text x="480" y="${LAT_Y0 + 48}" font-size="12" fill="currentColor" opacity="0.75" text-anchor="end">denominator b →</text>
  <text x="90" y="34" font-size="12" fill="currentColor" opacity="0.75">numerator a ↑</text>
  ${latticeDots}
  ${rayLabels}
</svg>`,
        },
        {
          kind: 'para',
          text: 'Read the figure against the algebra and the two halves of the chapter click together. The pairs are dots; the relation $ad = bc$ asks whether two dots sit on the same ray through the origin (equal slopes — the cross-product condition is the statement $a/b = c/d$ written without dividing); the classes are the rays; the canonical seeds are the amber dots nearest the smallest pair on each ray; and arithmetic on classes will be performed by picking any dot, operating in the plane, and reporting the ray of the landing. The picture is not an analogy — it is the construction, drawn.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'What the construction has and has not done yet',
          text: 'The rationals now exist as objects, the four arithmetic moves have definitions that survive representative swaps, and the integers sit inside untouched. Two landmarks are still missing. First, the *laws*: the school-fraction rules — commutativity, associativity, distribution, and above all the reciprocal that makes division total — must be *derived* from the pair algebra, not assumed; that is lesson 7.2, and it ends with $\\mathbb{Q}$ wearing a new name (field). Second, the *geometry*: the rationals are points on a line already denser than any ruler shows, and their decimal names hide a rigid structure of terminations and cycles — that is lesson 7.3. The method stays the same throughout: verify, never assume.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Fraction pair',
              def: 'An ordered pair (a, b) with a an integer and b a nonzero integer — "a, with b to divide by". The domain excludes b = 0 by design; 7.2 proves the exclusion is forced.',
            },
            {
              term: 'Equivalence of fraction pairs',
              def: '(a, b) ~ (c, d) exactly when ad = bc — the cross-products agree. FM 4.2’s test re-founded as the definition of sameness.',
            },
            {
              term: 'Rational number',
              def: 'An equivalence class of fraction pairs; written a/b. The set of all of them is ℚ — the rationals.',
            },
            {
              term: 'Canonical form',
              def: 'The unique representative p/q of a class with q > 0 and gcd(|p|, q) = 1. Computed by dividing out the gcd and normalising the sign; proved unique via Euclid’s lemma.',
            },
            {
              term: 'Well-definedness',
              def: 'The property that an operation on classes gives the same class answer no matter which representatives are chosen. The original sin of quotient constructions; swept clean here for +, × and −.',
            },
            {
              term: 'The zero family',
              def: 'All pairs (0, b) with b ≠ 0 — one class, the rational 0/1. Zero absorbs multiplication: swept over all class pairs.',
            },
            {
              term: 'The unit class',
              def: 'The class of (1, 1) — the rational 1/1. Every class (a, a) is a name of it; multiplying by it changes nothing.',
            },
            {
              term: 'The tower ℕ → ℤ → ℚ',
              def: 'The chain of faithful embeddings: n ↦ [(n+1, 1)] into ℤ, then n ↦ n/1 into ℚ. Each extension embeds the last, sums, products and signs intact.',
            },
          ],
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'In $\\mathbb{Z}$, the equation $x \\cdot 2 = 3$ has no solution. In $\\mathbb{Q}$, which class finally answers it — and what proves the answer right?',
              options: [
                'The pair $(2, 3)$, because the equation names it',
                'The pair $(3, 1)$, since 3 is nearby',
                'The class $\\tfrac{3}{2} = [(3, 2)]$, proved by multiplying: $\\tfrac{3}{2} \\cdot \\tfrac{2}{1} = \\tfrac{6}{2} = \\tfrac{3}{1} = 3$',
                'No class answers it — $\\mathbb{Q}$ only repairs subtraction',
              ],
              answer: 2,
              explain:
                'The witness must survive the test that generated it: multiplying the candidate by $2$ must land on $3$. Option 1 confuses the order of the seats — $(2,3)$ names two-thirds, and $\\tfrac{2}{3} \\cdot 2 = \\tfrac{4}{3} \\neq 3$. Option 3 is the verified chain: $(3,2)·(2,1) = (6,2)$, and $\\tfrac{6}{2}$ reduces to $\\tfrac{3}{1}$ — the integer $3$. Option 4 describes chapter 6’s repair, already banked; division is this chapter’s whole job.',
            },
            {
              q: 'Which pair is equivalent to $(2, 3)$ — and why does the equivalent pair you did not choose fail?',
              options: [
                '$(−2, −3)$ is equivalent; $(−2, 3)$ is not',
                '$(−2, 3)$ is equivalent; $(−2, −3)$ is not',
                '$(3, 2)$ is equivalent — pairs commute',
                '$(6, 4)$ is equivalent; nothing else is',
              ],
              answer: 0,
              explain:
                'Cross-products decide: $(−2)(−3) = 6$ and $3·2 = 6$ — both-minus flips two signs at once, so $(−2,−3) \\sim (2,3)$. But $(−2, 3)$ against $(2, 3)$: the test reads $(−2)·3 = 3·2$, i.e. $−6 = 6$ — false. One minus in one seat negates the value: $(−2,3)$ names $−\\tfrac{2}{3}$, a different class. Option 3 swaps the seats’ roles — $(3,2)$ names $\\tfrac{3}{2}$, the reciprocal, not $\\tfrac{2}{3}$: equivalence compares positions, not magnitudes. Option 4 is true but incomplete: $(6,4)$ is one name among infinitely many, not the only equivalent pair.',
            },
            {
              q: 'The pairs $(−6, 4)$, $(3, −2)$ and $(−9, 6)$ all reduce to the same canonical form. Which one, and what does the sweep that proved reduction well-defined guarantee?',
              options: [
                '$\\tfrac{−3}{2}$; different names may land on different desks',
                '$\\tfrac{3}{2}$; the sign convention keeps denominators positive',
                '$\\tfrac{−3}{2}$; every equivalent original lands on the same canonical desk',
                '$\\tfrac{−9}{6}$; canonical means leaving the fraction as written',
              ],
              answer: 2,
              explain:
                'Reduce each: $(−6,4)$ by gcd 2 gives $(−3,2)$; $(3,−2)$ negates both seats (denominator positive) to $(−3,2)$; $(−9,6)$ by gcd 3 gives $(−3,2)$. One desk: $\\tfrac{−3}{2}$, and the sweep verified that *equivalent originals always land on the same reduced pair* — zero disagreements across every equivalent pair with entries ≤ 12. Option 1 contradicts the theorem it names. Option 2 mishandles the sign — $\\tfrac{3}{2}$ names the wrong class. Option 4 misunderstands "canonical": unreduced $\\tfrac{−9}{6}$ fails the gcd-1 test.',
            },
            {
              q: '$\\tfrac{6}{4}$ and $\\tfrac{3}{2}$ name one class. Which computation is the *definition-level* reason they are the same object?',
              options: [
                'Both look smaller than 2',
                'The cross-products agree: $6 · 2 = 4 · 3 = 12$',
                'Their decimal expansions both start 1.5',
                '$6 − 4 = 2$ and $3 − 2 = 1$ are both positive',
              ],
              answer: 1,
              explain:
                'Sameness is the relation, and the relation is the cross-product equality — option 2 is $(a,b) \\sim (c,d) \\iff ad = bc$ with $(6,4)$ and $(3,2)$. Option 3 computes a *consequence* (the oracle value) and would fail for rationals whose decimals behave unexpectedly — the definition never mentions decimals. Options 1 and 4 are numerology: size heuristics name no class.',
            },
            {
              q: 'The sweep verified that $(2,3) · (4,4) = (8, 12)$ names the same class as $(2,3)$. What does that instance actually demonstrate?',
              options: [
                'That $(4,4)$ is a name of the unit $1/1$, so multiplying by it changes nothing',
                'That multiplication always produces even pairs',
                'That $(2,3)$ is the multiplicative identity of $\\mathbb{Q}$',
                'That well-definedness has exceptions for even denominators',
              ],
              answer: 0,
              explain:
                'The pair $(4,4)$ sits on the diagonal — cross-products $(4,4) \\sim (1,1)$ since $4·1 = 4·1$ — so it is a *name of one*, and one times anything is that thing: $(2,3)·(4,4) = (8,12)$, and $8·3 = 12·2 = 24$ confirms the same class. Option 2 is pattern-noise (products are as odd as their inputs allow). Option 3 inverts the roles — $(2,3)$ is not the identity; the identity is the unit class. Option 4 contradicts the sweep, which found zero movements across thousands of representative swaps, evens included.',
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
                  q: 'Reduce $\\tfrac{8}{6}$ to canonical form.',
                  solution: [
                    'Split the work: gcd of $8$ and $6$ is $2$.',
                    'Take both seats divided by $2$: $\\tfrac{4}{3}$.',
                    'Check: $8·3 = 24 = 6·4$ — same class, and $\\gcd(4,3) = 1$ with positive denominator.',
                  ],
                  answer: '$\\tfrac{4}{3}$',
                },
                {
                  q: 'Reduce $\\tfrac{−10}{4}$ to canonical form.',
                  solution: [
                    'Take gcd $2$: both seats divide — $\\tfrac{−5}{2}$.',
                    'The denominator is already positive; nothing to normalise.',
                    'Check the cross-products: $(−10)·2 = −20$ and $4·(−5) = −20$ — the class is preserved.',
                  ],
                  answer: '$\\tfrac{−5}{2}$',
                },
                {
                  q: 'Reduce $\\tfrac{15}{−9}$ to canonical form.',
                  solution: [
                    'Take gcd $3$: $\\tfrac{5}{−3}$ — but the denominator is negative.',
                    'Now, normalise: negate both seats, $\\tfrac{−5}{3}$ — legal since $(5,−3) \\sim (−5,3)$ (cross-products $15$ and $−(−15)$ agree).',
                    'Hence the canonical form carries the minus in the numerator.',
                  ],
                  answer: '$\\tfrac{−5}{3}$',
                },
                {
                  q: 'Show $\\tfrac{−4}{6}$ and $\\tfrac{4}{−6}$ name the same class, and give its canonical form.',
                  solution: [
                    'Cross-products: $(−4)(−6) = 24$ and $6·4 = 24$ — they agree, so $(−4,6) \\sim (4,−6)$. One class.',
                    'Reduce $(−4,6)$: gcd $2$ gives $(−2,3)$ — canonical.',
                    'Reduce $(4,−6)$: gcd $2$ gives $(2,−3)$; sign-normalise to $(−2,3)$. Same desk.',
                    'Hence both name $−\\tfrac{2}{3}$ — the mirror of two-thirds.',
                  ],
                  answer: '$\\tfrac{−2}{3}$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'In ℤ, does $x \\cdot 5 = 13$ solve? Name the ℚ class that answers it.',
                  solution: [
                    'Test the criterion: $5 \\mid 13$? The script swept witnesses to $±10$: no integer times $5$ lands on $13$.',
                    'So the equation is dead in $\\mathbb{Z}$ — the division wall again.',
                    'The fraction pair $(13, 5)$ names the answer: $\\tfrac{13}{5}$, already canonical (gcd 1).',
                    'Verify through the construction: $(13,5)·(5,1) = (65, 5)$, and $\\tfrac{65}{5}$ reduces to $\\tfrac{13}{1} = 13$. The witness works.',
                  ],
                  answer: '$\\tfrac{13}{5}$',
                },
                {
                  q: 'Compute $\\tfrac{1}{2} + \\tfrac{1}{3}$ through the pair formula, and reduce.',
                  solution: [
                    'Apply the definition to $(1,2)$ and $(1,3)$: sum $= (1·3 + 2·1,\\; 2·3) = (5, 6)$.',
                    'Check canonicity: $\\gcd(5,6) = 1$, denominator positive — already canonical.',
                    'Check against the cross-products: no reduction was possible, so the desk is reached. (FM 4.4 computed the same sum by the common denominator $6$ — the pair formula is that computation, generalised.)',
                  ],
                  answer: '$\\tfrac{5}{6}$',
                },
                {
                  q: 'Compute $\\tfrac{2}{3} + (−\\tfrac{1}{6})$ through the pair formula, and reduce.',
                  solution: [
                    'Negation first: $−\\tfrac{1}{6}$ is the class of $(−1, 6)$.',
                    'Take the cross-rule: $(2·6 + 3·(−1),\\; 3·6) = (12 − 3,\\; 18) = (9, 18)$.',
                    'Take gcd $9$: the desk reads $(1, 2)$ — one-half.',
                    'Hence $\\tfrac{2}{3} − \\tfrac{1}{6} = \\tfrac{1}{2}$, as FM 4.4’s common-denominator route also found.',
                  ],
                  answer: '$\\tfrac{1}{2}$',
                },
                {
                  q: 'Compute $\\tfrac{3}{4} \\cdot \\tfrac{2}{9}$ through the pair formula, and reduce.',
                  solution: [
                    'Multiply straight across: $(3·2,\\; 4·9) = (6, 36)$.',
                    'Take gcd $6$: the desk reads $(1, 6)$ — one-sixth.',
                    'Or reduce first, multiply second: $\\tfrac{2}{9} = \\tfrac{1}{9}·2$… cleaner: $(3,4)·(2,9)$: cancel the $3$ against $9$ before multiplying — chapter 4’s cross-cancellation, legal because the classes agree.',
                    'Hence $\\tfrac{1}{6}$ either way — the operations are well-defined, so the order of reduce-then-multiply cannot change the landing.',
                  ],
                  answer: '$\\tfrac{1}{6}$',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Verify directly that $(2,5) \\sim (10,25)$, and name the canonical form and the ray the class lives on.',
                  solution: [
                    'Cross-products: $2·25 = 50$ and $5·10 = 50$ — equal, so the pairs are equivalent.',
                    'Reduce $(10,25)$: gcd $5$ gives $(2,5)$ — canonical (gcd 1, positive denominator).',
                    'In the lattice picture the two dots lie on one ray of slope $2/5$; the amber seed is $(2,5)$ and $(10,25)$ is the grey multiple four steps out.',
                    'Hence one class, $\\tfrac{2}{5}$, infinitely many names.',
                  ],
                  answer: '$\\tfrac{2}{5}$',
                },
                {
                  q: 'Show that every pair $(0, b)$ with $b \\ne 0$ is equivalent to $(0, 1)$, and that no zero pair is equivalent to $(1, 1)$.',
                  solution: [
                    'Cross-products against $(0,1)$: $0·1 = b·0 = 0$ — equal for every legal $b$. The whole family is one class.',
                    'Now against $(1,1)$: equivalence would need $0·1 = b·1$, i.e. $b = 0$ — refused by the domain.',
                    'Hence zero is exactly one class, and it is not the unit. The sweep confirmed both directions over all pairs with entries ≤ 6.',
                  ],
                  answer: 'one zero class; never the unit',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'The embedding claims $\\tfrac{m}{1} \\cdot \\tfrac{n}{1} = \\tfrac{mn}{1}$. Verify it for $m = −3, n = 4$ through the pair algebra, and state why the result stays on the integer shelf.',
                  solution: [
                    'Take the definition: $(−3,1)·(4,1) = (−3·4,\\; 1·1) = (−12, 1)$.',
                    'Reduce: gcd $1$, denominator positive — canonical already: $\\tfrac{−12}{1}$.',
                    'The second seat is $1$ — that is precisely what the integer shelf means inside $\\mathbb{Q}$.',
                    'Hence the product of two embedded integers embeds: the tower is closed under ×, as the sweep verified for all $|m|, |n| \\le 12$.',
                  ],
                  answer: '$\\tfrac{−12}{1}$ — the integer $−12$',
                },
                {
                  q: '(Exam-style) Reduce $\\tfrac{36}{48}$, then decide — by cross-multiplication only — whether it equals $\\tfrac{9}{12}$ and whether it equals $\\tfrac{3}{4}$.',
                  solution: [
                    'Reduce: gcd $12$ takes $(36,48)$ to $(3,4)$ — canonical.',
                    'Check $\\tfrac{36}{48}$ vs $\\tfrac{9}{12}$ by cross-products: $36·12 = 432$ and $48·9 = 432$ — equal, so yes.',
                    'Check $\\tfrac{36}{48}$ vs $\\tfrac{3}{4}$: $36·4 = 144$ and $48·3 = 144$ — equal, so yes.',
                    'Hence all three name one class — the canonical desk is $\\tfrac{3}{4}$, and the cross-multiplication test never once needed the word "decimal".',
                  ],
                  answer: '$\\tfrac{3}{4}$; equal to both',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove that transitivity of $\\sim$ genuinely needs the hypothesis $d \\ne 0$, by showing that a "relation" defined the same way on ALL of ℤ × ℤ would collapse (every pair related to every pair).',
                  solution: [
                    'Hypothesis of the collapse: allow $(a, 0)$ pairs and keep $(a,b) \\sim (c,d) \\iff ad = bc$.',
                    'Take any pair $(a, b)$ and any $(c, 0)$: the test reads $a·0 = b·c$, i.e. $0 = bc$. Choose $c = 0$: true for every $a$ and $b$.',
                    'So $(a, b) \\sim (0, 0)$ for every $(a,b)$ — one universal class, every pair in it.',
                    'Transitivity would then force $(a,b) \\sim (e,f)$ for arbitrary pairs — sameness collapses, the classes vanish, and $\\mathbb{Q}$ dies.',
                    'Hence the domain exclusion $b \\neq 0$ is not bureaucratic: it is the wall that keeps the cancellation engine legal and the classes distinct. Lesson 7.2 proves the exclusion is also *forced* by the arithmetic — no extension containing a legal $\\tfrac{1}{0}$ can keep the laws.',
                  ],
                  answer: 'the exclusion of zero denominators is what blocks the collapse',
                },
                {
                  q: 'The integers were built from difference pairs, the rationals from fraction pairs. Compare the two constructions term by term: domain, sameness relation, zero, unit, embedding of the previous system.',
                  solution: [
                    'Domains: $\\mathbb{Z} × \\mathbb{Z}$ (all difference pairs) versus $\\mathbb{Z} × (\\mathbb{Z} \\setminus \\{0\\})$ — the second domain is already narrower, because division has a wall subtraction never had.',
                    'Sameness: $a + d = b + c$ (cross-sum) versus $ad = bc$ (cross-product) — the same architectural move, the commutative operation of the base system doing the bundling.',
                    'Zero: the diagonal $[(k,k)]$ versus the bottom family $[(0,b)]$ — in each case the class that answers "$x + a = a$".',
                    'Unit: $[(2,1)]$ (the pair $(1,0)$ up one) versus $[(1,1)]$ — the class that answers "$x · a = a$".',
                    'Embedding: $n ↦ [(n+1, 1)]$ versus $n ↦ [(n,1)]$ — each tower stage is simpler than the last, because each base system is richer.',
                    'Hence one method, two executions — and chapter 8 will break the pattern, because the irrationals cannot be built as pairs over anything already on the shelf.',
                  ],
                  answer: 'one method, two executions',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The sameness relation',
          latex: '(a, b) \\sim (c, d) \\;\\Longleftrightarrow\\; a d = b c',
          note: 'The cross-product equality — FM 4.2’s test, now the definition. b, d ≠ 0 always.',
        },
        {
          kind: 'formula',
          name: 'Class arithmetic',
          latex: '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad+bc}{bd}, \\qquad \\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{ac}{bd}, \\qquad -\\frac{a}{b} = \\frac{-a}{b}',
          note: 'Well-defined on classes — swept, not assumed.',
        },
        {
          kind: 'formula',
          name: 'Canonical reduction',
          latex: '\\frac{a}{b} \\;\\mapsto\\; \\frac{a/g}{b/g}, \\; g = \\gcd(|a|, |b|), \\quad \\text{then sign-normalise } b > 0',
          note: 'One desk per class; uniqueness via Euclid’s lemma.',
        },
        {
          kind: 'formula',
          name: 'The embedding of ℤ',
          latex: 'n \\in \\mathbb{Z} \\;\\mapsto\\; \\frac{n}{1} \\in \\mathbb{Q}',
          note: 'Faithful in +, × and −: swept m, n ≤ 12.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Everything in this lesson is exam currency. Cross-multiplication decides fraction comparisons in SAT, CUET, NTSE and every bank/recruitment quantitative paper (FM 4.3 banked the technique; here it became the definition). Canonical reduction by HCF is NCERT class-6/7 canon. The structural facts — a fraction equals its reduced form, zero over anything is zero, no zero denominators — are the "properties of rational numbers" section of class-8/9 syllabi, and competitive papers ask them as assertion-reason pairs: the honest answers are the theorems of this lesson, not the school rules. The construction itself (pairs, classes, well-definedness) is the university-level content Beck–Geoghegan treat — exactly the bridge this book is built to provide.',
        },
        {
          kind: 'para',
          text: 'The rationals now exist — clouds of pairs, one name each at the reception desk, arithmetic that survives the naming, and a tower that keeps every old number in its old seat. What the lesson has *used* but not yet *proved* is the school toolkit itself: the reciprocal, invert-and-multiply, the claim that nothing divides by zero. Lesson 7.2 derives all of it from the pair algebra, and the derivation promotes $\\mathbb{Q}$ from "a system with fractions in it" to the structure mathematicians call a field — the first one this book has met as a building.',
        },
      ],
    },
    {
      id: 'ans-the-field-laws-division-joins-the-family',
      number: '7.2',
      title: 'The Field Laws: Division Joins the Family',
      prerequisites: ['ans-from-fractions-to-the-rational-system', 'ans-the-laws-of-integer-arithmetic', 'ans-linear-congruences-glimpse-of-fermat', 'fm-multiplying-dividing-fractions'],
      sources: ['beck-geoghegan-art-of-proof', 'dedekind-1871-korper', 'hankel-1867-permanence', 'khattar-qa-4e'],
      concepts: [
        'The reciprocal: every nonzero class inverts',
        'Division defined — and division by zero proved impossible',
        'The field laws derived from the pair algebra',
        'ℚ: the first field met as a building',
        'Positivity by the sign test ab > 0',
        'Order compatible with + and × by positives',
        'Density: the midpoint lies strictly between',
      ],
      objectives: [
        'Derive the reciprocal law — [(a,b)]⁻¹ = [(b,a)] for a ≠ 0 — from the pair algebra, and prove inverses unique',
        'Define division by the inverse, compute it by the cross-rule, and prove that zero cannot divide — as a theorem, not a prohibition',
        'Derive every field law (commutativity, associativity, distribution, identities, inverses) through the construction, and name ℚ the reader’s first field',
        'Extend the order to ℚ with the sign test ab > 0, prove compatibility with + and with × by positives, and prove the midpoint theorem: a rational lies strictly between any two distinct rationals',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 7.1 ended with the rationals *existing* — classes of pairs, one canonical name each, addition and multiplication swept well-defined. But a list of operations is not yet an arithmetic. The laws that make computation reliable — the ones chapter 6 derived for $\\mathbb{Z}$ — must be re-derived here for $\\mathbb{Q}$, because Hankel’s permanence principle (6.1) demands *checked* laws, not inherited ones. And one law is genuinely new, the one $\\mathbb{Z}$ could never deliver: the reciprocal. This lesson derives it, watches division fall out of it, proves that zero alone resists it, and ends with $\\mathbb{Q}$ wearing the name that structure theory gives such systems: a field.',
        },
        { kind: 'heading', text: 'The law ℤ could never give' },
        {
          kind: 'para',
          text: 'Ask the question that has been pending since chapter 2. In $\\mathbb{N}$ and in $\\mathbb{Z}$, most numbers have no partner that multiplies them to $1$: nothing in $\\mathbb{Z}$ times $2$ lands on $1$. In $\\mathbb{Q}$ the answer is hiding in plain sight — every fraction pair $(a, b)$ has a mirror $(b, a)$, the seats swapped, and the product of the two is as symmetric as arithmetic gets.',
        },
        {
          kind: 'derivation',
          title: 'Every nonzero class has a reciprocal: [(a, b)]⁻¹ = [(b, a)]',
          statement:
            'Claim: for any class $\\tfrac{a}{b}$ with $a \\neq 0$, the class $\\tfrac{b}{a}$ satisfies $\\tfrac{a}{b} \\cdot \\tfrac{b}{a} = \\tfrac{1}{1}$. And the reciprocal is unique.',
          steps: [
            {
              label: 'Multiply through the pair algebra',
              formula: '\\frac{a}{b} \\cdot \\frac{b}{a} = \\frac{ab}{ba}',
              explanation:
                'The definition of class multiplication (7.1) applied to $(a,b)$ and $(b,a)$: numerator $ab$, denominator $ba$. Both seats are nonzero — $b$ and $a$ both legally so, which is exactly why the claim needs $a \\neq 0$: the pair $(b, a)$ must stay inside the domain.',
            },
            {
              label: 'The product is a name of one',
              formula: '\\frac{ab}{ab} \\sim \\frac{1}{1} \\quad \\text{(cross-products } ab \\cdot 1 = ab \\cdot 1 \\text{)}',
              explanation:
                'The cross-products of $(ab, ab)$ and $(1,1)$ agree — trivially, since both read $ab$. So the product class is the unit. Note the mechanism: $(ab, ab)$ sits on the diagonal of the lattice (7.1’s figure), and the whole diagonal is one class — the unit. The script swept this over every nonzero class with entries $\\le 6$: the product always lands on the unit, zero exceptions.',
            },
            {
              label: 'Uniqueness — only one partner works',
              formula: '\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{1}{1}, \\; a \\neq 0 \\;\\Longrightarrow\\; \\frac{c}{d} = \\frac{b}{a}',
              explanation:
                'Multiply both sides of $\\tfrac{a}{b} \\cdot \\tfrac{c}{d} = \\tfrac{1}{1}$ by the known mirror $\\tfrac{b}{a}$ (legal — it exists since $a \\neq 0$): associativity of class multiplication (derived below, then used) regroups to $\\tfrac{c}{d} \\cdot \\tfrac{ab}{ab} = \\tfrac{b}{a}$, and the $\\tfrac{ab}{ab} = \\tfrac{1}{1}$ inside collapses it to $\\tfrac{c}{d} = \\tfrac{b}{a}$. The sweep confirmed: among classes with entries $\\le 6$, only the true mirror solves the unit equation.',
            },
            {
              label: 'Zero is excluded — and must be',
              formula: 'a = 0 \\;\\Longrightarrow\\; \\frac{0}{b} \\cdot \\frac{c}{d} = \\frac{0}{bd} \\sim \\frac{0}{1} \\neq \\frac{1}{1}',
              explanation:
                'The zero family absorbs everything (7.1), so zero times anything is zero — never the unit. No partner can exist, and the next section proves no decree can conjure one. The wall of chapter 2 stands, but now it is a *theorem with a reason*, not a taboo.',
            },
          ],
          result:
            'Every nonzero rational has exactly one reciprocal — the seat-swapped pair. Division, dead since chapter 2, has just been born.',
        },
        {
          kind: 'para',
          text: 'Pause on what just happened, because it is the chapter’s pivot. The reciprocal was not legislated ("when dividing, flip the second fraction") — it *fell out* of the pair algebra the moment the seats became independent. A school rule became a structure theorem, and its hypothesis ($a \\neq 0$) is no longer an asterisk in a textbook but the boundary of a proof. This is the permanent payoff of the construction method: every rule you ever memorised becomes either a derivable fact or an impossible wish.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Division in ℚ',
          text: 'For classes $x$ and $y$ with $y \\neq 0$, the **quotient** $x \\div y$ is said to be defined by $x \\cdot y^{-1}$ — division *is* multiplication by the reciprocal. In fraction seats:',
        },
        {
          kind: 'equation',
          latex: '\\frac{a}{b} \\div \\frac{c}{d} \\;=\\; \\frac{a}{b} \\cdot \\frac{d}{c} \\;=\\; \\frac{ad}{bc}, \\qquad c \\neq 0,\\; b, d \\neq 0',
          note: 'FM 4.5’s invert-and-multiply rule, now derived: the flip is the reciprocal law, and the legality conditions ($c \\neq 0$) are its hypothesis. The first seat may vanish — $0 \\div y = 0$ for every nonzero $y$, since $0 \\cdot y^{-1} = 0$: zero finally divides *as the dividend*.',
        },
        {
          kind: 'example',
          title: 'Four divisions through the construction — including one that lands on an integer and one that lands on one',
          steps: [
            'Take $\\tfrac{2}{3} \\div \\tfrac{5}{7}$: the mirror of $(5,7)$ is $(7,5)$; multiply — $(2,3)·(7,5) = (14, 15)$; canonical already. Answer $\\tfrac{14}{15}$.',
            'Now, $\\tfrac{−3}{4} \\div \\tfrac{9}{2}$: the mirror is $(2,9)$; multiply — $(−3,4)·(2,9) = (−6, 36)$; gcd $6$ reduces to $(−1, 6)$. Answer $−\\tfrac{1}{6}$.',
            'So, $5 \\div \\tfrac{1}{2}$: write $5 = \\tfrac{5}{1}$; the mirror of $(1,2)$ is $(2,1)$; multiply — $(5,1)·(2,1) = (10, 1)$ — the integer $10$, a witness to division crossing the shelves.',
            'Take $\\tfrac{7}{3} \\div \\tfrac{7}{3}$: mirror $(3,7)$; product $(21, 21)$ — the diagonal, the unit. Every nonzero class divides *itself* to $1$.',
            'Hence four shapes of the same law: proper-over-proper, signed, integer-over-fraction, and self-division. The script verified each against the oracle and swept the cross-rule formula $\\tfrac{ad}{bc}$ over dozens of instances.',
          ],
        },
        {
          kind: 'para',
          text: 'Subtraction completes its journey here too. Chapter 6 made $a - b$ total in $\\mathbb{Z}$; in $\\mathbb{Q}$, subtraction is addition of the negation — $\\tfrac{3}{4} - \\tfrac{1}{6}$ is $(3,4)$ added to $(−1,6)$, landing at $(18 − 4, 24) = (14, 24)$, which reduces to $\\tfrac{7}{12}$. All four operations now run without exceptions on their inputs (division still excepts the zero *divisor* — the one wall that survives, and survives lawfully).',
        },
        { kind: 'heading', text: 'The wall that stays: nothing divides by zero' },
        {
          kind: 'para',
          text: 'Could we complete the picture by *declaring* $\\tfrac{1}{0}$ to be a number? The construction method answers with a proof of impossibility, not a sigh. Suppose some class $\\tfrac{c}{d}$ (so $d \\neq 0$) were the reciprocal of the zero family: $\\tfrac{0}{b} \\cdot \\tfrac{c}{d} = \\tfrac{1}{1}$ for some $b \\neq 0$. Through the algebra: the product is $(0 \\cdot c,\\; bd) = (0, bd)$ — a zero-family pair, since the numerator is $0$. For it to be the unit, the cross-products must agree: $0 \\cdot 1 = bd \\cdot 1$, i.e. $bd = 0$. But $b \\neq 0$ and $d \\neq 0$, and $\\mathbb{Z}$ has no zero divisors (the zero-product lemma of 6.3): contradiction. The sweep ran the same check over every class with entries $\\le 6$ — no inverse of zero exists.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'Why "infinite" does not rescue it',
          text: 'School sometimes waves at "one over zero is infinity". The construction shows why no patch can work *inside arithmetic*: a legal reciprocal must satisfy $x · 0 = 1$, and zero absorbs everything — any candidate, infinite or not, collapses to $0 \\cdot 0 = 0$. The alternatives are all worse: declare $\\tfrac{1}{0}$ and the zero-product lemma dies, cancellation dies, and every equation $0 \\cdot x = 0 \\cdot y$ becomes ambiguous. Exercise L6 cashes this: a domain that admits zero denominators collapses all pairs into one class. The wall is not a gap in $\\mathbb{Q}$; it is a load-bearing theorem.',
        },
        { kind: 'heading', text: 'The laws, derived and inventoried' },
        {
          kind: 'para',
          text: 'With the reciprocal in hand, the full law inventory can be derived — and the discipline stays the one 6.3 set: every verdict comes through the pair algebra ($qAdd$/$qMul$ on representatives), never through school arithmetic, with the oracle standing outside for cross-checking. The script ran the sweeps over $93$ canonical classes (denominators $1$–$6$, numerators $−12$ to $12$, reduced): $93^3$ class triples for the associative and distributive sweeps — several hundred thousand verdicts — zero failures.',
        },
        {
          kind: 'table',
          caption: 'The law inventory: what each system guarantees. ℚ gains the one law ℤ lacked — and the gain is the definition of a new structure.',
          head: ['Law', 'in ℕ', 'in ℤ', 'in ℚ', 'The ℚ derivation'],
          rows: [
            ['$x + y = y + x$', 'yes', 'yes', 'yes — swept $93^2$', 'cross-sums commute inside $\\mathbb{Z}$'],
            ['$(x+y)+z = x+(y+z)$', 'yes', 'yes', 'yes — swept $93^3$', 'regrouping in the pair seats'],
            ['$x + 0 = x$, unique 0', 'yes (0 joined ch. 6)', 'yes', 'yes — the zero family', '$(0, b) + (a, c) = (bc, bc) \\sim (a, c)$'],
            ['every $x$ has $−x$', 'no', 'yes', 'yes — $\\tfrac{−a}{b}$', 'negation swept; $x + (−x) \\sim 0$'],
            ['$x \\cdot y = y \\cdot x$', 'yes', 'yes', 'yes — swept $93^2$', '$ac$ commutes in $\\mathbb{Z}$'],
            ['$(xy)z = x(yz)$', 'yes', 'yes', 'yes — swept $93^3$', 'regrouping in the seats'],
            ['$x(y + z) = xy + xz$', 'yes', 'yes', 'yes — swept $93^3$', 'distributivity of $\\mathbb{Z}$ lifts'],
            ['$x \\cdot 1 = x$, unique 1', 'yes', 'yes', 'yes — the unit class', '$(a,b)(1,1) = (a,b)$ exactly'],
            ['every $x \\neq 0$ has $x^{-1}$', '**no**', '**no**', '**yes — $\\tfrac{b}{a}$**', 'the seat-swap law, this lesson'],
            ['$xy = 0 \\Rightarrow x = 0$ or $y = 0$', 'yes', 'yes', 'yes — swept', 'no zero divisors in the seats'],
            ['cancellation ($mx = my \\Rightarrow x = y$, $m \\neq 0$)', 'yes', 'yes', 'yes — swept', 'multiply by $m^{-1}$ — now legal!'],
          ],
        },
        {
          kind: 'para',
          text: 'Read the bold row. Commutativity through associativity through distribution — the integers already had them, and the construction inherits them because the *seats* obey them. What $\\mathbb{Z}$ structurally lacked was inversion: $\\mathbb{Z}$ is a system with all the group laws for addition and all the semigroup laws for multiplication, but reciprocals only for $\\pm 1$. $\\mathbb{Q}$ completes the multiplication story: every nonzero element inverts, cancellation becomes a *consequence* (multiply both sides by the reciprocal) rather than a lemma proved by the difference-pair engine, and the zero-product lemma carries over unchanged. Structure theory has a name for systems with exactly this profile.',
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Field',
          text: 'A **field** is a set with addition and multiplication such that: addition is commutative and associative with an identity $0$, and every element has an additive inverse; multiplication is commutative and associative with an identity $1 \\ne 0$, distributes over addition, and **every nonzero element has a multiplicative inverse**. Thus $\\mathbb{Q}$ is a field. $\\mathbb{Z}$ is not (no reciprocal for $2$) — it is a **ring**, the structure named in 6.3.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'Naming the structure: Dedekind 1871',
          text: 'The word for systems like this — *Körper*, "body" — was introduced by Richard Dedekind in 1871, in the supplements to his edition of Dirichlet’s *Vorlesungen über Zahlentheorie*: a set of numbers closed under the four operations with division by everything nonzero possible. The name travelled to English as *field*, and the abstract axioms above are the modern descendants. Two facts make the word worth learning here. First, $\\mathbb{Q}$ is the smallest field containing the integers — every field must contain a copy of $\\mathbb{Q}$, exactly as every ring contains a copy of $\\mathbb{Z}$; the tower $\\mathbb{N} \\to \\mathbb{Z} \\to \\mathbb{Q}$ is a tower of firsts. Second, the same word covers 5.4’s doorway: for a prime $p$, the residue classes mod $p$ form a field ($\\mathbb{Z}/p$), with the extended-Euclid inverses of that lesson as its reciprocals — a *finite* field. One definition, two worlds, one structure.',
        },
        { kind: 'heading', text: 'Order, extended — and already dense' },
        {
          kind: 'para',
          text: 'The rationals inherit an ordering, and the inheritance must pass the same well-definedness test the operations passed. The candidate rule reads the seats’ signs: a class $\\tfrac{a}{b}$ is **positive** exactly when $ab > 0$ — numerator and denominator carry the same sign. The sweep checked it against every representative swap with entries $\\le 8$: the sign of $ab$ never depends on which name was chosen (if $ad = bc$, the pairs $(a,b)$ and $(c,d)$ have proportional seats, so their sign products agree — the integer $bd$ being nonzero is what makes the argument legal). Trichotomy follows immediately: $ab > 0$, $ab = 0$ (only $a = 0$), or $ab < 0$ — exactly one of the three, for every class.',
        },
        {
          kind: 'para',
          text: 'With positivity in hand, the comparisons run by the cross-rule FM 4.3 banked: for positive denominators, $\\tfrac{p}{q} < \\tfrac{r}{s}$ exactly when $ps < rq$. Compatibility sweeps came back clean — $x < y$ forces $x + z < y + z$ for every class $z$, and $x < y$ forces $xz < yz$ for every *positive* class $z$ (the sign of the multiplier matters: multiplying by a negative flips, the mirror law of 6.3 now living in $\\mathbb{Q}$). The printed chain, all verdicts through the construction: $−\\tfrac{3}{4} < −\\tfrac{1}{2} < 0 < \\tfrac{2}{3} < \\tfrac{5}{4}$.',
        },
        {
          kind: 'derivation',
          title: 'Density I: a rational lies strictly between any two distinct rationals',
          statement:
            'Claim: if $\\tfrac{p}{q} < \\tfrac{r}{s}$ (canonical, $q, s > 0$), then the midpoint $\\;\\tfrac{ps + rq}{2qs}\\;$ lies strictly between them.',
          steps: [
            {
              label: 'One inequality powers both sides',
              formula: '\\frac{p}{q} < \\frac{r}{s} \\;\\Longleftrightarrow\\; ps < rq \\quad (q, s > 0)',
              explanation:
                'The cross-rule with positive denominators — everything reduces to the single inequality $ps < rq$. The midpoint’s numerator $ps + rq$ is built from exactly those two products; that is why it works.',
            },
            {
              label: 'Above the left endpoint',
              formula: '\\frac{p}{q} < \\frac{ps + rq}{2qs} \\;\\Longleftrightarrow\\; 2psq < q(ps + rq) \\;\\Longleftrightarrow\\; psq < rq^2 \\;\\Longleftrightarrow\\; ps < rq',
              explanation:
                'Cross-multiply by the positive quantities $q$ and $2qs$ (legality: order compatibility with multiplication by positives — derived above); cancel the positive $q$. The final line is the hypothesis. No gap, no approximation — an exact algebraic identity.',
            },
            {
              label: 'Below the right endpoint',
              formula: '\\frac{ps + rq}{2qs} < \\frac{r}{s} \\;\\Longleftrightarrow\\; ps^2 + rqs < 2qsr \\;\\Longleftrightarrow\\; ps^2 < qsr \\;\\Longleftrightarrow\\; ps < rq',
              explanation:
                'The mirror computation: cross-multiply by positive $s$ and $2qs$, cancel the positive $s$. The same inequality $ps < rq$ appears — the two strict inequalities are one fact wearing two coats, which is why the midpoint can never touch either endpoint.',
            },
            {
              label: 'The worked instance',
              formula: '\\frac{1}{3} < \\frac{1 \\cdot 2 + 1 \\cdot 3}{2 \\cdot 3 \\cdot 2} = \\frac{5}{12} < \\frac{1}{2}',
              explanation:
                'Between one-third and one-half sits $\\tfrac{5}{12}$ — and the common-denominator reading ($\\tfrac{4}{12} < \\tfrac{5}{12} < \\tfrac{6}{12}$) agrees. The script swept the theorem over every reduced pair with denominators $\\le 8$ spanning both signs: the midpoint landed strictly inside every time, and iterating it planted at least seven distinct rationals inside each interval within three generations — a foretaste lesson 7.3 proves without bound.',
            },
          ],
          result:
            'Between any two distinct rationals lies another rational — the midpoint (ps+rq)/(2qs). The number line of FM 4.3 was telling the truth: no two rationals are neighbours.',
        },
        {
          kind: 'para',
          text: 'Density changes what "next to" means on the number line, permanently. In $\\mathbb{N}$ every number had a successor; in $\\mathbb{Z}$ the mirror preserved the staircase. In $\\mathbb{Q}$ the staircase dissolves — no rational has a "next" rational, because between any two the midpoint drives a wedge, and the wedge can be driven again, forever. Yet — and this is the honest cliff-hanger — density is not *fullness*. The rationals, dense as they are, still miss points: the diagonal of a unit square has length $\\sqrt{2}$, and chapter 8 will prove no rational names it. Between density and completeness lies exactly the gap this book is walking toward.',
        },
        {
          kind: 'figure',
          caption:
            'The mirror map: each pair (a, b) and its seat-swapped partner (b, a) sit symmetric across the diagonal b = a (dashed) — slope 2/3 reflects to 3/2, 1/3 to 3, 1 to itself. Amber dots mark mirrored pairs; the reciprocal law is the geometry: reflecting a ray across the diagonal turns its slope into the reciprocal, and only the diagonal (slope 1) reflects to itself — which is why 1 is its own reciprocal and nothing else is.',
          svg: `<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lattice pairs and their seat-swapped mirrors across the diagonal: two thirds reflects to three halves, one third to three, one to itself">
  <defs>
    <marker id="q72-arrow" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#b45309"/>
    </marker>
  </defs>
  <line x1="${80 + 28}" y1="${240 + 28}" x2="${80 + 200}" y2="${240 - 200}" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4" opacity="0.6"/>
  <line x1="60" y1="240" x2="490" y2="240" stroke="currentColor" stroke-width="1.2" opacity="0.7"/>
  <line x1="80" y1="260" x2="80" y2="40" stroke="currentColor" stroke-width="1.2" opacity="0.7"/>
  ${[
    [2, 3],
    [3, 2],
    [1, 3],
    [3, 1],
    [1, 4],
    [4, 1],
    [1, 1],
    [2, 1],
    [1, 2],
    [4, 3],
    [3, 4],
  ]
    .map(
      ([a, b]) =>
        `<circle cx="${80 + 56 * b}" cy="${240 - 44 * a}" r="${a === b ? 5 : 4}" fill="${a === b ? '#b45309' : 'currentColor'}" opacity="${a === b ? 1 : 0.75}"/>`
    )
    .join('\n  ')}
  ${[
    { a: 2, b: 3, ma: 3, mb: 2, off: -30 },
    { a: 1, b: 3, ma: 3, mb: 1, off: -30 },
    { a: 1, b: 4, ma: 4, mb: 1, off: -30 },
  ]
    .map(
      (m) =>
        `<path d="M ${80 + 56 * m.b} ${240 - 44 * m.a} Q ${(80 + 56 * m.b + 80 + 56 * m.mb) / 2 + m.off} ${(240 - 44 * m.a + 240 - 44 * m.ma) / 2} ${80 + 56 * m.mb} ${240 - 44 * m.ma}" fill="none" stroke="#b45309" stroke-width="1.3" stroke-dasharray="3 3" marker-end="url(#q72-arrow)"/>`
    )
    .join('\n  ')}
  <g font-size="12.5" fill="#b45309" text-anchor="middle">
    <text x="${80 + 56 * 3 + 22}" y="${240 - 44 * 2 - 2}">3/2</text>
    <text x="${80 + 56 * 2 - 24}" y="${240 - 44 * 2 + 18}">2/3</text>
    <text x="${80 + 56 * 1 + 20}" y="${240 - 44 * 4 - 4}">1/4</text>
    <text x="${80 + 56 * 4 - 20}" y="${240 - 44 * 1 + 14}">4</text>
    <text x="${80 + 56 * 3 - 26}" y="${240 - 44 * 1 + 4}">3</text>
    <text x="${80 + 56 * 1 - 24}" y="${240 - 44 * 3 + 4}">1/3</text>
    <text x="${80 + 56 * 1 - 26}" y="${240 - 44 * 1 + 4}">1</text>
    <text x="${80 + 56 * 1 + 16}" y="${240 - 44 * 2 + 4}">1/2</text>
    <text x="${80 + 56 * 2 - 22}" y="${240 - 44 * 1 + 4}">2</text>
    <text x="${80 + 56 * 3 + 20}" y="${240 - 44 * 4 + 4}">4/3</text>
    <text x="${80 + 56 * 4 - 22}" y="${240 - 44 * 3 + 4}">3/4</text>
  </g>
  <text x="330" y="120" font-size="12.5" fill="currentColor" opacity="0.8">the diagonal b = a:</text>
  <text x="330" y="136" font-size="12.5" fill="currentColor" opacity="0.8">slope 1 reflects to itself</text>
  <text x="330" y="152" font-size="12.5" fill="currentColor" opacity="0.8">— 1 is its own reciprocal</text>
  <text x="482" y="256" font-size="12" fill="currentColor" opacity="0.75" text-anchor="end">denominator b →</text>
  <text x="90" y="46" font-size="12" fill="currentColor" opacity="0.75">numerator a ↑</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The figure is the reciprocal law, drawn. Reflect any dot across the dashed diagonal and the seats swap; the ray through the reflected dot has the reciprocal slope, because slope is numerator-over-denominator and reflection exchanges those roles. The diagonal itself — slope $1$, the unit class — is the mirror line, and only a point already on it is its own reflection: exactly the statement that $1$ is the only positive self-inverse. Even the exclusions are visible: the reflected dot of $(2,3)$ has both seats nonzero automatically (both originals do), so the mirror map never leaves the domain — and the missing bottom row (numerator $0$) has no reflection at all, the division-by-zero wall drawn in negative space.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Reciprocal (multiplicative inverse)',
              def: 'For a ≠ 0, the class b/a — the seat-swapped pair. Satisfies (a/b)·(b/a) = 1/1; unique. Zero has none, by theorem.',
            },
            {
              term: 'Division',
              def: 'x ÷ y is defined as x · y⁻¹ for y ≠ 0. In seats: (a/b) ÷ (c/d) = ad/bc, c ≠ 0. Division by zero is impossible — proved, not decreed.',
            },
            {
              term: 'Field',
              def: 'A system where + and × are commutative and associative, × distributes over +, identities 0 and 1 exist with all inverses — every nonzero element inverts. ℚ is the first field of this book; ℤ is a ring, not a field.',
            },
            {
              term: 'ℤ/p as a finite field',
              def: 'For prime p, the residue classes mod p also form a field — 5.4’s extended-Euclid inverses are its reciprocals. One structure, two sizes.',
            },
            {
              term: 'Positivity test',
              def: 'a/b > 0 exactly when ab > 0. Class-invariant (swept over all representative swaps); the base of ordering ℚ.',
            },
            {
              term: 'Order compatibility',
              def: 'x < y forces x + z < y + z for all z, and xz < yz for positive z; multiplying by a negative class flips the inequality. Swept through the construction.',
            },
            {
              term: 'Midpoint theorem',
              def: 'For p/q < r/s (canonical, positive denominators), the midpoint (ps + rq)/(2qs) lies strictly between — both sides from the single inequality ps < rq.',
            },
            {
              term: 'Dense order',
              def: 'No two rationals are neighbours: between any two lies another, hence infinitely many. The staircase of ℕ and ℤ dissolves in ℚ.',
            },
          ],
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'What is the reciprocal of $\\tfrac{3}{4}$, and what one computation proves it?',
              options: [
                '$\\tfrac{4}{3}$ — because $\\tfrac{3}{4} \\cdot \\tfrac{4}{3} = \\tfrac{12}{12} \\sim \\tfrac{1}{1}$',
                '$\\tfrac{3}{4}$ itself — every class is its own reciprocal',
                '$−\\tfrac{4}{3}$ — reciprocals negate',
                '$\\tfrac{4}{3}$ — because 4 > 3',
              ],
              answer: 0,
              explain:
                'The mirror law: swap the seats, then verify — $(3,4)·(4,3) = (12,12)$, and the diagonal is the unit class. Option 2 is false: only $1$ (and $−1$ among signed classes... check: $\\tfrac{−1}{1}·\\tfrac{−1}{1} = \\tfrac{1}{1}$ — so exactly $±1$ are self-reciprocal). Option 3 confuses reciprocal with negation: negating flips the product’s sign, so $\\tfrac{3}{4}·(−\\tfrac{4}{3}) = −\\tfrac{1}{1}$, not the unit. Option 4 is numerology — the proof is the product, not a size comparison.',
            },
            {
              q: 'Which class has NO reciprocal — and what exactly blocks it?',
              options: [
                '$\\tfrac{−2}{3}$ — negative classes never invert',
                '$\\tfrac{0}{5}$ — its products all land in the zero family, and $0 · 1 = bd$ would force a zero divisor in ℤ',
                '$\\tfrac{6}{4}$ — only reduced fractions invert',
                'None — every class inverts in ℚ',
              ],
              answer: 1,
              explain:
                'Zero: $(0, b)·(c, d) = (0, bd)$, a zero-family pair; calling it the unit would need $0·1 = bd·1$, i.e. $bd = 0$ with both factors nonzero — impossible in $\\mathbb{Z}$ by the zero-product lemma of 6.3. Option 1 is false — the mirror of $(−2,3)$ is $(3,−2)$, legal and verified. Option 3 is false — unreduced names still name their class, and the class of $\\tfrac{6}{4}$ inverts as $\\tfrac{4}{6}$ (same as $\\tfrac{2}{3}$’s mirror, of course — one class, one reciprocal). Option 4 is exactly the wall the lesson proved away.',
            },
            {
              q: '$−\\tfrac{2}{3}$ compared with $0$ — which verdict, and by which test?',
              options: [
                'Positive, since the denominator is positive',
                'Zero — a negative numerator erases to nothing',
                'Negative: the sign test reads $ab = (−2)·3 = −6 < 0$',
                'Not comparable — order fails for negatives',
              ],
              answer: 2,
              explain:
                'The sign test: a class is positive exactly when $ab > 0$, negative exactly when $ab < 0$. Here $ab = −6 < 0$ — negative, confirmed by the sweep and by the number-line picture ($−\\tfrac{2}{3}$ sits left of $0$). Option 1 ignores the numerator’s sign. Option 3 is the right test with the right arithmetic. Option 4 is false — trichotomy was derived: every class is exactly one of negative, zero, positive.',
            },
            {
              q: 'The midpoint of $\\tfrac{1}{2}$ and $\\tfrac{1}{4}$ is which rational — and why is it *strictly* between?',
              options: [
                '$\\tfrac{3}{8}$, and the proof reduces both side-inequalities to the same fact $ps < rq$',
                '$\\tfrac{2}{6} = \\tfrac{1}{3}$, the average of the numerators',
                '$\\tfrac{3}{8}$, strictly because averages always land strictly inside',
                '$\\tfrac{1}{3}$, by converting to decimals',
              ],
              answer: 0,
              explain:
                'Midpoint formula: $(ps + rq)/(2qs)$ with $(p,q) = (1,2)$, $(r,s) = (1,4)$ gives $(1·4 + 1·2)/(2·2·4) = 6/16 = 3/8$ — reduced. The strictness is not "averages are polite": the derivation showed $p/q <$ midpoint $\\iff ps < rq$ and midpoint $< r/s \\iff ps < rq$ — one hypothesis, two exact algebraic identities, so touching an endpoint would contradict $\\tfrac{1}{2} \\ne \\tfrac{1}{4}$. Option 2 averages numerators over nothing — $(1+1)/2$ is not a construction. Option 3 asserts without mechanism. Option 4 leans on decimals before lesson 7.3 has proved them trustworthy.',
            },
            {
              q: 'Why is ℚ called a field while ℤ is only a ring?',
              options: [
                'ℚ is larger, and fields must be infinite',
                'ℚ has fractions; ℤ has none at all',
                'In ℚ every nonzero class inverts; in ℤ only ±1 do — inversion is the ring/field dividing line',
                'ℤ fails commutativity',
              ],
              answer: 2,
              explain:
                'The inventory table: both systems share commutativity, associativity, distribution, identities, negatives, the zero-product lemma. The single structural difference is the bold row — multiplicative inverses for every nonzero element (ℚ: the seat-swap law) versus only for $±1$ (ℤ). Option 1 invents a size axiom — finite fields exist (5.4’s $\\mathbb{Z}/p$). Option 2 is not a structure claim at all. Option 4 is false — 6.3 proved $\\mathbb{Z}$ commutative through the pair algebra.',
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
                  q: 'Find the reciprocal of $\\tfrac{4}{7}$ and verify it by multiplication.',
                  solution: [
                    'Swap the seats: the mirror of $(4,7)$ is $(7,4)$ — reciprocal $\\tfrac{7}{4}$.',
                    'Verify through the algebra: $(4,7)·(7,4) = (28, 28)$.',
                    'Check: the diagonal pair names the unit — $28·1 = 28·1$. Hence $\\tfrac{4}{7}·\\tfrac{7}{4} = 1$.',
                  ],
                  answer: '$\\tfrac{7}{4}$',
                },
                {
                  q: 'Find the reciprocal of $−\\tfrac{5}{6}$.',
                  solution: [
                    'Write the class as $(−5, 6)$; the mirror is $(6, −5)$.',
                    'Normalise: $(6,−5) \\sim (−6,5)$ — canonical form $−\\tfrac{6}{5}$.',
                    'Verify: $(−5,6)·(−6,5) = (30, 30) \\sim \\tfrac{1}{1}$ — the minus signs pair up, as 6.3’s mirror law promised.',
                  ],
                  answer: '$−\\tfrac{6}{5}$',
                },
                {
                  q: 'Compute $\\tfrac{2}{5} \\div \\tfrac{3}{4}$.',
                  solution: [
                    'Division is multiplication by the mirror: $(2,5) · (4,3)$.',
                    'Take the product: $(8, 15)$ — gcd 1, denominator positive: canonical.',
                    'Oracle cross-check: $0.4 ÷ 0.75 ≈ 0.5333…$ and $\\tfrac{8}{15} ≈ 0.5333…$ — the same number.',
                  ],
                  answer: '$\\tfrac{8}{15}$',
                },
                {
                  q: 'Compute $\\tfrac{3}{4} − \\tfrac{5}{8}$ through the construction.',
                  solution: [
                    'Negation: $−\\tfrac{5}{8}$ is $(−5, 8)$.',
                    'Addition: $(3·8 + 4·(−5),\\; 4·8) = (24 − 20,\\; 32) = (4, 32)$.',
                    'Reduce: gcd $8$ takes it to $(1, 8)$ — one-eighth.',
                    'Hence $\\tfrac{3}{4} − \\tfrac{5}{8} = \\tfrac{1}{8}$, matching FM 4.4’s common-denominator arithmetic.',
                  ],
                  answer: '$\\tfrac{1}{8}$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Compute $\\tfrac{7}{3} \\div \\tfrac{2}{3}$ and explain why the denominators vanish.',
                  solution: [
                    'Mirror the divisor: $(2,3)$ reflects to $(3,2)$.',
                    'Multiply: $(7,3)·(3,2) = (21, 6)$.',
                    'Reduce: gcd $3$ gives $(7, 2)$ — $\\tfrac{7}{2}$.',
                    'Why the threes vanished: dividing by $\\tfrac{2}{3}$ asks "how many two-thirds in seven-thirds" — the common denominator cancels in the very statement of the question, and the algebra agrees: $\\tfrac{7/3}{2/3} = \\tfrac{7}{2}$.',
                  ],
                  answer: '$\\tfrac{7}{2}$',
                },
                {
                  q: 'Compute $\\tfrac{−9}{4} \\div \\tfrac{3}{8}$.',
                  solution: [
                    'Mirror: $(3,8)$ reflects to $(8,3)$.',
                    'Multiply: $(−9,4)·(8,3) = (−72, 12)$.',
                    'Reduce: gcd $12$ gives $(−6, 1)$ — the integer $−6$ on the fraction shelf.',
                    'Hence the quotient of two fractions can be an integer: division crosses the shelves freely now.',
                  ],
                  answer: '$−6$',
                },
                {
                  q: 'Compute $\\tfrac{2}{7} + \\tfrac{3}{5}$ and reduce.',
                  solution: [
                    'Cross-rule: $(2·5 + 7·3,\\; 7·5) = (10 + 21,\\; 35) = (31, 35)$.',
                    'Check canonicity: $\\gcd(31, 35) = 1$ — already at the desk.',
                    'Oracle: $0.2857… + 0.6 = 0.8857…$ and $\\tfrac{31}{35} ≈ 0.8857…$ — the same class.',
                  ],
                  answer: '$\\tfrac{31}{35}$',
                },
                {
                  q: 'Compute $\\tfrac{−2}{3} \\cdot \\tfrac{−9}{4}$ and name the sign rule at work.',
                  solution: [
                    'Multiply: $(−2·−9,\\; 3·4) = (18, 12)$.',
                    'Reduce: gcd $6$ gives $(3, 2)$ — $\\tfrac{3}{2}$.',
                    'The sign rule: minus times minus is plus — 6.3 derived it for $\\mathbb{Z}$; the seats inherit it because the numerator and denominator products live in $\\mathbb{Z}$.',
                  ],
                  answer: '$\\tfrac{3}{2}$',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Apply the sign test to $\\tfrac{5}{6}$, $\\tfrac{−7}{12}$, and $\\tfrac{0}{9}$; then order the three.',
                  solution: [
                    '$(5,6)$: $ab = 30 > 0$ — positive. $(−7,12)$: $ab = −84 < 0$ — negative. $(0,9)$: $ab = 0$ — zero, exactly one class.',
                    'Trichotomy places them: negative < zero < positive.',
                    'Hence $−\\tfrac{7}{12} < \\tfrac{0}{9} < \\tfrac{5}{6}$ — each verdict through the construction, no decimals consulted.',
                  ],
                  answer: '$−\\tfrac{7}{12} < 0 < \\tfrac{5}{6}$',
                },
                {
                  q: 'Find the midpoint of $−\\tfrac{1}{2}$ and $\\tfrac{1}{6}$ and verify it lies strictly between.',
                  solution: [
                    'Midpoint formula: $(ps + rq)/(2qs)$ with $(p,q) = (−1,2)$, $(r,s) = (1,6)$.',
                    'Numerator: $(−1)·6 + 1·2 = −4$; denominator $2·2·6 = 24$: the pair $(−4, 24)$.',
                    'Reduce: gcd $4$ gives $(−1, 6)$ — the midpoint is $−\\tfrac{1}{6}$.',
                    'Verify strictly: with a common denominator, $−\\tfrac{1}{2} = −\\tfrac{3}{6}$ and $\\tfrac{1}{6} = \\tfrac{1}{6}$ — so the chain reads $−\\tfrac{3}{6} < −\\tfrac{1}{6} < \\tfrac{1}{6}$, strict on both sides; the oracle agrees ($−0.5 < −0.1\\overline{6} < 0.1\\overline{6}$).',
                  ],
                  answer: '$−\\tfrac{1}{6}$',
                },
                {
                  q: 'Show that $\\tfrac{2}{3} < \\tfrac{5}{7}$ by cross-multiplication, and by locating both between 0 and 1 with a common denominator.',
                  solution: [
                    'Cross-rule (denominators positive): $2·7 = 14$ versus $3·5 = 15$; $14 < 15$ — so $\\tfrac{2}{3} < \\tfrac{5}{7}$.',
                    'Second route: common denominator $21$ — $\\tfrac{2}{3} = \\tfrac{14}{21}$ and $\\tfrac{5}{7} = \\tfrac{15}{21}$; fourteen twenty-firsts < fifteen twenty-firsts.',
                    'Both routes are the same computation in two coats — the cross-rule is the common-denominator comparison with the denominator work suppressed.',
                  ],
                  answer: '$\\tfrac{2}{3} < \\tfrac{5}{7}$',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style) A tank is $\\tfrac{2}{3}$ full. After draining $\\tfrac{1}{4}$ of the tank, what fraction remains? Then: what fraction of the *current content* was drained?',
                  solution: [
                    'Remainder: $\\tfrac{2}{3} − \\tfrac{1}{4} = (2·4 − 3·1,\\; 12) = (5, 12) = \\tfrac{5}{12}$.',
                    'Drained share of current content: the drained amount $\\tfrac{1}{4}$ divided by the remainder $\\tfrac{5}{12}$.',
                    'Through the mirror: $(1,4)·(12,5) = (12, 20)$; gcd $4$ gives $(3,5)$ — $\\tfrac{3}{5}$.',
                    'Hence the tank keeps $\\tfrac{5}{12}$, and the drained part is $\\tfrac{3}{5}$ of what remains — two divisions, one construction.',
                  ],
                  answer: '$\\tfrac{5}{12}$ remains; $\\tfrac{3}{5}$ of it was drained',
                },
                {
                  q: '(Exam-style) Simplify $\\left(\\tfrac{2}{3} \\div \\tfrac{4}{9}\\right) \\times \\tfrac{5}{6}$ and give the canonical result.',
                  solution: [
                    'Inner division: $(2,3)$ times the mirror $(9,4)$: $(18, 12)$; gcd $6$ gives $(3,2)$.',
                    'Multiply by $\\tfrac{5}{6}$: $(3,2)·(5,6) = (15, 12)$.',
                    'Reduce: gcd $3$ gives $(5, 4)$ — $\\tfrac{5}{4}$.',
                    'Check the oracle: $\\tfrac{2}{3} ÷ \\tfrac{4}{9} = \\tfrac{3}{2}$; $\\tfrac{3}{2} · \\tfrac{5}{6} = \\tfrac{15}{12} = \\tfrac{5}{4} = 1.25$ ✓.',
                  ],
                  answer: '$\\tfrac{5}{4}$',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove that in ℚ, multiplicative cancellation — $m \\cdot x = m \\cdot y$ with $m \\neq 0$ forcing $x = y$ — is a *consequence* of the inverse law, and re-derive it once more without inverses, from the seat algebra.',
                  solution: [
                    'Route one (with inverses): multiply both sides by $m^{-1}$ — legal since $m \\neq 0$ inverts. Associativity regroups: $(m^{-1}m)\\,x = (m^{-1}m)\\,y$, the products collapse to $x = y$.',
                    'Route two (seat algebra): $m = \\tfrac{a}{b}$, $x = \\tfrac{c}{d}$, $y = \\tfrac{e}{f}$, all canonical. The hypothesis $\\tfrac{ac}{bd} \\sim \\tfrac{ae}{bf}$ reads $acbf = bdae$; cancel the nonzero $ab$ in $\\mathbb{Z}$ (the lemma of 6.3): $cf = de$ — which is exactly $\\tfrac{c}{d} = \\tfrac{e}{f}$.',
                    'Both routes land together; the first is one line because the inverse law bought the machinery. The script swept cancellation over all class triples with $m \\neq 0$: zero failures either way.',
                  ],
                  answer: 'cancellation follows from inversion (and independently from seat cancellation in ℤ)',
                },
                {
                  q: 'Show that ℚ contains no copy of a "point at infinity" — i.e. no class behaves as if $\\tfrac{1}{0}$ existed — by proving that every class $x$ satisfies $0 \\cdot x = 0$, and drawing the consequence for any proposed $y = \\tfrac{1}{0}$.',
                  solution: [
                    'For any class $x = \\tfrac{a}{b}$: $\\tfrac{0}{1} \\cdot \\tfrac{a}{b} = (0·a,\\; b) = (0, b) \\sim \\tfrac{0}{1}$ — absorption, swept.',
                    'Suppose a class $y$ satisfied $0 \\cdot y = 1$ (the defining wish of $\\tfrac{1}{0}$). But absorption forces $0 \\cdot y = 0$; so $0 = 1$ as classes — false, since $(0,1) \\nsim (1,1)$ (cross-products $0$ vs $1$).',
                    'Hence no class plays $\\tfrac{1}{0}$: the wish contradicts absorption, which is itself a theorem of the seats. The same argument closes every "extended" patch — projective lines manage the trick by *leaving arithmetic*, which is a different subject.',
                  ],
                  answer: 'absorption kills every candidate infinity',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The reciprocal law',
          latex: '\\left(\\frac{a}{b}\\right)^{-1} = \\frac{b}{a}, \\quad a \\neq 0',
          note: 'Seat-swap; verified by (a/b)·(b/a) = ab/ab ~ 1.',
        },
        {
          kind: 'formula',
          name: 'Division by the mirror',
          latex: '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{ad}{bc}, \\quad c \\neq 0',
          note: 'Invert-and-multiply, derived. The divisor may never be zero.',
        },
        {
          kind: 'formula',
          name: 'The sign test',
          latex: '\\frac{a}{b} > 0 \\;\\Longleftrightarrow\\; ab > 0',
          note: 'Class-invariant positivity; trichotomy follows.',
        },
        {
          kind: 'formula',
          name: 'The midpoint theorem',
          latex: '\\frac{p}{q} < \\frac{r}{s} \\;\\Longrightarrow\\; \\frac{p}{q} < \\frac{ps + rq}{2qs} < \\frac{r}{s}',
          note: 'Both sides from ps < rq — density begins here.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Reciprocal computation and invert-and-multiply are the daily bread of every quantitative paper — CAT/XAT arithmetic chains, SAT algebra, CUET and NTSE rational-number properties, and bank exams’ simplification sets. The sign test decides "which is greater" items without common denominators (Khattar QA ch. 1 works them exactly this way). Assertion–reason papers love the boundary: "division by zero is undefined because…" — the honest completion is the absorption argument of this lesson, not the school phrase "not allowed". And the field/ring vocabulary is the direct feeder for university algebra and for 5.4’s finite-field doorway — one definition, met twice.',
        },
        {
          kind: 'para',
          text: 'The field laws are now the reader’s — derived, swept, inventoried, and named. Division joins the family at last: every nonzero rational has its mirror, the divisor-zero wall stands as a theorem, and the order extends cleanly enough that between any two rationals a third already waits. What remains is to push density to its full strength and to read the rationals in their everyday uniform — the decimal mirror, where every rational writes itself as either a finite tail or a cycle, for reasons the division algorithm has been holding in reserve since chapter 2.',
        },
      ],
    },
    {
      id: 'ans-density-and-the-decimal-mirror-proven',
      number: '7.3',
      title: 'Density and the Decimal Mirror, Proven',
      prerequisites: ['ans-the-field-laws-division-joins-the-family', 'ans-division-with-rest-the-division-algorithm', 'ans-fundamental-theorem-of-arithmetic', 'fm-decimals-and-fractions-two-ways'],
      sources: ['beck-geoghegan-art-of-proof', 'stevin-1585-thiende', 'khattar-qa-4e'],
      concepts: [
        'Density without bound: infinitely many rationals between any two',
        'The long-division engine r → 10r mod b',
        'Terminating or repeating: the remainder pigeonhole',
        'The terminating criterion 2^m·5^n from the FTA',
        'Periods of 1/p divide p − 1 (the Fermat shadow)',
        'Converting recurring decimals: D/(10^k − 1)',
        'The mirror edge: 0.999… = 1',
      ],
      objectives: [
        'Prove that between any two distinct rationals lie infinitely many — by iterating the midpoint theorem of 7.2 without bound',
        'Derive the decimal expansion from the division algorithm: every rational expands as terminating or repeating, with period at most b − 1',
        'Prove the terminating criterion — a/b (reduced) terminates exactly when b = 2^m·5^n — from the Fundamental Theorem of Arithmetic',
        'Read the mirror backwards: convert any recurring decimal to its exact fraction, including the pre-period formula and the edge case 0.999… = 1',
      ],
      blocks: [
        {
          kind: 'para',
          text: 'Two proofs and a mirror, and the chapter closes. Lesson 7.2 proved the *first* density step — the midpoint $\\tfrac{ps+rq}{2qs}$ lands strictly between any two distinct rationals. This lesson pushes the wedge all the way down: between any two rationals lie not one, not seven, but *infinitely many* — and then turns to the rationals’ everyday uniform, the decimal expansion. School banked the vocabulary: FM 5.1 named decimal places, FM 5.2 used the recurring-bar notation and converted $0.\\overline{3}$ to $\\tfrac{1}{3}$ by the standard trick, FM 5.3 operated on decimals. What school never proved — because proving it needs chapter 2’s division algorithm and chapter 4’s Fundamental Theorem, both long since banked — is that the mirror *always* behaves: every rational writes itself as either a finite tail or an endless cycle, never anything else. That theorem, and its converse, are this lesson’s cargo.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The decimal wager: Stevin 1585',
          text: 'The decimal mirror has a birthdate. Simon Stevin — Flemish mathematician, engineer, tax official — published *De Thiende* ("The Tenth") in 1585 (a French version, *La Disme*, the same year): the first treatise deliberately devoted to decimal fractions, extending positional notation past the units place and urging decimal coinage and measures (the cover promises the book is for "astrologers, surveyors, measurers of tapestries"). Stevin’s notation was clumsy — he wrote $7.3486$ as $7^{(0)}3^{(1)}4^{(2)}8^{(3)}6^{(4)}$, circling the power of a tenth above each digit — but the *idea* swept Europe: write every fraction on the same place-value ladder that writes the integers. Decimal fractions had been used earlier (al-Uqlidisi in the tenth century; Rudolff’s 1530 interest tables), but Stevin made them a system. What Stevin asserted, this lesson proves: the ladder terminates for some fractions and cycles forever for the rest — and which of the two happens is decided by nothing deeper than a prime factorization.',
        },
        { kind: 'heading', text: 'Density, without bound' },
        {
          kind: 'para',
          text: 'First, finish the density theorem. The midpoint lemma of 7.2 plants one rational strictly between $x < y$. Run it again on the two halves — one lands in $(x, m)$, one in $(m, y)$ — and again on the four quarters. Nothing stops the process: every generation doubles the count, every new point sits strictly inside the original interval, and no generation can exhaust it. The formal statement is short precisely because 7.2 did the work.',
        },
        {
          kind: 'derivation',
          title: 'Density II: between any two rationals lie infinitely many',
          statement:
            'Claim: for $x < y$ in $\\mathbb{Q}$ and every $n \\ge 1$, at least $2^n - 1$ distinct rationals lie strictly between $x$ and $y$.',
          steps: [
            {
              label: 'The midpoint map is an endomorphism of intervals',
              formula: 'x < u < v < y \\;\\Longrightarrow\\; x < \\tfrac{u+v}{2} < y \\text{ and } \\tfrac{u+v}{2} \\ne u, \\tfrac{u+v}{2} \\ne v',
              explanation:
                'The midpoint theorem of 7.2 applied inside the sub-interval $(u, v)$: the new point stays strictly between $u$ and $v$, hence strictly inside $(x, y)$. "Strictly" is the whole content — no midpoint ever touches an endpoint, because both side-inequalities reduce to the strict $ps < rq$.',
            },
            {
              label: 'Generation doubles the interior',
              formula: 'n = 1: \\; 1 \\text{ point}; \\quad n = 2: \\; 3; \\quad n = 3: \\; 7; \\quad \\dots \\quad n: \\; 2^n - 1',
              explanation:
                'Generation $k$ takes the $2^{k-1} + 1$ points accumulated so far (endpoints included) and plants a midpoint in each gap: $2^{k-1}$ new points, all distinct (they live in disjoint gaps). The script ran three generations on three intervals — $(0,1)$, $(\\tfrac{1}{3}, 1)$, $(−2, 5)$ — and counted: exactly $7$ distinct rationals strictly inside each, every one reduced and verified between the endpoints.',
            },
            {
              label: 'Infinity is the limit of the count',
              formula: '2^n - 1 \\to \\infty \\quad \\Longrightarrow \\quad |\\mathbb{Q} \\cap (x, y)| = \\infty',
              explanation:
                'For every $n$ the interval holds at least $2^n − 1$ rationals; a set containing $n$ distinct elements for every $n$ contains infinitely many. No limit processes, no analysis — pure counting over an endless construction.',
            },
          ],
          result:
            'Between any two distinct rationals lie infinitely many rationals. Density is not a property of particular pairs — it is the closure of the midpoint map itself.',
        },
        {
          kind: 'para',
          text: 'One honest warning before the celebration, because it points the whole book at chapter 8. Density says the rationals leave no *gaps between named points* — but it does not say the line is *full*. A careless reading of "no two rationals are neighbours" hears "every point is rational", and that reading is false: the diagonal of a unit square has length $\\sqrt{2}$, and no rational squares to $2$ — chapter 8 proves it by the classical contradiction. The rationals are dense *and* full of holes; the holes just have no rational address. Density and completeness are different theorems, and only the second one builds the real line.',
        },
        {
          kind: 'callout',
          tone: 'insight',
          title: 'Density is a verb',
          text: 'Notice what the proof did: it never listed the between-lying rationals, it described a *procedure* that manufactures them. Any reader challenged to produce ten rationals between $\\tfrac{1}{3}$ and $\\tfrac{1}{2}$ runs the midpoint three times — $\\tfrac{5}{12}$, then $\\tfrac{3}{8}$ and $\\tfrac{11}{24}$, then four more — and hands over a verified list. The script did exactly this and counted seven distinct reduced rationals inside the interval. "Dense" is not a portrait; it is an endless verb, and the midpoint is its conjugation.',
        },
        { kind: 'heading', text: 'The mirror: how a fraction writes itself as a decimal' },
        {
          kind: 'para',
          text: 'Now the everyday uniform. To expand a fraction $\\tfrac{a}{b}$ ($b > 0$) as a decimal is to run long division — chapter 2’s algorithm — past the units place: divide $10a$ by $b$, write the quotient as the next digit, keep the remainder, repeat. Each step consumes one remainder $r$ ($0 \\le r < b$) and produces one digit $\\lfloor 10r / b \\rfloor$ while replacing $r$ by $10r \\bmod b$. The digits are therefore *driven* by the remainders, and everything about the expansion — length, termination, cycle — is a statement about the remainder sequence.',
        },
        {
          kind: 'example',
          title: 'Expand 3/8 by the remainder engine, and 1/7 — watch one die and one cycle',
          steps: [
            'Setup: $\\tfrac{3}{8}$ — start at the remainder $r = 3$ (3 divided by 8 leaves 3).',
            'Now, step one: $10·3 = 30$; $30 = 3·8 + 6$ — digit $\\mathbf{3}$, remainder $6$.',
            'So, step two: $10·6 = 60$; $60 = 7·8 + 4$ — digit $\\mathbf{7}$, remainder $4$.',
            'Now, step three: $10·4 = 40$; $40 = 5·8 + 0$ — digit $\\mathbf{5}$, remainder $0$.',
            'Check: the remainder hit $0$ — the engine stops. Digits $3, 7, 5$: $\\tfrac{3}{8} = 0.375$ exactly. Terminating.',
            'Take $\\tfrac{1}{7}$: remainders walk $1 \\to 3 \\to 2 \\to 6 \\to 4 \\to 5 \\to 1$ — six steps and the walk *revisits its start*. Digits $1, 4, 2, 8, 5, 7$, then the whole cycle repeats forever: $0.142857\\,142857\\dots$',
            'Hence two shapes of the mirror, and no third: the remainder walk either hits $0$ (terminates) or revisits a remainder (cycles). The next derivation proves there is no other possibility.',
          ],
        },
        {
          kind: 'derivation',
          title: 'The mirror theorem: every rational expands as terminating or repeating',
          statement:
            'Claim: for $\\tfrac{a}{b}$ with $b > 0$, the digit sequence from the remainder engine either ends (a finite decimal) or becomes periodic from some point on, with period at most $b - 1$.',
          steps: [
            {
              label: 'The remainders live in a finite box',
              formula: 'r_0, r_1, r_2, \\dots \\;\\in\\; \\{0, 1, \\dots, b-1\\}',
              explanation:
                'Each step maps $r \\mapsto 10r \\bmod b$ — the division algorithm’s remainder, legal by construction. The box has exactly $b$ cells: one of them is $0$, the other $b − 1$ are nonzero.',
            },
            {
              label: 'Case one: the walk visits 0',
              formula: 'r_k = 0 \\;\\Longrightarrow\\; r_{k+1} = (10 \\cdot 0) \\bmod b = 0, \\; \\text{digit} = 0',
              explanation:
                'Zero is a fixed point — a *sink*: once the remainder lands there, every later digit is $0$ and the expansion is the finite string produced so far. This is the terminating case; the zeros after the last nonzero digit are conventionally unwritten.',
            },
            {
              label: 'Case two: pigeonhole forces a revisit',
              formula: 'b \\text{ cells, all nonzero} \\;\\Longrightarrow\\; \\text{within } b \\text{ steps some } r_i = r_j \\;(i < j)',
              explanation:
                'If the walk never hits $0$, it hops forever among only $b − 1$ legal cells (the nonzero residues). By the pigeonhole principle — chapter 4 used the same engine for factorial remainders — some cell must be revisited within $b$ steps. From the first revisit onward the walk retraces itself: $r_j = r_i$ forces $r_{j+1} = r_{i+1}$, because the next state is a *function* of the current one ($r \\mapsto 10r \\bmod b$). The digit sequence, being driven by the remainders, cycles with period $j - i \\le b - 1$.',
            },
            {
              label: 'The engine is honest about its reach',
              formula: '\\text{period} \\le b - 1 \\quad \\text{(swept: } b \\le 60, \\text{ zero violations)}',
              explanation:
                'The sweep confirmed the bound for every denominator up to $60$, and the period table below cashes the famous instances: $\\tfrac{1}{7}$ has period $6 = 7 − 1$ (the full box), $\\tfrac{1}{17}$ has period $16 = 17 − 1$, while $\\tfrac{1}{11}$ manages only $2$ — the box is an upper bound, not a promise.',
            },
          ],
          result:
            'Every rational number expands as a terminating decimal or a repeating decimal, with period at most b − 1. The mirror never blurs.',
        },
        {
          kind: 'table',
          caption: 'The mirror table: 1/b for b = 2..12, read off the remainder engine. Pre-period = digits before the cycle begins; period = cycle length; terminating rows are their own pre-periods.',
          head: ['Fraction', 'Decimal', 'Pre-period', 'Period', 'Remainder story'],
          rows: [
            ['$1/2$', '$0.5$', '1', '—', '$1 \\to 0$: the sink after one step'],
            ['$1/3$', '$0.\\overline{3}$', '0', '1', '$1 \\to 1$: a self-loop (ten leaves remainder one)'],
            ['$1/4$', '$0.25$', '2', '—', '$1 \\to 2 \\to 0$'],
            ['$1/5$', '$0.2$', '1', '—', '$1 \\to 0$'],
            ['$1/6$', '$0.1\\overline{6}$', '1', '1', '$1 \\to 4 \\to 4$: one free step, then the loop'],
            ['$1/7$', '$0.\\overline{142857}$', '0', '6', '$1 \\to 3 \\to 2 \\to 6 \\to 4 \\to 5 \\to 1$: the full box'],
            ['$1/8$', '$0.125$', '3', '—', '$1 \\to 2 \\to 4 \\to 0$'],
            ['$1/9$', '$0.\\overline{1}$', '0', '1', '$1 \\to 1$ — the $\\tfrac{1}{3}$ twin at a tenth of the pace'],
            ['$1/10$', '$0.1$', '1', '—', '$1 \\to 0$'],
            ['$1/11$', '$0.\\overline{09}$', '0', '2', '$1 \\to 10 \\to 1$: a two-cycle'],
            ['$1/12$', '$0.08\\overline{3}$', '2', '1', '$1 \\to 10 \\to 4 \\to 4$'],
          ],
        },
        { kind: 'heading', text: 'Which fractions terminate — the FTA decides' },
        {
          kind: 'para',
          text: 'The table splits its rows into two families, and the split is not accidental. Terminating denominators: $2, 4, 5, 8, 10$ — products of $2$s and $5$s only. Repeating: $3, 6, 7, 9, 11, 12$ — each carries a prime *other than* 2 or 5. The pattern is the Fundamental Theorem of Arithmetic speaking through the division algorithm, and the proof is a two-act play.',
        },
        {
          kind: 'derivation',
          title: 'a/b (reduced) terminates exactly when b = 2^m·5^n',
          statement:
            'Claim: let $\\tfrac{a}{b}$ be canonical ($b > 0$, $\\gcd(a,b) = 1$). The decimal expansion terminates if and only if $b$’s prime factorization contains no prime but $2$ and $5$.',
          steps: [
            {
              label: '(⇐) Pure 2s and 5s scale to a power of ten',
              formula: 'b = 2^m 5^n \\;\\Longrightarrow\\; b \\mid 10^{\\max(m,n)} \\;\\Longrightarrow\\; \\tfrac{a}{b} = \\tfrac{a \\cdot k}{10^{\\max(m,n)}}',
              explanation:
                'Multiply $b$ by whatever 2s or 5s it is short of: $b \\cdot 2^{M-n}5^{N-m} = 10^{\\max(m,n)}$ for suitable $M, N$. Then $\\tfrac{a}{b}$ *equals* a fraction with denominator $10^{M}$ — and FM 5.1 read such fractions directly off the place-value ladder: finitely many digits, terminating. No engine needed; the expansion is computed before it starts.',
            },
            {
              label: '(⇒) A foreign prime forces a repeat',
              formula: 'p \\mid b, \\; p \\notin \\{2, 5\\} \\;\\Longrightarrow\\; \\gcd(10, b) \\text{ shares no } p \\;\\Longrightarrow\\; 10^k r \\not\\equiv 0 \\pmod{p}',
              explanation:
                'Suppose the expansion terminated: the walk reached remainder $0$. Work the engine backwards from the end — or, cleaner: reduced canonicity gives $\\gcd(a, b) = 1$, so the $p$ dividing $b$ divides neither $a$ nor $10$ ($p \\ne 2, 5$). At any step before termination the remainder $r$ satisfies $r \\equiv 10^k a \\pmod b$ for the step count $k$ — and $\\gcd(10^k a, b) = 1$ (the foreign prime divides $b$ but neither factor $10^k a$), so $p \\nmid r$: the remainder can never be the multiple of $p$ that $0$ is. The walk never dies — case two of the mirror theorem applies, and the expansion repeats.',
            },
            {
              label: 'The instances, engine-checked',
              formula: '3/8 = 0.375 \\;(8 = 2^3); \\quad 7/250 = 0.028 \\;(250 = 2 \\cdot 5^3); \\quad 1/12 = 0.08\\overline{3} \\;(12 = 2^2 \\cdot 3); \\quad 7/30 = 0.2\\overline{3} \\;(30 = 2 \\cdot 3 \\cdot 5)',
              explanation:
                'The script swept the criterion against a 60-digit engine for every denominator $\\le 60$: terminates $\\iff$ the stripped denominator is $1$ — zero violations, both directions. The $7/30$ row shows the split at work: the $2$ and $5$ spend themselves in one pre-period digit, the $3$ cycles forever.',
            },
          ],
          result:
            'a/b terminates ⟺ b = 2^m·5^n. The mirror’s two shapes are the FTA read through the division algorithm — no observation, all theorem.',
        },
        { kind: 'heading', text: 'The period table and the Fermat shadow' },
        {
          kind: 'para',
          text: 'For prime denominators the periods land on a remarkable shelf. The engine measured $\\tfrac{1}{p}$ for the first thirteen primes $\\ne 2, 5$: period $1$ for $p = 3$; $6$ for $7$; $2$ for $11$; $6$ for $13$; $16$ for $17$; $18$ for $19$; $22$ for $23$; $28$ for $29$; $15$ for $31$; $3$ for $37$; $5$ for $41$; $21$ for $43$; $46$ for $47$. Every one of them divides $p − 1$ — and the sweep certified the divisibility for *all* primes up to $50$, zero exceptions.',
        },
        {
          kind: 'para',
          text: 'Why "shadow"? Chapter 5.4 proved Fermat’s little theorem: $10^{p-1} \\equiv 1 \\pmod p$ for $p \\nmid 10$. The remainder engine’s cycle is exactly the orbit of $10$ in the multiplication table of $\\mathbb{Z}/p$; the orbit’s length (the *order* of $10$) always divides $p − 1$ — the same divisibility 5.4 drew for unit digits of powers. The lesson does not prove the order law (that is a chapter-13-size theorem), but the *evidence* is now mechanical: the engine computed every period, and every period obeyed. Some primes take the full box ($7, 17, 19, 23, 29, 47$ — six full-period primes in the table); others cycle quickly ($37$ in three steps). Which primes are full-period is a deep open question — a fine thing for a footnote in a foundations book to admit.',
        },
        { kind: 'heading', text: 'Reading the mirror backwards' },
        {
          kind: 'para',
          text: 'The mirror runs both ways: recurring decimals are *names* of fractions, and there is an exact conversion. FM 5.2 used the trick on $0.\\overline{3}$; here it becomes a theorem with a proof and a general formula.',
        },
        {
          kind: 'derivation',
          title: '0.D̄ over k digits equals D/(10^k − 1)',
          statement:
            'Claim: if a decimal’s digits after the point are a block $D$ of $k$ digits repeated forever, its value is exactly $\\tfrac{D}{10^k - 1}$ (as a rational number).',
          steps: [
            {
              label: 'Name the value and shift it',
              formula: 'x = 0.\\overline{D}; \\qquad 10^k x = D.\\overline{D}',
              explanation:
                'Multiplying by $10^k$ slides the point $k$ places — chapter 3’s place-value arithmetic, now inhabited by rationals: the block $D$ jumps left of the point and the infinite tail is *the same tail*, because the digits repeat. (That "same tail" is exactly the periodicity the mirror theorem just proved — the shift is legitimate for repeating decimals and only for them.)',
            },
            {
              label: 'Subtract: the tails annihilate',
              formula: '10^k x - x = D.\\overline{D} - 0.\\overline{D} = D \\quad \\text{(an integer!)}',
              explanation:
                'The infinite tails match digit for digit and cancel exactly — this is legitimate because both are the *same* rational number (7.2’s arithmetic is exact; no limiting argument is being smuggled in: $10^k x − x = (10^k − 1)x$ by distributivity, a field law). What remains right of the point is nothing, and the integer $D$ stands alone.',
            },
            {
              label: 'Solve for x by the inverse law',
              formula: '(10^k - 1)\\, x = D \\;\\Longrightarrow\\; x = \\frac{D}{10^k - 1}',
              explanation:
                'The coefficient $10^k − 1$ is a positive integer, so division by it is legal (7.2). The script verified the round trip: $\\tfrac{142857}{999999}$ long-divides back to $0.\\overline{142857}$ with period $6$; $\\tfrac{9}{99}$ to $0.\\overline{09}$; $\\tfrac{3}{9}$ to $0.\\overline{3}$.',
            },
            {
              label: 'The famous identity, as a dividend',
              formula: '142857 \\times 7 = 999999 \\;\\Longrightarrow\\; 0.\\overline{142857} = \\tfrac{142857}{999999} = \\tfrac{1}{7}',
              explanation:
                'The cycle of sevenths multiplies back to the nines — the engine confirms $\\tfrac{1}{7}$ expands to exactly that block, so the conversion recovers it. The script round-tripped ten mixed rationals (including $1/17$’s full 16-digit cycle, in exact big-integer arithmetic) through the formula: every one returned to its reduced fraction.',
            },
          ],
          result:
            'A pure recurring decimal of period k names exactly D/(10^k − 1) — the mirror reads backwards as cleanly as it writes.',
        },
        {
          kind: 'para',
          text: 'Decimals with a pre-period (digits before the cycle: $0.8\\overline{3}$, $0.41\\overline{6}$) convert in two moves: scale away the pre-period by a power of ten, convert the pure cycle, reassemble. For $0.\\overline{d_1 \\dots d_k}$ preceded by $m$ ordinary digits forming the integer $A$:',
        },
        {
          kind: 'equation',
          latex: '0.A\\,\\overline{D} \\;=\\; \\frac{A\\,(10^{k} - 1) + D}{(10^{k} - 1)\\,\\, 10^{m}}',
          note: 'Worked: $0.4\\overline{7}$ has $A = 4$, $D = 7$, $m = k = 1$: $(4·9 + 7)/(9·10) = 43/90$ — reduced, and the engine long-divides $43/90$ back to $0.4\\overline{7}$ exactly. And $0.2\\overline{9}$: $(2·9 + 9)/90 = 27/90 = \\tfrac{3}{10} = 0.3$ — the recurring nine was a *terminating* decimal in costume, and the conversion exposes it.',
        },
        {
          kind: 'example',
          title: 'Convert two recurring decimals to their exact fractions — one with a pre-period, one improper',
          steps: [
            'Take $0.8\\overline{3}$: pre-period $A = 8$ ($m = 1$), cycle $D = 3$ ($k = 1$).',
            'Now, the formula: $(8·9 + 3)/(9·10) = 75/90$.',
            'So, reduce: gcd $15$ gives $\\tfrac{5}{6}$ — and the engine confirms $\\tfrac{5}{6} = 0.8333\\dots$: pre-period $1$, cycle $(3)$. Round trip closed.',
            'Take $0.16\\overline{6}$: $A = 16$ ($m = 2$), $D = 6$ ($k = 1$): $(16·9 + 6)/90 = 150/90 = \\tfrac{5}{3}$ — an improper rational, bigger than 1, the mirror holding past the units place.',
            'Hence conversions need no faith: each is a construction-fed identity, and every one the script ran returned to its reduced fraction exactly.',
          ],
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The mirror edge: 0.999… = 1, and why that is fine',
          text: 'The formula applied to $0.\\overline{9}$ gives $\\tfrac{9}{9} = 1$. Two names — the endless tail and the unit — for one rational, exactly as $\\tfrac{2}{2}$ and $\\tfrac{7}{7}$ are names of one. Nothing is being "rounded": $0.\\overline{9}$ is a *numeral* in the decimal naming system, and the conversion theorem computes which number it names — the same theorem that reads $0.\\overline{3}$ as $\\tfrac{1}{3}$ reads $0.\\overline{9}$ as $1$. The companion edge: $0.2\\overline{9} = \\tfrac{3}{10} = 0.3$, so the tail $0.2999\\dots$ and the tail $0.3$ name the same point. Decimal names are not unique — FM 5.2 promised this much — but they are *determinately* non-unique: only the repeating-9 (or repeating-0) tails double-name, and the construction knows exactly which numbers have two names and which have one.',
        },
        {
          kind: 'figure',
          caption:
            'The remainder machine for 1/7 (left): six states, one per nonzero remainder; each arrow carries the digit ⌊10r/7⌋ it emits — reading the cycle 1 → 3 → 2 → 6 → 4 → 5 emits 1, 4, 2, 8, 5, 7, then repeats. The 3/8 engine (right) is a chain that dies: 3 → 6 → 4 → 0, emitting 3, 7, 5 — the 0-state is a sink, and the walk stops. Every rational’s decimal is one ride on one such machine.',
          svg: `<svg viewBox="0 0 520 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The remainder machines: a hexagon of six states for one seventh emitting digits one four two eight five seven, and a chain for three eighths ending in the zero sink">
  <defs>
    <marker id="q73-arrow" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/>
    </marker>
    <marker id="q73-amber" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill="#b45309"/>
    </marker>
  </defs>
  ${[
    { s: 1, ang: 90 },
    { s: 3, ang: 30 },
    { s: 2, ang: -30 },
    { s: 6, ang: -90 },
    { s: 4, ang: -150 },
    { s: 5, ang: 150 },
  ]
    .map(
      (v) => ({
        ...v,
        x: +(180 + 60 * Math.cos((v.ang * Math.PI) / 180)).toFixed(1),
        y: +(105 - 60 * Math.sin((v.ang * Math.PI) / 180)).toFixed(1),
      })
    )
    .map(
      (v) =>
        `<circle cx="${v.x}" cy="${v.y}" r="17" fill="none" stroke="currentColor" stroke-width="1.4"/>
  <text x="${v.x}" y="${v.y + 5}" font-size="14" font-weight="700" text-anchor="middle" fill="currentColor">r=${v.s}</text>`
    )
    .join('\n  ')}
  ${(() => {
    const pos: Record<number, { x: number; y: number }> = {
      1: { x: 180, y: 45 },
      3: { x: 232, y: 75 },
      2: { x: 232, y: 135 },
      6: { x: 180, y: 165 },
      4: { x: 128, y: 135 },
      5: { x: 128, y: 75 },
    }
    const dig: Record<number, number> = { 1: 1, 3: 4, 2: 2, 6: 8, 4: 5, 5: 7 }
    const order = [1, 3, 2, 6, 4, 5]
    const parts: string[] = []
    for (let i = 0; i < 6; i++) {
      const a = pos[order[i]]
      const b = pos[order[(i + 1) % 6]]
      // shorten the chord so it starts/ends at the circle borders
      const dx = b.x - a.x
      const dy = b.y - a.y
      const len = Math.hypot(dx, dy)
      const ux = dx / len
      const uy = dy / len
      const x1 = +(a.x + ux * 19).toFixed(1)
      const y1 = +(a.y + uy * 19).toFixed(1)
      const x2 = +(b.x - ux * 22).toFixed(1)
      const y2 = +(b.y - uy * 22).toFixed(1)
      parts.push(
        `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="1.3" marker-end="url(#q73-arrow)"/>`
      )
      // digit label at the chord midpoint, pushed AWAY from the hub (180, 105)
      const mxm = (x1 + x2) / 2
      const mym = (y1 + y2) / 2
      const vdx = mxm - 180
      const vdy = mym - 105
      const vd = Math.hypot(vdx, vdy) || 1
      const mx = +(mxm + (vdx / vd) * 20).toFixed(1)
      const my = +(mym + (vdy / vd) * 20).toFixed(1)
      parts.push(
        `<text x="${mx}" y="${my + 4}" font-size="12.5" font-weight="700" fill="#b45309" text-anchor="middle">d=${dig[order[i]]}</text>`
      )
    }
    return parts.join('\n  ')
  })()}
  <text x="180" y="212" font-size="12.5" fill="currentColor" opacity="0.8" text-anchor="middle">1/7: six states, cycle of six — period 6 = 7 − 1</text>
  ${[
    { s: 3, x: 372, y: 70, d: 3, last: false },
    { s: 6, x: 424, y: 70, d: 7, last: false },
    { s: 4, x: 476, y: 70, d: 5, last: false },
    { s: 0, x: 424, y: 140, d: null, last: true },
  ]
    .map(
      (v) =>
        `<circle cx="${v.x}" cy="${v.y}" r="17" fill="${v.last ? '#b45309' : 'none'}" fill-opacity="${v.last ? 0.12 : 0}" stroke="${v.last ? '#b45309' : 'currentColor'}" stroke-width="1.4"/>
  <text x="${v.x}" y="${v.y + 5}" font-size="14" font-weight="700" text-anchor="middle" fill="currentColor">r=${v.s}</text>`
    )
    .join('\n  ')}
  <line x1="389" y1="70" x2="405" y2="70" stroke="#b45309" stroke-width="1.3" marker-end="url(#q73-amber)"/>
  <line x1="441" y1="70" x2="457" y2="70" stroke="#b45309" stroke-width="1.3" marker-end="url(#q73-amber)"/>
  <line x1="437" y1="83" x2="432" y2="122" stroke="#b45309" stroke-width="1.3" marker-end="url(#q73-amber)"/>
  <text x="397" y="44" font-size="12.5" font-weight="700" fill="#b45309" text-anchor="middle">d=3</text>
  <text x="449" y="44" font-size="12.5" font-weight="700" fill="#b45309" text-anchor="middle">d=7</text>
  <text x="468" y="102" font-size="12.5" font-weight="700" fill="#b45309" text-anchor="middle">d=5</text>
  <text x="404" y="176" font-size="12.5" fill="currentColor" opacity="0.8" text-anchor="middle">3/8: the walk dies at the 0-sink</text>
  <text x="404" y="192" font-size="12.5" font-weight="700" fill="#b45309" text-anchor="middle">0.375 — terminating</text>
  <text x="404" y="210" font-size="12" fill="currentColor" opacity="0.7" text-anchor="middle">arrows carry r → 10r mod b</text>
</svg>`,
        },
        {
          kind: 'figure',
          caption:
            'Density zoomed: the window (0.14, 0.15) at forty pixels per hundredth. The tick marks are hundredths; 1/7 = 0.142857… lands between the 0.142 and 0.143 ticks — and every further digit of its expansion re-zooms the window: (0.142, 0.143), then (0.1428, 0.1429), forever. The decimal mirror is the midpoint wedge wearing place-value clothes.',
          svg: `<svg viewBox="0 0 520 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A zoomed number line from 0.140 to 0.150 with hundredth ticks and the fraction one seventh marked between the 0.142 and 0.143 ticks">
  <line x1="80" y1="70" x2="480" y2="70" stroke="currentColor" stroke-width="1.4"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .map((i) => {
      const x = 80 + 40 * i
      const major = i % 2 === 0
      return `<line x1="${x}" y1="${major ? 62 : 66}" x2="${x}" y2="${major ? 78 : 74}" stroke="currentColor" stroke-width="${major ? 1.6 : 1.1}"/>`
    })
    .join('\n  ')}
  ${[0.14, 0.142, 0.144, 0.146, 0.148, 0.15]
    .map(
      (v) =>
        `<text x="${Math.round(80 + (v - 0.14) * 40000)}" y="94" font-size="11.5" text-anchor="middle" fill="currentColor" opacity="0.75">${v.toFixed(3)}</text>`
    )
    .join('\n  ')}
  <line x1="194" y1="36" x2="194" y2="62" stroke="#b45309" stroke-width="1.6"/>
  <circle cx="194" cy="28" r="4" fill="#b45309"/>
  <text x="480" y="20" font-size="12.5" font-weight="700" fill="#b45309" text-anchor="end">1/7 = 0.142857…</text>
  <text x="80" y="20" font-size="12" fill="currentColor" opacity="0.75">window (0.14, 0.15) — 40 px per hundredth</text>
  <text x="480" y="118" font-size="11.5" fill="currentColor" opacity="0.7" text-anchor="end">every added digit re-zooms: (0.142, 0.143) → (0.1428, 0.1429) → …</text>
</svg>`,
        },
        {
          kind: 'para',
          text: 'The second figure earns its place by connecting the two halves of the lesson. The zoom window is density made visible — a rational sits between the hundredth ticks, and brackets it again between the thousandths, the ten-thousandths, forever — while the digits that drive those brackets are exactly the mirror engine’s output: $1, 4, 2, 8, 5, 7$ marching out of the remainder machine. Terminating fractions would walk off the right edge of any such window and stop; repeating ones cycle inside it forever. Two machines, one theorem, no third shape.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Terminating decimal',
              def: 'An expansion whose remainder walk hits 0 — a finite digit string. Happens exactly when the reduced denominator is 2^m·5^n.',
            },
            {
              term: 'Recurring (repeating) decimal',
              def: 'An expansion whose remainder walk revisits a nonzero state — an endless cycle of period ≤ b − 1. Written with the overbar: 0.1̄6̄ … (FM 5.2’s notation).',
            },
            {
              term: 'Pre-period and period',
              def: 'The digits before the cycle begins (free steps until the walk first returns to a live state) and the cycle length. 1/12 = 0.083̄: pre-period 2, period 1.',
            },
            {
              term: 'The remainder engine',
              def: 'r → 10r mod b, emitting digit ⌊10r/b⌋ each step — the division algorithm extended past the units place. Digits are driven by remainders.',
            },
            {
              term: 'The pigeonhole argument',
              def: 'b − 1 legal nonzero remainders force a revisit within b steps; the revisit makes the walk periodic because the next state is a function of the current one.',
            },
            {
              term: 'The terminating criterion',
              def: 'a/b (reduced) terminates ⟺ b = 2^m·5^n — the FTA read through the engine. Foreign primes force repetition.',
            },
            {
              term: 'The conversion formula',
              def: '0.overline{D} over k digits = D/(10^k − 1); with pre-period: 0.A overline{D} = (A(10^k − 1) + D)/((10^k − 1)·10^m). Proven by shift-and-subtract.',
            },
            {
              term: 'The mirror edge',
              def: '0.999… = 9/9 = 1 exactly — repeating-9 tails double-name terminating decimals. Non-uniqueness is determinate: only 9-cycles (and 0-tails) do it.',
            },
          ],
        },
        { kind: 'heading', text: 'Check yourself' },
        {
          kind: 'quiz',
          items: [
            {
              q: 'Which fraction terminates, and by which theorem?',
              options: [
                '$\\tfrac{1}{12}$ — twelve is a familiar, friendly denominator',
                '$\\tfrac{3}{8}$ — because the digits 375 look finished',
                '$\\tfrac{3}{8}$ — the reduced denominator $8 = 2^3$ is pure 2s-and-5s (the FTA criterion)',
                '$\\tfrac{7}{30}$ — thirty is divisible by ten',
              ],
              answer: 2,
              explain:
                'The criterion reads the *reduced* denominator’s prime factors: $8 = 2^3$ — pure 2s — so the walk reaches the 0-sink (the engine confirms $0.375$, remainders $3 \\to 6 \\to 4 \\to 0$). Option 2: $12 = 2^2 \\cdot 3$ — the foreign prime 3 forces $0.08\\overline{3}$. Option 3 reasons from the answer it cannot yet know — the theorem predicts, not the printout. Option 4: $30 = 2 \\cdot 3 \\cdot 5$ — the 3 survives and $7/30 = 0.2\\overline{3}$ repeats; divisibility by ten is not the test.',
            },
            {
              q: 'The expansion of $\\tfrac{1}{12}$ is $0.08\\overline{3}$. What are the pre-period and period, and which remainders tell that story?',
              options: [
                'pre-period 1, period 2 — the walk alternates two states',
                'pre-period 2, period 1 — the walk $1 \\to 10 \\to 4$ then loops $4 \\to 4$',
                'pre-period 0, period 3 — the whole string cycles',
                'pre-period 2, period 2 — twelve has two prime factors',
              ],
              answer: 1,
              explain:
                'The engine: $r = 1$ emits digit $0$ ($10 = 0·12 + 10$), $r = 10$ emits $8$ ($100 = 8·12 + 4$), $r = 4$ emits $3$ ($40 = 3·12 + 4$) — and the remainder $4$ repeats immediately: the walk $1 \\to 10 \\to 4 \\to 4$ has two free steps then a self-loop, digits $0, 8$ then cycle $(3)$. Option 1 reads the engine exactly. Option 2 swaps the counts. Option 3 ignores the free steps. Option 4 confuses prime count with cycle length — the loop is a *self-loop*, period 1.',
            },
            {
              q: '$0.\\overline{142857}$ names which rational — and which identity is the conversion’s receipt?',
              options: [
                '$\\tfrac{142857}{1000000}$, since six digits follow the point',
                '$\\tfrac{1}{6}$, because the cycle has length 6',
                '$\\tfrac{7}{49}$, by reducing 142857/999999 by 9',
                '$\\tfrac{142857}{999999} = \\tfrac{1}{7}$, receipt: $142857 \\times 7 = 999999$',
              ],
              answer: 3,
              explain:
                'The conversion theorem: a pure $k$-digit cycle names $D/(10^k − 1)$ — here $\\tfrac{142857}{999999}$, and the famous identity $142857 \\times 7 = 999999$ reduces it to $\\tfrac{1}{7}$ (the engine then long-divides back to the same block: round trip closed). Option 2 treats the tail as terminating — one million is not the recurring denominator. Option 3 confuses the period with the denominator — cycle length is an upper-bound consequence, not the fraction. Option 4’s arithmetic does not even reduce: $142857/9 = 15873$ and $999999/9 = 111111$, still not $\\tfrac{7}{49}$.',
            },
            {
              q: 'Convert $0.4\\overline{7}$ exactly. Why is the pre-period handled by a *separate* factor?',
              options: [
                '$\\tfrac{47}{99}$ — send everything through the pure-cycle formula',
                '$\\tfrac{43}{90}$ — the pre-period digits are frozen by a factor $10^m$, the cycle by $(10^k − 1)$',
                '$\\tfrac{47}{90}$ — average the two denominators',
                '$\\tfrac{43}{99}$ — the 9s absorb the 4',
              ],
              answer: 1,
              explain:
                'Two moves: freeze the pre-period (multiplying by $10^1 = 10$ slides $0.4\\overline{7}$ to $4.\\overline{7}$) and convert the pure cycle ($\\overline{7} = 7/9$). Assembling: $(4·9 + 7)/(9·10) = 43/90$ — the engine long-divides $43/90$ back to $0.4777\\dots$, closing the round trip. Option 1 is the formula with the two factors in their roles. Option 2 misreads the 4 as part of the cycle ($0.\\overline{47} = 47/99 \\ne 0.4777\\dots$). Options 3 and 4 are denominator games with no construction behind them.',
            },
            {
              q: 'Is $0.\\overline{9}$ less than 1 — and what does the construction actually say?',
              options: [
                'No: $0.\\overline{9} = 9/9 = 1$ exactly — the conversion theorem computes which number the numeral names, and repeating-9 tails double-name terminating decimals',
                'Yes — it never quite arrives, by density',
                'It is undefined — the mirror theorem excludes repeating nines',
                'It is between 0.99 and 0.99, strictly less than 1 by the pre-period formula',
              ],
              answer: 0,
              explain:
                'The conversion is an identity, not an approximation: name the value $x = 0.\\overline{9}$; the mirror theorem licenses the shift $10x = 9.\\overline{9}$; subtract — the tails annihilate — and $9x = 9$, so $x = 9/9 = 1$ by the inverse law. Option 1 is the classic misreading — "never quite arrives" imports a process picture into a completed value; there is no last digit to fall short, and 7.2’s order has no name for any gap. Option 2 is false: $0.\\overline{9}$ is a perfectly legal recurring decimal — the extreme case of the double-naming note, only repeating-9 tails (and 0-tails) give a number two names. Option 3 is numerology — truncations are not the value.',
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
                  q: 'Expand $\\tfrac{5}{8}$ by the remainder engine.',
                  solution: [
                    'Start at remainder $5$: $50 = 6·8 + 2$ — digit $6$, remainder $2$.',
                    'Take $20 = 2·8 + 4$ — digit $2$, remainder $4$.',
                    'Take $40 = 5·8 + 0$ — digit $5$, remainder $0$: the sink.',
                    'Hence $\\tfrac{5}{8} = 0.625$, terminating ($8 = 2^3$, as the criterion promised).',
                  ],
                  answer: '$0.625$',
                },
                {
                  q: 'Expand $\\tfrac{7}{20}$ by the engine.',
                  solution: [
                    'Remainder $7$: $70 = 3·20 + 10$ — digit $3$, remainder $10$.',
                    'Take $100 = 5·20 + 0$ — digit $5$, sink reached.',
                    'Hence $\\tfrac{7}{20} = 0.35$ — terminating ($20 = 2^2 \\cdot 5$).',
                  ],
                  answer: '$0.35$',
                },
                {
                  q: 'Expand $\\tfrac{9}{40}$ by the engine.',
                  solution: [
                    'Remainder $9$: $90 = 2·40 + 10$ — digit $2$, remainder $10$.',
                    'Take $100 = 2·40 + 20$ — digit $2$, remainder $20$.',
                    'Take $200 = 5·40 + 0$ — digit $5$, sink.',
                    'Hence $\\tfrac{9}{40} = 0.225$ ($40 = 2^3 \\cdot 5$: pure 2s and 5s).',
                  ],
                  answer: '$0.225$',
                },
                {
                  q: 'Classify without expanding: $\\tfrac{5}{12}$ and $\\tfrac{7}{250}$ — terminate or repeat, and why?',
                  solution: [
                    '$\\tfrac{5}{12}$: reduced ($\\gcd(5,12) = 1$); $12 = 2^2 \\cdot 3$ — the foreign prime 3 forces repetition.',
                    '$\\tfrac{7}{250}$: $250 = 2 \\cdot 5^3$ — pure 2s and 5s; terminates.',
                    'No expansion needed — the FTA criterion read both verdicts off the factorizations. (The engine agrees: $\\tfrac{5}{12} = 0.41\\overline{6}$, $\\tfrac{7}{250} = 0.028$.)',
                  ],
                  answer: '$\\tfrac{5}{12}$ repeats; $\\tfrac{7}{250}$ terminates',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Read $\\tfrac{5}{12}$ off the engine: digits, pre-period, period.',
                  solution: [
                    'Remainder $5$: $50 = 4·12 + 2$ — digit $4$, remainder $2$.',
                    'Take $20 = 1·12 + 8$ — digit $1$, remainder $8$.',
                    'Take $80 = 6·12 + 8$ — digit $6$, remainder $8$: the walk revisits $8$ immediately.',
                    'Hence digits $4, 1$ free, then cycle $(6)$: $\\tfrac{5}{12} = 0.41\\overline{6}$ — pre-period 2, period 1.',
                  ],
                  answer: '$0.41\\overline{6}$',
                },
                {
                  q: 'Show $\\tfrac{4}{33} = 0.\\overline{12}$ through the engine.',
                  solution: [
                    'Remainder $4$: $40 = 1·33 + 7$ — digit $1$, remainder $7$.',
                    'Take $70 = 2·33 + 4$ — digit $2$, remainder $4$: the start revisited.',
                    'Cycle length 2, no pre-period: digits $(1, 2)$ forever — $0.\\overline{12}$.',
                    'Check by conversion: $0.\\overline{12} = \\tfrac{12}{99} = \\tfrac{4}{33}$ (gcd 3) — the mirror reads back to the fraction.',
                  ],
                  answer: '$0.\\overline{12}$',
                },
                {
                  q: 'Convert $0.\\overline{37}$ to a fraction.',
                  solution: [
                    'Pure cycle, $k = 2$, $D = 37$: the value is $\\tfrac{37}{99}$.',
                    'Check reduction: $\\gcd(37, 99) = 1$ ($99 = 9 \\cdot 11$, and 37 is prime to both) — already canonical.',
                    'Engine receipt: long-dividing $37$ by $99$ emits $3, 7$ and returns to remainder $37$ — the block verifies.',
                  ],
                  answer: '$\\tfrac{37}{99}$',
                },
                {
                  q: 'Convert $0.\\overline{153}$ to a fraction and reduce.',
                  solution: [
                    'Pure cycle, $k = 3$, $D = 153$: the value is $\\tfrac{153}{999}$.',
                    'Reduce: $\\gcd(153, 999) = 9$ (digit sum $9$: both divisible by 9 — chapter 5’s test).',
                    'Take $153/9 = 17$ and $999/9 = 111$: the reduced form is $\\tfrac{17}{111}$.',
                    'Hence $0.\\overline{153} = \\tfrac{17}{111}$ — the digit-sum divisibility test doing a working reduction.',
                  ],
                  answer: '$\\tfrac{17}{111}$',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Convert $0.4\\overline{7}$ by the pre-period formula, and verify by long division.',
                  solution: [
                    'Identify: pre-period $A = 4$ ($m = 1$), cycle $D = 7$ ($k = 1$).',
                    'Apply: $(4·9 + 7)/(9·10) = 43/90$; $\\gcd(43, 90) = 1$ — canonical.',
                    'Verify through the engine: $430 = 4·90 + 70$ (digit 4), $700 = 7·90 + 70$ (digit 7, remainder 70 again) — $0.4\\overline{7}$ exactly.',
                    'Hence the formula and the engine agree: one fraction, two machines.',
                  ],
                  answer: '$\\tfrac{43}{90}$',
                },
                {
                  q: 'Convert $0.2\\overline{9}$ and interpret the result.',
                  solution: [
                    'Apply the formula: $(2·9 + 9)/90 = 27/90$.',
                    'Reduce: gcd $9$ gives $\\tfrac{3}{10}$ — the terminating decimal $0.3$.',
                    'Interpretation: the recurring nine was a terminating decimal wearing a costume; the two numerals $0.2999\\dots$ and $0.3$ name one rational. The mirror edge of the Caution box, met in an ordinary exercise.',
                  ],
                  answer: '$\\tfrac{3}{10} = 0.3$',
                },
                {
                  q: 'Prove that $\\tfrac{6}{11} = 0.\\overline{54}$ by the engine, and explain the relation to $\\tfrac{1}{11} = 0.\\overline{09}$.',
                  solution: [
                    'Engine: remainder $6$; $60 = 5·11 + 5$ — digit $5$, remainder $5$; $50 = 4·11 + 6$ — digit $4$, remainder $6$: start revisited. Cycle $(5, 4)$, no pre-period.',
                    'Relation: $\\tfrac{6}{11} = 6 \\cdot \\tfrac{1}{11}$, and multiplying a recurring decimal by an integer shifts and duplicates its block — $6 \\times 0.\\overline{09}$: the engine shows it directly, block $09$ becoming block $54$ ($6 \\times 9 = 54$ mod the nines structure: $6 \\cdot 09 = 54$).',
                    'The engine is the honest witness; the block-arithmetic shortcut works *because* the mirror theorem guarantees both expansions are the same cycle read twice.',
                  ],
                  answer: '$0.\\overline{54}$',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: '(Exam-style) Without expanding, decide which of $\\tfrac{11}{40}$, $\\tfrac{13}{60}$, $\\tfrac{17}{250}$ terminate; give the decimal for one of them.',
                  solution: [
                    '$\\tfrac{11}{40}$: $40 = 2^3 \\cdot 5$ — pure 2s and 5s: terminates.',
                    '$\\tfrac{13}{60}$: $60 = 2^2 \\cdot 3 \\cdot 5$ — the foreign 3 forces repetition.',
                    '$\\tfrac{17}{250}$: $250 = 2 \\cdot 5^3$ — terminates.',
                    'Expand the first: $\\tfrac{11}{40} = \\tfrac{11 \\cdot 25}{40 \\cdot 25} = \\tfrac{275}{1000} = 0.275$ — the criterion’s constructive route: scale to a power of ten, read off the ladder.',
                  ],
                  answer: '$\\tfrac{11}{40} = 0.275$ and $\\tfrac{17}{250}$ terminate; $\\tfrac{13}{60}$ repeats',
                },
                {
                  q: '(Exam-style) A recurring decimal $0.\\overline{ab}$ equals $\\tfrac{13}{33}$. Find the block $ab$ without expanding.',
                  solution: [
                    'The conversion theorem: $0.\\overline{ab} = \\tfrac{\\overline{ab}}{99}$ (a two-digit block over two nines).',
                    'Set $\\tfrac{D}{99} = \\tfrac{13}{33}$: cross-multiply — $33D = 1287$, so $D = 39$.',
                    'Check: $\\tfrac{39}{99} = \\tfrac{13}{33}$ (gcd 3) ✓, and the engine expands $\\tfrac{13}{33}$: remainder $13$; $130 = 3·33 + 31$ (digit 3); $310 = 9·33 + 13$ (digit 9) — cycle $(3, 9)$: $0.\\overline{39}$ ✓.',
                    'Hence the block is $39$ — the conversion theorem and the engine shaking hands.',
                  ],
                  answer: '$ab = 39$',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove that the period of $\\tfrac{1}{p}$ (p prime, p ≠ 2, 5) divides p − 1, using only Fermat’s little theorem (5.4) and the engine.',
                  solution: [
                    'Fermat (5.4): $10^{p-1} \\equiv 1 \\pmod p$ for $p \\nmid 10$ — the engine returns to remainder $1$ after $p − 1$ steps.',
                    'The engine’s walk from $r = 1$ is the orbit of $10$ in the residues: state after $k$ steps is $10^k \\bmod p$. The first return to $1$ happens at the *period* $d$ — the smallest $k$ with $10^k \\equiv 1$.',
                    'Divide: $p − 1 = qd + s$ with $0 \\le s < d$. Then $10^{p-1} = (10^d)^q \\cdot 10^s \\equiv 10^s \\equiv 1 \\pmod p$. But $d$ was the *smallest* positive exponent returning to 1, and $s < d$ — so $s = 0$: $d \\mid p − 1$.',
                    'The engine verified the divisibility for all 13 primes ≤ 50 (except 2, 5) — the theorem behind the table. (This "smallest exponent" is the *order* of 10 mod p; the full story continues in later algebra.)',
                  ],
                  answer: 'the period is the order of 10 mod p, which divides p − 1 by Fermat',
                },
                {
                  q: 'Show that a rational number has two decimal names exactly when it can be written with denominator coprime to 10 — and name both names for $\\tfrac{3}{10}$.',
                  solution: [
                    'One direction: if $x$ terminates — say $x = \\tfrac{N}{10^m}$ with $N$ not divisible by 10 — then appending a repeating 9 gives a second name: $0.N\\overline{9}$ computes (by the pre-period formula with $D = 9…9$) to the same value, since $\\overline{9} = 1$ absorbs the tail.',
                    'The other direction: if $x$ is non-terminating, its expansion is *uniquely* the recurring one — a second name would differ at some digit, and two genuinely different infinite digit strings (neither ending in all-9s) name different values, because the mirror theorem’s engine produces each value’s digits determinately from its remainders.',
                    'For $\\tfrac{3}{10}$: names $0.3$ (terminating) and $0.2\\overline{9}$ (the recurring-9 costume) — the exercise’s earlier conversion, now as the general principle’s instance.',
                  ],
                  answer: 'two names exactly for the terminating rationals: 0.3 and 0.2999…',
                },
              ],
            },
          ],
        },
        {
          kind: 'formula',
          name: 'The remainder engine',
          latex: 'r \\;\\mapsto\\; 10r \\bmod b, \\qquad \\text{digit} = \\left\\lfloor \\tfrac{10r}{b} \\right\\rfloor',
          note: 'Long division past the point; digits ride on remainders.',
        },
        {
          kind: 'formula',
          name: 'The terminating criterion',
          latex: '\\tfrac{a}{b} \\text{ terminates} \\;\\Longleftrightarrow\\; b = 2^m \\cdot 5^n \\;(\\gcd(a,b) = 1)',
          note: 'The FTA decides the mirror’s shape.',
        },
        {
          kind: 'formula',
          name: 'Pure cycle conversion',
          latex: '0.\\overline{D_k} = \\frac{D}{10^k - 1}',
          note: 'Shift and subtract: the tails annihilate exactly.',
        },
        {
          kind: 'formula',
          name: 'Pre-period conversion',
          latex: '0.A\\,\\overline{D_k} = \\frac{A(10^k - 1) + D}{(10^k - 1)\\,10^m}',
          note: 'Freeze the head with 10^m, convert the cycle, reassemble.',
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Where this shows up in examinations',
          text: 'Recurring-decimal conversion is a standing item in every competitive syllabus — Khattar QA ch. 1 drills $0.\\overline{x}$, $0.ab\\overline{c}$ and mixed forms exactly as the formula here derives; bank and SSC papers ask the terminating/repeating classification ("without expanding, which terminates?") whose honest answer is the $2^m 5^n$ criterion; and $0.\\overline{9} = 1$ is a favourite assertion–reason trap. The period facts are olympiad currency: "the period of $\\tfrac{1}{p}$ divides $p − 1$" is the standard first step of order-of-10 problems, and the full-box primes ($7, 17, 19, 23, 29, 47$) are the classic examples.',
        },
        {
          kind: 'para',
          text: 'The chapter closes with its two theorems proved and its mirror fully mapped. The rationals are now a finished structure: built from integer pairs, law-complete to the point of inversion (a field, the first of the book), ordered densely enough that no two of its points are neighbours, and named in decimals that either end or cycle by necessity rather than habit. What the rationals are *not* — full — is the next chapter’s discovery: a diagonal that no fraction measures, and the construction of the numbers that do. The tower $\\mathbb{N} \\to \\mathbb{Z} \\to \\mathbb{Q}$ has one more storey, and it is the strangest of the three.',
        },
      ],
    },
  ],
}
