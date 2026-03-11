import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Box, Container } from '@mui/material';

import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { siteConfig } from '@/components/siteConfig';
import { Providers } from './providers';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Trevor Lee'
  },
  description: siteConfig.description,
  robots: {
    index: true,
    follow: true
  },
  keywords: ['Trevor Lee', 'AI', 'Security', 'Privacy', 'CISSP', 'Software Engineering'],
  category: 'technology',
  icons: {
    icon: '/icon.svg'
  },
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: siteConfig.url,
    siteName: 'Trevor Lee',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: '/images/headshot-avatar.webp',
        width: 1200,
        height: 1200,
        alt: 'Trevor Lee'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/images/headshot-avatar.webp']
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeInitScript = `
    (function () {
      document.documentElement.setAttribute('data-theme-booting', 'true');
      try {
        var storageKey = 'trevorlee-site-theme-mode';
        var storedMode = localStorage.getItem(storageKey);
        var systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var mode = storedMode === 'dark' || storedMode === 'light' ? storedMode : systemMode;
        document.documentElement.setAttribute('data-color-mode', mode);
        document.documentElement.style.colorScheme = mode;
      } catch (error) {
        document.documentElement.setAttribute('data-color-mode', 'light');
        document.documentElement.style.colorScheme = 'light';
      }
    })();
  `;

  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <Providers>
          <SiteHeader />
          <Box component="main" sx={{ minHeight: 'calc(100vh - 210px)' }}>
            <Container
              maxWidth="lg"
              sx={{
                px: { xs: 2, sm: 3, md: 4 }
              }}
            >
              {children}
            </Container>
          </Box>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
