/**
 * Practice — mock-exam format presets (isomorphic).
 *
 * HONESTY RULES (same spirit as the library and the Custom Book Builder):
 *  - Every preset draws its questions EXCLUSIVELY from the written Main
 *    Academic Library (its own quizzes and exercises). Nothing is copied
 *    from real past papers; items are exam-style, never presented as
 *    authentic past-paper questions (types.ts authoring rule).
 *  - Formats (duration, question count, marking scheme) are APPROXIMATE
 *    patterns from public exam shapes, clearly labelled `formatNote` —
 *    verify against the official brochure before relying on them.
 *  - Scopes are PROVISIONAL chapter maps over the written library only
 *    (docs/project/EXAM_REGISTRY.json stays the research backlog: an
 *    entry only becomes `verified` after official-syllabus research).
 *    Known exam topics that are NOT yet in the library are listed in
 *    `caveats` — never silently ignored.
 *  - When new books/chapters are written, '*' scopes grow automatically;
 *    explicit chapter lists are reviewed on each library expansion.
 */

export interface ExamSection {
  label: string
  questionCount: number
  /** marks for a correct answer */
  marks: number
  /** marks subtracted for a wrong answer (0 = no negative marking) */
  negative: number
}

export interface ExamPreset {
  /** kebab-case key, stable forever (persisted in PracticeAttempt) */
  key: string
  /** matching id in docs/project/EXAM_REGISTRY.json, when one exists */
  registryId?: string
  name: string
  region: string
  category: string
  /** one-line honest labelling shown next to the preset */
  formatNote: string
  scopeStatus: 'provisional'
  durationMins: number
  sections: ExamSection[]
  /**
   * Chapter scope over WRITTEN library chapters: '*' = every chapter with
   * at least one written lesson; otherwise explicit `${bookId}:${n}` keys.
   */
  scope: '*' | string[]
  /** exam topics not yet covered by the written library — shown honestly */
  caveats: string[]
}

export const EXAM_PRESETS: ExamPreset[] = [
  {
    key: 'library-sweep',
    name: 'Library Sweep',
    region: '—',
    category: 'general-practice',
    formatNote:
      'A neutral full-library paper: one mark per correct answer, no negative marking.',
    scopeStatus: 'provisional',
    durationMins: 30,
    sections: [{ label: 'Mixed', questionCount: 20, marks: 1, negative: 0 }],
    scope: '*',
    caveats: [],
  },
  {
    key: 'jee-main-maths',
    registryId: 'jee-main',
    name: 'JEE Main · Mathematics',
    region: 'India',
    category: 'engineering-entrance',
    formatNote:
      'Approximate JEE-style format (75 min · 25 questions · +4 / −1). Exam-style items from your library — never real past-paper questions.',
    scopeStatus: 'provisional',
    durationMins: 75,
    sections: [{ label: 'Mathematics', questionCount: 25, marks: 4, negative: 1 }],
    scope: '*',
    caveats: [
      'Trigonometry — book planned, not yet written',
      'Coordinate geometry — book planned, not yet written',
      'Calculus (differential & integral) — books planned, not yet written',
      'Statistics & probability — book planned, not yet written',
    ],
  },
  {
    key: 'cuet-ug-maths',
    registryId: 'cuet-ug',
    name: 'CUET UG · Mathematics',
    region: 'India',
    category: 'university-entrance',
    formatNote:
      'Approximate CUET-style format (45 min · 20 questions · +5 / −1). Exam-style items from your library — never real past-paper questions.',
    scopeStatus: 'provisional',
    durationMins: 45,
    sections: [{ label: 'Mathematics / Applied Mathematics', questionCount: 20, marks: 5, negative: 1 }],
    scope: '*',
    caveats: [
      'Vectors & 3D geometry — not yet in the library',
      'Calculus — books planned, not yet written',
      'Probability & distributions — not yet written',
    ],
  },
  {
    key: 'cat-quant',
    registryId: 'cat',
    name: 'CAT · Quantitative Ability',
    region: 'India',
    category: 'management-entrance',
    formatNote:
      'Approximate CAT-style format (40 min · 22 questions · +3 / −1). Arithmetic-and-algebra weighted — exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 40,
    sections: [{ label: 'Quantitative Ability', questionCount: 22, marks: 3, negative: 1 }],
    scope: [
      'foundation-mathematics:1',
      'foundation-mathematics:2',
      'foundation-mathematics:3',
      'foundation-mathematics:4',
      'foundation-mathematics:5',
      'foundation-mathematics:6',
      'foundation-mathematics:7',
      'foundation-mathematics:11',
      'arithmetic-and-number-systems:1',
      'arithmetic-and-number-systems:2',
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
    ],
    caveats: [
      'Number systems beyond school arithmetic (higher LOD) — partial coverage',
      'Geometry & mensuration depth — FM ch. 8–9 only, CAT-level pending',
      'Functions, logs & modern maths — books planned, not yet written',
    ],
  },
  {
    key: 'ssc-cgl-quant',
    registryId: 'ssc-cgl',
    name: 'SSC CGL · Quantitative Aptitude',
    region: 'India',
    category: 'govt-recruitment',
    formatNote:
      'Approximate SSC-style format (20 min · 25 questions · +2 / −0.5). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 20,
    sections: [{ label: 'Quantitative Aptitude', questionCount: 25, marks: 2, negative: 0.5 }],
    scope: '*',
    caveats: [
      'Trigonometry — not yet in the library',
      'Data interpretation sets — FM ch. 10 covers basics only',
      'Geometry depth — FM ch. 8 only',
    ],
  },
  {
    key: 'nda-maths',
    registryId: 'nda',
    name: 'NDA · Mathematics (Paper I)',
    region: 'India',
    category: 'defence-entrance',
    formatNote:
      'Approximate NDA-style format (150 min · 60 questions · +2.5 / −0.83). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 150,
    sections: [{ label: 'Mathematics', questionCount: 60, marks: 2.5, negative: 0.83 }],
    scope: '*',
    caveats: [
      'Trigonometry — not yet written',
      'Calculus & differential equations — books planned, not yet written',
      'Vectors & 3D geometry — not yet written',
      'Statistics & probability — not yet written',
    ],
  },
]

export function findExamPreset(key: string): ExamPreset | undefined {
  return EXAM_PRESETS.find((p) => p.key === key)
}

/** Total question count across sections. */
export function presetQuestionCount(preset: ExamPreset): number {
  return preset.sections.reduce((n, s) => n + s.questionCount, 0)
}

/** Single marking scheme (today every preset is one math section). */
export function presetMarking(preset: ExamPreset): { marks: number; negative: number } {
  const s = preset.sections[0]
  return { marks: s.marks, negative: s.negative }
}
