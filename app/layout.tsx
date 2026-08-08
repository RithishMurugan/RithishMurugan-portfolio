import "./globals.css";
import { Figtree, Noto_Sans } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SITE } from "@/lib/data/site";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rithish Murugan | AI Full Stack Software Engineer — Healthcare, GenAI, React",
  description:
    "AI Full Stack Software Engineer with 4+ years building healthcare AI platforms, backend services, and distributed enterprise systems. Abridge, Virtualan, Hexaware — React, FastAPI, LangChain, RAG, FHIR/HL7, Java/Spring Boot, Kafka, AWS.",
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
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
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
    <html lang="en" className={`${figtree.variable} ${notoSans.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${notoSans.className} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
