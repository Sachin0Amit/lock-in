import type { Book, Chapter } from '../../../types'

/**
 * Italian — the thirteenth book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 38 planned lessons, zero written. Lesson ids will use the `ita-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Italian owns the Italian register (the standard line with the dialects’ honest map named — the Tuscan’s standard, the Neapolitan’s and the Venet’s named as the living heritage). The spanish and french books own the sibling bridges (the Romance family’s shared craft cross-referenced — the article’s contractions’ and the past’s divisions’ family resemblance named in each); the english book owns the Renaissance-loan bridge’s other end (the balcony’s and opera’s treasury priced at both doorsteps); the Art History book’s Italian register cross-references the Renaissance’s vocabulary’s home.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Practice Makes Perfect: Complete Italian Grammar (McGraw-Hill — the contents read this pass: Nouns and Titles; More About Nouns; Articles; Adjectives; Pronouns; Demonstratives — the full practical grammar's register) as the grammar pole.
 * - The Complete Italian All-in-One composite named (the McGraw-Hill six-in-one register) as the comprehensive pole; the Nuovo Espresso and the Italian Project registers named as the European course poles.
 * - The exam registers named (the CILS and CELI university registers named honestly with the CEFR-style pricing — no single JLPT-style world exam claimed).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'sounds-and-script',
    title: 'The Sounds and the Song',
    summary:
      'The mouth\u2019s Italian craft: the seven vowels\u2019 open music (the a-e-i-o-u\u2019s purity with the e and o\u2019s open-closed pairs — the pesca\u2019s peach-and-fishing pair priced as the vowel\u2019s own riddle; the sung register as the learner\u2019s own luck priced honestly); the double consonants\u2019 gemination (the caro\u2019s dear against the carro\u2019s cart\u2019s length trap — the geminate\u2019s hold drilled as the first trophy with the double letters\u2019 orthography); the palatal treasures (the gli\u2019s \u2019ly\u2019 in the figlio\u2019s family and the gn\u2019s \u2019ny\u2019 in the gnocchi\u2019s craft — the Romance\u2019s shared treasures priced); the r\u2019s craft (the tap\u2019s rolling with the single-tongue\u2019s Italian register against the Spanish\u2019s trill named); the z\u2019s two voices (the ts and dz pairs — the pizza\u2019s and zio\u2019s registers); and the h\u2019s silence (the ho\u2019s \u2019I have\u2019 with the casa\u2019s vs c\u2019è\u2019s craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Seven Vowels\u2019 Open Music',
      'The Double Consonants\u2019 Gemination',
      'The Palatal Treasures and the R',
      'The Z\u2019s Two Voices and the H\u2019s Silence',
    ],
  },
  {
    number: 2,
    slug: 'nominal-core',
    title: 'The Nominal Core',
    summary:
      'The noun\u2019s engine: the gender\u2019s patterns (the -o masculine and -a feminine families with the -e third family\u2019s plural-only trap — the problema\u2019s Greek neuter\u2019s masculine register priced); the plural\u2019s formation (the -o-to-i and -a-to-e families with the -e-to-i\u2019s third way and the accent\u2019s invariance — the città\u2019s museum of uninflected nouns priced); the articles\u2019 engine (the il-lo-la-i-gli-le\u2019s families with the l\u2019 and the gli\u2019s pre-consonantal craft — the lo\u2019s before the z, ps, gn and s+consonant\u2019s rule priced honestly); the prepositional contractions\u2019 celebrated art (the a + il\u2019s al, di + il\u2019s del, in + il\u2019s nel, su + il\u2019s sul — the fused families as the Italian\u2019s own signature economy with the art\u2019s title register — the Alla rondine\u2019s craft priced); the adjectives\u2019 agreement (the four-ending\u2019s bello-bella\u2019s craft with the invariable -e stems); the bello and buono\u2019s prenominal mutations (the buon ragazzo\u2019s and bello\u2019s beautiful craft priced as the Italian\u2019s own poetry); and the possessive\u2019s craft (the mio-mia-miei-miei\u2019s agreement with the family members\u2019 article-drop\u2019s register — the mia madre\u2019s craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gender\u2019s Patterns and the Plural\u2019s Ways',
      'The Articles\u2019 Engine',
      'The Prepositional Contractions\u2019 Art',
      'The Possessive\u2019s Article-Drop',
    ],
  },
  {
    number: 3,
    slug: 'verb-engine',
    title: 'The Verb Engine',
    summary:
      'The verb\u2019s machine: the present\u2019s three families (the -are\u2019s parlare with the -ere\u2019s prendere and the -ire\u2019s two classes — the dormire\u2019s and the finire\u2019s isc-infix\u2019s third-conjugation surprise: the fin-isc-o\u2019s \u2019s\u2019 inserted as the -ire family\u2019s split priced); the irregular canon (the essere\u2019s sono-sei-è treasury and the avere\u2019s ho-hai-ha\u2019s silent h; the andare\u2019s vado and the fare\u2019s faccio\u2019s craft); the passato prossimo\u2019s machine (the avere\u2019s default with the essere\u2019s motion-and-reflexive choice — the andato\u2019s agreement\u2019s surprise with the participle\u2019s gender craft); the imperfetto\u2019s craft (the -avo-evo-ivo\u2019s rolling background with the one-form\u2019s simplicity); the two pasts\u2019 division (the prossimo\u2019s event against the imperfetto\u2019s background — the Romance\u2019s shared craft with the ho mangiato vs mangiavo\u2019s picture-frame); the reflexive\u2019s routine (the svegliarsi\u2019s waking craft with the essere\u2019s auxiliary\u2019s reflexive rule); the informal commands\u2019 craft (the -a, -i, -e\u2019s three-family commands with the formal\u2019s Lei\u2019s politeness); and the piacere\u2019s back-to-front (the mi piace\u2019s pleasure engine as the Spanish gustar\u2019s sibling — the like\u2019s inversion priced as the first smile).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Present\u2019s Three Families and the isc Surprise',
      'The Passato Prossimo\u2019s Machine',
      'The Imperfetto and the Two Pasts\u2019 Division',
      'The Reflexive and the Piacere\u2019s Inversion',
      'The washing machine has been repaired. (It / work) now'
    ],
  },
  {
    number: 4,
    slug: 'everyday-situations',
    title: 'The Everyday Situations',
    summary:
      'The course\u2019s situations: the greetings and the introductions (the buongiorno\u2019s register with the come sta\u2019s formal and the come stai\u2019s informal contract — the tu-Lei\u2019s social grammar priced); the caffè\u2019s culture (the un caffè per favore\u2019s craft with the espresso\u2019s standing-bar culture priced as the culture\u2019s own grammar — the al banco\u2019s register and the cornetto\u2019s morning craft); the introductions (il mio nome è\u2019s craft with the piacere\u2019s pleasure-shake\u2019s register); the family and the home (la famiglia\u2019s census with the possessive\u2019s article-drop revisited); the directions and the city (the a destra and dritto\u2019s compass with the duomo\u2019s and piazza\u2019s city register); the shopping and the numbers (the quanto costa\u2019s craft with the numbers\u2019 arithmetic); the food and the restaurant (il conto per favore\u2019s register with the Italian meal\u2019s structure — the antipasto-primo-secondo-dolce\u2019s sequence priced as the culture\u2019s own grammar); and the travel\u2019s Italian map (the Italy\u2019s regions and the Swiss\u2019s and San Marino\u2019s corners named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greetings and the Tu-Lei Contract',
      'The Caffè\u2019s Culture',
      'The Directions and the Piazza',
      'The Meal\u2019s Sequence as Grammar',
    ],
  },
  {
    number: 5,
    slug: 'vocabulary-craft',
    title: 'The Vocabulary\u2019s Craft',
    summary:
      'The word-hoard\u2019s Italian method: the cognate\u2019s enormous bridge (the Renaissance\u2019s loan treasury — the balcony\u2019s and studio\u2019s, umbrella\u2019s and gala\u2019s thousands priced honestly as the English speaker\u2019s biggest head start with the -zione to -tion and -tà to -ty families\u2019 map); the false friends\u2019 census (the currently-not-currently\u2019s trap, the sensibile\u2019s sensitive register, the camera\u2019s room-not-camera with the frequency-ranked craft); the musical vocabulary\u2019s own register (the opera\u2019s, piano\u2019s, soprano\u2019s and allegro\u2019s Italian citizenship priced as the music\u2019s own language — the Art History book\u2019s Renaissance register cross-referenced); the word formation\u2019s families (the -zione, -tà and -mente\u2019s Romance siblings with the diminutive\u2019s -ino-etta\u2019s affectionate craft priced as the Italian\u2019s own warmth); the idioms\u2019s first set (the non vedo l\u2019ora\u2019s can\u2019t-wait and the in bocca al lupo\u2019s good-luck\u2019s wolf register priced kindly); and the dictionary\u2019s craft (the bilingual-to-monolingual\u2019s turn with the Zingarelli named as the milestone).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Renaissance\u2019s Enormous Bridge',
      'The False Friends\u2019 Census',
      'The Musical Vocabulary\u2019s Own Register',
      'The Diminutive\u2019s Warmth and the Idioms',
    ],
  },
  {
    number: 6,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the graded texts to the first real short texts — the Pinocchio\u2019s opening as the traditional first book priced as the children\u2019s classic\u2019s door); the writing\u2019s forms (the message\u2019s SMS and email frames with the ciao\u2019s casual and the gentile\u2019s formal registers — the un bacio\u2019s kiss-close\u2019s informal register priced kindly); the letter\u2019s formal frame (il/la gentile signor(a)\u2019s open with the cordiali saluti\u2019s close); the A1-A2 can-dos priced (the self-introduction\u2019s writing, the postcard\u2019s holiday frame, the form\u2019s filling); the orthography\u2019s discipline (the double consonant\u2019s spelling trap with the accent\u2019s mandatory final — la città\u2019s and però\u2019s craft priced as the orthography\u2019s honest traps); and the first real texts (the children\u2019s tales and the Calvino\u2019s simplest tales priced as the first literature — the Dante\u2019s far door named with the honest humour).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reading Ladder and the Pinocchio Door',
      'The Message and Letter\u2019s Frames',
      'The A1-A2 Can-Dos',
      'The First Real Texts and the Far Door',
    ],
  },
  {
    number: 7,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s craft: the listening\u2019s drill (the dialogues at the A1\u2019s clear register; the operatic diction\u2019s craft named as the sung Italian\u2019s gift — the recitative\u2019s clear vowels as the learner\u2019s own listening sea priced kindly); the speaking\u2019s register (the pair-work\u2019s frames with the conversation\u2019s openers — the che bella giornata\u2019s weather register priced as the universal opener); the pronunciation\u2019s polish (the geminate\u2019s hold at the sentence\u2019s speed; the vowel\u2019s open purity against the English\u2019s diphthong glides; the r\u2019s tap\u2019s trophy); the fluency\u2019s craft (the fillers\u2019 honest use — the allora\u2019s all-then register priced as the Italian\u2019s own discourse\u2019s glue); and the immersion\u2019s sea (the songs\u2019 and the opera\u2019s register as the fluency\u2019s food — the Pavarotti\u2019s slow diction as the learner\u2019s own gift named kindly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Listening Drill and the Operatic Gift',
      'The Pronunciation\u2019s Polish',
      'The Allora\u2019s Discourse Glue',
      'The Immersion\u2019s Sea',
    ],
  },
  {
    number: 8,
    slug: 'grammar-depth',
    title: 'The Grammar\u2019s Depth',
    summary:
      'The engine\u2019s second floor: the object pronouns\u2019 craft (the mi-ti-lo-la\u2019s placement before the verb with the lo and la\u2019s elision — l\u2019amo\u2019s craft; the indirect\u2019s mi ti gli le\u2019s register); the two pronouns\u2019 combination (the te lo do\u2019s craft with the combined order\u2019s rule priced); the imperative\u2019s informal and formal (the tu\u2019s -a and the Lei\u2019s -i\u2019s cross-polarity surprise priced as the politeness\u2019s own puzzle); the ci and ne\u2019s twin engines (the ci vado\u2019s there-craft and the ne voglio\u2019s of-it engine as the Italian\u2019s own little pronouns); the subjunctive\u2019s first steps (the penso che sia\u2019s opinion engine with the che-sia\u2019s craft — the Romance\u2019s shared mood priced at the first steps); the past participle\u2019s agreement (the sono andata\u2019s feminine craft with the participle\u2019s gender register); and the trap\u2019s honest census (the plywood\u2019s most-common learner traps ranked and drilled — the article\u2019s choice, the participle\u2019s agreement and the preposition\u2019s contraction).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Object Pronouns\u2019 Craft',
      'The Ci and Ne\u2019s Twin Engines',
      'The Subjunctive\u2019s First Steps',
      'The Most-Common Traps Ranked',
    ],
  },
  {
    number: 9,
    slug: 'cils-doorstep',
    title: 'The CILS Doorstep',
    summary:
      'The register\u2019s close: the proficiency\u2019s map priced honestly (the CILS\u2019s Siena register and the CELI\u2019s Perugia register named with the CEFR\u2019s pricing — the A1-A2\u2019s and B1\u2019s levels\u2019 ladder; no single JLPT-style world exam claimed — the honest note); the A2\u2019s target (the everyday conversation\u2019s comfort with the first real reading\u2019s craft); the B1\u2019s horizon named (the independence\u2019s promise — the travel, the opinion and the first argument\u2019s craft); the PLIDA\u2019s third register named; the exam\u2019s craft (the mock\u2019s cycle with the honest diagnosis; the speaking\u2019s interview register); and the doorstep — the immersion\u2019s sea (the opera\u2019s and the cinema\u2019s register as the fluency\u2019s food), the Art History book\u2019s cross-reference (the Renaissance\u2019s vocabulary\u2019s home), and the reader\u2019s first dream: the first real Florence conversation with the barista\u2019s patience, and the Dante\u2019s far door now honestly on the horizon.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The CILS and CELI\u2019s Map',
      'The A2\u2019s Target',
      'The B1\u2019s Horizon Named',
      'The Doorstep: The Florence Barista',
      'Paul and Sarah have had an argument and now (they / speak)'
    ],
  },
]

export const italian: Book = {
  id: 'italian',
  title: 'Italian',
  subtitle: 'The language of song — la dolce grammatica from the first vowel to the first opera',
  discipline: 'languages',
  level: 'Absolute beginner → the elementary register (CEFR-style A1-A2, CILS/CELI named)',
  description: 'Italian as a complete course with the sung-vowel honesty priced up front (the seven vowels\u2019 open music — the language\u2019s own operatic register as the learner\u2019s luck). The sounds first (the pure vowels\u2019 discipline, the double consonants\u2019 gemination craft — the caro against carro\u2019s length trap, the r\u2019s tap, the gli and gn\u2019s palatal treasures); the nominal core (the gender\u2019s patterns with the plural\u2019s formation, the articles\u2019 engine — the il-lo-la and the prepositional contractions\u2019 celebrated art: the alla, dello, nel families; the adjectives\u2019 agreement and the bello-buono\u2019s prenominal mutations); the verb engine (the present\u2019s three families — the -are, -ere, -ire with the isc-infix\u2019s third-conjugation surprise; the irregular canon — the essere, avere, andare, fare; the passato prossimo\u2019s craft with the avere-essere choice and the participle\u2019s agreement); the everyday situations (the greetings, the introductions, the caffè\u2019s culture — the espresso\u2019s register as the culture\u2019s own grammar, the directions and the travel with the Italian world\u2019s map); the vocabulary\u2019s craft (the cognate\u2019s enormous bridge to English — the Renaissance\u2019s loan treasury, the false friends\u2019 census, the musical vocabulary\u2019s own register); the reading and writing (the graded texts, the messages\u2019 frames, the A1-A2 can-dos); the listening and speaking (the dialogues\u2019 drill, the pronunciation\u2019s polish, the operatic diction\u2019s craft); the grammar\u2019s depth (the imperfetto against the passato prossimo\u2019s division, the object pronouns\u2019 craft, the subjunctive\u2019s first steps); and the doorstep (the CILS and CELI registers named honestly with the CEFR pricing). Cross-references the spanish and french books (the sibling bridges) and hands off to the reader\u2019s first Dante-with-a-dictionary ambition.',
  status: 'planned',
  accent: ['#be185d', '#831843'],
  chapters,
}
