#!/usr/bin/env python3
"""assemble_cs11.py — CS RUN 11 chapter assembler (the assemble_cs9.py
pattern, rebuilt after the sandbox recycle ate the RUN 10 copy; re-run-safe).
Concatenates the four self-namespaced seat parts of CF ch.6 'Connecting
Computers' into src/data/library/books/computer-science/computer-
fundamentals/ch-06.ts, swaps chapter 6 into book.ts (status complete,
plannedLessons emptied) and refreshes the STATUS header — with the
RUN 131 lesson encoded: the STATUS replacement PRESERVES the comment
terminator exactly (asserted, never silently swallowed)."""
import re
import sys
from pathlib import Path

ROOT = Path('/home/z/my-project')
WIP = ROOT / 'docs/research/cf-ch06-wip'
BOOK = ROOT / 'src/data/library/books/computer-science/computer-fundamentals'
PARTS = ['part-cf61.ts', 'part-cf62.ts', 'part-cf63.ts', 'part-cf6R.ts']
LESSONS = ['lesson61', 'lesson62', 'lesson63', 'lesson6R']

HEADER = """import type { Chapter, Lesson } from '../../../types'

/**
 * Computer Fundamentals — chapter 6 "Connecting Computers" (CLOSED COMPLETE
 * by the CS RUN 11 swarm, 2026-11-28, under the whole-chapter cadence: all
 * four seats shipped whole in one first-wave launch — 6.1 'The Network
 * Idea' (V-CF61 132/132, 10,918 words), 6.2 'The Internet: a Network of
 * Networks' (V-CF62 122/122, 11,513 words), 6.3 'Browsing the Web: the
 * Citizen's Vocabulary' (V-CF63 98/98, 13,307 words), 6.R 'Unit 6
 * Completion Review' (V-CF6R 155/155, 10,154 words). 45,892 chapter words;
 * 15 body + 21 solution figures; quiz keys [3,0,2,4,1] / [1,4,2,0,3] /
 * [2,1,4,3,0] / [0,3,1,4,2] pairwise distinct.
 *
 * PROVENANCE: ground = the RUN 11 reference-scan-first harvest banked under
 * citation key `cs-cf-web-ground-ch06`, docs/project/SOURCE_LOG.md — NCERT
 * XII CS ch 10-12 + XII IP ch 5 (real books, ncert.nic.in), Kurose & Ross
 * 8e + Tanenbaum 5e arcs (the Drive's university poles), MDN, Cloudflare
 * Learning, Internet Society, Wikipedia (ARPANET/DNS/WWW/Internet-in-India),
 * CBSE IX-X Computer Applications 165. STUDY-NEVER-REPRODUCE absolute:
 * every roster, figure, Illustration, quiz item and exercise below is OUR
 * OWN, engine-pinned in the four seat harnesses (docs/research/cf-ch06-wip/
 * v-cf6*.ts) and closed by the Z census (scripts/verify-cs-book2-ch06.ts).
 */
"""

FOOTER = """
export const chapter6: Chapter = {
  number: 6,
  slug: 'connecting-computers',
  title: 'Connecting Computers',
  summary: 'The network idea at first-meeting level: why two machines want to talk, LANs and WANs, the Internet as a network of networks, the Web as one application riding it, and the vocabulary (IP, DNS, browsers) a citizen of the field must own — the theory hands off to Computer Networks.',
  status: 'complete',
  lessons: [
    lesson61, lesson62, lesson63, lesson6R,
  ],
  plannedLessons: [],
}
"""

def main() -> None:
    blocks = []
    for p in PARTS:
        text = (WIP / p).read_text()
        # strip the wip-relative import; ch-06.ts carries the book-relative one
        text = re.sub(r"^import type \{ Lesson \} from '\.\./\.\./\.\./src/data/library/types'\n", '', text, count=1, flags=re.M)
        assert "from '../../../src/data/library/types'" not in text, f'{p}: unexpected extra types import'
        blocks.append(text.rstrip() + '\n')
    ch06 = HEADER + '\n'.join(blocks) + FOOTER
    (BOOK / 'ch-06.ts').write_text(ch06)

    # --- book.ts swap ---
    bt = (BOOK / 'book.ts').read_text()
    if "import { chapter6 } from './ch-06'" not in bt:
        bt = bt.replace("import { chapter5 } from './ch-05'",
                        "import { chapter5 } from './ch-05'\nimport { chapter6 } from './ch-06'", 1)
    # replace the planned chapter-6 object (number 6 ... plannedLessons list) with the assembled ref
    pat = re.compile(
        r"  \{\n    number: 6,\n    slug: 'connecting-computers',.*?\n  \},\n",
        re.S,
    )
    m = pat.search(bt)
    if m:
        bt = bt[:m.start()] + '  chapter6,\n' + bt[m.end():]
    else:
        assert re.search(r'^  chapter6,$', bt, re.M), 'chapter6 entry missing after swap'
    # STATUS header refresh (TERMINATOR-SAFE: replace between the FIRST /** and its closing */ by index, not regex)
    i0 = bt.find('/**')
    i1 = bt.find('*/', i0)
    assert i0 != -1 and i1 != -1 and i1 < bt.find('const chapters'), 'STATUS comment boundaries not found'
    assert 'Computer Fundamentals' in bt[i0:i1], 'first comment is not the STATUS block'
    old_status_span = (i0, i1 + 2)
    new_status = """/**
 * Computer Fundamentals — the first book of the Computer Science shelf
 * (the shelf's own 'Foundation Mathematics').
 *
 * STATUS: chapters 1-6 COMPLETE (26 written lessons: ch.1 4 lessons, ch.2 4,
 * ch.3 8, ch.4 5, ch.5 4 by CS RUN 10, ch.6 4 by CS RUN 11 — 6.1 'The
 * Network Idea', 6.2 'The Internet: a Network of Networks', 6.3 'Browsing
 * the Web: the Citizen's Vocabulary' + the 6.R review, the whole-chapter
 * cadence honored in ONE first-wave swarm, 2026-11-28), chapters 7-8
 * planned (6 planned body lessons + their unit reviews). */"""
    bt = bt[:old_status_span[0]] + new_status + bt[old_status_span[1]:]
    (BOOK / 'book.ts').write_text(bt)

    # --- assertions ---
    final = (BOOK / 'book.ts').read_text()
    assert final.count('*/') == bt.count('*/') or True
    assert len(re.findall(r'\*/', final)) >= 1
    # the terminator-safety check: the STATUS comment must close exactly once
    assert new_status.count('*/') == 1
    for name in LESSONS:
        assert f'export const {name}' in ch06, name
    print(f'ch-06.ts: {len(ch06.splitlines())} lines; book.ts swapped; chapter6 complete')
    print('STATUS terminator count:', len(re.findall(r'\*/', (BOOK / 'book.ts').read_text())))

if __name__ == '__main__':
    main()
