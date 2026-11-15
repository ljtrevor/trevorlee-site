import type { Metadata } from 'next';
import Link from 'next/link';

import { CompactRoleRows } from '@/components/RoleRows';
import { shareImages, siteConfig } from '@/components/siteConfig';
import { approach, roles, selectedWork } from '@/data/profile';
import { TOTAL_CHAPTERS } from '@/utils/cisspCore';

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title
  },
  description: siteConfig.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: '/',
    images: shareImages
  },
  twitter: {
    card: 'summary_large_image',
    images: shareImages,
    title: siteConfig.title,
    description: siteConfig.description
  }
};

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <h1 className="statement">I help teams adopt AI and keep the systems behind it running.</h1>
        <p className="lede">
          I spent seven years in software engineering, five of them on AI analytics and
          integrations for a platform used by 500+ school districts. Now my work is on
          the operations side of AI: finding where it helps, getting it into daily use, and
          training the people who rely on it.
        </p>
        <p className="link-row">
          <a href={`mailto:${siteConfig.email}`}>Email me</a>
          <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <Link href="/about">More about me</Link>
        </p>
      </section>

      <section className="block" aria-labelledby="work-title">
        <h2 className="block__title" id="work-title">
          Selected work
        </h2>
        {selectedWork.map((item) => (
          <article key={item.title} className="row">
            <p className="row__meta">
              <span>{item.where}</span>
              <span>{item.when}</span>
            </p>
            <div className="row__body">
              <h3 className="row__title">{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="block" aria-labelledby="approach-title">
        <h2 className="block__title" id="approach-title">
          How I work
        </h2>
        {approach.map((step) => (
          <div key={step.label} className="row">
            <h3 className="row__label">{step.label}</h3>
            <p className="row__body">{step.body}</p>
          </div>
        ))}
      </section>

      <section className="block" aria-labelledby="experience-title">
        <h2 className="block__title" id="experience-title">
          Experience
        </h2>
        <CompactRoleRows roles={roles.filter((role) => role.featured)} />
        <p className="block__more">
          <Link href="/about">Full background, including co-ops</Link>
        </p>
      </section>

      <section className="block" aria-labelledby="now-title">
        <h2 className="block__title" id="now-title">
          Now
        </h2>
        <div className="row">
          <h3 className="row__label">Studying</h3>
          <p className="row__body">
            I am working toward the CISSP. I have been through all {TOTAL_CHAPTERS} chapters of
            the official study guide and am now on practice questions.{' '}
            <Link href="/cissp-study-log">Read the study log</Link>.
          </p>
        </div>
        <div className="row">
          <h3 className="row__label">Consulting</h3>
          <p className="row__body">
            I take on a small amount of AI consulting work.{' '}
            <a href={`mailto:${siteConfig.email}`}>Email me</a> to talk about your project.
          </p>
        </div>
      </section>
    </>
  );
}
