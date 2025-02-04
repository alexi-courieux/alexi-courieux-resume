import React, {
  createContext, useCallback,
  useContext,
  useEffect, useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import {i18n, TFunction} from "i18next";

interface IContextProps {
  t: TFunction;
  i18n: i18n;
  loading: boolean; 
  onChangeLanguage: (language: string) => void;
  languages: Record<string, { nativeName: string }>;
  currentLanguage?: string;
}

const defaultContextValue: IContextProps = {
  t: ((key: string) => key) as TFunction,
  i18n: {} as i18n,
  loading: true,
  onChangeLanguage: () => {},
  languages: {},
};

const defaultLanguage = 'en';

const I18nContext = createContext<IContextProps>(defaultContextValue);

interface I18nContextProviderProps {
  children: React.ReactNode;
}

export const I18nContextProvider : React.FC<I18nContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  
  const languages = useMemo(() => ({
    en: { nativeName: "English" },
    fr: { nativeName: "Français" },
  }), []);

  const { t, i18n } = useTranslation();

  const onChangeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
  }, [i18n]);

  useEffect(() => {
    // Check if the language is set in the URL
    const params = new URLSearchParams(window.location.search);
    const preferedLanguage = window.navigator.languages.find((language) => Object.keys(languages).includes(language));
    const lang = params.get("lang") || params.get("language") || params.get("lng") || preferedLanguage || defaultLanguage;
    
    onChangeLanguage(lang);

    setLoading(false);

  }, [languages, onChangeLanguage]);

  return (
    <I18nContext.Provider value={{ t, i18n, loading, onChangeLanguage, languages }}>{children}</I18nContext.Provider>
  );
}

export const useI18n = (): IContextProps => {
  const context = useContext(I18nContext);

  if (!context || context === defaultContextValue) {
    throw new Error('useI18n must be used within an I18nContextProvider');
  }

  return context;
};