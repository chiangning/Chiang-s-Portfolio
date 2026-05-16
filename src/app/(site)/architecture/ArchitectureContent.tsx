"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { resources } from "@/data/resources";

import { VideoPlayer } from "@/components/VideoPlayer";

export function ArchitectureContent() {
  const architectureResources = resources.filter(r => r.tags?.includes("Architecture"));

  return (
    <div className="flex-1 ml-0 md:ml-[33.333333%] lg:ml-80 min-h-screen bg-surface p-6 md:p-12 lg:p-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-16">
          <div className="lg:col-span-9 flex flex-col gap-12">
            <div className="w-full overflow-hidden shadow-2xl relative">
              <VideoPlayer src="https://res.cloudinary.com/dphq33wah/video/upload/v1775630027/Portrait2_ycdaev.mp4" className="w-full h-auto block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 p-8 md:p-12 flex items-end">
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                  <span className="italic text-[#9ca3af] font-normal pr-2" style={{ fontFamily: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif' }}>Unlock</span>
                  Architecture
                </h1>
              </div>
            </div>

            <div className="prose prose-invert prose-sm max-w-none text-on-surface-variant">
              <p className="text-xl leading-snug mb-4 text-white font-sans font-normal">
                Your project. Your budget. Unlocked.
              </p>
              
              <p className="leading-relaxed mb-3">
                I'm a Registered Architect (ARBV) and Senior Project Architect with 20+ years of experience delivering complex built environments across education, commercial, and residential sectors. I work with one clear goal: to help you extract maximum value from every stage of your project.
              </p>
              
              <h2 className="text-4xl font-display font-bold text-white tracking-tight mt-8 mb-3">What I bring to your project:</h2>
              <p className="leading-relaxed mb-3">
                Through meticulous documentation optimisation and strategic planning, I have a proven track record of achieving tender prices up to 15% below budget — without compromising quality or compliance with planning schemes, the NCC, or Australian Standards.
              </p>
              <p className="leading-relaxed mb-3">
                My portfolio spans major education infrastructure, including <Link href="/project/christway-college" className="text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">Christway College</Link> and John Monash Science School, large-scale commercial developments, and bespoke residential projects. This breadth means I bring a comprehensive understanding of diverse architectural typologies to every engagement.
              </p>
              
              <h2 className="text-4xl font-display font-bold text-white tracking-tight mt-8 mb-3">How I unlock value across the full project lifecycle:</h2>
              <ul className="list-disc pl-6 space-y-4 mb-8">
                <li><strong>End-to-End Delivery —</strong> I lead projects from initial planning and funding submissions (including VISBGA) through design, documentation, construction, and post-delivery close-out. You get continuity and accountability at every stage.</li>
                <li><strong>Value Engineering —</strong> I optimise documentation and design to achieve significant budget efficiencies without sacrificing quality. A 15% reduction on tender price is not an anomaly; it's a methodology.</li>
                <li><strong>Design Governance —</strong> I manage consultant coordination and maintain consistent delivery processes across multiple concurrent projects, so complexity never becomes an excuse for poor outcomes.</li>
                <li><strong>Technical Proficiency —</strong> Advanced application of Archicad, Revit, AutoCAD, SketchUp, Twinmotion, and Enscape means I bring design excellence and communication clarity from concept through to construction.</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-8 mt-12 lg:mt-0">
            <div>
              <h3 className="text-sm font-bold tracking-[0.15em] text-primary uppercase mb-6">
                Related Articles
              </h3>
              <div className="flex flex-col gap-8">
                {architectureResources.map(resource => (
                  <Link key={resource.id} href={`/resources/${resource.id}`} className="group block relative w-full aspect-video overflow-hidden mb-3 bg-surface-variant z-10">
                    <img src={resource.image} alt={resource.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0 z-0" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 p-4 flex flex-col justify-end z-20 pointer-events-none">
                      <h4 className="text-lg font-sans font-medium text-white group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                      </h4>
                      <p className="text-xs text-white/70 mt-1">{resource.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
