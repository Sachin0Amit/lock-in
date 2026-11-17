import type { Book, Chapter } from '../../../types'

/**
 * German — the fifth book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 52 planned lessons, zero written. Lesson ids will use the `ger-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): German owns the German register (the standard Hochdeutsch line). The english book owns the Germanic sibling’s shared craft (the cognate’s bridge and the word order’s contrast cross-referenced); the Goethe-Zertifikat A1-C2 register is this book’s exam spine; the Dutch and the Scandinavian registers are named honestly as the family’s future books; the Hammer grammar is this book’s depth pole named at the doorstep.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Menschen course (Hueber — the A1/A2/B1 Kursbuch + Arbeitsbuch structure read this pass via the Hueber and retail records: each level a coursebook-workbook pair, the lesson situations' register) as the course spine.
 * - Martin Durrell, Hammer's German Grammar and Usage 7e (the Routledge contents read this pass — the Nouns and Gender, the Case, the declension and the verb's full register) as the depth pole.
 * - The Goethe-Zertifikat register (goethe.de — the official exam pages read this pass: the German exams A1 to C2 for all levels of ability; the A1 and A2/B1 family's formats) as the exam spine.
 * - The CEFR's own six-level ladder (coe.int — read this pass) as the book's framework; the common German-English false friends' census named as the vocabulary craft's register.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'sounds-umlaute',
    title: 'The Sounds and the Umlauts',
    summary:
      'The mouth\u2019s German craft: the vowels\u2019 pure discipline (the long-short\u2019s phonemic weight — the Staat and Stadt\u2019s trap; the diphthongs\u2019 eu and ei); the umlauts\u2019 fronting (the a-o-u\u2019s mutation — the schon and schön\u2019s difference drilled with the minimal pairs\u2019 method); the consonants\u2019 census (the ch\u2019s two voices — the Bach and ich registers; the z\u2019s ts sound — the zehn\u2019s surprise; the w-v and f-v\u2019s English traps; the ß\u2019s sharp s with the new orthography\u2019s rules); the stress\u2019s variable discipline (the separable prefixes\u2019s stress as the verb\u2019s signature — the AUFstehen\u2019s rhythm); and the alphabet\u2019s spelling craft (the Buchstabieren\u2019s ritual with the phone\u2019s spells).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Vowels\u2019 Pure Discipline',
      'The Umlauts\u2019 Fronting',
      'The Consonants\u2019 Census',
      'The Spelling Ritual',
    ],
  },
  {
    number: 2,
    slug: 'nominal-core',
    title: 'The Nominal Core',
    summary:
      'The noun\u2019s engine: the gender\u2019s logic and its honest exceptions (the -ung, -heit, -keit feminines, the -chen neuter\u2019s diminutive — the Mädchen\u2019s famous girl; the natural gender\u2019s exceptions priced with the der See and die See\u2019s homonym trap); the four cases\u2019 full engine (the nominative\u2019s subject, the accusative\u2019s direct object with the durch-für-gegen-ohne-um\u2019s prepositions\u2019 accusative monopoly, the dative\u2019s indirect object with the bei-mit-nach-seit-von-zu\u2019s dative monopoly, the genitive\u2019s possession with its written register\u2019s formality — the case\u2019s signal as the article\u2019s change, not the noun\u2019s); the articles\u2019 table (the der-die-das and the ein-eine-ein\u2019s four-case grids as the learner\u2019s first real mountain — the drilling method priced honestly); the adjective\u2019s endings\u2019 avalanche (the strong-weak-mixed declension\u2019s three regimes — the book\u2019s hardest table priced with the mnemonic\u2019s craft); the plural\u2019s five families (the -e, -en, -er, -s and the umlaut\u2019s plurality); and the pronouns\u2019 cases (the er-sie-es\u2019s gender\u2019s agreement with the noun\u2019s, not the referent\u2019s).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gender\u2019s Logic',
      'The Four Cases\u2019 Engine',
      'The Articles\u2019 Mountain and the Adjective\u2019s Avalanche',
      'The Plural\u2019s Five Families',
      'Nominative, Accusative and Dative Cases',
      'The Genitive and Case Combinations',
      'Word Order and the Verbal Bracket',
      'The Subjunctive and Konjunktiv Register',
      'Prepositions with Fixed Cases',
      '(The weather / change). Look at those clouds',
      'Ausklammerung: placing elements after the end of the verbal bracket',
      'Where required, the plural of a noun is indicated within brackets after the noun, e.g. das Lager (-), i.e. die Lager; der Hut (\'e), i.e. die Hüte, etc. (-en, -en) or (-n, -n) indicate a weak masculine noun, e.g der Mensch, des Menschen, die Menschen (see 1.3.2)'
    ],
  },
  {
    number: 3,
    slug: 'verb-core',
    title: 'The Verb Core',
    summary:
      'The verb\u2019s engine: the regular\u2019s conjugation (the -e, -st, -t, -en, -t, -en pattern as the first table); the strong verbs\u2019 ablaut (the vowel\u2019s music — the trinken-trank-getrunken family\u2019s census with the learn-to-love method; the sein\u2019s treasury — the bin-bist-ist war; the haben\u2019s regular-irregular hybrid; the werden\u2019s three duties); the modals\u2019 bracket (the können, müssen, wollen, dürfen, sollen, mögen\u2019s engine with the sentence\u2019s verb-to-the-end displacement — the modal-plus-infinitive\u2019s bracket as the German\u2019s signature architecture); the separable prefixes (the aufstehen\u2019s auf-prefix\u2019s separation — the sentence\u2019s bracket\u2019s second surprise; the telephone\u2019s anrufen craft); the inseparable prefixes (the verstehen\u2019s through-meaning priced); the reflexive\u2019s mirror (the sich freuen\u2019s craft with the dative and accusative\u2019s mirrors); and the imperative\u2019s three (the informal singular\u2019s -e, the informal plural\u2019s -t, the formal\u2019s Sie\u2019s capital politeness).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Regular and the Strong Ablaut',
      'The Modals\u2019 Bracket',
      'The Separable Prefixes',
      'The Reflexive and the Imperative',
      'Regular formation of the comparative and superlative',
      'Regular formation of comparative and superlative',
      'Sentences used for illustration which are ungrammatical in German are indicated by an asterisk, e.g. *Jedoch dann ist er nicht gekommen',
      'Sg., sing. singular'
    ],
  },
  {
    number: 4,
    slug: 'word-order-law',
    title: 'The Word Order\u2019s Law',
    summary:
      'The sentence\u2019s architecture: the verb-second regime (the main clause\u2019s law — the inversion\u2019s discipline: whatever comes first, the verb\u2019s second slot; the question\u2019s V1 register and the yes-no\u2019s intonation); the verb-final regime (the subordinate clause\u2019s tail-park — the weil and dass\u2019s clauses with the verb\u2019s final position; the verb\u2019s climb-back craft as the learner\u2019s own drill); the bracket\u2019s architecture (the three brackets\u2019 census — the modal\u2019s, the separable\u2019s and the subordinate\u2019s; the Satzklammer as the frame\u2019s name); the position\u2019s fields (the Vorfeld\u2019s one-slot discipline, the Mittelfeld\u2019s flexible middle, the Nachfeld\u2019s relative clauses); and the conjunctions\u2019 census (the coordinating\u2019s und-aber-oder with the position\u2019s neutrality; the subordinating\u2019s weil-dass-wenn-ob family with the tail-park\u2019s trigger; the adverbial conjunctions\u2019s sobald-register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Verb-Second Regime',
      'The Verb-Final Tail-Park',
      'The Three Brackets',
      'The Conjunctions\u2019 Census',
      'A great time and doesn’t want to come back',
      'K Ger kommen, Engl come m Ger mich, Engl mine'
    ],
  },
  {
    number: 5,
    slug: 'perfect-engine',
    title: 'The Perfect Engine',
    summary:
      'The past\u2019s craft: the Perfekt\u2019s choice (the haben\u2019s default and the sein\u2019s motion-and-change rule — the gegangen and geblieben sein verbs with the fliegen\u2019s famous ambiguity priced); the participle\u2019s formation (the ge-prefix\u2019s placement with the inseparable\u2019s exemption and the -ieren verbs\u2019 native exemption — the studiert\u2019s no-ge surprise); the Präteritum\u2019s written register (the sein and haben\u2019s Präteritum monopoly in speech — the war and hatte\u2019s spoken craft; the written narrative\u2019s war while the Perfekt\u2019s spoken — the register\u2019s division priced honestly); the Plusquamperfekt\u2019s before-past (the past-before-past\u2019s craft at the survey depth); the future\u2019s werden (the werden-plus-infinitive\u2019s prediction with the present\u2019s default as the German\u2019s own economy); and the Konjunktiv II\u2019s politeness (the hätte and wäre\u2019s register — the polite request\u2019s engine priced as the first subjunctive\u2019s meet).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Haben-Sein Choice',
      'The Participle\u2019s Formation',
      'The Präteritum\u2019s Register Division',
      'The Future and the Polite Konjunktiv',
    ],
  },
  {
    number: 6,
    slug: 'everyday-situations',
    title: 'The Everyday Situations',
    summary:
      'The Menschen arc\u2019s situations: the greetings and introductions (the Guten Tag\u2019s register and the Sie\u2019s formal default with the du\u2019s informal contract — the friendship\u2019s ritual priced as the social grammar); the person and the family (the ich heiße\u2019s introduction craft, the family\u2019s vocabulary with the possessive\u2019s mein-dein-ihre agreement); the shopping and the money (the wie viel\u2019s price craft and the ein-kilo register; the ein-kaufen\u2019s verb\u2019s separable craft); the appointments and the time (the Uhrzeit\u2019s official arithmetic — the vierzehn Uhr\u2019s twenty-four-hour discipline; the am Montag\u2019s days and the im Januar\u2019s months with the case\u2019s price); the directions and the city (the links-rechts-geradeaus\u2019s compass; the nach and in\u2019s direction\u2019s case-choice — the in\u2019s accusative of motion priced as the case\u2019s own trap); the food and the restaurant (the bestellen\u2019s ordering craft and the es ist sehr lecker\u2019s compliment); and the phone and the appointment\u2019s craft (the appointment\u2019s making with the am\u2019s time-register and the cancelling\u2019s polite Konjunktiv).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greetings and the Sie Contract',
      'The Shopping and the Time',
      'The Directions and the Case Trap',
      'The Restaurant and the Phone',
      '第3課 デートの約束 Making a Date'
    ],
  },
  {
    number: 7,
    slug: 'vocabulary-craft',
    title: 'The Vocabulary\u2019s Craft',
    summary:
      'The word-hoard\u2019s German method: the thematic families\u2019 census (the home, the food, the city, the work, the free-time\u2019s families with the frequency-ranked core — the first thousand\u2019s honest arithmetic); the compounds\u2019 delight (the German\u2019s compounding genius — the Handschuh\u2019s hand-shoe and the Fernweh\u2019s far-ache\u2019s poetry; the compound\u2019s stress and the gender\u2019s last-word rule; the Donaudampfschifffahrtsgesellschaftskapitän priced as the language\u2019s own joke-and-wonder); the word formation\u2019s prefixes (the un-miss-and-ur families; the -ung, -heit, -keit\u2019s noun-makers and the -lich and -isch\u2019s adjective-makers); the false friends\u2019 census (the also-not-also and the bald-not-bald, the Gift\u2019s poison and the Chef\u2019s boss — the English-German traps\u2019 frequency-ranked register); the English\u2019s German loans (the kindergarten, the angst, the wanderlust — the bridge\u2019s own register priced); and the dictionary\u2019s craft (the bilingual-to-monolingual\u2019s turn as the milestone; the gender\u2019s dictionary-hunting method).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Thematic Families',
      'The Compounds\u2019 Delight',
      'The False Friends\u2019 Census',
      'The Dictionary\u2019s Craft',
      'Schließlich',
      '第11課 友だち募集 Looking for Friends'
    ],
  },
  {
    number: 8,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the graded texts from the Menschen\u2019s profiles to the first real short texts; the Feuilleton\u2019s register named as the horizon); the writing\u2019s forms (the postcard\u2019s craft — the Reisebericht\u2019s frame with the Perfekt\u2019s narrative; the email\u2019s formal and informal registers — the Sehr geehrte\u2019s capitalised politeness and the Liebe\u2019s informal open with the Gruß\u2019s close); the message and the note\u2019s frames (the Entschuldigung\u2019s apology and the Einladung\u2019s invitation); the A1\u2019s can-dos priced (the self-introduction\u2019s writing, the form-filling\u2019s craft — the Anmeldeformular\u2019s real register; the short message\u2019s everyday competence); and the writing\u2019s discipline (the comma\u2019s German law — the subordinate clause\u2019s comma as the learner\u2019s own first grammar; the orthography\u2019s ß-vs-ss rules applied).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reading Ladder',
      'The Postcard and the Email',
      'The A1\u2019s Can-Dos Priced',
      'The Writing\u2019s Discipline',
    ],
  },
  {
    number: 9,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s craft: the listening\u2019s drill (the dialogues at the A1\u2019s clear-and-slow register first — the Menschen\u2019s audio register; the number\u2019s listening traps — the zwei-drei\u2019s quick pairs and the telefonnummer\u2019s dictation craft; the announcement\u2019s register — the Bahnhof\u2019s Gleis announcements as the German\u2019s own music); the speaking\u2019s register (the pair-work\u2019s frames — the asking-and-answering\u2019s situations; the small talk\u2019s German craft — the weather\u2019s universal opener priced); the pronunciation\u2019s polish (the umlaut\u2019s drill at the sentence\u2019s speed; the r\u2019s two registers — the front and the throat\u2019s; the ch\u2019s ich and ach\u2019s discipline; the word-final devoicing\u2019s Tag-as-tak trap priced); and the fluency\u2019s craft (the fillers\u2019 honest use — also and also; the paraphrase\u2019s escape — the wie sagt man register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Listening Drill',
      'The Small Talk\u2019s Craft',
      'The Pronunciation\u2019s Polish',
      'The Fluency\u2019s Craft',
    ],
  },
  {
    number: 10,
    slug: 'goethe-doorstep',
    title: 'The Goethe Doorstep',
    summary:
      'The register\u2019s close: the Goethe-Zertifikat\u2019s map (the A1-C2 ladder\u2019s own home — the SD1 and the A1\u2019s Start Deutsch family; the A2 and B1\u2019s formats with the four skills\u2019 parts; the B2-C2\u2019s Zertifikat family named); the A1\u2019s target (the listening\u2019s short dialogues, the reading\u2019s short texts, the writing\u2019s form and message, the speaking\u2019s two parts — the introduction-and-questions and the ask-and-respond pair-work; the strategy\u2019s honest register: the A1 is a knowledge-of-the-basics exam — the first five chapters of this book in the exam\u2019s form); the A2\u2019s step and the B1\u2019s horizon (the B1\u2019s independence — the can-do\u2019s promise: the work-and-travel register, the friendship\u2019s contract, the first real conversation); the exam\u2019s craft (the time\u2019s arithmetic and the mock\u2019s cycle; the Goethe\u2019s practice materials named); and the doorstep — the Hammer grammar as the depth\u2019s reference, the immersion\u2019s sea (the news and the songs\u2019s register priced as the fluency\u2019s food), and the reader\u2019s first dream: the first real German conversation in a German street.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The A1-C2 Ladder\u2019s Map',
      'The A1\u2019s Target and the A2\u2019s Step',
      'The B1\u2019s Independence',
      'The Doorstep: The First Real Conversation',
    ],
  },
]

export const german: Book = {
  id: 'german',
  title: 'German',
  subtitle: 'The case-and-cascade engine — from the first Umlaut to the B1\u2019s confident Germany',
  discipline: 'languages',
  level: 'Absolute beginner → Goethe-Zertifikat A1-A2 confident, B1 in reach (the CEFR ladder\u2019s own home language)',
  description: 'German as a complete course on the CEFR\u2019s own home ground (the Goethe-Institut\u2019s A1-C2 ladder as the book\u2019s spine — the levels\u2019 can-do descriptors read and priced). The sounds first (the umlauts\u2019 fronting craft, the ch and z\u2019s fricative surprise, the sharp-s\u2019s ß, the stress\u2019s variable discipline); the nominal core (the gender\u2019s logic and its honest exceptions, the four cases\u2019 full engine — the nominative\u2019s subject, the accusative\u2019s object and the motion\u2019s direction, the dative\u2019s indirect and the position\u2019s location, the genitive\u2019s possession; the articles\u2019 der-die-das table as the learner\u2019s first mountain); the verb\u2019s core (the regular and the strong verbs\u2019 ablaut — the singen-sang-gesungen family\u2019s music, the sein and haben\u2019s treasuries, the separable prefixes\u2019s telephoning surprise, the modals\u2019 sentence-bracket engine); the word order\u2019s law (the verb-second and the verb-final\u2019s two regimes — the clause\u2019s tail-park as the language\u2019s own discipline); the perfect engine (the Perfekt\u2019s haben-sein choice with the motion\u2019s rule, the Präteritum\u2019s written register); the everyday situations (the Menschen arc\u2019s lessons — the greetings, the introductions, the shopping and the appointments, the directions and the time\u2019s arithmetic); the vocabulary\u2019s craft (the thematic families, the compounds\u2019 delight — the Donaudampfschifffahrtsgesellschaftskapitän\u2019s craft priced, the false friends\u2019 English-German census); the reading and writing (the profiles and the postcards, the emails\u2019 frames, the A1\u2019s can-dos); the listening and speaking (the dialogues\u2019 drill, the pair-work\u2019s registers, the pronunciation\u2019s polish); the exam door (the Goethe-Zertifikat A1\u2019s parts, the A2\u2019s step, the B1\u2019s horizon with the strategies); and the doorstep. Cross-references the shelf\u2019s english book (the Germanic sibling) and hands off to the reader\u2019s first Kafka-in-the-original ambition.',
  status: 'planned',
  accent: ['#111827', '#1f2937'],
  chapters,
}
