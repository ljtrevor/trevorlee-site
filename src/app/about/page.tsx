import { Avatar, Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';

import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Trevor Lee: full-stack engineer with experience in React, TypeScript, Python, AWS, and responsible AI integration.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Trevor Lee',
    description:
      'Background, AI work, and security focus for Trevor Lee, including current CISSP study progress.',
    url: '/about'
  },
  twitter: {
    card: 'summary',
    title: 'About Trevor Lee',
    description:
      'Background, AI work, and security focus for Trevor Lee, including current CISSP study progress.'
  }
};

const sections = [
  {
    title: 'Background',
    content:
      'I work across the stack and enjoy turning ambiguous ideas into software that is useful, maintainable, and ready for production. My day-to-day toolkit includes React, TypeScript, Python, and AWS.'
  },
  {
    title: 'AI work',
    content:
      'A major part of my recent work has involved integrating LLM systems into existing product workflows. I care deeply about responsible handling of data, safe defaults, and making sure AI-powered features remain dependable under production load.'
  },
  {
    title: 'Security focus',
    content:
      'I am actively expanding my cybersecurity knowledge and applying those lessons in architecture decisions, threat-aware development, and operational hardening. I am especially interested in resilient systems and practical security architecture.'
  },
  {
    title: 'Now',
    content:
      'CISSP is in progress, and I am exploring where AI engineering and cybersecurity overlap in practical, high-impact ways.'
  }
];

export default function AboutPage() {
  return (
    <Section>
      <Stack spacing={4} sx={{ maxWidth: 980 }}>
        <Box>
          <Typography component="h1" variant="h3" gutterBottom>
            About
          </Typography>
          <Typography color="text.secondary">
            A quick overview of my technical background, current focus, and what I&apos;m learning now.
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack spacing={2} alignItems="center" textAlign="center" sx={{ py: 2 }}>
                  <Avatar
                    alt="Placeholder portrait"
                    sx={{ width: 96, height: 96, bgcolor: 'secondary.light', color: 'text.primary', fontSize: 14 }}
                  >
                    TL
                  </Avatar>
                  <Typography variant="h6">Photo coming soon</Typography>
                  <Typography variant="body2" color="text.secondary">
                    A proper headshot will be added here.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Stack divider={<Divider flexItem />} spacing={2.5}>
                  {sections.map((section) => (
                    <Box key={section.title}>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {section.title}
                      </Typography>
                      <Typography color="text.secondary">{section.content}</Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Section>
  );
}
