import { PaletteOptions, ThemeOptions, createTheme } from '@mui/material/styles';

export const fontDisplay = '"Space Grotesk Variable", "Space Grotesk", sans-serif';
export const fontMono = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Lato, sans-serif',
    h1: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: '-0.03em' },
    h2: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontFamily: fontDisplay, fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontFamily: fontDisplay, fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
};

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: { main: '#2f6f55' },
  secondary: { main: '#2c7a7b' },
  background: { default: '#f3f7f4', paper: '#ffffff' },
  text: { primary: '#14231c', secondary: '#44574d' },
  divider: 'rgba(20, 35, 28, 0.12)',
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: { main: '#7fcfa0' },
  secondary: { main: '#6cc4b8' },
  background: { default: '#08110c', paper: '#0f1a14' },
  text: { primary: '#e9f2ec', secondary: '#a3b5aa' },
  divider: 'rgba(255, 255, 255, 0.1)',
};

export const getTheme = (mode: 'light' | 'dark') => {
  const palette = mode === 'light' ? lightPalette : darkPalette;
  return createTheme({
    ...baseThemeOptions,
    palette,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: { scrollBehavior: 'smooth', scrollPaddingTop: '88px' },
          '@media (prefers-reduced-motion: reduce)': {
            html: { scrollBehavior: 'auto' },
            '*, *::before, *::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              transitionDuration: '0.01ms !important',
            },
          },
          '::selection': { background: mode === 'dark' ? '#7fcfa0' : '#2f6f55', color: mode === 'dark' ? '#08110c' : '#ffffff' },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: 'none',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 20,
            transition: 'border-color .25s, transform .25s, box-shadow .25s',
          }),
        },
      },
      MuiButton: {
        styleOverrides: { root: { borderRadius: 999 } },
      },
      MuiChip: {
        styleOverrides: { root: { fontFamily: fontMono, fontSize: '0.78rem' } },
      },
    },
  });
};
