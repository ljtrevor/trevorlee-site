import Link from 'next/link';

import { siteConfig } from './siteConfig';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__inner">
          <p>
            © {new Date().getFullYear()} Trevor Lee. {siteConfig.location}.
          </p>
          <ul>
            <li>
              <a href={`mailto:${siteConfig.email}`}>Email</a>
            </li>
            <li>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <Link href="/cissp-study-log">CISSP study log</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
