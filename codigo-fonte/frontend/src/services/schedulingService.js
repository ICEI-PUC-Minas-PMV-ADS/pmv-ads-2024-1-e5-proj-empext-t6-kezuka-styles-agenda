import axios from 'axios';

const calendarApi = axios.create({
    baseURL: 'https://api.kezukastyles.com.br/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerScheduling = async (schedulingData, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await calendarApi.post('/Agendamentos', schedulingData, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};