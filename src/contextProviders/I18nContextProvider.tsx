import React, { createContext, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { i18n, TFunction } from "i18next";

export interface ILanguage {
  key: string;
  flag: string;
  nativeName: string;
}

export interface IContextProps {
  t: TFunction;
  i18n: i18n;
  loading: boolean;
  onChangeLanguage: (language: string) => void;
  languages: ILanguage[];
  currentLanguage?: string;
}

const defaultLanguage = 'en';

export const I18nContext = createContext<IContextProps | undefined>(undefined);

interface I18nContextProviderProps {
  children: React.ReactNode;
}

export const I18nContextProvider: React.FC<I18nContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const languages: ILanguage[] = [
    { key: 'en', flag: 'gb', nativeName: 'English' },
    { key: 'fr', flag: 'fr', nativeName: 'Français' }
  ];

  const { t, i18n } = useTranslation();

  const onChangeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
  }, [i18n]);

  useEffect(() => {
    // Check if the language is set in the URL, otherwise use the browser's language, otherwise use the default language
    const params = new URLSearchParams(window.location.search);
    const preferedLanguage = window.navigator.languages.find((language) => languages.some(lang => lang.key === language));
    const lang = params.get("lang") || params.get("language") || params.get("lng") || preferedLanguage || defaultLanguage;

    onChangeLanguage(lang);

    setLoading(false);

  }, [onChangeLanguage]);

  return (
    <I18nContext.Provider value={{ t, i18n, loading, onChangeLanguage, languages }}>
      {children}
    </I18nContext.Provider>
  );
};