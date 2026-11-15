export const siteConfig = {
  name: 'Trevor Lee',
  title: 'Trevor Lee | AI Adoption and Technical Operations',
  description:
    'Trevor Lee helps teams adopt AI and keeps the systems behind it running. Background in AI analytics, incident response, and enterprise integrations.',
  url: 'https://trevorlee.ca',
  image: '/images/headshot-avatar.webp',
  shareImage: '/images/share-card.png',
  location: 'Greater Vancouver, BC',
  keywords: [
    'Trevor Lee',
    'AI adoption',
    'AI enablement',
    'technical operations',
    'incident response',
    'AI systems',
    'security',
    'CISSP'
  ],
  email: 'trevor@trevorlee.ca',
  emailObfuscated: 'trevor [at] trevorlee.ca',
  links: {
    linkedin: 'https://www.linkedin.com/in/ljtrevor/',
    github: 'https://github.com/ljtrevor'
  },
  sameAs: ['https://www.linkedin.com/in/ljtrevor/', 'https://github.com/ljtrevor']
} as const;

/* The card shown when a page is linked on LinkedIn, Slack, or in a message.
   Page-level openGraph and twitter metadata replace the layout's, so every
   page has to include these itself. */
export const shareImages = [
  {
    url: siteConfig.shareImage,
    width: 1200,
    height: 630,
    alt: 'Trevor Lee: I help teams adopt AI and keep the systems behind it running.'
  }
];
