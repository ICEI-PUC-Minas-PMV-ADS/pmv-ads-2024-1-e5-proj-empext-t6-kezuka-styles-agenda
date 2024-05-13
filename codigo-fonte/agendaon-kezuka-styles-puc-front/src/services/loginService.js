import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.kezukastyles.com.br/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/Authenticate/LoginUsuario', credentials);
        if (response.status === 200) {
            // Optionally store the received token in local storage or context api
            localStorage.setItem('userToken', response.data.token);
            localStorage.setItem('userId', response.data.id);
            return response.data;
        } else {
            throw new Error('Falha ao tentar fazer o login!');
        }
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};
