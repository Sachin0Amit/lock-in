/* part-cf4R - lesson 4.R 'Unit 4 Completion Review' (the chapter-closing review).
   Harvest numbers carried VERBATIM from the four content seats (4.1-4.4);
   the review invents no numbers, it restates the chapter at bench speed.
   Helpers prefixed cf4R so the five chapter parts never collide. */
import type { Lesson } from '../../../src/data/library/types'

/* palette (vivid set; never blue/indigo) */
const c4R = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f4R = 'ui-sans-serif, system-ui, sans-serif'

function cf4RT(x: number, y: number, s: string, size = 11, fill = c4R.ink, anchor = 'middle', weight = 'normal'): string {
  return `<text x="${x}" y="${y}" font-family="${f4R}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
}
function cf4RBox(x: number, y: number, w: number, h: number, fill: string, stroke: string, rx = 7): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`
}
function cf4RArrowH(x1: number, x2: number, y: number, color: string): string {
  const d = x2 > x1 ? 1 : -1
  return `<line x1="${x1}" y1="${y}" x2="${x2 - 7 * d}" y2="${y}" stroke="${color}" stroke-width="2"/><polygon points="${x2},${y} ${x2 - 8 * d},${y - 4.5} ${x2 - 8 * d},${y + 4.5}" fill="${color}"/>`
}
function cf4RArrowV(x: number, y1: number, y2: number, color: string): string {
  const d = y2 > y1 ? 1 : -1
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2 - 7 * d}" stroke="${color}" stroke-width="2"/><polygon points="${x},${y2} ${x - 4.5},${y2 - 8 * d} ${x + 4.5},${y2 - 8 * d}" fill="${color}"/>`
}

/* F1 - the chapter in one map: the city-and-its-life pipeline */
function cf4RMapSvg(): string {
  const W = 760, H = 300
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The chapter in one map: the city and its life. Three boxes on a top rail - the board from 4.1 with its socket, slots, chipset and power; the processor from 4.2 with its cycle, clock, cores and cache pocket; the memory ladder from 4.3 running from registers down to the cloud under the FAST, BIG, CHEAP trade - while the roads of 4.4, the address, data and control buses with the PCIe lanes and the port wall, run as one strip beneath and feed all three by arrows.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(380, 24, 'THE CITY AND ITS LIFE - ONE PIPELINE, FOUR LESSONS', 13, c4R.ink, 'middle', 'bold'))
  s.push(cf4RBox(20, 44, 220, 88, c4R.panelA, c4R.struct))
  s.push(cf4RT(130, 66, 'THE BOARD - 4.1', 12.5, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(130, 84, 'the city plan', 10.5, c4R.tealInk))
  s.push(cf4RT(130, 100, 'socket, slots, chipset,', 10, c4R.ink))
  s.push(cf4RT(130, 114, 'power, the CR2032 heart', 10, c4R.ink))
  s.push(cf4RBox(270, 44, 220, 88, c4R.panelB, c4R.teal))
  s.push(cf4RT(380, 66, 'THE PROCESSOR - 4.2', 12.5, c4R.tealInk, 'middle', 'bold'))
  s.push(cf4RT(380, 84, 'the worker station', 10.5, c4R.tealInk))
  s.push(cf4RT(380, 100, 'cycle, clock, cores,', 10, c4R.ink))
  s.push(cf4RT(380, 114, 'the cache pocket', 10, c4R.ink))
  s.push(cf4RBox(520, 44, 220, 88, c4R.panelA, c4R.conn))
  s.push(cf4RT(630, 66, 'MEMORY LADDER - 4.3', 12.5, c4R.conn, 'middle', 'bold'))
  s.push(cf4RT(630, 84, 'the library system', 10.5, c4R.conn))
  s.push(cf4RT(630, 100, 'registers down to cloud,', 10, c4R.ink))
  s.push(cf4RT(630, 114, 'FAST-BIG-CHEAP', 10, c4R.ink))
  s.push(cf4RArrowH(242, 268, 88, c4R.mid))
  s.push(cf4RArrowH(492, 518, 88, c4R.mid))
  s.push(cf4RT(255, 78, 'hosts', 9.5, c4R.mid, 'middle'))
  s.push(cf4RT(505, 78, 'served by', 9.5, c4R.mid, 'middle'))
  s.push(cf4RBox(20, 200, 720, 66, c4R.white, c4R.accent))
  s.push(cf4RT(380, 226, 'THE ROADS - 4.4: BUSES AND PORTS', 12.5, c4R.accent, 'middle', 'bold'))
  s.push(cf4RT(380, 244, 'address bus asks WHERE - data bus carries WHAT - control bus times WHEN', 10, c4R.ink))
  s.push(cf4RT(380, 258, 'PCIe lanes to the graphics card - the port wall: USB, HDMI, SATA', 10, c4R.ink))
  s.push(cf4RArrowV(130, 196, 132, c4R.accent))
  s.push(cf4RArrowV(380, 196, 132, c4R.accent))
  s.push(cf4RArrowV(630, 196, 132, c4R.accent))
  s.push(cf4RT(380, 286, 'every component a CHOICE with a PRICE - the chapter\'s method throughout', 10, c4R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* F2 - the harvest banner strip: the four seats' headline numbers */
function cf4RBannerSvg(): string {
  const W = 760, H = 132
  const s: string[] = []
  const PW = 178, GAP = 8, X0 = 12, Y0 = 40, PH = 68
  const panels: [string, string, string][] = [
    ['THE BOARD - 4.1', '74,420 mm2', 'ATX footprint (305 x 244)'],
    ['THE CLOCK - 4.2', '6756.7568x', '5 GHz over the 4004'],
    ['THE LADDER - 4.3', '1,500x', 'RAM below L2'],
    ['THE ROAD - 4.4', '31.5077 GB/s', 'x16 lanes at gen4'],
  ]
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The harvest banner strip: the chapter's four headline numbers in four panels. The board panel carries 74,420 square millimetres, the ATX footprint. The clock panel carries 6756.7568 times, how much faster a 5 gigahertz clock beats than the 4004's 740 kilohertz. The ladder panel carries 1,500 times, how far RAM sits below L2. The road panel carries 31.5077 gigabytes per second, what sixteen PCIe lanes move at generation 4.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(380, 24, 'THE CHAPTER\'S FOUR HEADLINE NUMBERS', 12.5, c4R.ink, 'middle', 'bold'))
  panels.forEach((p, i) => {
    const x = X0 + i * (PW + GAP)
    const cols = [c4R.struct, c4R.teal, c4R.conn, c4R.accent]
    s.push(cf4RBox(x, Y0, PW, PH, i % 2 === 0 ? c4R.panelA : c4R.panelB, cols[i]))
    s.push(cf4RT(x + PW / 2, Y0 + 18, p[0], 10, cols[i], 'middle', 'bold'))
    s.push(cf4RT(x + PW / 2, Y0 + 40, p[1], 15, c4R.ink, 'middle', 'bold'))
    s.push(cf4RT(x + PW / 2, Y0 + 57, p[2], 9.5, c4R.tealInk))
  })
  s.push('</svg>')
  return s.join('')
}

/* 4.1 recap figure - the form-factor harvest as area bars */
function cf4RFormFactorSvg(): string {
  const W = 760, H = 208
  const s: string[] = []
  const X0 = 250, W_MAX = 460
  const wM = 0.8 * W_MAX
  const wI = (28900 / 74420) * W_MAX
  const bars: [string, number, string, string][] = [
    ['ATX (1995)', W_MAX, '74,420 mm2 - the full city', c4R.struct],
    ['microATX', wM, '59,536 mm2 = 0.800000 of ATX', c4R.teal],
    ['Mini-ITX (VIA, 2001)', wI, '28,900 mm2 = 0.388336 of ATX', c4R.conn],
  ]
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The form-factor harvest as three area bars drawn to one scale. ATX spans 74,420 square millimetres. microATX spans 59,536 square millimetres, exactly 0.800000 of ATX. Mini-ITX spans 28,900 square millimetres, 0.388336 of ATX and 0.485421 of microATX. The bars shrink left to right because each smaller board trades room for the right size.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(380, 22, 'THREE FOOTPRINTS, ONE SCALE (bar width is the area)', 12, c4R.ink, 'middle', 'bold'))
  bars.forEach((b, i) => {
    const y = 44 + i * 52
    s.push(cf4RT(X0 - 12, y + 20, b[0], 11, c4R.ink, 'end'))
    s.push(`<rect x="${X0}" y="${y}" width="${b[1]}" height="30" rx="4" fill="${b[3]}"/>`)
    s.push(cf4RT(X0 + b[1] + 8, y + 19, b[2], 10.5, c4R.tealInk, 'start'))
  })
  s.push(cf4RT(380, 196, 'one Mini-ITX is 0.485421 of a microATX - two ITX boards nearly tile one ATX', 10, c4R.warn))
  s.push('</svg>')
  return s.join('')
}

export const lesson4R: Lesson = {
  id: 'cf-unit-4-completion-review',
  number: '4.R',
  title: 'Unit 4 Completion Review',
  concepts: [
    'the chapter in one map: the city-and-its-life pipeline from board to processor to memory ladder, joined by the roads',
    'the four lesson recaps, grounded in the engine-pinned harvest numbers',
    'inside the box as a choice with a price: footprint, clock, latency rung, lane width',
    'the four headline witnesses: 74,420 mm2, 6756.7568x, 1,500x, 31.5077 GB/s',
    'the formula and vocabulary harvest of the chapter',
    'the mixed bench: fifteen exam-style questions across all four lessons',
    'the forward door: Software Families - the manager layer and the Operating System\'s doorstep',
  ],
  objectives: [
    'By the end of this lesson you can redraw the chapter\'s one map - the board hosting the worker station served by the memory ladder, all talking along the roads - from memory.',
    'By the end of this lesson you can restate the chapter\'s engine-pinned censuses cold: the form-factor harvest, the clock and Moore census, the latency ladder, and the port census.',
    'By the end of this lesson you can chain two lessons in one move - a form-factor area to a ladder rung to a lane budget - without putting the pencil down.',
    'By the end of this lesson you can price any inside-the-box choice with arithmetic: square millimetres, nanoseconds per beat, times-slower factors, bytes per second.',
    'By the end of this lesson you can walk through the forward door: name what chapter 5 asks of the machine you now know, and say what this chapter handed it.',
  ],
  prerequisites: [
    'cf-the-motherboard-the-city-plan',
    'cf-the-processor-named-honestly',
    'cf-the-first-memory-hierarchy',
    'cf-buses-and-ports-how-the-pieces-talk',
  ],
  sources: ['cs-cf-web-ground-ch04'],
  blocks: [
    // ---------- the opening ----------
    { kind: 'para', text: 'Four lessons ago this chapter owned nothing but a sealed case: what is actually INSIDE the box, and what does each piece cost? Lesson 4.1, \'The Motherboard: The City Plan\', unsealed it - the printed board as a city plan, with the form factors priced in square millimetres and the power story pinned to the 24-pin and 8-pin feeds and the 3 V CR2032 heart. Lesson 4.2, \'The Processor, Named Honestly\', put the workforce on the map - the four-stage cycle, the clock that beats time for everything, and Moore\'s long road from 2,300 transistors to today\'s billions. Lesson 4.3, \'The First Memory Hierarchy\', built the library system the worker reaches for - the latency ladder from the registers down to the cloud, every rung a trade among FAST, BIG and CHEAP. Lesson 4.4, \'Buses and Ports: How the Pieces Talk\', paved the roads - the three buses asking where, carrying what, timing when, and the port wall where the box meets the world. Four lessons plus this review: the chapter ships as $4 + 1 = 5$ seats. This review\'s job is twofold, exactly as the unit reviews of chapters 1 to 3 were twofold: first put the whole chapter back together in ONE map you can redraw from memory, and then make you USE it on a mixed bench - because a chapter that cannot be used was never learned. Every number below was engine-pinned before this prose was written; the review invents nothing, it restates the chapter at bench speed.' },

    // ---------- the one map ----------
    { kind: 'para', text: 'A review, the earlier unit reviews taught, is not a summary but a REHEARSAL: the map first, then the bench, then the door. This chapter opened with a sealed case and closes with a working city; what follows walks it four times - once per lesson - with every number the seats pinned, and then hands you fifteen questions that make the city answer for itself.' },

    { kind: 'heading', text: 'The Chapter in One Map' },
    { kind: 'para', text: 'Read the map the way it is drawn. A city plan (**the board**, 4.1) hosts a **worker station** (the processor, 4.2), whose every move is timed by a clock and served by a **library system** (the memory ladder, 4.3) - registers at the worker\'s own pocket, then cache, RAM, SSD, HDD, the cloud. Beneath all three run the **roads** (4.4): the address bus asking where, the data bus carrying what, the control bus timing when, the PCIe lanes hauling the heavy freight, and the port wall where USB, HDMI and SATA meet the world. The chapter\'s one method sits under the whole drawing: every component is a **choice with a price** - a footprint priced in square millimetres, a clock priced in nanoseconds per beat, a rung priced in times-slower factors, a road priced in bytes per second.' },
    { kind: 'figure', caption: 'The chapter in one map: the city-and-its-life pipeline. The board (4.1) hosts the worker station (4.2), which is served by the memory ladder (4.3) reaching from the registers down to the cloud under the FAST-BIG-CHEAP trade - while the roads of 4.4 (buses, lanes, ports) run beneath and connect all three. If you can redraw this from memory, you hold the chapter.', svg: cf4RMapSvg() },
    { kind: 'callout', tone: 'definition', title: 'The inside-the-box pipeline, defined once', text: 'The inside-the-box pipeline is said to be the chapter\'s own thread: a **city** (the board - 4.1\'s form factor, socket, chipset and power) **hosts a workforce** (the processor - 4.2\'s cycle and clock), the workforce is **served by a library system** (the memory hierarchy - 4.3\'s ladder of latency), and all three **talk along roads** (4.4\'s buses, lanes and ports). Symbolically: the board supplies the seats, the clock supplies the tempo, the ladder supplies the books, the buses supply the couriers - and each seat, tempo, book and courier was priced, never admired.' },
    { kind: 'para', text: 'The map earns its keep by CHAINING: any two lessons compose into one move. The board\'s footprint prices the ladder\'s seats; the ladder\'s rungs price the roads\' freight; the roads\' bandwidth prices the worker\'s appetite. Hold the three boxes and the one strip beneath, and every isolated fact in the recaps below snaps back onto its home rail.' },
    { kind: 'para', text: 'Four numbers carry the whole chapter on one strip - the four witnesses the recaps below will keep quoting. The board\'s headline is the ATX footprint, $305 \\times 244 = 74{,}420$ mm². The clock\'s headline is the speed-up, $5\\text{ GHz} \\div 740\\text{ kHz} = 6756.7568\\times$ over the first processor. The ladder\'s headline is the RAM rung\'s fall, $1{,}500\\times$ below L2. The road\'s headline is the freight lane, $31.5077$ GB/s on sixteen PCIe lanes at generation 4. Meet them once here; the bench will expect them on demand.' },
    { kind: 'figure', caption: 'The harvest banner (F2): the four seats\' headline numbers as one computed strip - 74,420 mm2 of board, 6756.7568x of clock, 1,500x of ladder, 31.5077 GB/s of road. Four lessons, four numbers, one chapter.', svg: cf4RBannerSvg() },
    { kind: 'para', text: 'Use the banner as the chapter\'s index card. Each panel is one lesson\'s whole harvest compressed to a number you can check by hand: the area multiplies from its edges, the clock ratio divides the two frequencies, the ladder factor divides the two latencies, the road bundle multiplies lane by count. Four panels, four one-line derivations - rebuild each number and you own the chapter.' },

    // ================================================================
    // 2. THE FOUR PER-LESSON RECAPS (the siblings' pinned numbers,
    //    carried verbatim - the review invents no numbers)
    // ================================================================
    { kind: 'heading', text: 'Lesson 4.1 Recap: The Motherboard - The City Plan' },
    { kind: 'para', text: 'Lesson 4.1 drew the city plan: the motherboard as the printed board on which every other lesson\'s actors find their seats. The harvest is a census of footprints and fittings. **ATX** arrived in 1995 at $305 \\times 244$ mm, an area of $74{,}420$ mm². **microATX** trimmed the same plan to $59{,}536$ mm² - exactly $0.800000$ of ATX, a twentieth saved and four-fifths kept, the cleanest fraction in the census. **Mini-ITX**, which VIA shipped in 2001, took $170 \\times 170$ mm $= 28{,}900$ mm²: $0.388336$ of ATX and $0.485421$ of microATX - two ITX boards nearly, but never quite, tile one ATX. The fittings carry their own pinned numbers: a DIMM seats on **288 pins**; the CMOS clock lives on a **CR2032** coin cell at **3 V**; the board feeds on a **24-pin** main connector plus an **8-pin** CPU feed. The plan\'s history is pinned too - the **IBM PC** of August 1981 set the planar-board habit the industry still follows, and Intel\'s **Nehalem** of 2008 folded the memory controller INTO the processor, redrawing which seats the board itself still owns.' },
    { kind: 'para', text: 'Read the fittings as one system rather than a list. The power feeds arrive first (24-pin for the board, 8-pin for the processor), the CR2032 keeps the timekeeper alive when they do not, and the 288-pin DIMMs are the seats where 4.3\'s RAM rung physically lands. The census\'s habit throughout: quote the unit with the number - square millimetres, volts, pins - because an unlabelled number prices nothing.' },
    { kind: 'figure', caption: 'The form-factor harvest, drawn to one scale: ATX at 74,420 mm2 (1995), microATX at 59,536 mm2 = 0.800000 of ATX, Mini-ITX at 28,900 mm2 = 0.388336 of ATX (VIA, 2001). The bars shrink because each smaller footprint trades build room for a smaller box - the chapter\'s choice-with-a-price method in three rectangles.', svg: cf4RFormFactorSvg() },
    { kind: 'table', caption: 'The form-factor census of lesson 4.1, with the fittings and the history the recap carries: every row a pinned value the bench may ask for cold.', head: ['The row', 'The pinned value', 'What it prices'], rows: [
      ['ATX (1995)', '305 x 244 mm = 74,420 mm2', 'the full city plan'],
      ['microATX', '59,536 mm2 = 0.800000 of ATX', 'four-fifths kept, a fifth given up'],
      ['Mini-ITX (VIA 2001)', '170 x 170 mm = 28,900 mm2', '0.388336 of ATX, 0.485421 of microATX'],
      ['Memory seat', 'DIMM, 288 pins', 'one byte at a time? no - 64 data lines wide'],
      ['Timekeeper', 'CR2032, 3 V', 'the CMOS clock that never sleeps'],
      ['Power feeds', '24-pin + 8-pin', 'the mains roads onto the city'],
      ['History', 'IBM PC August 1981; Nehalem 2008', 'the planar habit; the memory controller moves INTO the CPU'],
    ] },
    { kind: 'example', title: 'Recap Illustration: the 80.0% arithmetic - what microATX keeps and what it gives up.', steps: [
      'Take the two areas as pinned: ATX $74{,}420$ mm² and microATX $59{,}536$ mm².',
      'So the keeping fraction is $59{,}536 \\div 74{,}420 = 0.800000$ exactly - four significant zeros, the census\'s cleanest number.',
      'Now, price the giving-up side: $74{,}420 - 59{,}536 = 14{,}884$ mm² handed back.',
      'Check the two roads agree: $14{,}884 \\div 74{,}420 = 0.200000$, and $0.800000 + 0.200000 = 1$ - a footprint is conserved.',
      'Hence the builder\'s trade in one line: lose $14{,}884$ mm² (two DIMM seats and spare lanes, typically), gain a box a fifth smaller.',
      'Thus the 80.0% is not trivia but the price tag itself - the same trade Mini-ITX doubles down on at $0.388336$ of ATX.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Two dates that redrew the plan', text: 'August 1981: the IBM PC ships with a single **planar board** - everything important soldered to one plane - and the industry inherits a layout habit it has never really dropped. 2008: Intel\'s **Nehalem** folds the memory controller into the processor itself, so the "memory highway" that once belonged to the chipset now leaves the CPU package directly. The lesson\'s honest retelling: the city plan is not eternal - it is renegotiated every time a component outgrows its seat, and each renegotiation left a pinned date the census still quotes.' },

    { kind: 'heading', text: 'Lesson 4.2 Recap: The Processor, Named Honestly' },
    { kind: 'para', text: 'Lesson 4.2 named the worker honestly: a processor is a **cycle** machine - fetch, decode, execute, write back, four stages turning forever - timed by a **clock** whose beat prices every move. The pinned laws: $1\\text{ GHz} = 10^9$ cycles per second, so a $5\\text{ GHz}$ clock beats once every $0.2\\text{ ns}$. The history the seat pinned: the Intel **4004** shipped on **15 November 1971** with **2,300** transistors beating at **740 kHz** - so a 5 GHz clock out-beats the first processor $5{,}000{,}000{,}000 \\div 740{,}000 = 6756.7568\\times$. The **1 GHz** race was won by **AMD on 6 March 2000**, Intel crossing two days later; **May 2005** was the dual-core month, when the industry stopped racing one clock and started counting workers. **Moore\'s law** - stated **19 April 1965**, revised in **1975** to a doubling every two years - predicts $2{,}300 \\times 2^{26} = 154{,}350{,}387{,}200$ transistors for 2023\'s flagship; the M2 Ultra actually shipped $134$ billion, so the prediction sits $1.151869\\times$ high - **15.1869%** above the truth after fifty-two years. And the honest footnote: cache is SRAM, priced at **6 transistors per bit** - speed bought in silicon real estate.' },
    { kind: 'para', text: 'The recap\'s honest lesson is HOW the numbers were graded, not only what they are. The clock ratio divides modern cycles by 1971\'s cycles; the Moore prediction compounds the 1971 census forward at the revised pace and then stands IN COURT against a real chip - and the verdict, 15.1869% high, is recorded rather than excused. Grade your laws the same way: derive, compare, report the miss.' },
    { kind: 'figure', caption: 'The Moore census as one computed pair of bars: the revised two-year pace predicts 2,300 x 2^26 = 154,350,387,200 transistors for the 2023 flagship; the M2 Ultra actually carried 134,000,000,000. The prediction stands 1.151869x high - 15.1869% above the actual after 26 doublings - which is the honest way to grade a law: close, not exact.', svg: cf4RMooreSvg() },
    { kind: 'example', title: 'Recap Illustration: 6756.7568x - the first processor against the modern clock, in three moves.', steps: [
      'Take the two clocks as pinned: the 4004 beat at $740\\text{ kHz} = 7.4 \\times 10^5$ cycles/s; the modern part beats at $5\\text{ GHz} = 5 \\times 10^9$ cycles/s.',
      'So the ratio is $5 \\times 10^9 \\div 7.4 \\times 10^5 = 6756.7568$ (4 dp) - the modern clock beats 6756.7568 times for every one 4004 beat.',
      'Check it through the beat: the 4004 needed $1 \\div 7.4 \\times 10^5 \\approx 1.35$ us a beat; the 5 GHz part needs $0.2\\text{ ns}$ - and $1.35\\text{ us} \\div 0.2\\text{ ns} \\approx 6750$, the same order, both roads agreeing.',
      'Hence one modern SECOND of beats would have taken the 4004 roughly 6756.7568 seconds - about 1 hour 52 minutes - to tick through.',
      'Thus "6756.7568x" is not a boast but a price: fifty-three years of engineering, bought at the clock.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The summed-GHz trap, one last time', text: 'Four cores at $3\\text{ GHz}$ each sum to $4 \\times 3 = 12\\text{ GHz}$ on paper - and the paper is lying. The clock is the TEMPO each worker keeps; cores are the COUNT of workers. Four workers at three billion beats a second each divide the work; they do not merge into one worker beating twelve billion times a second. Any advert that adds clock speeds across cores has confused the workforce with the tempo - the examination\'s favourite trap, and the chapter\'s most-marked warning.' },

    { kind: 'heading', text: 'Lesson 4.3 Recap: The First Memory Hierarchy' },
    { kind: 'para', text: 'Lesson 4.3 built the library system: the **ladder** from the registers through L1/L2/L3 cache, RAM, SSD, HDD and out to the cloud, every rung a trade among **FAST, BIG and CHEAP**. The census, pinned in nanoseconds: registers $0.5\\text{ ns}$; L1 $7\\text{ ns}$ - $14\\times$ the registers; L2 $100\\text{ ns}$ - $14.2857\\times$ L1 and $200\\times$ the registers; RAM $150\\ \\mu\\text{s}$ - $1{,}500\\times$ below L2; SSD $10\\text{ ms}$ - $66.6667\\times$ below RAM; HDD $150\\text{ ms}$ - the ocean voyage, $15\\times$ below the SSD. Registers to HDD is one $300{,}000{,}000\\times$ span. The physics and history beneath: **Dennard** described the one-transistor-one-capacitor DRAM cell in 1966 and pinned it in **patent 3,387,286 on 4 June 1968** - a cell that leaks, hence the **64 ms** refresh drumbeat; SRAM holds its bit in **6 transistors**, no leaking, no refreshing, all price. The disk\'s birthday: **RAMAC on 14 September 1956**, fifty platters carrying about **3.75 MB**. And the ladder\'s secret engine is **the two localities** - you reuse what you recently used (temporal) and what sits near it (spatial) - which is why a small fast rung can serve a big slow one at all.' },
    { kind: 'para', text: 'Work the census, do not just admire it. A miss is priced by the rung you fall TO: miss L1 to L2 and you pay 14.2857 L1 visits; miss the caches to RAM and you pay 1,500 times. The table\'s human column is the ritual that makes the span unforgettable - translate every latency before you judge it, and the ladder stops being a diagram and becomes a conscience.' },
    { kind: 'table', caption: 'The latency census of lesson 4.3, with each rung\'s times-slower factor and its human-ladder translation (every machine nanosecond becomes two human seconds). Quote these cold; the bench will.', head: ['The rung', 'Latency', 'Times-slower witness', 'Human scale'], rows: [
      ['Registers', '0.5 ns', 'the worker\'s own pocket', '1 s'],
      ['L1 cache', '7 ns', '14x the registers', '14 s'],
      ['L2 cache', '100 ns', '14.2857x L1; 200x the registers', '200 s'],
      ['RAM', '150 us', '1,500x below L2', '3.472222 days'],
      ['SSD', '10 ms', '66.6667x below RAM', '231.481481 days = 7.6 months'],
      ['HDD', '150 ms', '15x below SSD - the ocean voyage', '9.5064263 years - call it 9.5'],
    ] },
    { kind: 'figure', caption: 'The FAST-BIG-CHEAP triangle (F3), with the census rungs placed. The apex holds the SRAM corner - registers and cache, fast and cheap per byte but small, at 6 transistors a bit. The floor holds the SSD, HDD and cloud - big and cheap but slow, out to the 150 ms ocean. RAM sits at the balance point, 1,500x below L2 and 66.6667x above the SSD. Pick any two; the third is the price.', svg: cf4RTriangleSvg() },
    { kind: 'example', title: 'Recap Illustration: the human ladder - machine latencies translated into a life you can feel.', steps: [
      'Take the translation rule: one machine nanosecond becomes two human seconds - a scale that makes the registers\' $0.5\\text{ ns}$ exactly $1\\text{ s}$.',
      'So one register fetch costs a heartbeat: 1 s.',
      'Now, L1\'s $7\\text{ ns}$ becomes $14\\text{ s}$, and L2\'s $100\\text{ ns}$ becomes $200\\text{ s}$ - three minutes twenty for one L2 visit.',
      'So RAM\'s $150\\ \\mu\\text{s}$ becomes $300{,}000\\text{ s} = 3.472222$ days - you post a request to the librarian and wait half a week.',
      'Thus SSD\'s $10\\text{ ms}$ becomes $231.481481$ days $= 7.6$ months, and HDD\'s $150\\text{ ms}$ becomes $9.5064263$ years - call it $9.5$ years for one mechanical read.',
      'Check the span: $150\\text{ ms} \\div 0.5\\text{ ns} = 300{,}000{,}000$ - one heartbeat against 9.5 years. Hence the ladder is not a diagram; it is a moral about patience.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Dennard\'s cell and RAMAC\'s platters', text: 'Two pinned birthdays hold the ladder\'s ends. At the fast end: Robert Dennard described the one-transistor, one-capacitor DRAM cell in 1966 and secured it as **patent 3,387,286 on 4 June 1968** - a brilliant, leaking bargain that still demands its **64 ms** refresh drumbeat. At the slow end: **RAMAC** shipped on **14 September 1956** - fifty platters, about **3.75 MB**, the first ocean-going mechanical memory. Our own retelling: every rung between them is a treaty between Dennard\'s speed and RAMAC\'s room, renegotiated each decade.' },
    { kind: 'callout', tone: 'theorem', title: 'The FAST-BIG-CHEAP verdict', text: 'For the ladder\'s rungs the chapter\'s law reads: a memory level may be FAST and BIG, or FAST and CHEAP, or BIG and CHEAP - never all three at once. SRAM (6 transistors a bit) buys FAST and CHEAP-per-access but is never BIG; the HDD ocean is BIG and CHEAP but is never FAST ($150\\text{ ms}$); RAM sits at the balance point, $1{,}500\\times$ below L2 and $66.6667\\times$ above the SSD, pricing the compromise honestly. Every machine you will ever buy is one walk around this triangle.' },
    { kind: 'example', title: 'Recap Illustration: the two localities in one evening of reading.', steps: [
      'Take a reader who opens this page at some late hour - the program fetching one line of text.',
      'So temporal locality: the reader re-reads the SAME line twice before moving on - recently used data is used again, which is why L1\'s $7\\text{ ns}$ keeps paying.',
      'Now, spatial locality: the next line read sits BESIDE the last in memory - so the ladder fetches the neighbourhood, not the orphan.',
      'Check the payoff: a loop that hits L1 nine visits in ten and L2 once averages $0.9 \\times 7 + 0.1 \\times 100 = 16.3\\text{ ns}$ - far nearer the fast rung than the $100\\text{ ns}$ label alone suggests.',
      'Hence the two localities are the ladder\'s engine: caches work because YOU work in patterns, and the $1{,}500\\times$ RAM wall is crossed rarely enough to forgive.',
    ] },

    { kind: 'heading', text: 'Lesson 4.4 Recap: Buses and Ports - How the Pieces Talk' },
    { kind: 'para', text: 'Lesson 4.4 paved the roads and counted the gates. The **three buses** inside: the **address bus** asks WHERE - 32 lines name $2^{32} = 4{,}294{,}967{,}296$ bytes, exactly $4$ GiB of reach; the **data bus** carries WHAT; the **control bus** times WHEN. Then the expandable lanes: **PCIe** generation 1 moves $250\\text{ MB/s}$ per lane, generation 3 $984.6154\\text{ MB/s}$, generation 4 $1969.2308\\text{ MB/s}$, generation 5 $3938.4615\\text{ MB/s}$ - every doubling generation doubles the lane - so the **x16** bundle at gen4 moves $31.5077\\text{ GB/s}$, the graphics freight road. The **port wall** where the box meets the world: **USB** (1996) opened at $12\\text{ Mbit/s}$; **USB 2.0** on **27 April 2000** carried $480\\text{ Mbit/s}$, $40\\times$ the original; **USB 3.0** (2008) reached $5\\text{ Gbit/s}$, $10.4167\\times$ on; **USB4** (2019) runs $40\\text{ Gbit/s}$, another $8\\times$ - with the **USB-C** plug arriving in **August 2014** to carry them all. The **screen road**: **HDMI 1.0** on **9 December 2002** moved $4.95\\text{ Gbit/s}$; **HDMI 2.1** (2017) moves $48\\text{ Gbit/s}$, $9.69697\\times$. And the **disk road**: **SATA 3.0** signals at $6\\text{ Gbit/s}$, paying its 8b/10b toll to deliver $600\\text{ MB/s}$ raw.' },
    { kind: 'para', text: 'The roads recap carries one habit above all: CONVERT before comparing. Ports speak Mbit/s, lanes speak MB/s or GB/s, SATA quotes signalling bits before its encoding toll; the strip\'s families only compose when their units agree. Once converted, the whole wall lines up on one ruler - and every doubling, gate and toll becomes a one-line division.' },
    { kind: 'figure', caption: 'The port census as one timeline strip, drawn on an even grid (the true ratios are printed, not scaled): PCIe lanes doubling 250 to 3938.4615 MB/s per lane from gen1 to gen5; USB climbing 12 Mbit/s to 40 Gbit/s through the 40x, 10.4167x and 8x gates; HDMI leaping 9.69697x from 4.95 to 48 Gbit/s; SATA tolling down to 600 MB/s. The roads of the city, priced per second.', svg: cf4RPortsSvg() },
    { kind: 'table', caption: 'The port census of lesson 4.4: every road, its pinned rates, and the honest unit habit each row teaches.', head: ['The road', 'The pinned rates', 'What it prices'], rows: [
      ['Address bus (32 lines)', '2^32 = 4,294,967,296 bytes', 'exactly 4 GiB of reach'],
      ['PCIe per lane, gen1 to gen5', '250 to 984.6154 to 1969.2308 to 3938.4615 MB/s', 'each doubling generation doubles the lane'],
      ['PCIe x16 at gen4', '16 x 1969.2308 MB/s', '31.5077 GB/s - the graphics freight road'],
      ['USB 1996 to USB4 2019', '12 Mbit/s; 27 April 2000: 480 (40x); 2008: 5 Gbit/s (10.4167x); 2019: 40 Gbit/s (8x)', '3333.3333x across the family'],
      ['USB-C plug', 'August 2014', 'one reversible plug for all the speeds'],
      ['HDMI 1.0 to 2.1', '9 December 2002: 4.95 Gbit/s; 2017: 48 Gbit/s', '9.69697x - the screen road'],
      ['SATA 3.0', '6 Gbit/s signalling, 8b/10b', '600 MB/s raw - the disk road'],
    ] },
    { kind: 'example', title: 'Recap Illustration: the divide - the graphics road against the old USB wall.', steps: [
      'Take the two roads as pinned: the graphics lane bundle moves $31.5077\\text{ GB/s}$; the old USB 2.0 wall moves $480\\text{ Mbit/s} = 60\\text{ MB/s}$.',
      'So put them in one unit: $31.5077\\text{ GB/s} = 31{,}507.7\\text{ MB/s}$.',
      'Now, divide: $31{,}507.7 \\div 60 = 525.1282$.',
      'Thus the graphics road carries $525.1282$ USB-2.0-worth of freight every single second - the divide the port wall lives on.',
      'Check it from the pins: $16 \\times 1969.2308 = 31{,}507.7\\text{ MB/s}$, and $480 \\div 8 = 60\\text{ MB/s}$ - both roads close.',
      'Hence the census\'s last honest habit: a port quotes Mbit/s, a lane quotes GB/s - convert before you compare.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why the lanes, not just the wall', text: 'The port wall sells plugs; the lanes sell bandwidth. One PCIe lane at gen4 moves $1969.2308\\text{ MB/s}$ - more than three USB 3.0 ports together - and sixteen of them bundle to $31.5077\\text{ GB/s}$ because lane bandwidth ADDS. That is why the graphics card takes lanes, the SSD takes four, and the keyboard takes one USB wall: the chapter\'s method again - match the road\'s width to the freight\'s weight, and pay only for the width you need.' },

    // ================================================================
    // 3. THE SYNTHESIS
    // ================================================================
    { kind: 'heading', text: 'The Synthesis: A Choice with a Price, Paid Four Ways' },
    { kind: 'para', text: 'Strip the four lessons to one sentence and it reads: **inside the box, every component is a choice, and every choice has a price the chapter has now paid.** The board is a choice - $74{,}420\\text{ mm}^2$ of ATX, or $0.800000$ of it, or $0.388336$ of it, each fraction trading build room against box size. The clock is a choice - $0.2\\text{ ns}$ a beat at 5 GHz, priced against heat and against the $6756.7568\\times$ road the 4004 already walked. The ladder is a choice - $1{,}500\\times$ between L2 and RAM, FAST-BIG-CHEAP picking two. The roads are a choice - $31.5077\\text{ GB/s}$ of lane bundle, or a $60\\text{ MB/s}$ wall, priced per second. Four seats, one method: name the choice, count the price.' },
    { kind: 'para', text: 'Keep two souvenirs and you keep the chapter. The **one map** - a city (board) hosting a workforce (processor) served by a library system (memory ladder) and connected by roads (buses and ports) - redraws on a napkin and recalls all four vocabularies at once. The **four witnesses** - $74{,}420\\text{ mm}^2$, $6756.7568\\times$, $1{,}500\\times$, $31.5077\\text{ GB/s}$ - quote the whole chapter in four numbers, and the bench below will ask for each of them cold.' },

    // ================================================================
    // 4. THE MIXED BENCH (15 exam-style questions, L1-L4)
    // ================================================================
    { kind: 'para', text: 'The bench is the method under examination conditions: each question is one of the four prices, or two of them chained. Answer with the same ritual the recaps used - name the pinned values, derive, check by a second road, then state the price in its honest unit. The four witnesses on the banner are fair game in every seat; quote them cold.' },

    { kind: 'heading', text: 'The Mixed Bench: Fifteen Questions Across the Chapter' },
    { kind: 'para', text: 'The bench spans all four lessons and climbs four rungs: L1 begins - single labellings and single reads; L2 consolidates - full areas, full ratios, full censuses; L3 advances - two-road verifications and the Moore verdict; L4 charges - the divide, the whole-chapter build, and one honest two-part exam piece. At least four solutions carry their own diagrams. Choose your own level, but attempt every seat: the chapter is now yours to USE.' },
    { kind: 'para', text: 'Score yourself honestly: an answer with the right method and a slipped digit is half marks; a remembered number with no derivation is none - the chapter priced choices, and the bench prices derivations. The diagrams in five of the solutions are part of the method: redraw them from memory after marking, and the redraw is the revision.' },
    { kind: 'exercises', title: 'Exercises 4.R - the mixed bench across the chapter', sets: [
      { level: 'L1', questions: [
        { q: 'A motherboard photo is labelled with four regions: the CPU socket, the DIMM slots, the chipset and the power connectors. For each region say in one line what it hosts or feeds, and attach the pinned fitting that goes with it (288-pin DIMMs, CR2032 at 3 V, 24-pin + 8-pin feeds).', solution: [
          'Take the socket: it seats the processor - 4.2\'s worker station - and since Nehalem (2008) the memory controller rides inside that package.',
          'So the DIMM slots seat memory: each DIMM lands on 288 pins, and the slots are the ladder\'s doorway to the RAM rung.',
          'Now, the chipset: the board\'s town hall - it stitches the slower districts (ports, storage, legacy) to the processor\'s roads.',
          'Thus the 24-pin main connector feeds the whole board, with the 8-pin feed reserved for the processor\'s own appetite.',
          'Check the small fitting: the CR2032 coin at 3 V keeps the CMOS timekeeper ticking while the mains is off - the city never fully sleeps.',
        ], answer: 'socket = the processor; DIMM slots = RAM on 288 pins; chipset = the town hall; 24-pin + 8-pin = the power feeds; CR2032 at 3 V = the always-on timekeeper', figures: [{ caption: 'The mini city plan: the socket seating the worker, two 288-pin DIMM slots, the chipset town hall, the 24-pin and 8-pin power feeds and the CR2032 coin cell - 4.1\'s board with its pinned fittings in place.', svg: cf4RSolCitySvg() }] },
        { q: 'A processor runs at 4 GHz. (i) How long is one beat of its clock, in nanoseconds? (ii) Name the four stages of the cycle in order.', solution: [
          'Take the pinned law: $1\\text{ GHz} = 10^9$ cycles per second.',
          'So 4 GHz beats $4 \\times 10^9$ times a second, and one beat lasts $1 \\div (4 \\times 10^9)\\text{ s} = 0.25\\text{ ns}$.',
          'Check against the pinned witness: 5 GHz gives $0.2\\text{ ns}$, and 4 GHz beats slower, so $0.25\\text{ ns} > 0.2\\text{ ns}$ - the order is right.',
          'Thus (ii) the cycle runs fetch, then decode, then execute, then write back - four stages, every instruction, forever.',
        ], answer: 'one beat = 0.25 ns; the cycle is fetch -> decode -> execute -> write back' },
        { q: 'Put the six census rungs in speed order, fastest first: RAM, registers, SSD, L2, HDD, L1 - and beside each write its pinned latency and the trade it makes on the FAST-BIG-CHEAP triangle.', solution: [
          'Take the census and sort by latency, smallest first: registers $0.5\\text{ ns}$; L1 $7\\text{ ns}$; L2 $100\\text{ ns}$; RAM $150\\ \\mu\\text{s}$; SSD $10\\text{ ms}$; HDD $150\\text{ ms}$.',
          'So the order is: registers, L1, L2, RAM, SSD, HDD - exactly the ladder\'s own drawing order.',
          'Now, attach the trades: registers and cache are FAST (but small - SRAM at 6 transistors a bit); RAM is the balance point; SSD, HDD and the cloud are BIG and CHEAP (but slow).',
          'Check the witnesses: L1 is $14\\times$ the registers; RAM is $1{,}500\\times$ below L2; the HDD ocean is $15\\times$ below the SSD - each step down buys room and cheapness at a times-slower price.',
          'Hence the verdict: no rung escapes the triangle - pick two of FAST, BIG, CHEAP, and pay the third.',
        ], answer: 'registers 0.5 ns, L1 7 ns, L2 100 ns, RAM 150 us, SSD 10 ms, HDD 150 ms - FAST at the top, BIG-CHEAP at the floor, RAM the balance' },
      ] },
      { level: 'L2', questions: [
        { q: 'Compute the ATX and Mini-ITX areas from their edge lengths; state the ITX fraction of ATX to six decimal places; and say how many COMPLETE Mini-ITX footprints tile one ATX board.', solution: [
          'Take the edges as pinned: ATX is $305 \\times 244\\text{ mm}$, Mini-ITX is $170 \\times 170\\text{ mm}$.',
          'So ATX is $305 \\times 244 = 74{,}420\\text{ mm}^2$ and Mini-ITX is $170 \\times 170 = 28{,}900\\text{ mm}^2$.',
          'Now, the fraction: $28{,}900 \\div 74{,}420 = 0.388336$ (6 dp).',
          'Thus the tiling: $74{,}420 \\div 28{,}900 = 2.5751$ - two complete ITX boards, with $57.44\\%$ of a third left over.',
          'Hence the 2001 trade in one line: a third of the city for a box that fits in the palm.',
        ], answer: 'ATX = 74,420 mm2; Mini-ITX = 28,900 mm2 = 0.388336 of ATX; two complete ITX footprints tile one ATX (2.5751 with the fraction)' },
        { q: 'The 4004 beat at 740 kHz on 15 November 1971 with 2,300 transistors. By what factor (4 dp) does a 5 GHz clock out-beat it, and how many two-year doublings separate 1971 from 2023?', solution: [
          'Take the clocks as pinned: $740\\text{ kHz} = 7.4 \\times 10^5$ cycles/s against $5 \\times 10^9$ cycles/s.',
          'So the factor is $5 \\times 10^9 \\div 7.4 \\times 10^5 = 6756.7568$ (4 dp).',
          'Now, the doublings: $(2023 - 1971) \\div 2 = 26$ - Moore\'s revised two-year pace, 26 doublings in 52 years.',
          'Check the width of the gap: 26 doublings is a factor $2^{26} = 67{,}108{,}864$ in transistor budget - the clock factor and the transistor factor are different censuses of the same half-century.',
          'Hence one modern second of beats would have taken the 4004 about 6756.7568 seconds to tick through.',
        ], answer: '6756.7568x the clock; 26 doublings (2^26 = 67,108,864) from 1971 to 2023' },
        { q: 'A machine\'s address bus is 32 lines wide. How many distinct addresses does it name, how many bytes does that reach, and what honest GiB figure is that?', solution: [
          'Take the census law: $n$ lines name $2^n$ addresses - 32 lines name $2^{32}$.',
          'So the bus names $2^{32} = 4{,}294{,}967{,}296$ addresses, one byte each at its smallest grain.',
          'Now, the honest unit: $4{,}294{,}967{,}296 \\div 2^{30} = 4$ exactly - exactly 4 GiB, not 4 decimal GB.',
          'Check the honest gap: $4{,}294{,}967{,}296 \\div 4{,}000{,}000{,}000 = 1.073741824$, so the decimal reading sells the reach 7.37% short.',
          'Hence the habit: quote the GiB - the binary prefix is the honest one.',
        ], answer: '2^32 = 4,294,967,296 bytes = exactly 4 GiB (the decimal 4 GB undersells it by 7.37%)' },
        { q: 'One L2 visit costs 100 ns, one L1 hit costs 7 ns, one RAM visit costs 150 us. How many L1 hits fit inside one L2 miss (4 dp), how many L2 misses fit inside one RAM visit, and which working habit keeps a program on the cheap rungs?', solution: [
          'Take the ratios: $100 \\div 7 = 14.2857$ (4 dp) L1 hits fit inside one L2 miss.',
          'So one RAM visit costs $150{,}000 \\div 100 = 1{,}500$ L2 misses - the pinned RAM factor itself.',
          'Now, the habit: the two LOCALITIES - temporal (reuse what you just used) and spatial (fetch the neighbourhood, not the orphan).',
          'Thus a loop with the right localities lives on L1 and L2, crossing the $1{,}500\\times$ RAM wall rarely enough to forgive.',
          'Hence the ladder serves the disciplined program and taxes the scattered one - the census\'s moral, priced in nanoseconds.',
        ], answer: '14.2857 L1 hits per L2 miss; 1,500 L2 misses per RAM visit; temporal and spatial locality keep you cheap', figures: [{ caption: 'The latency ladder, priced: registers 0.5 ns, L1 7 ns, L2 100 ns, RAM 150 us, with the bracket witnesses 14x, 14.2857x and 1,500x between the rungs - the arithmetic of question 7 drawn as one strip.', svg: cf4RSolLadderSvg() }] },
      ] },
      { level: 'L3', questions: [
        { q: 'Verify by TWO roads that microATX is exactly 0.800000 of ATX; compute the area handed back in mm2; and state Mini-ITX\'s fraction of microATX to six decimal places.', solution: [
          'Take road one: $59{,}536 \\div 74{,}420 = 0.800000$ - the fraction directly.',
          'Now, road two: $0.8 \\times 74{,}420 = 59{,}536$ - the fraction walks home to the pinned area, so the census closes both ways.',
          'Thus the area handed back: $74{,}420 - 59{,}536 = 14{,}884\\text{ mm}^2$, which is $14{,}884 \\div 74{,}420 = 0.200000$ of ATX.',
          'So Mini-ITX against the smaller rival: $28{,}900 \\div 59{,}536 = 0.485421$ (6 dp) - an ITX board is nearly half a microATX city.',
          'Hence three fractions, one census: $0.800000$ kept, $0.200000$ given, $0.485421$ inherited.',
        ], answer: 'microATX = 0.800000 of ATX both roads; 14,884 mm2 handed back (20.0%); Mini-ITX = 0.485421 of microATX', figures: [{ caption: 'The two-footprint check drawn to one scale: ATX at 74,420 mm2 full width, Mini-ITX at 28,900 mm2 = 0.388336 of the width - the ratio of question 8 as two bars.', svg: cf4RSolAreaSvg() }] },
        { q: 'Moore\'s revised two-year pace predicts $2{,}300 \\times 2^{26}$ transistors for the 2023 flagship. Compute the prediction EXACTLY, compare it with the M2 Ultra\'s 134 billion, and state the ratio (6 dp) and the percentage overshoot (4 dp). Then grade the law in one honest sentence.', solution: [
          'Take the doublings: 52 years at the two-year pace give $(2023 - 1971) \\div 2 = 26$ doublings, and $2^{26} = 67{,}108{,}864$.',
          'So the prediction is $2{,}300 \\times 67{,}108{,}864 = 154{,}350{,}387{,}200$ transistors - exact, no rounding.',
          'Now, the comparison: $154{,}350{,}387{,}200 \\div 134{,}000{,}000{,}000 = 1.151869$ (6 dp).',
          'Thus the overshoot: $(1.151869 - 1) \\times 100 = 15.1869\\%$ (4 dp) above what actually shipped.',
          'Hence the grade: fifty-two years of a two-year doubling law landed 15.1869% high - remarkably close, honest about being a law of thumb, not of nature.',
        ], answer: 'prediction 154,350,387,200; ratio 1.151869; overshoot 15.1869% - the law graded close, not exact' },
        { q: 'A PCIe gen4 lane moves 1,969.2308 MB/s of payload. (i) What does the x16 bundle move, in GB/s to 4 dp? (ii) How long does one 4 GiB load take to cross it (4 dp of a second)?', solution: [
          'Take the lane budget law: bundle = lanes x per-lane rate.',
          'So the bundle is $16 \\times 1969.2308 = 31{,}507.7\\text{ MB/s} = 31.5077\\text{ GB/s}$ (4 dp).',
          'Now, the freight: 4 GiB is the address bus\'s own reach, $2^{32} = 4{,}294{,}967{,}296\\text{ B}$.',
          'Thus the crossing: $4{,}294{,}967{,}296 \\div 31{,}507{,}692{,}307.7 = 0.1363\\text{ s}$ (4 dp) - about a seventh of a second.',
          'Check the units: bytes divided by bytes-per-second gives seconds - and the GiB matched the byte census before the divide.',
          'Hence one road witness serves two questions: the bundle\'s price and the freight\'s time.',
        ], answer: '16 x 1969.2308 MB/s = 31.5077 GB/s; 4 GiB crosses in 0.1363 s' },
        { q: 'A loop spends 90% of its memory visits hitting L1 (7 ns) and 10% reaching L2 (100 ns). Compute the average visit (1 dp), and name the two localities that make such friendly mixes the norm.', solution: [
          'Take the mix: nine visits in ten at $7\\text{ ns}$, one in ten at $100\\text{ ns}$.',
          'So the average is $0.9 \\times 7 + 0.1 \\times 100 = 6.3 + 10 = 16.3\\text{ ns}$ (1 dp).',
          'Check the sense: $16.3\\text{ ns}$ sits far nearer L1\'s $7\\text{ ns}$ than L2\'s $100\\text{ ns}$ - the mix is dominated by the fast rung.',
          'Now, the two localities that build such mixes: TEMPORAL - recently used data is used again; SPATIAL - data near what you just used is used next.',
          'Hence caches earn their silicon because programs repeat themselves in time and cluster in space - the ladder\'s secret engine, priced at $16.3\\text{ ns}$.',
        ], answer: '0.9 x 7 + 0.1 x 100 = 16.3 ns average; temporal and spatial locality make the mix friendly' },
      ] },
      { level: 'L4', questions: [
        { q: 'Price three roads in MB/s: USB 2.0\'s 480 Mbit/s, SATA 3.0\'s 6 Gbit/s with its 8b/10b toll, and the PCIe gen4 x16 bundle (per lane 1,969.2308 MB/s). Order them, and state how many times each slower road fits into the next.', solution: [
          'Take USB 2.0 first: $480\\text{ Mbit/s} \\div 8 = 60\\text{ MB/s}$ - the old wall in bytes.',
          'Now, SATA 3.0: $6\\text{ Gbit/s}$ signalling pays the 8b/10b toll, so $6{,}000 \\times 8/10 \\div 8 = 600\\text{ MB/s}$ raw.',
          'So the graphics bundle: $16 \\times 1969.2308 = 31{,}507.7\\text{ MB/s}$ - the road witness, already in GB/s as $31.5077$.',
          'Thus the order: $60 < 600 < 31{,}507.7\\text{ MB/s}$, and the fits are $600 \\div 60 = 10$, then $31{,}507.7 \\div 600 = 52.5128$.',
          'Check the shapes: SATA\'s toll is an encoding tax (8 of every 10 bits survive); USB\'s and PCIe\'s numbers here are already payload.',
          'Hence the wall, the disk road and the freight lane sit a factor ten and a factor 52.5128 apart - three roads, three prices.',
        ], answer: '60 MB/s, 600 MB/s, 31,507.7 MB/s; SATA fits 10x over USB 2.0 and the bundle 52.5128x over SATA', figures: [{ caption: 'The three roads on one log-scale strip: USB 2.0 at 60 MB/s, SATA 3.0 at 600 MB/s (10x), the PCIe gen4 x16 bundle at 31,507.7 MB/s (52.5128x more) - the ordering of question 12, each bar a factor-of-ten step.', svg: cf4RSolBarsSvg() }] },
        { q: 'Reconstruct the USB timeline with dates and ratios from 1996 to USB4, place the USB-C plug\'s month, and do the same for HDMI 1.0 to 2.1. Finish by stating how many times USB4 outruns the 1996 original (4 dp).', solution: [
          'Take the USB census: 1996 opens at $12\\text{ Mbit/s}$; USB 2.0 arrives 27 April 2000 at $480\\text{ Mbit/s}$ - $40\\times$; USB 3.0 (2008) reaches $5\\text{ Gbit/s}$ - $10.4167\\times$ on; USB4 (2019) runs $40\\text{ Gbit/s}$ - another $8\\times$.',
          'So the plug\'s own date: USB-C arrives August 2014 - a connector change, not a speed step, riding between 3.0 and USB4.',
          'Now, the screen road: HDMI 1.0 ships 9 December 2002 at $4.95\\text{ Gbit/s}$; HDMI 2.1 (2017) moves $48\\text{ Gbit/s}$ - $9.69697\\times$.',
          'Thus the family span: $40{,}000\\text{ Mbit/s} \\div 12\\text{ Mbit/s} = 3333.3333$ (4 dp) - USB4 outruns the 1996 original three-thousand-fold.',
          'Check each ratio closes: $480/12 = 40$; $5000/480 = 10.4167$; $40{,}000/5{,}000 = 8$; $48/4.95 = 9.69697$ - every gate honest.',
          'Hence two timelines, one habit: quote the date WITH the ratio, or the census is just speeds loose in the dark.',
        ], answer: '1996: 12 -> 2000 (27 April): 480 (40x) -> 2008: 5 Gbit/s (10.4167x) -> 2019: 40 Gbit/s (8x); USB-C August 2014; HDMI 2002: 4.95 -> 2017: 48 (9.69697x); USB4 = 3333.3333x the original' },
        { q: '(The whole chapter in one machine.) Price this build end to end with pinned numbers: a microATX board (area and fraction of ATX), a 4-core processor at 3 GHz each (the summed headline, the honest warning, and one beat to 4 dp of a ns), RAM one rung below L2 by the census (the rung and its factor), and a graphics road of sixteen PCIe gen4 lanes (GB/s to 4 dp). Finish with the FAST-BIG-CHEAP verdict the build embodies.', solution: [
          'Take the board: microATX is $59{,}536\\text{ mm}^2$, exactly $0.800000$ of ATX\'s $74{,}420\\text{ mm}^2$.',
          'So the workforce: four cores at $3\\text{ GHz}$ each sum to $4 \\times 3 = 12\\text{ GHz}$ ON PAPER - and the paper lies: cores are a count of workers, not a faster tempo.',
          'Now, the honest beat: one core beats at $1 \\div 3\\text{ GHz} = 0.3333\\text{ ns}$ (4 dp) - the tempo each of the four workers actually keeps.',
          'Thus the ladder: RAM sits at $150\\text{ }\\mu\\text{s}$, $1{,}500\\times$ below L2\'s $100\\text{ ns}$ - the census\'s balance rung.',
          'And the road: $16 \\times 1969.2308\\text{ MB/s} = 31.5077\\text{ GB/s}$ of gen4 freight lane.',
          'Hence the verdict: the build buys FAST (clock, cache, lanes) and BIG (four workers, 80% of a full city) - and CHEAP is the price it pays; the triangle never yields all three.',
        ], answer: '59,536 mm2 = 0.800000 of ATX; 4 x 3 GHz sums to 12 GHz only on paper, the true beat 0.3333 ns; RAM 150 us = 1,500x below L2; road 31.5077 GB/s; FAST + BIG bought, CHEAP paid', figures: [{ caption: 'One build, four prices: the microATX board at 0.800000 of ATX, the four-core workforce at an honest 0.3333 ns beat, RAM one 1,500x rung below L2, and the 31.5077 GB/s gen4 road - question 14\'s machine as one pipeline strip.', svg: cf4RSolPipeSvg() }] },
        { q: '(Exam-style, two parts.) (i) A box advertises "4 GB of memory" on a machine whose 32-bit address bus reaches its census maximum. State the exact byte census, the honest GiB figure, and the percentage by which the honest figure exceeds the decimal 4 GB (2 dp). (ii) The same box quotes the graphics road as "32 GB/s". Reconstruct the honest figure from the gen4 per-lane rate and say what the advert rounded.', solution: [
          'Take the census law: 32 address lines reach $2^{32} = 4{,}294{,}967{,}296$ bytes.',
          'So the honest figure is $4{,}294{,}967{,}296 \\div 2^{30} = 4$ exactly - exactly 4 GiB, the binary prefix.',
          'Now, price the advert\'s decimal reading: $4{,}294{,}967{,}296 \\div 4{,}000{,}000{,}000 = 1.073741824$, so the honest reach exceeds decimal 4 GB by $7.37\\%$ (2 dp).',
          'Thus for (ii): the honest road is $16 \\times 1969.2308\\text{ MB/s} = 31{,}507.7\\text{ MB/s} = 31.5077\\text{ GB/s}$ (4 dp).',
          'So the advert rounded $31.5077$ up to $32$ - a 1.6% boast, dressed as a round number.',
          'Hence the examination habit: quote the binary prefix and the per-lane reconstruction, and the round number loses its disguise.',
        ], answer: '(i) 2^32 = 4,294,967,296 B = exactly 4 GiB, +7.37% over decimal 4 GB; (ii) 16 x 1969.2308 MB/s = 31.5077 GB/s - the advert rounded 31.5077 to 32' },
      ] },
    ] },

    // ================================================================
    // 5. THE FORWARD DOOR (chapter 5 'Software Families')
    // ================================================================
    { kind: 'para', text: 'Before the door, the tally. Fifteen questions across four lessons, five solution diagrams, every harvest number quoted at least twice - once in its recap, once under examination conditions. If the bench went well, the city below is yours; if a question fought back, its recap above is the repair bench - go back one section, not back one chapter.' },

    { kind: 'heading', text: 'The Forward Door: Software Families' },
    { kind: 'para', text: 'Close the chapter by opening the next door. For four lessons you have lived INSIDE the box: you know the city plan and its 74,420 mm², the worker\'s 0.2 ns beat, the ladder\'s 1,500x RAM rung, the roads\' 31.5077 GB/s - a machine that now visibly WORKS. But no city runs itself, and chapter 5, \'Software Families\', names WHO MANAGES IT. The census to come: **system software** against **application software**, priced on your own machine; the **manager layer** - the Operating System\'s doorstep, where programs stop being your guesses and start being scheduled, stored, and kept honest; the **utilities**, the manager\'s small tools; and the craft of **installing and licensing honestly**, because software is bought as well as built. (When you want the deeper floors beneath this chapter\'s hardware ground, \'Computer Organization and Architecture\' owns the full theory door; \'Operating Systems\' owns the manager\'s own house.)' },
    { kind: 'para', text: 'Chapter 5\'s syllabus, in one breath: what system software is and how it differs from the applications it manages; what the Operating System visibly DOES on your own machine - schedules the workers, keeps the library honest, arbitrates the roads; what utilities are for; and how software is installed, updated and licensed without self-deceit. The hardware city is built; the management hire is next.' },
    { kind: 'callout', tone: 'insight', title: 'What to carry through the door', text: 'Carry the method, not the menagerie: name the choice, count the price. When chapter 5 shows you two programs claiming the same memory, you will already ask which rung each lives on and who arbitrates the $1{,}500\\times$ gap. When it quotes a disk in GB, you will ask which giga - the $7.37\\%$ habit walks with you. The city of chapter 4 supplies the seats, the tempo, the library and the roads; the manager of chapter 5 decides who sits, when, and for how long. You now know the city well enough to hire its manager.' },
    { kind: 'figure', caption: 'The forward-door sketch (F4): the city\'s hiring notice, pinned honest - no clip-art faces, just the door chapter 5 opens: the manager layer, the Operating System\'s doorstep, the utilities, and the craft of installing and licensing honestly.', svg: cf4RDoorSvg() },

    // ================================================================
    // 6. EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Exam Corner: the Chapter as a Checklist' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner - what this chapter answers, honestly labelled', text: 'Banking and SSC computer-awareness papers, school and board computer-science examinations, and Cambridge 9618-style papers all draw on inside-the-box fundamentals - form factors, clock arithmetic, the memory hierarchy, buses and ports. The asks below are the stable ones, phrased in OUR OWN words in the style such papers use; nothing here claims to quote a real paper. Each row carries the engine-pinned witness to quote in the margin - the fastest honest marks in the hall.' },
    { kind: 'para', text: 'The table below is the revision sheet the chapter has been building towards: seven stable asks, the lesson that answers each, and the witness that earns the mark. Revise by covering the right column and reproducing it from the ask alone - the examination\'s habit is to name the ask and wait to see whether you carry the number.' },
    { kind: 'table', caption: 'The chapter\'s examination checklist: every stable ask, the lesson that answers it, and the pinned witness to quote.', head: ['The examination ask', 'The lesson', 'The witness to quote'], rows: [
      ['State form-factor areas and fractions', '4.1', '74,420 mm2; 0.800000; 0.388336; 0.485421'],
      ['Price one clock beat; order the cycle stages', '4.2', '0.2 ns at 5 GHz; fetch, decode, execute, write back'],
      ['Grade Moore\'s law against a real flagship', '4.2', '2,300 x 2^26 = 154,350,387,200 vs 134 billion = 1.151869x'],
      ['Order the latency rungs; state the factors', '4.3', '14x, 14.2857x, 200x, 1,500x, 66.6667x, 15x'],
      ['Translate the census to the human ladder', '4.3', '3.472222 days; 231.481481 days; 9.5064263 years'],
      ['State address-bus reach; bundle lane bandwidth', '4.4', '4,294,967,296 bytes = 4 GiB; 31.5077 GB/s'],
      ['Reconstruct the port timelines with ratios', '4.4', '40x (27 April 2000); 10.4167x (2008); 8x (2019); 9.69697x (HDMI)'],
    ] },

    // ================================================================
    // 7. THE FORMULA + VOCABULARY HARVEST
    // ================================================================
    { kind: 'heading', text: 'The Formula Harvest' },
    { kind: 'para', text: 'Six cards carry the chapter\'s arithmetic. Each latex line is the engine of one recap; each note quotes the pinned witnesses you have already derived twice. Learn them as MOVES - divide the areas, divide the latencies, multiply the lanes - not as strings; the moves survive any fresh number the examination invents.' },
    { kind: 'formula', name: 'The footprint fraction', latex: '\\text{fraction} = \\text{smaller area} \\div \\text{larger area}', note: 'microATX over ATX = 0.800000; Mini-ITX over ATX = 0.388336; Mini-ITX over microATX = 0.485421. ATX itself: 305 x 244 = 74,420 mm2.' },
    { kind: 'formula', name: 'One clock beat', latex: '\\text{beat (s)} = 1 \\div \\text{frequency (Hz)}', note: '5 GHz gives 0.2 ns; 3 GHz gives 0.3333 ns; the 4004\'s 740 kHz gave about 1.35 us. Never add beats across cores.' },
    { kind: 'formula', name: 'The Moore census', latex: '\\text{transistors}(Y) = \\text{transistors}(Y_0) \\times 2^{(Y - Y_0)/2}', note: '2,300 x 2^26 = 154,350,387,200 predicted for 2023; the M2 Ultra shipped 134 billion; the prediction stands 1.151869x (15.1869%) high.' },
    { kind: 'formula', name: 'The times-slower factor', latex: '\\text{factor} = \\text{slower latency} \\div \\text{faster latency}', note: 'L1 over the registers = 14; L2 over L1 = 14.2857 (200x over the registers); RAM over L2 = 1,500; SSD over RAM = 66.6667; HDD over SSD = 15.' },
    { kind: 'formula', name: 'The human ladder', latex: '\\text{human time} = \\text{machine latency} \\times 2 \\times 10^9', note: 'One machine nanosecond becomes two human seconds: RAM 150 us = 3.472222 days; SSD 10 ms = 231.481481 days (7.6 months); HDD 150 ms = 9.5064263 years.' },
    { kind: 'formula', name: 'The lane budget', latex: '\\text{bundle (B/s)} = \\text{lanes} \\times \\text{per-lane rate (B/s)}', note: '16 x 1969.2308 MB/s = 31.5077 GB/s at gen4; at gen5, 16 x 3938.4615 = 63.0154 GB/s. SATA\'s toll: 6 Gbit/s x 8/10 = 600 MB/s.' },
    { kind: 'heading', text: 'The Vocabulary Harvest' },
    { kind: 'para', text: 'Twelve terms, one per column of the one map - the four seats, the workforce\'s two instruments, the ladder\'s three ideas, and the roads\' three jobs. The glossary takes these whole; the bench takes them as shorthand. If any definition still needs its recap to make sense, that recap is your next five minutes.' },
    { kind: 'terms', items: [
      { term: 'Motherboard', def: 'The printed board that hosts every other component - the city plan of 4.1, from the IBM PC\'s August 1981 planar habit to Nehalem\'s 2008 folding of the memory controller into the processor.' },
      { term: 'Form factor', def: 'The named footprint a board agrees to: ATX at 305 x 244 mm = 74,420 mm2 (1995), microATX at 59,536 mm2 = 0.800000 of ATX, Mini-ITX at 170 x 170 mm = 28,900 mm2 (VIA, 2001).' },
      { term: 'Chipset', def: 'The board\'s town hall - the silicon that stitches the slower districts (ports, storage, legacy) to the processor\'s roads, and the seat where the 24-pin and 8-pin power feeds arrive.' },
      { term: 'The cycle', def: 'The processor\'s four-stage day - fetch, decode, execute, write back - turning once per instruction, forever, at the tempo the clock sets.' },
      { term: 'Clock', def: 'The machine\'s metronome: 1 GHz = 10^9 cycles/s, so a 5 GHz clock beats every 0.2 ns. Cores multiply the workforce, never the tempo - the summed-GHz trap.' },
      { term: 'Moore\'s law', def: 'The 1965 observation (revised 1975) that transistor counts double every two years: 2,300 in 1971 predicts 2,300 x 2^26 = 154,350,387,200 for 2023 - graded honest at 1.151869x high.' },
      { term: 'Memory hierarchy', def: 'The ladder of rungs - registers, L1/L2/L3, RAM, SSD, HDD, cloud - each rung bigger and cheaper but slower than the one above; FAST-BIG-CHEAP, pick two.' },
      { term: 'Latency', def: 'The time one visit costs: the census pins 0.5 ns / 7 ns / 100 ns / 150 us / 10 ms / 150 ms - a 300,000,000x span from the registers to the HDD ocean.' },
      { term: 'Locality', def: 'The two habits that make caches work: temporal (reuse what you just used) and spatial (use what sits beside it). The ladder\'s secret engine.' },
      { term: 'Bus', def: 'One of the three roads inside the box: the address bus asks WHERE (32 lines reach 2^32 = 4,294,967,296 bytes = 4 GiB), the data bus carries WHAT, the control bus times WHEN.' },
      { term: 'Lane (PCIe)', def: 'One expandable freight road: 250 MB/s at gen1, 984.6154 at gen3, 1969.2308 at gen4, 3938.4615 at gen5 - and lane bandwidth adds, so x16 at gen4 bundles 31.5077 GB/s.' },
      { term: 'Port wall', def: 'Where the box meets the world: USB (1996, 12 Mbit/s) through USB4 (2019, 40 Gbit/s) with USB-C from August 2014; HDMI 4.95 to 48 Gbit/s (9.69697x); SATA 3.0 tolling to 600 MB/s.' },
    ] },

    // ================================================================
    // 8. CHECK YOURSELF (the quiz, key pinned [3, 1, 0, 1, 2])
    // ================================================================
    { kind: 'heading', text: 'Check Yourself' },
    { kind: 'para', text: 'Five questions, one from each ridge of the review: the cycle, the clock, the ladder, the road bundle and the port wall. Choose before you read on - each explanation says not only why the keyed answer is right but why every other option fails.' },
    { kind: 'quiz', items: [
      { q: 'The four stages of the processor cycle run, in order -', options: [
        'decode -> fetch -> execute -> write back',
        'fetch -> execute -> decode -> write back',
        'fetch -> decode -> write back -> execute',
        'fetch -> decode -> execute -> write back',
      ], answer: 3, explain: 'The cycle fetches the instruction, decodes what it means, executes it, and writes the result back - 4.2\'s pinned four-stage day, re-quoted in this review\'s one map. Option (a) decodes before anything is fetched: the worker reads a memo that has not arrived. Option (b) executes before decoding, acting on an order not yet read - swinging before the instruction lands. Option (c) writes back before executing, filing a result that does not yet exist - the ledger filled before the work. Only (d) keeps the station\'s four beats in their honest order, which is why every recap of this chapter quotes it in exactly that sequence.' },
      { q: 'One beat of a 5 GHz clock lasts -', options: [
        '2 ns',
        '0.2 ns',
        '5 ns',
        '0.5 ns',
      ], answer: 1, explain: 'The pinned law: $1\\text{ GHz} = 10^9$ cycles per second, so 5 GHz beats five billion times a second and one beat lasts $1 \\div (5 \\times 10^9)\\text{ s} = 0.2\\text{ ns}$ - the review\'s clock witness and the check mark of bench question 2. Option (a), 2 ns, is the beat of a 0.5 GHz clock - the decimal inverted and the point lost. Option (c), 5 ns, reads the frequency\'s own number as a time: a gigahertz is not a nanosecond. Option (d), 0.5 ns, is the beat of 2 GHz - the reciprocal taken of the wrong quantity. Only (b) divides one second by five billion beats, exactly as the law commands.' },
      { q: 'The RAM rung of the latency census is -', options: [
        '150 us, sitting 1,500x below L2',
        '150 ns, sitting 1,500x below L2',
        '15 ms, sitting 66.6667x below L2',
        '100 ns, sitting 200x below L1',
      ], answer: 0, explain: 'The census pins RAM at $150\\text{ }\\mu\\text{s}$ - a microsecond being a thousand nanoseconds - which sits $1{,}500\\times$ below L2\'s 100 ns: option (a), value and factor both honest. Option (b), 150 ns, misplaces the micro prefix: RAM only $1.5\\times$ slower than L2 would collapse the ladder the whole chapter leans on. Option (c), 15 ms, inflates the SSD\'s neighbourhood (10 ms) by a rung and borrows the SSD-over-RAM factor against the wrong baseline. Option (d), 100 ns with a 200x figure, is L2 itself wearing RAM\'s name - the L2-vs-registers ratio smuggled one row down. Only (a) keeps both numbers pinned where the census keeps them.' },
      { q: 'Sixteen PCIe lanes at generation 4 move, in total -', options: [
        '1,969.2308 MB/s',
        '31.5077 GB/s',
        '3,938.4615 MB/s',
        '250 MB/s',
      ], answer: 1, explain: 'One gen4 lane moves $1969.2308\\text{ MB/s}$ of payload, and lane bandwidth ADDS: $16 \\times 1969.2308 = 31{,}507.7\\text{ MB/s} = 31.5077\\text{ GB/s}$ - the review\'s road witness, reconstructed twice (recap illustration and bench question 10). Option (a) is ONE lane at gen4 - the bundle forgotten entirely. Option (c), 3,938.4615 MB/s, is one lane at gen5 - the wrong generation\'s doubling. Option (d), 250 MB/s, is one lane at gen1 - 1996\'s road priced for 2020s freight. Only (b) multiplies the per-lane rate by the lane count, which is what "x16" means.' },
      { q: 'USB 2.0 arrived on 27 April 2000 carrying 480 Mbit/s. How many times the 1996 original\'s 12 Mbit/s is that?', options: [
        '10.4167x',
        '8x',
        '40x',
        '9.69697x',
      ], answer: 2, explain: 'The census divides: $480 \\div 12 = 40$ - option (c), the first gate of the USB timeline. Option (a), 10.4167x, is USB 3.0\'s gate ($5{,}000 \\div 480$) - the next generation\'s ratio worn a generation early. Option (b), 8x, is USB4\'s gate over USB 3.0 ($40{,}000 \\div 5{,}000$) - the last step mistaken for the first. Option (d), 9.69697x, is HDMI\'s leap ($48 \\div 4.95$) - the screen road\'s ratio smuggled onto the port wall. Only (c) divides the 2000 rate by the 1996 rate, which is what "how many times the original" asks.' },
    ] },
    { kind: 'para', text: 'The chapter closes as it opened: a case, now open; a city, now working; a workforce, now timed; a library, now laddered; roads, now priced. Next door, a manager. Walk through holding the map.' },
  ],
}

/* F-fig helpers appended per batch (function declarations hoist) */
function cf4RMooreSvg(): string {
  const W = 760, H = 236
  const s: string[] = []
  const X0 = 300, W_BAR = 320
  const wA = (134e9 / 154350387200) * W_BAR
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The Moore census. A chain on the left: the 4004 of 15 November 1971 with 2,300 transistors, then an arrow labelled 26 doublings at the revised two-year pace. On the right, two bars to one scale: the prediction 2,300 times 2 to the 26 is 154,350,387,200 transistors, the full width; the M2 Ultra actually shipped 134,000,000,000, about four-fifths of the bar. The prediction stands 1.151869 times high, 15.1869 percent above the actual.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(380, 22, 'THE MOORE CENSUS - 26 DOUBLINGS, GRADED HONESTLY', 12, c4R.ink, 'middle', 'bold'))
  s.push(cf4RBox(24, 44, 236, 62, c4R.panelB, c4R.teal))
  s.push(cf4RT(142, 66, '1971: the Intel 4004', 11, c4R.tealInk, 'middle', 'bold'))
  s.push(cf4RT(142, 84, '2,300 transistors, 740 kHz', 10, c4R.ink))
  s.push(cf4RT(142, 98, '15 November 1971', 10, c4R.ink))
  s.push(cf4RArrowH(262, 296, 75, c4R.mid))
  s.push(cf4RT(279, 62, '26', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(279, 94, 'doublings', 9, c4R.warn, 'middle'))
  s.push(`<rect x="${X0}" y="52" width="${W_BAR}" height="26" rx="4" fill="${c4R.conn}"/>`)
  s.push(cf4RT(X0 + W_BAR + 10, 70, '2,300 x 2^26 = 154,350,387,200', 10.5, c4R.conn, 'start'))
  s.push(`<rect x="${X0}" y="104" width="${wA}" height="26" rx="4" fill="${c4R.teal}"/>`)
  s.push(cf4RT(X0 + W_BAR + 10, 122, 'M2 Ultra = 134,000,000,000', 10.5, c4R.tealInk, 'start'))
  s.push(cf4RArrowV(X0 + 60, 150, 80, c4R.accent))
  s.push(cf4RT(X0 + 72, 158, 'the prediction is 1.151869x the actual - 15.1869% above', 10.5, c4R.accent, 'start'))
  s.push(cf4RT(380, 196, 'Moore: 19 April 1965, revised 1975 to every two years - 52 years give 26 doublings', 10, c4R.ink))
  s.push(cf4RT(380, 216, 'a law graded close, not exact - and the grading is the lesson', 10, c4R.warn))
  s.push('</svg>')
  return s.join('')
}

function cf4RTriangleSvg(): string {
  const W = 560, H = 316
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The FAST, BIG, CHEAP triangle with the ladder rungs placed. The apex is the SRAM corner: registers at 0.5 nanoseconds, L1 at 7, L2 at 100 - fast and cheap per access but small, at 6 transistors a bit. The centre holds RAM at 150 microseconds, the balance point, 1,500 times below L2 and 66.6667 times above the SSD. The floor holds SSD at 10 milliseconds, HDD at 150 milliseconds and the cloud - big and cheap but slow. The verdict: pick two, pay the third.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(`<polygon points="280,44 70,258 490,258" fill="${c4R.panelA}" stroke="${c4R.conn}" stroke-width="2"/>`)
  s.push(cf4RT(280, 30, 'FAST', 13, c4R.conn, 'middle', 'bold'))
  s.push(cf4RT(52, 274, 'BIG', 13, c4R.teal, 'middle', 'bold'))
  s.push(cf4RT(508, 274, 'CHEAP', 13, c4R.struct, 'middle', 'bold'))
  s.push(cf4RT(280, 66, 'registers 0.5 ns - L1 7 ns - L2 100 ns', 10, c4R.conn, 'middle', 'bold'))
  s.push(cf4RT(280, 82, 'the SRAM corner: 6 transistors a bit', 9.5, c4R.tealInk, 'middle'))
  s.push(cf4RBox(168, 128, 224, 52, c4R.panelB, c4R.accent))
  s.push(cf4RT(280, 148, 'RAM - the balance point', 11, c4R.accent, 'middle', 'bold'))
  s.push(cf4RT(280, 166, '150 us: 1,500x below L2, 66.6667x above SSD', 9.5, c4R.ink, 'middle'))
  s.push(cf4RT(280, 196, 'L3 sits between L2 and RAM - one more treaty rung', 9.5, c4R.tealInk, 'middle'))
  s.push(cf4RT(280, 226, 'SSD 10 ms - HDD 150 ms - the cloud beyond', 10, c4R.teal, 'middle', 'bold'))
  s.push(cf4RT(280, 244, 'BIG and CHEAP, but 66.6667x and 15x slower', 9.5, c4R.tealInk, 'middle'))
  s.push(cf4RT(280, 292, 'PICK TWO - THE THIRD IS THE PRICE', 11.5, c4R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* 4.4 recap figure - the port census as one timeline strip */
function cf4RPortsSvg(): string {
  const W = 760, H = 258
  const s: string[] = []
  const xs = [96, 270, 444, 618], NW = 136
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The port census as one timeline strip on an even grid. Row one, PCIe per lane: gen1 at 250 MB/s, gen3 at 984.6154, gen4 at 1969.2308, gen5 at 3938.4615 - each generation doubles the lane, and sixteen lanes at gen4 bundle 31.5077 GB/s. Row two, the USB ports: 1996 at 12 Mbit/s, 2000 at 480 (40 times), 2008 at 5 Gbit/s (10.4167 times), 2019 at 40 Gbit/s (8 times), with the USB-C plug arriving August 2014. Row three, HDMI leaping 9.69697 times from 4.95 to 48 Gbit/s, and SATA 3.0 tolling 6 Gbit/s down to 600 MB/s raw. Beneath, the address bus reaches 4,294,967,296 bytes, exactly 4 GiB.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(380, 22, 'THE PORT CENSUS - THREE FAMILIES, ONE WALL', 12, c4R.ink, 'middle', 'bold'))
  const rows: [string, number, string[], string][] = [
    ['PCIe per lane', 44, ['gen1: 250 MB/s', 'gen3: 984.6154', 'gen4: 1969.2308', 'gen5: 3938.4615'], c4R.accent],
    ['USB ports', 120, ['1996: 12 Mbit/s', '2000: 480 Mbit/s', '2008: 5 Gbit/s', '2019: 40 Gbit/s'], c4R.teal],
  ]
  rows.forEach((r) => {
    s.push(cf4RT(16, r[1] + 19, r[0], 9.5, c4R.tealInk, 'start', 'bold'))
    r[2].forEach((t, i) => {
      s.push(cf4RBox(xs[i], r[1], NW, 30, i % 2 === 0 ? c4R.panelA : c4R.panelB, r[3]))
      s.push(cf4RT(xs[i] + NW / 2, r[1] + 19, t, 9.5, c4R.ink))
      if (i < 3) s.push(cf4RArrowH(xs[i] + NW, xs[i] + NW + 34, r[1] + 15, r[3]))
    })
  })
  s.push(cf4RT(380, 90, 'each generation doubles the lane - x16 at gen4 = 31.5077 GB/s', 10, c4R.accent, 'middle', 'bold'))
  s.push(cf4RT(xs[0] + NW + 17, 163, '40x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(xs[1] + NW + 17, 163, '10.4167x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(xs[2] + NW + 17, 163, '8x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(380, 180, 'the USB-C plug arrives August 2014 - one reversible plug for every speed', 10, c4R.ink))
  s.push(cf4RT(16, 219, 'HDMI + SATA', 9.5, c4R.tealInk, 'start', 'bold'))
  s.push(cf4RBox(96, 200, 178, 32, c4R.panelA, c4R.conn))
  s.push(cf4RT(185, 221, 'HDMI 1.0 (2002): 4.95 Gbit/s', 9.5, c4R.ink))
  s.push(cf4RArrowH(274, 322, 216, c4R.conn))
  s.push(cf4RT(298, 210, '9.69697x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RBox(322, 200, 170, 32, c4R.panelB, c4R.conn))
  s.push(cf4RT(407, 215, 'HDMI 2.1 (2017): 48 Gbit/s', 9.5, c4R.ink))
  s.push(cf4RBox(540, 200, 210, 32, c4R.panelA, c4R.struct))
  s.push(cf4RT(645, 214, 'SATA 3.0: 6 Gbit/s, 8b/10b', 9.5, c4R.ink))
  s.push(cf4RT(645, 228, '= 600 MB/s raw', 9.5, c4R.ink))
  s.push(cf4RT(380, 252, 'the three buses ask WHERE, carry WHAT, time WHEN - 2^32 = 4,294,967,296 bytes = 4 GiB of reach', 10, c4R.tealInk, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* F4 - the forward-door hiring notice */
function cf4RDoorSvg(): string {
  const W = 760, H = 216
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The forward-door sketch: a hiring notice pinned to the city of chapter 4. It reads: MANAGER WANTED - THE CITY OF CHAPTER 4 HIRES. Chapter 5 opens: Software Families. System software versus application software, priced on your own machine. The manager layer: the Operating System's doorstep. Utilities - installing and licensing, honestly. A small doorway stands open beneath the lines.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RBox(120, 24, 520, 168, c4R.panelB, c4R.conn, 8))
  s.push(cf4RT(380, 54, 'MANAGER WANTED - THE CITY OF CHAPTER 4 HIRES', 12.5, c4R.conn, 'middle', 'bold'))
  s.push(cf4RT(380, 82, 'Chapter 5 opens: Software Families', 10.5, c4R.ink))
  s.push(cf4RT(380, 102, 'system software vs application software, priced on your own machine', 10.5, c4R.ink))
  s.push(cf4RT(380, 122, 'the manager layer: the Operating System\'s doorstep', 10.5, c4R.ink))
  s.push(cf4RT(380, 142, 'utilities - installing and licensing, honestly', 10.5, c4R.ink))
  s.push(`<rect x="368" y="154" width="24" height="30" fill="${c4R.white}" stroke="${c4R.struct}" stroke-width="2"/>`)
  s.push(`<circle cx="387" cy="170" r="1.6" fill="${c4R.struct}"/>`)
  s.push(cf4RT(380, 204, 'the next door, drawn honest - no clip-art faces, just the role', 10, c4R.tealInk))
  s.push('</svg>')
  return s.join('')
}

/* solution figures for the bench */
function cf4RSolCitySvg(): string {
  const W = 360, H = 232
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The mini city plan: one board rectangle holding the CPU socket at its centre, two 288-pin DIMM slots at the left, the chipset town hall at the lower right, the 24-pin and 8-pin power feeds along the top edge, and the CR2032 coin cell at 3 V near the upper right corner - question 1's board with its pinned fittings in place.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(180, 18, "THE MINI CITY PLAN - 4.1'S BOARD", 11, c4R.ink, 'middle', 'bold'))
  s.push(`<rect x="16" y="30" width="328" height="178" rx="6" fill="${c4R.white}" stroke="${c4R.struct}" stroke-width="2"/>`)
  s.push(`<rect x="150" y="40" width="56" height="16" rx="3" fill="${c4R.accent}"/>`)
  s.push(cf4RT(178, 52, '24-pin', 9, c4R.white, 'middle'))
  s.push(`<rect x="212" y="40" width="30" height="16" rx="3" fill="${c4R.accent}"/>`)
  s.push(cf4RT(227, 52, '8-pin', 9, c4R.white, 'middle'))
  s.push(`<circle cx="310" cy="68" r="13" fill="${c4R.panelB}" stroke="${c4R.accent}" stroke-width="1.5"/>`)
  s.push(cf4RT(310, 90, 'CR2032', 9, c4R.ink))
  s.push(cf4RT(310, 101, '3 V', 9, c4R.ink))
  s.push(`<rect x="44" y="62" width="10" height="120" rx="2" fill="${c4R.struct}"/>`)
  s.push(`<rect x="60" y="62" width="10" height="120" rx="2" fill="${c4R.struct}"/>`)
  s.push(cf4RT(84, 70, 'DIMM slots', 9.5, c4R.ink, 'start'))
  s.push(cf4RT(84, 83, '288 pins', 9, c4R.tealInk, 'start'))
  s.push(`<rect x="150" y="84" width="80" height="52" rx="4" fill="${c4R.teal}"/>`)
  s.push(cf4RT(190, 112, 'CPU socket', 9.5, c4R.white, 'middle', 'bold'))
  s.push(cf4RT(190, 126, 'the worker', 9, c4R.white, 'middle'))
  s.push(`<rect x="250" y="146" width="84" height="44" rx="4" fill="${c4R.panelB}" stroke="${c4R.conn}" stroke-width="1.5"/>`)
  s.push(cf4RT(292, 166, 'chipset', 9.5, c4R.conn, 'middle', 'bold'))
  s.push(cf4RT(292, 180, 'town hall', 9, c4R.tealInk, 'middle'))
  s.push(cf4RT(180, 224, 'the city plan hosts 4.2\'s worker', 9.5, c4R.tealInk))
  s.push('</svg>')
  return s.join('')
}

function cf4RSolLadderSvg(): string {
  const W = 380, H = 190
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="The latency ladder, priced: four rung boxes reading registers 0.5 ns, L1 7 ns, L2 100 ns, RAM 150 us, with the factor witnesses 14x, 14.2857x and 1,500x between the rungs, and two notes beneath - one L2 miss equals 14.2857 L1 hits, one RAM visit equals 1,500 L2 misses. Locality keeps the program on the left rungs.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(190, 20, 'THE LATENCY LADDER, PRICED', 11, c4R.ink, 'middle', 'bold'))
  const rungs: [string, string, number][] = [
    ['registers', '0.5 ns', 16], ['L1', '7 ns', 106], ['L2', '100 ns', 196], ['RAM', '150 us', 286],
  ]
  rungs.forEach((r, i) => {
    s.push(cf4RBox(r[2], 44, 76, 44, i < 2 ? c4R.panelA : c4R.panelB, i < 2 ? c4R.conn : c4R.teal))
    s.push(cf4RT(r[2] + 38, 62, r[0], 10, c4R.ink, 'middle', 'bold'))
    s.push(cf4RT(r[2] + 38, 78, r[1], 10, c4R.tealInk, 'middle'))
  })
  s.push(cf4RT(99, 106, '14x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(189, 106, '14.2857x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(279, 106, '1,500x', 10, c4R.warn, 'middle', 'bold'))
  s.push(cf4RT(16, 134, 'one L2 miss = 14.2857 L1 hits', 10, c4R.ink, 'start'))
  s.push(cf4RT(16, 152, 'one RAM visit = 1,500 L2 misses', 10, c4R.ink, 'start'))
  s.push(cf4RT(16, 176, 'locality keeps the program on the left rungs', 9.5, c4R.tealInk, 'start'))
  s.push('</svg>')
  return s.join('')
}

function cf4RSolAreaSvg(): string {
  const W = 380, H = 170
  const s: string[] = []
  const wI = (28900 / 74420) * 300
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="Two footprints on one scale: the ATX bar at full width naming 74,420 square millimetres, and the Mini-ITX bar at 0.388336 of that width naming 28,900 square millimetres. Beneath, the two closes: 28,900 over 74,420 equals 0.388336, and 74,420 over 28,900 equals 2.5751 - two ITX boards tile one ATX, nearly.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(190, 18, 'TWO FOOTPRINTS, ONE SCALE', 11, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(20, 36, 'ATX: 74,420 mm2', 10, c4R.ink, 'start'))
  s.push(`<rect x="20" y="42" width="300" height="28" rx="4" fill="${c4R.struct}"/>`)
  s.push(cf4RT(20, 86, 'Mini-ITX: 28,900 mm2', 10, c4R.ink, 'start'))
  s.push(`<rect x="20" y="92" width="${wI}" height="28" rx="4" fill="${c4R.conn}"/>`)
  s.push(cf4RT(20, 138, '28,900 / 74,420 = 0.388336 of ATX', 10, c4R.ink, 'start'))
  s.push(cf4RT(20, 158, '74,420 / 28,900 = 2.5751 - two ITX tile one ATX, nearly', 10, c4R.ink, 'start'))
  s.push('</svg>')
  return s.join('')
}

function cf4RSolBarsSvg(): string {
  const W = 380, H = 200
  const s: string[] = []
  const wOf = (mbps: number) => 30 + (Math.log10(mbps) - 1) * 70
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="Three roads in one unit on a log scale: USB 2.0 at 60 MB/s, SATA 3.0 at 600 MB/s, and the PCIe gen4 x16 bundle at 31,507.7 MB/s - each bar one factor-of-ten step longer than the last. The notes close the ratios: 600 is 10 times 60, and 31,507.7 is 52.5128 times 600.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(190, 18, 'THREE ROADS IN ONE UNIT (LOG SCALE)', 11, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(20, 38, 'USB 2.0: 60 MB/s', 10, c4R.ink, 'start'))
  s.push(`<rect x="20" y="44" width="${wOf(60)}" height="22" rx="4" fill="${c4R.teal}"/>`)
  s.push(cf4RT(20, 82, 'SATA 3.0: 600 MB/s', 10, c4R.ink, 'start'))
  s.push(`<rect x="20" y="88" width="${wOf(600)}" height="22" rx="4" fill="${c4R.conn}"/>`)
  s.push(cf4RT(20, 126, 'PCIe x16 gen4: 31,507.7 MB/s', 10, c4R.ink, 'start'))
  s.push(`<rect x="20" y="132" width="${wOf(31507.7)}" height="22" rx="4" fill="${c4R.accent}"/>`)
  s.push(cf4RT(20, 170, 'each bar is a factor-of-ten step on a log scale', 9.5, c4R.tealInk, 'start'))
  s.push(cf4RT(20, 188, '600 = 10 x 60;  31,507.7 = 52.5128 x 600', 10, c4R.ink, 'start'))
  s.push('</svg>')
  return s.join('')
}

function cf4RSolPipeSvg(): string {
  const W = 380, H = 252
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f4R}" role="img" aria-label="One build, four prices: four stacked boxes reading THE BOARD, microATX 59,536 square millimetres, 0.800000 of ATX; THE WORKFORCE, four cores at 3 GHz, beat 0.3333 ns, never say 12 GHz; THE LADDER, RAM 150 us, 1,500 times below L2; THE ROAD, x16 at gen4, 31.5077 GB/s. The verdict line beneath: FAST and BIG bought, CHEAP is the price.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c4R.paper}"/>`)
  s.push(cf4RT(190, 18, 'ONE BUILD, FOUR PRICES', 11, c4R.ink, 'middle', 'bold'))
  s.push(cf4RBox(30, 28, 320, 38, c4R.panelA, c4R.struct))
  s.push(cf4RT(190, 44, 'THE BOARD: microATX = 59,536 mm2', 9.5, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(190, 58, '= 0.800000 of ATX', 9.5, c4R.tealInk, 'middle'))
  s.push(cf4RArrowV(190, 66, 80, c4R.mid))
  s.push(cf4RBox(30, 80, 320, 44, c4R.panelB, c4R.teal))
  s.push(cf4RT(190, 96, 'THE WORKFORCE: 4 cores x 3 GHz', 9.5, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(190, 112, 'beat 0.3333 ns - never say 12 GHz', 9.5, c4R.warn, 'middle'))
  s.push(cf4RArrowV(190, 124, 138, c4R.mid))
  s.push(cf4RBox(30, 138, 320, 38, c4R.panelA, c4R.conn))
  s.push(cf4RT(190, 154, 'THE LADDER: RAM 150 us = 1,500x below L2', 9.5, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(190, 168, 'the census balance rung', 9, c4R.tealInk, 'middle'))
  s.push(cf4RArrowV(190, 176, 190, c4R.mid))
  s.push(cf4RBox(30, 190, 320, 38, c4R.panelB, c4R.accent))
  s.push(cf4RT(190, 206, 'THE ROAD: x16 at gen4 = 31.5077 GB/s', 9.5, c4R.ink, 'middle', 'bold'))
  s.push(cf4RT(190, 220, 'the freight lane priced per second', 9, c4R.tealInk, 'middle'))
  s.push(cf4RT(190, 246, 'FAST and BIG bought; CHEAP is the price', 10, c4R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}
