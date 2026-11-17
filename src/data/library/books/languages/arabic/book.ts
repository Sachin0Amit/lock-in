import type { Book, Chapter } from '../../../types'

/**
 * Arabic — the tenth book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 44 planned lessons, zero written. Lesson ids will use the `arab-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Arabic owns the Arabic register (the MSA as the book’s engine with the dialect map priced honestly — the Egyptian and Levantine colloquial registers named, not taught here: one book, one engine, the diglossia’s awareness). The sanskrit book owns the parallel classical-register craft (the Quranic and the Vedic’s shared ’frozen classical’ register named at both doorsteps); the Persian and Urdu futures named honestly; the History shelf’s Indian History book’s Sultanate register cross-references the Arabic-Persian vocabulary’s Indian career.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Al-Kitaab Arabic Language Program (the Georgetown University Press pages read this pass — Alif Baa's first 20-25 contact hours with the sounds and script; Al-Kitaab Part One's integrated approach to the formal and colloquial registers' reading, listening, speaking, writing and cultural knowledge) — press.georgetown.edu + alkitaabtextbook.com as the course spine.
 * - The root-and-pattern engine (the triliteral root's morphological algebra named as the book's own method — the k-t-b's writing family as the classic demonstration).
 * - The diglossia's honest map (the MSA against the Egyptian-Levantine dialects' registers named at the survey depth); the Quranic register's features named as the classical door.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-script',
    title: 'The Script',
    summary:
      'The letters\u2019 craft: the 28 letters\u2019 census (the alphabetical order\u2019s craft with the alif-ba-ta\u2019s first friends; the abjad\u2019s letters with the three long vowels\u2019 matres lectionis priced); the four positional forms (the initial\u2019s joined-right, the medial\u2019s joined-both, the final\u2019s joined-left and the isolated\u2019s solo — the same letter\u2019s four suits with the reading\u2019s drill method); the right-to-left discipline (the page\u2019s turn with the writing\u2019s direction — the hand\u2019s first weeks priced honestly); the dots\u2019 discipline (the b-t-n-th-y\u2019s one-shape families with the dot\u2019s differentiation craft — the care\u2019s price named); the hamza\u2019s craft (the glottal\u2019s seat on the alif, waw and ya with the rules\u2019 register); and the ligature\u2019s lam-alif (the mandatory pair as the first special friend).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The 28 Letters\u2019 Census',
      'The Four Positional Forms',
      'The Dots\u2019 Discipline and the Right-to-Left Craft',
      'The Hamza and the Lam-Alif',
      'Iv IF YOU ARE NOT SURE WHICH UNITS YOU NEED TO STUDY, USE THE STUDY GUIDE ON PAGE',
      'Vi IF YOU ARE NOT SURE WHICH UNITS YOU NEED TO STUDY, USE THE STUDY GUIDE ON PAGE'
    ],
  },
  {
    number: 2,
    slug: 'the-sounds',
    title: 'The Sounds',
    summary:
      'The mouth\u2019s Arabic craft: the consonants\u2019 throaty treasury (the qaf\u2019s deep uvular against the kaf\u2019s plain; the ayn and the ghayn\u2019s two-new-sound challenge priced as the trophy; the ha family\u2019s four — the h, kh, h and the plain h\u2019s craft); the emphatics\u2019 craft (the sad, dad, ta and za\u2019s heavy pair against their plain twins — the (t)arab\u2019s velarised craft with the a-colouring\u2019s register); the short and long vowels (the fatha, kasra and damma\u2019s short craft with the long\u2019s alif, ya and waw\u2019s matres; the reading\u2019s first syllables); the sukun and shadda\u2019s engine (the consonant\u2019s closure and the gemination\u2019s doubling — the shadda as the strength\u2019s mark); the tanwin\u2019s craft (the nunation\u2019s indefinite endings with the three-vowel families); and the stress\u2019s law (the heavy syllable\u2019s rule with the reading\u2019s rhythm).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Throat\u2019s Treasury',
      'The Emphatics\u2019 Craft',
      'The Short and Long Vowels',
      'The Sukun, Shadda and the Stress',
    ],
  },
  {
    number: 3,
    slug: 'nominal-core',
    title: 'The Nominal Core',
    summary:
      'The noun\u2019s engine: the gender\u2019s craft (the ta-marbuta\u2019s feminine mark with the exceptions\u2019 honest register); the definite article\u2019s al- (the sun and moon letters\u2019 assimilation rule — the ash-shams and al-qamar\u2019s pair as the rule\u2019s own mnemonic; the indefinite\u2019s nunation revisited); the iḍafa\u2019s possessive chain (the construct state\u2019s craft — the bayt al-rajul\u2019s house-of-the-man with the first noun\u2019s article-loss priced as the chain\u2019s discipline; the multi-noun chains as the Arabic\u2019s own architecture); the plural\u2019s two ways (the sound\u2019s feminine -at and masculine -un with the broken plural\u2019s patterns\u2019 honest census — the thirty-plus patterns priced at the frequency-ranked register: the kutub\u2019s books and the asdiqa\u2019s friends as the first friends); the adjectives\u2019 agreement (the noun\u2019s gender and number with the definite state\u2019s match — the al- house of the beautiful craft); the demonstratives and pronouns\u2019 census (the dha and hadha\u2019s craft with the detached pronouns\u2019 table); and the numbers\u2019 craft (the \u2019ahad and ithnan\u2019s irregular pair with the reverse-gender agreement\u2019s surprise named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gender and the Definite Article',
      'The Iḍafa\u2019s Possessive Chain',
      'The Broken Plural\u2019s Patterns',
      'The Adjectives, Pronouns and Numbers',
    ],
  },
  {
    number: 4,
    slug: 'verbal-core',
    title: 'The Verbal Core',
    summary:
      'The root-and-pattern engine: the triliteral root\u2019s wonder (the k-t-b\u2019s family tree — the kataba\u2019s he-wrote, the kitab\u2019s book, the maktaba\u2019s library, the katib\u2019s writer, the maktub\u2019s written: the one root\u2019s whole civilisation priced as the language\u2019s own algebra); the perfect\u2019s conjugation (the past\u2019s engine with the suffix\u2019s persons — the katabtu, katabta, kataba\u2019s table as the first mountain); the imperfect\u2019s craft (the prefix-and-suffix\u2019s assembly — the aktubu, taktubu, yaktubu\u2019s table with the mood\u2019s endings: the indicative, subjunctive and jussive\u2019s craft); the derived forms\u2019 ladder (the fa\u2019ala\u2019s ten-family register introduced — the fa\u2019\u2019ala\u2019s intensive, the afa\u2019\u2019ala\u2019s causative, the infa\u2019\u2019ala\u2019s reflexive with the form\u2019s recognisability craft priced at the survey depth); the verb\u2019s agreement (the subject\u2019s person and gender with the dual\u2019s craft named); and the negation\u2019s craft (the la\u2019s and the ma\u2019s division with the future\u2019s sa- and sawfa\u2019s craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Triliteral Root\u2019s Wonder',
      'The Perfect\u2019s Engine',
      'The Imperfect and the Derived Forms\u2019 Ladder',
      'The Agreement and the Negation',
      'He a shoelace. 5 behind a tree',
      'Indic. Indicative'
    ],
  },
  {
    number: 5,
    slug: 'everyday-situations',
    title: 'The Everyday Situations',
    summary:
      'The Al-Kitaab arc\u2019s situations: the greetings and the salaam\u2019s register (the as-salamu alaykum\u2019s peace-craft with the reply\u2019s wa alaykum as-salam\u2019s dance — the greeting\u2019s social depth priced); the introductions (the ismi\u2019s my-name craft with the min-ayna\u2019s where-from register); the family and the home (the ayla\u2019s census with the family terms\u2019 register); the coffee house\u2019s culture (the qahwa\u2019s coffee with the generosity\u2019s etiquette priced as the culture\u2019s own grammar — the dates and the three-cups\u2019 custom named); the directions and the city (the ayna\u2019s where craft with the yamin and yasal\u2019s compass); the shopping and the market (the bi-kam\u2019s how-much with the bargaining\u2019s polite craft); and the food and the restaurant (the ta\u2019am\u2019s food register with the Ramadan\u2019s generosity named kindly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Salaam\u2019s Register',
      'The Introductions and the Family',
      'The Coffee House\u2019s Culture',
      'The Market and the Restaurant\u2019s Registers',
    ],
  },
  {
    number: 6,
    slug: 'registers-map',
    title: 'The Registers\u2019 Map',
    summary:
      'The diglossia\u2019s frank map: the MSA\u2019s domain (the news, the books, the Quran, the formal speech — the modern standard as the book\u2019s own engine and the whole Arab world\u2019s written lingua franca); the dialects\u2019 world (the Egyptian\u2019s media prestige with the Levantine\u2019s two registers and the Maghribi, Gulf and Iraqi families named — the map\u2019s honesty: the dialects are the home\u2019s speech, the MSA the school\u2019s); the diglossia\u2019s craft (the child\u2019s double grammar priced kindly — the fusha and the ammiyya\u2019s coexistence as the Arab world\u2019s own reality); the fusha\u2019s own registers (the classical and the modern standard\u2019s continuity named — the Quranic to the newsroom\u2019s one stream); and the learner\u2019s honest path (the MSA-first\u2019s craft with the dialect\u2019s addition when the travel\u2019s door opens — the Al-Kitaab\u2019s own integrated approach priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The MSA\u2019s Domain',
      'The Dialects\u2019 World',
      'The Diglossia\u2019s Craft',
      'The Learner\u2019s Honest Path',
    ],
  },
  {
    number: 7,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the short texts from the lesson\u2019s dialogues to the first real passages; the vowel-less news register priced honestly — the harakat\u2019s training wheels and the full text\u2019s craft); the writing\u2019s forms (the dictation\u2019s imla\u2019 craft as the spelling\u2019s gym; the short composition\u2019s frame — the self-introduction\u2019s hadha ana register; the letter and email\u2019s frames with the formal\u2019s ustadh register); the calligraphy\u2019s art named (the kufic and the naskh\u2019s traditions priced as the culture\u2019s own visual register — the art\u2019s door named, not taught); the keyboard\u2019s craft (the Arabic keyboard\u2019s map with the typing\u2019s IME register); and the first real texts (the children\u2019s stories and the news\u2019s first headlines priced as the immersion\u2019s doors).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reading Ladder and the Vowel-Less Register',
      'The Dictation and the Composition\u2019s Craft',
      'The Calligraphy\u2019s Art Named',
      'The First Real Texts',
    ],
  },
  {
    number: 8,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s craft: the listening\u2019s drill (the dialogues at the Al-Kitaab\u2019s measured register; the MSA\u2019s news register as the listening\u2019s sea — the al-Jazeera\u2019s measured pace named); the speaking\u2019s register (the pair-work\u2019s frames with the conversation\u2019s openers; the politeness\u2019s register — the inshallah and its cultural craft priced kindly as the language\u2019s own texture); the pronunciation\u2019s polish (the ayn\u2019s trophy drill with the uvular\u2019s gargle method; the emphatics\u2019 colouring craft; the long vowels\u2019 length discipline); the fluency\u2019s craft (the fillers\u2019 honest use — the ya\u2019ni register; the paraphrase\u2019s escape with the kayf\u2019s how-to-say craft); and the immersion\u2019s sea (the songs and the Umm Kulthum register named — the classical song\u2019s slow diction as the learner\u2019s own gift).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Listening Drill',
      'The Politeness\u2019s Register',
      'The Ayn\u2019s Trophy Drill',
      'The Immersion\u2019s Sea',
    ],
  },
  {
    number: 9,
    slug: 'classical-register',
    title: 'The Classical Register',
    summary:
      'The Quranic door: the classical\u2019s features (the Quranic Arabic\u2019s own grammar registers — the case\u2019s fuller endings with the rhetoric\u2019s saj\u2019 craft named at the survey depth); the short suras\u2019 register (the al-Fatiha\u2019s opening as the traditional first text — the seven verses\u2019 craft priced as the classical door; the al-Ikhlas and the al-Kawthar\u2019s short suras as the learner\u2019s first real classical reading with the vocabulary\u2019s shared register); the classical\u2019s treasury named (the al-Jahiz\u2019s prose and the al-Mutanabbi\u2019s poetry named as the far doors); the classical and the modern\u2019s continuity (the fusha\u2019s one stream from the Quran to the newsroom priced honestly); and the reading\u2019s craft (the tajwid\u2019s named register — the recitation\u2019s craft priced as the door, not the exam\u2019s).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Quranic Features',
      'The Short Suras\u2019 Register',
      'The Classical Treasury Named',
      'The One Stream\u2019s Continuity',
    ],
  },
  {
    number: 10,
    slug: 'alkitaab-doorstep',
    title: 'The Al-Kitaab Doorstep',
    summary:
      'The register\u2019s close: the Al-Kitaab arc\u2019s own map (the Alif Baa\u2019s sounds-and-script foundation — the first 20-25 contact hours; the Part One\u2019s integrated skills\u2019 level as this book\u2019s promised destination; the Part Two\u2019s horizon named); the exam\u2019s world priced honestly (the Arabic\u2019s own proficiency registers — the ACTFL-style and the al-Azhar\u2019s classical registers named; no single JLPT-style world exam — the honest note); the dialect\u2019s addition named (the Egyptian\u2019s media register as the travel door); the media\u2019s register (the news\u2019s headline craft as the MSA\u2019s daily food); and the doorstep — the immersion\u2019s sea (the news and the songs\u2019 register), the Philosophy and Indian History books\u2019 cross-references (the Arabic-Persian world\u2019s Indian career), and the reader\u2019s first dream: the al-Fatiha read cold, and the first real Cairo conversation.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Al-Kitaab Arc\u2019s Map',
      'The Proficiency Registers Named',
      'The Media\u2019s Register',
      'The Doorstep: The Al-Fatiha Read Cold',
    ],
  },
]

export const arabic: Book = {
  id: 'arabic',
  title: 'Arabic',
  subtitle: 'The root-and-pattern engine — from the letters to the Al-Kitaab arc and the classical register',
  discipline: 'languages',
  level: 'Absolute beginner → Al-Kitaab Part One\u2019s level, the elementary MSA with the dialect map priced',
  description: 'Arabic as a complete course with the root-and-pattern engine priced up front (the triliteral root\u2019s wonder — the k-t-b\u2019s writing family that builds the book, the library and the writer from one root; the awzaan\u2019s patterns as the morphology\u2019s own algebra). The script first (the 28 letters\u2019 census with the four positional forms — the initial, medial, final and isolated; the right-to-left craft; the hamza and the long vowels\u2019 matres); the sounds (the emphatic consonants\u2019 throaty craft, the short and long vowels, the sukun and shadda\u2019s engine); the nominal core (the gender\u2019s craft, the definite article\u2019s al- with the sun and moon letters\u2019 assimilation rule, the iḍafa construction\u2019s possessive chain, the plural\u2019s broken patterns\u2019 honest census, the adjectives\u2019 agreement); the verbal core (the perfect\u2019s conjugation as the past\u2019s engine, the imperfect\u2019s prefix-and-suffix craft with the mood\u2019s endings, the derived forms\u2019 introduced ladder — the fa\u2019ala\u2019s ten-family register); the everyday situations (the Al-Kitaab arc\u2019s first units — the greetings and the salaam\u2019s register, the introductions, the family, the coffee house\u2019s culture notes); the registers\u2019 map (the MSA against the dialects — the Egyptian and the Levantine\u2019s colloquial world priced honestly with the diglossia\u2019s frank map); the reading and writing (the short texts, the dictation\u2019s craft, the calligraphy\u2019s art named); the listening and speaking (the dialogues\u2019 drill, the conversational registers); the classical register (the Quranic Arabic\u2019s features with the short suras\u2019 register priced as the classical door); and the doorstep. Cross-references the sanskrit book (the classical-register craft named) and hands off to the reader\u2019s first Quran-or-al-Jahiz ambition.',
  status: 'planned',
  accent: ['#0c4a6e', '#082f49'],
  chapters,
}
