import { useState, ReactNode, useMemo } from 'react';
import { getTheme } from '../theme/theme';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ThemeContext, ThemeMode } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        const prefersDarkMode = globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDarkMode ? ThemeMode.Dark : ThemeMode.Light;
    });

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light));
    };

    const contextValue = useMemo(() => ({
        mode,
        toggleMode
    }), [mode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={getTheme(mode)}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};