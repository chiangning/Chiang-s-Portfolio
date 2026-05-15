import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.chiangning.net'),
  title: {
    template: "%s — (Architecture+PM)XAI",
    default: "(Architecture+PM)XAI",
  },
  description: "Registered Architect and Senior Project Architect with 20+ years of experience delivering complex built environments across education, commercial, and residential sectors.",
  authors: [{ name: "Chiang Ning" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    title: "(Architecture+PM)XAI",
    description: "Registered Architect and Senior Project Architect delivering complex built environments.",
    siteName: "(Architecture+PM)XAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "(Architecture+PM)XAI",
    description: "Registered Architect and Senior Project Architect delivering complex built environments.",
  },
  verification: {
    google: "5vMx72euz70J6zpNM4JMv-pQ0CTk7e-pwIG_f_i5otU",
  },
};

export const viewport = {
  themeColor: "#2a2a2a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="flex flex-col md:flex-row min-h-screen bg-surface text-on-surface font-sans leading-none selection:bg-primary/30 relative">
        {children}
      </body>
    </html>
  );
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Chiang Ning",
  "jobTitle": "Registered Architect and Senior Project Manager",
  "url": "https://www.chiangning.net",
  "email": "chiangning@gmail.com",
  "sameAs": [
    "https://linkedin.com/in/chiangning"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressCountry": "Australia"
  }
};
