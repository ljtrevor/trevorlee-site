import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GppGoodIcon from '@mui/icons-material/GppGood';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Section } from '@/components/Section';
import { siteConfig } from '@/components/siteConfig';

export const metadata: Metadata = {
  title: 'AI Security & Privacy',
  description:
    'Trevor Lee works across AI systems, security, privacy-conscious design, and resilient systems.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'AI Security & Privacy',
    description:
      'AI systems, security, privacy-conscious design, and resilient systems',
    url: '/'
  },
  twitter: {
    card: 'summary',
    title: 'AI Security & Privacy',
    description:
      'AI systems, security, privacy-conscious design, and resilient systems'
  }
};

const focusAreas = [
  {
    title: 'AI',
    text: 'Designing practical AI tools and integrations that turn complex data into insights, with trust, safety, and responsible use built in.',
    icon: <AutoAwesomeIcon color="primary" />
  },
  {
    title: 'Security & Privacy',
    text: 'Focused on secure architecture, privacy-conscious data handling, and protecting systems, users, and information.',
    icon: <GppGoodIcon color="primary" />
  },
  {
    title: 'Reliability',
    text: 'Strengthening observability, incident response, and operational resilience so systems remain dependable.',
    icon: <MonitorHeartIcon color="primary" />
  }
];

export default function HomePage() {
  return (
    <>
      <Section component="header">
        <Stack spacing={3} sx={{ pt: { xs: 2, md: 6 }, maxWidth: 820 }}>
          <Typography component="h1" variant="h2">
            Trevor Lee
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700 }}>
            {siteConfig.tagline}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.75 }}>
            I work across AI systems, security, and responsible technology. My background includes building practical AI tools and integrations that turn complex data into useful insights. I’m particularly interested in trustworthy AI, privacy-conscious design, and secure system architecture. I am currently expanding my cybersecurity expertise while preparing for the CISSP.
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
