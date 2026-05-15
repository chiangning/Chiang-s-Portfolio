import { Metadata } from "next";
import { ProjectManagementContent } from "./ProjectManagementContent";

export const metadata: Metadata = {
  title: 'Project Management',
  description: 'Project management expertise by Chiang Ning, delivering complex builds on time and within budget.',
};

export default function ProjectManagementPage() {
  return <ProjectManagementContent />;
}
