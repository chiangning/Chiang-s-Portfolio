"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { shopItems } from "@/data/shop";
import { formatPrice, formatFromPrice } from "@/lib/shop-config";

export function ShopContent() {
  return (
    <div className="bg-paper text-ink">
      {/* HEADER */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl"
        >
          <span className="mono-label">Shop · {shopItems.length} {shopItems.length === 1 ? "item" : "items"}</span>
          <h1 className="fluid-display mt-6 md:mt-8 font-sans text-ink font-bold tracking-tighter">
            Shop.
          </h1>
          <p className="fluid-lead mt-8 max-w-2xl text-ink-soft">
            Tools and assets I have built for my own practice, packaged up for yours. Some free, some
            paid. All made to slot straight into real architectural work.
          </p>
        </motion.div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8 md:gap-x-3 md:gap-y-10">
          {shopItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link href={`/shop/${item.id}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-paper-soft">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-4 left-4 bg-paper/95 text-ink px-3 py-1.5 mono-label-sm">
                    {item.price === 0 ? formatFromPrice(0) : formatPrice(item.price, item.currency)}
                  </span>
                </div>
                <div className="mt-5 pt-4 border-t border-ink/10 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="mono-label">{item.category}</span>
                    <h3 className="mt-3 font-display text-[20px] md:text-[22px] text-ink font-bold tracking-tighter leading-[1.05] group-hover:text-terracotta transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] text-ink-soft leading-snug">{item.tagline}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
