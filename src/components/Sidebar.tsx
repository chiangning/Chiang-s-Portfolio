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
      className="md:fixed relative top-0 left-0 md:h-screen h-auto flex flex-col overflow-y-auto shrink-0 z-40 transition-all duration-500 w-full md:w-1/3 lg:w-80 bg-[#2a2a2a] p-8 md:p-12"
    >
      {/* Logo */}
      <div>
        <Link href="/" className="text-[22px] font-sans font-medium tracking-wide text-white block">
          Chiang Ning
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 md:mt-auto flex flex-col gap-12 md:gap-24">
        
        {/* Navigation Area */}
        <div className="flex flex-col gap-8">
          <nav className="flex flex-col gap-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={cn(
                    "text-[15px] leading-[1.0] transition-colors hover:text-white block w-full py-0.5",
                    isActive ? "text-white font-medium" : "text-[#9ca3af]"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Social */}
        <div className="flex flex-col gap-5 mt-6">
          <div className="flex items-center gap-5">
            <a href="https://www.linkedin.com/in/chiangning" target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-white transition-colors">
              <Linkedin className="w-5 h-5 stroke-[1.5]" />
            </a>
            <a href="mailto:chiangning@gmail.com" className="text-[#9ca3af] hover:text-white transition-colors">
              <Mail className="w-5 h-5 stroke-[1.5]" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
