import type { Metadata } from 'next';
  import { Inter, Space_Grotesk } from 'next/font/google';
  import { GoogleTagManager } from '@next/third-parties/google';
  import './globals.css';
  import { LanguageProvider } from '@/LanguageContext';
  import { ThemeProvider } from '@/ThemeContext';

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

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <GoogleTagManager gtmId="GTM-KL84BGLP" />
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
