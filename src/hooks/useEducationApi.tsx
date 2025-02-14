import { useCallback, useEffect, useState } from "react";
import RequestState, { State } from "../models/requestState";
import { useI18n } from "./useI18n";
import { EducationSchema } from "../api/generated/types.gen";import { getEducations } from "../api/services/educationService";

interface UseEducationApiProps {
    getOnLoad?: boolean;
}

interface UseEducationApiResult {
    educations: EducationSchema[];
    getState: RequestState;
    list: (experienceId?:string) => Promise<void>;
}

const useEducationApi = ({ getOnLoad = false }: UseEducationApiProps): UseEducationApiResult => {
    const [educations, setEducations] = useState<EducationSchema[]>([]);
    const [getState, setGetState] = useState<RequestState>({ state: State.IDLE, error: undefined });
    const { i18n, loading: i18nLoading } = useI18n();

    const list = useCallback(async () => {
        setGetState({ state: State.PENDING, error: undefined });
        try {
            const educations =  await getEducations(i18n.language);
            setEducations(educations);
            setGetState({ state: State.SUCCESS, error: undefined });
        } catch (error) {
            console.error('Error fetching Educations:', error);
            setGetState({ state: State.FAILURE, error: error });
        }
    }, [i18n.language]);

    useEffect(() => {
        if (getOnLoad) {
            if (i18nLoading || i18n?.language === undefined) {
                return;
            }

            list();
        }
    }, [getOnLoad, i18nLoading, i18n, list]);

    return {
        educations,
        getState,
        list,
    };
};

export default useEducationApi;