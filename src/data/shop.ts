export interface ShopItem {
  id: string;
  title: string;
  /** Short label shown on the card, e.g. "Asset Pack". */
  category: string;
  tagline: string;
  /** Longer description for the item detail page. */
  description: string;
  /** Price in whole dollars. 0 means free (email-gated download). */
  price: number;
  currency: string;
  image: string;
  /** Gallery images for the item detail page (optional). */
  gallery?: string[];
  /** Bullet list of what's included. */
  includes?: string[];
  /**
   * For FREE items: the direct path to the downloadable file, revealed
   * after the email-capture step.
   */
  downloadFile?: string;
  /** Approx download size label, e.g. "11 MB". */
  fileSize?: string;
  /** File formats included, e.g. "PNG + SVG". */
  formats?: string;
  /**
   * For PAID items: the Stripe Payment Link URL. Leave empty until you
   * create the product in the Stripe dashboard. The buy button stays
   * disabled ("Coming soon") while this is blank.
   */
  stripePaymentLink?: string;
  /** Link to a related resources article, if any. */
  relatedArticle?: string;
}

export const shopItems: ShopItem[] = [
  {
    id: "illustrated-human-figures",
    title: "100+ Illustrated Human Figures",
    category: "Asset Pack",
    tagline: "Free transparent PNG & SVG cutouts for architects.",
    description:
      "More than one hundred flat, contemporary scale figures, drawn to sit naturally in architectural diagrams, collages, and presentation boards. Every figure comes three ways: a transparent PNG to drop straight onto a plan or board, a white-background PNG, and a fully scalable SVG you can recolour and resize without ever losing an edge.",
    price: 0,
    currency: "AUD",
    image: "/articles/figures/promo.jpg",
    gallery: [
      "/articles/figures/sample-1.png",
      "/articles/figures/sample-2.png",
      "/articles/figures/sample-3.png",
      "/articles/figures/sample-4.png",
      "/articles/figures/sample-5.png",
      "/articles/figures/sample-6.png",
    ],
    includes: [
      "103 figures, each as a transparent PNG, a white-background PNG, and an SVG",
      "Flat, neutral illustrated style that reads as design intent, not stock photography",
      "Organised into three folders by format, ready to drag into any drawing",
      "Free for personal and commercial project use",
    ],
    downloadFile: "/articles/figures/architect-figures-pack.zip",
    fileSize: "11 MB",
    formats: "PNG + SVG",
    relatedArticle: "architect-figures-pack",
  },
];
