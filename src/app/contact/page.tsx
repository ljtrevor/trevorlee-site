import type { Metadata } from 'next';

import { siteConfig } from '@/components/siteConfig';

const description = 'Reach Trevor Lee by email, LinkedIn, or GitHub.';

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Trevor Lee',
    description,
    url: '/contact'
  },
  twitter: {
    card: 'summary',
    title: 'Contact Trevor Lee',
    description
  }
};

export default function ContactPage() {
  return (
    <>
      <header className="page-head">
        <h1 className="page-title">Contact</h1>
        <p className="lede">
          Email is the best way to reach me. I also take on a small amount of AI consulting work,
          so write if you have a project in mind.
        </p>
      </header>

      <section className="block" aria-label="Ways to reach me">
        <div className="row row--compact">
          <h2 className="row__label">Email</h2>
          <p className="row__body">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.emailObfuscated}</a>
          </p>
        </div>
        <div className="row row--compact">
          <h2 className="row__label">LinkedIn</h2>
          <p className="row__body">
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/ljtrevor
            </a>
          </p>
        </div>
        <div className="row row--compact">
          <h2 className="row__label">GitHub</h2>
          <p className="row__body">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
              github.com/ljtrevor
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
