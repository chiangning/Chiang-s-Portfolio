"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal, LineReveal } from "@/components/Reveal";

const SERIF = 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 h-px bg-terracotta flex-shrink-0" />
      <span className="mono-label text-terracotta">{children}</span>
    </div>
  );
}

function Prompt({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="my-6 border-l-2 border-terracotta bg-paper-soft px-5 py-4">
      <div className="mono-label-sm text-terracotta mb-1">Prompt</div>
      {label && <div className="mono-label-sm text-ink-soft mb-3">{label}</div>}
      <p className="font-mono text-[12.5px] md:text-[13px] leading-relaxed text-ink whitespace-pre-line">
        {children}
      </p>
    </div>
  );
}

function Principle({
  num,
  tag,
  headline,
  children,
}: {
  num: string;
  tag: string;
  headline: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-[5rem_1fr] gap-x-6 gap-y-3 py-9 border-t border-ink/10">
      <div className="font-display text-5xl md:text-6xl font-bold tracking-tighter leading-none text-ink/15 tabular-nums">
        {num}
      </div>
      <div>
        <div className="mono-label text-terracotta mb-3">{tag}</div>
        <h3 className="fluid-h2 font-display font-bold tracking-tighter text-ink mb-4">
          {headline}
        </h3>
        <div className="space-y-4 text-ink-soft leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function Figure({
  src,
  alt,
  caption,
  spec,
  portrait = false,
}: {
  src: string;
  alt: string;
  caption: string;
  spec?: string;
  portrait?: boolean;
}) {
  return (
    <figure className="my-12 md:my-16 mx-auto max-w-5xl px-6">
      <div
        className={`relative overflow-hidden bg-paper-soft ${
          portrait ? "aspect-[816/1456] max-w-sm mx-auto" : "aspect-[1456/816]"
        }`}
      >
        <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      </div>
      <figcaption className="mt-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6">
        <span className="mono-label-sm text-ink-soft leading-relaxed max-w-3xl normal-case tracking-normal">
          {caption}
        </span>
        {spec && (
          <span className="mono-label-sm text-terracotta whitespace-nowrap shrink-0">{spec}</span>
        )}
      </figcaption>
    </figure>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-16 md:my-20 mx-auto max-w-3xl px-6 text-center">
      <p
        className="text-2xl md:text-[34px] leading-snug text-terracotta"
        style={{ fontFamily: SERIF, fontStyle: "italic" }}
      >
        {children}
      </p>
    </blockquote>
  );
}

function SectionHead({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <Reveal className="mx-auto max-w-3xl px-6 pt-16 md:pt-24 pb-2">
      <Kicker>{kicker}</Kicker>
      <h2 className="fluid-h1 mt-6 font-display font-bold tracking-tighter text-ink">{title}</h2>
      {intro && <p className="mt-6 fluid-lead text-ink-soft">{intro}</p>}
    </Reveal>
  );
}

const Text = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-3xl px-6 space-y-5 text-ink-soft leading-relaxed">{children}</div>
);

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const essentials = [
  { label: "Max resolution", value: "2560 × 1440", note: "Edges in multiples of 16. Ratio ≤ 3:1. Longest edge under 3840 px." },
  { label: "Quality tiers", value: "low · med · high", note: "High for client-facing, medium for sprints, low for ideation volume." },
  { label: "Reference images", value: "Up to 16", note: "Each processed at high fidelity. Address by index in the prompt." },
  { label: "Cost / render", value: "~ $0.041", note: "1536×1024 high-quality landscape. Cheap enough for 20-image studies." },
  { label: "PNG · JPG", value: "Default output", note: "WebP and JPEG are faster and support output_compression. Transparent backgrounds are not supported; use background opaque and remove downstream." },
  { label: "n = 4", value: "Variant generation", note: "One brief yields four parallel variants. Faster than four separate prompts. Best friend of concept-board work." },
  { label: "~ 2 min", value: "Complex prompts", note: "Heavy briefs can take up to two minutes. Plan iteration cycles; do not expect instant turnaround." },
];

const limits = [
  { n: "i", lead: "It dreams over geometry.", body: "Anything that requires dimensional precision, repeating fenestration with consistent mullion spacing, or load paths that actually work, the model will confidently invent.", mean: "The model is a sketch tool that thinks in mood, not a drafting tool that thinks in measurements. I use it for the former and never the latter." },
  { n: "ii", lead: "Logo reproduction is unreliable.", body: "Brand marks come back warped, wrong-coloured, or invented. I now composite logos in Photoshop after the fact.", mean: "The model has learned logo shape as a generic category, not specific marks as fixed assets. There is no library it is looking things up in." },
  { n: "iii", lead: "Complex prompts can take two minutes.", body: "A heavy brief with 12 references and a long preserve clause genuinely takes minutes to render.", mean: "The iteration pace I want, five cycles in fifteen minutes, is not always available. Some thinking has to happen inside the prompt before I press send, not after." },
  { n: "iv", lead: "Adjective stacking degrades output.", body: "Stunning, ultra-detailed, cinematic, masterpiece, 8K, award-winning produces worse results than three terse visual facts.", mean: "The model is trained on captions, and good captions describe, they do not praise. Treat it like a caption-writer's audience, not a marketer's." },
  { n: "v", lead: "Vague preservation compounds.", body: "Keep the room the same while adding furniture quietly shifts wall colour, floor reflection, window framing. By turn three I have sometimes drifted to a different room.", mean: "There is no persistent state. Every turn is a fresh negotiation. Naming what stays is how I impose continuity the model does not have on its own." },
];

const qualityCards = [
  { label: "Client hero", value: "high · 1536×1024" },
  { label: "Comparison sprint", value: "medium · 1024×1024" },
  { label: "Ideation volume", value: "low · 1024×1024" },
  { label: "Mood board", value: "high · square" },
];

const closingQuestions = [
  "How stable is preservation across long edit chains? My answer so far is “less stable than I want,” but I have not pushed it methodically.",
  "Can the model maintain consistent material identity across separate sessions? Or is every session a fresh negotiation?",
  "What is the failure mode when I mix two architectural languages in one brief? Does the model average them, or pick one?",
  "If the sketch phase now costs four cents and two minutes, what does that change about how I bill, scope, and explain my work to clients?",
  "What is the half-life of any of these patterns? gpt-image-2 will be gpt-image-3 inside a year.",
  "And the one I think matters most: what does it mean for design practice that competent visualisation is now a commodity, while design judgment is not?",
];

/* ------------------------------------------------------------------ */
/* Article                                                            */
/* ------------------------------------------------------------------ */

export function GptImage2Article() {
  return (
    <article className="bg-paper text-ink pb-24">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-5xl px-6 pt-10 md:pt-16">
        <Link
          href="/resources"
          className="group mono-label inline-flex items-center gap-2 text-ink-soft hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          All resources
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 mono-label text-ink-soft">
          <span className="text-terracotta">Field Guide № 01</span>
          <span>·</span>
          <span>Field notes for architects</span>
          <span>·</span>
          <span>April 2026</span>
        </div>

        <h1 className="mt-6 fluid-display font-display font-bold tracking-tighter text-ink">
          Prompting{" "}
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400 }} className="text-terracotta">
            GPT Image 2
          </span>
        </h1>

        <p className="mt-8 fluid-lead max-w-2xl text-ink-soft">
          After a month with the model: ten patterns I keep returning to, three workflows I have found
          useful, and the questions I am still asking. A working notebook for architects and interior
          designers, not the last word.
        </p>

        <div className="mt-6 mono-label text-ink-soft">By Chiang Ning · chiangning.net · 12 min read</div>
      </header>

      <Figure
        src="/articles/gpt-image-2/hero.jpg"
        alt="Hybrid sketch-render of a contemporary civic building at dusk"
        caption="Cover image, generated with gpt-image-2. A hybrid sketch-render: half photorealistic, half graphite line drawing, in a single pass."
        spec="GPT-IMAGE-2 · SINGLE PASS"
      />

      {/* ── FOREWORD ─────────────────────────────────────────────── */}
      <SectionHead
        kicker="Foreword · Why I started this notebook"
        title="A working notebook, not a finished guide."
        intro={
          <>
            OpenAI released gpt-image-2 on 21 April 2026. A month in, I have spent enough hours with it
            to notice patterns, and enough to know that what I have found so far is a fraction of what is
            there.
          </>
        }
      />
      <div className="mx-auto max-w-3xl px-6 mt-8 grid md:grid-cols-2 gap-x-10 gap-y-5 text-ink-soft leading-relaxed">
        <p>
          I am an architect, not an ML researcher, and I have been treating the model the way I would
          treat any new tool that landed on my desk: using it on real briefs, watching where it
          surprises me, and writing down what seems to repeat. The ten patterns in Part One are the ones
          I keep returning to. The workflows in Part Two are the ones I now reach for first. Neither set
          is finished.
        </p>
        <p>
          What I am noticing is that the model rewards specific visual facts over adjectives, and rewards
          constraint language over decorative praise. Findings that converge across early case studies
          from Archtene, Rendair, and the fal.ai prompting guide. OpenAI&apos;s own Cookbook is explicit:
          for photorealism, include the word &ldquo;photorealistic&rdquo; to engage that mode; for edits,
          repeat what must be preserved on every turn.
        </p>
        <p>
          What pulled me in: gpt-image-2 is the first general-purpose image model that responds to a
          prompt the way a contractor responds to a drafting brief, with hierarchy, materials,
          constraints, and intent. That is a shift, and I do not think I have fully metabolised it yet.
        </p>
        <p>
          Read this as a starting point, not a conclusion. Every feature image here is a gpt-image-2
          output, not stock, not retouched. Each is also a thing I learned something from making. If you
          find something I have not, please tell me at chiangning.net.
        </p>
      </div>

      {/* ── THE ESSENTIALS ───────────────────────────────────────── */}
      <LineReveal className="mt-20" />
      <SectionHead
        kicker="The essentials · What I keep checking before I prompt"
        title="Before I write a brief, I check the machine."
        intro="Parameter-level realities I had to internalise the hard way, by asking the model for things it structurally could not deliver and burning credits to find out. It saves me a beat to glance at this first."
      />
      <div className="mx-auto max-w-5xl px-6 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
        {essentials.map((e) => (
          <div key={e.label} className="bg-paper p-6 flex flex-col gap-2">
            <span className="mono-label text-ink-soft">{e.label}</span>
            <span className="font-display text-xl font-bold tracking-tighter text-ink">{e.value}</span>
            <span className="text-[13px] leading-relaxed text-ink-soft">{e.note}</span>
          </div>
        ))}
      </div>

      {/* ── PART ONE ─────────────────────────────────────────────── */}
      <LineReveal className="mt-20" />
      <SectionHead
        kicker="Part One · Ten patterns"
        title="Ten patterns I keep returning to."
        intro="I am not sure these are principles yet, that is a word for things you have tested across years. But in a month of using the model on real briefs, these are the moves that have shifted my output the most. Each one earned its place. Most still have edges I have not found."
      />

      <Figure
        src="/articles/gpt-image-2/analysis.jpg"
        alt="Four-tier diagrammatic architectural analysis"
        caption="A four-tier diagrammatic analysis I generated in a single call: circulation, program, environmental, structure. I have never been able to reproduce this exact composition twice. The model has a range, not a fixed style."
        spec="SINGLE PASS · HIGH QUALITY"
        portrait
      />

      <div className="mx-auto max-w-3xl px-6 mt-4">
        <Principle num="01" tag="I · Structure" headline="I write in a fixed order.">
          <p className="font-medium text-ink">Scene, subject, details, constraints, use case.</p>
          <p>
            I tested this against a single dump-everything-in paragraph for two weeks. The structured
            version won every time. For a render I write: scene is site and time of day, subject is the
            building or room, details are materials and camera framing, constraints are what must not
            change, and use case (competition board, client presentation, magazine editorial) sets the
            polish level.
          </p>
          <p>
            Short labelled segments with line breaks, not a single run-on. The model treats a structured
            brief as a brief, and an adjective soup as an adjective soup. What I am still asking: does the
            order itself matter, or just the labelling?
          </p>
        </Principle>

        <Principle num="02" tag="II · Specificity" headline="I replace style words with their visual atoms.">
          <p>
            Minimalist, brutalist, Japandi on their own are weak triggers. I have seen the model deliver
            competent but generic outputs to all three, the same competent generic each time. The single
            highest-leverage move I have found is to break a style label into the materials, palette, and
            silhouette rules underneath it. Every canonical style compresses to a finite list. Write the
            list.
          </p>
          <Prompt label="Instead of: brutalist façade">
            Board-formed exposed concrete with visible wooden formwork striations, aggregate texture,
            cantilevers, deep recesses, raw concrete grey with rust staining, modular repetition,
            high-contrast raking shadows.
          </Prompt>
        </Principle>

        <Principle num="03" tag="III · Realism" headline="I trigger photorealism by name, then anchor it with texture.">
          <p>
            The OpenAI Cookbook says it directly: including &ldquo;photorealistic&rdquo; engages a
            photorealistic mode. Pairing it with texture-forward nouns (real skin texture, pores, subtle
            film grain, brushed aluminium with micro-scratches, weathered copper patina, chipped paint,
            worn travertine) does more than the word alone.
          </p>
          <p>
            Archtene&apos;s phrasing (smooth realistic quality like 3Ds Max and V-Ray rendering, accurate
            shadows, reflections and architectural realism, materials feel natural and premium, less
            plastic) pulls renders away from the default oversaturated gloss. I now use it as a tail on
            most photoreal briefs. What I have not worked out: is &ldquo;less plastic&rdquo; really doing
            work, or am I just superstitious about it?
          </p>
        </Principle>

        <Principle num="04" tag="IV · Framing" headline="I treat camera language loosely. Composition precisely.">
          <p>
            The Cookbook warns that detailed camera specs are interpreted loosely: lens lengths influence
            look, not physics. I write &ldquo;medium close-up at eye level, 50mm lens feel, shallow depth
            of field, 35mm film aesthetic&rdquo; rather than a sensor-and-aperture recipe. The mood lands;
            the dimensions do not.
          </p>
          <p>
            For composition I am literal. &ldquo;Corner perspective at eye level, slight three-quarter
            angle, hero object centred with generous negative space, horizon line in the lower
            third.&rdquo; Corner perspectives outperform flat front elevations because they reveal depth
            and form, a thing Archtene flagged early and I keep verifying.
          </p>
        </Principle>
      </div>

      <Figure
        src="/articles/gpt-image-2/interior.jpg"
        alt="Photorealistic interior with fluted oak, exposed brick and marble"
        caption="Principle III in evidence: fluted oak, exposed brick, marble veining, brass spotlights, two figures with credible eye contact."
        spec="FIG. 1 · SINGLE PASS · HIGH QUALITY"
      />

      <div className="mx-auto max-w-3xl px-6">
        <Principle num="05" tag="V · Edits" headline="I treat edits as a two-column contract: change plus preserve.">
          <p>
            This is the move that has reshaped my iteration practice the most. Every edit prompt I write
            now states explicitly what changes and, repeated every turn, what must be preserved.
          </p>
          <Prompt label="OpenAI Cookbook template">
            Replace ONLY the white chairs with chairs made of wood. Preserve camera angle, room lighting,
            floor shadows, and surrounding objects. Keep all other aspects unchanged.
          </Prompt>
          <p>
            Without the preservation clause, I see drift in saturation, reflections, background. Without
            repeating it on every turn, the drift compounds. What I am still testing: how stable is
            preservation across six or more iterations on the same room? My informal answer so far is
            &ldquo;less stable than I want.&rdquo;
          </p>
        </Principle>

        <Principle num="06" tag="VI · Cadence" headline="I iterate one change per turn.">
          <p>
            Both fal.ai and Archtene arrived at this rule independently, and I keep landing in the same
            place. A single surgical edit (warm the lighting, mature the trees, soften the façade finish)
            beats a large rewrite every time. Combined with Pattern V: the preserve list stabilises what I
            already like while one knob moves. I think of it as CAD versioning. Wishing will not make it
            work.
          </p>
        </Principle>
      </div>

      <PullQuote>&ldquo;Is a prompt closer to a brief, or to a conversation?&rdquo;</PullQuote>

      <div className="mx-auto max-w-3xl px-6">
        <Principle num="07" tag="VII · Text" headline="I treat in-image text as typography, not content.">
          <p>
            For signage mockups, wayfinding studies, and presentation boards with captions, I put the
            literal string in quotes or ALL CAPS, specify font family (Inter, condensed sans, humanist
            serif), size, colour, placement, kerning, and add the bluntest line: &ldquo;render the text
            exactly once, no duplicate text, no extra words.&rdquo;
          </p>
          <p>
            Use quality high for small text. PixVerse&apos;s informal fifty-prompt test found roughly
            nineteen of twenty generations returned legible first-pass text on gpt-image-2 when prompted
            this way, a result I did not quite believe until I ran my own and saw similar numbers. Open
            question: does the 19 in 20 hold for non-Latin scripts? I have not tested.
          </p>
        </Principle>

        <Principle num="08" tag="VIII · Mode" headline="I name the render mode.">
          <p className="font-medium text-ink">Photorealistic, or architectural?</p>
          <p>
            &ldquo;Photorealistic&rdquo; for renders, &ldquo;architectural render&rdquo; for concept
            boards. Archtene&apos;s tested template (building type, style, materials, camera angle,
            lighting, site context, architectural render, realistic proportions, clean presentation,
            design-focused composition) produces the flat, even, competition-board aesthetic I want for
            concept work.
          </p>
          <p>
            &ldquo;Photorealistic candid photograph&rdquo; gives me client-facing heroes with weather and
            atmosphere. Both modes are there. I name which one I want. What I am noticing: the boundary
            between modes is fuzzier than I first thought; there is a hybrid sketch-render territory I keep
            stumbling into accidentally.
          </p>
        </Principle>
      </div>

      <Figure
        src="/articles/gpt-image-2/typography.jpg"
        alt="Typographic poster rendered by gpt-image-2"
        caption="Principle VII in evidence: five sizes, four colours, multiple weights, an East Melbourne Art Market subhead, all rendered legibly in one pass."
        spec="FIG. 2 · SINGLE PASS · HIGH QUALITY"
      />

      <div className="mx-auto max-w-3xl px-6">
        <Principle num="09" tag="IX · References" headline="I treat reference images as indexed inputs, addressed by number.">
          <p>
            For multi-reference compositions (a site photo plus a finishes board plus a furniture swatch)
            I label them explicitly in the prompt.
          </p>
          <Prompt>
            Image 1 is the existing room to preserve. Image 2 is the wood grain reference. Image 3 is the
            sofa reference. Apply the wood from Image 2 to the flooring in Image 1; replace the sofa in
            Image 1 with the sofa from Image 3. Match scale, cast shadows, and white balance to Image 1.
          </Prompt>
          <p>
            Gpt-image-2 accepts up to sixteen references per edit call and processes every one at high
            fidelity, though I have not yet pushed past eight on a single brief. Open question: at what
            number does the model start dropping references?
          </p>
        </Principle>

        <Principle num="10" tag="X · Scale" headline="I add scale cues. I do not trust proportion.">
          <p>
            The model does not render to construction dimensions and never will. Rendair&apos;s caution
            (the model tends to dream over geometry) has held up across everything I have tested. So I
            seed scale explicitly, with bodies and objects at known sizes:
          </p>
          <Prompt>
            One parked car at the curb, two pedestrians walking at adult height, café tables and chairs on
            the terrace, bicycles against the wall, garden lighting at knee height.
          </Prompt>
          <p>
            Human and object references calibrate the model&apos;s sense of storey height, door widths,
            and furniture depth more effectively than any numeric prompt I have tried.
          </p>
        </Principle>
      </div>

      {/* ── PART TWO ─────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead
        kicker="Part Two · Applied workflows"
        title="Three workflows. Where the patterns earn their keep."
        intro="A grammar without sentences is inert. Three workflows are where I have found gpt-image-2 actually slotting into my existing process: concept boards, photoreal renders, and material studies. None of these has replaced anything in my stack. All three have changed the cadence of how I get to a first sketch."
      />

      <div className="mx-auto max-w-3xl px-6 mt-12">
        <div className="mono-label text-terracotta">Workflow 01 · Concept boards</div>
        <h3 className="fluid-h2 mt-3 font-display font-bold tracking-tighter text-ink">
          The digital sketchpad. I generate four, then I commit.
        </h3>
      </div>
      <Text>
        <p className="mt-5">
          For early ideation, the model has become what Rendair calls a digital sketchpad. The
          Cookbook&apos;s n=4 parameter is what makes this work: four variants from one brief,
          side-by-side, costs me roughly sixteen cents and a couple of minutes. Faster than writing four
          separate prompts, and the variety is genuinely useful.
        </p>
        <Prompt label="A brief I tested recently">
          Open sketchbook on a designer&apos;s desk, hand-drawn ink studies of a civic building: design
          intent annotations, form exploration thumbnails, structure detail. Pencils, sharpener, ruler,
          coffee mug arranged casually around. Soft warm lighting, top-down three-quarter view.
          Photorealistic.
        </Prompt>
      </Text>
      <Figure
        src="/articles/gpt-image-2/sketchbook.jpg"
        alt="Photorealistic open sketchbook with hand-drawn studies"
        caption="From that exact brief. Annotations included, in a single pass. I am still surprised this works."
        spec="WORKFLOW 01 · HIGH QUALITY"
      />

      <div className="mx-auto max-w-3xl px-6 mt-8">
        <div className="mono-label text-terracotta">Workflow 02 · Photoreal renders</div>
        <h3 className="fluid-h2 mt-3 font-display font-bold tracking-tighter text-ink">
          The hybrid sketch-render: my favourite accident with this model.
        </h3>
      </div>
      <Text>
        <p className="mt-5">
          The output mode I keep returning to is what early users have started calling the hybrid
          sketch-render: half the image rendered photorealistically with full lighting and reflection,
          the other half left as graphite line drawing. The first time I got one I assumed it was a
          glitch. Then I worked out the prompt structure that triggers it, and now I use it deliberately
          for client-facing work where I want the design intent visible and the aesthetic rendered.
        </p>
        <Prompt label="The brief that gives me hybrid output">
          Photorealistic dusk view of a contemporary civic building with a vertical-fluted white facade,
          glowing warm interior, wet street reflections. The left third of the image transitions into a
          hand-drawn pencil sketch on white paper: visible graphite linework, ghosted trees, line-only
          buildings. Smooth blend through the middle third. Eye-level corner perspective.
        </Prompt>
        <p>
          For more conventional sketch-to-render, Archtene&apos;s recipe is the strongest documented
          workflow I have used for turning Revit, SketchUp, Rhino, or Archicad screenshots into
          client-ready renders.
        </p>
        <Prompt label="Standard sketch-to-render">
          Do a realistic render of this photo. Keep the same shapes and forms of buildings, fences,
          windows and doors. Add lush foliage to planter boxes and landscaping. Make materials feel
          natural and premium, less plastic.
        </Prompt>
      </Text>

      <div className="mx-auto max-w-3xl px-6 mt-10">
        <div className="mono-label text-terracotta">Workflow 02 · Continued</div>
        <h3 className="fluid-h2 mt-3 font-display font-bold tracking-tighter text-ink">
          Floorplan to perspective. I draw an arrow, I get a room.
        </h3>
      </div>
      <Text>
        <p className="mt-5">
          The Architizer method (drawing a POV arrow on a floorplan, uploading the annotated plan, and
          prompting the model) has become my fastest path from plan to client-facing perspective. Boyuan
          Chen, the gpt-image-2 research lead, described 3D-style perspective shifts and complex spatial
          reasoning through simple text prompts as a headline capability. I think she undersold it.
        </p>
        <Prompt label="After uploading the annotated plan">
          Create an image of a 3D space from the angle shown on the floorplan as if you are a human
          standing there.
        </Prompt>
      </Text>

      <PullQuote>
        &ldquo;If the sketch phase now costs four cents, what is the architect&apos;s role on Tuesday
        morning?&rdquo;
      </PullQuote>

      <div className="mx-auto max-w-3xl px-6 mt-2">
        <div className="mono-label text-terracotta">Workflow 03 · Material &amp; editorial studies</div>
        <h3 className="fluid-h2 mt-3 font-display font-bold tracking-tighter text-ink">
          When the model produces a finished spread.
        </h3>
      </div>
      <Text>
        <p className="mt-5">
          Material studies are where I run most of my edit-endpoint cycles: change one finish, hold the
          room, look. But the poster below is the output that genuinely surprised me. A complete editorial
          layout with hero render, four-panel analysis grid, design-evolution sequence, key-data sidebar,
          and full typographic hierarchy, generated in a single call from a structured brief. I do not yet
          know what to make of this.
        </p>
        <Prompt label="The brief that produced it">
          Single editorial poster, dark background. Hero: photorealistic Lego scale model of City Hall
          London at night, reflected in water. Left column: title block, four core concept icons with
          body text. Below hero: four-panel analysis grid (geometric form, solar performance, natural
          ventilation, spatial experience). Bottom: design evolution sequence, key-data sidebar.
          Typography: condensed sans titles, humanist sans body. Render text exactly as specified.
        </Prompt>
      </Text>
      <Figure
        src="/articles/gpt-image-2/poster.jpg"
        alt="Single-pass editorial poster generated by gpt-image-2"
        caption="Eight visual elements, two columns of body copy, a consistent typographic system, one pass. I have not yet been able to reproduce this consistently, but the fact it is possible at all has changed what I think gpt-image-2 is actually for."
        spec="WORKFLOW 03 · SINGLE PASS"
      />

      {/* ── HONEST LIMITS ────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead
        kicker="The honest limits · Where it breaks"
        title="A CAD tool it is not. But the failures are interesting."
        intro="The places gpt-image-2 falls down are also the places I have learned the most about what it actually is. Five failure modes I have run into repeatedly, each followed by what I think it is telling me. None of these are settled."
      />
      <div className="mx-auto max-w-3xl px-6 mt-10">
        {limits.map((l) => (
          <div key={l.n} className="grid grid-cols-[2rem_1fr] gap-x-4 py-7 border-t border-ink/10">
            <span className="mono-label text-terracotta pt-1">{l.n}</span>
            <div className="space-y-3">
              <p className="text-ink">
                <span className="font-semibold">{l.lead}</span> {l.body}
              </p>
              <p className="text-ink-soft leading-relaxed">
                <span className="mono-label-sm text-ink-soft">What that might mean — </span>
                {l.mean}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── PARAMETER DISCIPLINE ──────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="Parameter discipline" title="A note on quality settings." />
      <div className="mx-auto max-w-3xl px-6 mt-8 grid md:grid-cols-2 gap-x-10 gap-y-5 text-ink-soft leading-relaxed">
        <div className="space-y-4">
          <p className="font-medium text-ink">When I spend.</p>
          <p>
            I use quality high whenever text appears in the image, when small-scale details (door
            hardware, stair nosings, tile grout) carry the design, or when the render is client-facing. I
            drop to medium for fast comparison sprints. Low when I am ideating at volume and do not yet
            care about polish.
          </p>
        </div>
        <div className="space-y-4">
          <p className="font-medium text-ink">Aspect and ratio.</p>
          <p>
            I stay at or below 2560×1440 for reliable output. Above that is experimental territory I have
            not fully mapped. Landscape for exteriors and wide interior shots, portrait for towers and
            tall interior details, square only for social and mood-board tiles. All edges must be
            multiples of 16. Ratio capped at 3:1.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
        {qualityCards.map((q) => (
          <div key={q.label} className="bg-paper p-5 flex flex-col gap-2">
            <span className="mono-label text-ink-soft">{q.label}</span>
            <span className="font-mono text-[13px] text-terracotta">{q.value}</span>
          </div>
        ))}
      </div>

      {/* ── CLOSING ──────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead
        kicker="Closing the loop · What I am still asking"
        title="The patterns are stabilising. The questions are not."
        intro="The ten patterns earned their place in my practice. The three workflows are now where I reach first for early-stage work. None of that means I have understood gpt-image-2, only that I have found the edges of what I tested."
      />
      <div className="mx-auto max-w-3xl px-6 mt-8">
        <ul className="space-y-5">
          {closingQuestions.map((q, i) => (
            <li key={i} className="flex gap-4 text-ink-soft leading-relaxed">
              <span className="mono-label-sm text-terracotta pt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-ink-soft leading-relaxed">
          If you are working with the model and finding things I have not, I would genuinely like to know.
          Send notes via chiangning.net. I am collecting field reports for a follow-up.
        </p>
        <p className="mt-5 text-ink-soft leading-relaxed">
          All feature images here are gpt-image-2 outputs. None retouched. Each one taught me something I
          did not know about prompting before I made it.
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-6 mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
        <div className="mono-label text-ink-soft">Field Guide № 01 · April 2026 · End, for now</div>
        <Link
          href="/resources"
          className="group mono-label inline-flex items-center gap-2 text-ink hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to resources
        </Link>
      </div>
    </article>
  );
}
