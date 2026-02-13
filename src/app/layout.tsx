import type { Metadata } from 'next';
  import { Inter, Space_Grotesk } from 'next/font/google';
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
        <head>
          <meta name="facebook-domain-verification" content="8g1jrhodo9tkgey5o80x5efj7dqa7x" />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KL84BGLP');`,
            }}
          />
        </head>
        <body>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KL84BGLP"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
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
