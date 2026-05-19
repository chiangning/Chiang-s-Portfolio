"use client";

import { motion } from "motion/react";
import { Mail, Linkedin, MapPin, ArrowUpRight } from "lucide-react";

export function ContactContent() {
  return (
    <div className="bg-paper text-ink">
      <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 pt-16 md:pt-28 lg:pt-36 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl"
        >
          <span className="mono-label">Contact</span>
          <h1 className="fluid-display mt-6 md:mt-8 font-display text-ink font-medium">
            Get in touch.
          </h1>
          <p className="fluid-lead mt-8 max-w-2xl text-ink-soft">
            For a project conversation, a second opinion on a brief, or a
            consult on bringing AI into your practice. I&apos;ll come back
            within the day.
          </p>

          <div className="mt-14 md:mt-16 flex flex-col divide-y divide-ink/10 border-t border-b border-ink/10">
            <a
              href="mailto:chiangning@gmail.com"
              className="group flex items-center gap-6 py-6 md:py-8 hover:text-terracotta transition-colors"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-ink/15 flex items-center justify-center text-ink-soft group-hover:border-terracotta group-hover:text-terracotta transition-colors">
                <Mail className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="flex-1">
                <span className="mono-label">Email</span>
                <div className="mt-1 font-display text-[22px] md:text-[26px] text-ink group-hover:text-terracotta transition-colors font-medium">
                  chiangning@gmail.com
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 stroke-[1.5] text-ink-soft group-hover:text-terracotta transition-colors" />
            </a>

            <a
              href="https://linkedin.com/in/chiangning"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 py-6 md:py-8 hover:text-terracotta transition-colors"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-ink/15 flex items-center justify-center text-ink-soft group-hover:border-terracotta group-hover:text-terracotta transition-colors">
                <Linkedin className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="flex-1">
                <span className="mono-label">LinkedIn</span>
                <div className="mt-1 font-display text-[22px] md:text-[26px] text-ink group-hover:text-terracotta transition-colors font-medium">
                  linkedin.com/in/chiangning
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 stroke-[1.5] text-ink-soft group-hover:text-terracotta transition-colors" />
            </a>

            <div className="flex items-center gap-6 py-6 md:py-8">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-ink/15 flex items-center justify-center text-ink-soft">
                <MapPin className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="flex-1">
                <span className="mono-label">Location</span>
                <div className="mt-1 font-display text-[22px] md:text-[26px] text-ink font-medium">
                  Melbourne, Australia
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
