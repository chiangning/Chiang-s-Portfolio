"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const; // easeOutQuint — smooth ease-in/out feel

/**
 * Fade + rise reveal triggered once as the element scrolls into view.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span";
}) {
  const Comp = as === "span" ? motion.span : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/**
 * Full-bleed hairline that draws from the left as it enters view.
 * Sits flush to the section edges (edge-to-edge), Decor-style.
 */
export function LineReveal({
  className = "",
  color = "bg-ink/15",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <motion.div
      className={`h-px w-full origin-left ${color} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}
