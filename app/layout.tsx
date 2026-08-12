import "./globals.css";
import { IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SITE } from "@/lib/data/site";

/** TECHNICAL MONO — section stamps, metadata, system labels */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

/** EDITORIAL ACCENT — Instrument Serif italic, rare use only */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-editorial",
  display: "swap",
  preload: true,
});

/** Fontshare General Sans — primary portfolio voice (400/500/600/700) */
const GENERAL_SANS_CSS =
  "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap";

export const metadata: Metadata = {
  title: "Rithish Murugan | AI Full Stack Software Engineer",
  description:
    "AI Full Stack Software Engineer designing services, data flows, and AI workflows that stay reliable after launch — Python, React, FastAPI, AWS, and GenAI.",
  keywords: [
    "AI Full Stack Software Engineer",
    "Full Stack Engineer",
    "Healthcare AI",
    "GenAI",
    "FHIR",
    "HL7",
    "LLM",
    "LangChain",
    "LangGraph",
    "Agentic AI",
    "React",
    "TypeScript",
    "Java",
    "Python",
    "FastAPI",
    "Spring Boot",
    "Kafka",
    "AWS",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  openGraph: {
    title: "Rithish Murugan | AI Full Stack Software Engineer",
    description: SITE.summary,
    url: SITE.url,
    siteName: `${SITE.name} Portfolio`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rithish Murugan | AI Full Stack Software Engineer",
    description: SITE.summary,
    creator: "@rithishmurugan",
  },
  metadataBase: new URL(SITE.url),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1017" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.title,
  email: SITE.email,
  url: SITE.url,
  sameAs: [SITE.linkedin, SITE.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexMono.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GENERAL_SANS_CSS} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="body-grain font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
