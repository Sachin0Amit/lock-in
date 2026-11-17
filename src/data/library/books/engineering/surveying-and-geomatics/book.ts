import type { Book, Chapter } from '../../../types'

/**
 * Surveying and Geomatics — the thirty-first book of the Engineering shelf (Civil branch — the GATE CE Section 7 ’Geomatics Engineering’ register, named honestly).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 31 planned lessons, zero written. Lesson ids will use the `surv-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Surveying and Geomatics owns ground measurement (GATE CE S7). Water Resources consumes its cross-sections and catchment truth; Transportation consumes its alignment craft; Environmental consumes its mapping; the GNSS and GIS depth routes honestly to the CS shelf’s geo-aware future books (cross-referenced).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 CE Section 7 'Geomatics Engineering' (CE_2026_Syllabus.pdf,
 *   extracted this pass): 'Principles of surveying; Errors and their adjustment;
 *   Maps — scale, coordinate system; Distance and angle measurement — Levelling
 *   and trigonometric levelling; Traversing and triangulation survey; Total
 *   station; Horizontal and vertical curves. Photogrammetry and Remote Sensing —
 *   Scale, flying height; Basics of remote sensing and GIS' — the entire section
 *   is this book's register.
 * - B.C. Punmia's Surveying Vol. I — the arc web-checked this pass (the 24-chapter
 *   Punmia organisation confirmed through Google Books and the open listings; the
 *   tacheometric chapter confirmed); Bannister's Surveying named as the second
 *   pole; K.R. Arora named. Chandra's Higher Surveying named for the geodetic
 *   tail.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-surveying-discipline',
    title: 'The Surveying Discipline',
    summary:
      'Why measure the earth (the engineering honest note: every project begins and ends on the ground); principles — work from whole to part, check twice; classification (plane versus geodetic, land versus engineering); plans, maps and scales; the coordinate census (the local grid and the projection honest note); and the error-and-adjustment preview (the Mathematics shelf\u2019s statistics cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Work from Whole to Part',
      'Plans, Maps and Scales',
      'The Error Preview',
    
      'Surveying and Geology'
    ],
  },
  {
    number: 2,
    slug: 'linear-and-angular-measurement',
    title: 'Linear and Angular Measurement',
    summary:
      'Chain and tape surveying with its corrections (sag, temperature, slope, the pull honest notes); ranging and obstacle work; compass surveying — bearings, local attraction and the correction craft; angle measurement with the theodolite (its adjustments honestly priced); and the measurement census bridging to the total-station era.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Tape Corrections, All of Them',
      'Bearings and Local Attraction',
      'The Theodolite\u2019s Adjustments',
    ],
  },
  {
    number: 3,
    slug: 'levelling',
    title: 'Levelling',
    summary:
      'The level and the staff (the bubble\u2019s honest law); bench marks, reduced levels and the two-bookkeeping methods (rise-and-fall versus collimation); the arithmetic check priced; reciprocal levelling and trigonometric levelling with the curvature-and-refraction corrections; the profile and cross-section craft (the road and pipeline census); and contouring (the interpolation craft, the contour\u2019s honest reading of terrain).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Two Bookkeepings, Checked',
      'Curvature and Refraction Priced',
      'Profiles and Cross-Sections',
      'Contours Read Honestly',
    ],
  },
  {
    number: 4,
    slug: 'traversing-and-triangulation',
    title: 'Traversing and Triangulation',
    summary:
      'The traverse — closed and open; latitude and departure computed with the closing-error craft (Bowditch\u2019s rule and the transit honest note); triangulation as the geodetic engine (the well-conditioned figure census, satellite and baseline stations); plane-table surveying named for its field honesty; and the network-adjustment doorstep.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Latitudes and Departures Closed',
      'Bowditch\u2019s Rule Earned',
      'Triangulation\u2019s Figure Census',
    ],
  },
  {
    number: 5,
    slug: 'tachometry-and-curves',
    title: 'Tachometry and Curves',
    summary:
      'Tachometric measurement — the stadia constants earned (the inclined-sight arithmetic) and the tangential method priced; then curves — simple (the setting-out craft by offsets and deflection angles), compound and reverse; transition curves (the spiral\u2019s honest purpose and the shift arithmetic); vertical curves (the parabola craft); and the setting-out census for real works (Transportation cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Stadia Earned',
      'Simple Curves Set Out',
      'Transitions and the Shift',
      'Vertical Curves Crafted',
      'Surveying \u2014 Classification Of Surveys, Various Methodologies, Instruments',
    ],
  },
  {
    number: 6,
    slug: 'total-stations-and-gnss',
    title: 'Total Stations and GNSS',
    summary:
      'The total station as the theodolite-meets-EDM honest merge (its measurement engines priced); traverse by total station worked; the GNSS idea (its segments and the signal honest note); the position crafts — absolute versus differential, RTK priced; the satellite geometry and error census; and the control-network honesty that modern instruments still owe to classical adjustment.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Total Station\u2019s Engines',
      'GNSS\u2019s Segments and Signals',
      'Differential and RTK Priced',
      'The Control Honesty',
    ],
  },
  {
    number: 7,
    slug: 'photogrammetry-and-remote-sensing',
    title: 'Photogrammetry and Remote Sensing',
    summary:
      'The aerial photograph — scale and flying height arithmetic (the GATE lines); relief displacement priced; stereoscopy named honestly; remote sensing — the electromagnetic honest note, the sensor census (passive and active, the resolution census), the platform families; image-interpretation basics; and GIS as the integration engine (layers, the analysis census, the geographic honest note) — the digital-geomatics doorway.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Scale and Flying Height Worked',
      'The Sensor and Resolution Censuses',
      'GIS as Integration Engine',
    ],
  },
  {
    number: 8,
    slug: 'areas-volumes-and-synthesis',
    title: 'Areas, Volumes and the Synthesis',
    summary:
      'Area computation (the trapezoidal and Simpson craft, the planimeter named); volumes (the cross-section census, the prismoidal formula and its correction); the mass-haul diagram earned (Transportation cross-referenced); catchment areas for the hydrologists (Water Resources cross-referenced); the synthesis — one page from chain to satellite; and the professional doorstep (the licensed surveyor\u2019s responsibilities named honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Areas by Two Crafts',
      'Volumes and the Prismoidal',
      'Mass-Haul and Catchments',
      'The Synthesis and the Licence',
    ],
  },
]

export const surveyingAndGeomatics: Book = {
  id: 'surveying-and-geomatics',
  title: 'Surveying and Geomatics',
  subtitle: 'Measuring the earth — from chains and levels to total stations, GNSS and remote sensing',
  discipline: 'engineering',
  level: 'First surveying course → geomatics-practice readiness',
  description: 'The measurement of the earth itself: the surveying discipline (principles, classification, plans versus maps, scales and the coordinate honest note); errors and their adjustment (the least-squares craft cross-referenced to the Mathematics shelf); linear and angular measurement (chains, tapes and their corrections, compass work with bearings); levelling — the level, bench marks, reciprocal and trigonometric levelling with the curvature-and-refraction honest note; the theodolite and traversing (angle measurement, traverse computation and adjustment, triangulation as the geodetic craft); tachometry (stadia and tangential methods); curves — simple, compound, reverse, transition and vertical, with the setting-out craft; the modern instrument census — EDM, total stations and GNSS (the satellite geometry honest note); photogrammetry and remote sensing (scale and flying height, the sensor census, GIS as the integration engine); computation of areas and volumes (the planimeter, cross-sections, the mass-haul honest note with Transportation and Water Resources cross-referenced); and the professional synthesis with the digital-geomatics doorstep. Cross-references every civil book that consumes ground truth.',
  status: 'planned',
  accent: ['#059669', '#065f46'],
  chapters,
}
