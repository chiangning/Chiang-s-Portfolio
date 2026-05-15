import { Metadata } from "next";
import { AIExpertContent } from "./AIExpertContent";

export const metadata: Metadata = {
  title: 'AI Expertise',
  description: 'How Chiang Ning applies AI tools and workflows to architecture, project delivery, and design documentation.',
};

export default function AIExpertPage() {
  return <AIExpertContent />;
}
