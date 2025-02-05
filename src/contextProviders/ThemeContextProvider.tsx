import { createContext, useState, ReactNode } from 'react';
import { getTheme } from '../theme/theme';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';


type ThemeMode = 'light' | 'dark';

export interface ThemeContextType {
    mode: ThemeMode;
    toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDarkMode ? 'dark' : 'light';
    });

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleMode }}>
            <MuiThemeProvider theme={getTheme(mode)}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};