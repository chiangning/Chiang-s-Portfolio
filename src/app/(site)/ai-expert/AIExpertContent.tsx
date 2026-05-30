"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { VideoPlayer } from "@/components/VideoPlayer";

const capabilities = [
  { num: "01", title: "Rapid Concept Iteration",   body: "AI image generators and spatial algorithms to quickly visualise and test multiple architectural massing and façade options — exploring more configurations in less time." },
  { num: "02", title: "Design Optimisation",        body: "AI-driven analysis to evaluate environmental factors, daylighting, and spatial efficiency during the conceptual phase, enabling more informed design decisions." },
  { num: "03", title: "Workflow Automation",         body: "Streamlining the transition from conceptual AI sketches to workable architectural directions, reducing manual drafting time and accelerating project timelines." },
  { num: "04", title: "Enhanced Visualisation",     body: "AI upscaling and style transfer to produce compelling, high-quality conceptual renderings for stakeholder presentations and design reviews." },
];

const VIDEO_SRC = "https://res.cloudinary.com/dphq33wah/video/upload/v1775630024/Portrait3_yzbgod.mp4";

export function AIExpertContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex-1 ml-0 md:ml-[33.333333%] lg:ml-80 min-h-screen bg-surface overflow-y-auto"
    >

      {/* ── Label strip ─────────────────────────────────────────────── */}
      <div className="h-12 lg:h-14 flex items-center gap-4 px-6 md:px-8 lg:px-10 border-b border-ink/10">
        <span className="w-5 h-px bg-primary flex-shrink-0" />
        <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-primary whitespace-nowrap">
          Technology
        </span>
        <span className="hidden md:inline text-[9px] font-sans uppercase tracking-[0.18em] text-ink/55 whitespace-nowrap ml-2">
          AI Integration · Workflow Automation · Concept Generation · Architecture & PM
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
            AI Ex&shy;pertise
          </h1>
        </div>
      </div>

      {/* ── Two text boxes — 1 col mobile / 2 col tablet + desktop ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* Box 1 — subtitle + both body paragraphs */}
        <div className="px-6 py-8 md:px-8 lg:px-10 lg:py-10 flex flex-col gap-4
                        lg:border-t lg:border-ink/10">
          <p
            className="text-[15px] lg:text-[16px] leading-snug text-ink mb-1"
            style={{ fontFamily: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif', fontStyle: "italic" }}
          >
            I help architects & PMs unlock productivity through AI — without replacing human accountability or creativity.
          </p>
          <p
            className="text-[13px] leading-[1.55] text-on-surface-variant"
            style={{ textAlign: "justify", textAlignLast: "left", hyphens: "auto" } as React.CSSProperties}
          >
            In an increasingly complex built environment, leveraging cutting-edge technology is essential for pushing the boundaries of design. My approach integrates emerging AI tools to rapidly generate, evaluate, and refine architectural concepts, significantly accelerating the early stages of design.
          </p>
          <p
            className="text-[13px] leading-[1.55] text-on-surface-variant"
            style={{ textAlign: "justify", textAlignLast: "left", hyphens: "auto" } as React.CSSProperties}
          >
            By utilising AI for fast iterations, I enable teams to explore a wider range of spatial configurations, material palettes, and environmental responses in a fraction of the time — leading to more informed decision-making and more innovative architectural solutions before moving into traditional documentation phases.
          </p>
        </div>

        {/* Box 2 — capabilities */}
        <div className="px-6 py-8 md:px-8 lg:px-10 lg:py-10 flex flex-col gap-5
                        lg:border-t lg:border-l lg:border-ink/10">
          {capabilities.map((cap) => (
            <div key={cap.num} className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-2">
                <span className="text-[9px] font-sans tabular-nums text-ink tracking-widest flex-shrink-0">
                  {cap.num}
                </span>
                <span className="text-[13px] font-sans font-medium text-ink leading-snug">
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
