"use client";

import Link from "next/link";
import { ArrowLeft, Share2, Bookmark, Check, Download, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Markdown from "react-markdown";
import { Resource, resources } from "@/data/resources";
import { projects } from "@/data/projects";
import { ImageCarousel } from "@/components/ImageCarousel";
import { GptImage2Article } from "./GptImage2Article";
import { AerialDroneArticle } from "./AerialDroneArticle";
import GanttChartTool from "@/components/GanttChartTool";
import dynamic from "next/dynamic";
import { useState } from "react";

const SpatialInjector = dynamic(
  () => import("@/components/SpatialInjector").then((mod) => mod.SpatialInjector),
  { ssr: false }
);

const ConstructionCostDashboard = dynamic(
  () => import("@/components/ConstructionCostDashboard").then((mod) => mod.ConstructionCostDashboard),
  { ssr: false }
);

export function ResourceDetailContent({ resource }: { resource: Resource }) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const resourceIndex = resources.findIndex(r => r.id === resource.id);
  const bgProject = resource.bgProjectId
    ? projects.find(p => p.id === resource.bgProjectId) || projects[0]
    : projects[Math.max(0, resourceIndex) % projects.length];

  const bgImage = bgProject?.heroImage || bgProject?.gallery?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560';

  const isFullWidthCarousel = resource.id === 'arbv-reforms-2026' || resource.id === 'ncc-2025-reforms';
  const showRelatedBelow = resource.id === 'ncc-2025-reforms' || resource.id === 'arbv-reforms-2026';
  const relatedResources = resources
    .filter(r => r.id !== resource.id)
    .sort((a, b) => {
      const parseDate = (date: string) => {
        const [day, month, year] = date.split("/");
        return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
      };
      return parseDate(b.date) - parseDate(a.date);
    })
    .slice(0, 3);

  return (
    <div className="flex-1 ml-0 md:ml-[33.333333%] lg:ml-80 min-h-screen bg-surface flex flex-col relative">

      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 w-full h-16 shrink-0 bg-surface/80 backdrop-blur-xl flex items-center justify-between px-8 border-b border-ink/10">
        <div className="flex items-center gap-4">
          <Link href="/resources" className="text-on-surface-variant hover:text-ink transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={handleShare}
            className="text-on-surface-variant hover:text-ink transition-colors relative group"
            title="Share URL"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
            {copied && (
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
          <button
            onClick={() => setBookmarked(prev => !prev)}
            className="text-on-surface-variant hover:text-ink transition-colors"
            title="Bookmark"
          >
            <Bookmark className={`w-5 h-5 transition-colors ${bookmarked ? 'fill-primary text-primary' : ''}`} />
          </button>
        </div>
      </nav>

      {resource.id === "aerial-drone-ai-workflow" ? (
        <AerialDroneArticle />
      ) : resource.id === "prompting-gpt-image-2" ? (
        <GptImage2Article />
      ) : resource.isHtml ? (
        <div className="w-full flex-1">
          <iframe
            src={`/data/${resource.id}.html`}
            className="w-full border-none"
            style={{ height: '100vh', minHeight: '100vh' }}
            onLoad={(e) => {
              try {
                const iframe = e.currentTarget;
                const height = iframe.contentDocument?.documentElement?.scrollHeight;
                if (height) iframe.style.height = height + 'px';
              } catch {}
            }}
            title={resource.title}
          />
        </div>
      ) : resource.id === "ai-gantt-chart" ? (
        <div className="flex-1 w-full flex flex-col min-h-0 bg-surface-variant">
          <GanttChartTool />
        </div>
      ) : resource.id === "spatial-injector" ? (
        <div className="flex-1 w-full flex flex-col min-h-0 bg-[#050505] overflow-hidden relative">
          <SpatialInjector />
        </div>
      ) : (
        <article className="flex-1 w-full mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="flex flex-col min-w-0 w-full">

              {/* ── Label strip ──────────────────────────────────────────── */}
              <div className="h-12 lg:h-14 flex items-center gap-4 px-6 md:px-8 lg:px-10 border-b border-ink/10">
                <span className="w-5 h-px bg-primary flex-shrink-0" />
                <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-primary whitespace-nowrap">
                  {resource.tags?.[0] || 'Article'}
                </span>
                <span className="hidden md:inline text-[9px] font-sans uppercase tracking-[0.18em] text-ink/55 whitespace-nowrap ml-2">
                  {resource.date} · 4 MIN READ
                </span>
              </div>

              {/* ── Title (dark on white, always legible) ─────────────────── */}
              <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-24 pt-10 md:pt-14">
                <h1 className="font-display font-bold tracking-tighter text-ink leading-[1.05] text-[28px] md:text-[40px] lg:text-[48px]">
                  {resource.title}
                </h1>
              </div>

              {/* ── Hero image (contained, aligned with body left edge) ───── */}
              <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-24 mt-8 md:mt-10">
                <div className="relative overflow-hidden w-full aspect-[16/9] rounded-xl bg-paper-soft">
                  <img
                    src={resource.image || bgImage || ''}
                    alt={resource.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* ── Article body ─────────────────────────────────────────── */}
              <div className={`w-full mx-auto px-6 md:px-12 lg:px-24 py-12 ${showRelatedBelow ? 'max-w-none' : 'max-w-7xl'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                  {/* Main Content Column */}
                  <div className={`${showRelatedBelow ? 'lg:col-span-12' : 'lg:col-span-8'} flex flex-col gap-10`}>
                    {resource.videoUrl && (
                      <div className="w-full mb-4 rounded-xl overflow-hidden shadow-2xl border border-ink/15">
                        <video
                          src={resource.videoUrl}
                          controls
                          autoPlay
                          muted
                          loop
                          className="w-full h-auto object-cover"
                          playsInline
                        />
                      </div>
                    )}

                    {resource.pdfUrl && (
                      <div className="w-full flex flex-col gap-5 mb-10">
                        <div className="flex flex-wrap items-center gap-3">
                          <a
                            href={resource.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:text-ink"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Open PDF
                          </a>
                          <a
                            href={resource.pdfUrl}
                            download
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-paper transition-colors hover:bg-ink"
                          >
                            <Download className="h-4 w-4" />
                            Download PDF
                          </a>
                        </div>
                        {!resource.carousel && (
                          <div className="h-[78vh] min-h-[640px] w-full overflow-hidden rounded-xl border border-ink/15 bg-[#0a0a0a] shadow-2xl">
                            <iframe
                              src={`${resource.pdfUrl}#view=FitH`}
                              title={`${resource.title} PDF`}
                              className="h-full w-full border-0"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {resource.carousel && (
                      <div className="w-full mb-12">
                        <ImageCarousel
                          images={resource.carousel}
                          className="w-full aspect-[7/5] rounded-xl"
                          objectFit="contain"
                        />
                      </div>
                    )}

                    <div className="prose prose-lg max-w-none prose-a:text-primary hover:prose-a:text-primary/80">
                      <Markdown
                        components={{
                          img: ({ node, ...props }) => {
                            if (props.alt === "Minifig Value") {
                              return <img {...props} className="w-full my-8 clear-both" />;
                            }
                            return (
                              <img
                                {...props}
                                className="w-full sm:w-1/2 float-left mr-6 mb-6 clear-both"
                              />
                            );
                          },
                          h3: ({ node, children, ...props }) => {
                            const isLede = node?.children?.some((c: any) => c.type === 'element' && c.tagName === 'em');
                            if (isLede) {
                              return <p className="font-sans font-normal text-[20px] leading-snug text-ink my-10" {...props}>{children}</p>;
                            }
                            return <h3 className="font-charter text-[30px] font-normal leading-tight mt-[2em] mb-[0.5em] text-ink" {...props}>{children}</h3>;
                          },
                          h4: ({ node, children, ...props }) => {
                            return <h3 className="font-charter text-[30px] font-normal leading-tight mt-[2em] mb-[0.5em] text-ink" {...props}>{children}</h3>;
                          },
                          p: ({ node, children, ...props }) => {
                            const hasOnlyImage = node?.children?.every((c: any) => c.type === 'element' && c.tagName === 'img');
                            if (hasOnlyImage) return <p {...props}>{children}</p>;
                            return <p className="font-sans font-normal text-[15px] leading-[1.45] mb-[0.9em] text-on-surface-variant" {...props}>{children}</p>;
                          },
                          hr: () => {
                            return <hr className="w-[40px] mx-auto border-t border-ink/20 my-16 clear-both" />;
                          }
                        }}
                      >
                        {resource.content}
                      </Markdown>
                    </div>

                    {resource.id === "construction-cost-update-march-2026" && (
                      <div className="w-full">
                        <ConstructionCostDashboard />
                      </div>
                    )}

                    {resource.embedUrl && (
                      <div className="w-full">
                        <div className="mt-12 w-full h-[1500px] rounded-xl overflow-hidden border border-ink/10 bg-paper-soft">
                          <iframe
                            src={resource.embedUrl}
                            className="w-full h-full border-0"
                            title="Embedded Application"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Sidebar Column */}
                  {!showRelatedBelow && (
                    <aside className="lg:col-span-4 flex flex-col gap-12">
                      <div className="sticky top-32">
                        <h3 className="text-sm font-bold tracking-[0.15em] text-primary uppercase mb-8 border-b border-ink/15 pb-4">
                          Related Articles
                        </h3>
                        <div className="flex flex-col gap-8">
                          {relatedResources.map((related) => (
                            <Link key={related.id} href={`/resources/${related.id}`} className="group flex flex-col gap-3">
                              <div className="aspect-video w-full overflow-hidden bg-paper-soft border border-ink/10 group-hover:border-primary/50 transition-colors">
                                {related.image ? (
                                  <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                                ) : (
                                  <div className="w-full h-full bg-surface" />
                                )}
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="font-[Helvetica,Arial,sans-serif] text-[10px] uppercase tracking-wider text-primary">
                                  {related.tags?.[0] || 'Insight'}
                                </span>
                                <h4 className="text-base font-sans font-medium text-ink group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                  {related.title}
                                </h4>
                                <p className="text-[11px] text-on-surface-variant">{related.date}</p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-ink/15">
                          <Link href="/resources" className="text-primary hover:text-ink transition-colors text-xs font-bold tracking-[0.1em] uppercase">
                            View All Resources →
                          </Link>
                        </div>
                      </div>
                    </aside>
                  )}
                </div>

                {showRelatedBelow && (
                  <section className="mt-20 border-t border-ink/15 pt-10">
                    <div className="flex items-end justify-between gap-6 mb-8">
                      <h3 className="text-sm font-bold tracking-[0.15em] text-primary uppercase">
                        Related Articles
                      </h3>
                      <Link href="/resources" className="text-primary hover:text-ink transition-colors text-xs font-bold tracking-[0.1em] uppercase">
                        View All Resources →
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                      {relatedResources.map((related) => (
                        <Link key={related.id} href={`/resources/${related.id}`} className="group flex flex-col gap-3">
                          <div className="aspect-video w-full overflow-hidden bg-paper-soft border border-ink/10 group-hover:border-primary/50 transition-colors">
                            {related.image ? (
                              <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full bg-surface" />
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="font-[Helvetica,Arial,sans-serif] text-[10px] uppercase tracking-wider text-primary">
                              {related.tags?.[0] || 'Insight'}
                            </span>
                            <h4 className="text-base font-sans font-medium text-ink group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                              {related.title}
                            </h4>
                            <p className="text-[11px] text-on-surface-variant">{related.date}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </article>
      )}
    </div>
  );
}
