import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nContext } from "./I18nContext";

export interface ILanguage {
  key: string;
  flag: string;
  nativeName: string;
}

const defaultLanguage = 'en';

interface I18nContextProviderProps {
  children: React.ReactNode;
}

export const I18nContextProvider: React.FC<I18nContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const languages: ILanguage[] = useMemo(() => [
    { key: 'en', flag: 'gb', nativeName: 'English' },
    { key: 'fr', flag: 'fr', nativeName: 'Français' }
  ], []);

  const { t, i18n } = useTranslation();

  const onChangeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
  }, [i18n]);

  useEffect(() => {
    // Check if the language is set in the URL, otherwise use the browser's language, otherwise use the default language
    const params = new URLSearchParams(window.location.search);
    const preferedLanguage = window.navigator.languages.find((language) => languages.some(lang => lang.key === language));
    const lang = (params.get("lang") ?? params.get("language")) ?? params.get("lng") ?? preferedLanguage ?? defaultLanguage;

    onChangeLanguage(lang);

    setLoading(false);

  }, [languages, onChangeLanguage]);

  const contextValue = useMemo(() => ({
    t,
    i18n,
    loading,
    onChangeLanguage,
    languages
  }), [t, i18n, loading, onChangeLanguage, languages]);

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};