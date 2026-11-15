import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { DetailedRoleRows } from '@/components/RoleRows';
import { siteConfig } from '@/components/siteConfig';
import { education, roles, tools } from '@/data/profile';

const description =
  'Trevor Lee’s background: software engineering at Workday and ThoughtExchange, AI consulting, and AI adoption work today.';

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Trevor Lee',
    description,
    url: '/about'
  },
  twitter: {
    card: 'summary',
    title: 'About Trevor Lee',
    description
  }
};

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <h1 className="page-title">About</h1>
      </header>

      <section className="block" aria-labelledby="story-title">
        <h2 className="block__title" id="story-title">
          The short version
        </h2>
        <div className="row">
          <div className="row__meta">
            <Image
              className="portrait"
              src={siteConfig.image}
              alt="Trevor Lee"
              width={136}
              height={136}
              priority
            />
            <span>{siteConfig.location}</span>
          </div>
          <div className="row__body">
            <p>
              I’m a software engineer who works on AI adoption: figuring out where AI helps a
              team, building it, and getting people comfortable using it.
            </p>
            <p>
              I studied software engineering at the University of Victoria and did co-ops at IBM,
              VertiGIS, UVic’s high energy physics computing group, and SaaSquatch. After
              graduating I joined Workday, where I built APIs for the People Experience platform.
              Then came five years at ThoughtExchange, where most of my work became AI: survey
              analytics, LLM integrations, and the on-call work that keeps them running.
            </p>
            <p>
              In 2026 I consulted for small businesses and teams with no engineers of their own,
              taking projects from the first conversation about what to automate through to a
              deployed tool and a trained team. Now I do that work full time.
            </p>
            <p>
              Security runs through all of it. I’ve investigated reliability and security issues
              across hundreds of production incidents, and I’m studying for the CISSP to build on
              that with risk and security architecture.{' '}
              <Link href="/cissp-study-log">The study log is public</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="experience-title">
        <h2 className="block__title" id="experience-title">
          Experience
        </h2>
        <DetailedRoleRows roles={roles} />
      </section>

      <section className="block" aria-labelledby="more-title">
        <h2 className="block__title" id="more-title">
          Education and tools
        </h2>
        <div className="row">
          <h3 className="row__label">Education</h3>
          <p className="row__body">
            {education.degree}, {education.school}.
          </p>
        </div>
        <div className="row">
          <h3 className="row__label">Tools</h3>
          <p className="row__body">{tools}</p>
        </div>
      </section>
    </>
  );
}
