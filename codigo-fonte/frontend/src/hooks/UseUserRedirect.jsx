import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function useUserRedirect() {
    const { user } = useAuth();
    const navigate = useNavigate();

    function redirectToDashboard() {
        switch (user.tipoUsuario) {
            case 'Gestor':
                navigate('/lista-agendamento-gestor');
                break;
            case 'Colaborador':
                navigate('/lista-agendamento-colaborador');
                break;
            case 'Cliente':
                navigate('/lista-agendamento');
                break;
            default:
                navigate('/');
                break;
        }
    }

    const canEditOrDelete = () => {
        return !(user.tipoUsuario === 'Colaborador' || user.tipoUsuario === 'Cliente');
    };

    const canDelete = () => {
        return !(user.tipoUsuario === 'Cliente');
    };

    const canCheckBox = () => {
        return !(user.tipoUsuario === 'Colaborador' || user.tipoUsuario === 'Gestor');
    };

    return { redirectToDashboard, canEditOrDelete, canDelete, canCheckBox };
}
