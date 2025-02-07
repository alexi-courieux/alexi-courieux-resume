import axios, { HttpStatusCode } from 'axios';
import ApiError from '../models/apiError';
import { SkillSchema } from '../generated';

const API_URL = (import.meta.env.VITE_API_URL || '') + '/v1/skill/';

if (!import.meta.env.VITE_API_URL) {
    throw new Error('VITE_API_URL is not defined in the environment variables');
}

export const getExperienceSkills = async (experienceId: string, language?: string): Promise<SkillSchema[]> => {
    try {
        const request = API_URL + experienceId;
        const response = await axios.get(request, {
            params: {
                language,
            },
            timeout: 10 * 1000,
        });

        // Check if the response status is 200
        if (response.status !== HttpStatusCode.Ok) {
            throw new ApiError(`Invalid response status: ${response.status}`, response, response.status);
        }

        // Validate the response data structure
        const data = response.data;
        if (!Array.isArray(data)) {
            throw new ApiError('Invalid response data structure', response, 500);
        }

        // Optionally, you can add more validation for each item in the array
        const requiredFields = ['id', 'name', 'categories'];
        data.forEach((item) => {
            requiredFields.forEach((field) => {
                if (!item[field]) {
                    throw new ApiError(`Missing required field: ${field}`, response, 500);
                }
            });
        });

        return data as SkillSchema[];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching skills:', {
                message: error.message,
                stack: error.stack,
                config: error.config,
                code: error.code,
                response: error.response ? {
                    status: error.response.status,
                    data: error.response.data,
                } : null,
            });
        } else {
            console.error('Error fetching skills:', {
                message: (error as Error).message,
                stack: (error as Error).stack,
            });
        }
        throw error;
    }
};

export const getSkills = async (language?: string): Promise<SkillSchema[]> => {
    try {
        const request = API_URL;
        const response = await axios.get(request, {
            params: {
                language,
            },
            timeout: 10 * 1000,
        });

        // Check if the response status is 200
        if (response.status !== HttpStatusCode.Ok) {
            throw new ApiError(`Invalid response status: ${response.status}`, response, response.status);
        }

        // Validate the response data structure
        const requiredFields = ['id', 'name', 'categories'];
        const data = response.data;
        requiredFields.forEach((field) => {
            if (!data[field]) {
                throw new ApiError(`Missing required field: ${field}`, response, 500);
            }
        });

        return data as SkillSchema[];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching skills:', {
                message: error.message,
                stack: error.stack,
                config: error.config,
                code: error.code,
                response: error.response ? {
                    status: error.response.status,
                    data: error.response.data,
                } : null,
            });
        } else {
            console.error('Error fetching skills:', {
                message: (error as Error).message,
                stack: (error as Error).stack,
            });
        }
        throw error;
    }
};