import React, {
  createContext, useCallback,
  useContext,
  useEffect, useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import {i18n, TFunction} from "i18next";

interface IContextProps {
  t: TFunction;
  i18n: i18n;
  onChangeLanguage: (language: string) => void;
  languages: Record<string, { nativeName: string }>;
}

const defaultContextValue: IContextProps = {
  t: ((key: string) => key) as TFunction,
  i18n: {} as i18n,
  onChangeLanguage: () => {},
  languages: {},
};

const I18nContext = createContext<IContextProps>(defaultContextValue);

interface I18nContextProviderProps {
  children: React.ReactNode;
}

export const I18nContextProvider : React.FC<I18nContextProviderProps> = ({ children }) => {
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
    const lang = params.get("lang") || params.get("language") || params.get("lng");
    if (lang) {
      onChangeLanguage(lang);
      return;
    }
    // Detect the user's prefered language
    const preferedLanguage = window.navigator.languages.find((language) => Object.keys(languages).includes(language));
    if (preferedLanguage) {
      onChangeLanguage(preferedLanguage);
    }

  }, [languages, onChangeLanguage]);

  return (
    <I18nContext.Provider value={{ t, i18n, onChangeLanguage, languages }}>{children}</I18nContext.Provider>
  );
}

export const useI18n = () => {
  const context = useContext(I18nContext);

  if (context === defaultContextValue) {
    console.error("I18nContext is not defined.");
  }

  return context;
};