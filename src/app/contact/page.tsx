import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Card, CardContent, Link as MuiLink, Stack, Typography } from '@mui/material';
import type { Metadata } from 'next';

import { Section } from '@/components/Section';
import { siteConfig } from '@/components/siteConfig';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Trevor Lee via email, LinkedIn, or GitHub.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Trevor Lee',
    description: 'Reach Trevor Lee by email, LinkedIn, or GitHub.',
    url: '/contact'
  },
  twitter: {
    card: 'summary',
    title: 'Contact Trevor Lee',
    description: 'Reach Trevor Lee by email, LinkedIn, or GitHub.'
  }
};

export default function ContactPage() {
  return (
    <Section>
      <Stack spacing={3} sx={{ maxWidth: 720 }}>
        <Typography component="h1" variant="h3">
          Contact
        </Typography>
        <Typography color="text.secondary">
          If you&apos;d like to collaborate or just connect, I&apos;d be glad to hear from you.
        </Typography>

        <Card>
          <CardContent>
            <Stack spacing={2.5}>
              <MuiLink href={`mailto:${siteConfig.email}`} underline="hover" sx={{ display: 'inline-flex', gap: 1 }}>
                <MailOutlineIcon fontSize="small" /> {siteConfig.emailObfuscated}
              </MuiLink>
              <MuiLink
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ display: 'inline-flex', gap: 1 }}
              >
                <LinkedInIcon fontSize="small" /> LinkedIn
              </MuiLink>
              <MuiLink
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ display: 'inline-flex', gap: 1 }}
              >
                <GitHubIcon fontSize="small" /> GitHub
              </MuiLink>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Section>
  );
}
