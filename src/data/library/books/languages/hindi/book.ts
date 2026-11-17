import type { Book, Chapter } from '../../../types'

/**
 * Hindi — the second book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 44 planned lessons, zero written. Lesson ids will use the `hin-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Hindi owns the Hindi register (the standard Khari Boli line and its registers). Sanskrit owns the classical parent (the two share Devanagari — the script’s lessons cross-referenced; the tatsama vocabulary’s deep etymons live in the Sanskrit book); the Urdu register’s shared Khari Boli base is named honestly (the future Urdu book, if promoted, will cross-reference — the Hindustani’s one-spoken-two-written register priced); the Cultural Studies book’s Indian popular register cross-references for the media’s Hindi; the Indian History book’s culture thread names the Bhakti literature’s Hindi antecedents.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Rama Kant Agnihotri, Hindi: An Essential Grammar (Routledge — the 151-page structure read this pass from the hosted PDF: the sounds and script, the noun's gender and agreement, the case system, the verb system and the tense-aspect-mood, the particle and compound register) as the grammar pole.
 * - The NCERT school register named (the class 6-12 Hindi textbooks' arc — the Vasant-Basant-Sanchayan-Kshitij-Kavya Chhand series as the Indian school spine).
 * - The UPSC/state PSC's Hindi-language registers named (the compulsory Hindi papers' frames); the Rajbhasha's official register named (the government's Hindi as the administrative spine).
 * - The Hindi Sahitya ka Itihas tradition named (the standard university literature-history register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'devanagari-phonetics',
    title: 'The Devanagari and the Sounds',
    summary:
      'The script\u2019s celebrated door: the twelve vowels and their matras (the a-aa-i-ii-u-uu census with the long-short\u2019s phonemic weight); the consonants\u2019 census (the five vargas by the articulation\u2019s place — the ka-varga to the pa-varga, the aspirated\u2019s bh-b pairs, the nasals, the semivowels and the sibilants, the special sets); the akshara\u2019s genius (the one-sound-one-letter honesty — the reader\u2019s luck priced against English\u2019s chaos); the conjuncts\u2019 craft (the ligatures\u2019 census with the reading\u2019s common ones drilled); the nasalisation\u2019s anusvara and the visarga\u2019s chandrabindu; and the Romanisation\u2019s Hindi-ness (the IAST-style transliteration for the learner\u2019s first weeks).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Vowels and Their Matras',
      'The Consonant Vargas',
      'The Conjuncts and the Nasals',
      'The First Reading Weeks',
    ],
  },
  {
    number: 2,
    slug: 'nominal-system',
    title: 'The Nominal System',
    summary:
      'The noun\u2019s engine: the gender\u2019s logic (the patterns that predict — the ending\u2019s census — with the honest exceptions drilled: the jagah and the chattri families); the number\u2019s craft (the plural\u2019s markers by gender and ending); the case\u2019s postpositional engine (the vibhakti census — the ne, ko, se, ka/ki/ke, mein, par, se, tak, kaa\u2019s eight families with the agreement\u2019s cascade in the genitive chain); the pronouns\u2019 census (the main, ham/tum/aap\u2019s three-tier register, the demonstratives\u2019 ye-vo-ye-ve sets, the interrogatives\u2019 kaun-kyaa-kahaa); the adjectives\u2019s agreement (the two families — the -a inflecting and the invariant); and the postpositions\u2019 own grammar (the kaa\u2019s genitive inflection — the one that agrees).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gender\u2019s Logic and Its Exceptions',
      'The Postpositional Vibhakti Census',
      'The Pronouns\u2019 Register',
      'The Adjective\u2019s Agreement',
      'Cardinal numbers',
    ],
  },
  {
    number: 3,
    slug: 'verbal-system',
    title: 'The Verbal System',
    summary:
      'The verb\u2019s full engine: the root and the stem\u2019s anatomy (the dhatu\u2019s craft); the tense-aspect-mood census in full (the simple past\u2019s transitive-ne rule — the ergative\u2019s Hindi surprise priced and drilled; the present habitual and its negative nahin forms; the continuous\u2019s rahaa construction; the perfect\u2019s possessive-ena geometry; the future\u2019s craft and its presumptive ga/ge/gii; the subjunctive\u2019s humility register); the imperative\u2019s three politenesses (the tu-tum-aap commands); the participles\u2019 census (the present, past, agentive — the adjectival\u2019s inflection); the compound verbs\u2019 craft (the vector\u2019s aspectual nuance — the kar dena-kar lena-kar jaana\u2019s fine shades); and the conjunctive participle\u2019s \u2019having done\u2019 engine.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tense-Aspect-Mood Census',
      'The Transitive-ne Rule',
      'The Participles and the Compounds',
      'The Conjunctive Participle\u2019s Craft',
    ],
  },
  {
    number: 4,
    slug: 'sentence-craft',
    title: 'The Sentence\u2019s Craft',
    summary:
      'The clause\u2019s architecture: the SOV core\u2019s discipline (the verb\u2019s final position with the honest exceptions — the question word and the emphasis\u2019s frontings); the negation\u2019s craft (the nahin, na, mat\u2019s register and the double negative\u2019s idiom); the interrogation\u2019s census (the kyaa-fronting, the tag\u2019s hai-na, the wh-family\u2019s positions); the relative-correlative\u2019s Hindi engine (the jo-vo, jahaa-vahaa, jaise-vaise pairs — the Sanskrit inheritance priced); the complex sentence\u2019s craft (the kii clause, the participle\u2019s subordination, the infinitive\u2019s purpose); and the word order\u2019s pragmatics (the topic\u2019s fronting, the focus\u2019s movement — the living word\u2019s flexibility priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The SOV Core\u2019s Discipline',
      'The Negation and the Interrogation',
      'The Relative-Correlative Engine',
      'The Complex Sentence\u2019s Craft',
    ],
  },
  {
    number: 5,
    slug: 'vocabulary-registers',
    title: 'The Vocabulary\u2019s Registers',
    summary:
      'The three-storey house: the tadbhava floor (the inherited words\u2019 natural speech — the deshaja and the tadbhava\u2019s everyday register); the tatsama floor (the Sanskrit\u2019s direct loans — the formal and the literary register, the government\u2019s rajbhasha register\u2019s core); the persianate-ara floor (the Urdu-line\u2019s Khari Boli partner — the adab, the shauq, the dushman register priced as the shared Hindustani inheritance); the modern floor (the English loans\u2019 Hindi citizenship — the naturalised vs the code-mix\u2019s line priced honestly); the synonyms\u2019 craft (the shabdarth\u2019s fine pairs — the ghar-ghata, the dekhaa-darshan registers); the idioms and proverbs\u2019 census (the muhaavare and the lokoktiyan\u2019s frequency-ranked set); and the word\u2019s gender memory method.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Storey House',
      'The Modern Floor\u2019s Citizenship Line',
      'The Idioms and Proverbs Census',
      'The Gender Memory Method',
    ],
  },
  {
    number: 6,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the graded stories from the Buniyaad-simple to the news\u2019s register; the Premchand\u2019s simplest tales as the first real books; the newspaper\u2019s craft — the headline\u2019s telegraphic Hindi); the writing\u2019s forms (the letter\u2019s saral register — the personal and the official\u2019s frames; the nibandh\u2019s essay architecture — the Hindi composition\u2019s three-part craft with the vyayaan\u2019s conclusion; the story\u2019s aavdaan; the precis\u2019s sandhaan); the dictionary\u2019s craft (the Hindi-Hindi turn as the milestone); and the reading\u2019s fluency drill (the speed\u2019s honest measurement).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reading Ladder',
      'The Letter and the Nibandh',
      'The Story and the Precis',
      'The Dictionary and the Fluency Drill',
    ],
  },
  {
    number: 7,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s Hindi: the media\u2019s Hindi as the immersion\u2019s sea (the Doordarshan\u2019s news\u2019s standard, the cinema\u2019s register — the Cultural Studies book\u2019s cinema chapter cross-referenced; the YouTube and the podcast era\u2019s spoken register); the conversation\u2019s registers (the home\u2019s and the market\u2019s natural Khari Boli against the office\u2019s formal line; the honorifics\u2019 tum-aap ladder as the social grammar — the aap\u2019s respect and the tum\u2019s intimacy priced with the etiquette\u2019s map); the regional accents\u2019 honest census (the Awadhi, Bhojpuri, Haryanvi, the hill and the Deccani\u2019s ear); the pronunciation\u2019s Indian-English interference priced (the v-w\u2019s confusion, the aspiration\u2019s absence); and the speaking\u2019s fluency craft (the paraphrase\u2019s escape, the fillers\u2019 honest use — yaani, matlab, mera matlab hai).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Media\u2019s Hindi as the Sea',
      'The Honorifics\u2019 Ladder',
      'The Regional Accents\u2019 Census',
      'The Fluency Craft',
    ],
  },
  {
    number: 8,
    slug: 'literature-survey',
    title: 'The Literature Survey',
    summary:
      'The bhakti to the present\u2019s arc: the Adi kal\u2019s register (the Prithviraj Raso\u2019s legend named; the early Rajasthani-Hindi line); the Bhakti\u2019s giants (Kabir\u2019s nirguna couplets — the ulatbansi\u2019s paradoxes priced; Tulsidas\u2019s Ramcharitmanas\u2019s Ram as the saga\u2019s language; Sur and Rahim named); the Ritikal\u2019s ornament (the Keshavdas line priced at the survey depth); the modern\u2019s arrival (Bharatendu\u2019s age — the dawn of the modern standard; Premchand\u2019s realism — the Godan as the Hindi novel\u2019s summit priced; the Chhayavad\u2019s trio — Nirala, Prasad, Pant, Mahadevi\u2019s Varma; the Agyeya and the Nayi Kavita; the Nayi Kahani\u2019s movement; the Dalit and the feminist registers named); and the reading\u2019s own craft (the poem\u2019s first patience, the story\u2019s first love — the future Arts shelf\u2019s literature books named as the continuation).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bhakti\u2019s Giants',
      'The Modern\u2019s Arrival and Premchand',
      'The Chhayavad and the Nayi Kavita',
      'The Contemporary Registers',
    ],
  },
  {
    number: 9,
    slug: 'exam-doorstep',
    title: 'The Exam Doorstep',
    summary:
      'The registers\u2019 close: the boards\u2019 Hindi (the CBSE-ICSE\u2019s grammar-composition-literature paper\u2019s craft); the competitive Hindi register (the UPSC\u2019s compulsory Hindi\u2019s essay-precis-comprehension craft; the state PSCs\u2019 registers; the KVS-NVS-TGT-PGT\u2019s teaching registers); the government\u2019s Hindi (the Rajbhasha\u2019s official register — the noting-drafting\u2019s craft, the orders and circulars\u2019 frames — the administrative spine priced); the Hindi typing and the digital register (the typing tutor\u2019s craft named; the Unicode\u2019s Devanagari\u2019s keyboard map); and the doorstep — to Sanskrit for the parent\u2019s treasury (the script shared, the etymons awaiting), to the shelf\u2019s other languages as the same discipline in a new dress, and to the reader\u2019s own Hindustani ear as the inheritance now read.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Boards\u2019 Craft',
      'The Competitive and Government Registers',
      'The Digital Devanagari',
      'The Doorstep: The Inheritance Read',
    ],
  },
]

export const hindi: Book = {
  id: 'hindi',
  title: 'Hindi',
  subtitle: 'The Devanagari door — India\u2019s national link language from first script to fluent register',
  discipline: 'languages',
  level: 'Absolute beginner → senior secondary Hindi + the government/competitive Hindi register',
  description: 'Hindi as a complete course for the learner who wants the real thing. The Devanagari script first (the vowels and consonants\u2019 full census, the matras, the conjuncts — the script\u2019s celebrated one-sound-one-letter honesty priced as the learner\u2019s luck); the phonetics (the nasalisation, the aspirated\u2019s pairs, the stress); the nominal system (the gender\u2019s logic with its honest exceptions, the case\u2019s postpositional engine — the vibhakti census, the pronouns\u2019 forms, the adjectives\u2019s agreement); the verbal system (the root and stem, the tense-aspect-mood census — the habitual, continuous, perfect family, the participles, the compound verbs\u2019 craft); the sentence\u2019s order (the SOV core, the negation and interrogation, the complex sentence\u2019s conjunctive participle craft); the vocabulary\u2019s registers (the tadbhava-tatsama-deshaja triad as Hindi\u2019s own three-storey house, the synonyms\u2019 craft, the idioms and proverbs\u2019 census); the reading and writing (the story and essay\u2019s craft, the letter and nibandh\u2019s frames); the listening and speaking (the media\u2019s Hindi, the conversation\u2019s registers — the honorifics\u2019 tum-tum-aap ladder); the literature\u2019s survey (the Adi kal to the present — Kabir, Tulsidas, Premchand, the Nayi Kavita named); and the exam door (the boards, the competitive Hindi register). Cross-references Sanskrit (the parent\u2019s script and the tatsama treasury) and hands off to the reader\u2019s own Hindustani ear.',
  status: 'planned',
  accent: ['#f59e0b', '#d97706'],
  chapters,
}
