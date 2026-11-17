import type { Book, Chapter } from '../../../types'

/**
 * Music History — the seventh book of the Arts-Music shelf (the music register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 30 planned lessons, zero written. Lesson ids will use the `mhist-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Music History owns the survey register. The analytical crafts belong to theory-harmony-counterpoint (cross-referenced); the individual tradition’s depth — the Indian classical — is cross-referenced to the classical-dance book (the music registers shared); the film’s register to film-studies; the ABRSM-and-graded history registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Taruskin-and-Grout named as the university poles (the survey register).
 * - The Kostka arc cross-referenced for the theory receipts.
 * - The NCERT line named as the school register with the two-traditions honesty held straight.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'medieval-renaissance',
    title: 'The Medieval-and-Renaissance Register',
    summary:
      'The early arc: the chant\u2019s craft (the Gregorian\u2019s-modal honesty — the eight-mode register with the melismatic\u2019s-against-syllabic division, the neume\u2019s-notation birth named — the staff\u2019s-origin receipt); the organum\u2019s birth (the parallel\u2019s-honesty to the free-craft — the aquitanian division, the and Notre-Dame register with the magister named); the motet\u2019s ars-craft (the isorhythm named at survey depth); the Renaissance\u2019s register (the palestrina\u2019s-craft cross-referenced from counterpoint, the madrigal\u2019s chanson crafts, the mass\u2019s-census — the cyclic named, the printing\u2019s-consequence named — the Petrucci receipt); and the reformation-and-counter registers named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Neume\u2019s Origin Receipt Named',
      'The Notre-Dame Register Held',
      'The Petrucci Receipt Named',
      'The Two Church Registers Named',
    ],
  },
  {
    number: 2,
    slug: 'baroque-register',
    title: 'The Baroque Register',
    summary:
      'The figured era: the opera\u2019s-birth (the monody\u2019s-receipt priced straight — the Camerata\u2019s-craft with the recitative\u2019s-against-aria division, the Basso\u2019s-craft — the figured-bass honesty); the concerto\u2019s arc (the Brandenburg register with the solo\u2019s-against-grosso division); the Bach-and-Handel receipts (the WTC register cross-referenced from counterpoint, the oratorio\u2019s-craft with the Messiah receipt named); the suite-and-form registers (the dance\u2019s-census — the allemande-and-courante division); and the end-of-the era honesty (the Bach\u2019s-sons named — the style\u2019s-galant preview).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Camerata\u2019s Craft Priced Straight',
      'The Solo-Grosso Division Held',
      'The Messiah Receipt Named',
      'The Galant Preview Named',
    ],
  },
  {
    number: 3,
    slug: 'classical-romantic',
    title: 'The Classical-and-Romantic Registers',
    summary:
      'The era\u2019s two crafts: the Classical\u2019s arc (the sonata\u2019s-craft cross-referenced — the form\u2019s-convention honesty, the symphony\u2019s-growth — the Mozart\u2019s-forty-one register, the string-quartet\u2019s-birth, the Beethoven\u2019s-bridge honesty — the fifth\u2019s-motive receipt cross-referenced from composition); the Romantic\u2019s arc (the lied\u2019s character-piece crafts, the orchestra\u2019s-growth honesty — the Berlioz receipt named, the virtuoso\u2019s-register with the Liszt named, the nationalism-and-chromatic registers — the Tristan receipt named at survey depth); and the transition\u2019s honesty held (the Classical-against-Romantic division — the two-era crafts priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Form\u2019s Convention Honesty Cross-Referenced',
      'The Berlioz Receipt Named',
      'The Bridge Honesty Priced Straight',
      'The Tristan Receipt Named',
    ],
  },
  {
    number: 4,
    slug: 'twentieth-century',
    title: 'The Twentieth-Century Register',
    summary:
      'The modernisms\u2019 arc: the tonal\u2019s-own-end (the atonal\u2019s-craft — the schoenberg register with the sprechgesang named, the serial\u2019s-technique — the twelve-tone craft with the row receipt priced straight); the Stravinsky\u2019s-rhythm register (the Rite receipt named — the pulse\u2019s-revolution craft); the Bartok\u2019s folk honesty (the fieldwork receipt named); the American craft (the copland register with the precis named); the electronic\u2019s birth (the tape craft with the Stockhausen register named); the minimalism register (the Reich-and-Glass crafts — the phase receipt named); and the spectrum\u2019s honesty (the everything-at-once register — the post-modern craft held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Row Receipt Priced Straight',
      'The Pulse\u2019s-Revolution Craft Held',
      'The Fieldwork Receipt Named',
      'The Everything-at-Once Honesty Held Straight',
    ],
  },
  {
    number: 5,
    slug: 'jazz-popular',
    title: 'The Jazz-and-Popular Idioms',
    summary:
      'The oral tradition\u2019s arc: the blues\u2019s craft (the twelve-bar receipt cross-referenced from harmony — the AAB form named, the blue-note honesty, the Delta-to-Chicago migration register); the jazz\u2019s arc (the New-Orleans birth with the Armstrong receipt, the swing\u2019s-era register, the bebop\u2019s-revolution — the Parker-and-Gillespie receipts, the modal\u2019s-craft — the Davis register named, the free\u2019s-end honesty); the rock-and-pop census (the Elvis-and-Beatles receipts with the recording\u2019s-consequence named — the studio-as-instrument honesty cross-referenced to production); the hip-hop arc (the Bronx birth with the sampling register — the loop craft named); and the Indian film register named (the playback honesty at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The AAB Form Named',
      'The Revolution Receipts Priced Straight',
      'The Studio-as-Instrument Honesty Cross-Referenced',
      'The Loop Craft Named',
    ],
  },
  {
    number: 6,
    slug: 'world-digital-contemporary',
    title: 'The World, Digital-and-Contemporary Registers',
    summary:
      'The wider-and-newer maps: the Indian classical arc (the Hindustani-and-Carnatic division cross-referenced to the classical-dance book, the raga\u2019s-craft — the ten-thatths named at survey depth, the gharana register); the African register (the drumming\u2019s-craft cross-referenced from rhythm-meter — the gyil named); the East-Asian register (the gagaku-and-gugak crafts named); the Latin register (the son\u2019s samba crafts with the clave cross-referenced); the digital register (the synth\u2019s-arc — the Moog receipt named, the DAW\u2019s-consequence cross-referenced to production — the bedroom\u2019s-honesty priced straight); and the contemporary\u2019s register (the streaming\u2019s-consequence — the playlist\u2019s-era honesty, the genre\u2019s-collapse craft named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two-Tradition Division Cross-Referenced',
      'The Gyil Named',
      'The Moog Receipt Named',
      'The Bedroom Honesty Priced Straight',
      'History of Indian Music, contribution of Musicologists and their textual tradition',
      'Contribution of composers/performers to Indian music (Tansen, Sadarang etc.)',
      'Gharana and Institutional System and conferences of Hindustani music',
      'Unit II (common): Folk Music (origin, evolution and classification of Indian folk music; folk instruments and performers of various regions; ragas and talas used in folk music; folk fairs and festivals)',
      'Paper 1 Listening \u2014 Section C: Connecting Music (wider Knowledge Of',
    ],
  },
]

export const musicHistory: Book = {
  id: 'music-history',
  title: 'Music History',
  subtitle: 'The tradition\u2019s arc — from the chant to the present, with the world\u2019s registers held straight',
  discipline: 'arts-music',
  level: 'Beginner → undergraduate (the survey register)',
  description: 'The tradition\u2019s survey: the early register (the chant\u2019s-arc — the Gregorian\u2019s-modal honesty with the melismatic division, the organum\u2019s-birth — the parallel\u2019s free crafts, the motet\u2019s ars-nova registers); the Renaissance (the palestrina\u2019s-craft cross-referenced from counterpoint, the madrigal-and-mass registers, the printing\u2019s-consequence named); the Baroque (the opera\u2019s-birth — the monody\u2019s-receipt with the Basso-continuo craft, the concerto\u2019s-arc — the Brandenburg register, the Bach-and-Handel receipts priced straight); the Classical (the sonata\u2019s-craft cross-referenced from composition, the symphony-and-quartet registers, the Mozart-and-Beethoven arcs — the transition-and-honesty named); the Romantic (the lier-and-character registers, the orchestra\u2019s-growth honesty, the nationalism-and-chromatic registers named); the twentieth-century modernisms (the tonal\u2019s-own-end honesty — the atonal\u2019s serial crafts, the Stravinsky\u2019s-rhythm register, the electronic\u2019s-birth); the jazz-and-popular idioms (the blues\u2019s jazz arcs with the roots register, the rock\u2019s hip-hop census named); the world\u2019s registers (the Indian classical arc cross-referenced — the Hindustani-and-Carnatic division, the African-and-East-Asian registers held straight); and the digital-and-contemporary register (the production\u2019s cross-reference with the streaming\u2019s-consequence named).',
  status: 'planned',
  accent: ['#a855f7', '#581c87'],
  chapters,
}
