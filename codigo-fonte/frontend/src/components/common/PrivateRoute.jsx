import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children, allowedTypes }) => {
    const { user, token, loading } = useAuth(); // Add loading state
    const location = useLocation();

    if (loading) {
        return null; // Render loading state or spinner if desired
    }

    if (!token || (allowedTypes && !allowedTypes.includes(user?.tipoUsuario))) {
        return <Navigate to="/login-modal" state={{ from: location }} replace />;
    }

    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedTypes: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
