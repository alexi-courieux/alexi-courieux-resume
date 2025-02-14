import { createContext } from "react";
import { IContextProps } from "./I18nContextProvider";

export const I18nContext = createContext<IContextProps | undefined>(undefined);