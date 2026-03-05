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

function doesEntryMatchSearch(entry: CisspEntry, query: string) {
  if (!query) {
    return true;
  }

  const haystack = `${entry.notes} ${(entry.tags ?? []).join(' ')}`.toLowerCase();
  return haystack.includes(query);
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
          This page is my public study diary while preparing for CISSP. I use it to track consistency, reinforce
          chapters, and capture short reflections after each study session.
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <Stack spacing={1.5}>
            <Typography variant="h6" component="h2">
              Progress
            </Typography>
            <Typography color="text.secondary">{`${completedChapters.length} / ${TOTAL_CHAPTERS} chapters logged`}</Typography>
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
                      <MenuItem key={domain} value={domain}>{`Domain ${domain}`}</MenuItem>
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
                      <MenuItem key={chapter} value={chapter}>{`Chapter ${chapter}`}</MenuItem>
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
              Click any chapter square to filter entries by that chapter.
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
                      aria-label={`Filter by chapter ${chapter}`}
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
                    <strong>Chapters:</strong> {entry.chapters.join(', ')}
                  </Typography>

                  <Typography>
                    <strong>Domains:</strong>{' '}
                    {derivedDomains.length > 0
                      ? derivedDomains.map((domain) => `Domain ${domain}`).join(', ')
                      : 'No mapped domain'}
                  </Typography>

                  <Typography>{entry.notes}</Typography>

                  {entry.minutesStudied ? (
                    <Typography color="text.secondary">Minutes studied: {entry.minutesStudied}</Typography>
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
              <Typography color="text.secondary">No entries match your current filters.</Typography>
            </CardContent>
          </Card>
        ) : null}
      </Stack>
    </Stack>
  );
}
