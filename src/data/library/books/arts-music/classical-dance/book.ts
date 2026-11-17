import type { Book, Chapter } from '../../../types'

/**
 * Classical Dance — the twenty-fifth book of the Arts-Music shelf (the performing register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 29 planned lessons, zero written. Lesson ids will use the `cldc-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Classical Dance owns the classical register. The rhythm’s-craft to rhythm-meter (the tala cross-reference); the raga’s register to vocal-music (the music sibling); the history to the humanities shelf (cross-referenced); the contemporary to contemporary-dance; the graded-and-practical registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Raghavan named as the Indian pole with the Vatsayan cross-reference named.
 * - The Vaganova named as the ballet pole (the graded register).
 * - The NCERT line named as the school register with the guru honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'ballet-foundation',
    title: 'The Ballet Foundation',
    summary:
      'The five\u2019s-discipline: the positions\u2019 honesty (the five receipt fixed by drill — the turnout\u2019s-cross-reference held, the croise-and-efface division named); the vocabulary census (the ply-and-tendu register — the two named at survey depth, the degagé named); the adagio-and-allegro division (the slow\u2019s-against-fast honesty — the control\u2019s-against-speed register); the pirouette\u2019s craft (the spot cross-reference — the four fixed by drill, the passé named); and the petit named at survey depth (the allegro\u2019s-fine register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Five Receipt Fixed by Drill',
      'The Control-Speed Register Held',
      'The Passé Named',
      'The Fine Register Named',
    ],
  },
  {
    number: 2,
    slug: 'pointe-repertory',
    title: 'The Pointe-and-Repertory Register',
    summary:
      'The toe\u2019s arc crafts: the pointe\u2019s craft (the ready receipt priced straight — the strength\u2019s-consequence named: the craft\u2019s-time named, the shoe\u2019s honesty — the fitted named with the ribbons named, the misuse\u2019s-caution — the ankle named); the repertory\u2019s arc (the ballet\u2019s-census — the romantic-and-classical division named: the two honesty, the corps register — the corps\u2019s-craft with the line named); and the pas register named (the two-and-three division — the deux named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ready Receipt Priced Straight',
      'The Fitted Honesty Named',
      'The Corps\u2019s-Craft Held',
      'The Deux Named',
    
      'International dance and interactions (classical ballet; emergence of modern dance in the West)'
    ],
  },
  {
    number: 3,
    slug: 'indian-classical',
    title: 'The Indian Classical Treasury',
    summary:
      'The eight\u2019s-census: the forms\u2019 register (the Bharatanatyam\u2019s Kathak crafts priced straight — the two receipts: the Tamil temple\u2019s North court named, the Odissi-and-Manipuri registers named with the Kuchipudi and Kathakali and Mohiniyattam and Sattriya completing the eight fixed by drill); the Adavu\u2019s craft (the Bharatanatyam\u2019s unit — the moru named, the that register with the jathi named); the guru-shishya honesty named (the transmission receipt — the parampara named); and the music sibling (the riyaz cross-reference — the soll named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Eight Fixed by Drill',
      'The Two Receipts Named',
      'The Parampara Named',
      'The Soll Named',
    
      'Unit 1 (common to Dance and Drama/Theatre): Cultural History of India',
      'Unit 5 (common): Dance and Theatre forms of East and South Asian Countries',
      'Dance in Sanskrit Literature and Treatises',
      'Drama and its theories — Indian and Western',
      'Unit V: Indian and Western aesthetics and art appreciation',
      'Unit VII: Chronological periods and developments in Indian art from prehistory to the 19th century',
      'Unit III (common): Rasa and Aesthetics (rasa according to Bharata and others; rasa nishpatti and its application to Indian classical music; aesthetics according to Indian and western philosophers; raga-ragini paintings)',
      'Contribution of composers/performers to music, Indian and western (Tevaram, Alwars, Purandara Dasa, the music trinity etc.)'
    ],
  },
  {
    number: 4,
    slug: 'mudra-abhinaya',
    title: 'The Mudra-and-Abhinaya Craft',
    summary:
      'The language\u2019s-discipline: the mudra census (the hand honesty — the one-hand\u2019s two-hand division named, the single receipt: the pataka fixed by drill with the tripataka named, the meaning\u2019s-context honesty — the same named: the vary receipt); the abhinaya craft (the expression\u2019s-register — the navarasa named: the nine fixed by drill with the shringara named, the sahitya named — the word\u2019s-craft); and the vachika named at survey depth (the recitation register cross-referenced from theatre).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pataka Fixed by Drill',
      'The Vary Receipt Held',
      'The Nine Fixed by Drill',
      'The Recitation Cross-Reference Named',
    ],
  },
  {
    number: 5,
    slug: 'pedagogy-repertoire',
    title: 'The Pedagogy-and-Repertoire Register',
    summary:
      'The learning\u2019s arc crafts: the pedagogy\u2019s honesty (the exam register — the graded cross-reference, the daily craft — the riyaz cross-reference held: the practice receipt); the margam\u2019s arc (the Bharatanatyam\u2019s-arc fixed by drill — the alarippu-and-jatiswaram division, the varnam named: the core receipt, the padams named with the thillana named); the arangetram named at survey depth (the debut honesty); and the history cross-reference held (the humanities shelf — the Court named: the two sources named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Practice Receipt Held',
      'The Varnam Named as the Core',
      'The Debut Honesty Named',
      'The Cross-Reference Held',
    ],
  },
]

export const classicalDance: Book = {
  id: 'classical-dance',
  title: 'Classical Dance',
  subtitle: 'The classical traditions — ballet\u2019s craft and the Indian classical treasury',
  discipline: 'arts-music',
  level: 'Beginner → advanced (the classical register)',
  description: 'The classical\u2019s discipline: the ballet\u2019s craft in full (the positions honesty — the five receipt fixed by drill, the vocabulary census — the croise-and-efface division, the adagio-and-allegro division — the slow\u2019s-against-fast honesty with the pirouette named, the pointe craft — the ready receipt priced straight with the strength consequence named, the pas register named — the two-and-three division); the Indian classical treasury (the eight-forms census — the Bharatanatyam\u2019s Kathak crafts priced straight with the Odissi and Manipuri named, the Adavus register — the Bharatanatyam-and-unit craft with the moru named, the mudra census — the hand honesty: the one-hand\u2019s two-hand division, the bol register cross-referenced from rhythm-meter — the Adi receipt named, the abhinaya craft — the expression\u2019s register with the navarasa named); the classical\u2019s pedagogy (the exam honesty — the graded cross-reference, the daily craft — the riyaz register cross-referenced from vocal-music); the repertoire\u2019s register (the ballet\u2019s-arc — the romantic-and-classical division named, the margam — the Bharatanatyam\u2019s-arc named: the alarippu-to-mangalam sequence fixed by drill); and the history cross-reference (the humanities shelf owns the register — the Court named at survey depth).',
  status: 'planned',
  accent: ['#9f1239', '#4c0519'],
  chapters,
}
