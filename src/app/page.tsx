import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GppGoodIcon from '@mui/icons-material/GppGood';
import HubIcon from '@mui/icons-material/Hub';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Section } from '@/components/Section';
import { siteConfig } from '@/components/siteConfig';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Trevor Lee builds AI systems and secure, reliable software with a focus on responsible AI and production resilience.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Trevor Lee | AI Systems and Security Engineering',
    description:
      'Software engineer focused on AI integrations, responsible AI adoption, and secure production systems.',
    url: '/'
  },
  twitter: {
    card: 'summary',
    title: 'Trevor Lee | AI Systems and Security Engineering',
    description:
      'Software engineer focused on AI integrations, responsible AI adoption, and secure production systems.'
  }
};

const focusAreas = [
  {
    title: 'AI integrations and responsible AI',
    text: 'Designing practical AI-powered workflows while keeping data handling, guardrails, and user trust in focus.',
    icon: <AutoAwesomeIcon color="primary" />
  },
  {
    title: 'Secure systems and cybersecurity learning',
    text: 'Building a stronger security foundation through hands-on study and architecture-minded engineering choices.',
    icon: <GppGoodIcon color="primary" />
  },
  {
    title: 'Reliability, incident investigations, and production systems',
    text: 'Shipping dependable software and improving observability, response, and operational resilience over time.',
    icon: <HubIcon color="primary" />
  }
];

export default function HomePage() {
  return (
    <>
      <Section component="header">
        <Stack spacing={2.5} sx={{ pt: { xs: 2, md: 6 }, maxWidth: 820 }}>
          <Typography component="h1" variant="h2">
            Trevor Lee
          </Typography>
          <Typography variant="h5" color="text.secondary">
            AI Systems and Security Engineering
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {siteConfig.tagline}
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 760 }}>
            I&apos;m a software engineer and technology enthusiast who enjoys building practical systems that help people work
            better. I&apos;ve worked on AI tools and integrations, including LLM workflows and orchestration patterns for
            real-world teams. My work emphasizes responsible AI adoption and safe implementation in production environments.
            I&apos;m also deepening my cybersecurity practice through secure systems thinking and CISSP (in progress).
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Based in {siteConfig.location}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button component={Link} href="/cissp-study-log" variant="contained" size="large">
              View CISSP Study Log
            </Button>
            <Button component={Link} href="/contact" variant="outlined" size="large">
              Contact
            </Button>
          </Stack>
        </Stack>
      </Section>

      <Section>
        <Grid container spacing={2}>
          {focusAreas.map((item) => (
            <Grid key={item.title} item xs={12} md={4}>
              <Card className="card-lift" sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={1.2}>
                    <Box aria-hidden>{item.icon}</Box>
                    <Typography variant="h6" component="h2">
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">{item.text}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>
    </>
  );
}
