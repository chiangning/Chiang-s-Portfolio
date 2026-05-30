import Link from "next/link";
import { Mail, Linkedin, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-paper mt-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="block leading-none">
              <span className="font-display text-ink font-bold text-[22px] md:text-[26px] tracking-tighter">
                Chiang Ning
              </span>
            </Link>
            <p className="mt-3 text-ink-soft max-w-md leading-snug">
              Melbourne-based Registered Architect &amp; Project Manager with 20+
              years across education, civic, commercial, and residential work.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <span className="mono-label text-ink">Explore</span>
            <Link href="/architecture"       className="text-ink-soft hover:text-ink transition-colors">Architecture</Link>
            <Link href="/project-management" className="text-ink-soft hover:text-ink transition-colors">Project Management</Link>
            <Link href="/ai-expert"          className="text-ink-soft hover:text-ink transition-colors">AI Expertise</Link>
            <Link href="/resources"          className="text-ink-soft hover:text-ink transition-colors">Resources</Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <span className="mono-label text-ink">Contact</span>
            <a
              href="mailto:chiangning@gmail.com"
              className="group flex items-center gap-2.5 text-ink-soft hover:text-ink transition-colors"
            >
              <Mail className="w-4 h-4 stroke-[1.5] shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-terracotta" />
              <span>chiangning@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/chiangning"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 text-ink-soft hover:text-ink transition-colors"
            >
              <Linkedin className="w-4 h-4 stroke-[1.5] shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-terracotta" />
              <span>LinkedIn</span>
            </a>
            <span className="group flex items-center gap-2.5 text-ink-soft">
              <MapPin className="w-4 h-4 stroke-[1.5] shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-terracotta" />
              <span>Melbourne, Australia</span>
            </span>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ink/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <span className="mono-label-sm text-ink-soft">
            © {new Date().getFullYear()} Chiang Ning
          </span>
        </div>
      </div>
    </footer>
  );
}
