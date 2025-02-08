// This file is auto-generated by @hey-api/openapi-ts

export type EducationSchema = {
    id: number;
    school: string;
    location: string;
    degree: string;
    startDate: string;
    endDate?: string | null;
    imageUri?: string | null;
};

export type ExperienceSchema = {
    id: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate?: string | null;
    shortDescription: string;
    description: string;
};

export type HttpValidationError = {
    detail?: Array<ValidationError>;
};

export type SkillSchema = {
    id: string;
    name: string;
    categories: Array<string>;
};

export type ValidationError = {
    loc: Array<string | number>;
    msg: string;
    type: string;
};

export type ReadExperienceV1ExperienceCompanyGetData = {
    body?: never;
    path: {
        company: string;
    };
    query?: {
        language?: string;
    };
    url: '/v1/experience/{company}';
};

export type ReadExperienceV1ExperienceCompanyGetErrors = {
    /**
     * Experience not found
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type ReadExperienceV1ExperienceCompanyGetError = ReadExperienceV1ExperienceCompanyGetErrors[keyof ReadExperienceV1ExperienceCompanyGetErrors];

export type ReadExperienceV1ExperienceCompanyGetResponses = {
    /**
     * Successful Response
     */
    200: ExperienceSchema;
};

export type ReadExperienceV1ExperienceCompanyGetResponse = ReadExperienceV1ExperienceCompanyGetResponses[keyof ReadExperienceV1ExperienceCompanyGetResponses];

export type ListExperiencesV1ExperienceGetData = {
    body?: never;
    path?: never;
    query?: {
        language?: string;
    };
    url: '/v1/experience/';
};

export type ListExperiencesV1ExperienceGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type ListExperiencesV1ExperienceGetError = ListExperiencesV1ExperienceGetErrors[keyof ListExperiencesV1ExperienceGetErrors];

export type ListExperiencesV1ExperienceGetResponses = {
    /**
     * Successful Response
     */
    200: Array<ExperienceSchema>;
};

export type ListExperiencesV1ExperienceGetResponse = ListExperiencesV1ExperienceGetResponses[keyof ListExperiencesV1ExperienceGetResponses];

export type ListSkillsExperienceV1SkillExperienceIdGetData = {
    body?: never;
    path: {
        experienceId: string;
    };
    query?: {
        language?: string;
    };
    url: '/v1/skill/{experienceId}';
};

export type ListSkillsExperienceV1SkillExperienceIdGetErrors = {
    /**
     * No skills found for experience
     */
    404: unknown;
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type ListSkillsExperienceV1SkillExperienceIdGetError = ListSkillsExperienceV1SkillExperienceIdGetErrors[keyof ListSkillsExperienceV1SkillExperienceIdGetErrors];

export type ListSkillsExperienceV1SkillExperienceIdGetResponses = {
    /**
     * Successful Response
     */
    200: Array<SkillSchema>;
};

export type ListSkillsExperienceV1SkillExperienceIdGetResponse = ListSkillsExperienceV1SkillExperienceIdGetResponses[keyof ListSkillsExperienceV1SkillExperienceIdGetResponses];

export type ListSkillsV1SkillGetData = {
    body?: never;
    path?: never;
    query?: {
        language?: string;
    };
    url: '/v1/skill/';
};

export type ListSkillsV1SkillGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type ListSkillsV1SkillGetError = ListSkillsV1SkillGetErrors[keyof ListSkillsV1SkillGetErrors];

export type ListSkillsV1SkillGetResponses = {
    /**
     * Successful Response
     */
    200: Array<SkillSchema>;
};

export type ListSkillsV1SkillGetResponse = ListSkillsV1SkillGetResponses[keyof ListSkillsV1SkillGetResponses];

export type ListEducationsV1EducationGetData = {
    body?: never;
    path?: never;
    query?: {
        language?: string;
    };
    url: '/v1/education/';
};

export type ListEducationsV1EducationGetErrors = {
    /**
     * Validation Error
     */
    422: HttpValidationError;
};

export type ListEducationsV1EducationGetError = ListEducationsV1EducationGetErrors[keyof ListEducationsV1EducationGetErrors];

export type ListEducationsV1EducationGetResponses = {
    /**
     * Successful Response
     */
    200: Array<EducationSchema>;
};

export type ListEducationsV1EducationGetResponse = ListEducationsV1EducationGetResponses[keyof ListEducationsV1EducationGetResponses];

export type ClientOptions = {
    baseURL: 'http://localhost:8000' | (string & {});
};