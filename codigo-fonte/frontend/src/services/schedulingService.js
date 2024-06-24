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


export const getSchedulingForCollaborator = async (colaboradorId, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const url = `/Agendamentos/Colaborador/${colaboradorId}`;
        const response = await calendarApi.get(url, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};


export const getSchedulingForClient = async (clienteId, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const url = `/Agendamentos/Cliente/${clienteId}`;
        const response = await calendarApi.get(url, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const statusSchedulingForClient = async (agendamentoId, statusId, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await calendarApi.put(`/Agendamentos/Status/${agendamentoId}`, {statusId}, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

import moment from 'moment';

export const getAgendaInDay = async (colaboradorId, data, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const formattedDate = moment(data, 'YYYY-DD-MM').format('YYYY-MM-DD');

        const url = `/Agendamentos/FiltroDia/${colaboradorId}/${formattedDate}`;

        const response = await calendarApi.get(url, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

