import type { Book, Chapter } from '../../../types'

/**
 * Russian — the eleventh book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `rus-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Russian owns the Russian register (the standard Moscow line). The german book owns the case engine’s European cousin (the four cases against the six — the contrastive craft cross-referenced without the duplication); the future Slavic siblings’ books named honestly; the sanskrit book’s case-and-verb-nominal craft cross-referenced as the classical cousin’s parallel; the TORFL register is this book’s named exam spine; the Indian History and International Relations books’ register names the Russian vocabulary of the era’s diplomacy (the cross-reference priced).
 *
 * RESEARCH PHASE (2026-11-16):
 * - Golosa: A Basic Course in Russian (the official Golosa site read this pass: two books (Book 1 and Book 2) of ten units each, every unit with the dialogs, texts, exercises and other material — gwu.edu/~slavic/golosa) as the course spine.
 * - The TORFL register named honestly (the Russian state test's level frame with the CEFR mapping's register — the A1-C2 equivalence named as approximations, no official single world register claimed).
 * - The Cyrillic and the stress-reduction registers named (the akanye's craft as the pronunciation's first surprise); the Oxford and Penguin course registers named as the other poles.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'cyrillic',
    title: 'The Cyrillic',
    summary:
      'The alphabet\u2019s craft: the 33 letters\u2019 census (the familiar faces — the A, K, M and O\u2019s instant friends priced as the first day\u2019s luck; the false friends — the R\u2019s \u2019ya\u2019 and P\u2019s \u2019r\u2019 and the C\u2019s \u2019s\u2019 and H\u2019s \u2019n\u2019 traps drilled with the discrimination method); the new letters\u2019 craft (the zh, ts, ch, sh and shch\u2019s fricative family; the hard sign\u2019s and soft sign\u2019s silent pair priced as the first real puzzle); the vowels\u2019 ten (the five hard a-o-u-e-y against the five soft ya-yo-yu-e-i\u2019s palatalising craft — the vowel\u2019s own softening engine priced); the cursive\u2019s craft (the italic\u2019s surprises — the d and g and t\u2019s shapes with the handwriting\u2019s discipline priced as the real Russia\u2019s own script); and the keyboard\u2019s map (the ЙЦУКЕН layout\u2019s register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The 33 Letters\u2019 Census',
      'The False Friends\u2019 Traps',
      'The Hard and Soft Signs\u2019 Pair',
      'The Cursive\u2019s Craft',
    ],
  },
  {
    number: 2,
    slug: 'the-sounds-stress',
    title: 'The Sounds and the Stress',
    summary:
      'The mouth\u2019s Russian craft: the vowel\u2019s reduction (the akanye\u2019s honest engine — the unstressed o\u2019s \u2019a\u2019 as the Moscow\u2019s own music: the moloko\u2019s three-vowel \u2019a\u2019s priced as the first listening trap); the palatalisation\u2019s craft (the consonant\u2019s softening before the soft vowels — the t\u2019 against t\u2019s difference as the loanword\u2019s foreign accent\u2019s key); the voiced devoicing\u2019s final law (the vod of vod\u2019s final d priced as the assimilation\u2019s craft with the regressive pairs\u2019 census); the consonant\u2019s palatal pairs (the hard and soft consonant\u2019s phonemic weight — the bol\u2019s and bol\u2019s families\u2019 meaning pairs named); the mobile stress\u2019s discipline (the stress\u2019s free movement as the word\u2019s own signature — the zAmok and zamOk\u2019s castle-and-lock pun priced as the learner\u2019s humility); and the uto-sounds\u2019 craft (the s and z\u2019s assimilation before the voiced and voiceless\u2019s pairs).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Akanye\u2019s Honest Engine',
      'The Palatalisation\u2019s Craft',
      'The Devoicing\u2019s Final Law',
      'The Mobile Stress\u2019s Discipline',
    ],
  },
  {
    number: 3,
    slug: 'nominal-core',
    title: 'The Nominal Core',
    summary:
      'The case\u2019s full engine: the six cases\u2019 map (each case\u2019s meaning\u2019s territory priced with the English\u2019s prepositional shadows — the nominative\u2019s subject and predicate, the accusative\u2019s object-and-time, the genitive\u2019s of-and-negation-and-quantity with the \u2019net\u2019 register, the dative\u2019s to-and-age, the instrumental\u2019s with-and-means, the prepositional\u2019s about-and-place with the preposition\u2019s case-monopoly frame); the declension\u2019s classes (the hard-stem masculine and neuter, the -a feminine and the soft-stem\u2019s variants with the table\u2019s first mountain); the adjectives\u2019s agreement (the hard-soft ending\u2019s six-case engine with the long and short forms\u2019 register named); the possessives and demonstratives\u2019 census (the -ov genitive plural\u2019s English-sounding wonder priced as the family\u2019s own); the numbers\u2019 craft (the numeral\u2019s case-government with the \u2019one\u2019 and \u2019two\u2019 agreement\u2019s surprise named); and the prepositions\u2019 case-monopoly (the v and na\u2019s locative against the \u2019to\u2019 and \u2019from\u2019 pairs — the motion\u2019s preposition frame introduced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Six Cases\u2019 Map',
      'The Declension\u2019s Classes',
      'The Adjective\u2019s Agreement',
      'The Numbers\u2019 Case-Government',
    ],
  },
  {
    number: 4,
    slug: 'verb-core',
    title: 'The Verb Core',
    summary:
      'The aspect\u2019s great divide: the perfective against the imperfective (the napisat\u2019 against pisat\u2019 pair as the language\u2019s own philosophy — the completed event against the process\u2019s two worlds priced with the aspect\u2019s choice in the past and future\u2019s frames; the aspect\u2019s verb pairs\u2019 vocabulary register with the prefix\u2019s perfectivising engine named); the two conjugation\u2019s classes (the first and second\u2019s endings with the -e- and -i- stems\u2019 craft); the past\u2019s form (the -l, -la, -lo, -li\u2019s gender agreement — the past\u2019s four forms as the easy tense priced); the future\u2019s two ways (the imperfective\u2019s budu pisat\u2019 against the perfective\u2019s napisatu\u2019s craft); the imperative\u2019s craft (the -i and -ite pairs with the negative imperative\u2019s \u2019ne\u2019 register); the reflexive\u2019s -sya (the verb\u2019s own mirror with the middle voice\u2019s craft named); and the verbs of motion\u2019s wonder (the unidirectional idti against the multidirectional khodit\u2019 pair — the determined motion against the habitual\u2019s two-world engine priced as the Russian\u2019s own mirror of the aspect).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Aspect\u2019s Great Divide',
      'The Two Conjugation\u2019s Classes',
      'The Past\u2019s Four Forms and the Future\u2019s Two Ways',
      'The Motion Verbs\u2019 Unidirectional Wonder',
    ],
  },
  {
    number: 5,
    slug: 'everyday-situations',
    title: 'The Everyday Situations',
    summary:
      'The Golosa arc\u2019s situations: the introductions (the menya zovut\u2019s my-name craft with the formal and informal register — the vy and ty\u2019s contract priced as the social grammar); the family and the home (the sem\u2019ya\u2019s census with the possessive\u2019s moj and moya\u2019s agreement); the university and the study (the universitet\u2019s vocabulary with the student\u2019s register — the Russian\u2019s own campus craft); the shopping and the numbers (the skol\u2019ko stoit\u2019s how-much with the ruble\u2019s arithmetic and the number\u2019s case-government revisited); the directions and the city (the nalevo, napravo, pryamo\u2019s compass with the metro\u2019s register — the Moscow\u2019s own station names as the reading\u2019s first real texts); the time and the dates (the vremya\u2019s craft with the date\u2019s ordinal register); and the food and the restaurant (the vkusno\u2019s delicious craft with the Russian\u2019s hospitality register priced kindly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Introductions and the Vy-Ty Contract',
      'The Family and the University',
      'The Shopping and the Metro',
      'The Time and the Restaurant',
    ],
  },
  {
    number: 6,
    slug: 'vocabulary-craft',
    title: 'The Vocabulary\u2019s Craft',
    summary:
      'The word-hoard\u2019s Russian method: the word formation\u2019s prefix families (the po-, za-, na-, pri- and u- as the meaning\u2019s engine — the prefix\u2019s perfectivising double duty priced); the roots\u2019 transparency (the -vod, -nos and -vid families\u2019 building craft — the vodokhralishche\u2019s water-store as the compound\u2019s transparent arithmetic); the international words\u2019 bridge (the borrowings\u2019 honest census — the banan and taksi\u2019s instant friends with the re-spelling\u2019s craft: the restoran and kilometr\u2019s Russian citizenship); the false friends\u2019 English census (the magazine\u2019s not-magazine and the artist\u2019s theatre-only register with the frequency-ranked traps); the Russian\u2019s own literature of the everyday (the pozhaluysta\u2019s please and the spasibo\u2019s thank-you\u2019s social craft priced); and the dictionary\u2019s craft (the bilingual-to-monolingual\u2019s turn with the Ozhegov named as the milestone).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Prefix Families\u2019 Engine',
      'The Roots\u2019 Transparency',
      'The False Friends\u2019 Census',
      'The Dictionary\u2019s Craft',
    ],
  },
  {
    number: 7,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the Golosa texts\u2019 short passages to the first real texts — the sign and the metro\u2019s station as the immersion\u2019s own first texts priced); the writing\u2019s forms (the letter\u2019s frames with the personal and official\u2019s registers — the dorogoy Ivan\u2019s open and the s uvazheniem\u2019s close); the cursive\u2019s craft at depth (the handwriting\u2019s real register — the letter\u2019s and diary\u2019s script discipline with the dictation\u2019s craft); the short composition\u2019s craft (the self-introduction\u2019s brief register with the \u2019O sebye\u2019 frame); and the first real texts (the children\u2019s tales and the Pushkin\u2019s simplest tales priced as the first literature — the Chekhov\u2019s short stories as the far door named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reading Ladder',
      'The Letter\u2019s Frames',
      'The Cursive\u2019s Craft at Depth',
      'The First Real Texts',
    ],
  },
  {
    number: 8,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s craft: the listening\u2019s drill (the dialogues at the A1\u2019s clear register with the number\u2019s listening traps — the number\u2019s case-government\u2019s ear); the speaking\u2019s register (the pair-work\u2019s frames with the conversation\u2019s openers; the vy-ty switching\u2019s social map); the pronunciation\u2019s polish (the palatalisation\u2019s loanword accent\u2019s key priced; the akanye\u2019s native music; the stress\u2019s memory discipline with the dictionary\u2019s stress-marking craft); the fluency\u2019s craft (the fillers\u2019 honest use — the vot and nu register; the paraphrase\u2019s escape with the kak skazat\u2019 craft); and the immersion\u2019s sea (the songs and the films\u2019 register priced as the fluency\u2019s food — the Tarkovsky\u2019s slow register named kindly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Listening Drill',
      'The Pronunciation\u2019s Polish',
      'The Fluency\u2019s Craft',
      'The Immersion\u2019s Sea',
    ],
  },
  {
    number: 9,
    slug: 'torfl-doorstep',
    title: 'The TORFL Doorstep',
    summary:
      'The register\u2019s close: the proficiency\u2019s map priced honestly (the Russian state test\u2019s TORFL frame with the CEFR mapping\u2019s register — the TEO/TORFL\u2019s elementary, basic and certification levels\u2019 ladder named as approximations against the CEFR; no single JLPT-style world exam claimed — the honest note); the target\u2019s craft (the A2-B1\u2019s Golosa Book 1-to-2\u2019s promise: the daily conversation\u2019s comfort and the first real reading); the school and university registers named (the CBSE\u2019s and the university\u2019s Slavic department\u2019s registers); the exam\u2019s craft (the mock\u2019s cycle with the honest diagnosis); and the doorstep — the immersion\u2019s sea (the news and the literature\u2019s register), the german book\u2019s case-craft cross-reference (the four-against-six case\u2019s contrastive craft), and the reader\u2019s first dream: the Chekhov\u2019s short story read with a dictionary\u2019s patient help.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The TORFL\u2019s Map Priced Honestly',
      'The A2-B1\u2019s Promise',
      'The Exam\u2019s Craft',
      'The Doorstep: The Chekhov Read',
    ],
  },
]

export const russian: Book = {
  id: 'russian',
  title: 'Russian',
  subtitle: 'The Cyrillic door and the case-and-aspect engine — the Golosa arc to real reading',
  discipline: 'languages',
  level: 'Absolute beginner → the Golosa Book 1\u2019s level (CEFR-style A1-A2 in reach, TORFL named)',
  description: 'Russian as a complete course. The Cyrillic first (the 33 letters\u2019 census with the familiar-and-false friends — the R and P\u2019s trap, the cursive\u2019s italic surprises; the hard and soft signs\u2019 craft); the sounds (the vowel\u2019s reduction as the akanye\u2019s honest craft, the palatalisation, the voiced devoicing\u2019s final, the mobile stress\u2019s discipline); the nominal core (the six cases\u2019 full engine — the nominative\u2019s subject, the accusative\u2019s object, the genitive\u2019s of-and-negation, the dative\u2019s to, the instrumental\u2019s with, the prepositional\u2019s about; the declension\u2019s classes with the hard-soft stems; the adjectives\u2019s agreement engine); the verb core (the aspect\u2019s pair — the perfective against the imperfective as the Russian\u2019s great divide priced up front, the two conjugation\u2019s classes, the verbs of motion\u2019s unidirectional-multidirectional wonder); the everyday situations (the Golosa arc\u2019s first units — the introductions, the family, the university, the shopping, the directions); the vocabulary\u2019s craft (the word formation\u2019s prefix families, the false friends\u2019 English census, the international words\u2019 bridge); the reading and writing (the short texts, the letters\u2019 frames, the cursive\u2019s craft); the listening and speaking (the dialogues\u2019 drill, the pronunciation\u2019s polish); the exam door (the TORFL named honestly with the CEFR mapping\u2019s register; the strategies); and the doorstep. Cross-references the german book (the case-and-prefix craft\u2019s cousin) and hands off to the reader\u2019s first Chekhov-with-a-dictionary ambition.',
  status: 'planned',
  accent: ['#52525b', '#3f3f46'],
  chapters,
}
