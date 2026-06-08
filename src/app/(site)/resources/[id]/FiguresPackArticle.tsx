"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
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

function SectionHead({ kicker, title }: { kicker: string; title: React.ReactNode }) {
  return (
    <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
      <Kicker>{kicker}</Kicker>
      <h2 className="fluid-h2 mt-5 font-display font-bold tracking-tighter text-ink">{title}</h2>
    </Reveal>
  );
}

const Text = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-3xl px-6 space-y-5 text-ink-soft leading-relaxed mt-5">{children}</div>
);

const uses = [
  { title: "Architectural diagrams", body: "Drop figures into plans, sections, and elevations to give scale and life. Cleaner than tracing, faster than a CAD block library." },
  { title: "Collages and concept boards", body: "Populate mood boards and concept imagery with people that read as design intent, not stock photography." },
  { title: "Presentation boards", body: "Add human scale to competition panels and client decks. The flat illustrated style sits well over renders and line work alike." },
];

const samples = [
  "/articles/figures/sample-1.png",
  "/articles/figures/sample-2.png",
  "/articles/figures/sample-3.png",
  "/articles/figures/sample-4.png",
  "/articles/figures/sample-5.png",
  "/articles/figures/sample-6.png",
  "/articles/figures/sample-7.png",
  "/articles/figures/sample-8.png",
  "/articles/figures/sample-9.png",
  "/articles/figures/sample-10.png",
];

export function FiguresPackArticle() {
  return (
    <article className="bg-paper text-ink pb-24">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-3xl px-6 pt-10 md:pt-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mono-label text-ink-soft">
          <span className="text-terracotta">Free Download</span>
          <span>·</span>
          <span>Architecture</span>
          <span>·</span>
          <span>Resources</span>
        </div>

        <div className="mt-4 mono-label text-ink-soft">By Chiang Ning · chiangning.net</div>
      </header>

      <figure className="mx-auto max-w-4xl px-6 mt-8 md:mt-10">
        <img
          src="/articles/figures/promo.jpg"
          alt="A collection of over 100 illustrated human figures as transparent PNG cutouts"
          className="w-full h-auto block bg-paper-soft"
        />
      </figure>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <Text>
        <p>
          Scale figures are one of those small things that quietly carry a drawing. They give a plan its
          sense of size, a render its sense of life, and a board its sense of place. But good ones are
          surprisingly hard to come by: stock photo people look out of place over flat line work, and CAD
          block libraries tend to be dated and stiff.
        </p>
        <p>
          So I put together a set of more than one hundred illustrated human figures and I am giving them
          away. Flat, contemporary, and neutral enough to sit in almost any drawing. Every figure is a
          transparent PNG, ready to drop straight onto a plan, section, collage, or presentation board.
        </p>
        <p>No sign-up, no email wall. Download the pack and use it on your projects.</p>
      </Text>

      {/* ── DOWNLOAD ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-10">
        <a
          href="/articles/figures/architect-figures-pack.zip"
          download
          className="group inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 mono-label hover:bg-ink-deep transition-colors"
        >
          <Download className="w-4 h-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-y-0.5" />
          Download the pack (PNG · 5 MB)
        </a>
        <p className="mt-3 mono-label-sm text-ink-soft normal-case tracking-normal">
          103 transparent PNG figures in a single zip. Free for personal and commercial project use.
        </p>
      </div>

      {/* ── SAMPLES ──────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="A look inside" title="A few of the figures." />
      <div className="mx-auto max-w-4xl px-6 mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
        {samples.map((src, i) => (
          <div key={src} className="bg-paper-soft border border-ink/10 aspect-[3/4] flex items-center justify-center p-1.5">
            <img src={src} alt={`Illustrated figure sample ${i + 1}`} className="max-h-full max-w-full w-auto object-contain" />
          </div>
        ))}
      </div>

      {/* ── HOW TO USE ───────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="How to use them" title="Built for the work, not the wall." />
      <div className="mx-auto max-w-3xl px-6 mt-8">
        {uses.map((u, i) => (
          <div
            key={u.title}
            className={`grid grid-cols-[2rem_1fr] gap-x-4 py-6 ${
              i > 0 ? "border-t border-ink/10" : ""
            }`}
          >
            <span className="mono-label-sm text-terracotta pt-1">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="font-display text-[16px] font-bold tracking-tighter text-ink mb-1">{u.title}</div>
              <p className="text-[14px] leading-relaxed text-ink-soft">{u.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── LICENCE / CLOSING ────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="The fine print" title="Free to use. A small ask." />
      <Text>
        <p>
          Use the figures freely on your own projects, in diagrams, collages, presentation boards, client
          decks, and competition panels. You do not need to credit me, though it is always appreciated.
        </p>
        <p className="text-ink-soft" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
          The one thing I ask: do not repackage or resell the figures as your own asset pack. Beyond that,
          they are yours to use. If they end up in something you are proud of, I would love to see it.
        </p>
      </Text>

      <div className="mx-auto max-w-3xl px-6 mt-10">
        <a
          href="/articles/figures/architect-figures-pack.zip"
          download
          className="group inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 mono-label hover:bg-ink-deep transition-colors"
        >
          <Download className="w-4 h-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-y-0.5" />
          Download the pack (PNG · 5 MB)
        </a>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
        <div className="mono-label text-ink-soft">Free Download · Architecture · 2026</div>
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
