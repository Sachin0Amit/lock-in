import type { Lesson } from '../../../src/data/library/types'

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
          parts.push(geo21Txt(x, y + 4, String(d), 11.5, c21.tealInk))
        }
        for (let d = 0; d <= 180; d += 30) {
          const [x, y] = p(R - 56, -d)
          parts.push(geo21Txt(x, y + 4, String(180 - d), 11.5, c21.mid))
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
        parts.push(geo21Txt(wx + 10, wy + 24, 'wrong scale: 130°', 12, c21.red, 'start', '700'))
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
