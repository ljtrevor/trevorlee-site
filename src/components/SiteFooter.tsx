import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material';

import { siteConfig } from './siteConfig';

export function SiteFooter() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 10, py: 4 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
          <Typography variant="body2" color="text.secondary">
            {new Date().getFullYear()} Trevor Lee
          </Typography>

          <Stack direction="row" spacing={2}>
            <MuiLink
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
            >
              <LinkedInIcon fontSize="small" /> LinkedIn
            </MuiLink>
            <MuiLink
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
            >
              <GitHubIcon fontSize="small" /> GitHub
            </MuiLink>
            <MuiLink
              href={`mailto:${siteConfig.email}`}
              underline="hover"
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
            >
              <MailOutlineIcon fontSize="small" /> Email
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
