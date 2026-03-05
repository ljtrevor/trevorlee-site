'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { useLayoutEffect, useMemo, useState } from 'react';

import { ColorModeContext, COLOR_MODE_STORAGE_KEY } from '@/theme/colorMode';
import { getSiteTheme, type SiteThemeMode } from '@/theme/theme';

export function Providers({ children }: PropsWithChildren) {
  // Keep the first client render aligned with SSR to prevent hydration mismatches.
  const [mode, setMode] = useState<SiteThemeMode>('light');

  useLayoutEffect(() => {
    const fromStorage = localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    const preferredMode: SiteThemeMode =
      fromStorage === 'dark' || fromStorage === 'light'
        ? fromStorage
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';

    document.documentElement.setAttribute('data-color-mode', preferredMode);
    document.documentElement.style.colorScheme = preferredMode;
    setMode(preferredMode);
  }, []);

  const theme = useMemo(() => getSiteTheme(mode), [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleMode: () => {
        setMode((prevMode) => {
          const nextMode: SiteThemeMode = prevMode === 'light' ? 'dark' : 'light';

          document.documentElement.setAttribute('data-color-mode', nextMode);
          document.documentElement.style.colorScheme = nextMode;
          localStorage.setItem(COLOR_MODE_STORAGE_KEY, nextMode);

          return nextMode;
        });
      }
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
