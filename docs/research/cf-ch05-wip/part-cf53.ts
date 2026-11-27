import type { Lesson } from '../../../src/data/library/types'

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


