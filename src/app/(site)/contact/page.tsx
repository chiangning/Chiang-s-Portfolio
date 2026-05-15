import { ContactContent } from "./ContactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Chiang Ning in Melbourne, Australia.',
};

export default function ContactPage() {
  return <ContactContent />;
}
