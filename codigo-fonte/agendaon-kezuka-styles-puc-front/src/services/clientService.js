import axios from 'axios';

const clientApi = axios.create({
    baseURL: 'https://api.kezukastyles.com.br/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerClient = async (clientData) => {
    try {
        const response = await clientApi.post('/Clientes', clientData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

export const getClient = async (token, page = 1, pageSize = 8) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                page,
                pageSize
            }
        };

        const response = await clientApi.get('/Clientes', config);
        return response.data; // Retorna o objeto de resposta completo, que inclui currentPage, pageSize, etc.
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};

