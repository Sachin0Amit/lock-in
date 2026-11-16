import type { Book, Chapter } from '../../../types'

/**
 * Art History — the second book of the Culture & Past branch (owns the discipline the future Arts shelf’s Art History line will cross-reference).
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `arth-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Art History owns the aesthetic object’s history — world and India. The future Arts shelf’s Art History line folds HERE (the practice books — the drawing, painting technique — stay on that shelf, the academic discipline here; the contract recorded in SUBJECT_BACKLOG); Archaeology owns the find-spot and the conservation craft (the two cross-reference at every object); Indian History owns the periods’ narrative (the two cross-reference — this book reads the period through its objects); Cultural Studies owns the contemporary’s visual culture reading; the UPSC GS1 art-and-architecture register is the applied spine.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Gardner's Art Through the Ages: A Global History 16e (the TOC read this pass from the Cengage faculty page — Art in the Stone Age; Ancient Mesopotamia and Persia; Egypt from Narmer to Cleopatra; The Prehistoric Aegean; Ancient Greece; the Roman, medieval, Islamic, Renaissance, Baroque, the Americas, Asia, the modern chapters) — faculty.cengage.com/works/9781337630702.
 * - NCERT An Introduction to Indian Art Part 1 class 11 (the drishtiias PDF read this pass — the cave paintings' tradition from Bhimbetka, the Harappan seals, the Mauryan Yakshas and Ashokan pillars, the Bharhut/Sanchi/Amaravati reliefs, the Gandhara-Mathura-Amravati schools, the Gupta styles, the Ajanta murals, the medieval sculpture schools).
 * - The UPSC GS Paper I art-and-culture register (read in full this pass — the Indian Culture line: the paintings, dances, music, puppetry, theatre, architecture from Harappan through the Nagara-Dravida-Vesara, Indo-Islamic, colonial and modern arcs) as the applied spine.
 * - The Indian poles named: the Percival Spear-Stella frame of Indian art history; BN Goswamy's register; Partha Mitter's Indian Art named for the modern arc.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-art-historians-eye',
    title: 'The Art Historian\u2019s Eye',
    summary:
      'The discipline\u2019s own method: the visual analysis\u2019 vocabulary (the form\u2019s elements — line, shape, colour, value, texture, space; the composition\u2019s principles — balance, rhythm, emphasis, proportion); the scale and medium\u2019s craft (the fresco against the tempera against the oil — the technique\u2019s history as the meaning\u2019s condition); the iconography\u2019s method (the Panofsky\u2019s three levels — the pre-iconographic, the iconographic, the iconological); the context\u2019s craft (the patron, the place, the purpose — the work\u2019s own world); and the attribution and forgery\u2019s honest limits (the connoisseur\u2019s eye against the scientific exam — the work\u2019s biography).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Visual Vocabulary',
      'The Medium\u2019s Craft',
      'The Panofsky Method',
      'The Attribution\u2019s Limits',
    ],
  },
  {
    number: 2,
    slug: 'the-ancient-world',
    title: 'The Ancient World',
    summary:
      'The world\u2019s first images and monuments: the Stone Age\u2019s art (the Bhimbetka\u2019s painted shelters and the Lascaux-Chauvet caves — the handaxe and the bison\u2019s register; the theory of the cave art priced honestly); the Mesopotamian and Persian (the ziggurat\u2019s mass, the Standard of Ur\u2019s registers, the Assyrian reliefs, Persepolis\u2019s Apadana); the Egyptian (the Narmer palette\u2019s grammar, the pyramid\u2019s three-kingdom arc, the tomb\u2019s craft — Tut\u2019s mask; the Amarna revolution priced); and the prehistoric Aegean (the Cycladic idols, the Knossos\u2019s frescoes, the Mycenaean gold).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stone Age\u2019s Images',
      'Mesopotamia and Persia',
      'The Egyptian Grammar',
      'The Prehistoric Aegean',
    ],
  },
  {
    number: 3,
    slug: 'the-classical-world',
    title: 'The Classical World',
    summary:
      'The Greek and Roman canon: the Greek (the geometric\u2019s kraters, the archaic\u2019s kouros-kore stiffness, the classical revolution — the Polykleitos\u2019s canon, the Parthenon\u2019s refinements, the Scopa-Praxiteles pathos, the Hellenistic baroque — the Laocoön); the Etruscan\u2019s prelude; the Roman (the republican portrait\u2019s verism, the Augustan\u2019s marble revival, the Pantheon\u2019s dome, the Flavian\u2019s relief, the Pompeian\u2019s four styles); and the classical legacy\u2019s afterlife (the Renaissance\u2019s debt priced as the frame for the later chapters).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greek Arc',
      'The Etruscan Prelude',
      'The Roman Register',
      'The Classical Afterlife',
    ],
  },
  {
    number: 4,
    slug: 'the-medieval-and-renaissance-europe',
    title: 'The Medieval and Renaissance Europe',
    summary:
      'The European arc from Constantine to the Baroque: the early Christian and Byzantine (the basilica\u2019s form, the Ravenna\u2019s mosaics, the icon\u2019s theology); the Islamic Spain\u2019s and the Europe\u2019s Islamic bridge named; the Romanesque (the pilgrimage roads and the tympanum\u2019s terror); the Gothic (the Abbot Suger\u2019s light, the chartres\u2019s glass, the Rayonnant\u2019s dissolution — the engineering of the rib priced); the Renaissance\u2019s three acts (the early — Masaccio\u2019s perspective and Donatello\u2019s bronze; the high — Leonardo, Raphael, Michelangelo; the north — Durer and the van Eyck\u2019s oil); the Mannerist\u2019s sophistication; and the Baroque (the Caravaggio\u2019s tenebrism, the Bernini\u2019s marble faith, the Counter-Reformation\u2019s engine).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Byzantine and the Romanesque',
      'The Gothic Light',
      'The Renaissance\u2019s Three Acts',
      'The Baroque Engine',
    ],
  },
  {
    number: 5,
    slug: 'the-asian-arts',
    title: 'The Asian Arts',
    summary:
      'The non-European canon at survey weight: the Chinese (the bronze\u2019s vessels, the Han\u2019s tomb craft, the Tang\u2019s Buddhist sculpture, the landscape\u2019s Song revolution — the scroll\u2019s reading craft priced; the literati and the court\u2019s two registers); the Japanese (the Heian\u2019s handscrolls, the Zen\u2019s ink minimalism, the ukiyo-e\u2019s floating world — the Hokusai\u2019s wave as the print\u2019s census); the southeast Asian (the Borobudur\u2019s terraces, the Angkor Wat\u2019s cosmic plan, the Javanese and the Cham registers); and the Islamic art\u2019s aniconic principle (the geometry and the calligraphy as the image\u2019s substitute — the Alhambra\u2019s muqarnas; the book\u2019s illumination).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Chinese Registers',
      'The Japanese Registers',
      'The Southeast Asian Monuments',
      'The Islamic Aniconic Register',
    ],
  },
  {
    number: 6,
    slug: 'india-ancient',
    title: 'India: The Ancient Register',
    summary:
      'The Indian ancient at full weight (the NCERT\u2019s own arc): the Harappan seals and the terracotta\u2019s craft; the Mauryan (the Ashokan pillar\u2019s polish and the Yaksha-Yakshi\u2019s first monumental stone — the Didarganj\u2019s chauri-bearer priced); the Sunga-Kushan reliefs (the Bharhut\u2019s stockade register, the Sanchi\u2019s gateways\u2019 jataka census, the Amaravati\u2019s later elegance); the three schools (the Gandhara\u2019s Greco-Buddhist syncretism, the Mathura\u2019s indigenous red, the Amaravati\u2019s narrative white); the Gupta idiom (the Sarnath\u2019s sermon-delivering Buddha, the Dashavatara\u2019s ten-incarnation relief, the Ajanta\u2019s murals — the padmapani and the perspective\u2019s own system); and the cave\u2019s architecture (the chaitya and vihara\u2019s rock-cut craft — the Karle\u2019s aisle).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mauryan Stone',
      'The Three Relief Schools',
      'The Gupta Idiom and Ajanta',
      'The Rock-Cut Craft',
    ],
  },
  {
    number: 7,
    slug: 'india-medieval',
    title: 'India: The Medieval Register',
    summary:
      'The temple\u2019s millennium: the Nagara style\u2019s full census (the Odisha\u2019s Lingaraja, the Khajuraho\u2019s nagara — the shikhara\u2019s curves and the mandapa\u2019s masses, the Solanki\u2019s Modhera sun); the Dravida (the Pallava\u2019s Mahabalipuram — the monolithic rathas and the Shore temple; the Chola\u2019s Brihadisvara — the vimana\u2019s 66 metres; the gopuram\u2019s later rise — the Madurai\u2019s skyscraper gateways); the Vesara (the Chalukya-Hoysala\u2019s star — the Belur-Halebid\u2019s jewellery in soapstone); the bronze\u2019s Chola Nataraja (the ananda-tandava\u2019s iconography — the ring of fire and the dwarf\u2019s ignorance priced); the miniature\u2019s birth (the Pala\u2019s palm leaf and the Sultanate\u2019s atelier); the Indo-Islamic (the Sultanate\u2019s arch and dome — the Qutb\u2019s screen; the Mughal\u2019s arc — Humayun\u2019s garden tomb, the Fatehpur Sikri\u2019s syncretism, the Taj\u2019s perfection; the Rajput and Pahari courts — the Basohli\u2019s intensity and the Kangra\u2019s lyricism; the Sikh and the colonial provincial registers).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nagara Census',
      'The Dravida and the Vesara',
      'The Chola Bronze and the Miniature\u2019s Birth',
      'The Indo-Islamic and the Court Paintings',
    ],
  },
  {
    number: 8,
    slug: 'india-modern',
    title: 'India: The Modern Register',
    summary:
      'The modern Indian arc: the colonial\u2019s arrival (the Company school\u2019s watercolour realism — the Daniells\u2019 picturesque and the Patna school\u2019s register priced honestly; the Kalighat\u2019s satirical folk); Raja Ravi Varma\u2019s revolution (the oil\u2019s arrival and the calendar-god\u2019s making — the popular\u2019s invention priced); the Bengal school\u2019s swadeshi (the Abanindranath\u2019s Bharat Mata and the wash technique\u2019s invention — the orientalist\u2019s nationalism priced honestly); the Santiniketan\u2019s register (the Nandalal and the Benodebehari\u2019s murals); the Progressives\u2019 break (the Souza-Raza-Husain\u2019s 1947 manifesto — the Bombay\u2019s cosmopolitan); the contemporary (the Subodh\u2019s hologram and the Bharti\u2019s scales — the global market\u2019s Indian arrival priced); the architecture\u2019s modern (the Indo-Saracenic\u2019s colonial — the Victoria Memorial; the Le Corbusier\u2019s Chandigarh and the Doshi\u2019s Pritzker); and the folk and tribal registers (the Madhubani and the Warli — the living traditions\u2019 census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Company School and the Kalighat',
      'Ravi Varma and the Bengal School',
      'The Progressives and the Contemporary',
      'The Architecture\u2019s Modern and the Folk Registers',
    ],
  },
  {
    number: 9,
    slug: 'americas-africa-oceania',
    title: 'The Americas, Africa and Oceania',
    summary:
      'The world\u2019s other arts: the pre-Columbian Americas (the Olmec\u2019s heads, the Maya\u2019s stelae and Bonampak\u2019s murals, the Teotihuacan\u2019s avenue, the Aztec\u2019s Templo Mayor, the Inca\u2019s masonry — the Machu Picchu\u2019s craft; the post-conquest\u2019s registers); the African (the Nok\u2019s terracotta, the Ife\u2019s bronze naturalism, the Benin\u2019s brass plaques — the 1897\u2019s dispersal priced honestly; the masks\u2019 registers — the Dan and the Kuba; the contemporary\u2019s Africa); and the Oceania (the Maori\u2019s marae and the Easter Island\u2019s moai, the Aboriginal\u2019s Dreaming and the Papunya\u2019s dots — the world\u2019s longest art tradition\u2019s honest pricing).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pre-Columbian Americas',
      'The African Bronzes and Masks',
      'The Oceania Registers',
      'The Contemporary\u2019s Global Field',
    ],
  },
  {
    number: 10,
    slug: 'modern-contemporary-doorstep',
    title: 'The Modern, the Contemporary and the Doorstep',
    summary:
      'The avant-garde\u2019s arc to the present: the modern\u2019s revolution (the neoclassic\u2019s David, the romantic\u2019s Goya, the realist\u2019s Courbet, the impressionist\u2019s optical — the Monet\u2019s series; the post-impressionist\u2019s structure — the Cezanne\u2019s and the Van Gogh\u2019s registers; the expressionist, the cubist\u2019s simultaneity — the Les Demoiselles\u2019 break, the abstraction\u2019s purity — the Kandinsky and the Mondrian; the Dada\u2019s anti-art and the surrealist\u2019s dream); the contemporary\u2019s field (the abstract-expressionist\u2019s scale, the pop\u2019s irony, the minimal\u2019s object, the conceptual\u2019s instruction, the installation\u2019s room, the performance\u2019s body); the museum era\u2019s own history (the Louvre\u2019s public birth, the white cube\u2019s invention, the biennial\u2019s circuit, the market\u2019s prices priced honestly); and the doorstep — to the future Arts shelf\u2019s practice books (the making\u2019s craft lives there, the meaning\u2019s history here), to the reader\u2019s own gallery visit as the final assignment.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Modern Revolution\u2019s Arc',
      'The Contemporary Field',
      'The Museum Era\u2019s History',
      'The Doorstep: The Gallery Visit',
    ],
  },
]

export const artHistory: Book = {
  id: 'art-history',
  title: 'Art History',
  subtitle: 'The object\u2019s long story — from the cave wall to the white cube, India and the world',
  discipline: 'humanities',
  level: 'Senior secondary → university art history + UPSC GS-I art-and-culture readiness',
  description: 'The image\u2019s own discipline. The art historian\u2019s eye first (the visual analysis\u2019 vocabulary — form, line, colour, space, composition; the iconography and iconology\u2019s Panofsky frame; the context\u2019s craft and the attribution\u2019s honest limits); the world tour in the Gardner order — the ancient (the stone age\u2019s cave art, Mesopotamia and Persia, Egypt, the Aegean), the classical (Greece and Rome), the medieval-to-renaissance Europe (the byzantine, the gothic, the renaissance\u2019s three acts, the baroque), the Asian arts (China, Japan, the southeast Asian, the Islamic aniconic register); the Americas, Africa and Oceania; and the modern-contemporary arc; then the Indian spine at full weight (the Harappan seals, the Mauryan pillars and Yakshas, the Bharhut-Sanchi-Amaravati reliefs, the Gandhara-Mathura-Amravati schools, the Gupta idiom and the Ajanta murals, the temple architecture\u2019s styles — Nagara, Dravida, Vesara; the bronze\u2019s Chola Nataraja, the miniature\u2019s birth, the Indo-Islamic — Sultanate to Mughal to Rajput-Pahari; the colonial company school, Ravi Varma, the Bengal school, the progressives, the contemporary; the folk-tribal registers); and the museum era\u2019s close. Cross-references Archaeology (the object\u2019s find-spot) and hands off to the future Arts shelf\u2019s practice books.',
  status: 'planned',
  accent: ['#e11d48', '#be123c'],
  chapters,
}
