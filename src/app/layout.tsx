import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Game Generation Factory | AI-Powered Game Factory',
  description: 'Create professional 2D games with AI agents. No code required.',
};

import { LanguageProvider } from '@/LanguageContext';
import { ThemeProvider } from '@/ThemeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <div className="glow-viewport" />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
