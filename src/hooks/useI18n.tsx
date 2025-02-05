import { useContext } from "react";
import { I18nContext, IContextProps } from "../contextProviders/I18nContextProvider";

export const useI18n = (): IContextProps => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within an I18nContextProvider');
  }

  return context;
};