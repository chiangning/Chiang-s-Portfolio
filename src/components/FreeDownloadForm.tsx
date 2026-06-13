"use client";

import { useState } from "react";
import { Download, Check, ArrowUpRight } from "lucide-react";
import { FORMSPREE_ENDPOINT } from "@/lib/shop-config";

/**
 * Email-capture gate for a free download.
 *
 * - If FORMSPREE_ENDPOINT is set, it posts {email, item} there, then reveals
 *   the download.
 * - If it is empty, it skips the email step and just offers the download, so
 *   the shop works before Formspree is configured.
 */
export function FreeDownloadForm({
  file,
  itemTitle,
  fileSize,
  formats,
}: {
  file: string;
  itemTitle: string;
  fileSize?: string;
  formats?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ready" | "error">("idle");

  const hasFormspree = FORMSPREE_ENDPOINT.trim().length > 0;

  const sizeLabel = [formats, fileSize].filter(Boolean).join(" · ");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!hasFormspree) return; // shouldn't happen; form not rendered
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, item: itemTitle }),
      });
      if (res.ok) {
        setStatus("ready");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  // No email gate configured: straight download button.
  if (!hasFormspree) {
    return (
      <div>
        <a
          href={file}
          download
          className="group inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 mono-label hover:bg-ink-deep transition-colors"
        >
          <Download className="w-4 h-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-y-0.5" />
          Get for free
        </a>
        {sizeLabel && (
          <p className="mt-3 mono-label-sm text-ink-soft normal-case tracking-normal">{sizeLabel}</p>
        )}
      </div>
    );
  }

  // Download unlocked after email submitted.
  if (status === "ready") {
    return (
      <div className="border border-ink/15 bg-paper-soft p-6">
        <div className="flex items-center gap-2 mono-label-sm text-terracotta mb-3">
          <Check className="w-4 h-4" /> You&apos;re in. Thanks.
        </div>
        <a
          href={file}
          download
          className="group inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 mono-label hover:bg-ink-deep transition-colors"
        >
          <Download className="w-4 h-4 stroke-[1.5] transition-transform duration-300 group-hover:translate-y-0.5" />
          Download now
        </a>
        {sizeLabel && (
          <p className="mt-3 mono-label-sm text-ink-soft normal-case tracking-normal">{sizeLabel}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-ink/15 bg-paper-soft p-6">
      <label htmlFor="dl-email" className="mono-label-sm text-ink-soft block mb-3 normal-case tracking-normal">
        Enter your email and the download unlocks. No spam, just the file.
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="dl-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          className="flex-1 bg-paper border border-ink/20 px-4 py-3 text-ink text-[15px] focus:outline-none focus:border-ink transition-colors"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 bg-ink text-paper px-6 py-3 mono-label hover:bg-ink-deep transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "Sending" : "Get for free"}
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
      {sizeLabel && (
        <p className="mt-3 mono-label-sm text-ink-soft normal-case tracking-normal">{sizeLabel}</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-[13px] text-terracotta">
          Something went wrong. Please try again, or email me and I&apos;ll send it over.
        </p>
      )}
    </form>
  );
}
