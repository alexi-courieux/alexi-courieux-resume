import { PaletteOptions, ThemeOptions, createTheme } from '@mui/material/styles';

export const fontDisplay = '"Space Grotesk Variable", "Space Grotesk", sans-serif';

/** One radius scale: controls 8, cards and panels 12. */
export const radius = { control: 8, card: 12 } as const;

export const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Lato, sans-serif',
    h1: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: '-0.035em' },
    h2: { fontFamily: fontDisplay, fontWeight: 700, letterSpacing: '-0.025em' },
    h3: { fontFamily: fontDisplay, fontWeight: 600, letterSpacing: '-0.015em' },
    h4: { fontFamily: fontDisplay, fontWeight: 600, letterSpacing: '-0.015em' },
    h5: { fontFamily: fontDisplay, fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontFamily: fontDisplay, fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 700, fontSize: '1rem' },
  },
  shape: { borderRadius: radius.control },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
};

// Interface stays neutral: one warm near-black ink, one green accent.
const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: { main: '#2a6a50', contrastText: '#ffffff' },
  background: { default: '#f6f5f1', paper: '#ffffff' },
  text: { primary: '#1d1c1a', secondary: '#5a5750' },
  divider: 'rgba(29, 28, 26, 0.14)',
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: { main: '#7fcfa0', contrastText: '#0f1411' },
  background: { default: '#121412', paper: '#1a1d1a' },
  text: { primary: '#ecece8', secondary: '#a7aaa3' },
  divider: 'rgba(255, 255, 255, 0.13)',
};

export const getTheme = (mode: 'light' | 'dark') => {
  const palette = mode === 'light' ? lightPalette : darkPalette;
  const accent = mode === 'light' ? '#2a6a50' : '#7fcfa0';
  return createTheme({
    ...baseThemeOptions,
    palette,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': { '--focus': accent },
          html: { scrollBehavior: 'smooth', scrollPaddingTop: '96px' },
          '@media (prefers-reduced-motion: reduce)': {
            html: { scrollBehavior: 'auto' },
            '*, *::before, *::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              transitionDuration: '0.01ms !important',
            },
          },
          '::selection': { background: accent, color: mode === 'dark' ? '#0f1411' : '#ffffff' },
        },
      },
      MuiCard: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: 'none',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: radius.card,
          }),
        },
      },
      // MUI's ButtonBase resets `outline: 0`, which would cancel the global focus ring on every card and toggle.
      MuiButtonBase: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&.Mui-focusVisible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 },
          }),
        },
      },
      // One button pair: a filled accent primary and a 1px-outlined secondary. Both step on hover and press on click.
      MuiButton: {
        defaultProps: { disableElevation: true, disableRipple: true },
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: radius.control,
            minHeight: 44,
            paddingInline: 24,
            transition: 'background-color .2s, border-color .2s, transform .12s',
            '&:active': { transform: 'translateY(1px) scale(0.985)' },
            '&.Mui-focusVisible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 },
          }),
          containedPrimary: ({ theme }) => ({
            '&:hover': { backgroundColor: theme.palette.mode === 'dark' ? '#a0e0bb' : '#1f523c' },
          }),
          outlined: ({ theme }) => ({
            borderWidth: 1,
            borderColor: theme.palette.text.primary,
            color: theme.palette.text.primary,
            '&:hover': { borderWidth: 1, borderColor: theme.palette.text.primary, backgroundColor: theme.palette.action.hover },
          }),
        },
      },
    },
  });
};
