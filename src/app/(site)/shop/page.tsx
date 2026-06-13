import { Metadata } from "next";
import { ShopContent } from "./ShopContent";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Tools and assets for architectural practice by Chiang Ning. Free and paid downloads, made to slot straight into real work.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return <ShopContent />;
}
