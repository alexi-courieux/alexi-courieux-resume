import { createContext } from "react";
import { ILanguage } from "./I18nContextProvider";
import { i18n, TFunction } from "i18next";

export interface IContextProps {
  t: TFunction;
  i18n: i18n;
  loading: boolean;
  onChangeLanguage: (language: string) => void;
  languages: ILanguage[];
  currentLanguage?: string;
}

export const I18nContext = createContext<IContextProps | undefined>(undefined);