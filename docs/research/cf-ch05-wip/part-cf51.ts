import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf51.ts — CS RUN 9 seat cf51 (the LIBRARY lesson).
 *
 * Lesson 5.1 'System Software: the Manager Layer' of Computer
 * Fundamentals chapter 5 'Software Families'. Software named as
 * instructions for the box: the two-family census (system runs the
 * machine and provides the platform; application does the user's own
 * job), the four-layer stack (user, application, system, hardware)
 * with each layer talking only to its neighbours, the operating
 * system's five visible jobs (processes, memory, the file system,
 * device input/output through drivers, the user interface), the
 * time-slicing arithmetic of multitasking (10 ms slices x 2 processes
 * = 20 ms round -> 50 switches/s at ~1 us each = 50 us/s = 0.005% of
 * the wall clock; 4 jobs on 1 core -> each waits 30 ms between turns,
 * 25 turns/s each), the six-utility census, the seven-device driver
 * census (7 devices -> 7 drivers; 2 OSes -> 14), firmware as software
 * living on the hardware with the five-stage boot handoff (power on,
 * firmware POST, bootloader, OS kernel, login prompt), and the dated
 * beats told honestly (GM-NAA I/O 1956 for the IBM 704; UNIX 1969 at
 * Bell Labs; Xerox Alto 1973; Apple Macintosh 1984 - 11 years between
 * the GUI landmarks, 15 after UNIX). The scheduling theory rides the
 * 'Operating Systems' book; the privilege-level door rides 'Computer
 * Organization and Architecture'.
 *
 * Every number printed here is pinned green by v-cf51.ts (73 engine
 * checks ran GREEN before this prose was written; the pin block closes
 * the ring). All figures are self-contained computed SVGs in the house
 * palette; every geometry constant is derived, never eyeballed.
 * Study-never-reproduce: every roster, witness, figure, Illustration,
 * quiz item and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const c51 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f51 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order (x, y, weight, size,
   fill, anchor) so the engine's clip audit can parse every label */
function cf51T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* ================================================================== */
/* BODY FIGURE 1 — the four-layer stack: user / application / system  */
/* hardware; arrows only between neighbours; firmware straddles       */
/* ================================================================== */
function cf51StackSvg(): string {
  const W = 760
  const H = 366
  const layers = [
    { name: 'USER', note: 'you - the person with the job', fill: c51.white, stroke: c51.ink },
    { name: 'APPLICATION SOFTWARE', note: 'the worker family - does the user\'s own job', fill: c51.white, stroke: c51.teal },
    { name: 'SYSTEM SOFTWARE', note: 'the manager layer - runs the machine, hides the hardware', fill: c51.panelB, stroke: c51.conn },
    { name: 'HARDWARE', note: 'the box chapter 4 opened', fill: c51.panelA, stroke: c51.accent },
  ]
  const x0 = 250
  const w = 330
  const top0 = 70
  const stride = 58
  const h = 48
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f51}" role="img" aria-label="The four-layer stack of a computer system drawn as four stacked shelves: the user at the top, application software below the user, system software below the applications, and hardware at the bottom. Vertical arrows connect only neighbouring layers - three arrows for four layers - and each arrow is labelled: the user asks for work, the applications stand on the platform, the system software speaks the machine's own dialect. A chip marked firmware straddles the boundary between the system software and hardware layers, showing that the stack is a model, not a fence.">`)
  s.push(cf51T(W / 2, 28, 12, c51.teal, 'middle', 'THE FOUR-LAYER STACK - THE MAP OF THIS CHAPTER', true))
  s.push(cf51T(W / 2, 46, 9.5, c51.tealInk, 'middle', 'each layer talks only to its neighbours - the manager layer hides the hardware\'s dialect from the workers'))
  layers.forEach((L, k) => {
    const top = top0 + k * stride
    const midY = top + h / 2 + 4
    s.push(`<rect x="${x0}" y="${top}" width="${w}" height="${h}" rx="7" fill="${L.fill}" stroke="${L.stroke}" stroke-width="2"/>`)
    s.push(cf51T(x0 + w / 2, midY - 6, 11, c51.ink, 'middle', L.name, true))
    s.push(cf51T(x0 + w / 2, midY + 10, 9.5, c51.tealInk, 'middle', L.note))
  })
  const mids = layers.map((_, k) => top0 + k * stride + h / 2 + 4)
  const arrowNotes = ['asks for work to be done', 'stands on the platform', 'speaks the machine\'s own dialect']
  for (let k = 0; k < 3; k++) {
    const ax = 225
    s.push(`<line x1="${ax}" y1="${mids[k]}" x2="${ax}" y2="${mids[k + 1]}" stroke="${c51.conn}" stroke-width="2"/>`)
    s.push(`<polygon points="${ax - 5},${mids[k] + 9} ${ax + 5},${mids[k] + 9} ${ax},${mids[k]}" fill="${c51.conn}"/>`)
    s.push(`<polygon points="${ax - 5},${mids[k + 1] - 9} ${ax + 5},${mids[k + 1] - 9} ${ax},${mids[k + 1]}" fill="${c51.conn}"/>`)
    s.push(cf51T(215, (mids[k] + mids[k + 1]) / 2 + 3, 9.5, c51.tealInk, 'end', arrowNotes[k]))
  }
  /* the firmware straddle, on the right of the bottom two layers */
  s.push(`<rect x="600" y="210" width="126" height="64" rx="7" fill="${c51.faint}" stroke="${c51.tealInk}" stroke-width="2" stroke-dasharray="6 4"/>`)
  s.push(cf51T(663, 236, 10, c51.tealInk, 'middle', 'FIRMWARE', true))
  s.push(cf51T(663, 252, 9.5, c51.tealInk, 'middle', 'software on a chip'))
  s.push(cf51T(663, 288, 9.5, c51.tealInk, 'middle', 'it straddles the'))
  s.push(cf51T(663, 300, 9.5, c51.tealInk, 'middle', 'bottom two layers'))
  s.push(`<line x1="600" y1="234" x2="584" y2="234" stroke="${c51.tealInk}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
  s.push(`<line x1="600" y1="250" x2="584" y2="268" stroke="${c51.tealInk}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
  s.push(`<rect x="16" y="316" width="${W - 32}" height="42" rx="8" fill="${c51.panelB}" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(cf51T(W / 2, 334, 10, c51.ink, 'middle', 'the stack is a model, not a fence - firmware is software (instructions) living on hardware (a chip)'))
  s.push(cf51T(W / 2, 350, 9.5, c51.tealInk, 'middle', '4 layers, 3 internal boundaries - and the census this chapter sorts: 2 software families inside one of them'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 2 — the OS's five jobs as a manager's desk: five       */
/* labelled panels around one desk motif                              */
/* ================================================================== */
function cf51DeskSvg(): string {
  const W = 760
  const H = 340
  const s: string[] = []
  const panel = (x: number, y: number, l1: string, l2: string) => {
    s.push(`<rect x="${x}" y="${y}" width="200" height="56" rx="7" fill="${c51.white}" stroke="${c51.struct}" stroke-width="2"/>`)
    s.push(cf51T(x + 100, y + 22, 9.5, c51.ink, 'middle', l1, true))
    s.push(cf51T(x + 100, y + 40, 9.5, c51.tealInk, 'middle', l2))
  }
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f51}" role="img" aria-label="The operating system drawn as a manager's desk with five duty panels around it. The desk at the centre is the kernel. The five panels read: process management, who runs next; memory management, who owns which addresses; the file system, names on the storage shelf; device input and output, through drivers; and the user interface, the shell, as a graphical interface or a command line. Connector lines tie each duty panel to the desk, and the caption says five jobs, one desk.">`)
  s.push(cf51T(W / 2, 28, 12, c51.teal, 'middle', 'THE MANAGER\'S DESK - THE FIVE VISIBLE JOBS OF THE OS', true))
  s.push(cf51T(W / 2, 46, 9.5, c51.tealInk, 'middle', 'the manager\'s duty list - five jobs, one desk, and every one of them touches you daily'))
  /* the desk */
  s.push(`<rect x="290" y="160" width="180" height="100" rx="9" fill="${c51.panelB}" stroke="${c51.conn}" stroke-width="2.5"/>`)
  s.push(cf51T(380, 190, 11, c51.ink, 'middle', 'THE KERNEL', true))
  s.push(cf51T(380, 208, 10, c51.ink, 'middle', 'the manager\'s desk', true))
  s.push(cf51T(380, 226, 9.5, c51.tealInk, 'middle', 'the core that serves'))
  s.push(cf51T(380, 242, 9.5, c51.tealInk, 'middle', 'all five jobs at once'))
  /* five panels: three across the top, one each side */
  panel(30, 64, 'PROCESS MANAGEMENT', 'who runs next - the slices')
  panel(280, 64, 'MEMORY MANAGEMENT', 'who owns which addresses')
  panel(530, 64, 'THE FILE SYSTEM', 'names on the storage shelf')
  panel(30, 182, 'DEVICE INPUT/OUTPUT', 'through drivers - one each')
  panel(530, 182, 'THE USER INTERFACE', 'the shell - GUI or command line')
  /* connectors */
  s.push(`<line x1="230" y1="92" x2="316" y2="160" stroke="${c51.mid}" stroke-width="1.8"/>`)
  s.push(`<line x1="380" y1="120" x2="380" y2="160" stroke="${c51.mid}" stroke-width="1.8"/>`)
  s.push(`<line x1="530" y1="92" x2="444" y2="160" stroke="${c51.mid}" stroke-width="1.8"/>`)
  s.push(`<line x1="230" y1="210" x2="290" y2="210" stroke="${c51.mid}" stroke-width="1.8"/>`)
  s.push(`<line x1="530" y1="210" x2="470" y2="210" stroke="${c51.mid}" stroke-width="1.8"/>`)
  s.push(`<rect x="16" y="286" width="${W - 32}" height="42" rx="8" fill="${c51.panelB}" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(cf51T(W / 2, 304, 10, c51.ink, 'middle', 'five jobs, one desk - the manager layer hides the hardware\'s dialect from the workers above it'))
  s.push(cf51T(W / 2, 320, 9.5, c51.tealInk, 'middle', 'the shell is the face you talk to; the kernel is the core that does the five jobs'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 3 — the boot handoff chain: 5 stations, 4 handoffs     */
/* ================================================================== */
function cf51BootSvg(): string {
  const W = 760
  const H = 250
  const stages = [
    { name: 'POWER ON', duty: 'wake', fill: c51.white, stroke: c51.ink },
    { name: 'FIRMWARE POST', duty: 'inventory', fill: c51.faint, stroke: c51.tealInk },
    { name: 'BOOTLOADER', duty: 'fetch', fill: c51.panelB, stroke: c51.conn },
    { name: 'OS KERNEL', duty: 'organise', fill: c51.panelA, stroke: c51.accent },
    { name: 'LOGIN PROMPT', duty: 'greet', fill: c51.white, stroke: c51.struct },
  ]
  const w = 128
  const y = 90
  const h = 64
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f51}" role="img" aria-label="The boot handoff drawn as five stations in a left-to-right chain: power on with the one-word duty wake, firmware POST with the duty inventory, bootloader with the duty fetch, OS kernel with the duty organise, and login prompt with the duty greet. Arrows carry the machine from each station to the next - four handoffs between five stations - and the caption restates the honest order.">`)
  s.push(cf51T(W / 2, 28, 12, c51.teal, 'middle', 'THE BOOT HANDOFF - FIVE STAGES, FOUR HANDOFFS', true))
  s.push(cf51T(W / 2, 46, 9.5, c51.tealInk, 'middle', 'each stage wakes the next and hands over the machine - only one order ever works'))
  stages.forEach((st, k) => {
    const x = 30 + k * 148
    s.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${st.fill}" stroke="${st.stroke}" stroke-width="2"/>`)
    s.push(cf51T(x + w / 2, y + 26, 10, c51.ink, 'middle', st.name, true))
    s.push(cf51T(x + w / 2, y + 46, 9.5, c51.tealInk, 'middle', 'duty: ' + st.duty))
    if (k < 4) {
      const ax = x + w + 2
      const bx = x + 148 - 2
      s.push(`<line x1="${ax}" y1="${y + h / 2}" x2="${bx}" y2="${y + h / 2}" stroke="${c51.conn}" stroke-width="2.2"/>`)
      s.push(`<polygon points="${bx - 8},${y + h / 2 - 5} ${bx - 8},${y + h / 2 + 5} ${bx},${y + h / 2}" fill="${c51.conn}"/>`)
    }
  })
  s.push(`<rect x="16" y="180" width="${W - 32}" height="52" rx="8" fill="${c51.panelB}" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(cf51T(W / 2, 200, 10, c51.ink, 'middle', 'power on - firmware POST - bootloader - OS kernel - login prompt: 5 stages, 4 handoffs'))
  s.push(cf51T(W / 2, 218, 9.5, c51.tealInk, 'middle', 'the POST is the inventory check: the firmware counts what is fitted before it trusts the machine to the OS'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 4 — the time-slicing ribbon: one core, two processes,  */
/* alternating 10 ms blocks with the switch ticks marked              */
/* ================================================================== */
function cf51RibbonSvg(): string {
  const W = 760
  const H = 300
  const blocks = [
    { who: 'PROCESS A', fill: c51.white, stroke: c51.teal },
    { who: 'PROCESS B', fill: c51.panelA, stroke: c51.accent },
    { who: 'PROCESS A', fill: c51.white, stroke: c51.teal },
    { who: 'PROCESS B', fill: c51.panelA, stroke: c51.accent },
  ]
  const bw = 150
  const y = 84
  const bh = 60
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f51}" role="img" aria-label="The time-slicing ribbon: one processor core handed between two processes in alternating ten-millisecond blocks, A then B then A then B, with each handover marked by a red switch tick costing about one microsecond. Beneath the ribbon a bracket marks one full round of two slices as twenty milliseconds, and four chips carry the arithmetic: two times ten is twenty; one thousand divided by twenty is fifty switches per second; fifty times one microsecond is fifty microseconds; and fifty microseconds of a one-million-microsecond second is 0.005 percent.">`)
  s.push(cf51T(W / 2, 28, 12, c51.teal, 'middle', 'THE TIME-SLICING RIBBON - ONE CORE, TWO PROCESSES', true))
  s.push(cf51T(W / 2, 46, 9.5, c51.tealInk, 'middle', '10 ms slices, handed round and round - the switch ticks between blocks cost about 1 μs each'))
  blocks.forEach((b, k) => {
    const x = 40 + k * 160
    s.push(`<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="6" fill="${b.fill}" stroke="${b.stroke}" stroke-width="2"/>`)
    s.push(cf51T(x + bw / 2, y + 26, 10, c51.ink, 'middle', b.who, true))
    s.push(cf51T(x + bw / 2, y + 45, 9.5, c51.tealInk, 'middle', '10 ms slice'))
  })
  for (let k = 0; k < 3; k++) {
    const tx = 40 + bw + k * 160
    s.push(`<line x1="${tx + 5}" y1="76" x2="${tx + 5}" y2="152" stroke="${c51.warn}" stroke-width="2" stroke-dasharray="4 3"/>`)
    s.push(cf51T(tx + 5, 72, 9, c51.warn, 'middle', `switch ${k + 1}`))
    s.push(cf51T(tx + 5, 164, 9, c51.warn, 'middle', '≈ 1 μs'))
  }
  s.push(`<line x1="40" y1="180" x2="350" y2="180" stroke="${c51.ink}" stroke-width="2"/>`)
  s.push(`<line x1="40" y1="174" x2="40" y2="186" stroke="${c51.ink}" stroke-width="2"/>`)
  s.push(`<line x1="350" y1="174" x2="350" y2="186" stroke="${c51.ink}" stroke-width="2"/>`)
  s.push(cf51T(195, 198, 10, c51.ink, 'middle', 'one round = 2 x 10 ms = 20 ms', true))
  const chips = [
    ['2 x 10 ms', '= 20 ms round'],
    ['1000 / 20', '= 50 switches/s'],
    ['50 x 1 μs', '= 50 μs per second'],
    ['50 / 1,000,000', '= 0.005% overhead'],
  ]
  chips.forEach((ch, k) => {
    const x = 30 + k * 176
    s.push(`<rect x="${x}" y="212" width="168" height="40" rx="7" fill="${c51.white}" stroke="${c51.struct}" stroke-width="2"/>`)
    s.push(cf51T(x + 84, 230, 9.5, c51.ink, 'middle', ch[0], true))
    s.push(cf51T(x + 84, 246, 9.5, c51.tealInk, 'middle', ch[1]))
  })
  s.push(cf51T(W / 2, 278, 9.5, c51.ink, 'middle', 'the illusion is cheap: 999,950 of every second\'s 1,000,000 μs run your programs - only 50 μs move the paperwork'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURES — compact computed SVGs that aid THAT exercise    */
/* (0-2 per question, per the v9.0 directive)                         */
/* ================================================================== */

/* S1 — the driver translation two-panel (OS side / device side) */
function cf51SolDriverSvg(): string {
  const W = 680
  const H = 260
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f51}" role="img" aria-label="The driver as a translator between two panels. The left panel is the operating system side, which speaks one standard dialect: open, read, write, close. The right panel is the device side, where every device speaks its own private command set. Between them stands the driver, a small translating box with arrows in both directions. The caption carries the census: seven devices means seven drivers, one translator per device, and a second operating system would need its own seven, for fourteen in all.">`)
  s.push(cf51T(W / 2, 30, 11, c51.teal, 'middle', 'ONE DRIVER, TWO DIALECTS - THE TRANSLATION', true))
  s.push(`<rect x="30" y="60" width="270" height="120" rx="9" fill="${c51.white}" stroke="${c51.teal}" stroke-width="2"/>`)
  s.push(cf51T(165, 86, 10.5, c51.ink, 'middle', 'THE OS SIDE', true))
  s.push(cf51T(165, 106, 9.5, c51.tealInk, 'middle', 'one standard dialect for every device'))
  s.push(cf51T(165, 130, 10, c51.ink, 'middle', 'open - read - write - close', true))
  s.push(cf51T(165, 152, 9.5, c51.tealInk, 'middle', 'the same four asks, whatever is fitted'))
  s.push(`<rect x="380" y="60" width="270" height="120" rx="9" fill="${c51.panelA}" stroke="${c51.accent}" stroke-width="2"/>`)
  s.push(cf51T(515, 86, 10.5, c51.ink, 'middle', 'THE DEVICE SIDE', true))
  s.push(cf51T(515, 106, 9.5, c51.tealInk, 'middle', 'each device speaks its own words'))
  s.push(cf51T(515, 130, 10, c51.ink, 'middle', 'private command sets', true))
  s.push(cf51T(515, 152, 9.5, c51.tealInk, 'middle', 'seven devices, seven vocabularies'))
  s.push(`<rect x="308" y="90" width="64" height="60" rx="7" fill="${c51.panelB}" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(cf51T(340, 114, 10, c51.ink, 'middle', 'DRIVER', true))
  s.push(cf51T(340, 132, 9.5, c51.tealInk, 'middle', 'translates'))
  s.push(`<line x1="300" y1="105" x2="308" y2="105" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(`<line x1="372" y1="105" x2="380" y2="105" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(`<line x1="300" y1="135" x2="308" y2="135" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(`<line x1="372" y1="135" x2="380" y2="135" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(`<polygon points="306,101 306,109 300,105" fill="${c51.conn}"/>`)
  s.push(`<polygon points="378,101 378,109 384,105" fill="${c51.conn}"/>`)
  s.push(`<polygon points="306,131 306,139 300,135" fill="${c51.conn}"/>`)
  s.push(`<polygon points="378,131 378,139 384,135" fill="${c51.conn}"/>`)
  s.push(`<rect x="16" y="200" width="${W - 32}" height="44" rx="8" fill="${c51.panelB}" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(cf51T(W / 2, 218, 10, c51.ink, 'middle', 'the census: 7 devices - 7 drivers, one translator per device'))
  s.push(cf51T(W / 2, 236, 9.5, c51.tealInk, 'middle', 'a second operating system speaks a different dialect, so it needs its own 7: 2 x 7 = 14'))
  s.push('</svg>')
  return s.join('')
}

/* S2 — the utility family wheel: 6 utilities around one hub */
function cf51SolWheelSvg(): string {
  const W = 680
  const H = 366
  const hubX = 340
  const hubY = 190
  const R = 140
  const panels = [
    { a: -90, l1: 'ANTIVIRUS', l2: 'quarantines infected files' },
    { a: -30, l1: 'BACKUP', l2: 'keeps copies of your work' },
    { a: 30, l1: 'DISK CLEANUP / DEFRAG', l2: 'gathers scattered pieces' },
    { a: 90, l1: 'COMPRESSION', l2: 'shrinks files to travel' },
    { a: 150, l1: 'UNINSTALLER', l2: 'removes apps cleanly' },
    { a: 210, l1: 'TASK MANAGER', l2: 'shows and ends processes' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f51}" role="img" aria-label="The utility family drawn as a wheel of six panels around one hub. The hub says the machine keeps its own house. The six panels read: antivirus, which quarantines infected files; backup, which keeps copies of your work; disk cleanup and defragmenter, which gathers scattered pieces; compression, which shrinks files to travel; uninstaller, which removes applications cleanly; and the task manager, which shows running processes and ends the frozen ones.">`)
  s.push(cf51T(W / 2, 30, 11, c51.teal, 'middle', 'THE UTILITY FAMILY WHEEL - SIX SPECIALISTS, ONE HOUSE', true))
  panels.forEach((p) => {
    const rad = (p.a * Math.PI) / 180
    const cx = hubX + R * Math.cos(rad)
    const cy = hubY + R * Math.sin(rad)
    const sx = hubX + 56 * Math.cos(rad)
    const sy = hubY + 56 * Math.sin(rad)
    s.push(`<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${(cx - 78 * Math.cos(rad)).toFixed(1)}" y2="${(cy - 26 * Math.sin(rad)).toFixed(1)}" stroke="${c51.mid}" stroke-width="1.8"/>`)
  })
  s.push(`<circle cx="${hubX}" cy="${hubY}" r="52" fill="${c51.panelB}" stroke="${c51.conn}" stroke-width="2.5"/>`)
  s.push(cf51T(hubX, hubY - 8, 10, c51.ink, 'middle', 'the machine', true))
  s.push(cf51T(hubX, hubY + 8, 10, c51.ink, 'middle', 'keeps its', true))
  s.push(cf51T(hubX, hubY + 24, 10, c51.ink, 'middle', 'own house', true))
  panels.forEach((p) => {
    const rad = (p.a * Math.PI) / 180
    const cx = hubX + R * Math.cos(rad)
    const cy = hubY + R * Math.sin(rad)
    s.push(`<rect x="${(cx - 75).toFixed(1)}" y="${(cy - 23).toFixed(1)}" width="150" height="46" rx="7" fill="${c51.white}" stroke="${c51.struct}" stroke-width="2"/>`)
    s.push(cf51T(cx, cy - 4, 9.5, c51.ink, 'middle', p.l1, true))
    s.push(cf51T(cx, cy + 14, 9.5, c51.tealInk, 'middle', p.l2))
  })
  s.push(cf51T(W / 2, 358, 9.5, c51.tealInk, 'middle', 'each utility performs one housekeeping task for the machine - system software, not the user\'s own job'))
  s.push('</svg>')
  return s.join('')
}

/* S3 — the boot-chain re-order scaffold for the ordering exercise */
function cf51SolBootSvg(): string {
  const W = 680
  const H = 286
  const stages = [
    { n: '1', name: 'POWER ON', duty: 'wake', fill: c51.white, stroke: c51.ink },
    { n: '2', name: 'FIRMWARE POST', duty: 'inventory', fill: c51.faint, stroke: c51.tealInk },
    { n: '3', name: 'BOOTLOADER', duty: 'fetch', fill: c51.panelB, stroke: c51.conn },
    { n: '4', name: 'OS KERNEL', duty: 'organise', fill: c51.panelA, stroke: c51.accent },
    { n: '5', name: 'LOGIN PROMPT', duty: 'greet', fill: c51.white, stroke: c51.struct },
  ]
  const w = 118
  const y = 70
  const h = 70
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f51}" role="img" aria-label="The boot order solved, as five numbered stations in a row: stage one, power on, whose duty is to wake; stage two, the firmware POST, whose duty is the inventory; stage three, the bootloader, whose duty is to fetch; stage four, the OS kernel, whose duty is to organise; stage five, the login prompt, whose duty is to greet. Arrows run left to right. Beneath, the arithmetic of orderings: five factorial is one hundred and twenty ways to arrange five stages, and exactly one of them boots the machine.">`)
  s.push(cf51T(W / 2, 30, 11, c51.teal, 'middle', 'THE BOOT ORDER, SOLVED - ONE ORDER OUT OF 120', true))
  stages.forEach((st, k) => {
    const x = 25 + k * 132
    s.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${st.fill}" stroke="${st.stroke}" stroke-width="2"/>`)
    s.push(cf51T(x + 16, y + 20, 10, c51.conn, 'start', st.n, true))
    s.push(cf51T(x + w / 2 + 8, y + 32, 9.5, c51.ink, 'middle', st.name, true))
    s.push(cf51T(x + w / 2 + 8, y + 52, 9.5, c51.tealInk, 'middle', st.duty))
    if (k < 4) {
      const ax = x + w + 2
      const bx = x + 132 - 2
      s.push(`<line x1="${ax}" y1="${y + h / 2}" x2="${bx}" y2="${y + h / 2}" stroke="${c51.conn}" stroke-width="2.2"/>`)
      s.push(`<polygon points="${bx - 7},${y + h / 2 - 4} ${bx - 7},${y + h / 2 + 4} ${bx},${y + h / 2}" fill="${c51.conn}"/>`)
    }
  })
  s.push(cf51T(W / 2, 184, 10, c51.ink, 'middle', '5! = 5 x 4 x 3 x 2 x 1 = 120 ways to order five stages - exactly 1 of them boots', true))
  s.push(cf51T(W / 2, 202, 9.5, c51.tealInk, 'middle', 'the honest order: power on, then POST, then the bootloader, then the kernel, then the login prompt'))
  s.push(`<rect x="16" y="218" width="${W - 32}" height="52" rx="8" fill="${c51.panelB}" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(cf51T(W / 2, 238, 10, c51.ink, 'middle', 'why the order is forced: no stage can run before the stage that hands it the machine'))
  s.push(cf51T(W / 2, 256, 9.5, c51.tealInk, 'middle', 'the POST must inventory the parts before the bootloader can be trusted to fetch the OS from the shelf'))
  s.push('</svg>')
  return s.join('')
}

/* S4 — the layer-straddling firmware diagram */
function cf51SolFirmwareSvg(): string {
  const W = 680
  const H = 300
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f51}" role="img" aria-label="Firmware as the straddler of the stack's bottom two layers. A wide upper layer is labelled system software, runs the platform. A wide lower layer is labelled hardware, the box chapter 4 opened. A chip-shaped box marked firmware crosses the boundary between them, because firmware is a program - instructions - stored permanently on a physical chip inside the device. Side notes read: a program, it is instructions; and a chip, it is physical. The caption says the stack is a model, not a fence.">`)
  s.push(cf51T(W / 2, 30, 11, c51.teal, 'middle', 'FIRMWARE - SOFTWARE LIVING ON THE HARDWARE', true))
  s.push(`<rect x="60" y="70" width="560" height="80" rx="9" fill="${c51.panelB}" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(cf51T(80, 100, 11, c51.ink, 'start', 'SYSTEM SOFTWARE', true))
  s.push(cf51T(80, 120, 9.5, c51.tealInk, 'start', 'runs the platform - the manager layer of this lesson'))
  s.push(`<rect x="60" y="190" width="560" height="80" rx="9" fill="${c51.panelA}" stroke="${c51.accent}" stroke-width="2"/>`)
  s.push(cf51T(80, 220, 11, c51.ink, 'start', 'HARDWARE', true))
  s.push(cf51T(80, 240, 9.5, c51.tealInk, 'start', 'the box chapter 4 opened - processor, memory, buses'))
  s.push(`<rect x="270" y="130" width="140" height="80" rx="8" fill="${c51.faint}" stroke="${c51.tealInk}" stroke-width="2.5"/>`)
  s.push(cf51T(340, 160, 10.5, c51.tealInk, 'middle', 'FIRMWARE CHIP', true))
  s.push(cf51T(340, 178, 9.5, c51.tealInk, 'middle', 'the BIOS/UEFI chip'))
  s.push(cf51T(340, 194, 9.5, c51.tealInk, 'middle', 'of lesson 4.1'))
  s.push(cf51T(424, 118, 9.5, c51.ink, 'start', 'a program: it is instructions'))
  s.push(cf51T(424, 148, 9.5, c51.tealInk, 'start', 'so it belongs to the software family'))
  s.push(cf51T(424, 226, 9.5, c51.ink, 'start', 'a chip: it is physical'))
  s.push(cf51T(424, 256, 9.5, c51.tealInk, 'start', 'so it lives on the hardware'))
  s.push(`<line x1="416" y1="114" x2="380" y2="138" stroke="${c51.mid}" stroke-width="1.6"/>`)
  s.push(`<line x1="416" y1="222" x2="380" y2="198" stroke="${c51.mid}" stroke-width="1.6"/>`)
  s.push(cf51T(W / 2, 292, 9.5, c51.ink, 'middle', 'firmware straddles the bottom two layers - the stack is a model, not a fence'))
  s.push('</svg>')
  return s.join('')
}

/* S5 — the switch-cost ledger: 50 ticks inside one second + zoom */
function cf51SolLedgerSvg(): string {
  const W = 680
  const H = 302
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f51}" role="img" aria-label="The switch ledger. A long bar represents one second of wall clock. Fifty thin red ticks stand on the bar, one for each context switch in that second. A dashed bracket zooms one tick into an inset box that says: one context switch of about one microsecond, in which the core saves one process's state and loads the other's. Beside the inset the ledger lists: fifty switches times one microsecond is fifty microseconds; fifty microseconds of a one-million-microsecond second is 0.005 percent; and re-run at five microseconds per switch the bill is two hundred fifty microseconds, or 0.025 percent - still cheap.">`)
  s.push(cf51T(W / 2, 30, 11, c51.teal, 'middle', 'THE SWITCH LEDGER - WHAT THE ILLUSION COSTS', true))
  s.push(cf51T(340, 58, 9.5, c51.tealInk, 'middle', 'one second of wall clock - each red tick is one context switch'))
  s.push(`<rect x="40" y="70" width="600" height="30" rx="5" fill="${c51.white}" stroke="${c51.ink}" stroke-width="2"/>`)
  for (let k = 0; k < 50; k++) {
    const tx = 40 + 4 + k * 12
    s.push(`<line x1="${tx}" y1="70" x2="${tx}" y2="100" stroke="${c51.warn}" stroke-width="2"/>`)
  }
  s.push(`<rect x="388" y="62" width="18" height="46" rx="4" fill="none" stroke="${c51.warn}" stroke-width="1.6" stroke-dasharray="4 3"/>`)
  s.push(`<line x1="406" y1="108" x2="470" y2="140" stroke="${c51.warn}" stroke-width="1.6" stroke-dasharray="4 3"/>`)
  s.push(`<rect x="470" y="130" width="180" height="104" rx="8" fill="${c51.white}" stroke="${c51.warn}" stroke-width="2"/>`)
  s.push(cf51T(560, 150, 9.5, c51.ink, 'middle', 'ONE SWITCH, ZOOMED', true))
  s.push(cf51T(560, 170, 9.5, c51.tealInk, 'middle', 'save process A\'s state,'))
  s.push(cf51T(560, 186, 9.5, c51.tealInk, 'middle', 'load process B\'s state'))
  s.push(cf51T(560, 210, 11, c51.warn, 'middle', '≈ 1 μs', true))
  s.push(cf51T(40, 160, 10, c51.ink, 'start', '50 switches x 1 μs = 50 μs of every second', true))
  s.push(cf51T(40, 182, 10, c51.ink, 'start', '50 μs of 1,000,000 μs = 0.005% overhead', true))
  s.push(cf51T(40, 206, 9.5, c51.tealInk, 'start', 're-run at 5 μs a switch: 50 x 5 = 250 μs = 0.025%'))
  s.push(cf51T(40, 226, 9.5, c51.tealInk, 'start', 'even the dearer switch keeps the illusion cheap'))
  s.push(`<rect x="16" y="252" width="${W - 32}" height="40" rx="8" fill="${c51.panelB}" stroke="${c51.conn}" stroke-width="2"/>`)
  s.push(cf51T(W / 2, 278, 10, c51.ink, 'middle', 'of every second: 999,950 μs run your programs, 50 μs move the paperwork'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* the lesson                                                          */
/* ================================================================== */
export const lesson51: Lesson = {
  id: 'cf-system-software-the-manager-layer',
  number: '5.1',
  title: 'System Software: the Manager Layer',
  concepts: [
    'software as instructions for the box',
    'the two families: system and application',
    'the four-layer stack and its neighbour rule',
    'the OS\'s five jobs and multitasking\'s 0.005% illusion',
    'utilities, drivers and firmware named honestly',
    'the boot handoff: 5 stages, 4 handoffs',
    'GM-NAA I/O 1956, UNIX 1969, and the GUI lineage',
  ],
  objectives: [
    'By the end of this lesson you can define software as the set of instructions, and the data they work on, that tells the hardware what to do - and sort every program you meet into the two families: system software, which runs the machine and provides the platform, and application software, which does the user\'s own job.',
    'By the end of this lesson you can draw the four-layer stack (user, application software, system software, hardware) and state its neighbour rule: each layer talks only to its neighbours, and the manager layer hides the hardware\'s dialect from the workers.',
    'By the end of this lesson you can list the operating system\'s five visible jobs - process management, memory management, the file system, device input/output through drivers, and the user interface - and distinguish the kernel (the core) from the shell (the face).',
    'By the end of this lesson you can compute the price of the multitasking illusion: 10 ms slices with 2 processes make a 20 ms round, so 50 switches a second at about 1 μs each cost 50 μs of every second - 0.005% of the wall clock - and 4 jobs on 1 core leave each waiting 30 ms between turns.',
    'By the end of this lesson you can name the six-utility census, the driver census (7 devices need 7 drivers; 2 operating systems need 14), and firmware as software stored permanently on a chip inside the device.',
    'By the end of this lesson you can walk the five-stage boot handoff (power on, firmware POST, bootloader, OS kernel, login prompt) and carry the dated beats honestly: GM-NAA I/O in 1956 for the IBM 704, UNIX in 1969 at Bell Labs, the Xerox Alto in 1973 and the Macintosh in 1984.',
  ],
  prerequisites: ['cf-unit-4-completion-review'],
  sources: ['cs-cf-web-ground-ch05'],
  blocks: [
    { kind: 'heading', text: 'From the Box to the Programs' },
    { kind: 'para', text: 'Chapter 4 gave you the city: the motherboard as the street plan, the processor as the worker at the centre, the memory warehouse, the buses carrying cargo. It was a dead city. Every part you met was physically present and doing nothing - a processor without instructions is a worker standing at an empty bench, and a warehouse with no addresses asked for is silent. The present chapter answers the obvious next question: what makes the box WORK? The answer is one word, software, and this lesson takes the word properly before the chapter divides it into its families.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — software', text: '**Software** is said to be the set of instructions, and the data those instructions work on, that tells the hardware what to do. Symbolically: hardware is the physical city (chapter 4\'s ground), software is every instruction ever issued to it, and a **program** is one named, self-contained bundle of such instructions - a recipe the hardware follows step by step.' },
    { kind: 'para', text: 'Read the definition twice and notice what it does NOT say. It does not say software is a thing you can hold - it is patterns of instruction, stored on some physical cloth (a disk, a chip, a stick of RAM) but not identical with any of them. It does not say software is one kind of thing - the recipe that runs your payroll and the recipe that runs the machine itself are written in the same raw materials yet do utterly different work. And it does not privilege either one: the machine needs both families the way a restaurant needs both cooks and managers. That last sentence is the whole chapter in miniature, so take the census properly now.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the two software families', text: 'The software census has exactly **2 software families**. **System software** is said to be the software that runs the machine and provides the platform that other software stands on. **Application software** is said to be the software that does the user\'s own job. Symbolically, the dividing question is one: WHO is the work for? If the work is the machine\'s house - running it, feeding it, keeping it - the program is system software; if the work is the user\'s own - a document, a photograph, a game, a ledger - the program is application software.' },
    { kind: 'para', text: 'Everything this chapter meets sorts into these 2 software families, and the sorting question never changes. The operating system: system software - it runs the machine. A word processor: application software - it does your job of writing. An antivirus program: system software, and this is the one that trips people - it does not do YOUR work, it does the MACHINE\'s housekeeping, so it sits on the system side of the line. A game: application. The program inside your printer that turns page descriptions into ink: system software again - the machine\'s house, not your job. Hold the question who is this work for? and no roster can confuse you.' },
    { kind: 'para', text: 'For example, walk the shelf of an ordinary laptop and ask the dividing question of each item you find:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the operating system itself - runs the machine: system software, the head of the family;',
      '(ii) the word processor, the browser, the spreadsheet - your documents, your pages, your ledgers: application software;',
      '(iii) the antivirus scanner - the machine\'s health: system software, doing one housekeeping task;',
      '(iv) the printer driver - the machine\'s conversation with its own parts: system software, a translator;',
      '(v) the firmware on the motherboard - the machine\'s first waking words: system software, living on the hardware itself.',
    ] },
    { kind: 'para', text: 'One honest note before the map. The census is a census of WORK, not of quality or importance - system software is not the serious half and applications the frivolous half. A bank\'s fraud detector is an application; the OS scheduling that keeps it responsive is system software; the bank needs both, and so do you. What the census buys is a map of WHO STANDS ON WHOM - and that map is the next section\'s whole business.' },
    { kind: 'terms', items: [
      { term: 'software', def: 'the set of instructions, and the data they work on, that tells the hardware what to do.' },
      { term: 'program', def: 'one named, self-contained bundle of instructions - a recipe the hardware follows.' },
      { term: 'system software', def: 'the family that runs the machine and provides the platform others stand on - the OS, utilities, drivers, firmware.' },
      { term: 'application software', def: 'the family that does the user\'s own job - documents, photographs, games, ledgers.' },
    ] },

    // ================================================================
    // 2. THE FOUR-LAYER STACK
    // ================================================================
    { kind: 'heading', text: 'The Four-Layer Stack' },
    { kind: 'para', text: 'Draw the census as a picture and you get the map this whole chapter hangs on: the four-layer stack. At the top sits the **user** - you, the person with the job. Below you, the **application software**: the worker family, the programs you actually name when someone asks what you were doing. Below them, the **system software**: the manager layer, this lesson\'s subject - the operating system, its utilities, its drivers, the firmware at the bottom. And at the bottom, the **hardware**: the box chapter 4 opened, dead until the layers above it speak. Four layers, top to bottom: user, application software, system software, hardware.' },
    { kind: 'figure', caption: 'The four-layer stack: the user at the top, application software below, system software beneath the applications, and the box of chapter 4 at the bottom. The vertical arrows live only between neighbouring layers - three arrows for four layers - because each layer talks only to its neighbours. The firmware chip straddles the bottom two layers: it is software (instructions) living on hardware (a chip), which is why the stack is an honest model rather than a fence.', svg: cf51StackSvg() },
    { kind: 'para', text: 'The stack has one strict rule, and it is the rule that makes the manager layer matter: each layer talks only to its neighbours. You do not whisper instructions into the processor\'s ear; you talk to an application. The application does not wire voltages onto a bus; it asks the system software. The system software - and only the system software - speaks the hardware\'s dialect, issuing the instructions chapter 4 watched the processor fetch, decode and execute. Four layers therefore have exactly three internal boundaries, and all lawful conversation crosses one boundary at a time.' },
    { kind: 'para', text: 'Now see what the middle position buys, because it is the deepest idea in this lesson. Every family of hardware ever sold speaks a different dialect - one printer\'s command set is not another\'s, one disk\'s controller is not another\'s, and the raw dialect of a processor is registers and instruction codes, nothing like the tidy requests a program wants to make. The system software HIDES that dialect from the workers above it. An application says open this file, read it, show it; the manager layer translates that into whatever dialect today\'s hardware actually speaks. The application never knows, and never needs to know, which dialect was spoken underneath. This is why the layer is called the manager layer in this lesson\'s title: it manages the workers, the stock and the customers, and keeps each from having to learn the others\' languages.' },
    { kind: 'callout', tone: 'insight', title: 'Note — why the stack is drawn as a stack', text: 'The picture is not decoration; it is a promise about dependence. Applications depend on system software; system software depends on hardware; the user depends on all of it. Nothing above can exist without everything below, and nothing below knows or cares what is above. That one-way dependence is why you can change your applications without rebuilding your OS, and change your hardware while keeping your applications - the manager layer absorbs the change on exactly one boundary at a time.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the stack is a model, not a fence', text: 'Do not draw the four layers as walls with guards. The honest exception is **firmware** (section 6 of this lesson): it is software - instructions - yet it lives permanently on a hardware chip, so it straddles the bottom two layers and belongs fully to neither. The stack is the honest MAP of who talks to whom; it is not a courtroom that assigns every program exactly one address. Examiners who ask where firmware belongs expect exactly this honesty: software by nature, hardware by residence.' },
    { kind: 'table', caption: 'The two-family census, asked as one dividing question. Hold the question and every roster sorts itself.', head: ['The dividing question', 'System software', 'Application software'], rows: [
      ['Who is the work for?', 'the machine\'s house - run it, feed it, keep it', 'the user\'s own job - write, browse, play, count'],
      ['Does it provide the platform?', 'yes - others stand on it', 'no - it stands on the platform'],
      ['Named members', 'the OS, utilities, device drivers, firmware', 'word processors, browsers, spreadsheets, games'],
      ['If you removed it', 'the machine would not run at all', 'the machine would run; your work would stop'],
      ['Family size', 'a small, disciplined staff', 'the vast worker family, thousands strong'],
    ] },
    { kind: 'para', text: 'The stack also tells you what this chapter\'s remaining lessons will do. Lesson 5.2 opens the worker family - applications - and the families within it. The review at the chapter\'s end re-asks the census question over a wider roster. But the manager layer itself is so load-bearing that it earns this whole lesson, and the honest way to study a manager is to read the duty list pinned above the desk - which is the next section\'s business.' },

    // ================================================================
    // 3. THE OPERATING SYSTEM: FIVE VISIBLE JOBS
    // ================================================================
    { kind: 'heading', text: 'The Operating System: Five Visible Jobs' },
    { kind: 'para', text: 'The operating system is the manager layer\'s head - the one program that is running from the moment you switch the machine on to the moment you switch it off, whether or not you ever open an application of your own. Chapter 4\'s box is a general-purpose machine: it will run whatever recipe it is given. The OS is the recipe-holder that decides, every instant, which recipe the worker actually follows, where each recipe\'s ingredients live, and what the worker may touch. Everything else in this lesson - utilities, drivers, even the firmware\'s handoff - exists to serve or feed the operating system.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — operating system', text: 'An **operating system** (OS) is said to be the system software that manages the machine\'s resources - the processor\'s time, the memory\'s addresses, the storage\'s names, the devices\' input and output - and provides the platform on which application software runs. Symbolically: the OS is the long-running program between the applications and the hardware, and every request an application makes of the machine is made THROUGH it.' },
    { kind: 'para', text: 'What does the manager actually DO all day? You can see the whole duty list from where you sit, and it has exactly 5 jobs - five, no more, and every one of them touches your daily experience of the machine. Walk the desk: (i) process management - who runs next on the processor; (ii) memory management - who owns which addresses of the warehouse; (iii) the file system - the names on the storage shelf, your documents as files and folders; (iv) device input/output through drivers - the machine\'s conversations with its keyboard, screen, printer and disk; and (v) the user interface - the shell, graphical or command-line, through which you talk to the whole arrangement. Five jobs, one desk: this lesson takes them in turn, at survey depth only, because each one owns a later doorstep.' },
    { kind: 'figure', caption: 'The manager\'s desk: five duty panels around the one kernel that serves them all - process management (who runs next), memory management (who owns which addresses), the file system (names on the storage shelf), device input/output through drivers, and the user interface, the shell. Five jobs, one desk; the shell is the face you talk to, the kernel the core that works.', svg: cf51DeskSvg() },
    { kind: 'table', caption: 'The five visible jobs of the operating system - the duty list worth carrying cold, with the daily evidence each one leaves on your screen.', head: ['The job', 'The one-line duty', 'Where you see it'], rows: [
      ['Process management', 'decide who runs next on the processor', 'many windows alive at once, none frozen'],
      ['Memory management', 'assign and guard addresses in the warehouse', 'programs that do not trample each other'],
      ['The file system', 'give the storage shelf names: files and folders', 'you save a document and find it again'],
      ['Device input/output', 'talk to every device through its driver', 'the printer prints; the Wi-Fi connects'],
      ['The user interface', 'be the shell: the GUI or the command line', 'everything you click or type reaches the OS'],
    ] },
    { kind: 'para', text: 'Job (i), process management, deserves its own paragraph because it carries this lesson\'s famous illusion. A **process** is a running program - an application (or a piece of the OS itself) that has been given a slice of the machine\'s attention. On any ordinary laptop or phone there are tens of processes alive at once, and yet chapter 4 told you the truth about the worker: a single processor core executes ONE instruction stream at a time. How can tens of programs be alive on a worker that does one thing at a time? The answer is the manager\'s cleverest routine, and it has a name you must learn to state honestly.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — multitasking', text: '**Multitasking** is said to be the illusion that many programs run at once, kept by rapidly switching one (or a few) core(s) between them. Symbolically: with $n$ processes and one core, each process receives a **time slice** of $s$ milliseconds in turn, and the switching is fast enough that the user experiences $n$ programs running together - even though at any single instant at most one (per core) is actually executing.' },
    { kind: 'para', text: 'The illusion deserves a price tag, and the price tag is this lesson\'s engine-pinned arithmetic - work it once here, slowly, because every part of it is examinable. Take the roundest honest numbers: slices of 10 ms, and 2 processes sharing one core. One full round of the ring takes $2 \\times 10\\,\\text{ms} = 20\\,\\text{ms}$, so the manager completes $1000 / 20 = 50$ rounds a second - the manager switches the core between the two 50 times a second. Each switch is a **context switch**: the core must save one process\'s working state and load the other\'s, and a fair modern estimate is that this costs about 1 μs. So the switching bill for a whole second is $50 \\times 1\\,\\mu\\text{s} = 50\\,\\mu\\text{s}$. And 50 μs out of a second\'s 1,000,000 μs is $50/1{,}000{,}000 = 0.005\\%$ of the wall clock. The illusion - two programs at once on a one-thing-at-a-time worker - costs five thousandths of one percent. The illusion is cheap.' },
    { kind: 'derivation', title: 'The price of the multitasking illusion', statement: 'With n processes sharing one core in slices of s milliseconds, and a context switch costing about c microseconds, compute the share of the wall clock the manager spends on pure switching overhead - for the pinned case of 2 processes, 10 ms slices and 1 μs switches.', steps: [
      { label: 'Write the round', formula: 'n \\times s = 2 \\times 10\\,\\text{ms} = 20\\,\\text{ms}', explanation: 'One full round of the ring gives each process one slice, so two processes at 10 ms complete a round in 20 ms.' },
      { label: 'Count the rounds in a second', formula: '\\frac{1000\\,\\text{ms}}{20\\,\\text{ms}} = 50', explanation: 'A second holds 1,000 ms, and each round eats 20 ms of it - so the manager hands the core round the ring 50 times a second.' },
      { label: 'Price each handover', formula: '50 \\times 1\\,\\mu\\text{s} = 50\\,\\mu\\text{s}', explanation: 'Every handover is a context switch - save one process\'s state, load the other\'s - priced at about 1 μs each.' },
      { label: 'Take the share of the wall clock', formula: '\\frac{50\\,\\mu\\text{s}}{1{,}000{,}000\\,\\mu\\text{s}} = 0.00005 = 0.005\\%', explanation: 'A second is a million microseconds; fifty of them spent switching is five thousandths of one percent. The other 999,950 μs run your programs.' },
    ], result: 'The multitasking illusion on the pinned numbers: $2 \\times 10 = 20$ ms a round, $1000/20 = 50$ switches a second, $50 \\times 1\\,\\mu\\text{s} = 50\\,\\mu\\text{s}$ of overhead a second - $0.005\\%$ of the wall clock.' },
    { kind: 'equation', latex: '\\text{switches per second} = \\frac{1000\\,\\text{ms}}{n \\times s} = \\frac{1000}{2 \\times 10} = 50 \\tag{1}', note: 'The switching count: n processes at s ms a slice complete a round every n x s ms, so a 1,000 ms second holds 1000/(n x s) rounds. The pinned case: 50 switches/s.' },
    { kind: 'equation', latex: '\\text{overhead fraction} = \\frac{c}{1000 \\cdot n \\cdot s} = \\frac{1}{1000 \\times 2 \\times 10} = \\frac{1}{20{,}000} = 0.005\\% \\tag{2}', note: 'The overhead law, with the switch cost c in microseconds and the slice s in milliseconds: the pinned case pays 1/20,000 of the wall clock. The derivation of this compact form is the theorem below.' },
    { kind: 'figure', caption: 'The time-slicing ribbon: one core handed between two processes in alternating 10 ms blocks, each handover marked by a switch tick costing about 1 μs. One round is 2 x 10 = 20 ms; the manager completes 1000/20 = 50 switches a second; each costs about 1 μs; the whole second pays 50 μs of overhead - 0.005% of the wall clock. Of every second\'s 1,000,000 microseconds, 999,950 run your programs.', svg: cf51RibbonSvg() },
    { kind: 'example', title: 'Illustration 1. The arithmetic of the illusion: two processes, 10 ms slices, 1 μs switches - compute the overhead to the percentage.', steps: [
      'Take the pinned numbers: 2 processes, slices of 10 ms, and a context switch costing about 1 μs.',
      'So, one round of the ring takes $2 \\times 10\\,\\text{ms} = 20\\,\\text{ms}$.',
      'Now, count the rounds: a 1,000 ms second holds $1000 / 20 = 50$ rounds - 50 switches a second.',
      'Price them: $50 \\times 1\\,\\mu\\text{s} = 50\\,\\mu\\text{s}$ of switching work in the whole second.',
      'Check the share: $50 / 1{,}000{,}000 = 0.00005 = 0.005\\%$ of the wall clock - and 999,950 μs of the second run the two programs.',
      'Hence the illusion costs 50 μs a second, which is 0.005% of the wall clock: the manager buys two-lives-at-once for five thousandths of one percent.',
    ] },
    { kind: 'example', title: 'Illustration 2. The dearer switch: re-run Illustration 1 with each context switch costing 5 μs instead of 1 μs.', steps: [
      'Take the changed number only: the switch cost $c = 5\\,\\mu\\text{s}$; the 2 processes and the 10 ms slices stand.',
      'So, the round is unchanged: $2 \\times 10 = 20$ ms, and the manager still completes $1000/20 = 50$ switches a second.',
      'Price them at the dearer rate: $50 \\times 5\\,\\mu\\text{s} = 250\\,\\mu\\text{s}$ of switching work per second.',
      'Check the share: $250 / 1{,}000{,}000 = 0.00025 = 0.025\\%$ of the wall clock.',
      'Hence even a switch five times dearer lifts the bill only from 50 μs to 250 μs - from 0.005% to 0.025% of the wall clock - the illusion still cheap.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the price of the illusion (the overhead law)', text: 'If $n$ processes share one core in slices of $s$ milliseconds, and each context switch costs about $c$ microseconds, then the share of the wall clock spent on pure switching overhead is $c / (1000 \\cdot n \\cdot s)$ - with $c$ in μs and $s$ in ms. Proof sketch, exactly as the derivation ran: a round lasts $n \\times s$ ms, so a 1,000 ms second holds $1000/(n s)$ rounds; each pays $c$ μs $= c/1000$ ms; the overhead is $\\frac{1000}{n s} \\times \\frac{c}{1000} = \\frac{c}{n s}$ ms per second, which as a fraction of the 1,000 ms second is $\\frac{c}{1000\\, n\\, s}$. The pinned case pays $1/(1000 \\times 2 \\times 10) = 1/20{,}000 = 0.005\\%$.' },
    { kind: 'para', text: 'The law reads off two honest consequences worth carrying. First, the overhead does not care how many programs you FEEL are running - only the slice length and the switch cost set the bill, so the manager can serve far more than 2 processes before any user would notice the paperwork. Second, the law has two levers and they trade: halve the slice (quicker response, more switches) and the overhead doubles; double the slice (lazier response, fewer switches) and it halves. On the pinned numbers that trade is almost free - which is exactly why multitasking became universal.' },
    { kind: 'example', title: 'Illustration 3. The honest doubling: what if you count one switch at every slice boundary rather than one per round?', steps: [
      'Take the same arrangement: 2 processes, 10 ms slices, 1 μs switches - but count a handover at EVERY slice boundary.',
      'So, a slice boundary arrives every 10 ms, which gives $1000/10 = 100$ switches a second - 100 switches where the round-counting view gives 50.',
      'Price them: $100 \\times 1\\,\\mu\\text{s} = 100\\,\\mu\\text{s}$ of every second.',
      'Check the share: $100 / 1{,}000{,}000 = 0.0001 = 0.01\\%$ of the wall clock.',
      'Hence even the doubled count pays only 0.01% - one hundredth of one percent - and the conclusion survives the counting convention: the illusion is cheap either way.',
    ] },
    { kind: 'para', text: 'The illusion\'s felt quality, though, is not only about the manager\'s paperwork - it is about each WORKER\'s wait. With 2 processes on 1 core, a process runs its 10 ms slice, waits out its partner\'s 10 ms, then runs again: each process gets a turn every 20 ms, which no human notices. Crowd the desk and the wait grows. Put 4 jobs on the 1 core, still with 10 ms slices: a job runs its 10 ms, then waits out the other three slices - $3 \\times 10 = 30$ ms between turns - before its next turn arrives at $4 \\times 10 = 40$ ms. Each job still gets $1000/40 = 25$ turns a second, so the machine still feels alive; but a job needing many turns in a hurry is now waiting three slices out of every four. That is the honest edge of the illusion: the manager never stops serving everyone, but each servant\'s share thins as the table fills.' },
    { kind: 'derivation', title: 'The waiting-time run for four jobs on one core', statement: 'Four jobs share one core in 10 ms slices. Compute how long each job waits between consecutive turns, how often its turns arrive, and check that the slices still fill the second exactly.', steps: [
      { label: 'Write the turn cycle', formula: '4 \\times 10\\,\\text{ms} = 40\\,\\text{ms}', explanation: 'A job\'s next turn comes only after all four jobs have taken one slice each, so the turn cycle is 40 ms.' },
      { label: 'Count the waiting part', formula: '(4 - 1) \\times 10\\,\\text{ms} = 30\\,\\text{ms}', explanation: 'Of the 40 ms cycle, 10 ms is the job\'s own slice; the other 3 slices - 30 ms - are its wait between turns.' },
      { label: 'Count the turns per second', formula: '\\frac{1000}{40} = 25', explanation: 'Each of the four jobs receives 25 turns a second, and each turn is one 10 ms slice.' },
      { label: 'Check the ledger closes', formula: '4 \\times 25 \\times 10\\,\\text{ms} = 1000\\,\\text{ms}', explanation: 'Four jobs at 25 slices of 10 ms each exactly fill the second - the manager\'s ledger balances to the millisecond.' },
    ], result: 'Four jobs on one core at 10 ms slices: each job waits $30$ ms between turns, its turns arrive every $40$ ms, and it receives $25$ turns a second.' },
    { kind: 'equation', latex: '\\text{wait between turns} = (n - 1) \\times s = 3 \\times 10\\,\\text{ms} = 30\\,\\text{ms} \\tag{3}', note: 'The felt side of the illusion: a job\'s wait between its own turns is the other n - 1 slices. Four jobs at 10 ms leave each waiting 30 ms between turns - still invisible to a user, but three slices of patience out of every four.' },
    { kind: 'para', text: 'Job (ii), memory management, keeps the warehouse honest. Chapter 4 gave you the address-based warehouse; this job of the OS decides which process owns which addresses, hands out room when a program is born, and reclaims it when the program ends - and, crucially, guards the doors so that no process may read or write another\'s room. The full theory of that guarding, and of the borrowing scheme called virtual memory, belongs to a later doorstep; what THIS lesson keeps is the census line: memory management is the OS\'s second job, and the daily evidence of it is that programs run side by side without trampling one another.' },
    { kind: 'para', text: 'Job (iii), the file system, is the names on the storage shelf. A disk, taken raw, is a vast numbered neighbourhood of bytes with no names at all; the file system is the OS\'s register that maps YOUR names - report.docx, Photos, chapter5 - onto those numbered addresses, keeps track of which stretches belong to which file, and polices the folders-within-folders arrangement you navigate every day. Chapter 7 of this course owns that register in full; here the census line is enough: the file system is the OS\'s third job, the difference between a shelf of numbers and a shelf of YOUR documents.' },
    { kind: 'para', text: 'Job (iv), device input/output, is the OS\'s conversation with every peripheral - and it is managed through a staff of specialist translators, the device drivers, so large and so load-bearing that this lesson gives them their own section later. The census line: the fourth job is to route every keystroke, every printed page, every network packet through the manager, so that no application ever speaks to a device directly. And job (v), the user interface, is the face of the whole arrangement: the shell.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — kernel and shell', text: 'The **kernel** of an operating system is said to be its core - the part that does the five jobs, running with the machine\'s fullest privileges and never absent while the machine is on. The **shell** is said to be the face - the program through which the user talks to the OS, of which there are two great kinds: the **graphical user interface** (GUI, windows and icons and pointing) and the **command-line interface** (a typed line of text answered by lines of text). Symbolically: you talk to the shell; the shell talks to the kernel; the kernel talks to the hardware - the four-layer stack worn inside the OS itself.' },
    { kind: 'para', text: 'The kernel/shell split explains an old puzzle you have certainly met: why an OS can have different faces on the same core. The same Linux kernel serves both a phone\'s touch interface and a server\'s bare typed prompt; macOS and Windows each let you open a command line inside their graphical world. The face is swappable because it is only the face - the five jobs are done by the kernel underneath, whoever is doing the talking. Walk one command through the whole arrangement and see the layers pass it hand to hand:' },
    { kind: 'algorithm', title: 'How one command walks from your fingers to the hardware', lines: [
      { code: 'the user types: open report.docx', note: 'the shell is the face - it reads the line (or the click) and parses it into a request' },
      { code: 'the shell asks the kernel: open this file', note: 'one boundary crossed: user-level program to kernel - the stack\'s rule at work' },
      { code: 'the kernel asks the file system: which addresses?', note: 'job (iii): the name report.docx is translated into numbered stretches of the shelf' },
      { code: 'the kernel grants memory: a process is born', note: 'jobs (i) and (ii): room in the warehouse is assigned and the program joins the ring of slices' },
      { code: 'the kernel queues the process: one 10 ms slice', note: 'job (i): the newcomer takes its turn in the round-robin like every other process' },
      { code: 'the kernel asks the driver: read these tracks', note: 'job (iv): the request is handed to the disk\'s own translator, which speaks the device\'s dialect' },
      { code: 'the device returns the bytes; the state climbs back up', note: 'the same layers, in reverse - driver to kernel to application to your screen' },
      { code: 'the shell reports: the document is open', note: 'the face closes the loop; the kernel never stopped serving everyone else meanwhile' },
    ], note: 'One command, five jobs, four layers - and notice how the multitasking ring never pauses: the 10 ms slices keep turning while your document opens.' },
    { kind: 'example', title: 'Illustration 4. A kernel/shell command walk, named layer by layer: who does what when you open a document.', steps: [
      'Take the command: open report.docx, typed at a command line (a shell) or clicked in a GUI (also a shell).',
      'So, the SHELL parses it - the face reads the request and hands it to the kernel: the user-facing boundary is crossed once.',
      'Now, the KERNEL works the five jobs: the file system finds the name\'s addresses (iii), memory management assigns the room (ii), process management enrols the reader in the ring (i).',
      'The device job (iv) routes the read through the disk\'s DRIVER - the translator that speaks the disk\'s private dialect.',
      'Hence the walk: shell parses, kernel serves, driver translates, device answers - four layers, five jobs, one opened document.',
    ] },
    { kind: 'para', text: 'Which operating systems should you be able to NAME? The honest answer is the ones you will actually meet, named without tribalism - no system in this list is being praised or blamed. **Windows** is the desktop incumbent of offices and homes; **macOS** is Apple\'s desktop system; **Linux** is the open kernel that runs most of the world\'s servers and, wearing Google\'s clothes as **Android**, most of the world\'s phones; **iOS** is Apple\'s phone system. Five names, one warning: all five are operating systems in exactly this lesson\'s sense - each one runs the machine, works the five jobs, and provides the platform. The differences among them are real but they are differences of policy, not of job description.' },
    { kind: 'para', text: 'One more honest paragraph before the staff sections, because the arithmetic above has a punchline students miss. The manager achieves everything - the five jobs, the illusion, the guarding - while spending, on its own paperwork, 50 μs out of every second: 0.005% of the wall clock on the pinned numbers. When a machine feels slow, the switching overhead is almost never the culprit; the felt slowness lives in waiting for the storage shelf or the network, waits chapter 4\'s census priced in nanoseconds to milliseconds. The manager is not a tax collector; the manager is a bargain.' },
    { kind: 'terms', items: [
      { term: 'operating system', def: 'the system software that manages the machine\'s resources and provides the platform for applications - the manager layer\'s head.' },
      { term: 'process', def: 'a running program, enrolled in the manager\'s ring of time slices.' },
      { term: 'time slice', def: 'the stretch of processor time a process receives per turn - 10 ms in this lesson\'s pinned arithmetic.' },
      { term: 'context switch', def: 'the act of saving one process\'s state and loading another\'s - about 1 μs on a modern core.' },
      { term: 'multitasking', def: 'the illusion that many programs run at once, kept by rapid switching of one (or few) core(s) between them.' },
      { term: 'kernel', def: 'the OS\'s core - the part that does the five jobs with fullest privileges.' },
      { term: 'shell', def: 'the OS\'s face - the GUI or command-line program through which the user talks to the kernel.' },
    ] },

    // ================================================================
    // 4. UTILITIES: THE SPECIALIST STAFF
    // ================================================================
    { kind: 'heading', text: 'Utilities: the Specialist Staff' },
    { kind: 'para', text: 'The operating system is one program with five jobs; around it works a small staff of one-task specialists - the utility programs. Where the OS runs the whole platform, a utility performs ONE housekeeping task for the machine and then gets out of the way. You rarely think about them, which is the measure of their success: the backup that ran overnight, the antivirus scan you scheduled and forgot, the disk tidy-up that made an old machine feel new. None of them does YOUR work; every one of them keeps the MACHINE\'s house - which is the census\'s reason for seating them on the system side of the line.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — utility software', text: '**Utility software** is said to be system software that performs one housekeeping task for the machine rather than running the whole platform. Symbolically: the OS is the many-job manager, a utility is a one-job specialist, and the family census seats both on the system side - the utility\'s work is the machine\'s house, not the user\'s own job.' },
    { kind: 'para', text: 'The census worth carrying has 6 utilities in it - six specialists you can name and match to their one-line jobs. (i) The **antivirus**: watches for, quarantines and removes malicious programs. (ii) **Backup**: keeps copies of your work so that a failure is an annoyance rather than a catastrophe. (iii) The **disk cleanup / defragmenter**: clears the clutter and gathers scattered file pieces together - on old spinning disks, a file\'s stretches could scatter across the platter, and gathering them made reading faster. (iv) **Compression**: shrinks files so they travel lighter - and here is a doorstep worth opening: this is the SAME craft chapter 3 taught you as lossless and lossy compression; the utility is simply that craft packaged as a one-task tool. (v) The **uninstaller**: removes an application cleanly, taking its scattered registry entries and leftover folders with it. (vi) The **task manager / monitor**: shows the running processes, their memory and their processor share - the ring of slices made visible - and lets you end the frozen one.' },
    { kind: 'table', caption: 'The six-utility census - the specialist staff of the manager layer, each with its one housekeeping task.', head: ['The utility', 'The one-line job', 'A task you would recognise'], rows: [
      ['Antivirus', 'find and quarantine malicious programs', 'a file is scanned and flagged before it runs'],
      ['Backup', 'keep copies of your work', 'yesterday\'s documents survive today\'s failure'],
      ['Disk cleanup / defragmenter', 'clear clutter; gather scattered pieces', 'an old machine feels quicker after a tidy-up'],
      ['Compression', 'shrink files to travel lighter', 'a folder is zipped to send over the network'],
      ['Uninstaller', 'remove applications cleanly', 'the app goes, and its leftovers go with it'],
      ['Task manager / monitor', 'show and manage running processes', 'the frozen program is found and ended'],
    ] },
    { kind: 'example', title: 'Illustration 5. The utilities-match run: six everyday tasks, each matched to the one utility that owns it.', steps: [
      'Take the six tasks: a file must be quarantined; a copy of yesterday\'s work must exist; scattered file pieces must be gathered; a folder must shrink to travel; an application must be removed whole; a frozen process must be found and ended.',
      'Match each to the census: quarantining an infected file is the ANTIVIRUS\'s one task.',
      'Keeping copies is BACKUP; gathering scattered pieces is the DISK CLEANUP / DEFRAGMENTER.',
      'Shrinking to travel is COMPRESSION - the same craft chapter 3 taught, lossless or lossy, packaged as a tool.',
      'Removing an application cleanly is the UNINSTALLER; showing and ending the frozen process is the TASK MANAGER / MONITOR.',
      'Hence six tasks, six utilities, one housekeeping task each - and none of them does the user\'s own job, which is why all six sit on the system side of the census.',
    ] },
    { kind: 'para', text: 'Two honest notes close the staff section. First, the census is a census of TASKS, not brand names - different operating systems ship different named tools for the same six jobs, and an exam answer should name the task, not the trademark. Second, the boundary between the OS and its utilities is a soft one: some systems fold the backup scheduler or the task manager into the OS proper, and the dividing line is the maker\'s packaging choice, not a law of nature. What is NOT soft is the family census: utilities are system software, doing the machine\'s house - a distinction the exam corner will ask you to defend.' },

    // ================================================================
    // 5. DEVICE DRIVERS: THE TRANSLATORS
    // ================================================================
    { kind: 'heading', text: 'Device Drivers: the Translators' },
    { kind: 'para', text: 'Return to the manager\'s deepest trick - hiding the hardware\'s dialect - and ask how it is actually done, device by device. The operating system speaks ONE standard dialect: a small, steady vocabulary of requests (open, read, write, close, and kin) that is the same whatever is fitted to the machine. But every DEVICE speaks its own private language: one printer\'s command set differs from another\'s, one graphics card understands a different vocabulary from its neighbour, and the raw dialect of a keyboard controller is nothing like the tidy requests an application makes. Between the one standard dialect and each private one stands a translator: the device driver.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — device driver', text: 'A **device driver** is said to be the program that translates between the operating system\'s standard calls and one device\'s private commands. Symbolically: the OS issues the same $\\text{open}, \\text{read}, \\text{write}, \\text{close}$ whatever the device; the driver converts each into the command sequence that THIS device actually understands, and converts the device\'s answers back - a two-way translator with exactly one client device.' },
    { kind: 'para', text: 'The census arithmetic of drivers is refreshingly blunt: one driver per device. A machine with 7 devices - say the keyboard, the mouse, the printer, the Wi-Fi adapter, the graphics card, the sound card and the disk drive - carries 7 drivers, each speaking for exactly one device. And because the driver translates from the OS\'s dialect, the count multiplies across operating systems: the same 7 devices served by 2 different operating systems need $2 \\times 7 = 14$ drivers, because each OS speaks a different standard dialect. This is why a device maker ships a disc of drivers with every product, and why the box lists which systems are supported - the list is a list of dialects the maker has translated for.' },
    { kind: 'example', title: 'Illustration 6. The seven-device driver census: count the translators, then recount for a second OS.', steps: [
      'Take the census: 7 devices fitted - keyboard, mouse, printer, Wi-Fi adapter, graphics card, sound card, disk drive.',
      'So, one translator per device: $7$ devices need $7$ drivers - the OS\'s one standard dialect on one side, seven private dialects on the other.',
      'Now, fit a second operating system: it speaks a DIFFERENT standard dialect, so it cannot reuse the first seven translators.',
      'Count again: $2 \\times 7 = 14$ drivers serve the same 7 devices across the two systems.',
      'Hence 7 devices mean 7 drivers under one OS and 14 under two - the census multiplies, which is why drivers ship with every device and list their supported systems.',
    ] },
    { kind: 'para', text: 'What, then, is plug-and-play - the experience of fitting a new device and having it simply work? Strip the marketing and two moves remain, both done by the OS. First, the PROBE: the manager interrogates the newly fitted device for its identity - every modern device carries a standard identity card of electronic registers that names its maker and model. Second, the MATCH: the OS looks in its driver store for the translator that matches that identity and loads it. When you read the screen message installing device driver software, you are watching the match being made. Plug-and-play is not magic; it is a good filing system meeting an honest identity card.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the classic symptom of a wrong or aged driver', text: 'Memorise the pairing, because it is the single most useful diagnostic sentence in this chapter: the machine SEES the device, but the device MISBEHAVES. If the OS had no driver at all, the device would be invisible - not fitted, not listed. Seeing-but-misbehaving - the printer that prints gibberish, the card that renders wrongly, the adapter that connects and drops - is the signature of a translator present but wrong: built for another model, or aged out of step with a newer OS. The remedy follows from the diagnosis: replace the translator - fetch the driver that matches BOTH the device\'s identity and the OS\'s dialect.' },
    { kind: 'para', text: 'The driver section also settles a classification question that traps the unwary: is a driver system software or application software? Apply the dividing question - who is the work for? The driver\'s work is the machine\'s own conversation with its parts; no user asked for it and no user\'s job is done by it. The driver sits on the system side, beside the OS it serves and the device it translates for. In the four-layer stack it lives inside the system software layer, right at the bottom edge where the dialects meet.' },
    { kind: 'terms', items: [
      { term: 'utility software', def: 'system software performing one housekeeping task for the machine - the six-specialist census.' },
      { term: 'device driver', def: 'the program translating between the OS\'s standard calls and one device\'s private commands.' },
      { term: 'plug-and-play', def: 'the OS probing a new device\'s identity and loading the matching driver - two moves, no magic.' },
      { term: 'defragmenter', def: 'the utility that gathers a file\'s scattered stretches together on the shelf - a spinning-disk craft.' },
    ] },

    // ================================================================
    // 6. FIRMWARE: SOFTWARE LIVING ON THE HARDWARE
    // ================================================================
    { kind: 'heading', text: 'Firmware: Software Living on the Hardware' },
    { kind: 'para', text: 'Close the loop now with the chip you met on 4.1\'s board - the one that speaks the machine\'s first waking words. Every device you own, from the laptop to the washing machine, holds a program that is ALREADY ON the hardware when it leaves the factory: not installed on the disk, not downloaded, but stored permanently on a chip inside the device itself. This is firmware, and its double nature is the reason the four-layer stack needed its honesty note: firmware is software by nature - it is instructions - and hardware by residence - it lives on a chip. It straddles the bottom two layers, belonging fully to neither.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — firmware', text: '**Firmware** is said to be software stored permanently on a chip inside the device. Symbolically: firmware is a program (instructions, the software family) whose physical home is a non-volatile chip (hardware), written rarely - at manufacture or by a careful update - and read every time the device wakes; ROM\'s modern home, as chapter 4\'s memory lesson told it.' },
    { kind: 'para', text: 'The firmware\'s most important moment is the one you have watched a thousand times without naming it: the boot. Switch the machine on and a fixed relay race begins, run by the firmware and finished by the operating system. The census of that race has exactly 5 stages - five, always in the same order, each one waking the next. Stage 1, POWER ON: the supply comes up, the clock starts, and the processor reaches for its first instruction - which sits, by design, in the firmware. Stage 2, the FIRMWARE POST: the power-on self-test, the inventory check - the firmware counts what is fitted, tests that the essentials answer, and refuses to go on if the machine is not whole. Stage 3, the BOOTLOADER: a small program, fetched from the storage shelf, whose one job is to find the operating system and start loading it. Stage 4, the OS KERNEL: the manager arrives, works its way up through the five jobs, and takes the machine over. Stage 5, the LOGIN PROMPT: the shell appears, and the four-layer stack is complete - you may now ask for work. Five stages, four handoffs, one direction of travel.' },
    { kind: 'figure', caption: 'The boot handoff: five stages left to right - power on (wake), firmware POST (the inventory check), bootloader (fetch), OS kernel (organise), login prompt (greet) - with four handoffs between five stations. Each stage wakes the next and hands over the machine, and only one order ever works.', svg: cf51BootSvg() },
    { kind: 'para', text: 'Count the honesty in that chain. The order is forced, not customary: no stage can run before the stage that hands it the machine - the POST cannot inventory parts before power exists, the bootloader cannot fetch what the POST has not certified, the kernel cannot organise what the bootloader has not fetched, and the login prompt IS the shell waiting on the kernel. Five stages give $5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$ possible orderings, of which exactly 1 boots the machine and 119 do nothing. When an exercise asks you to order the boot sequence, it is asking you to eliminate 119 wrong answers with one chain of reasoning.' },
    { kind: 'example', title: 'Illustration 7. The boot-order puzzle, solved: order the five stages and count the orderings that fail.', steps: [
      'Take the five stages shuffled: login prompt, firmware POST, power on, OS kernel, bootloader.',
      'So, ask of each stage: what must already exist before it can run? The POST needs power; the bootloader needs a certified machine; the kernel needs to be fetched; the login prompt needs the kernel.',
      'Now, the order falls out: power on first, then the firmware POST, then the bootloader, then the OS kernel, then the login prompt.',
      'Check the count: $5! = 120$ ways to order five stages, and exactly 1 of them boots - 119 orderings do nothing.',
      'Hence the honest boot order is power on, POST, bootloader, kernel, login - one working chain out of 120.',
    ] },
    { kind: 'para', text: 'One dated beat belongs here, told honestly. The firmware of the classic PC was the BIOS - the Basic Input/Output System, a name and a scheme born in the PC\'s early era - and its honest modern successor is the UEFI, the Unified Extensible Firmware Interface: a younger, more capable firmware that does the same five-stage duty list with room for bigger disks, faster starts and security checks at the handoff. This lesson pins no date to the succession and invents none; what it carries is the relationship - BIOS begat UEFI, the same job done by a newer tool, and both are firmware, software living on the hardware. When a setup screen calls itself UEFI on a machine whose menus say BIOS, you are watching one trade\'s generations, not two different things.' },
    { kind: 'para', text: 'Firmware also completes the system-family roster in a satisfying way. The system side of the census now holds: the operating system (the manager, five jobs), the utilities (six one-task specialists), the device drivers (one translator per device), and the firmware (the program that wakes the machine and hands it over). Four kinds of system software, one dividing question - the machine\'s house - and the worker family above them all, standing on the platform they together provide.' },
    { kind: 'terms', items: [
      { term: 'firmware', def: 'software stored permanently on a chip inside the device - the machine\'s first waking words.' },
      { term: 'boot', def: 'the five-stage relay from power on to login prompt, each stage waking the next.' },
      { term: 'POST', def: 'the power-on self-test - the firmware\'s inventory check of what is fitted before it trusts the machine to the OS.' },
      { term: 'bootloader', def: 'the small program that finds the operating system on the storage shelf and starts loading it.' },
      { term: 'BIOS', def: 'the classic PC firmware - Basic Input/Output System - whose honest modern successor is the UEFI.' },
      { term: 'UEFI', def: 'the Unified Extensible Firmware Interface - the modern firmware doing the BIOS\'s duty list with more room.' },
    ] },

    // ================================================================
    // 7. THE DATED BEATS, TOLD HONESTLY
    // ================================================================
    { kind: 'heading', text: 'The Dated Beats, Told Honestly' },
    { kind: 'para', text: 'The manager layer has a history worth carrying, and this lesson tells it in our own words - four dated beats, each honest about what it was and none pretending to be more. Software families did not spring fully formed from a laboratory: the census you learned in section 1 was built, stage by stage, by people solving problems nobody had named yet. The dates below are the web-verified ones this course carries; the retellings are ours.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the first operating system: GM-NAA I/O, 1956', text: 'The first operating system is usually credited as **GM-NAA I/O**, produced in **1956** for the **IBM 704** - and the honest, wonderful detail is who made it: not IBM, but the machine\'s users, at General Motors and North American Aviation (hence the name, GM-NAA). Our own retelling: the IBM 704 was a room-sized arithmetic engine whose programs arrived on cards and tapes, and running one meant a ritual of loading, rewinding and unloading that nobody wanted to do by hand. So the users wrote a program to do the housekeeping themselves - a supervisor that kept the machine busy on one job while the next was being prepared. That is the whole idea of an operating system in one sentence: a program that does the machine\'s housekeeping. The manager layer began as the users\' refusal to be the staff. (The claim \"first\" is the standard credit, and honest histories say so with that hedge: it is the earliest widely acknowledged example.)' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — UNIX, 1969, Bell Labs', text: 'In **1969**, at **Bell Labs**, Ken **Thompson** and Dennis **Ritchie** began the system that became **UNIX** - our own retelling: a small, spare system built by two people who wanted a comfortable place to write tools, on a machine nobody else wanted. Its genius was the philosophy, not any one invention: small programs, each doing one thing well, joined by pipes into whatever bigger tool you needed - the utility idea (section 4) as a way of life. The descendants of that system run most of the world\'s servers and, through Linux and Android, most of its phones: thirteen years after the users of the IBM 704 wrote their supervisor, the manager layer found its most successful dynasty. UNIX stands 13 years after GM-NAA I/O - and 2026 minus 1969 is 57 years from Bell Labs to this chapter.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the GUI lineage: Xerox Alto 1973, Apple Macintosh 1984', text: 'The graphical user interface has two dated landmarks. The **Xerox Alto**, of **1973**, was the first machine built around a bitmap screen, a mouse and windows - the GUI as a working research idea. The **Apple Macintosh**, of **1984**, was the GUI\'s first mass-market arrival - the face of the machine as pictures you point at, on ordinary desks. Between the two landmarks lie exactly 11 years: 1984 minus 1973 - research proving a face, then industry shipping it, with the Macintosh standing 15 years after UNIX (1984 minus 1969), the manager layer wearing its friendliest mask. The lineage is honest about borrowing: Apple saw the Alto\'s ideas at Xerox and built on them, a fact both firms stated openly - ideas travelled, as ideas do.' },
    { kind: 'table', caption: 'The four dated beats of the manager layer - the years this course carries, with each beat\'s one-line meaning. The gaps are arithmetic worth doing once: 13 years from the first OS to UNIX; 11 years between the GUI landmarks; 15 years from UNIX to the Macintosh; 70 years from GM-NAA I/O to this chapter, and 57 from UNIX.', head: ['The beat', 'The year', 'The one-line meaning'], rows: [
      ['GM-NAA I/O, for the IBM 704', '1956', 'the first operating system - the users\' own housekeeper'],
      ['UNIX, Bell Labs (Thompson and Ritchie)', '1969', 'the small tool-writing system whose descendants run most phones and servers'],
      ['Xerox Alto', '1973', 'the GUI as a working research idea: bitmap, mouse, windows'],
      ['Apple Macintosh', '1984', 'the GUI\'s mass-market arrival on ordinary desks'],
    ] },
    { kind: 'para', text: 'Do the gap arithmetic once, slowly, because exam papers love it and because it fixes the chronology in memory. From the first operating system to UNIX: $1969 - 1956 = 13$ years. Between the GUI landmarks: $1984 - 1973 = 11$ years. From UNIX to the Macintosh: $1984 - 1969 = 15$ years. From GM-NAA I/O to this chapter\'s present: $2026 - 1956 = 70$ years. From UNIX to the same present: $2026 - 1969 = 57$ years. Seventy years separate a room of cards and tapes tended by hand from the phone in your pocket running a UNIX descendant - and the four-layer stack, the two families and the five jobs were all present at both ends, which is why this census deserves its history.' },
    { kind: 'para', text: 'One honesty note to close the history, in the spirit this course keeps. The four beats above are landmarks, not the whole road: other systems mattered (the mainframe lineage IBM itself built after 1956, the many operating systems between UNIX and today), and the Alto-to-Macintosh story has its debated corners, which we state as debated rather than resolve. What the four dates give you is the SPINE of the story - housekeeping born, tools perfected, faces invented, faces shipped - and every date on that spine is carried exactly as verified.' },

    // ================================================================
    // 8. THE CLASSIFY-12 STARTER RUN
    // ================================================================
    { kind: 'heading', text: 'The Classify-12 Starter Run' },
    { kind: 'para', text: 'Nothing fixes a census like using it, so close the teaching of this lesson with the starter run the chapter\'s review will extend: twelve ordinary programs, each to be sorted into its family. The method never varies - ask the dividing question, who is the work for? - and the roster below is chosen to include every trap that has ever appeared in an examination of this topic: the antivirus (system, though it is sold in shops beside applications), the game (application, though it is heavy), the firmware (system, though it is invisible), and the spreadsheet (application, though offices run on it).' },
    { kind: 'example', title: 'Illustration 8. The classify-12 starter run: twelve programs, the dividing question asked of each.', steps: [
      'Take the twelve, five system-side and seven application-side, and ask of each: who is the work for?',
      'So, the SYSTEM side - the machine\'s house, five members: the operating system (runs the machine), a printer driver (translates for one device), an antivirus utility (the machine\'s health), a backup utility (the machine\'s copies), the UEFI firmware on the board (the machine\'s first waking words).',
      'Now, the APPLICATION side - the user\'s own job, seven members: a word processor (your documents), a web browser (your reading), a spreadsheet (your ledgers), a photo editor (your pictures), a game (your play), a media player (your listening), a video-call app (your talking).',
      'Check the traps: the antivirus is NOT application software - its work is the machine\'s house; the game is NOT system software - no machine depends on it to run.',
      'Hence twelve programs split 5 system-side and 7 application-side - and the same five system-side witnesses will meet you again in the chapter review.',
    ] },
    { kind: 'para', text: 'Notice what the run did NOT need: brand names, prices, sizes or speeds. The census is a census of work, and work sorts by one question. Carry that discipline into the quiz and the graded exercises below - and when an examiner swaps a named product you have never met into the roster, you will recognise it anyway, because the question never changes.' },

    // ================================================================
    // 9. THE DOORSTEPS, THE EXAM CORNER AND THE FORMULA SHEET
    // ================================================================
    { kind: 'heading', text: 'The Doorsteps, the Exam Corner and the Formula Sheet' },
    { kind: 'para', text: 'Two doorstep books stand around this lesson, and honesty means naming them instead of re-teaching their ground. Operating Systems - a book planned for this library\'s own shelf - owns the manager\'s full theory: the scheduling algorithms that decide who runs next (this lesson kept the honest round-robin picture), paging and virtual memory (chapter 4\'s lesson named it and left it closed), the file system\'s internal registers, and deadlocks. Computer Organization and Architecture owns the hardware door of the same arrangements: the privilege levels that let the kernel guard the doors, and the interrupt mechanism by which devices knock. This lesson keeps what neither doorstep carries: the visible census - the families, the layers, the five jobs, the staff, and the arithmetic of the illusion.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — how this lesson is asked', text: 'The census of this lesson is examination staple food, asked here in our own exam-style wording - never quoted from a real paper. Banking and SSC computer-awareness papers ask the short truths: which of these is system software (watch for the antivirus trap); the layer directly under applications (system software); examples of utility software (any of the six); what a device driver is (the translator between the OS\'s standard calls and one device\'s private commands); where firmware lives (on a chip in the device); and the boot sequence in order (power on, POST, bootloader, kernel, login). School boards ask the same census as classification exercises and short notes on OS functions - the five-job duty list answers every variant. Cambridge 9618 and A-level-style asks go one step further and want the arithmetic: why multitasking is an illusion, what a context switch costs, and how the overhead is computed - drill Illustration 1 until the 0.005% falls out by itself. Kernel against shell (the core against the face) completes the set - one line each, no more needed.' },
    { kind: 'formula', name: 'Switches per second', latex: '\\text{switches/s} = \\frac{1000\\,\\text{ms}}{n \\times s}', note: 'n processes at s ms a slice: the pinned case 1000/(2 x 10) = 50 switches/s.' },
    { kind: 'formula', name: 'Multitasking overhead fraction', latex: '\\text{overhead} = \\frac{c}{1000 \\cdot n \\cdot s}', note: 'c = switch cost in μs, s = slice in ms: the pinned case 1/(1000 x 2 x 10) = 0.005% of the wall clock.' },
    { kind: 'formula', name: 'Wait between turns', latex: '\\text{wait} = (n - 1) \\times s', note: 'a job\'s wait between its own turns is the other n - 1 slices: 4 jobs at 10 ms wait 30 ms.' },
    { kind: 'formula', name: 'The driver census', latex: '\\text{drivers} = \\text{systems} \\times \\text{devices}', note: 'one translator per device per OS dialect: 2 systems x 7 devices = 14 drivers.' },
    { kind: 'para', text: 'The lesson\'s rung is now done, and it is worth seeing whole: software defined as instructions for the box; the census sorted into 2 software families by one dividing question; the four-layer stack mapped with its neighbour rule and its honest firmware straddle; the manager\'s five jobs walked one by one; the multitasking illusion priced at 0.005% of the wall clock and its four-job patience run at 30 ms between turns; the six-utility staff named; the driver census taken at 7 and 14; the firmware\'s five-stage boot relay ordered against 119 failures; and the dated beats carried - 1956, 1969, 1973, 1984. The checkpoint quiz and the graded drill are yours; the engine that pins every number above stands behind them.' },

    { kind: 'quiz', title: 'Checkpoint quiz', items: [
      {
        q: 'Which of the following is system software?',
        options: [
          'a word processor',
          'the operating system',
          'a racing game',
          'a web browser',
        ],
        answer: 1,
        explain: 'Option B is system software: the operating system runs the machine and provides the platform the others stand on - the machine\'s house, not the user\'s job. Option A fails because a word processor does YOUR job of writing: application software, standing on the platform. Option C fails because a game, however heavy and clever, does the user\'s own work of playing: application software. Option D fails because a browser reads pages for you: your reading is your job, so it is application software standing on the platform like the rest.',
      },
      {
        q: 'In the four-layer stack, which layer sits directly under the application software?',
        options: [
          'system software',
          'the user',
          'the hardware',
          'the file system',
        ],
        answer: 0,
        explain: 'Option A is the stack\'s order: user, application software, system software, hardware - the manager layer is directly beneath the workers, hiding the hardware\'s dialect from them. Option B fails because the user sits at the TOP of the stack, above the applications, not beneath them. Option C fails because hardware is two layers down from the applications: the system software sits between them, and applications never speak to hardware directly. Option D fails because the file system is not a layer of the stack at all - it is one of the five JOBS the operating system does (the third), a duty of the system software layer.',
      },
      {
        q: 'Multitasking - the illusion that many programs run at once on one core - is actually kept by…',
        options: [
          'many programs physically sharing one core at the same instant',
          'each program owning its own core forever',
          'the user opening programs one at a time, very quickly',
          'rapidly switching one core between the programs in short time slices',
        ],
        answer: 3,
        explain: 'Option D is the mechanism: one core executes one instruction stream at a time, and the OS rapidly switches it between processes in 10 ms slices - 50 switches a second on the pinned numbers, costing about 0.005% of the wall clock. Option A fails because a single core CANNOT physically execute several streams at one instant; that is exactly what the illusion hides. Option B fails because cores are not handed out permanently - then only one program would ever run; the sharing is the whole point. Option C fails because the user is never part of the mechanism: the switching is the manager\'s work, done tens of times a second whether or not you touch anything.',
      },
      {
        q: 'A device driver translates between…',
        options: [
          'two different users sharing one printer',
          'the user and the application software',
          "the operating system's standard calls and one device's private commands",
          'two cores inside the processor',
        ],
        answer: 2,
        explain: 'Option C is the definition: the OS speaks one standard dialect (open, read, write, close) whatever is fitted, and the driver converts those calls into the private command set of its one device - a two-way translator with one client. Option A fails because users never appear in the translation; they talk to applications, and the driver works far below, inside the machine\'s house. Option B fails because the user-to-application conversation is the TOP boundary of the stack, not the driver\'s ground - the driver lives at the bottom edge of the system software. Option D fails because cores are not translated for; the driver\'s clients are the OS above and one device below, never two cores.',
      },
      {
        q: 'Where does firmware live?',
        options: [
          'on the hard disk, loaded afresh at each login',
          'on a chip inside the device, stored permanently',
          'in RAM, rewritten at every boot',
          'on the internet, downloaded on demand',
        ],
        answer: 1,
        explain: 'Option B is the definition: firmware is software stored permanently on a chip inside the device - written rarely (at manufacture or by a careful update) and read every time the device wakes; it straddles the bottom two layers of the stack, software by nature and hardware by residence. Option A fails because a program on the hard disk is ordinary installed software; firmware must be present before any disk can even be read - it IS the first waking words. Option C fails because RAM is volatile: contents vanish at power-off, and firmware must survive power-off to wake the machine - it lives on non-volatile silicon, not in RAM. Option D fails because a download needs an awake, networked machine; firmware is what makes the machine awake in the first place.',
      },
    ] },

    { kind: 'exercises', title: 'Graded exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'State the two-family census of software and the one dividing question that sorts every program into its family.',
            answer: 'Hence 2 software families, system and application, sorted by one question: who is the work for - the machine\'s house or the user\'s own job',
            solution: [
              'Split the question: it asks for the census first, then the dividing question.',
              'The census: exactly 2 software families - system software and application software.',
              'The dividing question: WHO is the work for? The machine\'s house (run it, feed it, keep it) puts the program on the system side; the user\'s own job puts it on the application side.',
              'Check the two definitions: system software runs the machine and provides the platform others stand on; application software does the user\'s own job.',
              'Hence 2 software families, system and application, sorted by one question: who is the work for - the machine\'s house or the user\'s own job.',
            ]
          },
          {
            q: 'Write the four-layer stack in order from top to bottom, state how many internal boundaries it has, and say which layer the applications never speak to directly.',
            answer: 'Hence the stack is user, application software, system software, hardware - 3 internal boundaries, and the applications never speak to the hardware directly',
            solution: [
              'Take the stack from the top: the user, then the application software, then the system software, then the hardware at the bottom.',
              'Count the boundaries: 4 layers have 4 - 1 = 3 internal boundaries, and every lawful conversation crosses one boundary at a time.',
              'So, each layer talks only to its neighbours - the user talks to applications, applications to system software, system software to hardware.',
              'Hence the stack is user, application software, system software, hardware - 3 internal boundaries, and the applications never speak to the hardware directly.',
            ]
          },
          {
            q: 'Name the five visible jobs of the operating system, one line each.',
            answer: 'Hence the duty list: process management, memory management, the file system, device input/output through drivers, and the user interface - the shell',
            solution: [
              'Take the manager\'s desk and read the five panels in order.',
              'Process management: who runs next on the processor - the ring of time slices.',
              'Memory management: who owns which addresses of the warehouse, with the doors guarded.',
              'The file system: names on the storage shelf - your documents as files and folders.',
              'Device input/output through drivers: the machine\'s conversations with every peripheral.',
              'The user interface: the shell - the GUI or the command line through which you talk to it all.',
              'Hence the duty list: process management, memory management, the file system, device input/output through drivers, and the user interface - the shell.',
            ]
          },
          {
            q: 'Match each task to the one utility that owns it: quarantining an infected file; keeping copies of yesterday\'s work; gathering scattered file pieces; shrinking a folder to travel; removing an application cleanly; finding and ending a frozen process.',
            answer: 'Hence the matches: antivirus, backup, disk cleanup / defragmenter, compression, uninstaller, task manager - six tasks, six utilities, as the wheel shows',
            solution: [
              'Take the six tasks one at a time and ask which specialist\'s one job it is.',
              'Quarantining an infected file is the ANTIVIRUS\'s one task; keeping copies of yesterday\'s work is BACKUP\'s.',
              'Gathering scattered file pieces is the DISK CLEANUP / DEFRAGMENTER; shrinking a folder to travel is COMPRESSION - the same craft chapter 3 taught.',
              'Removing an application cleanly is the UNINSTALLER; finding and ending a frozen process is the TASK MANAGER / MONITOR.',
              'Hence the matches: antivirus, backup, disk cleanup / defragmenter, compression, uninstaller, task manager - six tasks, six utilities, as the wheel shows.',
            ],
            figures: [{ caption: 'The utility family wheel: six one-task specialists around the hub - the machine keeps its own house.', svg: cf51SolWheelSvg() }],
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Two processes share one core in 10 ms slices, and each context switch costs about 1 μs. Compute the round length, the switches per second, the overhead per second, and the overhead as a percentage of the wall clock.',
            answer: 'Hence 20 ms a round, 50 switches/s, 50 μs of overhead a second - 0.005% of the wall clock, as the ledger shows',
            solution: [
              'Take the pinned numbers: 2 processes, 10 ms slices, 1 μs a switch.',
              'So, one round of the ring takes 2 x 10 = 20 ms.',
              'Now, count the rounds: a 1,000 ms second holds 1000/20 = 50 rounds - 50 switches a second.',
              'Price them: 50 x 1 μs = 50 μs of switching work per second.',
              'Check the share: 50 μs of a 1,000,000 μs second is 50/1,000,000 = 0.005% of the wall clock.',
              'Hence 20 ms a round, 50 switches/s, 50 μs of overhead a second - 0.005% of the wall clock, as the ledger shows.',
            ],
            figures: [{ caption: 'The switch ledger: fifty 1 μs ticks inside one second, one zoomed - and the re-run at 5 μs a switch.', svg: cf51SolLedgerSvg() }],
          },
          {
            q: 'Four jobs share one core in 10 ms slices. How long does each job wait between its turns, how often do its turns arrive, and how many turns does it get per second?',
            answer: 'Hence each job waits 30 ms between turns, its turns arrive every 40 ms, and it receives 25 turns a second',
            solution: [
              'Take the arrangement: 4 jobs, one core, 10 ms slices.',
              'So, a job\'s next turn comes only after all four slices: 4 x 10 = 40 ms is the turn cycle.',
              'Now, the waiting part: of that cycle, 10 ms is the job\'s own slice, so it waits out the other three - 3 x 10 = 30 ms between turns.',
              'Count the turns: 1000/40 = 25 turns per job per second.',
              'Check the ledger closes: 4 jobs x 25 slices x 10 ms = 1,000 ms exactly.',
              'Hence each job waits 30 ms between turns, its turns arrive every 40 ms, and it receives 25 turns a second.',
            ]
          },
          {
            q: 'A machine has 7 devices fitted. How many drivers does it carry under one operating system, and how many would the same 7 devices need across 2 operating systems? Why does the count multiply?',
            answer: 'Hence 7 devices need 7 drivers under one OS, and 2 x 7 = 14 across two - the census multiplies because each OS speaks a different standard dialect',
            solution: [
              'Take the census: 7 devices - keyboard, mouse, printer, Wi-Fi adapter, graphics card, sound card, disk drive.',
              'So, one translator per device: 7 drivers, each speaking for exactly one device - the diagram draws the two dialects.',
              'Now, fit a second operating system: it issues the same standard calls, but in ITS OWN dialect, so it cannot reuse the first seven translators.',
              'Count again: 2 x 7 = 14 drivers serve the same 7 devices across the two systems.',
              'Hence 7 devices need 7 drivers under one OS, and 2 x 7 = 14 across two - the census multiplies because each OS speaks a different standard dialect.',
            ],
            figures: [{ caption: 'One driver, two dialects: the OS side\'s standard calls against the device side\'s private commands, with the translator between.', svg: cf51SolDriverSvg() }],
          },
          {
            q: 'Define the kernel and the shell of an operating system, name the two faces the shell can wear, and say who talks to whom.',
            answer: 'Hence the kernel is the core doing the five jobs, the shell is the face - GUI or command line - and you talk to the shell, which talks to the kernel',
            solution: [
              'Split the pair: the kernel is defined by what it DOES, the shell by who it FACES.',
              'The kernel is the OS\'s core - the part that does the five jobs, with fullest privileges, never absent while the machine is on.',
              'The shell is the face - the program through which the user talks to the OS, in one of its two forms: the graphical user interface (windows and icons) or the command-line interface (typed lines).',
              'So, the talking order is fixed: you talk to the shell; the shell talks to the kernel; the kernel talks to the hardware.',
              'Hence the kernel is the core doing the five jobs, the shell is the face - GUI or command line - and you talk to the shell, which talks to the kernel.',
            ]
          },
          {
            q: 'Put the five boot stages in their honest order, and compute how many of the possible orderings actually boot the machine.',
            answer: 'Hence the order is power on, firmware POST, bootloader, OS kernel, login prompt - and of the 120 orderings of 5 stages, exactly 1 boots',
            solution: [
              'Take the five stages: power on, firmware POST, bootloader, OS kernel, login prompt.',
              'So, ask of each what must already exist: the POST needs power; the bootloader needs a certified machine; the kernel needs fetching; the login prompt needs the kernel.',
              'Now, the order falls out: power on, then POST, then the bootloader, then the OS kernel, then the login prompt - the scaffold shows the forced chain.',
              'Count the orderings: 5! = 5 x 4 x 3 x 2 x 1 = 120 ways to order five stages.',
              'Hence the order is power on, firmware POST, bootloader, OS kernel, login prompt - and of the 120 orderings of 5 stages, exactly 1 boots.',
            ],
            figures: [{ caption: 'The boot order solved: five numbered stations, one forced chain - and the count of orderings beneath.', svg: cf51SolBootSvg() }],
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'EXAM-STYLE. Classify the following twelve programs into the two software families, naming the family of each and the dividing question you applied: an operating system, a word processor, a printer driver, a web browser, an antivirus utility, a spreadsheet, a backup utility, a photo editor, the UEFI firmware on the board, a game, a media player, a video-call app.',
            answer: 'Hence the twelve split 5 system-side (the OS, the printer driver, the antivirus, the backup utility, the UEFI firmware) and 7 application-side (the word processor, browser, spreadsheet, photo editor, game, media player, video-call app), by the one dividing question: who is the work for',
            solution: [
              'Take the dividing question first - who is the work for? - and apply it to each of the twelve in turn.',
              'So, the machine\'s house, system side, five members: the operating system (runs the machine), the printer driver (translates for one device), the antivirus utility (the machine\'s health), the backup utility (the machine\'s copies), the UEFI firmware (the machine\'s first waking words).',
              'Now, the user\'s own job, application side, seven members: the word processor, the web browser, the spreadsheet, the photo editor, the game, the media player, the video-call app.',
              'Check the traps: the antivirus is system software despite sitting in shops beside applications; the game is application software despite its weight.',
              'Hence the twelve split 5 system-side (the OS, the printer driver, the antivirus, the backup utility, the UEFI firmware) and 7 application-side (the word processor, browser, spreadsheet, photo editor, game, media player, video-call app), by the one dividing question: who is the work for.',
            ]
          },
          {
            q: 'EXAM-STYLE. Re-run the overhead arithmetic of Illustration 1 with each context switch costing 5 μs instead of 1 μs, and also compute the honest doubled count in which a switch is counted at every slice boundary rather than once per round.',
            answer: 'Hence at 5 μs a switch the bill is 50 x 5 = 250 μs = 0.025% of the wall clock, and the doubled per-slice count is 100 switches/s = 100 μs = 0.01% - cheap either way',
            solution: [
              'Take the unchanged frame: 2 processes, 10 ms slices - so the round is still 2 x 10 = 20 ms and the rounds still number 1000/20 = 50 a second.',
              'So, at the dearer switch: 50 x 5 μs = 250 μs of every second, which is 250/1,000,000 = 0.025% of the wall clock.',
              'Now, the doubled count: a slice boundary arrives every 10 ms, giving 1000/10 = 100 switches a second.',
              'Price the doubled count at 1 μs: 100 x 1 μs = 100 μs of every second, which is 100/1,000,000 = 0.01% of the wall clock.',
              'Hence at 5 μs a switch the bill is 50 x 5 = 250 μs = 0.025% of the wall clock, and the doubled per-slice count is 100 switches/s = 100 μs = 0.01% - cheap either way.',
            ]
          },
          {
            q: 'Explain, with the four-layer stack in view, why firmware is said to straddle the bottom two layers - and say what divides firmware from ordinary installed software.',
            answer: 'Hence firmware is software by nature (instructions) and hardware by residence (a chip), so it straddles the system software and hardware layers - and unlike installed software it is stored permanently on the chip, present before any disk can be read',
            solution: [
              'Take the two claims in firmware\'s definition separately: it is a program, and its home is a chip inside the device.',
              'So, as a program it is instructions - the software family, doing the machine\'s house: the system software layer claims it.',
              'Now, as a resident of a physical chip it lives on the hardware - the hardware layer claims it too.',
              'Hence it straddles the bottom two layers of the stack, belonging fully to neither - the stack is a model, not a fence, as the diagram shows.',
              'And the division from installed software: installed programs sit on the disk and are loaded by a working machine, but firmware is stored permanently on the chip and must be present BEFORE any disk can be read - it is the machine\'s first waking words.',
              'Hence firmware is software by nature (instructions) and hardware by residence (a chip), so it straddles the system software and hardware layers - and unlike installed software it is stored permanently on the chip, present before any disk can be read.',
            ],
            figures: [{ caption: 'Firmware as the straddler: a program (instructions) whose home is a chip - crossing the boundary between the system software and hardware layers.', svg: cf51SolFirmwareSvg() }],
          },
          {
            q: 'EXAM-STYLE. Using the four dated beats - GM-NAA I/O 1956, UNIX 1969, Xerox Alto 1973, Apple Macintosh 1984 - compute: the gap from the first operating system to UNIX; the gap between the two GUI landmarks; the gap from UNIX to the Macintosh; and the spans from GM-NAA I/O and from UNIX to this chapter\'s year, 2026.',
            answer: 'Hence the gaps are 13 years (1956 to 1969), 11 years (1973 to 1984), 15 years (1969 to 1984), and the spans to 2026 are 70 years from GM-NAA I/O and 57 years from UNIX',
            solution: [
              'Take the four pinned years in order: 1956, 1969, 1973, 1984.',
              'So, from the first OS to UNIX: 1969 - 1956 = 13 years.',
              'Now, the GUI landmarks: 1984 - 1973 = 11 years between the Xerox Alto and the Apple Macintosh.',
              'And from UNIX to the Macintosh: 1984 - 1969 = 15 years.',
              'Check the spans to the present: 2026 - 1956 = 70 years from GM-NAA I/O, and 2026 - 1969 = 57 years from UNIX.',
              'Hence the gaps are 13 years (1956 to 1969), 11 years (1973 to 1984), 15 years (1969 to 1984), and the spans to 2026 are 70 years from GM-NAA I/O and 57 years from UNIX.',
            ]
          },
          {
            q: 'The overhead law says the switching share of the wall clock is c/(1000 x n x s), with the switch cost c in microseconds and the slice s in milliseconds. Verify it on the pinned case (2 processes, 10 ms slices, 1 μs switches), then use it to predict the overhead when the slices shrink to 5 ms, and check your prediction by direct arithmetic.',
            answer: 'Hence the law gives 1/20,000 = 0.005% on the pinned case, predicts 1/10,000 = 0.01% at 5 ms slices, and the direct check agrees: 10 ms round, 100 switches/s, 100 μs, 0.01%',
            solution: [
              'Take the law and the pinned case: c = 1, n = 2, s = 10.',
              'So, the law gives 1/(1000 x 2 x 10) = 1/20,000 = 0.00005 = 0.005% - the lesson\'s pinned figure.',
              'Now, shrink the slices to s = 5: the law predicts 1/(1000 x 2 x 5) = 1/10,000 = 0.01% - the overhead DOUBLES when the slice halves.',
              'Check by direct arithmetic: at 5 ms slices the round is 2 x 5 = 10 ms, so a second holds 1000/10 = 100 switches, costing 100 x 1 μs = 100 μs, which is 100/1,000,000 = 0.01%.',
              'Hence the law gives 1/20,000 = 0.005% on the pinned case, predicts 1/10,000 = 0.01% at 5 ms slices, and the direct check agrees: 10 ms round, 100 switches/s, 100 μs, 0.01%.',
            ]
          },
          {
            q: 'A friend fits a new printer: the machine lists it as present and installed, but every page prints as gibberish. Name the two moves plug-and-play actually made, state which of them succeeded and which failed, and give the remedy.',
            answer: 'Hence plug-and-play probed the identity and loaded a driver - the probe and match both ran, but the matched translator is wrong or aged, so the remedy is to install the driver that matches both the printer and this OS',
            solution: [
              'Take the symptom pair precisely: the machine SEES the device (it is listed) but the device MISBEHAVES (gibberish).',
              'So, recall the two moves of plug-and-play: the OS PROBES the device\'s identity from its electronic identity card, then loads the MATCHING driver from its store.',
              'Now, diagnose: the listing proves the probe ran and a driver was loaded - so the failure is in the TRANSLATOR itself: present but wrong, built for another model or aged out of step with this OS.',
              'Hence both moves of plug-and-play ran (probe, then match) but the match was to a wrong or aged translator, and the remedy is to install the driver that matches BOTH the printer\'s identity and this OS\'s dialect.',
              'Hence plug-and-play probed the identity and loaded a driver - the probe and match both ran, but the matched translator is wrong or aged, so the remedy is to install the driver that matches both the printer and this OS.',
            ]
          },
        ],
      },
    ] },
  ],
}
