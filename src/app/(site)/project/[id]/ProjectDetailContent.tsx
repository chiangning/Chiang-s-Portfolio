"use client";

import Link from "next/link";
import { ArrowLeft, Share2, Bookmark, Check } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ProjectData } from "@/data/projects";
import { VideoPlayer } from "@/components/VideoPlayer";

export function ProjectDetailContent({ project }: { project: ProjectData }) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-1 ml-0 md:ml-[33.333333%] lg:ml-80 min-h-screen bg-surface">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 w-full h-16 bg-surface/80 backdrop-blur-xl flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Link 
            href={
              project.category.includes('Project Management') 
                ? '/project-management' 
                : '/architecture'
            } 
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-sm font-medium text-white">{project.title}</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={handleShare}
            className="text-on-surface-variant hover:text-white transition-colors relative group"
            title="Share URL"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
            {copied && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
          <button 
            onClick={() => setBookmarked(prev => !prev)}
            className="text-on-surface-variant hover:text-white transition-colors"
            title="Bookmark"
          >
            <Bookmark className={`w-5 h-5 transition-colors ${bookmarked ? 'fill-primary text-primary' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative p-0 flex flex-col justify-center"
      >
        <div className="relative z-10 w-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full aspect-[16/9] bg-surface-low overflow-hidden relative"
          >
            {project.heroVideo ? (
              <VideoPlayer 
                src={project.heroVideo}
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={project.heroImage} 
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}

            {/* Gradient overlay for text readability (kept for subtle vignette) */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/50 via-surface/0 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="relative z-10 px-16 md:px-32 pb-32 pt-16 max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-12"
        >
          {/* Hero Title Area inside Content */}
          <div className="flex flex-col gap-4">
            <span className="text-[13px] font-[Helvetica,Arial,sans-serif] uppercase tracking-[0.08em] text-on-surface-variant">
              {project.contentTitle}
            </span>
            <h1 className="font-charter text-[36px] md:text-[56px] font-normal leading-[1.0] tracking-[-0.01em] text-white">
              {project.title}
            </h1>
          </div>

          {project.contentParagraphs.length > 0 && (
            <div className="text-on-surface-variant text-[15px] leading-[1.45] max-w-[640px] font-sans space-y-6">
              {project.contentParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {project.contentList && (
            <div className="mt-4 max-w-[640px]">
              <ul className="space-y-8">
                {project.contentList.items.map((item, i) => (
                  <li key={i} className="flex flex-col gap-2">
                    <span className="font-[Helvetica,Arial,sans-serif] text-[14px] font-bold text-white uppercase tracking-[0.04em]">
                      {item.title}
                    </span>
                    <span className="font-sans text-[14px] leading-[1.45] text-on-surface-variant">
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Right Column: Info Box */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-4 lg:col-start-9"
        >
          <div className="bg-surface-low p-10 flex flex-col gap-8">
            <h3 className="text-xs font-bold tracking-[0.15em] text-primary uppercase">
              Project<br />Information
            </h3>
            
            <div className="flex flex-col gap-6">
              <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                <span className="font-[Helvetica,Arial,sans-serif] text-[12px] uppercase tracking-[0.1em] text-on-surface-variant">
                  Location
                </span>
                <span className="font-sans text-[15px] text-white font-normal whitespace-pre-line leading-snug">
                  {project.info.location}
                </span>
              </div>
              <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                <span className="font-[Helvetica,Arial,sans-serif] text-[12px] uppercase tracking-[0.1em] text-on-surface-variant">
                  Year
                </span>
                <span className="font-sans text-[15px] text-white font-normal leading-snug">
                  {project.info.year}
                </span>
              </div>
              <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                <span className="font-[Helvetica,Arial,sans-serif] text-[12px] uppercase tracking-[0.1em] text-on-surface-variant">
                  Client
                </span>
                <span className="font-sans text-[15px] text-white font-normal whitespace-pre-line leading-snug">
                  {project.info.client}
                </span>
              </div>
              <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                <span className="font-[Helvetica,Arial,sans-serif] text-[12px] uppercase tracking-[0.1em] text-on-surface-variant">
                  Scale
                </span>
                <span className="font-sans text-[15px] text-white font-normal leading-snug">
                  {project.info.scale}
                </span>
              </div>
              {project.info.role && (
                <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                  <span className="font-[Helvetica,Arial,sans-serif] text-[12px] uppercase tracking-[0.1em] text-on-surface-variant">
                    Role
                  </span>
                  <span className="font-sans text-[15px] text-white font-normal leading-snug">
                    {project.info.role}
                  </span>
                </div>
              )}
              {project.info.deliveryPartner && (
                <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                  <span className="font-[Helvetica,Arial,sans-serif] text-[12px] uppercase tracking-[0.1em] text-on-surface-variant">
                    Delivery Partner
                  </span>
                  <span className="font-sans text-[15px] text-white font-normal leading-snug">
                    {project.info.deliveryPartner}
                  </span>
                </div>
              )}
              {project.info.mainContractor && (
                <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                  <span className="font-[Helvetica,Arial,sans-serif] text-[12px] uppercase tracking-[0.1em] text-on-surface-variant">
                    Main Contractor
                  </span>
                  <span className="font-sans text-[15px] text-white font-normal leading-snug">
                    {project.info.mainContractor}
                  </span>
                </div>
              )}
              {project.info.procurement && (
                <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                  <span className="font-[Helvetica,Arial,sans-serif] text-[12px] uppercase tracking-[0.1em] text-on-surface-variant">
                    Procurement
                  </span>
                  <span className="font-sans text-[15px] text-white font-normal leading-snug">
                    {project.info.procurement}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Middle Video Section */}
      {project.middleVideo && (
        <section className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-[21/9] bg-surface-low overflow-hidden"
          >
            <VideoPlayer 
              src={project.middleVideo}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>
      )}

      {/* Image Gallery */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {project.gallery.map((item, index) => {
            const isVideo = item.endsWith('.mp4');
            
            // Pattern for masonry-like grid
            let colSpan = "md:col-span-6";
            let heightClass = "h-[600px]";
            
            if (index === 0) {
              colSpan = "md:col-span-7";
              heightClass = "h-[600px] md:h-[700px]";
            } else if (index === 1) {
              colSpan = "md:col-span-5";
              heightClass = "h-[600px] md:h-[700px]";
            } else {
              const patternIndex = (index - 2) % 7;
              switch (patternIndex) {
                // Row of 3 (mix of landscape and portrait)
                case 0:
                  colSpan = "md:col-span-5";
                  heightClass = "h-[400px] md:h-[500px]";
                  break;
                case 1:
                  colSpan = "md:col-span-3";
                  heightClass = "h-[400px] md:h-[500px]";
                  break;
                case 2:
                  colSpan = "md:col-span-4";
                  heightClass = "h-[400px] md:h-[500px]";
                  break;
                // Row of 4 (equal portrait)
                case 3:
                case 4:
                case 5:
                case 6:
                  colSpan = "md:col-span-3";
                  heightClass = "h-[300px] md:h-[400px]";
                  break;
              }
            }

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`${colSpan} ${heightClass} bg-surface-low relative overflow-hidden`}
              >
                {isVideo ? (
                  <VideoPlayer 
                    src={item}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={item} 
                    alt={`${project.title} detail ${index + 1}`} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-low py-12 px-16 md:px-32">
        <div className="max-w-[100rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <span className="text-[10px] font-semibold tracking-widest text-on-surface-variant">
            2026, Chiang Ning. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
