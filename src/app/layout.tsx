import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Box, Container } from '@mui/material';

import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { siteConfig } from '@/components/siteConfig';
import { Providers } from './providers';

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
  const criticalGlobalStyles = `
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      transition: background-color 220ms ease, color 220ms ease;
    }
    html[data-color-mode='light'] {
      background-color: #f5f3ef;
      color: #1f2524;
    }
    html[data-color-mode='dark'] {
      background-color: #141918;
      color: #e8ecea;
    }
    html[data-color-mode='dark'] body {
      background-color: #141918;
      color: #e8ecea;
    }
    html[data-color-mode='dark'] .MuiPaper-root {
      background-color: #1c2424;
      border-color: #364140;
      color: #e8ecea;
    }
    html[data-color-mode='dark'] .MuiAppBar-root {
      background-color: rgba(28, 36, 36, 0.9);
      border-bottom-color: #364140;
      color: #e8ecea;
    }
    html[data-color-mode='dark'] .MuiTypography-root { color: inherit; }
    html[data-theme-booting='true'] *,
    html[data-theme-booting='true'] *::before,
    html[data-theme-booting='true'] *::after {
      transition: none !important;
      animation: none !important;
    }
    html[data-theme-booting='true'] body {
      visibility: hidden;
    }
    @keyframes fadeSlideIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .section-enter { animation: fadeSlideIn 420ms ease-out; }
    .card-lift {
      transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease;
    }
    .card-lift:hover { transform: translateY(-2px); }
    @media (prefers-reduced-motion: reduce) {
      html, body, .card-lift, .section-enter {
        transition: none !important;
        animation: none !important;
      }
      .card-lift:hover { transform: none; }
    }
  `;

  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <style dangerouslySetInnerHTML={{ __html: criticalGlobalStyles }} />
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
