import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { DetailedRoleRows } from '@/components/RoleRows';
import { shareImages, siteConfig } from '@/components/siteConfig';
import { roles } from '@/data/profile';

const description =
  'Trevor Lee’s background: seven years of software engineering at Workday and ThoughtExchange, AI consulting, and AI adoption and operations work today.';

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Trevor Lee',
    description,
    url: '/about',
    images: shareImages
  },
  twitter: {
    card: 'summary_large_image',
    images: shareImages,
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
              After a software engineering degree at the University of Victoria, I joined Workday,
              where I worked on APIs for the People Experience platform and served as Co-Scrum
              Master. Then came five years at ThoughtExchange, where most of my work became AI:
              survey analytics for 500+ school districts, the integrations around them, and the
              on-call rotations that kept them
              running.
            </p>
            <p>
              In 2026 I consulted for small businesses and teams with no technical staff, taking
              projects from the first conversation about what to automate through to a working
              tool and a trained team. Now I do that work full time.
            </p>
            <p>
              The part I care about most is what happens after launch: whether a system is
              reliable, documented, secure, and used. I am studying for the CISSP to build on that
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
    </>
  );
}
