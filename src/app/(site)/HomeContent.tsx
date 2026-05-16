"use client";
import Link from 'next/link';

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";

import { VideoPlayer } from "@/components/VideoPlayer";

export default function Home() {
  return (
    <div className="flex-1 ml-0 md:ml-[33.333333%] lg:ml-80 min-h-screen bg-surface grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-1">
      {/* AI Tile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative group overflow-hidden bg-surface-low md:col-span-2 lg:col-span-2 aspect-[4/3]"
      >
        <Link href="/architecture" className="block w-full h-full relative z-10">
          <VideoPlayer
            src="https://res.cloudinary.com/dphq33wah/video/upload/v1775630027/Portrait4_jyncpd.mp4"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] absolute inset-0 z-0"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
          {/* Text Overlay */}
          <div className="absolute inset-0 p-8 flex items-end z-20 pointer-events-none">
            <h2 className="text-white font-sans font-normal text-base md:text-lg leading-snug max-w-[95%]">
              Unlock AI in Architecture & Project Management without compromising Human Accountability & Creativity
            </h2>
          </div>
        </Link>
      </motion.div>

      {/* Existing Projects */}
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: (index + 1) * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative group overflow-hidden bg-surface-low aspect-[4/3]"
        >
          <Link href={`/project/${project.id}`} className="block w-full h-full relative z-10">
            {project.heroVideo ? (
              <VideoPlayer
                src={project.heroVideo}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] absolute inset-0 z-0"
              />
            ) : (
              <img
                src={project.heroImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] absolute inset-0 z-0"
              />
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            
            {/* Title */}
            <div className="absolute bottom-0 left-0 p-8 w-full z-20 pointer-events-none">
              <h2 className="text-white font-sans font-normal text-base md:text-lg leading-snug max-w-[95%]">
                {project.title}
              </h2>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
