import { useContext } from "react";
import { I18nContext, IContextProps } from "../contextProviders/I18nContext";
import { enGB, fr } from "date-fns/locale";
import { format } from "date-fns";
import { capitalizeFirstLetter } from "../utils/stringUtils";

interface IUseI18nResponse extends IContextProps {
  formatDate: (dateString: string, formatString?: string, enforceCapitalizeFirstLetter?: boolean) => string;
}

export const useI18n = (): IUseI18nResponse => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useI18n must be used within an I18nContextProvider');
  }

  const mapToDateFnsLocale = (language: string) =>  {
    switch (language) {
      case 'fr':
        return fr;
      case 'en':
        return enGB;
    }
  }

  const formatDate = (dateString: string, formatString: string = "MMMM yyyy", enforceCapitalizeFirstLetter = false) => {
    const date = new Date(dateString);
    const locale = mapToDateFnsLocale(context.i18n.language);
    const fdate = format(date, formatString, { locale });
    if (enforceCapitalizeFirstLetter) {
      return capitalizeFirstLetter(fdate);
    }
    return fdate;
  }

  return { ...context, formatDate };
};