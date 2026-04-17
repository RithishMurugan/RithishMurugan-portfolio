import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rithish Murugan | Software Engineer — Backend, AI/LLM, Distributed Systems',
  description:
    'Software engineer (Rubrik, Razorpay) — LLM agents, RAG, Java/Spring Boot, Python/FastAPI, Kafka, AWS, React/Next.js. M.S. Computer Science, Illinois Institute of Technology.',
  keywords: [
    'Software Engineer',
    'Backend Engineer',
    'AI Engineer',
    'LLM',
    'LangChain',
    'Java',
    'Python',
    'Spring Boot',
    'Kafka',
    'AWS',
    'React',
    'Next.js',
    'Distributed Systems',
    'Fintech',
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

