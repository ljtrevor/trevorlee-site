'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { PropsWithChildren } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { ColorModeContext, COLOR_MODE_STORAGE_KEY } from '@/theme/colorMode';
import { getSiteTheme, type SiteThemeMode } from '@/theme/theme';

export function Providers({ children }: PropsWithChildren) {
  // Keep the initial render aligned with SSR, then switch to preferred mode immediately after mount.
  const [mode, setMode] = useState<SiteThemeMode>('light');

  useEffect(() => {
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

    // Re-enable transitions/animations after theme mode is applied and painted.
    let secondFrame: number | null = null;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        document.documentElement.removeAttribute('data-theme-booting');
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== null) {
        window.cancelAnimationFrame(secondFrame);
      }
      document.documentElement.removeAttribute('data-theme-booting');
    };
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
