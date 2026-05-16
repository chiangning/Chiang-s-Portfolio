"use client";

import { motion } from "motion/react";
import { Mail, Linkedin, MapPin } from "lucide-react";

export function ContactContent() {
  return (
    <div className="flex-1 ml-0 md:ml-[33.333333%] lg:ml-80 min-h-screen bg-surface p-6 md:p-12 lg:p-24 flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-3xl"
      >
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-10 leading-[1.0]">
          <span className="italic text-[#9ca3af] font-normal pr-2" style={{ fontFamily: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif' }}>Get in</span>
          Touch
        </h1>
        
        <p className="text-lg md:text-xl leading-snug mb-16 text-on-surface-variant font-sans font-normal">
          Whether you're looking to discuss a potential project, explore AI integration in your architectural practice, or inquire about project management consultancy—I'm looking forward to connecting.
        </p>
        
        <div className="flex flex-col gap-8">
          <a href="mailto:chiangning@gmail.com" className="flex items-center gap-6 group w-fit cursor-pointer">
            <div className="w-14 h-14 rounded-full border border-white/10 bg-surface-low flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors text-white">
              <Mail className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[12px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block mb-1">Email</span>
              <span className="text-xl md:text-2xl text-white group-hover:text-primary transition-colors font-medium">chiangning@gmail.com</span>
            </div>
          </a>

          <a href="https://linkedin.com/in/chiangning" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group w-fit cursor-pointer">
            <div className="w-14 h-14 rounded-full border border-white/10 bg-surface-low flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors text-white">
              <Linkedin className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[12px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block mb-1">LinkedIn</span>
              <span className="text-xl md:text-2xl text-white group-hover:text-primary transition-colors font-medium">linkedin.com/in/chiangning</span>
            </div>
          </a>

          <div className="flex items-center gap-6 group w-fit">
            <div className="w-14 h-14 rounded-full border border-white/10 bg-surface-low flex items-center justify-center text-white">
              <MapPin className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <span className="text-[12px] font-bold tracking-[0.15em] text-on-surface-variant uppercase block mb-1">Location</span>
              <span className="text-xl md:text-2xl text-white font-medium">Melbourne, Australia</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
