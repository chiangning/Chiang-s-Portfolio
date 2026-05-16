"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { resources } from "@/data/resources";

import { VideoPlayer } from "@/components/VideoPlayer";

export function ProjectManagementContent() {
  const pmResources = resources.filter(r => r.tags?.includes("Project Management"));

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
              <VideoPlayer src="https://res.cloudinary.com/dphq33wah/video/upload/v1775630027/Portrait4_jyncpd.mp4" className="w-full h-auto block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 p-8 md:p-12 flex items-end">
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-relaxed">
                  <span className="italic text-[#9ca3af] font-normal pr-2" style={{ fontFamily: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif' }}>Unlock</span>
                  <span className="md:hidden">Project Management</span>
                  <span className="hidden md:inline">Project<br />Management</span>
                </h1>
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-on-surface-variant">
              <p className="text-2xl leading-relaxed mb-8 text-white font-sans font-normal">
                Your portfolio. Your capital. Unlocked.
              </p>
              
              <p className="leading-relaxed mb-6">
                I'm a Project Management Professional (PMP) specialising in portfolio oversight, capital planning, and project governance for large-scale developments. I work with one clear goal: to bring discipline, clarity, and strategic alignment to your most complex projects.
              </p>
              
              <h2 className="text-3xl font-display font-semibold text-white mt-12 mb-6">What I bring to your organisation:</h2>
              <p className="leading-relaxed mb-6">
                As General Manager (Project) for <Link href="/project/tropicana-miyu" className="text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">Tropicana Corporation</Link> and Senior Development Manager for <Link href="/project/pavilion-damansara-heights" className="text-primary hover:text-white transition-colors underline decoration-primary/30 underline-offset-4">Pavilion Damansara Heights</Link>, I have held direct accountability for the governance and oversight of concurrent capital portfolios. My focus is on balancing resources, cash flow, and delivery priorities to ensure your projects align with both strategic and financial objectives — at every stage.
              </p>
              <p className="leading-relaxed mb-8">
                I excel in standardising project management frameworks, directing capital prioritisation workshops, and maintaining rigorous oversight across cost, time, quality, and risk. The result is consistent, accountable delivery from inception to completion.
              </p>
              
              <h2 className="text-3xl font-display font-semibold text-white mt-12 mb-6">How I unlock value across your portfolio:</h2>
              <ul className="list-disc pl-6 space-y-4 mb-8">
                <li><strong>Portfolio & Program Oversight —</strong> I provide whole-of-portfolio visibility to ensure every project aligns with organisational priorities and risk controls. You always know where your capital is going and why.</li>
                <li><strong>Cash Flow & Capital Planning —</strong> I connect schedule management directly to cash flow requirements, delivering clear cost reporting to manage drawn-down profiles against contingencies.</li>
                <li><strong>Procurement & Contract Strategy —</strong> I manage everything from pre-qualification to the execution of AS-Suite and bespoke agreements, protecting your commercial interests and aligning supply chains with your project goals.</li>
                <li><strong>Stakeholder Negotiation & Governance —</strong> I act as the central point of contact for clients, resolving critical pathway blockers and ensuring that reporting and communication standards remain consistently high.</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-8 mt-12 lg:mt-0">
            <div>
              <h3 className="text-sm font-bold tracking-[0.15em] text-primary uppercase mb-6">
                Related Articles
              </h3>
              <div className="flex flex-col gap-8">
                {pmResources.map(resource => (
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
