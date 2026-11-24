import { SkillSchema } from "../generated/types.gen";

/** Card returned by GET /v1/portfolio/ (no long description). */
export type ProjectSummary = {
    id: string;
    title: string;
    shortDescription: string;
    thumbnailUri: string;
    thumbnailAlt: string;
    linkUrl?: string | null;
    linkLabel?: string | null;
    projectDate: string;
    featured: boolean;
    skills: SkillSchema[];
};

/** Full project returned by GET /v1/portfolio/{project_id}. */
export type ProjectDetail = ProjectSummary & {
    description: string;
    repositoryUrl?: string | null;
};
