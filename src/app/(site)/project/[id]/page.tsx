import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectDetailContent } from "./ProjectDetailContent";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.contentTitle || `${project.title} project by Chiang Ning.`,
    alternates: {
      canonical: `/project/${project.id}`,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  
  if (!project) {
    notFound();
  }

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.contentTitle || `${project.title} project by Chiang Ning.`,
    "url": `https://www.chiangning.net/project/${project.id}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <ProjectDetailContent project={project} />
    </>
  );
}
