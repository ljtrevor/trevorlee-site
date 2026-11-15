import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { DetailedRoleRows } from '@/components/RoleRows';
import { siteConfig } from '@/components/siteConfig';
import { education, operationsSkills, roles, technicalSkills } from '@/data/profile';

const description =
  'Trevor Lee’s background: seven years of software engineering at Workday and ThoughtExchange, AI consulting, and AI adoption and operations work today.';

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
              I spent seven years as a software engineer. These days I work on the operations
              side: figuring out where AI helps a team, getting it into people’s hands, and
              keeping the systems behind it reliable.
            </p>
            <p>
              I studied software engineering at the University of Victoria. Two of my co-ops were
              operations work: IT infrastructure and access management at VertiGIS, and cloud
              monitoring and incident runbooks for UVic’s high energy physics computing group.
            </p>
            <p>
              After graduating I joined Workday, where I worked on APIs for the People Experience
              platform and served as Co-Scrum Master. Then came five years at ThoughtExchange.
              Most of my work there became AI: survey analytics for more than 500 school
              districts, the integrations around them, and the on-call rotations that kept them
              running.
            </p>
            <p>
              In 2026 I consulted for small businesses and teams with no technical staff, taking
              projects from the first conversation about what to automate through to a working
              tool and a trained team. Now I do that work full time.
            </p>
            <p>
              The part I care about most is what happens after launch: whether a system is
              reliable, documented, secure, and used. I’m studying for the CISSP to build on that
              with risk and security architecture.{' '}
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
          Education and skills
        </h2>
        <div className="row">
          <h3 className="row__label">Education</h3>
          <p className="row__body">
            {education.degree}, {education.school}.
          </p>
        </div>
        <div className="row">
          <h3 className="row__label">Operations</h3>
          <p className="row__body">{operationsSkills}</p>
        </div>
        <div className="row">
          <h3 className="row__label">Technical</h3>
          <p className="row__body">{technicalSkills}</p>
        </div>
      </section>
    </>
  );
}
