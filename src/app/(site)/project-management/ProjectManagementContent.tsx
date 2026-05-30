"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { VideoPlayer } from "@/components/VideoPlayer";

const capabilities = [
  { num: "01", title: "Portfolio & Program Oversight",   body: "Whole-of-portfolio visibility ensuring every project aligns with organisational priorities and risk controls. You always know where your capital is going and why." },
  { num: "02", title: "Cash Flow & Capital Planning",    body: "Schedule management connected directly to cash flow requirements, delivering clear cost reporting to manage drawn-down profiles against contingencies." },
  { num: "03", title: "Procurement & Contract Strategy", body: "From pre-qualification to execution of AS-Suite and bespoke agreements — protecting your commercial interests and aligning supply chains with project goals." },
  { num: "04", title: "Stakeholder Negotiation",         body: "Central point of contact for clients and authorities, resolving critical pathway blockers and maintaining consistently high reporting and communication standards." },
];

const VIDEO_SRC = "https://res.cloudinary.com/dphq33wah/video/upload/v1775630027/Portrait4_jyncpd.mp4";

export function ProjectManagementContent() {
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
          Delivery
        </span>
        <span className="hidden md:inline text-[9px] font-sans uppercase tracking-[0.18em] text-ink/55 whitespace-nowrap ml-2">
          PMP · Portfolio & Program · Capital Planning · Governance · Major Projects
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
            Project&shy; Management
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
            Your portfolio. Your capital. Unlocked.
          </p>
          <p
            className="text-[13px] leading-[1.55] text-on-surface-variant"
            style={{ textAlign: "justify", textAlignLast: "left", hyphens: "auto" } as React.CSSProperties}
          >
            I'm a Project Management Professional (PMP) specialising in portfolio oversight, capital planning, and project governance for large-scale developments. I work with one clear goal: to bring discipline, clarity, and strategic alignment to your most complex projects.
          </p>
          <p
            className="text-[13px] leading-[1.55] text-on-surface-variant"
            style={{ textAlign: "justify", textAlignLast: "left", hyphens: "auto" } as React.CSSProperties}
          >
            As General Manager (Project) for <Link href="/project/tropicana-miyu" className="text-primary hover:text-ink transition-colors">Tropicana Corporation</Link> and Senior Development Manager for <Link href="/project/pavilion-damansara-heights" className="text-primary hover:text-ink transition-colors">Pavilion Damansara Heights</Link>, I held direct accountability for concurrent capital portfolios — balancing resources, cash flow, and delivery priorities to align with both strategic and financial objectives at every stage.
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
