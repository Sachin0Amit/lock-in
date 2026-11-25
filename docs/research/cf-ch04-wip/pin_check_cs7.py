#!/usr/bin/env python3
"""pin_check_cs7.py — CS RUN 7 verify-first: brute-force every number the
chapter 4 seats will print. GREEN before the specs go to agents; the
engine wins on any dispute."""

ok_count = 0
fails = []


def ok(name, cond, detail=""):
    global ok_count
    if cond:
        ok_count += 1
    else:
        fails.append(f"{name} :: {detail}")


# ---- 4.1 the motherboard ----
atx = 305 * 244
ok("ATX area 305x244 = 74420", atx == 74420, str(atx))
matx = 244 * 244
ok("microATX area 244^2 = 59536", matx == 59536, str(matx))
itx = 170 * 170
ok("Mini-ITX area 170^2 = 28900", itx == 28900, str(itx))
r_m_atx = matx / atx
ok("microATX/ATX = 0.800000 exactly", abs(r_m_atx - 0.800000) < 1e-12, f"{r_m_atx:.9f}")
r_i_atx = itx / atx
ok("Mini-ITX/ATX = 0.388336", abs(r_i_atx - 0.388336) < 5e-7, f"{r_i_atx:.9f}")
r_i_m = itx / matx
ok("Mini-ITX/microATX = 0.485421", abs(r_i_m - 0.485421) < 5e-7, f"{r_i_m:.9f}")

# ---- 4.2 the processor ----
ok("1 GHz = 1e9 cycles/s", 10**9 == 1_000_000_000)
cycle5ns = 1 / 5e9 * 1e9
ok("one 5 GHz cycle = 0.2 ns", abs(cycle5ns - 0.2) < 1e-12, f"{cycle5ns}")
r5 = 5e9 / 740000
ok("5 GHz / 740 kHz = 6756.7568", abs(r5 - 6756.7568) < 5e-5, f"{r5:.9f}")
r1 = 1e9 / 740000
ok("1 GHz / 740 kHz = 1351.3514", abs(r1 - 1351.3514) < 5e-5, f"{r1:.9f}")
moore = 2300 * 2**26
ok("2300 x 2^26 = 154350387200", moore == 154_350_387_200, str(moore))
ok("Moore exponent (2023-1971)/2 = 26", (2023 - 1971) // 2 == 26)
ratio_moore = moore / 134_000_000_000
ok("prediction/actual = 1.151869", abs(ratio_moore - 1.151869) < 5e-7, f"{ratio_moore:.9f}")
ok("prediction above actual by 15.1869%",
   abs((ratio_moore - 1) * 100 - 15.1869) < 5e-5, f"{(ratio_moore-1)*100:.6f}%")
ok("4 cores x 3 GHz = 12 GHz", 4 * 3 == 12)
ok("SRAM 6 transistors vs DRAM 1+1", (6, 1, 1) == (6, 1, 1))

# ---- 4.3 the memory hierarchy ----
ok("L2/L1 = 14", 7 / 0.5 == 14)
r_l2 = 100 / 7
ok("RAM/L2 = 14.285714", abs(r_l2 - 14.285714) < 5e-7, f"{r_l2:.9f}")
ok("RAM/L1 = 200", 100 / 0.5 == 200)
ok("SSD/RAM = 1500", 150_000 / 100 == 1500)
r_hdd = 10_000_000 / 150_000
ok("HDD/SSD = 66.6667", abs(r_hdd - 66.6667) < 5e-5, f"{r_hdd:.9f}")
ok("Ocean/HDD = 15", 150_000_000 / 10_000_000 == 15)
# human ladder (L1 = 1 s)
ok("human L2 = 14 s", 7 / 0.5 == 14)
ram_s = 100 / 0.5
ok("human RAM = 200 s = 3 min 20 s", ram_s == 200 and ram_s == 3 * 60 + 20)
ssd_s = 150e-6 / 0.5e-9
ssd_days = ssd_s / 86400
ok("human SSD = 300000 s = 3.472222 days",
   abs(ssd_s - 300_000) < 1e-6 and abs(ssd_days - 3.472222) < 5e-7, f"{ssd_s:.1f} s {ssd_days:.9f} d")
hdd_s = 10e-3 / 0.5e-9
hdd_days = hdd_s / 86400
hdd_months = hdd_days / 30.4375
ok("human HDD = 20000000 s = 231.481481 days = 7.605141 months",
   hdd_s == 20_000_000 and abs(hdd_days - 231.481481) < 5e-7 and abs(hdd_months - 7.605141) < 5e-7,
   f"{hdd_s:.0f} s {hdd_days:.9f} d {hdd_months:.6f} mo")
ocean_s = 150e-3 / 0.5e-9
ocean_years = ocean_s / (365.25 * 86400)
ok("human ocean = 3e8 s = 9.5064263 years",
   ocean_s == 300_000_000 and abs(ocean_years - 9.5064263) < 5e-8, f"{ocean_s:.0f} s {ocean_years:.9f} y")
ramac_bytes = 5_000_000 * 6 / 8
ok("RAMAC 5M 6-bit chars = 3.75 MB", ramac_bytes == 3_750_000, str(ramac_bytes))
# DRAM refresh
ok("DDR refresh window 64 ms", 64 == 64)

# ---- 4.4 buses and ports ----
ok("2^32 = 4294967296", 2**32 == 4_294_967_296)
ok("2^32 bytes = 4 GiB", 2**32 / 2**30 == 4)
ok("2^64 = 18446744073709551616", 2**64 == 18_446_744_073_709_551_616)
ok("2^64 bytes = 16 EiB", 2**64 / 2**60 == 16)
gen1 = 2.5e9 * 0.8 / 8
ok("PCIe gen1 per lane 250 MB/s", abs(gen1 - 250e6) < 1, f"{gen1}")
gen3 = 8e9 * (128 / 130) / 8
ok("PCIe gen3 per lane 984.615385 MB/s", abs(gen3 - 984.615385e6) < 1, f"{gen3:.3f}")
gen4 = 2 * gen3
ok("PCIe gen4 per lane 1969.230769 MB/s", abs(gen4 - 1969.230769e6) < 1, f"{gen4:.3f}")
gen5 = 2 * gen4
ok("PCIe gen5 per lane 3938.461538 MB/s", abs(gen5 - 3938.461538e6) < 1, f"{gen5:.3f}")
x16g4 = 16 * gen4
ok("x16 gen4 = 31.507692 GB/s", abs(x16g4 - 31.507692e9) < 1000, f"{x16g4:.1f}")
x16g5 = 16 * gen5
ok("x16 gen5 = 63.015385 GB/s", abs(x16g5 - 63.015385e9) < 1000, f"{x16g5:.1f}")
ok("USB 480/12 = 40", 480 / 12 == 40)
r_usb3 = 5000 / 480
ok("USB3/USB2 = 10.416667", abs(r_usb3 - 10.416667) < 5e-7, f"{r_usb3:.9f}")
ok("USB4/USB3 = 8", 40 / 5 == 8)
r_hdmi = 48 / 4.95
ok("HDMI 2.1/1.0 = 9.696970", abs(r_hdmi - 9.696970) < 5e-7, f"{r_hdmi:.9f}")
sata = 6e9 * 8 / 10 / 8
ok("SATA 3.0 raw = 600 MB/s (6 Gbit/s x 8/10 / 8)", sata == 600e6, str(sata))
usb2_line = 480e6 / 8
ok("USB2 line rate 60 MB/s", usb2_line == 60e6, str(usb2_line))
r_525 = x16g4 / usb2_line
ok("x16 gen4 / USB2 line = 525.128205", abs(r_525 - 525.128205) < 5e-6, f"{r_525:.9f}")

# ---- quiz keys are valid option indices ----
keys = {
    "41": [2, 0, 3, 1, 3], "42": [3, 0, 1, 2, 1], "43": [1, 3, 0, 2, 2],
    "44": [2, 1, 3, 0, 0], "4R": [3, 1, 0, 1, 2],
}
for tag, k in keys.items():
    ok(f"quiz key {tag} has 5 entries in 0..3",
       len(k) == 5 and all(0 <= v <= 3 for v in k), str(k))

# ---- verdict ----
print(f"pin_check_cs7: {ok_count}/{ok_count + len(fails)} GREEN")
for f in fails:
    print("  RED: " + f)
if fails:
    raise SystemExit(1)
