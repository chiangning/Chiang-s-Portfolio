"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 border-l-2 border-terracotta bg-paper-soft px-5 py-4 md:px-6 md:py-5">
      <p className="text-[15px] md:text-base leading-relaxed text-ink">{children}</p>
    </div>
  );
}

function SectionHead({ kicker, title }: { kicker: string; title: React.ReactNode }) {
  return (
    <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
      <Kicker>{kicker}</Kicker>
      <h2 className="fluid-h2 mt-5 font-display font-bold tracking-tighter text-ink">{title}</h2>
    </Reveal>
  );
}

const Text = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-3xl px-6 space-y-5 text-ink-soft leading-relaxed mt-5">{children}</div>
);

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const templates = [
  { img: "/articles/gantt-chart/dark-mode.jpg", title: "Professional Dark Mode", sub: "React + TypeScript · High-contrast dark theme · Monochrome bars" },
  { img: "/articles/gantt-chart/minimalist-white.jpg", title: "Minimalist White", sub: "React + TypeScript · Clean white background · Bold black bars · Print-ready" },
  { img: "/articles/gantt-chart/glass-morphism.jpg", title: "Glass Morphism", sub: "React + TypeScript · Frosted glass card · Blue gradient · Blue accent bars" },
  { img: "/articles/gantt-chart/linkedin-style.jpg", title: "LinkedIn Style — 12-Phase Tracker", sub: "React + TypeScript · Interactive progress bars · Phase filters · Live tracking" },
];

const steps = [
  { num: "01", title: "Download a template", body: "Each codebase is a React + TypeScript + Vite project. The structure — phases, tasks, timeline logic, and date calculations — is already embedded. You are not starting from zero." },
  { num: "02", title: "Attach it to AI and describe your project", body: "Import the codebase into Gemini AI Studio, Claude, ChatGPT, or your preferred tool. Then chat. Describe the project type, location, start date, overall duration, and key stages. The AI reads the existing structure and adapts it to your brief." },
  { num: "03", title: "Check, question, and refine", body: "Do not trust the first output blindly. Review the task sequence, dates, durations, overlaps, and dependencies. Ask AI to revise anything that feels unrealistic, missing, or incorrectly staged. Iterate until the program logic makes sense for your project." },
];

const downloads = [
  { file: "gantt_chart_dark_mode.zip", title: "Dark Mode", desc: "High-contrast dark theme. Monochrome bars." },
  { file: "gantt_chart_minimalist_white.zip", title: "Minimalist White", desc: "Clean white background. Bold black bars. Print-ready." },
  { file: "gantt_chart_glass_morphism.zip", title: "Glass Morphism", desc: "Frosted glass card on a blue gradient. Blue accent bars." },
  { file: "gantt_chart_linkedin_style.zip", title: "LinkedIn Style", desc: "Interactive 12-phase tracker. Sliders, filters, live tracking." },
];

/* ------------------------------------------------------------------ */
/* Article                                                            */
/* ------------------------------------------------------------------ */

export function GanttChartArticle() {
  return (
    <article className="bg-paper text-ink pb-24">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-4xl px-6 pt-10 md:pt-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mono-label text-ink-soft">
          <span className="text-terracotta">AI</span>
          <span>·</span>
          <span>Project Management</span>
          <span>·</span>
          <span>Architecture</span>
          <span>·</span>
          <span>6 min read</span>
        </div>

        <h1 className="mt-6 fluid-display font-display font-bold tracking-tighter text-ink">
          A Gantt Chart in Half an Hour
        </h1>
        <p className="mt-4 fluid-h2 font-display font-semibold tracking-tighter text-ink-soft">
          How AI applied to a sample chart changed my pre-construction workflow.
        </p>

        <div className="mt-6 mono-label text-ink-soft">By Chiang Ning · chiangning.net</div>
      </header>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <Text>
        <p>
          The tool that has changed my pre-construction workflow is not a new scheduling platform. It is
          not a project management subscription. It is AI applied to a sample Gantt chart.
        </p>
        <p>
          I can now put a professional, logically sequenced work program in front of a client in around
          half an hour. Not a rough sketch. Not a placeholder. A document that shows phases, tasks,
          durations, dependencies, and timeline logic, detailed enough to drive a real conversation.
        </p>
        <p>
          The real value is that the chart can inherit project logic, staging assumptions, task
          sequencing, durations, dependencies, and your own project requirements, from a conversation, not
          from hours of manual entry.
        </p>
      </Text>

      {/* ── THE FOUR TEMPLATES ───────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="The four templates" title="Four starting points, one structure." />
      <div className="mx-auto max-w-4xl px-6 mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {templates.map((t) => (
          <figure key={t.title} className="flex flex-col">
            <div className="relative overflow-hidden bg-paper-soft border border-ink/10 aspect-[4/5]">
              <img src={t.img} alt={t.title} className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <figcaption className="mt-3">
              <div className="font-display text-[15px] font-bold tracking-tighter text-ink">{t.title}</div>
              <div className="mono-label-sm text-ink-soft mt-1 normal-case tracking-normal leading-relaxed">
                {t.sub}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* ── THE WORKFLOW ─────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="The workflow" title="Three steps. That is the whole process." />
      <Text>
        <p>
          The workflow has three stages. Each one builds on the last. The output at the end is something
          you can take into a client meeting, a planning conversation, or a feasibility discussion and use
          directly.
        </p>
      </Text>
      <div className="mx-auto max-w-3xl px-6 mt-8 border border-ink/15 rounded-sm overflow-hidden">
        {steps.map((s, i) => (
          <div
            key={s.num}
            className={`grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] ${
              i < steps.length - 1 ? "border-b border-ink/15" : ""
            }`}
          >
            <div className="flex items-start justify-center py-5 font-mono text-[11px] text-terracotta border-r border-ink/15">
              {s.num}
            </div>
            <div className="px-5 py-5">
              <div className="font-display text-[15px] font-bold tracking-tighter text-ink mb-1">{s.title}</div>
              <p className="text-[14px] leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── THE PROMPT ───────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="The prompt" title="What to say to AI." />
      <Text>
        <p>
          The prompt does not need to be complex. It needs to give the model enough context to make
          sensible staging decisions. Project type, location, start date, overall duration, and the phases
          you care about.
        </p>
        <div className="my-2 border-l-2 border-terracotta bg-paper-soft px-5 py-4">
          <div className="mono-label-sm text-terracotta mb-3">Prompt</div>
          <p className="text-[14px] md:text-[15px] leading-relaxed text-ink" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
            &ldquo;Change this into a 9-month childcare centre fitout program starting July 2026. Include
            design coordination, permits, procurement, construction, services, finishes and handover.
            Adjust the task names, durations, phase groups and timeline logic to suit the project.&rdquo;
          </p>
        </div>
        <p>
          That single instruction, attached to a sample codebase, will produce a structured program with
          sequential phases, realistic overlaps, and labelled tasks. It is a starting point, but a far
          better starting point than a blank sheet.
        </p>
      </Text>

      {/* ── THE HONEST PART ──────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="What this is not" title="This does not replace project judgement." />
      <Text>
        <p>
          A Gantt chart produced this way is a starting point, not a finished document. The AI will make
          reasonable staging assumptions based on general construction logic. It does not know your
          specific site conditions, your subcontractor availability, your council&apos;s permit processing
          time, or the procurement lead times for the materials you are specifying.
        </p>
        <p>
          You still need to check the sequence, dates, overlaps, and assumptions. What the tool gives you
          is a logical scaffold to interrogate, not a schedule to hand to a contractor.
        </p>
      </Text>

      {/* ── WHY IT MATTERS ───────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead
        kicker="Why it matters"
        title="What this changes for architects and project managers."
      />
      <Text>
        <p>
          The barrier to producing a work program has always been time and software familiarity.
          Scheduling tools are powerful but slow. The setup cost — learning the interface, entering tasks
          manually, adjusting logic rules — is high relative to the value at early project stage.
        </p>
        <p>
          AI removes that barrier. The template carries the structural intelligence. The prompt carries
          your project context. The AI does the assembly. You check and refine the output. The
          conversation with your client is better for it.
        </p>
      </Text>
      <div className="mx-auto max-w-3xl px-6">
        <Callout>
          It turns rough project thinking into something clear, visual, and discussable. For architects and
          project managers, this is where AI becomes practical, not as a novelty, but as a tool that earns
          its place in the workflow.
        </Callout>
      </div>

      {/* ── DOWNLOADS ────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="Download the codebases" title="Grab a template and start the conversation." />
      <Text>
        <p>
          Each codebase is a React + TypeScript + Vite project with the schedule structure already
          embedded. Download one, attach it to your AI tool, and describe your project.
        </p>
      </Text>
      <div className="mx-auto max-w-3xl px-6 mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {downloads.map((d) => (
          <a
            key={d.file}
            href={`/articles/gantt-chart/${d.file}`}
            download
            className="group flex flex-col gap-3 border border-ink/15 p-5 hover:border-ink hover:bg-paper-soft transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="font-display text-[16px] font-bold tracking-tighter text-ink">{d.title}</div>
              <Download className="w-4 h-4 text-ink-soft group-hover:text-terracotta transition-colors shrink-0 mt-0.5" />
            </div>
            <p className="text-[13px] leading-relaxed text-ink-soft">{d.desc}</p>
            <span className="mono-label-sm text-ink-soft mt-1">{d.file}</span>
          </a>
        ))}
      </div>

      {/* ── RELATED TOOL ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-12">
        <Link
          href="/resources/ai-gantt-chart"
          className="group inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 mono-label hover:bg-ink-deep transition-colors"
        >
          Try the interactive Gantt tool
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
        <div className="mono-label text-ink-soft">AI · Project Management · 2026</div>
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
