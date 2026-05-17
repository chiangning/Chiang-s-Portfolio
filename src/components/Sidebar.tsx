"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Architecture", path: "/architecture" },
    { name: "Project Management", path: "/project-management" },
    { name: "AI Expertise", path: "/ai-expert" },
    { name: "Selected Projects", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <aside
      className={cn(
        "md:fixed relative top-0 left-0 md:h-screen flex flex-col overflow-y-auto shrink-0 z-40 transition-all duration-500",
        "w-full md:w-1/3 lg:w-80",
        "bg-[#2a2a2a]",
        // mobile: tight padding | tablet+: generous padding
        "p-4 md:p-12"
      )}
    >
      {/* Logo */}
      <div className="flex flex-col gap-1 md:gap-2">
        <Link
          href="/"
          className="font-sans font-medium tracking-tight text-white block leading-none
                     text-[18px] md:text-[28px]"
        >
          Chiang Ning
        </Link>
        <span className="font-sans uppercase text-[#9ca3af] whitespace-nowrap
                         text-[8px] tracking-[0.12em] md:text-[10px] md:tracking-[0.15em]">
          Architect · PM · AI
        </span>
      </div>

      {/* Bottom section */}
      <div className="mt-4 md:mt-auto flex flex-col gap-6 md:gap-24">

        {/* Navigation */}
        <nav className="flex flex-col gap-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={cn(
                  "leading-none transition-all hover:text-white hover:font-medium block w-full border-l-2",
                  // mobile: tight | tablet+: spacious
                  "text-[11px] py-px pl-2 md:text-[20px] md:py-px md:pl-3 leading-[1.1]",
                  isActive
                    ? "text-white font-medium border-[#efbc98]"
                    : "text-[#9ca3af] border-transparent hover:border-white/20"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-3 md:gap-5">
          <a
            href="https://www.linkedin.com/in/chiangning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9ca3af] hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
          </a>
          <a
            href="mailto:chiangning@gmail.com"
            className="text-[#9ca3af] hover:text-white transition-colors"
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
          </a>
        </div>

      </div>
    </aside>
  );
}
