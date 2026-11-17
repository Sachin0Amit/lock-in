#!/usr/bin/env python3
"""gen_full_drive_manifest.py — rebuild the 124-source Drive TOC manifest
(the 2026-11-16 layer-1 pass's manifest was wiped with temporary-references/;
this rebuilds it from the re-surveyed Drive listings of 2026-11-17).

Composition (matching the original pass's scope):
  - 96 Cengage chem/phys module chapter PDFs: CHEMISTRY subfolder
    (IOC 15 / OC 20 / PC 13) + PHYSICS subfolder (P1-P7, 48) — read from
    the module-level listings captured this run.
  - 28 root classics (the shelf-relevant non-math classics — the math
    root poles are already transcribed in DRIVE_TOC_SURVEY.md and the CS
    classics were covered by the CS pass's own research): electronics/
    electrical, physics, chemistry, biology, humanities, economics and
    languages poles, ids read from the re-surveyed root inventory.

Output: temporary-references/manifest.tsv — key <tab> drive-file-id <tab>
label. Keys: ioc-XX / oc-XX / pc-XX / pX-XX for modules, root-<slug> for
classics. Idempotent; re-run any time the listings are re-captured.
"""
import json
import os

BASE = "/home/z/my-project/temporary-references"

# module folder key -> (listing file, prefix)
MODULE_SETS = [
    ("mod-ioc.json", "ioc"),
    ("mod-oc.json", "oc"),
    ("mod-pc.json", "pc"),
    ("mod-p1-mechanics-i.json", "p1"),
    ("mod-p2-mechanics-ii.json", "p2"),
    ("mod-p3-thermometry,-sound-and-waves.json", "p3"),
    ("mod-p4-electrostatics.json", "p4"),
    ("mod-p5-magnetism.json", "p5"),
    ("mod-p6-optics.json", "p6"),
    ("mod-p7-modern-physics.json", "p7"),
]

# root classics: (key, filename fragment to match in the root listing)
ROOT_CLASSICS = [
    ("root-microelectronic-circuits-8e", "Microelectronic Circuits (8th Ed.).pdf"),
    ("root-art-of-electronics", "the-art-of-electronics.pdf"),
    ("root-electric-circuits-12e", "electric-circuits-12nbsped"),
    ("root-hughes-eet-12e", "Hughes 12th Ed.pdf"),
    ("root-goldstein-classical-mechanics-3e", "Classical-Mechanics-3rd-Edition-Goldstein.pdf"),
    ("root-griffiths-electrodynamics-4e", "Introduction-to-Electrodynamics-Griffiths.pdf"),
    ("root-griffiths-quantum-3e", "Introduction-to-Quantum-Mechanics-Griffiths-3rd.pdf"),
    ("root-halliday-resnick-fop-11e", "dokumen.pub_halliday-amp-resnick-fundamentals-of-physics-11th"),
    ("root-young-university-physics-15e", "University Physics with Modern Physics 15th"),
    ("root-feynman-lectures", "The Feynman Lectures on Physics"),
    ("root-zumdahl-chemistry-11e", "Chemistry-11th-Edition-Steven-Zumdahl.pdf"),
    ("root-atkins-pchem-12e", "atkins-physical-chemistry-12th"),
    ("root-clayden-organic", "organic-chemistry-by-jonathan-clayden"),
    ("root-lee-concise-inorganic-5e", "Lee-JD-Concise-inorganic-Chemistry"),
    ("root-mahan-university-chemistry", "University-Chemistry-by-Bruce-H.-Mahan.pdf"),
    ("root-solomons-organic", "Wileys Solomons, Fryhle  Snyder"),
    ("root-lehninger-biochem-8e", "Lehninger-Principles-of-Biochemistry-8th.pdf"),
    ("root-campbell-biology-11e", "Campbell-Biology-11th-Edition.pdf"),
    ("root-laxmikanth-indian-polity", "Indian-Polity-Laxmikanth.pdf"),
    ("root-spectrum-modern-india", "A-Brief-History-of-Modern-India-Spectrum.pdf"),
    ("root-russell-western-philosophy", "A-History-of-Western-Philosophy-Bertrand-Russell.pdf"),
    ("root-mankiw-economics-8e", "Principles-of-Economics-Mankiw-8th-Edition.pdf"),
    ("root-murphy-english-grammar", "English-Grammar-in-Use-Raymond-Murphy.pdf"),
    ("root-hammer-german-grammar", "Hammers-German-Grammar-and-Usage.pdf"),
    ("root-genki-japanese-i", "Genki-Elementary-Japanese-I.pdf"),
    ("root-applied-physics-11e", "applied-physics-11th-edition"),
    ("root-physics-fundamental", "physics-fundamental.pdf"),
]

entries = []  # (key, id, label)
seen_keys = {}  # module number -> count (the folders interleave two
# chapter series with restarting numbers, so numbered keys collide)

def title_slug(name):
    keep = "".join(c if c.isalnum() else "-" for c in name.lower())
    while "--" in keep:
        keep = keep.replace("--", "-")
    return keep.strip("-")[:40]

def module_key(prefix, name):
    """First series keeps the plain numbered key; a colliding second series
    (the folders interleave two chapter series with restarting numbers)
    gets a stable title-slug key — stable across re-surveys."""
    idx = name.split(".")[0].strip()
    try:
        idx = f"{int(idx):02d}"
    except ValueError:
        idx = idx.zfill(2)
    plain = f"{prefix}-{idx}"
    n = seen_keys.get(plain, 0)
    seen_keys[plain] = n + 1
    return plain if n == 0 else f"{prefix}-{title_slug(name)}"

# ---- the 96 chem/phys module chapter PDFs ----
for listing, prefix in MODULE_SETS:
    path = os.path.join(BASE, listing)
    if not os.path.exists(path):
        print(f"WARNING: listing {listing} missing — run the subfolder survey first")
        continue
    with open(path) as f:
        data = json.load(f)
    for item in data["items"]:
        name = item["name"].replace(".pdf", "").strip()
        entries.append((module_key(prefix, name), item["id"], f"{listing} :: {name}"))

# ---- the root classics ----
with open(os.path.join(BASE, "inventory.json")) as f:
    root_items = json.load(f)["rootItems"]

root_seen = set()
for key, fragment in ROOT_CLASSICS:
    hit = None
    for item in root_items:
        if "[folder]" in item["name"]:
            continue
        if fragment in item["name"] and item.get("id"):
            hit = item
            break
    if hit:
        entries.append((key, hit["id"], hit["name"]))
        root_seen.add(hit["name"])
    else:
        print(f"WARNING: root classic not found in listing: {fragment}")

os.makedirs(os.path.join(BASE, "tocs"), exist_ok=True)
os.makedirs(os.path.join(BASE, "pdfs"), exist_ok=True)
with open(os.path.join(BASE, "manifest.tsv"), "w") as f:
    for key, fid, label in entries:
        f.write(f"{key}\t{fid}\t{label}\n")

n_mod = sum(1 for k, _, _ in entries if not k.startswith("root-"))
n_root = sum(1 for k, _, _ in entries if k.startswith("root-"))
print(f"manifest: {len(entries)} entries ({n_mod} module PDFs + {n_root} root classics)")
