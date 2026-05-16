"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { resources } from "@/data/resources";

import { VideoPlayer } from "@/components/VideoPlayer";

export function AIExpertContent() {
  const aiResources = resources.filter(r => r.tags?.includes("AI"));

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
              <VideoPlayer src="https://res.cloudinary.com/dphq33wah/video/upload/v1775630024/Portrait3_yzbgod.mp4" className="w-full h-auto block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 p-8 md:p-12 flex items-end">
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
                  <span className="italic text-[#9ca3af] font-normal pr-2" style={{ fontFamily: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif' }}>Unlock</span>
                  AI Expertise
                </h1>
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-on-surface-variant">
              <p className="text-2xl leading-relaxed mb-8 text-white font-sans font-normal">
                "I help architects & PMs unlock productivity through AI augmentation without replacing human accountability and creativity"
              </p>
              
              <p className="leading-relaxed mb-6">
                In an increasingly complex built environment, leveraging cutting-edge technology is essential for pushing the boundaries of design. My approach integrates emerging AI tools to rapidly generate, evaluate, and refine architectural concepts, significantly accelerating the early stages of design.
              </p>
              
              <p className="leading-relaxed mb-6">
                By utilizing AI for fast iterations, I enable teams to explore a wider range of spatial configurations, material palettes, and environmental responses in a fraction of the time. This allows for more informed decision-making and ultimately leads to more innovative and optimized architectural solutions before moving into traditional documentation phases.
              </p>
              
              <h2 className="text-3xl font-display font-semibold text-white mt-12 mb-6">AI Capabilities</h2>
              <ul className="list-disc pl-6 space-y-4 mb-8">
                <li><strong>Rapid Concept Iteration:</strong> Utilizing AI image generators and spatial algorithms to quickly visualize and test multiple architectural massing and facade options.</li>
                <li><strong>Design Optimization:</strong> Applying AI-driven analysis to evaluate environmental factors, daylighting, and spatial efficiency during the conceptual phase.</li>
                <li><strong>Workflow Automation:</strong> Streamlining the transition from conceptual AI sketches to workable architectural directions, reducing manual drafting time.</li>
                <li><strong>Enhanced Visualization:</strong> Leveraging AI upscaling and style transfer to produce compelling, high-quality conceptual renderings for stakeholder presentations.</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-8 mt-12 lg:mt-0">
            <div>
              <h3 className="text-sm font-bold tracking-[0.15em] text-primary uppercase mb-6">
                Related Articles
              </h3>
              <div className="flex flex-col gap-8">
                {aiResources.map(resource => (
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
