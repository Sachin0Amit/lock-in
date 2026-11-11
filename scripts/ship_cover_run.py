#!/usr/bin/env python3
"""ship_cover_run.py — memory-set updates for the 2026-11-11 AI-cover-art +
feature-proposal owner directive (assets generated; PROPOSED_FEATURES.md list;
zero lesson authoring; zero UI wiring)."""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

WORKLOG_ENTRY = """## 2026-11-11 — OWNER-DIRECTED AI COVER-ART + FEATURE-PROPOSAL PASS (not a numbered LOCKIN RUN; this turn): **28/28 AI-GENERATED COVER-ART ASSETS, TEXT-FREE AND VISION-SWEEP-VERIFIED (public/covers/*.webp — ZERO UI wiring, BookCover untouched); docs/project/PROPOSED_FEATURES.md delivered — the 46-item feature list (CV-01…06 cover wiring · IN-01…28 one flagship interactive per book · DR-01…03 · PR-01…04 · ST-01…05) awaiting the owner's add/skip decision; ZERO lesson authoring (run 90 still opens AA 1.1 + 1.2)**

**The owner's directive (this turn, verbatim):** "creat ai generated image for the books cover and add features or maths interactivity things dont add the features just give the list first then i will tell what to add and what to not" — cover images CREATE now; features LIST only.

**Execution:** (1) **The generator** `scripts/gen_covers.py` — one art per book for all 28 shelf books (864×1152, exact 3:4 cover portrait), a series design contract for visual unity: flat mid-century editorial vector, fine ivory line-work, paper grain, thin inner border frame, per-book MATIF keyed to the book's actual subject (unit circle + sine wave for trigonometry; sheared lattice + basis arrows for linear algebra; Galton board + pip dice for probability; Riemann bars for integral calculus; mug→doughnut morph for topology; …one per book), palette taken from each book's own `accent` hex pair in book.ts (hex→color-phrase table in the script) so the art family matches today's shelf gradients; STRICTLY no text in the art (titles/subtitles/level will be a CSS overlay when wired — AI-rendered text is unreliable, and the top/bottom breathing space is reserved for that overlay). Phases: gen (idempotent, FORCE/HARDER env knobs, PIL-verified completion), check (vision-model no-text sweep in 6-image chunks), clean (image-edit text removal — the API 307'd this session, so regeneration was used instead), optimize (WebP q85 into public/covers/), sheet (contact-sheet montage), status. (2) **The text war** — the sweep caught real leaks and they were hunted to zero: foundation-mathematics needed 3 regens (Chinese title baked in → numbered tiles 1,2,3,5… with the 4 mangled → clean stones/cubes/ribbon composition); probability-theory needed 3 (an 'A' on face-up aces → a '$' on the coin → clean Galton+dice); after the final sweep **0/28 flagged**. (3) **Motif fidelity QA** — vision spot-checks flagged linear-algebra (concentric circles, wrong motif) and topology (lumpy mug); both regenerated with sharpened prompts and re-verified partial-or-better + no-text. (4) **The assets landed:** full-quality PNGs + contact-sheet.png for the owner's review in `download/covers/` (git-ignored by design); repo-ready WebP set in `public/covers/` (28 files, 2.8 MB total — committed); the site itself is UNTOUCHED (BookCover still renders gradients — wiring is proposal CV-01, not implemented). (5) **The list** `docs/project/PROPOSED_FEATURES.md` — 46 items with stable IDs the owner can approve one by one: CV (cover wiring, hero shelf art, lightbox, og-images, PDF export, regen studio), IN (one flagship interactive per book, 28/28 — fraction bars, place-value converter, balance scale, root explorer, proof canvas, unit circle, construction canvas, conics studio, tangent explorer, Riemann stepper, 3-D surfaces, phase plane, transformation studio, symmetry playground, modular clock, Pascal explorer, chance simulator, data playground, graph sandbox, truth-table builder, Venn playground, deformation studio, ε–δ squeeze, complex-plane explorer, iteration lab, simplex stepper, Fourier mixer, exam-speed widgets), DR (step-through derivations, live formula derivations, try-first examples), PR (typed-answer checking feeding the existing Mistake Bank, hint ladders, drag-to-order drills, misconception tagging), ST (LaTeX-aware search, annotations, streaks/XP, keyboard nav, offline PWA); plus an already-exists section so nothing on the site is re-proposed, and the decision protocol (the owner replies with add/skip IDs; approved items queue behind the standing authoring cadence unless reordered).

**Gates:** no app code changed — the standing verify/lint/tsc suite is untouched by construction; the pass's own checks: py_compile clean; 28/28 covers PIL-verified; vision no-text sweep **28/28 clean (0 flagged)**; motif QA spot-checks passed; WebP optimize 28 files / 2,775 KB total; contact sheet built (1162×934).

**Deliverables:** scripts/gen_covers.py (the generator + verifier, committed); public/covers/*.webp ×28 (the committed art assets); download/covers/ ×28 PNG + contact-sheet.png (the owner's full-quality review set, sandbox-only); docs/project/PROPOSED_FEATURES.md (the 46-item decision list); WORKLOG/DETAILED_LOG/RESUME_POINTER (this pass recorded); PROGRESS.json untouched (no lessons moved).

**Zero lessons written. Authoring unchanged: run 90 opens AA 1.1 + 1.2 — the covers are assets and the features are proposals until the owner picks IDs.**

**Git:** ship commit follows this entry; **push PENDING** — no PAT in this turn's payload (the owner's directive message carried no fire payload), so per the standing push protocol the commit stays local and the next scheduled fire (whose payload re-embeds the PAT) or the owner pushes it; logged here without any token value, as always.

---

"""

DETAILED_ENTRY = """## 2026-11-11 — AI COVER-ART + FEATURE-PROPOSAL PASS (owner-directed): 28/28 covers generated text-free; the 46-item PROPOSED_FEATURES.md list awaits add/skip

- **The directive:** "creat ai generated image for the books cover and add features or maths interactivity things dont add the features just give the list first then i will tell what to add and what to not."
- **Covers (created):** scripts/gen_covers.py generates one 864×1152 (3:4) art per shelf book — motif from the book's subject, palette from the book's own accent pair, unified mid-century editorial series style, strictly no text (CSS overlay will carry typography). Vision-sweep verified 0/28 flagged after hunting real leaks (FM ×3 regens: Chinese title → numbered tiles → clean; probability ×3: ace 'A' → coin '$' → clean; linear-algebra + topology regens for motif fidelity). Assets: public/covers/*.webp ×28 (2.8 MB, committed) + download/covers/ PNGs + contact-sheet.png (review, git-ignored). BookCover UI untouched — wiring is proposal CV-01.
- **Features (list only, nothing implemented):** docs/project/PROPOSED_FEATURES.md — CV-01…06, IN-01…28 (one flagship interactive per book), DR-01…03, PR-01…04, ST-01…05, each with stable IDs for the owner's add/skip reply; already-exists section prevents re-proposing what the site has.
- **Authoring untouched:** run 90 still opens AA 1.1 + 1.2; approved features queue behind the standing cadence.

---
"""

RESUME_KEY = "coverArtAndFeatures20261111"
RESUME_VALUE = {
    "directive": "creat ai generated image for the books cover and add features "
                 "or maths interactivity things dont add the features just give "
                 "the list first then i will tell what to add and what to not",
    "covers": "28/28 AI cover art generated (864x1152, no-text by design, "
              "vision-sweep 0 flagged; motif per subject, palette per book "
              "accent). Repo assets public/covers/<id>.webp (28 files, "
              "~2.8 MB); full-quality PNGs + contact-sheet.png for owner "
              "review in sandbox download/covers/. ZERO UI wiring — BookCover "
              "still renders gradients; wiring is CV-01 on the proposal list.",
    "features": "docs/project/PROPOSED_FEATURES.md — 46 proposals, nothing "
                "implemented: CV-01..06 (cover wiring / hero shelf art / "
                "lightbox / og-images / PDF export / regen studio), IN-01..28 "
                "(one flagship interactive per book — the whole IN family "
                "plus CV-01 are the recommended set), DR-01..03 (step-through "
                "derivations, formula-sheet derivations, try-first examples), "
                "PR-01..04 (typed-answer checking into the Mistake Bank, hint "
                "ladders, drag-to-order drills, misconception tagging), "
                "ST-01..05 (LaTeX search, annotations, streaks/XP, keyboard "
                "nav, offline PWA).",
    "decisionPending": "the owner replies with add/skip IDs (e.g. 'add CV-01 "
                       "CV-02 IN-06 IN-13 DR-01'); approved items are "
                       "implemented in queue order behind the standing "
                       "authoring cadence unless the owner promotes them.",
    "authoring": "untouched — run 90 opens AA 1.1 + 1.2 exactly as the "
                 "run-89 pointer set",
    "regen": "python3 scripts/gen_covers.py gen|check|optimize|sheet|status "
             "[bookId...] — idempotent; FORCE=1 overwrite, HARDER=1 uses the "
             "anti-text prefix; the VLM sweep catches baked-in text the "
             "generator sometimes adds despite the no-text prompt",
}

NOTE = ("NOTE (AI cover art + feature list, 2026-11-11, owner directive — "
        "zero lessons written): 28/28 book-cover art assets generated "
        "text-free and vision-verified (public/covers/*.webp; UI unwired); "
        "the 46-item feature proposal list delivered at "
        "docs/project/PROPOSED_FEATURES.md — NOTHING implemented, awaiting "
        "the owner's add/skip reply; authoring cadence untouched.")


def main():
    # 1. WORKLOG prepend
    p = f"{ROOT}/docs/project/WORKLOG.md"
    t = open(p).read()
    if "AI COVER-ART + FEATURE-PROPOSAL PASS" not in t:
        open(p, "w").write(WORKLOG_ENTRY + t)
        print("WORKLOG.md: entry prepended")
    else:
        print("WORKLOG.md: already has the entry")

    # 2. DETAILED_LOG prepend
    p = f"{ROOT}/docs/project/DETAILED_LOG.md"
    t = open(p).read()
    if "AI COVER-ART + FEATURE-PROPOSAL PASS" not in t:
        open(p, "w").write(DETAILED_ENTRY + t)
        print("DETAILED_LOG.md: entry prepended")
    else:
        print("DETAILED_LOG.md: already has the entry")

    # 3. RESUME_POINTER round-trip (indent=2, ensure_ascii=False — exact match)
    p = f"{ROOT}/docs/project/RESUME_POINTER.json"
    d = json.load(open(p))
    if RESUME_KEY not in d:
        d[RESUME_KEY] = RESUME_VALUE
        d["notes"] = [NOTE] + d.get("notes", [])
        d["updated"] = "2026-11-11"
        with open(p, "w") as f:
            json.dump(d, f, indent=2, ensure_ascii=False)
        print("RESUME_POINTER.json: key added + note prepended")
    else:
        print("RESUME_POINTER.json: already has the key")


if __name__ == "__main__":
    main()
