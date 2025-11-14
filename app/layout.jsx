import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rithish Murugan | Software Engineer',
  description: 'Software Engineer specializing in AI-driven automation and workflow orchestration',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>{children}</body>
    </html>
  );
}

