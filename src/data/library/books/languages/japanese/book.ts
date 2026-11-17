import type { Book, Chapter } from '../../../types'

/**
 * Japanese — the fourth book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 61 planned lessons, zero written. Lesson ids will use the `jpn-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Japanese owns the Japanese register (the standard Tokyo line and its registers). Mandarin owns the kanji’s parent world (the shared han world priced honestly at both doorsteps — the readings’ divergence named, no duplication of the teaching); the Cultural Studies book’s media register cross-references for the anime and manga immersion craft; the Languages shelf’s english book owns the loanword’s English side (the katakana’s English loans cross-referenced); the JLPT register is this book’s exam spine.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GENKI: An Integrated Course in Elementary Japanese 3e (the official intro page read this pass — 23 lessons in two volumes: Vol 1 Lessons 1-12, Vol 2 Lessons 13-23, each with the textbook-workbook pair) — genki3.japantimes.co.jp as the course spine.
 * - The JLPT official registers (read this pass — jlpt.jp: the five levels N1-N5 with N3 as the bridging level; the test-sections page's Language Knowledge (Vocabulary), Language Knowledge (Grammar)/Reading, Listening structure with the per-level times) as the exam spine.
 * - The kanji census named (the ~100 N5 / ~300 N4 cumulative registers priced against the official syllabus's vocabulary component); the Tobira and the Intermediate Japanese registers named as the post-Genki ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'sounds-scripts',
    title: 'The Sounds and the Scripts',
    summary:
      'The language\u2019s own map priced honestly first: the three scripts\u2019 division of labour (the hiragana as the native grammar\u2019s home, the katakana as the loanwords\u2019 register, the kanji as the content words\u2019 treasury — the sentence\u2019s mixed writing demonstrated on one real sentence); the sounds (the five-vowel system\u2019s purity against English\u2019s diphthongs; the mora\u2019s rhythm — the same-length syllable beats with the haiku\u2019s discipline priced; the pitch accent\u2019s register named with the hashi\u2019s famous pun — the chopstick and the bridge); and the romanisation\u2019s crutch priced (the Hepburn system as the learner\u2019s first weeks\u2019 map, retired honestly at the first hiragana fluency).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Scripts\u2019 Division',
      'The Mora\u2019s Rhythm and the Pitch',
      'The Romanisation\u2019s Crutch',
      'The First Weeks\u2019 Plan',
    ],
  },
  {
    number: 2,
    slug: 'hiragana-craft',
    title: 'The Hiragana Craft',
    summary:
      'The first script earned: the full forty-six census (the five vowels and the ka-sa-ta-na-ha-ma-ya-ra-wa-n rows with the reading\u2019s drill method — the mnemonics\u2019 craft and the writing\u2019s stroke discipline); the dakuten and handakuten\u2019s voiced turn (the ga, za, da, ba, pa families); the small ya-yu-yo\u2019s combinations (the kya, sha, cha, nya families — the glides\u2019 census); the double consonant\u2019s sokuon (the small tsu\u2019s hold — the kitta and kita\u2019s difference drilled); the long vowel\u2019s discipline (the o-u and o-o\u2019s spelling families); and the first reading weeks (the words-only texts — the reading\u2019s fluency measured with the drill\u2019s honest clock).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Forty-Six Census',
      'The Dakuten and the Combinations',
      'The Sokuon and the Long Vowels',
      'The First Reading Weeks',
    ],
  },
  {
    number: 3,
    slug: 'katakana-craft',
    title: 'The Katakana Craft',
    summary:
      'The second script earned: the full census with the hiragana\u2019s pairing drill (the similar pairs\u2019 discrimination — the tsu and the shi against the so and the n); the loanword\u2019s adaptation rules (the English vowel\u2019s mapping to the Japanese five — the herstrup\u2019s honest register; the final consonant\u2019s epenthetic vowel — the koohii\u2019s coffee and the terebi\u2019s television; the long vowel\u2019s bar); the doubled consonants and the new combinations (the fa-vi-vu family for the modern loans); the onomatopoeia\u2019s register (the gion and gitaigo\u2019s sound-symbolic system priced as the language\u2019s own music — the pera pera\u2019s fluency and the shito shito\u2019s rain); and the loanword\u2019s reading practice (the menu and the station signs\u2019 real texts).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Census and the Pairing Drill',
      'The Loanword\u2019s Adaptation Rules',
      'The Onomatopoeia\u2019s Music',
      'The Real Signs\u2019 Reading',
      'CultureNote \u306b\u307b\u3093\u306e\u304a\u304b\u306d Japanese Currency',
      'CultureNote \u65e5\u672c\u306e\u5bb6 Japanese Houses',
      'CultureNote \u65e5\u672c\u306e\u796d\u308a Japanese Festivals',
      'Useful Expressions \u99c5\u3067 At the Station',
      'CultureNote \u65e5\u672c\u306e\u6c17\u5019 The Japanese Climate',
      'CultureNote \u65e5\u672c\u306e\u795d\u65e5 Japanese National Holidays',
    ],
  },
  {
    number: 4,
    slug: 'grammar-core',
    title: 'The Grammar Core',
    summary:
      'The sentence\u2019s engine: the particle\u2019s census (the wa topic\u2019s frame against the ga subject\u2019s focus — the famous contrast priced with the new-versus-old register\u2019s examples; the o direct object, the ni\u2019s time-direction-target\u2019s three duties, the de\u2019s location-of-action and means, the no\u2019s genitive and the na-adjective\u2019s link); the copula\u2019s desu (the positive-negative-questioning\u2019s table with the polite register\u2019s discipline); the X wa Y desu pattern\u2019s power (the identification\u2019s sentence as the first thousand utterances); the adjective\u2019s two classes (the i-adjective\u2019s conjugating surprise — the takai to takakunai\u2019s tense engine; the na-adjective\u2019s invariance with the desu\u2019s carrying); the demonstratives\u2019 ko-so-a-do system (the four-corner map with the near-far register); and the numbers and counters\u2019 introduction (the counters\u2019 system priced as the first big surprise — the ikko and the ippon\u2019s geometry).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Particle Census',
      'The Copula and the X wa Y desu',
      'The Adjective\u2019s Two Classes',
      'The Ko-So-A-Do Map',
      'Comparison among Three or More Items',
      'Noun1\u306enoun2',
    ],
  },
  {
    number: 5,
    slug: 'verb-system',
    title: 'The Verb System',
    summary:
      'The engine\u2019s core: the two classes (the godan\u2019s five-step and the ichidan\u2019s one-step — the dictionary form\u2019s anatomy and the class\u2019s recognition method); the masu-form\u2019s polite engine (the ~masu, ~mashita, ~masen, ~masen deshita table as the first conjugation\u2019s mountain); the te-form\u2019s gateway (the te-form\u2019s rules\u2019 table — the u-tsu-ru-tte rhythm\u2019s song; the te-form\u2019s families — the progressive\u2019s te imasu, the perfect\u2019s te arimasu, the requests\u2019 te kudasai, the permission\u2019s te mo ii, the prohibition\u2019s te wa ikemasen); the plain forms\u2019 census (the ta-form\u2019s past, the nai-form\u2019s negative, the dictionary form as the casual register\u2019s engine); the potential and volitional\u2019s first steps (the ~koto ga dekimasu\u2019s possibility and the ~mashou\u2019s invitation); the directions and the giving-receiving\u2019s gratitude engine (the ageru-kureru-morau\u2019s three-way gift grammar priced as the politeness\u2019 heart); and the counters\u2019 practice at depth (the hitori\u2019s people and the ikko\u2019s objects — the ichi-ni-san\u2019s counting discipline).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Classes and the Masu Engine',
      'The Te-Form\u2019s Gateway',
      'The Plain Forms\u2019 Census',
      'The Giving and the Counters',
      '\u6d3b\u7528\u8868 Conjugation Chart',
    ],
  },
  {
    number: 6,
    slug: 'kanji-foundations',
    title: 'The Kanji Craft',
    summary:
      'The third script\u2019s craft: the kanji\u2019s anatomy (the radicals\u2019 bushu as the dictionary\u2019s own index — the water and the hand\u2019s families; the stroke\u2019s order discipline — the left-to-right and top-to-bottom laws with the writing\u2019s craft); the readings\u2019 register (the on\u2019s Sino-Japanese and the kun\u2019s native reading — the same character\u2019s two voices; the compound\u2019s reading prediction\u2019s honest limits); the N5\u2019s hundred priced (the number, time, direction and the everyday\u2019s core characters with the drill\u2019s method — the flashcard\u2019s honest craft and the writing\u2019s muscle memory); the kanji\u2019s learning strategy (the radical\u2019s mnemonic and the story\u2019s method priced against the rote\u2019s honest record); and the computer\u2019s craft (the IME\u2019s input method — the typing\u2019s Japanese as the modern learner\u2019s own writing).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Radical\u2019s Anatomy',
      'The On and Kun\u2019s Two Voices',
      'The N5\u2019s Hundred',
      'The IME\u2019s Craft',
    ],
  },
  {
    number: 7,
    slug: 'everyday-conversations',
    title: 'The Everyday Conversations',
    summary:
      'The Genki arc\u2019s situations: the introductions (the hajimemashite\u2019s etiquette — the name card\u2019s register and the bowing grammar\u2019s craft); the class and the campus (the university\u2019s vocabulary — the gakusei and the sensei\u2019s register; the time and the timetable\u2019s arithmetic); the family and the home (the kazoku\u2019s census with the family terms\u2019 two registers — the humble and the honorific\u2019s first steps); the shopping and the numbers (the ikura\u2019s price\u2019s asking and the takai\u2019s bargaining register; the money\u2019s arithmetic); the directions and the travel (the doko\u2019s where — the station\u2019s and the map\u2019s register; the transportation\u2019s vocabulary); the food and the invitations (the tabemono\u2019s restaurant craft — the oishii\u2019s compliment and the gochisousama\u2019s gratitude; the ~mashou\u2019s invitation and the refusal\u2019s polite cushioning); and the phone and the email\u2019s register (the aisatsu\u2019s seasonal craft priced as the culture\u2019s own grammar).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Introductions\u2019 Etiquette',
      'The Campus and the Family',
      'The Shopping and the Directions',
      'The Invitations and the Aisatsu',
      'CultureNote \u3042\u3044\u3055\u3064\u3068\u304a\u3058\u304e Greetings and Bowing',
      'CultureNote \u5bb6\u65cf\u306e\u547c\u3073\u65b9 Kinship Terms',
      'CultureNote \u65e5\u672c\u306e\u98df\u3079\u7269 Foods in Japan',
      'CultureNote \u65e5\u672c\u306e\u4f1d\u7d71\u6587\u5316 Japanese Traditional Culture',
      'CultureNote \u65e5\u672c\u306e\u4ea4\u901a\u6a5f\u95a2 Public Transportation in Japan',
      '\u7b2c6\u8ab2 \u79c1\u306e\u3059\u304d\u306a\u30ec\u30b9\u30c8\u30e9\u30f3 My Favorite Restaurant',
      'Useful Expressions \u3058\u304b\u3093\u30fb\u3068\u3057 Time/Age',
      'Useful Expressions \u90f5\u4fbf\u5c40\u3067 At the Post Office',
      'Useful Expressions \u304d\u3087\u3046\u3057\u3064 In the Classroom',
      'Useful Expressions \u4f53\u306e\u90e8\u5206 Parts of the Body',
      'Useful Expressions \u8272 Colors',
      'Useful Expressions \u5065\u5eb7\u3068\u75c5\u6c17 Health and Illness',
      'CultureNote \u65e5\u672c\u306e\u6559\u80b2\u5236\u5ea6(1) Japan\'s Educational System (1)',
      '\u7b2c3\u8ab2 \u30c7\u30fc\u30c8\u306e\u7d04\u675f Making a Date',
      '\u7b2c8\u8ab2 \u30d0\u30fc\u30d9\u30ad\u30e5\u30fc Barbecue',
      '\u7b2c9\u8ab2 \u304b\u3076\u304d Kabuki',
      '\u7b2c3\u8ab2 \u307e\u3044\u306b\u3061\u306e\u305b\u3044\u304b\u3064 Daily Life',
      '\u7b2c10\u8ab2 \u51ac\u4f11\u307f\u306e\u4e88\u5b9a Winter Vacation Plans',
      '\u7b2c11\u8ab2 \u53cb\u3060\u3061\u52df\u96c6 Looking for Friends',
      '\u7b2c12\u8ab2 \u75c5\u6c17 Feeling Ill',
      '\u7b2c11\u8ab2 \u4f11\u307f\u306e\u3042\u3068 After the Vacation',
      '\u7b2c4\u8ab2 \u30e1\u30a2\u30ea\u30fc\u3055\u3093\u306e\u3057\u3085\u3046\u307e\u3064 Mary\'s Weekend',
    ],
  },
  {
    number: 8,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the mixed-script short texts — the furigana\u2019s help priced honestly as the training wheel; the diary and the message\u2019s genres; the manga\u2019s panels as the motivated reading — the Cultural Studies book\u2019s media register cross-referenced); the writing\u2019s craft (the short composition\u2019s three-genre drill — the self-introduction\u2019s soroshiritsu, the diary\u2019s nikki, the email\u2019s email-craft with the opening and closing\u2019s formulas); the kanji\u2019s writing drill (the N5\u2019s hundred written from the muscle\u2019s memory — the stroke count\u2019s discipline); the reading\u2019s fluency method (the chadoku\u2019s close reading and the sokudoku\u2019s speed — the drill\u2019s honest clock); and the first real texts (the children\u2019s stories — the momotaro\u2019s register and the folk tales as the first literature).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mixed-Script Ladder',
      'The Three-Genre Writing Drill',
      'The Fluency Method',
      'The First Real Texts',
      '\u7b2c9\u8ab2 \u30b9\u30fc\u3055\u3093\u306e\u65e5\u8a18 Sue\'s Diary',
      '\u7b2c5\u8ab2 \u6c96\u7e04\u65c5\u884c A Trip to Okinawa',
      '\u7b2c12\u8ab2 \u4e03\u5915 Tanabata Festival',
      '\u65e5\u672c\u5730\u56f3 Map of Japan',
      '\u7b2c6\u8ab2 \u30ed\u30d0\u30fc\u30c8\u3055\u3093\u306e\u4e00\u65e5 A Day in Robert\'s Life',
      '\u7b2c10\u8ab2 \u304b\u3055\u3058\u305e\u3046 The Folktale Kasajizo',
    ],
  },
  {
    number: 9,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s craft: the listening\u2019s drill (the dialogues at the N5\u2019s slow-and-clear register first; the shadowing\u2019s method — the same-audio\u2019s mimicry as the pronunciation\u2019s own gym; the dictation\u2019s drill with the particles\u2019 listening traps — the wa and ga\u2019s ear); the speaking\u2019s register (the politeness\u2019s two layers — the masu\u2019s formal and the plain\u2019s casual with the switching\u2019s social map; the uchi-soto\u2019s inside-outside frame priced as the politeness\u2019s own grammar); the pronunciation\u2019s polish (the mora\u2019s rhythm\u2019s drilling against the English\u2019s stress habits; the pitch accent\u2019s minimal pairs; the gaijin accent\u2019s honest pricing — the comprehensibility\u2019s standard, not the perfection\u2019s myth); and the conversation\u2019s strategies (the aizuchi\u2019s back-channeling as the listening\u2019s own etiquette — the hai and the sou desu ka\u2019s rhythm; the repair\u2019s craft — the mou ichido onegaishimasu\u2019s honest asking).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Listening Drill and the Shadowing',
      'The Politeness\u2019s Two Layers',
      'The Pronunciation\u2019s Polish',
      'The Conversation\u2019s Strategies',
    ],
  },
  {
    number: 10,
    slug: 'jlpt-doorstep',
    title: 'The JLPT Doorstep',
    summary:
      'The register\u2019s close: the JLPT\u2019s map (the five levels\u2019 ladder — the N5\u2019s beginner, the N4\u2019s elementary, the N3\u2019s bridge to the N2-N1\u2019s working levels; the three test sections\u2019 format — the Language Knowledge\u2019s vocabulary and grammar, the Reading\u2019s passages, the Listening\u2019s sections with the per-level times read from the official register); the N5\u2019s target census (the vocabulary\u2019s ~800 words, the kanji\u2019s ~100, the grammar\u2019s core patterns — the syllabus\u2019s five components: tasks, topics, vocabulary, grammar and characters honoured); the N4\u2019s step (the vocabulary\u2019s ~1500, the kanji\u2019s ~300 — the cumulative register priced); the test\u2019s craft (the multiple-choice\u2019s discipline — the answer sheet\u2019s method and the time\u2019s arithmetic; the mock test\u2019s cycle with the honest diagnosis); the listening\u2019s drilling method (the past-paper\u2019s register and the JLPT-specific\u2019s traps); and the doorstep — the N3\u2019s bridge named as the next rung, the immersion\u2019s sea (the anime and the news\u2019s register priced as the fluency\u2019s own food), and the reader\u2019s first dream: the anime without the subtitles.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Five Levels\u2019 Ladder',
      'The N5 and N4 Censuses',
      'The Test\u2019s Craft',
      'The Doorstep: No Subtitles',
    ],
  },
]

export const japanese: Book = {
  id: 'japanese',
  title: 'Japanese',
  subtitle: 'Three scripts, one culture — from hiragana to the N4 register and the first real conversations',
  discipline: 'languages',
  level: 'Absolute beginner → JLPT N5 confident, N4 in reach (the CEFR-style A1-A2 equivalences priced honestly)',
  description: 'Japanese as a complete course with the script\u2019s honest map priced up front (the three scripts\u2019 division of labour — hiragana as the native engine, katakana as the loanword\u2019s home, kanji as the Sino-vocabulary\u2019s treasury; the Genki arc\u2019s own pacing as the spine). The sounds first (the mora\u2019s rhythm — the syllable-timed discipline against the stress-timed English; the pitch accent\u2019s register named; the romanisation\u2019s crutch priced); the hiragana craft (the full census with the dakuten and the ya-row combinations — the reading\u2019s first weeks); the katakana craft (the loanword\u2019s adaptation rules — the long vowels and the doubled consonants, the coffee and computer\u2019s Japanese citizenship); the grammar core (the particle\u2019s engine — the wa, ga, o, ni, de, no census as the sentence\u2019s glue; the copula\u2019s desu; the adjective\u2019s i- and na-classes with the conjugating surprise of the i-class); the verb\u2019s system (the godan-ichidan classes, the masu-form\u2019s polite engine, the te-form\u2019s gateway to the whole progressive-perfect-requests family, the plain forms and the casual register); the kanji\u2019s craft (the radicals, the stroke\u2019s order discipline, the on and kun readings\u2019 register, the N5\u2019s hundred priced); the everyday conversations (the Genki lesson situations — the introductions, the classes, the family, the shopping, the invitations; the honorific register\u2019s first steps — the bowing grammar and the aisatsu\u2019s etiquette); the reading and writing (the short texts, the diary, the emails); the exam door (the JLPT\u2019s five levels and the three test sections — the N5\u2019s target and the N4\u2019s step with the kanji and vocabulary censuses; the listening\u2019s drilling method); and the doorstep. Cross-references Mandarin (the shared han world priced honestly) and hands off to the reader\u2019s first anime-without-subtitles ambition.',
  status: 'planned',
  accent: ['#dc2626', '#991b1b'],
  chapters,
}
