#!/usr/bin/env python3
"""gen_engineering_shelf.py — the Engineering full-shelf planning pass book
generator (owner directive, 2026-11-16: "create all things how like other
subjects like maths and cs create it for engineering with books topic same
way as like other subject" — the same method as the 2026-11-10 Mathematics
pass and the 2026-11-15 Computer Science pass).

38 books promoted to src/data/library/books/engineering/<slug>/book.ts,
status 'planned', ZERO lessons written. The authored plan data (chapters,
summaries, planned-lesson titles, positioning, research notes) lives in this
script; the emitter below writes the house-format book.ts files. Idempotent:
re-running regenerates every file deterministically.

The roster (SUBJECT_BACKLOG.md's Engineering section, syllabus-audited):
  Mechanical (12) · Electrical (8) · Electronics & Communication (9) ·
  Civil (9). Three backlog lines fold honestly onto existing shelf homes
  (Digital Electronics -> digital-logic-design; Microprocessors &
  Microcontrollers -> assembly-and-microprocessors; Circuit Theory +
  Network Analysis merged into one book). One line is ADDED beyond the
  backlog by the syllabus audit (Electromagnetic Fields and Waves — the
  GATE EE S3 + EC S8 register had no home on the ECE list; the QA-creation
  precedent of 2026-11-10).

Evidence base: docs/research/ENGINEERING_TOC_SURVEY.md (the four GATE 2026
syllabus PDFs downloaded and extracted this pass + canonical textbook arcs
web-checked, URLs in SOURCE_LOG.md). Gate: scripts/verify-engineering-
shelf-planning.ts.
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "src", "data", "library", "books", "engineering")

BOOKS = []


def book(export, bid, title, shelf_note, subtitle, level, description,
         accent, positioning, research, chapters):
    BOOKS.append(dict(export=export, bid=bid, title=title, shelf_note=shelf_note,
                      subtitle=subtitle, level=level, description=description,
                      accent=accent, positioning=positioning, research=research,
                      chapters=chapters))


def ch(slug, title, summary, lessons):
    return dict(slug=slug, title=title, summary=summary, lessons=lessons)


# ======================================================================
# PART 1 — MECHANICAL (12 books)
# ======================================================================

book(
    "engineeringMechanics", "engineering-mechanics", "Engineering Mechanics",
    "the first book of the Engineering shelf (Mechanical branch, the shelf's foundation)",
    "Statics to Lagrange — the equilibrium and motion of engineered bodies, honestly priced",
    "First-year engineering mechanics → second-year strength of materials readiness",
    "The shelf's foundation stone: everything mechanical, electrical and civil that follows \
assumes this book's discipline. Force vectors and the free-body diagram as the engineer's \
first instrument; equilibrium of particles and rigid bodies; moments, couples and force \
system resultants; structural analysis by trusses (joints and sections), frames and \
machines; friction with its honest applications — rolling resistance, belt-pulley, brakes, \
clutches, the screw jack and wedges; centroids, centres of gravity and area moments of \
inertia; virtual work as the elegant end of statics; then the dynamics arc — plane \
kinematics of particles and rigid bodies, force and acceleration, work-energy and \
impulse-momentum (linear and angular), and Lagrange's equations as the gateway to \
analytical mechanics. Cross-references Mathematical Methods for Engineering (the vector \
calculus) and hands off to Strength of Materials (Statics earns its stress) and Theory of \
Machines (the dynamics of engineered links).",
    ("#b45309", "#7c2d12"),
    "Engineering Mechanics owns the pure mechanics of rigid bodies — equilibrium and \
plane motion. Strength of Materials grows the deformable body from its statics; Theory of \
Machines applies its dynamics to links and gears; Lagrange's equation hands off to the \
mathematics shelf's variational arc (Mathematical Methods for Engineering). Physics \
mechanics belongs to the future Physics shelf (cross-reference when planned).",
    """- GATE 2026 ME Section 2 (ME_2026_Syllabus.pdf, downloaded + extracted this pass):
  'Engineering Mechanics: Free-body diagrams and equilibrium; friction and its
  applications including rolling friction, belt-pulley, brakes, clutches, screw jack,
  wedge, vehicles; trusses and frames; virtual work; kinematics and dynamics of rigid
  bodies in plane motion; impulse and momentum (linear and angular) and energy
  formulations; Lagrange's equation' — the whole line is this book's register.
- Hibbeler, Engineering Mechanics: Statics + Dynamics (the Pearson SI-edition TOC read
  this pass — force vectors, particle/rigid-body equilibrium, structural analysis,
  friction, centroids, virtual work, then the kinematics/kinetics arc).
- Beer & Johnston's Vector Mechanics for Engineers (both halves) web-checked as the
  second pole; the plane-mechanism dynamics wording follows the GATE register.""",
    [
        ch("the-statics-frame", "The Statics Frame",
           "The engineer's first discipline: units and the Newton (the honest SI census), \
force vectors in the plane and in space, the dot and cross products as working tools, \
resultants, and the free-body diagram — the single drawing habit that separates the \
engineer from the guesser. Equilibrium of a particle in two and three dimensions closes \
the frame.",
           ["The Free-Body Diagram: the Engineer's First Instrument",
            "Force Vectors and Their Resultants",
            "Equilibrium of a Particle: 2D and 3D"]),
        ch("moments-and-rigid-equilibrium", "Moments and Rigid-Body Equilibrium",
           "Moment of a force about a point and about an axis, couples and moment \
couples, moving a force along its line of action, distributed loads reduced to their \
resultants, and equilibrium of the rigid body in two and three dimensions — including \
two- and three-force members and the bearing reactions that real machines impose.",
           ["Moments, Couples and Their Algebra",
            "Equilibrium of the Rigid Body",
            "Distributed Loads and Their Resultants"]),
        ch("structural-analysis", "Structural Analysis",
           "The classic determinate structures: plane trusses by the method of joints and \
the method of sections (zero-force members read honestly), space trusses, frames and \
machines analysed member-by-member — every member a two-force member or not, said out \
loud. The chapter the civil shelf's Structural Engineering book leans on for its \
determinate catalogue.",
           ["Trusses: the Method of Joints",
            "Trusses: the Method of Sections",
            "Frames and Machines: Multi-force Members"]),
        ch("friction-and-its-applications", "Friction and Its Applications",
           "Dry friction from the Coulomb law with its honest limits; angles of friction \
and tipping-versus-sliding; then the application census the GATE register prices — \
wedges, the screw jack and self-locking threads, flat and V-belts over pulleys, journal \
and disc friction, brakes and clutches at mechanism level, and rolling resistance priced \
against sliding.",
           ["Dry Friction: Tipping versus Sliding",
            "Wedges and the Screw Jack",
            "Belt-Pulley Systems and Brake/Clutch Friction",
            "Rolling Resistance Priced"]),
        ch("centroids-and-inertia", "Centroids, Centre of Gravity and Moments of Inertia",
           "Centroids of lines, areas and volumes by integration and by composite parts; \
centres of gravity and mass; the theorems of Pappus-Guldinus; then area moments of \
inertia — rectangular and polar, parallel-axis and radius of gyration, products of \
inertia and Mohr-style principal axes — the geometric treasury every later beam, \
column and rotation analysis draws from.",
           ["Centroids by Composite Parts",
            "Theorems of Pappus-Guldinus",
            "Moments of Inertia and the Parallel-Axis Theorem",
            "Products of Inertia and Principal Axes"]),
        ch("virtual-work", "Virtual Work",
           "Statics without solving for reactions: the principle of virtual work stated \
honestly (a virtual displacement does no net work on an equilibrium system), applied to \
mechanisms, linked bodies and beams under moving loads, and the potential-energy \
stationarity reading — the elegant close of the statics half and the doorstep of \
analytical mechanics.",
           ["The Principle Stated and First Applied",
            "Machines and Linked Bodies by Virtual Work",
            "The Potential-Energy Reading"]),
        ch("kinematics-of-motion", "Kinematics of Particles and Rigid Bodies",
           "Rectilinear and curvilinear motion in the plane, the n-t and r-theta \
components, relative motion, and then rigid-body plane motion decomposed into \
translation, rotation about a fixed axis and general plane motion — the \
absolute/relative-velocity construction. The mathematics shelf's calculus and vectors are \
presupposed and cross-referenced.",
           ["Curvilinear Motion and Its Components",
            "Rotation About a Fixed Axis",
            "General Plane Motion: the Velocity Construction"]),
        ch("kinetics-force-and-acceleration", "Kinetics: Force and Acceleration",
           "Newton's second law for particles and for rigid bodies in plane motion \
(translation, fixed-axis rotation, general plane motion with the kinetic diagram drawn \
beside the free-body diagram), angular momentum of a rigid body, and the gyroscopic \
effect named here and priced fully in Theory of Machines.",
           ["The Kinetic Diagram Beside the Free-Body",
            "Plane Motion of Rigid Bodies",
            "Angular Momentum and the Gyroscopic Glimpse"]),
        ch("work-energy-and-impulse", "Work, Energy and Impulse-Momentum",
           "The energy formulation — work of a force and a couple, kinetic energy of \
bodies in plane motion, conservative forces and potential energy, conservation of \
energy and the work-energy relation — and the impulse-momentum formulation, linear and \
angular, impact of rigid bodies included. The formulation census the GATE register \
names: when each engine is the honest tool.",
           ["The Work-Energy Engine",
            "Conservative Forces and Energy Bookkeeping",
            "Linear and Angular Impulse-Momentum",
            "Impact of Rigid Bodies"]),
        ch("lagrange-and-the-doorstep", "Lagrange's Equations and the Doorstep",
           "Generalised coordinates, degrees of freedom and constraints; Lagrange's \
equations of motion for holonomic systems derived from the virtual-work principle and \
worked on particles, pendulums and simple linkages — the analytical-mechanics doorway \
the register requires. The synthesis maps the whole book and the doorsteps: Strength of \
Materials (deformable statics), Theory of Machines (mechanism dynamics), Vibrations in \
Theory of Machines, and the mathematics shelf's variational arc.",
           ["Generalised Coordinates and Constraints",
            "Lagrange's Equations, Derived and Worked",
            "The Synthesis: Four Formulations, One Mechanics",
            "The Doorstep: from Rigid to Deformable"]),
    ],
)

book(
    "strengthOfMaterials", "strength-of-materials", "Strength of Materials",
    "the second book of the Engineering shelf (Mechanical branch)",
    "How bodies carry load — stress, strain, torsion, bending, buckling and their honest crafts",
    "First mechanics of materials course → machine and structural design readiness",
    "The deformable body earned from Engineering Mechanics' statics: stress and strain \
with the elastic constants and Poisson's ratio; the stress-strain diagram read honestly \
on real materials with universal-testing-machine and hardness/impact testing; axial \
members with statically indeterminate assemblies, thermal effects and stress \
concentrations; torsion of circular shafts with power transmission; shear-force and \
bending-moment diagrams as a fluent craft; the flexure formula and bending of beams; \
shearing stresses in beams and the shear centre; transformation of stress and strain \
with Mohr's circle for both planes and strain-gauge rosettes; deflection of beams by \
double integration, Macaulay's method and moment-area; thin cylinders; Euler's theory of \
columns; and the energy methods (Castigliano) that close the mechanics. Cross-references \
Engineering Mechanics (the equilibrium engine), Materials Science (the microstructure \
beneath), Machine Design (the factors of safety this book prices) and hands off to \
Structural Engineering on the civil shelf for indeterminate analysis and design codes.",
    ("#a16207", "#78350f"),
    "Strength of Materials owns the deformable body of simple members. Machine Design \
consumes it for element design; Structural Engineering (civil) consumes it for determinate \
beams and grows its own indeterminate machinery; Materials Science owns the \
microstructure story; thin-vessel and thick-cylinder extremes route here; testing \
cross-references Materials Science's testing chapters.",
    """- GATE 2026 ME Section 2, the 'Mechanics of Materials' line (ME_2026_Syllabus.pdf,
  extracted this pass): 'Stress and strain, elastic constants, Poisson's ratio; Mohr's
  circle for plane stress and plane strain; thin cylinders; shear force and bending
  moment diagrams; bending and shear stresses; concept of shear centre; deflection of
  beams; torsion of circular shafts; Euler's theory of columns; energy methods; thermal
  stresses; strain gauges and rosettes; testing of materials with universal testing
  machine; testing of hardness and impact strength' — every phrase is a planned lesson.
- GATE 2026 CE Section 2 'Solid Mechanics' line cross-checked (the civil register's
  subset — determinate beams, simple bending, uniform torsion, buckling).
- Beer, Johnston, DeWolf & Mazurek, Mechanics of Materials (the full Library of Congress
  catdir TOC read this pass: concept of stress; stress and strain under axial loading;
  torsion; pure bending; analysis and design of beams for bending; shearing stresses;
  transformations; principal stresses; deflection; columns; energy methods).
- Gere & Goodno web-checked as the second pole; Timoshenko's classic arc named.""",
    [
        ch("stress-the-concept", "Stress: the Concept",
           "Internal forces revealed by sectioning; normal, shear and bearing stress with \
their units and sign conventions; stress on an oblique plane under axial loading; the \
components of stress under general loading; analysis versus design as two honest \
postures; and the design considerations that turn a stress into a dimension.",
           ["Sectioning a Body: the Method of Internal Forces",
            "Normal, Shear and Bearing Stress",
            "Stress on the Oblique Plane"]),
        ch("strain-and-the-elastic-constants", "Strain and the Elastic Constants",
           "Normal strain under axial loading; the stress-strain diagram for ductile and \
brittle materials read on a real test — proportional limit, yield, strain hardening, \
necking, true stress and true strain; Hooke's law, the modulus E, Poisson's ratio and \
the shear modulus with the relation among them; the universal testing machine, \
hardness and impact testing as the laboratory census; elastic versus plastic behaviour \
and fatigue named.",
           ["The Stress-Strain Diagram, Read Honestly",
            "Hooke, Poisson and the Shear Relation",
            "The Testing Laboratory: UTM, Hardness, Impact"]),
        ch("axial-members", "Axial Members",
           "Deformations under axial loading; statically indeterminate assemblies solved \
by compatibility; problems with temperature changes; Saint-Venant's principle, stress \
concentrations at discontinuities, and multiaxial loading with the generalised Hooke's \
law and bulk modulus; pressure-vessel and composite-member problems priced.",
           ["Indeterminate Assemblies by Compatibility",
            "Thermal Stresses and Their Bookkeeping",
            "Saint-Venant, Stress Concentrations, Multiaxial Loading"]),
        ch("torsion-of-circular-shafts", "Torsion of Circular Shafts",
           "The torsion formula earned from the geometry of a twisted circular shaft; \
angle of twist and power transmission; statically indeterminate shafts; design of \
transmission shafts; stress concentrations; and the honest limits — noncircular members \
and thin-walled hollow shafts named, not hidden.",
           ["The Torsion Formula Earned",
            "Angle of Twist and Power Transmission",
            "Indeterminate Shafts and Design",
            "The Honest Limits: Noncircular and Thin-Walled"]),
        ch("shear-force-and-bending-moment", "Shear Force and Bending Moment Diagrams",
           "The beam vocabulary (support and load types); internal forces in beams; \
shear and bending-moment diagrams drawn fluently with the load-shear-moment \
differential relations; singularity functions as the compact notation; design of \
prismatic beams for bending introduced — the craft every later structural and machine \
chapter assumes.",
           ["The Diagrams as a Fluent Craft",
            "Load, Shear and Moment: the Differential Relations",
            "Singularity Functions for Beam Bookkeeping"]),
        ch("bending-stresses", "Bending Stresses in Beams",
           "Pure bending of a symmetric member; the flexure formula derived from the \
strain geometry; section modulus and design; bending of members of several materials; \
eccentric axial loading and unsymmetric bending; and the flexural-shear formula with \
shear flow, shear in common cross-sections and the shear centre concept priced.",
           ["The Flexure Formula Earned",
            "Section Modulus and Beam Design",
            "Shearing Stresses and Shear Flow",
            "The Shear Centre"]),
        ch("transformations-mohr", "Transformation of Stress and Strain",
           "Plane stress transformation by the equations and by Mohr's circle — \
constructed honestly, read for principal stresses and maximum shear; plane strain \
transformation with Mohr's circle again; strain measurement by gauges and rosettes \
resolved into principal strains and stresses; thin cylinders under pressure as the \
first transformation application.",
           ["Mohr's Circle for Plane Stress",
            "Mohr's Circle for Plane Strain",
            "Strain Gauges and Rosettes",
            "Thin Cylinders Under Pressure"]),
        ch("deflection-of-beams", "Deflection of Beams",
           "The elastic curve; deflection and slope by the double-integration method \
with boundary and continuity conditions; Macaulay's method for discontinuous loads; \
the moment-area theorems; statically indeterminate beams by superposition; and \
non-prismatic beams named honestly.",
           ["The Elastic Curve and Double Integration",
            "Macaulay's Method",
            "The Moment-Area Theorems",
            "Indeterminate Beams by Superposition"]),
        ch("columns-and-energy-methods", "Columns, Buckling and Energy Methods",
           "Euler's theory of columns for the pin-ended case and every end condition \
census; slenderness ratio and the design implications; eccentric loading and secant \
formula named; then the energy close — strain energy of members, Castigliano's theorem \
applied to deflections, and impact loading priced.",
           ["Euler's Column and the End-Condition Census",
            "Slenderness: Buckling versus Crushing",
            "Castigliano's Theorem",
            "Strain Energy and Impact Loading"]),
    ],
)

book(
    "theoryOfMachines", "theory-of-machines", "Theory of Machines",
    "the third book of the Engineering shelf (Mechanical branch)",
    "Machines as mechanisms — velocity, acceleration, gears, governors, balance and vibration",
    "Second-year theory of machines and vibrations → machine design readiness",
    "The dynamics of engineered links: kinematic pairs, chains and inversions with \
degrees of freedom; velocity analysis by the instantaneous-centre and \
relative-velocity methods; acceleration analysis including the Coriolis engine; cams \
and followers designed against displacement diagrams; toothed gearing from the law of \
gearing to tooth interference; gear trains — simple, compound and the epicyclic craft; \
flywheels against turning-moment diagrams and the governor family; balancing of \
rotating and reciprocating masses; the gyroscopic couple priced on vehicles; and the \
vibrations arc — free and forced vibration of single-degree-of-freedom systems, damping \
and resonance, vibration isolation, whirling and critical speeds of shafts. \
Cross-references Engineering Mechanics (the kinetics engine), Machine Design (gears and \
brakes at design level) and hands off to Machine Design and Robotics and Automation.",
    ("#d97706", "#92400e"),
    "Theory of Machines owns mechanism kinematics, gearing, governors, balancing, \
gyroscopics and vibrations. Machine Design grows the element design (gear tooth as a \
loaded member, brake capacity); Engineering Mechanics owns the bare kinetics theorems; \
Robotics and Automation inherits the kinematic machinery for manipulators; the vibrations \
arc serves every branch that spins or oscillates.",
    """- GATE 2026 ME Section 2, the 'Theory of Machines' + 'Vibrations' lines
  (ME_2026_Syllabus.pdf, extracted this pass): displacement, velocity and acceleration
  analysis of plane mechanisms; dynamic analysis of linkages; cams; gears and gear
  trains; flywheels and governors; balancing of reciprocating and rotating masses;
  gyroscope; then free and forced vibration of SDOF systems, damping, vibration
  isolation, resonance, critical speeds of shafts — both lines are this book's
  register, vibrations hosted as its own chapter-pair.
- Khurmi & Gupta, Theory of Machines (Google Books contents read this pass:
  kinematics/kinesis of motion, SHM, simple mechanisms, velocity in mechanisms by
  instantaneous centres, cams, toothed gearing, gear trains, gyroscopic couple,
  inertia forces, turning moment diagrams, flywheels, governors, brakes) — the Indian
  canonical arc; Rattan's Theory of Machines named as the second pole.
- CE Section 2's 'Free Vibrations of undamped SDOF system' line cross-referenced (the
  civil register leans on the same chapter-pair).""",
    [
        ch("mechanisms-and-inversion", "Mechanisms and Inversion",
           "Links, kinematic pairs and chains; the four-bar chain and its inversions \
(crank-rocker, double-crank, double-rocker read from Grashof's law); the slider-crank \
chain and its inversions; degrees of freedom by Gruebler's criterion; mechanical \
advantage and transmission angle — the vocabulary every machine analysis speaks.",
           ["Kinematic Pairs and Chains",
            "The Four-Bar Family and Grashof's Law",
            "The Slider-Crank and Its Inversions",
            "Degrees of Freedom by Gruebler"]),
        ch("velocity-analysis", "Velocity Analysis",
           "Velocity of mechanism points by the instantaneous-centre method (the \
Kennedy-Arnhold theorem locating the centres) and by the relative-velocity method \
(velocity polygons); the velocity-image principle; and worked engines and quick-return \
mechanisms as the honest test beds.",
           ["The Instantaneous-Centre Method",
            "The Relative-Velocity Method",
            "Velocity Images and Worked Mechanisms"]),
        ch("acceleration-analysis", "Acceleration Analysis",
           "Acceleration polygons with the total, tangential and centripetal components; \
the Coriolis engine — when it appears, how it is priced, worked on slotted-link and \
quick-return mechanisms; Klein's construction for the slider-crank; and dynamic \
analysis of linkages by inertia forces (D'Alembert) leading into balancing.",
           ["Acceleration Polygons",
            "The Coriolis Engine",
            "Klein's Construction",
            "Inertia Forces in Linkages: D'Alembert"]),
        ch("cams-and-followers", "Cams and Followers",
           "Cam nomenclature and follower types; displacement diagrams (uniform, SHM, \
uniform acceleration-retardation, cycloidal) with their velocity/acceleration prices; \
cam profiles constructed graphically for translating and oscillating followers; \
pressure angle and undercutting named honestly.",
           ["Displacement Diagrams and Their Prices",
            "Constructing the Cam Profile",
            "Pressure Angle and Undercutting"]),
        ch("toothed-gearing", "Toothed Gearing",
           "The law of gearing; gear tooth terminology (module, circular pitch, addendum \
circle); involute versus cycloidal profiles with the involute's honest victory; \
velocity ratio and slip; tooth interference and undercutting; arc of contact; and the \
efficiency-and-friction glance GATE prices.",
           ["The Law of Gearing and the Involute",
            "Tooth Terminology and Interference",
            "Velocity Ratio Bookkeeping"]),
        ch("gear-trains", "Gear Trains",
           "Simple, compound and reverted trains with train-value arithmetic; the \
epicyclic craft — tabular and algebraic methods worked on planetary drives; torque \
relations in epicyclic trains; and the applications census (automotive gearboxes, \
differentials) that makes the arithmetic worth learning.",
           ["Simple and Compound Trains",
            "The Epicyclic Craft",
            "Torque in Planetary Drives"]),
        ch("flywheels-and-governers", "Flywheels, Turning Moments and Governors",
           "Turning-moment diagrams against crank angle; coefficient of fluctuation of \
speed and energy; flywheel rim and spoke sizing for engines and presses; then the \
governor family — Porter, Proell, Hartnell and Wilson-Hartnell with sensitiveness, \
stability, isochronism and hunting priced; governor effort and power.",
           ["Turning-Moment Diagrams and the Flywheel",
            "The Governor Family",
            "Sensitiveness, Stability, Hunting"]),
        ch("balancing", "Balancing of Rotating and Reciprocating Masses",
           "Static and dynamic unbalance; balancing of several masses in different \
planes by the two-plane correction craft; balancing of a single cylinder and \
multi-cylinder inline engines — primary and secondary forces and couples; V-engines \
and radial configurations glanced; partial balancing with its honest residue.",
           ["Two-Plane Correction of Rotating Masses",
            "Reciprocating Engines: Primary and Secondary",
            "Partial Balancing and the Honest Residue"]),
        ch("gyroscopic-couple", "The Gyroscopic Couple",
           "Angular momentum of a spinning body; the gyroscopic couple and precessional \
motion derived; priced on ships (pitching and rolling), aircraft (turning) and \
motorcycles and cars in a turn — the effects students meet in GATE numericals; and the \
stability of four-wheel versus two-wheel vehicles under gyroscopic action.",
           ["The Couple Derived",
            "Ships, Aircraft and Turning Vehicles",
            "Gyroscopic Stability Priced"]),
        ch("vibrations", "Vibrations",
           "Free vibration of the single-degree-of-freedom system (natural frequency by \
three engines: stiffness, energy, Rayleigh); damped free vibration with the damping \
factor and the three regimes; forced vibration under harmonic excitation with the \
dynamic magnifier; resonance and transmissibility — vibration isolation as the honest \
engineering answer; whirling and critical speed of shafts; and the multi-degree \
glimpse named for later books.",
           ["Natural Frequency by Three Engines",
            "Damping: the Three Regimes",
            "Forced Vibration and the Magnifier",
            "Isolation and Transmissibility",
            "Critical Speed and Whirling of Shafts"]),
    ],
)

book(
    "machineDesign", "machine-design", "Machine Design",
    "the fourth book of the Engineering shelf (Mechanical branch)",
    "Design as a discipline — safety, fatigue and the honest sizing of machine elements",
    "First design course → professional element-design readiness",
    "The design discipline itself: the design process, codes and standards, factor of \
safety and its honest choice; design for static loading with the failure theories \
(maximum principal stress, shear, distortion energy); stress concentration factors; \
then fatigue — the S-N diagram, endurance limit and its modifying factors, fluctuating \
stresses by Goodman and Gerber/Soderberg, cumulative damage named; and the element \
catalogue priced by GATE — bolted, riveted and welded joints; shafts under combined \
bending and torsion with keys and couplings; spur, helical, bevel and worm gearing as \
loaded members (the Lewis form factor and wear loads); sliding and rolling-contact \
bearings with the Petroff/Sommerfeld glimpse and bearing-life arithmetic; springs \
(tension/compression, torsion); brakes and clutches; and the design synthesis that \
closes the mechanical branch's core. Cross-references Strength of Materials (the stress \
engines), Materials Science (material selection) and Theory of Machines (the kinematics \
behind every element).",
    ("#be123c", "#881337"),
    "Machine Design owns the sizing of machine elements under static and fatigue \
loading. Strength of Materials owns the underlying stress machinery; Materials Science \
owns microstructure and heat treatment; Theory of Machines owns the kinematic \
catalogue; the bolted/riveted/welded joint craft is shared honestly with Structural \
Engineering (civil), which routes its steel-connection design through IS codes while \
this book prices the machine idiom.",
    """- GATE 2026 ME Section 2, the 'Machine Design' line (ME_2026_Syllabus.pdf,
  extracted this pass): 'Design for static and dynamic loading; failure theories;
  fatigue strength and the S-N diagram; principles of the design of machine elements
  such as bolted, riveted and welded joints; shafts, gears, rolling and sliding contact
  bearings, brakes and clutches, springs' — the whole line is this book's chapter
  register.
- Shigley's Mechanical Engineering Design (Budynas & Nisbett) — the Parts I-IV
  chapter arc web-checked this pass (Introduction/Materials/Load and Stress Analysis/
  Deflection and Stiffness; Failures from Static and Variable Loading; then the
  elements: shafts, fasteners, welding, springs, bearings, gears, clutches/brakes).
- Khurmi & Gupta, Machine Design (the Indian canonical arc, 30+ element chapters
  confirmed via the open PDF TOC read this pass).""",
    [
        ch("the-design-discipline", "The Design Discipline",
           "Design versus analysis; the design process from specification to drawing; \
standards and codes as the profession's memory; the factor of safety priced honestly \
against uncertainty in material, load and manufacture; allowable stresses and the \
design equation; and the economic and manufacturing considerations that make a sized \
part a real part.",
           ["The Design Process and Its Codes",
            "Factor of Safety Priced Honestly",
            "From Stress to Dimension"]),
        ch("static-loading-and-failure-theories", "Static Loading and the Failure Theories",
           "Stress states under combined loading; ductile versus brittle failure read \
from the material census; the maximum-principal-stress, maximum-shear (Tresca) and \
distortion-energy (von Mises) theories priced on worked stress states; stress \
concentration factors in design; and the honest choice between theories by material \
class.",
           ["Ductile versus Brittle Failure",
            "Tresca and von Mises Priced",
            "Stress Concentration in Design"]),
        ch("fatigue-and-the-s-n-diagram", "Fatigue and the S-N Diagram",
           "Fatigue as a named mechanism (crack initiation and growth); the S-N diagram \
and the endurance limit; the modifying factors — surface, size, load, temperature; \
fluctuating stress vocabulary (mean and amplitude); the Goodman line, Soderberg and \
Gerber designs; stress concentration under fatigue; and cumulative damage by \
Miner's rule priced.",
           ["The Endurance Limit and Its Modifiers",
            "Goodman, Soderberg, Gerber",
            "Cumulative Damage by Miner's Rule"]),
        ch("joints-bolted-riveted-welded", "Joints: Bolted, Riveted and Welded",
           "Threaded fasteners and the bolt as a preloaded spring — the joint diagram \
under external load; bolt strength grades and preloading discipline; riveted joints \
(butt and lap, efficiency); welded joints — butt and fillet welds priced by the \
throat, treated under combined loading; eccentric loaded welds and the honest \
inspection census.",
           ["The Bolt as a Preloaded Spring",
            "Riveted Joints and Their Efficiency",
            "Fillet and Butt Welds Priced",
            "Eccentric Loads on Weld Groups"]),
        ch("shafts-keys-couplings", "Shafts, Keys and Couplings",
           "Shafts under combined bending and torsion — the design equation from the \
distortion-energy theory with shock and fatigue factors; stepped shafts, keyways and \
stress concentrations; keys (square, flat, splines) priced in shear and bearing; \
rigid and flexible couplings; and shaft deflection and critical-speed cross-reference \
to Theory of Machines' whirling arc.",
           ["The Shaft Design Equation",
            "Keys and Splines Priced",
            "Couplings and Their Honest Flexibility"]),
        ch("bearings", "Bearings",
           "The two worlds: sliding-contact (journal) bearings — Petroff's equation, \
the bearing characteristic number, Sommerfeld's glimpse, bearing materials and \
lubrication regimes; and rolling-contact bearings — the life-load arithmetic \
(L10), equivalent dynamic load with radial/thrust factors, static capacity, and \
mounting/preload practice.",
           ["Journal Bearings: Petroff and Beyond",
            "Rolling Bearings: the L10 Arithmetic",
            "Selection, Mounting, Preload"]),
        ch("gears-in-design", "Gears in Design",
           "The gear tooth as a loaded member — the Lewis bending equation with the \
form factor, the Barth velocity modification; wear and dynamic loads (the \
Buckingham glimpse); spur, helical, bevel and worm gearing each priced by their own \
force components; gear materials and heat treatment cross-referenced; back to \
Machine Theory's kinematics for the geometry.",
           ["The Lewis Form Factor",
            "Wear and Dynamic Loads",
            "Helical, Bevel and Worm Forces",
            "Gear Materials and Lubrication"]),
        ch("springs-brakes-clutches", "Springs, Brakes and Clutches",
           "Helical springs — stress, deflection, Wahl's correction, surge and design \
arithmetic; torsion and leaf springs glanced; plate and disc clutches with uniform \
wear versus uniform pressure; drum brakes with the self-energising geometry priced \
honestly; band brakes; and the energy dissipation question every friction device must \
answer.",
           ["Helical Springs: Wahl's Correction",
            "Plate Clutches: Wear versus Pressure",
            "Brakes and Self-Energising Geometry"]),
        ch("design-synthesis-and-the-doorstep", "The Design Synthesis and the Doorstep",
           "The synthesis map — one page from specification through failure theory to \
sized elements; the design-project census (a gearbox, a bracket, a coupling priced \
end-to-end); the codes-and-standards census (IS/ISO/DIN families named); and the \
doorsteps: Manufacturing Processes (the parts must be makeable), CAD/CAM (the parts \
must be modelled) and the professional design review.",
           ["The Map: Specification to Element",
            "A Gearbox Priced End-to-End",
            "The Standards Census",
            "The Doorstep: Makeable and Modelled"]),
    ],
)

book(
    "thermodynamics", "thermodynamics", "Thermodynamics",
    "the fifth book of the Engineering shelf (Mechanical branch)",
    "Energy, entropy and the cycles that run the world — the Cengel arc at engineering depth",
    "First thermodynamics course → power, refrigeration and IC-engine readiness",
    "The energy discipline: systems, processes and the zeroth law; the first law for \
closed systems with work and heat as path functions; properties of pure substances \
read from tables and charts (the T-v and P-v census, quality, the ideal-gas honest \
limits); control volumes at steady state — nozzles, turbines, compressors, pumps, \
heat exchangers, throttles — and unsteady fills; the second law as the direction law \
(Kelvin-Planck and Clausius, reversibility, the Carnot ceiling); entropy with the \
Clausius inequality, the TdS relations and isentropic processes; exergy and \
irreversibility; gas power cycles — Otto, Diesel, dual and Brayton with regeneration \
and reheat; vapour power and refrigeration cycles (Rankine and its improvements, \
vapour-compression refrigeration and heat pumps); gas mixtures and psychrometry with \
the psychrometric chart's honest processes; air-standard engines and compressors; \
compressible flow through nozzles; and the thermodynamic property relations that close \
the science. Cross-references Mathematical Methods for Engineering, Heat Transfer (the \
rate science to this book's state science) and hands off to Fluid Mechanics and \
Renewable Energy.",
    ("#dc2626", "#7f1d1d"),
    "Thermodynamics owns the state-and-cycle science. Heat Transfer owns the rate \
science (its conduction/convection/radiation engines presuppose this book's property \
census); Fluid Mechanics owns the flow science (compressible-flow basics live here for \
the nozzle arcs, cross-referenced both ways); Renewable Energy prices its cycles here; \
the Mathematics shelf's Mathematical Methods for Engineering owns the partial-derivative \
machinery of property relations.",
    """- GATE 2026 ME Section 3 (ME_2026_Syllabus.pdf, extracted this pass): the
  Thermodynamics line (systems and processes; pure substances; ideal and real gases;
  zeroth/first/second laws; work and heat in processes; property charts and tables;
  availability and irreversibility; thermodynamic relations) + the Applications line
  (compressors; vapour and gas power cycles with regeneration and reheat; Otto/Diesel/
  dual; vapour and gas refrigeration and heat pumps; moist air and the psychrometric
  chart; IC engines' air-standard cycles) — both lines are this book's register.
- Cengel & Boles, Thermodynamics: An Engineering Approach 10e — the FULL 18-chapter
  TOC read this pass from the McGraw-Hill feature page (Introduction; Energy; Pure
  Substances; Closed Systems; Control Volumes; Second Law; Entropy; Entropy Analysis;
  Exergy; Gas Power Cycles; Vapour and Combined Power Cycles; Refrigeration; Property
  Relations; Gas Mixtures; Gas-Vapour Mixtures and Air-Conditioning; Chemical
  Reactions; Chemical and Phase Equilibrium; Compressible Flow).
- Sonntag & Borgnakke named as the second pole; the compressible-flow chapter hands
  its gas-dynamics depth to Fluid Mechanics.""",
    [
        ch("the-energy-worldview", "The Energy Worldview",
           "Systems and their boundaries (closed, open, isolated); state, process and \
cycle; extensive versus intensive properties; the zeroth law and temperature scales; \
pressure, specific volume and the honest unit census; and the continuum idea priced \
for engineering work.",
           ["Systems, Boundaries, Properties",
            "The Zeroth Law and Temperature",
            "Processes and Cycles"]),
        ch("first-law-closed-systems", "The First Law for Closed Systems",
           "Work and heat as path functions with their sign conventions; kinetic and \
potential energy bookkeeping; internal energy and the closed-system energy balance; \
enthalpy defined honestly; specific heats and their relations; and cyclic processes \
reading back to the energy-conservation law.",
           ["Work and Heat as Path Functions",
            "The Closed-System Energy Balance",
            "Specific Heats and Enthalpy"]),
        ch("pure-substances", "Properties of Pure Substances",
           "Phase change at constant pressure; the T-v and P-v diagrams with the \
saturation dome; quality and compressed/liquid-vapour mixtures; the steam tables read \
fluently (the craft every numerical needs); the ideal-gas equation and when it lies; \
and compressibility charts for the honest real-gas middle.",
           ["The Saturation Dome Read Honestly",
            "Quality and the Steam Tables",
            "The Ideal Gas and Its Honest Limits"]),
        ch("control-volumes", "Control Volumes",
           "The steady-flow engineering devices priced one by one — nozzles and \
diffusers, turbines and compressors, pumps, heat exchangers, mixing chambers, \
throttles — with the mass and energy balances set honestly; then unsteady \
control-volume work: filling and emptying tanks; air and gas compressors with \
multistage intercooling.",
           ["The Steady-Flow Device Census",
            "Throttles and Mixing Chambers",
            "Unsteady Flows: Filling and Emptying",
            "Compressors and Intercooling"]),
        ch("the-second-law", "The Second Law",
           "Direction as a physical law: Kelvin-Planck and Clausius statements shown \
equivalent; thermal reservoirs; reversible and irreversible processes with the honest \
census of irreversibilities; the Carnot cycle and the Carnot principles; the \
thermodynamic temperature scale earned; and the quality of energy named.",
           ["Kelvin-Planck and Clausius, Equivalent",
            "Reversibility and Its Honest Census",
            "The Carnot Ceiling"]),
        ch("entropy", "Entropy",
           "The Clausius inequality; entropy as a property earned from the cycle \
integral; the TdS relations; entropy change of ideal gases and pure substances; \
isentropic processes as the honest ideal; entropy generation priced on real devices; \
and the entropy balance for control volumes with the steady-state entropy accounting.",
           ["Entropy Earned from the Inequality",
            "The TdS Relations",
            "Isentropic Processes and Efficiency",
            "Entropy Generation Priced"]),
        ch("exergy-and-irreversibility", "Exergy and Irreversibility",
           "Availability (exergy) as the work potential relative to the dead state; \
exergy destroyed = entropy generated x ambient temperature; second-law efficiency as \
the honest efficiency; exergy accounting for closed systems and control volumes; and \
the availability and irreversibility vocabulary the GATE register prices.",
           ["Exergy: the Work Potential",
            "Exergy Destroyed and Entropy Generated",
            "Second-Law Efficiency"]),
        ch("gas-power-cycles", "Gas Power Cycles",
           "The air-standard craft and its honest assumptions; Otto, Diesel and dual \
cycles compared at fixed compression and heat input; the Brayton cycle with \
regeneration, intercooling and reheat priced against the simple cycle; gas turbines \
and jet-engine glimpses; and the engine parameters (mean effective pressure, specific \
fuel consumption named).",
           ["Air-Standard Craft: Otto, Diesel, Dual",
            "The Brayton Cycle",
            "Regeneration, Reheat, Intercooling",
            "The Cycle Comparison Census"]),
        ch("vapour-power-and-refrigeration", "Vapour Power and Refrigeration Cycles",
           "The Rankine cycle on the T-s diagram with the steam-table craft; reheat and \
regenerative feedwater heating priced; the reversed cycles — vapour-compression \
refrigeration with its P-h diagram and COP arithmetic, absorption refrigeration \
glanced, the heat pump as a reversed cycle with its honest COP; and gas \
refrigeration (reversed Brayton).",
           ["The Rankine Cycle and Its Craft",
            "Reheat and Regeneration",
            "Vapour-Compression Refrigeration",
            "Heat Pumps and Gas Refrigeration"]),
        ch("mixtures-and-psychrometry", "Mixtures and Psychrometry",
           "Gas mixtures by mass and mole; partial pressures and the mixture's apparent \
gas constant; gas-vapour mixtures — dry air and water vapour; the psychrometric \
properties (wet- and dry-bulb, humidity ratio, relative humidity, dew point, enthalpy) \
all on the one chart; the process census — sensible heating/cooling, humidification, \
adiabatic saturation and evaporative cooling, mixing of streams; and air-conditioning \
priced.",
           ["Gas Mixtures Bookkept",
            "The Psychrometric Chart, Read Fluently",
            "The Process Census",
            "Air-Conditioning Priced"]),
        ch("relations-and-compressible-flow", "Property Relations, Compressible Flow and the Doorstep",
           "The Maxwell relations and the Clapeyron equation as the thermodynamic \
property-relations core; the general relations for du, dh, ds; then compressible flow \
— the speed of sound, isentropic flow through nozzles and diffusers with the \
critical-pressure ratio and normal shocks named (its full gas-dynamics depth handed \
to Fluid Mechanics); the synthesis map; and the doorsteps: Heat Transfer (rate \
science), Fluid Mechanics (flow science), Renewable Energy (the cycles' future).",
           ["The Maxwell Relations",
            "Nozzles, Diffusers, Choking",
            "The Synthesis: States to Cycles",
            "The Doorstep: Rates and Flows"]),
    ],
)

book(
    "fluidMechanics", "fluid-mechanics", "Fluid Mechanics",
    "the sixth book of the Engineering shelf (Mechanical branch)",
    "Fluids at rest, in motion and against surfaces — from hydrostatics to boundary layers",
    "First fluid mechanics course → thermal/turbomachinery/hydraulics readiness",
    "The flow science: fluid properties (viscosity, surface tension, vapour pressure, \
compressibility) with the continuum honest note; fluid statics — pressure and its \
measurement, hydrostatic forces on plane and curved surfaces, buoyancy and the \
stability of floating bodies; fluid kinematics (flow descriptions, streamlines and \
stream tubes, the material derivative, Reynolds transport theorem); control-volume \
analysis of mass, momentum and energy with Bernoulli's equation and its honest limits \
and the energy/piezometric grade lines; differential analysis — the continuity and \
Navier-Stokes equations at an engineering introduction, with exact solutions glanced; \
dimensional analysis and similitude (Buckingham Pi, model testing); viscous internal \
flow — laminar pipe flow, turbulence, major and minor losses; boundary layers \
(growth, separation, the drag and lift concepts); elementary compressible flow; and \
the turbomachinery principle chapter that hands its machines to Hydraulics (civil) \
and Thermodynamics (steam and gas turbines). Cross-references Mathematical Methods \
for Engineering, Thermodynamics (property census), Hydraulics (the applied water \
craft) and hands off to Heat Transfer (convective machinery).",
    ("#0e7490", "#155e75"),
    "Fluid Mechanics owns the fundamentals of fluid behaviour for every branch. \
Hydraulics (civil) owns the applied water craft — open-channel flow, flow measurement \
and hydraulic machines — with the contract stated there; Thermodynamics owns the \
cycle science and steam/gas turbines; Heat Transfer owns convective machinery; \
Renewable Energy's hydro and wind chapters route their flows through here; the CE \
register's boundary-layer and lift/drag lines cross-reference this book.",
    """- GATE 2026 ME Section 3, the 'Fluid Mechanics' line (ME_2026_Syllabus.pdf,
  extracted this pass): 'Fluid properties; fluid statics, forces on submerged bodies,
  stability of floating bodies; control-volume analysis of mass, momentum and energy;
  fluid acceleration; differential equations of continuity and momentum; Bernoulli's
  equation; dimensional analysis; viscous flow of incompressible fluids, boundary
  layer, elementary turbulent flow, flow through pipes, head losses in pipes, bends
  and fittings; basics of compressible fluid flow' — the whole line is this book's
  register.
- GATE 2026 CE Section 4 'Fluid Mechanics' line cross-checked (the civil subset —
  properties, statics, continuity/momentum/energy, potential/laminar/turbulent flow,
  pipe networks, boundary-layer concept, lift and drag concept) and routed honestly:
  fundamentals here, channel craft to Hydraulics.
- Cengel & Cimbala, Fluid Mechanics: Fundamentals and Applications — the chapter arc
  read this pass from the open TOC (Introduction and Basic Concepts; Properties of
  Fluids; Pressure and Fluid Statics; Fluid Kinematics; Bernoulli and Energy
  Equations; Momentum Analysis; Dimensional Analysis; Internal Flow; Differential
  Analysis; Approximate Solutions; External Flow; Compressible Flow; Open-Channel
  Flow noted as the civil handoff).
- Modi & Sethi's classic Indian arc named as the second pole (its machine chapters
  route to Hydraulics); Munson and White named.""",
    [
        ch("the-fluid-idea", "The Fluid Idea",
           "What makes a fluid a fluid (the no-shape answer); the continuum hypothesis \
and its honest limits; fluid properties priced — density, specific weight, viscosity \
(Newton's law of viscosity and the Newtonian census), compressibility and bulk \
modulus, surface tension with its capillary engines, vapour pressure and cavitation \
named early.",
           ["The No-Shape Answer and the Continuum",
            "Viscosity: Newton's Law and Its Census",
            "Surface Tension and Capillarity",
            "Vapour Pressure and Cavitation Named"]),
        ch("fluid-statics", "Fluid Statics",
           "Pressure at a point and its measurement (barometers, manometers — \
differential and inclined — bourdon gauges); hydrostatic force on plane surfaces \
(the centre of pressure craft) and on curved surfaces; buoyancy and Archimedes; \
stability of floating and submerged bodies with metacentric height — the GATE \
numerical heart of the chapter.",
           ["Manometers: the Measurement Craft",
            "Hydrostatic Forces on Plane Surfaces",
            "Curved Surfaces and Buoyancy",
            "Stability and the Metacentre"]),
        ch("fluid-kinematics", "Fluid Kinematics",
           "Eulerian versus Lagrangian descriptions; streamlines, pathlines and streak \
lines distinguished honestly; flow classification (steady/unsteady, uniform/non- \
uniform, laminar/turbulent, compressible/incompressible); acceleration of a fluid \
particle (local and convective); the stream function and velocity potential named; \
vorticity and rotation priced; and the Reynolds transport theorem as the bridge to \
control-volume thinking.",
           ["Descriptions and Lines of Flow",
            "The Material Derivative: Local + Convective",
            "Stream Function and Velocity Potential",
            "The Reynolds Transport Theorem"]),
        ch("control-volume-analysis", "Control-Volume Analysis",
           "The continuity equation for fixed and moving control volumes; the linear \
momentum equation priced on bends, vanes and nozzles (the force engine); the \
moment-of-momentum equation glanced for machines; the energy equation with Bernoulli \
as its frictionless limit — its restrictions stated honestly; and the energy and \
piezometric grade lines drawn on real systems.",
           ["Continuity for Control Volumes",
            "The Momentum Engine: Bends, Vanes, Nozzles",
            "Bernoulli and Its Honest Limits",
            "The Grade Lines Drawn"]),
        ch("differential-analysis", "Differential Analysis",
           "The differential continuity equation in cartesian and cylindrical forms; \
the stream-function route to incompressibility; the Navier-Stokes equations \
introduced and read term-by-term (not hidden, not over-claimed); exact solutions \
glanced (Couette and Poiseuille flows); the Euler equations as the inviscid limit; \
and the honest verdict on when differential analysis earns its keep in engineering \
practice.",
           ["Differential Continuity",
            "Navier-Stokes Read Term-by-Term",
            "Couette and Poiseuille Earned",
            "The Honest Verdict on Differential Routes"]),
        ch("dimensional-analysis-and-similitude", "Dimensional Analysis and Similitude",
           "Dimensional homogeneity; the Buckingham Pi theorem worked to the drag and \
pipe-flow groups (Reynolds, Froude, Weber, Mach, Euler — the group census); the \
Reynolds and Froude similarity laws with model-testing practice; distorted models \
named; and the dimensionless-number treasury every later chapter draws from.",
           ["The Buckingham Pi Theorem Worked",
            "The Group Census",
            "Similitude and Model Testing"]),
        ch("viscous-internal-flow", "Viscous Internal Flow",
           "Laminar fully developed pipe flow earned from the differential route \
(the Hagen-Poiseuille craft); the entrance region; turbulence and the Reynolds \
experiment; the friction factor (Moody chart read fluently, Colebrook and the \
explicit formulae); major losses by the Darcy-Weisbach engine; minor losses in \
bends, valves and fittings; and pipe systems — series, parallel and branching with \
pump/system curve matching introduced.",
           ["Hagen-Poiseuille Earned",
            "The Moody Chart and Friction Factor",
            "Minor Losses in Fittings",
            "Pipe Systems and the System Curve"]),
        ch("boundary-layers-and-external-flow", "Boundary Layers and External Flow",
           "The boundary-layer idea (Prandtl's gift); growth on a flat plate (laminar, \
transition, turbulent — the blended craft); separation and its control; the drag \
census — pressure versus friction drag on cylinders, spheres and aerofoils with the \
Reynolds-number reading; the lift concept priced honestly; and the terminal-velocity \
numericals students actually meet.",
           ["Prandtl's Boundary Layer",
            "Growth, Transition, Separation",
            "The Drag Census",
            "Lift and the Aerofoil Glimpse"]),
        ch("compressible-flow-basics", "Compressible Flow Basics",
           "When density earns a vote — the Mach number and flow regimes; the speed of \
sound; isentropic flow relations; flow through converging and converging-diverging \
nozzles with choking; normal shock waves introduced; and the honest handoff: the full \
gas-dynamics arc stays in this book's scope at GATE depth, its deeper machinery named \
for future study.",
           ["The Mach Number and Flow Regimes",
            "Isentropic Relations",
            "Nozzles and Choking",
            "The Normal Shock Introduced"]),
        ch("turbomachinery-and-the-doorstep", "The Turbomachinery Principle and the Doorstep",
           "The impulse versus reaction principle with velocity triangles drawn \
honestly; the Euler turbomachine equation earned; specific speed introduced as the \
selection compass; and the doorsteps stated plainly — Hydraulic Machines (turbines \
and pumps) live in Hydraulics on the civil shelf with this book's velocity-triangle \
craft cross-referenced; steam and gas turbines live in Thermodynamics' applications; \
the convective machinery of Heat Transfer presupposes this book; Renewable Energy's \
wind and hydro chapters route their flows through here.",
           ["Impulse versus Reaction",
            "The Euler Equation Earned",
            "Specific Speed: the Compass",
            "The Doorsteps: Machines Elsewhere, Rates Above"]),
    ],
)
book(
    "heatTransfer", "heat-transfer", "Heat Transfer",
    "the seventh book of the Engineering shelf (Mechanical branch)",
    "Conduction, convection and radiation — the rate science of thermal engineering",
    "First heat transfer course → thermal design and heat-exchanger readiness",
    "The rate science to Thermodynamics' state science: the three modes and their rate \
equations; the thermal-resistance concept and its electrical analogy; one-dimensional \
steady conduction through walls, cylinders and spheres with the critical-radius \
honesty; extended surfaces — fins analysed and priced; transient conduction by the \
lumped-capacitance method with Heisler charts for the honest middle; the convective \
machinery — thermal boundary layers, the dimensionless-number census (Nusselt, \
Reynolds, Prandtl, Grashof) and the correlations for forced and free convection over \
flat plates and through pipes; boiling and condensation at regime level; heat \
exchangers priced by both LMTD and NTU-effectiveness with the design craft; radiation \
— the Stefan-Boltzmann law, Wien's displacement, black and grey surfaces, view \
factors and the radiation-network analysis; and a closing synthesis with the \
mass-transfer doorway named. Cross-references Thermodynamics (the property census), \
Fluid Mechanics (the convective boundary layer) and hands off to Power Systems' \
insulation and Renewable Energy's solar collectors.",
    ("#ea580c", "#9a3412"),
    "Heat Transfer owns the thermal-rate science. Thermodynamics owns the state and \
cycle science; Fluid Mechanics owns the flow machinery its convection chapters lean \
on; Renewable Energy's solar-thermal chapter routes its collector physics through \
here; Power Systems' thermal-current and insulation design cross-references the \
conduction and radiation chapters; diffusion mass transfer is named and handed to \
future chemical-engineering homes.",
    """- GATE 2026 ME Section 3, the 'Heat Transfer' line (ME_2026_Syllabus.pdf, extracted
  this pass): 'Modes of heat transfer; one dimensional heat conduction, resistance
  concept and electrical analogy, heat transfer through fins; unsteady heat
  conduction, lumped parameter system, Heisler's charts; thermal boundary layer,
  dimensionless parameters in free and forced convective heat transfer, heat transfer
  correlations for flow over flat plates and through pipes, effect of turbulence;
  heat exchanger performance, LMTD and NTU methods; radiative heat transfer,
  Stefan-Boltzmann law, Wien's displacement law, black and grey surfaces, view
  factors, radiation network analysis' — every phrase is a planned lesson.
- Incropera, DeWitt, Bergman & Lavine, Fundamentals of Heat and Mass Transfer 8e —
  the chapter arc read this pass from the Wiley TOC page and the open-PDF contents
  (conduction chapters 2-5, convection 6-8, the boiling/condensation and
  heat-exchanger chapters, radiation exchange, diffusion mass transfer).
- Cengel's Heat and Mass Transfer named as the second pole; Holman named.""",
    [
        ch("the-three-modes", "The Three Modes",
           "Conduction, convection and radiation with their physical origins and rate \
equations (Fourier, the convective coefficient, Stefan-Boltzmann); the thermal \
conductivity census across materials; the convective coefficient's honest range of \
magnitude; and the multimode problems where the modes conspire — the first thermal \
circuits drawn.",
           ["Rate Equations and Their Origins",
            "The Conductivity Census",
            "Thermal Circuits: the Modes Conspire"]),
        ch("one-dimensional-conduction", "One-Dimensional Steady Conduction",
           "The plane wall, the composite wall and the contact-resistance honesty; \
cylindrical and spherical shells with the logarithmic means; the \
thermal-resistance network as the unifying craft; and the critical insulation \
radius — the counter-intuitive result that pricing an insulation can first increase \
the loss.",
           ["The Wall and the Resistance Network",
            "Cylinders, Spheres, Logarithmic Means",
            "The Critical Radius Priced"]),
        ch("fins", "Extended Surfaces: Fins",
           "Why fins exist (the area argument); the fin equation derived for the uniform \
cross-section; infinitely long, adiabatic-tip and corrected-length solutions; fin \
effectiveness and efficiency priced; non-uniform fins glanced; and the \
application census from engine fins to heat sinks.",
           ["The Fin Equation Derived",
            "Effectiveness and Efficiency",
            "The Fin Census in Practice"]),
        ch("unsteady-conduction", "Unsteady Conduction",
           "The lumped-capacitance method and when it is honest (the Biot-number \
verdict); transient charts for the slab, cylinder and sphere (Heisler charts read \
fluently); semi-infinite solids glanced; and the periodic-thermal-storage honesty \
that building physics will someday price.",
           ["Lumped Capacitance and the Biot Verdict",
            "The Heisler Charts Read Fluently",
            "Semi-Infinite Solids Glanced"]),
        ch("convection-fundamentals", "Convection Fundamentals",
           "The thermal boundary layer beside the velocity boundary layer (Fluid \
Mechanics cross-referenced); local versus average coefficients; the dimensionless \
census — Nusselt, Reynolds, Prandtl, Grashof — earned, not recited; forced convection \
correlations for flat plates and pipe flows with their turbulent enhancements; free \
convection from vertical plates and horizontal cylinders; mixed convection named; and \
the correlation-selection craft.",
           ["The Thermal Boundary Layer",
            "The Dimensionless Census Earned",
            "Forced Convection: Plates and Pipes",
            "Free Convection and Its Regimes"]),
        ch("boiling-and-condensation", "Boiling and Condensation",
           "The boiling regimes read from the boiling curve (nucleate, critical heat \
flux, film); pool-boiling correlations at engineering level; flow boiling glanced; \
condensation — film-wise on vertical and horizontal surfaces with Nusselt's craft; \
drop-wise condensation named; and the phase-change heat-transfer coefficient's \
honest magnitudes.",
           ["The Boiling Curve Read",
            "Nucleate Boiling Priced",
            "Nusselt's Film Condensation Craft"]),
        ch("heat-exchangers", "Heat Exchangers",
           "The exchanger census (double-pipe, shell-and-tube, cross-flow, plate); the \
LMTD method with correction factors; the NTU-effectiveness method and when it beats \
LMTD; the design-versus-rating postures; fouling priced; and pressure-drop/heat-duty \
trade-offs named — the chapter the thermal design profession actually lives in.",
           ["The Exchanger Census",
            "LMTD with Correction Factors",
            "NTU and Effectiveness",
            "Design versus Rating"]),
        ch("radiation", "Radiation",
           "Thermal radiation and the electromagnetic honest note; blackbody behaviour — \
Stefan-Boltzmann, Planck's law named, Wien's displacement; emissivity and the grey- \
surface idealisation; irradiation, radiosity and absorptivity/reflectivity/ \
transmissivity; view factors by chart, algebra and the reciprocity engine; radiation \
exchange between black and grey surfaces with the network analysis; radiation \
shielding priced; and the combined-convection-and-radiation problems that close the \
book's practical census.",
           ["Blackbody Behaviour and Its Laws",
            "Grey Surfaces and Radiosity",
            "The View-Factor Craft",
            "Radiation Networks and Shields",
            "Combined-Mode Problems Priced"]),
        ch("synthesis-and-the-doorstep", "The Synthesis and the Doorstep",
           "The synthesis map — one page from Fourier to the network analysis; the \
multimode design census (insulated pipe, finned heat sink, exchanger retrofit priced \
end-to-end); mass transfer named honestly as diffusion's sibling with its future \
chemical-engineering home recorded; and the doorsteps — Renewable Energy's solar \
collectors, Power Systems' thermal current ratings, the electronics shelf's cooling \
chapters (VLSI Design's power chapter cross-referenced).",
           ["The Map: Fourier to Networks",
            "Three Designs Priced End-to-End",
            "The Doorsteps: Solar, Grids, Silicon"]),
    ],
)

book(
    "manufacturingProcesses", "manufacturing-processes", "Manufacturing Processes",
    "the eighth book of the Engineering shelf (Mechanical branch)",
    "Casting, forming, machining and joining — how parts are actually made, priced honestly",
    "First manufacturing course → CNC, metrology and production readiness",
    "The making science: engineering materials for manufacturing (structure-property \
recap cross-referenced to Materials Science); metal casting from pattern and mould \
design through solidification to riser and gating arithmetic; bulk forming — plastic \
deformation, yield criteria, and forging, rolling, extrusion and drawing with hot and \
cold working priced; sheet forming (shearing, deep drawing, bending); powder \
metallurgy's honest niche; machining mechanics — chip formation, cutting forces, tool \
geometry, tool life and wear with the economics of machining; the machine-tool census \
(lathe, milling, drilling, grinding and abrasive processes); non-traditional processes \
(EDM, ECM, USM, laser and water-jet); joining — welding physics and metallurgy, \
brazing, soldering, adhesive bonding and weld defects; work-holding by jigs and \
fixtures; and the metrology chapter GATE prices — limits, fits and tolerances, \
linear/angular measurement, comparators, interferometry, form and finish, alignment \
testing and the CMM. Cross-references Machine Design (the parts to be made), CAD/CAM \
(the CNC and additive chain) and hands off to Industrial Engineering.",
    ("#57534e", "#292524"),
    "Manufacturing Processes owns the making science. CAD/CAM owns the digital \
chain — CNC programming at part-program level and additive manufacturing live there, \
cross-referenced from here; Materials Science owns microstructure and heat treatment; \
Machine Design consumes this book's process constraints as design-for-manufacture; \
Metrology is hosted here as the GATE register routes it, with the quality-system \
census handed to Industrial Engineering.",
    """- GATE 2026 ME Section 4 (ME_2026_Syllabus.pdf, extracted this pass): the
  'Casting, Forming and Joining Processes' line (castings, pattern/mould/core design,
  solidification, riser and gating design; plastic deformation and yield criteria;
  hot and cold working; bulk and sheet processes' load estimation; powder
  metallurgy; welding, brazing, soldering and adhesive bonding) + the 'Machining and
  Machine Tool Operations' line (mechanics of machining; basic machine tools; tool
  geometry and materials, tool life and wear; economics of machining; non-traditional
  machining; work holding, jigs and fixtures; abrasive machining; NC/CNC machines
  and programming) + the 'Metrology and Inspection' line (limits, fits and
  tolerances; linear and angular measurements; comparators; interferometry; form and
  finish measurement; alignment and testing; tolerance analysis; CMM) — all three
  lines are this book's register (CNC programming hands its deeper arc to CAD/CAM).
- Kalpakjian & Schmid, Manufacturing Engineering and Technology 7e — the Pearson
  TOC tab read this pass (Structure of Metals; Mechanical Behaviour and Testing;
  Fundamentals of Metal Casting; casting technology; the forming family; machining
  and machine tools; abrasive; non-traditional; joining).
- Groover, Fundamentals of Modern Manufacturing named as the second pole.""",
    [
        ch("materials-for-manufacturing", "Materials for Manufacturing",
           "The structure-property recap priced for making: metal alloys and their \
phase-diagram logic (cross-referenced to Materials Science); the stress-strain \
behaviour that forming processes exploit; hot versus cold working defined at the \
recrystallisation honest line; and the manufacturing-property census — castability, \
formability, machinability, weldability.",
           ["The Alloy Census for Making",
            "Hot versus Cold: the Recrystallisation Line",
            "Castability, Formability, Machinability"]),
        ch("casting", "Casting",
           "The casting idea and its economics; pattern types and allowances; moulding \
sand and moulds, cores and core prints; solidification theory (Chvorinov's rule); \
riser and gating design arithmetic; sand casting defects priced with the honest \
census; and the casting-process census — shell, investment, permanent mould, die \
casting, centrifugal.",
           ["Patterns, Moulds and Cores",
            "Solidification and Chvorinov's Rule",
            "Riser and Gating Arithmetic",
            "The Casting Census and Its Defects"]),
        ch("bulk-forming", "Bulk Forming",
           "Plastic deformation mechanics with the yield criteria (Tresca and von \
Mises cross-referenced to Machine Design's failure-theory chapter); forging — open \
and impression die with load estimation; rolling mechanics and its geometry; \
extrusion and drawing with die angles and load arithmetic; and the friction and \
temperature bookkeeping that separates honest load estimates from guesses.",
           ["Deformation Mechanics and Yield Criteria",
            "Forging and Its Loads",
            "Rolling: Mechanics and Geometry",
            "Extrusion and Drawing"]),
        ch("sheet-forming-and-powder", "Sheet Forming and Powder Metallurgy",
           "Sheet-metal behaviour and its anisotropic honesty; shearing and blanking \
with the clearance craft; bending (springback priced); deep drawing with its \
limiting draw ratio; other sheet ops glanced; then powder metallurgy — the \
powder-making census, compaction, sintering and its honest niche economics.",
           ["Shearing and Blanking",
            "Bending and Springback",
            "Deep Drawing",
            "Powder Metallurgy's Honest Niche"]),
        ch("machining-mechanics", "Machining Mechanics",
           "Chip formation and its types; the orthogonal cutting model with Merchant's \
analysis; cutting forces and specific energy; tool geometry by the ASA and ISO \
systems; tool materials (HSS through carbide to ceramic/cermets/CBN); tool life — \
Taylor's equation and the wear mechanisms; surface finish bookkept; and the \
economics of machining (the optimum cutting-speed craft).",
           ["Merchant's Orthogonal Craft",
            "Tool Geometry by Two Systems",
            "Taylor's Tool Life",
            "The Economics of Machining"]),
        ch("machine-tools-and-operations", "Machine Tools and Operations",
           "The lathe and turning; drilling and the drill press; milling (up versus \
down, the cutter census); shaping, planing and slotting glanced; grinding — the \
wheel census, wheel specification and grinding mechanics; abrasive finishing \
(honing, lapping, superfinishing); and the machine-tool accuracy and rigidity \
honesty that bounds everything.",
           ["Turning and the Lathe",
            "Drilling and Milling",
            "Grinding and the Wheel Census",
            "The Finishing Census"]),
        ch("non-traditional-machining", "Non-Traditional Machining",
           "Why the traditional list runs out (hard, brittle, complex, tiny); EDM — \
spark erosion and its polarity craft; wire-cut EDM; ECM's electrochemical removal; \
USM's abrasive slurry engine; laser-beam, electron-beam, plasma and water-jet \
machining priced against each other; and the selection census by material and \
geometry.",
           ["The Spark Engine: EDM",
            "ECM and USM",
            "Beam and Jet Processes",
            "The Selection Census"]),
        ch("joining", "Joining",
           "Welding physics — the arc, the pool and the heat-affected zone priced; \
weld metallurgy and the defects census (porosity, undercut, residual stresses and \
distortion with their control); the arc-welding census (SMAW, GMAW, GTAW, SAW); \
resistance welding; brazing and soldering distinguished honestly; adhesive bonding; \
and the joint-design craft shared with Machine Design's welded-joint chapter.",
           ["The Arc, the Pool, the HAZ",
            "The Arc-Welding Census",
            "Brazing, Soldering, Adhesives",
            "Defects, Distortion and Their Control"]),
        ch("work-holding-and-metrology", "Work Holding, Jigs and Fixtures",
           "Locating by the 3-2-1 principle; clamping forces without distortion; jigs \
versus fixtures and their design elements (bushings, set blocks); the economics of \
jig versus fixture; and assembly-line work-holding glanced.",
           ["The 3-2-1 Principle",
            "Jigs versus Fixtures",
            "Design Elements of the Jig"]),
        ch("metrology-and-inspection", "Metrology and Inspection",
           "The measurement discipline (standards, error, calibration cross-referenced \
to Electrical Measurements' error census); limits, fits and tolerances with the \
hole-basis craft; gauges and gauge design (Taylor's principles); linear and angular \
measurement instruments; comparators (mechanical, optical, electrical, pneumatic); \
interferometry as the wavelength ruler; form and finish measurement (flatness, \
roundness, surface roughness parameters); alignment and machine-tool testing; and \
the coordinate measuring machine.",
           ["Limits, Fits and Tolerances",
            "The Comparator Census",
            "Interferometry: the Wavelength Ruler",
            "Form, Finish and Alignment",
            "The Coordinate Measuring Machine"]),
        ch("the-synthesis-and-the-doorstep", "The Synthesis and the Doorstep",
           "The process-selection map — one page from casting through machining to \
joining, priced by volume, material and geometry; the NC/CNC doorway stated (the \
part-program craft lives in CAD/CAM, cross-referenced); the additive doorway stated \
(CAD/CAM owns the process census); and the production-system doorstep to Industrial \
Engineering.",
           ["The Process-Selection Map",
            "The CNC Doorway",
            "The Doorstep: Production Systems"]),
    ],
)

book(
    "industrialEngineering", "industrial-engineering", "Industrial Engineering",
    "the ninth book of the Engineering shelf (Mechanical branch)",
    "Production systems engineered — work study, planning, inventory and the OR application layer",
    "First industrial engineering course → production-management readiness",
    "The production system as an engineered object: plant layout and the production \
census; work study — method study and time study with the rating and allowance \
craft; forecasting models and aggregate production planning; scheduling and \
materials requirement planning with lean manufacturing priced; inventory control — \
deterministic EOQ models and safety-stock systems; the operations-research \
application layer at production speed (linear programming, simplex, transportation \
and assignment, network-flow models and simple queuing, each cross-referenced to the \
Mathematics shelf's Optimization and Operations Research which owns the theory); \
PERT and CPM cross-referenced to Construction Management's construction home; \
quality control — control charts, acceptance sampling and the six-sigma census; and \
the synthesis that closes the mechanical branch. Cross-references Manufacturing \
Processes (the processes being managed), CAD/CAM (the digital factory) and hands \
off to Construction Management (civil) and Economics, Commerce and Finance's future \
shelf.",
    ("#4d7c0f", "#3f6212"),
    "Industrial Engineering owns the production-application layer. The \
operations-research THEORY lives on the Mathematics shelf (optimization-and- \
operations-research — simplex, transportation, assignment, queuing, game theory, \
decision analysis; cross-referenced, no duplication); PERT/CPM at construction depth \
lives in Construction Management (civil); work study and quality systems live here; \
the economics of production routes honestly to the future Economics shelf.",
    """- GATE 2026 ME Section 4 (ME_2026_Syllabus.pdf, extracted this pass): the
  'Production Planning and Control' line (forecasting models, aggregate production
  planning, scheduling, materials requirement planning; lean manufacturing) + the
  'Inventory Control' line (deterministic models; safety stock inventory control
  systems) + the 'Operations Research' line (linear programming, simplex method,
  transportation, assignment, network flow models, simple queuing models, PERT and
  CPM) — the register this book serves at application level, with the theory
  cross-referenced to the Mathematics shelf's OR book.
- Kanishka Bedi, Production and Operations Management (the second-edition TOC
  web-checked this pass) and Martand Telsang's Industrial Engineering and Production
  Management named as the Indian canonical pair; O.P. Khanna named.
- Hillier & Lieberman / Taha cross-referenced through the Mathematics shelf's
  optimization-and-operations-research (the no-duplication contract).""",
    [
        ch("the-production-system", "The Production System",
           "Production as a system with inputs, conversion and outputs; the production \
census — job, batch, mass and continuous; plant layout families (product, process, \
fixed, cellular) priced by volume-variety; productivity and its honest measurement; \
and the industrial-engineering function located in the organisation.",
           ["The Production Census",
            "Layout Families by Volume-Variety",
            "Productivity Measured Honestly"]),
        ch("work-study", "Work Study",
           "Method study — the SREDACT flow of record-examine-develop; flow diagrams \
and charts (outline, flow, travel); motion study and the principles of motion \
economy; then time study — stopwatch procedure, rating, allowances, and standard \
time earned; PMTS glanced; ergonomics priced as the human honest note.",
           ["Method Study: the SREDACT Craft",
            "Motion Study and Motion Economy",
            "Time Study: Standard Time Earned"]),
        ch("forecasting-and-aggregate-planning", "Forecasting and Aggregate Planning",
           "The demand-forecasting census — qualitative (Delphi) and quantitative \
(moving averages, exponential smoothing, trend and simple regression \
cross-referenced to Statistics); forecast-error measures; then aggregate planning \
strategies (chase, level, mixed) priced by their inventory and workforce costs; and \
the master production schedule introduced.",
           ["The Forecasting Census",
            "Forecast Error Measured",
            "Aggregate Strategies Priced"]),
        ch("scheduling-and-mrp", "Scheduling, MRP and Lean",
           "Sequencing on machines (Johnson's rule and the dispatching-rule census); \
the MRP engine — BOM explosion, lead-time offsetting and lot sizing; capacity \
requirements planning glanced; then lean manufacturing — the Toyota vocabulary \
(just-in-time, kanban, 5S, poka-yoke), push versus pull priced, and the waste census \
(muda).",
           ["Sequencing: Johnson and the Rules",
            "The MRP Engine",
            "Lean: the Pull Discipline",
            "The Waste Census"]),
        ch("inventory-control", "Inventory Control",
           "Why inventory exists and what it costs; the EOQ model earned with its \
quantity-discount and production-run variants; safety stock and reorder-point \
systems with the service-level craft; periodic-review systems; ABC analysis; and the \
modern honesty — inventory as the mirror of process problems.",
           ["EOQ Earned and Extended",
            "Safety Stock and Service Level",
            "ABC and the Census",
            "Inventory as the Mirror"]),
        ch("or-application-layer", "The Operations-Research Application Layer",
           "The OR toolkit used at production speed, theory cross-referenced to the \
Mathematics shelf: linear programming formulated from production problems and read \
through the simplex lens; transportation and assignment formulated and solved; \
network-flow models (maximal flow, shortest path) at application depth; and simple \
queuing models priced on real service systems.",
           ["LP Formulated from the Floor",
            "Transportation and Assignment",
            "Network Flows at Production Speed",
            "Queues Priced on Service Systems"]),
        ch("quality-control", "Quality Control",
           "The quality vocabulary (quality of design versus conformance); statistical \
process control — the control-chart family for variables and attributes with the \
control-limit craft; process capability indices; acceptance sampling by OC curves and \
the lot-tolerance honest note; and six sigma and TQM named as the management census.",
           ["The Control-Chart Family",
            "Process Capability",
            "Acceptance Sampling and OC Curves",
            "Six Sigma Named Honestly"]),
        ch("synthesis-and-the-doorstep", "The Synthesis and the Doorstep",
           "The production-system map — one page from layout to delivery; a \
make-or-buy and line-balancing census priced end-to-end; the project-management \
doorstep (PERT/CPM at construction depth routed to Construction Management); the \
digital-factory doorstep (CAD/CAM's CIM arc); and the honest handoff to the future \
Economics shelf for the market side of the same decisions.",
           ["The Map: Layout to Delivery",
            "Line Balancing Priced",
            "The Doorsteps: Projects, CIM, Markets"]),
    ],
)

book(
    "roboticsAndAutomation", "robotics-and-automation", "Robotics and Automation",
    "the tenth book of the Engineering shelf (Mechanical branch)",
    "From spatial transformations to factory automation — the robot as an engineered machine",
    "First robotics course → industrial-automation readiness",
    "The robot idea: history and anatomy (links, joints, degrees of freedom, the \
workspace); industrial-robot classifications; spatial descriptions and \
transformations (frames, rotations, homogeneous transforms, the DH convention); \
forward kinematics of serial manipulators; inverse kinematics solved honestly \
(closed-form where it exists, numerical otherwise); velocities and static forces \
through the Jacobian with singularities priced; manipulator dynamics (Lagrangian \
route cross-referenced to Engineering Mechanics) and trajectory generation; motion \
control and end-effectors/sensors; robot programming; and the automation frame — \
automated flow lines, assembly systems, AGVs, industrial control and robot safety — \
with Industry 4.0 named. Cross-references Theory of Machines (mechanism kinematics), \
Control Systems (the servo loop), CAD/CAM (the digital factory) and hands off to the \
Computer Science shelf's Internet of Things.",
    ("#0f766e", "#134e4a"),
    "Robotics owns the manipulator machinery (kinematics, Jacobians, dynamics, \
control) and the automation-system frame. Theory of Machines owns mechanism \
kinematics generally; Control Systems owns the servo theory; the CS shelf's Internet \
of Things owns the sensor-network and connectivity layers; CAD/CAM owns the CIM \
integration; Assembly and Microprocessors owns the compute beneath.",
    """- Craig, Introduction to Robotics: Mechanics and Control 4e — the Pearson TOC
  read this pass (Introduction; Spatial Transformations; Forward Kinematics;
  Inverse Kinematics; Velocities, Static Forces, and Manipulator Jacobians;
  Dynamics; Trajectory Generation; and the control chapters).
- Groover, Automation, Production Systems, and Computer-Integrated Manufacturing —
  the Pearson TOC tab read this pass (Production Systems; Automation and Control
  Technologies; Industrial Control Systems; Hardware Components; the
  manufacturing-systems parts incl. automated flow lines and assembly) — the
  automation-frame chapters.
- Spong's Robot Modeling and Control named as the second pole.""",
    [
        ch("the-robot-idea", "The Robot Idea",
           "What a robot is, honestly (a manipulator plus control plus programming); \
the anatomy census — links, joints (prismatic/revolute), degrees of freedom, end \
effectors; the workspace (reachable versus dexterous); industrial classifications \
by configuration (articulated, SCARA, polar, cartesian, gantry) priced by their \
honest niches; and the robot-safety frame stated early.",
           ["Anatomy and Degrees of Freedom",
            "The Configuration Census",
            "Workspaces and Safety Stated Early"]),
        ch("spatial-transformations", "Spatial Descriptions and Transformations",
           "Frames and position vectors; rotation matrices and their properties \
(orthogonality, composition, the fixed-versus-current-frame honest distinction); \
Euler angles and fixed angles with their singularity honesty; the homogeneous \
transform as the bookkeeping engine; and the DH convention earned as the \
manipulator's native notation.",
           ["Rotation Matrices Composed",
            "Euler Angles and Their Singularity",
            "The Homogeneous Transform",
            "The DH Convention Earned"]),
        ch("forward-kinematics", "Forward Kinematics",
           "Link frames assigned by DH through a serial chain; the forward-kinematics \
solution as the chain product of transforms; worked honestly on the planar \
two-link and a PUMA-style arm; and the workspace mapped from the kinematics.",
           ["DH Frames Through the Chain",
            "The Chain Product Worked",
            "Workspace Mapped from Kinematics"]),
        ch("inverse-kinematics", "Inverse Kinematics",
           "The inverse problem stated with its honest difficulties (multiple \
solutions, no closed form, infeasibility); closed-form solutions for the planar \
arm and the wrist-partitioned industrial arm; the geometric-versus-algebraic \
routes; and numerical iteration glanced with the initial-guess honesty.",
           ["Multiple Solutions Priced",
            "Closed Form: the Planar Arm",
            "Wrist Partitioning for Real Arms",
            "Numerical Routes Glanced"]),
        ch("jacobians-velocities-and-statics", "Velocities, Static Forces and Jacobians",
           "The manipulator Jacobian derived and read (linear and angular rows); \
singular configurations — where the Jacobian loses rank and the arm loses a \
degree of freedom, priced on real postures; static forces through the Jacobian \
transpose (the duality); and the velocity-propagation route as the alternative \
engine.",
           ["The Jacobian Derived and Read",
            "Singularities Priced on Real Postures",
            "Static Forces: the Transpose Duality"]),
        ch("dynamics-and-trajectories", "Dynamics and Trajectory Generation",
           "Lagrangian dynamics of manipulators (Engineering Mechanics' Lagrange \
chapter cross-referenced, the mass-matrix structure read); joint-space and \
cartesian trajectory generation (cubic and quintic polynomials, linear-with-parabolic \
blends); path versus trajectory distinguished honestly; and the dynamics' \
use for simulation and control named.",
           ["The Lagrangian Route for Arms",
            "Cubic and Quintic Trajectories",
            "Blends and the Time-Scaling Craft"]),
        ch("control-and-sensing", "Motion Control, Sensors and End Effectors",
           "Position control of joints (PD and PID at the servo level, Control \
Systems cross-referenced); independent-joint versus computed-torque control \
glanced; the sensor census — encoders, resolvers, force/torque sensors, machine \
vision named; grippers and tool changers; and robot programming languages and the \
teach-pendant craft.",
           ["Joint Servos: PD and PID",
            "The Sensor Census",
            "Grippers and Programming"]),
        ch("industrial-automation", "Industrial Automation and the Doorstep",
           "The automation frame from Groover's arc: automated flow lines and \
transfer machines; assembly systems and line balancing cross-referenced to \
Industrial Engineering; AGVs, robots-in-cells and the control hierarchy \
(devices, cells, lines, plant); industrial control systems (PLC named, the CS \
shelf's Digital Logic Design and Assembly cross-referenced); Industry 4.0 and \
the IIoT doorstep to Internet of Things; and the honest economics — when \
automation pays.",
           ["Flow Lines and Transfer Machines",
            "Cells, AGVs and the Control Hierarchy",
            "The IIoT Doorstep",
            "The Honest Economics of Automation"]),
    ],
)

book(
    "cadCam", "cad-cam", "CAD/CAM",
    "the eleventh book of the Engineering shelf (Mechanical branch)",
    "The digital product chain — geometric modelling, CNC programming and additive manufacturing",
    "First CAD/CAM course → CIM and digital-manufacturing readiness",
    "The digital chain from concept to part: CAD/CAM/CIM located in the product \
realisation cycle; geometric modelling — wireframe, surface and solid (CSG and \
B-rep) with transformations cross-referenced to the Mathematics shelf's coordinate \
geometry and linear algebra; curves and surfaces for design (Bezier, B-spline and \
NURBS arcs priced at engineering depth); CAD data exchange and standards (IGES, \
STEP) with PDM glanced; computer-aided part programming — NC and CNC with G/M-code \
part programs written honestly, APT named, and the CNC machine cross-referenced to \
Manufacturing Processes; additive manufacturing — the process census (VAT \
photopolymerisation, material extrusion, powder-bed fusion, binder jetting, \
directed-energy deposition, sheet lamination), design for AM and its honest \
economics; computer-integrated manufacturing — CAPP, FMS, cell control and the \
factory data ladder; and the Industry 4.0 synthesis (the digital thread, digital \
twin named). Cross-references Manufacturing Processes (the processes being \
digitised), Robotics and Automation (the cells), Industrial Engineering (the \
production layer) and hands off to the Computer Science shelf's Internet of Things.",
    ("#7c3aed", "#5b21b6"),
    "CAD/CAM owns the digital product chain and additive manufacturing. Manufacturing \
Processes owns the subtractive/joining process physics (CNC machines appear there; \
part programs live here); Robotics and Automation owns the robot cell; Industrial \
Engineering owns the production planning; the mathematical machinery of geometric \
transformations and spline mathematics routes to the Mathematics shelf's coordinate \
geometry and linear-algebra books (cross-referenced).",
    """- GATE 2026 ME Section 4, the 'Computer Integrated Manufacturing' line
  (ME_2026_Syllabus.pdf, extracted this pass): 'Basic concepts of CAD/CAM and their
  integration tools; additive manufacturing' — the register this book owns.
- Groover, Automation, Production Systems, and CIM — the Pearson TOC tab read this
  pass (the CAD/CAM chapters inside the automation-technologies part, numerical
  control, industrial robotics chapters boundary-checked against Robotics).
- Zeid's CAD/CAM Handbook named as the depth pole; the NURBS arc cross-checked
  against the Mathematics shelf's coordinate-geometry spline lessons.""",
    [
        ch("the-digital-chain", "The Digital Product Chain",
           "CAD, CAM and CIM located honestly in the product-realisation cycle (design \
analysis, process planning, production); the integration-tools census the GATE \
register names; the data ladder — geometry, features, process, resource; and a \
history honest note (from drafting boards to parametric feature-based CAD).",
           ["CAD, CAM, CIM Located",
            "The Integration-Tools Census",
            "The Data Ladder"]),
        ch("geometric-modelling", "Geometric Modelling",
           "Wireframe, surface and solid modelling distinguished by what they know; \
constructive solid geometry by primitives and booleans; boundary representation \
(euler operators glanced); modelling transformations (translation, rotation, \
scaling, mirroring) with the homogeneous-matrix craft cross-referenced to Linear \
Algebra and Coordinate Geometry; and feature-based parametric modelling as the \
modern practice.",
           ["Wireframe, Surface, Solid",
            "CSG and B-rep",
            "Transformations by Matrices",
            "Feature-Based Parametric Practice"]),
        ch("curves-and-surfaces-for-design", "Curves and Surfaces for Design",
           "Why designed curves need control (the interpolation-versus-approximation \
honesty); Bezier curves — Bernstein blends, control points and their properties; \
B-splines — the knot vector and local control earned; NURBS as the industry's one \
curve; tensor-product surfaces and trimmed surfaces glanced; and the surface- \
quality vocabulary (curvature, continuity) priced.",
           ["Bezier: Bernstein Blends",
            "B-splines and Local Control",
            "NURBS: the Industry's One Curve",
            "Surfaces and Their Continuity"]),
        ch("cad-data-and-standards", "CAD Data, Standards and PDM",
           "Native versus neutral formats; IGES and STEP priced honestly (what \
survives translation); drawing standards and model-based definition glanced; \
product-data management and engineering-change control; and the versioning honesty \
software engineering would recognise (the CS shelf cross-referenced).",
           ["IGES and STEP Priced",
            "Model-Based Definition Glanced",
            "PDM and Change Control"]),
        ch("nc-and-cnc-programming", "NC, CNC and Part Programming",
           "Numerical control located (from punch tape to modern controllers); the \
coordinate systems and codes — G and M vocabulary learned as a language; part \
programs written for turning and milling (straight-cut, circular interpolation, \
canned cycles, tool offsets, cutter compensation); APT named; manual versus \
CAM-generated programs priced; and DNC and adaptive control glanced.",
           ["The G/M Vocabulary as a Language",
            "A Turning Program Written",
            "A Milling Program Written",
            "CAM-Generated and Adaptive"]),
        ch("additive-manufacturing", "Additive Manufacturing",
           "The layer-wise idea and its honest economics; the process census by the \
ASTM families — vat photopolymerisation, material extrusion (FDM), powder-bed \
fusion (SLS/DMLS/SLM), binder jetting, material jetting, directed-energy \
deposition, sheet lamination; process selection by material and geometry; design \
for additive (support strategy, orientation, lattice structures); post-processing; \
and the AM applications census (prototyping, tooling, end-use parts, bioprinting \
named).",
           ["The Layer-Wise Idea",
            "The Seven Process Families",
            "Design for Additive",
            "The Applications Census"]),
        ch("cim-and-the-factory-ladder", "CIM and the Factory Ladder",
           "Computer-integrated manufacturing as the honest integration claim (and its \
honest difficulty); computer-aided process planning (variant versus generative); \
flexible manufacturing systems and cells; cell control and SCADA glanced; \
machine-data collection and OEE; and the standards census that lets the ladder's \
levels speak.",
           ["CIM: the Honest Integration",
            "CAPP: Variant and Generative",
            "FMS and Cell Control",
            "Machine Data and OEE"]),
        ch("industry-4-synthesis", "Industry 4.0 and the Synthesis",
           "The digital thread drawn end-to-end (a part modelled, simulated, \
programmed, printed or cut, measured and traced); the digital twin named honestly; \
industrial IoT and cloud manufacturing routed to the CS shelf's Internet of Things \
and Cloud Computing (cross-referenced); cybersecurity's OT honest note (the CS \
shelf's Cybersecurity book cross-referenced); and the mechanical branch's \
synthesis — the eleven books' map on one page.",
           ["The Digital Thread Drawn",
            "The Digital Twin Named Honestly",
            "OT Security Named",
            "The Mechanical Branch's Map"]),
    ],
)

book(
    "materialsScience", "materials-science", "Materials Science",
    "the twelfth book of the Engineering shelf (Mechanical branch, shared by every branch)",
    "Structure makes properties — from atomic bonds to phase diagrams and corrosion",
    "First materials science course → material-selection readiness across engineering",
    "The structure-property discipline every branch shares: the materials worldview \
(classification and the structure-property triangle); atomic structure and \
interatomic bonding priced for engineering (why metals bend, ceramics shatter, \
polymers creep); crystal structures (SC, BCC, FCC, HCP) with X-ray diffraction \
named and density arithmetic; imperfections — vacancies, dislocations, grain \
boundaries — as the honest actors; diffusion by Fick's laws with its engineering \
(carburising) census; mechanical properties read from the testing laboratory \
(stress-strain, hardness, impact — cross-referenced to Strength of Materials); \
strengthening mechanisms and fracture (grain refinement, strain hardening, \
precipitation; ductile/brittle, fatigue and creep named and routed); phase \
diagrams (binary, the Fe-C system, the eutectoid craft) and phase transformations \
(TTT curves, heat treatment — annealing, normalising, hardening, tempering); the \
materials-family census — steels and cast irons, non-ferrous alloys, polymers, \
ceramics and composites; and corrosion with degradation and the materials-selection \
doorstep. Cross-references Strength of Materials, Machine Design (selection), \
Building Materials (civil's construction census) and hands off to the future \
Chemistry shelf.",
    ("#b7791f", "#713f12"),
    "Materials Science owns the structure-property story for engineering materials. \
Strength of Materials owns the stress machinery (testing shared, honestly); \
Machine Design consumes its fatigue and heat-treatment census; Building Materials \
(civil) owns the construction-materials census (stone, brick, cement, timber) with \
the contract stated there; the future Chemistry shelf's Materials line will route \
here (cross-reference when planned); the future Physics shelf's Solid-State line \
owns the physics depth.",
    """- GATE 2026 ME Section 4, the 'Engineering Materials' line (ME_2026_Syllabus.pdf,
  extracted this pass): 'Structure and properties of engineering materials, phase
  diagrams, heat treatment, stress-strain diagrams for engineering materials' —
  the register this book owns for engineering.
- Callister & Rethwisch, Materials Science and Engineering: An Introduction 10e —
  the chapter arc web-checked this pass via the publisher TOC (Introduction; Atomic
  Structure and Interatomic Bonding; Structure of Crystalline Solids; Imperfections;
  Diffusion; Mechanical Properties; Dislocations and Strengthening; Failure; Phase
  Diagrams; Phase Transformations; Applications and Properties of Iron-Carbon
  alloys; Corrosion; materials families).
- Raghavan's Materials Science named as the Indian canonical pole; the future
  Chemistry shelf's 'Materials' backlog line recorded as a cross-reference.""",
    [
        ch("the-materials-worldview", "The Materials Worldview",
           "The structure-processing-property triangle as the discipline's one \
diagram; the classification census (metals, ceramics, polymers, composites) by \
bonding and behaviour; a historical honest note (Liberty Ship failures named as \
the fracture cautionary tale); and the material-selection vocabulary this book \
will cash at its close.",
           ["The One Triangle",
            "The Family Census by Bonding",
            "Selection Vocabulary Promised"]),
        ch("atomic-structure-and-bonding", "Atomic Structure and Interatomic Bonding",
           "The quantum honest note kept short (the future Physics shelf owns it); \
electronic structure and the periodic logic for bonding; ionic, covalent, metallic \
and secondary bonds priced for what they make the material do (stiffness, \
ductility, melting point); bond energy versus separation curves read as the \
modulus' origin; and the density arithmetic from atomic radii.",
           ["The Four Bond Families Priced",
            "Bond Curves: the Modulus Earned",
            "Density Arithmetic"]),
        ch("crystal-structures", "Crystal Structures",
           "Lattice, basis and unit cells; the simple, BCC, FCC and HCP structures \
with their packing factors and coordination numbers; single crystals versus \
polycrystalline materials and anisotropy; polymorphism (allotropy) priced on iron; \
X-ray diffraction and Bragg's law at engineering depth; and ceramic and polymer \
structural honesty (ionic ceramics, chain polymers) glanced.",
           ["The Structure Census and Packing",
            "Anisotropy and Allotropy",
            "Bragg's Law at Engineering Depth"]),
        ch("imperfections", "Imperfections in Solids",
           "The honest actors: point defects (vacancies, interstitials, impurities — \
solid solutions by substitution and interstitial); dislocations (edge and screw, \
the Burgers vector) as the ductility engine; interfacial defects (grain boundaries, \
twin boundaries); bulk defects glanced; and the speciation arithmetic (composition \
conversions) the numerical census needs.",
           ["Point Defects and Solid Solutions",
            "Dislocations: the Ductility Engine",
            "Grain Boundaries and Faces"]),
        ch("diffusion", "Diffusion",
           "The diffusion mechanism (vacancy and interstitial); steady-state Fick's \
first law; the non-steady second law solved for the semi-infinite solid; \
temperature dependence (the Arrhenius craft) and the activation-energy arithmetic; \
the engineering census — carburising, dopant profiles named for the ECE shelf, \
decarburising priced; and diffusion in polymers and ceramics glanced.",
           ["Fick's Two Laws",
            "Arrhenius and Activation Energy",
            "Carburising Priced"]),
        ch("mechanical-properties-and-testing", "Mechanical Properties and Testing",
           "Tensile testing read as the shared laboratory (Strength of Materials \
cross-referenced for the stress machinery): the true-versus-engineering census; \
elastic and anelastic behaviour; hardness — Rockwell, Brinell, Vickers and \
microhardness with conversions priced; impact toughness (Charpy/Izod) and the \
ductile-brittle transition; and the property census table every later chapter \
consults.",
           ["True versus Engineering",
            "The Hardness Census",
            "Impact and the Ductile-Brittle Transition"]),
        ch("strengthening-and-fracture", "Strengthening Mechanisms and Fracture",
           "Why barriers strengthen — grain refinement (Hall-Petch), strain hardening \
(work hardening with the cold-work/recrystallisation craft), precipitation and \
solid-solution strengthening, and heat-treatment hardening for steels; then \
fracture — ductile versus brittle read honestly, fatigue as a named mechanism \
(routed to Machine Design for the S-N design craft), creep at high temperature \
with its stages; and the inspection census (NDT glanced).",
           ["Grain Refinement and Hall-Petch",
            "Work Hardening and Recrystallisation",
            "Fatigue and Creep Named and Routed",
            "Brittleness and the NDT Glance"]),
        ch("phase-diagrams-and-transformations", "Phase Diagrams and Phase Transformations",
           "The phase rule priced; binary diagrams read fluently (isomorphous, \
eutectic, peritectic) with lever-rule and tie-line arithmetic; the Fe-Fe3C system \
read as the metallurgist's map (ferrite, austenite, cementite, pearlite, \
eutectoid craft); phase transformations — TTT and CCT curves; heat treatment \
practised (annealing, normalising, hardening, tempering, austempering named); \
hardenability and the Jominy craft; and surface treatments glanced.",
           ["Lever Rules and Tie Lines",
            "The Fe-C Map Read Fluently",
            "TTT Curves and Heat Treatment",
            "Hardenability: the Jominy Craft"]),
        ch("the-materials-families", "The Materials Families",
           "Steels (plain-carbon and alloy by purpose) and cast irons (grey, white, \
malleable, nodular); non-ferrous alloys — aluminium, copper, titanium, nickel \
priced by their honest niches; polymers (thermoplastic/thermoset, Tg and Tm, \
viscoelasticity named); ceramics (traditional versus engineering, their \
brittleness honestly); composites (particle, fibre and laminar — rule-of-mixtures \
arithmetic); and the selection census that closes the family tour.",
           ["Steels and Cast Irons",
            "The Non-Ferrous Niches",
            "Polymers and Ceramics Honestly",
            "Composites and Rule of Mixtures"]),
        ch("corrosion-and-selection", "Corrosion, Degradation and Selection",
           "Electrochemical corrosion priced (the galvanic couple, the corrosion \
cell's anatomy, EMF and galvanic series); corrosion forms (uniform, galvanic, \
pitting, crevice, intergranular, stress corrosion) with their honest prevention \
(material selection, coatings, cathodic protection); oxidation at high \
temperature; polymer and ceramic degradation glanced; and the material-selection \
doorstep — Ashby's method named, the selection criteria the design books \
(Shigley's cross-reference) and the civil shelf's Building Materials book route \
to.",
           ["The Galvanic Couple Priced",
            "Corrosion Forms and Prevention",
            "Degradation Beyond Metals",
            "The Selection Doorstep: Ashby Named"]),
    ],
)
# ======================================================================
# PART 2 — ELECTRICAL (8 books; the backlog's 'Circuit Theory' and
# 'Network Analysis' lines merge into one book, one Van Valkenburg arc)
# ======================================================================

book(
    "circuitTheoryAndNetworkAnalysis", "circuit-theory-and-network-analysis",
    "Circuit Theory and Network Analysis",
    "the thirteenth book of the Engineering shelf (Electrical branch — absorbs the backlog's 'Circuit Theory' and 'Network Analysis' lines, one arc honestly merged)",
    "From Kirchhoff's laws to two-port networks — the electrical circuit as an engineered system",
    "First circuits course → machines, control and power readiness",
    "The circuit discipline every electrical and electronic chapter assumes: charge, \
current, voltage and the passive sign convention; R, L, C and M as network elements \
with ideal and dependent sources; Kirchhoff's laws grown into the systematic node and \
mesh analyses; the theorem census — superposition, Thevenin, Norton, reciprocity and \
maximum power transfer; sinusoidal steady state with phasors, impedance, complex \
power and power factor, and resonance (series and parallel, with Q and bandwidth); \
coupled circuits and the ideal transformer at circuit level (the power transformer \
lives in Electrical Machines); balanced three-phase circuits with star-delta and \
power measurement; transients in RL, RC and RLC circuits solved classically and by \
Laplace (the transform machinery cross-referenced to the Mathematics shelf); network \
functions, poles and zeros with the frequency-response reading; two-port networks by \
the z, y, h and ABCD parameter families; and network topology (graph theory, cut \
sets, loop analysis) closing into state variables. Cross-references Electromagnetic \
Fields and Waves (the field truth beneath the lumped honest note), Signals and \
Systems (the transform machinery) and hands off to Electrical Machines and Control \
Systems.",
    ("#ca8a04", "#854d0e"),
    "Circuit Theory and Network Analysis owns the lumped-circuit discipline (the \
backlog's two lines merged — one Van Valkenburg arc, recorded in SUBJECT_BACKLOG.md). \
Electrical Machines owns the power-transformer and winding depth; Electromagnetic \
Fields and Waves owns the field truth beneath the lumped approximation; Signals and \
Systems owns the general transform theory; the Mathematics shelf's Laplace chapters \
own the pure mathematics.",
    """- GATE 2026 EE Section 2 'Electric circuits' + the EC Section 2 circuit half
  (both syllabus PDFs downloaded + extracted this pass): network elements and
  dependent sources; KCL/KVL, node and mesh analysis; Thevenin, Norton,
  superposition, maximum power transfer, reciprocity; transient response of DC and
  AC networks; sinusoidal steady-state analysis, resonance, two-port networks,
  balanced three phase, star-delta, complex power and power factor; linear 2-port
  parameters; wye-delta transformation — both registers are this book's own.
- Van Valkenburg, Network Analysis — the classic chapter arc web-checked this pass
  (Development of the Circuit Concept; Conventions for Describing Networks; network
  theorems; the Laplace/K-transform chapters; two-ports; the synthesis chapters
  noted as the deeper tail); Chakrabarti's Circuit Theory named as the Indian
  canonical pole.
- A. Chakrabarti's 'Circuits and Systems' TOC named; Hayt's Engineering Circuit
  Analysis named as the third pole.""",
    [
        ch("the-circuit-idea", "The Circuit Idea",
           "Charge, current, voltage and power with the passive sign convention learned \
as law; ideal voltage and current sources with their honest limits; the dependent- \
source family (VCVS through CCCS) that models real devices; R, L and C as energy \
elements (dissipator, and two storers) with their v-i relations; and the lumped \
approximation stated with its field-truth doorstep.",
           ["The Passive Sign Convention as Law",
            "Sources, Ideal and Dependent",
            "R, L, C: One Dissipator, Two Storers",
            "The Lumped Approximation and Its Doorstep"]),
        ch("kirchhoff-and-systematic-methods", "Kirchhoff's Laws and the Systematic Methods",
           "KCL and KVL as conservation statements; the complete node-voltage method \
(with supernodes) and the mesh-current method (with supermeshes) worked as engines; \
source transformation as the shuttle between the two; and the honest craft of \
choosing the smaller system to solve.",
           ["KCL and KVL as Conservation",
            "The Node-Voltage Engine",
            "The Mesh-Current Engine",
            "Supernodes, Supermeshes, Choice"]),
        ch("the-theorem-census", "The Theorem Census",
           "Linearity and superposition; Thevenin's and Norton's equivalents earned and \
priced on real bridges; maximum power transfer with its matched honest note; \
reciprocity; and Tellegen's theorem glanced as the audit that all the others obey.",
           ["Superposition Earned",
            "Thevenin and Norton Priced",
            "Maximum Power and Its Match",
            "Reciprocity and Tellegen's Audit"]),
        ch("sinusoidal-steady-state", "Sinusoidal Steady State",
           "The sinusoid's vocabulary (RMS, phase, frequency); the phasor transform as \
a change of coordinates; impedance and admittance; series-parallel AC circuits \
solved; complex power S = P + jQ with power factor and its correction; and the \
measurement census (the wattmeter cross-referenced to Electrical Measurements).",
           ["Phasors: the Coordinate Change",
            "Impedance Arithmetic",
            "Complex Power and Power Factor",
            "The AC Wattmeter Census"]),
        ch("resonance-and-coupled-circuits", "Resonance and Coupled Circuits",
           "Series and parallel resonance with the quality factor Q, bandwidth and \
selectivity priced; the tuned-circuit applications census; mutual inductance and the \
dot convention; the coupled-coil arithmetic (coefficients of coupling, reflected \
impedance); the ideal transformer at circuit level; and the honest handoff — \
power-transformer engineering lives in Electrical Machines.",
           ["Resonance and Q Priced",
            "Selectivity and Tuned Circuits",
            "Mutual Inductance and the Dot Convention",
            "The Ideal Transformer at Circuit Level"]),
        ch("three-phase-circuits", "Balanced Three-Phase Circuits",
           "Why three phase won (the rotating-field and constant-power honest notes); \
star and delta connections with line-versus-quantity arithmetic; balanced three- \
phase solution methods; power measurement by the two-wattmeter method; the \
star-delta transformation; and unbalanced glimpses routed honestly to Power Systems' \
symmetrical components.",
           ["Why Three Phase Won",
            "Line-versus-Phase Arithmetic",
            "The Two-Wattmeter Method",
            "Unbalanced Glances Routed"]),
        ch("transients", "Transients",
           "First-order RL and RC transients with the time constant and the initial- \
and final-value craft; second-order RLC transients with the three regimes (over, \
critical, under); transients under AC excitation named; switching dynamics on \
practical devices glanced; and the classical method's honest limits pointing to the \
Laplace route (cross-referenced to the Mathematics shelf's transform chapters and \
Signals and Systems).",
           ["First-Order: the Time Constant",
            "Second-Order: the Three Regimes",
            "The Initial- and Final-Value Craft",
            "The Laplace Route Named"]),
        ch("network-functions-and-frequency-response", "Network Functions and Frequency Response",
           "The network function from the Laplace domain; poles and zeros read as the \
circuit's character; the frequency response from the pole-zero map (Bode's craft \
introduced, Control Systems owns the design depth); resonance re-read from the poles; \
stability of the circuit glance; and the damped-natural vocabulary priced.",
           ["Poles and Zeros as Character",
            "The Frequency Response Read",
            "Bode's Craft Introduced",
            "Resonance Re-Read from the Poles"]),
        ch("two-port-networks", "Two-Port Networks",
           "The two-port idea (and its honest conditions); the z, y, h, g and ABCD \
parameter families defined, measured and converted; the equivalent circuits each \
family draws; cascaded two-ports by ABCD arithmetic; terminated two-ports with image \
and iterative impedances glanced; and the applications census (transistor models, \
transmission lines, filters) that makes the abstraction worth carrying.",
           ["The Parameter Families Defined",
            "Conversions and Equivalent Circuits",
            "Cascades by ABCD",
            "The Applications Census"]),
        ch("topology-state-and-doorstep", "Topology, State Variables and the Doorstep",
           "Network topology — the graph beneath the circuit (trees, links, cut sets \
and loops) grown into loop and cut-set systematisations; the incidence matrices \
glanced; state-variable formulation as the modern description; the synthesis doorway \
named (driving-point functions, Hurwitz, positive-real — the deeper tail recorded); \
and the doorsteps — Electrical Machines (the energised circuit), Control Systems \
(the feedback circuit), Power Electronics (the switched circuit).",
           ["The Graph Beneath the Circuit",
            "Cut Sets and Loop Systematics",
            "State Variables as Description",
            "The Doorsteps: Energised, Feedback, Switched"]),
    ],
)

book(
    "electricalMachines", "electrical-machines", "Electrical Machines",
    "the fourteenth book of the Engineering shelf (Electrical branch)",
    "Transformers, DC, induction and synchronous machines — electromechanical conversion engineered",
    "First machines course → power systems and drives readiness",
    "The rotating world: electromechanical energy conversion principles (force and \
torque from fields, singly and multiply excited systems, the field-energy craft); \
the single-phase transformer — equivalent circuit, phasor diagram, open-circuit and \
short-circuit tests, regulation and efficiency, all-day efficiency priced; \
three-phase transformers (connections and vector groups, parallel operation); \
autotransformers and special transformers; DC machines — construction and EMF, \
armature reaction and commutation, separately excited, shunt, series and compound \
machines in motoring and generating with their characteristics, speed control and \
starters; three-phase induction machines — the rotating field, slip, torque-speed \
characteristics, the equivalent circuit, no-load and blocked-rotor tests, starting \
and speed control; single-phase induction motors; synchronous machines — cylindrical \
and salient-pole, EMF and regulation, parallel operation of generators, synchronous \
motor starting and V-curves; losses and efficiency across the census; and the \
special-machines glimpse (BLDC, stepper) closing to the drives doorstep. \
Cross-references Circuit Theory and Network Analysis (the circuit craft), Power \
Electronics (the drives) and hands off to Power Systems.",
    ("#b45309", "#92400e"),
    "Electrical Machines owns the machine families and the power-transformer depth. \
Power Electronics owns the converter-fed drive control; Power Systems owns the \
system's machines-in-network view; Circuit Theory owns the winding's circuit model; \
Electromagnetic Fields and Waves owns the field machinery of torque production \
(cross-referenced).",
    """- GATE 2026 EE Section 5 'Electrical Machines' (EE_2026_Syllabus.pdf, extracted
  this pass): single phase transformer (equivalent circuit, phasor diagram, OC and
  SC tests, regulation and efficiency); three-phase transformers (connections,
  vector groups, parallel operation); auto-transformer; electromechanical energy
  conversion principles; DC machines (separately excited, series and shunt; motoring
  and generating; characteristics; speed control); three-phase induction machines
  (principle, types, performance, torque-speed, no-load and blocked-rotor tests,
  equivalent circuit, starting and speed control); single-phase induction motors;
  synchronous machines (cylindrical and salient pole; performance; regulation and
  parallel operation of generators; starting of synchronous motors); losses and
  efficiency — the entire section is this book's register.
- P.S. Bimbhra, Electrical Machinery — the Indian canonical arc web-checked this
  pass (the transformers + DC + synchronous + induction organisation confirmed);
  Nagrath & Kothari, Electric Machines named as the second pole.
- Fitzgerald, Kingsley & Umans named as the depth pole.""",
    [
        ch("electromechanical-conversion", "Electromechanical Energy Conversion",
           "Why electricity moves iron (the field-energy route to force and torque); \
singly and multiply excited systems; co-energy and the force from it; the energy \
conversion cycle drawn on the field-energy plane; and the machine census located \
(translational and rotating, AC and DC) as different solutions to the same energy \
problem.",
           ["Force from Field Energy",
            "Co-Energy and Torque",
            "The Conversion Cycle Drawn",
            "The Machine Census Located"]),
        ch("the-single-phase-transformer", "The Single-Phase Transformer",
           "Construction and the induction principle (Circuit Theory's mutual- \
inductance craft cashed); the ideal transformer then the real one — equivalent \
circuit parameters, phasor diagram; the open-circuit and short-circuit tests as the \
honest identification engine; voltage regulation and efficiency (all-day efficiency \
priced); and autotransformers with their apparent-power honest note.",
           ["The Equivalent Circuit Earned",
            "OC and SC Tests as Identification",
            "Regulation and All-Day Efficiency",
            "The Autotransformer's Honest Note"]),
        ch("three-phase-transformers", "Three-Phase Transformers",
           "Bank versus core construction; the connection census (star, delta, zigzag) \
with vector groups read honestly (the clock notation learned); parallel operation \
and its conditions; tap changers and the cooling census glanced; and the three- \
phase transformer's role priced in Power Systems' per-unit world.",
           ["The Connection Census",
            "Vector Groups by the Clock",
            "Parallel Operation's Conditions",
            "Tap Changers and Cooling Glanced"]),
        ch("dc-machines", "DC Machines",
           "Construction and the EMF equation; armature winding glimpses; armature \
reaction and commutation (interpoles and compensating windings as the honest \
fixes); the separately excited, shunt, series and compound families in motoring \
and generating with their characteristics; speed control (armature, field, \
Ward-Leonard named); starters and their necessity; losses and efficiency; and the \
DC machine's honest decline named without hiding it.",
           ["EMF, Armature Reaction, Commutation",
            "The Family Characteristics",
            "Speed Control and Ward-Leonard",
            "Starters, Losses, the Honest Decline"]),
        ch("induction-machines", "Three-Phase Induction Machines",
           "The rotating magnetic field earned (the winding's gift); construction \
(squirrel cage versus slip ring); slip and the frequency honest note; the torque- \
speed characteristic and torque-slip arithmetic; the equivalent circuit and its \
parameter identification by the no-load and blocked-rotor tests; power flow and \
efficiency; starting methods; speed control (pole changing, V/f named and routed to \
Power Electronics); the double-cage and deep-bar honesty; and the induction \
machine's modern dominance named.",
           ["The Rotating Field Earned",
            "Slip and Torque Arithmetic",
            "The Equivalent Circuit Identified",
            "Power Flow and Losses",
            "Starting and Speed Control"]),
        ch("single-phase-and-special-machines", "Single-Phase Induction and Special Machines",
           "Why the single-phase motor has no starting torque (the double-revolving- \
field honest note) and its fixes — split-phase, capacitor start/run, shaded pole; \
universal motors glanced; and the special census — BLDC, stepper and servo machines \
with their drives cross-referenced to Power Electronics and Robotics.",
           ["The Double-Revolving-Field Honesty",
            "The Starting Fixes",
            "BLDC, Stepper, Servo Glanced"]),
        ch("synchronous-machines", "Synchronous Machines",
           "Construction (cylindrical versus salient pole); the EMF equation with \
winding factors; the equivalent circuit and phasors for the round-rotor machine; \
voltage regulation by the EMF and MMF methods; the synchronous generator on the \
bus — the power-angle relation and parallel operation (the synchronising craft); \
the salient-pole two-reaction honest note; synchronous motors — starting and \
V-curves; and the condenser glance.",
           ["EMF and Winding Factors",
            "Regulation by Two Methods",
            "Power-Angle and Parallel Operation",
            "Salient-Pole: the Two-Reaction Note",
            "Synchronous Motors and V-Curves"]),
        ch("losses-efficiency-and-doorstep", "Losses, Efficiency and the Doorstep",
           "The loss census across every family (copper, iron, mechanical, stray); \
efficiency and its honest testing (indirect routes); the machine-selection compass; \
and the doorsteps — Power Systems (the generator on the grid), Power Electronics \
(the converter-fed drive: DC drives and V/f induction control named), Renewable \
Energy (the generator families the wind and small-hydro chapters route to).",
           ["The Loss Census Across Families",
            "Efficiency Tested Indirectly",
            "The Doorsteps: Grid, Drive, Renewables"]),
    ],
)

book(
    "powerSystems", "power-systems", "Power Systems",
    "the fifteenth book of the Engineering shelf (Electrical branch)",
    "Generation to the wall socket — line modelling, load flow, faults, protection and stability",
    "First power systems course → grid-engineering readiness",
    "The grid as one machine: the power-system worldview (generation, transmission, \
distribution, AC and DC transmission concepts); per-unit quantities as the system's \
honest arithmetic; transmission-line modelling — resistance, inductance and \
capacitance from conductor geometry (bundled conductors), and line performance with \
series and shunt compensation and power-factor correction; corona, insulators and \
electric-field distribution, and cables; the bus-admittance matrix and load-flow \
solutions by Gauss-Seidel and Newton-Raphson (with fast-decoupled named); \
symmetrical faults and circuit-breaker duty; symmetrical components and \
unsymmetrical faults (LG, LL, LLG) by sequence networks; the protection census — \
overcurrent, differential, directional and distance relays with instrument \
transformers cross-referenced; circuit breakers (arc physics glanced, ratings) and \
insulation coordination cross-referenced to High Voltage Engineering; voltage and \
frequency control; economic load dispatch with and without transmission losses; and \
stability — the swing equation and equal-area criterion with power-system \
stabilisers named. Cross-references Electrical Machines, Power Electronics (HVDC and \
FACTS glanced), High Voltage Engineering and hands off to Renewable Energy's grid \
integration.",
    ("#0c4a6e", "#082f49"),
    "Power Systems owns the grid as a system. Electrical Machines owns the generator \
and transformer depth; High Voltage Engineering owns insulation and testing depth; \
Power Electronics owns the converter stations (HVDC/FACTS); Renewable Energy owns the \
variable-source integration problem; Protection's relay theory is shared honestly \
with Measurements' instrument-transformer census.",
    """- GATE 2026 EE Section 6 'Power Systems' (EE_2026_Syllabus.pdf, extracted this
  pass): 'Basic concepts of electrical power generation, AC and DC transmission
  concepts, Models and performance of transmission lines and cables, Economic Load
  Dispatch (with and without considering transmission losses), Series and shunt
  compensation, Electric field distribution and insulators, Distribution systems,
  Per-unit quantities, Bus admittance matrix, Gauss-Seidel and Newton-Raphson load
  flow methods, Voltage and Frequency control, Power factor correction, Symmetrical
  components, Symmetrical and unsymmetrical fault analysis, Principles of
  over-current, differential, directional and distance protection; Circuit breakers,
  System stability concepts, Equal area criterion' — the entire section is this
  book's register.
- Stevenson & Grainger, Power System Analysis — the FULL 16-chapter TOC read this
  pass from the Library of Congress catdir record (Basic Concepts; Transformers; The
  Synchronous Machine; Series Impedance and Capacitance of Transmission Lines;
  Current and Voltage Relations; The Admittance Model; The Impedance Model; Power
  Flow Solutions; Symmetrical Faults; Symmetrical Components; Unsymmetrical Faults;
  Economic Operation; Zbus Methods; State Estimation; Stability) — the chapter spine
  this book follows.
- Wadhwa's Electrical Power Systems named as the Indian pole; Glover & Sarma named.""",
    [
        ch("the-grid-worldview", "The Power System Worldview",
           "The grid as one machine (the honest note that every generator spins \
together); the generation census (thermal, hydro, nuclear, the renewables routed to \
their own book); transmission versus distribution by voltage class; why AC won and \
where DC returns (HVDC priced honestly with Power Electronics cross-referenced); the \
frequency discipline; and the one-line diagram as the system's native language.",
           ["The Grid as One Machine",
            "The Generation Census",
            "AC, DC and the HVDC Honest Note",
            "The One-Line Diagram as Language"]),
        ch("per-unit-quantities", "Per-Unit Quantities",
           "The per-unit idea as the system's honest arithmetic (why percentages of \
chosen bases tame every transformer ratio in sight); base conversion and the \
per-unit selection craft; per-unit networks built; the per-unit impedance of \
transformers and machines; and the change-of-base arithmetic worked until fluent.",
           ["The Idea and Its Bases",
            "Base Conversion Worked",
            "The Per-Unit Network Built"]),
        ch("transmission-line-modelling", "Transmission Line Modelling",
           "Line resistance with skin and temperature honesty; inductance from \
conductor geometry (internal and external flux linkages, the GMR/GMD craft, \
bundling); capacitance of single and bundled configurations; the nominal pi and T \
models; and the classification census (short, medium, long) that picks the honest \
model.",
           ["Inductance from Geometry",
            "Capacitance and Bundling",
            "The Nominal Models and Classes"]),
        ch("line-performance-and-compensation", "Line Performance and Compensation",
           "Voltage regulation and efficiency; the long line and its surge-impedance \
loading (Ferranti priced); power transfer and the power-angle honest note; \
travelling waves glanced; series and shunt compensation with their purposes priced \
(GATE's line); power-factor correction from the system's side; and the line's \
reactive bookkeeping drawn.",
           ["Regulation and Efficiency",
            "Ferranti and SIL",
            "Series and Shunt Compensation",
            "The Reactive Bookkeeping"]),
        ch("insulators-cables-and-fields", "Insulators, Cables and Fields",
           "The electric-field distribution around conductors priced; insulator \
strings (pin, suspension, strain) with string efficiency and grading; corona and \
its losses (advantages named honestly); underground cables — construction, \
capacitance and thermal limits; and the insulation doorstep to High Voltage \
Engineering.",
           ["The Field Around a Conductor",
            "String Efficiency and Grading",
            "Corona Priced Honestly",
            "Cables and Their Thermal Limits"]),
        ch("load-flow", "The Bus Model and Load Flow",
           "The bus-admittance matrix built (with the inspection craft); bus \
classification (slack, PQ, PV); the Gauss-Seidel iteration read honestly (its slow \
convergence named); the Newton-Raphson method with the Jacobian structure priced; \
fast-decoupled named as the industry's compromise; convergence and the honest \
handling of reactive limits; and distribution-system load flow glanced (backward/ \
forward sweep named).",
           ["The Y-Bus Built",
            "Gauss-Seidel, Honestly Slow",
            "Newton-Raphson and the Jacobian",
            "Fast-Decoupled and Distribution Glances"]),
        ch("symmetrical-faults-and-breakers", "Symmetrical Faults and Circuit Breakers",
           "The three-phase fault priced on the Thevenin honest note (fault MVA, the \
Z-bus route); current-limiting reactors; the circuit breaker's duty — breaking \
capacity, RRRV and the arc's honest physics glanced; breaker ratings and testing \
cross-referenced to High Voltage Engineering; fuses glanced; and the fault's \
duration discipline that protection answers.",
           ["Fault MVA by Thevenin",
            "The Breaker's Duty Priced",
            "Arc Physics Glanced Honestly",
            "The Duration Discipline"]),
        ch("symmetrical-components-and-faults", "Symmetrical Components and Unsymmetrical Faults",
           "Fortescue's symmetrical components earned (the a-operator arithmetic); \
sequence impedances of the system's pieces (machines cross-referenced, lines, \
transformers with their connection honesty); sequence networks assembled; and the \
unsymmetrical fault census — LG, LL, LLG — each priced on the interconnected \
sequence networks with the boundary conditions stated.",
           ["Fortescue's Components Earned",
            "Sequence Impedances Assembled",
            "The LG Fault Priced",
            "The LL and LLG Faults Priced"]),
        ch("protection", "Protection",
           "Why protection exists (the fault's damage census); the relay idea with \
its operating characteristic; overcurrent protection (plug setting, time-multiplier, \
IDMT curves); directional protection; differential protection (the circulating \
craft that prices transformers and buses); distance protection with the R-X plane \
and zone settings; instrument transformers (CT/PT) with their honest burden \
(cross-referenced to Electrical Measurements); and the modern numerical-relay \
glance.",
           ["The Relay Idea and Its Curves",
            "Directional and Differential Craft",
            "Distance Protection in the R-X Plane",
            "CTs, PTs and Their Honest Burden"]),
        ch("stability-and-economics", "Stability, Control and Economic Operation",
           "The swing equation earned from the machine's dynamics; the equal-area \
criterion worked on faults cleared at time t; the critical clearing time priced; \
steady-state and transient stability distinguished; voltage and frequency control \
(the governor and excitation honest notes, primary/secondary/tertiary); economic \
load dispatch — the lambda-iteration craft with losses (the penalty factor honest \
note); unit commitment glanced; and the power-system synthesis with the doorsteps — \
High Voltage Engineering, Renewable Energy's integration, the future smart-grid \
books.",
           ["The Swing Equation Earned",
            "Equal-Area Worked",
            "Voltage and Frequency Control",
            "Economic Dispatch with Losses",
            "The Synthesis and Doorsteps"]),
    ],
)

book(
    "controlSystems", "control-systems", "Control Systems",
    "the sixteenth book of the Engineering shelf (Electrical branch, shared by every branch)",
    "Feedback as an engineering principle — modelling, stability and design of dynamic systems",
    "First control course → servomechanism and process-control readiness",
    "Feedback as a principle every branch speaks: the control idea and its history \
(Watt's governor to the electronics of today); mathematical modelling of \
electrical, mechanical, thermal and fluid systems (the analogous-structure craft \
cross-referenced to Circuit Theory and Engineering Mechanics); transfer functions, \
block diagrams and signal-flow graphs with Mason's gain rule; transient and \
steady-state analysis of linear systems (first/second-order specs, system types, \
error constants); stability by Routh-Hurwitz; the root locus — drawn by the rules \
and used for design; frequency-domain design — Bode plots, Nyquist's criterion, \
gain and phase margins; lag, lead and lag-lead compensation designed honestly; \
the industrial controller census — P, PI and PID with tuning; state-space models \
and the solution of state equations (controllability and observability priced); \
the digital-control glance (sampling, z-domain cross-referenced to Signals and \
Systems); and the synthesis with applications across every branch. Cross-references \
Signals and Systems, the Mathematics shelf's Laplace chapters, Power Electronics \
(drives), Robotics (servos) and hands off to the CS shelf's machines.",
    ("#4338ca", "#312e81"),
    "Control Systems owns feedback theory for the whole shelf (GATE EE S7 and EC S6 \
name identical registers — one book, both papers). Signals and Systems owns the \
signal-transform machinery; the Mathematics shelf owns the pure Laplace/z theory; \
Power Electronics and Robotics consume the servo designs; the CS shelf's Operating \
Systems owns scheduler feedback (a different beast, honestly noted).",
    """- GATE 2026 EE Section 7 'Control Systems' and EC Section 6 (both syllabus PDFs
  downloaded + extracted this pass): 'Mathematical modelling and representation of
  systems, Feedback principle, transfer function, Block diagrams and Signal flow
  graphs, Transient and Steady-state analysis of linear time invariant systems,
  Stability analysis using Routh-Hurwitz and Nyquist criteria, Bode plots, Root
  loci, Lag, Lead and Lead-Lag compensators; P, PI and PID controllers; State space
  model, Solution of state equations of LTI systems' — the identical registers are
  this book's chapter spine.
- Ogata, Modern Control Engineering — the chapter arc web-checked this pass from
  the Pearson TOC and the open preface PDFs (Introduction; Mathematical Modelling;
  Modelling in the frequency and time domains; Transient-Response Analysis;
  Root-Locus Analysis; Frequency-Response Analysis; Control Systems Design; PID
  controllers; Control Systems Analysis in State Space) — the standard spine.
- Nagrath & Gopal's Control Systems Engineering named as the Indian pole; Nise
  named.""",
    [
        ch("the-feedback-idea", "The Feedback Idea",
           "Open-loop versus closed-loop priced honestly (the sensitivity and \
disturbance-rejection gains, the instability cost named early); Watt's governor and \
Black's amplifier as the two historical engines; the component census (sensor, \
controller, actuator, plant); and the positive-feedback honest note.",
           ["Open versus Closed, Priced",
            "Two Historical Engines",
            "The Component Census"]),
        ch("modelling", "Mathematical Modelling",
           "Modelling electrical networks (the impedance honest note), mechanical \
translational and rotational systems, thermal and liquid-level systems — the \
analogous-structure craft that lets one theory serve every branch; linearisation \
named with its honest limits; transfer functions from the differential equations; \
and the initial-vs-zero-state honesty.",
           ["The Analogous Structures",
            "Linearisation and Its Limits",
            "Transfer Functions Earned"]),
        ch("block-diagrams-and-signal-flow", "Block Diagrams and Signal Flow Graphs",
           "Block-diagram algebra as a craft (series, parallel, feedback moves); the \
signal-flow graph as the compressed form; Mason's gain rule earned and worked on \
real graphs; and the honest equivalence of the two representations.",
           ["Block-Diagram Algebra",
            "Signal-Flow Graphs Drawn",
            "Mason's Gain Rule Earned"]),
        ch("time-response", "Transient and Steady-State Analysis",
           "Standard test signals (step, ramp, impulse); first-order response with \
its time constant; second-order response with the damping ratio and natural \
frequency, the specs (overshoot, settling, rise, peak time) priced; the dominant- \
pole honesty; steady-state errors by system type and the error constants (position, \
velocity, acceleration); and disturbance rejection priced.",
           ["Second-Order Specs Priced",
            "The Dominant-Pole Honesty",
            "System Types and Error Constants",
            "Disturbance Rejection Priced"]),
        ch("stability-routh", "Stability and Routh-Hurwitz",
           "Stability as the bounded-input honest note (its exact statement \
cross-referenced to Signals and Systems); the pole-location criterion; the \
Routh-Hurwitz test worked (with the zero-row and auxiliary-equation moves); the \
relative-stability honest note; and the special cases that examiners love, \
solved honestly.",
           ["Stability Stated Honestly",
            "Routh-Hurwitz Worked",
            "The Special Cases Solved"]),
        ch("the-root-locus", "The Root Locus",
           "The root-locus idea (gain as the pencil that moves the poles); the \
construction rules earned one by one (real-axis segments, asymptotes, departure \
and arrival angles, the jomega crossings by Routh); the locus used for design — \
gain selection to meet damping; the effect of added poles and zeros priced; and \
the two-locus systems (the positive-feedback honest note).",
           ["The Rules Earned One by One",
            "Design by Locus",
            "Poles and Zeros Added",
            "The jomega Crossings"]),
        ch("frequency-response-nyquist", "Frequency Response and Nyquist",
           "The frequency response as the system's signature; Bode plots drawn \
fluently (the straight-line craft, the corrections); gain and phase margins read \
from Bode and from the polar plot; Nyquist's criterion earned (the encirclement \
counting with N = Z - P); the delay honest note; and closed-loop resonance (Mr, \
bandwidth) priced.",
           ["Bode Drawn Fluently",
            "Margins Read Honestly",
            "Nyquist's Criterion Earned",
            "Mr and Bandwidth Priced"]),
        ch("compensation-design", "Compensators and the Design Craft",
           "Design as the honest posture (specifications into dynamics): lag \
compensation (the steady-state gain engine), lead compensation (the \
transient/phase-margin engine), lag-lead priced; the design worked in the \
frequency domain and on the locus; and the trade-off census every design must \
sign.",
           ["Lag: the Steady-State Engine",
            "Lead: the Phase-Margin Engine",
            "Lag-Lead and the Trade-Off Census"]),
        ch("pid-controllers", "P, PI and PID Controllers",
           "The industrial controller census priced (P — fast but biased, I — the \
bias killer, D — the anticipator with its noise honest note); the \
Ziegler-Nichols tuning routes (ultimate-gain and reaction-curve); anti-windup \
named; and the PID's honest limits pointing to state-space and modern design.",
           ["The Controller Census Priced",
            "Ziegler-Nichols Tuning",
            "Anti-Windup and the Honest Limits"]),
        ch("state-space-and-doorstep", "State Space, Digital Glimpse and the Doorstep",
           "The state-space model (state variables chosen, the honest non-uniqueness); \
the solution of state equations (the matrix exponential, the Laplace route); transfer \
function from the model and back; controllability and observability priced (the \
rank tests); the digital-control glance (sampling, the z-plane cross-referenced to \
Signals and Systems and DSP); and the doorsteps — Power Electronics' drives, \
Robotics' servos, the process industries, the CS shelf's feedback-named systems.",
           ["The Model and Its Solutions",
            "Controllability and Observability",
            "The Digital Glance",
            "The Doorsteps: Drives, Servos, Processes"]),
    ],
)

book(
    "powerElectronics", "power-electronics", "Power Electronics",
    "the seventeenth book of the Engineering shelf (Electrical branch)",
    "Power processed by switches — devices, converters, drives and their honest arithmetic",
    "First power electronics course → converter and drives readiness",
    "Power as a switched quantity: the power-electronics idea (efficiency through \
switching, the converter census); power semiconductor devices — the power diode, \
thyristor (static V-I and firing circuits), power MOSFET and IGBT, each with its \
honest niche; line-frequency diode rectifiers (single and three-phase, uncontrolled) \
with performance parameters and their harmonic honest note; thyristor converters — \
the controlled rectifier family with voltage and current commutation, the \
magnitude and phase of line-current harmonics and the power-factor and \
distortion-factor arithmetic GATE prices; bidirectional AC-DC voltage-source \
converters named; DC-DC conversion — buck, boost and buck-boost converters \
analysed in continuous conduction with their discontinuous honesty; inverters — \
single and three-phase voltage and current source, with sinusoidal PWM; AC voltage \
controllers and cycloconverters glanced; the application census — DC and AC drives \
(cross-referenced to Electrical Machines), UPS and switched-mode supplies; device \
protection and gate-drive craft; and the synthesis with the modern doorstep \
(wide-bandgap devices named). Cross-references Circuit Theory, Electrical Machines, \
Control Systems and hands off to Renewable Energy's inverters.",
    ("#c2410c", "#7c2d12"),
    "Power Electronics owns the switched-processing of power. Electrical Machines \
owns the machines the drives feed; Renewable Energy owns the generation-integration \
problem (its inverters route here); Power Systems owns the grid the converters \
connect to (HVDC/FACTS cross-referenced); Electronic Devices and Circuits owns the \
device physics; the CS shelf owns nothing here — the boundary is clean.",
    """- GATE 2026 EE Section 10 'Power Electronics' (EE_2026_Syllabus.pdf, extracted
  this pass): 'Static V-I characteristics and firing/gating circuits for Thyristor,
  MOSFET, IGBT; DC to DC conversion: Buck, Boost and Buck-Boost Converters; Single
  and three-phase configuration of uncontrolled rectifiers; Voltage and Current
  commutated Thyristor based converters; Bidirectional ac to dc voltage source
  converters; Magnitude and Phase of line current harmonics for uncontrolled and
  thyristor based converters; Power factor and Distortion Factor of AC to DC
  converters; Single-phase and three-phase voltage and current source inverters,
  sinusoidal pulse width modulation' — the entire section is this book's register.
- Rashid, Power Electronics: Circuits, Devices and Applications — the chapter arc
  web-checked this pass (the device chapters, rectifiers, choppers, inverters,
  application chapters); Bimbhra's Power Electronics named as the Indian pole.
- Mohan, Undeland & Robbins named as the depth pole.""",
    [
        ch("the-switched-idea", "The Power-Electronics Idea",
           "Why power is processed by switches (the linear-regulator honest note: \
efficiency priced); the converter census — AC-DC, DC-AC, DC-DC, AC-AC located on \
one map; the switching-frequency trade-off stated; and the control-vs-power honest \
split that defines the field.",
           ["Switching Priced Against Linear",
            "The Converter Census on One Map",
            "The Frequency Trade-Off"]),
        ch("power-semiconductor-devices", "Power Semiconductor Devices",
           "The power diode (fast and slow recovery); the thyristor — static V-I \
characteristics, latching and holding, turn-on craft and firing/gating circuits, \
turn-off honest note (the commutation problem stated); the power MOSFET and the \
IGBT with their niches priced by voltage and frequency; device ratings and SOA \
glanced; and the wide-bandgap future named (SiC, GaN).",
           ["The Thyristor: Latching and Firing",
            "MOSFET and IGBT Niches Priced",
            "Ratings and the Wide-Bandgap Future"]),
        ch("line-frequency-rectifiers", "Line-Frequency Diode Rectifiers",
           "Single-phase half and full bridges with their PIV and ripple honest \
notes; three-phase rectifiers (half, full six-pulse) with the six-pulse ripple \
arithmetic; performance parameters (form factor, ripple factor, TUF, efficiency); \
capacitor-filter consequences priced; and the harmonic injection honest note that \
Power Systems' grid side inherits.",
           ["Single-Phase Bridges",
            "The Six-Pulse Arithmetic",
            "Performance Parameters",
            "Filters and the Harmonic Note"]),
        ch("thyristor-converters", "Thyristor Converters",
           "Single-phase fully controlled rectifiers with firing-angle control (the \
RLE load with motoring and inversion honest notes); three-phase fully controlled \
converters; half-controlled bridges glanced; commutation — voltage and current \
commutated thyristor circuits priced (GATE's exact register); line-current \
harmonics — magnitude and phase for uncontrolled and thyristor converters; and the \
power-factor and distortion-factor arithmetic that prices every AC-DC converter.",
           ["Firing-Angle Control and Inversion",
            "Three-Phase Controlled Bridges",
            "Voltage and Current Commutation",
            "Harmonics, Power Factor, Distortion Factor"]),
        ch("dc-dc-converters", "DC-DC Converters",
           "The chopper idea; buck converter analysed in continuous conduction (the \
volt-second balance engine), its discontinuous honesty noted; boost and buck-boost \
by the same engine; the Cuk and SEPIC glanced; non-isolated versus isolated (the \
flyback/forward honest notes); and the modern SMPS census priced.",
           ["The Volt-Second Engine",
            "Buck, Boost, Buck-Boost",
            "Discontinuous Conduction Honesty",
            "Isolated Census and SMPS"]),
        ch("inverters", "Inverters",
           "Single-phase voltage-source inverters (square, quasi-square, the \
harmonic census); three-phase VSIs (180 and 120-degree modes); sinusoidal PWM — \
the triangulation craft with modulation index and the harmonic suppression \
arithmetic; current-source inverters priced against VSI; resonant inverters \
glanced; and the drive and UPS applications cross-referenced.",
           ["Single-Phase VSIs",
            "Three-Phase Modes",
            "Sinusoidal PWM Earned",
            "CSI and Applications"]),
        ch("ac-controllers-and-drives", "AC Controllers, Drives and Applications",
           "AC voltage controllers (phase control with the load honesty); \
cycloconverters glanced; then the drives census — DC motor drives (single and \
dual converters with the four-quadrant map); induction motor control (V/f with \
the flux honest note, slip-energy recovery named, vector control glanced and \
routed); synchronous and BLDC drive glimpses; and UPS topologies priced.",
           ["AC Voltage Controllers",
            "Four-Quadrant DC Drives",
            "V/f and the Flux Honesty",
            "UPS Topologies Priced"]),
        ch("protection-and-synthesis", "Device Protection, Gate Drives and the Synthesis",
           "Snubber circuits priced (the dv/dt and di/dt honest notes); gate-drive \
craft (isolation, the MOSFET/IGBT drive census); thermal design (the junction \
arithmetic cross-referenced to Heat Transfer); series and parallel device operation \
glanced; and the synthesis map with the doorsteps — Renewable Energy's inverters \
and MPPT, Power Systems' HVDC/FACTS, the motor-drive future.",
           ["Snubbers Priced",
            "Gate Drives and Isolation",
            "The Thermal Arithmetic",
            "The Doorsteps: Solar, Grid, Drives"]),
    ],
)

book(
    "electricalMeasurements", "electrical-measurements", "Electrical Measurements",
    "the eighteenth book of the Engineering shelf (Electrical branch)",
    "Instruments, bridges and the honest quantification of electrical quantities",
    "First measurements course → instrumentation and DAQ readiness",
    "The measurement discipline: units, standards and the error-and-calibration \
craft (statistics of errors cross-referenced to the Mathematics shelf's \
Statistics); the indicating instrument family — PMMC and moving iron, their \
torque craft, ammeters and voltmeters with shunts and multipliers, rectifier and \
electrodynamic instruments; power and energy measurement — the \
electrodynamometer wattmeter, polyphase measurement (the two-wattmeter craft \
cross-referenced to Circuit Theory), induction energy meters, maximum-demand \
meters; instrument transformers (CT and PT) with their burdens, errors and the \
safety honest note; bridges — DC (Wheatstone with Kelvin's double for low \
resistance) and AC (Maxwell, Hay, Schering, Wien, Anderson for inductance and \
capacitance) with detectors and guard circuits; potentiometers (DC and AC; the \
calibration engine); magnetic measurements glanced (hysteresis and flux); digital \
instruments — DVM architectures, multimeters, phase/time/frequency counters; \
the oscilloscope (CRT craft and the modern DSO, Lissajous figures); transducers \
and signal conditioning with telemetry glanced; and the data-acquisition doorstep. \
Cross-references Power Systems' protection (the CT/PT consumer), Electrical \
Machines (testing) and hands off to the ECE shelf's Embedded Systems.",
    ("#0f766e", "#134e4a"),
    "Electrical Measurements owns electrical quantification. Power Systems' protection \
chapters consume the CT/PT census; Electrical Machines' testing chapters consume the \
wattmeter and energy-meter craft; the error statistics route to the Mathematics \
shelf's Statistics book; transducers and DAQ hand their deeper systems story to \
Embedded Systems and the CS shelf's Internet of Things.",
    """- GATE 2026 EE Section 8 'Electrical and Electronic Measurements'
  (EE_2026_Syllabus.pdf, extracted this pass): 'Bridges and Potentiometers,
  Measurement of voltage, current, power, energy and power factor; Instrument
  transformers, Digital voltmeters and multi-meters, Phase, Time and Frequency
  measurement; Oscilloscopes, Error analysis' — the entire section is this book's
  register.
- A.K. Sawhney, A Course in Electrical and Electronic Measurements and
  Instrumentation — the Indian canonical arc web-checked this pass (the
  measurement-systems/bridges/potentiometers/CRO organisation confirmed through the
  open contents listings); S.K. Bhattacharya's Measurements edition TOC
  web-checked as the second pole.
- Golding & Widdis named as the classic pole.""",
    [
        ch("the-measurement-discipline", "The Measurement Discipline",
           "Why measurement is engineering's honest instrument; units and standards \
(absolute and working); the generalised measurement system (detector, transducer, \
signal conditioning, display); errors — systematic and random, statistics of \
errors and the probable-error craft (Statistics cross-referenced); calibration \
as the discipline's conscience; and the accuracy/precision/sensitivity \
vocabulary priced.",
           ["Standards and the SI Honest Note",
            "Errors Priced and Stated",
            "Calibration as Conscience"]),
        ch("indicating-instruments", "Indicating Instruments",
           "The PMMC movement earned (the D'Arsonval craft, its torque equation and \
control damping); moving-iron instruments (attraction and repulsion) with their \
AC honesty; rectifier and thermocouple instruments for the high-frequency honest \
note; ammeters and voltmeters with shunts and multipliers (the range-extension \
arithmetic); electrodynamic instruments; and the calibration of the indicating \
census.",
           ["The PMMC Earned",
            "Moving Iron's AC Honesty",
            "Shunts and Multipliers",
            "Electrodynamic Instruments"]),
        ch("power-and-energy-measurement", "Power and Energy Measurement",
           "The electrodynamometer wattmeter (its connections with the compensating \
honest note); polyphase power by the two-wattmeter method (worked on balanced and \
the unbalanced honest note); power factor and reactive measurement glanced; the \
induction energy meter (its driving and braking craft, creep and its adjustment); \
maximum-demand and trivector meters glanced; and the metering of the consumer \
priced.",
           ["The Wattmeter Craft",
            "Two-Wattmeter Worked",
            "The Energy Meter's Craft",
            "Maximum-Demand Glanced"]),
        ch("instrument-transformers", "Instrument Transformers",
           "Why instrument transformers (isolation and range); the current \
transformer — ratio and phase-angle errors, the burden honest note, the \
never-open-circuit safety law; the potential transformer with its errors; the \
capacitor-voltage transformer glanced; and the measurement-grade versus \
protection-grade census (Power Systems' protection cross-referenced).",
           ["The CT and Its Errors",
            "The Never-Open-Circuit Law",
            "PTs and CVTs",
            "Measurement versus Protection Grades"]),
        ch("bridges", "Bridges",
           "The bridge idea (the null craft — why nulling earns accuracy); \
Wheatstone's bridge and its sensitivity; Kelvin's double bridge for low \
resistance; insulation resistance (the megger craft); then the AC family — \
Maxwell, Hay and Anderson for inductance, Schering and Wien for capacitance and \
frequency, each with its balance equations worked; detectors and guard circuits; \
and the bridge census table that examiners read.",
           ["The Null Craft Earned",
            "Wheatstone and Kelvin Double",
            "The AC Family Worked",
            "Detectors and Guards"]),
        ch("potentiometers-and-magnetic-measurements", "Potentiometers and Magnetic Measurements",
           "The DC potentiometer as the calibration engine (the standard-cell \
honest note); the AC potentiometer glanced; calibration of ammeters, voltmeters \
and wattmeters by potentiometer priced; then magnetic measurements — the \
hysteresis loop traced (the epstein frame and fluxmeter craft), ballistic \
galvanometer glanced, and the magnetic census closed honestly.",
           ["The Potentiometer as Calibration",
            "Calibration Priced End-to-End",
            "Hysteresis Loops Traced"]),
        ch("digital-instruments", "Digital Instruments",
           "Why digital won (the resolution and drift honest notes); DVM \
architectures — ramp, dual-slope, successive-approximation and integrating, each \
priced; digital multimeters; frequency and time-interval measurement (the counter \
craft, the time-base honesty, reciprocal counting); phase measurement; and the \
specification sheet read as a first language (resolution, accuracy, input \
impedance).",
           ["DVM Architectures Priced",
            "Counters and the Time Base",
            "Phase Measured",
            "Specification Sheets Read"]),
        ch("oscilloscopes", "The Oscilloscope",
           "The CRT craft (its gun, deflection and phosphor census); triggering \
earned (the stable-display honest note); the Lissajous figures for frequency and \
phase; the DSO (sampling, aliasing honesty cross-referenced to Signals and \
Systems, memory and math channels); probes and their compensation; and the \
measurement census the scope actually serves.",
           ["The CRT Craft",
            "Triggering Earned",
            "Lissajous for Frequency and Phase",
            "The DSO and Its Aliasing Honesty"]),
        ch("transducers-and-doorstep", "Transducers, Telemetry and the Doorstep",
           "The transducer census (resistive, inductive, capacitive, piezoelectric — \
each family priced by what it senses); signal conditioning and the bridge \
revisited; telemetry glanced (the remote measurement honest note); data \
acquisition (sampling, the DAQ chain) routed to Embedded Systems; and the \
synthesis — the honest quantification of the electrical world, one instrument \
census on a page.",
           ["The Transducer Census",
            "Signal Conditioning Revisited",
            "Telemetry and DAQ Routed",
            "The Synthesis Census"]),
    ],
)

book(
    "highVoltageEngineering", "high-voltage-engineering", "High Voltage Engineering",
    "the nineteenth book of the Engineering shelf (Electrical branch)",
    "Breakdown, generation and testing at high voltage — the insulation side of the grid",
    "First high-voltage course → testing-and-insulation readiness",
    "The insulation discipline: why high voltage exists (the power-transfer honest \
note); conduction and breakdown in gases — Townsend's avalanches, Paschen's law, \
the streamer and corona crafts; breakdown in liquid dielectrics (purified oil's \
honest mechanisms) and in solid dielectrics (electrothermal, electromechanical \
and treeing); the insulating-materials census (gases, liquids, solids, composites \
and their applications); generation of high voltages and currents — cascaded \
transformers for AC, Cockcroft-Walton multipliers and electrostatic generators \
for DC, impulse generators (Marx circuit) with the standard impulse wave shaped \
honestly; measurement of high voltages — sphere gaps, peak voltmeters, \
capacitive and resistive dividers; high-voltage testing of apparatus (power \
frequency, impulse, partial discharge named) and the standards census (IEC/IS); \
over-voltage phenomena — lightning (its physics honestly priced) and switching \
surges; and insulation coordination with protective devices (arresters) closing \
to the Power Systems doorstep. Cross-references Power Systems, Electromagnetic \
Fields and Waves and hands off to Renewable Energy's offshore and HVDC notes.",
    ("#7f1d1d", "#450a0a"),
    "High Voltage Engineering owns insulation, breakdown and testing depth. Power \
Systems owns the grid context (corona, insulation coordination appear there at \
system level, cross-referenced); Electromagnetic Fields and Waves owns the field \
theory beneath breakdown; the future Physics shelf may grow a plasma/ionisation \
line (cross-reference when planned).",
    """- Naidu & Kamaraju, High Voltage Engineering — the classic arc web-checked
  this pass (Conduction and Breakdown in Gases; Liquid Dielectrics; Solid
  Dielectrics; Applications of Insulating Materials; Generation of High Voltages
  and Currents; Measurement of High Voltages; High-Voltage Testing; the
  overvoltage/insulation chapters confirmed through the open listings and search
  records).
- Kuffel, Zaengl & Kuffel named as the depth pole; the IEC 60xxx and IS standards
  census noted for authoring time.
- GATE context: the EE register prices HVE indirectly through Power Systems'
  insulation and breaker lines — this book serves the elective and university
  pole honestly.""",
    [
        ch("the-hv-world", "The High-Voltage World",
           "Why voltage climbs (the power-transfer honest note P = root-3 V I); \
the insulation problem stated as the discipline; the voltage-class census; the \
testing-lab worldview; and the safety craft stated as law before anything else.",
           ["Why Voltage Climbs",
            "The Insulation Problem Stated",
            "The Lab and Its Safety Law"]),
        ch("gaseous-breakdown", "Conduction and Breakdown in Gases",
           "Ionisation processes priced (collision, photo, thermal); Townsend's \
first and second coefficients and the avalanche growth equation; the self- \
sustaining discharge criterion; Paschen's law earned and its minimum read \
honestly; the streamer theory for high pd; corona (its audible and loss census \
cross-referenced to Power Systems); and spark versus arc distinguished.",
           ["Townsend's Avalanche Earned",
            "Paschen's Law and Its Minimum",
            "Streamers Beyond Townsend",
            "Corona Priced"]),
        ch("liquid-and-solid-breakdown", "Liquid and Solid Breakdown",
           "Liquid dielectrics — the purified-oil honest mechanisms (intrinsic, \
suspended-particle, cavitation, electroconvection); moisture and contamination as \
the honest killers; solid dielectrics — intrinsic, electromechanical and \
electrothermal breakdown; treeing and tracking named with their honest \
prevention; composite insulation (oil-impregnated paper) priced as the \
transformer's real life; and the testing of the liquid and solid census.",
           ["The Liquid Mechanisms",
            "The Solid Mechanisms",
            "Treeing and Tracking",
            "Composite Insulation Priced"]),
        ch("insulating-materials", "Applications of Insulating Materials",
           "The materials census — gases (SF6 with its environmental honest note), \
mineral and synthetic liquids, the solid family (paper, pressboard, epoxy, mica, \
polymer films, porcelain and glass), and their honest niches (transformer, \
switchgear, cable, insulator); thermal classes and ageing; and the selection \
craft by stress, thermal and environment.",
           ["The Gaseous and Liquid Census",
            "The Solid Family and Its Niches",
            "Thermal Classes and Ageing"]),
        ch("hv-generation", "Generation of High Voltages and Currents",
           "AC generation — cascaded transformers (with the reactor honest note); \
resonant transformers glanced; DC generation — the Cockcroft-Walton \
voltage-doubler chains analysed, the Van de Graaff craft; impulse generation — \
the Marx circuit analysed with the R-C wave-shaping arithmetic and the standard \
1.2/50 lightning and 250/2500 switching waves earned; and high-current impulse \
generation glanced.",
           ["Cascaded Transformers",
            "Cockcroft-Walton Analysed",
            "The Marx Circuit Earned",
            "Standard Waves Shaped"]),
        ch("hv-measurement", "Measurement of High Voltages",
           "Why ordinary meters cannot come (the impedance honest note); sphere \
gaps as the calibration honest note (with the voltage-measurement law); peak- \
reading voltmeters; potential dividers — resistive, capacitive and the mixed \
damped craft; electrostatic voltmeters; and the measurement of impulse (the \
oscilloscope cross-referenced) with partial-discharge detection named.",
           ["Sphere Gaps as Calibration",
            "Peak Voltmeters and Dividers",
            "The Mixed-Damped Craft",
            "Impulse Measured, PD Named"]),
        ch("hv-testing", "High-Voltage Testing and Standards",
           "The test census — power frequency (wet and dry), impulse (up and down \
methods), partial discharge and interference; testing of the apparatus census \
(transformers, bushings, insulators, cables, surge arresters) each priced; the \
standards census (IEC 60xxx and the IS family) as the profession's shared \
language; the lab organisation and safety craft; and the test-report read as a \
genre.",
           ["The Test Census",
            "Apparatus Priced One by One",
            "The Standards as Shared Language",
            "The Test Report as Genre"]),
        ch("overvoltage-and-coordination", "Overvoltage and Insulation Coordination",
           "Lightning — its physics honestly priced (the stroke census, the \
mechanism models named); switching surges (the line-switching honest note); \
protective devices — the surge arrester (gap versus gapless, the ZnO craft) and \
shielding; insulation coordination — the BIL census, protective margins \
arithmetic, the coordination drawn on the voltage-time honest plane; and the \
doorstep — Power Systems' protection, the offshore and HVDC notes of Renewable \
Energy.",
           ["Lightning Priced Honestly",
            "Switching Surges",
            "Arresters and Their Margins",
            "Coordination Drawn"]),
    ],
)

book(
    "renewableEnergy", "renewable-energy", "Renewable Energy",
    "the twentieth book of the Engineering shelf (Electrical branch, shared by every branch)",
    "Sun, wind, water and the grid — the engineering of sustainable generation",
    "First renewable-energy course → grid-integration readiness",
    "The generation future: the energy landscape (resources, demand growth, the \
carbon honest note, energy accounting); solar thermal (radiation geometry, \
collectors flat-plate and concentrating, storage); solar photovoltaics (the cell \
physics cross-referenced to Electronic Devices and Circuits, modules and arrays, \
MPPT and power electronics cross-referenced, systems on and off grid); wind (the \
resource, turbine aerodynamics cross-referenced to Fluid Mechanics, the \
electrical families — fixed and variable speed, generator cross-referenced to \
Electrical Machines, the wind statistics craft); hydro (small hydro priced, \
turbines cross-referenced to Hydraulics and Water Resources); bioenergy (biomass, \
biogas, biofuels); geothermal and the emerging census (tidal, wave, hydrogen and \
fuel cells named); energy storage priced honestly; and grid integration — \
variability, balancing, inverters, microgrids and the smart-grid honest note — \
closing with policy and economics glanced. Cross-references Thermodynamics, \
Fluid Mechanics, Electrical Machines, Power Electronics, Power Systems and hands \
off to Environmental Engineering's sustainability chapters.",
    ("#15803d", "#166534"),
    "Renewable Energy owns the sustainable-generation engineering. Power Systems owns \
the grid and stability; Power Electronics owns the converter/inverter machinery; \
Electrical Machines owns the generator families; Hydraulics and Water Resources own \
the hydraulic and irrigation works; Environmental Engineering owns the environmental \
and waste side; the resource-climate science routes to the future Physics shelf \
(cross-reference when planned).",
    """- Boyle, Renewable Energy: Physics, Engineering, Environmental Impacts,
  Economics & Planning (the open front-matter TOC and Google Books structure
  web-checked this pass — Part I basic scientific principles, the solar/wind/
  bioenergy/hydro chapters, the integration and planning parts); the 4e sample-
  chapter front matter read for the part structure.
- GATE context: no dedicated GATE renewable paper; the EE/IN registers price
  renewables within Power Systems' generation concepts — this book serves the
  university elective and the professional pole honestly.
- Tiwari's Renewable Energy named as the Indian pole.""",
    [
        ch("the-energy-landscape", "The Energy Landscape",
           "The global energy ledger (resources, reserves, demand growth and the \
honest arithmetic of energy units); the carbon honest note and climate framing \
stated without preaching; the renewable census on one map (solar, wind, hydro, \
bio, geothermal, marine); energy accounting — capacity factor and the honest \
difference between watts and watt-hours; and the grid-integration problem stated \
as the book's honest climax.",
           ["The Global Ledger Read",
            "Capacity Factor and Honest Units",
            "The Census on One Map",
            "The Integration Problem Stated"]),
        ch("solar-thermal", "Solar Thermal",
           "The solar resource — radiation geometry (declination, hour angle, the \
tilt craft), measurement (pyranometers cross-referenced to Measurements); \
flat-plate collectors analysed (the Hottel-Whillier honest note); concentrating \
families (parabolic trough, dish, central receiver) priced by concentration and \
temperature; thermal storage; and the solar-thermal power plant census (the Rankine \
cross-referenced to Thermodynamics).",
           ["Radiation Geometry Earned",
            "Flat-Plate Collectors Analysed",
            "Concentrating Families Priced",
            "Storage and the Power Census"]),
        ch("solar-photovoltaics", "Solar Photovoltaics",
           "The PV cell physics cross-referenced to Electronic Devices and Circuits \
(the diode equation cashed into the I-V curve); module and array arithmetic \
(series/parallel, mismatch, temperature honest notes); the load matching problem \
and MPPT (the power-electronics engines cross-referenced); systems — stand-alone \
(batteries, charge controllers) and grid-tied (the inverter census); and the \
sizing craft worked on a real load.",
           ["The I-V Curve Earned",
            "Module Arithmetic and Mismatch",
            "MPPT and the Matching Engine",
            "Systems Sized Honestly"]),
        ch("wind-energy", "Wind Energy",
           "The wind resource (the power equation with the cube honest note, \
the statistics of wind — Weibull cross-referenced to Statistics); turbine \
aerodynamics (lift-driven blades, the Betz limit earned, the power curve read); \
the electrical census — fixed-speed (induction) and variable-speed (DFIG and \
full-converter) machines cross-referenced; the turbine's control craft (pitch, \
yaw, cut-in to cut-out); and wind farm siting priced.",
           ["The Cube and the Weibull",
            "The Betz Limit Earned",
            "The Electrical Census",
            "Control from Cut-In to Cut-Out"]),
        ch("hydro-bio-and-emerging", "Hydro, Bioenergy and the Emerging Census",
           "Hydropower — the resource arithmetic, small hydro priced (the turbine \
families cross-referenced to Hydraulics), the civil works cross-referenced to \
Water Resources; bioenergy — biomass combustion, biogas digesters, biofuels \
priced by their land honest note; geothermal (the resource and plant census); \
marine (tidal barrage, tidal stream, wave devices priced by maturity); and \
hydrogen and fuel cells named honestly (the storage-and-carrier discussion).",
           ["Small Hydro Priced",
            "Bioenergy and Its Land Note",
            "Geothermal and Marine Census",
            "Hydrogen Named Honestly"]),
        ch("storage-and-grid-integration", "Storage and Grid Integration",
           "Why variability is the honest problem (the duck curve named); \
balancing — reserves, curtailment, forecasting (cross-referenced to Industrial \
Engineering's forecasting); storage census — batteries (their chemistry priced), \
pumped hydro (the round-trip honest note), other routes glanced; grid integration \
— inverters' grid-support craft (Power Electronics cross-referenced), \
microgrids and islanding, the smart-grid honest note; and the power-quality \
consequences priced.",
           ["The Duck Curve Named",
            "The Storage Census Priced",
            "Inverters' Grid-Support Craft",
            "Microgrids and Power Quality"]),
        ch("economics-policy-and-synthesis", "Economics, Policy and the Synthesis",
           "The economics honest note — LCOE earned and compared across the census; \
subsidy and policy mechanisms glanced (the intent, not the politics); \
the environmental accounting (Hydraulics' and Environmental Engineering's \
cross-references); the synthesis map — one page from resource to grid; and the \
doorsteps — Power Systems' stability, the future energy-policy homes, the \
Mechanical branch's turbomachinery.",
           ["LCOE Earned and Compared",
            "Policy Glanced by Intent",
            "The Synthesis: Resource to Grid",
            "The Doorsteps Named"]),
    ],
)
# ======================================================================
# PART 3 — ELECTRONICS & COMMUNICATION (9 books; the backlog's 'Digital
# Electronics' line folds into the CS shelf's digital-logic-design and
# 'Microprocessors & Microcontrollers' into assembly-and-microprocessors;
# 'Electromagnetic Fields and Waves' is ADDED by the GATE syllabus audit —
# the EE S3 + EC S8 register had no home on the ECE list)
# ======================================================================

book(
    "electromagneticFieldsAndWaves", "electromagnetic-fields-and-waves",
    "Electromagnetic Fields and Waves",
    "the twenty-first book of the Engineering shelf (Electronics & Communication branch — ADDED by the 2026-11-16 GATE syllabus audit: the EE Section 3 and EC Section 8 registers had no home on the backlog's ECE list; the QA-creation precedent honoured)",
    "From Coulomb's law to waveguides — the field truth beneath every circuit and wave",
    "First fields course → waveguides, antennas and power-apparatus readiness",
    "The field discipline: the vector-calculus engine (gradient, divergence, curl and \
the integral theorems — cross-referenced to the Mathematics shelf) in the three \
coordinate systems; electrostatics I — Coulomb's law, electric field intensity, \
flux density, Gauss's law and divergence with the charge-distribution census; \
electrostatics II — potential, Poisson and Laplace equations, boundary conditions, \
dielectrics and capacitance of simple configurations; magnetostatics — Biot-Savart, \
Ampere's circuital law and curl, the vector magnetic potential, and Stokes' \
theorem; magnetic circuits and inductance (MMF, reluctance, self and mutual \
inductance of simple configurations — the machinery Circuit Theory and Electrical \
Machines presuppose); time-varying fields — Faraday's law, the Lorentz force, \
displacement current and Maxwell's equations in integral and differential form \
with boundary conditions; the wave solution — plane waves, their propagation \
through media, polarisation, phase and group velocity, reflection and refraction, \
skin depth and the Poynting vector; transmission lines — the equations, \
characteristic impedance, impedance matching and transformation, S-parameters and \
the Smith chart; waveguides (rectangular and circular) and optical fibres; and the \
radiation doorway to Antennas and Wave Propagation. Cross-references every circuit \
and machine book on the shelf and hands off to the ECE family.",
    ("#9333ea", "#581c87"),
    "Electromagnetic Fields and Waves owns the field-and-wave truth for the whole \
shelf (GATE EE S3 'Electromagnetic Fields' + EC S8 'Electromagnetics' — one book, \
both papers). Circuit Theory owns the lumped approximation it explains; Electrical \
Machines and Power Systems consume its magnetic-circuit and field machinery; \
Antennas and Wave Propagation owns the radiation and propagation census; the \
Mathematics shelf owns the pure vector calculus.",
    """- GATE 2026 EE Section 3 'Electromagnetic Fields' + EC Section 8
  'Electromagnetics' (both syllabus PDFs downloaded + extracted this pass):
  Coulomb's Law, Electric Field Intensity, Electric Flux Density, Gauss's Law,
  Divergence; field and potential from point, line, plane and spherical charges;
  dielectric medium; capacitance of simple configurations; Biot-Savart, Ampere,
  Curl, Faraday, Lorentz force; Inductance, Magnetomotive force, Reluctance,
  Magnetic circuits, Self and Mutual inductance; then Maxwell's Equations (both
  forms, boundary conditions, wave equation, Poynting vector); Plane Waves
  (reflection, refraction, polarisation, phase and group velocity, propagation
  through media, skin depth); Transmission Lines (equations, characteristic
  impedance, matching, transformation, S-parameters, Smith chart); waveguides;
  optical fibres — the two registers merge into this one book.
- Hayt & Buck, Engineering Electromagnetics — the chapter arc web-checked this
  pass (Vector Analysis; Coulomb's law and field intensity; Gauss's law and the
  divergence; energy and potential; conductors and dielectrics; capacitance; the
  steady magnetic field; magnetic forces and materials; time-varying fields and
  Maxwell's equations; the transmission-line chapters; the plane-wave chapters;
  waveguides and antennas chapters noted); Sadiku named as the second pole and
  Jordan & Balmain named for waves.""",
    [
        ch("the-vector-engine", "The Vector Engine",
           "The field idea (a value at every point); scalars and vectors with their \
algebra; the three coordinate systems (cartesian, cylindrical, spherical) with \
their transformation honest notes; gradient, divergence and curl — each read \
physically before it is computed; and the line, surface and volume integrals with \
the Stokes and divergence theorems as the book's engine (the Mathematics shelf's \
vector calculus cross-referenced for the pure craft).",
           ["Three Coordinate Systems, Honestly",
            "Gradient, Divergence, Curl — Read Physically",
            "The Integral Theorems as Engine"]),
        ch("electrostatics-i", "Electrostatics I: Coulomb and Gauss",
           "Coulomb's law and electric field intensity; field from the charge census \
(point, line, plane, spherical distributions — each worked); electric flux density \
and Gauss's law with the symmetry craft (which surface to choose and why); \
divergence and the point form of Gauss's law; and the field sketches that keep \
intuition honest.",
           ["The Charge Census Worked",
            "Flux Density and Gauss's Craft",
            "The Point Form of Gauss's Law"]),
        ch("electrostatics-ii", "Electrostatics II: Potential, Capacitance, Dielectrics",
           "Potential and potential difference (the work route); the potential field \
from the charge census; Poisson's and Laplace's equations (with the uniqueness \
honest note and one boundary-value craft); conductor behaviour; the dielectric \
polarisation and boundary conditions at dielectric interfaces; capacitance of the \
simple configurations (parallel plate, coaxial, spherical, the two-wire line); and \
the electrostatic energy stored.",
           ["Potential Earned from Work",
            "Poisson, Laplace and Uniqueness",
            "Dielectrics and Boundary Conditions",
            "Capacitance Census and Energy"]),
        ch("magnetostatics", "Magnetostatics",
           "Biot-Savart's law and the magnetic field census (line, sheet, ring \
currents); Ampere's circuital law with its symmetry craft and curl's point form; \
the vector magnetic potential; the magnetic force on charges and currents (the \
Lorentz engine); magnetic materials at engineering depth (the B-H story, \
permeability); and the boundary conditions on H and B.",
           ["Biot-Savart's Census",
            "Ampere's Craft and Curl",
            "The Lorentz Engine",
            "Materials and Boundary Conditions"]),
        ch("magnetic-circuits-and-inductance", "Magnetic Circuits and Inductance",
           "The magnetic-circuit analogy (MMF, reluctance, flux — its honest limits \
against the true field); series and parallel magnetic circuits worked; the air-gap \
craft; self and mutual inductance of the simple configurations (solenoid, toroid, \
coax, two-wire); the inductance route that Circuit Theory presupposes; and the \
electromagnetic force and torque machinery Electrical Machines consumes \
(cross-referenced).",
           ["MMF, Reluctance and Their Honest Limits",
            "Air-Gap Craft Worked",
            "Inductance of Simple Configurations",
            "The Machinery Machines Presuppose"]),
        ch("maxwells-equations", "Time-Varying Fields and Maxwell's Equations",
           "Faraday's law (the flux rule and the transformer vs motional EMF honest \
split); the displacement current and Ampere's law repaired; Maxwell's four \
equations in integral and differential form, read and interpreted (the field's \
own census); boundary conditions at material interfaces derived; and the \
retarded-potential honest note that closes into radiation.",
           ["Faraday: Transformer versus Motional",
            "Displacement Current Earned",
            "The Four Equations, Read and Interpreted",
            "Boundary Conditions Derived"]),
        ch("plane-waves", "Plane Waves",
           "The wave equation from Maxwell (in lossless and lossy media); the uniform \
plane wave — propagation, wavelength, intrinsic impedance; phase and group \
velocity distinguished honestly; polarisation (linear, circular, elliptical); \
reflection and refraction at normal and oblique incidence with the Brewster and \
critical honest notes; skin depth and the good-conductor craft; and the Poynting \
vector's power bookkeeping.",
           ["The Wave Equation Earned",
            "Phase and Group Velocity, Honestly",
            "Polarisation and Reflection",
            "Skin Depth and the Poynting Vector"]),
        ch("transmission-lines", "Transmission Lines",
           "The distributed-parameter honest note (when the lumped model dies); the \
telegrapher's equations and their phasor solutions; characteristic impedance and \
propagation constant; the lossless and low-loss cases; the finite line — \
reflection, standing waves and VSWR; impedance transformation along the line; \
the Smith chart learned as a first language; impedance matching (single and double \
stub, quarter-wave); and S-parameters introduced for the microwave doorway.",
           ["The Telegrapher's Equations Earned",
            "Reflection and VSWR",
            "The Smith Chart as a First Language",
            "Matching and S-Parameters"]),
        ch("waveguides-and-fibers", "Waveguides and Optical Fibres",
           "Why guide a wave (the radiation-loss honest note); the rectangular \
waveguide — TE and TM modes, cutoff arithmetic, dominant mode, mode field \
patterns; the circular guide glanced; waveguide impedance and the guide's \
dispersion honesty; cavity resonators glanced; and optical fibres — the ray and \
mode views, acceptance angle and numerical aperture, the dispersion census that \
limits bandwidth, and the fibre-link honest arithmetic.",
           ["The Rectangular Guide: TE and TM",
            "Cutoff and the Dominant Mode",
            "Resonators Glanced",
            "Fibres: NA and the Dispersion Census"]),
        ch("the-radiation-doorway", "The Radiation Doorway",
           "Radiation from the elementary dipole (the honest derivation at \
engineering depth) with the near-and-far field census; the antenna as a circuit \
element (its impedance); the radiation resistance idea; the reciprocity note; and \
the doorway itself — Antennas and Wave Propagation owns the antenna census and \
the propagation story (cross-referenced), with the synthesis map of the whole \
field-and-wave discipline drawn on one page.",
           ["The Elementary Dipole, Honestly",
            "Radiation Resistance and Antenna Impedance",
            "The Synthesis Map",
            "The Doorway: the Antenna Census"]),
    ],
)

book(
    "electronicDevicesAndCircuits", "electronic-devices-and-circuits",
    "Electronic Devices and Circuits",
    "the twenty-second book of the Engineering shelf (Electronics & Communication branch)",
    "The semiconductor's devices — bands, junctions, transistors and their first circuits",
    "First devices course → analog-electronics and VLSI readiness",
    "The device discipline: the semiconductor substrate — intrinsic and extrinsic \
materials, energy bands, equilibrium carrier concentration, direct versus indirect \
band-gaps; carrier transport — drift and diffusion currents, mobility and \
resistivity, generation and recombination, the Poisson and continuity equations; \
the PN junction earned (contact potential, depletion region, bias behaviour, the \
diode equation, Zener and breakdown); diode circuits — rectifiers, clipping and \
clamping (the GATE registers' phrasing); the BJT — construction and characteristics \
under biasing with DC analysis; BJT amplifiers — the small-signal models, \
configurations and frequency response (routed to Analog Electronics for the \
systems story); field-effect devices — the JFET, the MOS capacitor, and the MOSFET \
I-V characteristics (the VLSI doorway); optoelectronics — the LED, photodiode and \
solar cell (Renewable Energy cross-referenced); special devices — tunnel, varactor \
and the thyristor family (Power Electronics cross-referenced); and the power-supply \
craft (filtered and regulated) closing the book. Cross-references Electromagnetic \
Fields and Waves (the band-theory physics honestly routed), Analog Electronics, \
VLSI Design, Power Electronics and the future Physics shelf.",
    ("#1d4ed8", "#1e3a8a"),
    "Electronic Devices and Circuits owns the device physics and first circuits. \
Analog Electronics owns the amplifier/op-amp systems story; VLSI Design owns the \
transistor-level digital craft; Power Electronics owns the high-power device \
applications; Renewable Energy owns the solar-cell system story; the band-theory \
physics depth belongs to the future Physics shelf (cross-reference when planned).",
    """- GATE 2026 EC Section 3 'Electronic Devices' (EC_2026_Syllabus.pdf, extracted
  this pass): 'Energy bands in intrinsic and extrinsic semiconductors, equilibrium
  carrier concentration, direct and indirect band-gap semiconductors. Carrier
  Transport: Diffusion current, drift current, mobility and resistivity,
  generation and recombination of carriers, Poisson and continuity equations.
  P-N junction, Zener diode, BJT, MOS capacitor, MOSFET, LED, photo diode and
  solar cell' — the whole section is this book's register (the GATE EE S9 diode
  lines cross-referenced).
- Boylestad & Nashelsky, Electronic Devices and Circuit Theory 11e — the TOC read
  this pass from the open-PDF contents (Semiconductor Diodes; Diode Applications;
  Bipolar Junction Transistors; DC Biasing; Field-Effect Transistors; FET Biasing;
  BJT and FET Amplifiers; the op-amp chapters noted as Analog Electronics's route);
  Millman & Halkias named as the classic pole; Sedha and Salivahanan named as the
  Indian poles.""",
    [
        ch("the-semiconductor-substrate", "The Semiconductor Substrate",
           "The materials census (Ge, Si, GaAs and their honest niches); intrinsic \
semiconductors and thermal generation; the energy-band picture at engineering \
depth (the future Physics shelf's deeper quantum story cross-referenced); doping \
— donors and acceptors, n and p; equilibrium carrier concentration by the mass- \
action law; direct versus indirect band-gap and why LEDs are direct (the \
optoelectronic honest note); and Fermi levels under doping.",
           ["The Materials Census",
            "Doping and Mass Action",
            "Direct versus Indirect: the LED Note",
            "Fermi Levels Under Doping"]),
        ch("carrier-transport", "Carrier Transport",
           "Drift (mobility, resistivity, the temperature honest notes); diffusion \
from the concentration gradient; the total-current equation; generation and \
recombination (the lifetime craft); the continuity equation earned; Poisson's \
equation in the semiconductor; and the two equations that junction theory will \
cash.",
           ["Drift: Mobility and Resistivity",
            "Diffusion and the Total Current",
            "Generation, Recombination, Lifetime",
            "Continuity and Poisson, Earned"]),
        ch("the-pn-junction", "The PN Junction",
           "The junction built — the depletion region, contact potential and the \
energy-band diagram; the diode equation earned from the minority-carrier craft; \
the forward and reverse honest notes; breakdown — Zener and avalanche \
distinguished; junction capacitance and its varactor use; the diode's switching \
and storage honest note; and the small-signal model priced.",
           ["The Depletion Region Earned",
            "The Diode Equation from Carriers",
            "Zener versus Avalanche",
            "Capacitance and the Storage Note"]),
        ch("diode-circuits", "Diode Circuits",
           "The diode's circuit models (the piecewise-linear craft); half and full- \
wave rectifiers with filters, ripple and PIV arithmetic; bridge rectifiers; \
clipping and clamping circuits (the GATE phrasing learned); the Zener regulator \
priced; and the small-signal diode applications glanced.",
           ["Rectifiers with Ripple and PIV",
            "Clipping and Clamping",
            "The Zener Regulator Priced"]),
        ch("the-bjt", "The Bipolar Junction Transistor",
           "The BJT's construction and operating regions (the four honest notes); \
characteristics in CE, CB and CC; DC biasing — the fixed, self and voltage-divider \
circuits with the stability craft; the load line and Q-point located; and the \
bias-stability arithmetic examiners price.",
           ["The Four Regions, Honestly",
            "Characteristics and Configurations",
            "Biasing and the Q-Point",
            "The Stability Craft"]),
        ch("bjt-amplifiers", "BJT Amplifiers",
           "The small-signal models (re and hybrid-pi); the three configurations \
analysed (CE, CB, CC with their gains and impedances priced); the multistage \
glance routed to Analog Electronics; the frequency response (the coupling and \
bypass capacitor honest notes, Miller's effect priced); and the Bode honest note \
cross-referenced to Circuit Theory.",
           ["Small-Signal Models Earned",
            "The Three Configurations Priced",
            "Frequency Response and Miller"]),
        ch("fets-and-mosfets", "Field-Effect Devices: JFET and MOSFET",
           "The JFET's construction and pinch-off craft; its biasing and small-signal \
model glanced; the MOS capacitor (accumulation, depletion, inversion — the GATE \
line earned); the MOSFET I-V characteristics (enhancement and depletion; the \
threshold, linear and saturation regions); the CMOS pair named as the doorway to \
VLSI Design; and the FET-versus-BJT census priced.",
           ["The JFET's Pinch-Off Craft",
            "The MOS Capacitor Earned",
            "MOSFET I-V: Three Regions",
            "The CMOS Doorway Named"]),
        ch("optoelectronic-and-special-devices", "Optoelectronic and Special Devices",
           "The LED (its direct-bandgap physics cashed); the photodiode and \
phototransistor; the solar cell — its I-V curve and fill factor (Renewable \
Energy's system story cross-referenced); the tunnel diode's negative-resistance \
honest note; the varactor; the thyristor family named (Power Electronics owns \
their power story); and the display and laser device census glanced.",
           ["LEDs: the Direct Bandgap Cashed",
            "Photodiodes and Solar Cells",
            "Tunnel and Varactor Notes",
            "The Thyristar Family Named"]),
        ch("power-supplies-and-doorstep", "Power Supplies and the Doorstep",
           "The regulated supply built honestly — rectification (cross-referenced), \
filtering, the linear regulator craft (the dissipation honest note, routing the \
switched story to Power Electronics's SMPS chapter); the regulated supply's \
figures of merit; the book's synthesis map; and the doorsteps — Analog Electronics \
(op-amp systems), VLSI Design (the transistor as a switch), Power Electronics \
(the device at high power).",
           ["The Linear Regulator Craft",
            "Figures of Merit Priced",
            "The Synthesis Map",
            "The Doorsteps Named"]),
    ],
)

book(
    "analogElectronics", "analog-electronics", "Analog Electronics",
    "the twenty-third book of the Engineering shelf (Electronics & Communication branch)",
    "Amplifiers, op-amps, filters and oscillators — the analog signal chain engineered",
    "First analog-circuits course → mixed-signal and instrumentation readiness",
    "The analog signal chain: the chain's worldview (amplification, the decibel \
family, the distortion honest note); differential and multistage amplifiers with \
current mirrors; feedback amplifier theory — the four topologies with their \
benefits and the stability honest note; the operational amplifier — \
characteristics, the ideal model, and the circuit census (inverting, \
non-inverting, summers, integrators, differentiators, instrumentation); active \
filters — Sallen-Key and the Butterworth craft; comparators and Schmitt triggers; \
oscillators — the RC family (Wien-bridge, phase-shift) and the LC family \
(Colpitts, Hartley) with crystal oscillators; timers and function circuits — the \
555 census, voltage-controlled oscillators and the PLL; sample-and-hold and the \
analog-to-digital doorway (converter architectures priced at system level); \
and the analog synthesis with the mixed-signal doorstep. Cross-references \
Electronic Devices and Circuits (the devices), Circuit Theory (the frequency \
craft), Signals and Systems (the transform view), Digital Logic Design (the \
digital side) and hands off to Digital Signal Processing.",
    ("#be185d", "#831843"),
    "Analog Electronics owns the analog signal chain. Electronic Devices and \
Circuits owns the device physics and single-stage fundamentals; Digital Signal \
Processing owns the sampled-domain filtering; Digital Logic Design owns the \
combinational/sequential census; the GATE EE S9 'Analog and Digital Electronics' \
and EC S4 'Analog Circuits' registers route here for the analog lines.",
    """- GATE 2026 EE Section 9 (analog half) + EC Section 4 'Analog Circuits'
  (both syllabus PDFs downloaded + extracted this pass): 'Simple diode circuits:
  clipping, clamping, rectifiers; Amplifiers: biasing, equivalent circuit and
  frequency response; oscillators and feedback amplifiers; operational amplifiers:
  characteristics and applications; single stage active filters, Active Filters:
  Sallen Key, Butterworth, VCOs and timers, combinatorial and sequential logic
  circuits, multiplexers, demultiplexers, Schmitt triggers, sample and hold
  circuits, A/D and D/A converters' + 'Diode Circuits; BJT and MOSFET Amplifiers:
  biasing, AC coupling, small signal analysis, frequency response. Current mirrors
  and differential amplifiers. Op-amp Circuits: amplifiers, summers,
  differentiators, integrators, active filters, Schmitt triggers and oscillators'
  — the analog halves are this book's register (the digital lines route to
  digital-logic-design).
- Millman & Halkias, Integrated Electronics; Sedha's Analog electronics arc
  web-checked as the Indian poles; Boylestad's op-amp chapters noted (read in the
  open TOC this pass); Razavi's Design of Analog CMOS named as the depth pole.""",
    [
        ch("the-analog-chain", "The Analog Signal Chain",
           "What 'analog' honestly means (the continuous honest note, noise's \
vote); the chain drawn on one page — sensor, amplification, filtering, conversion; \
the decibel family and the dBm census; distortion and noise priced as the \
chain's honest taxes; and the instrumentation story that motivates the whole \
book.",
           ["The Chain Drawn on One Page",
            "The Decibel Family",
            "Distortion and Noise Priced"]),
        ch("differential-and-multistage", "Differential and Multistage Amplifiers",
           "The differential amplifier earned (the long-tailed pair, its CMRR \
engine); current mirrors as the bias craft; the active-load honest note; cascade \
and cascode multistage configurations with their gain bookkeeping; the \
level-shifting craft; and the differential pair as the op-amp's input stage named.",
           ["The Long-Tailed Pair Earned",
            "Current Mirrors as Bias",
            "Cascade, Cascode, Bookkeeping",
            "The Op-Amp's Input Stage Named"]),
        ch("feedback-amplifiers", "Feedback Amplifiers",
           "Feedback's four topologies mapped to the circuits they serve; the gain \
sensitivity, bandwidth and distortion honest notes priced; the loop-gain craft; \
stability — the phase-margin honest note (Control Systems cross-referenced for \
the criterion depth); and the positive-feedback honest edge that oscillators \
live on.",
           ["The Four Topologies Mapped",
            "The Honest Notes Priced",
            "Stability and the Phase Margin",
            "The Edge Oscillators Live On"]),
        ch("the-operational-amplifier", "The Operational Amplifier",
           "The op-amp's real characteristics (offset, bias currents, CMRR, slew \
rate, GBP) and the ideal model's honest limits; the linear circuit census — \
inverting, non-inverting, the follower, summers, difference amplifiers, \
integrators and differentiators (each with its saturation honest note); the \
instrumentation amplifier earned; and the comparator introduced (its \
positive-feedback Schmitt craft in the next chapter).",
           ["Real Characteristics, Ideal Model",
            "The Linear Census Worked",
            "The Instrumentation Amplifier",
            "The Comparator Introduced"]),
        ch("active-filters", "Active Filters",
           "Filter vocabulary (pass, band, the dB honest note); the first-order \
stages; Sallen-Key topology worked; the Butterworth approximation with its table \
craft; the higher-order honest note; notch and band-pass configurations; and the \
filter-design craft cross-referenced to Digital Signal Processing's sampled \
sibling.",
           ["Sallen-Key Worked",
            "The Butterworth Craft",
            "Notches and Band-Pass",
            "The Sampled Sibling Named"]),
        ch("comparators-and-schmitt", "Comparators and Schmitt Triggers",
           "The open-loop comparator and its speed honest note; the Schmitt trigger \
earned (the hysteresis craft with its threshold arithmetic); the inverting and \
non-inverting forms; the regenerative honest note; and the applications census \
(zero crossing, squaring, the ADC's doorstep).",
           ["The Comparator's Speed Note",
            "Hysteresis Earned",
            "The Threshold Arithmetic",
            "The ADC Doorstep"]),
        ch("oscillators", "Oscillators",
           "The Barkhausen criterion earned (the loop-gain honest note); the RC \
family — Wien-bridge analysed, phase-shift priced; the LC family — Colpitts and \
Hartley by the same engine; frequency stability priced and the crystal \
oscillator's piezo honest note; the relaxation honest note; and the oscillator \
census table read.",
           ["Barkhausen Earned",
            "The RC Family",
            "The LC Family",
            "Crystals and Stability"]),
        ch("timers-and-function-circuits", "Timers and Function Circuits",
           "The 555 census — monostable, astable and bistable crafts with its duty \
arithmetic; voltage-controlled oscillators; the phase-locked loop — its lock and \
capture craft priced at system level; function generators glanced; and the \
sample-and-hold circuit earned (its aperture honest note) as the converter's \
front door.",
           ["The 555 Census",
            "VCOs and the PLL",
            "Sample-and-Hold Earned"]),
        ch("converters-and-doorstep", "Data Conversion and the Doorstep",
           "Why conversion is the mixed-signal hinge; the DAC architectures priced \
(R-2R, weighted) with their resolution honest notes; the ADC census — flash, \
successive-approximation, integrating and sigma-delta with their \
speed-versus-resolution honest map; the sampling and quantisation notes \
(Signals and Systems cross-referenced); and the analog synthesis map with the \
doorsteps — Digital Signal Processing, Digital Logic Design, the instrumentation \
story of Electrical Measurements.",
           ["The DAC Architectures Priced",
            "The ADC Census Mapped",
            "Sampling Notes Cross-Referenced",
            "The Doorsteps Named"]),
    ],
)

book(
    "signalsAndSystems", "signals-and-systems", "Signals and Systems",
    "the twenty-fourth book of the Engineering shelf (Electronics & Communication branch)",
    "Continuous and discrete signals through LTI machinery — Fourier, Laplace, z and sampling",
    "First signals course → communication, control and DSP readiness",
    "The transform discipline: the signal idea — continuous and discrete time, \
energy and power signals, the transformation census (shifting, scaling, \
reversal); system properties — linearity, time-invariance, causality, stability \
and memory, honestly classified; the LTI core — the impulse response and \
convolution (continuous and discrete) with its graphical craft; the Fourier \
series for periodic signals (continuous and discrete) earned; the Fourier \
transform (continuous and discrete-time DTFT) with properties and the frequency \
response; the Laplace transform with its ROC and the system function's poles and \
zeros; the z-transform with its ROC and the discrete system function; sampling \
and reconstruction — the sampling theorem earned, aliasing priced honestly, the \
discrete-time processing of continuous-time signals; and the closing census — \
RMS and average values for general periodic waveforms (the GATE EE line) and the \
doorsteps to every consumer book. Cross-references Circuit Theory (transients \
and network functions), Control Systems, Analog and Digital Communication, \
Digital Signal Processing and the Mathematics shelf's transform chapters.",
    ("#0891b2", "#155e75"),
    "Signals and Systems owns the signal-and-LTI discipline for the shelf (GATE EE \
S4 + EC S2's signal half — one book, both papers). Circuit Theory owns their \
circuit applications; Control Systems owns the design craft they feed; Analog and \
Digital Communication owns the modulation story; Digital Signal Processing owns \
the discrete filtering craft; the Mathematics shelf's real/complex analysis books \
own the pure convergence depth.",
    """- GATE 2026 EE Section 4 'Signals and Systems' + EC Section 2's signal half
  (both syllabus PDFs downloaded + extracted this pass): 'Representation of
  continuous and discrete time signals, shifting and scaling properties, linear
  time invariant and causal systems, Fourier series representation of continuous
  and discrete time periodic signals, sampling theorem, Applications of Fourier
  Transform for continuous and discrete time signals, Laplace Transform and Z
  transform. R.M.S. value, average value calculation for any general periodic
  waveform' + 'Continuous-time Signals: Fourier series and Fourier transform,
  sampling theorem and applications. Discrete-time Signals: DTFT, DFT, z-transform,
  discrete-time processing of continuous-time signals. LTI systems: definition and
  properties, causality, stability, impulse response, convolution, poles and
  zeroes, frequency response, group delay, phase delay' — the two registers merge
  into this book (the DFT's algorithmic depth routes to DSP).
- Oppenheim, Willsky & Nawab, Signals and Systems 2e — the TOC read this pass
  from the Pearson page (Signals and Systems; LTI Systems; Fourier Series; the
  CT and DT Fourier transforms; Sampling; the Laplace and z transforms;
  communication and control applications chapters noted); Haykin's Signals and
  Systems named as the second pole; Lathi named.""",
    [
        ch("the-signal-idea", "The Signal Idea",
           "What a signal is (the function-as-carrier honest note); continuous \
versus discrete time and amplitude (the four-way census); the signal census — \
exponentials, sinusoids, impulses and steps (each defined honestly in both \
domains); energy and power signals; and the transformation census — shifting, \
scaling and reversal with the order-of-operations honest note examiners price.",
           ["The Four-Way Census",
            "Impulses and Steps, Honestly",
            "Energy versus Power",
            "Shift, Scale, Reverse — Order Matters"]),
        ch("system-properties", "System Properties",
           "The property census — linearity, time-invariance, memory, causality, \
stability (BIBO stated and priced) — each tested on worked examples with the \
verdicts argued honestly; LTI as the tractable intersection; and the property \
arithmetic (the stability-of-cascade honest notes) that the rest of the book \
assumes.",
           ["The Census Tested Honestly",
            "BIBO Stated and Priced",
            "LTI as the Tractable Intersection"]),
        ch("convolution", "The LTI Core: Convolution",
           "The impulse response as the system's complete signature; convolution \
earned in continuous time (the graphical craft practised until fluent) and \
discrete time; the convolution properties (commutative, associative, the \
distributive honest note); the step response from the impulse response; and \
causality and stability read from h.",
           ["The Impulse Response as Signature",
            "The Graphical Craft Practised",
            "Properties of the Convolution",
            "Causality and Stability Read"]),
        ch("fourier-series", "The Fourier Series",
           "The idea (periodic signals as harmonic sums) earned from the \
orthogonality craft; coefficients computed for the standard census (square, \
triangle, rectified sinusoids); the symmetry honest notes that halve work; \
Parseval priced; the Gibbs honest note named; and the discrete-time Fourier \
series learned in parallel.",
           ["Orthogonality Earned",
            "The Standard Census Computed",
            "Parseval and the Gibbs Note",
            "The Discrete Sibling Learned"]),
        ch("the-fourier-transform", "The Fourier Transform",
           "The transform earned as the aperiodic limit; the transform census \
computed (the pair table built honestly); the properties as working engines \
(time/frequency duality, convolution-as-multiplication priced); the frequency \
response from the transform; the DTFT for discrete signals; and the DFT named \
as the computable census (its algorithmic story routed to DSP).",
           ["The Aperiodic Limit Earned",
            "The Pair Table Built",
            "Convolution-as-Multiplication Priced",
            "DTFT and the DFT Named"]),
        ch("the-laplace-transform", "The Laplace Transform",
           "The transform with its region of convergence (why the ROC matters, \
honestly); the pair census with ROCs; the properties as engines; poles and zeros \
of the system function read for character; stability and causality from the ROC; \
the unilateral honest note for circuits with initial conditions (Circuit Theory \
cross-referenced); and inversion by partial fractions practised.",
           ["The ROC, Honestly",
            "Poles and Zeros as Character",
            "Stability from the ROC",
            "Inversion Practised"]),
        ch("the-z-transform", "The z-Transform",
           "The discrete sibling with its ROC craft; the pair census and \
properties; the discrete system function H(z) — poles, zeros, stability (the \
unit-circle criterion earned); inversion by partial fractions and long division; \
the bilateral honest note; and the s-to-z mappings glanced (the design story \
lives in DSP).",
           ["The Discrete Sibling's ROC",
            "The Unit-Circle Criterion Earned",
            "Inversion by Two Routes",
            "The s-to-z Glance"]),
        ch("sampling-and-reconstruction", "Sampling and Reconstruction",
           "The sampling theorem earned (not recited) — from the spectrum's \
periodic honest note; aliasing priced with the fold honest note; reconstruction \
by the ideal filter and its real honest limits; the discrete-time processing of \
continuous-time signals as the standard chain; decimation and interpolation \
named (DSP owns the multirate craft); and the practical sampling census \
(sample-and-hold cross-referenced to Analog Electronics).",
           ["The Theorem Earned",
            "Aliasing and the Fold",
            "The Standard Chain Drawn",
            "The Practical Census"]),
        ch("waveform-census-and-doorstep", "The Waveform Census and the Doorstep",
           "The RMS and average value computed for the general periodic waveform \
(the GATE EE line, worked on the odd and composite census); the waveform \
census table; the book's synthesis map — one page from signals to the transform \
families; and the doorsteps — Analog and Digital Communication (the modulation \
story), Control Systems (the design craft), Digital Signal Processing (the \
filtering craft), Circuit Theory's network functions.",
           ["RMS for the General Waveform",
            "The Census Table",
            "The Synthesis Map",
            "The Doorsteps Named"]),
    ],
)

book(
    "analogAndDigitalCommunication", "analog-and-digital-communication",
    "Analog and Digital Communication",
    "the twenty-fifth book of the Engineering shelf (Electronics & Communication branch)",
    "Modulation, noise and information — how signals carry messages honestly",
    "First communication course → modern digital-links readiness",
    "The communication discipline: the worldview (the channel's honest taxes — \
noise, bandwidth, power; analog versus digital priced); the random-process \
engine — autocorrelation, power spectral density, white noise and filtering of \
random signals through LTI systems (the Mathematics shelf's probability \
cross-referenced); amplitude modulation and demodulation (DSB-SC, SSB, VSB with \
their spectra and detectors); angle modulation (FM and PM, spectra and \
bandwidth, the demodulation craft); the superheterodyne receiver; information \
theory — entropy, mutual information and the channel capacity theorem earned \
honestly; source and pulse coding — sampling (Signals and Systems \
cross-referenced), PCM and DPCM with quantisation noise; digital modulation — \
ASK, PSK, FSK and QAM with constellations, bandwidth and inter-symbol \
interference; detection — the matched filter, MAP and ML detection, SNR and BER \
arithmetic; error control — Hamming codes and CRC; and the synthesis with the \
modern links doorstep (the CS shelf's network stack cross-referenced). \
Cross-references Signals and Systems, Electromagnetic Fields and Waves (the \
channel physics), the Mathematics shelf's probability and information arcs.",
    ("#0369a1", "#0c4a6e"),
    "Analog and Digital Communication owns the physical-layer story (GATE EC S7). \
Signals and Systems owns the transform machinery; Antennas and Wave Propagation \
owns the radiated channel; the CS shelf's Computer Networks owns the higher \
layers; the Mathematics shelf's Probability Theory owns the random-variable \
foundations; Cryptography owns the security layer (a different problem, \
honestly noted).",
    """- GATE 2026 EC Section 7 'Communications' (EC_2026_Syllabus.pdf, extracted
  this pass): 'Random Processes: Auto correlation and power spectral density,
  properties of white noise, filtering of random signals through LTI systems.
  Analog Communications: Amplitude modulation and demodulation, angle modulation
  and demodulation, spectra of AM and FM, super heterodyne receivers. Information
  Theory: Entropy, mutual information and channel capacity theorem. Digital
  Communications: PCM, DPCM, digital modulation schemes (ASK, PSK, FSK, QAM),
  bandwidth, inter-symbol interference, MAP, ML detection, matched filter
  receiver, SNR and BER. Fundamentals of error correction, Hamming codes, CRC' —
  the entire section is this book's register.
- Haykin & Moher, Communication Systems 5e — the TOC read this pass from the
  Wiley page and the open Indian-adaptation contents (Introduction; Representation
  of Signals and Systems; Amplitude Modulation; Angle Modulation; Sampling and
  Pulse Modulation; Baseband Pulse Transmission; Digital Band-Pass Modulation;
  Spread-Spectrum; Fundamental Limits; Error-Control Coding); Proakis & Salehi
  named as the second pole; Lathi's Modern Digital named; Taub & Schilling named
  as the classic pole.""",
    [
        ch("the-communication-worldview", "The Communication Worldview",
           "The communication chain drawn end-to-end (source, coder, modulator, \
channel, the honest taxes priced — noise, bandwidth, power); the analog-versus- \
digital census priced honestly; the frequency-domain view as the book's native \
language (Signals and Systems cross-referenced); and the layered honest note \
(the CS shelf's network stack owns the layers above this book).",
           ["The Chain and Its Taxes",
            "Analog versus Digital, Priced",
            "The Frequency Domain as Language"]),
        ch("random-processes", "Random Processes for Communication",
           "The random process as the honest model of noise (the Mathematics \
shelf's probability cross-referenced); ensemble statistics and stationarity; \
autocorrelation and its properties; the power spectral density earned (the \
Wiener-Khinchin craft); white noise and its bandwidth honest note; filtering of \
random signals through LTI systems — the PSD transformation; and the Gaussian \
channel model stated honestly.",
           ["The Process as Honest Noise",
            "The PSD Earned",
            "White Noise and Its Note",
            "Filtering Random Signals"]),
        ch("amplitude-modulation", "Amplitude Modulation",
           "Why modulate (the antenna and sharing honest notes); AM DSB-FC with \
its spectrum and power census; DSB-SC and its coherent detection (the Costas \
loop named); SSB and VSB with their honest trades; modulators and demodulators \
priced (the switching and envelope crafts); and the AM applications census.",
           ["Why Modulate",
            "The DSB Family Priced",
            "SSB and VSB's Honest Trades",
            "Detection Crafts"]),
        ch("angle-modulation", "Angle Modulation",
           "FM and PM defined (the instantaneous-frequency craft); the narrowband \
honest note; the spectrum of FM (the Bessel honest note) and the bandwidth rule \
(Carson); direct and indirect generation (Armstrong named); demodulation — the \
discriminators and the PLL (Analog Electronics cross-referenced); the \
noise-immunity honest note priced; and the pre/de-emphasis craft.",
           ["The Instantaneous-Frequency Craft",
            "Bessel and Carson Priced",
            "Generation and Detection",
            "The Noise-Immunity Note"]),
        ch("receivers", "Receivers",
           "The receiver census from TRF to the superheterodyne (earned as the \
frequency-conversion craft — the image-frequency honest note and its tracking \
fix); IF selection; sensitivity and selectivity defined and priced; AM and FM \
receiver blocks drawn; and the SDR honest note (the modern doorway named).",
           ["Superheterodyne Earned",
            "The Image Note and Its Fix",
            "Sensitivity and Selectivity",
            "The SDR Doorway"]),
        ch("information-theory", "Information Theory",
           "Information measured honestly (the surprise craft — the logarithm \
earned); entropy computed for the source census; the source-coding theorem stated \
honestly with prefix codes (Huffman named); mutual information and the channel \
capacity theorem earned (the Gaussian channel's Shannon formula priced on real \
bandwidths and SNRs); and the theory's honest use as the engineer's compass.",
           ["Entropy Earned from Surprise",
            "Prefix Codes and Huffman",
            "The Capacity Theorem Earned",
            "Shannon as Compass"]),
        ch("pulse-and-source-coding", "Pulse and Source Coding",
           "Sampling for transmission (the theorem cross-referenced and its \
taxes priced); quantisation — uniform and non-uniform (the companding craft); \
PCM with its bandwidth and SNR arithmetic; DPCM and DM with their honest \
trades; and the source-coding census that pairs with the theory chapter.",
           ["Quantisation and Companding",
            "PCM's Arithmetic Priced",
            "DPCM and DM's Honest Trades"]),
        ch("digital-modulation", "Digital Modulation",
           "The constellation idea (the signal-space craft stated); ASK, PSK \
(BPSK, QPSK) and FSK with their spectra and bandwidth; QAM earned as the \
bandwidth-efficient compromise; inter-symbol interference and the pulse-shaping \
craft (the raised-cosine honest note); the coherent-detection census; and the \
BER arithmetic worked for the standard schemes.",
           ["Constellations Earned",
            "The Scheme Census",
            "ISI and Raised-Cosine",
            "BER Arithmetic Worked"]),
        ch("detection-and-error-control", "Detection, Noise and Error Control",
           "The detection problem stated honestly (the a-posteriori craft); \
MAP and ML detection earned; the matched filter earned (the SNR-maximising \
craft); the correlator as its twin; SNR and BER for the Gaussian channel priced \
end-to-end; error control — parity and the Hamming code worked (its syndrome \
craft); CRC priced at the register level; and the modern coding doorstep named \
(convolutional and turbo codes glanced honestly).",
           ["MAP and ML Earned",
            "The Matched Filter Earned",
            "Hamming's Syndrome Craft",
            "CRC and the Modern Doorstep"]),
        ch("synthesis-and-doorstep", "The Synthesis and the Doorstep",
           "The link-budget craft worked on a real link (the chain's every honest \
tax summed); the analog and digital stories synthesised on one page; the channel \
physics routed to Antennas and Wave Propagation and Electromagnetic Fields and \
Waves; the higher layers routed to the CS shelf's Computer Networks; and the \
modern doorstep — the wireless and satellite censuses named for future books.",
           ["A Link Budget Worked",
            "The Synthesis Page",
            "The Doorsteps: Physics, Layers, Wireless"]),
    ],
)
book(
    "vlsiDesign", "vlsi-design", "VLSI Design",
    "the twenty-sixth book of the Engineering shelf (Electronics & Communication branch)",
    "CMOS at scale — transistors, wires, circuits and the design methodology of silicon",
    "First VLSI course → digital-IC design readiness",
    "Silicon at scale: the VLSI worldview (design abstraction, Moore's law honestly \
priced, why CMOS); MOS transistor theory at design depth — the long-channel I-V, \
C-V nonidealities, the velocity-saturation and short-channel honest notes \
(Electronic Devices and Circuits cross-referenced); CMOS processing technology — \
the fabrication flow (wafer, oxidation, diffusion/implantation, deposition, \
lithography, metallisation) with layout design rules learned as the foundry's \
grammar; the performance core — delay (the RC Elmore craft), power (dynamic, \
short-circuit, leakage — the clock-tree honesty), interconnect (wire models, the \
repeater craft) and robustness (noise margins, variability and the \
design-corner census); combinational circuit design — static CMOS gates, \
alternative logic families priced, dynamic logic with its honest risks; \
sequential design — latches and flip-flops at transistor level with the \
clocking-discipline census (metastability and synchronisers priced); \
datapath and array subsystems — adders, multipliers, shifters and the memory \
arrays (SRAM, DRAM, ROM); and design methodology, testing and verification \
(DFT and the ATPG glance) closing to the specialisation doorstep. Cross-references \
Digital Logic Design (the gate-level abstraction below), Electronic Devices and \
Circuits, Heat Transfer (the thermal wall) and hands off to the CS shelf.",
    ("#475569", "#1e293b"),
    "VLSI Design owns transistor-level digital IC design. Digital Logic Design \
(CS shelf) owns the gate-level and HDL abstraction below; Electronic Devices and \
Circuits owns the device physics; the CS shelf's Computer Organization owns the \
architecture above; Heat Transfer owns the thermal-removal physics; the GATE EC S5 \
digital-circuits lines route to Digital Logic Design with this book growing the \
silicon depth.",
    """- Weste & Harris, CMOS VLSI Design: A Circuits and Systems Perspective 4e —
  the chapter arc web-checked this pass from the publisher page and the open
  front-matter PDF (Introduction; MOS Transistor Theory; CMOS Processing
  Technology; the four NEW chapters Delay, Power, Interconnect, Robustness
  confirmed as chapters 4-7; then the combinational/sequential design chapters,
  Datapath Subsystems, Array Subsystems, Design Methodology and Tools confirmed).
- Kang & Leblebici named as the Indian-course pole; Rabaey's Digital Integrated
  Circuits named as the second pole.
- GATE EC Section 5's 'logic gates and their static CMOS implementations' line
  noted — the static-CMOS chapter serves it at silicon depth (Digital Logic
  Design serves the abstraction).""",
    [
        ch("the-vlsi-worldview", "The VLSI Worldview",
           "Design abstraction as the discipline's survival craft (the levels named \
and priced); Moore's law stated with its honest economics and its end honestly \
noted; why CMOS won (the static-power honest note and the leakage's revenge); \
the design-flow census (specification to tapeout); and the foundry-fabless \
industry map.",
           ["Abstraction as Survival",
            "Moore's Law, Priced and Ended Honestly",
            "The Design-Flow Census",
            "The Industry Map"]),
        ch("mos-transistor-theory", "MOS Transistor Theory at Design Depth",
           "The long-channel I-V earned as the design equation; the C-V \
characteristics and the MOS capacitances priced; threshold and body effect; the \
velocity-saturation and short-channel honest notes; leakage mechanisms named \
(subthreshold, gate); the SPICE-model census glanced; and the design-tool \
relationship stated honestly.",
           ["The Long-Channel Design Equation",
            "Capacitances and Body Effect",
            "Short-Channel Honesty",
            "Leakage Named and Priced"]),
        ch("cmos-processing", "CMOS Processing Technology",
           "The fabrication flow learned step by step (wafer, oxidation, \
implantation and diffusion, deposition, the photolithography engine, etching, \
metallisation — the twin-tub CMOS story); the layout design rules as the \
foundry's grammar (lambda-based); sticks and standard cells; fabrication yield \
priced honestly; and the process-variation doorstep that the robustness chapter \
answers.",
           ["The Fabrication Flow, Step by Step",
            "Layout Rules as Grammar",
            "Yield Priced Honestly",
            "The Variation Doorstep"]),
        ch("delay", "Delay",
           "The RC delay model earned (the linear-delay craft and Elmore's \
method); the logical-effort theory priced as the designer's compass (the path \
optimisation arithmetic worked); transient-energy and the step-response census; \
gate sizing practised until fluent; and the delay-wire honest note that routes \
into the interconnect chapter.",
           ["Elmore's Method Earned",
            "Logical Effort as Compass",
            "Gate Sizing Practised",
            "The Wire Honest Note"]),
        ch("power", "Power",
           "The power census — dynamic (the activity-factor arithmetic), \
short-circuit and leakage (the mechanism prices summed); the clock as the \
biggest consumer (its tree and gating craft); voltage scaling and the \
energy-versus-delay trade priced; the dark-silicon honest note; and the \
low-power design census (DVFS, power gating, multi-Vt).",
           ["The Three Powers Priced",
            "The Clock Tree and Gating",
            "Voltage Scaling's Trade",
            "The Low-Power Census"]),
        ch("interconnect-and-robustness", "Interconnect and Robustness",
           "Wire models (the resistance-and-capacitance craft, the inductance \
honest note); the repeater craft for long wires; crosstalk and the noise \
bookkeeping; then robustness — noise margins read from the transfer curve, \
supply and temperature variation, the design-corner census, variability and \
matching, and the reliability census (electromigration, NBTI named).",
           ["Wire Models and Repeaters",
            "Crosstalk Bookkept",
            "Design Corners and Matching",
            "The Reliability Census"]),
        ch("combinational-design", "Combinational Circuit Design",
           "Static CMOS gates sized and priced; the skewing craft; alternative \
logic families priced honestly (pseudo-NMOS, DCVS, pass-transistor) against \
static CMOS; dynamic logic with its charge-sharing and precharge-evaluate \
honest risks; domino logic; and the circuit-family census table read.",
           ["Static CMOS Sized and Priced",
            "Alternatives Priced Honestly",
            "Dynamic Logic's Honest Risks",
            "The Family Census Table"]),
        ch("sequential-design", "Sequential Circuit Design",
           "Latches and flip-flops at transistor level (the transmission-gate \
and sense-amplifier forms); the clocking-discipline census (two-phase, the \
no-race honest rules); metastability earned (the MTBF arithmetic) and the \
synchroniser craft; clock skew priced; and the sequencing-element census \
table (Digital Logic Design's flip-flop abstraction cross-referenced below).",
           ["Latches and Flip-Flops in Silicon",
            "The Clocking Discipline",
            "Metastability and MTBF",
            "Skew Priced"]),
        ch("datapath-and-arrays", "Datapath and Array Subsystems",
           "The datapath census — adders (ripple through carry-lookahead and \
the prefix families, each priced), multipliers (array and Booth glanced), \
shifters; the array subsystems — SRAM cells and sense amplifiers, DRAM's \
one-transistor honesty, ROM and PLA; the memory-periphery census (decoders, \
the bitline honest note); and the datapath floorplanning craft.",
           ["The Adder Census Priced",
            "Multipliers and Shifters",
            "SRAM, DRAM, ROM Earned",
            "The Periphery Census"]),
        ch("methodology-testing-and-doorstep", "Design Methodology, Testing and the Doorstep",
           "The methodology census — design flows, synthesis, place-and-route, \
standard-cell and full-custom crafts priced; verification's honest claim (the \
levels of the craft); design for testability (scan chains, the ATPG glance, \
BIST named); the IP and reuse census; and the doorsteps — the CS shelf's \
Computer Organization (the architecture above), the silicon specialisations \
(analog/mixed-signal, RF — the future's door), Heat Transfer's thermal wall.",
           ["Flows and Crafts Priced",
            "Verification's Honest Claim",
            "Scan, ATPG, BIST",
            "The Doorsteps: Architecture, Mixed-Signal, Heat"]),
    ],
)

book(
    "embeddedSystems", "embedded-systems", "Embedded Systems",
    "the twenty-seventh book of the Engineering shelf (Electronics & Communication branch)",
    "Compute inside the product — real-time systems, drivers and design methodology",
    "First embedded course → IIoT and product-engineering readiness",
    "Compute when the product is the computer: the embedded idea (characteristics, \
categories and the honest constraints — cost, power, timing); embedded hardware \
design (processor selection — MCU, MPU, DSP; the memory map; peripheral sets and \
their configuration; the CS shelf's Assembly and Microprocessors owns the 8051/8085 \
and bare-metal foundations, cross-referenced); real-time systems — hard versus \
soft deadlines, the schedulability craft (RMS and EDF priced) and the CS shelf's \
Operating Systems owns the general scheduling theory (cross-referenced); the RTOS — \
tasks, semaphores, mutexes and priority inversion priced honestly, queues and \
inter-task communication, ISR discipline; device drivers and I/O — interrupt \
handling, timers, the serial-bus census (UART, SPI, I2C); embedded networking \
(CAN and the field-bus census, wireless glanced — the IIoT doorstep); \
low-power and reliability design (sleep states, watchdogs, brown-out); the \
design methodology — hardware/software co-design, simulation, debugging and \
emulation; and case studies priced honestly. Cross-references Assembly and \
Microprocessors, Operating Systems, Internet of Things and hands off to \
Robotics and Automation.",
    ("#065f46", "#022c22"),
    "Embedded Systems owns the systems view of compute-in-product. Assembly and \
Microprocessors (CS shelf) owns the machine-level and microcontroller-fundamental \
arc (the no-duplication contract stated in both headers); Operating Systems owns \
the general scheduling and IPC theory; Internet of Things owns the network-of \
things story; Robotics and Automation owns the robot cell; Control Systems owns \
the plant-side theory.",
    """- Raj Kamal, Embedded Systems: Architecture, Programming and Design — the arc
  web-checked this pass (the 8051 and processor chapters; the RTOS chapters 8-12
  confirmed via the open-PDF contents and Google Books; the design chapters 6/13/14
  confirmed); Barr's Programming Embedded Systems named as the practice pole.
- GATE context: no dedicated GATE embedded paper; the EC/EE registers price its
  pieces (microcontrollers in the machine lines, the RTOS glance) — this book
  serves the university elective and professional pole honestly, cross-referenced
  rather than duplicating the CS shelf's homes.""",
    [
        ch("the-embedded-idea", "The Embedded Idea",
           "What 'embedded' honestly means (compute with a product wrapped around \
it); the constraint census — cost, power, size, timeliness — priced against the \
desktop's honest contrast; the category census (small, medium, large, SoC); \
the development-lab honest note (cross-toolchains, the target-versus-host \
distinction); and the safety-critical honest note stated early.",
           ["The Product Wrapped Around Compute",
            "The Constraint Census Priced",
            "Categories and the Lab's Honest Note"]),
        ch("embedded-hardware-design", "Embedded Hardware Design",
           "Processor selection priced (MCU versus MPU versus DSP — the decision \
census); the memory map read fluently (flash, SRAM, the peripherals' registers); \
the peripheral census — GPIO, timers/PWM, ADC (Analog Electronics' converter \
chapters cross-referenced), DMA named; clocking and reset honestly; and the \
schematic-to-board craft glanced (the EE honest note: decoupling and grounding).",
           ["Processor Selection Priced",
            "The Memory Map Read Fluently",
            "The Peripheral Census",
            "Clocking and Reset Honestly"]),
        ch("real-time-systems", "Real-Time Systems",
           "Deadline vocabulary (hard, soft, firm — with the honest consequences of \
each); task models and WCET's honest difficulty; the schedulability craft — \
rate-monotonic scheduling with its optimality honest note, EDF priced, priority \
inversion and the inheritance fix; the CS shelf's Operating Systems \
cross-referenced for the general theory (this book owns the embedded idiom).",
           ["Deadlines and Their Consequences",
            "RMS and EDF Priced",
            "Priority Inversion Fixed Honestly"]),
        ch("the-rtos", "The RTOS",
           "Why bare-metal gives way (the census of when each is honest); tasks and \
their states; the kernel services — semaphores and mutexes, queues and mailboxes, \
event flags; ISR discipline (the deferred-work craft); tick and timing services; \
and the RTOS census table (the open-source and commercial families priced by \
their honest niches).",
           ["Bare-Metal versus RTOS, Honestly",
            "Kernel Services Earned",
            "ISR Discipline",
            "The RTOS Census Table"]),
        ch("drivers-and-io", "Device Drivers and I/O",
           "The driver idea (the hardware's honest interpreter); interrupt handling \
practised (the nesting and reentrancy honest notes); timers and their modes; \
the serial-bus census — UART, SPI and I2C each priced by their wires, speeds \
and niches; analog I/O routed to the ADC cross-references; and the \
driver-layering craft.",
           ["The Driver as Honest Interpreter",
            "Timers and Their Modes",
            "UART, SPI, I2C Priced",
            "The Layering Craft"]),
        ch("embedded-networking", "Embedded Networking",
           "Why networks live inside products; the field-bus census with CAN \
priced honestly (its arbitration craft, frames and errors); LIN, Modbus and \
industrial Ethernet glanced; wireless glanced (BLE, LoRa, the IIoT doorstep); \
and the gateway pattern (the edge-node and cloud honest map, Internet of Things \
cross-referenced).",
           ["CAN Priced Honestly",
            "The Field-Bus Census",
            "Wireless and the IIoT Doorstep"]),
        ch("low-power-and-reliability", "Low-Power and Reliability Design",
           "The power budget earned (the sleep-state census, wake sources, the \
duty-cycle arithmetic); dynamic voltage and frequency in the small (the honest \
constraints of MCUs); reliability — watchdogs earned, brown-out and reset \
honesty, the EMC honest note; security glanced (the secure-boot honest note, \
Cybersecurity cross-referenced); and the product-lifetime census.",
           ["The Power Budget Earned",
            "Watchdogs and Brown-Out Honesty",
            "Security Glanced Honestly",
            "The Product-Lifetime Census"]),
        ch("methodology-and-case-studies", "Design Methodology and Case Studies",
           "Hardware/software co-design priced (the partition craft); simulation \
and the debugging census (JTAG/SWD, emulators, trace); the build-and-test flow; \
and the case-study census priced end-to-end — a data logger, a motor controller \
(Control Systems and Power Electronics cross-referenced), a sensor node — with \
the doorsteps: Internet of Things, Robotics and Automation, the \
product-engineering profession.",
           ["Co-Design Priced",
            "The Debugging Census",
            "Three Cases Priced End-to-End",
            "The Doorsteps Named"]),
    ],
)

book(
    "antennasAndWavePropagation", "antennas-and-wave-propagation",
    "Antennas and Wave Propagation",
    "the twenty-eighth book of the Engineering shelf (Electronics & Communication branch)",
    "Radiation engineered — the antenna census and the routes radio waves actually take",
    "First antennas course → wireless-systems readiness",
    "The radiated discipline: the antenna idea — the radiation mechanism, the \
antenna census (wire, aperture, microstrip, array), and the parameter family \
(radiation pattern, directivity and gain, beamwidth, input impedance, \
polarisation, bandwidth, efficiency); the thin-wire family — the infinitesimal \
and half-wave dipole analysed, the folded dipole and monopoles over ground; \
the array idea — the two-element array earned, the uniform linear array with \
pattern multiplication, binomial and end-fire arrays, beam steering and the \
smart-antenna glance; aperture and reflector antennas — horns, the parabolic \
reflector with its feed craft; microstrip and the modern census — the patch, \
the MIMO and adaptive glance; wave propagation — the ground wave, the sky wave \
and the ionosphere's layers with MUF and skip distance, the space wave and LOS \
with the curvature and fading honest notes; the link and field-strength craft; \
antenna measurements (patterns, gain, the anechoic honest note); and the \
synthesis with the wireless doorstep. Cross-references Electromagnetic Fields \
and Waves (the field theory beneath), Analog and Digital Communication (the \
link budget) and hands off to the wireless future.",
    ("#dc2626", "#991b1b"),
    "Antennas and Wave Propagation owns the radiation and propagation census \
(GATE EC S8's antenna lines: 'dipole and monopole antennas, linear antenna \
arrays' — the wave-propagation phrases of the register served honestly). \
Electromagnetic Fields and Waves owns the field-and-wave theory beneath (its \
radiation doorway cross-referenced); Analog and Digital Communication owns the \
link budget and system story; the CS shelf's wireless future books route here.",
    """- GATE 2026 EC Section 8 (EC_2026_Syllabus.pdf, extracted this pass): the
  Electromagnetics section's closing lines — 'dipole and monopole antennas,
  linear antenna arrays' — plus the wave-propagation phrases of the section
  (plane waves' reflection and refraction routed to the fields book, the
  propagation-through-media craft shared) — this book serves the antenna and
  propagation lines at full depth.
- Balanis, Antenna Theory: Analysis and Design 4e — the TOC web-checked this
  pass (Antennas; Fundamental Parameters; Radiation Integrals; the Linear Wire
  family; Loop antennas; Arrays; Aperture; Horn and Reflector antennas;
  Microstrip; the smart-antenna chapter; measurements); K.D. Prasad's Antenna
  and Wave Propagation named as the Indian pole (the propagation chapters' home
  in the Indian canon); Jordan & Balmain named.""",
    [
        ch("the-antenna-idea", "The Antenna Idea",
           "Why radiation happens (the accelerating-charge honest note); the \
transition from guided wave to free space; the antenna census with its \
families priced; and the parameter family learned as the trade vocabulary — \
pattern, directivity, gain (the honest difference), beamwidth, impedance, \
polarisation, bandwidth and efficiency.",
           ["The Radiation Mechanism, Honestly",
            "The Family Census",
            "The Parameter Vocabulary Earned"]),
        ch("the-thin-wire-family", "The Thin-Wire Family",
           "The infinitesimal dipole's fields read (the near-and-far census from \
the fields book cross-referenced); the half-wave dipole analysed — its pattern, \
radiation resistance and input impedance; the folded dipole and its impedance \
craft; monopoles over ground planes (the image theory honest note); and the \
small loop as the magnetic sibling.",
           ["The Half-Wave Dipole Analysed",
            "Folded Dipoles and Their Impedance Craft",
            "Monopoles and Image Theory",
            "The Loop Sibling"]),
        ch("the-array-idea", "The Array Idea",
           "The two-element array earned (the pattern-interference craft); \
pattern multiplication as the array's algebra; the uniform linear array — \
broadside and endfire families with their beamwidth and sidelobe census; \
binomial and Dolph-Chebyshev distributions priced; beam steering and the \
phased-array craft; and the smart-antenna and MIMO glance (the modern \
doorstep named).",
           ["Two Elements Earned",
            "Pattern Multiplication as Algebra",
            "Broadside, Endfire, Distributions",
            "Steering and the MIMO Glance"]),
        ch("aperture-and-reflector-antennas", "Aperture and Reflector Antennas",
           "The aperture idea (the field-equivalence honest note); horns — the \
sectoral and pyramidal census with their gains; the parabolic reflector — its \
geometry, feed craft and efficiency census; the Cassegrain honest note; lens \
antennas glanced; and the aperture census table priced by the microwave \
niches they serve.",
           ["The Aperture Idea",
            "Horns Priced",
            "The Parabolic Reflector Craft",
            "The Aperture Census Table"]),
        ch("microstrip-and-modern-antennas", "Microstrip and Modern Antennas",
           "The patch antenna earned — its radiation mechanism, the transmission- \
line model, the width-and-length design arithmetic and the feed census; \
bandwidth and the ground-plane honest notes; the miniaturisation census; the \
dielectric resonator glanced; and the modern families named — wearable, \
UWB, the metasurface honest note — priced by maturity.",
           ["The Patch Earned and Designed",
            "The Feed Census",
            "The Miniaturisation Census",
            "Modern Families Priced by Maturity"]),
        ch("wave-propagation-i", "Wave Propagation I: Ground and Space Waves",
           "The propagation census on one page (the frequency-versus-route map); \
the ground wave — its surface-wave craft and the frequency honest niche; the \
space wave — LOS with the radio horizon (the curvature arithmetic), the \
reflection with fading named, the diffraction glance (the knife-edge craft); \
and the field-strength and link arithmetic practised on real links.",
           ["The Frequency-versus-Route Map",
            "The Ground Wave's Niche",
            "LOS, Radio Horizon, Fading Named",
            "The Link Arithmetic Practised"]),
        ch("wave-propagation-ii", "Wave Propagation II: The Sky Wave",
           "The ionosphere earned (the layers as the honest radio mirror — D, E, \
F with their diurnal census); the sky-wave craft — incidence, virtual height, \
MUF and skip distance computed; the fading census (its mechanisms honestly \
priced); the HF propagation arithmetic worked on real circuits; and the \
satellite route priced as the modern honest successor (the slant-path \
arithmetic).",
           ["The Ionosphere Earned",
            "MUF and Skip Computed",
            "Fading's Mechanisms Priced",
            "The Satellite Route Priced"]),
        ch("measurements-and-synthesis", "Antenna Measurements and the Synthesis",
           "The measurement census — pattern ranges and the anechoic honest \
note, gain by comparison and the three-antenna craft, the impedance \
measurement routed to the vector instruments; the near-field honest glance; \
and the synthesis — one page from the radiation mechanism to the wireless \
link, with the doorsteps: Analog and Digital Communication's link budget, the \
wireless future's books, Electromagnetic Fields and Waves beneath it all.",
           ["The Measurement Census",
            "Gain Measured Honestly",
            "The Synthesis Page",
            "The Doorsteps Named"]),
    ],
)

book(
    "digitalSignalProcessing", "digital-signal-processing", "Digital Signal Processing",
    "the twenty-ninth book of the Engineering shelf (Electronics & Communication branch)",
    "Signals computed — the DFT, FFT and the digital filters that shape the modern world",
    "First DSP course → audio, speech and SDR readiness",
    "The computed signal: the DSP worldview (the analog-digital-analog chain, \
quantisation priced honestly — Analog Electronics' converter chapters \
cross-referenced); the discrete-time recap (Signals and Systems owns the \
foundations, cross-referenced honestly — LTI, convolution, z); the DFT earned \
— its definition, properties and the circular-convolution craft, with the \
spectral-analysis honesty (leakage, windowing and the resolution trade); \
the FFT — radix-2 decimation-in-time and decimation-in-frequency priced with \
their arithmetic honest note; the filter-design arc — FIR by windows and \
frequency sampling with linear phase earned; IIR by the analog-prototype route \
— impulse invariance and the bilinear transform with Butterworth and \
Chebyshev prototypes (the Mathematics shelf's approximation honest note); \
filter structures (direct, cascade, lattice) and the finite-word-length \
honesty (quantisation, overflow and the rounding noise census); multirate \
processing (decimation, interpolation, the polyphase honest note) glanced \
at depth; the applications census — audio and speech, the adaptive filter \
glimpse, images routed to the CS shelf's Computer Vision; and the SDR \
doorstep. Cross-references Signals and Systems, Analog Electronics, Analog \
and Digital Communication and hands off to the CS shelf's audio and vision \
books.",
    ("#831843", "#500724"),
    "Digital Signal Processing owns the computed-signal craft (GATE EC S2's \
DFT line: 'DTFT, DFT, z-transform, discrete-time processing of continuous-time \
signals' — the DFT's algorithmic and design depth lives here). Signals and \
Systems owns the transform foundations; Analog Electronics owns the \
converters; the CS shelf's NLP and Computer Vision own the application domains \
above.",
    """- GATE 2026 EC Section 2's discrete lines (EC_2026_Syllabus.pdf, extracted
  this pass): 'DTFT, DFT, z-transform, discrete-time processing of continuous-
  time signals' — the DFT and filtering depth is this book's register.
- Proakis & Manolakis, Digital Signal Processing — the TOC read this pass from
  the open-PDF contents (Introduction; Discrete-Time Signals and Systems; the
  z-transform; the frequency-domain chapters; the DFT and its efficient
  computation; the FIR and IIR design chapters; filter structures; sampling
  and reconstruction; multirate); Oppenheim & Schafer named as the depth pole;
  Salivahanan named as the Indian pole.""",
    [
        ch("the-dsp-worldview", "The DSP Worldview",
           "Why compute signals (the programmability and repeatability honest \
notes against the analog circuit's drift); the chain drawn — anti-alias, \
sample, quantise, compute, reconstruct — with every block's honest tax \
(Analog Electronics cross-referenced); the quantisation noise arithmetic \
priced; and the application census that motivates the craft.",
           ["Why Compute Signals",
            "The Chain and Its Honest Taxes",
            "Quantisation Noise Priced",
            "The Application Census"]),
        ch("the-dft", "The DFT",
           "The DFT earned from the DTFT's sampled honest note (and its periodic \
mirror); the DFT's properties as working engines (circular shift and the \
twiddle census); circular convolution and the linear-by-circular craft; the \
spectral-analysis honesty — leakage, scalloping, the window census and the \
resolution trade; and the spectral-estimation honest note that bounds what a \
finite record can honestly say.",
           ["The DFT Earned from Sampling",
            "Circular Convolution Crafted",
            "Leakage and the Window Census",
            "The Resolution Trade Priced"]),
        ch("the-fft", "The FFT",
           "Why the DFT's honest cost invites the algorithm (the O(N log N) \
arithmetic); radix-2 decimation-in-time developed and its butterfly drawn; \
decimation-in-frequency priced; computational counts worked; the bit-reversal \
honest note; and the FFT's consequences priced — real-time spectra, the \
filtering-by-FFT craft and its circular honest caveat.",
           ["The Butterfly Earned",
            "DIF Priced Against DIT",
            "Bit-Reversal Noted Honestly",
            "Filtering by the FFT"]),
        ch("fir-filter-design", "FIR Filter Design",
           "Why linear phase matters (the constant-delay honest note) and which \
symmetries earn it; design by the window route (the ideal prototypes and the \
window census priced); design by frequency sampling; the equiripple honest \
glance (Parks-McClellan named); and the FIR-versus-IIR census priced by the \
order honest note.",
           ["Linear Phase Earned",
            "The Window Route Worked",
            "The Frequency-Sampling Route",
            "FIR versus IIR Priced"]),
        ch("iir-filter-design", "IIR Filter Design",
           "The analog-prototype route stated (the design inheritance from \
analog filters); Butterworth and Chebyshev prototypes with their honest \
trades; the transformation engines — impulse invariance with its aliasing \
honest note, the bilinear transform with its frequency-warped honesty and the \
prewarping craft; the cascade-of-biquads realisation; and the stability \
discipline (the quantised-pole honest note).",
           ["The Prototype Inheritance",
            "Impulse Invariance and Its Aliasing",
            "The Bilinear Transform and Prewarping",
            "Biquads and the Stability Discipline"]),
        ch("structures-and-word-length", "Filter Structures and Finite Word Length",
           "The realisation census — direct forms I and II, the cascade and \
parallel routes, the lattice honest glance; coefficient quantisation and the \
pole-migration craft; overflow and the scaling honest note; rounding noise \
priced (the roundoff-noise census); and the fixed-versus-floating honest map \
for real hardware.",
           ["The Realisation Census",
            "Poles Under Quantisation",
            "Overflow and Scaling",
            "The Roundoff Census"]),
        ch("multirate-and-applications", "Multirate Processing and the Applications Census",
           "Sampling-rate change (decimation and interpolation with their \
anti-alias disciplines); the polyphase honest note; the applications census — \
audio processing priced (the EQ and effects craft), speech routed to the CS \
shelf's NLP, the adaptive-filter glimpse (the LMS engine named), images routed \
to Computer Vision; and the SDR doorstep named with the radio's honest map.",
           ["Rate Change and Its Disciplines",
            "The Audio Census Priced",
            "The Adaptive Glimpse",
            "The SDR Doorstep"]),
        ch("synthesis-and-doorstep", "The Synthesis and the Doorstep",
           "The synthesis map — one page from the sample to the shaped spectrum; \
the design-project census priced end-to-end (a speech-band filter, a \
spectral analyser); the tools census (the MATLAB/Python honest note); and the \
doorsteps — Analog and Digital Communication's modems, the CS shelf's audio \
and vision books, the embedded-DSP hardware (Embedded Systems \
cross-referenced).",
           ["The Map: Sample to Spectrum",
            "Two Designs Priced End-to-End",
            "The Doorsteps Named"]),
    ],
)
# ======================================================================
# PART 4 — CIVIL (9 books)
# ======================================================================

book(
    "structuralEngineering", "structural-engineering", "Structural Engineering",
    "the thirtieth book of the Engineering shelf (Civil branch)",
    "Determinacy to design codes — the analysis and design of load-bearing structures",
    "First structures course → professional design-office readiness",
    "The load-bearing discipline: the structural frame (structure types, load \
paths, determinacy — with Engineering Mechanics' equilibrium craft and Strength \
of Materials' stress machinery cross-referenced); statically determinate beams \
and internal-force diagrams; trusses, arches, cables and frames analysed; \
deflection of structures by energy methods (Castigliano cross-referenced) and \
the moment-area craft; influence lines for moving loads; the indeterminate \
world — the force (compatibility) methods; the displacement methods — \
slope-deflection and moment distribution learned as fluent crafts; the \
matrix stiffness method (beam and truss elements, direct stiffness, the \
computer-adjacent craft GATE names); and the design half — concrete design to \
IS 456 (working stress versus limit state, beams, slabs and columns, bond and \
development length, prestressed beams) and steel design to IS 800 (tension and \
compression members, beams and beam-columns, connections simple and eccentric, \
plate girders and trusses, the plastic-analysis concept); closing with the \
professional synthesis (the codes census, modeling judgment, the seismic \
glance). Cross-references Strength of Materials, Building Materials (the \
concrete and steel themselves), Construction Management and hands off to \
Geotechnical Engineering's foundation interface.",
    ("#374151", "#111827"),
    "Structural Engineering owns structural analysis and the IS-code design craft \
(GATE CE S2's Structural Engineering register). Strength of Materials (mechanical) \
owns the underlying mechanics of simple members; Building Materials owns the \
material science of concrete and steel; Geotechnical Engineering owns the soil the \
structure stands on (the interface chapter cross-referenced); Machine Design owns \
the machine idiom of joints and fatigue; the seismic and bridge depth are future \
books (honestly named).",
    """- GATE 2026 CE Section 2 'Structural Engineering' (CE_2026_Syllabus.pdf,
  extracted this pass): 'Engineering Mechanics: System of forces, free-body
  diagrams, equilibrium equations; Internal forces in structures; Frictions and
  its applications; Centre of mass; Free Vibrations of undamped SDOF system.
  Solid Mechanics: Bending moment and shear force in statically determinate
  beams; Simple stress and strain relationships; Simple bending theory, flexural
  and shear stresses, shear centre; Uniform torsion, Transformation of stress;
  buckling of column, combined and direct bending stresses. Structural Analysis:
  Statically determinate and indeterminate structures by force/energy methods;
  Method of superposition; Analysis of trusses, arches, beams, cables and frames;
  Displacement methods: Slope deflection and moment distribution methods;
  Influence lines; Stiffness and flexibility methods of structural analysis.
  Construction Materials and Management ... Concrete Structures: Working stress
  and Limit state design concepts; Design of beams, slabs, columns; Bond and
  development length; Prestressed concrete beams. Steel Structures: Working
  stress and Limit state design concepts; Design of tension and compression
  members, beams and beam-columns, column bases; Connections — simple and
  eccentric, beam-column connections, plate girders and trusses; Concept of
  plastic analysis — beams and frames' — the solid-mechanics lines route to
  Strength of Materials (cross-referenced) and the analysis/design lines are
  this book's register.
- R.C. Hibbeler, Structural Analysis — the TOC web-checked this pass from the
  Pearson page and search records (types of structures and loads; determinacy;
  analysis of statically determinate structures; deflections; influence lines;
  the force and displacement methods; the stiffness-matrix chapters); Vazirani &
  Ratwani and Ramamrutham named as the Indian poles; Punmia's RCC Design and
  the IS 456/800 arcs named for the design half.""",
    [
        ch("the-structural-frame", "The Structural Frame",
           "The structure census (beams, columns, trusses, arches, slabs, walls) \
with their honest load paths; the load census (dead, live, wind, seismic named); \
determinacy and stability judged (the degree-of-static-indeterminacy craft); \
modelling judgment as the analyst's first honesty; and the mechanics \
inheritance from Engineering Mechanics and Strength of Materials \
cross-referenced.",
           ["The Structure and Load Censuses",
            "Determinacy Judged",
            "Modeling Judgment as Honesty"]),
        ch("determinate-beams-and-frames", "Statically Determinate Beams and Frames",
           "Internal forces (axial, shear, moment) and their diagrams drawn \
fluently for beams and simple frames (the differential relations \
cross-referenced from Strength of Materials); the cable and three-hinged arch \
analysed (the thrust craft); moving-load introduction; and the determinate \
census solved end-to-end.",
           ["Diagrams Drawn Fluently",
            "Cables and Three-Hinged Arches",
            "The Determinate Census Solved"]),
        ch("trusses", "Trusses",
           "The truss idea (the two-force-member honesty); the method of joints \
and the method of sections worked at structural scale; zero-force members read \
honestly; compound and complex trusses glanced; space trusses named; and the \
truss as the bridge and roof vocabulary it actually is.",
           ["Joints and Sections at Scale",
            "Zero-Force Members Read Honestly",
            "The Truss as Vocabulary"]),
        ch("deflections-and-influence-lines", "Deflections and Influence Lines",
           "Deflection by the energy methods (Castigliano's theorem cashed at \
structural scale, the unit-load method) and the moment-area craft; influence \
lines — earned for determinate beams (the moving-load engine), used for \
absolute-maximum moment and the bridge census; the qualitative \
influence honesty for the indeterminate case named ahead.",
           ["Castigliano Cashed at Scale",
            "Influence Lines Earned",
            "Absolute Maximum Moment Worked"]),
        ch("force-methods", "The Force Methods",
           "The indeterminate idea priced (redundants as the bookkeeping); \
the classical force method — compatibility equations with the flexibility \
craft; the method of superposition GATE names; Maxwell's reciprocal theorem \
earned; and the honest verdict on which structures suit the force route.",
           ["Redundants as Bookkeeping",
            "Compatibility Earned",
            "Reciprocity and the Honest Verdict"]),
        ch("displacement-methods", "The Displacement Methods",
           "The slope-deflection method earned (its equations and the \
end-moment bookkeeping); moment distribution learned as a fluent craft (the \
fixed-end-moment census, distribution and carry-over, the sway honesty); \
analysis of continuous beams and jointed frames worked end-to-end; and the \
two methods priced against each other honestly.",
           ["Slope-Deflection Earned",
            "Moment Distribution, Fluent",
            "Frames Worked End-to-End",
            "The Two Methods Priced"]),
        ch("matrix-stiffness", "The Matrix Stiffness Method",
           "The stiffness idea at matrix scale (the displacement route the \
computer speaks); beam and truss elements derived; transformation to global \
axes; the direct-stiffness assembly craft; boundary conditions and the solve; \
and the computer-adjacent honesty (what the software hides, what the engineer \
must still judge) with the CAD/CAM cross-reference.",
           ["Elements Derived",
            "Direct Stiffness Assembled",
            "The Solve and Its Judgment"]),
        ch("concrete-design", "Concrete Structures",
           "Concrete's design philosophies — working stress versus limit state \
(IS 456's honest evolution); the limit-state craft — characteristic strength, \
partial safety factors, the design constants; beams (singly and doubly \
reinforced, the T-beam honesty), slabs (one-way and two-way), columns (short \
and the slender honesty) with the interaction craft; bond, development length \
and detailing; shear and torsion reinforcement; and prestressed concrete — \
the concept and losses priced (the GATE line).",
           ["Limit State Earned",
            "Beams and Slabs Designed",
            "Columns and Bond",
            "Prestressing and Its Losses"]),
        ch("steel-design", "Steel Structures",
           "Steel's design philosophies to IS 800 (working stress and limit \
state); tension members designed (the net-section craft); compression members \
(the buckling routes from Strength of Materials cashed, the slenderness \
census); beams and beam-columns (the lateral-torsional honest note); \
connections — bolted and welded, simple and eccentric, the beam-column \
connection census; plate girders and trusses priced; and the plastic-analysis \
concept (the collapse-mechanism craft for beams and frames).",
           ["Tension and Compression Designed",
            "Beams and Beam-Columns",
            "Connections, Simple and Eccentric",
            "Plate Girders and Plastic Analysis"]),
        ch("professional-synthesis-and-doorstep", "The Professional Synthesis and the Doorstep",
           "The synthesis — one page from determinacy to the codes; the codes \
census (IS 456, IS 800, IS 1893 named honestly as future doors); the \
modeling-judgment craft priced on a real building; the soil interface (the \
foundation demand handed to Geotechnical Engineering, cross-referenced); the \
seismic and bridge depth named as future books; and the construction-phase \
doorstep to Construction Management.",
           ["The Synthesis Page",
            "A Building Priced on Judgment",
            "The Soil Interface Named",
            "The Future Doors Named Honestly"]),
    ],
)

book(
    "surveyingAndGeomatics", "surveying-and-geomatics", "Surveying and Geomatics",
    "the thirty-first book of the Engineering shelf (Civil branch — the GATE CE Section 7 'Geomatics Engineering' register, named honestly)",
    "Measuring the earth — from chains and levels to total stations, GNSS and remote sensing",
    "First surveying course → geomatics-practice readiness",
    "The measurement of the earth itself: the surveying discipline (principles, \
classification, plans versus maps, scales and the coordinate honest note); \
errors and their adjustment (the least-squares craft cross-referenced to the \
Mathematics shelf); linear and angular measurement (chains, tapes and their \
corrections, compass work with bearings); levelling — the level, bench marks, \
reciprocal and trigonometric levelling with the curvature-and-refraction \
honest note; the theodolite and traversing (angle measurement, traverse \
computation and adjustment, triangulation as the geodetic craft); \
tachometry (stadia and tangential methods); curves — simple, compound, \
reverse, transition and vertical, with the setting-out craft; the modern \
instrument census — EDM, total stations and GNSS (the satellite geometry \
honest note); photogrammetry and remote sensing (scale and flying height, the \
sensor census, GIS as the integration engine); computation of areas and \
volumes (the planimeter, cross-sections, the mass-haul honest note with \
Transportation and Water Resources cross-referenced); and the professional \
synthesis with the digital-geomatics doorstep. Cross-references every civil \
book that consumes ground truth.",
    ("#059669", "#065f46"),
    "Surveying and Geomatics owns ground measurement (GATE CE S7). Water \
Resources consumes its cross-sections and catchment truth; Transportation \
consumes its alignment craft; Environmental consumes its mapping; the GNSS and \
GIS depth routes honestly to the CS shelf's geo-aware future books \
(cross-referenced).",
    """- GATE 2026 CE Section 7 'Geomatics Engineering' (CE_2026_Syllabus.pdf,
  extracted this pass): 'Principles of surveying; Errors and their adjustment;
  Maps — scale, coordinate system; Distance and angle measurement — Levelling
  and trigonometric levelling; Traversing and triangulation survey; Total
  station; Horizontal and vertical curves. Photogrammetry and Remote Sensing —
  Scale, flying height; Basics of remote sensing and GIS' — the entire section
  is this book's register.
- B.C. Punmia's Surveying Vol. I — the arc web-checked this pass (the 24-chapter
  Punmia organisation confirmed through Google Books and the open listings; the
  tacheometric chapter confirmed); Bannister's Surveying named as the second
  pole; K.R. Arora named. Chandra's Higher Surveying named for the geodetic
  tail.""",
    [
        ch("the-surveying-discipline", "The Surveying Discipline",
           "Why measure the earth (the engineering honest note: every project \
begins and ends on the ground); principles — work from whole to part, check \
twice; classification (plane versus geodetic, land versus engineering); \
plans, maps and scales; the coordinate census (the local grid and the \
projection honest note); and the error-and-adjustment preview (the \
Mathematics shelf's statistics cross-referenced).",
           ["Work from Whole to Part",
            "Plans, Maps and Scales",
            "The Error Preview"]),
        ch("linear-and-angular-measurement", "Linear and Angular Measurement",
           "Chain and tape surveying with its corrections (sag, temperature, \
slope, the pull honest notes); ranging and obstacle work; compass surveying — \
bearings, local attraction and the correction craft; angle measurement with \
the theodolite (its adjustments honestly priced); and the measurement census \
bridging to the total-station era.",
           ["Tape Corrections, All of Them",
            "Bearings and Local Attraction",
            "The Theodolite's Adjustments"]),
        ch("levelling", "Levelling",
           "The level and the staff (the bubble's honest law); bench marks, \
reduced levels and the two-bookkeeping methods (rise-and-fall versus \
collimation); the arithmetic check priced; reciprocal levelling and \
trigonometric levelling with the curvature-and-refraction corrections; the \
profile and cross-section craft (the road and pipeline census); and contouring \
(the interpolation craft, the contour's honest reading of terrain).",
           ["Two Bookkeepings, Checked",
            "Curvature and Refraction Priced",
            "Profiles and Cross-Sections",
            "Contours Read Honestly"]),
        ch("traversing-and-triangulation", "Traversing and Triangulation",
           "The traverse — closed and open; latitude and departure computed with \
the closing-error craft (Bowditch's rule and the transit honest note); \
triangulation as the geodetic engine (the well-conditioned figure census, \
satellite and baseline stations); plane-table surveying named for its field \
honesty; and the network-adjustment doorstep.",
           ["Latitudes and Departures Closed",
            "Bowditch's Rule Earned",
            "Triangulation's Figure Census"]),
        ch("tachometry-and-curves", "Tachometry and Curves",
           "Tachometric measurement — the stadia constants earned (the \
inclined-sight arithmetic) and the tangential method priced; then curves — \
simple (the setting-out craft by offsets and deflection angles), compound and \
reverse; transition curves (the spiral's honest purpose and the \
shift arithmetic); vertical curves (the parabola craft); and the \
setting-out census for real works (Transportation cross-referenced).",
           ["Stadia Earned",
            "Simple Curves Set Out",
            "Transitions and the Shift",
            "Vertical Curves Crafted"]),
        ch("total-stations-and-gnss", "Total Stations and GNSS",
           "The total station as the theodolite-meets-EDM honest merge (its \
measurement engines priced); traverse by total station worked; the GNSS idea \
(its segments and the signal honest note); the position crafts — absolute \
versus differential, RTK priced; the satellite geometry and error census; and \
the control-network honesty that modern instruments still owe to classical \
adjustment.",
           ["The Total Station's Engines",
            "GNSS's Segments and Signals",
            "Differential and RTK Priced",
            "The Control Honesty"]),
        ch("photogrammetry-and-remote-sensing", "Photogrammetry and Remote Sensing",
           "The aerial photograph — scale and flying height arithmetic (the \
GATE lines); relief displacement priced; stereoscopy named honestly; remote \
sensing — the electromagnetic honest note, the sensor census (passive and \
active, the resolution census), the platform families; image-interpretation \
basics; and GIS as the integration engine (layers, the analysis census, the \
geographic honest note) — the digital-geomatics doorway.",
           ["Scale and Flying Height Worked",
            "The Sensor and Resolution Censuses",
            "GIS as Integration Engine"]),
        ch("areas-volumes-and-synthesis", "Areas, Volumes and the Synthesis",
           "Area computation (the trapezoidal and Simpson craft, the planimeter \
named); volumes (the cross-section census, the prismoidal formula and its \
correction); the mass-haul diagram earned (Transportation cross-referenced); \
catchment areas for the hydrologists (Water Resources cross-referenced); the \
synthesis — one page from chain to satellite; and the professional doorstep \
(the licensed surveyor's responsibilities named honestly).",
           ["Areas by Two Crafts",
            "Volumes and the Prismoidal",
            "Mass-Haul and Catchments",
            "The Synthesis and the Licence"]),
    ],
)

book(
    "buildingMaterials", "building-materials", "Building Materials",
    "the thirty-second book of the Engineering shelf (Civil branch)",
    "Stones, bricks, cement, concrete, timber and steel — the material census of construction",
    "First construction-materials course → specification-and-QC readiness",
    "The construction-materials census: the building worldview (requirements, \
selection and the specification craft); stones — the rock census (igneous, \
sedimentary, metamorphic), quarrying and dressing, the testing honest note; \
bricks and blocks — clay brick manufacture and testing (IS standards), hollow \
and AAC blocks priced; cement — Portland's composition (Bogue's honest \
equations), types, hydration chemistry and tests (fineness, soundness, \
setting times, strength); concrete and its constituents — aggregates \
(grading and the sieve craft, the shape honest note), water, admixtures, mix \
design (the IS method worked) and fresh-and-hardened properties with \
short-term and long-term behaviour (Materials Science cross-referenced); \
timber — structure, seasoning, defects and preservation; metals in \
construction — structural steel's composition and behaviour (the GATE CE \
line), aluminium priced; bituminous materials, paints, varnishes, glass and \
the modern census (polymers, composites, geopolymers glanced); and the \
durability-and-selection synthesis. Cross-references Materials Science (the \
structure-property truth), Structural Engineering (the design consumer) and \
hands off to Transportation's pavement materials and Environmental's \
sustainability chapters.",
    ("#a16207", "#713f12"),
    "Building Materials owns the construction-materials census (GATE CE S2's \
'Construction Materials' line: 'Structural Steel — Composition, material \
properties and behaviour; Concrete — Constituents, mix design, short-term and \
long-term properties'). Materials Science (mechanical) owns the underlying \
microstructure science (the contract stated in both headers); Structural \
Engineering owns the design craft these materials serve; Transportation owns \
highway materials' pavement story; Environmental Engineering owns the \
sustainability and waste side.",
    """- GATE 2026 CE Section 2's Construction Materials line (CE_2026_Syllabus.pdf,
  extracted this pass): 'Structural Steel — Composition, material properties and
  behaviour; Concrete — Constituents, mix design, short-term and long-term
  properties' — this book's register.
- B.C. Punmia's Building Construction materials arc and S.K. Duggal's Building
  Materials — the Indian canonical arcs web-checked this pass (the stones/
  bricks/cement/timber/paint organisation confirmed through the open listings);
  P.C. Varghese's Building Materials named; MS Shetty's Concrete Technology
  named as the concrete pole; the IS 456/IS 383/IS 269 census noted for
  authoring time.""",
    [
        ch("the-building-worldview", "The Building Worldview",
           "The requirements census (strength, durability, the service honest \
notes); selection priced by function, cost and the site's honest conditions; \
the specification craft (reading and writing the IS-anchored spec); and the \
material census drawn on one page — the book's map.",
           ["Requirements Priced Honestly",
            "Selection by Function and Site",
            "The Specification Craft"]),
        ch("stones-and-bricks", "Stones, Bricks and Blocks",
           "The rock census and its engineering reading; quarrying and dressing \
(the season-and-dress honest note); stone testing and the deterioration \
census; bricks — manufacture (moulding, drying, burning), classification and \
the IS testing census (compressive strength, water absorption, efflorescence); \
hollow blocks and AAC priced by their niches.",
           ["The Rock Census Read",
            "Bricks Manufactured and Tested",
            "Blocks Priced by Niche"]),
        ch("cement", "Cement",
           "Portland cement's composition (Bogue's equations priced); the types \
census (OPC grades, PPC, PSC, rapid-setting — by honest niche); hydration — \
the compounds' chemistry and the heat honest note; the testing census \
(fineness, consistency, setting times, soundness, strength); storage and \
the freshness honest note; and alternative cements glanced (geopolymers \
named).",
           ["Bogue's Composition Priced",
            "Hydration's Chemistry and Heat",
            "The Testing Census",
            "The Alternative Glance"]),
        ch("aggregates-and-admixtures", "Aggregates, Water and Admixtures",
           "The aggregate census by size and source (the shape-and-texture \
honest note); grading and the sieve analysis craft (the curve read); the \
specific-gravity and bulk-density arithmetic; deleterious substances priced; \
water's quality census; and admixtures — chemical (plasticisers, retarders, \
accelerators) and mineral (fly ash, GGBS, silica fume) priced by their honest \
niches.",
           ["The Sieve Craft Read",
            "Density Arithmetic",
            "Water Quality Priced",
            "Admixtures by Niche"]),
        ch("concrete-and-mix-design", "Concrete and Mix Design",
           "Fresh concrete — workability and its tests (slump, compaction \
factor, Vee-Bee priced); the IS mix-design method worked honestly (target \
strength, water-cement, the trial-batch craft); batching, mixing, transport, \
placing and compaction (the segregation-and-bleeding honest notes); curing as \
the neglected law; hardened properties — compressive and flexural strength, \
the grade census; and long-term behaviour — shrinkage, creep and durability \
(the permeability honest note, Materials Science cross-referenced).",
           ["Workability Tested",
            "The IS Mix Design Worked",
            "Compaction and Curing as Law",
            "Shrinkage, Creep, Durability"]),
        ch("timber-and-metals", "Timber and Metals in Construction",
           "Timber — its structure and the anisotropic honest note, seasoning \
(the methods priced), defects and preservation, plywood and engineered wood \
priced; structural steel — its composition and properties (the GATE line \
served; Materials Science's Fe-C arc cross-referenced), the section census \
(rails, joists, plates); aluminium and its alloys priced by niche; and the \
metals' corrosion doorway (Materials Science's chapter cross-referenced).",
           ["Timber Seasoned and Preserved",
            "Structural Steel's Composition Served",
            "Aluminium Priced by Niche"]),
        ch("bituminous-and-modern-materials", "Bituminous, Finishing and Modern Materials",
           "Bituminous materials — the bitumen-versus-tar honest split, the \
cutback and emulsion census (Transportation's pavement chapter \
cross-referenced); paints and varnishes (their constitution and the drying \
craft); glass, ceramics and the service census; the modern families — \
polymers and composites in construction, geosynthetics priced honestly, the \
sustainability census (recycled materials, the embodied-carbon honest note).",
           ["Bitumen Served Honestly",
            "Paints and Finishes",
            "Geosynthetics Priced",
            "The Sustainability Census"]),
        ch("durability-and-selection-synthesis", "Durability, Selection and the Synthesis",
           "The durability engine — what makes materials fail in service \
(the moisture-thermal-chemical census); the selection craft priced on real \
elements (a wall, a slab, a roof — from census to specification); the \
quality-control census on site; the synthesis map; and the doorsteps — \
Structural Engineering (the design consumer), Environmental Engineering (the \
sustainability partner), the future Materials-Science homes.",
           ["What Fails Materials in Service",
            "Three Elements Specified",
            "The Synthesis and Doorsteps"]),
    ],
)

book(
    "geotechnicalEngineering", "geotechnical-engineering", "Geotechnical Engineering",
    "the thirty-third book of the Engineering shelf (Civil branch)",
    "Soil as an engineering material — phase relations, seepage, consolidation, strength and foundations",
    "First soil-mechanics course → foundation-design readiness",
    "The ground as the engineer's most honest material: the soil idea — the \
three-phase system and phase relationships, index properties and Atterberg \
limits, classification (USCS and the IS family); soil water — permeability \
(one-dimensional flow and Darcy's law), seepage through soils (two-dimensional \
flow nets, uplift pressure, piping and the quicksand condition), capillarity \
and the seepage-force craft; the effective-stress principle earned \
(Terzaghi's law); compaction (Proctor and field control); stress distribution \
in soils (Boussinesq's theory, the pressure-bulb reading, Newmark glanced); \
consolidation — one-dimensional theory, the time rate and the e-log-p \
settlement craft; shear strength — Mohr-Coulomb, the triaxial/direct/UCS test \
census, effective versus total parameters, stress paths and the stress-strain \
characteristics of clays and sands; site investigation (boreholes, sampling, \
SPT, CPT and the plate load test — the GATE register); earth pressure \
(Rankine and Coulomb) and slope stability (infinite and finite slopes, \
Bishop's method); shallow foundations — Terzaghi's and Meyerhof's bearing \
capacity, the water-table and combined-footing/raft crafts, contact pressure \
and settlement analysis; deep foundations — pile statics and dynamics, group \
efficiency, negative skin friction and the load-test craft; and the \
professional synthesis. Cross-references Structural Engineering (the \
structure above), Fluid Mechanics (the flow science), Surveying (the site \
truth) and hands off to Water Resources' groundwater.",
    ("#92400e", "#78350f"),
    "Geotechnical Engineering owns soil mechanics and foundation engineering \
(GATE CE S3 — the whole section is its register). Structural Engineering owns \
the structure the foundation carries (the interface cross-referenced); Fluid \
Mechanics owns the general flow science its seepage chapters lean on; Water \
Resources owns the groundwater-and-well resource story (the aquifer cross- \
reference stated); Transportation's embankment and subgrade lines route here.",
    """- GATE 2026 CE Section 3 'Geotechnical Engineering' (CE_2026_Syllabus.pdf,
  extracted this pass): Soil Mechanics (Three-phase system and phase
  relationships, index properties; classification systems; permeability,
  seepage, flow nets, uplift pressure, piping, capillarity, seepage force;
  effective stress and quicksand; compaction; one-dimensional consolidation
  and time rate; shear strength, Mohr's circle, effective and total shear
  strength parameters, stress-strain characteristics of clays and sand; stress
  paths) + Foundation Engineering (sub-surface investigations — drilling, 
  sampling, plate load test, SPT and CPT; earth pressure theories — Rankine
  and Coulomb; slope stability — finite and infinite slopes, Bishop's method;
  stress distribution — Boussinesq; pressure bulbs; shallow foundations —
  Terzaghi's and Meyerhoff's bearing capacity, effect of water table; combined
  footing and raft; contact pressure; settlement analysis; deep foundations —
  dynamic and static formulae, axial load capacity of piles, pile load test,
  lateral loading, pile group efficiency, negative skin friction) — the
  entire two-part section is this book's register.
- V.N.S. Murthy's Geotechnical Engineering and Gopal Ranjan & A.S.R. Rao's
  Basic and Applied Soil Mechanics — the Indian canonical arcs web-checked
  this pass; B.M. Das' Principles of Geotechnical Engineering named as the
  standard pole; Terzaghi, Peck & Mesri named as the classic.""",
    [
        ch("the-soil-idea", "The Soil Idea",
           "Why soil breaks the engineering honest note (a particulate, \
three-phase, stress-history-carrying material); the three-phase diagram and \
its relationships (void ratio, porosity, degree of saturation, unit weights — \
the arithmetic census practised); index properties — grain-size \
distribution (the curve craft) and consistency (Atterberg limits, the \
plasticity chart); and classification by USCS and the IS family (the \
plasticity honest note).",
           ["The Three-Phase Arithmetic",
            "Atterberg and the Plasticity Chart",
            "Classification by Two Families"]),
        ch("soil-water-and-seepage", "Soil Water, Permeability and Seepage",
           "Permeability — Darcy's law earned (the valid-flow honest note) and \
the coefficient's lab census (constant and falling head); field permeability \
glanced; two-dimensional seepage — flow nets drawn and read (the equipotential \
craft), uplift pressure and exit gradient; piping and the quicksand \
condition earned (the critical-gradient arithmetic); capillarity and the \
seepage-force craft; and the flow-science inheritance from Fluid Mechanics \
cross-referenced.",
           ["Darcy Earned, Both Heads",
            "Flow Nets Drawn and Read",
            "Piping and Quicksand Priced",
            "Capillarity and Seepage Force"]),
        ch("effective-stress-and-compaction", "Effective Stress and Compaction",
           "Terzaghi's effective-stress principle earned (the physics read \
honestly — the stress the grains carry); the capillary and artesian honest \
notes; quicksand revisited through the principle; compaction — Proctor's \
laboratory craft (the OMC-maximum-density curve read), field compaction and \
its control (the specification census, the field-density tests); and the \
compaction-versus-consolidation distinction priced honestly.",
           ["Terzaghi's Principle Earned",
            "Proctor's Curve Read",
            "Field Control Priced",
            "Compaction versus Consolidation"]),
        ch("stress-distribution", "Stress Distribution in Soils",
           "Why the ground answers to Boussinesq (the elastic half-space honest \
note); the point-load solution and its extension census (circular and \
rectangular areas, the 2:1 approximation priced); the pressure-bulb reading \
(the isobar craft); Newmark's influence chart worked; Westergaard's honest \
comparison glanced; and the stress-history note that predicts the \
consolidation chapter's behaviour.",
           ["Boussinesq Earned",
            "The Bulb Read by Isobars",
            "Newmark Worked",
            "The Uniform-Approximation Census"]),
        ch("consolidation", "Consolidation",
           "The consolidation idea (the spring analogy honestly told); the \
oedometer test and the e-log-p curve read (the preconsolidation honest note — \
the stress history in one plot); the settlement craft (normally consolidated \
versus overconsolidated); Terzaghi's one-dimensional theory (the governing \
equation and the coefficient of consolidation); the time-rate craft (the \
square-root and log fittings, the U-T census); secondary consolidation named; \
and the settlement arithmetic worked on real clays.",
           ["The Spring Honestly Told",
            "The e-log-p Story Read",
            "Terzaghi's 1D Theory",
            "Time-Rate and Settlement Worked"]),
        ch("shear-strength", "Shear Strength",
           "Mohr-Coulomb earned (the failure criterion priced on the stress \
plane); the test census — direct shear, triaxial (UU, CU, CD with their \
honest purposes) and unconfined compression; the vane glanced; effective \
versus total parameters (the drained-versus-undrained honest split examiners \
price); stress paths drawn; the stress-strain characteristics of clays and \
sands (the dilatancy honest note); and the strength-selection craft for real \
problems.",
           ["Mohr-Coulomb Earned",
            "The Triaxial Census",
            "Effective versus Total, Honestly",
            "Clays versus Sands in Strain"]),
        ch("site-investigation", "Site Investigation",
           "Why investigate (the ground's honest price of ignorance); the \
boring census (auger, wash, rotary — with sampling by split-spoon and \
Shelby); the SPT earned (the N-value and its corrections); the CPT priced \
(the cone's honest continuous story); the plate load test; geophysical \
methods glanced (the seismic and electrical honest notes); the borelog read \
as a genre; and the investigation planning craft (stages and depth).",
           ["The Boring Census",
            "SPT Earned and Corrected",
            "CPT's Continuous Story",
            "The Borelog as Genre"]),
        ch("earth-pressure-and-slope-stability", "Earth Pressure and Slope Stability",
           "The retaining-wall problem stated; Rankine's theory earned (the \
active-and-passive honest split); Coulomb's wedge craft and the wall-friction \
honest note; surcharge, water and the layered honest notes; the stability \
census for slopes — infinite slopes (the seepage-parallel honest note) and \
finite slopes by the method of slices (Bishop's simplified method earned, \
the FOS arithmetic); and the stabilisation census glanced.",
           ["Rankine Earned",
            "Coulomb's Wedge Craft",
            "Slices and Bishop's Method",
            "The Stabilisation Census"]),
        ch("shallow-foundations", "Shallow Foundations",
           "The foundation choice census (the depth-and-load honest map); \
Terzaghi's bearing-capacity theory earned (the failure-mechanism story and \
the N-factors); Meyerhof's extensions and shape/depth/inclination factors \
priced; the water-table honest note; local shear and the sands' settlement \
limit; combined footings and rafts designed honestly; contact pressure \
(the rigidity honest note); and the settlement analysis (immediate and \
consolidation, the tolerance census).",
           ["Terzaghi Earned",
            "Meyerhof and the Factors",
            "Rafts and Contact Pressure",
            "Settlement Analysis Worked"]),
        ch("deep-foundations-and-synthesis", "Deep Foundations and the Synthesis",
           "Why piles (the shallow route's honest limits); the pile census \
(displacement versus non-displacement); the static formulae (the \
end-bearing-and-shaft arithmetic) and the dynamic formulae priced with their \
honest caution; the load test earned; the group craft (efficiency, \
the block honest note) and negative skin friction priced; lateral loading \
glanced (the subgrade-reaction craft named); the synthesis — one page from \
phase relations to foundations; and the doorsteps — Structural Engineering's \
interface, Water Resources' groundwater, the geoenvironmental future.",
           ["The Pile Census",
            "Static Formulae, Dynamic Caution",
            "Groups and Negative Friction",
            "The Synthesis and Doorsteps"]),
    ],
)

book(
    "transportationEngineering", "transportation-engineering", "Transportation Engineering",
    "the thirty-fourth book of the Engineering shelf (Civil branch)",
    "Highways, railways and airports — the geometry, materials and traffic of movement",
    "First transportation course → highway-and-airport design readiness",
    "The movement infrastructure: the transportation system census (modes, \
planning's honest hierarchy); highway geometric design I — the alignment \
craft, cross-sectional elements and the sight-distance engine (SSD and OSD \
earned); geometric design II — horizontal alignment (superelevation and its \
friction honest note, extra widening) and vertical alignment (gradients, the \
vertical-curve craft with K-values); railway track engineering (gauge, the \
speed-and-cant craft, rails, sleepers and ballast — the coning and creep \
honest notes); airport engineering (runway length and its corrections — the \
elevation, temperature and gradient arithmetic — taxiway and exit design); \
highway materials (the aggregate and bitumen test census, desirable \
properties, the bituminous-mix craft — Building Materials cross-referenced); \
flexible and rigid pavements (the design factors, the IRC methods for both, \
the joints census for concrete); traffic engineering — the study census \
(flow, speed, the peak-hour factor, accidents and the statistical analysis \
craft), the macroscopic parameters and fundamental relations, capacity and \
the level-of-service idea; traffic control — the sign census, signal design \
by Webster's method earned, the intersection census; and the systems \
synthesis. Cross-references Building Materials, Surveying (the alignment \
ground truth), Statistics (the traffic mathematics) and hands off to the \
future transport-planning homes.",
    ("#4b5563", "#1f2937"),
    "Transportation Engineering owns the movement infrastructure (GATE CE S6). \
Surveying owns the ground truth its alignments consume; Building Materials owns \
the material science of its aggregates and bitumens; Geotechnical owns the \
subgrade and embankment story; the Mathematics shelf's Statistics owns the \
accident-analysis mathematics; the urban-transport-planning depth is a future \
book (honestly named).",
    """- GATE 2026 CE Section 6 'Transportation Engineering' (CE_2026_Syllabus.pdf,
  extracted this pass): Transportation Infrastructure (geometric design of
  highways — cross-sectional elements, sight distances, horizontal and
  vertical alignments; geometric design of railway track — speed and cant;
  concept of airport runway length, calculations and corrections; taxiway and
  exit taxiway design) + Highway Pavements (highway materials — desirable
  properties and tests; desirable properties of bituminous paving mixes;
  design factors for flexible and rigid pavements; design of flexible and
  rigid pavement using IRC codes) + Traffic Engineering (traffic studies on
  flow and speed, peak hour factor, accident study, statistical analysis of
  traffic data; microscopic and macroscopic parameters of traffic flow,
  fundamental relationships; traffic signs; signal design by Webster's
  method; types of intersections; highway capacity) — the entire three-part
  section is this book's register.
- S.K. Khanna & C.E.G. Justo, Highway Engineering — the Indian canonical arc
  web-checked this pass (the organisation confirmed through the open
  listings); L.R. Kadiyali named as the second pole; the IRC census (IRC 37,
  IRC 58, IRC 73 named) noted for authoring time; the railway and airport
  chapters served by their standard Indian arcs ( Saxena & Arora named).""",
    [
        ch("the-transportation-system", "The Transportation System",
           "The mode census (road, rail, air, water — priced by their honest \
niches); the planning hierarchy named honestly (this book owns the \
infrastructure and traffic crafts; the network-planning depth is a future \
door); the highway classification census (the Indian systems named); and the \
road-user-and-vehicle honest notes that every design chapter consults.",
           ["The Mode Census Priced",
            "The Planning Hierarchy Named",
            "The Classification Census"]),
        ch("geometric-design-i", "Geometric Design I: Alignment and Sight Distance",
           "The alignment craft (the obliging-and-rejecting honest notes, \
Surverying's ground truth cross-referenced); cross-sectional elements (the \
camber craft and its census, the width arithmetic, the right-of-way); \
the sight-distance engine — stopping sight distance earned (the \
perception-braking craft) and overtaking sight distance worked (the \
two-component honest note); the intermediate and headlight cases glanced; and \
the design-speed census.",
           ["Alignment Chosen Honestly",
            "Cambers and Widths Priced",
            "SSD and OSD Earned",
            "The Design-Speed Census"]),
        ch("geometric-design-ii", "Geometric Design II: The Curves and Gradients",
           "The horizontal curve — superelevation earned (the friction honest \
note and the 75% law's honest reading), its rate and the attainment craft, \
extra widening worked; the transition curve's purpose (the spiral, the shift \
arithmetic cross-referenced from Surveying); vertical alignment — the \
gradient census, the compensations named, the vertical curve designed by the \
K-value craft; and the coordination honest note (the 3D alignment).",
           ["Superelevation Earned",
            "Widening and Transition",
            "The Vertical Curve Crafted",
            "The 3D Coordination Note"]),
        ch("railway-and-airport-engineering", "Railway Track and Airport Engineering",
           "The railway track — its gauge census, the speed-and-cant craft \
(the equilibrium-and-cant-deficiency arithmetic), rails, sleepers and \
ballast priced (the coning, creep and wear honest notes), points and \
crossings glanced; airports — the runway length concept and its corrections \
(elevation, temperature, gradient — the combined arithmetic worked), the \
taxiway and exit design craft, and the airport-layout honest census.",
           ["Gauge, Cant and Deficiency",
            "Track's Census and Its Honest Notes",
            "Runway Length Corrected",
            "Taxiways and the Layout Census"]),
        ch("highway-materials", "Highway Materials",
           "The aggregate census and its tests (crushing, impact, abrasion, \
flakiness and elongation — the desirable-properties honest reading); \
bituminous materials — the test census (penetration, ductility, softening, \
flash — the bitumen-versus-tar split cross-referenced from Building \
Materials); the bituminous mix craft — gradation read, the Marshall method \
priced (the stability-flow honest reading); and the subgrade story \
(Geotechnical's CBR cross-referenced).",
           ["The Aggregate Test Census",
            "Bitumen's Tests Priced",
            "The Marshall Craft",
            "The Subgrade Cross-Reference"]),
        ch("pavement-design", "Flexible and Rigid Pavements",
           "The pavement families priced honestly (the load-distribution \
stories); design factors — traffic (the VDF and cumulative axles arithmetic), \
subgrade strength (CBR), the environment and drainage; flexible design by \
the IRC method worked (the CBR-and-traffic honest craft); rigid design by \
the IRC method (the Westergaard craft, the edge-and-corner honest notes); \
the joints census (contraction, expansion, dowels and tie bars); and the \
pavement-performance honest note (the failure census).",
           ["The Families' Load Stories",
            "The Traffic Arithmetic",
            "IRC Flexible Worked",
            "IRC Rigid and Its Joints"]),
        ch("traffic-engineering", "Traffic Engineering",
           "The traffic-study census — volume studies (the PHF earned), speed \
studies (the percentile honest craft), the origin-and-destination glance; \
accident studies and their statistical analysis (the Mathematics shelf's \
Statistics cross-referenced); the microscopic-versus-macroscopic distinction \
priced; the fundamental relations earned (flow-density-speed, the \
shock-wave craft); capacity and the level-of-service census (the highway's \
honest grading); and parking glanced.",
           ["The Study Census Worked",
            "The Fundamental Relations Earned",
            "Shock Waves Priced",
            "Capacity and LOS Graded"]),
        ch("traffic-control-and-synthesis", "Traffic Control and the Synthesis",
           "The control census — road markings and the sign census (the \
regulatory-warning-guide families); signal design by Webster's method earned \
(the cycle-and-splits arithmetic worked); the intersection census (the \
channelisation craft, the rotary honest note, the interchange glance); \
intelligent-transport systems named honestly; and the synthesis — one page \
from the mode census to the signal; the doorsteps — the urban-planning \
future, Geomatics' mapping engine, the materials partners.",
           ["The Sign Census Read",
            "Webster Earned and Worked",
            "Intersections Channelised",
            "The Synthesis and Doorsteps"]),
    ],
)

book(
    "environmentalEngineering", "environmental-engineering", "Environmental Engineering",
    "the thirty-fifth book of the Engineering shelf (Civil branch)",
    "Water, wastewater, air and solid waste — the engineered stewardship of the environment",
    "First environmental course → water-treatment and AQI readiness",
    "The stewardship discipline: the environmental frame (the water-air-waste \
triad, the standards-and-quality vocabulary, water-quality parameters and the \
water quality index); water demand and sources (per-capita demand and its \
variations, population forecasting, the surface-and-ground source census); \
water treatment — the unit-operations-and-processes idea, mixing, \
coagulation-flocculation, sedimentation, filtration (sand and the \
rapid-census), disinfection and the distribution craft; sewerage — the \
quantity of domestic wastewater, sewer design with the self-cleansing \
velocity craft; wastewater treatment — primary (screens, grit, primary \
settling), secondary (the activated-sludge craft, trickling filters, ponds), \
sludge disposal and effluent standards with reuse priced; air pollution — \
the pollutant census, sources and impacts, the control-device census, air \
quality standards and the AQI; municipal solid waste — characteristics, \
generation, collection and transport, the engineered systems (reuse, recycle, \
energy recovery, disposal); and the regulatory synthesis (the CPCB frame, \
EIA glanced, the sustainability doorstep to Renewable Energy). \
Cross-references Building Materials, Water Resources (the source partner), \
Fluid Mechanics (the flow craft) and hands off to the future chemical and \
public-health homes.",
    ("#0d9488", "#134e4a"),
    "Environmental Engineering owns the water-air-waste stewardship (GATE CE \
S5). Water Resources owns the source-and-irrigation story; Building Materials \
owns the material science it consumes; Fluid Mechanics owns the hydraulics its \
channels price; Renewable Energy owns the energy-transition partner; the \
future Chemistry shelf owns the underlying chemistry (cross-reference when \
planned).",
    """- GATE 2026 CE Section 5 'Environmental Engineering' (CE_2026_Syllabus.pdf,
  extracted this pass): 'Water and Waste Water Quality and Treatment: Basics
  of water quality standards — Physical, chemical and biological parameters;
  Water quality index; Unit processes and operations; Water requirement;
  Water distribution system; Drinking water treatment. Sewerage system design,
  quantity of domestic wastewater, primary and secondary treatment. Effluent
  discharge standards; Sludge disposal; Reuse of treated sewage for different
  applications. Air Pollution: Types of pollutants, their sources and impacts,
  air pollution control, air quality standards, Air quality Index and limits.
  Municipal Solid Wastes: Characteristics, generation, collection and
  transportation of solid wastes, engineered systems for solid waste
  management (reuse/recycle, energy recovery, treatment and disposal)' — the
  entire section is this book's register.
- S.K. Garg's Water Supply Engineering and Sewage Disposal and Air Pollution
  Engineering — the Indian canonical arcs web-checked this pass (the volume
  organisation and topic lines confirmed through the open listings); Davis &
  Cornwell's Introduction to Environmental Engineering named as the standard
  pole; Peavy named. Metcalf & Eddy named as the depth pole.""",
    [
        ch("the-environmental-frame", "The Environmental Frame",
           "The triad drawn (water, wastewater, air, waste — the cycle's honest \
map); the water-quality vocabulary — physical, chemical and biological \
parameters (each defined and priced for what it honestly measures); the water \
quality index earned (the weighted arithmetic); the standards census (IS \
10500, the effluent standards) read as law; and the public-health honest \
note that prices the whole discipline.",
           ["The Parameters Priced Honestly",
            "The WQI Earned",
            "The Standards Read as Law"]),
        ch("water-demand-and-sources", "Water Demand and Sources",
           "The per-capita demand and its variation census (the peak-day and \
peak-hour honest factors); the population-forecasting craft (arithmetic, \
geometric and the incremental-increase methods priced — the Mathematics \
shelf's statistics cross-referenced); the fire demand glanced; the source \
census — surface (intakes priced) and ground (Water Resources' well craft \
cross-referenced); and the source-versus-demand balance drawn.",
           ["Demand and Its Variations",
            "Population Forecasted by Three Crafts",
            "The Source Census"]),
        ch("water-treatment", "Water Treatment",
           "The treatment train drawn (the unit-operations-and-processes idea \
GATE names); aeration and mixing; coagulation-flocculation earned (the \
colloid honest note, the jar test as law); sedimentation designed (the \
overflow-rate craft, the basin census); filtration — the slow-and-rapid sand \
census (the filter's own honest story), the pressure variants; disinfection \
(the chlorine chemistry and its residual arithmetic, the alternatives \
priced); and the distribution system (the layouts, the pressure-and-storage \
craft, the appurtenance census).",
           ["The Train Drawn",
            "The Jar Test as Law",
            "Sedimentation and Filtration Designed",
            "Disinfection and Distribution"]),
        ch("sewerage", "Sewerage",
           "The sewerage idea (the separate-versus-combined honest choice); \
the quantity of domestic wastewater (the per-capita and infiltration census); \
sewer design — the self-cleansing velocity earned (the tractive-craft note), \
the sewer's hydraulic design (Fluid Mechanics cross-referenced), the sewage \
pumping census; the ventilation-and-manhole honest notes; and the storm-water \
glance (the rational method priced, Water Resources cross-referenced).",
           ["Separate versus Combined, Honestly",
            "Self-Cleansing Earned",
            "Sewers Designed",
            "Storm-Water Glanced"]),
        ch("wastewater-treatment", "Wastewater Treatment",
           "The treatment stages priced in order — preliminary (screens, grit), \
primary (the settling craft); secondary — the activated-sludge process earned \
(F/M, MLSS, the SRT honest arithmetic), trickling filters, oxidation ponds and \
the rotating-contact glance; the secondary settling craft; tertiary and \
advanced glanced (nutrient removal named); sludge — digestion (the anaerobic \
craft), drying and disposal; the effluent standards and disposal routes \
(stream-assimilation honest note); and reuse priced for its honest \
applications.",
           ["The Stages Priced in Order",
            "Activated Sludge Earned",
            "Digestion and Sludge Disposal",
            "Standards, Disposal, Reuse"]),
        ch("air-pollution", "Air Pollution",
           "The pollutant census (the criteria pollutants, each priced by \
source-and-impact); the source census (stationary and mobile); the \
meteorological honest note (the dispersion story glanced); the control-device \
census — the particulate family (gravitational, cyclone, ESP, the fabric \
filter) and the gaseous family (absorption, adsorption, incineration) priced; \
the air-quality standards and the AQI earned (the sub-index craft); the \
sampling census glanced; and the indoor honest note.",
           ["The Criteria Pollutants Priced",
            "The Control-Device Census",
            "The AQI Earned",
            "The Indoor Honest Note"]),
        ch("municipal-solid-waste", "Municipal Solid Waste",
           "The MSW census — characteristics (the physical-chemical honest \
notes), generation (the per-capita arithmetic and its drivers), the \
composition census; collection and transport (the route craft priced); \
the engineered systems GATE names — reuse and recycling (the material- \
recovery honest note), energy recovery (the incineration and the \
biogas-thermal routes priced), treatment (composting earned) and disposal \
(the sanitary-landfill craft — the site, liner and leachate story); and the \
plastic-and-e-waste honest notes.",
           ["The MSW Census Read",
            "Collection Routes Priced",
            "Recovery and Composting Earned",
            "The Sanitary Landfill Craft"]),
        ch("regulatory-synthesis-and-doorstep", "The Regulatory Synthesis and the Doorstep",
           "The regulatory frame (the CPCB-and-SPCB census, the Water and Air \
Acts named); EIA glanced honestly (the process census); the sustainability \
doorstep — Renewable Energy's transition cross-referenced, the \
circular-economy honest note; the synthesis — one page from parameter to \
engineered system; and the future doors named (the public-health and \
chemical-engineering homes).",
           ["The Regulatory Frame Read",
            "EIA Glanced Honestly",
            "The Synthesis Page",
            "The Future Doors Named"]),
    ],
)

book(
    "hydraulics", "hydraulics", "Hydraulics",
    "the thirty-sixth book of the Engineering shelf (Civil branch)",
    "Water at work — measurement, similitude, open channels and the hydraulic machines",
    "First applied-hydraulics course → water-resources and turbomachinery readiness",
    "Water as the working fluid (the applied civil craft, with the \
fundamentals owned by the mechanical shelf's Fluid Mechanics, \
cross-referenced): flow measurement in pipes and channels — orifices, \
mouthpieces, notches and weirs, the Venturi and nozzle meters, each earned \
and priced; forces on immersed bodies and the momentum analysis of fluid \
jets (the vanes craft); dimensional analysis and hydraulic similitude at the \
model-testing scale (Buckingham and the model laws — Fluid Mechanics' \
chapter cross-referenced, the civil model-census priced); open-channel flow \
I — uniform flow (Chezy and Manning earned, the most-economical section \
craft, the conveyance reading); open-channel flow II — specific energy and \
critical flow (the Froude honest engine, the control-section craft); \
the hydraulic jump earned (its types and location, the energy-loss \
arithmetic) and gradually-varied flow (the water-surface profiles classified \
and drawn, the GVF-integration craft); the machines — hydraulic turbines \
(Impulse and reaction principles, Pelton, Francis and Kaplan with velocity \
triangles, specific speed and the cavitation honest note — the GATE ME \
turbomachinery line served) and pumps (the centrifugal craft — heads, \
efficiency, NPSH and priming; the reciprocating census; the system-and- \
operating-point arithmetic); and the engineering synthesis with the \
Water Resources doorstep. Cross-references Fluid Mechanics (the \
fundamentals), Water Resources (the irrigation-and-structures consumer), \
Thermodynamics (the steam-turbine partner) and hands off to Renewable \
Energy's small-hydro.",
    ("#0e7490", "#164e63"),
    "Hydraulics owns the applied water craft for the civil shelf — \
measurement, similitude at civil scale, open-channel flow and the hydraulic \
machines (GATE CE S4's Hydraulics line + GATE ME S3's Turbomachinery line's \
hydraulic half). Fluid Mechanics (mechanical) owns the fundamentals \
(statics through compressible flow, the boundary layer, the external-flow \
drag); Water Resources owns the irrigation-and-structures consumer story; \
Thermodynamics owns steam-and-gas turbines; Renewable Energy's small-hydro \
routes here.",
    """- GATE 2026 CE Section 4's 'Hydraulics' line (CE_2026_Syllabus.pdf,
  extracted this pass): 'Forces on immersed bodies; Flow measurement in
  channels and pipes; Dimensional analysis and hydraulic similitude; Channel
  Hydraulics — Energy-depth relationships, specific energy, critical flow,
  hydraulic jump, uniform flow, gradually varied flow and water surface
  profiles' — the entire line is this book's register, with GATE ME S3's
  'Turbomachinery: Impulse and reaction principles, velocity diagrams,
  Pelton-wheel, Francis and Kaplan turbines' served by the machines chapters.
- Modi & Sethi's Hydraulics and Fluid Mechanics (including Hydraulic Machines)
  — the Indian canonical arc web-checked this pass (the 21st-edition contents
  confirmed: Properties of Fluids, Fluid Pressure and Its Measurement, the
  29-chapter organisation across Fluid Mechanics, Hydraulics and Hydraulic
  Machines — the machine chapters routed here, the fundamentals to Fluid
  Mechanics); Bansal's Fluid Mechanics and Hydraulic Machines named as the
  second pole; Chow's Open-Channel Hydraulics named as the depth pole.""",
    [
        ch("the-hydraulics-viewpoint", "The Hydraulics Viewpoint",
           "What changes when water is the working fluid (the civil honest \
note — the craft's applied census); the contract stated plainly — the \
fundamentals (fluid statics, the control-volume engine, viscous flow, the \
boundary layer) live on the mechanical shelf's Fluid Mechanics, \
cross-referenced; this book owns measurement, similitude, channels and \
machines; and the water-cycle map drawn with Water Resources.",
           ["The Applied Census Named",
            "The Contract Stated Plainly",
            "The Water-Cycle Map"]),
        ch("flow-measurement", "Flow Measurement",
           "The measurement census on one page; orifices and mouthpieces \
(Cc, Cv, Cd earned and priced — the jet honest notes); the Venturi and \
nozzle meters with the flow-coefficient honest note; notches and weirs — \
rectangular and triangular (the Francis and King honest formulas), the \
V-notch craft; the channel-gauging census (the current-meter craft, the \
stage-discharge honest relation); and the measurement-selection craft.",
           ["Cd Earned on the Orifice",
            "Venturi and Nozzle Priced",
            "Weirs and the V-Notch Craft",
            "Channel Gauging and Rating"]),
        ch("forces-on-immersed-bodies", "Forces on Immersed Bodies and the Jet Craft",
           "The momentum engine cashed (Fluid Mechanics cross-referenced); \
forces on flat and curved plates — the jet craft worked (stationary and \
moving, the series honesty); forces on bends and pipe-junctions priced; drag \
and lift at civil scale (the immersed-body census GATE CE names — the \
boundary-layer cross-reference); and the impact honest notes priced on real \
hydraulic structures.",
           ["The Jet Craft Worked",
            "Bends and Junctions Priced",
            "Drag at Civil Scale",
            "The Structure-Impact Notes"]),
        ch("similitude-at-civil-scale", "Dimensional Analysis and Hydraulic Similitude",
           "Dimensional analysis at the model-testing scale (Buckingham's \
craft cross-referenced; the civil group census — Froude's reign on free- \
surface models); the model laws priced (Reynolds for the closed conduits, \
Froude for the channels and weirs, the Weber-and-Mach honest notes); the \
distorted-and-warped honest note for rivers; and the model-census priced on \
real civil works (the spillway model told honestly).",
           ["The Model Laws Priced",
            "Froude's Reign Named",
            "Distortion for Rivers",
            "The Spillway Model Told"]),
        ch("open-channel-flow-i", "Open-Channel Flow I: Uniform Flow",
           "The open-channel idea (the free-surface honest note); uniform \
flow — Chezy and Manning earned (the roughness census priced honestly); \
conveyance and the section factor; the most-economical section craft (the \
rectangular, trapezoidal and circular-honest censuses); the computation \
census (the normal-depth craft worked both ways); and the prismatic-and- \
nonprismatic honest notes.",
           ["Chezy and Manning Earned",
            "The Most-Economical Craft",
            "Normal Depth Computed",
            "The Geometry Honest Notes"]),
        ch("open-channel-flow-ii", "Open-Channel Flow II: Specific Energy and Critical Flow",
           "The specific-energy idea earned (the diagram drawn and read); \
critical depth and critical flow (the rectangular craft and the general \
honest method); the Froude number as the regime compass; the control-section \
craft (where the flow decides); channel transitions priced (the hump and the \
width-constriction honest classics); and the choked-flow honest note.",
           ["The Diagram Drawn and Read",
            "Critical Depth Earned",
            "Controls and Transitions Worked",
            "The Choked-Flow Note"]),
        ch("jump-and-gvf", "The Hydraulic Jump and Gradually-Varied Flow",
           "The hydraulic jump earned (the momentum equation's honest engine); \
its types classified (the Froude census) and its location determined (the \
pre-and-post-jump craft); the energy-loss arithmetic worked; the jump's \
uses priced (the stilling-basin census); gradually-varied flow — the \
differential equation read, the water-surface profiles classified (M, S, C, \
H, A — the families drawn), the GVF-integration craft (the direct-step \
method worked); and the profile-plotting honest craft on real channels.",
           ["The Jump Earned by Momentum",
            "Types, Location, Losses",
            "Stilling Basins Priced",
            "The Profile Families Drawn"]),
        ch("hydraulic-turbines", "Hydraulic Turbines",
           "The turbomachinery principle cashed (the impulse-versus-reaction \
honest split, the Euler engine cross-referenced from Fluid Mechanics); \
Pelton — the velocity triangles and the bucket craft (the jet ratio honest \
note); Francis and Kaplan — their triangles and the draft-tube craft (its \
honest cavette note); specific speed as the selection compass; the turbine \
census table priced (the GATE ME line served); the governing craft glanced; \
and the cavitation and Thoma honest notes.",
           ["Impulse versus Reaction Cashed",
            "Pelton, Francis, Kaplan Worked",
            "The Specific-Speed Compass",
            "Cavitation Priced Honestly"]),
        ch("pumps-and-synthesis", "Pumps and the Engineering Synthesis",
           "The centrifugal pump earned (the head-and-efficiency craft, the \
velocity triangle at the impeller); NPSH and cavitation priced; priming and \
the starting craft; the pump's characteristic and the system curve — the \
operating point worked (series-and-parallel honest notes); the \
reciprocating census (the slip-and-indicator craft); the water-resources \
doorstep (the lift-irrigation and pumping stations priced); and the \
synthesis — one page from the measuring weir to the pumped main.",
           ["The Centrifugal Earned",
            "NPSH and the Operating Point",
            "The Reciprocating Census",
            "The Synthesis and Doorstep"]),
    ],
)

book(
    "waterResourcesEngineering", "water-resources-engineering", "Water Resources Engineering",
    "the thirty-seventh book of the Engineering shelf (Civil branch)",
    "The water cycle engineered — hydrology, irrigation and the hydraulic works that manage it",
    "First water-resources course → reservoir-and-irrigation design readiness",
    "The water cycle as an engineered ledger: the worldview (the hydrologic \
cycle as the book's map, the water-demand honest census); precipitation — \
its measurement (the gauge census and network design), the areal-arithmetic \
crafts and the intensity-honest reading; abstractions and runoff — \
evaporation and evapo-transpiration (the measurement and estimation \
censuses), infiltration (the indices priced), the watershed and the \
runoff-generation story; hydrographs — the unit hydrograph earned (the \
convolution honest note), base-flow separation, the S-curve craft and the \
hydrograph-analysis census; floods and reservoirs — the flood-estimation \
census (the frequency craft cross-referenced to Statistics), routing (the \
Muskingum craft), the reservoir-capacity arithmetic and the sediment honest \
note; groundwater — aquifers and their properties, the steady well-hydraulics \
craft (the Theis honest note named) and Darcy's law cashed (Geotechnical's \
permeability cross-referenced); irrigation — the systems-and-methods census, \
crop water requirements (duty, delta, the consumptive-use honest note), \
canals (the lined-and-unlined craft, the Kennedy-and-Lacey regimes priced) \
and the cross-drainage census; the hydraulic structures — gravity dams and \
spillways (the stability craft and the spillway census), weirs on permeable \
foundations (Khosla's theory earned with Geotechnical's piping \
cross-referenced), barrages and canal-head works glanced; and the management \
synthesis. Cross-references Hydraulics (the channel-and-machine craft), \
Environmental Engineering (the quality partner), Geotechnical (the \
foundation-and-seepage truth) and hands off to Renewable Energy's hydro.",
    ("#2563eb", "#1e40af"),
    "Water Resources Engineering owns the hydrology-and-irrigation story (GATE \
CE S4's Hydrology + Irrigation lines). Hydraulics owns the channel flow and \
machinery craft; Environmental Engineering owns the quality side; Geotechnical \
owns the soil-and-seepage machinery; Surveying owns the catchment truth; \
Renewable Energy owns the small-hydro generation view; the river-engineering \
depth is a future book (honestly named).",
    """- GATE 2026 CE Section 4's 'Hydrology' + 'Irrigation' lines
  (CE_2026_Syllabus.pdf, extracted this pass): 'Hydrologic cycle, precipitation,
  evaporation, evapo-transpiration, watershed, infiltration, unit hydrographs,
  hydrograph analysis, reservoir capacity, flood estimation and routing,
  surface run-off models, ground water hydrology — steady state well
  hydraulics and aquifers; Application of Darcy's Law. Irrigation: Types of
  irrigation systems and methods; Crop water requirements — Duty, delta,
  evapo-transpiration; Gravity Dams and Spillways; Lined and unlined canals,
  Design of weirs on permeable foundation; cross drainage structures' — both
  lines are this book's register.
- K. Subramanya's Engineering Hydrology — the Indian canonical arc
  web-checked this pass; S.K. Garg's Irrigation Engineering and Hydraulics
  Structures named as the structures pole (the volume organisation confirmed
  through the open listings); Linsley's Hydrology named as the standard pole;
  Punmia's Irrigation named.""",
    [
        ch("the-water-cycle-ledger", "The Water Cycle as Ledger",
           "The hydrologic cycle drawn as an engineered ledger (the \
storage-and-flux honest census); the water-demand map (the sectors priced, \
the Indian honest note); the planning worldview (the single-purpose versus \
multipurpose honest history); and the book's map — precipitation to works.",
           ["The Ledger Drawn",
            "The Demand Map Priced",
            "The Multipurpose Honest Note"]),
        ch("precipitation", "Precipitation",
           "The precipitation physics glanced honestly; measurement — the \
gauge census (the recording families priced), the network design craft (the \
density honest note); the areal arithmetic (the arithmetic-mean, Theissen \
and the isohyetal crafts priced against each other); the intensity census \
(the IDH honest note) and its design use; and the double-mass honest check.",
           ["The Gauge Census",
            "The Areal Crafts Priced",
            "Intensity and the IDH",
            "The Double-Mass Check"]),
        ch("abstractions-and-runoff", "Abstractions and Runoff",
           "The abstraction census on one page; evaporation and \
evapo-transpiration — the measurement and estimation censuses (the pan craft \
and the Penman-Monteith honest note); infiltration (Horton's craft, the \
indices priced); the watershed idea (its delineation, Surveying \
cross-referenced); the runoff-generation honest story (the \
infiltration-versus-saturation views); and the runoff coefficients and \
rational craft priced.",
           ["Evapo-Transpiration Estimated",
            "Infiltration and Its Indices",
            "The Watershed Delineated",
            "Runoff's Honest Story"]),
        ch("hydrographs", "Hydrographs",
           "The hydrograph read (its components named honestly); base-flow \
separation by the standard crafts; the unit hydrograph earned (its \
assumptions priced honestly); the derivation worked; the S-curve and the \
duration-conversion craft; the synthetic families (Snyder glanced); and the \
discrete-convolution honest note (the Mathematics shelf's linear-systems \
cross-reference).",
           ["The Hydrograph Read",
            "The UH Earned and Derived",
            "The S-Curve Conversion",
            "The Convolution Honest Note"]),
        ch("floods-and-reservoirs", "Floods and Reservoirs",
           "The flood-estimation census — the empirical formulas priced with \
their honest caution, the frequency analysis earned (the \
return-period-and-probability craft, Statistics cross-referenced); flood \
routing — the hydrologic craft (the Muskingum method worked); the \
reservoir-capacity arithmetic (the mass-curve craft); the sediment and the \
dead-storage honest note; and the flood-control census (the structural and \
non-structural families priced).",
           ["The Frequency Craft Earned",
            "Muskingum Worked",
            "The Mass Curve Drawn",
            "The Flood-Control Census"]),
        ch("groundwater", "Groundwater",
           "The aquifer census (confined, unconfined — the storage honest \
notes); its properties (porosity, specific yield, the permeability \
cross-reference to Geotechnical); Darcy's law cashed (its validity honest \
note); steady well hydraulics — the equilibrium craft worked for the \
confined and unconfined cases (the drawdown arithmetic); the Theis honest \
note named (the transient story glanced); the well census (their \
construction and safe-yield honest notes); and the recharge and \
over-extraction honest notes.",
           ["The Aquifer Census",
            "Darcy Cashed",
            "Steady Wells Worked",
            "Theis Named, Honestly"]),
        ch("irrigation", "Irrigation",
           "The irrigation census — systems (flow, lift, sprinkler, drip — \
priced by their honest efficiencies) and methods (the surface families); \
the crop-water requirement craft — duty, delta and their relation earned, \
the consumptive-use estimation priced; the soil-moisture honest note \
(Geotechnical cross-referenced); the canal craft — the lined-and-unlined \
design (Kennedy's and Lacey's regime theories priced honestly against the \
tractive-honest modern view, Hydraulics' Manning cross-referenced); and the \
cross-drainage census.",
           ["Systems and Methods Priced",
            "Duty and Delta Earned",
            "Canals by Kennedy and Lacey",
            "The Cross-Drainage Census"]),
        ch("hydraulic-structures", "The Hydraulic Structures",
           "The gravity dam — its forces census and the stability craft \
(the elementary profile, the drainage-and-uplift honest notes), the spillway \
census (the ogee craft, the energy-dissipation cross-reference to \
Hydraulics' stilling basins); the weir-on-permeable-foundation craft — \
Khosla's theory earned (the exit-gradient honest law, Geotechnical's piping \
cross-referenced); barrages and canal-head works glanced; and the dam-safety \
honest note stated.",
           ["The Gravity Dam's Stability",
            "The Spillway Census",
            "Khosla Earned",
            "The Dam-Safety Note"]),
        ch("management-synthesis-and-doorstep", "The Management Synthesis and the Doorstep",
           "The water-resources systems view (the multipurpose operation \
priced); the waterlogging-and-drainage honest note; the quality partner \
(Environmental Engineering cross-referenced); the policy census glanced (the \
inter-state and treaty honest notes, without politics); the synthesis — one \
page from the gauge to the gated dam; and the doorsteps — Renewable Energy's \
small hydro, the river-engineering future, Hydraulics' machines beneath the \
works.",
           ["The Systems View Priced",
            "The Waterlogging Note",
            "The Synthesis Page",
            "The Doorsteps Named"]),
    ],
)

book(
    "constructionManagement", "construction-management", "Construction Management",
    "the thirty-eighth book of the Engineering shelf (Civil branch — the branch's capstone)",
    "Projects delivered — planning, networks, costs, contracts and the site itself",
    "First construction-management course → project-engineering readiness",
    "The delivery discipline (the civil branch's capstone): the project frame \
(the construction-project census — types, stakeholders, phases and the \
project-life honest cycle); construction planning and network analysis — \
activities and their dependencies, PERT and CPM earned at construction depth \
(the event-and-activity craft, the critical path, the float census, time-cost \
trade-offs and crashing, resource levelling — with the Mathematics shelf's \
OR book owning the general theory and Industrial Engineering the production \
idiom, cross-referenced); site organisation (the layout craft, temporary \
utilities, the resources census — labour, materials, plant); the equipment \
and productivity chapter (the earthmoving census — dozers, scrapers, \
excavators, cranes — with the owning-versus-operating cost arithmetic); \
cost estimation and contracts — quantity surveying basics (the measurement \
craft), rate analysis and the estimate census, the tendering process and the \
contract families (the lump-sum, item-rate and the modern honest notes); \
quality and safety management (the QC census on site, the safety regulations \
and the accident honest ledger); modern construction management (ERP and the \
planning software census, BIM glanced — CAD/CAM cross-referenced — lean \
construction, the claim-and-dispute honest note); and the project closeout \
synthesis. Cross-references Structural Engineering (the technical partner), \
Industrial Engineering (the OR layer), Surveying (the setting-out truth) and \
hands off to the future management homes.",
    ("#d97706", "#b45309"),
    "Construction Management owns the construction-delivery craft (GATE CE \
S2's Construction Management line: 'Types of construction projects; Project \
planning and network analysis — PERT and CPM; Cost estimation'). The OR \
THEORY of networks is owned by the Mathematics shelf's Optimization and \
Operations Research (cross-referenced; no duplication — this book owns the \
construction idiom); Industrial Engineering owns the production-floor idiom; \
the future Economics-Commerce shelf owns the market side; CAD/CAM owns the \
BIM-adjacent digital tools.",
    """- GATE 2026 CE Section 2's Construction Management line
  (CE_2026_Syllabus.pdf, extracted this pass): 'Types of construction
  projects; Project planning and network analysis — PERT and CPM; Cost
  estimation' — this book's register (the solid-mechanics lines of S2 route
  to Structural Engineering).
- Chitkara's Construction Project Management — the Indian canonical arc
  web-checked this pass; Punmia's Project Planning and Control with PERT and
  CPM named as the network pole (the GATE-arithmetic classic); Peurifoy's
  Construction Planning, Equipment and Methods named as the international
  pole; Harris named. The IS and contract-document census noted for
  authoring time.""",
    [
        ch("the-project-frame", "The Project Frame",
           "The construction-project census (by type, size and delivery route \
— the DBB-and-EPC honest families); the stakeholder map (the owner, \
consultant, contractor triangle priced); the project phases (initiation to \
handover) with the gate honest notes; the project manager's craft stated; \
and the Indian industry honest note (the sector's scale and its informality, \
priced without romance).",
           ["The Delivery Census",
            "The Stakeholder Triangle",
            "The Phases and Their Gates",
            "The Industry Honest Note"]),
        ch("planning-and-networks", "Construction Planning and Network Analysis",
           "The planning craft (the WBS and the activity census); the network \
drawn (the activity-on-node discipline, the dependencies honest census); \
CPM earned — the critical path computed, the float census priced (total, \
free, independent — their honest differences); PERT earned — the \
three-time estimate and the probability craft (Statistics cross-referenced); \
time-cost trade-offs and crashing worked; resource levelling and the \
resource-histogram craft; and the software census glanced (the modern tools \
named, the Mathematics shelf's OR theory cross-referenced for the \
general engine).",
           ["The Network Drawn Honestly",
            "CPM and the Float Census",
            "PERT and Its Probability",
            "Crashing and Levelling Worked"]),
        ch("site-organisation", "Site Organisation and Resources",
           "The site-layout craft (the honest principles — the proximity, \
safety and expansion notes); temporary utilities priced (water, power, the \
welfare census); the labour census (the trades, the productivity honest \
arithmetic, the statutory notes); materials management (the procurement \
chain, the store craft, the waste honest note); and the site-communication \
honest map.",
           ["The Layout Craft's Principles",
            "Labour and Its Productivity",
            "Materials Managed Honestly",
            "The Communication Map"]),
        ch("equipment-and-productivity", "Construction Equipment and Productivity",
           "The equipment census priced by earthmoving families (dozers, \
scrapers, excavators, loaders — their cycle-and-output arithmetic); hauling \
(the truck-and-dumper match craft); cranes (their types and the \
load-radius honest chart); compaction and concreting plant glanced; the \
owning-and-operating cost arithmetic earned (the depreciation, interest, \
tyre-and-repair census — the Economic-wise honest note); and the \
buy-versus-rent honest verdict.",
           ["The Earthmoving Arithmetic",
            "Cranes and Their Charts",
            "Owning versus Operating Cost",
            "The Buy-versus-Rent Verdict"]),
        ch("cost-estimation-and-contracts", "Cost Estimation and Contracts",
           "The quantity-surveying craft (the measurement rules honestly \
priced); rate analysis earned (the labour-material-plant build-up); the \
estimate census (the preliminary through the detailed honest families); the \
tendering process (the notice, the bid honest discipline, the evaluation \
craft); the contract families priced (lump-sum, item-rate, cost-plus — \
their risk honest notes); the contract document read as a genre (the \
conditions of contract, the IS-and-FIDIC census); and variations-and-claims \
glanced honestly.",
           ["Rates Built Up Honestly",
            "The Estimate Census",
            "Tendering and Its Discipline",
            "The Contract Families Priced"]),
        ch("quality-and-safety", "Quality and Safety Management",
           "The site-QC census (the inspection-and-test plan, the materials' \
cross-reference to Building Materials, the documentation craft); quality \
systems glanced (the ISO family named); safety — the hazard census priced \
(the excavation, scaffold, lifting and electrical honest families), the \
safety regulations read as law, the accident ledger and its honest \
arithmetic; and the welfare-and-environment site notes.",
           ["The ITP Craft",
            "The Hazard Families Priced",
            "The Accident Ledger Read",
            "The Welfare Notes"]),
        ch("modern-construction-management", "Modern Construction Management",
           "The digital census — ERP and the planning software families, BIM \
glanced honestly (its dimensions named, CAD/CAM's digital-chain \
cross-referenced, the Indian adoption honest note); lean construction \
(the waste census cross-referenced to Industrial Engineering's lean); the \
claim-and-dispute honest machinery (the arbitration glance); and the \
project-controls craft (the earned-value arithmetic earned — the honest \
triangle of scope-time-cost).",
           ["BIM Glanced Honestly",
            "Lean on Site",
            "Disputes' Machinery",
            "The Earned-Value Craft Earned"]),
        ch("closeout-synthesis-and-doorstep", "Closeout, Synthesis and the Doorstep",
           "The closeout census (the commissioning craft, the as-built \
honest note, the defects-liability period, the final account); the \
maintenance glance; the synthesis — one page from the project frame to the \
handover key; the civil branch's map (the nine books' honest census); and \
the doorsteps — the future management and economics homes, the digital \
thread, the engineering profession's honest responsibilities.",
           ["The Closeout Census",
            "The Synthesis Page",
            "The Civil Branch's Map",
            "The Doorsteps Named"]),
    ],
)
# ======================================================================
# EMITTER — writes src/data/library/books/engineering/<slug>/book.ts
# ======================================================================

def norm(s):
    """Collapse whitespace; ASCII apostrophes -> typographic (house style)."""
    s = " ".join(s.split())
    return s.replace("'", "\u2019")


def ts_str(s):
    """Emit a single-quoted TS string with \\u2019 escapes, house style."""
    return "'" + norm(s).replace("\u2019", "\\u2019") + "'"


TEMPLATE = """import type {{ Book, Chapter }} from '../../../types'

/**
 * {title} — {shelf_note}.
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — {nch} chapters /
 * {npl} planned lessons, zero written. Lesson ids will use the `{prefix}-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): {positioning}
 *
 * RESEARCH PHASE (2026-11-16):
{research}
 */
const chapters: Chapter[] = [
{chapters_ts}
]

export const {export}: Book = {{
  id: '{bid}',
  title: '{title}',
  subtitle: {subtitle},
  discipline: 'engineering',
  level: {level},
  description: {description},
  status: 'planned',
  accent: ['{c1}', '{c2}'],
  chapters,
}}
"""


def emit_chapter(c, i):
    lessons = ",\n".join("      " + ts_str(t) for t in c["lessons"])
    return (
        "  {\n"
        f"    number: {i},\n"
        f"    slug: '{c['slug']}',\n"
        f"    title: {ts_str(c['title'])},\n"
        f"    summary:\n      {ts_str(c['summary'])},\n"
        "    status: 'planned',\n"
        "    lessons: [],\n"
        "    plannedLessons: [\n"
        f"{lessons},\n"
        "    ],\n"
        "  },"
    )


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    tot_ch = tot_pl = 0
    print(f"gen_engineering_shelf.py — emitting {len(BOOKS)} book plans")
    for b in BOOKS:
        d = os.path.join(OUT_DIR, b["bid"])
        os.makedirs(d, exist_ok=True)
        nch = len(b["chapters"])
        npl = sum(len(c["lessons"]) for c in b["chapters"])
        tot_ch += nch
        tot_pl += npl
        # per-book prefix: derived from the reserved prefix table below
        prefix = PREFIXES[b["bid"]]
        chapters_ts = "\n".join(emit_chapter(c, i + 1)
                                 for i, c in enumerate(b["chapters"]))
        research = "\n".join(
            " * " + line.rstrip() if line.strip() else " *"
            for line in norm(b["research"]).split(" * ")
        ) if " * " in norm(b["research"]) else norm(b["research"])
        # research notes: keep their bullet structure on separate lines
        research_lines = []
        for line in b["research"].strip().splitlines():
            research_lines.append(" * " + line.rstrip())
        research = "\n".join(research_lines)
        payload = TEMPLATE.format(
            title=b["title"].replace("'", "\u2019"),
            shelf_note=norm(b["shelf_note"]),
            nch=nch, npl=npl, prefix=prefix,
            positioning=norm(b["positioning"]),
            research=research,
            chapters_ts=chapters_ts,
            export=b["export"], bid=b["bid"],
            subtitle=ts_str(b["subtitle"]),
            level=ts_str(b["level"]),
            description=ts_str(b["description"]),
            c1=b["accent"][0], c2=b["accent"][1],
        )
        path = os.path.join(d, "book.ts")
        with open(path, "w", encoding="utf-8") as f:
            f.write(payload)
        print(f"  {b['bid'].ljust(40)} {nch} ch / {npl} planned  ({prefix}-)")
    print(f"TOTAL: {len(BOOKS)} books, {tot_ch} chapters, {tot_pl} planned lessons")


# reserved lesson-id prefixes (verified unused across all written lesson ids,
# and distinct from every mathematics and CS shelf prefix)
PREFIXES = {
    "engineering-mechanics": "mech", "strength-of-materials": "som",
    "theory-of-machines": "tom", "machine-design": "md",
    "thermodynamics": "therm", "fluid-mechanics": "fluid",
    "heat-transfer": "ht", "manufacturing-processes": "mfg",
    "industrial-engineering": "ie", "robotics-and-automation": "robot",
    "cad-cam": "cad", "materials-science": "mats",
    "circuit-theory-and-network-analysis": "ckt", "electrical-machines": "emach",
    "power-systems": "ps", "control-systems": "ctrl",
    "power-electronics": "pe", "electrical-measurements": "meas",
    "high-voltage-engineering": "hv", "renewable-energy": "ren",
    "electromagnetic-fields-and-waves": "emf", "electronic-devices-and-circuits": "edc",
    "analog-electronics": "ae", "signals-and-systems": "sig",
    "analog-and-digital-communication": "comm", "vlsi-design": "vlsi",
    "embedded-systems": "emb", "antennas-and-wave-propagation": "ant",
    "digital-signal-processing": "dsp",
    "structural-engineering": "str", "surveying-and-geomatics": "surv",
    "building-materials": "bmat", "geotechnical-engineering": "soil",
    "transportation-engineering": "trans", "environmental-engineering": "env",
    "hydraulics": "hyd", "water-resources-engineering": "wr",
    "construction-management": "cm",
}

if __name__ == "__main__":
    main()
