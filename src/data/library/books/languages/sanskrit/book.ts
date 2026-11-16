import type { Book, Chapter } from '../../../types'

/**
 * Sanskrit — the third book of the Languages shelf.
 *
 * STATUS: PLANNED (Languages full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `sansk-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Sanskrit owns the classical register (the deva-vani’s whole literature). Hindi owns the child register (the script’s lessons cross-referenced — one script, two routes; the tatsama etymons’ treasury shared); the Philosophy book’s Indian darshanas (the Nyaya to the Vedanta) are read in this language — the cross-reference priced in both books; the Indian History book’s sources’ craft (the Vedas to the Upanishads as the historical evidence) cross-references; the Archaeology book’s inscription census names the Brahmi’s evolution; the future Classics-of-other-lands line (the Greek-Latin family) is named as the world’s parallel.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Michael Coulson, Teach Yourself Sanskrit (the 15-chapter structure read this pass via the sanskritstudio review — the sandhi, the noun declensions, the present-system verbs, the participles, the compound (samasa) apparatus, the epic reading arc) as the course pole.
 * - The Maurer/Panini traditions named (the Sanskrit Grammar of the standard university registers; the Pune and the German tradition's grammars named as the depth poles).
 * - The NCERT school register named (the Ruchira and the Sanshipta Budhcharit series as the school spine).
 * - The Bhagavad-Gita and the epic registers named as the reading spine (the reading's goal priced honestly: the Gita with a commentary's help).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'script-sounds',
    title: 'The Script and the Sounds',
    summary:
      'The deva-vani\u2019s phonetic door: the vowels\u2019 census (the thirteen svaras with the short-long\u2019s phonemic weight — the \u2019who\u2019 and \u2019which\u2019 of meaning; the anusvara\u2019s nasal, the visarga\u2019s breath); the consonants\u2019 precise inventory (the vargas by the articulation\u2019s place and the voicing\u2019s matrix — the kh-k pairs, the aspirated\u2019s full set priced as the pan-Indian heritage); the sh-list\u2019s precision (the sa, sha, Sa, ha four — the drilling method); the syllable\u2019s akshara and the stress\u2019s absence (the pitch accent\u2019s Vedic register named); the pronunciation\u2019s discipline (the Paninian phonetics\u2019 own tradition — the shiksha\u2019s science priced as the sound\u2019s own grammar); and the script\u2019s mastery drill (the Devanagari\u2019s conjuncts for the Sanskrit\u2019s own frequency — the tra, kra, sya families).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Vowels and the Nasals',
      'The Consonant Matrix',
      'The Sh-List\u2019s Precision',
      'The Mastery Drill',
    ],
  },
  {
    number: 2,
    slug: 'nominal-engine',
    title: 'The Nominal Engine',
    summary:
      'The noun\u2019s full machinery: the gender and the ending\u2019s anatomy (the -a masculine, -aa feminine, -i/-u and the long-vowel stems, the neuter\u2019s own character); the eight cases\u2019 vibhakti engine (each case\u2019s meaning\u2019s map priced with the English\u2019s prepositional shadows — the nominative\u2019s subject, the accusative\u2019s object, the instrumental\u2019s means, the dative\u2019s purpose, the ablative\u2019s from, the genitive\u2019s of, the locative\u2019s in, the vocative\u2019s call — with the \u2019that for which Kalidasa is famous\u2019 style examples); the paradigms\u2019 census (the -a stem\u2019s full eight-case drill as the first memorisation mountain; the -i, -u, -aa stems\u2019 variations; the gender\u2019s surprises — the muni and the sena families); the pronouns\u2019 treasuries (the asmad-yusmad\u2019s irregular richness, the tad\u2019s paradigm as the demonstrative\u2019s core; the sandhi\u2019s interplay flagged); and the adjectives\u2019s agreement craft (the dual and the plural\u2019s numbers — the three-number system priced as the language\u2019s own luxury).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Eight Cases\u2019 Map',
      'The -a Stem Mountain',
      'The Other Stems and the Genders',
      'The Pronouns\u2019 Treasuries',
    ],
  },
  {
    number: 3,
    slug: 'verbal-engine',
    title: 'The Verbal Engine',
    summary:
      'The verb\u2019s full machinery: the dhatu\u2019s craft (the root\u2019s anatomy — the strengthening\u2019s guna and vriddhi as the morphology\u2019s own engine); the present system\u2019s ten classes (the bhvadi-gana census with the thematic\u2019s fourth class as the commonest); the tense-mood\u2019s la-series census (the laṭ present\u2019s three persons and three numbers — the paradigms\u2019 drill; the laṅ imperfect\u2019s augment; the liṭ perfect\u2019s reduplication as the language\u2019s own poetry; the luṅ aorist\u2019s forms named; the lṛt future; the optative and imperative\u2019s moods — the injunction\u2019s grammar that the dharmashastra lives in); the passive and the causative\u2019s derivation (the di- and the ni-suffixes\u2019 craft); the participle families (the present\u2019s -at, the perfect\u2019s -vat, the future\u2019s -syat, the past-passive\u2019s -ta — the participle\u2019s use as the prose\u2019s workhorse); and the absolutives\u2019 \u2019having done\u2019 craft (the -tvaa and the -ya\u2019s split).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ten Classes and the Guna',
      'The La-Series Census',
      'The Passive and the Causative',
      'The Participle Families',
    ],
  },
  {
    number: 4,
    slug: 'sandhi-samasa',
    title: 'The Sandhi and the Samasa',
    summary:
      'The language\u2019s celebrated joinery: the sandhi\u2019s rules in full (the vowel sandhi\u2019s census — the dirgha, guna, vriddhi and the yan combinations with the examples\u2019 drill; the visarga sandhi\u2019s transformations; the consonant sandhi\u2019s rules — the assimilation\u2019s craft and the schwa\u2019s discipline); the sandhi\u2019s undoing (the reading\u2019s own skill — the split-back craft for the epic\u2019s first lines); the samasa\u2019s types (the tatpurusha\u2019s case-end compound with its six sub-types; the karmadharaya\u2019s descriptive; the dvigu\u2019s numeral; the bahuvrihi\u2019s exocentric wonder — the \u2019rich-faced\u2019 that means a man, priced as the grammar\u2019s poetry; the avyayibhava\u2019s adverbial; the dvandva\u2019s copulative); the compound\u2019s reading craft (the back-to-front\u2019s discipline, the vigraha\u2019s analysis method); and the samjna\u2019s technical apparatus (the grammar\u2019s own meta-language priced at the survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Vowel Sandhi Census',
      'The Consonant and Visarga Sandhi',
      'The Samasa\u2019s Types',
      'The Compound\u2019s Reading Craft',
    ],
  },
  {
    number: 5,
    slug: 'syntax-craft',
    title: 'The Syntax\u2019s Craft',
    summary:
      'The sentence\u2019s deep grammar: the karaka theory (the six relations\u2019 relation — the kartri, karman, karana, sampradana, apadana, adhikarana with the sutra\u2019s own names priced as the Paninian frame); the free word order\u2019s discipline (the Sanskrit\u2019s freedom as the case\u2019s discipline\u2019s dividend — the meaning\u2019s independence from the order, demonstrated with the same sentence\u2019s permutations); the subordination\u2019s craft (the absolutives\u2019 chains — the \u2019having done X, having done Y\u2019 as the narrative\u2019s engine; the infinitive\u2019s purpose; the participle\u2019s clause-craft); the quotation\u2019s iti engine (the direct-thought\u2019s marker as the prose\u2019s punctuation); the negation\u2019s na and the prohibition\u2019s ma distinction; and the verse\u2019s craft (the metre\u2019s sloka as the reading\u2019s own music — the anushtubh\u2019s eight-syllable discipline priced as the reader\u2019s own ear-training).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Karaka Theory',
      'The Free Order\u2019s Discipline',
      'The Subordination and Quotation',
      'The Verse\u2019s Music',
    ],
  },
  {
    number: 6,
    slug: 'first-texts',
    title: 'The First Texts',
    summary:
      'The reader\u2019s first real Sanskrit: the subhashita\u2019s wit (the aphorism\u2019s treasury — the niti\u2019s maxims with the vocabulary\u2019s commonest words earned; the wit\u2019s own craft priced — the pun\u2019s slesha named); the Nala\u2019s story (the Mahabharata\u2019s love-tale as the traditional first continuous text — the grammar\u2019s steady diet); the Shakuntala\u2019s excerpts (the drama\u2019s craft — the praveshika and the dialogue\u2019s registers, the hero and the heroine\u2019s poetry); the hitopadesha\u2019s fables (the niti\u2019s stories as the graded reader\u2019s own); and the reading method\u2019s craft (the dictionary\u2019s discipline — the Monier-Williams\u2019s own love named; the parsing\u2019s drill — the verb\u2019s hunt as the sentence\u2019s spine; the commentary\u2019s sahayaa as the honest method).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Subhashita\u2019s Wit',
      'The Nala and the Fables',
      'The Shakuntala\u2019s Excerpts',
      'The Reading Method\u2019s Craft',
    ],
  },
  {
    number: 7,
    slug: 'epic-reading',
    title: 'The Epic Reading',
    summary:
      'The summits reached with help: the Bhagavad-Gita\u2019s chapters (the eighteen\u2019s own architecture — the first chapter\u2019s despondency as the reader\u2019s first full chapter; the second as the summary; the karma-yoga\u2019s verses as the grammar\u2019s own diet; the Philosophy book\u2019s darshana chapters cross-referenced for the meaning); the Ramayana\u2019s sargas (the Valmiki\u2019s own craft — the opening\u2019s invocations, the Rama\u2019s portraits as the samasa\u2019s treasury; the sundarakanda\u2019s tradition priced); the Mahabharata\u2019s tales (the Nala again at depth; the Yaksha\u2019s questions; the Vidura\u2019s niti); the Upanishads\u2019s entry (the Isa and the Kena as the shortest — the Philosophy book\u2019s cross-reference priced as the meaning\u2019s home); and the reading\u2019s own register (the verse-by-verse\u2019s patience as the craft — the fluent reading\u2019s honest promise: the Gita with a commentary\u2019s help, not without).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gita\u2019s Chapters',
      'The Ramayana\u2019s Sargas',
      'The Mahabharata\u2019s Tales',
      'The Upanishads\u2019 Entry',
    ],
  },
  {
    number: 8,
    slug: 'composition-writing',
    title: 'The Composition\u2019s Craft',
    summary:
      'The writer\u2019s own Sanskrit: the simple sentence\u2019s construction (the karaka-driven method — the case\u2019s choice before the word\u2019s order); the conversation\u2019s saṃvada frames (the traditional dialogues\u2019 craft — the teacher and the student\u2019s register); the anuvaad\u2019s translation method (the English-to-Sanskrit discipline — the verb\u2019s final placement, the vocabulary\u2019s substitution register); the nibandha\u2019s essay craft (the simple topic\u2019s three-paragraph architecture — the patha-pratipatti-nirupana frame); the letter\u2019s form (the mitra-lakshana\u2019s frame); the verse\u2019s own composition (the sloka\u2019s filling — the grammar\u2019s own game priced as the tradition\u2019s own pastime); and the citation\u2019s craft (the sutra\u2019s quoting — the grammar\u2019s authority\u2019s language).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Simple Sentence\u2019s Method',
      'The Anuvaad\u2019s Discipline',
      'The Nibandha and the Letter',
      'The Verse\u2019s Filling',
    ],
  },
  {
    number: 9,
    slug: 'paninian-glance',
    title: 'The Paninian Glance',
    summary:
      'The grammar\u2019s own wonder: the Ashtadhyayi\u2019s map (the eight books\u2019 adhyaya and the four pada\u2019s quartering; the sutra\u2019s algebra — the anuvrittii\u2019s ellipsis and the adhikara\u2019s scope as the compression\u2019s craft priced); the shiva-sutra\u2019s matrices (the pratyahara\u2019s phonetic algebra — the \u2019R\u2019 that means everything from the throat); the technical apparatus\u2019s census (the pratyaya\u2019s suffixes, the prakriti\u2019s roots, the vibhakti\u2019s markers — the meta-language\u2019s own grammar); the tradition\u2019s commentators (the Katyayana\u2019s vartika, the Patanjali\u2019s Mahabhashya as the tradition\u2019s own depth; the Bhattoji\u2019s Siddhanta Kaumudi as the learner\u2019s own ladder); the linguistic science\u2019s own surprise (the Panini\u2019s formal system as the world\u2019s first generative grammar — the CS shelf\u2019s formal-language books\u2019 cross-reference priced as the world\u2019s own wonder); and the language\u2019s history (the Vedic\u2019s parent, the classical\u2019s standardisation, the prakrits\u2019 daughters — the Hindi and the Marathi\u2019s own lineage named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ashtadhyayi\u2019s Map',
      'The Shiva-Sutra\u2019s Algebra',
      'The Commentators\u2019 Ladder',
      'The Grammar\u2019s History and Wonder',
    ],
  },
  {
    number: 10,
    slug: 'exam-doorstep',
    title: 'The Exam Doorstep',
    summary:
      'The registers\u2019 close: the school boards\u2019 Sanskrit (the CBSE\u2019s craft — the vyakarana\u2019s objective questions, the translation and the comprehension\u2019s frames; the shlokas\u2019 memorisation register priced honestly as the craft it remains); the university\u2019s registers (the BA-MA\u2019s shastra tracks — the nyaya or the sahitya line\u2019s own ladder); the competitive registers (the UPSC\u2019s optional Sanskrit named; the traditional pundit\u2019s examinations — the Kashi\u2019s own registers); the sanskrit\u2019s modern life (the conversation\u2019s revival — the Sanskrit-bharati\u2019s sambhashana camps named with the honest register; the news and the digital\u2019s Sanskrit named); and the doorstep — to Hindi for the child\u2019s shared script, to the Philosophy book\u2019s darshanas whose language this is, and to the reader\u2019s own inheritance now unlocked — the three thousand years\u2019 treasury open.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Boards\u2019 Craft',
      'The University Registers',
      'The Modern Life',
      'The Doorstep: The Treasury Open',
    ],
  },
]

export const sanskrit: Book = {
  id: 'sanskrit',
  title: 'Sanskrit',
  subtitle: 'The deva-vani earned — sandhi, declensions, Panini\u2019s shadow and the epic reading',
  discipline: 'languages',
  level: 'Absolute beginner → reading the Gita and the Mahabharata with a commentary\u2019s help',
  description: 'Sanskrit as a living course of study, not a museum piece. The script and sounds first (the Devanagari as Sanskrit\u2019s own home — the vowels\u2019 anusvara and visarga, the consonants\u2019 precise inventory, the pronunciation\u2019s phonetic discipline that the Paninian tradition itself codified); the nominal engine (the gender and the ending\u2019s anatomy, the eight cases\u2019 vibhakti engine — each case\u2019s meaning\u2019s map, the declension\u2019s paradigms for the -a, -i, -u and the feminine -aa stems with the pronouns\u2019 irregular treasuries); the verbal engine (the dhatu\u2019s craft, the present system\u2019s ten classes, the tense-mood census — the laṭ present, the laṅ imperfect, the liṭ perfect, the luṅ aorist, the lṛt future and the optative- imperative\u2019s moods, the participle families and the absolutives); the sandhi and samasa\u2019s celebrated machinery (the euphonic combination\u2019s rules — the vowel, consonant and visarga sandhi\u2019s census; the compound\u2019s samasa types from the tatpurusha to the bahuvrihi); the syntax\u2019s craft (the karaka theory as the sentence\u2019s deep grammar, the free word order\u2019s discipline, the subordination\u2019s absolutives); the first texts (the subhashitas\u2019 wit, the Nala and Shakuntala\u2019s excerpts); the epic reading (the Bhagavad-Gita\u2019s chapters, the Ramayana\u2019s sargas, the Mahabharata\u2019s tales); the composition\u2019s craft (the simple sentence, the anuvaad translation method, the nibandha); the Paninian glance (the Ashtadhyayi\u2019s sutra method as the grammar\u2019s own wonder); and the exam door. Cross-references Hindi (the child\u2019s debt) and hands off to the Philosophy book\u2019s darshanas whose language this is.',
  status: 'planned',
  accent: ['#7c2d12', '#5c2510'],
  chapters,
}
