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

export const cancelSchedulingForClient = async (agendamentoId, statusId, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await calendarApi.put(`/Agendamentos/Cancelar/${agendamentoId}`, {statusId}, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};
