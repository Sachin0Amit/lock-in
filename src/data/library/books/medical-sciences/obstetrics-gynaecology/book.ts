import type { Book, Chapter } from '../../../types'

/**
 * Obstetrics & Gynaecology — the thirteenth book of the Medical Sciences shelf.
 *
 * STATUS: PLANNED (Medical Sciences full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 25 planned lessons, zero written. Lesson ids will use the `obg-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Obstetrics-Gynaecology owns the women’s register. The reproductive’s physiology to medical-physiology (the cycle cross-referenced); the anatomy to anatomy; the embryology to the anatomy book’s-own chapter with developmental-biology; the neonatal to pediatrics; the pharmacology to pharmacology; the NEET-and-FMGE lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - DC Dutta’s Textbook of Obstetrics and HR Dutta’s named as the Indian poles.
 * - Williams’ Obstetrics named as the depth co-pole.
 * - The NCERT-and-FMGE lines as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'pregnancy-anc',
    title: 'The Pregnancy-and-ANC Register',
    summary:
      'The beginning\u2019s craft: the diagnosis\u2019s honesty (the test\u2019s arithmetic with the dating\u2019s Scan honesty — the CRL-and-receipt named); the ANC\u2019s register (the visit-and-timing census with the IFA-and-calcium honesty cross-referenced, the screening-and-timeline craft — the anaemia-and-ICT registers, the syphilis-and-HIV tests, the anomaly scan\u2019s window priced straight, the GTT register); the Rh\u2019s anti-D arc cross-referenced from clinical-immunology with the 28-week receipt; the high-risk\u2019s craft (the identification\u2019s honesty with the referral register); and the common-complaints map (the nausea\u2019s anaemia-and-thyroid registers held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The CRL Receipt Named',
      'The Screening Timeline Craft Held',
      'The Anti-D Receipt Priced Straight',
      'The High-Risk Identification Held',
      'The Menstrual Cycle, Pregnancy, Parturition and Lactation',
    ],
  },
  {
    number: 2,
    slug: 'labour-delivery',
    title: 'The Labour-and-Delivery Register',
    summary:
      'The birth\u2019s craft: the labour\u2019s arc (the stage\u2019s division fixed by drill, the partograph\u2019s honesty with the alert-and-action lines — the WHO\u2019s craft priced straight); the mechanism\u2019s craft (the cardinal-movement census walked once); the pain-and-relief register (the epidural\u2019s honesty with the PCA named); the delivery\u2019s crafts (the normal\u2019s conduct honesty with the episiotomy-and-indication register — the selective honesty priced straight); the assisted\u2019s register (the ventouse\u2019s-against-forceps division with the indication honesty); the CS\u2019s register (the indication\u2019s census with the lower-segment honesty, the vaginal-birth-after craft named); and the third-stage\u2019s craft (the active-management\u2019s honesty with the oxytocin receipt — the PPH prevention priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Alert-Action Craft Priced Straight',
      'The Movements Walked Once',
      'The Selective Honesty Held',
      'The Active-Management Receipt Priced Straight',
    ],
  },
  {
    number: 3,
    slug: 'obstetric-complications',
    title: 'The Obstetric Complications',
    summary:
      'The emergency\u2019s map: the hypertensive\u2019s craft (the preeclampsia\u2019s diagnosis honesty with the end-organ\u2019s census, the magnesium-and-loading receipt with the toxicity\u2019s reflex honesty priced straight, the delivery\u2019s cure honesty held straight); the PPH\u2019s craft (the four-T\u2019s-division fixed by drill — the tone\u2019s first honesty with the mechanical-and-medical census, the balloon-and-packing register, the referral\u2019s craft); the apgar\u2019s arithmetic with the resuscitation\u2019s birth arc (the golden-minute honesty); the GDM\u2019s craft with the insulin register cross-referenced; the IUGR\u2019s craft with the Doppler honesty named; the malpresentation\u2019s register (the breech-and-ECV craft with the vaginal honesty named, the transverse\u2019s never honesty); the twin-and-craft named; and the ectopic-and-miscarriage registers (the ectopic\u2019s rupture honesty with the methotrexate-and-craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Loading Receipt with Its Reflex Honesty',
      'The Four-T Division Fixed by Drill',
      'The Golden-Minute Honesty Held',
      'The Never Honesty Named',
    ],
  },
  {
    number: 4,
    slug: 'puerperium-lactation-contraception',
    title: 'The Puerperium, Lactation-and-Contraception Register',
    summary:
      'The after-and-planning craft: the puerperium\u2019s arc (the involution\u2019s honesty with the lochia-and-clock register, the fever-and-cause census — the mastitis\u2019s-against-engorgement division); the lactation\u2019s craft (the counseling honesty with the feeding\u2019s register, the UNICEF\u2019s-ten named at survey depth); the contraception\u2019s register (the method\u2019s census with the effectiveness arithmetic — the Cu-T-and-hormonal division with the PPRC\u2019s 96-hour honesty named, the sterilisation-and-consent craft with the Indian\u2019s register held straight); the MTP\u2019s craft (the Indian\u2019s legal honesty with the gestation\u2019s arithmetic priced straight); and the return\u2019s-craft named (the six-week visit honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lochia Clock Named',
      'The 96-Hour Honesty Named',
      'The Legal Honesty Priced Straight',
      'The Six-Week Visit Held',
      'Reproductive Health: STDs, Contraception, MTP and Amniocentesis',
    ],
  },
  {
    number: 5,
    slug: 'gynaecology-register',
    title: 'The Gynaecology Register',
    summary:
      'The clinic\u2019s craft: the menstrual\u2019s arc (the cycle\u2019s physiology cross-referenced with the AUB\u2019s Palm-Coein honesty named at survey depth, the dysmenorrhoea\u2019s register); the infertility\u2019s craft (the couple\u2019s honesty with the timeline-and-tubal register — the HSG-and-craft named, the ovulation-and-clomiphene receipt); the infection\u2019s register (the PID\u2019s craft with the STD map cross-referenced, the candida-and-bacterial division); the fibroid\u2019s craft (the cause\u2019s census with the size\u2019s symptom honesty — the FIGO named at survey depth); the prolapse\u2019s craft with the conservative\u2019s honesty; the endometriosis-and-register named; the PCOS\u2019s craft (the rotterdam honesty named with the metabolic\u2019s consequence); and the menopause\u2019s register (the HRT\u2019s honesty priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Couple Honesty with the Timeline',
      'The Size-Symptom Honesty Held',
      'The Rotterdam Honesty Named',
      'The HRT Honesty Priced Straight',
      'Infertility and the Assisted Reproductive Technologies: IVF, ZIFT, GIFT',
    ],
  },
  {
    number: 6,
    slug: 'oncology-screening',
    title: 'The Oncology-and-Screening Register',
    summary:
      'The cancer craft: the cervical\u2019s arc (the screening\u2019s craft — the Pap-and-VIA division with the coverage arithmetic cross-referenced from community-medicine, the HPV\u2019s vaccine honesty with the India register, the colposcopy craft named, the staging\u2019s honesty with the conisation named); the endometrial\u2019s register (the bleeding\u2019s red-flag honesty with the hysteroscopy craft); the ovarian\u2019s register (the silent honesty with the CA125\u2019s caveat cross-referenced, the BRCA\u2019s named); the trophoblastic-and-register named (the mole\u2019s follow honesty with the BHCG arithmetic); and the palliative\u2019s craft cross-referenced (the QOL honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Coverage Arithmetic Cross-Referenced',
      'The Vaccine Honesty Priced Straight',
      'The Silent Honesty Held',
      'The BHCG Arithmetic Named',
    ],
  },
]

export const obstetricsGynaecology: Book = {
  id: 'obstetrics-gynaecology',
  title: 'Obstetrics & Gynaecology',
  subtitle: 'The women\u2019s register — pregnancy, labour, the puerperium and the gynaecological craft',
  discipline: 'medical-sciences',
  level: 'Undergraduate MBBS core (the DC Dutta register)',
  description: 'The women\u2019s-health discipline: the obstetric register in full (the pregnancy-and-diagnosis craft with the dating\u2019s ANC arithmetic, the labour\u2019s arc — the stage\u2019s craft with the partograph\u2019s honesty and the pain-and-relief register, the delivery\u2019s manoeuvre crafts, the puerperium-and-lactation register with the contraception\u2019s PP ARC honesty); the obstetric complications (the hypertensive-and-preeclampsia craft with the magnesium receipt, the haemorrhage\u2019s PPH map with the four-T honesty, the anaemia\u2019s heart-disease registers, the IUGR\u2019s oligohydramnios crafts, the malpresentation-and-breech register, the foetal-distress honesty with the CTG reading); the gynaecology\u2019s register (the menstrual\u2019s arc with the AUB division, the infertility\u2019s craft with the timeline honesty, the infection-and-PID register, the benign\u2019s fibroid honesty, the prolapse\u2019s craft, the EOT register named); the oncology\u2019s register (the cervical-and-screening craft with the Pap\u2019s VIA honesty — the HPV-vaccine arc priced straight, the endometrial-and-ovarian registers named); the family-planning\u2019s register (the method\u2019s census with the effectiveness arithmetic — the CDC honesty named, the MTP-and-Indian register named); and the ethics\u2019 register held straight (the autonomy\u2019s craft with the consent\u2019s honesty).',
  status: 'planned',
  accent: ['#be185d', '#831843'],
  chapters,
}
