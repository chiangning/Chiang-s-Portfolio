import { Metadata } from "next";
import { ResourcesContent } from "./ResourcesContent";

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Architecture and project management resources, guides, and insights by Chiang Ning.',
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
