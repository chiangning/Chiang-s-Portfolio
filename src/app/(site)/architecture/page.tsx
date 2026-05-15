import { Metadata } from "next";
import { ArchitectureContent } from "./ArchitectureContent";

export const metadata: Metadata = {
  title: 'Architecture',
  description: 'Architectural design work by Chiang Ning, spanning commercial, institutional, and mixed-use projects across Australia and Southeast Asia.',
};

export default function ArchitecturePage() {
  return <ArchitectureContent />;
}
