"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal, LineReveal } from "@/components/Reveal";
import { ImageCarousel } from "@/components/ImageCarousel";

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

function Phase({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-[5rem_1fr] gap-x-6 gap-y-3 py-9 border-t border-ink/10">
      <div className="font-display text-5xl md:text-6xl font-bold tracking-tighter leading-none text-ink tabular-nums">
        {num}
      </div>
      <div>
        <h3 className="fluid-h2 font-display font-bold tracking-tighter text-ink mb-4">{title}</h3>
        <div className="space-y-4 text-ink-soft leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

const carousel = Array.from({ length: 11 }, (_, i) => `/articles/anchor-strategy/img-${String(i + 1).padStart(2, "0")}.jpg`);

export function AnchorStrategyArticle() {
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
          <span>6 min read</span>
        </div>

        <h1 className="mt-6 fluid-display font-display font-bold tracking-tighter text-ink">
          The Anchor Strategy
        </h1>
        <p className="mt-5 fluid-lead max-w-2xl text-ink-soft">
          A procedural workflow for locking down spatial geometry and aesthetic variables across multiple
          generative outputs.
        </p>

        <div className="mt-6 mono-label text-ink-soft">By Chiang Ning · chiangning.net</div>
      </header>

      {/* ── CAROUSEL ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-6 mt-10 md:mt-14">
        <ImageCarousel
          images={carousel}
          className="aspect-[4/3] rounded-sm"
          objectFit="cover"
        />
        <p className="mt-3 mono-label-sm text-ink-soft normal-case tracking-normal">
          One project, one geometry: a four-vault glass greenhouse held consistent across master shots,
          interiors, sections, and exploded diagrams. All outputs generated with gpt-image-2.
        </p>
      </div>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <Text>
        <p>
          Getting a generative model to produce a single, compelling early-stage massing option is
          trivial. Getting it to hold that exact same geometry across an interior view, an exploded
          isometric, and a construction section is notoriously difficult.
        </p>
        <p>
          Without a rigid structural methodology, the model treats each prompt independently, resulting in
          melted architecture and shifting geometries. The solution is the{" "}
          <span className="text-ink font-medium">Anchor Strategy</span>: a controlled process of
          establishing a primary truth, validating it with a secondary truth, and using those constraints
          to govern the rest of the drawing set.
        </p>
      </Text>

      {/* ── DISCLAIMER ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-8">
        <div className="border-l-2 border-terracotta bg-paper-soft px-5 py-4 md:px-6 md:py-5">
          <div className="mono-label-sm text-terracotta mb-2">Professional disclaimer</div>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-ink-soft">
            This workflow is not meant to replace the rigorous architectural process, strict CAD modelling,
            or physically accurate BIM rendering. AI outputs inherently carry imperfections, hallucinations,
            and spatial inconsistencies. Generative tools are useful for rapid ideation and stylised
            diagramming, but traditional CAD and professional architectural judgment still go a long way.
            They remain the final arbiters of constructability and spatial truth.
          </p>
        </div>
      </div>

      {/* ── WORKFLOW ─────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
        <Kicker>The workflow · Five phases</Kicker>
        <h2 className="fluid-h1 mt-6 font-display font-bold tracking-tighter text-ink">
          Establish a truth, validate it, then govern the set.
        </h2>
      </Reveal>

      <div className="mx-auto max-w-3xl px-6 mt-6">
        <Phase num="01" title="Define the global variables">
          <p>
            Before generating a single image, you must define the constraints. Write down the exact
            building footprint, the structural logic, the material hex codes, and the art style. Do not
            leave room for the model to guess the aesthetic.
          </p>
          <ul className="space-y-2">
            {[
              ["Footprint", "e.g., 20m x 20m."],
              ["Structure", "e.g., four continuous side-by-side semi-circular glass vaults."],
              ["Palette", "e.g., #2B2B2B dark matte steel, #A0D2DB translucent glass."],
              ["Style", "e.g., post-digital architectural collage, flat paper textures."],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-3">
                <span className="text-terracotta shrink-0">→</span>
                <span>
                  <span className="text-ink font-medium">{k}:</span> {v}
                </span>
              </li>
            ))}
          </ul>
        </Phase>

        <Phase num="02" title="Shortcut the process: the skill file">
          <p>
            You do not need to rewrite prompts from scratch every time. The most efficient way to manage
            this workflow is by using a dedicated{" "}
            <span className="text-ink font-medium">skill Markdown (.md) file</span>. This file acts as your
            master template, pre-loading the AI with all your required camera angles, architectural drawing
            types, and shot lists.
          </p>
          <p>
            By feeding the AI your skill file along with your initial design references, you effectively
            train the model on your specific project. It learns to extract your global variables from a
            single reference image and automatically maps those exact design specs, footprints, and texture
            palettes across its pre-generated list of shots. This ensures the prompt it writes for a master
            perspective is mechanically consistent with the prompt it writes for a macro detail shot.
          </p>
        </Phase>

        <Phase num="03" title="Generate the primary anchor">
          <p>
            Your first output is the primary anchor. This is usually the{" "}
            <span className="text-ink font-medium">master exterior shot</span> (like a central one-point
            perspective). This image establishes the baseline truth of the project&apos;s massing, light,
            and material application.
          </p>
          <p>
            Do not move on until this single image perfectly reflects your global variables. If the primary
            anchor is flawed, every subsequent image will inherit those flaws.
          </p>
        </Phase>

        <Phase num="04" title="Generate the supporting anchor">
          <p>
            Once the primary anchor is locked, you must immediately generate the supporting anchor. This is
            typically the <span className="text-ink font-medium">interior spatial shot</span> or a{" "}
            <span className="text-ink font-medium">cross-section</span>.
          </p>
          <p>
            The goal here is verification. You are testing if the logic established in the primary anchor
            holds up from the inside out. It is critical to ensure that these two main anchors are as
            consistent with each other as possible. Look at the structural junctions, the repetition of the
            vaults, and the scale figures. If the interior contradicts the exterior footprint, you must
            refine your global variables and re-prompt.
          </p>
        </Phase>

        <Phase num="05" title="Expand the drawing set">
          <p>
            Only after the primary and supporting anchors are visually reconciled do you move on to the rest
            of the set. Because the model has now learned the strict parameters through your repeated
            refinement of the anchors, you can safely branch out into technical diagrams.
          </p>
          <p>Using the exact same variable text block structured by your skill file, you can now generate:</p>
          <ul className="space-y-2">
            {[
              "Exploded axonometric diagrams",
              "Tri-style transition views (line work to render)",
              "Facade assembly details",
              "Site analysis overlays",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-terracotta shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Phase>
      </div>

      {/* ── CLOSING ──────────────────────────────────────────────── */}
      <LineReveal className="mt-12" />
      <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
        <Kicker>The bottom line</Kicker>
      </Reveal>
      <div className="mx-auto max-w-3xl px-6 mt-6">
        <p className="fluid-h1 font-display font-bold tracking-tighter text-ink leading-[1.05]">
          The prompt does not do the design thinking.
        </p>
      </div>
      <Text>
        <p className="text-ink-soft" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
          It simply enforces the architectural logic so the outputs can actually support a real consultant
          or client conversation.
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
