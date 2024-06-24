import axios from 'axios';

const serviceApi = axios.create({
    baseURL: 'https://api.kezukastyles.com.br/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerService = async (serviceData, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await serviceApi.post('/Servicos', serviceData, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const getServicesFromAgendamentoClient = async (token, agendamentoId, clienteId) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await serviceApi.get(`/Servicos/Agendamento/${agendamentoId}/${clienteId}`, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const getServicesFromAgendamento = async (token, agendamentoId) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await serviceApi.get(`/Servicos/Agendamento/${agendamentoId}`, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};


export const getServices = async (token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await serviceApi.get('/Servicos', config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const updateService = async (id, serviceData, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await serviceApi.put(`/Servicos/${id}`, serviceData, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const deleteService = async (id, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await serviceApi.delete(`/Servicos/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};