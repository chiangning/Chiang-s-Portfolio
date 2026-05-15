import { Metadata } from "next";
import { notFound } from "next/navigation";
import { resources } from "@/data/resources";
import { ResourceDetailContent } from "./ResourceDetailContent";

export async function generateStaticParams() {
  return resources.map((resource) => ({
    id: resource.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const resource = resources.find((r) => r.id === id);
  if (!resource) return { title: "Resource Not Found" };

  return {
    title: resource.title,
    description: `Read the full article: ${resource.title}`,
    alternates: {
      canonical: `/resources/${resource.id}`,
    },
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resource = resources.find((r) => r.id === id);
  
  if (!resource) {
    notFound();
  }

  const dateParts = resource.date?.split('/');
  let isoDate = new Date().toISOString();
  if (dateParts && dateParts.length === 3) {
    // DD/MM/YYYY to YYYY-MM-DD
    isoDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`).toISOString();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": resource.title,
    "description": `Read the full article: ${resource.title}`,
    "author": {
      "@type": "Person",
      "name": "Chiang Ning",
      "url": "https://www.chiangning.net"
    },
    "datePublished": isoDate,
    "url": `https://www.chiangning.net/resources/${resource.id}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ResourceDetailContent resource={resource} />
    </>
  );
}
