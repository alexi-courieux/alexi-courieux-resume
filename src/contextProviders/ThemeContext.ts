import { createContext } from "react";

export enum ThemeMode {
    Light = 'light',
    Dark = 'dark'
}

export interface ThemeContextType {
    mode: ThemeMode;
    toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);