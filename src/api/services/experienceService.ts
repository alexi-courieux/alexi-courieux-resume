import axios, { HttpStatusCode } from 'axios';
import ApiError from '../models/apiError';
import axiosRetry from 'axios-retry';
import { ExperienceSchema } from '../generated/types.gen';
const API_URL = (import.meta.env.VITE_API_URL || '') + '/v1/experience/';

if (!import.meta.env.VITE_API_URL) {
    throw new Error('VITE_API_URL is not defined in the environment variables');
}

// Configure axios-retry
axiosRetry(axios, {
    retries: 3, // Number of retry attempts
    retryDelay: (retryCount) => {
        return retryCount * 1000; // Time between retries in milliseconds
    },
    retryCondition: (error) => {
        // Retry on network errors or 5xx status codes
        return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === HttpStatusCode.InternalServerError;
    },
});


export const getExperiences = async (language?: string): Promise<ExperienceSchema[]> => {
    try {
        const request = API_URL;
        const response = await axios.get(request, {
            params: {
                language,
            },
            timeout: 10 * 1000,
        });

        // Check if the response status is 2xx
        if (response.status !== HttpStatusCode.Ok) {
            throw new ApiError(`Invalid response status: ${response.status}`, response, response.status);
        }

        // Validate the response data structure
        const data = response.data;
        if (!Array.isArray(data)) {
            throw new ApiError('Invalid response data structure', response, HttpStatusCode.InternalServerError);
        }

        return data as ExperienceSchema[];
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

export const getExperience = async (id: string, language?: string): Promise<ExperienceSchema | undefined> => {
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

        return response.data;
    
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