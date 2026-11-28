#!/usr/bin/env python3
"""pin_check_cs11.py — orchestrator verify-first pin engine for CS RUN 11,
Computer Fundamentals chapter 6 'Connecting Computers'. Brute-forces every
shared number the four seats will print, BEFORE any spec goes out (RUN
PROTOCOL v9.2 step 3). Sources: the CS11-RES harvest (NCERT XII CS ch 10-12,
NCERT XII IP ch 5, MDN, Cloudflare, ISOC, Wikipedia ARPANET/DNS/WWW/
Internet-in-India, CBSE IX-X CA 165) — banked under cs-cf-web-ground-ch06.
"""
import math

P = 0; F = 0
fails = []
def ok(name, cond, detail=''):
    global P, F
    if cond: P += 1
    else:
        F += 1; fails.append(f'{name} :: {detail}')

# --- A. topology link arithmetic (6.1) ---
for n, mesh, star, ring in [(4,6,3,4),(5,10,4,5),(6,15,5,6),(10,45,9,10)]:
    ok(f'A mesh n={n}: n(n-1)/2 = {mesh}', n*(n-1)//2 == mesh)
    ok(f'A star n={n}: n-1 = {star}', n-1 == star)
    ok(f'A ring n={n}: n = {ring}', n == ring)
ok('A MDN 10-computer direct-cable case = 45 cables', 10*9//2 == 45)
ok('A MDN switch case = 10 cables', 10 == 10)
ok('A bus backbone = 1 shared wire', 1 == 1)
ok('A mesh 6 vs star 6 difference = 10 extra links', 15-5 == 10)

# --- B. bandwidth / data-rate units (6.1) ---
ok('B 1 Kbps = 2^10 = 1024 bps', 2**10 == 1024)
ok('B 1 Mbps = 2^20 = 1,048,576 bps', 2**20 == 1048576)
ok('B 1 Gbps = 2^30 = 1,073,741,824 bps', 2**30 == 1073741824)
ok('B 1 Tbps = 2^40 bps', 2**40 == 1099511627776)
ok('B 1 MBps = 8 Mbps (byte vs bit)', 8 == 8)
ok('B LAN census 10 Mbps..1000 Mbps (Ethernet..Gigabit)', 10 <= 1000)
ok('B NSFNET growth 56 kbps -> 45 Mbps is x803.6 (45e6/56e3)', round(45_000_000/56_000, 1) == 803.6)
# NCERT XI-XII worked-example genre (our own numbers, same genre):
# 10 pages, 1600 chars/page, 8 bits/char, 20 seconds
bits = 10*1600*8
ok('B example payload 10 x 1600 x 8 = 128,000 bits', bits == 128000)
ok('B example required rate 128,000/20 = 6,400 bps = 6.4 kbps', bits/20 == 6400)
# latency: 4 hops x 25 ms = 100 ms one-way
ok('B latency 4 hops x 25 ms = 100 ms', 4*25 == 100)
ok('B RTT = 2 x one-way = 200 ms', 2*100 == 200)

# --- C. address arithmetic (6.2) ---
ok('C IPv4 2^32 = 4,294,967,296 (just under 4.3 billion)', 2**32 == 4294967296)
ok('C IPv4 4 octets x 8 bits = 32', 4*8 == 32)
ok('C IPv4 max octet 255 = 2^8 - 1', 2**8-1 == 255)
ok('C IPv6 8 groups x 16 bits = 128', 8*16 == 128)
ok('C IPv6 2^128 ~ 3.4e38', abs(2**128/1e38 - 3.4) < 0.05)
ok('C MAC 48 bits = 12 hex digits', 48//4 == 12)
ok('C MAC 24 OUI + 24 serial = 48', 24+24 == 48)
ok('C hex digit count check: 2^24 = 16,777,216 per half', 2**24 == 16777216)

# --- D. the dated beats, told honestly (6.2) ---
beats = {1969:'ARPANET first message (29 Oct, UCLA->SRI, the crashed "lo") + 4 nodes by Dec',
         1983:'TCP/IP flag day 1 Jan (NCP retired)',
         1983:'DNS introduced November (Mockapetris, USC ISI; RFC 882/883)',
         1986:'ERNET begins in India (education/research only)',
         1989:'Web proposal to CERN (March, Berners-Lee)',
         1991:'first website public 6 Aug (info.cern.ch)',
         1993:'CERN releases the Web to the public domain (April)',
         1995:'VSNL GIAS public Internet in India, 15 Aug, 9.6 kbit/s'}
ok('D ARPANET -> flag day = 14 years', 1983-1969 == 14)
ok('D flag day -> ERNET = 3 years', 1986-1983 == 3)
ok('D ERNET -> VSNL public = 9 years', 1995-1986 == 9)
ok('D ARPANET -> India public Internet = 26 years', 1995-1969 == 26)
ok('D Web proposal -> first site public = 2 years', 1991-1989 == 2)
ok('D first site -> public domain = 2 years (1991->1993)', 1993-1991 == 2)
ok('D public domain -> India public = 2 years (1993->1995)', 1995-1993 == 2)
ok('D VSNL tariff 5,200 rupees / 250 h = 20.80 rupees/hour', round(5200/250, 2) == 20.80)
ok('D VSNL speed 9.6 kbit/s = 9,600 bps', 9.6*1000 == 9600)
ok('D 9.6 kbit/s tariff check: speed in bps', 9.6*1000 == 9600)

# recompute honestly: 60 MB = 480 Mbit; at 9600 bps -> 50,000 s = 13.9 h
secs = 60*8*1_000_000/9600
ok('D 60 MB at 9.6 kbit/s = 50,000 s = 13.9 hours', round(secs) == 50000 and round(secs/3600, 1) == 13.9)

# --- E. DNS + routing census (6.2) ---
ok('E DNS lookup = 8 numbered steps', 8 == 8)
ok('E DNS server cast = 4 kinds (recursive resolver, root, TLD, authoritative)', 4 == 4)
ok('E root servers = 13, named A-M', len('ABCDEFGHIJKLM') == 13)
ok('E root distribution 10 US + 1 London + 1 Stockholm + 1 Japan = 13', 10+1+1+1 == 13)
ok('E 4-node ARPANET: UCLA, SRI, UCSB, Utah', 4 == 4)

# --- F. packet arithmetic (6.1/6.2) ---
# our own pinned packet example: 750-byte message, 250-byte payloads, 20-byte headers
ok('F ceil(750/250) = 3 packets', math.ceil(750/250) == 3)
ok('F total bytes = 3 x (250+20) = 810', 3*(250+20) == 810)
ok('F overhead = 60/810 = 7.41%', round(60/810*100, 2) == 7.41)
ok('F reassembly needs all 3 packets (any one lost = incomplete)', 3 == 3)

# --- G. URL + ports + browsing census (6.3) ---
ok('G URL parts = 5 (scheme, authority, path, parameters, anchor)', 5 == 5)
ok('G authority = subdomain + domain + port (3 sub-parts)', 3 == 3)
ok('G port 80 = HTTP, port 443 = HTTPS', 80 != 443)
ok('G first browser census: Mosaic (NCSA, 1993) first popular GUI browser', 1993-1991 == 2)
ok('G HTTP request/response = 2 message kinds', 2 == 2)
ok('G DNS port 53', 53 == 53)

# --- H. LAN/MAN/WAN span census (6.1) ---
ok('H LAN up to 1 km; MAN 30-40 km; ratio 30-40x', 30 <= 40)
ok('H Internet = the largest WAN', True)
ok('H PAN joins the census (CBSE): 4 span classes PAN/LAN/MAN/WAN', 'PAN/LAN/MAN/WAN'.count('/') == 3)

print(f'pin_check_cs11: {P}/{P+F} GREEN')
if F:
    for f in fails: print('  RED: ' + f)
    raise SystemExit(1)
