import { alpha, createTheme } from '@mui/material/styles';

export type SiteThemeMode = 'light' | 'dark';

const lightPalette = {
  stone: '#f5f3ef',
  paper: '#faf9f6',
  slate: '#2f3b3b',
  mutedMoss: '#6f8371',
  mutedInk: '#5f7083',
  textPrimary: '#1f2524',
  textSecondary: '#4b5552',
  border: '#d7dad7'
};

const darkPalette = {
  charcoal: '#141918',
  ink: '#1c2424',
  elevated: '#232d2c',
  mutedMoss: '#8ea891',
  mutedInk: '#93a6bb',
  textPrimary: '#e8ecea',
  textSecondary: '#b4bdb9',
  border: '#364140'
};

export function getSiteTheme(mode: SiteThemeMode) {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? darkPalette.mutedInk : lightPalette.mutedInk
      },
      secondary: {
        main: isDark ? darkPalette.mutedMoss : lightPalette.mutedMoss
      },
      background: {
        default: isDark ? darkPalette.charcoal : lightPalette.stone,
        paper: isDark ? darkPalette.ink : lightPalette.paper
      },
      text: {
        primary: isDark ? darkPalette.textPrimary : lightPalette.textPrimary,
        secondary: isDark ? darkPalette.textSecondary : lightPalette.textSecondary
      },
      divider: isDark ? darkPalette.border : lightPalette.border
    },
    shape: {
      borderRadius: 14
    },
    typography: {
      fontFamily: 'var(--font-sans), var(--font-japanese), sans-serif',
      h1: {
        fontWeight: 600,
        letterSpacing: '-0.02em'
      },
      h2: {
        fontWeight: 600,
        letterSpacing: '-0.01em'
      },
      h3: {
        fontWeight: 600
      },
      button: {
        textTransform: 'none',
        fontWeight: 500
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            background: isDark
              ? 'radial-gradient(circle at top right, rgba(142, 168, 145, 0.12), transparent 46%), radial-gradient(circle at 10% 20%, rgba(147, 166, 187, 0.12), transparent 42%)'
              : 'radial-gradient(circle at top right, rgba(111, 131, 113, 0.12), transparent 45%), radial-gradient(circle at 10% 20%, rgba(95, 112, 131, 0.14), transparent 40%)',
            backgroundColor: isDark ? darkPalette.charcoal : lightPalette.stone,
            color: isDark ? darkPalette.textPrimary : lightPalette.textPrimary,
            transition: 'background-color 220ms ease, color 220ms ease'
          },
          a: {
            color: 'inherit'
          },
          '*:focus-visible': {
            outline: `2px solid ${isDark ? darkPalette.mutedInk : lightPalette.mutedInk}`,
            outlineOffset: '2px'
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? alpha(darkPalette.ink, 0.9) : alpha(lightPalette.stone, 0.92),
            backdropFilter: 'saturate(170%) blur(8px)',
            borderBottom: `1px solid ${isDark ? darkPalette.border : lightPalette.border}`,
            color: isDark ? darkPalette.textPrimary : lightPalette.textPrimary,
            boxShadow: 'none',
            transition: 'background-color 220ms ease, color 220ms ease, border-color 220ms ease'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${isDark ? darkPalette.border : lightPalette.border}`,
            backgroundColor: isDark ? darkPalette.ink : lightPalette.paper,
            boxShadow: 'none',
            transition: 'background-color 220ms ease, border-color 220ms ease, color 220ms ease'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'background-color 220ms ease, color 220ms ease, border-color 220ms ease'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            transition: 'background-color 180ms ease, color 180ms ease, border-color 180ms ease'
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8
          }
        }
      }
    }
  });
}
