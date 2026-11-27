import type { Chapter, Lesson } from '../../../types'

/**
 * Computer Fundamentals — chapter 5 "Software Families" (CLOSED COMPLETE
 * by the CS RUN 10 swarm, 2026-11-28, under the whole-chapter cadence:
 * all four seats shipped whole in one fire — 5.1 'System Software: the
 * Manager Layer' (V-CF51 129/129, 12,689 words), 5.2 'Application
 * Software: the Worker Families' (V-CF52 111/111, 9,911 words), 5.3
 * 'Installing, Updating and Licensing Honestly' (V-CF53 136/136, 11,041
 * words — the seat that hit the context wall at ~70% and was salvaged
 * in-run by the orchestrator per the amendment-5 precise-defect-list
 * shape), 5.R 'Unit 5 Completion Review' (V-CF5R 118/118, 9,304 words).
 * 42,945 chapter words; 13 body + 21 solution figures; quiz keys
 * [1,0,3,2,1] / [2,3,0,1,3] / [0,2,1,3,2] / [3,1,2,0,1] pairwise distinct.
 *
 * PROVENANCE: ground = the sanctioned internet fallback (the Drive
 * holds no Computer Fundamentals source — the standing honest note in
 * docs/research/CS_TOC_SURVEY.md): the ch.5 web-ground pins banked under
 * citation key `cs-cf-web-ground-ch05`, docs/project/SOURCE_LOG.md.
 * STUDY-NEVER-REPRODUCE absolute: every roster, witness, figure,
 * Illustration, quiz item and exercise below is OUR OWN, engine-pinned
 * in scripts/verify-cs-book2-ch05.ts (which re-runs the four
 * verify-first harnesses against THIS file and closes with the
 * closed-chapter census).
 */
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
      s.push(`<rect x="${p.x + 66}" y="86" width="100" height="62" fill="${c52.white}" stroke="${c52.ink}" stroke-width="2"/>`)
      s.push(`<rect x="${p.x + 101}" y="148" width="30" height="10" fill="${c52.paper}" stroke="${c52.ink}" stroke-width="1.5"/>`)
      s.push(`<line x1="${p.x + 81}" y1="162" x2="${p.x + 151}" y2="162" stroke="${c52.ink}" stroke-width="2.5"/>`)
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
      s.push(`<rect x="${p.x + 86}" y="84" width="60" height="96" rx="8" fill="${c52.white}" stroke="${c52.ink}" stroke-width="2"/>`)
      s.push(`<rect x="${p.x + 92}" y="94" width="48" height="70" fill="${c52.paper}" stroke="${c52.faint}" stroke-width="1.5"/>`)
      s.push(`<circle cx="${p.x + 116}" cy="172" r="4" fill="${c52.white}" stroke="${c52.ink}" stroke-width="1.5"/>`)
      s.push(cf52T(p.x + 116, 132, 9.5, c52.tealInk, 'middle', 'a worker in your pocket'))
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

/**
 * part-cf53.ts — CS RUN 9 seat cf53 (the LIBRARY lesson).
 *
 * Lesson 5.3 'Installing, Updating and Licensing Honestly' of Computer
 * Fundamentals chapter 5 'Software Families'. The craft of software
 * ownership told honestly: the install census (5 steps - copy, register,
 * associate, settings, driver-or-service), the 3 ways to bring software
 * home (installer wizard, store/package manager, portable), the three
 * honest reasons makers keep knocking (bugs, security, features),
 * semantic versioning brute-forced (2.4.1 -> 2.4.2 bug fix / 2.5.0
 * feature / 3.0.0 breaking; the anti-decimal branch 1.9.9 -> 1.10.0 and
 * the honest patch 1.9.10; the patch ladder 2.4.1..2.4.5 = 4 releases),
 * update against upgrade, the EOL ledger (Windows XP support ended
 * 8 April 2014 after 13 years; Windows 10 ended 14 October 2025 after
 * 10 years; 4,207 days between the two ends), the uninstall leftovers
 * census (settings, caches, file associations), the licensing centre
 * (6 families; the four freedoms; GNU announced 1983, FSF 1985, Linux
 * announced 1991 - 8 years after GNU; App Store 2008 with about 500
 * apps), the subscription arithmetic (120 a year against 3,000
 * perpetual = 25 years to parity), the 30-day trial (day 31 needs the
 * licence), the per-seat grant (1 licence on 3 machines = 2 beyond),
 * the EULA read honestly, and the piracy line. Package-management
 * internals ride 'Operating Systems'; the law of licences is a
 * profession - this lesson teaches reader-level literacy, not legal
 * advice.
 *
 * Every number printed here is pinned green by v-cf53.ts (78 engine
 * checks ran GREEN before this prose was written; the pin block closes
 * the ring). All figures are self-contained computed SVGs in the house
 * palette; every geometry constant is derived, never eyeballed.
 * Study-never-reproduce: every roster, witness, figure, Illustration,
 * quiz item and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const c53 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f53 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order (x, y, weight, size,
   fill, anchor) so the engine's clip audit can parse every label */
function cf53T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* an arrow along +x: shaft then head (computed, never eyeballed) */
function cf53ArrowH(x1: number, x2: number, y: number, stroke: string, dash = false): string {
  const hx = x2 - 8
  return `<line x1="${x1}" y1="${y}" x2="${hx}" y2="${y}" stroke="${stroke}" stroke-width="2"${dash ? ' stroke-dasharray="5 4"' : ''}/>` +
    `<polygon points="${hx},${y - 4} ${hx},${y + 4} ${x2},${y}" fill="${stroke}"/>`
}


/* ================================================================== */
/* SOLUTION FIGURE — the seat-count walk: 1 granted seat, 3 machines  */
/* ================================================================== */
function cf53SolSeatSvg(): string {
  const W = 760
  const H = 300
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f53}" role="img" aria-label="The seat-count walk: one granted seat shown as a permission frame around the first of three running machines, with the second and third machines standing beyond the frame and the overage counted as three minus one equals two. Beneath, the two honest exits: buy the seats you run, or thin the fleet to the grant.">`)
  s.push(cf53T(W / 2, 26, 12, c53.teal, 'middle', 'ONE SEAT, THREE MACHINES - THE OVERAGE WALK', true))
  // the permission frame around machine 1
  s.push(`<rect x="60" y="56" width="200" height="140" rx="10" fill="${c53.panelA}" stroke="${c53.struct}" stroke-width="2.4"/>`)
  s.push(cf53T(160, 78, 10.5, c53.ink, 'middle', 'the granted seat (s = 1)', true))
  // machine 1 inside
  s.push(`<rect x="100" y="100" width="120" height="64" rx="6" fill="${c53.white}" stroke="${c53.teal}" stroke-width="2"/>`)
  s.push(cf53T(160, 126, 10, c53.tealInk, 'middle', 'machine 1', true))
  s.push(cf53T(160, 144, 9, c53.tealInk, 'middle', 'inside the grant'))
  // machines 2 and 3 beyond
  s.push(`<rect x="300" y="100" width="120" height="64" rx="6" fill="${c53.white}" stroke="${c53.warn}" stroke-width="2"/>`)
  s.push(cf53T(360, 126, 10, c53.warn, 'middle', 'machine 2', true))
  s.push(cf53T(360, 144, 9, c53.warn, 'middle', 'beyond the grant'))
  s.push(`<rect x="450" y="100" width="120" height="64" rx="6" fill="${c53.white}" stroke="${c53.warn}" stroke-width="2"/>`)
  s.push(cf53T(510, 126, 10, c53.warn, 'middle', 'machine 3', true))
  s.push(cf53T(510, 144, 9, c53.warn, 'middle', 'beyond the grant'))
  // the overage equation
  s.push(cf53T(640, 120, 11, c53.ink, 'middle', 'm - s', true))
  s.push(cf53T(640, 138, 11, c53.ink, 'middle', '= 3 - 1'))
  s.push(cf53T(640, 158, 13, c53.accent, 'middle', '= 2', true))
  s.push(cf53T(640, 176, 9, c53.tealInk, 'middle', 'beyond the grant'))
  // the honest exits panel
  s.push(`<rect x="16" y="216" width="${W - 32}" height="66" rx="8" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 240, 10, c53.ink, 'middle', 'the honest exits', true))
  s.push(cf53T(W / 2, 258, 9.5, c53.tealInk, 'middle', 'buy the seats you run (two more) - or thin the fleet to the grant (one machine)'))
  s.push(cf53T(W / 2, 274, 9.5, c53.tealInk, 'middle', 'the overage is arithmetic, not drama: make the count agree with the grant'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 1 — the install census drawn as the contract it is:    */
/* five marks on a document the program and the OS both sign          */
/* ================================================================== */
function cf53InstallSvg(): string {
  const W = 760
  const H = 400
  const steps = [
    '(i) copy the program files to their home folder',
    '(ii) register with the OS - shortcuts and menu entries',
    '(iii) claim the file associations - which program opens which kind',
    '(iv) write the settings - so your choices survive the next launch',
    '(v) sometimes add a driver or a background service',
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f53}" role="img" aria-label="The install census drawn as a contract. A document panel titled The Install Contract lists the five steps in roman order: copy the program files to their home folder; register with the operating system with shortcuts and menu entries; claim the file associations saying which program opens which kind of file; write the settings so choices survive the next launch; and sometimes add a driver or a background service, the last marked as occasional. Beneath the list two signature lines are signed by the program through its installer and by the operating system in its ledger. A strip beneath states the census in one line and notes that uninstalling honestly means walking the same list backwards.">`)
  s.push(cf53T(W / 2, 30, 12, c53.teal, 'middle', 'THE INSTALL CENSUS - A CONTRACT, NOT A COPY', true))
  s.push(cf53T(W / 2, 48, 9.5, c53.tealInk, 'middle', 'copying is only the first mark - the other four are entries in the operating system\u2019s books'))
  s.push(`<rect x="90" y="64" width="580" height="254" rx="10" fill="${c53.paper}" stroke="${c53.struct}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 88, 11, c53.ink, 'middle', 'THE INSTALL CONTRACT', true))
  steps.forEach((t, k) => {
    const top = 100 + k * 38
    const last = k === 4
    s.push(`<rect x="120" y="${top}" width="520" height="30" rx="6" fill="${last ? c53.panelB : c53.white}" stroke="${last ? c53.conn : c53.struct}" stroke-width="1.6"${last ? ' stroke-dasharray="6 4"' : ''}/>`)
    s.push(cf53T(380, top + 20, 9.5, c53.ink, 'middle', t))
  })
  s.push(`<line x1="140" y1="300" x2="310" y2="300" stroke="${c53.ink}" stroke-width="1.6"/>`)
  s.push(`<line x1="450" y1="300" x2="620" y2="300" stroke="${c53.ink}" stroke-width="1.6"/>`)
  s.push(cf53T(225, 313, 9, c53.tealInk, 'middle', 'the program, through its installer'))
  s.push(cf53T(535, 313, 9, c53.tealInk, 'middle', 'the operating system, in its ledger'))
  s.push(cf53T(W / 2, 336, 9.5, c53.tealInk, 'middle', 'both sides keep a copy: the program ships an uninstaller, the OS keeps the ledger entries'))
  s.push(`<rect x="16" y="348" width="${W - 32}" height="42" rx="8" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 364, 10, c53.ink, 'middle', 'the census: files copied, registration written, associations claimed, settings stored'))
  s.push(cf53T(W / 2, 382, 9.5, c53.tealInk, 'middle', 'uninstalling honestly means walking this same list backwards - the leftovers are what the walk misses'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 2 — the six licence families on one street of doors    */
/* (computed layout, one palette per family)                          */
/* ================================================================== */
function cf53StreetSvg(): string {
  const W = 760
  const H = 430
  const fams = [
    { roman: '(i)', name: ['proprietary'], cap1: 'pay for permission', cap2: 'source stays closed', fill: c53.white, stroke: c53.accent },
    { roman: '(ii)', name: ['freeware'], cap1: 'free of charge', cap2: 'source still closed', fill: c53.paper, stroke: c53.teal },
    { roman: '(iii)', name: ['shareware'], cap1: 'try free, then pay', cap2: 'pay on day 31', fill: c53.panelB, stroke: c53.conn },
    { roman: '(iv)', name: ['free and open', 'source'], cap1: 'the four freedoms', cap2: 'source comes along', fill: c53.panelA, stroke: c53.struct },
    { roman: '(v)', name: ['public domain'], cap1: 'no rights reserved', cap2: 'rare, honestly', fill: c53.white, stroke: c53.ink },
    { roman: '(vi)', name: ['subscription'], cap1: 'rent by the month', cap2: 'stop paying, stop', fill: c53.panelB, stroke: c53.warn },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f53}" role="img" aria-label="The six licence families as six doors on one street. Door one, proprietary: pay for permission, source stays closed. Door two, freeware: free of charge, source still closed. Door three, shareware: try free then pay, and day 31 needs payment. Door four, free and open source: the four freedoms, and the source comes along. Door five, public domain: no rights reserved, rare and honestly so. Door six, subscription: rent by the month, and when you stop paying you stop. A strip beneath carries the census: what you pay, whether the source opens, what you may do.">`)
  s.push(cf53T(W / 2, 30, 12, c53.teal, 'middle', 'SIX LICENCE FAMILIES - ONE STREET OF DOORS', true))
  s.push(cf53T(W / 2, 48, 9.5, c53.tealInk, 'middle', 'what each door sells: the permission, the source, and the price of staying'))
  fams.forEach((fam, k) => {
    const cx = 80 + 120 * k
    s.push(cf53T(cx, 76, 9, c53.tealInk, 'middle', fam.roman))
    s.push(cf53T(cx, 100, 10, c53.ink, 'middle', fam.name[0], true))
    if (fam.name[1]) s.push(cf53T(cx, 115, 10, c53.ink, 'middle', fam.name[1], true))
    s.push(`<rect x="${cx - 28}" y="150" width="56" height="96" rx="4" fill="${fam.fill}" stroke="${fam.stroke}" stroke-width="2"/>`)
    s.push(`<circle cx="${cx + 14}" cy="202" r="4" fill="${fam.stroke}"/>`)
    s.push(cf53T(cx, 272, 9, c53.tealInk, 'middle', fam.cap1))
    s.push(cf53T(cx, 287, 9, c53.tealInk, 'middle', fam.cap2))
  })
  s.push(`<line x1="20" y1="246" x2="740" y2="246" stroke="${c53.ink}" stroke-width="2"/>`)
  s.push(`<rect x="16" y="340" width="${W - 32}" height="64" rx="8" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 360, 10, c53.ink, 'middle', 'six doors, one census: what you pay, whether the source opens, what you may do'))
  s.push(cf53T(W / 2, 378, 9.5, c53.tealInk, 'middle', 'freeware is free of charge; only door four grants the four freedoms'))
  s.push(cf53T(W / 2, 394, 9.5, c53.tealInk, 'middle', 'the trial, the seat count and the years of rent are all terms of the permission'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE 3 — the version ladder: 2.4.1 -> 2.4.2 -> 2.5.0 ->     */
/* 3.0.0 with the reason tagged at each rung, the 1.9.9 -> 1.10.0     */
/* anti-decimal branch, and the patch ladder to 2.4.5                 */
/* ================================================================== */
function cf53LadderSvg(): string {
  const W = 760
  const H = 420
  const chain = ['2.4.1', '2.4.2', '2.5.0', '3.0.0']
  const tags = [
    { reason: '+ bug fix', field: 'PATCH +1' },
    { reason: '+ new feature', field: 'MINOR +1, PATCH 0' },
    { reason: '+ breaking change', field: 'MAJOR +1, both 0' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f53}" role="img" aria-label="The version ladder of semantic versioning. The main chain runs 2.4.1 to 2.4.2 tagged plus bug fix moving PATCH up one, then to 2.5.0 tagged plus new feature moving MINOR up one with PATCH reset, then to 3.0.0 tagged plus breaking change moving MAJOR up one with both reset. Below, the anti-decimal warning panel: from 1.9.9 a new feature gives 1.10.0 with MINOR up one, and a crossed-out ghost box rejects 2.0.0 because a feature is not a breaking change. Beneath, the patch ladder from 2.4.1 through 2.4.2, 2.4.3 and 2.4.4 to 2.4.5, four releases. The strip at the bottom separates update from upgrade: an update stays inside the MAJOR line, an upgrade crosses to a new MAJOR.">`)
  s.push(cf53T(W / 2, 30, 12, c53.teal, 'middle', 'THE VERSION LADDER - SEMVER READ HONESTLY', true))
  s.push(cf53T(W / 2, 48, 9.5, c53.tealInk, 'middle', 'MAJOR.MINOR.PATCH - three fields, each counting on its own'))
  chain.forEach((v, k) => {
    const x = 60 + 175 * k
    s.push(`<rect x="${x}" y="76" width="110" height="44" rx="7" fill="${k === 0 ? c53.paper : c53.white}" stroke="${k === 0 ? c53.ink : c53.struct}" stroke-width="2"/>`)
    s.push(cf53T(x + 55, 105, 12, c53.ink, 'middle', v, true))
  })
  tags.forEach((t, k) => {
    const x1 = 60 + 175 * k + 112
    const x2 = 60 + 175 * (k + 1) - 2
    const mid = (x1 + x2) / 2
    s.push(cf53ArrowH(x1, x2, 98, c53.conn))
    s.push(cf53T(mid, 70, 9, c53.conn, 'middle', t.reason))
    s.push(cf53T(mid, 136, 9, c53.tealInk, 'middle', t.field))
  })
  s.push(`<rect x="40" y="168" width="680" height="136" rx="10" fill="${c53.panelB}" stroke="${c53.warn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 190, 11, c53.warn, 'middle', 'THE ANTI-DECIMAL WARNING - THE FIELDS ARE NOT DECIMALS', true))
  s.push(`<rect x="90" y="214" width="100" height="40" rx="6" fill="${c53.white}" stroke="${c53.struct}" stroke-width="2"/>`)
  s.push(cf53T(140, 239, 11, c53.ink, 'middle', '1.9.9', true))
  s.push(cf53ArrowH(194, 286, 234, c53.conn))
  s.push(cf53T(240, 208, 9, c53.conn, 'middle', '+ new feature'))
  s.push(`<rect x="290" y="214" width="110" height="40" rx="6" fill="${c53.white}" stroke="${c53.struct}" stroke-width="2"/>`)
  s.push(cf53T(345, 239, 11, c53.ink, 'middle', '1.10.0', true))
  s.push(cf53ArrowH(404, 516, 234, c53.warn, true))
  s.push(`<rect x="520" y="214" width="100" height="40" rx="6" fill="${c53.white}" stroke="${c53.warn}" stroke-width="2" stroke-dasharray="6 4"/>`)
  s.push(cf53T(570, 239, 11, c53.warn, 'middle', '2.0.0?', true))
  s.push(`<line x1="530" y1="220" x2="610" y2="252" stroke="${c53.warn}" stroke-width="2.5"/>`)
  s.push(`<line x1="610" y1="220" x2="530" y2="252" stroke="${c53.warn}" stroke-width="2.5"/>`)
  s.push(cf53T(240, 280, 9.5, c53.ink, 'middle', 'MINOR +1: the second field simply counts on'))
  s.push(cf53T(572, 280, 9.5, c53.warn, 'middle', 'NOT 2.0.0 - a feature is not a breaking change'))
  s.push(cf53T(W / 2, 322, 9.5, c53.tealInk, 'middle', 'THE PATCH LADDER: 2.4.1 TO 2.4.5 IS FOUR RELEASES', true))
  const ladder = ['2.4.1', '2.4.2', '2.4.3', '2.4.4', '2.4.5']
  ladder.forEach((v, k) => {
    const x = 60 + 140 * k
    s.push(`<rect x="${x}" y="332" width="90" height="30" rx="6" fill="${k === 0 ? c53.paper : c53.white}" stroke="${k === 4 ? c53.accent : c53.struct}" stroke-width="2"/>`)
    s.push(cf53T(x + 45, 351, 10.5, c53.ink, 'middle', v, true))
    if (k < 4) s.push(cf53ArrowH(x + 94, x + 136, 347, c53.teal))
  })
  s.push(`<rect x="16" y="372" width="${W - 32}" height="40" rx="8" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 390, 9.5, c53.ink, 'middle', 'bug fix = PATCH +1; feature = MINOR +1 with PATCH reset; breaking change = MAJOR +1 with both reset'))
  s.push(cf53T(W / 2, 406, 9.5, c53.tealInk, 'middle', 'an update stays inside the MAJOR line; an upgrade crosses to a new MAJOR'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURES — compact computed SVGs that aid THAT exercise    */
/* (0-2 per question, per the v9.0 directive)                          */
/* ================================================================== */

/* S1 — the EOL walk: release-to-end-of-support for XP and Windows 10 */
function cf53SolEolSvg(): string {
  const W = 680
  const H = 340
  const x0 = 60
  const x1 = 650
  const y0 = 2001
  const y1 = 2025
  const px = (yr: number): number => x0 + ((yr - y0) * (x1 - x0)) / (y1 - y0)
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f53}" role="img" aria-label="Two support walks on one timeline from 2001 to 2025. Windows XP arrives in October 2001 and its bar runs to 8 April 2014, carrying the label 13 years of support. Windows 10 arrives in July 2015 and its bar runs to 14 October 2025, carrying the label 10 years of support. Each end is marked EOL on a dashed line. The strip beneath computes the spans: 2014 minus 2001 is 13 years, 2025 minus 2015 is 10 years, and the gap between the two end dates is 4,207 days, about 11.5 years.">`)
  s.push(cf53T(W / 2, 30, 11, c53.teal, 'middle', 'THE SUPPORT LEDGER - TWO END-OF-LIFE WALKS', true))
  s.push(cf53T(W / 2, 48, 9.5, c53.tealInk, 'middle', 'release to end-of-support, drawn to one scale'))
  /* XP bar (above the axis) */
  const xpX = px(2014)
  s.push(`<rect x="${x0}" y="150" width="${(xpX - x0).toFixed(2)}" height="26" rx="5" fill="${c53.panelA}" stroke="${c53.warn}" stroke-width="2"/>`)
  s.push(cf53T((x0 + xpX) / 2, 140, 9.5, c53.ink, 'middle', 'Windows XP: October 2001 to 8 April 2014', true))
  s.push(cf53T((x0 + xpX) / 2, 167, 9.5, c53.ink, 'middle', '13 years of support'))
  /* Windows 10 bar (below the axis) */
  const w10X = px(2015)
  s.push(`<rect x="${w10X.toFixed(2)}" y="240" width="${(x1 - w10X).toFixed(2)}" height="26" rx="5" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T((w10X + x1) / 2, 230, 9.5, c53.ink, 'middle', 'Windows 10: July 2015 to 14 October 2025', true))
  s.push(cf53T((w10X + x1) / 2, 257, 9.5, c53.ink, 'middle', '10 years of support'))
  /* the axis and its year ticks */
  s.push(`<line x1="${x0}" y1="210" x2="${x1}" y2="210" stroke="${c53.ink}" stroke-width="2"/>`)
  for (const yr of [2001, 2005, 2010, 2014, 2015, 2020, 2025]) {
    const gx = px(yr)
    s.push(`<line x1="${gx.toFixed(2)}" y1="206" x2="${gx.toFixed(2)}" y2="214" stroke="${c53.ink}" stroke-width="1.6"/>`)
    /* 2014 and 2015 stay unlabelled: their dates ride the two bar labels */
    if (yr !== 2014 && yr !== 2015) s.push(cf53T(gx, 204, 9, c53.tealInk, 'middle', String(yr)))
  }
  /* EOL flags */
  s.push(`<line x1="${xpX.toFixed(2)}" y1="138" x2="${xpX.toFixed(2)}" y2="210" stroke="${c53.warn}" stroke-width="1.6" stroke-dasharray="5 4"/>`)
  s.push(cf53T(xpX, 130, 9, c53.warn, 'middle', 'EOL'))
  s.push(`<line x1="${x1}" y1="210" x2="${x1}" y2="274" stroke="${c53.conn}" stroke-width="1.6" stroke-dasharray="5 4"/>`)
  s.push(cf53T(x1, 284, 9, c53.conn, 'middle', 'EOL'))
  /* the arithmetic strip */
  s.push(`<rect x="16" y="296" width="${W - 32}" height="36" rx="8" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 310, 9.5, c53.ink, 'middle', 'the spans: 2014 - 2001 = 13 years; 2025 - 2015 = 10 years'))
  s.push(cf53T(W / 2, 324, 9.5, c53.tealInk, 'middle', 'the gap between the two end dates: 4,207 days = about 11.5 years'))
  s.push('</svg>')
  return s.join('')
}

/* S2 — the 25-years-to-parity subscription chart */
function cf53SolParitySvg(): string {
  const W = 680
  const H = 360
  const x0 = 90
  const x1 = 640
  const yBase = 270
  const RENT = 120
  const PERP = 3000
  const TMAX = 30
  const perYear = (x1 - x0) / TMAX
  const perCost = (yBase - 60) / 3600
  const yOf = (cost: number): number => yBase - cost * perCost
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f53}" role="img" aria-label="The years-to-parity chart. A rising orange line plots the subscription at 120 a year, passing 600 at five years, 1,200 at ten, 2,400 at twenty and 3,000 at twenty-five. A flat ink line holds the perpetual price of 3,000 paid once. The two lines meet at a marked point labelled parity year 25; year 26 is the first year the rent has cost more. Gridlines mark every five years and the costs 0, 1,200, 2,400 and 3,600.">`)
  s.push(cf53T(W / 2, 30, 11, c53.teal, 'middle', 'YEARS TO PARITY - 120 A YEAR AGAINST 3,000 ONCE', true))
  s.push(cf53T(W / 2, 48, 9.5, c53.tealInk, 'middle', 'the rent climbs; the perpetual price is paid once and holds the line'))
  for (const cost of [0, 1200, 2400, 3600]) {
    const gy = yOf(cost)
    s.push(`<line x1="${x0}" y1="${gy.toFixed(2)}" x2="${x1}" y2="${gy.toFixed(2)}" stroke="${c53.faint}" stroke-width="1.5"/>`)
    s.push(cf53T(x0 - 6, gy + 3, 9, c53.tealInk, 'end', cost === 0 ? '0' : cost.toLocaleString('en-US')))
  }
  for (let t = 0; t <= TMAX; t += 5) {
    const gx = x0 + t * perYear
    s.push(`<line x1="${gx.toFixed(2)}" y1="60" x2="${gx.toFixed(2)}" y2="${yBase}" stroke="${c53.faint}" stroke-width="1.5"/>`)
    s.push(cf53T(gx, 288, 9, c53.tealInk, 'middle', String(t)))
  }
  s.push(`<line x1="${x0}" y1="${yBase}" x2="${x1}" y2="${yBase}" stroke="${c53.ink}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 306, 9, c53.tealInk, 'middle', 'years the subscription has been held'))
  const perpY = yOf(PERP)
  s.push(`<line x1="${x0}" y1="${perpY.toFixed(2)}" x2="${x1}" y2="${perpY.toFixed(2)}" stroke="${c53.ink}" stroke-width="2.5"/>`)
  s.push(`<rect x="${x0 + 4}" y="${perpY - 18}" width="140" height="14" rx="3" fill="${c53.paper}"/>`)
  s.push(cf53T(x0 + 8, perpY - 7, 9.5, c53.ink, 'start', 'perpetual: 3,000, once'))
  const pts: string[] = []
  for (let t = 0; t <= TMAX; t += 5) pts.push(`${(x0 + t * perYear).toFixed(2)},${yOf(t * RENT).toFixed(2)}`)
  s.push(`<polyline points="${pts.join(' ')}" fill="none" stroke="${c53.accent}" stroke-width="2.5"/>`)
  s.push(`<rect x="256" y="228" width="150" height="14" rx="3" fill="${c53.paper}"/>`)
  s.push(cf53T(260, 239, 9.5, c53.accent, 'start', 'subscription: 120 a year'))
  const crossX = x0 + 25 * perYear
  s.push(`<line x1="${crossX.toFixed(2)}" y1="${perpY.toFixed(2)}" x2="${crossX.toFixed(2)}" y2="${yBase}" stroke="${c53.conn}" stroke-width="1.6" stroke-dasharray="5 4"/>`)
  s.push(`<circle cx="${crossX.toFixed(2)}" cy="${perpY.toFixed(2)}" r="5" fill="${c53.accent}"/>`)
  s.push(`<rect x="${(crossX - 66).toFixed(2)}" y="66" width="132" height="14" rx="3" fill="${c53.paper}"/>`)
  s.push(cf53T(crossX - 18, 77, 10, c53.ink, 'middle', 'parity: year 25', true))
  s.push(`<rect x="16" y="316" width="${W - 32}" height="36" rx="8" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 331, 9.5, c53.ink, 'middle', 'after 10 years the rent has paid 1,200 - still 1,800 below the perpetual price'))
  s.push(cf53T(W / 2, 346, 9.5, c53.tealInk, 'middle', 'parity: 3,000 / 120 = 25 years; year 26 is the first the rent costs more'))
  s.push('</svg>')
  return s.join('')
}

/* S3 — the uninstall leftovers map */
function cf53SolLeftoverSvg(): string {
  const W = 680
  const H = 340
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f53}" role="img" aria-label="The uninstall leftovers map. The left panel, what the uninstaller removes, lists the program files, the shortcuts and menus, and the launch registration. The right panel, what can outlive the program, lists settings, caches and file associations, with a note that settings can hold personal data. An arrow between the panels says the rest is left behind. The strip beneath explains why the store route uninstalls cleanest: the catalogue that wrote the marks unwrites them, and leftovers are usually small - honesty is knowing they are there.">`)
  s.push(cf53T(W / 2, 30, 11, c53.teal, 'middle', 'THE UNINSTALL LEFTOVERS MAP', true))
  s.push(cf53T(W / 2, 48, 9.5, c53.tealInk, 'middle', 'what the uninstaller removes against what can outlive the program'))
  s.push(`<rect x="30" y="70" width="270" height="190" rx="9" fill="${c53.white}" stroke="${c53.struct}" stroke-width="2"/>`)
  s.push(cf53T(165, 92, 10, c53.ink, 'middle', 'THE UNINSTALLER REMOVES', true))
  const gone = ['the program files', 'the shortcuts and menus', 'the launch registration']
  gone.forEach((t, k) => {
    const y = 108 + 44 * k
    s.push(`<rect x="45" y="${y}" width="240" height="30" rx="6" fill="${c53.paper}" stroke="${c53.struct}" stroke-width="1.6"/>`)
    s.push(cf53T(165, y + 20, 9.5, c53.ink, 'middle', t))
  })
  s.push(cf53T(165, 246, 9, c53.tealInk, 'middle', 'the census walked backwards'))
  s.push(cf53ArrowH(306, 378, 165, c53.conn))
  s.push(cf53T(342, 150, 9, c53.conn, 'middle', 'the rest is'))
  s.push(cf53T(342, 184, 9, c53.conn, 'middle', 'left behind'))
  s.push(`<rect x="390" y="70" width="270" height="190" rx="9" fill="${c53.panelA}" stroke="${c53.warn}" stroke-width="2"/>`)
  s.push(cf53T(525, 92, 10, c53.warn, 'middle', 'WHAT CAN OUTLIVE IT', true))
  const left = ['settings', 'caches', 'file associations']
  left.forEach((t, k) => {
    const y = 108 + 44 * k
    s.push(`<rect x="405" y="${y}" width="240" height="30" rx="6" fill="${c53.white}" stroke="${c53.warn}" stroke-width="1.6"/>`)
    s.push(cf53T(525, y + 20, 9.5, c53.ink, 'middle', t))
  })
  s.push(cf53T(525, 246, 9, c53.tealInk, 'middle', 'settings can hold personal data'))
  s.push(`<rect x="16" y="280" width="${W - 32}" height="44" rx="8" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 298, 9.5, c53.ink, 'middle', 'why the store route is cleanest: the catalogue that wrote the marks unwrites them'))
  s.push(cf53T(W / 2, 314, 9.5, c53.tealInk, 'middle', 'leftovers are usually small - honesty is knowing they are there'))
  s.push('</svg>')
  return s.join('')
}

/* S4 — the licence-family sort board: six scenarios to six doors */
function cf53SolSortSvg(): string {
  const W = 680
  const H = 390
  const scenarios = [
    'try it free for 30 days, then pay',
    'a paid editor, source closed',
    'no rights reserved at all',
    'rented by the month',
    'free of charge, source closed',
    'the source ships, four freedoms',
  ]
  const fams = ['proprietary / commercial', 'freeware', 'shareware', 'free and open-source', 'public domain', 'subscription / SaaS']
  const perm = [2, 0, 4, 5, 1, 3]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f53}" role="img" aria-label="The licence sort as a matching board. Six scenario chips on the left - try it free for 30 days then pay; a paid editor with source closed; no rights reserved at all; rented by the month; free of charge with source closed; the source ships with the four freedoms - are joined by crossing lines to the six family chips on the right: proprietary or commercial, freeware, shareware, free and open-source, public domain, subscription or SaaS. The strip beneath states the sort in one line for each family.">`)
  s.push(cf53T(W / 2, 30, 11, c53.teal, 'middle', 'THE LICENCE SORT - SIX SCENARIOS, SIX DOORS', true))
  s.push(cf53T(W / 2, 48, 9.5, c53.tealInk, 'middle', 'match the promise on the left to the family that grants it'))
  scenarios.forEach((sc, i) => {
    const y = 64 + 46 * i
    s.push(`<line x1="310" y1="${y + 19}" x2="370" y2="${64 + 46 * perm[i] + 19}" stroke="${c53.conn}" stroke-width="2"/>`)
  })
  scenarios.forEach((sc, i) => {
    const y = 64 + 46 * i
    s.push(`<rect x="30" y="${y}" width="280" height="38" rx="7" fill="${c53.white}" stroke="${c53.struct}" stroke-width="2"/>`)
    s.push(cf53T(170, y + 24, 9.5, c53.ink, 'middle', sc))
  })
  fams.forEach((fam, i) => {
    const y = 64 + 46 * i
    s.push(`<rect x="370" y="${y}" width="280" height="38" rx="7" fill="${c53.panelA}" stroke="${c53.accent}" stroke-width="2"/>`)
    s.push(cf53T(510, y + 24, 9.5, c53.ink, 'middle', fam, true))
  })
  s.push(`<rect x="16" y="344" width="${W - 32}" height="38" rx="8" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 360, 9.5, c53.ink, 'middle', 'paid and closed = proprietary; free of charge and closed = freeware; trial then pay = shareware'))
  s.push(cf53T(W / 2, 376, 9.5, c53.tealInk, 'middle', 'four freedoms = free and open-source; nothing reserved = public domain; monthly rent = subscription'))
  s.push('</svg>')
  return s.join('')
}

/* S5 — the three bumps from 2.4.1, compact */
function cf53SolBumpSvg(): string {
  const W = 680
  const H = 240
  const chain = ['2.4.1', '2.4.2', '2.5.0', '3.0.0']
  const tags = [
    { reason: '+ bug fix', field: 'PATCH +1' },
    { reason: '+ new feature', field: 'MINOR +1' },
    { reason: '+ breaking change', field: 'MAJOR +1' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f53}" role="img" aria-label="The three bumps from version 2.4.1. An arrow tagged plus bug fix moves PATCH up one to 2.4.2; an arrow tagged plus new feature moves MINOR up one to 2.5.0; an arrow tagged plus breaking change moves MAJOR up one to 3.0.0. The strip beneath states the rule: PATCH counts fixes, MINOR counts features, MAJOR counts breaks; an update stays on the MAJOR line while an upgrade crosses it.">`)
  s.push(cf53T(W / 2, 28, 11, c53.teal, 'middle', 'THE THREE BUMPS FROM 2.4.1', true))
  s.push(cf53T(W / 2, 46, 9.5, c53.tealInk, 'middle', 'one bug fix, one feature, one breaking change - three different next versions'))
  chain.forEach((v, k) => {
    const x = 40 + 165 * k
    s.push(`<rect x="${x}" y="70" width="110" height="40" rx="7" fill="${k === 0 ? c53.paper : c53.white}" stroke="${k === 0 ? c53.ink : c53.struct}" stroke-width="2"/>`)
    s.push(cf53T(x + 55, 95, 12, c53.ink, 'middle', v, true))
  })
  tags.forEach((t, k) => {
    const x1 = 40 + 165 * k + 112
    const x2 = 40 + 165 * (k + 1) - 2
    const mid = (x1 + x2) / 2
    s.push(cf53ArrowH(x1, x2, 90, c53.conn))
    s.push(cf53T(mid, 124, 9, c53.conn, 'middle', t.reason))
    s.push(cf53T(mid, 140, 9, c53.tealInk, 'middle', t.field))
  })
  s.push(`<rect x="16" y="160" width="${W - 32}" height="56" rx="8" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 178, 9.5, c53.ink, 'middle', 'the same walk from any version: PATCH counts fixes, MINOR counts features, MAJOR counts breaks'))
  s.push(cf53T(W / 2, 196, 9.5, c53.tealInk, 'middle', 'an update stays on the MAJOR line (2.4.1 to 2.5.0); an upgrade crosses it (to 3.0.0)'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* the lesson                                                          */
/* ================================================================== */
export const lesson53: Lesson = {
  id: 'cf-installing-updating-and-licensing-honestly',
  number: '5.3',
  title: 'Installing, Updating and Licensing Honestly',
  concepts: [
    'the install census: five steps, one contract',
    'three ways to bring software home',
    'semantic versioning: MAJOR.MINOR.PATCH',
    'update against upgrade, and end of life',
    'the uninstall leftovers census',
    'six licence families and the four freedoms',
    'the arithmetic of permission: trials, seats, subscriptions',
  ],
  objectives: [
    'By the end of this lesson you can state the install census - the five steps of copy, register, associate, settings, driver-or-service - and explain why installing is a contract with the operating system rather than a mere copy of files.',
    'By the end of this lesson you can name the three ways to bring software home - the installer wizard, the store or package manager, and portable software - and state the honest trade each one makes.',
    'By the end of this lesson you can read a version number under semantic versioning: from 2.4.1 a bug fix gives 2.4.2, a feature gives 2.5.0, a breaking change gives 3.0.0, and from 1.9.9 a feature gives 1.10.0 because the fields are counters, not decimals.',
    'By the end of this lesson you can distinguish an update from an upgrade, read an end-of-life date honestly (Windows XP supported to 8 April 2014, 13 years; Windows 10 to 14 October 2025, 10 years), and say what changes for a machine after support ends.',
    'By the end of this lesson you can sort any software offer into its licence family among the six - proprietary, freeware, shareware, free and open-source, public domain, subscription - and recite the four freedoms that belong to the free and open-source family.',
    'By the end of this lesson you can do the arithmetic of permission: the 25 years to parity between a 120-a-year subscription and a 3,000 perpetual licence, the day 31 that ends a 30-day trial, and the machines beyond the grant when one licence meets three machines.',
  ],
  prerequisites: ['cf-application-software-the-worker-families'],
  sources: ['cs-cf-web-ground-ch05'],
  blocks: [
    // ================================================================
    // 0. OWNING THE WORKER
    // ================================================================
    { kind: 'heading', text: 'Owning the Worker: the Honest Questions' },
    { kind: 'para', text: 'Lesson 5.1 drew the great dividing line of the software world: system software keeps the machine itself alive and organised, while application software - the worker families of lesson 5.2 - does the jobs you actually bought the machine for. The word processors, the spreadsheets, the browsers, the media editors: each was named, each was given its trade. But naming a worker is not owning one. Between choosing software and using it stand three practical questions that no family tour could answer: how does a program actually arrive on your machine? how does it stay healthy once it is there? and what, in honest law-adjacent truth, did the money buy? This lesson answers all three, and the answers hold for every family alike.' },
    { kind: 'para', text: 'The commerce of software has a way of blurring exactly these questions, because its comfortable words are borrowed from older trades. You \u201cbuy an app\u201d the way you buy a chair; you \u201cown\u201d a program the way you own a book; an update \u201cfixes things\u201d the way a mechanic fixes a car. Every one of those borrowings is half-true at best, and the halves that are false are precisely the halves this lesson separates. Installing is not copying. Updating is not repairing. And licensing - the honest centre of it all - is not buying. Read those three sentences now, disagree with them if you like, and keep them in mind: by the end of this lesson each one will have been unpacked, priced and pinned.' },
    { kind: 'para', text: 'The order of the walk is the order of a real ownership. First the arrival: what installing actually is, and the census of marks it leaves. Second the choices: the three ways to bring software home, and the honest trade each way makes. Third the upkeep: why makers keep knocking with updates, how to read a version number, and what it means when the knocking stops at end of life. Fourth the departure: uninstalling, and the leftovers that can outlive a program. And fifth, the paperwork that was there all along: the licence, its six families, the four freedoms, the trial, the seat count and the subscription bill. Every number that appears - every census, date, version and price - has been computed and pinned by this lesson\u2019s engine before a word of prose was written.' },

    // ================================================================
    // 1. WHAT INSTALLING ACTUALLY IS
    // ================================================================
    { kind: 'heading', text: 'What Installing Actually Is' },
    { kind: 'para', text: 'Begin with the commonest misunderstanding in the whole subject, the one this section exists to retire. It says: installing a program means copying its files onto the disk. The misunderstanding is understandable - on the surface, that is what appears to happen - and it is wrong in a way that matters. A folder of files, copied anywhere, is inert. Double-click a program file that the system has never heard of and you may get a polite refusal, a security warning, or a launch with none of your preferences, none of your file types, none of your past work. The files are the worker\u2019s body; installing is the ceremony that introduces that body to the city it must work in.' },
    { kind: 'para', text: 'The city in question is the operating system, and the introduction is written in a ledger. Recall from the system-software ground of this chapter that the OS keeps the machine\u2019s books: what programs exist, where they live, which of them should answer when a particular kind of file is opened, what settings each prefers. Installing is the act of making entries in those books. The program arrives as a stranger; the install ceremony - usually a small program called an installer, or setup, that ships with the software - walks through a fixed census of marks, and when the census is complete the stranger is a resident: findable, launchable, entrusted.' },
    { kind: 'para', text: 'For example, here is the census itself, the one every honest install walks, in the order a careful installer walks it:' },
    { kind: 'list', marker: 'roman', items: [
      'the program files are copied to their home folder - the one step the common misunderstanding knows about;',
      'the program is registered with the operating system, so shortcuts appear and menu entries are written - now it can be found and launched;',
      'the file associations are claimed - which program will open which kind of file when you double-click it;',
      'the settings are written - a home for your preferences, so the program remembers your choices the next time it launches;',
      'sometimes a driver or a background service is added - when the program must talk to unusual hardware, or keep working while you are not looking.',
    ] },
    { kind: 'para', text: 'Walk the census once with a concrete worker, a small photo editor you have just downloaded. The installer copies the editor\u2019s files to their home folder - mark one. It writes a shortcut to your desktop and an entry to your start menu, so the editor can be found without ever visiting its folder - mark two. It asks, or quietly decides, that pictures of a certain kind shall now open in this editor, and writes that claim into the system\u2019s file-type table - mark three. It creates a settings folder that will hold your chosen theme, your recent files, your export quality - mark four. And because this editor can also fetch pictures off a camera, it adds a small background service that wakes when a camera is plugged in - mark five, the mark that only some installs need. Five steps, and notice again: only the first was a copy.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — installing', text: '*Installing* is said to be the act of registering a program with the operating system so that the program can be found, launched and entrusted with file types. Symbolically: an install writes marks into the OS\u2019s ledger - a home for the files, a registration for the launch, a claim on the file types, a store for the settings, and occasionally a driver or service - and a program is installed exactly when those marks exist, not merely when its files exist.' },
    { kind: 'para', text: 'Read the definition twice and notice what it does not say. It does not say installing is copying - copying is one mark of five, and the other four live in the operating system\u2019s books, not in the program\u2019s folder. It does not say the program becomes part of the machine - the marks are entries in a ledger, and ledgers can be unwritten, which is what uninstalling will later mean. And it does not promise the ceremony is honest in every case: a careless installer can scatter files across the disk and skip no opportunity to leave marks. The definition describes the contract; the next two sections describe who performs it, and how well.' },
    { kind: 'figure', caption: 'The install census drawn as the contract it is: five marks on a document that the program (through its installer) and the operating system (in its ledger) both sign. Mark one copies the files; mark two registers the launch; mark three claims the file associations; mark four writes the settings; mark five, drawn dashed because it is occasional, adds a driver or background service. Uninstalling honestly means walking the same list backwards.', svg: cf53InstallSvg() },
    { kind: 'para', text: 'The contract picture is worth a minute of staring, because it explains three everyday mysteries at once. Why does a program that was merely copied - dragged from a friend\u2019s folder, say - behave like a stranger? Because marks two through five were never made. Why does the same program, installed, remember your preferences after you close it? Because mark four gave it a settings home. And why can a well-behaved program later be removed almost cleanly? Because a contract signed by both sides leaves a record of what was agreed - the program ships an uninstaller that knows the marks it made, and the OS keeps the ledger entries that say the same thing from the other side.' },
    { kind: 'algorithm', title: 'How an honest install runs', lines: [
      { code: 'FETCH the installer from a source you trust', note: 'the maker\u2019s own site or a curated store; the census begins with a trustworthy walker' },
      { code: 'RUN it with the permissions it needs and no more', note: 'an installer writes to the OS ledger, so it asks for power - grant it, but note what it asked for' },
      { code: 'COPY the program files to their home folder', note: 'census mark one: the body arrives' },
      { code: 'REGISTER the program and claim its file types', note: 'census marks two and three: shortcut, menu entry, and the right to answer for chosen file kinds' },
      { code: 'WRITE settings; add driver or service only if needed', note: 'census marks four and five: memory for preferences, and the occasional helper that talks to hardware' },
      { code: 'CHECK: launch once, open one file of each claimed kind', note: 'verify the contract took: the program finds itself, and the file types find the program' },
    ], note: 'The census of five steps, walked in order, with a verification at the end - the same shape a store performs silently.' },
    { kind: 'example', title: 'Illustration 1. An install-order walk: the five-step census performed on one small worker.', steps: [
      'Take a small photo editor, downloaded from its maker as an installer, and walk the census as the wizard performs it.',
      'First it copies the editor\u2019s program files to their home folder - census mark one, the only step the copy-only misunderstanding ever sees.',
      'Next it registers the editor: a shortcut lands on the desktop and an entry is written into the start menu - mark two, and the editor can now be found and launched.',
      'Now it claims the file associations: pictures of its chosen kinds will open in this editor from now on - mark three.',
      'Then it writes a settings folder for your preferences - mark four - and, because this editor imports from cameras, adds a small background service - mark five.',
      'Hence the census is complete: five steps were walked, and only the first of them was a copy.',
    ], answer: 'Hence the census is complete: five steps walked, and only the first of them was a copy' },
    { kind: 'para', text: 'One habit completes this section. When an installer finishes, launch the program once and open one file of the kind it claimed - the check step of the algorithm above. If the launch works, mark two took; if the file opens in the new program, mark three took. It is a thirty-second audit of a five-step contract, and it catches the commonest failure in the field: a half-finished install that copied the files but never finished the ledger. With the census fixed, the natural next question is who walks it - and there are exactly three ways.' },

    // ================================================================
    // 2. THREE WAYS TO BRING SOFTWARE HOME
    // ================================================================
    { kind: 'heading', text: 'Three Ways to Bring Software Home' },
    { kind: 'para', text: 'Every install you will ever meet is one of three ways to bring software home, and the three differ not in the census they must satisfy - the census is the same - but in who walks it and how honestly the marks are kept. The census is the law; the ways are the regimes. Learn them as a census of three:' },
    { kind: 'list', marker: 'roman', items: [
      'the installer wizard - a setup program, shipped with the software or downloaded beside it, that walks the five-step census for you, step by visible step;',
      'the store or package manager - the curated shelf: one catalogue you browse, one update pipe that keeps everything current; the phone\u2019s app store and Linux\u2019s apt are the two famous shapes of the same idea;',
      'portable software - a program that runs from its own folder, no registration, no shortcuts, no associations; the honest trade: nothing written, nothing left.',
    ] },
    { kind: 'table', caption: 'The three ways to bring software home, and the honest trade each makes. All three end with working software; they differ in who keeps the ledger, and in what survives the uninstall.', head: ['The way', 'Who walks the census', 'How updates arrive', 'The honest trade'], rows: [
      ['the installer wizard', 'the setup program, visibly, with your clicks', 'from the maker, one program at a time', 'full control, full responsibility: you chose every mark'],
      ['the store / package manager', 'the curator, silently, to one standard', 'one update pipe for everything on the shelf', 'convenience and clean removal, in exchange for trust in the curator'],
      ['portable software', 'nobody: it runs from its folder unregistered', 'you replace the folder with the new release', 'zero footprint and zero leftovers, but no shortcuts and no associations'],
    ] },
    { kind: 'para', text: 'The wizard is the oldest and most familiar regime, and its reputation for tedium is undeserved: the \u201cnext, next, finish\u201d ritual is the five-step census made visible. Behind each button the setup program is asking the operating system for the marks - a home folder here, a menu entry there, a claim on file types, a settings location, occasionally a service. When the wizard asks where to install and whether to create a desktop shortcut, it is really asking which marks you want made and where. The honest question to ask back is provenance: a wizard is a stranger asking for the keys to the ledger, so fetch it from the maker\u2019s own site or not at all.' },
    { kind: 'para', text: 'The store route turns the whole ceremony over to a curator. One catalogue holds the shelf; installing is a single assent; and the same pipe that installed a program updates it, which is why store-installed software on a phone or a Linux machine rarely asks you anything at all. The curator also checks the shelves - imperfectly, honestly - which is a real safety property, and the ledger the curator keeps is the secret of the clean uninstall this lesson returns to later. On Linux the same idea wears the older clothes of the package manager: a command-line catalogue, apt and its cousins, from which software is installed, updated and removed with the same single authority.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the store era opens, 2008', text: 'The curated shelf became the world\u2019s default almost overnight in 2008, when the App Store opened with about 500 apps on its opening day shelf. The number deserves its honesty: about 500, not a precise census, and the store\u2019s own later counts ran to millions - but the shape of software ownership changed in that one year. Installing stopped being a wizard you downloaded from a maker\u2019s site and became a single tap on a curated shelf, with updates arriving through one pipe. Our retelling is our own; the date and the opening-shelf size are the pinned facts. Seventeen years had passed since 1991 - the year Linux was announced - and the pipe that began as a programmer\u2019s package manager had become everybody\u2019s front door.' },
    { kind: 'para', text: 'Portable software is the third way, and the purist\u2019s one: a program complete in its own folder, which runs from wherever the folder sits and writes none of the census marks. No shortcut appears; no file type is claimed; no settings live in the system\u2019s usual places - the preferences ride inside the folder itself. Copy the folder to a USB stick, carry it to another machine, and the same program runs there unchanged. The honest trade is symmetry: nothing written means nothing left behind when you delete the folder - the cleanest uninstall in computing - but also nothing gained: no start-menu presence, no double-click ownership of your files, no registration the system will remember tomorrow.' },
    { kind: 'callout', tone: 'insight', title: 'Note — why the store route uninstalls cleanest', text: 'Uninstalling, as section 6 will confirm, fails on the marks nobody remembers making. The wizard\u2019s uninstaller remembers only what its maker bothered to record; the portable program writes nothing and so removes nothing. But the store route keeps the fullest ledger of all: the same catalogue that walked the census and wrote the marks is the authority that unwrites them, one standard, every time. The regime that installs is the regime that uninstalls - that symmetry, not convenience, is the deepest argument for the curated shelf.' },
    { kind: 'para', text: 'Choose the regime by the work, not by habit. A tool you live in daily - the browser, the editor, the office suite - belongs on the curated shelf or a careful wizard install, because you want the update pipe and the associations. A tool you need once on a machine you do not own - a file rescue utility on a friend\u2019s laptop, say - is the portable route\u2019s reason to exist. And whichever regime you choose, the maker will keep knocking after the install is done: the next section is about why, and about reading the knock honestly.' },

    // ================================================================
    // 3. UPDATING: WHY THE MAKER KEEPS KNOCKING
    // ================================================================
    { kind: 'heading', text: 'Updating: Why the Maker Keeps Knocking' },
    { kind: 'para', text: 'Sooner or later - usually sooner - the software you installed will announce that a new version is available, and it will keep announcing until you let it in. The knocking irritates people, and the irritation is fair: updates arrive at inconvenient moments, restart what you were doing, and never explain themselves. This section explains them. There are exactly three honest reasons a maker releases a new version, and every update you will ever be offered is one of the three, sometimes two of them together:' },
    { kind: 'list', marker: 'roman', items: [
      'bugs - the mis-made instructions: the program was built by people, the people erred, and the error is being corrected;',
      'security - the plugged holes: some bugs let other people\u2019s instructions do things they should never be allowed to do, and the hole is being closed;',
      'features - the new abilities: the program learns to do something it could not do before, or does an old thing better.',
    ] },
    { kind: 'para', text: 'Bugs first, because they are the largest class and the least dramatic. A program, this book has insisted from its first chapter, is instructions - and instructions written by humans contain human mistakes. A button that does nothing on the third click, a sort that forgets the last row, a save that loses the odd character: none of these is a machine failing; each is an instruction that says the wrong thing, doing exactly what it says. A bug-fix update replaces the mis-made instruction with the intended one. That is the whole story - unglamorous, endless, and the single largest content of most version histories.' },
    { kind: 'para', text: 'Security deserves its own sober paragraph, free of both fear-mongering and dismissal. A small minority of bugs are dangerous in a specific way: they let instructions from somewhere else - a crafted file, a network message - persuade the program to step outside its errands. When a maker learns of such a hole, the fix ships as a security update, and the maker urges everyone to install it promptly, because the hole is now public knowledge. The honest framing is the door lock: most houses are never burgled, and you are not foolish for a night with the door unlocked - but locking it costs one motion and removes the question. Installing security updates is that motion. No more apocalyptic than a latch, and no less sensible.' },
    { kind: 'para', text: 'Features are the third reason and the tempting one. A new export format, a faster search, a redesigned toolbar: features arrive because software that never changes dies, and because users ask. Two honest cautions belong beside the temptation. New features are new instructions, and new instructions can carry new bugs - which is why careful users let a feature release settle for a few weeks before adopting it. And features can also be removals in disguise: the old menu you knew may leave with the new design you did not ask for. An update is the maker\u2019s, not yours; reading what changed is the only defence, which is exactly what version numbers - the next section - let you do.' },
    { kind: 'callout', tone: 'insight', title: 'Note — the honest update habit', text: 'Update on the maker\u2019s schedule, not on fear\u2019s and not on inertia\u2019s. Concretely: let security updates in promptly - the door-latch rule; let feature updates wait a few weeks if the tool matters to your work - the settling rule; and read the one-line summary of what changed before you click, because the version number itself tells you which of the three reasons is knocking. The next section hands you the codebook for reading it.' },

    // ================================================================
    // 4. VERSION NUMBERS READ HONESTLY
    // ================================================================
    { kind: 'heading', text: 'Version Numbers Read Honestly' },
    { kind: 'para', text: 'When the maker knocks, the knock carries a number: the new version\u2019s name. Most users read version numbers the way they read prices - bigger means newer means better - and stop there. But there is a widely followed naming discipline, called semantic versioning, whose whole purpose is to make the number a message: it tells you which of the three reasons is knocking, and what the update will do to your work. Learn to read it and the knocks stop being noise.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — semantic versioning', text: 'A version number is said to be written in *semantic versioning* when it takes the form MAJOR.MINOR.PATCH - three whole-number fields, each counting on its own - with the promise that a bug fix raises PATCH by one, a new feature raises MINOR by one and resets PATCH to zero, and a breaking change raises MAJOR by one and resets both lower fields to zero. Symbolically, from any version $(M, m, p)$: a bug fix gives $(M, m, p+1)$; a feature gives $(M, m+1, 0)$; a breaking change gives $(M+1, 0, 0)$.' },
    { kind: 'para', text: 'The three fields, then, are three ledgers. PATCH counts corrections - instructions replaced because they were mis-made. MINOR counts abilities - features added without breaking the old ones. MAJOR counts breaks - moments where the maker changed the deal, and things that worked with the old version may work differently, or need attention, or not work at all with the new. A breaking change is not a bug; it is an honest announcement that the program\u2019s contract with its users has changed shape. That is why MAJOR exists as a separate counter, and why reading it is self-defence.' },
    { kind: 'equation', latex: '\\text{bug fix} \\Rightarrow (M, m, p+1); \\quad \\text{feature} \\Rightarrow (M, m+1, 0); \\quad \\text{breaking} \\Rightarrow (M+1, 0, 0) \\tag{1}', note: 'The semver bump law: each kind of change moves its own field and resets the fields below it. From 2.4.1 the three honest next versions are 2.4.2, 2.5.0 and 3.0.0 - computed, not remembered.' },
    { kind: 'figure', caption: 'The version ladder. The main chain walks 2.4.1 to 2.4.2 (a bug fix: PATCH + 1), on to 2.5.0 (a feature: MINOR + 1, PATCH reset), on to 3.0.0 (a breaking change: MAJOR + 1, both reset). The warning panel carries the anti-decimal branch: from 1.9.9 a feature gives 1.10.0, and the crossed-out ghost rejects 2.0.0. The strip beneath shows the patch ladder 2.4.1 to 2.4.5 - four releases, one bug fix each.', svg: cf53LadderSvg() },
    { kind: 'example', title: 'Illustration 2. The three standard bumps: from 2.4.1, one next version per kind of change.', steps: [
      'Take 2.4.1 as the starting version - MAJOR 2, MINOR 4, PATCH 1.',
      'A bug fix arrives: PATCH moves up one, and nothing else changes, so 2.4.1 gives 2.4.2.',
      'A new feature arrives: MINOR moves up one and PATCH resets to zero, so 2.4.1 gives 2.5.0.',
      'A breaking change arrives: MAJOR moves up one and both lower fields reset, so 2.4.1 gives 3.0.0.',
      'Hence the three honest next versions of 2.4.1 are 2.4.2, 2.5.0 and 3.0.0 - one per kind of knock on the door.',
    ], answer: 'Hence the three honest next versions of 2.4.1 are 2.4.2, 2.5.0 and 3.0.0' },
    { kind: 'para', text: 'Now the counter-intuition, the one place semver punishes readers who trust their school arithmetic. The fields look like decimals, and decimals behave in a way every pupil knows: 2.5 is greater than 2.4, 1.9 is nearly 2, and anything beginning 1.10 looks suspiciously like one-and-a-tenth. Fields are not decimals. Each field is a counter, and counters pass nine without ceremony: the ninth feature is followed by the tenth, and the tenth is written 10, not by starting the MAJOR again. The version after 1.9.9, when the change is a feature, is 1.10.0 - one step of MINOR past 1.9.9, nothing more.' },
    { kind: 'example', title: 'Illustration 3. The anti-decimal branch: 1.9.9 plus one new feature.', steps: [
      'Take 1.9.9 - MINOR 9, PATCH 9 - and add one new feature.',
      'The feature rule says MINOR + 1 with PATCH reset: 9 + 1 = 10, so the next version is 1.10.0.',
      'Check the decimal misreading: as decimals 0.10 is less than 0.90, so the decimal eye would call 1.10.0 older than 1.9.9 - the eye is wrong because the fields count separately, and 10 is one past 9.',
      'Check the other wrong answer: a feature is not a breaking change, so 2.0.0 would falsely announce a break that never happened.',
      'Also, for symmetry, a bug fix from 1.9.9 gives 1.9.10 - even the PATCH field may pass nine.',
      'Hence 1.9.9 + feature gives 1.10.0, not 2.0.0; the fields are counters, not decimals.',
    ], answer: 'Hence 1.9.9 + feature gives 1.10.0, not 2.0.0 - the fields are counters, not decimals' },
    { kind: 'example', title: 'Illustration 4. The patch ladder: counting releases from 2.4.1 to 2.4.5.', steps: [
      'Start at 2.4.1 and ask how many patch releases carry the line to 2.4.5.',
      'Each bug fix raises PATCH by one: after 2.4.1 comes 2.4.2, then 2.4.3, then 2.4.4, then 2.4.5.',
      'So the releases strictly between the endpoints are 2.4.2, 2.4.3, 2.4.4 and 2.4.5 - four releases.',
      'Check by subtraction: the PATCH field moved from 1 to 5, and 5 - 1 = 4, matching the count.',
      'Hence 2.4.1 to 2.4.5 is four releases, each one bug fix deep.',
    ], answer: 'Hence 2.4.1 to 2.4.5 is four releases, each one bug fix deep' },
    { kind: 'derivation', title: 'The bump algebra', statement: 'From any version written as the triple $(M, m, p)$, compute the next version under each of the three kinds of change, and verify the arithmetic on the two witnesses this lesson carries: 2.4.1 and 1.9.9.', steps: [
      { label: 'Fix the rule', formula: '(M, m, p) \\xrightarrow{\\ \\text{bug fix}\\ } (M, m, p+1)', explanation: 'Only PATCH moves, because only an instruction was replaced; nothing about the program\u2019s shape changed.' },
      { label: 'Fix the feature rule', formula: '(M, m, p) \\xrightarrow{\\ \\text{feature}\\ } (M, m+1, 0)', explanation: 'MINOR moves up one and PATCH resets to zero: a fresh ledger for a fresh set of corrections to come.' },
      { label: 'Fix the breaking rule', formula: '(M, m, p) \\xrightarrow{\\ \\text{breaking}\\ } (M+1, 0, 0)', explanation: 'MAJOR moves up one and both lower fields reset: the deal changed, so the sub-ledgers start again.' },
      { label: 'Run the first witness', formula: '(2, 4, 1): \\ (2, 4, 2),\\ (2, 5, 0),\\ (3, 0, 0)', explanation: 'The three next versions of 2.4.1 - the bug fix 2.4.2, the feature 2.5.0, the breaking change 3.0.0.' },
      { label: 'Run the second witness', formula: '(1, 9, 9): \\ (1, 10, 0) \\text{ for a feature},\\ (1, 9, 10) \\text{ for a fix}', explanation: 'The anti-decimal branch: the counter passes nine and simply writes 10; the decimal eye misreads this, the field-wise eye does not.' },
    ], result: 'Hence from any $(M, m, p)$ the three bumps are $(M, m, p+1)$, $(M, m+1, 0)$ and $(M+1, 0, 0)$; from 2.4.1 they are $2.4.2$, $2.5.0$ and $3.0.0$; from 1.9.9 a feature gives $1.10.0$.' },
    { kind: 'para', text: 'One honesty note before the next section, because no discipline this useful is followed universally. Not every project uses semantic versioning: some number by date, some by name, some by whim; some follow semver loosely and reserve MAJOR for marketing moments. The skill this section teaches is not faith in a numbering scheme but the habit of asking, for any software you rely on: what does the maker promise when the number changes? The answer is usually written near the release, and for the majority of software you will meet - and nearly all of it on a curated shelf - the answer is semver, and the three-field codebook above applies.' },

    // ================================================================
    // 5. UPDATE, UPGRADE AND THE END OF THE LINE
    // ================================================================
    { kind: 'heading', text: 'Update, Upgrade and the End of the Line' },
    { kind: 'para', text: 'Two words from everyday software life now receive their honest separation, because the version arithmetic gives it for free. An update is a move that stays inside your MAJOR line: 2.4.1 to 2.4.2 for a fix, 2.4.1 to 2.5.0 for a feature - the first number unchanged, the deal unbroken, and in the ordinary case the price zero. An upgrade is a move that crosses to a new MAJOR: 2.5.0 to 3.0.0 - the deal has changed shape, and the maker may charge, or change the terms, or require a fresh decision from you. The words are used sloppily everywhere; the arithmetic is what keeps them honest.' },
    { kind: 'table', caption: 'Update against upgrade, separated by the version arithmetic. The boundary is the MAJOR field: inside it, continuity; across it, a new deal.', head: ['The move', 'The version walk', 'What it means', 'What it may cost'], rows: [
      ['an update', '2.4.1 to 2.4.2 (fix) or 2.5.0 (feature)', 'same MAJOR line, same deal, corrections and additions', 'normally nothing'],
      ['an upgrade', '2.5.0 to 3.0.0 (breaking change)', 'a new MAJOR: the contract with the maker has changed shape', 'possibly money, always attention'],
    ] },
    { kind: 'para', text: 'And the knocking, honest to record, does not last forever. Software has a support life: the span of years during which the maker releases fixes at all. When that span ends, the version reaches its end of life - EOL in the maker\u2019s shorthand - and from that date there are no more updates of any kind: no bug fixes, no security plugs, no features. The program keeps running; nothing switches off. What ends is the makers\u2019 side of the contract - the knocking stops - and the machine is left to face whatever is discovered afterward with the holes it already has.' },
    { kind: 'para', text: 'Two dates anchor this honestly, because end of life happens even to the most famous software in the world. Windows XP - released in October 2001, and for years the most-used operating system on Earth - had its support end on 8 April 2014: thirteen years, $2014 - 2001 = 13$, the longest consumer-support span its maker ever gave. Windows 10 - released July 2015 - had its support end on 14 October 2025: ten years, $2025 - 2015 = 10$. Both endings fell on a Tuesday, the makers\u2019 monthly patch day, which is when such dates are made to fall. Between the two end dates lie 4,207 days - about eleven and a half years - during which the world twice learned the same lesson: the number of installed, unsupported machines does not drop to zero on the day the knocking stops.' },
    { kind: 'table', caption: 'The support ledger this lesson carries: two famous end-of-life walks. The spans and the gap between the end dates are engine-pinned.', head: ['The system', 'Arrived', 'Support ended', 'The span'], rows: [
      ['Windows XP', 'October 2001', '8 April 2014', '13 years'],
      ['Windows 10', 'July 2015', '14 October 2025', '10 years'],
    ] },
    { kind: 'example', title: 'Illustration 5. The EOL arithmetic run: two support spans and the gap between their ends.', steps: [
      'Take the two walks from the support ledger.',
      'Windows XP: October 2001 to 8 April 2014, so the span is $2014 - 2001 = 13$ years.',
      'Windows 10: July 2015 to 14 October 2025, so the span is $2025 - 2015 = 10$ years.',
      'Compare: XP drew the longer support by $13 - 10 = 3$ years.',
      'The gap between the two end dates, 8 April 2014 to 14 October 2025, is 4,207 days - about 11.5 years.',
      'Hence XP drew 13 years, Windows 10 drew 10 years, and their support ended 4,207 days apart.',
    ], answer: 'Hence XP drew 13 years, Windows 10 drew 10 years, and their end dates stand 4,207 days apart' },
    { kind: 'callout', tone: 'warn', title: 'Caution — an unpatched machine is a door left unlocked', text: 'After end of life, no security plugs arrive, ever: every hole discovered from that day forward stays open for as long as the software runs. The honest framing is still the latch, not the alarm - most such machines are never attacked - but the sensible walk is to plan the migration before the end date, not after. If a machine must keep running EOL software, keep it off the network\u2019s front lines; and when you inherit a machine, check the support dates of what it runs before you trust it with anything that matters.' },
    { kind: 'para', text: 'The end-of-life walk is also the moment to name a doorstep honestly. Planning migrations, servicing a fleet of machines, retiring systems at scale - that is the operating-system administrator\u2019s craft, and this library\u2019s Operating Systems book owns that ground whole. What this lesson keeps is the reader-level literacy: to hear an end-of-life date, know exactly what it does and does not switch off, and read a support span as a plain arithmetic fact. With arrival and upkeep mapped, the walk turns to the exit.' },

    // ================================================================
    // 6. UNINSTALLING HONESTLY
    // ================================================================
    { kind: 'heading', text: 'Uninstalling Honestly' },
    { kind: 'para', text: 'Uninstalling is installing read backwards, and the same honesty applies. To uninstall a program is not to delete a folder; it is to unwind the census - to remove the files, to strike the registration, to release the file associations, to clear the settings, to stop the service. A program that is merely deleted leaves every mark but the first still standing: the shortcut that points nowhere, the file type still answered by a program that is gone, the menu entry for a ghost. The uninstaller exists to walk the census backwards; the question this section asks is how completely it walks it.' },
    { kind: 'para', text: 'The honest answer is: almost completely, and the shortfall has a census of its own - three kinds of leftovers that can outlive a well-uninstalled program:' },
    { kind: 'list', marker: 'roman', items: [
      'settings - your preferences, kept behind in case you return: the mark-four home, unclaimed by the uninstaller\u2019s usual sweep;',
      'caches - the program\u2019s working scratch: thumbnails, downloaded pieces, temporary copies, left because they live in folders the uninstaller was never told it owned;',
      'file associations - claims that outlive their claimant: the system\u2019s table still naming the departed program as the answerer for a file kind.',
    ] },
    { kind: 'para', text: 'Why do makers leave these? Partly courtesy: settings are kept so that a reinstall finds your preferences waiting, and users have thanked many an uninstaller for that. Partly bookkeeping: caches scatter into folders whose names vary by system, and no uninstaller chases every one. And partly the ghost problem of associations: the uninstaller strikes its own claim, but if the claim was edited, inherited or doubled, the table can retain a stale entry. None of this is scandalous; it is the honest residue of a five-mark contract unwound by fallible software.' },
    { kind: 'callout', tone: 'insight', title: 'Note — leftovers are usually harmless, and honesty is knowing they are there', text: 'A settings folder is typically a few kilobytes; a cache, a few megabytes; a stale association, one table row. The disk does not care. Two readers should care a little: the privacy-minded, because settings and caches can hold personal data - a chat log, a saved password hint, a history of opened files - and the tidy-minded, because years of installations leave a sediment. Knowing the census of three is the literacy; acting on it is a choice, not a duty.' },
    { kind: 'para', text: 'The regime choice of section 2 now pays its second dividend. The wizard\u2019s uninstaller removes what its maker remembered to record - well or poorly, by craft. The portable program leaves nothing because it wrote nothing. But the store route is the cleanest of all, and now you can say why: the catalogue that walked the census is the same authority that unwrites it, mark by mark, from its own single ledger. Install by the shelf, uninstall by the shelf - the marks that were made on the shelf\u2019s authority come off with the shelf\u2019s authority. The exit, like the entrance, is honest exactly in proportion to who kept the books.' },


    // ================================================================
    // 7. LICENSING: YOU NEVER BOUGHT THE SOFTWARE
    // ================================================================
    { kind: 'heading', text: 'Licensing: You Never Bought the Software' },
    { kind: 'para', text: 'Everything this lesson has walked so far - the arrival, the upkeep, the exit - has quietly assumed you may run the program at all. That permission has a name, and it is the part of the deal most often misunderstood. When you hand over money for software, you receive a box, a download, perhaps a card with a key on it - but what you have bought is not the program. The program remains the maker\u2019s property, protected like any published work; what you buy is a grant of permission to use it under stated conditions.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — software licence', text: 'A software licence is said to be the maker\u2019s grant of permission to use the software under stated conditions. Buying media or a key buys the permission, not the program: the copy you run is yours to run, not yours to own, and the conditions - who may use it, on how many machines, for how long, with what freedoms - are the terms of the grant.' },
    { kind: 'para', text: 'Read that back slowly, because two honest consequences follow. First, the price of software is the price of a permission, which is why the same program can carry a student rate, a home rate and a business rate: the software is identical; what differs is the breadth of the grant. Second, the conditions can be generous or stingy, and the whole variety of software economics - free tools, trials, subscriptions, the enormous public commons - is not a difference in generosity of makers but a difference in what the licence grants. Six families of grant cover almost every program you will meet.' },
    { kind: 'figure', caption: 'The six licence families as one street of doors. (i) Proprietary: you pay for permission and the source stays closed. (ii) Freeware: free of charge, but the source is still closed and the permission still limited. (iii) Shareware: try free, then pay - day 31 of a 30-day trial needs the licence. (iv) Free and open source: the four freedoms, and the source comes along. (v) Public domain: no rights reserved - rare, and honestly so. (vi) Subscription: rent by the month; stop paying, stop using. The census strip beneath: what you pay, whether the source opens, what you may do.', svg: cf53StreetSvg() },

    { kind: 'example', title: 'Illustration 6. The trial-expiry run: a 30-day shareware trial meets day 31.', steps: [
      'Take the grant as it is written: try free for 30 days, then pay.',
      'Days 1 to 30 sit inside the trial: the full program, every feature, legitimately yours to evaluate.',
      'Day 31 is the first day outside the grant: the permission has expired by its own arithmetic.',
      'The honest fork on day 31: pay for the licence, or stop - and an honest stop includes uninstalling.',
      'Check the gaming move: reinstalling to restart the clock breaches the trial\u2019s terms even where the software forgets.',
      'Hence day 31 is a calendar fact: pay or stop, and the stop cleans up after itself.',
    ], answer: 'Day 31 ends the trial: pay for the licence or stop (and uninstall).' },
    { kind: 'example', title: 'Illustration 7. The per-seat overrun run: one licence, three machines.', steps: [
      'Read the grant\u2019s seat count: one seat - permission for one running copy at a time.',
      'Count the machines actually running it: three.',
      'Apply the overage law: machines beyond the grant are m minus s, here 3 minus 1.',
      'Compute: 3 minus 1 is 2, so two machines stand beyond the grant.',
      'The honest exits: buy two more seats, or thin the fleet back to one machine.',
      'Hence the overrun is 2 machines, and the cure makes the count agree with the grant.',
    ], answer: 'Two machines beyond the grant; buy seats or thin the fleet.' },
    { kind: 'example', title: 'Illustration 8. The door census run: six grants, six families, one line each.', steps: [
      'Take grant (a): try free for 30 days then pay - the trial shape names shareware.',
      'Take grant (b): source open, four freedoms with every copy - that is free and open-source software.',
      'Take grant (c): pay once, source closed, one machine - the proprietary door.',
      'Take grant (d): no rights reserved at all - the public domain, rare as it is.',
      'Take grant (e): 120 per year, stops when payments stop - the subscription door.',
      'Take grant (f): free of charge, source still closed - freeware, the gift with the wrapping left on.',
      'Hence the six grants name the six doors: shareware, FOSS, proprietary, public domain, subscription, freeware.',
    ], answer: 'The six doors in order: shareware, free and open-source, proprietary, public domain, subscription, freeware.' },
    { kind: 'para', text: 'Walk the street door by door, priced honestly:' },
    { kind: 'list', marker: 'roman', items: [
      'proprietary (commercial) software - you pay for the permission, the source code stays closed, and the grant typically limits machines, users and transfers. The familiar shrink-wrapped world: polished, supported, and closed;',
      'freeware - free of charge, yet not free in the deeper sense: the source stays closed and the maker\u2019s conditions still bind. A free-of-charge antivirus or a no-cost media player is freeware: a gift with the wrapping left on;',
      'shareware - try first, pay if you keep it: the honest trial. The classic shape is the 30-day trial; on day 31 the grant expires and the honest walk is pay or stop;',
      'free and open-source software - the one family that grants the four freedoms outright (the numbered list just below). Free here means freedom, not price: some open-source products are sold, and the freedom travels with the copy;',
      'public domain - no rights reserved at all: use, modify, sell, anything. Rare, because modern copyright switches on automatically and rarely switches off; most \u201cpublic domain\u201d claims are really one of the other five doors mislabelled;',
      'subscription and software as a service - the worker rented by the month: you hold a current permission only while the payments do. Stop paying and the software stops - the opposite pole from the perpetual licence.',
    ] },
    { kind: 'para', text: 'The fourth door needs its own walk, because its grant is numbered and famous. Free and open-source software rests on four freedoms:' },
    { kind: 'list', marker: 'roman', items: [
      'freedom 0 - run the program as you wish, for any purpose, without asking;',
      'freedom 1 - study how the program works, and change it, which requires that the source code comes along with the copy;',
      'freedom 2 - redistribute copies: give the program away, exactly as you received it;',
      'freedom 3 - distribute your modified versions, so the improvements you build on freedom 1 can reach others.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — GNU, the FSF, and Linux', text: 'The four freedoms were not discovered; they were declared. In September 1983 Richard Stallman announced the GNU Project - a plan to build a complete operating system whose every part granted them. The Free Software Foundation followed in October 1985, two years later, to hold the movement\u2019s legal and organisational ground. The kernel GNU awaited arrived from elsewhere: in August 1991 Linus Torvalds announced the Linux kernel - 8 years after GNU began - and the GNU tools with the Linux kernel became the free systems that today run most phones (through Android) and most servers on the Internet. The licences that carry these freedoms, like the MIT and GPL families, are themselves famous legal craft - but the law of licences is a profession, and this lesson teaches reader-level literacy, not legal advice.' },
    { kind: 'para', text: 'The subscription door also carries arithmetic worth doing once, honestly, because \u201crent is cheaper\u201d is a claim with a time attached. Suppose a worker you need is sold two ways: a perpetual licence at 3,000 (currency irrelevant to the arithmetic), and a subscription at 120 per year for the same software. The subscription looks wildly cheaper - and for the first years it is. But the perpetual grant never expires, while the rent never stops. The break-even is a plain division, and it deserves the derivation treatment below.' },
    { kind: 'derivation', title: 'The years-to-parity of a subscription', statement: 'A perpetual licence costs 3,000 once; a subscription costs 120 per year, forever. After how many years do the two costs meet?', steps: [
      { label: 'Set the two accumulations equal', formula: '3000 = 120 \\times t', explanation: 'Let t be the number of years of rent. The perpetual cost is fixed at 3,000; the rented cost grows linearly at 120 each year.' },
      { label: 'Divide through by the yearly rent', formula: 't = \\frac{3000}{120}', explanation: 'The fixed grant divided by the yearly rate gives the years the rent needs to reach it.' },
      { label: 'Compute the quotient', formula: 't = 25', explanation: 'Three thousand divided by one hundred and twenty is exactly twenty-five: after 25 years of rent you have paid the perpetual price - and the rent continues while the perpetual licence would still run.' },
      { label: 'Read the result honestly', explanation: 'Twenty-five years is far beyond a typical machine\u2019s life, so for most readers the subscription stays cheaper in fact; the parity point simply names the crossover the marketing never mentions.' },
    ], result: 'The subscription reaches parity with the perpetual licence at $t = 25$ years - $25 years$ of rent equals one $3,000$ grant - and the honest comparison is the crossover, not the headline price.' },
    { kind: 'callout', tone: 'theorem', title: 'The parity law of renting software', text: 'Let a perpetual licence cost P and an equivalent subscription cost r per year. Then the rented cost equals the granted cost after P/r years, and exceeds it forever after. The law says nothing about which is better: it only fixes the one number - the crossover year - that any honest comparison must name.' },
    { kind: 'equation', latex: 't_{\\text{parity}} = \\frac{P}{r} \\tag{2}', note: 'The years-to-parity of a subscription: the perpetual price divided by the yearly rent. With P = 3,000 and r = 120 per year, the parity time is exactly 25 years.' },
    { kind: 'equation', latex: '\\text{grant overage} = m - s \\tag{3}', note: 'The per-seat overage: with m machines running and s seats granted, the machines beyond the grant number m - s. One licence on three machines leaves 2 beyond the grant.' },
    { kind: 'para', text: 'The app-store era added a sixth door\u2019s modern dress rather than a seventh family: the store-curated subscription and the 99-cent proprietary app are doors (vi) and (i) with a shelf in front of them. When Apple\u2019s App Store opened in July 2008 it carried about 500 apps; the shelves since have grown a thousandfold, but every item on them still sells one of the six permissions. The reader who can name the door can predict the terms before reading them.' },

    // ================================================================
    // 8. THE EULA, READ HONESTLY
    // ================================================================
    { kind: 'heading', text: 'The EULA, Read Honestly' },
    { kind: 'para', text: 'The end-user licence agreement is the long contract under the button marked agree - the document almost nobody reads and everybody signs. The honest position is between the two caricatures: it is not a trap waiting for exactly you, and it is not decoration. It is the licence\u2019s fine print, and three clauses live there that a reader-level literacy should always scroll for.' },
    { kind: 'list', marker: 'roman', items: [
      'the seat count - how many machines or users the grant covers. One licence carried onto three machines is not three purchases; it is one grant running 2 beyond the grant - a quiet breach of the terms most users never knew they made;',
      'the transfer and resale terms - whether the permission may move with the machine when you sell it, lend it, or give it away;',
      'the data clauses - what the software may collect, where it may send it, and what happens when you stop paying. The subscription door makes this clause worth reading twice: software that stops when you stop paying should also say what happens to your work when it stops.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the day-31 habits', text: 'Two calendar facts decide most accidental breaches: the trial that ends (day 31 of a 30-day shareware trial - pay or stop, and the honest stop includes uninstalling), and the seat count (the second machine is the usual trespass). Neither is piracy in the dramatic sense; both are permissions exceeded. The cure is the same as for any contract: know the number, count the machines, and let the count agree with the grant.' },

    // ================================================================
    // 9. PIRACY: THE HONEST LINE
    // ================================================================
    { kind: 'heading', text: 'Piracy: The Honest Line' },
    { kind: 'para', text: 'One paragraph, no sermon. Copying software beyond its licence takes a permission nobody granted. It is not theft of a rival\u2019s copy - the maker loses no physical thing - but it is theft of the permission itself: the maker sells exactly one product, the grant, and the unlicensed copy takes it without paying. The honest reader holds two truths at once: the wrong is real, and the legal answer to \u201csoftware should be shareable\u201d already exists - it is door four, the free and open-source world, where the sharing is the point and the four freedoms travel with every copy. If the price of a tool is beyond you, the open shelf is the honest road, not the pirated one.' },

    // ================================================================
    // 10. DOORSTEPS AND THE EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Where This Lesson Stops, and the Exam Corner' },
    { kind: 'para', text: 'The doorsteps, named as promised. Package-management internals - repositories, signatures, dependency resolution - are the operating system\u2019s craft, and this library\u2019s Operating Systems book owns that ground whole. The law of software licences is a profession of its own: this lesson teaches the literacy to read a grant, not legal advice, and any real dispute wants a lawyer, not a textbook. What this lesson keeps is the reader-level craft: bring software home by a chosen route, read a version number as a census of changes, hear an end-of-life date as arithmetic, and name a licence family on sight.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — what examinations ask of this ground', text: 'Examinations (banking and SSC computer-awareness papers, school boards, and Cambridge 9618-style syllabi) ask this lesson\u2019s ground in five shapes, all exam-style wording, never a quoted paper: (1) classify a licence - given a one-line description, name the family (freeware versus free and open-source is the favourite trap: free of charge is not free of freedom); (2) the next version - given 2.4.1 and a change type, produce the bumped number, with 1.9.9 to 1.10.0 as the anti-decimal trap; (3) update versus upgrade, and what end of life switches off; (4) the install census in order - files, registration, associations, settings, services; (5) the boot-to-update walk - why the maker keeps knocking, answered in the three honest reasons. Practise the shapes, not the wording.' },
    { kind: 'formula', name: 'The install census (five marks)', latex: '\\text{files} \\to \\text{registration} \\to \\text{associations} \\to \\text{settings} \\to \\text{service}', note: 'Installing is registering with the OS, and the five marks are the registration. Uninstalling walks them backwards; the leftover census of three (settings, caches, associations) is what an unwind can miss.' },
    { kind: 'formula', name: 'The semver bump law', latex: '\\text{MAJOR}.\\text{MINOR}.\\text{PATCH}', note: 'Bug fix: PATCH + 1 (2.4.1 to 2.4.2). New feature: MINOR + 1, PATCH reset (to 2.5.0). Breaking change: MAJOR + 1, both reset (to 3.0.0). The fields count separately: 1.9.9 plus a feature is 1.10.0, never 2.0.0.' },
    { kind: 'formula', name: 'The years-to-parity law', latex: 't_{\\text{parity}} = P / r', note: 'A perpetual licence at P against a subscription at r per year meet after P/r years - 3,000 against 120 per year meets at 25 years - and the rent continues after parity while the grant runs on.' },
    { kind: 'formula', name: 'The licence families (six doors)', latex: '\\{\\text{prop}, \\text{freeware}, \\text{shareware}, \\text{FOSS}, \\text{public domain}, \\text{SaaS}\\}', note: 'What you pay, whether the source opens, what you may do. Only door four grants the four freedoms; freeware is free of charge with the source still closed; day 31 ends the shareware trial; the seat count m against s seats leaves m - s beyond the grant.' },
    { kind: 'terms', items: [
      { term: 'software licence', def: 'the maker\u2019s grant of permission to use software under stated conditions; buying media or a key buys the permission, not the program' },
      { term: 'proprietary software', def: 'software whose licence charges for use and keeps the source code closed' },
      { term: 'freeware', def: 'software licensed free of charge with the source still closed and conditions still binding' },
      { term: 'shareware', def: 'software licensed on an honest trial: try free, then pay to keep using' },
      { term: 'free and open-source software', def: 'software whose licence grants the four freedoms: run, study and modify, redistribute, and distribute modifications' },
      { term: 'public domain', def: 'software with no rights reserved: free for any use, modification and redistribution' },
      { term: 'subscription (SaaS)', def: 'software rented by the period: the permission lasts exactly as long as the payments' },
      { term: 'end-user licence agreement (EULA)', def: 'the contract carrying the licence\u2019s fine print: seat counts, transfer terms, data clauses' },
      { term: 'end of life (EOL)', def: 'the maker\u2019s announced date after which no fixes arrive for that version' },
      { term: 'semantic versioning', def: 'the MAJOR.MINOR.PATCH convention that encodes the kind of change in the number itself' },
      { term: 'per-seat overage', def: 'machines running beyond the seats granted: m machines on s seats leave m - s beyond the grant' },
      { term: 'parity time', def: 'the years a subscription needs to cost as much as the perpetual licence it replaces: P divided by r' },
    ] },

    // ================================================================
    // CHECK YOURSELF (quiz, key [0, 2, 1, 3, 2])
    // ================================================================
    { kind: 'quiz', items: [
      { q: 'When you pay for a piece of proprietary software, what have you bought?',
        options: ['The permission to use it under stated conditions - not the program itself',
                  'The program itself, as you would buy a chair',
                  'The source code and the right to change it',
                  'A share of the maker\u2019s company and its future versions'],
        answer: 0,
        explain: 'Option A is the licence\u2019s whole idea: the grant is the product (option A). Option B is the common misconception - the copy is yours to run, not to own. Option C describes what only the free and open-source door grants; proprietary means the source stays closed. Option D confuses a purchase with an investment; no software licence sells equity.' },
      { q: 'A program reports version 2.4.1. The maker fixes one bug and ships the corrected release. Its version number is:',
        options: ['2.5.0', '3.0.0', '2.4.2', '2.4.1 again, since nothing was added'],
        answer: 2,
        explain: 'A bug fix bumps PATCH by one: 2.4.1 becomes 2.4.2 (option C). Option A (2.5.0) is the bump for a new feature - MINOR + 1 with PATCH reset. Option B (3.0.0) is the breaking-change bump. Option D is wrong because the number\u2019s entire job is to make even the smallest change visible.' },
      { q: 'Freeware is best described as:',
        options: ['Software you may use only after paying a trial fee',
                  'Software licensed free of charge while the source stays closed',
                  'Software whose source is open for anyone to modify',
                  'Software with no rights reserved at all'],
        answer: 1,
        explain: 'Freeware is free of charge, not free of freedom: the source stays closed and conditions still bind (option B). Option A inverts shareware, which is try free then pay - the opposite order. Option C describes the free and open-source family, where the source comes along. Option D is the public domain - rare, and a different door entirely.' },
      { q: 'The four freedoms - run, study and modify, redistribute, distribute modifications - belong to which licence family?',
        options: ['Every family that charges no money', 'Shareware after the trial is paid', 'Proprietary software bought at full price', 'The free and open-source family (FOSS)'],
        answer: 3,
        explain: 'The four freedoms are the definition of the free and open-source grant (option D). Option A is the classic trap: freeware charges nothing yet grants none of the four. Option B is shareware - paying ends the trial but the source stays closed. Option C is proprietary: full price buys breadth of use, never the freedoms.' },
      { q: 'A 30-day shareware trial is on its 31st day, and you still want to use the program. The honest walk is:',
        options: ['Keep using it - trials are advisory', 'Reinstall it to restart the clock', 'Pay for the licence or stop using (and uninstall) it', 'Copy it to a second machine, which the trial permits'],
        answer: 2,
        explain: 'On day 31 the grant has expired: pay or stop, and an honest stop includes uninstalling (option C). Option A misreads a contract as a suggestion. Option B games the clock - the restart trick breaches the spirit and usually the letter. Option D compounds the error with a seat-count breach; trials rarely cover a second machine at all.' },
    ] },

    // ================================================================
    // EXERCISES (15, graded; >= 4 with solution figures)
    // ================================================================
    { kind: 'exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Name the five marks of the install census, in order, and say in one line what each mark does.',
          solution: ['Recall the census as the contract the installer signs on the program\u2019s behalf.', 'Mark one, files: the program\u2019s code is copied to its permanent home on the storage shelf.', 'Mark two, registration: the OS gains the shortcut and the menu entry that make the program findable and launchable.', 'Mark three, associations: the system\u2019s table learns which file kinds this program answers for.', 'Mark four, settings: the program\u2019s preferences are written so it starts configured.', 'Mark five, service: occasionally a driver or background helper is added so the hardware and the OS can host the program.', 'Hence the five marks are files, registration, associations, settings and the occasional service.'],
          answer: 'The install census: files, registration, associations, settings, and the occasional driver or service.' },
        { q: 'A program is described as free of charge, its source stays closed, and its conditions still bind. Name the licence family, and name the family it is most often confused with.',
          solution: ['Read the three clauses against the six doors.', 'Free of charge closes the proprietary door; source closed closes the open-source door.', 'Conditions still binding confirms this is a grant, not a rights-free zone.', 'The family is freeware.', 'The confusion is with free and open-source software, whose free means the four freedoms, not the price.', 'Hence the family is freeware, most often confused with free and open-source software.'],
          answer: 'Freeware; most often confused with free and open-source software.' },
        { q: 'State the three honest reasons a maker keeps issuing updates.',
          solution: ['Recall the knocking at the door.', 'Reason one, bugs: instructions that were mis-made are repaired.', 'Reason two, security: holes that were found are plugged before they are walked through.', 'Reason three, features: work the program could not do is added.', 'Hence updates arrive to fix bugs, plug security holes, and add features.'],
          answer: 'Bugs repaired, security holes plugged, features added.' },
        { q: 'exam-style: What does end of life (EOL) mean for a version of software, and what does it NOT switch off?',
          solution: ['Take the definition apart.', 'EOL is the maker\u2019s announced date after which no fixes arrive for that version - no bug repairs and no security plugs.', 'What it does not switch off: the software itself, which keeps running exactly as installed.', 'The machine does not stop; the support does.', 'Hence EOL ends the arrivals, not the running - the version works on, unpatched.'],
          answer: 'EOL ends the arrival of fixes, not the running of the software.' },
        { q: 'A licence grants one seat. You run the software on three machines. How many machines stand beyond the grant, and what is the honest cure?',
          solution: ['Apply the overage arithmetic: machines beyond the grant are m minus s.', 'Here m is 3 machines and s is 1 seat.', 'So the overage is 3 minus 1, which is 2.', 'Two machines stand beyond the grant - a quiet breach of the terms.', 'The honest cure is to buy the seats you run (two more) or to retire the extra machines.', 'Hence the overage is 2, cured by buying up or thinning down.'],
          answer: '2 machines beyond the grant; buy two more seats or run fewer machines.', figures: [{ caption: 'The seat-count walk: one granted seat against three running machines. The granted machine stands inside the permission frame; the second and third stand beyond it, and the overage is the plain difference m - s = 3 - 1 = 2. The honest exits are drawn beneath: buy the seats you run, or thin the fleet to the grant.', svg: cf53SolSeatSvg() }] },
      ] },
      { level: 'L2', questions: [
        { q: 'From version 2.4.1, give the next version number for each change, with the reason: (a) one bug fixed; (b) one new feature; (c) a change that breaks old saved files.',
          solution: ['Read the kind of change, then apply the semver bump law.', '(a) A bug fix bumps PATCH by one: 2.4.1 becomes 2.4.2.', '(b) A new feature bumps MINOR by one and resets PATCH: 2.4.1 becomes 2.5.0.', '(c) A breaking change bumps MAJOR by one and resets both others: 2.4.1 becomes 3.0.0.', 'Each kind of change names itself in the number - that is the convention\u2019s entire point.', 'Hence the three successors are 2.4.2, 2.5.0 and 3.0.0.'],
          answer: '2.4.2 (bug fix), 2.5.0 (feature), 3.0.0 (breaking change).', figures: [{ caption: 'The bump ladder from 2.4.1: the bug-fix rung to 2.4.2 (PATCH + 1), the feature rung to 2.5.0 (MINOR + 1, PATCH reset) and the breaking rung to 3.0.0 (MAJOR + 1, both reset). Each rung carries its reason tag, so the number reads as a census of the change.', svg: cf53SolBumpSvg() }] },
        { q: 'A colleague says: from 1.9.9, one new feature makes the version 2.0.0, because 9.9 rounds up. Correct the claim and give the true successor.',
          solution: ['Spot the decimal illusion.', 'Version fields are counters, not decimals: they carry no place value and never round.', 'A new feature bumps MINOR by one and resets PATCH, leaving MAJOR untouched.', 'So MINOR 9 goes to 10, PATCH 9 resets to 0, and MAJOR stays 1.', 'The true successor is 1.10.0.', 'Hence the claim is wrong: the successor is 1.10.0, and 2.0.0 would announce a breaking change that never happened.'],
          answer: 'The successor is 1.10.0; 2.0.0 would falsely announce a breaking change.' },
        { q: 'How many releases lie on the patch ladder from 2.4.1 to 2.4.5 inclusive, and how many steps is that? Show the count.',
          solution: ['List the ladder: 2.4.1, 2.4.2, 2.4.3, 2.4.4, 2.4.5.', 'Counting the rungs gives 5 releases.', 'The steps between them are the differences: 5 minus 1, which is 4.', 'Each step is one bug fix under the bump law.', 'Hence the ladder holds 5 releases across 4 fixing steps - four releases after 2.4.1.'],
          answer: '5 releases, 4 steps (four releases after 2.4.1).' },
        { q: 'exam-style: A word processor is offered as a perpetual licence at 3,000, or a subscription at 120 per year. Compute the years to parity and state, in one honest sentence, what parity does and does not tell you.',
          solution: ['Set the two accumulations equal: 3,000 = 120 times t.', 'Divide by the yearly rent: t = 3000/120.', 'Compute: t = 25, so the rented cost meets the granted cost after 25 years.', 'What parity tells you: the crossover year the headline price never mentions.', 'What it does not tell you: which side is better - most machines retire long before 25 years, and the subscription usually bundles updates the perpetual licence sells separately.', 'Hence parity sits at 25 years, and it fixes the crossover, not the verdict.'],
          answer: 'Parity at 25 years; it names the crossover, not the better deal.', figures: [{ caption: 'The years-to-parity chart: the flat perpetual line at 3,000 against the rising rent line at 120 per year. The rent line crosses the grant line at exactly t = 25 years; before the crossing the rent is cheaper, after it the rent exceeds the grant - and continues rising while the grant runs on.', svg: cf53SolParitySvg() }] },
        { q: 'Classify each of these six grants by family: (a) try free for 30 days, then pay; (b) source open, four freedoms travel with the copy; (c) pay once, source closed, one machine; (d) no rights reserved at all; (e) 120 per year, stops when payments stop; (f) free of charge, source closed.',
          solution: ['Match each grant to its door on the street.', '(a) The trial shape is shareware.', '(b) The four freedoms with the source name free and open-source software.', '(c) Pay once, closed source, seat-limited is proprietary.', '(d) No rights reserved is the public domain.', '(e) Rent by the period is the subscription (SaaS).', '(f) Free of charge with the source closed is freeware.', 'Hence the six are: shareware, free and open-source, proprietary, public domain, subscription, freeware.'],
          answer: 'shareware, free and open-source, proprietary, public domain, subscription, freeware.', figures: [{ caption: 'The licence sort board: six scenario cards, each matched to its door on the street - the trial to shareware, the four freedoms to free and open-source, the paid closed grant to proprietary, the rights-free claim to the public domain, the monthly rent to the subscription, and the free-of-charge closed gift to freeware.', svg: cf53SolSortSvg() }] },
      ] },
      { level: 'L3', questions: [
        { q: 'A user uninstalls a program properly (through its uninstaller) yet later finds three kinds of traces. Name them, explain why each survives a proper uninstall, and say which uninstall route leaves the fewest.',
          solution: ['Recall the leftover census of three.', 'Settings survive because the uninstaller keeps them deliberately: a reinstall should find your preferences waiting.', 'Caches survive by bookkeeping: they scatter into folders whose names vary by system, and no uninstaller chases every one.', 'File associations survive by ghost-keeping: the claim can be edited, inherited or doubled, leaving a stale row that outlives its claimant.', 'The store route leaves the fewest: the catalogue that wrote the marks unwrites them from its own single ledger.', 'Hence the three are settings, caches and associations, and the shelf\u2019s own route uninstalls cleanest.'],
          answer: 'Settings, caches, file associations; the store/package route leaves the fewest.', figures: [{ caption: 'The uninstall leftovers map: the program\u2019s five install marks struck through, with the three survivors marked in place - the settings home kept for a possible return, the caches scattered in unowned folders, and the stale association row still naming the departed program. The legend carries the cure: the store route unwinds from one ledger.', svg: cf53SolLeftoverSvg() }] },
        { q: 'Windows XP drew support from October 2001 to 8 April 2014; Windows 10 from July 2015 to 14 October 2025. Compute both spans in years, the difference between them, and the gap between the two end dates in days (about 11.5 years). Then state what every reader should do with an EOL date.',
          solution: ['Take the spans first: 2014 minus 2001 gives 13 years for XP.', 'Then 2025 minus 2015 gives 10 years for Windows 10.', 'The difference: 13 minus 10, so XP drew 3 years more support.', 'The gap between ends: from 8 April 2014 to 14 October 2025 is 4,207 days - about 11.5 years.', 'The reader\u2019s walk: plan the migration before the end date, and never trust an unpatched machine with anything that matters.', 'Hence XP 13 years, Windows 10 10 years, the ends 4,207 days apart.'],
          answer: 'XP 13 years, Windows 10 10 years (3 apart), ends 4,207 days apart.', figures: [{ caption: 'The EOL timeline: XP\u2019s support bar running October 2001 to 8 April 2014 (13 years) and Windows 10\u2019s running July 2015 to 14 October 2025 (10 years), with the 4,207-day gap between the two end dates marked - about 11.5 years. The reader\u2019s duty rides beneath: plan the migration before the end, not after.', svg: cf53SolEolSvg() }] },
        { q: 'One program\u2019s whole journey, told in contracts: it arrives as a 30-day trial; on day 31 you pay; the installer walks its five marks; a year later you see 2.4.1 become 2.5.0; finally you uninstall and one kind of trace survives. Name each contract event (family, marks, bump, leftover) in order.',
          solution: ['Walk the journey stage by stage.', 'Arrival as a 30-day trial: the shareware family\u2019s honest trial.', 'Payment on day 31: the grant converts from trial to paid permission.', 'The installer\u2019s work: the five marks - files, registration, associations, settings, and the occasional service.', 'The version move 2.4.1 to 2.5.0: a MINOR bump, announcing one new feature with PATCH reset.', 'One surviving trace on uninstall: most commonly the settings, kept deliberately for a possible return.', 'Hence the journey reads: shareware trial, paid grant, the five-mark install, the 2.5.0 feature bump, the settings leftover.'],
          answer: 'Shareware trial; paid grant; the five-mark install; the 2.5.0 feature bump; the settings leftover.' },
        { q: 'exam-style: A school lab runs one proprietary licence of a design tool on three machines, has let its antivirus (freeware) trial-expire into year two unpaid, and is considering moving both tools to free and open-source alternatives. Audit the current position against the licence law of this lesson, and name what the move would change.',
          solution: ['Audit the design tool first: one seat on three machines leaves 3 minus 1, so 2 machines beyond the grant.', 'Audit the antivirus: a trial used past its end is shareware beyond day 31 - a permission expired, so pay or stop applies.', 'The current position: two quiet breaches, both of permission rather than of dramatic piracy.', 'The move to free and open-source alternatives: the seat question dissolves (freedom 0 runs anywhere), the trial question dissolves (no expiry), and the four freedoms travel with every copy.', 'What the move would not change: the craft of installing, updating and uninstalling - the census and the semver law still govern the housekeeping.', 'Hence the audit finds 2 machines and one expired trial beyond their grants, and the move converts both questions from terms to freedoms.'],
          answer: 'Two machines beyond the grant and one expired trial; the move dissolves both into the four freedoms.' },
        { q: 'The complete door census. For each of the six licence families, state in one line: what you pay, whether the source opens, and the one term that most often surprises a new reader.',
          solution: ['Door (i), proprietary: you pay for permission; source closed; the surprise is the seat count - machines beyond the grant are breaches.', 'Door (ii), freeware: free of charge; source still closed; the surprise is that conditions bind even at zero price.', 'Door (iii), shareware: try free, then pay; source closed; the surprise is day 31 - the trial\u2019s end is contractual, not advisory.', 'Door (iv), free and open-source: free as in freedom, price optional; source open; the surprise is that the freedoms travel with copies - even sold ones.', 'Door (v), public domain: nothing paid, nothing reserved; nothing to open since nothing is held; the surprise is its rarity - most claims to it are mislabels.', 'Door (vi), subscription: rent by the period; source closed (typically); the surprise is the stop - the software goes when the payments do, so your work\u2019s exit plan matters.', 'Hence the six doors read: pay-closed-seats, free-closed-conditions, trial-closed-day-31, freedom-open-copies, nothing-nothing-rarity, rent-closed-stop.'],
          answer: 'The six doors: pay/seats; free/conditions; trial/day 31; freedom/copies; rarity/nothing; rent/the stop.' },
      ] },
    ] },

  ],
}

/* part-cf5R - lesson 5.R 'Unit 5 Completion Review' (the chapter-closing review).
   Harvest numbers carried VERBATIM from the three content seats (5.1-5.3);
   the review invents no numbers, it restates the chapter at bench speed.
   Helpers prefixed cf5R so the four chapter parts never collide. */

/* palette (vivid set; never blue/indigo) */
const c5R = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f5R = 'ui-sans-serif, system-ui, sans-serif'

export const lesson5R: Lesson = {
  id: 'cf-unit-5-completion-review',
  number: '5.R',
  title: 'Unit 5 Completion Review',
  concepts: [
    'the chapter in one map: the two-family tree - system side and application side joined by the craft bridge',
    'the 24-entry catalogue: 5 OS jobs, 6 utilities, 7 worker families, 6 licence kinds',
    'the cross-lesson threads: one program\'s journey, the classify-12 roster, the boot-to-login walk',
    'the honest re-checks: time-slicing at 0.005%, the 2,600-cell grid, 20.3125 KiB, 25 years to parity, the EOL spans',
    'the formula and vocabulary harvest of the chapter',
    'the mixed bench: fifteen exam-style questions across all three lessons',
    'the doorsteps recap: what chapter 5 deliberately left closed',
  ],
  objectives: [
    'By the end of this lesson you can redraw the chapter\'s one map - the two families joined by the craft bridge, 24 catalogued entries placed - from memory.',
    'By the end of this lesson you can restate the chapter\'s engine-pinned censuses cold: the four-layer stack, the five jobs, the six utilities, the seven families, the six licences.',
    'By the end of this lesson you can chain the lessons in one move - a licence choice to an install census to a semver walk - without putting the pencil down.',
    'By the end of this lesson you can re-derive the chapter\'s arithmetic witnesses: 120 orderings, 0.005% overhead, 2,600 cells, 20.3125 KiB, 25 years to parity.',
    'By the end of this lesson you can sit the mixed bench: fifteen questions across all three lessons, at least three of them honest exam-style asks.',
  ],
  prerequisites: [
    'cf-system-software-the-manager-layer',
    'cf-application-software-the-worker-families',
    'cf-installing-updating-and-licensing-honestly',
  ],
  sources: ['cs-cf-web-ground-ch05'],
  blocks: [
    // ---------- the opening ----------
    { kind: 'para', text: 'Three lessons ago this chapter owned nothing but a working machine and a question: what actually RUNS on it, and on what terms does the running become yours? Lesson 5.1, \'System Software: The Manager Layer\', answered from the platform side - the four-layer stack, the operating system\'s five visible jobs, the six utilities, the drivers, the firmware, and the five-stage boot chain that hands a dead machine its manager. Lesson 5.2, \'Application Software: The Worker Families\', answered from the work side - seven families of workers, three uniforms for the same worker, and the spreadsheet studied close enough to count its cells. Lesson 5.3, \'Installing, Updating and Licensing Honestly\', answered from the craft side - the five-step install census, the three ways to bring software home, semantic versioning, the six licence families and the four freedoms. Three lessons plus this review: the chapter ships as $3 + 1 = 4$ seats. This review\'s job is the unit\'s oldest ritual: first put the whole chapter back together in ONE map you can redraw from memory, and then make you USE it on a mixed bench of fifteen questions - because a chapter that cannot be used was never learned. Every number below was engine-pinned before this prose was written; the review invents nothing, it restates the chapter at bench speed.' },
    { kind: 'para', text: 'A review, the earlier unit reviews taught, is not a summary but a REHEARSAL: the map first, then the census, then the recaps, then the threads that chain the lessons together, then the bench. This chapter opened with hardware nobody had hired and closes with a machine you can staff, license and keep honest; what follows walks it three times - once per lesson - with every number the seats pinned, and then hands you the bench that makes the chapter answer for itself.' },

    // ================================================================
    // 1. THE CHAPTER MAP
    // ================================================================
    { kind: 'heading', text: 'The Chapter in One Map' },
    { kind: 'para', text: 'Read the map the way it is drawn. On the **system side** (5.1) stands the manager: the operating system with its five jobs (process, memory, file system, device input/output, the user interface), its six utilities (antivirus, backup, disk cleanup and defragmenter, compression, uninstaller, task manager), its drivers - one translator per device - and its firmware, the software living on the chip; beneath the whole side runs the four-layer stack, and into it leads the five-stage boot chain. On the **application side** (5.2) stand the workers: seven families from productivity to games, each wearable in three uniforms (desktop, web, mobile), bundled or single. Joining the two runs the **craft bridge** (5.3): the five-step install census, the three ways to bring software home, semantic versioning, the six licence families and the four freedoms. Count the catalogue and the chapter\'s shape appears: $5 + 6 + 7 + 6 = 24$ catalogued entries.' },
    { kind: 'figure', caption: 'The chapter in one map (F1): the two-family tree. The system side of 5.1 (the OS with five jobs, six utilities, drivers, firmware, the 4-layer stack, the 5-stage boot chain) and the application side of 5.2 (seven worker families, three uniforms, suites) joined by the craft bridge of 5.3 (install census of 5, three ways to install, semver, six licence families, four freedoms). Twenty-four catalogued entries in all - 5 + 6 + 7 + 6. If you can redraw this from memory, you hold the chapter.', svg: cf5RMapSvg() },
    { kind: 'callout', tone: 'definition', title: 'The two-family census, defined once', text: 'The chapter\'s ground is said to be this: **software** - the set of instructions, and the data they work on, that tells the hardware what to do - splits into two families by one test, *whose job does a program do?* **System software** runs the machine and provides the platform others stand on: the operating system, the utilities, the drivers, the firmware. **Application software** does the user\'s own task, standing on that platform, in seven worker families. The **craft bridge** joins the families: installing, updating and licensing - because software is bought as well as built. Symbolically: the chapter catalogues $5 + 6 + 7 + 6 = 24$ entries, and every program you will ever meet sits somewhere on that tree.' },
    { kind: 'para', text: 'The map earns its keep by CHAINING: any two lessons compose into one move. The manager\'s file-system job is the shelf the installer writes to; the workers\' file formats are the contracts the associations point at; the licence you hold decides which uniform of the worker you may run. Hold the two families and the bridge between them, and every isolated fact in the recaps below snaps back onto its home rail.' },
    { kind: 'para', text: 'Seven witnesses carry the whole chapter on one strip, and the recaps below will keep quoting them. The stack has **4 layers**. The boot chain has **5 stages** - and $5! = 120$ possible orderings of which exactly **one** is honest. The multitasking illusion runs on **50 switches a second** costing **0.005%** of the wall clock. The spreadsheet grid holds **2,600 cells**, which store honestly as **20.3125 KiB**. The subscription arithmetic gives **25 years** to parity. The two famous EOL spans are **13 years** and **10 years**. And the counter-intuition every examination loves: $1.9.9$ plus a feature walks to **1.10.0**, never to 2.0.0. Meet them once here; the bench will expect them on demand.' },

    // ================================================================
    // 2. THE CHAPTER CENSUS
    // ================================================================
    { kind: 'heading', text: 'The Chapter Census, Checked Cold' },
    { kind: 'para', text: 'The chapter\'s catalogue re-composed by seat, the way the orchestrator re-checks it: lesson 5.1 owns the manager\'s ground - $5$ OS jobs plus $6$ utilities, so $11$ entries; lesson 5.2 owns the work side - $7$ worker families; lesson 5.3 owns the craft - $6$ licence kinds. And the two roads close on the same total: $11 + 7 + 6 = 24$, matching $5 + 6 + 7 + 6 = 24$ by kind. A census that closes two ways is a census you can quote in an examination hall without holding your breath.' },
    { kind: 'table', caption: 'The chapter census table: each seat\'s ground, its catalogued entries, and the witnesses its recap keeps quoting. Counts read from this review\'s own part; the orchestrator re-checks the assembled chapter.', head: ['The seat', 'What it owns', 'Catalogued entries', 'The witnesses to quote'], rows: [
      ['5.1 System Software: The Manager Layer', 'the platform the workers stand on', '5 OS jobs + 6 utilities = 11', '4-layer stack; boot chain of 5 stages (120 orderings); 50 switches at 0.005%'],
      ['5.2 Application Software: The Worker Families', 'the workers and their uniforms', '7 worker families', '26 x 100 = 2,600 cells; 99 additions; 20.3125 KiB honest'],
      ['5.3 Installing, Updating and Licensing Honestly', 'the craft of ownership', '6 licence kinds', 'install census of 5; 3 ways to install; 25 years to parity; XP 13 / Win10 10'],
      ['5.R Unit 5 Completion Review', 'the re-ownership: map, threads, bench', 'the 24 re-checked, plus the classify-12 roster', '5 + 7 = 12 sorted; 1.10.0; this bench of 15 questions'],
    ] },
    { kind: 'figure', caption: 'The census dashboard (F3): every pinned count of the chapter as one labelled panel - the 4-layer stack, the 5-stage boot chain with its 120 orderings, the 50 switches a second at 0.005%, the classify-12 roster of 5 + 7, the 2,600-cell grid with its 99 additions, the 20.3125 KiB of storage honesty, the 25-years-to-parity licence arithmetic, and the 13-and-10-year EOL spans. One glance, one revision card.', svg: cf5RDashboardSvg() },
    { kind: 'para', text: 'Use the dashboard as the chapter\'s index card. Each panel is one lesson\'s harvest compressed to a count you can check by hand: the stack counts its layers, the chain counts its stages and multiplies out its orderings, the grid multiplies its edges, the storage divides by $1{,}024$, the licence arithmetic divides the two prices, the EOL spans subtract their years. Eight panels, eight one-line derivations - rebuild each number and you own the chapter.' },
    { kind: 'example', title: 'Recap Illustration: the census recall run - all 24 entries, cold.', steps: [
      'Take the system side first: the OS keeps five jobs - process, memory, file system, device input/output, the shell - and the utility staff numbers six: antivirus, backup, disk cleanup/defragmenter, compression, uninstaller, task manager.',
      'So the system seat catalogues $5 + 6 = 11$ entries.',
      'Now, the application side: seven worker families - productivity, creative and media, browsers and content access, communication, education and reference, developer tools, games and simulation.',
      'Thus the workers catalogue $7$ entries.',
      'And the craft bridge: six licence kinds - proprietary/commercial, freeware, shareware, free and open source, public domain, subscription/SaaS.',
      'Hence the chapter total: $11 + 7 + 6 = 24$ catalogued entries, every one placed on the map above.',
    ], answer: '5 + 6 = 11 on the system side, 7 worker families, 6 licence kinds - 24 catalogued entries in all' },

    // ================================================================
    // 3. THE THREE PER-LESSON RECAPS (the siblings' pinned numbers,
    //    carried verbatim - the review invents no numbers)
    // ================================================================
    { kind: 'heading', text: 'Lesson 5.1 Recap: System Software - The Manager Layer' },
    { kind: 'para', text: 'Lesson 5.1 built the platform. The **four-layer stack** runs user, application software, system software, hardware - each layer talking only to its neighbours, the manager hiding the hardware\'s dialect from the workers, and firmware straddling the bottom two because the stack is a model, not a fence. The **operating system** keeps five visible jobs: (i) process management - who runs next; (ii) memory management - who owns which addresses; (iii) the file system - names on the storage shelf; (iv) device input/output through drivers; (v) the user interface, the shell, drawn as windows or typed as a command line. The **kernel** is the core that does the first four; the **shell** is the face that does the fifth. Around the OS works the specialist staff of **six utilities** - antivirus, backup, disk cleanup/defragmenter, compression, uninstaller, task manager - each one housekeeping task for the machine rather than a whole platform. The **drivers** translate: the OS speaks one standard dialect, each device its own, so seven devices need seven drivers. The **firmware** is software stored permanently on a chip inside the device, and the **boot chain** hands the machine over in five stages: power on, firmware POST (the inventory check), bootloader, OS kernel, login prompt.' },
    { kind: 'para', text: 'The lesson\'s deepest claim was the **multitasking** illusion: many programs seem to run at once because the manager rapidly switches one core between them. The pinned arithmetic: slices of $10\\text{ ms}$ shared between 2 processes give each process 50 turns a second - **50 switches** a second - and each switch costs about a microsecond, so $50\\text{ }\\mu\\text{s}$ of every second is spent switching, which is **0.005%** of the wall clock. The full re-derivation waits in the honest re-checks below; the number to carry cold is the percentage.' },
    { kind: 'callout', tone: 'insight', title: 'Why the stack hides the dialect', text: 'The stack\'s whole point is translation by layers. A word processor asks the manager for a file; the manager asks a driver for sectors; the driver speaks the device\'s private commands. No worker ever learns the hardware\'s dialect, and no device ever hears the workers\' requests - four layers, three neighbour joints, and the manager is the only bilingual party on the platform. That is why changing the hardware beneath does not rewrite every program above: the stack is a treaty, and the manager keeps the translations.' },
    { kind: 'callout', tone: 'warn', title: 'The multitasking illusion, stated honestly', text: 'Multitasking does NOT mean programs run at the same time. On one core it means the manager switches - $50$ switches a second in the pinned run - and the switching costs $50\\text{ }\\mu\\text{s}$, just $0.005\\%$ of the wall clock. The illusion is cheap enough that you never feel the seams, and expensive enough that a program that assumes it owns the core is already wrong. Say it the honest way: many programs *appear* to run at once because one core is switched between them very fast.' },
    { kind: 'callout', tone: 'historical', title: 'The manager\'s dated beats', text: 'Our own retelling, dates pinned. The first operating system is usually credited to **GM-NAA I/O, 1956**, written for the IBM 704 by its own users to automate the card-and-tape handling nobody wanted to do by hand - the manager was born as a servant, from the workers\' own exhaustion. **UNIX** followed in **1969** at Bell Labs (Thompson and Ritchie) - the small, tool-writing system whose descendants run most phones and servers today, thirteen years after GM-NAA I/O. And the graphical face arrived in two steps: the **Xerox Alto, 1973**, then the **Apple Macintosh, 1984** - eleven years between them, and fifteen after UNIX.' },

    { kind: 'heading', text: 'Lesson 5.2 Recap: Application Software - The Worker Families' },
    { kind: 'para', text: 'Lesson 5.2 stood the workers on the platform. The sorting test is the mirror of 5.1\'s: application software does the user\'s own task. The census of **seven worker families**: (i) productivity - the word processor, the spreadsheet, the presentation, the email client, four core kinds carrying three verbs: compose, compute, narrate; (ii) creative and media - photo, video, audio, desktop publishing; (iii) browsers and content access - the Web door, named but not opened; (iv) communication - chat and video calls; (v) education and reference - encyclopedias and tutors, a family this library honestly names itself into; (vi) developer tools - editors, IDEs, compilers, the bit-craft\'s workbench; (vii) games and simulation. Each family answers with its verb - compose, compute, narrate, reach, converse, learn, build, play.' },
    { kind: 'para', text: 'One family was studied close so the census would not be a list: the **spreadsheet**. Its grid runs 26 columns, A to Z, against 100 rows - $26 \\times 100 = 2{,}600$ cells - and a formula is a RECIPE the machine re-cooks whenever an ingredient changes: one SUM down a full column performs $100 - 1 = 99$ additions, every time, without complaint. The same grid prices the storage honestly: at 8 bytes a cell, $2{,}600 \\times 8 = 20{,}800$ bytes, and $20{,}800 \\div 1{,}024 = 20.3125$ KiB - the binary figure the re-checks below re-derive. The workers also come in **three uniforms** - desktop installable, web app, mobile app - the same worker changing where it lives, who updates it, and when it needs the network. And the economics of **suites**: a four-app suite at one licence against four singles at four licences - three licences saved when the spare apps are the point, dead weight when they are not. Choosing honestly closed the lesson: file formats are contracts, export before you commit, and ask the lock-in question - can your work leave?' },
    { kind: 'callout', tone: 'historical', title: 'VisiCalc and Photoshop', text: 'Two dated beats, honestly told. **VisiCalc, 1979**, on the Apple II, was the first spreadsheet - and the program that sold the machine: the \'killer app\' idea was born the day buyers chose hardware to reach one worker. **Photoshop, 1990**, by the Knoll brothers, became the creative family\'s household name - eleven years after VisiCalc. Between them they frame the chapter\'s economics: a worker family grows powerful enough that the platform is bought just to hire it.' },

    { kind: 'heading', text: 'Lesson 5.3 Recap: Installing, Updating and Licensing Honestly' },
    { kind: 'para', text: 'Lesson 5.3 taught the craft of ownership. **Installing** is more than copying files: the census runs to five steps - (i) copy the files to their home; (ii) register with the OS, the shortcuts and menu entries; (iii) claim the file associations, which program opens which kind; (iv) write the settings; (v) sometimes add a driver or background service. There are **three ways** to bring software home: the installer wizard, the store or package manager (one catalogue, one update pipe), and portable software that runs from its folder and registers nothing - no shortcuts, no associations, and therefore no leftovers. **Updating** has three honest reasons - bugs (mis-made instructions), security (plugged holes), features - and version numbers read by **semantic versioning**: MAJOR.MINOR.PATCH, where a bug fix bumps the patch ($2.4.1 \\to 2.4.2$), a new feature bumps the minor ($2.4.1 \\to 2.5.0$), and a breaking change bumps the major ($2.4.1 \\to 3.0.0$). An **update** stays on the same version line and is free; an **upgrade** crosses to a new MAJOR and may cost. And support ends even for famous software: Windows XP\'s support ended **8 April 2014** - **13 years**; Windows 10\'s ended **14 October 2025** - **10 years**.' },
    { kind: 'para', text: 'The lesson\'s honest centre was the licence: buying media or a key buys **permission**, not the program. The **six licence kinds**: proprietary/commercial (pay for permission, source closed); freeware (free of charge, source still closed, permission still limited); shareware (try free - the 30-day trial - then pay); free and open source, carrying the **four freedoms** - run for any purpose, study and modify (the source comes with it), redistribute copies, distribute your modified versions; public domain (no rights reserved, rare); and subscription/SaaS - renting the worker, pinned at 120 a year against a 3,000 perpetual licence, which is **25 years** to parity. **Uninstalling** has its own leftovers census of three - settings, caches, file associations - which is why the store route uninstalls cleanest: the registry that installed, uninstalls. The **EULA** is the long agreement you click, with its per-seat limits - one licence on three machines is two beyond the grant - and the honest reading habit is to scroll straight to the limits and the data clauses.' },
    { kind: 'callout', tone: 'historical', title: 'GNU, the FSF and Linux', text: 'The free-software movement\'s start, dated and pinned: the **GNU Project** was announced in **1983**, the **Free Software Foundation** founded in **1985**, and **Linux** was announced in **1991** - eight years after GNU - as the kernel the movement had been waiting for. Our own retelling: the four freedoms were argued into existence a decade before the system that popularised them finished booting, which is the honest way round for a principle - the licence was ready when the kernel arrived.' },
    { kind: 'example', title: 'Recap Illustration: the licence-scenario sort - six scenarios to six families.', steps: [
      'Take the six scenarios one at a time and ask what the permission actually grants.',
      'So \'pay 3,000 once, the source stays closed\' is proprietary; \'free of charge, the source still closed\' is freeware; \'try it 30 days, day 31 needs payment\' is shareware.',
      'Now, \'the four freedoms, the source comes along\' is free and open source; \'no rights reserved at all\' is public domain; \'rent it at 120 a year\' is subscription/SaaS.',
      'Check the arithmetic hiding in the last pair: $3{,}000 \\div 120 = 25$ years to parity with the perpetual price.',
      'Hence six scenarios, six families, one question behind them all: what exactly did the money buy?',
    ], answer: 'proprietary; freeware; shareware; free and open source; public domain; subscription/SaaS - the six sorted' },
    { kind: 'callout', tone: 'warn', title: 'The anti-decimal trap', text: 'Version fields are not decimals. $1.9.9$ plus one new feature bumps the MINOR field: $9 + 1 = 10$, so the honest next version is $1.10.0$ - NOT $2.0.0$, which is reserved for a breaking change. Each field counts separately; there is no carry. And $1.10.0$ IS newer than $1.9.9$: compare field by field, and $10 > 9$. This is the single most-loved semver trap in every examination style this chapter serves.' },
    { kind: 'example', title: 'Recap Illustration: semver run I - the three standard bumps from 2.4.1.', steps: [
      'Take the base version $2.4.1$ and read it as MAJOR.MINOR.PATCH.',
      'So a bug fix bumps PATCH: $2.4.1 \\to 2.4.2$ - mis-made instructions repaired, nothing else moved.',
      'Now, a new feature bumps MINOR and resets PATCH: $2.4.1 \\to 2.5.0$.',
      'Thus a breaking change bumps MAJOR and resets both: $2.4.1 \\to 3.0.0$.',
      'Hence the reading habit: the reason names the field, and the field names the bump - and an update stays inside the line while an upgrade crosses it.',
    ], answer: '2.4.2 (bug fix), 2.5.0 (feature), 3.0.0 (breaking change) - the reason names the field' },
    { kind: 'example', title: 'Recap Illustration: semver run II - the 1.9.9 branch, against the decimal instinct.', steps: [
      'Take $1.9.9$ and add exactly one new feature.',
      'So the MINOR field bumps: $9 + 1 = 10$, and the version is $1.10.0$.',
      'Now, check the trap: a decimal reading carries and offers $2.0.0$ - but $2.0.0$ is reserved for a breaking change that has not happened.',
      'Thus $1.10.0$ IS the newer version: compare field by field, and $10 > 9$.',
      'Hence the law in one line: the three fields count separately; there is no carry, and never a decimal.',
    ], answer: '1.9.9 + one new feature = 1.10.0 (never 2.0.0); and 1.10.0 is newer than 1.9.9, field by field' },

    // ================================================================
    // 4. THE CROSS-LESSON THREADS (the review's real work)
    // ================================================================
    { kind: 'heading', text: 'The Cross-Lesson Threads' },
    { kind: 'para', text: 'The recaps above keep the lessons apart; the review\'s real work is to chain them. Three threads follow, each crossing all three seats: one program\'s whole journey (a worker of 5.2, licensed by 5.3, registered by 5.1\'s OS), the classify-12 roster (5.1\'s families against 5.2\'s), and the boot-to-login walk (5.1\'s chain with 5.1\'s jobs firing in order - and 5.3\'s updating craft waiting at the end of it).' },
    { kind: 'para', text: '**Thread A: one program\'s journey.** Follow a video editor - 5.2\'s creative and media family - from first meeting to final removal. It is met as **shareware**: a 30-day trial, and on day 31 the honest fork is pay or stop; our user pays, and now holds it under a proprietary licence. The **install** runs the census of five: files copied, the program registered with the OS, associations claimed, settings written, no driver needed. The **updates** walk the version line - a bug fix takes $2.4.1 \\to 2.4.2$, a new feature takes it on to $2.5.0$, both free updates inside the line. The **uninstall**, two years on, is where honesty pays: the leftovers census of three (settings, caches, associations) is the checklist, and the store route - had it been used - would have uninstalled cleanest. One program, three lessons, zero numbers invented.' },
    { kind: 'figure', caption: 'The journey timeline (F2): one honest program\'s crossing of the whole chapter - licensed under shareware (day 31: pay or stop), installed by the five-step census, updated along the semver line 2.4.1 -> 2.4.2 -> 2.5.0, and uninstalled against the leftovers census of three. The manager of 5.1 is present at every station: it registers, associates, updates and uninstalls.', svg: cf5RJourneySvg() },
    { kind: 'example', title: 'Recap Illustration: one honest program\'s journey - a video editor from trial to uninstall.', steps: [
      'Take the worker: a video editor, a member of 5.2\'s creative and media family, first met as shareware - a 30-day trial.',
      'So day 31 arrives: the honest move is to pay for the licence or stop using it; our user pays, and the program is now held by purchase.',
      'Now, the install, by the wizard: files copied to their home; the program registered with the OS (shortcuts, menu entries); file associations claimed; settings written; no driver or service needed.',
      'Then the updates: a bug fix walks $2.4.1 \\to 2.4.2$ (a PATCH bump, free); a new feature walks $2.4.2 \\to 2.5.0$ (a MINOR bump).',
      'Check the counter-case: had the trial shipped as $1.9.9$, the feature release would be $1.10.0$ - never $2.0.0$.',
      'Thus the uninstall, two years on: the store route would remove it cleanest, and the leftovers census warns - settings, caches, file associations can outlive the program.',
    ], answer: 'shareware trial -> paid; installed by the 5-step census; 2.4.1 -> 2.4.2 -> 2.5.0; uninstalled against the 3-part leftovers census' },
    { kind: 'para', text: '**Thread B: the classify-12 roster.** Take twelve named programs and sort them with the chapter\'s one test. The system side holds five: the operating system itself, the shell (the OS\'s own face), an antivirus utility, a printer driver, the SSD\'s firmware. The application side holds seven, one per worker family: a word processor, a photo editor, a browser, a chat client, an encyclopedia, an IDE, a game. The count is pinned - $5 + 7 = 12$ - and the application side mirrors the seven families one for one, which is the whole trick of remembering it: the roster is the census, wearing names.' },
    { kind: 'callout', tone: 'theorem', title: 'The sorting test', text: 'A program is said to be **system software** if it does the machine\'s job - running the platform, keeping the house, translating for a device, living on the chip - and **application software** if it does the user\'s own task on top of that platform. Symbolically: for any program $p$, ask whose job $p$ does; the answer is one of the two families, and no third answer exists. The test needs no brand names, no prices and no versions - which is exactly why examinations set it as a scenario and why the classify-12 roster above answers it twelve times without hesitating.' },
    { kind: 'example', title: 'Recap Illustration: the classify-12 run - twelve programs sorted with reasons.', steps: [
      'Take the test that sorts ANY program: whose job does it do - the machine\'s or yours?',
      'So the system side holds five: the OS (runs the machine itself), the shell (the OS\'s own face), an antivirus (one housekeeping task), a printer driver (translates OS calls for one device), the SSD\'s firmware (software stored on the chip).',
      'Now, the application side holds seven, one per family: a word processor (productivity), a photo editor (creative and media), a browser (content access), a chat client (communication), an encyclopedia (education and reference), an IDE (developer tools), a game (games and simulation).',
      'Check the count: $5 + 7 = 12$, and the seven mirror the seven families one for one.',
      'Hence the board: 5 system-side, 7 application-side - sorted without a single brand name.',
    ], answer: '5 system-side (OS, shell, antivirus, driver, firmware) + 7 application-side (one per family) = 12' },
    { kind: 'para', text: '**Thread C: the boot-to-login walk.** Run the five-stage chain and ask which of the manager\'s five jobs is firing at each stage. At power on, none - it is the hardware\'s own beat. The firmware POST is the inventory check: it names the devices, and so names the desks the drivers will serve. The bootloader reads the shelf - the file system\'s job already at work - and loads the kernel. The kernel taking charge is four jobs coming alive at once: process, memory, file system, device input/output. And the login prompt is the fifth job firing at last: the user interface, the shell, opening the door. Five stages, five jobs, one walk - and the updating craft of 5.3 is waiting on the far side of the door, because the first thing a modern manager does after login is check for patches.' },
    { kind: 'example', title: 'Recap Illustration: the boot-to-login walk - which of the five jobs fires when.', steps: [
      'Take the chain in its one honest order: power on, firmware POST, bootloader, OS kernel, login prompt.',
      'So at power on no job fires - the hardware\'s own beat; the POST is the firmware\'s inventory check, naming the devices the drivers will serve.',
      'Now, the bootloader reads the shelf - the file system job already at work - and loads the kernel.',
      'Then the kernel takes charge: process management, memory management, the file system and device I/O all come alive at once.',
      'Thus the login prompt is the fifth job firing: the user interface, the shell, opening the door.',
      'Hence the count: $5! = 120$ orderings of the stages exist, and this is the one that boots - the other 119 ask the kernel to load before the firmware has even found the disk.',
    ], answer: 'power on -> POST -> bootloader -> kernel -> login; the shell\'s job fires last, at the door' },

    // ================================================================
    // 5. THE HONEST RE-CHECKS (re-derived, not just quoted)
    // ================================================================
    { kind: 'heading', text: 'The Honest Re-Checks' },
    { kind: 'para', text: 'A number quoted is a rumour; a number re-derived is a possession. Five of the chapter\'s witnesses are rebuilt here from their pinned inputs - the time-slicing overhead, the 2,600-cell grid, the 20.3125 KiB of storage honesty, the 25-years-to-parity arithmetic, and the two EOL spans. Each rebuild is short enough to run in an examination margin.' },
    { kind: 'derivation', title: 'The time-slicing overhead, re-derived', statement: 'The chapter pinned the multitasking illusion at 50 switches a second costing 0.005% of the wall clock. The derivation rebuilds that figure from the two pinned inputs: slices of 10 ms shared between 2 processes, and a context switch costing about 1 microsecond.', steps: [
      { label: 'Count the slice slots', formula: '1000\\text{ ms} \\div 10\\text{ ms} = 100\\text{ slots per second}', explanation: 'One second holds one thousand milliseconds; slices of ten milliseconds each give one hundred slice slots a second.' },
      { label: 'Share them between the processes', formula: '100 \\div 2 = 50\\text{ turns each}', explanation: 'Two processes alternating fill the slots between them, so each is re-entered fifty times a second - the pinned switch rate.' },
      { label: 'Price one switch', formula: '1\\text{ switch} \\approx 1\\ \\mu\\text{s}', explanation: 'The manager saves one program\'s registers and loads the other\'s; on a modern core that bookkeeping costs about a microsecond.' },
      { label: 'Total the overhead', formula: '50 \\times 1\\ \\mu\\text{s} = 50\\ \\mu\\text{s per second}', explanation: 'Fifty switches at a microsecond each spend fifty microseconds of every second on pure administration.' },
      { label: 'Convert to a percentage', formula: '50\\ \\mu\\text{s} \\div 1\\text{ s} = 0.00005 = 0.005\\%', explanation: 'Fifty microseconds is five parts in a hundred thousand of the wall clock - half of one hundredth of one percent.' },
    ], result: 'So the multitasking illusion runs on $50 \\times 1\\ \\mu\\text{s} = 50\\ \\mu\\text{s}$ a second, which is $0.005\\%$ of the wall clock - and each process waits only $20\\text{ ms}$ between its own turns.' },
    { kind: 'para', text: 'The **grid** next. The spreadsheet census multiplies its edges: 26 columns from A to Z against 100 rows is $26 \\times 100 = 2{,}600$ cells, and a SUM down one full column performs $100 - 1 = 99$ additions because the first cell opens the total and each of the other ninety-nine extends it. Fill one cell a second and the grid would take 2,600 seconds - 43 minutes and 20 seconds - which is the honest scale of the machine\'s patience next to yours.' },
    { kind: 'para', text: 'The **storage honesty** follows the grid directly. At 8 bytes a cell, the whole grid weighs $2{,}600 \\times 8 = 20{,}800$ bytes. Divide by the binary unit: $20{,}800 \\div 1{,}024 = 20.3125$ KiB, exactly. The decimal label on the box would read 20.8 kB, and $20.8 \\div 20.3125 = 1.024$ exactly - the label oversells the honest size by 2.4%, the same habit chapter 4 taught you at the gigabyte scale. A clean 20 KiB is 20,480 bytes, so this file carries 320 bytes - 0.3125 KiB - over the clean mark; that is where the fraction in 20.3125 comes from.' },
    { kind: 'para', text: 'The **licence arithmetic**. The pinned pair: a perpetual licence at 3,000 against a subscription at 120 a year. Parity comes at $3{,}000 \\div 120 = 25$ years, and the road closes both ways because $25 \\times 120 = 3{,}000$. Year 26 has the subscriber at 3,120 - into the red by 120; year 30 at 3,600; year 50 at 6,000, the perpetual price doubled. Half of parity is honest too: 12.5 years costs 1,500, exactly half. The lesson\'s economics in one line: renting is cheaper for the first quarter-century and dearer after it - and almost nobody keeps a worker that long.' },
    { kind: 'para', text: 'The **EOL spans**. Windows XP: released 2001, support ended 8 April 2014 - $2014 - 2001 = 13$ years. Windows 10: released 2015, support ended 14 October 2025 - $2025 - 2015 = 10$ years. XP outlived Win10\'s entire span by three years, and the two spans sum to twenty-three. The arithmetic is trivial; the meaning is not.' },
    { kind: 'callout', tone: 'warn', title: 'The unpatched door', text: 'End of life means the maker stops knocking: no more bug fixes, no more security plugs - and the famous name on the box does not extend the permission. An unpatched machine past EOL is a door left unlocked in a street where lock designs are public. The honest arithmetic: XP spent 13 years earning its patches, Windows 10 spent 10 - and after the last patch, the counting stops but the doors do not.' },

    // ================================================================
    // 6. THE MIXED BENCH (15 questions, L1-L3)
    // ================================================================
    { kind: 'heading', text: 'The Mixed Bench: Fifteen Questions Across the Chapter' },
    { kind: 'para', text: 'The bench is the method under examination conditions: each question is one seat\'s ground, or two seats chained. Answer with the same ritual the recaps used - name the pinned values, derive, check by a second road, then state the answer in its honest unit. The seven witnesses are fair game in every seat; quote them cold. Five of the solutions carry their own diagrams, because for those five the diagram IS the method.' },
    { kind: 'para', text: 'Score yourself honestly: an answer with the right method and a slipped digit is half marks; a remembered number with no derivation is none - the chapter priced honesty, and the bench prices derivations. At least three questions are labelled exam-style in the honest sense: phrased in our own words in the style banking, SSC, school-board and Cambridge 9618-style papers use, claiming to quote no real paper.' },
    { kind: 'exercises', title: 'Exercises 5.R - the mixed bench across the chapter', sets: [
      { level: 'L1', questions: [
        { q: 'Order the four-layer stack from top to bottom; name the layer that sits DIRECTLY above the hardware; and say which two layers firmware straddles.', solution: [
          'Take the stack as 5.1 pinned it, top to bottom: user, application software, system software, hardware.',
          'So the layer directly above the hardware is system software - the manager layer itself.',
          'Thus firmware is the honest footnote: software stored on a chip inside the device, straddling the bottom two layers - the stack is a model, not a fence.',
          'Check with the joints: four layers give three neighbour joints, and each layer talks only to its neighbours.',
        ], answer: 'user -> application -> system -> hardware; system software sits directly above the hardware; firmware straddles system and hardware' },
        { q: 'Name the operating system\'s five visible jobs, one line each, and say which of the five the shell is.', solution: [
          'Take the manager\'s duty list: process management (who runs next), memory management (who owns which addresses), the file system (names on the storage shelf), device input/output through drivers, and the user interface.',
          'So the shell IS the fifth job - the user interface, whether drawn as windows or typed as a command line.',
          'Check the split: the kernel is the core that does the first four; the shell is the face that does the fifth.',
        ], answer: 'process, memory, file system, device I/O, user interface - and the shell is job (v), the face' },
        { q: 'A spreadsheet grid has 26 columns (A to Z) and 100 rows. How many cells does it hold, and how many additions does one SUM over a full column perform?', solution: [
          'Take the grid as pinned: 26 columns against 100 rows.',
          'So the cell count is $26 \\times 100 = 2{,}600$ cells.',
          'Now, the SUM: adding 100 numbers performs $100 - 1 = 99$ additions - the first cell opens the total, each of the other ninety-nine extends it.',
          'Hence the recipe reading: change one ingredient and the machine re-cooks all 99 additions without complaint.',
        ], answer: '26 x 100 = 2,600 cells; one full-column SUM performs 99 additions' },
        { q: 'Sort the classify-12 roster with one-line reasons: the operating system, the shell, an antivirus, a printer driver, the SSD\'s firmware, a word processor, a photo editor, a browser, a chat client, an encyclopedia, an IDE, a game.', solution: [
          'Take the test: whose job does it do - the machine\'s or yours?',
          'So the system side: the OS (runs the machine), the shell (the OS\'s own face), antivirus (one housekeeping task), the printer driver (translates for one device), the SSD\'s firmware (lives on the chip).',
          'Now, the application side, one per family: word processor, photo editor, browser, chat client, encyclopedia, IDE, game.',
          'Check the count: $5 + 7 = 12$, the pinned split.',
        ], answer: '5 system-side + 7 application-side = 12 - the board drawn in the figure', figures: [{ caption: 'The classify-12 board: twelve named programs sorted by the one test - whose job does it do? Five land system-side (the OS, the shell, an antivirus, a printer driver, the SSD\'s firmware); seven land application-side, one per worker family. The count 5 + 7 = 12 is pinned.', svg: cf5RSolClassifySvg() }] },
      ] },
      { level: 'L2', questions: [
        { q: 'List the five stages of the boot chain in order. How many orderings of the five stages exist, how many are wrong, and what is the chance of guessing the honest one?', solution: [
          'Take the five stages: power on, firmware POST, bootloader, OS kernel, login prompt.',
          'So the count of orderings is $5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$.',
          'Now, exactly one ordering is honest, so 119 are wrong - and a blind guess succeeds $1 \\div 120 \\approx 0.8333\\%$ of the time.',
          'Thus the scaffold\'s logic: each station\'s duty names why it cannot move - the kernel cannot load before the firmware has found the disk.',
        ], answer: 'power on -> POST -> bootloader -> kernel -> login; 5! = 120 orderings, 1 honest, 119 wrong - a 1-in-120 guess', figures: [{ caption: 'The boot chain re-order scaffold: the five stations in the one honest order of the 120 - power on, firmware POST, bootloader, OS kernel, login prompt - each with its one-word duty and the manager\'s job that fires there. The other 119 orderings ask the impossible.', svg: cf5RSolBootSvg() }] },
        { q: 'From version 2.4.1, give the next version after (i) a bug fix, (ii) a new feature, (iii) a breaking change. Then the branch: 1.9.9 gains one new feature - what is the honest next version, and why not the decimal answer?', solution: [
          'Take 2.4.1 and read MAJOR.MINOR.PATCH.',
          'So (i) a bug fix bumps PATCH: 2.4.2; (ii) a new feature bumps MINOR and resets PATCH: 2.5.0; (iii) a breaking change bumps MAJOR and resets both: 3.0.0.',
          'Now, the branch: 1.9.9 plus a feature bumps the MINOR field to $9 + 1 = 10$, giving 1.10.0 - not 2.0.0, which is reserved for breaking changes.',
          'Check the ordering: 1.10.0 is newer than 1.9.9, field by field, because $10 > 9$.',
        ], answer: '2.4.2; 2.5.0; 3.0.0; and 1.9.9 + feature = 1.10.0 (never 2.0.0 - no carry, no decimal)', figures: [{ caption: 'The version ladder with the anti-decimal branch: the three standard bumps 2.4.1 -> 2.4.2 -> 2.5.0 -> 3.0.0, each tagged with its reason; below, 1.9.9 -> 1.10.0 with the struck-through 2.0.0 marked as the decimal-carry trap. Fields count separately.', svg: cf5RSolSemverSvg() }] },
        { q: 'Time-slicing: slices of 10 ms shared between 2 processes, each switch costing about 1 microsecond. How many switches a second? What is the overhead per second, as a percentage? What is the overhead across a full hour, and how long does each process wait between its own turns?', solution: [
          'Take the inputs: 10 ms slices, 2 processes, about $1\\ \\mu\\text{s}$ a switch.',
          'So one second holds $1000 \\div 10 = 100$ slice slots, and each process is re-entered $100 \\div 2 = 50$ times - 50 switches a second.',
          'Now, the overhead: $50 \\times 1\\ \\mu\\text{s} = 50\\ \\mu\\text{s}$ of every second, which is $0.005\\%$ of the wall clock.',
          'Thus per hour: $50 \\times 3{,}600 = 180{,}000$ switches costing $0.18$ s - still $0.005\\%$.',
          'Hence the waiting: each process waits only $10 + 10 = 20$ ms between its own turns - the illusion is cheap and quick.',
        ], answer: '50 switches/s; 50 microseconds per second = 0.005%; per hour 180,000 switches and 0.18 s; 20 ms between turns' },
        { q: 'A spreadsheet holds 2,600 cells at 8 bytes each. Give the total in bytes, the honest size in KiB, the ratio by which the decimal label oversells it, and the bytes over a clean 20 KiB.', solution: [
          'Take the grid: $2{,}600$ cells at 8 bytes each.',
          'So the total is $2{,}600 \\times 8 = 20{,}800$ bytes.',
          'Now, the honest binary size: $20{,}800 \\div 1{,}024 = 20.3125$ KiB, exactly.',
          'Thus the decimal label reads 20.8 kB, and $20.8 \\div 20.3125 = 1.024$ - the label oversells the honest size by $2.4\\%$.',
          'Check the clean mark: 20 KiB is 20,480 bytes, so the file carries 320 bytes $= 0.3125$ KiB over it.',
        ], answer: '20,800 bytes = 20.3125 KiB; the decimal 20.8 kB is 1.024x - a 2.4% oversell; 320 bytes over the clean 20 KiB', figures: [{ caption: 'The storage-honesty strip: 2,600 cells at 8 bytes each total 20,800 bytes; dividing by 1,024 gives the honest 20.3125 KiB, while the decimal label 20.8 kB runs 1.024x long - a 2.4% oversell. The 320 bytes over a clean 20 KiB are the fraction in 20.3125.', svg: cf5RSolStorageSvg() }] },
        { q: 'Name the six licence kinds with a one-line marker each. Which family carries the four freedoms - and what does day 31 of a 30-day shareware trial demand?', solution: [
          'Take the census: proprietary/commercial, freeware, shareware, free and open source, public domain, subscription/SaaS.',
          'So the markers: pay for permission with the source closed; free of charge with the source still closed; try then pay; the four freedoms with the source included; no rights reserved at all; rent by the year.',
          'Now, the four freedoms belong to free and open source alone: run for any purpose, study and modify, redistribute copies, distribute modified versions.',
          'Thus day 31 of a 30-day trial: pay for the licence or stop using it - the permission was for thirty days.',
        ], answer: 'six kinds named; the four freedoms belong to free and open source alone; day 31 demands pay-or-stop' },
      ] },
      { level: 'L3', questions: [
        { q: 'Sort six licence scenarios to their families: (a) pay 3,000 once, the source stays closed; (b) free of charge, the source still closed; (c) try it 30 days, day 31 needs payment; (d) the four freedoms, the source comes along; (e) no rights reserved at all; (f) rent it at 120 a year, stop when you stop paying.', solution: [
          'Take each scenario and ask what the money - or the lack of it - actually bought.',
          'So (a) is proprietary; (b) is freeware; (c) is shareware.',
          'Now, (d) is free and open source; (e) is public domain; (f) is subscription/SaaS.',
          'Check the board: six scenarios, six families, none left over - and the arithmetic hiding in (a) against (f) is the 25-years-to-parity run.',
        ], answer: 'proprietary; freeware; shareware; free and open source; public domain; subscription/SaaS - as the board arrows it', figures: [{ caption: 'The licence-scenario sort board: six scenarios on the left arrowed to their six families on the right - proprietary, freeware, shareware, free and open source, public domain, subscription/SaaS. The four freedoms belong to one family alone, and day 31 belongs to shareware.', svg: cf5RSolLicenceSvg() }] },
        { q: 'A perpetual licence costs 3,000; the subscription costs 120 a year. When does parity arrive? What has the subscriber paid by year 26, by year 30, and in which year does the subscription double the perpetual price? What does half of parity cost?', solution: [
          'Take the pinned pair: 3,000 once against 120 a year.',
          'So parity comes at $3{,}000 \\div 120 = 25$ years - and the road closes both ways, since $25 \\times 120 = 3{,}000$.',
          'Now, year 26: the subscriber has paid $26 \\times 120 = 3{,}120$, into the red by 120.',
          'Thus year 30 totals 3,600 (600 over), and the subscription doubles the perpetual price at year 50: $50 \\times 120 = 6{,}000$.',
          'Hence half of parity: 12.5 years costs 1,500, exactly half of 3,000.',
        ], answer: 'parity at 25 years; year 26 = 3,120 (+120); year 30 = 3,600; doubled at year 50; half-parity 12.5 years = 1,500' },
        { q: 'Windows XP\'s support ended 8 April 2014; Windows 10\'s ended 14 October 2025. State both spans in years, their difference, their sum - and the caution the chapter attaches to a machine past EOL.', solution: [
          'Take the spans as pinned: XP ran from 2001 to 2014, Windows 10 from 2015 to 2025.',
          'So XP enjoyed $2014 - 2001 = 13$ years of support, and Windows 10 enjoyed $2025 - 2015 = 10$ years.',
          'Now, the comparison: XP outlived Win10\'s whole span by 3 years, and the two spans sum to 23.',
          'Thus the caution: EOL means the maker stops the knocks - no bug fixes, no security plugs - so an unpatched machine is a door left unlocked.',
        ], answer: 'XP 13 years (to 8 April 2014); Win10 10 years (to 14 October 2025); difference 3, sum 23 - and an unpatched machine is an unlocked door' },
        { q: '(Exam-style.) A friend tries a shareware video editor for 30 days, pays on day 31, installs it from the downloaded wizard, updates it twice (first a bug fix from 2.4.1, then a new feature), and uninstalls it two years later. Name the family and the licence at each stage, the five install steps, both version numbers after the updates, and the three leftovers to check.', solution: [
          'Take the family: a video editor sits in 5.2\'s creative and media family.',
          'So the licence story: shareware through day 30; on day 31 the honest fork is pay or stop - the friend pays, holding it by purchase.',
          'Now, the install census of five: files copied to their home; registered with the OS (shortcuts, menu entries); file associations claimed; settings written; a driver or background service only sometimes - here, none.',
          'Thus the versions: the bug fix walks $2.4.1 \\to 2.4.2$ (PATCH); the new feature walks $2.4.2 \\to 2.5.0$ (MINOR).',
          'Hence the uninstall: check the leftovers census of three - settings, caches, file associations.',
        ], answer: 'creative and media; shareware -> paid; the 5-step install census; 2.4.2 then 2.5.0; leftovers: settings, caches, associations' },
        { q: '(Exam-style.) Recompose the chapter census two ways - by kind ($5 + 6 + 7 + 6$) and by seat ($11 + 7 + 6$) - and explain why the classify-12 roster counts $5 + 7$ instead of either.', solution: [
          'Take the kinds: 5 OS jobs, 6 utilities, 7 worker families, 6 licence kinds - $5 + 6 + 7 + 6 = 24$ catalogued entries.',
          'So by seat: 5.1 owns the jobs and the utilities, $5 + 6 = 11$; 5.2 owns the 7 families; 5.3 owns the 6 licence kinds; and $11 + 7 + 6 = 24$ closes both roads.',
          'Now, the classify-12 roster is a different census: it sorts twelve NAMED programs, not entry kinds - 5 system-side items against 7 application-side items, one per family.',
          'Thus the two counts measure different things: 24 catalogues what the chapter NAMES; 12 sorts what a bench question LISTS.',
        ], answer: '24 both roads (5+6+7+6 and 11+7+6); classify-12 = 5 + 7 named programs - kinds versus items' },
        { q: '(Exam-style, two parts.) (i) In one sentence each: which layer sits directly above the hardware, and what does a device driver translate between? (ii) Version 1.9.9 gains one new feature and ships; then it gains a second new feature and ships again. Give both version numbers.', solution: [
          'Take (i): the layer directly above the hardware is system software - the manager layer; and a driver translates between the operating system\'s standard calls and one device\'s private commands.',
          'So (ii), first feature: the MINOR field bumps, $9 + 1 = 10$, and the version is 1.10.0 - never 2.0.0.',
          'Now, the second feature: the MINOR field bumps again, $10 + 1 = 11$, and the version is 1.11.0.',
          'Check the ladder: $1.9.9 \\to 1.10.0 \\to 1.11.0$ - each field counts separately, no carry, no decimal.',
        ], answer: '(i) system software; a driver translates OS standard calls into one device\'s private commands; (ii) 1.10.0, then 1.11.0' },
      ] },
    ] },

    // ================================================================
    // 7. THE DOORSTEPS RECAP
    // ================================================================
    { kind: 'heading', text: 'The Doorsteps Recap' },
    { kind: 'para', text: 'Chapter 5 kept the visible census and deliberately left three doors closed - each with a doorstep book on this shelf that owns what is behind it. **\'Operating Systems\'** owns the theory this chapter refused to teach: the scheduling algorithms behind \'who runs next\', paging and virtual memory behind \'who owns which addresses\', deadlocks, and the internals of package management. **\'Computer Networks\'** owns the browser\'s plumbing - everything that happens after \'reach\' leaves the family tree. **\'Computer Organization and Architecture\'** owns the hardware door the manager stands on: privilege levels and interrupts, the mechanism by which one core is actually handed between programs. This chapter named those doors; it did not open them.' },
    { kind: 'callout', tone: 'insight', title: 'What to carry through the doors', text: 'Carry the method, not the menagerie: ask whose job a program does, then count the price. When \'Operating Systems\' teaches you the scheduler, you will already know the illusion it serves costs $0.005\\%$. When \'Computer Networks\' opens the browser\'s pipes, you will already know which family is knocking. When \'Computer Organization and Architecture\' shows you the interrupt, you will recognise the switch you priced at a microsecond. The census was the entry ticket; the theory is the show.' },

    // ================================================================
    // 8. EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Exam Corner: the Chapter as a Checklist' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner - what this chapter answers, honestly labelled', text: 'Banking and SSC computer-awareness papers, school and board computer-science examinations, and Cambridge 9618-style papers all draw on the software-families ground - classification, OS functions, utilities, drivers, boot order, version numbers and licence types. The asks below are the stable ones, phrased in OUR OWN words in the style such papers use; nothing here claims to quote a real paper. Each row carries the engine-pinned witness to quote in the margin - the fastest honest marks in the hall.' },
    { kind: 'para', text: 'The table below is the revision sheet the chapter has been building towards: seven stable asks, the seat that answers each, and the witness that earns the mark. Revise by covering the right column and reproducing it from the ask alone - the examination\'s habit is to name the ask and wait to see whether you carry the number.' },
    { kind: 'table', caption: 'The chapter\'s examination checklist: every stable ask, the lesson that answers it, and the pinned witness to quote.', head: ['The examination ask', 'The seat', 'The witness to quote'], rows: [
      ['Classify the given software (system vs application)', '5.1 + 5.2', 'the sorting test; classify-12 = 5 system-side + 7 application-side'],
      ['Order the boot sequence', '5.1', 'power on -> POST -> bootloader -> kernel -> login; 5 stages, 5! = 120 orderings, 1 honest'],
      ['Name OS functions and utility examples', '5.1', 'five jobs (process, memory, file system, device I/O, UI); six utilities'],
      ['Say what a device driver is', '5.1', 'translates the OS\'s standard calls into one device\'s private commands'],
      ['Give the next version number (semver)', '5.3', '2.4.1 -> 2.4.2 / 2.5.0 / 3.0.0; and 1.9.9 + feature -> 1.10.0, never 2.0.0'],
      ['Match licence types to scenarios', '5.3', 'six kinds; the four freedoms; day 31 of a 30-day trial = pay or stop'],
      ['Census recalls: cells, storage, parity, EOL', '5.2 + 5.3', '2,600 cells; 20.3125 KiB; 3,000 vs 120/year = 25 years; XP 13 / Win10 10 years'],
    ] },

    // ================================================================
    // 9. THE FORMULA HARVEST
    // ================================================================
    { kind: 'heading', text: 'The Formula Harvest' },
    { kind: 'para', text: 'Seven cards carry the chapter\'s structure - the two stacks and the census counts the bench will demand cold. Each card is a MOVE, not a string: order the layers, order the chain, name the field the reason bumps, count the freedoms, the licences, the install steps, and price the illusion before you trust it.' },
    { kind: 'formula', name: 'The layer stack', latex: '\\text{user} \\to \\text{application software} \\to \\text{system software} \\to \\text{hardware}', note: 'Four layers, three neighbour joints; system software sits directly above the hardware, and firmware straddles the bottom two - a model, not a fence.' },
    { kind: 'formula', name: 'The boot chain', latex: '\\text{power on} \\to \\text{firmware POST} \\to \\text{bootloader} \\to \\text{OS kernel} \\to \\text{login prompt}', note: 'Five stages; 5! = 120 orderings of which exactly one is honest - the other 119 load the kernel before the firmware finds the disk.' },
    { kind: 'formula', name: 'The semver bump rules', latex: '\\text{MAJOR.MINOR.PATCH}: \\text{ fix} \\to \\text{PATCH}, \\ \\text{feature} \\to \\text{MINOR}, \\ \\text{breaking} \\to \\text{MAJOR}', note: '2.4.1 -> 2.4.2 (fix), 2.5.0 (feature), 3.0.0 (breaking); the branch: 1.9.9 + feature = 1.10.0, never 2.0.0 - no carry, no decimal.' },
    { kind: 'formula', name: 'The four freedoms', latex: '(\\text{run}) \\ (\\text{study and modify}) \\ (\\text{redistribute}) \\ (\\text{distribute modified})', note: 'Four numbered freedoms of the free-and-open family: run for any purpose; study and modify with the source; redistribute copies; distribute your modified versions.' },
    { kind: 'formula', name: 'The licence six', latex: '(\\text{proprietary}, \\text{freeware}, \\text{shareware}, \\text{free and open}, \\text{public domain}, \\text{subscription/SaaS})', note: 'Six kinds; the parity arithmetic inside the last: 3,000 once against 120 a year = 25 years; day 31 of a 30-day trial belongs to shareware.' },
    { kind: 'formula', name: 'The install five', latex: '(\\text{copy}, \\text{register}, \\text{associate}, \\text{settings}, \\text{driver/service})', note: 'The install census: copy files to their home; register with the OS; claim file associations; write settings; sometimes add a driver or background service. Three ways to bring software home: wizard, store/package manager, portable.' },
    { kind: 'formula', name: 'The time-slicing overhead', latex: '\\text{overhead} = \\text{switches per second} \\times \\text{cost per switch}', note: '50 switches/s x about 1 microsecond = 50 microseconds per second = 0.005% of the wall clock; each of 2 processes waits 20 ms between turns.' },

    // ================================================================
    // 10. THE VOCABULARY HARVEST
    // ================================================================
    { kind: 'heading', text: 'The Vocabulary Harvest' },
    { kind: 'para', text: 'Sixteen terms, the whole chapter in defensible lines - the two families, the manager\'s parts, the workers\' ground, and the craft of ownership. The glossary takes these whole; the bench takes them as shorthand. If any definition still needs its recap to make sense, that recap is your next five minutes.' },
    { kind: 'terms', items: [
      { term: 'Software', def: 'The set of instructions, and the data they work on, that tells the hardware what to do - the chapter\'s opening definition, sorted into two families by one test: whose job does a program do?' },
      { term: 'System software', def: 'The family that runs the machine and provides the platform others stand on: the operating system with its five jobs, the six utilities, the drivers, the firmware.' },
      { term: 'Application software', def: 'The family that does the user\'s own task, standing on the platform - seven worker families from productivity to games and simulation.' },
      { term: 'Operating system', def: 'The manager layer: five visible jobs - process management, memory management, the file system, device input/output through drivers, and the user interface.' },
      { term: 'Kernel', def: 'The OS\'s core, where the first four jobs live; it takes charge at the fourth stage of the boot chain, when the login prompt is still one stage away.' },
      { term: 'Shell', def: 'The OS\'s face - job (v), the user interface, drawn as windows (GUI) or typed as a command line; it fires last in the boot walk, at the door.' },
      { term: 'Multitasking', def: 'The illusion that many programs run at once, kept by rapidly switching one core between them - 50 switches a second at about a microsecond each, 0.005% of the wall clock.' },
      { term: 'Utility software', def: 'System software that performs one housekeeping task for the machine rather than running the whole platform - six of them: antivirus, backup, disk cleanup/defragmenter, compression, uninstaller, task manager.' },
      { term: 'Device driver', def: 'The program that translates between the operating system\'s standard calls and one device\'s private commands - one driver per device, so seven devices need seven drivers.' },
      { term: 'Firmware', def: 'Software stored permanently on a chip inside the device; it runs the POST inventory check, the second stage of the boot chain, and straddles the stack\'s bottom two layers.' },
      { term: 'Installing', def: 'The act of registering a program with the operating system so it can be found, launched and entrusted with file types - the census of five: copy, register, associate, settings, driver/service.' },
      { term: 'Update vs upgrade', def: 'An update stays on the same version line and is free (2.4.1 to 2.4.2); an upgrade crosses to a new MAJOR and may cost (2.4.1 to 3.0.0).' },
      { term: 'End of life (EOL)', def: 'The date the maker stops supporting a product - Windows XP after 13 years (8 April 2014), Windows 10 after 10 years (14 October 2025); past it, an unpatched machine is a door left unlocked.' },
      { term: 'Software licence', def: 'The maker\'s grant of permission to use the software under stated conditions; buying media or a key buys the permission, not the program. Six kinds, from proprietary to subscription/SaaS.' },
      { term: 'EULA', def: 'The end-user licence agreement - the long contract behind the click, with per-seat limits (one licence on three machines is two beyond the grant) and the data clauses worth scrolling for.' },
      { term: 'SaaS', def: 'Software as a Service - the subscription uniform: the worker is rented (120 a year against a 3,000 perpetual licence is 25 years to parity), stops when you stop paying, and lives on someone else\'s platform.' },
    ] },

    // ================================================================
    // 11. CHECK YOURSELF (quiz, key pinned [3, 1, 2, 0, 1])
    // ================================================================
    { kind: 'heading', text: 'Check Yourself' },
    { kind: 'para', text: 'Five questions, one from each ridge of the review: the stack, the driver, the version branch, the freedoms and the trial. Choose before you read on - each explanation says not only why the keyed answer is right but why every other option fails.' },
    { kind: 'quiz', items: [
      { q: 'In the four-layer stack, the layer DIRECTLY above the hardware is -', options: [
        'the user',
        'application software',
        'firmware',
        'system software - the manager layer',
      ], answer: 3, explain: 'The stack runs user, application software, system software, hardware - so the layer directly above the hardware is system software, the manager that hides the hardware\'s dialect from the workers. Option (a), the user, sits at the very TOP of the stack, three joints away. Option (b), application software, sits above system software, not below it - the workers stand ON the manager, never under it. Option (c) tempts with the lesson\'s honest footnote: firmware straddles the bottom two layers because it is software stored on a chip, but the stack\'s named layer above the hardware is still system software - the model is not a fence, but the census of layers is exact. Only (d) names the layer as pinned.' },
      { q: 'A device driver translates between -', options: [
        'two application programs exchanging a file',
        'the operating system\'s standard calls and one device\'s private commands',
        'the user and the shell',
        'RAM and the SSD',
      ], answer: 1, explain: 'The driver is the translator: the OS speaks one standard dialect, each device speaks its own, and the driver converts between them - which is why one driver serves one device and seven devices need seven drivers. Option (a) describes nothing in the chapter\'s chain: two workers never translate through a driver; they exchange files through the file system. Option (c) names the shell\'s relationship, not the driver\'s: the shell is the OS\'s face to the user - job (v) - and does no device translation. Option (d) names two pieces of hardware; a driver translates between SOFTWARE calls and hardware commands, not between two memories. Only (b) states the definition as 5.1 pinned it.' },
      { q: 'Version 1.9.9 gains exactly one new feature. The honest next version is -', options: [
        '2.0.0',
        '1.9.10',
        '1.10.0',
        '1.9.9.1',
      ], answer: 2, explain: 'A new feature bumps the MINOR field: $9 + 1 = 10$, patch resets to 0, and the version is 1.10.0 - which IS newer than 1.9.9, field by field, since 10 > 9. Option (a), 2.0.0, is the decimal-carry trap the chapter warns about loudest: 2.0.0 is reserved for a BREAKING change, and no carry moves from MINOR to MAJOR. Option (b), 1.9.10, is what a bug fix would give - a PATCH bump - but a feature is not a fix. Option (d), 1.9.9.1, invents a fourth field: semver counts exactly three. Only (c) bumps the field the reason names.' },
      { q: 'The free-and-open-source licence family carries how many numbered freedoms?', options: [
        'four',
        'three',
        'six',
        'two',
      ], answer: 0, explain: 'The four freedoms, numbered in the chapter\'s own phrasing: run the program for any purpose; study and modify it (the source comes with it); redistribute copies; distribute your modified versions. Option (b), three, is the count that always misses one - usually redistribution - but the list closes at four, as GNU announced in 1983 and the FSF framed in 1985. Option (c), six, confuses the freedoms with the SIX licence kinds of the whole census - proprietary through subscription/SaaS. Option (d), two, matches the two software families, not the freedoms inside one family. Only (a) counts them as pinned.' },
      { q: 'Shareware on a 30-day trial reaches day 31. The honest position is -', options: [
        'it keeps working free forever, like freeware',
        'pay for the licence or stop using it',
        'the maker must extend the trial another 30 days',
        'the program automatically becomes public domain',
      ], answer: 1, explain: 'Shareware is permission for a trial, and the permission was for thirty days: on day 31 you pay for the licence or you stop using it - that is the whole meaning of \'try free, then pay\'. Option (a) confuses the families: freeware is free of charge with the source still closed; shareware\'s free period ends. Option (c) invents an obligation no licence in the census carries - the maker sets the trial, not the calendar. Option (d) mistakes the rarest family for an automatic exit: public domain means no rights reserved at all, and nothing lapses into it by timeout. Only (b) states the fork the chapter pins.' },
    ] },
    { kind: 'para', text: 'The chapter closes as it opened: a machine, now managed; a platform, now staffed; workers, now hired under licences you can read; a bench, now sat. Three lessons and a review: 3 + 1 = 4 seats, 24 catalogued entries, and one habit - ask whose job it does, then count the price. Next door, the network. Walk through it holding the map.' },
  ],
}

/* ================================================================
   FIGURE HELPERS (function declarations hoist)
   ================================================================ */
function cf5RT(x: number, y: number, s: string, size = 11, fill = c5R.ink, anchor = 'middle', weight = 'normal'): string {
  return `<text x="${x}" y="${y}" font-family="${f5R}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
}
function cf5RBox(x: number, y: number, w: number, h: number, fill: string, stroke: string, rx = 7): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`
}
function cf5RArrowH(x1: number, x2: number, y: number, color: string): string {
  const d = x2 > x1 ? 1 : -1
  return `<line x1="${x1}" y1="${y}" x2="${x2 - 7 * d}" y2="${y}" stroke="${color}" stroke-width="2"/><polygon points="${x2},${y} ${x2 - 8 * d},${y - 4.5} ${x2 - 8 * d},${y + 4.5}" fill="${color}"/>`
}
function cf5RArrow(x1: number, y1: number, x2: number, y2: number, color: string): string {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy)
  const ux = dx / len, uy = dy / len
  const ex = x2 - 7 * ux, ey = y2 - 7 * uy
  const px = -uy, py = ux
  return `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="${color}" stroke-width="1.8"/><polygon points="${x2},${y2} ${ex + 4.5 * px},${ey + 4.5 * py} ${ex - 4.5 * px},${ey - 4.5 * py}" fill="${color}"/>`
}

/* F1 - the chapter in one map: the two-family tree, 24 entries placed */
function cf5RMapSvg(): string {
  const W = 760, H = 448
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The chapter in one map: the two-family tree. The system side of lesson 5.1 holds the operating system with five jobs - process, memory, file system, device input and output, the user interface - six utilities from antivirus to task manager, device drivers one per device, firmware on the chip, the 4-layer stack and the 5-stage boot chain. The application side of lesson 5.2 holds the seven worker families from productivity to games, three uniforms, and suites. The craft bridge of lesson 5.3 joins them: the install census of 5, three ways to install, semver, six licence families, four freedoms. Total: 24 catalogued entries - 5 plus 6 plus 7 plus 6.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE TWO-FAMILY TREE - ONE CHAPTER, 24 CATALOGUED ENTRIES', 13, c5R.ink, 'middle', 'bold'))
  /* left panel: system side */
  s.push(cf5RBox(18, 40, 264, 310, c5R.panelA, c5R.struct))
  s.push(cf5RT(150, 60, 'SYSTEM SIDE - LESSON 5.1', 12, c5R.ink, 'middle', 'bold'))
  s.push(cf5RBox(26, 70, 248, 116, c5R.white, c5R.struct))
  s.push(cf5RT(150, 86, 'THE OPERATING SYSTEM - FIVE JOBS', 10, c5R.tealInk, 'middle', 'bold'))
  const jobs = ['(i) process - who runs next', '(ii) memory - who owns which addresses', '(iii) file system - names on the shelf', '(iv) device I/O - through drivers', '(v) user interface - the shell']
  jobs.forEach((j, i) => s.push(cf5RT(150, 102 + i * 14, j, 9.5, c5R.ink)))
  s.push(cf5RBox(26, 194, 248, 56, c5R.white, c5R.teal))
  s.push(cf5RT(150, 210, 'SIX UTILITIES', 10, c5R.tealInk, 'middle', 'bold'))
  s.push(cf5RT(150, 225, 'antivirus, backup, cleanup/defrag,', 9.5, c5R.ink))
  s.push(cf5RT(150, 239, 'compression, uninstaller, task manager', 9.5, c5R.ink))
  s.push(cf5RT(32, 266, 'DEVICE DRIVERS - one per device (7 -> 7)', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(32, 282, 'FIRMWARE - software living on the chip', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(32, 298, 'THE 4-LAYER STACK - user to hardware', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(32, 314, 'BOOT CHAIN - 5 stages to login', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(150, 340, '11 catalogued entries: 5 jobs + 6 utilities', 9.5, c5R.warn, 'middle', 'bold'))
  /* right panel: application side */
  s.push(cf5RBox(478, 40, 264, 310, c5R.panelB, c5R.conn))
  s.push(cf5RT(610, 60, 'APPLICATION SIDE - LESSON 5.2', 12, c5R.ink, 'middle', 'bold'))
  s.push(cf5RBox(486, 70, 248, 140, c5R.white, c5R.conn))
  s.push(cf5RT(610, 86, 'THE SEVEN WORKER FAMILIES', 10, c5R.conn, 'middle', 'bold'))
  const fams = ['(i) productivity - compose, compute, narrate', '(ii) creative and media - photo, video, audio', '(iii) browsers and content access - reach', '(iv) communication - converse', '(v) education and reference - learn', '(vi) developer tools - build', '(vii) games and simulation - play']
  fams.forEach((f, i) => s.push(cf5RT(610, 102 + i * 14, f, 9.5, c5R.ink)))
  s.push(cf5RT(492, 228, 'THREE UNIFORMS - desktop, web app, mobile app', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(492, 244, 'SUITES - 4 workers, 1 licence vs 4 singles', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(492, 260, 'FORMATS ARE CONTRACTS - export first', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(492, 276, 'VisiCalc 1979 - the first spreadsheet', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(610, 340, '7 catalogued entries: the families', 9.5, c5R.warn, 'middle', 'bold'))
  /* the craft bridge */
  s.push(cf5RBox(296, 40, 168, 310, c5R.white, c5R.accent))
  s.push(cf5RT(380, 60, 'THE CRAFT BRIDGE', 11, c5R.accent, 'middle', 'bold'))
  s.push(cf5RT(380, 74, 'LESSON 5.3', 9.5, c5R.accent))
  const bridge = ['install census: 5 steps', 'ways to install: 3', 'semver: 1.9.9 -> 1.10.0', 'licence families: 6', 'four freedoms: 4', 'update reasons: 3', 'leftovers census: 3', 'EOL: XP 13 yr, Win10 10 yr']
  bridge.forEach((b, i) => s.push(cf5RT(380, 100 + i * 26, b, 9.5, c5R.ink)))
  s.push(cf5RT(380, 340, '6 catalogued entries', 9.5, c5R.warn, 'middle', 'bold'))
  s.push(cf5RArrowH(284, 294, 195, c5R.mid))
  s.push(cf5RArrowH(466, 476, 195, c5R.mid))
  /* the census strip */
  s.push(cf5RBox(18, 366, 724, 66, c5R.white, c5R.accent))
  s.push(cf5RT(380, 388, 'THE CHAPTER CENSUS: 24 CATALOGUED ENTRIES', 12, c5R.accent, 'middle', 'bold'))
  s.push(cf5RT(380, 406, '5 OS jobs + 6 utilities + 7 worker families + 6 licence kinds = 24', 10.5, c5R.ink))
  s.push(cf5RT(380, 422, 'by seat: 11 + 7 + 6 = 24 - three lessons plus this review (3 + 1 = 4 seats)', 10, c5R.warn))
  s.push('</svg>')
  return s.join('')
}

/* F2 - the journey timeline: licence -> install -> update -> uninstall */
function cf5RJourneySvg(): string {
  const W = 760, H = 232
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="One program's journey across the chapter: a video editor of the creative and media family moves through four stations. Licence, lesson 5.3: shareware, a 30-day trial, and day 31 means pay or stop. Install, lesson 5.3: the census of five - copy, register, associate, settings, driver or service. Update, lesson 5.3: 2.4.1 to 2.4.2 for a bug fix, then to 2.5.0 for a feature; an update is free, an upgrade crosses to a new major. Uninstall, lesson 5.3: the leftovers census of three - settings, caches, file associations - and the store route uninstalls cleanest.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'ONE PROGRAM\'S JOURNEY - THE CROSS-LESSON THREAD', 12.5, c5R.ink, 'middle', 'bold'))
  s.push(cf5RT(380, 40, 'the worker: a video editor - lesson 5.2\'s creative and media family', 10, c5R.tealInk))
  const stations: [string, string, string, string, string, string][] = [
    ['LICENCE - 5.3', 'shareware: the 30-day trial', 'day 31: pay or stop', 'the family: shareware', 'then held by purchase', c5R.struct],
    ['INSTALL - 5.3', 'the census of five:', 'copy, register, associate,', 'settings, driver/service', 'via the installer wizard', c5R.teal],
    ['UPDATE - 5.3', '2.4.1 -> 2.4.2 (bug fix)', '2.4.2 -> 2.5.0 (feature)', 'update: free, same line', 'upgrade: new MAJOR, may cost', c5R.conn],
    ['UNINSTALL - 5.3', 'the leftovers census of 3:', 'settings, caches,', 'file associations', 'the store route is cleanest', c5R.accent],
  ]
  stations.forEach((st, i) => {
    const x = 16 + i * 182
    s.push(cf5RBox(x, 56, 166, 104, i % 2 === 0 ? c5R.panelA : c5R.panelB, st[5]))
    s.push(cf5RT(x + 83, 76, st[0], 11, st[5], 'middle', 'bold'))
    s.push(cf5RT(x + 83, 96, st[1], 9.5, c5R.ink))
    s.push(cf5RT(x + 83, 110, st[2], 9.5, c5R.ink))
    s.push(cf5RT(x + 83, 124, st[3], 9.5, c5R.ink))
    s.push(cf5RT(x + 83, 138, st[4], 9.5, c5R.ink))
    if (i < 3) s.push(cf5RArrowH(x + 168, x + 180, 108, c5R.mid))
  })
  s.push(cf5RT(380, 186, 'the version line walks 2.4.1 -> 2.4.2 -> 2.5.0; started at 1.9.9 it would walk to 1.10.0 - never to 2.0.0', 10, c5R.warn))
  s.push(cf5RT(380, 206, 'and at every station the manager of 5.1 is already there: the OS registers, associates, updates, uninstalls', 10, c5R.ink))
  s.push('</svg>')
  return s.join('')
}

/* F3 - the census dashboard */
function cf5RDashboardSvg(): string {
  const W = 760, H = 336
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The chapter's census dashboard: eight panels of pinned counts. The stack: 4 layers, user to hardware, system directly above hardware. The boot chain: 5 stages, 120 orderings, exactly 1 correct, 119 wrong. Time-slicing: 50 switches a second on 10-millisecond slices over 2 processes, about 1 microsecond a switch, 50 microseconds per second, 0.005 percent overhead. Classify-12: 5 system-side plus 7 application-side equals 12. The grid: 2,600 cells, 26 columns by 100 rows, a column SUM is 99 additions. Storage honesty: 2,600 cells at 8 bytes is 20,800 bytes = 20.3125 KiB; the decimal label 20.8 kB is 1.024 times - a 2.4 percent oversell. Licence arithmetic: 3,000 once against 120 a year, parity at 25 years, year 26 pays 3,120, year 50 pays 6,000. EOL spans: XP 13 years to 8 April 2014, Windows 10 10 years to 14 October 2025.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE CHAPTER\'S CENSUS DASHBOARD - EVERY PINNED COUNT AT ONCE', 12.5, c5R.ink, 'middle', 'bold'))
  const panels: [string, string, string, string, string, string, string][] = [
    ['THE STACK', '4 layers', 'user -> application', 'system -> hardware', 'system sits directly', 'above the hardware', c5R.struct],
    ['THE BOOT CHAIN', '5 stages', '5! = 120 orderings', 'exactly 1 correct', '119 wrong orderings', 'a blind guess: 1 in 120', c5R.teal],
    ['TIME-SLICING', '50 switches/s', '10 ms slices, 2 processes', 'about 1 microsecond each', '50 microseconds a second', '= 0.005% overhead', c5R.mid],
    ['CLASSIFY-12', '5 + 7 = 12', '5 system-side items', '7 application-side items', 'one test: whose job', 'the machine\'s or yours?', c5R.conn],
    ['THE GRID', '2,600 cells', '26 columns (A..Z)', 'x 100 rows', 'SUM one full column:', '99 additions', c5R.tealInk],
    ['STORAGE HONESTY', '20.3125 KiB', '2,600 cells x 8 bytes', '= 20,800 bytes', 'decimal label 20.8 kB', '= 1.024x - a 2.4% oversell', c5R.accent],
    ['LICENCE ARITHMETIC', '25 years', '3,000 once vs 120 a year', 'parity at year 25', 'year 26: 3,120 paid', 'year 50: 6,000 - doubled', c5R.warn],
    ['EOL SPANS', '13 and 10', 'XP: 13 years of support', '(to 8 April 2014)', 'Win10: 10 years', '(to 14 October 2025)', c5R.ink],
  ]
  panels.forEach((p, i) => {
    const x = 12 + (i % 4) * 186
    const y = 40 + Math.floor(i / 4) * 120
    s.push(cf5RBox(x, y, 178, 112, i % 2 === 0 ? c5R.panelA : c5R.panelB, p[6]))
    s.push(cf5RT(x + 89, y + 18, p[0], 10, p[6], 'middle', 'bold'))
    s.push(cf5RT(x + 89, y + 40, p[1], 13, c5R.ink, 'middle', 'bold'))
    s.push(cf5RT(x + 89, y + 58, p[2], 9, c5R.ink))
    s.push(cf5RT(x + 89, y + 71, p[3], 9, c5R.ink))
    s.push(cf5RT(x + 89, y + 84, p[4], 9, c5R.ink))
    s.push(cf5RT(x + 89, y + 97, p[5], 9, c5R.ink))
  })
  s.push(cf5RT(380, 300, 'and the chapter\'s counter-intuition: 1.9.9 + one new feature -> 1.10.0, never 2.0.0', 11, c5R.warn, 'middle', 'bold'))
  s.push(cf5RT(380, 318, 'three lessons plus this review: 3 + 1 = 4 seats, 24 catalogued entries, 7 witnesses', 10, c5R.ink))
  s.push('</svg>')
  return s.join('')
}

/* S1 - the classify-12 board (solution figure) */
function cf5RSolClassifySvg(): string {
  const W = 760, H = 368
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The classify-12 board. Left column, system side, five items: the operating system - runs the machine itself; the shell - the operating system's own face, graphical or command line; antivirus - one housekeeping task for the machine; the printer driver - translates operating-system calls for one device; the SSD's firmware - software stored on the chip. Right column, application side, seven items: word processor - productivity; photo editor - creative and media; browser - content access; chat client - communication; encyclopedia - education and reference; IDE - developer tools; a game - games and simulation. One test sorts all twelve: whose job does it do?">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE CLASSIFY-12 BOARD - 5 SYSTEM-SIDE, 7 APPLICATION-SIDE', 12, c5R.ink, 'middle', 'bold'))
  s.push(cf5RBox(20, 44, 340, 292, c5R.panelA, c5R.struct))
  s.push(cf5RT(190, 64, 'SYSTEM SIDE - 5 ITEMS', 11, c5R.ink, 'middle', 'bold'))
  const sys = ['the operating system - runs the machine itself', 'the shell - the OS\'s own face (GUI or command line)', 'antivirus - one housekeeping task for the machine', 'printer driver - translates OS calls for one device', 'SSD firmware - software stored on the chip']
  sys.forEach((it, i) => {
    const y = 78 + i * 46
    s.push(cf5RBox(32, y, 316, 26, c5R.white, c5R.struct, 5))
    s.push(cf5RT(40, y + 17, it, 9.5, c5R.ink, 'start'))
  })
  s.push(cf5RBox(400, 44, 340, 292, c5R.panelB, c5R.conn))
  s.push(cf5RT(570, 64, 'APPLICATION SIDE - 7 ITEMS', 11, c5R.ink, 'middle', 'bold'))
  const app = ['word processor - productivity (compose)', 'photo editor - creative and media', 'browser - content access (reach)', 'chat client - communication (converse)', 'encyclopedia - education and reference (learn)', 'IDE - developer tools (build)', 'a game - games and simulation (play)']
  app.forEach((it, i) => {
    const y = 78 + i * 34
    s.push(cf5RBox(412, y, 316, 22, c5R.white, c5R.conn, 5))
    s.push(cf5RT(420, y + 15, it, 9.5, c5R.ink, 'start'))
  })
  s.push(cf5RT(380, 356, 'one test sorts all twelve: whose job does it do - the machine\'s or yours?', 10.5, c5R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* S2 - the boot chain re-order scaffold (solution figure) */
function cf5RSolBootSvg(): string {
  const W = 760, H = 208
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The boot chain re-order scaffold: the one honest line of the 120 possible orderings. Station one, power on - duty: wake the machine; no operating-system job fires yet, it is the hardware's own beat. Station two, firmware POST - duty: the inventory check; the device census that tells the drivers whom to serve. Station three, bootloader - duty: choose and load; it reads the file system, so job three is already working. Station four, OS kernel - duty: take charge; jobs one to four come alive: process, memory, file, device. Station five, login prompt - duty: open the door; job five fires - the shell, the user interface. The other 119 orderings are wrong: the kernel cannot load before the firmware finds the disk.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE BOOT CHAIN RE-ORDERED - THE ONE HONEST LINE OF 120', 12, c5R.ink, 'middle', 'bold'))
  const st: [string, string, string, string, string][] = [
    ['POWER ON', 'duty: wake the machine', 'no OS job fires yet -', 'the hardware\'s own beat', ''],
    ['FIRMWARE POST', 'duty: the inventory check', 'the device census that', 'tells drivers whom to serve', ''],
    ['BOOTLOADER', 'duty: choose and load', 'reads the file system -', 'job (iii) already working', ''],
    ['OS KERNEL', 'duty: take charge', 'jobs (i)-(iv) alive:', 'process, memory, file,', 'device I/O'],
    ['LOGIN PROMPT', 'duty: open the door', 'job (v) fires: the shell', 'the user interface', 'waits for you'],
  ]
  st.forEach((k, i) => {
    const x = 14 + i * 150
    s.push(cf5RBox(x, 44, 134, 104, i % 2 === 0 ? c5R.panelA : c5R.panelB, c5R.teal))
    s.push(cf5RT(x + 67, 64, k[0], 10.5, c5R.tealInk, 'middle', 'bold'))
    s.push(cf5RT(x + 67, 82, k[1], 9, c5R.ink))
    s.push(cf5RT(x + 67, 98, k[2], 9, c5R.ink))
    s.push(cf5RT(x + 67, 111, k[3], 9, c5R.ink))
    if (k[4]) s.push(cf5RT(x + 67, 124, k[4], 9, c5R.ink))
    if (i < 4) s.push(cf5RArrowH(x + 136, x + 148, 96, c5R.accent))
  })
  s.push(cf5RT(380, 172, 'the other 119 orderings are wrong: the kernel cannot load before the firmware has found the disk', 10, c5R.ink))
  s.push(cf5RT(380, 190, '5 stages -> 5! = 120 orderings -> exactly 1 honest line', 10.5, c5R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* S3 - the semver ladder with the anti-decimal branch (solution figure) */
function cf5RSolSemverSvg(): string {
  const W = 760, H = 264
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The version ladder and the anti-decimal branch. Top row: 2.4.1 gains a bug fix and becomes 2.4.2; gains a new feature and becomes 2.5.0; gains a breaking change and becomes 3.0.0. An update stays inside the line and is free; an upgrade crosses to a new major and may cost. Bottom row: 1.9.9 gains one new feature and becomes 1.10.0, because the minor field counts 9 plus 1 equals 10. The struck-through 2.0.0 is the decimal-carry trap: each field counts separately, there is no carry into major, and 1.10.0 is newer than 1.9.9 field by field.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE VERSION LADDER - AND THE ANTI-DECIMAL BRANCH', 12, c5R.ink, 'middle', 'bold'))
  const ladder: [string, string][] = [['2.4.1', ''], ['2.4.2', '+ bug fix'], ['2.5.0', '+ new feature'], ['3.0.0', '+ breaking change']]
  ladder.forEach((v, i) => {
    const x = 24 + i * 128
    s.push(cf5RBox(x, 52, 96, 36, c5R.panelA, c5R.struct))
    s.push(cf5RT(x + 48, 75, v[0], 12, c5R.ink, 'middle', 'bold'))
    if (i < 3) {
      s.push(cf5RArrowH(x + 98, x + 126, 70, c5R.mid))
      s.push(cf5RT(x + 112, 44, v[1], 9, c5R.mid))
    }
  })
  s.push(cf5RT(540, 62, 'the three standard bumps:', 10, c5R.tealInk, 'start', 'bold'))
  s.push(cf5RT(540, 78, 'PATCH for fixes, MINOR for features,', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(540, 92, 'MAJOR for breaking changes', 9.5, c5R.ink, 'start'))
  /* the 1.9.9 branch */
  s.push(cf5RBox(24, 150, 96, 36, c5R.panelB, c5R.conn))
  s.push(cf5RT(72, 173, '1.9.9', 12, c5R.ink, 'middle', 'bold'))
  s.push(cf5RArrowH(122, 150, 168, c5R.mid))
  s.push(cf5RT(136, 142, '+ new feature', 9, c5R.mid))
  s.push(cf5RBox(152, 150, 110, 36, c5R.panelB, c5R.struct))
  s.push(cf5RT(207, 173, '1.10.0', 13, c5R.struct, 'middle', 'bold'))
  s.push(cf5RT(207, 204, 'the MINOR field: 9 + 1 = 10', 9.5, c5R.tealInk))
  /* the crossed red branch to 2.0.0 */
  s.push(`<line x1="122" y1="192" x2="298" y2="192" stroke="${c5R.warn}" stroke-width="2" stroke-dasharray="5,4"/>`)
  s.push(`<polygon points="306,192 297,187.5 297,196.5" fill="${c5R.warn}"/>`)
  s.push(cf5RBox(310, 174, 96, 36, c5R.white, c5R.warn))
  s.push(cf5RT(358, 197, '2.0.0', 12, c5R.warn, 'middle', 'bold'))
  s.push(`<line x1="314" y1="192" x2="402" y2="192" stroke="${c5R.warn}" stroke-width="2.5"/>`)
  s.push(cf5RT(358, 226, 'the decimal-carry trap', 9.5, c5R.warn, 'middle', 'bold'))
  s.push(cf5RT(440, 160, 'each field counts separately:', 10, c5R.ink, 'start', 'bold'))
  s.push(cf5RT(440, 176, 'there is no carry into MAJOR', 10, c5R.ink, 'start'))
  s.push(cf5RT(440, 192, 'and 1.10.0 > 1.9.9 field by field', 10, c5R.ink, 'start'))
  s.push(cf5RT(380, 250, 'update = same line, free (2.4.2) - upgrade = new MAJOR, may cost (3.0.0)', 10, c5R.ink))
  s.push('</svg>')
  return s.join('')
}

/* S4 - the licence-scenario sort board (solution figure) */
function cf5RSolLicenceSvg(): string {
  const W = 760, H = 336
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The licence-scenario sort board: six scenarios on the left arrowed to their six families on the right. Pay 3,000 once with the source closed goes to proprietary. Free of charge with the source still closed goes to freeware. A 30-day trial with day 31 needing payment goes to shareware. The four freedoms with the source included goes to free and open source. No rights reserved at all goes to public domain. Renting at 120 a year goes to subscription and SaaS. The four freedoms belong to free and open source alone, and day 31 belongs to shareware.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE LICENCE-SCENARIO SORT - SIX SCENARIOS, SIX FAMILIES', 12, c5R.ink, 'middle', 'bold'))
  const chips = ['pay 3,000 once; the source stays closed', 'free of charge; the source still closed', 'try it 30 days; day 31 needs payment', 'four freedoms; the source comes along', 'no rights reserved at all (rare)', 'rent it: 120 a year, stop when you stop']
  const fams = ['FREWARE - free of charge, source closed', 'SUBSCRIPTION / SaaS - rented by the year', 'PUBLIC DOMAIN - no rights reserved', 'PROPRIETARY - pay for permission', 'SHAREWARE - trial, then pay', 'FREE AND OPEN SOURCE - the four freedoms']
  /* mapping: chip i -> family row */
  const map = [3, 0, 4, 5, 2, 1]
  chips.forEach((c, i) => {
    const y = 44 + i * 40
    s.push(cf5RBox(20, y, 300, 32, c5R.panelA, c5R.struct, 5))
    s.push(cf5RT(32, y + 20, c, 9.5, c5R.ink, 'start'))
  })
  fams.forEach((f, i) => {
    const y = 44 + i * 40
    s.push(cf5RBox(440, y, 300, 32, c5R.panelB, c5R.conn, 5))
    s.push(cf5RT(452, y + 20, f, 9.5, c5R.ink, 'start'))
  })
  map.forEach((row, i) => {
    const y1 = 44 + i * 40 + 16
    const y2 = 44 + row * 40 + 16
    s.push(cf5RArrow(322, y1, 436, y2, c5R.teal))
  })
  s.push(cf5RT(380, 306, 'the four freedoms belong to free and open source alone; day 31 of a trial belongs to shareware', 10, c5R.ink))
  s.push(cf5RT(380, 324, 'and the parity arithmetic: 3,000 once against 120 a year = 25 years to parity', 10, c5R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* S5 - the storage-honesty strip (solution figure) */
function cf5RSolStorageSvg(): string {
  const W = 760, H = 244
  const s: string[] = []
  const SCALE = 17
  const wBin = 20.3125 * SCALE
  const wDec = 20.8 * SCALE
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The storage honesty strip: 2,600 cells at 8 bytes each total 20,800 bytes; dividing by 1,024 gives the honest 20.3125 KiB. Two bars compare: the honest binary bar at 20.3125 KiB and the decimal label bar at 20.8 kB, which is 1.024 times as long - a 2.4 percent oversell. A clean 20 KiB is 20,480 bytes, so the file carries 320 bytes over, which is the 0.3125 in 20.3125.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE STORAGE HONESTY - FROM 2,600 CELLS TO 20.3125 KiB', 12, c5R.ink, 'middle', 'bold'))
  const chain: [string, string][] = [
    ['2,600 CELLS', '26 columns x 100 rows'],
    ['EACH CELL', '8 bytes'],
    ['TOTAL', '20,800 bytes'],
    ['HONEST DIVIDE', 'by 1,024'],
    ['HONEST SIZE', '20.3125 KiB'],
  ]
  chain.forEach((c, i) => {
    const x = 12 + i * 153
    s.push(cf5RBox(x, 42, 124, 54, i % 2 === 0 ? c5R.panelA : c5R.panelB, i === 4 ? c5R.struct : c5R.teal))
    s.push(cf5RT(x + 62, 63, c[0], 10.5, i === 4 ? c5R.struct : c5R.tealInk, 'middle', 'bold'))
    s.push(cf5RT(x + 62, 82, c[1], 10, c5R.ink, 'middle', i === 4 ? 'bold' : 'normal'))
    if (i < 4) s.push(cf5RArrowH(x + 126, x + 151, 69, c5R.mid))
  })
  s.push(cf5RT(140, 135, 'binary, honest:', 9.5, c5R.tealInk, 'end'))
  s.push(`<rect x="150" y="120" width="${wBin}" height="22" rx="4" fill="${c5R.teal}"/>`)
  s.push(cf5RT(150 + wBin + 8, 135, '20.3125 KiB', 10, c5R.tealInk, 'start', 'bold'))
  s.push(cf5RT(140, 167, 'decimal, on the box:', 9.5, c5R.conn, 'end'))
  s.push(`<rect x="150" y="152" width="${wDec}" height="22" rx="4" fill="${c5R.conn}"/>`)
  s.push(cf5RT(150 + wDec + 8, 167, '20.8 kB = 1.024x', 10, c5R.conn, 'start', 'bold'))
  s.push(cf5RT(380, 208, 'the decimal label oversells the honest size by exactly 1.024x - a 2.4% boast', 10, c5R.warn, 'middle', 'bold'))
  s.push(cf5RT(380, 228, 'a clean 20 KiB is 20,480 bytes; the file carries 320 bytes = 0.3125 KiB over the clean mark', 10, c5R.ink))
  s.push('</svg>')
  return s.join('')
}


export const chapter5: Chapter = {
  number: 5,
  slug: 'software-families',
  title: 'Software Families',
  summary: 'System software versus application software priced on the reader\u2019s own machine: what an operating system visibly does (the manager layer \u2014 the full story is Operating Systems\u2019), utilities, productivity and creative families, and the practical craft of installing, updating and licensing software honestly.',
  status: 'complete',
  lessons: [
    lesson51, lesson52, lesson53, lesson5R,
  ],
  plannedLessons: [],
}
