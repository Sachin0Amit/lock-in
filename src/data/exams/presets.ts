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
 *  - COVERAGE RULE (2026-11-15, owner directive: "make sure different
 *    exams topics are also covered"): every registry entry with a
 *    researched mathematics section ships a preset here as soon as at
 *    least one of its units has meaningful written coverage. Exams whose
 *    maths is entirely unwritten (IIT JAM, AP, FE, Putnam …) are
 *    documented as not-yet-served with reasons in
 *    scripts/verify-exam-coverage.ts — the completeness ledger that
 *    re-runs on every pass.
 */

export interface ExamSection {
  label: string
  questionCount: number
  /** marks for a correct answer */
  marks: number
  /** marks subtracted for a wrong answer (0 = no negative marking) */
  negative: number
  /** how questions are answered: radio options or a typed numeric value
   * (JEE Section B / CAT TITA). Default 'mcq'. */
  type?: 'mcq' | 'numeric'
  /** display name of the question type (defaults from type) */
  typeName?: string
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
  /** true when the real exam ships an on-screen calculator (CAT does) */
  calculator?: boolean
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
      'Approximate JEE-style format: Section A · 20 MCQ, Section B · 5 numerical-value questions you type in (75 min · +4 / −1 per question). Exam-style items from your library — never real past-paper questions.',
    scopeStatus: 'provisional',
    durationMins: 75,
    sections: [
      { label: 'Section A · Mathematics', questionCount: 20, marks: 4, negative: 1, type: 'mcq', typeName: 'MCQ' },
      { label: 'Section B · Numerical Value', questionCount: 5, marks: 4, negative: 1, type: 'numeric', typeName: 'Numerical value' },
    ],
    scope: '*',
    caveats: [
      'Trigonometry — book planned, not yet written',
      'Coordinate geometry — book planned, not yet written',
      'Calculus (differential & integral) — books planned, not yet written',
      'Statistics & probability — book planned, not yet written',
    ],
  },
  {
    key: 'jee-advanced-maths',
    registryId: 'jee-advanced',
    name: 'JEE Advanced · Mathematics',
    region: 'India',
    category: 'engineering-entrance',
    formatNote:
      'Approximate JEE-Advanced-style maths slice: 15 single-correct MCQ (+4 / −1) in 60 minutes — the mathematics share of the real 3-hour paper; multi-select partial marking is not modelled. Exam-style items from your library — never real past-paper questions.',
    scopeStatus: 'provisional',
    durationMins: 60,
    sections: [{ label: 'Mathematics', questionCount: 15, marks: 4, negative: 1, type: 'mcq', typeName: 'MCQ' }],
    scope: '*',
    caveats: [
      'Trigonometry (identities, equations, inverse functions) — book planned, not yet written',
      'Analytical geometry (2D & 3D) — books planned, not yet written',
      'Calculus (differential, integral, differential equations) — books planned, not yet written',
      'Matrices & determinants — book planned, not yet written',
      'Probability (conditional, Bayes, binomial) — books planned, not yet written',
      'Sequences & series incl. AGP — planned chapters ahead',
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
      'Approximate CAT-style format: 14 MCQ (+3 / −1) and 8 TITA questions you type in (+3, no negative), 40 min, with the real exam\u2019s on-screen calculator. Arithmetic-and-algebra weighted — exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 40,
    calculator: true,
    sections: [
      { label: 'Quantitative Ability · MCQ', questionCount: 14, marks: 3, negative: 1, type: 'mcq', typeName: 'MCQ' },
      { label: 'Quantitative Ability · TITA', questionCount: 8, marks: 3, negative: 0, type: 'numeric', typeName: 'TITA (type-in)' },
    ],
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
  {
    key: 'upsc-csat',
    registryId: 'upsc-cse',
    name: 'UPSC CSAT · Basic Numeracy & Data',
    region: 'India',
    category: 'civil-service',
    formatNote:
      'Approximate CSAT-style slice (40 min · 30 questions · +2.5 / −0.83 — the basic-numeracy and data share of the real qualifying Paper 2; the 33% qualifying bar is not modelled). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 40,
    sections: [{ label: 'Paper 2 · Numeracy & Data', questionCount: 30, marks: 2.5, negative: 0.83 }],
    scope: [
      'foundation-mathematics:1',
      'foundation-mathematics:2',
      'foundation-mathematics:3',
      'foundation-mathematics:4',
      'foundation-mathematics:5',
      'foundation-mathematics:6',
      'foundation-mathematics:7',
      'foundation-mathematics:10',
      'arithmetic-and-number-systems:1',
      'arithmetic-and-number-systems:2',
    ],
    caveats: [
      'Mixture & alligation, time–speed–distance, time & work, averages — planned chapters ahead',
      'Logical reasoning & general mental ability — Mathematical Logic book planned',
      'Data-interpretation sets at CSAT depth — Statistics book planned',
    ],
  },
  {
    key: 'gate-engineering-maths',
    registryId: 'gate',
    name: 'GATE · Engineering Mathematics',
    region: 'India',
    category: 'pg-entrance-engineering',
    formatNote:
      'Approximate GATE-style slice: 6 one-mark MCQ (+1 / −1/3), 6 two-mark MCQ (+2 / −2/3) and 5 NAT questions you type in (+2, no negative) in 45 minutes — the algebra share of Engineering Mathematics; multi-select MSQ items are not modelled. Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 45,
    sections: [
      { label: 'Section A · 1-mark MCQ', questionCount: 6, marks: 1, negative: 0.33, type: 'mcq', typeName: 'MCQ' },
      { label: 'Section B · 2-mark MCQ', questionCount: 6, marks: 2, negative: 0.67, type: 'mcq', typeName: 'MCQ' },
      { label: 'Section C · NAT', questionCount: 5, marks: 2, negative: 0, type: 'numeric', typeName: 'NAT (type-in)' },
    ],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
    ],
    caveats: [
      'Linear algebra (matrices, eigenvalues, LU decomposition) — book planned, not yet written',
      'Calculus & multivariable calculus — books planned, not yet written',
      'Differential equations & Laplace transforms — book planned, not yet written',
      'Probability & statistics — books planned, not yet written',
      'Numerical methods — book planned, not yet written',
    ],
  },
  {
    key: 'ugc-net-paper1',
    registryId: 'ugc-net',
    name: 'UGC NET · Paper 1 Mathematical Reasoning',
    region: 'India',
    category: 'pg-fellowship',
    formatNote:
      'Approximate UGC-NET-style slice (25 min · 20 questions · +2 / no negative — the mathematical-reasoning and data share of the real 50-question Paper 1; teaching-aptitude units are outside the library). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 25,
    sections: [{ label: 'Paper 1 · Mathematical Reasoning & DI', questionCount: 20, marks: 2, negative: 0 }],
    scope: [
      'foundation-mathematics:1',
      'foundation-mathematics:2',
      'foundation-mathematics:3',
      'foundation-mathematics:4',
      'foundation-mathematics:5',
      'foundation-mathematics:6',
      'foundation-mathematics:7',
      'foundation-mathematics:10',
      'foundation-mathematics:11',
    ],
    caveats: [
      'Letter series & coding–decoding — Mathematical Logic book planned, not yet written',
      'Data-interpretation depth (tables, charts, graphs) — Statistics book planned',
      'Teaching & research aptitude units — outside the library\u2019s scope by design',
    ],
  },
  {
    key: 'ca-foundation-qa',
    registryId: 'ca-foundation',
    name: 'CA Foundation · Quantitative Aptitude',
    region: 'India',
    category: 'professional-qualification',
    formatNote:
      'Approximate ICAI-style slice (30 min · 25 questions · +1 / −0.25 — the business-mathematics share of Paper 3; logical-reasoning and statistics parts are caveated). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 30,
    sections: [{ label: 'Paper 3 · Business Mathematics', questionCount: 25, marks: 1, negative: 0.25 }],
    scope: [
      'foundation-mathematics:5',
      'foundation-mathematics:6',
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
    ],
    caveats: [
      'Logarithms — planned chapter ahead in Advanced Algebra',
      'Simple & compound interest, annuities, EMI — planned chapters ahead',
      'Permutations, combinations & probability — books planned, not yet written',
      'Statistics (central tendency, dispersion, correlation, index numbers) — book planned, not yet written',
      'Logical reasoning (series, coding–decoding) — Mathematical Logic book planned',
    ],
  },
  {
    key: 'isi-b-stat',
    registryId: 'isi-admission',
    name: 'ISI Admission · Mathematics (B.Stat / B.Math)',
    region: 'India',
    category: 'university-entrance-mathematics',
    formatNote:
      'Approximate ISI-style slice (60 min · 12 questions · +5 / no negative). Olympiad-adjacent items drawn from your library\u2019s hardest exercise levels — never real past-paper questions.',
    scopeStatus: 'provisional',
    durationMins: 60,
    sections: [{ label: 'Mathematics (UGA)', questionCount: 12, marks: 5, negative: 0 }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'advanced-algebra:3',
      'arithmetic-and-number-systems:1',
      'arithmetic-and-number-systems:2',
      'arithmetic-and-number-systems:3',
      'arithmetic-and-number-systems:4',
      'arithmetic-and-number-systems:5',
      'foundation-mathematics:8',
    ],
    caveats: [
      'Olympiad-depth inequalities & polynomials — planned chapters ahead',
      'Geometry (synthetic + coordinate) — books planned, not yet written',
      'Trigonometry — book planned, not yet written',
      'Calculus — books planned, not yet written',
      'Combinatorics — book planned, not yet written',
    ],
  },
  {
    key: 'sat-math',
    registryId: 'sat',
    name: 'SAT · Mathematics',
    region: 'International',
    category: 'university-entrance',
    formatNote:
      'Approximate digital-SAT-style slice (35 min · 20 questions · +1 / no negative — one module of the real adaptive pair; the 200–800 scaled score is not modelled). Exam-style items from your library — never real past-paper questions.',
    scopeStatus: 'provisional',
    durationMins: 35,
    sections: [
      { label: 'Module · Multiple choice', questionCount: 15, marks: 1, negative: 0, type: 'mcq', typeName: 'MCQ' },
      { label: 'Module · Student-produced response', questionCount: 5, marks: 1, negative: 0, type: 'numeric', typeName: 'Grid-in (type-in)' },
    ],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'foundation-mathematics:4',
      'foundation-mathematics:5',
      'foundation-mathematics:6',
      'foundation-mathematics:8',
      'foundation-mathematics:10',
    ],
    caveats: [
      'Trigonometry & radian measure — book planned, not yet written',
      'Complex numbers — Advanced Algebra ch. 3 in progress (2 of 5 lessons)',
      'Statistics depth (median, standard deviation, lines of best fit) — book planned, not yet written',
    ],
  },
  {
    key: 'act-math',
    registryId: 'act',
    name: 'ACT · Mathematics',
    region: 'International',
    category: 'university-entrance',
    formatNote:
      'Approximate ACT-style half-length paper (30 min · 30 questions · +1 / no negative — the real test is 60 questions in 60 minutes). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 30,
    sections: [{ label: 'Mathematics Test', questionCount: 30, marks: 1, negative: 0 }],
    scope: '*',
    caveats: [
      'Trigonometric ratios & functions — book planned, not yet written',
      'Vectors & matrices — books planned, not yet written',
      'Statistics & probability depth — books planned, not yet written',
    ],
  },
  {
    key: 'gre-quant',
    registryId: 'gre',
    name: 'GRE · Quantitative Reasoning',
    region: 'International',
    category: 'pg-entrance',
    formatNote:
      'Approximate GRE-style slice (40 min · 25 questions · +1 / no negative — roughly the two real quant sections combined; section-adaptive scaling and the quantitative-comparison format are not modelled). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 40,
    sections: [{ label: 'Quantitative Reasoning', questionCount: 25, marks: 1, negative: 0 }],
    scope: '*',
    caveats: [
      'Geometry depth (special triangles, circles, 3D solids) — FM ch. 8 covers foundations only',
      'Coordinate geometry — book planned, not yet written',
      'Counting methods & probability — books planned, not yet written',
      'Data-analysis depth — Statistics book planned',
    ],
  },
  {
    key: 'gmat-quant',
    registryId: 'gmat',
    name: 'GMAT · Quantitative Reasoning',
    region: 'International',
    category: 'management-entrance',
    formatNote:
      'Approximate GMAT-Focus-style slice (45 min · 21 problem-solving questions · +1 / no negative — data-sufficiency and Data-Insights items are caveated). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 45,
    sections: [{ label: 'Quantitative Reasoning', questionCount: 21, marks: 1, negative: 0 }],
    scope: [
      'foundation-mathematics:1',
      'foundation-mathematics:2',
      'foundation-mathematics:3',
      'foundation-mathematics:4',
      'foundation-mathematics:5',
      'foundation-mathematics:6',
      'foundation-mathematics:7',
      'foundation-mathematics:10',
      'arithmetic-and-number-systems:1',
      'arithmetic-and-number-systems:2',
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
    ],
    caveats: [
      'Data-sufficiency & Data-Insights reasoning — format not yet modelled (problem-solving only)',
      'Functions & modern-math depth — Advanced Algebra continues',
      'Statistics depth — book planned, not yet written',
    ],
  },
  {
    key: 'a-level-maths',
    registryId: 'a-levels',
    name: 'A-Level · Pure Mathematics',
    region: 'International',
    category: 'school-leaving',
    formatNote:
      'Approximate A-Level-style slice (60 min · 10 questions · +5 / no negative — real papers mix structured 2–15-mark items; mechanics and statistics papers are caveated). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 60,
    sections: [{ label: 'Pure Mathematics', questionCount: 10, marks: 5, negative: 0 }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'advanced-algebra:3',
    ],
    caveats: [
      'Trigonometry (identities, equations, reciprocal & inverse functions) — book planned, not yet written',
      'Calculus (differentiation & integration) — books planned, not yet written',
      'Coordinate geometry — book planned, not yet written',
      'Sequences & series, exponentials & logarithms — planned chapters ahead',
      'Vectors, mechanics & statistics papers — books planned, not yet written',
      'Further pure (matrices, polar coordinates, hyperbolics) — books planned, not yet written',
    ],
  },
  {
    key: 'ib-maths-aa',
    registryId: 'ib',
    name: 'IB · Mathematics (AA/AI core)',
    region: 'International',
    category: 'school-leaving',
    formatNote:
      'Approximate IB-style slice (60 min · 12 questions · +5 / no negative — real papers are 90–120 minutes of structured questions; the no-calculator and HL-extension papers are caveated). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 60,
    sections: [{ label: 'Mathematics core (SL/HL)', questionCount: 12, marks: 5, negative: 0 }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'advanced-algebra:3',
      'foundation-mathematics:8',
      'foundation-mathematics:10',
      'foundation-mathematics:11',
    ],
    caveats: [
      'Trigonometry (sine/cosine rules, identities) — book planned, not yet written',
      'Calculus (limits, derivatives, integrals, series at HL) — books planned, not yet written',
      'Statistics & probability distributions — books planned, not yet written',
      'Vectors (HL) — book planned, not yet written',
    ],
  },
  {
    key: 'gaokao-math',
    registryId: 'gaokao',
    name: 'Gaokao · Mathematics',
    region: 'China',
    category: 'university-entrance',
    formatNote:
      'Approximate Gaokao-style slice (60 min · 14 questions · +5 / no negative — the objective share of the real 120-minute paper; multi-select items and full-solution questions are not modelled). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 60,
    sections: [
      { label: 'Part I · Multiple choice', questionCount: 10, marks: 5, negative: 0, type: 'mcq', typeName: 'MCQ' },
      { label: 'Part II · Fill-in answers', questionCount: 4, marks: 5, negative: 0, type: 'numeric', typeName: 'Fill-in (type-in)' },
    ],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'advanced-algebra:3',
    ],
    caveats: [
      'Trigonometric functions & triangle solutions — book planned, not yet written',
      'Sequences (AP/GP and recursion) — planned chapters ahead',
      'Solid & analytic geometry — books planned, not yet written',
      'Derivatives — book planned, not yet written',
      'Counting, probability & statistics — books planned, not yet written',
      'Sets & logic — books planned, not yet written',
    ],
  },
  {
    key: 'korean-csat-math',
    registryId: 'korean-csat',
    name: 'Korean CSAT · Mathematics',
    region: 'Korea',
    category: 'university-entrance',
    formatNote:
      'Approximate Suneung-style slice (60 min · 20 questions · +3 / no negative — the real area is 30 questions in 100 minutes with 2–4 raw points per item). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 60,
    sections: [{ label: 'Mathematics area', questionCount: 20, marks: 3, negative: 0 }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'advanced-algebra:3',
    ],
    caveats: [
      'Trigonometric functions — book planned, not yet written',
      'Limits & polynomial calculus (Math II) — books planned, not yet written',
      'Integrals (Calculus elective) — book planned, not yet written',
      'Probability & statistics elective — books planned, not yet written',
      'Analytic geometry & space vectors (Geometry elective) — books planned, not yet written',
      'Exponentials & logarithms depth — planned chapters ahead',
    ],
  },
  {
    key: 'eju-math',
    registryId: 'eju',
    name: 'EJU · Mathematics (Course 1)',
    region: 'Japan',
    category: 'university-entrance',
    formatNote:
      'Approximate EJU-style Course-1 slice (60 min · 15 questions · +2 / no negative — the real paper is 90 minutes with mark-scheme answers; Course 2 units are caveated). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 60,
    sections: [
      { label: 'Part A · Multiple choice', questionCount: 10, marks: 2, negative: 0, type: 'mcq', typeName: 'MCQ' },
      { label: 'Part B · Answer sheet', questionCount: 5, marks: 2, negative: 0, type: 'numeric', typeName: 'Answer sheet (type-in)' },
    ],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'foundation-mathematics:8',
    ],
    caveats: [
      'Sets & propositions — books planned, not yet written',
      'Trigonometric ratios — book planned, not yet written',
      'Calculus family (Course 2) — books planned, not yet written',
      'Vectors & complex plane — books planned, not yet written',
      'Linear programming — book planned, not yet written',
      'Probability & statistics — books planned, not yet written',
    ],
  },
  {
    key: 'tmua-paper1',
    registryId: 'tmua',
    name: 'TMUA · Paper 1',
    region: 'UK',
    category: 'university-entrance-mathematics',
    formatNote:
      'Approximate TMUA-style paper (75 min · 20 MCQ · +1 / no negative — the real raw mark scheme is not public). Exam-style items from your library — never real past-paper questions.',
    scopeStatus: 'provisional',
    durationMins: 75,
    sections: [{ label: 'Paper 1', questionCount: 20, marks: 1, negative: 0 }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
    ],
    caveats: [
      'Calculus — books planned, not yet written',
      'Trigonometry & series — book planned, not yet written',
      'Vectors — book planned, not yet written',
      'Proof & the logic of argument (Paper 2 emphasis) — Mathematical Logic book planned',
      'Statistics base — book planned, not yet written',
    ],
  },
  {
    key: 'oxford-mat',
    registryId: 'oxford-mat',
    name: 'Oxford MAT · Multiple-choice sheet',
    region: 'UK',
    category: 'university-entrance-mathematics',
    formatNote:
      'Approximate MAT-style slice: the 10 multiple-choice parts of Question 1 (30 min · +4 / no negative) — the real paper\u2019s long-answer questions are not modelled. Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 30,
    sections: [{ label: 'Question 1 · Multiple choice', questionCount: 10, marks: 4, negative: 0 }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'foundation-mathematics:8',
    ],
    caveats: [
      'Differentiation & integration — books planned, not yet written',
      'Trigonometry — book planned, not yet written',
      'Logarithms & powers depth — planned chapters ahead',
      'Coordinate geometry — book planned, not yet written',
      'Graph-transformation long questions — not modelled in MCQ form',
    ],
  },
  {
    key: 'step-mathematics',
    registryId: 'step',
    name: 'STEP · Pure Mathematics (answers-only)',
    region: 'UK',
    category: 'university-entrance-mathematics',
    formatNote:
      'Approximate STEP-style slice (60 min · 6 questions · +10 / no negative): answers-only versions of the library\u2019s hardest exercises — proof craft cannot be auto-graded, so full STEP questions are honestly out of scope. Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 60,
    sections: [{ label: 'Pure Mathematics', questionCount: 6, marks: 10, negative: 0, type: 'numeric', typeName: 'Answers-only (type-in)' }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'advanced-algebra:3',
    ],
    caveats: [
      'STEP-depth calculus — books planned, not yet written',
      'Complex numbers & further series — planned chapters ahead',
      'Trigonometric identities at STEP depth — book planned, not yet written',
      'Probability & mechanics questions — books planned, not yet written',
      'Full proof-style marking — not modelled (answers-only here)',
    ],
  },
  {
    key: 'amc-12',
    registryId: 'amc-aime-usamo',
    name: 'AMC 12 · Competition set',
    region: 'USA',
    category: 'olympiad',
    formatNote:
      'Approximate AMC-12-style paper (75 min · 25 MCQ · +6 / no negative — the real paper awards 1.5 for a blank, which is not modelled). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 75,
    sections: [{ label: 'AMC 12', questionCount: 25, marks: 6, negative: 0 }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'advanced-algebra:3',
      'arithmetic-and-number-systems:1',
      'arithmetic-and-number-systems:2',
      'arithmetic-and-number-systems:3',
      'arithmetic-and-number-systems:4',
      'arithmetic-and-number-systems:5',
      'foundation-mathematics:8',
    ],
    caveats: [
      'Geometry at contest depth (classical theorems, Ptolemy) — FM ch. 8 covers foundations only',
      'Combinatorics & counting depth — book planned, not yet written',
      'Probability at AIME/USAMO tier — books planned, not yet written',
      'USAMO proof craft — outside MCQ papers by design',
    ],
  },
  {
    key: 'aime',
    registryId: 'amc-aime-usamo',
    name: 'AIME · Integer-answer set',
    region: 'USA',
    category: 'olympiad',
    formatNote:
      'Approximate AIME-style paper (90 min · 15 type-in questions · +1 / no negative — the real contest allows 3 hours and requires integers 0–999; the library\u2019s numeric answers are graded exactly instead). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 90,
    sections: [{ label: 'AIME I', questionCount: 15, marks: 1, negative: 0, type: 'numeric', typeName: 'Type-in (numeric answer)' }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'advanced-algebra:3',
      'arithmetic-and-number-systems:1',
      'arithmetic-and-number-systems:2',
      'arithmetic-and-number-systems:3',
      'arithmetic-and-number-systems:4',
      'arithmetic-and-number-systems:5',
      'foundation-mathematics:8',
    ],
    caveats: [
      'Geometry at contest depth — FM ch. 8 covers foundations only',
      'Combinatorics & counting depth — book planned, not yet written',
      'Probability at AIME/USAMO tier — books planned, not yet written',
      'USAMO proof craft — outside type-in papers by design',
    ],
  },
  {
    key: 'euclid',
    registryId: 'euclid',
    name: 'Euclid Contest · Senior set',
    region: 'Canada/International',
    category: 'olympiad',
    formatNote:
      'Approximate Euclid-style slice (90 min · 10 questions · +10 / no negative — the real contest is 2.5 hours of full solutions; the answers-only parts are served here). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 90,
    sections: [{ label: 'Euclid', questionCount: 10, marks: 10, negative: 0, type: 'numeric', typeName: 'Answers-only (type-in)' }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'advanced-algebra:3',
      'arithmetic-and-number-systems:1',
      'arithmetic-and-number-systems:2',
      'arithmetic-and-number-systems:3',
      'arithmetic-and-number-systems:4',
      'arithmetic-and-number-systems:5',
      'foundation-mathematics:8',
    ],
    caveats: [
      'Geometry at contest depth — FM ch. 8 covers foundations only',
      'Full-solution proof craft — answers-only here',
      'Combinatorics — book planned, not yet written',
    ],
  },
  {
    key: 'imo-style',
    registryId: 'imo',
    name: 'IMO · Topic set (algebra & number theory)',
    region: 'International',
    category: 'olympiad',
    formatNote:
      'Approximate olympiad topic set (60 min · 8 questions · +7 / no negative — the real IMO is 6 proof problems over two days, which cannot be auto-graded; this drills its written topics only). Exam-style items from your library.',
    scopeStatus: 'provisional',
    durationMins: 60,
    sections: [{ label: 'Topic set', questionCount: 8, marks: 7, negative: 0 }],
    scope: [
      'elementary-algebra:1',
      'elementary-algebra:2',
      'elementary-algebra:3',
      'elementary-algebra:4',
      'elementary-algebra:5',
      'elementary-algebra:6',
      'elementary-algebra:7',
      'elementary-algebra:8',
      'elementary-algebra:9',
      'elementary-algebra:10',
      'elementary-algebra:11',
      'elementary-algebra:12',
      'advanced-algebra:1',
      'advanced-algebra:2',
      'advanced-algebra:3',
      'arithmetic-and-number-systems:1',
      'arithmetic-and-number-systems:2',
      'arithmetic-and-number-systems:3',
      'arithmetic-and-number-systems:4',
      'arithmetic-and-number-systems:5',
      'foundation-mathematics:8',
    ],
    caveats: [
      'Functional equations & olympiad inequalities — planned chapters ahead',
      'Synthetic geometry (the full ladder) — book planned, not yet written',
      'Combinatorics at olympiad depth — book planned, not yet written',
      'Proof problems — outside MCQ papers by design',
    ],
  },
]

export function findExamPreset(key: string): ExamPreset | undefined {
  return EXAM_PRESETS.find((p) => p.key === key)
}

/** Display name for a section's question type. */
export function sectionTypeName(s: ExamSection): string {
  if (s.typeName) return s.typeName
  return s.type === 'numeric' ? 'Numerical value' : 'MCQ'
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

/* ------------------------------------------------------------------ */
/* Display grouping (the preset census grew to 28 — keep it scannable) */
/* ------------------------------------------------------------------ */

export interface ExamCategoryGroup {
  key: string
  label: string
  /** preset.category values that belong to this display group */
  match: readonly string[]
}

/**
 * Coarse display groups over the registry's categories, in reading order.
 * Every preset category must land in exactly one group —
 * scripts/verify-exam-coverage.ts enforces the mapping is total.
 */
export const EXAM_CATEGORY_GROUPS: readonly ExamCategoryGroup[] = [
  { key: 'general', label: 'General practice', match: ['general-practice'] },
  { key: 'university', label: 'University entrance', match: ['university-entrance'] },
  { key: 'engineering', label: 'Engineering entrance', match: ['engineering-entrance'] },
  { key: 'school', label: 'School-leaving', match: ['school-leaving'] },
  { key: 'pg', label: 'Postgraduate', match: ['pg-entrance', 'pg-entrance-engineering', 'pg-fellowship'] },
  { key: 'management', label: 'Management entrance', match: ['management-entrance'] },
  { key: 'govt', label: 'Government & defence', match: ['govt-recruitment', 'civil-service', 'defence-entrance'] },
  { key: 'professional', label: 'Professional', match: ['professional-qualification', 'professional-licensing'] },
  { key: 'maths-entrance', label: 'Mathematics entrance', match: ['university-entrance-mathematics'] },
  { key: 'olympiad', label: 'Olympiad & contests', match: ['olympiad'] },
]

/** Display-group label for a preset category ('Other' as the safe fallback). */
export function examGroupLabel(category: string): string {
  return EXAM_CATEGORY_GROUPS.find((g) => g.match.includes(category))?.label ?? 'Other'
}
