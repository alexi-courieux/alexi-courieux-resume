import { useCallback, useEffect, useState } from "react";
import RequestState, { State } from "../models/requestState";
import { useI18n } from "./useI18n";
import { SkillSchema } from "../api/generated/types.gen";
import { getExperienceSkills, getSkills } from "../api/services/skillService";

interface UseSkillApiProps {
    getOnLoad?: boolean;
}

interface UseSkillApiResult {
    skills: SkillSchema[];
    getState: RequestState;
    list: (experienceId?:string) => Promise<void>;
}

const useSkillApi = ({ getOnLoad = false }: UseSkillApiProps): UseSkillApiResult => {
    const [skills, setSkills] = useState<SkillSchema[]>([]);
    const [getState, setGetState] = useState<RequestState>({ state: State.IDLE, error: undefined });
    const { i18n, loading: i18nLoading } = useI18n();

    const list = useCallback(async (experienceId?:string) => {
        setGetState({ state: State.PENDING, error: undefined });
        try {
            let skills: SkillSchema[];
            if (experienceId) {
                skills = await getExperienceSkills(experienceId, i18n.language);
            } else {
                skills = await getSkills(i18n.language);
            }
            setSkills(skills);
            setGetState({ state: State.SUCCESS, error: undefined });
        } catch (error) {
            console.error('Error fetching skills:', error);
            setGetState({ state: State.FAILURE, error: error });
        }
    }, [i18n.language]);

    useEffect(() => {
        if (getOnLoad) {
            if (i18nLoading || i18n === undefined || i18n.language === undefined) {
                return;
            }

            list();
        }
    }, [getOnLoad, i18nLoading, i18n, list]);

    return {
        skills,
        getState,
        list,
    };
};

export default useSkillApi;