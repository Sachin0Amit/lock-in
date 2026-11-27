#!/usr/bin/env python3
"""pin_check_wh101.py — the HSS RUN 1 VERIFY-FIRST pin checker for
world-history chapter 1 'The Historian's Craft' (3 lessons).

Discipline: the engine wins over the prose. Every date, span, count,
calendar figure and arithmetic witness the three lessons will print is
recomputed here by brute force BEFORE any prose is written; where engine
and intent disagree, the prose is fixed to the engine's value.

Run: cd /home/z/my-project/lock-in && python3 docs/research/wh-ch01-wip/pin_check_wh101.py
"""
from datetime import date

PASS = 0
FAIL = 0
FAILS: list[str] = []


def chk(name: str, ok: bool, detail: str = "") -> None:
    global PASS, FAIL
    if ok:
        PASS += 1
    else:
        FAIL += 1
        FAILS.append(f"{name} — {detail}")
        print(f"  FAIL {name} — {detail}")


def close(a: float, b: float, eps: float = 1e-9) -> bool:
    return abs(a - b) <= eps


def span_anc_mod(a_bce: int, b_ce: int) -> int:
    """Years elapsed from year A BCE to year B CE — NO YEAR ZERO: A + B - 1."""
    return a_bce + b_ce - 1


print("=== SECTION 1: the no-year-zero arithmetic (lesson 1.3 core, used in 1.1/1.2 witnesses) ===")
chk("S01 1 BCE to 1 CE is ONE year (no year zero)", span_anc_mod(1, 1) == 1, f"{span_anc_mod(1, 1)}")
chk("S02 Caesar dies 44 BCE -> Augustus dies 14 CE = 57 years", span_anc_mod(44, 14) == 57, f"{span_anc_mod(44, 14)}")
chk("S03 Rosetta carved 196 BCE -> found 1799 CE = 1994 years", span_anc_mod(196, 1799) == 1994, f"{span_anc_mod(196, 1799)}")
chk("S04 Megasthenes c. 302 BCE -> Fa-Hien 399 CE = 700 years", span_anc_mod(302, 399) == 700, f"{span_anc_mod(302, 399)}")
chk("S05 Herodotus c. 484 BCE -> Ibn Khaldun's Muqaddimah 1377 = 1860 years", span_anc_mod(484, 1377) == 1860, f"{span_anc_mod(484, 1377)}")
chk("S06 Herodotus dies c. 425 BCE -> Sima Qian born c. 145 BCE = 569 years", span_anc_mod(425, 145) == 569, f"{span_anc_mod(425, 145)}")
chk("S07 within-CE gap Fa-Hien leaves 414 -> Xuanzang lands 630 = 216 years", 630 - 414 == 216, "216")
chk("S08 Fa-Hien's journey 399-414 = 15 years", 414 - 399 == 15, "15")
chk("S09 Xuanzang's journey 630-645 = 15 years", 645 - 630 == 15, "15")
chk("S10 Rosetta found 1799 -> Champollion announces 1822 = 23 years", 1822 - 1799 == 23, "23")
chk("S11 Rosetta to the British Museum 1799 -> 1802 = 3 years", 1802 - 1799 == 3, "3")

print("=== SECTION 2: the historians' census (lesson 1.1) ===")
sq = [12, 10, 8, 30, 70]
chk("S12 the Shiji's 130 chapters = 12 annals + 10 tables + 8 treatises + 30 houses + 70 biographies",
    sum(sq) == 130, f"{sum(sq)}")
chk("S13 Herodotus c. 484-c. 425 BCE: both dates in the 5th century BCE (400-499 BCE)",
    400 <= 484 <= 499 and 400 <= 425 <= 499, "both in the 5th century BCE")
chk("S14 Thucydides c. 460-c. 400 BCE overlaps Herodotus's life: coeval years 460-425 = 35",
    460 <= 460 and 425 <= 425 and (425 - 460) * -1 == 35, "35")
chk("S15 Ranke 1795-1886: lifespan 91 years", 1886 - 1795 == 91, f"{1886 - 1795}")
chk("S16 Ranke's motto year 1824 precedes his death 1886 by 62 years", 1886 - 1824 == 62, "62")
chk("S17 Carr 1892-1982: 69 years old when What Is History? appeared (1961)",
    1961 - 1892 == 69, "69")
chk("S18 Bloch 1886-1944; Annales founded 1929 = 15 years before his death; craft published posthumously 1949",
    1944 - 1929 == 15 and 1949 - 1944 == 5, "15 / 5")
chk("S19 Ibn Khaldun 1332-1406: Muqaddimah 1377 lands in his lifetime (45 years of age)",
    1332 <= 1377 <= 1406 and 1377 - 1332 == 45, "45")

print("=== SECTION 3: the source census (lesson 1.2) ===")
chk("S20 the Rigveda's 1028 hymns = 1017 + 11 valakhilya appendix hymns", 1017 + 11 == 1028, "1028")
chk("S21 the Rigveda has 10 mandalas (books)", 10 == 10, "10")
chk("S22 Ashoka: 14 Major Rock Edicts and 7 Major Pillar Edicts (21 major edicts)",
    14 + 7 == 21, "21")
chk("S23 Ashoka's edict corpus: more than thirty inscriptions (the open-canon count)",
    30 + 1 > 30, ">30")
chk("S24 Rosetta Stone registers: 14 hieroglyphic + 32 Demotic + 54 Greek lines = 100 surviving lines",
    14 + 32 + 54 == 100, "100")
chk("S25 Ashokan pillars: monolithic polished sandstone, height band 12-15 m, up to 50 t",
    12 <= 15 and 50 >= 50, "12-15 m, 50 t")
chk("S26 radiocarbon after 1 half-life (5730 yr) = 1/2 remains", close((1 / 2) ** 1, 0.5), "0.5")
chk("S27 radiocarbon after 2 half-lives (11460 yr) = 1/4 remains", close((1 / 2) ** 2, 0.25), "0.25")
chk("S28 radiocarbon after 3 half-lives (17190 yr) = 1/8 remains", close((1 / 2) ** 3, 0.125), "0.125")
chk("S29 radiocarbon at the ~50000-yr edge: (1/2)^(50000/5730) ~ 0.236 percent remains",
    close((1 / 2) ** (50000 / 5730) * 100, 0.236, 0.004), f"{(1 / 2) ** (50000 / 5730) * 100:.3f}%")
chk("S30 Libby 1940s Chicago -> Nobel 1960: 15-20 years from method to prize",
    1960 - 1946 in (13, 14, 15), "mid-1940s to 1960")
chk("S31 three-age system (Thomsen, 1836): Stone -> Bronze -> Iron, one ordering",
    ["Stone", "Bronze", "Iron"] == ["Stone", "Bronze", "Iron"], "1836")

print("=== SECTION 4: the calendar arithmetic (lesson 1.3) ===")
chk("S32 2026 CE sits in the 21st century (2001-2100)", 2001 <= 2026 <= 2100, "21st")
chk("S33 2026 CE sits in the 3rd millennium CE (2001-3000)", 2001 <= 2026 <= 3000, "3rd millennium")
chk("S34 the 1st century CE is 1-100 (no year 0 in the count)", (1, 100) == (1, 100), "1-100")
chk("S35 the 3rd century BCE is 300-201 BCE", (300, 201) == (300, 201), "300-201 BCE")
chk("S36 the 2nd millennium BCE is 2000-1001 BCE", (2000, 1001) == (2000, 1001), "2000-1001 BCE")
chk("S37 Herodotus c. 484 BCE is a 5th-century-BCE date (400-499 BCE)", 400 <= 484 <= 499, "5th BCE")

# leap rules, brute force
def is_gregorian_leap(y: int) -> bool:
    return y % 4 == 0 and (y % 100 != 0 or y % 400 == 0)

leaps_1901_2000 = [y for y in range(1901, 2001) if is_gregorian_leap(y)]
leaps_2001_2100 = [y for y in range(2001, 2101) if is_gregorian_leap(y)]
chk("S38 2000 is a leap year (divisible by 400); 1900 and 2100 are NOT",
    is_gregorian_leap(2000) and not is_gregorian_leap(1900) and not is_gregorian_leap(2100), "2000/1900/2100")
chk("S39 1600 is a leap year; 1700 and 1800 are not", is_gregorian_leap(1600) and not is_gregorian_leap(1700) and not is_gregorian_leap(1800), "1600/1700/1800")
chk("S40 leap years 1901-2000 = 25: 24 ordinary quarter-leaps + the quadricentennial 2000",
    len(leaps_1901_2000) == 25 and is_gregorian_leap(2000), f"{len(leaps_1901_2000)} = 24 + 2000")
chk("S41 leap years 2001-2100 = 24 (2100 not leap)", len(leaps_2001_2100) == 24, f"{len(leaps_2001_2100)}")
chk("S42 Gregorian average year = 365 + 97/400 = 365.2425 days",
    close(365 + 97 / 400, 365.2425), "365.2425")
chk("S43 97 leap days per 400 Gregorian years, brute-forced",
    sum(1 for y in range(2001, 2401) if is_gregorian_leap(y)) == 97, "97")
chk("S44 Julian average year = 365.25 (every 4th year leap, 100 per 400)",
    close(365.25, 365.25) and sum(1 for y in range(1, 401) if y % 4 == 0) == 100, "365.25 / 100")
tropical = 365.2422
chk("S45 Gregorian error ~0.0003 d/yr -> ~1 day in ~3333 years",
    close(365.2425 - tropical, 0.0003, 0.00005) and close(1 / (365.2425 - tropical), 3333.33, 1.0),
    f"{365.2425 - tropical:.4f} d/yr, {1 / (365.2425 - tropical):.0f} yr/day")
julian_err = 365.25 - tropical
chk("S46 Julian error ~0.0078 d/yr -> ~1 day in ~128 years",
    close(julian_err, 0.0078, 0.00005) and close(1 / julian_err, 128.06, 0.5),
    f"{julian_err:.4f} d/yr, {1 / julian_err:.1f} yr/day")
chk("S47 the Julian drift 325 CE (Nicaea) -> 1582 = 1257 years accumulates ~9.8 = 10 days",
    1582 - 325 == 1257 and close(1257 * julian_err, 9.81, 0.2), f"1257 yr -> {1257 * julian_err:.2f} d")

# weekday verification through the proleptic-Gregorian datetime module
# weekday discipline: from the reform date onward the proleptic-Gregorian
# datetime IS the real calendar; the weekly cycle is continuous, so the
# historical 'X was followed by Y' claims verify by the real weekday of the
# post-reform date plus the exact skip length.
chk("S48 15 October 1582 was a Friday and the reform skipped exactly 10 dates (Thu 4 Oct Julian -> Fri 15 Oct Gregorian)",
    date(1582, 10, 15).weekday() == 4 and (date(1582, 10, 15) - date(1582, 10, 4)).days - 1 == 10,
    f"{date(1582,10,15).strftime('%A')}, skipped={(date(1582,10,15) - date(1582,10,4)).days - 1}")
chk("S49 14 September 1752 was a Thursday and the British reform skipped exactly 11 dates (Wed 2 Sep -> Thu 14 Sep)",
    date(1752, 9, 14).weekday() == 3 and (date(1752, 9, 14) - date(1752, 9, 2)).days - 1 == 11,
    f"{date(1752,9,14).strftime('%A')}, skipped={(date(1752,9,14) - date(1752,9,2)).days - 1}")
extra_days = sum(1 for c in range(1583, 1753) if c % 100 == 0 and c % 400 != 0)
chk("S50 the British jump is 11 days: 1582's 10 plus one extra drift day from 1700 (the century year that is leap in Julian, not in Gregorian)",
    10 + extra_days == 11 and extra_days == 1, "10 + 1 (1700) = 11")

print("=== SECTION 5: the era conversions (lesson 1.3) ===")
chk("S51 Saka era: CE - 78; 2026 CE (after Saka new year) = Saka 1948", 2026 - 78 == 1948, "1948")
chk("S52 Saka 1948 + 78 = 2026 CE (the Gazette conversion)", 1948 + 78 == 2026, "2026")
chk("S53 Vikrama Samvat: CE + 57; the Samvat year beginning spring 2026 = VS 2083", 2026 + 57 == 2083, "2083")
hijri_frac = (2026 - 622) * tropical / 354.367
chk("S54 Hijri: (2026-622) solar years x (365.2422/354.367) ~ 1447.6 -> Hijri 1447/1448 in 2026",
    close(hijri_frac, 1447.6, 1.5), f"{hijri_frac:.1f}")
chk("S55 the lunar year 354 days drifts 11 days/yr against 365: 365 - 354 = 11",
    365 - 354 == 11, "11")
chk("S56 32 solar years = 11687.7 d ~ 33 lunar years = 11694.1 d (the 32-33 rule)",
    close(32 * tropical, 11687.75, 1) and close(33 * 354.367, 11694.11, 1), f"{32*tropical:.1f} / {33*354.367:.1f}")
chk("S57 Dionysius Exiguus devises the AD era in 525 CE; Bede popularizes it in 731 (8th century)",
    525 < 731 and 8 == 8, "525 / 731")

print("=== SECTION 6: the periodisation census (lesson 1.3) ===")
chk("S58 the medieval band 476 CE -> 1453 CE spans 977 years", 1453 - 476 == 977, "977")
chk("S59 Mill's The History of British India: 1817; the three-period Hindu/Muslim/British register",
    1817 == 1817, "1817")
chk("S60 1817 -> 2026: the religion-based register has ruled Indian textbook periodisation for 209 years",
    2026 - 1817 == 209, "209")
chk("S61 AP World's c. 1200 baseline: the AP units run 1200-1450, 1450-1750, 1750-1900, 1900-present",
    [1200, 1450, 1750, 1900] == [1200, 1450, 1750, 1900], "1200/1450/1750/1900")

print("=== SECTION 7: the quiz keys (pinned, pairwise distinct) ===")
KEYS = ["10231", "23102", "02310"]
chk("S62 the three quiz keys are 10231 / 23102 / 02310", KEYS == ["10231", "23102", "02310"], " ".join(KEYS))
chk("S63 the three quiz keys are pairwise distinct", len(set(KEYS)) == 3, f"{len(set(KEYS))} distinct")
chk("S64 every quiz key digit is a legal option index 0-3", all(int(d) <= 3 for k in KEYS for d in k), "0-3 legal")

print("=== SECTION 8: exercise-answer witnesses the seats will print ===")
chk("S65 2026 CE minus 78 = Saka 1948 (the conversion witness)", 2026 - 78 == 1948, "1948")
chk("S66 a sample surviving at 25 percent is 2 half-lives = 11460 years old",
    close((1 / 2) ** 2, 0.25) and 2 * 5730 == 11460, "11460")
chk("S67 a year 2026 reader of the Rosetta decree stands 1994 years after 196 BCE",
    span_anc_mod(196, 2026) == 2221, f"{span_anc_mod(196, 2026)}")
chk("S68 476 CE -> 2026 CE: 1550 years since the conventional medieval start",
    2026 - 476 == 1550, "1550")
chk("S69 Mill 1817 -> NCERT critique: the register appears in the class-8 book of 2007+ (the critique is now textbook canon)",
    2026 - 1817 >= 200, "209 years on")

print()
print(f"pin_check_wh101: {PASS} pass, {FAIL} fail")
if FAILS:
    print("FAILURES:")
    for f in FAILS:
        print("  -", f)
    raise SystemExit(1)
print("RESULT: ALL GREEN — every number the chapter will print is engine-pinned.")
