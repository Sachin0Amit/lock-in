import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 2 "Angles, Parallel Lines and the Transversal"
 * (OPENED by the RUN 126 swarm with lesson 2.1; CLOSED COMPLETE by RUN 127,
 * 2026-11-26 — the maths lane, whole-chapter cadence, v9.1 protocol).
 *
 * The four seats: 2.1 'Angles: Types, Pairs and Measures' (96/96, run 126);
 * 2.2 'Parallel Lines and the Fifth Postulate' — the run-126 seat died at
 * the subagent deadline wall with ~15% on disk; RUN 127 salvaged it with TWO
 * SPLIT smaller-spec seats per amendment 5 (127-a prose: 7,769 words at
 * green; 127-b back half: quiz + 15 exercises + coda, landed 47KB on disk
 * when its agent hit the wall — write-early-often made it count) and the
 * orchestrator splice: 72/72 engine+pins GREEN, 11,909 words, quiz
 * [1,2,0,3,1]; 2.3 'The Transversal: the Eight-Angle Census' (106/106,
 * banked whole run 126); 2.4 'Angle Sum of a Triangle and Its Consequences'
 * (125/125, banked whole run 126).
 *
 * PROVENANCE: ground = the run-126 web-verified research pass (Euclid does
 * not use the fifth postulate until I.29 — Joyce's Elements; Proclus c. 450
 * CE "ought even to be struck out of the Postulates altogether"; the
 * Playfair/Saccheri/Lobachevsky/Bolyai ladder) — every URL banked in
 * docs/project/SOURCE_LOG.md under geo-ch02-web-ground. STUDY-NEVER-
 * REPRODUCE absolute: every roster, witness, figure, Illustration, quiz item
 * and exercise below is OUR OWN, engine-pinned in scripts/verify-book5-ch02.ts
 * (which re-runs the verify-first harnesses against THIS file and closes with
 * the CLOSED chapter census).
 */
/* ================================================================== */
/* lesson 2.1 — from docs/research/geo-ch02-wip/part-geo201.ts            */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c21 = {
  ink: '#166534', // primary text — rich green ink
  mid: '#65a30d', // mid text — bright lime
  teal: '#0d9488', // captions, light strokes, secondary structure
  tealInk: '#0f766e', // teal ink text
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#16a34a', // structure strokes — boxes, axes, node circles
  panel: '#fef3c7', // amber tinted fill
  panel2: '#ffedd5', // orange tinted fill
  sep: '#fcd34d', // light separators
  faint: '#5eead4', // faint dots, unpicked borders
  white: '#ffffff',
  paper: '#fffdf5',
}
const f21 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo21 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo21Txt = (
  x: number, y: number, s: string,
  size = 13, color = c21.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f21}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo21Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c21.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo21Dot = (x: number, y: number, color = c21.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo21Circ = (cx: number, cy: number, r: number, color = c21.teal, w = 2.5): string =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${w}"/>`

const geo21Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo21Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo21Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c21.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return (
    geo21Line(x1, y1, x2, y2, color, w) + geo21Head(x2, y2, a, color, 8)
  )
}
void geo21Arrow

/** circular arc centred (cx, cy), radius r, from a0 to a1 in SVG degrees
 *  (y grows downward). The sweep takes the direct route; |a1 − a0| > 180
 *  sets the large-arc flag. Every constant stays derived, never eyeballed. */
const geo21Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number,
  color = c21.amber, w = 2, dash = '',
): string => {
  const pt = (a: number): [number, number] => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)]
  const [x0, y0] = pt(a0)
  const [x1, y1] = pt(a1)
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0
  const sweep = a1 >= a0 ? 1 : 0
  return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

/** arc + arrowhead at its far end (sweeping a0 → a1) */
const geo21ArcArrow = (
  cx: number, cy: number, r: number, a0: number, a1: number,
  color = c21.orange, w = 2,
): string => {
  const endX = cx + r * Math.cos((a1 * Math.PI) / 180)
  const endY = cy + r * Math.sin((a1 * Math.PI) / 180)
  const dir = a1 >= a0 ? 1 : -1
  return geo21Arc(cx, cy, r, a0, a1, color, w) + geo21Head(endX, endY, a1 + 90 * dir, color, 9)
}

const geo21Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/* ================================================================== */
/* LESSON 2.1 — Angles: Types, Pairs and Measures                      */
/* ================================================================== */
export const lessonGeo201: Lesson = {
  id: 'geo-angles-types-pairs-and-measures',
  number: '2.1',
  title: 'Angles: Types, Pairs and Measures',
  concepts: [
    'angle',
    'vertex',
    'degree',
    'angle bisector',
    'complementary angles',
    'supplementary angles',
    'linear pair',
    'vertically opposite angles',
  ],
  objectives: [
    'Name an angle in all three notations, and identify its vertex, arms, interior and exterior',
    'Convert freely between degrees, minutes and seconds, and read a protractor without falling for the two-scale trap',
    'Classify any measure into the seven-family census, with honest treatment of the boundary values 90°, 180° and 360°',
    'Solve for unknown angles in complementary, supplementary, linear-pair and vertically-opposite configurations, including ratio problems',
    'Prove the two results of the lesson — vertically opposite angles are equal, and the bisectors of a linear pair are perpendicular',
    'Compute the angle between clock hands from the hand speeds 6° and 0.5° per minute',
  ],
  prerequisites: ['geo-incidence-how-points-lines-and-planes-interlock'],
  sources: ['geo-euclid-elements', 'geo-ch02-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'From rules to measures' },
    {
      kind: 'para',
      text: 'Chapter 1 built the rules of the game. We agreed on the undefined words, assumed the postulates, met the common notions, and even proved our first theorems about how points and lines interlock. But everything in that chapter was qualitative: a line was straight or it was not, two lines met or they did not, and no question ever asked HOW MUCH. This chapter is where geometry acquires numbers. The plan of the whole chapter is one long arithmetic of the angle: first the measure of a single angle and its families (this lesson), then parallel lines and the famous postulate that governs them (2.2), then the eight-angle census a transversal creates (2.3), and finally the payoff — the angle sum of a triangle (2.4). If the last chapter drew the board, this one rolls the dice.',
    },
    {
      kind: 'para',
      text: 'The object we shall measure could hardly be simpler. Take two rays that start at the same point. That is all an angle is: a vertex (the shared starting point), two arms (the rays), and the amount of turning needed to swing one arm onto the other. An angle is not the arms themselves — length plays no part in it — it is the OPENING between them, the rotation. A tiny pair of short arms opening wide and a huge pair of long arms opening narrowly are measured by exactly the same rule. This is why angle measurement needed its own unit: length is compared to a metre, but turning is compared to a full revolution.',
    },
    {
      kind: 'para',
      text: 'Notation first, because a misread angle label wrecks every computation downstream. When the arms of the angle run from the vertex $B$ out through the points $A$ and $C$, we write $\\angle ABC$, with the vertex letter in the MIDDLE. We shall name this the vertex-in-the-middle convention and keep it for the whole lesson: three letters, vertex central, one letter on each arm. A single letter ($\\angle B$) is used when only one angle lives at that vertex, and a small Greek letter or a number ($\\angle x$, $\\angle 1$) labels an angle directly on diagrams. The convention matters because at a busy crossing point like the centre of an X, four angles share one vertex — the three-letter name with the vertex in the middle is the only unambiguous one.',
    },
    {
      kind: 'para',
      text: 'An angle also divides the plane, and the two regions have names you will need at once. For an angle smaller than a straight angle, the INTERIOR is the region you sweep through when rotating the first arm onto the second the short way — it is the region that contains the arc you would draw to mark the angle. The EXTERIOR is everything else. A handy test: the interior of an angle less than $180^\\circ$ contains the segment joining any two of its interior points — it is a convex region — while the exterior wraps all the way around the back. For a reflex angle (larger than $180^\\circ$, which we shall meet in the census) the roles swap: what we casually call "the inside of the opening" is then the exterior of the reflex angle. Keep the test in mind; it quietly decides which angles a diagram is actually naming.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — angle, vertex, arms',
      text: 'An angle is the figure formed by two rays (the arms, or sides) sharing a common endpoint (the vertex); equivalently it is the amount of rotation about the vertex needed to carry one arm onto the other. The angle is written $\\angle ABC$ where $B$ is the vertex and $A$, $C$ lie one on each arm — the vertex-in-the-middle convention. An angle less than a straight angle splits the plane into its interior (the convex region between the arms) and its exterior (the rest).',
    },
    {
      kind: 'para',
      text: 'One more piece of honesty before the numbers arrive. Lesson 1.1 drew the distinction between undefined words and defined ones, and the angle sits interestingly on that line: Euclid defines it (Book I, Definition 8: "a plane angle is the inclination to one another of two lines in a plane which meet one another but do not lie in a straight line"), while a modern treatment measures angles by rotation instead, because rotation behaves better for reflex angles. Both readings agree on everything up to a straight angle; we shall use the rotation reading so that angles beyond $180^\\circ$ are first-class citizens, and we shall flag the boundary exactly where the two conventions part ways.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the degree: history, minutes and seconds, the protractor     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The degree: a full turn cut into 360 pieces' },
    {
      kind: 'para',
      text: 'To measure turning we need a unit, and the unit the world settled on is the DEGREE: one degree (written $1^\\circ$) is one three-hundred-and-sixtieth of a full revolution. A full turn is $360^\\circ$; a half turn is $180^\\circ$; a quarter turn is $90^\\circ$. The choice of 360 is ancient, deliberate and — by the standards of units — genuinely good, and its story is worth two honest minutes because it explains the strange arithmetic of minutes and seconds that follows.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Historical note — why 360?',
      text: 'The degree was inherited from Babylonian astronomy, a culture that computed in base 60 (a sexagesimal system). The number 60 is a counting champion: it is divisible by 2, 3, 4, 5, 6, 10, 12, 15, 20 and 30, which makes fractions of a turn come out in whole numbers of degrees. Add the astronomical accident that the year is roughly 360 days — the sun advances about one degree per day against the fixed stars — and cutting the full turn into 360 parts became the natural calendar-friendly choice. The Greeks later standardised the measured angle on this Babylonian base and built the whole of elementary geometry on it; the degree arrived in Euclid\'s world as the working currency of angle measure, and every astronomy textbook since has kept the change.',
    },
    {
      kind: 'para',
      text: 'The sexagesimal legacy survives inside the degree itself. Because the Babylonians counted in sixties, each degree is divided into 60 MINUTES (written $1^\\circ = 60\'$, using the prime symbol) and each minute into 60 SECONDS ($1\' = 60\'\'$). The names are borrowed from Latin — partes minutae primae, "first small parts", and partes minutae secundae, "second small parts" — and the same scheme gives us the minutes and seconds of the clock face, which is why time and angle share a language. Chaining the two divisions, one degree is $3600$ seconds.',
    },
    {
      kind: 'equation',
      latex: '1^\\circ = 60\' = 3600\'\' \\quad\\text{and}\\quad 1\' = 60\'\'',
      note: 'the sexagesimal chain inside a single degree — read the primes as minutes and double primes as seconds of arc',
    },
    {
      kind: 'para',
      text: 'Converting between the two currencies is pure arithmetic. To collapse a measure like $10^\\circ 30\'$ into decimal degrees, the minutes must be scaled by $\\tfrac{1}{60}$: since $30\' = 30 \\times \\tfrac{1}{60}^\\circ = 0.5^\\circ$, the measure is $10.5^\\circ$. Going the other way, $0.1^\\circ$ is $0.1 \\times 60 = 6\'$, six arcminutes. The exercises make you do this both ways with less round numbers; the only rule ever needed is "sixty smaller units make one bigger one", exactly as with hours and minutes.',
    },
    {
      kind: 'para',
      text: 'The instrument that reads degrees off a drawing is the PROTRACTOR: a half-circle (or full circle) whose rim is graduated from $0^\\circ$ to $180^\\circ$. To use it, you place its centre dot on the vertex of the angle, align the zero line (the baseline) with one arm, and read where the other arm crosses the rim scale. That sounds foolproof, and it nearly is — except for the trap built into every protractor ever manufactured.',
    },
    {
      kind: 'figure',
      caption: 'The protractor and its two-scale trap. The outer scale runs $0 \\to 180$ left to right along the rim; the inner scale runs $180 \\to 0$. A ray at $50^\\circ$ from the right-hand baseline reads 50 on the outer scale (green, correct) and 130 on the inner scale (red, wrong) — the two readings are supplements of each other. The rule: read from the scale whose zero sits on the arm you aligned.',
      svg: (() => {
        const ox = 450, oy = 300, R = 210
        const p = (r: number, deg: number): [number, number] => [ox + r * Math.cos((deg * Math.PI) / 180), oy + r * Math.sin((deg * Math.PI) / 180)]
        const parts: string[] = [geo21Txt(450, 26, 'THE PROTRACTOR HAS TWO SCALES — READ FROM THE ZERO YOU CHOSE', 13, c21.ink, 'middle', '700')]
        parts.push(geo21Line(ox - 235, oy, ox + 235, oy, c21.green, 2.5))
        parts.push(geo21Arc(ox, oy, R, 0, -180, c21.green, 2.5))
        for (let d = 0; d <= 180; d += 10) {
          const major = d % 30 === 0
          const [xa, ya] = p(R, -d)
          const [xb, yb] = p(major ? R - 25 : R - 15, -d)
          parts.push(geo21Line(xa, ya, xb, yb, major ? c21.green : c21.teal, major ? 2 : 1.4))
        }
        for (let d = 0; d <= 180; d += 30) {
          const [x, y] = p(R + 24, -d)
          /* the end labels (d = 0, 180) sit clear of the baseline stroke (VLM fix, run 127) */
          const dy = d === 0 || d === 180 ? 18 : 4
          parts.push(geo21Txt(x, y + dy, String(d), 11.5, c21.tealInk))
        }
        for (let d = 0; d <= 180; d += 30) {
          const [x, y] = p(R - 56, -d)
          const dy = d === 0 || d === 180 ? 18 : 4
          parts.push(geo21Txt(x, y + dy, String(180 - d), 11.5, c21.mid))
        }
        const [rx, ry] = p(R, -50)
        parts.push(geo21Line(ox, oy, rx, ry, c21.orange, 3))
        parts.push(geo21Dot(ox, oy, c21.ink, 4.5))
        parts.push(geo21Txt(ox, oy + 26, 'centre', 12, c21.tealInk))
        parts.push(geo21Arc(ox, oy, 62, 0, -50, c21.orange, 2))
        parts.push(geo21Txt(ox + (74 * Math.cos((25 * Math.PI) / 180)), oy - (74 * Math.sin((25 * Math.PI) / 180)) + 4, '50°', 13, c21.orange, 'middle', '700'))
        const [gx, gy] = p(R + 24, -50)
        parts.push(geo21Txt(gx + 12, gy - 12, 'correct: 50°', 12, c21.green, 'start', '700'))
        const [wx, wy] = p(R - 56, -50)
        parts.push(geo21Line(wx - 6, wy - 6, wx + 6, wy + 6, c21.red, 2))
        parts.push(geo21Line(wx + 6, wy - 6, wx - 6, wy + 6, c21.red, 2))
        /* the wrong-scale label moved below the ray, clear of the 30 tick and the
           inner-scale arc (VLM fix, run 127): a thin leader ties it to the X mark */
        parts.push(geo21Line(553, 190, 560, 238, c21.red, 1.4))
        parts.push(geo21Txt(566, 252, 'wrong scale: 130°', 12, c21.red, 'start', '700'))
        parts.push(geo21Txt(450, 356, 'outer scale runs 0 → 180 left to right; inner scale runs 180 → 0 — one reading is right, the other is its supplement', 12, c21.tealInk))
        return geo21Svg(900, 370, 'A half-circle protractor with two rim scales and a ray at fifty degrees: the correct outer-scale reading of fifty degrees in green and the wrong inner-scale reading of one hundred thirty degrees crossed out in red.', parts)
      })(),
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution — the two-scale trap',
      text: 'Every protractor prints two scales, running in opposite directions, because sometimes your angle opens from the left baseline and sometimes from the right. If you align the zero of the outer scale with one arm but then read the inner scale (or vice versa), you do not get a small error — you get the SUPPLEMENT of the true measure. A $50^\\circ$ angle reads 130; a $130^\\circ$ angle reads 50. The habit that defeats the trap: after reading, estimate first ("this looks acute"), then sanity-check the number against the picture, and always read from the scale whose zero you actually used.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the type census                                              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The type census: seven families of angle' },
    {
      kind: 'para',
      text: 'With a unit in hand, angles can be sorted into families by size, and the sorting — the CENSUS of angle types — is the first piece of this lesson that every later chapter leans on. The census has seven families. Four are single exact values: the degenerate angle $0^\\circ$ (the two arms coincide — no opening at all), the right angle $90^\\circ$ (a quarter turn), the straight angle $180^\\circ$ (a half turn, the arms forming one straight line) and the complete angle $360^\\circ$ (the full turn, arms coincident again). The remaining three families are the open intervals BETWEEN those values: acute angles (strictly between $0^\\circ$ and $90^\\circ$), obtuse angles (strictly between $90^\\circ$ and $180^\\circ$) and reflex angles (strictly between $180^\\circ$ and $360^\\circ$). Here is the full table, then the six drawable families to scale.',
    },
    {
      kind: 'table',
      caption: 'The seven-family census of angles by measure — exact-value families own their boundaries',
      head: ['Family', 'Measure', 'The picture to hold', 'Everyday anchor'],
      rows: [
        ['Degenerate', '$x = 0^\\circ$', 'arms coincide, no opening', 'a closed door viewed edge-on'],
        ['Acute', '$0^\\circ < x < 90^\\circ$', 'a narrow, sharp opening', 'a laptop opened a little'],
        ['Right', '$x = 90^\\circ$', 'a quarter turn, square corner', 'the corner of a page'],
        ['Obtuse', '$90^\\circ < x < 180^\\circ$', 'a wide, blunt opening', 'a laptop opened wide'],
        ['Straight', '$x = 180^\\circ$', 'a half turn, one straight line', 'a book opened flat'],
        ['Reflex', '$180^\\circ < x < 360^\\circ$', 'the LONG way round between the arms', 'a door swung past open toward closed'],
        ['Complete', '$x = 360^\\circ$', 'the full turn, arms coincide again', 'a skater\'s full rotation'],
      ],
    },
    {
      kind: 'figure',
      caption: 'The type census to scale: six angles drawn from a common-style vertex with their degree arcs — acute $50^\\circ$, right $90^\\circ$, obtuse $130^\\circ$, straight $180^\\circ$, reflex $240^\\circ$ (the long way round, arc sweeping through the bottom), complete $360^\\circ$ (the full-turn arrow). The degenerate $0^\\circ$ angle cannot be drawn: its arms coincide.',
      svg: (() => {
        const cells: Array<{ m: number; name: string; range: string }> = [
          { m: 50, name: 'ACUTE', range: '0° &lt; x &lt; 90°' },
          { m: 90, name: 'RIGHT', range: 'x = 90°' },
          { m: 130, name: 'OBTUSE', range: '90° &lt; x &lt; 180°' },
          { m: 180, name: 'STRAIGHT', range: 'x = 180°' },
          { m: 240, name: 'REFLEX', range: '180° &lt; x &lt; 360°' },
          { m: 360, name: 'COMPLETE', range: 'x = 360°' },
        ]
        const parts: string[] = [geo21Txt(450, 22, 'THE TYPE CENSUS — SIX ANGLES DRAWN TO SCALE', 13, c21.ink, 'middle', '700')]
        cells.forEach((c, i) => {
          const cx = 75 + i * 150
          const cy = 118
          const R = 56
          const end = (deg: number): [number, number] => [cx + R * Math.cos((deg * Math.PI) / 180), cy + R * Math.sin((deg * Math.PI) / 180)]
          parts.push(geo21Line(cx, cy, cx + R, cy, c21.green, 2.5))
          if (c.m === 360) {
            parts.push(geo21ArcArrow(cx, cy, 26, 0, -348, c21.orange, 2))
          } else {
            const [ex, ey] = end(-c.m)
            parts.push(geo21Line(cx, cy, ex, ey, c21.green, 2.5))
          }
          if (c.m === 90) {
            parts.push(`<path d="M ${cx + 16} ${cy} L ${cx + 16} ${cy - 16} L ${cx} ${cy - 16}" fill="none" stroke="${c21.amber}" stroke-width="2"/>`)
          } else if (c.m === 360) {
            // no interior arc needed beyond the full-turn arrow
          } else {
            parts.push(geo21Arc(cx, cy, c.m === 240 ? 22 : 30, 0, -c.m, c21.amber, 2))
          }
          const mid = -c.m / 2
          const lx = cx + 44 * Math.cos((mid * Math.PI) / 180)
          const ly = cy + 44 * Math.sin((mid * Math.PI) / 180)
          parts.push(geo21Txt(lx, ly + 4, `${c.m}°`, 12.5, c21.orange, 'middle', '700'))
          parts.push(geo21Dot(cx, cy, c21.ink, 4))
          parts.push(geo21Txt(cx, 200, c.name, 12.5, c21.ink, 'middle', '700'))
          parts.push(geo21Txt(cx, 222, c.range, 11, c21.tealInk))
        })
        return geo21Svg(900, 240, 'Six angles drawn to scale in a row: an acute angle of fifty degrees, a right angle of ninety degrees with a square corner mark, an obtuse angle of one hundred thirty degrees, a straight angle of one hundred eighty degrees, a reflex angle of two hundred forty degrees with its arc sweeping the long way, and a complete full-turn angle of three hundred sixty degrees with a circular arrow.', parts)
      })(),
    },
    {
      kind: 'para',
      text: 'The boundaries deserve their own paragraph, because they are where marks are lost. A measure of $89.9^\\circ$ is acute — it is strictly less than $90^\\circ$, and the acute family asks for nothing more. A measure of $90^\\circ$ is NOT acute: it is exactly a right angle, its own family. And $90.1^\\circ$ is already obtuse — one tenth of a degree past the boundary switches families. The same discipline holds at the next boundary: $180^\\circ$ is straight, not obtuse, and anything at all beyond it, even $180.5^\\circ$, is reflex. The census is a partition: every measure from $0^\\circ$ to $360^\\circ$ lands in exactly one family, and the exact-value families own their boundary points outright.',
    },
    {
      kind: 'para',
      text: 'The reflex family is the newcomer, and it deserves a proper welcome. For example, run the classification drill on four measures that hug the boundaries:',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        '$89.9^\\circ$ — acute, because $0 < 89.9 < 90$; being a tenth of a degree shy of the boundary changes nothing.',
        '$90^\\circ$ — right: the exact-value family claims it, and no interval family may take it.',
        '$90.1^\\circ$ — obtuse, because $90 < 90.1 < 180$; the boundary is crossed, however narrowly.',
        '$269.5^\\circ$ — reflex, because $180 < 269.5 < 360$; note the measure is more than half a turn.',
      ],
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Note — every angle has a reflex partner',
      text: 'For every angle of measure $x$ with $0^\\circ \\le x \\le 360^\\circ$, the turn the other way round between the same two arms measures $360^\\circ - x$ — its reflex partner. An angle of $118^\\circ$ hides a reflex partner of $242^\\circ$ between the very same arms, and the two measures always sum to $360^\\circ$, the full turn. This pairing is why a diagram must be read carefully: the same two rays determine TWO angles, and prose or arrowheads tell you which one is meant. When we speak of "the angle between two lines" without qualification, we always mean the one that is at most $180^\\circ$.',
    },

    /* -------------------------------------------------------------- */
    /* 4. angle addition and the bisector                              */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Angle addition and the bisector' },
    {
      kind: 'para',
      text: 'Measurement would be pointless if measures did not combine, and they combine by the simplest possible law — the law your protractor has been quietly using all along. Suppose a ray $BD$ runs through the INTERIOR of $\\angle ABC$, splitting it into $\\angle ABD$ and $\\angle DBC$. Then the two smaller measures add up to the whole: the part swept from arm $BA$ to arm $BD$, plus the part swept from arm $BD$ to arm $BC$, is exactly the sweep from $BA$ to $BC$. This is the angle addition property, and it is the workhorse of every angle problem in this book — nearly every solution in the exercises below opens by splitting or merging angles with it.',
    },
    {
      kind: 'equation',
      latex: 'm\\angle ABD + m\\angle DBC = m\\angle ABC \\quad (D \\text{ interior to } \\angle ABC)',
      note: 'angle addition — the protractor\'s law: measures of adjacent pieces sum to the measure of the whole',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — adjacent angles and the angle bisector',
      text: 'Two angles are ADJACENT if they share a vertex and one arm, with their interiors not overlapping. A ray is the BISECTOR of an angle if it runs through the vertex and splits the angle into two equal adjacent angles: $BD$ bisects $\\angle ABC$ when $m\\angle ABD = m\\angle DBC$, each equal to half of $m\\angle ABC$. The word literally means "cut in two" — the bisector is the fairness line of the angle.',
    },
    {
      kind: 'para',
      text: 'The bisector turns one equation into two: if $BD$ bisects $\\angle ABC$, then $m\\angle ABD = m\\angle DBC = \\tfrac{1}{2} m\\angle ABC$. For example, a few instant halvings from the census:',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'bisect a right angle and each half is $45^\\circ$ — the angle that is its own complement, as we shall prove shortly;',
        'bisect a $118^\\circ$ angle and each half is $59^\\circ$;',
        'bisect a straight angle and each half is $90^\\circ$ — the bisector of a straight angle stands perpendicular to the line, a fact we revisit below.',
      ],
    },
    {
      kind: 'para',
      text: 'One honest boundary note: an angle of $0^\\circ$ or $360^\\circ$ has every one of its rays as a "bisector" (both halves are zero), so the interesting bisection questions live strictly between. How do you actually CONSTRUCT a bisector with compass and straightedge — no measuring allowed? That is a job for the constructions chapter, Chapter 8, where the perpendicular-bisector machinery lives; here we only compute with bisectors we are given or can infer.',
    },
    {
      kind: 'formula',
      name: 'Angle bisector halves the measure',
      latex: 'BD \\text{ bisects } \\angle ABC \\Rightarrow m\\angle ABD = m\\angle DBC = \\tfrac{1}{2} m\\angle ABC',
      note: 'the bisector converts one angle equation into two equal halves',
    },

    /* -------------------------------------------------------------- */
    /* 5. the pairs — the heart of the lesson                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Complementary and supplementary: the two completions' },
    {
      kind: 'para',
      text: 'Single angles have families; PAIRS of angles have relationships, and two of those relationships run this entire chapter. Both are named for what they accomplish rather than for how they look — and the naming is the best mnemonic you will ever be handed. When two angles TOGETHER complete a right angle, they are complementary; when they complete a straight angle (a half turn), they are supplementary. The words sound alike, which is precisely why examiners love them; anchor them by size — complement completes to 90, supplement completes to 180 — and by the shared prefix with "complete" and "supply".',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — complementary angles',
      text: 'Two angles are COMPLEMENTARY if the sum of their measures is exactly $90^\\circ$. If one of them measures $x$, the other — its COMPLEMENT — measures $90^\\circ - x$. Both members of a complementary pair are necessarily acute (or degenerate at $0^\\circ$): each is $90^\\circ$ minus a non-negative amount, so neither can reach $90^\\circ$.',
    },
    {
      kind: 'para',
      text: 'The completion picture is worth drawing in your head once, permanently: two arms of a right angle with a third ray slicing the interior — the two angles on either side of the slice are complements, because together they complete the square corner. The complement of $37^\\circ$ is $90^\\circ - 37^\\circ = 53^\\circ$; the complement of $45^\\circ$ is $45^\\circ$ again — the only angle that is its own complement, a fact the engine pins and an exercise makes you prove. And when a complementary pair sits in ratio $4:5$, the parts are $40^\\circ$ and $50^\\circ$: nine parts make $90^\\circ$, so one part is $10^\\circ$, and the angles are four and five parts respectively.',
    },
    {
      kind: 'formula',
      name: 'Complement of x',
      latex: 'x + (90^\\circ - x) = 90^\\circ',
      note: 'the complement-OF rule: complement of $x$ is $90 - x$ — pairs-WITH is the sum statement, the exam trap below',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — supplementary angles',
      text: 'Two angles are SUPPLEMENTARY if the sum of their measures is exactly $180^\\circ$. If one of them measures $x$, the other — its SUPPLEMENT — measures $180^\\circ - x$. A supplementary pair always completes a straight angle: draw the two arms of a straight line through the vertex, slice with a third ray, and the two angles on either side are supplements.',
    },
    {
      kind: 'para',
      text: 'Same arithmetic, bigger total. The supplement of $124^\\circ$ is $180^\\circ - 124^\\circ = 56^\\circ$; the supplement of $90^\\circ$ is $90^\\circ$ again — the right angle is its own supplement. And when a supplementary pair sits in ratio $2:3$, the parts are $72^\\circ$ and $108^\\circ$: five parts make $180^\\circ$, so a part is $36^\\circ$, and the angles are $2 \\times 36^\\circ = 72^\\circ$ and $3 \\times 36^\\circ = 108^\\circ$. Watch that pair — it returns as the worked ratio problem and as a figure in the exercises.',
    },
    {
      kind: 'formula',
      name: 'Supplement of x',
      latex: 'x + (180^\\circ - x) = 180^\\circ',
      note: 'the supplement-OF rule: supplement of $x$ is $180 - x$',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution — supplementary does NOT mean adjacent',
      text: 'The single most common misconception in this topic is that complementary or supplementary angles must sit next to each other in a diagram. They need not. Two angles of $72^\\circ$ and $108^\\circ$ drawn in separate corners of separate figures, on separate pages, are perfectly supplementary: the definitions demand only the SUM, never the placement. Adjacency is an extra structural condition with its own name — it arrives in the next paragraph as the linear pair, and the difference between the two claims is exactly the difference between "supplementary" and "linear pair". In one direction they relate: a linear pair is always supplementary. In the other direction they do not: supplementary does not force adjacency.',
    },
    {
      kind: 'heading',
      text: 'At a crossing: linear pairs and vertically opposite angles' },
    {
      kind: 'para',
      text: 'Now put the structure back in. When two angles are adjacent AND their non-common arms point in exactly opposite directions, something special happens: those two outer arms together form one straight line through the vertex. Such a pair is called a LINEAR PAIR — "linear" because the picture is a line — and it is the strongest way two angles can be supplementary, strong enough to earn its own theorem.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — linear pair',
      text: 'Two angles form a LINEAR PAIR if they are adjacent (shared vertex, shared arm, non-overlapping interiors) and their non-common arms are opposite rays. The two outer arms then lie on one straight line, and the pair together fills a straight angle.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Theorem — a linear pair is always supplementary',
      text: 'If two angles form a linear pair, their measures sum to $180^\\circ$. The reason is one line long: the non-common arms are opposite rays, so together they draw a single straight line through the vertex, and the angle of a straight line is a straight angle, $180^\\circ$ — the measurement ground Lesson 1.2 laid when it straightened postulate P2 into a full line. Angle addition then splits that $180^\\circ$ between the two neighbours. Euclid proves the companion statement as Book I, Proposition 13: a straight line standing on another makes adjacent angles equal to two right angles.',
    },
    {
      kind: 'para',
      text: 'A crossing doubles the fun. When two straight lines cross at a point, FOUR angles are born at once, and they organise themselves into two structures at the same time. Going around the crossing, each neighbouring pair shares an arm and sits on a straight line — four linear pairs in all. And the angles that face each other across the vertex — the ones that are NOT neighbours — form the second structure: they are VERTICALLY OPPOSITE (or just vertical) angles, and the figure they make is the X. The naming is positional: "vertically opposite" from vertex, as in "opposite through the vertex", not "up-and-down".',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Definition — vertically opposite angles',
      text: 'When two straight lines cross at a common vertex, the two pairs of angles that do NOT share an arm are VERTICALLY OPPOSITE (vertical) angles: each is the angle facing it through the vertex. At a crossing with angles $a$, $b$, $c$, $d$ in cyclic order, $a$ is vertical to $c$, and $b$ is vertical to $d$.',
    },
    {
      kind: 'figure',
      caption: 'Two straight lines crossing at O: the X. The four angles, in cyclic order, measure $62^\\circ$, $118^\\circ$, $62^\\circ$, $118^\\circ$. Orange double-headed arcs mark the two vertically opposite pairs — the angles facing each other through the vertex are equal. The dashed teal semicircle carries the linear-pair law: every adjacent pair, such as $62^\\circ + 118^\\circ$, sums to $180^\\circ$ along the straight line.',
      svg: (() => {
        const ox = 450, oy = 245
        const pt = (r: number, mathDeg: number): [number, number] => [ox + r * Math.cos((mathDeg * Math.PI) / 180), oy - r * Math.sin((mathDeg * Math.PI) / 180)]
        const parts: string[] = [geo21Txt(450, 26, 'TWO STRAIGHT LINES CROSSING — THE X', 13, c21.ink, 'middle', '700')]
        const [ax, ay] = [120, oy]
        const [bx, by] = [780, oy]
        parts.push(geo21Line(ax, ay, bx, by, c21.green, 3))
        const [cx2, cy2] = pt(175, 62)
        const [dx2, dy2] = pt(175, 242)
        parts.push(geo21Line(cx2, cy2, dx2, dy2, c21.green, 3))
        parts.push(geo21Dot(ox, oy, c21.ink, 4.5))
        parts.push(geo21Txt(114, 231, 'A', 13, c21.ink))
        parts.push(geo21Txt(772, 231, 'B', 13, c21.ink))
        parts.push(geo21Txt(544, 82, 'C', 13, c21.ink))
        parts.push(geo21Txt(356, 414, 'D', 13, c21.ink))
        parts.push(geo21Txt(ox, oy + 30, 'O', 13, c21.ink))
        // angle labels at radius 62
        const lab = (r: number, mathDeg: number, s: string): void => {
          const [x, y] = pt(r, mathDeg)
          parts.push(geo21Txt(x, y + 4, s, 13, c21.orange, 'middle', '700'))
        }
        lab(62, 31, '62°')
        lab(62, 121, '118°')
        lab(62, 211, '62°')
        lab(62, 301, '118°')
        // matching tick arcs: single for the 62s, double for the 118s
        parts.push(geo21Arc(ox, oy, 34, -31 - 9, -31 + 9, c21.amber, 2))
        parts.push(geo21Arc(ox, oy, 34, 149 - 9, 149 + 9, c21.amber, 2))
        parts.push(geo21Arc(ox, oy, 34, -121 - 9, -121 + 9, c21.amber, 2))
        parts.push(geo21Arc(ox, oy, 41, -121 - 9, -121 + 9, c21.amber, 2))
        parts.push(geo21Arc(ox, oy, 34, 59 - 9, 59 + 9, c21.amber, 2))
        parts.push(geo21Arc(ox, oy, 41, 59 - 9, 59 + 9, c21.amber, 2))
        // equality arrows (double-headed orange arcs linking each vertical pair)
        parts.push(geo21ArcArrow(ox, oy, 96, -31, 149, c21.orange, 2))
        parts.push(geo21ArcArrow(ox, oy, 96, 149, -31, c21.orange, 2))
        parts.push(geo21ArcArrow(ox, oy, 96, -121, 59, c21.orange, 2))
        parts.push(geo21ArcArrow(ox, oy, 96, 59, -121, c21.orange, 2))
        // linear-pair dashed semicircle over the top
        parts.push(geo21Arc(ox, oy, 165, 0, -180, c21.teal, 2, '7,7'))
        parts.push(geo21Txt(450, 64, '62° + 118° = 180°', 12.5, c21.tealInk, 'middle', '700'))
        parts.push(geo21Txt(450, 424, 'matching arcs mark the equal vertical pairs — every adjacent pair is a linear pair', 12, c21.tealInk))
        return geo21Svg(900, 434, 'Two straight lines AB and CD crossing at O: the four angles are labelled sixty-two, one hundred eighteen, sixty-two, one hundred eighteen; orange double-headed arcs link the equal vertically opposite pairs and a dashed semicircle shows adjacent pairs summing to one hundred eighty degrees.', parts)
      })(),
    },
    {
      kind: 'para',
      text: 'The figure whispers a theorem, and this lesson is the right place to prove it properly — it is the chapter\'s first earned result, Euclid\'s Proposition I.15, and the proof is a two-line jewel that shows the common notions doing real work. The strategy: each vertical angle is locked to its neighbour by a linear pair, and the two linear pairs share that neighbour. Subtract, and the shared quantity cancels.',
    },
    {
      kind: 'derivation',
      title: 'Vertically opposite angles are equal',
      statement: 'Two straight lines cross at a point O, creating four angles $a$, $b$, $c$, $d$ in cyclic order, with $a$ vertically opposite $c$ and $b$ vertically opposite $d$. Then $a = c$ and $b = d$.',
      steps: [
        {
          label: 'Linear pair on the first line',
          formula: 'a + b = 180^\\circ',
          explanation: 'The angles $a$ and $b$ are adjacent, and their non-common arms lie together on one of the two straight lines — a linear pair, so the pair is supplementary by the theorem above.',
        },
        {
          label: 'Linear pair on the second line',
          formula: 'b + c = 180^\\circ',
          explanation: 'The same structure on the other line: $b$ and $c$ are adjacent with outer arms on a straight line, so they also sum to $180^\\circ$.',
        },
        {
          label: 'Equate the two sums (CN1)',
          formula: 'a + b = b + c',
          explanation: 'Both sums equal the same $180^\\circ$, so they equal each other — things equal to the same thing are equal to one another, the first common notion licensed in Lesson 1.2.',
        },
        {
          label: 'Subtract b from both (CN3)',
          formula: 'a = c',
          explanation: 'Equals subtracted from equals leave equals: cancel the shared $b$ and the vertical partners stand alone, equal. Running the same four moves on the pairs $b + c$ and $c + d$ gives $b = d$ identically.',
        },
      ],
      result: 'Hence vertically opposite angles are equal: $a = c$ and $b = d$ whenever two straight lines cross — Euclid I.15, earned.',
    },
    {
      kind: 'para',
      text: 'The theorem pays instantly. Given a crossing in which one of the four angles measures $118^\\circ$, the others follow without any drawing: the vertically opposite angle is also $118^\\circ$ by the theorem, and the two angles adjacent to it are its linear partners, each $180^\\circ - 118^\\circ = 62^\\circ$. The four measures are $118^\\circ$, $62^\\circ$, $118^\\circ$, $62^\\circ$ — and their sum is $360^\\circ$, the full turn around the crossing, which is exactly what four angles around a point must always sum to. This one witness is worth memorising as a pattern; the vertical algebra illustration below and half the exercise set are variations on it.',
    },
    {
      kind: 'formula',
      name: 'Vertically opposite angles are equal',
      latex: 'a = c \\quad\\text{when}\\quad a + b = 180^\\circ \\text{ and } b + c = 180^\\circ',
      note: 'the crossing rule: vertical partners match; adjacent partners are supplements',
    },

    /* -------------------------------------------------------------- */
    /* 6. ratio families and the algebra of the unknown                */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Ratio families and the algebra of the unknown' },
    {
      kind: 'para',
      text: 'Most examination questions in this topic are not about reading diagrams — they are about solving for an unknown that has been described INDIRECTLY, through a ratio or through a chain of complement and supplement operations. The method is always the same three moves: name the unknown, translate the words into ONE equation about it, solve. The ratio trick you have already seen twice; make it a general tool. If two supplementary angles are in the ratio $p : q$, write them as $pu$ and $qu$ — the unit $u$ is the unknown — and the equation is $pu + qu = 180^\\circ$, so $u = \\tfrac{180^\\circ}{p+q}$. For $2:3$ this gives $u = 36^\\circ$, hence $72^\\circ$ and $108^\\circ$. For a complementary pair the same tool divides $90^\\circ$ instead: ratio $4:5$ gives nine parts of $10^\\circ$, hence $40^\\circ$ and $50^\\circ$.',
    },
    {
      kind: 'para',
      text: 'The second flavour of indirect description hides the unknown inside its own complement or supplement. Three of these identities are pinned here because they are quoted constantly:',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'an angle EQUAL TO ITS OWN SUPPLEMENT: $x = 180^\\circ - x$ forces $2x = 180^\\circ$, so $x = 90^\\circ$ — only the right angle is its own supplement;',
        'an angle EQUAL TO ITS OWN COMPLEMENT: $x = 90^\\circ - x$ forces $2x = 90^\\circ$, so $x = 45^\\circ$ — the half-right angle;',
        'the COMPLEMENT OF THE SUPPLEMENT of $152^\\circ$: the supplement of $152^\\circ$ is $28^\\circ$, and the complement of $28^\\circ$ is $62^\\circ$ — two steps, one answer.',
      ],
    },
    {
      kind: 'para',
      text: 'The third identity in that list generalises, and the general form is worth one look because it turns a two-step computation into a one-step law: for any $x > 90^\\circ$, the complement of the supplement of $x$ is $90^\\circ - (180^\\circ - x) = x - 90^\\circ$ — you get back the amount by which $x$ exceeds a right angle. The condition $x > 90^\\circ$ is not decoration: if $x \\le 90^\\circ$ the supplement $180^\\circ - x$ is at least $90^\\circ$ and has no complement at all, so the expression would describe nothing.',
    },
    {
      kind: 'derivation',
      title: 'An angle whose supplement is triple its complement',
      statement: 'Find the angle $x$ for which the supplement of $x$ is exactly three times the complement of $x$, and show the answer is the only one.',
      steps: [
        {
          label: 'Translate each phrase',
          formula: '\\text{supplement} = 180^\\circ - x, \\quad \\text{complement} = 90^\\circ - x',
          explanation: 'The supplement-OF and complement-OF rules convert the words into expressions in the single unknown $x$.',
        },
        {
          label: 'Write the stated relation',
          formula: '180^\\circ - x = 3(90^\\circ - x)',
          explanation: 'The word "is" becomes equality; "triple" multiplies the complement expression.',
        },
        {
          label: 'Expand and collect',
          formula: '180^\\circ - x = 270^\\circ - 3x \\Rightarrow 2x = 90^\\circ',
          explanation: 'Expanding the right side and moving the $x$-terms left, constants right, leaves a single linear equation.',
        },
        {
          label: 'Solve and check',
          formula: 'x = 45^\\circ',
          explanation: 'At $45^\\circ$ the complement is $45^\\circ$ and the supplement is $135^\\circ = 3 \\times 45^\\circ$ — the relation holds exactly.',
        },
        {
          label: 'Uniqueness (the engine sweep)',
          formula: '180 - v = 3(90 - v) \\text{ only at } v = 45 \\text{ for } v = 0, 1, \\ldots, 180',
          explanation: 'The verify-first engine swept every integer measure from $0^\\circ$ to $180^\\circ$ and found exactly one solution, $45^\\circ$ — a linear equation in one unknown has exactly one root, and the sweep confirms no boundary case escapes.',
        },
      ],
      result: 'Hence the angle is $x = 45^\\circ$, and it is the only such angle.',
    },
    {
      kind: 'para',
      text: 'Notice what happened in that derivation: a sentence of English became an equation, the equation was solved by the ordinary algebra you already own, and the answer was CHECKED against the original words. That check is not optional decoration — it is the step that catches reversed translations ("supplement of triple" versus "triple of supplement") and off-by-constant slips. Every unknown-angle problem in the exercise set yields to the same four-move chain: translate, solve, check, state.',
    },

    /* -------------------------------------------------------------- */
    /* 7. bisectors of a linear pair are perpendicular                 */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Bisectors of a linear pair are perpendicular' },
    {
      kind: 'para',
      text: 'Here is a result that looks like a coincidence the first time you see it and then reveals itself as inevitable. Take any linear pair — angles $x$ and $180^\\circ - x$ on a straight line — and bisect BOTH of them. The two bisectors meet at the vertex at, precisely, a right angle. Not sometimes. Not for nice values of $x$. For every split whatsoever.',
    },
    {
      kind: 'derivation',
      title: 'The bisectors of a linear pair meet at a right angle',
      statement: 'A linear pair has measures $x$ and $180^\\circ - x$. The bisector of the first angle measures $\\tfrac{x}{2}$ from the shared arm; the bisector of the second measures $\\tfrac{180^\\circ - x}{2}$ from the same arm on the other side. The angle between the two bisectors is $90^\\circ$ — for every value of $x$.',
      steps: [
        {
          label: 'Name the two halves',
          formula: '\\tfrac{x}{2} \\text{ and } \\tfrac{180^\\circ - x}{2}',
          explanation: 'Bisection halves each measure of the pair; the unknown $x$ survives inside both halves.',
        },
        {
          label: 'Add the halves (angle addition)',
          formula: '\\tfrac{x}{2} + \\tfrac{180^\\circ - x}{2}',
          explanation: 'The two bisectors cut the straight angle into two pieces on either side of the shared arm, and angle addition says the pieces sum to the whole straight angle between them.',
        },
        {
          label: 'Combine over the common denominator',
          formula: '\\tfrac{x + (180^\\circ - x)}{2} = \\tfrac{180^\\circ}{2}',
          explanation: 'The unknown $x$ cancels inside the numerator — this is the entire secret of the result.',
        },
        {
          label: 'Conclude',
          formula: '= 90^\\circ',
          explanation: 'Half of a straight angle is a right angle. Because $x$ cancelled, the conclusion never depended on $x$: every linear pair, however lopsided, has perpendicular bisectors. The engine swept $x$ over every integer from $10^\\circ$ to $170^\\circ$ and the sum of halves was $90^\\circ$ at every single one.',
        },
      ],
      result: 'Hence the bisectors of a linear pair always meet at $90^\\circ$: $\\tfrac{x}{2} + \\tfrac{180^\\circ - x}{2} = 90^\\circ$ for every $x$.',
    },
    {
      kind: 'figure',
      caption: 'A linear pair on the straight line $AOB$: the ray $OC$ splits the straight angle into $x = 118^\\circ$ and $180^\\circ - x = 62^\\circ$. The orange bisectors cut the two angles into halves of $59^\\circ$ and $31^\\circ$, and the square mark at the vertex certifies that the bisectors meet at exactly $90^\\circ$ — the theorem just proved, drawn at the running witness.',
      svg: (() => {
        const ox = 450, oy = 250
        const pt = (r: number, mathDeg: number): [number, number] => [ox + r * Math.cos((mathDeg * Math.PI) / 180), oy - r * Math.sin((mathDeg * Math.PI) / 180)]
        const parts: string[] = [geo21Txt(450, 26, 'BISECTORS OF A LINEAR PAIR ARE PERPENDICULAR', 13, c21.ink, 'middle', '700')]
        parts.push(geo21Line(140, oy, 760, oy, c21.green, 3))
        const [cxx, cyy] = pt(185, 62)
        parts.push(geo21Line(ox, oy, cxx, cyy, c21.green, 3))
        const [b1x, b1y] = pt(150, 121)
        const [b2x, b2y] = pt(150, 31)
        parts.push(geo21Line(ox, oy, b1x, b1y, c21.orange, 2.5))
        parts.push(geo21Line(ox, oy, b2x, b2y, c21.orange, 2.5))
        parts.push(geo21Dot(ox, oy, c21.ink, 4.5))
        parts.push(geo21Txt(132, 236, 'A', 13, c21.ink))
        parts.push(geo21Txt(748, 236, 'B', 13, c21.ink))
        parts.push(geo21Txt(544, 86, 'C', 13, c21.ink))
        parts.push(geo21Txt(ox, oy + 30, 'O', 13, c21.ink))
        parts.push(geo21Txt(356, 108, 'bisector of 118°', 11, c21.orange, 'end', '700'))
        parts.push(geo21Txt(592, 178, 'bisector of 62°', 11, c21.orange, 'start', '700'))
        const t = (r: number, mathDeg: number, s: string, size = 12.5, color = c21.ink): void => {
          const [x, y] = pt(r, mathDeg)
          parts.push(geo21Txt(x, y + 4, s, size, color, 'middle', '700'))
        }
        t(115, 152, 'x = 118°', 12.5, c21.ink)
        t(115, 12, '180° − x = 62°', 12.5, c21.ink)
        t(48, 150, '59°', 12, c21.orange)
        t(48, 15, '31°', 12, c21.orange)
        // right-angle mark between the two bisectors at radius 40
        const [m1x, m1y] = pt(40, 121)
        const [mcx, mcy] = pt(40, 76)
        const [m2x, m2y] = pt(40, 31)
        parts.push(`<path d="M ${m1x.toFixed(1)} ${m1y.toFixed(1)} L ${mcx.toFixed(1)} ${mcy.toFixed(1)} L ${m2x.toFixed(1)} ${m2y.toFixed(1)}" fill="none" stroke="${c21.amber}" stroke-width="2"/>`)
        t(62, 76, '90°', 12.5, c21.red)
        parts.push(geo21Txt(450, 330, 'the halves add: 59° + 31° = 90° — and the x cancels, so every split works', 12, c21.tealInk))
        return geo21Svg(900, 345, 'A straight line AOB with ray OC making a linear pair of one hundred eighteen and sixty-two degrees; the two orange bisectors split them into halves of fifty-nine and thirty-one degrees and meet at a right angle marked ninety degrees at the vertex.', parts)
      })(),
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Theorem — perpendicular bisectors at any straight split',
      text: 'The bisectors of the two angles of a linear pair are perpendicular. The proof is the computation $\\tfrac{x}{2} + \\tfrac{180^\\circ - x}{2} = 90^\\circ$, in which the unknown cancels — so the perpendicularity is independent of how lopsided the original pair was. Keep this result in reach: it returns in the transversal lesson (2.3) as the reason angle bisectors of parallel-line systems stay parallel, and in Chapter 8 it becomes a construction.',
    },

    /* -------------------------------------------------------------- */
    /* 8. clock angles — the applied reading                           */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Clock angles: rays in motion' },
    {
      kind: 'para',
      text: 'Everything so far has treated angles as static drawings. The clock face makes them MOVE, and it is the standard applied setting for everything in this lesson — two rays (the hands) rotating about a common vertex (the centre) at constant, different speeds. The minute hand sweeps a full $360^\\circ$ in 60 minutes, so its speed is $360^\\circ / 60 = 6^\\circ$ per minute. The hour hand is twelve times slower: a full turn takes 12 hours, so its speed is $360^\\circ / 720 = 0.5^\\circ$ per minute — exactly $30^\\circ$ per hour, one twelfth of the dial per hour. These two numbers, 6 and $\\tfrac{1}{2}$, generate every clock question ever set.',
    },
    {
      kind: 'para',
      text: 'The method: measure both hands from twelve, then subtract. At $h$ hours and $m$ minutes past twelve, the minute hand sits at $6m$ degrees from twelve (clockwise), and the hour hand sits at $30h + 0.5m$ degrees — the $30h$ term is its jump past the $h$-th hour mark, and the $0.5m$ term is its drift within the hour. The angle between the hands is the absolute difference, taken the short way:',
    },
    {
      kind: 'equation',
      latex: '\\theta = |\\,30h + 0.5m - 6m\\,| = |\\,30h - 5.5m\\,|',
      note: 'the clock-angle formula: positions from twelve, then subtract — 5.5° per minute is the relative speed of the minute hand over the hour hand',
    },
    {
      kind: 'para',
      text: 'Four witnesses, pinned by the engine. At 3:00 the hour hand is at $90^\\circ$, the minute hand at $0^\\circ$: the angle is $90^\\circ$, a right angle — the clock\'s free gift. At 6:00 the hands oppose: $180^\\circ$, a straight angle — the clock draws the linear pair\'s outer arms. At 3:40 the computation earns its keep: the hour hand has reached $30 \\times 3 + 0.5 \\times 40 = 90 + 20 = 110^\\circ$, the minute hand $6 \\times 40 = 240^\\circ$, and the angle between them is $|110 - 240| = 130^\\circ$ — obtuse, though the naive "four hour marks apart" guess would say $120^\\circ$; the drift of the hour hand is exactly what the guess forgets. And at 2:20: the hour hand at $60 + 10 = 70^\\circ$, the minute hand at $120^\\circ$, difference $50^\\circ$ — acute.',
    },
    {
      kind: 'para',
      text: 'Two refinements complete the tool. First, the formula returns the smaller angle (at most $180^\\circ$) because of the absolute value; the reflex partner is $360^\\circ$ minus that — at 3:40 the reflex angle between the hands is $360^\\circ - 130^\\circ = 230^\\circ$, and an exam question that says "the reflex angle" is asking for this complement-to-a-full-turn. Second, the relative speed $5.5^\\circ$ per minute answers timing questions without any algebra: the hands coincide every $360/5.5 = 65\\tfrac{5}{11}$ minutes, and an exercise below walks both directions.',
    },
    {
      kind: 'formula',
      name: 'Clock angle between the hands',
      latex: '\\theta = |30h + 0.5m - 6m|',
      note: 'minute hand 6° per minute, hour hand 0.5° per minute (30° per hour), both measured from twelve; reflex partner is $360^\\circ - \\theta$',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution — the hands never sit still',
      text: 'The standard clock error is freezing the hour hand on its hour mark: reading 3:40 as "hour hand at 3, minute hand at 8, four marks apart, $120^\\circ$". But by 3:40 the hour hand has drifted two thirds of the way from 3 toward 4 — twenty degrees — and the true answer is $130^\\circ$. The minute hand moves 12 times faster, but BOTH hands move, always. Whenever a clock time is not exactly on the hour, ask first: where is the hour hand NOW?',
    },

    /* -------------------------------------------------------------- */
    /* 9. exam corner                                                  */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Exam corner: how this lesson is examined' },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner — the three standard traps',
      text: 'Trap one, complement-OF versus pair-WITH: "the complement of $37^\\circ$" is $53^\\circ$, but "an angle paired with $37^\\circ$ to make a right angle" is the same $53^\\circ$ — while "the SUPPLEMENT of $37^\\circ$" is $143^\\circ$. Read whether the question names 90 or 180 before touching the arithmetic, and underline the total in the question paper. Trap two, reflex angles: a reflex angle (strictly between $180^\\circ$ and $360^\\circ$) has NO complement and NO supplement — both partners would have to be negative, and measures of angles are never negative. If a question asks for the complement of $200^\\circ$, the examined skill is writing "does not exist", not computing $-110^\\circ$. Trap three, structure versus picture: in a diagram, identify linear pairs and vertical pairs by the ARMS, never by the look of the sketch — two angles are a linear pair only if their non-common arms are opposite rays (together one straight line), and vertically opposite only if they are the two non-adjacent angles of one crossing. A pair that merely LOOKS adjacent in a distorted drawing earns no marks for adjacency. This lesson\'s material appears in every school-leaving and competitive paper as 2–4 mark questions on classification, the complement/supplement arithmetic, and the crossing configuration; the clock question is a competitive-exam staple.',
    },

    /* -------------------------------------------------------------- */
    /* 10. illustrations                                               */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Illustrations' },
    {
      kind: 'example',
      title: 'Classify each of the measures 0°, 47.5°, 90°, 118°, 180° and 310° into its census family, with a reason for each.',
      steps: [
        'Sol. Run each measure along the census boundaries, in the order 0, 90, 180, 360 — first boundary that catches it decides the family.',
        'Take $0^\\circ$: the arms coincide, there is no opening — the angle is degenerate.',
        'Now, $47.5^\\circ$ lies strictly between $0^\\circ$ and $90^\\circ$ — acute.',
        'So, $90^\\circ$ is the exact value of the right-angle family — right, and emphatically not acute.',
        'But $118^\\circ$ lies strictly between $90^\\circ$ and $180^\\circ$ — obtuse.',
        'Now, $180^\\circ$ is the exact value of the straight family — a straight angle, not obtuse.',
        'And $310^\\circ$ lies strictly between $180^\\circ$ and $360^\\circ$ — reflex; note its reflex partner (the turn the other way) is $360^\\circ - 310^\\circ = 50^\\circ$.',
        'Hence: degenerate, acute, right, obtuse, straight, reflex — one family per measure, boundaries owned by the exact-value families.',
      ],
    },
    {
      kind: 'example',
      title: 'Two straight lines AB and CD cross at O. The angle AOC measures (3x − 12)° and its vertically opposite partner BOD measures (x + 48)°. Find x, all four angles at O, and the measure of the reflex angle AOC.',
      steps: [
        'Sol. The two given angles are vertically opposite partners — they face each other through the vertex O.',
        'Now, vertically opposite angles are equal: $3x - 12 = x + 48$.',
        'Solve: $2x = 60$ so $x = 30$.',
        'So, each vertical angle measures $3 \\times 30 - 12 = 78^\\circ$, and the check on the partner gives $30 + 48 = 78^\\circ$ — equal, as required.',
        'But the angles adjacent to these are linear partners: $180^\\circ - 78^\\circ = 102^\\circ$, and the two adjacent angles are vertically opposite to each other, so both measure $102^\\circ$.',
        'Hence $x = 30$; the four angles at O are $78^\\circ$, $102^\\circ$, $78^\\circ$, $102^\\circ$ in cyclic order; and the reflex angle AOC — the long way between the same arms — is $360^\\circ - 78^\\circ = 282^\\circ$.',
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. terms + revision formulas                                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Key terms and formulas of this lesson' },
    {
      kind: 'terms',
      items: [
        { term: 'angle', def: 'the figure of two rays (arms) sharing a common endpoint (the vertex), together with the amount of turning between them; written $\\angle ABC$ with the vertex letter in the middle' },
        { term: 'vertex', def: 'the common endpoint of the two arms of an angle; every angle name three letters wide keeps the vertex in the middle' },
        { term: 'arms of an angle', def: 'the two rays that form the angle; their length plays no part in the measure — only the opening between them counts' },
        { term: 'degree', def: 'one $360$-th of a full revolution, written $1^\\circ$; the unit inherited from Babylonian base-60 astronomy and standardised by the Greeks' },
        { term: 'minutes and seconds of arc', def: 'the sexagesimal subdivisions of the degree: $1^\\circ = 60\'$ and $1\' = 60\'\'$, so one degree is $3600$ seconds' },
        { term: 'reflex angle', def: 'an angle measuring strictly between $180^\\circ$ and $360^\\circ$ — the long way round between two arms; every angle\'s reflex partner measures $360^\\circ$ minus it' },
        { term: 'angle bisector', def: 'a ray through the vertex that splits an angle into two equal adjacent angles, each half the original measure' },
        { term: 'complementary angles', def: 'two angles whose measures sum to $90^\\circ$; the complement of $x$ is $90^\\circ - x$ — no adjacency required' },
        { term: 'supplementary angles', def: 'two angles whose measures sum to $180^\\circ$; the supplement of $x$ is $180^\\circ - x$ — no adjacency required' },
        { term: 'linear pair', def: 'two adjacent angles whose non-common arms are opposite rays — together they fill a straight angle, so they are always supplementary' },
        { term: 'vertically opposite angles', def: 'at a crossing of two straight lines, the two pairs of angles facing each other through the vertex; they are always equal (Euclid I.15)' },
      ],
    },
    {
      kind: 'formula',
      name: 'Degrees, minutes, seconds',
      latex: '1^\\circ = 60\' = 3600\'\'',
      note: 'the sexagesimal chain: divide by 60 going up to degrees, multiply by 60 going down to seconds',
    },

    /* -------------------------------------------------------------- */
    /* 12. quiz                                                        */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Check yourself — angles, pairs and measures',
      items: [
        {
          q: 'The complement of an angle measuring $37^\\circ$ is —',
          options: ['143°', '53°', '63°', '37°'],
          answer: 1,
          explain: 'A complement completes a right angle: $90^\\circ - 37^\\circ = 53^\\circ$. Option (a) computes $180^\\circ - 37^\\circ = 143^\\circ$ — that is the SUPPLEMENT, the classic 90-versus-180 mix-up this lesson warns about. Option (c) slips the total to 100 before subtracting. Option (d) returns the angle itself; only $45^\\circ$ equals its own complement, and $37^\\circ$ is not it.',
        },
        {
          q: 'A measure of $90.1^\\circ$ belongs to which family of the census?',
          options: ['acute', 'right', 'obtuse', 'straight'],
          answer: 2,
          explain: 'The obtuse family is the OPEN interval strictly between $90^\\circ$ and $180^\\circ$, and $90.1^\\circ$ qualifies — one tenth of a degree past the boundary is still past it. Option (a) fails because acute demands strictly less than $90^\\circ$. Option (b) fails because the right-angle family is the exact value $90^\\circ$, no more and no less. Option (d) fails because straight is exactly $180^\\circ$ — nowhere near.',
        },
        {
          q: 'Two straight lines cross, and one of the four angles at the crossing measures $118^\\circ$. The other three measures are —',
          options: ['118°, 62°, 62°', '62°, 62°, 62°', '118°, 118°, 118°', '118°, 62°, 90°'],
          answer: 0,
          explain: 'The angle vertically opposite the given one is equal to it: $118^\\circ$ (Euclid I.15). The two angles adjacent to it are its linear partners: $180^\\circ - 118^\\circ = 62^\\circ$ each. Option (b) forgets the vertical equality entirely. Option (c) forgets the linear pairs — four angles around a crossing cannot all be obtuse, since they sum to $360^\\circ$. Option (d) invents a right angle the configuration does not contain.',
        },
        {
          q: 'An angle that is equal to its own supplement measures —',
          options: ['45°', '90°', '60°', '180°'],
          answer: 1,
          explain: 'Translate: $x = 180^\\circ - x$ forces $2x = 180^\\circ$, so $x = 90^\\circ$ — the right angle is the only self-supplement. Option (a) is the answer to a DIFFERENT question: $45^\\circ$ is the self-COMPLEMENT ($x = 90^\\circ - x$). Option (c) fails the check: the supplement of $60^\\circ$ is $120^\\circ$. Option (d) fails badly: the supplement of $180^\\circ$ is $0^\\circ$.',
        },
        {
          q: 'The smaller angle between the hands of a clock at 3:40 is —',
          options: ['120°', '110°', '130°', '140°'],
          answer: 2,
          explain: 'Hour hand: $30 \\times 3 + 0.5 \\times 40 = 110^\\circ$ from twelve. Minute hand: $6 \\times 40 = 240^\\circ$. The gap: $|110 - 240| = 130^\\circ$. Option (a) counts four hour marks at $30^\\circ$ each and forgets that the hour hand has drifted $20^\\circ$ past the 3 mark by 3:40. Option (b) reports the hour hand\'s own position from twelve — the right number attached to the wrong quantity. Option (d) double-counts the drift.',
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 13. graded exercises (15, L1–L6, full steps solutions)          */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — angles, pairs and measures',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Classify each of the measures $17^\\circ$, $90^\\circ$, $155^\\circ$, $180^\\circ$ and $200.5^\\circ$ into its census family, with a reason for each.',
              solution: [
                'Sol. Run the census boundaries in order: 0, 90, 180, 360 — the first boundary a measure meets decides its family.',
                'Take $17^\\circ$: strictly between $0^\\circ$ and $90^\\circ$ — acute.',
                'Now, $90^\\circ$ is the exact value of the right-angle family — right, and not acute.',
                'So, $155^\\circ$ lies strictly between $90^\\circ$ and $180^\\circ$ — obtuse.',
                'But $180^\\circ$ is the exact value of the straight family — a straight angle, not obtuse.',
                'And $200.5^\\circ$ lies strictly between $180^\\circ$ and $360^\\circ$ — reflex; the small angle between the same arms is its reflex partner, $360^\\circ - 200.5^\\circ = 159.5^\\circ$.',
                'Hence: $17^\\circ$ acute, $90^\\circ$ right, $155^\\circ$ obtuse, $180^\\circ$ straight, $200.5^\\circ$ reflex.',
              ],
              answer: '17° acute, 90° right, 155° obtuse, 180° straight, 200.5° reflex',
            },
            {
              q: 'For each of $34^\\circ$, $81^\\circ$ and $118^\\circ$, state the complement (if it exists) and the supplement (if it exists).',
              solution: [
                'Sol. For each measure, subtract from 90 for the complement and from 180 for the supplement — and watch which subtraction stays non-negative.',
                'Take $34^\\circ$: complement $90^\\circ - 34^\\circ = 56^\\circ$; supplement $180^\\circ - 34^\\circ = 146^\\circ$.',
                'Now, $81^\\circ$: complement $9^\\circ$; supplement $99^\\circ$.',
                'But $118^\\circ$ already exceeds $90^\\circ$, so it has NO complement — the partner would have to be negative, and angle measures are never negative; its supplement is $180^\\circ - 118^\\circ = 62^\\circ$.',
                'Hence complements: $56^\\circ$, $9^\\circ$, none; supplements: $146^\\circ$, $99^\\circ$, $62^\\circ$.',
              ],
              answer: 'complements 56°, 9°, none; supplements 146°, 99°, 62°',
            },
            {
              q: 'Convert: (a) $42^\\circ 18\' 36\'\'$ to decimal degrees; (b) $37.42^\\circ$ to degrees, minutes and seconds.',
              solution: [
                'Sol. (a) Collapse to decimal degrees: the minutes contribute $18/60 = 0.3$ and the seconds $36/3600 = 0.01$.',
                'So, $42^\\circ 18\' 36\'\' = 42 + 0.3 + 0.01 = 42.31^\\circ$.',
                'Now, (b) split $37.42^\\circ$: keep the whole degrees $37^\\circ$; the fraction $0.42^\\circ$ in minutes is $0.42 \\times 60 = 25.2\'$.',
                'The $0.2\'$ in seconds is $0.2 \\times 60 = 12\'\'$ — no third place needed.',
                'Hence $37.42^\\circ = 37^\\circ 25\' 12\'\'$.',
              ],
              answer: '(a) 42.31°; (b) 37°25′12″',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Two supplementary angles are in the ratio $3 : 7$. Find both measures.',
              solution: [
                'Sol. Write the pair in ratio units: $3u$ and $7u$, where $u$ is the unknown part.',
                'Supplementary means the sum is a straight angle: $3u + 7u = 10u = 180^\\circ$.',
                'So, $u = 18^\\circ$, and the angles are $3 \\times 18^\\circ = 54^\\circ$ and $7 \\times 18^\\circ = 126^\\circ$.',
                'Check: $54^\\circ + 126^\\circ = 180^\\circ$ as required, and $126 : 54 = 7 : 3$ — the stated ratio, the right way round.',
                'Hence the pair is $54^\\circ$ and $126^\\circ$.',
              ],
              answer: '54° and 126°',
              figures: [
                {
                  caption: 'The ratio bar for a $3:7$ supplementary pair: ten unit parts $u = 18^\\circ$ stretching along the straight angle $180^\\circ$; three parts make $54^\\circ$, seven make $126^\\circ$.',
                  svg: (() => {
                    const parts: string[] = [geo21Txt(350, 26, 'SUPPLEMENTARY PAIR IN RATIO 3 : 7', 13, c21.ink, 'middle', '700')]
                    const x0 = 40, y0 = 52, H = 46, W = 620
                    const u = W / 10
                    parts.push(geo21Rect(x0, y0, 3 * u, H, c21.panel, c21.green, 4))
                    parts.push(geo21Rect(x0 + 3 * u, y0, 7 * u, H, c21.panel2, c21.amber, 4))
                    parts.push(geo21Txt(x0 + 1.5 * u, y0 + 30, '3u = 54°', 13, c21.ink, 'middle', '700'))
                    parts.push(geo21Txt(x0 + 6.5 * u, y0 + 30, '7u = 126°', 13, c21.ink, 'middle', '700'))
                    parts.push(geo21Txt(350, 128, '3u + 7u = 10u = 180° so u = 18°', 12.5, c21.tealInk, 'middle', '700'))
                    return geo21Svg(700, 144, 'A horizontal bar of total one hundred eighty degrees split in ratio three to seven: the left three unit part in amber reading three u equals fifty-four degrees and the right seven unit parts reading seven u equals one hundred twenty-six degrees, with the unit equation underneath.', parts)
                  })(),
                },
              ],
            },
            {
              q: 'Two complementary angles are in the ratio $2 : 7$. Find both measures, and state why neither can be obtuse.',
              solution: [
                'Sol. Write the pair as $2u$ and $7u$; complementary means the sum is a right angle.',
                'So, $2u + 7u = 9u = 90^\\circ$, giving $u = 10^\\circ$.',
                'Now, the angles are $2 \\times 10^\\circ = 20^\\circ$ and $7 \\times 10^\\circ = 70^\\circ$.',
                'Neither can be obtuse because each member of a complementary pair is $90^\\circ$ minus a non-negative amount — both are at most acute.',
                'Hence the pair is $20^\\circ$ and $70^\\circ$.',
              ],
              answer: '20° and 70°',
            },
            {
              q: 'Find the angle that (a) is equal to its own complement, (b) is equal to its own supplement. Explain why each answer is the only one.',
              solution: [
                'Sol. (a) Self-complement: translate as $x = 90^\\circ - x$.',
                'So, $2x = 90^\\circ$ and $x = 45^\\circ$ — half a right angle.',
                'Now, (b) self-supplement: $x = 180^\\circ - x$, so $2x = 180^\\circ$ and $x = 90^\\circ$ — half a straight angle.',
                'Each equation is linear in a single unknown, so each has exactly one root — no other angle can satisfy either condition.',
                'Hence $45^\\circ$ is the only self-complement and $90^\\circ$ the only self-supplement.',
              ],
              answer: 'self-complement 45°; self-supplement 90°',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'Two straight lines cross at O. One angle of a linear pair at O is four times the other. Find both measures, then all four angles of the crossing.',
              solution: [
                'Sol. Let the smaller angle be $x$; the larger is $4x$ — four times it.',
                'Linear pair: $x + 4x = 180^\\circ$, so $5x = 180^\\circ$ and $x = 36^\\circ$.',
                'So, the pair is $36^\\circ$ and $144^\\circ$.',
                'Now, at the crossing the angle vertically opposite $36^\\circ$ is $36^\\circ$, and the angle vertically opposite $144^\\circ$ is $144^\\circ$ (Euclid I.15).',
                'Hence the four angles are $36^\\circ$, $144^\\circ$, $36^\\circ$, $144^\\circ$ — summing to $360^\\circ$, as four angles around a point must.',
              ],
              answer: 'the pair is 36° and 144°; all four: 36°, 144°, 36°, 144°',
            },
            {
              q: 'Find the angle whose supplement is exactly three times its complement, and prove the answer is unique.',
              solution: [
                'Sol. Translate the phrases: supplement $= 180^\\circ - x$; complement $= 90^\\circ - x$.',
                'The condition reads $180^\\circ - x = 3(90^\\circ - x)$.',
                'Expand and collect: $180^\\circ - x = 270^\\circ - 3x$, so $2x = 90^\\circ$ and $x = 45^\\circ$.',
                'Now, check at $45^\\circ$: the complement is $45^\\circ$ and the supplement $135^\\circ = 3 \\times 45^\\circ$ — the relation holds.',
                'So, uniqueness: the equation is linear in one unknown, hence one root; the verify-first engine also swept every integer measure $0^\\circ$ to $180^\\circ$ and found exactly the one solution, $45^\\circ$.',
                'Hence $x = 45^\\circ$, and it is the only such angle.',
              ],
              answer: 'x = 45°, unique',
            },
            {
              q: 'Compute the complement of the supplement of $152^\\circ$. Then derive the one-step law for the complement of the supplement of any $x$, and state exactly when it is defined.',
              solution: [
                'Sol. Work from the inside out: the supplement of $152^\\circ$ is $180^\\circ - 152^\\circ = 28^\\circ$.',
                'Now, the complement of $28^\\circ$ is $90^\\circ - 28^\\circ = 62^\\circ$.',
                'So, in general: $90^\\circ - (180^\\circ - x) = 90^\\circ - 180^\\circ + x = x - 90^\\circ$ — the answer is the excess of $x$ over a right angle.',
                'Check the law at the witness: $152^\\circ - 90^\\circ = 62^\\circ$, as computed.',
                'But the law is defined only when the inner supplement $180^\\circ - x$ is itself less than $90^\\circ$ — that is, only for $x > 90^\\circ$; otherwise the "complement" step would ask for a negative angle.',
                'Hence the complement of the supplement of $152^\\circ$ is $62^\\circ$, and in general it is $x - 90^\\circ$, defined for $x > 90^\\circ$.',
              ],
              answer: '62°; in general x − 90°, defined for x > 90°',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Find the smaller angle between the hands of a clock at 3:40, and state the reflex angle between the same hands.',
              solution: [
                'Sol. Compute both hand positions from twelve, clockwise.',
                'Minute hand: $6^\\circ$ per minute gives $6 \\times 40 = 240^\\circ$.',
                'Now, hour hand: $30^\\circ$ per hour plus the drift $0.5^\\circ$ per minute gives $30 \\times 3 + 0.5 \\times 40 = 90 + 20 = 110^\\circ$.',
                'So, the angle between the hands is $|110 - 240| = 130^\\circ$ — obtuse.',
                'Hence the smaller angle at 3:40 is $130^\\circ$, and the reflex angle between the same hands is $360^\\circ - 130^\\circ = 230^\\circ$.',
              ],
              answer: '130° (the reflex partner is 230°)',
              figures: [
                {
                  caption: 'The 3:40 face: minute hand at $240^\\circ$, hour hand drifted to $110^\\circ$ from twelve; the marked angle between them is $130^\\circ$.',
                  svg: (() => {
                    const cx = 180, cy = 185, R = 130
                    const pt = (r: number, svgDeg: number): [number, number] => [cx + r * Math.cos((svgDeg * Math.PI) / 180), cy + r * Math.sin((svgDeg * Math.PI) / 180)]
                    const parts: string[] = [geo21Txt(cx, 24, 'CLOCK FACE AT 3:40', 13, c21.ink, 'middle', '700')]
                    parts.push(geo21Circ(cx, cy, R))
                    for (let k = 0; k < 12; k++) {
                      const a = -90 + k * 30
                      const [x1, y1] = pt(R - 8, a)
                      const [x2, y2] = pt(R, a)
                      parts.push(geo21Line(x1, y1, x2, y2, k % 3 === 0 ? c21.green : c21.teal, k % 3 === 0 ? 2.5 : 1.5))
                    }
                    const num = (svgDeg: number, s: string): void => {
                      const [x, y] = pt(R - 26, svgDeg)
                      parts.push(geo21Txt(x, y + 4, s, 12.5, c21.tealInk))
                    }
                    num(-90, '12')
                    num(0, '3')
                    num(90, '6')
                    num(180, '9')
                    const [mx, my] = pt(105, 150)
                    const [hx, hy] = pt(70, 20)
                    parts.push(geo21Line(cx, cy, mx, my, c21.orange, 3.5))
                    parts.push(geo21Line(cx, cy, hx, hy, c21.red, 4.5))
                    parts.push(geo21Dot(cx, cy, c21.ink, 5))
                    parts.push(geo21Txt(88, 252, 'minute hand', 11, c21.orange, 'end', '700'))
                    parts.push(geo21Txt(256, 214, 'hour hand', 11, c21.red, 'start', '700'))
                    parts.push(geo21Arc(cx, cy, 45, 150, 20, c21.amber, 2.5))
                    const [lx, ly] = pt(64, 85)
                    parts.push(geo21Txt(lx, ly, '130°', 13.5, c21.amber, 'middle', '700'))
                    return geo21Svg(360, 340, 'A clock face at three forty: the orange minute hand points to the eight position at two hundred forty degrees and the red hour hand has drifted past the three to one hundred ten degrees; the marked angle between the hands is one hundred thirty degrees.', parts)
                  })(),
                },
              ],
            },
            {
              q: 'Find the angle between the hands at (a) 2:20 and (b) 6:00, and classify each into the census. Also give the reflex angle at 2:20.',
              solution: [
                'Sol. (a) At 2:20 the minute hand is at $6 \\times 20 = 120^\\circ$ from twelve.',
                'Now, the hour hand is at $30 \\times 2 + 0.5 \\times 20 = 60 + 10 = 70^\\circ$.',
                'So, the angle is $|70 - 120| = 50^\\circ$ — acute.',
                'But (b) at 6:00 the minute hand sits at $0^\\circ$ and the hour hand at $30 \\times 6 = 180^\\circ$: the angle is $180^\\circ$ — straight, the hands forming one line.',
                'And the reflex partner at 2:20 is $360^\\circ - 50^\\circ = 310^\\circ$.',
                'Hence 2:20 gives $50^\\circ$ (acute) and 6:00 gives $180^\\circ$ (straight); the reflex angle at 2:20 is $310^\\circ$.',
              ],
              answer: '2:20 → 50° (reflex 310°); 6:00 → 180°',
            },
            {
              q: 'Two straight lines cross at O. One angle measures $(4x - 10)^\\circ$ and the angle vertically opposite to it measures $(3x + 5)^\\circ$. Find $x$ and all four angles at O.',
              solution: [
                'Sol. The two given angles are vertically opposite partners, and vertically opposite angles are equal.',
                'So, $4x - 10 = 3x + 5$, which gives $x = 15$.',
                'Now, each vertical angle measures $4 \\times 15 - 10 = 50^\\circ$; the check on the partner reads $3 \\times 15 + 5 = 50^\\circ$ — equal, as the theorem promises.',
                'But the two angles adjacent to these are linear partners: $180^\\circ - 50^\\circ = 130^\\circ$, and those two adjacent angles are vertically opposite to each other, so both measure $130^\\circ$.',
                'Hence $x = 15$ and the four angles at O are $50^\\circ$, $130^\\circ$, $50^\\circ$, $130^\\circ$ in cyclic order.',
              ],
              answer: 'x = 15; the four angles are 50°, 130°, 50°, 130°',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'A linear pair has measures $124.5^\\circ$ and $55.5^\\circ$. Find where each bisector lies, and show the bisectors are perpendicular — a deliberately non-integer split.',
              solution: [
                'Sol. The pair is $x = 124.5^\\circ$ and $180^\\circ - x = 55.5^\\circ$ on the straight line.',
                'Bisect each angle: the halves are $\\tfrac{124.5^\\circ}{2} = 62.25^\\circ$ and $\\tfrac{55.5^\\circ}{2} = 27.75^\\circ$.',
                'Now, add the halves across the straight angle (angle addition): $62.25^\\circ + 27.75^\\circ = 90^\\circ$.',
                'So, the bisectors meet at exactly a right angle — the $x$-cancellation theorem in action, here at a split chosen with halves that are not whole numbers.',
                'Hence the bisectors of this pair are perpendicular, splitting the straight angle into $62.25^\\circ$ and $27.75^\\circ$.',
              ],
              answer: 'the halves are 62.25° and 27.75°, meeting at 90°',
              figures: [
                {
                  caption: 'The $124.5^\\circ / 55.5^\\circ$ linear pair with both bisectors drawn: the halves $62.25^\\circ$ and $27.75^\\circ$ add to the marked $90^\\circ$ between the bisectors.',
                  svg: (() => {
                    const ox = 350, oy = 240
                    const pt = (r: number, mathDeg: number): [number, number] => [ox + r * Math.cos((mathDeg * Math.PI) / 180), oy - r * Math.sin((mathDeg * Math.PI) / 180)]
                    const parts: string[] = [geo21Txt(ox, 24, 'BISECTORS OF THE 124.5° / 55.5° PAIR', 13, c21.ink, 'middle', '700')]
                    parts.push(geo21Line(80, oy, 620, oy, c21.green, 3))
                    const [cxx, cyy] = pt(170, 55.5)
                    parts.push(geo21Line(ox, oy, cxx, cyy, c21.green, 3))
                    const [b1x, b1y] = pt(140, 117.75)
                    const [b2x, b2y] = pt(140, 27.75)
                    parts.push(geo21Line(ox, oy, b1x, b1y, c21.orange, 2.5))
                    parts.push(geo21Line(ox, oy, b2x, b2y, c21.orange, 2.5))
                    parts.push(geo21Dot(ox, oy, c21.ink, 4.5))
                    parts.push(geo21Txt(72, 226, 'A', 13, c21.ink))
                    parts.push(geo21Txt(628, 226, 'B', 13, c21.ink))
                    parts.push(geo21Txt(458, 92, 'C', 13, c21.ink))
                    parts.push(geo21Txt(ox, oy + 28, 'O', 13, c21.ink))
                    parts.push(geo21Txt(272, 106, 'bisector', 11, c21.orange, 'end', '700'))
                    parts.push(geo21Txt(486, 172, 'bisector', 11, c21.orange, 'start', '700'))
                    const t = (r: number, mathDeg: number, s: string, size = 12.5, color = c21.ink): void => {
                      const [x, y] = pt(r, mathDeg)
                      parts.push(geo21Txt(x, y + 4, s, size, color, 'middle', '700'))
                    }
                    t(95, 150, '124.5°', 12.5, c21.ink)
                    t(95, 12, '55.5°', 12.5, c21.ink)
                    t(56, 148, '62.25°', 12, c21.orange)
                    t(56, 14, '27.75°', 12, c21.orange)
                    const [m1x, m1y] = pt(34, 117.75)
                    const [mcx, mcy] = pt(34, 72.75)
                    const [m2x, m2y] = pt(34, 27.75)
                    parts.push(`<path d="M ${m1x.toFixed(1)} ${m1y.toFixed(1)} L ${mcx.toFixed(1)} ${mcy.toFixed(1)} L ${m2x.toFixed(1)} ${m2y.toFixed(1)}" fill="none" stroke="${c21.amber}" stroke-width="2"/>`)
                    t(52, 72.75, '90°', 12.5, c21.red)
                    parts.push(geo21Txt(ox, 290, '62.25° + 27.75° = 90° — the halves add, whatever the split', 12, c21.tealInk))
                    return geo21Svg(700, 300, 'A straight line AOB with ray OC making a linear pair of one hundred twenty-four point five and fifty-five point five degrees; the orange bisectors split them into sixty-two point two five and twenty-seven point seven five degrees and meet at a right angle.', parts)
                  })(),
                },
              ],
            },
            {
              q: 'Find the exact times between 3 o\'clock and 4 o\'clock when the hands of a clock are perpendicular. Then find the first time after 12:00 when the hands coincide.',
              solution: [
                'Sol. Between 3 and 4, write the time as 3:$m$; the hour hand sits at $90 + 0.5m$ degrees from twelve and the minute hand at $6m$ degrees.',
                'Set the gap to a right angle: $|90 + 0.5m - 6m| = 90$, that is $|90 - 5.5m| = 90$.',
                'So, $90 - 5.5m = 90$ gives $m = 0$ — the obvious instant, 3:00 itself.',
                'Or, $90 - 5.5m = -90$ gives $5.5m = 180$, so $m = 180/5.5 = 360/11 = 32\\tfrac{8}{11} \\approx 32.727273$ minutes — about 3:32 and 43.6 seconds.',
                'Now, the first coincidence after 12:00: the minute hand gains $5.5^\\circ$ per minute on the hour hand and must gain a full $360^\\circ$, so $m = 360/5.5 = 720/11 = 65\\tfrac{5}{11} \\approx 65.454545$ minutes.',
                'Hence the hands are perpendicular at 3:00 exactly and again $32\\tfrac{8}{11}$ minutes past 3; they first coincide after 12:00 at $65\\tfrac{5}{11}$ minutes past twelve — that is, $5\\tfrac{5}{11}$ minutes past 1:00.',
              ],
              answer: 'perpendicular at 3:00 and at 32 8/11 minutes past 3; first coincidence 65 5/11 minutes past 12',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Two straight lines cross at O, creating two vertical pairs of measures $a$ and $180^\\circ - a$. Prove that the two bisector lines of the four angles are perpendicular, and exhibit the witness at $a = 118^\\circ$.',
              solution: [
                'Sol. Let $\\ell$ be the line bisecting the $a$-pair and $m$ the line bisecting the $(180^\\circ - a)$-pair.',
                'Measure directions from one fixed ray of the crossing: $\\ell$ points in the direction $\\tfrac{a}{2}$.',
                'Now, $m$ points in the direction $a + \\tfrac{180^\\circ - a}{2}$ — past the whole first angle, plus half the second.',
                'Simplify: $a + \\tfrac{180^\\circ - a}{2} = \\tfrac{2a + 180^\\circ - a}{2} = \\tfrac{a}{2} + 90^\\circ$.',
                'So, the two directions differ by exactly $\\left(\\tfrac{a}{2} + 90^\\circ\\right) - \\tfrac{a}{2} = 90^\\circ$ — perpendicular, and the $a$ cancelled, so the result holds for every crossing.',
                'Check at $a = 118^\\circ$: the bisectors point at $\\tfrac{118^\\circ}{2} = 59^\\circ$ and $59^\\circ + 90^\\circ = 149^\\circ$, and $149^\\circ - 59^\\circ = 90^\\circ$; the engine swept every integer $a$ from $1^\\circ$ to $179^\\circ$ with the same verdict.',
                'Hence the two bisector lines at any crossing are perpendicular — the companion theorem to the linear-pair bisector result.',
              ],
              answer: 'the bisector lines are perpendicular; at a = 118° they point at 59° and 149°, differing by 90°',
              figures: [
                {
                  caption: 'The crossing with both bisector LINES drawn whole: the $\\ell$-bisector of the $118^\\circ$ pair and the $m$-bisector of the $62^\\circ$ pair meet at the marked right angle.',
                  svg: (() => {
                    const ox = 350, oy = 235
                    const pt = (r: number, mathDeg: number): [number, number] => [ox + r * Math.cos((mathDeg * Math.PI) / 180), oy - r * Math.sin((mathDeg * Math.PI) / 180)]
                    const parts: string[] = [geo21Txt(ox, 24, 'THE TWO BISECTOR LINES AT A CROSSING', 13, c21.ink, 'middle', '700')]
                    parts.push(geo21Line(90, oy, 610, oy, c21.green, 3))
                    const [cxx, cyy] = pt(165, 62)
                    const [dxx, dyy] = pt(165, 242)
                    parts.push(geo21Line(cxx, cyy, dxx, dyy, c21.green, 3))
                    const [l1x, l1y] = pt(150, 121)
                    const [l2x, l2y] = pt(150, 301)
                    const [m1x, m1y] = pt(150, 31)
                    const [m2x, m2y] = pt(150, 211)
                    parts.push(geo21Line(l1x, l1y, l2x, l2y, c21.orange, 2.5))
                    parts.push(geo21Line(m1x, m1y, m2x, m2y, c21.red, 2.5))
                    parts.push(geo21Dot(ox, oy, c21.ink, 4.5))
                    parts.push(geo21Txt(78, 221, 'A', 13, c21.ink))
                    parts.push(geo21Txt(622, 221, 'B', 13, c21.ink))
                    parts.push(geo21Txt(438, 80, 'C', 13, c21.ink))
                    parts.push(geo21Txt(258, 392, 'D', 13, c21.ink))
                    parts.push(geo21Txt(ox, oy + 26, 'O', 13, c21.ink))
                    parts.push(geo21Txt(262, 98, 'bisector of the 118° pair', 11, c21.orange, 'end', '700'))
                    parts.push(geo21Txt(492, 150, 'bisector of the 62° pair', 11, c21.red, 'start', '700'))
                    const t = (r: number, mathDeg: number, s: string, size = 12.5, color = c21.ink): void => {
                      const [x, y] = pt(r, mathDeg)
                      parts.push(geo21Txt(x, y + 4, s, size, color, 'middle', '700'))
                    }
                    t(70, 150, '118°', 12.5, c21.ink)
                    t(70, 25, '62°', 12.5, c21.ink)
                    t(55, 150.5, '59°', 12, c21.orange)
                    t(80, 91.5, '59°', 12, c21.orange)
                    t(80, 15.5, '31°', 12, c21.red)
                    t(55, 46.5, '31°', 12, c21.red)
                    const [p1x, p1y] = pt(38, 121)
                    const [pcx, pcy] = pt(38, 76)
                    const [p2x, p2y] = pt(38, 31)
                    parts.push(`<path d="M ${p1x.toFixed(1)} ${p1y.toFixed(1)} L ${pcx.toFixed(1)} ${pcy.toFixed(1)} L ${p2x.toFixed(1)} ${p2y.toFixed(1)}" fill="none" stroke="${c21.amber}" stroke-width="2"/>`)
                    t(60, 76, '90°', 12.5, c21.red)
                    parts.push(geo21Txt(ox, 416, 'directions 59° and 149° from the same ray — always 90° apart', 12, c21.tealInk))
                    return geo21Svg(700, 430, 'Two lines AB and CD crossing at O with angles of one hundred eighteen and sixty-two degrees; the orange bisector line of the one hundred eighteen degree pair and the red bisector line of the sixty-two degree pair cross at a right angle marked ninety degrees at O.', parts)
                  })(),
                },
              ],
            },
          ],
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 14. closing                                                     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'What you now own' },
    {
      kind: 'para',
      text: 'Lesson 1.4 taught you how points, lines and planes interlock; this lesson attached NUMBERS to the interlocking. You can now name an angle unambiguously (vertex in the middle), measure it in the Babylonian currency of degrees, minutes and seconds, and sort it into the seven-family census with boundary honesty — knowing that $90^\\circ$ is right and never acute, that $180^\\circ$ is straight and never obtuse. You own the three great pair relationships — complementary to 90, supplementary to 180, and the linear pair that forces adjacency into a straight angle — and you have PROVED the two results this chapter will lean on: vertically opposite angles are equal, and the bisectors of a linear pair are perpendicular. Every witness in this lesson, from the $118^\\circ$ crossing to the $130^\\circ$ clock gap, was recomputed by brute force in the verify-first engine before a word of prose was written.',
    },
    {
      kind: 'para',
      text: 'The chapter now turns to the postulate Euclid himself hesitated over. Lesson 2.2 takes up parallel lines and the fifth postulate — the statement Proclus wanted "struck out of the postulates altogether" — and everything there is stated in the currency you have just learned: angles compared to $180^\\circ$, same-side interior sums, and the two right angles that decide whether lines meet. Then 2.3 multiplies this lesson\'s single crossing into the eight-angle census of a transversal cutting two lines, where vertically opposite angles and linear pairs do all the work, and 2.4 cashes the whole machinery into the angle sum of a triangle. In short: the arithmetic of the angle you learned here is the grammar of the entire chapter.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Note — the three habits worth keeping',
      text: 'First, boundary honesty: when a measure lands exactly on 90 or 180, name the exact-value family and refuse the interval families — the census is a partition and the boundaries are owned. Second, structure before arithmetic: at any crossing, mark the linear pairs (adjacent, arms making a line) and the vertical pairs (facing through the vertex) BEFORE computing; the two theorems then do the arithmetic for you. Third, translate–solve–check: every unknown-angle problem is an English sentence wearing an equation; translate it, solve it, and check the answer back against the words. These three habits are exactly what the quiz and the fifteen exercises above were training, and they carry straight into parallel lines.',
    },

  ],
}

/* ================================================================== */
/* lesson 2.2 — from docs/research/geo-ch02-wip/part-geo202.ts            */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c22 = {
  ink: '#166534', // primary text — rich green ink
  mid: '#65a30d', // mid text — bright lime
  teal: '#0d9488', // captions, light strokes, secondary structure
  tealInk: '#0f766e', // teal ink text
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#16a34a', // structure strokes — boxes, axes, node circles
  panel: '#fef3c7', // amber tinted fill
  panel2: '#ffedd5', // orange tinted fill
  sep: '#fcd34d', // light separators
  faint: '#5eead4', // faint dots, unpicked borders
  white: '#ffffff',
  paper: '#fffdf5',
}
const f22 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo22 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo22Txt = (
  x: number, y: number, s: string,
  size = 13, color = c22.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f22}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo22Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c22.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo22Circ = (
  cx: number, cy: number, r: number, color = c22.ink, w = 2.5, fill = 'none',
): string =>
  `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${fill}" stroke="${color}" stroke-width="${w}"/>`

const geo22Dot = (x: number, y: number, color = c22.ink, r = 4): string =>
  `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${color}"/>`

const geo22Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo22Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo22Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c22.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return (
    geo22Line(x1, y1, x2, y2, color, w) + geo22Head(x2, y2, a, color, 8)
  )
}

const geo22Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/* screen-coords angle helpers (y grows downward, as in SVG) */
const geo22R = (d: number): number => (d * Math.PI) / 180
const geo22Pt = (x: number, y: number, angDeg: number, r: number): [number, number] => [
  x + r * Math.cos(geo22R(angDeg)),
  y + r * Math.sin(geo22R(angDeg)),
]

/** filled wedge from angle a1 to a2 (degrees, screen coords, increasing) */
const geo22Wedge = (
  cx: number, cy: number, r: number, a1: number, a2: number, fill: string,
): string => {
  let hi = a2
  while (hi <= a1) hi += 360
  const [x1, y1] = geo22Pt(cx, cy, a1, r)
  const [x2, y2] = geo22Pt(cx, cy, a2, r)
  const large = hi - a1 > 180 ? 1 : 0
  return `<path d="M ${cx.toFixed(1)} ${cy.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${fill}" stroke="none"/>`
}

/** stroked arc from angle a1 to a2 (degrees, screen coords) */
const geo22Arc = (
  cx: number, cy: number, r: number, a1: number, a2: number,
  color = c22.amber, w = 2,
): string => {
  let hi = a2
  while (hi <= a1) hi += 360
  const [x1, y1] = geo22Pt(cx, cy, a1, r)
  const [x2, y2] = geo22Pt(cx, cy, a2, r)
  const large = hi - a1 > 180 ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}"/>`
}

/** right-angle mark: two short strokes at a corner on horizontal/vertical lines */
const geo22RA = (x: number, y: number, dir: 'up' | 'down', s = 7): string => {
  const yy = dir === 'up' ? y - s : y + s
  return geo22Line(x - s, y, x - s, yy, c22.amber, 1.6) + geo22Line(x - s, yy, x, yy, c22.amber, 1.6)
}

/* ================================================================== */
/* LESSON 2.2 — Parallel Lines and the Fifth Postulate                 */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* back-half namespace (seat 127-b): palette c22b + geo22b helpers    */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c22b = {
  ink: '#166534', // primary text — rich green ink
  mid: '#65a30d', // mid text — bright lime
  teal: '#0d9488', // captions, light strokes, secondary structure
  tealInk: '#0f766e', // teal ink text
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#16a34a', // structure strokes — boxes, axes, node circles
  panel: '#fef3c7', // amber tinted fill
  panel2: '#ffedd5', // orange tinted fill
  sep: '#fcd34d', // light separators
  faint: '#5eead4', // faint dots, unpicked borders
  white: '#ffffff',
  paper: '#fffdf5',
}
const f22b = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo22b SVG helpers (plain text only — no $, minus is U+2212)        */
/* Every coordinate, arc and label below is COMPUTED from the pinned   */
/* witnesses — nothing in any figure is eyeballed.                     */
/* ------------------------------------------------------------------ */
const geo22bR1 = (v: number): string => String(Math.round(v * 10) / 10)

const geo22bTxt = (
  x: number, y: number, s: string,
  size = 13, color = c22b.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${geo22bR1(x)}" y="${geo22bR1(y)}" font-family="${f22b}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo22bLine = (
  x1: number, y1: number, x2: number, y2: number,
  color = c22b.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${geo22bR1(x1)}" y1="${geo22bR1(y1)}" x2="${geo22bR1(x2)}" y2="${geo22bR1(y2)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo22bCirc = (
  cx: number, cy: number, r: number, color = c22b.ink, w = 2.5, fill = 'none',
): string =>
  `<circle cx="${geo22bR1(cx)}" cy="${geo22bR1(cy)}" r="${geo22bR1(r)}" fill="${fill}" stroke="${color}" stroke-width="${w}"/>`

const geo22bDot = (x: number, y: number, color = c22b.ink, r = 4): string =>
  `<circle cx="${geo22bR1(x)}" cy="${geo22bR1(y)}" r="${geo22bR1(r)}" fill="${color}"/>`

const geo22bRect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo22bHead = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${geo22bR1(x)},${geo22bR1(y)} ${geo22bR1(p1[0])},${geo22bR1(p1[1])} ${geo22bR1(p2[0])},${geo22bR1(p2[1])}" fill="${color}"/>`
}

const geo22bArrow = (
  x1: number, y1: number, x2: number, y2: number, color = c22b.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo22bLine(x1, y1, x2, y2, color, w) + geo22bHead(x2, y2, a, color, 8)
}

const geo22bSvg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** stroked arc from screen angle a1 to a2 (degrees; y grows downward) */
const geo22bArc = (
  cx: number, cy: number, r: number, a1: number, a2: number,
  color = c22b.amber, w = 2,
): string => {
  let hi = a2
  while (hi <= a1) hi += 360
  const px = (a: number): [number, number] => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)]
  const [x1, y1] = px(a1)
  const [x2, y2] = px(hi)
  const large = hi - a1 > 180 ? 1 : 0
  return `<path d="M ${geo22bR1(x1)} ${geo22bR1(y1)} A ${geo22bR1(r)} ${geo22bR1(r)} 0 ${large} 1 ${geo22bR1(x2)} ${geo22bR1(y2)}" fill="none" stroke="${color}" stroke-width="${w}"/>`
}

/* ================================================================== */
/* BACK HALF of lesson 2.2 — quiz + exercises + coda                   */
/* (seat geo202-s2, run 127 salvage; the prose seat owns part-geo202)  */
/* ================================================================== */

export const lessonGeo202: Lesson = {
  id: 'geo-parallel-lines-and-the-fifth-postulate',
  number: '2.2',
  title: 'Parallel Lines and the Fifth Postulate',
  concepts: [
    'parallel lines',
    'parallel postulate',
    "Playfair's axiom",
    'transversal',
    'same-side interior angles',
    'equidistant lines',
    'non-Euclidean geometry',
  ],
  objectives: [
    'Define parallel lines precisely and explain why "never meeting" is a claim about the infinite that no drawing can settle',
    "Restate Euclid's fifth postulate in angle-arithmetic form and apply the meet-side verdict (sum under 180 degrees) with reasons",
    'Use the side-sum law — the two same-side interior sums add to 360 degrees — to convert any one-sided reading into the full verdict',
    "Unpack Playfair's 'exactly one' into its existence and uniqueness halves and say which half costs the fifth postulate",
    'Recount the historical ladder from Proclus to Bolyai with the pinned year gaps, and explain why the proof hunt had to fail',
    'State the parallel census across the Euclidean, spherical and hyperbolic geometries and explain the equidistance character of parallels',
  ],
  prerequisites: ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures'],
  sources: ['geo-euclid-elements', 'geo-hilbert-grundlagen', 'geo-ch02-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The postulate that would not behave' },
    {
      kind: 'para',
      text: 'Lesson 1.2 handed you Euclid’s five postulates and quietly flagged one of them: the fifth, we said, was the awkward one — the rule that reads like a theorem, makes a promise about lines so far apart that no drawing can check it, and sticks out of the tidy rulebook like a loose nail. This lesson gives that nail its own stage. Parallel lines are the subject, the fifth postulate is the engine, and the story that joins them — two thousand years of failed proofs crowned by a discovery that changed what the word "geometry" means — is the reason this chapter is arranged the way it is.',
    },
    {
      kind: 'para',
      text: 'Here is the plan of attack. First we define what parallel lines ARE, and immediately notice something unsettling: the definition makes a promise about the infinite — never meeting — and an infinite promise cannot be checked, only derived. Then we reread Euclid’s fifth postulate slowly, in our own words, and find that it is really a rule of ARITHMETIC with angles: add the two same-side interior angles a transversal creates, compare the sum with $180^\circ$, and the postulate tells you on which side the two lines are destined to meet. Then comes the history — Proclus complaining in 450 CE, Saccheri almost discovering another world in 1733, Playfair cleaning the statement up in 1795, and Lobachevsky and Bolyai walking through the door in 1829 and 1832. Finally we take the census the story produced — how many parallels pass through a point off a line: one, zero, or infinitely many — and ask what each answer does to the geometry built upon it.',
    },
    {
      kind: 'para',
      text: 'A word about tone before we begin. Nothing in this lesson is decorative. Every angle sum is computed — the verify-engine behind this book re-derives each number before it reaches the page — the year gaps are counted, and every claim about what the fifth postulate does is either derived in front of you or honestly flagged as a sketch. The lesson has one hero and one villain. The hero is the quantifier $\exists!$ — "exactly one" — which Playfair’s axiom puts to real work. The villain is the temptation to believe that a picture can settle an infinite question. Keep both in sight and the lesson reads as one long story, because that is exactly what it is.',
    },

    /* -------------------------------------------------------------- */
    /* 2. parallel defined                                            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Parallel defined: a promise about the infinite' },
    {
      kind: 'para',
      text: 'Two fences run along a road and look parallel. Are they? You can walk a hundred metres beside them and see no meeting; you cannot walk forever. Yet "parallel" is a claim about FOREVER. That is the first and most important structural fact about the definition we are about to give: it asserts something no finite inspection can ever verify — which is precisely why the theory will need a postulate to manage it. Hold that thought through the definition and the whole lesson falls into place.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Parallel lines (in a plane)',
      text: 'Two DISTINCT lines $m$ and $n$ lying in one plane are said to be PARALLEL if they have no point in common; we write $m \\parallel n$. The word "distinct" is part of the definition itself: a line never meets itself, but we do not count a line as parallel to itself — parallelism is a relation between two different objects, like "sister", not a property one object carries alone. Thus, to call $m \\parallel n$ is to assert three things at once: $m$ and $n$ are coplanar, $m \\neq n$, and no point lies on both.',
    },
    {
      kind: 'equation',
      latex: 'm \\parallel n \\iff \\bigl(m, n \\text{ coplanar}\\bigr) \\wedge \\bigl(m \\neq n\\bigr) \\wedge \\bigl(m \\cap n = \\varnothing\\bigr)',
      note: 'the symbolic restatement: coplanar, distinct, and empty of common points — all three clauses are part of the definition',
    },
    {
      kind: 'para',
      text: 'Three reading notes, each with teeth. First, COPLANAR is a genuine restriction, not decoration: in three dimensions there exist skew lines — lines that never meet yet are not parallel, because no single plane contains both; they belong to solid geometry, later in the book. Second, DISTINCT is in the definition for an honest reason: without it, every line would be "parallel to itself" (it certainly never meets itself in a second point), and the census questions we are about to ask would all become meaningless. We state this degeneracy openly instead of hiding it in a footnote. Third, the promise concerns the INFINITE EXTENSIONS of the lines: the pencil marks in a figure are not the lines they represent — chapter 1’s postulate 2 lets every finite line be extended continuously, and "never meet" is a claim about those extensions, not about the drawn window.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution — a drawing can never certify "parallel"',
      text: 'However straight the ruler and however careful the pencil, a drawing shows only a finite window of two lines. The lines of geometry extend without end in both directions (postulate 2), so the verdict "never meet" ranges over all of that infinite length. Two lines in a figure may look parallel and meet a kilometre further on; they may look slightly tilted and be exactly parallel. A picture can SUGGEST; only a derivation can SETTLE. The entire two-thousand-year story of the fifth postulate is the story of trying to settle "never" by proof instead of by inspection.',
    },
    {
      kind: 'para',
      text: 'The notation is a single symbol: $m \\parallel n$ reads "$m$ is parallel to $n$", and the relation is symmetric — if $m \\parallel n$ then $n \\parallel m$ — because "no common point" does not care which line is named first. The real issue is deeper than notation, and it deserves its own sentence: PARALLELISM IS THE FIRST PROPERTY IN THIS BOOK THAT CANNOT BE CHECKED, ONLY PROVED OR ASSUMED. Equality of segments can be checked with a compass; incidence can be checked by looking; even an angle can be measured against a protractor. "Never meets" cannot. That gap between checking and proving is exactly the gap the fifth postulate was invented to fill — and once you see the gap clearly, you can predict the whole history: geometers will try to prove the postulate from the others, fail for two millennia, and finally discover that the failure was necessary, because other worlds disobey it.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why this definition hides a postulate',
      text: 'Compare two definitions. "Perpendicular" says: meet, at $90^\circ$. You can check the meeting and measure the angle, so perpendicularity is decidable on the spot. "Parallel" says: never meet. No measurement reaches "never". A definition that outruns every possible experiment is not thereby wrong — but it silently demands that the theory supply a derivation route for the property it names. Euclid’s fifth postulate is exactly that supply line, and the lesson of history is that no cheaper supply line exists.',
    },

    /* -------------------------------------------------------------- */
    /* 3. the fifth postulate restated                                 */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The fifth postulate, restated as angle arithmetic' },
    {
      kind: 'para',
      text: 'Here are Euclid’s own words, in the standard translation: "That, if a straight line falling on two straight lines makes the interior angles on the same side less than two right angles, the two straight lines, if produced indefinitely, meet on that side on which are the angles less than the two right angles." Read it twice, slowly — every clause is doing precise work. A "straight line falling on" two others is what this chapter calls a TRANSVERSAL. The "interior angles on the same side" are our same-side interior pair: at the upper crossing the angle below the transversal, at the lower crossing the angle above it, both on the same side. "Less than two right angles" is degree language wearing a toga — Euclid counted in right angles, we count in degrees, and two right angles is $180^\circ$. And the tail of the sentence, "if produced indefinitely", is the infinite promise from the last section wearing ITS formal clothes: the meeting, if the postulate delivers one, may happen beyond every drawable window.',
    },
    {
      kind: 'para',
      text: 'Stripped into our vocabulary, the postulate is a conditional with a built-in compass. IF a transversal cuts two lines and one side’s same-side interior angles sum to less than $180^\circ$, THEN the two lines meet on THAT side. The contrapositive costs nothing and is worth saying now: if two lines are parallel — never meeting — then NEITHER side can carry a sum under $180^\circ$. So a parallel pair must keep both side-sums at $180^\circ$ or above; and, as the next derivation shows, the two sums are locked together so tightly that "at or above" collapses to "exactly". Before we can state that law we need one piece of bookkeeping: the two same-side sums always add to $360^\circ$, whatever the lines are doing. That is pure 2.1 arithmetic — not a grain of the fifth postulate goes into it.',
    },
    {
      kind: 'derivation',
      title: 'The side-sum law: the two same-side interior sums add to 360',
      statement: 'A transversal $t$ cuts line $m$ (upper) at $P$ and line $n$ (lower) at $Q$. Under the chapter’s label convention, the interior angles at $P$ are $a_3$ (lower-right) and $a_4$ (lower-left); those at $Q$ are $a_5$ (upper-left) and $a_6$ (upper-right). The LEFT same-side interior sum is $a_4 + a_5$; the RIGHT one is $a_3 + a_6$. Claim: $(a_4 + a_5) + (a_3 + a_6) = 360^\\circ$ always.',
      steps: [
        { label: 'Linear pair along m at P', formula: 'a_3 + a_4 = 180^\\circ', explanation: 'At the crossing $P$, the angles $a_3$ and $a_4$ are adjacent and their outer rays lie along the line $m$ — a linear pair. Lesson 2.1 proved that every linear pair sums to $180^\\circ$, and that theorem asked nothing about parallels: it is angle arithmetic at a single point, licensed by the first four postulates alone.' },
        { label: 'Linear pair along n at Q', formula: 'a_5 + a_6 = 180^\\circ', explanation: 'The same licence at the second crossing: $a_5$ and $a_6$ are adjacent at $Q$ with outer rays along $n$, so they too sum to $180^\\circ$.' },
        { label: 'Regroup the four interior angles', formula: '(a_4 + a_5) + (a_3 + a_6) = (a_3 + a_4) + (a_5 + a_6)', explanation: 'Four numbers can be grouped by SIDE of the transversal — left pair $a_4 + a_5$, right pair $a_3 + a_6$ — or by CROSSING — $a_3 + a_4$ at $P$, $a_5 + a_6$ at $Q$. Addition does not care which grouping we choose; both groupings total the same four angles.' },
        { label: 'Substitute the two linear pairs', formula: '180^\\circ + 180^\\circ = 360^\\circ', explanation: 'The crossing-grouping is two linear pairs, so the total is $360^\\circ$. Therefore the side-grouping totals $360^\\circ$ as well — and this holds for EVERY pair of lines and EVERY transversal, meeting or not, tilted or not.' },
      ],
      result: '$(a_4 + a_5) + (a_3 + a_6) = 360^\\circ$ — the left and right same-side interior sums are locked together: read either one and the other is forced to $360^\\circ$ minus it. Engine sweeps at the pinned values: $170 + 190 = 360$, $118.25 + 241.75 = 360$, $90 + 270 = 360$.',
    },
    {
      kind: 'para',
      text: 'The 360 law turns the fifth postulate into a two-sided thermometer. Sweep one line slowly and watch the left sum move; the right sum is dragged to $360^\circ$ minus whatever the left shows. Take three readings from that sweep, each engine-checked. Left sum $170^\circ$: the right is forced to $190^\circ$, the left has fallen short, and the postulate sentences the lines to meet on the LEFT. Left sum $118.25^\circ$: the right is $241.75^\circ$, and again the meeting is on the left — only more steeply, because the shortfall is fatter. Left sum $90^\circ$: the right is $270^\circ$, and even this extreme case obeys the same one rule: meet on the side whose sum fell below $180^\circ$. And when the left sum lands exactly on $180^\circ$, the 360 law forces the right to $180^\circ$ as well — no other value is available — and that configuration, both sums exactly $180^\circ$, is the PARALLEL case: no meeting on either side, ever. The boundary between "must meet left" and "must meet right" is precisely the parallel configuration at 180.',
    },
    {
      kind: 'figure',
      caption: 'The fifth postulate as a picture. Lines m (upper) and n (lower) are cut by the transversal t at P and Q. On the LEFT of t the same-side interior angles are shaded: a4 = 65° and a5 = 105°, summing to 170° — under 180°, so the fifth postulate sends the lines to their meeting point M on that side, where they cross at the deficit angle 180° − 170° = 10°. On the right, a3 = 115° and a6 = 75° sum to 190° — over 180°, so that side is certified meeting-free. The two sums are locked at 360° by the linear-pair law just derived.',
      svg: geo22Svg(900, 340, 'Two non-parallel lines m and n cut by a transversal t; the left same-side interior angles a4 equals 65 degrees and a5 equals 105 degrees are shaded and sum to 170 degrees; the lines meet at M on the left at an angle of 10 degrees; the right side angles a3 equals 115 and a6 equals 75 sum to 190 degrees.', [
        geo22Txt(450, 22, 'THE FIFTH POSTULATE AS ARITHMETIC: LEFT 170, RIGHT 190', 13, c22.ink, 'middle', '700'),
        geo22Line(12, 177.5, 880, 55.5, c22.ink, 3),
        geo22Line(12, 165.6, 880, 196, c22.ink, 3),
        geo22Line(485.4, 330, 575.8, 34, c22.teal, 3),
        geo22Wedge(555.3, 101.2, 46, 107, 172, c22.panel),
        geo22Wedge(530.1, 183.7, 44, 182, 287, c22.panel),
        geo22Arc(555.3, 101.2, 26, 352, 107, c22.amber, 1.8),
        geo22Arc(530.1, 183.7, 26, 287, 362, c22.amber, 1.8),
        geo22Dot(80, 168, c22.orange, 5),
        geo22Dot(555.3, 101.2, c22.ink, 3.5),
        geo22Dot(530.1, 183.7, c22.ink, 3.5),
        geo22Arrow(310, 196, 104, 177, c22.orange, 2),
        geo22Txt(858, 46, 'm', 13, c22.ink),
        geo22Txt(858, 214, 'n', 13, c22.ink),
        geo22Txt(592, 46, 't', 13, c22.tealInk),
        geo22Txt(572, 90, 'P', 12, c22.ink),
        geo22Txt(514, 202, 'Q', 12, c22.ink),
        geo22Txt(66, 192, 'M', 12, c22.orange),
        geo22Txt(230, 214, 'they meet at M — the angle there is 10°', 11.5, c22.orange),
        geo22Txt(505, 128, 'a4 = 65°', 12, c22.ink),
        geo22Txt(470, 156, 'a5 = 105°', 12, c22.ink),
        geo22Txt(598, 134, 'a3 = 115°', 12, c22.tealInk),
        geo22Txt(575, 153, 'a6 = 75°', 12, c22.tealInk),
        geo22Txt(370, 148, 'a4 + a5 = 170°', 12.5, c22.ink, 'middle', '700'),
        geo22Txt(370, 168, 'meet THIS side', 12, c22.orange, 'middle', '700'),
        geo22Txt(700, 148, 'a3 + a6 = 190°', 12.5, c22.ink, 'middle', '700'),
        geo22Txt(700, 168, 'no meeting this side', 12, c22.tealInk, 'middle', '600'),
      ]),
    },
    {
      kind: 'para',
      text: 'Every number printed on that figure is a witness, re-derived by the lesson’s engine before the page was allowed to show it. On the left of $t$: $a_4 = 65^\circ$ and $a_5 = 105^\circ$, sum $170^\circ$ — the shaded side, the side under $180^\circ$, the side where $M$ lives. On the right: $a_3 = 115^\circ$ and $a_6 = 75^\circ$, sum $190^\circ$ — over $180^\circ$, hence meeting-free. Notice what the arithmetic never needed: nobody located $M$, nobody extended a drawing, nobody measured the distance to the meeting. Two angle readings, one addition, one comparison against $180^\circ$ — and the infinite destiny of both lines is settled in both directions. Notice also the small number hiding at $M$: the deficit $180^\circ - 170^\circ = 10^\circ$ turns out to be EXACTLY the angle at which the two lines cross at their meeting point. Why a triangle’s angles should consense that way is the angle-sum theorem, which belongs to lesson 2.4; we plant the seed here, watch it in the figure, and cash it two lessons from now.',
    },
    {
      kind: 'formula',
      name: 'Same-side interior sums add to 360',
      latex: '(a_4 + a_5) + (a_3 + a_6) = 360^\\circ',
      note: 'two linear pairs, one per crossing — the left and right same-side sums are locked together, and the licence is pure 2.1 arithmetic (fifth-free)',
    },
    {
      kind: 'formula',
      name: 'Meet-side verdict (the fifth postulate in arithmetic)',
      latex: 'a_4 + a_5 < 180^\\circ \\;\\Rightarrow\\; m \\text{ and } n \\text{ meet on that side}',
      note: 'the whole content of the fifth postulate in one line; a sum of exactly 180 on both sides (forced mutually by the 360 law) is the parallel case',
    },
    {
      kind: 'formula',
      name: 'Deficit law (preview of 2.4)',
      latex: '\\text{meeting angle} = 180^\\circ - (\\text{same-side sum on the meeting side})',
      note: 'the shortfall below 180 becomes the angle at the crossing point M — the figure witness 180 − 170 = 10; proved with the triangle angle sum in 2.4',
    },
    {
      kind: 'example',
      title: 'Two lines are cut by a transversal $t$. The same-side interior angles on the left of $t$ measure $84^\\circ$ and $79.5^\\circ$. Find the left sum, the right sum, and the verdict on where the lines meet — naming the licence behind every step.',
      steps: [
        'Sol. Add the left pair: $84^\\circ + 79.5^\\circ = 163.5^\\circ$. This is plain arithmetic; no postulate is spent in the adding.',
        'Now, the side-sum law proved above: left sum and right sum are locked at $360^\\circ$, so the right-side sum is $360^\\circ - 163.5^\\circ = 196.5^\\circ$ — over $180^\\circ$, on the nose.',
        'So, the left sum $163.5^\\circ$ is under $180^\\circ$, and the fifth postulate applies verbatim: produced indefinitely, the two lines MEET on the left of $t$ — the side that carried the smaller sum.',
        'Check the contrast case: had the left sum been exactly $180^\\circ$, the right would read $360^\\circ - 180^\\circ = 180^\\circ$ as well — both sides exactly $180^\\circ$ is the parallel signature, and no meeting happens anywhere.',
        'Hence left sum $163.5^\\circ$, right sum $196.5^\\circ$, verdict: the lines meet on the LEFT of $t$, by the fifth postulate at the comparison $163.5^\\circ < 180^\\circ$.',
      ],
    },
    {
      kind: 'para',
      text: 'One more reading before the history, because it explains the next two thousand years. The fifth postulate is an IF-THEN about a SUM: it never mentions parallel lines, never mentions distance, never mentions squares or rectangles. Its two ingredients are angle arithmetic — which lesson 2.1 owns completely — and the infinite meeting — which nothing before the fifth can settle. That mixed parentage made it look like a theorem wearing a postulate’s badge, and generation after generation of geometers believed that enough cleverness could pry it loose from the first four postulates. The story of that belief, and of its magnificent failure, is the next section.',
    },

    /* -------------------------------------------------------------- */
    /* 4. the historical unease                                        */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The historical unease: a postulate on trial' },
    {
      kind: 'para',
      text: 'The complaint against the fifth postulate is older than most nations, and its first surviving voice belongs to Proclus, the Greek philosopher who around 450 CE wrote a commentary on the first book of the Elements — the same commentary that preserves so much of what we know about Greek geometry and its critics. Proclus had watched the postulate carefully, and his verdict on it is one of the most quoted sentences in the history of mathematics. He argued that it "ought even to be struck out of the Postulates altogether; for it is a theorem involving many difficulties" — an accusation, not a mood: in his view a statement that reads like a theorem SHOULD be a theorem, and a rulebook that assumes what it could prove has failed its own standard of cleanliness.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Historical note — Proclus, the first recorded objection (c. 450 CE)',
      text: 'Proclus of Alexandria, in his Commentary on the First Book of Euclid’s Elements, on the fifth postulate: it "ought even to be struck out of the Postulates altogether; for it is a theorem involving many difficulties." His reasoning was structural, not aesthetic. He observed that the CONVERSE of the postulate — lines that meet on a side must have that side’s sum under two right angles — is provable from the rest of the Elements (it follows from the exterior-angle inequality, which Euclid proves without the fifth). A statement whose converse is a theorem, Proclus reasoned, ought itself to be a theorem; the fact that Euclid assumed it anyway could only mean the proof had not yet been found. He was wrong about the conclusion and perfectly right about the difficulty — and the hunt he effectively began ran for nearly fourteen centuries.',
    },
    {
      kind: 'para',
      text: 'Proclus did not merely complain; he tried to fix the book. Like Ptolemy before him, he offered a proof of the fifth postulate — and his attempt is worth pausing over, because of WHERE it breaks. To settle that two lines must meet, Proclus leaned on the idea that parallel lines keep a constant distance between them: somewhere in the argument, quietly, he used the assumption that the gap between the lines never widens or narrows. Flag that move — we will return to it in the section on distance, and it is the most seductive trap in the entire subject: the equidistance property is NOT a self-evident truth about lines; it is, as the nineteenth century finally proved, exactly as strong as the fifth postulate itself. Proclus assumed the postulate’s equivalent to prove the postulate. Every attempted proof for the next fourteen hundred years failed the same way: each one smuggled in a new assumption, checked honestly, turned out to be the fifth postulate in disguise.',
    },
    {
      kind: 'para',
      text: 'Now count the years, because the arithmetic of the story is part of the story — every gap below is engine-checked. From Proclus around 450 to Saccheri’s Euclides ab omni naevo vindicatus in 1733 is 1283 years: more than a millennium of attempted proofs, each quietly circular, across the Greek, Islamic, and European mathematical worlds. Saccheri is the hinge of the tale, and lesson 1.2 has already banked his paradox: to vindicate Euclid, he assumed the fifth postulate FALSE and set out to derive a contradiction — and derived, instead, consequence after consequence of a strange but perfectly coherent geometry. Honest to his method and unwilling to accept what he had found, he pronounced the new results repugnant to the nature of the straight line and declared Euclid vindicated. He had walked up to the door of a new world, knocked, and reported that nobody was home. From Saccheri 1733 to Playfair’s cleaner statement in 1795 is 62 years. From Playfair to Lobachevsky’s publication in 1829 is 34 years. And from Lobachevsky to Bolyai in 1832 is just 3 — the shortest gap on the ladder, and the one that tells you the discovery was ripe: two young men, working separately and unknowingly, walked through the same door within three years of each other.',
    },
    {
      kind: 'para',
      text: 'Lobachevsky (1829) and Bolyai (1832) did what two millennia of hunters had declared impossible: they built a geometry in which the first four postulates hold and the fifth fails — through a point off a line, MORE than one parallel passes, infinitely many in fact — and it does not collapse into contradiction. Bolyai’s father, himself a veteran of the same hunt, had begged him to leave the parallels alone; the son answered that he had created a new and different world out of nothing. Gauss, the prince of mathematicians, had reached the same conclusion privately years earlier and published nothing. The full story of that new world — its triangles, its angle sums, its census of parallels — belongs to chapter 11, and this lesson deliberately stops at the door. What belongs to US is the logical autopsy: why had the hunt been doomed from the start?',
    },
    {
      kind: 'para',
      text: 'Lesson 1.3 gave you the tool for the autopsy: models and independence. To prove the fifth postulate from the first four, you would need an argument that works in EVERY model of the first four. But a model exists — the hyperbolic plane — in which the first four postulates (properly formulated, as Hilbert taught us to do) all hold and the fifth fails; and the sphere, with great circles as its lines, breaks the fifth in the other direction, with NO parallels at all. A statement that fails in a model of the other axioms is independent of them: no proof exists, not because geometers were lazy for 1283 years, but because the statement is simply not a consequence. The two-millennium hunt failed NECESSARILY. Proclus’s instinct — that the converse being a theorem is suspicious — was fine as instinct; the error was believing that the converse of a theorem must also be a theorem. The conditional family from 1.3 says otherwise: a conditional and its converse are different statements, and only the contrapositive comes free.',
    },

    /* -------------------------------------------------------------- */
    /* 5. Playfair's axiom                                             */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Playfair’s axiom: exactly one parallel' },
    {
      kind: 'para',
      text: 'Euclid’s fifth postulate says its business through a transversal and an angle sum — machinery that takes a paragraph to set up before the sentence can even be stated. In 1795 the Scottish mathematician John Playfair popularised a restatement so clean that most modern textbooks (including the exam boards this chapter serves) use it IN PLACE of the original. It needs no transversal, no angles, no sums: just a point, a line, and a counting word.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Playfair’s axiom (1795)',
      text: 'Through a point $P$ not on a line $\\ell$ there is EXACTLY ONE line parallel to $\\ell$. Symbolically, with the counting quantifier of lesson 1.3: $\\exists!\\ m$ through $P$ with $m \\parallel \\ell$. The "exactly one" is a double claim — existence ($\\exists$: at least one such line) AND uniqueness ($\\exists!$’s sharp half: at most one) — and the two halves will turn out to have very different prices.',
    },
    {
      kind: 'para',
      text: 'Unpack the quantifier the way lesson 1.3 taught you, because the whole nineteenth century hides inside it. EXISTENCE asks: does the parallel exist at all? Uniqueness asks: could there be a second one? The two questions are independent — a world can pass one and fail the other, and the two great non-Euclidean geometries split exactly along this seam: on the sphere, through $P$ there are ZERO parallels (existence fails); on the hyperbolic plane, through $P$ there are INFINITELY many (uniqueness fails). Only Euclid’s plane — the flat plane of this chapter, the one the fifth postulate governs — passes both halves at once. When we prove the equivalence with the fifth postulate below, watch which half costs what: you will find that existence is cheap, and uniqueness is where the entire two-millennium drama lives.',
    },
    {
      kind: 'derivation',
      title: 'Equivalence, direction one: the fifth postulate implies Playfair’s axiom',
      statement: 'Assume the fifth postulate in the angle-arithmetic form of this lesson. Let $P$ be a point not on a line $\\ell$. We prove Playfair’s axiom for $P$ and $\\ell$: exactly one line through $P$ is parallel to $\\ell$. Each licence is named where it is used; the two construction licences and the 180-test are flagged as forward references to the lessons that prove them.',
      steps: [
        { label: 'Drop the perpendicular to l', formula: 'PF \\perp \\ell,\\ F \\text{ on } \\ell', explanation: 'Construct the perpendicular from $P$ to $\\ell$, meeting it at the foot $F$. This is Euclid’s Proposition I.12, a construction of the Elements — we take it on licence here. It involves no parallel machinery whatsoever.' },
        { label: 'Erect the double perpendicular', formula: 'm \\text{ through } P \\text{ with } m \\perp PF', explanation: 'At the point $P$ on the line $PF$, erect the perpendicular $m$ (Euclid I.11 — again a construction licence, again parallel-free). The figure is now a doorway: $PF$ is a transversal cutting $m$ at $P$ and $\\ell$ at $F$.' },
        { label: 'Existence — both side-sums sit at 180', formula: '90^\\circ + 90^\\circ = 180^\\circ \\text{ on each side}', explanation: 'Because $m \\perp PF$ and $PF \\perp \\ell$, the same-side interior sums along the transversal $PF$ read $90^\\circ + 90^\\circ = 180^\\circ$ on BOTH sides. A pair of lines whose side-sums both sit at $180^\\circ$ cannot meet on either side: a meeting would form a triangle violating the exterior-angle inequality (Euclid I.16 — lesson 2.4’s theorem, honestly flagged as a forward licence). Hence $m \\parallel \\ell$: existence is proved, and notice — the fifth postulate has NOT been used.' },
        { label: 'Any rival line through P is a tilt', formula: '\\theta = \\angle(m, k) > 0', explanation: 'Let $k$ be any line through $P$ other than $m$. Since $k \\neq m$, it makes with $m$ some nonzero angle $\\theta$ (with $0 < \\theta \\leq 90^\\circ$), and it tilts toward exactly one side of the transversal $PF$.' },
        { label: 'The tilt drains a side-sum', formula: '180^\\circ - \\theta < 180^\\circ', explanation: 'On the side toward which $k$ tilts, the same-side interior sum along $PF$ drops from $180^\\circ$ to exactly $180^\\circ - \\theta$: the angle at $P$ on that side shrinks by $\\theta$ while the angle at $F$ is untouched. This is angle arithmetic at a single crossing — 2.1 work, no postulate spent.' },
        { label: 'The fifth postulate convicts the tilt', formula: 'k \\text{ meets } \\ell \\text{ on that side}', explanation: 'That side-sum now reads under $180^\\circ$, which is precisely the hypothesis of the fifth postulate. Conclusion: $k$, produced indefinitely, meets $\\ell$ on that side — so $k$ is NOT parallel to $\\ell$. Here, and only here, the fifth postulate was spent.' },
        { label: 'Assemble exactly-one', formula: '\\exists\\, m \\parallel \\ell \\;\\wedge\\; \\forall\\, k \\neq m:\\ k \\text{ meets } \\ell', explanation: 'A parallel through $P$ exists (the double perpendicular, step 3), and every rival meets $\\ell$ (steps 4 through 6). Existence and at-most-one together are the $\\exists!$ of lesson 1.3 — the quantifier doing exactly the job it was designed for.' },
      ],
      result: 'The fifth postulate implies Playfair’s axiom. The audit trail is the real content: EXISTENCE cost no fifth at all — the double perpendicular and the 180-test are fifth-free — while UNIQUENESS was purchased with one single spending of the postulate, which then convicts every tilt through the same sentence.',
    },
    {
      kind: 'para',
      text: 'A sketch of the converse — flagged honestly as a sketch, because two of its licences are theorems of lesson 2.3 and one belongs to 2.4, and a proof that borrows unproved licences is not yet a proof. Suppose Playfair’s axiom holds and let a transversal cut two lines with the left same-side sum under $180^\\circ$; we want the meeting on the left. Through the upper crossing point $P$, construct the line that brings the left sum to exactly $180^\\circ$ (angle-copying at $P$ — a construction licence). That line is parallel to the lower line by the 180-test (the forward licence again), so by Playfair it is the ONLY parallel through $P$ — and the original upper line, differing from it, cannot also be parallel: it meets the lower line somewhere. The side remains to be pinned: a meeting on the right would force a triangle violating the exterior-angle inequality (2.4’s licence), and the right sum is over $180^\\circ$ — so the meeting is on the left, and the fifth postulate is recovered. Chapter 11 assembles the full equivalence with every licence proved; what this sketch establishes today is the SHAPE of the argument — Playfair and Euclid are two costumes for one and the same fact.',
    },
    {
      kind: 'figure',
      caption: 'Playfair’s axiom as a picture. The given line ℓ runs along the bottom; P sits above it. The bold green line m is the unique parallel through P — the double-perpendicular construction, with PF ⊥ ℓ at the foot F and PF ⊥ m at P, so both same-side interior sums along the transversal PF read 90° + 90° = 180°. Every red line through P is a tilt: each drains one side-sum below 180°, and the fifth postulate convicts it — the orange dots on ℓ are its verdicts, the meeting points. The greyed dashed line is the hyperbolic tease: it tilts, and Euclid’s fifth says it must therefore meet ℓ far beyond the window — but on the hyperbolic plane of chapter 11, tilted lines through P can miss ℓ forever.',
      svg: geo22Svg(900, 320, 'Playfair axiom picture: a horizontal line l at the bottom, point P above it, a bold green parallel m through P, a perpendicular PF with right-angle marks, four red tilted lines through P each meeting l at an orange dot, and one greyed dashed line through P that exits the window without meeting l.', [
        geo22Txt(450, 24, 'PLAYFAIR’S AXIOM: EXACTLY ONE PARALLEL THROUGH P', 13, c22.ink, 'middle', '700'),
        geo22Line(30, 260, 870, 260, c22.ink, 3),
        geo22Line(30, 80, 870, 80, c22.green, 4.5),
        geo22Line(450, 80, 450, 260, c22.amber, 2),
        geo22RA(450, 80, 'down'),
        geo22RA(450, 260, 'up'),
        geo22Line(450, 80, 661.8, 260, c22.red, 2),
        geo22Line(450, 80, 238.2, 260, c22.red, 2),
        geo22Line(450, 80, 750, 260, c22.red, 2),
        geo22Line(450, 80, 150, 260, c22.red, 2),
        geo22Line(450, 80, 870, 172.4, c22.teal, 2, '7,7'),
        geo22Dot(661.8, 260, c22.orange, 4),
        geo22Dot(238.2, 260, c22.orange, 4),
        geo22Dot(750, 260, c22.orange, 4),
        geo22Dot(150, 260, c22.orange, 4),
        geo22Dot(450, 80, c22.ink, 4.5),
        geo22Dot(450, 260, c22.ink, 3.5),
        geo22Txt(436, 68, 'P', 12.5, c22.ink),
        geo22Txt(436, 250, 'F', 12, c22.ink),
        geo22Txt(52, 282, 'ℓ', 13, c22.ink),
        geo22Txt(196, 66, 'the unique parallel m', 12, c22.green, 'middle', '700'),
        geo22Txt(450, 162, 'PF ⊥ ℓ and PF ⊥ m', 11.5, c22.amber),
        geo22Txt(450, 180, 'sums 90° + 90° = 180°', 11.5, c22.amber),
        geo22Txt(740, 48, 'the hyperbolic tease: on the hyperbolic', 11.5, c22.tealInk),
        geo22Txt(740, 66, 'plane, tilted lines can miss ℓ forever', 11.5, c22.tealInk),
        geo22Arrow(716, 78, 608, 112, c22.teal, 1.6),
        geo22Txt(450, 288, 'each tilt leaves a side sum under 180° — the fifth postulate convicts every tilted line', 11.5, c22.orange),
      ]),
    },
    {
      kind: 'para',
      text: 'Read the figure the way the proof ran, top to bottom. The perpendicular $PF$ is the transversal; the bold line $m$ is the double perpendicular, and its two right-angle marks ARE the existence proof — both side-sums sit at $90^\\circ + 90^\\circ = 180^\\circ$, and no meeting is possible on either side. The four red lines are four attempts at a second parallel, with tilts of various sizes; the orange dots on $\\ell$ are the fifth postulate’s verdicts — every single tilt meets $\\ell$, exactly as step 6 of the derivation promised. Notice that the conviction does not care how SMALL the tilt is: a tilt of one degree drains the sum to $179^\\circ$, still under, still convicted — the fifth postulate is a cliff with no shallow end. And the greyed dashed line? In this figure it tilts and therefore, in Euclid’s world, it too must meet $\\ell$ — far beyond the right edge of the window, at a distance no drawing could show. But label it honestly: on the hyperbolic plane, that same line would NEVER meet $\\ell$. The figure is drawing one world and whispering about another.',
    },
    {
      kind: 'formula',
      name: 'Playfair’s axiom (the exactly-one form)',
      latex: 'P \\notin \\ell\\ \\Rightarrow\\ \\exists!\\ m:\\ P \\in m \\wedge m \\parallel \\ell',
      note: 'existence is fifth-free (the double perpendicular); uniqueness is exactly what the fifth postulate buys — every tilt is convicted',
    },
    {
      kind: 'example',
      title: 'Through a point $P$ off a line $\\ell$, three candidate lines are drawn. Along a fixed transversal through $P$, their left same-side interior sums read $155^\\circ$, $180^\\circ$ and $174^\\circ$. Decide, with reasons, which of the three are parallel to $\\ell$ — the Playfair uniqueness walk.',
      steps: [
        'Sol. Test each candidate against the 180 standard, one at a time, beginning with the 180 line: its left sum is exactly $180^\\circ$, so its right sum is $360^\\circ - 180^\\circ = 180^\\circ$ as well — both sides sit exactly at $180^\\circ$, the parallel signature (the 180-test, Euclid I.28, proved in lesson 2.3). It is a parallel.',
        'Now, the 155 line: its left sum is $155^\\circ < 180^\\circ$, and the fifth postulate convicts it without appeal — produced indefinitely, it meets $\\ell$ on the left side. Not a parallel.',
        'And the 174 line: the same crime with a smaller deficit — $174^\\circ < 180^\\circ$, so it too meets $\\ell$ on the left, only at a shallower angle and much farther along. Not a parallel.',
        'So, exactly one of the three survives — the 180 line. And this is no accident of the chosen numbers: EVERY line through $P$ other than the 180 line is a tilt through some angle $\\theta$, and every tilt drains one side-sum to $180^\\circ - \\theta < 180^\\circ$, where the fifth postulate is waiting for it.',
        'Hence the parallel through $P$ is unique — the 180-sum line, and no other. The elimination walk IS Playfair’s uniqueness half, run on three candidates instead of on all lines at once.',
      ],
    },
    {
      kind: 'para',
      text: 'Pause on what the example just did, because it is the shape of every uniqueness argument in mathematics. We did not examine "all lines through $P$" one by one — there are infinitely many, and infinitudes do not surrender to lists. Instead we proved a universal sentence with one stroke: EVERY rival is a tilt, and every tilt is convicted by the same postulate. Uniqueness proofs are almost always like this — find the property that every possible rival must have, then show that property is fatal. Lesson 1.3 called this the strategy behind $\\exists!$; today you have watched it decide a question about the infinite with a single comparison at $180^\\circ$.',
    },

    /* -------------------------------------------------------------- */
    /* 6. the parallel census                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The parallel census: one, zero, or infinitely many' },
    {
      kind: 'para',
      text: 'Playfair’s axiom, read as a counting statement, asks a census question: through a point $P$ off a line $\\ell$, HOW MANY lines are parallel to $\\ell$? The Euclidean answer is pinned into this chapter’s axioms: exactly one. But the QUESTION itself is portable — it makes sense in any geometry that has points, lines and incidence — and the answer turns out to be the single most diagnostic number a geometry owns. The census has no middle floors: the count is either $1$, or $0$, or infinitely many (once a second parallel exists, the geometry supplies a whole fan — a fact chapter 11 proves with machinery we do not yet own). Here is the full census, honestly labelled as a preview: the counts are pinned today, the constructions and models that justify them belong to chapter 11.',
    },
    {
      kind: 'table',
      caption: 'The parallel census across the three geometries — a chapter 11 preview: the counts and verdicts are pinned here, the models that certify them come later',
      head: ['Geometry', 'Parallels through P off ℓ', 'What becomes of meeting', 'The Playfair verdict'],
      rows: [
        ['Euclidean — the plane of this chapter', 'exactly $1$: the double perpendicular', 'every tilted line meets $\\ell$, on the side whose same-side sum fell under $180^\\circ$', 'BOTH halves hold — existence and uniqueness; the fifth postulate is TRUE here'],
        ['Spherical — the sphere, lines = great circles', '$0$: none at all', 'any two distinct great circles meet in exactly $2$ antipodal points', 'EXISTENCE fails — there is not even one parallel to be found'],
        ['Hyperbolic — the plane of chapter 11', 'infinitely many: a whole fan through $P$', 'a fan of lines through $P$ misses $\\ell$ forever; a side-sum can sit under $180^\\circ$ with no meeting anywhere', 'UNIQUENESS fails — the fifth postulate is FALSE here'],
      ],
    },
    {
      kind: 'para',
      text: 'The spherical row deserves its own paragraph, because you carry the evidence in your travel history. The "lines" of the sphere are its GREAT CIRCLES — the circles cut on the sphere by planes through its center, like the equator and like every meridian. Great circles are the straightest things the sphere offers: walk along one and you never turn. And any two DISTINCT great circles meet in exactly two points, which are antipodal — a pair of diametrically opposite points. The meridians make this vivid: every meridian crosses every other meridian at BOTH poles. So on the sphere, through a point $P$ off a great circle $\\ell$, there is no parallel at all — every candidate meets $\\ell$ twice. Hence the airplane aside you have probably noticed without naming: long-haul routes arc toward the poles on the seat-back map because the aircraft follows a great circle, and two such routes that look almost parallel on that flat map are in fact doomed to cross — not once, but twice, at antipodal points. The flat map flatters lines into looking parallel; the sphere does not cooperate.',
    },
    {
      kind: 'para',
      text: 'The hyperbolic row is the door Saccheri knocked on and refused to open. On the hyperbolic plane, through a point $P$ off a line $\\ell$ there passes not just one parallel but an entire FAN of them: all the lines through $P$ that stay within two boundary rays miss $\\ell$ forever, and there are infinitely many of them. The fifth postulate fails there in the most concrete way possible: a transversal can cut two lines with a same-side interior sum under $180^\\circ$ — the sum can be as small as the figure on this page shows — and the lines STILL never meet. Every sentence of this lesson’s arithmetic remains true; what breaks is the postulate’s promise to convert a small sum into a meeting. We name the door, we do not walk through it: the constructions, the models, and the crowning fact — that hyperbolic geometry is as consistent as Euclidean — are chapter 11’s story.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Why the census is the logical autopsy',
      text: 'Lesson 1.3 taught you that a statement is INDEPENDENT of an axiom list when some model satisfies the list but falsifies the statement — and that such a statement can never be proved from the list. The census table is exactly that argument in miniature. The Euclidean plane satisfies the fifth; the hyperbolic plane satisfies the rest while falsifying it; therefore the fifth is not a consequence of the rest, and the 1283-year proof hunt was doomed in principle, not in effort. One honesty note the table itself demands: the sphere is the intuition-pump for this argument, not yet a rigorous model — great circles close up (straining the extension postulate) and antipodal pairs sit on many "lines" (straining uniqueness of the joining line). Cleaning the axioms so that the counter-models stand on legally solid ground is precisely Hilbert’s programme and chapter 11’s opening move.',
    },

    /* -------------------------------------------------------------- */
    /* 7. distance between parallels                                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The distance between parallels: the equidistant character' },
    {
      kind: 'para',
      text: 'Ask a stranger what "parallel" means and they will draw railway tracks: two lines that stay the same distance apart forever. That picture is not wrong in Euclid’s plane — but as a DEFINITION it is a trap, and the trap’s history is Proclus’s history. Let us set the vocabulary carefully. The DISTANCE between two lines at a point of one of them is the length of the SHORTEST segment joining that point to the other line — and the shortest join, when it exists, is always the perpendicular one: a slanted connector and the perpendicular from its foot form a right triangle in which the slanted side plays the hypotenuse, and the hypotenuse is the longest side (lesson 1.5 banked this; 2.4 will re-derive it in angle language). A segment perpendicular to BOTH lines is called a COMMON PERPENDICULAR of the pair.',
    },
    {
      kind: 'para',
      text: 'In the Euclidean plane, the common perpendiculars between two parallels are all EQUAL — that is the equidistant character: the strip between the parallels has constant width, and you may measure it anywhere. Figure F3 draws the strip. The full proof that the four connectors in the left panel are equal uses the equality of alternate interior angles — Euclid I.29, famous in this chapter as the very first proposition in which Euclid SPENDS the fifth postulate — and that machinery is lesson 2.3’s centrepiece; we flag the licence forward, as always. What belongs to today is the honest bookkeeping in the other direction, and it is the point this section exists to make: the equidistant character is not a bonus property of parallels that comes free with the fifth postulate — it is EQUIVALENT to the fifth postulate. Assume every parallel pair is equidistant, and the fifth postulate follows; assume the fifth, and equidistance follows. Neither can be had without the other. That is why Proclus’s attempted proof — which quietly leaned on constant distance — was circular: it assumed the postulate’s exact equal to prove the postulate.',
    },
    {
      kind: 'figure',
      caption: 'Distance between parallels — the Euclidean strip and the counter-picture. LEFT: between the parallels m and n, four common perpendiculars are drawn, each with right-angle marks at both ends and the same tick: every one has the same length d, so the strip has constant width — the equidistant character, itself equivalent to the fifth postulate. RIGHT: the counter-picture on a circle — the latitude chords sit at equal-looking gaps of 30 above and below the equator, but they are NOT straight lines of the sphere (only great circles are), and the family dies at the poles: equal-looking gaps that do not continue.',
      svg: geo22Svg(900, 330, 'Left panel: two horizontal parallels m and n with four equal perpendicular connectors labeled d, each marked with right angles and the same tick. Right panel: a circle with a horizontal equator diameter and two dashed latitude chords at equal gaps above and below, labeled equal gaps, with a note that latitude chords are not straight lines of the sphere.', [
        geo22Txt(450, 22, 'DISTANCE BETWEEN PARALLELS — THE EUCLIDEAN STRIP AND THE COUNTER-PICTURE', 13, c22.ink, 'middle', '700'),
        geo22Rect(20, 44, 416, 240, c22.panel, c22.green),
        geo22Line(40, 100, 416, 100, c22.green, 3),
        geo22Line(40, 228, 416, 228, c22.green, 3),
        geo22Txt(408, 92, 'm', 12, c22.ink),
        geo22Txt(408, 244, 'n', 12, c22.ink),
        geo22Txt(228, 66, 'the Euclidean strip', 12.5, c22.ink, 'middle', '700'),
        geo22Line(100, 100, 100, 228, c22.amber, 2),
        geo22Line(190, 100, 190, 228, c22.amber, 2),
        geo22Line(280, 100, 280, 228, c22.amber, 2),
        geo22Line(360, 100, 360, 228, c22.amber, 2),
        geo22RA(100, 100, 'down'),
        geo22RA(190, 100, 'down'),
        geo22RA(280, 100, 'down'),
        geo22RA(360, 100, 'down'),
        geo22RA(100, 228, 'up'),
        geo22RA(190, 228, 'up'),
        geo22RA(280, 228, 'up'),
        geo22RA(360, 228, 'up'),
        geo22Line(93, 172, 107, 158, c22.ink, 1.8),
        geo22Line(183, 172, 197, 158, c22.ink, 1.8),
        geo22Line(273, 172, 287, 158, c22.ink, 1.8),
        geo22Line(353, 172, 367, 158, c22.ink, 1.8),
        geo22Txt(84, 168, 'd', 12.5, c22.tealInk, 'middle', '700'),
        geo22Txt(344, 168, 'd', 12.5, c22.tealInk, 'middle', '700'),
        geo22Txt(228, 272, 'all four perpendiculars have the same length d', 12, c22.ink),
        geo22Rect(464, 44, 416, 240, c22.panel2, c22.orange),
        geo22Txt(672, 66, 'the sphere’s latitudes', 12.5, c22.ink, 'middle', '700'),
        geo22Circ(672, 164, 82, c22.ink, 3),
        geo22Line(590, 164, 754, 164, c22.green, 3),
        geo22Line(595.7, 134, 748.3, 134, c22.amber, 2.2, '6,6'),
        geo22Line(595.7, 194, 748.3, 194, c22.amber, 2.2, '6,6'),
        geo22Line(620, 134, 620, 164, c22.teal, 2),
        geo22Line(620, 164, 620, 194, c22.teal, 2),
        geo22Txt(672, 156, 'equator', 11.5, c22.green),
        geo22Txt(548, 128, 'equal gaps', 11.5, c22.tealInk),
        geo22Arrow(586, 130, 606, 142, c22.teal, 1.6),
        geo22Txt(672, 74, 'N', 12, c22.ink),
        geo22Txt(672, 258, 'equal-looking gaps — but latitude chords', 11.5, c22.orange),
        geo22Txt(672, 274, 'are NOT straight lines of the sphere', 11.5, c22.orange),
      ]),
    },
    {
      kind: 'para',
      text: 'Read the two panels against each other — the comparison IS the lesson. The left strip continues forever with every connector equal; that tireless continuation is precisely what the fifth postulate pays for, and in the Euclidean plane it never fails. The right panel shows the nearest thing a sphere can offer: step $30$ units off the equator in each direction and you find the latitude chords, sitting at equal-looking gaps — but the picture quietly cheats twice. First, those chords are NOT lines of the sphere: a genuine spherical line is a great circle, and the latitudes are small circles — their planes miss the center — so the "strip" is not made of straight things at all. Second, the family does not continue: walk far enough along the sphere and the latitudes pinch out at the poles. Equal-looking gaps that do not continue — that is the honest caption. And the hyperbolic plane breaks the picture more sharply still: there, lines that never meet are simply NOT equidistant. Two hyperbolic parallels have a single common perpendicular — the unique shortest crossing — and as you walk away from it in either direction, the perpendicular segments between the lines grow LONGER. The gap does not hold and does not shrink: it grows, without bound, forever. A railway that widens as it runs — chapter 11 will draw it; today we only point at the door it comes through.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution — "parallel means equidistant" is a Euclidean privilege',
      text: 'The constant-width picture of parallels is TRUE in Euclid’s plane and FALSE as a general fact about "lines that never meet". Two warnings follow. First, never use equidistance to PROVE the fifth postulate or Playfair’s axiom: the equidistant character is equivalent to the postulate, so such a proof is circular — this is exactly the flaw that sank Proclus, Ptolemy, and a millennium of successors. Second, when a question says "parallel", do not silently read "equidistant": on the hyperbolic plane, parallels exist in abundance and NOT ONE of them keeps a constant distance from its partner. In this book’s convention, parallel means only: coplanar, distinct, and never meeting — everything else must be earned by a licence.',
    },

    /* -------------------------------------------------------------- */
    /* 8. exam callout + terms                                         */
    /* -------------------------------------------------------------- */
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner — which form, which quantifier, which side',
      text: 'TRAP ONE, the costume test. The postulate’s content arrives in (at least) three costumes: Euclid’s transversal form (same-side sum under two right angles forces the meeting), Playfair’s point form (exactly one parallel through an outside point), and the distance form (parallels are equidistant). When a question states one form and asks you to USE another, say which form you are invoking and in which direction — a bare "by the parallel postulate" earns half marks at best. TRAP TWO, the quantifier. "Exactly one" is TWO claims: existence AND uniqueness — and exam distractors love to swap in "at least one" (true on the hyperbolic plane), "at most one" (true even where nothing exists — zero counts as at most one, which is the spherical case), and plain "one" in a context where the geometry is not specified. Before answering a counting question about parallels, ask: WHICH GEOMETRY is the question set in? TRAP THREE, the side verdict. Given a same-side interior sum, the mark is earned in three moves: compare with $180^\\circ$, NAME the side, and give the verdict — a sum of $190^\\circ$ does NOT mean "they meet on that side"; it means the OTHER side is under $180^\\circ$ (by the 360 law) and the meeting, if the lines are not parallel, is there. A sum of exactly $180^\\circ$ means the parallel case on BOTH sides at once — the 360 law leaves no other option. TRAP FOUR, the circular proof. If a proof of the postulate’s consequence quietly uses equidistance of parallels, or "the perpendicular distance stays constant", strike it: that licence is equivalent to the postulate itself. Examiners have been setting that trap since Proclus walked into it in 450 CE.',
    },
    {
      kind: 'para',
      text: 'Gather the licences you now carry, because the next lesson will use every one of them at speed. The definition of parallel — coplanar, distinct, never meeting — and its notation $m \\parallel n$. The side-sum law $(a_4 + a_5) + (a_3 + a_6) = 360^\\circ$, licensed by two linear pairs. The meet-side verdict: the fifth postulate’s arithmetic heart, comparing a same-side sum with $180^\\circ$ and naming the side. Playfair’s $\\exists!$, with the existence half fifth-free and the uniqueness half costing exactly one spending of the postulate. The census — one, zero, infinitely many — and the year ladder that took the question from Proclus to Bolyai: 450 to 1733 to 1795 to 1829 to 1832. And the equidistant character, trusted as a picture, used as a theorem only with its fifth-postulate receipt attached. Lesson 2.3 opens Euclid’s ledger at Proposition I.29 — the exact line in the Elements where the fifth postulate is finally spent — and turns the angle census of a transversal into machinery.',
    },
    {
      kind: 'terms',
      items: [
        { term: 'parallel lines', def: 'Two DISTINCT lines in one plane with no point in common; written $m \\parallel n$. The definition asserts coplanarity, distinctness, and empty intersection — and its "never meeting" is a claim about the infinite extensions, checkable by no drawing.' },
        { term: 'transversal', def: 'A line that cuts two (or more) lines at distinct points, creating the eight-angle census that chapter 2 works with: four angles at each crossing, paired as interior/exterior and left/right.' },
        { term: 'same-side interior angles', def: 'The two angles BETWEEN the cut lines that lie on the SAME side of the transversal — at the upper crossing the lower angle, at the lower crossing the upper angle. Their sum, compared with $180^\\circ$, drives the fifth postulate’s verdict.' },
        { term: 'fifth postulate (parallel postulate)', def: 'Euclid’s assumption: if a transversal makes the same-side interior angles on one side sum to less than $180^\\circ$, the two lines — produced indefinitely — meet on that side. Equivalent to Playfair’s axiom and to the equidistant character of parallels.' },
        { term: 'Playfair’s axiom', def: 'Through a point $P$ not on a line $\\ell$ there is exactly one line parallel to $\\ell$ (1795). The "exactly one" packs existence (fifth-free, via the double perpendicular) and uniqueness (purchased by the fifth postulate’s tilt conviction).' },
        { term: 'existence and uniqueness halves', def: 'The decomposition of $\\exists!$ into "at least one" and "at most one". The sphere fails the first half (no parallels); the hyperbolic plane fails the second (infinitely many); Euclid’s plane alone passes both.' },
        { term: 'deficit', def: 'The shortfall $180^\\circ$ minus a same-side interior sum on the meeting side. In the figure witnesses it is $10^\\circ$; lesson 2.4 proves it equals the angle at which the two lines cross at their meeting point.' },
        { term: 'common perpendicular', def: 'A segment perpendicular to each of two lines, joining them. Between Euclidean parallels every common perpendicular has the same length; on the hyperbolic plane the common perpendicular between two non-meeting lines is unique and all others are longer.' },
        { term: 'equidistant lines', def: 'Two lines such that every perpendicular segment joining them has the same length. In Euclidean geometry this is exactly the parallel character; as an ASSUMPTION it is equivalent to the fifth postulate — the trap Proclus fell into.' },
        { term: 'great circle', def: 'The intersection of a sphere with a plane through its center: the sphere’s "straight lines". Any two distinct great circles meet in exactly two antipodal points, so the spherical parallel count is zero.' },
        { term: 'hyperbolic geometry', def: 'The geometry in which, through a point off a line, infinitely many parallels pass. It satisfies the fifth-free machinery of this lesson while breaking the fifth postulate’s meeting promise; its full development is chapter 11.' },
      ],
    },


    /* ==== back half (seat 127-b): quiz + exercises + coda — spliced ==== */
  /* -------------------------------------------------------------- */
  /* quiz — engine P02: keys [1,2,0,3,1], pinned tokens, audits      */
  /* -------------------------------------------------------------- */
  {
    kind: 'quiz',
    title: 'Self-check quiz',
    items: [
      {
        q: 'Euclid’s fifth postulate speaks when a transversal cuts two lines and the same-side interior angles on one side sum to $158^\circ$. What does the postulate guarantee?',
        options: [
          'The lines are parallel, because $158^\circ$ is closer to $180^\circ$ than to $90^\circ$',
          'The lines meet on THAT side of the transversal — the side carrying the $158^\circ$ sum',
          'The lines meet on the other side of the transversal, where the same-side sum is $360^\circ - 158^\circ = 202^\circ$',
          'Nothing can be concluded — the postulate only speaks when the sum is exactly $180^\circ$',
        ],
        answer: 1,
        explain:
          'The fifth postulate speaks exactly when a side dips under budget: if the same-side interior angles on one side of the transversal sum to less than two right angles, the two lines, produced indefinitely, meet on that side. Here $158^\circ < 180^\circ$, so the meeting is guaranteed on the side that carries the $158^\circ$ sum — option (b). Option (a) inverts the verdict: only the exact sum $180^\circ$ certifies parallel (that is I.28’s job), and "close to $180^\circ$" is not a licence geometry grants. Option (c) reads the postulate backwards — the meeting side is the one whose sum is UNDER $180^\circ$, while the other side’s $202^\circ = 360^\circ - 158^\circ$ is over budget and can never force a meeting. Option (d) shrinks the postulate’s range: the exactly-$180^\circ$ case is the special parallel case; the postulate’s whole job is to speak when a side is strictly less than $180^\circ$.',
      },
      {
        q: 'Playfair’s axiom (1795) says that through a point $P$ not on a line $\ell$ there is exactly one line parallel to $\ell$. Logically, what does "exactly one" unpack into?',
        options: [
          'Existence alone — at least one parallel through $P$ is guaranteed, and more may follow',
          'Uniqueness alone — the parallel through $P$, if there is one, is the only one',
          'Existence and uniqueness together — at least one parallel exists, and at most one exists',
          'A construction demand — the parallel must first be drawn with ruler and compass',
        ],
        answer: 2,
        explain:
          '"Exactly one" is the quantifier $\exists!$, and it splits into two independent claims: EXISTENCE (at least one parallel through $P$) and UNIQUENESS (at most one) — option (c) is the only one that demands both halves. Option (a) keeps existence and even invites extras; that is precisely the hyperbolic situation, where a whole fan of parallels passes through $P$, so "at least one" is strictly weaker than "exactly one". Option (b) keeps only uniqueness, quietly assuming a parallel is already there to be unique — on the sphere there are ZERO parallels through $P$ (any two great circles meet), and being unique about nothing is not "exactly one". Option (d) confuses truth with construction: the axiom asserts a count, not a drawing procedure — the double-perpendicular construction arrives later as the existence half’s certificate, not as part of the claim.',
      },
      {
        q: 'In the Euclidean plane — the geometry you have used all your life — how many lines through a point $P$ not on a line $\ell$ run parallel to $\ell$?',
        options: [
          'exactly one — the Euclidean entry of the parallel census',
          'none — every line through $P$ eventually meets $\ell$',
          'infinitely many — a whole fan of lines through $P$ avoids $\ell$',
          'two — one on each side of the perpendicular from $P$ to $\ell$',
        ],
        answer: 0,
        explain:
          'The Euclidean census line: through $P$ there is exactly ONE parallel to $\ell$ — option (a); this is Playfair’s axiom, and it is equivalent to Euclid’s fifth postulate, so it holds in precisely the geometry the Elements describe. Option (b) is the spherical count: on a sphere any two great circles meet (in a pair of antipodal points), so not even one parallel exists. Option (c) is the hyperbolic count: refuse the fifth postulate and a fan of non-meeting lines passes through $P$ — infinitely many. Option (d) is the subtle near-miss: a pair of "boundary" parallels through $P$ is a hyperbolic phenomenon (the two limiting parallels that bound the fan), and even there they do not exhaust the parallels; the Euclidean plane permits no second parallel of any kind, because uniqueness holds outright.',
      },
      {
        q: 'A transversal cuts two lines, and on the LEFT of the transversal the same-side interior angles measure $62^\circ$ and $105^\circ$. What is the honest verdict?',
        options: [
          'The lines are parallel — $62^\circ + 105^\circ = 167^\circ$ is close enough to $180^\circ$',
          'The lines meet on the RIGHT of the transversal — the side whose sum is $360^\circ - 167^\circ = 193^\circ$',
          'No verdict is possible — the fifth postulate applies only when the two angles are equal',
          'The lines meet on the LEFT — the sum $62^\circ + 105^\circ = 167^\circ$ is less than 180 degrees',
        ],
        answer: 3,
        explain:
          'Add the left-side pair: $62^\circ + 105^\circ = 167^\circ$, and $167^\circ < 180^\circ$, so the fifth postulate convicts the LEFT side — the lines must meet there — option (d). Option (a) invents a tolerance zone: geometry has no "close enough"; only the exact sum $180^\circ$ gives the parallel verdict (I.28). Option (b) picks the wrong side: the meeting happens on the side whose sum is UNDER $180^\circ$, while $360^\circ - 167^\circ = 193^\circ$ is over budget and can force nothing. Option (c) misstates the trigger: the postulate watches the SUM, not the equality of the two angles — $90^\circ$ and $90^\circ$ is merely one way of reaching $180^\circ$, and equality is neither required nor relevant.',
      },
      {
        q: 'Proclus (c. 450 CE) reviewed Euclid’s postulates and argued that the fifth "ought even to be struck out of the postulates altogether". What was the complaint?',
        options: [
          'The postulate is false — it contradicts the other four postulates',
          'The postulate is repugnant — it reads like a theorem and so ought to be proved, not assumed',
          'The postulate is redundant — Playfair’s simpler axiom had already replaced it',
          'The postulate is unprovable — Proclus held a correct proof that no derivation exists',
        ],
        answer: 1,
        explain:
          'Proclus judged the fifth postulate repugnant to the character of a postulate: it asserts what reads like a theorem — "it is a theorem involving many difficulties", he wrote — so it ought to be proved from the rest rather than assumed — option (b). Option (a) is far too strong: Proclus never doubted the postulate’s truth and used it freely; the complaint was about its ROLE in the rulebook, not its truth. Option (c) is anachronism by thirteen centuries: Playfair’s restatement came in 1795, and it does not retire the fifth — it is logically EQUIVALENT to it. Option (d) credits Proclus with a discovery made 1400 years later: the impossibility of proving the fifth from the other axioms was only established once Lobachevsky and Bolyai had built the consistent geometry that refuses it.',
      },
    ],
  },
  /* -------------------------------------------------------------- */
  /* exercises — engine P03/P08/P04b: 15 questions, L1..L6          */
  /* -------------------------------------------------------------- */
  {
    kind: 'exercises',
    title: 'Exercises — verdicts, walks and the census',
    sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'Lines $m$ and $n$ are cut by a transversal $t$. On one side of $t$ the two same-side interior angles measure $64^\circ$ and $116^\circ$. Give the verdict and name the licence.',
            solution: [
              'Sol. Add the same-side interior pair: $64^\circ + 116^\circ = 180^\circ$ exactly.',
              'Now, the side-sum law gives the other side too: $360^\circ - 180^\circ = 180^\circ$ — no side of the configuration dips under $180^\circ$.',
              'A same-side sum of exactly $180^\circ$ delivers the parallel verdict, and the licence is Euclid I.28 — proved WITHOUT the fifth postulate, which is why this is the cheap direction.',
              'Hence $m \\parallel n$: neither side ever falls under $180^\circ$, so no meeting is ever forced.',
            ],
            answer: 'Parallel — $64^\circ + 116^\circ = 180^\circ$ exactly (licence: Euclid I.28, no fifth postulate spent)',
          },
          {
            q: 'A transversal $t$ cuts line $n$ (above) and line $m$ (below). The same-side interior angles on the LEFT of $t$ measure $47^\circ$ and $121^\circ$. Give the verdict, compute the other side’s sum, and find the angle at which the lines close.',
            solution: [
              'Sol. Add the left-side pair: $47^\circ + 121^\circ = 168^\circ$.',
              'Compare: $168^\circ < 180^\circ$, so the fifth postulate convicts the LEFT — the lines meet on that side.',
              'The other side: $360^\circ - 168^\circ = 192^\circ$, over budget, unable to force anything.',
              'The closing angle: the transversal and the two lines frame a triangle whose apex angle is the deficit $180^\circ - 168^\circ = 12^\circ$ — the diagram beside this solution draws the conviction, apex arc marked at the meeting point $M$.',
              'Hence: meet on the left; the other side carries $192^\circ$; the lines close at $12^\circ$.',
            ],
            answer: 'Meet on the left — $47^\circ + 121^\circ = 168^\circ < 180^\circ$; the other side carries $192^\circ$ (closing angle $12^\circ$)',
            figures: [
              {
                caption:
                  'The conviction drawn to scale: lines $m$ and $n$ cut by the vertical transversal $t$, with the left-side interior angles $47^\circ$ at $A$ and $121^\circ$ at $B$; the tinted triangle closes at the meeting point $M$ on the left, where the apex angle is the deficit $180^\circ - 168^\circ = 12^\circ$, and the right side carries $360^\circ - 168^\circ = 192^\circ$.',
                svg: (() => {
                  const A: [number, number] = [620, 120] // intersection with n (upper line)
                  const B: [number, number] = [620, 200] // intersection with m (lower line); t is vertical
                  // ray A→M leaves the downward ray of t by 47° to the left; ray B→M leaves the upward ray by 121°
                  const angA = 90 + 47
                  const angB = 270 - 121
                  const ca = Math.cos((angA * Math.PI) / 180), sa = Math.sin((angA * Math.PI) / 180)
                  const cb = Math.cos((angB * Math.PI) / 180), sb = Math.sin((angB * Math.PI) / 180)
                  // solve A + s·(ca,sa) = B + u·(cb,sb) for the meeting point M
                  const u = (B[1] - A[1]) / ((cb * sa) / ca - sb)
                  const M: [number, number] = [B[0] + u * cb, B[1] + u * sb]
                  const LA = Math.hypot(M[0] - A[0], M[1] - A[1])
                  const LB = Math.hypot(M[0] - B[0], M[1] - B[1])
                  const parts: string[] = []
                  // tinted conviction triangle ABM
                  parts.push(`<polygon points="${geo22bR1(M[0])},${geo22bR1(M[1])} ${A[0]},${A[1]} ${B[0]},${B[1]}" fill="${c22b.panel}" stroke="none"/>`)
                  // line n through A and M, line m through B and M, both extended past the meeting
                  parts.push(geo22bLine(A[0] - 0.18 * LA * ca, A[1] - 0.18 * LA * sa, M[0] + 0.14 * LA * ca, M[1] + 0.14 * LA * sa, c22b.green, 3))
                  parts.push(geo22bLine(B[0] - 0.18 * LB * cb, B[1] - 0.18 * LB * sb, M[0] + 0.14 * LB * cb, M[1] + 0.14 * LB * sb, c22b.green, 3))
                  // the transversal t
                  parts.push(geo22bLine(620, 55, 620, 255, c22b.ink, 2.6))
                  // angle arcs: 47° at A, 121° at B, 12° at M
                  parts.push(geo22bArc(A[0], A[1], 34, 90, angA, c22b.amber, 2.2))
                  parts.push(geo22bArc(B[0], B[1], 34, angB, 270, c22b.teal, 2.2))
                  parts.push(geo22bArc(M[0], M[1], 26, angA + 180, angB + 180, c22b.red, 2))
                  // labels at computed bisectors
                  const bis = (cx: number, cy: number, a1: number, a2: number, r: number): [number, number] => {
                    const m = ((a1 + a2) / 2) * (Math.PI / 180)
                    return [cx + r * Math.cos(m), cy + r * Math.sin(m)]
                  }
                  const [x47, y47] = bis(A[0], A[1], 90, angA, 40)
                  const [x121, y121] = bis(B[0], B[1], angB, 270, 54)
                  const [x12, y12] = bis(M[0], M[1], angA + 180, angB + 180, 44)
                  parts.push(geo22bTxt(x47, y47, '47°', 12.5, c22b.amber))
                  parts.push(geo22bTxt(x121, y121, '121°', 12.5, c22b.tealInk))
                  parts.push(geo22bTxt(x12, y12, '12°', 12.5, c22b.red))
                  // vertices and the meeting point
                  parts.push(geo22bDot(A[0], A[1], c22b.ink, 4))
                  parts.push(geo22bDot(B[0], B[1], c22b.ink, 4))
                  parts.push(geo22bDot(M[0], M[1], c22b.red, 5))
                  parts.push(geo22bTxt(608, 106, 'A', 12, c22b.ink))
                  parts.push(geo22bTxt(606, 226, 'B', 12, c22b.ink))
                  parts.push(geo22bTxt(M[0] + 16, M[1] + 12, 'meet', 11.5, c22b.red, 'start'))
                  parts.push(geo22bTxt(620, 44, 't', 13, c22b.ink))
                  parts.push(geo22bTxt(670, 96, 'n', 13, c22b.ink))
                  parts.push(geo22bTxt(672, 190, 'm', 13, c22b.ink))
                  parts.push(geo22bTxt(686, 150, '360° − 168° = 192°', 11.5, c22b.teal))
                  parts.push(geo22bTxt(380, 418, 'left of t: 47° + 121° = 168° < 180° → meet on this side', 12.5, c22b.tealInk))
                  return geo22bSvg(760, 440, 'Two lines n and m cut by a vertical transversal t, with left-side interior angles 47 degrees at A and 121 degrees at B tinted as a triangle; the lines converge to the meeting point M on the left, where the closing angle is 12 degrees; the right side carries 192 degrees.', parts)
                })(),
              },
            ],
          },
          {
            q: 'Lines $r$ and $s$ are parallel, and a transversal cuts them both. One angle of a same-side interior pair measures $71^\circ$. Find its partner, and name the logical direction the licence runs.',
            solution: [
              'Sol. For parallels the same-side interior pair is supplementary: $71^\circ + x = 180^\circ$.',
              'The licence runs the "parallels force the sum" direction — read the fifth postulate through its contrapositive (no meeting on a side forces that side’s sum up to at least $180^\circ$), then let the $360^\circ$ side law pin both sides at exactly $180^\circ$. Euclid’s own route to the same fact is I.29, the first proposition that spends the postulate.',
              'Subtract: $x = 180^\circ - 71^\circ = 109^\circ$.',
              'Hence the partner angle is $109^\circ$.',
            ],
            answer: 'The partner angle is $109^\circ$ (supplementary — the parallel-to-sum direction, Euclid’s I.29)',
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'A transversal cuts two lines, and on one side of it the same-side interior angles measure $45^\circ$ and $73.25^\circ$. Give the verdict for that side, and compute what the other side carries.',
            solution: [
              'Sol. Add the pair: $45^\circ + 73.25^\circ = 118.25^\circ$.',
              'Compare: $118.25^\circ < 180^\circ$, so the fifth postulate convicts THIS side — the lines meet on it.',
              'The other side: $360^\circ - 118.25^\circ = 241.75^\circ$, comfortably over $180^\circ$ — no meeting can be forced from there.',
              'For the record, the meeting itself will be sharp: the deficit at the meeting point is $180^\circ - 118.25^\circ = 61.75^\circ$ (lesson 2.4 cashes this).',
              'Hence the lines meet on the side carrying $118.25^\circ$; the other side carries $241.75^\circ$.',
            ],
            answer: 'The lines meet on that side — $118.25^\circ < 180^\circ$; the other side carries $241.75^\circ$',
          },
          {
            q: 'Parallel lines are cut by a transversal, and the two same-side interior angles measure $(2x)^\circ$ and $(3x)^\circ$. Find $x$ and both angles.',
            solution: [
              'Sol. Parallels make the same-side pair supplementary, so $2x + 3x = 180^\circ$.',
              'Combine: $5x = 180^\circ$, so $x = 36^\circ$.',
              'Recover the angles: $2x = 72^\circ$ and $3x = 108^\circ$.',
              'Check the ledger: $72^\circ + 108^\circ = 180^\circ$ — the supplementary budget balances exactly.',
              'Hence $x = 36^\circ$, with angles $72^\circ$ and $108^\circ$.',
            ],
            answer: '$x = 36$; the angles are $72^\circ$ and $108^\circ$',
          },
          {
            q: 'You can measure only ONE side of a transversal configuration: its two same-side interior angles sum to $205^\circ$. Compute what the unseen side carries, and give the verdict.',
            solution: [
              'Sol. The side-sum law: the two same-side interior sums trade against each other through $360^\circ$ (two linear pairs along the transversal — exercise 9 proves it below).',
              'So the unseen side carries $360^\circ - 205^\circ = 155^\circ$.',
              'Compare with the budget: $155^\circ < 180^\circ$, so the fifth postulate convicts the UNSEEN side.',
              'Hence the lines meet on the side you could not measure directly — the $155^\circ$ side; the measured $205^\circ$ side is over budget and could never force the meeting.',
            ],
            answer: 'The unseen side carries $155^\circ$, and the lines meet on that side',
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'Through a point $P$ not on a line $\ell$, a construction builds a candidate parallel: drop the perpendicular $PQ$ from $P$ to $\ell$, then erect the line $n$ through $P$ perpendicular to $PQ$. Prove that $n \parallel \ell$, and say which half of Playfair’s $\exists!$ the construction establishes — and which half it cannot.',
            solution: [
              'Sol. By construction $PQ \perp \ell$ at $Q$ and $n \perp PQ$ at $P$: all four angles at the two feet are $90^\circ$.',
              'Now, read $PQ$ as a transversal cutting $n$ at $P$ and $\ell$ at $Q$. On one side of $PQ$ the same-side interior angles are $90^\circ + 90^\circ = 180^\circ$; on the other side, the same addition gives $180^\circ$ again.',
              'A same-side sum of exactly $180^\circ$ delivers the parallel verdict by Euclid I.28 — and I.28 is proved without the fifth postulate, so existence costs nothing.',
              'What the construction establishes is therefore the EXISTENCE half, $\exists$: at least one parallel through $P$, with a drawable certificate.',
              'It cannot establish UNIQUENESS: nothing here stops some other line through $P$ from also missing $\ell$ — ruling that out is the $\exists \leq 1$ half, and that is where the fifth postulate genuinely pays (exercise 8 runs the sweep).',
              'Hence $n \parallel \ell$ by the double perpendicular — the existence half only.',
            ],
            answer: '$n \parallel \ell$ by the double perpendicular ($90^\circ + 90^\circ = 180^\circ$ on both sides); the construction proves only the EXISTENCE half of Playfair’s $\exists!$',
          },
          {
            q: 'A point $P$ sits above a line $\ell$. Three candidate lines $a$, $b$, $c$ are drawn through $P$, and the perpendicular $PQ$ from $P$ to $\ell$ serves as the transversal: the same-side interior angles at $P$ and $Q$ (on one fixed side of $PQ$) sum to $155^\circ$ for $a$, $180^\circ$ for $b$ and $174^\circ$ for $c$. Give the verdict on each candidate — and say what the sweep proves about Playfair’s uniqueness half.',
            solution: [
              'Sol. The frame is shared: $PQ \perp \ell$, so at the foot $Q$ every same-side interior angle with $\ell$ is $90^\circ$; each candidate contributes its own angle at $P$.',
              'Candidate $a$: $65^\circ + 90^\circ = 155^\circ < 180^\circ$ — the fifth postulate convicts that side, so $a$ meets $\ell$.',
              'Candidate $b$: $90^\circ + 90^\circ = 180^\circ$ on both sides of $PQ$ — the double perpendicular, and I.28 returns the parallel verdict: $b \parallel \ell$.',
              'Candidate $c$: $84^\circ + 90^\circ = 174^\circ < 180^\circ$ — convicted again: $c$ meets $\ell$.',
              'So exactly one of the three survives, and the sweep says more: EVERY tilted line through $P$ leaves some side summing under $180^\circ$, so every tilt is convicted — this is the uniqueness half $\exists \leq 1$, and it is the fifth postulate that pays for it.',
              'Hence $b$ alone is parallel; $a$ and $c$ meet $\ell$.',
            ],
            answer: 'Only $b$ (the double perpendicular) is parallel; $a$ and $c$ meet $\ell$ — their sums $155^\circ$ and $174^\circ$ both fall under $180^\circ$',
          },
          {
            q: 'Prove the side-sum law this lesson has used throughout: when a transversal cuts two lines, the two same-side interior sums add to $360^\circ$. Then verify the law when the same-side interior angles on one side measure $65^\circ$ and $105^\circ$.',
            solution: [
              'Sol. Name the census positions (lesson 2.1): at the upper intersection the interior angles are $a_4$ (left of the transversal) and $a_3$ (right); at the lower intersection, $a_5$ (left) and $a_6$ (right).',
              'The transversal makes a linear pair at each intersection: $a_3 + a_4 = 180^\circ$ above and $a_5 + a_6 = 180^\circ$ below (2.1’s licence).',
              'Add the left-side sum and the right-side sum: $(a_4 + a_5) + (a_3 + a_6)$ — regrouped, that is $(a_3 + a_4) + (a_5 + a_6)$, plain commutativity of addition.',
              'Substitute the linear pairs: $180^\circ + 180^\circ = 360^\circ$ — the left sum and the right sum always trade against each other through $360^\circ$.',
              'Witness check: left $= 65^\circ + 105^\circ = 170^\circ$, so right $= 360^\circ - 170^\circ = 190^\circ$; the linear pairs read $a_3 = 115^\circ$ (with $115 + 65 = 180$) and $a_6 = 75^\circ$ (with $105 + 75 = 180$), and indeed $170 + 190 = 360$.',
              'Hence the side-sum law: same-side sum + other-side sum $= 360^\circ$, whatever the two lines go on to do.',
            ],
            answer: 'The two same-side sums add to $360^\circ$; witness: $170^\circ + 190^\circ = 360^\circ$',
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'Two lines are cut by a transversal, and on one side the same-side interior angles measure $(3x - 10)^\circ$ and $(2x + 25)^\circ$. The lines MEET on that side. Find the range of $x$ (exam-style: the inequality is the postulate itself).',
            solution: [
              'Sol. Write the sum: $(3x - 10) + (2x + 25) = 5x + 15$.',
              '"Meet on that side" is exactly the fifth postulate’s hypothesis: $5x + 15 < 180$.',
              'Solve: $5x < 165$, so $x < 33$.',
              'Both angles must also be genuine (positive): $3x - 10 > 0$ gives $x > \frac{10}{3}$, while $2x + 25$ is positive throughout the range.',
              'Check a witness inside: $x = 20$ gives $3(20) - 10 = 50^\circ$ and $2(20) + 25 = 65^\circ$, sum $115^\circ < 180^\circ$ — a genuine meeting side, as ordered.',
              'Hence $\frac{10}{3} < x < 33$.',
            ],
            answer: '$\frac{10}{3} < x < 33$ (witness: $x = 20$, angles $50^\circ$ and $65^\circ$, sum $115^\circ$)',
          },
          {
            q: 'In the Euclidean plane, $m \parallel n$. At one place the perpendicular segment from $m$ down to $n$ measures $8$ cm. (i) What does the same construction measure at every other place between the two lines? (ii) Which famous equivalence does that "equidistant character" belong to? (iii) And what happens to the gap in the hyperbolic plane instead?',
            solution: [
              'Sol. (i) Erect the perpendicular from any point of $m$ down to $n$: in the Euclidean plane every such segment between the two parallels has the SAME length — the strip is everywhere $8$ cm wide. This constant width is the equidistant character of Euclidean parallels.',
              '(ii) The character is not a free gift of the definition: "parallels are equidistant" is EQUIVALENT to the fifth postulate — assume it in place of Euclid’s sentence and the same geometry returns, census line and all.',
              '(iii) The hyperbolic plane refuses the bargain: take two non-meeting lines with an $8$ cm common perpendicular at the narrowest place, walk away from the foot in either direction, and the gap GROWS without bound — it never returns to $8$ cm.',
              'So the three answers hang together: constant gap, exactly-one parallel, and the fifth postulate are three formulations of one and the same assumption.',
              'Hence $8$ cm at every location; the equidistant character is equivalent to the fifth postulate; hyperbolically the gap grows without bound.',
            ],
            answer: 'Every perpendicular segment measures $8$ cm (equidistant character — equivalent to the fifth postulate); hyperbolically the gap grows without bound',
          },
        ],
      },
      {
        level: 'L5',
        questions: [
          {
            q: 'Put the fifth-postulate story in order and count the gaps: Proclus complains that the postulate ought to be struck out; Saccheri nearly discovers the other world; Playfair cleans the statement into "exactly one parallel"; Lobachevsky and Bolyai publish the new geometry. Give all five years, the four gaps, and the total span.',
            solution: [
              'Sol. The order is history’s own: Proclus $450$ → Saccheri $1733$ → Playfair $1795$ → Lobachevsky $1829$ → Bolyai $1832$ — the timeline beside this solution lays the five rungs out.',
              'Count the first gap: $1733 - 450 = 1283$ years — the long silence between the first recorded complaint and the near-discovery.',
              'Then the cascade: $1795 - 1733 = 62$; $1829 - 1795 = 34$; $1832 - 1829 = 3$.',
              'Total span: $1832 - 450 = 1382$ years, and the telescoping check agrees: $1283 + 62 + 34 + 3 = 1382$.',
              'Note the shape of the ladder: the shortest gap is the LAST one — once Lobachevsky had published, it took Bolyai only $3$ more years to arrive independently; the door, once open, was obvious.',
              'Hence the gaps are $1283$, $62$, $34$ and $3$ years across a $1382$-year story.',
            ],
            answer: 'Years $450, 1733, 1795, 1829, 1832$; gaps $1283, 62, 34, 3$ years; total span $1382$ years',
            figures: [
              {
                caption:
                  'The year ladder of the fifth postulate: Proclus 450, Saccheri 1733, Playfair 1795, Lobachevsky 1829 and Bolyai 1832, with the four gaps $1283$, $62$, $34$ and $3$ years marked by arrows below the rungs; the node spacing is narrative, not to scale, and the total span is $1832 - 450 = 1382$ years.',
                svg: (() => {
                  const parts: string[] = []
                  const y = 150
                  parts.push(geo22bLine(55, y, 715, y, c22b.green, 3))
                  const rungs: Array<[number, string, string]> = [
                    [90, 'Proclus', '450'],
                    [240, 'Saccheri', '1733'],
                    [410, 'Playfair', '1795'],
                    [560, 'Lobachevsky', '1829'],
                    [690, 'Bolyai', '1832'],
                  ]
                  for (const [x, name, yr] of rungs) {
                    parts.push(geo22bDot(x, y, c22b.ink, 5))
                    parts.push(geo22bTxt(x, y - 24, yr, 13.5, c22b.orange, 'middle', '700'))
                    parts.push(geo22bTxt(x, y - 50, name, 12.5, c22b.ink, 'middle', '700'))
                  }
                  const gaps: Array<[number, number, string]> = [
                    [90, 240, '1283 yr — the long silence'],
                    [240, 410, '62 yr'],
                    [410, 560, '34 yr'],
                    [560, 690, '3 yr'],
                  ]
                  for (const [a, b, label] of gaps) {
                    parts.push(geo22bArrow(a + 18, y + 38, b - 18, y + 38, c22b.amber, 2))
                    parts.push(geo22bTxt((a + b) / 2, y + 64, label, 12, c22b.tealInk))
                  }
                  parts.push(geo22bTxt(385, 262, 'total span: 1832 − 450 = 1382 years', 13, c22b.ink))
                  parts.push(geo22bTxt(385, 292, 'node spacing is narrative, not to scale', 11, c22b.teal))
                  return geo22bSvg(760, 310, 'A timeline with five rungs: Proclus 450, Saccheri 1733, Playfair 1795, Lobachevsky 1829 and Bolyai 1832, with the four gaps 1283, 62, 34 and 3 years marked by arrows below, and the total span 1382 years.', parts)
                })(),
              },
            ],
          },
          {
            q: 'A transversal cuts two PARALLEL lines, and the two same-side interior angles measure $(2x + 15)^\circ$ and $(3x - 5)^\circ$. Find $x$ and both angles — then explain which logical direction your licence runs, and why that direction, unlike its converse, genuinely spends the fifth postulate.',
            solution: [
              'Sol. The lines are GIVEN parallel, so the same-side interior pair must be supplementary — the "parallels force the sum" direction.',
              'Write the ledger: $(2x + 15) + (3x - 5) = 180$.',
              'Combine: $5x + 10 = 180$, so $5x = 170$ and $x = 34$.',
              'Recover the angles: $2(34) + 15 = 83^\circ$ and $3(34) - 5 = 97^\circ$; check the ledger: $83^\circ + 97^\circ = 180^\circ$.',
              'Now, the direction is the deep part. "Sum $180^\circ$ forces parallel" (exercise 1’s licence) is I.28 — provable WITHOUT the fifth postulate. The direction used here, "parallel forces sum $180^\circ$", is I.29 — the first proposition of the Elements that actually SPENDS the fifth postulate; lesson 2.3 watches Euclid do it.',
              'Hence $x = 34$, the angles are $83^\circ$ and $97^\circ$, and the licence is the fifth-costing direction, I.29.',
            ],
            answer: '$x = 34$; the angles are $83^\circ$ and $97^\circ$ (licence: the I.29 direction — the one that spends the fifth postulate)',
          },
        ],
      },
      {
        level: 'L6',
        questions: [
          {
            q: 'On a sphere, take two DISTINCT great circles — say two different meridians. Prove they must meet, count the meeting points exactly, and state the spherical entry of the parallel census. Why does the fifth postulate’s machinery never engage there?',
            solution: [
              'Sol. A great circle is the intersection of the sphere’s surface with a plane passing through the centre $O$.',
              'Two distinct great circles give two distinct planes through $O$ — and two distinct planes through a common point share a whole LINE through that point (chapter 1’s incidence facts).',
              'That line pierces the sphere in exactly two ANTIPODAL points, one at the end of each ray from $O$, and each piercing point lies on both great circles: the meeting count is exactly $2$, never $0$.',
              'So no two distinct great circles avoid each other, and through a point off a given great circle there are ZERO parallels: the census reads $0$.',
              'The honest footnote: the sphere bends more than one Euclidean rule (its lines close up, so the ordering postulates fail too — chapter 11 separates the debts); but as the census’s middle witness it does its job — it shows that "exactly one" was a choice, never a necessity.',
              'Hence: two distinct great circles meet in exactly $2$ antipodal points, and the spherical parallel count is $0$.',
            ],
            answer: 'Exactly $2$ antipodal meeting points; the spherical parallel count is $0$',
          },
          {
            q: 'State the parallel census — the number of parallels through a point $P$ off a line $\ell$ in the Euclidean, spherical and hyperbolic geometries — and decompose each count against the two halves of Playfair’s $\exists!$: which half fails where? (The trio of panels beside this solution draws all three worlds.)',
            solution: [
              'Sol. The census, banked in this lesson as chapter 11’s preview: EUCLIDEAN — exactly $1$; SPHERICAL — $0$; HYPERBOLIC — infinitely many.',
              'Decompose $\exists!$ into its halves: EXISTENCE (at least one parallel through $P$) and UNIQUENESS (at most one).',
              'Euclidean: existence holds — the double perpendicular of exercise 7 is the drawable certificate — and uniqueness holds — the tilt sweep of exercise 8 convicts every other candidate. Count: $1$.',
              'Spherical: existence FAILS — any two great circles meet in $2$ antipodal points (exercise 14), so not even one parallel can be found through $P$. Count: $0$.',
              'Hyperbolic: existence holds in abundance, but uniqueness FAILS — through $P$ a whole fan of lines never meets $\ell$, bounded by the two dashed limiting parallels in the right panel. Count: infinitely many.',
              'Hence the census $1 / 0 / \infty$, and the lesson’s moral: each half of $\exists!$ can be paid or refused, and each refusal builds an equally consistent world — which is exactly why the two-millennium proof hunt had to fail.',
            ],
            answer: 'Euclidean: exactly $1$; spherical: $0$; hyperbolic: infinitely many — existence fails on the sphere, uniqueness fails in the hyperbolic plane',
            figures: [
              {
                caption:
                  'The parallel census in three panels: EUCLIDEAN — the double perpendicular through $P$ (bold) is the unique parallel, and both dashed tilts meet $\ell$; SPHERICAL — two great circles share the poles, so they meet in exactly $2$ antipodal points and the parallel count is $0$; HYPERBOLIC — a whole fan of lines through $P$ avoids $\ell$, bounded by the two dashed limiting parallels, so the count is infinitely many.',
                svg: (() => {
                  const parts: string[] = []
                  // three census panels
                  parts.push(geo22bRect(10, 34, 230, 272, c22b.paper, c22b.green))
                  parts.push(geo22bRect(265, 34, 230, 272, c22b.paper, c22b.green))
                  parts.push(geo22bRect(520, 34, 230, 272, c22b.paper, c22b.green))
                  parts.push(geo22bTxt(125, 60, 'EUCLIDEAN', 13.5, c22b.ink, 'middle', '700'))
                  parts.push(geo22bTxt(380, 60, 'SPHERICAL', 13.5, c22b.ink, 'middle', '700'))
                  parts.push(geo22bTxt(635, 60, 'HYPERBOLIC', 13.5, c22b.ink, 'middle', '700'))
                  // panel 1: the unique parallel via the double perpendicular + two convicted tilts
                  parts.push(geo22bLine(30, 232, 220, 232, c22b.green, 3))
                  parts.push(geo22bLine(30, 128, 220, 128, c22b.tealInk, 3.2))
                  parts.push(geo22bLine(125, 128, 125, 232, c22b.amber, 1.8, '5,5'))
                  parts.push(geo22bLine(125, 128, 42, 232, c22b.red, 1.6, '4,4'))
                  parts.push(geo22bLine(125, 128, 208, 232, c22b.red, 1.6, '4,4'))
                  parts.push(geo22bDot(42, 232, c22b.red, 3.5))
                  parts.push(geo22bDot(208, 232, c22b.red, 3.5))
                  parts.push(geo22bDot(125, 128, c22b.ink, 4.5))
                  parts.push(geo22bDot(125, 232, c22b.ink, 3))
                  // right-angle marks at P and at the foot Q
                  parts.push(geo22bLine(125, 136, 133, 136, c22b.amber, 1.6))
                  parts.push(geo22bLine(133, 136, 133, 128, c22b.amber, 1.6))
                  parts.push(geo22bLine(125, 224, 133, 224, c22b.amber, 1.6))
                  parts.push(geo22bLine(133, 224, 133, 232, c22b.amber, 1.6))
                  parts.push(geo22bTxt(135, 124, 'P', 12.5, c22b.ink))
                  parts.push(geo22bTxt(226, 240, 'ℓ', 12.5, c22b.ink))
                  parts.push(geo22bTxt(125, 108, 'unique parallel', 11.5, c22b.tealInk))
                  parts.push(geo22bTxt(125, 258, 'tilts meet ℓ', 11, c22b.red))
                  // panel 2: two great circles through the poles — 2 antipodal meeting points
                  parts.push(geo22bCirc(380, 168, 78, c22b.green, 2.6))
                  parts.push(`<ellipse cx="380" cy="168" rx="26" ry="78" fill="none" stroke="${c22b.teal}" stroke-width="2.2"/>`)
                  parts.push(`<ellipse cx="380" cy="168" rx="58" ry="78" fill="none" stroke="${c22b.orange}" stroke-width="2.2"/>`)
                  parts.push(geo22bDot(380, 90, c22b.red, 4.5))
                  parts.push(geo22bDot(380, 246, c22b.red, 4.5))
                  parts.push(geo22bTxt(380, 78, '2 antipodal points', 11, c22b.red))
                  parts.push(geo22bTxt(380, 272, 'two great circles', 11, c22b.teal))
                  // panel 3: the fan of parallels between two dashed limiting parallels
                  parts.push(geo22bLine(540, 240, 730, 240, c22b.green, 3))
                  parts.push(`<path d="M 540 116 Q 590 124 635 128 Q 688 148 734 230" fill="none" stroke="${c22b.amber}" stroke-width="2" stroke-dasharray="6,5"/>`)
                  parts.push(`<path d="M 730 116 Q 680 124 635 128 Q 582 148 536 230" fill="none" stroke="${c22b.amber}" stroke-width="2" stroke-dasharray="6,5"/>`)
                  parts.push(`<path d="M 552 196 Q 594 126 635 128 Q 676 126 718 196" fill="none" stroke="${c22b.teal}" stroke-width="2.2"/>`)
                  parts.push(`<path d="M 566 172 Q 601 130 635 128 Q 669 130 704 172" fill="none" stroke="${c22b.tealInk}" stroke-width="2.2"/>`)
                  parts.push(`<path d="M 560 100 Q 597 132 635 128 Q 673 132 710 100" fill="none" stroke="${c22b.green}" stroke-width="2.2"/>`)
                  parts.push(geo22bDot(635, 128, c22b.ink, 4.5))
                  parts.push(geo22bTxt(645, 124, 'P', 12.5, c22b.ink))
                  parts.push(geo22bTxt(738, 244, 'ℓ', 12.5, c22b.ink))
                  parts.push(geo22bTxt(635, 88, 'fan of parallels', 11, c22b.tealInk))
                  // verdicts
                  parts.push(geo22bTxt(125, 292, 'exactly 1', 13.5, c22b.orange, 'middle', '700'))
                  parts.push(geo22bTxt(380, 292, '0', 13.5, c22b.orange, 'middle', '700'))
                  parts.push(geo22bTxt(635, 292, 'infinitely many', 13.5, c22b.orange, 'middle', '700'))
                  return geo22bSvg(760, 320, 'Three census panels: Euclidean, with one bold parallel through P above a line and two dashed tilts that meet it; spherical, with two great circles through the poles meeting at two antipodal points; hyperbolic, with a fan of parallels through P between two dashed limiting parallels above a line.', parts)
                })(),
              },
            ],
          },
        ],
      },
      /* === GEO22B-SETS-MORE === */
      ],
    },
  /* -------------------------------------------------------------- */
  /* coda — the "what you now own" wrap, pointing forward to 2.3    */
  /* -------------------------------------------------------------- */
  { kind: 'heading', text: 'What you now own' },
  {
    kind: 'para',
    text: 'This lesson set out to give the awkward postulate its own stage, and it leaves you holding the whole story. Parallel lines are defined by a promise no drawing can check — never meeting, all the way out to infinity — and the fifth postulate is the supply line that converts that promise into arithmetic: add the same-side interior angles, and any side summing under $180^\circ$ convicts the lines to a meeting on that very side, while the two sums always trade against each other through $360^\circ$. Proclus called the postulate repugnant in 450 CE; Saccheri nearly stumbled into the other world in 1733; Playfair compressed the claim to "exactly one parallel" in 1795; Lobachevsky and Bolyai walked through the door in 1829 and 1832. The census they forced on geometry — one parallel, zero, infinitely many — is now yours to read off any proposed world, together with the equidistant character that separates Euclidean strips of constant width from hyperbolic gaps that grow without bound.',
  },
  {
    kind: 'para',
    text: 'The next lesson cashes the first cheque. Lesson 2.3 follows Euclid to Book I, Proposition 29 — the exact place where, for the first time in the Elements, the fifth postulate is spent — and watches the transversal census fall out: alternate angles equal, corresponding angles equal, same-side interiors supplementary whenever parallels are cut. Everything there runs on what you built here, and the angle sum of the triangle (lesson 2.4) is the dividend after that. Keep the two faces of the postulate in view as you go: the quantifier $\exists!$ that Playfair made explicit, and the verdict arithmetic that Euclid hid inside his longest sentence. Two thousand years of geometers tried to make those faces go away; you now know precisely why they could not — and what worlds open the moment you refuse them.',
  },

    /* === END OF BLOCKS — sections are appended above this line === */
  ],
}

/* ================================================================== */
/* lesson 2.3 — from docs/research/geo-ch02-wip/part-geo203.ts            */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c23 = {
  ink: '#166534', // primary text — rich green ink
  mid: '#65a30d', // mid text — bright lime
  teal: '#0d9488', // captions, light strokes, secondary structure
  tealInk: '#0f766e', // teal ink text
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#16a34a', // structure strokes — boxes, axes, node circles
  panel: '#fef3c7', // amber tinted fill
  panel2: '#ffedd5', // orange tinted fill
  sep: '#fcd34d', // light separators
  faint: '#5eead4', // faint dots, unpicked borders
  white: '#ffffff',
  paper: '#fffdf5',
}
const f23 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo23 SVG helpers (plain text only — no $, minus is U+2212)         */
/* ------------------------------------------------------------------ */
const geo23Txt = (
  x: number, y: number, s: string,
  size = 13, color = c23.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f23}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo23Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c23.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo23Dot = (x: number, y: number, color = c23.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo23Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo23Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo23Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c23.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return geo23Line(x1, y1, x2, y2, color, w) + geo23Head(x2, y2, a, color, 8)
}

/** labelled position node for the V4 square: circle + two-line label */
const geo23CircleLbl = (x: number, y: number, top: string, bot: string): string =>
  `<circle cx="${x}" cy="${y}" r="30" fill="${c23.paper}" stroke="${c23.green}" stroke-width="2.4"/>` +
  geo23Txt(x, y - 2, top, 12.5, c23.ink) +
  geo23Txt(x, y + 16, bot, 13.5, c23.orange)

const geo23Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

/** arc on a circle, from angle a0 to a1 (radians, screen coords: 0 = east, positive = clockwise on screen) */
const geo23Arc = (
  cx: number, cy: number, r: number, a0: number, a1: number, color: string, w = 2, dash = '',
): string => {
  const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0)
  const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1)
  const ccw = a1 < a0
  const big = Math.abs(a1 - a0) > Math.PI ? 1 : 0
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${big} ${ccw ? 0 : 1} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
}

/* ------------------------------------------------------------------ */
/* the census picture: lines m (upper) and n (lower), transversal t    */
/* meeting them at P and Q; the eight angles a1..a8 per the label law  */
/* ------------------------------------------------------------------ */
const geo23Census = (o: {
  aria: string
  labels?: string[]
  subs?: Array<string | null>
  hl?: number[]
  hlColor?: string
  band?: boolean
}): string => {
  const W = 640, H = 436
  const yM = 118, yN = 318
  const T1: [number, number] = [140, 408], T2: [number, number] = [470, 38]
  const dx = T2[0] - T1[0], dy = T2[1] - T1[1]
  const sP = (T1[1] - yM) / (T1[1] - T2[1])
  const P: [number, number] = [T1[0] + sP * dx, yM]
  const sQ = (T1[1] - yN) / (T1[1] - T2[1])
  const Q: [number, number] = [T1[0] + sQ * dx, yN]
  const L = Math.hypot(dx, dy)
  const u: [number, number] = [dx / L, dy / L]
  const nl: [number, number] = [u[1], -u[0]] // left-of-t normal (up-left)
  const nrm2 = (a: [number, number]): [number, number] => {
    const l = Math.hypot(a[0], a[1])
    return [a[0] / l, a[1] / l]
  }
  const add = (a: [number, number], b: [number, number]): [number, number] => [a[0] + b[0], a[1] + b[1]]
  const up: [number, number] = [0, -1], dn: [number, number] = [0, 1]
  const neg = (a: [number, number]): [number, number] => [-a[0], -a[1]]
  // quadrant directions UL, UR, LR, LL (unit)
  const quad: Array<[number, number]> = [
    nrm2(add(up, nl)), nrm2(add(up, neg(nl))), nrm2(add(dn, neg(nl))), nrm2(add(dn, nl)),
  ]
  const V: Array<[number, number]> = [P, P, P, P, Q, Q, Q, Q]
  const qd = [0, 1, 2, 3, 0, 1, 2, 3]
  const phiU = Math.atan2(u[1], u[0])
  const phiD = phiU + Math.PI
  // arc spans (a0 -> a1) for UL, UR, LR, LL
  const spans: Array<[number, number]> = [
    [phiU, -Math.PI], [0, phiU], [0, phiD], [phiD, Math.PI],
  ]
  const parts: string[] = []
  if (o.band) parts.push(`<rect x="36" y="${yM}" width="568" height="${yN - yM}" fill="${c23.panel}" fill-opacity="0.28"/>`)
  parts.push(geo23Line(30, yM, 610, yM, c23.ink, 2.5))
  parts.push(geo23Line(30, yN, 610, yN, c23.ink, 2.5))
  parts.push(geo23Line(T1[0], T1[1], T2[0], T2[1], c23.tealInk, 2.5))
  parts.push(geo23Txt(596, yM - 10, 'm', 13.5, c23.ink))
  parts.push(geo23Txt(596, yN - 10, 'n', 13.5, c23.ink))
  parts.push(geo23Txt(476, 34, 't', 13.5, c23.tealInk, 'start'))
  parts.push(geo23Dot(P[0], P[1], c23.ink, 4.5) + geo23Dot(Q[0], Q[1], c23.ink, 4.5))
  parts.push(geo23Txt(P[0] + 13, P[1] + 16, 'P', 13, c23.ink))
  parts.push(geo23Txt(Q[0] + 13, Q[1] + 16, 'Q', 13, c23.ink))
  if (o.band) parts.push(geo23Txt(84, (yM + yN) / 2 + 4, 'interior band', 11.5, c23.tealInk))
  const hl = new Set(o.hl ?? [])
  for (let i = 0; i < 8; i++) {
    const [cx, cy] = V[i]
    const [a0, a1] = spans[qd[i]]
    parts.push(geo23Arc(cx, cy, 22, a0, a1, hl.has(i) ? (o.hlColor ?? c23.orange) : c23.teal, hl.has(i) ? 3 : 2))
    if (hl.has(i)) parts.push(geo23Arc(cx, cy, 28.5, a0, a1, o.hlColor ?? c23.orange, 2))
  }
  const labels = o.labels ?? ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8']
  for (let i = 0; i < 8; i++) {
    const [vx, vy] = V[i]
    const q = quad[qd[i]]
    parts.push(geo23Txt(vx + q[0] * 42, vy + q[1] * 42, labels[i], 13.5, hl.has(i) ? (o.hlColor ?? c23.orange) : c23.ink))
    const sub = o.subs?.[i]
    if (sub) parts.push(geo23Txt(vx + q[0] * 66, vy + q[1] * 66, sub, 11.5, hl.has(i) ? (o.hlColor ?? c23.orange) : c23.mid))
  }
  return geo23Svg(W, H, o.aria, parts)
}

/* ------------------------------------------------------------------ */
/* the mini census panel (for the family figure): same construction,   */
/* smaller canvas, only the highlighted pair labelled                  */
/* ------------------------------------------------------------------ */
const geo23Mini = (x0: number, y0: number, hi: number[], color: string, title: string): string[] => {
  const yM = y0 + 62, yN = y0 + 192
  const T1: [number, number] = [x0 + 70, y0 + 242], T2: [number, number] = [x0 + 268, y0 + 28]
  const dx = T2[0] - T1[0], dy = T2[1] - T1[1]
  const sP = (T1[1] - yM) / (T1[1] - T2[1])
  const P: [number, number] = [T1[0] + sP * dx, yM]
  const sQ = (T1[1] - yN) / (T1[1] - T2[1])
  const Q: [number, number] = [T1[0] + sQ * dx, yN]
  const L = Math.hypot(dx, dy)
  const u: [number, number] = [dx / L, dy / L]
  const nl: [number, number] = [u[1], -u[0]]
  const nrm2 = (a: [number, number]): [number, number] => {
    const l = Math.hypot(a[0], a[1])
    return [a[0] / l, a[1] / l]
  }
  const add = (a: [number, number], b: [number, number]): [number, number] => [a[0] + b[0], a[1] + b[1]]
  const up: [number, number] = [0, -1], dn: [number, number] = [0, 1]
  const neg = (a: [number, number]): [number, number] => [-a[0], -a[1]]
  const quad: Array<[number, number]> = [
    nrm2(add(up, nl)), nrm2(add(up, neg(nl))), nrm2(add(dn, neg(nl))), nrm2(add(dn, nl)),
  ]
  const V: Array<[number, number]> = [P, P, P, P, Q, Q, Q, Q]
  const qd = [0, 1, 2, 3, 0, 1, 2, 3]
  const phiU = Math.atan2(u[1], u[0])
  const phiD = phiU + Math.PI
  const spans: Array<[number, number]> = [
    [phiU, -Math.PI], [0, phiU], [0, phiD], [phiD, Math.PI],
  ]
  const parts: string[] = []
  parts.push(geo23Line(x0 + 20, yM, x0 + 400, yM, c23.ink, 2.2))
  parts.push(geo23Line(x0 + 20, yN, x0 + 400, yN, c23.ink, 2.2))
  parts.push(geo23Line(T1[0], T1[1], T2[0], T2[1], c23.tealInk, 2.2))
  parts.push(geo23Dot(P[0], P[1], c23.ink, 3.5) + geo23Dot(Q[0], Q[1], c23.ink, 3.5))
  parts.push(geo23Txt(P[0] + 10, P[1] + 14, 'P', 11.5, c23.ink))
  parts.push(geo23Txt(Q[0] + 10, Q[1] + 14, 'Q', 11.5, c23.ink))
  const hset = new Set(hi)
  for (let i = 0; i < 8; i++) {
    const [cx, cy] = V[i]
    const [a0, a1] = spans[qd[i]]
    if (hset.has(i)) {
      parts.push(geo23Arc(cx, cy, 25, a0, a1, color, 3))
      parts.push(geo23Arc(cx, cy, 32, a0, a1, color, 2))
      const q = quad[qd[i]]
      parts.push(geo23Txt(cx + q[0] * 46, cy + q[1] * 46, `a${i + 1}`, 13, color))
    } else {
      parts.push(geo23Arc(cx, cy, 20, a0, a1, c23.faint, 1.6))
    }
  }
  parts.push(geo23Txt(x0 + 210, y0 + 236, title, 12.5, c23.ink))
  return parts
}

/* ------------------------------------------------------------------ */
/* the zigzag picture: three parallels, two transversals through B     */
/* ------------------------------------------------------------------ */
const geo23Zigzag = (o: {
  aria: string; aLab: string; bLab: string; xLab: string
  transport?: boolean; note?: string
}): string => {
  const W = 620, H = 402
  const y1 = 70, y2 = 180, y3 = 290
  const B: [number, number] = [320, 180]
  const rad = (d: number) => (d * Math.PI) / 180
  const d1: [number, number] = [Math.cos(rad(130)), -Math.sin(rad(130))] // up-left
  const d2: [number, number] = [Math.cos(rad(60)), -Math.sin(rad(60))] // up-right
  const k1 = (y2 - y1) / -d1[1], k1b = (y3 - y2) / -d1[1]
  const k2 = (y2 - y1) / -d2[1], k2b = (y3 - y2) / -d2[1]
  const A: [number, number] = [B[0] + d1[0] * k1, y1]
  const A2: [number, number] = [B[0] - d1[0] * k1b, y3]
  const C: [number, number] = [B[0] - d2[0] * k2b, y3]
  const C2: [number, number] = [B[0] + d2[0] * k2, y1]
  const phi1 = Math.atan2(d1[1], d1[0]) // t1 up-ray angle
  const phi2 = Math.atan2(d2[1], d2[0]) // t2 up-ray angle
  const bis = (a0: number, a1: number): [number, number] => [Math.cos((a0 + a1) / 2), Math.sin((a0 + a1) / 2)]
  const parts: string[] = []
  parts.push(geo23Line(50, y1, 560, y1, c23.ink, 2.4))
  parts.push(geo23Line(50, y2, 560, y2, c23.ink, 2.4))
  parts.push(geo23Line(50, y3, 560, y3, c23.ink, 2.4))
  parts.push(geo23Line(A[0], A[1], A2[0], A2[1], c23.tealInk, 2.4))
  parts.push(geo23Line(C2[0], C2[1], C[0], C[1], c23.tealInk, 2.4))
  parts.push(geo23Txt(572, 60, 'm1', 13, c23.ink))
  parts.push(geo23Txt(572, 170, 'm2', 13, c23.ink))
  parts.push(geo23Txt(572, 280, 'm3', 13, c23.ink))
  parts.push(geo23Dot(A[0], A[1], c23.ink, 4) + geo23Dot(B[0], B[1], c23.ink, 4.5) + geo23Dot(C[0], C[1], c23.ink, 4))
  parts.push(geo23Txt(A[0] + 2, A[1] - 16, 'A', 12.5, c23.ink))
  parts.push(geo23Txt(B[0] + 12, B[1] + 18, 'B', 13, c23.ink))
  parts.push(geo23Txt(C[0] + 2, C[1] - 16, 'C', 12.5, c23.ink))
  // outer angle arcs
  parts.push(geo23Arc(A[0], A[1], 24, phi1, -Math.PI, c23.green, 2.5))
  parts.push(geo23Arc(C[0], C[1], 24, 0, phi2, c23.green, 2.5))
  const pa = bis(phi1, -Math.PI), pb = bis(0, phi2), px = bis(phi1, phi2)
  parts.push(geo23Txt(A[0] + pa[0] * 46, A[1] + pa[1] * 46, o.aLab, 12.5, c23.green))
  parts.push(geo23Txt(C[0] + pb[0] * 46, C[1] + pb[1] * 46, o.bLab, 12.5, c23.green))
  // the x arc at B between the two up-rays
  parts.push(geo23Arc(B[0], B[1], 38, phi1, phi2, c23.orange, 3))
  parts.push(geo23Txt(B[0] + px[0] * 58, B[1] + px[1] * 58, o.xLab, 13.5, c23.orange))
  if (o.transport) {
    parts.push(geo23Arc(B[0], B[1], 52, phi1, -Math.PI, c23.amber, 2, '5 4'))
    parts.push(geo23Arc(B[0], B[1], 52, 0, phi2, c23.amber, 2, '5 4'))
    parts.push(geo23Txt(B[0] + pa[0] * 74, B[1] + pa[1] * 74, o.aLab, 11.5, c23.amber))
    parts.push(geo23Txt(B[0] + pb[0] * 74, B[1] + pb[1] * 74, o.bLab, 11.5, c23.amber))
  }
  if (o.note) parts.push(geo23Txt(310, 384, o.note, 12.5, c23.tealInk))
  return geo23Svg(W, H, o.aria, parts)
}

/* ================================================================== */
/* LESSON 2.3 — The Transversal: the Eight-Angle Census                */
/* ================================================================== */
export const lessonGeo203: Lesson = {
  id: 'geo-the-transversal-the-eight-angle-census',
  number: '2.3',
  title: 'The Transversal: the Eight-Angle Census',
  concepts: [
    'transversal',
    'corresponding angles',
    'alternate interior angles',
    'alternate exterior angles',
    'co-interior angles',
    'vertically opposite angles',
    'the converse direction',
  ],
  objectives: [
    'State the definition of a transversal and label all eight angles it creates under the chapter\u2019s a1..a8 convention',
    'Recite and use the full eight-angle census when the lines are parallel: four corresponding pairs equal, two alternate pairs equal, two co-interior pairs supplementary',
    'Name the family of any angle pair by POSITION alone, without waiting for a recognisable picture',
    'Distinguish the fifth-free converse direction (Euclid I.27 and I.28) from the forward direction (I.29, the fifth postulate\u2019s first appearance)',
    'Reduce every converse route to the alternate-interior equality a3 = a5 using only vertical and linear facts',
    'Solve one-angle, zigzag and expression-on-the-census problems with a licensed reason for every step',
  ],
  prerequisites: [
    'geo-incidence-how-points-lines-and-planes-interlock',
    'geo-angles-types-pairs-and-measures',
    'geo-parallel-lines-and-the-fifth-postulate',
  ],
  sources: ['geo-euclid-elements', 'geo-ch02-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The instrument that reads the parallel' },
    {
      kind: 'para',
      text: 'Lesson 2.2 ended with a strange bargain. Euclid\u2019s fifth postulate bought us the existence and uniqueness of a parallel through any point, and Playfair\u2019s cleaner restatement made the bargain sound almost free: one line through the point, never meeting the original. But a promise that two lines never meet is a promise about behaviour at infinity, and no ruler can check it. What we needed \u2014 and what this lesson finally builds \u2014 is an INSTRUMENT: something we can lay across two lines at arm\u2019s length that reads off, from angles we can actually measure, everything the parallel promise implies. That instrument is the transversal, and the readout it produces is a census of eight angles.',
    },
    {
      kind: 'para',
      text: 'The idea is disarmingly simple. Take two lines and cut them with a third. At each crossing point four angles appear, and by Lesson 2.1 we already know how those four behave AT A SINGLE VERTEX: vertically opposite angles are equal, adjacent angles on a straight line are supplementary. None of that needed the parallel postulate, and none of it cares whether the two cut lines will someday meet. So the eight angles carry sixteen purely local facts \u2014 eight vertical pairings and eight linear pairings, four at each vertex \u2014 before any question of parallelism arises. The interesting question is what happens ACROSS the two vertices: how the four angles at one crossing talk to the four angles at the other. If the two lines are arbitrary, the answer is \u201chardly at all\u201d. If the two lines are parallel, the answer is a complete census \u2014 every one of the twenty-eight pairs of angles falls into a named family with a fixed verdict.',
    },
    {
      kind: 'para',
      text: 'This lesson is the machinery lesson of the chapter, and we shall build the machine in the proper order. First the definition of a transversal and the labelling convention that the whole chapter uses. Then the census itself: the table of families \u2014 corresponding, alternate interior, alternate exterior, co-interior, co-exterior, vertically opposite, linear \u2014 with the exact verdict each family carries when the lines are parallel. Then the honest history: which direction of the machinery costs the fifth postulate and which direction is free, a split that Euclid himself marked by waiting until Proposition I.29 before spending his most expensive axiom. Then the reduction graph showing that every converse route collapses to a single equality. Then the position group that organises the local facts. Finally the worked chains: given one angle, recover all eight with reasons; untangle a zigzag of three parallels; and solve for an unknown inside expressions written on the census.',
    },
    {
      kind: 'para',
      text: 'A word about why this matters beyond geometry. The pattern \u201ccut a structure and read off invariants of the pieces\u201d is one of the great recurring moves of mathematics: a seismograph cuts the earth and reads its layers, a spectroscope cuts light and reads its elements, a transversal cuts a pair of lines and reads whether they are parallel. In every case the reading is LOCAL \u2014 you only measure near the cut \u2014 and the conclusion is GLOBAL: something about the whole structure. Learning to trust such readings, and to say precisely which axiom licenses each step, is the real training of this lesson.',
    },

    /* -------------------------------------------------------------- */
    /* 2. the definition + the label law + F1                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The label law: eight angles, two vertices' },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Transversal',
      text: 'A line $t$ is said to be a transversal of two lines $m$ and $n$ if it meets $m$ and $n$ at two DISTINCT points. Thus, $t$ is a transversal of $m$ and $n$ when $t$ crosses $m$ at a point $P$, crosses $n$ at a point $Q$, and $P$ and $Q$ are different points. The definition extends verbatim to three or more lines: a transversal of a family of lines meets each of them, and no two meeting points coincide.',
    },
    {
      kind: 'para',
      text: 'The distinctness clause is not decoration. If $t$ met $m$ and $n$ at the SAME point, we would have three lines through one point, and the picture would be the single-vertex crossing of Lesson 2.1 \u2014 four angles, not eight, and no notion of \u201cbetween the lines\u201d at all. The transversal is precisely the tool that creates TWO vertices, and with them the strip between $m$ and $n$ whose properties we now study. Note also what the definition does not say: it does not say the lines are parallel, and it does not say the transversal is slanted. A perpendicular cutting two parallels is a perfectly good transversal \u2014 the special one that makes all eight angles right angles.',
    },
    {
      kind: 'para',
      text: 'Eight angles are too many to discuss in prose without names, so we fix the chapter\u2019s labelling convention NOW and use it in every table, figure, engine and exercise that follows. Draw $m$ as the upper line and $n$ as the lower line; let the transversal $t$ climb from lower left to upper right, meeting $m$ at $P$ and $n$ at $Q$. At $P$, going counterclockwise from upper left, the four angles are $a_1$ (upper left), $a_2$ (upper right), $a_3$ (lower right) and $a_4$ (lower left). At $Q$, the same counterclockwise sweep names $a_5$ (upper left), $a_6$ (upper right), $a_7$ (lower right) and $a_8$ (lower left). The region between $m$ and $n$ is the INTERIOR strip: at $P$ the interior pair is the lower two angles $a_3$ and $a_4$; at $Q$ the interior pair is the upper two, $a_5$ and $a_6$. Everything outside the strip \u2014 $a_1$ and $a_2$ above $m$, $a_7$ and $a_8$ below $n$ \u2014 is EXTERIOR.',
    },
    {
      kind: 'figure',
      caption: 'The label law. The transversal t meets line m (upper) at P and line n (lower) at Q. At each vertex the four angles are named counterclockwise from upper left: a1, a2, a3, a4 at P and a5, a6, a7, a8 at Q. The tinted strip between m and n is the interior region \u2014 at P its occupants are a3 and a4, at Q they are a5 and a6; the other four angles are exterior.',
      svg: geo23Census({ aria: 'Two horizontal lines m and n cut by a rising transversal t at points P and Q, with the eight angles labelled a1 to a8 according to the chapter convention and the interior strip tinted.', band: true }),
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Position, not picture',
      text: 'Every one of the eight names is a POSITION: upper left, upper right, lower right, lower left, at one of the two vertices. Nothing in the convention depends on the transversal being drawn from lower left to upper right \u2014 flip the picture, tilt the page, or draw $t$ falling instead of climbing, and the rule \u201ccounterclockwise from upper left, $P$ first then $Q$\u201d still pins the same eight names to the same eight regions. Train yourself to name an angle by its position (\u201cupper right at $Q$\u201d, that is, $a_6$) rather than by how the picture happens to look. When an exam rotates the figure \u2014 and it will \u2014 the labels travel with the positions, not with your memory of the drawing.',
    },
    /* -------------------------------------------------------------- */
    /* 3. the census table — the heart                                */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The census: every family at once' },
    {
      kind: 'para',
      text: 'From here to the end of the section, ASSUME $m$ and $n$ are parallel, with transversal $t$ cutting $m$ at $P$ and $n$ at $Q$ as in the label law. What we are about to write down is the single most used table in elementary geometry: the complete list of angle families the eight angles form, with the verdict each family carries. Read it once as a table of facts, then again as a table of PATTERNS \u2014 the F, the Z and the C \u2014 because in an examination you will recognise the families by their shapes before you have time to recite definitions.',
    },
    {
      kind: 'table',
      caption: 'The eight-angle census when m is parallel to n \u2014 all seven families, their pairs under the label law, their verdicts and their counts',
      head: ['Family', 'Pairs (label law)', 'Verdict when m ∥ n', 'Pairs', 'Nickname'],
      rows: [
        ['Corresponding', '$a_1 = a_5$, $a_2 = a_6$, $a_3 = a_7$, $a_4 = a_8$', 'EQUAL', '4', 'the F'],
        ['Alternate interior', '$a_4 = a_6$, $a_3 = a_5$', 'EQUAL', '2', 'the Z'],
        ['Alternate exterior', '$a_1 = a_7$, $a_2 = a_8$', 'EQUAL', '2', '\u2014'],
        ['Co-interior (same-side interior)', '$a_4 + a_5 = 180^\\circ$, $a_3 + a_6 = 180^\\circ$', 'SUM $180^\\circ$', '2', 'the C'],
        ['Co-exterior (same-side exterior)', '$a_1 + a_8 = 180^\\circ$, $a_2 + a_7 = 180^\\circ$', 'SUM $180^\\circ$', '2', '\u2014'],
        ['Vertically opposite', '$a_1 = a_3$, $a_2 = a_4$, $a_5 = a_7$, $a_6 = a_8$', 'EQUAL', '4', 'the X'],
        ['Linear pairs (at P and at Q)', '$a_1{+}a_2$, $a_2{+}a_3$, $a_3{+}a_4$, $a_4{+}a_1$; likewise $a_5$ to $a_8$', 'SUM $180^\\circ$', '8', '\u2014'],
      ],
    },
    {
      kind: 'para',
      text: 'Three of these families live at a single vertex and were proved in Lesson 2.1 with no parallel postulate at all: the four vertically opposite pairs are equal, and the eight linear pairs are supplementary. The other four families are the CROSS-VERTEX families, and each of them is a genuine parallel phenomenon. Corresponding angles occupy the SAME POSITION at the two vertices \u2014 $a_1$ and $a_5$ are both upper left, $a_2$ and $a_6$ both upper right, and so on \u2014 and the table says they are equal. Slide $a_1$ down the transversal until its vertex reaches $Q$ and it lands exactly on $a_5$: this is the F-pattern, the letter F (possibly stretched, flipped or slanted) with one arm on each line. Alternate interior angles are the two interior angles on OPPOSITE sides of the transversal, $a_4$ with $a_6$ and $a_3$ with $a_5$: equal, and traced by the Z-pattern. Alternate exterior angles are their outside twins, $a_1$ with $a_7$ and $a_2$ with $a_8$, equal as well. Co-interior angles \u2014 also called same-side interior \u2014 are the two interior angles on the SAME side of the transversal, $a_4$ with $a_5$ on the left and $a_3$ with $a_6$ on the right: these do NOT equal each other; they SUM to $180^\\circ$, and the C-pattern curls around them. Co-exterior angles are the same-side pairs outside the strip, $a_1$ with $a_8$ and $a_2$ with $a_7$, also summing to $180^\\circ$.',
    },
    {
      kind: 'figure',
      caption: 'The four pattern families, colour-coded. Top left: corresponding angles a1 and a5 trace the F and are EQUAL (green). Top right: alternate interior angles a3 and a5 trace the Z and are EQUAL (orange). Bottom left: co-interior angles a4 and a5 curl inside the C and SUM to 180 degrees (amber). Bottom right: vertically opposite angles a1 and a3 cross in the X and are EQUAL (teal) \u2014 the one family that needs no parallels at all.',
      svg: geo23Svg(880, 600, 'Four mini diagrams of two lines cut by a transversal, each highlighting one pair of angles: corresponding a1 and a5 in green labelled the F, alternate interior a3 and a5 in orange labelled the Z, co-interior a4 and a5 in amber labelled the C, and vertically opposite a1 and a3 in teal labelled the X.', [
        geo23Txt(440, 24, 'THE FOUR PATTERN FAMILIES \u2014 WHO IS EQUAL, WHO SUPPLEMENTS', 13, c23.ink, 'middle', '700'),
        ...geo23Mini(20, 44, [0, 4], c23.green, 'Corresponding: a1 = a5 (the F)'),
        ...geo23Mini(450, 44, [2, 4], c23.orange, 'Alternate interior: a3 = a5 (the Z)'),
        ...geo23Mini(20, 330, [3, 4], c23.amber, 'Co-interior: a4 + a5 = 180\u00b0 (the C)'),
        ...geo23Mini(450, 330, [0, 2], c23.tealInk, 'Vertically opposite: a1 = a3 (the X)'),
      ]),
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.29 in our own words \u2014 the forward direction',
      text: 'A transversal falling on two parallel lines makes the alternate angles equal to one another, the exterior angle equal to the interior and opposite angle on the same side, and the two interior angles on the same side together equal to two right angles. In the language of our census: if $m$ and $n$ are parallel, then $a_3 = a_5$ (alternate), $a_1 = a_5$ (exterior equals interior-and-opposite, that is, corresponding) and $a_4 + a_5 = 180^\\circ$ (co-interior). This is the proposition at which the fifth postulate makes its FIRST appearance in the Elements \u2014 twenty-eight propositions of Book I pass without it.',
    },
    {
      kind: 'para',
      text: 'Notice the arithmetic hiding inside the table. Count the pairs: corresponding gives 4, alternate interior 2, alternate exterior 2, co-interior 2, co-exterior 2, vertically opposite 4, linear 8 \u2014 twenty-four named pairs out of the twenty-eight pairs that eight angles can form. The four leftover pairs, $(a_1, a_6)$, $(a_2, a_5)$, $(a_3, a_8)$ and $(a_4, a_7)$, sit on opposite sides of the transversal with one angle interior and the other exterior; the classical catalogue does not name them, but the census constrains them too \u2014 each of the four also sums to $180^\\circ$. So the complete readout is brutal in its simplicity: of the twenty-eight pairs, TWELVE are equal pairs and SIXTEEN are supplementary pairs, and there is nothing else to know. The engine behind this lesson verifies every one of those twenty-eight verdicts, at four different headline angles, before a single sentence of prose was allowed to stand.',
    },
    {
      kind: 'para',
      text: 'And the deepest row of the table is the one that looks least exciting: the census collapses to ONE number. Given $a_1$, everything is determined \u2014 the odd-numbered angles $a_1$, $a_3$, $a_5$, $a_7$ all equal $a_1$, and the even-numbered angles $a_2$, $a_4$, $a_6$, $a_8$ all equal $180^\\circ - a_1$. One measurement at one vertex, and the instrument has read the whole configuration. This is worth isolating as a drill, because examinations test exactly this collapse.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'The census collapse: one number buys eight',
      text: 'When $m$ and $n$ are parallel, the census is completely determined by $a_1$: it reads $a_1$, $180^\\circ - a_1$, $a_1$, $180^\\circ - a_1$, $a_1$, $180^\\circ - a_1$, $a_1$, $180^\\circ - a_1$. Equivalently: the odd angles are all equal, the even angles are all equal, and any odd angle plus any even angle at the same vertex makes $180^\\circ$.',
    },
    {
      kind: 'para',
      text: 'Drill the collapse until it is reflex. If $a_1 = 65^\\circ$, the full census is $65^\\circ$, $115^\\circ$, $65^\\circ$, $115^\\circ$, $65^\\circ$, $115^\\circ$, $65^\\circ$, $115^\\circ$ \u2014 odds equal, evens equal. The same one-line census holds for any starting value whatsoever, and the engine checks it at three more witnesses besides: at $a_1 = 37.5^\\circ$ the census reads $37.5^\\circ$ and $142.5^\\circ$ alternating; at $a_1 = 112.75^\\circ$ it reads $112.75^\\circ$ and $67.25^\\circ$ alternating; and at $a_1 = 90^\\circ$ \u2014 the perpendicular transversal \u2014 every angle is $90^\\circ$ and the odd\u2013even distinction quietly disappears. The table below is the drill in reusable form.',
    },
    {
      kind: 'table',
      caption: 'The census drill at the four engine-verified witnesses \u2014 given a1, the odd angles equal a1 and the even angles equal 180 degrees minus a1',
      head: ['Given $a_1$', 'Odd angles $a_1, a_3, a_5, a_7$', 'Even angles $a_2, a_4, a_6, a_8$', 'Transversal type'],
      rows: [
        ['$65^\\circ$', '$65^\\circ$', '$115^\\circ$', 'slanted'],
        ['$37.5^\\circ$', '$37.5^\\circ$', '$142.5^\\circ$', 'shallow'],
        ['$112.75^\\circ$', '$112.75^\\circ$', '$67.25^\\circ$', 'steep'],
        ['$90^\\circ$', '$90^\\circ$', '$90^\\circ$', 'perpendicular \u2014 all eight right'],
      ],
    },
    {
      kind: 'para',
      text: 'Two cautions before we move on, both of them standard examination traps. FIRST: equality belongs to the alternate and corresponding families; the same-side families SUPPLEMENT. A pair of interior angles on the same side of the transversal is the C, and the C never pays out equality \u2014 unless both angles happen to be $90^\\circ$, the degenerate case in which equality and supplement coincide. Students who write $a_4 = a_5$ from parallel lines have confused the C with the Z, and the remedy is positional: ask WHICH SIDE of the transversal the two angles occupy. SECOND: the four unnamed cross pairs \u2014 $(a_1, a_6)$ and its three siblings \u2014 also sum to $180^\\circ$, but they are NOT co-interior and NOT corresponding, and no standard theorem names them. Demanding equality of such a pair (writing $a_1 = a_6$ for a generic parallel pair) is a category error the engine exposes immediately: since $a_1 + a_6 = 180^\\circ$ always holds here, the equality $a_1 = a_6$ would force both angles to $90^\\circ$. We shall meet this trap again in the worked chains, armed.',
    },
    {
      kind: 'list',
      marker: 'roman',
      items: [
        'For example, if $a_1 = 65^\\circ$ then $a_6 = 115^\\circ$: $a_3 = a_1 = 65^\\circ$ (vertically opposite at $P$), and $a_3 + a_6 = 180^\\circ$ (co-interior on the right), so $a_6 = 115^\\circ$.',
        'For example, if $a_4 = 125^\\circ$ then $a_5 = 55^\\circ$: $a_4 + a_5 = 180^\\circ$ (co-interior on the left), the C-pattern paying out its supplement.',
        'For example, if $a_2 = 37.5^\\circ$ then $a_6 = 37.5^\\circ$, because $a_2$ and $a_6$ are corresponding (the F) and the F pays out equality; but $a_7 = 142.5^\\circ$, because $a_2$ and $a_7$, though both on the right of $t$, are co-EXTERIOR (the same-side family outside the strip) and the same-side families supplement. Settle the family before the arithmetic.',
      ],
    },
    /* -------------------------------------------------------------- */
    /* 4. the honest history — which direction costs the postulate    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Which direction costs the postulate' },
    {
      kind: 'para',
      text: 'Here is the split that gives this lesson its signature, and it is a split Euclid marked himself \u2014 you can read it off the page numbers of Book I. Every fact in the census table is a conditional of the form \u201cIF the lines are parallel, THEN the angles behave\u201d. That is the FORWARD direction: parallels buy the equalities and the supplements. But each row also has a CONVERSE: \u201cIF a transversal makes the alternate angles equal (or the corresponding angles equal, or the co-interior angles supplementary), THEN the lines are parallel\u201d. The converse direction is how parallels are MANUFACTURED \u2014 how a drawing, a construction or a machine is certified parallel from angle measurements alone. The two directions look like mirror images. They are not. They differ in exactly one respect, and it is the most expensive respect in the history of geometry.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.27 \u2014 the converse that costs nothing',
      text: 'If a straight line falling on two straight lines makes the alternate angles equal to one another, the two straight lines are parallel to one another. In our labels: if $a_3 = a_5$ (or $a_4 = a_6$), then $m$ and $n$ do not meet \u2014 they are parallel. Euclid proves this BEFORE ever using the fifth postulate: it is pure angle-chasing plus the exterior angle theorem (I.16), valid in every geometry that keeps Euclid\u2019s first twenty-eight propositions.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Euclid I.28 \u2014 the other two converse routes, still free',
      text: 'If a straight line falling on two straight lines makes the exterior angle equal to the interior and opposite angle on the same side, the two lines are parallel; and if it makes the two interior angles on the same side together equal to two right angles, the two lines are parallel. In our labels: $a_1 = a_5$ (corresponding) suffices, and so does $a_4 + a_5 = 180^\\circ$ (co-interior). Both routes are proved from I.27 by one vertical or linear step \u2014 the reduction graph below \u2014 and neither touches the fifth postulate.',
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'The fifth postulate\u2019s first appearance',
      text: 'Euclid gets through twenty-eight propositions of Book I without once invoking his fifth postulate \u2014 the contentious one about two interior angles summing to less than two right angles forcing a meeting. The first proposition that spends it is I.29, the FORWARD direction of this lesson\u2019s census table. Nearly everything after I.29 in Book I \u2014 including the famous angle sum of a triangle in I.32, which is Lesson 2.4\u2019s payoff \u2014 depends on it. Joyce\u2019s commentary on the Elements marks I.29 as exactly this watershed, and the run-126 ground register banks the fact. Two millennia later, the geometers who finally questioned the postulate \u2014 Saccheri, Lobachevsky, Bolyai \u2014 were in effect asking which half of our census table survives when the forward direction dies. The answer: the whole converse half, I.27 and I.28, survives untouched.',
    },
    {
      kind: 'para',
      text: 'So the honest ledger reads: CONVERSE (make parallels from angles) \u2014 I.27 and I.28, proved free of the fifth postulate. FORWARD (angles from parallels) \u2014 I.29, the fifth postulate\u2019s first appearance, the moment Euclid finally pays. Why must the forward direction pay when the converse does not? The converse argues that the lines CANNOT meet: if they did, they would form a triangle with the transversal, and the equality of alternate angles would put two equal angles where the exterior angle theorem demands a strictly larger one \u2014 a contradiction available in neutral geometry. The forward direction must argue that the angles CANNOT help being equal \u2014 a claim about what happens arbitrarily far away along both lines, and taming the far away is precisely what the fifth postulate is for. When you write a solution step citing \u201ccorresponding angles\u201d, you are spending I.29 and, through it, the fifth postulate; when you cite \u201calternate angles equal, hence parallel\u201d, you are spending nothing. Examinations adore asking which is which.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Direction identification is an exam skill',
      text: 'Before citing any census row, ask one question: is the parallel GIVEN (you know $m$ and $n$ are parallel and want angles \u2014 forward, I.29) or DERIVED (you know angles and want the parallel \u2014 converse, I.27/I.28)? Same table, opposite direction of travel, different axioms spent. Half of the lost marks on transversal problems come from citing the census in the wrong direction.',
    },

    /* -------------------------------------------------------------- */
    /* 5. the reduction graph                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The reduction graph: every route folds to I.27' },
    {
      kind: 'para',
      text: 'The census table lists three sufficient conditions for parallelism \u2014 corresponding equal, alternate interior equal, co-interior supplementary \u2014 plus a fourth, alternate exterior equal, that the table implies without naming as a certificate. It looks like four independent theorems. It is one theorem wearing four costumes. The claim of this section is that every converse route reduces, using only the single-vertex facts of Lesson 2.1 (vertical equality and linear supplements, both free of the fifth postulate), to the single alternate-interior equality $a_3 = a_5$ that I.27 consumes. The derivation below checks all three routes; the figure behind it draws the flow.',
    },
    {
      kind: 'derivation',
      title: 'Every converse route reduces to the alternate-interior equality',
      statement: 'Given a transversal $t$ of lines $m$ and $n$ (meeting them at $P$ and $Q$), each of the three hypotheses \u2014 corresponding equality $a_1 = a_5$, co-interior supplement $a_4 + a_5 = 180^\\circ$, alternate-exterior equality $a_1 = a_7$ \u2014 implies the alternate-interior equality $a_3 = a_5$, using only the vertex facts (vertical angles equal; linear pairs supplementary).',
      steps: [
        {
          label: 'Vertex facts are free',
          formula: 'a_3 = a_1,\\quad a_7 = a_5,\\quad a_3 + a_4 = 180^\\circ',
          explanation: 'At $P$, vertically opposite angles are equal, so $a_3 = a_1$, and the linear pair on the right of $t$ gives $a_3 + a_4 = 180^\\circ$. At $Q$, vertical equality gives $a_7 = a_5$. These are Lesson 2.1 facts: they hold at each vertex separately, for any two lines, with no parallel assumption and no fifth postulate.',
        },
        {
          label: 'Route 1: corresponding, via vertical at P',
          formula: 'a_1 = a_5 \\ \\Rightarrow\\ a_3 = a_1 = a_5',
          explanation: 'Assume the corresponding pair is equal. Chain it with the vertical equality at $P$: $a_3 = a_1$ and $a_1 = a_5$ give $a_3 = a_5$ by transitivity. The F collapses to the Z in one step.',
        },
        {
          label: 'Route 2: co-interior, via linear at P',
          formula: 'a_4 + a_5 = 180^\\circ \\ \\Rightarrow\\ a_3 = 180^\\circ - a_4 = a_5',
          explanation: 'Assume the co-interior pair on the left supplements. The linear pair at $P$ also supplements $a_4$, with $a_3$. Two angles that both supplement $a_4$ are equal to each other, so $a_3 = a_5$. The C collapses to the Z through the shared supplement.',
        },
        {
          label: 'Route 3: alternate exterior, via vertical at Q',
          formula: 'a_1 = a_7,\\ a_7 = a_5 \\ \\Rightarrow\\ a_1 = a_5',
          explanation: 'Assume the alternate-exterior pair is equal. The vertical equality at $Q$ turns $a_7$ into $a_5$, so $a_1 = a_5$ \u2014 which is Route 1\u2019s hypothesis, and Route 1 finishes: $a_3 = a_5$.',
        },
        {
          label: 'All three land on I.27',
          formula: 'a_3 = a_5 \\ \\Rightarrow\\ m \\parallel n',
          explanation: 'Each route delivers the alternate-interior equality, and I.27 converts that equality into parallelism without spending the fifth postulate. Hence I.28\u2019s two stated routes, and the alternate-exterior certificate, are all corollaries of I.27 plus vertex facts \u2014 one theorem, four costumes.',
        },
      ],
      result: 'Corresponding-equal, co-interior-supplementary and alternate-exterior-equal all imply $a_3 = a_5$; therefore each is a parallelism certificate through I.27 alone, and the engine confirms the three routes over a free sweep of both vertex angles.',
    },
    {
      kind: 'figure',
      caption: 'The reduction graph. Three converse hypotheses (green boxes) each fold through one free vertex fact (amber boxes) onto the alternate-interior equality a3 = a5 (orange box), which Euclid I.27 converts into parallelism. The alternate-exterior route passes through the corresponding equality on its way down. No route touches the fifth postulate.',
      svg: geo23Svg(880, 512, 'A flow diagram: three given-condition boxes at the top, each with an arrow through a vertex-fact box, all converging on one landing box stating a3 equals a5, with a final note that I.27 finishes the job.', [
        geo23Txt(440, 26, 'EVERY CONVERSE ROUTE LANDS ON a3 = a5', 13.5, c23.ink, 'middle', '700'),
        geo23Rect(40, 48, 230, 64, c23.panel, c23.green),
        geo23Txt(155, 74, 'GIVEN corresponding', 13, c23.ink),
        geo23Txt(155, 96, 'a1 = a5', 12.5, c23.mid),
        geo23Rect(325, 48, 230, 64, c23.panel, c23.green),
        geo23Txt(440, 74, 'GIVEN co-interior', 13, c23.ink),
        geo23Txt(440, 96, 'a4 + a5 = 180\u00b0', 12.5, c23.mid),
        geo23Rect(610, 48, 230, 64, c23.panel, c23.green),
        geo23Txt(725, 74, 'GIVEN alt. exterior', 13, c23.ink),
        geo23Txt(725, 96, 'a1 = a7', 12.5, c23.mid),
        geo23Arrow(155, 112, 155, 152, c23.amber, 2),
        geo23Arrow(440, 112, 440, 152, c23.amber, 2),
        geo23Arrow(725, 112, 725, 152, c23.amber, 2),
        geo23Rect(40, 156, 230, 64, c23.panel2, c23.amber),
        geo23Txt(155, 182, 'vertical at P: a3 = a1', 12.5, c23.ink),
        geo23Txt(155, 204, 'then a3 = a1 = a5', 12, c23.mid),
        geo23Rect(325, 156, 230, 64, c23.panel2, c23.amber),
        geo23Txt(440, 182, 'linear at P: a3 + a4 = 180\u00b0', 12.5, c23.ink),
        geo23Txt(440, 204, 'then a3 = 180\u00b0 \u2212 a4 = a5', 12, c23.mid),
        geo23Rect(610, 156, 230, 64, c23.panel2, c23.amber),
        geo23Txt(725, 182, 'vertical at Q: a7 = a5', 12.5, c23.ink),
        geo23Txt(725, 204, 'then a1 = a5 (route 1)', 12, c23.mid),
        geo23Arrow(155, 224, 330, 306, c23.orange, 2.4),
        geo23Arrow(440, 224, 440, 306, c23.orange, 2.4),
        geo23Arrow(725, 224, 550, 306, c23.orange, 2.4),
        geo23Rect(230, 312, 420, 66, c23.panel2, c23.orange),
        geo23Txt(440, 338, 'a3 = a5 \u2014 alternate interior equality', 13.5, c23.orange, 'middle', '700'),
        geo23Txt(440, 360, 'the Z-pattern certificate', 12, c23.mid),
        geo23Arrow(440, 382, 440, 420, c23.green, 2.4),
        geo23Rect(230, 424, 420, 72, c23.panel, c23.green),
        geo23Txt(440, 446, 'Euclid I.27 \u2014 no fifth postulate: m \u2225 n', 13, c23.ink, 'middle', '700'),
        geo23Txt(440, 484, 'all three routes: converse direction only', 11.5, c23.tealInk),
      ]),
    },
    {
      kind: 'para',
      text: 'The reduction graph has a practical reading and a structural one. Practically: you never need to memorise I.28 as a separate theorem \u2014 remember the Z-certificate and one vertical or linear step, and every other certificate is ten seconds away. Structurally: the graph is the reason the converse direction is postulate-free. Every edge in it is either a vertex fact (Lesson 2.1, no postulate) or I.27 itself (no fifth postulate); there is simply nowhere for the fifth postulate to enter. The forward direction, by contrast, cannot be reduced away \u2014 I.29 must reach across the two vertices and pull equality out of parallelism, and that reach is what the postulate pays for. One diagram, and the lesson\u2019s whole historical burden is visible.',
    },
    /* -------------------------------------------------------------- */
    /* 6. the position group V4                                       */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The position group: four slots, three pairings' },
    {
      kind: 'para',
      text: 'Stand at one vertex \u2014 say $P$ \u2014 and forget the parallel question entirely. The four angles $a_1$, $a_2$, $a_3$, $a_4$ occupy four POSITIONS: upper left, upper right, lower right, lower left. From Lesson 2.1 we know how the positions pair up, and it is worth seeing the pairings side by side, because they are three and only three. VERTICAL pairs sit opposite each other through the vertex: upper-left with lower-right, upper-right with lower-left \u2014 EQUAL. LINEAR pairs across the TRANSVERSAL share a ray of $t$: upper-left with upper-right, lower-left with lower-right \u2014 SUM to $180^\\circ$. LINEAR pairs across the LINE $m$ share a ray of the line: upper-left with lower-left, upper-right with lower-right \u2014 also SUM to $180^\\circ$, and distinctly from the previous pairing. Three pairings, each pairing a perfect matching of the four positions, every angle appearing exactly once in each.',
    },
    {
      kind: 'para',
      text: 'Now the structural punchline, stated in light language but exact in content. Each pairing is an INVOLUTION: apply it twice and every position returns to itself \u2014 the partner of your partner is you. And the three pairings compose: apply the vertical pairing, then the across-the-transversal pairing, and the net effect is exactly the across-the-line pairing \u2014 and this holds in EITHER order. The same holds for every other combination: the composition of any two of the three pairings is the third, and the composition of any pairing with itself is the identity (doing nothing). A set of four objects with an identity, three involutions, and this composition table is a genuine mathematical structure called the Klein four-group, written $V_4$ \u2014 the smallest group that is not a cycle. It is the same structure you will meet later governing the symmetry pairs of a rectangle. The engine behind this lesson builds the three pairings, checks all three involutions, and multiplies out the entire composition table.',
    },
    {
      kind: 'figure',
      caption: 'The position group at one vertex. The four positions UL, UR, LR, LL (occupied by a1, a2, a3, a4 at P) carry exactly three pairings, drawn as the three colours of the complete graph on four nodes: vertically opposite (green, EQUAL), linear across the transversal (amber, SUM 180), linear across the line (orange, SUM 180). Each pairing is an involution, and the composition of any two is the third \u2014 the Klein four-group V4. The same table governs a5..a8 at Q.',
      svg: geo23Svg(560, 452, 'A square of four labelled nodes UL, UR, LR, LL joined by six coloured edges: two green diagonals for vertical equality, a amber top and bottom edge for linear across the transversal, and two orange side edges for linear across the line, with a legend underneath.', [
        geo23Txt(280, 26, 'THE POSITION GROUP \u2014 THREE PAIRINGS, ONE SQUARE', 13, c23.ink, 'middle', '700'),
        geo23Line(170, 120, 390, 120, c23.amber, 3),
        geo23Line(170, 320, 390, 320, c23.amber, 3),
        geo23Line(170, 120, 170, 320, c23.orange, 3),
        geo23Line(390, 120, 390, 320, c23.orange, 3),
        geo23Line(170, 120, 390, 320, c23.green, 3),
        geo23Line(390, 120, 170, 320, c23.green, 3),
        geo23Txt(280, 106, 'across t: a1 + a2 = 180\u00b0', 11.5, c23.amber),
        geo23Txt(280, 342, 'across t: a4 + a3 = 180\u00b0', 11.5, c23.amber),
        geo23Txt(126, 224, 'across m:', 11.5, c23.orange),
        geo23Txt(126, 240, 'a1 + a4 = 180\u00b0', 11.5, c23.orange),
        geo23Txt(434, 224, 'across m:', 11.5, c23.orange),
        geo23Txt(434, 240, 'a2 + a3 = 180\u00b0', 11.5, c23.orange),
        geo23Txt(214, 174, 'vertical: a1 = a3', 11.5, c23.green),
        geo23Txt(346, 286, 'vertical: a1 = a3', 11.5, c23.green),
        geo23Txt(346, 174, 'vertical: a2 = a4', 11.5, c23.green),
        geo23Txt(214, 286, 'vertical: a2 = a4', 11.5, c23.green),
        geo23CircleLbl(170, 120, 'UL', 'a1'),
        geo23CircleLbl(390, 120, 'UR', 'a2'),
        geo23CircleLbl(390, 320, 'LR', 'a3'),
        geo23CircleLbl(170, 320, 'LL', 'a4'),
        geo23Txt(280, 396, 'each pairing is an involution; the composition of any two is the third', 12, c23.tealInk),
        geo23Txt(280, 418, 'the Klein four-group V4 \u2014 four positions, three pairings', 12, c23.tealInk),
        geo23Txt(280, 440, 'census = the V4 facts at P and Q + ONE corresponding equality', 12, c23.ink, 'middle', '700'),
      ]),
    },
    {
      kind: 'para',
      text: 'Why should a geometry student care about a group? Because it tells you what the census is MADE of. Count what you now know: at $P$, the three pairings of the position group bind $a_1$, $a_2$, $a_3$, $a_4$ into one equivalence class of size two \u2014 every angle is either $a_1$ or $180^\\circ - a_1$. At $Q$, the same three pairings do the same for $a_5$ through $a_8$. So before any parallel assumption, the eight angles have collapsed to TWO free numbers: the $P$-class value and the $Q$-class value. The entire content of \u201c$m$ parallel $n$\u201d, read through the transversal, is the single equation $a_1 = a_5$ \u2014 one corresponding equality that welds the two classes together. Every row of the census table is then forced: the twelve equal pairs and sixteen supplementary pairs all fall out of four $V_4$ facts (one table, used at two vertices) plus that one welding equation. When a later lesson derives the angle sum of a triangle from a parallel through a vertex, this is the accounting that will make the derivation transparent.',
    },

    /* -------------------------------------------------------------- */
    /* 7. worked applications (Illustration chains)                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The census in action: three worked chains' },
    {
      kind: 'para',
      text: 'Theory ends; the drill begins. The three Illustrations below are the three shapes in which this material is examined. In the first, one angle is given and all eight are recovered \u2014 every step licensed. In the second, three parallels and two transversals tangle into a zigzag, and the middle angle falls to a straight-angle equation. In the third, the angles arrive dressed as algebraic expressions, and the census itself supplies the equation. Watch the reasons: a solution step without a licence is a guess wearing a suit.',
    },
    {
      kind: 'example',
      title: 'Lines m and n are parallel, cut by transversal t at P and Q under the label law. Given a1 = 65\u00b0, find all eight angles, with a reason for each.',
      steps: [
        'Sol. Set up the census from $a_1$: at $P$, the linear pair on the upper side gives $a_2 = 180^\\circ - 65^\\circ = 115^\\circ$ (angles on a straight line).',
        'Now, the vertical pairing at $P$ pays out twice: $a_3 = a_1 = 65^\\circ$ and $a_4 = a_2 = 115^\\circ$ (vertically opposite angles).',
        'Transport to $Q$ by corresponding angles (the F, I.29): $a_5 = a_1 = 65^\\circ$, $a_6 = a_2 = 115^\\circ$, $a_7 = a_3 = 65^\\circ$, $a_8 = a_4 = 115^\\circ$.',
        'Check by a second family: co-interior on the left, $a_4 + a_5 = 115^\\circ + 65^\\circ = 180^\\circ$ (the C) \u2014 consistent.',
        'Check by the third family: alternate interior $a_3 = a_5 = 65^\\circ$ (the Z) \u2014 consistent.',
        'Hence the census reads $65^\\circ, 115^\\circ, 65^\\circ, 115^\\circ, 65^\\circ, 115^\\circ, 65^\\circ, 115^\\circ$: odds all $65^\\circ$, evens all $115^\\circ$.',
      ],
      figures: [
        {
          caption: 'The census walk at a1 = 65\u00b0: all eight angles recovered from one measurement \u2014 odds 65, evens 115, every cross-vertex verdict landing as the table promises.',
          svg: geo23Census({
            aria: 'Two parallel lines cut by a transversal with all eight angles labelled a1 to a8 and their values 65 or 115 degrees shown beside each label.',
            subs: ['65\u00b0', '115\u00b0', '65\u00b0', '115\u00b0', '65\u00b0', '115\u00b0', '65\u00b0', '115\u00b0'],
          }),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The zigzag. Three parallel lines m1, m2, m3 are cut by two transversals that meet at a point B on the middle line m2; the transversals meet m1 at A and m3 at C respectively, with the marked outer angles 50\u00b0 at A and 60\u00b0 at C. Find the angle x at B between the two transversals.',
      steps: [
        'Sol. Transport the outer angles to B. Along the first transversal, $m_1$ and $m_2$ are parallel, so the $50^\\circ$ at $A$ has an equal corresponding copy at $B$ (the F, I.29).',
        'Along the second transversal, $m_2$ and $m_3$ are parallel, so the $60^\\circ$ at $C$ likewise has an equal corresponding copy at $B$.',
        'Now, $m_2$ is a straight line through $B$, so the three angles on one side of it \u2014 the transported $50^\\circ$, the gap $x$ between the two transversals, and the transported $60^\\circ$ \u2014 together make a straight angle: $50^\\circ + x + 60^\\circ = 180^\\circ$.',
        'So, $x = 180^\\circ - 50^\\circ - 60^\\circ = 70^\\circ$.',
        'Check: the vertical copy of $x$ at $B$ is also $70^\\circ$, and the angles on the other side of $m_2$ sum to $180^\\circ - 70^\\circ = 110^\\circ$ \u2014 consistent with the two transported supplements $130^\\circ$ and $120^\\circ$ overlapping correctly.',
        'Hence $x = 70^\\circ$ \u2014 the parallel at B is what turns a tangle of five lines into a single straight-angle story.',
      ],
      figures: [
        {
          caption: 'The zigzag solved: the outer 50\u00b0 and 60\u00b0 are transported to B as corresponding copies (dashed amber arcs), where they sit with x along the straight line m2: 50\u00b0 + x + 60\u00b0 = 180\u00b0, so x = 70\u00b0.',
          svg: geo23Zigzag({
            aria: 'Three parallel lines cut by two transversals meeting at point B on the middle line, with outer angles 50 and 60 degrees marked at A and C, transported dashed copies at B, and x equal to 70 degrees marked between the transversals at B.',
            aLab: '50\u00b0', bLab: '60\u00b0', xLab: 'x = 70\u00b0', transport: true,
            note: 'straight angle at B: 50\u00b0 + x + 60\u00b0 = 180\u00b0',
          }),
        },
      ],
    },
    {
      kind: 'example',
      title: 'The x-ladder. Lines m and n are parallel, cut by transversal t at P and Q under the label law. The corresponding angles satisfy a1 = (2x + 10)\u00b0 and a5 = (3x \u2212 5)\u00b0. Find x and the common angle.',
      steps: [
        'Sol. Set up the equation from the family: $a_1$ and $a_5$ are corresponding angles (both upper left, at $P$ and at $Q$), and parallels make corresponding angles equal (the F, I.29).',
        'So, $(2x + 10) = (3x - 5)$.',
        'Now, collect: $10 + 5 = 3x - 2x$, that is, $15 = x$.',
        'Check the family first, the arithmetic second: had the pair been $(a_1, a_6)$ instead, the census would supply a SUM, not an equality \u2014 $a_1 + a_6 = 180^\\circ$ \u2014 and the equation would be $(2x + 10) + (3x - 5) = 180$ instead, a different problem entirely.',
        'Substitute back: $a_1 = 2(15) + 10 = 40^\\circ$ and $a_5 = 3(15) - 5 = 40^\\circ$ \u2014 equal, as corresponding angles must be.',
        'Hence $x = 15$ and both angles are $40^\\circ$; the full census reads $40^\\circ$ (odds) and $140^\\circ$ (evens).',
      ],
      figures: [
        {
          caption: 'The x-ladder solved: the corresponding pair a1 = (2x + 10)\u00b0 and a5 = (3x \u2212 5)\u00b0 highlighted in orange on the census picture; equality of corresponding angles gives x = 15 and both angles 40\u00b0.',
          svg: geo23Census({
            aria: 'Two parallel lines cut by a transversal with the corresponding angles a1 and a5 highlighted in orange and labelled with the expressions 2x plus 10 degrees and 3x minus 5 degrees.',
            hl: [0, 4], hlColor: c23.orange,
            subs: ['(2x + 10)\u00b0', null, null, null, '(3x \u2212 5)\u00b0', null, null, null],
          }),
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 8. the forward census derivation                               */
    /* -------------------------------------------------------------- */
    {
      kind: 'para',
      text: 'It is worth spelling out exactly how much machinery I.29 buys, because the answer is: the entire census table, in one derivation. Euclid states the proposition in three clauses (alternate equal, exterior-equals-interior-opposite, co-interior supplementary), and we shall take its first clause \u2014 the alternate-interior equality \u2014 as the seed, deriving everything else from it by vertex facts alone. This is the mirror image of the reduction graph: there, four converse certificates collapsed to one equality; here, one forward equality explodes into twenty-four family verdicts.',
    },
    {
      kind: 'derivation',
      title: 'The forward census: one I.29 equality generates every family verdict',
      statement: 'Suppose $m$ and $n$ are parallel with transversal $t$, and suppose the I.29 alternate-interior clause $a_3 = a_5$ holds. Then every verdict of the census table follows using only vertex facts.',
      steps: [
        {
          label: 'Seed: the Z from I.29',
          formula: 'a_3 = a_5',
          explanation: 'This is the one cross-vertex fact the fifth postulate pays for. Everything below is bookkeeping at the two vertices.',
        },
        {
          label: 'The other Z pair',
          formula: 'a_4 = 180^\\circ - a_3 = 180^\\circ - a_5 = a_6',
          explanation: 'At $P$, $a_4$ supplements $a_3$ (linear pair); at $Q$, $a_6$ supplements $a_5$. Since $a_3 = a_5$, their supplements are equal: $a_4 = a_6$ \u2014 the second alternate-interior pair.',
        },
        {
          label: 'The F pairs',
          formula: 'a_1 = a_3 = a_5,\\quad a_2 = a_4,\\ a_6 = a_8,\\ a_7 = a_5',
          explanation: 'Vertical equality at $P$ turns $a_1$ into $a_3$, which is $a_5$; similarly $a_2 = a_4$, and vertical equality at $Q$ gives $a_7 = a_5$ and $a_8 = a_6$. Chaining: $a_1 = a_5$, $a_2 = a_6$, $a_3 = a_7$, $a_4 = a_8$ \u2014 all four corresponding pairs equal.',
        },
        {
          label: 'The C pairs',
          formula: 'a_4 + a_5 = (180^\\circ - a_5) + a_5 = 180^\\circ',
          explanation: 'The co-interior pair on the left supplements; substituting $a_4 = 180^\\circ - a_5$ collapses the sum to exactly $180^\\circ$. The right-hand pair $a_3 + a_6$ does the same. The co-exterior pairs $a_1 + a_8$ and $a_2 + a_7$ follow identically.',
        },
        {
          label: 'The collapse',
          formula: 'a_1 = a_3 = a_5 = a_7,\\quad a_2 = a_4 = a_6 = a_8',
          explanation: 'Collecting: every odd-labelled angle equals the seed value, every even-labelled angle equals its supplement. Twelve equal pairs and sixteen supplementary pairs \u2014 the complete twenty-eight-pair readout.',
        },
      ],
      result: 'From the single I.29 clause $a_3 = a_5$, vertex facts alone force the whole census: odds equal $a_1$, evens equal $180^\\circ - a_1$ \u2014 the engine certifies all twenty-eight pairwise verdicts at four witness values of $a_1$.',
    },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner: patterns, positions, directions',
      text: 'Three skills are examined here, in rising order of credit. PATTERN-FINDING: given a dense figure, shade the F, the Z or the C with your pencil before writing anything \u2014 the shading picks the theorem. POSITION-NAMING: \u201cwhich family is this pair?\u201d is answered from the label law (same position: corresponding; opposite sides both interior: alternate interior; same side interior: co-interior), never from the picture\u2019s tilt. DIRECTION-IDENTIFICATION: state whether the parallel is GIVEN (forward, I.29 \u2014 the fifth postulate is being spent) or DERIVED (converse, I.27/I.28 \u2014 postulate-free): a one-line justification naming the proposition is regularly worth as many marks as the arithmetic. Zigzag and expression questions (Illustrations 2 and 3) are standard competitive-exam shapes; the one-angle census walk (Illustration 1) is the guaranteed opener.',
    },
    /* -------------------------------------------------------------- */
    /* 9. terms + formula cards                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'terms',
      items: [
        { term: 'transversal', def: 'A line that meets two or more lines at DISTINCT points. Under the chapter convention it meets line $m$ (upper) at $P$ and line $n$ (lower) at $Q$, creating the eight angles $a_1$ to $a_8$.' },
        { term: 'interior angles', def: 'The four angles inside the strip between $m$ and $n$: $a_3$ and $a_4$ at $P$, $a_5$ and $a_6$ at $Q$. The other four are exterior.' },
        { term: 'corresponding angles', def: 'Angles in the SAME position at the two vertices: $(a_1, a_5)$, $(a_2, a_6)$, $(a_3, a_7)$, $(a_4, a_8)$. Equal when the lines are parallel \u2014 the F-pattern, I.29.' },
        { term: 'alternate interior angles', def: 'Interior angles on OPPOSITE sides of the transversal: $(a_4, a_6)$ and $(a_3, a_5)$. Equal when the lines are parallel \u2014 the Z-pattern, I.29; their equality also CERTIFIES parallelism, I.27.' },
        { term: 'alternate exterior angles', def: 'Exterior angles on opposite sides of the transversal: $(a_1, a_7)$ and $(a_2, a_8)$. Equal when the lines are parallel; a parallelism certificate via one vertical step.' },
        { term: 'co-interior angles', def: 'Interior angles on the SAME side of the transversal: $(a_4, a_5)$ and $(a_3, a_6)$, also called same-side interior. They SUM to $180^\\circ$ when the lines are parallel \u2014 the C-pattern; never equal unless both are $90^\\circ$.' },
        { term: 'co-exterior angles', def: 'Exterior angles on the same side of the transversal: $(a_1, a_8)$ and $(a_2, a_7)$, summing to $180^\\circ$ under parallelism.' },
        { term: 'vertically opposite angles', def: 'Angles opposite each other at one vertex: $(a_1, a_3)$, $(a_2, a_4)$ at $P$ and $(a_5, a_7)$, $(a_6, a_8)$ at $Q$. Always equal \u2014 Lesson 2.1, no parallel postulate needed.' },
        { term: 'linear pair', def: 'Two adjacent angles on a straight line at one vertex; always supplementary (sum $180^\\circ$). Eight such pairs live in the census, four at each vertex.' },
        { term: 'the converse direction', def: 'From angles to parallels: alternate equal (I.27), corresponding equal or co-interior supplementary (I.28) each FORCE the lines to be parallel \u2014 proved without the fifth postulate.' },
        { term: 'the forward direction', def: 'From parallels to angles: I.29, the first proposition of the Elements that spends the fifth postulate, buying the equalities and supplements of the census table.' },
        { term: 'the census collapse', def: 'Under parallelism one number determines all eight angles: odds equal $a_1$, evens equal $180^\\circ - a_1$ \u2014 twelve equal pairs and sixteen supplementary pairs out of the twenty-eight pairs in total.' },
        { term: 'position group', def: 'The three pairings of the four positions at a vertex \u2014 vertical (EQUAL), linear across the transversal, linear across the line (both SUM $180^\\circ$) \u2014 each an involution, the composition of any two giving the third: the Klein four-group $V_4$.' },
        { term: 'cross pair', def: 'One of the four unnamed pairs $(a_1, a_6)$, $(a_2, a_5)$, $(a_3, a_8)$, $(a_4, a_7)$: opposite sides of the transversal, one interior and one exterior. Under parallelism each sums to $180^\\circ$; demanding their equality forces $90^\\circ$.' },
      ],
    },
    {
      kind: 'formula',
      name: 'Corresponding angles (the F)',
      latex: 'm \\parallel n \\ \\Rightarrow\\ a_1 = a_5,\\ a_2 = a_6,\\ a_3 = a_7,\\ a_4 = a_8',
      note: 'same position at the two vertices; the forward direction is I.29, and the converse certificate is I.28',
    },
    {
      kind: 'formula',
      name: 'Alternate angles (the Z)',
      latex: 'm \\parallel n \\ \\Rightarrow\\ a_4 = a_6,\\ a_3 = a_5;\\quad a_3 = a_5 \\ \\Rightarrow\\ m \\parallel n',
      note: 'interior version shown; the exterior pairs a1 = a7, a2 = a8 behave the same \u2014 equality forward, certificate converse',
    },
    {
      kind: 'formula',
      name: 'Co-interior angles (the C)',
      latex: 'm \\parallel n \\ \\Rightarrow\\ a_4 + a_5 = 180^\\circ,\\ a_3 + a_6 = 180^\\circ',
      note: 'same-side interior angles SUPPLEMENT, they do not equal; the converse certificate is I.28\u2019s second clause',
    },
    {
      kind: 'formula',
      name: 'The census collapse',
      latex: 'a_1 = a_3 = a_5 = a_7,\\qquad a_2 = a_4 = a_6 = a_8 = 180^\\circ - a_1',
      note: 'one measurement buys all eight angles \u2014 drill it at 65\u00b0, 37.5\u00b0, 112.75\u00b0, 90\u00b0',
    },
    {
      kind: 'formula',
      name: 'The zigzag equation',
      latex: '\\alpha + x + \\beta = 180^\\circ',
      note: 'outer angles transported to the meeting point B on the middle parallel sit with x along a straight line',
    },

    /* -------------------------------------------------------------- */
    /* 10. quiz                                                       */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ at $P$ and $Q$ under the label law. Given $a_1 = 65^\\circ$, the angle $a_6$ equals \u2014',
          options: [
            '65\u00b0, because a1 and a6 sit in matching corners, so they are corresponding and equal',
            '25\u00b0, because a6 is the complement of a1',
            '115\u00b0, because a3 = a1 = 65\u00b0 (vertical at P) and a3 + a6 = 180\u00b0 (co-interior), so a6 = 115\u00b0',
            '155\u00b0, because a6 is a1 short of a full half-turn on the other side',
          ],
          answer: 2,
          explain: 'The census pins $a_6$ two ways: $a_3 = a_1 = 65^\\circ$ vertically at $P$, then $a_3 + a_6 = 180^\\circ$ co-interior on the right, so $a_6 = 115^\\circ$; equally $a_6 = a_2 = 180^\\circ - a_1$ by corresponding. Option (a) is the classic trap: $a_1$ (upper left at $P$) and $a_6$ (upper right at $Q$) are NOT corresponding \u2014 corresponding means the SAME position, and $a_1$\u2019s partner is $a_5$; the pair $(a_1, a_6)$ is one of the four unnamed cross pairs, which supplement. Option (b) invents a complement where the census deals in supplements \u2014 $90^\\circ$ appears nowhere in this configuration. Option (d) is arithmetic noise: $180^\\circ - 25^\\circ$ has no licensed source, and no family pays out 155\u00b0 here.',
        },
        {
          q: 'Which of the following pairs, under the label law, is a pair of ALTERNATE INTERIOR angles?',
          options: [
            'a4 and a6, because they are the interior angles on opposite sides of the transversal',
            'a1 and a5, because they occupy the same position at the two vertices',
            'a3 and a6, because they are the interior angles on the same side of the transversal',
            'a1 and a7, because they are exterior angles on opposite sides of the transversal',
          ],
          answer: 0,
          explain: 'Alternate interior = both angles INSIDE the strip AND on OPPOSITE sides of $t$: at $P$ the interior pair is $a_3$ (right) and $a_4$ (left); at $Q$ it is $a_5$ (left) and $a_6$ (right). Opposite sides pair them as $(a_4, a_6)$ and $(a_3, a_5)$ \u2014 the Z. Option (b) is the corresponding pair, same position at different vertices \u2014 the F, not the Z. Option (c) is the co-interior pair on the right \u2014 same side, not opposite; it supplements, it does not equal. Option (d) is the alternate EXTERIOR pair \u2014 right idea, wrong side of the strip.',
        },
        {
          q: 'The fifth postulate makes its FIRST appearance in Euclid\u2019s Book I at \u2014',
          options: [
            'Proposition I.27, the alternate-angle converse',
            'Proposition I.28, the corresponding and co-interior converses',
            'the definition of a transversal at the head of Book I',
            'Proposition I.29, the forward direction: parallels buy the angle equalities',
          ],
          answer: 3,
          explain: 'Euclid proves twenty-eight propositions before spending the fifth postulate; I.29 \u2014 a transversal falling on parallels makes alternate angles equal \u2014 is the watershed, and nearly all of the rest of Book I depends on it. Option (a) and option (b) are precisely the propositions that get by WITHOUT the postulate: the converse direction is free. Option (c) has the direction of dependence backwards: definitions never spend postulates \u2014 they only fix vocabulary. The exam-shaped moral: citing \u201ccorresponding angles\u201d from given parallels spends I.29 and the postulate; citing \u201calternate equal, hence parallel\u201d spends nothing.',
        },
        {
          q: 'Three parallel lines are cut by two transversals meeting at a point $B$ on the middle parallel; the outer marked angles are $50^\\circ$ and $60^\\circ$. The angle $x$ between the transversals at $B$ equals \u2014',
          options: [
            '110\u00b0, because angles round a point sum to 360\u00b0',
            '70\u00b0, because the outer angles transport to B and 50\u00b0 + x + 60\u00b0 = 180\u00b0 along the straight middle line',
            '55\u00b0, because x is the average of the two outer angles',
            '120\u00b0, because x is the supplement of the smaller outer angle twice over',
          ],
          answer: 1,
          explain: 'Transport each outer angle along its own transversal to $B$ as a corresponding copy (the parallels license this, I.29); at $B$ the transported $50^\\circ$, the gap $x$ and the transported $60^\\circ$ lie side by side along the straight line through $B$, so $50^\\circ + x + 60^\\circ = 180^\\circ$ and $x = 70^\\circ$. Option (a) miscounts: only ONE side of the straight line is in play, not the full turn around $B$. Option (c) is pattern-matching without a licence \u2014 averages are not a census family. Option (d) has no licensed source; the supplement of $60^\\circ$ is $120^\\circ$, but nothing transports that supplement to the gap between the transversals.',
        },
        {
          q: 'Lines $m$ and $n$ are parallel; the corresponding angles satisfy $a_1 = (2x + 10)^\\circ$ and $a_5 = (3x - 5)^\\circ$. Then \u2014',
          options: [
            'x = 3 and both angles are 16\u00b0',
            'x = 25 and both angles are 60\u00b0',
            'x = 15, and both angles are 40\u00b0',
            'x = 15, and both angles are 50\u00b0',
          ],
          answer: 2,
          explain: 'Corresponding angles under parallelism are equal (the F, I.29), so $2x + 10 = 3x - 5$, giving $x = 15$; substituting, $a_1 = a_5 = 40^\\circ$, and the full census reads 40\u00b0 on the odds and 140\u00b0 on the evens. Option (a) solves a scrambled equation ($2x + 10 = 3x + 5$), which no family licenses. Option (b) solves $2x + 10 = 3x - 15$, again unlicensed. Option (d) gets $x = 15$ right but substitutes carelessly \u2014 $2(15) + 10 = 40$, not $50$; the check \u201cboth angles equal\u201d instantly kills it, since $2(15) + 10 = 40 \\neq 50 = $ nothing. Note the family audit: had the pair been $(a_1, a_6)$, the census would supply the SUM $a_1 + a_6 = 180^\\circ$, not equality \u2014 a different equation entirely.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 11. graded exercises (15, L1–L6, full steps solutions)         */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises \u2014 the eight-angle census',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ at $P$ and $Q$ under the label law. Given $a_1 = 72^\\circ$, write down all eight angles with a reason for each.',
              solution: [
                'Sol. Start at the given vertex: $a_2 = 180^\\circ - 72^\\circ = 108^\\circ$ (linear pair on a straight line at $P$).',
                'Now, the vertical pairing at $P$ pays out: $a_3 = a_1 = 72^\\circ$ and $a_4 = a_2 = 108^\\circ$ (vertically opposite angles).',
                'Transport to $Q$ by corresponding angles (the F, I.29): $a_5 = a_1 = 72^\\circ$, $a_6 = a_2 = 108^\\circ$, $a_7 = a_3 = 72^\\circ$, $a_8 = a_4 = 108^\\circ$.',
                'Check with a second family: co-interior on the left, $a_4 + a_5 = 108^\\circ + 72^\\circ = 180^\\circ$ (the C) \u2014 consistent.',
                'Hence the census reads $72^\\circ, 108^\\circ, 72^\\circ, 108^\\circ, 72^\\circ, 108^\\circ, 72^\\circ, 108^\\circ$: odds all $72^\\circ$, evens all $108^\\circ$.',
              ],
              answer: 'Odds $72^\\circ$, evens $108^\\circ$ \u2014 the census reads 72, 108, 72, 108, 72, 108, 72, 108',
              figures: [
                {
                  caption: 'The census walk at a1 = 72\u00b0: the drill of Exercise 1 drawn \u2014 odds 72, evens 108, each cross-vertex step licensed by the F.',
                  svg: geo23Census({
                    aria: 'Two parallel lines cut by a transversal with all eight angles labelled a1 to a8 and their values 72 or 108 degrees shown beside each label.',
                    subs: ['72\u00b0', '108\u00b0', '72\u00b0', '108\u00b0', '72\u00b0', '108\u00b0', '72\u00b0', '108\u00b0'],
                  }),
                },
              ],
            },
            {
              q: 'Name the family of each pair (parallel lines assumed): (i) $a_3$ and $a_7$; (ii) $a_4$ and $a_6$; (iii) $a_2$ and $a_7$; (iv) $a_5$ and $a_7$; (v) $a_1$ and $a_8$.',
              solution: [
                'Sol. Read positions off the label law: (i) $a_3$ and $a_7$ are both lower-right, at $P$ and at $Q$ \u2014 same position, different vertices: CORRESPONDING (equal).',
                '(ii) $a_4$ (lower-left at $P$) and $a_6$ (upper-right at $Q$) are both interior and on opposite sides of $t$: ALTERNATE INTERIOR (equal, the Z).',
                '(iii) $a_2$ (upper-right at $P$) and $a_7$ (lower-right at $Q$) are both exterior and on the same right side of $t$: CO-EXTERIOR (sum $180^\\circ$).',
                '(iv) $a_5$ and $a_7$ share the vertex $Q$ and sit opposite each other through it: VERTICALLY OPPOSITE (equal).',
                '(v) $a_1$ (upper-left at $P$) and $a_8$ (lower-left at $Q$) are both exterior and on the same left side of $t$: CO-EXTERIOR (sum $180^\\circ$).',
                'Hence: (i) corresponding; (ii) alternate interior; (iii) co-exterior; (iv) vertically opposite; (v) co-exterior.',
              ],
              answer: '(i) corresponding, equal; (ii) alternate interior, equal; (iii) co-exterior, sum 180\u00b0; (iv) vertically opposite, equal; (v) co-exterior, sum 180\u00b0',
            },
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ under the label law. Given $a_6 = 48^\\circ$, find $a_1$ by two different reason-chains.',
              solution: [
                'Sol. Chain 1 (through $Q$ then across): $a_5 = 180^\\circ - a_6 = 180^\\circ - 48^\\circ = 132^\\circ$ (linear pair at $Q$), then $a_1 = a_5 = 132^\\circ$ (corresponding angles, the F).',
                'Chain 2 (all at $P$, after one transport): $a_2 = a_6 = 48^\\circ$ (corresponding), then $a_1 = 180^\\circ - a_2 = 132^\\circ$ (linear pair at $P$).',
                'Check: the pair $(a_1, a_6)$ is one of the four unnamed cross pairs, and the census indeed supplies $a_1 + a_6 = 132^\\circ + 48^\\circ = 180^\\circ$ \u2014 consistent.',
                'Hence $a_1 = 132^\\circ$ by either chain.',
              ],
              answer: '$a_1 = 132^\\circ$ (two chains: linear-then-corresponding, or corresponding-then-linear)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ under the label law. Given $a_4 = 125^\\circ$, find $a_7$ by two different reason-chains.',
              solution: [
                'Sol. Chain 1 (down the left, across the bottom): $a_4$ and $a_8$ are corresponding (both lower-left), so $a_8 = a_4 = 125^\\circ$; then $a_7 = 180^\\circ - a_8 = 55^\\circ$ (linear pair at $Q$).',
                'Chain 2 (across at $P$, down the right): $a_3 = 180^\\circ - a_4 = 55^\\circ$ (linear pair at $P$), then $a_7 = a_3 = 55^\\circ$ (corresponding).',
                'Check with the Z: $a_3$ and $a_5$ \u2014 $a_5 = a_1 = 180^\\circ - a_2 = a_4 = 125^\\circ$, so alternate interior gives $a_5$ versus $a_3$: equal? No \u2014 $a_3 = 55^\\circ$ pairs with $a_5$: they are co-interior on the left with $a_4$, sum $125^\\circ + 55^\\circ = 180^\\circ$ \u2014 consistent.',
                'Hence $a_7 = 55^\\circ$ by either chain.',
              ],
              answer: '$a_7 = 55^\\circ$ (chains: corresponding $a_4 \\to a_8$ then linear; or linear then corresponding $a_3 \\to a_7$)',
            },
            {
              q: 'The engine-verified drill: lines $m$ and $n$ are parallel, and $a_1 = 37.5^\\circ$. Write the full census and say which of the twenty-eight angle pairs are equal.',
              solution: [
                'Sol. Apply the collapse: odds equal $a_1$, evens equal $180^\\circ - a_1$.',
                'Compute the supplement: $180^\\circ - 37.5^\\circ = 142.5^\\circ$.',
                'Hence the census reads $37.5^\\circ, 142.5^\\circ, 37.5^\\circ, 142.5^\\circ, 37.5^\\circ, 142.5^\\circ, 37.5^\\circ, 142.5^\\circ$.',
                'Count the equal pairs: corresponding 4, vertically opposite 4, alternate interior 2, alternate exterior 2 \u2014 twelve equal pairs in all; the other sixteen pairs (8 linear, 2 co-interior, 2 co-exterior, and the 4 unnamed cross pairs) each sum to $180^\\circ$.',
                'So exactly 12 of the 28 pairs are equal here: every odd\u2013odd or even\u2013even pair.',
              ],
              answer: 'Census 37.5\u00b0 (odds) and 142.5\u00b0 (evens); exactly 12 of the 28 pairs are equal \u2014 every odd\u2013odd or even\u2013even pair',
            },
            {
              q: 'A transversal $t$ meets line $m$ at $P$ and line $n$ at $Q$ (label law), and it is GIVEN that $a_4 = 116^\\circ$ and $a_5 = 64^\\circ$. Prove that $m$ and $n$ are parallel, naming the proposition you use.',
              solution: [
                'Sol. Identify the family: $a_4$ and $a_5$ are the co-interior pair on the left of $t$.',
                'Check the sum: $116^\\circ + 64^\\circ = 180^\\circ$ exactly \u2014 the co-interior pair supplements.',
                'Now, cite the certificate: co-interior angles summing to two right angles force the lines to be parallel \u2014 Euclid I.28, second clause; the parallel here is DERIVED, not given.',
                'Reduce to I.27 for the check: $a_3 = 180^\\circ - a_4 = 64^\\circ$ (linear pair at $P$), so $a_3 = a_5 = 64^\\circ$ \u2014 the alternate-interior equality, which is I.27\u2019s hypothesis directly.',
                'Hence $m$ and $n$ are parallel by I.28 (equivalently by I.27 after one linear step) \u2014 no fifth postulate spent.',
              ],
              answer: '$m \\parallel n$ by I.28 (co-interior supplementary), reducible to I.27 via $a_3 = 180^\\circ - 116^\\circ = 64^\\circ = a_5$',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ under the label law. The corresponding angles satisfy $a_2 = (4x - 14)^\\circ$ and $a_6 = (3x + 10)^\\circ$. Find $x$ and the common angle, then write the full census.',
              solution: [
                'Sol. Audit the family first: $a_2$ and $a_6$ are both upper-right \u2014 corresponding (the F) \u2014 so parallels make them EQUAL.',
                'Set up: $4x - 14 = 3x + 10$.',
                'Now, collect: $4x - 3x = 10 + 14$, so $x = 24$.',
                'Substitute: $a_2 = 4(24) - 14 = 82^\\circ$ and $a_6 = 3(24) + 10 = 82^\\circ$ \u2014 equal, as corresponding angles must be.',
                'Hence $x = 24$, both angles $82^\\circ$; the census reads $98^\\circ$ (odds) and $82^\\circ$ (evens).',
              ],
              answer: '$x = 24$ and both angles are $82^\\circ$; census: odds $98^\\circ$, evens $82^\\circ$',
              figures: [
                {
                  caption: 'The x-ladder of Exercise 7: the corresponding pair a2 = (4x \u2212 14)\u00b0 and a6 = (3x + 10)\u00b0 highlighted in orange; the F pays out equality, x = 24, both 82\u00b0.',
                  svg: geo23Census({
                    aria: 'Two parallel lines cut by a transversal with the corresponding angles a2 and a6 highlighted in orange and labelled with the expressions 4x minus 14 degrees and 3x plus 10 degrees.',
                    hl: [1, 5], hlColor: c23.orange,
                    subs: [null, '(4x \u2212 14)\u00b0', null, null, null, '(3x + 10)\u00b0', null, null],
                  }),
                },
              ],
            },
            {
              q: 'Three parallel lines are cut by two transversals meeting at a point $B$ on the middle parallel; the outer marked angles are $42^\\circ$ and $67^\\circ$. Find the angle $x$ between the transversals at $B$.',
              solution: [
                'Sol. Transport the outer angles to $B$: along each transversal, the parallels give an equal corresponding copy of the outer angle at $B$ (the F, I.29).',
                'Now, the middle line is straight through $B$, so the transported $42^\\circ$, the gap $x$ and the transported $67^\\circ$ sit side by side along it: $42^\\circ + x + 67^\\circ = 180^\\circ$.',
                'So, $x = 180^\\circ - 42^\\circ - 67^\\circ = 71^\\circ$.',
                'Check: the vertical copy of $x$ at $B$ is also $71^\\circ$, and the other side of the straight line carries $180^\\circ - 71^\\circ = 109^\\circ$.',
                'Hence $x = 71^\\circ$ \u2014 a one-line straight-angle story, licensed by two corresponding transports.',
              ],
              answer: '$x = 71^\\circ$',
              figures: [
                {
                  caption: 'The zigzag of Exercise 8: outer angles 42\u00b0 and 67\u00b0 transported to B (dashed amber), where 42\u00b0 + x + 67\u00b0 = 180\u00b0 along the middle parallel gives x = 71\u00b0.',
                  svg: geo23Zigzag({
                    aria: 'Three parallel lines cut by two transversals meeting at B on the middle line, outer angles 42 and 67 degrees marked, transported dashed copies at B, and x equal to 71 degrees between the transversals.',
                    aLab: '42\u00b0', bLab: '67\u00b0', xLab: 'x = 71\u00b0', transport: true,
                    note: 'straight angle at B: 42\u00b0 + x + 67\u00b0 = 180\u00b0',
                  }),
                },
              ],
            },
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ under the label law, and the co-interior pair on the left satisfies $a_4 : a_5 = 7 : 2$. Find both angles, and say which of the two is acute.',
              solution: [
                'Sol. Audit the family: $a_4$ and $a_5$ are co-interior (same side, both interior), so they SUM: $a_4 + a_5 = 180^\\circ$.',
                'Split 180 in the ratio 7 : 2 \u2014 nine parts, each $180^\\circ \\div 9 = 20^\\circ$.',
                'So, $a_4 = 7 \\times 20^\\circ = 140^\\circ$ and $a_5 = 2 \\times 20^\\circ = 40^\\circ$.',
                'Check: $140^\\circ + 40^\\circ = 180^\\circ$ \u2014 the C pays out its supplement; and $a_4 = 180^\\circ - a_5$ matches the census collapse with $a_5 = a_1 = 40^\\circ$.',
                'Hence $a_4 = 140^\\circ$ (obtuse) and $a_5 = 40^\\circ$ \u2014 the acute one is $a_5$.',
              ],
              answer: '$a_4 = 140^\\circ$ and $a_5 = 40^\\circ$; the acute angle is $a_5$',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$; the bisector of $a_4$ and the bisector of $a_5$ are drawn. Prove that the two bisectors are perpendicular, and verify numerically at $a_4 = 125^\\circ$.',
              solution: [
                'Sol. Set up: $a_4$ and $a_5$ are co-interior, so $a_4 + a_5 = 180^\\circ$ (the C).',
                'Bisect: the angle between the bisector of $a_4$ and the transversal is $a_4 / 2$; the angle between the bisector of $a_5$ and the transversal (on the same side) is $a_5 / 2$.',
                'Now, the angle between the two bisectors is the sum of those two half-angles: $a_4/2 + a_5/2 = (a_4 + a_5)/2 = 180^\\circ/2 = 90^\\circ$.',
                'Verify at $a_4 = 125^\\circ$: then $a_5 = 55^\\circ$, and the half-angles are $62.5^\\circ$ and $27.5^\\circ$, summing to $62.5^\\circ + 27.5^\\circ = 90^\\circ$.',
                'Hence the bisectors of any co-interior pair are perpendicular \u2014 the co-interior supplement cuts exactly in half.',
              ],
              answer: 'Perpendicular: $a_4/2 + a_5/2 = 90^\\circ$ always; at $a_4 = 125^\\circ$: $62.5^\\circ + 27.5^\\circ = 90^\\circ$',
            },
            {
              q: 'Lines $m$ and $n$ are parallel, cut by transversal $t$ under the label law. Given $a_1 = (3x - 10)^\\circ$ and $a_6 = (2x + 25)^\\circ$, find $x$, $a_1$ and $a_6$. Why is this pair NOT solved by setting the expressions equal?',
              solution: [
                'Sol. Audit the family: $a_1$ is upper-left at $P$; $a_6$ is upper-right at $Q$ \u2014 different positions, one exterior and one interior, on opposite sides of $t$. This is one of the four unnamed CROSS pairs, not a corresponding pair.',
                'Find its verdict: $a_1 = a_5$ (corresponding) and $a_5 + a_6 = 180^\\circ$ (linear at $Q$), so $a_1 + a_6 = 180^\\circ$ \u2014 the cross pair SUPPLEMENTS.',
                'Set up the correct equation: $(3x - 10) + (2x + 25) = 180$, that is, $5x + 15 = 180$.',
                'Now, solve: $5x = 165$, so $x = 33$; then $a_1 = 3(33) - 10 = 89^\\circ$ and $a_6 = 2(33) + 25 = 91^\\circ$.',
                'Check: $89^\\circ + 91^\\circ = 180^\\circ$ \u2014 consistent; and the near-miss to $90^\\circ$ is no accident of algebra, just of the chosen coefficients.',
                'Hence $x = 33$, $a_1 = 89^\\circ$, $a_6 = 91^\\circ$. Setting the expressions equal would claim $a_1 = a_6$, which the census permits only when both are $90^\\circ$ \u2014 an equation the given expressions cannot satisfy.',
              ],
              answer: '$x = 33$, $a_1 = 89^\\circ$, $a_6 = 91^\\circ$ \u2014 the cross pair supplements ($a_1 + a_6 = 180^\\circ$); equality would force both to $90^\\circ$',
            },
            {
              q: 'Direction audit (exam-style). For each statement, say whether proving it spends the fifth postulate, and name the Euclid proposition: (i) parallel lines make a pair of co-interior angles supplementary; (ii) a transversal making co-interior angles supplementary forces the lines parallel; (iii) a transversal making alternate angles equal forces the lines parallel. Verify (ii) numerically at $a_4 = 103.5^\\circ$.',
              solution: [
                'Sol. (i) is the FORWARD direction \u2014 parallels given, angles concluded: this is I.29, and it is exactly where the fifth postulate first appears in the Elements.',
                '(ii) is the CONVERSE \u2014 angles given, parallels concluded: I.28, second clause, proved free of the fifth postulate.',
                '(iii) is also converse: I.27, the alternate-angle converse, likewise postulate-free.',
                'Verify (ii): $a_4 = 103.5^\\circ$ needs $a_5 = 180^\\circ - 103.5^\\circ = 76.5^\\circ$, and indeed $103.5^\\circ + 76.5^\\circ = 180^\\circ$ \u2014 the certificate applies.',
                'Hence only (i) spends the postulate (I.29); (ii) is I.28 and (iii) is I.27, both free \u2014 the forward direction pays, the converse does not.',
              ],
              answer: '(i) spends it \u2014 I.29; (ii) free \u2014 I.28 (verified: $103.5^\\circ + 76.5^\\circ = 180^\\circ$); (iii) free \u2014 I.27',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Reverse zigzag. Three parallel lines are cut by two transversals meeting at a point $B$ on the middle parallel. The angle between the transversals at $B$ is $78^\\circ$, and one outer marked angle is $55^\\circ$. Find the other outer marked angle, and state the size of the angle vertically opposite the $78^\\circ$ one at $B$.',
              solution: [
                'Sol. Transport the known outer angle to $B$ (corresponding copy along its transversal, I.29) and let the other outer angle be $y$.',
                'Now, the straight line at $B$ carries the transported $55^\\circ$, the $78^\\circ$ gap, and the transported $y$: $55^\\circ + 78^\\circ + y = 180^\\circ$.',
                'So, $y = 180^\\circ - 55^\\circ - 78^\\circ = 47^\\circ$.',
                'The angle vertically opposite the $78^\\circ$ gap at $B$ is also $78^\\circ$ (vertically opposite angles); the angles on the other side of the middle line sum to $180^\\circ - 78^\\circ = 102^\\circ$.',
                'Hence the other outer angle is $47^\\circ$ and the vertical copy at $B$ is $78^\\circ$.',
              ],
              answer: 'Other outer angle $47^\\circ$; the vertically opposite angle at $B$ is $78^\\circ$ (other side of the line: $102^\\circ$)',
            },
            {
              q: 'Write out the reduction proof of the F from the Z: assuming ONLY the alternate-interior equality $a_3 = a_5$ and the vertex facts, prove that corresponding angles are equal ($a_1 = a_5$), and witness every step at $a_1 = 65^\\circ$.',
              solution: [
                'Sol. State the tool: vertically opposite angles at one vertex are equal (Lesson 2.1, no postulate).',
                'Apply it at $P$: $a_3 = a_1$, since they sit opposite each other through $P$.',
                'Now, chain with the hypothesis: $a_1 = a_3$ and $a_3 = a_5$ give $a_1 = a_5$ by transitivity \u2014 the corresponding pair is equal, which is I.28\u2019s first certificate.',
                'Witness at $65^\\circ$: the census gives $a_1 = 65^\\circ$, $a_3 = 65^\\circ$, $a_5 = 65^\\circ$ \u2014 the vertical step $a_1 = a_3$ and the given $a_3 = a_5$ both read 65, so $a_1 = a_5 = 65^\\circ$.',
                'Hence the F-certificate follows from the Z-equality plus one vertical step \u2014 route 1 of the reduction graph, postulate-free.',
              ],
              answer: '$a_1 = a_3$ (vertical at $P$) and $a_3 = a_5$ (given Z) give $a_1 = a_5 = 65^\\circ$ at the witness \u2014 the F from the Z',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'A student claims: \u201cif a transversal makes $a_1 = a_6$, then the two lines are parallel.\u201d Refute the claim with an explicit witness, and find the single exceptional value at which the claim accidentally holds.',
              solution: [
                'Sol. Analyse the pair: $(a_1, a_6)$ is a cross pair \u2014 opposite sides of $t$, one exterior, one interior \u2014 and no converse proposition licenses it.',
                'Build the witness: let $a_1 = a_6 = 50^\\circ$ \u2014 two angles, both $50^\\circ$, at the two vertices; nothing forbids this for NON-parallel lines.',
                'Compute the interior sums: $a_3 = a_1 = 50^\\circ$ (vertical at $P$) and $a_4 = a_5 = 130^\\circ$ (linear pairs), so the right-side interior sum is $a_3 + a_6 = 50^\\circ + 50^\\circ = 100^\\circ < 180^\\circ$.',
                'Now, apply the meeting criterion of Lesson 2.2: an interior sum strictly below $180^\\circ$ on a side forces the lines to MEET on that side \u2014 so these lines are not parallel, and the claim fails.',
                'Find the exception: $a_1 = a_6$ combined with the would-be parallel census $a_1 + a_6 = 180^\\circ$ forces $a_1 = a_6 = 90^\\circ$; at exactly $90^\\circ$ the cross pair is also alternate-interior-equal, and I.27 does give parallelism.',
                'Hence the claim is refuted at $a_1 = a_6 = 50^\\circ$ (interior sum $100^\\circ < 180^\\circ$: the lines meet); the only value at which it holds is $90^\\circ$.',
              ],
              answer: 'Refuted: at $a_1 = a_6 = 50^\\circ$ the interior sum $a_3 + a_6 = 100^\\circ < 180^\\circ$, so the lines meet; the claim holds only at the exceptional value $90^\\circ$',
            },
          ],
        },
      ],
    },
  ],
}

/* ================================================================== */
/* lesson 2.4 — from docs/research/geo-ch02-wip/part-geo204.ts            */
/* ================================================================== */
/* ------------------------------------------------------------------ */
/* vivid palette + font (BOOK_FORMAT vivid table — warm hues only)     */
/* ------------------------------------------------------------------ */
const c24 = {
  ink: '#166534', // primary text — rich green ink
  mid: '#65a30d', // mid text — bright lime
  teal: '#0d9488', // captions, light strokes, secondary structure
  tealInk: '#0f766e', // teal ink text
  amber: '#d97706', // connectors, ticks, operand text
  orange: '#ea580c', // accent — arrows, highlights, key values
  red: '#dc2626', // refusal / negative verdict
  green: '#16a34a', // structure strokes — boxes, axes, node circles
  panel: '#fef3c7', // amber tinted fill
  panel2: '#ffedd5', // orange tinted fill
  sep: '#fcd34d', // light separators
  faint: '#5eead4', // faint dots, unpicked borders
  white: '#ffffff',
  paper: '#fffdf5',
}
const f24 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

/* ------------------------------------------------------------------ */
/* geo24 SVG helpers (plain text only — no $, minus is U+2212)         */
/* Every arc, vertex and label below is COMPUTED from coordinates —    */
/* nothing in any figure is eyeballed.                                 */
/* ------------------------------------------------------------------ */
const geo24Txt = (
  x: number, y: number, s: string,
  size = 13, color = c24.ink, anchor = 'middle', weight = '600',
): string =>
  `<text x="${x}" y="${y}" font-family="${f24}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`

const geo24Line = (
  x1: number, y1: number, x2: number, y2: number,
  color = c24.ink, w = 2.5, dash = '',
): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo24Circle = (
  cx: number, cy: number, r: number, color = c24.ink, w = 2.5, fill = 'none',
): string =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${color}" stroke-width="${w}"/>`

const geo24Dot = (x: number, y: number, color = c24.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`

const geo24Rect = (
  x: number, y: number, w: number, h: number,
  fill: string, stroke: string, rx = 9,
): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`

const geo24Head = (x: number, y: number, deg: number, color: string, s = 9): string => {
  const a = (deg * Math.PI) / 180
  const u = [Math.cos(a), Math.sin(a)]
  const v = [-u[1], u[0]]
  const p1 = [x - u[0] * s + v[0] * s * 0.6, y - u[1] * s + v[1] * s * 0.6]
  const p2 = [x - u[0] * s - v[0] * s * 0.6, y - u[1] * s - v[1] * s * 0.6]
  return `<polygon points="${x},${y} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`
}

const geo24Arrow = (
  x1: number, y1: number, x2: number, y2: number, color = c24.amber, w = 2,
): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return (
    geo24Line(x1, y1, x2, y2, color, w) + geo24Head(x2, y2, a, color, 8)
  )
}

const geo24Svg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${Array.isArray(body) ? body.join('') : body}</svg>`

type PT = [number, number]

/** computed angle (degrees) at vertex V between rays V→P1 and V→P2 */
const geo24Ang = (V: PT, P1: PT, P2: PT): number => {
  const u = [P1[0] - V[0], P1[1] - V[1]]
  const w = [P2[0] - V[0], P2[1] - V[1]]
  const cr = u[0] * w[1] - u[1] * w[0]
  const dot = u[0] * w[0] + u[1] * w[1]
  return (Math.abs(Math.atan2(cr, dot)) * 180) / Math.PI
}

/** computed angle-arc path + optional arrowhead + optional label at the bisector */
const geo24AngleArc = (
  V: PT, P1: PT, P2: PT, r: number, color = c24.ink, w = 2,
  label = '', labelColor = '', arrowEnd = false, lr = 16,
): string => {
  let a1 = (Math.atan2(P1[1] - V[1], P1[0] - V[0]) * 180) / Math.PI
  let a2 = (Math.atan2(P2[1] - V[1], P2[0] - V[0]) * 180) / Math.PI
  let d = (a2 - a1 + 360) % 360
  if (d > 180) { const t = a1; a1 = a2; a2 = t; d = 360 - d }
  const p = (a: number, rad: number): PT => [V[0] + rad * Math.cos((a * Math.PI) / 180), V[1] + rad * Math.sin((a * Math.PI) / 180)]
  const [x1, y1] = p(a1, r)
  const [x2, y2] = p(a2, r)
  let out = `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${w}"/>`
  if (arrowEnd) out += geo24Head(x2, y2, a2 + 90, color, 7)
  if (label) {
    const [lx, ly] = p(a1 + d / 2, r + lr)
    out += geo24Txt(lx, ly + 4, label, 12.5, labelColor || color, 'middle', '700')
  }
  return out
}

/** apex A of the triangle on base B→C with base angles beta (at B) and gamma (at C), degrees */
const geo24Apex = (B: PT, C: PT, beta: number, gamma: number): PT => {
  const db: PT = [Math.cos((beta * Math.PI) / 180), -Math.sin((beta * Math.PI) / 180)]
  const dc: PT = [Math.cos(((180 - gamma) * Math.PI) / 180), -Math.sin(((180 - gamma) * Math.PI) / 180)]
  const rhs = C[0] - B[0]
  const t = rhs / (db[0] - dc[0])
  return [B[0] + t * db[0], B[1] + t * db[1]]
}

/** vertices of a regular n-gon on a circle (screen angles, deg) */
const geo24RegPoly = (cx: number, cy: number, n: number, R: number, rot = -90): PT[] =>
  Array.from({ length: n }, (_, i): PT => {
    const a = ((rot + (360 * i) / n) * Math.PI) / 180
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)]
  })

const geo24Poly = (pts: PT[], color = c24.green, w = 2.5, dash = '', fill = 'none'): string =>
  `<polygon points="${pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}" fill="${fill}" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

const geo24PathPts = (pts: PT[], color = c24.green, w = 2.5, dash = '', fill = 'none'): string =>
  `<path d="M ${pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L ')}${fill !== 'none' ? ' Z' : ''}" fill="${fill}" stroke="${color}" stroke-width="${w}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`

/** orthographic sphere projection, tilt 18° — world (x east, y toward viewer, z up) */
const geo24SPX = 380, geo24SPY = 300, geo24SPR = 190
const geo24Sph = (wx: number, wy: number, wz: number): PT => {
  const t = (18 * Math.PI) / 180
  const u = wx
  const v = -wy * Math.sin(t) + wz * Math.cos(t)
  return [geo24SPX + u, geo24SPY - v]
}
const geo24SphPt = (lam: number, s: number): PT => {
  const L = (lam * Math.PI) / 180, S = (s * Math.PI) / 180
  return geo24Sph(geo24SPR * Math.cos(L) * Math.cos(S), geo24SPR * Math.sin(L) * Math.cos(S), geo24SPR * Math.sin(S))
}
const geo24EqPt = (t: number): PT => {
  const T = (t * Math.PI) / 180
  return geo24Sph(geo24SPR * Math.cos(T), geo24SPR * Math.sin(T), 0)
}

/** the octant sphere figure (body variant: angles; solution variant: Girard area) */
const geo24OctantSphere = (withArea: boolean): string => {
  const tau = (18 * Math.PI) / 180
  const parts: string[] = []
  // sphere + axis
  parts.push(geo24Circle(geo24SPX, geo24SPY, geo24SPR, c24.green, 3))
  const N = geo24SphPt(45, 90), S = geo24SphPt(45, -90)
  parts.push(geo24Line(N[0], N[1], S[0], S[1], c24.faint, 1.6, '5,6'))
  // equator: front (t 0..180) solid, back dashed
  const front: PT[] = [], back: PT[] = []
  for (let t = 0; t <= 180; t += 4) front.push(geo24EqPt(t))
  for (let t = 180; t <= 360; t += 4) back.push(geo24EqPt(t))
  parts.push(geo24PathPts(back, c24.teal, 1.6, '5,6'))
  parts.push(geo24PathPts(front, c24.teal, 2.4))
  // octant region: N -> meridian 135 down to E2 -> equator 135..45 -> meridian 45 up to N
  const region: PT[] = []
  for (let s = 90; s >= 0; s -= 4) region.push(geo24SphPt(135, s))
  for (let t = 135; t >= 45; t -= 4) region.push(geo24EqPt(t))
  for (let s = 0; s <= 90; s += 4) region.push(geo24SphPt(45, s))
  parts.push(geo24PathPts(region, c24.orange, 2.6, '', c24.panel))
  // meridians 45 and 135: solid above the visibility horizon, dashed below
  for (const lam of [45, 135]) {
    const a = Math.sin((lam * Math.PI) / 180) * Math.cos(tau)
    const b = Math.sin(tau)
    const sStar = (-((Math.atan2(a, b) * 180) / Math.PI))
    const vis: PT[] = [], hid: PT[] = []
    for (let s = 90; s >= -90; s -= 4) (s >= sStar ? vis : hid).push(geo24SphPt(lam, s))
    parts.push(geo24PathPts(hid, c24.amber, 1.6, '5,6'))
    parts.push(geo24PathPts(vis, c24.amber, 2.6))
  }
  const E1 = geo24EqPt(45), E2 = geo24EqPt(135)
  // right-angle markers (small computed squares along the tangent directions)
  const mark = (V: PT, t1: PT, t2: PT): string => {
    const q = (t: PT): PT => [t[0] / Math.hypot(t[0], t[1]), t[1] / Math.hypot(t[0], t[1])]
    const u = q(t1), v = q(t2), k = 17
    const p1: PT = [V[0] + k * u[0], V[1] + k * u[1]]
    const p2: PT = [V[0] + k * (u[0] + v[0]), V[1] + k * (u[1] + v[1])]
    const p3: PT = [V[0] + k * v[0], V[1] + k * v[1]]
    return geo24PathPts([p1, p2, p3], c24.red, 2.2)
  }
  // at N: tangents toward E1 (meridian 45) and E2 (meridian 135)
  const mTan = (lam: number): PT => {
    const L = (lam * Math.PI) / 180
    const du = -Math.cos(L), dv = Math.sin(L) * Math.sin(tau)
    return [du, -dv] // toward decreasing s (down from the pole)
  }
  parts.push(mark(N, mTan(45), mTan(135)))
  parts.push(geo24Txt(N[0], N[1] + 42, '90°', 12.5, c24.red, 'middle', '700'))
  // at E1: toward N (up the meridian) and toward E2 (along the equator, increasing t)
  const eqTan = (t: number): PT => {
    const T = (t * Math.PI) / 180
    return [-Math.sin(T), Math.cos(T) * Math.sin(tau)]
  }
  parts.push(mark(E1, [0, -Math.cos(tau)], eqTan(45)))
  parts.push(geo24Txt(E1[0] - 46, E1[1] - 14, '90°', 12.5, c24.red, 'middle', '700'))
  parts.push(mark(E2, [0, -Math.cos(tau)], [eqTan(135)[0], -eqTan(135)[1]]))
  parts.push(geo24Txt(E2[0] + 46, E2[1] - 14, '90°', 12.5, c24.red, 'middle', '700'))
  // labels
  parts.push(geo24Txt(N[0], N[1] - 12, 'N', 13, c24.ink, 'middle', '700'))
  parts.push(geo24Txt(S[0], S[1] + 20, 'S', 12.5, c24.tealInk, 'middle', '700'))
  parts.push(geo24Txt(E1[0] + 20, E1[1] + 18, 'E1', 12.5, c24.ink, 'middle', '700'))
  parts.push(geo24Txt(E2[0] - 20, E2[1] + 18, 'E2', 12.5, c24.ink, 'middle', '700'))
  parts.push(geo24Txt(geo24SPX, geo24SPY + geo24SPR * Math.sin(tau) + 22, 'equator', 12, c24.tealInk))
  parts.push(geo24Txt(geo24SPX - geo24SPR * 0.72, geo24SPY - geo24SPR * 0.86, 'meridian', 11.5, c24.amber, 'middle', '600'))
  if (withArea) {
    parts.push(geo24Txt(geo24SPX, geo24SPY + 152, 'octant area = (π/2)·R² with R = 10', 13, c24.orange, 'middle', '700'))
    parts.push(geo24Txt(geo24SPX, geo24SPY + 176, '= 50π ≈ 157.0796 = one eighth of 4πR²', 13, c24.ink, 'middle', '700'))
    parts.push(geo24Txt(geo24SPX, geo24SPY + 200, 'sum = 270°, excess = 90°', 12.5, c24.tealInk, 'middle', '700'))
  } else {
    parts.push(geo24Txt(geo24SPX, geo24SPY + 152, 'three right angles: sum = 270°', 13.5, c24.orange, 'middle', '700'))
    parts.push(geo24Txt(geo24SPX, geo24SPY + 178, 'spherical excess = 270° − 180° = 90°', 13, c24.ink, 'middle', '700'))
    parts.push(geo24Txt(geo24SPX, geo24SPY + 202, 'hyperbolic triangles: sum < 180°', 12, c24.tealInk, 'middle', '600'))
  }
  return geo24Svg(760, 560, withArea
    ? 'The octant triangle on a sphere with its area computed by Girard: one eighth of the surface, 50 pi for radius 10.'
    : 'The octant triangle on a sphere: north pole and two equator points ninety degrees apart, with three right angles marked.', parts)
}

/* ================================================================== */
/* LESSON 2.4 — Angle Sum of a Triangle and Its Consequences           */
/* ================================================================== */
export const lessonGeo204: Lesson = {
  id: 'geo-angle-sum-of-a-triangle-and-its-consequences',
  number: '2.4',
  title: 'Angle Sum of a Triangle and Its Consequences',
  concepts: [
    'angle sum property',
    'exterior angle',
    'remote interior angles',
    'interior angle sum of a polygon',
    'exterior angle sum',
    'spherical excess',
    'triangle classification',
  ],
  objectives: [
    'Reproduce the proof of Euclid I.32 — the 180° angle sum — naming every licence it uses, above all the one parallel line through the vertex',
    'State and apply the exterior angle theorem: the exterior angle equals the sum of the two remote interior angles, and exceeds each of them',
    'Classify triangles as acute, right or obtuse, and explain why a triangle can carry at most one non-acute angle',
    'Compute interior and exterior angle sums of any convex polygon by dissection and by the walk-around, including the honest decimals for the regular 7-gon and 11-gon',
    'Solve regular-polygon problems as two-equation systems built on interior + exterior = 180',
    'Describe the octant triangle on a sphere, compute its spherical excess, and explain why the 180° sum and the parallel postulate stand or fall together',
  ],
  prerequisites: [
    'geo-incidence-how-points-lines-and-planes-interlock',
    'geo-angles-types-pairs-and-measures',
    'geo-parallel-lines-and-the-fifth-postulate',
    'geo-the-transversal-the-eight-angle-census',
  ],
  sources: ['geo-euclid-elements', 'geo-ch02-web-ground'],
  blocks: [
    /* -------------------------------------------------------------- */
    /* 1. opening motivation                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The theorem you have used all your life' },
    {
      kind: 'para',
      text: 'You have used it since your first geometry lesson, probably without once being asked to justify it: the three angles of a triangle add up to $180^\\circ$. Teachers state it, exams assume it, carpenters measure with it, navigators triangulate with it. And yet for the first two lessons of this chapter it has been sitting in front of you like an unpaid bill. The angles of a triangle live at three different vertices, formed by three different pairs of lines — nothing in the arithmetic of 2.1, nothing in the incidence facts of 1.4, says anything about how angles at DIFFERENT vertices compare. To add angles that live in different places, something must CARRY them to one place. This lesson names the carrier, and the carrier is a parallel line.',
    },
    {
      kind: 'para',
      text: 'Everything since 2.1 converges here. Lesson 2.1 built the arithmetic of a single vertex: complements, supplements, the straight angle of $180^\\circ$, linear pairs that feed it. Lesson 2.2 told the story of the fifth postulate and gave us Playfair\'s form: through a point not on a line, exactly ONE parallel to that line. Lesson 2.3 built the eight-angle census: when a transversal crosses two parallel lines, corresponding angles are equal, alternate interiors are equal, co-interiors sum to $180^\\circ$ — and we were scrupulously honest about which direction of that census costs the fifth postulate (the forward direction is Euclid I.29, the postulate\'s first appearance in the Elements) and which converses are fifth-free. The angle sum of a triangle is what all of that machinery was FOR. Euclid proves it as Proposition I.32, the summit of the first third of Book I, and everything after it in the Elements leans on it.',
    },
    {
      kind: 'para',
      text: 'Here is the entire proof in one sentence, so you can watch how short it is: through the top vertex of the triangle draw the line parallel to the base, and the triangle\'s two base angles are carried up to the top vertex as alternate interior angles, where they line up next to the top angle along a straight line worth $180^\\circ$. One new line, two census readings, one straight angle — done. The earning of $a + b + c = 180^\\circ$ takes exactly one parallel line, and that is not an accident: we shall end the lesson by showing that on a sphere, where parallels do not exist, triangles genuinely have angle sums ABOVE $180^\\circ$, and in the hyperbolic plane, where parallels abound, the sums fall BELOW it. The theorem you have always used is not a universal truth about space — it is a PRECISE PORTRAIT of the Euclidean choice. That is why it was worth earning honestly.',
    },
    {
      kind: 'para',
      text: 'The plan of the lesson follows the consequences outward. First the proof itself, licence by licence — the chapter\'s centrepiece. Then the exterior angle theorem, which is I.32\'s second half and the single most useful inequality in school geometry. Then the classification census of acute, right and obtuse triangles, which the sum law settles in one sweep. Then polygons: the dissection that turns a convex $n$-gon into $n - 2$ triangles, the walk-around that turns one lap into $360^\\circ$, and the regular-polygon tables with their honest decimals. The last door is the non-Euclidean one — the octant triangle with three right angles on the sphere you live on — and the deep equivalence, proved in chapter 11, that the $180^\\circ$ angle sum and the parallel postulate are two names for one assumption. As always, every number, sweep and witness in this lesson was recomputed by engine before a word of prose was written; where the engine and intuition disagree, the engine wins.',
    },
    /* -------------------------------------------------------------- */
    /* 2. THE proof — Euclid I.32                                     */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The proof: Euclid I.32, licence by licence' },
    {
      kind: 'para',
      text: 'Let the triangle be $ABC$, and let us aim the proof at the vertex $A$: we want the three angles $a = \\angle BAC$, $b = \\angle ABC$ and $c = \\angle BCA$ gathered at ONE point, so that 2.1\'s arithmetic can add them. The plan is to build, at $A$, a straight line on which the three angles sit side by side. Draw the line $\\ell$ through $A$ parallel to $BC$. Two licences make this legitimate. EXISTENCE: Playfair\'s axiom (2.2) guarantees, through the point $A$ off the line $BC$, exactly one line parallel to $BC$. CONSTRUCTION: actually drawing that parallel with ruler and compass is a job for chapter 8\'s construction toolkit — the copy-an-angle machine — and we name the debt here rather than pretend to pay it. For the proof we only need the line to EXIST, and Playfair vouches for that.',
    },
    {
      kind: 'para',
      text: 'Now the line $\\ell$ plays the upper line and $BC$ plays the lower line of 2.3\'s census, and the triangle\'s two sides become TRANSVERSALS. The side $AB$ crosses $\\ell$ at $A$ and $BC$ at $B$; the side $AC$ crosses $\\ell$ at $A$ and $BC$ at $C$. Read each transversal with the census. On transversal $AB$, the triangle\'s angle $b$ at $B$ is the upper-right interior angle at the lower line — the $a_6$ position — so the census hands us the alternate interior angle at the upper line: the angle between the ray $A\\!\\to\\!B$ and the LEFTWARD ray of $\\ell$. Alternate interiors under parallel lines are equal — the $a_4 = a_6$ licence, Euclid I.29 — so that angle at $A$ is exactly $b$. On transversal $AC$ the same reading carries $c$ across: the angle $c$ at $C$ is the $a_5$ position, and its alternate interior partner at $A$ — between the ray $A\\!\\to\\!C$ and the RIGHTWARD ray of $\\ell$ — is exactly $c$, by the $a_3 = a_5$ licence. The census has now delivered both base angles to the vertex $A$, and it delivered them for free, because 2.3 already paid for I.29.',
    },
    {
      kind: 'callout',
      tone: 'theorem',
      title: 'Theorem (Euclid I.32, first half) — the angle sum property',
      text: 'In any triangle, the three interior angles sum to two right angles: $a + b + c = 180^\\circ$. The proof uses one parallel line through a vertex, the alternate-interior equality of the transversal census (I.29 — the fifth postulate\'s first consequence), and the straight angle of 2.1. Nothing else.',
    },
    {
      kind: 'derivation',
      title: 'The proof of I.32 — one parallel line, two census readings, one straight angle',
      statement: 'Claim: for triangle $ABC$ with angles $a$ at $A$, $b$ at $B$, $c$ at $C$, we have $a + b + c = 180^\\circ$. Every licence used is named at the moment it is used.',
      steps: [
        { label: 'Draw the one new line', formula: '\\ell \\text{ through } A,\\ \\ell \\parallel BC', explanation: 'Existence is Playfair\'s axiom from 2.2: through the point $A$, not on line $BC$, there is exactly one line parallel to $BC$. The ruler-and-compass construction of $\\ell$ rides chapter 8; the proof needs only existence.' },
        { label: 'Read transversal AB', formula: 'a_4 = a_6 \\Rightarrow \\text{carried } b \\text{ at } A', explanation: 'The side $AB$ meets the parallels $\\ell$ (above) and $BC$ (below). The triangle\'s angle $b$ sits in the $a_6$ position at $B$; by I.29 (2.3\'s census — the licence that costs the fifth postulate), the alternate interior angle at $A$, between ray $A\\!\\to\\!B$ and the leftward ray of $\\ell$, equals $b$.' },
        { label: 'Read transversal AC', formula: 'a_3 = a_5 \\Rightarrow \\text{carried } c \\text{ at } A', explanation: 'The side $AC$ is the second transversal. The triangle\'s angle $c$ sits in the $a_5$ position at $C$; the same alternate-interior licence (I.29) makes the angle between ray $A\\!\\to\\!C$ and the rightward ray of $\\ell$ equal to $c$.' },
        { label: 'Line the three angles up on the straight line', formula: 'b + a + c \\text{ along } \\ell', explanation: 'At the point $A$ on the line $\\ell$, going from the leftward ray to the rightward ray, we pass exactly three angles in order: the carried copy of $b$, then the triangle\'s own angle $a$ between the rays $A\\!\\to\\!B$ and $A\\!\\to\\!C$, then the carried copy of $c$. These three fill the straight angle with no gaps and no overlap.' },
        { label: 'Invoke the straight angle of 2.1', formula: 'b + a + c = 180^\\circ', explanation: 'A straight angle measures $180^\\circ$ — two right angles — by 2.1\'s definition of the degree and the straight line. The left side is exactly that straight angle, now decomposed. The sum is earned.' },
      ],
      result: '$a + b + c = 180^\\circ$ — the angle sum of a triangle, Euclid I.32: one parallel line (Playfair), two alternate-interior carries (I.29), one straight angle (2.1).',
    },
    {
      kind: 'figure',
      caption: 'The proof of I.32 in one picture. Through the vertex $A$ runs the line $\\ell$ parallel to $BC$ (existence: Playfair; the drawn chevrons mark the parallel pair). The census carries the angle $b$ from $B$ up to $A$ along transversal $AB$ — alternate interiors, the $a_4 = a_6$ licence — and carries $c$ from $C$ up to $A$ along transversal $AC$ ($a_3 = a_5$). At $A$ the three angles $b$, $a$, $c$ now sit side by side along $\\ell$, filling the dashed $180^\\circ$ straight-angle brace. Every arc in this figure is computed from the drawn coordinates.',
      svg: (() => {
        const A: PT = [320, 250], B: PT = [150, 470], C: PT = [560, 470]
        const L: PT = [90, 250], R: PT = [670, 250]
        const parts: string[] = []
        // the parallel pair, marked with chevrons
        parts.push(geo24Line(L[0], L[1], R[0], R[1], c24.ink, 3))
        parts.push(geo24Line(B[0], B[1], C[0], C[1], c24.ink, 3))
        for (const x of [600, 620]) {
          parts.push(geo24Line(x, 243, x + 10, 250, c24.amber, 2.2))
          parts.push(geo24Line(x, 257, x + 10, 250, c24.amber, 2.2))
          parts.push(geo24Line(x, 463, x + 10, 470, c24.amber, 2.2))
          parts.push(geo24Line(x, 477, x + 10, 470, c24.amber, 2.2))
        }
        parts.push(geo24Txt(70, 240, 'ℓ', 14, c24.tealInk, 'middle', '700'))
        // the triangle
        parts.push(geo24Poly([A, B, C], c24.green, 3, '', c24.paper))
        // straight-angle brace (computed semicircle below A, radius 96)
        parts.push(geo24AngleArc(A, R, L, 96, c24.orange, 2.2, '', '', false, 0))
        parts.push(geo24Txt(A[0], A[1] + 128, '180°', 13, c24.orange, 'middle', '700'))
        // carried angles at A (radius 58) + the triangle's own angle a (radius 40)
        parts.push(geo24AngleArc(A, L, B, 58, c24.amber, 2.6, 'b', c24.amber))
        parts.push(geo24AngleArc(A, B, C, 40, c24.green, 2.6, 'a', c24.green))
        parts.push(geo24AngleArc(A, C, R, 58, c24.teal, 2.6, 'c', c24.teal))
        // the original base angles at B and C (matching colours)
        parts.push(geo24AngleArc(B, C, A, 42, c24.amber, 2.6, 'b', c24.amber))
        parts.push(geo24AngleArc(C, A, B, 42, c24.teal, 2.6, 'c', c24.teal))
        // vertices
        parts.push(geo24Dot(A[0], A[1], c24.ink), geo24Dot(B[0], B[1], c24.ink), geo24Dot(C[0], C[1], c24.ink))
        parts.push(geo24Txt(A[0], A[1] - 14, 'A', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(B[0] - 16, B[1] + 22, 'B', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(C[0] + 16, C[1] + 22, 'C', 13.5, c24.ink, 'middle', '700'))
        return geo24Svg(760, 520, 'Euclid I.32: triangle ABC with the parallel line through A; the base angles b and c are carried to A as alternate interior angles and line up with a along the straight angle of 180 degrees.', parts)
      })(),
    },
    {
      kind: 'callout',
      tone: 'historical',
      title: 'Historical note — the theorem behind two millennia of measuring',
      text: 'Euclid proved I.32 around 300 BCE, and the result had already been used for surveying in Egypt and Babylon long before it was proved — the Rhind-era rope-stretchers worked with triangle arithmetic empirically. What Euclid added was the CERTIFICATE: from that point on, every triangulation from land survey to stellar parallax rested on a licensed argument rather than a habit. The theorem also closed a circle that had opened with Thales, who reportedly measured pyramid heights from shadows using similar triangles. When 19th-century surveyors triangulated entire countries, and when GPS receivers today fix position from satellite geometry, the ledger balancing every network of triangles is still this one: each triangle contributes exactly $180^\circ$, each error in the field must cancel somewhere, and the parallel postulate is quietly vouching for every degree.',
    },
    {
      kind: 'para',
      text: 'Pause on how CHEAP the proof is — one line, two census readings — and on how EXPENSIVE its one input is. The only step in the chain that the last twenty-three centuries argued about is the quiet first one: the parallel line through $A$. Euclid himself never draws attention to it, but his fifth postulate is exactly what licenses I.29, and I.29 is what carries both base angles up to the top. Strip the fifth postulate away and the proof collapses at step two; keep it and the triangle\'s angle sum is forced. We return to this at the end of the lesson, because it is the hinge on which the whole non-Euclidean door swings: on a sphere, where the parallel simply does not exist, the proof fails AND the conclusion fails — the octant triangle really does have $270^\\circ$ in it. The theorem and the postulate live and die together, and chapter 11 proves that equivalence properly.',
    },
    {
      kind: 'para',
      text: 'One more habit worth installing now, before the consequences start flowing: when a problem hands you two angles of a triangle, the third is not "probably" determined — it is EXACTLY determined, by subtraction. And when a problem hands you three angles that CLAIM to be a triangle, the claim is testable: they must sum to $180^\\circ$ AND each must be strictly between $0^\\circ$ and $180^\\circ$. The degenerate case deserves its own honesty. Three collinear points — say $P$, $Q$, $R$ on one line with $Q$ between — do bound a "flat triangle" of angles $180^\\circ$, $0^\\circ$, $0^\\circ$: the sum still reads $180^\\circ$, which is exactly why the sum alone cannot certify triangularity. The angle-sum law is a theorem about triangles; a triangle is a figure with three POSITIVE angles, and the engine\'s sweeps in this lesson run over positive angles only. When an exam wants to trap you with a fake triangle, the trap is almost always a zero or negative "angle" hiding inside a sum that looks right.',
    },
    {
      kind: 'example',
      title: 'Re-perform the proof walk on the triangle with angles $62^\\circ$ and $54^\\circ$ at $B$ and $C$',
      steps: [
        'Sol. The triangle has $b = 62^\\circ$ at $B$ and $c = 54^\\circ$ at $C$; the angle $a$ at $A$ is what the walk must produce.',
        'Draw $\\ell$ through $A$ parallel to $BC$ — Playfair licenses exactly one such line.',
        'Carry $b$ up transversal $AB$: the alternate interior angle at $A$, on the far side of $AB$, is $62^\\circ$ (the $a_4 = a_6$ licence).',
        'Carry $c$ up transversal $AC$: the alternate interior angle at $A$, on the far side of $AC$, is $54^\\circ$ (the $a_3 = a_5$ licence).',
        'Now, the three angles at $A$ line up along the straight line $\\ell$: $62^\\circ + a + 54^\\circ = 180^\\circ$.',
        'Hence $a = 180^\\circ - 62^\\circ - 54^\\circ = 64^\\circ$ — the same subtraction the sum law sells you, but watched happening on the parallel line itself.',
      ],
    },
    /* -------------------------------------------------------------- */
    /* 3. the exterior angle                                          */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The exterior angle: the sum law in action' },
    {
      kind: 'para',
      text: 'Extend one side of the triangle past a vertex, and a new angle appears outside the figure. In triangle $ABC$, extend side $BC$ past $C$ to a point $D$: the angle $ACD$ — between the ray $C\\!\\to\\!A$ and the ray $C\\!\\to\\!D$ — is the EXTERIOR angle at $C$. Its study is I.32\'s second half, and it converts the sum law from a ledger identity into a working tool, because the exterior angle is equal to the SUM of the two remote interior angles — the angles at the vertices the extension does not touch. In our labels: $\\angle ACD = a + b$. The proof is two lines long, and one of them is 2.1.',
    },
    {
      kind: 'callout',
      tone: 'definition',
      title: 'Exterior angle and remote interior angles',
      text: 'An exterior angle of a triangle at a vertex is the angle between one side of the triangle and the EXTENSION of the other side past that vertex. The two interior angles at the OTHER two vertices are called the remote interior angles of that exterior angle. Thus, if side $BC$ is extended past $C$, the exterior angle is $\\angle ACD$, and its remote interior angles are $a$ at $A$ and $b$ at $B$.',
    },
    {
      kind: 'derivation',
      title: 'The exterior angle equals the sum of its remote interior angles',
      statement: 'Claim: in triangle $ABC$ with side $BC$ extended past $C$ to $D$, the exterior angle $\\angle ACD$ equals $a + b$, the sum of the two remote interior angles.',
      steps: [
        { label: 'The linear pair at C', formula: '\\angle ACD + c = 180^\\circ', explanation: 'The ray $C\\!\\to\\!B$ and the ray $C\\!\\to\\!D$ point in opposite directions along one straight line, so the interior angle $c$ and the exterior angle $\\angle ACD$ form a linear pair — 2.1\'s supplement arithmetic.' },
        { label: 'The angle sum at work', formula: 'a + b + c = 180^\\circ', explanation: 'The three interior angles sum to $180^\\circ$ — Euclid I.32, just proved. This is the step that costs the fifth postulate.' },
        { label: 'Subtract', formula: '\\angle ACD = 180^\\circ - c = a + b', explanation: 'Both right-hand quantities equal $180^\\circ - c$: the linear pair supplies one, the sum law rearranged supplies the other. The exterior angle is exactly the sum of the two remote interiors.' },
        { label: 'The inequality falls out for free', formula: 'a + b > a \\text{ and } a + b > b', explanation: 'Because every angle of a genuine triangle is positive, $b > 0$ makes $a + b > a$, and $a > 0$ makes $a + b > b$: the exterior angle EXCEEDS each remote interior angle, strictly.' },
      ],
      result: 'Exterior angle $=$ sum of remote interiors: $\\angle ACD = a + b$, and strictly $\\angle ACD > a$, $\\angle ACD > b$ — the two-line consequence of I.32 plus a linear pair.',
    },
    {
      kind: 'formula',
      name: 'Exterior angle of a triangle',
      latex: '\\angle ACD = a + b',
      note: 'the exterior angle equals the SUM of the two remote interior angles; it exceeds each of them strictly',
    },
    {
      kind: 'figure',
      caption: 'The exterior angle and its remote-sum ledger. Side $BC$ is extended past $C$ to $D$; the exterior angle $\\angle ACD = 108^\\circ$ (orange arc) is bracketed against the two remote interior angles $47^\\circ$ at $A$ and $61^\\circ$ at $B$ (amber brace below): $47^\\circ + 61^\\circ = 108^\\circ$. At $C$ itself, the interior angle $72^\\circ$ and the exterior $108^\\circ$ form the linear pair $72^\\circ + 108^\\circ = 180^\\circ$. The triangle is constructed FROM the angles $61^\\circ$ and $72^\\circ$, so every arc and label is computed, not eyeballed.',
      svg: (() => {
        const B: PT = [150, 400], C: PT = [450, 400]
        const A: PT = geo24Apex(B, C, 61, 72)
        const D: PT = [640, 400]
        const parts: string[] = []
        parts.push(geo24Line(B[0], B[1], D[0], D[1], c24.ink, 3))
        parts.push(geo24Head(D[0], D[1], 0, c24.ink, 9))
        parts.push(geo24Poly([A, B, C], c24.green, 3, '', c24.paper))
        parts.push(geo24AngleArc(C, A, D, 54, c24.orange, 3, '108°', c24.orange))
        parts.push(geo24AngleArc(C, B, A, 36, c24.green, 2.6, '72°', c24.green))
        parts.push(geo24AngleArc(B, C, A, 42, c24.amber, 2.6, '61°', c24.amber))
        parts.push(geo24AngleArc(A, B, C, 40, c24.teal, 2.6, '47°', c24.teal))
        parts.push(geo24Dot(A[0], A[1]), geo24Dot(B[0], B[1]), geo24Dot(C[0], C[1]), geo24Dot(D[0], D[1]))
        parts.push(geo24Txt(A[0], A[1] - 14, 'A', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(B[0] - 16, B[1] + 24, 'B', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(C[0], C[1] + 24, 'C', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(D[0] + 12, D[1] - 8, 'D', 13.5, c24.ink, 'middle', '700'))
        // remote-sum brace: drop lines from A and B, bracket, ledger
        parts.push(geo24Line(A[0], A[1] + 10, A[0], 452, c24.teal, 1.6, '5,6'))
        parts.push(geo24Line(B[0], B[1] + 10, B[0], 452, c24.teal, 1.6, '5,6'))
        parts.push(geo24Line(B[0], 452, A[0], 452, c24.amber, 2.2))
        parts.push(geo24Line(B[0], 446, B[0], 458, c24.amber, 2.2))
        parts.push(geo24Line(A[0], 446, A[0], 458, c24.amber, 2.2))
        parts.push(geo24Txt((A[0] + B[0]) / 2, 476, 'remote interiors: 47° + 61° = 108°', 13, c24.amber, 'middle', '700'))
        parts.push(geo24Txt(560, 452, '72° + 108° = 180°', 12.5, c24.tealInk, 'middle', '700'))
        return geo24Svg(760, 500, 'Triangle ABC with side BC extended past C to D; the exterior angle 108 degrees at C equals the sum of the remote interior angles 47 and 61, bracketed below; the linear pair 72 plus 108 equals 180.', parts)
      })(),
    },
    {
      kind: 'para',
      text: 'The engine swept this claim the way it sweeps every claim: over ALL of them. For every positive integer pair $(a, b)$ with $a + b < 180$ — that is $15{,}931$ pairs — the exterior angle $180^\\circ - c$ (where $c = 180^\\circ - a - b$) equals $a + b$ exactly, and exceeds both $a$ and $b$ strictly. There is no exception to find, and now you know why: the equality is two lines of algebra on top of I.32, and the strict inequality is nothing more than the positivity of the third angle. Which raises a question the 2.3 discipline trained you to ask: WHICH of these two facts — the equality and the inequality — actually needs the fifth postulate?',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Note — which results cost the postulate',
      text: 'Euclid proves the INEQUALITY (the exterior angle exceeds each remote interior) as Proposition I.16, well before he ever touches the fifth postulate — the Elements first uses the postulate at I.29, and the ground-truth register of 2.2 confirms the ordering: $16 < 29 < 32$. The inequality survives in geometries without parallels. The EQUALITY (exterior $=$ remote sum) is I.32, sits after I.29, and dies with the fifth postulate: on a sphere the exterior angle of the octant triangle is genuinely SMALLER than the sum of its remote interiors. The 2.3 discipline — name the price of every theorem — applies to the last digit of this chapter exactly as it applied to the first.',
    },
    {
      kind: 'para',
      text: 'Why should anyone care about a result that follows in two lines? Because the exterior-angle equality is where the sum law becomes a HUNTING tool. When a diagram shows an angle OUTSIDE a triangle touching two remote angles inside, the equality converts the outside angle into the sum of the insides — no parallel line needs to be drawn, because the parallel line that proved the theorem is not part of USING it. Conversely, when two of the three entries are known, the third is a subtraction away. Competitive papers lean on this constantly: the exterior angle is the "free" angle of a diagram, computable from rooms it never enters. The exercises below include several of these hunts, and the next two sections build the two biggest generalisations of the sum law — to every classification question about triangles, and to every polygon in the plane.',
    },
    /* -------------------------------------------------------------- */
    /* 4. the classification census                                   */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The classification census: acute, right, obtuse' },
    {
      kind: 'para',
      text: 'Triangles come in three temperaments, sorted by their LARGEST angle. If all three angles are below $90^\\circ$, the triangle is ACUTE. If one angle is exactly $90^\\circ$, it is RIGHT. If one angle exceeds $90^\\circ$, it is OBTUSE. The angle-sum law immediately answers the counting question hiding inside this definition: how many non-acute angles can one triangle carry? Suppose two of them did — say angles of $91^\\circ$ and $95^\\circ$. Their sum alone is $186^\\circ$, already past $180^\\circ$, leaving the third angle at $180^\\circ - 186^\\circ = -6^\\circ$: not a number an angle can be. The engine states it as a positive sweep: over all $15{,}931$ positive integer triples $(a, b, c)$ with $a + b + c = 180$, at most one of the three ever reaches $90^\\circ$ or more. A triangle has AT MOST ONE non-acute angle — one right angle or one obtuse angle, never two, never a right angle beside an obtuse one.',
    },
    {
      kind: 'table',
      caption: 'The classification census — engine-swept witnesses',
      head: ['Class', 'Witness (angles in degrees)', 'Largest angle', 'Engine verdict'],
      rows: [
        ['obtuse', '$100, 40, 40$', '100', 'exactly one non-acute angle — the census allows it'],
        ['right', '$90, 62, 28$', '90', 'one right angle; the other two sum to 90'],
        ['acute', '$61, 60, 59$', '61', 'all three below 90 — the census is silent about acutes'],
      ],
    },
    {
      kind: 'para',
      text: 'The right triangle earns its own line, because its arithmetic rings a bell from the very first lesson of this chapter. If one angle is $90^\\circ$, the sum law forces the other two to sum to $90^\\circ$ — and 2.1 gave that sum a name: the two acute angles of a right triangle are COMPLEMENTARY. Lesson 2.1\'s complement arithmetic, learned for angles sharing a vertex, turns out to govern the two far corners of a right triangle as well — the right angle at the big vertex is quietly "eating" the $90^\\circ$ that the other two would need to reach a straight line. So the chapter opens and closes on the same number: $90^\\circ$ at a single vertex in 2.1, $90^\\circ$ split between two vertices here. One more census line completes the symmetry: the two acute angles of a right triangle can be ANY positive pair summing to $90^\\circ$ — the engine swept $a = 1$ to $89$ — and every such pair really occurs.',
    },
    {
      kind: 'callout',
      tone: 'warn',
      title: 'Caution — the sum law certifies nothing about sides',
      text: 'The classification census is a census of ANGLES. Knowing the angles $(61, 60, 59)$ tells you the triangle is acute, and nothing whatever about whether it is equilateral, isosceles or scalene — a $(70, 70, 40)$ triangle is isosceles AND acute, a $(30, 30, 120)$ triangle is isosceles AND obtuse, and a $(45, 45, 90)$ triangle is both isosceles and right. Side classification (chapter 3\'s business, where congruence begins) and angle classification are independent sorting keys. Exams love to shuffle them: "an isosceles triangle must be acute" is FALSE — witness $(30, 30, 120)$.',
    },
    /* -------------------------------------------------------------- */
    /* 5. polygon sums by dissection                                  */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Polygon sums by dissection' },
    {
      kind: 'para',
      text: 'The sum law earns its keep the moment we leave triangles behind. Take any CONVEX polygon — a polygon whose every interior angle is below $180^\\circ$, so that it bulges outward everywhere and any segment joining two of its points stays inside — and pick ONE vertex. From that vertex, draw every possible diagonal to the non-adjacent vertices: for an $n$-gon that is $n - 3$ diagonals, and they carve the polygon into $n - 2$ triangles that tile it with no gaps and no overlap. Every angle of every piece is borrowed from the polygon\'s own angles — the dissection cuts THROUGH vertices only at the chosen one, never through an interior angle elsewhere — so the polygon\'s interior angle sum is just the sum of its triangles\' angle sums: $(n - 2) \\cdot 180^\\circ$. The pentagon makes the counting visible: $5 - 3 = 2$ diagonals from one vertex, $5 - 2 = 3$ triangles, $3 \\cdot 180^\\circ = 540^\\circ$.',
    },
    {
      kind: 'derivation',
      title: 'Interior angle sum of a convex n-gon by dissection',
      statement: 'Claim: a convex polygon with $n$ sides has interior angle sum $(n - 2) \\cdot 180^\\circ$. The proof dissects the polygon into triangles from one vertex and counts.',
      steps: [
        { label: 'Count the diagonals from one vertex', formula: 'n - 3 \\text{ diagonals}', explanation: 'From the chosen vertex, a diagonal may run to every vertex except itself and its two neighbours: $n - 3$ targets, each giving one diagonal. In the pentagon: $2$.' },
        { label: 'Count the triangles', formula: 'n - 2 \\text{ triangles}', explanation: 'The $n - 3$ diagonals split the polygon into $n - 2$ triangular pieces: one new piece per diagonal, plus the first. In the pentagon: $3$ triangles — check it on the figure below.' },
        { label: 'Verify the tiling is angle-honest', formula: '\\sum(\\text{polygon angles}) = \\sum(\\text{triangle angles})', explanation: 'Each diagonal starts at the chosen vertex, so no interior angle of the polygon is ever cut in two; every triangle angle is a whole slice of a polygon angle, and every polygon angle is reassembled from its slices. Convexity keeps all diagonals inside.' },
        { label: 'Apply the sum law to each triangle', formula: '(n - 2) \\cdot 180^\\circ', explanation: 'Each of the $n - 2$ triangles contributes $180^\\circ$ by I.32, and the contributions add to the polygon\'s total. For $n = 3$ the formula returns the sum law itself — the triangle IS the base case.' },
      ],
      result: 'Interior sum of a convex $n$-gon $= (n - 2) \\cdot 180^\\circ$ — the triangle sum, batch-produced by dissection; $n - 3$ diagonals from one vertex, $n - 2$ triangles in the ledger.',
    },
    {
      kind: 'formula',
      name: 'Interior angle sum of a polygon',
      latex: 'S_{\\text{interior}} = (n - 2) \\cdot 180^\\circ',
      note: 'holds for every CONVEX n-gon; the dissection from one vertex gives n − 2 triangles',
    },
    {
      kind: 'table',
      caption: 'The pinned polygon ledger, n = 3 to 12 — every entry engine-swept',
      head: ['$n$', 'diagonals from one vertex', 'triangles', 'interior sum (degrees)'],
      rows: [
        ['3', '0', '1', '180'],
        ['4', '1', '2', '360'],
        ['5', '2', '3', '540'],
        ['6', '3', '4', '720'],
        ['7', '4', '5', '900'],
        ['8', '5', '6', '1080'],
        ['9', '6', '7', '1260'],
        ['10', '7', '8', '1440'],
        ['11', '8', '9', '1620'],
        ['12', '9', '10', '1800'],
      ],
    },
    {
      kind: 'figure',
      caption: 'The pentagon ledger and the walk-around. LEFT reading: from vertex $A$ the two diagonals $AC$ and $AD$ dissect the pentagon into three triangles (tinted), each contributing $180^\\circ$: the interior ledger reads $3 \\times 180^\\circ = 540^\\circ$. RIGHT reading: walk the boundary keeping the interior on your left, and at each vertex you TURN through the exterior angle — the small orange turning arcs; for the regular pentagon each turn is $72^\\circ$, and one full lap of ANY convex polygon turns you exactly $360^\\circ$. The same $360^\\circ$ is forced by algebra: five linear pairs give $540^\\circ + (\\text{exterior sum}) = 5 \\cdot 180^\\circ$, so the exterior sum is $360^\\circ$.',
      svg: (() => {
        const cx = 320, cy = 290, R = 140
        const V = geo24RegPoly(cx, cy, 5, R, -90)
        const [A, B, C, D, E] = V
        const parts: string[] = []
        // three dissected triangles, tinted
        parts.push(geo24Poly([A, B, C], c24.green, 1.4, '', c24.panel))
        parts.push(geo24Poly([A, C, D], c24.green, 1.4, '', c24.panel2))
        parts.push(geo24Poly([A, D, E], c24.green, 1.4, '', c24.paper))
        parts.push(geo24Poly(V, c24.green, 3))
        parts.push(geo24Line(A[0], A[1], C[0], C[1], c24.amber, 2.4))
        parts.push(geo24Line(A[0], A[1], D[0], D[1], c24.amber, 2.4))
        // 180 labels at the three centroids
        const cen = (p: PT[]): PT => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length]
        const g1 = cen([A, B, C]), g2 = cen([A, C, D]), g3 = cen([A, D, E])
        parts.push(geo24Txt(g1[0] + 16, g1[1], '180°', 12.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(g2[0], g2[1] + 6, '180°', 12.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(g3[0] - 16, g3[1], '180°', 12.5, c24.ink, 'middle', '700'))
        // walk-around turning arcs at each vertex (exterior angle, computed)
        for (let i = 0; i < 5; i++) {
          const Vi = V[i], Vp = V[(i + 4) % 5], Vn = V[(i + 1) % 5]
          const ux = Vi[0] - Vp[0], uy = Vi[1] - Vp[1]
          const ul = Math.hypot(ux, uy)
          const Pext: PT = [Vi[0] + (34 * ux) / ul, Vi[1] + (34 * uy) / ul]
          parts.push(geo24AngleArc(Vi, Pext, Vn, 24, c24.orange, 2.2, '', '', true, 12))
        }
        parts.push(geo24Txt(V[0][0], V[0][1] - 46, '72°', 12, c24.orange, 'middle', '700'))
        parts.push(geo24Txt(V[2][0] + 42, V[2][1] + 16, '72°', 12, c24.orange, 'middle', '700'))
        // vertices + labels
        const labs = ['A', 'B', 'C', 'D', 'E']
        const off: PT[] = [[0, -20], [22, -8], [24, 18], [-24, 18], [-22, -8]]
        for (let i = 0; i < 5; i++) {
          parts.push(geo24Dot(V[i][0], V[i][1], c24.ink, 4.2))
          parts.push(geo24Txt(V[i][0] + off[i][0], V[i][1] + off[i][1] + 14, labs[i], 13, c24.ink, 'middle', '700'))
        }
        parts.push(geo24Txt(cx, 468, 'interior ledger: 3 × 180° = 540°', 13.5, c24.ink, 'middle', '700'))
        parts.push(geo24Txt(cx, 496, 'walk-around: 5 × 72° = 360°', 13.5, c24.orange, 'middle', '700'))
        return geo24Svg(640, 520, 'A regular pentagon dissected from vertex A into three triangles each labelled 180 degrees, with exterior-angle turning arcs of 72 degrees at each vertex; the interior ledger 540 and the walk-around 360 noted below.', parts)
      })(),
    },
    {
      kind: 'para',
      text: 'The walk-around deserves its own derivation, because it is the second, deeper reading of the exterior angle sum — the reading that survives even when the polygon is not regular, and the one a navigator or a robot would give. Walk the boundary of any convex polygon, keeping the interior on your left. At each vertex you TURN LEFT by exactly the exterior angle — the supplement of the interior angle there. When you arrive back at your starting point, facing your starting direction, you have turned through one full revolution: $360^\\circ$. The algebra agrees: $n$ linear pairs give $\\text{interior sum} + \\text{exterior sum} = n \\cdot 180^\\circ$, and substituting the interior sum $(n - 2) \\cdot 180^\\circ$ leaves the exterior sum exactly $360^\\circ$, for every $n$.',
    },
    {
      kind: 'derivation',
      title: 'The exterior-angle sum is 360 degrees for every convex polygon',
      statement: 'Claim: taking one exterior angle at each vertex of a convex $n$-gon, the exterior angles sum to $360^\\circ$, independent of $n$. Two proofs — the turning reading and the linear-pair algebra.',
      steps: [
        { label: 'The turning reading', formula: '\\sum \\text{turns} = 360^\\circ', explanation: 'Walk the boundary with the interior on your left. Each vertex contributes one left turn equal to its exterior angle; a closed lap returns you to your starting heading, and the total heading change of one lap is one full revolution.' },
        { label: 'The linear-pair algebra', formula: '\\text{interior}_i + \\text{exterior}_i = 180^\\circ', explanation: 'At each vertex the interior and exterior angle form a linear pair — 2.1 again. Summing over all $n$ vertices: total interior + total exterior $= n \\cdot 180^\\circ$.' },
        { label: 'Substitute the dissection sum', formula: '(n - 2) \\cdot 180^\\circ + \\text{exterior sum} = n \\cdot 180^\\circ', explanation: 'The interior total is $(n - 2) \\cdot 180^\\circ$ by the dissection just proved. The $n$ cancels on the right: the exterior sum cannot depend on the count of vertices.' },
        { label: 'Conclude', formula: '\\text{exterior sum} = 360^\\circ', explanation: 'One lap, one revolution: the walk-around total is $360^\\circ$ for the triangle, the hectogon, and everything between. The engine checked the identity for $n = 3$ to $12$.' },
      ],
      result: 'Exterior-angle sum $= 360^\\circ$ for EVERY convex polygon — the turning reading, confirmed by the linear-pair algebra; the number $n$ drops out entirely.',
    },
    {
      kind: 'formula',
      name: 'Exterior angle sum of a convex polygon',
      latex: '\\sum_{i=1}^{n} \\text{exterior}_i = 360^\\circ',
      note: 'one exterior angle per vertex, taken in the same walk direction; independent of n — one lap is one revolution',
    },
    {
      kind: 'example',
      title: 'A pentagon ledger: four interior angles $130^\\circ$, $108^\\circ$, $112^\\circ$, $95^\\circ$ — find the fifth',
      steps: [
        'Sol. The pentagon has $n = 5$ sides, so the interior ledger holds $(5 - 2) \\cdot 180^\\circ = 540^\\circ$.',
        'Add the four given angles: $130^\\circ + 108^\\circ + 112^\\circ + 95^\\circ = 445^\\circ$.',
        'Subtract from the ledger: the fifth angle is $540^\\circ - 445^\\circ = 95^\\circ$.',
        'Check convexity and honesty: $95^\\circ$ is strictly between $0^\\circ$ and $180^\\circ$, and so is every given angle — the answer is a genuine convex pentagon angle, and the engine confirmed $445 + 95 = 540$.',
        'Hence the fifth interior angle is $95^\\circ$ — the dissection ledger spent, one subtraction.',
      ],
    },
    /* -------------------------------------------------------------- */
    /* 6. regular polygons                                            */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Regular polygons and the honest decimals' },
    {
      kind: 'para',
      text: 'A polygon is REGULAR when all its sides are equal and all its angles are equal — the equilateral triangle and the square are the first two. For a regular $n$-gon the two ledger theorems turn into single-division facts, because $n$ equal interior angles must share the interior sum equally and $n$ equal exterior angles must share $360^\\circ$ equally: each interior angle is $\\frac{(n - 2) \\cdot 180^\\circ}{n}$ and each exterior angle is $\\frac{360^\\circ}{n}$. Note the pleasant cross-check: the two formulas agree through the linear pair, since $\\frac{(n-2) \\cdot 180}{n} = 180 - \\frac{360}{n}$ — the interior is the exterior\'s supplement, vertex by vertex, as it must be.',
    },
    {
      kind: 'table',
      caption: 'Regular-polygon angles — every entry engine-swept; interiors for n = 3, 4, 5, 6, 8, 9, 10, 12 and exteriors for n = 3, 5, 6, 8, 9, 10, 12',
      head: ['$n$', 'name', 'interior angle (degrees)', 'exterior angle (degrees)'],
      rows: [
        ['3', 'equilateral triangle', '60', '120'],
        ['4', 'square', '90', '—'],
        ['5', 'regular pentagon', '108', '72'],
        ['6', 'regular hexagon', '120', '60'],
        ['8', 'regular octagon', '135', '45'],
        ['9', 'regular nonagon', '140', '40'],
        ['10', 'regular decagon', '144', '36'],
        ['12', 'regular dodecagon', '150', '30'],
      ],
    },
    {
      kind: 'para',
      text: 'Two rows of that table are deliberately missing, and their absence is the most instructive thing in the section. The regular $7$-gon (the heptagon) and the regular $11$-gon (the hendecagon) have interior angles $\\frac{900^\\circ}{7}$ and $\\frac{1620^\\circ}{11}$ — and neither fraction is a whole number of degrees. This book does not round what it can compute, so we print both faces of each number, exact fraction beside honest decimal: the heptagon\'s interior angle is $\\frac{900}{7} = 128\\frac{4}{7} \\approx 128.571429^\\circ$ (six decimal places), and the hendecagon\'s is $\\frac{1620}{11} = 147\\frac{3}{11} \\approx 147.272727^\\circ$. The engine audited the round trips: seven copies of $128.571429$ miss $900$ by less than one part in a hundred thousand, and eleven copies of $147.272727$ miss $1620$ the same way — the decimals are honest to their stated precision, and the fractions beside them are exact forever. When an exam asks for the interior angle of a regular heptagon, give the fraction; the decimal is a courtesy, not the answer.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Note — the two-equation system every regular-polygon problem solves',
      text: 'Nearly every regular-polygon question in examinations is the same two-equation system in costume. Equation one is the linear pair: $i + e = 180^\\circ$, interior plus exterior at any vertex. Equation two is whatever the problem hands you — the interior is five times the exterior, or the exterior is $24^\\circ$, or the interior is $165^\\circ$. Solve the two-line system, then recover $n$ from the exterior: $n = \\frac{360^\\circ}{e}$, which must come out a whole number greater than 2 — the built-in check that catches arithmetic slips. If your $n$ is not an integer, you have made an error, because no regular polygon exists for fractional $n$.',
    },
    {
      kind: 'example',
      title: 'A regular-polygon system: the interior angle is triple the exterior angle — which polygon is it?',
      steps: [
        'Sol. Set up the two-equation system: the linear pair gives $i + e = 180^\\circ$, and the problem\'s condition gives $i = 3e$.',
        'Substitute: $3e + e = 180^\\circ$, so $4e = 180^\\circ$ and $e = 45^\\circ$.',
        'Recover the interior: $i = 180^\\circ - 45^\\circ = 135^\\circ$.',
        'Recover the count: $n = \\frac{360^\\circ}{45^\\circ} = 8$ — an integer, so the check passes.',
        'Hence the polygon is the regular octagon, with interior angles $135^\\circ$ and exterior angles $45^\\circ$ — matching the engine-swept table row for $n = 8$.',
      ],
    },
    {
      kind: 'formula',
      name: 'Regular polygon angles',
      latex: 'i = \\frac{(n - 2) \\cdot 180^\\circ}{n}, \\qquad e = \\frac{360^\\circ}{n}',
      note: 'equal angles share the ledgers equally; the two agree through the linear pair i + e = 180',
    },
    /* -------------------------------------------------------------- */
    /* 7. the non-Euclidean door                                      */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'The non-Euclidean door: when the sum is not 180' },
    {
      kind: 'para',
      text: 'Everything in this lesson so far rests on the one line the proof drew through the vertex, and that line exists because of the parallel postulate. It is time to show that the dependence is REAL — not an artefact of the proof but a property of the theorem — by exhibiting a world where the line cannot be drawn and the sum genuinely differs. You are standing on one. On a sphere, the "lines" — the curves of shortest travel, the great circles — all meet: every two great circles intersect in a pair of antipodal points, so through a point not on a great circle there are ZERO parallels to it. That is the first column of 2.2\'s census (Euclid $1$, sphere $0$, hyperbolic $\\infty$), and it means Playfair fails and the proof of I.32 cannot even begin.',
    },
    {
      kind: 'para',
      text: 'Here is the pinned construction, the smallest honest counterexample in the subject. Take the north pole $N$, and take two points $E_1$ and $E_2$ on the equator, a quarter of the way around from each other — $90^\\circ$ of longitude apart. The three great-circle arcs $N E_1$, $N E_2$ and the equatorial arc $E_1 E_2$ bound a triangle: one eighth of the sphere\'s surface, called the OCTANT. Now measure its angles. At $E_1$: the meridian arc strikes the equator at a right angle — meridians run due north-south, the equator runs due east-west, and the engine verified the perpendicularity as an honest dot product of the two tangent directions. At $E_2$, identically: $90^\\circ$. At $N$: the two meridians differ by $90^\\circ$ of longitude, and the engine verified their tangent directions at the pole are perpendicular as well. The octant has THREE RIGHT ANGLES: its angle sum is $270^\\circ$, and its spherical excess — the amount by which the sum exceeds $180^\\circ$ — is $90^\\circ$.',
    },
    {
      kind: 'figure',
      caption: 'The octant triangle. The north pole $N$ and the equator points $E_1$, $E_2$, ninety degrees of longitude apart, bound a triangle of three right angles (red square marks, each computed from the tangent directions): sum $= 270^\\circ$, spherical excess $= 90^\\circ$. The sphere is drawn in honest orthographic projection tilted $18^\\circ$ — every meridian, the equator, the visible and hidden halves, and the three right-angle markers are computed from the projection, not sketched. On the sphere the proof of I.32 cannot start: no parallel to the equator through $N$ exists, because every great circle meets the equator.',
      svg: geo24OctantSphere(false),
    },
    {
      kind: 'para',
      text: 'The excess is not a curiosity — it is the heartbeat of a whole geometry. On a sphere of any size, a triangle\'s angles sum to MORE than $180^\\circ$, and the excess $E = (a + b + c) - 180^\\circ$ is proportional to the triangle\'s area (Girard\'s theorem; the constant is such that the octant, one eighth of the whole surface, carries exactly $90^\\circ$ of excess — the engine cross-checked both routes). Small spherical triangles have small excess, which is why surveyors working on town-sized patches can pretend they live on Euclid\'s plane and get away with it. In the hyperbolic plane — the geometry with INFINITELY many parallels through a point, the third column of 2.2\'s census — the inequality flips: every triangle\'s angles sum to LESS than $180^\\circ$, with a DEFICIT that grows with area. Between them, the three geometries sweep the field: sum exactly $180^\\circ$ in Euclid\'s, more on the sphere, less in the hyperbolic world.',
    },
    {
      kind: 'callout',
      tone: 'insight',
      title: 'Note — the equivalence, named honestly',
      text: 'The deepest fact on this street, and the reason the fifth postulate was worth two thousand years of argument: the Euclidean angle sum $180^\\circ$ and the parallel postulate are EQUIVALENT. In one direction you have watched it — the postulate proves the sum (I.32). In the other direction, if every triangle has angle sum $180^\\circ$, then the parallel postulate follows: the octant shows the contrapositive in action, for on the sphere the sum fails and so do the parallels. The full proof — both directions, in clean modern dress — is chapter 11\'s business, and this lesson hands it the machinery: the sum law, the exterior angle theorem, and the octant witness. When you arrive there, remember where the two-thousand-year argument ended: the postulate can never be PROVED from the rest, because worlds exist without it, and in those worlds the angle sum is the first thing to change.',
    },
    {
      kind: 'formula',
      name: 'Spherical excess',
      latex: 'E = (a + b + c) - 180^\\circ',
      note: 'the sphere\'s angle sum exceeds 180 by E; the octant (three right angles) carries E = 90 degrees — hyperbolic triangles instead run a deficit',
    },
    {
      kind: 'formula',
      name: 'Angle sum of a triangle (Euclid I.32)',
      latex: 'a + b + c = 180^\\circ',
      note: 'the chapter\'s payoff theorem: one parallel line through the vertex, two census carries, one straight angle — Euclidean geometry only',
    },
    /* -------------------------------------------------------------- */
    /* 8. exam corner + terms                                         */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'Exam corner: the four standard traps' },
    {
      kind: 'callout',
      tone: 'exam',
      title: 'Exam corner — where this lesson loses marks, and how not to',
      text: 'TRAP ONE, the exterior angle at the WRONG vertex. The exterior angle theorem names the remote interiors — the two angles AWAY from the extended vertex. If side $BC$ is extended past $C$, the exterior angle equals $a + b$ (at $A$ and $B$), NOT $180^\\circ - a$, NOT $a + c$, NOT "the supplement of the far angle". Before writing anything, point at the extension and say which vertex it leaves from. TRAP TWO, the $n - 2$ versus $n$ miscount. The interior sum of an $n$-gon is $(n - 2) \\cdot 180^\\circ$, not $n \\cdot 180^\\circ$; the dissection count is $n - 2$ triangles from $n - 3$ diagonals. Sanity check: the formula must return $180^\\circ$ at $n = 3$. TRAP THREE, the degenerate triangle. Three collinear points give "angles" of $180^\\circ$, $0^\\circ$, $0^\\circ$ — the sum reads $180^\\circ$ and certifies nothing. A triangle needs three POSITIVE angles; if a computed third angle comes out $0^\\circ$ or negative, the figure was never a triangle. TRAP FOUR, forgetting the system. Regular-polygon questions are two equations: $i + e = 180^\\circ$ plus the given condition, then $n = 360^\\circ / e$ as the integer check. Candidates who multiply the interior by $n$ and hope — instead of solving the system — are guessing with extra steps.',
    },
    {
      kind: 'para',
      text: 'A closing word on presentation. When an examiner reads your solution to a triangle-angle problem, the full marks live in the NAMES of the licences, not the arithmetic: "angles on a line sum to $180^\\circ$" (2.1), "alternate interior angles are equal" (I.29), "the exterior angle equals the sum of the remote interiors" (I.32). The numbers are checkable by machine; the licence chain is the mathematics. This lesson has given you four such licences and one centrepiece proof — the next section\'s recap gathers them, and the quiz and exercises below make you use them until the names come without thinking.',
    },
    {
      kind: 'terms',
      items: [
        { term: 'angle sum property', def: 'the three interior angles of any (Euclidean) triangle sum to exactly $180^\\circ$ — Euclid I.32, proved with one parallel line through a vertex.' },
        { term: 'exterior angle', def: 'the angle between one side of a triangle and the extension of another side past their shared vertex; it equals the sum of the two remote interior angles.' },
        { term: 'remote interior angles', def: 'the two interior angles at the vertices NOT touched by a given exterior angle\'s extension.' },
        { term: 'acute, right, obtuse triangle', def: 'classified by the largest angle: all below $90^\\circ$; exactly one equal to $90^\\circ$; exactly one above $90^\\circ$. At most one non-acute angle is possible.' },
        { term: 'complementary acute angles of a right triangle', def: 'the two non-right angles of a right triangle sum to $90^\\circ$ — 2.1\'s complement arithmetic returning at scale.' },
        { term: 'convex polygon', def: 'a polygon whose interior angles are all below $180^\\circ$; every diagonal lies inside it, so the one-vertex dissection is honest.' },
        { term: 'regular polygon', def: 'a polygon with all sides equal and all angles equal; each interior angle is $(n - 2) \\cdot 180^\\circ / n$ and each exterior angle is $360^\\circ / n$.' },
        { term: 'spherical excess', def: 'the amount $E = (a + b + c) - 180^\\circ$ by which a spherical triangle\'s angle sum exceeds $180^\\circ$; the octant triangle carries $E = 90^\\circ$.' },
        { term: 'exterior angle sum (walk-around)', def: 'taking one exterior angle per vertex of any convex polygon, in one walk direction, the total is $360^\\circ$ — one lap is one revolution.' },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 9. quiz                                                        */
    /* -------------------------------------------------------------- */
    {
      kind: 'quiz',
      title: 'Self-check quiz',
      items: [
        {
          q: 'In the proof of I.32, after the line $\\ell$ is drawn through $A$ parallel to $BC$, the angle $b$ at $B$ is carried up to $A$ by which census licence?',
          options: [
            'Corresponding angles: $a_1 = a_5$',
            'alternate interior angles: $a_4 = a_6$, the I.29 licence',
            'Vertically opposite angles: $a_1 = a_3$',
            'Co-interior angles summing to $180^\\circ$',
          ],
          answer: 1,
          explain: 'On transversal $AB$, the triangle\'s angle $b$ occupies the $a_6$ position at $B$ (upper-right interior at the lower line), and its partner at $A$ is the lower-left interior angle $a_4$ — opposite sides of the transversal, both between the parallels: that is the definition of ALTERNATE interior angles, equal by I.29. Option (a) fails: corresponding angles pair same-side same-position angles like $a_1$ with $a_5$; the carried angle sits across the transversal, not in the corresponding position. Option (c) fails: vertical angles need two crossing lines at ONE vertex — $A$ and $B$ are different vertices, so nothing is vertically opposite here. Option (d) fails: co-interior angles are SUPPLEMENTS ($a_3 + a_6 = 180^\\circ$), and using that would give $180^\\circ - b$ at $A$, not $b$ — the sum would then overshoot.',
        },
        {
          q: 'Side $BC$ of triangle $ABC$ is extended past $C$ to $D$. The exterior angle $\\angle ACD$ equals —',
          options: [
            'the interior angle $c$ at $C$',
            '$180^\\circ$ minus the interior angle at $A$',
            'the sum of the interior angle at $C$ and the interior angle at $A$',
            'the sum of the two remote interior angles $a + b$',
          ],
          answer: 3,
          explain: 'The exterior angle at $C$ is the supplement of the adjacent interior $c$ (linear pair), and by I.32 that supplement is exactly $a + b$: the sum of the two remote interiors — option (d). Option (a) confuses the exterior with the interior it leans on; they are supplements, not equals. Option (b) computes $180^\\circ - a$, which equals $b + c$ — the sum involving the WRONG pair, adjacent-plus-remote instead of both remotes. Option (c) adds the adjacent interior $c$ to the remote $a$ — same wrong pair, and note it would exceed $180^\\circ - b$, an impossible exterior bound.',
        },
        {
          q: 'A convex heptagon ($n = 7$) is dissected into triangles from one vertex. How many triangles, and what is the interior angle sum?',
          options: [
            '5 triangles, 900°',
            '7 triangles, 1260°',
            '4 triangles, 720°',
            '5 triangles, 540°',
          ],
          answer: 0,
          explain: 'From one vertex of an $n$-gon the dissection draws $n - 3 = 4$ diagonals and produces $n - 2 = 5$ triangles; each contributes $180^\\circ$, so the interior sum is $5 \\cdot 180^\\circ = 900^\\circ$ — option (a). Option (b) commits the classic $n$ versus $n - 2$ miscount: seven triangles would need the sum $1260^\\circ$, which the dissection cannot deliver. Option (c) undercounts the diagonals-to-triangles step: four diagonals give FIVE triangles, not four (each new diagonal adds one region to the first one). Option (d) gets the triangle count right but the arithmetic wrong: $5 \\cdot 180^\\circ$ is $900^\\circ$, not $540^\\circ$.',
        },
        {
          q: 'On a sphere, the octant triangle (north pole plus two equator points $90^\\circ$ apart in longitude) has angle sum —',
          options: [
            'exactly 180°, because I.32 is a theorem about all triangles',
            'less than 180°, the spherical deficit',
            'a sum of 270°, with spherical excess 90°',
            'exactly 360°, because the equator is a great circle',
          ],
          answer: 2,
          explain: 'Each angle of the octant is a right angle — the meridians meet the equator perpendicularly and the two meridians differ by $90^\\circ$ of longitude — so the sum is $270^\\circ$ and the excess over $180^\\circ$ is $90^\\circ$: option (c). Option (a) is the trap the whole section arms you against: I.32 uses the parallel postulate, and on the sphere (zero parallels through a point) the proof cannot run and the conclusion genuinely fails. Option (b) describes the HYPERBOLIC plane, the third geometry of 2.2\'s census — on the sphere the excess is positive, not negative. Option (d) confuses the angle sum with a walk-around total; $360^\\circ$ is the exterior-turn sum of a polygon, not the angle sum of any triangle.',
        },
        {
          q: 'Two angles of a proposed triangle measure $91^\\circ$ and $95^\\circ$. What does the angle-sum law say?',
          options: [
            'The third angle is $-6^\\circ$, a reflex angle',
            'no such triangle exists — the two given angles already sum to more than 180°',
            'The third angle is $6^\\circ$, and the triangle is obtuse',
            'The third angle is $6^\\circ$, and the triangle is acute',
          ],
          answer: 1,
          explain: 'A triangle carries at most one non-acute angle; $91^\\circ + 95^\\circ = 186^\\circ$ already exceeds the whole $180^\\circ$ budget, leaving nothing (or less than nothing) for the third angle — so no such triangle exists: option (b). Option (a) invents a "reflex third angle" to save the figure; angles of a triangle are strictly between $0^\\circ$ and $180^\\circ$, and the angle-sum law is about genuine triangles. Options (c) and (d) both compute $180^\\circ - 186^\\circ = -6^\\circ$ and misreport it as $+6^\\circ$ — and even at $6^\\circ$ the triangle would still be impossible, which is why (d)\'s "acute" verdict doubles the error.',
        },
      ],
    },
    /* -------------------------------------------------------------- */
    /* 10. graded exercises (15, L1–L6, full steps solutions)         */
    /* -------------------------------------------------------------- */
    {
      kind: 'exercises',
      title: 'Exercises — the sum law and its consequences',
      sets: [
        {
          level: 'L1',
          questions: [
            {
              q: 'Two angles of a triangle measure $47^\\circ$ and $68^\\circ$. Find the third angle, and name the licence you used.',
              solution: [
                'Sol. The angle-sum property (Euclid I.32) says the three interior angles total $180^\\circ$.',
                'Write the ledger: $47^\\circ + 68^\\circ + x = 180^\\circ$.',
                'Add the given pair: $47^\\circ + 68^\\circ = 115^\\circ$.',
                'Subtract: $x = 180^\\circ - 115^\\circ = 65^\\circ$.',
                'Hence the third angle is $65^\\circ$, by the angle-sum property — the same subtraction the proof watched happening on the parallel line.',
              ],
              answer: 'The third angle is $65^\\circ$',
            },
            {
              q: 'In triangle $PQR$, side $PR$ is extended past $R$. The two remote interior angles measure $52^\\circ$ and $61^\\circ$. Find the exterior angle at $R$ and the interior angle at $R$.',
              solution: [
                'Sol. The exterior angle equals the sum of the two remote interior angles (I.32\'s second half).',
                'Add the remotes: $52^\\circ + 61^\\circ = 113^\\circ$ — that IS the exterior angle.',
                'The interior angle at $R$ is its linear-pair partner: $180^\\circ - 113^\\circ = 67^\\circ$.',
                'Check with the full ledger: $52^\\circ + 61^\\circ + 67^\\circ = 180^\\circ$ — the sum law holds.',
                'Hence the exterior angle at $R$ is $113^\\circ$ and the interior angle at $R$ is $67^\\circ$.',
              ],
              answer: 'Exterior $113^\\circ$; interior at $R$ is $67^\\circ$',
            },
            {
              q: 'A right triangle has one acute angle of $34^\\circ$. Find the other acute angle, and name the 2.1 concept that your answer illustrates.',
              solution: [
                'Sol. One angle of the triangle is $90^\\circ$, so the other two must share the remaining $90^\\circ$.',
                'Write the complement ledger: $34^\\circ + y = 90^\\circ$.',
                'Subtract: $y = 90^\\circ - 34^\\circ = 56^\\circ$.',
                'Check by the sum law: $90^\\circ + 34^\\circ + 56^\\circ = 180^\\circ$ — consistent.',
                'Hence the other acute angle is $56^\\circ$; the two acute angles of a right triangle are COMPLEMENTARY — 2.1\'s complement arithmetic, now at two different vertices.',
              ],
              answer: 'The other acute angle is $56^\\circ$ (the acute angles are complementary)',
            },
          ],
        },
        {
          level: 'L2',
          questions: [
            {
              q: 'The angles of a triangle are in the ratio $2 : 3 : 4$. Find all three angles and classify the triangle.',
              solution: [
                'Sol. A ratio means a common multiple: the angles are $2k$, $3k$ and $4k$ degrees.',
                'Apply the sum law: $2k + 3k + 4k = 180^\\circ$, so $9k = 180^\\circ$.',
                'Divide: $k = 20^\\circ$.',
                'Recover the angles: $2k = 40^\\circ$, $3k = 60^\\circ$, $4k = 80^\\circ$.',
                'Hence the angles are $40^\\circ$, $60^\\circ$, $80^\\circ$ — all below $90^\\circ$, so the triangle is acute.',
              ],
              answer: 'Angles $40^\\circ$, $60^\\circ$, $80^\\circ$; the triangle is acute',
              figures: [
                {
                  caption: 'The $2:3:4$ triangle, constructed from its angles: arcs $40^\\circ$ at $B$, $60^\\circ$ at $C$, $80^\\circ$ at the apex $A$ — every arc computed from the constructed coordinates.',
                  svg: (() => {
                    const B: PT = [130, 350], C: PT = [430, 350]
                    const A: PT = geo24Apex(B, C, 60, 80)
                    const parts: string[] = []
                    parts.push(geo24Poly([A, B, C], c24.green, 3, '', c24.paper))
                    parts.push(geo24AngleArc(B, C, A, 46, c24.amber, 2.6, '60°', c24.amber))
                    parts.push(geo24AngleArc(C, B, A, 46, c24.teal, 2.6, '80°', c24.teal))
                    parts.push(geo24AngleArc(A, B, C, 44, c24.green, 2.6, '40°', c24.green))
                    parts.push(geo24Dot(A[0], A[1]), geo24Dot(B[0], B[1]), geo24Dot(C[0], C[1]))
                    parts.push(geo24Txt(A[0], A[1] - 14, 'A', 13, c24.ink, 'middle', '700'))
                    parts.push(geo24Txt(B[0] - 16, B[1] + 22, 'B', 13, c24.ink, 'middle', '700'))
                    parts.push(geo24Txt(C[0] + 16, C[1] + 22, 'C', 13, c24.ink, 'middle', '700'))
                    parts.push(geo24Txt((A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3 + 40, '2k + 3k + 4k = 9k = 180°', 12, c24.tealInk, 'middle', '700'))
                    return geo24Svg(560, 420, 'Triangle with base angles 60 and 80 degrees and apex angle 40 degrees, labelled A, B, C, with the ratio ledger 2k plus 3k plus 4k equals 180.', parts)
                  })(),
                },
              ],
            },
            {
              q: 'A convex polygon has interior angle sum $1260^\\circ$. How many sides does it have, and how many diagonals were drawn in the one-vertex dissection that proves it?',
              solution: [
                'Sol. The dissection ledger says the interior sum of an $n$-gon is $(n - 2) \\cdot 180^\\circ$.',
                'Set up: $(n - 2) \\cdot 180^\\circ = 1260^\\circ$.',
                'Divide by $180^\\circ$: $n - 2 = 7$, so $n = 9$ — a nonagon.',
                'The dissection draws $n - 3 = 9 - 3 = 6$ diagonals from one vertex, producing the $n - 2 = 7$ triangles.',
                'Hence the polygon has $9$ sides (a nonagon), and the dissection drew $6$ diagonals to make $7$ triangles.',
              ],
              answer: '$n = 9$ sides (a nonagon); the dissection draws $6$ diagonals',
            },
            {
              q: 'The interior angle of a regular polygon measures $165^\\circ$. Find the number of sides and the total interior sum.',
              solution: [
                'Sol. Use the linear pair at any vertex: interior plus exterior $= 180^\\circ$.',
                'Exterior angle: $e = 180^\\circ - 165^\\circ = 15^\\circ$.',
                'Recover the count: $n = \\frac{360^\\circ}{15^\\circ} = 24$ — an integer, so the built-in check passes.',
                'Interior sum: $(n - 2) \\cdot 180^\\circ = 22 \\cdot 180^\\circ = 3960^\\circ$.',
                'Hence the polygon has $24$ sides, with interior sum $3960^\\circ$ — a regular 24-gon.',
              ],
              answer: '$n = 24$ sides; interior sum $3960^\\circ$',
            },
          ],
        },
        {
          level: 'L3',
          questions: [
            {
              q: 'The exterior angle at a vertex of a triangle measures $100^\\circ$. The two remote interior angles measure $(3x + 5)^\\circ$ and $(2x + 15)^\\circ$. Find $x$, both remote angles, and the interior angle at the extended vertex.',
              solution: [
                'Sol. The exterior angle equals the sum of the remote interiors.',
                'Write the equation: $(3x + 5) + (2x + 15) = 100$.',
                'Combine: $5x + 20 = 100$, so $5x = 80$ and $x = 16$.',
                'Recover the remotes: $3(16) + 5 = 53^\\circ$ and $2(16) + 15 = 47^\\circ$; check the sum: $53^\\circ + 47^\\circ = 100^\\circ$.',
                'The interior angle at the extended vertex is the linear-pair partner: $180^\\circ - 100^\\circ = 80^\\circ$; the full ledger reads $53 + 47 + 80 = 180$.',
                'Hence $x = 16$, the remote angles are $53^\\circ$ and $47^\\circ$, and the interior angle at the extended vertex is $80^\\circ$.',
              ],
              answer: '$x = 16$; remotes $53^\\circ$ and $47^\\circ$; interior at the vertex $80^\\circ$',
            },
            {
              q: 'Four angles of a convex pentagon measure $115^\\circ$ each. Find the fifth angle, and verify the answer is compatible with convexity.',
              solution: [
                'Sol. A pentagon has $n = 5$, so the interior ledger holds $(5 - 2) \\cdot 180^\\circ = 540^\\circ$.',
                'Add the four given angles: $4 \\cdot 115^\\circ = 460^\\circ$.',
                'Subtract: the fifth angle is $540^\\circ - 460^\\circ = 80^\\circ$.',
                'Convexity check: every angle — the four $115^\\circ$s and the $80^\\circ$ — lies strictly between $0^\\circ$ and $180^\\circ$, so the answer describes a genuine convex pentagon.',
                'Hence the fifth angle is $80^\\circ$; such a pentagon really exists (a cyclic one with central gaps $100^\\circ, 30^\\circ, 100^\\circ, 30^\\circ, 100^\\circ$ has exactly these angles — the engine constructed it).',
              ],
              answer: 'The fifth angle is $80^\\circ$ — convexity holds',
              figures: [
                {
                  caption: 'The pentagon with four angles of $115^\\circ$ and one of $80^\\circ$, constructed on a circle with central gaps $100^\\circ, 30^\\circ, 100^\\circ, 30^\\circ, 100^\\circ$ — the engine\'s realisation that the five given angles coexist convexly.',
                  svg: (() => {
                    const gaps = [100, 30, 100, 30, 100]
                    const cx = 300, cy = 280, R = 150
                    const V: PT[] = []
                    let a = -90
                    for (let i = 0; i < 5; i++) {
                      const rad = (a * Math.PI) / 180
                      V.push([cx + R * Math.cos(rad), cy + R * Math.sin(rad)])
                      a += gaps[i]
                    }
                    const parts: string[] = []
                    parts.push(geo24Circle(cx, cy, R, c24.faint, 1.6))
                    parts.push(geo24Poly(V, c24.green, 3, '', c24.paper))
                    for (let i = 0; i < 5; i++) {
                      const Vi = V[i], Vp = V[(i + 4) % 5], Vn = V[(i + 1) % 5]
                      const lbl = i === 0 ? '80°' : '115°'
                      parts.push(geo24AngleArc(Vi, Vp, Vn, i === 0 ? 42 : 34, i === 0 ? c24.orange : c24.amber, 2.4, lbl, i === 0 ? c24.orange : c24.amber, false, 14))
                      parts.push(geo24Dot(Vi[0], Vi[1], c24.ink, 4))
                    }
                    parts.push(geo24Txt(cx, 486, 'four angles 115° + one angle 80° = 540°', 13, c24.ink, 'middle', '700'))
                    return geo24Svg(600, 510, 'A convex pentagon on a circle with four interior angles marked 115 degrees and the fifth marked 80 degrees, with the ledger 540 below.', parts)
                  })(),
                },
              ],
            },
            {
              q: 'A convex polygon has exterior angles (one per vertex, same walk direction) of $30^\\circ$, $45^\\circ$, $60^\\circ$ and three further EQUAL angles. Find the equal exterior angles, the number of sides, and all the interior angles.',
              solution: [
                'Sol. The walk-around law: the exterior angles of a convex polygon total $360^\\circ$.',
                'Add the known three: $30^\\circ + 45^\\circ + 60^\\circ = 135^\\circ$.',
                'The three equal exteriors share the rest: $3x = 360^\\circ - 135^\\circ = 225^\\circ$, so $x = 75^\\circ$.',
                'Count sides: $3 + 3 = 6$ sides, so the interior ledger is $(6 - 2) \\cdot 180^\\circ = 720^\\circ$.',
                'Interiors are the supplements: $150^\\circ$, $135^\\circ$, $120^\\circ$ and three of $105^\\circ$; check: $150 + 135 + 120 + 3 \\cdot 105 = 720^\\circ$.',
                'Hence the equal exterior angles are $75^\\circ$, the polygon has $6$ sides, and the interiors are $150^\\circ$, $135^\\circ$, $120^\\circ$, $105^\\circ$, $105^\\circ$, $105^\\circ$.',
              ],
              answer: 'Equal exteriors $75^\\circ$; $n = 6$; interiors $150^\\circ, 135^\\circ, 120^\\circ, 105^\\circ, 105^\\circ, 105^\\circ$',
            },
          ],
        },
        {
          level: 'L4',
          questions: [
            {
              q: 'The interior angle of a regular polygon is five times its exterior angle. Find the polygon, its angles, and its interior sum.',
              solution: [
                'Sol. This is the two-equation system: the linear pair gives $i + e = 180^\\circ$.',
                'The condition gives $i = 5e$; substitute: $5e + e = 180^\\circ$, so $6e = 180^\\circ$.',
                'Solve: $e = 30^\\circ$ and $i = 150^\\circ$.',
                'Recover the count: $n = \\frac{360^\\circ}{30^\\circ} = 12$ — an integer, check passes.',
                'Interior sum: $(12 - 2) \\cdot 180^\\circ = 1800^\\circ$; cross-check via exteriors: $12 \\cdot 30^\\circ = 360^\\circ$ walk-around total.',
                'Hence the polygon is the regular dodecagon: interior $150^\\circ$, exterior $30^\\circ$, interior sum $1800^\\circ$.',
              ],
              answer: 'Regular dodecagon ($n = 12$): interior $150^\\circ$, exterior $30^\\circ$, interior sum $1800^\\circ$',
              figures: [
                {
                  caption: 'The regular 12-gon as a computed ring: one side extended to display the $30^\\circ$ exterior turn (orange), and the dashed circular arrow marks the walk-around — one lap $= 12 \\times 30^\\circ = 360^\\circ$.',
                  svg: (() => {
                    const cx = 300, cy = 280, R = 150
                    const V = geo24RegPoly(cx, cy, 12, R, -90)
                    const parts: string[] = []
                    parts.push(geo24Poly(V, c24.green, 3, '', c24.paper))
                    // extend the side V11->V0 beyond V0 and mark the 30-degree exterior turn
                    const V0 = V[0], V11 = V[11], V1 = V[1]
                    const ux = V0[0] - V11[0], uy = V0[1] - V11[1]
                    const ul = Math.hypot(ux, uy)
                    const Pext: PT = [V0[0] + (60 * ux) / ul, V0[1] + (60 * uy) / ul]
                    parts.push(geo24Line(V0[0], V0[1], Pext[0], Pext[1], c24.orange, 2.2))
                    parts.push(geo24AngleArc(V0, Pext, V1, 40, c24.orange, 2.4, '30°', c24.orange))
                    // walk-around ring: dashed circular arrow
                    parts.push(`<path d="M ${cx + 205} ${cy} A 205 205 0 1 1 ${cx - 205} ${cy - 0.01}" fill="none" stroke="${c24.amber}" stroke-width="2.2" stroke-dasharray="8,7"/>`)
                    parts.push(geo24Head(cx - 205, cy, 180, c24.amber, 9))
                    parts.push(geo24Txt(cx, 62, 'one lap: 12 × 30° = 360°', 13, c24.amber, 'middle', '700'))
                    parts.push(geo24Txt(cx, 512, 'regular 12-gon: interior 150°, exterior 30°', 13, c24.ink, 'middle', '700'))
                    return geo24Svg(600, 530, 'A regular dodecagon with one side extended showing the 30 degree exterior angle and a dashed circular walk-around arrow labelled one lap equals 360 degrees.', parts)
                  })(),
                },
              ],
            },
            {
              q: 'In quadrilateral $ABCD$, the angles at $A$ and $C$ are supplementary: $\\angle A + \\angle C = 180^\\circ$ (with $\\angle A = 110^\\circ$). Prove that $\\angle B + \\angle D = 180^\\circ$, and give a witness quadrilateral.',
              solution: [
                'Sol. The quadrilateral is a 4-gon, so the interior ledger is $(4 - 2) \\cdot 180^\\circ = 360^\\circ$.',
                'Write the full ledger: $\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ$.',
                'Group: $(\\angle A + \\angle C) + (\\angle B + \\angle D) = 360^\\circ$.',
                'Substitute the given supplement: $180^\\circ + (\\angle B + \\angle D) = 360^\\circ$, so $\\angle B + \\angle D = 180^\\circ$ — supplementary as well.',
                'Witness: $\\angle A = 110^\\circ$, $\\angle C = 70^\\circ$ (sum $180^\\circ$), with $\\angle B = 95^\\circ$, $\\angle D = 85^\\circ$ (sum $180^\\circ$); the ledger reads $110 + 70 + 95 + 85 = 360$.',
                'Hence opposite angles supplementary on one pair forces the other pair supplementary too — the dissection ledger doing a proof\'s work in one line (a fact chapter 6 will meet again when cyclic quadrilaterals arrive).',
              ],
              answer: '$\\angle B + \\angle D = 180^\\circ$; witness $110^\\circ, 95^\\circ, 70^\\circ, 85^\\circ$',
            },
            {
              q: 'An isosceles triangle has vertex angle $36^\\circ$. Find the base angles, the exterior angle at a base vertex, and the exterior angle at the vertex.',
              solution: [
                'Sol. The sum law with equal base angles: $36^\\circ + 2b = 180^\\circ$.',
                'Solve: $2b = 144^\\circ$, so each base angle is $b = 72^\\circ$.',
                'Exterior at a base vertex: sum of the remote interiors $= 36^\\circ + 72^\\circ = 108^\\circ$.',
                'Exterior at the vertex: remote interiors are the two base angles, so it is $72^\\circ + 72^\\circ = 144^\\circ$.',
                'Check both by linear pairs: $108^\\circ + 72^\\circ = 180^\\circ$ at the base, $144^\\circ + 36^\\circ = 180^\\circ$ at the vertex.',
                'Hence the base angles are $72^\\circ$; the exterior at a base vertex is $108^\\circ$; the exterior at the vertex is $144^\\circ$.',
              ],
              answer: 'Base angles $72^\\circ$; exteriors $108^\\circ$ (base vertex) and $144^\\circ$ (vertex)',
            },
          ],
        },
        {
          level: 'L5',
          questions: [
            {
              q: 'Compute the interior angle sum of a convex 2025-gon, and state its exterior-angle sum. Then: how many triangles does the one-vertex dissection produce, and how many diagonals does it draw?',
              solution: [
                'Sol. The dissection ledger applies to every convex $n$-gon, however large: interior sum $= (n - 2) \\cdot 180^\\circ$.',
                'Substitute $n = 2025$: $(2025 - 2) \\cdot 180^\\circ = 2023 \\cdot 180^\\circ = 364{,}140^\\circ$.',
                'The exterior-angle sum is $360^\\circ$ — one lap is one revolution, whatever the count of vertices.',
                'Triangles: $n - 2 = 2023$; diagonals from the one vertex: $n - 3 = 2022$.',
                'Check the vertex identity: $364{,}140^\\circ + 360^\\circ = 364{,}500^\\circ = 2025 \\cdot 180^\\circ$ — the linear-pair total, as it must be.',
                'Hence the interior sum is $364{,}140^\\circ$, the exterior sum is $360^\\circ$, from $2023$ triangles and $2022$ diagonals.',
              ],
              answer: 'Interior sum $364{,}140^\\circ$; exterior sum $360^\\circ$; $2023$ triangles, $2022$ diagonals',
            },
            {
              q: 'The book refuses to round what it can compute. Write the interior angle of the regular 7-gon and the regular 11-gon as exact fractions AND as decimals to six places, then audit both decimals by the round trip.',
              solution: [
                'Sol. Each interior angle of a regular $n$-gon is $\\frac{(n - 2) \\cdot 180^\\circ}{n}$.',
                'Regular 7-gon: $\\frac{5 \\cdot 180^\\circ}{7} = \\frac{900^\\circ}{7} = 128\\frac{4}{7}^\\circ \\approx 128.571429^\\circ$.',
                'Regular 11-gon: $\\frac{9 \\cdot 180^\\circ}{11} = \\frac{1620^\\circ}{11} = 147\\frac{3}{11}^\\circ \\approx 147.272727^\\circ$.',
                'Round trip, 7-gon: $7 \\times 128.571429 = 900.000003$, which misses $900$ by $0.000003$ — within one part in a hundred thousand, honest to the stated six places.',
                'Round trip, 11-gon: $11 \\times 147.272727 = 1619.999997$, missing $1620$ by the same negligible margin.',
                'Hence the exact answers are $\\frac{900}{7}^\\circ$ and $\\frac{1620}{11}^\\circ$ (the fractions are the answers; the decimals are courtesies audited to six places).',
              ],
              answer: 'Regular 7-gon: $\\frac{900}{7} = 128\\frac{4}{7} \\approx 128.571429^\\circ$; regular 11-gon: $\\frac{1620}{11} = 147\\frac{3}{11} \\approx 147.272727^\\circ$',
            },
          ],
        },
        {
          level: 'L6',
          questions: [
            {
              q: 'Girard\'s theorem says the area of a spherical triangle is its spherical excess (in radians) times $R^2$. Use it to find the area of the octant triangle on a sphere of radius $10$, and verify the answer by dividing the whole surface area — the engine\'s two-route cross-check.',
              solution: [
                'Sol. The octant\'s angles are $90^\\circ$, $90^\\circ$, $90^\\circ$: sum $270^\\circ$, excess $E = 270^\\circ - 180^\\circ = 90^\\circ$.',
                'Convert the excess to radians: $90^\\circ = \\frac{\\pi}{2}$.',
                'Girard: area $= E \\cdot R^2 = \\frac{\\pi}{2} \\cdot 10^2 = 50\\pi \\approx 157.0796$ square units.',
                'Second route: the octant is one eighth of the sphere\'s surface, and the full surface is $4\\pi R^2 = 400\\pi$.',
                'Divide: $\\frac{400\\pi}{8} = 50\\pi$ — the two routes agree exactly.',
                'Hence the octant\'s area on the $R = 10$ sphere is $50\\pi \\approx 157.0796$ — Girard\'s excess rule and the one-eighth dissection of the surface give the same number, which is exactly why the octant is the standard witness for every spherical-excess claim in this book.',
              ],
              answer: 'Area $= 50\\pi \\approx 157.0796$ square units — both routes agree',
              figures: [
                {
                  caption: 'The octant\'s area by dissection: the sphere\'s surface $4\\pi R^2$ (here $R = 10$) splits into eight octant triangles, so each carries $50\\pi$ — matching Girard\'s $E \\cdot R^2 = \\frac{\\pi}{2} \\cdot 100$.',
                  svg: geo24OctantSphere(true),
                },
              ],
            },
          ],
        },
      ],
    },

    /* -------------------------------------------------------------- */
    /* 11. closing                                                    */
    /* -------------------------------------------------------------- */
    { kind: 'heading', text: 'What you now own' },
    {
      kind: 'para',
      text: 'Chapter 2 set out to earn one number, and this lesson cashed the cheque. The angle arithmetic of 2.1 supplied the straight angle; the fifth-postulate story of 2.2 supplied the one parallel line; the census of 2.3 supplied the two carries; and Euclid I.32 assembled them into $a + b + c = 180^\\circ$ — the theorem you had used all your life, now watched earning itself in five licensed steps. From it flowed the exterior angle theorem (equality by I.32, inequality already by I.16 — the honest split of which results cost the postulate), the classification census (at most one non-acute angle, by a $15{,}931$-triple sweep), the polygon ledgers ($(n-2) \\cdot 180^\\circ$ inside, $360^\\circ$ around), the regular-polygon tables with their unrounded fractions, and the non-Euclidean door: the octant\'s three right angles on the sphere you live on.',
    },
    {
      kind: 'para',
      text: 'Chapter 3 now opens the first door this lesson unlocked from the other side: triangles as OBJECTS — congruence, the side-angle-side engine, isosceles structure — where the angle facts you just earned become hypotheses to be matched, not just computed. The exterior-angle inequality will do steady work there, exactly as it has since Euclid. And when chapter 11 finally returns to prove that the angle sum and the parallel postulate are equivalent, it will find every tool already on the bench: the sum law, the octant witness, the 1 / 0 / $\\infty$ census of parallels. The two-thousand-year argument about the fifth postulate ended exactly where this lesson stands — with the discovery that the humblest fact in school geometry, $a + b + c = 180^\\circ$, is the parallel postulate wearing a triangle.',
    },
  ],
}

export const chapter2: Chapter = {
  number: 2,
  slug: 'angles-and-parallel-lines',
  title: 'Angles, Parallel Lines and the Transversal',
  summary:
    'Angles measured, named and paired; then the parallel line and the transversal — the eight-angle census (corresponding, alternate, co-interior) that powers half of school geometry. The angle-sum of a triangle is DERIVED from the parallel postulate, and the exterior-angle inequality follows — the first classic theorems proved the honest way.',
  status: 'complete',
  lessons: [lessonGeo201, lessonGeo202, lessonGeo203, lessonGeo204],
  plannedLessons: [],
}
