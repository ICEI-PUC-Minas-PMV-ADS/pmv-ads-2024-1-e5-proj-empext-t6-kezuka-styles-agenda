import axios from 'axios';

const serviceApi = axios.create({
    baseURL: 'https://api.kezukastyles.com.br/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerCommission = async (commissionData, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await serviceApi.post('/Comissoes', commissionData, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const getCommission = async (email, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await serviceApi.get(`/Comissoes/GetComissoesPorTipoUsuario/${email}`, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const updateCommission = async (id, commissionData, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await serviceApi.put(`/Comissoes/${id}`, commissionData, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const deleteCommission = async (id, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await serviceApi.delete(`/Comissoes/${id}`, config);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};