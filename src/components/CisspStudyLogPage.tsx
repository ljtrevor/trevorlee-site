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
  Pagination,
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

type FiltersState = {
  domain: DomainFilter;
  chapter: ChapterFilter;
  query: string;
};

type CisspStudyLogPageProps = {
  initialEntries: CisspEntry[];
  initialTotalEntries: number;
  completedChapters: number[];
};

const STUDY_SOURCE_TITLE =
  'The ISC2 CISSP Official Study Guide, 10th Edition';
const ENTRIES_PER_PAGE = 5;
const ALL_DOMAINS = Array.from({ length: 8 }, (_, index) => index + 1);
const ALL_CHAPTERS = Array.from({ length: TOTAL_CHAPTERS }, (_, index) => index + 1);

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

function getDomainOptionLabel(domain: number) {
  return `Domain ${domain}: ${getDomainLabel(domain)}`;
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
  const [filters, setFilters] = useState<FiltersState>({
    domain: 'all',
    chapter: 'all',
    query: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [allEntries, setAllEntries] = useState<CisspEntry[] | null>(null);
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const entriesPromiseRef = useRef<Promise<CisspEntry[]> | null>(null);

  const normalizedSearchQuery = filters.query.trim().toLowerCase();
  const isDefaultUnfilteredView =
    filters.domain === 'all' && filters.chapter === 'all' && normalizedSearchQuery.length === 0;

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

  const shouldLoadAllEntries = !isDefaultUnfilteredView || currentPage > 1;

  useEffect(() => {
    if (shouldLoadAllEntries && !allEntries) {
      void ensureAllEntriesLoaded();
    }
  }, [allEntries, ensureAllEntriesLoaded, shouldLoadAllEntries]);

  const chaptersInSelectedDomain = useMemo(() => {
    if (filters.domain === 'all') {
      return ALL_CHAPTERS;
    }

    return DOMAIN_TO_CHAPTERS[filters.domain] ?? [];
  }, [filters.domain]);

  const hasActiveFilters =
    filters.domain !== 'all' || filters.chapter !== 'all' || normalizedSearchQuery.length > 0;

  const handleDomainChange = (nextDomain: DomainFilter) => {
    setFilters((prev) => {
      if (prev.domain === nextDomain) {
        return prev;
      }

      const shouldClearChapter =
        nextDomain !== 'all' &&
        prev.chapter !== 'all' &&
        !(DOMAIN_TO_CHAPTERS[nextDomain] ?? []).includes(prev.chapter);

      setCurrentPage(1);
      return {
        ...prev,
        domain: nextDomain,
        chapter: shouldClearChapter ? 'all' : prev.chapter
      };
    });
  };

  const handleChapterChange = (nextChapter: ChapterFilter) => {
    setFilters((prev) => {
      if (prev.chapter === nextChapter) {
        return prev;
      }

      setCurrentPage(1);
      return { ...prev, chapter: nextChapter };
    });
  };

  const handleSearchChange = (nextQuery: string) => {
    setFilters((prev) => {
      if (prev.query === nextQuery) {
        return prev;
      }

      setCurrentPage(1);
      return { ...prev, query: nextQuery };
    });
  };

  const handleClearFilters = () => {
    setFilters((prev) => {
      if (prev.domain === 'all' && prev.chapter === 'all' && prev.query.length === 0) {
        return prev;
      }

      setCurrentPage(1);
      return { domain: 'all', chapter: 'all', query: '' };
    });
  };

  const filteredEntries = useMemo(() => {
    const entries = allEntries ?? (isDefaultUnfilteredView ? initialEntries : []);

    return entries.filter((entry) => {
      if (filters.domain !== 'all') {
        const chaptersInDomain = DOMAIN_TO_CHAPTERS[filters.domain] ?? [];
        const matchesDomain = entry.chapters.some((chapter) => chaptersInDomain.includes(chapter));
        if (!matchesDomain) {
          return false;
        }
      }

      if (filters.chapter !== 'all' && !entry.chapters.includes(filters.chapter)) {
        return false;
      }

      return doesEntryMatchSearch(entry, normalizedSearchQuery);
    });
  }, [allEntries, filters.chapter, filters.domain, initialEntries, isDefaultUnfilteredView, normalizedSearchQuery]);

  const totalEntries = allEntries
    ? filteredEntries.length
    : isDefaultUnfilteredView
      ? initialTotalEntries
      : 0;

  const totalPages = Math.max(1, Math.ceil(totalEntries / ENTRIES_PER_PAGE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedEntries = useMemo(() => {
    if (!allEntries) {
      return isDefaultUnfilteredView && safeCurrentPage === 1 ? initialEntries : [];
    }

    const start = (safeCurrentPage - 1) * ENTRIES_PER_PAGE;
    return filteredEntries.slice(start, start + ENTRIES_PER_PAGE);
  }, [allEntries, filteredEntries, initialEntries, isDefaultUnfilteredView, safeCurrentPage]);

  const progressValue = (completedChapters.length / TOTAL_CHAPTERS) * 100;

  const rangeStart = totalEntries === 0 ? 0 : (safeCurrentPage - 1) * ENTRIES_PER_PAGE + 1;
  const rangeEnd = totalEntries === 0 ? 0 : Math.min(safeCurrentPage * ENTRIES_PER_PAGE, totalEntries);

  const renderPaginationSection = (positionLabel: string) => {
    if (totalEntries === 0) {
      return null;
    }

    return (
      <Card
        aria-label={`${positionLabel} pagination`}
        sx={{
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          minWidth: 0,
          borderRadius: 3,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(147,166,187,0.14), rgba(142,168,145,0.14))'
              : 'linear-gradient(135deg, rgba(95,112,131,0.1), rgba(111,131,113,0.1))'
        }}
      >
        <CardContent sx={{ py: 1.75 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.5}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
          >
            <Typography variant="body2" color="text.secondary">
              Showing {rangeStart}-{rangeEnd} of {totalEntries} entries
            </Typography>
            {totalPages > 1 ? (
              <Pagination
                count={totalPages}
                page={safeCurrentPage}
                color="primary"
                shape="rounded"
                onChange={(_, page) => setCurrentPage(page)}
                disabled={isLoadingEntries}
                siblingCount={0}
                boundaryCount={1}
              />
            ) : null}
          </Stack>
        </CardContent>
      </Card>
    );
  };

  return (
    <Stack
      spacing={1}
      className="section-enter"
      sx={{
        py: { xs: 4, md: 5 },
        px: { xs: 2, sm: 3, md: 0 },
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        minWidth: 0,
        overflowX: 'hidden'
      }}
    >
      <Box
        component="header"
        sx={{ width: '100%', maxWidth: 860, boxSizing: 'border-box', minWidth: 0 }}
      >
        <Typography component="h1" variant="h3" gutterBottom>
          CISSP Study Log
        </Typography>
        <Typography color="text.secondary">
          This page tracks my CISSP preparation using the <em>{STUDY_SOURCE_TITLE}</em>. <br />
          I log each study session with the chapters covered and notes on concepts, questions, or insights that stood out.
        </Typography>
      </Box>

      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 0, lg: 3 }}
        alignItems="flex-start"
        sx={{ m: 0, width: '100%', maxWidth: '100%', boxSizing: 'border-box', minWidth: 0 }}
      >
        <Grid item xs={12} lg={4} sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', minWidth: 0 }}>
          <Stack
            spacing={3}
            sx={{ position: { lg: 'sticky' }, top: { lg: 24 }, width: '100%', maxWidth: '100%', boxSizing: 'border-box', minWidth: 0 }}
          >
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
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="domain-filter-label">Domain</InputLabel>
                      <Select
                        labelId="domain-filter-label"
                        value={filters.domain}
                        label="Domain"
                        onChange={(event) =>
                          handleDomainChange(event.target.value === 'all' ? 'all' : Number(event.target.value))
                        }
                      >
                        <MenuItem value="all">All domains</MenuItem>
                        {ALL_DOMAINS.map((domain) => (
                          <MenuItem key={domain} value={domain}>
                            {getDomainOptionLabel(domain)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="chapter-filter-label">Chapter</InputLabel>
                      <Select
                        labelId="chapter-filter-label"
                        value={filters.chapter}
                        label="Chapter"
                        onChange={(event) =>
                          handleChapterChange(event.target.value === 'all' ? 'all' : Number(event.target.value))
                        }
                      >
                        <MenuItem value="all">All chapters</MenuItem>
                        {chaptersInSelectedDomain.map((chapter) => (
                          <MenuItem key={chapter} value={chapter}>
                            {getChapterLabel(chapter)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      label="Search notes or tags"
                      value={filters.query}
                      onChange={(event) => handleSearchChange(event.target.value)}
                    />

                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={handleClearFilters}
                      disabled={!hasActiveFilters}
                      sx={{ textTransform: 'none', alignSelf: 'flex-start', px: 1.75 }}
                    >
                      Clear filters
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" component="h2">
                    Chapter Coverage
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Click any chapter to filter entries by chapter.
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {chaptersInSelectedDomain.map((chapter) => {
                      const completed = completedChapters.includes(chapter);
                      const selected = filters.chapter === chapter;

                      return (
                        <Chip
                          key={chapter}
                          label={chapter}
                          clickable
                          onClick={() => handleChapterChange(filters.chapter === chapter ? 'all' : chapter)}
                          color={selected ? 'primary' : completed ? 'secondary' : 'default'}
                          variant={selected || completed ? 'filled' : 'outlined'}
                          aria-label={`Filter by ${getChapterLabel(chapter)}`}
                          title={getChapterLabel(chapter)}
                        />
                      );
                    })}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} lg={8} sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', minWidth: 0 }}>
          <Stack
            spacing={2.5}
            component="section"
            aria-label="Study entries"
            sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', minWidth: 0 }}
          >
            {renderPaginationSection('Top')}

            {paginatedEntries.map((entry) => {
              const derivedDomains = getDomainsForChapters(entry.chapters);

              return (
                <Card
                  key={entry.id}
                  className="card-lift section-enter"
                  sx={{ borderRadius: 3, width: '100%', maxWidth: '100%', boxSizing: 'border-box', minWidth: 0 }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                    <Stack spacing={1.8}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                      >
                        <Typography variant="subtitle2" color="text.secondary" sx={{ letterSpacing: 0.2 }}>
                          {entry.date}
                        </Typography>
                        {entry.tags && entry.tags.length > 0 ? (
                          <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap" justifyContent="flex-end">
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

                      <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                          Chapters
                        </Typography>
                        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
                          {entry.chapters.map((chapter) => (
                            <Chip
                              key={`${entry.id}-chapter-${chapter}`}
                              label={`Ch ${chapter}`}
                              size="small"
                              variant="outlined"
                              title={getChapterLabel(chapter)}
                            />
                          ))}
                        </Stack>
                      </Stack>

                      <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                          Domains
                        </Typography>
                        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
                          {derivedDomains.length > 0 ? (
                            derivedDomains.map((domain) => (
                              <Chip
                                key={`${entry.id}-domain-${domain}`}
                                label={`D${domain}`}
                                size="small"
                                color="primary"
                                variant="outlined"
                                title={getDomainLabel(domain)}
                              />
                            ))
                          ) : (
                            <Chip label="No mapped domain" size="small" variant="outlined" />
                          )}
                        </Stack>
                      </Stack>

                      <Typography sx={{ whiteSpace: 'pre-wrap' }}>{entry.notes}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}

            {totalEntries === 0 && !isLoadingEntries ? (
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

            {renderPaginationSection('Bottom')}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
