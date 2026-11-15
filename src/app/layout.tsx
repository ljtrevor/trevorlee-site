import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { siteConfig } from '@/components/siteConfig';
import { Providers } from './providers';
import './globals.css';

// Fonts are self-hosted (SIL Open Font License, see src/fonts) so the build
// never depends on Google Fonts and visitors' browsers never contact it.
const sans = localFont({
  src: '../fonts/bricolage-grotesque-latin-opsz-normal.woff2',
  variable: '--font-sans',
  weight: '200 800',
  display: 'swap'
});

const serif = localFont({
  src: '../fonts/source-serif-4-latin-wght-normal.woff2',
  variable: '--font-serif',
  weight: '200 900',
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
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico']
  },
  manifest: '/site.webmanifest',
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
        width: 512,
        height: 527,
        alt: 'Trevor Lee'
      }
    ]
  },
  twitter: {
    card: 'summary',
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
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
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
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="container site-main">
            {children}
          </main>
          <SiteFooter />
        </Providers>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        ) : null}
      </body>
    </html>
  );
}
