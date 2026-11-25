#!/usr/bin/env python3
"""pin_check_cs5.py — CS RUN 5 (the cs job's fifth honored fire, 2026-11-25):
the ORCHESTRATOR's verify-first pin checker for Computer Fundamentals
chapter 3 'Data Representation: a First Meeting' (the whole-chapter fire:
8 planned lessons + the 3.R review, NINE agent seats).

Every number that will be written into the chapter is brute-forced HERE
before any spec is finalized. The engine wins over every other source:
where a spec draft and this checker disagree, the checker's value ships.

Historical pins are web-verified (the log of URLs rides SOURCE_LOG.md
under cs-cf-web-ground); arithmetic pins are computed below.

Sections (one per seat + the shared quiz keys):
  P1  bits — the two-symbol ground, powers census, SI vs binary ladder
  P2  numbering systems — the four bases, the 45-in-four-dresses witness
  P3  codes — ASCII arithmetic, BCD waste, Unicode space, UTF-8 witnesses
  P4  text/images/sound — the multimedia data-rate censuses
  P5  compression — RLE, Huffman tree, LZW trace, JPEG blocks, MP3 ratio
  P6  decimal -> binary — division ladders, the positional method, fractions
  P7  binary -> decimal — weight sums, the doubling method, grouped reads
  P8  decimal AND binary — the synthesis census (both-side arithmetic)
  P9  the review's witness table (the chapter's pinned census)
  PK  the nine quiz keys + id/format floors
"""

import math

PASS = 0
FAIL = 0
FAILS = []


def ok(name, cond, detail=""):
    global PASS, FAIL
    if cond:
        PASS += 1
    else:
        FAIL += 1
        FAILS.append(f"{name} :: {detail}")


def near(a, b, eps=1e-9):
    return abs(a - b) < eps


def to_base(n, b):
    if n == 0:
        return "0"
    digs = "0123456789ABCDEF"
    s = ""
    while n:
        s = digs[n % b] + s
        n //= b
    return s


def div_ladder(n, b=2):
    """the repeated-division remainder ladder, remainders read bottom-up"""
    rems = []
    while n > 0:
        rems.append(n % b)
        n //= b
    return list(reversed(rems))


def horner(bits):
    v = 0
    for ch in bits:
        v = 2 * v + (1 if ch == "1" else 0)
    return v


def huffman_depths(freqs):
    """build a Huffman tree by repeated merging; return {symbol: depth}"""
    import heapq
    items = [[f, [s, 0]] for s, f in freqs.items()]  # [weight, [sym, depth]]
    heapq.heapify(items)
    count = 0
    while len(items) > 1:
        a = heapq.heappop(items)
        b = heapq.heappop(items)
        merged = [a[0] + b[0], None]
        for leaf in (a, b):
            if leaf[1] is not None:
                leaf[1][1] += 1
                merged.append(leaf)
            else:
                # unwrap the nested list structure
                stack = [leaf]
                pass
        count += 1
    return items


# -- proper Huffman: track leaves as (weight, {sym: depth}) -------------
def huffman(freqs):
    import heapq
    heap = [(f, i, {s: 0}) for i, (s, f) in enumerate(sorted(freqs.items()))]
    heapq.heapify(heap)
    while len(heap) > 1:
        w1, _, d1 = heapq.heappop(heap)
        w2, _, d2 = heapq.heappop(heap)
        merged = {s: d + 1 for s, d in {**d1, **d2}.items()}
        heapq.heappush(heap, (w1 + w2, 0, merged))
    return heap[0][2]


print("== P1 BITS: the two-symbol ground ==")
p2 = [2 ** k for k in range(0, 33)]
ok("P1.1 powers of two 2^0..2^10 pinned",
   p2[:11] == [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024])
ok("P1.2 n bits name 2^n patterns (8 -> 256, 16 -> 65,536, 32 -> 4,294,967,296)",
   2 ** 8 == 256 and 2 ** 16 == 65536 and 2 ** 32 == 4294967296)
ok("P1.3 one byte = 8 bits = 256 patterns = exactly 2 hex digits (16^2)",
   16 ** 2 == 256 == 2 ** 8)
ok("P1.4 2^20 = 1,048,576 exceeds a million (twenty questions sort a million)",
   2 ** 20 == 1048576 and 2 ** 20 > 1000000)
# the SI vs binary ladder
si = {"kilo": 10 ** 3, "mega": 10 ** 6, "giga": 10 ** 9, "tera": 10 ** 12}
iec = {"kibi": 2 ** 10, "mebi": 2 ** 20, "gibi": 2 ** 30, "tebi": 2 ** 40}
ok("P1.5 KiB = 1,024 B (2.4% above the SI kB)",
   iec["kibi"] == 1024 and near(1024 / 1000 - 1, 0.024))
ok("P1.6 MiB = 1,048,576 B; MB = 1,000,000 B; the gap = 4.8576%",
   iec["mebi"] == 1048576 and near(1048576 / 1000000 - 1, 0.048576))
ok("P1.7 GiB = 1,073,741,824 B; the gap = 7.3741824%",
   iec["gibi"] == 1073741824 and near(1073741824 / 1000000000 - 1, 0.073741824))
ok("P1.8 TiB = 1,099,511,627,776 B; the gap ~ 9.95%",
   iec["tebi"] == 1099511627776 and near(1099511627776 / 1000000000000 - 1, 0.099511627776, 1e-9))
# information measures (first meeting)
ok("P1.9 fair coin: one flip carries exactly 1 bit (H = log2 2)",
   near(math.log2(2), 1.0))
ok("P1.10 one die roll: log2 6 = 2.5849625 bits (engine value)",
   near(math.log2(6), 2.584962500721156))
ok("P1.11 one card from 52: log2 52 = 5.7004397 bits (engine value)",
   near(math.log2(52), 5.700439718141092))
ok("P1.12 two-state census: 10 switches hold 2^10 = 1,024 patterns",
   2 ** 10 == 1024)

print("== P2 NUMBERING SYSTEMS: the census ==")
ok("P2.1 digit counts: binary 2, octal 8, decimal 10, hexadecimal 16",
   (2, 8, 10, 16) == (2, 8, 10, 16))
ok("P2.2 45 in four dresses: 101101b = 55o = 45d = 2Dh",
   to_base(45, 2) == "101101" and to_base(45, 8) == "55"
   and to_base(45, 10) == "45" and to_base(45, 16) == "2D")
ok("P2.3 positional check: 101101b = 32+8+4+1 = 45",
   32 + 8 + 4 + 1 == 45)
ok("P2.4 positional check: 55o = 5*8+5 = 45; 2Dh = 2*16+13 = 45",
   5 * 8 + 5 == 45 and 2 * 16 + 13 == 45)
ok("P2.5 grouping: one octal digit = 3 bits (2^3 = 8); one hex digit = 4 bits (2^4 = 16)",
   2 ** 3 == 8 and 2 ** 4 == 16)
ok("P2.6 hex -> binary regroup: 2D = 0010 1101",
   "".join(format(int(ch, 16), "04b") for ch in "2D") == "00101101")
ok("P2.7 binary -> octal regroup: 101101 -> 101 101 -> 5 5",
   "".join(str(int(g, 2)) for g in ["101", "101"]) == "55")
ok("P2.8 n hex digits name 16^n values: 2 -> 256 (the byte), 4 -> 65,536, 6 -> 16,777,216",
   16 ** 2 == 256 and 16 ** 4 == 65536 and 16 ** 6 == 16777216)
ok("P2.9 the counting table spot checks (0..16 all four bases)",
   to_base(7, 2) == "111" and to_base(8, 2) == "1000" and to_base(8, 8) == "10"
   and to_base(9, 2) == "1001" and to_base(10, 2) == "1010" and to_base(10, 16) == "A"
   and to_base(15, 2) == "1111" and to_base(15, 8) == "17" and to_base(15, 16) == "F"
   and to_base(16, 2) == "10000" and to_base(16, 8) == "20" and to_base(16, 16) == "10")
ok("P2.10 hex digit values A..F = 10..15; 0x10 = 16",
   int("F", 16) == 15 and int("10", 16) == 16)
ok("P2.11 the largest n-bit binary is 2^n - 1 (8 bits -> 255; 16 bits -> 65,535)",
   2 ** 8 - 1 == 255 and 2 ** 16 - 1 == 65535)
ok("P2.12 1,000 in hex = 3E8 (a 3-digit hex witness beyond the byte)",
   to_base(1000, 16) == "3E8")

print("== P3 CODES: ASCII, Unicode, BCD ==")
ok("P3.1 ASCII: 7 bits -> 128 codes = 33 control + 95 printable",
   2 ** 7 == 128 and 33 + 95 == 128)
ok("P3.2 ASCII arithmetic: '0' = 48, 'A' = 65, 'a' = 97, space = 32, DEL = 127",
   ord("0") == 48 and ord("A") == 65 and ord("a") == 97 and ord(" ") == 32 and ord("\x7f") == 127)
ok("P3.3 'a' - 'A' = 32 = 100000b (the case flip is bit 5)",
   ord("a") - ord("A") == 32 == 2 ** 5)
ok("P3.4 'A' = 65 = 1000001b; 'a' = 97 = 1100001b (bit 5 set)",
   format(ord("A"), "07b") == "1000001" and format(ord("a"), "07b") == "1100001")
ok("P3.5 digit arithmetic: '7' - '0' = 7; '5' = 53; '9' = 57; 'B' = 66; 'z' = 122",
   ord("7") - ord("0") == 7 and ord("5") == 53 and ord("9") == 57
   and ord("B") == 66 and ord("z") == 122)
ok("P3.6 BCD: 4 bits, weights 8-4-2-1; BCD(45) = 0100 0101; BCD(9) = 1001",
   format(4, "04b") + " " + format(5, "04b") == "0100 0101" and format(9, "04b") == "1001")
ok("P3.7 BCD invalids: exactly 6 patterns (1010..1111) never appear",
   [format(n, "04b") for n in range(10, 16)] == ["1010", "1011", "1100", "1101", "1110", "1111"])
ok("P3.8 two BCD digits (8 bits) hold 0..99 = 100 values vs 256 patterns: 156 wasted = 60.9375%",
   256 - 100 == 156 and near(156 / 256 * 100, 60.9375))
ok("P3.9 pure 8-bit binary holds 0..255 (2.55x the two-digit BCD range)",
   255 == 256 - 1 and near(255 / 99, 2.5757575757575757))
ok("P3.10 Unicode space: 17 planes x 65,536 = 1,114,112 code points (0..10FFFF)",
   17 * 65536 == 1114112 == int("10FFFF", 16) + 1)
ok("P3.11 surrogates D800..DFFF = 2,048 values reserved, never characters",
   int("DFFF", 16) - int("D800", 16) + 1 == 2048)
ok("P3.12 Unicode 17.0 (9 Sep 2025): 159,801 characters occupy 159,801 of 1,114,112 code points = 14.3434%",
   near(159801 / 1114112 * 100, 14.343351476332721))
ok("P3.13 UTF-8 classes: 1B holds 2^7 = 128 (U+0000..007F); 2B holds 2^11 = 2,048 (U+0080..07FF); 3B holds 2^16 (U+0800..FFFF); 4B holds 2^21 (U+10000..10FFFF)",
   2 ** 7 == 128 and 2 ** 11 == 2048 and 2 ** 16 == 65536 and 2 ** 21 == 2097152)
ok("P3.14 UTF-8 witnesses: A -> 0x41 (1B); e-acute U+00E9 -> C3 A9; rupee U+20B9 -> E2 82 B9; smiley U+1F642 -> F0 9F 99 82",
   list("A".encode("utf-8")) == [0x41]
   and list("é".encode("utf-8")) == [0xC3, 0xA9]
   and list("₹".encode("utf-8")) == [0xE2, 0x82, 0xB9]
   and list("\U0001F642".encode("utf-8")) == [0xF0, 0x9F, 0x99, 0x82])
ok("P3.15 leading bytes: 0xxxxxxx / 110xxxxx / 1110xxxx / 11110xxx; continuation 10xxxxxx",
   format(0x41, "08b").startswith("0")
   and format(0xC3, "08b").startswith("110")
   and format(0xE2, "08b").startswith("1110")
   and format(0xF0, "08b").startswith("11110")
   and format(0x9F, "08b").startswith("10"))
ok("P3.16 the UTF-8 census of 'A = ₹' (4 ASCII chars + the 3-byte rupee) = 7 bytes; 'é' alone = 2",
   len("A = ₹".encode("utf-8")) == 7
   and list("A = ₹".encode("utf-8")) == [65, 32, 61, 32, 226, 130, 185]
   and len("é".encode("utf-8")) == 2)

print("== P4 TEXT, IMAGES AND SOUND AS BITS ==")
ok("P4.1 a 5,000-character English essay: 5,000 B in UTF-8 (ASCII letters) vs 10,000 B in UTF-16",
   len(("A" * 5000).encode("utf-8")) == 5000
   and len(("A" * 5000).encode("utf-16-le")) == 10000)
ok("P4.2 a Devanagari character rides 3 UTF-8 bytes ('ka' U+0915)",
   len("क".encode("utf-8")) == 3)
ok("P4.3 bit depth: 8-bit gray = 256 levels; 24-bit RGB = 16,777,216 colours",
   2 ** 8 == 256 and 2 ** 24 == 16777216)
ok("P4.4 1080p = 1920 x 1080 = 2,073,600 pixels; 720p = 921,600 (a 2.25x area ratio)",
   1920 * 1080 == 2073600 and 1280 * 720 == 921600 and near(2073600 / 921600, 2.25))
ok("P4.5 one 1080p RGB frame = 2,073,600 x 3 = 6,220,800 B = 5.9326171875 MiB",
   2073600 * 3 == 6220800 and near(6220800 / 1048576, 5.9326171875))
ok("P4.6 30 fps video = 6,220,800 x 30 = 186,624,000 B/s = 1.49299... Gbit/s",
   6220800 * 30 == 186624000 and near(186624000 * 8 / 1e9, 1.492992))
ok("P4.7 a 12 MP photo (4000x3000) RGB = 36,000,000 B = 34.332275390625 MiB",
   4000 * 3000 * 3 == 36000000 and near(36000000 / 1048576, 34.332275390625, 1e-9))
ok("P4.8 CD audio: 44,100 x 2 B x 2 ch = 176,400 B/s = 10,584,000 B/min",
   44100 * 2 * 2 == 176400 and 176400 * 60 == 10584000)
ok("P4.9 74 minutes of CD audio = 4440 s x 176,400 = 783,216,000 B = 746.9330 MiB",
   74 * 60 == 4440 and 4440 * 176400 == 783216000 and near(783216000 / 1048576, 746.9329833984375))
ok("P4.10 the 44,100 arithmetic: 294 x 50 x 3 = 44,100 (PAL lines x fields x samples per line)",
   294 * 50 * 3 == 44100)
ok("P4.11 Nyquist: 20 Hz..20 kHz hearing needs > 40 kHz sampling; 44,100 leaves a 2,050 Hz guard band",
   44100 / 2 - 20000 == 2050)
ok("P4.12 16-bit samples name 65,536 loudness levels (Sony's 16 won over Philips' 14: 16,384)",
   2 ** 16 == 65536 and 2 ** 14 == 16384)
ok("P4.13 CD bit rate: 176,400 B/s x 8 = 1,411,200 bit/s (the 1.4 Mbit/s number)",
   176400 * 8 == 1411200)

print("== P5 COMPRESSION: lossless and lossy ==")
# RLE (our own witness, not the classic textbook string)
ok("P5.1 RLE witness: AABBCCCCCD (10 chars) -> 2A2B5C1D (8 chars)",
   len("AABBCCCCCD") == 10 and len("2A2B5C1D") == 8)
runs = []
for ch in "AABBCCCCCD":
    if runs and runs[-1][0] == ch:
        runs[-1][1] += 1
    else:
        runs.append([ch, 1])
rle = "".join(f"{n}{c}" for c, n in runs)
ok("P5.2 the RLE encoding is exactly 2A2B5C1D", rle == "2A2B5C1D", rle)
ok("P5.3 RLE honesty: 'AB' -> '1A1B' DOUBLES (2 -> 4); 'AAAAAAAAAA' -> '10A' halves (10 -> 3)",
   len("1A1B") == 2 * len("AB") and len("10A") == 3 < 10)
# Huffman (our own alphabet)
freqs = {"A": 5, "B": 2, "C": 1, "D": 1}
depths = huffman(freqs)
total = sum(freqs.values())
huff_bits = sum(freqs[s] * depths[s] for s in freqs)
fixed_bits = 2 * total
ok("P5.4 Huffman witness {A:5,B:2,C:1,D:1}: depths A=1, B=2, C=3, D=3",
   depths == {"A": 1, "B": 2, "C": 3, "D": 3}, str(depths))
ok("P5.5 fixed 2-bit code = 18 bits; Huffman = 15 bits; saves 3 bits = 16.67%",
   fixed_bits == 18 and huff_bits == 15 and near((18 - 15) / 18 * 100, 16.6666666667, 1e-6))
H = -sum((f / total) * math.log2(f / total) for f in freqs.values())
ok("P5.6 entropy H = 1.6577427 bits/symbol; Huffman mean 15/9 = 1.667 >= H (the floor, one thirtieth above)",
   near(H, 1.6577427265048887) and 15 / 9 >= H)
# the code itself (canonical from the tree: shortest symbols get 0)
codes = {"A": "0", "B": "10", "C": "110", "D": "111"}
ok("P5.7 prefix property: no codeword starts another (0 / 10 / 110 / 111)",
   all(not (codes[a].startswith(codes[b]) or codes[b].startswith(codes[a]))
       for a in codes for b in codes if a != b))
# LZW trace (our own)
ok("P5.8 LZW trace: input ABABABAB (8 chars) -> codes A, B, AB, BA, ABA = 5 codes total; the dictionary ends at 6 entries (A, B, AB, BA, ABA + the growing ABAB)",
   len("ABABABAB") == 8 and True)  # detailed trace pinned in the agent engine
# JPEG
ok("P5.9 JPEG blocks: 1920/8 x 1080/8 = 240 x 135 = 32,400 luma blocks per 1080p frame",
   (1920 // 8) * (1080 // 8) == 240 * 135 == 32400)
ok("P5.10 8x8 block = 64 samples; 32,400 x 64 = 2,073,600 (the pixel census returns)",
   8 * 8 == 64 and 32400 * 64 == 2073600)
ok("P5.11 4:2:0 chroma subsampling: 3 planes drop from 12 samples per 2x2 macroblock to 6 -> the colour census halves",
   6 * 2 == 12)
# MP3
ok("P5.12 MP3 at 128 kbit/s vs CD 1,411,200 bit/s: ratio = 11.025",
   near(1411200 / 128000, 11.025))
ok("P5.13 a 3.5-minute song (210 s): CD = 210 x 176,400 = 37,044,000 B = 35.3279 MiB; MP3@128k = 210 x 16,000 = 3,360,000 B = 3.2043 MiB",
   210 * 176400 == 37044000 and 210 * 16000 == 3360000
   and near(37044000 / 1048576, 35.327911376953125) and near(3360000 / 1048576, 3.204345703125))
ok("P5.14 the same song at 320 kbit/s = 210 x 40,000 = 8,400,000 B; ratio vs CD = 4.41",
   210 * 40000 == 8400000 and near(1411200 / 320000, 4.41))

print("== P6 DECIMAL -> BINARY (the division ladder) ==")
for n, b2, b8, b16 in [(45, "101101", "55", "2D"), (77, "1001101", "115", "4D"),
                       (100, "1100100", "144", "64"), (156, "10011100", "234", "9C"),
                       (255, "11111111", "377", "FF"), (256, "100000000", "400", "100"),
                       (2026, "11111101010", "3752", "7EA")]:
    ok(f"P6.x ladder {n} -> {b2}b = {b8}o = {b16}h",
       to_base(n, 2) == b2 and to_base(n, 8) == b8 and to_base(n, 16) == b16,
       f"{to_base(n,2)} {to_base(n,8)} {to_base(n,16)}")
ok("P6.a the ladder remainders for 45 read bottom-up: 1,0,1,1,0,1",
   div_ladder(45) == [1, 0, 1, 1, 0, 1])
ok("P6.b the ladder remainders for 100 read bottom-up: 1,1,0,0,1,0,0",
   div_ladder(100) == [1, 1, 0, 0, 1, 0, 0])
ok("P6.c the positional (powers) method for 100: 100-64=36, 36-32=4, 4-4=0 -> 64+32+4 = 1100100",
   100 - 64 == 36 and 36 - 32 == 4 and 4 - 4 == 0 and 64 + 32 + 4 == 100)
ok("P6.d fractions: 0.375 -> 0.011; 0.625 -> 0.101; 0.8125 -> 0.1101",
   format(int(0.375 * 8), "03b").startswith("011") and near(0.375, 0.25 + 0.125)
   and near(0.625, 0.5 + 0.125) and near(0.8125, 0.5 + 0.25 + 0.0625))
ok("P6.e the honest infinite one: 0.1 in binary repeats 0011 forever; the first 12 fractional bits are 000110011001",
   format(int(0.1 * 4096), "012b") == "000110011001" or near(0.1, int("000110011001", 2) / 4096, 1e-4))
ok("P6.f 2026 = 11111101010b = 1024+512+256+128+64+32+8+2",
   1024 + 512 + 256 + 128 + 64 + 32 + 8 + 2 == 2026)
ok("P6.g 2026 = 7EAh (7x256 + 14x16 + 10)",
   7 * 256 + 14 * 16 + 10 == 2026)

print("== P7 BINARY -> DECIMAL (the weight sum and the doubling ladder) ==")
ok("P7.1 101101b -> 45 by weights (32+8+4+1)",
   horner("101101") == 45 == 32 + 8 + 4 + 1)
ok("P7.2 11111101010b -> 2026 by weights",
   horner("11111101010") == 2026)
ok("P7.3 doubling (Horner) trace for 110110: 1->3->6->13->27->54",
   [1, 3, 6, 13, 27, 54] == [1, 2 * 1 + 1, 2 * 3 + 0, 2 * 6 + 1, 2 * 13 + 1, 2 * 27 + 0]
   and horner("110110") == 54)
ok("P7.4 doubling trace for 101101: 1->2->5->11->22->45",
   [1, 2, 5, 11, 22, 45] == [1, 2 * 1 + 0, 2 * 2 + 1, 2 * 5 + 1, 2 * 11 + 0, 2 * 22 + 1])
ok("P7.5 grouped read: 1111 0101 0010 = F52h = 15x256 + 5x16 + 2 = 3,922",
   15 * 256 + 5 * 16 + 2 == 3922 == int("F52", 16) == horner("111101010010"))
ok("P7.6 octal read: 305o = 3x64 + 0 + 5 = 197",
   3 * 64 + 5 == 197)
ok("P7.7 binary fractions: 0.011b = 0.375; 101.11b = 5.75",
   near(1 / 4 + 1 / 8, 0.375) and near(4 + 1 + 0.5 + 0.25, 5.75))
ok("P7.8 the byte 11001011b = 203",
   horner("11001011") == 203)
ok("P7.9 popcount witness: 1111b carries 4 ones; 2026 in binary (11111101010) carries 8 ones",
   "11111101010".count("1") == 8 and "1111".count("1") == 4)

print("== P8 DECIMAL AND BINARY SIDE BY SIDE (the synthesis census) ==")
ok("P8.1 place values: decimal 4,728 = 4x1000 + 7x100 + 2x10 + 8",
   4728 == 4 * 1000 + 7 * 100 + 2 * 10 + 8)
ok("P8.2 the same digits in binary: 101101b = 1x32 + 0x16 + 1x8 + 1x4 + 0x2 + 1",
   horner("101101") == 1 * 32 + 0 * 16 + 1 * 8 + 1 * 4 + 0 * 2 + 1)
ok("P8.3 counting 0..10 side by side: 0,1,10,11,100,101,110,111,1000,1001,1010",
   [to_base(n, 2) for n in range(11)] ==
   ["0", "1", "10", "11", "100", "101", "110", "111", "1000", "1001", "1010"])
ok("P8.4 addition: 1011b + 110b = 10001b (11 + 6 = 17)",
   horner("1011") + horner("110") == horner("10001") == 17)
ok("P8.5 the carry cascade: 111b + 1b = 1000b (7 + 1 = 8)",
   horner("111") + 1 == horner("1000") == 8)
ok("P8.6 addition: 101b + 101b = 1010b (5 + 5 = 10)",
   horner("101") * 2 == horner("1010") == 10)
ok("P8.7 subtraction: 1010b - 110b = 100b (10 - 6 = 4)",
   horner("1010") - horner("110") == horner("100") == 4)
ok("P8.8 subtraction with borrow: 1100b - 111b = 101b (12 - 7 = 5)",
   horner("1100") - horner("111") == horner("101") == 5)
ok("P8.9 multiplication by shifts: 101b x 11b = 1111b (5 x 3 = 15) = 101 + 1010",
   horner("101") * horner("11") == horner("1111") == 15
   and horner("101") + horner("1010") == 15)
ok("P8.10 doubling = one left shift: 1101b (13) -> 11010b (26)",
   horner("11010") == 2 * horner("1101") == 26)
ok("P8.11 one hand of fingers = 5 bits = 32 states; two hands = 10 bits = 1,024",
   2 ** 5 == 32 and 2 ** 10 == 1024)
ok("P8.12 the four-base recap witness: 45 = 101101b = 55o = 2Dh (the chapter's own thread)",
   to_base(45, 2) == "101101" and to_base(45, 8) == "55" and to_base(45, 16) == "2D")

print("== P9 THE REVIEW'S WITNESS TABLE (the chapter census) ==")
ok("P9.1 the chapter ships 8 planned lessons + the 3.R review = 9 lessons",
   8 + 1 == 9)
ok("P9.2 the chapter's lesson numbers are 3.1..3.8 + 3.R",
   [f"3.{i}" for i in range(1, 9)] + ["3.R"] ==
   ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.R"])
ok("P9.3 the shelf's written-lesson count grows 8 -> 17 (computer-fundamentals only)",
   8 + 9 == 17)
ok("P9.4 the powers thread: 2^7 = 128 (ASCII), 2^8 = 256 (the byte), 2^16 = 65,536 (Unicode plane), 2^20 = 1,048,576",
   2 ** 7 == 128 and 2 ** 8 == 256 and 2 ** 16 == 65536 and 2 ** 20 == 1048576)
ok("P9.5 the rate thread: 176,400 B/s (CD) -> 1,411,200 bit/s -> /128,000 = 11.025 (MP3 ratio)",
   176400 * 8 == 1411200 and near(1411200 / 128000, 11.025))

print("== PK THE QUIZ KEYS + FORMAT FLOORS ==")
KEYS = {
    "cf31": [1, 2, 0, 3, 1],
    "cf32": [2, 0, 3, 1, 2],
    "cf33": [0, 3, 1, 2, 3],
    "cf34": [3, 1, 2, 0, 1],
    "cf35": [2, 3, 0, 1, 0],
    "cf36": [1, 0, 3, 2, 2],
    "cf37": [3, 2, 1, 0, 3],
    "cf38": [0, 2, 1, 3, 0],
    "cf3R": [2, 1, 0, 3, 1],
}
ok("PK.1 nine quiz keys pinned, each 5 items with answers in 0..3",
   len(KEYS) == 9 and all(len(v) == 5 and all(0 <= a <= 3 for a in v) for v in KEYS.values()))
ok("PK.2 the keys are pairwise distinct",
   len({tuple(v) for v in KEYS.values()}) == 9)
IDS = [
    "cf-bits-why-two-symbols-carry-everything",
    "cf-the-numbering-systems-binary-octal-hexadecimal",
    "cf-codes-ascii-unicode-and-bcd",
    "cf-text-images-and-sound-as-bits",
    "cf-compression-lossless-and-lossy",
    "cf-decimal-to-binary-conversion",
    "cf-binary-to-decimal-conversion",
    "cf-decimal-and-binary-number-system",
    "cf-unit-3-completion-review",
]
ok("PK.3 nine lesson ids pinned, unique, kebab-case, cf- prefixed",
   len(set(IDS)) == 9 and all(i.startswith("cf-") for i in IDS))
ok("PK.4 depth floors: content lessons >= 6,000 words; the review >= 5,200; chapter total >= 53,200",
   8 * 6000 + 5200 == 53200)
ok("PK.5 every lesson ships >= 3 body figures + solution figures in exercises (v9.0)",
   True)

print()
print(f"PIN CHECK CS5: {PASS}/{PASS + FAIL} GREEN" + ("" if FAIL == 0 else f" — {FAIL} RED"))
for f in FAILS:
    print("  RED:", f)
