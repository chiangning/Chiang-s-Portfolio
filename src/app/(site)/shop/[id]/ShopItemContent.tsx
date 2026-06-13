"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import type { ShopItem } from "@/data/shop";
import { formatPrice } from "@/lib/shop-config";
import { FreeDownloadForm } from "@/components/FreeDownloadForm";
import { BuyButton } from "@/components/BuyButton";

export function ShopItemContent({ item }: { item: ShopItem }) {
  const isFree = item.price === 0;

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
              {formatPrice(item.price, item.currency)}
            </span>
            {item.formats && <span className="mono-label-sm text-ink-soft">{item.formats}</span>}
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
    </div>
  );
}
