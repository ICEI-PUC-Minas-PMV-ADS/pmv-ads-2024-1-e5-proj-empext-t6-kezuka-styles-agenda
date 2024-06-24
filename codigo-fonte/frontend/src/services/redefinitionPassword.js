import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.kezukastyles.com.br/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const RedefinitionAcess = async (email) => {
    try {
        const response = await api.post('/ResetarSenha/MudarSenhaPorEmail', email );
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Falha ao tentar redefinir a senha!');
        }
    } catch (error) {
        throw error.response ? error.response.data : new Error("An unexpected error occurred");
    }
};
