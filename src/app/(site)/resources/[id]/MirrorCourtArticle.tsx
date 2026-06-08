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

function Scene({
  num,
  title,
  img,
  alt,
  move,
  body,
}: {
  num: string;
  title: string;
  img: string;
  alt: string;
  move: string;
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
        <p
          className="text-[15px] md:text-base text-ink mb-3"
          style={{ fontFamily: SERIF, fontStyle: "italic" }}
        >
          {move}
        </p>
        <p className="text-ink-soft leading-relaxed">{body}</p>
      </div>
    </Reveal>
  );
}

const scenes = [
  {
    num: "01",
    title: "The Concept",
    img: "/articles/mirror-court/concept.jpg",
    alt: "Axonometric presentation board of the Mirror Court pavilion",
    move: "Slow dolly into the axonometric, settling on the central void.",
    body: "Open on the idea itself, a mirror-finish roof floating over Fitzroy Gardens, drawn as a presentation board. Let the drawing breathe before it becomes real.",
  },
  {
    num: "02",
    title: "The Logic",
    img: "/articles/mirror-court/logic.jpg",
    alt: "Cross-section through the pavilion showing the elms rising through the roof plane",
    move: "Gentle left-to-right pan across the section, resolving on the central elm.",
    body: "The cross-section reveals the mechanism: three elms rising through the plane, sunlight raining through perforations, the garden doubled in still water.",
  },
  {
    num: "03",
    title: "The Approach",
    img: "/articles/mirror-court/approach.jpg",
    alt: "Visitors arriving on foot through the elms toward the silver roof",
    move: "Track forward with the visitors, drifting toward the threshold.",
    body: "Cut to the ground. We arrive on foot through the elms, St Patrick's spires behind, the silver roof hovering low ahead, an invitation, not a wall.",
  },
  {
    num: "04",
    title: "The Heart",
    img: "/articles/mirror-court/heart.jpg",
    alt: "Interior court with light scattered across bluestone and an elm climbing through the roof",
    move: "Rise from the light-dappled bluestone up the trunk to the canopy and the open void.",
    body: "Inside now. The perforations scatter a constellation of light across the court; a single elm climbs through the roof into open sky. Stillness.",
  },
  {
    num: "05",
    title: "The Doubling",
    img: "/articles/mirror-court/doubling.jpg",
    alt: "The polished mirror soffit doubling the court, columns, trees and people in reflection",
    move: "Crane up off the water and tilt to the ceiling, revealing the mirrored world overhead.",
    body: "The payoff. Look up, the polished soffit doubles the court, the columns, the trees, the people. Above and below become one continuous reflected garden.",
  },
  {
    num: "06",
    title: "Nightfall",
    img: "/articles/mirror-court/nightfall.jpg",
    alt: "Aerial view of the glowing perforated roof reading as a lantern in the gardens at night",
    move: "Slow aerial orbit over the glowing roof as day turns to night.",
    body: "The finale. After dark the perforations ignite into a field of stars and the pavilion reads as a lantern in the gardens, the end product, fully alive.",
  },
];

export function MirrorCourtArticle() {
  return (
    <article className="bg-paper text-ink pb-24">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-3xl px-6 pt-10 md:pt-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mono-label text-ink-soft">
          <span className="text-terracotta">Architecture</span>
          <span>·</span>
          <span>AI</span>
          <span>·</span>
          <span>Storyboard</span>
          <span>·</span>
          <span>3 min read</span>
        </div>

        <h1 className="mt-6 fluid-display font-display font-bold tracking-tighter text-ink">
          The Mirror Court
        </h1>
        <p className="mt-5 fluid-lead max-w-2xl text-ink-soft">
          An open-air art pavilion of reflection and light. A short film tracing the project from drawing
          to dusk, in Fitzroy Gardens, Melbourne.
        </p>

        <div className="mt-6 mono-label text-ink-soft">By Chiang Ning · chiangning.net</div>
      </header>

      <figure className="mx-auto max-w-4xl px-6 mt-10 md:mt-14">
        <img
          src="/articles/mirror-court/concept.jpg"
          alt="The Mirror Court pavilion, an axonometric presentation board"
          className="w-full h-auto block bg-paper-soft"
        />
      </figure>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <Text>
        <p>
          A storyboard is where an idea learns to move. Before a single frame is rendered, the sequence
          has to hold: what the camera sees, in what order, and why each move earns the next. This is the
          six-beat storyboard for a short film about the Mirror Court, a mirror-finish roof floating over
          Fitzroy Gardens on a forest of slender columns.
        </p>
        <p>
          Each scene below pairs the frame with its camera move and its intent. The film runs from the
          drawing on the wall to the pavilion alive at dusk.
        </p>
      </Text>

      {/* ── STORYBOARD ───────────────────────────────────────────── */}
      <LineReveal className="mt-14" />
      <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
        <Kicker>The storyboard · Six scenes</Kicker>
        <h2 className="fluid-h1 mt-6 font-display font-bold tracking-tighter text-ink">
          From drawing to dusk.
        </h2>
      </Reveal>

      {scenes.map((s) => (
        <Scene key={s.num} {...s} />
      ))}

      {/* ── CLOSING ──────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
        <Kicker>The bottom line</Kicker>
      </Reveal>
      <Text>
        <p className="text-ink-soft" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
          A building you can film before you build it is a building you understand. The storyboard is the
          cheapest place to test whether an idea can carry an audience from the first frame to the last.
        </p>
      </Text>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
        <div className="mono-label text-ink-soft">Architecture · Storyboard · 2026</div>
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
