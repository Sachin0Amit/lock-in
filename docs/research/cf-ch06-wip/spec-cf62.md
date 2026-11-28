# SEAT cf62 — CS RUN 11 swarm, chapter 6 'Connecting Computers'
## Lesson 6.2 'The Internet: a Network of Networks'

Read `docs/research/cf-ch06-wip/SPEC_CORE.md` FULLY first — the shared
contract (engine-first, part shape, blocks, SVG rules, raw-TeX law, voice).
THIS file pins your unique content. You touch ONLY:
- engine: `docs/research/cf-ch06-wip/v-cf62.ts` (>= 45 checks GREEN before
  prose; final >= 5 re-read checks import your part)
- part:   `docs/research/cf-ch06-wip/part-cf62.ts`
Unique prefix for EVERY helper/palette/const: `cf62` / `c62` / `f62`.

## Identity (pinned, stable forever)
- `id: 'cf-the-internet-a-network-of-networks'`, `number: '6.2'`,
  `title: 'The Internet: a Network of Networks'` (VERBATIM)
- `prerequisites: ['cf-the-network-idea']`
- `sources: ['cs-cf-web-ground-ch06']`
- `quiz` key: `[1, 4, 2, 0, 3]`

## The lesson you are writing (verified fact bank — carry EXACTLY)

1. **The tiered ladder** (NCERT XII IP ch 5, our retelling): your device ->
   modem -> local ISP -> regional network -> national network -> the
   backbone; 'the Internet is a network of networks' — thousands of LANs
   and ISPs agreeing to speak ONE common protocol family. An **ISP** is any
   organisation that provides access to the Internet.
2. **TCP/IP, the treaty**: the protocol family every member speaks. The
   honest history: **ARPANET 1969** — first message 10:30 pm PST 29 October
   1969, UCLA to SRI; the intended 'login' crashed after two letters, so
   the first characters ever transmitted were **'lo'**; four nodes by
   December 1969 (UCLA, SRI, UCSB, Utah). **Flag day 1 January 1983**: every
   host switched from NCP to TCP/IP at once. **DNS November 1983**:
   Mockapetris at USC ISI (RFC 882/883) replaced the single HOSTS.TXT
   table. **ERNET 1986**: India's education/research network. **March
   1989**: Berners-Lee's Web proposal at CERN. **6 August 1991**: first
   website public (info.cern.ch). **April 1993**: CERN released the Web to
   the public domain. **15 August 1995**: VSNL's Gateway Internet Access
   Service opened public Internet in India at 9.6 kbit/s (tariff 5,200
   rupees for 250 hours = 20.80 rupees/hour). NSFNET's backbone grew from
   6 nodes at 56 kbps to 21 nodes at 45 Mbps.
   PINNED GAP ARITHMETIC (engine-checked): 1969->1983 = 14; 1983->1986 =
   3; 1986->1995 = 9; 1969->1995 = 26; 1989->1991 = 2; 1991->1993 = 2;
   1993->1995 = 2. 60 MB at 9.6 kbit/s = 480 Mbit / 9,600 bps = 50,000 s
   = 13.9 hours — the patience our connection era demanded.
3. **IP addresses**: the house-address analogy (Cloudflare). **IPv4**: 32
   bits, four dot-separated octets 0-255 (example 192.168.0.178; 4 x 8 =
   32), 2^32 = 4,294,967,296 — just under 4.3 billion, NOT enough. **IPv6**:
   128 bits, eight colon-separated hex groups (example 2001:CDBA:0000:0000:
   0000:0000:3257:9652), 2^128 ~ 3.4 x 10^38. **MAC vs IP**: MAC = 48-bit
   hardware address (12 hex digits: 24-bit manufacturer OUI + 24-bit
   serial), burnt in; IP changes when the node moves network.
4. **DNS, the phonebook**: humans type names, machines route numbers; the
   conversion is **domain name resolution** by the DNS server. The lookup
   ladder (Cloudflare's 8 steps, 4 server kinds): browser -> **recursive
   resolver** -> **root server** ('.') -> **TLD server** ('.com') ->
   **authoritative server** -> answer back -> browser sends HTTP to the IP.
   Library analogy: resolver = the librarian, root = the index, TLD = a
   rack, authoritative = the book. **13 root name servers, named A-M**
   (ten US, one London, one Stockholm, one Japan); DNS listens on port 53.
5. **Routers and hops**: a **hop** = one passage from one network segment
   to the next; more hops = more accumulated delay (4 hops x 25 ms = 100 ms
   one-way). The router 'receives, analyses, transmits' — it chooses the
   next network, packet by packet.
6. **Client and server**: the request-maker and the answer-keeper; your
   browser is a client; the site's machine is a server. One honest
   paragraph — the deep model door stays with Computer Networks.

Doorsteps: 'Computer Networks' owns switching theory, routing algorithms,
congestion, the full protocol stack; 'Cybersecurity' owns the attack
surface. Cross-reference 6.1 (packets, bandwidth) by name.

## Figure plan (body >= 3, computed SVG)
- FIG A (body) 'THE TIER LADDER': device -> modem -> local ISP -> regional
  -> national -> backbone, six rungs, arrows both ways; caption: 'a network
  of networks; the backbone is country-scale'.
- FIG B (body) 'THE DATED BEATS, TOLD HONESTLY': a 1969->1995 timeline with
  the eight beats above, gaps COMPUTED and printed (14 / 3 / 9 / 26 / 2 /
  2 / 2).
- FIG C (body) 'THE DNS LADDER': the 8-step / 4-server lookup as a numbered
  ladder, browser at both ends; port 53 noted.
- FIG D (body) 'IPv4 vs IPv6': the two address anatomies side by side, 4
  octets x 8 bits vs 8 groups x 16 bits, space counts 2^32 vs 2^128.
- SOLUTION figures (>= 4): a gap-arithmetic solve board; a resolution-order
  strip (order the 4 servers); an address-space comparison bar; a hop-count
  latency board; a HOSTS.TXT -> DNS then/now panel.

## Exercises
15 graded questions: date ordering + gap arithmetic, IPv4/IPv6/MAC census
sorting, DNS step ordering, hop latency sums, ISP/tier identification.
`terms` bank: Internet, ISP, backbone, TCP/IP, IP address, IPv4, IPv6, MAC
address, DNS, root server, router, hop, client, server. `exam` callout:
UGC NET U9 'World wide web: URL, domain name service'; CUET 'difference
between Internet and Web'; Cambridge 9618 'IP addresses, DNS'.
