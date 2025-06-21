// utils/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { authLoading } = useAuth();
    const { isLoggedIn } = useAuth();

    if (authLoading) {
        return <p style={{ color: 'white' }}>Loading...</p>; // or a spinner
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};

export default ProtectedRoute;
