import entries from '@/data/cisspLog.json';

export interface CisspEntry {
  id: string;
  date: string;
  chapters: number[];
  notes: string;
  tags?: string[];
  minutesStudied?: number;
}

export const TOTAL_CHAPTERS = 21;

export const DOMAIN_TO_CHAPTERS: Record<number, number[]> = {
  1: [1, 2, 4, 19],
  2: [5, 9, 10, 13, 14],
  3: [8, 9, 11, 12, 16, 20],
  4: [11, 12, 13, 14],
  5: [13, 14],
  6: [15, 16],
  7: [16, 17, 18],
  8: [20, 21]
};

const chapterToDomainsMap = Object.entries(DOMAIN_TO_CHAPTERS).reduce<Record<number, number[]>>(
  (acc, [domain, chapterList]) => {
    chapterList.forEach((chapter) => {
      if (!acc[chapter]) {
        acc[chapter] = [];
      }
      acc[chapter].push(Number(domain));
    });

    return acc;
  },
  {}
);

export const cisspEntries: CisspEntry[] = (entries as CisspEntry[]).sort((a, b) =>
  b.date.localeCompare(a.date)
);

export function getDomainsForChapters(chapters: number[]): number[] {
  const set = new Set<number>();

  chapters.forEach((chapter) => {
    const domains = chapterToDomainsMap[chapter] ?? [];
    domains.forEach((domain) => set.add(domain));
  });

  return Array.from(set).sort((a, b) => a - b);
}

export function getUniqueCompletedChapters(entryList: CisspEntry[]): number[] {
  return Array.from(new Set(entryList.flatMap((entry) => entry.chapters))).sort((a, b) => a - b);
}
