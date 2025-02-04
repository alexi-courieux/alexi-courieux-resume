import axios, { HttpStatusCode } from 'axios';
import Experience from '../models/experience';
import ApiError from '../models/apiError';

const API_URL = (import.meta.env.VITE_API_URL || '') + '/v1/experience/';

if (!import.meta.env.VITE_API_URL) {
    throw new Error('VITE_API_URL is not defined in the environment variables');
}

export const getExperiences = async (language?: string): Promise<Experience[]> => {
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
        const data = response.data;
        if (!Array.isArray(data)) {
            throw new ApiError('Invalid response data structure', response, 500);
        }

        // Optionally, you can add more validation for each item in the array
        const requiredFields = ['company', 'position', 'companyName', 'startDate', 'shortDescription', 'description'];
        data.forEach((item) => {
            requiredFields.forEach((field) => {
                if (!item[field]) {
                    throw new ApiError(`Missing required field: ${field}`, response, 500);
                }
            });
        });

        return data as Experience[];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching experiences:', {
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
            console.error('Error fetching experiences:', {
                message: (error as Error).message,
                stack: (error as Error).stack,
            });
        }
        throw error;
    }
};

export const getExperience = async (id: string, language?: string): Promise<Experience> => {
    try {
        const request = API_URL + id;
        const response = await axios.get(request, {
            params: {
                language,
            },
            timeout: 5 * 1000,
        });

        // Check if the response status is 200
        if (response.status !== HttpStatusCode.Ok) {
            throw new ApiError(`Invalid response status: ${response.status}`, response, response.status);
        }

        // Validate the response data structure
        const requiredFields = ['company', 'position', 'companyName', 'startDate', 'shortDescription', 'description'];
        const data = response.data;
        requiredFields.forEach((field) => {
            if (!data[field]) {
                throw new ApiError(`Missing required field: ${field}`, response, 500);
            }
        });

        return data as Experience;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error fetching experience (${id}):`, {
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
            console.error('Error fetching experiences:', {
                message: (error as Error).message,
                stack: (error as Error).stack,
            });
        }
        throw error;
    }
};