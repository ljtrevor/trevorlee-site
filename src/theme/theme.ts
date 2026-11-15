import { createTheme } from '@mui/material/styles';

export type SiteThemeMode = 'light' | 'dark';

/*
  MUI is only used on the CISSP study log page. These values mirror the CSS
  tokens in src/app/globals.css; change both together.
*/
const tokens = {
  light: {
    paper: '#f3f5f2',
    paperRaised: '#fafbf9',
    ink: '#14211d',
    muted: '#52615b',
    rule: '#ccd4cf',
    accent: '#2447d6'
  },
  dark: {
    paper: '#0e1614',
    paperRaised: '#141e1b',
    ink: '#e6ece8',
    muted: '#9aa8a1',
    rule: '#2a3833',
    accent: '#9db4ff'
  }
} as const;

const sans = 'var(--font-sans), system-ui, sans-serif';

export function getSiteTheme(mode: SiteThemeMode) {
  const t = tokens[mode];

  return createTheme({
    palette: {
      mode,
      primary: { main: t.accent },
      secondary: { main: t.muted },
      background: { default: t.paper, paper: t.paperRaised },
      text: { primary: t.ink, secondary: t.muted },
      divider: t.rule
    },
    shape: {
      borderRadius: 6
    },
    typography: {
      fontFamily: sans,
      h1: { fontWeight: 600, letterSpacing: '-0.025em' },
      h2: { fontWeight: 600, letterSpacing: '-0.02em' },
      h3: { fontWeight: 600, letterSpacing: '-0.02em' },
      h6: { fontWeight: 600, letterSpacing: '-0.01em' },
      button: { textTransform: 'none', fontWeight: 500 }
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${t.rule}`,
            backgroundColor: t.paperRaised,
            backgroundImage: 'none',
            boxShadow: 'none'
          }
        }
      },
      MuiButton: {
        defaultProps: { disableElevation: true }
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 4 }
        }
      }
    }
  });
}
