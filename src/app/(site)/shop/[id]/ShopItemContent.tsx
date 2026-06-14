"use client";

import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { motion } from "motion/react";
import { shopItems, type ShopItem } from "@/data/shop";
import { formatPrice, formatFromPrice } from "@/lib/shop-config";
import { FreeDownloadForm } from "@/components/FreeDownloadForm";
import { BuyButton } from "@/components/BuyButton";

export function ShopItemContent({ item }: { item: ShopItem }) {
  const isFree = item.price === 0;
  const others = shopItems.filter((s) => s.id !== item.id);

  return (
    <div className="bg-paper text-ink pb-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 pt-10 md:pt-16">
        <Link
          href="/shop"
          className="group mono-label inline-flex items-center gap-2 text-ink-soft hover:text-terracotta transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          All items
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
      >
        {/* Media */}
        <div className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden bg-paper-soft">
            <img src={item.image} alt={item.title} className="w-full h-auto block" />
          </div>
          {item.gallery && item.gallery.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-2 md:gap-3">
              {item.gallery.slice(0, 6).map((src, i) => (
                <div
                  key={src}
                  className="bg-paper-soft border border-ink/10 aspect-square flex items-center justify-center p-2"
                >
                  <img
                    src={src}
                    alt={`${item.title} preview ${i + 1}`}
                    className="max-h-full max-w-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail */}
        <div>
          <span className="mono-label text-terracotta">{item.category}</span>
          <h1 className="mt-4 fluid-h1 font-display font-bold tracking-tighter text-ink">{item.title}</h1>
          <p className="mt-4 fluid-lead text-ink-soft">{item.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold tracking-tighter text-ink">
              {isFree ? formatFromPrice(0) : formatPrice(item.price, item.currency)}
            </span>
            {isFree && <span className="mono-label-sm text-ink-soft">Pay what you want</span>}
          </div>

          {/* Spec stats */}
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-ink/10 py-4">
            {item.assetCount && (
              <div>
                <div className="font-display text-xl font-bold tracking-tighter text-ink">{item.assetCount}</div>
                <div className="mono-label-sm text-ink-soft">Assets</div>
              </div>
            )}
            {item.formats && (
              <div>
                <div className="font-display text-xl font-bold tracking-tighter text-ink">{item.formats}</div>
                <div className="mono-label-sm text-ink-soft">Formats</div>
              </div>
            )}
            {item.fileSize && (
              <div>
                <div className="font-display text-xl font-bold tracking-tighter text-ink">{item.fileSize}</div>
                <div className="mono-label-sm text-ink-soft">Download</div>
              </div>
            )}
          </div>

          {/* Acquire */}
          <div className="mt-7">
            {isFree && item.downloadFile ? (
              <FreeDownloadForm
                file={item.downloadFile}
                itemTitle={item.title}
                fileSize={item.fileSize}
                formats={item.formats}
              />
            ) : (
              <BuyButton
                paymentLink={item.stripePaymentLink}
                price={item.price}
                currency={item.currency}
              />
            )}
          </div>

          <p className="mt-8 text-ink-soft leading-relaxed">{item.description}</p>

          {item.includes && item.includes.length > 0 && (
            <div className="mt-8">
              <div className="mono-label-sm text-terracotta mb-3">What&apos;s included</div>
              <ul className="space-y-2.5">
                {item.includes.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                    <span className="text-terracotta shrink-0">→</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* License agreement */}
          {item.license && (
            <div className="mt-10 pt-8 border-t border-ink/10">
              <div className="mono-label text-terracotta mb-1">Basic license agreement</div>
              <p className="text-[14px] text-ink-soft leading-relaxed mb-5">
                Single-user licence. The full terms ship inside the download as{" "}
                <span className="text-ink">LICENSE.txt</span>.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="mono-label-sm text-ink mb-3">You can</div>
                  <ul className="space-y-2.5">
                    {item.license.can.map((line) => (
                      <li key={line} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                        <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mono-label-sm text-ink mb-3">You cannot</div>
                  <ul className="space-y-2.5">
                    {item.license.cannot.map((line) => (
                      <li key={line} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft">
                        <X className="w-4 h-4 text-ink-soft shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {item.relatedArticle && (
            <div className="mt-10 pt-6 border-t border-ink/10">
              <Link
                href={`/resources/${item.relatedArticle}`}
                className="group mono-label inline-flex items-center gap-2 text-ink hover:text-terracotta transition-colors"
              >
                Read the story behind this
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}
        </div>
      </motion.div>

      {/* Related items */}
      {others.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 mt-20 md:mt-28">
          <div className="flex items-baseline justify-between mb-8 md:mb-10">
            <span className="mono-label">More from the shop</span>
            <Link href="/shop" className="group mono-label hover:text-terracotta transition-colors">
              View all{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8">
            {others.slice(0, 3).map((it) => (
              <Link key={it.id} href={`/shop/${it.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-4 left-4 bg-paper/95 text-ink px-3 py-1.5 mono-label-sm">
                    {it.price === 0 ? formatFromPrice(0) : formatPrice(it.price, it.currency)}
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-ink/10">
                  <span className="mono-label">{it.category}</span>
                  <h3 className="mt-2 font-display text-[19px] text-ink font-bold tracking-tighter leading-[1.05] group-hover:text-terracotta transition-colors">
                    {it.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
