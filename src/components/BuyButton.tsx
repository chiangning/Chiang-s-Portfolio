"use client";

import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/shop-config";

/**
 * Buy button for a PAID shop item.
 *
 * Links to a Stripe Payment Link (Stripe-hosted checkout). Create the product
 * in your Stripe dashboard, copy its Payment Link URL into the item's
 * `stripePaymentLink` field. Until then the button shows "Coming soon".
 *
 * This is static-export friendly: no API routes, no secret keys in the app.
 */
export function BuyButton({
  paymentLink,
  price,
  currency,
}: {
  paymentLink?: string;
  price: number;
  currency: string;
}) {
  const ready = !!paymentLink && paymentLink.trim().length > 0;

  if (!ready) {
    return (
      <div>
        <span className="inline-flex items-center gap-3 bg-ink/30 text-paper px-7 py-4 mono-label cursor-not-allowed">
          Coming soon
        </span>
        <p className="mt-3 mono-label-sm text-ink-soft normal-case tracking-normal">
          {formatPrice(price, currency)} · checkout opening shortly
        </p>
      </div>
    );
  }

  return (
    <div>
      <a
        href={paymentLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 mono-label hover:bg-ink-deep transition-colors"
      >
        Buy · {formatPrice(price, currency)}
        <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      <p className="mt-3 mono-label-sm text-ink-soft normal-case tracking-normal">
        Secure checkout via Stripe
      </p>
    </div>
  );
}
