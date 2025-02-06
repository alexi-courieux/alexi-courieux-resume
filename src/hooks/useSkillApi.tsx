import { useCallback, useEffect, useState } from "react";
import { Skill } from "../api/models/skill";
import RequestState, { State } from "../models/requestState";
import { useI18n } from "./useI18n";
import { getSkills, getExperienceSkills } from "../api/services/skillService";

interface UseSkillApiProps {
    getOnLoad?: boolean;
}

interface UseSkillApiResult {
    skills: Skill[];
    getState: RequestState;
    list: (experienceId?:string) => Promise<void>;
}

const useSkillApi = ({ getOnLoad = false }: UseSkillApiProps): UseSkillApiResult => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [getState, setGetState] = useState<RequestState>({ state: State.IDLE, error: undefined });
    const { i18n, loading: i18nLoading } = useI18n();

    const list = useCallback(async (experienceId?:string) => {
        setGetState({ state: State.PENDING, error: undefined });
        try {
            let skills: Skill[];
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