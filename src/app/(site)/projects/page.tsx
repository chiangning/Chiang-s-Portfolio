import { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected works across education, civic, commercial, and residential. Architecture and development management.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
