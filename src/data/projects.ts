export interface ProjectData {
  id: string;
  title: string;
  category: string;
  heroTitleLines: string[];
  heroHighlight: string;
  heroVideo?: string;
  heroImage?: string;
  middleVideo?: string;
  contentTitle: string;
  contentParagraphs: string[];
  contentList?: {
    title: string;
    items: { title: string; description: string }[];
  };
  info: {
    location: string;
    year: string;
    client: string;
    scale: string;
    role?: string;
    deliveryPartner?: string;
    mainContractor?: string;
    procurement?: string;
  };
  gallery: string[];
  process: {
    title: string;
    description: string;
  };
  materials: { id: string; name: string }[];
}

export const projects: ProjectData[] = [
  {
    id: "christway-college",
    title: "Christway College Wyndham Gymnasium",
    category: "Educational Architecture",
    heroTitleLines: ["Christway", "College"],
    heroHighlight: "Gymnasium",
    heroVideo: "https://res.cloudinary.com/dphq33wah/video/upload/v1774334166/openart-20a0f4887e3c433438cad85aaa91ffb2-861f9df6-0369-4d96-8cfc-2b7c2a6dd118_1774318091014_60629214_pyxrxr.mp4",
    heroImage: "https://res.cloudinary.com/dphq33wah/image/upload/v1774306131/Generated_Image_January_26_2026_-_3_00PM_x4grbl.jpg",
    middleVideo: "https://res.cloudinary.com/dphq33wah/video/upload/v1774317517/openart-7de77d38923e7abafdc54a9eb30b49aa-c88731e9-726d-4700-be8b-d433b5acf883_1774307092807_39f2532a_u2basp.mp4",
    contentTitle: "Campus Masterplan & Gymnasium Addition",
    contentParagraphs: [],
    contentList: {
      title: "Project Strategy & Execution",
      items: [
        { title: "Masterplanning & Infrastructure Strategy", description: "The masterplan for the Wyndham Vale campus is structured around staged growth — sequenced carefully so that early decisions don't constrain future ones. A central priority was resolving site services routing from the outset, establishing the infrastructure backbone once so that each subsequent building phase can connect without costly rework. The plan integrates a new campus oval into the broader spatial framework and charts precisely how future buildings will plug into existing services. On the civil and utilities front, the practice coordinated major power and water upgrades with Powercor and Greater Western Water, including connection to the local grey water network. Negotiations with Melbourne Water over stormwater infrastructure contributions were also led by the practice, resulting in a materially reduced financial contribution for the client." },
        { title: "Statutory Planning & Funding", description: "The statutory process was managed through the Department of Transport and Planning. The site was originally mapped within a Bushfire Prone Area (BPA), a designation that would have significantly restricted its development potential. Working with bushfire consultant Terramatrix, the practice successfully had the BPA requirement excised from the title entirely. In parallel, the architectural scheme was packaged to support a Block Grant Authority (BGA) funding application through Independent Schools Victoria (ISV) — a process that involved presenting the design directly to VISBGA representatives on site and responding to detailed technical scrutiny to secure the grant." },
        { title: "Gymnasium Addition", description: "The centrepiece of the current phase is a new Gymnasium, taken by the practice from concept design through full documentation and tendering. Delivery required close coordination across a specialist consultant team comprising Adams Engineering (structure), BRT (services), DDEG (fire engineering), Adapt (building surveying), Marshall Day (acoustics), and Platylobium (landscape architecture). Construction is currently underway under an ABIC MW contract with Magellan Projects, with nominated subcontractors Protection Pacific (security) and Newscom (AV and IT infrastructure) engaged as part of the broader delivery team." },
        { title: "Stakeholder Engagement & Value Engineering", description: "Developing the brief involved direct engagement not only with the executive principal, campus principal, and church representatives, but with the IT manager and on-site building manager — ensuring the design responded to how the school actually operates day-to-day. Prior to going to market, the documentation was put through a rigorous value-engineering process, scrutinising the cost efficiency of each element from both a planning and design perspective and incorporating targeted tender options. The result was a tender outcome that met — and exceeded — the project's budget expectations." }
      ]
    },
    info: {
      location: "Wyndham Vale,\nVictoria",
      year: "2023 - 2026",
      client: "Christian Resource\nMinistries\nIncorporated",
      scale: "3,400 sqm",
      role: "Lead Architect",
      mainContractor: "Magellan Projects",
      procurement: "ABIC MW Lump Sum Contract"
    },
    gallery: [
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774306133/Generated_Image_January_26_2026_-_2_19PM_oq9dje.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774306118/Generated_Image_January_26_2026_-_1_53PM_zxavwc.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774306117/Generated_Image_January_26_2026_-_1_49PM_obd90r.jpg"
    ],
    process: {
      title: "Structural Integrity",
      description: "The use of pre-cast concrete panels allowed for a rapid construction timeline while providing the thermal mass required for energy efficiency. Every joint is exposed, celebrating the honesty of the construction process."
    },
    materials: [
      { id: "01", name: "Exposed Aggregate" },
      { id: "02", name: "Blackened Steel" },
      { id: "03", name: "Spotted Gum" },
      { id: "04", name: "Acoustic Felt" }
    ]
  },
  {
    id: "christway-college-kingston-renewal",
    title: "Christway College Kingston Renewal",
    category: "Educational Architecture",
    heroTitleLines: ["Christway", "College"],
    heroHighlight: "Kingston Renewal",
    heroVideo: "https://res.cloudinary.com/dphq33wah/video/upload/v1774335610/openart-935650958abf3cb505849d90680482b0-4ee687e0-5186-4732-93cd-b7b45b3d36b1_1774334889894_1f78392e_k48piz.mp4",
    middleVideo: "https://res.cloudinary.com/dphq33wah/video/upload/v1774335642/openart-3fb46ae517a397966cf43b56108559e0-4a15699c-9d16-4ca3-9e2b-981ef2b1795e_1774335578370_3006426b_xzeeys.mp4",
    contentTitle: "Campus Renewal & Masterplan",
    contentParagraphs: [
      "Christway College Kingston is an ongoing engagement operating across two parallel tracks: a strategic masterplan to guide the long-term physical growth of the campus, and a targeted renewal program to optimise existing building assets, increase student capacity, and improve day-to-day functionality."
    ],
    contentList: {
      title: "Project Strategy & Interventions",
      items: [
        { title: "Campus Masterplanning & Expansion", description: "The broader masterplan establishes how the campus will grow and integrate with its surroundings over time. A key component is the incorporation of an adjoining lot into the educational precinct, which involves strategising the relocation of the existing church to a new, purpose-built facility on site. This phase requires careful management of the statutory planning process alongside the mapping of site services infrastructure to support the school's long-term operational needs." },
        { title: "Renewal & Adaptive Reuse", description: "Rather than defaulting to new construction, the practice undertook a careful audit of the existing campus to identify underutilised spaces with unrealised potential. Key interventions to date include the technical refurbishment of the music spaces and the adaptive reuse of a former church function hall — reimagined as a suite of new teaching rooms and active collaboration spaces. These works were delivered under an AS4902 Design and Construct contract in close collaboration with OneForOne Construction." },
        { title: "Material Palette & Pattern Book", description: "To ensure design consistency as the campus continues to evolve incrementally, the practice developed a comprehensive material palette and pattern book. More than a static reference document, it serves as a practical framework for the school's facilities team — establishing clear guidance for progressive upgrades such as floor finish standardisation, and providing a considered baseline for future furniture selection across the campus." }
      ]
    },
    info: {
      location: "Kingston,\nVictoria",
      year: "Ongoing",
      client: "Christway College",
      scale: "Campus Masterplan",
      role: "Lead Architect",
      deliveryPartner: "OneForOne Construction",
      procurement: "AS4902 Design and Construct"
    },
    gallery: [
      "https://res.cloudinary.com/dphq33wah/image/upload/v1775001490/Generated_Image_April_01_2026_-_10_56AM_meoaqn.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1775002275/Generated_Image_April_01_2026_-_11_07AM_zzoxoh.jpg"
    ],
    process: {
      title: "Material Honesty",
      description: "By leaving the concrete raw and exposed both internally and externally, the building reveals its construction method. The formwork ties and pour lines become the ornamentation of the space."
    },
    materials: [
      { id: "01", name: "In-Situ Concrete" },
      { id: "02", name: "Anodized Aluminum" },
      { id: "03", name: "Oak Flooring" },
      { id: "04", name: "Linen Drapery" }
    ]
  },
  {
    id: "camberwell-library",
    title: "Camberwell Library & Office Development",
    category: "Adaptive Reuse & Fitout",
    heroTitleLines: ["Camberwell"],
    heroHighlight: "Library",
    heroVideo: "https://res.cloudinary.com/dphq33wah/video/upload/v1774750697/openart-2314cf375a9859ee2c3ae50614ad0a22-3d3b2231-d01b-48b8-b20a-df8164d91e34_1774750305085_ab664914_oj0e6x.mp4",
    contentTitle: "Heritage Refurbishment",
    contentParagraphs: [
      "This project involved the sensitive refurbishment and adaptive reuse of the heritage Camberwell Music Hall (originally designed by Mockridge, Stahle & Mitchell in 1967) within the Boroondara Civic Precinct. The building was transformed into a contemporary three level civic facility comprising Municipal Offices, the Camberwell Library, and community spaces, while respecting the architectural character of the original structure.",
      "Completed in September 2012, the project was recognised in the January 2013 edition of the Australian National Construction Review (ANCR), a testament to the quality and significance of the outcome."
    ],
    contentList: {
      title: "Key Responsibilities",
      items: [
        { title: "Design & Documentation Leadership", description: "Led a small project team through design development and full contract documentation, maintaining design quality and programme across all stages." },
        { title: "Consultant Coordination", description: "Managed a broad multidisciplinary consultant team including Structural and Civil Engineers, Services Engineers, Building Surveyors, DDA Consultants, Landscape Architects, and Graphic Designers, ensuring integrated and coordinated design outcomes." },
        { title: "Client & Stakeholder Engagement", description: "Maintained effective communication with Abigroup and key stakeholders throughout design and construction." },
        { title: "Construction Phase Delivery", description: "Worked closely with the Abigroup Project Manager, Site Engineers, and Construction Manager during documentation and construction phases, providing architectural support and resolving on site issues as they arose." },
        { title: "Heritage & DDA Compliance", description: "Navigated the dual challenges of heritage sensitivity and contemporary DDA accessibility requirements within an existing built fabric, a technically and contextually demanding exercise." }
      ]
    },
    info: {
      location: "Melbourne,\nAustralia",
      year: "2011 to 2013",
      client: "Abigroup",
      scale: "6,500 sqm"
    },
    gallery: [
      "https://res.cloudinary.com/dphq33wah/video/upload/v1774750898/openart-2231f07fbd7c14d0ec7518e6523e431d-5280d2ca-5d06-4ae0-8a59-cebb0a9a2c06_1774750835704_b26bd116_tkso11.mp4",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774749658/Generated_Image_March_29_2026_-_1_00PM_kzniqa.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774749660/Generated_Image_March_29_2026_-_12_55PM_ehwq5o.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774749657/Generated_Image_March_29_2026_-_12_58PM_dna3t1.jpg",
      "https://res.cloudinary.com/dphq33wah/video/upload/v1774751134/openart-9e4729eb4a1e8e4f944459cd5d217557-fa206a5e-065d-418a-9dd0-188a8043f231_1774749757179_ec456065_llxvbp.mp4"
    ],
    process: {
      title: "Adaptive Reuse",
      description: "Navigated the dual challenges of heritage sensitivity and contemporary DDA accessibility requirements within an existing built fabric, a technically and contextually demanding exercise."
    },
    materials: [
      { id: "01", name: "Heritage Integration" },
      { id: "02", name: "Adaptive Reuse" },
      { id: "03", name: "Civic Spaces" },
      { id: "04", name: "Contemporary Fitout" }
    ]
  },
  {
    id: "tropicana-miyu",
    title: "Tropicana Miyu",
    category: "Development & Project Management",
    heroTitleLines: ["Tropicana"],
    heroHighlight: "Miyu",
    heroVideo: "https://res.cloudinary.com/dphq33wah/video/upload/v1774350879/openart-a5c81385f940da160ac290b2da2b7ff0-f32a20c9-ce06-443f-8bf6-ca31cbb9ed66_1774349303546_2fd75ed2_z5yece.mp4",
    contentTitle: "Premium Boutique Residential Development",
    contentParagraphs: [
      "Tropicana Miyu is a premium boutique residential development in the heart of Petaling Jaya, delivering 271 units across 40 levels on a 2.9-acre site. The project achieved 100% sell-through, underpinned by a compelling design, a prime location, and disciplined cost management that drove profit-before-tax margins exceeding 20%.",
      "Served as the principal point of accountability for all project outcomes, providing monthly progress reports and strategic briefings to the PCG, shareholders, and senior management — including issue escalation and resolution recommendations.",
      "Led end-to-end project delivery across the full development lifecycle, encompassing:"
    ],
    contentList: {
      title: "Key Responsibilities & Achievements",
      items: [
        { title: "Regulatory & Approvals", description: "Managed submission and approval of the Development Order, Building Plan, and project commencement, ensuring compliance with all local authority (PBT) requirements." },
        { title: "Financial Oversight", description: "Directed project cost management and variation order control throughout the lifecycle, consistently keeping the project within budget while protecting margin." },
        { title: "Feasibility & Strategy", description: "Conducted feasibility studies to underpin investment decisions and project viability." },
        { title: "Design & Coordination", description: "Led a multidisciplinary team of project managers and executives across cross-functional departments to drive design development and coordination." },
        { title: "Procurement & Contracts", description: "Managed tender processes and the appointment, performance, and accountability of consultants, contractors, and subcontractors." },
        { title: "Risk Management", description: "Identified project risks proactively and implemented targeted mitigation strategies." },
        { title: "Stakeholder Management", description: "Maintained alignment across internal and external stakeholders throughout all project phases." },
        { title: "Construction & Delivery", description: "Oversaw construction management through to project completion and settlement." }
      ]
    },
    info: {
      location: "Petaling Jaya,\nSelangor",
      year: "2020 - 2024",
      client: "Tropicana Temokin",
      scale: "271 Units"
    },
    gallery: [
      "https://res.cloudinary.com/dphq33wah/video/upload/v1774350878/openart-0074df8c97389af5b7a3e0c42dba799f-46b1aab1-bbe1-4688-8612-fd96635063a3_1774349765265_d376eb1a_hjndv0.mp4",
      "https://res.cloudinary.com/dphq33wah/video/upload/v1774350875/openart-3ab02977891a1f2fcb7baf9f3b5dd536-7aa1a8bc-14a0-41bc-b045-fa681fc6e908_1774348727489_65eb69be_cddk5z.mp4",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774350932/Generated_Image_March_24_2026_-_9_00PM_kgrhfi.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774350944/Generated_Image_March_24_2026_-_9_23PM_juoaaz.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774350936/Generated_Image_March_24_2026_-_8_57PM_fycif0.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774350945/Generated_Image_March_24_2026_-_9_10PM_v2vtts.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774350949/Generated_Image_March_24_2026_-_9_13PM_dufd9k.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774350980/Generated_Image_March_24_2026_-_9_24PM_mwfrft.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774350991/Generated_Image_March_24_2026_-_9_25PM_xirszr.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774351005/Generated_Image_March_24_2026_-_9_09PM_lnyi1x.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774351027/Generated_Image_March_24_2026_-_9_33PM_edj3mt.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774351027/Generated_Image_March_24_2026_-_9_16PM_wwrp7e.jpg"
    ],
    process: {
      title: "Historical Context",
      description: "The design process involved a careful curation of the existing fabric. Layers of paint were removed to reveal the original brickwork, and the steel trusses were restored to their former glory."
    },
    materials: [
      { id: "01", name: "Recycled Brick" },
      { id: "02", name: "Exposed Steel" },
      { id: "03", name: "Polished Concrete" },
      { id: "04", name: "Walnut Veneer" }
    ]
  },
  {
    id: "sunway-property-penang",
    title: "Sunway Property Penang Regional Office & Showroom",
    category: "Design & Project Management",
    heroTitleLines: ["Sunway Property", "Penang"],
    heroHighlight: "Showroom",
    heroVideo: "https://res.cloudinary.com/dphq33wah/video/upload/v1774739933/openart-860fa3dcda1164d615c97e615d44f3aa-e2c8bced-ec4b-4459-aeed-ba439c1853d7_1774739709655_de96e22a_jgyns4.mp4",
    contentTitle: "Flagship Launchpad for Penang Expansion",
    contentParagraphs: [
      "Strategically positioned in the heart of UNESCO World Heritage-listed Georgetown, Sunway Penang @ Anson was conceived as the flagship launchpad for Sunway Property's Penang expansion — a bold five-year pipeline of projects with a combined GDV target of RM5 billion. More than a sales gallery, this development was designed to signal Sunway Property's arrival as a major force in the Penang property market, setting the tone for the brand's ambition, design philosophy, and market positioning in the region.",
      "The project made a decisive statement through its bold architectural expression, landmark landscaping, and curated interior design — and became the first GBI Gold-certified showroom in Northern Malaysia, underscoring Sunway's commitment to sustainability at a time when green certification was far from the norm.",
      "Held full accountability for design and project delivery from inception to handover, spanning:"
    ],
    contentList: {
      title: "Key Responsibilities",
      items: [
        { title: "Design Management & Coordination", description: "Led architectural, landscape, and interior design coordination across all consultant disciplines, ensuring design intent was maintained through to construction and completion." },
        { title: "Regulatory Submissions & Approvals", description: "Managed all authority submissions and approvals, navigating the added complexity of working within a UNESCO World Heritage Zone with its heightened heritage and conservation requirements." },
        { title: "Procurement & Tendering", description: "Directed the tender process and appointment of contractors and consultants, ensuring best value and alignment with project goals." },
        { title: "Construction Management", description: "Oversaw on-site construction activities, quality, and programme, driving delivery to the required standard befitting a flagship brand asset." },
        { title: "Risk Management", description: "Identified and managed project risks across design, regulatory, and construction phases." },
        { title: "Stakeholder Engagement", description: "Coordinated across internal teams, external consultants, authorities, and senior leadership throughout the project lifecycle." },
        { title: "Delivery & Handover", description: "Managed full project completion, defects resolution, and formal handover." }
      ]
    },
    info: {
      location: "Georgetown,\nPenang",
      year: "2013 - 2017",
      client: "Sunway City (Penang)",
      scale: "GFA: 20,400 sq ft"
    },
    gallery: [
      "https://res.cloudinary.com/dphq33wah/video/upload/v1774740174/openart-4201728e8019a781fd033718424d7f6c-5e9f3fd1-81fb-4308-a33b-20651b756388_1774739940347_8c37eb49_mwh6uw.mp4",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774740210/ED013._Sunway_Anson_11_amkgme.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774740215/ED013._Sunway_Anson_5_srpbxk.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774740222/ED013._Sunway_Anson_3_rq36ar.jpg",
      "https://res.cloudinary.com/dphq33wah/video/upload/v1774740286/openart-fb5e41091eb9a2ebdc0f50f616badc42-ddebff7f-75a2-4c9c-a355-ccaa79a2cd3e_1774740219627_4bb7bbfe_ucvl6r.mp4"
    ],
    process: {
      title: "GBI Gold Certification",
      description: "Became the first GBI Gold-certified showroom in Northern Malaysia, underscoring a commitment to sustainability through bold architectural expression and landmark landscaping."
    },
    materials: [
      { id: "01", name: "Landmark Landscaping" },
      { id: "02", name: "Curated Interiors" },
      { id: "03", name: "Sustainable Materials" },
      { id: "04", name: "Heritage Integration" }
    ]
  },
  {
    id: "pavilion-damansara-heights",
    title: "Pavilion Damansara Heights",
    category: "Commercial Architecture",
    heroTitleLines: ["Pavilion"],
    heroHighlight: "Damansara Heights",
    heroImage: "https://res.cloudinary.com/dphq33wah/image/upload/v1774867654/Generated_Image_March_30_2026_-_9_44PM_lxhmr5.jpg",
    heroVideo: "https://res.cloudinary.com/dphq33wah/video/upload/v1774867755/openart-6deaccfe245abd307a32e3ecb3563880-1ee90534-b218-4b37-b0f1-fb3c02a316e6_1774867561296_37ed4f03_xorlpf.mp4",
    contentTitle: "Integrated Development",
    contentParagraphs: [],
    contentList: {
      title: "Project Strategy & Execution",
      items: [
        { title: "Project Overview & Scale", description: "Pavilion Damansara Heights is a massive, high-impact economic integrated development. Operating at a Gross Development Value (GDV) of approximately 2 billion Ringgit requires a highly disciplined approach to staging, procurement, and risk management. My role centered on driving the design, coordination, and construction phases to ensure the physical build tracked tightly with the overarching commercial strategy." },
        { title: "Joint Venture & Internal Stakeholder Management", description: "A project of this density requires keeping a wide net of stakeholders aligned without stalling momentum. On the investment side, this meant managing the expectations of a major joint venture, delivering precise, rigorous monthly reporting to the Canadian Pension Fund and the Pavilion Group board. Internally, the role required constant coordination across silos—working directly with marketing, leasing, and mall operations to ensure the floorplates, sightlines, and services we were building actually met the hard operational realities of a premium retail environment." },
        { title: "Statutory Navigation & Government Liaison", description: "Given its scale and economic footprint, the statutory approvals process was intensive. This involved direct, ongoing liaison with the State Government and the local Council to keep the project moving through legislative gateways and ensuring compliance at every tier of the development." },
        { title: "Construction Coordination & Delivery Outcomes", description: "We mapped the construction sequence to allow for phased handovers, mitigating risk rather than waiting for a single monolithic completion. On the ground, I worked directly with the main contractor, WCT Berhad, to manage the complex stage-by-stage development program. The culmination of my time on the project was driving the successful delivery and public opening of the retail mall component, transitioning it from a sprawling construction site into a fully operational commercial asset." }
      ]
    },
    info: {
      location: "Kuala Lumpur,\nMalaysia",
      year: "2024",
      client: "Joint Venture (Pavilion Group &\nCanadian Pension Fund)",
      scale: "~RM 2.0 Billion GDV",
      role: "Senior Development Manager",
      mainContractor: "WCT Berhad"
    },
    gallery: [
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774867654/Generated_Image_March_30_2026_-_9_44PM_lxhmr5.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774867391/Generated_Image_March_30_2026_-_9_42PM_fe3kpq.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1774867388/Generated_Image_March_30_2026_-_9_42PM_copy_qfhlqy.jpg"
    ],
    process: {
      title: "Integrated Urban Design",
      description: "The project focuses on creating a cohesive environment that blends commercial vitality with residential tranquility, utilizing sustainable practices and innovative engineering."
    },
    materials: [
      { id: "01", name: "High-Performance Glass" },
      { id: "02", name: "Natural Stone" },
      { id: "03", name: "Architectural Steel" },
      { id: "04", name: "Premium Timber" }
    ]
  }
];
