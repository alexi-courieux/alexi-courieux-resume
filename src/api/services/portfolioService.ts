import axios, { HttpStatusCode } from 'axios';
import ApiError from '../models/apiError';
import { ProjectDetail, ProjectSummary } from '../models/project';

if (!import.meta.env.VITE_API_URL) {
    throw new Error('VITE_API_URL is not defined in the environment variables');
}

const API_URL = (import.meta.env.VITE_API_URL) + '/v1/portfolio/';

// axios-retry is configured globally on the axios instance by the other services.

export const getProjects = async (language?: string): Promise<ProjectSummary[]> => {
    const response = await axios.get(API_URL, { params: { language }, timeout: 10 * 1000 });
    if (response.status !== HttpStatusCode.Ok || !Array.isArray(response.data)) {
        throw new ApiError('Invalid response', response, response.status);
    }
    return response.data as ProjectSummary[];
};

export const getProject = async (id: string, language?: string): Promise<ProjectDetail> => {
    const response = await axios.get(API_URL + encodeURIComponent(id), { params: { language }, timeout: 5 * 1000 });
    if (response.status !== HttpStatusCode.Ok) {
        throw new ApiError(`Invalid response status: ${response.status}`, response, response.status);
    }
    return response.data as ProjectDetail;
};
