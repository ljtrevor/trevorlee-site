import { GoogleAnalytics } from '@next/third-parties/google';
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
  applicationName: 'Trevor Lee',
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1
    }
  },
  keywords: [...siteConfig.keywords],
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
        url: siteConfig.image,
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
    images: [siteConfig.image]
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
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en-CA'
  };

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.image}`,
    description: siteConfig.description,
    sameAs: siteConfig.sameAs
  };

  return (
    <html lang="en" className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
