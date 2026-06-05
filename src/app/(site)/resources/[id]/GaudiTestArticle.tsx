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

function Question({
  num,
  title,
  gaudi,
  matters,
  apply,
}: {
  num: string;
  title: string;
  gaudi: React.ReactNode;
  matters: React.ReactNode;
  apply: string[];
}) {
  return (
    <div className="pt-9 mt-12 border-t-2 border-ink">
      <div className="font-display text-5xl md:text-6xl font-bold tracking-tighter leading-none text-ink tabular-nums">
        {num}
      </div>
      <h3 className="fluid-h2 mt-4 font-display font-bold tracking-tighter text-ink">{title}</h3>

      <div className="mt-7 space-y-7">
        <div>
          <div className="mono-label-sm text-terracotta mb-2">How Gaudí solved it</div>
          <p className="text-ink-soft leading-relaxed">{gaudi}</p>
        </div>
        <div>
          <div className="mono-label-sm text-ink-soft mb-2">Why it matters for you</div>
          <p className="text-ink-soft leading-relaxed">{matters}</p>
        </div>
      </div>

      <div className="mt-7 border-l-2 border-ink bg-paper-soft px-5 py-5 md:px-6">
        <div className="mono-label-sm text-terracotta mb-4">Apply it</div>
        <ul className="space-y-3">
          {apply.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
              <span className="text-terracotta shrink-0">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const questions = [
  {
    num: "01",
    title: "If you never explained this again, would the reasoning survive?",
    gaudi: (
      <>
        He found his forms with hanging chain models. Weighted chains, pulled by gravity into catenary
        curves, then flipped upright into vaults and arches. The form was the visible result of a logic
        anyone could re-run. The reasoning was not stored next to the design. It was built into it.
      </>
    ),
    matters: (
      <>
        A drawing records what, almost never why. The geometry can be copied by anyone; the intent behind
        it cannot be recovered once you are gone to explain it. When the why is missing, the next person
        keeps the shape and loses the point. Capturing the reasoning, not just the geometry, is what lets a
        design be defended, adapted, and continued without you.
      </>
    ),
    apply: [
      "Beside the form, record the force it answers: site, structure, light, programme, brief, or code.",
      "Write the generative logic, not just the outcome. Could someone regenerate this decision from the reasoning, the way the chains regenerate the curve?",
      "If the only honest reason is “I preferred it,” label it as taste so a successor knows it is yours to keep or change, not a constraint to preserve blindly.",
    ],
  },
  {
    num: "02",
    title: "Could the next person continue this, or only copy it?",
    gaudi: (
      <>
        He fixed the principles and deliberately left detail open for others to resolve within them. He
        knew successors would design parts he never drew. By separating what had to hold from what was
        free, he made the project continuable instead of frozen.
      </>
    ),
    matters: (
      <>
        A design that fixes everything cannot be carried forward, because the moment reality shifts there
        is no room to respond, and no one knows which moves were load-bearing. A design that fixes nothing
        dissolves into whoever touches it next. Continuation needs a clear line between the intent that
        must survive and the detail that is allowed to change.
      </>
    ),
    apply: [
      "State the non-negotiable intent in one sentence a colleague could act on without you present.",
      "Mark explicitly what is fixed and what is open, so a successor adapts the detail without breaking the idea.",
      "Hand over principles, not just pictures. A render shows one resolved instance; a principle survives a hundred.",
    ],
  },
  {
    num: "03",
    title: "Does this live anywhere but your head and a pretty image?",
    gaudi: (
      <>
        He worked in plaster models, physical intuition, and reasoning, not seductive finished views. The
        intent lived in the most durable and legible medium available to him. The models could be read,
        rebuilt, and reasoned from long after he was gone.
      </>
    ),
    matters: (
      <>
        This is the sharpest test in the AI era. It is now trivial to produce a beautiful image of an idea
        you have not resolved, and a polished render ages into a record of appearance with no reasoning
        attached. The most impressive output is rarely the most durable one. What survives you is the
        medium that still explains the why in ten years and three staff changes.
      </>
    ),
    apply: [
      "Capture the intent in something readable, a written rationale or a model, before the hero image is made.",
      "Treat the render as communication of appearance, not as the record of the idea. Do not let it become the only thing left behind.",
      "Ask the durability question directly: if this lands on a stranger's desk in a decade, what here still tells them what you meant?",
    ],
  },
];

const template = [
  { num: "01", line: "If I never explain this again, the reasoning is recorded in ___________.", note: "The why, captured beside the geometry. Not in my head." },
  { num: "02", line: "What must hold: ___________. What is open: ___________.", note: "So a successor adapts the detail without breaking the intent." },
  { num: "03", line: "The durable record of this design lives in ___________.", note: "A medium that still explains the intent in 10 years, not only a render." },
];

/* ------------------------------------------------------------------ */
/* Article                                                            */
/* ------------------------------------------------------------------ */

export function GaudiTestArticle() {
  return (
    <article className="bg-paper text-ink pb-24">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-3xl px-6 pt-10 md:pt-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mono-label text-ink-soft">
          <span className="text-terracotta">Design Method</span>
          <span>·</span>
          <span>Architecture</span>
          <span>·</span>
          <span>AI</span>
          <span>·</span>
          <span>5 min read</span>
        </div>

        <h1 className="mt-6 fluid-display font-display font-bold tracking-tighter text-ink">
          Designing for your absence.
        </h1>
        <p className="mt-5 fluid-lead max-w-2xl text-ink-soft">
          The hardest communication problem in architecture is making a design legible enough to survive
          without you. Here is the framework, drawn from the man who solved it best.
        </p>

        <div className="mt-6 mono-label text-ink-soft">By Chiang Ning · chiangning.net</div>
      </header>

      <figure className="mx-auto max-w-4xl px-6 mt-10 md:mt-14">
        <img
          src="/articles/gaudi-test/sagrada-lego.jpg"
          alt="Lego's 12,060-piece recreation of the Sagrada Família, the largest set the company has ever made, marking 100 years since Gaudí's death."
          className="w-full h-auto block bg-paper-soft"
        />
        <figcaption className="mt-3 mono-label-sm text-ink-soft normal-case tracking-normal leading-relaxed">
          Released this year to mark 100 years since Gaudí&apos;s death: Lego&apos;s 12,060-piece Sagrada
          Família, the largest set the company has ever made. Photography courtesy of Lego, via Dezeen.
        </figcaption>
      </figure>

      {/* ── LEDE / INTRO ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-10">
        <p className="fluid-lead text-ink">
          In 1926 Gaudí was struck by a tram. The Sagrada Família was barely a quarter built. He had always
          known he would not see it finished, and he had designed it that way on purpose.
        </p>
      </div>
      <Text>
        <p>
          The building has been continued for a century by people who never met him. It completes this
          year.{" "}
          <span className="text-ink font-medium">
            No architect alive started it, and the building has been carried forward by his intent, not by
            his presence.
          </span>{" "}
          That is the rarest achievement in the profession: a design that kept its meaning across a hundred
          years and dozens of hands, with the author gone almost from the beginning.
        </p>
        <p>Most architects treat this as a one-of-a-kind story. It is not. It is your problem too, just on a shorter clock.</p>
      </Text>

      <blockquote className="my-10 mx-auto max-w-3xl px-6">
        <p
          className="text-2xl md:text-[32px] leading-snug text-terracotta"
          style={{ fontFamily: SERIF, fontStyle: "italic" }}
        >
          You leave every project long before the building is finished. The only question is whether the
          design can still speak once you are not in the room.
        </p>
      </blockquote>

      <Text>
        <p>
          You go on leave. You change firms. You hand the job to a junior, a contractor, a successor
          practice, a client who keeps building for another decade. Every one of those is a small death of
          your presence on the project. And in every one, an undocumented design quietly gets
          reinterpreted, value-engineered, or guessed at, because the reasoning lived only in your head.
        </p>
        <p>
          Gaudí is useful because he faced the absolute version of this and beat it. Below are three
          questions, drawn directly from how he worked, that test whether your design can survive your
          absence. Call it the Gaudí Test. Run it on any decision before it becomes a drawing.
        </p>
      </Text>

      {/* ── THE FRAMEWORK ────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
        <Kicker>The framework · The Gaudí Test</Kicker>
        <h2 className="fluid-h1 mt-6 font-display font-bold tracking-tighter text-ink">
          Three questions that test whether a design can outlive you on the project.
        </h2>
      </Reveal>

      <div className="mx-auto max-w-3xl px-6">
        {questions.map((q) => (
          <Question key={q.num} {...q} />
        ))}
      </div>

      {/* ── ONE-PAGE TEMPLATE ────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-16">
        <div className="border-2 border-ink p-7 md:p-10">
          <div className="mono-label text-terracotta mb-3">Take it to your desk</div>
          <h2 className="fluid-h2 font-display font-bold tracking-tighter text-ink">The one-page version.</h2>
          <p className="mt-4 text-ink-soft leading-relaxed">
            Before a significant decision becomes a drawing, complete these three lines. If a line has no
            clear answer, the design cannot yet survive your absence.
          </p>
          <div className="mt-7">
            {template.map((t, i) => (
              <div
                key={t.num}
                className={`flex gap-4 py-5 ${i === 0 ? "border-t-2 border-ink" : "border-t border-ink/15"}`}
              >
                <div className="font-display text-xl font-bold tracking-tighter text-ink shrink-0 w-7">
                  {t.num}
                </div>
                <div>
                  <p className="text-[16px] leading-snug text-ink">{t.line}</p>
                  <p className="mt-1.5 text-[13px] text-ink-soft leading-relaxed">{t.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM LINE ──────────────────────────────────────────── */}
      <LineReveal className="mt-16" />
      <Reveal className="mx-auto max-w-3xl px-6 pt-14 md:pt-20 pb-2">
        <Kicker>The bottom line</Kicker>
      </Reveal>
      <div className="mx-auto max-w-3xl px-6 mt-6">
        <p className="fluid-h1 font-display font-bold tracking-tighter text-ink leading-[1.05]">
          A design you cannot leave behind is a design that dies with you.
        </p>
      </div>
      <Text>
        <p>
          Gaudí proved the opposite is possible. Not with better drawings, but with clearer intent. The
          tool changes. The thinking does not.
        </p>
        <p className="text-ink-soft" style={{ fontFamily: SERIF, fontStyle: "italic" }}>
          If this was useful, I write about AI-augmented architectural workflow most weeks here in the
          resources. I would be glad to hear how you would adapt the test to your own practice.
        </p>
      </Text>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl px-6 mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4">
        <div className="mono-label text-ink-soft">Design Method · 2026</div>
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
