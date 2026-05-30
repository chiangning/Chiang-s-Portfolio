"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Linkedin, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Architecture",       path: "/architecture" },
  { name: "Project Management", path: "/project-management" },
  { name: "AI Expertise",       path: "/ai-expert" },
  { name: "Projects",           path: "/projects" },
  { name: "Resources",          path: "/resources" },
  { name: "Contact",            path: "/contact" },
];

export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-paper transition-shadow",
        scrolled ? "shadow-[0_1px_0_0_rgba(58,58,31,0.08)]" : ""
      )}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-ink font-medium text-[18px] md:text-[20px] tracking-tight">
              Chiang Ning
            </span>
            <span className="mono-label-sm text-ink-soft mt-1">
              Architect · PM · AI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={cn(
                    "mono-label transition-colors hover:text-ink relative inline-block py-1",
                    "after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:bg-ink after:origin-left after:transition-transform after:duration-300 after:ease-out",
                    active
                      ? "text-ink after:scale-x-100"
                      : "text-ink-soft after:scale-x-0 hover:after:scale-x-100"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop contact cluster */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="https://www.linkedin.com/in/chiangning"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-soft hover:text-ink transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 stroke-[1.5]" />
            </a>
            <a
              href="mailto:chiangning@gmail.com"
              className="text-ink-soft hover:text-ink transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 stroke-[1.5]" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden mono-label text-ink p-2 -mr-2"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-ink/10 bg-paper">
          <nav className="mx-auto max-w-[1440px] px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={cn(
                    "mono-label py-2",
                    active ? "text-ink" : "text-ink-soft"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex items-center gap-5 mt-2">
              <a
                href="https://www.linkedin.com/in/chiangning"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-soft hover:text-ink"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="mailto:chiangning@gmail.com"
                className="text-ink-soft hover:text-ink"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
