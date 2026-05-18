import './globals.css';
import { Figtree, Noto_Sans } from 'next/font/google';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Rithish Murugan | Software Engineer — Healthcare, Backend, AI/LLM',
  description:
    'Software Engineer (Abridge, Hexaware) — healthcare platforms, EHR/FHIR integrations, LLM copilots, Java/Spring Boot, Python/FastAPI, Kafka, AWS. M.S. Computer Science, Illinois Institute of Technology.',
  keywords: [
    'Software Engineer',
    'Backend Engineer',
    'Healthcare Engineer',
    'FHIR',
    'HL7',
    'LLM',
    'LangChain',
    'Java',
    'Python',
    'FastAPI',
    'Spring Boot',
    'Kafka',
    'AWS',
    'Distributed Systems',
    'Supply Chain',
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#18181B',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${figtree.variable} ${notoSans.variable}`}>
      <body suppressHydrationWarning className={`${notoSans.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
