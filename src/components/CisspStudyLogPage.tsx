'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useMemo, useState } from 'react';

import {
  cisspEntries,
  CisspEntry,
  DOMAIN_TO_CHAPTERS,
  getDomainsForChapters,
  getUniqueCompletedChapters,
  TOTAL_CHAPTERS
} from '@/utils/cissp';

type DomainFilter = 'all' | number;
type ChapterFilter = 'all' | number;

const STUDY_SOURCE_TITLE =
  'The ISC2 CISSP Official Study Guide, 10th Edition';

const DOMAIN_LABELS: Record<number, string> = {
  1: 'Security and Risk Management',
  2: 'Asset Security',
  3: 'Security Architecture and Engineering',
  4: 'Communication and Network Security',
  5: 'Identity and Access Management (IAM)',
  6: 'Security Assessment and Testing',
  7: 'Security Operations',
  8: 'Software Development Security'
};

const CHAPTER_LABELS: Record<number, string> = {
  1: 'Security Governance Through Principles and Policies',
  2: 'Personnel Security and Risk Management Concepts',
  3: 'Business Continuity Planning',
  4: 'Laws, Regulations, and Compliance',
  5: 'Protecting Security of Assets',
  6: 'Cryptography and Symmetric Key Algorithms',
  7: 'PKI and Cryptographic Applications',
  8: 'Principles of Security Models, Design, and Capabilities',
  9: 'Security Vulnerabilities, Threats, and Countermeasures',
  10: 'Physical Security Requirements',
  11: 'Secure Network Architecture and Components',
  12: 'Secure Communications and Network Attacks',
  13: 'Managing Identity and Authentication',
  14: 'Controlling and Monitoring Access',
  15: 'Security Assessment and Testing',
  16: 'Managing Security Operations',
  17: 'Preventing and Responding to Incidents',
  18: 'Disaster Recovery Planning',
  19: 'Investigations and Ethics',
  20: 'Software Development Security',
  21: 'Malicious Code and Application Attacks'
};

function doesEntryMatchSearch(entry: CisspEntry, query: string) {
  if (!query) {
    return true;
  }

  const haystack = `${entry.notes} ${(entry.tags ?? []).join(' ')}`.toLowerCase();
  return haystack.includes(query);
}

function getChapterLabel(chapter: number) {
  return `Chapter ${chapter}: ${CHAPTER_LABELS[chapter] ?? 'Untitled chapter'}`;
}

function getDomainLabel(domain: number) {
  return DOMAIN_LABELS[domain] ?? `Domain ${domain}`;
}

export function CisspStudyLogPage() {
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all');
  const [chapterFilter, setChapterFilter] = useState<ChapterFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const completedChapters = useMemo(() => getUniqueCompletedChapters(cisspEntries), []);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return cisspEntries.filter((entry) => {
      if (domainFilter !== 'all') {
        const matchesDomain = entry.chapters.some((chapter) =>
          (DOMAIN_TO_CHAPTERS[domainFilter] ?? []).includes(chapter)
        );

        if (!matchesDomain) {
          return false;
        }
      }

      if (chapterFilter !== 'all' && !entry.chapters.includes(chapterFilter)) {
        return false;
      }

      return doesEntryMatchSearch(entry, normalizedQuery);
    });
  }, [chapterFilter, domainFilter, searchQuery]);

  const progressValue = (completedChapters.length / TOTAL_CHAPTERS) * 100;

  return (
    <Stack spacing={4} className="section-enter" sx={{ py: { xs: 4, md: 5 } }}>
      <Box component="header" sx={{ maxWidth: 860 }}>
        <Typography component="h1" variant="h3" gutterBottom>
          CISSP Study Log
        </Typography>
        <Typography color="text.secondary">
          This page tracks my CISSP preparation using the <em>{STUDY_SOURCE_TITLE}</em>. <br />
          I log each study session with the chapters covered and notes on concepts, questions, or insights that stood out.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Stack spacing={1.5}>
            <Typography variant="h6" component="h2">
              Progress
            </Typography>
            <Typography color="text.secondary">
              {`${completedChapters.length} / ${TOTAL_CHAPTERS} chapters logged`}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progressValue}
              aria-label={`${completedChapters.length} of ${TOTAL_CHAPTERS} chapters logged`}
            />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack spacing={2.5}>
            <Typography variant="h6" component="h2">
              Filters
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="domain-filter-label">Domain</InputLabel>
                  <Select
                    labelId="domain-filter-label"
                    value={domainFilter}
                    label="Domain"
                    onChange={(event) =>
                      setDomainFilter(event.target.value === 'all' ? 'all' : Number(event.target.value))
                    }
                  >
                    <MenuItem value="all">All domains</MenuItem>
                    {Array.from({ length: 8 }, (_, index) => index + 1).map((domain) => (
                      <MenuItem key={domain} value={domain}>
                        {getDomainLabel(domain)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="chapter-filter-label">Chapter</InputLabel>
                  <Select
                    labelId="chapter-filter-label"
                    value={chapterFilter}
                    label="Chapter"
                    onChange={(event) =>
                      setChapterFilter(event.target.value === 'all' ? 'all' : Number(event.target.value))
                    }
                  >
                    <MenuItem value="all">All chapters</MenuItem>
                    {Array.from({ length: TOTAL_CHAPTERS }, (_, index) => index + 1).map((chapter) => (
                      <MenuItem key={chapter} value={chapter}>
                        {getChapterLabel(chapter)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Search notes or tags"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              Chapter Coverage
            </Typography>
            <Typography color="text.secondary">
              Click any chapter to filter entries by that chapter.
            </Typography>
            <Grid container spacing={1}>
              {Array.from({ length: TOTAL_CHAPTERS }, (_, index) => index + 1).map((chapter) => {
                const completed = completedChapters.includes(chapter);
                const selected = chapterFilter === chapter;

                return (
                  <Grid item key={chapter}>
                    <Chip
                      label={chapter}
                      clickable
                      onClick={() => setChapterFilter(chapterFilter === chapter ? 'all' : chapter)}
                      color={selected ? 'primary' : completed ? 'secondary' : 'default'}
                      variant={selected || completed ? 'filled' : 'outlined'}
                      aria-label={`Filter by ${getChapterLabel(chapter)}`}
                      title={getChapterLabel(chapter)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </CardContent>
      </Card>

      <Stack spacing={2} component="section" aria-label="Study entries">
        {filteredEntries.map((entry) => {
          const derivedDomains = getDomainsForChapters(entry.chapters);

          return (
            <Card key={entry.id} className="card-lift section-enter">
              <CardContent>
                <Stack spacing={1.6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {entry.date}
                  </Typography>

                  <Typography>
                    <strong>Chapters:</strong>{' '}
                    {entry.chapters.map((chapter) => getChapterLabel(chapter)).join(' • ')}
                  </Typography>

                  <Typography>
                    <strong>Domains:</strong>{' '}
                    {derivedDomains.length > 0
                      ? derivedDomains.map((domain) => getDomainLabel(domain)).join(' • ')
                      : 'No mapped domain'}
                  </Typography>

                  <Typography>{entry.notes}</Typography>

                  {entry.minutesStudied ? (
                    <Typography color="text.secondary">
                      Minutes studied: {entry.minutesStudied}
                    </Typography>
                  ) : null}

                  {entry.tags && entry.tags.length > 0 ? (
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {entry.tags.map((tag) => (
                        <Chip key={`${entry.id}-${tag}`} label={tag} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  ) : null}
                </Stack>
              </CardContent>
            </Card>
          );
        })}

        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                No entries match your current filters.
              </Typography>
            </CardContent>
          </Card>
        ) : null}
      </Stack>
    </Stack>
  );
}
