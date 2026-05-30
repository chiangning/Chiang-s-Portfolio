"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LineReveal } from "@/components/Reveal";

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
      className="bg-paper"
    >

      {/* ── Label strip ─────────────────────────────────────────────── */}
      <div className="h-12 lg:h-14 flex items-center gap-4 px-6 md:px-8 lg:px-10 border-b border-ink/10">
        <span className="w-5 h-px bg-primary flex-shrink-0" />
        <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-primary whitespace-nowrap">
          Practice
        </span>
        <span className="hidden md:inline text-[9px] font-sans uppercase tracking-[0.18em] text-ink/55 whitespace-nowrap ml-2">
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

      {/* ── Edge-to-edge animated rule ─────────────────────────────── */}
      <LineReveal />

      {/* ── Two text boxes — 1 col mobile / 2 col tablet + desktop ─── */}
      <div className="mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2">

        {/* Box 1 — subtitle + both body paragraphs */}
        <div className="px-6 py-8 md:px-8 lg:px-14 lg:py-12 flex flex-col gap-4">
          <p
            className="text-[15px] lg:text-[16px] leading-snug text-ink mb-1"
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
        <div className="px-6 py-8 md:px-8 lg:px-14 lg:py-12 flex flex-col gap-5
                        lg:border-l lg:border-ink/10">
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

      {/* ── Selected work — featured projects ──────────────────────── */}
      <LineReveal />

      <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-8 lg:px-14 lg:py-14">
        <div className="flex items-baseline gap-3 mb-8 lg:mb-10">
          <span className="w-5 h-px bg-primary flex-shrink-0" />
          <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-primary whitespace-nowrap">
            Selected Work
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 lg:gap-x-8">

          {/* Christway College Wyndham Gymnasium */}
          <Link href="/project/christway-college" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-soft">
              <img
                src="https://res.cloudinary.com/dphq33wah/image/upload/v1774306131/Generated_Image_January_26_2026_-_3_00PM_x4grbl.jpg"
                alt="Christway College Wyndham Gymnasium"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <span className="mt-4 block text-[9px] font-sans uppercase tracking-[0.2em] text-primary">
              Educational Architecture
            </span>
            <h3 className="mt-2 font-sans font-bold tracking-tighter text-ink text-[18px] md:text-[20px] leading-[1.05] group-hover:text-primary transition-colors">
              Christway College Wyndham Gymnasium
            </h3>
            <p className="mt-1 text-[11px] text-ink/55">
              Wyndham Vale, Victoria · 2023 - 2026 · 3,400 sqm
            </p>
            <p
              className="mt-3 text-[13px] leading-[1.55] text-on-surface-variant"
              style={{ textAlign: "justify", textAlignLast: "left", hyphens: "auto" } as React.CSSProperties}
            >
              As Lead Architect, I guided the Wyndham Vale campus from masterplan through to its new Gymnasium. I resolved the staged growth strategy and site services backbone, led the statutory process to have the Bushfire Prone Area designation excised from title, and packaged the scheme to secure Block Grant Authority funding through Independent Schools Victoria. The Gymnasium was taken from concept through full documentation and tender, coordinating a specialist consultant team, with rigorous value engineering delivering a tender outcome that beat budget.
            </p>
          </Link>

          {/* Christway College Kingston Renewal */}
          <Link href="/project/christway-college-kingston-renewal" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-soft">
              <img
                src="https://res.cloudinary.com/dphq33wah/image/upload/v1775001490/Generated_Image_April_01_2026_-_10_56AM_meoaqn.jpg"
                alt="Christway College Kingston Renewal"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <span className="mt-4 block text-[9px] font-sans uppercase tracking-[0.2em] text-primary">
              Educational Architecture
            </span>
            <h3 className="mt-2 font-sans font-bold tracking-tighter text-ink text-[18px] md:text-[20px] leading-[1.05] group-hover:text-primary transition-colors">
              Christway College Kingston Renewal
            </h3>
            <p className="mt-1 text-[11px] text-ink/55">
              Kingston, Victoria · Ongoing · Campus Masterplan
            </p>
            <p
              className="mt-3 text-[13px] leading-[1.55] text-on-surface-variant"
              style={{ textAlign: "justify", textAlignLast: "left", hyphens: "auto" } as React.CSSProperties}
            >
              As Lead Architect, I run an ongoing engagement across two tracks: a strategic masterplan for the campus and a targeted renewal program. Rather than defaulting to new build, I audited the existing campus to unlock underused space, delivering the adaptive reuse of a former church hall into teaching and collaboration rooms under an AS4902 Design and Construct contract. I also developed a campus-wide material palette and pattern book to keep design consistent as the school grows incrementally.
            </p>
          </Link>

          {/* Camberwell Library */}
          <Link href="/project/camberwell-library" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-soft">
              <img
                src="https://res.cloudinary.com/dphq33wah/image/upload/v1774749658/Generated_Image_March_29_2026_-_1_00PM_kzniqa.jpg"
                alt="Camberwell Library & Office Development"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
              />
            </div>
            <span className="mt-4 block text-[9px] font-sans uppercase tracking-[0.2em] text-primary">
              Adaptive Reuse & Fitout
            </span>
            <h3 className="mt-2 font-sans font-bold tracking-tighter text-ink text-[18px] md:text-[20px] leading-[1.05] group-hover:text-primary transition-colors">
              Camberwell Library & Office Development
            </h3>
            <p className="mt-1 text-[11px] text-ink/55">
              Melbourne, Australia · 2011 - 2013 · 6,500 sqm
            </p>
            <p
              className="mt-3 text-[13px] leading-[1.55] text-on-surface-variant"
              style={{ textAlign: "justify", textAlignLast: "left", hyphens: "auto" } as React.CSSProperties}
            >
              I led the sensitive refurbishment and adaptive reuse of the heritage Camberwell Music Hall into a contemporary three-level civic facility housing municipal offices, the Camberwell Library, and community spaces. Leading the design team through documentation and construction, I coordinated a broad consultant group and navigated the dual demands of heritage sensitivity and contemporary DDA accessibility within existing fabric. Completed in 2012, the project was featured in the Australian National Construction Review.
            </p>
          </Link>

        </div>
      </div>
    </motion.div>
  );
}
