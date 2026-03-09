import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';
import Image from 'next/image';
import type { ReactNode } from 'react';

import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'About | Trevor Lee',
  description:
    'Learn about Trevor Lee, working at the intersection of AI systems, security, privacy-conscious design, and resilient technology.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Trevor Lee',
    description:
      'Background, AI systems work, privacy-conscious design, and security focus for Trevor Lee, including current CISSP study progress.',
    url: '/about'
  },
  twitter: {
    card: 'summary',
    title: 'About Trevor Lee',
    description:
      'Background and focus areas of Trevor Lee across AI systems, security, and privacy-conscious design.',
  }
};

const sections = [
  {
    title: 'Background',
    icon: <WorkOutlineOutlinedIcon color="primary" fontSize="small" />,
    content:
      'My background is in building production software across frontend, backend, APIs, and cloud systems. I enjoy turning complex ideas into practical tools that are reliable, observable, and built to operate in real-world environments.'
  },
  {
    title: 'AI Work',
    icon: <AutoAwesomeOutlinedIcon color="primary" fontSize="small" />,
    content:
      'Much of my recent work has focused on integrating large language models into products and workflows. I’m particularly interested in building AI capabilities that are reliable, understandable, and designed with responsible use in mind.'
  },
  {
    title: 'Security & Privacy',
    icon: <SecurityOutlinedIcon color="primary" fontSize="small" />,
    content:
      'As AI becomes embedded across systems, I’ve become increasingly interested in the security and privacy challenges that come with it. I focus on secure architecture, responsible data handling, and systems designed to protect both users and information.'
  },
  {
    title: 'Now',
    icon: <TrackChangesOutlinedIcon color="primary" fontSize="small" />,
    content:
      'I’m currently deepening my cybersecurity practice and preparing for the CISSP while exploring the intersection of AI, security, and privacy. My goal is to help organizations adopt modern technology in ways that are secure, responsible, and resilient.'
  }
] satisfies Array<{ title: string; icon: ReactNode; content: string }>;

export default function AboutPage() {
  return (
    <Section>
      <Stack
        spacing={1}
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
            A quick overview of my background, current focus, and where I’m heading.
          </Typography>
        </Box>

        <Grid
          container
          rowSpacing={{ xs: 2, md: 3 }}
          columnSpacing={{ xs: 0, md: 3 }}
          alignItems="flex-start"
          sx={{
            m: 0,
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            overflowX: 'hidden'
          }}
        >
          <Grid item xs={12} md={4} sx={{ minWidth: 0, maxWidth: '100%', alignSelf: 'flex-start' }}>
            <Card>
              <CardContent sx={{ py: 3 }}>
                <Stack spacing={2.5} alignItems="center" textAlign="center">

                <Box
                  sx={{
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid',
                    borderColor: 'divider',
                    position: 'relative'
                  }}
                >
                  <Image
                    src="/images/headshot-avatar.jpg"
                    alt="Trevor Lee headshot"
                    fill
                    sizes="180px"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>

                  <Stack spacing={0.5}>
                    <Typography variant="h6">Trevor Lee</Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ maxWidth: 220 }}
                    >
                      Building secure and responsible AI systems.
                    </Typography>
                  </Stack>

                  <Divider flexItem sx={{ my: 1 }} />

                  <Stack spacing={1.25} sx={{ width: '100%' }}>

                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      <PlaceOutlinedIcon fontSize="small" color="primary" />
                      <Typography variant="body2" color="text.secondary">
                        Greater Vancouver, BC
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      <SecurityOutlinedIcon fontSize="small" color="primary" />
                      <Typography variant="body2" color="text.secondary">
                        AI Security & Privacy
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                      <TrackChangesOutlinedIcon fontSize="small" color="primary" />
                      <Typography variant="body2" color="text.secondary">
                        CISSP (in progress)
                      </Typography>
                    </Stack>

                  </Stack>
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
