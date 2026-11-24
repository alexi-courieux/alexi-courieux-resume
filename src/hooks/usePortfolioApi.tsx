import { useCallback, useEffect, useState } from "react";
import RequestState, { State } from "../models/requestState";
import { useI18n } from "./useI18n";
import { ProjectDetail, ProjectSummary } from "../api/models/project";
import { getProject, getProjects } from "../api/services/portfolioService";
import { dateSortDesc } from "../utils/sort";

/** Lists portfolio projects on load (featured first, then newest). */
export const useProjectList = () => {
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [getState, setGetState] = useState<RequestState>({ state: State.IDLE, error: undefined });
    const { i18n, loading: i18nLoading } = useI18n();

    const list = useCallback(async () => {
        setGetState({ state: State.PENDING, error: undefined });
        try {
            const data = await getProjects(i18n.language);
            setProjects(data.toSorted((a, b) => Number(b.featured) - Number(a.featured) || dateSortDesc(a.projectDate, b.projectDate)));
            setGetState({ state: State.SUCCESS, error: undefined });
        } catch (error) {
            console.error('Error fetching projects:', error);
            setGetState({ state: State.FAILURE, error });
        }
    }, [i18n.language]);

    useEffect(() => {
        if (i18nLoading || i18n?.language === undefined) return;
        list();
    }, [i18n.language, i18nLoading, i18n, list]);

    return { projects, getState, list };
};

/** Fetches one full project (long description, repository link) on demand. */
export const useProjectDetail = () => {
    const [project, setProject] = useState<ProjectDetail | undefined>(undefined);
    const [getState, setGetState] = useState<RequestState>({ state: State.IDLE, error: undefined });
    const { i18n } = useI18n();

    const read = useCallback(async (id: string) => {
        setProject(undefined);
        setGetState({ state: State.PENDING, error: undefined });
        try {
            setProject(await getProject(id, i18n.language));
            setGetState({ state: State.SUCCESS, error: undefined });
        } catch (error) {
            console.error('Error fetching project:', error);
            setGetState({ state: State.FAILURE, error });
        }
    }, [i18n.language]);

    return { project, getState, read };
};
