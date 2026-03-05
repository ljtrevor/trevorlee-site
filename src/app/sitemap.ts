import type { MetadataRoute } from 'next';

const routes = ['/', '/about', '/cissp-study-log', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `https://trevorlee.ca${path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7
  }));
}
