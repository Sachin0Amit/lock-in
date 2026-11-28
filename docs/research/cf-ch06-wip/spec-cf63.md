# SEAT cf63 — CS RUN 11 swarm, chapter 6 'Connecting Computers'
## Lesson 6.3 'Browsing the Web: the Citizen's Vocabulary'

Read `docs/research/cf-ch06-wip/SPEC_CORE.md` FULLY first — the shared
contract (engine-first, part shape, blocks, SVG rules, raw-TeX law, voice).
THIS file pins your unique content. You touch ONLY:
- engine: `docs/research/cf-ch06-wip/v-cf63.ts` (>= 45 checks GREEN before
  prose; final >= 5 re-read checks import your part)
- part:   `docs/research/cf-ch06-wip/part-cf63.ts`
Unique prefix for EVERY helper/palette/const: `cf63` / `c63` / `f63`.

## Identity (pinned, stable forever)
- `id: 'cf-browsing-the-web-the-citizens-vocabulary'`, `number: '6.3'`,
  `title: 'Browsing the Web: the Citizen's Vocabulary'` (VERBATIM — note
  the apostrophe is a straight ASCII `'` in the source string)
- `prerequisites: ['cf-the-internet-a-network-of-networks']`
- `sources: ['cs-cf-web-ground-ch06']`
- `quiz` key: `[2, 1, 4, 3, 0]`

## The lesson you are writing (verified fact bank — carry EXACTLY)

1. **The Internet vs the Web, the citizen's first distinction**: the
   Internet is the INFRASTRUCTURE (the wires, routers and protocols of
   6.2); the Web is ONE service built on top — a world of pages written in
   HTML, found by URLs, moved by HTTP. Email is a DIFFERENT service riding
   the same infrastructure. MDN's line: 'the Internet is the backbone of
   the Web'.
2. **The browser, honestly**: a software application that fetches, renders
   and displays pages (text, images, audio, video, hyperlinks). Census:
   Chrome, Firefox, Safari, Opera, Edge — with the honest note that Edge
   is Internet Explorer's successor (the 1995 browser war generation).
   Mosaic (NCSA, 1993) was the first popular graphical browser. Anatomy
   walk: the address bar, the back button, tabs, bookmarks — the chrome
   around the page.
3. **The URL, the address of a unique resource** (MDN anatomy, pinned):
   `https://www.example.co.in:443/textbook/ch6.htm?q=glassdoor#sec2` ->
   **scheme** (https) :// **authority** = subdomain (www) + domain
   (example.co.in) + port (443, usually hidden) / **path**
   (textbook/ch6.htm) ? **parameters** (q=glassdoor) # **anchor** (sec2).
   That is 5 top-level parts; the authority has 3 sub-parts. Ports: 80 =
   HTTP, 443 = HTTPS. NCERT labels: http = protocol, www = subdomain,
   ncert.nic.in = domain.
4. **HTTP, the two-message dance**: a client-server protocol — the BROWSER
   sends a REQUEST ('GET me this page'), the SERVER returns a RESPONSE
   (the page, or an error). HTTP is stateless (each request stands alone).
   **404** = the honest 'page not found' answer. Designed in the early
   1990s to move linked documents.
5. **HTTPS = HTTP over TLS** (Transport Layer Security; the old name SSL
   survives in speech): the same request/response, wrapped in encryption;
   the padlock in the address bar; plain HTTP on public Wi-Fi is sniffable
   — a warn callout.
6. **Search engines vs typed URLs**: when you know the address you type a
   URL; when you do not, you ask a search engine (google.co.in, bing.com,
   duckduckgo.com) — the engine has already crawled and indexed the Web
   and answers from its index. Two different fetches, honestly told.
7. **Cookies, the memory patches**: HTTP is stateless; a cookie is a small
   piece of data a server sends to your browser, stored, and sent back
   with later requests — the shopping-cart memory. First cookie software:
   Netscape, 1994 (to tell first-time from returning visitors). Cannot
   read your hard disk or carry viruses — but they do track, which is why
   clearing them exists.
8. **Phishing, named honestly** (MDN): a social-engineering attack that
   tricks you into believing you are on your real bank's site when you are
   on the attacker's copy; you type your credentials into the fake. The
   lookalike-domain trick: my-bank.example.com vs my-bank.examp1e.com (the
   digit 1 for the letter l). The citizen's checklist: read the domain,
   look for the padlock, never click through fear.

Doorsteps: 'Full-Stack Web Development' owns building pages; 'Cybersecurity'
owns the full threat model; cross-reference 6.2's DNS ladder by name (the
first step of every fetch IS the DNS lookup).

## Figure plan (body >= 3, computed SVG)
- FIG A (body) 'THE STACK, DRAWN HONESTLY': the Web, email and other
  services as application boxes riding the Internet bar riding the
  physical media bar — three layers, arrows up and down.
- FIG B (body) 'THE URL, DISSECTED': the pinned example URL with braces and
  labels for scheme / subdomain / domain / port / path / parameters /
  anchor; the 5-part census and ports 80/443 in the caption.
- FIG C (body) 'THE TWO-MESSAGE DANCE': browser and server boxes, STEP 1
  request arrow, STEP 2 response arrow, plus the 404 branch when the path
  is missing; a second panel wraps the same two steps in a TLS shield for
  HTTPS.
- FIG D (body) 'THE COOKIE ROUND-TRIP': three beats — first visit (server
  sets the cookie), storage in the browser, next visit (the cookie rides
  back, the server remembers the cart).
- SOLUTION figures (>= 4): a URL-part labelling drill board; an HTTP-vs-
  HTTPS census panel; a spot-the-fake-domain panel (examp1e); a fetch-order
  strip (DNS -> TCP -> HTTP request -> response -> render).

## Exercises
15 graded questions: URL part identification, port census, HTTP vs HTTPS
sorting, cookie mechanics, phishing-spotting, service-vs-infrastructure
classification. `terms` bank: World Wide Web, website, webpage, web server,
browser, URL, HTTP, HTTPS, TLS, search engine, cookie, phishing.
`exam` callout: CUET B2 'website vs webpage, web browsers, cookies';
SSC/banking 'http vs https, phishing'; Cambridge 9618 'URLs, web
browsers'.
