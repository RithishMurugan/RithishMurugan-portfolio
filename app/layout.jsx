import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
  themeColor: '#0d1b3d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>{children}</body>
    </html>
  );
}
