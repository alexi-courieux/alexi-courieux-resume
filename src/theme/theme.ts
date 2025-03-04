import { PaletteOptions, ThemeOptions, createTheme } from '@mui/material/styles';

export const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
  
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
  },
};

const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#005F6B',
  },
  secondary: {
    main: '#17A589',
  },
  background: {
    default: '#ffffff',
    paper: '#f9f9f9',
  },
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#17A589',
  },
  secondary: {
    main: '#1e7d89',
  },
  background: {
    default: '#242424',
    paper: '#1a1a1a',
  },
};

export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    ...baseThemeOptions,
    palette: mode === 'light' ? lightPalette : darkPalette,
  });
};