import axios from 'axios';

const calendarApi = axios.create({
    baseURL: 'https://api.kezukastyles.com.br/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerCalendar = async (CalendarData, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await calendarApi.post('/Calendario', CalendarData, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

import moment from 'moment';

export const getCalendarInDisponibility = async (colaboradorId, data, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const formattedDate = moment(data, 'YYYY-DD-MM').format('YYYY-MM-DD');

        const url = `/Calendario/Disponiveis/${colaboradorId}/${formattedDate}`;

        const response = await calendarApi.get(url, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const getCalendarForCollaborator = async (colaboradorId, data, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const formattedDate = moment(data, 'YYYY-DD-MM').format('YYYY-MM-DD');

        const url = `/Calendario/Colaborador/${colaboradorId}/${formattedDate}`;

        const response = await calendarApi.get(url, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const deleteCalendar = async (id, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await calendarApi.delete(`/Calendario/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};