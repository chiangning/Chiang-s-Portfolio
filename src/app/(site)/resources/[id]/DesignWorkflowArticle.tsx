"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal, LineReveal } from "@/components/Reveal";

const SERIF = 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 h-px bg-terracotta flex-shrink-0" />
      <span className="mono-label text-terracotta">{children}</span>
    </div>
  );
}

const Text = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-3xl px-6 space-y-5 text-ink-soft leading-relaxed mt-5">{children}</div>
);

function PromptBlock({
  label,
  model,
  children,
}: {
  label: string;
  model: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-4 border-l-2 border-terracotta bg-paper-soft px-5 py-4">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="mono-label-sm text-terracotta">{label}</span>
        <span className="mono-label-sm text-ink-soft">{model}</span>
      </div>
      <p className="font-mono text-[12.5px] md:text-[13px] leading-relaxed text-ink">{children}</p>
    </div>
  );
}

function Station({
  num,
  title,
  img,
  alt,
  prompt,
  transition,
  body,
}: {
  num: string;
  title: string;
  img: string;
  alt: string;
  prompt: string;
  transition?: string;
  body: React.ReactNode;
}) {
  return (
    <Reveal className="pt-10 mt-12 border-t-2 border-ink">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-4xl md:text-5xl font-bold tracking-tighter leading-none text-ink tabular-nums">
            {num}
          </span>
          <h3 className="fluid-h2 font-display font-bold tracking-tighter text-ink">{title}</h3>
        </div>
      </div>

      <figure className="mx-auto max-w-4xl px-6 mt-6">
        <img src={img} alt={alt} className="w-full h-auto block bg-paper-soft" />
      </figure>

      <div className="mx-auto max-w-3xl px-6 mt-5">
        <p className="text-ink-soft leading-relaxed">{body}</p>
        <PromptBlock label="Image prompt" model="GPT Image 2">
          {prompt}
        </PromptBlock>
        {transition && (
          <p className="text-[14px] text-ink-soft mt-3" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
            <span className="mono-label-sm text-ink-soft not-italic mr-2">Transition · Kling 3</span>
            {transition}
          </p>
        )}
      </div>
    </Reveal>
  );
}

const stations = [
  {
    num: "01",
    title: "Site, from above",
    img: "/articles/design-workflow/station-01.jpg",
    alt: "Cleaned photoreal aerial of the heritage corner site in Melbourne",
    body: "Start with the real place. A satellite aerial of the corner site, cleaned up into a believable photograph so the model has an honest base to reason from before any design move is made.",
    prompt: "high quality photorealistic aerial photograph. bright sunny day. remove all text",
    transition: "camera pushes in. style transition naturally.",
  },
  {
    num: "02",
    title: "Aerial to CAD model",
    img: "/articles/design-workflow/station-02.jpg",
    alt: "The aerial transformed into a Nordic-minimalist CAD line model with the heritage building in pale blue",
    body: "The photograph becomes a drawing. The model converts the aerial into a clean CAD-style line render, isolating the subject heritage building in pale blue so it reads as the object of the study, with the rest of the block held as neutral context.",
    prompt: "transform this into cad model. highly detailed cad model. subject building is the heritage 3 storey building at the corner of two street (red outline). identify the whole of subject building in light pale blue colour. melbourne tram is waiting at traffic light at the junction to the right side of the building. nordic minimalist style. remove red outline. maintain image composition",
    transition: "video prompt",
  },
  {
    num: "03",
    title: "Test the massing",
    img: "/articles/design-workflow/station-03.jpg",
    alt: "Three levels of bright yellow plain massing added above the heritage building, set back one metre",
    body: "The first design decision, tested as raw volume. Three plain levels in bright yellow sit above the heritage facade, set back a metre to keep the original parapet reading. No windows, no detail yet, just the envelope, so the height and setback can be judged on their own.",
    prompt: "add 3 levels plain massing with no windows or any facade articulation above the existing blue building (10m high). use red line as guide only. new floors are set back 1m away from the heritage building, preserving the integrity of the heritage facade. new addition in bright yellow colour. maintain composition.",
    transition: "video prompt",
  },
  {
    num: "04",
    title: "Develop the addition",
    img: "/articles/design-workflow/station-04.jpg",
    alt: "The yellow massing developed with recessed balconies, sliding doors and windows, still in CAD style",
    body: "The massing earns its articulation. The yellow box is developed into recessed balconies, sliding doors, and a glazing rhythm, while the drawing holds its CAD style so the design language stays consistent with the previous step.",
    prompt: "move camera to focus on the subject building. the yellow boxes are further developed with yellow recessed balconies, yellow sliding doors, windows (yellow). no greenery on balcony. plain concrete roof. maintain cad model design style.",
    transition: "camera descends to pedestrian eye level. cad model dissolves into a photoreal render at golden hour.",
  },
  {
    num: "05",
    title: "First photoreal view",
    img: "/articles/design-workflow/station-05.jpg",
    alt: "Pedestrian-level two-point perspective at golden hour, heritage bluestone below, bronze panels above",
    body: "The CAD study dissolves into render. A two-point pedestrian perspective at golden hour resolves the materials for the first time: heritage bluestone below, bronze aluminium panels above, warm light in the apartments, and the Melbourne tram holding the scene in place.",
    prompt: "next scene. 2 point professional architectural perspective. camera view from pedestrian height. golden hour light, beautiful heritage bluestone facade, bronze colour aluminium panels. people inside apartments. melbourne tram on the right side of the scene.",
    transition: "camera pushes in toward the heritage corner. tighten to an ultra close-up on the entrance.",
  },
  {
    num: "06",
    title: "The entrance",
    img: "/articles/design-workflow/station-06.jpg",
    alt: "Ultra close-up on the heritage corner entrance at dusk, warm interior glow through the arched doorway",
    body: "Down to the detail that sells the building. An ultra close-up on the corner entrance: the arched heritage doorway, the warm lobby glow, the wet bluestone footpath, people at the threshold. This is where a render stops being a massing study and starts being a place.",
    prompt: "2 point professional architectural perspective, pedestrian level perspective. ultra close up on the entrance at the heritage corner. pedestrian.",
    transition: "camera tilts up from the entrance to reveal the full corner and rooftop addition.",
  },
  {
    num: "07",
    title: "Look up",
    img: "/articles/design-workflow/station-07.jpg",
    alt: "Low-angle pedestrian view up the heritage corner with the bronze addition above against the dusk sky",
    body: "A low-angle hero shot. Looking up the corner, the full height reads against the dusk sky, the bronze addition stacked cleanly over the bluestone base, the whole composition pulling the eye from street to roofline.",
    prompt: "next scene. low-angle pedestrian view looking up at the heritage corner. golden hour light, beautiful heritage bluestone facade, bronze colour aluminium panel addition above, people inside apartments. show the full height of the building against the dusk sky.",
    transition: "camera pushes into the upper levels for a close-up on the bronze apartment balconies.",
  },
  {
    num: "08",
    title: "Live in it",
    img: "/articles/design-workflow/station-08.jpg",
    alt: "Tight close-up on the bronze aluminium apartments, layered balconies and full-height glazing with people inside",
    body: "The addition at human scale. A tight close-up on the bronze apartments shows the layered balconies and full-height glazing working as homes, with warm interiors and people inside. The detail that makes the upper levels feel inhabited, not just clad.",
    prompt: "next scene. tight close-up on the bronze aluminium panel apartments at the corner. golden hour light, warm interior glow, people inside apartments on the balconies and living rooms. show the layered balconies and full-height glazing in detail.",
    transition: "camera pulls back and rises to a high aerial three-quarter view of the whole building.",
  },
  {
    num: "09",
    title: "The whole, at dusk",
    img: "/articles/design-workflow/station-09.jpg",
    alt: "Final high aerial three-quarter view of the completed corner building at dusk, in its city block",
    body: "The closing frame. A high aerial three-quarter view sets the finished building back into its block at dusk: heritage base, bronze crown, warm windows, the street and tram below. The design has travelled from a satellite screenshot to a resolved scheme, and every step is on the record.",
    prompt: "final scene. high aerial three-quarter view of the full corner building at dusk. golden hour light, heritage bluestone facade below, bronze colour aluminium panel addition above, warm lit windows with people inside apartments. show the rooftop, the surrounding city block, street, parked cars and tram. photorealistic.",
  },
];

export function DesignWorkflowArticle() {
  return (
    <article className="bg-paper text-ink pb-24">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-3xl px-6 pt-10 md:pt-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mono-label text-ink-soft">
          <span className="text-terracotta">AI</span>
          <span>·</span>
          <span>Architecture</span>
          <span>·</span>
          <span>Workflow</span>
          <span>·</span>
          <span>7 min read</span>
        </div>

        <h1 className="mt-6 fluid-display font-display font-bold tracking-tighter text-ink">
          A Design Development Visualisation Workflow
        </h1>
        <p className="mt-5 fluid-lead max-w-2xl text-ink-soft">
          One heritage corner building, taken from a satellite screenshot to a resolved scheme in nine
          scenes. Every step a prompt, every transition a camera move.
        </p>

        <div className="mt-6 mono-label text-ink-soft">By Chiang Ning · chiangning.net</div>
      </header>

      <figure className="mx-auto max-w-4xl px-6 mt-10 md:mt-14">
        <img
          src="/articles/design-workflow/station-09.jpg"
          alt="The completed heritage corner building with rooftop addition at dusk"
          className="w-full h-auto block bg-paper-soft"
        />
      </figure>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <Text>
        <p>
          Most AI architecture imagery is a single beautiful frame with no history. This is the opposite:
          a continuous design-development sequence where each image is generated from the one before it,
          so the building&apos;s logic carries through from site to scheme.
        </p>
        <p>
          The subject is a three-storey heritage building on a Melbourne corner, with a proposed rooftop
          addition. The pipeline runs in nine scenes. Each scene is an image generated with{" "}
          <span className="text-ink font-medium">GPT Image 2</span> from a short, specific prompt, and the
          camera move between scenes is a video transition rendered with{" "}
          <span className="text-ink font-medium">Kling 3</span>. The result is a film of the design
          thinking, from a cleaned-up satellite aerial through a colour-coded massing study to a photoreal
          dusk render.
        </p>
      </Text>

      {/* ── DISCLAIMER ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-8">
        <div className="border-l-2 border-terracotta bg-paper-soft px-5 py-4 md:px-6 md:py-5">
          <div className="mono-label-sm text-terracotta mb-2">A note on method</div>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-ink-soft">
            This is a rapid ideation and communication workflow, not a substitute for CAD modelling, BIM,
            or professional architectural judgment. AI outputs carry imperfections and spatial
            inconsistencies. The value here is speed of thinking and the legibility of a design story, not
            constructable accuracy. Traditional documentation remains the final arbiter of spatial truth.
          </p>
        </div>
      </div>

      {/* ── STATIONS ─────────────────────────────────────────────── */}
      <LineReveal className="mt-14" />
      <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
        <Kicker>The pipeline · Nine scenes</Kicker>
        <h2 className="fluid-h1 mt-6 font-display font-bold tracking-tighter text-ink">
          From satellite screenshot to resolved scheme.
        </h2>
      </Reveal>

      {stations.map((s) => (
        <Station key={s.num} {...s} />
      ))}

      {/* ── CLOSING ──────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
        <Kicker>The bottom line</Kicker>
      </Reveal>
      <Text>
        <p>
          The point is not that AI designed the building. It did not. The point is that a clear,
          step-by-step prompt sequence can carry one design idea, consistently, from the first screenshot
          to the final frame, fast enough to put a real scheme in front of a client or consultant the same
          afternoon.
        </p>
        <p className="text-ink-soft" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
          The design judgment is still mine. The workflow just lets the idea move at the speed of the
          conversation.
        </p>
      </Text>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
        <div className="mono-label text-ink-soft">AI · Architecture · Workflow · 2026</div>
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
