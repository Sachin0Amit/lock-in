import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf52.ts — CS RUN 9 seat cf52 (the LIBRARY lesson).
 *
 * Lesson 5.2 'Application Software: the Worker Families' of Computer
 * Fundamentals chapter 5 'Software Families'. The worker side of 5.1's
 * manager/worker mirror: application software defined by the one-question
 * test (whose job does it do - the machine's or yours?), the census of
 * seven worker families (productivity with its 4 core kinds, creative and
 * media, browsers and content access, communication, education and
 * reference - this library names itself - developer tools, games and
 * simulation), one family studied close (the spreadsheet: 26 columns x
 * 100 rows = 2,600 cells; one SUM over a 100-cell column = 99 additions;
 * the storage-honesty model 2,600 x 8 = 20,800 bytes = 20.3125 KiB), the
 * classify-12 roster (5 system-side + 7 application-side), three uniforms
 * (desktop installable, web app, mobile app), suite economics (4 singles
 * at 4,000 against 1 suite licence at 2,400; saving 1,600 = 40%;
 * break-even at 3 of 4), choosing honestly (formats as contracts, export
 * before you commit, the lock-in question), and the two dated beats told
 * as our own: VisiCalc 1979 on the Apple II, Photoshop 1990 by the Knoll
 * brothers - 11 years apart.
 *
 * Every number printed here is pinned green by v-cf52.ts (55 engine
 * checks ran GREEN before this prose was written; the pin block closes
 * the ring). All figures are self-contained computed SVGs in the house
 * palette; every geometry constant is derived, never eyeballed.
 * Study-never-reproduce: every roster, figure, Illustration, quiz item
 * and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const c52 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f52 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order (x, y, weight, size,
   fill, anchor) so the engine's clip audit can parse every label */
function cf52T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* ================================================================== */
/* BODY FIGURE 1 — the seven-family street: seven houses standing on   */
/* 5.1's platform road (4 houses in the top row, 3 in the second,      */
/* stems from every house down to the road, computed x positions)      */
/* ================================================================== */
function cf52FamiliesSvg(): string {
  const W = 760
  const H = 430
  const HW = 168          // house width
  const ROOF = 24         // roof height
  const BODY = 106        // house body height
  const row1Y = 48
  const row2Y = 208
  const roadY = 372
  const row1X = [20, 204, 388, 572]      // 4 houses, step 184
  const row2X = [112, 296, 480]          // 3 houses, centred
  const houses = [
    { n: 'i - PRODUCTIVITY', v: 'verb: compose + compute', e: ['word processor,', 'spreadsheet,', 'presentation, email client'] },
    { n: 'ii - CREATIVE + MEDIA', v: 'verb: narrate', e: ['photo and video editors,', 'audio tools,', 'desktop publishing'] },
    { n: 'iii - BROWSERS + ACCESS', v: 'verb: reach', e: ['the web browser,', 'readers and viewers,', 'the chapter 6 door'] },
    { n: 'iv - COMMUNICATION', v: 'verb: converse', e: ['chat and messaging,', 'video calls,', 'the live conversation'] },
    { n: 'v - EDUCATION + REF', v: 'verb: learn', e: ['encyclopedias,', 'tutors and drills,', 'this library, honestly'] },
    { n: 'vi - DEVELOPER TOOLS', v: 'verb: build', e: ['code editors and IDEs,', 'compilers,', 'the chapter 3 craft'] },
    { n: 'vii - GAMES + SIM', v: 'verb: play', e: ['games,', 'simulators,', 'worlds to practise on'] },
  ]
  const strokes = [c52.struct, c52.teal, c52.conn, c52.mid, c52.accent, c52.tealInk, c52.ink]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="A street map of the seven application software families drawn as houses standing on the platform road of system software, each house labelled with its family name, its verb and named examples" xmlns="http://www.w3.org/2000/svg" font-family="${f52}">`)
  s.push(cf52T(W / 2, 22, 12, c52.ink, 'middle', 'THE SEVEN WORKER FAMILIES - A STREET OF HOUSES ON THE PLATFORM ROAD', true))
  const drawHouse = (x: number, y: number, h: (typeof houses)[number], stroke: string): void => {
    s.push(`<polygon points="${x},${y + ROOF} ${x + HW / 2},${y} ${x + HW},${y + ROOF}" fill="${c52.paper}" stroke="${stroke}" stroke-width="2"/>`)
    s.push(`<rect x="${x}" y="${y + ROOF}" width="${HW}" height="${BODY}" fill="${c52.white}" stroke="${stroke}" stroke-width="2"/>`)
    s.push(cf52T(x + HW / 2, y + ROOF + 22, 10.5, c52.ink, 'middle', h.n, true))
    s.push(cf52T(x + HW / 2, y + ROOF + 40, 9.5, c52.tealInk, 'middle', h.v))
    s.push(cf52T(x + HW / 2, y + ROOF + 58, 9, c52.ink, 'middle', h.e[0]))
    s.push(cf52T(x + HW / 2, y + ROOF + 74, 9, c52.ink, 'middle', h.e[1]))
    s.push(cf52T(x + HW / 2, y + ROOF + 90, 9, c52.ink, 'middle', h.e[2]))
  }
  row1X.forEach((x, i) => drawHouse(x, row1Y, houses[i], strokes[i]))
  row2X.forEach((x, i) => drawHouse(x, row2Y, houses[4 + i], strokes[4 + i]))
  /* stems from every house down to the road (row-1 stems thread the
     16px gaps between the second-row houses - computed, not eyeballed) */
  const stem = (x: number, y0: number): void => {
    s.push(`<line x1="${x}" y1="${y0}" x2="${x}" y2="${roadY}" stroke="${c52.mid}" stroke-width="2" stroke-dasharray="5 4"/>`)
  }
  row1X.forEach((x) => stem(x + HW / 2, row1Y + ROOF + BODY))
  row2X.forEach((x) => stem(x + HW / 2, row2Y + ROOF + BODY))
  /* the platform road */
  s.push(`<rect x="16" y="${roadY}" width="728" height="36" fill="${c52.panelA}" stroke="${c52.conn}" stroke-width="2"/>`)
  s.push(cf52T(W / 2, roadY + 22, 10, c52.ink, 'middle', 'THE PLATFORM ROAD (LESSON 5.1): the OS, drivers and firmware - every worker stands on it', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 2 — the spreadsheet close-up: a 10-of-26 column window, */
/* the formula bar with =SUM(D1:D100), the recipe arrow into column D */
/* and four fact chips (census, recipe, storage, re-cook)             */
/* ================================================================== */
function cf52GridSvg(): string {
  const W = 760
  const H = 420
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="A spreadsheet grid close-up showing the formula bar with the SUM recipe aimed at column D, a ten-column by nine-row window of the 26 by 100 grid, and fact chips stating the 2600-cell census, the 99 additions, the 20800-byte storage and the re-cook rule" xmlns="http://www.w3.org/2000/svg" font-family="${f52}">`)
  s.push(cf52T(W / 2, 22, 12, c52.ink, 'middle', 'THE SPREADSHEET CLOSE-UP - THE GRID AND ONE RECIPE', true))
  /* formula bar */
  s.push(`<rect x="20" y="40" width="56" height="28" fill="${c52.paper}" stroke="${c52.ink}" stroke-width="2"/>`)
  s.push(cf52T(48, 59, 11, c52.ink, 'middle', 'D101', true))
  s.push(`<rect x="80" y="40" width="280" height="28" fill="${c52.white}" stroke="${c52.ink}" stroke-width="2"/>`)
  s.push(cf52T(92, 59, 12, c52.tealInk, 'start', '=SUM(D1:D100)', true))
  s.push(cf52T(562, 59, 10, c52.accent, 'middle', 'the recipe: re-cooked when any ingredient changes'))
  /* the recipe arrow into column D (D centre = 60 + 3*38 + 19 = 193) */
  s.push(`<line x1="193" y1="70" x2="193" y2="82" stroke="${c52.teal}" stroke-width="2" stroke-dasharray="4 3"/>`)
  s.push(`<polygon points="189,80 197,80 193,88" fill="${c52.teal}"/>`)
  /* the grid: 10 columns A..J, rows 1..8 then a break then row 100 */
  const colX = 60
  const colW = 38
  const rowY = 112
  const rowH = 26
  const dVals = [12, 7, 9, 14, 6, 11, 8, 13]
  s.push(`<rect x="${colX + 3 * colW}" y="${rowY}" width="${colW}" height="${8 * rowH}" fill="${c52.panelB}"/>`)
  s.push(`<rect x="20" y="90" width="40" height="22" fill="${c52.panelB}" stroke="${c52.mid}" stroke-width="1.5"/>`)
  for (let i = 0; i < 10; i++) {
    s.push(`<rect x="${colX + i * colW}" y="90" width="${colW}" height="22" fill="${c52.panelB}" stroke="${c52.mid}" stroke-width="1.5"/>`)
    s.push(cf52T(colX + i * colW + colW / 2, 105, 10, c52.ink, 'middle', String.fromCharCode(65 + i), true))
  }
  for (let k = 0; k < 8; k++) {
    const y = rowY + k * rowH
    s.push(`<rect x="20" y="${y}" width="40" height="${rowH}" fill="${c52.paper}" stroke="${c52.mid}" stroke-width="1.5"/>`)
    s.push(cf52T(40, y + 17, 9.5, c52.ink, 'middle', String(k + 1)))
    for (let i = 0; i < 10; i++) s.push(`<rect x="${colX + i * colW}" y="${y}" width="${colW}" height="${rowH}" fill="none" stroke="${c52.faint}" stroke-width="1.5"/>`)
    s.push(cf52T(colX + 3 * colW + colW / 2, y + 17, 10, c52.ink, 'middle', String(dVals[k]), true))
  }
  /* the honest break, then row 100 */
  s.push(cf52T(colX + 3 * colW + colW / 2, 340, 12, c52.ink, 'middle', '...'))
  s.push(cf52T(240, 340, 9, c52.tealInk, 'start', 'rows 9 to 99 not shown'))
  const y100 = 352
  s.push(`<rect x="20" y="${y100}" width="40" height="${rowH}" fill="${c52.paper}" stroke="${c52.mid}" stroke-width="1.5"/>`)
  s.push(cf52T(40, y100 + 17, 9.5, c52.ink, 'middle', '100'))
  for (let i = 0; i < 10; i++) s.push(`<rect x="${colX + i * colW}" y="${y100}" width="${colW}" height="${rowH}" fill="none" stroke="${c52.faint}" stroke-width="1.5"/>`)
  s.push(cf52T(colX + 3 * colW + colW / 2, y100 + 17, 10, c52.ink, 'middle', '25', true))
  /* the four fact chips */
  const chips = [
    { t: 'THE GRID CENSUS', l: ['26 columns (A to Z) x 100 rows', '= 2,600 cells'] },
    { t: 'ONE RECIPE, ONE COLUMN', l: ['a SUM over the 100 cells of', 'column D = 100 - 1 = 99 additions'] },
    { t: 'STORAGE HONESTY', l: ['2,600 cells x 8 bytes each', '= 20,800 bytes = 20.3125 KiB'] },
    { t: 'THE RE-COOK', l: ['change one cell and the recipe', 're-runs: 99 additions re-paid'] },
  ]
  chips.forEach((c, i) => {
    const y = 90 + i * 68
    s.push(`<rect x="470" y="${y}" width="274" height="54" fill="${c52.paper}" stroke="${c52.teal}" stroke-width="1.5"/>`)
    s.push(cf52T(482, y + 18, 10.5, c52.tealInk, 'start', c.t, true))
    s.push(cf52T(482, y + 34, 10, c52.ink, 'start', c.l[0]))
    s.push(cf52T(482, y + 48, 10, c52.ink, 'start', c.l[1]))
  })
  s.push(cf52T(W / 2, 405, 9.5, c52.tealInk, 'middle', 'the window shows 10 of 26 columns and 9 of 100 rows - the ellipses are the honest hedge'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 3 — the three uniforms panel: one spreadsheet worker in */
/* desktop, web and mobile dress, with what changes / what stays      */
/* ================================================================== */
function cf52UniformsSvg(): string {
  const W = 760
  const H = 400
  const panels = [
    {
      x: 16, stroke: c52.struct, title: 'DESKTOP - INSTALLED',
      lines: ['lives on: your own disk', 'updated by: you, when you choose', 'needs the net: only to save,', 'print or sync - not to work'],
    },
    {
      x: 264, stroke: c52.teal, title: 'WEB APP - IN THE BROWSER',
      lines: ['lives on: the owner\'s server;', 'the browser shows it to you', 'updated by: its owner, silently', 'needs the net: every second'],
    },
    {
      x: 512, stroke: c52.conn, title: 'MOBILE APP - FROM A STORE',
      lines: ['lives on: the phone, via a store', 'updated by: the store, with your nod', 'needs the net: as the worker', 'demands - chat always, player not'],
    },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Three panels showing the same spreadsheet worker in its three uniforms: a desktop installed program, a web app inside a browser window, and a mobile app on a phone, each panel listing where it lives, who updates it and when it needs the network" xmlns="http://www.w3.org/2000/svg" font-family="${f52}">`)
  s.push(cf52T(W / 2, 24, 12, c52.ink, 'middle', 'THREE UNIFORMS, ONE WORKER - THE SAME SPREADSHEET', true))
  panels.forEach((p) => {
    s.push(`<rect x="${p.x}" y="44" width="232" height="268" fill="${c52.paper}" stroke="${p.stroke}" stroke-width="2"/>`)
    s.push(cf52T(p.x + 116, 68, 11, c52.ink, 'middle', p.title, true))
    if (p.title.startsWith('DESKTOP')) {
      s.push(`<rect x="${p.x + 56}" y="86" width="120" height="62" fill="${c52.white}" stroke="${c52.ink}" stroke-width="2"/>`)
      s.push(`<rect x="${p.x + 101}" y="148" width="30" height="10" fill="${c52.paper}" stroke="${c52.ink}" stroke-width="1.5"/>`)
      s.push(`<line x1="${p.x + 71}" y1="162" x2="${p.x + 161}" y2="162" stroke="${c52.ink}" stroke-width="2.5"/>`)
      s.push(cf52T(p.x + 116, 122, 9.5, c52.tealInk, 'middle', 'a window of your own'))
    } else if (p.title.startsWith('WEB APP')) {
      s.push(`<rect x="${p.x + 48}" y="78" width="64" height="12" fill="${c52.paper}" stroke="${c52.ink}" stroke-width="1.5"/>`)
      s.push(`<rect x="${p.x + 36}" y="86" width="160" height="66" fill="${c52.white}" stroke="${c52.ink}" stroke-width="2"/>`)
      s.push(`<circle cx="${p.x + 52}" cy="100" r="3.5" fill="${c52.teal}"/>`)
      s.push(`<circle cx="${p.x + 66}" cy="100" r="3.5" fill="${c52.teal}"/>`)
      s.push(`<circle cx="${p.x + 80}" cy="100" r="3.5" fill="${c52.teal}"/>`)
      s.push(`<rect x="${p.x + 94}" y="94" width="92" height="12" fill="${c52.panelB}" stroke="${c52.faint}" stroke-width="1.5"/>`)
      s.push(cf52T(p.x + 116, 130, 9.5, c52.tealInk, 'middle', 'a tab in someone\'s browser'))
    } else {
      s.push(`<rect x="${p.x + 74}" y="84" width="84" height="96" rx="8" fill="${c52.white}" stroke="${c52.ink}" stroke-width="2"/>`)
      s.push(`<rect x="${p.x + 80}" y="94" width="72" height="70" fill="${c52.paper}" stroke="${c52.faint}" stroke-width="1.5"/>`)
      s.push(`<circle cx="${p.x + 116}" cy="172" r="4" fill="${c52.white}" stroke="${c52.ink}" stroke-width="1.5"/>`)
      s.push(cf52T(p.x + 116, 126, 9.5, c52.tealInk, 'middle', 'a worker in'))
      s.push(cf52T(p.x + 116, 140, 9.5, c52.tealInk, 'middle', 'your pocket'))
    }
    p.lines.forEach((l, i) => s.push(cf52T(p.x + 16, 196 + i * 20, 9.5, c52.ink, 'start', l)))
  })
  s.push(`<rect x="16" y="328" width="728" height="56" fill="${c52.panelB}" stroke="${c52.conn}" stroke-width="2"/>`)
  s.push(cf52T(W / 2, 350, 10, c52.ink, 'middle', 'what changes: where it lives, who updates it, when it needs the network', true))
  s.push(cf52T(W / 2, 370, 9.5, c52.tealInk, 'middle', 'what stays: the work - your words, your sums, your edits are the same worker\'s job'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE — the classify-12 sorting board (5 + 7)            */
/* ================================================================== */
function cf52SolClassifySvg(): string {
  const W = 760
  const H = 470
  const sysRows = [
    ['operating system', 'keeps the machine itself - 5.1\'s manager'],
    ['device driver', 'teaches the OS one piece of hardware'],
    ['firmware (BIOS/UEFI)', 'the machine\'s first waking words'],
    ['disk format utility', 'prepares the shelf the files live on'],
    ['task monitor', 'watches the machine\'s own housekeeping'],
  ]
  const appRows = [
    ['word processor', 'your letters and reports'],
    ['spreadsheet', 'your sums and budgets'],
    ['photo editor', 'your pictures'],
    ['web browser', 'your reaching of the web'],
    ['chat client', 'your conversations'],
    ['encyclopedia', 'your looking things up'],
    ['game', 'your play'],
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The classify-twelve sorting board: five programs on the machine side under system software and seven programs on your side under application software, sorted by the single question of whose job each program does" xmlns="http://www.w3.org/2000/svg" font-family="${f52}">`)
  s.push(cf52T(W / 2, 22, 12, c52.ink, 'middle', 'THE CLASSIFY-12 SORTING BOARD - 5 SYSTEM-SIDE, 7 APPLICATION-SIDE', true))
  s.push(cf52T(W / 2, 52, 10.5, c52.accent, 'middle', 'the test, asked of all 12: whose job does it do - the machine\'s or yours?', true))
  s.push(`<rect x="24" y="64" width="330" height="30" fill="${c52.panelA}" stroke="${c52.accent}" stroke-width="2"/>`)
  s.push(cf52T(189, 84, 10.5, c52.ink, 'middle', 'THE MACHINE\'S SIDE - 5 (system software)', true))
  s.push(`<rect x="406" y="64" width="330" height="30" fill="${c52.panelB}" stroke="${c52.teal}" stroke-width="2"/>`)
  s.push(cf52T(571, 84, 10.5, c52.ink, 'middle', 'YOUR SIDE - 7 (application software)', true))
  sysRows.forEach((r, i) => {
    const y = 104 + i * 54
    s.push(`<rect x="24" y="${y}" width="330" height="48" fill="${c52.white}" stroke="${c52.mid}" stroke-width="1.5"/>`)
    s.push(cf52T(36, y + 20, 10, c52.ink, 'start', r[0], true))
    s.push(cf52T(36, y + 36, 9, c52.tealInk, 'start', r[1]))
  })
  appRows.forEach((r, i) => {
    const y = 104 + i * 40
    s.push(`<rect x="406" y="${y}" width="330" height="34" fill="${c52.white}" stroke="${c52.mid}" stroke-width="1.5"/>`)
    s.push(cf52T(418, y + 15, 10, c52.ink, 'start', r[0], true))
    s.push(cf52T(418, y + 28, 9, c52.tealInk, 'start', r[1]))
  })
  s.push(`<rect x="24" y="396" width="712" height="44" fill="${c52.paper}" stroke="${c52.ink}" stroke-width="1.5"/>`)
  s.push(cf52T(W / 2, 415, 10, c52.ink, 'middle', '5 + 7 = 12 - one question sorts the whole roster', true))
  s.push(cf52T(W / 2, 432, 9.5, c52.tealInk, 'middle', 'the workers outnumber the managers on any honest machine'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE — the storage-honesty ladder (cells to KiB)         */
/* ================================================================== */
function cf52SolStorageSvg(): string {
  const W = 760
  const H = 300
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The storage honesty ladder for the modelled spreadsheet: 2600 cells times 8 bytes each gives 20800 bytes, divided by 1024 gives 20.3125 KiB, with the per-row and cells-per-KiB check routes shown beneath" xmlns="http://www.w3.org/2000/svg" font-family="${f52}">`)
  s.push(cf52T(W / 2, 24, 12, c52.ink, 'middle', 'THE STORAGE-HONESTY LADDER - FROM CELLS TO KIB', true))
  const chip = (x: number, stroke: string, title: string, lines: string[]): void => {
    s.push(`<rect x="${x}" y="56" width="200" height="96" fill="${c52.paper}" stroke="${stroke}" stroke-width="2"/>`)
    s.push(cf52T(x + 100, 82, 11, c52.ink, 'middle', title, true))
    s.push(cf52T(x + 100, 102, 9.5, c52.ink, 'middle', lines[0]))
    s.push(cf52T(x + 100, 118, 9.5, c52.ink, 'middle', lines[1]))
    s.push(cf52T(x + 100, 138, 9, c52.tealInk, 'middle', lines[2]))
  }
  chip(20, c52.struct, '2,600 CELLS', ['the grid census:', '26 columns x 100 rows', 'one cell = one slot'])
  chip(280, c52.teal, '20,800 BYTES', ['each cell modelled at', '8 bytes of storage', 'the byte census'])
  chip(540, c52.conn, '20.3125 KiB', ['the binary count:', '20,800 / 1,024', 'the honest KiB face'])
  const arrow = (x0: number, x1: number, label: string): void => {
    s.push(`<line x1="${x0}" y1="104" x2="${x1 - 6}" y2="104" stroke="${c52.ink}" stroke-width="2"/>`)
    s.push(`<polygon points="${x1 - 10},99 ${x1 - 10},109 ${x1},104" fill="${c52.ink}"/>`)
    s.push(cf52T((x0 + x1) / 2, 92, 10, c52.accent, 'middle', label, true))
  }
  arrow(228, 276, 'x 8')
  arrow(488, 536, '/ 1,024')
  s.push(`<rect x="20" y="200" width="720" height="84" fill="${c52.panelB}" stroke="${c52.conn}" stroke-width="2"/>`)
  s.push(cf52T(W / 2, 224, 10.5, c52.ink, 'middle', '2,600 x 8 = 20,800 bytes = 20.3125 KiB', true))
  s.push(cf52T(W / 2, 246, 9.5, c52.ink, 'middle', 'per row: 26 x 8 = 208 bytes, x 100 rows = 20,800 - the routes agree'))
  s.push(cf52T(W / 2, 264, 9.5, c52.ink, 'middle', 'cells per KiB: 1,024 / 8 = 128, and 2,600 / 128 = 20.3125 - they agree again'))
  s.push(cf52T(W / 2, 280, 9, c52.tealInk, 'middle', 'the SI face says 20.8 KB - the disagreement is honest, as chapter 3 taught'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE — the suite-vs-singles licence math                 */
/* ================================================================== */
function cf52SolSuiteSvg(): string {
  const W = 760
  const H = 430
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Suite versus singles licence arithmetic: four single-purpose workers at one licence of 1000 each totalling 4000, against one suite licence covering all four workers at 2400, a saving of 1600 which is 40 percent, with the break-even rule at three of four apps" xmlns="http://www.w3.org/2000/svg" font-family="${f52}">`)
  s.push(cf52T(W / 2, 24, 12, c52.ink, 'middle', 'SUITES VS SINGLES - THE LICENCE MATH, PRICED', true))
  s.push(cf52T(150, 56, 11, c52.accent, 'middle', 'FOUR SINGLES - 4 LICENCES', true))
  for (let i = 0; i < 4; i++) {
    const y = 66 + i * 62
    s.push(`<rect x="30" y="${y}" width="240" height="52" fill="${c52.white}" stroke="${c52.accent}" stroke-width="1.5"/>`)
    s.push(cf52T(42, y + 21, 10, c52.ink, 'start', 'one single-purpose worker', true))
    s.push(cf52T(42, y + 38, 9.5, c52.tealInk, 'start', 'one licence: 1,000'))
  }
  s.push(`<rect x="30" y="316" width="240" height="40" fill="${c52.panelA}" stroke="${c52.accent}" stroke-width="2"/>`)
  s.push(cf52T(150, 341, 10.5, c52.ink, 'middle', '4 x 1,000 = 4,000', true))
  s.push(cf52T(600, 56, 11, c52.teal, 'middle', 'ONE SUITE - 1 LICENCE', true))
  s.push(`<rect x="470" y="66" width="260" height="188" fill="${c52.paper}" stroke="${c52.teal}" stroke-width="2"/>`)
  s.push(cf52T(600, 92, 10.5, c52.ink, 'middle', 'four workers, one licence', true))
  s.push(cf52T(600, 114, 9.5, c52.ink, 'middle', 'word processor + spreadsheet'))
  s.push(cf52T(600, 132, 9.5, c52.ink, 'middle', 'presentation + email client'))
  s.push(cf52T(600, 150, 9.5, c52.ink, 'middle', 'bought together, installed together'))
  s.push(cf52T(600, 178, 10.5, c52.conn, 'middle', 'price: 2,400', true))
  s.push(cf52T(600, 200, 9, c52.tealInk, 'middle', 'updates arrive as one family'))
  s.push(cf52T(600, 222, 9, c52.tealInk, 'middle', 'one version number to track'))
  s.push(`<rect x="470" y="266" width="260" height="40" fill="${c52.panelB}" stroke="${c52.teal}" stroke-width="2"/>`)
  s.push(cf52T(600, 291, 10.5, c52.ink, 'middle', '1 licence: 2,400', true))
  s.push(`<rect x="470" y="316" width="260" height="40" fill="${c52.paper}" stroke="${c52.conn}" stroke-width="2"/>`)
  s.push(cf52T(600, 341, 10.5, c52.ink, 'middle', 'saving: 4,000 - 2,400 = 1,600', true))
  s.push(cf52T(380, 165, 14, c52.warn, 'middle', 'VS', true))
  s.push(`<rect x="30" y="368" width="700" height="46" fill="${c52.panelB}" stroke="${c52.ink}" stroke-width="1.5"/>`)
  s.push(cf52T(380, 388, 10, c52.ink, 'middle', 'the suite saves 1,600 = 40% of the singles bill', true))
  s.push(cf52T(380, 406, 9.5, c52.tealInk, 'middle', 'but it earns its keep only at 3 of 4 apps in use (3 x 1,000 above 2,400) - below that, spare apps are dead weight'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE — the family-verb match scaffold                    */
/* ================================================================== */
function cf52SolVerbSvg(): string {
  const W = 760
  const H = 420
  const rows = [
    ['i - productivity', 'compose + compute', 'word processor, spreadsheet'],
    ['ii - creative and media', 'narrate', 'the photo editor'],
    ['iii - browsers + access', 'reach', 'the web browser'],
    ['iv - communication', 'converse', 'the chat or video-call app'],
    ['v - education + reference', 'learn', 'the encyclopedia - this library too'],
    ['vi - developer tools', 'build', 'the code editor and compiler'],
    ['vii - games + simulation', 'play', 'the game, the simulator'],
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="The family and verb match scaffold: a table of seven rows pairing each worker family with its verb and one named example, from productivity with compose and compute through to games and simulation with play" xmlns="http://www.w3.org/2000/svg" font-family="${f52}">`)
  s.push(cf52T(W / 2, 22, 12, c52.ink, 'middle', 'THE FAMILY-VERB MATCH - SEVEN FAMILIES, THEIR VERBS, ONE EXAMPLE EACH', true))
  s.push(cf52T(145, 52, 10, c52.ink, 'middle', 'THE FAMILY', true))
  s.push(cf52T(365, 52, 10, c52.ink, 'middle', 'THE VERB', true))
  s.push(cf52T(600, 52, 10, c52.ink, 'middle', 'ONE NAMED EXAMPLE', true))
  rows.forEach((r, i) => {
    const y = 64 + i * 48
    s.push(`<rect x="20" y="${y}" width="250" height="44" fill="${c52.white}" stroke="${c52.struct}" stroke-width="1.5"/>`)
    s.push(`<rect x="290" y="${y}" width="150" height="44" fill="${c52.paper}" stroke="${c52.teal}" stroke-width="1.5"/>`)
    s.push(`<rect x="460" y="${y}" width="280" height="44" fill="${c52.white}" stroke="${c52.conn}" stroke-width="1.5"/>`)
    s.push(cf52T(145, y + 27, 10, c52.ink, 'middle', r[0], true))
    s.push(cf52T(365, y + 27, 9.5, c52.tealInk, 'middle', r[1]))
    s.push(cf52T(600, y + 27, 9, c52.ink, 'middle', r[2]))
  })
  s.push(cf52T(W / 2, 412, 9.5, c52.tealInk, 'middle', 'productivity wears two verbs because its four core kinds split the work - the census holds'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE — the three-question uniform grid                   */
/* ================================================================== */
function cf52SolUniformSvg(): string {
  const W = 760
  const H = 360
  const colX = [220, 400, 580]
  const heads = ['DESKTOP', 'WEB APP', 'MOBILE APP']
  const rowHeads = ['where does it live?', 'who updates it?', 'when does it need the net?']
  const cells = [
    [['on your machine\'s disk,', 'installed by you'], ['on the owner\'s server;', 'the browser shows it'], ['on the phone, installed', 'through a store']],
    [['you, when you choose', 'to update it'], ['the owner, silently -', 'no asking, no nod'], ['the store, with your', 'permission']],
    [['to save, print or sync', '- not to work'], ['every working second', '- no net, no worker'], ['as the worker demands:', 'chat always, player not']],
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="A three by three grid comparing the desktop, web app and mobile app uniforms across the three questions: where the worker lives, who updates it, and when it needs the network" xmlns="http://www.w3.org/2000/svg" font-family="${f52}">`)
  s.push(cf52T(W / 2, 22, 12, c52.ink, 'middle', 'THE THREE-QUESTION GRID - ONE WORKER, THREE UNIFORMS', true))
  s.push(`<rect x="20" y="48" width="190" height="34" fill="${c52.paper}" stroke="${c52.ink}" stroke-width="1.5"/>`)
  s.push(cf52T(115, 69, 10, c52.ink, 'middle', 'the question', true))
  colX.forEach((x, i) => {
    s.push(`<rect x="${x}" y="48" width="170" height="34" fill="${c52.panelB}" stroke="${c52.teal}" stroke-width="2"/>`)
    s.push(cf52T(x + 85, 69, 10.5, c52.ink, 'middle', heads[i], true))
  })
  rowHeads.forEach((rh, r) => {
    const y = 90 + r * 80
    s.push(`<rect x="20" y="${y}" width="190" height="74" fill="${c52.paper}" stroke="${c52.ink}" stroke-width="1.5"/>`)
    s.push(cf52T(115, y + 42, 9.5, c52.ink, 'middle', rh, true))
    colX.forEach((x, c) => {
      s.push(`<rect x="${x}" y="${y}" width="170" height="74" fill="${c52.white}" stroke="${c52.mid}" stroke-width="1.5"/>`)
      s.push(cf52T(x + 85, y + 32, 9, c52.ink, 'middle', cells[r][c][0]))
      s.push(cf52T(x + 85, y + 52, 9, c52.ink, 'middle', cells[r][c][1]))
    })
  })
  s.push(cf52T(W / 2, 344, 9.5, c52.tealInk, 'middle', 'the worker is the same; the plumbing differs - lesson 5.3 owns the installing and updating'))
  s.push('</svg>')
  return s.join('')
}

export const lesson52: Lesson = {
  id: 'cf-application-software-the-worker-families',
  number: '5.2',
  title: 'Application Software: the Worker Families',
  concepts: [
    'the worker test: whose job does it do',
    'the census of seven worker families',
    'the spreadsheet close-up: 2,600 cells and the recipe',
    'three uniforms: desktop, web, mobile',
    'suites against single-purpose workers',
    'choosing honestly: formats, export, lock-in',
    'VisiCalc 1979 and Photoshop 1990',
  ],
  objectives: [
    'By the end of this lesson you can define application software as the worker that performs the user\'s own task while standing on the platform the system software keeps, and run the one-question sorting test - whose job does it do - on any program you are shown.',
    'By the end of this lesson you can recite the census of the seven worker families with each family\'s verb and a named example, including the four core kinds of the productivity family.',
    'By the end of this lesson you can walk one family close, the spreadsheet: 26 columns by 100 rows is 2,600 cells, one SUM over a 100-cell column is 99 additions, and the storage-honesty model prices the grid at 2,600 x 8 = 20,800 bytes = 20.3125 KiB.',
    'By the end of this lesson you can tell the three uniforms apart - desktop installable, web app, mobile app - by the three questions: where it lives, who updates it, and when it needs the network.',
    'By the end of this lesson you can price a suite against singles honestly (four singles at four licences against one suite licence) and say when a suite\'s spare apps are dead weight and when they are the point.',
    'By the end of this lesson you can choose with the lock-in question - can your work leave? - export before you commit, and carry the two dated beats honestly: VisiCalc in 1979 and Photoshop in 1990, eleven years apart.',
  ],
  prerequisites: ['cf-system-software-the-manager-layer'],
  sources: ['cs-cf-web-ground-ch05'],
  blocks: [
    // ================================================================
    // 1. THE WORKER DEFINED
    // ================================================================
    { kind: 'heading', text: 'The Worker Defined: Whose Job Does It Do?' },
    { kind: 'para', text: 'Lesson 5.1 built the platform and named its keepers: the operating system as the manager, the drivers as its translators, the firmware as the machine\'s first waking speech - system software, the whole layer whose job is the MACHINE\'s own housekeeping. This lesson walks to the other side of the mirror, where the workers wait. When you type a letter, edit a photograph, balance a budget or talk to a friend across the world, the program doing that work is not keeping the machine; it is doing YOUR job, on the machine, through the machine. The two lessons divide the whole software shelf between them, and the dividing line is not technical polish, price or size. It is a question you can ask of any program in one breath.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - application software', text: '**Application software** is said to be software that performs the user\'s own task, standing on the platform the system software keeps. Symbolically: system software serves the machine (its subject is the hardware and its own housekeeping), application software serves the user (its subject is your letter, your budget, your picture, your conversation) - and every application runs ON the platform, never beside it.' },
    { kind: 'para', text: 'Read the definition twice and notice what it does NOT say. It does not say application software is small or cheap - a film editor\'s toolbox costs more than many operating systems. It does not say it is easy - the hardest programs ever written, compilers and game engines among them, are workers. And it does not say the two layers dislike each other; the opposite is true, and it is the definition\'s second half: the worker STANDS ON the platform. A word processor never speaks to a disk itself; it asks the operating system, which asks the driver, which asks the disk. Lesson 5.1 built that staircase; every worker in this lesson climbs it a thousand times a second.' },
    { kind: 'para', text: 'The definition hands you a test you can carry anywhere, and it is worth stating as a habit rather than a table: to sort any program, ask WHOSE JOB DOES IT DO - the machine\'s, or yours? If the answer is the machine\'s, it is system software; if the answer is yours, it is application software. For example, run the test on four named programs, honestly, including the two that trip people:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) an operating system - it schedules the processor, guards the memory and minds the disks: the machine\'s job, so system software;',
      '(ii) a word processor - it exists so that YOUR letter gets written: your job, so application software;',
      '(iii) a device driver - it teaches the operating system one piece of hardware: the machine\'s job again, so system software;',
      '(iv) a web browser - it feels technical, but it exists so that YOU can reach the web\'s content: your job, so application software.',
    ] },
    { kind: 'para', text: 'The fourth witness is the honest one, because the browser is where most classifications go wrong. A browser ships with machinery inside it - networking code, rendering engines, a sandbox for security - and on many machines it arrives already installed, side by side with the operating system itself. None of that changes the classification. The test asks about the JOB, not the plumbing: a browser exists to reach content for you, which is your errand, and that makes it a worker - the census of the next section gives it a family of its own.' },
    { kind: 'example', title: 'Illustration 1. The sorting test on the four named witnesses: which side of the mirror does each stand?', steps: [
      'Take the test as a habit: for any program, ask whose job it does - the machine\'s or yours.',
      'So, the operating system: it schedules, guards and minds the machine - the machine\'s job, hence system software.',
      'Take the word processor: it exists for your letter - your job, hence application software.',
      'Now, the device driver: it teaches the OS one piece of hardware - the machine\'s job, hence system software.',
      'Check the browser last, the honest trap: it exists so you can reach the web - your job, hence application software.',
      'Hence the four witnesses split 2 and 2: the OS and the driver on the machine\'s side, the word processor and the browser on yours.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note - bundling is packaging, not classification', text: 'A program does not change families by moving house. When a browser or an editor ships already installed on a new machine, bundled beside the operating system, it is STILL application software: the bundle is a packaging decision made by the seller, while the classification follows the job. Exam papers have asked exactly this - "a program supplied together with the operating system must be system software" is FALSE, and the one-question test is how you say why.' },
    { kind: 'para', text: 'One more habit before the census. The test works best when you can name what the job IS, in one verb, and that is how this chapter will keep every family: by its verb. A word processor COMPOSES; a spreadsheet COMPUTES; a photo editor CRAFTS pictures. Keep the verb in mind and the family takes care of itself - a program whose verb is "converse" is communication software whatever its icon looks like, and a program whose verb is "reach" belongs with the browsers. The census that follows is nothing more than the honest list of those verbs, seven families wide.' },
    { kind: 'example', title: 'Illustration 2. The classify-12 starter: twelve named programs, one question, two sides of a board.', steps: [
      'Take the roster of twelve: operating system, device driver, firmware, disk format utility, task monitor, word processor, spreadsheet, photo editor, web browser, chat client, encyclopedia, game.',
      'Ask the question of each, one at a time, and let the board fill: the machine\'s side takes the OS, the driver, the firmware, the disk format utility and the task monitor.',
      'So, your side takes the word processor, the spreadsheet, the photo editor, the browser, the chat client, the encyclopedia and the game.',
      'Count each side: 5 system-side and 7 application-side.',
      'Check the total: 5 + 7 = 12, and the fractions are 5/12 against 7/12 - the workers are the majority, as they should be.',
      'Hence the classify-12 starter sorts 5 system-side and 7 application-side, and the sorting board in the exercises redraws it.',
    ] },
    { kind: 'terms', items: [
      { term: 'application software', def: 'software that performs the user\'s own task, standing on the platform the system software keeps.' },
      { term: 'system software', def: '5.1\'s layer - the OS, drivers, firmware and utilities whose job is the machine\'s own housekeeping.' },
      { term: 'the worker test', def: 'ask of any program: whose job does it do - the machine\'s or yours? The answer sorts it in one breath.' },
      { term: 'bundling', def: 'selling a worker pre-installed beside the OS - a packaging decision that changes nothing about classification.' },
    ] },
    // ================================================================
    // 2. THE SEVEN WORKER FAMILIES
    // ================================================================
    { kind: 'heading', text: 'The Seven Families: a Census of Workers' },
    { kind: 'para', text: 'One worker named is a curiosity; a census is a map, and this lesson\'s census counts exactly seven worker families. The families are not equal in fame - productivity software fills the shop shelves and the exam papers, while the education family works quietly in classrooms - but each is a real clan of programs with one verb at its centre. Walk the street of houses below and read each family by its verb; the houses all stand on the same platform road, because there is nowhere else for a worker to stand.' },
    { kind: 'figure', caption: 'The seven worker families as a street of houses on lesson 5.1\'s platform road: productivity (verb: compose and compute), creative and media (narrate), browsers and content access (reach), communication (converse), education and reference (learn), developer tools (build), and games and simulation (play). Every house\'s stem drops to the same road - no worker stands beside the platform.', svg: cf52FamiliesSvg() },
    { kind: 'para', text: 'The census in table form, one line per family, verb first - this is the table to carry cold, because "give examples of software families" is asked in some form on nearly every computer-awareness paper:' },
    { kind: 'table', caption: 'The census of the seven worker families - each named by its verb, with the family\'s work and named examples. The productivity family carries four core kinds; every other family is named by its own verb.', head: ['The family (i..vii)', 'Its verb', 'The work it does for you', 'Named examples'], rows: [
      ['(i) productivity', 'compose + compute', 'documents, numbers, slides, correspondence', 'word processor, spreadsheet, presentation, email client'],
      ['(ii) creative and media', 'narrate', 'pictures, sound, film, designed pages', 'photo editor, video editor, audio tools, desktop publishing'],
      ['(iii) browsers and content access', 'reach', 'the web\'s content, fetched and shown', 'the web browser; readers and viewers'],
      ['(iv) communication', 'converse', 'live talk across distances', 'chat and messaging apps, video-call apps'],
      ['(v) education and reference', 'learn', 'looked-up knowledge, drilled skill', 'encyclopedias, tutors - and this library, honestly'],
      ['(vi) developer tools', 'build', 'the programs that write programs', 'code editors, IDEs, compilers'],
      ['(vii) games and simulation', 'play', 'worlds to practise on', 'games, flight and physics simulators'],
    ] },
    { kind: 'para', text: 'Notice the census\'s arithmetic before you memorise its rows: seven families, eight verbs. The productivity family wears TWO - compose for the word processor, compute for the spreadsheet - because its four core kinds split the work between writing and reckoning. The word processor composes; the spreadsheet computes; the presentation narrates to a room; the email client carries the correspondence. Four core kinds, one family, two verbs: that is the whole of family (i) in one sentence, and it is the family most exam papers mean when they say "productivity software".' },
    { kind: 'para', text: 'Two families deserve an honest extra word, because each is a door rather than a destination. The browser family, (iii), is the door to this book\'s next chapter: the browser REACHES the web\'s content, but the web itself - the wires, the packets, the addressing - is Computer Networks\' ground, and this lesson names that door without opening it. The developer-tools family, (vi), is the door back to chapter 3\'s bit-craft and forward to the Programming shelf of this library: the code editor and the compiler are themselves application software, workers whose user happens to be a programmer - the census holds, and the craft belongs next door.' },
    { kind: 'para', text: 'And one family must be named with a mirror in hand. The education and reference family - encyclopedias, tutors, drills - includes, honestly, THIS library. A lesson that classifies software is itself software\'s subject matter being carried by an education worker; the census can see its own author in family (v). We say so once, plainly, and move on: no family gets a sermon, and none needs one.' },
    { kind: 'example', title: 'Illustration 3. A family-sort run for eight named programs: which house does each worker live in?', steps: [
      'Take the eight: a word processor, a spreadsheet, a video editor, a web browser, a chat app, an encyclopedia, a code editor with its compiler, and a game.',
      'So, sort by verb: the word processor composes and the spreadsheet computes - both are productivity, family (i).',
      'Take the video editor: it narrates with film - family (ii), creative and media.',
      'Now, the browser reaches content - family (iii); the chat app converses - family (iv); the encyclopedia helps you learn - family (v).',
      'Check the last two: the code editor and compiler build programs - family (vi), developer tools; the game plays - family (vii).',
      'Hence the eight sort into seven families, with productivity housing two of them - the census at work on a real roster.',
    ] },
    { kind: 'terms', items: [
      { term: 'productivity software', def: 'family (i): the word processor, spreadsheet, presentation and email client - four core kinds, verbs compose and compute.' },
      { term: 'creative and media software', def: 'family (ii): photo, video and audio editors and desktop publishing - the narrating family.' },
      { term: 'content access software', def: 'family (iii): browsers and readers - the reaching family, and chapter 6\'s doorstep.' },
      { term: 'communication software', def: 'family (iv): chat, messaging and video calls - the conversing family.' },
      { term: 'education and reference software', def: 'family (v): encyclopedias and tutors - the learning family; this library is one.' },
      { term: 'developer tools', def: 'family (vi): editors, IDEs and compilers - the building family, the Programming shelf\'s door.' },
      { term: 'games and simulation software', def: 'family (vii): games and simulators - the playing family.' },
    ] },

    // ================================================================
    // 3. ONE FAMILY STUDIED CLOSE: THE SPREADSHEET
    // ================================================================
    { kind: 'heading', text: 'One Family Studied Close: the Spreadsheet' },
    { kind: 'para', text: 'A census that never opens a door is a phone book, so this lesson opens one house and walks through it: the spreadsheet, the productivity family\'s computing half. The choice is deliberate. The spreadsheet is the worker whose whole value is a MECHANISM - the re-computation of your arithmetic when the numbers underneath change - and once you have seen that mechanism you can never quite mistake a worker for a document again. Everything below uses one honest, modest grid: a worksheet of 26 columns, lettered A through Z, and 100 rows, numbered 1 through 100.' },
    { kind: 'equation', latex: '26 \\times 100 = 2{,}600 \\tag{1}', note: 'The grid census: 26 columns (A to Z) times 100 rows is 2,600 cells. Every cell is one addressable box - D100 is column 4, row 100 - and the whole worksheet is 2,600 of them.' },
    { kind: 'example', title: 'Illustration 4. The 2,600-cell census run: counting the grid three ways so the count is never a guess.', steps: [
      'Take the worksheet: columns A through Z, rows 1 through 100.',
      'So, count the columns first: A to Z is 26 letters, hence 26 columns.',
      'Count the rows: 100 of them, numbered 1 to 100.',
      'Multiply for the cells: $26 \\times 100 = 2{,}600$ cells in the sheet.',
      'Check by routes: one column holds 100 cells and one row holds 26; 26 columns each of 100 cells, or 100 rows each of 26 cells - both reach 2,600.',
      'Hence the census is 26 x 100 = 2,600 cells, and no cell is more than an address like D100 - column 4, row 100.',
    ] },
    { kind: 'figure', caption: 'The spreadsheet close-up: the formula bar holding =SUM(D1:D100), the recipe arrow aimed at column D, and a window showing 10 of the 26 columns and 9 of the 100 rows (the ellipses are the honest hedge). One SUM over the 100 cells of column D costs 100 - 1 = 99 additions; the storage chip prices the modelled grid at 2,600 x 8 = 20,800 bytes = 20.3125 KiB.', svg: cf52GridSvg() },
    { kind: 'para', text: 'Read the figure\'s left half as a machine and its right half as the ledger of everything the machine just promised. The grid is addressed like a town: column letters before row numbers, so D100 is the box at column 4, row 100, and the last box in the whole sheet is Z100. The window shows only 10 of 26 columns and 9 of 100 rows - drawn honestly with ellipses, because a figure that pretended to show all 2,600 cells would be lying by squinting. What the figure does show whole is the idea in the top-left corner: the formula bar.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - formula', text: 'A **formula** is said to be a recipe stored in a cell: a list of ingredients (other cells\' addresses) and an operation to cook them with, which the machine re-cooks whenever any ingredient changes. Symbolically, a cell may hold either a VALUE (a number you typed) or a FORMULA (a rule over other cells); the machine shows the formula\'s latest ANSWER in the cell and keeps the recipe itself behind the bar.' },
    { kind: 'para', text: 'The recipe idea is the spreadsheet\'s whole heart, and it is worth saying slowly. Type twelve numbers into column D and the machine holds twelve values - dead, like figures written in ink. Put =SUM(D1:D100) into D101 and the machine holds a PROMISE: add up the hundred cells above me, show me the total, and re-do it the instant anything changes. Change one ingredient and the answer moves by itself; no eraser, no re-addition by hand, no stale total left lying in the sheet. The formula is not a calculation you perform; it is a calculation you ORDER and the machine keeps performing.' },
    { kind: 'example', title: 'Illustration 5. The SUM-over-column run: what one recipe actually costs the machine.', steps: [
      'Take the recipe: one SUM over the 100 cells of column D, placed in D101.',
      'So, ask what the machine does: it runs a total that starts with the first cell\'s value.',
      'Count the additions: after the first cell, each of the other 99 cells is added on - one addition each.',
      'Hence the arithmetic: $100 - 1 = 99$ additions for one SUM over a 100-cell column.',
      'Check the shape: a 26-cell row SUM would cost $26 - 1 = 25$ additions by the same law - the count is always one fewer than the cells.',
      'Hence one SUM over the 100-cell column performs 99 additions, and that bill is re-paid at every re-cook.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'Theorem - the re-cook law', text: 'If a formula covers $n$ cells, then one evaluation performs $n - 1$ additions, and every change to any ingredient re-runs the whole recipe. Symbolically: $k$ separate changes re-cook the column $k$ times, for a total of $k(n-1)$ additions. At $n = 100$: one change costs 99 additions, and five changes made one at a time cost $5 \\times 99 = 495$ - the machine pays the full bill every time, which is precisely why it feels effortless to you.' },
    { kind: 'derivation', title: 'The recipe\'s price: 99 additions and the re-cook bill', statement: 'Price the work behind =SUM(D1:D100): first one evaluation, then the honest bill for a user who keeps changing ingredients.', steps: [
      { label: 'Count the ingredients', formula: 'n = 100 \\text{ cells (D1 to D100)}', explanation: 'The recipe\'s range names 100 cells - the whole of column D above the answer cell.' },
      { label: 'Count one evaluation', formula: '100 - 1 = 99 \\text{ additions}', explanation: 'The running total takes the first cell for free, then adds each of the remaining 99 - the additions are one fewer than the cells.' },
      { label: 'Bill the re-cooks', formula: '5 \\times 99 = 495 \\text{ additions}', explanation: 'Five separate edits made one at a time re-run the recipe five times over, at 99 additions each.' },
      { label: 'Check the row-shaped cousin', formula: '26 - 1 = 25 \\text{ additions}', explanation: 'A SUM across one row of 26 cells costs 25 by the same law - the count always trails the cells by one.' },
    ], result: 'One SUM over a 100-cell column costs $99$ additions; five one-at-a-time edits re-cook it for $5 \\times 99 = 495$ - the machine pays in full at every change, which is exactly the service you are buying.' },
    { kind: 'equation', latex: '\\text{additions of one SUM} = n - 1 \\tag{2}', note: 'The re-cook law\'s core: a formula over n cells performs n - 1 additions per evaluation - 99 for a 100-cell column, 25 for a 26-cell row.' },
    { kind: 'para', text: 'Now the honesty that keeps this lesson\'s numbers trustworthy: how much ROOM does such a grid take? Model it plainly - one cell, one slot of 8 bytes, the size of a plain number in the machine\'s counting of chapter 3 - and the arithmetic pins itself. The 2,600-cell grid at 8 bytes per cell takes 2,600 x 8 = 20,800 bytes, and in the binary units the machine\'s world actually uses, 20,800 / 1,024 = 20.3125 KiB. Two routes confirm it, and both are worth walking once so the number is yours rather than borrowed.' },
    { kind: 'derivation', title: 'From cells to KiB: the storage-honesty run', statement: 'Convert the modelled grid into bytes and then into honest binary units, checking every route against the others.', steps: [
      { label: 'Cells to bytes', formula: '2{,}600 \\times 8 = 20{,}800 \\text{ bytes}', explanation: 'Each of the 2,600 cells is modelled at one 8-byte slot - a plain number\'s worth of room.' },
      { label: 'Bytes to KiB', formula: '\\frac{20{,}800}{1{,}024} = 20.3125 \\text{ KiB}', explanation: 'A KiB is 1,024 bytes, so the grid divides out to exactly 20.3125 KiB - a clean decimal, pinned by the engine.' },
      { label: 'Check by rows', formula: '26 \\times 8 = 208;\\ 208 \\times 100 = 20{,}800', explanation: 'One row of 26 cells takes 208 bytes; a hundred such rows rebuild the same 20,800 - the routes agree.' },
      { label: 'Check by cells per KiB', formula: '\\frac{1{,}024}{8} = 128;\\ \\frac{2{,}600}{128} = 20.3125', explanation: 'A KiB holds 128 modelled cells, and 2,600 of those slots is 20.3125 KiB - the second route lands on the same mark.' },
    ], result: 'The modelled grid takes $2{,}600 \\times 8 = 20{,}800$ bytes, which is $20.3125$ KiB - confirmed by the per-row route ($208 \\times 100$) and the cells-per-KiB route ($2{,}600 / 128$).' },
    { kind: 'equation', latex: '2{,}600 \\times 8 = 20{,}800\\ \\text{bytes} = 20.3125\\ \\text{KiB} \\tag{3}', note: 'The storage-honesty model in one line: one cell at one 8-byte slot, 2,600 cells, 20,800 bytes, and 20,800 / 1,024 = 20.3125 KiB - the SI face of the same cargo is 20.8 KB, and the disagreement is honest.' },
    { kind: 'example', title: 'Illustration 6. The storage run stated cold: 2,600 cells at 8 bytes each, priced and double-checked.', steps: [
      'Take the model: one cell, one 8-byte slot - a modelling choice, stated as one.',
      'So, the byte census: $2{,}600 \\times 8 = 20{,}800$ bytes.',
      'Convert to binary units: $20{,}800 / 1{,}024 = 20.3125$ KiB - exact, not rounded.',
      'Check by rows: $26 \\times 8 = 208$ bytes a row, and $208 \\times 100 = 20{,}800$ - agreed.',
      'Check by cells per KiB: $1{,}024 / 8 = 128$ cells, and $2{,}600 / 128 = 20.3125$ - agreed again.',
      'Hence the modelled grid is 20,800 bytes = 20.3125 KiB, with both check routes landing on the same mark.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution - the model is not the file', text: 'A real spreadsheet FILE stores far more than 8 bytes a cell: the recipe text, the formatting, the fonts, the undo history all ride along, and a saved workbook of this grid would be many times the model\'s 20.3125 KiB. The pin here is the ARITHMETIC - cells times bytes, bytes over 1,024 - which you must be able to do cold; the honest hedge about real files is part of the answer, not a footnote to it. (The SI face of the same cargo is 20.8 KB against 20.3125 KiB - the two counts disagree, exactly as chapter 3 taught.)' },
    { kind: 'para', text: 'Before leaving the house, glance at its cousin, because the recipe idea is not the spreadsheet\'s private property. A word processor runs a recipe too: compose, then format, then print - and when you change one paragraph, the machine re-formats the page, re-numbers what follows and re-paginates the whole document without being asked. The ingredients differ (paragraphs and styles where the spreadsheet keeps cells and totals) and the operation differs (laying out where the spreadsheet adds), but the SHAPE is the same: stored rules, re-cooked on change. That shape - not any one program - is what "application software" buys you across all seven families.' },
    { kind: 'example', title: 'Illustration 7. The word processor\'s cousin run: compose, format, print as a recipe.', steps: [
      'Take the word processor\'s three stages: compose the text, format the page, print the result.',
      'So, read them as a recipe: the ingredients are your paragraphs and the style rules; the operation is laying them out on pages.',
      'Now, change one paragraph near the start: the machine re-flows every line below it, re-numbers the pages and moves the table that sat on page 4.',
      'Check the shape: no re-typing, no manual re-numbering - the rules re-cook the document, as the SUM re-cooked the column.',
      'Hence compose, format and print are a recipe too: stored rules, re-cooked when the ingredients change - the same heart as the spreadsheet, beating to a different drum.',
    ] },
    { kind: 'terms', items: [
      { term: 'cell', def: 'one addressable box of the grid - D100 is column 4, row 100; the modelled sheet holds 2,600 of them.' },
      { term: 'formula', def: 'a recipe stored in a cell: ingredients (cell addresses) plus an operation, re-cooked whenever an ingredient changes.' },
      { term: 'range', def: 'a span of cells named by its ends - D1:D100 is the 100 cells of column D.' },
      { term: 're-calculation', def: 'the re-cook: the machine\'s re-running of a formula when an ingredient changes; 5 edits re-run a 100-cell SUM for 495 additions.' },
      { term: 'grid', def: 'the worksheet\'s array of columns and rows - this lesson\'s model is 26 x 100 = 2,600 cells.' },
    ] },

    // ================================================================
    // 4. THREE UNIFORMS, ONE WORKER
    // ================================================================
    { kind: 'heading', text: 'Three Uniforms, One Worker' },
    { kind: 'para', text: 'Meet the same spreadsheet worker three times in one day and you will meet it in three uniforms. On the laptop it is a desktop program you installed; on the family computer it is a web app living inside a browser tab; on your phone it is a mobile app fetched from a store. The census of uniforms is exactly three - desktop installable, web app, mobile app - and the surprise worth internalising is that the WORKER barely changes between them. Your sums, your formulas, your re-cooking recipe: identical. What changes is the plumbing around the worker, and the plumbing can be read off with three questions.' },
    { kind: 'figure', caption: 'The three uniforms panel: one spreadsheet worker dressed as a desktop program (a window of your own), a web app (a tab in someone\'s browser) and a mobile app (a worker in your pocket). What changes is where it lives, who updates it and when it needs the network; what stays is the work itself.', svg: cf52UniformsSvg() },
    { kind: 'table', caption: 'The three uniforms told by the three questions. Read the columns, not the rows: each uniform\'s character is one column of answers.', head: ['The question', 'Desktop installable', 'Web app', 'Mobile app'], rows: [
      ['Where does it live?', 'on your own disk, installed by you', 'on the owner\'s server; the browser shows it', 'on the phone, installed through a store'],
      ['Who updates it?', 'you, when you choose', 'its owner, silently - no asking', 'the store, with your permission'],
      ['When does it need the network?', 'to save, print or sync - not to work', 'every working second - no net, no worker', 'as the worker demands: a chat always, a player need not'],
      ['The honest one-line character', 'a private tool that runs offline', 'a service you visit, always current', 'a pocket tool curated by a store'],
    ] },
    { kind: 'para', text: 'Sit with the third question for a moment, because it is the one users feel daily. The desktop uniform needs the network only to save, print or sync: pull the cable out and the typing, the computing, the editing all continue - the worker was installed on YOUR disk and its engine runs on YOUR processor. The web uniform is the opposite pole: the worker lives on the owner\'s server, and the browser is merely the window you watch it through, so every working second is a network second. The mobile uniform sits between, worker by worker: a chat app is useless offline by its nature, while a game or a player may carry its whole world in your pocket.' },
    { kind: 'para', text: 'The updating question is just as tellable. A desktop program updates when YOU say so - which means you can stay on a familiar version for years, and also means you can fall years behind. A web app updates without asking: you close the tab at night, open it in the morning, and the worker has changed its clothes silently. A mobile app updates through its store, with your nod - a middle path the other two uniforms do not offer. HOW a worker is installed, updated and removed is lesson 5.3\'s ground, not this one\'s; this lesson only hands you the three questions so the doorstep is labelled.' },
    { kind: 'example', title: 'Illustration 8. The three-uniform tradeoff run: one worker, three plumbing contracts.', steps: [
      'Take one worker - the spreadsheet - and dress it three ways: desktop installable, web app, mobile app.',
      'So, ask where it lives: your disk; the owner\'s server; the phone via a store.',
      'Ask who updates it: you, when you choose; the owner, silently; the store, with your nod.',
      'Ask when it needs the network: to save, print or sync; every working second; as the worker demands.',
      'Check what never changed: the formulas, the re-cook, the 2,600-cell grid - the work is the same worker\'s job in all three.',
      'Hence the tradeoff is plumbing, not work: three uniforms, three contracts, one worker.',
    ] },
    { kind: 'para', text: 'Choosing a uniform, then, is choosing a plumbing contract rather than a program. The traveller who needs today\'s version everywhere picks the web uniform and pays in network dependence; the writer who works on trains picks the desktop uniform and pays in update discipline; the commuter who works in stolen minutes picks the mobile uniform and pays in the store\'s curacy. None of the three choices is wrong, and the exam boards\' phrasing - "state two differences between a web application and a desktop application" - is answered by exactly the table above: where it lives, who updates it, when it needs the network.' },

    // ================================================================
    // 5. SUITES AGAINST SINGLE-PURPOSE WORKERS
    // ================================================================
    { kind: 'heading', text: 'Suites Against Single-Purpose Workers' },
    { kind: 'para', text: 'The shop shelves sell workers two ways, and the economics deserves honesty rather than slogans. A software SUITE bundles several workers under one licence - classically a word processor, a spreadsheet, a presentation program and an email client, the productivity family\'s four core kinds, sold as a household. A single-purpose worker is bought alone, one licence for one program. Neither way of selling is a scam and neither is a charity; each is a bet about how you work, and the arithmetic of the bet can be written down.' },
    { kind: 'para', text: 'Write it down with a pinned model, the way this book prices everything. Suppose each single-purpose licence costs 1,000, and the four-app suite is licensed at 2,400. Four singles then cost 4 x 1,000 = 4,000 against the suite\'s 2,400: the suite saves 4,000 - 2,400 = 1,600, which is 1,600/4,000 = 40% of the singles bill. On licence COUNTS alone the story is the same in one line: four singles need 4 licences, the suite needs 1 - a 4-to-1 count. The suite looks like a bargain, and for the household that truly uses all four workers, it is exactly that.' },
    { kind: 'example', title: 'Illustration 9. The suite-licence economy run: 4,000 against 2,400, and the break-even honest.', steps: [
      'Take the model: a single licence at 1,000 each; the four-app suite at 2,400 for all of them.',
      'So, the singles bill: $4 \\times 1{,}000 = 4{,}000$, at 4 separate licences.',
      'Take the suite bill: $2{,}400$, at 1 licence - a saving of $4{,}000 - 2{,}400 = 1{,}600$.',
      'Convert the saving: $1{,}600 / 4{,}000 = 0.4 = 40\\%$ of the singles bill.',
      'Now, the honest test - value against use: if you use $k$ of the 4 apps, you receive $k \\times 1{,}000$ of value; at $k = 2$ that is 2,000, below the suite\'s 2,400.',
      'Check the break-even: at $k = 3$ the value is 3,000, above 2,400 - the suite earns its keep from three apps onward.',
      'Hence the suite saves 1,600 (40%) but only pays off at 3 of 4 apps in use; below that the spare apps are dead weight, not a bargain.',
    ] },
    { kind: 'para', text: 'That last step is where the slogans go wrong. A reader who writes and computes but never presents and never mails is using 2 of the 4 apps: half the suite sits unused, and the honest dead weight is 2/4 = 50% of the purchase. Use 3 of the 4 and only a quarter, 1/4 = 25%, sits idle - the suite has become the point rather than the padding. The dead weight question is not an argument against suites; it is the QUESTION, and it has a different answer for every reader: the student presenting projects buys the suite gladly, the novelist needs one good word processor and nothing else.' },
    { kind: 'table', caption: 'Suites against single-purpose workers, told honestly: what each way of selling assumes about you.', head: ['The question', 'The suite (4 apps, 1 licence)', 'The single-purpose workers (4 licences)'], rows: [
      ['The licence count', '1 licence covers all 4 apps', '4 licences, one per app'],
      ['The model price', '2,400 for the household', '4 x 1,000 = 4,000 for the same four'],
      ['The saving if all are used', '1,600 = 40% of the singles bill', 'none - you paid per worker'],
      ['The dead weight if 2 of 4 are used', '2 apps idle = 50% of the purchase', 'none - you bought only what you use'],
      ['The honest buyer', 'the household that presents AND computes AND mails', 'the specialist with one real verb'],
    ] },
    { kind: 'para', text: 'One more line of honesty completes the economics. Suites are not only a price: they are an agreement to live together. The four workers share a look, a licence desk, an update rhythm and - the double edge - a file-format family, which is exactly the subject of the next section. Buy the suite and your documents, sheets and slides will talk to each other fluently; buy four strangers and they may not. Whether that fluency is worth the dead weight is the choosing question this lesson now faces squarely.' },

    // ================================================================
    // 6. CHOOSING HONESTLY: FORMATS, EXPORT AND LOCK-IN
    // ================================================================
    { kind: 'heading', text: 'Choosing Honestly: Formats, Export and the Lock-In Question' },
    { kind: 'para', text: 'Every worker you choose will hold your work in a FILE FORMAT, and chapter 3\'s ground applies directly: a format is a contract about how bytes are arranged - text encodings, image encodings, document structures - and only programs that read the contract can open the file. Most workers speak an open, published contract anyone may implement (the text files of chapter 3, the common image and document formats) alongside their own native one. The choosing instinct this lesson teaches is simply to LOOK at the contract before you sign years of work onto it.' },
    { kind: 'para', text: 'The practical discipline is export-first. Before you commit your budget, your thesis or your photographs to a worker, take a real file - not a toy - and walk it out: export it to a format another program can open, open it there, and see what survives. If the formulas, the formatting and the pictures survive the walk, your work can leave; if what comes out the other side is a mangled shadow, your work is a hostage. Five honest minutes with the export menu prices years of dependence, and the exercise list drills the walk as a procedure.' },
    { kind: 'algorithm', title: 'How to try a worker honestly before committing your work', lines: [
      { code: 'name the work you actually do (your verb, from the census)', note: 'the census of section 2: compose, compute, narrate, reach, converse, learn, build or play' },
      { code: 'shortlist the workers for that family', note: 'one from the shop shelf, one from the browser, one from the store - the three uniforms' },
      { code: 'check what format each saves in natively', note: 'the contract: is it open and published, or the seller\'s own design?' },
      { code: 'check the export paths out of that format', note: 'the leaving doors: which open formats can it write?' },
      { code: 'export a REAL file and open it in another program', note: 'the test that counts: not the menu\'s promise but the walked file' },
      { code: 'only then commit - and re-run the walk yearly', note: 'formats age, workers change owners; the leaving door must stay open' },
    ], note: 'The procedure prices dependence in five minutes; skipping it prices it in years. Lesson 5.3 owns the installing and updating mechanics - this lesson owns the choosing instinct.' },
    { kind: 'example', title: 'Illustration 10. The format-export decision walk: one budget, two workers, one question.', steps: [
      'Take the errand: a household budget that must outlive any single program - and two candidate workers.',
      'So, check worker A: it saves natively in its own suite format and exports to a common open spreadsheet format, formulas intact - the leaving door is open.',
      'Check worker B: it saves natively in its own format and exports only to a print-oriented format, with formulas flattened to plain values - the door is painted on.',
      'Now, walk a real file through A\'s door: export, open elsewhere, and the sums still re-cook - the work can leave.',
      'Check B\'s walk: the totals arrive as dead numbers; the recipes are gone - the work is a hostage.',
      'Hence the decision walks itself: choose A, whatever the shelf price of B - the lock-in question, "can your work leave?", is answered by the export menu before it is ever answered by the invoice.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution - "free" is a price, not a discount', text: 'Many workers today cost no money up front, and the honest question is what they are paid in instead. Some are paid in attention - advertising carried beside your work; some in data - your usage measured and sold on; some in the hope you will pay later for the room your work needs. None of this is hidden malice, and much of it is a fair trade; the caution is only that "free" names the PRICE TAG\'s absence, not the price\'s. A worker you pay in attention is still a purchase, and the export-first walk applies to it with exactly the same force.' },
    { kind: 'para', text: 'Which brings the chapter\'s choosing question to its one-line form: CAN YOUR WORK LEAVE? If the answer is yes - open formats, honest export, walked and re-checked - then any worker may be chosen for its verbs alone, and even a wrong choice is a cheap one. If the answer is no, you are not choosing a worker; you are choosing a landlord. That single question, asked before commitment, is worth more than any feature list, and it is the instinct this lesson most wants you to carry out of the room.' },
    { kind: 'terms', items: [
      { term: 'file format', def: 'a contract about how bytes are arranged; only programs that read the contract can open the file (chapter 3\'s ground).' },
      { term: 'native format', def: 'the format a worker saves in by its own design - fluent inside the family, sometimes unreadable outside it.' },
      { term: 'open format', def: 'a published contract any program may implement - the leaving door every worker should have.' },
      { term: 'export', def: 'writing your work out to another format; the walk that proves the work can leave.' },
      { term: 'lock-in', def: 'dependence on one worker because your work cannot cleanly leave it; priced by the export menu, not the invoice.' },
      { term: 'software suite', def: 'several workers bundled under one licence - classically the productivity four - sharing a look and a format family.' },
      { term: 'single-purpose worker', def: 'one program, one licence, one verb - the specialist\'s purchase.' },
      { term: 'web app', def: 'a worker that lives on the owner\'s server and works inside your browser - updated silently, network-bound every second.' },
    ] },

    // ================================================================
    // 7. TWO DATED BEATS: VISICALC 1979, PHOTOSHOP 1990
    // ================================================================
    { kind: 'heading', text: 'Two Dated Beats: VisiCalc 1979, Photoshop 1990' },
    { kind: 'para', text: 'The worker families have birthdays, and two of them are worth carrying because each explains a family\'s power in a single dated story. Both are told here as our own retellings of the public record - the dates and names are pinned, the colour is ours, and nothing is name-dropped beyond what the census needs. The first birthday belongs to the spreadsheet, and it is the earlier one: 1979.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note - VisiCalc, 1979: the first spreadsheet', text: 'VisiCalc, released in 1979 for the Apple II, is honoured as the first spreadsheet program - the worker that turned the computer from a calculator for hobbyists into a tool for accountants, and the machine of choice for anyone with a budget. The idea it carried was exactly this lesson\'s recipe: change a number and the machine re-cooks the arithmetic. Our retelling is our own; the date, the program and the machine are the standard public record, and no more is claimed.' },
    { kind: 'para', text: 'What VisiCalc taught the industry was bigger than the program: it was the KILLER APP idea - a worker so desired that people buy the MACHINE to get it. Buyers did not purchase an Apple II and then discover VisiCalc; they purchased VisiCalc and accepted the Apple II that came with it. The phrase "killer app" was coined later to name this pattern, and the pattern became the software business\'s recurring weather: a worker arrives, and hardware walks out of the shop under its arm. Every app store today is, at bottom, that 1979 arrangement rebuilt at planetary scale.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note - Photoshop, 1990: the creative family\'s household name', text: 'Photoshop, first shipped in 1990 and built by the Knoll brothers, became the creative and media family\'s household name - the photo editor whose name turned into a verb in everyday speech. Our retelling again is our own; the year and the makers are pinned public record. What the census needs from it is one line: by 1990 the worker families had matured enough that a single creative tool could become a cultural landmark.' },
    { kind: 'para', text: 'Set the two dates side by side and the arithmetic is worth one sentence: 1990 - 1979 = 11 years after VisiCalc, Photoshop arrived. Eleven years separate the program that sold the first mass business machine from the program that put image manipulation in every vocabulary - a single decade-plus in which the worker families went from one killer app to a whole culture of them. Neither story needs embellishment; both are already about how a plain idea, standing on a platform, ends up everywhere.' },

    // ================================================================
    // 8. THE DOORSTEPS
    // ================================================================
    { kind: 'heading', text: 'The Doorsteps: Where the Neighbours Own the Ground' },
    { kind: 'para', text: 'Three doors open off this lesson, and honesty means labelling them rather than walking through. The browser\'s plumbing - the wires, the packets, the addressing that content access rides on - belongs to Computer Networks, a book planned for this library\'s own shelf: this lesson named the browser\'s family and left the network untouched. The developer-tools craft - how compilers turn text into instructions, how editors are built - belongs to the Programming shelf: the census called those tools workers and stopped at the door. And the mechanics of installing, updating and removing workers - the shop and store machinery the three uniforms lean on - is lesson 5.3\'s ground, next door in this very chapter.' },
    { kind: 'para', text: 'What this lesson keeps for itself is therefore plain: the census of seven families with their verbs, the spreadsheet\'s recipe and its honest arithmetic, the three uniforms told by three questions, the suite economics with its break-even, and the choosing instinct - can your work leave? None of the doorstep books carries that ground, and no later lesson in this chapter re-teaches it. Carry the census and the question, and every doorstep in computer fundamentals opens onto familiar ground.' },

    // ================================================================
    // 9. THE EXAM CORNER AND THE FORMULA SHEET
    // ================================================================
    { kind: 'heading', text: 'The Exam Corner and the Formula Sheet' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner - how this lesson is asked', text: 'The census and the classifications of this lesson are examination staples, asked here in our own exam-style wording - never quoted from a real paper. Banking and SSC computer-awareness papers ask the short truths: which of the listed programs is application software; give two examples each of system and application software; what a software suite is against a single package; and examples from named families - the drill below rehearses exactly those. School boards ask the classification with reasons, the spreadsheet\'s purpose, and two differences between a web application and a desktop application - the three-question table answers the last cold. Cambridge 9618 and A-level-style papers push the same ground one step: classify an unfamiliar program with justification (run the worker test aloud), and state what happens when spreadsheet data changes (the re-cook law - 99 additions re-paid per SUM per change). Drill the census and the test; every long question here is a short one wearing a coat.' },
    { kind: 'formula', name: 'The grid census', latex: '26 \\times 100 = 2{,}600', note: 'the modelled worksheet: 26 columns (A to Z) x 100 rows; one cell is one address like D100.' },
    { kind: 'formula', name: 'The additions of one SUM', latex: '\\text{additions} = n - 1', note: 'a formula over n cells performs n - 1 additions per evaluation: 99 for a 100-cell column, 25 for a 26-cell row.' },
    { kind: 'formula', name: 'The re-cook bill', latex: 'k(n - 1)', note: 'k separate ingredient changes re-run the recipe k times: 5 edits on a 100-cell SUM cost 5 x 99 = 495 additions.' },
    { kind: 'formula', name: 'The storage-honesty model', latex: '2{,}600 \\times 8 = 20{,}800\\ \\text{bytes} = 20.3125\\ \\text{KiB}', note: 'one cell modelled at one 8-byte slot; the real file is larger - the hedge is part of the pin.' },
    { kind: 'para', text: 'The chapter\'s rung now stands on both legs: 5.1 built the platform and named its keepers; this lesson has censused the seven worker families, opened the spreadsheet\'s house to find the recipe, told the three uniforms apart, priced the suite honestly and armed you with the one choosing question that outlives every version number. The checkpoint quiz and the graded drill are yours; the engine that pins every number above stands behind them.' },

    { kind: 'quiz', title: 'Checkpoint quiz', items: [
      {
        q: 'Which of the following is application software?',
        options: [
          'an operating system',
          'a device driver',
          'a word processor',
          'the firmware',
        ],
        answer: 2,
        explain: 'Option C is the worker: a word processor exists to perform the user\'s own task - your letter, your report - standing on the platform, so it is application software by the definition. Option A fails because the operating system keeps the machine itself - scheduling, guarding memory, minding disks - which is the machine\'s job, hence system software. Option B fails because a device driver teaches the operating system one piece of hardware - again the machine\'s job, again system software. Option D fails because firmware is the machine\'s first waking speech on 5.1\'s platform - the deepest system software of all.',
      },
      {
        q: 'Which of these is one of the four core kinds of the productivity family?',
        options: [
          'a photo editor',
          'a video editor',
          'a web browser',
          'a spreadsheet',
        ],
        answer: 3,
        explain: 'Option D is one of the four core kinds: the productivity family is the word processor, the spreadsheet, the presentation and the email client - the spreadsheet is its computing half. Option A fails because the photo editor belongs to family (ii), creative and media - its verb is narrate, not compose or compute. Option B fails for the same reason: video editing is creative and media work. Option C fails because the browser is a family of its own, (iii) content access - its verb is reach, and chapter 6 owns its plumbing.',
      },
      {
        q: 'Application software does its work standing on -',
        options: [
          'the system software platform',
          'its own private processor',
          'the firmware chip alone',
          'another application',
        ],
        answer: 0,
        explain: 'Option A is the definition\'s second half: every worker stands on the platform the system software keeps - it asks the OS, which asks the drivers, which ask the hardware. Option B fails because no application owns a processor; the OS schedules the shared processor among all workers, as 5.1 taught. Option C fails because firmware is only the waking layer - it speaks the machine\'s first words and hands over to the OS; workers never stand on it directly. Option D fails because applications may COOPERATE but never carry each other - remove the platform and every worker falls together.',
      },
      {
        q: 'A web browser belongs to which worker family?',
        options: [
          'the productivity family',
          'the content access family',
          'the games and simulation family',
          'the developer tools family',
        ],
        answer: 1,
        explain: 'Option B is the census line: the browser\'s verb is reach - it fetches and shows the web\'s content for you, which is family (iii), browsers and content access. Option A fails because productivity is the composing-and-computing family (word processor, spreadsheet, presentation, email client) - reaching is not its verb. Option C fails because games and simulation play in built worlds; a browser fetches real content rather than simulating one. Option D fails because developer tools build programs - the browser is a worker you use, not a workbench you build with; that family houses editors, IDEs and compilers.',
      },
      {
        q: 'A spreadsheet grid of 26 columns and 100 rows holds how many cells?',
        options: [
          '126 cells',
          '260 cells',
          '2,060 cells',
          '2,600 cells',
        ],
        answer: 3,
        explain: 'Option D is the census: 26 x 100 = 2,600 cells, each one addressable like D100 (column 4, row 100). Option A fails because 126 is 26 + 100 - the ADDITION trap, which counts the grid\'s edges rather than its boxes. Option B fails because 260 is 26 x 10 - a grid of only ten rows, not one hundred. Option C fails because 2,060 adds the edges to a wrong product - no honest route reaches it; the only correct arithmetic is the product of columns and rows.',
      },
    ] },

    { kind: 'exercises', title: 'Graded exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'State the one-question test that sorts any program into system or application software, and run it on an operating system and a word processor.',
            answer: 'Hence the test is whose job does it do, and it sends the operating system to the machine\'s side and the word processor to yours',
            solution: [
              'Split the question: it asks for the test itself, then for its verdict on two named programs.',
              'The test: ask whose job the program does - the machine\'s or yours; the machine\'s answer means system software, yours means application software.',
              'So, the operating system schedules, guards and minds the machine - the machine\'s job, hence system software.',
              'Take the word processor: it exists so your letter gets written - your job, hence application software.',
              'Hence the test is whose job does it do, and it sends the operating system to the machine\'s side and the word processor to yours.',
            ],
          },
          {
            q: 'Recite the census of the seven worker families in order, giving each family its verb.',
            answer: 'Hence the census runs productivity, creative and media, browsers and content access, communication, education and reference, developer tools, and games and simulation - seven families, eight verbs',
            solution: [
              'Take the census in its order, family by family, verb first.',
              'So: (i) productivity - compose and compute; (ii) creative and media - narrate; (iii) browsers and content access - reach.',
              'Now: (iv) communication - converse; (v) education and reference - learn; (vi) developer tools - build; (vii) games and simulation - play.',
              'Check the arithmetic: seven families, eight verbs, because productivity wears two for its four core kinds.',
              'Hence the census runs productivity, creative and media, browsers and content access, communication, education and reference, developer tools, and games and simulation - seven families, eight verbs.',
            ],
          },
          {
            q: 'Name the four core kinds of the productivity family, and say which two verbs the family wears and why.',
            answer: 'Hence the four core kinds are the word processor, the spreadsheet, the presentation and the email client, and the family wears the two verbs compose and compute',
            solution: [
              'Take the productivity family and read its roster: the word processor, the spreadsheet, the presentation and the email client.',
              'So, the four core kinds are exactly those - documents, numbers, slides and correspondence.',
              'Now, the verbs: the word processor composes while the spreadsheet computes, so the family wears compose and compute between its kinds.',
              'Check the split: writing and reckoning are different jobs, which is why one family carries two verbs.',
              'Hence the four core kinds are the word processor, the spreadsheet, the presentation and the email client, and the family wears the two verbs compose and compute.',
            ],
          },
          {
            q: 'One worker can meet you in three uniforms. Name the uniforms and the three questions that tell them apart.',
            answer: 'Hence the uniforms are the desktop installable, the web app and the mobile app, told apart by where it lives, who updates it and when it needs the network',
            solution: [
              'Take the census of uniforms: the desktop installable, the web app and the mobile app.',
              'So, the first question: where does it live - your disk, the owner\'s server, or the phone via a store.',
              'Now, the second: who updates it - you when you choose, the owner silently, or the store with your nod.',
              'Check the third: when does it need the network - to save, print or sync; every working second; or as the worker demands.',
              'Hence the uniforms are the desktop installable, the web app and the mobile app, told apart by where it lives, who updates it and when it needs the network.',
            ],
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Sort the classify-12 roster - operating system, device driver, firmware, disk format utility, task monitor, word processor, spreadsheet, photo editor, web browser, chat client, encyclopedia, game - and count each side.',
            answer: 'Hence the board splits 5 system-side and 7 application-side - 12 programs sorted by one question',
            solution: [
              'Take the roster of twelve and ask the test of each program in turn: whose job does it do?',
              'So, the machine\'s side collects the operating system, the device driver, the firmware, the disk format utility and the task monitor - five keepers of the machine.',
              'Take your side: the word processor, the spreadsheet, the photo editor, the web browser, the chat client, the encyclopedia and the game - seven workers for your errands.',
              'Count and check: 5 + 7 = 12, and the fractions are 5/12 against 7/12 - the workers are the majority.',
              'Hence the board splits 5 system-side and 7 application-side - 12 programs sorted by one question.',
            ],
            figures: [{ caption: 'The classify-12 sorting board: five keepers on the machine\'s side, seven workers on yours, one question over both.', svg: cf52SolClassifySvg() }],
          },
          {
            q: 'A worksheet has 26 columns (A to Z) and 100 rows. How many cells does it hold, and how many cells are in one column and in one row?',
            answer: 'Hence the grid is 26 x 100 = 2,600 cells, with 100 cells in one column and 26 in one row',
            solution: [
              'Take the census shape: columns times rows gives cells.',
              'So, the cells: $26 \\times 100 = 2{,}600$.',
              'Take one column: it runs down all 100 rows, so it holds 100 cells.',
              'Check one row: it runs across all 26 columns, so it holds 26 cells - and 26 columns of 100, or 100 rows of 26, both rebuild the 2,600.',
              'Hence the grid is 26 x 100 = 2,600 cells, with 100 cells in one column and 26 in one row.',
            ],
          },
          {
            q: 'One SUM covers the 100 cells of a column. How many additions does one evaluation perform, and why is the count one fewer than the cells?',
            answer: 'Hence one SUM over the 100-cell column performs 99 additions, because 100 - 1 = 99',
            solution: [
              'Take the recipe: a running total that starts with the first cell\'s value.',
              'So, the first cell is taken for free - nothing is added to get started.',
              'Now, each of the remaining cells is added on, one addition per cell: $100 - 1 = 99$.',
              'Check the law on the row-shaped cousin: 26 cells would cost $26 - 1 = 25$ - the count always trails the cells by one.',
              'Hence one SUM over the 100-cell column performs 99 additions, because 100 - 1 = 99.',
            ],
          },
          {
            q: 'A suite bundles four workers under one licence. How many licences would the four programs cost bought as singles, and what is the licence count ratio?',
            answer: 'Hence four singles need 4 licences while the suite needs 1 - a 4-to-1 count',
            solution: [
              'Take the two ways of buying: four single-purpose workers, or one suite of the same four.',
              'So, the singles: one licence per program, and four programs means $4 \\times 1 = 4$ licences.',
              'Take the suite: one licence covers all four workers - 1 licence.',
              'Check the ratio: $4 / 1 = 4$, a 4-to-1 count in the suite\'s favour before any money is discussed.',
              'Hence four singles need 4 licences while the suite needs 1 - a 4-to-1 count.',
            ],
          },
          {
            q: 'Take one worker - a word processor - and state where it lives, who updates it and when it needs the network, in each of its three uniforms.',
            answer: 'Hence the grid reads: your disk, the owner\'s server, or the phone via a store; you, the owner, or the store; and to save-print-sync, every second, or as the worker demands',
            solution: [
              'Take the three uniforms in turn: desktop installable, web app, mobile app.',
              'So, where it lives: your own disk; the owner\'s server with the browser showing it; the phone, installed through a store.',
              'Now, who updates it: you, when you choose; the owner, silently; the store, with your permission.',
              'Check the network: to save, print or sync - not to work; every working second; as the worker demands.',
              'Hence the grid reads: your disk, the owner\'s server, or the phone via a store; you, the owner, or the store; and to save-print-sync, every second, or as the worker demands.',
            ],
            figures: [{ caption: 'The three-question grid: one word processor compared across its desktop, web and mobile uniforms.', svg: cf52SolUniformSvg() }],
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'Model the 2,600-cell grid at 8 bytes per cell. Compute the storage in bytes, convert it to KiB, and give the per-row byte count as a check.',
            answer: 'Hence 2,600 x 8 = 20,800 bytes, and 20,800 / 1,024 = 20.3125 KiB, with 208 bytes in one row',
            solution: [
              'Take the model: one cell, one 8-byte slot - a modelling choice, stated as one.',
              'So, cells to bytes: $2{,}600 \\times 8 = 20{,}800$ bytes.',
              'Convert to binary units: a KiB is 1,024 bytes, and $20{,}800 / 1{,}024 = 20.3125$ KiB - exact, not rounded.',
              'Check by rows: one row is $26 \\times 8 = 208$ bytes, and $208 \\times 100 = 20{,}800$ - the routes agree.',
              'Check the hedge: a real file stores more (recipes, formatting, history), and the SI face says 20.8 KB - both part of the honest answer.',
              'Hence 2,600 x 8 = 20,800 bytes, and 20,800 / 1,024 = 20.3125 KiB, with 208 bytes in one row.',
            ],
            figures: [{ caption: 'The storage-honesty ladder: 2,600 cells to 20,800 bytes to 20.3125 KiB, with both check routes beneath.', svg: cf52SolStorageSvg() }],
          },
          {
            q: 'In the pinned model a single licence costs 1,000 and the four-app suite costs 2,400. Compute both bills, the saving and its percentage, and the break-even number of apps.',
            answer: 'Hence the singles bill is 4,000, the suite is 2,400, the saving is 1,600 which is 40%, and the break-even is 3 of the 4 apps',
            solution: [
              'Take the model: singles at 1,000 each, the suite at 2,400 for all four.',
              'So, the singles bill: $4 \\times 1{,}000 = 4{,}000$.',
              'Take the suite bill: 2,400, so the saving is $4{,}000 - 2{,}400 = 1{,}600$.',
              'Convert the saving: $1{,}600 / 4{,}000 = 0.4 = 40\\%$ of the singles bill.',
              'Now, the break-even: using $k$ apps yields $k \\times 1{,}000$ of value; at $k = 2$ that is 2,000, below 2,400, and at $k = 3$ it is 3,000, above it.',
              'Hence the singles bill is 4,000, the suite is 2,400, the saving is 1,600 which is 40%, and the break-even is 3 of the 4 apps.',
            ],
            figures: [{ caption: 'The suite-vs-singles licence math: four licences at 4,000 against one at 2,400, the 1,600 saving and the 3-of-4 break-even.', svg: cf52SolSuiteSvg() }],
          },
          {
            q: 'Match each of the seven families to its verb and one named example, and say which family wears two verbs and why.',
            answer: 'Hence the match is compose and compute, narrate, reach, converse, learn, build and play - with productivity wearing two verbs for its four core kinds',
            solution: [
              'Take the families in census order and pin one verb to each.',
              'So: productivity - compose and compute; creative and media - narrate; browsers and content access - reach.',
              'Now: communication - converse; education and reference - learn; developer tools - build; games and simulation - play.',
              'Check the examples: word processor and spreadsheet; the photo editor; the web browser; the chat app; the encyclopedia; the code editor and compiler; the game.',
              'Hence the match is compose and compute, narrate, reach, converse, learn, build and play - with productivity wearing two verbs for its four core kinds.',
            ],
            figures: [{ caption: 'The family-verb match scaffold: seven rows, each family with its verb and one named example.', svg: cf52SolVerbSvg() }],
          },
          {
            q: 'A user edits five different cells of the 100-cell column one at a time. Using the re-cook law, compute the total additions the machine performs on the SUM.',
            answer: 'Hence five separate changes re-cook the column five times for 5 x 99 = 495 additions in all',
            solution: [
              'Take the re-cook law: one evaluation of a formula over $n$ cells costs $n - 1$ additions, and every ingredient change re-runs the whole recipe.',
              'So, one evaluation here: $100 - 1 = 99$ additions.',
              'Now, the user makes 5 separate edits, one at a time - each edit triggers a full re-cook.',
              'Check the bill: $5 \\times 99 = 495$ additions in all, paid in full at every change.',
              'Hence five separate changes re-cook the column five times for 5 x 99 = 495 additions in all.',
            ],
          },
        ],
      },
      {
        level: 'L4',
        questions: [
          {
            q: 'Exam-style: classify each of the following as system or application software, with a one-line reason each - an operating system, a spreadsheet, a device driver, a web browser, a photo editor, a game.',
            answer: 'Hence 4 of the 6 are application software - the spreadsheet, the browser, the photo editor and the game - and 2 are system software - the operating system and the driver',
            solution: [
              'Take the six one at a time and ask the test aloud: whose job does it do?',
              'So, the operating system keeps the machine itself - system software; the device driver teaches the OS one piece of hardware - system software again.',
              'Now, the spreadsheet computes your sums, the browser reaches your content, the photo editor crafts your pictures and the game plays your games - all four are your errands.',
              'Check the count: 4 of the 6 on your side, 2 of the 6 on the machine\'s - the workers are the majority, as the classify-12 board also showed.',
              'Hence 4 of the 6 are application software - the spreadsheet, the browser, the photo editor and the game - and 2 are system software - the operating system and the driver.',
            ],
          },
          {
            q: 'Exam-style: state the purpose of a spreadsheet, and for a 26-column, 100-row worksheet compute the number of cells and the additions one SUM over a single column performs.',
            answer: 'Hence the purpose is the automatic re-cooking of the user\'s arithmetic on a grid; the census is 26 x 100 = 2,600 cells, and one SUM over a column performs 99 additions',
            solution: [
              'Take the purpose first: a spreadsheet stores your numbers on a grid and keeps formulas as recipes, re-cooking the arithmetic whenever an ingredient changes.',
              'So, the census: $26 \\times 100 = 2{,}600$ cells, each addressed like D100.',
              'Now, the recipe\'s price: one SUM over the 100 cells of a column costs $100 - 1 = 99$ additions.',
              'Check the pairing: the census and the price are the two numbers an examiner wants beside the purpose - 2,600 cells, 99 additions per evaluation.',
              'Hence the purpose is the automatic re-cooking of the user\'s arithmetic on a grid; the census is 26 x 100 = 2,600 cells, and one SUM over a column performs 99 additions.',
            ],
          },
        ],
      },
    ] },
  ],
}
