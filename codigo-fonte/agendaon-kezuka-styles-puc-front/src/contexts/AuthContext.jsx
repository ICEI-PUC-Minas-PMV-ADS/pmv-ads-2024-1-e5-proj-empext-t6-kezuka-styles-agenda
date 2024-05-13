import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        token: null,
        tipoUsuario: null 
    });

    const login = (userData, authToken) => {
        setAuthState({
            user: userData,
            token: authToken,
            tipoUsuario: userData.tipoUsuario
        });
        localStorage.setItem('userToken', authToken);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const logout = () => {
        setAuthState({ user: null, token: null, tipoUsuario: null });
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
