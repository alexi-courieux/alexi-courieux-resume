import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nContext } from "./I18nContext";
import { buildLanguageUrl } from "../utils/languageUrl";

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
    // Language resolution order: /en or /fr in the path, legacy ?lang= parameter,
    // browser language, default language. The URL is then normalised to /<lang>/.
    const keys = languages.map((lang) => lang.key);
    const pathLanguage = /^\/([a-z]{2})(?:\/|$)/.exec(globalThis.location.pathname)?.[1];
    const params = new URLSearchParams(globalThis.location.search);
    const legacyLanguage = params.get("lang") ?? params.get("language") ?? params.get("lng");
    const browserLanguage = globalThis.navigator.languages
      .map((language) => language.slice(0, 2).toLowerCase())
      .find((language) => keys.includes(language));

    const candidate = [pathLanguage, legacyLanguage, browserLanguage].find((language) => language && keys.includes(language));
    const lang = candidate ?? defaultLanguage;

    if (pathLanguage !== lang) {
      globalThis.history.replaceState(null, "", buildLanguageUrl(lang, true));
    }

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