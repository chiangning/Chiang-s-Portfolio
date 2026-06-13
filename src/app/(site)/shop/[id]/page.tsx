import { Metadata } from "next";
import { notFound } from "next/navigation";
import { shopItems } from "@/data/shop";
import { ShopItemContent } from "./ShopItemContent";

export async function generateStaticParams() {
  return shopItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = shopItems.find((s) => s.id === id);
  if (!item) return { title: "Item Not Found" };
  return {
    title: `${item.title} · Shop`,
    description: item.tagline,
    alternates: { canonical: `/shop/${item.id}` },
  };
}

export default async function ShopItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = shopItems.find((s) => s.id === id);
  if (!item) notFound();
  return <ShopItemContent item={item} />;
}
