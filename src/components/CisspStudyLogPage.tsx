'use client';

import {
  Box,
  Button,
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
import type { Theme } from '@mui/material/styles';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  DOMAIN_TO_CHAPTERS,
  getDomainsForChapters,
  TOTAL_CHAPTERS,
  type CisspEntry
} from '@/utils/cisspCore';

type DomainFilter = 'all' | number;
type ChapterFilter = 'all' | number;

type CisspStudyLogPageProps = {
  initialEntries: CisspEntry[];
  initialTotalEntries: number;
  completedChapters: number[];
};

const STUDY_SOURCE_TITLE =
  'The ISC2 CISSP Official Study Guide, 10th Edition';
const ENTRIES_PER_PAGE = 5;

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

function getTagChipSx(tag: string) {
  const normalizedTag = tag.toLowerCase();

  return (theme: Theme) => {
    const colorKey =
      normalizedTag === 'reading'
        ? 'primary'
        : normalizedTag === 'notes'
          ? 'info'
          : normalizedTag === 'review'
            ? 'secondary'
            : normalizedTag === 'practice questions'
              ? 'success'
              : 'warning';

    const paletteColor = theme.palette[colorKey];
    const isDark = theme.palette.mode === 'dark';

    return {
      borderColor: isDark ? paletteColor.dark : paletteColor.light,
      backgroundColor: isDark ? `${paletteColor.main}33` : `${paletteColor.main}22`,
      color: isDark ? paletteColor.light : paletteColor.dark,
      fontWeight: 500
    };
  };
}

export function CisspStudyLogPage({
  initialEntries,
  initialTotalEntries,
  completedChapters
}: CisspStudyLogPageProps) {
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('all');
  const [chapterFilter, setChapterFilter] = useState<ChapterFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAutoDomainFromChapter, setIsAutoDomainFromChapter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allEntries, setAllEntries] = useState<CisspEntry[] | null>(null);
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const entriesPromiseRef = useRef<Promise<CisspEntry[]> | null>(null);

  const ensureAllEntriesLoaded = useCallback(async () => {
    if (allEntries) {
      return allEntries;
    }

    if (!entriesPromiseRef.current) {
      setIsLoadingEntries(true);
      entriesPromiseRef.current = import('@/utils/cisspData')
        .then((module) => module.cisspEntries)
        .finally(() => setIsLoadingEntries(false));
    }

    const loadedEntries = await entriesPromiseRef.current;
    setAllEntries(loadedEntries);
    return loadedEntries;
  }, [allEntries]);

  const availableChapters = useMemo(() => {
    if (domainFilter === 'all') {
      return Array.from({ length: TOTAL_CHAPTERS }, (_, index) => index + 1);
    }

    return DOMAIN_TO_CHAPTERS[domainFilter] ?? [];
  }, [domainFilter]);

  const isDefaultUnfilteredView =
    domainFilter === 'all' && chapterFilter === 'all' && searchQuery.trim().length === 0;

  useEffect(() => {
    if (chapterFilter === 'all') {
      setIsAutoDomainFromChapter(false);
      return;
    }

    if (!availableChapters.includes(chapterFilter)) {
      setChapterFilter('all');
      setIsAutoDomainFromChapter(false);
    }
  }, [availableChapters, chapterFilter]);

  useEffect(() => {
    if ((!isDefaultUnfilteredView || currentPage > 1) && !allEntries) {
      void ensureAllEntriesLoaded();
    }
  }, [allEntries, currentPage, ensureAllEntriesLoaded, isDefaultUnfilteredView]);

  const handleDomainChange = (nextDomain: DomainFilter) => {
    setDomainFilter(nextDomain);
    setIsAutoDomainFromChapter(false);

    if (nextDomain === 'all') {
      setChapterFilter('all');
    }
  };

  const handleChapterChange = (nextChapter: ChapterFilter) => {
    setChapterFilter(nextChapter);

    if (nextChapter === 'all') {
      setIsAutoDomainFromChapter(false);
      return;
    }

    if (domainFilter === 'all') {
      const mappedDomain = getDomainsForChapters([nextChapter])[0];
      if (mappedDomain) {
        setDomainFilter(mappedDomain);
        setIsAutoDomainFromChapter(true);
      }
    }
  };

  const chapterCoverageChapters = useMemo(() => {
    if (isAutoDomainFromChapter && chapterFilter !== 'all') {
      return [chapterFilter];
    }

    return availableChapters;
  }, [availableChapters, chapterFilter, isAutoDomainFromChapter]);

  const hasActiveFilters =
    domainFilter !== 'all' || chapterFilter !== 'all' || searchQuery.trim().length > 0;

  const handleClearFilters = () => {
    setDomainFilter('all');
    setChapterFilter('all');
    setSearchQuery('');
    setIsAutoDomainFromChapter(false);
  };

  const filteredEntries = useMemo(() => {
    if (!allEntries) {
      return isDefaultUnfilteredView ? initialEntries : [];
    }

    const normalizedQuery = searchQuery.trim().toLowerCase();

    return allEntries.filter((entry) => {
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
  }, [allEntries, chapterFilter, domainFilter, initialEntries, isDefaultUnfilteredView, searchQuery]);

  const totalEntries = allEntries
    ? filteredEntries.length
    : isDefaultUnfilteredView
      ? initialTotalEntries
      : 0;

  const totalPages = Math.max(1, Math.ceil(totalEntries / ENTRIES_PER_PAGE));

  const paginatedEntries = useMemo(() => {
    if (!allEntries) {
      return isDefaultUnfilteredView && currentPage === 1 ? initialEntries : [];
    }

    const start = (currentPage - 1) * ENTRIES_PER_PAGE;
    return filteredEntries.slice(start, start + ENTRIES_PER_PAGE);
  }, [allEntries, currentPage, filteredEntries, initialEntries, isDefaultUnfilteredView]);

  useEffect(() => {
    setCurrentPage(1);
  }, [chapterFilter, domainFilter, searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const progressValue = (completedChapters.length / TOTAL_CHAPTERS) * 100;

  const paginationControls = totalEntries > 0 ? (
    <Box
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 3,
        px: { xs: 1.5, sm: 2 },
        py: 1.5,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(147,166,187,0.14), rgba(142,168,145,0.14))'
          : 'linear-gradient(135deg, rgba(95,112,131,0.1), rgba(111,131,113,0.1))'
      })}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: { xs: 'center', sm: 'left' } }}
        >
          Page {currentPage} of {totalPages}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1 || isLoadingEntries}
            sx={{
              minWidth: { xs: 0, sm: 116 },
              flex: { xs: 1, sm: 'unset' },
              borderRadius: 999,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none', transform: 'translateY(-1px)' },
              '&:disabled': { opacity: 0.6 }
            }}
          >
            ← Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages || isLoadingEntries}
            sx={{
              minWidth: { xs: 0, sm: 96 },
              flex: { xs: 1, sm: 'unset' },
              borderRadius: 999,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none', transform: 'translateY(-1px)' },
              '&:disabled': { opacity: 0.6 }
            }}
          >
            Next →
          </Button>
        </Stack>
      </Stack>
    </Box>
  ) : null;

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
            <Box sx={{ px: { xs: 1, sm: 0 } }}>
              <Grid container spacing={2} alignItems="stretch">
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="domain-filter-label">Domain</InputLabel>
                    <Select
                      labelId="domain-filter-label"
                      value={domainFilter}
                      label="Domain"
                      onChange={(event) =>
                        handleDomainChange(event.target.value === 'all' ? 'all' : Number(event.target.value))
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

                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="chapter-filter-label">Chapter</InputLabel>
                    <Select
                      labelId="chapter-filter-label"
                      value={chapterFilter}
                      label="Chapter"
                      onChange={(event) =>
                        handleChapterChange(event.target.value === 'all' ? 'all' : Number(event.target.value))
                      }
                    >
                      <MenuItem value="all">All chapters</MenuItem>
                      {availableChapters.map((chapter) => (
                        <MenuItem key={chapter} value={chapter}>
                          {getChapterLabel(chapter)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Search notes or tags"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={handleClearFilters}
                    disabled={!hasActiveFilters}
                    sx={{ textTransform: 'none', px: 1.75 }}
                  >
                    Clear filters
                  </Button>
                </Grid>
              </Grid>
            </Box>
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
              {chapterCoverageChapters.map((chapter) => {
                const completed = completedChapters.includes(chapter);
                const selected = chapterFilter === chapter;

                return (
                  <Grid item key={chapter}>
                    <Chip
                      label={chapter}
                      clickable
                      onClick={() => handleChapterChange(chapterFilter === chapter ? 'all' : chapter)}
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

      {paginationControls}

      <Stack spacing={2} component="section" aria-label="Study entries">
        {paginatedEntries.map((entry) => {
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

                  {entry.tags && entry.tags.length > 0 ? (
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                      {entry.tags.map((tag) => (
                        <Chip
                          key={`${entry.id}-${tag}`}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={getTagChipSx(tag)}
                        />
                      ))}
                    </Stack>
                  ) : null}
                </Stack>
              </CardContent>
            </Card>
          );
        })}

        {filteredEntries.length === 0 && !isLoadingEntries ? (
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                No entries match your current filters.
              </Typography>
            </CardContent>
          </Card>
        ) : null}

        {isLoadingEntries && paginatedEntries.length === 0 ? (
          <Card>
            <CardContent>
              <Typography color="text.secondary">Loading full study log…</Typography>
            </CardContent>
          </Card>
        ) : null}
      </Stack>
    </Stack>
  );
}
