import type { Metadata } from 'next';

import { CisspStudyLogPage } from '@/components/CisspStudyLogPage';
import { cisspEntries, getUniqueCompletedChapters } from '@/utils/cissp';

export const metadata: Metadata = {
  title: 'CISSP Study Log',
  description:
    'Trevor Lee\'s CISSP study diary with chapter progress, domain mapping, and short notes from each study session.',
  alternates: { canonical: '/cissp-study-log' },
  openGraph: {
    title: 'CISSP Study Log | Trevor Lee',
    description:
      'Public CISSP progress journal with chapter coverage, derived domains, and study notes.',
    url: '/cissp-study-log'
  },
  twitter: {
    card: 'summary',
    title: 'CISSP Study Log | Trevor Lee',
    description:
      'Public CISSP progress journal with chapter coverage, derived domains, and study notes.'
  }
};

export default function CisspPage() {
  return (
    <CisspStudyLogPage
      initialEntries={cisspEntries.slice(0, 5)}
      initialTotalEntries={cisspEntries.length}
      completedChapters={getUniqueCompletedChapters(cisspEntries)}
    />
  );
}
