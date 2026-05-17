"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { resources } from "@/data/resources";
import { VideoPlayer } from "@/components/VideoPlayer";

const capabilities = [
  {
    title: "End-to-End Delivery",
    body: "I lead projects from initial planning and funding submissions (including VISBGA) through design, documentation, construction, and post-delivery close-out. You get continuity and accountability at every stage.",
  },
  {
    title: "Value Engineering",
    body: "I optimise documentation and design to achieve significant budget efficiencies without sacrificing quality. A 15% reduction on tender price is not an anomaly — it's a methodology.",
  },
  {
    title: "Design Governance",
    body: "I manage consultant coordination and maintain consistent delivery processes across multiple concurrent projects, so complexity never becomes an excuse for poor outcomes.",
  },
  {
    title: "Technical Proficiency",
    body: "Advanced application of Archicad, Revit, AutoCAD, SketchUp, Twinmotion, and Enscape means I bring design excellence and communication clarity from concept through to construction.",
  },
];

export function ArchitectureContent() {
  const architectureResources = resources
    .filter(r => r.tags?.includes("Architecture"))
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex-1 ml-0 md:ml-[33.333333%] lg:ml-80 h-screen overflow-x-auto overflow-y-hidden bg-surface flex flex-row"
      style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
    >

      {/* ── Panel 1: Hero ──────────────────────────────── */}
      <div className="relative flex-shrink-0 w-[44vw] h-full overflow-hidden">
        <VideoPlayer
          src="https://res.cloudinary.com/dphq33wah/video/upload/v1775630027/Portrait2_ycdaev.mp4"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* right-edge fade into next panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
        {/* meta top-left */}
        <div className="absolute top-8 left-8">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-white/40">
            Registered Architect · ARBV
          </span>
        </div>
        {/* title bottom-left */}
        <div className="absolute bottom-10 left-10">
          <h1 className="font-sans text-5xl font-bold tracking-tight text-white leading-none">
            <span
              className="block text-3xl font-normal italic text-[#9ca3af] mb-1"
              style={{ fontFamily: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif' }}
            >
              Unlock
            </span>
            Architecture
          </h1>
        </div>
      </div>

      {/* ── Panel 2: Intro text in two columns ─────────── */}
      <div className="flex-shrink-0 w-[620px] h-full flex flex-col justify-center px-14 py-16 border-r border-white/[0.07]">
        {/* section marker */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-6 h-px bg-primary" />
          <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-primary">Practice</span>
        </div>

        {/* subtitle */}
        <p
          className="text-[22px] leading-snug text-white mb-10"
          style={{ fontFamily: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif', fontStyle: 'italic' }}
        >
          Your project.<br />Your budget.<br />Unlocked.
        </p>

        {/* two justified columns */}
        <div className="flex gap-8">
          <p
            className="text-[14px] leading-[1.55] text-on-surface-variant flex-1"
            style={{ textAlign: 'justify', textAlignLast: 'left', hyphens: 'auto' } as React.CSSProperties}
          >
            I'm a Registered Architect (ARBV) and Senior Project Architect with 20+ years of experience delivering complex built environments across education, commercial, and residential sectors. I work with one clear goal: to help you extract maximum value from every stage of your project.
          </p>
          <p
            className="text-[14px] leading-[1.55] text-on-surface-variant flex-1"
            style={{ textAlign: 'justify', textAlignLast: 'left', hyphens: 'auto' } as React.CSSProperties}
          >
            Through meticulous documentation optimisation and strategic planning, I have a proven track record of achieving tender prices up to 15% below budget — without compromising quality or compliance with planning schemes, the NCC, or Australian Standards.
          </p>
        </div>

        {/* portfolio note */}
        <p
          className="text-[14px] leading-[1.55] text-on-surface-variant mt-8 pt-8 border-t border-white/[0.07]"
          style={{ textAlign: 'justify', textAlignLast: 'left', hyphens: 'auto' } as React.CSSProperties}
        >
          My portfolio spans major education infrastructure, including{" "}
          <Link href="/project/christway-college" className="text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-2">
            Christway College
          </Link>{" "}
          and John Monash Science School, large-scale commercial developments, and bespoke residential projects — bringing a comprehensive understanding of diverse architectural typologies to every engagement.
        </p>
      </div>

      {/* ── Panel 3: Capabilities 2×2 ──────────────────── */}
      <div className="flex-shrink-0 w-[620px] h-full flex flex-col justify-center px-14 py-16 border-r border-white/[0.07]">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-6 h-px bg-primary" />
          <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-primary">How I unlock value</span>
        </div>

        <h2
          className="text-[28px] font-normal text-white leading-tight mb-10"
          style={{ fontFamily: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif' }}
        >
          Across the full<br />project lifecycle
        </h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-8">
          {capabilities.map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[9px] font-sans tabular-nums text-primary/50 tracking-widest">0{i + 1}</span>
                <h3 className="text-[12px] font-sans font-semibold text-white uppercase tracking-[0.08em]">
                  {item.title}
                </h3>
              </div>
              <p
                className="text-[13px] leading-[1.55] text-on-surface-variant"
                style={{ textAlign: 'justify', textAlignLast: 'left', hyphens: 'auto' } as React.CSSProperties}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Panel 4: Related Articles ───────────────────── */}
      <div className="flex-shrink-0 w-[380px] h-full flex flex-col justify-center px-12 py-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-6 h-px bg-primary" />
          <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-primary">Related Articles</span>
        </div>

        <div className="flex flex-col gap-6">
          {architectureResources.map(resource => (
            <Link
              key={resource.id}
              href={`/resources/${resource.id}`}
              className="group flex flex-col gap-2"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-surface-variant">
                <img
                  src={resource.image}
                  alt={resource.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-sans uppercase tracking-[0.15em] text-primary">
                  {resource.tags?.[0]}
                </span>
                <h4 className="text-[13px] font-sans font-medium text-white group-hover:text-primary transition-colors leading-snug">
                  {resource.title}
                </h4>
                <p className="text-[10px] text-on-surface-variant">{resource.date}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.07]">
          <Link
            href="/resources"
            className="text-[9px] font-sans uppercase tracking-[0.2em] text-primary hover:text-white transition-colors"
          >
            View All Resources →
          </Link>
        </div>
      </div>

      {/* trailing breathing room */}
      <div className="flex-shrink-0 w-16 h-full" />

    </motion.div>
  );
}
