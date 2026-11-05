import type { Chapter } from '../../../types'

/**
 * Foundation Mathematics — Chapter 10: Data and Graphs
 *
 * LESSON 10.1 Collecting and Tallying Data (run 44, 2026-11-05 — the first
 * TWO-lesson run to span two chapters) — from measurement's single honest
 * numbers to the world's answers in crowds. Data defined in the is-said-to-be
 * dress (the collected answers, each one a value of the question's quantity);
 * the raw list and why it defeats counting by re-reading; the tally pass —
 * one stroke per answer, landed in its category's row; the five-bar gate
 * (the fifth stroke crossing the four — the hand's signature) with figure 1
 * the 20-answer raw list flowing into the four travel-mode tally rows
 * (walk 8, bus 6, cycle 4, car 2); the frequency Definition and the
 * frequency table; the check-sum law DERIVED as tag 1 (the categories
 * partition the answers — no overlaps, no orphans — so Σf = N; the table
 * checks itself); the category-choice discipline (decide the rows BEFORE
 * collecting; the "other" row as honesty's catch-all; the overlapping-
 * categories fraud the sum cannot catch); figure 2 the gates gallery
 * (tallies for 3, 5, 8 and 12 read gates × 5 + leftovers, tag 2); the
 * shoe-size second dataset (numeric answers tallied by value — 4:5, 5:8,
 * 6:2 of 15; the mode NAMED as 10.4's promise); relative frequencies
 * (8/20 = 2/5 = 40% … summing to exactly 1 — 5.4's percents re-cashed);
 * the exam corner; the historical callout (notches are the oldest visible
 * mathematics: the Ishango bone told with hedges, shepherd's tallies, the
 * English Exchequer's split tally sticks and the 1834 burning that helped
 * destroy Parliament); 3 formula cards; 8 terms, 5-quiz (keys 0/2/2/1/1,
 * verified live at the gates), 12 exercises L1–L6 (L6: the check-sum
 * law proved from the partition; the orphan-answer survey diagnosed and
 * cured with an "other" row decided before collecting). Scope guard held:
 * no bar/line/pie charts (10.2), no mean/median/mode definitions (10.4 —
 * the mode named once as a forward glance), no grouped intervals, no
 * sampling theory. Authored in the Cengage voice + solution chain; every
 * number pre-verified by scripts/verify-unit-10.ts (79 checks A–I ALL
 * PASS) BEFORE writing.
 *
 * LESSON 10.2 Bar Charts, Line Graphs and Pie Charts (run 45) — one
 * table, three pictures. The bar chart as the tally standing up (equal
 * widths, honest gaps, the y-axis a ruler) with figure 1 the travel
 * survey drawn at 25 px/student (heights 200/150/100/50, gridlines 0..10
 * in steps of 2 — VLM 9.5/8); the bar-scale law DERIVED as tag 1
 * (height = f × s, reading = height ÷ s — 9.1's count-of-units logic
 * vertical) + the scale-choice freedom bounded by honesty (equal,
 * labelled, covering); the line graph for ordered data with figure 2 the
 * sapling watch (8/11/16/18/25/28 cm on days 0..10; the changes +3 +5
 * +2 +7 +3 rebuilding the 20 cm total; the dashed day-5 guide with tick
 * — the interpolation Caution: between points the line guesses, and
 * unordered categories get no line at all; VLM 9/7.5 after the note
 * moved off the 16-label and a day-5 tick added); the pie chart for
 * parts of ONE whole with the central-angle law DERIVED as tag 2
 * (θ = (f/N) × 360° — the whole turn is the whole class; the slices
 * close on 360° BY the check-sum law) + the angle table + figure 3 the
 * pie drawn from the table (144°/108°/72°/36°, alternating tints,
 * stacked labels with counts, boundary degree labels — VLM 9/7 after
 * three passes; the VLM's "ellipse" claim disproven by DOM measurement:
 * rendered aspect = viewBox aspect = 2.167, the circle true); the
 * which-graph-for-which-data table; the exam corner; the historical
 * callout (Playfair 1786 line/bar + 1801 pie; Nightingale's 1858 rose
 * diagram); 3 formula cards, 8 terms, 5-quiz (keys 1/3/2/2/0 verified
 * live 5/5), 12 exercises L1–L6 (L6: the central-angle law proved from
 * the partition; the line-through-categories fraud diagnosed). Scope
 * guard held: no histograms, no double/stacked bars, no best-fit lines,
 * no graph-lying critique beyond one forward sentence (10.3 owns it).
 * verify-unit-10.ts EXTENDED 81 → 141 checks (J–R) ALL PASS
 * pre-writing; E2E dedicated 10.2 block green (e2e-102.page.js created
 * + whitelisted FIRST; quiz live 5/5, mobile 390 exact-fit); SVG audits
 * 0/0/0.
 *
 * LESSON 10.3 Reading Graphs Critically (run 45, same run) — a graph is
 * an argument made of ink. The truncated baseline: the milk pair (Rs 52
 * vs 56, true 1.077×) drawn from a baseline of 50 with a ×5 stretch —
 * visual ratio 3×, exaggeration 2.79× — figure 1 the two-panel
 * confrontation (honest vs lie, VLM 9.5/8); the exaggeration law DERIVED
 * as tag 1 (E = v₁(v₂−b)/(v₂(v₁−b)); E(0) = 1 exactly, climbing
 * monotonically as b → v₁ — swept b = 0..51 in the verify script) + the
 * cricketers Illustration (9.1 vs 10.2 from baseline 9: E ≈ 10.7×); the
 * twin-scales trap with the scale-invariance law DERIVED as tag 2
 * (rescaling multiplies every height by k; within-chart rankings
 * survive, cross-chart pixel comparisons die); the mismatch gallery
 * (figure 2: the SAME 8/6/4/2 drawn three ways — the line-through-
 * categories fraud, the open pie covering only 252°, the honest bars
 * with baseline and values; audits 0/0, accepted after the VLM's
 * label-placement misread was overruled by direct inspection); the
 * correlation-is-not-causation paragraph (ice cream vs drownings — the
 * heat is the third variable); the five-question checklist (baseline,
 * steps, type, closure, provenance) + the re-basing repair Illustration
 * (E returns exactly 1); the exam corner; the historical callout (Huff's
 * How to Lie with Statistics 1954 + Nightingale's candour); 3 formula
 * cards, 8 terms, 5-quiz (keys 1/2/1/1/1 verified live 5/5 — the Y4 key
 * corrected from the live run), 12 exercises L1–L6 (L6: the exaggeration
 * law proved with both certainties; the checklist's insufficiency for
 * causal readings argued). Scope guard held: no log scales, no dual
 * axes, no regression, no reproduced real-world charts, no statistics
 * beyond the one correlation paragraph. verify-unit-10.ts EXTENDED 141
 * → 186 checks (S–Z2) ALL PASS pre-writing; E2E dedicated 10.3 block
 * green (e2e-103.page.js created + whitelisted FIRST; quiz live 5/5,
 * mobile 390 exact-fit); SVG audits 0/0.
 *
 * References: NCERT Ganita Prakash class-6 ch. 4 "Data Handling and
 * Presentation" (fegp104, 2024 — data organised in tabular form using
 * tally marks, frequencies read from tables; web-checked 2026-11-05) +
 * the carried Khattar, Quantitative Aptitude (4e) for exam-corner
 * data-table shapes. History web-checked: the Ishango bone (Wikipedia;
 * c. 20,000-year-old notched bone, the tally interpretation honestly
 * hedged); the English tally sticks (Wikipedia; Exchequer split-stick
 * receipts, the 1834 Treasury stove burning that helped destroy the
 * Palace of Westminster). No content reproduced; exposition original.
 * See docs/project/SOURCE_LOG.md.
 */
export const chapter10: Chapter = {
  number: 10,
  slug: 'data-and-graphs',
  title: 'Data and Graphs',
  summary:
    'Reading the world in tables and pictures: frequency tables, bar charts, line graphs, pie charts and when each lies or tells the truth; the mean, median and mode introduced honestly with their strengths and traps.',
  status: 'in-progress',
  plannedLessons: [
    'Mean, Median and Mode',
  ],
  lessons: [
    {
      id: 'fm-collecting-and-tallying-data',
      number: '10.1',
      title: 'Collecting and Tallying Data',
      concepts: [
        'Data — the world\u2019s answers, collected',
        'The raw list and why it defeats counting',
        'The tally pass — one stroke per answer',
        'The five-bar gate',
        'Frequency and the frequency table',
        'The check-sum law Σf = N',
        'Choosing categories before collecting',
        'Relative frequency — the table in percents',
      ],
      objectives: [
        'Say exactly what data is — the collected answers to a question, each one a value of the quantity asked about — and explain why a raw list defeats counting by re-reading',
        'Run the tally pass honestly: one stroke per answer into its category\u2019s row, the fifth stroke closing the gate, the frequency read as gates × 5 + leftovers',
        'Build a frequency table from raw data and prove the check-sum law: because the categories partition the answers, the frequency column must sum to N — the table checks itself',
        'Choose categories that do not overlap and leave no orphan answers — decided before collecting, with an "other" row as honesty\u2019s catch-all',
        'Convert a frequency table into relative frequencies (fractions and percents summing to exactly 1) and read comparisons straight off the rows',
      ],
      prerequisites: [],
      sources: ['ncert-ganita-prakash6-ch4', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Nine chapters have pursued single quantities: one desk\u2019s length, one ribbon\u2019s measure, one bus\u2019s speed — each a single number wearing an honest unit. But the world\u2019s most common arithmetic begins where the single number ends. Ask a class of twenty "how do you travel to school?" and twenty answers come back, one per student, all different or the same in no visible order: *walk, bus, walk, cycle, walk…* Twenty numbers\u2019 worth of information, and not one of them is *the* answer — the answer is the crowd. This chapter is about what mathematics does with crowds: collect them, count them, picture them, and summarise them honestly. The first step is the quietest: turning twenty spoken answers into a table a glance can read.',
        },
        {
          kind: 'para',
          text: 'The tool for that step is older than writing — a notch for a thing, a stroke for an answer — and it carries two ideas this lesson will prove rather than assume: that a well-built table **checks itself** (the frequencies must rebuild the total), and that the hardest part of data work happens **before** the first answer arrives, in the choosing of the categories. Both ideas fit in one lesson because both are just chapter-3 honesty — counting without double-counting and without losing — wearing its oldest clothes.',
        },
        { kind: 'heading', text: 'What data is: the collected answers' },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Data',
          text: '**Data** is said to be the **collection of answers (observations) gathered about a question** — each answer being one value of the quantity the question asks about. "How do you travel to school?" asked of 20 students yields 20 answers; each answer (*walk*, *bus*…) is one **observation**, and the 20 together are the data. One answer is an observation; the crowd is the data.',
        },
        {
          kind: 'para',
          text: 'Write the twenty answers down in the order they were spoken — that bare list is called the **raw data**, and it is exactly what a notebook catches in a live survey. For example (this list is the lesson\u2019s working example throughout):',
        },
        {
          kind: 'para',
          text: '*walk, bus, walk, cycle, walk, bus, walk, walk, car, bus,* *walk, cycle, bus, walk, car, walk, cycle, bus, bus, cycle*',
        },
        {
          kind: 'para',
          text: 'Now try the question every survey exists for — *which is the most common way this class travels?* — by reading the raw list. You must re-read it, keeping a running count in your head: a *walk*… another *walk*… was that three or four? By the second pass the counts blur, and a survey of two hundred answers would be hopeless. The raw list is honest — every answer is there, in order — but it is **organised for recording, not for reading**. The whole of this lesson is the road from one to the other.',
        },
        { kind: 'heading', text: 'The tally pass: one stroke per answer' },
        {
          kind: 'para',
          text: 'The fix is to let the paper do the remembering. Before collecting (or after, from the raw list), draw one row for each answer-type the question allows — *walk, bus, cycle, car* — and then pass through the answers **one at a time**, drawing a single stroke in the answer\u2019s row. No answer is thought about twice; no answer is skipped. Each stroke is a physical receipt for one answer, which is why the method defeats the re-reading trap: the memory lives in the strokes, not in the head.',
        },
        {
          kind: 'figure',
          caption:
            'The whole method in one picture. Left: the 20 answers as they came — the raw list, two columns, in the order spoken. Right: the same 20 answers after the tally pass — one stroke per answer into its row, the fifth stroke of a row crossing the four before it (the five-bar gate), the row\u2019s total written as the frequency. Walk closes one gate and adds three (8); bus closes one gate and adds one (6); cycle shows four open strokes (4); car shows two (2). The chips are numbered 1–20 in pass order: following the numbers left column then right, each answer lands exactly one stroke in its row. The raw list and the table hold the same twenty answers — but only the table lets a glance answer "which is most common?".',
          svg: `<svg viewBox="0 0 780 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Twenty raw answers in two columns flowing into a four-row tally table: walk 8 (one gate plus three strokes), bus 6 (one gate plus one), cycle 4, car 2, with the frequency column 8, 6, 4, 2">
  <text x="390" y="22" font-size="13" fill="currentColor" text-anchor="middle">the raw list becomes the tally table — one stroke per answer</text>
  <text x="150" y="48" font-size="12" fill="currentColor" text-anchor="middle">the raw list (as spoken)</text>
  <text x="430" y="48" font-size="12" fill="currentColor" text-anchor="middle">the tally pass</text>
  <line x1="272" y1="58" x2="272" y2="330" stroke="currentColor" stroke-width="1" stroke-dasharray="5 3" opacity="0.85"/>
  ${(() => {
    const raw = ['walk','bus','walk','cycle','walk','bus','walk','walk','car','bus','walk','cycle','bus','walk','car','walk','cycle','bus','bus','cycle'];
    let chips = '';
    raw.forEach((a, i) => {
      const col = Math.floor(i / 10), row = i % 10;
      const x = 40 + col * 116, y = 62 + row * 26;
      chips += `<rect x="${x}" y="${y}" width="104" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.85"/><text x="${x + 9}" y="${y + 14}" font-size="8" fill="currentColor" opacity="0.6">${i + 1}</text><text x="${x + 60}" y="${y + 14}" font-size="12" fill="currentColor" text-anchor="middle">${a}</text>`;
    });
    return chips;
  })()}
  ${(() => {
    const rows: Array<[string, number, number]> = [['walk', 8, 84], ['bus', 6, 150], ['cycle', 4, 216], ['car', 2, 282]];
    let out = '';
    for (const [name, n, y0] of rows) {
      out += `<text x="306" y="${y0 + 22}" font-size="13" fill="currentColor" text-anchor="end">${name}</text>`;
      const full = Math.floor(n / 5), rem = n % 5;
      let x = 330;
      for (let g = 0; g < full; g++) {
        for (let k = 0; k < 4; k++) {
          out += `<line x1="${x + k * 14}" y1="${y0}" x2="${x + k * 14}" y2="${y0 + 34}" stroke="currentColor" stroke-width="1.6"/>`;
        }
        out += `<line x1="${x - 5}" y1="${y0 - 3}" x2="${x + 47}" y2="${y0 + 37}" stroke="currentColor" stroke-width="1.6"/>`;
        x += 66;
      }
      for (let k = 0; k < rem; k++) {
        out += `<line x1="${x + k * 14}" y1="${y0}" x2="${x + k * 14}" y2="${y0 + 34}" stroke="currentColor" stroke-width="1.6"/>`;
      }
      out += `<text x="500" y="${y0 + 23}" font-size="15" fill="currentColor" font-weight="bold">${n}</text>`;
    }
    return out;
  })()}
  <text x="400" y="62" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">tally</text>
  <text x="512" y="62" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.8">frequency</text>
  <line x1="310" y1="74" x2="534" y2="74" stroke="currentColor" stroke-width="0.8" opacity="0.6"/>
  <line x1="488" y1="80" x2="488" y2="322" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.5"/>

</svg>`,
        },
        {
          kind: 'para',
          text: 'The strokes group themselves in fives, and the grouping has a name worth slowing down for. Four strokes stand side by side — ||||. The **fifth** stroke does not stand beside them; it is drawn **crossing through all four**, slamming the gate shut. The closed gate is a package of exactly five: to read it you do not count strokes at all, you just see "one gate". This is the **five-bar gate**, and it is the human hand\u2019s signature — five fingers, one gate — which is why a tally read at sight is read *by fives*: gates first, leftovers after.',
        },
        {
          kind: 'figure',
          caption:
            'The gates gallery — reading tallies by fives. Three: three open strokes. Five: one closed gate. Eight: one gate plus three open strokes (5 + 3). Twelve: two gates plus two (10 + 2). The eye counts the gates, adds the leftovers, and never loses place — which is exactly why the fifth stroke crosses instead of standing: a row of fourteen unbroken strokes is unreadable, while the twelve above — two gates and two leftovers — are readable at a glance.',
          svg: `<svg viewBox="0 0 780 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four tally panels: three open strokes; one closed gate; one gate plus three strokes; two gates plus two strokes, each labelled with its value and its gates-and-leftovers reading">
  <text x="390" y="22" font-size="13" fill="currentColor" text-anchor="middle">the five-bar gate — tallies read as gates × 5 + leftovers</text>
  ${(() => {
    const panels: Array<[number, number]> = [[3, 105], [5, 290], [8, 475], [12, 660]];
    let out = '';
    for (const [n, cx] of panels) {
      const full = Math.floor(n / 5), rem = n % 5;
      const gateW = 3 * 12 + 6;
      const remW = rem > 0 ? (rem - 1) * 12 + 2 : 0;
      const groups = full + (rem > 0 ? 1 : 0);
      const width = (full > 0 ? full * gateW : 0) + (rem > 0 ? remW : 0) + (groups - 1) * 16;
      let x = cx - width / 2;
      for (let g = 0; g < full; g++) {
        for (let k = 0; k < 4; k++) {
          out += `<line x1="${x + k * 12}" y1="150" x2="${x + k * 12}" y2="180" stroke="currentColor" stroke-width="1.6"/>`;
        }
        out += `<line x1="${x - 5}" y1="146" x2="${x + 41}" y2="184" stroke="currentColor" stroke-width="1.6"/>`;
        x += gateW + 16;
      }
      if (rem > 0) {
        for (let k = 0; k < rem; k++) {
          out += `<line x1="${x + k * 12}" y1="150" x2="${x + k * 12}" y2="180" stroke="currentColor" stroke-width="1.6"/>`;
        }
      }
      out += `<text x="${cx}" y="214" font-size="15" fill="currentColor" font-weight="bold" text-anchor="middle">${n}</text>`;
      out += `<text x="${cx}" y="232" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">${full > 0 ? full + (full === 1 ? ' gate' : ' gates') : ''}${full > 0 && rem > 0 ? ' + ' : ''}${rem > 0 ? rem + ' leftover' + (rem === 1 ? '' : 's') : ''}</text>`;
    }
    return out;
  })()}
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Frequency and the frequency table',
          text: 'The **frequency** of a category is said to be the **number of answers that landed in it** — the row\u2019s tally, written out as a number. The table that lists every category with its tally and its frequency is a **frequency table**. For the travel survey: walk 8, bus 6, cycle 4, car 2. The tally column shows its working; the frequency column is the answer.',
        },
        {
          kind: 'para',
          text: 'The table does something the raw list never could: it **answers questions at a glance**. Which is the most common way the class travels? Walk — 8, no counting needed. How many more students walk than cycle? $8 - 4 = 4$. What fraction of the class takes the bus? $6/20$ — and chapter 5\u2019s dresses turn it into $0.3$, or $30\\%$, the moment it is asked. The raw list contained every one of these answers, but buried; the table is the same information, *sorted by question*.',
        },
        {
          kind: 'derivation',
          title: 'The check-sum law: a well-built table checks itself',
          statement:
            'A survey of $N$ answers is tallied into rows whose categories do not overlap and leave nothing out. Show that the frequency column must sum to exactly $N$ — so any table whose frequencies sum to something else is confessing a mistake.',
          steps: [
            {
              label: 'Every answer lands in exactly one row',
              formula: '\\text{each of the } N \\text{ answers} \\to \\text{one row}',
              explanation:
                'That is what the two category rules mean: rows do not OVERLAP (no answer fits two rows — no double-counting) and the rows COVER everything (no answer fits no row — no loss). The categories **partition** the answers.',
            },
            {
              label: 'So the frequency column counts the answers, row by row',
              formula: 'f_1 + f_2 + \\cdots + f_k',
              explanation:
                'Each $f_i$ counts its row\u2019s answers once; because no answer is in two rows and none is in none, adding the rows counts every answer exactly once.',
            },
            {
              label: 'The sum rebuilds N',
              formula: 'f_1 + f_2 + \\cdots + f_k = N',
              explanation:
                'The travel table: $8 + 6 + 4 + 2 = 20$ — the twenty spoken answers, all present, none doubled. Had the sum come to 19 or 21, the table itself would be confessing: an answer lost, or counted twice.',
            },
          ],
          result: 'The check-sum law: $\\Sigma f = N$ — the frequency column of every honest frequency table sums to the number of answers collected.',
        },
        {
          kind: 'equation',
          latex: 'f_1 + f_2 + \\cdots + f_k \\;=\\; N',
          note: '**The check-sum law (tag 1).** The table checks itself: add the frequency column and it must return the number of answers. 8 + 6 + 4 + 2 = 20 ✓. This one line catches more student tables than any marking pen — a row forgotten, an answer tallied twice, a category missed mid-survey.',
        },
        {
          kind: 'example',
          title: 'Build the frequency table for the class travel survey, and run the check.',
          steps: [
            'Now, the categories are decided first: walk, bus, cycle, car — the four ways the question allows.',
            'So the tally pass lands one stroke per answer: walk closes one gate and adds three (8); bus closes one gate and adds one (6); cycle stands four open strokes (4); car stands two (2).',
            'And the check: $8 + 6 + 4 + 2 = 20$ — the column rebuilds the 20 spoken answers. ✓',
            'Hence the table: walk 8, bus 6, cycle 4, car 2 — most common, walk; the table is certified by its own sum.',
          ],
        },
        { kind: 'heading', text: 'Choosing the categories: the work before the strokes' },
        {
          kind: 'para',
          text: 'The tally pass is mechanical; the **category choice is where a survey is won or lost**, and it must happen **before** the answers arrive. Two rules make the check-sum law possible, and both are worth stating as demands. First, the categories must **not overlap** — "walk" and "on foot" as two rows would force every walker\u2019s answer to choose, and the choice would be arbitrary. Second, the categories must **cover every answer** — a travel list with no row for the train would strand the train-answers with nowhere to land.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The fraud the check-sum cannot catch',
          text: 'Overlapping categories can still produce a table whose sum checks: if "bus" and "school bus" are two rows and the 6 bus-riders split between them, the column may still total 20 — while every rider\u2019s answer was really counted in a row they did not mean. The sum certifies that *no answer was lost or doubled*; it cannot certify that the rows *mean* one thing each. Overlaps are diagnosed by reading the category names, not the column — which is why the names are written before the collecting starts.',
        },
        {
          kind: 'para',
          text: 'Coverage has a standing tool: the **"other" row**. A travel survey that lists walk/bus/cycle/car/train and adds *other* has a roof over every answer no matter what the class says — and the check-sum stays enforceable. The "other" row is not laziness; it is the honesty row, and its frequency is itself information (a large "other" says the category list was drawn too narrow and should be redrawn next time).',
        },
        { kind: 'heading', text: 'Reading tallies at sight: the gates' },
        {
          kind: 'para',
          text: 'Reading a finished tally is arithmetic the fingers already know: **count the gates, multiply by five, add the leftovers** — gates × 5 + leftovers. One gate and three leftovers is $5 + 3 = 8$. Two gates and two leftovers is $10 + 2 = 12$. Three gates alone is 15. And four open strokes is **not** a gate: |||| = 4 — the gate closes only when the fifth stroke crosses. The reading rule is worth a formula card, because it is the whole skill:',
        },
        {
          kind: 'equation',
          latex: '\\text{tally of } n \\text{ strokes} \\;=\\; \\underbrace{\\lfloor n/5 \\rfloor \\times 5}_{\\text{gates}} \\;+\\; \\underbrace{n \\bmod 5}_{\\text{leftovers}}',
          note: '**Reading a tally (tag 2).** Gates first, leftovers after — |||| ||| reads $5 + 3 = 8$; two gates and four leftovers read $10 + 4 = 14$. The remainder is chapter 2\u2019s division-with-remainder, worn as pencil marks.',
        },
        { kind: 'heading', text: 'A second dataset: when the answers are numbers' },
        {
          kind: 'para',
          text: 'Nothing in the method cares whether the answers are words or numbers. Ask the same fifteen students their shoe sizes and the answers come back numeric — 4, 5, 4, 6, 5, 5, 4, 5, 6, 5, 4, 5, 5, 4, 5 — and the tally pass works identically, one row per size: size 4 closes one gate (5); size 5 closes one gate and adds three (8); size 6 stands two strokes (2). The check: $5 + 8 + 2 = 15$ ✓. The most common answer is size 5 — eight of fifteen students, a share of $8/15 \\approx 53\\%$. (That "most common answer" idea has a name — the **mode** — and it gets the definition it deserves in 10.4; here it is only named.)',
        },
        {
          kind: 'para',
          text: 'Numeric answers earn one extra courtesy: their rows have a natural **order** (4, then 5, then 6), so the table can be read as a shape — rising to size 5 and falling after — in a way the travel table (walk/bus/cycle/car) cannot. That order-reading is the seed of the graphs this chapter grows next: 10.2 turns tables into pictures.',
        },
        {
          kind: 'example',
          title: 'Build the frequency table for the shoe-size data of fifteen students, and name the most common size.',
          steps: [
            'Now, the answers are numeric — 4, 5, 4, 6, 5, 5, 4, 5, 6, 5, 4, 5, 5, 4, 5 — and the rows are the sizes themselves, in order.',
            'So the tally pass lands one stroke per answer: size 4 closes one gate (5); size 5 closes one gate and adds three (8); size 6 stands two strokes (2).',
            'And the check: $5 + 8 + 2 = 15$ ✓ — the column rebuilds the fifteen answers.',
            'Hence: size 5 is the most common (8 of 15, a share of $8/15 \\approx 53\\%$) — and the rows\u2019 natural order lets the table be read as a shape: up to 5, down after.',
          ],
        },
        { kind: 'heading', text: 'The table in percents: relative frequency' },
        {
          kind: 'para',
          text: 'One more dress, and it cashes chapter 5 directly. The frequency 8 means little until it is compared with the total — *8 out of how many?* The **relative frequency** of a category is its fraction of the answers, $f/N$ — 8/20 for the walkers — and chapter 5\u2019s conversion map turns it into a percent at a hop: $8/20 = 2/5 = 40\\%$. The full table in percents: walk 40%, bus 30%, cycle 20%, car 10% — and the percents **sum to exactly 100**, which is the check-sum law wearing its second dress: if the percents total 99.3 or 101, some row\u2019s fraction was mis-cut.',
        },
        {
          kind: 'para',
          text: 'The comparisons the raw list hid are now one subtraction each: walkers outnumber bus-riders by 10 percentage points; a walker is four times as likely as a car-rider ($40\\% \\div 10\\% = 4$); walkers and cyclists together are $40\\% + 20\\% = 60\\%$ — three-and-a-half times the car share. The lesson\u2019s harvest:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'data is the collected answers; one answer is an observation, the crowd is the data;',
            'the raw list records but does not read — counting by re-reading blurs;',
            'the tally pass: one stroke per answer into its row; the fifth stroke closes the gate;',
            'read tallies as gates × 5 + leftovers — |||| ||| is 8, |||| is 4, never 5;',
            'the frequency is the row\u2019s count; the frequency table lists every category with its frequency;',
            'the check-sum law: $\\Sigma f = N$ — the table checks itself (and the percents sum to 100);',
            'categories are decided BEFORE collecting: no overlaps, no orphans, an "other" row for honesty;',
            'relative frequency $f/N$ turns the table into fractions and percents — chapter 5\u2019s clothes.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'Data-table items are permanent citizens of every quantitative paper: SSC CGL/CHSL and RRB NTPC present a frequency table and ask for the total, the most/least frequent category, or a difference between rows — exactly the glance-reading this lesson builds, with the check-sum law as the 10-second verification no one uses and everyone should; banking prelims wrap the same tables in "what percent of the total…" items, which are this lesson\u2019s relative frequencies in exam dress. Teacher-eligibility papers (CTET and state TETs) ask the pedagogy: why teach tally marks at all — the answer is the raw-list trap of this lesson\u2019s second paragraph, plus the five-bar gate\u2019s countability. NTSE and Olympiad tabulature items lean on the check-sum law directly (a missing frequency to be recovered from the total). Shapes cited, none reproduced.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'A notch for a thing — the oldest arithmetic we can see',
          text: 'The tally stroke is very possibly the oldest piece of mathematics that survives in the archaeological record: the **Ishango bone**, a notched baboon fibula from roughly 20,000 years ago (found at Lake Edward, central Africa), carries rows of cut marks that many researchers read as tallies — an interpretation honestly disputed, since notches can be decorative; what is not disputed is that notched bones tens of millennia old look exactly like counting. Shepherds notched a stick per sheep and matched the notches at evening; the method never needed a numeral. The idea was still running the world\u2019s finances within living memory: English Exchequer **tally sticks** — hazelwood sticks notched for sums owed and then **split lengthwise** so creditor and Crown held matching halves, a receipt that could not be forged without the other half — remained legal tender-adjacent paperwork for some six centuries, until the Treasury finally modernised in 1834 and burned the accumulated sticks in a stove: the fire that, by bad luck and bad chimneys, destroyed the Palace of Westminster. A pencil stroke in a surveyor\u2019s notebook, a shepherd\u2019s notch, a kingdom\u2019s accounting — one idea, tens of thousands of years young: **one mark, one thing, and the marks stay honest because they stay countable.**',
        },
        {
          kind: 'formula',
          name: 'The check-sum law',
          latex: 'f_1 + f_2 + \\cdots + f_k = N',
          note: 'The frequency column of every honest frequency table sums to the number of answers — the table checks itself. The percents dress sums to 100.',
        },
        {
          kind: 'formula',
          name: 'Reading a tally',
          latex: '\\text{gates} \\times 5 + \\text{leftovers}',
          note: 'One closed gate = 5 (the fifth stroke crosses the four). |||| ||| = 5 + 3 = 8; two gates + four leftovers = 14; four open strokes = 4, never 5.',
        },
        {
          kind: 'formula',
          name: 'Relative frequency',
          latex: 'f_i / N',
          note: 'The category\u2019s share of the answers — 8/20 = 2/5 = 40% (5.4\u2019s two-hop law). The relative frequencies sum to exactly 1.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Data',
              def: 'The collection of answers (observations) gathered about a question — each answer one value of the quantity asked about. One answer is an observation; the crowd is the data.',
            },
            {
              term: 'Raw data',
              def: 'The answers exactly as collected, in the order they came — honest and complete, organised for recording but not for reading.',
            },
            {
              term: 'Observation (response)',
              def: 'A single answer in the data — one student\u2019s "walk", one measured value. The unit of which the data is the whole.',
            },
            {
              term: 'Category',
              def: 'One row of the tally — an answer-type the question allows. Categories must not overlap and must cover every answer; decided before collecting.',
            },
            {
              term: 'Tally mark',
              def: 'One stroke = one answer, drawn in the answer\u2019s row. A physical receipt: no answer thought twice, no answer skipped.',
            },
            {
              term: 'Five-bar gate',
              def: 'The fifth tally stroke drawn crossing the four — a closed package of exactly 5, readable at sight. The hand\u2019s signature: five fingers, one gate.',
            },
            {
              term: 'Frequency',
              def: 'The number of answers in a category — the row\u2019s tally written as a number: read as gates × 5 + leftovers.',
            },
            {
              term: 'Frequency table',
              def: 'The category–tally–frequency table: the same answers as the raw list, sorted by question — and self-checking via Σf = N.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'In a tally, the fifth stroke is drawn',
              options: [
                'crossing through the four strokes, closing the gate',
                'longer than the other four',
                'in a different colour',
                'on the next line, to keep groups of four',
              ],
              answer: 0,
              explain:
                'The five-bar gate: the fifth stroke CROSSES the four, making a closed package of exactly five that the eye reads without counting (Option 1). Option 2 would make groups hard to tell apart. Option 3 changes nothing about countability — colour is not the mechanism. Option 4 describes the bug, not the feature: ungrouped strokes blur.',
            },
            {
              q: 'In the travel survey, walk has frequency 8 of 20 answers. Walkers are what percent of the class?',
              options: ['$8\\%$', '$18\\%$', '$40\\%$', '$80\\%$'],
              answer: 2,
              explain:
                'Relative frequency: $8/20 = 2/5 = 40\\%$ (Option 3) — chapter 5\u2019s two-hop law. Option 1 copies the frequency and calls it a percent. Option 2 is 8/20 mis-cut by a factor of ten. Option 4 is 8 of 10 — the wrong denominator.',
            },
            {
              q: 'A tally row shows two closed gates followed by ||||. It reads',
              options: ['$9$', '$12$', '$14$', '$15$'],
              answer: 2,
              explain:
                'Gates first, leftovers after: $2 \\times 5 + 4 = 14$ (Option 3). Option 1 read one gate. Option 2 read two gates + 2 — the leftovers were miscounted. Option 3\u2019s neighbour counts three gates, but only two are closed.',
            },
            {
              q: 'A survey collected 24 answers; three rows of its frequency table read 9, 7 and 5. The fourth row\u2019s frequency must be',
              options: ['$2$', '$3$', '$4$', '$5$'],
              answer: 1,
              explain:
                'The check-sum law: the column must rebuild 24, so the last row is $24 - (9 + 7 + 5) = 24 - 21 = 3$ (Option 2). Option 1 drops one too many. Options 3 and 4 do not close the sum — the table would confess itself wrong.',
            },
            {
              q: 'For a tally table to be buildable at all, the categories must',
              options: [
                'overlap slightly, so nothing is missed',
                'not overlap, and together cover every possible answer',
                'be exactly five in number',
                'be listed alphabetically',
              ],
              answer: 1,
              explain:
                'The partition: no overlaps (no answer counted twice) and full coverage (no answer stranded) — only then does the check-sum law hold (Option 2). Option 1 is the fraud the sum cannot catch. Option 3 is the gate\u2019s business, not the categories\u2019. Option 4 is a filing habit, not a mathematical requirement.',
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
                  q: 'Read each tally: (i) ||||; (ii) |||| ||; (iii) three closed gates.',
                  solution: [
                    'Now, read gates first, leftovers after.',
                    'So (i) four open strokes — the gate never closed: $4$. (ii) one gate + 2: $5 + 2 = 7$.',
                    'And (iii) three closed gates: $3 \\times 5 = 15$, no leftovers.',
                    'Hence 4, 7 and 15 — the gates carry the fives; the leftovers carry the rest.',
                  ],
                  answer: '(i) 4; (ii) 7; (iii) 15',
                },
                {
                  q: 'How would you draw the tally for 9 answers? Describe the strokes.',
                  solution: [
                    'Now, $9 = 5 + 4$: one gate plus four leftovers.',
                    'So draw four strokes, cross the fifth through them (the gate closes at 5), then stand four more open strokes.',
                    'And the reading checks: $1 \\times 5 + 4 = 9$. ✓',
                    'Hence: one closed gate and four open strokes — |||| with a strike, then ||||.',
                  ],
                  answer: 'One gate (five strokes, the fifth crossing) + four open strokes = 9',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'From the travel table (walk 8, bus 6, cycle 4, car 2): how many more students walk than cycle?',
                  solution: [
                    'Now, the two frequencies are 8 and 4.',
                    'So the difference is $8 - 4 = 4$ — four more walkers than cyclists.',
                    'And the raw list hid this completely: finding it there meant nine re-reads; the table hands it over in one glance.',
                    'Hence 4 — the first dividend of sorting by question.',
                  ],
                  answer: '$4$ more students walk than cycle',
                },
                {
                  q: 'Run the check-sum law on the travel table.',
                  solution: [
                    'Now, add the frequency column: $8 + 6 + 4 + 2$.',
                    'So the sum is $20$ — and the survey collected 20 answers.',
                    'And $20 = 20$ ✓: no answer lost, none counted twice — the table is certified by its own column.',
                    'Hence the check passes: $\\Sigma f = N = 20$.',
                  ],
                  answer: '$8 + 6 + 4 + 2 = 20 = N$ ✓',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'A survey collected 25 answers, but a student\u2019s table reads 9, 8, 4, 2. Find the fault with the check-sum law, and say what it proves.',
                  solution: [
                    'Now, add the column: $9 + 8 + 4 + 2 = 23$.',
                    'So the table claims 23 answers — but 25 were collected: the check fails ($23 \\ne 25$) by exactly 2.',
                    'And the law\u2019s verdict: two answers were LOST in the tally pass — skipped, or dropped when a page turned. (Had the sum been 27, two answers would have been counted twice.)',
                    'Hence the table is wrong, not the survey: re-run the tally pass — this is the check-sum law doing the job no eyeball can.',
                  ],
                  answer: 'The column sums to 23, not 25 — two answers were lost in the tallying',
                },
                {
                  q: 'Express the bus row (6 of 20) as a fraction in lowest terms and as a percent.',
                  solution: [
                    'Now, the relative frequency is $6/20$.',
                    'So reduce by the HCF (chapter 3): $6/20 = 3/10$.',
                    'And the percent dress is a single hop (5.4\u2019s map): $3/10 = 30\\%$.',
                    'Hence 3/10 = 30% — nearly a third of the class rides the bus.',
                  ],
                  answer: '$6/20 = 3/10 = 30\\%$',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'The shoe-size data of fifteen students gives frequencies 4: 5, 5: 8, 6: 2. Which size is most common, and what share of the class does it wear?',
                  solution: [
                    'Now, the largest frequency is 8, in the size-5 row.',
                    'So size 5 is the most common answer — the mode, named here and defined in 10.4.',
                    'And its share: $8/15 \\approx 0.533$, a little over half the class.',
                    'Hence size 5, worn by 8 of 15 students (≈ 53%).',
                  ],
                  answer: 'Size 5 — 8 of 15, 8/15 ≈ 53%',
                },
                {
                  q: 'A classmate\u2019s survey uses the categories "walk" and "on foot" as two separate rows. Diagnose the design fault, and say why the check-sum law cannot catch it.',
                  solution: [
                    'Now, the two categories overlap: a student who walks to school fits BOTH rows.',
                    'So during the tally pass the keeper must choose — and whichever row receives the stroke, the table now means something different from what was asked.',
                    'And the check-sum cannot protest: if the keeper still lands every answer somewhere, the column sums to $N$ and the table looks perfectly healthy. The fraud is in the category names, not the column.',
                    'Hence the fault is semantic: overlapping categories violate the one-answer-one-row promise even when the sum checks. The cure is merging (or sharpening) the rows — before collecting.',
                  ],
                  answer: 'Overlapping categories — the sum still checks, but no row means one thing; merge the rows before collecting',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'An eye-colour survey of 20 students uses rows brown, black, hazel, green, other, with frequencies 7, 8, 2, 1, 2. Verify the table and name the most common colour.',
                  solution: [
                    'Now, the check-sum first: $7 + 8 + 2 + 1 + 2 = 20$ ✓ — the table is certified.',
                    'So the largest frequency is 8, in the black row: black is the most common eye colour.',
                    'And note the "other" row doing its honest work: 2 students did not fit the four named colours, and the roof kept the sum enforceable.',
                    'Hence the table checks ($20 = 20$); black leads with 8 of 20 — 40%.',
                  ],
                  answer: 'Σf = 20 ✓; black is most common (8 of 20 = 40%)',
                },
                {
                  q: 'A live tally\u2019s walk row reads 8 when three more walkers record themselves. What does the row read after, and how is it grouped?',
                  solution: [
                    'Now, three more strokes land: $8 + 3 = 11$.',
                    'So the row re-groups: $11 = 2 \\times 5 + 1$ — two gates and one leftover.',
                    'And live tallies regroup themselves naturally: the tenth stroke closes the second gate, the eleventh stands alone.',
                    'Hence 11 = two gates + 1 leftover — the reading rule applied mid-survey.',
                  ],
                  answer: '11 — two closed gates and one open stroke',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the check-sum law: if the categories of a survey do not overlap and together cover every answer, then the frequency column sums to $N$.',
                  solution: [
                    'Now, the two conditions are exactly the partition: each of the $N$ answers belongs to at least one row (coverage) and to at most one row (no overlap) — so each belongs to EXACTLY one row.',
                    'So add the frequencies $f_1 + f_2 + \\cdots + f_k$: each $f_i$ counts its row\u2019s answers once, and because the rows share no answer, no answer is counted in two terms.',
                    'And because the rows miss no answer, no answer is missing from any term — the sum counts every one of the $N$ answers exactly once.',
                    'Hence $f_1 + f_2 + \\cdots + f_k = N$ — chapter 3\u2019s no-double-counting, no-loss discipline, promoted to a law with a proof. Break either condition and the sum stops testifying: that is why the categories are written before the strokes.',
                  ],
                  answer: '$\\Sigma f = N$ — the partition counts every answer exactly once; both conditions are load-bearing',
                },
                {
                  q: 'A travel survey with rows walk/bus/cycle/car collects its class\u2019s 20 answers, but one student travels by train — and the tally-keeper, mid-survey, quietly counts them under "bus". Diagnose every dishonesty here, and give the cure.',
                  solution: [
                    'Now, the immediate wrong: the train answer was recorded as a bus-ride — a false certificate; the bus frequency now contains a rider it does not describe.',
                    'So the deeper wrong: the row list was drawn too narrow, with no roof — the survey had no row where the train answer could land honestly.',
                    'And the cure is structural, not local: add an "other" row (or widen the categories) — and decide it BEFORE collecting, because a category added afterwards cannot be tallied without re-asking.',
                    'Hence: one mis-filed answer is the symptom; the disease is categories chosen carelessly. The check-sum would still have passed — which is exactly why category design, not arithmetic, is where survey honesty lives.',
                  ],
                  answer: 'The train answer was mis-filed as a bus-ride (a false certificate); the row list lacked coverage. Cure: an "other" row (or wider list), decided before collecting',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-bar-charts-line-graphs-and-pie-charts',
      number: '10.2',
      title: 'Bar Charts, Line Graphs and Pie Charts',
      concepts: [
        'One table, three pictures',
        'The bar chart — the tally standing up',
        'The scale — the y-axis is a ruler',
        'The line graph — data with order (time)',
        'The interpolation caution — segments guess',
        'The pie chart — parts of one whole',
        'The central-angle law θ = (f/N) × 360°',
        'Which graph for which data',
      ],
      objectives: [
        'Draw and read a bar chart from a frequency table: equal-width bars in equal steps, the y-axis ruled as honestly as a ruler, the height \u00d7 the scale reading rule',
        'Prove the bar-scale law — a bar\u2019s height in axis-steps IS the frequency, so doubling the answers doubles the bar — and choose an honest scale (equal steps covering the data)',
        'Draw and read a line graph for ordered data (a time series): plot the points, join consecutive points, read each segment\u2019s steepness as the change per interval',
        'State the interpolation caution: the segments between measured points are guesses, not measurements — and refuse line graphs for unordered categories',
        'Prove the central-angle law θ = (f/N) × 360° from the partition of 10.1, compute every slice angle from a frequency table, and name which graph fits which data shape',
      ],
      prerequisites: ['fm-collecting-and-tallying-data'],
      sources: ['ncert-ganita-prakash6-ch4', 'ncert-math8-ch4', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'The frequency table of 10.1 answers questions at a glance — *walk 8, bus 6, cycle 4, car 2* — but "a glance" still means reading four numbers and comparing them in your head. The next step of the data story asks more: can the numbers be made **visible**, so that the shape of the answers — biggest here, smallest there, the ratios between them — arrives in the eye before any arithmetic does? The answer took centuries to standardise and settled into exactly **three canonical pictures**, one per data shape: the **bar chart** for categories, the **line graph** for ordered (usually time) data, and the **pie chart** for parts of one whole. This lesson builds all three from tables this book already owns — and proves the two laws that make them honest.',
        },
        { kind: 'heading', text: 'The bar chart: the tally standing up' },
        {
          kind: 'para',
          text: 'The travel survey\u2019s four rows are **categories** — no order between them, no "between walk and bus". The natural picture keeps the rows side by side and lets each row\u2019s **frequency stand up as a height**: four bars of equal width on a baseline, one per category, with gaps between them (the gaps say: these are separate categories, not a scale). The y-axis is ruled like any ruler of 9.1 — equal steps, honestly labelled — and each bar\u2019s height in those steps is exactly its frequency.',
        },
        {
          kind: 'figure',
          caption:
            'The travel table as a bar chart. The y-axis runs 0 to 10 students in equal steps of 2 (one gridline per step — a ruler, not a decoration); each bar is 90 px wide with a gap before the next (categories are separate); the heights are 8 × 25 = 200, 6 × 25 = 150, 4 × 25 = 100 and 2 × 25 = 50 px. Reading needs no counting: the eye sees walk\u2019s bar twice cycle\u2019s and four times car\u2019s — the ratios of 10.1\u2019s frequencies, standing up.',
          svg: `<svg viewBox="0 0 780 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of the travel survey: walk 8, bus 6, cycle 4 and car 2 students, bars of equal width standing on a baseline, y-axis ruled 0 to 10 in steps of 2">
  <text x="390" y="24" font-size="13" fill="currentColor" text-anchor="middle">how the class travels — the bar chart (scale: 1 gridline step = 2 students)</text>
  ${(() => {
    let out = '';
    for (let v = 0; v <= 10; v += 2) {
      const y = 310 - v * 25;
      out += `<line x1="90" y1="${y}" x2="690" y2="${y}" stroke="currentColor" stroke-width="${v === 0 ? 1.4 : 0.6}" opacity="${v === 0 ? 1 : 0.45}"/>`;
      out += `<text x="82" y="${y + 4}" font-size="11" fill="currentColor" text-anchor="end">${v}</text>`;
    }
    return out;
  })()}
  <text x="60" y="30" font-size="11" fill="currentColor" opacity="0.9">students</text>
  ${(() => {
    const rows: Array<[string, number]> = [['walk', 8], ['bus', 6], ['cycle', 4], ['car', 2]];
    let out = '';
    rows.forEach(([name, f], i) => {
      const cx = 165 + 150 * i, h = f * 25;
      out += `<rect x="${cx - 45}" y="${310 - h}" width="90" height="${h}" fill="none" stroke="currentColor" stroke-width="1.3"/>`;
      out += `<text x="${cx}" y="${310 - h - 8}" font-size="13" fill="currentColor" font-weight="bold" text-anchor="middle">${f}</text>`;
      out += `<text x="${cx}" y="332" font-size="13" fill="currentColor" text-anchor="middle">${name}</text>`;
    });
    return out;
  })()}
  <text x="390" y="362" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">the categories of 10.1\u2019s table — no order between them, hence the gaps</text>
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Bar chart',
          text: 'A **bar chart** is said to be a picture of a frequency table in which **each category owns one bar of equal width, standing on a common baseline, whose height (measured on an equally-stepped, labelled axis) is the category\u2019s frequency**. The bars carry gaps between them because the categories are separate kinds, not points on a scale.',
        },
        {
          kind: 'derivation',
          title: 'The bar-scale law: a bar\u2019s height in axis-steps IS its frequency',
          statement:
            'An axis is ruled in equal steps of $s$ (here, one gridline per 2 students). Show that a frequency $f$ drawn at that scale stands $f \\div s$ steps tall — so doubling the answers doubles the bar, and reading is one division.',
          steps: [
            {
              label: 'The axis is a ruler with a unit',
              formula: '1 \\text{ gridline step} = s \\text{ students}',
              explanation:
                'The equal steps are the chart\u2019s unit — 9.1\u2019s agreement, wearing graph paper: each step names a fixed number of answers, and the step must never change mid-axis.',
            },
            {
              label: 'Count the answers in steps',
              formula: 'f \\text{ students} = \\frac{f}{s} \\text{ steps}',
              explanation:
                '8 students on a scale of 2 fill $8/2 = 4$ steps — the same count-of-units logic as 9.1\u2019s desk in handspans, now vertical.',
            },
            {
              label: 'So the bar\u2019s height is proportional, and reading inverts it',
              formula: '\\text{height} = f \\times s \\quad\\Longleftrightarrow\\quad f = \\frac{\\text{height}}{s}',
              explanation:
                'Drawing multiplies by the scale; reading divides. Double the answers, double the height — the eye reads ratios without arithmetic: cycle\u2019s bar (4) is visibly twice car\u2019s (2).',
            },
          ],
          result: 'The bar-scale law: $\\text{height} = f \\times s$ — the bar is the tally standing up, and the axis steps are its units.',
        },
        {
          kind: 'equation',
          latex: '\\text{height} = f \\times s, \\qquad f = \\frac{\\text{height}}{s}',
          note: '**The bar-scale law (tag 1).** Drawing multiplies by the scale, reading divides. 150 px at 25 px/student reads $150 \\div 25 = 6$ students — and any axis whose steps are unequal or unlabelled has abandoned the law (10.3 turns this into the whole anatomy of lying charts).',
        },
        {
          kind: 'para',
          text: 'The **scale is a free choice** — 25 px per student, or 10, or 40 — but the freedom is bounded by honesty. The steps must be **equal** (a ruler with wobbly units measures nothing), **labelled** (a naked axis is a claim with no receipt), and **wide enough to cover the data** (the tallest frequency must land inside the axis — a bar that escapes the top gridline is a confession of scale, not a marvel). For 8/6/4/2, steps of 2 over 0..10 give five comfortable bands; steps of 1 would crowd, steps of 5 would flatten everything into two gridlines and hide the cycle-car contrast.',
        },
        {
          kind: 'example',
          title: 'Draw the travel survey as a bar chart: choose the scale, compute the heights, and state what a 120 px bar would mean.',
          steps: [
            'Now, the data tops out at 8, so an axis of 0..10 in steps of 2 covers it with room to breathe — the scale is $s = 25$ px per student.',
            'So the heights: $8 \\times 25 = 200$, $6 \\times 25 = 150$, $4 \\times 25 = 100$, $2 \\times 25 = 50$ px.',
            'And a 120 px bar reads $120 \\div 25 = 4.8$ — which no frequency here takes, because frequencies of whole answers stand on whole steps of the drawing (a 4.8 would need a new survey).',
            'Hence the chart: four equal-width bars at 200/150/100/50 px on a 0..10 axis in steps of 2 — the table, standing up.',
          ],
        },
        { kind: 'heading', text: 'The line graph: data with order' },
        {
          kind: 'para',
          text: 'The travel categories have no order — but plenty of data does. Measure a sapling every second day and the observations arrive **in time order**: day 0, 8 cm; day 2, 11; day 4, 16; day 6, 18; day 8, 25; day 10, 28. Ordered data earns a picture the bar chart cannot give: the **line graph**, where each observation is a point and consecutive points are joined by straight segments. The horizontal axis now carries the **order** (the days), the vertical axis the measured value — and the segments let the eye read **change**: a steep segment is fast growth, a flat one a pause.',
        },
        {
          kind: 'figure',
          caption:
            'The sapling watch as a line graph. Six measured points (day, height) joined by five segments; the cm-axis ruled in equal steps of 10. The steepness IS the growth rate: days 6→8 rises 7 cm in 2 days (the fastest stretch), days 4→6 only 2 cm (the quietest), and the segment changes +3 +5 +2 +7 +3 rebuild the total 20 cm climb. The dashed guide at day 5 marks the honesty line: the graph can GUESS 17 cm there (the segment\u2019s midpoint) but no measurement was taken — between points, the line is a straight-line guess, not data.',
          svg: `<svg viewBox="0 0 780 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line graph of a sapling measured every two days: heights 8, 11, 16, 18, 25 and 28 cm on days 0, 2, 4, 6, 8 and 10, joined by five segments, with a dashed guide at day 5">
  <text x="390" y="24" font-size="13" fill="currentColor" text-anchor="middle">the sapling watch — a line graph of ordered measurements (scale: 1 cm = 8 px)</text>
  ${(() => {
    let out = '';
    for (let v = 0; v <= 30; v += 10) {
      const y = 310 - v * 8;
      out += `<line x1="90" y1="${y}" x2="690" y2="${y}" stroke="currentColor" stroke-width="${v === 0 ? 1.4 : 0.6}" opacity="${v === 0 ? 1 : 0.45}"/>`;
      out += `<text x="82" y="${y + 4}" font-size="11" fill="currentColor" text-anchor="end">${v}</text>`;
    }
    for (let d = 0; d <= 10; d += 2) {
      const x = 90 + 60 * d;
      out += `<text x="${x}" y="332" font-size="11" fill="currentColor" text-anchor="middle">${d}</text>`;
    }
    return out;
  })()}
  <text x="80" y="56" font-size="11" fill="currentColor" text-anchor="end" opacity="0.9">cm</text>
  <text x="390" y="362" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.75">day since planting</text>
  <line x1="390" y1="205" x2="390" y2="310" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" opacity="0.6"/>
  <line x1="390" y1="310" x2="390" y2="316" stroke="currentColor" stroke-width="1"/>
  <text x="390" y="332" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.85">5</text>
  <text x="396" y="296" font-size="10" fill="currentColor" text-anchor="start" opacity="0.8">day 5? a guess, not a measurement</text>
  ${(() => {
    const days = [0, 2, 4, 6, 8, 10];
    const h = [8, 11, 16, 18, 25, 28];
    const pts = days.map((d, i) => [90 + 60 * d, 310 - 8 * h[i]] as [number, number]);
    let out = '';
    for (let i = 1; i < pts.length; i++) {
      out += `<line x1="${pts[i - 1][0]}" y1="${pts[i - 1][1]}" x2="${pts[i][0]}" y2="${pts[i][1]}" stroke="currentColor" stroke-width="1.5"/>`;
    }
    pts.forEach((p, i) => {
      out += `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="currentColor"/>`;
      // the first point labels below-right (no incoming segment there); the
      // rest label upper-left (clear of the rising outgoing segments).
      if (i === 0) {
        out += `<text x="${p[0] + 7}" y="${p[1] + 16}" font-size="11" fill="currentColor" text-anchor="start">${h[i]}</text>`;
      } else {
        out += `<text x="${p[0] - 7}" y="${p[1] - 4}" font-size="11" fill="currentColor" text-anchor="end">${h[i]}</text>`;
      }
    });
    return out;
  })()}
</svg>`,
        },
        {
          kind: 'callout',
          tone: 'definition',
          title: 'Line graph',
          text: 'A **line graph** is said to be a picture of **ordered data** in which each observation is a **point** (its order on the horizontal axis, its value on the vertical) and **consecutive points are joined by straight segments**. The horizontal axis carries the ordering — usually time; the vertical axis carries the measurement, on an equally-stepped scale like any ruler.',
        },
        {
          kind: 'para',
          text: 'Reading a line graph is reading **slopes**. Each segment spans one interval between measurements, and its steepness is the change per interval: the sapling gains 3 cm (days 0→2), then 5, then only 2 (days 4→6, the quietest), then a spurt of 7 (days 6→8, the fastest), then 3. The changes even **check themselves**, in 10.1\u2019s style: $3 + 5 + 2 + 7 + 3 = 20$ — the segment changes rebuild the total climb from 8 to 28. No arithmetic is needed to SEE which stretch was fastest: the eye compares steepnesses, which is exactly what the picture is for.',
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: 'The interpolation caution: between points, the line guesses',
          text: 'The dashed guide at day 5 asks a question the data cannot answer: how tall was the sapling on day 5? The segment offers $(16 + 18)/2 = 17$ cm — the straight-line guess — but no one measured day 5, and growth was not consulting our graph. A line graph joins **measured** points; everything between them is interpolation, an honest guess at best and a fiction at worst. And when the horizontal axis carries **unordered categories** (walk, bus, cycle, car), the guess is not even wrong: "between walk and bus" names nothing, so no line may be drawn at all — a line graph demands order.',
        },
        { kind: 'heading', text: 'The pie chart: parts of one whole' },
        {
          kind: 'para',
          text: 'The third picture answers a different question. Not "how many in each row?" but "**what share of the class is each row?**" — the relative frequencies of 10.1 (40%, 30%, 20%, 10%) drawn as **slices of one circle**. The whole class is the whole pie; each category\u2019s share of the answers becomes that category\u2019s share of the turn. A pie chart needs its data to be exactly that — parts of ONE whole — and it says so in its geometry:',
        },
        {
          kind: 'derivation',
          title: 'The central-angle law: a category\u2019s slice is its share of the turn',
          statement:
            'A survey\u2019s $N$ answers are partitioned into categories (10.1\u2019s law). Show that category $i$, with frequency $f_i$, owns a pie slice of central angle $\\theta_i = \\dfrac{f_i}{N} \\times 360°$ — and that the slices close on a full circle.',
          steps: [
            {
              label: 'The whole turn is the whole class',
              formula: 'N \\text{ answers} \\leftrightarrow 360°',
              explanation:
                'The pie is a promise: the full circle stands for all $N$ answers, exactly as the table\u2019s total does. One full turn — 360° — is the whole.',
            },
            {
              label: 'Each answer spends an equal share of turn',
              formula: '1 \\text{ answer} \\leftrightarrow \\frac{360°}{N}',
              explanation:
                'The partition gives every answer equal standing, so each one spends $360/N$ of turn — 18° each when $N = 20$.',
            },
            {
              label: 'A category with f answers spends f of those shares',
              formula: '\\theta = f \\times \\frac{360°}{N} = \\frac{f}{N} \\times 360°',
              explanation:
                'Walk\u2019s 8 answers spend $8 \\times 18° = 144°$ — two-fifths of the turn, exactly the 40% that 10.1\u2019s relative frequency already knew.',
            },
            {
              label: 'The slices close',
              formula: '\\sum \\theta_i = \\frac{\\Sigma f_i}{N} \\times 360° = 360°',
              explanation:
                'By the check-sum law $\\Sigma f_i = N$, so the angles total exactly one full turn — the slices tile the circle with no gap and no overlap, the partition drawn in ink.',
            },
          ],
          result: '$\\theta_i = \\frac{f_i}{N} \\times 360°$ — the travel survey: walk $8/20 \\to 144°$, bus $6/20 \\to 108°$, cycle $4/20 \\to 72°$, car $2/20 \\to 36°$, and $144 + 108 + 72 + 36 = 360°$ ✓',
        },
        {
          kind: 'equation',
          latex: '\\theta_i = \\frac{f_i}{N} \\times 360°',
          note: '**The central-angle law (tag 2).** The slice angle is the category\u2019s fraction of the whole turn — 5.4\u2019s percents multiplied by 3.6. A 40% share owns 144°; a quarter owns 90°; half owns 180° (a diameter).',
        },
        {
          kind: 'table',
          caption:
            'From the frequency table to the pie: each row\u2019s fraction (10.1), each row\u2019s percent (5.4), each row\u2019s angle. The bottom line is the check-sum law in its third dress — the angles, like the frequencies and the percents, must close on the whole.',
          head: ['Category', 'Frequency $f$', 'Fraction $f/N$', 'Percent', 'Central angle $\\theta = (f/N) \\times 360°$'],
          rows: [
            ['walk', '8', '2/5', '40%', '144°'],
            ['bus', '6', '3/10', '30%', '108°'],
            ['cycle', '4', '1/5', '20%', '72°'],
            ['car', '2', '1/10', '10%', '36°'],
            ['**total**', '**20**', '**1**', '**100%**', '**360°**'],
          ],
        },
        {
          kind: 'figure',
          caption:
            'The travel survey as a pie chart, drawn from the angle table: starting at 12 o\u2019clock and turning clockwise, walk\u2019s radius sweeps 144°, bus\u2019s the next 108°, cycle\u2019s the next 72°, car\u2019s the last 36° — the four sectors sum to the whole circle exactly, because the four rows sum to the whole class. Each slice carries its category and its percent. One glance answers the share-question the bar chart answers only by comparing heights against the axis.',
          svg: `<svg viewBox="0 0 780 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pie chart of the travel survey: four sectors of 144, 108, 72 and 36 degrees for walk 40%, bus 30%, cycle 20% and car 10%, starting at 12 o'clock and turning clockwise">
  <text x="390" y="24" font-size="13" fill="currentColor" text-anchor="middle">the travel survey as a pie — each slice is its share of the turn</text>
  ${(() => {
    const cx = 330, cy = 190, r = 140;
    const sectors: Array<[string, number, number, number]> = [['walk', 40, 144, 8], ['bus', 30, 108, 6], ['cycle', 20, 72, 4], ['car', 10, 36, 2]];
    let a0 = 0, out = '';
    sectors.forEach(([name, pc, span, f], si) => {
      const a1 = a0 + span;
      const t0 = (a0 * Math.PI) / 180, t1 = (a1 * Math.PI) / 180;
      const x0 = cx + r * Math.sin(t0), y0 = cy - r * Math.cos(t0);
      const x1 = cx + r * Math.sin(t1), y1 = cy - r * Math.cos(t1);
      const large = span > 180 ? 1 : 0;
      out += `<path d="M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="currentColor" fill-opacity="${si % 2 === 0 ? 0.16 : 0.05}" stroke="currentColor" stroke-width="1.2"/>`;
      const tm = ((a0 + span / 2) * Math.PI) / 180;
      const lx = cx + 0.62 * r * Math.sin(tm), ly = cy - 0.62 * r * Math.cos(tm);
      out += `<text x="${lx.toFixed(1)}" y="${(ly - 2).toFixed(1)}" font-size="11.5" fill="currentColor" text-anchor="middle">${name}</text>`;
      out += `<text x="${lx.toFixed(1)}" y="${(ly + 12).toFixed(1)}" font-size="11" fill="currentColor" text-anchor="middle" opacity="0.85">${f} · ${pc}%</text>`;
      a0 = a1;
    });
    [0, 144, 252, 324].forEach((deg) => {
      const tb = (deg * Math.PI) / 180;
      const bx = cx + (r + 13) * Math.sin(tb), by = cy - (r + 13) * Math.cos(tb);
      out += `<text x="${bx.toFixed(1)}" y="${(by + 3).toFixed(1)}" font-size="9.5" fill="currentColor" text-anchor="middle" opacity="0.7">${deg}°</text>`;
    });
    out += `<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - r}" stroke="currentColor" stroke-width="1.3" stroke-dasharray="6 4" opacity="0.9"/>`;
    out += `<circle cx="${cx}" cy="${cy}" r="2.5" fill="currentColor"/>`;
    out += `<text x="390" y="350" font-size="10" fill="currentColor" text-anchor="middle" opacity="0.7">the dashed radius starts at 12 o'clock; the boundary degrees come from the angle table</text>`;
    return out;
  })()}
</svg>`,
        },
        {
          kind: 'example',
          title: 'Draw the pie for a survey of 12 friends whose favourite fruits are mango 4, banana 5, guava 3.',
          steps: [
            'Now, the fractions: $4/12 = 1/3$, $5/12$, $3/12 = 1/4$ — the check first: $4 + 5 + 3 = 12$ ✓.',
            'So the angles: $(1/3) \\times 360° = 120°$, $(5/12) \\times 360° = 150°$, $(1/4) \\times 360° = 90°$ — and $120 + 150 + 90 = 360°$ ✓.',
            'And the drawing: radius from the centre, first slice 120° (mango), then 150° (banana), then 90° (guava) — the circle closes on its own.',
            'Hence the pie: 120°/150°/90° — a third of the turn, five-twelfths, a quarter.',
          ],
        },
        { kind: 'heading', text: 'Which graph for which data' },
        {
          kind: 'table',
          caption:
            'The matching table — the data shape decides the picture. When a graph and its data disagree, the disagreement IS the story (10.3 reads such mismatches as lies).',
          head: ['Your data is…', 'Draw a…', 'Because', 'Refuse the…'],
          rows: [
            ['categories, no order (travel modes, eye colours)', 'bar chart', 'bars compare heights; gaps say "separate kinds"', 'line graph ("between walk and bus" names nothing)'],
            ['ordered values, usually time (a sapling, a temperature)', 'line graph', 'segments carry change; steepness is the rate', 'pie chart (time is not a part of a whole)'],
            ['parts of ONE whole (shares of one class, one budget)', 'pie chart', 'slices carry shares; the angles close on 360°', 'line graph (shares have no order to climb)'],
          ],
        },
        {
          kind: 'para',
          text: 'One forward sentence, and 10.3 owns the whole story: everything in this lesson assumed the **honest** drawing — equal steps, labelled axes, the scale declared. Drop any of those and the same table can be made to shout or whisper at will.',
        },
        {
          kind: 'para',
          text: 'The harvest, in the lesson\u2019s own order:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'one table, three pictures: bar for categories, line for order (time), pie for parts of one whole;',
            'the bar chart is the tally standing up — equal widths, honest gaps, the y-axis a ruler;',
            'the bar-scale law: height = $f \\times s$ and reading = height \u00f7 s; doubling the answers doubles the bar;',
            'the line graph joins consecutive MEASURED points; steepness = change per interval; the segment changes rebuild the total (+3 +5 +2 +7 +3 = 20);',
            'between points the line guesses — interpolation, not measurement; unordered categories get no line at all;',
            'the pie reserves the full turn for the whole class; the central-angle law $\\theta = (f/N) \\times 360°$ turns the relative frequencies into degrees;',
            'the slices close on 360° because the check-sum law says the frequencies close on N — the partition drawn in ink.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'Data-interpretation sets are the bread of every quantitative paper: SSC CGL/CHSL and banking prelims hand over a bar chart or pie chart and ask for totals, differences, percent shares and ratio comparisons — all of it this lesson\u2019s reading rules (height \u00f7 scale; $\\theta = (f/N) \\times 360°$) with the arithmetic of chapters 2 and 5 on top. RRB NTPC asks which-graph-suits-which-data as a standalone item. Pie-slice-angle construction from a table (the mango-banana-guava shape) is a class-8 board staple. CTET and state TETs ask the pedagogy: why bars before pies, why the equal-step axis matters — the answers are this lesson\u2019s derivations. Shapes cited, none reproduced.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'The inventor of the pictures — Playfair and Nightingale',
          text: 'All three pictures of this lesson trace to one restless Scottish engineer: **William Playfair** (1759–1823), a draftsman, economist and occasional smuggler who invented the **line and bar chart** in his *Commercial and Political Atlas* (1786) — perfect for what he called "linear arithmetic", comparing Britain\u2019s trade year by year — and then the **pie chart and circle graph** in his *Statistical Breviary* (1801), slicing the revenues of European states into shares of one whole. Statisticians of his day mostly shrugged; the pictures won anyway. The pie\u2019s most famous descendant belongs to India\u2019s own history of care: **Florence Nightingale\u2019s** polar-area diagram — the "rose" — sent to Queen Victoria in **1858** as *Diagram of the Causes of Mortality in the Army in the East*: twelve wedges, one per month of the Crimean War, each divided into causes of death, making it impossible for any minister to unsee that disease was killing far more soldiers than the enemy was. A graph, she proved, is an argument you can see — which is exactly why drawing it honestly (10.3) is a moral skill and not just a technical one.',
        },
        {
          kind: 'formula',
          name: 'The bar-scale law',
          latex: '\\text{height} = f \\times s, \\qquad f = \\frac{\\text{height}}{s}',
          note: 'Drawing multiplies by the scale (px per answer), reading divides. Equal steps, labelled, covering the data — or the chart is not a ruler.',
        },
        {
          kind: 'formula',
          name: 'The central-angle law',
          latex: '\\theta_i = \\frac{f_i}{N} \\times 360°',
          note: 'The slice angle is the category\u2019s share of the whole turn. Walk 8 of 20: $\\frac{8}{20} \\times 360° = 144°$. The slices close on 360° because the frequencies close on N.',
        },
        {
          kind: 'formula',
          name: 'The line-graph reading rule',
          latex: '\\text{steepness} = \\frac{\\text{change in value}}{\\text{one interval}}',
          note: 'Each segment\u2019s slope is the change per interval — days 6→8: $+7$ cm in 2 days, the fastest stretch. Between measured points the line guesses; beyond them it invents.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Bar chart',
              def: 'One equal-width bar per category on a common baseline, gaps between bars, the bar\u2019s height on an equally-stepped axis equal to its frequency.',
            },
            {
              term: 'Scale (of an axis)',
              def: 'The fixed number of answers (or cm, or degrees) that one axis step names — the chart\u2019s unit. Equal, labelled, covering the data.',
            },
            {
              term: 'Axis (x and y)',
              def: 'The two ruled references of a graph: the horizontal (categories or order) and the vertical (frequency or value), each as honest as a ruler.',
            },
            {
              term: 'Line graph',
              def: 'A picture of ordered data: each measurement a point, consecutive points joined by segments, steepness carrying the rate of change.',
            },
            {
              term: 'Interpolation',
              def: 'Reading a value BETWEEN measured points along the drawn segment — a straight-line guess (17 cm at day 5), never a measurement.',
            },
            {
              term: 'Pie chart',
              def: 'A circle cut into sectors, one per category, whose central angles are the categories\u2019 shares of one whole: $\\theta = (f/N) \\times 360°$.',
            },
            {
              term: 'Central angle',
              def: 'The angle a sector makes at the circle\u2019s centre — 8/20 of the answers own 8/20 of 360° = 144°.',
            },
            {
              term: 'Sector',
              def: 'One slice of the pie: two radii and the arc between them. The slices tile the circle exactly because the categories partition the answers.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'To picture "how the class travels" (walk/bus/cycle/car, no order), the right graph is',
              options: ['a line graph', 'a bar chart', 'a pie chart of the four bars', 'any of them equally'],
              answer: 1,
              explain:
                'The bar chart — the categories have no order, so a line would claim a gradient between "walk" and "bus" that names nothing (Option 2). A pie needs the data to be shares of one whole — this is, but the bar shows the counts more directly and a line is simply wrong here (Option 4 is the anything-works error; the shapes are not interchangeable).',
            },
            {
              q: 'In the travel pie, walk\u2019s slice (8 of 20 students) has central angle',
              options: ['$40°$', '$72°$', '$108°$', '$144°$'],
              answer: 3,
              explain:
                'The central-angle law: $(8/20) \\times 360° = 144°$ (Option 4). Option 1 is the percent wearing a degree sign. Option 2 is 20% of the turn — cycle\u2019s slice. Option 3 is bus\u2019s 108°. Percent × 3.6 converts.',
            },
            {
              q: 'The sapling graph: which stretch grew fastest?',
              options: [
                'days 0→2 (+3 cm)',
                'days 2→4 (+5 cm)',
                'days 6→8 (+7 cm)',
                'days 4→6 (+2 cm)',
              ],
              answer: 2,
              explain:
                'The steepest segment carries the fastest change: days 6→8 gains 7 cm in one interval (Option 3). Option 4 is the flattest. The eye reads it without arithmetic — that is what the picture is for.',
            },
            {
              q: 'A bar tops out 150 px above the baseline; the axis steps are 25 px per student. The bar reads',
              options: ['$4$ students', '$5$ students', '$6$ students', '$150$ students'],
              answer: 2,
              explain:
                'Reading divides by the scale: $150 \\div 25 = 6$ students (Option 3). Option 1 mis-multiplied. Option 2 mis-divided. Option 4 read the pixels as answers — the scale exists to be divided out.',
            },
            {
              q: 'A line graph is drawn with "walk, bus, cycle, car" along the horizontal axis. The deepest fault is that',
              options: [
                'the segments claim a gradient between categories that have no order',
                'the graph should have used colours',
                'the vertical axis should start at 8',
                'line graphs are always wrong',
              ],
              answer: 0,
              explain:
                '"Between walk and bus" names no data — the line invents a transition that does not exist (Option 1). Option 3 is 10.3\u2019s lying-baseline disease but not this one. Option 4 overshoots: line graphs are exactly right for ordered data.',
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
                  q: 'At a scale of 25 px per student, how tall do the bars for 3 students and for 7 students stand?',
                  solution: [
                    'Now, the bar-scale law: height = frequency \u00d7 scale.',
                    'So $3 \u00d7 25 = 75$ px and $7 \u00d7 25 = 175$ px.',
                    'And the ratio check: $7 \u00f7 3 \\approx 2.33$, and $175 \u00f7 75 \\approx 2.33$ — the bars inherit the frequencies\u2019 ratio. ✓',
                    'Hence 75 px and 175 px — drawing is one multiplication.',
                  ],
                  answer: '$75$ px and $175$ px',
                },
                {
                  q: 'On the same scale, two bars stand 100 px and 200 px tall. What frequencies do they read?',
                  solution: [
                    'Now, reading divides: $f = \\text{height} \u00f7 s$.',
                    'So $100 \u00f7 25 = 4$ and $200 \u00f7 25 = 8$.',
                    'And the second bar is visibly twice the first — the eye already knew the ratio before the division confirmed it.',
                    'Hence 4 students and 8 students.',
                  ],
                  answer: '$4$ students and $8$ students',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'A class of 20 has 5 students who prefer chess and 10 who prefer cricket. What central angles do these two slices own?',
                  solution: [
                    'Now, the central-angle law: $\\theta = (f/N) \u00d7 360°$.',
                    'So chess: $(5/20) \u00d7 360° = 90°$ — a quarter of the turn.',
                    'And cricket: $(10/20) \u00d7 360° = 180°$ — half the turn, a full diameter.',
                    'Hence 90° and 180° — a quarter and a half, the fractions you could see coming.',
                  ],
                  answer: '$90°$ (chess) and $180°$ (cricket)',
                },
                {
                  q: 'The sapling\u2019s heights are 8, 11, 16, 18, 25, 28 cm on days 0, 2, 4, 6, 8, 10. Tabulate the change per interval and verify it rebuilds the total.',
                  solution: [
                    'Now, subtract neighbours: $11-8 = 3$, $16-11 = 5$, $18-16 = 2$, $25-18 = 7$, $28-25 = 3$.',
                    'So the change column reads +3, +5, +2, +7, +3 cm.',
                    'And the check: $3 + 5 + 2 + 7 + 3 = 20 = 28 - 8$ — the pieces rebuild the whole climb (the check-sum idea, wearing slopes).',
                    'Hence the table: +3/+5/+2/+7/+3, summing to the 20 cm total.',
                  ],
                  answer: '+3, +5, +2, +7, +3 cm — summing to 20 = 28 − 8 ✓',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'A student reads a bar that tops out exactly on the fourth gridline above zero, where each gridline step is 2 students, and reports "16 students". Diagnose the misread.',
                  solution: [
                    'Now, count the steps: the fourth gridline above zero is 4 steps of 2 = 8 students.',
                    'So the honest reading is $4 \u00d7 2 = 8$ — the student counted GRIDLINE NUMBERS (or pixels) instead of dividing by the scale.',
                    'And the law\u2019s repair: $f = \\text{height} \u00f7 s$ — the axis label says what one step carries, and the label is not decoration.',
                    'Hence 8 students; "16" came from treating each step as 4 — read the printed scale first, always.',
                  ],
                  answer: 'The bar reads 8 (4 steps × 2); the reader confused steps with students',
                },
                {
                  q: 'Two pies are drawn: one for 20 answers, one for 100. A slice owns 50% of each. Are the two slices "the same"?',
                  solution: [
                    'Now, the ANGLES are the same: $(1/2) \u00d7 360° = 180°$ in both pies.',
                    'So the SHARES are the same — half of each class.',
                    'And the ANSWERS are not: $50\\%$ of 20 is 10 students, but $50\\%$ of 100 is 50 — the same angle sits over very different crowds.',
                    'Hence: slices compare shares within one whole; across different wholes, read the totals first — a pie never volunteers its size.',
                  ],
                  answer: 'Same angle (180°), same share (50%), different answers (10 vs 50) — a pie shows shares, never sizes',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Twelve friends pick fruits: mango 4, banana 5, guava 3. Compute the three central angles and check they close.',
                  solution: [
                    'Now, the check-sum first: $4 + 5 + 3 = 12$ ✓.',
                    'So the angles: $(4/12) \u00d7 360° = 120°$, $(5/12) \u00d7 360° = 150°$, $(3/12) \u00d7 360° = 90°$.',
                    'And the close: $120 + 150 + 90 = 360°$ ✓ — the slices will tile the circle with no gap.',
                    'Hence 120°/150°/90° — a third, five-twelfths, a quarter of the turn.',
                  ],
                  answer: '$120°$, $150°$, $90°$ — summing to $360°$ ✓',
                },
                {
                  q: 'On the sapling graph, estimate the height at day 5 from the day-4 (16 cm) and day-6 (18 cm) points — and say what kind of statement that is.',
                  solution: [
                    'Now, the segment between them is straight, so its midpoint is the value average: $(16 + 18)/2 = 17$ cm.',
                    'So the graph\u2019s guess at day 5 is 17 cm.',
                    'And the kind of statement: interpolation — a straight-line GUESS between measurements, not a measurement (the dashed-honesty of the figure). Growth could have surged and paused.',
                    'Hence 17 cm, offered as an estimate — the line between points is a claim about between, and it must wear that label.',
                  ],
                  answer: '≈ 17 cm — an interpolation (a straight-line guess), not a measurement',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'You must draw the travel survey (frequencies 8, 6, 4, 2). Compare axis designs: steps of 1 (0..10), steps of 2 (0..10), steps of 5 (0..10). Which serves the reader, and why?',
                  solution: [
                    'Now, steps of 1: ten bands for a maximum of 8 — every bar lands mid-step and the axis crowds with labels.',
                    'So steps of 5: only two bands (0..5, 5..10) — walk\u2019s bar tops at 8, an awkward three-fifths of a band, and cycle vs car (4 vs 2) collapse into the same half-band\u2019s feel.',
                    'And steps of 2: five bands, the tallest bar 4 steps, every frequency on an even gridline — readable at a glance with room to breathe.',
                    'Hence steps of 2 — the scale must be equal (all three are), but it must also RESOLVE the data: fine enough to separate the values, coarse enough not to clutter.',
                  ],
                  answer: 'Steps of 2 — five bands that put every frequency on a gridline without crowding',
                },
                {
                  q: 'A survey of 25 students adds an "other" row with frequency 2. What central angle does "other" own?',
                  solution: [
                    'Now, the law: $\\theta = (f/N) \u00d7 360°$.',
                    'So $(2/25) \u00d7 360° = 28.8°$ — a sliver under half a right angle.',
                    'And the honesty note: 10.1\u2019s "other" row earns a real slice here — the roof over the stray answers has its own share of the turn.',
                    'Hence 28.8° — the honesty row, drawn to scale.',
                  ],
                  answer: '$(2/25) \u00d7 360° = 28.8°$',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the central-angle law: if $N$ answers are partitioned into categories with frequencies $f_1, \\ldots, f_k$, then category $i$ owns central angle $\\theta_i = (f_i/N) \u00d7 360°$, and the slices close on a full circle.',
                  solution: [
                    'Now, the pie\u2019s promise: the full turn (360°) stands for all $N$ answers — the whole class is the whole circle.',
                    'So the partition gives each answer equal standing: one answer spends $360°/N$ of turn (for $N = 20$: 18°).',
                    'And a category with $f_i$ answers spends $f_i$ of those equal shares: $\\theta_i = f_i \u00d7 (360°/N) = (f_i/N) \u00d7 360°$ — the relative frequency in degree dress.',
                    'Hence the close: $\\Sigma \\theta_i = (\\Sigma f_i / N) \u00d7 360° = (N/N) \u00d7 360° = 360°$ by the check-sum law — the slices tile the circle exactly because the rows tile the class. The pie is 10.1\u2019s partition, drawn in ink.',
                  ],
                  answer: '$\\theta_i = (f_i/N) \u00d7 360°$; the slices close on 360° by Σf = N — the partition drawn as angles',
                },
                {
                  q: 'A classmate draws a LINE graph with "walk, bus, cycle, car" along the horizontal axis and the frequencies 8, 6, 4, 2 up the vertical. Diagnose the design fault, and say which graph the data demands.',
                  solution: [
                    'Now, the fault is a type mismatch: the horizontal axis of a line graph must carry an ORDER, and "walk, bus, cycle, car" has none.',
                    'So the segments make a claim that names nothing: the walk\u2192bus segment asserts a transition between two separate kinds — "between walk and bus" is not a state any student was in.',
                    'And the deeper tell: the graph\u2019s message would CHANGE if the categories were reordered (8, 6, 4, 2 vs 2, 4, 6, 8) — a sign the picture encodes an order the data does not own.',
                    'Hence: the data demands a bar chart (equal-width bars, gaps between categories, heights 8/6/4/2) — the graph type must match the data shape, and this shape is categorical.',
                  ],
                  answer: 'A line through unordered categories invents transitions; the categorical data demands a bar chart',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'fm-reading-graphs-critically',
      number: '10.3',
      title: 'Reading Graphs Critically',
      concepts: [
        'A graph is an argument — check it',
        'The truncated baseline — the classic lie',
        'The exaggeration law',
        'Stretch and squash — twin scales',
        'The mismatch gallery — wrong graph, wrong claim',
        'Correlation is not causation',
        'The five-question checklist',
        'Re-basing — the honest repair',
      ],
      objectives: [
        'Diagnose the truncated-baseline lie: a bar chart whose axis starts above zero breaks the bar-scale law, and quantify the damage with the exaggeration law',
        'Prove and use the exaggeration law E = v\u2081(v\u2082\u2212b)/(v\u2082(v\u2081\u2212b)) \u2014 exactly 1 at a zero baseline, climbing without bound as the baseline creeps toward the data',
        'Explain the twin-scales trap: rescaling a chart preserves within-chart comparisons (the bar ranking, the steepness order) but destroys cross-chart pixel comparisons',
        'Refuse the mismatched graph \u2014 lines through unordered categories, pies that do not close on 360°, perspective-distorted 3D pies \u2014 and repair each with the honest alternative',
        'Apply the five-question checklist (labelled axes? zero baseline? even steps? source? honest title?) and state the correlation-is-not-causation caution with a concrete third-variable example',
      ],
      prerequisites: ['fm-bar-charts-line-graphs-and-pie-charts', 'fm-collecting-and-tallying-data'],
      sources: ['huff-1954-lie-with-statistics', 'ncert-ganita-prakash6-ch4', 'khattar-qa-4e'],
      blocks: [
        {
          kind: 'para',
          text: 'Lesson 10.2 ended with a promise: everything there assumed the **honest** drawing. This lesson collects the debt. A graph is not a window onto data — it is an **argument made of ink**, and like any argument it can be built to illuminate or to mislead. The machinery for both is exactly the machinery you already own: the bar-scale law (height = $f \\times s$, reading = height \u00f7 $s$), the central-angle law (the slices close on 360\u00b0 because the check-sum law closes on $N$), and the ruler logic of 9.1. Every lying chart in this lesson is caught by one of those three laws breaking — and every repair is the law restored.',
        },
        { kind: 'heading', text: 'The truncated baseline: the classic lie' },
        {
          kind: 'para',
          text: 'Two shops sell the same milk at **Rs 52 and Rs 56** a litre. The honest difference is small: $56/52 \\approx 1.077$ — shop B is about **7.7%** dearer. Now look at figure 1. In the right panel the axis starts not at zero but at **50**, and the scale is stretched to fill the panel. The bars stand 40 px and 120 px tall — shop B\u2019s bar looks **three times** shop A\u2019s. Nothing in the drawing is false (the bars DO sit at the right heights above their baseline); the *frame* is false. The reader\u2019s eye, trained by 10.2 to read bar heights as frequencies from the baseline, reads a 200% gap where 7.7% lives.',
        },
        {
          kind: 'figure',
          caption:
            'The same two prices, two framings. Left — honest: the axis starts at 0 (steps of 20 up to 60), the bars stand 208 and 224 px, and the eye correctly sees shop B a shade taller. Right — the lie: the axis starts at 50 (the baseline is labelled, but the eye still reads bar heights from where they stand) and the scale is stretched fivefold, so the bars stand 40 and 120 px and B looks three times A. The true ratio is 1.077\u00d7; the visual ratio is 3\u00d7; the exaggeration is 2.79\u00d7. The bars did not lie. The baseline did.',
          svg: `<svg viewBox="0 0 780 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two bar charts of the same milk prices, Rs 52 and Rs 56: the left panel honest with a zero baseline, the right panel truncated at 50 with a stretched scale so the second bar looks three times the first">
  <text x="390" y="22" font-size="13" fill="currentColor" text-anchor="middle">one carton of milk, two framings \u2014 the bars are honest, the baselines are not twins</text>
  ${(() => {
    let out = '';
    for (let v = 0; v <= 60; v += 20) {
      const y = 310 - v * 4;
      out += `<line x1="40" y1="${y}" x2="360" y2="${y}" stroke="currentColor" stroke-width="${v === 0 ? 1.4 : 0.6}" opacity="${v === 0 ? 1 : 0.45}"/>`;
      out += `<text x="34" y="${y + 4}" font-size="10" fill="currentColor" text-anchor="end">${v}</text>`;
    }
    out += `<text x="200" y="44" font-size="12" fill="currentColor" text-anchor="middle" font-weight="bold">honest \u2014 the axis starts at 0</text>`;
    [[140, 52], [260, 56]].forEach(([x, v]) => {
      const h = v * 4;
      out += `<rect x="${x - 40}" y="${310 - h}" width="80" height="${h}" fill="none" stroke="currentColor" stroke-width="1.3"/>`;
      out += `<text x="${x}" y="${310 - h - 8}" font-size="12" fill="currentColor" font-weight="bold" text-anchor="middle">${v}</text>`;
      out += `<text x="${x}" y="330" font-size="11" fill="currentColor" text-anchor="middle">shop ${v === 52 ? 'A' : 'B'}</text>`;
    });
    out += `<text x="200" y="352" font-size="10.5" fill="currentColor" text-anchor="middle" opacity="0.8">the eye reads it right: B is a shade dearer (1.08\u00d7)</text>`;
    for (let v = 50; v <= 58; v += 2) {
      const y = 310 - (v - 50) * 20;
      out += `<line x1="420" y1="${y}" x2="740" y2="${y}" stroke="currentColor" stroke-width="${v === 50 ? 1.4 : 0.6}" opacity="${v === 50 ? 1 : 0.45}"/>`;
      out += `<text x="414" y="${y + 4}" font-size="10" fill="currentColor" text-anchor="end">${v}</text>`;
    }
    out += `<text x="580" y="44" font-size="12" fill="currentColor" text-anchor="middle" font-weight="bold">the lie \u2014 the axis starts at 50, stretched \u00d75</text>`;
    [[520, 52], [640, 56]].forEach(([x, v]) => {
      const h = (v - 50) * 20;
      out += `<rect x="${x - 40}" y="${310 - h}" width="80" height="${h}" fill="none" stroke="currentColor" stroke-width="1.3"/>`;
      out += `<text x="${x}" y="${310 - h - 8}" font-size="12" fill="currentColor" font-weight="bold" text-anchor="middle">${v}</text>`;
      out += `<text x="${x}" y="330" font-size="11" fill="currentColor" text-anchor="middle">shop ${v === 52 ? 'A' : 'B'}</text>`;
    });
    out += `<text x="580" y="352" font-size="10.5" fill="currentColor" text-anchor="middle" opacity="0.8">the eye reads it wrong: B looks 3\u00d7 A (truth: 1.08\u00d7 \u2014 exaggeration 2.79\u00d7)</text>`;
    return out;
  })()}
</svg>`,
        },
        {
          kind: 'derivation',
          title: 'The exaggeration law: how much a truncated baseline inflates a comparison',
          statement:
            'Two values $v_1 < v_2$ are drawn as bars on a baseline $b$ (with $b \u2264 v_1$). Show the reader\u2019s eye receives the visual ratio $\\dfrac{v_2 - b}{v_1 - b}$ instead of the true ratio $\\dfrac{v_2}{v_1}$ \u2014 so the exaggeration is $E = \\dfrac{v_1 (v_2 - b)}{v_2 (v_1 - b)}$, equal to exactly 1 when $b = 0$ and growing without bound as $b$ climbs toward $v_1$.',
          steps: [
            {
              label: 'What the honest chart shows',
              formula: '\\text{visual ratio} = \\frac{v_2}{v_1} \\quad (b = 0)',
              explanation:
                'By the bar-scale law with a zero baseline, the bars stand $v_1 \\times s$ and $v_2 \\times s$ tall \u2014 the scale cancels in the ratio, leaving the truth.',
            },
            {
              label: 'What the truncated chart shows',
              formula: '\\text{visual ratio} = \\frac{v_2 - b}{v_1 - b}',
              explanation:
                'The bars are drawn from the baseline up: their heights are the EXCESS over $b$, not the values. The eye compares the excesses \u2014 and the excesses of close numbers are wildly unequal.',
            },
            {
              label: 'The exaggeration, and its two certainties',
              formula: 'E = \\frac{v_1 (v_2 - b)}{v_2 (v_1 - b)}; \\quad E(0) = 1, \\quad E \\to \\infty \\text{ as } b \\to v_1',
              explanation:
                'At $b = 0$ the law returns exactly 1 \u2014 the zero baseline cannot lie. As $b$ creeps toward the smaller value $v_1$, the denominator $v_1 - b$ collapses and the exaggeration explodes: the milk pair ($b = 50$) already suffers $E = \\frac{52 \\times 6}{56 \\times 2} \\approx 2.79$.',
            },
          ],
          result: '$E = \\dfrac{v_1 (v_2 - b)}{v_2 (v_1 - b)}$ \u2014 the milk lie: visual 3\u00d7, truth 1.077\u00d7, exaggeration 2.79\u00d7; the 7.7% honest gap drawn as a 200% gap.',
        },
        {
          kind: 'equation',
          latex: 'E = \\frac{v_1\\,(v_2 - b)}{v_2\\,(v_1 - b)} \\;\\ge\\; 1',
          note: '**The exaggeration law (tag 1).** Equality holds exactly at $b = 0$ \u2014 the honest chart. Every step the baseline climbs above zero multiplies the lie; the check is one subtraction: **where does the axis start?**',
        },
        {
          kind: 'example',
          title: 'A chart plots two cricketers\u2019 averages, 9.1 and 10.2 (per game, say), with the axis starting at 9. Quantify the exaggeration.',
          steps: [
            'Now, the true ratio: $10.2/9.1 \\approx 1.121$ \u2014 the second player is about 12% better.',
            'So the drawn bars stand $(9.1 - 9)s$ and $(10.2 - 9)s$: the visual ratio is $1.2/0.1 = 12$.',
            'And the exaggeration law: $E = \\frac{9.1 \\times 1.2}{10.2 \\times 0.1} \\approx 10.7$ \u2014 the chart shouts a gap ten times wider than the truth.',
            'Hence: a 12% difference, drawn as a 1100% chasm \u2014 and one glance at the axis label convicts it.',
          ],
        },
        { kind: 'heading', text: 'Stretch and squash: the twin-scales trap' },
        {
          kind: 'para',
          text: 'The second trick needs no truncation \u2014 only a scale chosen with intent. Draw the sapling\u2019s data twice: once at 8 px per cm (tall, dramatic) and once at 2 px per cm (flat, calm). The **same** six points, the **same** five segments \u2014 utterly different feelings. What survives the rescaling, and what does not? The **within-chart comparisons** survive: rescaling multiplies every height by the same factor, so the bar ranking (8 > 6 > 4 > 2) and the steepness ranking (the 7 cm stretch above the 2 cm stretch) are untouched \u2014 $7/2$ is $7/2$ at any scale. What dies is every **cross-chart pixel comparison**: "the line looks steeper in this report than in that one" compares 56 px against 14 px and learns nothing.',
        },
        {
          kind: 'derivation',
          title: 'The scale-invariance of within-chart comparisons',
          statement:
            'All values of a chart are multiplied by a rescale factor $k$ (a new scale). Show the ranking of bars and the ranking of segment steepnesses are unchanged \u2014 so honest comparisons live inside one chart, and cross-chart comparisons must be rebuilt from the printed values.',
          steps: [
            {
              label: 'Rescaling multiplies every height by k',
              formula: "f_i \\times s \\longmapsto f_i \\times (k s)",
              explanation:
                'The new chart is the old chart\u2019s shadow \u2014 every bar longer by exactly the same factor $k$.',
            },
            {
              label: 'Common factors cancel in ratios',
              formula: '\\frac{f_2 k s}{f_1 k s} = \\frac{f_2}{f_1}',
              explanation:
                'Chapter 3\u2019s cancellation, wearing pixels: the ratio of any two bars within the chart forgets the scale entirely.',
            },
            {
              label: 'So the truth travels in the printed numbers',
              formula: '\\text{compare within, or read the axis}',
              explanation:
                'The ranking survives; the absolute pixel heights do not. Cross-chart comparisons must go back to the values the axes print \u2014 which is why the axis labels are not decoration.',
            },
          ],
          result: 'Within one chart, comparisons are scale-free; across charts, only the printed values compare.',
        },
        {
          kind: 'equation',
          latex: '\\frac{f_2\\,k\\,s}{f_1\\,k\\,s} = \\frac{f_2}{f_1}',
          note: '**The scale-invariance law (tag 2).** Rescaling never reorders the bars \u2014 the lie of the twin scales is not in the ordering but in the FEELING: the same data, shouted or whispered. Read the axis before trusting the drama.',
        },
        { kind: 'heading', text: 'The mismatch gallery: the wrong graph is a lie too' },
        {
          kind: 'figure',
          caption:
            'Three ways a drawing can contradict its data. Left: the SAME 8/6/4/2 answers drawn as a line through walk/bus/cycle/car — the segments claim transitions between categories that name nothing ("between walk and bus" is not a state any student was in). Middle: a pie whose slices cover only 252° — 40% + 30% drawn, the other 30% of the answers simply missing; the check-sum law demands the slices close on 360°. Right: the honest bar chart of the same travel data — the picture the data shape actually permits. A graph type is a claim about the data; the wrong type is a false claim even with perfect arithmetic.',
          svg: `<svg viewBox="0 0 780 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three mini panels: a fraudulent line through unordered categories marked with a cross; a pie whose slices sum to only 70 percent leaving a visible gap; the honest bar chart of the travel data marked with a check">
  <text x="390" y="22" font-size="13" fill="currentColor" text-anchor="middle">the mismatch gallery \u2014 the wrong graph is a wrong claim</text>
  ${(() => {
    let out = '';
    // panel 1: the line-through-categories fraud — the SAME 8/6/4/2 data,
    // drawn as a descending line (the lie is the graph type, not the numbers)
    const fData = [8, 6, 4, 2];
    const p1: Array<[number, number]> = fData.map((f, i) => [60 + 60 * i, 170 - f * 12] as [number, number]);
    for (let i = 1; i < p1.length; i++) {
      out += `<line x1="${p1[i - 1][0]}" y1="${p1[i - 1][1]}" x2="${p1[i][0]}" y2="${p1[i][1]}" stroke="currentColor" stroke-width="1.4"/>`;
    }
    p1.forEach((pt) => {
      out += `<circle cx="${pt[0]}" cy="${pt[1]}" r="3" fill="currentColor"/>`;
    });
    fData.forEach((f, i) => {
      out += `<text x="${60 + 60 * i}" y="${p1[i][1] - 10}" font-size="10" fill="currentColor" text-anchor="middle">${f}</text>`;
      out += `<text x="${60 + 60 * i}" y="200" font-size="10.5" fill="currentColor" text-anchor="middle" opacity="0.8">${['walk', 'bus', 'cycle', 'car'][i]}</text>`;
    });
    out += `<line x1="44" y1="170" x2="256" y2="170" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>`;
    out += `<text x="140" y="238" font-size="14" fill="currentColor" text-anchor="middle">\u2717 a line through categories</text>`;
    out += `<text x="140" y="256" font-size="10.5" fill="currentColor" text-anchor="middle" opacity="0.8">the same 8/6/4/2 \u2014 "between walk and bus" names nothing</text>`;
    // panel 2: the pie that does not close
    const cx = 390, cy = 150, r = 55;
    const arc = (a0: number, a1: number) => {
      const t0 = (a0 * Math.PI) / 180, t1 = (a1 * Math.PI) / 180;
      return `M ${cx} ${cy} L ${(cx + r * Math.sin(t0)).toFixed(1)} ${(cy - r * Math.cos(t0)).toFixed(1)} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${(cx + r * Math.sin(t1)).toFixed(1)} ${(cy - r * Math.cos(t1)).toFixed(1)} Z`;
    };
    out += `<path d="${arc(0, 144)}" fill="none" stroke="currentColor" stroke-width="1.1"/>`;
    out += `<text x="${cx + 0.62 * r * Math.sin(72 * Math.PI / 180)}" y="${cy - 0.62 * r * Math.cos(72 * Math.PI / 180)}" font-size="10" fill="currentColor" text-anchor="middle" opacity="0.85">40%</text>`;
    out += `<path d="${arc(144, 252)}" fill="none" stroke="currentColor" stroke-width="1.1"/>`;
    out += `<text x="${cx + 0.62 * r * Math.sin(198 * Math.PI / 180)}" y="${cy - 0.62 * r * Math.cos(198 * Math.PI / 180)}" font-size="10" fill="currentColor" text-anchor="middle" opacity="0.85">30%</text>`;
    const gapEnd = [cx + r * Math.sin((348 * Math.PI) / 180), cy - r * Math.cos((348 * Math.PI) / 180)];
    out += `<path d="M ${cx + r} ${cy} A ${r} ${r} 0 0 1 ${gapEnd[0].toFixed(1)} ${gapEnd[1].toFixed(1)} L ${cx} ${cy}" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="3 3" opacity="0.5"/>`;
    out += `<text x="${cx}" y="${cy + r + 16}" font-size="10" fill="currentColor" text-anchor="middle" opacity="0.85">slices drawn: 70% — the gap is the missing 30%</text>`;
    out += `<text x="${cx}" y="${238}" font-size="12" fill="currentColor" text-anchor="middle">\u2717 a pie that does not close</text>`;
    out += `<text x="${cx}" y="${256}" font-size="10" fill="currentColor" text-anchor="middle" opacity="0.75">40% + 30% drawn \u2014 where did the other 30% go?</text>`;
    // panel 3: the honest mini bars — same data, with baseline and values
    out += `<line x1="536" y1="170" x2="756" y2="170" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>`;
    [8, 6, 4, 2].forEach((f, i) => {
      const bx = 560 + 44 * i, h = f * 6;
      out += `<rect x="${bx - 14}" y="${170 - h}" width="28" height="${h}" fill="none" stroke="currentColor" stroke-width="1.1"/>`;
      out += `<text x="${bx}" y="${170 - h - 6}" font-size="10" fill="currentColor" text-anchor="middle">${f}</text>`;
    });
    ['walk', 'bus', 'cycle', 'car'].forEach((c, i) => {
      out += `<text x="${560 + 44 * i}" y="200" font-size="10.5" fill="currentColor" text-anchor="middle" opacity="0.8">${c}</text>`;
    });
    out += `<text x="640" y="238" font-size="14" fill="currentColor" text-anchor="middle">\u2713 the honest bars</text>`;
    out += `<text x="640" y="256" font-size="10.5" fill="currentColor" text-anchor="middle" opacity="0.8">equal steps, gaps, baseline at zero</text>`;
    return out;
  })()}
</svg>`,
        },
        {
          kind: 'para',
          text: 'The gallery\u2019s refusals, in the laws\u2019 own words (two drawn above; the third needs no drawing). **The line through categories** invents transitions \u2014 a line graph\u2019s horizontal axis must carry an order, and "between walk and bus" is not a state any student was in (10.2\u2019s refusal, now your reflex). **The open pie** loses answers: slices covering 252\u00b0 of a 360\u00b0 circle are a frequency table whose column sums to 70% \u2014 the check-sum law convicted it before any label was read. **The 3-D pie** adds perspective, which draws equal angles unequal \u2014 the front slice swells, the back slice shrinks, and the central-angle law dies in the rendering. And beneath them all sits the quietest mismatch: **correlation is not causation**. Ice-cream sales and pool drownings both climb every summer \u2014 the correlation is real; the cause of both is the heat. A third variable riding unseen is not a lie in the drawing, but reading a rising pair of lines as "A causes B" is a lie in the reader \u2014 and the heat example is the vaccine: ask, *what else moves when these move?*',
        },
        { kind: 'heading', text: 'The five-question checklist' },
        {
          kind: 'para',
          text: 'Critical reading is not suspicion of everything \u2014 it is five cheap questions, asked in order, that catch nearly every dishonest chart before the numbers are even read:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            '**Where does the axis start?** A bar chart\u2019s value axis must start at zero \u2014 anything else triggers the exaggeration law;',
            '**Are the steps equal and labelled?** Wobbly or naked steps break the bar-scale law \u2014 the ruler must have honest units;',
            '**Does the graph type match the data shape?** Categories get bars, order gets lines, one whole gets pies \u2014 the mismatch gallery is the cheat sheet;',
            '**Do the parts close on the whole?** Pie slices must total 360\u00b0, frequency columns must total $N$ \u2014 the check-sum law is a ten-second audit;',
            '**Who is speaking, and about what, measured when?** A chart without a title, a source and a date is a claim without a receipt.',
          ],
        },
        {
          kind: 'example',
          title: 'Repair the milk chart: re-draw it honestly and verify the exaggeration is gone.',
          steps: [
            'Now, the fault was the baseline at 50 \u2014 the repair is re-basing at 0: the axis runs 0..60 in steps of 20, at 4 px per rupee.',
            'So the bars stand $52 \u00d7 4 = 208$ px and $56 \u00d7 4 = 224$ px.',
            'And the law certifies the cure: $E = \\frac{52 \\times 56}{56 \\times 52} = 1$ exactly \u2014 the visual ratio $224/208 = 1.077$ equals the true ratio to the last decimal.',
            'Hence the repaired chart: same data, same ink, baseline at zero \u2014 and the eye now sees the 7.7% truth.',
          ],
        },
        {
          kind: 'callout',
          tone: 'exam',
          title: 'Exam corner',
          text: 'Critical-reading items are the growing edge of every data set: banking and SSC data-interpretation now regularly asks "which of the given charts is misleading and why" \u2014 the truncated baseline and the uneven step are the two canonical answers, and the exaggeration law prices them precisely; NTSE and Olympiad papers ask for the missing pie slice (the check-sum law) or the mismatched graph type; CTET and state TETs ask how to teach children to question a graph \u2014 the five-question checklist is the expected answer\u2019s skeleton. Shapes cited, none reproduced.',
        },
        {
          kind: 'callout',
          tone: 'historical',
          title: 'How to Lie with Statistics — and the woman who told the truth in roses',
          text: 'The critical-reading tradition has a founding document with a disarming title: **Darrell Huff\u2019s *How to Lie with Statistics*** (1954) \u2014 a slim book, never out of print, whose gallery (the truncated bar, the unequal pictograph square, the semi-attached figure) is essentially this lesson\u2019s wardrobe. Huff\u2019s rule of thumb survives him: *"not all the statistical arithmetic presented by unqualified agents is to be accepted indiscriminately"*, and his cure was exactly this lesson\u2019s \u2014 ask who says so, how he knows, and what\u2019s missing. The counter-tradition is older and prouder: **Florence Nightingale\u2019s** rose diagram of 1858 (10.2\u2019s story) was critical reading aimed the other way \u2014 a graph built so honestly, and aimed so precisely, that ministers could not misread it. Between Huff\u2019s suspicion and Nightingale\u2019s candour sits the whole skill: a graph is an argument, arguments can be audited, and mathematics supplies the audit.',
        },
        {
          kind: 'para',
          text: 'The harvest, in the lesson\u2019s own order:',
        },
        {
          kind: 'list',
          marker: 'roman',
          items: [
            'a graph is an argument made of ink \u2014 auditable by the three laws you already own;',
            'the truncated baseline is the classic lie: the bars show excesses over $b$, not values;',
            'the exaggeration law $E = \\frac{v_1(v_2-b)}{v_2(v_1-b)}$: exactly 1 at a zero baseline, exploding as $b$ climbs (the milk pair: 2.79\u00d7);',
            'twin scales preserve within-chart rankings and destroy cross-chart pixel comparisons \u2014 read the axis, not the drama;',
            'the mismatch gallery: no lines through categories, no pies that fail to close on 360\u00b0, no 3-D perspective;',
            'correlation is not causation \u2014 the ice-cream and drowning pair rises on the heat\u2019s back;',
            'five questions before belief: baseline, steps, type, closure, provenance \u2014 and the repair is always the law restored (re-base at zero).',
          ],
        },
        {
          kind: 'formula',
          name: 'The exaggeration law',
          latex: 'E = \\frac{v_1\\,(v_2 - b)}{v_2\\,(v_1 - b)}',
          note: 'How much a baseline $b$ inflates the $v_2/v_1$ comparison. $E = 1$ at $b = 0$ (honest); the milk lie ($b = 50$): $E \\approx 2.79$. Where does the axis start?',
        },
        {
          kind: 'formula',
          name: 'The scale-invariance law',
          latex: '\\frac{f_2\\,k\\,s}{f_1\\,k\\,s} = \\frac{f_2}{f_1}',
          note: 'Rescaling multiplies every height by the same $k$, so within-chart ratios (and rankings) survive; cross-chart pixel comparisons die. Compare within, or read the printed values.',
        },
        {
          kind: 'formula',
          name: 'The pie-closure audit',
          latex: '\\sum \\theta_i = 360° \\quad \\Longleftrightarrow \\quad \\sum f_i = N',
          note: 'The reader\u2019s ten-second test: the slices must close on the full turn because the check-sum law closes the frequencies on N. An open pie has lost answers.',
        },
        {
          kind: 'terms',
          items: [
            {
              term: 'Truncated baseline',
              def: 'A value axis that starts above zero \u2014 the bars then show excesses over the baseline, not values, and comparisons inflate by the exaggeration law.',
            },
            {
              term: 'Exaggeration (of a chart)',
              def: 'The visual ratio divided by the true ratio: $E = \\frac{v_1(v_2-b)}{v_2(v_1-b)}$. Exactly 1 for a zero baseline; 2.79\u00d7 for the milk lie.',
            },
            {
              term: 'Twin scales',
              def: 'The same data drawn at two different scales \u2014 rankings survive, feelings do not. Compare within a chart; across charts, read the printed values.',
            },
            {
              term: 'Mismatch (graph\u2013data)',
              def: 'A graph type whose claims the data cannot support: lines through unordered categories, pies for non-wholes, 3-D perspective on angles.',
            },
            {
              term: 'Open pie',
              def: 'A pie whose slices do not reach 360\u00b0 \u2014 by the check-sum law, answers are missing from the drawing. The ten-second audit.',
            },
            {
              term: 'Correlation vs causation',
              def: 'Two series rising together does not mean one causes the other \u2014 a third variable (the summer heat behind both ice cream and drownings) may drive both.',
            },
            {
              term: 'Re-basing',
              def: 'The honest repair: re-draw the chart with the baseline at zero. The exaggeration law returns exactly 1 and the eye reads the truth.',
            },
            {
              term: 'The five-question checklist',
              def: 'Baseline at zero? Steps equal and labelled? Type matches the shape? Parts close on the whole? Source, title and date stated? \u2014 asked in order, before believing any chart.',
            },
          ],
        },
        {
          kind: 'quiz',
          items: [
            {
              q: 'The fastest way to check whether a bar chart might be lying is to look at',
              options: [
                'the colours of the bars',
                'where the value axis starts',
                'the number of bars',
                'the font of the title',
              ],
              answer: 1,
              explain:
                'The baseline: a value axis starting above zero triggers the exaggeration law (Option 2) \u2014 the bars then show excesses, not values. Colours and fonts carry no arithmetic. The number of bars is the data\u2019s business, not the chart\u2019s honesty.',
            },
            {
              q: 'The milk pair (Rs 52, Rs 56) drawn from a baseline of 50 looks like a ratio of 3. The exaggeration is about',
              options: ['$1.08\\times$', '$2\\times$', '$2.79\\times$', '$3\\times$'],
              answer: 2,
              explain:
                '$E = \\frac{52 \\times 6}{56 \\times 2} \\approx 2.79$ (Option 3) \u2014 the visual ratio 3 divided by the true ratio 1.077. Option 1 is the truth, not the exaggeration. Option 4 is the visual ratio itself. The law prices the lie precisely.',
            },
            {
              q: 'The same sapling data drawn at 2 px/cm and at 8 px/cm: which comparison survives?',
              options: [
                'the absolute pixel steepness of the segments',
                'the steepness RANKING of the segments within each chart',
                'the emotional drama of the climb',
                'none \u2014 rescaling destroys everything',
              ],
              answer: 1,
              explain:
                'Scale-invariance: rescaling multiplies every height by the same factor, so rankings survive ($7/2$ at any scale \u2014 Option 2) while absolute pixel slopes do not (Option 1). Option 3 is the trap the twin scales set. Option 4 overshoots \u2014 the within-chart truth is safe.',
            },
            {
              q: 'A pie chart\u2019s slices cover 60% and 30% of the circle, nothing more. What does the check-sum law say?',
              options: [
                'the chart is fine \u2014 pies need not close',
                '10% of the answers are missing from the drawing',
                'the largest slice should be first',
                'the pie should have been a line graph',
              ],
              answer: 1,
              explain:
                'The slices must close on 360\u00b0 exactly because the frequencies close on $N$ \u2014 60% + 30% = 90% leaves 10% of the answers unaccounted (Option 2). Option 1 abandons the central-angle law. Options 3 and 4 dodge the arithmetic.',
            },
            {
              q: 'Ice-cream sales and swimming-pool drownings rise together every summer. The sound conclusion is',
              options: [
                'ice cream causes drownings',
                'a third variable \u2014 the heat \u2014 drives both',
                'drownings cause ice-cream cravings',
                'the correlation must be a coincidence',
              ],
              answer: 1,
              explain:
                'Correlation is not causation: both series track the temperature, the third variable riding unseen (Option 2). Options 1 and 3 draw causal arrows the data never drew. Option 4 swings too far \u2014 the correlation is real; only the causal reading is forbidden.',
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
                  q: 'A bar chart compares two players\u2019 per-game scores, 9.1 and 10.2, with the axis starting at 9. What does the eye see, and what is the truth?',
                  solution: [
                    'Now, the drawn bars stand $(9.1 - 9)s$ and $(10.2 - 9)s$ tall: the visual ratio is $1.2/0.1 = 12$.',
                    'So the eye receives a twelve-fold chasm.',
                    'And the truth is $10.2/9.1 \\approx 1.121$ \u2014 about a 12% edge, not 1100%.',
                    'Hence: exaggeration $\\approx \\frac{9.1 \\times 1.2}{10.2 \\times 0.1} \\approx 10.7\\u00d7$ \u2014 convicted by one glance at the axis label.',
                  ],
                  answer: 'The eye sees 12\u00d7; the truth is 1.12\u00d7 \u2014 an exaggeration of about 10.7\u00d7',
                },
                {
                  q: 'Re-base that chart at zero (scale 10 px per point). How tall do the bars stand, and what does the eye see now?',
                  solution: [
                    'Now, at a zero baseline the bars are the values themselves: $9.1 \u00d7 10 = 91$ px and $10.2 \u00d7 10 = 102$ px.',
                    'So the visual ratio is $102/91 \\approx 1.121$ \u2014 exactly the true ratio.',
                    'And the exaggeration law certifies it: $E = \\frac{9.1 \u00d7 10.2}{10.2 \u00d7 9.1} = 1$.',
                    'Hence 91 and 102 px \u2014 the same data, the truth restored by moving the floor.',
                  ],
                  answer: '$91$ px and $102$ px; the eye now reads the honest 1.12\u00d7',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'A truncated chart starts at 40 and shows two bars for values 44 and 48. Compute the visual ratio, the true ratio, and the exaggeration.',
                  solution: [
                    'Now, the drawn heights are the excesses: $(44 - 40) = 4$ and $(48 - 40) = 8$ \u2014 the visual ratio is $2$.',
                    'So the true ratio is $48/44 \\approx 1.091$.',
                    'And the exaggeration: $E = \\frac{44 \\times 8}{48 \\times 4} \\approx 1.83$ \u2014 the 9% truth wearing an 100% costume.',
                    'Hence: visual 2\u00d7, true 1.09\u00d7, exaggeration 1.83\u00d7.',
                  ],
                  answer: 'Visual 2\u00d7; true \u2248 1.09\u00d7; exaggeration \u2248 1.83\u00d7',
                },
                {
                  q: 'A pie\u2019s slices read 45%, 35% and 15%. What does the check-sum law convict, and by how much?',
                  solution: [
                    'Now, add the slices: $45 + 35 + 15 = 95\\%$.',
                    'So the pie covers 342\u00b0 of the 360\u00b0 turn \u2014 an 18\u00b0 gap.',
                    'And the law\u2019s verdict: $5\\%$ of the answers are missing from the drawing (the frequency column would sum to $0.95N$, not $N$).',
                    'Hence: 5% of the data unaccounted \u2014 demand the missing row (an "other", perhaps) before believing the shares.',
                  ],
                  answer: '5% of the answers (18\u00b0 of turn) are missing \u2014 the slices must close on 100%/360\u00b0',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'The travel frequencies 8, 6, 4, 2 are drawn twice, at scales of 2 px and 10 px per student. Show the bar RANKING is identical, and explain what a cross-chart comparison of pixel heights would wrongly suggest.',
                  solution: [
                    'Now, at 2 px: 16/12/8/4 px; at 10 px: 80/60/40/20 px.',
                    'So the ranking is walk > bus > cycle > car in BOTH \u2014 rescaling never reorders (scale-invariance: the common factor cancels in every ratio).',
                    'And the cross-chart trap: a 16 px bar and an 80 px bar are the same 8 students \u2014 comparing pixels across charts reads the scales, not the data (an 80 px bar here is not "five times" a 16 px bar there).',
                    'Hence: rankings travel; pixels do not \u2014 cross-chart comparisons must return to the printed frequencies.',
                  ],
                  answer: 'The ranking (8 > 6 > 4 > 2) is identical; cross-chart pixel comparisons read the scales, not the data',
                },
                {
                  q: 'A census is taken every ten years: 12 lakh in 2000 and 14 lakh in 2010. A line graph joins the two points. What does the line claim about 2005, and what kind of statement is that?',
                  solution: [
                    'Now, the segment\u2019s midpoint offers $(12 + 14)/2 = 13$ lakh for 2005.',
                    'So the line claims the town grew steadily through the decade \u2014 but nobody measured 2005.',
                    'And the kind of statement: interpolation \u2014 a straight-line guess (10.2\u2019s caution), honest only when labelled as a guess; growth could have jumped in the last year.',
                    'Hence "13 lakh (interpolated)" \u2014 the guess may stand, but it must wear its label.',
                  ],
                  answer: 'The line claims \u2248 13 lakh for 2005 \u2014 an interpolation, not a measurement',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'A 3-D pie chart tilts the disc toward the viewer: the front slices are drawn visibly larger than back slices of equal data. Which law dies in the rendering, and what is the repair?',
                  solution: [
                    'Now, the central-angle law promises: equal data \u2192 equal angle \u2192 equal-looking slice.',
                    'So the perspective projection breaks it: the tilt magnifies near slices and shrinks far ones \u2014 two 90\u00b0 sectors render as visibly unequal wedges.',
                    'And the repair is flat: re-draw the pie face-on (or as a bar chart) \u2014 the angles return to the table\u2019s truth.',
                    'Hence: the central-angle law dies in the 3-D rendering; the repair is the flat re-draw.',
                  ],
                  answer: 'The central-angle law dies under perspective; re-draw flat (or as bars)',
                },
                {
                  q: 'Ice-cream sales rise from 30 to 90 thousand cones across the summer while pool drownings rise from 12 to 40. Someone concludes "ice cream is dangerous". Give the sounder reading.',
                  solution: [
                    'Now, the correlation is real: both series climb month after month.',
                    'So the arithmetic is honest \u2014 it is the CAUSAL arrow that is invented.',
                    'And the third variable: the summer heat raises both ice-cream consumption and swimming (hence drownings); remove the heat and the pair falls together for no reason linking them to each other.',
                    'Hence: "both rise with the heat" \u2014 correlation measured, causation refused, the third variable named.',
                  ],
                  answer: 'Both rise with the temperature \u2014 a real correlation with a third-variable cause, not a causal link between them',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Apply the five-question checklist to the milk chart of figure 1\u2019s right panel. Which questions does it fail, and which does it pass?',
                  solution: [
                    'Now, question one \u2014 where does the axis start? At 50: FAIL (the exaggeration law wakes).',
                    'So question two \u2014 are the steps equal and labelled? They are equal (2 rupees each) and labelled: PASS (the lie here is not the steps but the floor).',
                    'And questions three to five: the type (bars for two values? debatable \u2014 two numbers need no chart at all), the closure (not a pie: n/a), the provenance (the chart names no source or date: FAIL).',
                    'Hence: fails 1 and 5, passes 2 \u2014 the checklist catches the lie by its floor, not by its arithmetic.',
                  ],
                  answer: 'Fails Q1 (baseline 50) and Q5 (no source/date); passes Q2 \u2014 the checklist convicts the frame, not the arithmetic',
                },
                {
                  q: 'A report shows a country\u2019s exports climbing gently, then a rival report shows the same data "soaring". Both claim equal steps. What single number reconciles the two pictures, and what habit does this teach?',
                  solution: [
                    'Now, if both charts use equal steps, the difference is the scale: the soaring one simply spends more pixels per unit.',
                    'So the reconciliation is the axis label \u2014 "one gridline = 2 million" versus "one gridline = 20 million" (a \u00d710 stretch, scale-invariance at work).',
                    'And the habit: before comparing drama across charts, read the printed steps \u2014 the pixels shout whatever the scale tells them to.',
                    'Hence: one number \u2014 the scale \u2014 reconciles them; the habit is reading the axis before the shape.',
                  ],
                  answer: 'The axis scale (px per unit) reconciles them; the habit: read the axis label before believing the drama',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Prove the exaggeration law: bars for $v_1 < v_2$ drawn on a baseline $b$ show a visual ratio $(v_2-b)/(v_1-b)$, so the exaggeration is $E = \\frac{v_1(v_2-b)}{v_2(v_1-b)}$; show $E = 1$ exactly at $b = 0$ and that $E$ grows as $b$ climbs toward $v_1$.',
                  solution: [
                    'Now, by the bar-scale law the drawn heights are the excesses over the baseline: $(v_1 - b)s$ and $(v_2 - b)s$ \u2014 the eye compares these, giving the visual ratio $(v_2-b)/(v_1-b)$.',
                    'So the exaggeration \u2014 visual over truth \u2014 is $E = \\frac{(v_2-b)/(v_1-b)}{v_2/v_1} = \\frac{v_1(v_2-b)}{v_2(v_1-b)}$ (chapter 3\u2019s compound fractions).',
                    'And the two certainties: at $b = 0$, $E = \\frac{v_1 v_2}{v_2 v_1} = 1$ exactly \u2014 the zero baseline cannot lie; and as $b$ rises the denominator $v_1 - b$ shrinks toward zero, so $E$ climbs without bound (the milk pair at $b = 50$: $E = \\frac{52 \\u00d7 6}{56 \u00d7 2} \\u2248 2.79$; swept monotonically from $b = 0$ to $51$ in the chapter\u2019s verify script).',
                    'Hence the law \u2014 and its moral in one line: every step the baseline climbs above zero is a step the lie grows.',
                  ],
                  answer: '$E = \\frac{v_1(v_2-b)}{v_2(v_1-b)}$; $E(0) = 1$ exactly, and $E$ climbs monotonically as $b \\to v_1$',
                },
                {
                  q: 'The five-question checklist is applied to a chart and it passes all five \u2014 yet a reader still draws a causal conclusion from two rising lines. Which of the five questions was DESIGNED for this, and what is the honest position?',
                  solution: [
                    'Now, none of the five arithmetic questions catches it: the axes are honest, the steps equal, the type right, the pie closed, the source stated.',
                    'So the failure is not in the drawing but in the READING \u2014 a rising pair is a correlation, and correlation is not causation (the ice-cream/drowning pair: the heat rides unseen).',
                    'And the honest position: the checklist audits the CHART; the causal question needs the mechanism \u2014 "what else moves when these move, and does removing the candidate cause remove the effect?"',
                    'Hence: the checklist is necessary, not sufficient \u2014 it certifies the ink, and the reader still owes the chart a causal discipline the ink cannot supply.',
                  ],
                  answer: 'None \u2014 the checklist audits the drawing; causation needs a mechanism, and correlation alone licenses none',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
