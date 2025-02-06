import { useCallback, useEffect, useState } from "react";
import Experience from "../api/models/experience";
import RequestState, { State } from "../models/requestState";
import { getExperiences, getExperience } from "../api/services/experienceService";
import { useI18n } from "./useI18n";

interface UseExperienceApiProps {
    experienceId?: string;
    getOnLoad?: boolean;
}

interface UseExperienceApiResult {
    experiences: Experience[] | Experience;
    getState: RequestState;
    read: () => Promise<void>;
    list: () => Promise<void>;
}

const useExperienceApi = ({ experienceId, getOnLoad = false }: UseExperienceApiProps): UseExperienceApiResult => {
    const [experiences, setExperiences] = useState<Experience[] | Experience>([]);
    const [getState, setGetState] = useState<RequestState>({ state: State.IDLE, error: undefined });
    const { i18n, loading: i18nLoading } = useI18n();

    const list = useCallback(async () => {
        setGetState({ state: State.PENDING, error: undefined });
        try {
            const experiences = await getExperiences(i18n.language);
            setExperiences(experiences);
            setGetState({ state: State.SUCCESS, error: undefined });
        } catch (error) {
            console.error('Error fetching experiences:', error);
            setGetState({ state: State.FAILURE, error: error });
        }
    }, [i18n.language]);

    const read = useCallback(async () => {
        if (!experienceId) {
            return;
        }

        setGetState({ state: State.PENDING, error: undefined });
        try {
            const experience = await getExperience(experienceId, i18n.language);
            setExperiences(experience);
            setGetState({ state: State.SUCCESS, error: undefined });
        } catch (error) {
            console.error('Error fetching experience:', error);
            setGetState({ state: State.FAILURE, error: error });
        }
    }, [experienceId, i18n.language]);

    useEffect(() => {
        if (getOnLoad) {
            if (i18nLoading || i18n === undefined || i18n.language === undefined) {
                return;
            }

            if (experienceId) {
                read();
            } else {
                list();
            }
        }
    }, [experienceId, i18n, i18n.language, i18nLoading, list, read, getOnLoad]);

    return { experiences, getState, read, list };
}

export default useExperienceApi;