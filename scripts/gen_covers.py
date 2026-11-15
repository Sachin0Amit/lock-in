#!/usr/bin/env python3
"""
gen_covers.py — AI-generated cover art for every book on the LockIn shelf.

Owner directive (2026-11-11): "create ai generated image for the books cover".
Plan-only for the UI: this generates the ART ASSETS; nothing in the reader is
rewired yet (wiring the covers into BookCover/shelf cards is item CV-01 on the
PROPOSED_FEATURES list, awaiting owner approval).

Design contract for the series:
  - 864x1152 (exact 3:4 book-cover portrait)
  - NO text/letters/numbers in the art — titles/subtitles/levels will be
    overlaid with CSS typography when the covers are wired in (AI-rendered
    text is unreliable). The prompts demand top/bottom negative space for it.
  - one consistent series style (flat vector, ivory fine line-work, subtle
    paper grain, thin inner border frame) + per-book motif + per-book palette
    derived from the book's existing `accent: [c1, c2]` pair in book.ts.

Phases (idempotent, run repeatedly until "all done"):
  python3 scripts/gen_covers.py gen [bookId ...]   # generate missing PNGs
  python3 scripts/gen_covers.py optimize           # public/covers/<id>.webp
  python3 scripts/gen_covers.py sheet              # contact sheet montage
  python3 scripts/gen_covers.py status             # inventory report

2026-11-15 (CS full-shelf planning pass): the roster grew 28 -> 72 with the
44 Computer Science books (same series contract; entries appended in BOOKS).
The sandbox recycles raw PNGs between sessions, so `done()` now treats the
repo webp (public/covers/<id>.webp) as the source of truth — a missing raw
only matters when a cover is being regenerated.
"""
import os
import subprocess
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DIR = os.path.join(ROOT, "download", "covers")  # full-quality originals (review)
WEB_DIR = os.path.join(ROOT, "public", "covers")  # optimized webp (repo assets)
SIZE = "864x1152"

STYLE = (
    "Abstract pictorial background illustration. STRICTLY NO TEXT of any kind: "
    "no letters, no numbers, no numerals, no words, no writing, no calligraphy, "
    "no titles, no labels, no captions, no logos, no watermarks, no signatures, "
    "no written marks anywhere — the picture tells its story only through "
    "shapes, curves and colors. "
    "Vertical portrait 3:4 composition, deep {c1} to {c2} gradient background "
    "with subtle paper-grain texture, one thin light inner border frame near "
    "the edges, fine ivory line-work accents. "
    "Main visual: {motif} "
    "Any grids, axes, dials or tiles must be completely unlabeled — marks on "
    "them are purely geometric (dots, tick strokes, pips, cross-hatches), "
    "never digits or letters. "
    "Calm uncluttered breathing space along the very top and very bottom edges "
    "of the frame, kept free of objects. "
    "Elegant editorial mid-century poster style, flat modern vector illustration "
    "with subtle texture, refined, high quality, detailed."
)

# extra prefix for retry attempts (first generation came back with baked-in
# title text; retries lead with an even harder prohibition)
HARD_PREFIX = (
    "IMPORTANT REQUIREMENT: this artwork must contain ZERO text, ZERO letters, "
    "ZERO numbers, ZERO words, ZERO written or calligraphic marks of any "
    "language. Any writing in the image makes it unusable. Pictures, shapes and "
    "colors only. "
)

# id -> (subject phrase, motif phrase, accent hex pair) — accents copied from
# each book.ts so the generated art matches the existing shelf gradients.
BOOKS = {
    "foundation-mathematics": (
        "school foundations",
        "smooth river stones arranged in gently growing rows beside neat stacks "
        "of plain blank wooden cubes, with a winding blank ribbon path crossing "
        "the frame on small tick-mark posts.",
        "#ea580c", "#c2410c",
    ),
    "arithmetic-and-number-systems": (
        "arithmetic and number systems",
        "an elegant abacus of wooden beads beside interlocking brass gears and "
        "a gently rising staircase of place-value blocks.",
        "#14b8a6", "#0f766e",
    ),
    "elementary-algebra": (
        "elementary algebra",
        "a perfectly balanced beam scale holding geometric shapes on both pans, "
        "with straight lines and simple parabolic curves flowing out of it.",
        "#65a30d", "#166534",
    ),
    "advanced-algebra": (
        "advanced algebra",
        "sweeping polynomial curves and mirrored symmetry axes over a quiet "
        "field of small round root markers and nested oval loops.",
        "#be123c", "#881337",
    ),
    "advanced-mathematical-foundations": (
        "mathematical foundations and proof",
        "a stone archway built from geometric keystones with implication arrows "
        "flowing beneath it and a lantern glow at the keystone.",
        "#44403c", "#292524",
    ),
    "trigonometry": (
        "trigonometry",
        "a large unit circle with radiating angle spokes linked by a ribbon to "
        "a long flowing sine wave crossing the lower frame.",
        "#be185d", "#9f1239",
    ),
    "geometry": (
        "classical geometry",
        "a brass compass and a straightedge drawing intersecting arcs over a "
        "triangle enclosed in its circumscribed circle.",
        "#d97706", "#b45309",
    ),
    "coordinate-geometry": (
        "coordinate geometry",
        "an ellipse, a parabola and a hyperbola floating over a faint cartesian "
        "lattice grid with focus points marked by small dots.",
        "#0f766e", "#115e59",
    ),
    "differential-calculus": (
        "differential calculus",
        "one smooth curve with a moving tangent line touching it, leaving a "
        "trail of small slope arrows rising and falling.",
        "#c2410c", "#9a3412",
    ),
    "integral-calculus": (
        "integral calculus",
        "the area under a gentle curve filled with fine vertical Riemann bars "
        "of varying width, like a fence of light.",
        "#b45309", "#78350f",
    ),
    "multivariable-calculus": (
        "multivariable calculus",
        "a layered three-dimensional surface like terrain with glowing contour "
        "lines and small gradient arrows climbing the slopes.",
        "#0d9488", "#134e4a",
    ),
    "differential-equations": (
        "differential equations",
        "a flowing vector field of tiny arrows with several swirling integral "
        "curves weaving through them, one circling a bright center point.",
        "#4d7c0f", "#3f6212",
    ),
    "linear-algebra": (
        "linear algebra",
        "a regular square grid of thin light lines spanning the frame, visibly "
        "sheared and skewed into a leaning parallelogram lattice, pulled along "
        "by two thick bold arrows of different lengths anchored at the same "
        "bottom corner.",
        "#a16207", "#854d0e",
    ),
    "abstract-algebra": (
        "abstract algebra",
        "a crystalline polyhedron with mirror planes and rotational orbit rings "
        "around it, petals of symmetry arranged like a mandala.",
        "#9d174d", "#831843",
    ),
    "number-theory": (
        "number theory",
        "a spiral galaxy of tiny dots winding outward from a bright core, with "
        "faint concentric clock rings and scattered prime-star glints.",
        "#7c2d12", "#5c2510",
    ),
    "combinatorics": (
        "combinatorics",
        "a branching tree diagram whose paths fall into a triangular terraced "
        "cascade of small hexagonal cells, like beads on a mountain.",
        "#dc2626", "#b91c1c",
    ),
    "probability-theory": (
        "probability theory",
        "a tall Galton board with beads bouncing through rows of pegs into a "
        "bell-shaped pile at the base, and two large plain ivory dice showing "
        "only round dot pips resting in front of it.",
        "#ca8a04", "#a16207",
    ),
    "statistics": (
        "statistics",
        "a smooth bell curve over a scatter of dots with a rising trend line "
        "and fine whisker bars, like quiet rain under a hill.",
        "#059669", "#047857",
    ),
    "discrete-mathematics": (
        "discrete mathematics",
        "a network of connected nodes and edges with one highlighted shortest "
        "path glowing through it, and a small tree rooted at a bright node.",
        "#57534e", "#44403c",
    ),
    "mathematical-logic": (
        "mathematical logic",
        "interlocking mechanical logic gates of brass with branching wires and "
        "a gear-driven decision path splitting into two outcomes.",
        "#52525b", "#3f3f46",
    ),
    "set-theory": (
        "set theory",
        "nested overlapping translucent circles like Venn rings over a quiet "
        "field of scattered dots, one dot glowing in the intersection.",
        "#0e7490", "#155e75",
    ),
    "topology": (
        "topology",
        "a smooth clay coffee mug on the left gradually melting and "
        "stretching across the frame into a glazed ring doughnut shape on the "
        "right, with a separate half-twisted ribbon band loop floating above "
        "them.",
        "#be123c", "#9f1239",
    ),
    "real-analysis": (
        "real analysis",
        "a single curve wrapped tightly between two dashed guide curves "
        "narrowing to a point, like a river passing through a gorge.",
        "#881337", "#4c0519",
    ),
    "complex-analysis": (
        "complex analysis",
        "a complex plane with a swirling fractal coastline of a Julia set "
        "curling around a calm dark basin, spiral filigree edges.",
        "#a21caf", "#86198f",
    ),
    "numerical-analysis": (
        "numerical analysis",
        "a cobweb staircase diagram spiraling into a fixed point, beside a "
        "smooth spline thread passing through scattered data dots.",
        "#f59e0b", "#d97706",
    ),
    "optimization-and-operations-research": (
        "optimization and operations research",
        "a convex polytope facet-gem with one vertex glowing as the optimum, "
        "and a network of flow arrows streaming toward it.",
        "#e11d48", "#be123c",
    ),
    "mathematical-methods-for-engineering": (
        "engineering mathematics methods",
        "overlapping sine waves of different frequencies braiding into one "
        "bold signal line, with a row of thin spectrum bars below.",
        "#65a30d", "#4d7c0f",
    ),
    "quantitative-aptitude": (
        "quantitative aptitude",
        "an analog clock face with plain hour marks, a speedometer-like dial, "
        "and interlocking gears measuring the passage of time and speed.",
        "#92400e", "#451a03",
    ),
    # ---- the Computer Science shelf (2026-11-15 planning pass) ----
    "computer-fundamentals": ("computing fundamentals", "a clean vintage desktop computer with a rounded screen and keyboard radiating gentle rays, beside neat stacked blank folders", "#0f766e", "#115e59"),
    "digital-logic-design": ("digital logic design", "a lattice of glowing logic-gate shapes linked by fine circuit traces across dark silicon, with small plain unlabeled IC blocks", "#b91c1c", "#7f1d1d"),
    "computer-organization-architecture": ("computer organization and architecture", "a layered motherboard city of fine traces rising to one glowing central processor die with radiating pins", "#1d4ed8", "#1e3a8a"),
    "assembly-and-microprocessors": ("assembly and microprocessors", "a large microprocessor chip with radiating gold pins resting on a circuit board with fine unlabeled dials", "#a16207", "#854d0e"),
    "data-structures": ("data structures", "a luminous tree of connected geometric nodes growing above neat stacked blocks, cubes and linked rings", "#7c3aed", "#5b21b6"),
    "algorithms": ("algorithms", "a branching network of decision paths converging on one glowing node, drawn as fine line-work with small plain junction dots", "#c2410c", "#9a3412"),
    "theory-of-computation": ("theory of computation", "an abstract turing machine tape of blank cells crossing the frame under a small reading-head carriage on rails", "#4d7c0f", "#3f6212"),
    "compiler-design": ("compiler design", "a cascading pipeline of translucent geometric blocks transforming from raw shapes into fine ordered patterns stage by stage", "#9333ea", "#6b21a8"),
    "operating-systems": ("operating systems", "a stacked layered machine of interlocking scheduler gears and conveyor stages with small plain unlabeled dials", "#0369a1", "#075985"),
    "database-management-systems": ("database management systems", "a monumental cylinder of stacked translucent discs with soft light between the layers and fine index tabs on the rims", "#0e7490", "#155e75"),
    "computer-networks": ("computer networks", "a wireframe globe with glowing nodes and graceful arcing links between them, small plain unlabeled relay towers below", "#0891b2", "#0e7490"),
    "computer-graphics": ("computer graphics", "a shimmering wireframe torus floating above a fine isometric grid under two soft studio light rays", "#db2777", "#9d174d"),
    "software-engineering": ("software engineering", "an elegant drafting desk with compass, rulers and layered plan sheets, one fine blueprint unrolling", "#475569", "#334155"),
    "object-oriented-programming": ("object-oriented programming", "nested interlocking geometric objects — spheres within cubes within open frames — arranged in quiet order", "#f59e0b", "#b45309"),
    "programming-languages-paradigms": ("programming languages and paradigms", "a mosaic of interlocking coloured blocks of many distinct shapes forming one composed panel", "#64748b", "#475569"),
    "c-programming": ("the C programming language", "an industrial steel gear lattice with rivets and depth, one gear train meshing cleanly into another", "#1e293b", "#0f172a"),
    "cpp-programming": ("C++ programming", "a tower of interlocking double gears meshing into a precise modern machine of fine parts", "#1e40af", "#1e3a8a"),
    "java-programming": ("Java programming", "a stylised steaming coffee cup silhouette with rising abstract steam ribbons on a plain saucer", "#ea580c", "#c2410c"),
    "python-programming": ("Python programming", "two intertwined geometric serpents forming a gentle double helix around plain blank rods", "#16a34a", "#15803d"),
    "javascript-and-web-technologies": ("JavaScript and web technologies", "a browser window frame with a golden lightning bolt surging through its plain empty page", "#eab308", "#a16207"),
    "frontend-engineering": ("frontend engineering", "layered translucent interface panels floating in gentle depth, one highlighted pane glowing among them", "#06b6d4", "#0e7490"),
    "backend-engineering": ("backend engineering", "server racks with flowing luminous pipes and valves, gauges plain and unlabeled", "#4338ca", "#3730a3"),
    "full-stack-web-development": ("full-stack web development", "two mirrored machine stacks bridged by one glowing arc of light crossing the middle of the frame", "#6d28d9", "#5b21b6"),
    "distributed-systems": ("distributed systems", "a constellation of linked glowing nodes across deep space, small orbits and fine connecting lines", "#0c4a6e", "#082f49"),
    "cloud-computing": ("cloud computing", "sculpted cloud shapes threaded with fine circuit lines, small plain unlabeled server blocks below", "#0284c7", "#0369a1"),
    "cybersecurity": ("cybersecurity", "a heraldic shield with fine circuitry etched across its face resting on a quiet plain field", "#dc2626", "#991b1b"),
    "cryptography": ("cryptography", "an ornate padlock with rotating cipher dials around it, every dial marked only with plain geometric pips", "#7f1d1d", "#57534e"),
    "artificial-intelligence": ("artificial intelligence", "a brain-like lattice of neural pathways glowing with thought, drawn as fine line-work nodes and filaments", "#831843", "#500724"),
    "machine-learning": ("machine learning", "scattered data points dividing along a luminous decision plane, a fine rising trend ribbon behind", "#5b21b6", "#4c1d95"),
    "deep-learning": ("deep learning", "a deep luminous network of many layered nodes vanishing into depth, layer by layer", "#1e1b4b", "#312e81"),
    "natural-language-processing": ("natural language processing", "flowing speech waveforms braiding into one stream across the frame, small plain blank labels below", "#0f766e", "#134e4a"),
    "computer-vision": ("computer vision", "a stylised eye whose iris is a fine pixel grid resolving into focus, plain unlabeled tiles", "#be185d", "#831843"),
    "generative-ai-and-llms": ("generative AI and LLMs", "a blossoming fractal tree of light growing from a single seed point, branches flowering geometric", "#a21caf", "#701a75"),
    "reinforcement-learning": ("reinforcement learning", "a luminous maze with one rewarded golden path traced through its corridors to a glowing goal", "#065f46", "#064e3b"),
    "data-science": ("data science", "a constellation of data points with a rising trend ribbon and small plain unlabeled chart frames", "#088f7f", "#0f766e"),
    "big-data-engineering": ("big data engineering", "braided rivers of luminous data streams flowing through a fine canyon of layered strata", "#b45309", "#92400e"),
    "data-mining": ("data mining", "rough rock strata cracking open to reveal crystalline gems glowing inside, fine pick tools resting by", "#c2410c", "#7c2d12"),
    "information-retrieval": ("information retrieval", "a great funnel sorting glowing particles into ordered streams, small plain blank cards sliding below", "#4a044e", "#581c87"),
    "blockchain": ("blockchain", "a chain of interlocked translucent cubes each holding a small flame, links catching the light", "#b7791f", "#713f12"),
    "internet-of-things": ("internet of things", "a living globe wreathed in tiny sensor nodes and gentle radio waves, small devices orbiting", "#0d9488", "#134e4a"),
    "mobile-app-development": ("mobile app development", "a smartphone radiating rings of connection outward across the frame, small plain app tiles floating by", "#65a30d", "#3f6212"),
    "human-computer-interaction": ("human-computer interaction", "a hand touching a pane of glass sending ripples of light outward, fine concentric circles", "#d946ef", "#86198f"),
    "parallel-computing": ("parallel computing", "parallel luminous lanes of arrows racing together across the frame in strict alignment", "#155e75", "#083344"),
    "advanced-computer-science": ("advanced computer science", "a grand door opening onto a starfield of glowing sparks of pure light with no glyphs", "#111827", "#1f2937"),
}

# hex -> human color phrase for the prompt (all hexes actually used above)
HEX_COLOR = {
    "#ea580c": "bright orange", "#c2410c": "burnt orange",
    "#14b8a6": "teal", "#0f766e": "deep teal",
    "#65a30d": "apple green", "#166534": "forest green",
    "#be123c": "crimson rose", "#881337": "deep crimson",
    "#44403c": "warm charcoal", "#292524": "near-black charcoal",
    "#be185d": "magenta rose", "#9f1239": "deep rose",
    "#d97706": "warm amber", "#b45309": "bronze amber",
    "#0f766e": "deep teal", "#115e59": "darker teal",
    "#c2410c": "burnt orange", "#9a3412": "dark burnt orange",
    "#b45309": "bronze", "#78350f": "dark bronze brown",
    "#0d9488": "teal", "#134e4a": "deep pine teal",
    "#4d7c0f": "moss green", "#3f6212": "deep moss green",
    "#a16207": "golden ochre", "#854d0e": "dark ochre",
    "#9d174d": "deep rose", "#831843": "dark rose",
    "#7c2d12": "rust brown", "#5c2510": "dark rust brown",
    "#dc2626": "vivid red", "#b91c1c": "deep red",
    "#ca8a04": "gold", "#a16207": "ochre",
    "#059669": "emerald", "#047857": "deep emerald",
    "#57534e": "warm stone gray", "#44403c": "charcoal",
    "#52525b": "slate gray", "#3f3f46": "dark slate",
    "#0e7490": "petrol teal-blue", "#155e75": "deep petrol teal-blue",
    "#881337": "deep crimson", "#4c0519": "black wine",
    "#a21caf": "violet purple", "#86198f": "deep violet",
    "#f59e0b": "golden amber", "#d97706": "warm amber",
    "#e11d48": "vivid crimson", "#be123c": "crimson rose",
    "#92400e": "dark bronze", "#451a03": "espresso brown",
}


def prompt_for(bid: str) -> str:
    subject, motif, c1, c2 = BOOKS[bid]
    prefix = HARD_PREFIX if os.environ.get("HARDER") else ""
    return prefix + STYLE.format(
        subject=subject,
        motif=motif,
        c1=HEX_COLOR.get(c1, "warm charcoal"),
        c2=HEX_COLOR.get(c2, "dark charcoal"),
    )


def out_path(bid: str) -> str:
    return os.path.join(RAW_DIR, f"{bid}.png")


def phase_gen(ids):
    os.makedirs(RAW_DIR, exist_ok=True)
    if os.environ.get("FORCE"):
        for i in ids:
            p = out_path(i)
            if os.path.exists(p):
                os.remove(p)
    todo = [i for i in ids if not done(i)]
    print(f"[gen] {len(todo)}/{len(ids)} to generate "
          f"({len(ids) - len(todo)} already done)", flush=True)
    failures = []
    for n, bid in enumerate(todo, 1):
        p = prompt_for(bid)
        print(f"[{n}/{len(todo)}] {bid} ...", flush=True)
        ok = False
        for attempt in (1, 2, 3):
            try:
                r = subprocess.run(
                    ["z-ai", "image", "-p", p, "-o", out_path(bid), "-s", SIZE],
                    capture_output=True, text=True, timeout=240,
                )
                if r.returncode == 0 and done(bid):
                    ok = True
                    print(f"    ok ({os.path.getsize(out_path(bid)) // 1024} KB,"
                          f" attempt {attempt})", flush=True)
                    break
                print(f"    attempt {attempt} bad rc={r.returncode} "
                      f"err={(r.stderr or '')[:160]}", flush=True)
            except subprocess.TimeoutExpired:
                print(f"    attempt {attempt} timed out", flush=True)
            time.sleep(2 * attempt)
        if not ok:
            failures.append(bid)
            print(f"    FAILED {bid}", flush=True)
    print(f"[gen] complete. failures: {failures or 'none'}", flush=True)
    return 1 if failures else 0


def done(bid: str) -> bool:
    # the repo webp is the durable artifact (2026-11-15); raws recycle with the sandbox
    webp = os.path.join(ROOT, "public", "covers", f"{bid}.webp")
    if os.path.exists(webp) and os.path.getsize(webp) > 6_000:
        return True
    p = out_path(bid)
    if not (os.path.exists(p) and os.path.getsize(p) > 40_000):
        return False
    try:  # rejects truncated files left by a killed subprocess
        from PIL import Image
        with Image.open(p) as im:
            im.verify()
        return True
    except Exception:
        return False


def phase_optimize():
    from PIL import Image
    os.makedirs(WEB_DIR, exist_ok=True)
    total = 0
    for bid in BOOKS:
        src, dst = out_path(bid), os.path.join(WEB_DIR, f"{bid}.webp")
        if not os.path.exists(src):
            print(f"  skip {bid}: no source png"); continue
        img = Image.open(src).convert("RGB")
        img.save(dst, "WEBP", quality=85, method=6)
        kb = os.path.getsize(dst) // 1024
        total += kb
        print(f"  {bid}.webp {kb} KB ({img.width}x{img.height})")
    print(f"[optimize] total {total} KB across {len(BOOKS)} covers")


def phase_sheet():
    from PIL import Image, ImageDraw
    cols, thumb_w = 7, 150
    thumb_h = round(thumb_w * 4 / 3)
    pad, label_h = 14, 16
    rows = (len(BOOKS) + cols - 1) // cols
    W = cols * (thumb_w + pad) + pad
    H = rows * (thumb_h + label_h + pad) + pad
    sheet = Image.new("RGB", (W, H), (250, 248, 244))
    d = ImageDraw.Draw(sheet)
    for i, bid in enumerate(BOOKS):
        r, c = divmod(i, cols)
        x = pad + c * (thumb_w + pad)
        y = pad + r * (thumb_h + label_h + pad)
        src = out_path(bid)
        if os.path.exists(src):
            t = Image.open(src).convert("RGB").resize((thumb_w, thumb_h))
            sheet.paste(t, (x, y))
        d.rectangle([x, y, x + thumb_w - 1, y + thumb_h - 1], outline=(180, 170, 160))
        d.text((x + 2, y + thumb_h + 2), bid[:24], fill=(90, 80, 70))
    dst = os.path.join(RAW_DIR, "contact-sheet.png")
    sheet.save(dst)
    print(f"[sheet] {dst} ({W}x{H})")


def phase_check():
    """VLM sweep: flag any cover that contains text/letters/numbers."""
    import json
    ids = [b for b in BOOKS if done(b)]
    flagged = []
    CHUNK = 6
    for s in range(0, len(ids), CHUNK):
        chunk = ids[s:s + CHUNK]
        args = ["z-ai", "vision", "-p",
                "You are shown " + str(len(chunk)) + " book-cover artworks in this "
                "exact order: " + ", ".join(chunk) + ". For EACH one, does it "
                "contain any text, letters, numbers, words, writing, or "
                "watermarks (in any language, however small)? Blank ribbons or "
                "empty banners do NOT count as text. Answer one line per image, "
                "exactly 'id: yes' or 'id: no' with no other commentary.",
                "-o", "/tmp/cover_check.json"]
        for bid in chunk:
            args += ["-i", out_path(bid)]
        subprocess.run(args, capture_output=True, text=True, timeout=300)
        try:
            d = json.load(open("/tmp/cover_check.json"))
            txt = d["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"  chunk {s//CHUNK+1}: VLM parse failed ({e})")
            continue
        for line in txt.splitlines():
            line = line.strip().strip("-*").strip()
            if ":" not in line:
                continue
            k, v = line.split(":", 1)
            k = k.strip().lower()
            if v.strip().lower().startswith("yes") and k in BOOKS:
                flagged.append(k)
        print(f"  chunk {s//CHUNK+1}/{(len(ids)+CHUNK-1)//CHUNK}: "
              f"{[l for l in txt.splitlines() if ':' in l]}", flush=True)
    print(f"[check] TEXT-FLAGGED ({len(flagged)}): {flagged}")
    with open(os.path.join(RAW_DIR, "text-flagged.json"), "w") as f:
        import json as _json
        _json.dump(flagged, f)
    return None


def phase_clean(ids):
    """image-edit pass: erase text from flagged covers, keep the art."""
    print(f"[clean] {ids}")
    for bid in ids:
        src = out_path(bid)
        tmp = src + ".tmp.png"
        r = subprocess.run(
            ["z-ai", "image-edit", "-p",
             "Remove ALL text, letters, numbers, digits, words and written marks "
             "from this book-cover artwork, wherever they appear. Keep the "
             "composition, objects, colors and style exactly the same, and fill "
             "the freed areas with the surrounding background.",
             "-i", src, "-o", tmp, "-s", SIZE],
            capture_output=True, text=True, timeout=300,
        )
        if r.returncode == 0 and os.path.exists(tmp) and os.path.getsize(tmp) > 40_000:
            os.replace(tmp, src)
            print(f"  cleaned {bid}")
        else:
            print(f"  FAILED {bid} rc={r.returncode} {(r.stderr or '')[:120]}")


def phase_status():
    n_ok = sum(1 for b in BOOKS if done(b))
    print(f"[status] {n_ok}/{len(BOOKS)} covers generated")
    for bid in BOOKS:
        p = out_path(bid)
        s = os.path.getsize(p) // 1024 if os.path.exists(p) else 0
        print(f"  {'ok ' if done(bid) else 'todo'} {bid:44s} {s:>6d} KB")


if __name__ == "__main__":
    phase = sys.argv[1] if len(sys.argv) > 1 else "status"
    ids = sys.argv[2:] or list(BOOKS)
    unknown = [i for i in ids if i not in BOOKS]
    if unknown:
        sys.exit(f"unknown book ids: {unknown}")
    sys.exit({
        "gen": lambda: phase_gen(ids),
        "optimize": phase_optimize,
        "sheet": phase_sheet,
        "check": lambda: phase_check(),
        "clean": lambda: phase_clean(ids),
        "status": phase_status,
    }[phase]())
