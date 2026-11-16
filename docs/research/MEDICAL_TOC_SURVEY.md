# Medical Sciences Shelf TOC Survey (full-shelf planning pass, 2026-11-16)

Owner directive: "yes" to opening the three remaining shelves. Evidence
base for the 19-book medical shelf; URLs and the reading ledger live in
`docs/project/SOURCE_LOG.md`; durable generator
`scripts/gen_medical_shelf.py` (plan data in
`scripts/shelf_data/medical_books_[ab].py`); gate
`scripts/verify-bio-med-arts-shelf-planning.ts`.

## What was read this pass

- **Guyton & Hall, Textbook of Medical Physiology (Elsevier, 14e)** — the
  thirteen-unit arc read this pass from the publisher's shop TOC, the
  library-catalogue TOC and the 62-chapter TOC mirrors: Unit I
  Introduction to Physiology: The Cell and General Physiology ·
  Unit II Membrane Physiology, Nerve and Muscle · the circulation,
  respiration, kidney-and-body-fluids, blood, GI, endocrinology,
  neurophysiology-and-special-senses, sports/aviation/deep-sea units,
  ending with Fetal and Neonatal Physiology. This is the spine of
  medical-physiology (8 chapters) and the reference for the sibling-view
  cross-references in the biology shelf's animal-physiology.
- **Robbins & Cotran, Pathologic Basis of Disease (Elsevier, 10e)** — the
  chapter arc read this pass: Ch 1 The Cell as a Unit of Health and
  Disease · Ch 2 Cell Injury, Cell Death and Adaptations · Ch 3
  Inflammation and Repair · Ch 4 Hemodynamic Disorders … Ch 22 The Female
  Genital Tract · Ch 23 The Breast · Ch 24 The Endocrine System ·
  Ch 25 The Skin · Ch 26 Bones, Joints and Soft Tissue Tumors ·
  Ch 27 Peripheral Nerve … — the spine of pathology's mechanism chapters
  (cell injury → inflammation → haemodynamics → neoplasia → the systemic
  previews).
- **The MBBS professional register** — the Indian MBBS subject structure
  (Anatomy · Physiology · Biochemistry in the first year; Pathology ·
  Pharmacology · Microbiology · Forensic Medicine · Community Medicine
  in the second; the clinical specialties in the final years) and the
  NMC competency-based curriculum frame, priced as the professional
  ladder beneath every book; the **NEET UG** register (biology as the
  exam's heaviest half) and **FMGE** named as the exam anchors. The
  specialty-and-professional lines (Dentistry BDS · Nursing BSc ·
  Pharmacy BPharm · Veterinary BVSc · Physiotherapy BPT) are priced
  against their own professional syllabi conventions.
- The co-poles named per book (Gray's Anatomy for Students / Moore's;
  Harper's; Ross & Pawlina; Katzung; Ananthanarayan; Park's; DC Dutta;
  OP Ghai; Parikh; Agrios; Wickens; Roberts & Janovy; Alcock; Taiz;
  Gullan & Cranston…) — the standing university poles, named at survey
  depth in each book's research notes.

## The shelf as planned (19 books / 121 chapters / 484 planned lessons)

Core clinical ten: anatomy · medical-physiology · medical-biochemistry ·
histology · pathology · pharmacology · medical-microbiology ·
clinical-immunology · forensic-medicine · community-medicine.
Specialty-and-professional nine: internal-medicine · general-surgery ·
obstetrics-gynaecology · pediatrics · dentistry · nursing · pharmacy ·
veterinary-medicine · physiotherapy. The backlog's 14+ core lines map
one-to-one (biochemistry/microbiology/immunology carry the *medical*
register as sibling views of the biology shelf's general books — the
book ids distinguished as medical-biochemistry / medical-microbiology /
clinical-immunology), and the five professional lines map one-to-one.

## Sibling views and the no-duplication contract

The medical shelf owns the **clinical registers**: the general machinery
beneath every system is owned by the biology shelf's books and
cross-referenced per book (biochemistry → the chemistry shelf;
animal-physiology/anatomy → the biology shelf as the general view of the
same machinery); the pharmacology book owns the drug register for the
whole library (the plant-derived drug register cross-referenced to the
biology shelf's economic-botany); community-medicine owns the population
register with the surveillance/coverage arithmetic the biology shelf's
ecology book cross-references. The book-id near-misses were priced
(anatomy/id free, `biochem-` already the chemistry shelf's prefix — the
medical books take `mchem-`; `micro-` is microeconomics' — the medical
book takes `medmic-`; `hist-` free as `histo-`; `pharm-` the medical
pharmacology with `rx-` for the pharmacy book) per the reservation table
in the generator, verified against all existing written lesson ids.
