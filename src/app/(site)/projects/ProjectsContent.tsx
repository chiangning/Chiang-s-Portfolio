"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { VideoPlayer } from "@/components/VideoPlayer";

const formatLocation = (loc: string) =>
  loc.replace(/,?\s*\n\s*/g, ", ").trim();

export default function ProjectsContent() {
  return (
    <div className="bg-paper text-ink">
      {/* ============================================================ */}
      {/* HEADER                                                        */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl"
        >
          <span className="mono-label">Index · {projects.length} works</span>
          <h1 className="fluid-display mt-6 md:mt-8 font-display text-ink font-bold tracking-tight">
            Projects.
          </h1>
          <p className="fluid-lead mt-8 max-w-2xl text-ink-soft">
            A working selection across education, civic, commercial, and
            residential. Delivered as architect, lead designer, or
            development manager.
          </p>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* GRID - 2-up on tablet, 3-up on desktop                        */}
      {/* ============================================================ */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8 md:gap-x-3 md:gap-y-10">
          {projects.map((project, i) => {
            const idx = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link href={`/project/${project.id}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft">
                    {project.heroVideo ? (
                      <VideoPlayer
                        src={project.heroVideo}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="mt-5 pt-4 border-t border-ink/10 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="mono-label">{project.category}</span>
                      <h3 className="mt-3 font-display text-[20px] md:text-[22px] text-ink font-bold tracking-tighter leading-[1.05] group-hover:text-terracotta transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-2 mono-label-sm text-ink-soft">
                        {formatLocation(project.info.location)} · {project.info.year}
                      </p>
                    </div>
                    <span className="mono-label-sm text-ink-soft shrink-0 pt-0.5">{idx}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
