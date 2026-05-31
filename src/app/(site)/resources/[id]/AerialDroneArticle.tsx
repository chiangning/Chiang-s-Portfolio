"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal, LineReveal } from "@/components/Reveal";

const VIDEO_SRC =
  "https://res.cloudinary.com/dphq33wah/video/upload/v1780181508/P253_aerial_drone_dxvrdl.mp4";

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

function SectionHead({
  kicker,
  title,
}: {
  kicker: string;
  title: React.ReactNode;
}) {
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

const storyboard = [
  { label: "Frame 1", text: "High aerial looking south down the Yarra toward the CBD. Establishes altitude, orientation, and the river geometry." },
  { label: "Frame 2", text: "Descending FPV approach over Southbank. Camera angle drops. The hospitality strip and pedestrian bridges come into frame." },
  { label: "Frame 3", text: "Low river-level flight passing under the bridges. The underside of the bridge deck, the reflected skyline in the water, the transition from open sky to enclosed structural space." },
  { label: "Frame 4", text: "Pulling back to reveal the full skyline at golden hour. Camera lifts. The CBD geometry and Arts Centre spire anchor the final frame." },
];

type Grade = "good" | "ok" | "weak";
const badge: Record<Grade, string> = {
  good: "bg-[#d1fae5] text-[#065f46]",
  ok: "bg-[#fef3c7] text-[#92400e]",
  weak: "bg-[#fee2e2] text-[#991b1b]",
};

const comparison: {
  criteria: string;
  seedance: { g: Grade; t: string };
  omni: { g: Grade; t: string };
}[] = [
  { criteria: "Spatial accuracy", seedance: { g: "good", t: "Strong" }, omni: { g: "good", t: "Strong" } },
  { criteria: "Lighting consistency", seedance: { g: "good", t: "Strong — held warm golden hour throughout" }, omni: { g: "ok", t: "Variable — cooler grade, lens flare mid-flight" } },
  { criteria: "Building materiality", seedance: { g: "good", t: "Strong — glass and concrete read correctly" }, omni: { g: "ok", t: "Adequate — slightly stylised surfaces" } },
  { criteria: "Camera physics", seedance: { g: "good", t: "Smooth — FPV motion felt grounded" }, omni: { g: "ok", t: "Cinematic — more dramatic, less realistic" } },
  { criteria: "Artefacts", seedance: { g: "good", t: "Minimal" }, omni: { g: "weak", t: "Lens flare and geometry drift in bridge passage" } },
  { criteria: "Overall (with storyboard)", seedance: { g: "good", t: "Production-adjacent" }, omni: { g: "ok", t: "Strong concept, needs iteration" } },
];

/* ------------------------------------------------------------------ */
/* Article                                                            */
/* ------------------------------------------------------------------ */

export function AerialDroneArticle() {
  return (
    <article className="bg-paper text-ink pb-24">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-4xl px-6 pt-10 md:pt-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mono-label text-ink-soft">
          <span className="text-terracotta">AI</span>
          <span>·</span>
          <span>31 May 2026</span>
          <span>·</span>
          <span>5 min read</span>
        </div>

        <h1 className="mt-6 fluid-display font-display font-bold tracking-tighter text-ink">
          Flight Path vs Storyboard
        </h1>
        <p className="mt-4 fluid-h2 font-display font-semibold tracking-tighter text-ink-soft">
          Testing Seedance 2 and Google Omni Flash on the same aerial brief.
        </p>

        <div className="mt-6 mono-label text-ink-soft">By Chiang Ning · chiangning.net</div>
      </header>

      <div className="mx-auto max-w-4xl px-6 mt-10 md:mt-12">
        <div className="relative w-full overflow-hidden bg-ink">
          <video
            src={VIDEO_SRC}
            controls
            muted
            playsInline
            loop
            className="w-full h-auto block"
          />
        </div>
        <p className="mono-label-sm text-ink-soft mt-3 normal-case tracking-normal">
          The output: an FPV aerial flythrough of Melbourne&apos;s Yarra River corridor, generated from a
          flight path plus a four-frame storyboard.
        </p>
      </div>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <Text>
        <p>
          Getting an AI video model to follow a specific flight path over a real city is harder than it
          looks. The brief seems simple: fly along the Yarra River in Melbourne, move south toward the
          CBD, descend to river level, pass under the bridges, pull back to reveal the skyline.
        </p>
        <p>
          I tested two models on this brief: <strong className="font-semibold text-ink">Seedance 2</strong>{" "}
          and <strong className="font-semibold text-ink">Google Omni Flash</strong>. Both were given the
          same prompt. Both were given the same reference material. The question was not which model
          produces the better image. The question was which input structure produces the most accurate
          spatial result.
        </p>
        <p>The answer surprised me. And the fix was not what I expected.</p>
      </Text>

      {/* ── THE BRIEF ────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="The brief" title="A site-specific aerial sequence." />
      <Text>
        <p>
          The shot was an FPV drone sequence along the Yarra River in Melbourne, starting at high altitude
          over Southbank, tracking south-east along the river corridor toward Flinders Street Station and
          Federation Square, descending to a low river-level pass under the pedestrian bridges, then
          pulling back to reveal the full CBD skyline at golden hour.
        </p>
        <p>
          This is the kind of shot that would cost several thousand dollars to commission as a real drone
          production. As an architectural communication tool, it is the sort of sequence that establishes
          site context, orientation, and scale in ten seconds, far more legibly than a plan or an aerial
          photograph alone.
        </p>
      </Text>

      {/* ── ROUND 1 ──────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="Round 1" title="Flight path reference only." />
      <Text>
        <p>
          The first attempt used a flight path arrow overlaid on a Google Maps aerial as the reference
          image. A red arrow traced the intended camera trajectory from Southbank south-east toward the
          CBD. The prompt described the FPV movement, the altitude change, and the target landmarks.
        </p>
        <p>
          Both models produced a video that was technically on-path. The camera moved in roughly the right
          direction. But the spatial accuracy was poor.
        </p>
      </Text>
      <div className="mx-auto max-w-3xl px-6">
        <Callout>
          Camera direction: correct. Building positions: wrong. Scale: shifting mid-flight. Landmark
          placement: drifting frame to frame. The flight path told the model where to go. It did not tell
          the model what to see.
        </Callout>
      </div>
      <Text>
        <p>
          The Yarra River read as a generic city waterway. The distinctive bend at Southbank was absent.
          Federation Square was not recognisable. The CBD skyline geometry was plausible but
          architecturally fictional.
        </p>
        <p>
          Both Seedance 2 and Google Omni Flash produced this class of result. The failure was not
          model-specific. It was input-specific.
        </p>
      </Text>

      {/* ── THE PROBLEM ──────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="The problem" title="A flight path is a vector, not a storyboard." />
      <Text>
        <p>
          A flight path arrow communicates direction and trajectory. It does not communicate what the
          camera should be looking at at any given moment. It does not describe altitude changes. It does
          not establish the spatial sequence of landmarks. It gives the model a vector, not a storyboard.
        </p>
        <p>
          For a generic city, this might be acceptable. The model can hallucinate a plausible skyline and
          the viewer will not notice the inaccuracy.
        </p>
        <p>
          For a specific site, particularly one as visually distinctive as Melbourne&apos;s Yarra River
          corridor, with its characteristic bridges, the Arts Centre spire, the curve of the river at
          Princes Bridge, and the contrast between Southbank&apos;s hospitality strip and the CBD&apos;s
          glass towers, the hallucinated result is not usable.
        </p>
        <p>
          An architect or project manager presenting this video to a client who knows Melbourne would
          immediately see the problem. The building positions are wrong. The spatial logic is approximate.
          The communication value is undermined.
        </p>
      </Text>

      {/* ── ROUND 2 ──────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="Round 2" title="Adding a four-frame storyboard." />
      <Text>
        <p>
          The fix was to add a four-frame storyboard as a second reference input, alongside the flight
          path map. The storyboard used actual reference photographs of the Yarra River corridor to
          establish the visual sequence the camera needed to pass through.
        </p>
      </Text>
      <div className="mx-auto max-w-3xl px-6 mt-8">
        <div className="border-l-2 border-ink pl-5 md:pl-6 space-y-6">
          {storyboard.map((s) => (
            <div key={s.label}>
              <div className="mono-label-sm text-terracotta mb-1">{s.label}</div>
              <p className="text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Text>
        <p>
          The improvement in both models was significant. The spatial logic held. Landmark positions
          stabilised. The altitude progression read correctly. The river geometry was recognisable.
        </p>
      </Text>

      {/* ── COMPARISON ───────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="The comparison" title="Seedance 2 vs Google Omni Flash." />
      <Text>
        <p>With the storyboard input in place, the models diverged in their strengths.</p>
      </Text>
      <div className="mx-auto max-w-4xl px-6 mt-8 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-ink/15">
              <th className="mono-label-sm text-ink-soft py-3 pr-4 align-bottom">Criteria</th>
              <th className="mono-label-sm text-ink-soft py-3 px-4 align-bottom">Seedance 2</th>
              <th className="mono-label-sm text-ink-soft py-3 pl-4 align-bottom">Google Omni Flash</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.criteria} className="border-b border-ink/10 align-top">
                <td className="py-4 pr-4 text-[14px] font-medium text-ink">{row.criteria}</td>
                <td className="py-4 px-4 text-[13px] leading-relaxed text-ink-soft">
                  <span className={`inline-block ${badge[row.seedance.g]} text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded mb-1`}>
                    {row.seedance.t.split(" — ")[0]}
                  </span>
                  {row.seedance.t.includes(" — ") && (
                    <div className="mt-0.5">{row.seedance.t.split(" — ")[1]}</div>
                  )}
                </td>
                <td className="py-4 pl-4 text-[13px] leading-relaxed text-ink-soft">
                  <span className={`inline-block ${badge[row.omni.g]} text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded mb-1`}>
                    {row.omni.t.split(" — ")[0]}
                  </span>
                  {row.omni.t.includes(" — ") && (
                    <div className="mt-0.5">{row.omni.t.split(" — ")[1]}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Text>
        <p>
          Neither model is a clear winner on every dimension. Seedance 2 produced more consistent results
          with fewer artefacts. Google Omni Flash produced a more cinematic visual language but required
          more iteration to control the lighting and geometry drift.
        </p>
        <p>
          Critically, both models closed most of the gap between Round 1 and Round 2 once the storyboard
          was introduced. The storyboard was the variable that mattered most, not which model was used.
        </p>
      </Text>

      {/* ── THE LESSON ───────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead kicker="The lesson" title="The flight path says where. The storyboard says what." />
      <Text>
        <p>
          A flight path tells the model where to go. A storyboard tells it what to see along the way.
        </p>
        <p>
          For site-specific aerial work over a real city, the flight path reference is necessary but not
          sufficient. It establishes the macro trajectory. The storyboard establishes the spatial
          sequence: the altitude at each moment, the camera orientation, the landmark hierarchy, and the
          visual logic of the shot.
        </p>
        <p>
          Without the storyboard, both models default to a plausible but generic interpretation of the
          path. The city becomes a hallucinated approximation. For architectural communication, where the
          specific site, the specific view, and the specific landmark positions carry meaning, that
          approximation is not acceptable.
        </p>
      </Text>
      <div className="mx-auto max-w-3xl px-6">
        <Callout>
          The practical implication: for any AI aerial video brief over a real site, the minimum viable
          input set is a flight path reference plus a storyboard. The storyboard does not need to be
          polished. Four reference photographs taken from Google Street View or a drone footage library,
          sequenced to match the intended camera path, is enough to stabilise the output significantly.
        </Callout>
      </div>

      {/* ── PRACTICE ─────────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <SectionHead
        kicker="What this means for practice"
        title="The tool accelerates. The judgment is still the architect's."
      />
      <Text>
        <p>
          The ability to generate a credible aerial flythrough of a real site, from a defined camera path,
          with controlled lighting and recognisable landmark positions, is a meaningful shift in how
          early-stage architectural communication can work.
        </p>
        <p>
          It does not replace drone production. For a completed building or a major presentation,
          commissioned drone footage is still the right tool. But for a feasibility study, a planning
          submission, a community consultation document, or an early client presentation, an AI-generated
          aerial sequence, produced in a few hours rather than a few days, is a useful addition to the
          communication toolkit.
        </p>
        <p>
          The workflow requires judgment at the input stage. Choosing the right storyboard frames,
          understanding what the model responds to, knowing when the output is architecturally accurate
          enough for the purpose, these are not automated decisions. They require the same spatial literacy
          and site understanding that an architect brings to any form of site representation.
        </p>
        <p className="text-ink font-medium">The tool accelerates. The judgment is still the architect&apos;s.</p>
      </Text>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
        <div className="mono-label text-ink-soft">AI · Aerial workflows · May 2026</div>
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
