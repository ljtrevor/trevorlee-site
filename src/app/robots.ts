import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    host: 'https://trevorlee.ca',
    sitemap: 'https://trevorlee.ca/sitemap.xml'
  };
}
