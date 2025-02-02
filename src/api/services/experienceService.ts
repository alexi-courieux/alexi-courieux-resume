import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/experiences';

export const getExperiences = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching experiences:', error);
        throw error;
    }
};