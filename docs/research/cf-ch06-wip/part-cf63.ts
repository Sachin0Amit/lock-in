import type { Lesson } from '../../../src/data/library/types'

/**
 * part-cf63.ts — CS RUN 11 seat cf63.
 *
 * Lesson 6.3 'Browsing the Web: the Citizen's Vocabulary' of Computer
 * Fundamentals chapter 6 'Connecting Computers'. The citizen's kit for
 * the Web, told honestly: the Internet as infrastructure and the Web as
 * one service riding it (MDN's line: the Internet is the backbone of
 * the Web); the browser census (Chrome, Firefox, Safari, Opera, Edge,
 * with Edge as Internet Explorer's successor of the 1995 browser-war
 * generation) and Mosaic, NCSA, 1993, the first popular graphical
 * browser; the URL dissected to 5 top-level parts with an authority of
 * 3 sub-parts and ports 80 = HTTP, 443 = HTTPS (53 = DNS from lesson
 * 6.2); HTTP as the two-message dance, stateless, with 404 as the
 * honest page-not-found answer, and the 5-beat fetch order DNS ->
 * TCP -> request -> response -> render; HTTPS as HTTP over TLS (the
 * old name SSL survives in speech); search engines against typed URLs;
 * cookies as the memory patches (Netscape, 1994, first-time against
 * returning visitors); and phishing named honestly with the examp1e
 * lookalike-domain trick. 'Full-Stack Web Development' owns building
 * pages; 'Cybersecurity' owns the full threat model.
 *
 * Every number printed here is pinned green by v-cf63.ts (the engine
 * ran GREEN before this prose was written; the pin block closes the
 * ring). All figures are self-contained computed SVGs in the house
 * palette; every geometry constant is derived, never eyeballed.
 * Study-never-reproduce: every roster, witness, figure, Illustration,
 * quiz item and exercise is OUR OWN.
 */

/* palette (vivid set; never blue/indigo) — SPEC_CORE */
const c63 = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f63 = 'ui-sans-serif, system-ui, sans-serif'

/* text helper — one canonical attribute order (x, y, size, fill,
   anchor) so the engine's clip audit can parse every label */
function cf63T(x: number, y: number, size: number, fill: string, anchor: 'start' | 'middle' | 'end', txt: string, bold = false): string {
  return `<text x="${x}" y="${y}"${bold ? ' font-weight="bold"' : ''} font-size="${size}" fill="${fill}" text-anchor="${anchor}">${txt}</text>`
}

/* vertical double-headed arrow (service <-> internet) */
function cf63DoubleV(x: number, y1: number, y2: number, color: string): string {
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${color}" stroke-width="2"/>`
    + `<polygon points="${x - 5},${y1 + 9} ${x + 5},${y1 + 9} ${x},${y1}" fill="${color}"/>`
    + `<polygon points="${x - 5},${y2 - 9} ${x + 5},${y2 - 9} ${x},${y2}" fill="${color}"/>`
}

/* horizontal one-way arrow */
function cf63ArrowH(x1: number, x2: number, y: number, color: string): string {
  return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="2.4"/>`
    + `<polygon points="${x2 - 8},${y - 5} ${x2 - 8},${y + 5} ${x2},${y}" fill="${color}"/>`
}

/* horizontal double-headed arrow */
function cf63DoubleH(x1: number, x2: number, y: number, color: string): string {
  return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="2.4"/>`
    + `<polygon points="${x1 + 8},${y - 5} ${x1 + 8},${y + 5} ${x1},${y}" fill="${color}"/>`
    + `<polygon points="${x2 - 8},${y - 5} ${x2 - 8},${y + 5} ${x2},${y}" fill="${color}"/>`
}

/* a downward-opening bracket under a span (the dissection brace) */
function cf63Brace(x1: number, x2: number, y: number, color: string): string {
  return `<path d="M ${x1} ${y} L ${x1} ${y + 6} L ${x2} ${y + 6} L ${x2} ${y}" fill="none" stroke="${color}" stroke-width="1.6"/>`
}

/* ================================================================== */
/* BODY FIGURE A - THE STACK, DRAWN HONESTLY: services ride the       */
/* Internet bar, which rides the physical media bar                   */
/* ================================================================== */
function cf63StackSvg(): string {
  const W = 760
  const H = 376
  const svc = [
    { name: 'THE WEB', n1: 'pages written in HTML,', n2: 'found by URLs, moved by HTTP' },
    { name: 'EMAIL', n1: 'a DIFFERENT service', n2: 'riding the same wires' },
    { name: 'OTHER SERVICES', n1: 'file transfer, streaming,', n2: 'voice and video calls' },
  ]
  const bw = 216
  const x0 = 36
  const gap = 236
  const top = 64
  const bh = 58
  const iy = 168
  const ih = 60
  const my = 252
  const mh = 54
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The stack drawn honestly, in three layers. At the top sit three application service boxes side by side: the Web (pages written in HTML, found by URLs, moved by HTTP), email (a different service riding the same wires), and other services (file transfer, streaming, voice and video calls). Each service box connects by a double-headed vertical arrow down to the Internet bar - the infrastructure of wires, routers and TCP/IP protocols from lesson 6.2. The Internet bar connects by two further double-headed arrows down to the physical media bar of fibre, copper and radio. The footer carries MDN's honest line: the Internet is the backbone of the Web, and email is a different service on the same backbone.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE STACK, DRAWN HONESTLY - SERVICES RIDE THE INTERNET', true))
  s.push(cf63T(W / 2, 44, 9.5, c63.tealInk, 'middle', 'the Web is ONE service on the infrastructure - and it is not the only one'))
  svc.forEach((v, k) => {
    const x = x0 + k * gap
    s.push(`<rect x="${x}" y="${top}" width="${bw}" height="${bh}" rx="7" fill="${c63.white}" stroke="${c63.teal}" stroke-width="2"/>`)
    s.push(cf63T(x + bw / 2, top + 20, 11, c63.ink, 'middle', v.name, true))
    s.push(cf63T(x + bw / 2, top + 37, 9.5, c63.tealInk, 'middle', v.n1))
    s.push(cf63T(x + bw / 2, top + 50, 9.5, c63.tealInk, 'middle', v.n2))
  })
  const centers = [0, 1, 2].map((k) => x0 + k * gap + bw / 2)
  centers.forEach((cx) => s.push(cf63DoubleV(cx, top + bh + 2, iy - 2, c63.conn)))
  s.push(cf63T(centers[1] + 14, 140, 9.5, c63.tealInk, 'start', 'requests go down the wire,'))
  s.push(cf63T(centers[1] + 14, 155, 9.5, c63.tealInk, 'start', 'payloads come back up'))
  s.push(`<rect x="${x0}" y="${iy}" width="${W - 2 * x0}" height="${ih}" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2.5"/>`)
  s.push(cf63T(W / 2, iy + 24, 11.5, c63.ink, 'middle', 'THE INTERNET - THE INFRASTRUCTURE', true))
  s.push(cf63T(W / 2, iy + 44, 9.5, c63.tealInk, 'middle', 'the wires, the routers and the TCP/IP protocols of lesson 6.2'))
  s.push(cf63DoubleV(200, iy + ih + 2, my - 2, c63.conn))
  s.push(cf63DoubleV(560, iy + ih + 2, my - 2, c63.conn))
  s.push(`<rect x="${x0}" y="${my}" width="${W - 2 * x0}" height="${mh}" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2.5"/>`)
  s.push(cf63T(W / 2, my + 22, 11.5, c63.ink, 'middle', 'PHYSICAL MEDIA', true))
  s.push(cf63T(W / 2, my + 40, 9.5, c63.tealInk, 'middle', 'fibre, copper and radio - the ground the whole stack stands on'))
  s.push(`<rect x="${x0}" y="318" width="${W - 2 * x0}" height="44" rx="8" fill="${c63.faint}" stroke="${c63.tealInk}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 336, 10.5, c63.tealInk, 'middle', "MDN's honest line: the Internet is the backbone of the Web", true))
  s.push(cf63T(W / 2, 352, 9.5, c63.tealInk, 'middle', 'email is a different service on the same backbone - 3 services drawn, 1 infrastructure'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE B - THE URL, DISSECTED: the pinned example with        */
/* braces for the 5 top-level parts and the authority's 3 sub-parts   */
/* ================================================================== */
function cf63UrlSvg(): string {
  const W = 760
  const H = 254
  const CH = 7.6
  const segs: { t: string; c: string }[] = [
    { t: 'https', c: c63.teal },
    { t: '://', c: c63.ink },
    { t: 'www', c: c63.accent },
    { t: '.', c: c63.ink },
    { t: 'example.co.in', c: c63.conn },
    { t: ':', c: c63.ink },
    { t: '443', c: c63.warn },
    { t: '/', c: c63.ink },
    { t: 'textbook/ch6.htm', c: c63.struct },
    { t: '?', c: c63.ink },
    { t: 'q=glassdoor', c: c63.tealInk },
    { t: '#', c: c63.ink },
    { t: 'sec2', c: c63.mid },
  ]
  const total = segs.reduce((a, g) => a + g.t.length, 0) * CH
  const pos: Record<string, number> = {}
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The pinned example URL dissected with braces. The URL reads https www example.co.in 443 textbook slash ch6.htm question q equals glassdoor hash sec2. Braces under it mark the 5 top-level parts: the scheme https, the authority www.example.co.in colon 443, the path textbook slash ch6.htm, the parameters q equals glassdoor, and the anchor sec2. A second, nested row of braces splits the authority into its 3 sub-parts: the subdomain www, the domain example.co.in, and the port 443. The census panel below counts 5 top-level parts and 3 sub-parts of the authority, notes that an untyped port is assumed (443 for https, 80 for http), and lists the port census 80 for HTTP, 443 for HTTPS and 53 for DNS from lesson 6.2.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE URL, DISSECTED - ONE ADDRESS, FIVE TOP-LEVEL PARTS', true))
  s.push(cf63T(W / 2, 44, 9.5, c63.tealInk, 'middle', 'the pinned example, split by machine, every brace under its own segment'))
  let x = (W - total) / 2
  for (const g of segs) {
    s.push(cf63T(x, 64, 13, g.c, 'start', g.t, true))
    pos[g.t] = x
    x += g.t.length * CH
  }
  /* level 1: the 5 top-level parts */
  const l1: [number, number, string, string][] = [
    [pos['https'], pos['https'] + 5 * CH, c63.teal, 'SCHEME'],
    [pos['www'], pos['443'] + 3 * CH, c63.conn, 'AUTHORITY'],
    [pos['/'], pos['textbook/ch6.htm'] + 16 * CH, c63.struct, 'PATH'],
    [pos['?'], pos['q=glassdoor'] + 11 * CH, c63.tealInk, 'PARAMETERS'],
    [pos['#'], pos['sec2'] + 4 * CH, c63.mid, 'ANCHOR'],
  ]
  for (const [a, b, col, lab] of l1) {
    s.push(cf63Brace(a, b, 74, col))
    s.push(cf63T((a + b) / 2, 94, 9.5, col, 'middle', lab, true))
  }
  /* level 2: the authority's 3 sub-parts */
  const l2: [number, number, string, string][] = [
    [pos['www'], pos['www'] + 3 * CH, c63.accent, 'SUBDOMAIN'],
    [pos['example.co.in'], pos['example.co.in'] + 13 * CH, c63.conn, 'DOMAIN'],
    [pos[':'], pos['443'] + 3 * CH, c63.warn, 'PORT'],
  ]
  for (const [a, b, col, lab] of l2) {
    s.push(cf63Brace(a, b, 104, col))
    s.push(cf63T((a + b) / 2, 124, 9.5, col, 'middle', lab, true))
  }
  s.push(`<rect x="36" y="138" width="${W - 72}" height="58" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 158, 10.5, c63.ink, 'middle', 'THE CENSUS: 5 top-level parts - scheme, authority, path, parameters, anchor', true))
  s.push(cf63T(W / 2, 175, 9.5, c63.tealInk, 'middle', 'the authority hides 3 sub-parts - subdomain, domain, port'))
  s.push(cf63T(W / 2, 190, 9.5, c63.tealInk, 'middle', 'type no port and the browser assumes it: 443 for https, 80 for http'))
  s.push(`<rect x="36" y="204" width="${W - 72}" height="40" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 221, 10, c63.ink, 'middle', 'PORTS: 80 = HTTP - 443 = HTTPS - 53 = DNS (the ladder of lesson 6.2, the first beat of every fetch)', true))
  s.push(cf63T(W / 2, 236, 9.5, c63.tealInk, 'middle', '63 characters, one address: no two working URLs name the same page'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE C - THE TWO-MESSAGE DANCE: request, response, the     */
/* 404 branch, and the same dance wrapped in TLS for HTTPS            */
/* ================================================================== */
function cf63DanceSvg(): string {
  const W = 760
  const H = 396
  const s: string[] = []
  const box = (x: number, y: number, w: number, h: number, l1: string, l2: string) => {
    s.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${c63.white}" stroke="${c63.teal}" stroke-width="2"/>`)
    s.push(cf63T(x + w / 2, y + h / 2 - 4, 10.5, c63.ink, 'middle', l1, true))
    s.push(cf63T(x + w / 2, y + h / 2 + 13, 9.5, c63.tealInk, 'middle', l2))
  }
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The two-message dance of HTTP, drawn twice. Top panel, plain HTTP on port 80: a browser box on the left and a web server box on the right; step 1 is a request arrow from the browser to the server reading GET the path; step 2 is a response arrow back carrying the page itself. A dashed branch drops from the server to a 404 Not Found panel - the honest answer when the path has no page - and a companion panel notes that HTTP is stateless, with no memory between requests. Bottom panel, HTTPS on port 443: the same browser and server boxes, but both arrows now pass through a TLS band that wraps the messages in encryption - ciphertext on the wire - and the padlock in the address bar says the wrap is on.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE TWO-MESSAGE DANCE - HTTP, THEN THE SAME DANCE WRAPPED', true))
  s.push(cf63T(W / 2, 44, 9.5, c63.tealInk, 'middle', 'one request, one response - and the honest 404 branch when the path has no page'))
  /* plain HTTP panel */
  s.push(cf63T(W / 2, 66, 11, c63.teal, 'middle', 'PLAIN HTTP - PORT 80', true))
  box(48, 76, 180, 60, 'YOUR BROWSER', 'the client - it asks')
  box(532, 76, 180, 60, 'THE WEB SERVER', 'the site - it answers')
  s.push(cf63T(380, 90, 9.5, c63.ink, 'middle', 'STEP 1 - THE REQUEST: GET /textbook/ch6.htm', true))
  s.push(cf63ArrowH(236, 524, 100, c63.conn))
  s.push(cf63ArrowH(524, 236, 130, c63.struct))
  s.push(cf63T(380, 150, 9.5, c63.ink, 'middle', 'STEP 2 - THE RESPONSE: the page itself (or an error)', true))
  s.push(`<line x1="622" y1="136" x2="622" y2="164" stroke="${c63.warn}" stroke-width="1.8" stroke-dasharray="5 4"/>`)
  s.push(`<polygon points="617,158 627,158 622,167" fill="${c63.warn}"/>`)
  s.push(`<rect x="444" y="168" width="300" height="56" rx="8" fill="${c63.white}" stroke="${c63.warn}" stroke-width="2"/>`)
  s.push(cf63T(594, 190, 10.5, c63.warn, 'middle', '404 NOT FOUND', true))
  s.push(cf63T(594, 208, 9.5, c63.tealInk, 'middle', 'the honest answer when the path has no page'))
  s.push(`<rect x="48" y="168" width="300" height="56" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(198, 190, 10.5, c63.ink, 'middle', 'STATELESS', true))
  s.push(cf63T(198, 208, 9.5, c63.tealInk, 'middle', 'no memory between requests - each one stands alone'))
  /* HTTPS panel: the whole dance enclosed in the TLS wrap */
  s.push(cf63T(W / 2, 248, 11, c63.teal, 'middle', 'HTTPS - PORT 443 - THE SAME DANCE, WRAPPED IN TLS', true))
  s.push(`<rect x="36" y="262" width="${W - 72}" height="104" rx="10" fill="${c63.faint}" stroke="${c63.tealInk}" stroke-width="2.5"/>`)
  s.push(cf63T(W / 2, 282, 10.5, c63.tealInk, 'middle', 'THE TLS WRAP - encryption; SSL is the old name that survives', true))
  box(64, 296, 170, 56, 'YOUR BROWSER', 'the same ask')
  box(526, 296, 170, 56, 'THE WEB SERVER', 'the same answer')
  s.push(cf63T(380, 322, 9.5, c63.ink, 'middle', 'STEP 1 - the request, wrapped: ciphertext on the wire', true))
  s.push(cf63ArrowH(242, 518, 332, c63.accent))
  s.push(cf63ArrowH(518, 242, 352, c63.accent))
  s.push(cf63T(380, 362, 9.5, c63.ink, 'middle', 'STEP 2 - the response, wrapped: ciphertext back', true))
  s.push(cf63T(W / 2, 386, 10, c63.tealInk, 'middle', 'the padlock in the address bar says this wrap is on - and 443 is its door', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* BODY FIGURE D - THE COOKIE ROUND-TRIP: three beats on a sequence   */
/* diagram - set, store, ride back                                    */
/* ================================================================== */
function cf63CookieSvg(): string {
  const W = 760
  const H = 390
  const bx = 160
  const sx = 600
  const s: string[] = []
  const beat = (y: number, l1: string, l2: string) => {
    s.push(cf63T(740, y, 10.5, c63.conn, 'end', l1, true))
    s.push(cf63T(740, y + 15, 9, c63.tealInk, 'end', l2))
  }
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The cookie round-trip as a sequence diagram with three beats. Your browser sits on the left lifeline and the web server on the right. Beat 1, the first visit: the browser sends a request with no cookie - a stranger - and the server responds with the page plus a Set-Cookie note. Beat 2, the store: the browser keeps the small piece of data in its cookie store. Beat 3, the next visit: the cookie rides back with the request, and the server remembers - the cart returns. The footer pins Netscape 1994 for the first cookie software, and the honest limits: a cookie cannot read your hard disk or carry viruses, but it does track, which is why clearing them exists.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE COOKIE ROUND-TRIP - THREE BEATS', true))
  s.push(cf63T(W / 2, 44, 9.5, c63.tealInk, 'middle', 'HTTP forgets; the cookie is the memory patch the server pins on your browser'))
  s.push(`<rect x="60" y="56" width="200" height="52" rx="8" fill="${c63.white}" stroke="${c63.teal}" stroke-width="2"/>`)
  s.push(cf63T(bx, 78, 10.5, c63.ink, 'middle', 'YOUR BROWSER', true))
  s.push(cf63T(bx, 96, 9.5, c63.tealInk, 'middle', 'holds the cookie store'))
  s.push(`<rect x="500" y="56" width="200" height="52" rx="8" fill="${c63.white}" stroke="${c63.teal}" stroke-width="2"/>`)
  s.push(cf63T(sx, 78, 10.5, c63.ink, 'middle', 'THE WEB SERVER', true))
  s.push(cf63T(sx, 96, 9.5, c63.tealInk, 'middle', 'wants to remember visitors'))
  s.push(`<line x1="${bx}" y1="108" x2="${bx}" y2="312" stroke="${c63.tealInk}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
  s.push(`<line x1="${sx}" y1="108" x2="${sx}" y2="312" stroke="${c63.tealInk}" stroke-width="1.5" stroke-dasharray="5 4"/>`)
  /* beat 1 */
  s.push(cf63T(380, 132, 9.5, c63.ink, 'middle', 'REQUEST: GET /cart - no cookie yet (a stranger)', true))
  s.push(cf63ArrowH(bx, sx, 142, c63.conn))
  s.push(cf63ArrowH(sx, bx, 176, c63.struct))
  s.push(cf63T(380, 168, 9.5, c63.ink, 'middle', 'RESPONSE: the page + Set-Cookie: visitor=17', true))
  beat(146, 'BEAT 1', 'the first visit')
  /* beat 2 */
  s.push(`<rect x="40" y="198" width="240" height="54" rx="9" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(160, 219, 10.5, c63.ink, 'middle', 'THE COOKIE STORE', true))
  s.push(cf63T(160, 237, 9.5, c63.tealInk, 'middle', 'kept by your browser - a small piece of data'))
  beat(220, 'BEAT 2', 'the store')
  /* beat 3 */
  s.push(cf63T(380, 266, 9.5, c63.ink, 'middle', 'REQUEST: the cookie visitor=17 rides back with it', true))
  s.push(cf63ArrowH(bx, sx, 278, c63.conn))
  s.push(cf63ArrowH(sx, bx, 308, c63.struct))
  s.push(cf63T(380, 300, 9.5, c63.ink, 'middle', 'RESPONSE: the server remembers - your cart returns', true))
  beat(272, 'BEAT 3', 'the next visit')
  s.push(`<rect x="36" y="324" width="${W - 72}" height="52" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 344, 10, c63.ink, 'middle', 'Netscape, 1994 - the first cookie software told first-time from returning visitors', true))
  s.push(cf63T(W / 2, 362, 9.5, c63.tealInk, 'middle', 'a cookie cannot read your hard disk or carry viruses - but it does track, which is why clearing them exists'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 1 - the URL drill board, solved: 5 parts, 3       */
/* sub-parts, on the exercise URL                                     */
/* ================================================================== */
function cf63SolUrlBoardSvg(): string {
  const W = 760
  const H = 234
  const CH = 7.0
  const segs: { t: string; c: string }[] = [
    { t: 'https', c: c63.teal },
    { t: '://', c: c63.ink },
    { t: 'portal', c: c63.accent },
    { t: '.', c: c63.ink },
    { t: 'school.edu.in', c: c63.conn },
    { t: ':', c: c63.ink },
    { t: '443', c: c63.warn },
    { t: '/', c: c63.ink },
    { t: 'homework/task2.htm', c: c63.struct },
    { t: '?', c: c63.ink },
    { t: 'subject=science', c: c63.tealInk },
    { t: '#', c: c63.ink },
    { t: 'q3', c: c63.mid },
  ]
  const total = segs.reduce((a, g) => a + g.t.length, 0) * CH
  const pos: Record<string, number> = {}
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The solved drill board for the exercise URL https portal school.edu.in 443 homework slash task2.htm question subject equals science hash q3. Braces mark the 5 top-level parts - scheme https, authority portal.school.edu.in colon 443, path homework slash task2.htm, parameters subject equals science, anchor q3 - and a second row of braces splits the authority into its 3 sub-parts: subdomain portal, domain school.edu.in, port 443. The census panel counts 5 top-level parts and 3 sub-parts, notes the port 443 says HTTPS, and that an untyped port would still mean 443 while 80 belongs to plain http.">`)
  s.push(cf63T(W / 2, 24, 12, c63.teal, 'middle', 'THE DRILL BOARD, SOLVED - 5 PARTS, 3 SUB-PARTS', true))
  let x = (W - total) / 2
  for (const g of segs) {
    s.push(cf63T(x, 56, 12, g.c, 'start', g.t, true))
    pos[g.t] = x
    x += g.t.length * CH
  }
  const l1: [number, number, string, string][] = [
    [pos['https'], pos['https'] + 5 * CH, c63.teal, 'SCHEME'],
    [pos['portal'], pos['443'] + 3 * CH, c63.conn, 'AUTHORITY'],
    [pos['/'], pos['homework/task2.htm'] + 18 * CH, c63.struct, 'PATH'],
    [pos['?'], pos['subject=science'] + 15 * CH, c63.tealInk, 'PARAMETERS'],
    [pos['#'], pos['q3'] + 2 * CH, c63.mid, 'ANCHOR'],
  ]
  for (const [a, b, col, lab] of l1) {
    s.push(cf63Brace(a, b, 66, col))
    s.push(cf63T((a + b) / 2, 86, 9.5, col, 'middle', lab, true))
  }
  const l2: [number, number, string, string][] = [
    [pos['portal'], pos['portal'] + 6 * CH, c63.accent, 'SUBDOMAIN'],
    [pos['school.edu.in'], pos['school.edu.in'] + 13 * CH, c63.conn, 'DOMAIN'],
    [pos[':'], pos['443'] + 3 * CH, c63.warn, 'PORT'],
  ]
  for (const [a, b, col, lab] of l2) {
    s.push(cf63Brace(a, b, 96, col))
    s.push(cf63T((a + b) / 2, 116, 9.5, col, 'middle', lab, true))
  }
  s.push(`<rect x="36" y="130" width="${W - 72}" height="52" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 150, 10, c63.ink, 'middle', 'THE CENSUS: 5 top-level parts, an authority of 3 - and the port 443 says HTTPS', true))
  s.push(cf63T(W / 2, 168, 9.5, c63.tealInk, 'middle', 'no port typed would still mean 443; door 80 belongs to plain http'))
  s.push(`<rect x="36" y="190" width="${W - 72}" height="32" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 210, 9.5, c63.tealInk, 'middle', 'the handed-on input: subject=science is the page\'s question, and #q3 the spot within the page'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 2 - HTTP against HTTPS: the sorting panel          */
/* ================================================================== */
function cf63SolHttpPanelSvg(): string {
  const W = 760
  const H = 300
  const s: string[] = []
  const col = (x: number, head: string, hc: string, rows: string[]) => {
    s.push(`<rect x="${x}" y="54" width="340" height="190" rx="9" fill="${c63.white}" stroke="${hc}" stroke-width="2.5"/>`)
    s.push(cf63T(x + 170, 78, 12, hc, 'middle', head, true))
    rows.forEach((r, i) => s.push(cf63T(x + 170, 106 + i * 27, 9.5, c63.tealInk, 'middle', r)))
  }
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The HTTP against HTTPS sorting panel. Left column, plain HTTP: port 80, the wire sees plain text, the padlock is absent, on public Wi-Fi the fetch is sniffable, and the dance is two stateless messages. Right column, HTTPS: port 443, the wire sees ciphertext through the TLS wrap, the padlock is shown, public Wi-Fi watchers see ciphertext, and the dance is the same two messages, wrapped. The footer states HTTPS equals HTTP over TLS, and SSL is the old name that survives in speech.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'HTTP AGAINST HTTPS - THE SORTING PANEL', true))
  s.push(cf63T(W / 2, 42, 9.5, c63.tealInk, 'middle', 'the scheme decides everything in this table - one letter, one port, one wrap'))
  col(36, 'PLAIN HTTP', c63.warn, ['port: 80', 'the wire sees: plain text', 'the padlock: absent', 'public Wi-Fi: sniffable - readable', 'the dance: 2 messages, stateless'])
  col(384, 'HTTPS', c63.tealInk, ['port: 443', 'the wire sees: ciphertext (TLS)', 'the padlock: shown', 'public Wi-Fi: wrapped - watchers see noise', 'the dance: the same 2, wrapped'])
  s.push(`<rect x="36" y="256" width="${W - 72}" height="32" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 276, 10, c63.ink, 'middle', 'HTTPS = HTTP over TLS - and SSL is the old name that survives in speech', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 3 - spot the fake: the examp1e lookalike           */
/* ================================================================== */
function cf63SolPhishPanelSvg(): string {
  const W = 760
  const H = 272
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="Spot the fake domain panel. The first row shows my-bank.example.com, the honest pattern, with the letter l in example. The second row shows my-bank.examp1e.com, the fake, with the digit 1 in the letter's place - same length, different machine. The tell panel counts it: example against examp1e differ at exactly one character, the sixth - and nothing else. The checklist strip reads: read the domain, look for the padlock, never click through fear.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'SPOT THE FAKE - THE DOMAIN READ, CHARACTER BY CHARACTER', true))
  s.push(`<rect x="36" y="48" width="${W - 72}" height="52" rx="9" fill="${c63.white}" stroke="${c63.struct}" stroke-width="2.5"/>`)
  s.push(cf63T(W / 2, 70, 13, c63.ink, 'middle', 'my-bank.example.com', true))
  s.push(cf63T(W / 2, 90, 9.5, c63.tealInk, 'middle', 'the honest pattern - the letter l in example, the registrant\'s own name'))
  s.push(`<rect x="36" y="112" width="${W - 72}" height="52" rx="9" fill="${c63.white}" stroke="${c63.warn}" stroke-width="2.5"/>`)
  s.push(cf63T(W / 2, 134, 13, c63.warn, 'middle', 'my-bank.examp1e.com', true))
  s.push(cf63T(W / 2, 154, 9.5, c63.warn, 'middle', 'THE FAKE - the digit 1 in the letter\'s place: same length, a different machine entirely'))
  s.push(`<rect x="36" y="176" width="${W - 72}" height="44" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 196, 10, c63.ink, 'middle', 'the tell: example against examp1e - ONE character, the sixth - and nothing else', true))
  s.push(cf63T(W / 2, 212, 9.5, c63.tealInk, 'middle', 'logos and even a padlock can be copied by the fake; the domain cannot - read it first'))
  s.push(`<rect x="36" y="232" width="${W - 72}" height="32" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 252, 10, c63.ink, 'middle', 'the checklist: read the domain - look for the padlock - never click through fear', true))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 4 - the fetch-order strip: 5 numbered beats        */
/* ================================================================== */
function cf63SolFetchStripSvg(): string {
  const W = 760
  const H = 204
  const bw = 120
  const gap = 28
  const x0 = 24
  const top = 52
  const bh = 76
  const beats = [
    { n: 'BEAT 1', name: 'DNS LOOKUP', note: 'name to IP - port 53' },
    { n: 'BEAT 2', name: 'TCP CONNECTION', note: 'the pipe - port 80/443' },
    { n: 'BEAT 3', name: 'HTTP REQUEST', note: 'GET the path' },
    { n: 'BEAT 4', name: 'HTTP RESPONSE', note: 'the page, or 404' },
    { n: 'BEAT 5', name: 'RENDER', note: 'draw the page' },
  ]
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The fetch-order strip: five numbered boxes left to right with arrows between. Beat 1, DNS lookup - the name becomes an IP address on port 53. Beat 2, TCP connection - the pipe opens at port 80 for http or 443 for https. Beat 3, HTTP request - GET the path. Beat 4, HTTP response - the page, or the honest 404. Beat 5, render - the browser draws the page. The footer notes that a typo in the domain dies at beat 1 while a typo in the path dies at beat 4 as a 404, and that beat 1 is lesson 6.2's DNS ladder.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE FETCH, FIRST BEAT TO LAST', true))
  beats.forEach((b, k) => {
    const x = x0 + k * (bw + gap)
    s.push(`<rect x="${x}" y="${top}" width="${bw}" height="${bh}" rx="8" fill="${k % 2 === 0 ? c63.white : c63.panelB}" stroke="${c63.teal}" stroke-width="2"/>`)
    s.push(cf63T(x + bw / 2, top + 18, 9, c63.conn, 'middle', b.n, true))
    s.push(cf63T(x + bw / 2, top + 38, 10, c63.ink, 'middle', b.name, true))
    s.push(cf63T(x + bw / 2, top + 58, 8.5, c63.tealInk, 'middle', b.note))
    if (k < 4) s.push(cf63ArrowH(x + bw + 3, x + bw + gap - 3, top + bh / 2, c63.accent))
  })
  s.push(`<rect x="36" y="146" width="${W - 72}" height="44" rx="8" fill="${c63.panelA}" stroke="${c63.accent}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 166, 10, c63.ink, 'middle', 'a typo in the DOMAIN dies at beat 1 - the name never resolves; a typo in the PATH dies at beat 4, as the honest 404', true))
  s.push(cf63T(W / 2, 182, 9.5, c63.tealInk, 'middle', 'beat 1 is lesson 6.2\'s DNS ladder on port 53 - no fetch begins without it'))
  s.push('</svg>')
  return s.join('')
}

/* ================================================================== */
/* SOLUTION FIGURE 5 - the two-visit ledger: stateless, then patched   */
/* ================================================================== */
function cf63SolCookieLedgerSvg(): string {
  const W = 760
  const H = 256
  const s: string[] = []
  const panel = (x: number, head: string, hc: string, lines: string[]) => {
    s.push(`<rect x="${x}" y="46" width="340" height="152" rx="9" fill="${c63.white}" stroke="${hc}" stroke-width="2.5"/>`)
    s.push(cf63T(x + 170, 70, 11.5, hc, 'middle', head, true))
    lines.forEach((l, i) => s.push(cf63T(x + 170, 96 + i * 24, 9.5, c63.tealInk, 'middle', l)))
  }
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f63}" role="img" aria-label="The two-visit ledger for cookies. Left panel, without a cookie: visit one serves a stranger, and visit two serves a stranger again - the cart from visit one is gone, because stateless HTTP carries nothing across the gap. Right panel, with the cookie of 1994: visit one serves a stranger and the response sets the cookie; the browser stores the small piece of data; visit two carries the cookie back, and the server remembers - the cart returns. The footer notes the memory lives in the browser's store, not the protocol, and clearing cookies empties the store.">`)
  s.push(cf63T(W / 2, 26, 12, c63.teal, 'middle', 'THE TWO-VISIT LEDGER - STATELESS, THEN PATCHED', true))
  panel(36, 'WITHOUT A COOKIE', c63.warn, ['visit 1: a stranger is served', 'visit 2: a stranger is served again', 'the cart from visit 1 is gone', 'nothing carries across the gap', 'HTTP is stateless - by design'])
  panel(384, 'WITH THE COOKIE (1994)', c63.tealInk, ['visit 1: a stranger, and Set-Cookie goes out', 'the browser stores the small note', 'visit 2: the cookie rides back', 'the server remembers - the cart returns', 'the patch, on at both ends'])
  s.push(`<rect x="36" y="210" width="${W - 72}" height="34" rx="8" fill="${c63.panelB}" stroke="${c63.conn}" stroke-width="2"/>`)
  s.push(cf63T(W / 2, 231, 9.5, c63.ink, 'middle', 'the memory lives in the browser\'s store, not the protocol - HTTP stays stateless, and clearing cookies empties the store', true))
  s.push('</svg>')
  return s.join('')
}

/* all nine figure builders above: 4 body figures + 5 solution figures,
   every geometry constant derived - never eyeballed */

export const lesson63: Lesson = {
  id: 'cf-browsing-the-web-the-citizens-vocabulary',
  number: '6.3',
  title: 'Browsing the Web: the Citizen\'s Vocabulary',
  concepts: [
    'the Internet as infrastructure, the Web as one service riding it',
    'the browser census and the anatomy walk',
    'the URL: 5 top-level parts, an authority of 3, ports 80 and 443',
    'HTTP: the two-message dance, stateless, 404 honest',
    'HTTPS: the same dance wrapped in TLS',
    'search engines against typed URLs',
    'cookies: the memory patches of a stateless protocol',
    'phishing and the lookalike-domain trick',
  ],
  objectives: [
    'By the end of this lesson you can draw the citizen\'s first distinction: the Internet is the infrastructure - the wires, routers and protocols of lesson 6.2 - and the Web is ONE service built on top, a world of pages written in HTML, found by URLs, moved by HTTP; email is a different service riding the same infrastructure, and MDN\'s honest line says the Internet is the backbone of the Web.',
    'By the end of this lesson you can define the browser as the software application that fetches, renders and displays pages - text, images, audio, video, hyperlinks - and carry the five-browser census (Chrome, Firefox, Safari, Opera, Edge) with the honest note that Edge is Internet Explorer\'s successor of the 1995 browser-war generation, and that Mosaic (NCSA, 1993) was the first popular graphical browser.',
    'By the end of this lesson you can dissect a URL into its 5 top-level parts (scheme, authority, path, parameters, anchor), split the authority into its 3 sub-parts (subdomain, domain, port), and pin the port census: 80 = HTTP, 443 = HTTPS, 53 = DNS.',
    'By the end of this lesson you can walk HTTP\'s two-message dance - the browser\'s request, the server\'s response - state the protocol\'s statelessness (each request stands alone), read 404 as the honest page-not-found answer, and order the 5 beats of every fetch: DNS lookup, TCP connection, HTTP request, HTTP response, render.',
    'By the end of this lesson you can state that HTTPS is HTTP over TLS (the old name SSL survives in speech), read the padlock in the address bar, and explain why plain HTTP on public Wi-Fi is sniffable.',
    'By the end of this lesson you can explain cookies as the memory patches of a stateless protocol (Netscape, 1994, first-time against returning visitors), state their honest limits - they cannot read your hard disk or carry viruses, but they do track - and run the phishing checklist: read the domain, look for the padlock, never click through fear.',
  ],
  prerequisites: ['cf-the-internet-a-network-of-networks'],
  sources: ['cs-cf-web-ground-ch06'],
  blocks: [
    { kind: 'heading', text: 'From the Wires to the Pages' },
    { kind: 'para', text: 'Lesson 6.2 handed you the network of networks: the wires under the sea and over the rooftops, the routers forwarding packets hop by patient hop, the DNS ladder that turns a name into an address. It was a delivery service with nothing yet to deliver - or rather, with everything to deliver and no vocabulary for saying what. This lesson supplies that vocabulary. You already use every word in it a dozen times a day: browser, address bar, web page, cookie, the padlock, the 404. But a citizen who cannot define the words they use daily is at the mercy of everyone who can - the swindler counts on it. So we take the words properly, one by one, the way this book takes every word: from the ground up, with every number pinned to its source and every piece of folklore marked as folklore. The chapter\'s earlier lessons built the machine and the network; this lesson builds you, the citizen, a working command of the Web\'s own names.' },

    // ================================================================
    // 1. ONE INFRASTRUCTURE, MANY SERVICES
    // ================================================================
    { kind: 'heading', text: 'One Infrastructure, Many Services' },
    { kind: 'para', text: 'Ask a room of students to name the great invention of the 1990s and half the hands will say the Internet while the other half say the Web - and both halves will mean the same thing, and both will be speaking loosely. The citizen\'s first distinction untangles them, and it is worth more examination marks than any other single sentence in this chapter, because every later word depends on getting it right. The distinction is about LAYERS: one of the two things is the ground itself, and the other is a building standing on that ground. Confuse the ground with the building and every conversation about the Web afterwards wobbles.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - the Internet (recalled from lesson 6.2)', text: 'The **Internet** is said to be the infrastructure: the physical network of wires, routers and links, together with the protocols (TCP/IP) that move data across it. Symbolically, the Internet is the road system - the tarmac, the signage, the rules of driving - and it carries cargo without ever asking what the cargo is for.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - the World Wide Web', text: 'The **World Wide Web** (the Web, WWW) is said to be one service built on top of the Internet: a world of pages written in HTML, identified by URLs, and moved from servers to browsers by HTTP. Symbolically, the Web is one kind of traffic on the road system - the vast fleet of linked, readable pages - while **email is a different service riding the same infrastructure**, another kind of traffic on the same roads.' },
    { kind: 'para', text: 'Mozilla\'s developer documentation - MDN, the reference the whole industry builds on - compresses the distinction into one honest line that you should carry verbatim: **the Internet is the backbone of the Web**. Read it twice and notice what it does and does not say. It does not say the two are equal partners, and it does not say they are the same thing wearing two names. A backbone is a structure that something else stands on. The Internet is the structure; the Web is one thing standing on it; and the preposition is the entire lesson of this section.' },
    { kind: 'figure', caption: 'The stack, drawn honestly: the Web, email and other services sit as application boxes riding the Internet bar - the wires, routers and TCP/IP protocols of lesson 6.2 - and the Internet bar rides the physical media of fibre, copper and radio. Three layers, arrows pointing both ways, because every service sends requests down the wire and receives payloads back. The MDN line sits in the footer: the Internet is the backbone of the Web, and email is a different service on the same backbone - 3 services drawn, 1 infrastructure.', svg: cf63StackSvg() },
    { kind: 'para', text: 'Read the figure from the bottom up, the way dependence runs. The physical media - fibre, copper, radio - is the ground. On the ground stands the Internet: not a wire but a SYSTEM of wires, routers and the TCP/IP protocols that lesson 6.2 taught you to name. And on the Internet stand the services, drawn here as three boxes because three is the honest census of the picture, not the census of reality: the Web, email, and the others - file transfer, streaming, voice and video calls - all of them riders on the same infrastructure. Your morning mail and your evening browsing leave your machine on the same wires and are sorted by PROTOCOL, not by wire. When your video call stutters and your email still flows, nothing has happened to the Internet; one rider is simply having a hard ride.' },
    { kind: 'callout', tone: 'warn', title: 'Caution - the Web is not the Internet', text: 'In an examination, the option that says the Internet and the World Wide Web are the same thing is the classic trap, and it is wrong every time it appears. The Internet is the infrastructure; the Web is ONE service on it; email is a DIFFERENT service on the same infrastructure. Loose daily speech - \'I browsed my email on the Web\' - is fine over tea and fatal in an answer sheet.' },
    { kind: 'table', caption: 'The citizen\'s first distinction, asked as one dividing question. Hold the question and the two columns never blur.', head: ['The dividing question', 'The Internet', 'The Web'], rows: [
      ['What is it?', 'the infrastructure: wires, routers, TCP/IP', 'a service: pages in HTML, found by URLs, moved by HTTP'],
      ['Which layer?', 'the road system itself', 'one kind of traffic on it'],
      ['Standing on what?', 'the physical media (fibre, copper, radio)', 'the Internet - MDN: the backbone'],
      ['Who else rides?', 'carries every service alike', 'email is NOT the Web - a different service, same wires'],
      ['Whose ground?', 'lesson 6.2, the network of networks', 'this lesson - and the rest of its vocabulary'],
    ] },
    { kind: 'para', text: 'Three smaller words belong to the Web\'s own family, and examiners like to ask them together. A **website** is a collection of related web pages belonging to one person or organisation - a library of pages under one owner. A **webpage** is one single page of that collection, one document that your browser fetches and draws. And a **web server** is the computer that stores pages and hands them out on request - the librarian who never sleeps. The site is the library, the page is one book in it, and the server is the building with the librarian inside. Notice the honest asymmetry: the first two words name content, the third names machinery - a server is a computer, and it is the only one of the three you could kick.' },
    { kind: 'terms', items: [
      { term: 'World Wide Web', def: 'the service built on the Internet: pages written in HTML, identified by URLs, moved by HTTP.' },
      { term: 'website', def: 'a collection of related web pages belonging to one person or organisation.' },
      { term: 'webpage', def: 'one single page of a website - one document the browser fetches and displays.' },
      { term: 'web server', def: 'the computer that stores web pages and hands them out to browsers on request.' },
      { term: 'the Internet (recalled)', def: 'the infrastructure: wires, routers and the TCP/IP protocols - the backbone of the Web.' },
    ] },
    { kind: 'example', title: 'Illustration 1. Sort the roster: infrastructure or service? An optical fibre under the sea; the TCP/IP protocol suite; a webpage about rainbows; an email from your teacher; a router forwarding packets; an HTTP request.', steps: [
      'Take the dividing question from the table: does the thing carry cargo, or is it the cargo?',
      'So, the optical fibre under the sea carries whatever is sent - infrastructure, the physical media layer.',
      'The TCP/IP protocol suite is the rulebook of the carrying - infrastructure, the Internet layer.',
      'The router forwarding packets is a machine of the road system - infrastructure again, and a physical one.',
      'Now, the webpage about rainbows is cargo being carried - service: the Web, one rider on the backbone.',
      'The email from your teacher is cargo of a different kind - service: email, a DIFFERENT rider on the same backbone.',
      'And the HTTP request is the Web\'s own mover speaking - service again: it is the Web\'s protocol, not the road\'s.',
      'Hence the roster splits 3 infrastructure (fibre, TCP/IP, router) against 3 service (webpage, email, HTTP request) - and the two columns answer different questions entirely.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note - why this distinction earns first place', text: 'Every remaining word in this lesson - browser, URL, HTTP, HTTPS, cookie, phishing - is WEB vocabulary, not Internet vocabulary. The wires have their own words, and lesson 6.2 taught them. When you can say which layer a word belongs to, you can also say which lesson examines it - and, later, which book owns its deeper theory.' },

    // ================================================================
    // 2. THE BROWSER, HONESTLY
    // ================================================================
    { kind: 'heading', text: 'The Browser, Honestly' },
    { kind: 'para', text: 'You have used one since before you could define it, which is exactly why the definition must now be exact. A browser is a piece of application software - recall the family census of chapter 5: it does the user\'s own job - and its job is to be your side of the Web\'s conversation. It speaks for you, draws for you, and remembers things for you. Every fetch this lesson walks is performed by it; every figure in the later sections shows it as one of the two boxes.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - web browser', text: 'A **web browser** is said to be the software application that fetches, renders and displays web pages - text, images, audio, video and hyperlinks - turning the HTML a server sends into the page you read. Symbolically: the browser is the citizen\'s window on the Web; it asks DNS on your behalf, speaks HTTP on your behalf, and draws whatever comes back.' },
    { kind: 'para', text: 'The census you must carry has exactly **5 browsers** in it: Chrome, Firefox, Safari, Opera, Edge. Five names, no more needed for any school, banking or board examination - though the shops hold others, and the honest census says so. And the census carries one honest note that examiners enjoy: **Edge is Internet Explorer\'s successor**. Internet Explorer was the browser of the 1995 browser-war generation - the one that shipped bundled with Windows and fought Netscape for the desktop; its line continues today as Edge. So when an older syllabus asks about Internet Explorer, translate honestly rather than dismissively: that line of descent now answers to Edge.' },
    { kind: 'callout', tone: 'historical', title: 'History - Mosaic, 1993', text: 'The first popular graphical browser was **Mosaic**, built at NCSA (the National Center for Supercomputing Applications, Illinois) and released in **1993**. Our own retelling, honestly hedged: the Web already existed - pages, URLs, HTTP, all in place - but before Mosaic it was read mostly by the people who built it, on screens of plain text. Mosaic put the pictures INLINE with the text, and the pictures did what pictures do: people came. Within two years the browser was a household object, and the three consecutive years 1993, 1994, 1995 - Mosaic, Netscape\'s cookies, Internet Explorer - opened the era whose vocabulary this lesson teaches. Anecdotes about exactly who first clicked what are folklore; the year 1993 and the house NCSA are pinned.' },
    { kind: 'para', text: 'Open any of the five and walk its anatomy - the parts around the page are collectively called the browser\'s chrome, and note the honesty: the word chrome for the frame around content long predates the browser named Chrome, which is why the pun works. Four citizens\' tools matter for every examination. The **address bar** is where a URL is typed or pasted - the place this lesson\'s next section is all about. The **back button** is your history\'s rewind: one click, one step back through the pages you have already visited. **Tabs** let many pages live at once in one window - the bank beside the news beside the textbook, each tab an independent page with its own address. And **bookmarks** are saved addresses: the pages you want tomorrow, kept by name so you need not re-find them. Address bar, back button, tabs, bookmarks - four tools, and the whole of the browser\'s face.' },
    { kind: 'table', caption: 'The anatomy walk: four tools of the browser\'s chrome, each met in daily use.', head: ['The part', 'The job it does', 'Where you meet it'], rows: [
      ['the address bar', 'accepts a URL and starts the fetch', 'you type an address and press Enter'],
      ['the back button', 'rewinds one step in your history', 'you want the page you were just on'],
      ['tabs', 'hold many independent pages in one window', 'the bank, the news and the textbook, side by side'],
      ['bookmarks', 'save addresses by name for later', 'the page you found today and want tomorrow'],
    ] },
    { kind: 'example', title: 'Illustration 2. Name the part: you type an address and press Enter; you want the page you were on a moment ago; you keep the bank, the news and the textbook open at once; you want tomorrow the page you found today.', steps: [
      'Take each scenario and ask which of the four tools is doing the work.',
      'So, typing an address and pressing Enter is the **address bar** - the URL\'s doorway, where every fetch begins.',
      'Wanting the page you were on a moment ago is the **back button** - one step back through your own history.',
      'Keeping the bank, the news and the textbook open at once is **tabs** - many independent pages in one window, each with its own address.',
      'Wanting tomorrow the page you found today is **bookmarks** - the address saved by name, so the finding never has to be repeated.',
      'Hence the four answers in order: address bar, back button, tabs, bookmarks - the whole of the browser\'s face in four moves.',
    ] },
    { kind: 'para', text: 'What the browser does between your press of Enter and the page appearing is this lesson\'s backbone: it asks DNS for the server\'s address, opens a connection, sends an HTTP request, receives the response, and renders - draws - the page: the text first, then the images, then whatever the page pulls in after. That five-beat walk owns section 4. But the walk needs somewhere to walk TO, and the somewhere is named by the Web\'s most exact word - the word in the address bar. It deserves its own section.' },
    { kind: 'callout', tone: 'insight', title: 'Note - where this lesson stops', text: 'How a page is BUILT - the HTML itself, the CSS that dresses it, the scripts that make it move - is the ground of our \'Full-Stack Web Development\' volume, which owns the author\'s side of the Web. This lesson owns the citizen\'s side: what the browser does for you and what the words mean. Walk to that doorstep when you want to write pages; stay here until you can read addresses.' },

    { kind: 'terms', items: [
      { term: 'web browser', def: 'the software application that fetches, renders and displays web pages - the citizen\'s window on the Web (Chrome, Firefox, Safari, Opera, Edge).' },
      { term: 'Mosaic', def: 'NCSA\'s 1993 browser - the first popular graphical browser; Edge is Internet Explorer\'s (1995) successor.' },
    ] },

    // ================================================================
    // 3. THE URL: THE ADDRESS OF A UNIQUE RESOURCE
    // ================================================================
    { kind: 'heading', text: 'The URL: the Address of a Unique Resource' },
    { kind: 'para', text: 'Every page on the Web has exactly one address, and the address has a name you must use precisely: the URL. The letters spell out Uniform Resource Locator, and each word is doing honest work - uniform because every URL obeys one grammar, resource because a URL can name a page, an image, a file or a form\'s answer, locator because it says where the thing lives and how to go get it. You have typed thousands of them. Now read one, slowly, the way an examiner reads it: part by part.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - URL', text: 'A **Uniform Resource Locator** (URL) is said to be the address that names one unique resource on the Web. Symbolically, a URL answers five questions in fixed order: by which **scheme** (protocol) to fetch it, from which **authority** (which server, on which port), along which **path** on that server, with which **parameters** (extra input), down to which **anchor** (spot within the page).' },
    { kind: 'figure', caption: 'The URL, dissected: the pinned example https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2 with a brace under each part. Five top-level parts - scheme (https), authority (www.example.co.in:443), path (textbook/ch6.htm), parameters (q=glassdoor), anchor (sec2) - and the authority\'s own three sub-parts nested beneath: subdomain (www), domain (example.co.in), port (443). The census panel: an untyped port is assumed - 443 for https, 80 for http - and the port census runs 80 = HTTP, 443 = HTTPS, 53 = DNS (the ladder of lesson 6.2, the first beat of every fetch). Sixty-three characters, one address, no two working URLs naming the same page.', svg: cf63UrlSvg() },
    { kind: 'para', text: 'Walk the dissection left to right, as five questions and their answers. HOW will this page be fetched? By the scheme **https** - everything before the ://, naming the protocol of the fetch, and here announcing that the two-message dance of section 4 will be wrapped in encryption. FROM WHOM? The **authority** - everything between the :// and the first slash - which is really three answers stacked: the subdomain **www** (a name for the machine, a convention so old it feels like a law), the domain **example.co.in** (the registered name, owned by exactly one registrant - and note the honest tail: co.in is India\'s corner of the name space), and the port **443**, the door on the server that HTTPS listens at. WHERE on that server? The **path** textbook/ch6.htm - a place in the server\'s filing system, this book\'s chapter 6 file. WITH WHAT extra input? The **parameters** q=glassdoor - a question handed to the page, here a search for glassdoor. DOWN TO WHICH spot? The **anchor** sec2 - the section within the page to jump to. Five questions, five parts, one address.' },
    { kind: 'derivation', title: 'The pinned URL, split to its census', statement: 'Dissect the pinned URL https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2 into its 5 top-level parts, then split the authority into its 3 sub-parts.', steps: [
      { label: 'Cut at the scheme separator', formula: '\\text{scheme} = \\text{https}', explanation: 'Everything before the :// names the protocol of the fetch. https, so the fetch will be wrapped in TLS (section 5) and the port, if untyped, will be assumed 443.' },
      { label: 'Cut out the authority', formula: '\\text{authority} = \\text{www.example.co.in:443}', explanation: 'Between the :// and the first slash lives the who-and-where: which server, in which name space, at which door.' },
      { label: 'Split the authority three ways', formula: '\\text{www} \\.\\; \\text{example.co.in} \\,:\\; \\text{443}', explanation: 'The subdomain is www, the domain is example.co.in, and the port is 443 - three sub-parts inside one top-level part, the nesting the figure draws with its second row of braces.' },
      { label: 'Read the path', formula: '\\text{path} = \\text{textbook/ch6.htm}', explanation: 'After the first slash, up to the question mark: the place on the server - here a chapter 6 file in a textbook folder.' },
      { label: 'Read the parameters', formula: '\\text{parameters} = \\text{q=glassdoor}', explanation: 'After the question mark: extra input handed to the page - a name-value pair, q carrying the value glassdoor.' },
      { label: 'Read the anchor', formula: '\\text{anchor} = \\text{sec2}', explanation: 'After the hash: the spot within the page - section 2 of the page the path names. The browser jumps to it after rendering.' },
    ], result: 'Hence the pinned URL splits into $5$ top-level parts (scheme, authority, path, parameters, anchor), the authority into $3$ sub-parts (subdomain, domain, port), and the port $443$ announces HTTPS before the fetch even begins.' },
    { kind: 'equation', latex: '\\text{URL} \\;=\\; \\text{scheme}://\\text{authority}/\\text{path}\\;?\\;\\text{parameters}\\;\\#\\;\\text{anchor} \\tag{1}', note: 'The grammar every URL obeys. Five top-level parts, always in this order; the parameters and anchor are optional in practice but always counted in the census - an examiner who asks how many parts a URL has wants the full five.' },
    { kind: 'equation', latex: '\\text{authority} \\;=\\; \\text{subdomain}\\;.\\;\\text{domain}\\;:\\;\\text{port} \\tag{2}', note: 'The authority, expanded: www is a subdomain, example.co.in is the domain, 443 is the port. The port is usually hidden because the scheme already implies it.' },
    { kind: 'para', text: 'Ports deserve their own minute, because they are the part of the URL you have never typed. A port is a numbered door on a server: the machine has one address, but many services wait behind many doors, and the number says which service you are knocking for. The Web\'s two doors are pinned: **80 is HTTP\'s door and 443 is HTTPS\'s**. Type no port and the browser assumes the scheme\'s default - 443 for https, 80 for http - which is why the pinned example may drop its :443 and mean exactly the same page. And for completeness, the lookup that begins every fetch - DNS, lesson 6.2\'s ladder - rides port **53**: not a door on the web server but the door of the naming system itself. Three numbers, one line each: 80, 443, 53.' },
    { kind: 'callout', tone: 'warn', title: 'Caution - www is NOT the domain', text: 'The classic examination trap hands you www.example.co.in and asks for the domain. The domain is example.co.in; www is the SUBDOMAIN - a machine-name within the registrant\'s name space, and a convention rather than a law: plenty of real sites have no www at all. Hold the nesting: authority = subdomain + domain + port, three sub-parts inside one top-level part.' },
    { kind: 'para', text: 'One honest note on synonyms, because your syllabus uses them. The NCERT line teaches the same anatomy with slightly different labels, and the examination expects you to translate rather than argue: in the address http://www.ncert.nic.in/textbook.php, the syllabus calls http the **protocol** (our scheme), www the **subdomain** (same word), and ncert.nic.in the **domain** (same word). Same dissection, honest synonyms - and note that this URL carries no port at all, so the http scheme\'s default, door 80, is silently assumed. When a question uses protocol for scheme, answer in the question\'s own dialect and move on.' },
    { kind: 'example', title: 'Illustration 3. Count honestly: how many of the 5 top-level parts are visible in https://www.example.co.in/, and what does the missing port mean?', steps: [
      'Take the short URL and run the grammar of equation (1) across it, left to right.',
      'So, the scheme is https - visible, part 1.',
      'The authority is www.example.co.in - visible, part 2, with its subdomain www and domain example.co.in both present.',
      'The path is the bare slash / - the root, the site\'s front door: visible, part 3.',
      'Now, the parameters and the anchor are simply absent - no question mark, no hash: parts 4 and 5 missing.',
      'Check the port: none is typed, so the scheme\'s default is assumed - 443 for https, exactly as the census panel says.',
      'Hence 3 of the 5 top-level parts are visible (scheme, authority, path), 2 are absent (parameters, anchor), and the hidden port is the assumed 443.',
    ] },
    { kind: 'example', title: 'Illustration 4. Translate the syllabus dialect: label http://www.ncert.nic.in/textbook.php exactly as the NCERT line does, and say which door the browser knocks at.', steps: [
      'Take the URL and cut it with the grammar: scheme (http), authority (www.ncert.nic.in), path (textbook.php).',
      'So, in the syllabus\'s own labels: http is the **protocol**, www is the **subdomain**, ncert.nic.in is the **domain** - one-to-one with our scheme, subdomain, domain.',
      'Now, the port: none is typed, and the scheme is plain http, so door 80 is silently assumed - the census of section 3 in action.',
      'Check the parts census: 3 of the 5 top-level parts are visible - scheme, authority, path - with parameters and anchor absent.',
      'Hence the NCERT labels are protocol = http, subdomain = www, domain = ncert.nic.in, and the untyped port means the browser knocks at door 80.',
    ] },
    { kind: 'example', title: 'Illustration 5. Which door? Say the assumed port for each fetch: (i) https://www.example.co.in/; (ii) http://www.ncert.nic.in/textbook.php; (iii) the DNS lookup that begins every fetch.', steps: [
      'Take the census line first: 80 = HTTP, 443 = HTTPS, 53 = DNS.',
      'So, (i) the scheme is https and no port is typed - the browser assumes **443**.',
      'Now, (ii) the scheme is plain http and no port is typed - the browser assumes **80**.',
      'And (iii) the DNS lookup is not a fetch of a page at all: it is the naming system\'s own conversation, and it rides port **53** - lesson 6.2\'s ladder, one beat before any door is knocked.',
      'Hence the doors are 443, 80 and 53 - and only the first two are doors on the web server; 53 belongs to DNS.',
    ] },
    { kind: 'para', text: 'Close the section with a count worth making once. The pinned example runs to 63 characters - count them yourself - and those 63 characters name exactly one page among the billions: the scheme fixes the protocol, the authority fixes the machine and its door, the path fixes the file, the parameters fix the question, the anchor fixes the spot. Change one character and you have a different address - sometimes a dead one (the honest 404 of the next section), sometimes, as the phishing section will show you, someone else\'s page entirely. That last fact is not a curiosity. It is the whole trick of the swindler, and the reason the citizen reads addresses character by character.' },
    { kind: 'terms', items: [
      { term: 'URL', def: 'Uniform Resource Locator - the address naming one unique resource: scheme, authority, path, parameters, anchor (5 top-level parts).' },
      { term: 'scheme', def: 'the part before :// - the protocol of the fetch (https, http).' },
      { term: 'authority', def: 'the part between :// and the first slash: subdomain + domain + port (3 sub-parts).' },
      { term: 'port', def: 'the numbered door on a server: 80 = HTTP, 443 = HTTPS (53 = DNS).' },
    ] },

    // ================================================================
    // 4. HTTP: THE TWO-MESSAGE DANCE
    // ================================================================
    { kind: 'heading', text: 'HTTP: the Two-Message Dance' },
    { kind: 'para', text: 'Fix the pinned URL in your mind and ask the question its scheme answers: by WHICH protocol will this page be fetched? For the pinned example the answer is HTTP\'s secure child; before you can say what the child adds, you must know the parent. HTTP - the HyperText Transfer Protocol - is a client-server protocol, and its entire social life is two messages. Not three, not a crowd: two. The browser, acting for you, sends a REQUEST; the server sends back a RESPONSE. Every page you have ever loaded, every image within every page, every form you have ever submitted - all of it is this one dance, repeated billions of times a second across the planet.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - HTTP', text: 'The **HyperText Transfer Protocol** (HTTP) is said to be the client-server protocol of the Web: the browser (the **client**) sends a **request** naming a resource, and the **server** returns a **response** - the resource itself, or an honest error. Symbolically, the protocol has exactly **2 message kinds** - request, then response - and HTTP is **stateless**: each request stands alone, with no memory of any request before it.' },
    { kind: 'figure', caption: 'The two-message dance. Top panel, plain HTTP on port 80: step 1 carries the browser\'s request (GET the path) to the server; step 2 carries the server\'s response back - the page itself. The dashed branch is the honest 404: when the path names no page, the server says so instead of pretending, while the companion panel holds the protocol\'s other truth - stateless, no memory between requests. Bottom panel, HTTPS on port 443: the same browser, the same server, the same two steps, but the messages now pass through the TLS wrap - ciphertext on the wire in both directions - which is what the padlock in the address bar announces.', svg: cf63DanceSvg() },
    { kind: 'para', text: 'Read the request first, because its plainness surprises people. It is a short, almost rude letter: a method line - GET /textbook/ch6.htm - get me this file - followed by a few headers saying who is asking and what formats it can accept. GET is the method you use for reading; its siblings exist for writing and sending, and their names are the property of the server-side crafts. The response is a letter of two parts as well: a STATUS - a number saying how the transaction went - and a BODY, which is the page itself when all went well. The two letters, one each way, are the whole protocol; everything else this lesson meets - the 404, the padlock, even the cookie - is a footnote to one of those two messages.' },
    { kind: 'table', caption: 'The two message kinds of HTTP - the census an examiner can ask as a one-mark question, and the honest contents of each.', head: ['The message', 'Who sends it', 'What it carries'], rows: [
      ['the request', 'the browser (the client)', 'a method (GET) naming the path, plus headers saying who is asking'],
      ['the response', 'the server', 'a status code (200, 404, ...) and a body - the page, or the error'],
    ] },
    { kind: 'para', text: 'Now the property that shapes everything downstream: HTTP is **stateless**. Each request stands alone. The server that answered your request for page one does not, by the protocol itself, remember you when your request for page two arrives a second later - the two requests are strangers meeting twice. This is not a defect but a design decision, and an old one: HTTP was designed in the early 1990s to move linked documents - plain pages pointing to plain pages - and a protocol that remembers nothing between requests is a protocol that stays simple and scales outrageously. The cost only appears when a shop wants to remember your cart, and the Web\'s answer to that cost - the cookie - is important enough to own its own section later. Hold the causal chain: statelessness is WHY cookies exist at all.' },
    { kind: 'para', text: 'And the status line deserves its most famous number. When the path names a page that is not there - you mistyped it, or the author never wrote it, or it was moved - the server does not pretend, does not guess, does not quietly hand you some other page. It answers **404: page not found**. Read the 404 as the honest answer it is: the network worked, the connection worked, your request was heard and understood - the server looked where you asked, and the page is simply not there. Distinguish it carefully from the machine being unreachable (the browser cannot even connect) and from the server being broken (the 500-family, the server\'s own admission of failure). The citizen who meets a 404 knows exactly what happened: right door, wrong shelf.' },
    { kind: 'algorithm', title: 'The fetch, first beat to last - what the browser does when you press Enter', lines: [
      { code: 'ask DNS for the IP address of the host (the ladder of lesson 6.2, port 53)', note: 'the name becomes a number before anything else can happen - beat 1' },
      { code: 'open a TCP connection to that IP, at the scheme\'s port (80 for http, 443 for https)', note: 'the reliable pipe of lesson 6.2, laid for this conversation - beat 2' },
      { code: 'send the HTTP request: GET the path', note: 'message 1 of 2 - the client asks - beat 3' },
      { code: 'receive the HTTP response: the page, or an honest error like 404', note: 'message 2 of 2 - the server answers - beat 4' },
      { code: 'render: draw the page, then fetch what it pulls in (images, style, scripts)', note: 'the beat the citizen actually sees - beat 5' },
    ], note: 'Five beats, and beat 1 is where this lesson meets 6.2: no fetch begins without the DNS lookup, and no dance happens until the pipe is laid.' },
    { kind: 'para', text: 'Notice where the chapter\'s own machinery enters the story. The first beat of every fetch is the DNS lookup - lesson 6.2\'s ladder, port 53, the recursive walk from resolver to root to the name\'s own servers - and the second beat lays the TCP connection on the answer. This lesson does not re-teach that ground; it only insists on the ORDER, because the order is examinable and because it explains a daily mystery: when the name is wrong, the failure happens before any web server is ever contacted. A typo in the domain dies at beat 1; a typo in the path dies at beat 4, as a 404. Same typo, two very different funerals.' },
    { kind: 'example', title: 'Illustration 6. Order the beats: a friend lists the fetch of https://www.example.co.in/textbook/ch6.htm as render, HTTP request, DNS lookup, HTTP response, TCP connection. Restore the honest order and say where each of the two typos would die.', steps: [
      'Take the five beats and ask what each one needs before it can begin.',
      'So, nothing can start until the name is a number: the DNS lookup is beat 1 (port 53, lesson 6.2\'s ladder).',
      'Now, the request needs a pipe to travel in: the TCP connection to the IP, at door 443 (the scheme is https), is beat 2.',
      'Then the dance itself: the HTTP request is beat 3 - message 1 - and the HTTP response is beat 4 - message 2, the page or the honest error.',
      'And only when the response lands does the browser draw: render is beat 5.',
      'Check the typos against the order: a typo in the DOMAIN dies at beat 1 - the name never resolves - while a typo in the PATH dies at beat 4, as the server\'s honest 404.',
      'Hence the honest order is DNS lookup, TCP connection, HTTP request, HTTP response, render - and the two typos die one at beat 1, the other at beat 4.',
    ] },
    { kind: 'example', title: 'Illustration 7. The 404 branch, read honestly: you request /textbook/ch7.htm a week before the author writes it. What comes back, what does it mean, and what does it NOT mean?', steps: [
      'Take the fetch beat by beat: the name resolves (beat 1), the connection opens at door 443 (beat 2), the request goes out (beat 3).',
      'So, the server receives a well-formed request for a path that names no page - the file is not there yet.',
      'Now, the protocol\'s honest answer: a response whose status is 404, page not found - message 2 of the dance, carrying an error instead of a body.',
      'Check what it does NOT mean: the network is fine, the connection was fine, the server heard you perfectly - it looked, and the shelf is empty.',
      'Hence the answer is 404 Not Found - right door, wrong shelf - and it means the page is absent, not that the server or the network is broken.',
    ] },
    { kind: 'terms', items: [
      { term: 'HTTP', def: 'HyperText Transfer Protocol - the Web\'s client-server protocol: a request from the browser, a response from the server (2 message kinds).' },
      { term: 'stateless', def: 'having no memory between requests - each HTTP request stands alone.' },
      { term: '404', def: 'the honest page-not-found status: the server heard the request, and the path names no page.' },
    ] },

    // ================================================================
    // 5. HTTPS: THE SAME DANCE, WRAPPED
    // ================================================================
    { kind: 'heading', text: 'HTTPS: the Same Dance, Wrapped' },
    { kind: 'para', text: 'Return to the pinned URL and its scheme: https, not http. What does the extra letter buy? Less mystery than the padlock suggests, and more safety. HTTPS is not a new protocol with new dances - it is the SAME two-message dance, wrapped. The request still goes out, the response still comes back, the 404 still means what it means; but before any of that happens, the browser and the server perform a handshake that gives them a shared secret, and from then on every byte of the conversation is encrypted - ciphertext on the wire, readable only by the two ends of the pipe.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - HTTPS', text: '**HTTPS** is said to be HTTP over **TLS** - the same request/response protocol with its messages wrapped in the encryption of Transport Layer Security. Symbolically: HTTPS = HTTP + TLS; the dance keeps its 2 message kinds and its statelessness; only the envelope changes, and the scheme\'s default port moves from 80 to **443**.' },
    { kind: 'para', text: 'Unpack the abbreviation once, because examiners ask it as a two-marker and citizens need it as a fact: TLS spells **Transport Layer Security**. Its old name, **SSL - Secure Sockets Layer - survives in speech**: people say SSL certificates, the industry mostly means TLS underneath, and the honest citizen says TLS and footnotes the synonym. The handshake itself - the certificates, the key exchange, the cipher negotiation - is real mathematics with real depth, and it belongs to our \'Cybersecurity\' volume, which owns the full theory. This lesson owns the citizen\'s half: what the wrap is called, what it changes, and how to see at a glance whether it is on.' },
    { kind: 'para', text: 'That glance is the **padlock**. Every modern browser shows a small closed lock beside the address when the page came by HTTPS, and its absence on a page that asks for a password is a stop sign. The padlock is the browser\'s one-word report of the wrap: this conversation, request and response alike, went out as ciphertext. Keep the honesty in view as you use it: the padlock certifies the PIPE, not the person at the other end - a wrapped conversation with a swindler is still private, which is precisely why the phishing section will tell you to read the DOMAIN first and the padlock second. Encryption is a seal on the envelope, not a character reference for the sender.' },
    { kind: 'callout', tone: 'warn', title: 'Caution - plain HTTP on public Wi-Fi is sniffable', text: 'On a public Wi-Fi network - the cafe, the station, the airport - a plain http fetch travels READABLE. Others on the same network can watch the traffic pass and read what you asked for and what came back, the way a neighbour reads a postcard left open on a shared table. HTTPS wraps the same conversation so the watcher sees only ciphertext. The citizen\'s rule: no passwords, no card numbers, no logins on pages whose address begins with plain http - and on public Wi-Fi, double it.' },
    { kind: 'table', caption: 'HTTP against HTTPS - the sorting table an examination loves and a citizen uses daily. One letter, one port, one wrap.', head: ['The dividing line', 'HTTP', 'HTTPS'], rows: [
      ['the scheme in the URL', 'http', 'https'],
      ['the default port', '80', '443'],
      ['what the wire sees', 'the request and response in plain text', 'ciphertext - the TLS wrap'],
      ['the padlock', 'absent', 'shown in the address bar'],
      ['on public Wi-Fi', 'sniffable - readable by watchers', 'wrapped - watchers see ciphertext'],
      ['the definition', 'the two-message dance', 'the same dance over TLS (old name: SSL)'],
    ] },
    { kind: 'example', title: 'Illustration 8. Sort by scheme, honestly: which of these fetches is readable on the cafe\'s public Wi-Fi, and which is wrapped? (i) http://neighbourhood-cafe.in/menu.htm; (ii) https://www.example.co.in:443/textbook/ch6.htm; (iii) http://www.ncert.nic.in/textbook.php; (iv) https://mail.example.org/inbox.', steps: [
      'Take the dividing line from the table: the SCHEME decides - http travels plain, https travels wrapped.',
      'So, (i) http://neighbourhood-cafe.in/menu.htm is plain HTTP on port 80 - readable on the public network: the menu is not a secret, but the fetch is still sniffable.',
      'Now, (ii) the pinned example is https at door 443 - the TLS wrap is on, and the watcher sees only ciphertext.',
      'And (iii) the NCERT textbook page is plain http, door 80 assumed - readable in transit; reading a syllabus leaks nothing, but know which regime you are in.',
      'Check (iv): https://mail.example.org/inbox is wrapped at 443 - as mail should always be.',
      'Hence (i) and (iii) are the sniffable plain fetches, (ii) and (iv) the wrapped ones - sorted by the scheme alone, before any padlock is consulted.',
    ] },
    { kind: 'terms', items: [
      { term: 'HTTPS', def: 'HTTP over TLS - the same two-message dance wrapped in encryption; default port 443.' },
      { term: 'TLS', def: 'Transport Layer Security - the encryption layer of HTTPS; its old name SSL survives in speech.' },
    ] },

    // ================================================================
    // 6. SEARCH ENGINES AGAINST TYPED URLS
    // ================================================================
    { kind: 'heading', text: 'Search Engines against Typed URLs' },
    { kind: 'para', text: 'There are exactly two honest ways a fetch begins, and the citizen knows which one they are using. When you KNOW the address - the bank, the board results, the textbook - you type the URL itself, and the five beats of section 4 run straight to that server. When you do NOT know the address - you want the answer to a question, or the best cake shop in a town you have never visited - you type words instead, and hand the problem to a search engine. The two doorways have blurred in daily use - type plain words into the address bar and the browser quietly routes them to your default engine - but the underlying distinction is clean, and examinations ask it clean.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - search engine', text: 'A **search engine** is said to be a service on the Web that has already **crawled** the Web - following links from page to page - built an **index** of what it found, and answers your typed query by looking it up in that index. Symbolically: you type words, not an address; the engine answers from its index with a ranked list; and the click that follows is an ordinary typed-URL fetch in disguise, aimed at whichever address the result names.' },
    { kind: 'para', text: 'The census for your syllabus holds three names: **google.co.in, bing.com, duckduckgo.com** - one Indian-flavoured front end and two others, all of them engines, all of them indexes, none of them the Web. That last clause is the honest sentence of this section: a search engine is not the Web; it is a service ON the Web - a very large set of servers holding a very large index - and when you ask it a question you are fetching a page from ITS servers, exactly as you would fetch any other page. What you get back is not the destination; it is a map of destinations, drawn in advance by the crawl.' },
    { kind: 'para', text: 'So the honest account of a search is TWO different fetches. Fetch one goes to the engine: its URL, its server, its index - and its own habits, because an engine remembers queries the way any server remembers what it is asked (an honest topic this lesson only flags). Fetch two begins when you click a result: an ordinary URL fetch, five beats and all, to the page\'s own server - which, note well, may be a stranger to the engine that sent you. The engine found the address; the page answers for itself. Two fetches, two servers, one click between them - and the citizen who can see the join never mistakes the map for the town.' },
    { kind: 'table', caption: 'The two doorways of a fetch, side by side. Same five beats after the doorway; the difference is all in what you type and who answers first.', head: ['The doorway', 'You type', 'Who answers first'], rows: [
      ['the typed URL', 'an address you already know', 'the page\'s own server - one fetch, straight there'],
      ['the search engine', 'words describing what you want', 'the engine\'s index - then a second, ordinary fetch on the click'],
    ] },
    { kind: 'example', title: 'Illustration 9. Which doorway? Say for each errand whether you type a URL or ask a search engine, and why: (i) you want your bank\'s statement page; (ii) you want to know who invented the computer mouse; (iii) you want this year\'s date sheet from the official board site; (iv) you want the citizens\' reviews of a cake shop in a town you are visiting.', steps: [
      'Take the dividing question: do you already hold the ADDRESS, or only the QUESTION?',
      'So, (i) the bank\'s statement page is an address you know (or have bookmarked) - a typed URL, straight to the bank\'s own server.',
      'Now, (ii) who invented the mouse is a question, not an address - ask a search engine, and read its index\'s answers.',
      'And (iii) the board\'s date sheet lives on the official site whose address the board publishes - a typed URL (bookmark it in the exam season), though a search is the honest fallback when the address is forgotten.',
      'Check (iv): reviews of a cake shop in an unfamiliar town are exactly what you cannot know in advance - a search engine\'s errand, then a click to whichever page the results rank.',
      'Hence (i) and (iii) are typed-URL errands, (ii) and (iv) search errands - and every search errand hides a second, ordinary fetch inside it.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Note - why the engine feels like the Web', text: 'The engine feels like the whole Web because its index is enormous and its answers arrive in one place. Resist the feeling with the layer census of section 1: the engine is a service on the Web, the Web is a service on the Internet, and the Internet is the infrastructure. When the engine\'s index is stale or its ranking is swayed, the pages themselves are unchanged - the map can err; the town does not.' },
    { kind: 'terms', items: [
      { term: 'search engine', def: 'a service that has crawled and indexed the Web and answers typed queries from its index (google.co.in, bing.com, duckduckgo.com).' },
    ] },

    // ================================================================
    // 7. COOKIES: THE MEMORY PATCHES
    // ================================================================
    { kind: 'heading', text: 'Cookies: the Memory Patches' },
    { kind: 'para', text: 'Recall the property that opened this half of the lesson: HTTP is stateless, and each request stands alone. Live with that property for a moment as a shopkeeper would. A customer walks in, fills a cart, clicks to the next page - and the protocol has already forgotten them; the request for page two is a stranger\'s request, and by the letter of the protocol the cart should evaporate with every click. The Web could not run a shop, a login, or a preferred language on those terms. It needed a memory patch - a small, honest, much-misunderstood one - and in 1994 it got one.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - cookie', text: 'A **cookie** is said to be a small piece of data that a server sends to your browser in a response, which the browser stores and sends back with its later requests to that server. Symbolically: the response carries a note - set this cookie; the browser keeps it in its cookie store; every later request to the same server carries the cookie along - and the stateless protocol acquires a memory, patched on at both ends.' },
    { kind: 'figure', caption: 'The cookie round-trip, in three beats on a sequence diagram. Beat 1, the first visit: the browser\'s request carries no cookie - a stranger\'s - and the server\'s response returns the page with a Set-Cookie note attached. Beat 2, the store: the browser keeps that small piece of data in its cookie store. Beat 3, the next visit: the cookie rides back with the request, and the server remembers - the shopping cart returns. Netscape, 1994, wrote the first cookie software to tell first-time from returning visitors; and the honest limits ride in the footer - a cookie cannot read your hard disk or carry viruses, but it does track, which is why clearing them exists.', svg: cf63CookieSvg() },
    { kind: 'para', text: 'Read the three beats slowly, because every examination question about cookies is one of these three beats wearing a costume. Beat 1: you visit the shop for the first time; your request is anonymous; the server\'s response comes back carrying the page AND a note - set-cookie: visitor=17 - the server\'s way of saying, if you show me this number next time, I will know you. Beat 2: your browser, not you, stores the note - a small piece of data in the cookie store, alongside the notes of every other site you visit, each note bound to the server that wrote it. Beat 3: your next request to that shop carries the note back automatically; the server reads visitor=17, and the stranger has a name again - the cart you filled yesterday is still yours. Set, store, ride back: three beats, one memory.' },
    { kind: 'callout', tone: 'historical', title: 'History - Netscape, 1994', text: 'The first cookie software was written at **Netscape in 1994**, and the problem it solved was exactly the one this section opened with: telling **first-time visitors from returning visitors**. Our own honest retelling: the engineers needed a shop to recognise its customers without making the protocol remember anything, so they pinned the memory on the customer\'s own browser - a note the shop could read on every return. One year after Mosaic put pictures in pages, the pages began to remember who was looking; the two inventions share a birthday decade, and both were Netscape-era work.' },
    { kind: 'para', text: 'Now the honest ledger of what a cookie is NOT, because the folklore outruns the fact. A cookie **cannot read your hard disk**: it is a small piece of DATA, not a program - it cannot run, cannot probe, cannot touch a single file. A cookie **cannot carry viruses**, for the same reason: a virus is instructions, and a cookie carries none. But - and the ledger must balance - a cookie **does track**: the note that remembers your cart also remembers which pages you read, on which days, in which order, and notes written by one site can be read by partners of that site across many pages. This is why every browser offers you the broom: **clearing cookies** empties the store, and every site meets you as a stranger again - the cost being that your logins and carts vanish with the tracking. The citizen holds both truths at once: harmless to the disk, real in the tracking, and yours to clear.' },
    { kind: 'example', title: 'Illustration 10. The two-visit ledger: a shop with no cookie, and the same shop with one. Say exactly what the server knows at each visit in each case.', steps: [
      'Take the no-cookie shop first, and hold the protocol\'s property in view: stateless - each request stands alone.',
      'So, visit 1: the server serves a stranger; visit 2: the server serves a stranger again - the cart from visit 1 is gone, because nothing carried across the gap.',
      'Now, the cookie shop, beat by beat: visit 1 is the stranger\'s visit, and the response carries set-cookie: visitor=17.',
      'So, beat 2 - your browser stores the note in its cookie store, bound to that server.',
      'And visit 2: the request carries visitor=17 back, so the server reads it and remembers - the cart returns, the login holds, the language preference survives.',
      'Check the honesty: the memory lives in the BROWSER\'s store, not in the protocol - HTTP is still stateless; the note is what crosses the gap.',
      'Hence without the cookie the server knows nothing on visit 2 (a stranger, an empty cart), and with it the server knows the visitor by number, the cart, and - the tracking side of the ledger - the pages you read.',
    ] },
    { kind: 'terms', items: [
      { term: 'cookie', def: 'a small piece of data a server sends in a response, the browser stores, and later requests carry back - the memory patch for stateless HTTP (Netscape, 1994).' },
    ] },

    // ================================================================
    // 8. PHISHING: THE LOOKALIKE TRAP
    // ================================================================
    { kind: 'heading', text: 'Phishing: the Lookalike Trap' },
    { kind: 'para', text: 'The last word in the citizen\'s vocabulary is the swindler\'s favourite, and it is named with a straight face: phishing - fishing with a baited hook, spelled with a ph, in the old hacker spelling the era liked. The definition must be precise, because the attack is precise. It is not a break-in; no lock is picked, no firewall is climbed. It is a trick played on the person, not the machine - which is why every technical defence you own sits quietly by while it happens. The fisherman does not attack the river; he waits for the fish to bite.' },
    { kind: 'callout', tone: 'definition', title: 'Definition - phishing', text: '**Phishing** is said to be a social-engineering attack that tricks you into believing you are on your real bank\'s site when you are on the attacker\'s copy - so that you type your credentials into the fake. Symbolically: the attack targets the CITIZEN, not the machine; the fake page is a costume, the urgent email is the hook, and the password you type willingly is the catch.' },
    { kind: 'para', text: 'The costume\'s best stitch is the **lookalike domain**, and you must see it character by character. The real address is my-bank.example.com; the fake is my-bank.examp1e.com. Read them again, slowly, one character at a time: the fake swaps the digit **1 for the letter l** inside the domain - examp1e against example - and nothing else; the two addresses are the same length, look alike at a glance, and name completely different machines. The page behind the fake can be a pixel-perfect copy of the bank\'s own - logos, fonts, that familiar blue - because a page is just HTML, and HTML copies for free. What the swindler cannot copy is the DOMAIN: that belongs to its registrant, and it is the one part of the costume that always fails under a character-by-character read.' },
    { kind: 'callout', tone: 'warn', title: 'Caution - the citizen\'s checklist', text: 'Three moves, in order, every time a page asks for a password. (i) **Read the domain** - character by character, from the last dot backwards, watching for the digit 1 wearing the letter l\'s coat. (ii) **Look for the padlock** - the wrap is necessary, and its absence on a login page is a stop sign. (iii) **Never click through fear** - \'your account will be closed in 24 hours\' is the swindler\'s clock, not your bank\'s; no honest institution conducts its security by countdown.' },
    { kind: 'para', text: 'One more honesty, because a half-true defence is worse than none: the padlock proves the PIPE, not the person. Since the wrap became free and automatic, the swindler\'s copy can wear a padlock too - an encrypted conversation with a criminal is still private, from everyone except you. So the checklist\'s ORDER is the defence: the domain read comes first, because the domain cannot be copied; the padlock comes second, as the necessary wrap; and the refusal to be hurried comes third, because urgency is the tell that survives every costume. This lesson gives you the citizen\'s three moves; the full threat model - the other hooks, the defences, the forensics - belongs to our \'Cybersecurity\' volume, whose doorstep this is.' },
    { kind: 'example', title: 'Illustration 11. Spot the fake: which of these two addresses is the lookalike trap, and by exactly which character? my-bank.example.com and my-bank.examp1e.com. Then run the checklist.', steps: [
      'Take the two addresses and read them character by character, in the checklist\'s first move.',
      'So, the left one spells e-x-a-m-p-l-e - the letter l in the sixth position of the domain\'s first word.',
      'Now, the right one spells e-x-a-m-p-1-e - the DIGIT 1 sitting in the letter\'s place: same length, same look at a glance, a different machine entirely.',
      'Hence my-bank.examp1e.com is the fake - the digit 1 wearing the letter l\'s coat - and my-bank.example.com is the honest pattern.',
      'Check the rest of the costume honestly: the fake page may show the bank\'s logos and even a padlock - a page is HTML and copies for free, and the wrap encrypts any conversation - so neither logo nor padlock settles it.',
      'Therefore the domain read settles it: character by character, the sixth character of example - and never click through the 24-hour fear that arrives with the bait.',
    ] },
    { kind: 'terms', items: [
      { term: 'phishing', def: 'a social-engineering attack that tricks you into typing credentials into a copy of your real site - spotted by the domain, read character by character.' },
    ] },

    // ================================================================
    // 9. THE CITIZEN'S KIT, PACKED
    // ================================================================
    { kind: 'heading', text: 'The Citizen\'s Kit, Packed' },
    { kind: 'para', text: 'Lay the whole lesson on one table and see how few words carry it. The Internet is the infrastructure; the Web is one service on it, and MDN\'s line - the Internet is the backbone of the Web - settles the examination\'s favourite trap. The browser is the window: five in the census, with Edge the honest heir of 1995\'s Internet Explorer, and Mosaic (NCSA, 1993) the first popular graphical one. The URL is the address: 5 top-level parts, an authority of 3 sub-parts, and doors 80, 443 and 53. HTTP is the dance: 2 message kinds, stateless, with 404 as the honest no. HTTPS is the same dance over TLS, and the padlock reports the wrap. The search engine answers from its index when you do not know the address. The cookie patches the statelessness - set, store, ride back - Netscape, 1994. And the phishing costume fails at one character: examp1e. Every number in that paragraph is engine-pinned; every claim is this lesson\'s own.' },
    { kind: 'formula', name: 'The URL grammar', latex: '\\text{URL} = \\text{scheme}://\\text{authority}/\\text{path}?\\text{parameters}\\#\\text{anchor}', note: '5 top-level parts, always in this order - the pinned example: https, www.example.co.in:443, textbook/ch6.htm, q=glassdoor, sec2.' },
    { kind: 'formula', name: 'The authority, expanded', latex: '\\text{authority} = \\text{subdomain}\\;.\\;\\text{domain}\\;:\\;\\text{port}', note: '3 sub-parts inside 1 top-level part: www is the subdomain, example.co.in the domain, 443 the port (untyped ports are assumed).' },
    { kind: 'formula', name: 'The port census', latex: '80 = \\text{HTTP}, \\quad 443 = \\text{HTTPS}, \\quad 53 = \\text{DNS}', note: 'The three doors to carry cold: HTTP\'s 80, HTTPS\'s 443, and DNS\'s 53 - the ladder of lesson 6.2, the first beat of every fetch.' },
    { kind: 'formula', name: 'HTTPS, defined', latex: '\\text{HTTPS} = \\text{HTTP} \\;\\text{over}\\; \\text{TLS}', note: 'The same 2-message dance wrapped in encryption; SSL is the old name that survives in speech; the padlock reports the wrap.' },
    { kind: 'formula', name: 'The cookie round-trip', latex: '\\text{set} \\to \\text{store} \\to \\text{ride back}', note: 'Three beats: the response sets the cookie, the browser stores it, later requests carry it back - the memory patch for stateless HTTP (Netscape, 1994).' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner - how this lesson is asked', text: 'The census of this lesson is examination staple food, asked here in our own exam-style wording - never quoted from any real paper. CUET and the B2 computer-awareness strand ask the distinctions: website against webpage (a collection against one page of it), the web browsers by name (any of the five, with Edge\'s Internet Explorer lineage the honest twist), and what a cookie is (a small piece of data set, stored and returned - data, not a program). Banking and SSC papers ask the short truths: http against https (plain against wrapped, port 80 against 443), and phishing (the social-engineering trick - spot the lookalike domain among four options). Cambridge 9618 and A-level-style asks go one step further and want the anatomy itself: label the parts of a URL (scheme, authority, path, parameters, anchor), name the message kinds of HTTP (request, response), and say what statelessness costs and the cookie repairs. Drill Illustrations 3, 8 and 11 until their answers fall out by themselves.' },

    { kind: 'quiz', title: 'Checkpoint quiz', items: [
      {
        q: 'Which statement draws the citizen\'s first distinction honestly?',
        options: [
          'The Web is the hardware and the Internet is the software that runs it.',
          'The Internet is one service that runs on the World Wide Web.',
          'The Internet is the infrastructure and the Web is one service riding it - MDN\'s line: the Internet is the backbone of the Web.',
          'The Internet and the World Wide Web are two names for the same thing.',
          'The Web is the network of routers and wires, and the Internet is its collection of pages.',
        ],
        answer: 2,
        explain: 'Option C is the distinction this lesson opens with: the Internet is the wires, routers and TCP/IP protocols (lesson 6.2\'s infrastructure), and the Web is one service built on top - pages in HTML, found by URLs, moved by HTTP - with MDN\'s backbone line settling the relation. Option A inverts the halves and mislabels both: neither is the other\'s software. Option B stands the relation on its head - the Web rides the Internet, never the reverse. Option D is the classic examination trap, wrong every time it appears: the two are layers, not synonyms, and email is a different service on the same infrastructure. Option E swaps the definitions wholesale - the routers and wires belong to the Internet, the pages to the Web.',
      },
      {
        q: 'How many top-level parts does a URL have, and what are they?',
        options: [
          '3 - scheme, path and anchor.',
          '5 - scheme, authority, path, parameters and anchor.',
          '4 - scheme, domain, path and anchor.',
          '6 - scheme, subdomain, domain, port, path and anchor.',
          '5 - protocol, subdomain, domain, path and query.',
        ],
        answer: 1,
        explain: 'Option B is the census of equation (1): scheme (https), authority (www.example.co.in:443), path (textbook/ch6.htm), parameters (q=glassdoor), anchor (sec2) - five top-level parts, always in this order. Option A drops the authority and the parameters - the who-and-where and the handed-on input. Option C confuses levels: the domain is one of the authority\'s 3 SUB-parts, not a top-level part, and the parameters are missing. Option D commits the same confusion in the other direction, promoting subdomain, domain and port (the authority\'s 3 sub-parts) to top-level rank alongside their own parent. Option E mixes the syllabus\'s synonyms (protocol for scheme, query for parameters) with sub-domain-level names, producing a list from two different floors of the anatomy.',
      },
      {
        q: 'A page you requested comes back with status 404. What honestly happened?',
        options: [
          'The web server is down and cannot be reached at all.',
          'Your browser does not support the format of the page.',
          'The DNS lookup failed - the name does not exist.',
          'The connection was refused at the server\'s door.',
          'The server heard your request and answered honestly: the path names no page.',
        ],
        answer: 4,
        explain: 'Option E is the honest 404: the fetch reached beat 4, the server received a well-formed request, looked where the path pointed, and the page is simply not there - right door, wrong shelf. Option A describes a machine you cannot even connect to; no response of any kind would come back, let alone one carrying a status. Option B is a rendering matter at beat 5, after a successful response - the server sent something and the browser could not draw it. Option C dies at beat 1, before any server is contacted: a dead name never resolves, so no request is ever sent. Option D would also end the conversation before any HTTP message - a refused connection produces no status line, whereas the 404 IS a response, message 2 of the dance.',
      },
      {
        q: 'HTTPS is best defined as:',
        options: [
          'a replacement protocol that discards HTTP and defines new message kinds.',
          'HTTP with a larger port number and faster transfers.',
          'a cookie-based scheme that remembers users between their requests.',
          'HTTP over TLS - the same request/response dance wrapped in encryption.',
          'a search-engine protocol for crawling and indexing the Web.',
        ],
        answer: 3,
        explain: 'Option D is the definition: HTTPS is HTTP over TLS - Transport Layer Security - the same 2 message kinds and the same statelessness, wrapped so the wire carries ciphertext; the default port moves from 80 to 443 and the padlock reports the wrap. Option A is wrong on the central fact: nothing is discarded and no message kind is added - the dance survives intact inside the envelope. Option B latches onto the port (443, not \"larger\" in any meaningful sense) and invents a speed claim the definition never makes. Option C confuses the memory patch: cookies repair statelessness at the application layer and have nothing to do with the encryption of the pipe. Option E belongs to the search-engine section - crawling and indexing are the engine\'s craft, not a transport protocol.',
      },
      {
        q: 'Which of these addresses is the lookalike trap?',
        options: [
          'my-bank.examp1e.com',
          'www.example.co.in',
          'portal.school.edu.in',
          'www.ncert.nic.in',
          'my-bank.example.com',
        ],
        answer: 0,
        explain: 'Option A is the fake: it swaps the digit 1 for the letter l inside the domain - examp1e against example - the same length, the same look at a glance, and a completely different machine; the page behind it can copy the bank\'s logos and even wear a padlock, but the domain cannot be copied. Option B is the pinned teaching example\'s own domain, an honest registrant\'s name. Option C is the drill URL\'s domain - a school\'s registered name with a portal subdomain, honest at every character. Option D is the syllabus\'s own NCERT domain, honest and port-free. Option E is the real pattern that option A imitates - the letter l in example - which is exactly why the pair must be read character by character, the checklist\'s first move.',
      },
    ] },

    { kind: 'exercises', title: 'Graded exercises', sets: [
      {
        level: 'L1',
        questions: [
          {
            q: 'State the citizen\'s first distinction in one sentence, quote MDN\'s line on the relation, and say where email belongs.',
            answer: 'Hence the Internet is the infrastructure, the Web is one service riding it, MDN\'s line is the backbone, and email is a different service on the same wires',
            solution: [
              'Take the two definitions and hold the layer question: which one is the ground, which one the building?',
              'So, the Internet is the infrastructure - the wires, routers and TCP/IP protocols of lesson 6.2 - and the Web is one service built on top: pages in HTML, found by URLs, moved by HTTP.',
              'Now, MDN\'s line, verbatim: the Internet is the backbone of the Web - a structure and the thing standing on it, never two names for one thing.',
              'And email belongs with the riders, not the road: a DIFFERENT service on the same infrastructure.',
              'Hence the Internet is the infrastructure, the Web is one service riding it, MDN\'s line is the backbone, and email is a different service on the same wires.',
            ]
          },
          {
            q: 'Write the five-browser census, and add the honest note about Edge\'s lineage.',
            answer: 'Hence the census is Chrome, Firefox, Safari, Opera, Edge - and Edge is Internet Explorer\'s successor, IE being the 1995 browser-war generation',
            solution: [
              'Take the census from the section: exactly 5 names.',
              'So: Chrome, Firefox, Safari, Opera, Edge.',
              'Now, the honest note: Edge is Internet Explorer\'s successor - IE shipped bundled with Windows in the 1995 browser-war generation, and its line continues as Edge.',
              'Check the older syllabus consequence: a question about Internet Explorer is answered honestly by naming the descent, not by dismissing the name.',
              'Hence the census is Chrome, Firefox, Safari, Opera, Edge - and Edge is Internet Explorer\'s successor, IE being the 1995 browser-war generation.',
            ]
          },
          {
            q: 'Dissect https://portal.school.edu.in:443/homework/task2.htm?subject=science#q3 into its 5 top-level parts, split the authority into its 3 sub-parts, and say what the port announces.',
            answer: 'Hence scheme https; authority portal.school.edu.in:443 (subdomain portal, domain school.edu.in, port 443); path homework/task2.htm; parameters subject=science; anchor q3 - and 443 announces HTTPS',
            solution: [
              'Take the drill URL and run equation (1) across it, left to right, cutting at the fixed separators.',
              'So, the scheme is https - everything before the :// - and the authority is portal.school.edu.in:443, everything up to the first slash.',
              'Now, split the authority with equation (2): the subdomain is portal, the domain is school.edu.in, the port is 443.',
              'The path is homework/task2.htm - after the first slash, up to the question mark - and the parameters are subject=science, the anchor q3.',
              'Check the census: 5 top-level parts, 3 sub-parts in the authority, and the port 443 announces HTTPS before the fetch even begins.',
              'Hence scheme https; authority portal.school.edu.in:443 (subdomain portal, domain school.edu.in, port 443); path homework/task2.htm; parameters subject=science; anchor q3 - and 443 announces HTTPS.',
            ],
            figures: [{ caption: 'The solved drill board: the exercise URL with a brace under each of the 5 top-level parts and the authority\'s 3 sub-parts - portal, school.edu.in, 443.', svg: cf63SolUrlBoardSvg() }],
          },
          {
            q: 'State the port census (which door belongs to HTTP, to HTTPS, and to DNS), and say what the browser assumes when no port is typed.',
            answer: 'Hence 80 = HTTP, 443 = HTTPS, 53 = DNS - and an untyped port is assumed from the scheme: 443 for https, 80 for http',
            solution: [
              'Take the three doors from the census line: 80, 443, 53.',
              'So, 80 is HTTP\'s door and 443 is HTTPS\'s - the Web\'s two doors on the server.',
              'Now, 53 is DNS\'s - not a door on the web server but the naming system\'s own, the ladder of lesson 6.2 and the first beat of every fetch.',
              'Check the assumption rule: type no port and the scheme decides - 443 for https, 80 for http - which is why you have never typed one.',
              'Hence 80 = HTTP, 443 = HTTPS, 53 = DNS - and an untyped port is assumed from the scheme: 443 for https, 80 for http.',
            ]
          },
          {
            q: 'Name the four tools of the browser\'s chrome and give the one-line job of each.',
            answer: 'Hence the address bar (accepts a URL, starts the fetch), the back button (one step back through your history), tabs (many independent pages in one window), bookmarks (addresses saved by name for later)',
            solution: [
              'Take the anatomy walk and read the four panels in order.',
              'So, the **address bar** accepts a URL and starts the fetch - the doorway every walk of section 4 begins at.',
              'The **back button** rewinds one step through your own history - the page you were just on.',
              '**Tabs** hold many independent pages at once in one window, each with its own address.',
              'And **bookmarks** save addresses by name, so tomorrow\'s visit needs no re-finding.',
              'Hence the address bar (accepts a URL, starts the fetch), the back button (one step back through your history), tabs (many independent pages in one window), bookmarks (addresses saved by name for later).',
            ]
          },
        ],
      },
      {
        level: 'L2',
        questions: [
          {
            q: 'Put the five beats of a fetch in their honest order, say which port each beat touches, and state where a typo in the domain dies against a typo in the path.',
            answer: 'Hence DNS lookup (53), TCP connection (80 or 443), HTTP request, HTTP response, render - and the domain typo dies at beat 1, the path typo at beat 4 as the honest 404',
            solution: [
              'Take the five beats and ask what each needs before it can begin.',
              'So, beat 1 is the DNS lookup - the name becomes an IP, riding port 53, lesson 6.2\'s ladder.',
              'Beat 2 is the TCP connection to that IP, at the scheme\'s door - 80 for http, 443 for https.',
              'Now, beats 3 and 4 are the dance itself: the HTTP request (message 1) and the HTTP response (message 2 - the page, or an error).',
              'And beat 5 is the render - the browser draws what came back.',
              'Check the typos against the order: a DOMAIN typo dies at beat 1, the name never resolving; a PATH typo survives to beat 4 and dies as the server\'s honest 404.',
              'Hence DNS lookup (53), TCP connection (80 or 443), HTTP request, HTTP response, render - and the domain typo dies at beat 1, the path typo at beat 4 as the honest 404.',
            ],
            figures: [{ caption: 'The fetch-order strip: five numbered beats with the port each touches - and the two typo funerals marked beneath.', svg: cf63SolFetchStripSvg() }],
          },
          {
            q: 'Sort these four fetches into plain and wrapped, naming the deciding part of each URL: (i) http://cafe.example.in/menu.htm; (ii) https://www.example.co.in:443/textbook/ch6.htm; (iii) http://www.ncert.nic.in/textbook.php; (iv) https://mail.example.org/inbox. Then define HTTPS in one line.',
            answer: 'Hence (i) and (iii) are plain HTTP on door 80, (ii) and (iv) are HTTPS on 443 - sorted by the scheme alone - and HTTPS is HTTP over TLS, the same dance wrapped in encryption',
            solution: [
              'Take the dividing line: the SCHEME decides - http travels plain, https travels wrapped.',
              'So, (i) http://cafe.example.in/menu.htm is plain HTTP, door 80 assumed - readable in transit.',
              '(ii) The pinned example is https, and its typed port 443 agrees with the scheme - the wrap is on.',
              'Now, (iii) the NCERT page is plain http with no port typed, so door 80 is assumed - plain again; and (iv) the mail page is https, wrapped at 443, as mail should always be.',
              'Check the one-line definition: HTTPS is HTTP over TLS - the same request/response dance with the messages wrapped in encryption (SSL is the old name that survives in speech).',
              'Hence (i) and (iii) are plain HTTP on door 80, (ii) and (iv) are HTTPS on 443 - sorted by the scheme alone - and HTTPS is HTTP over TLS, the same dance wrapped in encryption.',
            ],
            figures: [{ caption: 'The sorting panel: plain HTTP against HTTPS, column by column - port, wire, padlock, public Wi-Fi, and the definition.', svg: cf63SolHttpPanelSvg() }],
          },
          {
            q: 'Walk the cookie round-trip in its three beats, say why statelessness forces it, and say what clearing cookies does - and does not do.',
            answer: 'Hence set, store, ride back - forced because HTTP forgets between requests - and clearing empties the store (strangers again), while never touching the hard disk, which cookies cannot read',
            solution: [
              'Take the property first: HTTP is stateless - each request stands alone, so the protocol itself carries no memory across visits.',
              'So, beat 1: the first visit\'s response carries the page AND the Set-Cookie note - the server\'s if-you-show-me-this-number.',
              'Beat 2: the browser, not you, stores the small piece of data in its cookie store, bound to that server.',
              'Now, beat 3: the next request carries the note back automatically, and the server remembers - the cart returns, the login holds.',
              'Check what clearing does: it empties the store, so every site meets you as a stranger again - your logins and carts vanish WITH the tracking.',
              'And what it never needed to protect: cookies are data, not programs - they cannot read the hard disk or carry viruses, so clearing is about tracking, not safety from damage.',
              'Hence set, store, ride back - forced because HTTP forgets between requests - and clearing empties the store (strangers again), while never touching the hard disk, which cookies cannot read.',
            ],
            figures: [{ caption: 'The two-visit ledger: without a cookie every visit is a first visit; with the 1994 patch, the note stores and rides back.', svg: cf63SolCookieLedgerSvg() }],
          },
          {
            q: 'Distinguish the two doorways of a fetch - the typed URL and the search engine - and give the three-name engine census. Why is every search honestly TWO fetches?',
            answer: 'Hence the typed URL goes straight to the page\'s own server, the search goes to the engine\'s index first (google.co.in, bing.com, duckduckgo.com) - and the click that follows is a second, ordinary fetch',
            solution: [
              'Take the dividing question: do you hold the ADDRESS, or only the QUESTION?',
              'So, the typed URL is the address doorway: the five beats run straight to the page\'s own server - one fetch.',
              'The search engine is the question doorway: you type words, and the engine answers from the index its crawl has already built.',
              'Now, the census: google.co.in, bing.com, duckduckgo.com - three names, all engines, none of them the Web itself.',
              'Check the two-fetch honesty: fetch one goes to the ENGINE\'s own servers; the click on a result starts fetch two, an ordinary URL fetch to the page\'s own server.',
              'Hence the typed URL goes straight to the page\'s own server, the search goes to the engine\'s index first (google.co.in, bing.com, duckduckgo.com) - and the click that follows is a second, ordinary fetch.',
            ]
          },
          {
            q: 'A colleague says \"the 404 means the Internet is down\". Correct them precisely: what is a 404, what does it NOT mean, and at which beat of the fetch does it arrive?',
            answer: 'Hence the 404 is the server\'s honest page-not-found answer at beat 4 - it means the path names no page, not that the network, the connection or the server is broken',
            solution: [
              'Take the claim apart: \"the Internet is down\" describes beat 1 or 2 failing - no name, no pipe, no message at all.',
              'So, what a 404 actually is: a RESPONSE - message 2 of the dance - whose status number says the path names no page.',
              'Now, when it arrives: at beat 4, after the DNS lookup (beat 1) and the TCP connection (beat 2) have both succeeded and the request (beat 3) has been heard.',
              'Check what it does NOT mean: the network worked, the connection worked, the server understood you perfectly - it looked where you asked, and the shelf is empty.',
              'Hence the 404 is the server\'s honest page-not-found answer at beat 4 - it means the path names no page, not that the network, the connection or the server is broken.',
            ]
          },
        ],
      },
      {
        level: 'L3',
        questions: [
          {
            q: 'EXAM-STYLE. Classify the ten items as infrastructure or service, naming the dividing question you applied: the Web; an email message; a router; an HTTP request; an optical fibre; a webpage; the TCP/IP suite; a video call; a search engine\'s index; the DNS system.',
            answer: 'Hence 4 infrastructure (the router, the optical fibre, the TCP/IP suite, the DNS system) and 6 service (the Web, the email message, the HTTP request, the webpage, the video call, the search engine\'s index), by the one question: does the thing carry cargo, or is it the cargo',
            solution: [
              'Take the dividing question from section 1: does the thing CARRY cargo, or IS it the cargo?',
              'So, the carriers - infrastructure, 4 members: the router (a machine of the road system), the optical fibre (the physical media), the TCP/IP suite (the rulebook of the carrying), and the DNS system (the naming service of the infrastructure itself, lesson 6.2\'s ladder).',
              'Now, the cargo - services riding the backbone, 6 members: the Web (the fleet of linked pages), the email message (email\'s cargo), the HTTP request (the Web\'s own mover speaking), the webpage (one page of the fleet), the video call (another rider), and the search engine\'s index (a service\'s possession, stored on its own servers).',
              'Check the traps: the DNS system is infrastructure even though it is a service in the everyday sense - it serves the network itself, not the citizen\'s errands; the search engine\'s index is service-side even though it feels like a map of everything.',
              'Hence 4 infrastructure (the router, the optical fibre, the TCP/IP suite, the DNS system) and 6 service (the Web, the email message, the HTTP request, the webpage, the video call, the search engine\'s index), by the one question: does the thing carry cargo, or is it the cargo.',
            ]
          },
          {
            q: 'EXAM-STYLE. The phishing pair: given my-bank.example.com and my-bank.examp1e.com, identify the fake, name the exact character that gives it away, and run the citizen\'s checklist - including the honest limit of the padlock.',
            answer: 'Hence my-bank.examp1e.com is the fake - the digit 1 for the letter l, the sixth character - and the checklist reads the domain first, checks the padlock second (it proves the pipe, not the person), and never clicks through fear',
            solution: [
              'Take the checklist\'s first move: read the domain character by character, from the last dot backwards.',
              'So, the honest pattern spells e-x-a-m-p-l-e; the suspect spells e-x-a-m-p-1-e - the digit 1 in the letter\'s place, one character of difference, and a different machine entirely.',
              'Now, the honest limit of the padlock: the wrap proves the PIPE, not the person - the fake can wear one too, since encryption is a seal on the envelope, not a character reference.',
              'Check the third move: never click through fear - the 24-hour countdown is the swindler\'s clock, not the bank\'s.',
              'Hence my-bank.examp1e.com is the fake - the digit 1 for the letter l, the sixth character - and the checklist reads the domain first, checks the padlock second (it proves the pipe, not the person), and never clicks through fear.',
            ],
            figures: [{ caption: 'The spot-the-fake panel: the honest pattern against the lookalike, the one-character tell, and the three-move checklist beneath.', svg: cf63SolPhishPanelSvg() }],
          },
          {
            q: 'EXAM-STYLE. Using the dated beats - Mosaic 1993, Netscape\'s cookies 1994, Internet Explorer 1995 - compute: the two consecutive gaps; the span of the triplet; and the years from each landmark to this chapter\'s year, 2026.',
            answer: 'Hence the gaps are 1 and 1 (three consecutive years), and the spans to 2026 are 33 years from Mosaic, 32 from Netscape\'s cookies, 31 from Internet Explorer',
            solution: [
              'Take the three pinned years in order: 1993, 1994, 1995.',
              'So, the gaps: 1994 - 1993 = 1 (cookies one year after Mosaic) and 1995 - 1994 = 1 (IE one year after cookies).',
              'Now, the span of the triplet: 1995 - 1993 = 2 years covering all three landmarks - three consecutive years, the browser era\'s opening chord.',
              'Check the spans to 2026: 2026 - 1993 = 33 years from Mosaic, 2026 - 1994 = 32 from Netscape\'s cookies, 2026 - 1995 = 31 from Internet Explorer.',
              'Hence the gaps are 1 and 1 (three consecutive years), and the spans to 2026 are 33 years from Mosaic, 32 from Netscape\'s cookies, 31 from Internet Explorer.',
            ]
          },
          {
            q: 'Census arithmetic on the pinned URL https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2: count the top-level parts, the sub-parts of the authority, and the characters; then re-count the visible top-level parts of its short form https://www.example.co.in/ and say what the missing port means.',
            answer: 'Hence 5 top-level parts, 3 sub-parts, 63 characters; and the short form shows 3 of the 5 (scheme, authority, path), with the untyped port meaning the assumed 443',
            solution: [
              'Take the pinned URL and run the two equations: the grammar of (1), then the authority split of (2).',
              'So, the top-level census: scheme, authority, path, parameters, anchor - 5 parts.',
              'The authority census: subdomain, domain, port - 3 sub-parts inside the one authority.',
              'Now, count the characters of the whole string: 63 - one address, no two working URLs naming the same page.',
              'Check the short form https://www.example.co.in/: scheme, authority and the bare-slash path are visible - 3 of the 5 - with parameters and anchor absent, and no port typed.',
              'So, the missing port means the scheme\'s default is assumed: 443 for https (80 would belong to plain http).',
              'Hence 5 top-level parts, 3 sub-parts, 63 characters; and the short form shows 3 of the 5 (scheme, authority, path), with the untyped port meaning the assumed 443.',
            ]
          },
          {
            q: 'EXAM-STYLE. The full walk: you type the fresh URL https://shop.example.co.in/cart into the address bar of a browser you have used before. Order the five beats with their ports, state what the TLS wrap changes, say what the cookie adds on your second visit - and finish with the citizen\'s move if the padlock shows but the domain reads shop.examp1e.co.in.',
            answer: 'Hence DNS (53), TCP at 443, request, response, render; the wrap turns the wire\'s text to ciphertext; the cookie makes visit 2 remembered; and the examp1e domain - digit 1 for letter l - is the fake, whatever the padlock says',
            solution: [
              'Take the five beats with the ports pinned: DNS lookup on 53 (beat 1), TCP connection at 443 - the scheme is https (beat 2), HTTP request (beat 3), HTTP response (beat 4), render (beat 5).',
              'So, the TLS wrap changes one thing: the wire carries ciphertext instead of the request and response in plain text - the dance itself is untouched.',
              'Now, the cookie: visit 1\'s response sets it, the browser stores it, and visit 2\'s request carries it back - the cart survives the statelessness.',
              'Check the ending move: the domain reads shop.examp1e.co.in - the digit 1 wearing the letter l\'s coat inside examp1e.',
              'So the citizen\'s verdict: the page is the FAKE, whatever the padlock says - the wrap proves the pipe, not the person - and the 24-hour fear, if any arrives, is the swindler\'s clock.',
              'Hence DNS (53), TCP at 443, request, response, render; the wrap turns the wire\'s text to ciphertext; the cookie makes visit 2 remembered; and the examp1e domain - digit 1 for letter l - is the fake, whatever the padlock says.',
            ]
          },
        ],
      },
    ] },
  ],
}
