import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Avatar, Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

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
    icon: <WorkOutlineOutlinedIcon color="primary" fontSize="small" />,
    content:
      'I build reliable products that turn complex ideas into practical tools. My experience spans frontend interfaces, backend services, APIs, and cloud infrastructure, with a focus on systems that are maintainable, observable, and ready for production. I enjoy working across the full lifecycle of a product, from early design decisions through production operations.'
  },
  {
    title: 'AI work',
    icon: <AutoAwesomeOutlinedIcon color="primary" fontSize="small" />,
    content:
      'Much of my recent work has involved integrating large language models into real products and workflows. This includes designing AI-powered features, orchestrating model interactions, and ensuring these capabilities behave reliably in production environments. I place strong emphasis on responsible data handling, safe defaults, and building AI capabilities people can trust.'
  },
  {
    title: 'Security',
    icon: <ShieldOutlinedIcon color="primary" fontSize="small" />,
    content:
      'As AI becomes more embedded in modern software, I’ve become increasingly interested in the security implications of these technologies. I approach engineering decisions with a security mindset, considering threat models, operational resilience, and long-term reliability. I’m particularly interested in practical security architecture and resilient system design.'
  },
  {
    title: 'Now',
    icon: <TrackChangesOutlinedIcon color="primary" fontSize="small" />,
    content:
      'I’m currently preparing for the CISSP while deepening my understanding of how AI systems and cybersecurity intersect. My goal is to help ensure that modern software platforms can adopt AI capabilities safely while maintaining strong security and operational foundations.'
  }
] satisfies Array<{ title: string; icon: ReactNode; content: string }>;

export default function AboutPage() {
  return (
    <Section>
      <Stack
        spacing={4}
        sx={{
          width: '100%',
          mx: 'auto',
          maxWidth: 980,
          boxSizing: 'border-box',
          overflowX: 'hidden'
        }}
      >
        <Box>
          <Typography component="h1" variant="h3" gutterBottom>
            About
          </Typography>
          <Typography color="text.secondary">
            A quick overview of my technical background, current focus, and what I&apos;m learning now.
          </Typography>
        </Box>

        <Grid
          container
          rowSpacing={{ xs: 2, md: 3 }}
          columnSpacing={{ xs: 0, md: 3 }}
          alignItems="stretch"
          sx={{
            m: 0,
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden'
          }}
        >
          <Grid item xs={12} md={4} sx={{ minWidth: 0, maxWidth: '100%' }}>
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

          <Grid item xs={12} md={8} sx={{ minWidth: 0, maxWidth: '100%' }}>
            <Card>
              <CardContent>
                <Stack divider={<Divider flexItem />} spacing={2.5}>
                  {sections.map((section) => (
                    <Box key={section.title}>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Box aria-hidden sx={{ display: 'inline-flex', alignItems: 'center' }}>
                          {section.icon}
                        </Box>
                        <Typography variant="h6" component="h2">
                          {section.title}
                        </Typography>
                      </Stack>
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
