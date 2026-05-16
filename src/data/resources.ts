export interface Resource {
  id: string;
  title: string;
  date: string;
  tags?: string[];
  summary: string;
  image: string;
  content: string;
  isHtml?: boolean;
  carousel?: string[];
  embedUrl?: string;
  pdfUrl?: string;
  htmlRef?: string;
  videoUrl?: string;
  bgProjectId?: string;
}

export const resources: Resource[] = [
  {
    id: "flw-guggenheim-ai-film",
    title: "30 Seconds, One Spiral: An AI Film About the Guggenheim",
    date: "16/5/2026",
    tags: ["AI", "Architecture"],
    summary: "What happens when you put the architect back on site — using AI to make a 65-year-old building argue for itself again, in 30 seconds, in the language of 2026.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Solomon_R._Guggenheim_Museum.jpg/1280px-Solomon_R._Guggenheim_Museum.jpg",
    content: `### *There is a building in New York that is a complete argument.*

When I started thinking about how AI could be used to communicate architectural ideas — not just render them — I kept coming back to a simple question: what if you could put the architect back on site?

The Guggenheim project was an experiment. A 30-second cinematic film, generated entirely with AI, about Frank Lloyd Wright and the building he designed but never lived to see opened. Five shots. One spiral. A brief that forced me to develop a discipline I now apply to every AI workflow I run.

---

### The Anchor System

Before any image was generated, I built a Narrative Anchor — a locked set of creative decisions that every subsequent generation is held accountable to.

For Wright, this meant:

- **Character:** 91 years old, warm and mischievously certain. A grandfatherly prairie philosopher.
- **Wardrobe locked by HEX code:** Tweed #3D3328, cream shirt #F4EFE6, oxblood tie #7A2E1F, porkpie hat #1A1815, walking cane #8B6F47. Every shot. Every model. Non-negotiable.
- **Singular Thesis:** A museum should not be a box of corridors. It should be one continuous space — a spiral temple where art and visitor ascend together.
- **Anchor Phrase:** *"Form and function are one."*

This is not about writing long prompts. It is about writing the right constraints before the generative process begins.

---

### Five Shots in 30 Seconds

The film was structured as a five-act arc, each shot with a word-count cap on the dialogue to hit exactly 2.5 words per second:

**Shot 01 — The Hook (5s)**
Wide exterior, Fifth Avenue. Wright in foreground, the white rotunda rising behind him.

> *"Form and function are one. So I drew them a spiral."*

**Shot 02 — The Vision (6s)**
Top-down on a drafting desk. Blueprints. The 3D model materialising out of the drawing itself.

> *"They said you cannot hang a painting on a curve. I said: then build the curve."*

**Shot 03 — The Context (6s)**
Interior. Ground floor. Wright looking straight up the spiraling ramp toward the glass oculus.

> *"No corridors. No corners. One ramp — a quarter mile of art unfurled by gravity."*

**Shot 04 — The Impact (6s)**
Visitors ascending, pausing at paintings tilted on the curved white walls. Wright watching at the rail.

> *"You don't visit this museum. You climb it. The building does the walking with you."*

**Shot 05 — The Outro (7s)**
Drone pull-back revealing the white spiral against Manhattan's rigid grid of right angles. Fade to black.

> *"They built a city of right angles. I left them one perfect spiral to argue with."*

---

### The Tools

Two models drove the generation sequence.

**Nano Banana 2** produced the locked start and end frames — the photographic anchors each shot had to resolve between. Each prompt included the full building name stated explicitly. Not "the museum." Not "the building." *Solomon R. Guggenheim Museum* — full name, every time.

**Kling 3** handled the motion — slow dolly push-ins, vertical crane ascents along the central void, lateral tracking shots, and the final drone pull-back. The motion brief was written with the same specificity as the image prompts: not "move the camera" but *"slow dolly push-in past Wright as he gestures with the cane toward the spiraling facade."*

---

### The Anti-Drift Rule

The biggest failure mode in multi-shot AI generation is drift. By shot four, the building starts to change. The character's costume mutates. The lighting becomes inconsistent. You are making a different film.

The discipline that solved it was simple: state the anchor in every single prompt. Full name. Full wardrobe. Full lighting specification. Interior: 3000K key + blue fill, interior lights on. Exterior: pale golden hour. Locked across all five shots. No exceptions.

Drift is not a model failure. It is a prompting failure.

---

### What This Means for Architecture

The Guggenheim project was an experiment in architectural communication. Not about making a film. About using AI to put the designer's intent back into the documentation — to make a 65-year-old building argue for itself again, in the language of 2026.

For practising architects, the workflow translates directly. The same anchor system applies to project pitches, planning submissions, and client presentations. Lock the design language first. Define the camera logic. Lock the material palette and the lighting. Then generate.

The creative decisions should happen before the generation begins — not in response to whatever the model produces.

*The building does the walking with you. You just have to tell it where to go.*`
  },
  {
    id: "arbv-reforms-2026",
    title: "The 2026 ARBV Reforms",
    date: "10/5/2026",
    tags: ["Architecture", "Regulation"],
    summary: "A practical, plain-English breakdown of the 2026 changes to the Architects Act 1991 and the new Architects Regulations 2025 for practising architects in Victoria.",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1778030514/4fb60a3d892f67a495208339012ab6b9_w3n8mk.gif",
    carousel: [
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_1/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_2/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_3/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_4/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_5/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_6/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_7/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_8/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_9/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_10/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_11/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_12/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_13/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg',
      'https://res.cloudinary.com/dphq33wah/image/upload/pg_14/v1778205305/Chiang-Ning-Field-Guide-02-ARBV-Reforms_sj34kp.jpg'
    ],
    content: "The 2026 ARBV Reforms guide in PDF format."
  },
  {
    id: "ncc-2025-reforms",
    title: "The 2025 NCC Reforms",
    date: "11/5/2026",
    tags: ["Architecture", "Regulation"],
    summary: "A practical summary of the NCC 2025 changes, focusing on commercial energy, waterproofing, and carpark fire safety across Australian jurisdictions.",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1778329933/e6ecbfdb9ceeb0af6638d97044eeea5e_q2sxca.gif",
    carousel: [
      '/resources/ncc-2025-reforms/page-01.jpg',
      '/resources/ncc-2025-reforms/page-02.jpg',
      '/resources/ncc-2025-reforms/page-03.jpg',
      '/resources/ncc-2025-reforms/page-04.jpg',
      '/resources/ncc-2025-reforms/page-05.jpg',
      '/resources/ncc-2025-reforms/page-06.jpg',
      '/resources/ncc-2025-reforms/page-07.jpg',
      '/resources/ncc-2025-reforms/page-08.jpg'
    ],
    pdfUrl: "/resources/chiang-ning-field-guide-03-ncc-2025-reforms.pdf",
    content: "The 2025 NCC Reforms guide in PDF format covering Water, Carparks, Section J, and Condensation."
  },
  {
    id: "construction-cost-update-march-2026",
    title: "Construction Cost Update March 2026",
    date: "15/3/2026",
    tags: ["Project Management", "Construction"],
    summary: "A brief overview of the latest construction cost trends and material pricing updates for Q1 2026.",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1775538291/1c6a4785e255aa05d7be71da940e6f92_jr14vx.jpg",
    content: `### Construction Cost Update: March 2026

As we close out the first quarter of 2026, the construction industry continues to navigate a complex landscape of fluctuating material costs and evolving supply chain dynamics. 

#### Key Trends
Based on the provided report, here are 3 key trends and findings regarding the Australian construction market between 2020 and 2026:

*   **Shift from Material to Labor Constraints:** By early 2026, the primary driver of construction cost escalation is no longer material prices, which largely stabilized after the shocks of 2021-2022, but a chronic shortage of skilled labor. This scarcity has pushed the industry into a "productivity trap," where construction productivity dropped by 3% in 2024-25 and building completion times have increased by approximately 40% compared to pre-pandemic levels.
*   **The "Olympic Squeeze" in Brisbane:** Brisbane is currently the most dynamic and highest-escalating market in Australia, with a forecasted Tender Price Index (TPI) growth of 5.0% for 2026. This surge is directly driven by the infrastructure pipeline for the 2032 Olympic Games, where major stadium and water infrastructure projects are competing with standard residential and school developments for a finite pool of labor.
*   **Mandatory Sustainability and ESG Premiums:** Between 2020 and 2026, the cost of meeting high sustainability targets (such as a 6-Star Green Star rating) transitioned from being a "voluntary premium" to a "mandatory baseline". Implementing these high-level sustainability ratings now adds an estimated 2% to 5% to total construction costs, primarily affecting mechanical and electrical services as well as high-performance facade systems.

*Note: This is a generic update. Specific project costs will vary based on location, scale, and specific material requirements.*`
  },
  {
    id: "world-building-lego-ai",
    title: "World-Building with Lego and AI",
    date: "28/1/2026",
    tags: ["Architecture", "AI"],
    summary: "\"Papa, are you playing?\", my 10-year-old asked me yesterday. I put away work, look at him and said, \"No, I'm world-building.\"",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1775528113/Gemini_Generated_Image_be5zllbe5zllbe5z_kfhy44.jpg",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7400352539159912448",
    content: ""
  },
  {
    id: "lego-pompidou-centre",
    title: "Lego X Pompidou Centre",
    date: "6/2/2026",
    tags: ["AI"],
    summary: "I was shopping for my 2 kids at the Lego store last weekend. Watching them select a 'Technic' set, I realized something. The toy aisle currently has better structural components than our professional modeling studios.",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1775525971/Generated_Image_December_02_2025_-_9_11PM_vhosr9.jpg",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7402445811042938880",
    content: ""
  },
  {
    id: "brick-economy",
    title: "What Architects can learn from Brick Economy",
    date: "2/4/2026",
    tags: ["Architecture"],
    summary: "Since 2003, the Cloud City Boba Fett LEGO minifigure has compounded in value at 9.29% annually...",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1775110231/1_csosrb.jpg",
    carousel: [
      "https://res.cloudinary.com/dphq33wah/image/upload/v1775110231/1_csosrb.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1775110231/2_nvfntc.jpg",
      "https://res.cloudinary.com/dphq33wah/image/upload/v1775110231/3_uy0zv1.jpg"
    ],
    content: `### *What can architects learn from a A$3,690 piece of plastic?*

Since 2003, the Cloud City Boba Fett LEGO minifigure has compounded in value at 9.29% annually, matching the historical average of the S&P 500. At the top of the collector's market, mint-condition versions now fetch $7,000.

What makes boba fett special is because of "arms and leg printing". It is unique because at the time, no other minifigure had printing on the arms and legs. Boba Fett was the first, and it was only available in one set that was quickly discontinued.

Mr. Gold: with only 5,000 ever made, commands up to $11,000. 

And the Spider-Man from San Diego Comic-Con 2013, handed to fewer than 125 people at the Marvel booth? Verified sales north of $25,000.

The reason across every single one of them is the same: unprecedented detail, locked inside genuine scarcity.

![Minifig Value](https://res.cloudinary.com/dphq33wah/image/upload/v1775110231/4_jg71bn.jpg)

---

### Here's what architects can learn:

Too many practices operate with a service-provider mindset: answer the brief, issue the CAD, wait for instructions. You become a commodity, and the market will push your fees to the floor without hesitation.

Good architecture creates immense, quantifiable value. It maximises site yield, builds commercial leverage, and drives real ROI. 

But clients will never pay for that value if they're afraid the design will blow out the build. To escape the commodity trap, you have to offer the arm-and-leg printing. You have to stop being a service provider and become a professional partner who protects the client's investment.

After 20 years working across both sides of the site fence, here is what that scarcity looks like in practice:

#### The Reliable Estimate
The rarest skill in architecture isn't drawing a compelling form. It's proving that form can be built for the number on the page. No bloated contingencies. No late-stage value-engineering that strips the soul from the building.

#### Protecting the ROI
It's mapping the 12-month construction program at the schematic phase. It's understanding exactly how Melbourne's shifting planning schemes and statutory updates reshape the financial model, and designing preemptively around those constraints, not reactively after they've already cost the client money.

#### The Dual Mindset
It's holding a Master Builder's vision while applying a project manager's logic to the dirt. It's engineering constructability into the project's DNA: resolving structural and logistical friction on paper so it doesn't become a budget blowout, a program delay, or a site failure subject to forensic investigation.

---

The clients who matter aren't choosing on price. They're choosing based on confidence.

You build that confidence by demonstrating a grasp of commercial and physical realities from day one, not just by how well you design, but by proving the design works.

That's your arm-and-leg printing. That's your scarcity.

**Build it.**`
  },
  {
    id: "ai-gantt-chart",
    title: "Building a Custom Gantt Chart Tool with AI",
    date: "6/4/2026",
    tags: ["Project Management", "Architecture", "AI"],
    summary: "How I leveraged AI to build a custom, responsive Gantt chart tool tailored for architectural project management.",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1775539009/7f029cf5425d836c556484934c5e2600_xx87oz.jpg",
    content: `Project management in architecture often requires tools that are either too complex or too rigid. I wanted a Gantt chart that was lightweight, visually clean, and perfectly suited to our studio's workflow. 

Instead of building it from scratch or buying off-the-shelf software, I used AI to generate a custom solution. By defining the exact constraints, data structures, and visual language I needed, the AI was able to scaffold the entire application in a fraction of the time it would typically take. 

This approach allows us to maintain full ownership of our tools while continuously iterating on them as our processes evolve. You can interact with the live tool embedded below.`
  },
  {
    id: "prompting-gpt-image-2",
    title: "Prompting GPT Image 2 — A Field Guide for Architects & Interior Designers",
    date: "24/4/2026",
    tags: ["AI", "Architecture"],
    summary: "A working field guide for architects and interior designers — ten principles, three applied workflows, and the honest limits of a model that has finally learned to listen.",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1777534722/gpt-2_j7v5yh.png",
    content: "",
    isHtml: true
  },
  {
    id: "spatial-injector",
    title: "SpatialInjector: Browser-based 360° Video Metadata Injector",
    date: "25/4/2026",
    tags: ["AI"],
    summary: "Inject spatial metadata into existing flat MP4 videos to enable 360° playback. Fully browser-based with no server uploads.",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1777534722/d4c02ab6ea1144040cd0cb1174f39b94_hisfp9.jpg",
    content: "spatial-injector" // Just a placeholder, we use tool view instead
  },
  {
    id: "controlled-3d-flythroughs",
    title: "Mastering Controlled 3D Flythroughs with Seedance 2.0 & GPT Image 2",
    date: "30/4/2026",
    tags: ["AI", "Architecture"],
    summary: "A breakthrough workflow for achieving consistent, geometry-stable flythroughs by overriding standard UI constraints in AI video generation.",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1778116630/d41de6e5672281a24b170b85635d2027_fsfssh.jpg",
    videoUrl: "https://res.cloudinary.com/dphq33wah/video/upload/v1777547270/P216_flythrough2_qomdlr.mp4",
    content: `## Introduction
If you've spent any time working with generative AI for architectural visualization, you know the "final boss" of AI video generation: combining a strict start frame, an explicit end frame, and a precise 3D camera path without the architecture melting, warping, or hallucinating into something entirely different. Achieving a fully controlled, 3D-consistent flythrough has long been the holy grail for visualizers.

## The Core Problem
Standard AI video UI tools inevitably force a compromise. You are usually made to choose between referencing a spatial motion path or defining a definitive end frame. If you set a start and end frame, the model tends to take the path of least resistance—often a morphing transition rather than a spatial camera move. If you enforce a camera path, the end frame gets ignored or corrupted. The geometry simply doesn't hold up to the strict constraints of real-world spatial logic.

## The Breakthrough Workflow
The solution lies in bypassing the standard UI constraints of Seedance 2.0 and GPT Image 2. Instead of relying on the basic start/end frame inputs, we use the "Text with Reference" tab. By utilizing the \`@\` tagging system, we can force the model to weigh the start image, the reference motion video, and the end image simultaneously within the prompt itself.

*   **Start Frame:** Tag your initial rendered or drafted image using \`@image1\`.
*   **Motion Reference:** Tag a reference video that dictates the exact camera movement (e.g., a simple block-model flythrough) using \`@video1\`.
*   **End Frame:** Tag your definitive final frame using \`@image2\`.

By embedding these directly into the text prompt, the model processes them as concurrent spatial and visual constraints rather than sequential UI toggles.

## Prompt Engineering for Cinematography
When overriding the UI, the text prompt must shift its focus. Because the geometry is already defined by your start and end frames, your prompt shouldn't waste tokens describing the architecture. Instead, dictate the cinematography and lighting.

> start with @image1 . Cinematic forward tracking along the spatial path of @video1, resolving exactly into @image2 . Transition lighting from pale golden hour to twilight with blue fill. Keep geometry strictly rigid and stable. High-end architectural photography, 8k resolution.

### Notice the emphasis:
*   **Camera Movement:** "Cinematic forward tracking along the spatial path..." locking the motion to the reference.
*   **Lighting Transitions:** "Transition lighting from pale golden hour to twilight with blue fill." This gives the model a task to process over time, covering the transition rather than trying to invent new geometry.
*   **Stability:** Explicit commands to "Keep geometry strictly rigid and stable."

## Pragmatic Application
In the context of project management and client presentations, "close enough" doesn't cut it. A flythrough needs to accurately represent the spatial reality of the designed condition. By achieving controlled, geometry-stable flythroughs, we bridge the gap between high-level conceptual AI generation and the technical realities of site execution. This workflow allows us to deliver cinematic, deeply immersive architectural presentations without sacrificing the precision that our profession demands.`
  },
  {
    id: "agent-skills-architectural-workflows",
    title: "From Prompting to Systems: Using Agent Skills in Architectural AI Workflows",
    date: "14/5/2026",
    tags: ["AI", "Architecture"],
    summary: "AI image and video tools are improving quickly, but the real value is not just in writing better prompts. The real value is in building repeatable workflows.",
    image: "https://res.cloudinary.com/dphq33wah/image/upload/v1778329997/694a1c016198ee4c65e7ff75da6f462d_xy8owy.jpg",
    videoUrl: "https://res.cloudinary.com/dphq33wah/video/upload/v1778751909/P237_verandah_KL_nsody2.mp4",
    content: `# From Prompting to Systems: Using Agent Skills in Architectural AI Workflows

AI image and video tools are improving quickly, but the real value is not just in writing better prompts.

The real value is in building **repeatable workflows**.

For architectural visualisation, this matters because one good image is rarely enough. A project usually needs a coordinated set of outputs: site diagrams, exterior views, interiors, façade studies, sections, storyboards and video prompts. If every prompt is written manually from scratch, the design language quickly drifts.

The building changes.
The material palette shifts.
The camera logic becomes inconsistent.
The output stops feeling like one project.

To solve this, I use **Agent Skills \`.md\` files** as part of my workflow.

The process is simple:

**Your Prompt → Agent Skills → Generated Prompts → Video/Image Models → Video/Images**

The \`.md\` file sits between the initial design intent and the final output. It acts like a reusable framework for how the AI agent should think, structure and generate prompts.

---

## What the Agent Skills file does

An Agent Skills \`.md\` file is not just a long prompt.

It is closer to a **creative specification**.

It can define:

* project type
* design sequence
* visual style
* camera rules
* material palette
* negative constraints
* output format
* prompt structure
* video/image model requirements

This turns prompting from a one-off task into a repeatable system.

Instead of asking for “some nice images”, I can ask the agent to follow a defined architectural method, generate a structured prompt set, and maintain consistency across multiple outputs.

---

## Example: The Verandah KL

I tested this workflow with a speculative apartment concept in Kampung Baru, Kuala Lumpur.

The project was called **The Verandah KL**.

The design intent was a boutique luxury apartment tower that responds to the contrast between Kampung Baru’s fine-grain urban fabric and the KL skyline.

The concept was not to create another generic glass tower.

The architectural language was defined around:

* shaded verandahs
* deep balconies
* bronze terracotta screens
* warm timber soffits
* pale stone surfaces
* tropical planting
* controlled 2-point perspectives
* black-and-white architectural linework
* coloured post-digital collage intervention

This became the project’s visual DNA.

Once that system was established, the agent could generate coordinated prompts for street views, podium spaces, apartment interiors, balconies, night shots and video sequences.

---

## Why the system worked

The strongest result came from using a **dual-style architectural language**.

The existing context remained as crisp black-and-white linework.
The proposed building and interiors were rendered in warm, material-rich post-digital collage.

This created a useful balance:

* the linework kept the image analytical
* the colour made the proposal feel inhabited
* the contrast clarified what was existing and what was proposed
* the style remained consistent across different shots

For interiors, the effect was particularly effective. The architectural shell stayed as a technical drawing, while the inhabited space became warm, atmospheric and spatial.

It felt like a drawing opening into a lived architectural experience.

---

## Why this matters

Architectural image generation is not only about aesthetics.

It needs control.

A useful AI workflow should preserve:

* site logic
* design intent
* spatial hierarchy
* material consistency
* camera discipline
* narrative continuity

Agent Skills files help encode those requirements before image generation begins.

The designer still makes the key decisions, but the system reduces repetitive prompt writing and keeps the outputs aligned.

This is similar to how architects already work with briefs, drawing standards, material schedules and presentation rules.

The \`.md\` file simply extends that logic into generative media.

---

## The practical benefit

This workflow allows me to move from:

**one-off prompting**

to:

**structured visual production**

The benefits are clear:

* faster prompt generation
* more consistent image sets
* reusable project logic
* easier image-to-video translation
* stronger design narrative
* less drift between outputs
* better control over architectural style

The important shift is this:

I am not just prompting for an image.

I am designing the process that generates the image.

For architectural visualisation, that is where AI becomes much more useful.`
  }
];
