#!/usr/bin/env python3
"""assemble_run125.py — the RUN 125 assembler for the LockIn Library repo.

Closes GEOMETRY (book #5 of the mathematics shelf) chapter 1 'Points, Lines
and Planes: the Axiomatic Idea' COMPLETE: grows ch-01.ts from the two shipped
lessons (1.1 + 1.2, run 124) to all FOUR (1.3 geo103 + 1.4 geo104, delivered
by the run-125 swarm at 109/109 and 101/101 green), flips the chapter tail to
status 'complete' / plannedLessons [], grows verify-book5-ch01.ts with the
geo103/geo104 sections and the CLOSED chapter census Z, and refreshes the
book.ts STATUS comment (chapter 1 closed; book still in-progress).

  JOB 1  build src/.../geometry/ch-01.ts   (four lessons + chapter export,
                                           C/FONT renamed per part tag;
                                           geo102 vivid-remap re-applied)
  JOB 2  build scripts/verify-book5-ch01.ts
                                           (the four v-files wrapped whole
                                           as async sections — engines
                                           re-run, pins re-reading the
                                           SHIPPED chapter — plus Z: the
                                           closed-chapter census)
  JOB 3  refresh book.ts STATUS comment    (run 125 closed ch.1 complete)

Run:  cd /home/z/my-project && python3 scripts/assemble_run125.py
"""

import os
import re

ROOT = "/home/z/my-project"
GEO = os.path.join(ROOT, "src/data/library/books/mathematics/geometry")
TR = os.path.join(ROOT, "temporary-references")
CH01 = os.path.join(GEO, "ch-01.ts")
BOOK = os.path.join(GEO, "book.ts")
VER = os.path.join(ROOT, "scripts/verify-book5-ch01.ts")

READ = lambda p: open(p, encoding="utf-8").read()
WRITE = lambda p, s: open(p, "w", encoding="utf-8").write(s)


def strip_import(text: str) -> str:
    return re.sub(
        r"^import type \{ Lesson \} from '\.\./src/data/library/types'\n",
        "",
        text,
        flags=re.M,
    )


def rename_palette(text: str, tag: str) -> tuple[str, int]:
    """Rename `const C` -> `const c<tag>` and `const FONT` -> `const f<tag>`,
    replacing EVERY exact `C.<prop>` property read (word-boundary + dot; prose
    like C(n,2) is untouched) and the whole-word FONT."""
    n = 0
    text = text.replace("const C = {", f"const c{tag} = {{")
    n += 1
    n += len(re.findall(r"\bC\.", text))
    text = re.sub(r"\bC\.", f"c{tag}.", text)
    text = re.sub(r"\bFONT\b", f"f{tag}", text)
    return text, n


# geo102 shipped a cool-tone palette (blue/purple/pink/navy) — a violation of
# the vivid-palette law (warm hues only; never blue/indigo). Caught at the
# run-124 integration seam; the remap (unchanged) re-applies here because the
# preserved part file is the ORIGINAL agent output. In-table hexes pass through.
VIVID_REMAP = {
    "#1B2A4A": "#166534",  # navy ink -> rich green ink
    "#475569": "#0f766e",  # slate -> teal ink (run-125 VLM sweep: lime sub-captions were low-contrast)
    "#2563EB": "#16a34a",  # blue -> vivid green (structure)
    "#1D4ED8": "#0f766e",  # blueDeep -> teal ink
    "#7C3AED": "#ea580c",  # purple -> vivid orange (accent)
    "#F59E0B": "#d97706",  # amberVivid -> bright amber
    "#059669": "#16a34a",  # emerald -> vivid green
    "#DB2777": "#dc2626",  # pink -> vivid red
    "#DBEAFE": "#ffedd5",  # blueSoft -> orange-100 panel
    "#CCFBF1": "#5eead4",  # tealSoft -> teal-300 faint
    "#EDE9FE": "#fef3c7",  # purpleSoft -> amber-100 panel
    "#FEE2E2": "#ffedd5",  # redSoft -> orange-100 panel
    "#D1FAE5": "#fef3c7",  # greenSoft -> amber-100 panel
    "#E2E8F0": "#fcd34d",  # slateSoft -> amber-300 separators
    "#FFFFFF": "#fffdf5",  # paper -> the light paper plate
}


def remap_vivid(text: str) -> tuple[str, int]:
    n = 0
    for old, new in VIVID_REMAP.items():
        cnt = text.count(old)
        n += cnt
        text = text.replace(old, new)
        text = text.replace(old.lower(), new)
    return text, n


CHAPTER_HEAD = """import type { Chapter, Lesson } from '../../../types'

/**
 * Geometry — chapter 1 "Points, Lines and Planes: the Axiomatic Idea"
 * (OPENED by the RUN 124 whole-chapter swarm and CLOSED COMPLETE by the
 * RUN 125 swarm, 2026-11-25: 1.1 + 1.2 delivered by geo101/geo102 at
 * 100/100 and 86/86 green; 1.3 'Axioms, Theorems and the Shape of a Proof'
 * and 1.4 'Incidence: how Points, Lines and Planes Interlock' delivered by
 * geo103/geo104 at 109/109 and 101/101 green — 10,047 and 9,688 words —
 * against the specs + ALL-GREEN pre-flight pin checker preserved in
 * docs/research/geo-ch01-wip/. Four lessons, one arc: the undefined words,
 * the five postulates, the shape of a proof, and the first counted
 * consequences. The chapter now powers ch.2 (angles, parallels, the
 * transversal census).)
 *
 * PROVENANCE: ground = the run-124 web-verified research pass (Euclid's
 * Elements Book I census via Joyce's clarku edition; Hilbert's
 * Grundlagen axiom listing; Playfair 1795; Saccheri 1733 / Lobachevsky
 * 1829 / Bolyai 1832 chronology; the Fano-plane census; de Bruijn–Erdős
 * 1948) — every URL banked in docs/project/SOURCE_LOG.md under the
 * geo-* keys. STUDY-NEVER-REPRODUCE absolute: every roster, witness,
 * figure, Illustration, quiz item and exercise below is OUR OWN,
 * engine-pinned in scripts/verify-book5-ch01.ts (which re-runs all four
 * verify-first harnesses against THIS file and closes with the
 * closed-chapter census).
 */
"""

CHAPTER_TAIL = """

export const chapter1: Chapter = {
  number: 1,
  slug: 'points-lines-and-planes',
  title: 'Points, Lines and Planes: the Axiomatic Idea',
  summary:
    'Geometry restarts from zero — not from shapes but from RULES. The undefined words (point, line, plane), the definitions that ride on them, Euclid\\u2019s five postulates as the rules of the game, the shape of a proof itself (direct, contrapositive, contradiction, counterexample — the conditional and its truth table), and incidence: the first theorems the rules buy, from the two-points-one-line axiom to the counted world of the four-point and Fano planes. The reader meets the axiomatic method end to end: a statement is believed only when proved, and everything before the first proof is either an agreement or a promise.',
  status: 'complete',
  lessons: [lessonGeo101, lessonGeo102, lessonGeo103, lessonGeo104],
  plannedLessons: [],
}
"""


def job1_build_ch01() -> None:
    parts = []
    for fname, tag in [
        ("part-geo101.ts", "101"),
        ("part-geo102.ts", "102"),
        ("part-geo103.ts", "103"),
        ("part-geo104.ts", "104"),
    ]:
        text = READ(os.path.join(TR, fname))
        text = strip_import(text)
        text, n = rename_palette(text, tag)
        if tag == "102":
            text, m = remap_vivid(text)
            print(f"   {fname}: vivid-palette remap ({m} hex reads)")
        print(f"   {fname}: palette renamed ({n} property reads)")
        parts.append(text.strip("\n") + "\n")
    out = CHAPTER_HEAD + "\n".join(parts) + CHAPTER_TAIL
    WRITE(CH01, out)
    print(f"JOB 1: wrote {CH01} ({len(out.splitlines())} lines)")


VER_HEAD = """import { chapter1, lessonGeo101, lessonGeo102, lessonGeo103, lessonGeo104 } from '../src/data/library/books/mathematics/geometry/ch-01'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch01.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 1 "Points, Lines and Planes: the Axiomatic Idea" (run 124
 * opened the book with 1.1 + 1.2; run 125 CLOSED THE CHAPTER COMPLETE
 * with 1.3 + 1.4). VERIFY-FIRST per the standing protocol: each lesson's
 * ENGINE section ran green BEFORE its prose was declared done — by the
 * authoring agent against its part file — and the PIN sections here
 * RE-READ THE SHIPPED CHAPTER (the part imports redirected to ch-01.ts).
 *
 *   (geo101) 1.1 engines + pins    (geo102) 1.2 engines + pins
 *   (geo103) 1.3 engines + pins    (geo104) 1.4 engines + pins
 *   (Z)      the closed-chapter census — the honest 4 + 0 shape
 *
 * Assembled by scripts/assemble_run125.py (extending run 124's): each
 * v-file wrapped whole as one async section (its local collectors/helpers
 * stay function-scoped, so nothing collides); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH01_SRC = new URL('../src/data/library/books/mathematics/geometry/ch-01.ts', import.meta.url).pathname

"""

VER_TAIL = """
/* ================================================================== */
/* SECTION Z — the closed-chapter census                               */
/* ================================================================== */
async function sectionZ(): Promise<SectionResult> {
  let pass = 0
  let fail = 0
  const z = (name: string, ok: boolean, detail = ''): void => {
    if (ok) pass++
    else {
      fail++
      console.log(`  Z FAIL ${name} — ${detail}`)
    }
  }
  console.log('== SECTION Z: the closed-chapter census ==')
  z('Z01 chapter number is 1', chapter1.number === 1)
  z('Z02 chapter slug', chapter1.slug === 'points-lines-and-planes', chapter1.slug)
  z('Z03 chapter status complete', chapter1.status === 'complete', chapter1.status)
  z('Z04 four lessons shipped', chapter1.lessons.length === 4, String(chapter1.lessons.length))
  z('Z05 plannedLessons empty', (chapter1.plannedLessons ?? []).length === 0, String((chapter1.plannedLessons ?? []).length))
  const ids = chapter1.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game', 'geo-axioms-theorems-and-the-shape-of-a-proof', 'geo-incidence-how-points-lines-and-planes-interlock']), ids.join(','))
  const nums = chapter1.lessons.map((l) => l.number)
  z('Z07 lesson numbers 1.1..1.4', JSON.stringify(nums) === JSON.stringify(['1.1', '1.2', '1.3', '1.4']), nums.join(','))
  const titles = chapter1.lessons.map((l) => l.title)
  z('Z08 lesson titles exact', JSON.stringify(titles) === JSON.stringify(['The Undefined Words and the Defined Ones', 'Euclid\\u2019s Five Postulates: the Rules of the Game', 'Axioms, Theorems and the Shape of a Proof', 'Incidence: how Points, Lines and Planes Interlock']), titles.join(' | '))
  const wcs = chapter1.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 each)', wcs.every((w) => w >= 6000), wcs.join(', '))
  for (const [i, l] of chapter1.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z11.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  const expectedPrereqs: string[][] = [
    [],
    ['geo-the-undefined-words-and-the-defined-ones'],
    ['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game'],
    ['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game', 'geo-axioms-theorems-and-the-shape-of-a-proof'],
  ]
  for (const [i, l] of chapter1.lessons.entries()) {
    z(`Z13.${i + 1} prerequisites exact`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(expectedPrereqs[i]), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH01_SRC))
  const shippedText = readFileSync(CH01_SRC, 'utf8')
  z('Z15 the shipped source exports all four lessons', ['lessonGeo101', 'lessonGeo102', 'lessonGeo103', 'lessonGeo104'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed-chapter shape) ----
  z('Z16 book status in-progress', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapter 1 carries the four shipped lessons', geometry.chapters[0].lessons.length === 4, String(geometry.chapters[0].lessons.length))
  z('Z19 chapters 2-12 still planned', geometry.chapters.slice(1).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter1.lessons.every((l) => l.blocks.length >= 10))
  const bookWords = chapter1.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${bookWords}`)
  z('Z22 the shipped body is non-trivial (> 30,000 words)', bookWords > 30000, String(bookWords))
  z('Z23 the prerequisite chain closes 1.4 -> 1.3', (chapter1.lessons[3].prerequisites ?? []).includes('geo-axioms-theorems-and-the-shape-of-a-proof'))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo101(),
    await sectionGeo102(),
    await sectionGeo103(),
    await sectionGeo104(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book5-ch01: verdict ================')
  let pass = 0
  let fail = 0
  for (const r of results) {
    console.log(`  ${r.id}: ${r.pass} pass, ${r.fail} fail`)
    pass += r.pass
    fail += r.fail
  }
  console.log(`  TOTAL: ${pass} pass, ${fail} fail`)
  if (fail > 0) {
    console.log('RESULT: NOT ALL GREEN — fix the failures and re-run.')
    process.exit(1)
  }
  console.log('RESULT: ALL GREEN — chapter 1 CLOSED COMPLETE (1.1 + 1.2 + 1.3 + 1.4; plannedLessons []).')
}

main()
"""


def wrap_section(body: str, fn_name: str, lesson: str) -> str:
    tail = (
        "  await runPins()\n"
        "  const ep = engine.filter((c) => c.ok).length\n"
        "  const pp = pins.filter((c) => c.ok).length\n"
        f"  return {{ id: '{fn_name.replace('section', '')} engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }}\n"
    )
    return f"async function {fn_name}(): Promise<SectionResult> {{\n{body}\n{tail}\n}}\n\n"


def job2_build_verifier() -> None:
    sections = []
    for key, lesson in [
        ("geo101", "lessonGeo101"),
        ("geo102", "lessonGeo102"),
        ("geo103", "lessonGeo103"),
        ("geo104", "lessonGeo104"),
    ]:
        v = READ(os.path.join(TR, f"v-{key}.ts"))
        v = re.sub(r"^import \{ countLessonWords \} from '\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = re.sub(r"^import type \{ Lesson \} from '\.\./src/data/library/types'\n", "", v, flags=re.M)
        v = v.replace(f"mod = await import('./part-{key}')",
                      f"mod = await Promise.resolve({{ {lesson} }})")
        cut = v.find("/* ------------------------------------------------------------------ */\n/* bottom harness")
        if cut < 0:
            cut = v.find("/* bottom harness")
        assert cut > 0, f"{key} harness cut not found"
        v = v[:cut]
        sections.append(wrap_section(v, f"section{key.capitalize()}", lesson))
    out = VER_HEAD + "\n".join(sections) + VER_TAIL
    WRITE(VER, out)
    print(f"JOB 2: wrote {VER} ({len(out.splitlines())} lines)")


def job3_refresh_book() -> None:
    b = READ(BOOK)
    assert "from './ch-01'" in b, "book.ts chapter1 import missing"
    assert b.count("  chapter1,") == 1
    new = (" * STATUS: IN-PROGRESS (run 125, 2026-11-25 — chapter 1 CLOSED COMPLETE:\n"
           " * all four lessons shipped by the authoring swarm; ch.2 rides next).\n")
    if new in b:
        print("JOB 3: book.ts STATUS comment already refreshed (idempotent re-run)")
        return
    old = (" * STATUS: IN-PROGRESS (run 124, 2026-11-25 — chapter 1 opened whole:\n"
           " * 1.1 + 1.2 shipped by the authoring swarm, 1.3 + 1.4 ride run 125).\n")
    assert old in b, "run-124 STATUS comment not found"
    b = b.replace(old, new)
    WRITE(BOOK, b)
    print(f"JOB 3: refreshed {BOOK} STATUS comment (chapter 1 closed complete)")


if __name__ == "__main__":
    job1_build_ch01()
    job2_build_verifier()
    job3_refresh_book()
    print("assemble_run125: done")
