import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-text",
  display: "swap",
});

const interDisplay = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display-family",
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.chiangning.net'),
  title: {
    template: "%s · Chiang Ning",
    default: "Chiang Ning · Architect · PM · AI",
  },
  description: "Registered Architect and Senior Project Architect with 20+ years of experience delivering complex built environments across education, commercial, and residential sectors.",
  authors: [{ name: "Chiang Ning" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    title: "Chiang Ning · Architect · PM · AI",
    description: "Registered Architect and Senior Project Architect delivering complex built environments.",
    siteName: "Chiang Ning",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chiang Ning · Architect · PM · AI",
    description: "Registered Architect and Senior Project Architect delivering complex built environments.",
  },
  verification: {
    google: "5vMx72euz70J6zpNM4JMv-pQ0CTk7e-pwIG_f_i5otU",
  },
};

export const viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${interDisplay.variable} ${jbMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-paper text-ink font-sans selection:bg-terracotta/30"
      >
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
