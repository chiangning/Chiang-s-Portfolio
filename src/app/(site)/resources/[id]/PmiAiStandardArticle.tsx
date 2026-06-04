"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal, LineReveal } from "@/components/Reveal";

const SERIF = 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif';

/* ------------------------------------------------------------------ */
/* Building blocks                                                    */
/* ------------------------------------------------------------------ */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 h-px bg-terracotta flex-shrink-0" />
      <span className="mono-label text-terracotta">{children}</span>
    </div>
  );
}

const Text = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-3xl px-6 space-y-5 text-ink-soft leading-relaxed mt-5">{children}</div>
);

function Shift({
  num,
  title,
  standard,
  jobsite,
}: {
  num: string;
  title: string;
  standard: React.ReactNode;
  jobsite: React.ReactNode;
}) {
  return (
    <div className="grid md:grid-cols-[5rem_1fr] gap-x-6 gap-y-4 py-9 border-t border-ink/10">
      <div className="font-display text-5xl md:text-6xl font-bold tracking-tighter leading-none text-ink/15 tabular-nums">
        {num}
      </div>
      <div>
        <h3 className="fluid-h2 font-display font-bold tracking-tighter text-ink mb-5">{title}</h3>
        <div className="space-y-5">
          <div>
            <div className="mono-label-sm text-terracotta mb-1.5">The Standard</div>
            <p className="text-ink leading-relaxed">{standard}</p>
          </div>
          <div>
            <div className="mono-label-sm text-ink-soft mb-1.5">On the Jobsite</div>
            <p className="text-ink-soft leading-relaxed">{jobsite}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const shifts = [
  {
    num: "01",
    title: "Data readiness is the foundation",
    standard: "AI capability is entirely dictated by the quality and structure of the underlying data.",
    jobsite: (
      <>
        If you have messy data, AI will only help you make bad decisions faster. You cannot deploy
        reliable predictive scheduling or automated cost forecasting if your records are fragmented.
        Before automating a single workflow, project managers must standardise cost codes, unify Work
        Breakdown Structures, and align reporting periods across all contractors and subcontractors. It
        is time to audit project records and permanently retire the siloed, non-standardised
        spreadsheets.
      </>
    ),
  },
  {
    num: "02",
    title: "Humans decide, by design",
    standard:
      "Human oversight must be deliberately engineered into the project workflow, not tacked on as an afterthought. AI assists; people decide.",
    jobsite: (
      <>
        Imagine a predictive model analyses your project pipeline and flags a 40% probability of missing
        a critical-path milestone due to supply chain volatility. That percentage is an input, not a
        final verdict. The PM&apos;s role is to interpret that signal, weigh the commercial recovery
        options, evaluate site safety, and ultimately own the decision on budget commitments. AI surfaces
        the risk, but leadership remains entirely human.
      </>
    ),
  },
  {
    num: "03",
    title: "Shut down shadow AI",
    standard:
      "Governing AI deployment is a core professional responsibility. Unsanctioned tool usage introduces severe liability.",
    jobsite: (
      <>
        When site engineers, contract administrators, or subcontractors quietly paste RFIs, proprietary
        designs, or sensitive site logs into unauthorised, public AI applications to save time, they are
        leaking commercial data. This shadow AI creates massive legal and financial exposure. Project
        managers must establish, communicate, and strictly enforce a defined, approved AI toolset for the
        entire jobsite.
      </>
    ),
  },
  {
    num: "04",
    title: "Explainability is commercial defence",
    standard:
      "AI outputs must be fully transparent and explainable. The reasoning behind an AI-driven conclusion cannot be a hidden black box.",
    jobsite: (
      <>
        Every major project forecast, delay projection, or budget adjustment carries immense contractual
        weight. If you submit an Extension of Time claim or defend a cost overrun, &ldquo;because the AI
        said so&rdquo; will not hold up with owners, lenders, or legal teams. PMs must use tools that
        explicitly surface their underlying drivers, such as shifting schedule logic or verified material
        delivery trends, so that decisions remain contractually defensible.
      </>
    ),
  },
  {
    num: "05",
    title: "Competence across the portfolio",
    standard:
      "AI fluency must extend beyond isolated tasks and span the project, program, and portfolio levels.",
    jobsite: (
      <>
        True AI competency means moving past basic administrative automation, like summarising meeting
        minutes. In a modern construction landscape, PMs need to leverage AI to evaluate live performance
        across multiple builds simultaneously. This involves analysing portfolio-wide intelligence to
        spot systemic subcontractor delivery failures, optimise heavy equipment allocation across
        different regions, and catch recurring design flaws before they ever reach an active site.
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Article                                                            */
/* ------------------------------------------------------------------ */

export function PmiAiStandardArticle() {
  return (
    <article className="bg-paper text-ink pb-24">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-3xl px-6 pt-10 md:pt-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mono-label text-ink-soft">
          <span className="text-terracotta">Project Management</span>
          <span>·</span>
          <span>AI</span>
          <span>·</span>
          <span>5 min read</span>
        </div>

        <h1 className="mt-6 fluid-display font-display font-bold tracking-tighter text-ink">
          AI Just Became Part of the Job
        </h1>
        <p className="mt-4 fluid-h2 font-display font-semibold tracking-tighter text-ink-soft">
          What the new PMI standard means for construction PMs.
        </p>

        <div className="mt-6 mono-label text-ink-soft">By Chiang Ning · chiangning.net</div>
      </header>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <Text>
        <p>
          For years, artificial intelligence in construction project management was treated like an
          optional side project. It was the playground of the tech-curious, something to experiment with
          if you had extra time, using off-the-shelf tools to draft a quick email or summarise a lengthy
          PDF.
        </p>
        <p className="text-ink font-medium">That era is officially over.</p>
        <p>
          With the release of the Project Management Institute&apos;s new{" "}
          <span className="text-ink font-medium">
            Standard for Artificial Intelligence in Portfolio, Program, and Project Management
          </span>
          , AI has transitioned into an ANSI-approved national standard. It is no longer an experiment; it
          is a professional baseline. The industry framework has shifted from asking{" "}
          <em style={{ fontFamily: SERIF }}>if</em> you use AI, to demanding to know{" "}
          <em style={{ fontFamily: SERIF }}>how responsibly</em> you are governing it on your projects.
        </p>
        <p>
          For construction project managers, this requires an immediate evolution from administrative
          oversight to strategic data governance. Five critical shifts must be mastered to navigate this
          new era.
        </p>
      </Text>

      {/* ── THE FIVE SHIFTS ──────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
        <Kicker>Five shifts</Kicker>
        <h2 className="fluid-h1 mt-6 font-display font-bold tracking-tighter text-ink">
          From administrative oversight to data governance.
        </h2>
      </Reveal>

      <div className="mx-auto max-w-3xl px-6 mt-6">
        {shifts.map((s) => (
          <Shift key={s.num} {...s} />
        ))}
      </div>

      {/* ── BOTTOM LINE ──────────────────────────────────────────── */}
      <LineReveal className="mt-12" />
      <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
        <Kicker>The bottom line</Kicker>
      </Reveal>
      <Text>
        <p>The message embedded within the new ANSI-approved standard is clear.</p>
      </Text>
      <blockquote className="my-10 mx-auto max-w-3xl px-6">
        <p
          className="text-2xl md:text-[32px] leading-snug text-terracotta"
          style={{ fontFamily: SERIF, fontStyle: "italic" }}
        >
          &ldquo;AI won&apos;t replace the project manager. But the project manager who governs AI will
          replace the one who doesn&apos;t.&rdquo;
        </p>
      </blockquote>
      <Text>
        <p>
          This standard fundamentally reframes the construction PM&apos;s role. Success is no longer
          measured just by tracking a static spreadsheet; it is defined by strategic leadership over data
          integrity, risk mitigation, and technology governance.
        </p>
        <p className="text-ink-soft" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
          Does your current project pipeline have a clear AI governance plan? I would be glad to compare
          notes on how teams are preparing for this shift.
        </p>
      </Text>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
        <div className="mono-label text-ink-soft">Project Management · AI · 2026</div>
        <Link
          href="/resources"
          className="group mono-label inline-flex items-center gap-2 text-ink hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to resources
        </Link>
      </div>
    </article>
  );
}
