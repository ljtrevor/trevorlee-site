'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useColorMode } from '@/theme/colorMode';

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Study log', href: '/cissp-study-log' },
  { label: 'Contact', href: '/contact' }
];

export function SiteHeader() {
  const pathname = usePathname();
  const { toggleMode } = useColorMode();

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__inner">
          <Link href="/" className="site-name">
            Trevor Lee
          </Link>

          <nav className="site-nav" aria-label="Main">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Both icons render; CSS shows the one for the current mode, so
              there is nothing to mismatch during hydration. */}
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleMode}
            aria-label="Switch between light and dark mode"
          >
            <svg
              className="theme-toggle__moon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
            </svg>
            <svg
              className="theme-toggle__sun"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
