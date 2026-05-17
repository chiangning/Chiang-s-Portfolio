"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { VideoPlayer } from "@/components/VideoPlayer";

const capabilities = [
  { num: "01", title: "End-to-End Delivery",  body: "From initial planning and funding submissions through design, documentation, construction, and post-delivery close-out. You get continuity and accountability at every stage." },
  { num: "02", title: "Value Engineering",    body: "I optimise documentation and design to achieve significant budget efficiencies. A 15% reduction on tender price is not an anomaly — it's a methodology." },
  { num: "03", title: "Design Governance",    body: "I manage consultant coordination and maintain consistent delivery processes across multiple concurrent projects." },
  { num: "04", title: "Technical Proficiency", body: "Advanced application of Archicad, Revit, AutoCAD, SketchUp, Twinmotion, and Enscape from concept through to construction." },
];

const VIDEO_SRC = "https://res.cloudinary.com/dphq33wah/video/upload/v1775630027/Portrait2_ycdaev.mp4";

export function ArchitectureContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex-1 ml-0 md:ml-[33.333333%] lg:ml-80 min-h-screen bg-surface overflow-y-auto"
    >

      {/* ── Label strip ─────────────────────────────────────────────── */}
      <div className="h-12 lg:h-14 flex items-center gap-4 px-6 md:px-8 lg:px-10 border-b border-white/[0.07]">
        <span className="w-5 h-px bg-primary flex-shrink-0" />
        <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-primary whitespace-nowrap">
          Practice
        </span>
        <span className="hidden md:inline text-[9px] font-sans uppercase tracking-[0.18em] text-white/35 whitespace-nowrap ml-2">
          Registered Architect · ARBV · Melbourne, VIC · 20+ Years · Education · Commercial · Residential
        </span>
      </div>

      {/* ── Hero video ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden w-full h-[50vw] md:h-[38vw] lg:h-[58vh]">
        <VideoPlayer
          src={VIDEO_SRC}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-10">
          <h1 className="font-sans font-bold tracking-tight text-white leading-[0.90]
                         text-[32px] md:text-[44px] lg:text-[52px]">
            <span
              className="block font-normal italic text-white/55 mb-1.5
                         text-[14px] md:text-[18px] lg:text-[20px]"
              style={{ fontFamily: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif' }}
            >
              Unlock
            </span>
            Archi&shy;tecture
          </h1>
        </div>
      </div>

      {/* ── Two text boxes — 1 col mobile / 2 col tablet + desktop ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* Box 1 — subtitle + both body paragraphs */}
        <div className="px-6 py-8 md:px-8 lg:px-10 lg:py-10 flex flex-col gap-4
                        lg:border-t lg:border-white/[0.07]">
          <p
            className="text-[15px] lg:text-[16px] leading-snug text-white/60 mb-1"
            style={{ fontFamily: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif', fontStyle: "italic" }}
          >
            Your project. Your budget. Unlocked.
          </p>
          <p
            className="text-[13px] leading-[1.55] text-on-surface-variant"
            style={{ textAlign: "justify", textAlignLast: "left", hyphens: "auto" } as React.CSSProperties}
          >
            I'm a Registered Architect (ARBV) and Senior Project Architect with 20+ years of experience delivering complex built environments across education, commercial, and residential sectors. I work with one clear goal: to help you extract maximum value from every stage of your project.
          </p>
          <p
            className="text-[13px] leading-[1.55] text-on-surface-variant"
            style={{ textAlign: "justify", textAlignLast: "left", hyphens: "auto" } as React.CSSProperties}
          >
            Through meticulous documentation optimisation and strategic planning, I have a proven track record of achieving tender prices up to 15% below budget — without compromising quality or compliance with planning schemes, the NCC, or Australian Standards.
          </p>
        </div>

        {/* Box 2 — capabilities, text styled to match body */}
        <div className="px-6 py-8 md:px-8 lg:px-10 lg:py-10 flex flex-col gap-5
                        lg:border-t lg:border-l lg:border-white/[0.07]">
          {capabilities.map((cap) => (
            <div key={cap.num} className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-[9px] font-sans tabular-nums text-primary/50 tracking-widest flex-shrink-0">
                  {cap.num}
                </span>
                <span className="text-[13px] font-sans font-medium text-white leading-snug">
                  {cap.title}
                </span>
              </div>
              <p
                className="text-[13px] leading-[1.55] text-on-surface-variant pl-[18px]"
                style={{ textAlign: "justify", textAlignLast: "left", hyphens: "auto" } as React.CSSProperties}
              >
                {cap.body}
              </p>
            </div>
          ))}

          <Link
            href="/resources"
            className="text-[9px] font-sans uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-colors mt-2"
          >
            View All Resources →
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
