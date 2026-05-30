"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { resources } from "@/data/resources";
import { VideoPlayer } from "@/components/VideoPlayer";
import { FlutedGlass } from "@/components/FlutedGlass";
import { Reveal, LineReveal } from "@/components/Reveal";

const disciplines = [
  {
    label: "Architecture",
    href: "/architecture",
    blurb:
      "Education, civic, and commercial buildings, from masterplan through construction administration, with care for material, programme, and statutory complexity.",
  },
  {
    label: "Project Management",
    href: "/project-management",
    blurb:
      "End-to-end development management: feasibility, procurement, consultant coordination, cost discipline, and stakeholder reporting across the lifecycle.",
  },
  {
    label: "AI Expertise",
    href: "/ai-expert",
    blurb:
      "Practical, accountable use of AI inside an architecture and PM practice. Augmenting judgment without diluting authorship.",
  },
];

export default function Home() {
  const featuredProjects = projects;
  const featuredResources = resources.slice(0, 8);

  const formatLocation = (loc: string) =>
    loc.replace(/,?\s*\n\s*/g, ", ").trim();

  return (
    <div className="bg-paper text-ink">

      {/* ============================================================ */}
      {/* HERO  (the only section with the fluted-glass shader behind it) */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-paper">
        {/* Fluted glass shader — confined to the hero section only */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <FlutedGlass />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 pt-16 md:pt-24 lg:pt-32 pb-20 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-5xl"
        >
          <span className="mono-label text-ink">01 / Practice / 2026</span>
          <h1 className="fluid-display mt-6 md:mt-8 font-display text-ink font-bold tracking-tight">
            Unlock AI in Architecture &amp; Project Management without
            compromising Human Accountability &amp; Creativity.
          </h1>
          <p className="fluid-lead mt-8 md:mt-10 max-w-2xl text-ink-deep font-semibold">
            Chiang Ning is a Melbourne-based Registered Architect &amp; Project
            Manager with 20+ years across education, civic, commercial, and
            residential work.
          </p>
          <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/architecture"
              className="group inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 mono-label hover:bg-ink-deep transition-colors"
            >
              View the work
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="mailto:chiangning@gmail.com"
              className="group mono-label text-ink hover:text-terracotta transition-colors inline-flex items-center gap-2"
            >
              chiangning@gmail.com
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SELECTED PROJECTS - three featured                            */}
      {/* ============================================================ */}
      <section className="bg-paper">
        <LineReveal />
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 py-16 md:py-24">
        <Reveal className="flex items-baseline justify-between mb-10 md:mb-14">
          <span className="mono-label">Selected Projects</span>
          <Link
            href="/projects"
            className="group mono-label hover:text-terracotta transition-colors"
          >
            View all {projects.length} projects{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featuredProjects.map((project, i) => {
            const idx = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex-none w-[78%] md:w-[calc((100%-1.5rem)/3)] snap-start"
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
        </div>
      </section>

      {/* ============================================================ */}
      {/* DISCIPLINES BAND                                              */}
      {/* ============================================================ */}
      <section className="bg-paper-soft">
        <LineReveal />
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 py-20 md:py-28">
          <Reveal className="flex items-baseline justify-between mb-10 md:mb-14">
            <span className="mono-label">Disciplines</span>
            <span className="mono-label text-ink-soft">03 / 03</span>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-ink/10">
            {disciplines.map((d, i) => (
              <motion.div
                key={d.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col py-10 md:py-0 md:px-10 first:md:pl-0 last:md:pr-0"
              >
                <span className="mono-label-sm text-ink-soft">0{i + 1} / 03</span>
                <h3 className="fluid-h2 mt-4 font-display font-bold tracking-tighter text-ink">
                  {d.label}
                </h3>
                <p className="mt-4 text-ink-soft leading-tight max-w-md">
                  {d.blurb}
                </p>
                <Link
                  href={d.href}
                  className="group mono-label mt-6 md:mt-auto md:pt-6 text-ink hover:text-terracotta transition-colors inline-flex items-center gap-2 self-start"
                >
                  Explore
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA BAND                                                      */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-ink text-paper">
        {/* Same fluted-glass shader as the hero, in dark mode */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <FlutedGlass dark />
        </div>
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 py-20 md:py-28">
          <div className="max-w-3xl">
            <h2 className="fluid-h2 font-display font-bold tracking-tighter text-paper">
              Get in touch.
            </h2>
            <p className="mt-6 text-paper/80 leading-relaxed max-w-2xl">
              Want to unlock AI in your organisation without compromising human
              accountability and creativity? Get in touch and I&apos;ll come
              back within the day.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-4 gap-y-4 items-center">
              <a
                href="mailto:chiangning@gmail.com"
                className="group inline-flex items-center gap-2 bg-paper text-ink px-6 py-3 mono-label hover:bg-paper-soft transition-colors"
              >
                Email
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/chiangning"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-paper text-ink px-6 py-3 mono-label hover:bg-paper-soft transition-colors"
              >
                LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RESOURCES                                                     */}
      {/* ============================================================ */}
      <section className="bg-paper">
        <LineReveal />
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 py-16 md:py-24">
        <Reveal className="flex items-baseline justify-between mb-10 md:mb-14">
          <span className="mono-label">Resources</span>
          <Link
            href="/resources"
            className="group mono-label hover:text-terracotta transition-colors"
          >
            All articles{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>

        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featuredResources.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="flex-none w-[80%] sm:w-[45%] lg:w-[30.5%] xl:w-[22%] snap-start"
            >
              <Link href={`/resources/${r.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-soft">
                  <img
                    src={r.image}
                    alt={r.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 pt-4 border-t border-ink/10">
                  <div className="flex items-center gap-3">
                    <span className="mono-label">{r.date}</span>
                    {r.tags?.[0] && (
                      <>
                        <span className="text-ink-soft">·</span>
                        <span className="mono-label">{r.tags[0]}</span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-[18px] md:text-[20px] text-ink font-bold tracking-tighter leading-[1.05] line-clamp-3 min-h-[57px] md:min-h-[63px] group-hover:text-terracotta transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-ink-soft leading-tight line-clamp-3">
                    {r.summary}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

    </div>
  );
}
