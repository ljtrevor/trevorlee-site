'use client';

import { createContext, useContext } from 'react';

import type { SiteThemeMode } from './theme';

type ColorModeContextValue = {
  mode: SiteThemeMode;
  toggleMode: () => void;
};

export const COLOR_MODE_STORAGE_KEY = 'trevorlee-site-theme-mode';

export const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'light',
  toggleMode: () => undefined
});

export function useColorMode() {
  return useContext(ColorModeContext);
}
