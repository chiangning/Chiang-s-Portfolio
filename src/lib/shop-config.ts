/**
 * Shop configuration.
 *
 * FORMSPREE_ENDPOINT — paste your Formspree form endpoint here to enable the
 * email-capture step on free downloads. Create a free form at
 * https://formspree.io, then copy its endpoint (looks like
 * "https://formspree.io/f/abcdwxyz") into the string below.
 *
 * While this is empty, the email step is skipped and free items download
 * directly, so the shop still works before you set it up.
 */
export const FORMSPREE_ENDPOINT = "";

export const SHOP_CURRENCY_SYMBOL = "$";

export function formatPrice(price: number, currency = "AUD"): string {
  if (price === 0) return "Free";
  return `${SHOP_CURRENCY_SYMBOL}${price} ${currency}`;
}
