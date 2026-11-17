import type { Book, Chapter } from '../../../types'

/**
 * French — the sixth book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 49 planned lessons, zero written. Lesson ids will use the `fr-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): French owns the French register (the standard Metropolitan line with the francophone world’s reach priced). The english book owns the Norman-loan bridge (the post-1066 vocabulary’s shared treasury — the cognate’s bridge cross-referenced); the spanish, portuguese and italian books own the sibling bridges (the Romance family’s shared craft — each book’s contrastive notes cross-referenced); the DELF-DALF register is this book’s exam spine; the Art History book’s register names the French academy’s vocabulary (the genre terms cross-referenced).
 *
 * RESEARCH PHASE (2026-11-16):
 * - Valette & Valette, Contacts: Langue et culture françaises (the lesson structure read this pass — the Unité/Leçon apparatus: Unité 1 Bonjour tout le monde with Leçon 1 Bonjour, Leçon 2 Copain copine, Leçon 3 Ça va, Leçon 4 À Québec, Leçon 5 À Dakar — the francophone arc's own design) as the course spine.
 * - Easy French Step-by-Step (McGraw-Hill — the contents read this pass: Part I First Elements of French — the nouns, articles and descriptive adjectives; the gender and number craft) as the grammar ladder pole.
 * - The DELF/DALF register (read this pass — the official diploma pages: DELF A1-A2 for basic users, DELF B1-B2 for independent users, DALF C1-C2 for proficient users; the French Ministry of Education's official qualification frame) as the exam spine.
 * - The CEFR ladder (coe.int — read this pass) as the framework; the French phonetics' liaison and the silent-letter registers named as the pronunciation craft.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'sounds-liaison',
    title: 'The Sounds and the Liaison',
    summary:
      'The mouth\u2019s French craft: the vowel system (the front rounded pair\u2019s surprise — the tu and le, the u and ou\u2019s difference drilled with the pout method; the nasal vowels\u2019 family — the vin, blanc, bon and brun\u2019s four-way census with the spelling\u2019s traps); the consonants\u2019 craft (the r\u2019s Parisian uvular priced kindly; the silent letters\u2019 arithmetic — the two-thirds that is written but not spoken; the final consonant\u2019s liaison resurrection — the vous avez\u2019s link as the music); the liaison\u2019s law (the obligatory and forbidden lists — the artist\u2019s craft priced); the accents\u2019 census (the é, è, ê, ë and the ç\u2019s cedilla with the spelling\u2019s discipline); and the rhythm\u2019s craft (the syllable-timed machine — the even beats against the English\u2019s stress-timed lilt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Vowel System\u2019s Surprise',
      'The Nasal Family Census',
      'The Silent Letters and the Liaison\u2019s Law',
      'The Accents and the Rhythm',
    ],
  },
  {
    number: 2,
    slug: 'nominal-core',
    title: 'The Nominal Core',
    summary:
      'The noun\u2019s engine: the gender\u2019s patterns (the -tion, -té feminine families and the -age masculine\u2019s traps — the cage and page\u2019s exceptions priced with the memory\u2019s method); the articles\u2019 system (the le-la-les definite, the un-une-des indefinite with the negative\u2019s de switch — the pas de bread register; the partitive\u2019s du-de-la-des as the \u2019some\u2019 that English implies but French demands — the je mange du pain\u2019s craft); the adjective\u2019s agreement and position (the postnominal default with the prenominal circus — the BAGS beauty-age-goodness-size rule priced; the beau-nouveau-vieux\u2019s prenominal mutations — the bel homme\u2019s surprise); the possessive and demonstrative\u2019s census (the mon-ma-mes with the gender\u2019s owner-thing rule; the ce-cet-cette\u2019s craft); the numbers\u2019 system (the quatre-vingts\u2019 arithmetic — the sixty-ten\u2019s eighty priced as the French\u2019s own maths; the cent and mille\u2019s discipline); and the comparison\u2019s craft (the plus/moins/aussi...que\u2019s frame).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gender Patterns and the Articles\u2019 System',
      'The Partitive\u2019s Demanded \u2019Some\u2019',
      'The Adjective\u2019s Position Circus',
      'The Numbers\u2019 Arithmetic and the Comparison',
      'もくじ divider page',
      'Useful Expressions じかん・とし Time/Age'
    ],
  },
  {
    number: 3,
    slug: 'verb-engine',
    title: 'The Verb Engine',
    summary:
      'The verb\u2019s full machine: the present\u2019s three families (the -er\u2019s 90 percent with the parler\u2019s full table; the -ir\u2019s two classes — the partir\u2019s and the choisir\u2019s; the -re\u2019s vendre\u2019s class); the irregular canon (the être\u2019s je suis treasury and the avoir\u2019s j\u2019ai; the aller-faire-pouvoir-vouloir-devoir\u2019s engine — the scaffold verbs as the first memorisation mountain); the near future\u2019s aller (the je vais faire\u2019s craft as the spoken future\u2019s default); the passé composé\u2019s machine (the avoir\u2019s default and the être\u2019s Dr & Mrs Vandertramp house — the monter, descendre, naître, mourir family with the agreement\u2019s surprise); the imparfait\u2019s craft (the -ais-ais-ait register with the stem\u2019s one-form simplicity); the two pasts\u2019 division (the composé\u2019s event against the imparfait\u2019s background — the avoir versus avait\u2019s picture-frame craft); the reflexive verbs\u2019s routine (the s\u2019appeler, se lever, se coucher\u2019s daily register with the reciprocal\u2019s s\u2019aimer); and the pronoun verbs\u2019 placement (the je le vois\u2019s ladder).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Families and the Irregular Canon',
      'The Passé Composé\u2019s Machine',
      'The Imparfait and the Two Pasts\u2019 Division',
      'The Reflexive Routine',
      'Auxiliary verbs (have/do/can etc.) I think so / I hope so etc',
      'Verb + -ing (enjoy doing / stop doing etc.)',
      'Verb + to … (decide to … / forget to … etc.)',
      'Verb + -ing or to … 1 (remember, regret etc.)',
      'Verb + -ing or to … 2 (try, need, help)',
      'Verb + -ing or to … 3 (like / would like etc.)',
      'Verb + preposition + -ing (succeed in -ing / insist on -ing etc.)',
      'What’s happening in the pictures? Choose from these verbs',
      'She’s taking a picture. 4 his head',
      'Put the verb into the correct form, positive (I’m doing etc.) or negative (I’m not doing etc.)'
    ],
  },
  {
    number: 4,
    slug: 'negation-questions',
    title: 'The Negation and the Questions',
    summary:
      'The sentence\u2019s machinery: the ne...pas sandwich (the negation\u2019s frame with the infinitive\u2019s pas placement — the je veux ne pas vs the honest je ne veux pas trap); the negation\u2019s other members (the ne...jamais, ne...rien, ne...personne, ne...plus families with the rien and personne\u2019s subject-verb surprises); the question\u2019s three registers (the intonation\u2019s spoken casual, the est-ce que\u2019s neutral engine, the inversion\u2019s formal je-vous craft with the t-epenthesis\u2019s a-t-il surprise); the interrogatives\u2019 census (the qui, que, où, quand, comment, pourquoi, combien\u2019s engines); the object pronouns\u2019 craft (the me, te, le, la, lui, leur\u2019s placement before the verb — the je lui donne\u2019s antecedent discipline); and the y and en\u2019s twin engines (the j\u2019y vais and j\u2019en mange as the little pronouns that carry the place and the quantity).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ne...Pas Sandwich',
      'The Question\u2019s Three Registers',
      'The Object Pronouns\u2019 Placement',
      'The Y and En Twins',
      'Were implemented in 2006. Naturally, these revisions have been implemented throughout the rest of the book. The other most thoroughgoing revision is in the account of valency in Chapter 18, where it had become apparent that the account of verb complements was overly complex and gave too much'
    ],
  },
  {
    number: 5,
    slug: 'everyday-situations',
    title: 'The Everyday Situations',
    summary:
      'The Contacts arc\u2019s situations: the greetings and the introductions (the bonjour\u2019s register with the tu-vous\u2019s two-tier contract priced as the social grammar; the je m\u2019appelle\u2019s introduction craft); the numbers and the time (the quelle heure est-il\u2019s arithmetic with the 24-hour official register); the café and the market (the un café s\u2019il vous plaît\u2019s craft; the market\u2019s vocabulary with the partitive\u2019s j\u2019achète des pommes register); the directions and the city (the à droite, à gauche, tout droit\u2019s compass; the métro\u2019s register); the family and the home (la famille\u2019s census with the possessive\u2019s craft); the Québec and Dakar lessons priced (the francophone world\u2019s reach — the accent\u2019s variety and the vocabularies\u2019 local registers named honestly as the language\u2019s own breadth); and the shopping and the restaurant (l\u2019addition s\u2019il vous plaît\u2019s register with the menu\u2019s vocabulary).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greetings and the Tu-Vous Contract',
      'The Café and the Market',
      'The Directions and the Métro',
      'The Francophone World Priced',
    ],
  },
  {
    number: 6,
    slug: 'vocabulary-craft',
    title: 'The Vocabulary\u2019s Craft',
    summary:
      'The word-hoard\u2019s French method: the cognate\u2019s bridge (the thousand-word head start — the English vocabulary\u2019s Norman-loan treasury with the -tion/-ité/-ance families\u2019 map priced honestly; the false cognate\u2019s traps — the sensibilité and the actually traps\u2019 census); the gender\u2019s memory method (the colour-coding and the article-noun welding craft — learn le livre, never livre); the word formation\u2019s families (the suffix\u2019s -tion, -isme, -able and the prefix\u2019s re- dé- engine); the idioms\u2019 first set (the ça va\u2019s family and the avoir idioms — the j\u2019ai froid and j\u2019ai vingt ans\u2019s possession craft priced as the French\u2019s own way); the register\u2019s axis (the tu and vous\u2019s grammar revisited as the vocabulary\u2019s own social choice); and the dictionary\u2019s craft (the bilingual-to-monolingual\u2019s turn with the Le Petit Robert named as the milestone).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cognate Bridge and Its Traps',
      'The Gender\u2019s Memory Method',
      'The Word Formation\u2019s Families',
      'The Idioms\u2019 First Set',
    ],
  },
  {
    number: 7,
    slug: 'reading-writing',
    title: 'The Reading and Writing',
    summary:
      'The literacy\u2019s craft: the reading\u2019s ladder (the graded texts from the Contacts\u2019s profiles to the first short stories; the bande dessinée\u2019s register priced as the motivated reading); the writing\u2019s forms (the message\u2019s craft — the SMS and email\u2019s frames with the coucou\u2019s casual and the bonjour\u2019s neutral registers; the letter\u2019s formal frame — the cher/chère and the cordialement\u2019s close); the A1-A2 can-dos priced (the self-introduction\u2019s writing, the postcard\u2019s holiday frame, the form\u2019s filling — the real Annonce register); the dictée\u2019s discipline (the French school\u2019s own craft priced as the spelling\u2019s gym); and the first real texts (the Petit Prince\u2019s opening as the traditional first book — the simple text\u2019s literary register priced honestly as the door).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reading Ladder',
      'The Message and the Letter',
      'The A1-A2 Can-Dos',
      'The Dictée and the First Real Texts',
    ],
  },
  {
    number: 8,
    slug: 'listening-speaking',
    title: 'The Listening and Speaking',
    summary:
      'The ear and the mouth\u2019s craft: the listening\u2019s drill (the dialogues at the A1\u2019s slow-and-clear register; the liaison\u2019s listening traps — the les amis\u2019s two-word one-breath; the number\u2019s listening arithmetic with the quatre-vingt-douze\u2019s quick maths); the speaking\u2019s register (the pair-work\u2019s frames — the asking and answering\u2019s situations; the conversation\u2019s openers and the small talk\u2019s weather register); the pronunciation\u2019s polish (the u-ou\u2019s drill at the sentence\u2019s speed; the r\u2019s Parisian with the gargle method priced kindly; the nasal\u2019s singing craft — the vin\u2019s one syllable, not the vow-in two); the fillers\u2019 honest use (the euh and the bon register); and the conversation\u2019s strategies (the repair\u2019s craft — the comment dit-on register and the voulez-vous répéter\u2019s honest asking).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Listening Drill and the Liaison\u2019s Ear',
      'The Small Talk\u2019s Register',
      'The Pronunciation\u2019s Polish',
      'The Repair\u2019s Craft',
    ],
  },
  {
    number: 9,
    slug: 'delf-doorstep',
    title: 'The DELF Doorstep',
    summary:
      'The register\u2019s close: the DELF\u2019s map (the diploma\u2019s ladder — the A1 and A2\u2019s DELF for the basic user, the B1 and B2\u2019s DELF for the independent, the DALF\u2019s C1-C2 for the proficient — the Ministry of Education\u2019s own qualification frame); the A1\u2019s target (the four skills\u2019 parts — the listening\u2019s short dialogues, the reading\u2019s short texts, the writing\u2019s form and message, the speaking\u2019s interview and the pair\u2019s interaction; the strategy\u2019s honest register); the A2\u2019s step and the B1\u2019s horizon (the B1\u2019s threshold independence — the can-do\u2019s promise: the travel, the opinion, the argument\u2019s first craft); the DALF named (the C1-C2\u2019s summit register); the exam\u2019s craft (the time\u2019s arithmetic and the mock\u2019s cycle; the past papers\u2019 register); and the doorstep — the immersion\u2019s sea (the chansons and the films\u2019 register priced as the fluency\u2019s food), and the reader\u2019s first dream: the first real Paris conversation with the waiter\u2019s sympathy.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The DELF\u2019s Ladder',
      'The A1\u2019s Target',
      'The B1\u2019s Threshold',
      'The Doorstep: The First Paris Conversation',
    ],
  },
]

export const french: Book = {
  id: 'french',
  title: 'French',
  subtitle: 'The langue of clarity — liaison, gender, verbs and the DELF ladder to the first real conversation',
  discipline: 'languages',
  level: 'Absolute beginner → DELF A1-A2 confident, B1 in reach (the CEFR ladder priced)',
  description: 'French as a complete course. The sounds first (the nasal vowels\u2019 craft, the liaison\u2019s music, the silent letters\u2019 arithmetic — the two-thirds of a French word that is actually written; the accents and the cedilla\u2019s census); the nominal core (the gender\u2019s patterns and their honest exceptions, the articles\u2019 system — the definite, indefinite and the partitive\u2019s \u2019some\u2019 that French demands, the adjectives\u2019 agreement and position\u2019s surprises — the beau-nouveau-vieux\u2019s prenominal circus); the verb engine (the present\u2019s -er, -ir, -re conjugation with the être and avoir\u2019s treasuries, the aller-faire-pouvoir-vouloir\u2019s irregular canon, the passé composé\u2019s avoir-être choice with the Dr & Mrs Vandertramp mnemonic, the reflexive verbs\u2019s daily routine register); the negation and question\u2019s craft (the ne...pas sandwich and its friends, the inversion and est-ce que\u2019s registers); the everyday situations (the Contacts arc\u2019s lessons — the greetings, the introductions, the café and the market, the directions; the francophone world\u2019s Dakar and Québec lessons priced as the language\u2019s own reach); the vocabulary\u2019s craft (the cognate\u2019s bridge to English — the thousand-word head start priced honestly, the gender\u2019s patterns, the idioms\u2019 first set); the reading and writing (the short texts, the messages and letters\u2019 frames, the A1-A2 can-dos); the listening and speaking (the liaison\u2019s listening craft, the conversation\u2019s registers); the exam door (the DELF A1\u2019s parts, the A2\u2019s step, the B1\u2019s horizon — the DALF named; the strategies); and the doorstep. Cross-references the shelf\u2019s english and spanish books (the sibling bridges) and hands off to the reader\u2019s first Proust-with-a-dictionary ambition.',
  status: 'planned',
  accent: ['#1e40af', '#1e3a8a'],
  chapters,
}
