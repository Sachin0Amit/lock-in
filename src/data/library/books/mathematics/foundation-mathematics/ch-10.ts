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
    'Bar Charts, Line Graphs and Pie Charts',
    'Reading Graphs Critically',
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
  ],
}
