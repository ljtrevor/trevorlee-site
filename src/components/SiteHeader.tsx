'use client';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useColorMode } from '@/theme/colorMode';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'CISSP Study Log', href: '/cissp-study-log' },
  { label: 'Contact', href: '/contact' }
];

export function SiteHeader() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, toggleMode } = useColorMode();

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <AppBar position="sticky" component="header">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 600, flexGrow: 1 }}
          >
            Trevor Lee
          </Typography>

          <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                color="inherit"
                sx={{
                  border: isActive(item.href) ? '1px solid' : '1px solid transparent',
                  borderColor: isActive(item.href) ? 'divider' : 'transparent',
                  backgroundColor: isActive(item.href) ? 'background.paper' : 'transparent'
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
            <IconButton
              color="inherit"
              onClick={toggleMode}
              aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              sx={{ ml: { xs: 0, md: 1 } }}
            >
              {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
          </Tooltip>

          <IconButton
            color="inherit"
            aria-label="Open menu"
            aria-controls="mobile-navigation"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box id="mobile-navigation" sx={{ width: 260, p: 2 }} role="navigation" aria-label="Mobile navigation">
          <Stack spacing={1}>
            {navItems.map((item) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                variant={isActive(item.href) ? 'contained' : 'text'}
                color={isActive(item.href) ? 'primary' : 'inherit'}
                sx={{ justifyContent: 'flex-start' }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
}
