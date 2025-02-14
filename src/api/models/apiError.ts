import { AxiosResponse } from "axios";

/**
 * Custom error class to handle API errors
 */
class ApiError extends Error {
    response?: AxiosResponse;
    statusCode: number;
    additionalData?: any;

    /**
     * Create a new ApiError
     * @param message Error message
     * @param response Axios response object
     * @param statusCode HTTP status code, defaults to response.status or 500
     * @param additionalData Additional data to include in the error
    */
    constructor(message: string, response?: AxiosResponse, statusCode?: number, additionalData?: any) {
        super(message);
        this.response = response;
        this.statusCode = (statusCode ?? response?.status) ?? 500;
        this.additionalData = additionalData;
    }
}

export default ApiError;